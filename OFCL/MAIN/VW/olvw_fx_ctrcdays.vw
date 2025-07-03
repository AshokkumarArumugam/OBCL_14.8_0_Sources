CREATE OR REPLACE force VIEW olvw_fx_ctrcdays AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_fx_ctrcdays.VW
**
** Module       : FX
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
-----------------------------------------------------------------------------------------------
*/
/*
CHANGE HISTORY
10-May-2004 FCC4.5 Lot2 Apr2004 ITR1 SFR 365 not picking unconfirmed contracts
*/
SELECT	c1.branch,
	f1.contract_ref_no,
	f1.counterparty,
	f1.bot_ccy,
	f1.bot_amount,
	f1.bot_value_date,
	f1.sold_ccy,
	f1.sold_amount,
	f1.sold_value_date,
	f1.booking_date_time
FROM	xxtbs_contract_master 	f1,
	oltbs_contract		c1
WHERE	f1.contract_ref_no	= c1.contract_ref_no
AND	c1.contract_status	= 'A'
AND	c1.auth_status		= 'A'
AND	f1.event_seq_no	=
	(
	SELECT	MAX(f2.event_seq_no)
	FROM	xxtbs_contract_master f2
	WHERE	f1.contract_ref_no 	= f2.contract_ref_no
	AND	f2.event_seq_no		<= c1.latest_event_seq_no
	)
AND EXISTS 
	(
	SELECT product_code FROM oltms_product_event_advice 
	WHERE msg_type = 'FX_COFIRMTRC' and 
	event_code = 'CTRC' 
	and product_code =  c1.product_code )
AND		NVL (C1.overall_conf_stat,'N') NOT IN ('Y','W')
/*AND	NOT EXISTS
	(
	SELECT	contract_ref_no
	FROM	oltbs_contract_confirm c2
	WHERE	module	='FX'
	and	c2.contract_ref_no = f1.contract_ref_no
	--10-May-2004 FCC4.5 Lot2 Apr2004 ITR1 SFR 365	 starts
	AND	(	c2.cparty_confirmation_date	IS not NULL	
		OR	c2.confirm_status = 'Y'
		)
	)
*/
/* AND f1.contract_ref_no not in  
	(
	SELECT	contract_ref_no
	FROM	oltbs_contract_confirm c3
	WHERE	c3.contract_ref_no 		= f1.contract_ref_no
	AND	cparty_confirmation_date	IS not NULL	
	) */
	--10-May-2004 FCC4.5 Lot2 Apr2004 ITR1 SFR ends
/
create or replace synonym olvws_fx_ctrcdays for olvw_fx_ctrcdays
/