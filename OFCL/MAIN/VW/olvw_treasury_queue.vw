CREATE OR REPLACE FORCE VIEW olvw_treasury_queue
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
	workflow_status,
	rate_revision_status
 	)
 AS
 /*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_treasury_queue.VW
**
** Module      : Loans and Deposits
**
This source is part of the Oracle Banking Corporate Lending  Software Product. 
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
or otherwise, translated in any language or computer language, without the prior written permission 
of Oracle and/or its affiliates. 
**
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
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
		a.workflow_status,
		a.rate_revision_status
FROM		oltbs_contract a,
		oltbs_contract_event_log b,
		oltbs_contract_master c
WHERE		a.module_code				IN	('OL','LB','MM','SR')
AND		b.contract_ref_no				=	a.contract_ref_no
AND		c.contract_ref_no				=	a.contract_ref_no
AND		c.version_no				=	a.latest_version_no
AND		b.workflow_status				=	a.workflow_status
AND		NVL(b.rate_revision_status,'NA')	=	NVL(a.rate_revision_status,'NA')
AND		(	a.workflow_status			IN	('OL','RA')
		OR	a.rate_revision_status		IN	('OL','RA')
		)
/
create OR REPLACE synonym olvws_treasury_queue for olvw_treasury_queue
/