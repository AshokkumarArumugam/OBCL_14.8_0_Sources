CREATE OR REPLACE PACKAGE olpks_olrposch_kernel AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_olrposch_kernel.spc
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
  Change Description : Changes done to generate the report - OLRPOSCH
  Date               : 14/07/2016
  
  **Changed By         : Meha
  **Date               : 4-Apr-2018
  **Change Description : Forward Porting Of 12.3-Base Bug#27742970
  **Search String      : Bug#27792506
  
  **Changed By         : Meha
  **Date               : 21-Dec-2018
  **Change Description : Forward Porting Of 12.3-Base Bug#29027775 
  **Search String      : Bug#29125889

  -------------------------------------------------------------------------------------------------------
  */

 PM_branch_code sttm_core_branch.branch_code%TYPE;
	 PM_REPORT_NAME SMTB_FUNCTION_DESCRIPTION.DESCRIPTION%TYPE;
  PM_BRANCH_DATE          varchar2(11);
  PM_BRANCH_DESC          varchar2(105); --varchar2(35); --[SITECODE:11.1,FBME,BugDB ID:17238576] changes
 pm_current_user smtb_user.user_id%TYPE;--varchar2(11);--Bug#29125889 Changes
  PM_LCY                  varchar2(3);
  PM_LANGUAGE             varchar2(3);
  PM_MODULE               varchar2(2);
  PRM_AEOD_KEY            varchar2(30);
  PM_SYSTIME              varchar2(8);
  PM_DATE_TIME            varchar2(100);
  PM_APPLICATION_DATE     date;
  PRM_PRODUCT_TYPE        varchar2(1);
  --PM_ROPT_PRODUCT_TYPE    varchar2(10);--Commented For Bug#27792506
  PM_ROPT_PRODUCT_TYPE    varchar2(50);--Added For Bug#27792506
  PM_ROPT_PRODUCT_TYPE_1  varchar2(15);
  PRM_PRODUCT             varchar2(4);
  PRM_CCY                 varchar2(3);
 PRM_customer sttm_core_customer.customer_no%TYPE;
  PRM_FROM_VALUE_DATE     varchar2(11);
  PRM_TO_VALUE_DATE       varchar2(11);
  PM_ROPT_FROM_VALUE_DATE varchar2(11);
  PM_ROPT_TO_VALUE_DATE   varchar2(11);
  PRM_FROM_SCH_DATE       varchar2(11);
  PRM_TO_SCH_DATE         varchar2(11);
  PM_ROPT_FROM_SCH_DATE   varchar2(11);
  PM_ROPT_TO_SCH_DATE     varchar2(11);
  PM_WHERE_CLAUSE         varchar2(10000);
  PM_EUR_CCY              varchar2(3);
  FUNCTION AfterReport RETURN boolean;
  FUNCTION AfterPForm RETURN boolean;
  FUNCTION BeforeReport RETURN boolean;
  FUNCTION cf_1formula(schedule_date in date) RETURN varchar2;
  FUNCTION cf_2formula(component_ccy in varchar2, overdue_amount in number)
    RETURN varchar2;
  FUNCTION cf_3formula(summary_schedule_date in date) RETURN varchar2;
  FUNCTION cf_4formula(summary_component_ccy     in varchar2,
                       cumulative_overdue_amount in number) RETURN varchar2;
  FUNCTION cf_eur_overdue_amountformula(eur_type       in varchar2,
                                        overdue_amount in number,
                                        component_ccy  in varchar2)
    RETURN varchar2;
  PROCEDURE F_ERRORTRAP(P_ErrorCode in Varchar2);
  FUNCTION cf_5formula(c_eur_type                in varchar2,
                       cumulative_overdue_amount in number,
                       summary_component_ccy     in varchar2) RETURN varchar2;

  PROCEDURE Pr_Skip_Handler(P_Stage IN VARCHAR2);
  FUNCTION Fn_Post_Build_Type_Structure(p_Source           IN VARCHAR2,
                                        p_Source_Operation IN VARCHAR2,
                                        p_FUNCTION_Id      IN VARCHAR2,
                                        p_Action_Code      IN VARCHAR2,
                                        p_Child_FUNCTION   IN VARCHAR2,
                                        p_Addl_Info        IN Cspks_Req_Global.Ty_Addl_Info,
                                        p_olrposch         IN OUT olpks_olrposch_main.ty_olrposch,
                                        p_Err_Code         IN OUT VARCHAR2,
                                        p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Pre_Get_Params(p_Source           IN VARCHAR2,
                             p_Source_Operation IN VARCHAR2,
                             p_FUNCTION_Id      IN VARCHAR2,
                             p_Action_Code      IN VARCHAR2,
                             p_Child_FUNCTION   IN VARCHAR2,
                             p_Gen_Mode         IN VARCHAR2,
                             p_olrposch         IN OUT olpks_olrposch_main.ty_olrposch,
                             p_Err_Code         IN OUT VARCHAR2,
                             p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Post_Get_Params(p_Source           IN VARCHAR2,
                              p_Source_Operation IN VARCHAR2,
                              p_FUNCTION_Id      IN VARCHAR2,
                              p_Action_Code      IN VARCHAR2,
                              p_Child_FUNCTION   IN VARCHAR2,
                              p_Gen_Mode         IN VARCHAR2,
                              p_olrposch         IN OUT olpks_olrposch_main.ty_olrposch,
                              p_Err_Code         IN OUT VARCHAR2,
                              p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Pre_Check_Mandatory(p_Source           IN VARCHAR2,
                                  p_Source_Operation IN VARCHAR2,
                                  p_FUNCTION_Id      IN VARCHAR2,
                                  p_Action_Code      IN VARCHAR2,
                                  p_Child_FUNCTION   IN VARCHAR2,
                                  p_olrposch         IN OUT olpks_olrposch_main.ty_olrposch,
                                  p_Err_Code         IN OUT VARCHAR2,
                                  p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Post_Check_Mandatory(p_Source           IN VARCHAR2,
                                   p_Source_Operation IN VARCHAR2,
                                   p_FUNCTION_Id      IN VARCHAR2,
                                   p_Action_Code      IN VARCHAR2,
                                   p_Child_FUNCTION   IN VARCHAR2,
                                   p_Pk_Or_Full       IN VARCHAR2 DEFAULT 'FULL',
                                   p_olrposch         IN olpks_olrposch_main.ty_olrposch,
                                   p_Err_Code         IN OUT VARCHAR2,
                                   p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Pre_Default_And_Validate(p_source           IN VARCHAR2,
                                       p_Source_Operation IN VARCHAR2,
                                       p_FUNCTION_Id      IN VARCHAR2,
                                       p_Action_Code      IN VARCHAR2,
                                       p_Child_FUNCTION   IN VARCHAR2,
                                       p_olrposch         IN olpks_olrposch_main.ty_olrposch,
                                       p_wrk_olrposch     IN OUT olpks_olrposch_main.ty_olrposch,
                                       p_Err_Code         IN OUT VARCHAR2,
                                       p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Post_Default_And_Validate(p_Source           IN VARCHAR2,
                                        p_Source_Operation IN VARCHAR2,
                                        p_FUNCTION_Id      IN VARCHAR2,
                                        p_Action_Code      IN VARCHAR2,
                                        p_Child_FUNCTION   IN VARCHAR2,
                                        p_olrposch         IN olpks_olrposch_main.ty_olrposch,
                                        p_wrk_olrposch     IN OUT olpks_olrposch_main.ty_olrposch,
                                        p_Err_Code         IN OUT VARCHAR2,
                                        p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Pre_Process(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_FUNCTION_Id      IN VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_Child_FUNCTION   IN VARCHAR2,
                          p_Post_Upl_Stat    IN VARCHAR2,
                          p_Multi_Trip_Id    IN VARCHAR2,
                          p_olrposch         IN olpks_olrposch_main.ty_olrposch,
                          p_wrk_olrposch     IN OUT olpks_olrposch_main.ty_olrposch,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Post_Process(p_Source           IN VARCHAR2,
                           p_source_operation IN VARCHAR2,
                           p_FUNCTION_id      IN VARCHAR2,
                           p_action_code      IN VARCHAR2,
                           p_Child_FUNCTION   IN VARCHAR2,
                           p_Post_Upl_Stat    IN VARCHAR2,
                           p_Multi_Trip_Id    IN VARCHAR2,
                           p_olrposch         IN olpks_olrposch_main.ty_olrposch,
                           p_wrk_olrposch     IN OUT olpks_olrposch_main.ty_olrposch,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

END olpks_olrposch_kernel;
/