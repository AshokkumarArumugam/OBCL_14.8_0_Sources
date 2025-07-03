CREATE OR REPLACE PACKAGE olpks_sett_addon
AS

/*----------------------------------------------------------------------------------------------------
**
** File Name    : olpks_sett_addon.SPC
**
** Module       : SETTLEMENT INSTRUCTIONS
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
/*-------------------------------------CHANGE HISTORY-----------------------------------------------
14-JUL-2003 FCC4.3 AUG 2003 A/c netting changes
	-- Added a new FUNCTION fn_update_msg_nettable
04-AUG-2005 FCC 4.6.2 CITILS Netting changes
1-SEP-2005	FCC 4.6.2 COPY RIGHT changes
09-APR-2008 FLEXCUBE V.CL Release 7.4 BAU, EMAIL FUNCTIONALITY
05-DEC-2008 CITIUS-LS#SRT1451 FCC4.0 CITIPLC PLC40100085 
----------------------------------------------------------------------------------------------------
*/
FUNCTION fn_update_party
	(
	  p_cont_ref_no 			IN VARCHAR2
	, p_event_seq_no 			IN NUMBER
	, p_amount_tags 			IN VARCHAR2
	, p_rcvr_list 			IN VARCHAR2
	, p_rcvr_of_cover_list 		IN VARCHAR2
	, p_by_order_list 		IN VARCHAR2
	, p_ult_ben_list 			IN VARCHAR2
	, p_payment_details_list	IN VARCHAR2
	, p_sndr_to_rcvr_info_list 	IN VARCHAR2
	, p_int_reim_inst_list 		IN VARCHAR2
	, p_rcvr_corresp_list 		IN VARCHAR2
	, p_intermediary_list 		IN VARCHAR2
	, p_acc_with_instn_list		IN VARCHAR2
	, p_ordering_inst_list 		IN VARCHAR2
	, p_beneficiary_inst_list 	IN VARCHAR2
	, p_error_code 			OUT VARCHAR2
	) RETURN BOOLEAN;

FUNCTION fn_lookup
	(
	  p_cont_ref_no 		IN VARCHAR2
    	, p_tag_list 		IN OUT VARCHAR2
    	, p_tag_ccy_list 		IN OUT VARCHAR2
	, p_pay_receive_list	IN OUT VARCHAR2
	, p_ac_branch_list 	IN OUT VARCHAR2
    	, p_account_list 		IN OUT VARCHAR2
	, p_acc_ccy_list 		IN OUT VARCHAR2
    	, p_ex_rate_list 		IN OUT VARCHAR2
	, p_error_code 		IN OUT VARCHAR2
	 )
	RETURN BOOLEAN;

FUNCTION fn_lookup_for_esn
	(
 	  p_cont_ref_no 			IN 	 VARCHAR2
	, p_esn				IN 	 oltbs_settlements.event_seq_no%TYPE
	, p_tag_list 			IN OUT VARCHAR2
	, p_tag_ccy_list 			IN OUT VARCHAR2
	, p_pay_receive_list 		IN OUT VARCHAR2
	, p_ac_branch_list 		IN OUT VARCHAR2
	, p_account_list 			IN OUT VARCHAR2
	, p_acc_ccy_list 			IN OUT VARCHAR2
	, p_ex_rate_list 			IN OUT VARCHAR2
	, p_settl_amt_list		IN OUT VARCHAR2
	, p_val_dt_list			IN OUT VARCHAR2
	, p_payment_by_list 		IN OUT VARCHAR2
	, p_transfer_type_list		IN OUT VARCHAR2
	, p_instr_type_list		IN OUT VARCHAR2
	, p_instr_no_list			IN OUT VARCHAR2
	, p_cover_reqd_list		IN OUT VARCHAR2
	, p_charges_details_list	IN OUT VARCHAR2
	, p_our_corresp_list		IN OUT VARCHAR2
	, p_receiver_list			IN OUT VARCHAR2
	, p_int_reim_inst_list		IN OUT VARCHAR2
	, p_rcvr_corresp_list		IN OUT VARCHAR2
	, p_intermediary_list		IN OUT VARCHAR2
	, p_acc_with_instn_list		IN OUT VARCHAR2
	, p_pay_details_list		IN OUT VARCHAR2
	, p_sndr_to_rcvr_list		IN OUT VARCHAR2
	, p_ordering_inst_list		IN OUT VARCHAR2
	, p_ordering_cust_list		IN OUT VARCHAR2
	, p_benef_inst_list		IN OUT VARCHAR2
	, p_ult_benef_list		IN OUT VARCHAR2
	, p_error_code 			IN OUT VARCHAR2
	  ) RETURN BOOLEAN;

