CREATE OR REPLACE TRIGGER "TRG_PART_FRONT"         
/*----------------------------------------------------------------------------------------------------
**
** File Name   : ol_trg_part_front.trg
** Module      : 
**
** This source is part of the Oracle Banking Corporate Lending  Software Product. 
** Copyright © 2007 - 2018  Oracle and/or its affiliates.  All rights reserved.   
** No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
** in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
** or otherwise, translated in any language or computer language, without the prior written permission 
** of Oracle and/or its affiliates. 
** 
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East), 
** Mumbai - 400 063, India.
------------------------------------------------------------------------------------------------------

    CHANGE HISTORY
    
    Created By           : 
    Created On           : 
    Purpose              : 

    Modified By          : 
    Modified On          : 
    Fix Description      : 
    Search String        : 
------------------------------------------------------------------------------------------------------
*/
BEFORE INSERT OR DELETE OR UPDATE ON lbtb_participant_fronting
FOR EACH ROW
BEGIN
	debug.pr_debug('OL','Inside the trigger ol_trg_part_front');
IF INSERTING
THEN
	debug.pr_debug('OL','INSERTING  ***************');
    	debug.pr_debug('LB','BORRContract ref no '||:NEW.BORROWER_CONTRACT_REF_NO);
	debug.pr_debug('LB','BORRESN '||:NEW.BORROWER_EVENT_SEQ_NO);
	debug.pr_debug('LB','CONTRACT_REF_NO '||:NEW.CONTRACT_REF_NO);
	debug.pr_debug('LB','FRONTING_TYPE '||:NEW.FRONTING_TYPE);
END IF;
IF DELETING
THEN
	debug.pr_debug('OL','DELETING  ***************');
     	debug.pr_debug('LB','BORRContract ref no '||:NEW.BORROWER_CONTRACT_REF_NO||'~OLD::'||:OLD.BORROWER_CONTRACT_REF_NO);
     	debug.pr_debug('LB','BORRESN '||:NEW.BORROWER_EVENT_SEQ_NO||'~OLD::'||:OLD.BORROWER_EVENT_SEQ_NO);
     	debug.pr_debug('LB','CONTRACT_REF_NO '||:NEW.CONTRACT_REF_NO||'~OLD::'||:OLD.CONTRACT_REF_NO);
	debug.pr_debug('LB','FRONTING_TYPE '||:NEW.FRONTING_TYPE||'~OLD::'||:OLD.FRONTING_TYPE);
END IF;
IF UPDATING
THEN
	debug.pr_debug('OL','UPDATING  ***************');
    	debug.pr_debug('LB','BORRContract ref no '||:NEW.BORROWER_CONTRACT_REF_NO||'~OLD::'||:OLD.BORROWER_CONTRACT_REF_NO);
        debug.pr_debug('LB','BORRESN '||:NEW.BORROWER_EVENT_SEQ_NO||'~OLD::'||:OLD.BORROWER_EVENT_SEQ_NO);
        debug.pr_debug('LB','CONTRACT_REF_NO '||:NEW.CONTRACT_REF_NO||'~OLD::'||:OLD.CONTRACT_REF_NO);
	debug.pr_debug('LB','FRONTING_TYPE '||:NEW.FRONTING_TYPE||'~OLD::'||:OLD.FRONTING_TYPE);
END IF;
END;
/