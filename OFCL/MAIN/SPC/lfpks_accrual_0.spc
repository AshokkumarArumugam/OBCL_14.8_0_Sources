CREATE OR REPLACE PACKAGE lfpks_accrual_0
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : lfpks_accrual_0.spc
**
** Module       : ICCF
This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/

/*
  CHANGE HISTORY
  
16-Apr-2003 Added new function Fn_Batch_accrual to do the Fee accruals at the contract + component level..

23-APR-2003 ITR1#706 Fcc4.2 OPS related changes.Code changes for the accrual to happen based on the accrual parameters specifeid at
												the contract level.
27-AUG-2004 FCC 4.6 Sep 04 Changes For LC/BC Fee Accrual. A new Parameter Module Added in Fn_Batch_accrual  

28-AUG-2004 FCC 4.6 Sep 04 Changes For LC/BC Fee Accrual. A new function fn_upload_accr_fees has been introduced to upload accr fees.

05-SEP-2004 FCC 4.6 Sep 04 Changes For LC/BC Fee Accrual. A new function is added to handle foreclosure.

15-DEC-2004 FCC 4.6.1 DEC 2004 EIM Enhancements changes .Function fn_calculate_till_date_accrual is made public.
- FCC 4.6.1 JAN 2005 ITR-1 SFR-196 For changing copyright clause / release name
25-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10161 UK to US Retro Changes 
22-AUG-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 JIRA#150080-8703 changes,Made changes to pick up real GLS while status is getting changed from adverse to norm.
10-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 RETRO Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 CITIBLR#35368 changes, done to pass default parameter as p_final_status by fuction overloading.


**Changed By         : Krithika G
**Change Description : OBCL 14.0 EOD Batch Changes
**Search String      : OBCL_14.0_Batch_Changes

*/

--ITR1#706 Fcc4.2 OPS related changes starts...

FUNCTION Fn_Batch_accrual
		(
		 p_module               IN      oltbs_contract.module_code%TYPE,
		 p_processing_date	IN	Date,
		 p_accrual_to_date	IN	Date,
		 p_accrual_ref_no	IN	oltbs_auto_function_details.current_accrual_ref_no%TYPE,
		 p_commit_frequency	IN	oltbs_automatic_process_master.eod_commit_count%TYPE,
		 p_err_code		IN OUT	Varchar2,
		 p_err_param		IN OUT	Varchar2
		 )
RETURN BOOLEAN;

FUNCTION Fn_Batch_accrual
		(
		 p_product              IN      oltbs_contract.product_code%TYPE,
		 p_module               IN      oltbs_contract.module_code%TYPE, 
		 p_processing_date	IN	Date,
		 p_accrual_to_date	IN	Date,
		 p_accrual_ref_no	IN	oltbs_auto_function_details.current_accrual_ref_no%TYPE,
		 p_commit_frequency	IN	oltbs_automatic_process_master.eod_commit_count%TYPE,
		 p_err_code		IN OUT	Varchar2,
		 p_err_param		IN OUT	Varchar2
		 )
RETURN BOOLEAN;


--ITR1#706 Fcc4.2 OPS related changes ends

FUNCTION Fn_accrue_for_a_product
	(
	p_product			IN		oltbs_contract.product_code%TYPE,
	p_module			IN		oltbs_contract.module_code%TYPE,
	p_processing_date		IN		DATE,
	p_accrual_to_date		IN		DATE,
	p_accrual_ref_no		IN		oltbs_auto_function_details.current_accrual_ref_no%TYPE,
	p_memo_accrual			IN		BOOLEAN,
	p_accrual_level			IN		oltms_branch_parameters.accrual_level%TYPE,
	p_include_stop_status		IN		BOOLEAN,
	p_commit_frequency		IN		oltbs_automatic_process_master.eod_commit_count%TYPE,
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;

FUNCTION fn_adjust_for_a_contract
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_value_date			IN		DATE,
	p_processing_date		IN		DATE,
	p_include_stop_status		IN		BOOLEAN,
	p_complete_accruals		IN 		BOOLEAN,
	p_handoff_event_code		IN		VARCHAR2,
	p_handoff_action_code		IN		VARCHAR2,
	p_auth_stat			IN		VARCHAR2,	
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	--p_final_status IN oltbs_contract.user_defined_status%TYPE DEFAULT 'XXXX' --22-AUG-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 JIRA#150080-8703 changes --10-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 RETRO Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 CITIBLR#35368 changes
	)
	RETURN BOOLEAN;

