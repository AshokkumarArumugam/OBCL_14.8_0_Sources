CREATE OR REPLACE FORCE VIEW lpvw_schedule_summary
(contract_ref_no, due_date, total_amount_due, total_amount_settled, total_adjusted_amount,total_pay_recv_amount, currency_amt_due)--FCC V.CL 7.1 Changes for new column
AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : lpvw_schedule_summary.VW
**
** Module	: LOANS SYNDICATION
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
----------------------------------------------------------------------
*/
/* -----------------------------------------CHANGE HISTORY-------------------------------------
13-FEB-2006, FLEXCUBE V.CL Release 7.0, ARUN, Created for LS-Participant Summary.
08-sep-20063 FCC V.CL 7.1 Changes for new column
11-dec-2007  FLEXCUBE V.CL Release 7.3 ITR2 Retro Till no#270 SFR No#1 11-dec-07
03-JUL-2009  FLEXCUBE V.CL Release 7.5 LOT1.1 Sampling Fixes, maneeha
			1) THE total amount due was not considering the inflow for interest components.
			   when SF is Y then amount due = principal + (main int - comp component) + other int components
			2) changed the change history as well.
17-JUL-2012 Flexcube V.CL Release 7.11, Retro, EURCITIPLC#14280: NVL Added for component condition and inflow condition
*/
(
	SELECT  A.CONTRACT_REF_NO,A.DUE_DATE,
	SUM( ( DECODE( A.inflow_outflow, 'O', 1, 'R', 1, -1 ) ) * NVL( A.AMOUNT_DUE,      0 ) ),
	SUM( ( DECODE( A.inflow_outflow, 'O', 1, 'R', 1, -1 ) ) * NVL( A.AMOUNT_SETTLED,  0 ) ),
	SUM( ( DECODE( A.inflow_outflow, 'O', 1, 'R', 1, -1 ) ) * NVL( A.ADJUSTED_AMOUNT, 0 ) ),
	SUM( ( DECODE( A.inflow_outflow, 'O', 1, 'R', 1, -1 ) ) * NVL( A.pay_recv_amount, 0 ) ),--FCC V.CL 7.1 Changes for new column
	CURRENCY_AMT_DUE
	FROM 	 oltbs_amount_due A,
		 lptbs_contract_master B
	WHERE A.CONTRACT_REF_NO = B.CONTRACT_REF_NO
	AND   B.VERSION_NO = ( 	SELECT MAX(VERSION_NO)
					FROM lptb_contract_master
					WHERE CONTRACT_REF_NO = A.CONTRACT_REF_NO)
	--AND   A.COMPONENT_TYPE <> 'H'
        --AND     A.COMPONENT_TYPE NOT IN ('H','T')--17-JUL-2012 Flexcube V.CL Release 7.11, Retro, EURCITIPLC#14280 Changes
        AND     NVL(A.COMPONENT_TYPE,'P') NOT IN ('H','T') --17-JUL-2012 Flexcube V.CL Release 7.11, Retro, EURCITIPLC#14280 Changes:added nvl
	--AND   NVL(A.AMOUNT_DUE,0) <> 0--FLEXCUBE V.CL Release 7.3 ITR2 Retro Till no#270 SFR No#1 11-dec-07
	--AND   A.INFLOW_OUTFLOW <>DECODE(B.PRODUCT_TYPE,'L','O','D','I','C','O','B','I','X') --FLEXCUBE V.CL Release 7.5 LOT1.1 Sampling Fixes, commented
	--AND   A.INFLOW_OUTFLOW <>DECODE(B.PRODUCT_TYPE,'L','O','D',DECODE(A.COMPONENT_TYPE,'I','X','I'),'C','O','B','I','X') --FLEXCUBE V.CL Release 7.5 LOT1.1 Sampling Fixes, added
        AND   NVL(A.INFLOW_OUTFLOW,'P') <>DECODE(B.PRODUCT_TYPE,'L','O','D','I','C','O','B','I','X') --17-JUL-2012 Flexcube V.CL Release 7.11, Retro, EURCITIPLC#14280 Changes:added nvl
	GROUP BY A.CONTRACT_REF_NO,A.DUE_DATE,A.CURRENCY_AMT_DUE
)
/
CREATE OR REPLACE SYNONYM lpvws_schedule_summary FOR lpvw_schedule_summary
/