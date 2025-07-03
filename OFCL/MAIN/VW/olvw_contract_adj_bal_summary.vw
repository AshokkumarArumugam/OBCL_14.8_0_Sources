create or replace force view olvw_contract_adj_bal_summary
as
/*----------------------------------------------------------------------------------------------------
 This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
--------------------------------------------------------------------------------------------------
*/
select 	contract_ref_no,
		account_number, 
		amount_tag,
	    (
	    select nvl(sum(amount),0)
		from   olvw_contract_adj_mnt a,
			   oltbs_contract_adj_detail b
		where  b.cr_account = a.account_number
		and    b.contract_ref_no = ld.contract_ref_no
		and    a.account_number = ld.account_number
		)cr_amount,
	    (
	    select nvl(sum(amount),0)
		from   olvw_contract_adj_mnt a,
			   oltbs_contract_adj_detail b
		where  b.dr_account = a.account_number
		and    b.contract_ref_no = ld.contract_ref_no
		and    a.account_number = ld.account_number
		) dr_amount
from   olvw_contract_adj_amttag ld
/
--CITIUS-LS#7363 start
create or replace synonym olvws_contract_adj_bal_summary for olvw_contract_adj_bal_summary
/