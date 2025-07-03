CREATE OR REPLACE FORCE VIEW olvw_contract_iccf_stp
(contract_ref_no, component, prepayment_penalty_seq_no, activity_seq_no, schedule_date, start_date, product, currency, end_date, basis_amount, rate, no_of_days, calculated_amount, iccf_calc_method, daily_average_amount, rate_sign, int_application, compound_interest, tax_amount, indicator)
AS
/*----------------------------------------------------------------------------------------------------
 This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
--------------------------------------------------------------------------------------------------
*/
SELECT  contract_ref_no
		,component
		,prepayment_penalty_seq_no
		,activity_seq_no
		,schedule_date
		,start_date
		,product
		,currency
		,end_date
		,basis_amount
		,rate
		,no_of_days
		,calculated_amount
		,iccf_calc_method
		,daily_average_amount
		,rate_sign
		,int_application
		,compound_interest
		,tax_amount
		,'S'
FROM oltbs_contract_iccf_store
UNION ALL
SELECT  contract_ref_no
		,component
		,prepayment_penalty_seq_no
		,0
		,schedule_date
		,start_date
		,product
		,currency
		,end_date
		,basis_amount
		,rate
		,no_of_days
		,calculated_amount
		,iccf_calc_method
		,daily_average_amount
		,rate_sign
		,int_application
		,compound_interest
		,tax_amount
		,'R'
FROM oltbs_contract_iccf_calc
/
create or replace synonym olvws_contract_iccf_stp for olvw_contract_iccf_stp
/