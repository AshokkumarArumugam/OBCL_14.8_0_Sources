CREATE OR REPLACE PACKAGE txpks_new_cluster AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: txpks_new_cluster.SPC
**
** Module		: Oracle Lending
**
	This source is part of the Oracle Flexcube Corporate Lending  Software Product.
	Copyright © 2022 , Oracle and/or its affiliates.  All rights reserved.
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East),
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
/*------------------------------------------------------------------------------------------------
  Change History
  
  **Changed By         : Kavitha Asokan
  **Date               : 09-AUG-2022
  **Change Description : Rabo bank requires that during renegotiation of an existing loan, the loan will be liquidated and a new loan will be created. 
                         However, the IOF tax applicable for the newly created loan should be available as a user input value. 
						 The IOF tax amount will be calculated by the bank externally and input in FLEXCUBE for processing.
  **Search String      : Bug#34477145
  -------------------------------------------------------------------------------------------------------------------------------------------------
 */


function fn_pre_compute_tax_amount(p_contract_ref_no IN txtbs_txnrule.contract_ref_no%TYPE,
                      p_event_seq_no    IN txtbs_txnrule_detail.event_seq_no%TYPE,
                      p_rule_record IN txtms_rule%ROWTYPE,
                      p_deal_ccy    IN txtbs_txnrule_detail.currency%TYPE,
                      p_tag_ccy     IN txtbs_txnrule_detail.currency%TYPE,
                      p_tag_amount  IN txtbs_txnrule_detail.amount%TYPE,
                      p_liq_amount  IN txtbs_txnrule_detail.amount%TYPE,
                      p_tax_rate    IN OUT txtms_slab.rate%TYPE,
                      p_tax_ccy     IN OUT txtbs_txnrule_detail.currency%TYPE,
                      p_tax_amount  IN OUT txtbs_txnrule_detail.amount%TYPE,
                      p_error_code  IN OUT ertbs_msgs.err_code%TYPE,
                      p_customer    IN VARCHAR2,
                      p_country     IN VARCHAR2,
                      p_cont_val_dt IN DATE,
                      p_value_date  IN DATE
                                 )
RETURN BOOLEAN;

function fn_post_compute_tax_amount(p_contract_ref_no IN txtbs_txnrule.contract_ref_no%TYPE,
                      p_event_seq_no    IN txtbs_txnrule_detail.event_seq_no%TYPE,
                      p_rule_record IN txtms_rule%ROWTYPE,
                      p_deal_ccy    IN txtbs_txnrule_detail.currency%TYPE,
                      p_tag_ccy     IN txtbs_txnrule_detail.currency%TYPE,
                      p_tag_amount  IN txtbs_txnrule_detail.amount%TYPE,
                      p_liq_amount  IN txtbs_txnrule_detail.amount%TYPE,
                      p_tax_rate    IN OUT txtms_slab.rate%TYPE,
                      p_tax_ccy     IN OUT txtbs_txnrule_detail.currency%TYPE,
                      p_tax_amount  IN OUT txtbs_txnrule_detail.amount%TYPE,
                      p_error_code  IN OUT ertbs_msgs.err_code%TYPE,
                      p_customer    IN VARCHAR2,
                      p_country     IN VARCHAR2,
                      p_cont_val_dt IN DATE,
                      p_value_date  IN DATE
                                 )
RETURN BOOLEAN;
--Bug#34477145 changes starts
FUNCTION Fn_Pre_Compute_Iof_Amount(p_Contract_Ref_No IN Txtbs_Txnrule.Contract_Ref_No%TYPE,
                                 p_Event_Seq_No    IN Txtbs_Txnrule_Detail.Event_Seq_No%TYPE,
                                 p_Rule_Record     IN Txtms_Rule%ROWTYPE,
                                 p_Deal_Ccy        IN Txtbs_Txnrule_Detail.Currency%TYPE,
                                 p_Tag_Ccy         IN Txtbs_Txnrule_Detail.Currency%TYPE,
                                 p_Tag_Amount      IN Txtbs_Txnrule_Detail.Amount%TYPE,
                                 p_Liq_Amount      IN Txtbs_Txnrule_Detail.Amount%TYPE,
                                 p_Tax_Rate        IN OUT Txtms_Slab.Rate%TYPE,
                                 p_Tax_Ccy         IN OUT Txtbs_Txnrule_Detail.Currency%TYPE,
                                 p_Tax_Amount      IN OUT Txtbs_Txnrule_Detail.Amount%TYPE,
                                 p_Error_Code      IN OUT Ertbs_Msgs.Err_Code%TYPE,
                                 p_Customer        IN VARCHAR2,
                                 p_Country         IN VARCHAR2,
                                 p_Cont_Val_Dt     IN DATE,
                                 p_Value_Date      IN DATE) 
