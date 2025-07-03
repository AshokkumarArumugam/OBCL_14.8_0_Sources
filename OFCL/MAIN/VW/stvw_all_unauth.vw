CREATE OR REPLACE VIEW stvw_all_unauth ( 
					BRANCH_CODE,
					FUNCTION_ID,
					LANGUAGE_CODE,
					OBJECT_DESC,
					KEY_ID,
					MT,
					EVENT,
					USER_ID,
					REC_LOG_ROWID
) AS
 /*
----------------------------------------------------------------------------------------------------
This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
17-MAY-2002 FCC4.0 JUNE 2002 Changes for CITIPLC
New view created,it will have data for all Maintenance forms
17-APR-2003 FCC4.2 April 2003 Sfr 358, added missing column , rec_log_rowid
18-AUG-2004 FCC 4.6 Sep04 Retro (India) Changes Included key_id column
*/
SELECT distinct 			branch_code, 
					r.function_id, 
					lang_code language_code,
					(main_menu || ' ' ||sub_menu_1 || ' ' || sub_menu_2) object_desc,r.key_id,
					'',
					DECODE(RECORD_STAT,'O','Open','C','Closed','N','New','M','Modify'),
					maker_id ,
					r.rowid
FROM sttbs_record_log r, smtbs_function_description f
WHERE AUTH_STAT = 'U' AND r.FUNCTION_ID = f.function_id 
/

Create OR replace Synonym STVWS_ALL_UNAUTH For stvw_all_unauth
/