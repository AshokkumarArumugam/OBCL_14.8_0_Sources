CREATE OR REPLACE FORCE VIEW lbvw_classified_investors
(	BORROWER_CONTRACT_REF_NO
,	COUNTERPARTY
,	CUSTOMER_NAME
,	CLASSIFICATION
) AS
/*----------------------------------------------------------------------------------------------------
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
SELECT 	a.borrower_contract_ref_no,a.counterparty,x.customer_name1||x.customer_name2,x.classification
FROM	lptbs_contract_master a,oltbs_contract b,oltms_customer x
WHERE	a.contract_ref_no 	= b.contract_ref_no
AND		a.version_no		= b.latest_version_no
AND 	NVL(rounding_participant,'N')<>'Y'
AND  	x. customer_no = a.counterparty
AND		NVL(x.classification,'Current')<> 'Current'
AND		x.record_stat		= 'O'
AND		x.auth_stat		= 'A'		
AND     EXISTS (
				SELECT 1
				FROM   oltbs_amount_due c
				WHERE  a.Contract_ref_no = c.contract_ref_no
				HAVING SUM(NVL(c.amount_due,0) - NVL(c.amount_settled,0) - NVL(c.pay_recv_amount,0)) <> 0
				)
UNION
SELECT 	distinct d.contract_ref_no borrower_contract_ref_no,
		a.counterparty,x.customer_name1||x.customer_name2,x.classification
FROM	lptbs_contract_master a,oltbs_contract b,oltms_customer x,
		lbtbs_contract_consol_detail d
WHERE	a.contract_ref_no 	= b.contract_ref_no
AND		a.version_no		= b.latest_version_no
AND     a.borrower_contract_ref_no = d.child_ref_no
AND  	x. customer_no = a.counterparty
AND		NVL(x.classification,'Current')<> 'Current'
AND		x.record_stat		= 'O'
AND		x.auth_stat			= 'A'											   
AND     EXISTS (
				SELECT 1
				FROM   oltbs_amount_due c
				WHERE  a.Contract_ref_no = c.contract_ref_no
				HAVING SUM(NVL(c.amount_due,0) - NVL(c.amount_settled,0) - NVL(c.pay_recv_amount,0)) <> 0
				)
UNION
SELECT  e.contract_ref_no,e.participant,e.customer_name1||e.customer_name2,e.classification
FROM 	(SELECT contract_ref_no,event_seq_no,value_date,participant,asset_ratio,
	 y.customer_name1, y.customer_name2,y.classification,
		MAX(event_seq_no)
		OVER ( PARTITION BY
			contract_ref_no,participant,value_date
		     ) evno,
		MAX(value_date)
		OVER ( PARTITION BY
			contract_ref_no,participant
		     ) mxdt
	FROM	lbtbs_contract_participant x
	,       oltm_customer              y
	WHERE	NVL(y.classification,'Current') <> 'Current'
	AND     x.participant = y.customer_no
	AND	y.record_stat		= 'O'
	AND	y.auth_stat		= 'A'
	) e
WHERE	e.event_seq_no  = evno
AND     e.value_date = mxdt
AND     e.asset_ratio > 0
ORDER BY 2 ASC
/
CREATE OR REPLACE SYNONYM lbvws_classified_investors FOR lbvw_classified_investors
/