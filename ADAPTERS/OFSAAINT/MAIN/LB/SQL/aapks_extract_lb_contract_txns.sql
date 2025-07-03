CREATE OR REPLACE PACKAGE BODY aapks_extract_lb_contract_txns AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : aapks_extract_lb_contract_txns.sql
  **
  ** Module     : LB
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

  SFR Number         : 28920753
  Changed By         : Ashokkumar Arumugam
  Change Description : Added to extract Forward VAMI contract transactions
  Search String	     : OBCL_14.2_28920753_Changes
  -------------------------------------------------------------------------------------------------------
  */
  l_msg         VARCHAR2(1900) := NULL;
  l_run_point   VARCHAR2(10) := 0;
  l_cont_ref_no oltbs_contract.contract_ref_no%type;
  l_brn_code    oltbs_contract.branch%type;
  PROCEDURE dbg(p_msg VARCHAR2) IS
  BEGIN
    IF debug.pkg_debug_on <> 2 THEN
      debug.pr_debug('OL', 'aapks_extract_lb_contract_txns->' || p_msg);
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
  Function Name  : FN_STG_LOAD_LOAN_CONTRACT_TXNS
  Description    : This function loads data into staging table.
  *************************************************************************************************/

  FUNCTION Fn_Stg_Load_Loan_Contract_Txns(p_extraction_date IN DATE,
                                          p_branch_code     IN VARCHAR2,
                                          p_lcy             IN VARCHAR2)
    RETURN BOOLEAN IS

    insert_flag          BOOLEAN;
    v_start_date         DATE;
    l_process_no         NUMBER;
    prev_extraction_date DATE;
    l_prod_long_desc     oltms_product.product_description%type;

    l_txn_teller_id       VARCHAR2(20);
    l_execution_time      TIMESTAMP;
    l_txn_posting_date    DATE;
    l_txn_process_date    DATE;
    l_txn_value_date      DATE;
    l_posting_flag        VARCHAR2(1);
    l_conv_rate_acy_lcy   NUMBER(11, 6);
    l_txn_amount_acy      NUMBER(22, 3);
    l_txn_amount_lcy      NUMBER(22, 3);
    l_contract_ref_no     VARCHAR2(50);
    l_authorizer_id       VARCHAR2(20);
    l_initiating_role     VARCHAR2(20);
    l_txn_acy_code        VARCHAR2(3);
    l_txn_ccy_code        VARCHAR2(3);
    l_txn_code            VARCHAR2(50);
    l_txn_desc            VARCHAR2(1000);
    l_txn_mnemonic_code   VARCHAR2(5);
    l_txn_ref_no          VARCHAR2(40);
    l_user_id             VARCHAR2(60);
    l_txn_purpose         VARCHAR2(20);
    l_txn_ccy_to_acy_rate NUMBER(11, 6);
    l_txn_amt             NUMBER(22, 3);
    l_branch_code         VARCHAR2(20);
    l_cust_ref_code       VARCHAR2(40);
    l_report_class_cd     VARCHAR2(5);
    l_txn_automated_flag  VARCHAR2(1);

    l_all_ac_ent_mod               oltbs_daily_log_ac%ROWTYPE;
    l_upload_flag                  VARCHAR2(1);
    l_drcr_indicator               VARCHAR2(1);
    l_unrelated_party_flag         VARCHAR2(1);
    l_loan_cust_id                 oltbs_contract_master.Counterparty%TYPE;
    l_counter_party                oltbs_contract_master.Counterparty%TYPE;
    l_mantas_txn_purpose_cd        VARCHAR2(20);
    l_comp                         lftbs_contract_interest%ROWTYPE;
    l_recurring_txn_indicator      VARCHAR2(1);
    l_clearing_time                TIMESTAMP;
    l_depositing_date              DATE;
    l_depositing_time              TIMESTAMP;
    l_parent_txn_ref_no            VARCHAR2(40);
    l_clearing_date                DATE;
    l_txn_location_address         VARCHAR2(255);
    l_gl_code                      VARCHAR2(20);
    l_txn_entry_sys_logon_id       VARCHAR2(50);
    l_txn_amt_acy                  NUMBER(22, 3);
    l_teller_id                    VARCHAR2(50);
    l_transaction_date             DATE;
    l_offset_account_id            VARCHAR2(50);
    l_rec_product                  oltms_product%ROWTYPE;
    l_err_cd                       ertb_msgs.err_code%TYPE;
    l_canceling_indicator          VARCHAR2(1);
    l_paymnt_instrument_markings   VARCHAR2(255);
    l_paymnt_instrument_number     VARCHAR2(25);
    l_paymnt_instrument_routing_cd VARCHAR2(20);
    l_paymnt_instrument_comments   VARCHAR2(500) := NULL;
    l_cross_border_txn_flag        VARCHAR2(1);
    l_country_code1                sttms_core_branch.country_code%type;
    l_country_code2                sttms_core_branch.country_code%type;
    l_branch_lcy                   sttms_core_branch.branch_lcy%type;
    l_payment_mechanism_id         VARCHAR2(50);
    l_mantas_txn_channel_cd        VARCHAR2(20);
    l_mantas_txn_prod_type_cd      VARCHAR2(20);
    l_on_us_off_us_ind             VARCHAR2(1);
    l_origntr_to_benfcry_instrctns VARCHAR2(500);
    l_txn_channel_cd               VARCHAR2(20);
    l_issuing_date                 DATE;
    l_txn_adjustment_cd            VARCHAR2(20);
    l_pRateFlag                    NUMBER;
    l_load_dt                      DATE;
    l_message                      VARCHAR2(2000);
    l_count                        NUMBER;
    l_stmt_supp_flag               aatb_stg_ol_loan_contract_txns.f_Stmt_Supp_Flag%type;
    l_data_origin                  aatb_stg_ol_loan_contract_txns.v_Data_Origin%type;
    l_txn_amt_lcy                  aatb_stg_ol_loan_contract_txns.n_Txn_Amt_Lcy%type;

    CURSOR cr_stg_branch IS
      SELECT branch_code, branch_lcy
        FROM sttms_core_branch
       WHERE record_stat = 'O'
         AND once_auth = 'Y';

    CURSOR cr_stg_app_master(p_extraction_date IN DATE, prev_extraction_date IN DATE, p_branch IN sttms_core_branch.branch_code%type) IS
      SELECT a.contract_ref_no,
             a.latest_version_no,
             a.latest_event_seq_no,
             a.product_code,
             a.counterparty,
             a.contract_ccy,
             a.module_code
        FROM oltbs_contract a
       WHERE branch = p_branch
	       AND module_code = 'LB' --Module code restrictions
         AND EXISTS (SELECT 1
                FROM oltbs_contract_event_log B
               WHERE B.contract_ref_no = a.contract_ref_no
                 --AND B.event_seq_no = a.latest_event_seq_no  --OBCL_14.2_28920753_Changes
                 AND (((prev_extraction_date IS NULL) OR
                     (prev_extraction_date IS NOT NULL AND
       to_date(B.event_date,'DD-MON-RRRR') > to_date(prev_extraction_date,'DD/MON/RRRR'))) AND --OBCL_14.2_28920753_Changes
       to_date(B.event_date,'DD-MON-RRRR') <= to_date(p_extraction_date,'DD/MON/RRRR'))	--OBCL_14.2_28920753_Changes
                 AND rownum = 1)
       ORDER BY A.contract_ref_no;

    CURSOR cr_stg_acc_eve_diary(p_extraction_date IN DATE, prev_extraction_date IN DATE, p_contract_ref_no IN oltbs_contract_event_log.contract_ref_no%type, p_branch IN VARCHAR2) IS
      SELECT DISTINCT A.contract_ref_no,
                      substr(A.contract_ref_no, 1, 3) branch_code,
                      A.event_code,
                      A.event_seq_no
        FROM oltbs_contract_event_log A
       WHERE A.contract_ref_no = p_contract_ref_no
         AND (((prev_extraction_date IS NULL) OR
             (prev_extraction_date IS NOT NULL AND
       to_date(A.event_date,'DD-MON-RRRR') > to_date(prev_extraction_date,'DD/MON/RRRR'))) AND --OBCL_14.2_28920753_Changes
       to_date(A.event_date,'DD-MON-RRRR') <= to_date(p_extraction_date,'DD/MON/RRRR')) --OBCL_14.2_28920753_Changes
       ORDER BY A.event_seq_no;

    CURSOR cr_stg_acc_eve_entries(p_contract_ref_no IN VARCHAR2, p_branch IN VARCHAR2, p_comp_name IN VARCHAR2, p_event_code IN VARCHAR2, p_esn IN NUMBER) IS
      SELECT *
        FROM oltbs_daily_log_ac
       WHERE trn_ref_no = p_contract_ref_no
         AND amount_tag LIKE p_comp_name || '%'
         AND event = p_event_code
         AND event_sr_no = p_esn;

    CURSOR cr_stg_acvw_all_ac(p_drt_ref IN VARCHAR2, p_crt_ref IN VARCHAR2, p_esn IN NUMBER) IS
      SELECT *
        FROM olvw_all_ac_entries
       WHERE (trn_ref_no = p_drt_ref OR trn_ref_no = p_crt_ref)
         AND event_sr_no = p_esn
         AND cust_gl = 'A';

  BEGIN

    DBG('Inside Function Fn_Stg_Load_Loan_Contract_Txns');
    /* To pick up the extraction date from oltb_eis_cs_param table, which would be compared with mis_date
    to decide if full load or incremental load*/
    EXECUTE IMMEDIATE 'TRUNCATE TABLE AATB_STG_LB_LOAN_CONTRACT_TXNS';

    global.pr_init(p_branch_code, 'SYSTEM');
    debug_log('FN_STG_LOAD_LOAN_CONTRACT_TXNS',
              'Data Extraction Initiated');
    l_run_point := '1';
    dbg('Data Collection Initiated' || l_run_point);
    BEGIN
      SELECT ord_of_ext
        INTO l_process_no
        FROM oltms_dest_es_tables
       WHERE table_name = 'AATB_STG_LB_LOAN_CONTRACT_TXNS'
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
       WHERE param_name = 'OFSAA_PREV_EXT_LB_LOAN_CONTRACT_TXNS';
    EXCEPTION
      WHEN OTHERS THEN
        prev_extraction_date := p_extraction_date;
    END;
    dbg('prev_extraction_date--> ' || prev_extraction_date);
    --extraction code starts here
    IF (v_start_date = p_extraction_date) THEN
      l_run_point := '2';
      dbg('Full data load extraction initiated');
      l_load_dt := NULL;
    ELSE
      l_run_point := '3';
      dbg('Incremental data load extraction initiated');
      l_load_dt := prev_extraction_date;
    END IF;

    FOR lr_branch IN cr_stg_branch LOOP
      dbg('Inside lr_branch loop branch' || lr_branch.Branch_Code);
      FOR lr_app_master IN cr_stg_app_master(p_extraction_date,
                                             l_load_dt,
                                             lr_branch.branch_code) LOOP

        dbg('Inside lr_app_master loop contract_ref_no' ||
            lr_app_master.contract_ref_no);
        l_run_point   := '4';
        l_cont_ref_no := lr_app_master.contract_ref_no;
        l_brn_code    := lr_branch.branch_code;
        BEGIN
          l_run_point := '5';

          SELECT DECODE(linkage_type, 'C', 'CDLR1', 'OTHER')
            INTO l_report_class_cd
            FROM oltbs_contract_linkages
           WHERE contract_ref_no = lr_app_master.contract_ref_no
             AND event_seq_no = lr_app_master.latest_event_seq_no
             and rownum = 1;

          IF l_report_class_cd = 'OTHER' THEN
            SELECT DECODE(linkage_type, 'F', 'CDLR1', 'OTHER')
              INTO l_report_class_cd
              FROM oltbs_acc_coll_link_dtls
             WHERE contract_ref_no = lr_app_master.contract_ref_no
               AND version_no = lr_app_master.latest_version_no
               AND rownum = 1;
          END IF;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_report_class_cd := 'OTHER';
        END;

        dbg('Fetching the product description from the table');
        BEGIN
          SELECT product_description
            INTO l_prod_long_desc
            FROM oltms_product
           WHERE product_code = lr_app_master.product_code
             AND auth_stat = 'A';
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            dbg('Product ' || lr_app_master.product_code ||
                'No Data Found in oltms_product');
            l_prod_long_desc := NULL;
        END;

        FOR lr_eve_dia IN cr_stg_acc_eve_diary(p_extraction_date,
                                               l_load_dt,
                                               lr_app_master.contract_ref_no,
                                               lr_branch.branch_code) LOOP
          l_run_point := '6';
          BEGIN
            BEGIN
              l_run_point := '7';

              SELECT maker_id,
                     maker_dt_stamp,
                     event_date,
                     auth_status,
                     checker_id,
                     maker_id,
                     maker_id
                INTO l_txn_teller_id,
                     l_execution_time,
                     l_txn_process_date,
                     l_posting_flag,
                     l_authorizer_id,
                     l_user_id,
                     l_teller_id
                FROM oltbs_contract_event_log
               WHERE contract_ref_no = lr_eve_dia.contract_ref_no
                 AND event_seq_no = lr_eve_dia.event_seq_no
                 AND event_code = lr_eve_dia.event_code
                 AND rownum = 1;

              SELECT country_code
                INTO l_country_code1
                FROM sttms_core_branch
               WHERE branch_code = lr_eve_dia.branch_code;

            EXCEPTION
              WHEN NO_DATA_FOUND THEN
                NULL;
            END;

            BEGIN
              l_run_point := '8';
              SELECT substr(event_descr, 1, 20)
                INTO l_txn_purpose
                FROM oltbs_event
               WHERE event_code = lr_eve_dia.event_code
                 and module = lr_app_master.module_code;

            EXCEPTION
              WHEN NO_DATA_FOUND THEN
                l_txn_purpose := NULL;
            END;

            FOR lr_eve_ent IN cr_stg_acc_eve_entries(lr_eve_dia.contract_ref_no,
                                                     lr_eve_dia.branch_code,
                                                     '',
                                                     lr_eve_dia.event_code,
                                                     lr_eve_dia.event_seq_no) LOOP

              --l_txn_automated_flag      := 'Y'; --not sure about the values
              --l_recurring_txn_indicator := 'Y'; --not sure about the values
              l_run_point := '9';
              BEGIN
                SELECT remarks
                  INTO l_paymnt_instrument_comments
                  FROM oltbs_contract_master
                 WHERE contract_ref_no = lr_eve_dia.contract_ref_no
                   AND branch = lr_eve_dia.branch_code
                   AND event_seq_no = lr_eve_dia.event_seq_no;
              EXCEPTION
                WHEN no_data_found THEN
                  l_paymnt_instrument_comments := NULL;
              END;
              l_mantas_txn_purpose_cd := NULL; --mantas is not applicable

              FOR lr_acvw IN cr_stg_acvw_all_ac(lr_eve_dia.contract_ref_no,
                                                lr_eve_dia.contract_ref_no,
                                                lr_eve_dia.event_seq_no) LOOP
                l_run_point := '10';
                BEGIN
                  l_txn_posting_date  := lr_acvw.trn_dt;
                  l_txn_value_date    := lr_eve_ent.value_dt;
                  l_conv_rate_acy_lcy := lr_acvw.exch_rate;
                  l_txn_amount_lcy    := lr_acvw.lcy_amount;
                  --l_txn_amount_acy    := lr_eve_ent.amount_settled;
                  l_initiating_role   := lr_acvw.drcr_ind;
                  l_contract_ref_no   := lr_eve_dia.contract_ref_no;
                  l_txn_acy_code      := lr_acvw.ac_ccy;
                  l_cust_ref_code     := lr_app_master.counterparty;
                  l_txn_ccy_code      := lr_acvw.ac_ccy;
                  l_txn_code          := lr_acvw.trn_code;
                  l_txn_mnemonic_code := lr_acvw.event;
                  l_txn_ref_no        := lr_acvw.ac_entry_sr_no;
                  --l_txn_amt           := lr_eve_ent.amount_settled;
                  l_branch_code            := substr(lr_eve_ent.trn_ref_no,
                                                     1,
                                                     3);
                  l_drcr_indicator         := lr_acvw.drcr_ind;
                  l_parent_txn_ref_no      := lr_acvw.trn_ref_no;
                  l_txn_entry_sys_logon_id := lr_acvw.user_id;
                  l_txn_amt_acy            := NVL(lr_acvw.fcy_amount,
                                                  lr_acvw.lcy_amount);
                  l_txn_amount_acy         := l_txn_amt_acy; --same as l_txn_amt_acy
                  l_txn_amt                := l_txn_amt_acy; --same as l_txn_amt_acy

                  l_transaction_date := lr_acvw.trn_dt;

                  l_paymnt_instrument_number := lr_eve_ent.instrument_code;
                  l_txn_acy_code             := lr_app_master.contract_ccy;

                  l_paymnt_instrument_markings := NULL;

                  BEGIN
                    l_run_point := '11';
                    SELECT branch_name || ' , ' || branch_addr1 || ' , ' ||
                           branch_addr2 || ' , ' || branch_addr3
                      INTO l_txn_location_address
                      FROM sttms_core_branch
                     WHERE branch_code = lr_eve_dia.branch_code;
                  EXCEPTION
                    WHEN NO_DATA_FOUND THEN
                      l_txn_location_address := NULL;
                  END;

                  BEGIN
                    l_run_point := '12';

                    SELECT trn_desc
                      INTO l_txn_desc
                      FROM sttms_core_trn_code
                     WHERE trn_code = lr_acvw.trn_code;

                  EXCEPTION
                    WHEN NO_DATA_FOUND THEN
                      l_txn_desc := NULL;
                  END;

                  BEGIN
                    l_run_point := '13';

                    SELECT customer_no
                      INTO l_cust_ref_code
                      FROM sttms_core_account
                     WHERE cust_account_no = lr_acvw.ac_no;

                  EXCEPTION
                    WHEN NO_DATA_FOUND THEN
                      l_cust_ref_code := lr_app_master.counterparty;
                  END;

                  l_run_point := '14';
                  --IF (lr_eve_ent.sttl_mode = 'ACC') THEN
                  IF (lr_acvw.cust_gl = 'A') THEN
                    l_loan_cust_id := l_cust_ref_code;

                    l_counter_party := lr_app_master.counterparty;

                    IF (l_loan_cust_id = l_counter_party) THEN
                      l_unrelated_party_flag := 'N';
                    ELSE
                      l_unrelated_party_flag := 'Y';
                    END IF;
                  ELSE
                    l_unrelated_party_flag := 'N';
                  END IF;
                  /*ELSE
                    l_unrelated_party_flag := 'N';
                  END IF;*/
                  l_run_point := '15';
                  IF (lr_acvw.cust_gl = 'G') THEN
                    l_gl_code := lr_acvw.ac_no;
                  ELSE
                    l_offset_account_id := lr_acvw.ac_no;
                  END IF;
                  l_run_point := '16';
                  IF lr_acvw.event IN
                     ('REVV', 'REVC', 'REVP', 'REVD', 'REVL') THEN
                    l_canceling_indicator := 'Y';
                    l_txn_adjustment_cd   := 'REV';
                  ELSE
                    l_canceling_indicator := 'N';
                  END IF;
                  l_run_point := '17';
                  BEGIN
                    SELECT country_code
                      INTO l_country_code2
                      FROM sttms_core_branch
                     WHERE branch_code = lr_acvw.ac_branch;

                    IF (l_country_code1 <> l_country_code2) THEN
                      l_cross_border_txn_flag := 'Y';
                    ELSE
                      l_cross_border_txn_flag := 'N';
                    END IF;
                  EXCEPTION
                    WHEN no_data_found THEN
                      l_cross_border_txn_flag := 'N';
                  END;
                  l_run_point := '18';
                  BEGIN
                    l_branch_lcy := lr_branch.branch_lcy;
                    IF (lr_eve_ent.ac_ccy <> lr_app_master.contract_ccy) THEN
                      IF (lr_eve_ent.ac_ccy = l_branch_lcy) THEN
                        l_txn_ccy_to_acy_rate := lr_eve_ent.exch_rate;
                      ELSE
                        l_pRateFlag := 0;
                        IF NOT cypkss.fn_getrate(lr_eve_dia.branch_code,
                                                 lr_acvw.ac_ccy,
                                                 lr_app_master.contract_ccy,
                                                 p_extraction_date,
                                                 lr_acvw.trn_dt,
                                                 l_txn_ccy_to_acy_rate,
                                                 l_pRateFlag,
                                                 l_err_cd) THEN
                          DBG('Failed In cypkss.fn_getrate');
                        END IF;
                      END IF;
                    END IF;
                  EXCEPTION
                    WHEN no_data_found THEN
                      l_txn_ccy_to_acy_rate := NULL;
                  END;
                  l_run_point := '19';
                  BEGIN
                    IF (lr_eve_ent.user_id <> 'SYSTEM') THEN
                      l_mantas_txn_channel_cd := 'BRANCH';
                      l_txn_channel_cd        := 'BRANCH';
                    ELSE
                      SELECT SOURCE, SOURCE
                        INTO l_mantas_txn_channel_cd, l_txn_channel_cd
                        FROM oltbs_contract
                       WHERE contract_ref_no = lr_acvw.trn_ref_no;
                    END IF;
                  EXCEPTION
                    WHEN no_data_found then
                      l_mantas_txn_channel_cd := NULL;
                  END;
                  l_run_point := '20';
                  BEGIN
                    SELECT COUNT(1)
                      INTO l_count
                      FROM lbtb_stp_contract_map ls
                     WHERE ls.ldrefno = lr_app_master.contract_ref_no;
                    IF l_count > 0 THEN
                      BEGIN
                        l_stmt_supp_flag := NULL;
                        l_data_origin    := 'FLEXCUBE';
                        l_txn_amt_lcy    := NVL(lr_acvw.fcy_amount,
                                                lr_acvw.lcy_amount);
                      END;
                    END IF;
                  END;
                  BEGIN
                    INSERT INTO AATB_STG_LB_LOAN_CONTRACT_TXNS
                      (v_txn_teller_id, --1
                       d_execution_time, --2
                       d_txn_posting_date, --3
                       d_txn_process_date, --4
                       d_txn_value_date, --5
                       f_posting_flag, --6
                       fic_mis_date, --7
                       n_conv_rate_acy_lcy, --8
                       n_txn_amount_acy, --9
                       n_txn_amount_lcy, --10
                       v_account_number, --11
                       v_authorizer_id, --12
                       v_initiating_role, --13
                       v_txn_acy_code, --14
                       v_txn_ccy_code, --15
                       v_txn_code, --16
                       v_txn_desc, --17
                       v_txn_mnemonic_code, --18
                       v_txn_ref_no, --19
                       v_user_id, --20
                       v_txn_purpose, --21
                       n_txn_ccy_to_acy_rate, --22
                       n_txn_amt, --23
                       v_branch_code, --24
                       v_cust_ref_code, --25
                       v_mantas_txn_asset_class_cd, --26
                       v_report_class_cd, --27
                       f_txn_automated_flag, --28
                       f_drcr_indicator, --29
                       f_unrelated_party_flag, --30
                       v_mantas_txn_purpose_cd, --31
                       v_recurring_txn_indicator, --32
                       d_clearing_time, --33
                       d_depositing_date, --34
                       d_depositing_time, --35
                       v_parent_txn_ref_no, --36
                       d_clearing_date, --37
                       v_txn_location_address, --38
                       v_gl_code, --39
                       v_txn_entry_sys_logon_id, --40
                       n_txn_amt_acy, --41
                       v_teller_id, --42
                       d_transaction_date, --43
                       v_offset_account_id, --44
                       v_prod_long_desc, --45
                       f_canceling_indicator, --46
                       v_paymnt_instrument_markings, --47
                       v_paymnt_instrument_comments, --48
                       f_cross_border_txn_flag, --49
                       v_paymnt_instrument_number, --50
                       v_payment_mechanism_id, --51
                       v_mantas_txn_channel_cd, --52
                       v_mantas_txn_prod_type_cd, --53
                       v_on_us_off_us_ind, --54
                       v_origntr_to_benfcry_instrctns, --55
                       v_txn_channel_cd, --56
                       d_issuing_date, --57
                       v_txn_adjustment_cd, --58
                       v_paymnt_instrument_routing_cd, --59
                       f_stmt_supp_flag, --60
                       v_data_origin, --61
                       n_txn_amt_lcy --62

                       )
                    VALUES
                      (l_txn_teller_id, --1
                       l_execution_time, --2
                       l_txn_posting_date, --3
                       l_txn_process_date, --4
                       l_txn_value_date, --5
                       l_posting_flag, --6
                       p_extraction_date, --7
                       l_conv_rate_acy_lcy, --8
                       l_txn_amount_acy, --9
                       l_txn_amount_lcy, --10
                       l_contract_ref_no, --11
                       l_authorizer_id, --12
                       l_initiating_role, --13
                       l_txn_acy_code, --14
                       l_txn_ccy_code, --15
                       l_txn_code, --16
                       l_txn_desc, --17
                       l_txn_mnemonic_code, --18
                       l_txn_ref_no, --19
                       l_user_id, --20
                       l_txn_purpose, --21
                       l_txn_ccy_to_acy_rate, --22
                       l_txn_amt, --23
                       l_branch_code, --24
                       l_cust_ref_code, --25
                       'FUNDS', --26
                       l_report_class_cd, --27
                       l_txn_automated_flag, --28
                       l_drcr_indicator, --29
                       l_unrelated_party_flag, --30
                       l_mantas_txn_purpose_cd, --31
                       l_recurring_txn_indicator, --32
                       l_clearing_time, --33
                       l_depositing_date, --34
                       l_depositing_time, --35
                       l_parent_txn_ref_no, --36
                       l_clearing_date, --37
                       l_txn_location_address, --38
                       l_gl_code, --39
                       l_txn_entry_sys_logon_id, --40
                       l_txn_amt_acy, --41
                       l_teller_id, --42
                       l_transaction_date, --43
                       l_offset_account_id, --44
                       l_prod_long_desc, --45
                       l_canceling_indicator, --46
                       l_paymnt_instrument_markings, --47
                       l_paymnt_instrument_comments, --48
                       l_cross_border_txn_flag, --49
                       l_paymnt_instrument_number, --50
                       l_payment_mechanism_id, --51
                       l_mantas_txn_channel_cd, --52
                       l_mantas_txn_prod_type_cd, --53
                       l_on_us_off_us_ind, --54
                       l_origntr_to_benfcry_instrctns, --55
                       l_txn_channel_cd, --56
                       l_issuing_date, --57
                       l_txn_adjustment_cd, --58
                       l_paymnt_instrument_routing_cd, --59
                       l_stmt_supp_flag, --60
                       l_data_origin, --61
                       l_txn_amt_lcy --62
                       );
                  EXCEPTION
                    WHEN dup_val_on_index THEN
                      dbg('value already exists' || p_extraction_date ||
                          l_txn_ref_no);
                  END;
                END;
              END LOOP; --cr_stg_acvw_all_ac
            END LOOP; --cr_stg_acc_eve_entries
          END; --FOR INSIDE cr_stg_acc_eve_diary
        END LOOP; --cr_stg_acc_eve_diary
      END LOOP; --cr_stg_app_master
    END LOOP; --cr_stg_branch

    dbg('Data Inserted Successfully');
    debug_log('FN_STG_LOAD_LOAN_CONTRACT_TXNS', 'Load data');
    dbg('Load data ' || l_run_point);

    UPDATE oltbs_job_es_control
       SET status = 'S', err_message = NULL
     WHERE branch_code = p_branch_code
       AND run_date = global.application_date
       AND process_no = l_process_no
       AND integration_name = 'OFSAA';
    dbg('oltbs_job_es_control updated successfully with status S');

    UPDATE oltb_eis_cs_param
       SET param_value = p_extraction_date
     WHERE param_name = 'OFSAA_PREV_EXT_LB_LOAN_CONTRACT_TXNS';
    dbg('oltb_eis_cs_param updated successfully with previous extraction date');

    COMMIT;

    RETURN TRUE;
  EXCEPTION
    WHEN OTHERS THEN
      ROLLBACK;
      dbg('Process Terminated due to error ::' || SQLERRM);
      debug_log('FN_STG_LOAD_LOAN_CONTRACT_TXNS',
                'Process Terminated due to error ::' || SQLERRM,
                'Y',
                l_run_point);

      l_message := SQLCODE || '~' || SQLERRM;

      UPDATE oltbs_job_es_control
         SET status      = 'F',
             err_message = substr(l_msg || '~' || l_message, 1, 2000)
       WHERE branch_code = p_branch_code
         AND run_date = global.application_date
         AND process_no = l_process_no
         AND integration_name = 'OFSAA';
      dbg('oltbs_job_es_control updated successfully with status F');
      COMMIT;
      RETURN FALSE;

  END Fn_Stg_Load_Loan_Contract_Txns;

END aapks_extract_lb_contract_txns;
/