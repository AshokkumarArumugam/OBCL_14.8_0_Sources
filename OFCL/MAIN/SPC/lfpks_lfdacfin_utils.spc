CREATE OR REPLACE PACKAGE Lfpks_Lfdacfin_Utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lfpks_lfdacfin_kernel.sql
  **
  ** Module     : The ICCF
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved
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
  
  SFR Number         :29583890
  Changed By         :Chandra Achuta
  Change Description :Done code changes for settlement pickup and upload related changes.
  search string       :Bug#29583890 
  
    **Changed By         : Pallavi R/Janki/Abhinav
    **Date               : 17-Jan-2020
    **Change Description : Done code changes for amortization fees to support for LB and FC modules.
    **Search String      : OBCL_14.4_LS_Adhoc_Fee Changes 
    
    
     **Changed By         : anusha k
  **Date           : 05-DEC-2022
  **Change Description : Added hook for fn_query
  **Search String      : OBCL_14.6_SUPP#34856791 Changes   

    **Changed By         : Satheesh Seshan
    **Date               : 26-Apr-2023
    **Change Description : Assign g_Amend_Amount_diff fee amt value. Fwd ported using 35231005.
    **Search String      : Bug#35211565
    
    **Changed By         : Narendra Dhaker
    **Date               : 11-OCT-2023
    **Change Description : UNABLE TO SEE DELETE OR AUTHORIZE BUTTON IN REVERSAL OF LFDACFIN
    **Search String      : Bug#35834900	    
  -------------------------------------------------------------------------------------------------------
  */
  
  ----OBCL_14.6_SUPP#34856791 Changes starts
    --PROCEDURE Pr_Skip_Handler(P_Stage IN VARCHAR2);
  PROCEDURE Pr_Set_Skip_Kernel;
  PROCEDURE Pr_Set_Activate_Kernel;
  PROCEDURE Pr_Set_Skip_Cluster;
  PROCEDURE Pr_Set_Activate_Cluster;
  FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
  
  --OBCL_14.6_SUPP#34856791 Changes ends
  --OBCL_14.4_LS_Adhoc_Fee Changes Starts
  g_Amend_New_Comp_List VARCHAR2(32656);
  g_Amend_New_Default   VARCHAR2(1);
  TYPE Ty_Amend_Amount IS TABLE OF Lftb_Contract_Accr_Fee.Fee_Amount%TYPE INDEX BY VARCHAR2(35);
  g_Amend_Amount Ty_Amend_Amount; --Palr
  g_Amend_Amount_diff Ty_Amend_Amount; --Bug#35211565
  g_Felb_Esn     Oltb_Contract.Latest_Event_Seq_No%TYPE;
  g_Event        Oltb_Contract.Curr_Event_Code%TYPE;
  g_Adhoc_Fee    VARCHAR2(1) := 'N';  
  --OBCL_14.4_LS_Adhoc_Fee Changes Ends
  FUNCTION Fn_Check_Batch_Status(p_Prm_Batch_Status OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Chk_Unauth_On_Linkages(p_Source       IN VARCHAR2,
                                     p_Function_Id  IN VARCHAR2,
                                     p_Wrk_Lfdacfin IN OUT Lfpks_Lfdacfin_Main.Ty_Lfdacfin,
                                     p_Err_Code     IN OUT VARCHAR2,
                                     p_Err_Params   IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Overwritessi_Check(p_Source       IN VARCHAR2,
                                 p_Function_Id  IN VARCHAR2,
                                 p_Wrk_Lfdacfin IN OUT Lfpks_Lfdacfin_Main.Ty_Lfdacfin,
                                 p_Err_Code     IN OUT VARCHAR2,
                                 p_Err_Params   IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Acc_Freq_Validations(p_Source       IN VARCHAR2,
                                   p_Function_Id  IN VARCHAR2,
                                   p_Wrk_Lfdacfin IN OUT Lfpks_Lfdacfin_Main.Ty_Lfdacfin,
                                   p_Loop_Count   IN NUMBER,
                                   p_Err_Code     IN OUT VARCHAR2,
                                   p_Err_Params   IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Validation(p_Source       IN VARCHAR2,
                         p_Function_Id  IN VARCHAR2,
                         p_Action_Code  IN VARCHAR2,
                         p_Wrk_Lfdacfin IN OUT Lfpks_Lfdacfin_Main.Ty_Lfdacfin,
                         p_Loop_Count   IN NUMBER,
                         p_Err_Code     IN OUT VARCHAR2,
                         p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Validate_Schedules(p_Source       IN VARCHAR2,
                                 p_Function_Id  IN VARCHAR2,
                                 p_Action_Code  IN VARCHAR2,
                                 p_Wrk_Lfdacfin IN OUT Lfpks_Lfdacfin_Main.Ty_Lfdacfin,
                                 p_Loop_Count   IN NUMBER,
                                 p_Schedule_Sum OUT Lftbs_Contract_Schedules.Amount%TYPE,
                                 p_No_Of_Record OUT Lftbs_Contract_Schedules.No_Of_Schedules%TYPE,
                                 p_Err_Code     IN OUT VARCHAR2,
                                 p_Err_Param    IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Populate_Os_Fee_Amount(p_Source       IN VARCHAR2,
                                     p_Function_Id  IN VARCHAR2,
                                     p_Action_Code  IN VARCHAR2,
                                     p_Wrk_Lfdacfin IN OUT Lfpks_Lfdacfin_Main.Ty_Lfdacfin,
                                     p_Loop_Count   IN NUMBER,
                                     p_Err_Code     IN OUT VARCHAR2,
                                     p_Err_Param    IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_New(p_Source                   IN VARCHAR2,
                  p_Function_Id              IN VARCHAR2,
                  p_Action_Code              IN VARCHAR2,
                  p_Lfdacfin                 IN OUT Lfpks_Lfdacfin_Main.Ty_Lfdacfin,
                  p_Prm_Schedule_Redefine    IN OUT VARCHAR2,
                  p_Prm_Settlement_Processed IN OUT VARCHAR2,
                  p_Prm_Advices_Processed    IN OUT VARCHAR2,
                  p_Err_Code                 IN OUT VARCHAR2,
                  p_Err_Params               IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Create_Schedules(p_Source       IN VARCHAR2,
                               p_Function_Id  IN VARCHAR2,
                               p_Action_Code  IN VARCHAR2,
                               p_Wrk_Lfdacfin IN OUT Lfpks_Lfdacfin_Main.Ty_Lfdacfin,
                               p_Err_Code     IN OUT VARCHAR2,
                               p_Err_Param    IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Default_New(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_Lfdacfin         IN Lfpks_Lfdacfin_Main.Ty_Lfdacfin, --OBCL_14.4_LS_Adhoc_Fee Changes
                          p_Wrk_Lfdacfin     IN OUT Lfpks_Lfdacfin_Main.Ty_Lfdacfin,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  --OBCL_14.4_LS_Adhoc_Fee Changes Starts
  FUNCTION Fn_Fwd_Felr(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_Event_Code       IN VARCHAR2,
                       p_Event_Date       IN DATE,
                       p_Lfdacfin         IN Lfpks_Lfdacfin_Main.Ty_Lfdacfin,
                       p_Prev_Lfdacfin    IN Lfpks_Lfdacfin_Main.Ty_Lfdacfin,
                       p_Wrk_Lfdacfin     IN OUT Lfpks_Lfdacfin_Main.Ty_Lfdacfin,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Part_Ratio(p_Source           IN VARCHAR2,
                         p_Source_Operation IN VARCHAR2,
                         p_Function_Id      IN VARCHAR2,
                         p_Action_Code      IN VARCHAR2,
                         p_Lfdacfin         IN Lfpks_Lfdacfin_Main.Ty_Lfdacfin,
                         p_Wrk_Lfdacfin     IN OUT Lfpks_Lfdacfin_Main.Ty_Lfdacfin,
                         p_Err_Code         IN OUT VARCHAR2,
                         p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  --OBCL_14.4_LS_Adhoc_Fee Changes Ends
 --Bug#35834900	Changes Starts
  FUNCTION Fn_Get_Versionno(p_Contract_Ref_No IN VARCHAR2,
                            p_Version_No      IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Get_Liqdorder(p_Contract_Ref_No IN VARCHAR2,
                            p_Order           OUT NUMBER,
                            p_Liqd_Order      IN OUT NUMBER) RETURN BOOLEAN; 
 --Bug#35834900	Changes ends                         
                            
  FUNCTION Fn_Query(p_Source              IN VARCHAR2,
                    p_Source_Operation    IN VARCHAR2,
                    p_Function_Id         IN VARCHAR2,
                    p_Action_Code         IN VARCHAR2,
                    p_Wrk_Lfdacfin        IN OUT Lfpks_Lfdacfin_Main.Ty_Lfdacfin,
                    p_Latest_Event_Seq_No IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                    p_Err_Code            IN OUT VARCHAR2,
                    p_Err_Params          IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Update(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_Wrk_Lfdacfin     IN OUT Lfpks_Lfdacfin_Main.Ty_Lfdacfin,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Get_Subsys_Stat(p_Subsystem  IN VARCHAR2,
                              p_Subsysstat IN VARCHAR2) RETURN VARCHAR2;
  FUNCTION Fn_Upd_Subsys_Stat(p_Subsystem  IN VARCHAR2,
                              p_Stat       IN VARCHAR2,
                              p_Subsysstat IN VARCHAR2) RETURN VARCHAR2;
  --Bug#29583890  changes starts
  FUNCTION Fn_Subsys_Pickup(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_Lfdacfin         IN Lfpks_Lfdacfin_Main.Ty_Lfdacfin,
                            p_Prev_Lfdacfin    IN Lfpks_Lfdacfin_Main.Ty_Lfdacfin,
                            p_Wrk_Lfdacfin     IN OUT Lfpks_Lfdacfin_Main.Ty_Lfdacfin,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Subsys_Upload(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_Lfdacfin         IN Lfpks_Lfdacfin_Main.Ty_Lfdacfin,
                            p_Prev_Lfdacfin    IN Lfpks_Lfdacfin_Main.Ty_Lfdacfin,
                            p_Wrk_Lfdacfin     IN OUT Lfpks_Lfdacfin_Main.Ty_Lfdacfin,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --Bug#29583890  changes ends  
END Lfpks_Lfdacfin_Utils;
/
CREATE OR REPLACE Synonym Lfpkss_Lfdacfin_Utils FOR Lfpks_Lfdacfin_Utils
/