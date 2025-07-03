CREATE OR REPLACE PACKAGE lbpks_lbdpymnt_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdpymnt_utils.spc
  **
  ** Module     : Syndication Loans and Commitments
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright Â© 2007 - 2019  Oracle and/or its affiliates.  All rights reserved
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

  Changed By         : Divya J
  Changes On         : 27-Sep-2018
  Change Description : Validated the Count of Liquidation entries before looping
  Search  String     : OBCL_14.2_Bug#28601766

  Changed By         : Ashokkumar Arumugam
  Changes On         : 21-Sep-2019
  Change Description : Fix provided to display tax paid during manual liquidation.
  Search  String     : OBCL_14.4_TAX_Changes :: Bug#30327139
  
   Date               : 11-DEC-2019     
  Changed By         : Revathi A
  Change Description : CHANGES DONE for subsys pickup
  Search String      : OBCL_14.4_LS_SPLIT_SETTL_CHANGES 
  
  Changed By         : Surya Prabha S
  Changed On         : 02-Jan-2020
  Search String      : OBCL_14.4_LS_Multi_Auth
  Change Reason      : Multi Authorization changes.
  
  Changed By         : Jayaram N
  Changed On         : 02-Mar-2020
  Search String      : Bug:30972334:OBCL_14.4_LS_TAX_Changes
  Change Reason      : LS TAX changes. ( payment screen tax call form not working as expected )
  
  Changed By         : Palanisamy M
  Changed On         : 24-Sep-2020
  Search String      : OBCL_14.4_LS_Payment Gateway Populate Changes
  Change Reason      : OBCL_14.4_LS_Payment Gateway Populate Changes
  
  Changed By         : Jayaram N
  Date               : 28-Sep-2020
  Change Description : SUPPORT_CASCADE_PARTICIPATION_IN_LS 
  Search String      : OBCL14.5:SFR#31659522:SUPPORT_CASCADE_PARTICIPATION_IN_LS
  
  Changed By         : Sowmya Bitra
  Changed On         : 06-Jan-2020
  Search String      : OBCL_14.4_LS_Payment_Gateway_Tax Changes
  Change Reason      : OBCL_14.4_LS_Payment_Gateway_Tax Changes 
  
  Changed By         : JayaramN
  Date               : 19-May-2021
  Change Description : Multiple Issues in Manual payment Screen
  Search String      : OBCL14.4:Bug#31769564:Manual_Payment_Screen_Issues
  
  Changed By         : Jayaram N
  Changed On         : 27-Sep-2021
  Search String      : Bug#33395689
  Change Reason      : ERROR MESSAGES FOR TRANCHE IS NOT IN SYNC WITH COMMITMENT CONTRACT

  **Changed By         : RAMYA M
  **Date               : 09-JAN-2023
  **Change Description : changes to reset the populate PL button variable based on work variables
  **Search String      : Bug#34684559
  
  **Changed By         : Akhila Samson
  **Date               : 13-Dec-2024
  **Change Description : Fix has been provided to display the checker and maker details  in the audit based on version. 
  **Search String      : Bug#37335197_2 
  -------------------------------------------------------------------------------------------------------
  */

--p_Action_Code VARCHAR2(10); --OBCL_14.2_Bug#28601766 Commented
p_Action_Code VARCHAR2(100); --OBCL_14.2_Bug#28601766
p_Source      VARCHAR2(10);
p_Function_Id VARCHAR2(10);
p_Wrk_lbdpymnt lbpks_lbdpymnt_Main.Ty_lbdpymnt;
p_lcl_Action_Code VARCHAR2(100); ----OBCL_14.4_LS_Payment Gateway Populate Changes
  g_part_int_shar         VARCHAR2(1) := 'N'; --Bug#31769564:added
  g_prm_liqd_int         VARCHAR2(1) := 'N';
  g_prm_prime_product    VARCHAR2(1);
  g_prm_prime_loan       VARCHAR2(1) := 'N';
  g_prm_int_fee          VARCHAR2(1) := 'A';
  g_prm_pledged          VARCHAR2(1);
  g_prm_populate_amt_blk VARCHAR2(1);
  g_prm_roll_inst_status VARCHAR2(1);
  g_PRM_CMT_TYPE         VARCHAR2(1);
  g_prm_redef_rule       VARCHAR2(1);
  g_prm_charge_pickup    VARCHAR2(1) := 'N';
  g_prm_FUTURE_DATED     VARCHAR2(1);
