CREATE OR REPLACE PACKAGE lbpks_skim
IS
/*----------------------------------------------------------------------------------------------------
**
** 	File Name	: lbpks_skim.SPC
**
** 	Module	: LS
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
/*---------------------------CHANGE_HISTORY---------------------------------------------------------
13-JAN-2006	 Flexcube V CL Release 7.0 "SKIM" Related New Package Specification added by Sachin
----------------------------------------------------------------------------------------------
*/



FUNCTION fn_dd_skim_pickup(p_tr_contract_ref_no IN oltbs_contract.CONTRACT_REF_NO%TYPE,
			p_dr_contract_ref_no 	IN oltbs_contract.CONTRACT_REF_NO%TYPE,
			p_version_no 		IN oltbs_contract_master.VERSION_NO%TYPE,
			p_event_seq_no 		IN oltbs_contract_master.EVENT_SEQ_NO%TYPE,
			p_value_date 		IN DATE,
			P_err_code 		IN OUT VARCHAR2,
			p_errparams 		IN OUT VARCHAR2) 

RETURN BOOLEAN;
--commented by sachin
/*FUNCTION fn_tr_skim_pickup(p_contract_ref_no 	IN oltbs_contract.CONTRACT_REF_NO%TYPE,
			p_version_no 		IN oltbs_contract_master.VERSION_NO%TYPE,
			P_err_code 		IN OUT VARCHAR2,
			p_errparams 		IN OUT VARCHAR2) 

RETURN BOOLEAN;*/
--commented by sachin

FUNCTION fn_skim_delete(p_contract_ref_no IN oltbs_contract.CONTRACT_REF_NO%TYPE,
		   	p_esn 		IN oltbs_contract_master.EVENT_SEQ_NO%TYPE,
		   	P_err_code 	IN OUT VARCHAR2,
	  	   	p_errparams	IN OUT VARCHAR2) 
		   
RETURN BOOLEAN;

FUNCTION fn_update_interest_master(p_dd_ref_no IN oltbs_contract.CONTRACT_REF_NO%TYPE,
				   p_effective_date     IN Date
				  )
RETURN BOOLEAN;

/*FUNCTION fn_update_propagation_master(p_borr_dr_cont_reF_no in oltbs_contract.contract_ref_no%type)
RETURN BOOLEAN;*/


