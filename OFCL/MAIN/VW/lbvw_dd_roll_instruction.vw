CREATE OR REPLACE FORCE VIEW lbvw_dd_roll_instruction
(CONTRACT_REF_NO,TRANCHE_REF_NO,ROLLOVER_METHOD,ROLLOVER_AMOUNT,LIQUIDATE_PRINCIPAL,CURRENCY,VALUE_DATE)
AS
/*----------------------------------------------------------------------------------------------------
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
--30-NOV-2007 FLEXCUBE V.CL Release 7.3 ITR1 SFR#101 START
--28-OCT-2008 CITIUS-LS#SRT1451 STP and Code Consolidation Retro
  /*SELECT B.CONTRACT_REF_NO,
         A.TRANCHE_REF_NO,
         A.ROLLOVER_METHOD,
         (CASE 
            WHEN NVL(A.ROLLOVER_METHOD,'N') = 'N' THEN CASE 
				 WHEN NVL(C.ROLLOVER_AMOUNT_TYPE,'I') IN ('P','I') THEN DECODE(NVL(C.ROLLOVER_AMT,0),0,(SELECT SUM(NVL(M.AMOUNT_DUE,0)) - SUM(NVL(M.AMOUNT_SETTLED,0)) - SUM(NVL(M.ADJUSTED_AMOUNT,0)) - SUM(NVL(M.PAY_RECV_AMOUNT,0))
																										FROM   oltbs_amount_due_cs M,
																											   lftbs_contract_interest_master N
																										--WHERE a.contract_ref_no = c.contract_ref_no --05-oct-2006 fcc v.cl release 7.1 changes sfr#13 daya
																									   WHERE M.CONTRACT_REF_NO = C.CONTRACT_REF_NO --05-oct-2006 fcc v.cl release 7.1 changes sfr#13 daya
																											   AND M.CONTRACT_REF_NO = N.CONTRACT_REF_NO (+)
																											   AND M.COMPONENT = N.COMPONENT (+)
																											   AND M.INFLOW_OUTFLOW = 'I'
																											   AND M.COMPONENT_TYPE = DECODE(C.ROLLOVER_AMOUNT_TYPE,'I',M.COMPONENT_TYPE,
																																									'P')
																											   AND DECODE(M.COMPONENT_TYPE,'I',N.SHOWN_IN_CONTRACT_MAIN_SCREEN,
																																		   'Y') = 'Y'),
																									 --and m.due_date = a.value_date),--05-oct-2006 fcc v.cl release 7.1 changes sfr#13 daya
																									 (SELECT DECODE(TREAT_SPL_AMT_AS,'A',C.ROLLOVER_AMT,
																																	 'L',(SUM(NVL(M.AMOUNT_DUE,0)) - SUM(NVL(M.AMOUNT_SETTLED,0)) - SUM(NVL(M.ADJUSTED_AMOUNT,0)) - SUM(NVL(M.PAY_RECV_AMOUNT,0)) - C.ROLLOVER_AMT),
																																	 'M',LEAST((SUM(NVL(M.AMOUNT_DUE,0)) - SUM(NVL(M.AMOUNT_SETTLED,0)) - SUM(NVL(M.ADJUSTED_AMOUNT,0)) - SUM(NVL(M.PAY_RECV_AMOUNT,0))),
																																			   C.ROLLOVER_AMT))
																									  FROM   oltbs_amount_due_cs M,
																											 lftbs_contract_interest_master N
																									  --WHERE a.contract_ref_no = c.contract_ref_no --05-oct-2006 fcc v.cl release 7.1 changes sfr#13 daya
																									 WHERE M.CONTRACT_REF_NO = C.CONTRACT_REF_NO --05-oct-2006 fcc v.cl release 7.1 changes sfr#13 daya
																											 AND M.CONTRACT_REF_NO = N.CONTRACT_REF_NO (+)
																											 AND M.COMPONENT = N.COMPONENT (+)
																											 AND M.INFLOW_OUTFLOW = 'I'
																											 AND M.COMPONENT_TYPE = DECODE(C.ROLLOVER_AMOUNT_TYPE,'I',M.COMPONENT_TYPE,
																																								  'P')
																											 AND DECODE(M.COMPONENT_TYPE,'I',N.SHOWN_IN_CONTRACT_MAIN_SCREEN,
																																		 'Y') = 'Y'))
			   --and m.due_date = a.value_date))--05-oct-2006 fcc v.cl release 7.1 changes sfr#13 daya
			   END
            --then nvl(c.rollover_amt,0)
            WHEN A.ROLLOVER_METHOD = 'S' THEN (SELECT SUM(NVL(D.MAX_ROLL_AMOUNT,0))
                                               FROM   oltbs_contract_split_rollover D
                                               WHERE  D.CONTRACT_REF_NO = B.CONTRACT_REF_NO
                                                      AND D.VERSION_NO = B.LATEST_VERSION_NO)
            WHEN A.ROLLOVER_METHOD = 'C' THEN (SELECT NVL(E.ROLLOVER_AMOUNT,0)
                                               FROM   lbtbs_contract_consol_detail E,
                                                      lbtbs_contract_consol_master F
                                               WHERE  E.CHILD_REF_NO = B.CONTRACT_REF_NO
                                                      AND E.CONTRACT_REF_NO = F.CONTRACT_REF_NO
                                                      AND F.ROLLOVER_STATUS IN ('I','F'))
          END) ROLLOVER_AMOUNT--FCC V.CL Release 7.3 Rollover changes STARTS*/
	SELECT B.CONTRACT_REF_NO,
	A.TRANCHE_REF_NO,
	A.ROLLOVER_METHOD,
		(CASE
		WHEN NVL(A.ROLLOVER_METHOD,'N') = 'N' THEN
			DECODE(C.rollover_amount_type,'P',C.ROLLOVER_AMT,C.ROLLOVER_AMT + C.INTEREST_ROLL_AMOUNT)
		WHEN A.ROLLOVER_METHOD = 'S' THEN 
			(SELECT SUM(decode(c.rollover_amount_type,'P',NVL(D.PRINCIPAL_ROLL_AMOUNT,0),NVL(D.MAX_ROLL_AMOUNT,0)))--sachin temp changes
			FROM   oltbs_contract_split_rollover D
			WHERE  D.CONTRACT_REF_NO = B.CONTRACT_REF_NO
			AND D.VERSION_NO = B.LATEST_VERSION_NO)
		WHEN A.ROLLOVER_METHOD = 'C' THEN 
			(SELECT DECODE(F.ROLLOVER_AMOUNT_TYPE,'P',NVL(E.PRINCIPAL_ROLL_AMOUNT,0),(NVL(E.PRINCIPAL_ROLL_AMOUNT,0) + NVL(E.INTEREST_ROLL_AMOUNT,0)
			--Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag08 Changes Start
			+ NVL(E.PIK_ROLL_AMOUNT,0)))--sachin spotfix
			--Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag08 Changes End
			FROM   lbtbs_contract_consol_detail E,
			lbtbs_contract_consol_master F
			WHERE  E.CHILD_REF_NO = B.CONTRACT_REF_NO
			AND E.CONTRACT_REF_NO = F.CONTRACT_REF_NO
			AND F.ROLLOVER_STATUS IN ('I','F'))
		END) ROLLOVER_AMOUNT
		--30-NOV-2007 FLEXCUBE V.CL Release 7.3 ITR1 SFR#101 ENDS
         ,
         (CASE 
            WHEN A.ROLLOVER_METHOD IN ('N','S') THEN C.LIQUIDATE_PRINCIPAL
            WHEN A.ROLLOVER_METHOD = 'C' THEN (SELECT E.LIQUIDATE_PRINCIPAL
                                               FROM   lbtbs_contract_consol_detail E,
                                                      lbtbs_contract_consol_master F
                                               WHERE  E.CHILD_REF_NO = B.CONTRACT_REF_NO
                                                      AND E.CONTRACT_REF_NO = F.CONTRACT_REF_NO
                                                      AND F.ROLLOVER_STATUS IN ('I','F'))
          END) LIQUIDATE_PRINCIPAL--FCC V.CL Release 7.3 Rollover changes ENDS
         ,
         A.CURRENCY,
         A.MATURITY_DATE
  FROM   oltbs_contract_master A,
         oltbs_contract B,
         oltbs_contract_rollover C
  WHERE  A.CONTRACT_REF_NO = B.CONTRACT_REF_NO 
  		 --CITIUS-LS#SRT1451 Starts
         AND A.VERSION_NO = b.latest_version_no
         					/*(SELECT MAX(VERSION_NO) 
                             FROM oltbs_contract_master
                             WHERE CONTRACT_REF_NO= A.CONTRACT_REF_NO)  */
         --CITIUS-LS#SRT1451 Ends        
         AND C.CONTRACT_REF_NO = B.CONTRACT_REF_NO
         --CITIUS-LS#SRT1451 Starts
         AND C.VERSION_NO = b.latest_version_no
         					/*(SELECT MAX(VERSION_NO)
                             FROM oltbs_contract_rollover
                             WHERE CONTRACT_REF_NO= C.CONTRACT_REF_NO)*/
		 --CITIUS-LS#SRT1451 Ends                             
         AND B.MODULE_CODE = 'LB'
         AND B.CONTRACT_STATUS IN ('A','Y') --active or uninitiated contracts
         AND A.PRODUCT_TYPE = 'L'
         AND C.ROLL_INST_STATUS IN ('I','F')
/                                   
create or replace synonym lbvws_dd_roll_instruction for lbvw_dd_roll_instruction
/