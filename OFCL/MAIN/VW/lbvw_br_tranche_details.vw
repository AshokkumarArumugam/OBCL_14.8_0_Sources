CREATE OR REPLACE FORCE VIEW lbvw_br_tranche_details 
	( FC_CONTRACT_REF_NO, FC_USER_REF_NO, FC_CUSTOM_REF_NO,
	  TR_CONTRACT_REF_NO, TR_USER_REF_NO, TR_CUSTOM_REF_NO,
	  BORROWER ) 
AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lbvw_br_tranche_details.VW
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
SELECT  C.CONTRACT_REF_NO, C.USER_REF_NO, D.CUSTOM_REF_NO ,
	  	B.CONTRACT_REF_NO, B.USER_REF_NO, A.CUSTOM_REF_NO,
	  	A.COUNTERPARTY
FROM 	oltbs_contract A,
	    oltbs_contract_master B,
  	    lbtbs_syndication_master C,
 	    oltbs_contract D
WHERE   A.MODULE_CODE	    = 'LB'
AND     A.PRODUCT_TYPE		= 'C'
AND     B.CONTRACT_REF_NO   = A.CONTRACT_REF_NO
AND     B.VERSION_NO 	    = A.LATEST_VERSION_NO
AND     C.CONTRACT_REF_NO   = B.SYNDICATION_REF_NO
AND     D.CONTRACT_REF_NO   = C.CONTRACT_REF_NO
AND     D.LATEST_VERSION_NO	= C.VERSION_NO
/
CREATE OR REPLACE SYNONYM lbvws_br_tranche_details FOR lbvw_br_tranche_details
/