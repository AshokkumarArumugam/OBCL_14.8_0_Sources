CREATE OR REPLACE PACKAGE olpks_oldtraut_utils IS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_oldtraut_utils.spc
  **
  ** Module     : Loans and Commitments
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Oracle Banking Corporate Lending  Software Product.   Copyright © 2018.  All rights reserved
  **
  **
  ** No part of this work may be reproduced, stored in a retrieval system, adopted
  ** or transmitted in any form or by any means, electronic, mechanical,
  ** photographic, graphic, optic recording or otherwise, translated in any
  ** language or computer language, without the prior written permission of
  ** Oracle and/or its affiliates.
  **
  ** Oracle Financial Services Software Limited.
  ** Oracle Park, Off Western Express Highway,
  ** Goregaon (East),
  ** Mumbai - 400 063, India
  ** India
  -------------------------------------------------------------------------------------------------------
  CHANGE HISTORY
  
  SFR Number         :
  Changed By         :
  Change Description :
  
  **Changed By         : Reghuraj
  **Date               : 28-Jan-2022
  **Change Description : Issue with commitment contract utilization post exchange rate amendment 
  **Search String      : Bug#33772611
  
  **Changed By         : Rashmi BV
  **Date               : 05-Apr-2023
  **Change Description : OLDTRONL - REVN MESSAGE IS UNGENERATED 
  **Search String      : Bug#35194852
  
  **Changed By         : Abhinav Kumar
  **Date               : 27-Sept-2024
  **Change Description : OLDTRONL - Backdated Loan with autoauth user, even after Suppress Back Value Payment Message flag checked- Advices getting generated.
                          commenting Bug#35194852 changes and handling the same in Olpks_Adv_Misc for autoauthand non auto auth user. 
  **Search String      : Bug#37084673
  -------------------------------------------------------------------------------------------------------
  */
  --g_back_dated_contract         VARCHAR2(1) := 'N'; -- Bug#35194852  --Bug#37084673 --Commented
  FUNCTION Fn_Populate_Data(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_Child_Function   IN VARCHAR2,
                            p_Full_Data        IN VARCHAR2 DEFAULT 'Y',
                            p_With_Lock        IN VARCHAR2 DEFAULT 'N',
                            p_QryData_Reqd     IN VARCHAR2,
                            p_oldtraut         IN olpks_oldtraut_main.ty_oldtraut,
                            p_wrk_oldtraut     IN OUT olpks_oldtraut_main.ty_oldtraut,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_authorize_loan(p_Source           IN VARCHAR2,
                             p_Source_Operation IN VARCHAR2,
                             p_Function_Id      IN VARCHAR2,
                             p_Action_Code      IN VARCHAR2,
                             p_wrk_oldtraut     IN OUT olpks_oldtraut_main.ty_oldtraut,
                             p_Err_Code         IN OUT VARCHAR2,
                             p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
FUNCTION Fn_check_dual_auth(p_contract_ref_no IN VARCHAR2,
                              p_err_code        OUT VARCHAR2,
                              p_err_param       OUT VARCHAR2) RETURN BOOLEAN;
	
--Bug#33772611 start
procedure  pr_pop_exrate_master_roll(P_CONTRACT_REF_NO varchar2,
                                     P_PROCESS_CODE varchar2,
                                     P_VALUE_DATE date);							  
--Bug#33772611 end	

END olpks_oldtraut_utils;
/
CREATE OR REPLACE SYNONYM olpkss_oldtraut_utils FOR olpks_oldtraut_utils
/
