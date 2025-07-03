CREATE OR REPLACE FORCE VIEW LBVW_AMND_FEE_SUMMARY AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : LBVW_AMND_FEE_SUMMARY.VW
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
**Change Description : Added view required for summary screen for LBDFEAMD

**Changed By         : Narendra Dhaker
**Date               : 20-May-2021
**Change Description : Product Access restriction
**Search String      : Product Access restriction

**Changed By         : Jayaram N
**Date               : 08-Jun-2021
**Change Description : View change to include facility Contract 
**Search String      : Bug#32971004

**Changed By         : Satheesh Seshan
**Date               : 01-Dec-2022
**Change Description : Added customer name to the view.
**Search String      : Bug#34718509

**Changed By         : Rashmi BV
**Date               : 18-Nov-2024
**Change Description : Summary screen show multiple rows
**Search String      : Bug#37283474
-----------------------------------------------------------------------------------------------
*/
(
  SELECT  a.contract_ref_no,    
          a.auth_status,
          a.CONTRACT_STATUS,
          b.branch,
          b.module_code, 
          b.product_code,
          b.counterparty,
		  c.customer_name1 CUST_NAME --Bug#34718509
    FROM  OLTB_CONTRACT_EVENT_LOG a,
          OLTBS_CONTRACT b,
		  OLTMS_CUSTOMER c --Bug#34718509
   WHERE  a.contract_ref_no=b.contract_ref_no
     --AND  b.module_code='LB' --Bug#32971004:Commented
	 AND  b.module_code in ('LB','FC') --Bug#32971004:Modified
     AND  a.event_code = 'FAMD'
	AND b.branch=global.current_branch
	 AND b.counterparty = c.customer_no  ----Bug#34718509
	 --Bug#37283474 starts
     AND a.event_seq_no = (SELECT d.event_seq_no
                       from OLTB_CONTRACT_EVENT_LOG d
                       WHERE d.contract_ref_no=a.contract_ref_no
                       AND d.Event_Code = a.event_code
                       ORDER BY 1 DESC
                       fetch first 1 rows only)                 
    --Bug#37283474 ends 
----Product Access restriction - Start
and exists (Select 1
	 From OLVW_USER_ACCESS_PRODUCTS
	 Where PRODUCT_CODE = b.product_code --OBCL_14.8_CE_Length_Changes
   AND USER_ID = global.user_id)
--Product Access restriction - End	
)
/
create or replace synonym LBVWS_AMND_FEE_SUMMARY for LBVW_AMND_FEE_SUMMARY
/