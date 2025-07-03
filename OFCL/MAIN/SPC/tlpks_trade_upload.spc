CREATE OR REPLACE PACKAGE tlpks_trade_upload AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: tlpks_trade_upload.SPC
**
** Module	: LT - SECONDARY LOAN TRADING
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
**
----------------------------------------------------------------------------------------------------
*/
/* CHANGE-HISTORY
15-06-2008 FLEXCUBE V.CL Release 7.4 - New object created for LQT-Interface with FLEXCUBE for LT Module.
21-JAN-2009 FLEXCUBE V.CL Release 7.4 ITR1 SFR#73(Not as part of SFR Changes->Dev Changes)Changes
	    Changes regarding Population of Trade Identifier(PO) depending on Line Trade Type flag. 
26-AUG-2009 CITIUS-LS#6235, Clearpar and SLT incremental changes retro - ITR1 SFR#11 commented expense code parameter in fn_product_resolution.
							also changed the copyright clause.
03-oct-2009 CITIUS-LS#6723 product resolution changes 	
10-OCT-2009 CITIUS-LS#6751 Changes for New utility screen to process all SLT operations in one screen to take the debug	
16-DEC-2011 CITIUS-LS#12123 Trade claim product changes. If the cusip belongs to trade claim then as part of trade booking from LQT system should pick the trade claim product.
07-NOV-2011 Flexcube V.CL Release 7.10, FS Vol 1 Tag 8, Markit Trade Settlement Changes
15-NOV-2011 Flexcube V.CL Release 7.10, FS Vol 1 Tag 08,Markit Trade Settlement Changes
14-NOV-2011 Flexcube V.CL Release 7.10 FS Tag12,Automation of Portfolio ID from E-Sales Changes:To create customer,portfolio and LS-LD mapping for a new firm_acct_mnemonic from E-Sales.
30-JAN-2012 Flexcube V.CL Release 7.10 FS Vol1 Tag 10 IUT1#56 changes - No other field should be allowed to amend with buy sell indicator amendmend
25-FEB-2012 Flexcube V.CL Release 7.10 FS Vol1 Tag 08 RT#13,  IUT#341.iut#344 ,Manual matching was not working for allocation and in case of trade match tranche was going null if trade was not there
05-MAR-2012 Flexcube V.CL Release 7.10 FS Vol1 Tag 08 IUT#415,System was not logging all validation failures
29-NOV-2013 Oracle FLEXCUBE  Universal Banking 3.3.0.0.0CITI_R714 FS Tag 6 changes,Changes of automatic commitment reduction/pik chnages propagation if
commitment reduction exists at the cusip ticket combination
22-OCT-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 RETRO CITIBLR#35327 changes,Added new functions

  Changed By         : Jayaram N
  Date               : 01-Nov-2019
  Change Description : Ticket Settlement Message Director
  Search String      : SFR#29959798 OBCL_14.4_Ticket_Settlement_Message_Director
  
  Changed By         : Jayaram N
  Date               : 04-Feb-2020
  Change Description : Primary_Delayed_Compensation ( LQT Error msg when Upload Failed )
  Search String      : BUG#30834559:OBCL_14.4_Ticket_Settlement_Message_Director
  
*/

TYPE p_Rec_Upl_Error_log IS TABLE OF tltbs_contract_exception%ROWTYPE INDEX BY BINARY_INTEGER;
lTbl_Upl_error_log p_Rec_Upl_Error_log;

TYPE lTbl_upl_fee IS TABLE OF oltbs_lt_fee%ROWTYPE INDEX BY BINARY_INTEGER;

Procedure pr_Process_Upload
(
	p_Source_Code		IN		oltbs_lt_trade.Source_Code%type,
	p_Error_Code		IN 		OUT	Varchar2,
	p_Error_Param		IN 		OUT	Varchar2
,	P_Trans_Id			IN		oltbs_lt_trade.Trans_id%TYPE DEFAULT 'ALL' --CITIUS-LS#6751 change
);

FUNCTION fn_Upload_Trade_Fee
(
p_Source_Code		IN	oltbs_lt_trade.Source_Code%type,
p_Trans_ID		IN	oltbs_lt_trade.Trans_ID%Type,
p_Error_Code		IN OUT	Varchar2,
p_Error_Param		IN OUT	Varchar2
)
Return Boolean;

