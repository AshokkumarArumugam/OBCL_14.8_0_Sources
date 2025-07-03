CREATE OR REPLACE FORCE VIEW LBVW_PYMNT_SMRY AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : lbvw_pymnt_smry.VW
**
** Module       : LOANS and SYNDICATION											
**
This source is part of the Oracle Banking Corporate Lending  Software Product. 
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
or otherwise, translated in any language or computer language, without the prior written permission 
of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.

**  Changed By         : Vineeth T M
**  Date               : 13-Jan-2021
**  Change Description : Latest esn check is needed so that multiple rows are not picked for same contract.
**  Search String      : OBCL_14.4_SUPP_#32375281 Changes

**  Changed By         : Narendra Dhaker
**  Date               : 20-May-2021
**  Change Description : Product Access restriction
**  Search String      : Product Access restriction

**  Changed By         : Satheesh Seshan
**  Date               : 01-Dec-2022
**  Change Description : Added customer name to the view.
**  Search String      : Bug#34718509

**  Changed By         : Akhila Samson
**  Date               : 12-Dec-2024
**  Change Description : Added payment_Status to the view.
**  Search String      : Bug#37335197
-----------------------------------------------------------------------------------------------
*/
SELECT a.contract_ref_no CONTRACT_REF_NO,
       a.event_seq_no EVENTSEQNO,
       b.counterparty CPTY,
       b.user_defined_status STATUS,
       b.contract_ccy CCY,
       a.value_date VALDT,
       a.total_paid TOTPAID,
       a.limit_date LIMITDT,
       a.discount_rate DISCRATE,
       a.limit_amount LIMITAMT,
       b.auth_status AUTHSTATUS,
       b.user_ref_no USERREFNO,
       b.book_date BOOKDATE,
       b.BRANCH BRANCH,
       b.LATEST_EVENT_SEQ_NO LATEVNTSEQNO,
       b.CONTRACT_STATUS CONTRACTSTATUS,
       b.MODULE_CODE MODULECODE,
       b.PRODUCT_CODE PRODCODE,
	   c.customer_name1 CUST_NAME  --Bug#34718509
	   ,a.payment_Status PAYMENTSTATUS  --Bug#37335197
  FROM oltbs_contract_liq_summary a,
       OLTB_CONTRACT              b,
	   OLTMS_CUSTOMER 			  c  --Bug#34718509
 WHERE b.contract_ref_no = a.contract_ref_no
 AND b.module_code='LB'
 AND b.counterparty = c.customer_no  --Bug#34718509
 --OBCL_14.4_SUPP_#32375281 Changes start
 AND a.EVENT_SEQ_NO IN
           (SELECT MAX(K.EVENT_SEQ_NO)
              FROM OLTB_CONTRACT_LIQ K, OLTBS_CONTRACT_EVENT_LOG L
             WHERE K.CONTRACT_REF_NO = L.CONTRACT_REF_NO
               AND K.CONTRACT_REF_NO = a.contract_ref_no
               AND K.EVENT_SEQ_NO = L.EVENT_SEQ_NO
               AND L.EVENT_CODE <> 'ROLL')
----Product Access restriction - Start
and exists (Select 1
	 From OLVW_USER_ACCESS_PRODUCTS
	 Where PRODUCT_CODE = b.product_code --OBCL_14.8_CE_Length_Changes
   AND USER_ID = global.user_id)
--Product Access restriction - End
 --OBCL_14.4_SUPP_#32375281 Changes end
/
create or replace synonym LBVWS_PYMNT_SMRY for lbvw_pymnt_smry
/