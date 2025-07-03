CREATE OR REPLACE PACKAGE lbpks_lbdddonl_kernel AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdddonl_kernel.spc
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

  **Changed By         : Pallavi R
  **Date               : 21-Oct-2021
  **Change Description : Back Value Date check should not happend on CAMD
  **Search String      : OBCL_14.5_Supp_SMTB_#33454468 Changes   
  
  **Changed By         : Ramya M
  **Date               : 12-Aug-2024
  **Change Description : OBCL_14.8_Version_Rollover Delete Roll instructions CHANGES
  **Search String      : BUG#36933823
  
  **Changed By         : Sudhasrhini Balaji
  **Date               : 24-Nov-2024
  **Change Description : Added a Global variable for Advice callform call during Unlock before first Auth.
  **Search String      : Bug#37257390

  -------------------------------------------------------------------------------------------------------
  */

 g_Event_Log_Cnt_a NUMBER := 0;--OBCL_14.5_Supp_SMTB_#33454468 Changes moved to spc   
prm_sch_change varchAr2(1):= 'N'; --OBCL_144_LS_BASE_CHANGES
g_cont_processing VARCHAR2(1) := 'N';--OBCL_144_LS_SOFR_PENAL_CHANGES
G_VER_ROLL_DELETE VARCHAR2(1) :='N';--BUG#36933823
g_call_advice     VARCHAR2(1) := 'Y'; --$$ Bug#37257390 CHANGES
  PROCEDURE Pr_Skip_Handler(P_Stage IN VARCHAR2);
  FUNCTION Fn_Post_Build_Type_Structure(p_Source           IN VARCHAR2,
                                        p_Source_Operation IN VARCHAR2,
                                        p_Function_Id      IN VARCHAR2,
                                        p_Action_Code      IN VARCHAR2,
                                        p_Child_Function   IN VARCHAR2,
                                        p_Addl_Info        IN Cspks_Req_Global.Ty_Addl_Info,
                                        p_lbdddonl         IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
                                        p_Err_Code         IN OUT VARCHAR2,
                                        p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Pre_Check_Mandatory(p_Source           IN VARCHAR2,
                                  p_Source_Operation IN VARCHAR2,
                                  p_Function_Id      IN VARCHAR2,
                                  p_Action_Code      IN VARCHAR2,
                                  p_Child_Function   IN VARCHAR2,
                                  p_pk_or_full       IN VARCHAR2 DEFAULT 'FULL',
                                  p_lbdddonl         IN OUT lbpks_lbdddonl_Main.ty_lbdddonl,
                                  p_Err_Code         IN OUT VARCHAR2,
                                  p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Post_Check_Mandatory(p_Source           IN VARCHAR2,
                                   p_Source_Operation IN VARCHAR2,
                                   p_Function_Id      IN VARCHAR2,
                                   p_Action_Code      IN VARCHAR2,
                                   p_Child_Function   IN VARCHAR2,
                                   p_Pk_Or_Full       IN VARCHAR2 DEFAULT 'FULL',
                                   p_lbdddonl         IN lbpks_lbdddonl_Main.ty_lbdddonl,
                                   p_Err_Code         IN OUT VARCHAR2,
                                   p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Pre_Default_And_Validate(p_Source           IN VARCHAR2,
                                       p_Source_Operation IN VARCHAR2,
                                       p_Function_Id      IN VARCHAR2,
                                       p_Action_Code      IN VARCHAR2,
                                       p_Child_Function   IN VARCHAR2,
                                       p_lbdddonl         IN lbpks_lbdddonl_Main.Ty_lbdddonl,
                                       p_Prev_lbdddonl    IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
                                       p_Wrk_lbdddonl     IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
                                       p_Err_Code         IN OUT VARCHAR2,
                                       p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Post_Default_And_Validate(p_Source           IN VARCHAR2,
                                        p_Source_Operation IN VARCHAR2,
                                        p_Function_Id      IN VARCHAR2,
                                        p_Action_Code      IN VARCHAR2,
                                        p_Child_Function   IN VARCHAR2,
                                        p_lbdddonl         IN lbpks_lbdddonl_Main.Ty_lbdddonl,
                                        p_Prev_lbdddonl    IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
                                        p_wrk_lbdddonl     IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
                                        p_Err_Code         IN OUT VARCHAR2,
                                        p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Pre_Resolve_Ref_Numbers(p_Source           IN VARCHAR2,
                                      p_Source_Operation IN VARCHAR2,
                                      p_Function_Id      IN VARCHAR2,
                                      p_Action_Code      IN VARCHAR2,
                                      p_lbdddonl         IN OUT lbpks_lbdddonl_Main.ty_lbdddonl,
                                      p_Err_Code         IN OUT VARCHAR2,
                                      p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Post_Resolve_Ref_Numbers(p_Source           IN VARCHAR2,
                                       p_Source_Operation IN VARCHAR2,
                                       p_Function_Id      IN VARCHAR2,
                                       p_Action_Code      IN VARCHAR2,
                                       p_lbdddonl         IN OUT lbpks_lbdddonl_Main.ty_lbdddonl,
                                       p_Err_Code         IN OUT VARCHAR2,
                                       p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Pre_Product_Default(p_Source           IN VARCHAR2,
                                  p_Source_Operation IN VARCHAR2,
                                  p_Function_id      IN VARCHAR2,
                                  p_Action_Code      IN VARCHAR2,
                                  p_lbdddonl         IN lbpks_lbdddonl_Main.ty_lbdddonl,
                                  p_wrk_lbdddonl     IN OUT lbpks_lbdddonl_Main.ty_lbdddonl,
                                  p_Err_Code         IN OUT VARCHAR2,
                                  p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Post_Product_Default(p_Source           IN VARCHAR2,
                                   p_Source_Operation IN VARCHAR2,
                                   p_Function_Id      IN VARCHAR2,
                                   p_Action_Code      IN VARCHAR2,
                                   p_lbdddonl         IN lbpks_lbdddonl_Main.Ty_lbdddonl,
                                   p_wrk_lbdddonl     IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
                                   p_Err_Code         IN OUT VARCHAR2,
                                   p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Pre_Unlock(p_Source           IN VARCHAR2,
                         p_Source_Operation IN VARCHAR2,
                         p_Function_Id      IN VARCHAR2,
                         p_Action_Code      IN OUT VARCHAR2,
                         p_lbdddonl         IN lbpks_lbdddonl_Main.Ty_lbdddonl,
                         p_Err_Code         IN OUT VARCHAR2,
                         p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Post_Unlock(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN OUT VARCHAR2,
                          p_lbdddonl         IN lbpks_lbdddonl_Main.Ty_lbdddonl,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Pre_Subsys_Pickup(p_Source           IN VARCHAR2,
                                p_Source_Operation IN VARCHAR2,
                                p_Function_Id      IN VARCHAR2,
                                p_Action_Code      IN VARCHAR2,
                                p_lbdddonl         IN lbpks_lbdddonl_Main.Ty_lbdddonl,
                                p_Prev_lbdddonl    IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
                                p_Wrk_lbdddonl     IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
                                p_Err_Code         IN OUT VARCHAR2,
                                p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Post_Subsys_Pickup(p_Source           IN VARCHAR2,
                                 p_Source_Operation IN VARCHAR2,
                                 p_Function_Id      IN VARCHAR2,
                                 p_action_code      IN VARCHAR2,
                                 p_lbdddonl         IN lbpks_lbdddonl_Main.Ty_lbdddonl,
                                 p_Prev_lbdddonl    IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
                                 p_Wrk_lbdddonl     IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
                                 p_Err_Code         IN OUT VARCHAR2,
                                 p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Pre_Enrich(p_Source           IN VARCHAR2,
                         p_Source_Operation IN VARCHAR2,
                         p_Function_Id      IN VARCHAR2,
                         p_Action_Code      IN VARCHAR2,
                         p_lbdddonl         IN lbpks_lbdddonl_Main.Ty_lbdddonl,
                         p_Prev_lbdddonl    IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
                         p_Wrk_lbdddonl     IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
                         p_Err_Code         IN OUT VARCHAR2,
                         p_err_params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Post_Enrich(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_lbdddonl         IN lbpks_lbdddonl_Main.Ty_lbdddonl,
                          p_Prev_lbdddonl    IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
                          p_Wrk_lbdddonl     IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Pre_Upload_Db(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_Child_Function   IN VARCHAR2,
                            p_Multi_Trip_Id    IN VARCHAR2,
                            p_lbdddonl         IN lbpks_lbdddonl_Main.Ty_lbdddonl,
                            p_Prev_lbdddonl    IN lbpks_lbdddonl_Main.Ty_lbdddonl,
                            p_Wrk_lbdddonl     IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Post_Upload_Db(p_Source           IN VARCHAR2,
                             p_Source_Operation IN VARCHAR2,
                             p_Function_Id      IN VARCHAR2,
                             p_Action_Code      IN VARCHAR2,
                             p_Child_Function   IN VARCHAR2,
                             p_Multi_Trip_Id    IN VARCHAR2,
                             p_lbdddonl         IN lbpks_lbdddonl_Main.Ty_lbdddonl,
                             p_Prev_lbdddonl    IN lbpks_lbdddonl_Main.Ty_lbdddonl,
                             p_Wrk_lbdddonl     IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
                             p_Err_Code         IN OUT VARCHAR2,
                             p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Pre_Process(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_Child_Function   IN VARCHAR2,
                          p_Multi_Trip_Id    IN VARCHAR2,
                          p_lbdddonl         IN lbpks_lbdddonl_Main.Ty_lbdddonl,
                          p_Prev_lbdddonl    IN lbpks_lbdddonl_Main.Ty_lbdddonl,
                          p_Wrk_lbdddonl     IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Post_Process(p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_id      IN VARCHAR2,
                           p_Action_Code      IN VARCHAR2,
                           p_Child_Function   IN VARCHAR2,
                           p_Multi_Trip_Id    IN VARCHAR2,
                           p_lbdddonl         IN lbpks_lbdddonl_Main.Ty_lbdddonl,
                           p_Prev_lbdddonl    IN lbpks_lbdddonl_Main.Ty_lbdddonl,
                           p_Wrk_lbdddonl     IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
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
                        p_lbdddonl         IN lbpks_lbdddonl_Main.Ty_lbdddonl,
                        p_wrk_lbdddonl     IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
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
                         p_lbdddonl         IN lbpks_lbdddonl_Main.Ty_lbdddonl,
                         p_wrk_lbdddonl     IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
                         p_Err_Code         IN OUT VARCHAR2,
                         p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

END lbpks_lbdddonl_kernel;
/