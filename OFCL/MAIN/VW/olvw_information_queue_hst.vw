CREATE OR REPLACE FORCE VIEW
olvw_information_queue_hst(ROW_ID,MODULE_CODE,DEPARTMENT_CODE,BRANCH,TREASURY_SOURCE,CONTRACT_REF_NO,USER_REF_NO,CUSTOM_REF_NO,EVENT_SEQ_NO,EVENT_CODE,INFORM_STATUS,COUNTERPARTY,BOOKING_DATE,DEAL_DATE,VALUE_DATE,MATURITY_DATE,CURRENCY,AMOUNT,WORKFLOW_STATUS,REVISION_STATUS) AS (SELECT
		a.rowid,
		a.module_code,
		a.department_code,
		a.branch,
		a.treasury_source,
		a.contract_ref_no,
		a.user_ref_no,
		a.custom_ref_no,
		b.event_seq_no,
		b.event_code,
		b.inform_status,
		c.counterparty,
		c.booking_date,
		c.deal_date,
		c.value_date,
		c.maturity_date,
		c.currency,
		c.amount,
		--
		--FCC 4.2 OPS focus testing SFR 17 changes start
		--
		a.workflow_status,
		a.rate_revision_status
		--
		--FCC 4.2 OPS focus testing SFR 17 changes end
		--
FROM		oltbs_contract a,
		oltbs_contract_event_log b,
		oltbs_contract_master c
WHERE		a.module_code			IN	('OL','LB','MM','SR')
AND		b.contract_ref_no			=	a.contract_ref_no
AND		c.contract_ref_no			=	a.contract_ref_no
AND		c.version_no			=	a.latest_version_no
AND 		b.inform_status			= 	'Y')
UNION
(SELECT
		a.rowid,
		a.module_code,
		a.department_code,
		a.branch,
		a.treasury_source,
		a.contract_ref_no,
		a.user_ref_no,
		a.custom_ref_no,
		b.event_seq_no,
		b.event_code,
		b.inform_status,
		c.counterparty,
		c.booking_date,
		c.deal_date,
		c.value_date,
		c.maturity_date,
		c.currency,
		c.amount,
		--
		--FCC 4.2 OPS focus testing SFR 17 changes start
		--
		a.workflow_status,
		a.rate_revision_status
		--
		--FCC 4.2 OPS focus testing SFR 17 changes end
		--
FROM		olars_contract a,
		olars_contract_event_log b,
		olars_contract_master c
WHERE		a.module_code			IN	('OL','LB','MM','SR')
AND		b.contract_ref_no			=	a.contract_ref_no
AND		c.contract_ref_no			=	a.contract_ref_no
AND		c.version_no			=	a.latest_version_no
AND 		b.inform_status			= 	'Y')
-- OFCL12.2 Not required
/*UNION
(SELECT
		a.rowid,
		a.module_code,
		a.department_code,
		a.branch,
		a.treasury_source,
		a.contract_ref_no,
		a.user_ref_no,
		a.custom_ref_no,
		b.event_seq_no,
		b.event_code,
		b.inform_status,
		c.counterparty,
		c.booking_date,
		c.deal_date,
		c.value_date,
		c.maturity_date,
		c.currency,
		c.amount,
		--
		--FCC 4.2 OPS focus testing SFR 17 changes start
		--
		a.workflow_status,
		a.rate_revision_status
		--
		--FCC 4.2 OPS focus testing SFR 17 changes end
		--
FROM		csPTS_contract a,
		csPTS_contract_event_log b,
		olpts_contract_master c
WHERE		a.module_code			IN	('OL','LB','MM','SR')
AND		b.contract_ref_no			=	a.contract_ref_no
AND		c.contract_ref_no			=	a.contract_ref_no
AND		c.version_no			=	a.latest_version_no
AND 		b.inform_status			= 	'Y')
UNION
(SELECT
		a.rowid,
		a.module_code,
		a.department_code,
		a.branch,
		a.treasury_source,
		a.contract_ref_no,
		a.user_ref_no,
		a.custom_ref_no,
		b.event_seq_no,
		b.event_code,
		b.inform_status,
		c.counterparty,
		c.booking_date,
		c.deal_date,
		c.value_date,
		c.maturity_date,
		c.currency,
		c.amount,
		--
		--FCC 4.2 OPS focus testing SFR 17 changes start
		--
		a.workflow_status,
		a.rate_revision_status
		--
		--FCC 4.2 OPS focus testing SFR 17 changes end
		--
FROM		csPPS_contract a,
		csPPS_contract_event_log b,
		olpps_contract_master c
WHERE		a.module_code			IN	('OL','LB','MM','SR')
AND		b.contract_ref_no			=	a.contract_ref_no
AND		c.contract_ref_no			=	a.contract_ref_no
AND		c.version_no			=	a.latest_version_no
AND 		b.inform_status			= 	'Y')*/
-- OFCL12.2 Not required
/