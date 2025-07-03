CREATE OR REPLACE VIEW OLVW_CONTRACT_OVD AS 
/*-----------------------------------------------------------------------------------------------
**
** File Name    : OLVW_CONTRACT_OVD.VW
**
** Module       : OL
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
**
	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
-----------------------------------------------------------------------------------------------
*/
/*
CHANGE HISTORY

*/
SELECT DISTINCT MODULE,
                (SELECT sypks_utils.get_branch(CONTRACT_REF_NO) FROM DUAL) AS BRANCH,
                CONTRACT_REF_NO,
                (SELECT sypks_utils.get_product(CONTRACT_REF_NO) FROM DUAL) AS PRODUCT_CODE,
                EVENT_SEQ_NO,
                ERR_CODE,
                PARAMETERS,
                1 AS OVD_SEQ_NO,
                NVL(A.OVD_STATUS,'U')AS OVD_STATUS,
				' ' AS OPERATE,
                0 AS LEVELS_OF_AUTH,
                0 AS PENDING_AUTH,
                0 AS COMPLETED_AUTH,
                Sysdate AS POSTING_DATE,                
                REMARKS,                                       
                '             ' AS COUNTERPARTY,              
                0 AS TXN_AMOUNT,
                '   ' AS TXN_CCY,
                '             ' AS MAKER_ID,
               NULL AS Function_Id,                
               '                                                                                                                          ' STATUS
  FROM OLTBS_CONTRACT_OVD A
 WHERE        
       (EXISTS
        (SELECT 1
            FROM ERTBS_MSGS
           WHERE ERR_CODE = A.ERR_CODE AND TYPE = 'D' AND Language = Nvl(Global.Lang,'ENG')) And 
   (NVL(A.OVD_STATUS, '#$') <> 'A'  
        OR EVENT_SEQ_NO =         
              (SELECT B.LATEST_EVENT_SEQ_NO
                  FROM OLTBS_CONTRACT B,OLTB_MULTIAUTH_OVD_MASTER C
                    WHERE A.CONTRACT_REF_NO = B.CONTRACT_REF_NO AND
                          B.CONTRACT_REF_NO = C.CONTRACT_REF_NO AND
                          B.LATEST_EVENT_SEQ_NO = C.EVENT_SEQ_NO AND
                          C.CUMULATIVE = 'Y' AND B.AUTH_STATUS = 'U' AND
                           B.BRANCH = NVL(GLOBAL.CURRENT_BRANCH, B.BRANCH))))
/