CREATE OR REPLACE TRIGGER ol_oltr_contract_iccf_calc
/*----------------------------------------------------------------------------------------------------
**
  ** File Name    ol_oltr_contract_iccf_calc.TRG
  **
  ** Module       :LD
  **
  This source is part of the Oracle Banking Corporate Lending  Software Product. 
Copyright © 2007 - 2018  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
or otherwise, translated in any language or computer language, without the prior written permission 
of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.

----------------------------------------------------------------------------------------------------
*/

BEFORE DELETE OR INSERT OR UPDATE
ON OLTB_CONTRACT_ICCF_CALC
REFERENCING NEW AS New OLD AS Old
FOR EACH ROW
BEGIN
	IF INSERTING
	THEN
		debug.pr_debug('OL','ol_oltr_contract_iccf_calc INSERTING '||
			:new.contract_ref_no||'~'||
			:new.component||'~'||
			:new.prepayment_penalty_seq_no||'~'||
			:new.schedule_date||'~'||
			:new.start_date||'~'||
			:new.product||'~'||
			:new.currency||'~'||
			:new.end_date||'~'||
			:new.basis_amount||'~'||
			:new.rate||'~'||
			:new.no_of_days||'~'||
			:new.calculated_amount||'~'||
			:new.iccf_calc_method||'~'||
			:new.daily_average_amount||'~'||
			:new.rate_sign||'~'||
			:new.int_application||'~'||
			:new.compound_interest||'~'||
			:new.tax_amount);
	ELSIF UPDATING
	THEN
		debug.pr_debug('OL','ol_oltr_contract_iccf_calc UPDATING OLD '||
			:old.contract_ref_no||'~'||
			:old.component||'~'||
			:old.prepayment_penalty_seq_no||'~'||
			:old.schedule_date||'~'||
			:old.start_date||'~'||
			:old.product||'~'||
			:old.currency||'~'||
			:old.end_date||'~'||
			:old.basis_amount||'~'||
			:old.rate||'~'||
			:old.no_of_days||'~'||
			:old.calculated_amount||'~'||
			:old.iccf_calc_method||'~'||
			:old.daily_average_amount||'~'||
			:old.rate_sign||'~'||
			:old.int_application||'~'||
			:old.compound_interest||'~'||
			:old.tax_amount);
		debug.pr_debug('OL','ol_oltr_contract_iccf_calc INSERTING NEW '||
			:new.contract_ref_no||'~'||
			:new.component||'~'||
			:new.prepayment_penalty_seq_no||'~'||
			:new.schedule_date||'~'||
			:new.start_date||'~'||
			:new.product||'~'||
			:new.currency||'~'||
			:new.end_date||'~'||
			:new.basis_amount||'~'||
			:new.rate||'~'||
			:new.no_of_days||'~'||
			:new.calculated_amount||'~'||
			:new.iccf_calc_method||'~'||
			:new.daily_average_amount||'~'||
			:new.rate_sign||'~'||
			:new.int_application||'~'||
			:new.compound_interest||'~'||
			:new.tax_amount);
	ELSIF DELETING
	THEN
		debug.pr_debug('OL','ol_oltr_contract_iccf_calc DELETING A ROW'||
			:old.contract_ref_no||'~'||
			:old.component||'~'||
			:old.prepayment_penalty_seq_no||'~'||
			:old.schedule_date||'~'||
			:old.start_date||'~'||
			:old.product||'~'||
			:old.currency||'~'||
			:old.end_date||'~'||
			:old.basis_amount||'~'||
			:old.rate||'~'||
			:old.no_of_days||'~'||
			:old.calculated_amount||'~'||
			:old.iccf_calc_method||'~'||
			:old.daily_average_amount||'~'||
			:old.rate_sign||'~'||
			:old.int_application||'~'||
			:old.compound_interest||'~'||
			:old.tax_amount);
	END IF;
EXCEPTION
     WHEN OTHERS THEN
       NULL;
END ol_oltr_contract_iccf_calc;
/