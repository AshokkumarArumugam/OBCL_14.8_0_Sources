create or replace view lbvw_paybydt_schedule_summary
(contract_ref_no, pay_by_date, total_amount_due, total_amount_settled, total_adjusted_amount, currency_amt_due)
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lbvw_paybydt_schedule_summary.VW
**
** Module      : Syndication Loans and Commitments
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
/* Change History
11-NOV-2020 Pay_by_Date enhancement for LS fees
*/
(
  SELECT  A.CONTRACT_REF_NO, NVL(A.pay_by_date,A.DUE_DATE) ,
  SUM( ( DECODE( A.inflow_outflow, 'I', 1, 'R', 1, -1 ) ) * NVL( A.AMOUNT_DUE,      0 ) ),
  SUM( ( DECODE( A.inflow_outflow, 'I', 1, 'R', 1, -1 ) ) * NVL( A.AMOUNT_SETTLED,  0 ) ),
  SUM( ( DECODE( A.inflow_outflow, 'I', 1, 'R', 1, -1 ) ) * NVL( A.ADJUSTED_AMOUNT, 0 ) ),
  CURRENCY_AMT_DUE
  FROM   oltbs_amount_due A,
     lbtb_syndication_master B
  WHERE A.CONTRACT_REF_NO = B.CONTRACT_REF_NO
  AND   B.VERSION_NO = (  SELECT MAX(VERSION_NO)
          FROM lbtb_syndication_master
          WHERE CONTRACT_REF_NO = A.CONTRACT_REF_NO)
  --AND   A.COMPONENT_TYPE <> 'H'
        AND     A.COMPONENT_TYPE NOT IN ('H','T')
       --  and a.contract_ref_no='000BFDI17091ATBN'
  AND   NVL(A.AMOUNT_DUE,0) <> 0
  GROUP BY A.CONTRACT_REF_NO,NVL(A.pay_by_date,A.DUE_DATE),A.CURRENCY_AMT_DUE
)
/
create or replace synonym lbvws_paybydt_schedule_summary for lbvw_paybydt_schedule_summary
/