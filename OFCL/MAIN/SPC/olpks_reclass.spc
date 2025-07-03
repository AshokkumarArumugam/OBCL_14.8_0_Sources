CREATE OR REPLACE PACKAGE olpks_reclass IS
/*-------------------------------------------------------------------------------------------------
  **
  ** File Name    : olpks_reclass.SPC
  **
  ** Module       : MIS
  **
 	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
CHANGE HISTORY
20-OCT-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 FS Vol1 Tag04,Expense Code change changes,created a new package for expense code reclass functionality
13-JAN-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 FS Vol1 Tag04 IUT#193 changes,added module code as parameter.
19-AUG-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 RETRO CITIBLR#35275,Changes done to enable search using contract reference number.
08-SEP-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 RETRO CITIBLR#35320,added new function fn_reclass_master_lock for locking the contracts and also new pkg variable
21-OCT-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 RETRO CITIUS#19253 changes p_reference_no is passed as parameter to fn_reclass_processing , fn_slt_reclass_processing
*/

--20-OCT-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 FS Vol1 Tag04,Expense Code change changes start
TYPE P_REC_UPL_ERROR_LOG IS TABLE OF OLTB_EXP_CODE_RECLAS_EXCP_LOG%ROWTYPE INDEX BY BINARY_INTEGER;
RECLASS_UPL_ERROR_LOG P_REC_UPL_ERROR_LOG;
pkg_source_code VARCHAR2(10);--22-AUG-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 FS Vol1 Tag04 CITIBLR#35320 changes
FUNCTION FN_POPULATE_CONTRACT_DETAILS(
								p_ref_no 			IN	oltbs_contract.contract_ref_no%TYPE
								,p_curr_exp_code	IN	oltbs_exp_code_reclass_master.current_expense_code%TYPE
								,p_new_exp_code		IN	oltbs_exp_code_reclass_master.new_expense_code%TYPE
								,p_reference_no		IN	oltbs_exp_code_reclass_master.reference_no%TYPE
								,p_module 			IN 	oltbs_contract.module_code%TYPE
								,p_date				IN 	DATE
								,p_error_code		IN	OUT VARCHAR2	
								,p_error_param		IN 	OUT VARCHAR2
							)
RETURN BOOLEAN;

FUNCTION fn_get_reclass_batch_no
								(

									p_branch		IN	oltbs_contract.branch%TYPE
									,p_batch_no		OUT NUMBER
									,p_error_code	IN OUT VARCHAR2
									,p_error_param  IN OUT VARCHAR2
									)
RETURN BOOLEAN;

FUNCTION fn_get_tranche_ref_no
	(p_dd_ref_no	IN	oltbs_contract.contract_ref_no%TYPE)
RETURN VARCHAR2;

FUNCTION fn_pop_de_upload_table
							(
								p_contract_ref_no	IN 		oltbs_contract.contract_ref_no%TYPE
								,p_current_exp_code	IN		oltbs_class_mapping.txn_mis_2%TYPE
								,p_reference_no		IN		oltbs_exp_code_reclass_master.reference_no%TYPE
								,p_error_code		IN OUT 	VARCHAR2
								,p_error_param		IN OUT	VARCHAR2
							)
RETURN BOOLEAN;

/*FUNCTION fn_reclass_deletion
								(
								p_contract_ref_no	IN 		oltbs_exp_code_reclass_master.contract_ref_no%TYPE
								,p_current_exp_code	IN		oltbs_exp_code_reclass_master.current_expense_code%TYPE
								,p_reference_no		IN		oltbs_exp_code_reclass_master.reference_no%TYPE
								,p_error_code		IN OUT 	VARCHAR2
								,p_error_param		IN OUT	VARCHAR2
								)
								
RETURN BOOLEAN;
*/

FUNCTION fn_reclass_processing
							(
								p_branch			IN	oltbs_contract.branch%TYPE
								,p_module			IN	oltbs_contract.module_code%TYPE
								,p_seq_no			IN	NUMBER
								,p_processing_date		IN 	DATE
								,p_error_code			IN OUT varchar2
								,p_error_param			IN OUT varchar2
								,p_reference_no		        IN 	oltbs_exp_code_reclass_master.reference_no%TYPE DEFAULT '%'  --CITIUS#19253 changes
							)
RETURN BOOLEAN;					

FUNCTION fn_slt_reclass_processing
							(
								p_branch			IN	oltbs_contract.branch%TYPE
								,p_module			IN	oltbs_contract.module_code%TYPE
								,p_seq_no			IN	NUMBER
								,p_processing_date		IN 	DATE
								,p_error_code			IN OUT varchar2
								,p_error_param			IN OUT varchar2
								,p_reference_no		        IN 	oltbs_exp_code_reclass_master.reference_no%TYPE DEFAULT '%'  --CITIUS#19253 changes
							)
RETURN BOOLEAN;

FUNCTION fn_process_contract
								(
									p_contract_ref_no		IN 	oltbs_contract.contract_ref_no%TYPE
									,p_current_exp_code		IN 	oltbs_exp_code_reclass_master.current_expense_code%TYPE
									,p_reference_no			IN 	oltbs_exp_code_reclass_master.reference_no%TYPE
									,p_processing_date		IN	DATE
									,p_branch				IN	oltbs_contract.branch%TYPE
									,p_module				IN	oltbs_contract.module_code%TYPE
									,p_error_code			IN OUT VARCHAR2
									,p_error_param			IN OUT VARCHAR2
								)
RETURN BOOLEAN;

