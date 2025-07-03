CREATE OR REPLACE VIEW olvw_pymnt_smry AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_pymnt_smry.VW
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
Change History
-------------------------------------------------------------------------------------------------------------------------------------
Changes By 	       : Krithika G
Change Description : Fix for duplicate records in Payment Summmary when there is version increment in   oltbs_contract_master table
Search String	   : OBCL_12.5_26826787
-------------------------------------------------------------------------------------------------------------------------------------
Changes By 	       : Shishirkumar Aithal
Date               : 30-Jan-2018
Change Description : Introduced new description field for displaying the payment status.
Search String	   : Bug#27204808

Changes By 	       : Aishwarya Sekar
Date               : 26-OCT-2021
Change Description : Added NVL to moratorium Case stmnt to retrieve the record in payment summary screen.
Search String	   : OBCL_14.5_Support_BUG#33484807

Changed By         : Abhinav Kumar
Date               : 12-Jul-2022
Change Description : Payment Summary Showing Auth Status as UnAuth, even if the Last Payment/LIQD event is in Auth.
Search String      : Bug#34365107

Changed By         : Jayaram N
Date               : 17-Oct-2023
Change Description : PAYMENT SUMMARY SCREEN (OLSPMNT) SEARCH ISSUE
Search String      : Bug#35918084 
--------------------------------------------------------------------------------------------------------------------------------------
*/
SELECT Distinct a.contract_ref_no FCCREF,
       a.event_seq_no EVENTSEQNO,
       b.counterparty CPTY,
	   f.customer_name1 cust_name, --OBCL14.4_Search based on customer name
       b.user_defined_status STATUS,
       b.contract_ccy CCY,
       a.value_date VALDT,
       a.total_paid TOTPAID,
       a.limit_date LIMITDT,
       a.discount_rate DISCRATE,
       a.limit_amount LIMITAMT,
       --b.auth_status AUTHSTATUS, --Bug#34365107 --Commented code to fetch Auth status from oltb_contract_event_log for Latest LIQD event
       g.auth_status AUTHSTATUS, --Bug#34365107
       b.user_ref_no USERREFNO,
       b.book_date BOOKDATE,
       b.BRANCH BRANCH,
       b.LATEST_EVENT_SEQ_NO LATEVNTSEQNO,
       b.CONTRACT_STATUS CONTRACTSTATUS,
       b.MODULE_CODE MODULECODE,
       b.PRODUCT_CODE PRODCODE,
       c.maturity_date MATDT,
       c.amount AMT,
	   a.payment_Status PAYMENTSTATUS  --Bug#27204808
  FROM oltbs_contract_liq_summary a,
       OLTB_CONTRACT              b,
       oltbs_contract_master c
	   ,Oltb_Contract_Liq d,Oltb_Contract_Preference e--OBCL_14.3_Moratorium Changes
	   ,oltm_customer f --OBCL14.4_Search based on customer name
     ,oltb_contract_event_log g --Bug#34365107
 WHERE b.contract_ref_no = a.contract_ref_no
  --Bug#34365107 Changes Starts
 AND   g.contract_ref_no = a.contract_ref_no
 AND g.event_seq_no = (SELECT MAX(gg.event_seq_no) FROM oltb_contract_event_log gg 
                        WHERE   gg.contract_ref_no = a.contract_ref_no
                          AND   NVL(gg.reversed_event_seq_no,gg.event_seq_no)= a.event_seq_no)
  --Bug#34365107 Changes Ends 
 AND c.contract_ref_no = b.contract_ref_no
 AND c.contract_ref_no = a.contract_ref_no
 AND b.counterparty = f.CUSTOMER_NO --OBCL14.4_Search based on customer name
 --OBCL_14.3_Moratorium Changes Starts
 And a.Contract_ref_no = d.Contract_ref_no
 And a.Contract_Ref_no = e. Contract_Ref_No
 --OBCL_14.3_Moratorium Changes Ends
 --OBCL_12.5_26826787 Changes Starts
 AND c.version_no = b.latest_version_no
 And e.Version_No = c.version_no--OBCL_14.3_Moratorium Changes 
 AND a.event_seq_no=(SELECT max(event_seq_no)
 from oltbs_contract_liq_summary
 WHERE contract_ref_no=a.contract_ref_no) --OBCL_12.5_26826787 Changes Ends
--OBCL_14.3_Moratorium Changes
 And a.event_seq_No = d.Event_Seq_no
 -- AND b.contract_status <> 'V'--Bug#29930831 --Bug#35918084:Commented
 And d.Component <> NVL( --OBCL_14.5_Support_BUG#33484807
						Case  When e.Moratorium_Type In('A','F','C') Then (Select Distinct component From Oltb_ContracT_Schedules
																			Where contract_ref_no =a.Contract_Ref_no
																				And Nvl(Schedule_Flag,'N')='M'
																				And Version_No =(Select Max(Version_NO) From Oltb_ContracT_Schedules
																									Where contract_ref_no =a.Contract_Ref_no
																										And Nvl(Schedule_Flag,'N')='M'))
							Else ' '
                    End
					,'XXXX')--OBCL_14.5_Support_BUG#33484807
--OBCL_14.3_Moratorium Changes
--Product Access restriction - Start
and exists (Select 1
	 From OLVW_USER_ACCESS_PRODUCTS
	 Where PRODUCT_CODE = b.product_code --OBCL_14.8_CE_Length_Changes
      AND USER_ID = global.user_id)
--Product Access restriction - End
/
CREATE OR REPLACE SYNONYM OLVWS_PYMNT_SMRY for olvw_pymnt_smry
/