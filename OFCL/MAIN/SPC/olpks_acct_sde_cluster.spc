CREATE OR REPLACE PACKAGE olpks_acct_sde_cluster IS

  /*************************************************************************************************
  **  This source is part of the FLEXCUBE-Corporate Banking Software System
  **  and is copyrighted by Oracle Financial Services Software Limited.
  **  All rights reserved.  No part of this work may be reproduced,
  **  stored in a retrieval system, adopted or transmitted in any form or
  **  by any means, electronic, mechanical, photographic, graphic,
  **  optic recording or otherwise, translated in any language or
  **  computer language, without the prior written permission of
  **  Oracle Financial Services Software Limited.
  **
  **  Oracle Financial Services Software Limited.
  **  10-11, SDF I, SEEPZ, Andheri (East),
  **  MUMBAI - 400 096.
  **  INDIA
  **
  **  Copyright  2021-  by Oracle Financial Services Software Limited.
  **  Oracle Financial Services Software Limited.
  **
  **************************************************************************************************
  **  PACKAGE Name      : olpks_acct_sde_cluster
  **  File Name         : olpks_acct_sde_cluster.SPC
  **  Module            : OL
  **  Description       : Hooks for OBCL 14.5 Rule Based Accounting changes
  
  *************************************************************************************************/

  FUNCTION fn_pre_get_loan_status(pcontractrefno IN oltb_contract.contract_ref_no%TYPE,
                                  psde_id        IN oltm_sde.sde_id%TYPE,
                                  psde_dtype     IN oltm_sde.sde_datatype %TYPE,
                                  p_rec_sde      IN OUT olpks_acct_sde.ty_rec_sde_val,
                                  p_err_cd       IN OUT ertbs_msgs.err_code%TYPE)
    RETURN BOOLEAN;

  FUNCTION fn_post_get_loan_status(pcontractrefno IN oltb_contract.contract_ref_no%TYPE,
                                   psde_id        IN oltm_sde.sde_id%TYPE,
                                   psde_dtype     IN oltm_sde.sde_datatype %TYPE,
                                   p_rec_sde      IN OUT olpks_acct_sde.ty_rec_sde_val,
                                   p_err_cd       IN OUT ertbs_msgs.err_code%TYPE)
    RETURN BOOLEAN;

  FUNCTION fn_pre_get_application_date(pcontractrefno IN oltb_contract.contract_ref_no%TYPE,
                                       psde_id        IN oltm_sde.sde_id%TYPE,
                                       psde_dtype     IN oltm_sde.sde_datatype %TYPE,
                                       p_rec_sde      IN OUT olpks_acct_sde.ty_rec_sde_val,
                                       p_err_cd       IN OUT ertbs_msgs.err_code%TYPE)
    RETURN BOOLEAN;

  FUNCTION fn_post_get_application_date(pcontractrefno IN oltb_contract.contract_ref_no%TYPE,
                                        psde_id        IN oltm_sde.sde_id%TYPE,
                                        psde_dtype     IN oltm_sde.sde_datatype %TYPE,
                                        p_rec_sde      IN OUT olpks_acct_sde.ty_rec_sde_val,
                                        p_err_cd       IN OUT ertbs_msgs.err_code%TYPE)
    RETURN BOOLEAN;

  FUNCTION fn_pre_get_amount_financed(pcontractrefno IN oltb_contract.contract_ref_no%TYPE,
                                      psde_id        IN oltm_sde.sde_id%TYPE,
                                      psde_dtype     IN oltm_sde.sde_datatype %TYPE,
                                      p_rec_sde      IN OUT olpks_acct_sde.ty_rec_sde_val,
                                      p_err_cd       IN OUT ertbs_msgs.err_code%TYPE)
    RETURN BOOLEAN;

  FUNCTION fn_post_get_amount_financed(pcontractrefno IN oltb_contract.contract_ref_no%TYPE,
                                       psde_id        IN oltm_sde.sde_id%TYPE,
                                       psde_dtype     IN oltm_sde.sde_datatype %TYPE,
                                       p_rec_sde      IN OUT olpks_acct_sde.ty_rec_sde_val,
                                       p_err_cd       IN OUT ertbs_msgs.err_code%TYPE)
    RETURN BOOLEAN;

  FUNCTION fn_pre_get_amount_disbursed(pcontractrefno IN oltb_contract.contract_ref_no%TYPE,
                                       psde_id        IN oltm_sde.sde_id%TYPE,
                                       psde_dtype     IN oltm_sde.sde_datatype %TYPE,
                                       p_rec_sde      IN OUT olpks_acct_sde.ty_rec_sde_val,
                                       p_err_cd       IN OUT ertbs_msgs.err_code%TYPE)
    RETURN BOOLEAN;

  FUNCTION fn_post_get_amount_disbursed(pcontractrefno IN oltb_contract.contract_ref_no%TYPE,
                                        psde_id        IN oltm_sde.sde_id%TYPE,
                                        psde_dtype     IN oltm_sde.sde_datatype %TYPE,
                                        p_rec_sde      IN OUT olpks_acct_sde.ty_rec_sde_val,
                                        p_err_cd       IN OUT ertbs_msgs.err_code%TYPE)
    RETURN BOOLEAN;

  FUNCTION fn_pre_get_customer_category(pcontractrefno IN oltb_contract.contract_ref_no%TYPE,
                                        psde_id        IN oltm_sde.sde_id%TYPE,
                                        psde_dtype     IN oltm_sde.sde_datatype %TYPE,
                                        p_rec_sde      IN OUT olpks_acct_sde.ty_rec_sde_val,
                                        p_err_cd       IN OUT ertbs_msgs.err_code%TYPE)
    RETURN BOOLEAN;

  FUNCTION fn_post_get_customer_category(pcontractrefno IN oltb_contract.contract_ref_no%TYPE,
                                         psde_id        IN oltm_sde.sde_id%TYPE,
                                         psde_dtype     IN oltm_sde.sde_datatype %TYPE,
                                         p_rec_sde      IN OUT olpks_acct_sde.ty_rec_sde_val,
                                         p_err_cd       IN OUT ertbs_msgs.err_code%TYPE)
    RETURN BOOLEAN;

  FUNCTION fn_pre_get_vami_booking_date(pcontractrefno IN oltb_contract.contract_ref_no%TYPE,
                                        psde_id        IN oltm_sde.sde_id%TYPE,
                                        psde_dtype     IN oltm_sde.sde_datatype %TYPE,
                                        p_rec_sde      IN OUT olpks_acct_sde.ty_rec_sde_val,
                                        p_err_cd       IN OUT ertbs_msgs.err_code%TYPE)
    RETURN BOOLEAN;

  FUNCTION fn_post_get_vami_booking_date(pcontractrefno IN oltb_contract.contract_ref_no%TYPE,
                                         psde_id        IN oltm_sde.sde_id%TYPE,
                                         psde_dtype     IN oltm_sde.sde_datatype %TYPE,
                                         p_rec_sde      IN OUT olpks_acct_sde.ty_rec_sde_val,
                                         p_err_cd       IN OUT ertbs_msgs.err_code%TYPE)
    RETURN BOOLEAN;

  FUNCTION fn_pre_get_vami_effective_date(pcontractrefno IN oltb_contract.contract_ref_no%TYPE,
                                          psde_id        IN oltm_sde.sde_id%TYPE,
                                          psde_dtype     IN oltm_sde.sde_datatype %TYPE,
                                          p_rec_sde      IN OUT olpks_acct_sde.ty_rec_sde_val,
                                          p_err_cd       IN OUT ertbs_msgs.err_code%TYPE)
    RETURN BOOLEAN;

  FUNCTION fn_post_get_vami_effective_date(pcontractrefno IN oltb_contract.contract_ref_no%TYPE,
                                           psde_id        IN oltm_sde.sde_id%TYPE,
                                           psde_dtype     IN oltm_sde.sde_datatype %TYPE,
                                           p_rec_sde      IN OUT olpks_acct_sde.ty_rec_sde_val,
                                           p_err_cd       IN OUT ertbs_msgs.err_code%TYPE)
    RETURN BOOLEAN;

  FUNCTION fn_pre_get_ovr_days(pcontractrefno IN oltb_contract.contract_ref_no%TYPE,
                               psde_id        IN oltm_sde.sde_id%TYPE,
                               psde_dtype     IN oltm_sde.sde_datatype %TYPE,
                               p_rec_sde      IN OUT olpks_acct_sde.ty_rec_sde_val,
                               p_err_cd       IN OUT ertbs_msgs.err_code%TYPE)
    RETURN BOOLEAN;

  FUNCTION fn_post_get_ovr_days(pcontractrefno IN oltb_contract.contract_ref_no%TYPE,
                                psde_id        IN oltm_sde.sde_id%TYPE,
                                psde_dtype     IN oltm_sde.sde_datatype %TYPE,
                                p_rec_sde      IN OUT olpks_acct_sde.ty_rec_sde_val,
                                p_err_cd       IN OUT ertbs_msgs.err_code%TYPE)
    RETURN BOOLEAN;

  FUNCTION fn_pre_get_book_date(pcontractrefno IN oltb_contract.contract_ref_no%TYPE,
                                psde_id        IN oltm_sde.sde_id%TYPE,
                                psde_dtype     IN oltm_sde.sde_datatype %TYPE,
                                p_rec_sde      IN OUT olpks_acct_sde.ty_rec_sde_val,
                                p_err_cd       IN OUT ertbs_msgs.err_code%TYPE)
    RETURN BOOLEAN;

  FUNCTION fn_post_get_book_date(pcontractrefno IN oltb_contract.contract_ref_no%TYPE,
                                 psde_id        IN oltm_sde.sde_id%TYPE,
                                 psde_dtype     IN oltm_sde.sde_datatype %TYPE,
                                 p_rec_sde      IN OUT olpks_acct_sde.ty_rec_sde_val,
                                 p_err_cd       IN OUT ertbs_msgs.err_code%TYPE)
    RETURN BOOLEAN;

  FUNCTION fn_pre_get_branch_code(pcontractrefno IN oltb_contract.contract_ref_no%TYPE,
                                  psde_id        IN oltm_sde.sde_id%TYPE,
                                  psde_dtype     IN oltm_sde.sde_datatype %TYPE,
                                  p_rec_sde      IN OUT olpks_acct_sde.ty_rec_sde_val,
                                  p_err_cd       IN OUT ertbs_msgs.err_code%TYPE)
    RETURN BOOLEAN;

  FUNCTION fn_post_get_branch_code(pcontractrefno IN oltb_contract.contract_ref_no%TYPE,
                                   psde_id        IN oltm_sde.sde_id%TYPE,
                                   psde_dtype     IN oltm_sde.sde_datatype %TYPE,
                                   p_rec_sde      IN OUT olpks_acct_sde.ty_rec_sde_val,
                                   p_err_cd       IN OUT ertbs_msgs.err_code%TYPE)
    RETURN BOOLEAN;

  FUNCTION fn_pre_get_customer_id(pcontractrefno IN oltb_contract.contract_ref_no%TYPE,
                                  psde_id        IN oltm_sde.sde_id%TYPE,
                                  psde_dtype     IN oltm_sde.sde_datatype %TYPE,
                                  p_rec_sde      IN OUT olpks_acct_sde.ty_rec_sde_val,
                                  p_err_cd       IN OUT ertbs_msgs.err_code%TYPE)
    RETURN BOOLEAN;

  FUNCTION fn_post_get_customer_id(pcontractrefno IN oltb_contract.contract_ref_no%TYPE,
                                   psde_id        IN oltm_sde.sde_id%TYPE,
                                   psde_dtype     IN oltm_sde.sde_datatype %TYPE,
                                   p_rec_sde      IN OUT olpks_acct_sde.ty_rec_sde_val,
                                   p_err_cd       IN OUT ertbs_msgs.err_code%TYPE)
    RETURN BOOLEAN;

  FUNCTION fn_pre_get_emi_amount(pcontractrefno IN oltb_contract.contract_ref_no%TYPE,
                                 psde_id        IN oltm_sde.sde_id%TYPE,
                                 psde_dtype     IN oltm_sde.sde_datatype %TYPE,
                                 p_rec_sde      IN OUT olpks_acct_sde.ty_rec_sde_val,
                                 p_err_cd       IN OUT ertbs_msgs.err_code%TYPE)
    RETURN BOOLEAN;

  FUNCTION fn_post_get_emi_amount(pcontractrefno IN oltb_contract.contract_ref_no%TYPE,
                                  psde_id        IN oltm_sde.sde_id%TYPE,
                                  psde_dtype     IN oltm_sde.sde_datatype %TYPE,
                                  p_rec_sde      IN OUT olpks_acct_sde.ty_rec_sde_val,
                                  p_err_cd       IN OUT ertbs_msgs.err_code%TYPE)
    RETURN BOOLEAN;

  FUNCTION fn_pre_get_increased_principal(pcontractrefno IN oltb_contract.contract_ref_no%TYPE,
                                          psde_id        IN oltm_sde.sde_id%TYPE,
                                          psde_dtype     IN oltm_sde.sde_datatype %TYPE,
                                          p_rec_sde      IN OUT olpks_acct_sde.ty_rec_sde_val,
                                          p_err_cd       IN OUT ertbs_msgs.err_code%TYPE)
    RETURN BOOLEAN;

  FUNCTION fn_post_get_increased_principal(pcontractrefno IN oltb_contract.contract_ref_no%TYPE,
                                           psde_id        IN oltm_sde.sde_id%TYPE,
                                           psde_dtype     IN oltm_sde.sde_datatype %TYPE,
                                           p_rec_sde      IN OUT olpks_acct_sde.ty_rec_sde_val,
                                           p_err_cd       IN OUT ertbs_msgs.err_code%TYPE)
    RETURN BOOLEAN;

  FUNCTION fn_pre_get_tenor(pcontractrefno IN oltb_contract.contract_ref_no%TYPE,
                            psde_id        IN oltm_sde.sde_id%TYPE,
                            psde_dtype     IN oltm_sde.sde_datatype %TYPE,
                            p_rec_sde      IN OUT olpks_acct_sde.ty_rec_sde_val,
                            p_err_cd       IN OUT ertbs_msgs.err_code%TYPE)
    RETURN BOOLEAN;

  FUNCTION fn_post_get_tenor(pcontractrefno IN oltb_contract.contract_ref_no%TYPE,
                             psde_id        IN oltm_sde.sde_id%TYPE,
                             psde_dtype     IN oltm_sde.sde_datatype %TYPE,
                             p_rec_sde      IN OUT olpks_acct_sde.ty_rec_sde_val,
                             p_err_cd       IN OUT ertbs_msgs.err_code%TYPE)
    RETURN BOOLEAN;

  FUNCTION fn_pre_get_commitment_unutilized(pcontractrefno IN oltb_contract.contract_ref_no%TYPE,
                                            psde_id        IN oltm_sde.sde_id%TYPE,
                                            psde_dtype     IN oltm_sde.sde_datatype %TYPE,
                                            p_rec_sde      IN OUT olpks_acct_sde.ty_rec_sde_val,
                                            p_err_cd       IN OUT ertbs_msgs.err_code%TYPE)
    RETURN BOOLEAN;

  FUNCTION fn_post_get_commitment_unutilized(pcontractrefno IN oltb_contract.contract_ref_no%TYPE,
                                             psde_id        IN oltm_sde.sde_id%TYPE,
                                             psde_dtype     IN oltm_sde.sde_datatype %TYPE,
                                             p_rec_sde      IN OUT olpks_acct_sde.ty_rec_sde_val,
                                             p_err_cd       IN OUT ertbs_msgs.err_code%TYPE)
    RETURN BOOLEAN;

  FUNCTION fn_pre_get_commitment_utilized(pcontractrefno IN oltb_contract.contract_ref_no%TYPE,
                                          psde_id        IN oltm_sde.sde_id%TYPE,
                                          psde_dtype     IN oltm_sde.sde_datatype %TYPE,
                                          p_rec_sde      IN OUT olpks_acct_sde.ty_rec_sde_val,
                                          p_err_cd       IN OUT ertbs_msgs.err_code%TYPE)
    RETURN BOOLEAN;

  FUNCTION fn_post_get_commitment_utilized(pcontractrefno IN oltb_contract.contract_ref_no%TYPE,
                                           psde_id        IN oltm_sde.sde_id%TYPE,
                                           psde_dtype     IN oltm_sde.sde_datatype %TYPE,
                                           p_rec_sde      IN OUT olpks_acct_sde.ty_rec_sde_val,
                                           p_err_cd       IN OUT ertbs_msgs.err_code%TYPE)
    RETURN BOOLEAN;

  FUNCTION fn_pre_get_total_overdue_amount(pcontractrefno IN oltb_contract.contract_ref_no%TYPE,
                                           psde_id        IN oltm_sde.sde_id%TYPE,
                                           psde_dtype     IN oltm_sde.sde_datatype %TYPE,
                                           p_rec_sde      IN OUT olpks_acct_sde.ty_rec_sde_val,
                                           p_err_cd       IN OUT ertbs_msgs.err_code%TYPE)
    RETURN BOOLEAN;

  FUNCTION fn_post_get_total_overdue_amount(pcontractrefno IN oltb_contract.contract_ref_no%TYPE,
                                            psde_id        IN oltm_sde.sde_id%TYPE,
                                            psde_dtype     IN oltm_sde.sde_datatype %TYPE,
                                            p_rec_sde      IN OUT olpks_acct_sde.ty_rec_sde_val,
                                            p_err_cd       IN OUT ertbs_msgs.err_code%TYPE)
    RETURN BOOLEAN;

  FUNCTION fn_pre_get_total_schodue(pcontractrefno IN oltb_contract.contract_ref_no%TYPE,
                                          psde_id        IN oltm_sde.sde_id%TYPE,
                                          psde_dtype     IN oltm_sde.sde_datatype %TYPE,
                                          p_rec_sde      IN OUT olpks_acct_sde.ty_rec_sde_val,
                                          p_err_cd       IN OUT ertbs_msgs.err_code%TYPE)
    RETURN BOOLEAN;

  FUNCTION fn_post_get_total_schodue(pcontractrefno IN oltb_contract.contract_ref_no%TYPE,
                                           psde_id        IN oltm_sde.sde_id%TYPE,
                                           psde_dtype     IN oltm_sde.sde_datatype %TYPE,
                                           p_rec_sde      IN OUT olpks_acct_sde.ty_rec_sde_val,
                                           p_err_cd       IN OUT ertbs_msgs.err_code%TYPE)
    RETURN BOOLEAN;
END olpks_acct_sde_cluster;
/
create or replace synonym olpkss_acct_sde_cluster for olpks_acct_sde_cluster
/