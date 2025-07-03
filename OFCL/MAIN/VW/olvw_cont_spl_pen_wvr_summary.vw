CREATE OR REPLACE force VIEW olvw_cont_spl_pen_wvr_summary AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_cont_spl_pen_wvr_summary.VW
**
** Module	: Core Services
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
/*----------------------------------------------------------------------------------------------------
CHANGE HISTORY
11-APR-2012 Flexcube V.CL Release 7.11 FS Tag 06 Changes, Grace Periods for loan activity and account for late charges
----------------------------------------------------------------------------------------------------
*/
SELECT
w1.contract_ref_no
, w1.event_seq_no
, l.event_code
, l.auth_status
, w1.penalty_component
, w1.due_date
, w1.grace_days
, w1.penalty_calc_date
, w1.penalty_amount_due
, w1.penalty_amount_settled
, DECODE(SIGN(NVL(w1.penalty_amount_due, 0) - NVL(w1.penalty_amount_settled, 0)), 0 , 'Paid', -1, 'Over Paid','Unpaid') AS penalty_payment_status
, DECODE(NVL(w1.waived, 'N'), 'Y','Yes', 'No') AS waived
, w1.basis_amount_due
, w1.basis_amount_settled
, w1.remarks
FROM	oltbs_contract_penalty_waiver w1, oltbs_contract_event_log l
WHERE	w1.contract_ref_no	= l.contract_ref_no
AND	w1.event_seq_no		= l.event_seq_no
AND	w1.event_seq_no		=
				(
				SELECT	MAX(w2.event_seq_no)
				FROM	oltbs_contract_penalty_waiver w2
				WHERE	w2.contract_ref_no	= w1.contract_ref_no
				AND	w2.penalty_component	= w1.penalty_component
				AND	w2.due_date		= w1.due_date
				)
ORDER BY contract_ref_no, event_seq_no, penalty_component, due_date
/
 
CREATE OR REPLACE SYNONYM olvws_cont_spl_pen_wvr_summary FOR olvw_cont_spl_pen_wvr_summary
/