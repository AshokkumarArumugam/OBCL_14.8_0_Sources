CREATE OR REPLACE VIEW olvw_rfr_vw_cnt_iccf_calc AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_rfr_vw_cnt_iccf_calc.VW
**
** Module       : LOANS and SYNDICATION											
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

  **Changed By          : Jayaram
  **Change Description  : for performance changed the table order in from clause and condition
  **Changed On          : 03-May-2024
  
-----------------------------------------------------------------------------------------------
*/
SELECT contract_ref_no,
  version_no,
  component,
  rate_type,
  rate_code,
  prepayment_penalty_seq_no,
  schedule_date,
  start_date,
  product,
  currency,
  end_date,
  basis_amount,
  rate,
  --no_of_days,
  to_number(no_of_days) no_of_days,------Bug#32808844
  calculated_amount,
  iccf_calc_method,
  daily_average_amount,
  rate_sign,
  int_application,
  compound_interest,
  tax_amount,
  computation_days,
  base_comp_amount,
  sprd_comp_amount,
  mrgn_comp_amount,
  base_rate,
  sprd_rate,
  mrgn_rate,
  total_comp_rate,
  total_simple_rate,
  total_comp_int,
  total_simple_int,
  rate_pickup_date,
  calc_date,
  base_index_rate,
  --Bug#32288814_SOFR_2.0 Start
  --compound_rate   -- SOFR_balli_Rate_Compound
  RFR_EFFEC_RATE,
  RATE_FACTOR,
  ACR,
  UCR,
  NCR,
  PICKEDUP_BASE_RATE, -- 32964826
  ADJUSTMENT_RATE -- 32964826
  --Bug#32288814_SOFR_2.0 End
  ,component_type----Bug#34403224
