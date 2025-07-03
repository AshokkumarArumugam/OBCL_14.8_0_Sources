CREATE OR REPLACE FORCE VIEW olvw_stp_get_agency_fee_rate AS
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
SELECT distinct
	   lsrefno 				ls_ref_no,
	   ldrefno 				ld_ref_no,
	   llrefno 				part_reF_no,
	   d.counterparty 		participant,
	   b.component 			ls_component,
	   c.component 			ld_component,
	   b.ccy,
	   b.effective_date,
	   b.from_basis_amt,
	   b.to_basis_amt,
	   b.fee_rate,
	   c.interest_basis
from   lbtbs_stp_contract_map a,
	   LFTM_FEE_RATE b,
	   LFTB_CONTRACT_FEE c,
	   oltbs_contract d,
	   oltbs_contract e
where  lsrefno   	  is not null
--and    ldrefno	 	  =  '001C001060480910'
and    lsrefno	      =	 b.contract_ref_no
and    ldrefno        =  c.contract_ref_no
and    llrefno	      =	 d.contract_ref_no
and    lsrefno		  =  e.contract_ref_no
and    b.customer_no  in (e.counterparty,'ALL')
and    b.ccy          =  e.contract_ccy
and    c.event_seq_no =  (select max(event_seq_no) from lftbs_contract_fee where contract_ref_no=c.contract_ref_no and component=c.component)
and    c.component    =  nvl(fn_ol_stp_get_ld_comp(lsrefno,d.counterparty,b.component,(SELECT sypks_utils.get_product(LDREFNO) FROM DUAL),
(SELECT sypks_utils.get_branch(LDREFNO) FROM DUAL)),'XXX')
order by lsrefno, b.component, b.effective_date
/
create or replace synonym olvws_stp_get_agency_fee_rate FOR olvw_stp_get_agency_fee_rate 
/