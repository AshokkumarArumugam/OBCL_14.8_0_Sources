CREATE OR REPLACE PACKAGE tlpks_settlements IS
/*----------------------------------------------------------------------------------------------------
**
** File Name	:tlpks_settlements.SPC
**
** Module	:LT - SECONDARY LOAN TRADING
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
---------------------------------------------------------------------------------------------------
*/
/*---------------------------------CHANGE HISTORY-----------------------------------------------
17-JUN-2008 FLEXCUBE V.CL 7.4 RELEASE ,NEW UNIT CREATED FOR SETTLEMENT
24-DEC-2008 FLEXCUBE V.CL RELEASE 7.4 MTR1 SFR#65, Agency validations,
		system has to validate the actual settlment date with the agency dates like VAMI/LIQD, value/maturity date of a tranche.
29-dec-2008 FLEXCUBE V.CL RELEASE 7.4 MTR1 SFR#160 
20-JAN-2009 FLEXCUBE V.CL Release 7.4 ITR1 SFR#37,Added new function fn_validate_tkt_settl_dt.
26-AUG-2009 CITIUS-LS#6235, Clearpar and SLT incremental changes retro - ITR1 SFR#1, Check for paper trades, In case of paper trades, agency confirmation will not be populated and have to check for PRAM with transferor/transfree, Maneeha
26-AUG-2009 CITIUS-LS#6235, Clearpar and SLT incremental changes retro - ITR1 SFR#104, ticket settlement authorization failed, actual settl date was gng as null
									also changed the copyright clause.
09-SEP-2009  FCC V.CL Release 7.5 Lot1.2 RT SFR#32,CHK was added to overlook position chk for 
PO trades in a particular condition,so that trade settlement is allowed if 
ticket settlement failes,position error wqas blocking initially

17-Mar-2010 FLEXCUBE V.CL Release 7.6 UK SLT Changes ,Payment message at ticket level
24-May-2010 FLEXCUBE V.CL Release 7.7 SLT Handling Exceptional Cases for Subticket
13-May-2010 FLEXCUBE V.CL Release 7.6 RT1 SFR#9 , Handling Exceptional Cases
04-Apr-2011 Flexcube V.CL Release 7.9, FS Volume02 Tag07, CFPI Migration,Changes
27-NOV-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14831 the validation to check the first time investor position as 100%  during settlement is not considering the appropriate tranche
			incase of ticket has trades with multiple cusips
30-OCT-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO CITIUS#17969 Changes: System should allow to save the ticket settlement if the payment has been done and user is trying to settle the ticket beyond the payment Date
08-AUG-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag06 changes,Taking of backup for assignment fee handled here
13-OCT-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag06 Netting and Combined Settlement Trading changes

------------------------------END CHANGE HISTORY----------------------------------------------
*/
TYPE ty_ticket_detail IS TABLE OF tltbs_ticket_detail%rowtype INDEX BY BINARY_INTEGER;
p_ticket_detail ty_ticket_detail;
--08-AUG-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag06 changes starts
TYPE ty_assign_fee_tab IS  TABLE OF tltbs_contract_fee%rowtype INDEX BY BINARY_INTEGER;      
assign_fee_tab     ty_assign_fee_tab;

TYPE ty_assign_feemaster_tab IS  TABLE OF tltbs_contract_fee_master%rowtype INDEX BY BINARY_INTEGER;      
assgn_fee_master_tab     ty_assign_feemaster_tab;

--08-AUG-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag06 changes ends

TYPE t_consol_amtdue_rec IS RECORD
(
component		TLTB_AMOUNT_DUE.component%TYPE,
currency_amt_due	TLTB_AMOUNT_DUE.currency_amt_due%TYPE,
counterparty		TLTB_AMOUNT_DUE.counterparty%TYPE, --17-Mar-2010 FLEXCUBE V.CL Release 7.6 UK SLT Changes ,Payment message at ticket level
due_date		TLTB_AMOUNT_DUE.due_date%TYPE,
inflow_outflow		TLTB_AMOUNT_DUE.inflow_outflow%TYPE,
component_type		TLTB_AMOUNT_DUE.component_type%TYPE,
amount_due		TLTB_AMOUNT_DUE.amount_due%TYPE
);

