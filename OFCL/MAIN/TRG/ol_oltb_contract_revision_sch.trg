CREATE OR REPLACE TRIGGER "TRG_LDTB_CONTRACT_REVISION_SCH"
/*----------------------------------------------------------------------------------------------------
**
** File Name : ol_oltb_contract_revision_sch.TRG

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

BEFORE INSERT OR DELETE OR UPDATE ON OLTB_CONTRACT_REVISION_SCH
FOR EACH ROW
BEGIN
debug.pr_debug('OL','Inside the trigger on OLTB_CONTRACT_REVISION_SCH');
IF INSERTING
THEN
	debug.pr_debug('OL','Inserting into OLTB_CONTRACT_REVISION_SCH');
	debug.pr_debug('OL','Contract ref no REVISION_DATE'||:NEW.REVISION_DATE);
	debug.pr_debug('OL','Component REVISION_APPLIED'||:NEW.REVISION_APPLIED);
END IF;
IF DELETING
THEN
	debug.pr_debug('OL','Deleting from OLTB_CONTRACT_REVISION_SCH');
	debug.pr_debug('OL','Contract ref noREVISION_DATE  '||:OLD.REVISION_DATE);
	debug.pr_debug('OL','ComponentREVISION_APPLIED '||:OLD.REVISION_APPLIED);
END IF;
IF UPDATING
THEN
	debug.pr_debug('OL','Updating the table OLTB_CONTRACT_REVISION_SCH');
	debug.pr_debug('OL','REVISION_DATE '||:NEW.REVISION_DATE||:old.REVISION_DATE);
	debug.pr_debug('OL','REVISION_APPLIED '||:NEW.REVISION_APPLIED||'  Old Component '||:OLD.REVISION_APPLIED);

END IF;
END;
/