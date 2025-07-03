create or replace force view olvw_trestel_04 
as
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_trestel_04.VW
**
** Module      : Core Services
**
**This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
**
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
/*----------------------------------------------------------------------------------------------------
CHANGE GISTORY
19-MAR-2008 CITIUS-LS#5678 Production Retro to CC-STP Code Baseline.
----------------------------------------------------------------------------------------------------
*/
select '04' record_type,ac_branch,
ac_ccy,
--19-MAR-2008 CITIUS-LS#5678 Production Retro to CC-STP Code Baseline STARTS
/*
decode(sign(sum(decode(drcr_ind,'D',-1,1) * fcy_amount)),-1,abs(sum(decode(drcr_ind,'D',-1,1) * fcy_amount)),0)
 fcy_dr_net,
decode(sign(sum(decode(drcr_ind,'D',-1,1) * lcy_amount)),-1,abs(sum(decode(drcr_ind,'D',-1,1) * lcy_amount)),0) lcy_dr_net,
decode(sign(sum(decode(drcr_ind,'D',-1,1) * fcy_amount)),1,abs(sum(decode(drcr_ind,'D',-1,1) * fcy_amount)),0)  fcy_cr_net,
decode(sign(sum(decode(drcr_ind,'D',-1,1) * lcy_amount)),1,abs(sum(decode(drcr_ind,'D',-1,1) * lcy_amount)),0)  lcy_cr_net
from oltbs_daily_log_ac a 
where 
delete_stat <> 'D'
and
category in ('1','2')
and
event <> 'REVL'
and
not exists
(select 1 from xxtbs_contract_master where
	contract_ref_no = a.trn_ref_no
	and
	source <> 'TRESTEL')
group by '04',ac_ccy,ac_branch
*/
decode(sign(sum(fcy_cr - fcy_dr)),-1,abs(sum(fcy_cr - fcy_dr)),0) fcy_dr_net,
decode(sign(sum(lcy_cr - lcy_dr)),-1,abs(sum(lcy_cr - lcy_dr)),0) lcy_dr_net,
decode(sign(sum(fcy_cr - fcy_dr)),1,abs(sum(fcy_cr - fcy_dr)),0) fcy_cr_net, 
decode(sign(sum(lcy_cr - lcy_dr)),1,abs(sum(lcy_cr - lcy_dr)),0) lcy_cr_net
FROM		olvw_unmatched_movements_v2
GROUP BY 	'04',ac_branch, ac_ccy
/
CREATE OR REPLACE SYNONYM olvws_trestel_04 FOR olvw_trestel_04
--19-MAR-2008 CITIUS-LS#5678 Production Retro to CC-STP Code Baseline ENDS
/