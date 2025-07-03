Create or replace trigger ol_trg_oltb_intf
/*----------------------------------------------------------------------------------------------------
**
** File Name    : ol_trg_oltb_intf.trg
**
** Module       : INTERFACE
**
**	This source is part of the Oracle Banking Corporate Lending  Software Product.   
**	Copyright © 2007 - 2018  Oracle and/or its affiliates.  All rights reserved.   
**	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form 
**  or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated
**  in any language or computer language, without the prior written permission of Oracle and/or its affiliates.
**	Oracle Financial Services Software Limited.
**	Oracle Park, Off Western Express Highway,
**	Goregaon (East), 
**	Mumbai - 400 063, India.

----------------------------------------------------------------------------------------------------
*/

-- Trigger refined to improve the performance during the LC Eod.
after insert or update on OLTB_CONTRACT
for each row  
DECLARE
 l_branch_code sttm_core_branch.branch_code%TYPE;
	L_MODULE_ID   VARCHAR2(2);
	L_IDENTIFIER  VARCHAR2(30);
	L_EVENT       VARCHAR2(10);
	L_AUTH_STAT   VARCHAR2(1);
BEGIN
null;
/*
	IF ((INSERTING AND (:NEW.AUTH_STATUS='A')) OR (UPDATING AND ((:OLD.AUTH_STATUS='U') AND (:NEW.AUTH_STATUS='A'))))
			 AND :NEW.CONTRACT_STATUS <>'H' AND :NEW.CURR_EVENT_CODE NOT IN ('ACCR','CALC')
	THEN
		L_BRANCH_CODE := :NEW.BRANCH;
		L_MODULE_ID := :NEW.MODULE_CODE;
		L_IDENTIFIER := '~'||:NEW.CONTRACT_REF_NO||'~'||:NEW.LATEST_EVENT_SEQ_NO||'~';
		L_EVENT := :NEW.CURR_EVENT_CODE;
		L_AUTH_STAT := :NEW.AUTH_STATUS;
		INSERT into oltbs_out_details values (L_BRANCH_CODE,L_MODULE_ID,'',
							  L_IDENTIFIER,L_EVENT,l_auth_stat,'U' );		
	END IF;
*/
EXCEPTION
	WHEN OTHERS THEN
		DEBUG.PR_DEBUG('OL', 'Exception in Trigger ol_trg_oltb_intf - ' || SQLERRM);
END;
/