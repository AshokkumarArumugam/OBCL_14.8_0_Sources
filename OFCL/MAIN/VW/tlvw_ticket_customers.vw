CREATE OR REPLACE FORCE VIEW tlvw_ticket_customers AS
/*____________________________________________________________________________________________________
**
** File Name	: tlvw_ticket_customers.VW
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
      created the view to display Consolidated list of customer and agencies of the ticket 
26-JUN-2009 FLEXCUBE V.CL RELEASE 7.5 LOT1.1 CHANGES, changed copyright clause.
29-SEP-2010 FLEXCUBE V.CL Release 7.7 RT1 SFR#5, CITIUS Retro,Till#7476, While populating ticket level SSI system is picking up the customers of reversed trades under that ticket.
18-OCT-2010 CITIUS-LS#7518, 7.7 Release retro changes
	17-FEB-2010 CITIUS-LS#7166 added agency id not null check.
*/
SELECT DISTINCT a.ticket_id,a.agency_id customer,'A' customer_type
FROM tltbs_contract_master a
	--29-SEP-2010 FLEXCUBE V.CL Release 7.7 RT1 SFR#5, CITIUS Retro,Till#7476 changes start
	,oltbs_contract b 
WHERE a.contract_ref_no = b.contract_ref_no 
AND a.version_no = b.latest_version_no
/*
WHERE a.version_no= (SELECT max(b.version_no)
				FROM TLTB_CONTRACT_MASTER b
				WHERE b.ticket_id=a.ticket_id
				AND b.contract_ref_no=a.contract_ref_no)
*/
AND a.agency_id IS NOT NULL --17-FEB-2010 CITIUS-LS#7166,Changes -- CITIUS-LS#7518
AND b.contract_status <> 'V' 
--29-SEP-2010 FLEXCUBE V.CL Release 7.7 RT1 SFR#5, CITIUS Retro,Till#7476 changes end
UNION
SELECT DISTINCT a.ticket_id,a.counterparty customer,'C' customer_type
FROM tltbs_contract_master a
--29-SEP-2010 FLEXCUBE V.CL Release 7.7 RT1 SFR#5, CITIUS Retro,Till#7476 changes start
	,oltbs_contract b 
WHERE a.contract_ref_no = b.contract_ref_no
AND a.version_no = b.latest_version_no
/*
AND a.version_no= (SELECT max(b.version_no)
				FROM TLTB_CONTRACT_MASTER b
				WHERE b.ticket_id=a.ticket_id
				AND b.contract_ref_no=a.contract_ref_no)
*/
AND b.contract_status <> 'V' 
--29-SEP-2010 FLEXCUBE V.CL Release 7.7 RT1 SFR#5, CITIUS Retro,Till#7476 changes end
/