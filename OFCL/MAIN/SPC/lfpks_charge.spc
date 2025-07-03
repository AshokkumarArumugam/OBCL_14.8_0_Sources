CREATE OR REPLACE PACKAGE lfpks_charge
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : lfpks_charge.SPC
**
** Module       : INTEREST, COMMISSION, CHARGES, FEES (ICCF)
**
This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
/*
CHANGE_HISTORY

LC CHARGE CLASS RELATED MODIFICATIONS -- PROJECT CODE FC33TF
1/12/99 3.3 Apllication referal should done only for those waive not set
    And exceptions and debugs added

XP SETTLEMENTS PICKUP FOR CHARGES -- PROJECT CODE XP DEVELOPMENT REL 3.3
20/01/2000 3.3 fn_pickup_charge_rule is being used by xpsubsys.sql to pick SETTLEMENTS
       details for charges

30-JUN-2003 FCC 4.3 DEV AUG 2003 STG Changes
      1.Added repair_charge to g_association_struct
      2.Overloading fn_pickup_charge_rule with p_pickup_account
      3.Overloading fn_associate_for_a_event with parameters p_module,p_customer,p_chg_pickup_branch,
        p_chg_pickup_account,p_txn_branch and p_txn_account.
      4.Overloading fn_association_referral and fn_apply_for_a_event with p_txn_account
      5.New function fn_liquidate_deferred_charge added.
      6.New functions fn_get_account_details and fn_derive_charge_rule
      
18-NOV-2004 FCC 4.6.1 DEC 2004 EIM Enhancements changes
    Added new function overloaded fn_liquidate_for_a_event to populate charge component in oltb_amount_due table.
- FCC 4.6.1 JAN 2005 ITR-1 SFR-196 For changing copyright clause / release name
06-Jun-2016 OFCL standalone changes, commented not required code. Search string--- OFCL12.2 Not required
CHANGE_HISTORY
*/
  /*
  **Changed By         : Aishwarya
  **Date               : 13-Apr-2021
  **Change Description : Relationship Pricing - Integration with UBS to get the RP rate
  **Search String      : OBCL_14.5_RP_Integration_Changes
  
  **Changed By         : Abhik Das
  **Date               : 25-Aug-2021
  **Change Description : 1. To show updated charge amount for INIT event
                         2. To show updated charge amount if we change charge amount
                            while doing VAMI
  **Search String      : OBCL_14.5_Support_Bug#33191052_Changes
  
  **  Modified By     : Vineeth T M
  **  Modified On     : 21-Apr-2023
  **  Modified Reason : Enable ECA for charge
  **  Search String   : OBCL_14.8_ECA_Changes

  **Changed By         : Mohan Pal/Navoneel Nandan
  **Date               : 18-Jul-2023
  **Change Description : FWDPORT of Bug#34818977 Changes done for Non STANDARD Currency Exchange Rates
  **Search String      : Bug#35572733
/*---------------------------------------------------------------------------*/
-------OBCL_14.5_Support_Bug#33191052_Changes Starts-------
g_action_code      VARCHAR2(30);
g_VAMI_amount      NUMBER:=0;
g_VAMI_component   VARCHAR2(30);
g_DSBR_amount      oltbs_contract_dsbr_sch.Amount%TYPE;
g_DSBR_charge_amount lftbs_charge_appln.charge_amount%TYPE;
g_DSBR_mode          oltbs_contract_dsbr_sch.disbursement_mode%TYPE;
--------OBCL_14.5_Support_Bug#33191052_Changes Ends--------
g_charge_eca_simulate varchar2(1) := 'N';--OBCL_14.8_ECA_Changes
TYPE g_product_struct IS RECORD
  (
  component       lftms_product_charge.component%TYPE,
  charge_type       lftms_product_charge.charge_type%TYPE,
  third_party_type    lftms_product_charge.third_party_type%TYPE,
  debit_or_credit_type  lftms_product_charge.debit_or_credit_type%TYPE,
  net_cons_indicator    lftms_product_charge.net_cons_indicator%TYPE,
  net_cons_plus_or_minus  lftms_product_charge.net_cons_plus_or_minus%TYPE,
  swift_qualifier     lftms_product_charge.swift_qualifier%TYPE,
  event_for_association lftms_product_charge.event_for_association%TYPE,
  event_for_application lftms_product_charge.event_for_application%TYPE,
  event_for_liquidation lftms_product_charge.event_for_liquidation%TYPE,
  basis_amount_tag    lftms_product_charge.basis_amount_tag%TYPE,
  default_rule      lftms_product_charge.default_rule%TYPE,
  settlement_ccy      lftms_product_charge.settlement_ccy%TYPE,
  default_waiver      lftms_product_charge.default_waiver%TYPE,
  allow_rule_amendment  lftms_product_charge.allow_rule_amendment%TYPE,
  amend_after_association lftms_product_charge.amend_after_association%TYPE,
  allow_amount_amendment  lftms_product_charge.allow_amount_amendment%TYPE,
  amend_after_application lftms_product_charge.amend_after_application%TYPE,
  stop_association    lftms_product_charge.stop_association%TYPE
  );

