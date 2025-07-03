CREATE OR REPLACE force VIEW olvw_pending_items_de(BR,DP,MD,RN,MT,EV,ID) 
AS	
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_pending_items_de.VW
**
** Module       : DE
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
**
	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
-----------------------------------------------------------------------------------------------
*/
/* CHANGE HISTORY
07-MAY-2002	FCC 4.0 June 2002 PLNCITI SFR No 3661    Change made to View so that it will show only those batches for whom unauth transactions exist and not those whose auth_stat = `A` and those for which transactions are not there in OLTB_JRNL_LOG_DE at all
19-DEC-2002     FCC 4.2 FEB 2003 RETRO CITIPLC Tuned query for performance PLC4001021 AND Batch number was previously number.Now since it is varchar, " TO_CHAR" has been removed.
01-JUL-2004 FCC 4.6 Sept 2004 Retro Changes HUFCITI 1285 Added to show the unauthorized LCUP entries in auth pending screen.
CHANGE HISTORY 
*/
(
	SELECT    branch_code br,
			department_code dp,
			'OL' 		md,
			--TO_CHAR(batch_no,'0000')||nvl(description,'  '||description) rn,--  PLC4001021 Batch number was previously number.Now since it is varchar, " TO_CHAR" has been removed.
			lpad(batch_no,4,'0')||nvl(description,'  '||description) rn,
			'' mt,
			'Unauthorized' ev,
			last_oper_id id
	FROM 	oltbs_batch_master a
	--WHERE		a.auth_stat	=	'U'
	WHERE (exists (Select 1 from OLTB_JRNL_LOG_DE where batch_no = a.batch_no and branch_code = a.branch_code 
			and auth_stat = 'U' )--CitiPLC Til No. 3661
	               or exists (select 1 from oltbs_daily_log_ac where   --HUFCITI Til#1285
                       auth_stat = 'U' and delete_stat <> 'D' and batch_no = a.batch_no
                       and ac_branch = a.branch_code ))     --HUFCITI Til#1285
UNION
	SELECT 	branch_code br,
			'ALL' dp,
			'OL' md, 
			till_id||' '||tv_name rn,
			''mt,
			'Till Is Unbalanced For Currency' ev, --olpkss_eipks.get_txt('OL-TB01') ev FCC 4.2 RETRO Tuned query for performance PLC4001021
			user_id
	FROM	oltms_til_vlt_master 
	WHERE	balanced_ind	=	'N'
)
/
create or replace synonym olvws_pending_items_de  for olvw_pending_items_de 
/