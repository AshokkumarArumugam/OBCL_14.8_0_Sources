CREATE OR REPLACE TRIGGER "LDTR_UPLOAD_ADJUSTMENT"         
/*----------------------------------------------------------------------------------------------------
**
** File Name : ol_oltr_upload_adjustment.TRG

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
BEFORE DELETE OR INSERT
ON OLTB_UPLOAD_ADJUSTMENT
REFERENCING NEW AS New OLD AS Old
FOR EACH ROW
BEGIN
	IF INSERTING
	THEN
		debug.pr_debug('OL','ol_oltr_upload_adjustment INSERTING '||
			:new.contract_ref_no||'~'||
			:new.batch_no||'~'||
			:new.book_date||'~'||
			:new.serial_no
			);

	ELSIF DELETING
	THEN
		debug.pr_debug('OL','ol_oltr_contract_iccf_calc DELETING A ROW'||
			:old.contract_ref_no||'~'||
			:old.batch_no||'~'||
			:old.book_date||'~'||
			:old.serial_no
			);
	END IF;
EXCEPTION
     WHEN OTHERS THEN
       NULL;
END ol_oltr_upload_adjustment;
/