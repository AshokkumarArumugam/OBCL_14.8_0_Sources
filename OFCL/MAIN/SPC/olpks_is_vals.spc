CREATE OR REPLACE PACKAGE olpks_is_vals
AS
/*------------------------------------------------------------------------------------------------
**
** File Name	: olpks_is_vals.SPC
**
** Module		: SETTLEMENT INSTRUCTIONS
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
/*

CHANGE HISTORY

31-MAY-02 FCC4.0 JUNE 2002 Changes done for bic code propagation in the OLTM_BIC table of the other nodes

08-AUG-2003 FCC4.3 AUG 2003 FX/MM changes
	--	Added parameters p_module, p_save_without_ac to fn_validate
09-OCT-2003 FCC 4.4 DEC 2003 Fast Settlement Change :Moved function declaration fn_validate_acc_class_type
								     to package specification from package body
								     
09-APR-2004 FCC 4.5 Lot2 Retro changes
					1. 4.0 Bic propagation changes are incorporated.
					2. Copyright and Change History moved below CREATE OR REPLACE command.  
					3. SHO ERR added at the end of the package.


*/


FUNCTION fn_validate 
			(p_ho_branch			IN		oltms_branch.BRANCH_CODE%TYPE
			,p_cont_ref_no			IN		oltbs_contract.CONTRACT_REF_NO%TYPE
			,p_esn				IN		oltbs_contract.LATEST_EVENT_SEQ_NO%TYPE
			--
			--FCC4.3 FX/MM changes start
			--
			,p_module			 	IN 		oltbs_contract.module_code%TYPE
			,p_save_without_settle_ac	IN 		VARCHAR2
			--
			--FCC4.3 FX/MM changes end
			--
			,p_err_code				IN	OUT	VARCHAR2
			,p_params				IN	OUT	VARCHAR2
			)
RETURN BOOLEAN;

FUNCTION FN_CHECK_RATE_VARIANCE(p_ISTBS_CONTRACTIS	IN		oltbs_settlements%ROWTYPE
					,p_err_code			IN	OUT	VARCHAR2
					,p_params			IN	OUT	VARCHAR2) 
RETURN BOOLEAN;

--fcc4.0 june 2002  Changes done for bic code

-- FCC 4.5 Lot2 Retro changes
-- Start
/*
 function fn_propagate_bic(
              --p_curr_node IN oltms_branch.branch_code%type
              p_branch_code 	IN 	oltms_branch.branch_code%type,
            p_bic_code  IN oltms_bic.bic_code%TYPE
            )
 return boolean;
 procedure pr_job_bic(pJob 	IN    INTEGER,
	             p_bic_code IN    oltms_bic.bic_code%type,
	             pNode    	IN    oltms_branch_node.node%TYPE
		     ); 
*/

function fn_propagate_bic(
              p_branch_code 	IN oltms_branch.branch_code%type
            , p_bic_code  	IN oltms_bic.bic_code%TYPE
            )
return boolean;
-- FCC 4.5 Lot2 Retro changes
-- End

-------------------------------------------------------------------------------------------------------
--
-- 09-OCT-2003 FCC 4.4 Dec 2003 Fast Settlement Change starts (Moved from package body to specs)
--
FUNCTION fn_validate_acc_class_type
      (
      p_account				IN		oltbs_settlements.account%TYPE,
      p_acc_branch			IN 		oltbs_settlements.acc_branch%TYPE,
      p_instruction_type		IN		oltbs_settlements.instruction_type%TYPE,
      p_acc_cif				IN		oltbs_settlements.acc_cif%TYPE,
      p_error_code			IN OUT	VARCHAR2,
      p_error_parameter			IN OUT	VARCHAR2
      )
RETURN BOOLEAN;

--
-- 09-OCT-2003 FCC 4.4 Dec 2003 Fast Settlement Change ends
--
-------------------------------------------------------------------------------------------------------

PROCEDURE pr_remote_bic_ins(
			 P_BIC_CODE               	IN	OLTM_BIC.BIC_CODE%type
		   	, P_BANK_NAME              	IN	OLTM_BIC.BANK_NAME%type
			, P_INTERNAL_ADDRESS      IN	OLTM_BIC.INTERNAL_ADDRESS%type
			, P_MOD_NO                 	IN	OLTM_BIC.MOD_NO%type
			, P_RECORD_STAT            	IN	OLTM_BIC.RECORD_STAT%type
			, P_AUTH_STAT              	IN	OLTM_BIC.AUTH_STAT%type
			, P_ONCE_AUTH              	IN	OLTM_BIC.ONCE_AUTH%type
			, P_MAKER_ID               	IN	OLTM_BIC.MAKER_ID%type
			, P_MAKER_DT_STAMP        IN	OLTM_BIC.MAKER_DT_STAMP%type
			, P_CHECKER_ID             	IN	OLTM_BIC.CHECKER_ID%type
			, P_CHECKER_DT_STAMP     IN	OLTM_BIC.CHECKER_DT_STAMP%type
                     );
--fcc4.0 june 2002  Changes done for bic code ends

PROCEDURE pr_job_bic
		(
		pjob 			IN    INTEGER,
		p_bic_code 		IN    oltms_bic.bic_code%TYPE,
		pnode    		IN    oltms_branch_node.node%TYPE
		);


END olpks_is_vals;
/
-- FCC 4.5 Lot2 Retro changes
create or replace synonym olpkss_is_vals for olpks_is_vals
/