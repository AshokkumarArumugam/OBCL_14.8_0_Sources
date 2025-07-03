CREATE OR REPLACE PACKAGE olpks_irrn_cluster AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_irrn_cluster.SPC
**
** Module		: LOANS AND DEPOSITS
**
	This source is part of the Oracle Flexcube Corporate Lending  Software Product.
	Copyright Ã‚Â© 2019 , Oracle and/or its affiliates.  All rights reserved.
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East),
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/

/*----------------------------------CHANGE HISTORY--------------------------------------------

   **Changed By         : Abhik Das
   **Date               : 28-Oct-2020
   **Change Description : Provided Hooks for scheduled rate code
   **Search String      : OBCL_14.1_Support_Bug#32018865_Forward_port_Bug#32078436_Changes
   
   **Changed By         : Abhik Das
   **Date               : 10-Aug-2021
   **Change Description : Provided Hooks for delayed Application of 
                         floating Rate Interest for existing Mortgage Loans
   **Search String      : OBCL_14.5_Support_Bug#33199497_Changes
   
   
    Changed By         : Navoneel Nandan
    Changed On         : 16-May-2024
    Change Reason      : Hooks on Multi Threading Changes for REVN
    Search String      : Bug#36589478_multi_threading_Hooks

------------------------------------END CHANGE HISTORY----------------------------------------
*/

	FUNCTION fn_pre_floating_rate_revision(
	pm_branch		IN		oltms_branch.branch_code%TYPE,
	pm_module		IN		oltbs_contract.module_code%TYPE,
	pm_proc_date	IN		DATE,
	pm_product		IN		oltms_product_master_ld.product%TYPE,
	pm_comt_freq	IN		oltbs_automatic_process_master.bod_commit_count%TYPE,
	pm_err_code		IN OUT	ertbs_msgs.err_code%TYPE,
	pm_params		IN OUT	VARCHAR2
	)RETURN BOOLEAN ;

	FUNCTION fn_post_floating_rate_revision(
	pm_branch		IN		oltms_branch.branch_code%TYPE,
	pm_module		IN		oltbs_contract.module_code%TYPE,
	pm_proc_date	IN		DATE,
	pm_product		IN		oltms_product_master_ld.product%TYPE,
	pm_comt_freq	IN		oltbs_automatic_process_master.bod_commit_count%TYPE,
	pm_err_code		IN OUT	ertbs_msgs.err_code%TYPE,
	pm_params		IN OUT	VARCHAR2
	)RETURN BOOLEAN ;
  ---------------OBCL_14.1_Support_Bug#32018865_Forward_port_Bug#32078436_Changes Starts---------------
  FUNCTION fn_pre_rate_revisions(pm_branch    IN oltms_branch.branch_code%TYPE
                              ,pm_module    IN oltbs_contract.module_code%TYPE
                              ,pm_proc_date IN DATE
                              ,pm_product   IN oltms_product_master_ld.product%TYPE
                              ,pm_comt_freq IN oltbs_automatic_process_master.bod_commit_count%TYPE
                              ,pm_err_code  IN OUT ertbs_msgs.err_code%TYPE
                              ,pm_params    IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_post_rate_revisions(pm_branch    IN oltms_branch.branch_code%TYPE
                              ,pm_module    IN oltbs_contract.module_code%TYPE
                              ,pm_proc_date IN DATE
                              ,pm_product   IN oltms_product_master_ld.product%TYPE
                              ,pm_comt_freq IN oltbs_automatic_process_master.bod_commit_count%TYPE
                              ,pm_err_code  IN OUT ertbs_msgs.err_code%TYPE
                              ,pm_params    IN OUT VARCHAR2) RETURN BOOLEAN;
  ----------------OBCL_14.1_Support_Bug#32018865_Forward_port_Bug#32078436_Changes Ends----------------
  ---------------OBCL_14.5_Support_Bug#33199497_Changes Starts---------------
  FUNCTION fn_pre_recomp_norm(pm_branch    IN oltbs_contract.branch%TYPE,
                              pm_reference IN oltbs_contract.contract_ref_no%TYPE,
                              pm_component IN oltbs_amount_due_cs.component%TYPE,
                              pm_eff_date  IN DATE,
                              pm_proc_date IN DATE,
                              pm_esn       IN oltbs_contract.latest_event_seq_no%TYPE,
                              pm_err_code  IN OUT ertbs_msgs.err_code%TYPE,
                              pm_params    IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_post_recomp_norm(pm_branch    IN oltbs_contract.branch%TYPE,
                              pm_reference IN oltbs_contract.contract_ref_no%TYPE,
                              pm_component IN oltbs_amount_due_cs.component%TYPE,
                              pm_eff_date  IN DATE,
                              pm_proc_date IN DATE,
                              pm_esn       IN oltbs_contract.latest_event_seq_no%TYPE,
                              pm_err_code  IN OUT ertbs_msgs.err_code%TYPE,
                              pm_params    IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION fn_pre_cya(pm_branch    IN oltbs_contract.branch%TYPE,
                      pm_proc_date IN DATE,
                      pm_err_code  IN OUT ertbs_msgs.err_code%TYPE,
                      pm_params    IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION fn_post_cya(pm_branch    IN oltbs_contract.branch%TYPE,
                      pm_proc_date IN DATE,
                      pm_err_code  IN OUT ertbs_msgs.err_code%TYPE,
                      pm_params    IN OUT VARCHAR2) RETURN BOOLEAN;
  ----------------OBCL_14.5_Support_Bug#33199497_Changes Ends----------------

   --Bug#36589478_multi_threading_Hooks starts                    
  FUNCTION fn_pre_upd_frrn_due_batch(pm_user_id      IN smtbs_user.user_id%TYPE,
                            pm_contract_ref_no      IN oltbs_contract.contract_ref_no%TYPE,
                            pm_branch      IN oltbs_contract.branch%TYPE,
                            pm_ccy         IN cftms_float_rate_master.ccy_code%TYPE,
                            pm_rate_code   IN cftms_float_rate_master.rate_code%TYPE,
                            pm_prev_slab   IN cftms_float_rate_master.amount_slab%TYPE,
                            pm_amount_slab IN cftms_float_rate_master.amount_slab%TYPE,
                            pm_eff_date    IN DATE,
                            pm_today       IN DATE,
                            pm_next_eff_date IN DATE,
                            pm_irrn_for_liqd_contract IN oltms_branch_parameters.irrn_for_liqd_contract%TYPE, 
                            p_err_code  IN OUT ertbs_msgs.err_code%TYPE,
                            p_params    IN OUT VARCHAR2) RETURN BOOLEAN;
                            
  FUNCTION fn_post_upd_frrn_due_batch(pm_user_id      IN smtbs_user.user_id%TYPE,
                            pm_contract_ref_no      IN oltbs_contract.contract_ref_no%TYPE,
                            pm_branch      IN oltbs_contract.branch%TYPE,
                            pm_ccy         IN cftms_float_rate_master.ccy_code%TYPE,
                            pm_rate_code   IN cftms_float_rate_master.rate_code%TYPE,
                            pm_prev_slab   IN cftms_float_rate_master.amount_slab%TYPE,
                            pm_amount_slab IN cftms_float_rate_master.amount_slab%TYPE,
                            pm_eff_date    IN DATE,
                            pm_today       IN DATE,
                            pm_next_eff_date IN DATE,
                            pm_irrn_for_liqd_contract IN oltms_branch_parameters.irrn_for_liqd_contract%TYPE, 
                            p_err_code  IN OUT ertbs_msgs.err_code%TYPE,
                            p_params    IN OUT VARCHAR2) RETURN BOOLEAN;
 
    FUNCTION fn_pre_process_comp_rates_batch(pm_user_id      IN smtbs_user.user_id%TYPE,
                                       pm_branch    IN oltms_branch.branch_code%TYPE,
                                       pm_module    IN oltbs_contract.module_code%TYPE,
                                       pm_proc_date IN DATE,
                                       pm_product   IN oltms_product_master_ld.product%TYPE,
                                       pm_comt_freq IN oltbs_automatic_process_master.bod_commit_count%TYPE,
                                       pm_err_code  IN OUT ertbs_msgs.err_code%TYPE,
                                       pm_params    IN OUT VARCHAR2) RETURN BOOLEAN;
                            
  FUNCTION fn_post_process_comp_rates_batch(pm_user_id      IN smtbs_user.user_id%TYPE,
                                       pm_branch    IN oltms_branch.branch_code%TYPE,
                                       pm_module    IN oltbs_contract.module_code%TYPE,
                                       pm_proc_date IN DATE,
                                       pm_product   IN oltms_product_master_ld.product%TYPE,
                                       pm_comt_freq IN oltbs_automatic_process_master.bod_commit_count%TYPE,
                                       pm_err_code  IN OUT ertbs_msgs.err_code%TYPE,
                                       pm_params    IN OUT VARCHAR2) RETURN BOOLEAN;
                                       
    FUNCTION fn_pre_rate_revisions_batch(pm_user_id      IN smtbs_user.user_id%TYPE,
                            pm_contract_ref_no      IN oltbs_contract.contract_ref_no%TYPE,
                            pm_branch    IN oltms_branch.branch_code%TYPE,
                             pm_module    IN oltbs_contract.module_code%TYPE,
                             pm_proc_date IN DATE,
                             pm_product   IN oltms_product_master_ld.product%TYPE,
                             pm_comt_freq IN oltbs_automatic_process_master.bod_commit_count%TYPE,
                             pm_err_code  IN OUT ertbs_msgs.err_code%TYPE,
                             pm_params    IN OUT VARCHAR2) RETURN BOOLEAN;
                            
  FUNCTION fn_post_rate_revisions_batch(pm_user_id      IN smtbs_user.user_id%TYPE,
                            pm_contract_ref_no      IN oltbs_contract.contract_ref_no%TYPE,
                            pm_branch    IN oltms_branch.branch_code%TYPE,
                             pm_module    IN oltbs_contract.module_code%TYPE,
                             pm_proc_date IN DATE,
                             pm_product   IN oltms_product_master_ld.product%TYPE,
                             pm_comt_freq IN oltbs_automatic_process_master.bod_commit_count%TYPE,
                             pm_err_code  IN OUT ertbs_msgs.err_code%TYPE,
                             pm_params    IN OUT VARCHAR2) RETURN BOOLEAN;
                             
    FUNCTION fn_pre_fpm_rate_revision_batch(pm_user_id      IN smtbs_user.user_id%TYPE,
                                     pm_branch          IN oltms_branch.branch_code%TYPE,
                                pm_module          IN oltbs_contract.module_code%TYPE,
                                pm_product         IN oltms_product_master_ld.product%TYPE,
                                pm_proc_date       IN DATE, --reset Value date
                                pm_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE, --NULL For batch
                                pm_process_mode    IN VARCHAR2, --B-Batch / O -Online
                                pm_err_code        IN OUT ertbs_msgs.err_code%TYPE,
                                pm_params          IN OUT VARCHAR2) RETURN BOOLEAN;
                            
  FUNCTION fn_post_fpm_rate_revision_batch(pm_user_id      IN smtbs_user.user_id%TYPE,
                                     pm_branch          IN oltms_branch.branch_code%TYPE,
                                pm_module          IN oltbs_contract.module_code%TYPE,
                                pm_product         IN oltms_product_master_ld.product%TYPE,
                                pm_proc_date       IN DATE, --reset Value date
                                pm_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE, --NULL For batch
                                pm_process_mode    IN VARCHAR2, --B-Batch / O -Online
                                pm_err_code        IN OUT ertbs_msgs.err_code%TYPE,
                                pm_params          IN OUT VARCHAR2) RETURN BOOLEAN;
--Bug#36589478_multi_threading_Hooks ends
END olpks_irrn_cluster;
/
CREATE OR REPLACE SYNONYM OLPKSS_IRRN_CLUSTER FOR OLPKS_IRRN_CLUSTER
/