FUNCTION fn_pass_acct_skim
	(
	pm_contract_ref_no	IN 	oltbs_contract_master.CONTRACT_REF_NO%type,
	pm_even_code		IN	oltbs_contract_event_log.EVENT_CODE%TYPE,
	pm_esn			IN 	oltbs_contract.LATEST_EVENT_SEQ_NO%TYPE,
	pm_value_Date  		IN	Date,
	pm_list_of_amount_tags	IN OUT	VARCHAR2,
	pm_list_of_amount_ccys	IN OUT	VARCHAR2,
	pm_list_of_amounts	IN OUT	VARCHAR2,
	pm_list_of_branches	IN OUT	VARCHAR2,
	pm_list_of_accounts	IN OUT	VARCHAR2,
	pm_list_of_sett_ccys	IN OUT	VARCHAR2,
	pm_list_of_sett_amounts	IN OUT	VARCHAR2,
	pm_list_of_sett_rates   IN OUT  VARCHAR2,
	pm_list_of_lcy_rates	IN OUT	VARCHAR2,
	pm_list_of_lcy_equivs	IN OUT	VARCHAR2,
	pm_list_of_related_fcys	IN OUT	VARCHAR2,
	pm_list_of_withhold_inds	IN OUT	VARCHAR2,
	pm_err_code		IN OUT	ERTBS_MSGS.ERR_CODE%TYPE,
	pm_params		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
	
FUNCTION fn_get_skim_tag
	(
	pm_contract_ref_no	IN 	oltbs_contract_master.CONTRACT_REF_NO%TYPE,
	pm_even_code		IN	oltbs_contract_event_log.EVENT_CODE%TYPE,
	pm_esn			IN 	oltbs_contract.LATEST_EVENT_SEQ_NO%TYPE,
	pm_value_Date   	IN	Date,
	p_list_of_amount_Tags 	IN	VARCHAR2,
	p_list_of_amounts 	IN	VARCHAR2,
	pm_list_of_amount_tags	OUT	VARCHAR2,
	pm_list_of_amount_ccys	OUT	VARCHAR2,
	pm_list_of_amounts	OUT	VARCHAR2,
	pm_err_code		IN OUT	ERTBS_MSGS.ERR_CODE%TYPE,
	pm_params		IN OUT	VARCHAR2
	) 
RETURN BOOLEAN;

FUNCTION fn_skim_lookup(
	pm_contract_ref_no	IN 	oltbs_contract_master.CONTRACT_REF_NO%TYPE,
	pm_even_code		IN	oltbs_contract_event_log.EVENT_CODE%TYPE,
	pm_esn			IN 	oltbs_contract.LATEST_EVENT_SEQ_NO%TYPE,
	pm_value_Date   	IN	DATE,
  	PTrnType		IN	oltms_prod_trn_type.TRN_TYPE%TYPE,
  	pStatus    		IN  	VARCHAR2,
	plookup   		IN OUT	olpkss_accounting.TBL_LOOKUP,
	pm_err_code		IN OUT	ERTBS_MSGS.ERR_CODE%TYPE,
	pm_params		IN OUT	VARCHAR2
	)
RETURN BOOLEAN ;


FUNCTION fn_populate_skim(
	p_borr_dr_contract_ref_no 	IN oltbs_contract.CONTRACT_REF_NO%TYPE,
	p_part_dr_contract_ref_no 	IN oltbs_contract.CONTRACT_REF_NO%TYPE,
	p_participant 			IN oltms_customer.CUSTOMER_NO%TYPE,
	p_esn				IN oltbs_contract.LATEST_EVENT_SEQ_NO%TYPE,
	p_err_code 			IN OUT VARCHAR2,
	p_err_params 			IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_propagate_receiver_skim(
	p_part_dr_contract_ref_no	IN oltbs_contract.CONTRACT_REF_NO%TYPE,
	p_component			IN oltbs_amount_due_cs.COMPONENT%TYPE,
	p_date				IN DATE,
	p_err_code 			IN OUT VARCHAR2,
	p_err_params 			IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_populate_amount_due(p_borr_dr_cont_ref_no IN oltbs_contract.CONTRACT_REF_NO%TYPE,
				p_part_dr_cont_ref_no IN oltbs_contract.CONTRACT_REF_NO%TYPE,
				p_participant 	      IN oltms_customer.CUSTOMER_NO%TYPE,
				p_skim_component      IN lftms_product_iccf.COMPONENT%TYPE,
				p_payer_component     IN lftms_product_iccf.COMPONENT%TYPE,
				p_date		      IN DATE,
				p_err_code	      IN OUT VARCHAR2, 	
                                p_err_params	      IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_propagate_skim_schedules(
	p_borr_dr_contract_ref_no 	IN oltbs_contract.CONTRACT_REF_NO%TYPE,
	p_part_dr_contract_ref_no 	IN oltbs_contract.CONTRACT_REF_NO%TYPE,
	p_participant 			IN oltms_customer.CUSTOMER_NO%TYPE,
	p_component 			IN lftms_product_iccf.COMPONENT%TYPE,
	p_date				IN DATE,
	p_err_code 			IN OUT VARCHAR2,
	p_err_params 			IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_copy_skim(	p_new_contract_ref_no 	IN oltbs_contract.CONTRACT_REF_NO%TYPE,
		     	p_old_contract_ref_no 	IN oltbs_contract.CONTRACT_REF_NO%TYPE,
		     	p_version_no 		IN oltbs_contract.LATEST_VERSION_NO%TYPE,
			p_err_code 		IN OUT VARCHAR2,
			p_err_param 		IN OUT VARCHAR2)
RETURN BOOLEAN;

TYPE rec_lookup IS RECORD
	( contractrefno			oltbs_contract.CONTRACT_REF_NO%TYPE,
	  component 			oltbs_amount_due_cs.COMPONENT%TYPE,
	  amount 				oltbs_amount_due_cs.AMOUNT_DUE%TYPE,
	  due_date  			oltbs_amount_due_cs.DUE_DATE%TYPE,
	  currency  			CYTMS_CCY_DEFN.CCY_CODE%TYPE,
	  inout				oltbs_amount_due_cs.INFLOW_OUTFLOW%TYPE,
	  paid_date				oltbs_amount_paid.PAID_DATE%TYPE,
	  CURRENCY_SETTLED		oltbs_amount_paid.CURRENCY_SETTLED%TYPE,
	  LCY_EQUIVALENT_SETTLED 	oltbs_amount_paid.LCY_EQUIVALENT_SETTLED%TYPE,
	  AMOUNT_DUE              oltbs_amount_due_cs.AMOUNT_DUE%TYPE
	
);

TYPE amt_lookup IS TABLE OF rec_lookup INDEX BY BINARY_INTEGER;


FUNCTION fn_skim_upload(
			p_part_dd_ref_no	IN 	oltbs_contract.CONTRACT_REF_NO%TYPE,
			p_borr_dd_ref_no	IN	oltbs_contract.CONTRACT_REF_NO%TYPE,
			p_value_date		IN	DATE,
			p_borr_esn		IN	oltbs_contract.LATEST_EVENT_SEQ_NO%TYPE,
			p_esn			IN	oltbs_contract.LATEST_EVENT_SEQ_NO%TYPE,
			p_event_code		IN	oltbs_contract_event_log.EVENT_CODE%TYPE,
			p_component		IN	oltbs_amount_due_cs.COMPONENT%TYPE,
			p_party_comp_amt	IN	oltbs_contract_master.AMOUNT%TYPE,
			p_list_of_amount_tags	IN OUT	VARCHAR2,
			p_list_of_amount_ccys	IN OUT	VARCHAR2,
			p_list_of_amounts	IN OUT	VARCHAR2,
			p_err_code		IN OUT	ERTBS_MSGS.ERR_CODE%TYPE,
			p_err_param		IN OUT	ERTBS_MSGS.MESSAGE%TYPE
			)
RETURN BOOLEAN ;


END lbpks_skim;
/
CREATE or replace SYNONYM lbpkss_skim FOR lbpks_skim
/