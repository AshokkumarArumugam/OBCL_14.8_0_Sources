CREATE OR REPLACE PACKAGE lbpks_rfr_revision AS
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_rfr_revision.SPC
  **
  ** Module : LOANS  SYNDICATION
  **
    This source is part of the Oracle Banking Corporate Lending  Software Product.
    Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.
    No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.
  
    Oracle Financial Services Software Limited.
    Oracle Park, Off Western Express Highway,
    Goregaon (East),
    Mumbai - 400 063, India.
  -------------------------------------------------------------------------------------------------------
       CHANGE HISTORY
  
  
  ----------------------------------------------------------------------------------------------------
  */

  PROCEDURE pr_upd_frrn_due(pm_branch      IN oltbs_contract.branch%TYPE,
                            pm_ccy         IN cftms_float_rate_master.ccy_code%TYPE,
                            pm_rate_code   IN cftms_float_rate_master.rate_code%TYPE,
                            pm_prev_slab   IN cftms_float_rate_master.amount_slab%TYPE,
                            pm_amount_slab IN cftms_float_rate_master.amount_slab%TYPE,
                            pm_eff_date    IN DATE,
                            pm_today       IN DATE
                            --  ,pm_version_no    IN  cftws_float_rate_master.version_no%TYPE --Floating_Rate_changes commented
                           ,
                            pm_next_eff_date IN DATE);

  PROCEDURE pr_upd_frrn_due(pm_branch      IN oltbs_contract.branch%TYPE,
                            pm_ccy         IN cftms_float_rate_master.ccy_code%TYPE,
                            pm_rate_code   IN cftms_float_rate_master.rate_code%TYPE,
                            pm_prev_slab   IN cftms_float_rate_master.amount_slab%TYPE,
                            pm_amount_slab IN cftms_float_rate_master.amount_slab%TYPE,
                            pm_eff_date    IN DATE,
                            pm_today       IN DATE);

  FUNCTION fn_cya(pm_branch    IN oltbs_contract.branch%TYPE,
                  pm_proc_date IN DATE,
                  pm_err_code  IN OUT ertbs_msgs.err_code%TYPE,
                  pm_params    IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_contract_level_updates(pm_cs_rec   IN oltbs_contract%ROWTYPE,
                                     pm_err_code IN OUT ertbs_msgs.err_code%TYPE,
                                     pm_params   IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_rfr_stp_process(pm_branch      IN oltms_branch.branch_code%TYPE,
                              pm_user        IN sstbs_user.user_id%TYPE,
                              pm_cont_ref_no IN oltbs_contract.contract_ref_no%TYPE,
                              pm_eff_date    IN oltbs_contract_frrn_due.eff_date%TYPE,
                              pm_err_code    IN OUT ertbs_msgs.err_code%TYPE,
                              pm_params      IN OUT VARCHAR2) RETURN VARCHAR2;

  FUNCTION fn_rfr_rate_revision(pm_branch          IN oltms_branch.branch_code%TYPE,
                                pm_user            IN sstbs_user.user_id%TYPE,
                                pm_module          IN oltbs_contract.module_code%TYPE,
                                pm_proc_date       IN DATE,
                                pm_cont_ref_no     IN oltbs_contract.contract_ref_no%TYPE,
                                pm_component       IN lftbs_contract_interest.component%TYPE,
                                pm_currency        IN oltbs_contract.contract_ccy%TYPE,
                                pm_rate_Code       IN oltbs_contract_frrn_due.rate_Code%TYPE,
                                pm_eff_date        IN oltbs_contract_frrn_due.eff_date%TYPE,
                                pm_rate            IN oltbs_contract_frrn_due.rate%TYPE,
                                pm_prev_contract   IN oltbs_contract.contract_ref_no%TYPE,
                                pm_curr_contract   IN oltbs_contract.contract_ref_no%TYPE,
                                pm_prev_value_date IN DATE,
                                pm_curr_value_date IN DATE,
                                pm_msg_id          IN OUT VARCHAR2,
                                pm_err_code        IN OUT ertbs_msgs.err_code%TYPE,
                                pm_params          IN OUT VARCHAR2)
    RETURN VARCHAR2;

  FUNCTION fn_rate_revn_ratefixing_job(pm_branch    IN oltms_branch.branch_code%TYPE,
                                       pm_module    IN oltbs_contract.module_code%TYPE,
                                       pm_proc_date IN DATE,
                                       pm_product   IN oltms_product_master_ld.product%TYPE,
                                       pm_comt_freq IN oltbs_automatic_process_master.bod_commit_count%TYPE,
                                       pm_err_code  IN OUT ertbs_msgs.err_code%TYPE,
                                       pm_params    IN OUT VARCHAR2)
    RETURN BOOLEAN;

  pkg_raterevn VARCHAR2(1) := 'N';

END lbpks_rfr_revision;
/
CREATE or replace SYNONYM lbpkss_rfr_revision FOR lbpks_rfr_revision
/