PROCEDURE pr_Update_Status
(
p_Source_Code		IN	oltbs_lt_trade.Source_Code%type,
p_Trans_Id		IN	oltbs_lt_trade.Trans_Id%type,
p_Status		IN	oltbs_lt_trade.Upload_Status%type,
p_success		IN OUT	BOOLEAN,
p_Error_Code		IN OUT	VARCHAR2,
p_Error_Param		IN OUT	VARCHAR2,
p_ref_no		IN	oltbs_contract.contract_ref_no%type DEFAULT 'NO-REF'
) ;

FUNCTION fn_product_resolution
(
p_desk_code		IN	lbtms_desk.Desk_Code%type,
p_branch		IN	oltms_branch.Branch_Code%Type,
--p_expense_code		IN 	GLTMS_MIS_CODE.mis_code%type,--26-AUG-2009 CITIUS-LS#6235, Clearpar and SLT incremental changes retro - ITR1 SFR#11
p_sttl_appl		IN 	tltbs_upload_master.internal_trade%type,
p_product_code		OUT	tltbs_upload_master.product_code%type,
p_Error_Code		IN OUT	VARCHAR2,
p_Error_Param		IN OUT	VARCHAR2,
p_clp_product		IN	VARCHAR2 DEFAULT 'N',--CITIUS-LS#6723 product resolution changes  
p_cusip_no		IN	VARCHAR2 DEFAULT NULL	--CITIUS-LS#12123 Added P_cusip_no
)
RETURN BOOLEAN;

FUNCTION fn_obtain_trans_lock
(
p_trans_id		IN	oltbs_lt_trade.Trans_Id%TYPE,
p_err_code		IN OUT	ERTBS_MSGS.Err_Code%Type,
p_err_param		IN OUT	VARCHAR2
)
RETURN BOOLEAN;

Function fn_Swap_Recalculate
(
p_Ext_Contract_Ref_no	IN	tltbs_upload_swap.Ext_Contract_Ref_no%TYPE,
p_Source_Code		IN	tltbs_upload_swap.Source_Code%TYPE,
p_Branch		IN	tltbs_upload_swap.Branch%TYPE,
p_Trade_Ref_No		IN	tltbs_upload_master.Trade_Ref_no%TYPE,
p_Error_Code		IN OUT	ERTBS_MSGS.Err_Code%Type,
p_Error_Param		IN OUT	VARCHAR2
)

RETURN BOOLEAN;

FUNCTION fn_resolve_Trade_identifier
(
P_desk_code		IN	lbtms_desk.desk_code%TYPE,
P_trade_type		IN	tltbs_contract_master.trade_type%TYPE,
P_source_code		IN	tltbs_contract_master.source_code%TYPE DEFAULT NULL,
P_swap_id		IN	tltbs_contract_master.Swap_Id%TYPE DEFAULT NULL,
P_line_trade_type	IN	tltbs_upload_master.line_trade_type%TYPE DEFAULT NULL --FLEXCUBE V.CL Release 7.4 ITR1 SFR#73 Changes
)
RETURN	tltbs_contract_master.Trade_identifier%TYPE;

--07-NOV-2011 Flexcube V.CL Release 7.10, FS Vol 1 Tag 8, Markit Trade Settlement Changes start

FUNCTION FN_MKT_TRD_MSG_PROCESSING(P_MSG_SEQ	IN	OLTB_LT_MARKIT_TRADE_MASTER.MESSAGE_SEQ_NO%TYPE,
				P_MSG_ID	IN	OLTB_LT_MARKIT_TRADE_MASTER.MESSAGE_ID%TYPE,
				P_MARKT_TRD_ID	IN	OLTB_LT_MARKIT_TRADE_MASTER.MARKIT_TRADE_ID%TYPE,
				P_ERROR_CODE	IN OUT	VARCHAR2,
				P_ERROR_PARAM	IN OUT	VARCHAR2
				)
RETURN BOOLEAN;

/*FUNCTION FN_MKT_TRD_MSG_PROCESSING(P_MSG_SEQ	IN	OLTB_LT_MARKIT_TRADE_MASTER.MESSAGE_SEQ_NO%TYPE,
				P_MSG_ID	IN	OLTB_LT_MARKIT_TRADE_MASTER.MESSAGE_ID%TYPE,
	   			 P_MARKT_TRD_ID	IN	OLTB_LT_MARKIT_TRADE_MASTER.MARKIT_TRADE_ID%TYPE,
	   			 P_ERROR_CODE	IN OUT	VARCHAR2,
	   			 P_ERROR_PARAM	IN OUT	VARCHAR2
				)
RETURN BOOLEAN;*/

