CREATE OR REPLACE TRIGGER ol_trg_oltb_contract_handoff
/*-----------------------------------------------------------------------------------------
**
** File Name	: ol_trg_oltb_contract_handoff.TRG
**
** Module	: IF
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
/* CHANGE HISTORY
17-Jun-2008 FLEXCUBE V.CL Release 7.4 BAU MM Intellect Interface changes
*/


AFTER update of HOFF_STATUS ON OLTB_CONTRACT_HANDOFF
FOR EACH ROW
BEGIN
     IF UPDATING AND :NEW.HOFF_STATUS <> :OLD.HOFF_STATUS
     THEN
	 DEBUG.PR_DEBUG('OL', 'inside the trigger OLTB_CONTRACT_HANDOFF'||:NEW.CONTRACT_REF_NO);
	 DEBUG.PR_DEBUG('OL', ':NEW.HOFF_STATUS ' || :NEW.HOFF_STATUS);
	 DEBUG.PR_DEBUG('OL', ':OLD.HOFF_STATUS ' || :OLD.HOFF_STATUS);

	 UPDATE oltbs_contract_master
	 SET handoff_status = DECODE(:NEW.HOFF_STATUS,'U','H',:NEW.HOFF_STATUS),
	  user_ref_no = NVL(:NEW.EXTERNAL_REF_NO,user_ref_no)
	 WHERE contract_ref_no = :NEW.CONTRACT_REF_NO
	 AND VERSION_NO = (
			SELECT MAX(VERSION_NO)
			FROM oltbs_contract_master
			 WHERE contract_ref_no = :NEW.CONTRACT_REF_NO);
     END IF;
EXCEPTION
	WHEN OTHERS THEN
		DEBUG.PR_DEBUG('OL', 'Exception in Trigger ol_trg_oltb_contract_handoff - ' || SQLERRM);
END;
/