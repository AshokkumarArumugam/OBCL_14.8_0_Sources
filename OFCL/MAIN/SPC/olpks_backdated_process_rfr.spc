create or replace package olpks_backdated_process_rfr is
/*----------------------------------------------------------------------------------------
**
** File Name    : olpks_backdated_process_rfr.SPC
**
** Module       : OL
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------*/

/*------------------------------------------CHANGE HISTORY----------------------------------

  **Created By         : ArunPrasath
  **Date               : 15-May-2020
  **Change Description : Back dated accrual Function added for RFR components	
  
  **Changed By         : Mohan Pal
  **Date               : 18-Jun-2020
  **Change Description : SOFR changes for Backdated_RFR_auto_auth_issue
  **Search String     : Backdated_RFR_auto_auth_issue
  
  **Changed By         : Arunprasath
  **Date               : 03-Jul-2020
  **Change Description : Added global variable for auto auth 
  **Search String      : OBCL_14.4_AUTO_AUTH_SOFR

   **Changed By         : Satheesh Seshan
   **Date               : 24-Jun-2022
   **Change Description : Added global variable for ASYNC comm mode during backdated call.
   **Search String      : Bug#34184220 
   
  **Changed By         : Chandra Achuta
  **Date               : 12-JUL-2023
  **Change Description : BOOK - Created 6 months back dated RFR contract with liquidate back value dated schedules as N. Maintained Monthly schedules, penalty calculated proper.
                         CAMD - Changed to Quarterly, post save monthly schedule penalty amount should be reverse.
  **Search String      : Bug#35516293  
  
  **Changed By         : Sudharshini Balaji
  **Date               : 07-Feb-2025
  **Change Description : Added new Global variable for recursive ECA call
  **Search String      : Bug#37320854
----------------------------------------------------------------------------------------*/

  g_Roll_Catchup_Int_Calc_Async VARCHAR2(1):='N';  --Bug#34184220 added
  g_eca_rfr_msgid               oltb_req_master.MSGID%TYPE; --$$ Bug#37320854 CHANGES
  
  
  FUNCTION fn_backdated_process_rfr(p_user            IN smtbs_user.user_id%TYPE, -- RFR_Adapter_Message_changes
  p_event    IN  oltb_rfr_interest_master.processing_event%TYPE,
  p_contract_ref_no  IN  oltb_contract.contract_ref_no%TYPE,
  p_processing_date IN  date,
  p_effective_date  IN  date,
  P_Err_Code    IN OUT  varchar2,
                                    p_params          IN OUT VARCHAR2,
									p_msgid       IN OUT VARCHAR2     --Bug#35516293  Added MSGID parameter
									)
  RETURN VARCHAR2;

  PROCEDURE	pr_dbg (msg IN VARCHAR2);
  debug_mode		CHAR(1) := 'Y';
  
  
  ------Backdated_RFR_auto_auth_issue starts----
  p_Source  VARCHAR2(50);
  p_Source_Operation VARCHAR2(50);
  p_Function_Id VARCHAR2(50);
  p_Action_Code VARCHAR2(50);
  g_Is_auto_auth VARCHAR2(1) := 'N'; --OBCL_14.4_AUTO_AUTH_SOFR
  ------Backdated_RFR_auto_auth_issue ends----
  
  
END olpks_backdated_process_rfr;
/
create or replace synonym olpkss_backdated_process_rfr for olpks_backdated_process_rfr
/