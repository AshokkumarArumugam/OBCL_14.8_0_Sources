create or replace view olvw_360_comp_details as
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_360_comp_details.vw
**
** Module       : OL										
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2020, Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
  Changed By         :Mohan Pal
  Changed on         :29-Sep-2021
  Change Description :Added code to correct branch and exclude outflow record
  Search string	     :Bug#33390439
  
  Changed By         :Arunprasath
  Changed on         :21-June-2021
  Change Description :Added code to populate amount due details for all components of the LP moduels
  Search string	     :Bug#36742619
  
-----------------------------------------------------------------------------------------------
*/
SELECT a.contract_ref_no,
             --a.branch_account_due branch,---Bug#33390439 commented
               (SELECT sypks_utils.get_branch(A.CONTRACT_REF_NO) FROM DUAL) branch,---Bug#33390439
               a.component,
               (SELECT SUM(NVL(e.amount_due, 0) - NVL(e.amount_settled, 0))
                  --Bug#36742619 Start
				  --FROM OLTB_AMOUNT_DUE e, STTMS_DATES g
				    FROM OLTB_AMOUNT_DUE e, STTMS_DATES g, oltb_contract o
				  --Bug#36742619 End
                 WHERE (SELECT sypks_utils.get_branch(E.CONTRACT_REF_NO) FROM DUAL) = g.branch_code
                   AND e.due_date >= g.today
				   --Bug#36742619 Start
                   AND a.contract_ref_no = o.contract_ref_no 
				   --Bug#36742619 End
                   AND e.contract_ref_no = a.contract_ref_no
                   AND e.component = a.component
                   --Bug#36742619 Start
				   --AND Inflow_outflow = CASE WHEN Component = 'PRINCIPAL' THEN 'I' ELSE Inflow_Outflow END---Bug#33390439
                   AND Inflow_outflow = DECODE (o.module_code, 'LP', Inflow_Outflow, CASE WHEN  Component = 'PRINCIPAL' THEN 'I' ELSE Inflow_Outflow END)---Bug#33390439
				   --Bug#36742619 End
                 GROUP BY e.contract_ref_no, e.component) expected,
               (SELECT SUM(NVL(d.amount_due, 0) - NVL(d.amount_settled, 0))
                  --Bug#36742619 Start
                  --FROM OLTB_AMOUNT_DUE d, STTMS_DATES h
				   FROM OLTB_AMOUNT_DUE d, STTMS_DATES h, oltb_contract o
				   --Bug#36742619 End
                 WHERE (SELECT sypks_utils.get_branch(D.CONTRACT_REF_NO) FROM DUAL) = h.branch_code
                   AND d.due_date < h.today
				   --Bug#36742619 Starts
                   AND d.contract_ref_no = o.contract_ref_no 
				    --Bug#36742619 End
                   AND d.contract_ref_no = a.contract_ref_no
                   AND d.component = a.component
                   --Bug#36742619 Start
				   --AND Inflow_outflow = CASE WHEN  Component = 'PRINCIPAL' THEN 'I' ELSE Inflow_Outflow END---Bug#33390439
				   AND Inflow_outflow = DECODE (o.module_code, 'LP', Inflow_Outflow, CASE WHEN  Component = 'PRINCIPAL' THEN 'I' ELSE Inflow_Outflow END)---Bug#33390439
                 --Bug#36742619 End
                 GROUP BY d.contract_ref_no, d.component) overdue,
               (SELECT NVL(SUM(c.amount_settled), 0)
                  --Bug#36742619 Start
				   --FROM OLTB_AMOUNT_DUE c, STTMS_DATES i
                   FROM OLTB_AMOUNT_DUE c, STTMS_DATES i,  oltb_contract o
				  --Bug#36742619 End
                 WHERE (SELECT sypks_utils.get_branch(C.CONTRACT_REF_NO) FROM DUAL) = i.branch_code
                   AND c.due_date > i.today
				   --Bug#36742619 starts
                   AND c.contract_ref_no = o.contract_ref_no 
				   --Bug#36742619 End
                   AND c.contract_ref_no = a.contract_ref_no
                   AND c.component = a.component
                   --Bug#36742619 Start
				   --AND Inflow_outflow = CASE WHEN  Component = 'PRINCIPAL' THEN 'I' ELSE Inflow_Outflow END---Bug#33390439
                   AND Inflow_outflow = DECODE (o.module_code, 'LP', Inflow_Outflow, CASE WHEN  Component = 'PRINCIPAL' THEN 'I' ELSE Inflow_Outflow END)---Bug#33390439
                  --Bug#36742619 Start
                 GROUP BY c.contract_ref_no,
                          c.component,
                        --c.Branch_account_due,---Bug#33390439 commented
                          c.CURRENCY_AMT_DUE) advance,
               (SELECT SUM(NVL(f.amount_due, 0) - NVL(f.amount_settled, 0))
                  --Bug#36742619 starts
				  --FROM OLTB_AMOUNT_DUE f
				  FROM OLTB_AMOUNT_DUE f, oltb_contract o
				  --Bug#36742619 End
                 WHERE f.contract_ref_no = a.contract_ref_no
				 --Bug#36742619 starts
                   AND f.contract_ref_no = o.contract_ref_no 
				    --Bug#36742619 End
                   AND f.component = a.component
                -- AND f.branch_account_due = a.branch_account_due---Bug#33390439 commented
                   AND f.currency_amt_due = a.currency_amt_due
                   --Bug#36742619 Start
				  -- AND Inflow_outflow =  CASE WHEN  Component = 'PRINCIPAL' THEN 'I' ELSE Inflow_Outflow END---Bug#33390439
				   AND Inflow_outflow = DECODE (o.module_code, 'LP', Inflow_Outflow, CASE WHEN  Component = 'PRINCIPAL' THEN 'I' ELSE Inflow_Outflow END)---Bug#33390439
                 --Bug#36742619 Start
                 GROUP BY f.contract_ref_no,
                          f.component,
                        --f.Branch_account_due,---Bug#33390439 commented
                          f.CURRENCY_AMT_DUE) outstanding,
               a.CURRENCY_AMT_DUE component_ccy,
               CAST('' AS NUMBER) lst_intrate,
               CAST('' AS NUMBER) overduedays,
               a.component_type
          --Bug#36742619 Start
		  --FROM OLTB_AMOUNT_DUE a
		  FROM OLTB_AMOUNT_DUE a, oltb_contract b
		  WHERE a.contract_ref_no = b.contract_ref_no
		  --AND Inflow_outflow =  CASE WHEN Component = 'PRINCIPAL' THEN 'I' ELSE Inflow_Outflow END)---Bug#33390439
          AND Inflow_outflow = decode(b.module_code, 'LP', Inflow_outflow, CASE WHEN Component = 'PRINCIPAL' THEN 'I' ELSE Inflow_Outflow END)---Bug#33390439
          --Bug#36742619 End
         GROUP BY a.contract_ref_no,
                  --a.Branch_account_due,---Bug#33390439 commented
                  sypks_utils.get_branch(A.CONTRACT_REF_NO),---Bug#33390439
                  a.component,
                  a.CURRENCY_AMT_DUE,
		  a.component_type
/
create or replace synonym olvws_360_comp_details for olvw_360_comp_details
/