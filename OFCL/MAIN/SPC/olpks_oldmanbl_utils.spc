create or replace package olpks_oldmanbl_utils AS

  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_oldmanbl_utils.spc
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

  
  Created by        : Neeraj.Krishna
  Created Date      : 05-July-2016
  Description 		: Development for OFCL-12.3
  
  -------------------------------------------------------------------------------------------------------
  */

  g_prm_mat_type     varchar2(200);
  g_prm_mat_date     date;
  g_prm_rdy_to_save  varchar2(200);
  g_prm_event_seq_no number;

  PROCEDURE pr_undo_billing_event_seq_no(p_Source           IN VARCHAR2,
                                         p_Source_Operation IN VARCHAR2,
                                         p_Function_Id      IN VARCHAR2,
                                         p_Action_Code      IN VARCHAR2,
                                         p_Child_Function   IN VARCHAR2,
                                         p_oldmanbl         IN olpks_oldmanbl_main.ty_oldmanbl,
                                         p_wrk_oldmanbl     IN OUT olpks_oldmanbl_main.ty_oldmanbl,
                                         p_Err_Code         IN OUT VARCHAR2,
                                         p_Err_Params       IN OUT VARCHAR2);
  PROCEDURE pr_create_event_log(p_Source           IN VARCHAR2,
                                p_Source_Operation IN VARCHAR2,
                                p_Function_Id      IN VARCHAR2,
                                p_Action_Code      IN VARCHAR2,
                                p_Child_Function   IN VARCHAR2,
                                p_oldmanbl         IN olpks_oldmanbl_main.ty_oldmanbl,
                                p_wrk_oldmanbl     IN OUT olpks_oldmanbl_main.ty_oldmanbl,
                                p_Err_Code         IN OUT VARCHAR2,
                                p_Err_Params       IN OUT VARCHAR2,
                                p_new_version      Varchar2,
                                g_prm_cont_stat    IN oltbs_contract.contract_status%TYPE);

  PROCEDURE PR_SET_DT_STAMP(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_Child_Function   IN VARCHAR2,
                            p_oldmanbl         IN olpks_oldmanbl_main.ty_oldmanbl,
                            p_wrk_oldmanbl     IN OUT olpks_oldmanbl_main.ty_oldmanbl,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2,
                            p_mode             IN VARCHAR2);

  PROCEDURE PR_AUTH_EVENT_LOG(p_Source           IN VARCHAR2,
                              p_Source_Operation IN VARCHAR2,
                              p_Function_Id      IN VARCHAR2,
                              p_Action_Code      IN VARCHAR2,
                              p_Child_Function   IN VARCHAR2,
                              p_oldmanbl         IN olpks_oldmanbl_main.ty_oldmanbl,
                              p_wrk_oldmanbl     IN OUT olpks_oldmanbl_main.ty_oldmanbl,
                              p_Err_Code         IN OUT VARCHAR2,
                              p_Err_Params       IN OUT VARCHAR2);

  function Fn_populate_bill_detail_prev(p_Source           IN VARCHAR2,
                                        p_Source_Operation IN VARCHAR2,
                                        p_Function_Id      IN VARCHAR2,
                                        p_Action_Code      IN VARCHAR2,
                                        p_Child_Function   IN VARCHAR2,
                                        p_oldmanbl         IN olpks_oldmanbl_main.ty_oldmanbl,
                                        p_wrk_oldmanbl     IN OUT olpks_oldmanbl_main.ty_oldmanbl,
                                        p_Err_Code         IN OUT VARCHAR2,
                                        p_Err_Params       IN OUT VARCHAR2)
    Return Boolean;

  function Fn_populate_bill_detail_next(p_Source           IN VARCHAR2,
                                        p_Source_Operation IN VARCHAR2,
                                        p_Function_Id      IN VARCHAR2,
                                        p_Action_Code      IN VARCHAR2,
                                        p_Child_Function   IN VARCHAR2,
                                        p_oldmanbl         IN olpks_oldmanbl_main.ty_oldmanbl,
                                        p_wrk_oldmanbl     IN OUT olpks_oldmanbl_main.ty_oldmanbl,
                                        p_Err_Code         IN OUT VARCHAR2,
                                        p_Err_Params       IN OUT VARCHAR2)
    Return Boolean;
  FUNCTION fn_get_period_prev(p_contract_ref_no IN VARCHAR2,
                              p_component       IN VARCHAR2,
                              p_component_type  IN VARCHAR2,
                              p_due_date        IN DATE,
                              p_start_date      OUT DATE,
                              p_end_date        OUT DATE) RETURN BOOLEAN;
  FUNCTION fn_get_period_next(p_contract_ref_no IN VARCHAR2,
                              p_component       IN VARCHAR2,
                              p_component_type  IN VARCHAR2,
                              p_due_date        IN DATE,
                              p_start_date      OUT DATE,
                              p_end_date        OUT DATE,
                              p_period_ind      IN VARCHAR2) RETURN BOOLEAN;
  FUNCTION fn_decide_event_seq_no(p_contract_ref_no IN VARCHAR2,
                                  p_billing_esn     IN NUMBER,
                                  p_component       IN VARCHAR2,
                                  p_end_date        IN DATE,
                                  p_err_code        IN OUT VARCHAR2,
                                  p_err_desc        IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION fn_compare_liqd_mode(p_contract_ref_no    IN VARCHAR2,
                                p_billing_esn        IN NUMBER,
                                p_component          IN VARCHAR2,
                                p_event_seq_no       IN NUMBER,
                                p_end_date           IN DATE,
                                p_is_liqd_mode_equal IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION fn_get_comp_type(p_contract_ref_no IN VARCHAR2,
                            p_component       IN VARCHAR2,
                            p_component_type  IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION fn_get_liqd_mode(p_contract_ref_no IN VARCHAR2,
                            p_component       IN VARCHAR2,
                            p_component_type  IN VARCHAR2,
                            p_scd_type        IN VARCHAR2,
                            p_liqd_mode       OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION fn_compare_billing_days(p_contract_ref_no        IN VARCHAR2,
                                   p_billing_esn            IN NUMBER,
                                   p_component              IN VARCHAR2,
                                   p_event_seq_no           IN NUMBER,
                                   p_are_billing_days_equal IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION fn_get_billing_days(p_contract_ref_no IN VARCHAR2,
                               p_component       IN VARCHAR2,
                               p_component_type  IN VARCHAR2,
                               p_billing_days    IN OUT NUMBER,
                               p_err_code        IN OUT VARCHAR2,
                               p_err_param       IN OUT VARCHAR2)
    RETURN BOOLEAN;
end olpks_oldmanbl_utils;
/