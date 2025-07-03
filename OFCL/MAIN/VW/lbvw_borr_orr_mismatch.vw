create or replace FORCE view lbvw_borr_orr_mismatch
as
/*----------------------------------------------------------------------------------------------------
This source is part of the Oracle Banking Corporate Lending  Software Product. 
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
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
select d.contract_ref_no,d.counterparty,c.*,b.borrower_fronting_type 
from  oltms_customer a,
	  lbtbs_borrower_fronting b,
	  oltms_or_rating_detail c,
	  oltbs_contract d,
	  oltms_or_rating_master e
where b.contract_ref_no = d.contract_ref_no
and   b.transaction_event not in ('BOOK','VAMB')
and   b.event_seq_no = (
						  select max(event_seq_no)
						  from   lbtbs_borrower_fronting 
						  where  b.contract_ref_no = contract_ref_no
						  and 	 transaction_event not in ('BOOK','VAMB')
						)
and   d.counterparty = a.customer_no
and   c.rating = a.obligor_risk_rating
and   c.rating_code = e.rating_code
and   c.fronting_status <> b.borrower_fronting_type
/

create OR REPLACE synonym lbvws_borr_orr_mismatch for lbvw_borr_orr_mismatch
/