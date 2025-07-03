CREATE OR REPLACE VIEW olvw_cont_split_det_sum AS
/*
----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_cont_split_det_sum.vw
**
** Module      : OL
**
**This source is part of the Oracle Banking Corporate Lending  Software Product. 
**Copyright © 2007 - 2018  Oracle and/or its affiliates.  All rights reserved.   
**No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
**in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
**or otherwise, translated in any language or computer language, without the prior written permission 
**of Oracle and/or its affiliates. 
**Oracle Financial Services Software Limited.
**Oracle Park, Off Western Express Highway,
**Goregaon (East), 
**Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
/*
-----------------------------------------------------------------------------------------
  **Created By         : Abhik Das
  **Date               : 17-Sep-2020
  **Change Description : Changed the view to the contracts only for the current branch
  **SFR Number         : OBCL 14.3 Support Bug#31836377
  
  **Changed By         : Narendra Dhaker
  **Date               : 26-May-2021
  **Change Description : Product Access restriction
  **Search String      : Product Access restriction
-----------------------------------------------------------------------------------------  
*/
SELECT
w1.contract_ref_no,
(SELECT sypks_utils.get_branch(W1.CONTRACT_REF_NO) FROM DUAL) branch_code,---OBCL 14.3 Support Bug#31836377
w1.split_book_date,
w1.split_value_date,
l.auth_status
FROM  oltbs_contract_split_master w1, oltbs_contract_event_log l
WHERE  w1.contract_ref_no  = l.contract_ref_no
AND    w1.auth_stat = l.auth_status
AND  w1.sptb_esn     =
(
SELECT  MAX(w2.sptb_esn )
FROM  oltbs_contract_split_master w2
WHERE  w2.contract_ref_no  = w1.contract_ref_no
AND w2.sptb_esn =  l.event_seq_no
)

--Product Access restriction - Start
and exists (Select 1
	 From OLVW_USER_ACCESS_PRODUCTS
	 Where PRODUCT_CODE = (SELECT sypks_utils.get_product(W1.CONTRACT_REF_NO) FROM DUAL)
      AND USER_ID = global.user_id)
--Product Access restriction - End
ORDER BY contract_ref_no, event_seq_no
/
Create or Replace synonym olvws_cont_split_det_sum for olvw_cont_split_det_sum
/