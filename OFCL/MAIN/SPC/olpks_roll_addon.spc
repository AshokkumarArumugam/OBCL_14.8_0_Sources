CREATE OR REPLACE PACKAGE olpks_roll_addon
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_roll_addon.SPC
**
** Module		: LOANS and DEPOSITS
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

/* Change History
17/01/2002  FCC 3.9 LATAM  TENOR WISE FLOATING RATE CHANGES. Floating rate is picked up for the combination of
				   Tenor + Borrow Lend Indicator + Rate Calc Type.
				   p_rate_code declaration in Function fn_check_if_rate_exists is changed 
				   since the floating rate table is changed from cftm_floating_rate TO cftm_float_rate_master	

11/apr/2002 FCC 4.0 june 02 Rollover Changes.
				Added two functions fn_pickup_new_components  and fn_roll_with_user_rates.

02-JAN-2003 FCC4.2 APR 2003 CITIPLC changes for Rollover
				New parameter p_list_of_i_rate_types added to fn_replicate_from_contract
				
03-AUG-2007 FCC V.CL Release 7.3 SPLIT Re Price changes added 3 new functions					
03-AUG-2007 FCC V.CL Release 7.3 Reprice changes
09-AUG-2007 FCC V.CL Release 7.3 Rollover Changes, Maneeha added a new function called FN_ENABLE_DISABLE_LIQD_FLAG to set the 
	      liquidate flags and their values based on the renewal amt type, liquidation mode and renewal type.
21-FEB-2010 FLEXCUBE V.CL Release 7.6 CITIPBG TD FS tag6 Changes, rollover changes for rate population of time deposits.

Change History

Changed By 			: Krithika G
Change Description	: Changes for Multiple Collateral/Pool Linkages
Search string 		: OBCL_12.5 Multiple Collateral/Pool Changes

 **Changed By         : Vineeth T M
**Date               : 30-Jul-2024
**Change Description : OBCL_14.8_VER_ROL Changes
**Search String      : OBCL_14.8_VER_ROL Changes

**Changed By         : Vineeth T M
**Date               : 12-Aug-2024
**Change Description : LS Version rollover changes
**Search String      : OBCL_14.8_LS_VER_ROL changes  

*/