RETURN BOOLEAN;

FUNCTION Fn_Post_Compute_Iof_Amount(p_Contract_Ref_No IN Txtbs_Txnrule.Contract_Ref_No%TYPE,
                                 p_Event_Seq_No    IN Txtbs_Txnrule_Detail.Event_Seq_No%TYPE,
                                 p_Rule_Record     IN Txtms_Rule%ROWTYPE,
                                 p_Deal_Ccy        IN Txtbs_Txnrule_Detail.Currency%TYPE,
                                 p_Tag_Ccy         IN Txtbs_Txnrule_Detail.Currency%TYPE,
                                 p_Tag_Amount      IN Txtbs_Txnrule_Detail.Amount%TYPE,
                                 p_Liq_Amount      IN Txtbs_Txnrule_Detail.Amount%TYPE,
                                 p_Tax_Rate        IN OUT Txtms_Slab.Rate%TYPE,
                                 p_Tax_Ccy         IN OUT Txtbs_Txnrule_Detail.Currency%TYPE,
                                 p_Tax_Amount      IN OUT Txtbs_Txnrule_Detail.Amount%TYPE,
                                 p_Error_Code      IN OUT Ertbs_Msgs.Err_Code%TYPE,
                                 p_Customer        IN VARCHAR2,
                                 p_Country         IN VARCHAR2,
                                 p_Cont_Val_Dt     IN DATE,
                                 p_Value_Date      IN DATE) 
RETURN BOOLEAN;

FUNCTION fn_pre_compute_IOF_for_due_sch(p_contract_ref_no IN  txtbs_txnrule.contract_ref_no%TYPE,
                                        p_event_seq_no    IN  txtbs_txnrule_detail.event_seq_no%TYPE,
                                        p_rule_record     IN  txtms_rule%ROWTYPE,
                                        p_product_record  IN  oltm_product_master_ld%ROWTYPE,
                                        p_interst_basis   IN  txtbs_txnrule.interest_basis%TYPE,
                                        p_curr_event_code IN  oltbs_contract.curr_event_code%TYPE,
                                        p_slab_record     IN  txtms_slab%ROWTYPE,
                                        p_iof_rate        IN  txtms_slab.rate%TYPE,
                                        p_iof_add_rate    IN  txtms_rule.iof_add_rate%TYPE,
                                        p_iof_max_rate    IN  txtms_rule.iof_max_rate%TYPE,
                                        p_value_date      IN  DATE,
                                        p_iof_daily_rate  IN OUT txtms_slab.rate%TYPE,
                                        p_new_iof_tax_amt IN OUT txtbs_txnrule_detail.amount%TYPE,
                                        p_error_code      IN OUT ertbs_msgs.err_code%TYPE)
RETURN BOOLEAN;

FUNCTION fn_post_compute_IOF_for_due_sch(p_contract_ref_no IN  txtbs_txnrule.contract_ref_no%TYPE,
                                         p_event_seq_no    IN  txtbs_txnrule_detail.event_seq_no%TYPE,
                                         p_rule_record     IN  txtms_rule%ROWTYPE,
                                         p_product_record  IN  oltm_product_master_ld%ROWTYPE,
                                         p_interst_basis   IN  txtbs_txnrule.interest_basis%TYPE,
                                         p_curr_event_code IN  oltbs_contract.curr_event_code%TYPE,
                                         p_slab_record     IN  txtms_slab%ROWTYPE,
                                         p_iof_rate        IN  txtms_slab.rate%TYPE,
                                         p_iof_add_rate    IN  txtms_rule.iof_add_rate%TYPE,
                                         p_iof_max_rate    IN  txtms_rule.iof_max_rate%TYPE,
                                         p_value_date      IN  DATE,
                                         p_iof_daily_rate  IN OUT txtms_slab.rate%TYPE,
                                         p_new_iof_tax_amt IN OUT txtbs_txnrule_detail.amount%TYPE,
                                         p_error_code      IN OUT ertbs_msgs.err_code%TYPE)
RETURN BOOLEAN;
--Bug#34477145 changes ends


END txpks_new_cluster;

/
CREATE or replace SYNONYM txpkss_new_cluster FOR  txpks_new_cluster
/