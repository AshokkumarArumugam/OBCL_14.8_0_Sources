CREATE OR REPLACE PACKAGE tlpks_fmem_conv IS
/*----------------------------------------------------------------------------------------------------
**
** File Name	:tlpks_fmem_conv.SPC
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
----------------------------------------------------------------------------------------------------
*/

/*----------------------------------CHANGE HISTORY----------------------------------

25-JUN-2008 FLEXCUBE V.CL 7.4 Release, this package is created newly to handle the population of funding memo, Maneeha

---------------------------------------------------------------------------------------------------
*/



FUNCTION Fn_pop_fmem_details
	(
	P_contract_ref_no	IN	tltbs_contract_master.contract_ref_no%TYPE,
	p_event_seq_no		IN	tltbs_contract_master.event_seq_no%TYPE,
	p_trade_date		IN	tltbs_contract_master.trade_date%TYPE,
	p_fmem_repickup_reqd	IN	tltbs_settlement_master.fmem_repickup_reqd%TYPE,
	p_actual_settl_date	IN	tltbs_settlement_master.actual_settl_date%TYPE,
	P_Error_code		IN OUT	VARCHAR2,
	P_Error_params		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_copy_fmem
	(
	p_contract_ref_no	IN	tltbs_contract_master.contract_ref_no%TYPE,
	p_event_seq_no		IN	tltbs_contract_master.event_seq_no%TYPE,
	p_Error_code		IN OUT	VARCHAR2,
	p_Error_params		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

Function Fn_pop_price_interest_Details
	(
	P_contract_ref_no	IN	tltbs_contract_master.contract_ref_no%TYPE,
	p_event_seq_no		IN	tltbs_contract_master.event_seq_no%TYPE,
	p_Agency_ref_no		IN	oltbs_contract_master.contract_reF_no%TYPE,
	p_transfer_percentage	IN	NUMBER,
	p_trade_date		IN	tltbs_contract_master.trade_date%TYPE,
	p_actual_settl_date	IN	tltbs_settlement_master.actual_settl_date%TYPE,
	p_trade_funded_amt	IN OUT	tltbs_fmem_price_detail.buyer_dd_amt%TYPE,
	P_Error_code		IN OUT	VARCHAR2,
	P_Error_params		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_pop_fee_details
(
P_contract_Ref_No	IN	tltbs_contract_master.Contract_Ref_No%TYPE,
P_event_seq_no		IN	tltbs_contract_master.event_seq_no%TYPE,
P_Error_Code		IN OUT	VARCHAR2,
P_Error_Params		IN OUT	VARCHAR2
)
RETURN BOOLEAN;

FUNCTION fn_pop_ccy_settle_details
(
p_contract_ref_no	IN	tltbs_contract_master.contract_ref_no%type,
p_event_seq_no		IN	tltbs_settlement_master.event_seq_no%type,
p_error_code		IN OUT	VARCHAR2,
p_error_params		IN OUT	VARCHAR2
)
RETURN BOOLEAN;

FUNCTION fn_reverse_fmem
(
P_contract_Ref_No	IN	tltbs_contract_master.Contract_Ref_No%TYPE,
p_contract_rec		IN	oltbs_contract%ROWTYPE,
P_Error_Code		IN OUT	VARCHAR2,
P_Error_Params		IN OUT	VARCHAR2
)
RETURN BOOLEAN;

FUNCTION Fn_delete_fmem_details
	(
	p_contract_ref_no	IN	tltbs_contract_master.contract_ref_no%TYPE,
	p_event_seq_no		IN	tltbs_contract_master.event_seq_no%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_params		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

END tlpks_fmem_conv;
/
CREATE or replace SYNONYM tlpkss_fmem_conv FOR tlpks_fmem_conv
/