FUNCTION fn_get_matching_trade(
		p_msg_id		IN	oltbs_lt_markit_trade_master.MESSAGE_ID%TYPE,--Flexcube V.CL Release 7.10 FS Vol1 Tag 08 IUT#415 changes
		p_seller		IN	OLTB_LT_MARKIT_TRADE_MASTER.SELLER%type,
		p_buyer			in	OLTB_LT_MARKIT_TRADE_MASTER.BUYER%type,
		p_lqt_ticket_id		IN	OLTB_LT_MARKIT_TRADE_MASTER.LQT_TICKET_ID%type,
		p_markit_trade_id	IN	OLTB_LT_MARKIT_TRADE_MASTER.MARKIT_TRADE_ID%TYPE,
		p_external_cusip_no	IN	OLTB_LT_MARKIT_TRADE_DETAIL.EXTERNAL_CUSIP_NO%TYPE,
		p_trade_amount		IN	OLTB_LT_MARKIT_TRADE_DETAIL.TRADE_AMOUNT%TYPE,
		p_trade_ccy		IN	OLTB_LT_MARKIT_TRADE_DETAIL.TRADE_CCY%TYPE,
		p_trade_price		IN	OLTB_LT_MARKIT_TRADE_DETAIL.TRADE_PRICE%TYPE,
		p_trade_type		IN	OLTB_LT_MARKIT_TRADE_MASTER.TRADE_TYPE%TYPE,
		p_trade_date		IN	OLTB_LT_MARKIT_TRADE_MASTER.TRADE_DATE%TYPE,
		p_expectedt_settl_date	IN	OLTB_LT_MARKIT_TRADE_MASTER.EXPT_SETTL_DATE%TYPE,
		p_form_of_purchase	IN	OLTB_LT_MARKIT_TRADE_MASTER.FORM_OF_PURCHASE%TYPE,
		p_markit_allocation_id	IN	OLTB_LT_MARKIT_TRADE_DETAIL.MARKIT_ALLOCATION_ID%TYPE,
		p_accrual_sett_type	IN	OLTB_LT_MARKIT_TRADE_MASTER.accrual_sett_type%TYPE,
		--p_processd_unmatchd	IN	VARCHAR2,
		p_msg_validated		IN OUT	boolean,
		p_out_seller		IN OUT	TLTB_CONTRACT_MASTER.counterparty%type,
		p_out_buyer		IN OUT	TLTB_CONTRACT_MASTER.counterparty%type,
		p_trade_ref_no		IN OUT 	TLTB_CONTRACT_MASTER.contract_ref_no%type,
		p_error_code		IN OUT	varchar2,
		p_error_param		IN OUT	varchar2
		)
RETURN BOOLEAN;

/*FUNCTION FN_MSGS_PROCESSED(P_MARKIT_TRADE_ID	IN	tltbs_markit_trade_settl_queue.MARKIT_TRADE_ID%TYPE,
			  P_LQT_TICKET_ID	IN	tltbs_markit_trade_settl_queue.LQT_TICKET_ID%TYPE,
			  P_EXT_CUSIP_NO	IN	OLTB_LT_MARKIT_TRADE_DETAIL.EXTERNAL_CUSIP_NO%TYPE,
			  P_ALLOC_ID		IN	OLTB_LT_MARKIT_ALLOCATION.MARKIT_ALLOCATION_ID%TYPE ,
			  P_MATCHING_DONE	OUT	VARCHAR2,
			  P_ALLOCATION_DONE	OUT	VARCHAR2
			)
RETURN BOOLEAN;*/

