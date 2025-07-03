CREATE OR REPLACE VIEW olvw_user_events_summary AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_user_events_summary.VW
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
/*
**Changed By         : Chandra Achuta
**Date               : 20-MAR-2024
**Change Description : Introduced this view to use in OLSUDEVT screen
**Search String      : Bug#36408211
-----------------------------------------------------------------------------------------------
*/
SELECT Distinct a.contract_ref_no FCCREF,
       a.event_seq_no EVENTSEQNO,
       b.counterparty CPTY,
	   f.customer_name1 cust_name, 
       b.user_defined_status STATUS,
       b.contract_ccy CCY,
       a.value_date VALDT,
       g.auth_status AUTHSTATUS, 
       b.user_ref_no USERREFNO,
       b.book_date BOOKDATE,
       b.BRANCH BRANCH,
       b.LATEST_EVENT_SEQ_NO LATEVNTSEQNO,
       b.CONTRACT_STATUS CONTRACTSTATUS,
       b.MODULE_CODE MODULECODE,
       b.PRODUCT_CODE PRODCODE,
	   a.payment_Status PAYMENTSTATUS  
  FROM oltbs_contract_liq_summary_ud a,
       oltb_contract b,       
	   oltm_customer f,
       oltb_contract_event_log g 
 WHERE b.contract_ref_no = a.contract_ref_no
   AND g.contract_ref_no = a.contract_ref_no
   AND g.event_seq_no = (SELECT MAX(gg.event_seq_no) FROM oltb_contract_event_log gg 
                          WHERE gg.contract_ref_no = a.contract_ref_no
                          AND   NVL(gg.reversed_event_seq_no,gg.event_seq_no)= a.event_seq_no) 
   AND b.counterparty = f.CUSTOMER_NO 
   AND a.event_seq_no=(SELECT MAX(event_seq_no)
						 FROM oltbs_contract_liq_summary_ud
						 WHERE contract_ref_no=a.contract_ref_no) 
	--Product Access restriction - Start
	AND EXISTS (Select 1
		 FROM OLVW_USER_ACCESS_PRODUCTS
		 WHERE PRODUCT_CODE = b.PRODUCT_CODE
		  AND USER_ID = global.user_id)
	--Product Access restriction - End
/
CREATE OR REPLACE SYNONYM OLVWS_USER_EVENTS_SUMMARY FOR OLVW_USER_EVENTS_SUMMARY
/