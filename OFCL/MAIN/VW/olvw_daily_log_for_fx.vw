CREATE OR REPLACE FORCE VIEW olvw_daily_log_for_fx
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_daily_log_for_fx.VW
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
,		c.custom_ref_no		cs_custom_ref_no
,		d.bot_ccy
,		d.sold_ccy
,		d.bot_ac
,		d.sold_ac
,		d.bot_amount
,		d.sold_amount
,		d.bot_value_date
,		d.sold_value_date
,		d.ex_rate		deal_rate
,		d.lcy_equivalent
,		d.broker
,		d.spot_date
,		d.spot_rate		
,		d.counterparty
,		d.external_ref_no
,		e.short_name
,		e.customer_name1
,		e.address_line1
,		e.address_line2
,		e.address_line3
,		e.address_line4
FROM		oltbs_daily_log_ac		a
,		oltbs_class_mapping	b
,		oltbs_contract		c
,		xxtbs_contract_master	d
,		oltms_customer		e
WHERE		a.balance_upd		= 'U'
AND		a.cust_gl		= 'G'
AND		a.ac_branch		= global.current_branch
AND		a.delete_stat		= CHR(32)
AND		a.module		= 'FX'
AND		a.ac_branch		= b.branch_code
AND		a.trn_ref_no		= b.unit_ref_no
AND		b.unit_type		= 'R'
AND		a.trn_ref_no		= c.contract_ref_no
AND		c.contract_ref_no	= d.contract_ref_no
--AND		c.latest_event_seq_no	= d.event_seq_no
AND		c.latest_version_no	= d.version_no		-- 23/06/2003 SFR PLC4003054 CITIPLC 
AND		d.counterparty		= e.customer_no
/
CREATE OR REPLACE SYNONYM olvws_daily_log_for_fx FOR olvw_daily_log_for_fx
/