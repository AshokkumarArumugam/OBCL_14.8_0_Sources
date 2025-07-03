CREATE OR REPLACE VIEW LBVW_CONT_MERGE_DET_SUM 
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
SELECT distinct
w1.contract_ref_no,
w1.merge_book_date,
w1.merge_value_date,
l.auth_status
FROM  lbtbs_contract_merge_master w1, oltbs_contract_event_log l
WHERE  w1.contract_ref_no  = l.contract_ref_no
AND    w1.auth_stat = l.auth_status
AND  w1.merge_serial_no    =
(
SELECT  MAX(w2.merge_serial_no)
FROM  lbtbs_contract_merge_master w2
WHERE  w2.contract_ref_no  = w1.contract_ref_no
)
----Product Access restriction - Start
and exists (Select 1
	 From OLVW_USER_ACCESS_PRODUCTS
	 Where PRODUCT_CODE = (SELECT sypks_utils.get_product(W1.CONTRACT_REF_NO) FROM DUAL)
   AND USER_ID = global.user_id)
--Product Access restriction - End
ORDER BY contract_ref_no
/
CREATE OR REPLACE SYNONYM LBVWS_CONT_MERGE_DET_SUM FOR LBVW_CONT_MERGE_DET_SUM
/