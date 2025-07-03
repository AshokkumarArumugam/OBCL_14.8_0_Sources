CREATE OR REPLACE force VIEW lfvw_contract_accr_fee ( CONTRACT_REF_NO, 
PRODUCT_CODE, COUNTERPARTY, CUSTOM_REF_NO, USER_DEFINED_STATUS, 
USER_REF_NO, CONTRACT_CCY,AUTH_STATUS,CONTRACT_STATUS,CUST_NAME
 ) AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : lfvw_contract_accr_fee.VW
**
** Module       : CORE ENTITIES
**
**	This source is part of the Oracle Banking Corporate Lending  Software Product.   
**	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
**	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
**	Oracle Financial Services Software Limited.
**	Oracle Park, Off Western Express Highway,
**	Goregaon (East), 
**	Mumbai - 400 063, India.
**
**
**  Changed By         : Pallavi R/Janki/Abhinav
**  Date               : 17-Jan-2020
**  Change Description : Done code changes for amortization fees to support for LB and FC modules.
**  Search String      : OBCL_14.4_LS_Adhoc_Fee Changes  

**  Changed By         : Vineeth T M
**  Date               : 13-Jan-2021
**  Change Description : Latest esn check not needed as data is queried from oltb_contract only.
**  Search String      : OBCL_14.4_SUPP_#32371709 changes

**Changed By         : Narendra Dhaker
**Date               : 26-May-2021
**Change Description : Product Access restriction
**Search String      : Product Access restriction

**Changed By         : Abhinav Kumar
**Date               : 12-Jul-2022
**Change Description : Adhoc fee Summary Showing Auth Status as UnAuth, even if the Last event is in Auth.
**Search String      : Bug#34365107

**Changed By         : Satheesh Seshan
**Date               : 01-Dec-2022
**Change Description : Added customer name to the view.
**Search String      : Bug#34718509
**-----------------------------------------------------------------------------------------------*/
SELECT DISTINCT C.CONTRACT_REF_NO,
                C.PRODUCT_CODE,
                C.COUNTERPARTY,
                C.CUSTOM_REF_NO,
                C.USER_DEFINED_STATUS,
                C.USER_REF_NO,				
                C.CONTRACT_CCY,
				--OBCL_14.4_LS_Adhoc_Fee Changes Starts
                --C.AUTH_STATUS, --Bug#34365107 --Commented code to fetch Auth status from oltb_contract_event_log for Latest event
                F.AUTH_STATUS, --Bug#34365107
                C.CONTRACT_STATUS
				--OBCL_14.4_LS_Adhoc_Fee Changes Ends
				,D.CUSTOMER_NAME1 CUST_NAME --Bug#34718509
  FROM OLTBS_CONTRACT C, LFTBS_CONTRACT_ACCR_FEE E
       ,OLTB_CONTRACT_EVENT_LOG F  --Bug#34365107
	   ,OLTMS_CUSTOMER D  --Bug#34718509
 WHERE C.CONTRACT_REF_NO = E.CONTRACT_REF_NO
   --AND C.LATEST_EVENT_SEQ_NO = E.EVENT_SEQ_NO--OBCL_14.4_SUPP_#32371709 changes
   --Bug#34365107 Changes Starts
   AND F.CONTRACT_REF_NO = E.CONTRACT_REF_NO
   AND C.COUNTERPARTY = D.CUSTOMER_NO --Bug#34718509
   AND F.EVENT_SEQ_NO = (SELECT MAX(G.EVENT_SEQ_NO) FROM OLTB_CONTRACT_EVENT_LOG G
                        WHERE   G.CONTRACT_REF_NO = E.CONTRACT_REF_NO
                          AND   NVL(G.REVERSED_EVENT_SEQ_NO,G.EVENT_SEQ_NO)= E.EVENT_SEQ_NO)
   --Bug#34365107 Changes Ends
   and c.branch = global.current_branch
   --Product Access restriction - Start
and exists (Select 1
	 From OLVW_USER_ACCESS_PRODUCTS
	 Where PRODUCT_CODE = c.product_code --OBCL_14.8_CE_Length_Changes
      AND USER_ID = global.user_id)
--Product Access restriction - End
/
create or replace synonym lfvws_contract_accr_fee for lfvw_contract_accr_fee
/