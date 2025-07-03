CREATE OR REPLACE PACKAGE BODY aapks_extract_ol_pymnt_sch AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : aapks_extract_ol_pymnt_sch.sql
  **
  ** Module     : OL
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright (R) 2008,2019 , Oracle and/or its affiliates.  All rights reserved
  **
  **
  ** No part of this work may be reproduced, stored in a retrieval system, adopted
  ** or transmitted in any form or by any means, electronic, mechanical,
  ** photographic, graphic, optic recording or otherwise, translated in any
  ** language or computer language, without the prior written permission of
  ** Oracle and/or its affiliates.
  **
  ** Oracle Financial Services Software Limited.
  ** Oracle Park, Off Western Express Highway,
  ** Goregaon (East),
  ** Mumbai - 400 063, India
  ** India
  -------------------------------------------------------------------------------------------------------
  CHANGE HISTORY
  
  SFR Number         :
  Changed By         :
  Change Description :
  
  -------------------------------------------------------------------------------------------------------
  */

  PROCEDURE dbg(p_msg VARCHAR2) IS
  BEGIN
    IF debug.pkg_debug_on <> 2 THEN
      debug.pr_debug('OL', 'AAPKS_EXTRACT_OL_PAYMENT_SCHEDULE->' || p_msg);
    END IF;
  END dbg;

  PROCEDURE debug_log(p_Key      VARCHAR2,
                      p_Value    VARCHAR2,
                      P_Log_Reqd VARCHAR2 DEFAULT 'N',
                      p_Failed   VARCHAR2 DEFAULT '0') AS
  
    l_log_reqd   oltb_eis_cs_param.param_value%Type;
    l_session_id oltbs_log_es.session_id%Type := NULL;
    PRAGMA AUTONOMOUS_TRANSACTION;
  BEGIN
  
    BEGIN
      SELECT param_value
        INTO l_log_reqd
        FROM oltb_eis_cs_param
       WHERE param_name = 'LOG_REQD';
    EXCEPTION
      WHEN NO_DATA_FOUND THEN
        l_log_reqd := 'N';
    END;
    SELECT sid
      INTO l_session_id
      FROM v$session
     WHERE audsid = sys_context('userenv', 'sessionid');
    IF NOT (l_log_reqd = 'N' AND P_Log_Reqd = 'N') THEN
      INSERT INTO oltbs_log_es
        (keyid,
         val,
         failed_position,
         seq_no,
         user_id,
         work_time,
         session_id)
      VALUES
        (p_key,
         p_value,
         p_failed,
         oltb_log_es_seq.NextVal,
         Global.user_id,
         Global.Application_Date,
         l_session_id);
      COMMIT;
    END IF;
  
  END debug_log;

  /************************************************************************************************
  Function Name  : FN_STG_LOAD_PAYMENT_SCHEDULE
  Description    : This function loads data into staging table.
  *************************************************************************************************/

  FUNCTION Fn_Stg_Load_Payment_Schedule(p_Extraction_Date IN DATE,
                                        p_Branch_code     IN VARCHAR2,
                                        p_Lcy             IN VARCHAR2)
    RETURN BOOLEAN IS
    ---------DECLARATION-----------
    /* Cursor to pick up data for full load */
    CURSOR cr_stg_branch IS
      SELECT branch_code
        FROM sttms_core_branch
       WHERE record_stat = 'O'
         AND once_auth = 'Y';
  
    CURSOR cr_stg_pymnt_sched(p_Extraction_Date    IN DATE,
                              prev_Extraction_Date IN DATE,
                              p_Branch             IN sttms_core_branch.branch_code%type) IS
      SELECT a.due_date,
             a.amount_due,
             a.contract_ref_no,
             decode(b.ignore_holidays,
                    'N',
                    'Shift Dates Only',
                    'Y',
                    'Recalculate Payment') ig_holidays,
             c.module_code
        FROM oltbs_amount_due        a,
             oltms_product_master_ld b,
             oltbs_contract          c,
             lftm_product_iccf       d
       WHERE d.product = b.product
         AND d.shown_in_contract_main_screen = 'Y'
         AND c.branch = p_Branch
         AND c.contract_ref_no = a.contract_ref_no
         AND b.product = c.product_code
         AND a.component = d.component
         /* AND ((p_extraction_date IS NULL) OR
             (p_extraction_date IS NOT NULL AND
             (a.due_date >= prev_extraction_date AND
             a.due_date <= p_extraction_date))) */;
  
    TYPE lr_rec IS TABLE OF cr_stg_pymnt_sched%ROWTYPE;
    lv_rec               lr_rec;
    l_run_point          VARCHAR2(10);
    v_start_date         DATE;
    l_process_no         NUMBER;
    prev_extraction_date DATE;
    l_msg                VARCHAR2(1000);
  
  BEGIN
  
    /* To pick up the extraction date from oltb_eis_cs_param table, which would be compared with mis_date
    to decide if full load or incremental load*/
    EXECUTE IMMEDIATE 'TRUNCATE TABLE AATB_STG_OL_PAYMENT_SCHEDULE';
  
    global.pr_init(p_branch_code, 'SYSTEM');
    debug_log('FN_STG_LOAD_PAYMENT_SCHEDULE', 'Data Extraction Initiated');
    l_run_point := '1';
    dbg('Data Extraction Initiated' || l_run_point);
  
    BEGIN
      SELECT ord_of_ext
        INTO l_process_no
        FROM oltms_dest_es_tables
       WHERE table_name = 'AATB_STG_OL_PAYMENT_SCHEDULE'
         AND integration_name = 'OFSAA';
    EXCEPTION
      WHEN OTHERS THEN
        dbg('l_process_no ->' || l_process_no);
        dbg('Process terminated due to no value in l_process_no');
        RETURN FALSE;
    END;
  
    BEGIN
      SELECT param_value
        INTO v_start_date
        FROM oltb_eis_cs_param
       WHERE param_name = 'OFSAA_EXTRACTION_DATE';
    EXCEPTION
      WHEN OTHERS THEN
        v_start_date := NULL;
    END;
    dbg('v_start_date--> ' || v_start_date);
  
    BEGIN
      SELECT param_value
        INTO prev_extraction_date
        FROM oltb_eis_cs_param
       WHERE param_name = 'OFSAA_PREV_EXT_OL_PAYMENT_SCHEDULE';
    EXCEPTION
      WHEN OTHERS THEN
        prev_extraction_date := p_extraction_date;
    END;
    dbg('prev_extraction_date--> ' || prev_extraction_date);
    l_run_point := 2;
    debug_log('FN_STG_LOAD_PAYMENT_SCHEDULE', 'Load data');
    dbg('Load data ' || l_run_point);
    debug.pr_debug('OL','Load Data');
    --Loop to populate data
    FOR lr_branch IN cr_stg_branch LOOP
      OPEN cr_stg_pymnt_sched(p_Extraction_Date,
                              prev_Extraction_Date,
                              lr_branch.branch_code);
      LOOP
        FETCH cr_stg_pymnt_sched BULK COLLECT
          INTO lv_rec LIMIT 50;
      
        FORALL i in 1 .. lv_rec.COUNT
        
          INSERT INTO AATB_STG_OL_PAYMENT_SCHEDULE
            (d_payment_date,
             n_amount,
             v_account_number,
             v_cal_option_display_cd,
             v_instrument_type_cd,
             fic_mis_date)
          VALUES
            (lv_rec           (i).due_date,
             lv_rec           (i).amount_due,
             lv_rec           (i).contract_ref_no,
             lv_rec           (i).ig_holidays,
             lv_rec           (i).module_code,
             p_extraction_date);
        EXIT WHEN cr_stg_pymnt_sched%NOTFOUND;
      END LOOP;
      CLOSE cr_stg_pymnt_sched;
    END LOOP;
  
    dbg('Data Inserted Successfully');
  
    UPDATE oltbs_job_es_control
       SET status = 'S', err_message = NULL
     WHERE branch_code = p_branch_code
       AND run_date = global.application_date
       AND process_no = l_process_no
       AND integration_name = 'OFSAA';
    dbg('oltbs_job_es_control updated successfully with status S');
  
    UPDATE oltb_eis_cs_param
       SET param_value = p_Extraction_Date
     WHERE param_name = 'OFSAA_PREV_EXT_OL_PAYMENT_SCHEDULE';
    dbg('oltb_eis_cs_param updated successfully with previous extraction date');
  
    COMMIT;
  
    RETURN TRUE;
  EXCEPTION
    WHEN OTHERS THEN
      ROLLBACK;
      dbg('Process Terminated due to error ::' || SQLERRM);
      debug_log('FN_STG_LOAD_PAYMENT_SCHEDULE',
                'Process Terminated due to error ::' || SQLERRM,
                'Y',
                l_run_point);
    
      l_msg := SQLCODE || SQLERRM;
      UPDATE oltbs_job_es_control
         SET status = 'F', err_message = substr(l_msg, 1, 1000)
       WHERE branch_code = p_branch_code
         AND run_date = global.application_date
         AND process_no = l_process_no
         AND integration_name = 'OFSAA';
      dbg('oltbs_job_es_control updated successfully with status F');
      COMMIT;
      RETURN FALSE;
  END Fn_Stg_Load_Payment_Schedule;

END aapks_extract_ol_pymnt_sch;
/