FUNCTION fn_get_matching_alloc_trade
		(
		p_msg_id		IN	oltbs_lt_markit_trade_master.MESSAGE_ID%TYPE,--Flexcube V.CL Release 7.10 FS Vol1 Tag 08 IUT#415 changes
		p_allocated_party	in	OLTB_LT_MARKIT_ALLOCATION.allocated_party%type,
		p_allocating_party	in	OLTB_LT_MARKIT_ALLOCATION.allocating_party%type,
		--p_trade_ref_no		in	tltbs_contract_master.contract_ref_no%type,
		p_trade_amount		in	OLTB_LT_MARKIT_TRADE_DETAIL.trade_amount%type,
		p_trade_ccy		in	OLTB_LT_MARKIT_TRADE_DETAIL.trade_ccy%type,
		p_trade_price		in	OLTB_LT_MARKIT_TRADE_DETAIL.trade_price%type,
		p_trade_type		in	OLTB_LT_MARKIT_TRADE_MASTER.trade_type%type,
		p_trade_date		in	OLTB_LT_MARKIT_TRADE_MASTER.trade_date%type,
		p_expectedt_settl_date	in	OLTB_LT_MARKIT_TRADE_MASTER.expt_settl_date%type,
		p_form_of_purchase	in	OLTB_LT_MARKIT_TRADE_MASTER.form_of_purchase%type,
		p_markit_allocation_id	in	OLTB_LT_MARKIT_TRADE_DETAIL.markit_allocation_id%type,
		p_lqt_ticket_id		in	OLTB_LT_MARKIT_TRADE_MASTER.lqt_ticket_id%type,
		p_markit_trade_id	in	OLTB_LT_MARKIT_TRADE_DETAIL.markit_trade_id%type,
		p_external_cusip_no	in	OLTB_LT_MARKIT_TRADE_DETAIL.external_cusip_no%type,
		p_accrual_sett		in	oltbs_lt_markit_trade_master.accrual_sett_type%type,
		p_fcc_buyer		in	varchar2,
		p_fcc_seller		in	varchar2,
		p_message_validated	in out	boolean,
		p_out_seller		in out	TLTB_CONTRACT_MASTER.counterparty%type,
		p_out_buyer		in out	TLTB_CONTRACT_MASTER.counterparty%type,
		p_out_trade_ref_no	in out 	TLTB_CONTRACT_MASTER.contract_ref_no%type,
		p_out_allocating_party	in out	varchar2,
		p_error_code		in out	varchar2,
		p_error_param		in out	varchar2
		)
RETURN BOOLEAN;

FUNCTION fn_get_fcc_details
(p_contract_ref_no	IN	oltbs_contract_master.CONTRACT_REF_NO%TYPE,
 p_trade_ref_no		IN	tltbs_contract_master.contract_ref_no%type,
 p_agency_ref_no	OUT	VARCHAR2,
 p_fcc_ccy		OUT	VARCHAR2,
 p_fcc_amount		OUT	NUMBER,
 p_fcc_buyer_share	OUT	NUMBER,
 p_dcf_amount		OUT	NUMBER,
 p_err_code		IN OUT	VARCHAR2,
 p_err_param		IN OUT	VARCHAR2
 )
 RETURN BOOLEAN;
 /*FUNCTION FN_GET_STATUS
 	(
 	P_MARKIT_TRD_ID		IN	oltbs_lt_markit_trade_master.MARKIT_TRD_ID%TYPE,
 	P_EXTERNAL_CUSIP_NO	IN	VARCHAR2,
 	P_SELLER		IN	tltbs_contract_master.COUNTERPARTY%TYPE,
 	P_BUYER			IN	tltbs_contract_master.COUNTERPARTY%TYPE,
 	P_TRADE_REF_NO		IN	tltbs_contract_master.CONTRACT_REF_NO%TYPE,
 	P_MATCH_STATUS		OUT	VARCHAR2,
 	P_MESSAGE_STATUS	OUT	VARCHAR2
 	)
RETURN BOOLEAN;*/

PROCEDURE PR_LOG_MARKIT_ERROR
(	P_MESSAGE_ID		IN	OLTB_LT_MARKIT_TRADE_MASTER.MESSAGE_ID%TYPE,
	P_MARKIT_ID		IN	OLTB_LT_MARKIT_TRADE_MASTER.MARKIT_TRADE_ID%TYPE,
	P_MARKIT_ALLOCATION_ID	IN 	OLTB_LT_MARKIT_TRADE_DETAIL.MARKIT_ALLOCATION_ID%TYPE,
	P_EXT_CUSIP_NO		IN	OLTB_LT_MARKIT_TRADE_DETAIL.EXTERNAL_CUSIP_NO%TYPE,
	P_ERR_SEQ		IN OUT	NUMBER,
	P_ERROR_CODE		IN	VARCHAR2,
	P_ERROR_PARAM		IN	VARCHAR2
);

