CREATE OR REPLACE TRIGGER "TRG_CSTB_EXT_CONT_STAT"
/*----------------------------------------------------------------------------------------------------
**
** File Name : ol_trg_oltb_ext_cont_stat.TRG

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

BEFORE INSERT OR DELETE OR UPDATE ON OLTB_EXT_CONTRACT_STAT
FOR EACH ROW
BEGIN
	debug.pr_debug('OL','Inside the trigger ol_trg_oltb_ext_cont_stat');
IF INSERTING
THEN
	debug.pr_debug('OL','INSERTING  ***************');
    	debug.pr_debug('LB','EXTERNAL_REF_NO '||:NEW.EXTERNAL_REF_NO);
	debug.pr_debug('LB','BRANCH_CODE '||:NEW.BRANCH_CODE);
	debug.pr_debug('LB','MODULE '||:NEW.MODULE);
END IF;
IF DELETING
THEN
	debug.pr_debug('OL','DELETING  ***************');
     	debug.pr_debug('LB','EXTERNAL_REF_NO '||:NEW.EXTERNAL_REF_NO||'~~'||:OLD.EXTERNAL_REF_NO);
	debug.pr_debug('LB','BRANCH_CODE '||:NEW.BRANCH_CODE||'~~'||:OLD.BRANCH_CODE);
	debug.pr_debug('LB','MODULE '||:NEW.MODULE||'~~'||:OLD.MODULE);
END IF;
IF UPDATING
THEN
	debug.pr_debug('OL','UPDATING  ***************');
    	debug.pr_debug('LB','EXTERNAL_REF_NO '||:NEW.EXTERNAL_REF_NO||'~~'||:OLD.EXTERNAL_REF_NO);
	debug.pr_debug('LB','BRANCH_CODE '||:NEW.BRANCH_CODE||'~~'||:OLD.BRANCH_CODE);
	debug.pr_debug('LB','MODULE '||:NEW.MODULE||'~~'||:OLD.MODULE);
END IF;
END;
/