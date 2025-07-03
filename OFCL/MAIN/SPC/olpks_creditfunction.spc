create or replace package olpks_creditfunction
as
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_creditfunction.SQL
**
** Module		: CORE SERVICES
**
This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.

CHANGE HISTORY

1.1  ADDED parameters like process_approved,process_rejected,process_no_response into the fn
read_appr_resp.The parameters get their value from the credit fn batch form

03 June 2002 FCC 4.0 June 2002 changes for split of bic maintenance. changing the parameters passed for fn_bic_hoff
06-Jun-2016 OFCL standalone changes, commented not required code. Search string--- OFCL12.2 Not required
----------------------------------------------------------------------------------------
*/


 FUNCTION Fn_exch_rates_hoff(pBranch_code   oltm_branch.BRANCH_CODE%TYPE,
			     pErrCode       OUT     ERTBS_MSGS.ERR_CODE%type)
		return BOOLEAN ;
 Function Fn_Cust_Acc_hoff
		(	--pCust_acc_no        IN      STTM_CUST_ACCOUNT.CUST_NO%TYPE, -- OFCL12.2 Not required
      pCust_acc_no        IN      oltb_account.CUST_NO%TYPE,
		 		--pBranchcode     IN      STTM_CUST_ACCOUNT.BRANCH_CODE%TYPE , -- OFCL12.2 Not required
        pBranchcode     IN      oltb_account.BRANCH_CODE%TYPE,
			        --pMod_no          IN      STTM_CUST_ACCOUNT.MOD_NO%TYPE, -- OFCL12.2 Not required
              pMod_no          IN      oltm_customer.MOD_NO%TYPE,
				pErrCode	OUT 	ERTBS_MSGS.ERR_CODE%TYPE )
   		return BOOLEAN;
-- Fcc 4.0 June 2002 changes starts
/* FUNCTION  fn_bic_hoff(   pBic_code       IN    oltm_bic_directory.BIC_CODE%TYPE,
          	          pMod_no         IN    oltm_bic_directory.MOD_NO%TYPE ,
              		  pErrCode	  OUT 	ERTBS_MSGS.ERR_CODE%TYPE )
                 RETURN BOOLEAN;*/
 FUNCTION  fn_bic_hoff(   pBic_code       IN    oltm_bic_directory.BIC_CODE%TYPE,
	-- pMod_no         IN    oltm_bic_directory.MOD_NO%TYPE ,
              		  pErrCode	  OUT 	ERTBS_MSGS.ERR_CODE%TYPE )
                 RETURN BOOLEAN;

 FUNCTION   fn_customer_hoff(     pCust_no       IN    oltm_customer.CUSTOMER_NO%TYPE,
				   pMod_no        IN    oltm_customer.MOD_NO%TYPE,
              		           pErrCode	  OUT 	ERTBS_MSGS.ERR_CODE%TYPE )
      RETURN  BOOLEAN;


FUNCTION fn_crfn_batch_handoff
	   		(
		 	p_Contract_ref_no	in		 oltbs_contract.contract_ref_no%TYPE,	
			p_Operation_code	in  	 char,
			p_Actioncode		in 		 char,																																																					   	
		 	p_Handoff	    	in 		 oltbs_daily_log_ac%ROWTYPE,
			p_Approval_reqd		in	 	 char,
			p_Error_code		in 	 out varchar2,
			p_Error_parameter   in	 out varchar2
			)
			return boolean;

FUNCTION fn_crfn_batch_respond
		 (
		 p_handoff_seq_no	IN   	 oltbs_crfn_txn_handoff.handoff_seq_no%TYPE,
		 p_contract_ref_no	IN	 	 oltbs_contract.contract_ref_no%TYPE,
		 p_event_seq_no		IN	 	 oltbs_crfn_appr_resp.event_sr_no%TYPE,
		 P_event_code 		IN 		 oltbs_crfn_txn_master.event_code%TYPE,
		 p_acc_entry_sr_no	IN		 oltbs_crfn_appr_resp.acc_entry_sr_no%TYPE,
		 p_response_code	IN		 char,
		 p_error_code		IN  OUT  varchar2,
		 p_error_parameter	IN  OUT  varchar2
		 )
RETURN BOOLEAN ;

FUNCTION fn_crfn_populate_handoff
		 (
		 p_operation_code      	IN		oltbs_crfn_txn_handoff.operation_code%TYPE,
		 p_deletion_type		IN		oltbs_crfn_txn_handoff.deletion_type%TYPE,
		 p_event_sr_no		IN		oltbs_crfn_appr_resp.event_sr_no%TYPE,
	       p_event_code 		IN 		oltbs_crfn_txn_master.event_code%TYPE,
		 p_autoflag			IN		oltbs_crfn_appr_resp.auto_flag%TYPE,																																																																																																																																																	
		 p_contract_ref_no	IN		oltbs_crfn_txn_master.contract_ref_no%TYPE,
		 p_error_code		IN  OUT	varchar2,
		 p_error_parameter	IN  OUT	varchar2
		 )
		RETURN boolean ;
FUNCTION 	fn_crfn_read_appr_resp
			
	(p_process_appr		IN		varchar2,
	 p_process_rejt		IN		varchar2,
	 p_process_no_resp	IN		varchar2,
	 p_error_code 		IN OUT	   varchar2,
	 p_error_parameter	IN OUT 	varchar2
	)	
RETURN BOOLEAN ;
-----------------------------------------------------------------------------------------------------------------------
-- Added function to do the handoff for the contracts which are deleted form the hold. 03-04-2001
-----------------------------------------------------------------------------------------------------------------------
FUNCTION fn_hoff_held_contract_delete	(p_Contract_ref_no	IN		oltbs_contract.contract_ref_no%TYPE
							)RETURN BOOLEAN ;
-----------------------------------------------------------------------------------------------------------------------
-- End of Changes BEFADB Namit 03-04-2001
-----------------------------------------------------------------------------------------------------------------------
end ;
/