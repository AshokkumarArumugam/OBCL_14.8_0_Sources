CREATE OR REPLACE FORCE VIEW lbvw_drawdown_rollover
(roll_amount, liquidate_principal, roll_inst_status, currency, value_date, contract_ref_no, tranche_ref_no)
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

 
     **Changed By     : ANUSHA K
     **Changed On         : 02-AUG-2023
     **Change Description :COMMENTED rollover amount type s condition
     **Search String      : obcl_14.6_Rabo_#35593575 changes 
	 
	 **Changed By         : Arunprasath
     **Changed On         : 24-Apr-2024
     **Change Description : ROLL_INST_STATUS "W" included to fetch rollover amount for parent contract cr turnover amount update during rollover initiation
     **Search String      : Bug#36434491	
	 
	 **Changed By         : Arunprasath
     **Changed On         : 21-May-2024
     **Change Description : ROLL_INST_STATUS "W" included to fetch rollover amount for parent contract cr turnover amount update during rollover initiation
     **Search String      : Bug#36434491_1
	 
	 **Changed By         : Arunprasath
     **Changed On         : 21-May-2024
     **Change Description : ROLL_INST_STATUS "W" included to fetch rollover amount for consol rollover case during initation
     **Search String      : Bug#36499736 
	 
	 **Changed By         : Arunprasath
     **Changed On         : 13-Feb-2025
     **Change Description : a) ROLL_INST_STATUS column specified in 2nd select query instead of using hardcoded value "P"
	                        b) ROLL_INST_STATUS "W" included to get the liquidate_principal for consol rollover case
							c) Event code condition added in second select query to skip to get the rollover amount for ROLL event
     **Search String      : Bug#37500507 
	 
----------------------------------------------------------------------------------------------------
*/
SELECT   NVL(SUM(A.AMOUNT_SETTLED),0)  ROLL_AMOUNT,
           LIQUIDATE_PRINCIPAL,
           B.ROLL_INST_STATUS,
           C.CURRENCY,
           A.PAID_DATE,
           A.CONTRACT_REF_NO,
           C.TRANCHE_REF_NO
  FROM     oltbs_amount_paid A,
           oltbs_contract_rollover B,
           oltbs_contract_master C,
           oltbs_contract D
  WHERE    A.CONTRACT_REF_NO = D.CONTRACT_REF_NO
           AND B.CONTRACT_REF_NO = D.CONTRACT_REF_NO
           AND B.VERSION_NO = D.LATEST_VERSION_NO
           AND C.CONTRACT_REF_NO = D.CONTRACT_REF_NO
           AND C.VERSION_NO = D.LATEST_VERSION_NO
           AND A.COMPONENT = 'PRINCIPAL_ROLL'
           AND B.ROLL_INST_STATUS IN ('C','W')
	   AND d.contract_status not in ('H','V')--FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-#1223, System should not pickup reversed and hold contracts for vdbal reclculation.
  GROUP BY C.CURRENCY,A.PAID_DATE,A.CONTRACT_REF_NO,C.TRANCHE_REF_NO,
           LIQUIDATE_PRINCIPAL,B.ROLL_INST_STATUS
 --FCC V.CL Release 7.3 Rollover changes starts
	   UNION
SELECT ROLLOVER_AMOUNT,LIQUIDATE_PRINCIPAL,
--Bug#37500507 Start
	  /*'P'*/roll_inst_status,
	   --Bug#37500507 End