FROM (
--Bug#31889761_Calc_Amount End
SELECT ocic.contract_ref_no,
       oc.latest_version_no version_no,
       ocic.component,
       case
         when lci.Rate_Type='F' then 'Floating'
         when lci.Rate_Type='S' then 'Special'
         when lci.Rate_Type='X' then 'Fixed'
         else null
        end Rate_Type,
       lci.Rate_Code,
       ocic.prepayment_penalty_seq_no,
       ocic.schedule_date,
       ocic.start_date,
       ocic.product,
       ocic.currency,
       ocic.end_date,
       ocic.basis_amount,
       --Bug#31889761 Starts
       CASE WHEN lci.rfr_base_comp_meth = lci.rfr_marg_comp_meth AND lci.rfr_marg_comp_meth = lci.rfr_spread_adj_comp_meth
       --Bug#32808844 Starts
             and lci.rfr_base_comp_meth ='S'
                     THEN ocic.TOTAL_SIMPLE_RATE
           WHEN lci.rfr_base_comp_meth = lci.rfr_marg_comp_meth AND lci.rfr_marg_comp_meth = lci.rfr_spread_adj_comp_meth
                and lci.rfr_base_comp_meth ='C'
                THEN ocic.TOTAL_COMP_RATE
           ELSE NULL end rate,
      --Bug#32808844 Ends
     --Bug#32430034 START
      --THEN (NVL(ocic.BASE_RATE,0)+NVL(ocic.SPRD_RATE,0)+NVL(ocic.mrgn_rate,0)) ELSE NULL END rate,
    --  THEN ocic.rate ELSE NULL END rate,--Bug#32808844
     --Bug#32430034 END
       --Bug#31889761 Ends
       ocic.no_of_days,
       ocic.calculated_amount,
       ocic.iccf_calc_method,
       ocic.daily_average_amount,
       ocic.rate_sign,
       ocic.int_application,
       ocic.compound_interest,
       ocic.tax_amount,
       ocic.computation_days,
       ocic.base_comp_amount,
       ocic.sprd_comp_amount,
       ocic.mrgn_comp_amount,
       ocic.base_rate,
       /*Bug#31203245 Start*/
       /*(CASE
         --WHEN ocic.base_rate = 0 AND ocic.total_comp_int = 0 THEN ---Bug#32964627 comment
         WHEN ocic.base_rate = 0 AND ocic.total_comp_int = 0 and ocic.calculated_amount=0 THEN ---Bug#32964627
          0
         ELSE
          NVL(sprd_rate,
              0)
       END)*/----SOFR_FIX_JUL21 COMMENT
        sprd_rate,
      /* (CASE
        -- WHEN ocic.base_rate = 0 AND ocic.total_comp_int = 0 THEN ---Bug#32964627 comment
        WHEN ocic.base_rate = 0 AND ocic.total_comp_int = 0  and ocic.calculated_amount=0  THEN ---Bug#32964627
          0
         ELSE
          NVL(mrgn_rate,
              0)
       END)*/----SOFR_FIX_JUL21 COMMENT
        mrgn_rate,
       /*Bug#31203245 end*/
       ocic.total_comp_rate,
       ocic.total_simple_rate,
       ocic.total_comp_int,
       ocic.total_simple_int,
       ocic.rate_pickup_date,
       ocic.calc_date,
       ocic.BASE_INDEX_RATE -- SOFR_balli_Rate_Compounding_20_Aug changes
     --Bug#32288814_SOFR_2.0 Start
     --,ocic.COMPOUND_RATE -- SOFR_balli_Rate_Compound
     -- ,RFR_EFFEC_RATE,  -- #33879837 commended and added below case
    ,(CASE when lci.rfr_rate_compounding = 'N'  THEN
     0 ELSE RFR_EFFEC_RATE end ) RFR_EFFEC_RATE,
     RATE_FACTOR,
     ACR,
     UCR,
     NCR,
  PICKEDUP_BASE_RATE,-- 32964826
  ocic.ADJUSTMENT_RATE-- 32964826
     --Bug#32288814_SOFR_2.0 End
     ,t.component_type----Bug#34403224
  FROM OLVW_TMP_RFR_QRY_ICCF_CALC ocic,
       Oltbs_Amount_Due t,
       Lftbs_Contract_Interest lci,
       oltbs_contract oc
 WHERE ocic.contract_ref_no = t.Contract_Ref_No
   AND ocic.contract_ref_no = oc.Contract_Ref_No
   AND ocic.component = t.Component
   AND ocic.schedule_date = t.due_date
   AND ocic.contract_ref_no = lci.contract_Reference_no
   AND ocic.component = lci.component
   AND NVL(lci.rfr_component,
           'N') = 'Y'
   --OBCL_14.4_Int_Dtls_2 changes starts
   --AND lci.event_sequence_no = 1
   /* --Bug#32546710
AND lci.event_sequence_no IN (select max(a.event_sequence_no)
                 from Lftbs_Contract_Interest a
                where a.contract_Reference_no = lci.contract_Reference_no
                  and a.component = lci.component
                  and a.VALUE_DATE <= ocic.start_date)
          */ --Bug#32546710
  --Bug#35851724  Start  --Commented below code and used fetch first 1 rows only
  --Bug#32546710  Start
  /*AND lci.event_sequence_no = (
         SELECT event_sequence_no
         FROM
         (
           SELECT ROWNUM rn, a.event_sequence_no
           FROM lftbs_contract_interest a
           WHERE a.contract_Reference_no = lci.contract_Reference_no
           AND a.component = lci.component
           AND a.value_date <= ocic.start_date
           ORDER BY 2 DESC
         )
         WHERE rn = 1
         )*/
  --Bug#32546710  End
  AND lci.event_sequence_no =
         (
           SELECT a.event_sequence_no
           FROM lftbs_contract_interest a
           WHERE a.contract_reference_no = lci.contract_Reference_no
           AND a.component = lci.component
           and a.value_date <= ocic.start_date
           ORDER BY 1 DESC
           fetch first 1 rows only
         )
  --Bug#35851724  End
           --OBCL_14.4_Int_Dtls_2 changes ends
UNION ALL
/*Non-SOFR Component*/
SELECT DISTINCT ocic.contract_ref_no,
       oc.latest_version_no version_no,
       ocic.component,
       case
         when lci.Rate_Type='F' then 'Floating'
         when lci.Rate_Type='S' then 'Special'
         when lci.Rate_Type='X' then 'Fixed'
         else null
        end Rate_Type,
       lci.Rate_Code,
       ocic.prepayment_penalty_seq_no,
       ocic.schedule_date,
       ocic.start_date,
       ocic.product,
       ocic.currency,
       ocic.end_date,
       ocic.basis_amount,
       ocic.rate,
     --Bug#31889761_Calc_Amount Start
       --ocic.no_of_days,
     NVL(ocic.no_of_days, Global.application_date-ocic.start_date) no_of_days,
       --ocic.calculated_amount,
     CASE
      --WHEN lci.penalty_type = 'Y' AND  lci.rate_type = 'X' AND ocic.calculated_amount IS NULL THEN t.amount_due---Bug#33865036 commented
     WHEN lci.penalty_type = 'Y' AND  lci.rate_type = 'X' AND ocic.calculated_amount IS NULL THEN (t.amount_due - (SELECT SUM(NVL(icf.calculated_amount,0)) FROM OLVW_TMP_RFR_QRY_ICCF_CALC icf WHERE icf.contract_ref_no = ocic.contract_ref_no AND icf.component = ocic.component AND icf.schedule_date = ocic.schedule_date))---Bug#33865036 added
      WHEN lci.penalty_type = 'Y' AND  lci.rate_type = 'F' AND lci.rate_revision_method = 'A' AND lci.rate_code_usage = 'P' AND ocrs.component is NULL AND ocic.calculated_amount IS NULL THEN t.amount_due
      WHEN lci.penalty_type = 'Y' AND  lci.rate_type = 'F' AND lci.rate_revision_method = 'A' AND lci.rate_code_usage = 'P' AND ocrs.component is NOT NULL AND ocic.calculated_amount IS NULL THEN (t.amount_due - (SELECT SUM(NVL(icf.calculated_amount,0)) FROM OLVW_TMP_RFR_QRY_ICCF_CALC icf WHERE icf.contract_ref_no = ocic.contract_ref_no AND icf.component = ocic.component AND icf.schedule_date = ocic.schedule_date))
      ELSE ocic.calculated_amount
     END calculated_amount,
     --Bug#31889761_Calc_Amount End
       ocic.iccf_calc_method,
       ocic.daily_average_amount,
       ocic.rate_sign,
       ocic.int_application,
       ocic.basis_amount, --Bug#31204455
       ocic.tax_amount,
       ocic.computation_days,
       ocic.base_comp_amount,
       ocic.sprd_comp_amount,
       ocic.mrgn_comp_amount,
     --OBCL_14.5_support_Bug#34250500 Start
       --lcid.base_rate, --Bug#31204455--Bug#31365504
     (CASE WHEN t.component_type = 'N' AND lci.rate_type = 'F' THEN lci.rate
             ELSE lcid.base_rate
        END) base_rate,
    --OBCL_14.5_support_Bug#34250500 End
       lcid.spread, --Bug#31204455--Bug#31365504
       NVL(mrgn_rate,
           0) mrgn_rate,
       ocic.total_comp_rate,
       ocic.total_simple_rate,
       0 /*ocic.total_comp_int*/, --Bug#31204455
     --Bug#31889761_Calc_Amount Start
       --ocic.calculated_amount, --Bug#31204455
     CASE --WHEN lci.penalty_type = 'Y' AND  lci.rate_type = 'X' AND ocic.calculated_amount IS NULL THEN t.amount_due---Bug#33865036 commented
      WHEN lci.penalty_type = 'Y' AND  lci.rate_type = 'X' AND ocic.calculated_amount IS NULL THEN (t.amount_due - (SELECT SUM(NVL(icf.calculated_amount,0)) FROM OLVW_TMP_RFR_QRY_ICCF_CALC icf WHERE icf.contract_ref_no = ocic.contract_ref_no AND icf.component = ocic.component AND icf.schedule_date = ocic.schedule_date))---Bug#33865036 added
      WHEN lci.penalty_type = 'Y' AND  lci.rate_type = 'F' AND lci.rate_revision_method = 'A' AND lci.rate_code_usage = 'P' AND ocrs.component is NULL AND ocic.calculated_amount IS NULL THEN t.amount_due
      WHEN lci.penalty_type = 'Y' AND  lci.rate_type = 'F' AND lci.rate_revision_method = 'A' AND lci.rate_code_usage = 'P' AND ocrs.component is NOT NULL AND ocic.calculated_amount IS NULL THEN (t.amount_due - (SELECT SUM(NVL(icf.calculated_amount,0)) FROM OLVW_TMP_RFR_QRY_ICCF_CALC icf WHERE icf.contract_ref_no = ocic.contract_ref_no AND icf.component = ocic.component AND icf.schedule_date = ocic.schedule_date))
      ELSE ocic.calculated_amount
     END calculated_amount,
     --Bug#31889761_Calc_Amount End
       ocic.rate_pickup_date,
       ocic.calc_date,
       ocic.BASE_INDEX_RATE -- SOFR_balli_Rate_Compounding_20_Aug changes
     --Bug#32288814_SOFR_2.0 Start
     --,ocic.COMPOUND_RATE -- SOFR_balli_Rate_Compound
     -- ,RFR_EFFEC_RATE,  -- #33879837 commended and added below case
    ,(CASE when lci.rfr_rate_compounding = 'N'  THEN
     0 ELSE RFR_EFFEC_RATE end ) RFR_EFFEC_RATE,
     RATE_FACTOR,
     ACR,
     UCR,
     NCR,
  PICKEDUP_BASE_RATE,-- 32964826
  ocic.ADJUSTMENT_RATE-- 32964826
     --Bug#32288814_SOFR_2.0 End
     ,t.component_type----Bug#34403224
    FROM Lftbs_Contract_Interest lci,
		 OLVW_TMP_RFR_QRY_ICCF_CALC ocic,
		 Oltbs_Amount_Due t,
		 oltbs_contract oc,  
		 lftb_contract_interest_detail lcid,        
		 oltb_contract_revision_sch ocrs --Bug#31889761_Calc_Amount
 WHERE NVL(lci.rfr_component,'N') = 'N'
   AND ocic.contract_ref_no = t.Contract_Ref_No
   AND ocic.contract_ref_no = oc.Contract_Ref_No
   AND ocic.component = t.Component
   AND ocic.schedule_date = t.due_date
   AND ocic.contract_ref_no = lci.contract_Reference_no
   AND ocic.component = lci.component
   --OBCL_14.4_Int_Dtls_2 changes starts
   --AND lci.event_sequence_no = 1
   /* --Bug#32546710
AND lci.event_sequence_no IN (select max(a.event_sequence_no)
                 from Lftbs_Contract_Interest a
                where a.contract_Reference_no = lci.contract_Reference_no
                  and a.component = lci.component
                  and a.VALUE_DATE <= ocic.start_date)
      */ --Bug#32546710
  --Bug#35851724  Start  --Commented below code and used fetch first 1 rows only
  --Bug#32546710  Start
  /*AND lci.event_sequence_no = (
         SELECT event_sequence_no
         FROM
         (
           SELECT ROWNUM rn, a.event_sequence_no
           FROM lftbs_contract_interest a
           WHERE a.contract_reference_no = lci.contract_Reference_no
           AND a.component = lci.component
           and a.value_date <= ocic.start_date
           ORDER BY 2 DESC
         )
         WHERE rn = 1
         )*/
  --Bug#32546710  End
  AND lci.event_sequence_no =
         (
           SELECT a.event_sequence_no
           FROM lftbs_contract_interest a
           WHERE a.contract_reference_no = lci.contract_Reference_no
           AND a.component = lci.component
           and a.value_date <= ocic.start_date
           ORDER BY 1 DESC
           fetch first 1 rows only
         )
  --Bug#35851724  End
           --OBCL_14.4_Int_Dtls_2 changes ends
   AND ocic.contract_ref_no = lcid.contract_Ref_no
   AND ocic.component = lcid.component
      --Bug#31365504 start
   AND lcid.value_date IN (SELECT MAX(lcid01.Value_Date)
                             FROM lftb_contract_interest_detail lcid01
                            WHERE lcid01.Contract_Ref_No = ocic.contract_ref_no
                              AND lcid01.Component = ocic.component
                              AND lcid01.Value_Date <= ocic.start_date)
--Bug#31365504 end
--Bug#31889761_Calc_Amount START
  AND lci.contract_Reference_no  = ocrs.contract_Ref_no (+)
  AND lci.component  = ocrs.component (+)
   --Bug#32529321-#5 starts
  UNION ALL
  SELECT ocic.contract_ref_no,
       oc.latest_version_no version_no,
       ocic.component,
       'Fee' Rate_Type,
       null Rate_Code,
       null prepayment_penalty_seq_no,
       ocic.schedule_date schedule_date,
       ocic.start_date start_date,
       oc.product_code product,
       ocic.component_ccy currency,
       ocic.end_date end_date,
       ocic.basis_amount basis_amount,
       rate,
       ocic.no_of_days no_of_days,
       ocic.calculated_amount calculated_amount,
       TO_CHAR(ocic.iccf_calc_method) iccf_calc_method,
       ocic.daily_average_amount daily_average_amount,
       null rate_sign,
       null int_application,
       OCIC.BASIS_AMOUNT compound_interest,
       null tax_amount,
       null computation_days,
       null base_comp_amount,
       null sprd_comp_amount,
       null mrgn_comp_amount,
       rate base_rate,
       null sprd_rate,
       null mrgn_rate,
       null total_comp_rate,
       null total_simple_rate,
       null total_comp_int,
       ocic.calculated_amount total_simple_int,
       null rate_pickup_date,
       null calc_date,
       null BASE_INDEX_RATE ,
       null RFR_EFFEC_RATE,
       null RATE_FACTOR,
       null ACR,
       null UCR,
       null NCR,
  null PICKEDUP_BASE_RATE,-- 32964826
  null ADJUSTMENT_RATE-- 32964826
  ,t.component_type----Bug#34403224
  FROM lftb_contract_fee_calc ocic,
       Oltbs_Amount_Due t,
       oltbs_contract oc
 WHERE ocic.contract_ref_no = t.Contract_Ref_No
   AND ocic.contract_ref_no = oc.Contract_Ref_No
   AND ocic.component = t.Component
   AND ocic.schedule_date = t.due_date
  --Bug#32529321-#5 ends
)
WHERE no_of_days <> 0
AND 1=(case when component_type='N' and nvl(compound_interest,0) = 0 then----compound int col is basis amt in UI
         0
         else 1 end)---Bug#34403224
--Bug#31889761_Calc_Amount End
---order by start_date --Bug#32799326---Bug#33040217_14 commented
ORDER BY CONTRACT_REF_NO, COMPONENT,SCHEDULE_DATE, START_DATE---Bug#33040217_14 added
/
CREATE OR REPLACE SYNONYM olvws_rfr_vw_cnt_iccf_calc FOR olvw_rfr_vw_cnt_iccf_calc
/