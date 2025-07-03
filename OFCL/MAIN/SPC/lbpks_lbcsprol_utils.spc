CREATE OR REPLACE PACKAGE Lbpks_Lbcsprol_Utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbcsprol_utils.spc
  **
  ** Module     : Syndication Loans and Commitments
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
  
  
   Changed By          : ANUSHA K
    Change Description  : OBCL_14.3_LS_Sublimit_Validation_Changes
    Search String       : OBCL_14.3_LS_Sublimit_Validation_Changes
    Changed On          : 06-MAR-2019
   
  Changed By         : Mohan Pal
  Changed On         : 08-Jun-2021
  Change Description : Split Roll Maturity Date Update(INV SVN SYNC)
  Search String      : Bug#33704371
  
  Changed By         : Mohan Pal
  Changed On         : 06-NOV-2023
  Change Description : Moved the code logic and created the function Fn_process_Margin_Comp
  Search String      : Bug#35972477


  **  Changed By         : Mohan Pal
  **  Changed On         : 06-Nov-2023
  **  Change Description : Hook request for lbpks_lbcsprol_utils
  **  Search String      : Bug#35972477
  
  -------------------------------------------------------------------------------------------------------*/
  
      --Bug#35972477  Changes Starts
    PROCEDURE Pr_Set_Skip_Kernel;
    PROCEDURE Pr_Set_Activate_Kernel;
    PROCEDURE Pr_Set_Skip_Cluster;
    PROCEDURE Pr_Set_Activate_Cluster;
    FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
    FUNCTION Fn_Skip_Cluster RETURN BOOLEAN;
    FUNCTION Fn_Skip_Custom RETURN BOOLEAN;
    --Bug#35972477  Changes Ends

  
  
  
  FUNCTION Fn_Pickup(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_Wrk_Lbdddonl     IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Default(p_Source           IN VARCHAR2,
                      p_Source_Operation IN VARCHAR2,
                      p_Function_Id      IN VARCHAR2,
                      p_Action_Code      IN VARCHAR2,
                      p_Wrk_Lbcsprol     IN OUT Lbpks_Lbcsprol_Main.Ty_Lbcsprol,
                      p_Err_Code         IN OUT VARCHAR2,
                      p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Recompute(p_Source           IN VARCHAR2,
                        p_Source_Operation IN VARCHAR2,
                        p_Function_Id      IN VARCHAR2,
                        p_Action_Code      IN VARCHAR2,
                        p_Wrk_Lbcsprol     IN OUT Lbpks_Lbcsprol_Main.Ty_Lbcsprol,
                        p_Err_Code         IN OUT VARCHAR2,
                        p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Pop_Ratefix(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_Wrk_Lbcsprol     IN OUT Lbpks_Lbcsprol_Main.Ty_Lbcsprol,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Pop_Rateset(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_Wrk_Lbcsprol     IN OUT Lbpks_Lbcsprol_Main.Ty_Lbcsprol,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Pop_Adv(p_Source           IN VARCHAR2,
                      p_Source_Operation IN VARCHAR2,
                      p_Function_Id      IN VARCHAR2,
                      p_Action_Code      IN VARCHAR2,
                      p_Wrk_Lbcsprol     IN OUT Lbpks_Lbcsprol_Main.Ty_Lbcsprol,
                      p_Err_Code         IN OUT VARCHAR2,
                      p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Pop_Pis(p_Source           IN VARCHAR2,
                      p_Source_Operation IN VARCHAR2,
                      p_Function_Id      IN VARCHAR2,
                      p_Action_Code      IN VARCHAR2,
                      p_Wrk_Lbcsprol     IN OUT Lbpks_Lbcsprol_Main.Ty_Lbcsprol,
                      p_Err_Code         IN OUT VARCHAR2,
                      p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Validate(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_Main_Function    IN VARCHAR2,
                       p_Lbcsprol         IN Lbpks_Lbcsprol_Main.Ty_Lbcsprol,
                       p_Prev_Lbcsprol    IN Lbpks_Lbcsprol_Main.Ty_Lbcsprol,
                       p_Wrk_Lbcsprol     IN OUT Lbpks_Lbcsprol_Main.Ty_Lbcsprol,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Upload(p_Source       IN VARCHAR2,
                     p_Function_Id  IN VARCHAR2,
                     p_Action_Code  IN VARCHAR2,
                     p_Wrk_Lbcsprol IN OUT Lbpks_Lbcsprol_Main.Ty_Lbcsprol,
                     p_Err_Code     IN OUT VARCHAR2,
                     p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Query(p_Source       IN VARCHAR2,
                    p_Function_Id  IN VARCHAR2,
                    p_Action_Code  IN VARCHAR2,
                    p_Wrk_Lbcsprol IN OUT Lbpks_Lbcsprol_Main.Ty_Lbcsprol,
                    p_Err_Code     IN OUT VARCHAR2,
                    p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;

  --OBCL_14.3_LS_Sublimit_Validation_Changes starts
  FUNCTION Fn_SUBLIMITS_CHECK(p_Wrk_Lbcsprol IN OUT Lbpks_Lbcsprol_Main.Ty_Lbcsprol,
                              p_Err_Code     IN OUT VARCHAR2,
                              p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;
  --OBCL_14.3_LS_Sublimit_Validation_Changes ends                              
   --Bug#33704371 starts
 FUNCTION Fn_Maturity_Date_Check(p_Source       IN VARCHAR2,
                                  p_Function_Id  IN VARCHAR2,
                                  p_Action_Code  IN VARCHAR2,
                                  p_Wrk_Lbcsprol IN OUT Lbpks_Lbcsprol_Main.Ty_Lbcsprol,
                                  Ind            NUMBER,
                                  p_Err_Code     IN OUT VARCHAR2,
                                  p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;
  --Bug#33704371 ends
  
  --Bug#35972477 ADDED STARTS
  FUNCTION Fn_process_Margin_Comp(p_Split_No     IN NUMBER,
                                 p_Split_Prod   IN VARCHAR2,
                                 P_version IN NUMBER,
                                 p_Wrk_Lbcsprol IN OUT Lbpks_Lbcsprol_Main.Ty_Lbcsprol,
                                 p_Err_Code     IN OUT VARCHAR2,
                                 p_Err_Params   IN OUT VARCHAR2)
  RETURN BOOLEAN;
  --Bug#35972477 ADDED ENDS
  
END Lbpks_Lbcsprol_Utils;
/