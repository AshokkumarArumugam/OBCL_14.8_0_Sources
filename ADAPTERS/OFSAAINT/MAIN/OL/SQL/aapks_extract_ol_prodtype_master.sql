CREATE OR REPLACE PACKAGE BODY AAPKS_EXTRACT_OL_PRODTYPE_MASTER AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : aapks_extract_ol_prodtype_master.sql
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
    Debug.Pr_Debug('OL', 'AAPKS_EXTRACT_OL_PRODTYPE_MASTER->' || p_msg);
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
  Function Name  : FN_STG_LOAD_PRODTYPE_MASTER
  Description    : This function loads data into staging table.
  *************************************************************************************************/
  FUNCTION FN_STG_LOAD_PRODTYPE_MASTER(p_Extraction_Date IN DATE,
                                       p_Branch_Code     IN VARCHAR2,
                                       p_Lcy             IN VARCHAR2)
    RETURN BOOLEAN IS
    ---------DECLARATION-----------
    /* Cursor to pick up data for full load */
    CURSOR cr_ext_dim_prodtype_master(p_Extraction_Date IN DATE, prev_extraction_date IN DATE) IS
      SELECT account_class accls_product, description accls_product_desc
        FROM oltms_account_class
       WHERE record_stat = 'O'
         AND auth_stat = 'A'
         AND ((p_Extraction_Date IS NULL) OR
             (p_Extraction_Date IS NOT NULL AND
             (TO_CHAR(checker_dt_stamp, 'DD-MON-YY') >=
             prev_extraction_date AND
             TO_CHAR(checker_dt_stamp, 'DD-MON-YY') <= p_Extraction_Date)))
      UNION
      SELECT product_code accls_product,
             NVL(product_description, product_code) accls_product_desc
        FROM oltms_product
       WHERE record_stat = 'O'
         AND auth_stat = 'A'
         AND ((p_Extraction_Date IS NULL) OR
             (p_Extraction_Date IS NOT NULL AND
             (TO_CHAR(checker_dt_stamp, 'DD-MON-YY') >=
             prev_extraction_date AND
             TO_CHAR(checker_dt_stamp, 'DD-MON-YY') <= p_Extraction_Date))); --needs proper data maintenance since both account_class and product_code exist with same name
  
    TYPE lr_rec IS TABLE OF cr_ext_dim_prodtype_master%ROWTYPE;
    var_lr_rec           lr_rec;
    v_extraction_date    DATE;
    l_point              NUMBER;
    l_process_no         NUMBER;
    prev_Extraction_Date DATE;
  
  BEGIN
    global.pr_init(p_Branch_Code, 'SYSTEM');
  
    debug_log('FN_STG_LOAD_PRODTYPE_MASTER', 'Data Extraction initiated');
    l_point := 1;
    dbg('Data collection initiated' || l_point);
  
    SELECT ord_of_ext
      INTO l_process_no
      FROM oltms_dest_es_tables
     WHERE table_name = 'AATB_STG_OL_PRODTYPE_MASTER'
       AND integration_name = 'OFSAA';
  
    /* To pickup the extraction date from oltb_eis_cs_param table, which would be compared with mis_date to decide if full load or incremental load */
    EXECUTE IMMEDIATE 'TRUNCATE TABLE AATB_STG_OL_PRODTYPE_MASTER';
  
    BEGIN
      SELECT param_value
        INTO v_extraction_date
        FROM oltbs_eis_cs_param
       WHERE param_name = 'OFSAA_EXTRACTION_DATE';
    EXCEPTION
      WHEN no_data_found THEN
        v_extraction_date := NULL;
    END;
    dbg('  v_extraction_date  --> ' || v_extraction_date);
  
    BEGIN
      SELECT param_value
        INTO prev_Extraction_Date
        FROM oltbs_eis_cs_param
       WHERE param_name = 'OFSAA_PREV_EXT_PRODTYPE_MASTER';
    EXCEPTION
      when others then
        prev_Extraction_Date := p_Extraction_Date;
    END;
    dbg(' Prev Extraction date --> ' || prev_Extraction_Date);
  
    --To decide if full load extraction or incremental load
    IF v_extraction_date = p_Extraction_Date THEN
      l_point := 2;
      dbg('Full data load initiated');
      OPEN cr_ext_dim_prodtype_master(NULL, NULL);
    ELSE
      l_point := 3;
      dbg('Incremental data load initiated');
      OPEN cr_ext_dim_prodtype_master(p_Extraction_Date,
                                      prev_Extraction_Date);
    END IF;
  
    DELETE AATB_STG_OL_PRODTYPE_MASTER;
    --Loop to populate data
    LOOP
      FETCH cr_ext_dim_prodtype_master BULK COLLECT
        INTO var_lr_rec LIMIT 10;
      FOR i in 1 .. var_lr_rec.COUNT LOOP
        BEGIN
          INSERT INTO AATB_STG_OL_PRODTYPE_MASTER
            (v_acct_prod_type,
             fic_mis_date,
             v_acct_prod_type_desc
             
             )
          VALUES
            (var_lr_rec(i).accls_product,
             trunc(p_Extraction_Date),
             var_lr_rec(i).accls_product_desc
             
             );
        EXCEPTION
          WHEN OTHERS THEN
            dbg('failed during duplicate records insert v_acct_prod_type ' || I ||
                '   ' || var_lr_rec(i).accls_product);
        END;
      END LOOP;
      COMMIT;
      EXIT WHEN cr_ext_dim_prodtype_master%notfound;
    END LOOP;
    CLOSE cr_ext_dim_prodtype_master;
  
    dbg('Data inserted successfully');
  
    UPDATE oltbs_job_es_control
       SET Status = 'S'
     WHERE branch_code = p_Branch_Code
       AND run_date = global.application_date
       AND process_no = l_process_no
       AND integration_name = 'OFSAA';
  
    UPDATE oltbs_eis_cs_param
       SET param_value = p_Extraction_Date
     WHERE param_name = 'OFSAA_PREV_EXT_PRODTYPE_MASTER';
    dbg('oltbs_eis_cs_param updated successfully with previous extraction date');
    COMMIT;
  
    RETURN TRUE;
  EXCEPTION
    WHEN OTHERS THEN
      dbg('Process terminated due to error ::' || sqlerrm);
    
      debug_log('FN_STG_LOAD_PRODTYPE_MASTER',
                'Process terminated due to error ::' || sqlerrm,
                'Y',
                l_point);
      UPDATE oltbs_job_es_control
         SET Status = 'F'
       WHERE branch_code = p_Branch_Code
         AND run_date = global.application_date
         AND process_no = l_process_no
         AND integration_name = 'OFSAA';
      RETURN FALSE;
  END FN_STG_LOAD_PRODTYPE_MASTER;
END AAPKS_EXTRACT_OL_PRODTYPE_MASTER;
/