TYPE g_product_table_struct IS TABLE OF g_product_struct
                            INDEX BY BINARY_INTEGER;

TYPE g_association_struct IS RECORD
  (
  event_seq_no      lftbs_charge_assoc.event_seq_no%TYPE,
  component       lftbs_charge_assoc.component%TYPE,
  creation_esn      lftbs_charge_assoc.creation_esn%TYPE,
  event         lftbs_charge_assoc.event%TYPE,
  transaction_date    date,
  value_date        date,
  product         lftbs_charge_assoc.product%TYPE,
  charge_type       lftms_product_charge.charge_type%TYPE,
  third_party_type    lftms_product_charge.third_party_type%TYPE,
  debit_or_credit_type  lftms_product_charge.debit_or_credit_type%TYPE,
  net_cons_indicator    lftms_product_charge.net_cons_indicator%TYPE,
  net_cons_plus_or_minus  lftms_product_charge.net_cons_plus_or_minus%TYPE,
  swift_qualifier     lftms_product_charge.swift_qualifier%TYPE,
  event_for_association lftms_product_charge.event_for_association%TYPE,
  event_for_application lftms_product_charge.event_for_application%TYPE,
  event_for_liquidation lftms_product_charge.event_for_liquidation%TYPE,
  basis_amount_tag    lftms_product_charge.basis_amount_tag%TYPE,
  settlement_ccy      lftms_product_charge.settlement_ccy%TYPE,
  rule          lftbs_charge_assoc.rule%TYPE,
  charge_ccy        lftms_rule.flat_amount_currency%TYPE,
  waiver          lftbs_charge_assoc.waiver%TYPE,
  allow_rule_amendment  lftbs_charge_assoc.allow_rule_amendment%TYPE,
  amend_after_association lftbs_charge_assoc.amend_after_association%TYPE,
  repair_charge     lftms_product_charge.repair_charge%TYPE--30-JUN-2003 FCC 4.3 DEV AUG 2003 STG Changes
  );

TYPE g_association_table_struct IS TABLE OF g_association_struct
                            INDEX BY BINARY_INTEGER;

