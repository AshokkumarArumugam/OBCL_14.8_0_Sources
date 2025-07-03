CREATE OR REPLACE FORCE VIEW olvw_transactor_flow_hoff
	(
	contract_ref_no,
	due_date,
	custom_ref_no,
	currency_amt_due,
	component,
	inflow_outflow,
	amount_due,
	module_code
	)
AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_transactor_flow_hoff.VW
**
** Module       : INTERFACES
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
**
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
-----------------------------------------------------------------------------------------------
*/
/* 
-------------------------------------------------------------------------------------------------------------------------
CHANGE HISTORY : 
07/06/2004	CITIPLC	PLC44130033		Additional Enhancement - 4.4.1
-------------------------------------------------------------------------------------------------------------------------
*/
SELECT	b.contract_ref_no,
		b.due_date,
		a.custom_ref_no,
		b.currency_amt_due,
		DECODE(	b.component,	
			'PRINCIPAL',	2,
			'COMMIT-FEE',	4,
			'FACFEE',	4,
			'FAS91-FEE',	4,
			'UPF-FEE',	4,
			DECODE(b.component_type,'I',1,99)
			) component,
		b.inflow_outflow,
		SUM(NVL(b.amount_due, 0) -NVL(b.amount_settled, 0) - NVL(b.adjusted_amount, 0)) amount_due,
		a.module_code
FROM		oltbs_contract a,
		oltbs_amount_due b
WHERE		a.branch		=	global.current_branch
AND		a.module_code		IN	('OL','MM')
AND		a.product_type 	<>	'C'
AND		NVL(b.amount_due, 0) -NVL(b.amount_settled, 0) - NVL(b.adjusted_amount, 0) > 0
AND		b.due_date	>= global.application_date
AND		(	a.contract_status	=	'A'
		OR	a.contract_status	=	'Y'
		OR	(	a.contract_status	=	'L'
			AND EXISTS	(	SELECT	1
						FROM	oltbs_contract_event_log c
						WHERE	c.contract_ref_no	=	a.contract_ref_no
						AND	TRUNC(c.event_date)	=	TRUNC(global.application_date)
					)
			)
		OR	(	a.contract_status	=	'V'
			AND EXISTS	(	SELECT	1
						FROM	oltbs_contract_event_log c
						WHERE	c.contract_ref_no	=	a.contract_ref_no
						AND	TRUNC(c.event_date)	>=	TRUNC(global.application_date)
					)
			)
		)
AND		b.contract_ref_no	=	a.contract_ref_no
GROUP BY	b.contract_ref_no,
		b.currency_amt_due,
		b.inflow_outflow,
		a.custom_ref_no,
		DECODE(	b.component,	
			'PRINCIPAL',	2,
			'COMMIT-FEE',	4,
			'FACFEE',	4,
			'FAS91-FEE',	4,
			'UPF-FEE',	4,
			DECODE(b.component_type,'I',1,99)
			),
		due_date,
		a.module_code
/
CREATE or replace SYNONYM olvws_transactor_flow_hoff FOR olvw_transactor_flow_hoff
/