FUNCTION fn_reclass_acct_ent
							(
								p_branch			IN 	oltbs_upload_master_de.branch_code%TYPE
								,p_source_code		IN	oltbs_upload_master_de.source_code%TYPE
								,p_batch_no			IN	oltbs_upload_master_de.batch_no%TYPE
								,p_module			IN	oltbs_contract.module_code%TYPE--13-JAN-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 FS Vol1 Tag04 IUT#193 changes
								,p_error_code		IN 	OUT VARCHAR2
								,p_error_param		IN 	OUT VARCHAR2
							)
RETURN BOOLEAN;	

FUNCTION fn_update_mis_det
						(
							p_contract_ref_no		IN 	oltbs_contract.contract_ref_no%TYPE
							,p_current_exp_code		IN 	oltbs_exp_code_reclass_master.current_expense_code%TYPE
							,p_reference_no			IN 	oltbs_exp_code_reclass_master.reference_no%TYPE
							,p_batch_no				IN	oltbs_upload_detail_de.batch_no%TYPE
							,p_error_code			IN 	OUT VARCHAR2
							,p_error_param			IN 	OUT VARCHAR2
						)
RETURN BOOLEAN;						

PROCEDURE pr_origination_reclass_job
									(
										p_branch	IN 	oltbs_contract.branch%TYPE
										,p_module	IN	oltbs_contract.module_code%TYPE
										,p_seq_no	IN	NUMBER
									);
PROCEDURE pr_agency_reclass_job
									(
										p_branch	IN 	oltbs_contract.branch%TYPE
										,p_module	IN	oltbs_contract.module_code%TYPE
										,p_seq_no	IN	NUMBER
									);
PROCEDURE pr_slt_reclass_job
									(
										p_branch	IN 	oltbs_contract.branch%TYPE
										,p_module	IN	oltbs_contract.module_code%TYPE
										,p_seq_no	IN 	NUMBER
									);
PROCEDURE pr_log_reclass_error
								( 
									p_contract_ref_no		IN  oltbs_exp_code_reclass_master.contract_ref_no%TYPE
									,p_cur_expense_code 	IN	oltbs_exp_code_reclass_master.current_expense_code%TYPE
									,p_reference_no			IN  oltbs_exp_code_reclass_master.reference_no%TYPE
									,p_related_ref_no		IN 	oltbs_contract.contract_ref_no%TYPE
									,p_err_seq_no			IN   oltbs_contract.latest_event_seq_no%TYPE
									,p_module				IN	 oltbs_contract.module_code%TYPE
									,p_err_code				IN   VARCHAR2
									,p_err_params	   		IN   VARCHAR2
								);	
PROCEDURE pr_deal_reclass_job
									(
										p_branch	IN 	oltbs_contract.branch%TYPE
										,p_module	IN	oltbs_contract.module_code%TYPE
										,p_seq_no	IN	number
									);
FUNCTION fn_upload_settle_trade
								(
								p_cusip_no					IN	oltbs_exp_code_reclass_master.cusip_no%TYPE
								,p_portfolio				IN	oltbs_exp_code_reclass_master.portfolio%TYPE
								,p_curr_expense_code		IN	oltbs_exp_code_reclass_master.current_expense_code%TYPE
								,p_new_expense_code			IN	oltbs_exp_code_reclass_master.new_expense_code%TYPE
								,p_processing_date			IN	DATE
								,p_buy_sell					IN  tltbs_contract_master.buy_sell%TYPE
								,p_trade_amount				IN	tltbs_current_dated_balance.closed_settled_position%TYPE
								,p_error_code				IN  OUT VARCHAR2
								,p_error_param				IN	OUT VARCHAR2
								)
RETURN BOOLEAN;	
FUNCTION fn_amend_unsettled_trade
									(
									p_contract_ref_no   	IN TLTB_UPLOAD_MASTER.ext_contract_ref_no%TYPE,
									p_branch				IN TLTB_UPLOAD_MASTER.branch%TYPE,
									p_reference_no			IN oltbs_exp_code_reclass_master.reference_no%TYPE,
									p_err_code	        	IN OUT VARCHAR2,
									p_err_params	        IN OUT VARCHAR2
									)
RETURN BOOLEAN;
FUNCTION fn_block_trade_reversal
								(
								p_trade_ref_no				IN 	oltbs_contract.contract_ref_no%TYPE
								)
RETURN VARCHAR2;

FUNCTION fn_block_payment_reversal
								(
								p_contract_ref_no				IN 	oltbs_contract.contract_ref_no%TYPE
								)
RETURN VARCHAR2;

--16-JUL-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 FS Vol1 Tag04 CITIBLR#35275 Changes start
FUNCTION FN_GET_REF_NO_STRING
							(
							P_REF_NO	IN 		VARCHAR2
							)
RETURN VARCHAR2;
--16-JUL-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 FS Vol1 Tag04 CITIBLR#35275 changes end

--22-AUG-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 FS Vol1 Tag04 CITIBLR#35320 start
FUNCTION fn_reclass_master_lock
					(
						p_contract_ref_no	IN		oltbs_exp_code_reclass_master.contract_ref_no%TYPE
						,p_reference_no		IN  	oltbs_exp_code_reclass_master.reference_no%TYPE
						,p_module			IN  	oltbs_exp_code_reclass_master.module%TYPE
						,p_error_code		IN OUT	VARCHAR2
						,p_error_param		IN OUT  VARCHAR2
					)
RETURN BOOLEAN;
--22-AUG-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 FS Vol1 Tag04 CITIBLR#35320 end	
					
END olpks_reclass;
/
Create or replace Synonym olpkss_reclass for olpks_reclass
--20-OCT-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 FS Vol1 Tag04,Expense Code change changes
/