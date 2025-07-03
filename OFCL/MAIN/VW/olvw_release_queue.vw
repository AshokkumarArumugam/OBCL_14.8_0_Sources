CREATE OR REPLACE FORCE VIEW	olvw_release_queue
		(
		row_id,
		module_code,
		department_code,
		branch,
		treasury_source,
		contract_ref_no,
		user_ref_no,
		custom_ref_no,
		event_seq_no,
		event_code,
		counterparty,
		booking_date,
		deal_date,
		value_date,
		maturity_date,
		currency,
		amount,
		outstanding_amount,    --FCC4.5 APR 2004 CITILATAM OPUAT SFR 39
		workflow_status,
		rate_revision_status,
		maker_id,		-- FCC4.5 APR 2004 CITILATAM OPUAT SFR #28 Maker_ID added..
		checker_id		-- FCC4.5 APR 2004 CITILATAM OPUAT SFR #28 Checker_ID added..
		)
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_release_queue.VW
**
** Module      : Loans and Deposits
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
/*
--------------------------------------------------------------------------------------------------------
** CHANGE HISTORY
   10/APR/2002 FCC4.2	BANGALORE FCC4.2 OPS CHanges. Logic  Column Changes in the view
   22-JAN-2004 FCC4.5 APR 2004 CITILATAM OPUAT 39 CHANGES The outstanding amount has been added to show 
				the outstanding principal in the release queue.
   23-JAN-2004 FCC4.5 APR 2004 CITILATAM OPUAT SFR #28 Maker Id and Checker Id added in the view. 
-------------------------------------------------------------------------------------------------------
*/
SELECT 	a.rowid,
		a.module_code,
		a.department_code,
		a.branch,
		a.treasury_source,
		a.contract_ref_no,
		a.user_ref_no,
		a.custom_ref_no,
		b.event_seq_no,
		b.event_code,
		c.counterparty,
		c.booking_date,
		c.deal_date,
		c.value_date,
		c.maturity_date,
		c.currency,
		c.amount,
		d.principal_outstanding_bal,  --FCC4.5 APR 2004 CITILATAM OPUAT SFR 39
		a.workflow_status,
		a.rate_revision_status,
		b.maker_id,		-- FCC4.5 APR 2004 CITILATAM OPUAT SFR #28 Maker_ID added..
		b.checker_id		-- FCC4.5 APR 2004 CITILATAM OPUAT SFR #28 Checker_ID added..
FROM		oltbs_contract a,
		oltbs_contract_event_log b,
		oltbs_contract_master c,
		oltbs_contract_balance d	--FCC4.5 APR 2004 CITILATAM OPUAT SFR 39
WHERE		a.module_code				IN	('OL','LB','MM','SR')
AND		(	a.workflow_status			=	'AU'
		OR	a.rate_revision_status		=	'AU'
		)
AND		b.contract_ref_no		=	a.contract_ref_no
AND		a.contract_ref_no		=	d.contract_ref_no --FCC4.5 APR 2004 CITILATAM OPUAT SFR 39
AND		b.workflow_status				=	a.workflow_status
AND		NVL(b.rate_revision_status,'NA')	=	NVL(a.rate_revision_status,'NA')
AND		c.contract_ref_no				=	a.contract_ref_no
AND		c.version_no				=	a.latest_version_no
/
CREATE OR REPLACE SYNONYM olvws_release_queue FOR olvw_release_queue
/