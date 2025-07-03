CREATE OR REPLACE FORCE VIEW olvw_revolving_convert
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : olvw_revolving_convert.vw
** Module       : LD
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
----------------------------------------------------------------------------------------------------
*/
/*
	CHANGE_HISTORY
	04-July-2008 FLEXCUBE V.CL Release 7.4, Commitment Conversion Changes Starts
	09-July-2008 FCC V.CL Release 7.4 FSLOT4-03 SFR#9 Expected Post-Conversion available amount value population.
*/
--04-July-2008 FLEXCUBE V.CL Release 7.4, Commitment Conversion Changes Starts
(
SELECT	a.contract_ref_no,b.amount,d.principal_outstanding_bal,a.contract_ccy
--,e.linked_amount --09-July-2008 FCC V.CL Release 7.4 FSLOT4-03 SFR#9 Expected Post-Conversion available amount value population.
FROM    oltbs_contract a, oltbs_contract_master b, oltbs_contract_preference c,oltbs_contract_balance d
        --oltbs_contract_linkages e --09-July-2008 FCC V.CL Release 7.4 FSLOT4-03 SFR#9 Expected Post-Conversion available amount value population.
WHERE	c.revolving_commitment='Y'
--AND	e.linked_to_branch=global.current_branch --09-July-2008 FCC V.CL Release 7.4 FSLOT4-03 SFR#9 Expected Post-Conversion available amount value population. Starts
--AND	e.linkage_type='C' 
--AND	e.version_no=a.latest_version_no --09-July-2008 FCC V.CL Release 7.4 FSLOT4-03 SFR#9 Expected Post-Conversion available amount value population.Ends
AND	c.version_no=a.latest_version_no
AND	b.version_no=a.latest_version_no
--AND	e.linked_to_ref=a.contract_ref_no --09-July-2008 FCC V.CL Release 7.4 FSLOT4-03 SFR#9 Expected Post-Conversion available amount value population.
AND	d.contract_ref_no=a.contract_ref_no
AND	c.contract_ref_no=a.contract_ref_no
AND	b.contract_ref_no=a.contract_ref_no
AND	b.product=a.product_code
AND	b.contract_status='A'
AND	a.product_type='C'
AND	a.module_code='OL'
AND	a.branch=global.current_branch
)
--04-July-2008 FLEXCUBE V.CL Release 7.4, Commitment Conversion Changes Ends
/
CREATE OR REPLACE SYNONYM olvws_revolving_convert FOR olvw_revolving_convert
/