CREATE OR REPLACE VIEW OLVW_VAMI_SUMMARY AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : OLVW_VAMI_SUMMARY.VW
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

Changed By         : Kavitha Asokan
Date               : 13-Feb-2023
Change Description : Payment Summary Showing Unauth Status as Auth, after saving the VAMI reversal. 
Search String      : Bug#35072370

Changed By         : Ramya M
Date               : 17-MAR-2023
Change Description : VAMI Summary Showing older/latest esn VAMI records. 
Search String      : Bug#35188433 

Changed By         : Navoneel Nandan
Date               : 02-Aug-2024
Change Description : Removed branch Code filter and added condition to check if the user has branch rights. 
Search String      : Bug#36848993 

Changed By         : Akhila Samson
Date               : 03-Oct-2024
Change Description : Added the code to display the auth status and contract status based on the contract tranaction. 
Search String      : Bug#37104302 
--------------------------------------------------------------------------------------------------------------------------------------
*/
 (
  SELECT  a.contract_ref_no,
    a.event_seq_no,
    a.value_date,
    a.differential_amount,
    a.new_maturity_date,
    a.transaction_date,
    a.AMEND_INST_STATUS,
    c.auth_status      --Bug#37104302 
    ,c.CONTRACT_STATUS,   --Bug#37104302 
    c.branch,
    c.module_code --11-JAN-2012 FLEXCUBE V.CL Releae 7.9 EURCITIPLC-LS#12300 Added.
	,c.counterparty, --OBCL14.4_Search based on customer name
    d.customer_name1  --OBCL14.4_Search based on customer name
  FROM
        oltbs_contract_amend_due a,
        --OLTB_CONTRACT_EVENT_LOG b, --Bug#37104302 
        oltbs_contract c
		,oltm_customer d --OBCL14.4_Search based on customer name
        WHERE   a.contract_ref_no =  c.contract_ref_no --b.contract_ref_no --Bug#37104302 
		--Bug#37104302 start
        --AND b.contract_ref_no=c.contract_ref_no 
        --Bug#35072370 changes starts
        --and     a.event_seq_no = b.event_seq_no
        /*and  b.event_seq_no = (SELECT max(e.event_seq_no) FROM oltb_contract_event_log e 
                               WHERE  e.contract_ref_no = a.contract_ref_no
                               AND   NVL(e.reversed_event_seq_no,e.event_seq_no)= a.event_seq_no)
        --Bug#35072370 changes ends
		*/ --Bug#37104302 Ends
		and a.event_Seq_no=(Select max(event_Seq_no) ----Bug#35188433
							from oltbs_contract_amend_due f  --Bug#35188433
							where f.contract_ref_no=a.contract_ref_no)--Bug#35188433
        AND c.module_code='OL'
       -- AND c.branch=global.current_branch--Bug#36848993(commented)
		AND c.BRANCH IN (SELECT a.BRANCH_CODE FROM smtb_user_role a WHERE a.USER_ID=global.user_id)--Bug#36848993
		AND c.counterparty = d.CUSTOMER_NO --OBCL14.4_Search based on customer name
		--Product Access restriction - Start
		and exists (Select 1
					 From OLVW_USER_ACCESS_PRODUCTS
					 Where PRODUCT_CODE = c.product_code --OBCL_14.8_CE_Length_Changes
						AND USER_ID = global.user_id)
		--Product Access restriction - End
)
/

CREATE OR REPLACE SYNONYM OLVWS_VAMI_SUMMARY FOR OLVW_VAMI_SUMMARY
/