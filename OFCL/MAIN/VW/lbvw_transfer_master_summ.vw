CREATE OR REPLACE VIEW lbvw_transfer_master_summ AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lbvw_transfer_master_summ.vw
**
** Module      : Syndication Loans and Commitments
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
**
**Changed By         : Narendra Dhaker
**Date               : 20-May-2021
**Change Description : Product Access restriction
**Search String      : Product Access restriction
**
**Changed By         : Pallavi R
**Date               : 11-Apr-2024
**Change Description : Query of current branch records
**Search String      : OBCL_14.7_Internal_#36371779_2 Changes 	
**
**Changed By         : Pallavi R
**Date               : 12-Aug-2024
**Change Description : Response empty on Query 
**Search String      : OBCL_14.7_Automation_#36939629 Changes 	
----------------------------------------------------------------------------------------------------
*/
/* created for Participant Transfer - Summary Screen */
SELECT contract_ref_no,
       value_date,
       event_seq_no,
       entry_seq_no,
       table_type,
       transfer_type,
       transfer_ref_no,
	   branch,--OBCL_14.7_Internal_#36371779_2 Changes 
       auth_status
  FROM (SELECT b.contract_ref_no,
               b.value_date,
               b.event_seq_no,
               b.entry_seq_no,
               'M' table_type,
               b.transfer_type,
               b.transfer_ref_no,
			   a.branch,--OBCL_14.7_Internal_#36371779_2 Changes 
               c.auth_status
          FROM lbtbs_transfer_master b, oltbs_contract_event_log c,oltb_contract a
         WHERE c.contract_ref_no = b.contract_ref_no
		   AND c.contract_ref_no = a.contract_ref_no--OBCL_14.7_Internal_#36371779_2 Changes 
           AND b.event_seq_no = c.event_seq_no
		   ----Product Access restriction - Start
and exists (Select 1
	 From OLVW_USER_ACCESS_PRODUCTS
	 --Where PRODUCT_CODE = (SELECT sypks_utils.get_product(B.CONTRACT_REF_NO) FROM DUAL)--OBCL_14.7_Automation_#36939629 Changes
	  Where PRODUCT_CODE = a.PRODUCT_CODE --OBCL_14.7_Automation_#36939629 Changes
   AND USER_ID = global.user_id)
--Product Access restriction - End
   UNION
SELECT c.contract_ref_no,
       c.value_date,
       null event_seq_no,
       c.entry_seq_no,
       'W' table_type,
       c.transfer_type,
       c.transfer_ref_no,
       a.branch,--OBCL_14.7_Internal_#36371779_2 Changes 
       'U' auth_status
  FROM lbtws_transfer_master c,oltb_contract a
  where 
  c.contract_ref_no = a.contract_ref_no and --OBCL_14.7_Internal_#36371779_2 Changes 
  ----Product Access restriction - Start
 exists (Select 1
	 From OLVW_USER_ACCESS_PRODUCTS
	 --Where PRODUCT_CODE = (SELECT sypks_utils.get_product(CONTRACT_REF_NO) FROM DUAL)--OBCL_14.7_Automation_#36939629 Changes
	 Where PRODUCT_CODE = a.PRODUCT_CODE --OBCL_14.7_Automation_#36939629 Changes
   AND USER_ID = global.user_id))  order by event_seq_no desc
--Product Access restriction - End
/
CREATE OR REPLACE SYNONYM lbvws_transfer_master_summ FOR lbvw_transfer_master_summ 
/