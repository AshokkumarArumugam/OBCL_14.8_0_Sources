CREATE OR REPLACE FORCE VIEW olvw_loan_rollover
(roll_amount, liquidate_principal, roll_inst_status, currency,rollover_date, value_date, contract_ref_no, commitment_ref_no)
AS
/*-------------------------------------------------------------------------------------- 
**  
**  File Name :olvw_loan_rollover.VW 
**  
**  Module    :LD-Loans and Deposits
**  
**  This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
------------------------------------------CHANGE HISTORY----------------------------------
09-Jun-2009 FLEXCUBE V.CL Release 7.5 lot2 ITR1 SFR#86 , VDBAL changes for rollover by Saurabh
11-Jun-2009 FLEXCUBE V.CL Release 7.5 lot2 ITR1 SFR#134 , Rollover build if  rollover allowed is yes
26-Jun-2009 FLEXCUBE V.CL Release 7.5 lot2 ITR2 SFR#5 , For New Version Rollover rollover date has been picked up by Saurabh
20-Mar-2010 FLEXCUBE V.CL Release 7.6 CITIPBG TD FS tag4 Changes for populating VDBAL for deposits.
17-Apr-2010 FLEXCUBE V.CL Release 7.6 ITR1 SFR#2 UT#34, rollover failed for additional principal amount in vdbal.
24-AUG-2011 Flexcube V.CL Release 7.10, CITIPBG Retro, TILL#5317 Changes : Modified the view to comment out the rollover_allowed condition .This condition is handled outside
                                        the view . View picks the rollover details based on the latest version . A back valued VAMI is not picking the rollover
                                        details if the TD was set for rollover(rollover_allowed as Y) as of the VAMI value date but has rollover_allowed as N for the 
                                        latest version.
Changed By         : Chandra Achuta
Date               : 16-AUG-2023
Change Description : Util fee calc issue during roll. 
Search String      : Bug#35694645										
Changed By         : Chandra Achuta
Date               : 29-SEP-2023
Change Description : Util fee calc issue during roll. 
Search String      : Bug#35855605										

 **Changed By         : Vineeth T M
**Date               : 30-Jul-2024
**Change Description : OBCL_14.8_VER_ROL Changes
**Search String      : OBCL_14.8_VER_ROL Changes  									
----------------------------------------END CHANGE HISTORY --------------------------------
*/
SELECT   NVL(SUM(A.AMOUNT_SETTLED),0)  ROLL_AMOUNT,
             LIQUIDATE_PRINCIPAL,
             B.ROLL_INST_STATUS,
             C.CURRENCY,
             DECODE(c.rollover_mechanism,'V',c.value_date,c.maturity_date) rollover_date, --26-Jun-2009 FLEXCUBE V.CL Release 7.5 lot2 ITR2 SFR#5 , For New Version Rollover rollover date has been picked up by Saurabh
             A.PAID_DATE,
             A.CONTRACT_REF_NO,
             C.TRANCHE_REF_NO
    FROM     oltbs_amount_paid A,
             oltbs_contract_rollover B,
             oltbs_contract_master C,
             oltbs_contract D
    WHERE    A.CONTRACT_REF_NO = D.CONTRACT_REF_NO
    AND      B.CONTRACT_REF_NO = D.CONTRACT_REF_NO
    AND      B.VERSION_NO = D.LATEST_VERSION_NO
    AND      C.CONTRACT_REF_NO = D.CONTRACT_REF_NO
    AND      C.VERSION_NO = D.LATEST_VERSION_NO
    AND      A.COMPONENT = 'PRINCIPAL_ROLL'
    AND      B.ROLL_INST_STATUS IN ('C','W')
    AND      d.contract_status not in ('H','V')
    AND      d.Module_Code	='OL'
    --24-AUG-2011 Flexcube V.CL Release 7.10, CITIPBG Retro, TILL#5317 Changes, Commented, START    
    --AND      C.rollover_allowed= 'Y'--11-Jun-2009 FLEXCUBE V.CL Release 7.5 lot2 ITR1 SFR#134 , Rollover build if  rollover allowed is yes
    --24-AUG-2011 Flexcube V.CL Release 7.10, CITIPBG Retro, TILL#5317 Changes, END
    GROUP BY c.currency,DECODE(c.rollover_mechanism,'V',c.value_date,c.maturity_date),a.paid_date,a.contract_ref_no,c.tranche_ref_no,liquidate_principal,b.roll_inst_status