g_prm_maturity_date DATE;
g_PRM_DD_VALUE_DATE DATE;
g_prm_value_date DATE;
g_prm_batch_status VARCHAR2(1);
g_Prm_revr_workflow_stat VARCHAR2(1);
g_prm_allow_prepayment VARCHAR2(1);
g_prm_pmt_breakup VARCHAR2(1) := 'N';
g_prm_nonprorata_defn VARCHAR2(1) := 'N';
g_prm_old_value_date DATE;
g_prm_auto_sum VARCHAR2(10);
g_prm_Total_Paid VARCHAR2(10);
g_prm_Limit_date DATE;
g_prm_PrePmtWithOdSch VARCHAR2(1);
g_prm_OverdueSchExist VARCHAR2(1);
g_prm_Limit_amount VARCHAR2(10);
g_prm_discount_rate NUMBER;
g_prm_liquidated_face_value VARCHAR2(10);
g_prm_func_id VARCHAR2(10) := 'LBDPYMNT';
g_prm_old_amount_paid VARCHAR(100);
g_PRM_INT_AMT VARCHAR2(100);
g_PRM_BORR_AMT_DUE    VARCHAR2(100);
g_PRM_PART_SHARE_VISITED   VARCHAR2(100);

g_prm_int_component VARCHAR2(10);
g_prm_PRIME_DUE VARCHAR2(10);
g_prm_RECALC_PRIME VARCHAR2(10);
g_prm_TILL_DT_ACCRUAL VARCHAR2(10);
g_prm_POP_PL_BTN VARCHAR2(10);

g_prm_princ_amt_changed VARCHAR2(10);

g_prm_POP_BTN VARCHAR2(10);
g_prm_tot_princ_paid VARCHAR2(10);
g_prm_SF_FUND_BAL VARCHAR2(10);
g_prm_sf_princ VARCHAR2(10);
g_prm_FUNDING_AMOUNT_PAID VARCHAR2(10);
g_prm_set_liqd_int VARCHAR2(10);
g_prm_PAY_VALUE_DATE VARCHAR2(10);
g_prm_NP_PMNT VARCHAR2(1) := 'N';

g_prm_settlement_pickup VARCHAR2(1) := 'N';
g_prm_TaxOnChg VARCHAR2(1) := 'N';
g_prm_action_flag VARCHAR2(1);
g_prm_ccy_holiday VARCHAR2(10);
g_prm_Advices VARCHAR2(10) := 'FALSE';
g_prm_apac_ot_approval VARCHAR2(1) := 'N';
g_prm_apac_latest_esn VARCHAR2(1) := 'N';
g_prm_apac_entry_cnt VARCHAR2(1) := 'N';
G_PENAL_RATIO VARCHAR2(1) := 'Y';-- ankk
lPrePmtInd      Boolean := False; --ANKK

G_LIQD_PREPAY_INT VARCHAR2(1):='N';--BUG#34968433

g_prm_TRN_TYPE VARCHAR2(10) := 'NORMAL';

g_prm_old_fund_amount VARCHAR2(10);
g_prm_BLIQ_once_auth    VARCHAR(10); --Added by Krithika
  g_prm_ratio_changed    VARCHAR2(1) := 'N';
