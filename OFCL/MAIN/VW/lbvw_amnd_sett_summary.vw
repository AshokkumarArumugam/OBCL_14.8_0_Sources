create or replace view lbvw_amnd_sett_summary as
/*----------------------------------------------------------------------------------------------------
**
** File Name    : LBVW_AMND_SETT_SUMMARY.VW
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

	Changed By         : Narendra Dhaker
	Date               : 20-May-2021
	Change Description : Product Access restriction
	Search String      : Product Access restriction
	
	Changed By         : Rahul Garg
	Date               : 26-Jul-2022
	Change Description : ADDITION OF MULTI BRANCH CONDITION IN SUMMARY SCREEN
	Search String      : Bug#34422232

	Changed By         : Vineeth T M
	Date               : 02-Dec-2022
	Change Description : Added customer name
	Search String      : Bug#34718509
	
	Changed By         : Rahul Garg
	Date               : 20-Apr-2023
	Change Description : Restricting the liquidated and Reversed record to show on summary screen as those are restricted on main screen as well 
						and add condition to not show the duplicate record for a contract.
	Search String      : Bug#35302166	
----------------------------------------------------------------------------------------------------
*/
  SELECT  a.contract_ref_no,    
          --Bug#34718509 starts
		  --a.auth_status,
          --a.CONTRACT_STATUS,
          b.auth_status,
          b.CONTRACT_STATUS,
		  --Bug#34718509 ends
          b.branch,
          b.module_code, 
          b.product_code,
          b.counterparty,
          C.CUSTOMER_NAME1 CUST_NAME --Bug#34718509
    FROM  OLTB_CONTRACT_EVENT_LOG a,
          OLTBS_CONTRACT b,
          OLTMS_CUSTOMER C  --Bug#34718509
   WHERE  a.contract_ref_no=b.contract_ref_no
      AND b.module_code='LB'
	  AND b.contract_status NOT IN ( 'L', 'V' ) -- Added for Bug#35302166
--	  AND b.branch=global.current_branch  -- Commented for Bug#34422232
      AND a.event_code = 'SAMD'
	  AND a.event_seq_no = (SELECT MAX(Event_Seq_No)
                            FROM OLTB_CONTRACT_EVENT_LOG d
                            WHERE d.Contract_Ref_No = a.contract_ref_no
                            AND d.Event_Code = a.event_code)    -- Added for Bug#35302166
	  ----Product Access restriction - Start
    AND b.COUNTERPARTY = c.CUSTOMER_NO --Bug#34718509
and exists (Select 1
	 From OLVW_USER_ACCESS_PRODUCTS
	 Where PRODUCT_CODE = b.product_code --OBCL_14.8_CE_Length_Changes
   AND USER_ID = global.user_id)
--Product Access restriction - End
/
create or replace synonym lbvws_amnd_sett_summary for lbvw_amnd_sett_summary
/