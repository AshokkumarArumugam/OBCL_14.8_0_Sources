CREATE OR REPLACE PACKAGE olpks_olrpcalc_kernel AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_olrpcalc_kernel.spc
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

  -------------------------------------------------------------------------------------------------------
  */
  PRM_REF_A_OR_S      VARCHAR2(1);
  PRM_CONTRACT_REF_NO VARCHAR2(20);
  PRM_FROM_DATE       DATE;
  PRM_TO_DATE         DATE;
  RPTDATE             DATE;
  REPORT_ID           VARCHAR2(255);
  PRM_LIST            VARCHAR2(2000);
  PRM_LIST_TEMP       VARCHAR2(2000);
 PM_branch_code sttm_core_branch.branch_code%TYPE;
	 PM_REPORT_NAME SMTB_FUNCTION_DESCRIPTION.DESCRIPTION%TYPE;
  PM_BRANCH_DATE      VARCHAR2(11);
  PM_BRANCH_DESC      VARCHAR2(105);
 pm_current_user smtb_user.user_id%TYPE;
  PM_LCY              VARCHAR2(3);
  PM_LANGUAGE         VARCHAR2(3);
  PM_MODULE           VARCHAR2(2);
  PRM_AEOD_KEY        VARCHAR2(30);
  PM_SYSTIME          VARCHAR2(105);
  PM_DATE_TIME        VARCHAR2(32767);
  PM_CURRENCY         VARCHAR2(3);
  PRM_START_DATE      NUMBER;
  PRM_END_DATE        NUMBER;
  PRM_INTEREST_AMT    NUMBER;
  PRM_NO_OF_DAYS      NUMBER;
  PRM_WHERE_CLAUSE    VARCHAR2(2000);
  PRM_WHERE_CLAUSE1   VARCHAR2(2000);
  PRM_FROMDATE        VARCHAR2(11);
  PRM_TODATE          VARCHAR2(11);
  PRM_LDMM            VARCHAR2(4);

  FUNCTION AfterReport RETURN BOOLEAN;

  FUNCTION AfterPForm RETURN BOOLEAN;

  PROCEDURE Pr_Skip_Handler(P_Stage IN VARCHAR2);

  FUNCTION Fn_Post_Build_Type_Structure(p_Source           IN VARCHAR2,
                                        p_Source_Operation IN VARCHAR2,
                                        p_Function_Id      IN VARCHAR2,
                                        p_Action_Code      IN VARCHAR2,
                                        p_Child_Function   IN VARCHAR2,
                                        p_Addl_Info        IN Cspks_Req_Global.Ty_Addl_Info,
                                        p_olrpcalc         IN OUT olpks_olrpcalc_main.ty_olrpcalc,
                                        p_Err_Code         IN OUT VARCHAR2,
                                        p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Pre_Get_Params(p_Source           IN VARCHAR2,
                             p_Source_Operation IN VARCHAR2,
                             p_Function_Id      IN VARCHAR2,
                             p_Action_Code      IN VARCHAR2,
                             p_Child_Function   IN VARCHAR2,
                             p_Gen_Mode         IN VARCHAR2,
                             p_olrpcalc         IN OUT olpks_olrpcalc_main.ty_olrpcalc,
                             p_Err_Code         IN OUT VARCHAR2,
                             p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Post_Get_Params(p_Source           IN VARCHAR2,
                              p_Source_Operation IN VARCHAR2,
                              p_Function_Id      IN VARCHAR2,
                              p_Action_Code      IN VARCHAR2,
                              p_Child_Function   IN VARCHAR2,
                              p_Gen_Mode         IN VARCHAR2,
                              p_olrpcalc         IN OUT olpks_olrpcalc_main.ty_olrpcalc,
                              p_Err_Code         IN OUT VARCHAR2,
                              p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION CF_No_Of_DaysFormula(start_date       IN DATE,
                                end_date         IN DATE,
                                no_of_days       IN VARCHAR2,
                                iccf_Calc_method IN VARCHAR2) RETURN NUMBER;

  FUNCTION CF_1Formula(start_date           IN DATE,
                       end_date             IN DATE,
                       calculated_amount    IN NUMBER,
                       CF_NO_OF_DAYS        IN NUMBER,
                       daily_average_amount IN NUMBER,
                       CF_ccy               IN VARCHAR2) RETURN VARCHAR2;

  FUNCTION CF_Basis_AMTFormula(CF_ccy IN VARCHAR2, basis_amount IN NUMBER)
    RETURN VARCHAR2;

  FUNCTION CF_MethodFormula(iccf_calc_method IN VARCHAR2) RETURN VARCHAR2;

  FUNCTION CF_Start_DateFormula(start_date IN DATE) RETURN VARCHAR2;

  FUNCTION CF_End_DateFormula(end_date IN DATE) RETURN VARCHAR2;

  FUNCTION CF_StartFormula(end_date IN DATE) RETURN VARCHAR2;

  FUNCTION CF_1Formula0105(SCHEDULE_DATE IN DATE) RETURN VARCHAR2;

  FUNCTION CF_CcyFormula(currency IN VARCHAR2) RETURN VARCHAR2;

  PROCEDURE Change_History;

  FUNCTION Fn_Pre_Check_Mandatory(p_Source           IN VARCHAR2,
                                  p_Source_Operation IN VARCHAR2,
                                  p_Function_Id      IN VARCHAR2,
                                  p_Action_Code      IN VARCHAR2,
                                  p_Child_Function   IN VARCHAR2,
                                  p_olrpcalc         IN OUT olpks_olrpcalc_main.ty_olrpcalc,
                                  p_Err_Code         IN OUT VARCHAR2,
                                  p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Post_Check_Mandatory(p_Source           IN VARCHAR2,
                                   p_Source_Operation IN VARCHAR2,
                                   p_Function_Id      IN VARCHAR2,
                                   p_Action_Code      IN VARCHAR2,
                                   p_Child_Function   IN VARCHAR2,
                                   p_Pk_Or_Full       IN VARCHAR2 DEFAULT 'FULL',
                                   p_olrpcalc         IN olpks_olrpcalc_main.ty_olrpcalc,
                                   p_Err_Code         IN OUT VARCHAR2,
                                   p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Pre_Default_And_Validate(p_source           IN VARCHAR2,
                                       p_Source_Operation IN VARCHAR2,
                                       p_Function_Id      IN VARCHAR2,
                                       p_Action_Code      IN VARCHAR2,
                                       p_Child_Function   IN VARCHAR2,
                                       p_olrpcalc         IN olpks_olrpcalc_main.ty_olrpcalc,
                                       p_wrk_olrpcalc     IN OUT olpks_olrpcalc_main.ty_olrpcalc,
                                       p_Err_Code         IN OUT VARCHAR2,
                                       p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Post_Default_And_Validate(p_Source           IN VARCHAR2,
                                        p_Source_Operation IN VARCHAR2,
                                        p_Function_Id      IN VARCHAR2,
                                        p_Action_Code      IN VARCHAR2,
                                        p_Child_Function   IN VARCHAR2,
                                        p_olrpcalc         IN olpks_olrpcalc_main.ty_olrpcalc,
                                        p_wrk_olrpcalc     IN OUT olpks_olrpcalc_main.ty_olrpcalc,
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
                          p_olrpcalc         IN olpks_olrpcalc_main.ty_olrpcalc,
                          p_wrk_olrpcalc     IN OUT olpks_olrpcalc_main.ty_olrpcalc,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Post_Process(p_Source           IN VARCHAR2,
                           p_source_operation IN VARCHAR2,
                           p_Function_id      IN VARCHAR2,
                           p_action_code      IN VARCHAR2,
                           p_Child_Function   IN VARCHAR2,
                           p_Post_Upl_Stat    IN VARCHAR2,
                           p_Multi_Trip_Id    IN VARCHAR2,
                           p_olrpcalc         IN olpks_olrpcalc_main.ty_olrpcalc,
                           p_wrk_olrpcalc     IN OUT olpks_olrpcalc_main.ty_olrpcalc,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

END olpks_olrpcalc_kernel;
/
CREATE OR REPLACE SYNONYM olpkss_olrpcalc_kernel FOR olpks_olrpcalc_kernel
/