TYPE g_application_struct IS RECORD
  (
  event_seq_no      lftbs_charge_appln.event_seq_no%TYPE,
  component       lftbs_charge_appln.component%TYPE,
  creation_esn      lftbs_charge_appln.creation_esn%TYPE,
  event         lftbs_charge_appln.event%TYPE,
  transaction_date    date,
  value_date        date,
  association_contract_ref_no
              lftbs_charge_appln.association_contract_ref_no%TYPE,
  association_event_seq_no
              lftbs_charge_appln.association_event_seq_no%TYPE,
  association_product   lftbs_charge_appln.association_product%TYPE,
  charge_type       lftms_product_charge.charge_type%TYPE,
  third_party_type    lftms_product_charge.third_party_type%TYPE,
  debit_or_credit_type  lftms_product_charge.debit_or_credit_type%TYPE,
  net_cons_indicator    lftms_product_charge.net_cons_indicator%TYPE,
  net_cons_plus_or_minus  lftms_product_charge.net_cons_plus_or_minus%TYPE,
  swift_qualifier     lftms_product_charge.swift_qualifier%TYPE,
  event_for_association lftms_product_charge.event_for_association%TYPE,
  event_for_application lftms_product_charge.event_for_application%TYPE,
  event_for_liquidation lftms_product_charge.event_for_liquidation%TYPE,
  basis_amount_tag    lftms_product_charge.basis_amount_tag%TYPE,
  settlement_ccy      lftms_product_charge.settlement_ccy%TYPE,
  counterparty      lftbs_charge_appln.counterparty%TYPE,
  charge_party_cif_id   lftbs_charge_appln.charge_party_cif_id%TYPE,
  rule          lftbs_charge_appln.rule%TYPE,
  rule_ccy_1        lftbs_charge_appln.rule_ccy_1%TYPE,
  rule_ccy_2        lftbs_charge_appln.rule_ccy_2%TYPE,
  rule_cif_id       lftbs_charge_appln.rule_cif_id%TYPE,
  tag_ccy         lftbs_charge_appln.tag_ccy%TYPE,
  tag_amount        lftbs_charge_appln.tag_amount%TYPE,
  rate_of_flat      lftbs_charge_appln.rate_or_flat%TYPE,
  charge_rate       lftbs_charge_appln.charge_rate%TYPE,
  charge_ccy        lftbs_charge_appln.charge_ccy%TYPE,
  computed_charge_amount  lftbs_charge_appln.computed_charge_amount%TYPE,
  charge_amount     lftbs_charge_appln.charge_amount%TYPE,
  waiver          lftbs_charge_appln.waiver%TYPE,
  liquidation_indicator lftbs_charge_appln.liquidation_indicator%TYPE,
  allow_amount_amendment  lftbs_charge_appln.allow_amount_amendment%TYPE
  );

TYPE g_application_table_struct IS TABLE OF g_application_struct
                            INDEX BY BINARY_INTEGER;

/*---------------------------------------------------------------------------*/

FUNCTION fn_associate_for_a_event
  (
  p_contract_ref_no   IN    oltbs_contract.contract_ref_no%TYPE,
  p_event_seq_no      IN    oltbs_contract.latest_event_seq_no%TYPE,
  p_event         IN    oltbs_contract.curr_event_code%TYPE,
  p_amendment_event   IN    boolean,
  p_value_date      IN    date,
  p_product       IN    oltbs_contract.product_code%TYPE,
  p_error_code      IN OUT  varchar2,
  p_error_parameter   IN OUT  varchar2
  )
  RETURN boolean;

FUNCTION fn_apply_for_a_event
  (
  p_contract_ref_no   IN    oltbs_contract.contract_ref_no%TYPE,
  p_event_seq_no      IN    oltbs_contract.latest_event_seq_no%TYPE,
  p_event         IN    oltbs_contract.curr_event_code%TYPE,
  p_amendment_event   IN    boolean,
  p_value_date      IN    date,
  p_deal_ccy        IN    oltbs_contract.contract_ccy%TYPE,
  p_counterparty      IN    oltbs_contract.counterparty%TYPE,
  p_association_ref_no  IN    oltbs_contract.contract_ref_no%TYPE,
  p_association_product IN    oltbs_contract.product_code%TYPE,
  p_list_of_party_types IN    varchar2,
  p_list_of_partys    IN    varchar2,
  p_list_of_amount_tags IN    varchar2,
  p_list_of_amount_ccys IN    varchar2,
  p_list_of_amounts   IN    varchar2,
  p_error_code      IN OUT  varchar2,
  p_error_parameter   IN OUT  varchar2
  )
  RETURN boolean;

FUNCTION fn_liquidate_for_a_event
  (
  p_contract_ref_no   IN    oltbs_contract.contract_ref_no%TYPE,
  p_event_seq_no      IN    oltbs_contract.latest_event_seq_no%TYPE,
  p_event         IN    oltbs_contract.curr_event_code%TYPE,
  p_value_date      IN    date,
  p_list_of_amount_tags OUT   varchar2,
  p_list_of_amount_ccys OUT   varchar2,
  p_list_of_amounts   OUT   varchar2,
  p_error_code      IN OUT  varchar2,
  p_error_parameter   IN OUT  varchar2
  )
  RETURN boolean;

