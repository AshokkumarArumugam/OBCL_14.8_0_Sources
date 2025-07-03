CREATE OR REPLACE FORCE VIEW olvw_msg_summary ( BRANCH, --- BRANCH_NAME,   --CITIUS-LS#SRT5764-CITIUS-LS#5678: Branch_name commented
--FCC 4.0.0 CITIPLC SFR PLC4006038 START
MSG_TYPE ,
SWIFT_MSG_TYPE,
--FCC 4.0.0 CITIPLC SFR PLC4006038 START
MSG_STATUS, NO )
AS 
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_msg_summary.VW
**
** Module       : MESSAGING SUBSYSTEM										**
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
/*-----------------------------------------------------------------------------------------------
CHANGE HISTORY
02-JUN-2009 CITIUS-LS#SRT5764 Missing Retro from CITIUS to BLORE
	     1] 19-MAR-2008 CITIUS-LS#5678 Production Retro to CC-STP Code Baseline.
26-JUN-2009 FLEXCUBE V.CL RELEASE 7.5 LOT1.1 CHANGES, changed copyright clause.
*/
SELECT BRANCH , -- B.BRANCH_NAME,  				     --CITIUS-LS#SRT5764-CITIUS-LS#5678: Branch_name commented
--FCC 4.0.0 CITIPLC SFR PLC4006038 START
MSG_TYPE ,
SWIFT_MSG_TYPE ,
--FCC 4.0.0 CITIPLC SFR PLC4006038 END
MSG_STATUS , COUNT(*) NO FROM
-- FCC 4.0.0 CITIPLC SFR PLC4006038  start
--MSTB_DLY_MSG_OUT_VIEW A,
oltbs_dly_msg_out A -- oltms_branch B				     --CITIUS-LS#SRT5764-CITIUS-LS#5678: Branch_name commented
--oltms_branch B
--FCC 4.0.0 CITIPLC SFR PLC4006038 end
--MSTB_DLY_MSG_OUT_VIEW A, oltms_branch B
WHERE
-- A.BRANCH = B.BRANCH_CODE AND					     --CITIUS-LS#SRT5764-CITIUS-LS#5678: Branch_name commented
-- FCC 4.0.0 CITIPLC SFR PLC4006038  start
		A.BRANCH = GLOBAL.CURRENT_BRANCH
AND		A.MSG_STATUS = 'N'
AND		A.AUTH_STAT = 'A'
AND		A.DIRECTIVE_STATUS = 'B'
AND		A.HOLD_STATUS IN ( 'N' , 'W' )
AND		A.TESTING_STATUS NOT IN ( 'R' , 'I' )
AND		A.suppress_flag = 'N'
AND		A.msg_type <> 'FREE_FORMAT'
-- FCC 4.0.0 CITIPLC SFR PLC4006038  END
GROUP BY
BRANCH , -- b.BRANCH_NAME,					     --CITIUS-LS#SRT5764-CITIUS-LS#5678: Branch_name commented
--FCC 4.0.0 CITIPLC SFR PLC4006038 start
--BRANCH_NAME ,
MSG_TYPE ,
SWIFT_MSG_TYPE ,
--FCC 4.0.0 CITIPLC SFR PLC4006038 end
MSG_STATUS
/
CREATE OR REPLACE SYNONYM olvws_msg_summary FOR olvw_msg_summary
/