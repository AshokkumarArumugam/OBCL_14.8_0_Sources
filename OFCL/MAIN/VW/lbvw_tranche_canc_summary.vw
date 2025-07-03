CREATE OR REPLACE VIEW LBVW_TRANCHE_CANC_SUMMARY AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : LBVW_TRANCHE_CANC_SUMMARY.VW
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
**Change Description : Added view required for summary screen for LBDCANCL

**Changed By         : Narendra Dhaker
**Date               : 20-May-2021
**Change Description : Product Access restriction
**Search String      : Product Access restriction
-----------------------------------------------------------------------------------------------
*/
(
  SELECT a.contract_ref_no,
         a.value_date,
         a.event_seq_no,
         a.canc_amount,
         b.auth_status,
         b.contract_status,
         (SELECT sypks_utils.get_branch(A.CONTRACT_REF_NO) FROM DUAL) branch
    FROM LBTBS_TRANCHE_CANC a,
         OLTBS_CONTRACT_EVENT_LOG b
   WHERE a.contract_ref_no=b.contract_ref_no
     AND a.event_seq_no=b.event_seq_no
	 ----Product Access restriction - Start
and exists (Select 1
	 From OLVW_USER_ACCESS_PRODUCTS
	 Where PRODUCT_CODE = (SELECT sypks_utils.get_product(A.CONTRACT_REF_NO) FROM DUAL)
   AND USER_ID = global.user_id)
--Product Access restriction - End
)
/
create or replace synonym LBVWS_TRANCHE_CANC_SUMMARY for LBVW_TRANCHE_CANC_SUMMARY
/