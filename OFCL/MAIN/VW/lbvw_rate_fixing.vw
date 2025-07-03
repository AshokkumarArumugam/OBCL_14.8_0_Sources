CREATE OR REPLACE FORCE VIEW lbvw_rate_fixing
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
----------------------------------------------------------------------------------------------------
*/
SELECT 
    A.CONTRACT_REF_NO
   ,A.BOOK_DATE
   ,A.LATEST_EVENT_SEQ_NO
   ,A.USER_REF_NO
   ,A.LATEST_VERSION_NO
   ,A.BRANCH
   ,A.PRODUCT_CODE
   ,A.COUNTERPARTY
   ,A.CONTRACT_STATUS
   ,A.AUTH_STATUS
   ,A.TEMPLATE_STATUS
   ,A.PRODUCT_TYPE
   ,A.CURR_EVENT_CODE
   ,A.CONTRACT_CCY
   ,A.MODULE_CODE
   ,B.RATE_FIXING_DATE
   ,B.RATE_FIXED_STATUS
   ,B.RATE_FIXING_ESN
   ,B.COMPONENT
   ,C.MATURITY_DATE 
FROM oltbs_contract A,
     (SELECT DISTINCT CONTRACT_REF_NO,COMPONENT,RATE_FIXING_DATE,RATE_FIXING_ESN, RATE_FIXED_STATUS
        FROM lbtbs_rate_fixing_details) B       
     ,oltbs_contract_master C
WHERE B.CONTRACT_REF_NO = A.CONTRACT_REF_NO
AND C.CONTRACT_REF_NO = A.CONTRACT_REF_NO  
AND C.VERSION_NO = A.LATEST_VERSION_NO     
ORDER BY RATE_FIXING_DATE DESC, CONTRACT_REF_NO
/

CREATE OR REPLACE SYNONYM lbvws_rate_fixing FOR lbvw_rate_fixing
/