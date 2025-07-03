CREATE OR REPLACE FORCE VIEW OLVW_CONT_DSBR_SPL_DTLS AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: OLVW_CONT_DSBR_SPL_DTLS.VW
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.

CHANGE HISTORY

 **Changed By         : Abhik Das
 **Date               : 23-NOV-2019
 **Change Description : Added code to populate split settlement records for VAMI event
 **Search String      : OBCL_14.4_Support_Bug#31685434_Changes
----------------------------------------------------------------------------------------------------
*/
SELECT A.CONTRACT_REF_NO,
A.AMOUNT_TAG,
A.BASIS_AMOUNT_TAG,
A.DSBR_DUE_DATE,
A.SPLIT_ORDER,
A.SETTLEMENT_AMT,
A.SPLIT_RATIO,
A.COMPONENT,
B.ACC_CIF,
B.ACCOUNT,
B.ACC_BRANCH,
B.ACC_CCY,
B.SETTLEMENT_SEQ_NO,
B.SSI_MNEMONIC
,A.APPLIED_ESN---OBCL_14.4_Support_Bug#31685434_Changes
,A.QUEUE_REF_NO -- OBCL_14.4_PM_ReversalviaService
FROM OLTB_CONT_DSBR_SPLSETT_DTLS A, OLTB_SETTLEMENTS B
WHERE A.CONTRACT_REF_NO = B.CONTRACT_REF_NO
AND A.SPLIT_ORDER = B.SPLIT_ORDER
AND A.AMOUNT_TAG = B.AMOUNT_TAG
AND B.EVENT_SEQ_NO = 
                    -----OBCL_14.4_Support_Bug#31685434_Changes Starts-----
                    /*(SELECT MAX(event_seq_no)
                        FROM OLTB_SETTLEMENTS
                       WHERE contract_ref_no = A.Contract_Ref_No)*/
		    DECODE(  NVL(A.APPLIED_ESN,0) ,0, (SELECT MAX(event_seq_no)
                        FROM OLTB_SETTLEMENTS
                       WHERE contract_ref_no = A.Contract_Ref_No), A.APPLIED_ESN) 
		    ------OBCL_14.4_Support_Bug#31685434_Changes Ends------   

/

CREATE OR REPLACE SYNONYM OLVWS_CONT_DSBR_SPL_DTLS FOR OLVW_CONT_DSBR_SPL_DTLS
/