create or replace trigger ol_trg_cpc_batchin
/*------------------------------------------------------------------
**
** File Name    : ol_trg_cpc_batchin.trg
**
** Module       : Interface
**
**	This source is part of the Oracle Banking Corporate Lending  Software Product.   
**	Copyright © 2007 - 2018  Oracle and/or its affiliates.  All rights reserved.   
**	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form 
**  or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated
**  in any language or computer language, without the prior written permission of Oracle and/or its affiliates.
**	Oracle Financial Services Software Limited.
**	Oracle Park, Off Western Express Highway,
**	Goregaon (East), 
**	Mumbai - 400 063, India.
---------------------------------------------------------------------
*/
/* 
CHANGE HISTORY
23-MAY-2002 FCC 4.0 JUNE 2002 PLNCITI Til No 1575 Code added to stop alerts while starting eod process

**  Changed By         :Akhila Samson
**  Changed on         :23-Mar-2022
**  Change Description :Changes done to as per the Autonomous DB .
**  Search String      :AutonomousDB_Changes
*/
after insert on OLTB_CPC_BATCHIN for each row
Begin
    --AutonomousDB_Changes start
	/*dbms_alert.signal('ALERT_CPC_BATCHIN','');

	-- PLNCITI Til No 1575
	If :NEW.filename='EOD' then 
		Dbms_alert.signal('ALERT_CPC_IN_CUBE','STOP_PROC');
		Dbms_alert.signal('ALERT_CPC_IN','STOP_PROC');
	End if;
    */
	--AutonomousDB_Changes end
--	debug.pr_debug('OL','After the alert ALERT_CPC_BATCHIN');
	Debug.Pr_Debug('OL', 'OLTB_CPC_BATCHIN trigger');
End;
/