g_prm_part_ratio_changed  VARCHAR2(1) := 'N';	--OBCL14.5:SFR#31659522:SUPPORT_CASCADE_PARTICIPATION_IN_LS - Added
/*
g_prm_POP_PL_BTN VARCHAR2(10);
g_prm_POP_PL_BTN VARCHAR2(10);
g_prm_POP_PL_BTN VARCHAR2(10);
g_prm_POP_PL_BTN VARCHAR2(10);
g_prm_POP_PL_BTN VARCHAR2(10);
g_prm_POP_PL_BTN VARCHAR2(10);
g_prm_POP_PL_BTN VARCHAR2(10);
*/
PROCEDURE populate_blk_pmt(p_Source           IN VARCHAR2,
                                        p_Source_Operation IN VARCHAR2,
                                        p_Action_Code      IN VARCHAR2,
                                        p_lbdpymnt         IN lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                        p_Prev_lbdpymnt    IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                        p_Wrk_lbdpymnt     IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                        p_Err_Code         IN OUT VARCHAR2,
                                        p_Err_Params       IN OUT VARCHAR2);
PROCEDURE pr_restore_bkup_rev;
PROCEDURE pr_restore_backup(p_event IN Varchar2,
                                        p_Source           IN VARCHAR2,
                                        p_Source_Operation IN VARCHAR2,
                                        p_Action_Code      IN VARCHAR2,
                                        p_lbdpymnt         IN lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                        p_Prev_lbdpymnt    IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                        p_Wrk_lbdpymnt     IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                        p_Err_Code         IN OUT VARCHAR2,
                                        p_Err_Params       IN OUT VARCHAR2);
 PROCEDURE PR_LIQUIDATE_CONTRACT(p_Source           IN VARCHAR2,
                                        p_Source_Operation IN VARCHAR2,
                                        p_Action_Code      IN VARCHAR2,
                                        p_lbdpymnt         IN lbpks_lbdpymnt_Main.Ty_lbdpymnt,/*
                                        p_Prev_lbdpymnt    IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,*/
                                        p_Wrk_lbdpymnt     IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                        p_Err_Code         IN OUT VARCHAR2,
                                        p_Err_Params       IN OUT VARCHAR2) ;
