CREATE OR REPLACE FORCE VIEW olvw_real_contract_accruals_h(CONTRACT_BOOKING_DATE,CONTRACT_REF_NO,EVENT_SEQ_NO,COMPONENT,TRANSACTION_DATE,VALUE_DATE,ACCRUAL_TO_DATE,COMPONENT_CCY,NET_ACCRUAL,TILL_DATE_ACCRUAL,OUTSTANDING_ACCRUAL,BRANCH,MODULE,PRODUCT,USER_DEFINED_STATUS,TYPE_OF_ACCRUAL,ACCRUAL_REF_NO,ACC_ENTRY_PASSED,PRODUCT_ACCRUAL_REF_NO) AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_real_contract_accruals_h.VW
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
----------------------------------------------------------------------------------------------------
*/
(SELECT "CONTRACT_BOOKING_DATE","CONTRACT_REF_NO","EVENT_SEQ_NO",
"COMPONENT","TRANSACTION_DATE","VALUE_DATE","ACCRUAL_TO_DATE","COMPONENT_CCY",
"NET_ACCRUAL","TILL_DATE_ACCRUAL","OUTSTANDING_ACCRUAL","BRANCH","MODULE",
"PRODUCT","USER_DEFINED_STATUS","TYPE_OF_ACCRUAL","ACCRUAL_REF_NO",
"ACC_ENTRY_PASSED","PRODUCT_ACCRUAL_REF_NO" FROM oltbs_contract_accrual_history
WHERE EVENT_SEQ_NO IS NOT NULL)
UNION
(SELECT "CONTRACT_BOOKING_DATE","CONTRACT_REF_NO","EVENT_SEQ_NO",
"COMPONENT","TRANSACTION_DATE","VALUE_DATE","ACCRUAL_TO_DATE","COMPONENT_CCY",
"NET_ACCRUAL","TILL_DATE_ACCRUAL","OUTSTANDING_ACCRUAL","BRANCH","MODULE",
"PRODUCT","USER_DEFINED_STATUS","TYPE_OF_ACCRUAL","ACCRUAL_REF_NO",
"ACC_ENTRY_PASSED","PRODUCT_ACCRUAL_REF_NO" FROM olars_contract_accrual_history
WHERE EVENT_SEQ_NO IS NOT NULL)
UNION
(SELECT "CONTRACT_BOOKING_DATE","CONTRACT_REF_NO","EVENT_SEQ_NO",
"COMPONENT","TRANSACTION_DATE","VALUE_DATE","ACCRUAL_TO_DATE","COMPONENT_CCY",
"NET_ACCRUAL","TILL_DATE_ACCRUAL","OUTSTANDING_ACCRUAL","BRANCH","MODULE",
"PRODUCT","USER_DEFINED_STATUS","TYPE_OF_ACCRUAL","ACCRUAL_REF_NO",
"ACC_ENTRY_PASSED","PRODUCT_ACCRUAL_REF_NO" FROM olpts_contract_accrual_history
WHERE EVENT_SEQ_NO IS NOT NULL)
UNION
(SELECT "CONTRACT_BOOKING_DATE","CONTRACT_REF_NO","EVENT_SEQ_NO",
"COMPONENT","TRANSACTION_DATE","VALUE_DATE","ACCRUAL_TO_DATE","COMPONENT_CCY",
"NET_ACCRUAL","TILL_DATE_ACCRUAL","OUTSTANDING_ACCRUAL","BRANCH","MODULE",
"PRODUCT","USER_DEFINED_STATUS","TYPE_OF_ACCRUAL","ACCRUAL_REF_NO",
"ACC_ENTRY_PASSED","PRODUCT_ACCRUAL_REF_NO" FROM olpps_contract_accrual_history
WHERE EVENT_SEQ_NO IS NOT NULL)
/