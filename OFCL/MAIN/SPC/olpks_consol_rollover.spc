CREATE OR REPLACE PACKAGE olpks_consol_rollover
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_consol_rollover.SPC
**
** Module		: LOANS AND DEPOSITS
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
/* CHANGE HISTORY
25-Sep-2009 FLEXCUBE V.CL Release 7.5 lot3 ITR1 SFR#105 Branch Code condition is added in fn_rollover_batch
30-March-2018 14.1_LS-ELCM_ROLLOVER_TRACKING for consolerolovere operation tracking

  **Changed By         : Satheesh Seshan
  **Date               : 29-Sep-2021
  **Change Description : Special amt in rollver tab for consol rollover - commitment balance update
  **Search String      : BUG#33366692
  
  **  Changed By         : Vineeth T M
  **  Changed On         : 31-Jul-2023
  **  Change Description : enabling eca for all components - charge related changes for rollover/reprice
  **  Search String      : OBCL_14.8_ECA_1_Changes
*/

 elutils_pkg_source_code VARCHAR2(9) := ''; --CONSOLRVR as value set for elcm tracking in fn_consol_rollover 14.1_LS-ELCM_ROLLOVER_TRACKING

	g_sum_parent_cont_amt oltbs_contract_balance.principal_outstanding_bal%TYPE; --BUG#33366692 added

FUNCTION fn_consol_rollover
		(
		  p_contract_ref_no  	 IN     oltbs_contract.contract_ref_no%TYPE,
		  p_processing_date	 	 IN     DATE,
		  p_auth_status 		 IN     oltbs_contract.auth_status%TYPE,
		  p_error_code		     IN OUT	VARCHAR2,
		  p_error_parameter	     IN OUT	VARCHAR2
	 	)
RETURN BOOLEAN;


FUNCTION  fn_rollover_batch
		(
		  p_branch		 IN 	oltms_branch.branch_code%TYPE,--FLEXCUBE V.CL Release 7.5 lot3 ITR1 SFR#105
		  p_processing_date      IN  	DATE,
		  p_commit_frequency	 IN		OLTBS_COMMITFREQ.eod_commit_count%TYPE,
	 	  p_error_code		     IN OUT VARCHAR2,
		  p_error_parameter	     IN OUT VARCHAR2
		)
RETURN BOOLEAN;

  --OBCL_14.8_ECA_1_Changes start
  FUNCTION Fn_Process_Roll_Eca(p_Branch          IN Oltbs_Contract.Branch%TYPE,
                               p_User_Id         IN VARCHAR2,
                               p_Contract_Ref_No IN Lbtbs_Contract_Consol_Master.Contract_Ref_No%TYPE,
                               p_Processingdate  IN DATE,
                               p_Eca_Ref_No      OUT VARCHAR2,
                               p_Error_Code      IN OUT VARCHAR2,
                               p_Error_Parameter IN OUT VARCHAR2)
  RETURN VARCHAR2;
  
  FUNCTION Fn_Rollover_Batch_Contract(p_Contract_Ref_No    IN Oltbs_Contract_Consol_Master.Contract_Ref_No%TYPE,
                                      p_Eca_Check_Required IN VARCHAR2,
                                      p_Branch             IN Oltms_Branch.Branch_Code%TYPE, 
                                      p_User_Id            IN VARCHAR2,
                                      p_Processing_Date    IN DATE,
                                      p_Eca_Ref_No         IN VARCHAR2,
                                      p_Elcm_Msgid         IN OUT VARCHAR2,
                                      p_rfr_Msgid          IN OUT VARCHAR2,
                                      p_Error_Code         IN OUT NOCOPY VARCHAR2, 
                                      p_Error_Parameter    IN OUT NOCOPY VARCHAR2 
                                      ) RETURN VARCHAR2;
  --OBCL_14.8_ECA_1_Changes end


END olpks_consol_rollover;
/
CREATE or replace SYNONYM olpkss_consol_rollover for olpks_consol_rollover
/