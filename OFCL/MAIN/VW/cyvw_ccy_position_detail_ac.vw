CREATE OR REPLACE VIEW cyvw_ccy_position_detail_ac AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : cyvw_ccy_position_detail_ac.VW
**
** Module       : CO
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
**
	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
-----------------------------------------------------------------------------------------------
*/
SELECT
      AC_BRANCH,AC_CCY,AC_NO,TRN_DT,(SELECT sypks_utils.get_product(TRN_REF_NO) FROM DUAL) PRODUCT, TRN_REF_NO,
 SUM(DECODE(CATEGORY,'1',0,'2',0,'3',0,'4',0,'7',0, DECODE(DRCR_IND, 'D',-1 * LCY_AMOUNT, LCY_AMOUNT))) CONTLCY,
 SUM(DECODE(CATEGORY,'5',0,'6',0, '3', 0, '4', 0, DECODE(DRCR_IND,'D', -1 * LCY_AMOUNT, LCY_AMOUNT))) LCY,
 SUM(DECODE(CATEGORY,'1',0,'2',0,'3',0,'4',0,'7',0,
 DECODE(DRCR_IND, 'D',-1 * DECODE(AC_CCY,C.BRANCH_LCY,LCY_AMOUNT,FCY_AMOUNT),
      DECODE(AC_CCY,C.BRANCH_LCY,LCY_AMOUNT,FCY_AMOUNT)))) CONTFCY,
 SUM(DECODE(CATEGORY,'5',0,'6',0,'3',0,'4',0, DECODE(DRCR_IND,'D',
 -1 * DECODE(AC_CCY,C.BRANCH_LCY,LCY_AMOUNT,FCY_AMOUNT),
 DECODE(AC_CCY,C.BRANCH_LCY,LCY_AMOUNT,FCY_AMOUNT)))) FCY,
 NVL(EXCH_RATE,0) EXCH_RATE
FROM olvws_all_ac_entries A, oltms_bank B,oltms_branch C
WHERE B.BANK_CODE = C.BANK_CODE AND C.BRANCH_CODE=A.AC_BRANCH
AND AC_CCY <> c.branch_LCY
AND EVENT <> 'REVL'
GROUP BY AC_BRANCH ,AC_CCY ,AC_NO,SUBSTR(TRN_REF_NO,1,4) ,   TRN_REF_NO , EXCH_RATE   , TRN_DT
UNION ALL
SELECT
      AC_BRANCH, C.BRANCH_LCY ,AC_NO, TRN_DT , (SELECT sypks_utils.get_product(TRN_REF_NO) FROM DUAL) PRODUCT , TRN_REF_NO
     , SUM(DECODE(CATEGORY,'1',0,'2',0,'3',0,'4',0,'7',0, DECODE(DRCR_IND,
        'D',-1*LCY_AMOUNT, LCY_AMOUNT))) CONTLCY
     , SUM(DECODE(CATEGORY,'5',0,'6',0, DECODE(DRCR_IND,'D',
       -1* LCY_AMOUNT, LCY_AMOUNT))) LCY
     , 0 CONTFCY
     , 0 FCY
 , NVL(EXCH_RATE,0) EXCH_RATE
FROM olvws_all_ac_entries A, oltms_bank B,oltms_branch C
WHERE B.BANK_CODE = C.BANK_CODE AND C.BRANCH_CODE=A.AC_BRANCH
AND (AC_CCY = c.BRANCH_LCY OR CATEGORY IN ('3', '4'))
AND EVENT <> 'REVL'
GROUP BY AC_BRANCH ,C.BRANCH_LCY ,AC_NO, SUBSTR(TRN_REF_NO,1,4) ,   TRN_REF_NO , EXCH_RATE  , TRN_DT
HAVING
(SUM(DECODE(CATEGORY,'1',0,'2',0,'3',0,'4',0,'7',0, DECODE(DRCR_IND,'D',-1*LCY_AMOUNT, LCY_AMOUNT))) <>0)
OR
(SUM(DECODE(CATEGORY,'5',0,'6',0, DECODE(DRCR_IND,'D', -1* LCY_AMOUNT, LCY_AMOUNT))) <> 0)
/