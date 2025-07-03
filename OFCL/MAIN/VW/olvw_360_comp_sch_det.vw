create or replace view olvw_360_comp_sch_det (
		contract_ref_no,
		branch_code,
       		component,
       		component_ccy,
       		component_type,
       		due_date,
	   	amount_due,	
       		amount_settled,
       		int_rate,
       		emi_amount,
       		accrued_amount,
		adj_amount,
                amt_outstanding)
AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_360_comp_sch_det.VW
**
** Module       : OL										
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2020, Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.

  **Changed By         : Arunadevi Rajendran
  **Date               : 23-Jan-2020
  **Change Description : OBCL_14.4_360CorporateCustomerView
  
  **Changed By         : Aishwarya
  **Date               : 08-Oct-2021
  **Change Description : Added inflow outflow condition
  **Search String      : OBCL_14.5_Support_BUG#33436024
  
  **Changed By         : Jayaram
  **Date               : 29-Jan-2023
  **Change Description : Added condition to exclude 'LB' module while calculating Accrued_amount
  **Search String      : Bug#36204965
  
  Changed By         :Arunprasath
  Changed on         :21-June-2021
  Change Description :Added code to populate amount due details for all components of the LP moduels
  Search string	     :Bug#36742619
  
-----------------------------------------------------------------------------------------------
*/
--OBCL_14.4_360CorporateCustomerView starts
/* (SELECT a.contract_ref_no,
        a.Branch_account_due branch_code,
        a.component,
        a.Currency_amt_due component_ccy,
        a.component_type,
        a.due_date,
        a.amount_due,
        a.amount_settled,
        cast('' as number) int_rate,
        b.amort_amount emi_amount,
        cast('' as number) accrued_amount,
        cast('' as number) adj_amount,
        cast('' as number) amt_outstanding
           FROM oltbs_amount_due a, oltbs_contract_preference b
          WHERE a.contract_ref_no = b.contract_ref_no(+)
            AND component = 'PRINCIPAL'
            AND b.version_no =
               (SELECT MAX(version_no)
                  FROM oltbs_contract_preference d
                 WHERE a.contract_ref_no = d.contract_ref_no))
UNION
(SELECT a.contract_ref_no,
        a.Branch_account_due branch_code,
        a.component,
        a.Currency_amt_due component_ccy,
        a.component_type,
        a.due_date,
        a.amount_due,
        a.amount_settled,
        (SELECT Final_Rate
            FROM Lftb_Contract_Interest        p,
                 Lftb_Contract_Interest_Detail q
           WHERE p.Contract_Reference_No = q.Contract_Ref_No AND
                 p.component = a.COMPONENT AND
                 p.Component = q.Component AND
                 p.Value_Date = q.Value_Date AND
                 p.Contract_Reference_No = A.Contract_Ref_No AND
                 --p.Shown_In_Contract_Main_Screen = 'Y' AND
                 p.Event_Sequence_No =
                 (SELECT MAX(r.Event_Sequence_No)
                    FROM Lftb_Contract_Interest r
                   WHERE r.Contract_Reference_No = A.Contract_Ref_No
                   GROUP BY Contract_Reference_No)) int_rate,
        CAST('' AS NUMBER) emi_amount,
        CASE
           WHEN amount_due <> 0 AND DUE_DATE > C.PREVIOUS_ACCRUAL_TO_DATE THEN
            (c.till_date_accrual - c.total_amount_liquidated)
           ELSE
            amount_due
           END accrued_amount,
  a.adjusted_amount adj_amount,
        CAST('' AS NUMBER) amt_outstanding
      FROM oltbs_amount_due            a,
           oltbs_contract_iccf_details c\*,
           sttms_dates                 e*\
     WHERE a.contract_ref_no = c.contract_ref_no
       AND a.component = c.component
       \*AND a.Branch_account_due = e.branch_code
       and A.due_date < e.today*\
       AND a.component not in ('PRINCIPAL') ) --BUG#29690892
UNION
      (SELECT a.contract_ref_no,
             a.Branch_account_due branch_code,
             a.component,
             a.Currency_amt_due component_ccy,
             a.component_type,
             a.due_date,
             a.amount_due,
             a.amount_settled,
             CAST('' AS NUMBER) int_rate,
             CAST('' AS NUMBER) emi_amount,
             CASE
               WHEN DUE_DATE > C.PREVIOUS_ACCRUAL_TO_DATE THEN
                (c.till_date_accrual - c.total_amount_liquidated)
               ELSE
                AMOUNT_DUE
             END ACCRUED_AMOUNT,
             CAST('' AS NUMBER) adj_amount,
             CAST('' AS NUMBER) amt_outstanding
        FROM oltbs_amount_due          a,
             lftb_contract_fee_details c\*,
             sttms_dates               e*\
       WHERE a.contract_ref_no = c.contract_ref_no
         AND a.component = c.component
         \*AND a.Branch_account_due = e.branch_code
         and A.due_date < e.today*\ )*/ 
