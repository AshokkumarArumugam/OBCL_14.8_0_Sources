CREATE OR REPLACE FORCE VIEW olvw_daily_log_for_ldmm
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_daily_log_for_ldmm.VW
**
** Module      : Reporting System
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
CHANGE HISTORY
06-FEB-2004 PLC44060008		DROP and CREATE SYNONYM added at the end of the view.
*/
--
--
--		LD and MM
--
--
SELECT		a.*
,		b.txn_mis_1
,		b.txn_mis_2
,		b.txn_mis_3
,		b.txn_mis_4
,		b.txn_mis_5
,		b.txn_mis_6
,		b.txn_mis_7
,		b.txn_mis_8
,		b.txn_mis_9
,		b.txn_mis_10
,		c.user_ref_no
,		c.custom_ref_no			cs_custom_ref_no
,		c.counterparty
,		d.product
,		d.product_type
,		d.value_date
,		d.original_start_date
,		d.maturity_date
,		d.notice_days
,		e.rate_code
,		e.rate
,		e.spread
,		e.interest_basis
,		f.customer_name1
FROM		oltbs_daily_log_ac			a
,		oltbs_class_mapping		b
,		oltbs_contract			c
,		oltbs_contract_master		d
,		lftbs_contract_interest		e
,		oltm_customer			f
WHERE		a.balance_upd			= 'U'
AND		a.cust_gl			= 'G'
AND		a.ac_branch			= global.current_branch
AND		a.delete_stat			= CHR(32)
AND		a.module			IN ('OL','MM')
AND		a.ac_branch			= b.branch_code
AND		a.trn_ref_no			= b.unit_ref_no
AND		b.unit_type			= 'R'
AND		a.trn_ref_no			= c.contract_ref_no
AND		c.contract_ref_no		= d.contract_ref_no
AND		c.latest_version_no		= d.version_no
AND		e.contract_reference_no		= d.contract_ref_no
AND		e.event_sequence_no		= (	SELECT	MAX(event_sequence_no)
							FROM	lftbs_contract_interest es
							WHERE	es.contract_reference_no 	= e.contract_reference_no
							AND	es.component			= e.component
							AND	es.pickup_event_sequence_no 	= 1
						  )
AND		e.pickup_event_sequence_no	= 1
AND		e.shown_in_contract_main_screen	= 'Y'
AND		d.counterparty			= f.customer_no
/
CREATE OR REPLACE SYNONYM olvws_daily_log_for_ldmm FOR olvw_daily_log_for_ldmm
/