UNION
    SELECT rollover_amount,liquidate_principal,'P',currency,rollover_date,maturity_date,contract_ref_no,commitment_ref_no
    FROM (
          SELECT   ROLLOVER_METHOD
                 , ROLLOVER_AMOUNT_TYPE
                 , (DECODE(ROLLOVER_METHOD
                           ,'N',rollover_amount
                           ,'S',DECODE(ROLLOVER_AMOUNT_TYPE,'I'
				  , (SELECT Z.rollover_amount - (SELECT SUM(NVL(j.amount_due,0))  amount1
									   FROM   oltbs_amount_due_cs j, lftbs_contract_interest_master k
									   WHERE  j.contract_ref_no = Z.CONTRACT_REF_NO
									   AND    j.contract_ref_no = k.contract_ref_no
									   AND    j.component       = k.component
									   --AND    j.inflow_outflow  = 'I'--20-Mar-2010 FLEXCUBE V.CL Release 7.6 CITIPBG TD FS tag4 Changes
									   AND    j.inflow_outflow  = DECODE(Z.PRODUCT_TYPE,'D','O','I')--20-Mar-2010 FLEXCUBE V.CL Release 7.6 CITIPBG TD FS tag4 Changes
									   AND    j.component_type = 'I'
									   AND    k.shown_in_contract_main_screen = 'Y'
									   AND    j.due_date        =  (SELECT maturity_date
														  FROM OLTB_CONTRACT_MASTER 
														  WHERE contract_ref_no = k.contract_ref_no
														  AND version_no = (SELECT MAX (version_no)
																	  FROM OLTB_CONTRACT_MASTER 
																	  WHERE contract_ref_no = k.contract_ref_no
																	  )
														   )
									     ) 
					   FROM DUAL
					  )
					  ,rollover_amount),
    			          'C',DECODE(ROLLOVER_AMOUNT_TYPE,'I'
    			          , (SELECT rollover_amount - (SELECT SUM(NVL(j.amount_due,0))  amount1
									  FROM   oltbs_amount_due_cs j, lftbs_contract_interest_master k
									  WHERE  j.contract_ref_no = Z.CONTRACT_REF_NO
									  AND    j.contract_ref_no = k.contract_ref_no
									  AND    j.component       = k.component
									  --AND    j.inflow_outflow  = 'I'--20-Mar-2010 FLEXCUBE V.CL Release 7.6 CITIPBG TD FS tag4 Changes
									  AND    j.inflow_outflow  = DECODE(Z.PRODUCT_TYPE,'D','O','I')--20-Mar-2010 FLEXCUBE V.CL Release 7.6 CITIPBG TD FS tag4 Changes
									  AND    j.component_type = 'I'
									  AND    k.SHOWN_IN_CONTRACT_MAIN_SCREEN = 'Y'
									  AND    j.due_date        =  (SELECT maturity_date
														 FROM OLTB_CONTRACT_MASTER 
														 WHERE contract_ref_no = k.contract_ref_no
														 AND version_no = (SELECT MAX(version_no)
																	 FROM OLTB_CONTRACT_MASTER 
																	 WHERE contract_ref_no = k.contract_ref_no
																	 )
														 )
										  ) 
										  FROM DUAL
                        ),
                        'S',rollover_amount))) ROLLOVER_AMOUNT,
  		   liquidate_principal,'P',
  		   currency,
  		   rollover_date,--26-Jun-2009 FLEXCUBE V.CL Release 7.5 lot2 ITR2 SFR#5 , For New Version Rollover rollover date has been picked up by Saurabh
  		   maturity_date,
  		   contract_ref_no, 
  		   commitment_ref_no FROM (  SELECT 
  		   					 A.ROLLOVER_METHOD,
  		   					 C.ROLLOVER_AMOUNT_TYPE, 
  		   					 (
  		   					 CASE
                						WHEN NVL(A.ROLLOVER_METHOD,'N') = 'N' 
                						THEN 
                							CASE
									  WHEN NVL(C.ROLLOVER_AMOUNT_TYPE,'I') IN ('P','I') 
									  OR(A.PRODUCT_TYPE = 'D' AND NVL(C.ROLLOVER_AMOUNT_TYPE,'I') = 'T')--20-Mar-2010 FLEXCUBE V.CL Release 7.6 CITIPBG TD FS tag4 Changes
									  THEN 
										  DECODE(NVL(C.ROLLOVER_AMT,0),0,
											  (SELECT SUM(NVL(M.AMOUNT_DUE,0)) - SUM(NVL(M.AMOUNT_SETTLED,0)) - SUM(NVL(M.ADJUSTED_AMOUNT,0)) - SUM(NVL(M.PAY_RECV_AMOUNT,0))
											  FROM   oltbs_amount_due_cs M,
												   lftbs_contract_interest_master N
											  WHERE M.CONTRACT_REF_NO = C.CONTRACT_REF_NO 
											  AND M.CONTRACT_REF_NO = N.CONTRACT_REF_NO (+)
											  AND M.COMPONENT = N.COMPONENT (+)
											  --AND M.INFLOW_OUTFLOW = 'I'--20-Mar-2010 FLEXCUBE V.CL Release 7.6 CITIPBG TD FS tag4 Changes
											  AND M.INFLOW_OUTFLOW = DECODE(A.PRODUCT_TYPE,'D','O','I')--20-Mar-2010 FLEXCUBE V.CL Release 7.6 CITIPBG TD FS tag4 Changes
											  AND M.COMPONENT_TYPE = DECODE(A.ROLLOVER_MECHANISM,'V','P',DECODE(C.ROLLOVER_AMOUNT_TYPE,'I',M.COMPONENT_TYPE,'P'))
											  AND DECODE(M.COMPONENT_TYPE,'I',N.SHOWN_IN_CONTRACT_MAIN_SCREEN,'Y') = 'Y'
											  ),
											 (
											 SELECT DECODE(TREAT_SPL_AMT_AS,
													  'A',C.ROLLOVER_AMT,
													   'I',(SUM(NVL(M.AMOUNT_DUE,0)) - SUM(NVL(M.AMOUNT_SETTLED,0)) - SUM(NVL(M.ADJUSTED_AMOUNT,0)) - SUM(NVL(M.PAY_RECV_AMOUNT,0))),   --Bug#35694645  Code Added
													  --20-Mar-2010 FLEXCUBE V.CL Release 7.6 CITIPBG TD FS tag4 Changes - Start
													  --'L',(SUM(NVL(M.AMOUNT_DUE,0)) - SUM(NVL(M.AMOUNT_SETTLED,0)) - SUM(NVL(M.ADJUSTED_AMOUNT,0)) - SUM(NVL(M.PAY_RECV_AMOUNT,0)) - C.ROLLOVER_AMT),
													  'L',DECODE(A.PRODUCT_TYPE,'D',
													  (SUM(NVL(M.AMOUNT_DUE,0)) - SUM(NVL(M.AMOUNT_SETTLED,0)) - SUM(NVL(M.ADJUSTED_AMOUNT,0)) - SUM(NVL(M.PAY_RECV_AMOUNT,0))),
													  --Bug#35855605  Changes Starts
													  --(SUM(NVL(M.AMOUNT_DUE,0)) - SUM(NVL(M.AMOUNT_SETTLED,0)) - SUM(NVL(M.ADJUSTED_AMOUNT,0)) - SUM(NVL(M.PAY_RECV_AMOUNT,0)) - C.ROLLOVER_AMT)),
													  (SUM(NVL(M.AMOUNT_DUE,0)) - SUM(NVL(M.AMOUNT_SETTLED,0)) - SUM(NVL(M.ADJUSTED_AMOUNT,0)) - SUM(NVL(M.PAY_RECV_AMOUNT,0)))),
													  --Bug#35855605  Changes Ends
													  --20-Mar-2010 FLEXCUBE V.CL Release 7.6 CITIPBG TD FS tag4 Changes - End
													  'N',(SUM(NVL(M.AMOUNT_DUE,0)) - SUM(NVL(M.AMOUNT_SETTLED,0)) - SUM(NVL(M.ADJUSTED_AMOUNT,0)) - SUM(NVL(M.PAY_RECV_AMOUNT,0))),--17-Apr-2010 FLEXCUBE V.CL Release 7.6 ITR1 SFR#2 UT#34
													  'M',LEAST((SUM(NVL(M.AMOUNT_DUE,0)) - SUM(NVL(M.AMOUNT_SETTLED,0)) - SUM(NVL(M.ADJUSTED_AMOUNT,0)) - SUM(NVL(M.PAY_RECV_AMOUNT,0))),C.ROLLOVER_AMT))
											FROM   oltbs_amount_due_cs M,
												 lftbs_contract_interest_master N
											WHERE M.CONTRACT_REF_NO = C.CONTRACT_REF_NO 
											AND   M.CONTRACT_REF_NO = N.CONTRACT_REF_NO (+)
											AND   M.COMPONENT = N.COMPONENT (+)
											--AND   M.INFLOW_OUTFLOW = 'I'--20-Mar-2010 FLEXCUBE V.CL Release 7.6 CITIPBG TD FS tag4 Changes
											AND   M.INFLOW_OUTFLOW = DECODE(A.PRODUCT_TYPE,'D','O','I')--20-Mar-2010 FLEXCUBE V.CL Release 7.6 CITIPBG TD FS tag4 Changes
											AND   M.COMPONENT_TYPE = DECODE(A.ROLLOVER_MECHANISM,'V','P',DECODE(C.ROLLOVER_AMOUNT_TYPE,'I',M.COMPONENT_TYPE,'P'))
											AND DECODE(M.COMPONENT_TYPE,'I',N.SHOWN_IN_CONTRACT_MAIN_SCREEN,'Y') = 'Y'
											)
											)
    	       					 		END
								WHEN A.ROLLOVER_METHOD = 'S' THEN 
									(
									 SELECT SUM(NVL(D.MAX_ROLL_AMOUNT,0))
									 FROM   oltbs_contract_split_rollover D
									 WHERE  D.CONTRACT_REF_NO = B.CONTRACT_REF_NO
									 AND D.VERSION_NO = B.LATEST_VERSION_NO
									 )
							END
							) ROLLOVER_AMOUNT,
		(
		CASE
		WHEN A.ROLLOVER_METHOD IN ('N','S') 
		THEN 
			C.LIQUIDATE_PRINCIPAL
		END
		) LIQUIDATE_PRINCIPAL,
		'P',
		A.CURRENCY,
		DECODE(a.rollover_mechanism,'V',a.value_date,a.maturity_date) rollover_date,--26-Jun-2009 FLEXCUBE V.CL Release 7.5 lot2 ITR2 SFR#5 , For New Version Rollover rollover date has been picked up by Saurabh
		A.MATURITY_DATE,
		B.CONTRACT_REF_NO,
		A.PRODUCT_TYPE, --20-Mar-2010 FLEXCUBE V.CL Release 7.6 CITIPBG TD FS tag4 Changes
		A.TRANCHE_REF_NO commitment_ref_no
     FROM   oltbs_contract_master A,
             oltbs_contract B,
             oltbs_contract_rollover C
     WHERE  A.CONTRACT_REF_NO = B.CONTRACT_REF_NO
     AND A.VERSION_NO = B.LATEST_VERSION_NO
     AND C.CONTRACT_REF_NO = B.CONTRACT_REF_NO
     AND C.VERSION_NO = B.LATEST_VERSION_NO
     AND B.MODULE_CODE = 'OL'
     AND B.CONTRACT_STATUS IN ('A','Y') 
     --AND A.PRODUCT_TYPE = 'L' --20-Mar-2010 FLEXCUBE V.CL Release 7.6 CITIPBG TD FS tag4 Changes
     AND A.PRODUCT_TYPE IN ('L','D') --20-Mar-2010 FLEXCUBE V.CL Release 7.6 CITIPBG TD FS tag4 Changes
     AND C.ROLL_INST_STATUS =   'C'
     --24-AUG-2011 Flexcube V.CL Release 7.10, CITIPBG Retro, TILL#5317 Changes, Commented, START 
     --AND A.rollover_allowed= 'Y'--11-Jun-2009 FLEXCUBE V.CL Release 7.5 lot2 ITR1 SFR#134 , Rollover build if  rollover allowed is yes
     --24-AUG-2011 Flexcube V.CL Release 7.10, CITIPBG Retro, TILL#5317 Changes, END
     ) z) V
	 --OBCL_14.8_VER_ROL Changes start
	UNION
	select c.Amount_Financed,
		   null,
		   'P',
		   m.currency,
		   a.roll_value_date,
		   m.maturity_date,
		   m.contract_ref_no,
		   m.tranche_ref_no
	  from oltb_contract_version_roll a,
		   oltbs_contract             b,
		   oltbs_contract_master      m,
		   oltbs_contract_master      c
	 where m.CONTRACT_REF_NO = a.CONTRACT_REF_NO
	   and m.VERSION_NO = b.LATEST_VERSION_NO
	   and m.contract_ref_no = b.contract_ref_no
	   and c.CONTRACT_REF_NO = a.ROLL_SRC_REF_NO
	   and c.VERSION_NO = a.VERSION_NO
	   and a.ROLL_STATUS in ('I','C')
	   AND b.module_code = 'OL'
	--OBCL_14.8_VER_ROL Changes end
/
CREATE OR REPLACE SYNONYM olvws_loan_rollover FOR olvw_loan_rollover
/