CREATE OR REPLACE PACKAGE tlpks_swap
AS
/*
----------------------------------------------------------------------------------------------------
**
** File Name	: tlpks_swap.SPC
**
** Module		: LT - SECONDARY LOAN TRADING
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
15-06-2008 FLEXCUBE V.CL Release 7.4 - New object created for TRS trade processing
27-DEC-2008 FLEXCUBE V.CL Release 7.4 MTR1 SFR#144
	Modified fn_process_accrual - Added P_swap_rec as in parameter.
*/


Function fn_process_swap
(
p_Ext_Contract_Ref_No		IN	Varchar2,
p_Source_Code			IN	Varchar2,
p_branch				IN	Varchar2,
p_version_no			IN	Varchar2,
p_err_code				OUT	Varchar2,
p_err_param				OUT	Varchar2
)
RETURN BOOLEAN;
---KUNAL STARTS
TYPE p_swap_record IS RECORD
(
contract_ref_no		TLTB_SWAP.contract_ref_no%TYPE,
Swap_Id			TLTB_SWAP.Swap_Id%TYPE,
Version_No		TLTB_SWAP.Version_No%TYPE,
Swap_Counterparty	TLTB_SWAP.Swap_Counterparty%TYPE,
Swap_Amount		TLTB_SWAP.Swap_Amount%TYPE,
Swap_ref_no		TLTB_SWAP.Swap_ref_no%TYPE,
swap_ratio		number,
Oasys_Id		TLTB_SWAP.Oasys_Id%TYPE
);
TYPE tbl_swap_record is table of p_swap_record index by binary_integer;

            
Function fn_get_swap_records
(
p_contract_ref_no		IN	TLTB_SWAP.contract_ref_no%TYPE,
p_swap_rec			OUT	tlpks_swap.tbl_swap_record,
p_err_code			IN OUT	Varchar2,
p_err_param			IN OUT	Varchar2
)
RETURN BOOLEAN;

Function fn_pop_swap_setl_amt
(
p_contract_ref_no		IN	TLTB_SWAP.contract_ref_no%TYPE,
p_swap_rec			IN	tlpks_swap.tbl_swap_record,
P_event_seq_no			IN	NUMBER,
p_err_code			IN OUT	Varchar2,
p_err_param			IN OUT	Varchar2
)
RETURN BOOLEAN;

Function fn_pop_swap_amt_due
(
p_contract_ref_no		IN	TLTB_SWAP.contract_ref_no%TYPE,
p_swap_rec			IN	tlpks_swap.tbl_swap_record,
p_component			IN	VARCHAR2,
P_actual_setl_date		IN	DATE,
p_err_code			IN OUT	Varchar2,
p_err_param			IN OUT	Varchar2
)
RETURN BOOLEAN;
----------------------------------------------------------------------------------------------------
Function fn_process_accrual
(
p_cstb_contract_rec	IN	oltbs_contract%ROWTYPE,
P_component		IN	tltbs_contract_fee.component%TYPE,
p_processing_date	IN	DATE,
p_handoff_action_code	IN	VARCHAR2,
P_amt_tag_list		IN	VARCHAR2,
P_ccy_list		IN	VARCHAR2,
P_amt_list		IN	VARCHAR2,
P_swap_rec		IN	tlpks_swap.tbl_swap_record,--27-DEC-2008 FLEXCUBE V.CL Release 7.4 MTR1 SFR#144
P_Error_Code		IN OUT	Ertbs_Msgs.Err_Code%TYPE,
P_Error_Param		IN OUT	VARCHAR2
)
RETURN BOOLEAN;
----------------------------------------------------------------------------------------------------
FUNCTION Fn_Process_swap_liqd
(
P_Contract_Ref_No	IN	oltbs_contract.Contract_Ref_No%TYPE,
P_event_seq_no		IN	oltbs_contract.Latest_event_seq_no%TYPE,
P_event			IN	VARCHAR2,
P_component_list	IN	VARCHAR2,
P_processing_date	IN	DATE,
P_reversal_ESN		IN	oltbs_contract.Latest_event_seq_no%TYPE,
P_Error_Code		IN OUT	Ertbs_Msgs.Err_Code%TYPE,
P_Error_Param		IN OUT	VARCHAR2
)
RETURN BOOLEAN;
----------------------------------------------------------------------------------------------------
FUNCTION fn_populate_events
(
p_ext_contract_ref_no   IN oltbs_contract.contract_ref_no%TYPE,
p_swap_ref_no		IN oltbs_contract.contract_ref_no%TYPE,
p_swap_id			IN tltbs_upload_swap.swap_id%TYPE,
p_event_code		IN oltbs_contract.curr_event_code%TYPE,
p_swap_amount		IN tltbs_upload_swap.amount%TYPE,
p_tcnc_check		IN VARCHAR2,
p_version_no		IN oltbs_contract.latest_version_no%TYPE,
p_seq_no			IN OUT NUMBER,
p_err_code			IN OUT VARCHAR2,
p_err_params		IN OUT VARCHAR2
)
RETURN BOOLEAN;

FUNCTION fn_process_events
(
p_ext_contract_ref_no	IN  	tltbs_upload_master.ext_contract_ref_no%type,
p_branch			IN	tltbs_upload_master.branch%type,
p_version_no		IN	tltbs_upload_master.version_no%type,
p_error_code		OUT	VARCHAR2,
p_error_param		OUT	VARCHAR2
)
RETURN BOOLEAN ;

FUNCTION fn_swap_validation
(
p_ext_contract_ref_no	IN 	tltbs_upload_master.ext_contract_ref_no%type,
p_branch			IN	tltbs_upload_master.branch%type,
p_source_code		IN	tltbs_upload_master.source_code%type,
p_version_no		IN	tltbs_upload_master.version_no%type,
p_action_code		IN	tltbs_upload_master.ext_action_code%type,
p_trade_amount		IN	tltbs_upload_master.trade_amount%type,
p_valid			OUT	boolean,
p_error_code		OUT	ertbs_msgs.err_code%type,
p_error_param		OUT   ertbs_msgs.message%type
)
RETURN BOOLEAN;
-----------------------------------------------------------------------------------------------------

END tlpks_swap;
/
CREATE OR REPLACE SYNONYM tlpkss_swap FOR tlpks_swap
/