CREATE OR REPLACE FORCE VIEW olvw_lq_pending_items ( BR,MD, RN, MT, EV,ID ) 
AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_lq_pending_items.VW
**
** Module       : CORE ENTITIES										**
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
/*Change_history
19-DEC-2002 FCC 4.2 FEB 2003 RETRO CITIPLC PLC4001021 Tuning for performance
Change_history */
(
	SELECT	DISTINCT (SELECT sypks_utils.get_branch(A.LIQ_REF_NO) FROM DUAL) br, --ADDED DISTINCT PLC4001021 Tuning for performance
      			 'LQ' md,
      			 a.liq_ref_no rn,
    			 '' mt,
    			 '' ev, --b.event_descr  PLC4001021 Tuning for performance
    			a.maker_id id
	FROM	oltbs_liq_events a --, oltbs_event b PLC4001021 Tuning for performance
	WHERE	a.liq_auth_status = 'U'
	AND		a.liq_event_code in ('ZRLQ', 'ZRVR') 
	AND		a.liq_status in ('OS', 'COL', 'REV') 
			/* use DISTINCT instead of subquery PLC4001021 Tuning for performance
			and
			a.liq_event_seq_no = (	select max(liq_event_seq_no)
			from oltbs_liq_events
			where liq_ref_no = a.liq_ref_no) and	
			b.module = 'LQ' and
			a.liq_event_code = b.event_code */
)
/
CREATE OR REPLACE SYNONYM olvws_lq_pending_items FOR olvw_lq_pending_items
/