CREATE OR REPLACE PACKAGE olpks_oldprmnt_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_oldprmnt_utils.spc
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
  
  **Changed By         : Prakash Ravi
  **Date               : 29-Apr-2019
  **Change Description : Added code to populate trade stage table on product authorization.
  **Search String      : OBCL_14.3_Trade_Product_Population 

  **Changed By         : Arunadevi Rajendran
  **Date               : 08-JUL-2020
  **Change Description : New component addition
  **Search String      : OBCL_14.4_NewComp_Addition Changes
  
  **Changed By         : Venkat N
  **Date               : 26-AUG-2021
  **Change Description : Accounting Rule validation
  **Search String      : OBCL_14.5_RuleBasedAccounting

   **Changed By       : Usha Rani Kota
 **Date               : 24-Oct-2021
 **Change Description : Added changes for Rule Based Role to head Mapping 
 **Search String      : OBCL_14.5_RuleBasedRoleToHeadMapping
 
  **Changed By          : Abhik Das
  **Changed On          : 03-Nov-2023
  **Change Description  : System was re-defaulting the liquidation order maintained for NORM 
                          Status to all other product status for modification of product 
                          even if there is no change done by user in liquidation order.
                          Added code to restrict the re-default of liquidation order maintained 
                          for NORM Status to all other product status for modification of product 
                          only if user does any change in liquidation order
  **Search String       : OBCL_14.5_BNTB_Fwdport_Bug#35971254_Changes

  -------------------------------------------------------------------------------------------------------
  */
  --Pr_Log_Error(p_Function_Id,p_Source,p_Err_Code,p_Err_Params);
  prm_allow_instalment   VARCHAR(1) := 'N';
  prm_pay_method_changed VARCHAR(1) := 'N';
  prm_sch_val_required   VARCHAR(1) := 'N';
  ---OBCL_14.5_BNTB_Fwdport_Bug#35971254_Changes Starts---
  TYPE Ty_Tb_Product_Liq_Order IS TABLE OF Oltms_Product_Liq_Order%ROWTYPE 
    INDEX BY BINARY_INTEGER;
  p_Product_Liq_Order    Ty_Tb_Product_Liq_Order;
  ----OBCL_14.5_BNTB_Fwdport_Bug#35971254_Changes Ends----
  PROCEDURE DEL_DANGLING_SCHS(p_wrk_oldprmnt IN OUT olpks_oldprmnt_main.ty_oldprmnt);
  PROCEDURE pr_ld_delete_details(p_product_code oltms_product.PRODUCT_CODE%TYPE);
  FUNCTION fn_chk_primary_comp(p_Source           IN VARCHAR2,
                               p_Source_Operation IN VARCHAR2,
                               p_Function_Id      IN VARCHAR2,
                               p_Action_Code      IN VARCHAR2,
                               p_Child_Function   IN VARCHAR2,
                               p_oldprmnt         IN olpks_oldprmnt_main.ty_oldprmnt,
                               p_prev_oldprmnt    IN olpks_oldprmnt_main.ty_oldprmnt,
                               p_wrk_oldprmnt     IN OUT olpks_oldprmnt_main.ty_oldprmnt,
                               p_Err_Code         IN OUT VARCHAR2,
                               p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION fn_cross_validations(p_Source           IN VARCHAR2,
                                p_Source_Operation IN VARCHAR2,
                                p_Function_Id      IN VARCHAR2,
                                p_Action_Code      IN VARCHAR2,
                                p_Child_Function   IN VARCHAR2,
                                p_oldprmnt         IN olpks_oldprmnt_main.ty_oldprmnt,
                                p_prev_oldprmnt    IN OUT olpks_oldprmnt_main.ty_oldprmnt,
                                p_wrk_oldprmnt     IN OUT olpks_oldprmnt_main.ty_oldprmnt,
                                p_Err_Code         IN OUT VARCHAR2,
                                p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_ld_save_validations(p_Source           IN VARCHAR2,
                                  p_Source_Operation IN VARCHAR2,
                                  p_Function_Id      IN VARCHAR2,
                                  p_Action_Code      IN VARCHAR2,
                                  p_Child_Function   IN VARCHAR2,
                                  p_oldprmnt         IN olpks_oldprmnt_main.ty_oldprmnt,
                                  p_prev_oldprmnt    IN olpks_oldprmnt_main.ty_oldprmnt,
                                  p_wrk_oldprmnt     IN OUT olpks_oldprmnt_main.ty_oldprmnt,
                                  p_Err_Code         IN OUT VARCHAR2,
                                  p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION fn_ld_pref_validations(p_Source           IN VARCHAR2,
                                  p_Source_Operation IN VARCHAR2,
                                  p_Function_Id      IN VARCHAR2,
                                  p_Action_Code      IN VARCHAR2,
                                  p_Child_Function   IN VARCHAR2,
                                  p_oldprmnt         IN olpks_oldprmnt_main.ty_oldprmnt,
                                  p_prev_oldprmnt    IN olpks_oldprmnt_main.ty_oldprmnt,
                                  p_wrk_oldprmnt     IN OUT olpks_oldprmnt_main.ty_oldprmnt,
                                  p_Err_Code         IN OUT VARCHAR2,
                                  p_Err_Params       IN OUT VARCHAR2)
  
   RETURN BOOLEAN;

  FUNCTION FN_PRODUCT_NAME(p_product in varchar2, p_out out varchar2)
    RETURN BOOLEAN;

  FUNCTION fn_save(p_Source           IN VARCHAR2,
                   p_Source_Operation IN VARCHAR2,
                   p_Function_Id      IN VARCHAR2,
                   p_Action_Code      IN VARCHAR2,
                   p_Child_Function   IN VARCHAR2,
                   p_oldprmnt         IN olpks_oldprmnt_main.ty_oldprmnt,
                   p_prev_oldprmnt    IN OUT olpks_oldprmnt_main.ty_oldprmnt,
                   p_wrk_oldprmnt     IN OUT olpks_oldprmnt_main.ty_oldprmnt,
                   p_Err_Code         IN OUT VARCHAR2,
                   p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_close(p_Source           IN VARCHAR2,
                    p_Source_Operation IN VARCHAR2,
                    p_Function_Id      IN VARCHAR2,
                    p_Action_Code      IN VARCHAR2,
                    p_Child_Function   IN VARCHAR2,
                    p_oldprmnt         IN olpks_oldprmnt_main.ty_oldprmnt,
                    p_prev_oldprmnt    IN OUT olpks_oldprmnt_main.ty_oldprmnt,
                    p_wrk_oldprmnt     IN OUT olpks_oldprmnt_main.ty_oldprmnt,
                    p_Err_Code         IN OUT VARCHAR2,
                    p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION fn_authorize(p_Source           IN VARCHAR2,
                    p_Source_Operation IN VARCHAR2,
                    p_Function_Id      IN VARCHAR2,
                    p_Action_Code      IN VARCHAR2,
                    p_Child_Function   IN VARCHAR2,
                    p_oldprmnt         IN olpks_oldprmnt_main.ty_oldprmnt,
                    p_prev_oldprmnt    IN olpks_oldprmnt_main.ty_oldprmnt,
                    p_wrk_oldprmnt     IN OUT olpks_oldprmnt_main.ty_oldprmnt,
                    p_Err_Code         IN OUT VARCHAR2,
                    p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION fn_reopen(p_product_code IN VARCHAR2) RETURN BOOLEAN;
  PROCEDURE pr_holiday_flag_sch(p_wrk_oldprmnt IN OUT olpks_oldprmnt_main.ty_oldprmnt);
  PROCEDURE pr_holiday_flag_mat(p_wrk_oldprmnt IN OUT olpks_oldprmnt_main.ty_oldprmnt);
  PROCEDURE PR_ALLOW_INSTALMENT(p_wrk_oldprmnt IN OUT olpks_oldprmnt_main.ty_oldprmnt);

  FUNCTION fn_ld_set_dflt_schedules(p_Source           IN VARCHAR2,
                                    p_Source_Operation IN VARCHAR2,
                                    p_Function_Id      IN VARCHAR2,
                                    p_Action_Code      IN VARCHAR2,
                                    p_Child_Function   IN VARCHAR2,
                                    p_oldprmnt         IN olpks_oldprmnt_main.ty_oldprmnt,
                                    p_prev_oldprmnt    IN olpks_oldprmnt_main.ty_oldprmnt,
                                    p_wrk_oldprmnt     IN OUT olpks_oldprmnt_main.ty_oldprmnt,
                                    p_Err_Code         IN OUT VARCHAR2,
                                    p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION fn_ld_iccf_defined(p_wrk_oldprmnt IN olpks_oldprmnt_main.ty_oldprmnt)
    RETURN BOOLEAN;

  FUNCTION fn_iccf_details_validations(p_Source           IN VARCHAR2,
                                       p_Source_Operation IN VARCHAR2,
                                       p_Function_Id      IN VARCHAR2,
                                       p_Action_Code      IN VARCHAR2,
                                       p_Child_Function   IN VARCHAR2,
                                       p_oldprmnt         IN olpks_oldprmnt_main.ty_oldprmnt,
                                       p_prev_oldprmnt    IN OUT olpks_oldprmnt_main.ty_oldprmnt,
                                       p_wrk_oldprmnt     IN OUT olpks_oldprmnt_main.ty_oldprmnt,
                                       p_Err_Code         IN OUT VARCHAR2,
                                       p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  PROCEDURE pr_ld_set_schedule_list(p_wrk_oldprmnt IN OUT olpks_oldprmnt_main.ty_oldprmnt,
                                    i              IN NUMBER);

  FUNCTION fn_ld_schedule_validations(p_Source           IN VARCHAR2,
                                      p_Source_Operation IN VARCHAR2,
                                      p_Function_Id      IN VARCHAR2,
                                      p_Action_Code      IN VARCHAR2,
                                      p_Child_Function   IN VARCHAR2,
                                      p_oldprmnt         IN olpks_oldprmnt_main.ty_oldprmnt,
                                      p_prev_oldprmnt    IN OUT olpks_oldprmnt_main.ty_oldprmnt,
                                      p_wrk_oldprmnt     IN OUT olpks_oldprmnt_main.ty_oldprmnt,
                                      p_Err_Code         IN OUT VARCHAR2,
                                      p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  PROCEDURE PR_CHK_PRIMARY_SCH(p_wrk_oldprmnt IN OUT olpks_oldprmnt_main.ty_oldprmnt);

  FUNCTION fn_status_chk_accrual_order(p_wrk_oldprmnt IN OUT olpks_oldprmnt_main.ty_oldprmnt,
                                       i              NUMBER) RETURN BOOLEAN;
  FUNCTION fn_status_validations(p_Source           IN VARCHAR2,
                                 p_Source_Operation IN VARCHAR2,
                                 p_Function_Id      IN VARCHAR2,
                                 p_Action_Code      IN VARCHAR2,
                                 p_Child_Function   IN VARCHAR2,
                                 p_oldprmnt         IN olpks_oldprmnt_main.ty_oldprmnt,
                                 p_prev_oldprmnt    IN OUT olpks_oldprmnt_main.ty_oldprmnt,
                                 p_wrk_oldprmnt     IN OUT olpks_oldprmnt_main.ty_oldprmnt,
                                 p_Err_Code         IN OUT VARCHAR2,
                                 p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION FN_COPY_DEPENDENT_TAGS(p_wrk_oldprmnt IN OUT olpks_oldprmnt_main.ty_oldprmnt)
    RETURN BOOLEAN;
  PROCEDURE pr_mis_update_log(l_mode         varchar2,
                              l_rowid        varchar2,
                              p_wrk_oldprmnt olpks_oldprmnt_main.ty_oldprmnt);
  FUNCTION fn_upload_validations(p_Source           IN VARCHAR2,
                                 p_Source_Operation IN VARCHAR2,
                                 p_Function_Id      IN VARCHAR2,
                                 p_Action_Code      IN VARCHAR2,
                                 p_Child_Function   IN VARCHAR2,
                                 p_Post_Upl_Stat    IN VARCHAR2,
                                 p_Multi_Trip_Id    IN VARCHAR2,
                                 p_oldprmnt         IN olpks_oldprmnt_main.ty_oldprmnt,
                                 p_prev_oldprmnt    IN olpks_oldprmnt_main.ty_oldprmnt,
                                 p_wrk_oldprmnt     IN OUT olpks_oldprmnt_main.ty_oldprmnt,
                                 p_Err_Code         IN OUT VARCHAR2,
                                 p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --OLDSTATS
  FUNCTION fn_delete_liq_order(p_Source           IN VARCHAR2,
                               p_Source_Operation IN VARCHAR2,
                               p_Function_Id      IN VARCHAR2,
                               p_Action_Code      IN VARCHAR2,
                               p_Child_Function   IN VARCHAR2,
                               p_Post_Upl_Stat    IN VARCHAR2,
                               p_Multi_Trip_Id    IN VARCHAR2,
                               p_oldprmnt         IN olpks_oldprmnt_main.ty_oldprmnt,
                               p_prev_oldprmnt    IN olpks_oldprmnt_main.ty_oldprmnt,
                               p_wrk_oldprmnt     IN OUT olpks_oldprmnt_main.ty_oldprmnt,
                               p_Err_Code         IN OUT VARCHAR2,
                               p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION fn_insert_liq_order(p_Source           IN VARCHAR2,
                               p_Source_Operation IN VARCHAR2,
                               p_Function_Id      IN VARCHAR2,
                               p_Action_Code      IN VARCHAR2,
                               p_Child_Function   IN VARCHAR2,
                               p_Post_Upl_Stat    IN VARCHAR2,
                               p_Multi_Trip_Id    IN VARCHAR2,
                               p_oldprmnt         IN olpks_oldprmnt_main.ty_oldprmnt,
                               p_prev_oldprmnt    IN olpks_oldprmnt_main.ty_oldprmnt,
                               p_wrk_oldprmnt     IN OUT olpks_oldprmnt_main.ty_oldprmnt,
                               p_Err_Code         IN OUT VARCHAR2,
                               p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --OBCL_14.5_RuleBasedAccounting Start
  FUNCTION fn_acct_rule_validations(p_Source      IN VARCHAR2,
                               p_Source_Operation IN VARCHAR2,
                               p_Function_Id      IN VARCHAR2,
                               p_Action_Code      IN VARCHAR2,
                               p_oldprmnt         IN olpks_oldprmnt_main.ty_oldprmnt,
                               p_wrk_oldprmnt     IN OUT olpks_oldprmnt_main.ty_oldprmnt,
                               p_Err_Code         IN OUT VARCHAR2,
                               p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
   --OBCL_14.5_RuleBasedAccounting End
   --OBCL_14.5_RuleBasedRoleToHeadMapping >> Starts
   FUNCTION fn_rth_rule_validations(p_Source      IN VARCHAR2,
                               p_Source_Operation IN VARCHAR2,
                               p_Function_Id      IN VARCHAR2,
                               p_Action_Code      IN VARCHAR2,
                               p_oldprmnt         IN olpks_oldprmnt_main.ty_oldprmnt,
                               p_wrk_oldprmnt     IN OUT olpks_oldprmnt_main.ty_oldprmnt,
                               p_Err_Code         IN OUT VARCHAR2,
                               p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN; 
   --OBCL_14.5_RuleBasedRoleToHeadMapping << Ends
   ---OBCL_14.5_BNTB_Fwdport_Bug#35971254_Changes Starts---
  FUNCTION Fn_Update_Liq_Order(p_Source           IN VARCHAR2,
                               p_Source_Operation IN VARCHAR2,
                               p_Function_Id      IN VARCHAR2,
                               p_Action_Code      IN VARCHAR2,
                               p_Child_Function   IN VARCHAR2,
                               p_Post_Upl_Stat    IN VARCHAR2,
                               p_Multi_Trip_Id    IN VARCHAR2,
                               p_Oldprmnt         IN Olpks_Oldprmnt_Main.Ty_Oldprmnt,
                               p_Prev_Oldprmnt    IN Olpks_Oldprmnt_Main.Ty_Oldprmnt,
                               p_Wrk_Oldprmnt     IN OUT Olpks_Oldprmnt_Main.Ty_Oldprmnt,
                               p_Prev_Liq_Order   IN OUT p_Product_Liq_Order%TYPE,
                               p_Err_Code         IN OUT VARCHAR2,
                               p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  ----OBCL_14.5_BNTB_Fwdport_Bug#35971254_Changes Ends----
  --OLDSTATS
  --OBCL_14.3_Trade_Product_Population Changes start
  FUNCTION Fn_Insert_Data_For_Trade(p_Source           IN VARCHAR2,
                               p_Source_Operation IN VARCHAR2,
                               p_Function_Id      IN VARCHAR2,
                               p_Action_Code      IN VARCHAR2,
                               p_Child_Function   IN VARCHAR2,
                               p_Post_Upl_Stat    IN VARCHAR2,
                               p_Multi_Trip_Id    IN VARCHAR2,
                               p_oldprmnt         IN olpks_oldprmnt_main.ty_oldprmnt,
                               p_prev_oldprmnt    IN olpks_oldprmnt_main.ty_oldprmnt,
                               p_wrk_oldprmnt     IN OUT olpks_oldprmnt_main.ty_oldprmnt,
                               p_Err_Code         IN OUT VARCHAR2,
                               p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --OBCL_14.3_Trade_Product_Population Changes end
  --OBCL_14.4_NewComp_Addition Changes starts start
  FUNCTION Fn_Insert_NewCompAddition(p_Source           IN VARCHAR2,
                                     p_Function_Id      IN VARCHAR2,
                                     p_prev_oldprmnt    IN olpks_oldprmnt_main.ty_oldprmnt,
                                     p_wrk_oldprmnt     IN olpks_oldprmnt_main.ty_oldprmnt,
                                     p_Err_Code         IN OUT VARCHAR2,
                                     p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --OBCL_14.4_NewComp_Addition Changes starts end
END olpks_oldprmnt_utils;
/
CREATE OR REPLACE SYNONYM olpkss_oldprmnt_utils FOR olpks_oldprmnt_utils
/