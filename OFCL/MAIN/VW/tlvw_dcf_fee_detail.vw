CREATE OR REPLACE FORCE VIEW tlvw_dcf_fee_detail
(
contract_ref_no	,
component	,
component_ccy	,
fee_amount
)
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : tlvw_dcf_fee_detail.VW
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
10-AUG-2008 FLEXCUBE V.CL 7.4 Release - View Created by Maneeha in order to get dcf fee component details
28-JAN-2009 FLEXCUBE V.CL RELEASE 7.4 ITR1 SFR#167, included order by clause
02-Dec-2009 FLEXCUBE V.CL Release 7.5 lot1.2 ITR1 SFR#19 , In Case of multiple FMEM displaying latest FMEM fee detail	
08-Dec-2009 FLEXCUBE V.CL Release 7.5 lot1.2 ITR1 SFR#41 ,DCF amount will display if it is not zero
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
and	a.event_seq_no		= 
				(
				select	max(e.event_seq_no)
				from	tltbs_contract_fee_master e
				where	e.contract_ref_no	= a.contract_ref_no
				and	e.component		= a.component
				)
--02-Dec-2009 FLEXCUBE V.CL Release 7.5 lot1.2 ITR1 SFR#19 , In Case of multiple FMEM displaying latest FMEM fee detail	start
and	b.event_seq_no		=
				(
				SELECT	MAX(fm.event_seq_no)
				FROM	tltbs_fmem_fee fm
				WHERE	fm.contract_ref_no	= a.contract_ref_no
				AND	fm.component		= a.component
				)
--02-Dec-2009 FLEXCUBE V.CL Release 7.5 lot1.2 ITR1 SFR#19 , In Case of multiple FMEM displaying latest FMEM fee detail	end
and	a.fee_type 	 	= 'DC'
--and	b.calculated_amount	> 0 	--08-Dec-2009 FLEXCUBE V.CL Release 7.5 lot1.2 ITR1 SFR#41 ,DCF amount will display if it is not zero
and	b.calculated_amount	<> 0	--08-Dec-2009 FLEXCUBE V.CL Release 7.5 lot1.2 ITR1 SFR#41 ,DCF amount will display if it is not zero
AND	EXISTS 			(
				SELECT	'X'
				from	tltbs_contract_master c
				where	c.contract_ref_no	= a.contract_ref_no
				and	NVL(c.DCF_WAIVER,'N')	= 'N'
				and	c.version_no 		= 
								(
								select max(d.version_no)
								from tltbs_contract_master d
								where d.contract_ref_no = c.contract_ref_no
								)
				)
)
ORDER BY a.component, b.component_ccy	--28-JAN-2009 FLEXCUBE V.CL RELEASE 7.4 ITR1 SFR#167, included order by clause
/
CREATE OR REPLACE SYNONYM tlvws_dcf_fee_detail FOR tlvw_dcf_fee_detail
/