(SELECT a.contract_ref_no,
        a.Branch_account_due branch_code,
        a.component,
        a.Currency_amt_due component_ccy,
        a.component_type,
        a.due_date,
        a.amount_due,
        a.amount_settled,
        CASE 
          WHEN a.component_type in ('I','S','N') THEN 
               (SELECT q.Final_Rate
                  FROM Lftb_Contract_Interest        p,
                       Lftb_Contract_Interest_Detail q
                 WHERE p.Contract_Reference_No = q.Contract_Ref_No AND
                       p.component = a.COMPONENT AND
                       p.Component = q.Component AND
                       p.Value_Date = q.Value_Date AND
                       p.Contract_Reference_No = a.Contract_Ref_No AND
                       p.Event_Sequence_No =
                       (SELECT MAX(r.Event_Sequence_No)
                          FROM Lftb_Contract_Interest r
                         WHERE r.Contract_Reference_No = p.Contract_Reference_No)
                       AND p.PICKUP_EVENT_SEQUENCE_NO = p.Event_Sequence_No)
           ELSE cast('' as number) 
        END As  int_rate,
        CASE 
          WHEN a.component_type = 'P' THEN 
             (SELECT b.amort_amount FROM oltbs_contract_preference b 
               WHERE b.contract_ref_no = a.contract_ref_no 
                 AND b.version_no = (SELECT MAX(version_no)
                  FROM oltbs_contract_preference d
                 WHERE a.contract_ref_no = d.contract_ref_no))
          ELSE cast('' as number) 
        END As emi_amount,
        CASE 
          --WHEN a.component_type = 'P' THEN cast('' as number)	--Bug#36204965:Commented
		  WHEN (a.component_type = 'P' or b.module_code = 'LB' ) THEN cast('' as number)	--Bug#36204965:Added
          WHEN (a.component_type in ('I','S','N') AND a.amount_due <> 0 AND a.Due_date > 
               (SELECT C.PREVIOUS_ACCRUAL_TO_DATE 
                       FROM oltbs_contract_iccf_details c 
                       WHERE a.contract_ref_no = c.contract_ref_no
                         AND a.component = c.component
						 )) THEN
               (SELECT d.till_date_accrual - d.total_amount_liquidated 
                  FROM oltbs_contract_iccf_details d 
                 WHERE a.contract_ref_no = d.contract_ref_no
                   AND a.component = d.component) 
          WHEN (a.component_type = 'F' AND a.amount_due <> 0 AND a.Due_date > 
               (SELECT f.PREVIOUS_ACCRUAL_TO_DATE 
                       FROM lftb_contract_fee_details f
                       WHERE a.contract_ref_no = f.contract_ref_no
                         AND a.component = f.component
						 )) THEN
               (SELECT g.till_date_accrual - g.total_amount_liquidated 
                  FROM lftb_contract_fee_details g 
                 WHERE a.contract_ref_no = g.contract_ref_no
                   AND a.component = g.component)
		  ELSE a.amount_due 
        END As  accrued_amount,
        cast('' as number) adj_amount,
        cast('' as number) amt_outstanding
        FROM oltbs_amount_due a, 
		     oltbs_contract b	--Bug#36204965:Added
		--Bug#36742619 starts
		--WHERE a.Inflow_outflow = CASE WHEN a.Component = 'PRINCIPAL' THEN 'I' ELSE a.Inflow_Outflow END --OBCL_14.5_Support_BUG#33436024
		  WHERE a.Inflow_outflow = DECODE(b.module_code,'LP',a.Inflow_Outflow, CASE WHEN a.Component = 'PRINCIPAL' THEN 'I' ELSE a.Inflow_Outflow END)
        --Bug#36742619 End	
		  and a.contract_ref_no = b.contract_ref_no	--Bug#36204965:Added
		)  
UNION
    (SELECT a.contract_ref_no,
        a.txn_branch branch_code,
        a.component,
        a.charge_ccy component_ccy,
        'H' as component_type,
        a.value_date,
        a.charge_amount amount_due,
        a.charge_amount amount_settled,
        cast('' as number) int_rate,
        cast('' as number) emi_amount,
        cast('' as number) accrued_amount,
        cast('' as number) adj_amount,
        cast('' as number) amt_outstanding
        FROM lftb_charge_liqd_master a)
UNION
     (SELECT a.contract_ref_no,
        (SELECT sypks_utils.get_branch(A.CONTRACT_REF_NO) FROM DUAL) branch_code,
        a.rule component,
        a.currency component_ccy,
        'T' as component_type,
        a.value_date,
        a.amount amount_due,
        a.amount amount_settled,
        cast('' as number) int_rate,
        cast('' as number) emi_amount,
        cast('' as number) accrued_amount,
        cast('' as number) adj_amount,
        cast('' as number) amt_outstanding
        FROM TXTBS_TXNRULE_DETAIL a )
--OBCL_14.4_360CorporateCustomerView ends
/
create or replace synonym olvws_360_comp_sch_det for olvw_360_comp_sch_det
/