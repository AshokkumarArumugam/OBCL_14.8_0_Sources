CREATE OR REPLACE force VIEW olvw_dw_dealtrax_orignation
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_dw_dealtrax_orignation.vw
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
CHANGE HISTORY
03-JUN-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16600 Changes, New View created for DealTrax
*/
SELECT	
		OLTB_CONTRACT.contract_ref_no contract_ref_no
		,NVL(OLTB_CONTRACT.external_ref_no,OLTB_CONTRACT.custom_ref_no) trn_id
		,OLTB_CONTRACT.product_code product_code
		,OLTB_CONTRACT.product_type product_type
		,OLTB_CONTRACT.module_code module_code  
		,OLTB_CONTRACT.user_defined_status user_defined_status              
		,OLTB_CONTRACT.fund_ref_no
		,OLTB_CONTRACT.serial_no                      
		,OLTB_CONTRACT.latest_event_seq_no            
		,OLTB_CONTRACT.user_ref_no                    
		,OLTB_CONTRACT.latest_version_no                             
		,OLTB_CONTRACT.contract_status                
		,OLTB_CONTRACT.auth_status                    
		,OLTB_CONTRACT.template_status             
		,OLTB_CONTRACT.curr_event_code                
		,OLTB_CONTRACT.contract_ccy                   
		,OLTB_CONTRACT.latest_event_date              		
		,OLTB_CONTRACT.auto_manual_flag               				
		,OLTB_CONTRACT.supress_bv_payment_msg         
		,OLTB_CONTRACT.supress_bv_payment_msg1        
		,OLTB_CONTRACT.liability_cif                  
		,OLTB_CONTRACT.eca_status                     
		,OLTB_CONTRACT.response_stat                  
		,OLTB_CONTRACT.latest_reprogram_counter_no    
		,OLTB_CONTRACT.treasury_source                
		,OLTB_CONTRACT.rate_revision_status           
		,OLTB_CONTRACT.workflow_status                
		,OLTB_CONTRACT.delinquency_status             
		,OLTB_CONTRACT.common_ref_no                  
		,OLTB_CONTRACT.overall_conf_stat              
		,OLTB_CONTRACT.conf_pmt_link_stat             
		,OLTB_CONTRACT.unconfirmed_since              
		,OLTB_CONTRACT.evaluation_date                
		,OLTB_CONTRACT.swift_ref_no                   
		,OLTB_CONTRACT.related_ref_no                 
		,OLTB_CONTRACT.allow_online_confirm           
		,OLTB_CONTRACT.net_across_drawdown            
		,OLTB_CONTRACT.external_ref_no
		,OLTB_CONTRACT.custom_ref_no
		,OLTB_CONTRACT.department_code		
		,OLTB_CONTRACT.book_date
		,DECODE(
			OLTB_CONTRACT.product_type
			,'D',
			NVL(
				(
				SELECT counterparty
				FROM oltbs_contract
				WHERE contract_ref_no =
								(
								SELECT linked_to_ref
								FROM oltbs_contract_inf_linkages
								WHERE contract_ref_no = OLTB_CONTRACT.contract_ref_no
								AND rownum = 1
								)
				)
				,OLTB_CONTRACT_MASTER.counterparty
			   )
			,OLTB_CONTRACT_MASTER.counterparty
			) counterparty
		, OLTB_CONTRACT_MASTER.branch  branch
		, OLTB_CONTRACT_MASTER.value_date  value_date
		, OLTB_CONTRACT_MASTER.maturity_date maturity_date	
		, (NVL(OLTB_CONTRACT_MASTER.contra_gl_bal,0) * -1 ) contra_gl
		, OLTB_CONTRACT_MASTER.currency currency 
		, OLTB_CONTRACT_MASTER.main_comp component	
		, OLTB_CONTRACT_MASTER.cusip_no cusip_no
		, OLTB_CONTRACT_MASTER.agency_contract agency_contract
		, OLTB_CONTRACT_MASTER.contractual_effective_date contractual_effective_date
		, OLTB_CONTRACT_MASTER.booking_date booking_date
		, OLTB_CONTRACT_MASTER.version_no                             
		, OLTB_CONTRACT_MASTER.event_seq_no                           
		, OLTB_CONTRACT_MASTER.payment_method                         
		, OLTB_CONTRACT_MASTER.rollover_allowed                                                     
		, OLTB_CONTRACT_MASTER.amount                                 
		, OLTB_CONTRACT_MASTER.lcy_amount                             
		, OLTB_CONTRACT_MASTER.original_start_date                    
		, OLTB_CONTRACT_MASTER.uncovered_amount                       
		, OLTB_CONTRACT_MASTER.cluster_id                             
		, OLTB_CONTRACT_MASTER.notice_date                            
		, OLTB_CONTRACT_MASTER.cluster_size                           
		, OLTB_CONTRACT_MASTER.dealer                                                              
		, OLTB_CONTRACT_MASTER.maturity_type                                                     
		, OLTB_CONTRACT_MASTER.notice_days                            
		, OLTB_CONTRACT_MASTER.remarks                                                               
		, OLTB_CONTRACT_MASTER.dflt_settle_ac                         
		, OLTB_CONTRACT_MASTER.dflt_settle_ac_branch                  
		, OLTB_CONTRACT_MASTER.iccf_status                            
		, OLTB_CONTRACT_MASTER.settlement_status                      
		, OLTB_CONTRACT_MASTER.tax_status                             
		, OLTB_CONTRACT_MASTER.brokerage_status                       
		, OLTB_CONTRACT_MASTER.rel_reference                          
		, OLTB_CONTRACT_MASTER.tenor                                  
		, OLTB_CONTRACT_MASTER.credit_line                            
		, OLTB_CONTRACT_MASTER.broker_code                            
		, OLTB_CONTRACT_MASTER.tax_scheme                             
		, OLTB_CONTRACT_MASTER.rollover_count                                                                       
		, OLTB_CONTRACT_MASTER.broker_confirm_status                  
		, OLTB_CONTRACT_MASTER.cparty_confirm_status                  
		, OLTB_CONTRACT_MASTER.original_face_value                    
		, OLTB_CONTRACT_MASTER.job_picked_up                          
		, OLTB_CONTRACT_MASTER.main_comp_rate                         
		, OLTB_CONTRACT_MASTER.main_comp_spread                       
		, OLTB_CONTRACT_MASTER.main_comp_rate_code                    
		, OLTB_CONTRACT_MASTER.main_comp_amount                       
		, OLTB_CONTRACT_MASTER.lcy_eqvt_for_index_loans               
		, OLTB_CONTRACT_MASTER.base_index_rate                        
		, OLTB_CONTRACT_MASTER.loan_stmt_type                         
		, OLTB_CONTRACT_MASTER.loan_stmt_cycle                        
		, OLTB_CONTRACT_MASTER.statement_day                          
		, OLTB_CONTRACT_MASTER.advice_printed                         
		, OLTB_CONTRACT_MASTER.op_scope                               
		, OLTB_CONTRACT_MASTER.ins_party_name                         
		, OLTB_CONTRACT_MASTER.ins_party_bic                          
		, OLTB_CONTRACT_MASTER.ins_party_acct                         
		, OLTB_CONTRACT_MASTER.ins_party_addr1                        
		, OLTB_CONTRACT_MASTER.ins_party_addr2                        
		, OLTB_CONTRACT_MASTER.ins_party_city                         
		, OLTB_CONTRACT_MASTER.ins_party_clrg_code                    
		, OLTB_CONTRACT_MASTER.ben_party_name                         
		, OLTB_CONTRACT_MASTER.ben_party_bic                          
		, OLTB_CONTRACT_MASTER.ben_party_acct                         
		, OLTB_CONTRACT_MASTER.ben_party_addr1                        
		, OLTB_CONTRACT_MASTER.ben_party_addr2                        
		, OLTB_CONTRACT_MASTER.ben_party_city                         
		, OLTB_CONTRACT_MASTER.ben_party_clrg_code                    
		, OLTB_CONTRACT_MASTER.ins_party_fedwire                      
		, OLTB_CONTRACT_MASTER.ins_party_chipuid                      
		, OLTB_CONTRACT_MASTER.ins_party_chapsc                       
		, OLTB_CONTRACT_MASTER.ben_party_fedwire                      
		, OLTB_CONTRACT_MASTER.ben_party_chipuid                      
		, OLTB_CONTRACT_MASTER.ben_party_chapsc                       
		, OLTB_CONTRACT_MASTER.no_of_tracers                          
		, OLTB_CONTRACT_MASTER.tracer_required                        
		, OLTB_CONTRACT_MASTER.dealing_method                         
		, OLTB_CONTRACT_MASTER.charge_status                          
		, OLTB_CONTRACT_MASTER.syndication_ref_no                     
		, OLTB_CONTRACT_MASTER.drawdown_no                            
		, OLTB_CONTRACT_MASTER.dflt_settle_ccy                        
		, OLTB_CONTRACT_MASTER.dr_setl_ac                             
		, OLTB_CONTRACT_MASTER.dr_setl_ac_br                          
		, OLTB_CONTRACT_MASTER.dr_setl_ccy                            
		, OLTB_CONTRACT_MASTER.tranche_ref_no                         
		, OLTB_CONTRACT_MASTER.cust_margin                            
		, OLTB_CONTRACT_MASTER.source_code                            
		, OLTB_CONTRACT_MASTER.liability_no                           
		, OLTB_CONTRACT_MASTER.tep                                    
		, OLTB_CONTRACT_MASTER.tea                                    
		, OLTB_CONTRACT_MASTER.teac                                   
		, OLTB_CONTRACT_MASTER.reprogram_counter_no                   
		, OLTB_CONTRACT_MASTER.reprogram_flag                         
		, OLTB_CONTRACT_MASTER.last_available_date                    
		, OLTB_CONTRACT_MASTER.apply_facility_hol_ccy                 
		, OLTB_CONTRACT_MASTER.apply_contract_hol_ccy                 
		, OLTB_CONTRACT_MASTER.apply_local_hol_ccy                    
		, OLTB_CONTRACT_MASTER.cascade_participation                  
		, OLTB_CONTRACT_MASTER.settlement_seq_no                      
		, OLTB_CONTRACT_MASTER.admin_id                               
		, OLTB_CONTRACT_MASTER.rollover_mechanism                     
		, OLTB_CONTRACT_MASTER.rollover_method                        
		, OLTB_CONTRACT_MASTER.billing_notice_days                    		
		, OLTB_CONTRACT_MASTER.deal_date                              
		, OLTB_CONTRACT_MASTER.funding_method                         
		, OLTB_CONTRACT_MASTER.offset_no                              
		, OLTB_CONTRACT_MASTER.prepayment_penalty_amount              
		, OLTB_CONTRACT_MASTER.wht_tracking_reqd                      
		, OLTB_CONTRACT_MASTER.parent_contract_ref_no                 
		, OLTB_CONTRACT_MASTER.rollover_indicator                     
		, OLTB_CONTRACT_MASTER.ext_broker_code                        
		, OLTB_CONTRACT_MASTER.limit_track_reqd                       
		, OLTB_CONTRACT_MASTER.deal_type                              
		, OLTB_CONTRACT_MASTER.borrower_leg                           
		, OLTB_CONTRACT_MASTER.main_comp_rate_sign                    
		, OLTB_CONTRACT_MASTER.trade_date                             
		, OLTB_CONTRACT_MASTER.suppress_confirmation                  
		, OLTB_CONTRACT_MASTER.wht_ccy                                
		, OLTB_CONTRACT_MASTER.annual_eff_rate                        
		, OLTB_CONTRACT_MASTER.waive_confirmation                     
		, OLTB_CONTRACT_MASTER.cr_agreement_amend                     
		, OLTB_CONTRACT_MASTER.cr_agreement_date                      
		, OLTB_CONTRACT_MASTER.previous_tracer_date                                              
		, OLTB_CONTRACT_MASTER.agent_cif                              
		, OLTB_CONTRACT_MASTER.facility_name                          
		, OLTB_CONTRACT_MASTER.rolling_loan                                         
		, OLTB_CONTRACT_MASTER.contractual_maturity_date              
		, OLTB_CONTRACT_MASTER.contract_repriced                                                      
		, OLTB_CONTRACT_MASTER.primary_syndication                    
		, OLTB_CONTRACT_MASTER.purpose_of_syndication                 
		, OLTB_CONTRACT_MASTER.schedule_definition                    
		, OLTB_CONTRACT_MASTER.max_drawdown_amount                    
		, OLTB_CONTRACT_MASTER.user_input_maturity_date               
		, OLTB_CONTRACT_MASTER.no_of_drawdowns_allowed                
		, OLTB_CONTRACT_MASTER.no_of_active_drawdowns                 
		, OLTB_CONTRACT_MASTER.min_drawdown_amount                    
		, OLTB_CONTRACT_MASTER.drawdown_expiry                        
		, OLTB_CONTRACT_MASTER.swing_line                             
		, OLTB_CONTRACT_MASTER.lc_drawdown                            
		, OLTB_CONTRACT_MASTER.lc_type                                
		, OLTB_CONTRACT_MASTER.part_vdbal_stdt_on_conv                
		, OLTB_CONTRACT_MASTER.conversion_ref_no                      
		, OLTB_CONTRACT_MASTER.conversion_esn                         
		, OLTB_CONTRACT_MASTER.tax_domicile                           
		, OLTB_CONTRACT_MASTER.sic_code                               
		, OLTB_CONTRACT_MASTER.agency_id                              
		, OLTB_CONTRACT_MASTER.lc_issuer                              
		, OLTB_CONTRACT_MASTER.lc_sublimit_amt                                                 
		, OLTB_CONTRACT_MASTER.agency_type                            
		, OLTB_CONTRACT_MASTER.ancillary                              
		, OLTB_CONTRACT_MASTER.collateral_account                     
		, OLTB_CONTRACT_MASTER.handoff_status                         
		, OLTB_CONTRACT_MASTER.internal_gl                            
		, OLTB_CONTRACT_MASTER.loa_conversion_date                    
		, OLTB_CONTRACT_MASTER.pik_amount                             
		, OLTB_CONTRACT_MASTER.special_amount                         
		, OLTB_CONTRACT_MASTER.tranche_feeamt                         
		, OLTB_CONTRACT_MASTER.tranche_feeccy                         
		, OLTB_CONTRACT_MASTER.auto_extension                         
		, OLTB_CONTRACT_MASTER.exclude_unutil_fee                     
		, OLTB_CONTRACT_MASTER.fronting_share                         
		, OLTB_CONTRACT_MASTER.sighting_funds_applicable              
		, OLTB_CONTRACT_MASTER.external_cusip_no               		
		, OLTB_CONTRACT_MASTER.reamort_date
		, OLTB_CONTRACT_MASTER.master_funding_refno
		, OLTB_CONTRACT_MASTER.pool_funding_refno                  			
		,(
			SELECT lc_drawdown 
			FROM   oltms_product_master_ld
			WHERE  product = OLTB_CONTRACT.product_code
			AND    rownum  = 1
		) lc_contract
		,(NVL(OLTB_CONTRACT_BALANCE.principal_outstanding_bal,0) - NVL(OLTB_CONTRACT_BALANCE.lc_balance_amt,0)) principal_outstanding_bal
		,principal_outstanding_bal os_principal_bal
		,(NVL(OLTB_CONTRACT_BALANCE.reserve_amt,0) * -1) reserve_amt	
		,NVL(OLTB_CONTRACT_BALANCE.lc_balance_amt,0) lc_balance_amt		
		,OLTB_CONTRACT_BALANCE.current_face_value             
		,OLTB_CONTRACT_BALANCE.total_projected_interest       
		,OLTB_CONTRACT_BALANCE.recovery_amt                   
		,OLTB_CONTRACT_BALANCE.writeoff_amt                   
		,OLTB_CONTRACT_BALANCE.decreasedreserve_amt           		
		,OLTB_CONTRACT_BALANCE.gaap_front_rsk                 
		,OLTB_CONTRACT_BALANCE.hfs_balance_amt                
		,'A' record_type
	FROM
		OLTB_CONTRACT_BALANCE,	
		OLTB_CONTRACT_MASTER,
		OLTB_CONTRACT
	WHERE	OLTB_CONTRACT_BALANCE.contract_ref_no		= OLTB_CONTRACT.contract_ref_no	
	AND		OLTB_CONTRACT.contract_ref_no 				= OLTB_CONTRACT_MASTER.contract_ref_no 
	AND		OLTB_CONTRACT.latest_version_no 			= OLTB_CONTRACT_MASTER.version_no	
	AND		OLTB_CONTRACT.product_type in ('L','D','C') 
	AND		OLTB_CONTRACT.module_code = 'OL' 	
	AND 	NVL(OLTB_CONTRACT.auth_status,'U') = 'A'
	AND  (
		(OLTB_CONTRACT.contract_status NOT IN('V','H'))  --UnInitiated Contracts to be excluded
		   OR
	  	 	(OLTB_CONTRACT.contract_status = 'V' AND OLTB_CONTRACT.book_date < (SELECT today FROM sttms_dates WHERE branch_code = (SELECT ho_branch FROM oltms_bank))
	  	 	AND (OLTB_CONTRACT.latest_event_date BETWEEN TRUNC((SELECT today FROM sttms_dates WHERE branch_code = (SELECT ho_branch FROM oltms_bank)),'MON') AND (SELECT today FROM sttms_dates WHERE branch_code = (SELECT ho_branch FROM oltms_bank)))
	  		)
	  	)
/

CREATE OR REPLACE SYNONYM olvws_dw_dealtrax_orignation FOR olvw_dw_dealtrax_orignation
/