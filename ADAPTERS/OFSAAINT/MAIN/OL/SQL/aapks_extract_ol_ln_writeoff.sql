CREATE OR REPLACE PACKAGE BODY aapks_extract_ol_ln_writeoff AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : aapks_extract_ol_ln_writeoff.sql
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
      debug.pr_debug('OL', 'AAPKS_EXTRACT_OL_LN_WRITEOFF->' || p_msg);
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
  Function Name  : FN_STG_LOAD_WRITEOFF
  Description    : This function loads data into staging table.
  *************************************************************************************************/

  FUNCTION Fn_Stg_Load_WriteOff(p_Extraction_Date IN DATE,
                                p_Branch_code     IN VARCHAR2,
                                p_Lcy             IN VARCHAR2) RETURN BOOLEAN IS
    ---------DECLARATION-----------
    /* Cursor to pick up data for full load */
    CURSOR cr_stg_loan_writeoff IS
      SELECT DISTINCT A.contract_ref_no v_account_number,
                      global.application_date fic_mis_date,
                      A.value_date d_write_off_date,
                      'COMPLETE WRITE OFF' v_write_off_reason_code,
                      A.contract_ccy v_iso_currency_cd,
                      NULL n_prin_write_off_amt,
                      NULL n_int_write_off_amt,
                      NULL n_charges_write_off_amt,
                      B.branch,
                      (SELECT component
                         FROM lftm_product_iccf D
                        where D.product = B.product_Code
                          AND D.shown_in_contract_main_screen = 'Y') main_comp
        FROM oltbs_contract_reserve   A,
             oltbs_contract           B,
             oltbs_contract_event_log C
       WHERE A.contract_ref_no = B.contract_ref_no
         AND A.reserve_status = 'W'
         AND C.contract_ref_no = A.contract_ref_no
         AND C.event_seq_no = A.event_seq_no
         AND C.event_code = 'WOFF'
       ORDER BY A.contract_ref_no, A.value_date;
  
    TYPE l_ty_stg_loan_writeoff IS TABLE OF cr_stg_loan_writeoff%ROWTYPE;
    l_tb_stg_loan_writeoff l_ty_stg_loan_writeoff;
    l_run_point            VARCHAR2(10);
    v_start_date           DATE;
    l_process_no           NUMBER;
    prev_extraction_date   DATE;
    l_msg                  VARCHAR2(1000);
    e_bulk_errors_expt EXCEPTION; --To capture Bulk errors (Bulk Insert)
    PRAGMA EXCEPTION_INIT(e_bulk_errors_expt, -24381);
  
  BEGIN
  
    /* To pick up the extraction date from oltb_eis_cs_param table, which would be compared with mis_date
    to decide if full load or incremental load*/
    EXECUTE IMMEDIATE 'TRUNCATE TABLE AATB_STG_OL_LOAN_WRITEOFF';
    global.pr_init(p_branch_code, 'SYSTEM');
    debug_log('FN_STG_LOAN_WRITEOFF', 'Data Extraction Initiated');
    l_run_point := '1';
    dbg('Data Extraction Initiated ' || l_run_point);
  
    BEGIN
      SELECT ord_of_ext
        INTO l_process_no
        FROM oltms_dest_es_tables
       WHERE table_name = 'AATB_STG_OL_LOAN_WRITEOFF'
         AND integration_name = 'OFSAA';
    EXCEPTION
      WHEN OTHERS THEN
        dbg('l_process_no -> ' || l_process_no);
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
        INTO prev_Extraction_Date
        FROM oltb_eis_cs_param
       WHERE param_name = 'OFSAA_PREV_EXT_OL_LOAN_WRITEOFF';
    EXCEPTION
      WHEN OTHERS THEN
        prev_Extraction_Date := p_Extraction_Date;
    END;
    dbg('prev_Extraction_Date--> ' || prev_Extraction_Date);
  
    --Loop to populate data
    --Fetch data and loop throuh it
    OPEN cr_stg_loan_writeoff;
    LOOP
      FETCH cr_stg_loan_writeoff BULK COLLECT
        INTO l_tb_stg_loan_writeoff LIMIT 1000;
      EXIT WHEN(l_tb_stg_loan_writeoff.COUNT = 0); -- Exit when no records fetched
      debug.pr_debug('OL','l_run_point--> ' || l_run_point);
      l_run_point := 2;
      dbg('Total Count ' || l_tb_stg_loan_writeoff.count);
      <<derivation_loop>>
      FOR j IN 1 .. l_tb_stg_loan_writeoff.COUNT LOOP
      
        l_run_point := 3;
        dbg('contract_ref_no ' || l_tb_stg_loan_writeoff(j)
            .v_account_number);
        BEGIN
          dbg('Derivation for n_prin_write_off_amt');
          SELECT A.lcy_amount
            INTO l_tb_stg_loan_writeoff(j) .n_prin_write_off_amt
            FROM oltbs_daily_log_ac A, oltbs_contract_event_log B
           WHERE A.trn_ref_no = l_tb_stg_loan_writeoff(j)
          .v_account_number
             AND B.event_code = 'WOFF'
             AND A.amount_tag LIKE 'PRINCIPAL%'
             AND A.value_dt = l_tb_stg_loan_writeoff(j)
          .d_write_off_date
             AND B.contract_ref_no = A.trn_ref_no
             AND B.event_seq_no = A.event_sr_no
             AND rownum = 1
           ORDER BY A.event_sr_no DESC;
          dbg('value_date ' || l_tb_stg_loan_writeoff(j).d_write_off_date);
          dbg('contract_ref_no ' || l_tb_stg_loan_writeoff(j)
              .v_account_number || ' N_PRIN_WRITE_OFF_AMT  ' ||
              l_tb_stg_loan_writeoff(j).n_prin_write_off_amt);
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            dbg('No Data Found ' || l_run_point);
            l_tb_stg_loan_writeoff(j).n_prin_write_off_amt := 0;
          WHEN OTHERS THEN
            dbg('When Others' || sqlerrm || '   ' || l_run_point);
            l_tb_stg_loan_writeoff(j).n_prin_write_off_amt := 0;
        END;
      
        l_run_point := 4;
        BEGIN
          dbg('Derivation for n_int_write_off_amt');
          SELECT A.lcy_amount
            INTO l_tb_stg_loan_writeoff(j) .n_int_write_off_amt
            FROM oltbs_daily_log_ac A, oltbs_contract_event_log B
           WHERE A.trn_ref_no = l_tb_stg_loan_writeoff(j)
          .v_account_number
             AND B.event_code = 'WOFF'
             AND A.amount_tag LIKE l_tb_stg_loan_writeoff(j)
          .main_comp || '%'
             AND A.value_dt = l_tb_stg_loan_writeoff(j)
          .d_write_off_date
             AND B.contract_ref_no = A.trn_ref_no
             AND B.event_seq_no = A.event_sr_no
             AND rownum = 1
           ORDER BY A.event_sr_no DESC;
          dbg('contract_ref_no ' || l_tb_stg_loan_writeoff(j)
              .v_account_number || ' n_int_write_off_amt  ' ||
              l_tb_stg_loan_writeoff(j).n_int_write_off_amt);
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            dbg('No Data Found ' || l_run_point);
            l_tb_stg_loan_writeoff(j).n_int_write_off_amt := 0;
          WHEN OTHERS THEN
            dbg('When Others ' || sqlerrm || '   ' || l_run_point);
            l_tb_stg_loan_writeoff(j).n_int_write_off_amt := 0;
        END;
      
        l_run_point := 5;
        BEGIN
          dbg('Derivation for n_charges_write_off_amt');
          SELECT A.lcy_amount
            INTO l_tb_stg_loan_writeoff(j) .n_charges_write_off_amt
            FROM oltbs_daily_log_ac A, oltbs_contract_event_log B
           WHERE A.trn_ref_no = l_tb_stg_loan_writeoff(j)
          .v_account_number
             AND B.event_code = 'WOFF'
             AND A.amount_tag NOT LIKE l_tb_stg_loan_writeoff(j)
          .main_comp || '%'
             AND A.amount_tag NOT LIKE 'PRINCIPAL%'
             AND A.value_dt = l_tb_stg_loan_writeoff(j)
          .d_write_off_date
             AND B.contract_ref_no = A.trn_ref_no
             AND B.event_seq_no = A.event_sr_no
             AND rownum = 1
           ORDER BY A.event_sr_no DESC;
          dbg('contract_ref_no ' || l_tb_stg_loan_writeoff(j)
              .v_account_number || ' n_charges_write_off_amt  ' ||
              l_tb_stg_loan_writeoff(j).n_charges_write_off_amt);
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            dbg('No Data Found ' || l_run_point);
            l_tb_stg_loan_writeoff(j).n_charges_write_off_amt := 0;
          WHEN OTHERS THEN
            dbg('When Others' || sqlerrm || '   ' || l_run_point);
            l_tb_stg_loan_writeoff(j).n_charges_write_off_amt := 0;
        END;
      
      END LOOP derivation_loop;
      l_run_point := 6;
      debug_log('FN_STG_LOAN_WRITEOFF', 'Load data');
      dbg('Load data ' || l_run_point);
      debug.pr_debug('OL','Load Data');
    
      FORALL i IN l_tb_stg_loan_writeoff.FIRST .. l_tb_stg_loan_writeoff.LAST SAVE
                                                  EXCEPTIONS
      
        INSERT INTO AATBS_STG_OL_LOAN_WRITEOFF
          (v_account_number,
           fic_mis_date,
           d_write_off_date,
           v_write_off_reason_code,
           v_iso_currency_cd,
           n_prin_write_off_amt,
           n_int_write_off_amt,
           n_charges_write_off_amt)
        VALUES
          (l_tb_stg_loan_writeoff(i).v_account_number,
           l_tb_stg_loan_writeoff(i).fic_mis_date,
           l_tb_stg_loan_writeoff(i).d_write_off_date,
           l_tb_stg_loan_writeoff(i).v_write_off_reason_code,
           l_tb_stg_loan_writeoff(i).v_iso_currency_cd,
           l_tb_stg_loan_writeoff(i).n_prin_write_off_amt,
           l_tb_stg_loan_writeoff(i).n_int_write_off_amt,
           l_tb_stg_loan_writeoff(i).n_charges_write_off_amt);
    
      COMMIT;
    
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
     WHERE param_name = 'OFSAA_PREV_EXT_OL_LOAN_WRITEOFF';
    dbg('oltb_eis_cs_param updated successfully with previous extraction date');
  
    COMMIT;
  
    RETURN TRUE;
  EXCEPTION
    WHEN OTHERS THEN
      ROLLBACK;
      dbg('Process Terminated due to error ::' || SQLERRM);
      debug_log('FN_STG_LOAN_WRITEOFF',
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
      commit;
      RETURN FALSE;
  END Fn_Stg_Load_WriteOff;
END aapks_extract_ol_ln_writeoff;
/