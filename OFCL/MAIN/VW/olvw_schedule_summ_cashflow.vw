CREATE OR REPLACE FORCE VIEW olvw_schedule_summ_cashflow ( CONTRACT_REF_NO, 
DUE_DATE, TOTAL_AMOUNT_DUE, TOTAL_AMOUNT_SETTLED, TOTAL_ADJUSTED_AMOUNT, total_pay_recv_amount,
CURRENCY_AMT_DUE,amount_due_actual,till_date_due,lcy_reval_amt ) 
AS 
/*-------------------------------------------------------------------------------------------------
**
** File Name	: olvw_schedule_summ_cashflow.VW
**
** Module	: ORACLE LENDING
**
This source is part of the Oracle Flexcube Corporate Lending  Software Product. 
Copyright © 2018 , Oracle and/or its affiliates.  All rights reserved.   
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
/*------------------------------------------CHANGE HISTORY----------------------------------
DATE		VERSION NO	CODE		SFR	DESCRIPTION

**Changed By         : Revathi Dharmalingam
**Date               : 11-AUG-2021
**Change Description : Added lcy_reval_amt for FX Variation Changes 
**Search String      : OBCL_14.5_FX_Variation Changes

**Changed By         : Janki
**Date               : 16-Nov-2021
**Change Description : populating paybydate for zerocash flow.
**Search String      : Bug#33128644 
-------------------------------------------------------------------------------------------
*/
(
	SELECT  A.CONTRACT_REF_NO,nvl(a.pay_by_date,a.due_date), --A.DUE_DATE, --Bug#33128644
	SUM( ( DECODE( A.inflow_outflow, 'I', 1, 'R', 1, -1 ) ) * NVL( A.AMOUNT_DUE_ACTUAL,      0 ) ),
	SUM( ( DECODE( A.inflow_outflow, 'I', 1, 'R', 1, -1 ) ) * NVL( A.AMOUNT_SETTLED,  0 ) ),
	SUM( ( DECODE( A.inflow_outflow, 'I', 1, 'R', 1, -1 ) ) * NVL( A.ADJUSTED_AMOUNT, 0 ) ),
	SUM( ( DECODE( A.inflow_outflow, 'I', 1, 'R', 1, -1 ) ) * NVL( A.pay_recv_amount, 0 ) ),
	CURRENCY_AMT_DUE,
	SUM( ( DECODE( inflow_outflow, 'I', 1, 'R', 1, -1 ) ) * NVL( NVL(a.amount_due_actual,a.amount_due), 0 ) ),--Bug#32581115
	0 till_date_due--Bug#32581115
	,SUM( ( DECODE( inflow_outflow, 'I', 1, 'R', 1, -1 ) ) * NVL( lcy_reval_amt,  0 ) ) as lcy_reval_amt --OBCL_14.5_FX_Variation Changes
	FROM 	 oltbs_amount_due A,
		 oltbs_contract_master B
	WHERE A.CONTRACT_REF_NO = B.CONTRACT_REF_NO
	AND   B.VERSION_NO = ( 	SELECT MAX(VERSION_NO)
					FROM OLTB_CONTRACT_MASTER
					WHERE CONTRACT_REF_NO = A.CONTRACT_REF_NO)
        AND     A.COMPONENT_TYPE NOT IN ('H','T')
	AND   NOT (B.MODULE = 'OL' AND B.PRODUCT_TYPE = 'C' AND A.COMPONENT = 'PRINCIPAL')
	GROUP BY A.CONTRACT_REF_NO, nvl(a.pay_by_date,a.due_date), --A.DUE_DATE Bug#33128644 
	A.CURRENCY_AMT_DUE
)
/
CREATE OR REPLACE SYNONYM olvws_schedule_summ_cashflow FOR olvw_schedule_summ_cashflow
/