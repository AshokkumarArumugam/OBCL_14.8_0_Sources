CREATE OR REPLACE VIEW OLVW_PMT_REQ_MASTER AS
/*
----------------------------------------------------------------------------------------------------
**
** File Name    : OLVW_PMT_REQ_MASTER.VW
** Module       : OL
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
**Changed By         : Guru
**Date               : 08-May-2020
**Change Description : To support MT210, new service was introduced. This has caused this view to return duplicate records. Added service code condition to resolve the duplicate records issue.
**Search String      : OBCL_14.4_MT210 Changes
*/
SELECT A.QUEUE_REF_NO,
       B.SEQ_NO,
       A.CONTRACT_REF_NO,
       B.PROCESS_STATUS,
       A.INTIATION_DATE,
       A.LATEST_EVENT_SEQ_NO,
       (SELECT EVENT_CODE
          FROM OLTB_CONTRACT_EVENT_LOG
         WHERE CONTRACT_REF_NO = A.CONTRACT_REF_NO
           AND EVENT_SEQ_NO = A.LATEST_EVENT_SEQ_NO) AS EVENT_CODE,
		--OBCL_14.4_MT210 Changes Starts
		/*   
       (SELECT PMNT_TXN_REF
          FROM OLTB_REQ_PMNTMASTER
         WHERE CONTRACT_REF_NO = A.CONTRACT_REF_NO
           AND LATEST_EVENT_SEQ_NO = A.LATEST_EVENT_SEQ_NO
           AND QUEUE_REF_NO = A.QUEUE_REF_NO
           AND DESTINATION_SOURCE = A.SOURCE_CODE) AS PMNT_TXN_REF,
		*/
	   E.PMNT_TXN_REF,
	   --OBCL_14.4_MT210 Changes Ends
       B.REQUEST_MSG,
       B.RESPONSE_MSG
  FROM OLTB_PMT_MASTER A, OLTB_PMT_EXTRNL_LOG B, OLTM_SERVICE_PARAMS C, OLTB_REQ_PMNTMASTER E
  WHERE B.QUEUE_REF_NO = A.QUEUE_REF_NO
  AND A.SOURCE_CODE = C.SOURCE_SYSTEM
  AND B.SEQ_NO = (
					SELECT MAX(SEQ_NO)
                    FROM OLTB_PMT_EXTRNL_LOG D
                    WHERE D.QUEUE_REF_NO = A.QUEUE_REF_NO
				)
  --OBCL_14.4_MT210 Changes Starts				
  AND E.CONTRACT_REF_NO = A.CONTRACT_REF_NO
  AND E.LATEST_EVENT_SEQ_NO = A.LATEST_EVENT_SEQ_NO
  AND E.QUEUE_REF_NO = A.QUEUE_REF_NO
  AND E.DESTINATION_SOURCE = A.SOURCE_CODE 
  AND E.SERVICE_CODE = C.SERVICE_CODE
  --OBCL_14.4_MT210 Changes Ends
  ORDER BY A.CONTRACT_REF_NO, B.SEQ_NO
/
CREATE OR REPLACE SYNONYM OLVWS_PMT_REQ_MASTER FOR OLVW_PMT_REQ_MASTER
/