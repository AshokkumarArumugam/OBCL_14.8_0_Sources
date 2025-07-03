CREATE OR REPLACE VIEW LPVW_PAYBYDT_SCHEDULE_SUMMARY
(contract_ref_no, pay_by_date, total_amount_due, total_amount_settled, total_adjusted_amount, total_pay_recv_amount, currency_amt_due)
AS
/* -------------------------------------------------------------------------------------------------
**
** File Name	: LPVW_PAYBYDT_SCHEDULE_SUMMARY.VW
**
** Module	: LP
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
/* ------------------------------------------CHANGE HISTORY------------------------------------------
    **Changed By         : Sowmya B
    **Date               : 22-June-2020
    **Change Description : Changes w.r.t. Pay By Date
    **Search String      : OBCL_14.4_Payment_Delay
	
	**Changed By         : Surya Prabha
    **Date               : 29-March-2022
    **Change Description : Code fix to exclude skim components in amount due display
    **Search String      : Bug#33989746 changes
	
	**Changed By         : Jayaram
    **Date               : 05-Feb-2024
    **Change Description : Added condition to verify if it is transfer fee, If transfer fee (fee triggered through particpant transfer) and product type is 
						   tranche then populate the same amount in amount fields without sign handling logic. Here table LBTB_PRAM_FEE_TEMP will have only
						   transfer fee done through particpant transfer.
    **Search String      : Bug#36208222
	
	**Changed By         : Sudharshini Balaji
    **Date               : 30-Aug-2024
    **Change Description : Reverted Fix of Bug#33989746 changes( included skim comps also now)
						   For the Payer skim/Risk comp ,included Pay In comp- Added decode condition of I comp type so that Pay IN comps will be included for the
						   participants schedule summary
    **Search String      : Bug#36974375 changes
	
	*Changed By          : Arunprasath
    **Date               : 05-Dec-2024
    **Change Description : Reverted the Fix of Bug#36208222 to handle the transfer fee amount display logic in Kernel pkg
    **Search String      : Bug#37099834

----------------------------------------------------------------------------------------------------
 */
 --VIEW CREATED FOR SCHEDULE SUMMARY ON PARTICIPANT SIDE WITH PAY_BY_DATE--OBCL_14.4_Payment_Delay
