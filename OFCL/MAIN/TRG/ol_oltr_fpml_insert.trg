CREATE OR REPLACE TRIGGER ol_oltr_fpml_insert
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
BEFORE INSERT ON OLTB_FPML_MSG_OUT
FOR EACH ROW
BEGIN

	:new.insert_time := SYSDATE;
	
	/*
	debug.pr_debug('LB','TRIG INSERTING in OLTB_FPML_MSG_OUT');  	

	:new.insert_time := olpkss_ld_utils.fn_get_date_time(Global.application_date);

	debug.pr_debug('OL','************************************************');
	debug.pr_debug('OL',':new.insert_time-'||:new.insert_time);
	debug.pr_debug('OL',':old.insert_time-'||:old.insert_time);
	debug.pr_debug('OL',':new.dcn-'||:new.dcn);
	debug.pr_debug('OL',':old.dcn-'||:old.dcn);   
	debug.pr_debug('OL','************************************************');
	*/

EXCEPTION
WHEN OTHERS THEN
	debug.pr_debug('OL','Error-'||SQLERRM);
END;
/