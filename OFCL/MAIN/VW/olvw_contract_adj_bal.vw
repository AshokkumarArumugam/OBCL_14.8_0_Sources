create or replace force view olvw_contract_adj_bal
as
--CITIUS-LS#7363 start
/*----------------------------------------------------------------------------------------------------
 This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
--------------------------------------------------------------------------------------------------
*/
/*
create or replace FORCE view olvw_contract_adj_bal
as
select 		contract_ref_no,
		account_number, 
		amount_tag,
	    	cr_amount,
	    	dr_amount,
	    	,ccy --03-OCT-2011 CITIUS-LS#11366 Retro changes,(03-AUG-2011 Flexcube V.CL Release 7.9 FS Vol2 Tag 10 FEED Changes)
from   oltbs_contract_adj_bal
*/
Select a.contract_ref_no,
		a.account_number, 
		a.amount_tag,
	    a.cr_amount,
	    a.dr_amount
	    ,ccy --03-OCT-2011 CITIUS-LS#11366 Retro changes,(03-AUG-2011 Flexcube V.CL Release 7.9 FS Vol2 Tag 10 FEED Changes)--CITIUS-LS#11551
from oltbs_contract_adj_bal a , oltbs_contract b
where a.contract_ref_no = b.contract_ref_no
AND not exists ( 
			SELECT 1 
			FROM oltbs_interface_filter_param 
			WHERE branch_code = '000' 
			AND external_system = 'SOLAR' 
			AND interface_code = 'SOLAR' 
			AND exclude_type = 'PRODUCT' AND exclude_value = b.product_code ) 
AND not exists ( 	SELECT 1 FROM oltbs_interface_filter_param 
			WHERE branch_code = '000' 
			AND external_system = 'SOLAR' 
			AND interface_code = 'SOLAR' 
			AND exclude_type = 'BRANCH' 
			AND exclude_value = b.branch ) 
AND not exists ( 	SELECT 1 FROM oltbs_interface_filter_param 
			WHERE branch_code = '000' 
			AND external_system = 'SOLAR' 
			AND interface_code = 'SOLAR' 
			AND exclude_type = 'PROOF' 
			AND exclude_value = (select txn_mis_2 FROM oltbs_class_mapping WHERE unit_ref_no = b.contract_ref_no ) ) 
			
--CITIUS-LS#7363 end
/

create  or replace synonym olvws_contract_adj_bal for olvw_contract_adj_bal
/