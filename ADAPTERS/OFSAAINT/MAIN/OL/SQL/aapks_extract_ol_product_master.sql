CREATE OR REPLACE PACKAGE BODY AAPKS_EXTRACT_OL_PRODUCT_MASTER AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : aapks_extract_ol_product_master.sql
  **
  ** Module     : OL
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright (R) 2008,2019 , Oracle AND/or its affiliates.  All rights reserved
  **
  **
  ** No part of this work may be reproduced, stored in a retrieval system, adopted
  ** or transmitted in any form or by any means, electronic, mechanical,
  ** photographic, graphic, optic recording or otherwise, translated in any
  ** language or computer language, without the prior written permission of
  ** Oracle AND/or its affiliates.
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
    Debug.Pr_Debug('OL', 'AAPKS_EXTRACT_OL_PRODUCT_MASTER->' || p_msg);
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
  Function Name  : FN_STG_LOAD_PRODUCT_MASTER
  Description    : This function loads data into staging table.
  *************************************************************************************************/
  FUNCTION FN_STG_LOAD_PRODUCT_MASTER(p_Extraction_Date IN DATE,
                                      p_Branch_Code     IN VARCHAR2,
                                      p_Lcy             IN VARCHAR2)
    RETURN BOOLEAN IS
    ---------DECLARATION-----------
    /* Cursor to pick up data for full load */
    CURSOR cr_ext_dim_product_master(p_Extraction_Date IN DATE, prev_Extraction_Date IN DATE, ext_Date IN DATE) IS
      SELECT d.product_code accls_product,
             NVL(d.product_description, 'Prouct description not maintained') accls_product_desc,
             d.product_start_date product_start_date,
             d.product_end_date product_end_date,
             ceil((ext_Date - d.product_start_date) / 30) n_prod_age_in_months,
             d.module v_prod_module,
             d.product_type v_prod_family,
             CASE
               WHEN d.product_type = 'L' THEN
                'Loan'
               WHEN d.product_type = 'F' THEN
                'Facility'
               WHEN d.product_type = 'D' THEN
                'Drawdown'
               WHEN d.product_type = 'T' AND d.module = 'TL' THEN
                'Trade'
               WHEN d.product_type = 'P' AND d.module = 'TL' THEN
                'Position Product'
               WHEN d.product_type = 'T' THEN
                'Tranche'
               WHEN d.product_type = 'P' THEN
                'Participant'
               WHEN d.product_type = 'C' THEN
                'Commitment'
               ELSE
                NULL
             END AS v_prod_family_desc,
             'N' f_ndtl_component,
             CASE
               WHEN d.product_start_date > prev_Extraction_Date THEN
                'Y'
               ELSE
                'N'
             END AS f_new_prod_ind,
             a.iso_num_country_code iso_country_code
        FROM oltms_product     d,
             sttms_country     a,
             sttms_core_bank   b,
             sttms_core_branch c
       WHERE (d.once_auth = 'Y' AND a.country_code = c.country_code AND
             b.ho_branch = c.branch_code AND
             ((p_Extraction_Date IS NULL) OR
             (p_Extraction_Date IS NOT NULL AND
             TO_CHAR(d.checker_dt_stamp, 'DD-MON-RRRR') >=
             prev_Extraction_Date AND
             TO_CHAR(d.checker_dt_stamp, 'DD-MON-RRRR') <=
             p_Extraction_Date)));
  
    TYPE lr_rec IS TABLE OF cr_ext_dim_product_master%ROWTYPE;
    var_lr_rec           lr_rec;
    v_extraction_date    DATE;
    l_point              NUMBER;
    l_process_no         NUMBER;
    prev_Extraction_Date DATE;
  
  BEGIN
    global.pr_init(p_Branch_Code, 'SYSTEM');
    debug_log('FN_STG_LOAD_PRODUCT_MASTER',
              'p_Extraction_Date is' || p_Extraction_Date ||
              'p_Branch_Code is ' || p_Branch_Code || 'p_Lcy is ' || p_Lcy);
  
    debug_log('FN_STG_LOAD_PRODUCT_MASTER', 'Data Extraction initiated');
    l_point := 1;
    dbg('Data collection initiated' || l_point);
    debug_log('FN_STG_LOAD_PRODUCT_MASTER',
              'Data collection initiated AND l_point is ' || l_point);
    SELECT ord_of_ext
      INTO l_process_no
      FROM oltms_dest_es_tables
     WHERE table_name = 'AATB_STG_OL_PRODUCT_MASTER'
       AND integration_name = 'OFSAA';
  
    /* To pickup the extraction date FROM oltb_eis_cs_param table, which would be compared with mis_date to decide if full load or incremental load */
    EXECUTE IMMEDIATE 'TRUNCATE TABLE AATB_STG_OL_PRODUCT_MASTER';
  
    BEGIN
      SELECT param_value
        INTO v_extraction_date
        FROM oltbs_eis_cs_param
       WHERE param_name = 'OFSAA_EXTRACTION_DATE';
    EXCEPTION
      WHEN no_data_found THEN
        v_extraction_date := NULL;
    END;
    dbg('v_extraction_date  --> ' || v_extraction_date);
  
    BEGIN
      SELECT param_value
        INTO prev_Extraction_Date
        FROM oltbs_eis_cs_param
       WHERE param_name = 'OFSAA_PREV_EXT_PRODUCT_MASTER';
    EXCEPTION
      WHEN others THEN
        prev_Extraction_Date := p_Extraction_Date;
    END;
    dbg('Prev Extraction date --> ' || prev_Extraction_Date);
  
    IF v_extraction_date = p_Extraction_Date THEN
      l_point := 2;
      debug_log('FN_STG_LOAD_PRODUCT_MASTER',
                'Data collection initiated AND l_point is ' || l_point);
      dbg('Full data load initiated');
      OPEN cr_ext_dim_product_master(NULL, NULL, p_Extraction_Date);
    ELSE
      l_point := 3;
      debug_log('FN_STG_LOAD_PRODUCT_MASTER',
                'Data collection initiated AND l_point is ' || l_point);
      dbg('Incremental data load initiated');
      OPEN cr_ext_dim_product_master(p_Extraction_Date,
                                     prev_Extraction_Date,
                                     p_Extraction_Date);
    END IF;
  
    DELETE AATB_STG_OL_PRODUCT_MASTER;
    LOOP
      FETCH cr_ext_dim_product_master BULK COLLECT
        INTO var_lr_rec LIMIT 10;
      dbg('var_lr_rec.COUNT' || var_lr_rec.COUNT);
      FOR i in 1 .. var_lr_rec.COUNT LOOP
        BEGIN
          INSERT INTO AATB_STG_OL_PRODUCT_MASTER
            (v_prod_code,
             fic_mis_date,
             v_prod_name,
             v_prod_desc,
             v_prod_family,
             v_prod_family_desc,
             v_prod_module,
             d_start_date,
             d_end_date,
             n_prod_age_in_months,
             f_new_prod_ind,
             f_ndtl_component,
             v_accrual_basis_code,
             v_rollup_signage_code,
             v_prod_cat_desc,
             v_country_code,
             v_data_origin
             
             )
          VALUES
            (var_lr_rec(i).accls_product,
             trunc(p_Extraction_Date),
             var_lr_rec(i).accls_product_desc,
             var_lr_rec(i).accls_product_desc,
             var_lr_rec(i).v_prod_family,
             var_lr_rec(i).v_prod_family_desc,
             var_lr_rec(i).v_prod_module,
             var_lr_rec(i).product_start_date,
             var_lr_rec(i).product_end_date,
             var_lr_rec(i).n_prod_age_in_months,
             var_lr_rec(i).f_new_prod_ind,
             var_lr_rec(i).f_ndtl_component,
             'Advance',
             '1',
             null,
             var_lr_rec(i).iso_country_code,
             'FLEXCUBE'
             
             );
        EXCEPTION
          WHEN OTHERS THEN
            dbg('Failed during duplicate records insert v_prod_code ' || I ||
                '   ' || var_lr_rec(i).accls_product);
        END;
      END LOOP;
      COMMIT;
      EXIT WHEN cr_ext_dim_product_master%notfound;
    END LOOP;
    CLOSE cr_ext_dim_product_master;
  
    dbg('Data inserted successfully');
  
    UPDATE oltbs_job_es_control
       SET Status = 'S'
     WHERE branch_code = p_Branch_Code
       AND run_date = global.application_date
       AND process_no = l_process_no
       AND integration_name = 'OFSAA';
  
    UPDATE oltbs_eis_cs_param
       SET param_value = p_Extraction_Date
     WHERE param_name = 'OFSAA_PREV_EXT_PRODUCT_MASTER';
    dbg('oltb_eis_cs_param Updated successfully with previous extraction date');
    COMMIT;
  
    RETURN TRUE;
  EXCEPTION
    WHEN OTHERS THEN
      dbg('Process terminated due to error ::' || SQLERRM);
      debug_log('FN_STG_LOAD_PRODUCT_MASTER',
                'Process terminated due to error ::' || SQLERRM,
                'Y',
                l_point);
      UPDATE oltbs_job_es_control
         SET Status = 'F'
       WHERE branch_code = p_Branch_Code
         AND run_date = global.application_date
         AND process_no = l_process_no
         AND integration_name = 'OFSAA';
      RETURN FALSE;
  END FN_STG_LOAD_PRODUCT_MASTER;
END AAPKS_EXTRACT_OL_PRODUCT_MASTER;
/