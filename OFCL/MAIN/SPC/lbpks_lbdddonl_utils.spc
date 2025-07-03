CREATE OR REPLACE PACKAGE lbpks_lbdddonl_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdddonl_utils.spc
  **
  ** Module     : Syndication Loans and Commitments
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
  
  18-APR-2018 LS14.1 ECA changes --Logged records into ECA table for DDA processing
  
    Changed By         : Surya Prabha S
    Changed On         : 14-Feb-2020
    Search String      : OBCL_14.4_LS_Multi_Auth
    Change Reason      : Multi Authorization changes.
	
	Changed By         : Akhila Samson
    Changed On         : 23-Aug-2024
    Search String      : Bug#36904894 
    Change Reason      : Added a new function to check the valuedate and maturity date based on holiday preference for gateway.
  -------------------------------------------------------------------------------------------------------
  */
  g_prm_revolving_commitment   OLTBS_CONTRACT_PREFERENCE.revolving_commitment%TYPE;
  g_prm_auto_repay_sch         OLTBS_CONTRACT_PREFERENCE.auto_repay_sch%TYPE;
  g_PRM_NOTICE_DAYS            LBTBS_SYNDICATION_MASTER.PYMT_NOTICE_DAYS%TYPE;
  g_prm_flrcl_to_base_rate     OLTBS_CONTRACT_PREFERENCE.flrcl_restricted_to_base_rate%TYPE := 'N';
  g_prm_module                 OLTBS_CONTRACT_MASTER.MODULE%TYPE := 'LB';
  g_prm_min_tenor              OLTMS_PRODUCT_MASTER_LD.min_tenor%TYPE;
  g_prm_max_tenor              OLTMS_PRODUCT_MASTER_LD.max_tenor%TYPE;
  g_prm_tenor_unit             OLTMS_PRODUCT_MASTER_LD.tenor_unit%TYPE;
  g_prm_forward_dating_allowed OLTMS_PRODUCT_MASTER_LD.forward_dating_allowed%TYPE;
  g_prm_setl_reqd              OLTMS_PRODUCT_MASTER_LD.settlement_reqd%TYPE;
  g_PRM_SUPPRESS_ADVICES       OLTMS_PRODUCT_MASTER_LD.suppress_advices%TYPE;
  g_prm_partial_intpmt_allowed OLTMS_PRODUCT_MASTER_LD.partial_interest_pmt_allowed%TYPE;
  g_prm_roll_rate_fixing_reqd  LFTMS_PRODUCT_ICCF.rate_fixing_reqd%TYPE;
  g_prm_roll_main_comp         LFTMS_PRODUCT_ICCF.component%TYPE;
  g_PRM_PRIME_LOAN             OLTMS_PRODUCT_MASTER_LD.prime_loan%TYPE;
  g_prm_settlement_pickup      varchar2(1000);
  g_prm_tax                    varchar2(1);
  g_prm_Tranche_Auth_Status    varchar2(1);
  g_prm_gen_roll_adv           number;
  g_prm_dly_refinance          varchar2(1);
  g_DRAWDOWN_TYPE              varchar2(1) := 'N';
  g_participant_visited        varchar2(1000);
  g_prm_proc_meth              OLTMS_BRANCH.PARTICIPANT_PROCESS_METHOD%TYPE;
  g_prm_once_split             varchar2(1000);
  g_prm_advices                varchar2(1000);
  g_prm_sch_exploded           varchar2(1000);
  g_prm_sch_defaulted          varchar2(1000);
  g_prm_tax_pickup             varchar2(1000);
  g_prm_iccf_pickup            varchar2(1000);
  g_prm_CHARge_pickup          varchar2(1000);
  g_prm_fees_pickup            varchar2(1000);
  g_PRM_PARTY_TYPE_VISITED     varchar2(1000);
  g_prm_udf_defaulted          varchar2(1000);
  g_PRM_SPLIT_ROLL             varchar2(1000);
  g_prm_unlock                 varchar2(1000);
  g_prm_iccf_Changed           varchar2(1);
  g_prm_tax_Changed            varchar2(1);
  g_prm_settlement_Changed     varchar2(1);
  g_prm_brokerage_Changed      varchar2(1);
  g_prm_mis_changed            varchar2(1);
  g_prm_CHARge_changed         varchar2(1);
  g_prm_linkage_defaulted      varchar2(1);
  g_prm_is_rollover            varchar2(1);
  g_prm_skim_visited           varchar2(1);
  g_prm_update_no_of_drawdowns varchar2(1);
  g_PRM_INDEX_CCY              cytms_ccy_defn.index_flag%type;
  g_PRM_CALENDER_DATE          varchar2(1);
  g_PRM_CALENDAR_SELECT        varchar2(1);
  g_bid_flag                   varchar2(1);
  g_prm_old_exch_rate          lbtbs_drawdown_schedule.exch_rate%type;
  g_prm_old_linked_amt         oltb_contract_linkages.linked_amount%type;
  g_WORKFLOW                   varchar2(1);
  g_PRM_REVAL_REQD             OLTMS_PRODUCT_MASTER_LD.utilization_reval_reqd%type;
  g_prm_int_populated          varchar2(1);
  g_prm_rate_defaulted         varchar2(1);
  g_prm_rate_displayed         varchar2(1);
  g_PRM_CONT_UNLOCKED          varchar2(1);
  g_part_hold_status           varchar2(1);
  g_prm_roll_amt_type          oltbs_contract_rollover.rollover_amount_type%type;
  g_PRM_SIGHTING_FUNDS_APPL    varchar2(1);
  g_prm_roll_intrate_changed   varchar2(1);
  g_query_prev                 number := 1;

  g_sign_verIFied          varchar2(1000);
  g_entity                 varchar2(1000);
  g_participants_entered   varchar2(1000);
  g_split_rollover         varchar2(1000);
  g_prm_iccf_visited       varchar2(1000);
  g_iccf_visited           varchar2(1000);
  g_participants_changed   varchar2(1000);
  g_mis                    varchar2(1000);
  g_split_rollover_entered varchar2(1000);
  g_prm_part_rebuild_req   varchar2(1);
  g_prm_part_validate      varchar2(1);
  g_prm_intra_day_deal     varchar2(1);
  g_PRM_OLD_EX_DATE        lbtbs_drawdown_schedule.EXCH_RATE_FIXING_DATE%type;
  g_exfx_fixed             varchar2(100);
  g_prm_old_dflt_ac_br     varchar2(100);
  g_prm_old_dflt_ac        varchar2(100);
  g_prm_avl_amount         number;

  g_prm_roll_sch_basis       oltbs_contract_rollover.schedule_definition_basis%type;
  g_PRM_ROLL_INT_PARAM_BASIS oltbs_contract_rollover.interest_parameter_basis%type;
  --global.
  g_dflt_settle_ac         varchar2(100);
 g_dflt_settle_ac_branch varchar2(100);
  g_dflt_settle_ccy        varchar2(100);
  g_dr_setl_ac             varchar2(100);
 g_dr_setl_ac_br varchar2(100);
  g_dr_setl_ccy            varchar2(100);
  g_SSI_MNEMONIC_CHANGED   varchar2(100) := 'FALSE';
  g_PRM_ROLL_MATURITY_DATE oltbs_contract_rollover.maturity_date%type;

  g_prm_savepoint_issued    varchar2(100);
  g_prm_RENewal_type        varchar2(100);
  g_PRM_LIQ_BV_FLAG_CHANGED varchar2(1);
  g_prm_old_ui_mat_date     date;
  g_prm_forward_event       varchar2(100);
  g_prm_fee_comp            varchar2(1);
  g_prm_fee_userinput       varchar2(1);
  g_PRM_OLD_START_DATE      date;
  g_prm_old_no_scheds       oltbs_contract_schedules.no_of_schedules%type;
  g_prm_acct_linked_deposit varchar2(1);
  g_Cs_ops                  varchar2(1);
  g_prm_old_frequency       oltbs_contract_schedules.frequency%type;
  g_prm_linked_to_ref_vis   varchar2(1);
  g_PRM_LINKED_TO_REF       oltb_contract_linkages.LINKED_TO_REF%type;
  g_split_rollover_revisit  varchar2(100);
  g_prm_install_dep         varchar2(100);
  g_Roll_ExRate_fixed       varchar2(100);
  g_Roll_IntRate_fixed      varchar2(100);
  g_prm_validate            varchar2(1);
  g_PRM_COPY_DONE           varchar2(1);

  g_prm_old_sch_exploded varchar2(100);
  g_prm_old_once_split   varchar2(100);
  g_INT_RECALC           varchar2(100); --intereset button BTN_ICCF clicked or not

  g_prm_effective_dt DATE;

  g_PRM_OLD_SSI_PICKUP oltbs_contract_preference.part_ssi_pickup_at%type;

  g_prm_brokerage VARCHAR2(5);
  --g_media_visited varchar2(1);

  g_prm_brokerage_pickup varchar2(100);
  g_prm_iccf_amort       varchar2(1);

  g_prm_customer_name OLTMS_CUSTOMER.customer_name1%type;

  FUNCTION Fn_Product_Default(p_Source           IN VARCHAR2,
                              p_Source_Operation IN VARCHAR2,
                              p_Function_Id      IN VARCHAR2,
                              p_Action_Code      IN VARCHAR2,
                              p_lbdddonl         IN lbpks_lbdddonl_Main.Ty_lbdddonl,
                              p_wrk_lbdddonl     IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
                              p_Err_Code         IN OUT VARCHAR2,
                              p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  PROCEDURE pr_set_parameters(pAction        IN VARCHAR2,
                              p_wrk_lbdddonl IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl);

  PROCEDURE pr_enab_disab_media(product_code in oltbs_contract.product_code%type);

  PROCEDURE pr_set_mat_hol_preference(p_wrk_lbdddonl IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
                                      p_Action_Code  IN VARCHAR2);

  PROCEDURE pr_set_sch_hol_preference(p_wrk_lbdddonl IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
                                      p_Action_Code  IN VARCHAR2);

  PROCEDURE PR_CREATE_EVENT_LOG(p_wrk_lbdddonl IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl);

  FUNCTION FN_Default(p_Source           IN VARCHAR2,
                      p_Source_Operation IN VARCHAR2,
                      p_Function_Id      IN VARCHAR2,
                      p_Action_Code      IN VARCHAR2,
                      p_lbdddonl         IN lbpks_lbdddonl_Main.Ty_lbdddonl,
                      p_wrk_lbdddonl     IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
                      p_Err_Code         IN OUT VARCHAR2,
                      p_Err_Params       IN OUT VARCHAR2) RETURN boolean;

  FUNCTION Fn_Default2(p_Source                 IN VARCHAR2,
                       p_Source_Operation       IN VARCHAR2,
                       p_Function_Id            IN VARCHAR2,
                       p_Action_Code            IN VARCHAR2,
                       p_lbdddonl               IN lbpks_lbdddonl_Main.Ty_lbdddonl,
                       p_Wrk_lbdddonl           IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
                       p_oltm_product_master_ld oltm_product_master_ld%rowtype,
                       p_Err_Code               IN OUT VARCHAR2,
                       p_Err_Params             IN OUT VARCHAR2)
    RETURN BOOLEAN;
-- OBCL_14.4_LS_Multi_Auth changes starts
  FUNCTION fn_set_auto_auth(p_Source       IN VARCHAR2,
                            p_Action_Code  IN VARCHAR2,
                            p_Function_Id  IN VARCHAR2,
                            p_wrk_lbdddonl IN OUT lbpks_lbdddonl_main.ty_lbdddonl,
                            p_Err_Code     IN OUT VARCHAR2,
                            p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;
-- OBCL_14.4_LS_Multi_Auth changes end                           
  PROCEDURE pr_default_from_contract(P_Action_code  IN VARCHAR2,
                                     p_wrk_lbdddonl IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
                                     p_Source       IN VARCHAR2,
                                     p_Function_Id  IN VARCHAR2,
                                     p_Err_Code     IN OUT VARCHAR2,
                                     p_Err_Params   IN OUT VARCHAR2);

  PROCEDURE pr_set_product_defaults(p_product_code IN VARCHAR2,
                                    P_Action_code  IN VARCHAR2,
                                    p_wrk_lbdddonl IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
                                    p_Source       IN VARCHAR2,
                                    p_Function_Id  IN VARCHAR2,
                                    p_Err_Code     IN OUT VARCHAR2,
                                    p_Err_Params   IN OUT VARCHAR2);

  PROCEDURE pr_get_tranche_params(pTrancheRefNo  IN VARCHAR2,
                                  P_Action_code  IN VARCHAR2,
                                  p_wrk_lbdddonl IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
                                  p_Source       IN VARCHAR2,
                                  p_Function_Id  IN VARCHAR2,
                                  p_Err_Code     IN OUT VARCHAR2,
                                  p_Err_Params   IN OUT VARCHAR2);

  PROCEDURE PR_TRANCHE_PARTICIPANT_BACKUP(p_tranche_ref_no IN VARCHAR2,
                                          p_Source         IN VARCHAR2,
                                          p_Function_Id    IN VARCHAR2,
                                          p_Err_Code       IN OUT VARCHAR2,
                                          p_Err_Params     IN OUT VARCHAR2);

  FUNCTION fn_generate_custom_ref_no(p_wrk_lbdddonl IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
                                     p_Source       IN VARCHAR2,
                                     p_Function_Id  IN VARCHAR2,
                                     p_Err_Code     IN OUT VARCHAR2,
                                     p_Err_Params   IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_validate_md_for_holiday(p_Source       IN VARCHAR2,
                                      p_Function_Id  IN VARCHAR2,
                                      p_Wrk_lbdddonl IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
                                      p_working_date OUT DATE,
                                      p_Err_Code     IN OUT VARCHAR2,
                                      p_Err_Params   IN OUT VARCHAR2)
    RETURN BOOLEAN;

  PROCEDURE PR_SET_BORROWER_DEFAULTS(p_wrk_lbdddonl IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
                                     p_Source       IN VARCHAR2,
                                     p_Function_Id  IN VARCHAR2,
                                     p_Err_Code     IN OUT VARCHAR2,
                                     p_Err_Params   IN OUT VARCHAR2);
  FUNCTION Fn_get_desc(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_Wrk_lbdddonl     IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
--LS14.1 ECA Changes
Function fn_roll_a_contract_over_wrap(p_Wrk_Lbdddonl    IN Lbpks_Lbdddonl_Main.Ty_lbdddonl,
                                      p_error_code	IN OUT	VARCHAR2,
                                      p_error_param	IN OUT	VARCHAR2)RETURN BOOLEAN;                     

 --Bug#36904894 starts 
 FUNCTION Fn_Holiday_Check_Value_Maturity_Dt(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                       p_Wrk_Lbdddonl    IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl,
                                       p_Lbdddonl    IN  Lbpks_Lbdddonl_Main.Ty_Lbdddonl,
                                       p_Validation_Type IN VARCHAR2,
                                       p_Source_Date     IN DATE,
                                       p_Holiday_Status  OUT VARCHAR2,
                                       p_Working_Date    OUT DATE,
                                       p_Error_Code      OUT VARCHAR2)
  RETURN BOOLEAN;
  --Bug#36904894 ends 
END lbpks_lbdddonl_utils;
/