CREATE OR REPLACE force VIEW olvw_dw_canada_orignation
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_dw_canada_orignation.vw
**
** Module	: INTERFACE
**
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
  ----------------------------------------------------------------------------------------
17-SEP-2012  CITIUS#14871 Changes related to DTAX , Genesis and Lereta
*/
SELECT	
			b.contract_ref_no contract_ref_no
			,NVL(b.external_ref_no,b.custom_ref_no) trn_id
			,b.product_code product_code
			,b.product_type product_type
			,b.module_code module_code  
			,b.user_defined_status user_defined_status              
			,b.fund_ref_no
			,b.serial_no                      
			,b.latest_event_seq_no            
			,b.user_ref_no                    
			,b.latest_version_no                             
			,b.contract_status                
			,b.auth_status                    
			,b.template_status             
			,b.curr_event_code                
			,b.contract_ccy                   
			,b.latest_event_date              		
			,b.auto_manual_flag               				
			,b.supress_bv_payment_msg         
			,b.supress_bv_payment_msg1        
			,b.liability_cif                  
			,b.eca_status                     
			,b.response_stat                  
			,b.latest_reprogram_counter_no    
			,b.treasury_source                
			,b.rate_revision_status           
			,b.workflow_status                
			,b.delinquency_status             
			,b.common_ref_no                  
			,b.overall_conf_stat              
			,b.conf_pmt_link_stat             
			,b.unconfirmed_since              
			,b.evaluation_date                
			,b.swift_ref_no                   
			,b.related_ref_no                 
			,b.allow_online_confirm           
			,b.net_across_drawdown            
			,b.external_ref_no
			,b.custom_ref_no
			,b.department_code		
			,b.book_date
			,DECODE(
				b.product_type
				,'D',
				NVL(
					(
					SELECT counterparty
					FROM oltbs_contract
					WHERE contract_ref_no =
									(
									SELECT linked_to_ref
									FROM oltbs_contract_inf_linkages
									WHERE contract_ref_no = b.contract_ref_no
									AND rownum = 1
									)
					)
					,a.counterparty
				   )
				,a.counterparty
				) counterparty
			, a.branch  branch
			, a.value_date  value_date
			, a.maturity_date maturity_date	
			, (NVL(a.contra_gl_bal,0) * -1 ) contra_gl
			, a.currency currency 
			, a.main_comp component	
			, a.cusip_no cusip_no
			, a.agency_contract agency_contract
			, a.contractual_effective_date contractual_effective_date
			, a.booking_date booking_date
			, a.version_no                             
			, a.event_seq_no                           
			, a.payment_method                         
			, a.rollover_allowed                                                     
			, a.amount                                 
			, a.lcy_amount                             
			, a.original_start_date                    
			, a.uncovered_amount                       
			, a.cluster_id                             
			, a.notice_date                            
			, a.cluster_size                           
			, a.dealer                                                              
			, a.maturity_type                                                     
			, a.notice_days                            
			, a.remarks                                                               
			, a.dflt_settle_ac                         
			, a.dflt_settle_ac_branch                  
			, a.iccf_status                            
			, a.settlement_status                      
			, a.tax_status                             
			, a.brokerage_status                       
			, a.rel_reference                          
			, a.tenor                                  
			, a.credit_line                            
			, a.broker_code                            
			, a.tax_scheme                             
			, a.rollover_count                                                                       
			, a.broker_confirm_status                  
			, a.cparty_confirm_status                  
			, a.original_face_value                    
			, a.job_picked_up                          
			, a.main_comp_rate                         
			, a.main_comp_spread                       
			, a.main_comp_rate_code                    
			, a.main_comp_amount                       
			, a.lcy_eqvt_for_index_loans               
			, a.base_index_rate                        
			, a.loan_stmt_type                         
			, a.loan_stmt_cycle                        
			, a.statement_day                          
			, a.advice_printed                         
			, a.op_scope                               
			, a.ins_party_name                         
			, a.ins_party_bic                          
			, a.ins_party_acct                         
			, a.ins_party_addr1                        
			, a.ins_party_addr2                        
			, a.ins_party_city                         
			, a.ins_party_clrg_code                    
			, a.ben_party_name                         
			, a.ben_party_bic                          
			, a.ben_party_acct                         
			, a.ben_party_addr1                        
			, a.ben_party_addr2                        
			, a.ben_party_city                         
			, a.ben_party_clrg_code                    
			, a.ins_party_fedwire                      
			, a.ins_party_chipuid                      
			, a.ins_party_chapsc                       
			, a.ben_party_fedwire                      
			, a.ben_party_chipuid                      
			, a.ben_party_chapsc                       
			, a.no_of_tracers                          
			, a.tracer_required                        
			, a.dealing_method                         
			, a.charge_status                          
			, a.syndication_ref_no                     
			, a.drawdown_no                            
			, a.dflt_settle_ccy                        
			, a.dr_setl_ac                             
			, a.dr_setl_ac_br                          
			, a.dr_setl_ccy                            
			, a.tranche_ref_no                         
			, a.cust_margin                            
			, a.source_code                            
			, a.liability_no                           
			, a.tep                                    
			, a.tea                                    
			, a.teac                                   
			, a.reprogram_counter_no                   
			, a.reprogram_flag                         
			, a.last_available_date                    
			, a.apply_facility_hol_ccy                 
			, a.apply_contract_hol_ccy                 
			, a.apply_local_hol_ccy                    
			, a.cascade_participation                  
			, a.settlement_seq_no                      
			, a.admin_id                               
			, a.rollover_mechanism                     
			, a.rollover_method                        
			, a.billing_notice_days                    		
			, a.deal_date                              
			, a.funding_method                         
			, a.offset_no                              
			, a.prepayment_penalty_amount              
			, a.wht_tracking_reqd                      
			, a.parent_contract_ref_no                 
			, a.rollover_indicator                     
			, a.ext_broker_code                        
			, a.limit_track_reqd                       
			, a.deal_type                              
			, a.borrower_leg                           
			, a.main_comp_rate_sign                    
			, a.trade_date                             
			, a.suppress_confirmation                  
			, a.wht_ccy                                
			, a.annual_eff_rate                        
			, a.waive_confirmation                     
			, a.cr_agreement_amend                     
			, a.cr_agreement_date                      
			, a.previous_tracer_date                                              
			, a.agent_cif                              
			, a.facility_name                          
			, a.rolling_loan                                         
			, a.contractual_maturity_date              
			, a.contract_repriced                                                      
			, a.primary_syndication                    
			, a.purpose_of_syndication                 
			, a.schedule_definition                    
			, a.max_drawdown_amount                    
			, a.user_input_maturity_date               
			, a.no_of_drawdowns_allowed                
			, a.no_of_active_drawdowns                 
			, a.min_drawdown_amount                    
			, a.drawdown_expiry                        
			, a.swing_line                             
			, a.lc_drawdown                            
			, a.lc_type                                
			, a.part_vdbal_stdt_on_conv                
			, a.conversion_ref_no                      
			, a.conversion_esn                         
			, a.tax_domicile                           
			, a.sic_code                               
			, a.agency_id                              
			, a.lc_issuer                              
			, a.lc_sublimit_amt                                                 
			, a.agency_type                            
			, a.ancillary                              
			, a.collateral_account                     
			, a.handoff_status                         
			, a.internal_gl                            
			, a.loa_conversion_date                    
			, a.pik_amount                             
			, a.special_amount                         
			, a.tranche_feeamt                         
			, a.tranche_feeccy                         
			, a.auto_extension                         
			, a.exclude_unutil_fee                     
			, a.fronting_share                         
			, a.sighting_funds_applicable              
			, a.external_cusip_no   
			, a.reamort_date
			, a.master_funding_refno
			, a.pool_funding_refno                
			,(
				SELECT lc_drawdown 
				FROM   oltms_product_master_ld
				WHERE  product = b.product_code
				AND    rownum  = 1
			) lc_contract
			,(NVL(c.principal_outstanding_bal,0) - NVL(c.lc_balance_amt,0)) principal_outstanding_bal
			,principal_outstanding_bal os_principal_bal
			,(NVL(c.reserve_amt,0) * -1) reserve_amt	
			,NVL(c.lc_balance_amt,0) lc_balance_amt		
			,c.current_face_value             
			,c.total_projected_interest       
			,c.recovery_amt                   
			,c.writeoff_amt                   
			,c.decreasedreserve_amt           		
			,c.gaap_front_rsk                 
			,c.hfs_balance_amt                
			,'A' record_type
		FROM
			OLTB_CONTRACT_BALANCE c,	
			OLTB_CONTRACT_MASTER a ,
			OLTB_CONTRACT b
		WHERE	c.contract_ref_no 		= b.contract_ref_no	
		AND		b.contract_ref_no 		= a.contract_ref_no 
		AND		b.latest_version_no		= a.version_no	
		AND	a.module ='OL'
		AND NOT EXISTS
				(
					select 1 from OLTM_PRODUCT_MASTER_LD
					where product = a.product
					and  lc_drawdown = 'Y'
				)
		AND	b.contract_status NOT IN('H','Y')
		AND	b.product_type in ('L','D','C')
		AND 	NOT EXISTS (
					SELECT 1
					FROM oltbs_contract
					WHERE contract_ref_no = a.contract_ref_no
					AND curr_event_code ='REVC'
					AND book_date =global.application_date
				)
		AND
		(
			(
				SELECT NVL(principal_outstanding_bal,0)
				FROM	oltbs_contract_balance
				WHERE	contract_ref_no = b.contract_ref_no
			) > 0
			OR
			(
				SELECT	SUM(NVL(amount_due,0) - NVL(amount_settled,0) - NVL(adjusted_amount,0))
				FROM	oltbs_amount_due_cs
				WHERE	contract_ref_no = b.contract_ref_no
				AND	component <> 'PRINCIPAL'
			) > 0
			OR
			(
				SELECT	SUM(NVL(total_amount_liquidated,0)-NVL(till_date_accrual,0))
				FROM	LFTB_ACCR_FEE_MASTER
				WHERE 	contract_ref_no = b.contract_ref_no
			) > 0
			OR
			(
				SELECT COUNT(1)
				FROM   OLTB_CONTRACT_MTD_YTD_BAL
				WHERE  contract_ref_no = b.contract_ref_no
				AND    month = to_char(global.application_date,'MON')
				AND    year  = to_char(global.application_date,'YYYY')
				AND    (abs(mtd_bal) > 0 OR abs(mtd_bal_fcy) > 0 )
			) > 0
		)
/
CREATE OR REPLACE SYNONYM olvws_dw_canada_orignation
FOR olvw_dw_canada_orignation
/