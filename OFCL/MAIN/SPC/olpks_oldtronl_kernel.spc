CREATE OR REPLACE PACKAGE olpks_oldtronl_kernel AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_oldtronl_kernel.spc
  **
  ** Module     : Loans and Deposits
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
  
  **Changed By         : Abhinav Bhasker
  **Date               : 08-May-2020
  **Change Description : Changes w.r.t. Force Calc for SOFR Comp.
  **Search String      : OBCL_SOFR_Force_Calc
  
  **Changed By         : Mohan Pal
  **Date               : 18-Jun-2020
  **Change Description : SOFR changes for Backdated_RFR_auto_auth_issue
  **Search String     : Backdated_RFR_auto_auth_issue

  **Changed By         : ArunaDevi Rajendran
  **Date               : 23-SEP-2020
  **Change Description : Added new global variable to repickup the disbursement split settlement
  **Search String      : OBCL_14.4_DSBR_SplitSettlementAmount
  
	**  Changed By         : Chandra Prasath N
	**  Date               : 12-May-2021
	**  Change Description : Added code for 24/7 operation.                                                                   
	**  Search String      : OBCL_14.5_24_7 Changes

  **Changed By         : Satheesh Seshan
  **Date               : 24-Jun-2022
  **Change Description : Added new global variable to identify RFR Int calc required during ROLL.
  **Search String      : Bug#34184220

  **Changed By         : Abhinav Bhasker
  **Changed On         : 06-Aug-2022
  **Change Description : Changes to enable Display of Payment Schedule if for Current Dated Contract has Currency Holiday on Value Date, i.e. Contract is current Dated, 
						 but DSBR moved to Future Date because of Holiday
  **Search String      : Bug#34428174
  
  **Changed By         : Abhinav Bhasker
  **Changed On         : 18-Aug-2022
  **Change Description : Changes to enable Display of Payment Schedule if for Current Dated Contract has Currency Holiday on Value Date, i.e. Contract is current Dated, 
						 but DSBR moved to Future Date because of Holiday + g_ftr_dtd_dsbr_action_code
  **Search String      : Bug#34428174_2
 
    **Changed By         : Mohan Pal
	**Date               : 26-Mar-2023
	**Change Description : FWDPORT of 36367860 Increased the size of the variable g_ORGACTCOD
	**Search String      : Bug#36392257
	
	
	**Changed By         : RAMYA M
	**Date               : 25-July-2024
	**Change Description : Version Rollover delete amend changes
	**Search String      : OBCL_14.8_VERSION_ROLL_DEL_AMEND CHANGES	
	
		     
   **Changed By         : Sudharshini Balaji
   **Date               : 03-Aug-2024
   **Change Description : Added code to assign g_rfr_crn_unlock_bef_1stauth  flag to 
						  1 during RFR-ELCM unlock before first auth so that RFR will go in sequence 1 followed by ELCM.
   **Search String      : Bug#36860409_1
   
   **Changed By         : Sudharshini Balaji
   **Date               : 13-Dec-2024
   **Change Description : Moved g_Event_Log_Cnt_a from sql - unlock before first auth to be checked during Contract deletion in ELCM call
   **Search String      : Bug#37380040 
  -------------------------------------------------------------------------------------------------------
  */
  g_Event_Log_Cnt_a NUMBER := 0; --$$ Bug#37380040 changes
  g_Force_Accr_Flag	VARCHAR2(1 CHAR) DEFAULT 'N'; --OBCL_SOFR_Force_Calc
  ---------Backdated_RFR_auto_auth_issue------------------------------------------
  g_Is_auto_auth            VARCHAR2(1) := 'N';
 -- g_ORGACTCOD varchar2(10);---Bug#36392257 commented 
  g_ORGACTCOD varchar2(100);---Bug#36392257 added 
  ----------Backdated_RFR_auto_auth_issue------------------------------------------
  g_repickup_dsbrsplit    VARCHAR2(1 CHAR) DEFAULT 'N';--OBCL_14.4_DSBR_SplitSettlementAmount
  g_cont_processing            VARCHAR2(1) := 'N'; --PEN_25_Sep_2020 SOFR changes

  g_27_7_processing            VARCHAR2(1) := 'N'; --OBCL_14.5_24_7 Changes

  g_Roll_Catchup_Int_Calc_Reqd    VARCHAR2(1) := 'N'; --Bug#34184220 added
  g_actv_cont_ftr_dtd_dsbr      VARCHAR2(1) := 'N';-- Bug#34428174
  g_ftr_dtd_dsbr_action_code     VARCHAR2(20) := NULL;--Bug#34428174_2
  G_VER_ROLL_DELETE VARCHAR2(1):='N';---OBCL_14.8_VERSION_ROLL_DEL_AMEND CHANGES  
    g_rfr_crn_unlock_bef_1stauth     NUMBER :=0 ;--$$ Bug#36860409_1 changes
  PROCEDURE Pr_Skip_Handler(P_Stage IN VARCHAR2);
  FUNCTION Fn_Post_Build_Type_Structure(p_Source           IN VARCHAR2,
                                        p_Source_Operation IN VARCHAR2,
                                        p_Function_Id      IN VARCHAR2,
                                        p_Action_Code      IN VARCHAR2,
                                        p_Child_Function   IN VARCHAR2,
                                        p_Addl_Info        IN Cspks_Req_Global.Ty_Addl_Info,
                                        p_oldtronl         IN OUT olpks_oldtronl_main.ty_oldtronl,
                                        p_Err_Code         IN OUT VARCHAR2,
                                        p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Pre_Check_Mandatory(p_Source           IN VARCHAR2,
                                  p_Source_Operation IN VARCHAR2,
                                  p_Function_Id      IN VARCHAR2,
                                  p_Action_Code      IN VARCHAR2,
                                  p_Child_Function   IN VARCHAR2,
                                  p_pk_or_full       IN VARCHAR2 DEFAULT 'FULL',
                                  p_oldtronl         IN OUT olpks_oldtronl_main.ty_oldtronl,
                                  p_Err_Code         IN OUT VARCHAR2,
                                  p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Post_Check_Mandatory(p_Source           IN VARCHAR2,
                                   p_Source_Operation IN VARCHAR2,
                                   p_Function_Id      IN VARCHAR2,
                                   p_Action_Code      IN VARCHAR2,
                                   p_Child_Function   IN VARCHAR2,
                                   p_Pk_Or_Full       IN VARCHAR2 DEFAULT 'FULL',
                                   p_oldtronl         IN olpks_oldtronl_main.ty_oldtronl,
                                   p_Err_Code         IN OUT VARCHAR2,
                                   p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Pre_Default_And_Validate(p_Source           IN VARCHAR2,
                                       p_Source_Operation IN VARCHAR2,
                                       p_Function_Id      IN VARCHAR2,
                                       p_Action_Code      IN VARCHAR2,
                                       p_Child_Function   IN VARCHAR2,
                                       p_oldtronl         IN olpks_oldtronl_main.ty_oldtronl,
                                       p_prev_oldtronl    IN OUT olpks_oldtronl_main.ty_oldtronl,
                                       p_wrk_oldtronl     IN OUT olpks_oldtronl_main.ty_oldtronl,
                                       p_Err_Code         IN OUT VARCHAR2,
                                       p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Post_Default_And_Validate(p_Source           IN VARCHAR2,
                                        p_Source_Operation IN VARCHAR2,
                                        p_Function_Id      IN VARCHAR2,
                                        p_Action_Code      IN VARCHAR2,
                                        p_Child_Function   IN VARCHAR2,
                                        p_oldtronl         IN olpks_oldtronl_main.ty_oldtronl,
                                        p_prev_oldtronl    IN OUT olpks_oldtronl_main.ty_oldtronl,
                                        p_wrk_oldtronl     IN OUT olpks_oldtronl_main.ty_oldtronl,
                                        p_Err_Code         IN OUT VARCHAR2,
                                        p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Pre_Resolve_Ref_Numbers(p_Source           IN VARCHAR2,
                                      p_Source_Operation IN VARCHAR2,
                                      p_Function_Id      IN VARCHAR2,
                                      p_Action_Code      IN VARCHAR2,
                                      p_oldtronl         IN OUT olpks_oldtronl_main.ty_oldtronl,
                                      p_Err_Code         IN OUT VARCHAR2,
                                      p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Post_Resolve_Ref_Numbers(p_Source           IN VARCHAR2,
                                       p_Source_Operation IN VARCHAR2,
                                       p_Function_Id      IN VARCHAR2,
                                       p_Action_Code      IN VARCHAR2,
                                       p_oldtronl         IN OUT olpks_oldtronl_main.ty_oldtronl,
                                       p_Err_Code         IN OUT VARCHAR2,
                                       p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Pre_Product_Default(p_Source           IN VARCHAR2,
                                  p_Source_Operation IN VARCHAR2,
                                  p_Function_id      IN VARCHAR2,
                                  p_Action_Code      IN VARCHAR2,
                                  p_oldtronl         IN olpks_oldtronl_main.ty_oldtronl,
                                  p_wrk_oldtronl     IN OUT olpks_oldtronl_main.ty_oldtronl,
                                  p_Err_Code         IN OUT VARCHAR2,
                                  p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Post_Product_Default(p_Source           IN VARCHAR2,
                                   p_Source_Operation IN VARCHAR2,
                                   p_Function_Id      IN VARCHAR2,
                                   p_Action_Code      IN VARCHAR2,
                                   p_oldtronl         IN olpks_oldtronl_main.ty_oldtronl,
                                   p_wrk_oldtronl     IN OUT olpks_oldtronl_main.ty_oldtronl,
                                   p_Err_Code         IN OUT VARCHAR2,
                                   p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Pre_Unlock(p_Source           IN VARCHAR2,
                         p_Source_Operation IN VARCHAR2,
                         p_Function_Id      IN VARCHAR2,
                         p_Action_Code      IN OUT VARCHAR2,
                         p_oldtronl         IN olpks_oldtronl_main.ty_oldtronl,
                         p_Err_Code         IN OUT VARCHAR2,
                         p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Post_Unlock(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN OUT VARCHAR2,
                          p_oldtronl         IN olpks_oldtronl_main.ty_oldtronl,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Pre_Subsys_Pickup(p_Source           IN VARCHAR2,
                                p_Source_Operation IN VARCHAR2,
                                p_Function_Id      IN VARCHAR2,
                                p_Action_Code      IN VARCHAR2,
                                p_oldtronl         IN olpks_oldtronl_main.ty_oldtronl,
                                p_prev_oldtronl    IN OUT olpks_oldtronl_main.ty_oldtronl,
                                p_wrk_oldtronl     IN OUT olpks_oldtronl_main.ty_oldtronl,
                                p_Err_Code         IN OUT VARCHAR2,
                                p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Post_Subsys_Pickup(p_Source           IN VARCHAR2,
                                 p_Source_Operation IN VARCHAR2,
                                 p_Function_Id      IN VARCHAR2,
                                 p_action_code      IN VARCHAR2,
                                 p_oldtronl         IN olpks_oldtronl_main.ty_oldtronl,
                                 p_prev_oldtronl    IN OUT olpks_oldtronl_main.ty_oldtronl,
                                 p_wrk_oldtronl     IN OUT olpks_oldtronl_main.ty_oldtronl,
                                 p_Err_Code         IN OUT VARCHAR2,
                                 p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Pre_Enrich(p_Source           IN VARCHAR2,
                         p_Source_Operation IN VARCHAR2,
                         p_Function_Id      IN VARCHAR2,
                         p_Action_Code      IN VARCHAR2,
                         p_oldtronl         IN olpks_oldtronl_main.ty_oldtronl,
                         p_prev_oldtronl    IN OUT olpks_oldtronl_main.ty_oldtronl,
                         p_wrk_oldtronl     IN OUT olpks_oldtronl_main.ty_oldtronl,
                         p_Err_Code         IN OUT VARCHAR2,
                         p_err_params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Post_Enrich(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_oldtronl         IN olpks_oldtronl_main.ty_oldtronl,
                          p_prev_oldtronl    IN OUT olpks_oldtronl_main.ty_oldtronl,
                          p_wrk_oldtronl     IN OUT olpks_oldtronl_main.ty_oldtronl,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Pre_Upload_Db(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_Child_Function   IN VARCHAR2,
                            p_Multi_Trip_Id    IN VARCHAR2,
                            p_oldtronl         IN olpks_oldtronl_main.ty_oldtronl,
                            p_prev_oldtronl    IN olpks_oldtronl_main.ty_oldtronl,
                            p_wrk_oldtronl     IN OUT olpks_oldtronl_main.ty_oldtronl,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Post_Upload_Db(p_Source           IN VARCHAR2,
                             p_Source_Operation IN VARCHAR2,
                             p_Function_Id      IN VARCHAR2,
                             p_Action_Code      IN VARCHAR2,
                             p_Child_Function   IN VARCHAR2,
                             p_Multi_Trip_Id    IN VARCHAR2,
                             p_oldtronl         IN olpks_oldtronl_main.ty_oldtronl,
                             p_prev_oldtronl    IN olpks_oldtronl_main.ty_oldtronl,
                             p_wrk_oldtronl     IN OUT olpks_oldtronl_main.ty_oldtronl,
                             p_Err_Code         IN OUT VARCHAR2,
                             p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Pre_Process(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_Child_Function   IN VARCHAR2,
                          p_Multi_Trip_Id    IN VARCHAR2,
                          p_oldtronl         IN olpks_oldtronl_main.ty_oldtronl,
                          p_prev_oldtronl    IN olpks_oldtronl_main.ty_oldtronl,
                          p_wrk_oldtronl     IN OUT olpks_oldtronl_main.ty_oldtronl,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Post_Process(p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_id      IN VARCHAR2,
                           p_Action_Code      IN VARCHAR2,
                           p_Child_Function   IN VARCHAR2,
                           p_Multi_Trip_Id    IN VARCHAR2,
                           p_oldtronl         IN olpks_oldtronl_main.ty_oldtronl,
                           p_prev_oldtronl    IN olpks_oldtronl_main.ty_oldtronl,
                           p_wrk_oldtronl     IN OUT olpks_oldtronl_main.ty_oldtronl,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Pre_Query(p_Source           IN VARCHAR2,
                        p_Source_Operation IN VARCHAR2,
                        p_Function_Id      IN VARCHAR2,
                        p_Action_Code      IN VARCHAR2,
                        p_Child_Function   IN VARCHAR2,
                        p_Full_Data        IN VARCHAR2 DEFAULT 'Y',
                        p_with_Lock        IN VARCHAR2 DEFAULT 'N',
                        p_QryData_Reqd     IN VARCHAR2,
                        p_oldtronl         IN olpks_oldtronl_main.ty_oldtronl,
                        p_wrk_oldtronl     IN OUT olpks_oldtronl_main.ty_oldtronl,
                        p_Err_Code         IN OUT VARCHAR2,
                        p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Post_Query(p_Source           IN VARCHAR2,
                         p_Source_Operation IN VARCHAR2,
                         p_Function_Id      IN VARCHAR2,
                         p_Action_Code      IN VARCHAR2,
                         p_Child_Function   IN VARCHAR2,
                         p_Full_Data        IN VARCHAR2 DEFAULT 'Y',
                         p_With_Lock        IN VARCHAR2 DEFAULT 'N',
                         p_QryData_Reqd     IN VARCHAR2,
                         p_oldtronl         IN olpks_oldtronl_main.ty_oldtronl,
                         p_wrk_oldtronl     IN OUT olpks_oldtronl_main.ty_oldtronl,
                         p_Err_Code         IN OUT VARCHAR2,
                         p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

END olpks_oldtronl_kernel;
/