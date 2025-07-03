CREATE OR REPLACE TRIGGER "TRG_LDTB_CONTRACT_LIQ_SUMMARY"
/*----------------------------------------------------------------------------------------------------
**
** File Name : ol_oltb_contract_liq_summary.TRG

** Module      : LD
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
         
BEFORE INSERT OR DELETE OR UPDATE ON OLTB_CONTRACT_LIQ_SUMMARY
FOR EACH ROW
BEGIN
debug.pr_debug('OL','Inside the trigger on OLTB_CONTRACT_LIQ_SUMMARY');
IF INSERTING
THEN
	debug.pr_debug('OL','******************LDTB_CONTRACT_LIQ_SUMMARY********************* ');
	debug.pr_debug('OL','inserting into OLTB_CONTRACT_LIQ_SUMMARY ');
END IF;
IF DELETING
THEN
	debug.pr_debug('OL','******************LDTB_CONTRACT_LIQ_SUMMARY********************* ');
	debug.pr_debug('OL','deleting into OLTB_CONTRACT_LIQ_SUMMARY ');
END IF;
IF UPDATING
THEN
	debug.pr_debug('OL','**************LDTB_CONTRACT_LIQ_SUMMARY************************* ');
	debug.pr_debug('OL','updating into OLTB_CONTRACT_LIQ_SUMMARY ');
END IF;
	debug.pr_debug('OL','**************LDTB_CONTRACT_LIQ_SUMMARY************************* ');
	debug.pr_debug('OL','Payment_status      ='||:NEW.Payment_status ||'~'||:OLD.Payment_status);
	debug.pr_debug('OL','CONTRACT_REF_NO    ='||:NEW.CONTRACT_REF_NO||'~'||:OLD.CONTRACT_REF_NO);
	debug.pr_debug('OL','value_date    ='||:NEW.value_date||'~'||:OLD.value_date);
	debug.pr_debug('OL','EVENT_SEQ_NO    ='||:NEW.EVENT_SEQ_NO||'~'||:OLD.EVENT_SEQ_NO);
	debug.pr_debug('OL','total_paid    ='||:NEW.total_paid||'~'||:OLD.total_paid);
	debug.pr_debug('OL','*************************************** ');
END;
/