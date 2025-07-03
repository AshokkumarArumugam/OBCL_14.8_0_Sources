CREATE OR REPLACE FORCE VIEW tlvw_dcf_computation_detail
(
ccy		,
contract_ref_no	,
agency_ref_no	,
component	,
start_date	,
end_date	,
basis_amount	,
rate		,
calc_amount
)
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : tlvw_dcf_computation_detail.VW
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
12-JUN-2008 FLEXCUBE V.CL 7.4 Release - View Created by Maneeha in order to get dcf fee calc details
21-JAN-2009 FLEXCUBE V.CL Release 7.4 ITR1 SFR#91 Changes, Order by clause is added to disaply based on the start date
28-JAN-2009 FLEXCUBE V.CL RELEASE 7.4 ITR1 SFR#167, included ccy in order by clause
08-Dec-2009 FLEXCUBE V.CL Release 7.5 lot1.2 ITR1 SFR#41 ,DCF amount will display if it is not zero
09-FEB-2012 Flexcube V.CL Release 7.10, ITR1#20
	26-JUL-2011 CITIUS-LS#10812 DCF screen should show negative accrual
	30-JAN-2011 CITIUS-LS#12492 (UAT 7.8/7.9 Jira -150080-5493) - Changes to suppress entries which has 0 DCF amount.
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
	a.fee_amount calc_amount
from	tltbs_contract_fee_calc	a,
	TLTB_CONTRACT_FEE_MASTER b,
	tltbs_fmem_fee	c
where	a.contract_ref_no	= b.contract_ref_no
and	b.contract_ref_no	= c.contract_ref_no
and	a.contract_ref_no	= c.contract_ref_no
and	a.component		= b.component
and	b.component		= c.component
and	a.component		= c.component
and	c.event_seq_no		=
				(
				select	max(d.event_seq_no)
				from	tltbs_fmem_fee d
				where	d.contract_ref_no	= a.contract_ref_no
				and	d.component		= c.component
				)
and	b.fee_type 	  	= 'DC'
--and	a.fee_amount		> 0 --CITIUS-LS#10812 commented
and     a.fee_amount IS NOT NULL --CITIUS-LS#10812
AND   NVL(a.fee_amount,0)  <> 0--30-JAN-2011 CITIUS-LS#12492 Changes
and	EXISTS 			(
				SELECT	'X'
				from	tltbs_contract_master e
				where	e.contract_ref_no	= a.contract_ref_no
				and	NVL(e.DCF_WAIVER,'N')	= 'N'
				and	e.version_no		= 
								(
								select	max(f.version_no)
								from	tltbs_contract_master f
								where	f.contract_ref_no = e.contract_ref_no
								)
				)
)
ORDER BY a.agency_ref_no, a.component_ccy, a.start_date	--21-JAN-2009 FLEXCUBE V.CL Release 7.4 ITR1 SFR#91 --28-JAN-2009 FLEXCUBE V.CL RELEASE 7.4 ITR1 SFR#167, included ccy in order by clause
/
CREATE OR REPLACE SYNONYM tlvws_dcf_computation_detail FOR tlvw_dcf_computation_detail
/