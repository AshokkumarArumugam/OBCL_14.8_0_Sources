CREATE OR REPLACE FORCE VIEW lbvw_participant_ratio
(CONTRACT_REF_NO, CUSTOMER_NO, COMPONENT, COMPONENT_TYPE, VALUE_DATE, 
 COMPONENT_RATIO, END_DATE)
AS 
/*-----------------------------------------------------------------------------------------------
**
** File Name    : lbvw_participant_ratio.VW
**
** Module       : LOANS and DEPOSITS                                                                              **
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
-----------------------------------------------------------------------------------------------
*/
/*
-----------------------------------------------------------------------------------------------
                                       Change History
-----------------------------------------------------------------------------------------------
FCC 4.6.2 Added new view for participant ratio summary
25-SEP-2006 FLEXCUBE V CL Release 7.1 ITR1 SFR #247 Changes by PIYUSH 
*/
SELECT
	P.CONTRACT_REF_NO
, 	P.CUSTOMER_NO
, 	P.COMPONENT
,	P.COMPONENT_TYPE
,	P.VALUE_DATE
, 	P.COMPONENT_RATIO
, 	NVL(LEAD(P.VALUE_dATE) OVER (PARTITION BY P.CONTRACT_REF_NO, P.CUSTOMER_NO, P.COMPONENT ORDER BY
					P.VALUE_DATE), '31-DEC-2099') END_DATE
FROM (	SELECT
		DISTINCT
		l.contract_ref_no
	,	l.customer_no
	,	l.component
	,	l.component_type
	,	l.value_date
	,	l.component_ratio
	FROM
		lbtb_participant_ratio l
	WHERE
		l.event_seq_no = (SELECT
					MAX(event_seq_no)
				FROM
					lbtb_participant_ratio
				WHERE
					contract_ref_no = l.contract_ref_no
				AND	customer_no = l.customer_no
				AND	component = l.component
				AND	component_type = l.component_type
				AND	value_date = l.value_date
				)
	--25-SEP-2006 FLEXCUBE V CL Release 7.1 ITR1 SFR #247 Changes by PIYUSH 
	 AND  l.value_date= (SELECT
					MAX(value_date)
				FROM
					lbtb_participant_ratio
				WHERE
					contract_ref_no =l.contract_ref_no
				AND	customer_no = l.customer_no
				AND	component = l.component
				AND	component_type = l.component_type)
	--25-SEP-2006 FLEXCUBE V CL Release 7.1 ITR1 SFR #247 Changes by PIYUSH 
	) P
/
CREATE OR REPLACE SYNONYM lbvws_participant_ratio FOR lbvw_participant_ratio
/