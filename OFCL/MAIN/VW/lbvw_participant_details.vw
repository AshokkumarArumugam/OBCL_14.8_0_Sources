CREATE OR REPLACE FORCE VIEW lbvw_participant_details 
	( CONTRACT_REF_NO, 
	  FC_CONTRACT_REF_NO, FC_USER_REF_NO, FC_CUSTOM_REF_NO,
	  TR_CONTRACT_REF_NO, TR_USER_REF_NO, TR_CUSTOM_REF_NO, 
	  DR_CONTRACT_REF_NO, DR_USER_REF_NO, DR_CUSTOM_REF_NO,
	  DRAWDOWN_NO, BORROWER, CONTRACT_TYPE, BORROWER_REF_NO
	)
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lbvw_participant_details.VW
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
SELECT	B.CONTRACT_REF_NO, C.FC_CONTRACT_REF_NO, C.FC_USER_REF_NO, C.FC_CUSTOM_REF_NO,
	  	C.TR_CONTRACT_REF_NO, C.TR_USER_REF_NO, C.TR_CUSTOM_REF_NO	,
      	B.CONTRACT_REF_NO, B.USER_REF_NO, A.CUSTOM_REF_NO, B.PARTY_DRAWDOWN_NO,
	  	D.COUNTERPARTY, 'DR', B.BORROWER_CONTRACT_REF_NO
FROM  	oltbs_contract A,
		lptbs_contract_master B,
	 	lbvws_pt_tranche_details C,
	 	oltbs_contract D
WHERE	B.PRODUCT_TYPE	      = 'D'
AND  	B.CONTRACT_REF_NO	  = A.CONTRACT_REF_NO
AND  	B.VERSION_NO   	 	  = A.LATEST_VERSION_NO
AND   	C.FC_CONTRACT_REF_NO  = B.PARTY_FACILITY_REF_NO
AND  	C.TR_CONTRACT_REF_NO  = B.PARTY_TRANCHE_REF_NO
AND  	D.CONTRACT_REF_NO	  = B.BORROWER_CONTRACT_REF_NO	
UNION
SELECT	TR_CONTRACT_REF_NO, FC_CONTRACT_REF_NO, FC_USER_REF_NO, FC_CUSTOM_REF_NO,
 	 	TR_CONTRACT_REF_NO, TR_USER_REF_NO, TR_CUSTOM_REF_NO, 
     	'','','',0,BORROWER,'TR',BORROWER_REF_NO
FROM 	lbvws_pt_tranche_details
UNION
SELECT  B.CONTRACT_REF_NO,B.CONTRACT_REF_NO, B.USER_REF_NO, A.CUSTOM_REF_NO,
	    '','','','','','',0,C.COUNTERPARTY,'FC',B.BORROWER_CONTRACT_REF_NO
FROM    oltbs_contract A,
		lptbs_contract_master B,
        oltbs_contract C
WHERE   B.PRODUCT_TYPE 		 = 'F'
AND     B.CONTRACT_REF_NO 	 = A.CONTRACT_REF_NO
AND     B.VERSION_NO 		 = A.LATEST_VERSION_NO
AND     C.CONTRACT_REF_NO    = B.BORROWER_CONTRACT_REF_NO

/
CREATE OR REPLACE SYNONYM lbvws_participant_details FOR lbvw_participant_details
/