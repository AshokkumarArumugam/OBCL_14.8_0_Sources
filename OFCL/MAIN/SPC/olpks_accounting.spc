CREATE OR REPLACE PACKAGE olpks_accounting AS
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name    : olpks_accounting.spc
  **
  ** Module       : LD                        **
  **
  **This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 ,
  Oracle and/or its affiliates.  All rights reserved.
  No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.
  
  Oracle Financial Services Software Limited.
  Oracle Park, Off Western Express Highway,
  Goregaon (East),
  Mumbai - 400 063, India.
  ----------------------------------------------------------------------------------------------------
  CHANGE HISTORY -----
    **Changed By         : Anub Mathew
  **Change Description : Hooks provided for  RABOCBT_12.2_31_JAN_2018_01_0000
  **Search String      : OBCL 27627650 Bug#27514654 
  
 **Changed By         : Sowmya Bitra
 **Date               : 01-Aug-2022
 **Change Description : Provided hook for fn_acfn_net
 **Search String      : Bug#34445796 
 
 **Changed By         : Revathi Dharmalingam
 **Date               : 24-Jul-2024
 **Change Description : Modified code to avoid duplicate calls for fn_account_head for role based accounting.
 **Search String      : OBCL_14.7_SUPPORT_BUG_36823078_Changes
  */
  
  --OBCL 27627650 Bug#27514654  changes start	   
    PROCEDURE Pr_Skip_Handler(P_Stage IN VARCHAR2);
   PROCEDURE Pr_Set_Skip_Kernel;
   PROCEDURE Pr_Set_Activate_Kernel;
   PROCEDURE Pr_Set_Skip_Cluster;
   PROCEDURE Pr_Set_Activate_Cluster;
   FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;	
