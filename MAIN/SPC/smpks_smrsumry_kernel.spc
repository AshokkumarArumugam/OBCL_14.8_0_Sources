CREATE OR REPLACE PACKAGE smpks_smrsumry_kernel AS
  /*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2008 - 2021  Oracle and/or its affiliates.  All rights reserved.
** 												
** No part of this work may be reproduced, stored in a retrieval system,
** adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise,
** translated in any language or computer language,
** without the prior written permission of Oracle and/or its affiliates.
** 
** 
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India.
------------------------------------------------------------------------------------------
*/
/*
  -------------------------------------------------------------------------------------------------------
  CHANGE HISTORY

  SFR Number         : 18851342
  Changed By         : Anmol
  Change Description : PL/SQL: numeric or value error: character string buffer too small.
  Search Tag         : 18851342
  
  SFR Number         : 33183307
  Changed By         : Sheeba Johnson
  Change Description : Added a variable PM_REPORT_NAME to resolve processing issue, while generating the report.
  Search Tag         : FCUBS_14_5_33183307_changes
  -------------------------------------------------------------------------------------------------------
  */

pm_branch_code sttm_core_branch.branch_code%TYPE;
	PM_REPORT_NAME SMTB_FUNCTION_DESCRIPTION.DESCRIPTION%TYPE; --FCUBS_14_5_33183307_changes added
    pm_branch_desc  VARCHAR2(105); --18851342
    pm_branch_date  VARCHAR2(11);
 pm_current_user smtb_user.user_id%TYPE;
    pm_module       VARCHAR2(2);

    pm_systime      VARCHAR2(8);
    pm_where_clause VARCHAR2(1500);
    prm_aeod_key    VARCHAR2(30);

 pm_excp_branch1 VARCHAR2(32767);
    pm_role_options   VARCHAR2(10);
    pm_branch_options VARCHAR2(10);
    pm_role_id        VARCHAR2(100);
 pm_branch_id VARCHAR2(100);
    pm_user_status    VARCHAR2(100);

    pm_role_id1     VARCHAR2(100);
    pm_branch_id1   VARCHAR2(100);
    pm_user_status1 VARCHAR2(100);
    FUNCTION afterpform RETURN BOOLEAN;
PROCEDURE Pr_Skip_Handler  (P_Stage  IN  VARCHAR2);
FUNCTION Fn_Post_Build_Type_Structure (p_Source            IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Addl_Info       IN Cspks_Req_Global.Ty_Addl_Info,
p_smrsumry     IN  OUT smpks_smrsumry_Main.Ty_smrsumry,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Get_Params(p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Gen_Mode       IN     VARCHAR2,
p_smrsumry IN  OUT  smpks_smrsumry_Main.Ty_smrsumry,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Get_Params(p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Gen_Mode       IN     VARCHAR2,
p_smrsumry IN  OUT smpks_smrsumry_Main.ty_smrsumry,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Check_Mandatory(p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_smrsumry IN  OUT  smpks_smrsumry_Main.Ty_smrsumry,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Check_Mandatory(p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_smrsumry IN   smpks_smrsumry_Main.ty_smrsumry,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Default_And_Validate (p_source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_smrsumry IN   smpks_smrsumry_Main.Ty_smrsumry,
p_Wrk_smrsumry IN OUT  smpks_smrsumry_Main.Ty_smrsumry,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Default_And_Validate (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_smrsumry IN   smpks_smrsumry_Main.Ty_smrsumry,
p_Wrk_smrsumry IN OUT  smpks_smrsumry_Main.Ty_smrsumry,
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
p_smrsumry IN smpks_smrsumry_Main.ty_smrsumry,
p_Wrk_smrsumry IN OUT  smpks_smrsumry_Main.ty_smrsumry,
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
p_smrsumry IN smpks_smrsumry_Main.ty_smrsumry,
p_Wrk_smrsumry IN OUT  smpks_smrsumry_Main.ty_smrsumry,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

END smpks_smrsumry_kernel;
/
CREATE OR REPLACE SYNONYM smpkss_smrsumry_kernel FOR smpks_smrsumry_kernel
/
