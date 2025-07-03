CREATE OR REPLACE PACKAGE olpks_olrpmatr_kernel AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_olrpmatr_kernel.spc
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
   Pm_Branch_Date             VARCHAR2(11);
   Pm_Branch_Desc             VARCHAR2(105);
 pm_current_user smtb_user.user_id%TYPE;--VARCHAR2(11);--Bug#29125889 changes
   Pm_Lcy                     VARCHAR2(3);
   Pm_Language                VARCHAR2(3);
   Pm_Module                  VARCHAR2(2);
   Prm_Aeod_Key               VARCHAR2(30);
   Pm_Systime                 VARCHAR2(8);
   Pm_Date_Time               VARCHAR2(32767);
   Pm_Application_Date        VARCHAR2(50);
   Pm_Application_Date_1      VARCHAR2(50);
   PRM_PRODUCT_TYPE            VARCHAR2(1);
   PRM_PRODUCT_CODE                 VARCHAR2(4);
   PRM_CONTRACT_CCY                     VARCHAR2(3);
 PRM_customer sttm_core_customer.customer_no%TYPE;
   PRM_VALUE_DT_FROM         VARCHAR2(11);
   PRM_VALUE_DT_TO           VARCHAR2(11);
   PRM_SCH_DT_FROM           VARCHAR2(11);
   PRM_SCH_DT_TO             VARCHAR2(11);
   PRM_MAT_TYPE                VARCHAR2(1);
   PRM_LIQD_MODE               VARCHAR2(1);
   PRM_NON_MAT_SCH             VARCHAR2(1);
   Pm_Where_Clause            VARCHAR2(1000);
   Pm_Additional_Where_Clause VARCHAR2(1000);
   Pm_Ropt_Product_Type       VARCHAR2(50); 
   Pm_Ropt_Product_Type_1     VARCHAR2(50); 
   Pm_Ropt_From_Value_Date_1  VARCHAR2(15);
   Pm_Ropt_To_Value_Date_1    VARCHAR2(15);
   Pm_Ropt_Mat_Type_1         VARCHAR2(15);
   Pm_Ropt_From_Sch_Date_1    VARCHAR2(15);
   Pm_Ropt_To_Sch_Date_1      VARCHAR2(15);
   Pm_Ropt_Liqd_Mode_1        VARCHAR2(15);
   Pm_Ropt_From_Value_Date    VARCHAR2(11);
   Pm_Ropt_To_Value_Date      VARCHAR2(11);
   Pm_Ropt_From_Sch_Date      VARCHAR2(11);
   Pm_Ropt_To_Sch_Date        VARCHAR2(11);
   Pm_Ropt_Mat_Type           VARCHAR2(6);
   Pm_Ropt_Liqd_Mode          VARCHAR2(9);
   Pm_Eur_Ccy                 VARCHAR2(3);

   Pm_Mat_Desc      VARCHAR2(10);
   Pm_Liqd_Desc     VARCHAR2(20);
   Pm_Prodtype_Desc VARCHAR2(35);
   Pm_Nm_Desc       VARCHAR2(10);

   FUNCTION Afterreport RETURN BOOLEAN;
   FUNCTION Afterpform RETURN BOOLEAN;
   FUNCTION Cf_3formula(Notice_Contract_Ccy    IN VARCHAR2
                       ,Notice_Contract_Amount IN NUMBER) RETURN VARCHAR2;
   FUNCTION Cf_4formula(Notice_Contract_Ccy       IN VARCHAR2
                       ,Notice_Outstanding_Amount IN NUMBER) RETURN VARCHAR2;
   FUNCTION Cf_5formula(Fixed_Component_Ccy IN VARCHAR2
                       ,Fixed_Due_Amount    IN NUMBER) RETURN VARCHAR2;
   FUNCTION Cf_6formula(Fixed_Component_Ccy      IN VARCHAR2
                       ,Fixed_Outstanding_Amount IN NUMBER) RETURN VARCHAR2;
   PROCEDURE f_Errortrap(p_Errorcode IN VARCHAR2);
   FUNCTION Cf_Eur_Notice_Contract_Amountf(Notice_Eur_Type        IN VARCHAR2
                                          ,Notice_Contract_Amount IN NUMBER
                                          ,Notice_Contract_Ccy    IN VARCHAR2) RETURN VARCHAR2;
   FUNCTION Cf_Eur_Notice_Outstanding_Amou(Notice_Eur_Type           IN VARCHAR2
                                          ,Notice_Outstanding_Amount IN NUMBER
                                          ,Notice_Contract_Ccy       IN VARCHAR2) RETURN VARCHAR2;
   FUNCTION Cf_Eur_Fixed_Due_Amountformula(Fixed_Eur_Type      IN VARCHAR2
                                          ,Fixed_Due_Amount    IN NUMBER
                                          ,Fixed_Component_Ccy IN VARCHAR2) RETURN VARCHAR2;
   FUNCTION Cf_Eur_Fixed_Outstanding_Amoun(Fixed_Eur_Type           IN VARCHAR2
                                          ,Fixed_Outstanding_Amount IN NUMBER
                                          ,Fixed_Component_Ccy      IN VARCHAR2) RETURN VARCHAR2;
   FUNCTION Cf_1formula(Call_Contract_Ccy    IN VARCHAR2
                       ,Call_Contract_Amount IN NUMBER) RETURN VARCHAR2;
   FUNCTION Cf_2formula(Call_Contract_Ccy       IN VARCHAR2
                       ,Call_Outstanding_Amount IN NUMBER) RETURN VARCHAR2;
   FUNCTION Cf_Eur_Call_Contract_Amountfor(Call_Eur_Type        IN VARCHAR2
                                          ,Call_Contract_Amount IN NUMBER
                                          ,Call_Contract_Ccy    IN VARCHAR2) RETURN VARCHAR2;
   FUNCTION Cf_Eur_Call_Outstanding_Amount(Call_Eur_Type           IN VARCHAR2
                                          ,Call_Outstanding_Amount IN NUMBER
                                          ,Call_Contract_Ccy       IN VARCHAR2) RETURN VARCHAR2;
   FUNCTION Cf_Fixed_Due_Date(Fixed_Due_Date IN DATE) RETURN VARCHAR2;
   FUNCTION Cf_Fixed_Mat_Dateformula(Fixed_Maturity_Date IN DATE) RETURN VARCHAR2;

