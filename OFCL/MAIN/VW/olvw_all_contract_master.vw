CREATE OR REPLACE FORCE VIEW olvw_all_contract_master ( ADMIN_ID, 
ADVICE_PRINTED, AMOUNT, APPLY_CONTRACT_HOL_CCY, 
APPLY_FACILITY_HOL_CCY, APPLY_LOCAL_HOL_CCY, BASE_INDEX_RATE, BEN_PARTY_ACCT, 
BEN_PARTY_ADDR1, BEN_PARTY_ADDR2, BEN_PARTY_BIC, BEN_PARTY_CHAPSC, 
BEN_PARTY_CHIPUID, BEN_PARTY_CITY, BEN_PARTY_CLRG_CODE, BEN_PARTY_FEDWIRE, 
BEN_PARTY_NAME, BILLING_NOTICE_DAYS, BOOKING_DATE, BORROWER_LEG, 
BRANCH, BROKERAGE_STATUS, BROKER_CODE, BROKER_CONFIRM_STATUS, 
CASCADE_PARTICIPATION, CHARGE_STATUS, CLUSTER_ID, CLUSTER_SIZE, 
CONTRACT_REF_NO, CONTRACT_STATUS, COUNTERPARTY, CPARTY_CONFIRM_STATUS, 
CREDIT_LINE, CURRENCY, CUST_MARGIN, DEALER, 
DEALING_METHOD, DEAL_DATE, DEAL_TYPE, DFLT_SETTLE_AC, 
DFLT_SETTLE_AC_BRANCH, DFLT_SETTLE_CCY, DRAWDOWN_NO, DR_SETL_AC, 
DR_SETL_AC_BR, DR_SETL_CCY, EVENT_SEQ_NO, EXT_BROKER_CODE, 
FUNDING_METHOD, ICCF_STATUS, INS_PARTY_ACCT, INS_PARTY_ADDR1, 
INS_PARTY_ADDR2, INS_PARTY_BIC, INS_PARTY_CHAPSC, INS_PARTY_CHIPUID, 
INS_PARTY_CITY, INS_PARTY_CLRG_CODE, INS_PARTY_FEDWIRE, INS_PARTY_NAME, 
JOB_PICKED_UP, LAST_AVAILABLE_DATE, LCY_AMOUNT, LCY_EQVT_FOR_INDEX_LOANS, 
LIMIT_TRACK_REQD, LOAN_STMT_CYCLE, LOAN_STMT_TYPE, MAIN_COMP, 
MAIN_COMP_AMOUNT, MAIN_COMP_RATE, MAIN_COMP_RATE_CODE, MAIN_COMP_RATE_SIGN, 
MAIN_COMP_SPREAD, MATURITY_DATE, MATURITY_TYPE, MODULE, 
NOTICE_DATE, NOTICE_DAYS, NO_OF_TRACERS, OFFSET_NO, 
OP_SCOPE, ORIGINAL_FACE_VALUE, ORIGINAL_START_DATE, PARENT_CONTRACT_REF_NO, 
PAYMENT_METHOD, PREPAYMENT_PENALTY_AMOUNT, PRODUCT, PRODUCT_TYPE, 
REL_REFERENCE, REMARKS, REPROGRAM_COUNTER_NO, REPROGRAM_FLAG, 
ROLLOVER_ALLOWED, ROLLOVER_COUNT, ROLLOVER_INDICATOR, ROLLOVER_MECHANISM, 
ROLLOVER_METHOD, SETTLEMENT_SEQ_NO, SETTLEMENT_STATUS, SOURCE_CODE, 
STATEMENT_DAY, SUPPRESS_CONFIRMATION, SYNDICATION_REF_NO, TAX_SCHEME, 
TAX_STATUS, TEA, TEAC, TENOR, 
TEP, TRACER_REQUIRED, TRADE_DATE, TRANCHE_REF_NO, 
TREASURY_SOURCE, UNCOVERED_AMOUNT, USER_DEFINED_STATUS, USER_REF_NO, 
VALUE_DATE, VERSION_NO, WHT_TRACKING_REQD
,WHT_CCY	--19-MAR-2008 CITIUS-LS#5678 Production Retro to CC-STP Code Baseline
 ) AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_all_contract_master.VW
