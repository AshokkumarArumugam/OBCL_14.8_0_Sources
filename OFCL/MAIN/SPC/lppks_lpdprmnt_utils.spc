CREATE OR REPLACE PACKAGE lppks_lpdprmnt_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lppks_lpdprmnt_utils.spc
  **
  ** Module     : Participant Tranches and Drawdowns
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved
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

  Function fn_validations(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_Child_Function   IN VARCHAR2,
                          p_lpdprmnt         IN lppks_lpdprmnt_Main.Ty_lpdprmnt,
                          p_Prev_lpdprmnt    IN OUT lppks_lpdprmnt_Main.Ty_lpdprmnt,
                          p_Wrk_lpdprmnt     IN OUT lppks_lpdprmnt_Main.Ty_lpdprmnt,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2)
  
   Return BOOLEAN;

  function fn_linkage(p_Source           IN VARCHAR2,
                      p_Source_Operation IN VARCHAR2,
                      p_Function_Id      IN VARCHAR2,
                      p_Action_Code      IN VARCHAR2,
                      p_Child_Function   IN VARCHAR2,
                      p_lpdprmnt         IN lppks_lpdprmnt_Main.Ty_lpdprmnt,
                      p_Prev_lpdprmnt    IN OUT lppks_lpdprmnt_Main.Ty_lpdprmnt,
                      p_Wrk_lpdprmnt     IN OUT lppks_lpdprmnt_Main.Ty_lpdprmnt,
                      p_Err_Code         IN OUT VARCHAR2,
                      p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_establish_product_link(p_Source           IN VARCHAR2,
                                     p_Source_Operation IN VARCHAR2,
                                     p_Function_Id      IN VARCHAR2,
                                     p_Action_Code      IN VARCHAR2,
                                     p_Child_Function   IN VARCHAR2,
                                     p_lpdprmnt         IN lppks_lpdprmnt_Main.Ty_lpdprmnt,
                                     p_Wrk_lpdprmnt     IN OUT lppks_lpdprmnt_Main.Ty_lpdprmnt,
                                     p_Err_Code         IN OUT VARCHAR2,
                                     p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION FN_COPY_FROM_BORROWER_PRODUCT(p_Source           IN VARCHAR2,
                                         p_Source_Operation IN VARCHAR2,
                                         p_Function_Id      IN VARCHAR2,
                                         p_Action_Code      IN VARCHAR2,
                                         p_Child_Function   IN VARCHAR2,
                                         p_lpdprmnt         IN lppks_lpdprmnt_Main.Ty_lpdprmnt,
                                         
                                         p_Wrk_lpdprmnt IN OUT lppks_lpdprmnt_Main.Ty_lpdprmnt,
                                         p_Err_Code     IN OUT VARCHAR2,
                                         p_Err_Params   IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_copy_fee(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_Child_Function   IN VARCHAR2,
                       p_lpdprmnt         IN lppks_lpdprmnt_Main.Ty_lpdprmnt,
                       
                       p_Wrk_lpdprmnt IN OUT lppks_lpdprmnt_Main.Ty_lpdprmnt,
                       p_Err_Code     IN OUT VARCHAR2,
                       p_Err_Params   IN OUT VARCHAR2) RETURN boolean;

  FUNCTION fn_break_product_link(p_Source           IN VARCHAR2,
                                 p_Source_Operation IN VARCHAR2,
                                 p_Function_Id      IN VARCHAR2,
                                 p_Action_Code      IN VARCHAR2,
                                 p_Child_Function   IN VARCHAR2,
                                 p_lpdprmnt         IN lppks_lpdprmnt_Main.Ty_lpdprmnt,
                                 p_Prev_lpdprmnt    IN OUT lppks_lpdprmnt_Main.Ty_lpdprmnt,
                                 p_Wrk_lpdprmnt     IN OUT lppks_lpdprmnt_Main.Ty_lpdprmnt,
                                 p_Err_Code         IN OUT VARCHAR2,
                                 p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_cross_validations(p_Source           IN VARCHAR2,
                                p_Source_Operation IN VARCHAR2,
                                p_Function_Id      IN VARCHAR2,
                                p_Action_Code      IN VARCHAR2,
                                p_Child_Function   IN VARCHAR2,
                                p_lpdprmnt         IN lppks_lpdprmnt_Main.Ty_lpdprmnt,
                                p_Prev_lpdprmnt    IN OUT lppks_lpdprmnt_Main.Ty_lpdprmnt,
                                p_Wrk_lpdprmnt     IN OUT lppks_lpdprmnt_Main.Ty_lpdprmnt,
                                p_Err_Code         IN OUT VARCHAR2,
                                p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  Function Fn_check_total(p_product    IN oltbs_contract.product_code%type,
                          p_module     IN oltbs_contract.module_code%type,
                          p_error_code IN OUT ertbs_msgs.err_code%type)
    return boolean;

  Function fn_check_acct(p_product    IN oltbs_contract.product_code%type,
                         p_module     IN oltbs_contract.module_code%type,
                         p_error_code IN OUT ertbs_msgs.err_code%type)
    return boolean;
  PROCEDURE pr_mis_update_log(l_mode         varchar2,
                              l_rowid        varchar2,
                              p_wrk_lpdprmnt lppks_lpdprmnt_main.ty_lpdprmnt);

  FUNCTION fn_save(p_Source           IN VARCHAR2,
                   p_Source_Operation IN VARCHAR2,
                   p_Function_Id      IN VARCHAR2,
                   p_Action_Code      IN VARCHAR2,
                   p_Child_Function   IN VARCHAR2,
                   p_lpdprmnt         IN lppks_lpdprmnt_main.ty_lpdprmnt,
                   p_prev_lpdprmnt    IN OUT lppks_lpdprmnt_main.ty_lpdprmnt,
                   p_wrk_lpdprmnt     IN OUT lppks_lpdprmnt_main.ty_lpdprmnt,
                   p_Err_Code         IN OUT VARCHAR2,
                   p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_close(p_Source           IN VARCHAR2,
                    p_Source_Operation IN VARCHAR2,
                    p_Function_Id      IN VARCHAR2,
                    p_Action_Code      IN VARCHAR2,
                    p_Child_Function   IN VARCHAR2,
                    p_lpdprmnt         IN lppks_lpdprmnt_main.ty_lpdprmnt,
                    p_prev_lpdprmnt    IN OUT lppks_lpdprmnt_main.ty_lpdprmnt,
                    p_wrk_lpdprmnt     IN OUT lppks_lpdprmnt_main.ty_lpdprmnt,
                    p_Err_Code         IN OUT VARCHAR2,
                    p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_authorize(p_Source           IN VARCHAR2,
                        p_Source_Operation IN VARCHAR2,
                        p_Function_Id      IN VARCHAR2,
                        p_Action_Code      IN VARCHAR2,
                        p_Child_Function   IN VARCHAR2,
                        p_lpdprmnt         IN lppks_lpdprmnt_main.ty_lpdprmnt,
                        p_prev_lpdprmnt    IN lppks_lpdprmnt_main.ty_lpdprmnt,
                        p_wrk_lpdprmnt     IN OUT lppks_lpdprmnt_main.ty_lpdprmnt,
                        p_Err_Code         IN OUT VARCHAR2,
                        p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_reopen(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_wrk_lpdprmnt     IN OUT lppks_lpdprmnt_main.ty_lpdprmnt,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_delete(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_wrk_lpdprmnt     IN OUT lppks_lpdprmnt_main.ty_lpdprmnt,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
end lppks_lpdprmnt_utils;
/