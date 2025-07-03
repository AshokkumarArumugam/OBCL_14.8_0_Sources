CREATE OR REPLACE TRIGGER ol_oltr_fpml_update
/*----------------------------------------------------------------------------------------------------
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
BEFORE UPDATE ON OLTB_FPML_MSG_OUT
FOR EACH ROW
BEGIN

	:new.last_modified_time := SYSDATE;	
	
	/*
	debug.pr_debug('OL',' TRIG UPDATING in OLTB_FPML_MSG_OUT');
	debug.pr_debug('OL',' Global.application_date :'||Global.application_date);
	debug.pr_debug('OL',' Global.current_branch :'||Global.current_branch);
	debug.pr_debug('OL',' Global.user_id :'||Global.user_id);
	
	IF Global.application_date IS NULL
	AND Global.current_branch IS NULL
	AND Global.user_id IS NULL
	THEN
	
		global.pr_init('000','SYSTEM');
		
	END IF;

	:new.last_modified_time := olpkss_ld_utils.fn_get_date_time(Global.application_date);

	debug.pr_debug('OL','************************************************');
	debug.pr_debug('OL',':new.insert_time-'||:new.insert_time);
	debug.pr_debug('OL',':old.insert_time-'||:old.insert_time);
	debug.pr_debug('OL',':new.dcn-'||:new.dcn);	
	debug.pr_debug('OL',':old.dcn-'||:old.dcn);   
	debug.pr_debug('OL',':new.last_modified_time-'||:new.last_modified_time);
	debug.pr_debug('OL',':old.last_modified_time-'||:old.last_modified_time);
	debug.pr_debug('OL',':new.ack_status-'||:new.ack_status);
	debug.pr_debug('OL',':old.ack_status-'||:old.ack_status);
	debug.pr_debug('OL',':new.handoff_status-'||:new.handoff_status);
	debug.pr_debug('OL',':old.handoff_status-'||:old.handoff_status);
	debug.pr_debug('OL','************************************************');
	*/

EXCEPTION
WHEN OTHERS THEN
	debug.pr_debug('OL','error-'||sqlerrm);
END;
/