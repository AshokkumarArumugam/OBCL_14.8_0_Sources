CREATE OR REPLACE TRIGGER ol_trg_oltb_amount_due
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
**  Changed By         :Akhila Samson
**  Changed on         :27-Jun-2023
**  Change Description :Changing to editioning view name instead of synonym.
**  Search String      :Bug#35222052
*/
BEFORE INSERT OR DELETE OR UPDATE ON  --oltb_amount_due --Bug#35222052
OLTB_AMOUNT_DUE_CS --Bug#35222052
FOR EACH ROW
BEGIN
debug.pr_debug('OL','Inside the trigger on oltb_amount_due');
IF INSERTING
THEN
	debug.pr_debug('OL','Inserting into oltb_amount_due');
	debug.pr_debug('OL','Contract ref no '||:NEW.contract_ref_no);
	debug.pr_debug('OL','Component '||:NEW.component);
	debug.pr_debug('OL','Due date '||:NEW.due_date);
	debug.pr_debug('OL','Amount_due '||:NEW.amount_due);
	debug.pr_debug('OL','Amount_settled '||:NEW.amount_settled);
END IF;
IF DELETING
THEN
	debug.pr_debug('OL','Deleting from oltb_amount_due');
	debug.pr_debug('OL','Contract ref no '||:OLD.contract_ref_no);
	debug.pr_debug('OL','Component '||:OLD.component);
	debug.pr_debug('OL','Due date '||:OLD.due_date);
	debug.pr_debug('OL','Amount_due '||:OLD.amount_due);
	debug.pr_debug('OL','Amount_settled '||:OLD.amount_settled);
	debug.pr_debug('OL','Deleting from oltb_amount_due');
	debug.pr_debug('OL','Contract ref no '||:NEW.contract_ref_no);
	debug.pr_debug('OL','Component '||:NEW.component);
	debug.pr_debug('OL','Due date '||:NEW.due_date);
	debug.pr_debug('OL','Amount_due '||:NEW.amount_due);
	debug.pr_debug('OL','Amount_settled '||:NEW.amount_settled);
END IF;
IF UPDATING
THEN
	debug.pr_debug('OL','Updating the table oltb_amount_due');
	debug.pr_debug('OL','Contract ref no '||:NEW.contract_ref_no);
	debug.pr_debug('OL','New Component '||:NEW.component||'  Old Component '||:OLD.component);
	debug.pr_debug('OL','New Due date '||:NEW.due_date||'  Old Due date '||:OLD.due_date);
	debug.pr_debug('OL','New Amount_due '||:NEW.amount_due||'   Old Amound due '||:OLD.amount_due);
	debug.pr_debug('OL','New Amount settled '||:NEW.amount_settled||'  Old Amount settled '||:OLD.amount_settled);
END IF;
END;
/