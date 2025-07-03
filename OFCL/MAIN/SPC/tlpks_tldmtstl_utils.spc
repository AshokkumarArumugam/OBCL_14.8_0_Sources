CREATE OR REPLACE PACKAGE tlpks_tldmtstl_utils AS

  g_PRM_MNEMONIC_MAPPING    CHAR(1);
  g_EXT_PART_SSI            boolean;
  g_prm_ext_part_ssi_exists CHAR(1);
  g_prm_buy_sell            TLTBS_contract_master.Buy_Sell%type;
  g_prm_deal_type           TLTBS_contract_master.deal_type%type;
  g_prm_ext_party_exist     VARCHAR2(1);
  g_PRM_ALLOW_MULTI_TKT     char(1);
  g_PRM_ASGNFEE_PMNT_ATTKT  char(1);

  g_fmem_visit              boolean;
  g_fmem_gen_status        boolean;
  g_fmem_populated         CHAR(1);
  g_PRM_TRADE_SETTL_STATUS CHAR(1);
  g_prm_chk_flag           number;

  g_PRM_FMEM_UPLOAD_STATUS  VARCHAR2(1);
  g_prm_setl_amt_due_picked VARCHAR2(1);
  g_prm_agency_type         oltbs_contract_master.agency_type%type;
  g_prm_trade_identifier    TLTBS_contract_master.Trade_Identifier%type;
  g_prm_buy                 TLTBS_contract_master.Buy_Sell%type;
  
  
  Function set_status(p_subsystem  IN VARCHAR2,p_subsysstat IN VARCHAR2,status_length number,new_status varchar2) RETURN VARCHAR2;

  PROCEDURE PR_GEN_CONSOL_CTKT_REF_NO(p_Action_Code  IN VARCHAR2,
                                      p_Wrk_tldmtstl IN OUT tlpks_tldmtstl_Main.Ty_tldmtstl,
                                      p_Err_Code     IN OUT VARCHAR2,
                                      p_Err_Params   IN OUT VARCHAR2,
                                      p_gen_flag     IN OUT BOOLEAN);

  FUNCTION fn_get_subsys_stat(p_subsystem  IN VARCHAR2,
                              p_subsysstat IN VARCHAR2) RETURN VARCHAR2;

 FUNCTION fn_external_party_exist(p_counterparty VARCHAR2) RETURN VARCHAR2;

  FUNCTION fn_get_dflt_stl_ins(p_cparty     IN VARCHAR2,
                               p_settle_ccy IN VARCHAR2,
                               p_module     IN VARCHAR2,
                               p_branch     IN VARCHAR2,
                               p_product    IN VARCHAR2,
                               p_query      OUT VARCHAR2) RETURN BOOLEAN;

  PROCEDURE pr_ext_part_ssi(p_CONSOL_TICKET_REF_NO IN tltbs_consol_ticket_master.CONSOL_TICKET_REF_NO%type,
                            p_Action_code          IN VARCHAR2,
                            p_Err_Code             IN OUT VARCHAR2,
                            p_Err_Params           IN OUT VARCHAR2,
                            p_success_flag         in out boolean);

  PROCEDURE pr_gen_msg_on_auth(p_consol_ticket_ref_no tltbs_consol_ticket_master.consol_ticket_ref_no%TYPE);

  PROCEDURE pr_restore_assign_fee(p_trade_ref_no tltbs_contract_master.contract_ref_no%TYPE);

  PROCEDURE pr_update_agency_id(p_CONSOL_TICKET_REF_NO IN tltbs_consol_ticket_master.CONSOL_TICKET_REF_NO%type,
                                p_trade_ref_no         tltbs_contract_master.contract_ref_no%TYPE);

  PROCEDURE pr_validate_ssi(p_CONSOL_TICKET_REF_NO IN tltbs_consol_ticket_master.CONSOL_TICKET_REF_NO%type,
                            p_Err_Code             IN OUT VARCHAR2,
                            p_Err_Params           IN OUT VARCHAR2,
                            p_success_flag         in out boolean);

  PROCEDURE PR_VERIFY_SSI(p_CONSOL_TICKET_REF_NO IN tltbs_consol_ticket_master.CONSOL_TICKET_REF_NO%type,
                          p_Err_Code             IN OUT VARCHAR2,
                          p_Err_Params           IN OUT VARCHAR2,
                          p_success_flag         in out boolean);

  PROCEDURE PR_BUILD_PARAM(p_TRADE_REF_NO          TLTBS_CONSOL_TRADE_DETAIL.TRADE_REF_NO%type,
                           p_tltbs_contract_master in out tltbs_contract_master%rowtype,
                           p_trade_user_ref_no     in out oltbs_contract.user_ref_no%type,
                           p_portfolio_desc        in out tltms_portfolio.portfolio_desc%type);

  function Fn_BTN_MNEMONIC_DETAILS(p_Source           IN VARCHAR2,
                                   p_Source_Operation IN VARCHAR2,
                                   p_Function_Id      IN VARCHAR2,
                                   p_Action_Code      IN VARCHAR2,
                                   p_Child_Function   IN VARCHAR2,
                                   p_tldmtstl         IN tlpks_tldmtstl_Main.Ty_tldmtstl,
                                   p_Prev_tldmtstl    IN out tlpks_tldmtstl_Main.Ty_tldmtstl,
                                   p_Wrk_tldmtstl     IN OUT tlpks_tldmtstl_Main.Ty_tldmtstl,
                                   p_Err_Code         IN OUT VARCHAR2,
                                   p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_sys_Pickup(p_Source           IN VARCHAR2,
                         p_Source_Operation IN VARCHAR2,
                         p_Function_Id      IN VARCHAR2,
                         p_Action_code      IN VARCHAR2,
                         p_tldmtstl         IN tlpks_tldmtstl_Main.Ty_tldmtstl,
                         p_Prev_tldmtstl    IN OUT tlpks_tldmtstl_Main.Ty_tldmtstl,
                         p_Wrk_tldmtstl     IN OUT tlpks_tldmtstl_Main.Ty_tldmtstl,
                         p_Err_Code         IN OUT VARCHAR2,
                         p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_sys_Pickup_upload(p_Source           IN VARCHAR2,
                                p_Source_Operation IN VARCHAR2,
                                p_Function_Id      IN VARCHAR2,
                                p_Action_code      IN VARCHAR2,
                                p_tldmtstl         IN tlpks_tldmtstl_Main.Ty_tldmtstl,
                                p_Prev_tldmtstl    IN out tlpks_tldmtstl_Main.Ty_tldmtstl,
                                p_Wrk_tldmtstl     IN OUT tlpks_tldmtstl_Main.Ty_tldmtstl,
                                p_Err_Code         IN OUT VARCHAR2,
                                p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

END tlpks_tldmtstl_utils;
/
CREATE OR REPLACE SYNONYM tlpkss_tldmtstl_utils FOR tlpks_tldmtstl_utils
/