FUNCTION fn_reverse_for_a_event
  (
  p_contract_ref_no   IN    oltbs_contract.contract_ref_no%TYPE,
  p_current_event_seq_no  IN    oltbs_contract.latest_event_seq_no%TYPE,
  p_reversed_event_seq_no IN    oltbs_contract.latest_event_seq_no%TYPE,
  p_event         IN    oltbs_contract.curr_event_code%TYPE,
  p_value_date      IN    date,
  p_error_code      IN OUT  varchar2,
  p_error_parameter   IN OUT  varchar2
  )
  RETURN boolean;

FUNCTION fn_delete_for_a_event
  (
  p_contract_ref_no   IN    oltbs_contract.contract_ref_no%TYPE,
  p_event_seq_no      IN    oltbs_contract.latest_event_seq_no%TYPE,
  p_error_code      IN OUT  varchar2,
  p_error_parameter   IN OUT  varchar2
  )
  RETURN boolean;

FUNCTION fn_product_referral
  (
  p_product       IN    oltbs_contract.product_code%TYPE,
  p_include_stopped   IN    boolean,
  p_product_table     OUT   g_product_table_struct,
  p_error_code      IN OUT  varchar2,
  p_error_parameter   IN OUT  varchar2
  )
  RETURN boolean;

FUNCTION fn_association_referral
  (
  p_contract_ref_no   IN    oltbs_contract.contract_ref_no%TYPE,
  p_basis_event_seq_no  IN    oltbs_contract.latest_event_seq_no%TYPE,
  p_deal_ccy        IN    oltbs_contract.contract_ccy%TYPE,
  p_counterparty      IN    oltbs_contract.counterparty%TYPE,
  p_list_of_party_types IN    varchar2,
  p_list_of_partys    IN    varchar2,
  p_association_table   OUT   g_association_table_struct,
  p_error_code      IN OUT  varchar2,
  p_error_parameter   IN OUT  varchar2
  )
  RETURN boolean;

FUNCTION fn_application_referral
  (
  p_contract_ref_no   IN    oltbs_contract.contract_ref_no%TYPE,
  p_basis_event_seq_no  IN    oltbs_contract.latest_event_seq_no%TYPE,
  p_include_liquidated  IN    boolean,
  p_application_table   OUT   g_application_table_struct,
  p_error_code      IN OUT  varchar2,
  p_error_parameter   IN OUT  varchar2
  )
  RETURN boolean;

FUNCTION fn_pickup_charge_rule
  (
  p_pickup_rule     IN    lftms_rule.rule%TYPE,
  p_pickup_ccy      IN    oltbs_contract.contract_ccy%TYPE,
  p_pickup_cif_id     IN    oltbs_contract.counterparty%TYPE,
  p_rule_record     OUT   lftms_rule%ROWTYPE,-- oracle 8 changes
  p_error_code      IN OUT  varchar2,
  p_error_parameter   IN OUT  varchar2
  )
  RETURN boolean;
--30-JUN-2003 FCC 4.3 DEV AUG 2003 STG Changes Begin
FUNCTION fn_pickup_charge_rule
  (
  p_pickup_rule     IN    lftms_rule.rule%TYPE,
  p_pickup_ccy      IN    oltbs_contract.contract_ccy%TYPE,
  p_pickup_cif_id     IN    oltbs_contract.counterparty%TYPE,
  --p_pickup_account    IN    sttms_cust_account.cust_ac_no%TYPE, -- OFCL12.2 Not required
  p_pickup_account    IN    oltb_account.ac_gl_no%TYPE,
  p_rule_record     OUT   lftms_rule%ROWTYPE,
  p_error_code      IN OUT  varchar2,
  p_error_parameter   IN OUT  varchar2
  )
RETURN BOOLEAN;

