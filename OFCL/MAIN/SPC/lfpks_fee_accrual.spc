CREATE OR REPLACE PACKAGE lfpks_fee_accrual
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lfpks_fee_accrual.SPC
**
** Module		: CF
**
This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
------------------------------CHANGE HISTORY--------------------------------------------------------
26-FEB-2009 FCC V.CL Release 7.5 CITIUS RETRO TILL#5265, Making fn_accrue_for_a_contract as public
29-MAR-2011 Flexcube V.CL Release 7.9, CITIUS Retro, #7704, There is a system issue, where for NAB1 contracts, if user process the reversal of payment and later if user process the payment again, system is not doing the catch-up in real account.
*/

TYPE contract_struct IS  RECORD
	(
	module				oltbs_contract.module_code%TYPE,
	product				oltbs_contract.product_code%TYPE,
	product_type			oltbs_contract.product_type%TYPE,
	latest_event_seq_no		oltbs_contract.latest_event_seq_no%TYPE,
	latest_version_no			oltbs_contract.latest_version_no%TYPE,
	contract_status			oltbs_contract.contract_status%TYPE,
	user_defined_status		oltbs_contract.user_defined_status%TYPE,
	customer				oltbs_contract.counterparty%TYPE,
	contract_ccy			oltbs_contract.contract_ccy%TYPE,
	book_date				date,
	value_date				date,
	maturity_type			oltbs_contract_master.maturity_type%TYPE,
	memo_accruals			oltms_product_status_master.memo_accruals%TYPE,
	limit_track_reqd			oltbs_contract_master.limit_track_reqd%TYPE    
	);

TYPE iccf_struct IS  RECORD
	(
	component				lftbs_contract_fee_details.component%TYPE,	
	component_ccy			lftbs_contract_fee_details.component_currency%TYPE,	
	payment_method			lftbs_contract_fee_details.payment_method%TYPE,	
	previous_accrual_to_date	date,
	previous_till_date_accrual	lftbs_contract_fee_details.till_date_accrual%TYPE,	
	total_amount_liquidated		lftbs_contract_fee_details.total_amount_liquidated%TYPE,	
	current_till_date_accrual	lftbs_contract_fee_details.till_date_accrual%TYPE,
	current_net_accrual		lftbs_contract_fee_details.current_net_accrual%TYPE,
	accrual_ref_no			lftbs_contract_fee_details.previous_accrual_ref_no%TYPE
	);

TYPE	queue_rec	IS	RECORD
	(
	branch			oltms_branch.branch_code%TYPE,
	module			oltbs_contract.module_code%TYPE,
	processing_date		DATE,
	commit_frequency		oltbs_automatic_process_master.eod_commit_count%TYPE,
	product			oltbs_contract.product_code%TYPE
	);
	
TYPE	queue_tbl	IS	TABLE	OF	queue_rec	INDEX BY	BINARY_INTEGER;	

FUNCTION Fn_update_cycm
		(
		 p_branch				oltms_branch.Branch_code%TYPE,
		 p_cycm_ind				Varchar2,
		 p_err_code		IN OUT 	Varchar2,
		 p_err_param	IN OUT 	Varchar2
		 )
RETURN BOOLEAN;

