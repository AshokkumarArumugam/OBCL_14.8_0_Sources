CREATE OR REPLACE TRIGGER "TRG_PART_RATIO"         
/*----------------------------------------------------------------------------------------------------
**
** File Name : ol_trg_part_ratio.TRG

** Module      : 
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
/*---CHANGE HISTORY------------------------------------------------------------------------------------
    Created By           : 
    Created On           : 
    Purpose              :  

    Modified By          : 
    Modified On          : 
    Fix Description      : 
    Search String        : 

-------------------------------------------------------------------------------------------------------
*/
BEFORE INSERT OR DELETE OR UPDATE ON lbtb_participant_ratio
FOR EACH ROW
BEGIN
	debug.pr_debug('OL','Inside the trigger ol_trg_part_ratio');
	IF INSERTING
	THEN
		debug.pr_debug('OL','INSERTING  KUNAL IN LSTB_PARTICIPANT_RATIO***************');
		debug.pr_debug('LB','CONTRACT_REF_NO '||:NEW.CONTRACT_REF_NO);
		debug.pr_debug('LB','EVENT_SEQ_NO '||:NEW.EVENT_SEQ_NO);
		debug.pr_debug('LB','CONTRACT_TYPE '||:NEW.CONTRACT_TYPE);
		debug.pr_debug('LB','DRAWDOWN_NO '||:NEW.DRAWDOWN_NO);
		debug.pr_debug('LB','CUSTOMER_NO '||:NEW.CUSTOMER_NO);
		debug.pr_debug('LB','COMPONENT_TYPE '||:NEW.COMPONENT_TYPE);
		debug.pr_debug('LB','COMPONENT '||:NEW.COMPONENT);
		debug.pr_debug('LB','COMPONENT_RATIO '||:NEW.COMPONENT_RATIO);

	END IF;
	IF DELETING
	THEN
		debug.pr_debug('OL','DELETING KUNAL IN lbtb_participant_ratio ***************');
		debug.pr_debug('LB','CONTRACT_REF_NO '||:NEW.CONTRACT_REF_NO||'~OLD::'||:OLD.CONTRACT_REF_NO);
		debug.pr_debug('LB','EVENT_SEQ_NO '||:NEW.EVENT_SEQ_NO||'~OLD::'||:OLD.EVENT_SEQ_NO);
		debug.pr_debug('LB','COMPONENT '||:NEW.COMPONENT||'~OLD::'||:OLD.COMPONENT);
		debug.pr_debug('LB','COMPONENT_TYPE '||:NEW.COMPONENT_TYPE||'~OLD::'||:OLD.COMPONENT_TYPE);
	END IF;
	IF UPDATING
	THEN
		debug.pr_debug('OL','UPDATING KUNAL IN lbtb_participant_ratio ***************');
		debug.pr_debug('LB','CONTRACT_REF_NO '||:NEW.CONTRACT_REF_NO||'~OLD::'||:OLD.CONTRACT_REF_NO);
		debug.pr_debug('LB','EVENT_SEQ_NO '||:NEW.EVENT_SEQ_NO||'~OLD::'||:OLD.EVENT_SEQ_NO);
		debug.pr_debug('LB','COMPONENT '||:NEW.COMPONENT||'~OLD::'||:OLD.COMPONENT);
		debug.pr_debug('LB','COMPONENT_TYPE '||:NEW.COMPONENT_TYPE||'~OLD::'||:OLD.COMPONENT_TYPE);
	END IF;
END;
/