FUNCTION fn_adjust_for_a_contract_link
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_loan_no			IN		oltbs_contract.contract_ref_no%TYPE,
	p_loan_esn			IN		oltbs_contract.latest_event_seq_no%TYPE,
	p_value_date			IN		DATE,
	p_processing_date		IN		DATE,
	p_include_stop_status		IN		BOOLEAN,
	p_complete_accruals		IN 		BOOLEAN,
	p_handoff_event_code		IN		VARCHAR2,
	p_handoff_action_code		IN		VARCHAR2,
	p_auth_stat			IN		VARCHAR2,
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;

FUNCTION fn_build_PnL_history_details
(
	p_contract_ref_no		IN		lftbs_accr_fee_master.contract_ref_no%TYPE,
	p_value_date			IN		DATE,
	p_component			IN		lftbs_accr_fee_master.component%TYPE,
	p_component_ccy			IN	 	lftbs_accr_fee_master.ccy%TYPE,
	p_prev_accrual_to_date		IN	 	DATE,
	p_tot_liqd_amount		IN	 	lftbs_accr_fee_master.total_amount_liquidated%TYPE,
	p_reverse_accruals		IN	 	BOOLEAN,
	p_list_of_amount_tags		IN OUT	VARCHAR2,
	p_list_of_amounts		IN OUT	VARCHAR2,
	p_list_of_amount_ccys		IN OUT	VARCHAR2,
	p_PnL_history_ind		IN OUT	VARCHAR2,
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
)
	RETURN BOOLEAN;

FUNCTION fn_reverse_for_a_contract
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_processing_date		IN		DATE,
	p_value_date			IN		DATE,
	p_authorization_status		IN		oltbs_contract.auth_status%TYPE,
	p_handoff_action_code		IN		VARCHAR2,
	p_current_event_seq_no		IN		oltbs_contract.latest_event_seq_no%TYPE,
	p_acc_lookup_status		IN		oltbs_contract.user_defined_status%TYPE,
	p_handoff_event_code		IN		oltbs_contract.curr_event_code%TYPE,
	p_transaction_code		IN		oltbs_handoff.trn_code%TYPE,
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;

FUNCTION fn_pass_product_level_entries
	(
	p_module			IN		oltbs_contract.module_code%TYPE,
	p_accrual_ref_no		IN		oltbs_auto_function_details.current_accrual_ref_no%TYPE,
	p_processing_date		IN		DATE,
	p_accrual_to_date		IN		DATE,
	p_product			IN		oltbs_contract.product_code%TYPE,
	p_commit_frequency		IN		oltbs_automatic_process_master.eod_commit_count%TYPE,
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;
	
-- OFCL12.2 commented the function
/*	
FUNCTION fn_upload_accr_fees
	(
	p_module                IN      	smtbs_modules.module_Id%TYPE,
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_component			IN		lctbs_upload_accr_fees.component%TYPE,
	p_esn				IN		lctbs_upload_accr_fees.event_seq_no%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
*/
-- OFCL12.2 commented the function
	
FUNCTION Fn_Force_fee_accrual
	(
	p_brn				IN	VARCHAR2,
	p_module			IN	VARCHAR2,
	p_contract_ref_no		IN VARCHAR2,
	p_err_code			IN OUT VARCHAR2,
	p_err_param			IN OUT VARCHAR2
	)
	RETURN BOOLEAN;


--FCC 4.6.1 DEC 2004 EIM Enhancements changes starts
FUNCTION fn_calculate_till_date_accrual
	(
	p_contract_ref_no			IN 		oltbs_contract.contract_ref_no%TYPE,
	p_component				IN 		lftbs_accr_fee_detail.component%TYPE,
	p_component_currency		IN		lftbs_accr_fee_master.ccy%TYPE,
	p_accrual_from_date		IN		DATE,
	p_accrual_to_date			IN		DATE,
	p_till_date_accrual		OUT		lftbs_accr_fee_master.till_date_accrual%TYPE,
	p_error_code			IN OUT	varchar2,
	p_error_parameter			IN OUT	varchar2
	)
	RETURN BOOLEAN;
	
--25-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10161 Changes Starts here
-- FCC V.CL Release 7.7 EURCITIPLC-LD#9620 changes Starts
FUNCTION fn_adjust_for_a_contract
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_value_date			IN		DATE,
	p_processing_date		IN		DATE,
	p_include_stop_status		IN		BOOLEAN,
	p_complete_accruals		IN 		BOOLEAN,
	p_handoff_event_code		IN		VARCHAR2,
	p_handoff_action_code		IN		VARCHAR2,
	p_auth_stat			IN		VARCHAR2,
	p_amort_fee_redq		IN 		VARCHAR2,	
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	--p_final_status IN oltbs_contract.user_defined_status%TYPE--22-AUG-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 JIRA#150080-8703 changes --10-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 RETRO Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 CITIBLR#35368 changes
	)
	RETURN BOOLEAN;
