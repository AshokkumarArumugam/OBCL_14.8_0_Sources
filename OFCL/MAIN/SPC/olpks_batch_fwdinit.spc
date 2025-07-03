CREATE OR REPLACE PACKAGE olpks_batch_fwdinit AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_batch_fwdinit.spc
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
  -------------------------------------------------------------------------------------------------------*/

  g_split_processing Varchar2(1) := 'N';
  pkg_maker_id       oltbs_contract_event_log.Maker_id%TYPE; --FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-382
  pkg_auth_id        oltbs_contract_event_log.Checker_id%TYPE;

  FUNCTION fn_Process_Fwd_Init_contract(pm_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
                                        pm_module          IN oltbs_contract.module_code%TYPE,
                                        p_Branch           IN Oltbs_Contract.Branch%TYPE,
                                        p_User_Id          IN VARCHAR2,
                                        p_ELCM_MSGID       OUT VARCHAR2,
                                        pm_err_code        IN OUT VARCHAR2,
                                        pm_params          IN OUT VARCHAR2)
    RETURN VARCHAR2;

  FUNCTION fn_Authorise_Fwd_Init_Contract(pm_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
                                          pm_module          IN oltbs_contract.module_code%TYPE,
                                          p_Branch           IN Oltbs_Contract.Branch%TYPE,
                                          p_User_Id          IN VARCHAR2,
                                          pm_err_code        IN OUT VARCHAR2,
                                          pm_params          IN OUT VARCHAR2)
    RETURN VARCHAR2;

  FUNCTION Fn_Process_Cont_Init(pm_reference IN oltbs_contract.contract_ref_no%TYPE,
                                pm_auth_stat IN OUT VARCHAR2,
                                -- pm_mode      IN VARCHAR2,
                                pm_err_code IN OUT VARCHAR2,
                                pm_params   IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Auth_Cont_Init(pm_reference IN oltbs_contract.contract_ref_no%TYPE,
                             pm_err_code  IN OUT VARCHAR2,
                             pm_params    IN OUT VARCHAR2) RETURN BOOLEAN;

  PROCEDURE pr_upd_log(pm_reference    IN oltbs_contract.contract_ref_no%TYPE,
                       pm_module       IN oltbs_contract.module_code%TYPE,
                       pm_esn          IN oltbs_contract.latest_event_seq_no%TYPE,
                       pm_event        IN oltbs_contract_event_log.event_code%TYPE,
                       pm_status       IN oltbs_contract_event_log.contract_status%TYPE,
                       pm_auth_stat    IN CHAR,
                       pm_reversed_esn IN oltbs_contract_event_log.reversed_event_seq_no%TYPE);

  PROCEDURE pr_upd_log(pm_reference    IN oltbs_contract.contract_ref_no%TYPE,
                       pm_module       IN oltbs_contract.module_code%TYPE,
                       pm_esn          IN oltbs_contract.latest_event_seq_no%TYPE,
                       pm_event        IN oltbs_contract_event_log.event_code%TYPE,
                       pm_status       IN oltbs_contract_event_log.contract_status%TYPE,
                       pm_auth_stat    IN CHAR,
                       pm_event_date   IN DATE,
                       pm_reversed_esn IN oltbs_contract_event_log.reversed_event_seq_no%TYPE);

  FUNCTION fn_init_ent(pm_ldrec     IN oltbs_contract_master%ROWTYPE,
                       pm_esn       IN oltbs_contract.latest_event_seq_no%TYPE,
                       pm_mode      IN CHAR,
                       pm_auth_stat IN OUT VARCHAR2,
                       pm_status    IN oltbs_contract.user_defined_status%TYPE,
                       pm_err_code  IN OUT VARCHAR2,
                       pm_params    IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_auth_init_ent(pm_ldrec     IN oltbs_contract_master%ROWTYPE,
                            pm_esn       IN oltbs_contract.latest_event_seq_no%TYPE,
                            pm_mode      IN CHAR,
                            pm_auth_stat IN OUT VARCHAR2,
                            pm_status    IN oltbs_contract.user_defined_status%TYPE,
                            pm_err_code  IN OUT VARCHAR2,
                            pm_params    IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_update_comp_balances_init(p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
                                        p_currency        IN oltbs_contract.contract_ccy%TYPE,
                                        p_product_type    IN oltbs_contract.product_type%TYPE,
                                        p_value_date      IN DATE,
                                        p_contract_type   IN VARCHAR2,
                                        p_principal       IN oltbs_contract_master.amount%TYPE,
                                        p_err_code        IN OUT VARCHAR2,
                                        p_err_param       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Roll_Contra_Reserve(p_Contract_Ref_No IN oltbs_contract.contract_ref_no%TYPE,
                                  p_roll_type       IN VARCHAR2, ----FLEXCUBE V.CL Release 7.6  CITIUS-LS#7181
                                  p_error_code      IN OUT VARCHAR2,
                                  p_error_param     IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_project_parent(p_contract_ref_no IN oltbs_contract_master.parent_contract_ref_no%TYPE,
                             p_child_ref_no    IN oltbs_contract_master.contract_ref_no%TYPE,
                             p_cross_ref       IN VARCHAR2,
                             p_processing_date IN DATE,
                             amt               IN OUT olpkss_rollover.amount_struct,
                             p_error_code      IN OUT VARCHAR2,
                             p_error_param     IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Auth_Acc_Entry(p_contract_ref_no      IN oltbs_contract.contract_ref_no%TYPE,
                             p_current_event_seq_no IN oltbs_contract.latest_event_seq_no%TYPE,
                             p_event_code           IN oltbs_contract.curr_event_code%TYPE,
                             p_auth_stat            IN CHAR,
                             pm_err_code            IN OUT VARCHAR2,
                             pm_params              IN OUT VARCHAR2)
    RETURN BOOLEAN;

  TYPE contract_struct IS RECORD(
    module              oltbs_contract.module_code%TYPE,
    product_type        oltbs_contract.product_type%TYPE,
    contract_ccy        oltbs_contract.contract_ccy%TYPE,
    customer            oltbs_contract.counterparty%TYPE,
    contract_ref_no     oltbs_contract.contract_ref_no%TYPE,
    user_ref_no         oltbs_contract.user_ref_no%TYPE,
    custom_ref_no       oltbs_contract.custom_ref_no%TYPE,
    external_ref_no     oltbs_contract.external_ref_no%TYPE,
    latest_event_seq_no oltbs_contract.latest_event_seq_no%TYPE,
    curr_event_code     oltbs_contract.curr_event_code%TYPE,
    product_code        oltbs_contract.product_code%TYPE,
    booking_date        DATE,
    payment_method      oltbs_contract_master.payment_method%TYPE,
    current_version_no  oltbs_contract.latest_version_no%TYPE,
    contract_amount     oltbs_contract_master.amount%TYPE,
    value_date          DATE,
    maturity_type       oltbs_contract_master.maturity_type%TYPE,
    maturity_date       DATE,
    notice_days         oltbs_contract_master.notice_days%TYPE,
    primary_interest    oltbs_contract_master.main_comp%TYPE,
    --FCC 3.9 changes fro formatting OF 83J starts
    op_scope            oltbs_contract_master.op_scope%TYPE,
 ins_party_name sttm_core_customer.customer_name1%TYPE,
    ins_party_bic       VARCHAR2(35),
    ins_party_acct      VARCHAR2(35),
    ins_party_addr1     VARCHAR2(35),
    ins_party_addr2     VARCHAR2(35),
    ins_party_city      VARCHAR2(35),
    ins_party_clrg_code VARCHAR2(40),
 ben_party_name sttm_core_customer.customer_name1%TYPE,
    ben_party_bic       VARCHAR2(35),
    ben_party_acct      VARCHAR2(35),
    ben_party_addr1     VARCHAR2(35),
    ben_party_addr2     VARCHAR2(35),
    ben_party_city      VARCHAR2(35),
    ben_party_clrg_code VARCHAR2(40),
    ins_party_fedwire   VARCHAR2(9),
    ins_party_chipuid   VARCHAR2(6),
    ins_party_chapsc    VARCHAR2(6),
    ben_party_fedwire   VARCHAR2(9),
    ben_party_chipuid   VARCHAR2(6),
    ben_party_chapsc    VARCHAR2(6),
    no_of_tracers       NUMBER(4),
    tracer_required     VARCHAR2(1),
    -- Vichu Start
    parent_contract_ref_no VARCHAR2(16),
    parent_fcc_reference   VARCHAR2(16)
    -- Vichu Ends
    );

  FUNCTION fn_swift_compatibility_checks(p_contract_ref_no      IN oltbs_contract.contract_ref_no%TYPE,
                                         p_current_event_seq_no IN oltbs_contract.latest_event_seq_no%TYPE,
                                         p_authorization_status IN oltbs_contract.auth_status%TYPE,
                                         p_error_code           IN OUT VARCHAR2,
                                         p_error_parameter      IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Auth_Event_Log(p_Contract_Ref_No      IN oltbs_contract.Contract_Ref_No%TYPE,
                             p_Event_Code           IN oltbs_contract.Curr_Event_Code%TYPE,
                             p_Event_Esn            IN oltbs_contract_event_log.AUTH_STATUS%TYPE,
                             p_Contract_Status      IN oltbs_contract_event_log.Contract_Status%TYPE,
                             p_Authorization_Status IN oltbs_contract.Auth_Status%TYPE,
                             p_Err_Code             IN OUT VARCHAR2,
                             p_Err_Param            IN OUT VARCHAR2)
    RETURN BOOLEAN;

  PROCEDURE Pr_Populate_Imm_Handoff(p_Contract_Ref_No IN VARCHAR2,
                                    p_Module          IN VARCHAR2,
                                    p_Value_Date      IN DATE,
                                    p_User_Id         IN VARCHAR2,
                                    p_Esn             IN NUMBER,
                                    p_Event_Code      IN VARCHAR2);

  PROCEDURE Pr_Set_Send_Another_Msg(p_Value IN VARCHAR2);
  g_Send_Another_Msg VARCHAR2(1) := 'N';
  g_Full_Mat_Dt_Liqd VARCHAR2(1) := 'N';

  FUNCTION Fn_Auth_Imm_Handoff(p_Contract_Ref_No IN VARCHAR2,
                               p_Module          IN VARCHAR2,
                               p_Value_Date      IN DATE,
                               p_User_Id         IN VARCHAR2,
                               p_Esn             IN NUMBER,
                               p_Event_Code      IN VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Auth_Event_Acc_Log(pm_reference IN oltbs_contract_event_log.CONTRACT_REF_NO%TYPE,
                                 pm_event     IN oltbs_contract_event_log.EVENT_CODE%TYPE,
                                 pm_errors    IN OUT VARCHAR2,
                                 pm_params    IN OUT VARCHAR2) RETURN BOOLEAN;

END olpks_batch_fwdinit;
/
CREATE OR REPLACE Synonym olpkss_batch_fwdinit FOR olpks_batch_fwdinit
/