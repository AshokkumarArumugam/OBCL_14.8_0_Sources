CREATE OR REPLACE force VIEW olvw_amount_due_stp
(
contract_ref_no                
,component   
,activity_seq_no
,due_date                       
,amount_due                     
,currency_amt_due               
,account_due                    
,branch_account_due             
,counterparty                   
,amount_settled                 
,inflow_outflow                 
,basis_amount_tag               
,adjusted_amount                
,schedule_linkage               
,msg_event_seq_no               
,sch_picked_for_liq             
,billing_event_seq_no           
,component_type                 
,sgen_ac_branch                 
,sgen_ac_no                     
,sgen_ac_ccy                    
,sgen_amount                    
,sgen_xrate                     
,previous_accrual_ref_no        
,previous_accrual_to_date       
,current_net_accrual            
,till_date_accrual              
,status                         
,refinance_reqd                 
,current_memo_accrual           
,notc_gen                       
,notc_event_seq_no              
,disc_accr_applicable           
,pay_msg_date                   
,recv_msg_date                  
,rntc_msg_date                  
,rntc_event_seq_no              
,tax_due                        
,tax_settled                    
,tax_adjusted                   
,contract_ccy                   
,amt_in_cont_ccy                
,pay_conf_status                
,pay_conf_maker_id              
,pay_conf_maker_dt_stamp        
,netting_status                 
,netting_timestamp              
,settled_status    
,pay_recv_amount
,pay_by_date --OBCL_14.4_Payment_Delay
,indicator
--OBCL_14.4_LS_SOFR_Change start
,amount_due_actual                       
,calc_end_date                          
,last_calc_date                                
,last_rate_pickup_date
,schedule_date
--OBCL_14.4_LS_SOFR_Change end
)
AS
/*-----------------------------------------------------------------------------------
**
** File Name      : CSVWSTP01.VW
** Module         :  CORE ENTITIES
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
--------------------------------------------------------------------------------------------------
*/
SELECT contract_ref_no                
	,component   
	,activity_seq_no
	,due_date                       
	,amount_due                     
	,currency_amt_due               
	,account_due                    
	,branch_account_due             
	,counterparty                   
	,amount_settled                 
	,inflow_outflow                 
	,basis_amount_tag               
	,adjusted_amount                
	,schedule_linkage               
	,msg_event_seq_no               
	,sch_picked_for_liq             
	,billing_event_seq_no           
	,component_type                 
	,sgen_ac_branch                 
	,sgen_ac_no                     
	,sgen_ac_ccy                    
	,sgen_amount                    
	,sgen_xrate                     
	,previous_accrual_ref_no        
	,previous_accrual_to_date       
	,current_net_accrual            
	,till_date_accrual              
	,status                         
	,refinance_reqd                 
	,current_memo_accrual           
	,notc_gen                       
	,notc_event_seq_no              
	,disc_accr_applicable           
	,pay_msg_date                   
	,recv_msg_date                  
	,rntc_msg_date                  
	,rntc_event_seq_no              
	,tax_due                        
	,tax_settled                    
	,tax_adjusted                   
	,contract_ccy                   
	,amt_in_cont_ccy                
	,pay_conf_status                
	,pay_conf_maker_id              
	,pay_conf_maker_dt_stamp        
	,netting_status                 
	,netting_timestamp              
	,settled_status    
	,pay_recv_amount
	,pay_by_date --OBCL_14.4_Payment_Delay
	,'S'
	--OBCL_14.4_LS_SOFR_Change start
	,amount_due_actual                       
    ,calc_end_date                          
    ,last_calc_date                                
    ,last_rate_pickup_date
	,schedule_date
	-- --OBCL_14.4_LS_SOFR_Change end
FROM oltbs_amount_due_store
UNION ALL
SELECT contract_ref_no                
	,component   
	,0
	,due_date                       
	,amount_due                     
	,currency_amt_due               
	,account_due                    
	,branch_account_due             
	,counterparty                   
	,amount_settled                 
	,inflow_outflow                 
	,basis_amount_tag               
	,adjusted_amount                
	,schedule_linkage               
	,msg_event_seq_no               
	,sch_picked_for_liq             
	,billing_event_seq_no           
	,component_type                 
	,sgen_ac_branch                 
	,sgen_ac_no                     
	,sgen_ac_ccy                    
	,sgen_amount                    
	,sgen_xrate                     
	,previous_accrual_ref_no        
	,previous_accrual_to_date       
	,current_net_accrual            
	,till_date_accrual              
	,status                         
	,refinance_reqd                 
	,current_memo_accrual           
	,notc_gen                       
	,notc_event_seq_no              
	,disc_accr_applicable           
	,pay_msg_date                   
	,recv_msg_date                  
	,rntc_msg_date                  
	,rntc_event_seq_no              
	,tax_due                        
	,tax_settled                    
	,tax_adjusted                   
	,contract_ccy                   
	,amt_in_cont_ccy                
	,pay_conf_status                
	,pay_conf_maker_id              
	,pay_conf_maker_dt_stamp        
	,netting_status                 
	,netting_timestamp              
	,settled_status                 
	,pay_recv_amount
    ,pay_by_date --OBCL_14.4_Payment_Delay	
	,'R'
	--OBCL_14.4_LS_SOFR_Change start
	,amount_due_actual                       
    ,calc_end_date                          
    ,last_calc_date                                
    ,last_rate_pickup_date
	,schedule_date
    --OBCL_14.4_LS_SOFR_Change End
FROM oltbs_amount_due_cs
/

CREATE or replace SYNONYM olvws_amount_due_stp FOR olvw_amount_due_stp
/