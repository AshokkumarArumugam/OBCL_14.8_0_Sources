CREATE OR REPLACE FORCE VIEW olvw_pending_items_all AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_pending_items_all.vw
**
** Module      : OL
**
**This source is part of the Oracle Banking Corporate Lending  Software Product. 
**Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
**No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
**in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
**or otherwise, translated in any language or computer language, without the prior written permission 
**of Oracle and/or its affiliates. 
**Oracle Financial Services Software Limited.
**Oracle Park, Off Western Express Highway,
**Goregaon (East), 
**Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
/*
  **Changed By         : Shishirkumar Aithal
  **Date               : 28-Nov-2017
  **Change Description : BUG 26932862 - OL-OLSVWPNT EOD IS NOT STOPPED EVEN WHEN MAINTENANCES ARE IN UNAUTHORIZED STATUS
  **Search String      : Bug#26932862
  
  **Changed By         : Baljinder Singh
  **Date               : 16-Apr-2019
  **Change Description : BUG 29492963 - OL-OLSVWPNT will list unprocessed STP contracts too
  **Search String      : 29492963 
*/
SELECT    DISTINCT  (SELECT sypks_utils.get_branch(A.CONTRACT_REF_NO) FROM DUAL) br,-- PLC4001021 Tuned the first query for performance ADDED DISTINCT
              a.module md,
                    a.contract_ref_no rn,
       '' mt,
       A.EVENT_CODE ev,
       maker_id id,
            '' dp,
            'CONTRACT' ty
  FROM   oltbs_contract_event_log a
  WHERE
      a.auth_status   =   'U' and --CITIUS Till#1400 start
      NVL(a.contract_status,'X') <> 'H' -- 20-JUL-2010 CITIUS-LS#7416 CHANGES
	--OBCL_14.5_24_7 Changes starts
	and not exists (select 1 from oltbs_24x7_process_contracts 
											where CONTRACT_REF_NO = a.contract_ref_no
											 and PROCESS_STATUS in ('U'))
	--OBCL_14.5_24_7 Changes ends
UNION ALL
  SELECT   branch_code br,
           'MA' md,
             --object_desc rn,--Bug#26932862
			 function_id rn , --Bug#26932862
             mt,
             EVENT EV,
             USER_ID ID,
             NULL,
             'MAINTENCE' ty
  FROM      OLVWS_UNAUTH_FORMS
UNION ALL --FCC 4.6.1 2005 SGDASPAC SFR ASG463
  SELECT "BR","MD","RN","MT","EV","ID",NULL,'MESSAGE' ty from OLVWS_PENDING_ITEMS_MS
UNION ALL
SELECT LD_BRANCH BR, 'LB' MD ,Borr_ref_no RN, '' MT, LS_EVENT_CODE EV, MAKER_ID ID, '' DP , 'STP CONTRACT' TY  FROM lbtb_stp_interface_browser WHERE PROCESSING_STATUS = 'H'   --29492963
/
CREATE OR REPLACE SYNONYM olvws_pending_items_all FOR olvw_pending_items_all
/