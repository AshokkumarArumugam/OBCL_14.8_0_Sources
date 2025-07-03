CREATE OR REPLACE VIEW LBVW_BORR_PROD_LIMIT_SUMMARY AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : LBVW_BORR_PROD_LIMIT_SUMMARY.VW
**
** Module       : LOANS and SYNDICATION											
**
This source is part of the Oracle Banking Corporate Lending  Software Product. 
Copyright © 2007 - 2020  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
or otherwise, translated in any language or computer language, without the prior written permission 
of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.

**Changed By         : Sowmya Bitra
**Date               : 09-Oct-2020
**Change Description : Added view required for summary screen for LBDBRLMT

**Changed By         : Narendra Dhaker
**Date               : 20-May-2021
**Change Description : Product Access restriction
**Search String      : Product Access restriction

**Changed By         : Jayaram N
**Date               : 08-Feb-2022
**Change Description : CUSTOMER NAME IS NOT AVAILABLE IN SEARCH CRITERIA
**Search String      : Bug#34718509
-----------------------------------------------------------------------------------------------
*/
(
  SELECT a.contract_ref_no ,
         a.counterparty ,
         a.product_code ,
         a.branch,
		--34718509  start 
         a.auth_status,
         a.contract_status,
         c.CUSTOMER_NAME1 CUST_NAME 
         --34718509  end		 
    FROM OLTBS_CONTRACT a,
         LBVWS_BORR_SUBLIMIT b,
		 OLTMS_CUSTOMER C --34718509
   WHERE a.contract_ref_no=b.tranche_ref_no
   AND A.COUNTERPARTY = C.CUSTOMER_NO --34718509
----Product Access restriction - Start
and exists (Select 1
	 From OLVW_USER_ACCESS_PRODUCTS
	 Where PRODUCT_CODE = a.product_code --OBCL_14.8_CE_Length_Changes
   AND USER_ID = global.user_id)
--Product Access restriction - End     
)
/
create or replace synonym LBVWS_BORR_PROD_LIMIT_SUMMARY for LBVW_BORR_PROD_LIMIT_SUMMARY
/