(
 SELECT CONTRACT_REF_NO, PAY_BY_DATE,
     /*SUM( ( DECODE( inflow_outflow, 'O', 1, 'R', 1, -1 ) ) * NVL( AMOUNT_DUE,      0 ) ),
	   SUM( ( DECODE( inflow_outflow, 'O', 1, 'R', 1, -1 ) ) * NVL( AMOUNT_SETTLED,  0 ) ),
	   SUM( ( DECODE( inflow_outflow, 'O', 1, 'R', 1, -1 ) ) * NVL( ADJUSTED_AMOUNT, 0 ) ),
	   SUM( ( DECODE( inflow_outflow, 'O', 1, 'R', 1, -1 ) ) * NVL( pay_recv_amount, 0 ) ),--FCC V.CL 7.1 Changes for new column*/ --Bug#36208222:Commented
    --Bug#37099834 Start
	/*--Bug#36208222:Changes starts here
    SUM( ( CASE WHEN PRODUCT_TYPE = 'T' AND COMPONENT IS NOT NULL THEN 
                NVL(AMOUNT_DUE,0)
                ELSE
                DECODE( INFLOW_OUTFLOW, 'O', 1, 'R', 1, -1 )  * NVL(AMOUNT_DUE,0)
                END   ) ),
    SUM( ( CASE WHEN PRODUCT_TYPE = 'T' AND COMPONENT IS NOT NULL THEN 
                NVL(AMOUNT_SETTLED,0)
                ELSE
                DECODE( INFLOW_OUTFLOW, 'O', 1, 'R', 1, -1 )  * NVL(AMOUNT_SETTLED,0)
                END   ) ),
    SUM( ( CASE WHEN PRODUCT_TYPE = 'T' AND COMPONENT IS NOT NULL THEN 
                NVL(ADJUSTED_AMOUNT,0)
                ELSE
                DECODE( INFLOW_OUTFLOW, 'O', 1, 'R', 1, -1 )  * NVL(ADJUSTED_AMOUNT,0)
                END   ) ),
    SUM( ( CASE WHEN PRODUCT_TYPE = 'T' AND COMPONENT IS NOT NULL THEN 
                NVL(PAY_RECV_AMOUNT,0)
                ELSE
                DECODE( INFLOW_OUTFLOW, 'O', 1, 'R', 1, -1 )  * NVL(PAY_RECV_AMOUNT,0)
                END   ) ),
	--Bug#36208222:Changes Ends here
*/ -- commented as part of Bug#37099834	
  SUM( ( DECODE( inflow_outflow, 'O', 1, 'R', 1, -1 ) ) * NVL( AMOUNT_DUE,      0 ) ),
  SUM( ( DECODE( inflow_outflow, 'O', 1, 'R', 1, -1 ) ) * NVL( AMOUNT_SETTLED,  0 ) ),
  SUM( ( DECODE( inflow_outflow, 'O', 1, 'R', 1, -1 ) ) * NVL( ADJUSTED_AMOUNT, 0 ) ),
  SUM( ( DECODE( inflow_outflow, 'O', 1, 'R', 1, -1 ) ) * NVL( pay_recv_amount, 0 ) ),--FCC V.CL 7.1 Changes for new column	
  --Bug#37099834 End 
  CURRENCY_AMT_DUE
  FROM
  ( Select A.CONTRACT_REF_NO, NVL(A.PAY_BY_DATE,A.DUE_DATE) PAY_BY_DATE,
    A.INFLOW_OUTFLOW, A.AMOUNT_DUE, A.AMOUNT_SETTLED, A.ADJUSTED_AMOUNT, A.PAY_RECV_AMOUNT, A.CURRENCY_AMT_DUE,
    B.product_type--, C.component	--Bug#36208222:Added --commented as part of Bug#37099834
  FROM   oltbs_amount_due A,
     lptbs_contract_master B/*,
     (Select distinct contract_ref_no, component from LBTB_PRAM_FEE_TEMP)c*/	--Bug#36208222:Changes Ends here--commented as part of Bug#37099834
  WHERE A.CONTRACT_REF_NO = B.CONTRACT_REF_NO
  AND   B.VERSION_NO = (  SELECT MAX(VERSION_NO)
          FROM lptb_contract_master
          WHERE CONTRACT_REF_NO = A.CONTRACT_REF_NO)
  --AND   A.COMPONENT_TYPE <> 'H'
        --AND     A.COMPONENT_TYPE NOT IN ('H','T')--17-JUL-2012 Flexcube V.CL Release 7.11, Retro, EURCITIPLC#14280 Changes
        AND     NVL(A.COMPONENT_TYPE,'P') NOT IN ('H','T') --17-JUL-2012 Flexcube V.CL Release 7.11, Retro, EURCITIPLC#14280 Changes:added nvl
  --AND   NVL(A.AMOUNT_DUE,0) <> 0--FLEXCUBE V.CL Release 7.3 ITR2 Retro Till no#270 SFR No#1 11-dec-07
  --AND   A.INFLOW_OUTFLOW <>DECODE(B.PRODUCT_TYPE,'L','O','D','I','C','O','B','I','X') --FLEXCUBE V.CL Release 7.5 LOT1.1 Sampling Fixes, commented
  --AND   A.INFLOW_OUTFLOW <>DECODE(B.PRODUCT_TYPE,'L','O','D',DECODE(A.COMPONENT_TYPE,'I','X','I'),'C','O','B','I','X') --FLEXCUBE V.CL Release 7.5 LOT1.1 Sampling Fixes, added
     --   AND   NVL(A.INFLOW_OUTFLOW,'P') <>DECODE(B.PRODUCT_TYPE,'L','O','D','I','C','O','B','I','X')  --Bug#36974375 commented changes --17-JUL-2012 Flexcube V.CL Release 7.11, Retro, EURCITIPLC#14280 Changes:added nvl
		
        AND   NVL(A.INFLOW_OUTFLOW,'P') <>DECODE(B.PRODUCT_TYPE,'L','O','D',DECODE(A.COMPONENT_TYPE,'I','X','I'),'C','O','B','I','X')  --Bug#36974375  changes 
		-- Bug#33989746 changes start
		--AND NVL(SUBSTR(COMPONENT, 0, INSTR(COMPONENT, '.')-1), COMPONENT) NOT IN (SELECT COMPONENT FROM LFTMS_PRODUCT_ICCF WHERE PRODUCT = SUBSTR(A.CONTRACT_REF_NO,4,4) AND SKIM_COMPONENT = 'Y') --Bug#36208222:Commented
		-- Bug#33989746 changes end
        --Bug#36974375 commented changes satrts
		/* AND NOT EXISTS (
					SELECT 1
					FROM LFTMS_PRODUCT_ICCF LP
					WHERE LP.PRODUCT = (SELECT sypks_utils.get_product(A.CONTRACT_REF_NO) FROM DUAL) AND LP.SKIM_COMPONENT = 'Y'
					AND NVL(SUBSTR(A.COMPONENT, 0, INSTR(A.COMPONENT, '.')-1), A.COMPONENT) = LP.COMPONENT
				) */
        --Bug#37099834 Start
		--Bug#36974375 commented changes satrts        
        /*AND B.BORROWER_CONTRACT_REF_NO = c.contract_ref_no(+)	--Bug#36208222:Added
		AND A.COMPONENT = c.COMPONENT(+)*/	--Bug#36208222:Added--Commented as part of Bug#37099834 
		--Bug#37099834 End
        )
  GROUP BY CONTRACT_REF_NO,PAY_BY_DATE,CURRENCY_AMT_DUE
)
/