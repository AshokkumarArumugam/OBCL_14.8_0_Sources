CREATE OR REPLACE FORCE VIEW olvw_schedule_summ_cahflw_hist
(contract_ref_no, due_date, total_amount_due, total_amount_settled, total_adjusted_amount, total_pay_recv_amount, currency_amt_due, esn)
AS 
/*-------------------------------------------------------------------------------------------------
**
** File Name	: olvw_schedule_summ_cahflw_hist.VW
**
** Module	: LOANS SYNDICATION
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
-------------------------------------------------------------------------------------------
*/
(
	SELECT  A.CONTRACT_REF_NO,A.DUE_DATE,
	SUM( ( DECODE( A.inflow_outflow, 'I', 1, 'R', 1, -1 ) ) * NVL( A.AMOUNT_DUE_ACTUAL,      0 ) ),
	SUM( ( DECODE( A.inflow_outflow, 'I', 1, 'R', 1, -1 ) ) * NVL( A.AMOUNT_SETTLED,  0 ) ),
	SUM( ( DECODE( A.inflow_outflow, 'I', 1, 'R', 1, -1 ) ) * NVL( A.ADJUSTED_AMOUNT, 0 ) ),
	SUM( ( DECODE( A.inflow_outflow, 'I', 1, 'R', 1, -1 ) ) * NVL( A.pay_recv_amount, 0 ) ),
	CURRENCY_AMT_DUE,
	ESN
	FROM 	 oltbs_amount_due_hist A,
		 oltbs_contract_master B
	WHERE A.CONTRACT_REF_NO = B.CONTRACT_REF_NO
	AND   B.VERSION_NO = ( 	SELECT MAX(VERSION_NO)
					FROM oltb_contract_master
					WHERE CONTRACT_REF_NO = A.CONTRACT_REF_NO)
	      AND     A.COMPONENT_TYPE NOT IN ('H','T')
		AND   NOT (B.MODULE = 'OL' AND B.PRODUCT_TYPE = 'C' AND A.COMPONENT = 'PRINCIPAL')
	GROUP BY A.CONTRACT_REF_NO,A.DUE_DATE,A.CURRENCY_AMT_DUE,ESN)
/
CREATE OR REPLACE SYNONYM olvws_schedule_summ_cahflw_hist FOR olvw_schedule_summ_cahflw_hist
/