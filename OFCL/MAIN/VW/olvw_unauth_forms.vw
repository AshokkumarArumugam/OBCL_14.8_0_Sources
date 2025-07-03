CREATE OR REPLACE FORCE VIEW olvw_unauth_forms ( BRANCH_CODE, 
BRANCH_MODULE, --BUG#34981621
 FUNCTION_ID, LANGUAGE_CODE, OBJECT_DESC,MT,EVENT,USER_ID )
AS
/*----------------------------------------------------------------------------------------------------
File : olvw_unauth_forms.vw
This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
**
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
  ** CHANGE HISTORY
  ** Changed  By        : Kirandeep Kaur
  ** Changed  Dt        : 09-June-2017
  **Change Description  : Added condition for LANGUAGE_CODE
  **Search String       :BUG#26165783 
  ** Changed  By        : Chandra Achuta
  ** Changed  Dt        : 11-JUL-2018
  **Change Description  : Added condition for not checking the tanking required flag records in sttbs_record_log table
  **Serach String       : BUG#28292644
  
  ** Changed  By        : Abhinav Bhasker
  ** Changed  Dt        : 25-JAN-2023
  **Change Description  : Included Branch Module
  **Serach String       : BUG#34981621
  
  ** Changed  By        : Jayaram N
  ** Changed  Dt        : 15-Nov-2023
  **Change Description  : CFDRFRRT UNAUTHORIZED ENTRIES NOT VISIBLE IN PENDING TRANSACTIONS
  **Serach String       : BUG#36061109
  
  ** Changed  By        : Jayaram N
  ** Changed  Dt        : 15-Nov-2023
  **Change Description  : CFDRFRRT UNAUTHORIZED ENTRIES NOT VISIBLE IN PENDING TRANSACTIONS ( Reference no column was showing null in summary instead of functon id)
  **Serach String       : BUG#36061109_1
----------------------------------------------------------------------------------------------------
*/
(
SELECT distinct branch_code,
						--Bug#36061109_1:Changes Starts here
                         /* r.function_id,
						 f.BRANCH_MODULE, --BUG#34981621 */ 
						 f.BRANCH_MODULE,
						 r.function_id ,
						--Bug#36061109_1:Changes Ends here 
                         --'' language_code,--FCC 4.6 SEP 2004 PLNCITI RETRO Changes - Poland doesn't want the 4.2 tuning change
                         lang_code language_code, --Reverted back this change -- FCC 4.2 RETRO Tuned query for performance PLC4001021
				 --FLEXCUBE V.CL Release 7.3 ITR2 SFR#65, Retro Changes CITIUS-LS-674 starts
 			       --r.function_id object_desc, -- (main_menu || ' ' ||sub_menu_1 || ' ' || sub_menu_2) FCC 4.2 RETRO Tuned query for performance PLC4001021
			       --CITIUS-LS#5680,starts
			       --(main_menu || ' ' ||sub_menu_1 || ' ' || sub_menu_2)object_desc,
			      decode (r.function_id, 'OLDREPRC',(main_menu || ' ' ||sub_menu_1 || ' ' || sub_menu_2)||' ' ||cspke_misc.fn_getparam(r.key_id,3,'~'),
				   (main_menu || ' ' ||sub_menu_1 || ' ' || sub_menu_2))object_desc,			       
			       --CITIUS-LS#5680,Ends
				 --FLEXCUBE V.CL Release 7.3 ITR2 SFR#65, Retro Changes CITIUS-LS-674 ends
                         '',
                         DECODE(RECORD_STAT,'O','Open','C','Closed','N','New','M','Modify'),
                         maker_id 
FROM 		sttbs_record_log r  , smtbs_function_description f
--WHERE		 AUTH_STAT = 'U'   AND r.FUNCTION_ID = f.function_id   --BUG#28292644  code commented
WHERE     ( AUTH_STAT = 'U' AND NVL(TANKING_STATUS,'N') <> 'T') AND r.FUNCTION_ID = f.function_id  --BUG#28292644  TANKING_STATUS code added 
 AND GLOBAL.lang = f.lang_code -- BUG#26165783 Added
 -- AND EXISTS (SELECT 1 FROM smtb_menu WHERE FUNCTION_ID = r.FUNCTION_ID AND module_group_id = 'FCCPLN' ) --BUG#28292644  code added --Bug#36061109:Commented
  AND EXISTS (SELECT 1 FROM smtb_menu WHERE FUNCTION_ID = r.FUNCTION_ID AND NVL(module_group_id,'FCCOMN') in ( 'FCCPLN','FCCOMN','FCSMS' ) ) --Bug#36061109:Added
)
--FCC 4.4 DEC 2003 TRLCITI TIL#32 Union of Records from cavw_pending_items added.
/
Create OR REPLACE Synonym olvws_unauth_forms For olvw_unauth_forms
/