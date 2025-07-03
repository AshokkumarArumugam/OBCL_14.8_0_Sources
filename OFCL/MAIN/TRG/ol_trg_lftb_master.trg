CREATE OR REPLACE TRIGGER ol_trg_lftb_master
/*----------------------------------------------------------------------------------------------------
**
** File Name : ol_trg_lftb_master.trg

** Module      : CF
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
BEFORE INSERT OR DELETE OR UPDATE ON LFTB_ACCR_FEE_MASTER
FOR EACH ROW
BEGIN
debug.pr_debug('OL','Inside the trigger on ol_trg_lftb_master');
IF INSERTING
THEN
	debug.pr_debug('OL','Inserting into ol_trg_lftb_master');
	debug.pr_debug('OL','Contract ref no '||:NEW.contract_ref_no);
	debug.pr_debug('OL','Component '||:NEW.component);
	debug.pr_debug('OL',' '||:NEW.total_amount_liquidated);

END IF;


IF DELETING
THEN
	debug.pr_debug('OL','Deleting into ol_trg_lftb_master');
	debug.pr_debug('OL','Contract ref no '||:NEW.contract_ref_no);
	debug.pr_debug('OL','Component '||:NEW.component);
	debug.pr_debug('OL',' '||:NEW.total_amount_liquidated);
END IF;

IF UPDATING
THEN
	debug.pr_debug('OL','updating into ol_trg_lftb_master');
	debug.pr_debug('OL','Contract ref no '||:NEW.contract_ref_no);
	debug.pr_debug('OL','Component '||:NEW.component   || ' >> ' || :old.component);
	debug.pr_debug('OL',' '||:NEW.total_amount_liquidated   || '>> ' || :old.total_amount_liquidated );

END IF;

END;
/