FUNCTION fn_periodic_accrual
	( 
	p_module			IN		oltbs_contract.module_code%TYPE,
	p_accrual_ref_no		IN		oltbs_auto_function_details.current_accrual_ref_no%TYPE,
	p_processing_date		IN		date,
	p_product			IN		oltbs_contract.product_code%TYPE,
	p_commit_frequency	IN		oltbs_automatic_process_master.eod_commit_count%TYPE, 
	p_error_code		IN OUT	varchar2,	
	p_error_parameter		IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_memo_accrual
	(
	p_module			IN		oltbs_contract.module_code%TYPE,
	p_accrual_ref_no		IN		oltbs_auto_function_details.current_accrual_ref_no%TYPE,
	p_processing_date		IN		date,
	p_product			IN		oltbs_contract.product_code%TYPE,
	p_commit_frequency	IN		oltbs_automatic_process_master.eod_commit_count%TYPE, 
	p_error_code		IN OUT	varchar2,	
	p_error_parameter		IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_accrue_during_amendment
	(
 	p_contract_ref_no		IN 		oltbs_contract.contract_ref_no%TYPE,
	p_amendment_value_date	IN		date,
	p_authorization_status	IN		oltbs_contract.auth_status%TYPE,
	p_handoff_action_code	IN		char,
	p_error_code		IN OUT	varchar2,	
	p_error_parameter		IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_accrue_during_liquidation
	(
 	p_contract_ref_no			IN 		oltbs_contract.contract_ref_no%TYPE,
	p_liquidation_value_date	IN		date,
	p_version_maturity		IN		boolean,
	p_list_of_components		IN		varchar2,
	p_authorization_status		IN		oltbs_contract.auth_status%TYPE,
	p_handoff_action_code		IN		char,
	p_error_code			IN OUT	varchar2,	
	p_error_parameter			IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION Fn_reverse_for_a_contract
	(
	p_contract_ref_no			IN		oltbs_contract.contract_ref_no%TYPE,
	p_processing_date			IN		date,
	p_authorization_status		IN		oltbs_contract.auth_status%TYPE,
	p_handoff_action_code		IN		char,
	p_current_event_seq_no		IN		oltbs_contract.latest_event_seq_no%TYPE,
	cs					IN		contract_struct,
	p_acc_lookup_status		IN		oltbs_contract.user_defined_status%TYPE,
	p_handoff_event_code		IN		oltbs_contract.curr_event_code%TYPE,
	p_transaction_code		IN		oltbs_handoff.trn_code%TYPE,
	p_reverse_status			IN		oltbs_contract.user_defined_status%TYPE,	
	p_error_code			IN OUT	varchar2,
	p_error_parameter			IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_accrue_during_initiation
	(
 	p_contract_ref_no			IN 		oltbs_contract.contract_ref_no%TYPE,
	p_processing_date			IN		date,
	p_authorization_status		IN		oltbs_contract.auth_status%TYPE,
	p_handoff_action_code		IN		char,
	p_error_code			IN OUT	varchar2,	
	p_error_parameter			IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_accrue_during_penalty
	(
 	p_contract_ref_no			IN 	oltbs_contract.contract_ref_no%TYPE,
	p_processing_date			IN	date,
	p_authorization_status		IN	oltbs_contract.auth_status%TYPE,
	p_handoff_action_code		IN	char,
	p_list_of_components		IN	varchar2,
	p_error_code			IN OUT	varchar2,	
	p_error_parameter			IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_reinstate_for_a_contract
	(
	p_contract_ref_no			IN		oltbs_contract.contract_ref_no%TYPE,
	p_processing_date			IN		date,
	p_authorization_status		IN		oltbs_contract.auth_status%TYPE,
	p_handoff_action_code		IN		char,
	p_list_of_components		IN		varchar2,
	p_current_event_seq_no		IN		oltbs_contract.latest_event_seq_no%TYPE,
	cs					IN		contract_struct,
	p_handoff_event_code		IN		oltbs_contract.curr_event_code%TYPE,
	p_transaction_code		IN		oltbs_handoff.trn_code%TYPE,
	p_error_code			IN OUT	varchar2,
	p_error_parameter			IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_calculate_till_date_accrual
	(
	p_contract_ref_no			IN 		oltbs_contract.contract_ref_no%TYPE,
	p_contract_value_date		IN		date,
	p_component				IN 		lftbs_contract_fee_details.component%TYPE,
	p_component_currency		IN		lftbs_contract_fee_details.component_currency%TYPE,
	p_accrual_to_date			IN		date,
	p_till_date_accrual		OUT		lftbs_contract_fee_details.till_date_accrual%TYPE,
	p_error_code			IN OUT	varchar2,
	p_error_parameter			IN OUT	varchar2
	)	
	RETURN boolean;

FUNCTION fn_calculate_till_date_accrual
	(
	p_contract_ref_no			IN 		oltbs_contract.contract_ref_no%TYPE,
	p_contract_value_date		IN		date,
	p_component				IN 		lftbs_contract_fee_details.component%TYPE,
	p_component_currency		IN		lftbs_contract_fee_details.component_currency%TYPE,
	p_schedule_date			IN		date,
	p_accrual_to_date			IN		date,
	p_till_date_accrual		OUT		lftbs_contract_fee_details.till_date_accrual%TYPE,
	p_error_code			IN OUT	varchar2,
	p_error_parameter			IN OUT	varchar2
	)	
	RETURN boolean;

FUNCTION fn_reverse_for_a_contract_sch
	(
	p_contract_ref_no			IN		oltbs_contract.contract_ref_no%TYPE,
	p_processing_date			IN		date,
	p_authorization_status		IN		oltbs_contract.auth_status%TYPE,
	p_handoff_action_code		IN		char,
	p_current_event_seq_no		IN		oltbs_contract.latest_event_seq_no%TYPE,
	cs					IN		contract_struct,
	p_acc_lookup_status		IN		oltbs_contract.user_defined_status%TYPE,
	p_handoff_event_code		IN		oltbs_contract.curr_event_code%TYPE,
	p_transaction_code		IN		oltbs_handoff.trn_code%TYPE,
	p_schedule_date			IN		Date, 						
	p_component				IN		oltbs_amount_due.component%TYPE,		
	p_error_code			IN OUT	varchar2,
	p_error_parameter			IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_reinstate_for_a_cont_sch
	(
	p_contract_ref_no			IN		oltbs_contract.contract_ref_no%TYPE,
	p_processing_date			IN		date,
	p_authorization_status		IN		oltbs_contract.auth_status%TYPE,
	p_handoff_action_code		IN		char,
	p_list_of_components		IN		varchar2,
	p_current_event_seq_no		IN		oltbs_contract.latest_event_seq_no%TYPE,
	cs					IN		contract_struct,
	p_handoff_event_code		IN		oltbs_contract.curr_event_code%TYPE,
	p_transaction_code		IN		oltbs_handoff.trn_code%TYPE,
	p_schedule_date			IN		Date,
	p_component				IN		oltbs_amount_due.component%TYPE,
	p_error_code			IN OUT	varchar2,
	p_error_parameter			IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_accrue_during_init_sch
	(
 	p_contract_ref_no			IN		oltbs_contract.contract_ref_no%TYPE,
	p_processing_date			IN		date,
	p_authorization_status		IN		oltbs_contract.auth_status%TYPE,
	p_handoff_action_code		IN		char,
	p_error_code			IN OUT	varchar2,
	p_error_parameter			IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_accrue_during_penalty_sch
	(
 	p_contract_ref_no			IN 		oltbs_contract.contract_ref_no%TYPE,
	p_processing_date			IN		date,
	p_authorization_status		IN		oltbs_contract.auth_status%TYPE,
	p_handoff_action_code		IN		char,
	p_list_of_components		IN		varchar2,
	p_error_code			IN OUT	varchar2,
	p_error_parameter			IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_accrue_during_liqd_sch
	(
 	p_ContractRefNo		 	IN 		oltbs_contract.contract_ref_no%TYPE,
	p_EventSeqNo		 	IN		oltbs_contract_liq.event_seq_no%TYPE,
	p_LiquidationValueDate 	 	IN		date,
	p_VersionMaturity	 	 	IN		boolean,
	p_ListOfComponents	 	IN		varchar2,
	p_AuthorizationStatus 	 	IN		oltbs_contract.auth_status%TYPE,
	p_HandoffActionCode	 	IN		char,
	p_ErrorCode		 	 	IN OUT	varchar2,
	p_ErrorParameter		 	IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_accrue_during_amend_sch
	(
	p_ContractRefNo			IN 		oltbs_contract.contract_ref_no%TYPE,
	p_AmendmentValueDate		IN		date,
	p_AuthorizationStatus		IN		oltbs_contract.auth_status%TYPE,
	p_HandoffActionCode		IN		char,
	p_ErrorCode				IN OUT	varchar2,
	p_ErrorParameter			IN OUT	varchar2
	)
	RETURN boolean;

Function Fn_BuildPnLHistoryDetails
	(
	p_ContractRefNo			In	 	Varchar2,
	p_ValueDate				In	 	Date,
	p_Component				In	 	Varchar2,
	p_ComponentCcy			In	 	Varchar2,
	p_PrevAccrualToDate		In	 	Date,
	p_TotLiqdAmount			In	 	Number,
	p_ReverseAccruals			In	 	Boolean,
	p_ScheduleDate			In	 	Date,
	p_ListOfAmountTags		In Out 	Varchar2,	
	p_ListOfAmounts			In Out 	Varchar2,	
	p_ListOfAmountCcys		In Out 	Varchar2,	
	p_PnLHistoryInd			In Out 	Varchar2,	
	p_ErrCode				In Out 	Varchar2,	
	p_ErrParams				In Out 	Varchar2
	)
Return Boolean ;

Function Fn_BuildPnLHistoryDetails
	(
	p_ContractRefNo			In	 Varchar2,
	p_ValueDate				In	 Date,
	p_Component				In	 Varchar2,
	p_ComponentCcy			In	 Varchar2,
	p_PrevAccrualToDate		In	 Date,
	p_TotLiqdAmount			In	 Number,
	p_ReverseAccruals			In	 Boolean,
	p_ScheduleDate			In	 Date,
	p_amt_to_reverse			In	 Number,
	p_ListOfAmountTags		In Out Varchar2,	
	p_ListOfAmounts			In Out Varchar2,	
	p_ListOfAmountCcys		In Out Varchar2,	
	p_PnLHistoryInd			In Out Varchar2,	
	p_ErrCode				In Out Varchar2,	
	p_ErrParams				In Out Varchar2
	)
Return Boolean ;

FUNCTION fn_remove_cont_tag
    (
	p_contract_ref_no  		IN		oltbs_contract.contract_ref_no%TYPE,
	l_acc_lookup 	 		IN OUT	olpkss_accounting.tbl_lookup,
	p_event_code      		IN    	lftms_product_iccf.component%TYPE
    )
RETURN boolean;

FUNCTION	fn_parallel_batch
	(
	p_function_id			IN		VARCHAR2,
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION	fn_process_accrual
	(
	p_module				IN		oltbs_contract.module_code%TYPE,
	p_contract_ref_no			IN		oltbs_contract.contract_ref_no%TYPE,
	p_contract_level_entry 		IN		BOOLEAN,
	p_accrual_ref_no			IN		oltbs_auto_function_details.current_accrual_ref_no%TYPE,
	p_commit_frequency		IN		oltbs_automatic_process_master.eod_commit_count%TYPE,
	p_include_stop_status		IN		BOOLEAN,
	p_processing_date			IN		DATE,
	p_accrual_to_date			IN		DATE,
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_populate_process_queue
	(
	p_module				IN		oltbs_contract.module_code%TYPE,		
	p_contract_ref_no			IN		oltbs_contract.contract_ref_no%TYPE,
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_insert_process_queue
	(
	p_contract_ref_no			IN		oltbs_contract.contract_ref_no%TYPE,
	p_function_id			IN		eitms_modules_installed.function_id%TYPE,
	p_processing_date			IN 		DATE,
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_process_ldaccrual  
	(
	p_module				IN		oltbs_contract.module_code%TYPE,		
	p_contract_ref_no			IN		oltbs_contract.contract_ref_no%TYPE,
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION Fn_populate_month_accr
	(
	p_module				IN		oltbs_contract.module_code%TYPE,
	p_processing_date			IN		date,
	p_product				IN		oltbs_contract.product_code%TYPE,
	p_commit_frequency		IN		oltbs_automatic_process_master.eod_commit_count%TYPE,
	p_error_code			IN OUT	varchar2,
	p_error_parameter			IN OUT	varchar2
	)
RETURN BOOLEAN;

FUNCTION Fn_pass_pycycm_entry
	(
	 p_contract_ref_no				oltbs_contract.Contract_ref_no%TYPE,
	 p_product						oltbs_contract.Product_code%TYPE,
	 p_current_event_Seq_no 			oltbs_contract.Latest_event_seq_no%TYPE,
	 p_handoff_event_code				oltbs_contract.Curr_event_code%TYPE,
	 p_handoff_action_code				Varchar2,
	 p_contract_status				Varchar2,
	 p_processing_date				Date,
	 p_transaction_code				oltms_product_status_master.Transaction_code%TYPE,
	 p_list_of_amt_tags				Varchar2,
	 p_list_of_amts					Varchar2,
	 p_list_amt_ccys					Varchar2,
	 p_list_of_pycycm_ind				Varchar2,
	 p_tbl_lookup					olpkss_accounting.tbl_lookup,
	 p_err_code				IN OUT 	Varchar2,
	 p_err_param 			IN OUT 	Varchar2
	 )
RETURN BOOLEAN ;
--26-FEB-2009 FCC V.CL Release 7.5 CITIUS RETRO TILL#5265 Starts
FUNCTION fn_accrue_for_a_contract
	(
 	p_contract_ref_no		IN 		oltbs_contract.contract_ref_no%TYPE,
	p_processing_date		IN		date,
	p_action_is_liquidation	IN		boolean,
	p_adjust_anyway		IN		boolean,
	p_version_maturity	IN		boolean,
	p_list_of_components	IN		varchar2,
	p_authorization_status	IN		oltbs_contract.auth_status%TYPE,
	p_handoff_action_code	IN		char,
	p_error_code		IN OUT	varchar2,
	p_error_parameter		IN OUT	varchar2
	)
RETURN boolean;
--26-FEB-2009 FCC V.CL Release 7.5 CITIUS RETRO TILL#5265 Ends
--29-MAR-2011 Flexcube V.CL Release 7.9, CITIUS Retro, #7704, Changes Starts
FUNCTION fn_adjust_memo_entries
	(
	p_contract_ref_no	  	IN		oltbs_contract.contract_ref_no%TYPE,
	p_version_maturity	IN		Boolean,
	p_authorization_status	IN		oltbs_contract.auth_status%TYPE,
	p_handoff_action_code	IN		Char,
	p_processing_date		IN		Date,
	p_err_code			IN OUT	Varchar2,
	p_err_param			IN OUT 	Varchar2
	)
RETURN boolean;
--29-MAR-2011 Flexcube V.CL Release 7.9, CITIUS Retro, #7704,Changes  Ends
END lfpks_fee_accrual;
/
CREATE OR REPLACE SYNONYM lfpkss_fee_accrual FOR lfpks_fee_accrual
/