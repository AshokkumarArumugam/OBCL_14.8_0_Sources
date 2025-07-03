create or replace FORCE view lbvw_part_orr_mismatch
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
select d.borrower_ref_no,d.participant_ref_no,d.counterparty,c.*,b.fronting_type 
from  oltms_customer a,
	  lbtbs_participant_fronting b,
	  oltms_or_rating_detail c,
	  lbtbs_part_proc_stat d,
	  oltms_or_rating_master e
where b.contract_ref_no = d.participant_ref_no
and   b.borrower_contract_ref_no = d.borrower_ref_no
and   b.transaction_event in ('BOOK','VAMB')
and   b.borrower_event_seq_no = (
	  				   	          select max(borrower_event_seq_no)
						          from   lbtbs_participant_fronting 
						          where  b.borrower_contract_ref_no = borrower_contract_ref_no
						          and    b.contract_ref_no = contract_ref_no
						          and 	 transaction_event in ('BOOK','VAMB')
					            )
and   d.counterparty = a.customer_no
and   c.rating = a.obligor_risk_rating
and   c.rating_code = e.rating_code
and   c.fronting_status <> b.fronting_type
/

create OR REPLACE synonym lbvws_part_orr_mismatch for lbvw_part_orr_mismatch
/