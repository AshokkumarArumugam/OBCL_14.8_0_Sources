CREATE OR REPLACE TRIGGER ol_oltr_asc_ext_in BEFORE INSERT ON OLTB_ASC_EXT_IN FOR EACH ROW
/*----------------------------------------------------------------------------------------------------
**
** File Name		: ol_oltr_asc_ext_in.trg
**
** Module		: IF
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
/*---------------------------CHANGE HISTORY -----------------------------------
11-DEC-2012 New one for EMEA
18-FEB-2013 EURCITIPLC#16440 To update FLEXCORE CORR_ID
--------------------------------------------------------------------------------
*/
DECLARE
	l_seq				NUMBER;
	l_sql_stmt			VARCHAR2(500);
	--l_branch_swift			oltms_branch.swift_addr%TYPE;
	l_branch			oltms_branch.branch_code%TYPE;
	l_source 			VARCHAR2(16);

BEGIN

	l_source := :new.source ;

	BEGIN
		l_sql_stmt	:='SELECT TRSQ_IFASCEXI.nextval FROM dual';

		EXECUTE IMMEDIATE l_sql_stmt INTO l_seq;

		:new.seq_no	:= l_seq;
		
		:new.job_seq_no	:= 1;
		
		:new.msg_intime	:= SYSDATE;
	EXCEPTION
	WHEN NO_DATA_FOUND THEN
		NULL;
	END;
	--EURCITIPLC#16440 starts
	IF l_source ='FLEXCORE'
	THEN
		:new.corr_id:='ASCIFPRODPROCESSOR';
	END IF;
	--EURCITIPLC#16440 ends
EXCEPTION
WHEN OTHERS THEN
	DEBUG.PR_DEBUG('**', '!!! Exception in Trigger ol_oltr_asc_ext_in'||l_source||'~' || SQLERRM);
	DEBUG.PR_DEBUG('OL', '!!! Exception in Trigger ol_oltr_asc_ext_in'||l_source||'~' || SQLERRM);
	RAISE;
END;
/