FUNCTION fn_swift_field_valdn
 	(
 p_branch VARCHAR2 := '*',
	p_product			VARCHAR2	:= '*',
	p_msg_type			VARCHAR2,
	p_field			VARCHAR2,
	p_ref				VARCHAR2,
	p_ref_type			VARCHAR2,
	p_sndr1			VARCHAR2,
	p_sndr2			VARCHAR2,
	p_sndr3			VARCHAR2,
	p_sndr4			VARCHAR2,
	p_sndr5			VARCHAR2,
	p_sndr6			VARCHAR2,
	p_rtgs		OUT	VARCHAR2,
	p_err_code		OUT	VARCHAR2,
	p_err_param		OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_swift_field_valdn
 	(
 p_branch VARCHAR2 := '*',
	p_product			VARCHAR2	:= '*',
	p_msg_type			VARCHAR2,
	p_field			VARCHAR2,
	p_ref				VARCHAR2,
	p_ref_type			VARCHAR2,
	p_sndr1			VARCHAR2,
	p_sndr2			VARCHAR2,
	p_sndr3			VARCHAR2,
	p_sndr4			VARCHAR2,
	p_sndr5			VARCHAR2,
	p_sndr6			VARCHAR2,
	p_err_code		OUT	VARCHAR2,
	p_err_param		OUT	VARCHAR2
	)
RETURN BOOLEAN;

--
--FCC4.3 AUG 2003 A/c netting changes start
--
FUNCTION fn_update_msg_nettable
	(
	p_module		   IN 	oltbs_contract.module_code%TYPE,
	p_contract_ref_no	   IN 	oltbs_contract.contract_ref_no%TYPE,
	p_event_seq_no   	   IN		oltbs_contract.latest_event_seq_no%TYPE,
	p_error_code	   IN OUT	VARCHAR2
	)

RETURN BOOLEAN;
--
--FCC4.3 AUG 2003 A/c netting changes END
--

--FCC4.3 AUG 2003 FX changes start
FUNCTION fn_update_gen_flags_for_cls
	(
	p_contract_ref_no	   IN 		oltbs_contract.contract_ref_no%TYPE,
	p_event_seq_no   	   IN		oltbs_contract.latest_event_seq_no%TYPE,
	p_error_code	   	   IN OUT	VARCHAR2,
	p_error_parameter	   IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--FCC4.3 AUG 2003 FX changes end

--FCC 4.6.2 CITILS 04-AUG-2005 Netting changes
FUNCTION FN_UPDATE_GEN_MESSAGE( p_contract_ref_no oltbs_settlements.contract_ref_no%TYPE,
	   	  		p_event_seq_no     oltbs_settlements.event_seq_no%TYPE,
				p_amt_tags		 varchar2,
				p_gen_message	 oltbs_settlements.gen_message%TYPE)
RETURN BOOLEAN;
--FCC 4.6.2 CITILS 04-AUG-2005 Netting changes
--09-APR-2008 FLEXCUBE V.CL Release 7.4 BAU, EMAIL FUNCTIONALITY starts
FUNCTION fn_message_ssi
(
 p_reference_no IN  oltbs_dly_msg_out.reference_no%type,
 p_currency IN OLTM_INSTR.currency%type,
 p_counterparty IN OLTM_INSTR.counterparty%type,
 p_err_code IN OUT varchar2,
 p_err_param IN OUT varchar2
)
RETURN BOOLEAN;
FUNCTION fn_ssi_amend_adv  
		(
		p_dly_out IN oltbs_dly_msg_out%ROWTYPE,
		p_err_code OUT varchar2,
   	        p_err_param OUT varchar2
		)
RETURN BOOLEAN;
--09-APR-2008 FLEXCUBE V.CL Release 7.4 BAU, EMAIL FUNCTIONALITY END

--CITIUS-LS#SRT1451 Starts
--FCC4.0 CITIPLC PLC40100085 Start
FUNCTION fn_update_party (
	p_cont_ref_no IN VARCHAR2
	, p_event_seq_no IN NUMBER
	, p_amount_tags IN VARCHAR2
	, p_rcvr_list IN VARCHAR2
	, p_rcvr_of_cover_list IN VARCHAR2
	, p_by_order_list IN VARCHAR2
	, p_ult_ben_list IN VARCHAR2
	, p_payment_details_list IN VARCHAR2
	, p_sndr_to_rcvr_info_list IN VARCHAR2
	, p_int_reim_inst_list IN VARCHAR2
	, p_rcvr_corresp_list IN VARCHAR2
	, p_intermediary_list IN VARCHAR2
	, p_acc_with_instn_list IN VARCHAR2
	, p_ordering_inst_list IN VARCHAR2
	, p_beneficiary_inst_list IN VARCHAR2
	, p_rtgs_list IN VARCHAR2
	, p_error_code OUT VARCHAR2
	) RETURN BOOLEAN;
--FCC4.0 CITIPLC PLC40100085 Ends
--CITIUS-LS#SRT1451 Ends

END olpks_sett_addon;
/
CREATE or replace SYNONYM olpkss_addon FOR olpks_sett_addon
/