FUNCTION fn_associate_for_a_event
  (
  p_contract_ref_no   IN    oltbs_contract.contract_ref_no%TYPE,
  p_event_seq_no      IN    oltbs_contract.latest_event_seq_no%TYPE,
  p_event         IN    oltbs_contract.curr_event_code%TYPE,
  p_amendment_event   IN    BOOLEAN,
  p_value_date      IN    DATE,
  p_product       IN    oltbs_contract.product_code%TYPE,
  p_module        IN    smtbs_modules.module_id%TYPE,
  p_customer        IN    oltms_customer.customer_no%TYPE,
  p_chg_pickup_branch   IN    oltms_branch.branch_code%TYPE,
  --p_chg_pickup_account  IN    sttms_cust_account.cust_ac_no%TYPE, -- OFCL12.2 Not required
  p_chg_pickup_account  IN    oltb_account.ac_gl_no%TYPE,
  p_txn_branch      IN    oltms_branch.branch_code%TYPE,
  --p_txn_account     IN    sttms_cust_account.cust_ac_no%TYPE,-- OFCL12.2 Not required
  p_txn_account     IN    oltb_account.ac_gl_no%TYPE,
  p_error_code      IN OUT  VARCHAR2,
  p_error_parameter   IN OUT  VARCHAR2
  )
RETURN BOOLEAN;

FUNCTION fn_association_referral
  (
  p_contract_ref_no   IN    oltbs_contract.contract_ref_no%TYPE,
  p_basis_event_seq_no  IN    oltbs_contract.latest_event_seq_no%TYPE,
  p_deal_ccy        IN    oltbs_contract.contract_ccy%TYPE,
  p_counterparty      IN    oltbs_contract.counterparty%TYPE,
  --p_txn_account     IN    sttms_cust_account.cust_ac_no%TYPE, -- OFCL12.2 Not required
   p_txn_account      IN    oltb_account.ac_gl_no%TYPE,
  p_list_of_party_types IN    varchar2,
  p_list_of_partys    IN    varchar2,
  p_association_table   OUT   g_association_table_struct,
  p_error_code      IN OUT  varchar2,
  p_error_parameter   IN OUT  varchar2
  )
RETURN BOOLEAN;

FUNCTION fn_apply_for_a_event
  (
  p_contract_ref_no   IN    oltbs_contract.contract_ref_no%TYPE,
  p_event_seq_no      IN    oltbs_contract.latest_event_seq_no%TYPE,
  p_event         IN    oltbs_contract.curr_event_code%TYPE,
  p_amendment_event   IN    boolean,
  p_value_date      IN    date,
  p_deal_ccy        IN    oltbs_contract.contract_ccy%TYPE,
  p_counterparty      IN    oltbs_contract.counterparty%TYPE,
  --p_txn_account     IN    sttms_cust_account.cust_ac_no%TYPE, -- OFCL12.2 Not required
  p_txn_account     IN    oltb_account.ac_gl_no%TYPE,
  p_association_ref_no  IN    oltbs_contract.contract_ref_no%TYPE,
  p_association_product IN    oltbs_contract.product_code%TYPE,
  p_list_of_party_types IN    varchar2,
  p_list_of_partys    IN    varchar2,
  p_list_of_amount_tags IN    varchar2,
  p_list_of_amount_ccys IN    varchar2,
  p_list_of_amounts   IN    varchar2,
  p_error_code      IN OUT  varchar2,
  p_error_parameter   IN OUT  varchar2
  )
RETURN BOOLEAN;

FUNCTION fn_liquidate_deferred_charge
  (
  p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
  p_event_seq_no    IN oltbs_contract.latest_event_seq_no%TYPE,
  p_event_code    IN oltbs_contract.curr_event_code%TYPE,
  p_value_date    IN oltbs_contract_master.value_date%TYPE,
  p_error_code    IN OUT VARCHAR2,
  p_error_parameter IN OUT VARCHAR2
  )
RETURN BOOLEAN;

FUNCTION fn_derive_charge_rule
  (
  p_module        IN    smtbs_modules.module_id%TYPE,
  p_charge_class      IN    lftms_charge_class.class_code%TYPE,
  p_cust_group      IN    oltms_customer.cust_group%TYPE,
  p_customer        IN    oltms_customer.customer_no%TYPE,
  p_branch        IN    oltms_branch.branch_code%TYPE,
  --p_account       IN    sttms_cust_account.cust_ac_no%TYPE,-- OFCL12.2 Not required
  p_account       IN    oltb_account.ac_gl_no%TYPE,
  p_txn_count       IN    NUMBER,
  p_rule          OUT   lftms_rule.rule%TYPE,
  p_error_code      IN OUT  VARCHAR2,
  p_error_parameter   IN OUT  VARCHAR2
  )
