create or replace force view olvw_trestel_02
as
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_trestel_02.VW
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
CHANGE HISTORY
19-MAR-2008 CITIUS-LS#5678 Production Retro to CC-STP Code Baseline.
----------------------------------------------------------------------------------------------------
*/
--19-MAR-2008 CITIUS-LS#5678 Production Retro to CC-STP Code Baseline STARTS
/*
select record_type , ac_branch , ac_ccy , sum(fcy_dr) fcy_dr, sum(lcy_dr) lcy_dr, sum (fcy_cr) fcy_cr, 
sum(lcy_cr) lcy_cr
from
(
select '02' record_type,ac_branch,
ac_ccy,
sum(decode(drcr_ind,'D',1,0) * fcy_amount) fcy_dr,
sum(decode(drcr_ind,'D',1,0) * lcy_amount) lcy_dr,
sum(decode(drcr_ind,'C',1,0) * fcy_amount) fcy_cr,
sum(decode(drcr_ind,'C',1,0) * lcy_amount) lcy_cr
from oltbs_daily_log_ac 
where 
delete_stat <> 'D'
and
category in ('1','2')
and
event <> 'REVL'
group by 
trn_ref_no,ac_ccy,value_dt,lcy_amount,fcy_amount,'02',ac_branch
having 
sum(decode(drcr_ind,'D',-1,1) * fcy_amount) = 0
and
sum(decode(drcr_ind,'D',-1,1) * lcy_amount) = 0
)
group by record_type , ac_branch , ac_ccy
*/
SELECT		'02' record_type,
		ac_branch,
		ac_ccy, 
		sum(fcy_dr) fcy_dr,
		sum(lcy_dr) lcy_dr,
		sum (fcy_cr) fcy_cr, 
		sum(lcy_cr) lcy_cr
FROM		olvw_matched_movements
GROUP BY 	'02',ac_branch, ac_ccy
/
CREATE OR REPLACE SYNONYM olvws_trestel_02 FOR olvw_trestel_02
/