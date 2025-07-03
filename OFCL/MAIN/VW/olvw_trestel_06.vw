create or replace force view olvw_trestel_06
as
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_trestel_06.VW
**
** Module      : Interfaces
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
**
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
select '06' record_type,ac_branch,
ac_ccy,
decode(sign(sum(decode(drcr_ind,'D',-1,1) * fcy_amount)),-1,abs(sum(decode(drcr_ind,'D',-1,1) * fcy_amount)),0)
 fcy_dr_net,
decode(sign(sum(decode(drcr_ind,'D',-1,1) * lcy_amount)),-1,abs(sum(decode(drcr_ind,'D',-1,1) * lcy_amount)),0) lcy_dr_net,
decode(sign(sum(decode(drcr_ind,'D',-1,1) * fcy_amount)),1,abs(sum(decode(drcr_ind,'D',-1,1) * fcy_amount)),0)  fcy_cr_net,
decode(sign(sum(decode(drcr_ind,'D',-1,1) * lcy_amount)),1,abs(sum(decode(drcr_ind,'D',-1,1) * lcy_amount)),0)  lcy_cr_net
from oltbs_daily_log_ac a 
where 
delete_stat <> 'D'
and
category in ('3','4','5','6')
and
event <> 'REVL'
and
amount_tag not in ('BOTAMT','SOLDAMT','ROLLBOTAMT','ROLLSOLDAMT')
group by '06',ac_ccy,ac_branch
/