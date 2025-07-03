CREATE OR REPLACE TRIGGER "TRG_LDTB_CONTRACT_ICCF_CALCC"         
/*----------------------------------------------------------------------------------------------------
**
** File Name : ol_tr_oltb_contract_iccf_calcc.TRG

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
BEFORE INSERT OR DELETE OR UPDATE ON OLTB_CONTRACT_ICCF_CALC
FOR EACH ROW
BEGIN
debug.pr_debug('OL','Inside the trigger on OLTB_CONTRACT_ICCF_CALC');
IF INSERTING
THEN
	debug.pr_debug('OL','**************LDTB_CONTRACT_ICCF_CALC************************* ');
	debug.pr_debug('OL','Inserting into OLTB_CONTRACT_ICCF_CALC ');
END IF;
IF DELETING
THEN
	debug.pr_debug('OL','******************LDTB_CONTRACT_ICCF_CALC********************* ');
	debug.pr_debug('OL','DELETING into OLTB_CONTRACT_ICCF_CALC');
END IF;
IF UPDATING
THEN
	debug.pr_debug('OL','**************LDTB_CONTRACT_ICCF_CALC************************* ');
	debug.pr_debug('OL','updating into OLTB_CONTRACT_ICCF_CALC ');
END IF;

debug.pr_debug('OL','CONTRACT_REF_NO      ='||:NEW.CONTRACT_REF_NO ||'~'||:OLD.CONTRACT_REF_NO);
debug.pr_debug('OL','COMPONENT      ='||:NEW.COMPONENT ||'~'||:OLD.COMPONENT);
debug.pr_debug('OL','START_DATE      ='||:NEW.START_DATE ||'~'||:OLD.START_DATE);
debug.pr_debug('OL','END_DATE      ='||:NEW.END_DATE ||'~'||:OLD.END_DATE);
debug.pr_debug('OL','END_DATE      ='||:NEW.END_DATE ||'~'||:OLD.END_DATE);
debug.pr_debug('OL','BASIS_AMOUNT      ='||:NEW.BASIS_AMOUNT ||'~'||:OLD.BASIS_AMOUNT);
debug.pr_debug('OL','RATE      ='||:NEW.RATE ||'~'||:OLD.RATE);
debug.pr_debug('OL','CALCULATED_AMOUNT      ='||:NEW.CALCULATED_AMOUNT||'~'||:OLD.CALCULATED_AMOUNT);
debug.pr_debug('OL','**************OLTB_CONTRACT_ICCF_CALC TRIGGER END************************* ');
END;
/