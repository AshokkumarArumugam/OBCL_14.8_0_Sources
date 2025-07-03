CREATE OR REPLACE FORCE VIEW OLVW_SCHEDULE_SUMM_HIST
(contract_ref_no, due_date, total_amount_due, total_amount_settled, total_adjusted_amount, total_pay_recv_amount, currency_amt_due, esn
, amount_due_actual, till_date_due)
AS 
/*-------------------------------------------------------------------------------------------------
**
** File Name  : olvw_schedule_summary.VW
**
** Module : LOANS SYNDICATION
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
DATE    VERSION NO  CODE    SFR DESCRIPTION
  **Changed By          : Mohan Pal
  **Change Description  : Porting OLVW_PAYBYDT_SCHEDULE_SUMMARY change
  **Changed On          : 04-Mar-2021
  
  **Changed By          : Mohan Pal
  **Change Description  : Bug#32865727
  **Search String		: Bug#32865727
  **Changed On          : 24-May-2021
-------------------------------------------------------------------------------------------
*/
(
   SELECT  CONTRACT_REF_NO,Pay_By_Date DUE_DATE,
  SUM( ( DECODE( inflow_outflow, 'I', 1, 'R', 1, -1 ) ) * NVL( AMOUNT_DUE,      0 ) ),
  SUM( ( DECODE( inflow_outflow, 'I', 1, 'R', 1, -1 ) ) * NVL( AMOUNT_SETTLED,  0 ) ),
  SUM( ( DECODE( inflow_outflow, 'I', 1, 'R', 1, -1 ) ) * NVL( ADJUSTED_AMOUNT, 0 ) ),
  SUM( ( DECODE( inflow_outflow, 'I', 1, 'R', 1, -1 ) ) * NVL( pay_recv_amount, 0 ) ),--FCC V.CL 7.1 Changes for new column
  CURRENCY_AMT_DUE,
  esn,
  SUM( ( DECODE( inflow_outflow, 'I', 1, 'R', 1, -1 ) ) * NVL( amount_due_actual, 0 )),
  0 till_date_due
  from
  (select  A.CONTRACT_REF_NO,nvl(A.Pay_By_Date,a.due_date) pay_by_date,a.inflow_outflow,a.amount_due,
  a.amount_settled,a.adjusted_amount,a.pay_recv_amount,a.currency_amt_due,a.esn,
  a.amount_due_actual
  FROM   oltbs_amount_due_hist A,
     oltbs_contract_master B
  WHERE A.CONTRACT_REF_NO = B.CONTRACT_REF_NO
  AND   B.VERSION_NO = (  SELECT MAX(VERSION_NO)
          FROM oltb_contract_master
          WHERE CONTRACT_REF_NO = A.CONTRACT_REF_NO)
        AND     A.COMPONENT_TYPE NOT IN ('H','T')

  AND   NOT (B.MODULE = 'OL' AND B.PRODUCT_TYPE = 'C' AND A.COMPONENT = 'PRINCIPAL')
  AND NOT (B.MODULE = 'OL' AND A.COMPONENT = 'PRINCIPAL' AND A.INFLOW_OUTFLOW = 'O')--OBCL_14.4_SGEN_PAYMENT_ACC_ENTRY_CHANGES------Bug#32865727 START
  )--FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION 16-Sep-2009 FLEXCUBE V.CL Release 7.5 lot3 ITR1 SFR#36
   GROUP BY CONTRACT_REF_NO,Pay_By_Date,CURRENCY_AMT_DUE,esn)


/
CREATE OR REPLACE SYNONYM olvws_schedule_summ_hist FOR olvw_schedule_summ_hist
/