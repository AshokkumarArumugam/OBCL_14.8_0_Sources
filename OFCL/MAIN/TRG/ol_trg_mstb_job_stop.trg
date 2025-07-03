CREATE OR REPLACE TRIGGER ol_trg_mstb_job_stop
/*----------------------------------------------------------------------------------------------------
**
** File Name    : ol_trg_mstb_job_stop.TRG
**
** Module       : MS
**
This source is part of the Oracle Banking Corporate Lending  Software Product. 
Copyright © 2007 - 2018  Oracle and/or its affiliates.  All rights reserved.   
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

/* Change History
03-dec-2007 FCC V.CL Release 7.3 ITR1 sfr#276,Message Generation Offline Changes, MANAS created the trigger

**  Changed By         :Akhila Samson
**  Changed on         :23-Mar-2022
**  Change Description :Changes done to as per the Autonomous DB .
**  Search String      :AutonomousDB_Changes
*/
AFTER UPDATE OF STATUS ON OLTB_OPS_PROCESS_STATUS
FOR EACH ROW
DECLARE
l_alert_name VARCHAR2(35);

BEGIN

	IF :OLD.JOB LIKE '%olpkss_messaging%' and (:new.STATUS = 'S'  AND :old.STATUS='T') then

		l_alert_name :='MSG_ALERT_'||:OLD.PROCESS_SEQ;
		--DBMS_ALERT.SIGNAL(l_alert_name, 'STOP');--AutonomousDB_Changes

		UPDATE oltbs_bg_status
			SET status = 'N'
		WHERE  process = 'MSGOUT' AND SEQ_NO=:OLD.PROCESS_SEQ and node='CITILS';
		
	ELSIF 	:OLD.JOB LIKE '%olpkss_messaging%' and (:new.STATUS = 'T'  AND :old.STATUS='S') then
	
		UPDATE oltbs_bg_status
			SET status = 'Y'
		WHERE  process = 'MSGOUT' AND SEQ_NO=:OLD.PROCESS_SEQ and node='CITILS';
	END IF;
END;
/