**
** Module      : Core Services
**
**This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
/*----------------------------------------------------------------------------------------------------
CHANGE HOSTORY
19-MAR-2008 CITIUS-LS#5678 Production Retro to CC-STP Code Baseline.
----------------------------------------------------------------------------------------------------
*/
(SELECT admin_id
             ,advice_printed
             ,amount
             ,apply_contract_hol_ccy
             ,apply_facility_hol_ccy
             ,apply_local_hol_ccy
             ,base_index_rate
             ,ben_party_acct
             ,ben_party_addr1
             ,ben_party_addr2
             ,ben_party_bic
             ,ben_party_chapsc
             ,ben_party_chipuid
             ,ben_party_city
             ,ben_party_clrg_code
             ,ben_party_fedwire
             ,ben_party_name
             ,billing_notice_days
             ,booking_date
             ,borrower_leg
             ,branch
             ,brokerage_status
             ,broker_code
             ,broker_confirm_status
             ,cascade_participation
             ,charge_status
             ,cluster_id
             ,cluster_size
             ,contract_ref_no
             ,contract_status
             ,counterparty
             ,cparty_confirm_status
             ,credit_line
             ,currency
             ,cust_margin
             ,dealer
             ,dealing_method
             ,deal_date
             ,deal_type
             ,dflt_settle_ac
             ,dflt_settle_ac_branch
             ,dflt_settle_ccy
             ,drawdown_no
             ,dr_setl_ac
             ,dr_setl_ac_br
             ,dr_setl_ccy
             ,event_seq_no
             ,ext_broker_code
             ,funding_method
             ,iccf_status
             ,ins_party_acct
             ,ins_party_addr1
             ,ins_party_addr2
             ,ins_party_bic
             ,ins_party_chapsc
             ,ins_party_chipuid
             ,ins_party_city
             ,ins_party_clrg_code
             ,ins_party_fedwire
             ,ins_party_name
             ,job_picked_up
             ,last_available_date
             ,lcy_amount
             ,lcy_eqvt_for_index_loans
             ,limit_track_reqd
             ,loan_stmt_cycle
             ,loan_stmt_type
             ,main_comp
             ,main_comp_amount
             ,main_comp_rate
             ,main_comp_rate_code
             ,main_comp_rate_sign
             ,main_comp_spread
             ,maturity_date
             ,maturity_type
             ,module
             ,notice_date
             ,notice_days
             ,no_of_tracers
             ,offset_no
             ,op_scope
             ,original_face_value
             ,original_start_date
             ,parent_contract_ref_no
             ,payment_method
             ,prepayment_penalty_amount
             ,product
             ,product_type
             ,rel_reference
             ,remarks
             ,reprogram_counter_no
             ,reprogram_flag
             ,rollover_allowed
             ,rollover_count
             ,rollover_indicator
             ,rollover_mechanism
             ,rollover_method
             ,settlement_seq_no
             ,settlement_status
             ,source_code
             ,statement_day
             ,suppress_confirmation
             ,syndication_ref_no
             ,tax_scheme
             ,tax_status
             ,tea
             ,teac
             ,tenor
             ,tep
             ,tracer_required
             ,trade_date
             ,tranche_ref_no
             ,treasury_source
             ,uncovered_amount
             ,user_defined_status
             ,user_ref_no
             ,value_date
             ,version_no
             ,wht_tracking_reqd
             ,WHT_CCY			--19-MAR-2008 CITIUS-LS#5678 Production Retro to CC-STP Code Baseline
	FROM   oltbs_contract_master)
      UNION
      (SELECT admin_id
             ,advice_printed
             ,amount
             ,apply_contract_hol_ccy
             ,apply_facility_hol_ccy
             ,apply_local_hol_ccy
             ,base_index_rate
             ,ben_party_acct
             ,ben_party_addr1
             ,ben_party_addr2
             ,ben_party_bic
             ,ben_party_chapsc
             ,ben_party_chipuid
             ,ben_party_city
             ,ben_party_clrg_code
             ,ben_party_fedwire
             ,ben_party_name
             ,billing_notice_days
             ,booking_date
             ,borrower_leg
             ,branch
             ,brokerage_status
             ,broker_code
             ,broker_confirm_status
             ,cascade_participation
             ,charge_status
             ,cluster_id
             ,cluster_size
             ,contract_ref_no
             ,contract_status
             ,counterparty
             ,cparty_confirm_status
             ,credit_line
             ,currency
             ,cust_margin
             ,dealer
             ,dealing_method
             ,deal_date
             ,deal_type
             ,dflt_settle_ac
             ,dflt_settle_ac_branch
             ,dflt_settle_ccy
             ,drawdown_no
             ,dr_setl_ac
             ,dr_setl_ac_br
             ,dr_setl_ccy
             ,event_seq_no
             ,ext_broker_code
             ,funding_method
             ,iccf_status
             ,ins_party_acct
             ,ins_party_addr1
             ,ins_party_addr2
             ,ins_party_bic
             ,ins_party_chapsc
             ,ins_party_chipuid
             ,ins_party_city
             ,ins_party_clrg_code
             ,ins_party_fedwire
             ,ins_party_name
             ,job_picked_up
             ,last_available_date
             ,lcy_amount
             ,lcy_eqvt_for_index_loans
             ,limit_track_reqd
             ,loan_stmt_cycle
             ,loan_stmt_type
             ,main_comp
             ,main_comp_amount
             ,main_comp_rate
             ,main_comp_rate_code
             ,main_comp_rate_sign
             ,main_comp_spread
             ,maturity_date
             ,maturity_type
             ,module
             ,notice_date
             ,notice_days
             ,no_of_tracers
             ,offset_no
             ,op_scope
             ,original_face_value
             ,original_start_date
             ,parent_contract_ref_no
             ,payment_method
             ,prepayment_penalty_amount
             ,product
             ,product_type
             ,rel_reference
             ,remarks
             ,reprogram_counter_no
             ,reprogram_flag
             ,rollover_allowed
             ,rollover_count
             ,rollover_indicator
             ,rollover_mechanism
             ,rollover_method
             ,settlement_seq_no
             ,settlement_status
             ,source_code
             ,statement_day
             ,suppress_confirmation
             ,syndication_ref_no
             ,tax_scheme
             ,tax_status
             ,tea
             ,teac
             ,tenor
             ,tep
             ,tracer_required
             ,trade_date
             ,tranche_ref_no
             ,treasury_source
             ,uncovered_amount
             ,user_defined_status
             ,user_ref_no
             ,value_date
             ,version_no
             ,wht_tracking_reqd
             ,WHT_CCY			--19-MAR-2008 CITIUS-LS#5678 Production Retro to CC-STP Code Baseline
	FROM   olars_contract_master)
      UNION
      (SELECT admin_id
             ,advice_printed
             ,amount
             ,apply_contract_hol_ccy
             ,apply_facility_hol_ccy
             ,apply_local_hol_ccy
             ,base_index_rate
             ,ben_party_acct
             ,ben_party_addr1
             ,ben_party_addr2
             ,ben_party_bic
             ,ben_party_chapsc
             ,ben_party_chipuid
             ,ben_party_city
             ,ben_party_clrg_code
             ,ben_party_fedwire
             ,ben_party_name
             ,billing_notice_days
             ,booking_date
             ,borrower_leg
             ,branch
             ,brokerage_status
             ,broker_code
             ,broker_confirm_status
             ,cascade_participation
             ,charge_status
             ,cluster_id
             ,cluster_size
             ,contract_ref_no
             ,contract_status
             ,counterparty
             ,cparty_confirm_status
             ,credit_line
             ,currency
             ,cust_margin
             ,dealer
             ,dealing_method
             ,deal_date
             ,deal_type
             ,dflt_settle_ac
             ,dflt_settle_ac_branch
             ,dflt_settle_ccy
             ,drawdown_no
             ,dr_setl_ac
             ,dr_setl_ac_br
             ,dr_setl_ccy
             ,event_seq_no
             ,ext_broker_code
             ,funding_method
             ,iccf_status
             ,ins_party_acct
             ,ins_party_addr1
             ,ins_party_addr2
             ,ins_party_bic
             ,ins_party_chapsc
             ,ins_party_chipuid
             ,ins_party_city
             ,ins_party_clrg_code
             ,ins_party_fedwire
             ,ins_party_name
             ,job_picked_up
             ,last_available_date
             ,lcy_amount
             ,lcy_eqvt_for_index_loans
             ,limit_track_reqd
             ,loan_stmt_cycle
             ,loan_stmt_type
             ,main_comp
             ,main_comp_amount
             ,main_comp_rate
             ,main_comp_rate_code
             ,main_comp_rate_sign
             ,main_comp_spread
             ,maturity_date
             ,maturity_type
             ,module
             ,notice_date
             ,notice_days
             ,no_of_tracers
             ,offset_no
             ,op_scope
             ,original_face_value
             ,original_start_date
             ,parent_contract_ref_no
             ,payment_method
             ,prepayment_penalty_amount
             ,product
             ,product_type
             ,rel_reference
             ,remarks
             ,reprogram_counter_no
             ,reprogram_flag
             ,rollover_allowed
             ,rollover_count
             ,rollover_indicator
             ,rollover_mechanism
             ,rollover_method
             ,settlement_seq_no
             ,settlement_status
             ,source_code
             ,statement_day
             ,suppress_confirmation
             ,syndication_ref_no
             ,tax_scheme
             ,tax_status
             ,tea
             ,teac
             ,tenor
             ,tep
             ,tracer_required
             ,trade_date
             ,tranche_ref_no
             ,treasury_source
             ,uncovered_amount
             ,user_defined_status
             ,user_ref_no
             ,value_date
             ,version_no
             ,wht_tracking_reqd
             ,WHT_CCY			--19-MAR-2008 CITIUS-LS#5678 Production Retro to CC-STP Code Baseline
      FROM   olpts_contract_master)
      UNION
      (SELECT admin_id
             ,advice_printed
             ,amount
             ,apply_contract_hol_ccy
             ,apply_facility_hol_ccy
             ,apply_local_hol_ccy
             ,base_index_rate
             ,ben_party_acct
             ,ben_party_addr1
             ,ben_party_addr2
             ,ben_party_bic
             ,ben_party_chapsc
             ,ben_party_chipuid
             ,ben_party_city
             ,ben_party_clrg_code
             ,ben_party_fedwire
             ,ben_party_name
             ,billing_notice_days
             ,booking_date
             ,borrower_leg
             ,branch
             ,brokerage_status
             ,broker_code
             ,broker_confirm_status
             ,cascade_participation
             ,charge_status
             ,cluster_id
             ,cluster_size
             ,contract_ref_no
             ,contract_status
             ,counterparty
             ,cparty_confirm_status
             ,credit_line
             ,currency
             ,cust_margin
             ,dealer
             ,dealing_method
             ,deal_date
             ,deal_type
             ,dflt_settle_ac
             ,dflt_settle_ac_branch
             ,dflt_settle_ccy
             ,drawdown_no
             ,dr_setl_ac
             ,dr_setl_ac_br
             ,dr_setl_ccy
             ,event_seq_no
             ,ext_broker_code
             ,funding_method
             ,iccf_status
             ,ins_party_acct
             ,ins_party_addr1
             ,ins_party_addr2
             ,ins_party_bic
             ,ins_party_chapsc
             ,ins_party_chipuid
             ,ins_party_city
             ,ins_party_clrg_code
             ,ins_party_fedwire
             ,ins_party_name
             ,job_picked_up
             ,last_available_date
             ,lcy_amount
             ,lcy_eqvt_for_index_loans
             ,limit_track_reqd
             ,loan_stmt_cycle
             ,loan_stmt_type
             ,main_comp
             ,main_comp_amount
             ,main_comp_rate
             ,main_comp_rate_code
             ,main_comp_rate_sign
             ,main_comp_spread
             ,maturity_date
             ,maturity_type
             ,module
             ,notice_date
             ,notice_days
             ,no_of_tracers
             ,offset_no
             ,op_scope
             ,original_face_value
             ,original_start_date
             ,parent_contract_ref_no
             ,payment_method
             ,prepayment_penalty_amount
             ,product
             ,product_type
             ,rel_reference
             ,remarks
             ,reprogram_counter_no
             ,reprogram_flag
             ,rollover_allowed
             ,rollover_count
             ,rollover_indicator
             ,rollover_mechanism
             ,rollover_method
             ,settlement_seq_no
             ,settlement_status
             ,source_code
             ,statement_day
             ,suppress_confirmation
             ,syndication_ref_no
             ,tax_scheme
             ,tax_status
             ,tea
             ,teac
             ,tenor
             ,tep
             ,tracer_required
             ,trade_date
             ,tranche_ref_no
             ,treasury_source
             ,uncovered_amount
             ,user_defined_status
             ,user_ref_no
             ,value_date
             ,version_no
             ,wht_tracking_reqd
             ,WHT_CCY			--19-MAR-2008 CITIUS-LS#5678 Production Retro to CC-STP Code Baseline
	FROM   olpps_contract_master)
/
create or replace synonym olvws_all_contract_master for olvw_all_contract_master
/