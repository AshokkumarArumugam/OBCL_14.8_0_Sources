CREATE OR REPLACE PACKAGE  lbpks_lbrinico_kernel AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbrinico_kernel.spc
  **
  ** Module     : Syndication Loans and Commitments
  ** 
  ** This source is part of the Oracle Banking Software Product.
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
  
 PM_branch_code sttm_core_branch.branch_code%TYPE; 
  PM_BRANCH_DATE  varchar2(100);
  PM_BRANCH_DESC  varchar2(105); 
 pm_current_user smtb_user.user_id%TYPE;
  PM_LANGUAGE varchar2(3);
  PM_MODULE   varchar2(2);
  PM_SYSTIME    varchar2(8);
  PM_DATE_TIME  varchar2(32767);
  PRM_FROM_DATE date;
  PRM_TO_DATE   date;
 PRM_user_id smtb_user.user_id%TYPE;
 PRM_BRANCH VARCHAR2(35);
  PRM_COUNTERPARTY    VARCHAR2(1000);
  PM_WHERE_CLAUSE varchar2(2000);
  PM_REPORTS varchar2(32767);
  REPORT_ID  VARCHAR2(20);
  PRM_TRAN_DRDWN  varchar2(1000);
  PRM_OVRDDAY_FROM  Number;
  PRM_OVRDDAY_TO  Number;
  
PROCEDURE Pr_Skip_Handler  (P_Stage  IN  VARCHAR2);
FUNCTION Fn_Post_Build_Type_Structure (p_Source            IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Addl_Info       IN Cspks_Req_Global.Ty_Addl_Info,
p_lbrinico     IN  OUT lbpks_lbrinico_Main.Ty_lbrinico,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Get_Params(p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Gen_Mode       IN     VARCHAR2,
p_lbrinico IN  OUT  lbpks_lbrinico_Main.Ty_lbrinico,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Get_Params(p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Gen_Mode       IN     VARCHAR2,
p_lbrinico IN  OUT lbpks_lbrinico_Main.ty_lbrinico,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Check_Mandatory(p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_lbrinico IN  OUT  lbpks_lbrinico_Main.Ty_lbrinico,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Check_Mandatory(p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_lbrinico IN   lbpks_lbrinico_Main.ty_lbrinico,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Default_And_Validate (p_source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_lbrinico IN   lbpks_lbrinico_Main.Ty_lbrinico,
p_Wrk_lbrinico IN OUT  lbpks_lbrinico_Main.Ty_lbrinico,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Default_And_Validate (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_lbrinico IN   lbpks_lbrinico_Main.Ty_lbrinico,
p_Wrk_lbrinico IN OUT  lbpks_lbrinico_Main.Ty_lbrinico,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Process (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Post_Upl_Stat    IN  VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_lbrinico IN lbpks_lbrinico_Main.ty_lbrinico,
p_Wrk_lbrinico IN OUT  lbpks_lbrinico_Main.ty_lbrinico,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Process (p_Source    IN  VARCHAR2,
                        p_source_operation  IN     VARCHAR2,
                        p_Function_id       IN     VARCHAR2,
                        p_action_code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Post_Upl_Stat    IN  VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_lbrinico IN lbpks_lbrinico_Main.ty_lbrinico,
p_Wrk_lbrinico IN OUT  lbpks_lbrinico_Main.ty_lbrinico,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

END lbpks_lbrinico_kernel;
/
CREATE OR REPLACE SYNONYM lbpkss_lbrinico_kernel FOR lbpks_lbrinico_kernel
/