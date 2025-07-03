CREATE OR REPLACE FORCE VIEW lbvw_pt_tranche_details 
(  FC_CONTRACT_REF_NO, FC_USER_REF_NO, FC_CUSTOM_REF_NO, 
   TR_CONTRACT_REF_NO, TR_USER_REF_NO, TR_CUSTOM_REF_NO, 
   BORROWER, BORROWER_REF_NO 
)
AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lbvw_pt_tranche_details.VW
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
SELECT B.PARTY_FACILITY_REF_NO, C.USER_REF_NO, C.CUSTOM_REF_NO,
       B.CONTRACT_REF_NO, B.USER_REF_NO, A.CUSTOM_REF_NO,
	   D.COUNTERPARTY, B.BORROWER_CONTRACT_REF_NO
FROM   oltbs_contract A,
 	   lptbs_contract_master B,
       oltbs_contract C,
	   oltbs_contract D
WHERE  B.PRODUCT_TYPE 		= 'T'
AND    B.CONTRACT_REF_NO    = A.CONTRACT_REF_NO
AND    B.VERSION_NO         = A.LATEST_VERSION_NO 
AND    C.CONTRACT_REF_NO    = B.PARTY_FACILITY_REF_NO
AND    D.CONTRACT_REF_NO    = B.BORROWER_CONTRACT_REF_NO
/
CREATE OR REPLACE SYNONYM lbvws_pt_tranche_details FOR lbvw_pt_tranche_details
/