TYPE P_REC_UPL_MARKIT_ERROR_LOG IS TABLE OF OLTB_LT_MARKIT_EXCEPTION%ROWTYPE INDEX BY BINARY_INTEGER;
LTBL_UPL_ERROR_MARKIT_LOG P_REC_UPL_MARKIT_ERROR_LOG;

FUNCTION fn_process_closure
(
 p_msg_id		in	OLTB_LT_MARKIT_TRADE_MASTER.message_id%type,
 p_markit_trade_id	in	OLTB_LT_MARKIT_TRADE_MASTER.markit_trade_id%type,
 p_markit_allocation_id	in	OLTB_LT_MARKIT_TRADE_DETAIL.markit_allocation_id%type,
 p_actual_settl_dt	in	DATE,
 p_error_code		in out	varchar2,
 p_error_param		in out	varchar2
 )
RETURN BOOLEAN;

--15-NOV-2011 Flexcube V.CL Release 7.10, FS Vol 1 Tag 08,Markit Trade Settlement Changes start
FUNCTION fn_upd_unmatched_markit
(
	p_markit_trade_id	IN	tltbs_markit_trade_settl_queue.markit_trade_id%TYPE
	,p_markit_allocation_id	IN	tltbs_markit_trade_settl_queue.markit_allocation_id%TYPE
	,p_external_cusip_no	IN	tltbs_markit_trade_settl_queue.external_cusip_no%TYPE
	,p_trade_ref_no		IN	tltbs_markit_trade_settl_queue.trade_ref_no%TYPE
	,p_error_code		IN OUT	VARCHAR2
	,p_error_param		IN OUT	VARCHAR2
)
RETURN BOOLEAN;
FUNCTION fn_pop_markit_temp
(
	p_markit_trade_id	IN	tltbs_markit_trade_settl_queue.markit_trade_id%TYPE
	,p_markit_allocation_id	IN	tltbs_markit_trade_settl_queue.markit_allocation_id%TYPE
	,p_lqt_ticket_id	IN	tltbs_markit_trade_settl_queue.lqt_ticket_id%TYPE
	,p_external_cusip_no	IN	tltbs_markit_trade_settl_queue.external_cusip_no%TYPE
	,p_pop_delete		IN 	VARCHAR2 DEFAULT 'P'
	,p_trade_ref_no		IN	tltbs_markit_trade_settl_queue.trade_ref_no%TYPE
	,p_error_code		IN OUT	VARCHAR2
	,p_error_param		IN OUT	VARCHAR2
)
RETURN BOOLEAN;
FUNCTION fn_restore_markit_temp
(
	p_markit_trade_id	IN	tltbs_markit_trade_settl_queue.markit_trade_id%TYPE
	,p_markit_allocation_id	IN	tltbs_markit_trade_settl_queue.markit_allocation_id%TYPE
	,p_lqt_ticket_id	IN	tltbs_markit_trade_settl_queue.lqt_ticket_id%TYPE
	,p_external_cusip_no	IN	tltbs_markit_trade_settl_queue.external_cusip_no%TYPE
	,p_error_code		IN OUT	VARCHAR2
	,p_error_param		IN OUT	VARCHAR2
)
RETURN BOOLEAN;
--15-NOV-2011 Flexcube V.CL Release 7.10, FS Vol 1 Tag 08,Markit Trade Settlement Changes end

FUNCTION Fn_resolve_trade
		(
		p_buyer			in out	varchar2,
		p_seller		in out	varchar2,
		p_lqt_ticket_id		in	tltbs_contract_master.ticket_id%type,
		p_markit_trade_id	in	tltbs_markit_trade_settl_queue.markit_trade_id%type,
		p_external_cusip_no	in	tltbs_markit_trade_settl_queue.external_cusip_no%type,
		p_trade_amount		in	tltbs_contract_master.trade_amount%type,
		p_trade_ccy		in	varchar2,
		p_trade_price		in	tltbs_contract_master.trade_price%type,
		--p_trade_type		in	varchar2,
		p_trade_date		in	date,
		p_expectedt_settl_date	in	date,
		p_form_of_purchase	in	varchar2,
		p_markit_allocation_id	in	varchar2,
		p_trade_ref_no		out	tltbs_contract_master.contract_ref_no%type,
		p_self_buyer		in	number,
		p_self_seller		in	number,
		p_processed_unmatched	in	varchar2,
		p_error_code		in out	varchar2,
		p_error_param		in out	varchar2
		)