--OBCL 27627650 Bug#27514654  changes end  


  FUNCTION acfn_lookup(pProduct IN oltms_product_event_acct_entry.product_code%TYPE,
                       pEvent   IN oltms_product_event_acct_entry.event_code%TYPE,
                       pStatus  IN VARCHAR2,
                       PTrnType IN oltms_prod_trn_type.TRN_TYPE%TYPE,
                       pLookup  OUT olpks_accounting.tbl_lookup,
                       pErrcode IN OUT ertbs_msgs.err_code%TYPE)
    RETURN BOOLEAN;

  FUNCTION acfn_lookup(pProduct IN oltms_product_event_acct_entry.PRODUCT_CODE%TYPE,
                       pEvent   IN oltms_product_event_acct_entry.EVENT_CODE%TYPE,
                       pStatus  IN VARCHAR2,
                       pLookup  OUT olpks_accounting.TBL_LOOKUP,
                       pErrcode IN OUT ERTBS_MSGS.ERR_CODE%TYPE)
    RETURN BOOLEAN;

  FUNCTION acfn_lookup(pproduct IN oltms_product_event_acct_entry.PRODUCT_CODE%TYPE,
                       pevent   IN oltms_product_event_acct_entry.EVENT_CODE%TYPE,
                       plookup  IN OUT olpks_accounting.TBL_LOOKUP,
                       perrcode IN OUT ERTBS_MSGS.ERR_CODE%TYPE)
    RETURN BOOLEAN;

  FUNCTION fn_achandoff(pTrnRefNo   IN oltbs_handoff.TRN_REF_NO%TYPE,
                        pEventSeqNo IN oltbs_handoff.EVENT_SR_NO%TYPE,
                        pBranchDate IN DATE,
                        pHandoff    IN OUT olpks_accounting.TBL_ACHOFF,
                        pActionCode IN CHAR,
                        pSuspense   IN CHAR,
                        pBalancing  IN CHAR,
                        pUserId     IN CHAR,
                        pErrCode    IN OUT VARCHAR2,
                        pParam      IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_achandoff(pTrnRefNo   IN oltbs_handoff.TRN_REF_NO%TYPE,
                        pCustomref  IN oltbs_handoff.CUSTOM_REF_NO%TYPE,
                        pEventSeqNo IN oltbs_handoff.EVENT_SR_NO%TYPE,
                        pBranchDate IN DATE,
                        pHandoff    IN OUT olpks_accounting.TBL_ACHOFF,
                        pActionCode IN CHAR,
                        pSuspense   IN CHAR,
                        pBalancing  IN CHAR,
                        pUserId     IN CHAR,
                        pErrCode    IN OUT VARCHAR2,
                        pParam      IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_achandoff(
                        
                        pTrnRefNo           IN oltbs_handoff.trn_ref_no%TYPE,
                        pCustomref          IN oltbs_handoff.custom_ref_no%TYPE,
                        pEventSeqNo         IN oltbs_handoff.event_sr_no%TYPE,
                        pBranchDate         IN DATE,
                        pHandoff            IN OUT olpks_accounting.tbl_achoff,
                        pActionCode         IN CHAR,
                        pSuspense           IN CHAR,
                        pBalancing          IN CHAR,
                        pUserId             IN CHAR,
                        p_module_funcol_avl IN VARCHAR2,
                        ptb_detail_funcol   IN olpks_accounting.tb_funcol,
                        pErrCode            IN OUT VARCHAR2,
                        pParam              IN OUT VARCHAR2)
  
   RETURN BOOLEAN;

  FUNCTION Fn_achandoff(
                        
                        pTrnRefNo       IN oltbs_handoff.trn_ref_no%TYPE,
                        pCustomref      IN oltbs_handoff.custom_ref_no%TYPE,
                        pEventSeqNo     IN oltbs_handoff.event_sr_no%TYPE,
                        pBranchDate     IN DATE,
                        pHandoff        IN OUT olpks_accounting.tbl_achoff,
                        pActionCode     IN CHAR,
                        pSuspense       IN CHAR,
                        pBalancing      IN CHAR,
                        p_defer_allowed IN CHAR,
                        pUserId         IN CHAR,
                        pdocombac       IN VARCHAR2,
                        pErrCode        IN OUT VARCHAR2,
                        pParam          IN OUT VARCHAR2)
  
   RETURN BOOLEAN;

  FUNCTION Fn_achandoff(pTrnRefNo       IN oltbs_handoff.trn_ref_no%TYPE,
                        pEventSeqNo     IN oltbs_handoff.event_sr_no%TYPE,
                        pBranchDate     IN DATE,
                        pHandoff        IN OUT olpks_accounting.tbl_achoff,
                        pActionCode     IN CHAR,
                        pSuspense       IN CHAR,
                        pBalancing      IN CHAR,
                        p_defer_allowed IN VARCHAR2,
                        pUserId         IN CHAR,
                        pErrCode        IN OUT VARCHAR2,
                        pParam          IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_acservice(pBranch     IN oltbs_handoff.ac_branch%TYPE,
                        pBranchDate IN DATE,
                        pLCY        IN oltbs_handoff.ac_ccy%TYPE,
                        pTranRefNo  IN oltbs_handoff.trn_ref_no%TYPE,
                        pEventSeqNo IN oltbs_handoff.event_sr_no%TYPE,
                        pActionCode IN CHAR,
                        pUserId     IN oltbs_handoff.user_id%TYPE,
                        pErrCode    IN OUT VARCHAR2,
                        pParam      IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_acEntry_Retrieval(pTrnRefNo   IN olvws_all_ac_entries.trn_ref_no%TYPE,
                                pEventSeqNo IN olvws_all_ac_entries.event_sr_no%TYPE,
                                pAcEnts     OUT olpks_accounting.tbl_AcHoff)
    RETURN NUMBER;

  FUNCTION fn_acEntry_Retrieval(pTrnRefNo   IN olvws_all_ac_entries.trn_ref_no%TYPE,
                                pEventSeqNo IN olvws_all_ac_entries.event_sr_no%TYPE,
                                ptrndt      IN olvws_all_ac_entries.trn_dt%TYPE,
                                pValdt      IN olvws_all_ac_entries.value_dt%TYPE,
                                pAcEnts     OUT olpks_accounting.tbl_AcHoff)
    RETURN NUMBER;

  Function this_is_an_err(perrcode IN VARCHAR2, pparam IN VARCHAR2)
    RETURN BOOLEAN;

  Function fn_get_ovr(perrcode IN VARCHAR2,
                      pparam   IN VARCHAR2,
                      xcode    IN OUT VARCHAR2,
                      xparam   IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_get_lcyaverage(pbranch     IN VARCHAR2,
                             puserid     IN VARCHAR2,
                             p_acc_hoff  IN OUT olpks_accounting.tbl_achoff,
                             p_err_code  OUT VARCHAR2,
                             p_err_param OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_reverse_at_currexrt(p_Hofftbl            IN OUT olpks_accounting.tbl_achoff,
                                  p_contract_ref_no    IN VARCHAR2,
                                  p_revr_use_curr_date IN DATE,
                                  pm_errorcd           IN OUT VARCHAR2,
                                  pm_errorprms         IN OUT VARCHAR2)
    RETURN BOOLEAN;
	
	--Bug#34445796 Changes Start 
    FUNCTION fn_acfn_net (PTRNREFNO    IN OLTBS_HANDOFF.TRN_REF_NO%TYPE,                        
                        PEVENTSEQNO  IN OLTBS_HANDOFF.EVENT_SR_NO%TYPE,                        
                        PHANDOFF     IN OUT NOCOPY OLPKS_ACCOUNTING.TBL_ACHOFF,
                        PACTIONCODE  IN CHAR,                        
                        PUSERID      IN CHAR,                        
                        PERRCODE     IN OUT NOCOPY VARCHAR2,
                        PPARAM       IN OUT NOCOPY VARCHAR2) 
    RETURN BOOLEAN;
	--Bug#34445796 Changes End

  pkg_eca_allowed VARCHAR2(1) := 'N';
  TYPE tbl_AcHoff IS TABLE OF oltbs_handoff%ROWTYPE INDEX BY BINARY_INTEGER;

  TYPE rec_lookup IS RECORD(
    accrole             oltms_product_event_acct_entry.ACCOUNT_ROLE_CODE%TYPE,
	map_type           oltms_product_accrole.map_type%TYPE,--OBCL_14.7_SUPPORT_BUG_36823078_Changes
    account             oltb_account.AC_GL_NO%TYPE,
    amtTag              oltms_product_event_acct_entry.AMT_TAG%TYPE,
    trnCode             oltms_product_event_acct_entry.TRANSACTION_CODE%TYPE,
    drCrInd             oltms_product_event_acct_entry.DR_CR_INDICATOR%TYPE,
    netInd              oltms_product_event_acct_entry.NETTING_INDICATOR%TYPE,
    msg_netind          oltms_product_event_acct_entry.MSG_NETTING_INDICATOR%TYPE,
    tagtype             oltms_product_event_acct_entry.AMOUNT_TAG_TYPE%TYPE,
    glcat               oltb_account.gl_category%TYPE,
    mis_head            oltms_product_event_acct_entry.mis_head%TYPE,
    glmis_update        oltbs_daily_log_ac.GLMIS_UPDATE_FLAG%TYPE,
    Hideinstmt          oltms_product_event_acct_entry.HIDE_TXN_IN_STMT%TYPE,
    Internal_gl_type    oltbs_daily_log_ac.INTERNAL_GL_TYPE%TYPE,
    TRACK_RECEIVABLE    oltms_product_event_acct_entry.TRACK_RECEIVABLE%TYPE,
    RECEIVABLE_ACCROLE  oltms_product_event_acct_entry.RECEIVABLE_ACCROLE%TYPE,
    RECEIVABLE_TXN_CODE oltms_product_event_acct_entry.RECEIVABLE_TXN_CODE%TYPE,
    MAX_RETRY           oltms_product_event_acct_entry.MAX_RETRY%TYPE,
    RATE_TYPE           oltms_product_event_acct_entry.RATE_TYPE%TYPE,
    RATE_CODE           oltms_product_event_acct_entry.RATE_CODE%TYPE,
    gaap_indicator      oltms_product_event_acct_entry.gaap_indicator%TYPE,
    delinquency_product varchar2(4), --dqtms_product_master.product_code%TYPE
    bal_chk_online      oltms_product_event_acct_entry.BAL_CHK_ONLINE%TYPE,
    bal_chk_batch       oltms_product_event_acct_entry.BAL_CHK_ONLINE%TYPE,
    for_ord             NUMBER);

  TYPE tbl_lookup IS TABLE OF rec_lookup INDEX BY BINARY_INTEGER;
  TYPE tb_funcol IS TABLE OF oltbs_funcol%ROWTYPE INDEX BY VARCHAR2(64);
  empty_hoff  olpks_accounting.tbl_AcHoff;
  pkg_module  VARCHAR2(2);
  pkg_ibentry VARCHAR2(1);
  --OBCL_14.5_Risk_Comp start
  g_ac_branch OLTB_DAILY_LOG_AC.ac_branch%TYPE;
  g_ac_no OLTB_DAILY_LOG_AC.ac_no%TYPE;
  g_ac_ccy OLTB_DAILY_LOG_AC.ac_ccy%TYPE;
  g_Amount_Tag OLTB_DAILY_LOG_AC.Amount_Tag%TYPE;
 --OBCL_14.5_Risk_Comp end
END;
/
CREATE OR REPLACE synonym olpkss_accounting for olpks_accounting
/