CREATE OR REPLACE FORCE VIEW lbvw_schedule_summary ( CONTRACT_REF_NO, 
DUE_DATE, TOTAL_AMOUNT_DUE, TOTAL_AMOUNT_SETTLED, TOTAL_ADJUSTED_AMOUNT, 
CURRENCY_AMT_DUE ) AS 
/*-------------------------------------------------------------------------------------------------
**
** File Name	: lbvw_schedule_summary.VW
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
----------------------------------------------------------------------------------------------------
*/
/*------------------------------------------CHANGE HISTORY----------------------------------
DATE		VERSION NO	CODE		SFR	DESCRIPTION
09-JAN-2006	FCC V.CL 7.0				View Created for the payment schedule to be displayed in facility online
--------------------------------------------------------------------------------------------
*/
(
	SELECT  A.CONTRACT_REF_NO,A.DUE_DATE,
	SUM( ( DECODE( A.inflow_outflow, 'I', 1, 'R', 1, -1 ) ) * NVL( A.AMOUNT_DUE,      0 ) ),
	SUM( ( DECODE( A.inflow_outflow, 'I', 1, 'R', 1, -1 ) ) * NVL( A.AMOUNT_SETTLED,  0 ) ),
	SUM( ( DECODE( A.inflow_outflow, 'I', 1, 'R', 1, -1 ) ) * NVL( A.ADJUSTED_AMOUNT, 0 ) ),
	CURRENCY_AMT_DUE
	FROM 	 oltbs_amount_due A,
		 lbtb_syndication_master B
	WHERE A.CONTRACT_REF_NO = B.CONTRACT_REF_NO
	AND   B.VERSION_NO = ( 	SELECT MAX(VERSION_NO)
					FROM lbtb_syndication_master
					WHERE CONTRACT_REF_NO = A.CONTRACT_REF_NO)
	--AND   A.COMPONENT_TYPE <> 'H'
        AND     A.COMPONENT_TYPE NOT IN ('H','T')
	AND   NVL(A.AMOUNT_DUE,0) <> 0
	GROUP BY A.CONTRACT_REF_NO,A.DUE_DATE,A.CURRENCY_AMT_DUE
)
/
CREATE OR REPLACE SYNONYM lbvws_schedule_summary FOR lbvw_schedule_summary 
/