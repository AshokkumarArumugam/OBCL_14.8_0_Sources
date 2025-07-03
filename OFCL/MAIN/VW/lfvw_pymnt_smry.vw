CREATE OR REPLACE VIEW lfvw_pymnt_smry AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : lfvw_pymnt_smry.VW
**
** Module       : Syndication Loans and Commitments											
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
	Changed By         : Narendra Dhaker
	Date               : 20-May-2021
	Change Description : Product Access restriction
	Search String      : Product Access restriction	
	Changed By         : Jayaram N
	Date               : 01-Dec-2022
	Change Description : For fixing FREV event auth status display in Summary screen. Currently even if it is unathorized shows as authorized.
	Search String      : Bug#34743054	
	Changed By         : Anusha K
	Date               : 12-DEC-2022
	Change Description : ADDED CUSTOMER NAME TO DESCRIPTION
	Search String      : OBCL_14.6_#34718509 CHANGES
	Changed By         : Rahul Garg
	Date               : 13-Nov-2023
	Change Description : Changes made to show the contract status on the summary screen.
	Search String      : Bug#35966850
	Changed By         : Rashmi
	Date               : 20-May-2024
	Change Description : System was showing 2 records in the summary screen
	Search String      : Bug#36615218
-----------------------------------------------------------------------------------------------
*/
SELECT distinct a.contract_ref_no CONREFNO,
       a.event_seq_no EVENTSEQNO,
       b.counterparty CPTY,
       b.user_defined_status STATUS,
       b.contract_ccy CCY,
       a.value_date VALDT,
       --a.amount_paid AMTPAID, --Bug#36615218_ADDL_1 commented
	   kk.amtpaid AMTPAID, --Bug#36615218_ADDL_1 added
       a.limit_date LIMITDT,       
       --b.auth_status AUTHSTATUS,   --Bug#29583806    code commented
       --c.auth_status AUTHSTATUS,     --Bug#29583806    code added  --Bug#34743054:Commented
       b.user_ref_no USERREFNO,
       b.book_date BOOKDATE,
       b.BRANCH BRANCH,
       b.LATEST_EVENT_SEQ_NO LATEVNTSEQNO,
       b.CONTRACT_STATUS CONTRACTSTATUS,   --Bug#29583806    code commented -- uncommented for Bug#35966850 
       --c.CONTRACT_STATUS CONTRACTSTATUS,	 --Bug#29583806    code added   -- Commented for Bug#35966850 
       b.MODULE_CODE MODULECODE,
       b.PRODUCT_CODE PRODCODE,
	    --Bug#34743054:Changes Starts here
	   Case When c.EVENT_CODE ='FLIQ' and d.EVENT_CODE ='FREV' then
                 d.AUTH_STATUS
            Else
                 c.AUTH_STATUS 
       End as AUTHSTATUS,       
       E.customer_name1 CUST_NAME --OBCL_14.6_#34718509 CHANGES
	   --Bug#34743054:Changes Ends here
  FROM lftbs_contract_liq_summary a,
       OLTBS_CONTRACT             b,
       oltbs_contract_event_log   c,   --Bug#29583806    code added
	   oltbs_contract_event_log   d	,    --Bug#34743054:Added
     OLTMS_CUSTOMER E, --OBCL_14.6_#34718509 CHANGES     
	 --Bug#36615218_ADDL_1 starts
       (select aa.contract_ref_no,aa.event_seq_no, sum(aa.amount_paid) AMTPAID
            FROM lftbs_contract_liq_summary aa
            WHERE aa.event_seq_no = (SELECT max(event_seq_no)
                                    from lftbs_contract_liq_summary
                                    WHERE contract_ref_no=aa.contract_ref_no) 
         group by aa.contract_ref_no,aa.event_seq_no) kk
        --Bug#36615218_ADDL_1 ends
 WHERE b.contract_ref_no = a.contract_ref_no
 AND b.contract_ref_no = c.contract_ref_no  --Bug#29583806    code added
 AND kk.contract_ref_no = a.contract_ref_no --Bug#36615218_ADDL_1 added
 AND kk.event_seq_no = c.event_seq_no --Bug#36615218_ADDL_1 added
   --AND a.event_seq_no = c.event_seq_no   --Bug#29583806    code added     -- Commented for Bug#35966850
    --Bug#36615218 Changes Starts
	 AND c.event_seq_no = (SELECT MAX(gg.event_seq_no) FROM oltb_contract_event_log gg 
							WHERE   gg.contract_ref_no = a.contract_ref_no
							  AND   NVL(gg.reversed_event_seq_no,gg.event_seq_no)= a.event_seq_no)
    --Bug#36615218 Changes Ends    
   --Bug#35966850  Changes Starts
   AND a.event_seq_no = (SELECT max(event_seq_no)
                           from lftbs_contract_liq_summary
                           WHERE contract_ref_no=a.contract_ref_no)  
   --Bug#35966850  Changes Ends						   
   AND a.event_seq_no = d.reversed_event_seq_no (+)	--Bug#34743054:Added
   AND a.contract_ref_no = d.contract_ref_no (+)	--Bug#34743054:Added
   AND b.counterparty = E.customer_no --OBCL_14.6_#34718509 CHANGES
   ----Product Access restriction - Start
and exists (Select 1
	 From OLVW_USER_ACCESS_PRODUCTS
	 Where PRODUCT_CODE = b.product_code --OBCL_14.8_CE_Length_Changes
   AND USER_ID = global.user_id)
--Product Access restriction - End
/
create or replace synonym lfvws_pymnt_smry for lfvw_pymnt_smry
/