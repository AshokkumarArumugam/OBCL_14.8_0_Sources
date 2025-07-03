CREATE OR REPLACE FORCE VIEW tlvw_ticket_agencies AS
/*____________________________________________________________________________________________________
**
** File Name	: tlvw_ticket_agencies.VW
**
** Module	: SECONDARY LOAN TRADING
**
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
**____________________________________________________________________________________________________
*/
/*__________________________________CHANGE HISTORY__________________________________
09-Jul-2008 FLEXCUBE V.CL Release 7.4  
      created the view to display customer and agency category in ticket settlemen screen
*/
SELECT DISTINCT a.ticket_id,a.agency_id
FROM tltbs_contract_master a
WHERE a.version_no= (SELECT max(b.version_no)
		FROM TLTB_CONTRACT_MASTER b
		WHERE b.ticket_id=a.ticket_id
		AND b.contract_ref_no=a.contract_ref_no)
/