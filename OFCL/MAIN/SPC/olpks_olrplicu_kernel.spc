CREATE OR REPLACE PACKAGE olpks_olrplicu_kernel AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_olrplicu_kernel.spc
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

  Changed By         : Krithika Gopalakrishnan
  Change Description : Changes done to generate the report - OLRPLICU
  Date               : 13/07/2016
  
  **Changed By         : Meha
  **Date               : 21-Dec-2018
  **Change Description : Forward Porting Of 12.3-Base Bug#29027775 
  **Search String      : Bug#29125889

  -------------------------------------------------------------------------------------------------------
  */

 PM_branch_code sttm_core_branch.branch_code%TYPE;
	 PM_REPORT_NAME SMTB_FUNCTION_DESCRIPTION.DESCRIPTION%TYPE;
  PM_BRANCH_DATE            VARCHAR2(11);
  PM_BRANCH_DESC            varchar2(105);
 pm_current_user smtb_user.user_id%TYPE;--VARCHAR2(11);--Bug#29125889 changes
  PM_LCY                    VARCHAR2(3);
  PM_LANGUAGE               VARCHAR2(3);
  PM_MODULE                 VARCHAR2(2);
  PRM_AEOD_KEY              VARCHAR2(30);
  PM_SYSTIME                VARCHAR2(8);
  PRM_PRODUCT_TYPE_LIST     VARCHAR2(100);
  PM_TO_DATE                DATE;
  PM_PRODUCT_TYPE_NAME_LIST VARCHAR2(50);
  PM_AND_CLAUSE             VARCHAR2(32767);
  PM_ORDER_CLAUSE           VARCHAR2(32767);
 PRM_ACCOUNT VARCHAR2(100);
  Pm_Date_Time              VARCHAR2(100);
 PM_BRANCH VARCHAR2(40);
  PRM_LD_PRODUCT_CODE       VARCHAR2(50);
  FUNCTION Afterreport RETURN BOOLEAN;
  FUNCTION Afterpform RETURN BOOLEAN;
  FUNCTION Cf_Tot_Linkedformula(Link_Ccy      IN VARCHAR2,
                                Cs_Tot_Linked IN NUMBER) RETURN VARCHAR2;
  FUNCTION Cf_Loan_Amtformula(Loan_Ccy IN VARCHAR2, Loan_Amt IN NUMBER)
    RETURN VARCHAR2;
  FUNCTION Cf_Link_Amtformula(Link_Ccy IN VARCHAR2, Link_Amt IN NUMBER)
    RETURN VARCHAR2;
  FUNCTION Cf_Loan_Amt1formula(Loan_Ccy1 IN VARCHAR2, Loan_Amt1 IN NUMBER)
    RETURN VARCHAR2;
  FUNCTION Cf_Link_Amt1formula(Link_Ccy3 IN VARCHAR2, Link_Amt1 IN NUMBER)
    RETURN VARCHAR2;
  FUNCTION Cf_Tot_Linked1formula(Link_Ccy3      IN VARCHAR2,
                                 Cs_Tot_Linked1 IN NUMBER) RETURN VARCHAR2;
  PROCEDURE Pr_Skip_Handler(P_Stage IN VARCHAR2);
  FUNCTION Fn_Post_Build_Type_Structure(p_Source           IN VARCHAR2,
                                        p_Source_Operation IN VARCHAR2,
                                        p_Function_Id      IN VARCHAR2,
                                        p_Action_Code      IN VARCHAR2,
                                        p_Child_Function   IN VARCHAR2,
                                        p_Addl_Info        IN Cspks_Req_Global.Ty_Addl_Info,
                                        p_olrplicu         IN OUT olpks_olrplicu_main.ty_olrplicu,
                                        p_Err_Code         IN OUT VARCHAR2,
                                        p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Pre_Get_Params(p_Source           IN VARCHAR2,
                             p_Source_Operation IN VARCHAR2,
                             p_Function_Id      IN VARCHAR2,
                             p_Action_Code      IN VARCHAR2,
                             p_Child_Function   IN VARCHAR2,
                             p_Gen_Mode         IN VARCHAR2,
                             p_olrplicu         IN OUT olpks_olrplicu_main.ty_olrplicu,
                             p_Err_Code         IN OUT VARCHAR2,
                             p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Post_Get_Params(p_Source           IN VARCHAR2,
                              p_Source_Operation IN VARCHAR2,
                              p_Function_Id      IN VARCHAR2,
                              p_Action_Code      IN VARCHAR2,
                              p_Child_Function   IN VARCHAR2,
                              p_Gen_Mode         IN VARCHAR2,
                              p_olrplicu         IN OUT olpks_olrplicu_main.ty_olrplicu,
                              p_Err_Code         IN OUT VARCHAR2,
                              p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Pre_Check_Mandatory(p_Source           IN VARCHAR2,
                                  p_Source_Operation IN VARCHAR2,
                                  p_Function_Id      IN VARCHAR2,
                                  p_Action_Code      IN VARCHAR2,
                                  p_Child_Function   IN VARCHAR2,
                                  p_olrplicu         IN OUT olpks_olrplicu_main.ty_olrplicu,
                                  p_Err_Code         IN OUT VARCHAR2,
                                  p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Post_Check_Mandatory(p_Source           IN VARCHAR2,
                                   p_Source_Operation IN VARCHAR2,
                                   p_Function_Id      IN VARCHAR2,
                                   p_Action_Code      IN VARCHAR2,
                                   p_Child_Function   IN VARCHAR2,
                                   p_Pk_Or_Full       IN VARCHAR2 DEFAULT 'FULL',
                                   p_olrplicu         IN olpks_olrplicu_main.ty_olrplicu,
                                   p_Err_Code         IN OUT VARCHAR2,
                                   p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Pre_Default_And_Validate(p_source           IN VARCHAR2,
                                       p_Source_Operation IN VARCHAR2,
                                       p_Function_Id      IN VARCHAR2,
                                       p_Action_Code      IN VARCHAR2,
                                       p_Child_Function   IN VARCHAR2,
                                       p_olrplicu         IN olpks_olrplicu_main.ty_olrplicu,
                                       p_wrk_olrplicu     IN OUT olpks_olrplicu_main.ty_olrplicu,
                                       p_Err_Code         IN OUT VARCHAR2,
                                       p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Post_Default_And_Validate(p_Source           IN VARCHAR2,
                                        p_Source_Operation IN VARCHAR2,
                                        p_Function_Id      IN VARCHAR2,
                                        p_Action_Code      IN VARCHAR2,
                                        p_Child_Function   IN VARCHAR2,
                                        p_olrplicu         IN olpks_olrplicu_main.ty_olrplicu,
                                        p_wrk_olrplicu     IN OUT olpks_olrplicu_main.ty_olrplicu,
                                        p_Err_Code         IN OUT VARCHAR2,
                                        p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Pre_Process(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_Child_Function   IN VARCHAR2,
                          p_Post_Upl_Stat    IN VARCHAR2,
                          p_Multi_Trip_Id    IN VARCHAR2,
                          p_olrplicu         IN olpks_olrplicu_main.ty_olrplicu,
                          p_wrk_olrplicu     IN OUT olpks_olrplicu_main.ty_olrplicu,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Post_Process(p_Source           IN VARCHAR2,
                           p_source_operation IN VARCHAR2,
                           p_Function_id      IN VARCHAR2,
                           p_action_code      IN VARCHAR2,
                           p_Child_Function   IN VARCHAR2,
                           p_Post_Upl_Stat    IN VARCHAR2,
                           p_Multi_Trip_Id    IN VARCHAR2,
                           p_olrplicu         IN olpks_olrplicu_main.ty_olrplicu,
                           p_wrk_olrplicu     IN OUT olpks_olrplicu_main.ty_olrplicu,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

END olpks_olrplicu_kernel;
/