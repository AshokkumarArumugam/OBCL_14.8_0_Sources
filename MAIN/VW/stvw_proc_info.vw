CREATE OR REPLACE FORCE VIEW STVW_PROC_INFO( BRANCH_CODE, 
USER_ID, FUNCTION_ID, TERMINAL_ID, SID, 
SNO, OS_PID ) 
AS 
/*------------------------------------------------------------------------------------------
**
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
------------------------------------------------------------------------------------------
*/
/*
                : Internal
    Changed By            :	Sumeet Yajnik
	Changed on			  : 10-May-2013
    Change Description    : SMTT_SMS_LOG table is removed,for performance changes
----------------------------------------------------------------------------------------------------*/
/*
select l.branch_code,l.user_id,l.function_id,l.terminal_id,t.sid,t.sno,
	   t.os_pid
from smtbs_sms_log l,smtts_sms_log t
where l.exit_flag is null and l.sequence_no=t.sequence_no
and l.function_id <> 'SMSIGNON'
and l.function_id <> 'BRSIGNON'
*/
select l.branch_code,l.user_id,l.function_id,l.terminal_id,'' sid,'' sno,
	   '' os_pid
from smtbs_sms_log l
where l.exit_flag is null
and l.function_id <> 'SMSIGNON'
and l.function_id <> 'BRSIGNON'
/
DROP SYNONYM STVWS_PROC_INFO 
/
CREATE SYNONYM STVWS_PROC_INFO  FOR STVW_PROC_INFO 
/