RETURN BOOLEAN;

FUNCTION fn_get_account_details
  (
  p_branch_code   IN    oltms_branch.branch_code%TYPE,
  --p_cust_ac_no    IN    sttms_cust_account.cust_ac_no%TYPE, -- OFCL12.2 Not required
  p_cust_ac_no    IN    oltb_account.ac_gl_no%TYPE,
  p_customer      IN    oltms_customer.customer_no%TYPE,
  p_cust_group    OUT   oltms_cust_group.cust_group%TYPE,
  p_acct_category   OUT   oltms_acc_category.acc_category_code%TYPE,
  p_error_code    IN OUT  VARCHAR2,
  p_error_parameter IN OUT  VARCHAR2
  )
RETURN BOOLEAN;


--30-JUN-2003 FCC 4.3 DEV AUG 2003 STG Changes End
-- FCC 4.3.1 STG Changes 
FUNCTION fn_compute_charge_amount
  (
  p_Contract_Ref_No IN oltbs_contract.contract_ref_no%TYPE,--Bug#35572733
  p_pickup_rule     IN    lftms_rule.rule%TYPE,
  p_pickup_ccy      IN    oltbs_contract.contract_ccy%TYPE,
  p_pickup_cif_id     IN    oltbs_contract.counterparty%TYPE,
  p_tag_ccy       IN    lftbs_charge_appln.tag_ccy%TYPE,
  p_tag_amount      IN    lftbs_charge_appln.tag_amount%TYPE,
  --p_pickup_account    IN    sttms_cust_account.cust_ac_no%TYPE,--30-JUN-2003 FCC 4.3 DEV AUG 2003 STG changes -- OFCL12.2 Not required
  p_pickup_account    IN    oltb_account.ac_gl_no%TYPE,
  p_rule_record     OUT   lftms_rule%ROWTYPE,
  p_charge_rate     IN OUT  lftbs_charge_appln.charge_rate%TYPE, --OBCL_14.5_RP_Integration_Changes
  p_charge_ccy      OUT   lftbs_charge_appln.charge_ccy%TYPE,
  p_charge_amount     IN OUT  lftbs_charge_appln.charge_amount%TYPE, --OBCL_14.5_RP_Integration_Changes
  p_error_code      IN OUT  varchar2,
  p_error_parameter   IN OUT  varchar2
  )
RETURN BOOLEAN;

-- FCC 4.3.1 STG Changes ends
---- FCC 4.6.1 DEC 2004 EIM Enhancements changes starts
--- This OVerloaded Function is added to Handle EIM Changes
FUNCTION fn_liquidate_for_a_event
  (
  p_contract_ref_no       IN    oltbs_contract.contract_ref_no%TYPE,
  p_event_seq_no        IN    oltbs_contract.latest_event_seq_no%TYPE,
  p_event         IN    oltbs_contract.curr_event_code%TYPE,
  p_value_date        IN    date,
  p_list_of_amount_tags     OUT   varchar2,
  p_list_of_amount_ccys     OUT   varchar2,
  p_list_of_amounts       OUT   varchar2,
  p_process_type        IN    VARCHAR2, --- Will Be A or M
  p_list_of_cnt_ccy       IN OUT  VARCHAR2, --  Contract currency
  p_list_of_chg_amt_in_cnt_ccy    IN OUT  VARCHAR2,   --  Charge amount in contract ccy
  p_error_code        IN OUT  varchar2,
  p_error_parameter       IN OUT  varchar2,
  p_charge_eca_validate IN varchar2 DEFAULT 'N')--OBCL_14.8_ECA_Changes
RETURN BOOLEAN;
---- FCC 4.6.1 DEC 2004 EIM Enhancements changes ends
/*---------------------------------------------------------------------------*/

END lfpks_charge;
/
CREATE or replace SYNONYM lfpkss_charge FOR lfpks_charge
/