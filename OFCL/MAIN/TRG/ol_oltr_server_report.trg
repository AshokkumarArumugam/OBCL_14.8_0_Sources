CREATE OR REPLACE TRIGGER  ol_oltr_server_report
/*----------------------------------------------------------------------------------------------------
**
** File Name    : ol_oltr_server_report.TRG
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
   **    Modified By         : Ragavendra 
   **    Modified On         : 21-Mar-2016
   **    Modified Reason     : Modified the Copy right and Change history format as trigger was not compiling.
   
   **  Changed By         :Akhila Samson
   **  Changed on         :23-Mar-2022
   **  Change Description :Changes done to as per the Autonomous DB .
   **  Search String      :AutonomousDB_Changes
   */
after update on OLTB_SERVER_REPORT
for each row



BEGIN
	if :new.status in ('S','E') then
	   --dbms_alert.signal('rptb_server_report_alert', :old.spool||:new.status); --AutonomousDB_Changes
	   Debug.Pr_Debug('OL', 'OL_OLTR_SERVER_REPORT trigger');
	end if;
END;
/