CREATE OR REPLACE PACKAGE olpks_olrpretr_kernel AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_olrpretr_kernel.spc
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
  
  **Changed By         : Meha
  **Date               : 4-Apr-2018
  **Change Description : Forward Porting Of 12.3-Base Bug#27742970
  **Search String      : Bug#27792506

  **Changed By         : Meha
  **Date               : 27-Jul-2018
  **Change Description : Forward Porting Of 12.3-Base Bug#28324267
  **Search String      : Bug#28378431

  **Changed By         : Meha
  **Date               : 21-Dec-2018
  **Change Description : Forward Porting Of 12.3-Base Bug#29027775 
  **Search String      : Bug#29125889
  -------------------------------------------------------------------------------------------------------
  */

PM_branch_code sttm_core_branch.branch_code%TYPE;
	 PM_REPORT_NAME SMTB_FUNCTION_DESCRIPTION.DESCRIPTION%TYPE;
  PM_BRANCH_DATE  varchar2(11);
  PM_BRANCH_DESC  varchar2(105);  --varchar2(35); --[SITECODE:11.1,FBME,BugDB ID:17238576] changes
 pm_current_user smtb_user.user_id%TYPE;--varchar2(11);--Bug#29125889 Changes
  PM_LCY  varchar2(3);
  PM_LANGUAGE  varchar2(3);
  PM_MODULE  varchar2(2);
  PRM_AEOD_KEY  varchar2(30);
  PM_SYSTIME  varchar2(8);
  PM_DATE_TIME  varchar2(32767);
  PM_APPLICATION_DATE  VARCHAR2(20); --DATE; --[SITECODE:11.1,FBME,BugDB ID:17238576] changes
  PRM_PRODUCT_TYPE  varchar2(1); --varchar2(50); --[SITECODE:11.1,FBME,BugDB ID:17238576] changes
  PRM_PRODUCT  varchar2(50);
  PRM_CCY  varchar2(50);
 PRM_CUSTOMER varchar2(50);
  PRM_FROM_VALUE_DATE  varchar2(11);
  PRM_TO_VALUE_DATE  varchar2(11);
  PRM_FROM_MAT_DATE  varchar2(11);
  PRM_TO_MAT_DATE  varchar2(11);
  PRM_MAT_TYPE  varchar2(1);
  PRM_CONTRACT_STATUS  varchar2(1);
  PRM_AUTH_STATUS  varchar2(1);
  PM_WHERE_CLAUSE  varchar2(1000);
  --PM_ROPT_PRODUCT_TYPE  varchar2(10);--Commented For Bug#27792506
  PM_ROPT_PRODUCT_TYPE  varchar2(50);--Added For Bug#27792506
  PM_ROPT_FROM_VALUE_DATE  varchar2(11);
  PM_ROPT_TO_VALUE_DATE  varchar2(11);
  PM_ROPT_MAT_TYPE  varchar2(6);
  PM  number;
  PM_ROPT_FROM_MAT_DATE  varchar2(11);
  PM_ROPT_TO_MAT_DATE  varchar2(11);
  PM_ROPT_CONTRACT_STATUS  varchar2(15);
  PM_ROPT_AUTH_STATUS  varchar2(12);
  PM_EUR_CCY  varchar2(3);
      PM_ROPT_AUTH_STATUS1 varchar2(20);
        PM_ROPT_CONTRACT_STATUS1 varchar2(20);


         PM_ROPT_TO_MAT_DATE1 VARCHAR2(20);
         PM_ROPT_FROM_MAT_DATE1 VARCHAR2(20);
         PM_ROPT_MAT_TYPE1 VARCHAR2(20);
          PM_ROPT_TO_VALUE_DATE1 VARCHAR2(20);
          PM_ROPT_FROM_VALUE_DATE1 VARCHAR2(20);
           PM_ROPT_PRODUCT_TYPE1 VARCHAR2(20);

  function AfterReport return boolean  ;
  function AfterPForm return boolean  ;
  function BeforeReport return boolean  ;
  function cf_productformula(product in varchar2) return varchar2  ;
  function cf_product_typeformula(product_type in varchar2) return varchar2  ;
  function cf_payment_methodformula(payment_method in varchar2) return varchar2  ;
  function cf_4formula(contract_status in varchar2) return varchar2  ;
  function cf_7formula(maturity_type in varchar2) return varchar2  ;
  function cf_8formula(schedule_type in varchar2) return varchar2  ;
  function cf_9formula(schedule_type in varchar2, amortisation_type in varchar2) return varchar2  ;
  function cf_10formula(product_type in varchar2, revolving_commitment in varchar2) return varchar2  ;
  function cf_11formula(liquidation_mode in varchar2) return varchar2  ;
  function cf_rollover_allowed(rollover_allowed in varchar2) return varchar2  ;--Added For Bug#28378431
  function cf_12formula(rollover_allowed in varchar2, rollover_mode in varchar2) return varchar2  ;
  function cf_13formula(status_control in varchar2) return varchar2  ;
  function cf_contract_amountformula(contract_ccy in varchar2, contract_amount in number) return varchar2  ;
  function cf_6formula(outstanding_amount in number, contract_ccy in varchar2) return varchar2  ;
  function cf_cluster_sizeformula(cluster_size in number, contract_ccy in varchar2) return varchar2  ;
      function cf_rate_typeformula(rate_type in varchar2) return varchar2  ;
      function cf_special_amountformula(special_amount in number, contract_ccy in varchar2) return varchar2  ;
      function cf_2formula(rate_type in varchar2, rate in number, contract_status in varchar2, contract_reference_no1 in varchar2, component1 in varchar2, spread in number) return varchar2  ;
      function cf_spreadformula(spread in number) return varchar2  ;
