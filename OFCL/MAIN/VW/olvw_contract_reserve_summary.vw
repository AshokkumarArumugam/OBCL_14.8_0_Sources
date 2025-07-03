CREATE OR REPLACE VIEW OLVW_CONTRACT_RESERVE_SUMMARY 
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_contract_reserve_summary.vw
**
** Module      : OL
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
----------------------------------------------------------------------------------------------------
*/
/*
------------------------------------------------------------------
  **Created By         : Abhik Das
  **Date               : 11-Sep-2020
  **Change Description : Created to change the view for Loan Loss Reserve summary screen
  **SFR Number         : OBCL 14.1 Support Bug#30839014
  
  **Changed By         : Narendra Dhaker
  **Date               : 26-May-2021
  **Change Description : Product Access restriction
  **Search String      : Product Access restriction
  
  **Changed By         : Abhik Das
  **Date               : 04-Jun-2021
  **Change Description : Added authorization status to loan loss reserve summary screen
  **Search String      : OBCL_14.4_Support_Bug#32971202_Changes
------------------------------------------------------------------  
*/
SELECT C.CONTRACT_REF_NO,C.RESERVE_STATUS, C.RESERVE_TXN_AMT, C.CONTRACT_CCY,C.PREPAYMENT_PENALTY_AMOUNT,
C.VALUE_DATE,C.EVENT_SEQ_NO
,D.AUTH_STATUS --OBCL_14.4_Support_Bug#32971202_Changes
FROM OLTBS_CONTRACT_RESERVE C
,OLTBS_CONTRACT_EVENT_LOG D --OBCL_14.4_Support_Bug#32971202_Changes
WHERE (C.CONTRACT_REF_NO, C.EVENT_SEQ_NO) IN (
SELECT A.CONTRACT_REF_NO,
MAX(A.EVENT_SEQ_NO) FROM OLTBS_CONTRACT_RESERVE A
GROUP BY A.CONTRACT_REF_NO)
--Product Access restriction - Start
and exists (Select 1
	 From OLVW_USER_ACCESS_PRODUCTS
	 Where PRODUCT_CODE = (SELECT sypks_utils.get_product(C.CONTRACT_REF_NO) FROM DUAL)
      AND USER_ID = global.user_id)
--Product Access restriction - End
----OBCL_14.4_Support_Bug#32971202_Changes Starts----
AND C.CONTRACT_REF_NO = D.CONTRACT_REF_NO
AND C.EVENT_SEQ_NO = D.EVENT_SEQ_NO
-----OBCL_14.4_Support_Bug#32971202_Changes Ends-----
/
CREATE OR REPLACE SYNONYM olvws_contract_reserve_summary FOR olvw_contract_reserve_summary
/