CREATE OR REPLACE FORCE VIEW lbvw_participant_ratio_gtemp AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lbvw_participant_ratio_gtemp.VW
**
** Module	: LOAN SYNDICATION
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
		(SELECT contract_ref_no,event_seq_no,customer_no,component_type,
			     component,component_ratio,value_date,
			     MAX(event_seq_no)
			     OVER ( PARTITION BY
				    contract_ref_no,customer_no,component,component_type,value_date
				  ) evno
		 FROM lbtbs_gtemp_part_ratio 
		) l
	WHERE
		l.event_seq_no =	evno
	) P
/
create OR REPLACE synonym lbvws_participant_ratio_gtemp for lbvw_participant_ratio_gtemp
/