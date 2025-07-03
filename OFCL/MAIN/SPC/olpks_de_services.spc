create or replace package olpks_de_services AS
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name    : olpks_de_services.SPC
  **
  ** Module       : DATA ENTRY
  **
  This source is part of the Oracle Banking Corporate Lending  Software Product.
  Copyright ? 2019 , Oracle and/or its affiliates.  All rights reserved.
  No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.
  
  Oracle Financial Services Software Limited.
  Oracle Park, Off Western Express Highway,
  Goregaon (East),
  Mumbai - 400 063, India.
  ----------------------------------------------------------------------------------------------------
  */

  /*
  -- OBJECT : olpks_de_services               DATE /TIME : 25-SEP-96 01:14:55
  -- AUTHOR K.SAIRAM / THOMAS MATHEW
  
  CHANGE HISTORY
  
  26.JUL.2002 FCC4.1 Oct2002 Citi Latam Retro PYUAT TIL # 54 If the account is typed in wile data entry and if it is
                                                             closed or unauthorized or not existing it gives the same
                                                             error "Invalid Account" whereas it should give a proper
                                                             error description...
  
  11-FEB-2001 FCC 4.2 APR 2003 CITI LATAM DOUAT TIL#33   ADDED FUNCTION fn_open_batch_new - for validating batch_no during teller upload.
  
  20-Mar-2003 Fcc4.2 OPS related changes ..Added the new function Fn_batch_validations..The front end validation has been moved
                   to the back end..
  
  28-JUL-2003 FCC 4.3 AUG 2003 GAAP core Changes.
  11-SEP-2007  FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-LS-483, Journal entry - Gives batch not balanced error, even when just the first entry in the batch is not saved and when tried to cancel out
  */

  --
  --FCC 4.3 AUG 2003 GAAP core Changes start
  --
  TYPE rec_batch_detail IS RECORD(
    cont_cr        oltbs_batch_detail.cont_cr%TYPE,
    cont_dr        oltbs_batch_detail.cont_dr%TYPE,
    real_cr        oltbs_batch_detail.real_cr%TYPE,
    real_dr        oltbs_batch_detail.real_dr%TYPE,
    gaap_indicator oltbs_batch_detail.gaap_indicator%TYPE);

  TYPE tbl_batch_detail IS TABLE OF rec_batch_detail INDEX BY BINARY_INTEGER;
  --
  --FCC 4.3 AUG 2003 GAAP core Changes end
  --

  /*PROCEDURE pr_copy_de_pref(lold IN char, lnew IN char);
  --------------------------------------------------------
  --Function to do the post save validations for product
  --------------------------------------------------------
  FUNCTION fn_product_save_check(
    pm_product    IN  oltms_product.product_code%TYPE,
    pm_chq_reqd   OUT varchar2,
    pm_txn_acc_indicator  OUT   varchar2,
    pm_offset_acc_indicator OUT   varchar2,
    pm_txn_drcr   OUT varchar2,
    pm_txn_acc    OUT varchar2,
    pm_offset_acc   OUT varchar2,
    pm_errcode    OUT varchar2,
    pm_params   OUT varchar2
    )RETURN BOOLEAN;
  --------------------------------------------------------
  --Function to change the user name of the entries in a batch
  --------------------------------------------------------
  FUNCTION fn_reassign_batch(
    pm_branch IN  oltms_branch.BRANCH_CODE%TYPE,
    pm_oper_id  IN  oltbs_jrnl_log_de.MAKER_ID%TYPE,
    pm_type   IN  oltbs_batch_master.TYPE%TYPE,
    pm_batch  IN  oltbs_batch_master.BATCH_NO%TYPE,
    pm_appl_dt  IN    oltbs_jrnl_log_de.MAKER_DT_STAMP%TYPE
    ) RETURN boolean;
  --------------------------------------------------------
  --Function to form a message by issuing a call to ovpkss.
  --Could not use the function provided by ovpkss directly
  --as there is a problem in passing CHAR across
  --------------------------------------------------------
  FUNCTION fn_formmsg(
    pm_errcode  IN  oltbs_upload_exceptions.err_code%TYPE,
    pm_params IN  oltbs_upload_exceptions.parameters%TYPE,
    pm_lang   IN  ertbs_msgs.language%TYPE
    )RETURN varchar2;
  --------------------------------------------------------
  --Function check wherher a product end date is before the pm_date
  --------------------------------------------------------
  FUNCTION fn_is_product_ccy_ok(
    pm_product_code IN  oltbs_teller_master.product_code%TYPE,
    pm_ccy    IN  oltbs_teller_master.txn_ccy%TYPE
    )RETURN BOOLEAN;
  ------------------------------------------------
  --Function check wherher a product is allowed for a customer
  --------------------------------------------------------
  FUNCTION fn_is_product_customer_ok(
    pm_prod_code  IN  oltbs_teller_master.product_code%TYPE,
    pm_customer IN  oltbs_teller_master.rel_customer%TYPE,
    pm_customer_cat IN  oltbs_account.customer_cat%TYPE
    )RETURN BOOLEAN;
  --------------------------------------------------------
  --function to check whether branch status is end-of-input
  --returns true if not end-of-input
  --------------------------------------------------------
  FUNCTION fn_chk_branch_status(
    pm_Branch IN  oltms_branch.BRANCH_CODE%TYPE
    ) RETURN BOOLEAN;
  
  -------------------------------------------------------
  --Function to check whether the transaction journal is printed for
  --the batch or not. To be called from summary authorization
  ---------------------------------------------------------
  FUNCTION fn_chk_txn_jrnl(
    pm_branch   IN  oltbs_batch_master.branch_code%TYPE,
    pm_batch  IN  oltbs_batch_master.batch_no%TYPE
    ) RETURN BOOLEAN;
  ---------------------------------------------------
  --function to update the 'locked' status to 'Y'
  -----------------------------------------------------
  FUNCTION fn_lock_batch(
    pm_Branch   IN  oltbs_batch_master.BRANCH_CODE%TYPE ,
    pm_Batch    IN  oltbs_batch_master.BATCH_NO%TYPE
    )RETURN BOOLEAN;
  ---------------------------------------------------
  --function to update the 'locked' status to 'N'
  -----------------------------------------------------
  */
  FUNCTION fn_unlock_batch(pm_Branch IN oltbs_batch_master.BRANCH_CODE%TYPE,
                           pm_Batch  IN oltbs_batch_master.BATCH_NO%TYPE)
    RETURN BOOLEAN;
  ---------------------------------------------------
  FUNCTION fn_is_batch_uploaded(pm_Branch IN oltbs_batch_master.BRANCH_CODE%TYPE,
                                pm_Batch  IN oltbs_batch_master.BATCH_NO%TYPE)
    RETURN BOOLEAN;
  ---------------------------------------------------
  --function to check whether the batch is locked and if
  --it is not locked then returns the last_operator and the
  --type of the batch
  -----------------------------------------------------
  /*FUNCTION fn_is_batch_not_locked(
    pm_Branch   IN  oltbs_batch_master.BRANCH_CODE%TYPE ,
    pm_Batch    IN  oltbs_batch_master.BATCH_NO%TYPE ,
    pm_user_id  IN OUT  oltbs_batch_master.LAST_OPER_ID%TYPE ,
    pm_type   IN OUT  oltbs_batch_master.TYPE%TYPE
    )RETURN BOOLEAN;
  ---------------------------------------------------
  --function to update the authorization status of the batch
  --if all the entries in the batch are authorized
  ----------------------------------------------------
  FUNCTION fn_batch_upd_auth(
    pm_Branch   IN  oltbs_batch_master.BRANCH_CODE%TYPE ,
    pm_Batch    IN  oltbs_batch_master.BATCH_NO%TYPE,
    pm_user   IN  oltbs_batch_master.last_auth_id%TYPE,
    pm_type   IN  oltbs_batch_master.TYPE%TYPE
    )RETURN BOOLEAN;
  ---------------------------------------------------
  --function to get the Lcy and Fcy totals given a reference
  --number OR batch number. Pass either of the two and the other as
  --NULL.The totals are selected from oltbs_daily_log_ac
  ----------------------------------------------------
  
  ---------------------------------------------------
  --Function to close a given batch.
  --The batch totals are updated along with the Auth Status.
  ----------------------------------------------------
  
  --Fcc4.2 OPS related changes starts...
  
  FUNCTION Fn_batch_validations
            (
            pm_Branch   IN    oltbs_batch_master.BRANCH_CODE%TYPE,
            pm_Batch_no   IN    oltbs_batch_master.BATCH_NO%TYPE,
            pm_err_code   IN OUT  VARCHAR2,
            pm_params   IN OUT  VARCHAR2
            ,pm_curr_no   IN    oltbs_batch_master.CURR_NO%TYPE DEFAULT 0 --FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-LS-483, Journal entry - Gives batch not balanced error, even when just the first entry in the batch is not saved and when tried to cancel out
            )RETURN BOOLEAN;
  */

  FUNCTION fn_journal_validation(pm_branch     IN oltbs_batch_master.branch_code%TYPE,
                                 pm_batch_no   IN oltbs_batch_master.batch_no%TYPE,
                                 pm_cr_ent_tot OUT oltbs_batch_master.cr_ent_total%TYPE,
                                 pm_dr_ent_tot OUT oltbs_batch_master.dr_ent_total%TYPE,
                                 pm_update_tot IN Varchar2,
                                 pm_err_code   IN OUT Varchar2,
                                 pm_params     IN OUT Varchar2)
    RETURN BOOLEAN;

  --Fcc4.2 OPS related changes ends..

  FUNCTION fn_close_batch(pm_Branch     IN oltbs_batch_master.BRANCH_CODE%TYPE,
                          pm_Batch_no   IN oltbs_batch_master.BATCH_NO%TYPE,
                          pm_batch_type IN oltbs_batch_master.TYPE%TYPE,
                          pm_user_id    IN oltbs_batch_master.LAST_OPER_ID%TYPE,
                          pm_err_code   IN OUT VARCHAR2,
                          pm_params     IN OUT VARCHAR2) RETURN BOOLEAN;
  ---------------------------------------------------------
  --Function to copy entries of one transaction to another
  ----------------------------------------------------------
  /*FUNCTION fn_muoff_copy(
    pm_From_Ref_No  IN  oltbs_mlt_offset_master.reference_no%TYPE,
    pm_To_Ref_No  IN  oltbs_mlt_offset_master.reference_no%TYPE,
    pm_Appldate IN  oltbs_mlt_offset_master.value_date%TYPE
    ) RETURN BOOLEAN;
  ---------------------------------------------------
  --function to get all the XXCURRENCIES in which cash gl is
  --defined for a Till
  ----------------------------------------------------
  FUNCTION fn_get_till_ccys(
    pm_Branch   IN  oltms_til_vlt_ccy_params.BRANCH_CODE%TYPE ,
    pm_Till_Id  IN  oltms_til_vlt_ccy_params.TILL_ID%TYPE ,
    pm_ccys   IN OUT  varchar2
    )RETURN BOOLEAN;
  --------------------------------------------------
  --function to copy the details of one record to another
  --returns TRUE if copy is success
  --------------------------------------------------
  FUNCTION fn_til_cpy(
    pm_Branch_Code  IN  oltms_til_vlt_master.branch_code%TYPE,
    pm_From_Till_Id IN  oltms_til_vlt_master.till_id%TYPE,
    pm_To_Till_Id IN  oltms_til_vlt_master.till_id%TYPE
    )RETURN BOOLEAN;
  ---------------------------------------------------------------------
  --function to determine whether txn. have been made for the till for the day
  --used during closure of till and for deleting a record int the detail
  --returns TRUE if the above is true
  ----------------------------------------------------------------------
  FUNCTION fn_til_chktxn(
    pm_Branch_Code  IN  oltms_til_vlt_master.branch_code%TYPE,
    pm_Till_Id  IN  oltms_til_vlt_master.till_id%TYPE,
    pm_Ccy    IN  oltms_til_vlt_ccy_params.ccy_cd%TYPE,
    pm_appl_date  IN  oltbs_teller_master.txn_date%TYPE
    )RETURN BOOLEAN;
  ------------------------------------------------------------------
  --function to check whether the ccy defined in detms_til_vlt_params for
  --the cash GL are valid for the GL
  --returns TRUE if the above is true
  ------------------------------------------------------------------
  FUNCTION fn_is_acc_ccy_ok(
    pm_Branch   IN  oltbs_account.BRANCH_CODE%TYPE,
    pm_acc    IN  oltbs_account.AC_GL_NO%TYPE,
    pm_ccy_cd IN  oltms_til_vlt_ccy_params.ccy_cd%TYPE,
    pm_lcy    IN  oltms_til_vlt_ccy_params.ccy_cd%TYPE
    )RETURN BOOLEAN;
  --------------------------------------------------------------------
  --function to check whether the cash gl's defined in detms_til_vlt_params
  --are valid for the current branch
  --returns TRUE if above is true
  ---------------------------------------------------------------------
  */
  FUNCTION fn_is_acc_branch_ok(pm_acc         IN oltbs_account.ac_gl_no%TYPE,
                               pm_branch_code IN oltbs_account.branch_code%TYPE)
    RETURN BOOLEAN;
  --------------------------------------------------------------------
  --function to check whether all txn done for a till are balanced
  --returns TRUE if above is true
  ---------------------------------------------------------------------
  /*FUNCTION fn_til_chktxn_auth(
    pm_branch_code  IN  oltbs_teller_master.branch_code%TYPE,
    pm_till_id  IN  oltbs_teller_master.till_id%TYPE,
    pm_appl_date  IN  oltbs_teller_master.txn_date%TYPE
    )RETURN BOOLEAN;
  --------------------------------------------------------------------
  --function to check if all ccys if a till is balanced
  --updates balanced_ind in detms_til_bal_master if all ccys are balanced
  --returns TRUE if above is true
  ---------------------------------------------------------------------
  FUNCTION fn_upd_til_bal_flag(
    pm_branch_code  IN  oltms_til_vlt_ccy_params.branch_code%TYPE
  ,
    pm_till_id  IN  oltms_til_vlt_ccy_params.till_id%TYPE
    )RETURN BOOLEAN;
  --------------------------------------------------------------------
  --function to update oltms_til_vlt_denom with denominations once detms_til_vlt
  --_ccy_params has a new entry
  --returns TRUE if above is done
  --------------------------------------------------------------------------
  FUNCTION fn_insert_denom(
    pm_branch_code  IN  oltms_til_vlt_denom.branch_code%TYPE,
    pm_till_id  IN  oltms_til_vlt_denom.till_id%TYPE,
    pm_ccy_cd IN  oltms_til_vlt_denom.ccy_cd%TYPE
    )RETURN BOOLEAN;
  -------------------------------------------------------------------------
  --function to update oltms_til_vlt_denom with denominations once detms_til_vlt
  --_ccy_params has an entry deleted
  --returns TRUE if above is done
  --------------------------------------------------------------------------
  FUNCTION fn_delete_denom(
    pm_branch_code  IN  oltms_til_vlt_denom.branch_code%TYPE,
    pm_till_id  IN  oltms_til_vlt_denom.till_id%TYPE,
    pm_ccy_cd IN  oltms_til_vlt_denom.ccy_cd%TYPE
    )RETURN BOOLEAN;
  -------------------------------------------------------------------------
  --function to get the last operator and the last authorizer of the batch
  --------------------------------------------------------------------------
  */
  FUNCTION fn_get_batch_details(pm_Branch   IN oltbs_batch_master.branch_code%TYPE,
                                pm_Batch    IN oltbs_batch_master.batch_no%TYPE,
                                pm_operator IN OUT oltbs_batch_master.last_oper_id%TYPE,
                                pm_auth     IN OUT oltbs_batch_master.last_auth_id%TYPE)
    RETURN BOOLEAN;
  -------------------------------------------------------------------------
  --function to check the entry and the batch totals of the batch.
  --Returns TRUE if they match else FALSE
  --------------------------------------------------------------------------
  /*FUNCTION fn_check_batch_totals(
    pm_Branch IN  oltbs_batch_master.branch_code%TYPE,
    pm_Batch  IN  oltbs_batch_master.batch_no%TYPE
    )RETURN BOOLEAN;
  -------------------------------------------------------------------------
  --function to get a reference number given a batch number
  --------------------------------------------------------------------------
  */
  FUNCTION fn_get_reference_no(pm_Branch    IN oltbs_batch_master.branch_code%TYPE,
                               pm_Batch     IN oltbs_batch_master.Batch_no%TYPE,
                               pm_appl_date IN DATE,
                               pm_refno     IN OUT oltbs_jrnl_log_de.REFERENCE_NO%TYPE,
                               pm_curno     IN OUT oltbs_batch_master.curr_no%TYPE)
    RETURN BOOLEAN;
  -------------------------------------------------------------------------
  --function to mark the till in a particular currency as well as the Till
  --as a whole unbalanced
  ------------------------------------------------------------------------
  /*
  FUNCTION fn_mark_till_unbal(
    pm_Branch IN  oltms_til_vlt_ccy_params.branch_code%TYPE,
    pm_Till   IN  oltms_til_vlt_ccy_params.till_id%TYPE,
    pm_ccy    IN  oltms_til_vlt_ccy_params.ccy_cd%TYPE
    )RETURN BOOLEAN;
  -------------------------------------------------------------------------
  --function to get the Lcy equivalent given two XXCURRENCIES amounts in those
  --XXCURRENCIES. At present used by Teller
  --------------------------------------------------------------------------
  FUNCTION fn_get_lcy_amount(
    pm_Branch IN  oltbs_teller_master.branch_code%TYPE,
    pm_Lcy    IN  oltbs_teller_master.txn_ccy%TYPE,
    dr_ccy    IN  oltbs_teller_master.txn_ccy%TYPE,
    cr_ccy    IN  oltbs_teller_master.txn_ccy%TYPE,
    dr_amount IN  oltbs_teller_master.txn_amount%TYPE,
    cr_amount IN  oltbs_teller_master.txn_amount%TYPE,
    lcy_amount  IN OUT  oltbs_teller_master.txn_amount%TYPE,
    dr_lcy_rate IN OUT  oltbs_teller_master.exch_rate%TYPE,
    cr_lcy_rate IN OUT  oltbs_teller_master.exch_rate%TYPE,
    pm_err_code IN OUT varchar2
    )RETURN BOOLEAN;
  
  -------------------------------------------------------------------------
  --function to return the date and time given the application date
  --------------------------------------------------------------------------
  FUNCTION fn_get_date_time(
    pm_ApplDate IN  date
    )RETURN date;
  
  -------------------------------------------------------------------------
  --Function to validate the value date. Returns the override code. The function
  --calling can use it for further processing
  --------------------------------------------------------------------------
  FUNCTION fn_validate_value_date(
    pm_Branch IN  oltbs_teller_master.txn_branch%TYPE,
    pm_ccy    IN  oltbs_teller_master.txn_ccy%TYPE,
    pm_appl_date  IN  oltbs_teller_master.txn_date%TYPE,
    pm_value_date IN  oltbs_teller_master.value_date%TYPE
    )RETURN varchar2;
  
  \*----------------------------------------------------------------------*\
  --  FUNCTION ADDED TO HELP IN IDENTIFYING PROBLEMS IN
  --  TELLER CONTRACT INPUT ACCOUNT VALIDATION PROBLEM
  -- 27.JUL.2002 FCC4.1 Oct2002 Citi Latam Retro PYUAT 54 Added the new function for checking the validity of the account.
  \*----------------------------------------------------------------------*\
  FUNCTION FN_IS_ACC_BRANCH_VALID(
    pm_acc    IN  oltbs_account.ac_gl_no%TYPE,
    pm_branch_code  IN  oltbs_account.branch_code%TYPE,
    err_code    OUT varchar2,
    errparams   OUT varchar2
    )RETURN BOOLEAN;
  
  \*-------------------------------------------------------------------------*\
  --function added to open new batch
  --DOUAT TIL#33
  \*--------------------------------------------------------------------------*\
  Function fn_open_batch_new
      (
      p_branch_code IN oltbs_batch_master.branch_code%type,
      p_batch_no  IN OUT oltbs_batch_master.batch_no%type,
      p_upload_flag IN oltbs_batch_master.uploaded%TYPE,
      p_type IN oltbs_batch_master.TYPE%TYPE,
      p_department_code IN oltbs_batch_master.department_code%TYPE,
      p_error_code  IN OUT varchar2,
      p_error_param  IN OUT varchar2)Return Boolean;
  \*----------------------------------------------------------------------------*\
  --
  --FCC 4.3 AUG 2003 GAAP core Changes start
  --
  */
  --function to return the date and time given the application date
  --------------------------------------------------------------------------
  FUNCTION fn_get_date_time(pm_ApplDate IN date) RETURN date;
  FUNCTION fn_update_batch_detail(p_branch           IN oltbs_batch_master.branch_code%TYPE,
                                  p_batch_no         IN oltbs_batch_master.batch_no%TYPE,
                                  p_tbl_batch_detail IN olpks_de_services.tbl_batch_detail,
                                  p_update           IN VARCHAR2,
                                  p_cr_total         OUT oltbs_batch_master.cr_ent_total%TYPE,
                                  p_dr_total         OUT oltbs_batch_master.dr_ent_total%TYPE)
    RETURN BOOLEAN;

  FUNCTION fn_get_lcy_totals(pm_Branch      IN oltbs_batch_master.BRANCH_CODE%TYPE,
                             pm_batch_no    IN oltbs_batch_master.BATCH_NO%TYPE,
                             pm_Ref_no      IN oltbs_daily_log_ac.TRN_REF_NO%TYPE,
                             pm_event_sr_no IN oltbs_daily_log_ac.EVENT_SR_NO%TYPE,
                             --
                             --FCC 4.3 AUG 2003 GAAP core Changes start
                             --
                             --pm_Cr_tot     IN OUT  oltbs_batch_master.CR_ENT_TOTAL%TYPE,
                             --pm_Dr_tot     IN OUT  oltbs_batch_master.DR_ENT_TOTAL%TYPE,
                             p_tbl_batch_detail OUT olpks_de_services.tbl_batch_detail
                             --
                             --FCC 4.3 AUG 2003 GAAP core Changes end
                             --
                             ) RETURN BOOLEAN;

  --function to update the authorization status of the batch
  --if all the entries in the batch are authorized
  ----------------------------------------------------
  FUNCTION fn_batch_upd_auth(pm_Branch IN oltbs_batch_master.BRANCH_CODE%TYPE,
                             pm_Batch  IN oltbs_batch_master.BATCH_NO%TYPE,
                             pm_user   IN oltbs_batch_master.last_auth_id%TYPE,
                             pm_type   IN oltbs_batch_master.TYPE%TYPE)
    RETURN BOOLEAN;

  FUNCTION fn_batch_detail_validation(p_branch          IN oltbs_batch_master.branch_code%TYPE,
                                      p_batch_no        IN oltbs_batch_master.batch_no%TYPE,
                                      p_balance         IN VARCHAR2,
                                      p_balance_status  OUT oltbs_batch_master.balance_status%TYPE,
                                      p_ops             IN VARCHAR2,
                                      p_error_code      IN OUT VARCHAR2,
                                      p_error_parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --
--FCC 4.3 AUG 2003 GAAP core Changes start
--

END olpks_de_services;
/
CREATE OR REPLACE SYNONYM olpkss_de_services FOR olpks_de_services
/