TYPE l_consol_amtdue_rec IS TABLE OF t_consol_amtdue_rec INDEX BY BINARY_INTEGER;
p_outflow_rec		l_consol_amtdue_rec;
p_inflow_rec		l_consol_amtdue_rec;
----------------------------------------------------------------
--1. FUNCTION Fn_pop_settlement_master 
--************************************************************************************************
-- This FUNCTION will populate settlement master information and will be called from LTDSETTL.FMB 
-- This will be called on click of new button
-- the function will populate the data in settlement master for the first time with relavent info 
-- from the TLTB_CONTRACT_MASTER,tltbs_contract_fee_master
-- subseqnt population will be from the same table with increased esn 
--*************************************************************************************************
FUNCTION Fn_pop_settlement_master
	(
	P_contract_ref_no	IN	tltbs_contract_master.contract_ref_no%TYPE,
	P_event_seq_no		IN	oltbs_contract.latest_event_seq_no%TYPE,
	P_actl_settl_date	IN	DATE,
	P_Error_code		IN OUT	VARCHAR2,	
	P_Error_params		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
----------------------------------------------------------------
--2. FUNCTION Fn_pop_settlement_fee 
--************************************************************************************************
-- This FUNCTION will populate fee components for settlement and will be called from LTDSETTL.FMB 
-- This will be called on click of new button
-- the function will populate the data in settlement fee for the first time with relavent info 
-- from the tltbs_contract_fee_master
-- subseqnt population will be from the same table with incremented esn 

--*************************************************************************************************
FUNCTION Fn_pop_for_settlement
	(
	P_contract_ref_no	IN	tltbs_contract_master.contract_ref_no%TYPE,
	P_actl_settl_date	IN	DATE,
	P_Error_code		IN OUT	VARCHAR2,
	P_Error_params		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION Fn_pop_settlement_fee
	(
	P_contract_ref_no	IN	tltbs_contract_master.contract_ref_no%TYPE,
	p_event_seq_no		IN	oltbs_contract.latest_event_seq_no%TYPE,
	P_actl_settl_date	IN	DATE,
	P_Error_code		IN OUT	VARCHAR2,	
	P_Error_params		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;	

FUNCTION Fn_pop_settlement_amount
	(
	P_contract_ref_no	IN	tltbs_contract_master.contract_ref_no%TYPE,
	P_event_seq_no		IN	oltbs_contract.latest_event_seq_no%TYPE, --FMEM ESN
	p_rec_contract_mast	IN	tltbs_contract_master%ROWTYPE,
	P_Error_code		IN OUT	VARCHAR2,
	P_Error_params		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION Fn_save_trade_settlement
	(
	P_contract_ref_no	IN	tltbs_contract_master.contract_ref_no%TYPE,
	P_expt_settl_date	IN	DATE,
	P_actl_settl_date	IN	DATE,
	P_settlement_pickup	IN	CHAR,
	P_setl_amt_due_picked	IN	CHAR,
	P_Error_code		IN OUT	VARCHAR2,	
	P_Error_params		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION Fn_pop_agency_confirmation
	(
	P_contract_ref_no	IN	tltbs_contract_master.contract_ref_no%TYPE,
	P_Error_code		IN OUT	VARCHAR2,
	P_Error_params		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION Fn_agency_validation
	(
	P_Trade_ref_no 		IN 	tltbs_contract_master.contract_ref_no%TYPE,
	p_actual_settl_date	IN	tltbs_contract_master.actual_settl_date%TYPE,
	P_Error_code		IN OUT  VARCHAR2,      
	P_Error_params		IN OUT  VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION Fn_pop_amount_due
	(
	P_contract_ref_no	IN	tltbs_contract_master.contract_ref_no%TYPE,
	P_event_seq_no		IN	oltbs_contract.latest_event_seq_no%TYPE,
	p_rec_contract_mast	IN	tltbs_contract_master%ROWTYPE,
	p_actual_settl_date	IN	tltbs_settlement_master.actual_settl_date%TYPE,	
	P_Error_code		IN OUT	VARCHAR2,
	P_Error_params		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION Fn_add_amount_due_details
	(
	P_contract_ref_no 	IN 		oltbs_contract.contract_ref_no%TYPE,
	P_event_seq_no 		IN 		oltbs_contract.latest_event_seq_no%TYPE,
	p_Effective_Date 	IN 		DATE,
	p_rec_contract_mast	IN		tltbs_contract_master%ROWTYPE,
	P_Error_code		IN 	OUT	VARCHAR2		,
	P_ticket_id		IN		tltbs_ticket_master.ticket_id%type default 'NULL'
	)
RETURN BOOLEAN; 

FUNCTION Fn_process
	(
	P_contract_Ref_No	IN	tltbs_contract_master.Contract_Ref_No%TYPE,
	P_process_code		IN	oltbs_contract_event_log.event_code%TYPE,
	P_Trantype		IN	oltms_trn_type.trn_type%TYPE,
	P_Error_Code		IN OUT	VARCHAR2,
	P_Error_Params		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_reverse_tstl
	(
	P_contract_Ref_No	IN	tltbs_contract_master.Contract_Ref_No%TYPE,
	p_contract_rec		IN	oltbs_contract%ROWTYPE,
	P_Trantype		IN	oltms_trn_type.trn_type%TYPE,
	P_process_code		IN	oltbs_contract_event_log.event_code%TYPE,
	P_Error_Code		IN OUT	VARCHAR2,
	P_Error_Params		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION Fn_pop_ticket_detail
	(
	P_ticket_id 	IN 	tltbs_contract_master.ticket_id%TYPE,
	P_Error_Code	IN OUT	VARCHAR2,
	P_Error_Params	IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION Fn_pop_ticket_fee
	(
	P_ticket_id 		IN 	tltbs_contract_master.ticket_id%TYPE,
	P_actual_settl_date	IN	DATE,
	p_error_code		IN OUT 	VARCHAR2,
	p_error_params		IN OUT 	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION Fn_pop_ticket_ssi_mnemonic
	(
	P_ticket_id 		IN 	tltbs_contract_master.ticket_id%TYPE,
	P_ticket_ref_no		IN 	tltbs_ticket_master.ticket_ref_no%TYPE,
	p_error_code		IN OUT 	VARCHAR2,
	p_error_params		IN OUT 	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION Fn_delete_ticket_details
	(
	p_ticket_ref_no		IN	tltbs_ticket_master.ticket_ref_no%type,
	p_ticket_id		IN	tltbs_ticket_master.ticket_id%type,
	p_error_code		IN OUT 	VARCHAR2,
	p_error_params		IN OUT 	VARCHAR2	
	)
RETURN BOOLEAN;

FUNCTION Fn_pop_ticket_contract
	(
	P_ticket_ref_no		IN 	tltbs_ticket_master.ticket_ref_no%TYPE,
	p_error_code		IN OUT 	VARCHAR2,
	p_error_params		IN OUT 	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_pop_consol_amount_due
	(
	p_ticket_id		IN 	tltbs_contract_master.ticket_id%TYPE,
	p_ticket_ref_no		IN 	tltbs_ticket_master.ticket_ref_no%TYPE,
	p_error_code		IN OUT 	VARCHAR2,
	p_error_params		IN OUT 	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION Fn_tstl_referral
	(	
	P_contract_ref_no 	IN 	oltbs_contract.contract_ref_no%TYPE,
	P_event_seq_no 		IN 	oltbs_contract.latest_event_seq_no%TYPE,
	p_event			IN	VARCHAR2,
	p_rec_contract_mast	IN	tltbs_contract_master%ROWTYPE,
	p_rec_setl_mast		IN	tltbs_settlement_master%ROWTYPE,
	p_amount_tag_list	IN OUT	VARCHAR2,
	p_ccy_list		IN OUT	VARCHAR2,
	p_amount_list		IN OUT	VARCHAR2,
	P_Error_code		IN OUT	VARCHAR2,
	P_Error_params		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_obtain_ticket_lock
	(
	p_ticket_id		IN      tltbs_contract_master.ticket_id%TYPE
	,p_error_code		IN OUT  VARCHAR2
	,p_error_params		IN OUT  VARCHAR2
	)
RETURN BOOLEAN;


FUNCTION Fn_batch_trade_settlement
	(
	p_branch    IN oltms_branch.branch_code%TYPE,
	p_mod       IN oltms_product.module%TYPE,
	p_proc_date IN DATE,
	p_prod      IN oltms_product.product_code%TYPE,
	p_com_freq  IN NUMBER,
	p_err_code  IN OUT VARCHAR2,
	p_err_param IN OUT VARCHAR2
	)
RETURN BOOLEAN ;

FUNCTION FN_POST_INTERNAL_DEAL_ENTRIES
	(
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	p_contract_rec		IN	TLTB_CONTRACT_MASTER%ROWTYPE,
	p_Error_code		IN OUT	VARCHAR2,
	p_Error_params		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION FN_POP_INTERNAL_DEAL_SETTL_AMT
	(
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	p_event_seq_no	 	IN	oltbs_contract.latest_event_seq_no%TYPE,
	p_contract_rec		IN	tltbs_contract_master%ROWTYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_params		IN OUT	VARCHAR2
	)
RETURN BOOLEAN ;

--FLEXCUBE V.CL RELEASE 7.4 MTR1 SFR#65, Agency validations starts
FUNCTION fn_validate_settl_date
	(
	p_contract_ref_no	IN	tltbs_contract_master.contract_ref_no%type,
	p_actual_settl_date	IN	tltbs_settlement_master.actual_settl_date%type,
	p_error_code		IN OUT	VARCHAR2,
	p_error_params		IN OUT	VARCHAR2
	,p_process_code	IN	OLTB_CONTRACT_CONTROL.process_code%TYPE DEFAULT NULL --30-OCT-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO CITIUS#17969 Changes here
	)
RETURN BOOLEAN;
--FLEXCUBE V.CL RELEASE 7.4 MTR1 SFR#65, Agency validations ends
--FLEXCUBE V.CL RELEASE 7.4 MTR1 SFR#160 starts
FUNCTION fn_add_tkt_amt_due_detail
	(
	 p_ticket_id	 in	tltbs_ticket_master.ticket_id%type,
	 p_ticket_ref_no in	tltbs_ticket_master.ticket_ref_no%type,	
	 p_err_code	 in	varchar2,	
	 p_err_param	 in	varchar2
	)
RETURN BOOLEAN;
--FLEXCUBE V.CL RELEASE 7.4 MTR1 SFR#160 ends

--20-JAN-2009 FLEXCUBE V.CL Release 7.4 ITR1 SFR#37,Strat
FUNCTION fn_validate_tkt_settl_dt
	(
	P_ticket_id		IN	tltbs_ticket_master.ticket_id%TYPE,
	p_actual_settl_date	IN	tltbs_settlement_master.actual_settl_date%TYPE,
	p_err_code		IN OUT	VARCHAR2,
	p_err_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--20-JAN-2009 FLEXCUBE V.CL Release 7.4 ITR1 SFR#37,End

--26-AUG-2009 CITIUS-LS#6235, Clearpar and SLT incremental changes retro - ITR1 SFR#1, changes starts here
FUNCTION fn_check_paper_trades
	(
	P_ticket_id		IN	tltbs_ticket_master.ticket_id%TYPE,
	p_process_ref_no	IN	tltbs_contract_master.contract_ref_no%TYPE,
	p_agency_ref_no		IN	oltbs_contract.contract_ref_no%TYPE DEFAULT NULL,
	p_lt_event_code		IN	oltbs_contract_event_log.event_code%TYPE DEFAULT NULL,
	p_actual_settl_date	IN	tltbs_settlement_master.actual_settl_date%TYPE,--26-AUG-2009 CITIUS-LS#6235, Clearpar and SLT incremental changes retro - ITR1 SFR#104
	p_err_code		IN OUT	VARCHAR2,
	p_err_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--26-AUG-2009 CITIUS-LS#6235, Clearpar and SLT incremental changes retro - ITR1 SFR#1, changes ends here

--FCC V.CL Release 7.5 Lot1.2 RT SFR#32 STARTS
FUNCTION FN_POS_CHK_REQ
	(p_cont_master_rec	IN	TLTB_CONTRACT_MASTER%rowtype
	)
RETURN VARCHAR2 ;
---FCC V.CL Release 7.5 Lot1.2 RT SFR#32 ENDS

--24-May-2010 FLEXCUBE V.CL Release 7.7 SLT Handling Exceptional Cases for Subticket start
Function fn_pmsg_generated
(
p_trade_ref_no	  IN  OLTB_CONTRACT.contract_ref_no%TYPE,
p_pmsg_generated  OUT NUMBER
)
RETURN BOOLEAN;

FUnction fn_repopulate_subticket
(
p_trade_ref_no   	IN	oltbs_contract.contract_ref_no%TYPE,
p_err_code		IN OUT	VARCHAR2,
p_err_param		IN OUT	VARCHAR2
)
RETURN BOOLEAN;
--24-May-2010 FLEXCUBE V.CL Release 7.7 SLT Handling Exceptional Cases for Subticket end

-- 04-Apr-2011 Flexcube V.CL Release 7.9, FS Volume02 Tag07, CFPI Migration,Changes to reverse entries start<
FUNCTION fn_reverse_trdt_entry
			(
			p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
			p_event_seq_no		IN	OLTB_CONTRACT_EVENT_LOG.event_seq_no%TYPE,
			p_event_date		IN	DATE,
			p_error_code        	IN  OUT  VARCHAR2,
      			p_error_param      	IN  OUT  VARCHAR2
			)
RETURN BOOLEAN;
-- 04-Apr-2011 Flexcube V.CL Release 7.9, FS Volume02 Tag07, CFPI Migration,Changes to reverse entries end>
--27-NOV-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14831 changes Starts
Function Fn_validate_ftb_position
	(
	p_ticket_id 		IN tltbs_contract_master.ticket_id%type,
	p_ftb_position		IN OUT 	VARCHAR2,
	p_error_code		IN OUT  VARCHAR2,
      	p_error_param		IN OUT  VARCHAR2,
	p_contract_ref_no	IN  tltbs_contract_master.contract_ref_no%type DEFAULT NULL
	) 	
Return Boolean;
--27-NOV-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14831 changes ends

--13-OCT-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag06 Netting and Combined Settlement Trading changes start
FUNCTION fn_Pop_consol_tkt_amount_due
	(
	p_payment_ref_no		IN 			tltbs_consol_payment_detail.payment_ref_no%TYPE,
	p_error_code				IN OUT 	VARCHAR2,
	p_error_params			IN OUT 	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION Fn_delete_consol_tkt_details
	(
	p_consol_ticket_ref_no	IN			tltbs_consol_ticket_master.consol_ticket_ref_no%TYPE,
	p_error_code					IN OUT	VARCHAR2,
	p_error_params				IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--13-OCT-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag06 Netting and Combined Settlement Trading changes end

END tlpks_settlements;
/
CREATE or replace SYNONYM tlpkss_settlements FOR tlpks_settlements
/