CREATE OR REPLACE FORCE VIEW tlvw_bff_computation_detail AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : tlvw_bff_computation_detail.VW
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
28-JUN-2008 FLEXCUBE V.CL 7.4 Release - View Created to get bff calc details
11-JAN-2009 FLEXCUBE V.CL Release 7.4 MTR2 SFR#91 Changes ,handled not equal to Zero condition get the BFF fee details
28-JAN-2009 FLEXCUBE V.CL RELEASE 7.4 ITR1 SFR#167, included order by clause
------------------------------END CHANGE HISTORY----------------------------------------------
*/
(
select	DISTINCT a.component_ccy ccy, 
	a.contract_ref_no	,
	a.agency_ref_no		,
	a.component		,
	a.start_date		,
	a.end_date		,
	a.basis_amount		,
	a.final_rate rate	,
	a.fee_amount differential_amount
from	tltbs_contract_fee_calc	a,
	TLTB_CONTRACT_FEE_MASTER b,
	tltbs_fmem_fee c
where	a.contract_ref_no	= b.contract_ref_no
and	b.contract_ref_no = c.contract_ref_no
and	a.contract_ref_no	= c.contract_ref_no
and	a.component		= b.component
and	b.component   = c.component
and	a.component   = c.component
and	c.event_seq_no		=
				(
				select	max(e.event_seq_no)
				from	tltbs_fmem_fee e
				where	e.contract_ref_no	= a.contract_ref_no
				and	e.component		= a.component
				)
and	b.fee_type 	  	= 'BF'
and	NVL(b.WAIVER,'N')	= 'N'
--and	a.fee_amount		> 0--11-JAN-2009 FLEXCUBE V.CL Release 7.4 MTR2 SFR#91 Comments
and	a.fee_amount		<> 0--11-JAN-2009 FLEXCUBE V.CL Release 7.4 MTR2 SFR#91 Changes
)
ORDER BY a.agency_ref_no, a.component_ccy, a.start_date	--28-JAN-2009 FLEXCUBE V.CL RELEASE 7.4 ITR1 SFR#167, included order by clause
/
CREATE OR REPLACE SYNONYM tlvws_bff_computation_detail FOR tlvw_bff_computation_detail
/