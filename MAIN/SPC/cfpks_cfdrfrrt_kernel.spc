CREATE OR REPLACE PACKAGE CFPKS_CFDRFRRT_KERNEL AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : cfpks_cfdrfrrt_kernel.spc
  **
  ** Module     : The ICCF
  **
  ** This source is part of the Oracle FLEXCUBE Software Product.
  ** Copyright (R) 2008,2020 , Oracle and/or its affiliates.  All rights reserved
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
  
  -------------------------------------------------------------------------------------------------------
  */
  g_is_rate_prop varchar2(1) := 'N';

  PROCEDURE Pr_Skip_Handler(P_Stage IN VARCHAR2);
  FUNCTION Fn_Post_Build_Type_Structure(p_Source           IN VARCHAR2,
                                        p_Source_Operation IN VARCHAR2,
                                        p_Function_Id      IN VARCHAR2,
                                        p_Action_Code      IN VARCHAR2,
                                        p_Child_Function   IN VARCHAR2,
                                        p_Addl_Info        IN Cspks_Req_Global.Ty_Addl_Info,
                                        p_cfdrfrrt         IN OUT cfpks_cfdrfrrt_Main.Ty_cfdrfrrt,
                                        p_Err_Code         IN OUT VARCHAR2,
                                        p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Pre_Check_Mandatory(p_Source           IN VARCHAR2,
                                  p_Source_Operation IN VARCHAR2,
                                  p_Function_Id      IN VARCHAR2,
                                  p_Action_Code      IN VARCHAR2,
                                  p_Child_Function   IN VARCHAR2,
                                  p_cfdrfrrt         IN OUT cfpks_cfdrfrrt_Main.Ty_cfdrfrrt,
                                  p_Err_Code         IN OUT VARCHAR2,
                                  p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Post_Check_Mandatory(p_Source           IN VARCHAR2,
                                   p_Source_Operation IN VARCHAR2,
                                   p_Function_Id      IN VARCHAR2,
                                   p_Action_Code      IN VARCHAR2,
                                   p_Child_Function   IN VARCHAR2,
                                   p_Pk_Or_Full       IN VARCHAR2 DEFAULT 'FULL',
                                   p_cfdrfrrt         IN cfpks_cfdrfrrt_Main.ty_cfdrfrrt,
                                   p_Err_Code         IN OUT VARCHAR2,
                                   p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Pre_Default_And_Validate(p_source           IN VARCHAR2,
                                       p_Source_Operation IN VARCHAR2,
                                       p_Function_Id      IN VARCHAR2,
                                       p_Action_Code      IN VARCHAR2,
                                       p_Child_Function   IN VARCHAR2,
                                       p_cfdrfrrt         IN cfpks_cfdrfrrt_Main.Ty_cfdrfrrt,
                                       p_Prev_cfdrfrrt    IN OUT cfpks_cfdrfrrt_Main.Ty_cfdrfrrt,
                                       p_Wrk_cfdrfrrt     IN OUT cfpks_cfdrfrrt_Main.Ty_cfdrfrrt,
                                       p_Err_Code         IN OUT VARCHAR2,
                                       p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Post_Default_And_Validate(p_Source           IN VARCHAR2,
                                        p_Source_Operation IN VARCHAR2,
                                        p_Function_Id      IN VARCHAR2,
                                        p_Action_Code      IN VARCHAR2,
                                        p_Child_Function   IN VARCHAR2,
                                        p_cfdrfrrt         IN cfpks_cfdrfrrt_Main.Ty_cfdrfrrt,
                                        p_Prev_cfdrfrrt    IN OUT cfpks_cfdrfrrt_Main.Ty_cfdrfrrt,
                                        p_Wrk_cfdrfrrt     IN OUT cfpks_cfdrfrrt_Main.Ty_cfdrfrrt,
                                        p_Err_Code         IN OUT VARCHAR2,
                                        p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Pre_Upload_Db(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_Child_Function   IN VARCHAR2,
                            p_Post_Upl_Stat    IN VARCHAR2,
                            p_Multi_Trip_Id    IN VARCHAR2,
                            p_cfdrfrrt         IN cfpks_cfdrfrrt_Main.ty_cfdrfrrt,
                            p_Prev_cfdrfrrt    IN cfpks_cfdrfrrt_Main.ty_cfdrfrrt,
                            p_Wrk_cfdrfrrt     IN OUT cfpks_cfdrfrrt_Main.ty_cfdrfrrt,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Post_Upload_Db(p_Source           IN VARCHAR2,
                             p_source_operation IN VARCHAR2,
                             p_Function_id      IN VARCHAR2,
                             p_action_code      IN VARCHAR2,
                             p_Child_Function   IN VARCHAR2,
                             p_Post_Upl_Stat    IN VARCHAR2,
                             p_Multi_Trip_Id    IN VARCHAR2,
                             p_cfdrfrrt         IN cfpks_cfdrfrrt_Main.ty_cfdrfrrt,
                             p_Prev_cfdrfrrt    IN cfpks_cfdrfrrt_Main.ty_cfdrfrrt,
                             p_Wrk_cfdrfrrt     IN OUT cfpks_cfdrfrrt_Main.ty_cfdrfrrt,
                             p_Err_Code         IN OUT VARCHAR2,
                             p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Pre_Query(p_Source           IN VARCHAR2,
                        p_Source_Operation IN VARCHAR2,
                        p_Function_id      IN VARCHAR2,
                        p_Action_Code      IN VARCHAR2,
                        p_Child_Function   IN VARCHAR2,
                        p_Full_Data        IN VARCHAR2 DEFAULT 'Y',
                        p_With_Lock        IN VARCHAR2 DEFAULT 'N',
                        p_QryData_Reqd     IN VARCHAR2,
                        p_cfdrfrrt         IN cfpks_cfdrfrrt_Main.ty_cfdrfrrt,
                        p_Wrk_cfdrfrrt     IN OUT cfpks_cfdrfrrt_Main.ty_cfdrfrrt,
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
                         p_cfdrfrrt         IN cfpks_cfdrfrrt_Main.Ty_cfdrfrrt,
                         p_Wrk_cfdrfrrt     IN OUT cfpks_cfdrfrrt_Main.Ty_cfdrfrrt,
                         p_Err_Code         IN OUT VARCHAR2,
                         p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;


  FUNCTION fn_propagate_rate_code(old_rate_code in varchar2,
                                  p_branch_code in Varchar2,
                                  p_action_code IN Varchar,
                                  p_errcode     IN OUT Varchar2,
                                  p_errParams   IN OUT Varchar2)
    RETURN BOOLEAN;


END cfpks_cfdrfrrt_kernel;
/
CREATE OR REPLACE SYNONYM cfpkss_cfdrfrrt_kernel FOR cfpks_cfdrfrrt_kernel
/