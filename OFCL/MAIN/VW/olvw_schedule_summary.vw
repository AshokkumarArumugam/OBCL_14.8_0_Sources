CREATE OR REPLACE FORCE VIEW olvw_schedule_summary ( CONTRACT_REF_NO, 
DUE_DATE, TOTAL_AMOUNT_DUE, TOTAL_AMOUNT_SETTLED, TOTAL_ADJUSTED_AMOUNT, total_pay_recv_amount,
  currency_amt_due, amount_due_actual, till_date_due
  ,lcy_reval_amt --OBCL_14.5_FX_Variation Changes

) --FCC V.CL 7.1 Changes for new column
AS 
/*-------------------------------------------------------------------------------------------------
**
** File Name  : olvw_schedule_summary.VW
**
** Module : LOANS SYNDICATION
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
DATE    VERSION NO  CODE    SFR DESCRIPTION
09-JAN-2006 Flexcube V.CL Release 7.0   View Created for the payment schedule to be displayed in tranche online
08-sep-2006 FCC V.CL 7.1 Changes for new column
06-JUN-2008 FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-1250 sweta Changes for commenting the condition not to display records when amount due is 0 
      as in case if tranches after doing the fee liquidation if we reverse the fee the amount due will go 0 
      but we have values in amount settled and pay recv which needs to be displayed.
13-JUN-2009 FLEXCUBE V.CL Release 7.5 LOT1.1, sighting funds bulk insert fixes
      1) THE total amount due was not considering the outflow for interest components.
         when SF is Y then amount due = principal + (main int - comp component) + other int components
      2) changed the change history as well.
09-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION 16-Sep-2009 FLEXCUBE V.CL Release 7.5 lot3 ITR1 SFR#36, changes done not to get the principal amount displayed.     
09-SEP-2011 Flexcube V.CL Release 7.10, CITIUS Retro,CITIUS-LS#8959, As part of 7.7 upgrade, for sight funding contracts, system is deducting the comp interest component, 
  For US this is not applicable, so changes done not to consider the comp interest component, 
  while displaying the total amount due for the due date in the payment detail screen.
--------------------------------------------------------------------------------------------
  **Changed By          : Mohan Pal
  **Change Description  : Porting OLVW_PAYBYDT_SCHEDULE_SUMMARY change
  **Changed On          : 04-Mar-2021
  
  **Changed By         : Revathi Dharmalingam
  **Date               : 03-NOV-2021
  **Change Description : Added lcy_reval_amt for FX Variation Changes 
  **Search String      : OBCL_14.5_FX_Variation Changes

*/
(
  SELECT  CONTRACT_REF_NO,DUE_DATE,
  SUM( ( DECODE( inflow_outflow, 'I', 1, 'R', 1, -1 ) ) * NVL( AMOUNT_DUE,      0 ) ),
  SUM( ( DECODE( inflow_outflow, 'I', 1, 'R', 1, -1 ) ) * NVL( AMOUNT_SETTLED,  0 ) ),
  SUM( ( DECODE( inflow_outflow, 'I', 1, 'R', 1, -1 ) ) * NVL( ADJUSTED_AMOUNT, 0 ) ),
  SUM( ( DECODE( inflow_outflow, 'I', 1, 'R', 1, -1 ) ) * NVL( pay_recv_amount, 0 ) ),--FCC V.CL 7.1 Changes for new column
  CURRENCY_AMT_DUE,
  SUM( ( DECODE( inflow_outflow, 'I', 1, 'R', 1, -1 ) ) * NVL( amount_due_actual, 0 ) ), --Bug#31221804
    0 till_date_due --Bug#31221804
	,SUM( ( DECODE( inflow_outflow, 'I', 1, 'R', 1, -1 ) ) * NVL( lcy_reval_amt,  0 ) ) as lcy_reval_amt --OBCL_14.5_FX_Variation Changes
  from
  (select  A.CONTRACT_REF_NO,nvl(A.Pay_By_Date,a.due_date) due_date,a.inflow_outflow,
    -- OBCL_14.4_BUG#31213043 Start
      --a.amount_due
      --CASE WHEN c.zero_cash_flow = 'Y' THEN a.amount_due_actual
             --ELSE a.amount_due
            --END amount_due,--Bug#31221804
             a.amount_due, --Bug#31221804
       nvl(a.amount_due_actual,a.amount_due)amount_due_actual,--Bug#31221804
    -- OBCL_14.4_BUG#31213043 End
  a.amount_settled,a.adjusted_amount,a.pay_recv_amount,a.currency_amt_due
  ,a.lcy_reval_amt --OBCL_14.5_FX_Variation Changes
  FROM   oltbs_amount_due A,
     oltbs_contract_master B
         --,oltb_contract_preference C -- OBCL_14.4_BUG#31213043
  WHERE A.CONTRACT_REF_NO = B.CONTRACT_REF_NO
  -- OBCL_14.4_BUG#31213043 Start
    --and a.contract_ref_no = c.contract_ref_no --Bug#31221804
  --and b.version_no = c.version_no --Bug#31221804
  -- OBCL_14.4_BUG#31213043 End
  AND   B.VERSION_NO = (  SELECT MAX(VERSION_NO)
          FROM OLTB_CONTRACT_MASTER
          WHERE CONTRACT_REF_NO = A.CONTRACT_REF_NO)
  --AND   A.COMPONENT_TYPE <> 'H'
        AND     A.COMPONENT_TYPE NOT IN ('H','T')
  --AND   NVL(A.AMOUNT_DUE,0) <> 0--FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-1250
  --AND   A.INFLOW_OUTFLOW <>DECODE(B.PRODUCT_TYPE,'L','O','D','I','C','O','B','I','X')  --13-JUN-2009 FLEXCUBE V.CL Release 7.5 LOT1.1, sighting funds bulk insert fixes, commented
  --09-SEP-2011 Flexcube V.CL Release 7.10, CITIUS Retro,CITIUS-LS#8959 BEGIN
  --AND   A.INFLOW_OUTFLOW <>DECODE(B.PRODUCT_TYPE,'L',DECODE(A.COMPONENT_TYPE,'I','X','O'),'D','I','C','O','B','I','X') --13-JUN-2009 FLEXCUBE V.CL Release 7.5 LOT1.1, sighting funds bulk insert fixes, added
  --AND   A.INFLOW_OUTFLOW <>DECODE(B.PRODUCT_TYPE,'L','O','D','I','C','O','B','I','X') --RETRO for 25733164
  --09-SEP-2011 Flexcube V.CL Release 7.10, CITIUS Retro,CITIUS-LS#8959 END
    --OBCL_14.4_CDI Changes Starts
  AND NOT EXISTS (select 1
      from lftm_product_iccf p
      where p.product=b.PRODUCT
      and p.component=a.component
      and p.allow_reporting_only='Y')
   --OBCL_14.4_CDI Changes Ends
  AND   NOT (B.MODULE = 'OL' AND B.PRODUCT_TYPE = 'C' AND A.COMPONENT = 'PRINCIPAL')--FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION 16-Sep-2009 FLEXCUBE V.CL Release 7.5 lot3 ITR1 SFR#36
  
	AND NOT (B.MODULE = 'OL' AND A.COMPONENT = 'PRINCIPAL' AND A.INFLOW_OUTFLOW = 'O')--OBCL_14.4_SGEN_PAYMENT_ACC_ENTRY_CHANGES 
 
  --OBCL_14.4_LS_Expense_Fee Changes Start           
  AND   nvl(exp_fee_sch,'N')<>'Y'
  --OBCL_14.4_LS_Expense_Fee Changes 
  )   
  GROUP BY CONTRACT_REF_NO,DUE_DATE,CURRENCY_AMT_DUE
)
/
CREATE OR REPLACE SYNONYM olvws_schedule_summary FOR olvw_schedule_summary
/