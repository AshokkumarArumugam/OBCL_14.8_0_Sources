CREATE OR REPLACE FORCE VIEW olvw_sven_exceptions AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_sven_exceptions.VW
**
** Module       : Interface
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
-----------------------------------------------------------------------------------------------
*/
/* CHANGE HISTORY : 
*/
SELECT DISTINCT L.MODULE, L.TRN_REF_NO,
decode(c.country,'AT','1','2') ERR_REASON
FROM oltms_customer C,oltbs_daily_log_ac L,--STTMS_CUST_ACCOUNT A-- OFCL12.2 Not required
oltb_account A
WHERE L.AC_BRANCH =  GLOBAL.CURRENT_BRANCH AND
               L.DELETE_STAT <> 'D' AND
               L.CUST_GL = 'A' AND
               L.MODULE IN ('OL','AC') AND
               A.BRANCH_CODE = L.AC_BRANCH AND
               --A.CUST_AC_NO = L.AC_NO AND
			   A.AC_GL_NO = L.AC_NO AND
               C.CUSTOMER_NO=A.CUST_NO AND
               ((
               C.COUNTRY <> GLOBAL.COUNTRY_CODE AND
               NOT EXISTS 
               (SELECT 1 FROM oltms_udf_local_vals LV
                WHERE LV.FUNCTION_ID=DECODE(L.MODULE,'OL','DEJRNONL','AC','DEJRNONL')
                and   LV.FIELD_NAME='UPOSCODE' 
                and   LV.REC_KEY=L.TRN_REF_NO || '~' 
                and   LV.FIELD_VAL IS NOT NULL)
               ) OR 
               (C.COUNTRY =  GLOBAL.COUNTRY_CODE AND
               EXISTS 
               (SELECT 1 FROM oltms_udf_local_vals LV
                WHERE LV.FUNCTION_ID=DECODE(L.MODULE,'OL','DEJRNONL','AC','DEJRNONL')
                and   LV.FIELD_NAME='UPOSCODE' 
                and   LV.REC_KEY=L.TRN_REF_NO || '~' 
                and   ( LV.FIELD_VAL not IN ('940','941','0940','0941') 
			OR( LV.FIELD_VAL IN ('000','0000') AND (SELECT sypks_utils.get_product(L.TRN_REF_NO) FROM DUAL)<> 'ZBAS'))
		)))
UNION ALL
SELECT DISTINCT L.MODULE,L.TRN_REF_NO, '3' 
FROM	OLTB_DAILY_LOG_AC L
WHERE	L.AC_BRANCH = GLOBAL.CURRENT_BRANCH
AND	L.DELETE_STAT <> 'D'
AND	L.MODULE IN ('OL','FT','AC','MM')
AND	L.LCY_AMOUNT	< 0
UNION ALL
SELECT DISTINCT L.MODULE, L.TRN_REF_NO, '4'
FROM   	oltm_customer B,
	OLTB_DAILY_LOG_AC L,
	oltb_account A--STTM_CUST_ACCOUNT A-- OFCL12.2 Not required
WHERE	L.AC_BRANCH = GLOBAL.CURRENT_BRANCH
AND	L.DELETE_STAT <> 'D'
AND	L.MODULE IN ('OL','FT','AC')
--AND	A.CUST_AC_NO = L.AC_NO
AND	A.AC_GL_NO = L.AC_NO
AND	A.CUST_NO = B.CUSTOMER_NO
AND	(L.DRCR_IND = 'D' AND B.COUNTRY <> GLOBAL.COUNTRY_CODE AND EXISTS
           ( 	SELECT 1 FROM oltms_udf_local_vals Z 
		WHERE  Z.FUNCTION_ID IN ('DEJRNONL','FTCONONL')
		AND	Z.FIELD_NAME = 'UPOSCODE'
		AND	Z.REC_KEY = L.TRN_REF_NO||'~'
		AND	LTRIM(LTRIM(Z.FIELD_VAL,'0')) = '3'
	   )
        )
UNION ALL
SELECT DISTINCT L.MODULE, L.TRN_REF_NO, '5'
FROM   	oltm_customer B,
	OLTB_DAILY_LOG_AC L,
	oltb_account A--STTM_CUST_ACCOUNT A-- OFCL12.2 Not required
WHERE	L.AC_BRANCH = GLOBAL.CURRENT_BRANCH
AND	L.DELETE_STAT <> 'D'
AND	L.MODULE IN ('OL','FT','AC')
--AND	A.CUST_AC_NO = L.AC_NO
AND	A.AC_GL_NO = L.AC_NO
AND	A.CUST_NO = B.CUSTOMER_NO
AND	(L.DRCR_IND = 'C' AND B.COUNTRY <> GLOBAL.COUNTRY_CODE AND EXISTS
           ( 	SELECT 1 FROM oltms_udf_local_vals Z 
		WHERE  Z.FUNCTION_ID IN ('DEJRNONL','FTCONONL')
		AND	Z.FIELD_NAME = 'UPOSCODE'
		AND	Z.REC_KEY = L.TRN_REF_NO||'~'
		AND	LTRIM(LTRIM(Z.FIELD_VAL,'0')) = '1'
	   )
	) 
UNION ALL
SELECT DISTINCT L.MODULE, L.TRN_REF_NO, '6'
FROM   	oltm_customer B,
	OLTB_DAILY_LOG_AC L,
	oltb_account  A--STTM_CUST_ACCOUNT A-- OFCL12.2 Not required