function cf_interest_basisformula(interest_basis in number) return varchar2 ;
      function cf_rate_code_usageformula(product1 in varchar2, component1 in varchar2) return varchar2  ;
      function cf_auth_statusformula(auth_status in varchar2) return varchar2  ;
      PROCEDURE F_ERRORTRAP( P_ErrorCode in Varchar2)  ;
      function cf_eur_contract_amountformula(eur_type in varchar2, contract_amount in number, contract_ccy in varchar2) return varchar2 ;
      function cf_eur_outstanding_amountformu(eur_type in varchar2, outstanding_amount in number, contract_ccy in varchar2) return varchar2 ;
  function F_eur_ccy2FormatTrigger(eur_type IN VARCHAR2,outstanding_amount IN NUMBER) return VARCHAR2;
  function F_contract_ccy1FormatTrigger(eur_type IN VARCHAR2,contract_amount IN NUMBER) return VARCHAR2;
PROCEDURE Pr_Skip_Handler  (P_Stage  IN  VARCHAR2);
FUNCTION Fn_Post_Build_Type_Structure (p_Source            IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Addl_Info       IN Cspks_Req_Global.Ty_Addl_Info,
p_olrpretr     IN  OUT olpks_olrpretr_main.ty_olrpretr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Get_Params(p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Gen_Mode       IN     VARCHAR2,
p_olrpretr IN  OUT  olpks_olrpretr_main.ty_olrpretr,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Get_Params(p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Gen_Mode       IN     VARCHAR2,
p_olrpretr IN  OUT olpks_olrpretr_main.ty_olrpretr,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Check_Mandatory(p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_olrpretr IN  OUT  olpks_olrpretr_main.ty_olrpretr,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Check_Mandatory(p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_olrpretr IN   olpks_olrpretr_main.ty_olrpretr,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Default_And_Validate (p_source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_olrpretr IN   olpks_olrpretr_main.ty_olrpretr,
p_wrk_olrpretr IN OUT  olpks_olrpretr_main.ty_olrpretr,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Default_And_Validate (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_olrpretr IN   olpks_olrpretr_main.ty_olrpretr,
p_wrk_olrpretr IN OUT  olpks_olrpretr_main.ty_olrpretr,
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
p_olrpretr IN olpks_olrpretr_main.ty_olrpretr,
p_wrk_olrpretr IN OUT  olpks_olrpretr_main.ty_olrpretr,
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
p_olrpretr IN olpks_olrpretr_main.ty_olrpretr,
p_wrk_olrpretr IN OUT  olpks_olrpretr_main.ty_olrpretr,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

END olpks_olrpretr_kernel;
/
CREATE OR REPLACE SYNONYM olpkss_olrpretr_kernel FOR olpks_olrpretr_kernel
/