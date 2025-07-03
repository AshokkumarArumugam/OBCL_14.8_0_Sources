CREATE OR REPLACE PACKAGE BODY aapks_extract_ol_ln_recovery AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : aapks_extract_ol_ln_recovery.sql
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
      debug.pr_debug('OL', 'AAPKS_EXTRACT_OL_LN_RECOVERY->' || p_msg);
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
  Function Name  : FN_STG_LOAD_RECOVERY
  Description    : This function  loads data into staging table.
  *************************************************************************************************/

  FUNCTION Fn_Stg_Load_Recovery(p_Extraction_Date IN DATE,
                                p_Branch_code     IN VARCHAR2,
                                p_Lcy             IN VARCHAR2) RETURN BOOLEAN IS
    ---------DECLARATION-----------
    /* Cursor to pick up data for full load */
    CURSOR cr_stg_loan_recovery IS
      SELECT DISTINCT A.contract_ref_no v_contract_ref_no,
                      substr(A.contract_ref_no, 1, 3),
                      p_extraction_date FIC_MIS_DATE,
                      B.value_Date d_recovery_date,
                      A.Ccy v_iso_currency_cd,
                      NULL n_prin_recovery_amt,
                      NULL n_int_recovery_amt,
                      'MSG' v_recovery_type_code,
                      C.product_code
        FROM oltbs_contract_liq_ud         A,
             oltbs_contract_liq_summary_ud B,
             oltbs_contract                C
       WHERE B.contract_ref_no = A.contract_ref_no
         AND B.contract_ref_no = C.contract_ref_no
         AND B.event_seq_no = A.event_seq_no
         AND A.amount_paid IS NOT NULL
         AND B.event_code = (SELECT D.event_code
                               FROM oltbs_contract_event_log D
                              WHERE D.contract_ref_no = A.contract_ref_no
                                AND D.event_seq_no = A.event_seq_no
                                AND D.event_code = 'RECO')
         AND value_date >= (SELECT MAX(E.event_date)
                              FROM oltbs_contract_event_log E
                             WHERE E.contract_ref_no = A.contract_ref_no
                               AND E.event_seq_no = A.event_seq_no
                               AND E.event_code = 'RECO');

    TYPE l_ty_stg_loan_recovery IS TABLE OF cr_stg_loan_recovery%ROWTYPE;
    l_tb_stg_loan_recovery l_ty_stg_loan_recovery;
    l_run_point            NUMBER;
    v_start_date           DATE;
    l_process_no           NUMBER;
    prev_extraction_date   DATE;

    e_bulk_errors_expt EXCEPTION; --To capture Bulk errors (Bulk Insert)
    PRAGMA EXCEPTION_INIT(e_bulk_errors_expt, -24381);

  BEGIN

    /* To pick up the extraction date from oltb_eis_cs_param table, which would be compared with mis_date
    to decide if full load or incremental load */
    EXECUTE IMMEDIATE 'TRUNCATE TABLE AATB_STG_OL_LOAN_RECOVERY';
   global.pr_init(p_branch_code, 'SYSTEM');
    debug_log('FN_STG_LOAN_RECOVERY', 'Data Extraction Initiated');
    l_run_point := '1';
    dbg('Data Extraction Initiated ' || l_run_point);

    BEGIN
      SELECT ord_of_ext
        INTO l_process_no
        FROM oltms_dest_es_tables
       WHERE table_name = 'AATB_STG_OL_LOAN_RECOVERY'
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
       WHERE param_name = 'OFSAA_PREV_EXT_OL_LOAN_RECOVERY';
    EXCEPTION
      WHEN OTHERS THEN
        prev_Extraction_Date := p_Extraction_Date;
    END;
    dbg('prev_Extraction_Date--> ' || prev_Extraction_Date);
    --Loop to populate data
    -- Fetch data and loop throuh it

    l_run_point := 2;
    dbg('Loading data into staging table' || l_run_point);
    OPEN cr_stg_loan_recovery;

    LOOP
      FETCH cr_stg_loan_recovery BULK COLLECT
        INTO l_tb_stg_loan_recovery LIMIT 1000;
      EXIT WHEN(l_tb_stg_loan_recovery.COUNT = 0); -- Exit when no records fetched
      dbg('l_run_point--> ' || l_run_point);
      l_run_point := 3;
      dbg('After Fetch' || l_tb_stg_loan_recovery.count);
      <<derivation_loop>>
      FOR j IN 1 .. l_tb_stg_loan_recovery.COUNT LOOP

        l_run_point := 4;
        BEGIN
          dbg('Derivation for n_prin_recovery_amt');
          SELECT SUM(Nvl(A.amount_paid, 0))
            INTO l_tb_stg_loan_recovery(j) .n_prin_recovery_amt
            FROM oltbs_contract_liq_ud A
           WHERE A.contract_ref_no = l_tb_stg_loan_recovery(j)
          .v_contract_ref_no;
          dbg('contract_ref_no ' || l_tb_stg_loan_recovery(j)
              .v_contract_ref_no || ' n_prin_recovery_amt  ' ||
              l_tb_stg_loan_recovery(j).n_prin_recovery_amt);
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            dbg('No Data Found ' || l_run_point);
            l_tb_stg_loan_recovery(j).n_prin_recovery_amt := 0;
          WHEN OTHERS THEN
            dbg('When Others' || SQLERRM || '   ' || l_run_point);
            l_tb_stg_loan_recovery(j).n_prin_recovery_amt := 0;
        END;

        l_run_point := 5;
        BEGIN
          dbg('Derivation for n_prin_recovery_amt');
          SELECT SUM(Nvl(A.amount_paid, 0))
            INTO l_tb_stg_loan_recovery(j) .n_int_recovery_amt
            FROM oltbs_contract_liq_ud A
           WHERE A.contract_ref_no = l_tb_stg_loan_recovery(j)
          .v_contract_ref_no
             AND A.component =
                 (SELECT D.component
                    FROM lftm_product_iccf D
                   WHERE D.product = l_tb_stg_loan_recovery(j)
                  .product_code
                     AND D.shown_in_contract_main_screen = 'Y');
          IF l_tb_stg_loan_recovery(j).n_int_recovery_amt IS NULL THEN
             l_tb_stg_loan_recovery(j).n_int_recovery_amt := 0;
          END IF;                     
          dbg('contract_ref_no ' || l_tb_stg_loan_recovery(j)
              .v_contract_ref_no || ' n_int_recovery_amt  ' ||
              l_tb_stg_loan_recovery(j).n_int_recovery_amt);
        EXCEPTION
          WHEN no_data_found THEN
            dbg('no data found ' || l_run_point);
            l_tb_stg_loan_recovery(j).n_int_recovery_amt := 0;
          WHEN OTHERS THEN
            dbg('when others' || sqlerrm || '   ' || l_run_point);
            l_tb_stg_loan_recovery(j).n_int_recovery_amt := 0;
        END;

      END LOOP derivation_loop;
      l_run_point := 6;
      dbg('l_run_point' || l_run_point);
      dbg('Load Data' || l_tb_stg_loan_recovery.count);

      FORALL i IN l_tb_stg_loan_recovery.FIRST .. l_tb_stg_loan_recovery.LAST SAVE
                                                  EXCEPTIONS

        INSERT INTO AATB_STG_OL_LOAN_RECOVERY
          (v_account_number,
           fic_mis_date,
           d_recovery_date,
           v_iso_currency_cd,
           n_prin_recovery_amt,
           n_int_recovery_amt,
           v_recovery_type_code)
        VALUES
          (l_tb_stg_loan_recovery(i).v_contract_ref_no,
           l_tb_stg_loan_recovery(i).fic_mis_date,
           l_tb_stg_loan_recovery(i).d_recovery_date,
           l_tb_stg_loan_recovery(i).v_iso_currency_cd,
           l_tb_stg_loan_recovery(i).n_prin_recovery_amt,
           l_tb_stg_loan_recovery(i).n_int_recovery_amt,
           l_tb_stg_loan_recovery(i).v_recovery_type_code);
      COMMIT;

    END LOOP;
    dbg('Total Rows ' || SQL%ROWCOUNT);
    dbg('Data Inserted Successfully');
	debug_log('FN_STG_LOAD_RECOVERY', 'Load data');
    dbg('Load data ' || l_run_point);
    UPDATE oltbs_job_es_control
       SET status = 'S'
     WHERE branch_code = p_branch_code
       AND run_date = global.application_date
       AND process_no = l_process_no
       AND integration_name = 'OFSAA';
    dbg('oltbs_job_es_control updated successfully with status S');

    UPDATE oltb_eis_cs_param
       SET param_value = p_extraction_date
     WHERE param_name = 'OFSAA_PREV_EXT_OL_LOAN_RECOVERY';
    dbg('oltb_eis_cs_param updated successfully with previous extraction date');

    COMMIT;

    RETURN TRUE;
  EXCEPTION
    -- ============================================
    -- Handling BULK INSERT related exceptions
    -- ============================================
    WHEN e_bulk_errors_expt THEN
      ROLLBACK;
      -- Close open cursors, if any
      IF (cr_stg_loan_recovery%ISOPEN) THEN
        CLOSE cr_stg_loan_recovery;
      END IF;

      DBG('Process Terminated due to error ::' || SQLERRM);

      dbg('Failed in Bulk Insert');
      dbg('Number of Failures -' || SQL%BULK_EXCEPTIONS.COUNT);
      dbg('Process terminated due to error ::' || SQLERRM);

      FOR l_count IN 1 .. SQL%BULK_EXCEPTIONS.COUNT LOOP
        dbg('Error Index - ' || SQL%BULK_EXCEPTIONS(l_count).ERROR_INDEX);
        dbg('Error Code - ' || SQL%BULK_EXCEPTIONS(l_count).ERROR_CODE);
      END LOOP;

      UPDATE oltbs_job_es_control
         SET status = 'F'
       WHERE branch_code = p_branch_code
         AND run_date = global.application_date
         AND process_no = l_process_no
         AND integration_name = 'OFSAA';

      dbg('oltbs_job_es_control updated successfully with status F');
      RETURN FALSE;
    WHEN OTHERS THEN
      ROLLBACK;
      -- Close open cursors, if any
      IF (cr_stg_loan_recovery%ISOPEN) THEN
        CLOSE cr_stg_loan_recovery;
      END IF;

      dbg('l_run_point :' || l_run_point || ': ' || SQLERRM);
      dbg('Process terminated due to error ::' || SQLERRM);

      UPDATE oltbs_job_es_control
         SET status = 'F'
       WHERE branch_code = p_branch_code
         AND run_date = global.application_date
         AND process_no = l_process_no
         AND integration_name = 'OFSAA';

      dbg('oltbs_job_es_control updated successfully with status F');
      dbg('data inserted');
      RETURN FALSE;
  END Fn_Stg_Load_Recovery;
END aapks_extract_ol_ln_recovery;
/