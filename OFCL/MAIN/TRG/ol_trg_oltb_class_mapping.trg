CREATE OR REPLACE TRIGGER ol_trg_oltb_class_mapping
/*----------------------------------------------------------------------------------------------------
**
** File Name   : ol_trg_oltb_class_mapping.trg
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
BEFORE INSERT OR DELETE OR UPDATE ON OLTB_CLASS_MAPPING
FOR EACH ROW
BEGIN
debug.pr_debug('OL','Inside the trigger on OLTB_CLASS_MAPPING');
IF INSERTING
THEN
	debug.pr_debug('OL','******************MITB_CLASS_MAPPING********************* ');
	debug.pr_debug('OL','inserting into OLTB_CLASS_MAPPING ');
END IF;
IF DELETING
THEN
	debug.pr_debug('OL','******************MITB_CLASS_MAPPING********************* ');
	debug.pr_debug('OL','deleting into OLTB_CLASS_MAPPING ');
END IF;
IF UPDATING
THEN
	debug.pr_debug('OL','**************MITB_CLASS_MAPPING************************* ');
	debug.pr_debug('OL','updating into OLTB_CLASS_MAPPING ');
END IF;
	debug.pr_debug('OL','**************MITB_CLASS_MAPPING************************* ');
	debug.pr_debug('OL','UNIT_REF_NO    ='||:NEW.UNIT_REF_NO||'~'||:OLD.UNIT_REF_NO);
	debug.pr_debug('OL','UNIT_TYPE    ='||:NEW.UNIT_TYPE||'~'||:OLD.UNIT_TYPE);
	debug.pr_debug('OL','BRANCH_CODE    ='||:NEW.BRANCH_CODE||'~'||:OLD.BRANCH_CODE);
	debug.pr_debug('OL','TXN_MIS_1    ='||:NEW.TXN_MIS_1||'~'||:OLD.TXN_MIS_1);
	debug.pr_debug('OL','TXN_MIS_2    ='||:NEW.TXN_MIS_2||'~'||:OLD.TXN_MIS_2);
END;
/