FUNCTION FN_compare_interest_paid(p_Source           IN VARCHAR2,
                                        p_Source_Operation IN VARCHAR2,
                                        p_Action_Code      IN VARCHAR2,
                                        p_lbdpymnt         IN lbpks_lbdpymnt_Main.Ty_lbdpymnt,/*
                                        p_Prev_lbdpymnt    IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,*/
                                        p_Wrk_lbdpymnt     IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                        p_Err_Code         IN OUT VARCHAR2,
                                        p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
PROCEDURE pr_take_bkup_rev(p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_Id      IN VARCHAR2,
                           p_Action_Code      IN VARCHAR2,
                           p_lbdpymnt         IN lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                           p_Wrk_lbdpymnt     IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2);
FUNCTION Fn_update_part_amt_due
RETURN BOOLEAN;
PROCEDURE PR_POPULATE_ADVICES(p_Source           IN VARCHAR2,
                                        p_Source_Operation IN VARCHAR2,
                                        p_Action_Code      IN VARCHAR2,
                                        p_lbdpymnt         IN lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                        p_Wrk_lbdpymnt     IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                        p_Err_Code         IN OUT VARCHAR2,
                                        p_Err_Params       IN OUT VARCHAR2);
PROCEDURE pr_del_handoff (pm_contract_ref_no VARCHAR2);
PROCEDURE pr_take_backup(p_Source           IN VARCHAR2,
 p_Source_Operation IN VARCHAR2,
 p_Function_Id      IN VARCHAR2,
 p_Action_Code      IN VARCHAR2,
 p_lbdpymnt         IN lbpks_lbdpymnt_Main.Ty_lbdpymnt,
 p_Wrk_lbdpymnt     IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
 p_Err_Code         IN OUT VARCHAR2,
 p_Err_Params       IN OUT VARCHAR2);
FUNCTION fn_date_validations RETURN Boolean;
PROCEDURE pr_overwritessi_check(p_Source           IN VARCHAR2,
 p_Source_Operation IN VARCHAR2,
 p_Function_Id      IN VARCHAR2,
 p_Action_Code      IN VARCHAR2,
 p_lbdpymnt         IN lbpks_lbdpymnt_Main.Ty_lbdpymnt,
 p_Wrk_lbdpymnt     IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
 p_Err_Code         IN OUT VARCHAR2,
 p_Err_Params       IN OUT VARCHAR2);
FUNCTION fn_prepayment(p_contract_ref_no VARCHAR2,
                       p_value_date DATE,
                       p_event_seq_no NUMBER) RETURN BOOLEAN;
  FUNCTION Fn_Post_Default_And_Validate(p_Source           IN VARCHAR2,
                                        p_Source_Operation IN VARCHAR2,
                                        p_Function_Id      IN VARCHAR2,
                                        p_Action_Code      IN VARCHAR2,
                                        p_Child_Function   IN VARCHAR2,
                                        p_lbdpymnt         IN lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                        p_Prev_lbdpymnt    IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                        p_wrk_lbdpymnt     IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                        p_Err_Code         IN OUT VARCHAR2,
                                        p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION fn_check_batch_status(p_Wrk_lbdpymnt     IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                 p_prm_batch_status IN OUT VARCHAR2)

   RETURN BOOLEAN;
--Bug#33395689:Changes Starts here   
/*PROCEDURE pr_chk_unauth_on_linkages(p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_Id      IN VARCHAR2,
                           p_Action_Code      IN VARCHAR2,
                           p_lbdpymnt         IN lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                           p_Wrk_lbdpymnt     IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2);*/
FUNCTION pr_chk_unauth_on_linkages(p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_Id      IN VARCHAR2,
                           p_Action_Code      IN VARCHAR2,
                           p_lbdpymnt         IN lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                           p_Wrk_lbdpymnt     IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2)
  RETURN BOOLEAN;
--Bug#33395689:Changes Ends here  
PROCEDURE pr_pmt_btn_pressed(p_Source           IN VARCHAR2,
                                        p_Source_Operation IN VARCHAR2,
                                        p_Action_Code      IN VARCHAR2,
                                        p_lbdpymnt         IN lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                        p_Prev_lbdpymnt    IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                        p_Wrk_lbdpymnt     IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                        p_Err_Code         IN OUT VARCHAR2,
                                        p_Err_Params       IN OUT VARCHAR2);
PROCEDURE pr_validate_flrclg_margin;

FUNCTION FN_VALIDATE_FWD_LIQD(p_Source           IN VARCHAR2,
                                        p_Source_Operation IN VARCHAR2,
                                        p_Action_Code      IN VARCHAR2,
                                        p_lbdpymnt         IN lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                        p_Prev_lbdpymnt    IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                        p_Wrk_lbdpymnt     IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                        p_Err_Code         IN OUT VARCHAR2,
                                        p_Err_Params       IN OUT VARCHAR2)
RETURN BOOLEAN;

PROCEDURE GET_MIN_VAL_DATE(min_value_date OUT Date);
PROCEDURE pr_auto_allocate(p_prod IN oltms_product_liq_order.product%type,
                             p_Source           IN VARCHAR2,
                             p_Source_Operation IN VARCHAR2,
                             p_Action_Code      IN VARCHAR2,
                             p_lbdpymnt         IN lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                             p_Prev_lbdpymnt    IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                             p_Wrk_lbdpymnt     IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                             p_Err_Code         IN OUT VARCHAR2,
                             p_Err_Params       IN OUT VARCHAR2);
FUNCTION FN_VALIDATE_FWD_LIQD_DATES(p_Source           IN VARCHAR2,
                                        p_Source_Operation IN VARCHAR2,
                                        p_Action_Code      IN VARCHAR2,
                                        p_lbdpymnt         IN lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                        p_Prev_lbdpymnt    IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                        p_Wrk_lbdpymnt     IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                        p_Err_Code         IN OUT VARCHAR2,
                                        p_Err_Params       IN OUT VARCHAR2)
RETURN BOOLEAN;
  PROCEDURE PR_POP_AMT_PAID(p_Source           IN VARCHAR2,
                                        p_Source_Operation IN VARCHAR2,
                                        p_Action_Code      IN VARCHAR2,
                                        p_lbdpymnt         IN lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                        p_Prev_lbdpymnt    IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                        p_Wrk_lbdpymnt     IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                        p_Err_Code         IN OUT VARCHAR2,
                                        p_Err_Params       IN OUT VARCHAR2);
PROCEDURE PR_UPDATE_INTEREST_RATE(p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_Id      IN VARCHAR2,
                           p_Action_Code      IN VARCHAR2,
                           p_lbdpymnt         IN lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                           p_Wrk_lbdpymnt     IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2);
PROCEDURE PR_CKH_PART_BORR_SHARE(p_Source           IN VARCHAR2,
                                        p_Source_Operation IN VARCHAR2,
                                        p_Action_Code      IN VARCHAR2,
                                        p_lbdpymnt         IN lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                        p_Prev_lbdpymnt    IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                        p_Wrk_lbdpymnt     IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                        p_Err_Code         IN OUT VARCHAR2,
                                        p_Err_Params       IN OUT VARCHAR2);
PROCEDURE pr_validate_funding_amount(p_Source           IN VARCHAR2,
                                        p_Source_Operation IN VARCHAR2,
                                        p_Action_Code      IN VARCHAR2,
                                        p_lbdpymnt         IN lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                        p_Prev_lbdpymnt    IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                        p_Wrk_lbdpymnt     IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                        p_Err_Code         IN OUT VARCHAR2,
                                        p_Err_Params       IN OUT VARCHAR2) ;
 PROCEDURE pr_pledged(p_Source           IN VARCHAR2,
                                        p_Source_Operation IN VARCHAR2,
                                        p_Action_Code      IN VARCHAR2,
                                        p_lbdpymnt         IN lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                        p_Prev_lbdpymnt    IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                        p_Wrk_lbdpymnt     IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                        p_Err_Code         IN OUT VARCHAR2,
                                        p_Err_Params       IN OUT VARCHAR2);
 PROCEDURE pr_chk_pik(p_Source           IN VARCHAR2,
                                        p_Source_Operation IN VARCHAR2,
                                        p_Action_Code      IN VARCHAR2,
                                        p_lbdpymnt         IN lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                        p_Prev_lbdpymnt    IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                        p_Wrk_lbdpymnt     IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                        p_Err_Code         IN OUT VARCHAR2,
                                        p_Err_Params       IN OUT VARCHAR2);
 FUNCTION fn_validation (p_contract_ref_no IN oltbs_contract_master.contract_ref_no%type)
RETURN BOOLEAN;
PROCEDURE pr_check_total_amt(p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_Id      IN VARCHAR2,
                           p_Action_Code      IN VARCHAR2,
                           p_lbdpymnt         IN lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                           p_Wrk_lbdpymnt     IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2);
PROCEDURE pr_check_total_prime_amt(p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_Id      IN VARCHAR2,
                           p_Action_Code      IN VARCHAR2,
                           p_lbdpymnt         IN lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                           p_Wrk_lbdpymnt     IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2);
PROCEDURE pr_validate_penalty_rate(p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_Id      IN VARCHAR2,
                           p_Action_Code      IN VARCHAR2,
                           p_lbdpymnt         IN lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                           p_Wrk_lbdpymnt     IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2);

PROCEDURE pr_do_setl_pickup
            (
            pContractRefNo IN oltbs_contract.contract_ref_no%type,
            pEsn IN Number
            );
PROCEDURE PR_DO_CHARGE_PICKUP(
      pContractRefNo IN oltbs_contract.contract_ref_no%type,
      pEsn IN Number,
      pvaluedt IN date
      );
      PROCEDURE pr_validate_pmt(p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_Id      IN VARCHAR2,
                           p_Action_Code      IN VARCHAR2,
                           p_lbdpymnt         IN lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                           p_Wrk_lbdpymnt     IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2);
      PROCEDURE pr_create_event_log(p_new_version Varchar2,
                                p_Source           IN VARCHAR2,
                                        p_Source_Operation IN VARCHAR2,
                                        p_Action_Code      IN VARCHAR2,
                                        p_lbdpymnt         IN lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                        p_Prev_lbdpymnt    IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                        p_Wrk_lbdpymnt     IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                        p_Err_Code         IN OUT VARCHAR2,
                                        p_Err_Params       IN OUT VARCHAR2);
      PROCEDURE pr_clearing_line(p_Source           IN VARCHAR2,
 p_Source_Operation IN VARCHAR2,
 p_Function_Id      IN VARCHAR2,
 p_Action_Code      IN VARCHAR2,
 p_lbdpymnt         IN lbpks_lbdpymnt_Main.Ty_lbdpymnt,
 p_Wrk_lbdpymnt     IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
 p_Err_Code         IN OUT VARCHAR2,
 p_Err_Params       IN OUT VARCHAR2) ;

PROCEDURE PR_CREDIT_LINE(p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_Id      IN VARCHAR2,
                           p_Action_Code      IN VARCHAR2,
                           p_lbdpymnt         IN lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                           p_Wrk_lbdpymnt     IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2);
PROCEDURE PR_POP_PRIME_PMT(p_Source           IN VARCHAR2,
                                        p_Source_Operation IN VARCHAR2,
                                        p_Action_Code      IN VARCHAR2,
                                        p_lbdpymnt         IN lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                        p_Prev_lbdpymnt    IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                        p_Wrk_lbdpymnt     IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                        p_Err_Code         IN OUT VARCHAR2,
                                        p_Err_Params       IN OUT VARCHAR2);

FUNCTION fn_get_pmt_esn(p_pmt_no IN Number,
      p_pmt_esn OUT oltbs_contract_liq.event_seq_no%type,
      P_error_code OUT Varchar2
      )RETURN Boolean;
PROCEDURE PR_RESIZE_CANVAS(p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_Id      IN VARCHAR2,
                           p_Action_Code      IN VARCHAR2,
                           p_lbdpymnt         IN lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                           p_Wrk_lbdpymnt     IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2);
PROCEDURE populate_osamt(p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_Id      IN VARCHAR2,
                           p_Action_Code      IN VARCHAR2,
                           p_lbdpymnt         IN lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                           p_Wrk_lbdpymnt     IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2);
PROCEDURE PR_BORR_TILL_DT_ACCRUAL(p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_Id      IN VARCHAR2,
                           p_Action_Code      IN VARCHAR2,
                           p_lbdpymnt         IN lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                           p_Wrk_lbdpymnt     IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2);
PROCEDURE pr_compute_tax
  (
  pComp IN OLTBs_contract_liq.component%type,
  pAmtPaid IN Number
  ,i IN NUMBER, --OBCL_14.4_TAX_Changes :: Bug#30327139
  p_Wrk_lbdpymnt     IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt); --OBCL_14.4_TAX_Changes :: Bug#30327139
FUNCTION fn_check_partial_interest RETURN BOOLEAN;
PROCEDURE Check_Loan_Synd(p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_Id      IN VARCHAR2,
                           p_Action_Code      IN VARCHAR2,
                           p_lbdpymnt         IN lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                           p_Wrk_lbdpymnt     IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2);
PROCEDURE POPULATE_OSREPAMT(p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_Id      IN VARCHAR2,
                           p_Action_Code      IN VARCHAR2,
                           p_lbdpymnt         IN lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                           p_Wrk_lbdpymnt     IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2);
 --OBCL_14.4_LS_SPLIT_SETTL_CHANGES starts 
    
                                                        
  FUNCTION fn_subsys_pickup(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_lbdpymnt          IN lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                            p_Wrk_lbdpymnt      IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN; 

                          
   FUNCTION fn_subsys_upload(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_lbdpymnt         IN lbpks_lbdpymnt_main.ty_lbdpymnt,
                            p_wrk_lbdpymnt     IN OUT lbpks_lbdpymnt_main.ty_lbdpymnt,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN ;  
    
   --OBCL_14.4_LS_SPLIT_SETTL_CHANGES ends                                     
FUNCTION Fn_Sys_Upload_Db(p_Source            IN VARCHAR2,
                              p_Source_Operation  IN     VARCHAR2,
                              p_Function_Id       IN     VARCHAR2,
                              p_Action_Code       IN     VARCHAR2,
      p_lbdpymnt     IN  lbpks_lbdpymnt_Main.Ty_lbdpymnt,
      p_Prev_lbdpymnt     IN  lbpks_lbdpymnt_Main.Ty_lbdpymnt,
      p_Wrk_lbdpymnt      IN OUT  lbpks_lbdpymnt_Main.Ty_lbdpymnt,
      p_Err_Code          IN OUT VARCHAR2,
      p_Err_Params        IN OUT VARCHAR2) RETURN BOOLEAN;
FUNCTION Fn_Sys_Query  ( p_Source    IN  VARCHAR2,
                              p_Source_Operation  IN     VARCHAR2,
                              p_Function_Id       IN     VARCHAR2,
                              p_Action_Code       IN     VARCHAR2,
      p_Full_Data     IN  VARCHAR2 DEFAULT 'Y',
      p_With_Lock     IN  VARCHAR2 DEFAULT 'N',
      p_QryData_Reqd       IN  VARCHAR2,
      p_lbdpymnt         IN  lbpks_lbdpymnt_Main.Ty_lbdpymnt,
      p_Wrk_lbdpymnt  IN   OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
      p_Err_Code          IN OUT VARCHAR2,
      p_Err_Params        IN OUT VARCHAR2)
   RETURN BOOLEAN;

-- OBCL_14.4_LS_Multi_Auth changes starts

   FUNCTION Fn_Log_Override(p_Source      IN VARCHAR2,
                           p_Function_Id  IN VARCHAR2,
                           p_Action_Code  IN VARCHAR2,
                           p_wrk_lbdpymnt IN OUT Lbpks_Lbdpymnt_Main.Ty_lbdpymnt,
                           p_Err_Code     IN OUT VARCHAR2,
                           p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;

-- OBCL_14.4_LS_Multi_Auth changes ends

-- Bug:30972334:OBCL_14.4_LS_TAX_Changes - Start here
	FUNCTION fn_get_subsys_stat(p_subsystem  IN VARCHAR2,
                                p_subsysstat IN VARCHAR2) RETURN VARCHAR2;
-- Bug:30972334:OBCL_14.4_LS_TAX_Changes - Ends here

  --OBCL_14.4_LS_Payment_Gateway_Tax Changes start
  FUNCTION fn_upd_subsys_stat(p_subsystem  IN VARCHAR2,
                              p_stat       IN VARCHAR2,
                              p_subsysstat IN VARCHAR2) RETURN VARCHAR2;
  --OBCL_14.4_LS_Payment_Gateway_Tax Changes end							  
							  
							  
 --Bug#37335197_2	Changes Starts
  FUNCTION Fn_Get_Versionno(p_Contract_Ref_No IN VARCHAR2,
                            p_Version_No      IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Get_Liqdorder(p_Contract_Ref_No IN VARCHAR2,
                            p_Order           OUT NUMBER,
                            p_Liqd_Order      IN OUT NUMBER) RETURN BOOLEAN; 
 --Bug#37335197_2	Changes ends
END lbpks_lbdpymnt_utils;
/