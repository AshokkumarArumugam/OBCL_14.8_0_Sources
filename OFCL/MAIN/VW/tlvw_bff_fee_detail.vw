CREATE OR REPLACE FORCE VIEW tlvw_bff_fee_detail
(
contract_ref_no	,
component	,
component_ccy	,
fee_amount
)
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : tlvw_bff_fee_detail.VW
**
** Module       : Secondary Loan Trading
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
---------------------------------CHANGE HISTORY-----------------------------------------------
28-JUN-2008 FLEXCUBE V.CL 7.4 Release - View Created to get bff component details
11-JAN-2009 FLEXCUBE V.CL Release 7.4 MTR2 SFR#91 Changes ,handled not equal to Zero condition get the BFF fee details	
28-JAN-2009 FLEXCUBE V.CL RELEASE 7.4 ITR1 SFR#167, included order by clause
------------------------------END CHANGE HISTORY----------------------------------------------
*/
(
SELECT	a.contract_ref_no	,
	a.component		,
	b.component_ccy		,
	b.calculated_amount	fee_amount
FROM	tltbs_contract_fee_master a, 
	tltbs_fmem_fee b
WHERE	a.contract_ref_no	= b.contract_ref_no
AND	a.component		= b.component
and	b.event_seq_no		= 
				(
				select	max(e.event_seq_no)
				from	tltbs_fmem_fee e
				where	e.contract_ref_no	= a.contract_ref_no
				and	e.component		= a.component
				)
and	a.fee_type 	 	= 'BF'
and	NVL(a.waiver,'N')	= 'N'
--and	b.calculated_amount	> 0--11-JAN-2009 FLEXCUBE V.CL Release 7.4 MTR2 SFR#91 Comments
and	b.calculated_amount	<> 0--11-JAN-2009 FLEXCUBE V.CL Release 7.4 MTR2 SFR#91 Changes
)
ORDER BY a.component, b.component_ccy	--28-JAN-2009 FLEXCUBE V.CL RELEASE 7.4 ITR1 SFR#167, included order by clause
/
CREATE OR REPLACE SYNONYM tlvws_bff_fee_detail FOR tlvw_bff_fee_detail
/