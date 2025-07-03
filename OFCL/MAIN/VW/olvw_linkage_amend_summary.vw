CREATE OR REPLACE FORCE VIEW olvw_linkage_amend_summary AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : olvw_linkage_amend_summary.vw
** Module       : LD
**
** This source is part of the Oracle Banking Corporate Lending  Software Product. 
** Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
** No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
** in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
** or otherwise, translated in any language or computer language, without the prior written permission 
** of Oracle and/or its affiliates. 
**
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East), 
** Mumbai - 400 063, India.

**Changed By         : Narendra Dhaker
**Date               : 26-May-2021
**Change Description : Product Access restriction
**Search String      : Product Access restriction
--------------------------------------------------------------------------------------------------*/
SELECT AUTH_STATUS,
       CONTRACT_STATUS,
       CONTRACT_REF_NO,
       BRANCH,
       COUNTERPARTY,
       LINKED_TO_REF,
       LINKAGE_TYPE,
       LINKED_AMOUNT,
       EXCHANGE_RATE,
       EVENT_SEQ_NO,
       EVENT_DATE,
       EVENT_CODE
  FROM (SELECT A.AUTH_STATUS,
               A.CONTRACT_STATUS,
               A.CONTRACT_REF_NO,
               A.BRANCH,
               A.COUNTERPARTY,
               B.LINKED_TO_REF,
               B.LINKAGE_TYPE,
               B.LINKED_AMOUNT,
               B.EXCHANGE_RATE,
               B.EVENT_SEQ_NO,
               C.EVENT_DATE,
               C.EVENT_CODE
          FROM oltbs_contract                A,
               oltbs_contract_link_amendment B,
               oltbs_contract_event_log      C
         WHERE A.PRODUCT_TYPE = 'L'
           AND A.CONTRACT_STATUS IN ('A', 'Y')
           AND B.CONTRACT_REF_NO = A.CONTRACT_REF_NO
           AND C.CONTRACT_REF_NO = A.CONTRACT_REF_NO
           AND C.EVENT_SEQ_NO = B.EVENT_SEQ_NO
           AND B.EVENT_SEQ_NO IN
               (SELECT Nvl(Max(Event_Seq_no), 0)
                  FROM oltbs_contract_link_amendment
                 WHERE CONTRACT_REF_NO = A.CONTRACT_REF_NO)
           AND A.MODULE_CODE = 'OL'
		   --Product Access restriction - Start
AND exists (Select 1
	 From OLVW_USER_ACCESS_PRODUCTS
	 Where PRODUCT_CODE = a.product_code --OBCL_14.8_CE_Length_Changes
      AND USER_ID = global.user_id)
--Product Access restriction - End
)
		   
		   
		   
 ORDER BY CONTRACT_REF_NO, EVENT_SEQ_NO
/
CREATE OR REPLACE SYNONYM olvws_linkage_amend_summary FOR olvw_linkage_amend_summary
/