CREATE OR REPLACE TRIGGER "TRG_CONTRACT_SCH"
/*----------------------------------------------------------------------------------------------------
**
** File Name : ol_trg_contract_sch.TRG

** Module    : LD
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
------------------------------------------------------------------------------------------------------

    CHANGE HISTORY
    
    Created By           : 
    Created On           : 
    Purpose              :  
    Modified By          : 
    Modified On          : 
    Fix Description      : 
    Search String        : 
----------------------------------------------------------------------------------------------------
*/

BEFORE INSERT OR DELETE OR UPDATE ON OLTB_CONTRACT_SCHEDULES
FOR EACH ROW
BEGIN
debug.pr_debug('OL','Inside the trigger on OLTB_CONTRACT_SCHEDULES');
IF INSERTING
THEN
	debug.pr_debug('OL','Inserting into OLTB_CONTRACT_SCHEDULES');
	debug.pr_debug('OL','Contract ref no '||:NEW.contract_ref_no);
	debug.pr_debug('OL','Component '||:NEW.component);
	debug.pr_debug('OL','START_DATE '||:NEW.START_DATE);
	debug.pr_debug('OL','FREQUENCY '||:NEW.FREQUENCY);
END IF;
IF DELETING
THEN
	debug.pr_debug('OL','Deleting from OLTB_CONTRACT_SCHEDULES');
	debug.pr_debug('OL','Contract ref no '||:OLD.contract_ref_no);
	debug.pr_debug('OL','Component '||:OLD.component);
	debug.pr_debug('OL','START_DATE '||:OLD.START_DATE);
	debug.pr_debug('OL','FREQUENCY '||:OLD.FREQUENCY);

	debug.pr_debug('OL','Deleting from OLTB_CONTRACT_SCHEDULES');
	debug.pr_debug('OL','Contract ref no '||:NEW.contract_ref_no);
	debug.pr_debug('OL','Component '||:NEW.component);
	debug.pr_debug('OL','START_DATE '||:NEW.START_DATE);
	debug.pr_debug('OL','FREQUENCY '||:NEW.FREQUENCY);

END IF;
IF UPDATING
THEN
	debug.pr_debug('OL','Updating the table OLTB_CONTRACT_SCHEDULES');
	debug.pr_debug('OL','Contract ref no '||:NEW.contract_ref_no);
	debug.pr_debug('OL','New Component '||:NEW.component||'  Old Component '||:OLD.component);
	debug.pr_debug('OL','START_DATE '||:NEW.START_DATE);
	debug.pr_debug('OL','FREQUENCY '||:NEW.FREQUENCY);
END IF;
END;
/