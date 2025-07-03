CREATE OR REPLACE TRIGGER  ol_oltr_start
/*----------------------------------------------------------------------------------------------------
**
** File Name    : ol_oltr_start.TRG
**
** Module       : REPORTS
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2018 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.  
----------------------------------------------------------------------------------------------------
**  Changed By         :Akhila Samson
**  Changed on         :23-Mar-2022
**  Change Description :Changes done to as per the Autonomous DB .
**  Search String      :AutonomousDB_Changes

*/
after insert on OLTB_SERVER_REPORT
for each row



BEGIN
	--dbms_alert.signal('rptb_start_stop_alert', :new.spool );--AutonomousDB_Changes
	Debug.Pr_Debug('OL', 'OLTB_SERVER_REPORT trigger');
END;
/