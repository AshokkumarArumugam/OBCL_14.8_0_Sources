CREATE OR REPLACE FORCE VIEW olvw_pending_items_ms 
				(
				DP,	
				BR, 
				MD, 
				RN, 
				MT, 
				EV, 
				ID 
				) 
				AS 
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_pending_items_ms.VW
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

  ** Changed  By        : Abhinav Bhasker
  ** Changed  Dt        : 25-JAN-2023
  **Change Description  : Module Code Correction
  **Serach String       : BUG#34981621
-----------------------------------------------------------------------------------------------
*/
SELECT 			NULL "DP",
				branch, 
	--BUG#34981621 Start
	--'OL',
	MODULE,
	--BUG#34981621 End
				reference_no,
				dcn ,
				'Unauthorized',
				maker_id
FROM 				oltbs_dly_msg_out 
WHERE 			NVL(branch_date,global.application_date) <= global.application_date 
AND 				auth_stat = 'U'
AND				NVL(hold_status, 'N') = 'N'
UNION
SELECT 	NULL "DP",
 	branch,
	--BUG#34981621 Start
	--'OL',
	MODULE,
	--BUG#34981621 End
	reference_no,
	dcn,
	'Unauthorized',
	maker_id
FROM 	oltbs_dly_msg_out
WHERE 	NVL(branch_date,global.application_date) = GLOBAL.application_date 
AND	pde_status = 'Y'
/*UNION
SELECT 	NULL "DP",
	branch,
	'OL',
	reference_no,
	dcn,
	'Unauthorized',
	maker_id
FROM	oltbs_dly_msg_in
WHERE	branch_date = global.application_date 
AND 	pde_status = 'Y'
UNION
SELECT 	NULL "DP",
	branch,
	'OL',
	reference_no,
	dcn,
	'Unauthorized',
	maker_id
FROM	oltbs_archive_out
WHERE	NVL(branch_date,global.application_date) = global.application_date
AND	auth_stat 	= 'U' 
AND	hold_status 	<> 'Y'*/
/
CREATE OR REPLACE SYNONYM olvws_pending_items_ms FOR olvw_pending_items_ms
/