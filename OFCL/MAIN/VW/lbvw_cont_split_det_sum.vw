CREATE OR REPLACE FORCE VIEW lbvw_cont_split_det_sum
AS
/*----------------------------------------------------------------------------------------------------
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
----------------------------------------------------------------------------------------------------
*/
SELECT
w1.contract_ref_no,
w1.split_book_date,
w1.split_value_date,
l.auth_status
FROM  LBTBS_CONTRACT_SPLIT_MASTER w1, oltbs_contract_event_log l
WHERE  w1.contract_ref_no  = l.contract_ref_no
AND    w1.auth_stat = l.auth_status
AND  w1.split_serial_no     =
(
SELECT  MAX(w2.split_serial_no )
FROM  LBTBS_CONTRACT_SPLIT_MASTER w2
WHERE  w2.contract_ref_no  = w1.contract_ref_no
AND w2.sptb_esn =  l.event_seq_no
)
----Product Access restriction - Start
and exists (Select 1
	 From OLVW_USER_ACCESS_PRODUCTS
	 Where PRODUCT_CODE = (SELECT sypks_utils.get_product(W1.CONTRACT_REF_NO) FROM DUAL)
   AND USER_ID = global.user_id)
--Product Access restriction - End
ORDER BY contract_ref_no, event_seq_no
/
CREATE OR REPLACE SYNONYM lbvws_cont_split_det_sum FOR lbvw_cont_split_det_sum
/