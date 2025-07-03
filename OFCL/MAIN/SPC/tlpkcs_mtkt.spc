CREATE OR REPLACE PACKAGE tlpkcs_mtkt IS
  FUNCTION fn_validate_tkt_settl_dt(P_ticket_id         IN tltbs_consol_ticket_detail.ticket_id%TYPE,
                                    p_actual_settl_date IN tltbs_settlement_master.actual_settl_date%TYPE,
                                    p_err_code          IN OUT VARCHAR2,
                                    p_err_param         IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION FN_VALIDATE_STL_POSITION(p_CONSOL_TICKET_REF_NO IN tltbs_consol_ticket_master.CONSOL_TICKET_REF_NO%type,
                                    p_Err_Code             IN OUT VARCHAR2,
                                    p_Err_Params           IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_pop_consol_ticket_fee(p_CONSOL_TICKET_REF_NO IN tltbs_consol_ticket_master.CONSOL_TICKET_REF_NO%type,
                                    p_Err_Code             IN OUT VARCHAR2,
                                    p_Err_Params           IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_pop_consol_trade_detail(p_CONSOL_TICKET_REF_NO IN tltbs_consol_ticket_master.CONSOL_TICKET_REF_NO%type,
                                      p_value_date           IN tltbs_consol_ticket_master.ACTUAL_SETTL_DATE%type,
                                      P_ticket_id            IN tltbs_consol_ticket_detail.ticket_id%TYPE,
                                      P_agency_id            IN tltbs_consol_ticket_detail.AGENCY_ID%type,
                                      p_Err_Code             IN OUT VARCHAR2,
                                      p_Err_Params           IN OUT VARCHAR2)
    RETURN BOOLEAN;
  PROCEDURE pr_validate_settlement_handoff(p_value_date           IN tltbs_consol_ticket_master.ACTUAL_SETTL_DATE%type,
                                           p_CONSOL_TICKET_REF_NO IN tltbs_consol_ticket_master.CONSOL_TICKET_REF_NO%type,
                                           p_Err_Code             IN OUT VARCHAR2,
                                           p_Err_Params           IN OUT VARCHAR2,
                                           p_success_flag         in out boolean);
  PROCEDURE pr_check_stl_position(p_CONSOL_TICKET_REF_NO IN tltbs_consol_ticket_master.CONSOL_TICKET_REF_NO%type,
                                  p_Err_Code             IN OUT VARCHAR2,
                                  p_Err_Params           IN OUT VARCHAR2,
                                  p_success_flag         in out boolean);
  PROCEDURE pr_validate_portfolio_position(p_value_date           IN tltbs_consol_ticket_master.ACTUAL_SETTL_DATE%type,
                                           p_CONSOL_TICKET_REF_NO IN tltbs_consol_ticket_master.CONSOL_TICKET_REF_NO%type,
                                           p_Err_Code             IN OUT VARCHAR2,
                                           p_Err_Params           IN OUT VARCHAR2,
                                           p_success_flag         in out boolean);
  PROCEDURE pr_validate_inter_desk_trades(p_CONSOL_TICKET_REF_NO IN tltbs_consol_ticket_master.CONSOL_TICKET_REF_NO%type,
                                          p_Err_Code             IN OUT VARCHAR2,
                                          p_Err_Params           IN OUT VARCHAR2,
                                          p_success_flag         in out boolean);
  PROCEDURE PR_VERIFY_CLP_TRADE_AMOUNT(P_TICKET_ID            tltbs_CONSOL_TICKET_DETAIL.TICKET_ID%TYPE,
                                       p_CONSOL_TICKET_REF_NO IN tltbs_consol_ticket_master.CONSOL_TICKET_REF_NO%type,
                                       p_Err_Code             IN OUT VARCHAR2,
                                       p_Err_Params           IN OUT VARCHAR2,
                                       p_success_flag         in out boolean);
END tlpkcs_mtkt;
/
CREATE OR REPLACE SYNONYM tlpkcss_mtkt FOR tlpkcs_mtkt
/