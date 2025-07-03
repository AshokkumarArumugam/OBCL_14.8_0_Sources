CREATE OR REPLACE FORCE VIEW olvw_commitment_quick_summary
	(
	BRANCH,PRODUCT_TYPE,CONTRACT_REF_NO,CUSTOMER_NO,SSN,CUSTOMER_NAME1,ADDRESS_LINE1,TXN_MIS_1,
	REVOLVING_COMMITMENT,MATURITY_DATE,LAST_AVAILABLE_DATE,USER_DEFINED_STATUS
	,address_line2,address_line3, address_line4, facility_name,zip_code --11-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG SITERETRO 08-AUG-2009:CITIPBG TILL#188
	)
AS/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_commitment_quick_summary.VW
**
** Module	: LD
**
**This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
/* CHANGE HISTORY
11-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG SITERETRO 08-AUG-2009:CITIPBG TILL#188 Added address columns, facilty name and zip code to display in commitment quick summary detail screen.
*/
SELECT A.BRANCH,a.product_type,A.CONTRACT_REF_NO,E.CUSTOMER_NO,E.SSN,E.CUSTOMER_NAME1,E.ADDRESS_LINE1,
D.cust_mis_1 TXN_MIS_1,F.REVOLVING_COMMITMENT,B.MATURITY_DATE ,B.LAST_AVAILABLE_DATE ,
B.USER_DEFINED_STATUS
,e.address_line2,e.address_line3,e.address_line4,b.facility_name,e.zip_code --11-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG SITERETRO 08-AUG-2009:CITIPBG TILL#188
FROM oltbs_contract A,oltbs_contract_master B,
oltms_customer_default D,oltms_customer E,oltbs_contract_preference F
WHERE A.PRODUCT_TYPE='C'
AND A.CONTRACT_STATUS <> 'H'
AND A.MODULE_CODE='OL'
AND B.CONTRACT_REF_NO = A.CONTRACT_REF_NO
AND B.VERSION_NO = A.LATEST_VERSION_NO
AND E.CUSTOMER_NO = A.COUNTERPARTY
AND D.customer(+) = b.counterparty
AND F.CONTRACT_REF_NO = A.CONTRACT_REF_NO
AND F.VERSION_NO = A.LATEST_VERSION_NO
/
CREATE OR REPLACE SYNONYM olvws_commitment_quick_summary FOR olvw_commitment_quick_summary
/