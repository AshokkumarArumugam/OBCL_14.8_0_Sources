create or replace view smvw_job_schedule 
(job_name, job_group, trigger_state, next_fire_time, scheduler, error) as
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Software Product.
** Copyright (R) 2016 , Oracle and/or its affiliates.  All rights reserved
**
**
** No part of this work may be reproduced, stored in a retrieval system, adopted
** or transmitted in any form or by any means, electronic, mechanical,
** photographic, graphic, optic recording or otherwise, translated in any
** language or computer language, without the prior written permission of
** Oracle and/or its affiliates.
**
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India
** India
---------------------------------------------------------------------------------------------------------------------------------------
** Modified By           : Varun Jaganath
** Modified On           : 30-May-2015
** Modified Reason       : New job creation on host for untanking of transactions automatically.
** Search String         : 12.1_Priority_Replication (To be changed based on bug no like : FCUBS_12.1_INTERNAL_priority_replication_job)
**
** Modified By           : Ajai
** Modified On           : 07-Aug-2015
** Modified Reason       : added contion for record stat and once auth check in query
** Search String         : 21572207
---------------------------------------------------------------------------------------------------------------------------------------
*/
--12.0.2
select a.JOB_CODE job_name,
       a.job_group,
nvl((select ITEM_DESC  from cstb_item_desc where item_name=decode(a.state,1,'LBL_PAUSED',2,'LBL_COMPLETE',3,'LBL_ERRORED',4,'LBL_NOT_SCHEDULED','LBL_SCHEDULED')  AND language_code=global.lang and function_id='COMMON'),decode(a.state,1,'LBL_PAUSED',2,'LBL_COMPLETE',3,'LBL_ERROR',4,'LBL_NOT_SCHEDULED','LBL_SCHEDULED'))  trigger_state, --12.0.2
       --a.state trigger_state,
       a.next_fire_time,
       NVL(b.scheduler,a.scheduler),a.error --12.0.2
from sttb_job_master a LEFT JOIN --12.0.2
     sttm_job_DEFINITION b
ON a.JOB_CODE = b.job_code AND B.ACTIVE = 'Y' --12.0.2
--21572207 starts
and b.record_stat ='O'  and b.ONCE_AUTH='Y'
--21572207 ends 
union
select job_code,job_group,nvl((select ITEM_DESC  from cstb_item_desc where item_name='LBL_NOT_SCHEDULED'  AND LANGUAGE_CODE = NVL(GLOBAL.LANG,'ENG') and function_id='COMMON'),'LBL_NOT_SCHEDULED'),0,scheduler,'' as error --12.0.2
from sttm_job_DEFINITION
where job_code not in (select C.JOB_CODE
from sttb_job_master c ,
     sttm_job_DEFINITION d
where c.JOB_CODE = d.job_code AND d.ACTIVE = 'Y'
--21572207 starts
and d.record_stat ='O'  and d.ONCE_AUTH='Y'
--21572207 ends
)
--21572207 starts
and record_stat ='O'  and ONCE_AUTH='Y'
--21572207 ends
and active='Y' AND UPPER(JOB_CLASS_OR_PROC) NOT LIKE '%FCBRANCHREPLQRTZ%' --12.0.2
--12.1_Priority_Replication starts
AND UPPER(JOB_CLASS_OR_PROC) NOT LIKE '%FCBRANCHLOWPRIORITYREPLQRTZ%' 
AND UPPER(JOB_CLASS_OR_PROC) NOT LIKE '%FCBRANCHHIGHPRIORITYREPLQRTZ%' 
 --12.1_Priority_Replication ends
/