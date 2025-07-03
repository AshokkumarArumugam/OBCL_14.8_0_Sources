create or replace trigger ol_trg_txnfin
/*-----------------------------------------------------------------------------------------------
**
** File Name    : ol_trg_txnfin.trg
**
** Module       : Interface
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2018 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India. 
 
-----------------------------------------------------------------------------------------------*/

/* 
CHANGE HISTORY
23-MAY-2003 FCC 4.0 JUNE 2002 PLNCITI Til 4169 in iftr1_06.trg  alert name changed.

**  Changed By         :Akhila Samson
**  Changed on         :23-Mar-2022
**  Change Description :Changes done to as per the Autonomous DB .
**  Search String      :AutonomousDB_Changes
*/

after insert on OLTB_TXNFIN for each row
Begin
--	dbms_alert.signal('ALERT_TXNFIN','');
	--dbms_alert.signal('ALERT_TXNFINPROC',''); --AutonomousDB_Changes
	Debug.Pr_Debug('OL', 'OLTB_TXNFIN trigger');
End;

/