PROCEDURE Pr_Skip_Handler  (P_Stage  IN  VARCHAR2);
FUNCTION Fn_Post_Build_Type_Structure (p_Source            IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Addl_Info       IN Cspks_Req_Global.Ty_Addl_Info,
p_olrpmatr     IN  OUT olpks_olrpmatr_main.ty_olrpmatr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Get_Params(p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Gen_Mode       IN     VARCHAR2,
p_olrpmatr IN  OUT  olpks_olrpmatr_main.ty_olrpmatr,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Get_Params(p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Gen_Mode       IN     VARCHAR2,
p_olrpmatr IN  OUT olpks_olrpmatr_main.ty_olrpmatr,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Check_Mandatory(p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_olrpmatr IN  OUT  olpks_olrpmatr_main.ty_olrpmatr,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Check_Mandatory(p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_olrpmatr IN   olpks_olrpmatr_main.ty_olrpmatr,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Default_And_Validate (p_source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_olrpmatr IN   olpks_olrpmatr_main.ty_olrpmatr,
p_wrk_olrpmatr IN OUT  olpks_olrpmatr_main.ty_olrpmatr,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Default_And_Validate (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_olrpmatr IN   olpks_olrpmatr_main.ty_olrpmatr,
p_wrk_olrpmatr IN OUT  olpks_olrpmatr_main.ty_olrpmatr,
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
p_olrpmatr IN olpks_olrpmatr_main.ty_olrpmatr,
p_wrk_olrpmatr IN OUT  olpks_olrpmatr_main.ty_olrpmatr,
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
p_olrpmatr IN olpks_olrpmatr_main.ty_olrpmatr,
p_wrk_olrpmatr IN OUT  olpks_olrpmatr_main.ty_olrpmatr,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

END olpks_olrpmatr_kernel;
/