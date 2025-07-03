CREATE OR REPLACE FORCE VIEW olvw_schedule_summary_rfr
(contract_ref_no, due_date, total_amount_due, total_amount_settled, total_adjusted_amount, 
 total_pay_recv_amount, currency_amt_due, amount_due_actual, till_date_due, 
 lcy_reval_amt)
AS
/*-------------------------------------------------------------------------------------------------
**
** File Name  : OLVW_SCHEDULE_SUMMARY_RFR.VW
**
** Module : Oracle Lending
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
  **Changed By         : 
  **Date               : 
  **Change Description :  
  **Search String      : 
*/
(
  SELECT  CONTRACT_REF_NO,DUE_DATE,
  SUM( ( DECODE( inflow_outflow, 'I', 1, 'R', 1, -1 ) ) * NVL( AMOUNT_DUE,      0 ) ),
  SUM( ( DECODE( inflow_outflow, 'I', 1, 'R', 1, -1 ) ) * NVL( AMOUNT_SETTLED,  0 ) ),
  SUM( ( DECODE( inflow_outflow, 'I', 1, 'R', 1, -1 ) ) * NVL( ADJUSTED_AMOUNT, 0 ) ),
  SUM( ( DECODE( inflow_outflow, 'I', 1, 'R', 1, -1 ) ) * NVL( pay_recv_amount, 0 ) ),
  CURRENCY_AMT_DUE,
  SUM( ( DECODE( inflow_outflow, 'I', 1, 'R', 1, -1 ) ) * NVL( amount_due_actual, 0 ) ),
    0 till_date_due 
	,SUM( ( DECODE( inflow_outflow, 'I', 1, 'R', 1, -1 ) ) * NVL( lcy_reval_amt,  0 ) ) as lcy_reval_amt 
  from
  (select  A.CONTRACT_REF_NO,nvl(A.Pay_By_Date,a.due_date) due_date,a.inflow_outflow,
             a.amount_due,
       nvl(a.amount_due_actual,a.amount_due)amount_due_actual,
  a.amount_settled,a.adjusted_amount,a.pay_recv_amount,a.currency_amt_due
  ,a.lcy_reval_amt 
  FROM   oltbs_amount_due A,
     oltbs_contract_master B
  WHERE A.CONTRACT_REF_NO = B.CONTRACT_REF_NO
  AND   B.VERSION_NO = (  SELECT MAX(VERSION_NO)
          FROM OLTB_CONTRACT_MASTER
          WHERE CONTRACT_REF_NO = A.CONTRACT_REF_NO)
        AND     A.COMPONENT_TYPE NOT IN ('H','T')
  AND NOT EXISTS (select 1
      from lftm_product_iccf p
      where p.product=b.PRODUCT
      and p.component=a.component
      and p.allow_reporting_only='Y')
  AND   NOT (B.MODULE = 'OL' AND B.PRODUCT_TYPE = 'C' AND A.COMPONENT = 'PRINCIPAL')
	AND NOT (B.MODULE = 'OL' AND A.COMPONENT = 'PRINCIPAL' AND A.INFLOW_OUTFLOW = 'O')
  AND not exists (select 1 
                from lftbs_contract_interest z
               where z.contract_Reference_no = A.CONTRACT_REF_NO
			     and z.component = a.component
				 and z.rfr_component ='Y'
				 and z.penalty_type ='N'
				 AND z.Event_Sequence_No =
                     (SELECT MAX(x.Event_Sequence_No)
                        FROM Lftbs_Contract_Interest x
                       WHERE x.Contract_Reference_No = z.Contract_Reference_No
                         AND x.Component = z.Component)
					)   
  AND   nvl(exp_fee_sch,'N')<>'Y'
  --new code
  UNION ALL
  select  A.CONTRACT_REF_NO,nvl(A.Pay_By_Date,a.due_date) due_date,a.inflow_outflow,
             a.amount_due, 
       nvl(a.amount_due_actual,a.amount_due)amount_due_actual,
  a.amount_settled,a.adjusted_amount,a.pay_recv_amount,a.currency_amt_due
  ,0 lcy_reval_amt
  FROM OLTB_TMP_RFR_AMT_DUE A,
     oltbs_contract_master B
  WHERE A.CONTRACT_REF_NO = B.CONTRACT_REF_NO
  AND   B.VERSION_NO = (  SELECT MAX(VERSION_NO)
          FROM OLTB_CONTRACT_MASTER
          WHERE CONTRACT_REF_NO = A.CONTRACT_REF_NO)
        AND     A.COMPONENT_TYPE NOT IN ('H','T')
  AND NOT EXISTS (select 1
      from lftm_product_iccf p
      where p.product=b.PRODUCT
      and p.component=a.component
      and p.allow_reporting_only='Y')
  AND   NOT (B.MODULE = 'OL' AND B.PRODUCT_TYPE = 'C' AND A.COMPONENT = 'PRINCIPAL')
	AND NOT (B.MODULE = 'OL' AND A.COMPONENT = 'PRINCIPAL' AND A.INFLOW_OUTFLOW = 'O')
  AND   nvl(exp_fee_sch,'N')<>'Y'
  AND exists (select 1 
                from lftbs_contract_interest z
               where z.contract_Reference_no = A.CONTRACT_REF_NO
			     and z.component = a.component
				 and z.rfr_component ='Y'
				 and z.penalty_type ='N'
				 AND z.Event_Sequence_No =
                     (SELECT MAX(x.Event_Sequence_No)
                        FROM Lftbs_Contract_Interest x
                       WHERE x.Contract_Reference_No = z.Contract_Reference_No
                         AND x.Component = z.Component)
					)
  )   
  GROUP BY CONTRACT_REF_NO,DUE_DATE,CURRENCY_AMT_DUE
)
/
CREATE OR REPLACE SYNONYM olvws_schedule_summary_rfr FOR olvw_schedule_summary_rfr
/