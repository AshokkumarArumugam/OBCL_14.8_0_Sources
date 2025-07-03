CREATE OR REPLACE PACKAGE tlpks_tldtkstl_utils AS
  /*-----------------------------------------------------------------------------------------------------
   **
   ** File Name  : tlpks_tldtkstl_utils.spc
   **
   ** Module     : Secondary Loan Trading
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
   CHANGE HISTORY     : 12.4_OFCL_patch
   Changed By         : RANJAN KUMAR
   Change Description : add new function Fn_MEMO_MEMUP_Upload
   Search Key         : 12.4_OFCL_patch
   Changed On         : 22-MAy-2017
  
   -------------------------------------------------------------------------------------------------------
  */

  g_PRM_ASGN_FEE_INPUT      varchar2(100);
  g_PRM_ASGNFEE_PMNT_ATTKT  varchar2(100);
  g_prm_ticket_id           varchar2(100);
  g_prm_ticket_reF_no       varchar2(100);
  g_PRM_MNEMONIC_MAPPING    varchar2(100) := 'N';
  g_prm_ext_part_ssi_exists varchar2(100) := 'N';
  g_prm_buy_sell            varchar2(100);
  g_prm_deal_type           varchar2(100);
  g_prm_ext_party_exist     varchar2(100);
  --g_EXT_PART_SSI            varchar2(100);
  g_PRM_SSI_CHANGED         varchar2(100) := 'N';
  g_prm_propagate_ssi       varchar2(100);
  g_fmem_visited            varchar2(32678);
  g_PRM_DD_COUNT            NUMBER(38) := 0;
  g_PRM_NEW_BTN_VISIT       NUMBER(38) := 0;
  g_PRM_CHK_NUM             NUMBER(38);
  g_prm_func_id             varchar2(100);
  g_PRM_PMT_MSGNET_TKT      varchar2(32678) := 'N';
  g_PRM_ORG_AGENCY_ID       varchar2(100);
  g_PRM_EXT_REF_NO          varchar2(100);
  g_PRM_BRANCH_ASSGN        varchar2(100);
  g_PRM_SOURCE_CODE         varchar2(100);
  g_PRM_VERSION_NO          varchar2(100);
  g_PRM_CONT_CCY            varchar2(100);
  g_prm_setl_amt_due_picked varchar2(100);
  g_prm_buy                 varchar2(100);
  g_prm_trade_identifier    varchar2(100);
  g_prm_agency_type         varchar2(100);
  g_PRM_NEW_AGENCY_ID       varchar2(100);
  g_PRM_TRADE_SETTL_STATUS  varchar2(100);
  g_PRM_FMEM_UPLOAD_STATUS  varchar2(100) := 'N';
  g_PRM_EVENT_SEQ_NO        varchar2(100);
  --g_fmem_gen_status varchar2(100);
  g_fmem_populated varchar2(100);

  g_fmem_visit      boolean;
  g_fmem_gen_status boolean;

  --------------------------------

  g_EXT_PART_SSI boolean;

  --------------------------------

  PROCEDURE PR_GEN_TICKET_REF_NO(p_wrk_tldtkstl IN OUT tlpks_tldtkstl_Main.Ty_tldtkstl,
                                 p_Function_Id  IN VARCHAR2,
                                 p_Source       IN VARCHAR2);

  FUNCTION FN_VALID_TKT(p_wrk_tldtkstl IN OUT tlpks_tldtkstl_Main.Ty_tldtkstl)
    RETURN BOOLEAN;

  FUNCTION FN_TICKET_DATE_VALIDATIONS(p_wrk_tldtkstl IN OUT tlpks_tldtkstl_Main.Ty_tldtkstl,
                                      p_Function_Id  IN VARCHAR2,
                                      p_Source       IN VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION FN_CHK_SELLER(p_wrk_tldtkstl IN OUT tlpks_tldtkstl_Main.Ty_tldtkstl,
                         p_err_code     OUT VARCHAR2,
                         p_Err_Params   OUT VARCHAR2) RETURN BOOLEAN;

  PROCEDURE PR_ASSGN_FEE_CHECK(p_ticket_id   TLTBS_TICKET_MASTER.ticket_id%TYPE,
                               p_Function_Id in VARCHAR2,
                               p_Source      VARCHAR2);

  PROCEDURE pr_ticket_validations;

  PROCEDURE PR_POPULATE_DATA_BLOCKS(p_wrk_tldtkstl IN OUT tlpks_tldtkstl_Main.Ty_tldtkstl,
                                    p_Function_Id  IN VARCHAR2,
                                    p_Source       IN VARCHAR2);

 FUNCTION fn_external_party_exist(p_counterparty VARCHAR2) RETURN VARCHAR2;

  PROCEDURE pr_ext_part_ssi(p_wrk_tldtkstl IN OUT tlpks_tldtkstl_Main.Ty_tldtkstl);

  FUNCTION FN_GET_CUSIP_NO(P_CONT_REF_NO VARCHAR2) RETURN VARCHAR2;

  PROCEDURE PR_VERIFY_TRADE_AMOUNT(p_wrk_tldtkstl IN OUT tlpks_tldtkstl_Main.Ty_tldtkstl,
                                   
                                   p_Function_Id IN VARCHAR2,
                                   p_Source      IN VARCHAR2);
  PROCEDURE PR_ASSGN_FEE_VALIDATION(p_Wrk_tldtkstl IN OUT tlpks_tldtkstl_Main.Ty_tldtkstl,
                                    p_Function_Id  IN VARCHAR2,
                                    p_Source       IN VARCHAR2);
  PROCEDURE PR_ASSIGN_TKT_ATTRIBUTES(p_Wrk_tldtkstl IN OUT tlpks_tldtkstl_Main.Ty_tldtkstl,
                                     p_Function_Id  IN VARCHAR2,
                                     p_Source       IN VARCHAR2);
  PROCEDURE PR_VERIFY_SSI(p_Wrk_tldtkstl IN OUT tlpks_tldtkstl_Main.Ty_tldtkstl,
                          p_Function_Id  IN VARCHAR2,
                          p_Source       IN VARCHAR2);

  FUNCTION FN_CHK_TRD_SETTL_STATS(p_wrk_tldtkstl IN OUT tlpks_tldtkstl_Main.Ty_tldtkstl)
    RETURN BOOLEAN;

  FUNCTION FN_VERIFY_SSI(p_wrk_tldtkstl IN OUT tlpks_tldtkstl_Main.Ty_tldtkstl,
                         p_Function_Id  in VARCHAR2,
                         p_Source       VARCHAR2,
                         
                         p_Err_Code   IN OUT VARCHAR2,
                         p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION FN_VALIDATE_SSI(p_wrk_tldtkstl IN OUT tlpks_tldtkstl_Main.Ty_tldtkstl,
                           p_err_code     in out varchar2,
                           p_Err_Params   in out varchar2,
                           p_Function_Id  in VARCHAR2,
                           p_Source       VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_check_stl_position_for_tkt(p_ticket_id  IN tltbs_contract_master.ticket_id%TYPE,
                                         p_err_code   in out varchar2,
                                         p_Err_Params in out varchar2)
    RETURN BOOLEAN;

  PROCEDURE PR_GENERATE_DD_REF_NO(p_wrk_tldtkstl IN OUT tlpks_tldtkstl_Main.Ty_tldtkstl,
                                  p_err_code     in out varchar2,
                                  p_Err_Params   in out varchar2,
                                  p_Function_Id  in VARCHAR2,
                                  p_Source       VARCHAR2);

  FUNCTION FN_CHK_AUTH_STATUS(p_wrk_tldtkstl IN OUT tlpks_tldtkstl_Main.Ty_tldtkstl)
    RETURN BOOLEAN;

  FUNCTION FN_VALIDATE_STL_POSITION(p_ticket_id  IN tltbs_contract_master.ticket_id%TYPE,
                                    p_err_code   in out varchar2,
                                    p_Err_Params in out varchar2)
    RETURN BOOLEAN;

  FUNCTION fn_cusip_amt_validation(p_agency_ref_no IN OLTBS_CONTRACT.contract_ref_no%TYPE,
                                   p_err_code      IN OUT VARCHAR2,
                                   p_Err_Paramss   IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION FN_VALIDATE_FIELDS(p_wrk_tldtkstl IN OUT tlpks_tldtkstl_Main.Ty_tldtkstl,
                              p_err_code     in out varchar2,
                              p_Err_Params   in out varchar2,
                              p_Function_Id  in VARCHAR2,
                              p_Source       VARCHAR2) RETURN BOOLEAN;

  PROCEDURE PR_ASSIGN_COLUMN_VALUE(p_wrk_tldtkstl IN OUT tlpks_tldtkstl_Main.Ty_tldtkstl,
                                   p_err_code     in out varchar2,
                                   p_Err_Params   in out varchar2,
                                   p_Function_Id  in VARCHAR2,
                                   p_Source       VARCHAR2);

  PROCEDURE PR_TRADE_DETAILS(p_wrk_tldtkstl IN OUT tlpks_tldtkstl_Main.Ty_tldtkstl,
                             p_err_code     in out varchar2,
                             p_Err_Params   in out varchar2,
                             p_Function_Id  in VARCHAR2,
                             p_Source       VARCHAR2);
  FUNCTION Fn_BTN_FMEMO(p_Source           IN VARCHAR2,
                        p_Source_Operation IN VARCHAR2,
                        p_Function_Id      IN VARCHAR2,
                        p_Action_Code      IN VARCHAR2,
                        p_Child_Function   IN VARCHAR2,
                        p_tldtkstl         IN tlpks_tldtkstl_Main.Ty_tldtkstl,
                        p_Prev_tldtkstl    IN OUT tlpks_tldtkstl_Main.Ty_tldtkstl,
                        p_Wrk_tldtkstl     IN OUT tlpks_tldtkstl_Main.Ty_tldtkstl,
                        p_record_number    in number,
                        p_Err_Code         IN OUT VARCHAR2,
                        p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  
  --  12.4_OFCL_patch start                    
  FUNCTION Fn_MEMO_MEMUP_Upload(p_Source           IN VARCHAR2,
                                p_Source_Operation IN VARCHAR2,
                                p_Function_Id      IN VARCHAR2,
                                p_Action_Code      IN VARCHAR2,
                                p_tldtkstl         IN Tlpks_tldtkstl_Main.Ty_tldtkstl,
                                p_prev_tldtkstl     IN OUT Tlpks_tldtkstl_Main.Ty_tldtkstl,
                                p_Wrk_tldtkstl     IN OUT Tlpks_tldtkstl_Main.Ty_tldtkstl,
                                p_Err_Code         IN OUT VARCHAR2,
                                p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
    
    --  12.4_OFCL_patch end

  FUNCTION Fn_sys_Pickup(p_Source           IN VARCHAR2,
                         p_Source_Operation IN VARCHAR2,
                         p_Function_Id      IN VARCHAR2,
                         p_Action_code      IN VARCHAR2,
                         p_tldtkstl         IN tlpks_tldtkstl_Main.Ty_tldtkstl,
                         p_Prev_tldtkstl    IN OUT tlpks_tldtkstl_Main.Ty_tldtkstl,
                         p_Wrk_tldtkstl     IN OUT tlpks_tldtkstl_Main.Ty_tldtkstl,
                         p_Err_Code         IN OUT VARCHAR2,
                         p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_get_subsys_stat(p_subsystem  IN VARCHAR2,
                              p_subsysstat IN VARCHAR2) RETURN VARCHAR2;

  function Fn_BTN_MNEMONIC_DETAILS(p_Source           IN VARCHAR2,
                                   p_Source_Operation IN VARCHAR2,
                                   p_Function_Id      IN VARCHAR2,
                                   p_Action_Code      IN VARCHAR2,
                                   p_Child_Function   IN VARCHAR2,
                                   p_tldtkstl         IN tlpks_tldtkstl_Main.Ty_tldtkstl,
                                   p_Prev_tldtkstl    IN out tlpks_tldtkstl_Main.Ty_tldtkstl,
                                   p_Wrk_tldtkstl     IN OUT tlpks_tldtkstl_Main.Ty_tldtkstl,
                                   p_Err_Code         IN OUT VARCHAR2,
                                   p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  PROCEDURE PR_SET_FND_MEMO(p_wrk_tldtkstl IN OUT tlpks_tldtkstl_Main.Ty_tldtkstl,
                            p_err_code     in out varchar2,
                            p_Err_Params   in out varchar2,
                            p_Function_Id  in VARCHAR2,
                            p_Source       in VARCHAR2);

END tlpks_tldtkstl_utils;
/