WHERE	L.AC_BRANCH = GLOBAL.CURRENT_BRANCH
AND	L.DELETE_STAT <> 'D'
AND	L.MODULE IN ('OL','FT','AC')
-- fcc 3.8 retro (citiplc sfr 192 fcc352) 13/09/2001 AND	L.LCY_AMOUNT > 5499.5
AND	L.LCY_AMOUNT > 12500
--AND	A.CUST_AC_NO = L.AC_NO
AND	A.AC_GL_NO = L.AC_NO
AND	A.CUST_NO = B.CUSTOMER_NO
AND	(L.DRCR_IND = 'C' AND B.COUNTRY <> GLOBAL.COUNTRY_CODE AND EXISTS
           ( 	SELECT 1 FROM oltms_udf_local_vals Z 
		WHERE  Z.FUNCTION_ID IN ('DEJRNONL','FTCONONL')
		AND	Z.FIELD_NAME = 'UPOSCODE'
		AND	Z.REC_KEY = L.TRN_REF_NO||'~'
		AND	LTRIM(LTRIM(Z.FIELD_VAL,'0')) = '910'
	   )
	) 
UNION ALL
SELECT DISTINCT L.MODULE, L.TRN_REF_NO, '7'
FROM   	oltm_customer B,
	OLTB_DAILY_LOG_AC L,
	oltb_account A--STTM_CUST_ACCOUNT A-- OFCL12.2 Not required
WHERE	L.AC_BRANCH = GLOBAL.CURRENT_BRANCH
AND	L.DELETE_STAT <> 'D'
AND	L.MODULE IN ('OL','FT','AC')
--AND	A.CUST_AC_NO = L.AC_NO
AND	A.AC_GL_NO = L.AC_NO
AND	A.CUST_NO = B.CUSTOMER_NO
AND	EXISTS
           ( 	SELECT 1 FROM oltms_udf_local_vals Z 
		WHERE  Z.FUNCTION_ID IN ('DEJRNONL','FTCONONL')
		AND	Z.FIELD_NAME = 'UPOSCODE'
		AND	Z.REC_KEY = L.TRN_REF_NO||'~'
		AND	LTRIM(LTRIM(Z.FIELD_VAL,'0')) = '999'
	   )
UNION ALL
SELECT DISTINCT 'FT',A.CONTRACT_REF_NO , '8'
FROM	OLTB_FTTB_CONTRACT_MASTER A,
	OLTB_DAILY_LOG_AC B
WHERE	A.CONTRACT_REF_NO = B.TRN_REF_NO
AND	A.FT_TYPE = 'O' 
AND	A.DR_ACCOUNT_BRANCH = GLOBAL.CURRENT_BRANCH
AND	A.CR_ACCOUNT_BRANCH = GLOBAL.CURRENT_BRANCH
AND
(	EXISTS
           ( 
		SELECT 1 FROM oltms_udf_local_vals Z 
		WHERE  Z.FUNCTION_ID IN ('FTCONONL')
		AND	Z.FIELD_NAME = 'UPOSCODE'
		AND	Z.REC_KEY = A.CONTRACT_REF_NO||'~'
		AND	LTRIM(LTRIM(Z.FIELD_VAL,'0')) = '941'
	   )
OR
	( A.LCY_EQUIV < 12500
	-- fcc 3.8 retro (citiplc sfr 192 fcc352 13/09/2001)( A.LCY_EQUIV < 5499.5 
	  AND A.FT_TYPE = 'I' 
	  AND EXISTS
	           ( 
			SELECT 1 FROM oltms_udf_local_vals Z 
			WHERE  Z.FUNCTION_ID IN ('FTCONONL')
			AND	Z.FIELD_NAME = 'UPOSCODE'
			AND	Z.REC_KEY = A.CONTRACT_REF_NO||'~'
			AND	LTRIM(LTRIM(Z.FIELD_VAL,'0')) = '941'
		   )
	)
)
UNION ALL
SELECT DISTINCT 'FT',A.CONTRACT_REF_NO , '9'
FROM	OLTB_FTTB_CONTRACT_MASTER A,
	OLTB_DAILY_LOG_AC B
WHERE	A.CONTRACT_REF_NO = B.TRN_REF_NO
AND	A.FT_TYPE = 'I' 
AND	A.DR_ACCOUNT_BRANCH = GLOBAL.CURRENT_BRANCH
AND	A.CR_ACCOUNT_BRANCH = GLOBAL.CURRENT_BRANCH
AND
(	EXISTS
           ( 	SELECT 1 FROM oltms_udf_local_vals Z 
		WHERE  Z.FUNCTION_ID IN ('FTCONONL')
		AND	Z.FIELD_NAME = 'UPOSCODE'
		AND	Z.REC_KEY = A.CONTRACT_REF_NO||'~'
		AND	LTRIM(LTRIM(Z.FIELD_VAL,'0')) = '940'
	   )
OR
	( A.LCY_EQUIV < 12500 
	-- fcc 3.8 retro (citiplc sfr 192 fcc352 13/09/2001)( A.LCY_EQUIV < 5499.5 
	  AND A.FT_TYPE = 'O' 
	  AND EXISTS
	           ( 
			SELECT 1 FROM oltms_udf_local_vals Z 
			WHERE  Z.FUNCTION_ID IN ('FTCONONL')
			AND	Z.FIELD_NAME = 'UPOSCODE'
			AND	Z.REC_KEY = A.CONTRACT_REF_NO||'~'
			AND	LTRIM(LTRIM(Z.FIELD_VAL,'0')) = '940'
		   )
	)
)
/
create or replace synonym olvws_sven_exceptions for olvw_sven_exceptions
/