-- FCC V.CL Release 7.7 EURCITIPLC-LD#9620 changes Ends	
--25-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10161 Changes Ends here
--10-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 RETRO Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 CITIBLR#35368 changes starts
 FUNCTION fn_adjust_for_a_contract
 	(
 	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
 	p_value_date			IN		DATE,
 	p_processing_date		IN		DATE,
 	p_final_status			IN 		oltbs_contract.user_defined_status%TYPE,
 	p_include_stop_status		IN		BOOLEAN,
 	p_complete_accruals		IN 		BOOLEAN,
 	p_handoff_event_code		IN		VARCHAR2,
 	p_handoff_action_code		IN		VARCHAR2,
 	p_auth_stat			IN		VARCHAR2,
 	p_amort_fee_redq		IN 		VARCHAR2,
 	p_error_code			IN OUT	VARCHAR2,
 	p_error_parameter		IN OUT	VARCHAR2
  	)
	RETURN BOOLEAN;
--10-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 RETRO Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 CITIBLR#35368 changes ends

--OBCL_14.0_Batch_Changes
FUNCTION Fn_adjust_for_cont_link_batch(p_contract_ref_no     IN oltbs_contract.contract_ref_no%TYPE,
                                         p_loan_no             IN oltbs_contract.contract_ref_no%TYPE,
                                         p_loan_esn            IN oltbs_contract.latest_event_seq_no%TYPE,
                                         p_value_date          IN DATE,
                                         p_processing_date     IN DATE,
                                         p_include_stop_status IN BOOLEAN,
                                         p_complete_accruals   IN BOOLEAN,
                                         p_handoff_event_code  IN VARCHAR2,
                                         p_handoff_action_code IN VARCHAR2,
                                         p_auth_stat           IN VARCHAR2,
                                         p_error_code          IN OUT VARCHAR2,
                                         p_error_parameter     IN OUT VARCHAR2)
    RETURN BOOLEAN;


FUNCTION Fn_adjust_for_contract_batch(p_contract_ref_no     IN oltbs_contract.contract_ref_no%TYPE,
                                    p_value_date          IN DATE,
                                    p_processing_date     IN DATE,
                                    p_final_status        IN oltbs_contract.user_defined_status%TYPE, --10-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 RETRO Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 CITIBLR#35368 changes
                                    p_include_stop_status IN BOOLEAN,
                                    p_complete_accruals   IN BOOLEAN,
                                    p_handoff_event_code  IN VARCHAR2,
                                    p_handoff_action_code IN VARCHAR2,
                                    p_auth_stat           IN VARCHAR2,
                                    p_amort_fee_redq      IN VARCHAR2, -- FCC V.CL Release 7.7 EURCITIPLC-LD#9620 changes
                                    p_error_code          IN OUT VARCHAR2,
                                    p_error_parameter     IN OUT VARCHAR2
                                    --p_final_status IN oltbs_contract.user_defined_status%TYPE--22-AUG-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 JIRA#150080-8703 changes --10-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 RETRO Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 CITIBLR#35368 changes
                                    ) RETURN BOOLEAN;

FUNCTION Fn_cont_level_updates(p_contract_ref_no      IN oltbs_contract.contract_ref_no%TYPE,
                                     p_authorization_status IN oltbs_contract.auth_status%TYPE,
                                     p_current_event_seq_no IN oltbs_contract.latest_event_seq_no%TYPE,
                                     p_module               IN oltbs_contract_event_log.module%TYPE,
                                     p_contract_status      IN oltbs_contract_event_log.contract_status%TYPE,
                                     p_loan_no              IN oltbs_contract.contract_ref_no%TYPE,
                                     p_loan_esn             IN oltbs_contract.latest_event_seq_no%TYPE,
                                     p_error_code           IN OUT varchar2,
                                     p_error_parameter      IN OUT varchar2)
    RETURN BOOLEAN;
--OBCL_14.0_Batch_Changes

END lfpks_accrual_0;
--FCC 4.6.1 DEC 2004 EIM Enhancements changes ends
/
CREATE or replace SYNONYM lfpkss_accrual_0 FOR lfpks_accrual_0
/