CREATE OR REPLACE PACKAGE olpks_olrpevnt_kernel AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_olrpevnt_kernel.spc
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
	**Changed By         : Meha
	**Date               : 21-Dec-2018
	**Change Description : Forward Porting Of 12.3-Base Bug#29027775 
	**Search String      : Bug#29125889

  -------------------------------------------------------------------------------------------------------
  */

 PM_branch_code sttm_core_branch.branch_code%TYPE;
	 PM_REPORT_NAME SMTB_FUNCTION_DESCRIPTION.DESCRIPTION%TYPE;
  PM_BRANCH_DATE        varchar2(11);
  PM_BRANCH_DESC        varchar2(105); --varchar2(35); --[SITECODE:11.1,FBME,BugDB ID:17238576] changes
 pm_current_user smtb_user.user_id%TYPE;--varchar2(11);--Bug#29125889 Changes
  PM_LCY                varchar2(3);
  PM_LANGUAGE           varchar2(3);
  PM_MODULE             varchar2(2);
  PRM_AEOD_KEY          varchar2(30);
  PM_SYSTIME            varchar2(8);
  PM_DATE_TIME          varchar2(32767);
  PRM_FROM_DATE          date;
  PRM_TO_DATE            date;
  PRM_CONTRACT_REF_NO    varchar2(16);
  PRM_REF_A_OR_S         varchar2(1);
  PM_WHERE_CLAUSE       varchar2(2000);
  PRM_CONTRACT_REF_NO_TO varchar2(16);
  PRM_LD_PRODUCT_CODE    varchar2(32767);
  PM_REPORTS            varchar2(32767);
  REPORT_ID VARCHAR2(20);
  function AfterReport return boolean;
  function AfterPForm return boolean;
  
PROCEDURE Pr_Skip_Handler  (P_Stage  IN  VARCHAR2);
FUNCTION Fn_Post_Build_Type_Structure (p_Source            IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Addl_Info       IN Cspks_Req_Global.Ty_Addl_Info,
p_olrpevnt     IN  OUT olpks_olrpevnt_main.ty_olrpevnt,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Get_Params(p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
              
          p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Gen_Mode       IN     VARCHAR2,
p_olrpevnt IN  OUT  olpks_olrpevnt_main.ty_olrpevnt,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Get_Params(p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Gen_Mode       IN     VARCHAR2,
p_olrpevnt IN  OUT olpks_olrpevnt_main.ty_olrpevnt,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Check_Mandatory(p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_olrpevnt IN  OUT  olpks_olrpevnt_main.ty_olrpevnt,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Check_Mandatory(p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_olrpevnt IN   olpks_olrpevnt_main.ty_olrpevnt,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Default_And_Validate (p_source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_olrpevnt IN   olpks_olrpevnt_main.ty_olrpevnt,
p_wrk_olrpevnt IN OUT  olpks_olrpevnt_main.ty_olrpevnt,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Default_And_Validate (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_olrpevnt IN   olpks_olrpevnt_main.ty_olrpevnt,
p_wrk_olrpevnt IN OUT  olpks_olrpevnt_main.ty_olrpevnt,
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
p_olrpevnt IN olpks_olrpevnt_main.ty_olrpevnt,
p_wrk_olrpevnt IN OUT  olpks_olrpevnt_main.ty_olrpevnt,
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
p_olrpevnt IN olpks_olrpevnt_main.ty_olrpevnt,
p_wrk_olrpevnt IN OUT  olpks_olrpevnt_main.ty_olrpevnt,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

END olpks_olrpevnt_kernel;
/
CREATE OR REPLACE SYNONYM olpkss_olrpevnt_kernel FOR olpks_olrpevnt_kernel
/