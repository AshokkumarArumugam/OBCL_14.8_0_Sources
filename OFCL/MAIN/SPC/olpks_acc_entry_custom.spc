create or replace package olpks_acc_entry_custom is
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_acc_entry_custom.spc
  **
  ** Module   : OL
  **
    This source is part of the Oracle Flexcube Corporate Lending  Software Product.
    Copyright © 2016 , Oracle and/or its affiliates.  All rights reserved.
    No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.
  
    Oracle Financial Services Software Limited.
    Oracle Park, Off Western Express Highway,
    Goregaon (East),
    Mumbai - 400 063, India.
  ----------------------------------------------------------------------------------------------------
  */

  FUNCTION fn_pre_acc_entry (
    p_contract_ref_no        IN       oltbs_contract.contract_ref_no%TYPE
   ,p_current_event_seq_no   IN       oltbs_contract.latest_event_seq_no%TYPE
   ,p_event_code             IN       oltbs_contract.curr_event_code%TYPE
   ,p_contract_maturity      IN       BOOLEAN
   ,p_handoff_action_code    IN       CHAR
   ,p_value_date             IN       DATE
   ,p_list_of_amount_tags    IN       VARCHAR2
   ,p_list_of_amounts        IN       VARCHAR2
   ,p_list_of_amount_ccys    IN       VARCHAR2
   ,p_transaction_code       IN       oltbs_handoff.trn_code%TYPE
   ,p_acc_lookup             IN       olpkss_accounting.tbl_lookup
   ,p_handoff                IN OUT   olpkss_accounting.tbl_achoff
   ,p_passentry              IN       BOOLEAN
   ,p_error_code             IN OUT   VARCHAR2
   ,p_error_parameter        IN OUT   VARCHAR2
)
    RETURN BOOLEAN;
  FUNCTION fn_post_acc_entry (
    p_contract_ref_no        IN       oltbs_contract.contract_ref_no%TYPE
   ,p_current_event_seq_no   IN       oltbs_contract.latest_event_seq_no%TYPE
   ,p_event_code             IN       oltbs_contract.curr_event_code%TYPE
   ,p_contract_maturity      IN       BOOLEAN
   ,p_handoff_action_code    IN       CHAR
   ,p_value_date             IN       DATE
   ,p_list_of_amount_tags    IN       VARCHAR2
   ,p_list_of_amounts        IN       VARCHAR2
   ,p_list_of_amount_ccys    IN       VARCHAR2
   ,p_transaction_code       IN       oltbs_handoff.trn_code%TYPE
   ,p_acc_lookup             IN       olpkss_accounting.tbl_lookup
   ,p_handoff                IN OUT   olpkss_accounting.tbl_achoff
   ,p_passentry              IN       BOOLEAN
   ,p_error_code             IN OUT   VARCHAR2
   ,p_error_parameter        IN OUT   VARCHAR2
)
    RETURN BOOLEAN;
	
	--Start: Bug#30331201
	
	FUNCTION fn_pre_get_settlement_details(
    p_amount_tag                IN       oltms_product_event_acct_entry.amt_tag%TYPE
   ,p_list_of_is_amount_tags    IN       VARCHAR2
   ,p_list_of_is_branches       IN       VARCHAR2
   ,p_list_of_is_accounts       IN       VARCHAR2
   ,p_list_of_is_account_ccys   IN       VARCHAR2
   ,p_list_of_is_exch_rates     IN       VARCHAR2
   ,p_list_of_is_amounts        IN       VARCHAR2
   ,p_list_of_is_instruments    IN       VARCHAR2
   ,p_list_of_is_msg_nettable   IN       VARCHAR2
   ,p_account_branch            IN OUT      oltbs_handoff.ac_branch%TYPE
   ,p_account                   IN OUT      oltbs_handoff.ac_no%TYPE
   ,p_account_ccy               IN OUT      oltbs_handoff.ac_ccy%TYPE
   ,p_settlement_exch_rate      IN OUT      oltbs_handoff.exch_rate%TYPE
   ,p_settlement_amount         IN OUT      oltbs_handoff.fcy_amount%TYPE
   ,p_instrument_code           IN OUT      oltbs_handoff.instrument_code%TYPE
   ,p_msg_nettable              IN OUT      oltbs_settlements.msg_nettable%TYPE
   ,p_error_code                IN OUT   VARCHAR2
   ,p_error_parameter           IN OUT   VARCHAR2) RETURN BOOLEAN; 
	
	FUNCTION fn_post_get_settlement_details(
    p_amount_tag                IN       oltms_product_event_acct_entry.amt_tag%TYPE
   ,p_list_of_is_amount_tags    IN       VARCHAR2
   ,p_list_of_is_branches       IN       VARCHAR2
   ,p_list_of_is_accounts       IN       VARCHAR2
   ,p_list_of_is_account_ccys   IN       VARCHAR2
   ,p_list_of_is_exch_rates     IN       VARCHAR2
   ,p_list_of_is_amounts        IN       VARCHAR2
   ,p_list_of_is_instruments    IN       VARCHAR2
   ,p_list_of_is_msg_nettable   IN       VARCHAR2
   ,p_account_branch            IN OUT      oltbs_handoff.ac_branch%TYPE
   ,p_account                   IN OUT      oltbs_handoff.ac_no%TYPE
   ,p_account_ccy               IN OUT      oltbs_handoff.ac_ccy%TYPE
   ,p_settlement_exch_rate      IN OUT      oltbs_handoff.exch_rate%TYPE
   ,p_settlement_amount         IN OUT      oltbs_handoff.fcy_amount%TYPE
   ,p_instrument_code           IN OUT      oltbs_handoff.instrument_code%TYPE
   ,p_msg_nettable              IN OUT      oltbs_settlements.msg_nettable%TYPE
   ,p_error_code                IN OUT   VARCHAR2
   ,p_error_parameter           IN OUT   VARCHAR2) RETURN BOOLEAN; 
   
	FUNCTION fn_pass_entry (
    p_branch                  IN       oltbs_contract.branch%TYPE
   ,p_module                  IN       oltbs_contract.module_code%TYPE
   ,p_contract_ref_no         IN       oltbs_contract.contract_ref_no%TYPE
   ,p_current_event_seq_no    IN       oltbs_contract.latest_event_seq_no%TYPE
   ,p_event_code              IN       oltbs_contract.curr_event_code%TYPE
   ,p_customer                IN       oltbs_contract.counterparty%TYPE
   ,p_broker                  IN       bktms_brmaster.broker%TYPE
   ,p_handoff_action_code     IN       CHAR
   ,p_value_date              IN       DATE
   ,p_list_of_amount_tags     IN       VARCHAR2
   ,p_list_of_amounts         IN       VARCHAR2
   ,p_list_of_amount_ccys     IN       VARCHAR2
   ,p_list_of_branches        IN       VARCHAR2
   ,p_list_of_accounts        IN       VARCHAR2
   ,p_list_of_instruments     IN       VARCHAR2
   ,p_list_of_sett_ccys       IN       VARCHAR2
   ,p_list_of_sett_rates      IN       VARCHAR2
   ,p_list_of_sett_amounts    IN       VARCHAR2
   ,p_list_of_lcy_rates       IN       VARCHAR2
   ,p_list_of_lcy_equivs      IN       VARCHAR2
   ,p_list_of_related_fcys    IN       VARCHAR2
   ,p_list_of_withhold_inds   IN       VARCHAR2
   ,p_acc_lookup              IN       olpkss_accounting.tbl_lookup
   ,p_transaction_code        IN       oltbs_handoff.trn_code%TYPE
   ,p_list_of_suppress_tags   IN       VARCHAR2
   ,p_list_of_zero_amt_tags   IN       VARCHAR2
   ,p_list_of_msg_nettable    IN       VARCHAR2
   ,   --FCC4.3 AUG 2003 A/c netting changes
    p_listofind               IN       VARCHAR2
   ,   --25-JAN-2002     FCC3.9 LATAM
    p_handoff                 IN OUT   olpkss_accounting.tbl_achoff
   ,   --25-JAN-2002     FCC3.9 LATAM
    p_passentry               IN       BOOLEAN
   ,   --25-JAN-2002     FCC3.9 LATAM
    p_error_code              IN OUT   VARCHAR2
   ,p_error_parameter         IN OUT   VARCHAR2
   ,p_tag_no					IN OUT 	 INTEGER
   ,p_amount_tag				IN OUT 	 oltms_product_event_acct_entry.amt_tag%TYPE
   ,p_tb_custom_data 		  IN OUT 	GLOBAL.TY_TB_CUSTOM_DATA) RETURN BOOLEAN;

--End:Bug#30331201	
	
end olpks_acc_entry_custom;
/
create or replace synonym olpkss_acc_entry_custom for olpks_acc_entry_custom
/