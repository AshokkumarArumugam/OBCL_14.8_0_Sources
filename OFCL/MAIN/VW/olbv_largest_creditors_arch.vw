CREATE OR REPLACE FORCE VIEW olbv_largest_creditors_arch(PROD,BRN,CP,NAME,FCY,LCY,CCY,VD,MD) AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olbv_largest_creditors_arch.VW
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
SELECT A.PRODUCT_CODE PROD
, A.BRANCH BRN
, A.COUNTERPARTY CP
, F.CUSTOMER_NAME1 NAME
, D.PRINCIPAL_OUTSTANDING_BAL FCY
, olpkss_bo_conv.fn_convert( A.BRANCH, B.CURRENCY, 'USD',D.PRINCIPAL_OUTSTANDING_BAL,'Y') LCY
, B.CURRENCY CCY
, B.VALUE_DATE VD
, B.MATURITY_DATE MD
FROM olars_contract A
, olars_contract_master B
, olars_contract_balance D
, oltms_customer F WHERE
A.CONTRACT_REF_NO = B.CONTRACT_REF_NO
AND A.LATEST_VERSION_NO = B.VERSION_NO
AND (A.MODULE_CODE IN ('OL','OD') AND B.PRODUCT_TYPE IN ('L','D'))  --31.01.2002 FCC 3.9 PLNCITI TILL# 3798 Added OD.   ...Puranjit
AND A.CONTRACT_REF_NO = D.CONTRACT_REF_NO
AND A.CONTRACT_STATUS = 'A'
AND A.COUNTERPARTY = F.CUSTOMER_NO
UNION
SELECT --A.ACCOUNT_CLASS PROD
A.AC_CLASS PROD
	, A.BRANCH_CODE BRN
	, A.CUST_NO CP
	, F.CUSTOMER_NAME1 NAME
	--, A.ACY_CURR_BALANCE FCY
	--, A.LCY_CURR_BALANCE LCY
	, null,null
	--, A.CCY CCY
	, A.ac_gl_CCY CCY
	, E.TODAY VD
	, E.TODAY MD
FROM
--STTMS_CUST_ACCOUNT A, STTMS_ACCOUNT_BAL_TOV B, STTMS_DATES E
oltb_account A, oltb_account B, STTMS_DATES E
, oltms_customer F
WHERE A.BRANCH_CODE = E.BRANCH_CODE
--AND B.LCY_CURR_BALANCE > 0            --31.01.2002 FCC 3.9 PLNCITI TILL# 3798.   ...Puranjit
AND A.BRANCH_CODE = B.BRANCH_CODE --FCC 4.0 June 2002 PLNCITI SFR No 4149
--AND A.CUST_AC_NO = B.CUST_AC_NO       --31.01.2002 FCC 3.9 PLNCITI TILL# 3798.   ...Puranjit
AND A.ac_gl_no = B.ac_gl_no  
AND A.CUST_NO = F.CUSTOMER_NO
/