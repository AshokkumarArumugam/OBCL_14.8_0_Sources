CREATE OR REPLACE force VIEW olvw_pending_items_ac ( BR, 
MD, RN, MT, EV, 
ID ) AS 
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_pending_items_ac.VW
**
** Module       : CORE ENTITIES
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
/* 
CHANGE HISTORY 
14-NOV-2002 FCC 4.2 FEB 2003 CITIPLC RETRO CHANGES FOR SFR120000 : Performance tuning of the view . Should use the index 
					on the OLTB_DAILY_LOG_AC
16-NOV-2003 FCC 4.4 DEC 2003 CITIPLC SFR PLC43040032	Creation of synonym for the view added
26-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#48, Retro Changes CITIUS-LS-713,26-DEC-2007 Changes 
	    22-MAR-2007 Piyush CITIUS Till#713,commented NULL and added event code
*/
(
SELECT distinct
A.ac_branch br,
A.module md,
A.trn_ref_no rn,
'' mt,
-- B.event_descr ev, : FCC 4.2 FEB 2003 CITIPLC RETRO CHANGES FOR SFR120000 COMMENTED THIS
--22-MAR-2007 Piyush CITIUS Till#713,commented NULL  and added  event code
--FLEXCUBE V.CL Release 7.3 ITR2 SFR#48, Retro Changes CITIUS-LS-713,26-DEC-2007 Changes Starts
--'' EV , --FCC 4.2 FEB 2003 CITIPLC RETRO CHANGES FOR SFR120000 added this 
a.event EV,
--22-MAR-2007 Piyush CITIUS Till#713,commented NULL  and added  event code
--FLEXCUBE V.CL Release 7.3 ITR2 SFR#48, Retro Changes CITIUS-LS-713,26-DEC-2007 Changes Ends
A.user_id id
FROM oltbs_daily_log_ac A
-- oltbs_event B  : FCC 4.2 FEB 2003 CITIPLC RETRO CHANGES FOR SFR120000 COMMENTED THIS
WHERE A.auth_stat='U' and 
--OBCL_14.5_24_7 Changes starts
not exists (select 1 from oltbs_24x7_process_contracts 
										where CONTRACT_REF_NO = a.trn_ref_no
										 and PROCESS_STATUS in ('U')) AND
--OBCL_14.5_24_7 Changes ends
/*a.module=b.module and a.event=b.event_code and*/ -- : FCC 4.2 FEB 2003 CITIPLC RETRO CHANGES FOR SFR120000 COMMENTED THIS
(SELECT sypks_utils.get_branch(A.TRN_REF_NO) FROM DUAL) = A.ac_branch and A.delete_stat <> 'D')
/
CREATE or replace SYNONYM olvws_pending_items_ac FOR olvw_pending_items_ac
--FCC 4.4 DEC 2003 CITIPLC SFR PLC43040032 ENDS
/