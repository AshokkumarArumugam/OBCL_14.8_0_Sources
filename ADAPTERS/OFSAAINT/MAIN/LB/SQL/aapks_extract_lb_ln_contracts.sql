create or replace PACKAGE BODY aapks_extract_lb_ln_contracts AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : aapks_extract_lb_ln_contracts.sql
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
  Changed By         : Satheesh Seshan
  Change Description : Added code to extract 10 additional fields to OFSAA
  Search String	     : OBCL_OFSAA_Changes 
  Modified on        : 25-Mar-2021  
  -------------------------------------------------------------------------------------------------------
  */
  TYPE ty_tb_comp_sch IS TABLE OF oltbs_contract_schedules%ROWTYPE INDEX BY PLS_INTEGER;

  TYPE ty_rec_comp IS RECORD(
    component_name oltbs_contract_schedules.component%TYPE,
    g_tb_comp_sch  ty_tb_comp_sch);
  TYPE ty_tb_comp IS TABLE OF ty_rec_comp INDEX BY VARCHAR2(90);
  pkg_tb_comp ty_tb_comp;

  PROCEDURE dbg(p_msg VARCHAR2) IS
  BEGIN
    IF debug.pkg_debug_on <> 2 THEN
      debug.pr_debug('OL', 'aapks_extract_lb_ln_contracts->' || p_msg);
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
  Function Name  : FN_STG_LOAD_LOAN_CONTRACTS
  Description    : This function loads data into staging table.
  *************************************************************************************************/

  FUNCTION Fn_Stg_Load_Loan_Contracts(p_Extraction_Date IN DATE,
                                      p_Branch_code     IN VARCHAR2,
                                      p_Lcy             IN VARCHAR2)
    RETURN BOOLEAN IS
    ---------DECLARATION-----------
    /* Cursor to pick up data for full load */
    CURSOR cr_stg_contract_master(p_extraction_date IN DATE, prev_extraction_date IN DATE, p_branch IN sttms_core_branch.branch_code%type) IS
      SELECT A.contract_ref_no,
             A.branch,
             A.product_code,
             A.user_ref_no,
             A.contract_ccy,
             A.book_date,
             B.value_date,
             --atm_facility,
             B.bill_ref_no,
             B.rollover_allowed,
             A.contract_status,
             --A.derived_status,
             A.counterparty,
             B.maturity_date,
             B.amount, --amount_disbursed,
             --amortized,
             B.lcy_amount, --amount_financed,
             A.module_code,
             --secr_status,
             A.latest_version_no,
             A.user_defined_status,
             A.product_type,
             B.main_comp
        FROM oltbs_contract A, oltbs_contract_master B
       WHERE A.branch = p_branch
         AND A.Module_Code = 'LB'
         AND A.Module_Code = B.Module
         AND B.maturity_type <> 'C'
         AND B.branch = A.branch
		 --OBCL_14.4_Changes :: Starts		 
         /*AND B.event_seq_no =
             (SELECT MAX(C.event_seq_no)
                FROM oltbs_contract_master C
               WHERE C.contract_ref_no = A.contract_ref_no)*/
		 AND A.latest_event_seq_no =
			 (SELECT MAX(event_seq_no)
				FROM oltbs_contract_event_log C
			   WHERE C.contract_ref_no = A.contract_ref_no
			   AND A.contract_ref_no = B.contract_ref_no)
		 --OBCL_14.4_Changes :: Ends			   
         AND A.latest_version_no = B.version_no
         AND A.contract_ref_no = B.contract_ref_no;

    --Cursor to select only open and authorized branches
    CURSOR cr_stg_branch IS
      SELECT branch_code, branch_lcy --12.4_n_undrawn_amount_lcy
        FROM sttms_core_branch
       WHERE record_stat = 'O'
         AND once_auth = 'Y';
         
    --Cursor to select oltbs_amount_due
    CURSOR cr_contract_amount_due(p_Contract_Ref_No IN VARCHAR2, p_Brn_Code IN VARCHAR2, p_Comp_Name VARCHAR2) IS
      SELECT MIN(due_date) min_sch_due_date,
             SUM(amount_due) sum_amount_due,
             SUM(amount_settled) sum_amount_settle
      --SUM(accured_amount) sum_accrued_amount
        FROM oltbs_amount_due
       WHERE contract_ref_no = p_Contract_Ref_No
         AND branch_account_due = p_Brn_Code
         AND component IN p_Comp_Name
         AND due_date <= p_Extraction_Date;

    TYPE ty_contract_amount_due IS TABLE OF cr_contract_amount_due%ROWTYPE;
    tb_contract_amount_due    ty_contract_amount_due;
    l_run_point               VARCHAR2(10);
    v_start_date              DATE;
    l_process_no              NUMBER;
    prev_extraction_date      DATE;
    l_msg                     VARCHAR2(1900) := NULL;
    l_contract_ref_no         oltbs_contract_master.contract_ref_no%TYPE := NULL;
    l_branch_code             oltbs_contract_master.branch%TYPE := NULL;
    l_rec_product             oltms_product_master_ld%ROWTYPE;
    l_product                 oltms_product.product_code%TYPE;
    l_err_code                ertbs_msgs.err_code%TYPE;
    l_max_effective_date      DATE;
    l_max_adverse_status_code VARCHAR2(4);
    l_max_esn                 NUMBER(4);
    l_key                     VARCHAR2(90);
    l_idx                     PLS_INTEGER;
    --l_secr_allowed               oltms_product_master_ld.secr_allowed%type;
    l_amrt_term_unit              oltms_product_master_ld.tenor_unit%type;
    l_loan_desc                   oltms_product.product_description%type;
    l_holiday_roll_convention_cd  oltms_product_master_ld.schedule_movement%type;
    l_tenor_unit                  VARCHAR2(1);
    l_cal_option_display_cd       VARCHAR2(40);
    l_interest_rate_cd            VARCHAR2(60);
    l_eop_curr_prin_bal           oltbs_contract_master.amount%type;
    l_eop_int_bal                 oltbs_contract_master.amount%type;
    l_numb_instal_prin            NUMBER(5);
    l_prepayment_amount           NUMBER(22, 3);
    l_prepayment_date             DATE;
    l_tot_revenue                 NUMBER(22, 3);
    l_write_off_amount            oltbs_contract_reserve.reserve_txn_amt%Type;
    l_accr_int_gl_code            oltbs_daily_log_ac.ac_no%Type;
    l_acct_display_name           sttms_core_customer.customer_name1%type;
    l_country_id                  sttms_core_customer.country%type;
    l_cust_type                   sttms_core_customer.customer_type%type;
    l_ownership_type              varchar2(15);
    l_autopay_acct_number         oltbs_settlements.ext_party_account%type;
    l_coll_code                   oltbs_contract_linkages.linked_to_ref%Type;
    l_gaap_code                   VARCHAR2(6);
    l_adjusment_effective_date    DATE;
    l_closed_date                 DATE;
    l_commitment_no               oltbs_contract_linkages.linked_to_ref%Type;
    l_revised_maturity_date       DATE;
    l_start_date_i                DATE;
    l_start_date_p                DATE;
    l_participation_flg           VARCHAR2(1);
    l_restructured_ind            VARCHAR2(1);
    l_stmt_supp_flag              VARCHAR2(1);
    l_student_status_flg          VARCHAR2(1);
    l_cnt_student_status_flg      NUMBER;
    l_cnt__restructured_ind       NUMBER;
    l_cum_recoveries              oltbs_daily_log_ac.lcy_amount%type;
    l_curr_payment_recd           oltbs_amount_paid.amount_settled%type;
    l_repricing_freq              NUMBER;
    l_orig_book_bal               oltbs_contract_master.amount%Type;
    l_orig_maturity_date          oltbs_contract_master.maturity_date%Type;
    l_reprice_freq_unit           oltbs_contract_schedules.frequency_unit%type;
    l_orig_amrt_term_unit         VARCHAR2(1);
    l_approve_date                DATE;
    l_gl_code                     oltms_product_accrole.account_head%type;
    l_accrued_interest            oltbs_contract_schedules.amount%type;
    l_instal_int_amt              oltbs_amount_due.amount_due%type;
    l_instal_prin_amt             oltbs_amount_due.amount_due%type;
    l_last_payment_date           DATE;
    l_internal_rate_of_return     oltbs_contract_irr.irr%type;
    l_past_due_flag               VARCHAR2(1);
    l_last_reprice_date           DATE;
    l_orig_repricing_date         DATE;
    l_date                        DATE;
    l_last_stmt_date              DATE;
    l_next_payment_date           DATE;
    l_orig_next_payment_date      DATE;
    l_writeback_date              DATE;
    l_contract_cancelled_ind      VARCHAR2(1);
    l_contract_cancelled_count    NUMBER;
    l_count                       NUMBER;
    l_exp_fx_fund_curr_same_ind   VARCHAR2(1);
    l_cnt_fx_fund_curr_same_ind   NUMBER;
    l_exp_coll_ccy_same_flag      VARCHAR2(1);
    l_avg_book_bal                NUMBER(22, 3);
    l_drawndown_percent           NUMBER(15, 11);
    l_due_interest                NUMBER(22, 6);
    l_eop_prev_prin_bal           NUMBER(22, 3);
    l_eop_prev_prin_bal_1         oltbs_amount_paid.amount_settled%TYPE;
    l_int_recovered_amt_lcy       NUMBER(22, 3);
    l_amt_disbursed               oltbs_contract_schedules.amount%TYPE;
    l_lrd_balance                 NUMBER(22, 3);
    l_reprice_amt                 NUMBER;
    l_prin_paid                   NUMBER;
    l_no_of_payments              NUMBER(5);
    l_orig_amrt_term              NUMBER(5);
    l_orig_ltv                    NUMBER(22, 3);
    l_orig_payment_amt            NUMBER(22, 3);
    l_orig_remain_no_of_pmts      NUMBER(10);
    l_overdue_int                 NUMBER(22, 3);
    l_prin_recovered_amt_lcy      NUMBER(22, 3);
    l_sanctioned_limit            NUMBER(22, 3);
    l_linked_ref_no               oltbs_contract_linkages.linked_to_ref%TYPE;
    l_tot_comm_amt                NUMBER(22, 3);
    l_total_transactions          NUMBER(8);
    l_benchmark_ccy_code          VARCHAR2(3);
    l_product_type                oltms_product_master_ld.product_type%TYPE;
    l_category                    VARCHAR2(20);
    l_coll_ccy                    VARCHAR2(3);
    l_line_code                   VARCHAR2(25);
    l_next_finance_date           DATE;
    l_orig_payment_date           DATE;
    l_writeback_int_date          DATE;
    l_writeoff_date               DATE;
    l_amrt_term                   NUMBER(22, 3);
    l_delinquent_days             NUMBER(5);
    l_exp_ltv_ratio               NUMBER(9, 6);
    l_int_recd                    NUMBER(22, 3);
    l_renewal_fee                 NUMBER(22, 3);
    l_tot_fee_chgs                NUMBER(22, 3);
    l_total_fees_at_orig          NUMBER(22, 3);
    l_exp_fund_ccy_same_ind       VARCHAR2(1);
    l_exp_fund_ccy_brn            VARCHAR2(3);
    l_int_accrued_mtd             NUMBER(22, 3);
    l_int_recovered_amt_mtd       NUMBER(22, 3);
    l_int_wback_amt_mtd           NUMBER(22, 3);
    l_penalty_charges_recd        NUMBER(22, 3);
    l_repayment_type              VARCHAR2(60);
    l_repayment_type_count        NUMBER;
    l_due_principal               NUMBER(22, 6);
    l_eop_bal                     NUMBER(22, 3);
    l_prin_recd_mtd               NUMBER(22, 3);
    l_overdue_days_int            NUMBER(5);
    l_overdue_days_prin           NUMBER(5);
    l_undrawn_amount_lcy          NUMBER(22, 3);
    l_undrawn_amount_lcy_dsbr     NUMBER(22, 3);
    l_undrawn_amount_lcy_fin      NUMBER(22, 3);
    l_rate                        NUMBER;
    p_errcode                     ertb_msgs.err_code%Type;
    l_int_income                  NUMBER(22, 3);
    l_interest_recd_mtd           NUMBER(22, 3);
    l_provision_amt_mtd           NUMBER(22, 3);
    l_max_balance_mtd             NUMBER(22, 3);
    l_days_mth                    VARCHAR2(10);
    l_days_year                   VARCHAR2(10);
    l_day_count_ind               VARCHAR2(20);
    l_pre_closure_balance         NUMBER(22, 3);
    l_pre_closure_balance_prin    NUMBER(22, 3);
    l_pre_closure_balance_due     NUMBER(22, 3);
    l_pre_closure_balance_accr    NUMBER(22, 3);
    l_full_performing_asset_flag  VARCHAR2(1);
    l_full_performing_asset_count NUMBER;
    l_secured_ind                 VARCHAR2(1);
    l_secured_ind_acc             VARCHAR2(35);
    l_after_payment_balance       NUMBER(14, 2);
    l_after_payment_balance_tot   NUMBER(14, 2);
    l_after_payment_balance_next  NUMBER(14, 2);
    l_cur_yield                   NUMBER(8, 4);
    l_cur_yield_prin              NUMBER;
    l_cur_yield_sett              NUMBER;
    l_avg_bal_mtd                 NUMBER(22, 3);
    l_avg_bal_mtd_prev            NUMBER(22, 3);
    l_avg_bal_mtd_curr            NUMBER(22, 3);
    l_avg_bal_mtd_days_count      NUMBER;
    l_avg_bal_mtd_diff            NUMBER(22, 3);
    l_cur_book_bal                NUMBER(22, 3);
    l_recovered_amt               NUMBER(22, 3);
    l_remain_no_of_pmts           NUMBER(10);
    l_remain_no_of_pmts_count     NUMBER;
    l_prin_wback_amt_mtd          NUMBER(22, 3);
    l_tot_writeback_mtd           NUMBER(22, 3);
    l_total_writeback_amt         NUMBER(22, 3);
    l_autopay_instr_type_cd       VARCHAR2(5);
    l_autopay_bank_transit_nbr    VARCHAR2(20);
    l_account_rem_tenor           NUMBER(5);
    l_tot_writeoff_mtd            NUMBER(22, 3);
    l_write_off_amount_lcy        NUMBER(22, 3);
    l_last_delinquent_date        DATE;
    l_no_of_interest_only_mths    NUMBER(5);
    l_acct_status_code            VARCHAR2(20);
    l_delinquency_status_code     VARCHAR2(20);
    l_delinquency_status_from     DATE;
    l_delinquency_status_to       DATE;
    l_delinquency_status_count    NUMBER;
    l_account_status              VARCHAR2(1);
    l_cur_net_par_bal             NUMBER(14, 2);
    l_participation_sold_amt      NUMBER(14, 2);
    l_percent_sold                NUMBER(8, 4);
    l_drawn_amt                   oltbs_contract_master.amount%TYPE;
    l_orig_interest_type          VARCHAR2(20);

    l_exception EXCEPTION;
    LN_EXNUMERICPRECISION EXCEPTION;
    e_bulk_errors_expt EXCEPTION; --To capture Bulk Errors (Bulk Insert)
    PRAGMA EXCEPTION_INIT(e_bulk_errors_expt, -24381);

	--OBCL_OFSAA_Changes Starts
	l_user_defined_status_flag  CHAR(1);
	l_total_margin			    NUMBER(22, 3);
	l_sum_amount_due		    NUMBER(22, 3);
	l_purchase_amount		    NUMBER(22, 3); 
	l_rate_floor_rate		    NUMBER(22, 3);
    l_min_rate                  NUMBER(22, 3);
	l_mis_code				    VARCHAR2(9);
	l_schedule_frequency        VARCHAR2(1);
    l_reprice_date              DATE;
    --OBCL_OFSAA_Changes Ends
    
  BEGIN

    /* To pick up the extraction date from cstb_eis_param table, which would be compared with mis_date
    to decide if full load or incremental load*/
    EXECUTE IMMEDIATE 'TRUNCATE TABLE AATB_STG_LB_LOAN_CONTRACTS';
    global.pr_init(p_branch_code, 'SYSTEM');
    debug_log('FN_STG_LOAD_LOAN_CONTRACTS','Data Extraction Initiated');
    l_run_point := '1';
    dbg('Data Extraction Initiated ' || l_run_point);

    BEGIN
      SELECT ord_of_ext
        INTO l_process_no
        FROM oltms_dest_es_tables
       WHERE table_name = 'AATB_STG_LB_LOAN_CONTRACTS'
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
       WHERE param_name = 'OFSAA_PREV_EXT_LB_LOAN_CONTRACTS';
    EXCEPTION
      WHEN OTHERS THEN
        prev_Extraction_Date := p_Extraction_Date;
    END;
    dbg('prev_Extraction_Date--> ' || prev_Extraction_Date);
    --Loop to populate data
    FOR lr_branch IN cr_stg_branch LOOP
      dbg(lr_branch.branch_code);
      FOR lr_rec IN cr_stg_contract_master(p_Extraction_date,
                                           prev_Extraction_Date,
                                           lr_branch.branch_code) LOOP
        l_run_point               := '2';
        l_err_code                := 'CL-CACH02;'; --Invalid Product Check
        l_product                 := lr_rec.product_code;
        l_contract_ref_no         := lr_rec.contract_ref_no;
        l_branch_code             := lr_rec.branch;
        l_max_effective_date      := NULL;
        l_max_adverse_status_code := NULL;
        l_max_esn                 := NULL;

        --schedules details
        /*BEGIN
          l_idx := 1;
          FOR l_rec IN (SELECT *
                          FROM oltbs_contract_schedules
                         WHERE contract_ref_no = lr_rec.contract_ref_no
                              --AND branch = p_branch_code
                           AND component = lr_rec.main_comp
                           AND schedule_type = 'P') LOOP
            pkg_tb_comp(l_key).g_tb_comp_sch(l_idx) := l_rec;
            l_idx := l_idx + 1;
          END LOOP;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            dbg('It is an amortized loan ' || lr_rec.contract_ref_no);
        END;*/
        --product details
        BEGIN
          SELECT A.*
            INTO l_rec_product
            FROM oltms_product_master_ld A, oltms_product B
           WHERE A.product = lr_rec.product_code
             AND A.product = B.product_code
             AND B.auth_stat = 'A';
        EXCEPTION
          WHEN no_data_found THEN
            l_err_code := 'CL-CACH02;';
            ovpkss.pr_appendtbl(l_err_code, ' ');
        END;

        OPEN cr_contract_amount_due(lr_rec.contract_ref_no,
                                    lr_rec.branch,
                                    'PRINCIPAL');
        FETCH cr_contract_amount_due BULK COLLECT
          INTO tb_contract_amount_due;
        CLOSE cr_contract_amount_due;
        --product description population
        BEGIN
          SELECT product_description
            INTO l_loan_desc
            FROM oltms_product
           WHERE product_code = lr_rec.product_code
             AND auth_stat = 'A';
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_loan_desc := NULL;
        END;
        BEGIN
          --l_secr_allowed               := l_rec_product.secr_allowed;
          l_amrt_term_unit             := l_rec_product.tenor_unit;
          l_holiday_roll_convention_cd := l_rec_product.schedule_movement;
          l_cal_option_display_cd      := l_rec_product.ignore_holidays;
          l_tenor_unit                 := l_rec_product.Tenor_Unit;
          --l_principal_freq             := l_acc_comp_sch(1).frequency;
          --l_interest_freq_unit         := l_acc_comp_sch(1).unit;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            --l_secr_allowed               := NULL;
            l_amrt_term_unit             := NULL;
            l_holiday_roll_convention_cd := NULL;
            l_cal_option_display_cd      := NULL;
            l_tenor_unit                 := NULL;
            --l_principal_freq             := NULL;
          --l_interest_freq_unit         := NULL;
        END;
        l_run_point := '3';
        BEGIN
          SELECT MAX(event_seq_no)
            INTO l_max_esn
            FROM oltbs_contract_event_log
           WHERE contract_ref_no = lr_rec.contract_ref_no;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_max_esn := NULL;
        END;
        l_run_point := '4';
        BEGIN
          SELECT rate_code
            INTO l_interest_rate_cd
            FROM lftbs_contract_interest
           WHERE contract_reference_no = lr_rec.contract_ref_no
             AND shown_in_contract_main_screen = 'Y'
             AND value_date =
                 (SELECT MAX(value_date)
                    FROM lftbs_contract_interest
                   WHERE contract_reference_no = lr_rec.contract_ref_no
                     AND shown_in_contract_main_screen = 'Y'
                     AND value_date <= p_Extraction_Date)
             AND ROWNUM = 1;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_interest_rate_cd := NULL;
        END;
        dbg('l_interest_rate_cd=' || l_interest_rate_cd);
        l_run_point := '5';
        BEGIN
          SELECT (a.amount - SUM(b.amount_settled))
            INTO l_eop_curr_prin_bal
            FROM oltbs_contract_master a, oltbs_amount_paid b
           WHERE a.contract_ref_no = lr_rec.contract_ref_no
             AND a.branch = p_Branch_code
             AND A.contract_ref_no = B.contract_ref_no
             AND b.component = 'PRINCIPAL'
             AND a.event_seq_no =
                 (SELECT MAX(event_seq_no)
                    FROM oltbs_contract_master
                   WHERE contract_ref_no = lr_rec.contract_ref_no)
             AND b.paid_date <= p_Extraction_Date
           GROUP BY a.amount;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_eop_curr_prin_bal := NULL;
        END;
        l_run_point := '6';
        BEGIN
          SELECT SUM((SUM(b.amount_due) - SUM(b.amount_settled)))
            INTO l_eop_int_bal
            FROM oltbs_contract_master a, oltbs_amount_due b
           WHERE a.contract_ref_no = lr_rec.contract_ref_no
             AND a.branch = p_Branch_code
             AND A.contract_ref_no = B.contract_ref_no
             AND b.component = a.main_comp
             AND a.event_seq_no =
                 (SELECT MAX(event_seq_no)
                    FROM oltbs_contract_master
                   WHERE contract_ref_no = lr_rec.contract_ref_no)
             AND b.due_date <= p_Extraction_Date
           GROUP BY b.amount_due, b.amount_settled;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_eop_int_bal := NULL;
        END;

        l_run_point := '7';
        BEGIN
          IF lr_rec.bill_ref_no IS NOT NULL THEN
            l_numb_instal_prin := 1;
          ELSE
            SELECT COUNT(*)
              INTO l_numb_instal_prin
              FROM oltbs_contract_schedules
             WHERE contract_ref_no = lr_rec.contract_ref_no
               AND component = 'PRINCIPAL'
               AND amount > 0;
          END IF;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_numb_instal_prin := NULL;
        END;

        l_run_point := '8';
        BEGIN
          SELECT SUM(amount_settled), MIN(paid_date)
            INTO l_prepayment_amount, l_prepayment_date
            FROM oltbs_amount_paid
           WHERE contract_ref_no = lr_rec.contract_ref_no;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_prepayment_amount := NULL;
            l_prepayment_date   := NULL;
        END;

        l_run_point := '9';
        BEGIN
          SELECT SUM(b.amount_paid)
            INTO l_tot_revenue
            FROM oltbs_contract_master a, oltbs_contract_liq b
           WHERE a.contract_ref_no = lr_rec.contract_ref_no
             AND a.branch = p_Branch_code
             AND A.contract_ref_no = B.contract_ref_no
             AND b.component = a.main_comp
             AND b.event_seq_no = a.event_seq_no
             AND a.event_seq_no =
                 (SELECT MAX(event_seq_no)
                    FROM oltbs_contract_master
                   WHERE contract_ref_no = lr_rec.contract_ref_no)
           GROUP BY b.amount_paid;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_tot_revenue := NULL;
        END;

        l_run_point := '10';
        BEGIN
          SELECT SUM(reserve_txn_amt)
            INTO l_write_off_amount
            FROM oltbs_contract_reserve
           WHERE contract_ref_no = lr_rec.contract_ref_no
             AND reserve_status = 'W';
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_write_off_amount := NULL;
        END;

        l_run_point := '11';
        BEGIN
          SELECT A.ac_no
            INTO l_accr_int_gl_code
            FROM oltbs_daily_log_ac A, oltbs_contract_master B
           WHERE B.contract_ref_no = lr_rec.contract_ref_no
             AND A.trn_ref_no = B.contract_ref_no
             AND B.branch = lr_rec.branch
             AND A.event = 'ACCR'
             AND B.event_seq_no =
                 (SELECT MAX(event_seq_no)
                    FROM oltbs_contract_master
                   WHERE contract_ref_no = lr_rec.contract_ref_no)
             AND A.amount_tag like B.main_comp || '%'
             AND rownum = 1
           ORDER BY B.event_seq_no DESC;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_accr_int_gl_code := NULL;
        END;

        l_run_point := '12';
        BEGIN
          SELECT customer_name1,
                 country,
                 customer_type,
                 decode(customer_type, 'I', 'IND', 'C', 'CORP')
            INTO l_acct_display_name,
                 l_country_id,
                 l_cust_type,
                 l_ownership_type
            FROM sttms_core_customer
           where customer_no = lr_rec.counterparty;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_acct_display_name := NULL;
            l_country_id        := NULL;
            l_cust_type         := NULL;
            l_ownership_type    := NULL;
        END;
        l_run_point := '13';
        BEGIN
          SELECT ext_party_account
            INTO l_autopay_acct_number
            FROM oltb_settlements A, oltbs_contract_master B
           WHERE A.contract_ref_no = lr_rec.contract_ref_no
             AND A.contract_ref_no = B.contract_ref_no
             AND B.branch = lr_rec.branch
             AND B.event_seq_no =
                 (SELECT MAX(event_seq_no)
                    FROM oltbs_contract_master
                   WHERE contract_ref_no = lr_rec.contract_ref_no)
             AND A.event_seq_no = B.event_seq_no
             AND A.amount_tag = 'PRINCIPAL';
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_autopay_acct_number := NULL;
        END;
        l_run_point := '14';
        BEGIN
          SELECT linked_to_ref
            INTO l_coll_code
            FROM oltbs_contract_linkages
           Where contract_ref_no = lr_rec.contract_ref_no
             AND ROWNUM = 1
             AND linkage_type = 'C';
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_coll_code := NULL;
        END;
        l_run_point := '15';

        l_gaap_code := 'USGAAP';

        l_run_point := '16';
        BEGIN
          SELECT MAX(value_date)
            INTO l_adjusment_effective_date
            FROM lftbs_contract_interest
           WHERE contract_reference_no = lr_rec.contract_ref_no
             AND value_date <= p_Extraction_Date;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_adjusment_effective_date := NULL;
        END;

        l_run_point := '17';
        BEGIN
          SELECT MAX(a.event_date)
            INTO l_closed_date
            from oltbs_contract_event_log a, oltbs_contract_master b
           where a.contract_ref_no = lr_rec.contract_ref_no
             AND b.branch = lr_rec.branch
             AND b.contract_ref_no = a.contract_ref_no
             AND a.event_date <= p_Extraction_Date
                --AND b.contract_status = 'L'
             AND a.event_seq_no =
                 (SELECT MAX(event_seq_no)
                    FROM oltbs_contract_event_log c
                   WHERE c.contract_ref_no = a.contract_ref_no)
             AND b.event_seq_no = a.event_seq_no;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_closed_date := NULL;
        END;

        l_run_point := '18';
        BEGIN
          SELECT linked_to_ref
            INTO l_commitment_no
            FROM oltbs_contract_linkages
           WHERE contract_ref_no = lr_rec.contract_ref_no
             AND linkage_type = 'M'
             AND event_seq_no = '1';
          --AND rownum=1;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_commitment_no := NULL;
        END;
        l_run_point := '19';
        BEGIN
          SELECT a.new_maturity_date
            INTO l_revised_maturity_date
            FROM olvws_vami_summary a, oltbs_contract_master b
           WHERE a.contract_ref_no = lr_rec.contract_ref_no
             AND a.branch = lr_rec.branch
             AND a.contract_ref_no = b.contract_ref_no
             AND a.branch = b.branch
             AND a.new_maturity_date <> b.maturity_date
             AND rownum = 1;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_revised_maturity_date := NULL;
        END;

        l_run_point := '20';
        BEGIN
          SELECT MIN(a.end_date)
            INTO l_start_date_i
            FROM oltbs_contract_schedules A, oltbs_contract_master B
           WHERE a.contract_ref_no = lr_rec.contract_ref_no
             AND b.contract_ref_no = a.contract_ref_no
             AND a.component = b.main_comp
             AND b.event_seq_no =
                 (SELECT MAX(c.event_seq_no)
                    FROM oltbs_contract_master c
                   WHERE c.contract_ref_no = lr_rec.contract_ref_no);
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_start_date_i := NULL;
        END;

        l_run_point := '21';
        BEGIN
          SELECT MIN(a.end_date)
            INTO l_start_date_p
            FROM oltbs_contract_schedules A, oltbs_contract_master B
           WHERE a.contract_ref_no = lr_rec.contract_ref_no
             AND b.contract_ref_no = a.contract_ref_no
             AND a.component = 'PRINCIPAL'
             AND b.event_seq_no =
                 (SELECT MAX(c.event_seq_no)
                    FROM oltbs_contract_master c
                   WHERE c.contract_ref_no = lr_rec.contract_ref_no);
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_start_date_p := NULL;
        END;

        l_run_point := '22';
        IF (lr_rec.module_code = 'LS') THEN
          l_participation_flg := 'Y';
        ELSE
          l_participation_flg := 'N';
        END IF;

        l_run_point := '23';
        BEGIN
          SELECT COUNT(*)
            INTO l_cnt__restructured_ind
            FROM oltbs_contract_event_log
           WHERE contract_ref_no = lr_rec.contract_ref_no
             AND event_code = 'VAMI'
             AND event_date <= p_Extraction_Date;

          IF (l_cnt__restructured_ind > 0) THEN
            l_restructured_ind := 'Y';
          ELSE
            l_restructured_ind := 'N';
          END IF;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_restructured_ind := NULL;
        END;

        l_run_point := '24';
        BEGIN
          SELECT suppress
            INTO l_stmt_supp_flag
            FROM oltbs_contract_event_advice
           WHERE contract_ref_no = lr_rec.contract_ref_no
             AND msg_type = 'OL_CONT_ADV'
             AND event_seq_no =
                 (SELECT MAX(event_seq_no)
                    FROM oltbs_contract_event_advice
                   WHERE contract_ref_no = lr_rec.contract_ref_no
                     AND msg_type = 'OL_CONT_ADV');
          --AND rownum =1
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_stmt_supp_flag := NULL;
        END;

        l_run_point := '25';
        BEGIN
          SELECT count(*)
            INTO l_cnt_student_status_flg
            FROM oltm_product
           WHERE product_code = lr_rec.product_code
             AND UPPER(product_description) LIKE '%EDUCATION%'; --Fix_for_19975746

          IF (l_cnt_student_status_flg > 0) THEN
            l_student_status_flg := 'Y';
          ELSE
            l_student_status_flg := 'N';
          END IF;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_student_status_flg := 'N'; --Fix_for_19975746
        END;

        l_run_point := '26';
        BEGIN
          SELECT SUM(lcy_amount)
            INTO l_cum_recoveries
            FROM oltbs_daily_log_ac
           WHERE trn_ref_no = lr_rec.contract_ref_no
             AND trn_code = lr_rec.branch
             AND amount_tag LIKE '%_LIQD'
             AND event = 'LIQD';
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_cum_recoveries := NULL;
        END;

        l_run_point := '27';
        BEGIN
          SELECT SUM(amount_settled)
            INTO l_curr_payment_recd
            FROM oltbs_amount_paid
           WHERE contract_ref_no = lr_rec.contract_ref_no
                /*AND (paid_date BETWEEN TRUNC(p_Extraction_Date, 'MM') and p_Extraction_Date)*/
             AND paid_date <= p_Extraction_Date;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_curr_payment_recd := NULL;
        END;
        l_run_point := '28';
        BEGIN
          SELECT /*frequency,*/
           frequency_unit
            INTO /*l_repricing_freq,*/ l_reprice_freq_unit
            FROM oltbs_contract_schedules
           WHERE contract_ref_no = lr_rec.contract_ref_no
             AND component =
                 (SELECT component
                    from lftm_product_iccf
                   WHERE product = lr_rec.product_code
                     and shown_in_contract_main_screen = 'Y') --data to be added
             AND ROWNUM = 1
             AND schedule_type = 'R';
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_repricing_freq := NULL;
        END;
        l_run_point := '29';
        BEGIN
          SELECT amount, maturity_date
            INTO l_orig_book_bal, l_orig_maturity_date
            FROM oltbs_contract_master
           WHERE contract_ref_no = lr_rec.contract_ref_no
             AND branch = lr_rec.branch
             AND version_no = 1;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            BEGIN
              SELECT amount, maturity_date
                INTO l_orig_book_bal, l_orig_maturity_date
                from oltbs_contract_master
               WHERE contract_ref_no = lr_rec.contract_ref_no
                 AND branch = lr_rec.branch
                 AND ROWNUM = 1;
            EXCEPTION
              WHEN NO_DATA_FOUND THEN
                l_orig_book_bal      := NULL;
                l_orig_maturity_date := NULL;
            END;
        END;
        l_run_point := '30';
        BEGIN
          SELECT frequency_unit
            INTO l_orig_amrt_term_unit
            FROM oltbs_contract_schedules
           WHERE contract_ref_no = lr_rec.contract_ref_no
             AND component =
                 (SELECT component
                    from lftm_product_iccf
                   WHERE product = lr_rec.product_code
                     and shown_in_contract_main_screen = 'Y') --data to be added
             AND ROWNUM = 1
             AND version_no = 1;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            BEGIN
              SELECT frequency_unit
                INTO l_orig_amrt_term_unit
                FROM oltbs_contract_schedules
               WHERE contract_ref_no = lr_rec.contract_ref_no
                 AND component =
                     (SELECT component
                        from lftm_product_iccf
                       WHERE product = lr_rec.product_code
                         and shown_in_contract_main_screen = 'Y') --data to be added
                 AND ROWNUM = 1;
            EXCEPTION
              WHEN NO_DATA_FOUND THEN
                l_orig_amrt_term_unit := NULL;
            END;
        END;

        l_run_point := '31';
        BEGIN
          SELECT MIN(event_date)
            INTO l_approve_date
            FROM oltbs_contract_event_log
           WHERE contract_ref_no = lr_rec.contract_ref_no
             AND event_code = 'INIT';
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_approve_date := NULL;
        END;

        l_run_point := '32'; --Need to check Advance payment option in OL

        l_run_point := '33';
        BEGIN
          SELECT account_head
            INTO l_gl_code
            FROM oltms_product_accrole
           WHERE product_code = lr_rec.product_code
             AND accounting_role = 'LOAN_ACCOUNT'; --Need to check accounting_role in OL
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_gl_code := NULL;
        END;

        l_run_point := '34';
        BEGIN
          SELECT SUM(amount_due)
            INTO l_accrued_interest
            FROM oltbs_amount_due
           WHERE contract_ref_no = lr_rec.contract_ref_no
             AND component =
                 (SELECT component
                    FROM lftm_product_iccf
                   WHERE product = lr_rec.product_code
                     AND shown_in_contract_main_screen = 'Y') --data to be added
             AND due_date BETWEEN
                 (SELECT MAX(paid_date)
                    FROM oltbs_amount_paid
                   WHERE contract_ref_no = lr_rec.contract_ref_no
                     AND component =
                         (SELECT component
                            FROM lftm_product_iccf
                           WHERE product = lr_rec.product_code
                             AND shown_in_contract_main_screen = 'Y')) --data to be added
             AND p_Extraction_Date;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_accrued_interest := NULL;
        END;

        l_run_point := '35';
        BEGIN
          SELECT SUM(amount_due)
            INTO l_instal_int_amt
            FROM oltbs_amount_due
           WHERE contract_ref_no = lr_rec.contract_ref_no
             AND component =
                 (SELECT component
                    FROM lftm_product_iccf
                   WHERE product = lr_rec.product_code
                     AND shown_in_contract_main_screen = 'Y')
             AND extract(MONTH FROM due_date) =
                 extract(MONTH FROM p_Extraction_Date)
             AND extract(YEAR FROM due_date) =
                 extract(YEAR FROM p_Extraction_Date);
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_instal_int_amt := NULL;
        END;

        l_run_point := '36';
        BEGIN
          SELECT SUM(amount_due)
            INTO l_instal_prin_amt
            FROM oltbs_amount_due
           WHERE contract_ref_no = lr_rec.contract_ref_no
             AND component = 'PRINCIPAL'
             AND extract(MONTH FROM due_date) =
                 extract(MONTH FROM p_Extraction_Date)
             AND extract(YEAR FROM due_date) =
                 extract(YEAR FROM p_Extraction_Date);
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_instal_prin_amt := NULL;
        END;
        l_run_point := '37'; --Need to Check

        l_run_point := '38';
        BEGIN
          SELECT MAX(paid_date)
            INTO l_last_payment_date
            FROM oltbs_amount_paid
           WHERE contract_ref_no = lr_rec.contract_ref_no
             AND payment_status = 'A'
             AND paid_date <= p_Extraction_Date;

        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_last_payment_date := NULL;
        END;

        l_run_point := '39';
        BEGIN
          SELECT IRR
            INTO l_internal_rate_of_return
            FROM oltbs_contract_irr
           WHERE contract_ref_no = lr_rec.contract_ref_no
                --AND branch_code = LR_REC.branch_code
             AND effective_date =
                 (SELECT MAX(effective_date)
                    FROM oltbs_contract_irr
                   WHERE contract_ref_no = lr_rec.contract_ref_no
                     AND effective_date <= p_Extraction_Date);
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_internal_rate_of_return := NULL;
        END;
        l_run_point := '40'; --Need to Check late_payment_fee

        l_run_point := '41';
        BEGIN
          SELECT MIN(due_date)
            INTO l_date
            FROM oltbs_amount_due
           WHERE contract_ref_no = lr_rec.contract_ref_no
             AND amount_settled < amount_due
             AND component = 'PRINCIPAL';

          IF (p_extraction_date - l_date) > 89 THEN
            l_past_due_flag := 'Y';
          ELSE
            l_past_due_flag := 'N';
          END IF;

        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_past_due_flag := NULL;
        END;

        l_run_point := '42'; --getms_collat Need to check

        l_run_point := '43';
        BEGIN
          SELECT MAX(event_date), MIN(event_date)
            INTO l_last_reprice_date, l_orig_repricing_date
            FROM oltbs_contract_event_log
           WHERE contract_ref_no = lr_rec.contract_ref_no
             AND event_code IN ('REVN', 'ARVN')
             AND event_date <= p_Extraction_Date;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_last_reprice_date   := NULL;
            l_orig_repricing_date := NULL;
        END;
        l_run_point := '44';
        BEGIN
          SELECT handoff_time
            INTO l_last_stmt_date
            FROM oltbs_dly_msg_out
           WHERE msg_type = 'OL_CONT_ADV'
             AND reference_no = lr_rec.contract_ref_no
             AND seq_no =
                 (SELECT MAX(seq_no)
                    FROM oltbs_dly_msg_out
                   WHERE reference_no = lr_rec.contract_ref_no);
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_last_stmt_date := NULL;
          WHEN TOO_MANY_ROWS THEN
            l_last_stmt_date := NULL;
        END;
        l_run_point := '45';
        BEGIN
          SELECT MIN(due_date)
            INTO l_next_payment_date
            FROM oltbs_amount_due
           WHERE due_date > p_Extraction_Date
             AND amount_due <> amount_settled
             AND component = 'PRINCIPAL'
             AND contract_ref_no = lr_rec.contract_ref_no;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_next_payment_date := NULL;
        END;
        l_run_point := '46';
        BEGIN
          SELECT due_date
            INTO l_orig_next_payment_date
            FROM oltbs_amount_due
           WHERE component = 'PRINCIPAL'
             AND contract_ref_no = lr_rec.contract_ref_no
             AND due_date > p_Extraction_Date
             AND ROWNUM = 1;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            BEGIN
              SELECT end_date
                INTO l_orig_next_payment_date
                FROM oltbs_contract_schedules
               WHERE component = 'PRINCIPAL'
                 AND contract_ref_no = lr_rec.contract_ref_no
                 AND end_date > p_Extraction_Date
                 AND ROWNUM = 1;
            EXCEPTION
              WHEN NO_DATA_FOUND THEN
                l_orig_next_payment_date := NULL;
            END;
        END;
        l_run_point := '47';
        BEGIN
          SELECT MIN(a.paid_date)
            INTO l_writeback_date
            FROM oltbs_amount_paid a, oltbs_daily_log_ac b
           WHERE b.event IN ('LIQD')
             AND a.contract_ref_no = lr_rec.contract_ref_no
             AND a.contract_ref_no = b.trn_ref_no
             AND b.amount_tag LIKE a.component || '%_LIQD'
             AND a.event_seq_no =
                 (SELECT MAX(c.event_seq_no)
                    FROM oltbs_amount_paid c
                   WHERE c.contract_ref_no = lr_rec.contract_ref_no);
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_writeback_date := NULL;
        END;
        l_run_point := '48';
        BEGIN
          SELECT COUNT(*)
            INTO l_contract_cancelled_count
            FROM oltbs_contract_event_log
           WHERE event_code = 'REVC'
             AND contract_ref_no = lr_rec.contract_ref_no;
          IF l_contract_cancelled_count > 0 THEN
            l_contract_cancelled_ind := 'Y';
          ELSE
            l_contract_cancelled_ind := 'N';
          END IF;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_contract_cancelled_ind := NULL;
        END;
        l_run_point := '49';
        BEGIN
          SELECT COUNT(*)
            INTO l_count
            FROM oltbs_contract a, oltbs_contract_linkages b
           WHERE a.contract_ref_no = lr_rec.contract_ref_no
             AND a.branch = lr_rec.branch
             AND a.contract_ref_no = b.contract_ref_no
             and a.branch = b.linked_to_branch
             and a.contract_ccy = b.linked_to_currency
             and b.linkage_type = 'C';

          IF l_count > 0 THEN
            l_exp_coll_ccy_same_flag := 'Y';
          ELSE
            l_exp_coll_ccy_same_flag := 'N';
          END IF;

        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_exp_coll_ccy_same_flag := NULL;
        END;

        l_run_point := '50';
        BEGIN
          SELECT COUNT(*)
            INTO l_cnt_fx_fund_curr_same_ind
            FROM oltbs_contract a, sttms_core_branch b
           WHERE a.contract_ref_no = lr_rec.contract_ref_no
             AND a.branch = lr_rec.branch
             AND a.branch = b.branch_code
             AND a.contract_ccy = b.branch_lcy;

          IF l_cnt_fx_fund_curr_same_ind > 0 THEN
            l_exp_fx_fund_curr_same_ind := 'Y';
          ELSE
            l_exp_fx_fund_curr_same_ind := 'N';
          END IF;

        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_exp_fx_fund_curr_same_ind := NULL;
        END;
        l_run_point := '51';
        BEGIN
          SELECT SUM(principal_outstanding_bal)
            INTO l_avg_book_bal
            FROM oltbs_contract_balance
           WHERE contract_ref_no = lr_rec.contract_ref_no;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_avg_book_bal := NULL;
        END;
        l_run_point := '52';
        BEGIN
          l_drawndown_percent := (lr_rec.amount / lr_rec.lcy_amount) * 100; --Need Check
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_drawndown_percent := NULL;
          WHEN OTHERS THEN
            l_drawndown_percent := NULL;
        END;

        l_run_point := '53';
        BEGIN
          SELECT SUM(NVL(amount_due, 0) - NVL(amount_settled, 0))
            INTO l_due_interest
            FROM oltbs_amount_due
           WHERE contract_ref_no = lr_rec.contract_ref_no
             AND component <> 'PRINCIPAL'
             AND due_date >= p_Extraction_Date;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_due_interest := NULL;
        END;

        l_run_point := '54';
        BEGIN
          SELECT SUM(amount_settled)
            INTO l_eop_prev_prin_bal_1
            FROM oltbs_amount_paid
           WHERE contract_ref_no = lr_rec.contract_ref_no
             AND component = 'PRINCIPAL'
             AND paid_date <=
                 NVL(prev_Extraction_Date, p_Extraction_Date - 1);

          l_eop_prev_prin_bal := lr_rec.Amount - l_eop_prev_prin_bal_1;

        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_eop_prev_prin_bal := NULL;
        END;

        l_run_point := '55';
        BEGIN
          SELECT SUM(lcy_amount)
            INTO l_int_recovered_amt_lcy
            FROM oltbs_daily_log_ac
           WHERE trn_ref_no = lr_rec.contract_ref_no
             AND amount_tag LIKE
                 (SELECT component
                    FROM lftm_product_iccf
                   WHERE product = lr_rec.product_code
                     AND shown_in_contract_main_screen = 'Y') || '_LIQD'
             AND event IN ('LIQD');
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_int_recovered_amt_lcy := NULL;
        END;

        l_run_point := '56';
        BEGIN
          SELECT SUM(A.amount_due) - SUM(A.amount_settled)
            INTO l_reprice_amt
            FROM oltbs_amount_due a, oltbs_amount_paid B
           WHERE A.contract_ref_no = lr_rec.contract_ref_no
             AND A.contract_ref_no = B.contract_ref_no
             AND B.component <> 'PRINCIPAL'
             AND A.component = B.component
             AND B.paid_date <= l_last_reprice_date;

          SELECT SUM(amount)
            INTO l_amt_disbursed
            FROM oltbs_contract_schedules
           WHERE contract_ref_no = lr_rec.contract_ref_no
             AND end_date <= l_last_reprice_date;

          SELECT SUM(amount_settled)
            INTO l_prin_paid
            FROM oltbs_amount_paid
           WHERE contract_ref_no = lr_rec.contract_ref_no
             AND component = 'PRINCIPAL'
             AND paid_date <= l_last_reprice_date;

          l_lrd_balance := l_reprice_amt + (l_amt_disbursed - l_prin_paid);

        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_lrd_balance := NULL;
        END;
        l_run_point := '57';
        BEGIN
          SELECT COUNT(1)
            INTO l_no_of_payments
            FROM oltbs_contract_liq
           WHERE contract_ref_no = lr_rec.contract_ref_no;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_no_of_payments := NULL;
        END;
        l_run_point := '58';
        BEGIN
          SELECT COUNT(1)
            INTO l_orig_amrt_term
            FROM oltbs_contract_schedules
           WHERE component =
                 (SELECT component
                    FROM lftm_product_iccf
                   WHERE product = lr_rec.product_code
                     AND shown_in_contract_main_screen = 'Y')
             AND schedule_type = 'P'
             AND contract_ref_no = lr_rec.contract_ref_no
             AND version_no = 1;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_orig_amrt_term := NULL;
        END;
        l_run_point := '59'; -- Need to check

        l_run_point := '60';
        /*BEGIN
          SELECT A.amount / SUM(B.linked_amount)
            INTO l_orig_ltv
            FROM oltbs_contract_master A, oltbs_contract_linkages B
           WHERE A.contract_ref_no = lr_rec.contract_ref_no
             AND A.branch = lr_rec.branch
             AND A.version_no = 1
             AND A.contract_ref_no = B.contract_ref_no
             AND A.branch = B.linked_to_branch
             AND A.version_no = B.version_no
           GROUP BY A.Amount;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_orig_ltv := NULL;
        END;*/

        l_run_point := '61';
        BEGIN
          SELECT amount
            INTO l_orig_payment_amt
            FROM oltbs_contract_master
           WHERE contract_ref_no = lr_rec.contract_ref_no
             AND branch = lr_rec.branch
             AND version_no = 1;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_orig_payment_amt := NULL;
        END;
        l_run_point := '62';
        BEGIN
          SELECT COUNT(1)
            INTO l_orig_remain_no_of_pmts
            FROM oltbs_amount_due
           WHERE contract_ref_no = lr_rec.contract_ref_no
                --AND schedule_type = 'P'
                --AND version_no = 1
             AND NVL(amount_due, 0) > NVL(amount_settled, 0)
             AND component =
                 (SELECT component
                    FROM lftm_product_iccf
                   WHERE product = lr_rec.product_code
                     AND shown_in_contract_main_screen = 'Y');
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_orig_remain_no_of_pmts := NULL;
        END;

        l_run_point := '63';
        BEGIN
          SELECT SUM(NVL(amount_due, 0)) - SUM(NVL(amount_settled, 0))
            INTO l_overdue_int
            FROM oltbs_amount_due T, oltbs_contract_schedules S
           WHERE T.contract_ref_no = lr_rec.contract_ref_no
             AND T.contract_ref_no = S.contract_ref_no
             AND T.component = S.component
             AND NVL(S.schedule_type, 'P') = 'P'
             AND NVL(T.amount_settled, 0) <> NVL(T.amount_due, 0)
             AND T.due_date <= p_Extraction_Date;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_overdue_int := NULL;
        END;
        l_run_point := '64'; --Need to check
        BEGIN
          SELECT SUM(lcy_amount)
            INTO l_prin_recovered_amt_lcy
            FROM oltbs_daily_log_ac
           WHERE trn_ref_no = lr_rec.contract_ref_no
             AND amount_tag LIKE '_LIQD'
             AND event IN ('LIQD');
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_prin_recovered_amt_lcy := NULL;
        END;

        l_run_point := '65';
        BEGIN
          SELECT linked_amount, linked_to_ref
            INTO l_sanctioned_limit, l_linked_ref_no
            FROM oltbs_contract_linkages
           WHERE contract_ref_no = lr_rec.contract_ref_no
             AND linkage_type = 'M'
             AND ROWNUM = 1;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_sanctioned_limit := NULL;
        END;

        l_run_point := '66';
        BEGIN
          SELECT amount
            INTO l_tot_comm_amt
            FROM oltbs_contract_master
           WHERE contract_ref_no = l_linked_ref_no
             AND branch = lr_rec.branch
             AND event_seq_no =
                 (SELECT MAX(event_seq_no)
                    FROM oltbs_contract_master A
                   WHERE A.contract_ref_no = l_linked_ref_no);
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_tot_comm_amt := NULL;
        END;
        l_run_point := '67';
        BEGIN
          SELECT COUNT(1)
            INTO l_total_transactions
            FROM oltbs_contract_event_log
           WHERE contract_ref_no = lr_rec.contract_ref_no
             AND event_code in ('DSBR', 'LIQD'); --Need to Check
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_total_transactions := NULL;
        END;
        l_run_point := '68';
        BEGIN
          SELECT currency
            INTO l_benchmark_ccy_code
            FROM lftbs_contract_interest
           WHERE contract_reference_no = lr_rec.contract_ref_no
             AND shown_in_contract_main_screen = 'Y'
             AND ROWNUM = 1;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_benchmark_ccy_code := NULL;
        END;
        l_run_point := '69';
        BEGIN
          SELECT product_type
            INTO l_product_type
            FROM oltms_product_master_ld
           WHERE product = lr_rec.product_code;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_product_type := NULL;
        END;
        IF l_product_type = 'L' THEN
          l_category := 'LOAN';
        ELSE
          l_category := 'COMMITMENT';
        END IF;

        l_run_point := '70';
        BEGIN
          SELECT linked_to_currency
            INTO l_coll_ccy
            FROM oltbs_contract_linkages
           WHERE contract_ref_no = lr_rec.contract_ref_no
             AND linkage_type = 'C'
             AND rownum = 1;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_coll_ccy := NULL;
        END;
        l_run_point := '71'; -- Need To Check Collateral Type

        l_run_point := '72';
        BEGIN
          SELECT linked_to_ref
            INTO l_line_code
            FROM oltbs_contract_linkages
           WHERE contract_ref_no = lr_rec.contract_ref_no
             AND linkage_type = 'L' --We are not supporting linkage type 'L'
             AND event_seq_no = 1;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_line_code := NULL;
        END;

        l_run_point := '73';
        BEGIN
          SELECT MIN(event_date)
            INTO l_next_finance_date
            FROM oltbs_contract_event_log
           WHERE contract_ref_no = lr_rec.contract_ref_no
             AND event_code = 'INIT'
             AND auth_status = 'U'
             AND event_date > p_Extraction_Date;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_next_finance_date := NULL;
        END;

        l_run_point := '74';
        BEGIN
          SELECT MIN(paid_date)
            INTO l_orig_payment_date
            FROM oltbs_amount_paid
           WHERE contract_ref_no = lr_rec.contract_ref_no
             AND component = 'PRINCIPAL';
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_orig_payment_date := NULL;
        END;

        l_run_point := '75';
        BEGIN
          SELECT MIN(value_dt)
            INTO l_writeback_int_date
            FROM oltbs_daily_log_ac
           WHERE event = 'LIQD'
             AND trn_ref_no = lr_rec.contract_ref_no
             AND amount_tag LIKE '_LIQD';
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_writeback_int_date := NULL;
        END;
        l_run_point := '76';
        BEGIN
          SELECT MIN(c.value_date)
            INTO l_writeoff_date
            FROM oltbs_contract_reserve c
           WHERE c.contract_ref_no = lr_rec.contract_ref_no
             AND c.reserve_status = 'W';
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_writeoff_date := NULL;
        END;
        l_run_point := '77';
        BEGIN
          SELECT maturity_date - value_date
            INTO l_amrt_term
            FROM oltbs_contract_master
           WHERE contract_ref_no = lr_rec.contract_ref_no
             AND branch = lr_rec.branch
             AND event_seq_no =
                 (SELECT MAX(event_seq_no)
                    FROM oltbs_contract_master
                   WHERE contract_ref_no = lr_rec.contract_ref_no)
          /*AND amortized = 'Y'*/
          ;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_amrt_term := NULL;
        END;
        l_run_point := '78';
        /*BEGIN
          SELECT p_Extraction_Date - MIN(due_date)
            INTO l_delinquent_days
            FROM oltbs_amount_due
           WHERE contract_ref_no = lr_rec.contract_ref_no
             AND amount_due <> amount_settled
             AND component IN
                 ((SELECT component
                     FROM lftm_product_iccf
                    WHERE product = lr_rec.product_code
                      AND shown_in_contract_main_screen = 'Y'), 'PRINCIPAL');

          IF l_delinquent_days < 0 THEN
            l_delinquent_days := 0;
          END IF;

        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_delinquent_days := NULL;
        END;*/
        l_run_point := '79';
        /*BEGIN
          SELECT A.amount / SUM(B.linked_amount)
            INTO l_exp_ltv_ratio
            FROM oltbs_contract_master A, oltbs_contract_linkages B
           WHERE A.contract_ref_no = lr_rec.contract_ref_no
             AND A.branch = lr_rec.branch
             AND A.contract_ref_no = B.contract_ref_no
             AND A.event_seq_no =
                 (SELECT MAX(event_seq_no)
                    FROM oltbs_contract_master
                   WHERE contract_ref_no = lr_rec.contract_ref_no)
           GROUP BY A.amount;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_exp_ltv_ratio := NULL;
        END;*/
        l_run_point := '80';
        BEGIN
          SELECT SUM(lcy_amount)
            INTO l_int_recd
            FROM oltbs_daily_log_ac A
           WHERE A.trn_ref_no = lr_rec.contract_ref_no
             AND A.event IN ('LIQD')
             AND A.amount_tag LIKE
                 (SELECT component
                    FROM lftm_product_iccf
                   WHERE product = lr_rec.product_code
                     AND shown_in_contract_main_screen = 'Y') || '%';
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_int_recd := NULL;
        END;

        l_run_point := '81';
        BEGIN
          SELECT SUM(amount)
            INTO l_renewal_fee
            FROM lftb_contract_charges
           WHERE contract_reference_no = lr_rec.contract_ref_no
             AND event IN ('ROLL', 'SROL', 'ROLB');
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_renewal_fee := NULL;
        END;

        l_run_point := '82';
        BEGIN
          SELECT SUM(amount)
            INTO l_tot_fee_chgs
            FROM lftb_contract_charges
           WHERE contract_reference_no = lr_rec.contract_ref_no;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_tot_fee_chgs := NULL;
        END;

        l_run_point := '83';
        BEGIN
          SELECT SUM(amount)
            INTO l_total_fees_at_orig
            FROM lftb_contract_charges
           WHERE contract_reference_no = lr_rec.contract_ref_no
             AND event IN ('BOOK', 'INIT');
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_total_fees_at_orig := NULL;
        END;

        l_run_point := '84';
        BEGIN
          SELECT country_code
            INTO l_exp_fund_ccy_brn
            FROM sttms_core_branch
           WHERE branch_code = lr_rec.branch;

          IF l_exp_fund_ccy_brn = l_country_id THEN
            l_exp_fund_ccy_same_ind := 'Y';
          ELSE
            l_exp_fund_ccy_same_ind := 'N';
          END IF;

        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_exp_fund_ccy_same_ind := NULL;
        END;
        l_run_point := '85';
        BEGIN
          SELECT SUM(net_accrual)
            INTO l_int_accrued_mtd
            FROM oltbs_contract_accrual_history
           WHERE contract_ref_no = lr_rec.contract_ref_no
             AND branch = lr_rec.branch
             AND component =
                 (SELECT component
                    FROM lftm_product_iccf
                   WHERE product = lr_rec.product_code
                     AND shown_in_contract_main_screen = 'Y')
             AND extract(MONTH FROM accrual_to_date) =
                 extract(MONTH FROM p_Extraction_Date)
             AND extract(YEAR FROM accrual_to_date) =
                 extract(YEAR FROM p_Extraction_Date);
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_int_accrued_mtd := NULL;
        END;

        l_run_point := '86';
        BEGIN
          SELECT SUM(lcy_amount)
            INTO l_int_recovered_amt_mtd
            FROM oltbs_daily_log_ac
           WHERE trn_ref_no = lr_rec.contract_ref_no
             AND amount_tag LIKE
                 (SELECT component
                    FROM lftm_product_iccf
                   WHERE product = lr_rec.product_code
                     AND shown_in_contract_main_screen = 'Y') || '%'
             AND value_dt BETWEEN Trunc((p_Extraction_Date), 'MM') AND
                 p_Extraction_Date;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_int_recovered_amt_mtd := NULL;
        END;

        l_run_point := '87';
        BEGIN
          SELECT SUM(lcy_amount)
            INTO l_int_wback_amt_mtd
            FROM oltbs_daily_log_ac A
           WHERE A.trn_ref_no = lr_rec.contract_ref_no
             AND A.amount_tag LIKE
                 (SELECT L.component
                    FROM lftm_product_iccf L
                   WHERE L.product = lr_rec.product_code
                     AND L.shown_in_contract_main_screen = 'Y') || '%'
             AND A.event IN ('LIQD')
             AND A.value_dt BETWEEN p_Extraction_Date and
                 last_day(p_Extraction_Date);
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_int_wback_amt_mtd := NULL;
        END;

        l_run_point := '88';
        BEGIN
          SELECT SUM(amount_settled)
            INTO l_penalty_charges_recd
            FROM oltbs_amount_paid A
           WHERE A.contract_ref_no = lr_rec.contract_ref_no
             AND A.component IN
                 (SELECT L.component
                    FROM lftm_product_iccf L
                   WHERE L.product = lr_rec.product_code
                     AND L.shown_in_contract_main_screen = 'Y')
             AND extract(MONTH FROM paid_date) =
                 extract(MONTH FROM p_Extraction_Date)
             AND extract(YEAR FROM paid_date) =
                 extract(YEAR FROM p_Extraction_Date);
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_penalty_charges_recd := NULL;
        END;

        l_run_point := '89';
        /*BEGIN
          SELECT COUNT(1)
            INTO l_repayment_type_count
            FROM oltbs_contract_schedules
           WHERE component =
                 (SELECT L.component
                    FROM lftm_product_iccf L
                   WHERE L.product = lr_rec.product_code
                     AND L.shown_in_contract_main_screen = 'Y')
             AND schedule_type = 'P'
             AND frequency_unit <> 'B'
             AND contract_ref_no = lr_rec.contract_ref_no;
          IF l_repayment_type_count > 1 THEN
            l_repayment_type := 'Staggered';
          ELSE
            l_repayment_type := 'Bullet';
          END IF;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_repayment_type := NULL;
        END;*/

        l_run_point := '90';
        BEGIN
          SELECT SUM(NVL(A.amount_due, 0) - NVL(A.amount_settled, 0))
            INTO l_due_principal
            FROM oltbs_amount_due A
           WHERE A.contract_ref_no = lr_rec.contract_ref_no
             AND NVL(A.component_type, 'I') IN ('L')
             AND A.due_date =
                 (SELECT MIN(due_date)
                    FROM oltbs_amount_due B
                   WHERE B.contract_ref_no = lr_rec.contract_ref_no
                     AND B.due_date >= p_Extraction_Date
                     AND NVL(B.amount_due, 0) > NVL(B.amount_settled, 0));
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_due_principal := NULL;
        END;

        l_run_point := '91';
        BEGIN
          SELECT SUM(NVL(cas.amount_due, 0)) -
                 SUM(NVL(cas.amount_settled, 0))
            INTO l_eop_bal
            FROM oltbs_amount_due cas
           WHERE cas.contract_ref_no = lr_rec.contract_ref_no;

        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_eop_bal := NULL;
        END;

        l_run_point := '92';
        BEGIN
          SELECT SUM(amount_settled)
            INTO l_prin_recd_mtd
            FROM oltbs_amount_paid
           WHERE contract_ref_no = lr_rec.contract_ref_no
             AND component = 'PRINCIPAL'
             AND paid_date BETWEEN Trunc(p_Extraction_Date, 'MM') and
                 p_Extraction_Date;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_prin_recd_mtd := NULL;
        END;

        l_run_point := '93';
        BEGIN
          SELECT p_Extraction_Date - MIN(end_date)
            INTO l_overdue_days_int
            FROM oltbs_contract_schedules
           WHERE contract_ref_no = lr_rec.contract_ref_no
             AND component =
                 (SELECT L.component
                    FROM lftm_product_iccf L
                   WHERE L.product = lr_rec.product_code
                     AND L.shown_in_contract_main_screen = 'Y')
             AND end_date <= p_Extraction_Date;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_overdue_days_int := NULL;
        END;

        l_run_point := '94';
        BEGIN
          SELECT p_Extraction_Date - MIN(end_date)
            INTO l_overdue_days_prin
            FROM oltbs_contract_schedules
           WHERE contract_ref_no = lr_rec.contract_ref_no
             AND component = 'PRINCIPAL'
             AND end_date <= p_Extraction_Date;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_overdue_days_prin := NULL;
        END;

        l_run_point          := '95';
        l_undrawn_amount_lcy := 0;
        BEGIN
          dbg('l_undrawn_amount_lcy_dsbr' || l_undrawn_amount_lcy_dsbr);
          l_undrawn_amount_lcy_dsbr := 0;
          l_undrawn_amount_lcy_dsbr := lr_rec.amount;
          l_undrawn_amount_lcy_fin  := 0;
          dbg('lr_rec.currency' || lr_rec.contract_ccy);
          dbg('lr_branch.branch_lcy ' || lr_branch.branch_lcy);
          dbg('lr_rec.amount' || lr_rec.amount);
          IF lr_rec.contract_ccy <> lr_branch.branch_lcy then
            IF cypkss.fn_amt1_to_amt2(global.current_branch,
                                      lr_rec.contract_ccy,
                                      lr_branch.branch_lcy,
                                      'STANDARD',
                                      'M',
                                      lr_rec.amount,
                                      'Y',
                                      l_undrawn_amount_lcy_fin,
                                      l_rate,
                                      p_errcode) THEN
              p_errcode := nvl(p_errcode, 'AC-IBCCY');
              dbg('Success In Taking Currency');
            END IF;
          ELSE
            l_undrawn_amount_lcy_fin := lr_rec.amount;
          END IF;
          dbg('l_undrawn_amount_lcy_fin' || l_undrawn_amount_lcy_fin);

          l_undrawn_amount_lcy := NVL(l_undrawn_amount_lcy_fin, 0) -
                                  NVL(l_undrawn_amount_lcy_dsbr, 0);
          dbg('l_undrawn_amount_lcy' || l_undrawn_amount_lcy);

        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_undrawn_amount_lcy := NULL;
        END;

        l_run_point := '96';
        BEGIN
          SELECT SUM(amount_settled)
            INTO l_int_income
            FROM oltbs_amount_paid
           WHERE contract_ref_no = lr_rec.contract_ref_no
             AND component IN
                 (SELECT L.component
                    FROM lftm_product_iccf L
                   WHERE L.product = lr_rec.product_code
                     AND L.shown_in_contract_main_screen = 'Y');
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_int_income := NULL;
        END;
        l_provision_amt_mtd := 0;
        l_run_point         := '97';
        BEGIN
          SELECT SUM(amount_settled)
            INTO l_interest_recd_mtd
            FROM oltbs_amount_paid
           WHERE contract_ref_no = lr_rec.contract_ref_no
             AND component =
                 (SELECT L.component
                    FROM lftm_product_iccf L
                   WHERE L.product = lr_rec.product_code
                     AND L.shown_in_contract_main_screen = 'Y')
             AND extract(MONTH FROM paid_date) =
                 extract(MONTH FROM p_Extraction_Date)
             AND extract(YEAR FROM paid_date) =
                 extract(YEAR FROM p_Extraction_Date);
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_interest_recd_mtd := NULL;
        END;
        l_run_point := '98';
        BEGIN
          SELECT principal_outstanding_bal
            INTO l_max_balance_mtd
            FROM oltbs_contract_balance
           WHERE contract_ref_no = lr_rec.contract_ref_no;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_max_balance_mtd := NULL;
        END;

        l_run_point := '99';
        BEGIN
          SELECT DECODE(interest_basis, 1, '30eur', 2, '30us', 3, 'actual'),
                 DECODE(interest_basis, 4, '360', 5, '365', 6, 'actual')
            INTO l_days_mth, l_days_year
            FROM lftbs_contract_interest
           WHERE contract_reference_no = lr_rec.contract_ref_no
             AND component =
                 (SELECT L.component
                    FROM lftm_product_iccf L
                   WHERE L.product = lr_rec.product_code
                     AND L.shown_in_contract_main_screen = 'Y')
             AND ROWNUM = 1
             AND value_date =
                 (SELECT MAX(value_date)
                    FROM lftbs_contract_interest
                   WHERE contract_reference_no = lr_rec.contract_ref_no
                     AND component =
                         (SELECT L.component
                            FROM lftm_product_iccf L
                           WHERE L.product = lr_rec.product_code
                             AND L.shown_in_contract_main_screen = 'Y')
                     AND value_date <= p_Extraction_Date);

          IF l_days_mth IS NULL OR l_days_year IS NULL THEN
            SELECT DECODE(interest_basis,
                          1,
                          '30eur',
                          2,
                          '30us',
                          3,
                          'actual'),
                   DECODE(interest_basis, 4, '360', 5, '365', 6, 'actual')
              INTO l_days_mth, l_days_year
              FROM lftbs_contract_interest
             WHERE contract_reference_no = lr_rec.contract_ref_no
               AND ROWNUM = 1
               AND component =
                   (SELECT L.component
                      FROM lftm_product_iccf L
                     WHERE L.product = lr_rec.product_code
                       AND L.shown_in_contract_main_screen = 'Y');
          END IF;

          l_day_count_ind := l_days_mth || '/' || l_days_year;

          IF l_days_mth IS NULL OR l_days_year IS NULL THEN
            SELECT DECODE(ccy_int_method,
                          1,
                          '30E/360',
                          2,
                          '30U/360',
                          3,
                          'A/360',
                          4,
                          '30E/365',
                          5,
                          '30U/365',
                          6,
                          'A/365',
                          7,
                          '30E/A',
                          8,
                          '30U/A',
                          9,
                          'Actual/Actual',
                          'A/A')
              INTO l_day_count_ind
              FROM cytms_ccy_defn a, lftbs_contract_interest b
             WHERE b.contract_reference_no = lr_rec.contract_ref_no
               AND a.ccy_code = b.currency
               AND ROWNUM = 1
               AND b.component =
                   (SELECT L.component
                      FROM lftm_product_iccf L
                     WHERE L.product = lr_rec.product_code
                       AND L.shown_in_contract_main_screen = 'Y');
          END IF;

        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_day_count_ind := NULL;
        END;

        --l_pre_closure_balance
        l_run_point := '100';
        BEGIN
          SELECT SUM(amount_due)
            INTO l_pre_closure_balance_prin
            FROM oltbs_amount_due
           WHERE contract_ref_no = lr_rec.contract_ref_no
             AND component = 'PRINCIPAL'
             AND due_date >= p_extraction_date;

          SELECT SUM(amount_due) - SUM(amount_settled)
            INTO l_pre_closure_balance_due
            FROM oltbs_amount_due
           WHERE contract_ref_no = lr_rec.contract_ref_no
             AND component <> 'PRINCIPAL'
             AND due_date >= p_extraction_date;

          SELECT SUM(amount_due * (p_extraction_date - due_date) / 30)
            INTO l_pre_closure_balance_accr
            FROM oltbs_amount_due
           WHERE contract_ref_no = lr_rec.contract_ref_no
             AND component <> 'PRINCIPAL'
             AND extract(MONTH FROM due_date) =
                 extract(MONTH FROM p_extraction_date)
             AND extract(YEAR FROM due_date) =
                 extract(YEAR FROM p_extraction_date)
             AND p_extraction_date - due_date > 0;

          l_pre_closure_balance := l_pre_closure_balance_prin +
                                   l_pre_closure_balance_accr +
                                   l_pre_closure_balance_due;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_pre_closure_balance := NULL;
        END;
        l_run_point := '101';
        BEGIN
          SELECT COUNT(*)
            INTO l_full_performing_asset_count
            FROM oltbs_amount_paid
           WHERE paid_date <> due_date
             AND contract_ref_no = lr_rec.contract_ref_no;

          IF l_full_performing_asset_count > 0 THEN
            l_full_performing_asset_flag := 'N';
          ELSE
            l_full_performing_asset_flag := 'Y';
          END IF;

        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_full_performing_asset_flag := NULL;
        END;
        l_run_point := '102';
        BEGIN
          SELECT contract_ref_no
            INTO l_secured_ind_acc
            FROM oltbs_contract_linkages
           WHERE contract_ref_no = lr_rec.contract_ref_no
             AND (linked_amount > 0 OR converted_linked_amount > 0)
             AND ROWNUM = 1;

          IF l_secured_ind_acc IS NOT NULL THEN
            l_secured_ind := 'Y';
          ELSE
            l_secured_ind := 'N';
          END IF;

        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_secured_ind := 'N';
        END;
        l_run_point := '103';
        BEGIN
          SELECT SUM(amount_due) - SUM(amount_settled)
            INTO l_after_payment_balance_tot
            FROM oltbs_amount_due a, oltbs_contract b
           WHERE a.contract_ref_no = lr_rec.contract_ref_no
             AND b.branch = lr_rec.branch
             AND a.contract_ref_no = b.contract_ref_no
          /*AND b.amortized = 'Y'*/
          ;
          SELECT SUM(amount_due) - SUM(amount_settled)
            INTO l_after_payment_balance_next
            FROM oltbs_amount_due a, oltbs_contract b
           WHERE a.contract_ref_no = lr_rec.contract_ref_no
             AND b.branch = lr_rec.branch
             AND a.contract_ref_no = b.contract_ref_no
                --AND b.amortized = 'Y'
             AND a.due_date =
                 (SELECT MIN(A.due_date)
                    FROM oltbs_amount_due A, lftbs_contract_interest C
                   WHERE A.contract_ref_no = lr_rec.contract_ref_no
                     AND A.contract_ref_no = B.contract_ref_no
                     AND A.component = C.component
                     AND A.due_date >= p_extraction_date);

          IF l_after_payment_balance_tot IS NOT NULL THEN
            l_after_payment_balance := l_after_payment_balance_tot -
                                       l_after_payment_balance_next;
          ELSE
            l_after_payment_balance := NULL;
          END IF;

          l_run_point := '104';
          BEGIN
            SELECT SUM(amount_settled)
              INTO l_cur_yield_sett
              FROM oltbs_amount_paid
             WHERE contract_ref_no = lr_rec.contract_ref_no
               AND extract(YEAR FROM paid_date) =
                   extract(YEAR FROM p_extraction_date);

            SELECT SUM(amount_due)
              INTO l_cur_yield_prin
              FROM oltbs_amount_due
             WHERE contract_ref_no = lr_rec.contract_ref_no
               AND component = 'PRINCIPAL'
               AND extract(YEAR FROM due_date) =
                   extract(YEAR FROM p_extraction_date);

            l_cur_yield := l_cur_yield_sett / l_cur_yield_prin;

          EXCEPTION
            WHEN NO_DATA_FOUND THEN
              l_cur_yield := NULL;
            WHEN OTHERS THEN
              l_cur_yield := NULL;
          END;

          l_run_point := '105';
          BEGIN
            SELECT SUM(NVL(amount_due, 0) - NVL(amount_settled, 0))
              INTO l_avg_bal_mtd_prev
              FROM oltbs_amount_due A
             WHERE A.contract_ref_no = lr_rec.contract_ref_no
               AND due_date <= add_months(p_extraction_date, -1);

            SELECT SUM(NVL(amount_due, 0) - NVL(amount_settled, 0))
              INTO l_avg_bal_mtd_curr
              FROM oltbs_amount_due A
             WHERE A.contract_ref_no = lr_rec.contract_ref_no
               AND due_date <= p_extraction_date;

            SELECT p_extraction_date - MAX(due_date)
              INTO l_avg_bal_mtd_days_count
              FROM oltbs_amount_due A
             WHERE A.contract_ref_no = lr_rec.contract_ref_no
               AND due_date <= p_extraction_date;

            IF l_avg_bal_mtd_days_count > 0 THEN
              SELECT SUM(daily_average_amount * l_avg_bal_mtd_days_count)
                INTO l_avg_bal_mtd_diff
                FROM oltbs_contract_iccf_calc
               WHERE contract_ref_no = lr_rec.contract_ref_no
                 AND schedule_date =
                     p_extraction_date - l_avg_bal_mtd_days_count;
            ELSE
              l_avg_bal_mtd_diff := 0;
            END IF;

            l_avg_bal_mtd  := (l_avg_bal_mtd_prev +
                              (l_avg_bal_mtd_curr + l_avg_bal_mtd_diff)) / 2;
            l_cur_book_bal := l_avg_bal_mtd_curr + l_avg_bal_mtd_diff;

          EXCEPTION
            WHEN NO_DATA_FOUND THEN
              l_avg_bal_mtd  := NULL;
              l_cur_book_bal := NULL;
          END;

        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_after_payment_balance := NULL;
        END;

        l_run_point := '106';
        BEGIN
          SELECT SUM(a.amount_settled)
            INTO l_recovered_amt
            FROM oltbs_amount_paid a, oltbs_contract_event_log b
           WHERE a.contract_ref_no = lr_rec.contract_ref_no
             AND b.event_code IN ('LIQD')
             AND a.contract_ref_no = b.contract_ref_no
             AND a.event_seq_no >
                 (SELECT MAX(event_seq_no)
                    FROM oltbs_contract_event_log c
                   WHERE c.event_code = 'LIQD'
                     AND a.contract_ref_no = c.contract_ref_no);
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_recovered_amt := NULL;
        END;

        --l_remain_no_of_pmts
        l_run_point := '107';
        BEGIN
          SELECT count(*)
            INTO l_remain_no_of_pmts_count
            FROM oltbs_contract_schedules
           WHERE contract_ref_no = lr_rec.contract_ref_no
             AND component = 'PRINCIPAL'
             AND schedule_type = 'P';

          IF l_remain_no_of_pmts_count > 1 THEN
            SELECT COUNT(*)
              INTO l_remain_no_of_pmts
              FROM oltbs_amount_due
             WHERE contract_ref_no = lr_rec.contract_ref_no
               AND due_date > p_extraction_date
               AND amount_settled = 0
               AND component = 'PRINCIPAL';
          ELSE
            SELECT COUNT(*)
              INTO l_remain_no_of_pmts
              FROM oltbs_amount_due
             WHERE contract_ref_no = lr_rec.contract_ref_no
               AND due_date > p_extraction_date
               AND amount_settled = 0
               AND component <> 'PRINCIPAL';
          END IF;

        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_remain_no_of_pmts := NULL;
        END;
        --l_interest_method
        l_run_point := '108';
        --l_interest_payment_type
        l_run_point := '109';
        --l_interest_type
        l_run_point := '110';
        --l_tot_prepayment_amt
        l_run_point := '111';

        --l_prin_wback_amt_mtd
        l_run_point := '112';
        BEGIN
          SELECT SUM(lcy_amount)
            INTO l_prin_wback_amt_mtd
            FROM oltbs_daily_log_ac A
           WHERE A.trn_ref_no = lr_rec.contract_ref_no
             AND A.amount_tag LIKE 'PRINCIPAL%'
             AND A.event IN ('LIQD')
             AND A.value_dt BETWEEN trunc(p_extraction_date, 'MM') AND
                 p_extraction_date;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_prin_wback_amt_mtd := NULL;
        END;

        --l_tot_writeback_mtd
        l_run_point := '113';
        BEGIN
          SELECT SUM(lcy_amount)
            INTO l_tot_writeback_mtd
            FROM oltbs_daily_log_ac A
           WHERE A.trn_ref_no = lr_rec.contract_ref_no
             AND A.event IN ('LIQD')
             AND A.value_dt BETWEEN trunc(p_extraction_date, 'MM') AND
                 p_extraction_date;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_tot_writeback_mtd := NULL;
        END;

        --l_total_writeback_amt
        l_run_point := '114';
        BEGIN
          SELECT SUM(lcy_amount)
            INTO l_total_writeback_amt
            FROM oltbs_daily_log_ac A
           WHERE A.trn_ref_no = lr_rec.contract_ref_no
             AND A.amount_tag LIKE 'PRINCIPAL%'
             AND A.event IN ('LIQD');
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_total_writeback_amt := NULL;
        END;

        --l_autopay_instr_type_cd
        l_run_point := '115';
        BEGIN
          SELECT module
            INTO l_autopay_instr_type_cd
            FROM oltbs_daily_log_ac
           WHERE ac_no = lr_rec.contract_ref_no
             AND ac_branch = lr_rec.branch
             AND module <> 'OL'
             AND ROWNUM = 1;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_autopay_instr_type_cd := NULL;
        END;

        --l_autopay_bank_transit_nbr
        l_run_point := '116';
        BEGIN
          SELECT trn_code
            INTO l_autopay_bank_transit_nbr
            FROM oltbs_daily_log_ac
           WHERE ac_no in
                 (SELECT cust_account_no
                    FROM sttms_core_account
                   WHERE customer_no = lr_rec.counterparty)
             AND ac_branch = lr_rec.branch
             AND module <> 'OL'
             AND ROWNUM = 1;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_autopay_bank_transit_nbr := NULL;
        END;

        --l_account_rem_tenor
        l_run_point := '117';
        BEGIN
          l_account_rem_tenor := (p_extraction_date - lr_rec.maturity_date);

          if l_account_rem_tenor < 0 then
            l_account_rem_tenor := 0;
          end if;

        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_account_rem_tenor := NULL;
        END;

        --l_tot_writeoff_mtd
        l_run_point := '118';
        BEGIN
          SELECT SUM(lcy_Amount)
            INTO l_tot_writeoff_mtd
            FROM oltbs_daily_log_ac A
           WHERE A.trn_ref_no = lr_rec.contract_ref_no
             AND A.event IN ('LIQD')
             AND A.value_dt BETWEEN trunc(p_extraction_date, 'MM') and
                 p_extraction_date;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_tot_writeoff_mtd := NULL;
        END;
        --l_write_off_amount_lcy
        l_run_point := '119';
        BEGIN
          SELECT SUM(lcy_Amount)
            INTO l_write_off_amount_lcy
            FROM oltbs_daily_log_ac A
           WHERE A.trn_ref_no = lr_rec.contract_ref_no
             AND A.event IN ('LIQD')
             AND A.value_dt BETWEEN trunc(p_extraction_date, 'MM') and
                 p_extraction_date;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_write_off_amount_lcy := NULL;
        END;

        --l_last_delinquent_date
        l_run_point := '120';
        BEGIN
          SELECT MAX(value_dt)
            INTO l_last_delinquent_date
            FROM oltbs_daily_log_ac
           WHERE trn_ref_no = lr_rec.contract_ref_no
             AND value_dt <= p_extraction_date;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_last_delinquent_date := NULL;
        END;

        --l_no_of_interest_only_mths
        l_run_point := '121';
        BEGIN
          SELECT COUNT(*)
            INTO l_no_of_interest_only_mths
            FROM oltbs_contract_schedules
           WHERE contract_ref_no = lr_rec.contract_ref_no
             AND component =
                 (SELECT L.component
                    FROM lftm_product_iccf L
                   WHERE L.product = lr_rec.product_code
                     AND L.shown_in_contract_main_screen = 'Y');
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_no_of_interest_only_mths := NULL;
        END;

        --l_acct_status_code
        l_run_point := '122';
        BEGIN
          select user_defined_status
            into l_acct_status_code
            from oltbs_contract
           where contract_ref_no = lr_rec.contract_ref_no
             and branch = lr_rec.branch;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_acct_status_code := NULL;
        END;

        --l_delinquency_status_code
        l_run_point := '123';
        BEGIN
          SELECT MAX(event_date)
            INTO l_delinquency_status_to
            FROM oltbs_contract_event_log
           WHERE contract_ref_no = lr_rec.contract_ref_no
             AND event_date <= p_extraction_date;

          SELECT MAX(event_date)
            INTO l_delinquency_status_from
            FROM oltbs_contract_event_log
           WHERE contract_ref_no = lr_rec.contract_ref_no
             AND event_date <= l_delinquency_status_to;

          l_delinquency_status_count := l_delinquency_status_to -
                                        l_delinquency_status_from;

          IF l_delinquency_status_count > 0 THEN
            IF l_delinquency_status_count <= 30 THEN
              l_delinquency_status_code := '30_DAYS';
            ELSIF l_delinquency_status_count <= 60 THEN
              l_delinquency_status_code := '60_DAYS';
            ELSIF l_delinquency_status_count <= 90 THEN
              l_delinquency_status_code := '90_DAYS';
            ELSIF l_delinquency_status_count <= 120 THEN
              l_delinquency_status_code := '120_DAYS';
            ELSIF l_delinquency_status_count <= 150 THEN
              l_delinquency_status_code := '150_DAYS';
            ELSIF l_delinquency_status_count > 150 THEN
              l_delinquency_status_code := '180+_DAYS';
            END IF;
          ELSE
            l_delinquency_status_code := 'Current';
          END IF;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_delinquency_status_code := NULL;
        END;

        --l_account_status
        l_run_point := '124';
        BEGIN
          IF lr_rec.contract_status IN ('L', 'C') THEN
            l_account_status := 'Y';
          ELSE
            l_account_status := 'N';
          END IF;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_account_status := NULL;
        END;

        --l_cur_net_par_bal
        l_run_point := '125';
        BEGIN
          SELECT SUM(amount_due) - SUM(amount_settled)
            INTO l_cur_net_par_bal
            FROM oltbs_amount_due
           WHERE contract_ref_no = lr_rec.contract_ref_no
             AND component IN ((SELECT L.component
                                  FROM lftm_product_iccf L
                                 WHERE L.product = lr_rec.product_code
                                   AND L.shown_in_contract_main_screen = 'Y'),
                  'PRINCIPAL')
             AND due_date <= p_extraction_date;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_cur_net_par_bal := NULL;
        END;

        --l_participation_sold_amt
        --l_percent_sold
        l_run_point := '126';
        BEGIN
          SELECT (trunc(((sum(a.asset_ratio)) / 100), 2) *
                 trunc(b.amount, 2))
            INTO l_participation_sold_amt
            FROM lbtbs_contract_participant a, oltbs_contract_master b
           WHERE b.contract_ref_no = lr_rec.contract_ref_no
             AND a.contract_ref_no = b.contract_ref_no
             AND a.self_participation = 'N'
             AND b.event_seq_no =
                 (SELECT MAX(event_seq_no)
                    FROM oltbs_contract_master
                   WHERE contract_ref_no = lr_rec.contract_ref_no)
           GROUP BY b.amount;

          IF l_participation_sold_amt IS NOT NULL and
             lr_rec.amount IS NOT NULL THEN
            l_percent_sold := l_participation_sold_amt /
                              trunc(lr_rec.amount, 2);
          END IF;

        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_participation_sold_amt := NULL;
            l_percent_sold           := NULL;
        END;
        --l_run_point := '127';
        --l_drawn_amt := lr_rec.amount;

        --l_run_point := '128';
        /*BEGIN
          SELECT nvl(RATE_CODE, 'Fixed')
            INTO l_orig_interest_type
            FROM lftbs_contract_interest
           WHERE contract_reference_no = lr_rec.contract_ref_no
             AND ROWNUM = 1
             AND value_date =
                 (SELECT MAX(value_date)
                    FROM lftbs_contract_interest
                   WHERE contract_reference_no = lr_rec.contract_ref_no
                     AND value_date <= p_extraction_date);
          IF l_orig_interest_type <> 'Fixed' Then
            l_orig_interest_type := 'Floating';
          END IF;
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_orig_interest_type := NULL;
        END;*/

		--OBCL_OFSAA_Changes Starts
        --l_reprice_date
        l_run_point := '129';
        BEGIN
			SELECT event_date
              INTO l_reprice_date
              FROM oltbs_contract_event_log a
             WHERE event_code in ('ROLL', 'SPTI')
               and contract_Ref_no = lr_rec.contract_ref_no
               and event_seq_no = (select max(b.event_Seq_no) 
			                         from oltbs_contract_event_log b 
								    where a.contract_ref_no = b.contract_ref_no 
                                      AND a.event_code = b.event_code )
          	   AND rownum=1;
			   
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
				BEGIN
					SELECT event_date
				      INTO l_reprice_date
					  FROM oltbs_contract_event_log a
					 WHERE event_code ='MRGI'
					   and contract_Ref_no = ( select c.contract_Ref_no 
												 from LBTBS_CONTRACT_MERGE_DETAIL c
												where c.child_Ref_no =lr_rec.contract_ref_no 
												  and c.child_Status ='P')
					   and event_seq_no = (select max(b.event_Seq_no) 
											 from oltbs_contract_event_log b 
											where a.contract_ref_no = b.contract_ref_no 
											  AND a.event_code = b.event_code )
					   AND rownum=1;
			 EXCEPTION
			 WHEN NO_DATA_FOUND THEN
			  l_reprice_date := NULL;
			  END;
        END;

       --l_user_defined_status_flag
        l_run_point := '130';
        BEGIN
          IF lr_rec.user_defined_status <>'NORM' THEN
            l_user_defined_status_flag := 'Y';
          ELSE
            l_user_defined_status_flag := 'N';
          END IF;
        EXCEPTION
          WHEN OTHERS THEN
            l_user_defined_status_flag := 'N';
        END;

      --l_total_margin
        l_run_point := '131';
        BEGIN
		  SELECT NVL(spread,0)  + NVL(spread_adj,0), min_rate
            INTO l_total_margin, l_min_rate
            FROM lftbs_contract_interest a
           WHERE contract_reference_no = lr_rec.contract_ref_no
             AND component = (SELECT L.component
                                  FROM lftm_product_iccf L
                                 WHERE L.product = lr_rec.product_code
                                   AND L.shown_in_contract_main_screen = 'Y')
			 AND event_sequence_no =  (SELECT MAX(b.event_sequence_no)
							        FROM lftbs_contract_interest b
							       WHERE b.contract_reference_no = lr_rec.contract_ref_no
							         AND b.component = a.component);
							       
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_total_margin := NULL;
			l_min_rate:= NULL;
        END;
	
	      --l_sum_amount_due
        l_run_point := '132';
        BEGIN

		SELECT sum(case when inflow_outflow = 'O' then -1* amount_due else amount_due end) 
		  INTO l_sum_amount_due
		  FROM oltbs_amount_due 
		 WHERE contract_Ref_no =lr_rec.contract_ref_no
		   AND inflow_outflow in ('I','O')
		   AND component_type <>'N';	   
			 
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_sum_amount_due := NULL;
        END;
	
		--l_purchase_amount
        l_run_point := '133';
        BEGIN

		  SELECT SUM(trade_amount)
            INTO l_purchase_amount
            FROM tltbs_upload_master
           WHERE user_ref_no = lr_rec.contract_ref_no;			 
			 
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_purchase_amount := NULL;
        END;		

	
		--l_rate_floor_rate
        l_run_point := '134';
        BEGIN

		  SELECT rate_floor
            INTO l_rate_floor_rate
            FROM LBTMS_TRANCHE_FLRCLG_RATE a
           WHERE contract_ref_no = lr_rec.contract_ref_no
			 AND component IN (SELECT L.component
						  FROM lftm_product_iccf L
						 WHERE L.product = lr_rec.product_code
						   AND L.shown_in_contract_main_screen = 'Y')		 
			 AND eff_date=(SELECT MAX(b.eff_date)
                                  FROM LBTMS_TRANCHE_FLRCLG_RATE b
                                 WHERE b.contract_ref_no = lr_rec.contract_ref_no
				                   AND b.component = a.component);
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_rate_floor_rate := NULL;
        END;
		
		IF l_rate_floor_rate IS NULL THEN
			l_rate_floor_rate := l_min_rate;
		END IF;
		
	
		--l_mis_code
        l_run_point := '135';
        BEGIN

		  SELECT TXN_MIS_1
            INTO l_mis_code
            FROM oltbs_class_mapping
           WHERE unit_ref_no = lr_rec.contract_ref_no
		     AND branch_code = lr_rec.branch;			 
			 
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_mis_code := NULL;
        END;
	
		--l_schedule_frequency -- need to implement the max of freq
        l_run_point := '136';
        BEGIN

		  SELECT frequency
            INTO l_schedule_frequency 
            FROM oltbs_contract_schedules a --oltb_contract.latest_version_no join here.
           WHERE contract_ref_no = lr_rec.contract_ref_no
		     AND component IN (SELECT L.component
                                 FROM lftm_product_iccf L
                                WHERE L.product = lr_rec.product_code
                                  AND L.shown_in_contract_main_screen = 'Y')
			 AND version_no =  (SELECT MAX(b.version_no) --oltb_contract.latest_version_no 
                                  FROM oltbs_contract_schedules b
                                 WHERE b.contract_ref_no = lr_rec.contract_ref_no
				                   AND b.component = a.component)
			 AND Start_Date =(SELECT min(b.Start_Date)
                                  FROM oltbs_contract_schedules b
                                 WHERE b.contract_ref_no = lr_rec.contract_ref_no
				                   AND b.component = a.component
								   and b.version_no = a.version_no); 
	
        EXCEPTION
          WHEN NO_DATA_FOUND THEN
            l_schedule_frequency := NULL;
        END;	
		--OBCL_OFSAA_Changes Ends 
        
        BEGIN
          INSERT INTO AATB_STG_LB_LOAN_CONTRACTS
            (fic_mis_date,
             v_account_number, --1
             v_branch_code, --2
             v_ccy_code, --3
             d_book_date, --4
             d_start_date, --same as d_value_date --5
             d_value_date, --6
             --f_atm_facility, --7
             f_renewable_flg, --8
             f_closed_ind, --9
             --f_delinquent_ind, --10
             v_cust_ref_code, --11
             v_prod_code, --12
             --f_autopay_flag, --13
             --f_emp_acct_flag, --14
             n_account_tenor, --15
             n_approved_amt, --16
             n_undrawn_amount, --17
             v_commitment_no, --18
             --f_exp_for_sale_ind, --19
             --n_credit_score, --20
             --d_previous_allowance_date, --21
             --n_principal_freq, --22
             n_eop_curr_prin_bal, --23
             n_eop_int_bal, --24
             --n_int_recovered_amt, --25
             --n_net_present_value, --26
             --n_numb_instal_prin, --27
             n_prepayment_amount, --28
             n_prin_recovered_amt, --29
             n_tot_revenue, --30
             n_write_off_amount, --31
             v_accr_int_gl_code, --32
             v_acct_display_name, --33
             v_amrt_term_unit, --34
             v_appln_number, --35
             v_autopay_acct_number, --36
             v_coll_code, --37
             v_country_id, --38
             v_cust_type, -- same as v_market_segment  --39
             v_dr_int_gl_code, --same as v_accr_int_gl_code --40
             v_gaap_code, --41
             v_holiday_roll_convention_cd, --42
             --v_interest_freq_unit, --43
             v_loan_desc, --44
             v_market_segment, --45
             --v_offer_code, --46
             v_original_account_number, -- same as  v_account_number --47
             v_ownership_type, --48
             d_adjusment_effective_date, --49
             d_closed_date, --50
             --d_interest_recovery_date, --51
             d_orig_repricing_date, --52
             --d_prin_recovery_date, --53
             d_revised_maturity_date, --54
             d_start_date_i, --55
             d_start_date_p, --56
             --f_double_default_flag, --57
             --f_exp_ongoing_finance_ind, --58
             --f_joint_account_ind, --59
             f_participation_flg, --60
             f_restructured_ind, --61
             --f_securitized_flag, --62
             f_stmt_supp_flag, --63
             f_student_status_flg, --64
             n_account_rem_tenor, --65
             --n_allowance_amt, --66
             --n_credit_loss, --67
             n_cum_recoveries, --68
             --n_curr_interest_rate, --69
             n_curr_payment_recd, --70
             n_repricing_freq, --71
             --n_joining_score, --72
             n_orig_book_bal, --73
             v_benchmark_code, --74
             v_orig_amrt_term_unit, --75
             v_reprice_freq_unit, --76
             --d_acct_status_date, --77
             d_approve_date, --78
             --d_writeback_prin_date, --79
             --n_advance_pmt_amt, --80
             n_customer_statement_qty, --81
             f_prepayment_ind, --82
             f_uncond_cancelled_exp_ind, --83
             f_exp_held_at_fair_value, --84
             v_ias39_classification_cd, --85
             v_ifrs9_classification_cd, --86
             v_instrument_type_cd, --87
             --n_delq_life_times, --88
             --n_delq_year_times, --89
             v_gl_code, --90
             n_accrued_interest, --91
             --n_overdue_prin_amt, --92
             n_instal_int_amt, --93
             n_instal_prin_amt, --94
             --v_discounting_day_counter, --95
             d_orig_maturity_date, --96
             d_last_payment_date, --97
             --n_fees_eir, --98
             n_internal_rate_of_return, --99
             --n_late_pmt_fee, --100
             f_past_due_flag, --101
             --d_coll_value_date, --102
             --d_int_suspended_date, --103
             d_last_reprice_date, --104
             d_last_stmt_date, --105
             d_next_payment_date, --106
             d_orig_next_payment_date, --107
             --d_prepay_penal_end_date, --108
             d_prepayment_date, --109
             d_writeback_date, --110
             f_contract_cancelled_ind, --111
             f_exp_coll_ccy_same_flag, --112
             f_exp_fx_fund_curr_same_ind, --113
             n_avg_book_bal, --114
             --n_drawn_amt, --115
             n_drawndown_percent, --116
             n_due_interest, --117
             n_eop_prev_prin_bal, --118
             n_int_recovered_amt_lcy, --119
             n_lrd_balance, --120
             n_no_of_payments, --121
             n_orig_amrt_term, --122
             --n_orig_float_spread, --123
             --n_orig_interest_rate, --124
             n_orig_ltv, --125
             n_orig_payment_amt, --126
             n_orig_remain_no_of_pmts, --127
             n_overdue_int, --128
             n_prin_recovered_amt_lcy, --129
             --n_rate_cap_life, --130
             --n_rate_chg_rnd_fac, --131
             n_sanctioned_limit, --132
             n_tot_comm_amt, --133
             n_total_transactions, --134
             v_benchmark_ccy_code, --135
             v_cal_option_display_cd, --136
             v_category, --137
             v_coll_ccy, --138
             --v_collateral_type, --139
             --v_commitment_type_cd, --140
             --v_common_coa_code,  --141
             --v_credit_score, --same as n_credit_score --142
             v_line_code, --143
             v_tenor_unit, --144
             --f_encumbrance_status, --145
             --f_debt_sold_flag, --same as f_encumbrance_status --146
             --v_commitment_contract_code, --147
             d_next_finance_date, --148
             d_orig_payment_date, --149
             --d_provisions_made, --150
             d_writeback_int_date, --151
             d_writeoff_date, --152
             n_amrt_term, --153
             --n_break_tolerance_amt, --154
             --n_coll_acq_price, --155
             --n_coll_mkt_value, --156
             --n_collateral_nominal_value, --157
             --n_curr_min_payment, --158
             n_current_credit_limit, --159
             n_delinquent_days, --160
             n_exp_ltv_ratio, --161
             n_int_recd, --162
             --n_original_coll_value, --163
             n_renewal_fee, --164
             n_tot_fee_chgs, --165
             n_total_fees_at_orig, --166
             --n_waived_fees, --167
             --n_writedown_amt, --168
             f_exp_fund_ccy_same_ind, --169
             f_eir_eis_calculation_flag, --170
             v_book_type, --171
             v_investor_number, --172
             v_rem_tenor_unit, --173
             --v_sales_agent_code,  --174
             --n_coll_value_lcy, --175
             n_int_accrued_mtd, --176
             n_int_recovered_amt_mtd, --177
             n_int_wback_amt_mtd, --178
             n_penalty_charges_recd, --179
             v_interest_rate_cd, --180
             --v_payment_mode, --181
             --v_pool_class_code, --182
             --v_prov_gl_code, --183
             v_repayment_type, --184
             --v_sec_pool_id, --185
             v_sec_status_code, --186
             --v_writeoff_gl_code, --187
             n_due_principal, --188
             n_eop_bal, --189
             --n_int_accrued_itd, --190
             n_prin_recd_mtd, --191
             --n_prin_writeoff_amt_mtd, --192
             --n_provisions_made_itd, --193
             n_overdue_days_int, --194
             n_overdue_days_prin, --195
             --n_provision_amt_ytd, --196
             n_undrawn_amount_lcy, --197
             -- v_purpose, --198
             n_int_income, --199
             n_provision_amt_mtd, --200
             --n_arm_base_rate, --201
             n_interest_recd_mtd, --202
             n_max_balance_mtd, --203
             --n_loan_provisions_amt, --204
             --n_loan_provisions_amt_lcy, --205
             v_day_count_ind, --206
             n_pre_closure_balance, --207
             f_full_performing_asset_flag, --208
             f_secured_ind, --209
             n_after_payment_balance, --210
             --n_compounding_freq, --211
             --v_loan_type, --212
             n_cur_yield, --213
             --d_limit_last_modified_date, --214
             --n_cur_gross_interest_rate, --215
             --n_interest_bm_rate, --216
             n_avg_bal_mtd, --217
             n_cur_book_bal, --218
             n_cur_net_book_bal, --219
             n_recovered_amt, --220
             --n_tot_prepayment_amt, --221
             /* v_channel_code, --222*/
             n_remain_no_of_pmts, --223
             --v_interest_method, --224
             --v_interest_payment_type, --225
             --v_interest_type, --226
             --v_non_performing_category_code, --227
             --v_product_type, --228
             --v_delq_history, --229
             --n_first_reset_cap, --230
             --n_first_reset_floor, --231
             n_prin_wback_amt_mtd, --232
             n_tot_writeback_mtd, --233
             n_total_writeback_amt, --234
             v_autopay_instr_type_cd, --235
             v_autopay_bank_transit_nbr, --236
             --v_loan_doc_status, --237
             --f_recalcitrant_flag, --238
             --f_us_poa_or_signatory_flag, --239
             n_tot_writeoff_mtd, --240
             n_write_off_amount_lcy, --241
             --v_rate_chg_rnd_cd, --242
             d_last_delinquent_date, --243
             n_no_of_interest_only_mths, --244
             v_acct_status_code, --245
             --n_max_lifetime_dpd, --246
             v_delinquency_status_code, --247
             v_class_code, --248
             f_notify_letter_supp_flag, --249
             v_account_group_id, --250
             v_account_manager_code, --251
             v_business_unit_code, --252
             v_credit_officer_id, --253
             v_data_origin, --254
             v_org_unit_code, --255
             v_sales_channel_cd, --256
             n_cur_net_par_bal, --257
             n_orig_net_book_bal, --258
             n_participation_sold_amt, --259
             n_percent_sold, --260
             d_repricing_date, --261
             n_interest_freq, --262
             n_load_run_id, --internal_issues added not null column
             /*n_accrued_transfer_amt, --263
             n_accrued_gross_amt, --264
             n_refunded_fees, --265
             d_first_disbursement_date, --266
             n_draw_notice_days, --267
             f_us_indicia, --268
             d_last_activity_date, --269
             d_final_disbursement_date, --270
             v_ownership_category_code, --271
             n_delq_amount, --272*/
                   /*v_prin_freq_unit, --273
             d_maturity_date, --274
             d_earliest_due_date_unpaid, --275
             d_grace_period_end_date, --276
             d_grace_period_start_date, --277
             n_debt_amt_at_termination, --278
             n_periodic_repay_cap_prcntg, --279
             n_periodic_repay_floor_prcntg, --280
             n_prin_pay_schdule_amt, --281
             n_prin_writeoff_amt, --282
             n_principal_drawn_amt, --283
             d_writedown_date, --284
             d_past_due_date, --285
             n_lead_bnk_part_percnt, --286
             n_participation_sold_percent, --287*/
             n_total_participated_amt, --288
             /*v_lead_bank_id, --289
             f_90day_overdue_exception, --290*/
             f_flexibility_draw_frgn_ccy, --291
             /*d_Origination_Date, --292
             n_int_writeoff_amt_mtd, --293
             n_eop_book_bal, --294
             n_initial_disbursement_amt, --295*/
             v_orig_interest_type, /*, --296
             n_drawn_amt_mtd, --297
             v_compounding_freq_unit, --298
             n_amort_locked_amt, --299
             n_float_spread, --300
             f_neg_int_rate_flag --301 */
             --OBCL_OFSAA_Changes Starts
		     d_credit_status_date      ,--302
             d_forbearance_status_date ,--303
             f_embedded_options_flag   ,--304
             f_exp_defaulted_flag	   ,--305
             n_margin				   ,--306
		     n_maturity_amount		   ,--307
		     n_purchase_amount		   ,--308 
		     n_rate_floor_life		   ,--309 
		     v_lob_code				   ,--310 
		     v_pmt_chg_freq_unit		--311
			 --OBCL_OFSAA_Changes Ends			 
             )
          VALUES
            (p_extraction_date,
             lr_rec.contract_ref_no, --1
             lr_rec.branch, --2
             lr_rec.contract_ccy, --3
             lr_rec.book_date, --4
             lr_rec.value_date, --5
             lr_rec.value_date, --6
             --lr_rec.atm_facility, --7
             lr_rec.rollover_allowed, --8
             l_account_status, --lr_rec.account_status, --9
             --l_delinquent_ind, --10
             lr_rec.counterparty, --11
             lr_rec.product_code, --12
             --lr_rec.principal_liquidation, --13
             --lr_rec.staff_finance, --14
             (lr_rec.maturity_date - lr_rec.value_date), --15
             lr_rec.amount, --16
             (lr_rec.amount), --17
             l_commitment_no, --18
             --l_secr_allowed, --19
             --l_credit_score, --20
             --l_previous_allowance_date, --21
             --l_principal_freq, --22
             l_eop_curr_prin_bal, --23
             l_eop_int_bal, --24
             --l_int_recovered_amt, --25
             --l_net_present_value, --26
             --l_numb_instal_prin, --27
             l_prepayment_amount, --28
             l_eop_curr_prin_bal, --29
             l_tot_revenue, --30
             l_write_off_amount, --31
             l_accr_int_gl_code, --32
             l_acct_display_name, --33
             l_amrt_term_unit, --34
             lr_rec.user_ref_no, --35
             l_autopay_acct_number, --36
             l_coll_code, --37
             l_country_id, --38
             l_cust_type, --39
             l_accr_int_gl_code, --40
             l_gaap_code, --41
             l_holiday_roll_convention_cd, --42
             --l_interest_freq_unit, --43
             l_loan_desc, --44
             l_cust_type, --45
             --l_offer_code, --46
             lr_rec.contract_ref_no, --47
             l_ownership_type, --48
             l_adjusment_effective_date, --49
             l_closed_date, --50
             --l_interest_recovery_date, --51
             l_orig_repricing_date, --52
             --l_prin_recovery_date, --53
             l_revised_maturity_date, --54
             l_start_date_i, --55
             l_start_date_p, --56
             --l_double_default_flag, --57
             --l_exp_ongoing_finance_ind, --58
             --l_joint_account_ind, --59
             l_participation_flg, --60
             l_restructured_ind, --61
             --l_securitized_flag, --62
             l_stmt_supp_flag, --63
             l_student_status_flg, --64
             l_account_rem_tenor, --65
             --l_allowance_amt, --66
             --l_credit_loss, --67
             l_cum_recoveries, --68
             --l_curr_interest_rate, --69
             l_curr_payment_recd, --70
             l_repricing_freq, --71
             --l_joining_score, --72
             l_orig_book_bal, --73
             l_interest_rate_cd, --74
             l_orig_amrt_term_unit, --75
             l_reprice_freq_unit, --76
             --l_acct_status_date, --77
             l_approve_date, --78
             --l_writeback_prin_date, --79
             --l_advance_pmt_amt, --80
             1, --81
             'Y', --82
             'Y', --83
             'N', --84
             'LR', --85
             'AMRTCOST', --86
             'LOANS', --87
             --l_delq_life_times, --88
             --l_delq_year_times, --89
             l_gl_code, --90
             l_accrued_interest, --91
             /*l_overdue_prin_amt,tb_account_schedules_prin(1).sum_amount_due - tb_account_schedules_prin(1).sum_amount_settle,*/ --92
             l_instal_int_amt, --93
             l_instal_prin_amt, --94
             --l_discounting_day_counter, --95
             l_orig_maturity_date, --96
             l_last_payment_date, --97
             --l_fees_eir, --98
             l_internal_rate_of_return, --99
             --l_late_pmt_fee, --100
             l_past_due_flag, --101
             --l_coll_value_date, --102
             --l_int_suspended_date, --103
             l_last_reprice_date, --104
             l_last_stmt_date, --105
             l_next_payment_date, --106
             l_orig_next_payment_date, --107
             --l_prepay_penal_end_date, --108
             l_prepayment_date, --109
             l_writeback_date, --110
             l_contract_cancelled_ind, --111
             l_exp_coll_ccy_same_flag, --112
             l_exp_fx_fund_curr_same_ind, --113
             l_avg_book_bal, --114
             /*trunc(lr_rec.Amount_Disbursed,2), */ --115 l_drawn_amt,
             l_drawndown_percent, --116
             l_due_interest, --117
             l_eop_prev_prin_bal, --118
             l_int_recovered_amt_lcy, --119
             l_lrd_balance, --120
             l_no_of_payments, --121
             l_orig_amrt_term, --122
             --l_orig_float_spread, --123
             --l_orig_interest_rate1, --124
             l_orig_ltv, --125
             l_orig_payment_amt, --126
             l_orig_remain_no_of_pmts, --127
             l_overdue_int, --128
             l_prin_recovered_amt_lcy, --129
             --l_rate_cap_life, --130
             --l_rate_chg_rnd_fac, --131
             l_sanctioned_limit, --132
             l_tot_comm_amt, --133
             l_total_transactions, --134
             l_benchmark_ccy_code, --135
             l_cal_option_display_cd, --136
             l_category, --137
             l_coll_ccy, --138
             --l_collateral_type, --139
             --l_commitment_type_cd, --140
             --l_common_coa_code, --141
             --l_credit_score, --142
             l_line_code, --143
             l_tenor_unit, --144
             --lr_rec.SECR_STATUS, --145
             --lr_rec.SECR_STATUS, --146
             --l_commitment_contract_code, --147
             l_next_finance_date, --148
             l_orig_payment_date, --149
             --l_provisions_made, --150
             l_writeback_int_date, --151
             l_writeoff_date, --152
             l_amrt_term, --153
             --l_break_tolerance_amt, --154
             --l_coll_acq_price, --155
             --l_coll_mkt_value, --156
             --l_collateral_nominal_value, --157
             --l_curr_min_payment, --158
             trunc(lr_rec.amount, 2), --159
             l_delinquent_days, --160
             l_exp_ltv_ratio, --161
             l_int_recd, --162
             --l_original_coll_value, --163
             l_renewal_fee, --164
             l_tot_fee_chgs, --165
             l_total_fees_at_orig, --166
             --l_waived_fees, --167
             --l_writedown_amt, --168
             l_exp_fund_ccy_same_ind, --169
             NULL, --170
             'BANKING', --171
             NULL, --172
             'D', --173
             --NULL, --174
             --l_coll_value_lcy, --175
             l_int_accrued_mtd, --176
             l_int_recovered_amt_mtd, --177
             l_int_wback_amt_mtd, --178
             l_penalty_charges_recd, --179
             l_interest_rate_cd, --180
             --l_payment_mode, --181
             --l_pool_class_code, --182
             --l_prov_gl_code, --183
             l_repayment_type, --184
             --l_pool_class_code, --185
             lr_rec.user_defined_status, --186
             --l_writeoff_gl_code, --187
             l_due_principal, --188
             l_eop_bal, --189
             --l_int_accrued_itd, --190
             l_prin_recd_mtd, --191
             --l_prin_writeoff_amt_mtd, --192
             --l_provisions_made_itd, --193
             l_overdue_days_int, --194
             l_overdue_days_prin, --195
             --l_provision_amt_ytd, --196
             l_undrawn_amount_lcy, --197
             --NULL, --198
             l_int_income, --199
             l_provision_amt_mtd, --200
             --l_arm_base_rate, --201
             l_interest_recd_mtd, --202
             l_max_balance_mtd, --203
             --l_loan_provisions_amt, --204
             --l_loan_provisions_amt_lcy, --205
             l_day_count_ind, --206
             l_pre_closure_balance, --207
             l_full_performing_asset_flag, --208
             l_secured_ind, --209
             l_after_payment_balance, --210
             --l_compounding_freq, --211
             --l_loan_type, --212
             l_cur_yield, --213
             --l_limit_last_modified_date, --214
             --l_curr_gross_bm_rate1, --215
             --l_curr_gross_bm_rate1, --216
             l_avg_bal_mtd, --217
             l_cur_book_bal, --218
             l_cur_book_bal, --219
             l_recovered_amt, --220
             --l_tot_prepayment_amt, --221
             /*l_channel_code, --222*/
             l_remain_no_of_pmts, --223
             --l_interest_method, --224
             --l_interest_payment_type, --225
             --l_interest_type, --226
             --l_non_performing_category_code, --227
             --l_loan_type, --228
             --l_delq_history, --229
             --l_first_reset_cap, --230
             --l_rate_cap_life, --231
             l_prin_wback_amt_mtd, --232
             l_tot_writeback_mtd, --233
             l_total_writeback_amt, --234
             l_autopay_instr_type_cd, --235
             l_autopay_bank_transit_nbr, --236
             --l_loan_doc_status, --237
             --l_recalcitrant_flag, --238
             --l_us_poa_or_signatory_flag, --239
             l_tot_writeoff_mtd, --240
             l_write_off_amount_lcy, --241
             --l_rate_chg_rnd_cd, --242
             l_last_delinquent_date, --243
             l_no_of_interest_only_mths, --244
             l_acct_status_code, --245
             --l_max_lifetime_dpd, --246
             l_delinquency_status_code, --247
             l_ownership_type, --248
             NULL, --249
             NULL, --250
             NULL, --251
             NULL, --252
             NULL, --253
             'FLEXCUBE', --254
             NULL, --255
             NULL, --256
             l_cur_net_par_bal, --257
             l_cur_net_par_bal, --258
             l_participation_sold_amt, --259
             l_percent_sold, --260
             l_orig_repricing_date, --261
             1, --262
             0, --internal_issues added not null column
             /*l_accrued_transfer_amt, --263
             l_accrued_gross_amt, --264
             l_refunded_fees, --265
             l_first_disbursement_date, --266
             l_draw_notice_days, --267
             l_us_indicia, --268
             l_last_activity_date, --269
             l_final_disbursement_date, --270
             l_ownership_category_code, --271
             l_delq_amount, --272
             l_prin_freq_unit, --273
             l_maturity_date, --274
             l_earliest_due_date_unpaid, --275
             l_grace_period_end_date, --276
             l_grace_period_start_date, --277
             l_debt_amt_at_termination, --278
             l_periodic_repay_cap_prcntg, --279
             l_periodic_repay_floor_prcntg, --280
             l_prin_pay_schdule_amt, --281
             l_prin_writeoff_amt, --282
             l_principal_drawn_amt, --283
             l_writedown_date, --284
             l_past_due_date, --285
             l_lead_bnk_part_percnt, --286
             l_participation_sold_percent, --287*/
             NULL, --288
             /*l_lead_bank_id, --289
             l_90day_overdue_exception, --290*/
             'Y', --291
             /*l_Origination_Date, --292
             l_int_writeoff_amt_mtd, --293
             l_eop_book_bal, --294
             l_initial_disbursement_amt, --295*/
             l_orig_interest_type, /*, --296
             l_drawn_amt_mtd, --297
             l_compounding_freq_unit, --298
             l_amort_locked_amt, --299
             l_float_spread, --300
             l_f_neg_int_rate_flag --301*/
              --OBCL_OFSAA_Changes Starts
			 lr_rec.value_date         ,--302 
             l_reprice_date            ,--303
             'Y'   					   ,--304
             l_user_defined_status_flag,--305
             l_total_margin			   ,--306
		     l_sum_amount_due		   ,--307
		     l_purchase_amount		   ,--308 
		     l_rate_floor_rate		   ,--309 
		     l_mis_code				   ,--310 
		     l_schedule_frequency       --311 
			 --OBCL_OFSAA_Changes Ends
             );

        EXCEPTION
          WHEN LN_EXNUMERICPRECISION THEN
            Dbg('Caught ORA-01438: value larger than specified precision allowed for this column');
          WHEN OTHERS THEN
            Dbg('Process terminated during insert due to error ::' ||
                SQLERRM);
            Dbg(dbms_utility.format_error_backtrace);
            RAISE l_exception;

        END;

      END LOOP;
    END LOOP;
    dbg('Data Inserted Successfully');
    debug_log('FN_STG_LOAD_LOAN_CONTRACTS', 'Load data');
    dbg('Load data ' || l_run_point);

    UPDATE oltbs_job_es_control
       SET status = 'S', err_message = NULL
     WHERE branch_code = p_branch_code
       AND run_date = global.application_date
       AND process_no = l_process_no
       AND integration_name = 'OFSAA';
    dbg('oltbs_job_es_control updated successfully with status S');

    UPDATE oltb_eis_cs_param
       SET param_value = p_Extraction_Date
     WHERE param_name = 'OFSAA_PREV_EXT_LB_LOAN_CONTRACTS';
    dbg('oltb_eis_cs_param updated successfully with previous extraction date');

    COMMIT;

    RETURN TRUE;
  EXCEPTION
    WHEN OTHERS THEN
      ROLLBACK;
      dbg('Process Terminated due to error ::' || SQLERRM);
      debug_log('FN_STG_LOAD_LOAN_CONTRACTS',
      'Process Terminated due to error ::' ||
      SQLERRM,
      'Y',
      l_run_point);
      dbg('l_run_point ' || l_run_point);
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
  END Fn_Stg_Load_Loan_Contracts;
END aapks_extract_lb_ln_contracts;
/