------------------------------------------------------------------------------
--Note -> all functions of this package have spilled over from the package
--	  "ldpks_rollover" and hence are intended to be exclusively invoked
--	  by functions of the package "ldpks_rollover"
------------------------------------------------------------------------------
TYPE TY_Ref_No IS TABLE OF Oltb_Contract.Contract_Ref_No%TYPE  INDEX BY BINARY_INTEGER;--OBCL_14.8_LS_VER_ROL Changes
FUNCTION fn_build_inc_exp_tag_list
	(
	p_acc_lookup		IN	olpkss_accounting.tbl_lookup,
	p_list_of_inc_exp_tags	IN OUT	varchar2,
	p_error_code		IN OUT	varchar2,	
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_lookup_settlement_entry
	( 
	p_acc_lookup		IN	olpkss_accounting.tbl_lookup,
	p_sett_entry		OUT	olpkss_accounting.tbl_lookup,
	p_error_code		IN OUT	varchar2,
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_settlement_lookup
	(
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	p_list_of_is_amt_tags	IN OUT	varchar2,
	p_list_of_is_acc_brs	IN OUT	varchar2,
	p_list_of_is_acc_nos	IN OUT	varchar2,
	p_list_of_is_acc_ccys	IN OUT	varchar2,
	p_list_of_is_exch_rates	IN OUT	varchar2,
	p_error_code		IN OUT	varchar2,	
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_preliminary_checks
	( 
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	p_processing_date	IN	date,
	p_authorization_status	IN	oltbs_contract.auth_status%TYPE,
	cs			IN	olpkss_rollover.contract_struct,
	ps			IN	olpkss_rollover.product_struct,
	p_current_event_seq_no	IN	oltbs_contract.latest_event_seq_no%TYPE,
	p_error_code		IN OUT	varchar2,
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_subsequent_checks
	( 
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	p_processing_date	IN	date,
	p_authorization_status	IN	oltbs_contract.auth_status%TYPE,
	cs			IN	olpkss_rollover.contract_struct,
	p_current_event_seq_no	IN	oltbs_contract.latest_event_seq_no%TYPE,
	amt			IN	olpkss_rollover.amount_struct,	
	p_new_maturity_date	IN	date,
	p_error_code		IN OUT	varchar2,
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_check_contract_linkages
	( 
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	p_processing_date	IN	date,
	p_authorization_status	IN	oltbs_contract.auth_status%TYPE,
	cs			IN	olpkss_rollover.contract_struct,
	p_current_event_seq_no	IN	oltbs_contract.latest_event_seq_no%TYPE,
	amt			IN	olpkss_rollover.amount_struct,	
	p_new_maturity_date	IN	date,
	p_error_code		IN OUT	varchar2,
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_get_earliest_maturity_date
	( 
	p_link_lookup		IN	olpkss_link.ty_tab_util,
	p_earliest_mat_date	IN OUT	date,
	p_error_code		IN OUT	varchar2,
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_contract_level_updates
	(
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	p_authorization_status	IN	oltbs_contract.auth_status%TYPE,
	cs			IN	olpkss_rollover.contract_struct,
	p_current_event_seq_no	IN	oltbs_contract.latest_event_seq_no%TYPE,
	p_Current_Event        IN Oltbs_Contract_Event_Log.Event_Code%TYPE,--OBCL_14.8_VER_ROL changes
	p_error_code		IN OUT	varchar2,
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_advice_generation
	(
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	p_processing_date	IN	date,
	p_authorization_status	IN	oltbs_contract.auth_status%TYPE,
	cs			IN	olpkss_rollover.contract_struct,
	p_current_event_seq_no	IN	oltbs_contract.latest_event_seq_no%TYPE,
	p_error_code		IN OUT	varchar2,
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

--FCC 4.0 june 02 Rollover Changes Starts
FUNCTION fn_pickup_new_components	( 
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	p_processing_date	IN	date,
	cs			IN	olpkss_rollover.contract_struct,
	p_current_event_seq_no	IN	oltbs_contract.latest_event_seq_no%TYPE,
	p_list_of_new_interests	IN OUT	varchar2,
	p_list_of_isp_amt_tags	IN OUT	varchar2,
	p_list_of_isp_tag_types	IN OUT	varchar2,
	p_list_of_isp_drcr_inds	IN OUT	varchar2,
	p_error_code		IN OUT	varchar2,
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_roll_with_user_rates
		( 
		p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
		p_processing_date	IN	date,
		cs			IN	olpkss_rollover.contract_struct,
		p_current_event_seq_no	IN	oltbs_contract.latest_event_seq_no%TYPE,
		p_contract_amt	IN	oltbs_contract_master.amount%TYPE, --21-FEB-2010 FLEXCUBE V.CL Release 7.6 CITIPBG TD FS tag6 Changes
		p_new_tenor		IN	oltbs_contract_master.tenor%TYPE, --21-FEB-2010 FLEXCUBE V.CL Release 7.6 CITIPBG TD FS tag6 Changes
		p_error_code		IN OUT	varchar2,
		p_error_parameter	IN OUT	varchar2
		)
		RETURN boolean;
--FCC 4.0 june 02 Rollover Changes Starts

FUNCTION fn_create_new_version
	( 
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	p_processing_date	IN	date,
	p_authorization_status	IN	oltbs_contract.auth_status%TYPE,
	cs			IN	olpkss_rollover.contract_struct,
	p_list_of_pcf_comps	IN	varchar2,
	p_list_of_pcf_sett_ccys	IN	varchar2,
	p_list_of_is_amt_tags	IN OUT	varchar2,
	p_list_of_is_acc_brs	IN OUT	varchar2,
	p_list_of_is_acc_nos	IN OUT	varchar2,
	p_list_of_is_acc_ccys	IN OUT	varchar2,
	p_list_of_is_exch_rates	IN OUT	varchar2,
	p_current_event_seq_no	IN	oltbs_contract.latest_event_seq_no%TYPE,
	amt			IN	olpkss_rollover.amount_struct,
	p_new_maturity_date	IN	date,
	p_new_tenor		IN	oltbs_contract_master.tenor%TYPE,
	p_current_version_no	IN OUT	oltbs_contract.latest_version_no%TYPE,
	p_list_of_tags_pickedup OUT	varchar2,
	p_error_code		IN OUT	varchar2,
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_repickup_interest
	( 
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	p_processing_date	IN	date,
	cs			IN	olpkss_rollover.contract_struct,
	p_current_event_seq_no	IN	oltbs_contract.latest_event_seq_no%TYPE,
	p_list_of_new_interests	IN OUT	varchar2,
	p_list_of_isp_amt_tags	IN OUT	varchar2,
	p_list_of_isp_tag_types	IN OUT	varchar2,
	p_list_of_isp_drcr_inds	IN OUT	varchar2,
	p_error_code		IN OUT	varchar2,
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_generate_schedules
	( 
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	p_processing_date	IN	date,
	p_authorization_status	IN	oltbs_contract.auth_status%TYPE,
	cs			IN	olpkss_rollover.contract_struct,
	p_current_event_seq_no	IN	oltbs_contract.latest_event_seq_no%TYPE,
	amt			IN	olpkss_rollover.amount_struct,	
	p_new_maturity_date	IN	date,
	p_current_version_no	IN	oltbs_contract.latest_version_no%TYPE,
	p_list_of_i_components	IN	varchar2,
	p_list_of_i_rate_types	IN	varchar2,
	p_error_code		IN OUT	varchar2,
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_replicate_from_contract
	( 
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	p_processing_date	IN	date,
	cs			IN	olpkss_rollover.contract_struct,
	p_current_event_seq_no	IN	oltbs_contract.latest_event_seq_no%TYPE,
	amt			IN	olpkss_rollover.amount_struct,	
	p_current_version_no	IN	oltbs_contract.latest_version_no%TYPE,
	p_list_of_i_components	IN	varchar2,
	p_list_of_i_rate_types	IN	varchar2, --FCC4.2 APR 2003 CITIPLC changes for Rollover 
	p_error_code		IN OUT	varchar2,
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_bullet_schedule_definition
	( 
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	cs			IN	olpkss_rollover.contract_struct,
	p_current_event_seq_no	IN	oltbs_contract.latest_event_seq_no%TYPE,
	amt			IN	olpkss_rollover.amount_struct,	
	p_new_maturity_date	IN	date,
	p_current_version_no	IN	oltbs_contract.latest_version_no%TYPE,
	p_list_of_i_components	IN	varchar2,
	p_list_of_i_rate_types	IN	varchar2,
	p_error_code		IN OUT	varchar2,
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_explode_schedule_definition
	( 
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	p_processing_date	IN	date,
	p_authorization_status	IN	oltbs_contract.auth_status%TYPE,
	cs			IN	olpkss_rollover.contract_struct,
	p_current_event_seq_no	IN	oltbs_contract.latest_event_seq_no%TYPE,
	p_current_version_no	IN 	oltbs_contract.latest_version_no%TYPE,
	p_error_code		IN OUT	varchar2,
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_update_limit_utilization
	(
	p_contract_ref_no	IN 	oltbs_contract.contract_ref_no%TYPE,
	p_processing_date	IN	date,
	p_authorization_status	IN	oltbs_contract.auth_status%TYPE,
	cs			IN	olpkss_rollover.contract_struct,
	ps			IN	olpkss_rollover.product_struct,
	p_current_event_seq_no	IN	oltbs_contract.latest_event_seq_no%TYPE,
	amt			IN	olpkss_rollover.amount_struct,
	p_new_maturity_date	IN	date,
	p_current_version_no	IN	oltbs_contract.latest_version_no%TYPE,
	p_error_code		IN OUT	varchar2,
	p_error_parameter	IN OUT	varchar2
	)	
	RETURN boolean;

--OBCL_12.5 Multiple Collateral/Pool Changes --Krithika
  FUNCTION fn_update_multi_linkages(p_contract_ref_no      IN oltbs_contract.contract_ref_no%TYPE,
                                    p_processing_date      IN DATE,
                                    p_authorization_status IN oltbs_contract.auth_status%TYPE,
                                    cs                     IN olpkss_rollover.contract_struct,
                                    ps                     IN olpkss_rollover.product_struct,
                                    p_current_event_seq_no IN oltbs_contract.latest_event_seq_no%TYPE,
                                    amt                    IN olpkss_rollover.amount_struct,
                                    p_new_maturity_date    IN DATE,
                                    p_current_version_no   IN oltbs_contract.latest_version_no%TYPE,
                                    p_error_code           IN OUT VARCHAR2,
                                    p_error_parameter      IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --OBCL_12.5 Multiple Collateral/Pool Changes Ends --Krithika 

	
	
FUNCTION fn_process_settlement_pickup
	( 
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	cs			IN	olpkss_rollover.contract_struct,
	p_sett_entry		IN	olpkss_accounting.tbl_lookup,
	p_list_of_pcf_comps	IN	varchar2,
	p_list_of_pcf_sett_ccys IN	varchar2,
	p_list_of_is_amt_tags	IN OUT	varchar2,
	p_list_of_is_acc_brs	IN OUT 	varchar2,
	p_list_of_is_acc_nos	IN OUT 	varchar2,
	p_list_of_is_acc_ccys	IN OUT	varchar2,
	p_list_of_is_exch_rates	IN OUT	varchar2,
	p_current_event_seq_no	IN	oltbs_contract.latest_event_seq_no%TYPE,
	p_list_of_cf_amt_tags	IN	varchar2,
	p_list_of_cf_amt_ccys	IN	varchar2,
	p_list_of_tags_pickedup IN	varchar2,
	p_error_code		IN OUT	varchar2,
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_verify_funds
	( 
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	p_processing_date	IN	date,
	p_authorization_status	IN	oltbs_contract.auth_status%TYPE,
	cs			IN	olpkss_rollover.contract_struct,
	p_sett_entry		IN	olpkss_accounting.tbl_lookup,
	p_list_of_inc_exp_tags	IN	varchar2,
	p_list_of_is_amt_tags	IN 	varchar2,
	p_list_of_is_acc_brs	IN 	varchar2,
	p_list_of_is_acc_nos	IN 	varchar2,
	p_list_of_is_acc_ccys	IN 	varchar2,
	p_list_of_is_exch_rates	IN 	varchar2,
	p_current_event_seq_no	IN	oltbs_contract.latest_event_seq_no%TYPE,
	p_list_of_amount_tags	IN 	varchar2,
	p_list_of_amounts	IN 	varchar2,
	p_list_of_amount_ccys	IN 	varchar2,
	p_error_code		IN OUT	varchar2,
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_update_verify_funds_table
	( 
	p_account_branch	IN	oltbs_handoff.ac_branch%TYPE,
	p_account		IN	oltbs_handoff.ac_branch%TYPE,
	p_account_ccy		IN	oltbs_handoff.ac_branch%TYPE,
	p_debit_in_acc_ccy	IN	oltbs_handoff.fcy_amount%TYPE,
	p_verify_funds		IN OUT	olpkss_rollover.verify_funds_table,
	p_error_code		IN OUT	varchar2,
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_settlement_pickup
	( 
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	cs			IN	olpkss_rollover.contract_struct,
	p_list_of_pcf_comps	IN	varchar2,
	p_list_of_pcf_sett_ccys	IN	varchar2,
	p_current_event_seq_no	IN	oltbs_contract.latest_event_seq_no%TYPE,
	p_list_of_cf_amt_tags	IN	varchar2,
	p_list_of_cf_amt_ccys	IN	varchar2,
	p_list_of_isp_amt_tags	IN	varchar2,
	p_list_of_isp_tag_types	IN	varchar2,
	p_list_of_isp_drcr_inds	IN	varchar2,
	p_error_code		IN OUT	varchar2,
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_iccf_product_referral
	(
	p_product		IN	oltbs_contract.product_code%TYPE,
	p_list_of_pcf_comps	OUT	varchar2,
	p_list_of_pcf_sett_ccys	OUT	varchar2,
	p_error_code		IN OUT	varchar2,	
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_interest_referral
	(
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	p_processing_date	IN	date,
	p_authorization_status	IN	oltbs_contract.auth_status%TYPE,
	cs			IN	olpkss_rollover.contract_struct,
	p_current_event_seq_no	IN	oltbs_contract.latest_event_seq_no%TYPE,
	amt			IN	olpkss_rollover.amount_struct,	
	p_list_of_new_interests	IN	varchar2,
	p_list_of_i_components	IN OUT	varchar2,
	p_list_of_i_rate_types 	IN OUT 	varchar2,
	p_list_of_i_accr_reqds	IN OUT	varchar2,
	p_error_code		IN OUT	varchar2,	
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

--
--Following functions are invoked by functions of this package as well as
--by functions of the package "ldpks_rollover".
--

FUNCTION fn_convert_tag_amount
	( 
	p_amount_tag		IN 	oltbs_handoff.amount_tag%TYPE,
	p_tag_amount		IN 	oltbs_handoff.fcy_amount%TYPE,
	p_tag_amount_ccy	IN	oltbs_handoff.ac_ccy%TYPE,
	p_settlement_ccy	IN	oltbs_handoff.ac_ccy%TYPE,
	p_settlement_exch_rate	IN OUT	oltbs_handoff.exch_rate%TYPE,
	p_list_of_inc_exp_tags	IN	varchar2,
	p_list_of_is_amt_tags	IN	varchar2,
	p_settlement_amount	IN OUT	oltbs_handoff.fcy_amount%TYPE,
	p_lcy_equivalent	IN OUT	oltbs_handoff.lcy_amount%TYPE,
	p_error_code		IN OUT	varchar2,
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_process_error_code
	(
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	p_authorization_status	IN	oltbs_contract.auth_status%TYPE,
	cs			IN	olpkss_rollover.contract_struct,
	p_current_event_seq_no	IN	oltbs_contract.latest_event_seq_no%TYPE,
	p_error_code		IN OUT	varchar2,
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_check_if_rate_exists
	( 
	p_processing_date	IN	date,
	cs			IN	olpkss_rollover.contract_struct,
	amt			IN	olpkss_rollover.amount_struct,
	--17/01/2002 FCC 3.9 LATAM Tenor floating rate changes Starts
   -- p_rate_code		IN	cftms_floating_rate.rate_code%TYPE, 
	p_rate_code		IN	cftms_float_rate_master.rate_code%TYPE,
	--17/01/2002 FCC 3.9 LATAM Tenor floating rate changes Ends
	p_error_code		IN OUT	varchar2,
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;
	
---FCC V.CL Release 7.3 SPLIT Re Price changes starts-----------------
TYPE g_cont_liq IS TABLE OF oltbs_upload_liq%ROWTYPE INDEX BY BINARY_INTEGER;

FUNCTION fn_process_liqd_amt(
			            p_parent_crn	IN oltbs_contract.contract_ref_no%TYPE,-- FCC V.CL Release 7.3 Reprice changes
				    p_contract_ref_no  	IN oltbs_contract.contract_ref_no%TYPE,
    			  	    p_process 		     IN VARCHAR2,
    			  	    p_process_date 	   IN DATE DEFAULT global.application_date,
    			  	    --p_split_serial_no   IN NUMBER DEFAULT 1,-- FCC V.CL Release 7.3 Reprice changes
				    p_repc_serial_no   IN NUMBER DEFAULT 1,-- FCC V.CL Release 7.3 Reprice changes
    			  	    p_liq_summary 	   OUT oltbs_upload_liq_summary%ROWTYPE, 
    			  	    p_cont_liq          OUT olpks_roll_addon.g_cont_liq
    			        ) RETURN BOOLEAN  ;



FUNCTION fn_upload_liq (
			     	p_liq_summary 	 IN oltbs_upload_liq_summary%ROWTYPE,
	    			p_upload_liq          IN olpks_roll_addon.g_cont_liq
	    			
	    		) RETURN BOOLEAN ;


FUNCTION fn_call_upload_payment(
				        p_contract_ref_no   IN  oltbs_contract.contract_ref_no%TYPE ,
		                	p_ProcessCode   	    IN 	VARCHAR2 ,
		                	p_Date  	   	    IN 	DATE DEFAULT global.application_date
		                ) RETURN BOOLEAN ;

		                
---FCC V.CL Release 7.3 SPLIT Re Price changes ENDS-------- 	

-- 09-AUG-2007 FCC V.CL Release 7.3 Rollover Changes, Maneeha starts

FUNCTION FN_ENABLE_DISABLE_LIQD_FLAG
		(
			p_contract_ref_no   		IN VARCHAR2,
			p_renewal_type			IN VARCHAR2, --SPLITREPC, MERGEREPC, NORMROLL, ROLLOVER(for split, consol  and consol+split)
			p_renewal_amt_type		IN CHAR DEFAULT 'P', --P, I, S
			p_principal_os_amt		IN NUMBER,	
			p_renewal_amount			IN NUMBER, 
			p_reprice_value_dt			IN DATE, --reprice_value_date 
			p_enable_principal_flag		OUT CHAR,--E, D
			p_enable_interest_flag		OUT CHAR,--E, D
			p_dflt_principal_value		OUT CHAR,--Y, N
			p_dflt_interest_value	   	OUT CHAR --Y, N
		 )
RETURN BOOLEAN;

-- 09-AUG-2007 FCC V.CL Release 7.3 Rollover Changes, Maneeha ends
--OBCL_14.8_VER_ROL Changes start
FUNCTION Fn_Recalc_Penalty(p_Contract_Ref_No      IN Oltbs_Contract.Contract_Ref_No%TYPE,
                           p_Value_Date           IN DATE,
                           p_Event_Seq_No         in Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                           Cs                     IN Olpkss_Rollover.Contract_Struct,
                           p_Error_Code           IN OUT VARCHAR2,
                           p_Error_Parameter      IN OUT VARCHAR2)
RETURN BOOLEAN;
--OBCL_14.8_VER_ROL Changes end
--OBCL_14.8_LS_VER_ROL Changes start
FUNCTION Fn_Elcm_Create_New_Version(Cs                 IN Olpkss_Rollover.Contract_Struct,
                                    P_CONTRACT_REF_NO  IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                    p_Processing_Date  IN DATE,
                                    p_Current_Version_No in Oltbs_Contract.Latest_Version_No%TYPE,
                                    p_Event_Seq_No     IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                                    p_Error_Code       IN OUT VARCHAR2,
                                    p_Error_Parameter  IN OUT VARCHAR2) 
RETURN BOOLEAN;
--OBCL_14.8_LS_VER_ROL Changes end
	

END olpks_roll_addon;
/
CREATE or replace SYNONYM olpkss_roll_addon FOR olpks_roll_addon
/