CURRENCY,MATURITY_DATE,CONTRACT_REF_NO,TRANCHE_REF_NO
FROM (
select ROLLOVER_METHOD
,ROLLOVER_AMOUNT_TYPE
, (decode(ROLLOVER_METHOD
,'N',rollover_amount
,'S',DECODE(ROLLOVER_AMOUNT_TYPE
            ,'I'
            , (SELECT Z.rollover_amount - (select sum(nvl(j.amount_due,0))  amount1--25-SEP-2006 FLEXCUBE V.CL Release 7.1 sulav changes for new column
            from   oltbs_amount_due_cs j, lftbs_contract_interest_master k
            where  j.contract_ref_no = Z.CONTRACT_REF_NO
			and
               j.contract_ref_no = k.contract_ref_no
			         and    j.component       = k.component
			         and    j.inflow_outflow  = 'I'
			         and    j.component_type = 'I'
			         and    k.SHOWN_IN_CONTRACT_MAIN_SCREEN = 'Y'
			         and    j.due_date        =  (select maturity_date
                                   from OLTB_CONTRACT_MASTER where contract_ref_no = k.contract_ref_no
                                   and version_no = (select max (version_no)
                                   from OLTB_CONTRACT_MASTER where contract_ref_no = k.contract_ref_no))) FROM DUAL)
				   ,rollover_amount),'C',DECODE(ROLLOVER_AMOUNT_TYPE,'I', (SELECT rollover_amount - (select sum(nvl(j.amount_due,0))  amount1--25-SEP-2006 FLEXCUBE V.CL Release 7.1 sulav changes for new column
--			into   l_int_outstanding
			from   oltbs_amount_due_cs j, lftbs_contract_interest_master k
			where  j.contract_ref_no = Z.CONTRACT_REF_NO
			and
      j.contract_ref_no = k.contract_ref_no
			and    j.component       = k.component
			and    j.inflow_outflow  = 'I'
			and    j.component_type = 'I'
			and    k.SHOWN_IN_CONTRACT_MAIN_SCREEN = 'Y'
			and    j.due_date        =  (select maturity_date
                                   from OLTB_CONTRACT_MASTER where contract_ref_no = k.contract_ref_no
                                   and version_no = (select max (version_no)
                                   from OLTB_CONTRACT_MASTER where contract_ref_no = k.contract_ref_no))) FROM DUAL)/*,'S'*/--obcl_14.6_Rabo_#35593575 changes 
				   ,rollover_amount))) ROLLOVER_AMOUNT,liquidate_principal,'P',CURRENCY,maturity_date,contract_ref_no, tranche_ref_no 
				   ,roll_inst_status --Bug#37500507 added
				   from (  SELECT A.ROLLOVER_METHOD,C.ROLLOVER_AMOUNT_TYPE, (CASE
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
                                                      --Bug#36499736 Start                                                     
													 --AND F.ROLLOVER_STATUS = 'P'
													  AND F.ROLLOVER_STATUS IN ('P','W')
													   --Bug#36499736 End 
													   )
          END) ROLLOVER_AMOUNT--FCC V.CL Release 7.3 Rollover changes STARTS
         ,
         (CASE
            WHEN A.ROLLOVER_METHOD IN ('N','S') THEN C.LIQUIDATE_PRINCIPAL
            WHEN A.ROLLOVER_METHOD = 'C' THEN (SELECT E.LIQUIDATE_PRINCIPAL
                                               FROM   lbtbs_contract_consol_detail E,
                                                      lbtbs_contract_consol_master F
                                               WHERE  E.CHILD_REF_NO = B.CONTRACT_REF_NO
                                                      AND E.CONTRACT_REF_NO = F.CONTRACT_REF_NO
                                                      --AND F.ROLLOVER_STATUS IN ('I','F','P'))
													  AND F.ROLLOVER_STATUS IN ('I','F','P','W')) --Bug#37500507 'W' added
          END) LIQUIDATE_PRINCIPAL--FCC V.CL Release 7.3 Rollover changes ENDS
         ,
         'P',
         A.CURRENCY,
         A.MATURITY_DATE,
         B.CONTRACT_REF_NO,
         A.TRANCHE_REF_NO,
		 c.roll_inst_status --Bug#37500507 added
  FROM   oltbs_contract_master A,
         oltbs_contract B,
         oltbs_contract_rollover C
  WHERE  A.CONTRACT_REF_NO = B.CONTRACT_REF_NO
 AND A.VERSION_NO = B.LATEST_VERSION_NO
         AND C.CONTRACT_REF_NO = B.CONTRACT_REF_NO
         AND C.VERSION_NO = B.LATEST_VERSION_NO
         AND B.MODULE_CODE = 'LB'
         AND B.CONTRACT_STATUS IN ('A','Y') --active or uninitiated contracts
         AND A.PRODUCT_TYPE = 'L'
          /*--Bug#36434491 Start
		 --ROLL_INST_STATUS - 'W' included */--14.7_MNT_QA_Automation
		 --AND C.ROLL_INST_STATUS =   'P' --Bug#36434491_1
         /*
		 AND C.ROLL_INST_STATUS IN   ('P','W')
		 --Bug#36434491 end*/--14.7_MNT_QA_Automation
		 --Bug#36434491_1 Start
		 AND C.ROLL_INST_STATUS IN   ('P','W')
		 --Bug#36434491_1 End
		  AND NVL(b.curr_event_code,'XXX') <> 'ROLL' --Bug#37500507
		 ) z) V
	 --FCC V.CL Release 7.3 Rollover changes ends
/
create or replace synonym lbvws_drawdown_rollover for lbvw_drawdown_rollover
/