RETURN BOOLEAN;
FUNCTION Fn_validate_trade
	(
	p_seller_allocating_party	IN	VARCHAR2,
	p_buyer_allocated_party		IN	VARCHAR2,
	p_msg_name			IN	VARCHAR2,
	p_parent_buyer			IN	VARCHAR2,
	p_parent_seller			IN	VARCHAR2,
	p_trade_type			IN	VARCHAR2,
	p_msg_id			IN	VARCHAR2,--Flexcube V.CL Release 7.10 FS Vol1 Tag 08 IUT#415 ADDED
	p_mkt_trd_id			IN	VARCHAR2,--Flexcube V.CL Release 7.10 FS Vol1 Tag 08 IUT#415 ADDED
	p_mkt_alloc_id			IN	VARCHAR2,--Flexcube V.CL Release 7.10 FS Vol1 Tag 08 IUT#415 ADDED
	p_external_cusip_no		IN	VARCHAR2,--Flexcube V.CL Release 7.10 FS Vol1 Tag 08 IUT#415 ADDED
	p_resolved_allocating_party	IN OUT	VARCHAR2,
	p_out_seller			OUT	VARCHAR2,
	p_out_buyer			OUT	VARCHAR2,
	p_self_allocating_party		OUT	NUMBER,
	p_self_allocated_party		OUT	NUMBER,
	p_self_buyer_cnt		OUT	NUMBER,
	p_self_seller_cnt		OUT	NUMBER,
	p_processed_unmatched		OUT	VARCHAR2,
	p_error_code			IN OUT	VARCHAR2,
	p_error_param			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
Procedure pr_mkt_trd_msg_processing(p_markit_trade_id	IN	VARCHAR2 DEFAULT 'ALL');
FUNCTION Fn_batch_trade_match
		(
		p_branch		IN	VARCHAR2,
		p_module		IN	VARCHAR2,
		p_commit_frequency	IN	NUMBER,
		p_error_code		IN OUT	VARCHAR2,
		p_error_param		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;
--07-NOV-2011 Flexcube V.CL Release 7.10, FS Vol 1 Tag 8, Markit Trade Settlement Changes end
--14-NOV-2011 Flexcube V.CL Release 7.10 FS Tag12,Automation of Portfolio ID from E-Sales Changes start
FUNCTION Fn_gen_customer
	(
	P_FIRM_ACCT_MNEMONIC 	IN 	tltms_firmac_mcc_detail.FIRM_ACCT_MNEMONIC%TYPE,
	P_MCC			IN 	tltms_strategy_mapping.MCC%TYPE,
	P_CUSTOMER_NO 		IN OUT 	oltms_customer.CUSTOMER_NO%TYPE,
	P_ERROR_CODE		IN OUT 	VARCHAR2,
	P_ERROR_PARAM 		IN OUT 	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION Fn_generate_portfolio
	(
	p_mcc			in  	tltms_strategy_mapping.mcc%type,
	p_firm_acct_mnemonic 	in 	tltms_firmac_mcc_detail.firm_acct_mnemonic%type,
	p_portfolio		in out	tltms_firmac_mcc_detail.portfolio%type,
	p_error_code		in out	varchar2,
	p_error_param		in out	varchar2
	)
Return Boolean;

FUNCTION Fn_pop_portfolio_details(
	p_customer_no 		IN oltms_customer.customer_no%type,
	p_strategy_mapping	IN tltms_strategy_mapping%rowtype,
	p_firm_acct_mnemonic 	IN tltms_firmac_mcc_detail.FIRM_ACCT_MNEMONIC%TYPE,
	p_error_code		IN OUT VARCHAR2,
	p_error_param		IN OUT VARCHAR2
	)

RETURN BOOLEAN;

FUNCTION Fn_pop_posid_details
	(
	p_customer_no	IN	oltms_customer.CUSTOMER_NO%TYPE,
	p_error_code	IN OUT	VARCHAR2,
	p_error_param	IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION Fn_pop_ls_ld_mapping_detail
	(
	p_MCC         IN tltms_strategy_mapping.MCC%type,
	p_customer_no 	IN oltms_customer.customer_no%type,
	p_error_code	IN OUT VARCHAR2,
	p_error_param	IN OUT VARCHAR2
	)
RETURN BOOLEAN;
FUNCTION Fn_auto_port_exception
(
	P_MCC			IN tltms_strategy_mapping.MCC%TYPE,
	P_FIRM_ACCT_MNEMONIC 	IN tltms_firmac_mcc_detail.FIRM_ACCT_MNEMONIC%TYPE,
	P_ERROR_CODE		IN VARCHAR2,
	P_ERROR_PARAM		IN VARCHAR2
)
RETURN BOOLEAN;
FUNCTION Fn_reprocess
	(
	p_pos_id_stat		in	tltms_firmac_mcc_detail.pos_id_creation_stat%type,
	p_ls_ld_map_stat	in	tltms_firmac_mcc_detail.ls_ld_mapping_creation_stat%type,
	p_mcc			in  	tltms_strategy_mapping.mcc%type,
	p_firm_acct_mnemonic 	in 	tltms_firmac_mcc_detail.firm_acct_mnemonic%type,
	p_portfolio		in out 	tltms_firmac_mcc_detail.portfolio%type,
	p_error_code		in out	varchar2,
	p_error_param		in out	varchar2
	)
Return Boolean;
--14-NOV-2011 Flexcube V.CL Release 7.10 FS Tag12,Automation of Portfolio ID from E-Sales Changes end
--30-JAN-2012 Flexcube V.CL Release 7.10 FS Vol1 Tag 10 IUT1#56 changes starts
FUNCTION fn_validate_buysell_amend
	(p_curr_trade_version	IN	tltbs_upload_master%ROWTYPE
	, p_err_code 		OUT	VARCHAR2
	, p_err_param 		OUT	VARCHAR2
	)
RETURN BOOLEAN;
--30-JAN-2012 Flexcube V.CL Release 7.10 FS Vol1 Tag 10 IUT1#56 changes ends
--Flexcube V.CL Release 7.10 FS Vol1 Tag 08 RT#13,  IUT#341.iut#344 STARTS
FUNCTION FN_UPD_SETTLEMENT_DETAILS(p_trd_settl_q	IN	tltbs_markit_trade_settl_queue%rowtype,
				p_trade_ref_no		IN	VARCHAR2,
				p_error_code		IN OUT	VARCHAR2,
				p_error_param		IN OUT	VARCHAR2
				)
RETURN BOOLEAN ;
FUNCTION Fn_initiate_matching
	(p_trd_settl_q	IN	tltbs_markit_trade_settl_queue%rowtype,
	p_err_code	IN OUT	VARCHAR2,
	p_err_param	IN OUT  VARCHAR2
	)
RETURN BOOLEAN;
----Flexcube V.CL Release 7.10 FS Vol1 Tag 08 RT#13,  IUT#341.iut#344 STARTS ENDS
--29-NOV-2013 Oracle FLEXCUBE  Universal Banking 3.3.0.0.0CITI_R714 FS Tag 6 changes starts
FUNCTION fn_upload_trade_for_comred_pik(
					p_ext_contract_ref_no	IN	VARCHAR2,
					p_source_code		IN	VARCHAR2,
					p_brn_code		IN	VARCHAR2,
					p_version_no		IN	NUMBER,
					p_orig_trade_amount	IN	TLTB_CONTRACT_MASTER.original_trade_amount%type,--03-SEP-2014-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 FS Vol1 Tag 06 CITIBLR#35327 change
					--p_comred_percent	IN	NUMBER,--03-SEP-2014-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 FS Vol1 Tag 06 CITIBLR#35327 change
					--p_pikpercent		IN	NUMBER,--03-SEP-2014-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 FS Vol1 Tag 06 CITIBLR#35327 change
					p_comred_amt		IN	TLTB_CONTRACT_MASTER.commitment_reduction_amount%type,--03-SEP-2014-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 FS Vol1 Tag 06 CITIBLR#35327 changes
					p_pik_amount		IN	TLTB_CONTRACT_MASTER.pik_amount%type,--03-SEP-2014-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 FS Vol1 Tag 06 CITIBLR#35327 change
					p_comred_price		IN	NUMBER,
					p_error_code		IN OUT	VARCHAR2,
					p_error_param		IN OUT	VARCHAR2
					)
RETURN BOOLEAN;
--29-NOV-2013 Oracle FLEXCUBE  Universal Banking 3.3.0.0.0CITI_R714 FS Tag 6 changes ends
--03-SEP-2014-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 FS Vol1 Tag 06 CITIBLR#35327 changes starts
FUNCTION Fn_tolerance_check(
			p_cr_diff	in	NUMBER,
			p_pik_diff	in	NUMBER
			)	
RETURN VARCHAR2;
FUNCTION Fn_match_comred_pik_percentage(
			p_upl_trade		IN	tltbs_upload_master%rowtype,
			p_crpercent		IN	tltbs_comred_pik_percentage.comm_red_percentage%type,
			p_pikpercent		IN	tltbs_comred_pik_percentage.pik_percentage%type,
			p_proceed		IN OUT	VARCHAR2,
			p_error_code		IN OUT	VARCHAR2,
			p_error_param		IN OUT	VARCHAR2
			)	
RETURN BOOLEAN;
--03-SEP-2014-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 FS Vol1 Tag 06 CITIBLR#35327ends


--OBCL14.4:SFR#29959798:Ticket Settlement Message Director - Start  
FUNCTION fn_pop_Istms_Upload_Markit
        (
        p_msg_id        IN  oltbs_lt_markit_trade_master.message_id%TYPE,
	    p_markit_msg_id IN  oltbs_markit_trade_ops.markit_message_id%TYPE,
        p_trd_ref_no    IN  tltbs_contract_master.contract_ref_no%TYPE,
        p_error_code    IN OUT  VARCHAR2,
        p_error_param   IN OUT  VARCHAR2
    )
RETURN BOOLEAN;

FUNCTION fn_upload_Settl_Instr
  (
    P_Upload_Instr	IN OUT	oltms_Upload_Instr_Markit%ROWTYPE,
    p_ssi_mnemonic    	OUT    oltms_Upload_Instr_Markit.Ssi_Mnemonic%TYPE,
    p_Ssn		OUT 	oltms_instr.Settlement_Seq_No%TYPE,
    P_Error_Code    	IN OUT VARCHAR2,
    P_Error_Params    	IN OUT VARCHAR2
  )
RETURN BOOLEAN;

FUNCTION fn_validate_Settl_Instr
  (
    p_upload_instr		IN OUT	oltms_Upload_Instr_Markit%ROWTYPE,
    p_error_code    	IN OUT VARCHAR2,
    p_error_params    	IN OUT VARCHAR2
  )
RETURN BOOLEAN;

FUNCTION fn_check_ssi_mnemonic
  (
    P_Source_Code     IN      oltms_Upload_Instr_Markit.Source_Code%TYPE,
    P_Branch          IN      oltms_Upload_Instr_Markit.Branch%TYPE,
    P_Module          IN      oltms_Upload_Instr_Markit.Module%TYPE,
    P_Product         IN      oltms_Upload_Instr_Markit.Product%TYPE,
    P_Counterparty    IN      oltms_Upload_Instr_Markit.Counterparty%TYPE,
    P_Currency        IN      oltms_Upload_Instr_Markit.Currency%TYPE,
    P_External_Id     IN	  oltms_Upload_Instr_Markit.External_Id%TYPE,
    p_ssi_mnemonic    OUT     oltms_instr.ssi_mnemonic%type,
    p_Ssn	          OUT	  oltms_instr.Settlement_Seq_No%TYPE,
    P_Error_Code      IN OUT     VARCHAR2,
    P_Error_Params    IN OUT     VARCHAR2
  )
RETURN BOOLEAN;

FUNCTION fn_calculate_fmem_details
	(	p_msg_id			IN	oltb_lt_markit_trade_master.markit_message_id%TYPE,
		p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
		p_error_code		IN 	OUT	VARCHAR2,
		p_error_param		IN 	OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_mkt_tckt_settlement
    (	p_markit_msg_id		IN	oltb_lt_markit_trade_master.markit_message_id%TYPE,
		p_call_from			IN	VARCHAR2,
		p_error_code		IN 	OUT	VARCHAR2,
		p_error_param		IN 	OUT	VARCHAR2
	)
RETURN BOOLEAN;

PROCEDURE pr_mkt_tckt_msg_processing (p_markit_message_id	IN	VARCHAR2 DEFAULT 'ALL');
--OBCL14.4:SFR#29959798:Ticket Settlement Message Director - End


FUNCTION fn_populate_error_message(p_Source IN VARCHAR2 ) RETURN BOOLEAN;
--OBCL14.4:BUG#30834559:Primary_Delayed_Compensation - Changes


END tlpks_trade_upload;
/
CREATE or replace Synonym tlpkss_trade_upload for tlpks_trade_upload
/