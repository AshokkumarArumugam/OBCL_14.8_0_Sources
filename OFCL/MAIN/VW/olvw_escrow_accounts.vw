CREATE OR REPLACE FORCE VIEW olvw_escrow_accounts
AS
/*
----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_escrow_accounts.VW
**
** Module	: LD
**
**  This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
**
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
**
 CHANGE HISTORY
  **Changed By         : Gomathi G
  **Date               : 21-MAY-2020
  **Change Description : Subquery used in the IN Clause might return NULL if there are no disallowed products. 
						 Replaced with NOT EXISTS clause as it would handle NULL condition and also to adhere to better coding standards practice.
  **Search String      : OBCL_14.3_SUPPORT_Bug#31385163 CHANGES
-------------------------------------- Change history ---------------------------------------------
Change History
18-MAY-2012 Flexcube V.CL Release 7.11,FS Volume-01 Tag06 Changes : New view created to get all escrow ACCOUNTS.
04-JUL-2012 Flexcube V.CL Release 7.11 ITR1 SFR#8 Changes : Relaxed validation of linking escriw ACCOUNTS of ESC3 type.
**															If the contract status is not active, uninitiated, hold the escrow accoutns can linked again.
18-SEP-2012 CITIUS#14892 Changes : Escrow type account are not visible on the contract line.
12-JUN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16953 Changes, ESC3 ACCOUNTS are not appearing in the contract online screens, year in copyright clause changed
*/
SELECT a.AC_GL_NO,
       a.AC_GL_DESC,
       a.BRANCH_CODE,  
       DECODE(a.AC_OR_GL,
              'A',
              (SELECT field_val
                 FROM CSTMS_UDF_VALS
                WHERE function_id = 'STDCUSAC'
                  AND field_name = 'ESCROWTYPE'
                  --18-SEP-2012 CITIUS#14892 Changes start here
                  AND rec_key like a.BRANCH_CODE || '~' || a.AC_GL_NO || '~'),  --12-JUN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16953 Changes here (uncommented)
                  /* AND rec_key like a.branch_code || '~' || a.ac_gl_no || '~'||a.cust_no), */ --12-JUN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16953 Changes here (commented)
                  --18-SEP-2012 CITIUS#14892 Changes end here
              'G',
              (SELECT field_val
                 FROM CSTMS_UDF_VALS
                WHERE function_id = 'GLDCHACT'
                  AND field_name = 'ESCROWTYPE'
                  AND rec_key like a.AC_GL_NO || '~')) ESCROW_TYPE
  --FROM oltbs_account_base a
  FROM oltbs_account a
 WHERE a.AUTH_STAT = 'A'
   AND a.AC_GL_REC_STATUS = 'O'
  --OBCL_14.3_SUPPORT_BUG#31381563 CHANGES STARTS
   AND /*a.AC_GL_NO NOT IN (
						 --04-JUL-2012 Flexcube V.CL Release 7.11 ITR1 SFR#8 Changes Starts
						 --SELECT ac_gl_no
                         --  FROM oltbs_contract_escrow_linkages
                         --  WHERE escrow_type = 'ESC3'
						  SELECT ac_gl_no
                            FROM oltbs_contract_escrow_linkages E,oltbs_contract C
                           WHERE E.escrow_type = 'ESC3'
                             AND E.contract_ref_no = C.contract_ref_no
                             AND C.contract_status in ('A','H','Y')
						 --04-JUL-2012 Flexcube V.CL Release 7.11 ITR1 SFR#8 Changes Ends
						  )*/
		NOT EXISTS (
		             SELECT 1
                            FROM oltbs_contract_escrow_linkages E,oltbs_contract C
                           WHERE E.escrow_type = 'ESC3'
                             AND E.contract_ref_no = C.contract_ref_no
                             AND C.contract_status in ('A','H','Y')
							 AND E.ac_gl_no = a.AC_GL_NO
					)
     --OBCL_14.3_SUPPORT_BUG#31381563  CHANGES ENDS					
   AND DECODE(a.AC_OR_GL,
              'A',
              (SELECT field_val
                 FROM CSTMS_UDF_VALS
                WHERE function_id = 'STDCUSAC'
                  AND field_name = 'ESCROWTYPE'
                  --18-SEP-2012 CITIUS#14892 Changes start here
                  AND rec_key like a.BRANCH_CODE || '~' || a.AC_GL_NO || '~'), --12-JUN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16953 Changes here (uncommented)
                  /*AND rec_key like a.branch_code || '~' || a.ac_gl_no || '~'||a.cust_no), */ --12-JUN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16953 Changes here (commented)
                  --18-SEP-2012 CITIUS#14892 Changes end here
              'G',
              (SELECT field_val
                 FROM CSTMS_UDF_VALS
                WHERE function_id = 'GLDCHACT'
                  AND field_name = 'ESCROWTYPE'
                  AND rec_key like a.AC_GL_NO || '~')) IS NOT NULL 
/
CREATE OR REPLACE SYNONYM olvws_escrow_accounts FOR olvw_escrow_accounts
/