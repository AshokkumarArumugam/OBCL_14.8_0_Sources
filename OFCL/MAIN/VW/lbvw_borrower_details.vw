CREATE OR REPLACE FORCE VIEW lbvw_borrower_details 
	(CONTRACT_REF_NO, FC_CONTRACT_REF_NO, FC_USER_REF_NO, FC_CUSTOM_REF_NO, 
	 TR_CONTRACT_REF_NO, TR_USER_REF_NO, TR_CUSTOM_REF_NO, 
	 DR_CONTRACT_REF_NO, DR_USER_REF_NO, DR_CUSTOM_REF_NO, 
	 DRAWDOWN_NO, BORROWER, CONTRACT_TYPE
    ) 
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lbvw_borrower_details.VW
**
** Module      : Syndication Loans and Commitments
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
SELECT 	B.CONTRACT_REF_NO,C.FC_CONTRACT_REF_NO, C.FC_USER_REF_NO, C.FC_CUSTOM_REF_NO,
 		C.TR_CONTRACT_REF_NO, C.TR_USER_REF_NO, C.TR_CUSTOM_REF_NO,
		B.CONTRACT_REF_NO, B.USER_REF_NO, A.CUSTOM_REF_NO,
        B.DRAWDOWN_NO, A.COUNTERPARTY,'DR'
FROM  	oltbs_contract A,
		oltbs_contract_master B,
	    lbvws_br_tranche_details C 
WHERE 	A.MODULE_CODE 		 = 'LB'
AND     A.PRODUCT_TYPE		 = 'L'
AND 	B.CONTRACT_REF_NO    = A.CONTRACT_REF_NO
AND   	B.VERSION_NO 		 = A.LATEST_VERSION_NO
AND   	C.FC_CONTRACT_REF_NO = B.SYNDICATION_REF_NO
AND   	C.TR_CONTRACT_REF_NO = B.TRANCHE_REF_NO
UNION
SELECT	TR_CONTRACT_REF_NO,FC_CONTRACT_REF_NO, FC_USER_REF_NO, FC_CUSTOM_REF_NO,
 	 	TR_CONTRACT_REF_NO, TR_USER_REF_NO, TR_CUSTOM_REF_NO,
     	'','','',0,BORROWER,'TR'
FROM 	lbvws_br_tranche_details
UNION
SELECT 	B.CONTRACT_REF_NO,B.CONTRACT_REF_NO, B.USER_REF_NO, A.CUSTOM_REF_NO,
       	'','','','','','',0,A.COUNTERPARTY, 'FC'
FROM 	oltbs_contract A,
		lbtbs_syndication_master B
WHERE 	B.CONTRACT_REF_NO   = A.CONTRACT_REF_NO
AND   	B.VERSION_NO	    = A.LATEST_VERSION_NO
/
CREATE OR REPLACE SYNONYM lbvws_borrower_details FOR lbvw_borrower_details
/