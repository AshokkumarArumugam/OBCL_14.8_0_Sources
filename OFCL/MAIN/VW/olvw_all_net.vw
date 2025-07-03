CREATE or replace force VIEW olvw_all_net
	(
	ac_entry_sr_no,	
	dr_cr_ind,	
	amount_tag,	
	pnl_hist_ind,
	fcy_amount,	
	exch_rate,	
	lcy_amount
	)
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_all_net.VW
**
** Module      : Accounting
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
SELECT	
		a.ac_entry_sr_no,	
		a.dr_cr_ind,	
		a.amount_tag,	
		a.pnl_hist_ind,
		a.fcy_amount,	
		a.exch_rate,	
		a.lcy_amount
	FROM 	oltbs_daily_net a
	UNION ALL
	SELECT	
		b.ac_entry_sr_no,	
		b.dr_cr_ind,	
		b.amount_tag,	
		b.pnl_hist_ind,
		b.fcy_amount,	
		b.exch_rate,	
		b.lcy_amount
	FROM 	oltbs_history_net b
/
create or replace synonym olvws_all_net for olvw_all_net
/