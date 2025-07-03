CREATE OR REPLACE force VIEW olvw_dw_static_facility AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_dw_static_facility.vw
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
*/
/*----------------------------------------------------------------------------------------
** Change Histroy:
** 31-AUG-2012 CITIUS#14745 changes: Added for Dealtrax Data ware housing changes 
   15-MAY-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16826 - Genesis adjustment changes
   25-JUN-2014 CITIUS#19116 150080-8883 Deals liquidated current month should be considered for feed.
----------------------------------------------------------------------------------------
*/
select a.branch_code
		,a.contract_ref_no                           
		,a.user_ref_no                               
		,a.version_no                     
		,a.event_seq_no                   
		,a.counterparty                     
		,a.amount                                    
		,a.currency                                   
		,a.no_of_tranches_allowed         
		,a.no_of_drawdowns_allowed        
		,a.purpose_of_syndication         
		,a.remarks                        
		,a.facility_start_date                       
		,a.facility_end_date                         
		,a.min_amount                     
		,a.notice_days                    
		--15-MAY-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16826 Changes starts
		--,a.custom_ref_no       		
		,b.custom_ref_no
		--15-MAY-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16826 Changes ends                 
		,a.drawdown_start_date            
		,a.drawdown_end_date              
		,a.settlement_seq_no              
		,a.pymt_notice_days               
		,a.start_date                     
		,a.end_date                       
		,a.user_defined_status            
		,a.facility_name                        
		,a.tranche_start_date                        
		,a.tranche_end_date                          
		,a.max_tranche_amount             
		,a.cusip_no                                  
		,a.watch_list_facility            
		,a.watch_list_remarks             
		,a.agency_id                      
		,a.purpose_of_syndication2        
		,a.purpose_of_syndication1        
		,a.agency_type                    
		,a.agent_cif  
		,b.fund_ref_no                    
		,b.book_date                      
		,b.serial_no                      
		,b.latest_event_seq_no            
		,b.latest_version_no              
		,b.branch                         
		,b.product_code                   
		,b.contract_status                
		,b.auth_status                    
		,b.template_status                
		,b.product_type                   
		,b.curr_event_code                
		,b.module_code                    
		,b.contract_ccy                   
		,b.latest_event_date              
		,b.external_ref_no                
		,b.auto_manual_flag               
		,b.department_code                
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
		--,b.alternate_ref_no          `		
from   lbtb_syndication_master a,
	 oltbs_contract b
where  a.contract_ref_no = b.contract_ref_no
and	 a.version_no	 = b.latest_version_no
-- and	 b.contract_status ='A' -- CITIUS#19116 150080-8883 changes
and	 b.module_code	 = 'FC'
--CITIUS#19116 150080-8883 start
and	 (
		b.contract_status ='A'
	 OR
	 	(
	 		b.contract_status ='L'
	 		AND
	 		(
	 			/*
	 			EXISTS
				(SELECT 1
				 FROM oltbs_history
				 WHERE trn_ref_no = a.contract_reF_no
				 AND   ac_branch = b.branch
				 --and  EXTRACT(MONTH from trn_dt)||EXTRACT(YEAR from trn_dt) = EXTRACT (MONTH FROM global.application_date)||EXTRACT (YEAR FROM global.application_date)
				 and  trn_dt >= TRUNC(global.application_date,'MON')
				 and   rownum = 1
				)
	 			OR
	 			*/
				EXISTS
				(SELECT 1
				 FROM OLTW_DW_ACCOUNTING_BALANCES b1
				 WHERE b1.contract_ref_no = a.contract_reF_no
				 AND   EXTRACT(MONTH from b1.run_date)||EXTRACT(YEAR from b1.run_date) = EXTRACT (MONTH FROM global.application_date)||EXTRACT (YEAR FROM global.application_date)
				 --and  trn_dt >= TRUNC(global.application_date,'MON')
				 AND  (nvl(b1.mtd_lcy_bal,0) <> 0 OR nvl(b1.ltd_lcy_bal,0) <> 0)
				 and   rownum = 1
				)
	 			OR	 			
				EXISTS
				(SELECT 1
				 FROM oltbs_daily_log_ac
				 WHERE trn_ref_no = a.contract_reF_no
				 and  nvl(delete_stat,'x') <> 'D'
				)
				OR
				EXISTS 
				(
				SELECT  1
				FROM    oltbs_amount_due_cs c
				WHERE   c.contract_ref_no = a.contract_reF_no
				AND     c.component <> 'PRINCIPAL'
				HAVING  SUM(NVL(c.amount_due,0) - NVL(c.amount_settled,0) - NVL(c.adjusted_amount,0) -NVL(c.pay_recv_amount,0)) > 0
				)				
	 		)
	 	)
	 )
--CITIUS#19116 150080-8883 end
/
CREATE OR REPLACE SYNONYM olvws_dw_static_facility
FOR olvw_dw_static_facility
/