CREATE OR REPLACE VIEW LBVW_RATEFIX_DETAIL_SUMMARY
/*-------------------------------------------------------------------------------------- 
**  
**  File Name :lbvw_ratefix_detail_summary.VW 
**  
**  Module    :LS-Loan Syndication and commitments
**  
**This source is part of the Oracle Banking Corporate Lending  Software Product. 
**Copyright © 2007 - 2018  Oracle and/or its affiliates.  All rights reserved.   
**No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
**in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
**or otherwise, translated in any language or computer language, without the prior written permission 
**of Oracle and/or its affiliates. 
**Oracle Financial Services Software Limited.
**Oracle Park, Off Western Express Highway,
**Goregaon (East), 
**Mumbai - 400 063, India.
**
** Changed By         : JayaramN	
** Date               : 24-May-2021
** Change Description : LBDIRTFX AND LBDIRAUT SCREEN-MAKER CANNOT VIEW RATE RESET DETAILS DURING AUTHORIZATION
** Search String      : Bug#32599971 
**
** Changed By         : Narendra Dhaker
** Date               : 25-May-2021
** Change Description : Product Access restriction
** Search String      : Product Access restriction
** 
** Changed By         : Divya J
** Date               : 05-Aug-2022
** Change Description : LBSIRTFX ALL RATE CHANGE EVENTS DISPLAYED IN SUMMARY SCREEN SHOW ONLY LATEST EVENT
** Search String      : OBCL_14.6_Bug#34463647 	
---------------------------------------------------------------------------------------
*/
(CONTRACT_REF_NO, COMPONENT, EVENT_SEQ_NO, ACTUAL_FIXING_DATE, RATE_FIXING_DATE, RATE_EFFECTIVE_START_DATE, RATE_EFFECTIVE_END_DATE, RATE_FIXED_STATUS, TENOR_TYPE, TENOR_VALUE, TENOR_UNIT, RATE_CODE, RATE, AUTH_STATUS, CONTRACT_STATUS, EVENT_CODE )
AS
(         
SELECT A.CONTRACT_REF_NO, 
       A.COMPONENT,
       A.EVENT_SEQ_NO,
       A.ACTUAL_FIXING_DATE,
       A.RATE_FIXING_DATE,
       A.RATE_EFFECTIVE_START_DATE,
       A.RATE_EFFECTIVE_END_DATE,
       A.RATE_FIXED_STATUS,
       A.TENOR_TYPE,
       A.TENOR_VALUE,
       A.TENOR_UNIT,
       A.RATE_CODE,
       A.RATE,
	   B.AUTH_STATUS,
       B.CONTRACT_STATUS,
	   B.EVENT_CODE
FROM   LBTBS_RATE_FIXING_DETAILS A , OLTB_CONTRACT_EVENT_LOG B
WHERE  A.RATE_EFFECTIVE_START_DATE = (SELECT MAX(C.RATE_EFFECTIVE_START_DATE) FROM LBTBS_RATE_FIXING_DETAILS C
                                      WHERE A.CONTRACT_REF_NO = C.CONTRACT_REF_NO
                                        AND A.COMPONENT = C.COMPONENT
                                        AND A.EVENT_SEQ_NO = C.EVENT_SEQ_NO )     
  AND A.CONTRACT_REF_NO = B.CONTRACT_REF_NO
  AND A.EVENT_SEQ_NO    = B.EVENT_SEQ_NO
  AND (SELECT sypks_utils.get_branch(A.CONTRACT_REF_NO) FROM DUAL) = GLOBAL.CURRENT_BRANCH
  --OBCL_14.6_Bug#34463647 Starts
  AND A.EVENT_SEQ_NO =  (SELECT MAX(D.EVENT_SEQ_NO) FROM LBTBS_RATE_FIXING_DETAILS D
                                      WHERE A.CONTRACT_REF_NO = D.CONTRACT_REF_NO
                                        AND A.COMPONENT = D.COMPONENT )
  --OBCL_14.6_Bug#34463647 Ends                                      
----Product Access restriction - Start
and exists (Select 1
	 From OLVW_USER_ACCESS_PRODUCTS
	 Where PRODUCT_CODE = (SELECT sypks_utils.get_product(A.CONTRACT_REF_NO) FROM DUAL)
   AND USER_ID = global.user_id)
--Product Access restriction - End
)
/
CREATE OR REPLACE SYNONYM LBVWS_RATEFIX_DETAIL_SUMMARY FOR LBVW_RATEFIX_DETAIL_SUMMARY
/