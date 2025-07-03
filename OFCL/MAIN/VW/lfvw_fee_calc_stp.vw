CREATE OR REPLACE force VIEW lfvw_fee_calc_stp
(
 contract_ref_no        
,component     
,activity_seq_no
,schedule_date          
,start_date             
,end_date               
,component_ccy          
,basis_amount           
,rate                   
,flat_amount            
,calculated_amount      
,daily_average_amount
,pickup_esn             
,iccf_calc_method       
,no_of_days     
,indicator
)
AS
/*-----------------------------------------------------------------------------------
**
** File Name      : lfvw_fee_calc_stp.VW
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
SELECT  contract_ref_no        
		,component     
		,activity_seq_no
		,schedule_date          
		,start_date             
		,end_date               
		,component_ccy          
		,basis_amount           
		,rate                   
		,flat_amount            
		,calculated_amount      
		,daily_average_amount
		,pickup_esn             
		,iccf_calc_method       
		,no_of_days                         
		,'S'
FROM lftbs_contract_fee_calc_store
UNION ALL
SELECT contract_ref_no        
		,component     
		,0
		,schedule_date          
		,start_date             
		,end_date               
		,component_ccy          
		,basis_amount           
		,rate                   
		,flat_amount            
		,calculated_amount      
		,daily_average_amount
		,pickup_esn             
		,iccf_calc_method       
		,no_of_days                         
		,'R'
FROM lftbs_contract_fee_calc
/
CREATE or replace SYNONYM lfvws_fee_calc_stp FOR lfvw_fee_calc_stp
/