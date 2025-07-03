CREATE OR REPLACE FORCE VIEW lbvw_cont_flrclg_adj_summary
AS
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
SELECT
a.contract_ref_no
, m.tranche_ref_no
, m.facility_name
, m.external_cusip_no
, a.event_seq_no
, l.event_code
, a.effective_date
, a.adj_margin_comp
, DECODE(a.propagation_mode,'B','Batch','O','Online','xxxxx') prop_mode
, DECODE(a.propagation_status,'U','Unprocessed','P','Processed','xxxxx') prop_status
, a.user_input_rate
, a.margin_aftr_flrclg_prop
, a.adjusted_rate_on_allin_rate
, a.allin_rate
, a.new_rate_effect_flrclg
, a.margin_rate
, a.adjusted_rate
, NVL(a.adjusted_rate,0) + NVL(a.adjusted_rate_on_allin_rate,0) total_adj_rate
, a.prop_seq_no
, a.base_rate_floor
, a.base_rate_ceiling
FROM	lbtbs_contract_flrclg_adj a
	, oltbs_contract c
	, oltbs_contract_master m
	, oltbs_contract_event_log l
WHERE	c.contract_ref_no	= a.contract_ref_no
AND	m.contract_ref_no	= c.contract_ref_no
AND	l.contract_ref_no	= c.contract_ref_no
AND	m.version_no		= c.latest_version_no
AND	l.event_seq_no		= a.event_seq_no
AND	c.contract_status	= 'A'
AND	c.product_type 		= 'L'
AND	c.module_code		= 'LB'
/


CREATE OR REPLACE SYNONYM lbvws_cont_flrclg_adj_summary FOR lbvw_cont_flrclg_adj_summary
/