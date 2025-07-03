CREATE OR REPLACE VIEW olvw_contract_iccf_calc 
AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_contract_iccf_calc.vw
**
** Module       : OL
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2020  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
**
	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
-----------------------------------------------------------------------------------------------

CHANGE HISTORY

    Changed By         : Navoneel Nandan
    Changed On         : 06-AUG-2020
    Change Reason      : Adding Rate Code and Type to interest Details Tab in Payment Details
    Search String      : OBCL_14.4_Int_Dtls
	
-----------------------------------------------------------------------------------------------

    Changed By         : Narendra Dhaker
    Changed On         : 09-OCT-2020
    Change Reason      : Adding details on Payment screen Final rate and Component type Desc 
    Search String      : Bug#31889761
	
	Changed By         : Abhinav Bhasker
    Changed On         : 24-OCT-2020
    Change Reason      : Adding logic to display the Total Interst Amount, Total Simple Interest Amount and Number of Days
					     for penal compnent if END_DATE is NULL in ICCF_CALC Table,i.e. calculation for schedule not completed for Non SOFR comp.
						 BUG#31889761 is also addressed as part of this change done by Abhinav. - Satheesh Seshan/Jithin Mahesh.
    Search String      : Bug#31889761_Calc_Amount
	
    Changed By         : Navoneel Nandan
    Changed On         : 07-SEP-2020
    Change Reason      : Modified the Event Sequence No logic to fetch the latest esn for the contract, component and value date        combination
    Search String      : OBCL_14.4_Int_Dtls_2
	
	**Changed By         : Abhinav Bhasker
	**Date               : 10-FEB-2021
	**Change Description : For RFR Contracts, if Base Computation Method, Spread/Margin Comp Method, Spread
						   Adj Computation Method same, then, showing Rate from ICCF calc table in 
						   OLDTRONL-PAYMENT DETAILS screen Afer Save (Fwd Port: 12.3 Bug#32314477)
	**Search String      : Bug#32430034	
	
	**Changed By         : Abhinav Bhasker
	**Date               : 12-MAR-2021
	**Change Description : Performance issue
	**Search String      : Bug#32546710 
	
	**Changed By         : Mohan Pal
	**Date               : 19-MAR-2021
	**Change Description : Commitment fee schedules calculation details
	**Search String      : Bug#32529321-#5
	**Changed By         : Mohan Pal
	**Date               : 24-May-2021
	**Change Description : 12.3 FWDPORT Bug#32808844
	**Search String      : Bug#32808844
	
	**Changed By         : Mohan Pal
	**Date               : 28-JUN-2021
	**Change Description : Bug#33039536
	**Search String      : Bug#33039536

	**Changed By         : Mohan Pal
	**Date               : 21-Feb-2022
	**Change Description : Bug#33865036 code added to calculate correct amount if there is multiple split for Fixed Penal comp
	**Search String      : Bug#33865036

	**Changed By         : Reghuraj Vadakkedath
    **Changed On         : 03-Mar-2022
    **Change Reason      : Addresed the issue rfr effective rate display
    **Search String      : #33879837	
	
	**Changed By         : Aishwarya Sekar
    **Changed On         : 30-JUL-2022
    **Change Description : Applied based not not showing correctly as per the latest rate revision for penal component. Added code to show the base rate from lftbs_contract_interest.
    **Search String      : OBCL_14.5_support_Bug#34250500
      
  **Changed By          : Mohan Pal
  **Change Description  : Penalty comp record with basis amount as 0 will not come in UI.
  **Search String       : Bug#34403224
  **Changed On          : 21-Jul-2022
  
  **Changed By          : Abhinav Kumar
  **Change Description  : Latest event seq is not getting picked due to use of rownum
  **Search String       : Bug#35851724   FWD Porting Bug#35818062
  **Changed On          : 28-Sep-2023
  
  **Changed By          : Abhik Das
  **Changed On          : 29-Jan-2024
  **Change Description  : Modified to fetch rate code from lftb_contract_interest_detail
                          table to resolve display issue during forward VAMI
                          --fwdport of Bug#36210065
  **Search String       : OBCL_14.7_BNTB_fwdport_Bug#36226284_Changes
  
  **Changed By          : Abhinav Kumar
  **Change Description  : Modified the view to display correct amount if there is multiple split for Penal comp
  **Search String       : Bug#37002977
  **Changed On          : 06-Sep-2024
-----------------------------------------------------------------------------------------------
*/
--Bug#31889761_Calc_Amount Start
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
	--compound_rate 	-- SOFR_balli_Rate_Compound	
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
  FROM oltb_contract_iccf_calc ocic,
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
       ---OBCL_14.7_BNTB_fwdport_Bug#36226284_Changes Starts---
       /*
       case
         when lci.Rate_Type='F' then 'Floating'
         when lci.Rate_Type='S' then 'Special'
         when lci.Rate_Type='X' then 'Fixed'
         else null
        end Rate_Type,
       */
       case
         when lcid.Rate_Type='F' then 'Floating'
         when lcid.Rate_Type='S' then 'Special'
         when lcid.Rate_Type='X' then 'Fixed'
         else null
        end Rate_Type,
       --lci.Rate_Code,
	   lcid.Rate_Code,
	   ----OBCL_14.7_BNTB_fwdport_Bug#36226284_Changes Ends----
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
     --Bug#37002977 Starts --Commented and handled the same in one case
     /*WHEN lci.penalty_type = 'Y' AND  lcid.rate_type = 'X' AND ocic.calculated_amount IS NULL THEN (t.amount_due - (SELECT SUM(NVL(icf.calculated_amount,0)) FROM OLTB_CONTRACT_ICCF_CALC icf WHERE icf.contract_ref_no = ocic.contract_ref_no AND icf.component = ocic.component AND icf.schedule_date = ocic.schedule_date))---Bug#33865036 added--OBCL_14.7_BNTB_fwdport_Bug#36226284_Changes
      WHEN lci.penalty_type = 'Y' AND  lcid.rate_type = 'F' AND lci.rate_revision_method = 'A' AND lcid.rate_code_usage = 'P' AND ocrs.component is NULL AND ocic.calculated_amount IS NULL THEN t.amount_due--OBCL_14.7_BNTB_fwdport_Bug#36226277_Changes
      WHEN lci.penalty_type = 'Y' AND  lcid.rate_type = 'F' AND lci.rate_revision_method = 'A' AND lcid.rate_code_usage = 'P' AND ocrs.component is NOT NULL AND ocic.calculated_amount IS NULL THEN (t.amount_due - (SELECT SUM(NVL(icf.calculated_amount,0)) FROM OLTB_CONTRACT_ICCF_CALC icf WHERE icf.contract_ref_no = ocic.contract_ref_no AND icf.component = ocic.component AND icf.schedule_date = ocic.schedule_date))--OBCL_14.7_BNTB_fwdport_Bug#36226277_Changes*/   
      WHEN lci.penalty_type = 'Y' AND ocic.calculated_amount IS NULL  THEN (t.amount_due - (SELECT SUM(NVL(icf.calculated_amount,0)) FROM OLTB_CONTRACT_ICCF_CALC icf WHERE icf.contract_ref_no = ocic.contract_ref_no AND icf.component = ocic.component AND icf.schedule_date = ocic.schedule_date))
      --Bug#37002977 Ends
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
     CASE --WHEN lci.penalty_type = 'Y' AND  lcid.rate_type = 'X' AND ocic.calculated_amount IS NULL THEN t.amount_due---Bug#33865036 commented
      --Bug#37002977 Starts --Commented and handled the same in one case
      /*WHEN lci.penalty_type = 'Y' AND  lcid.rate_type = 'X' AND ocic.calculated_amount IS NULL THEN (t.amount_due - (SELECT SUM(NVL(icf.calculated_amount,0)) FROM OLTB_CONTRACT_ICCF_CALC icf WHERE icf.contract_ref_no = ocic.contract_ref_no AND icf.component = ocic.component AND icf.schedule_date = ocic.schedule_date))---Bug#33865036 added--OBCL_14.7_BNTB_fwdport_Bug#36226284_Changes
			WHEN lci.penalty_type = 'Y' AND  lcid.rate_type = 'F' AND lci.rate_revision_method = 'A' AND lcid.rate_code_usage = 'P' AND ocrs.component is NULL AND ocic.calculated_amount IS NULL THEN t.amount_due--OBCL_14.7_BNTB_fwdport_Bug#36226277_Changes  
      WHEN lci.penalty_type = 'Y' AND  lcid.rate_type = 'F' AND lci.rate_revision_method = 'A' AND lcid.rate_code_usage = 'P' AND ocrs.component is NOT NULL AND ocic.calculated_amount IS NULL THEN (t.amount_due - (SELECT SUM(NVL(icf.calculated_amount,0)) FROM OLTB_CONTRACT_ICCF_CALC icf WHERE icf.contract_ref_no = ocic.contract_ref_no AND icf.component = ocic.component AND icf.schedule_date = ocic.schedule_date))--OBCL_14.7_BNTB_fwdport_Bug#36226277_Changes */
      WHEN lci.penalty_type = 'Y' AND ocic.calculated_amount IS NULL  THEN (t.amount_due - (SELECT SUM(NVL(icf.calculated_amount,0)) FROM OLTB_CONTRACT_ICCF_CALC icf WHERE icf.contract_ref_no = ocic.contract_ref_no AND icf.component = ocic.component AND icf.schedule_date = ocic.schedule_date))
      --Bug#37002977 Ends
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
  FROM oltb_contract_iccf_calc ocic,
       Oltbs_Amount_Due t,
       Lftbs_Contract_Interest lci,
       lftb_contract_interest_detail lcid, --Bug#31365504
       oltbs_contract oc
	   ,oltb_contract_revision_sch ocrs --Bug#31889761_Calc_Amount
 WHERE ocic.contract_ref_no = t.Contract_Ref_No
   AND ocic.contract_ref_no = oc.Contract_Ref_No
   AND ocic.component = t.Component
   AND ocic.schedule_date = t.due_date
   AND ocic.contract_ref_no = lci.contract_Reference_no
   AND ocic.component = lci.component
   AND NVL(lci.rfr_component,
           'N') = 'N'
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
CREATE OR REPLACE SYNONYM olvws_contract_iccf_calc FOR olvw_contract_iccf_calc 
/
