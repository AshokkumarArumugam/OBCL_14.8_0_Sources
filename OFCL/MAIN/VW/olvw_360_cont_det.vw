CREATE OR REPLACE force VIEW olvw_360_cont_det AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_360_cont_det.vw
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
  **Created By         : Arunadevi Rajendran
  **Date               : 18-Jan-2020
  **Change Description : Corporate customer view
  
  **Created By         : Rashmi B V
  **Date               : 26-Oct-2023
  **Change Description : Added NVL since the Facility Outstanding amount was going null when there are 
						 no Tranches under that Facility
  **Search String      : Bug#35922417_1
  
  **Created By         : Arunprasath
  **Date               : 21-June-2023
  **Change Description : Participant contract details included
  **Search String      : Bug#36742619

*/
(SELECT A.contract_ref_no,
        A.Branch,
        A.Counterparty,
        A.Product,
        CASE 
         WHEN (A.product_type in ('L','C') AND A.module = 'OL') THEN A.Booking_date
         WHEN (A.product_type ='C' AND A.module = 'LB') THEN
              (SELECT t.booking_date 
                FROM oltb_contract_master t
               WHERE t.product_type = 'C' 
                 AND t.contract_ref_no = A.contract_ref_no
                 AND t.version_no = (SELECT Min(b.version_no) 
                                       FROM oltb_contract_master b 
                                      WHERE b.contract_ref_no = t.contract_ref_no))
         WHEN (A.product_type ='L' AND A.module = 'LB') THEN
              (SELECT d.booking_date 
                FROM LBTBS_DRAWDOWN_SCHEDULE d 
               WHERE d.DRAWDOWN_REF_NO = A.Contract_Ref_No 
                 AND d.version_no = (SELECT Min(b.version_no) 
                                       FROM LBTBS_DRAWDOWN_SCHEDULE b 
                                      WHERE b.DRAWDOWN_REF_NO = d.DRAWDOWN_REF_NO))
         ELSE A.Booking_date
         END Booking_date,
        A.Value_date,
        A.Maturity_date,
        A.Contract_status,
        A.User_defined_status,
        A.CURRENCY,
        A.Amount,
        A.Product_type,
       (SELECT PRODUCT_DESCRIPTION FROM OLTM_PRODUCT WHERE product_code = A.Product AND RECORD_STAT = 'O' AND ONCE_AUTH = 'Y') product_desc,
        A.Module,
       (SELECT LATEST_EVENT_SEQ_NO FROM OLTB_CONTRACT WHERE Contract_Ref_No = A.Contract_Ref_No) event_seq_no,
        A.version_no,
        A.amount_financed,
        CASE
         WHEN (A.product_type in ('L','C') AND A.module = 'OL') THEN
              (SELECT Principal_Outstanding_Bal FROM Oltbs_Contract_Balance WHERE Contract_Ref_No = A.Contract_Ref_No) 
         WHEN (A.product_type ='C' AND A.module = 'LB') THEN
              (SELECT vd.closing_balance
                FROM lbtbs_tranche_vdbal_master vd 
               WHERE vd.contract_ref_no = A.Contract_Ref_No
                 AND vd.balance_type = 'AVAILABLE' 
                 AND vd.value_date = (SELECT Max(value_date) 
                                     FROM lbtbs_tranche_vdbal_master 
                                    WHERE contract_ref_no = A.Contract_Ref_No 
                                      AND balance_type = vd.balance_type 
                                      AND value_date <= (SELECT latest_event_date 
                                                           FROM oltbs_contract 
                                                          WHERE contract_ref_no = A.Contract_Ref_No)))
         WHEN (A.product_type ='L' AND A.module = 'LB') THEN
              (SELECT dd.closing_balance 
                FROM lbtbs_tranche_vdbal_detail dd
                 WHERE dd.drawdown_ref_no = A.Contract_Ref_No
                   AND dd.balance_type = 'OUTSTANDING'
                   AND dd.value_date =
                       (SELECT MAX(value_date)
                          FROM lbtbs_tranche_vdbal_detail
                         WHERE drawdown_ref_no = A.Contract_Ref_No
                           AND drawdown_ref_no = dd.drawdown_ref_no
                           AND balance_type = dd.balance_type 
                           AND value_date <= global.application_date))
         ELSE CAST('' AS NUMBER)
         END Princ_Outstanding,
        (SELECT Final_Rate
                  FROM Lftb_Contract_Interest        p,
                       Lftb_Contract_Interest_Detail q
                 WHERE p.Contract_Reference_No = q.Contract_Ref_No AND
                       p.Component = q.Component AND
                       p.Value_Date = q.Value_Date AND
                       p.Contract_Reference_No = A.Contract_Ref_No AND
                       p.Shown_In_Contract_Main_Screen = 'Y' AND
                       p.Event_Sequence_No =
                       (SELECT MAX(r.Event_Sequence_No)
                          FROM Lftb_Contract_Interest r
                         WHERE r.Contract_Reference_No = A.Contract_Ref_No
                         GROUP BY Contract_Reference_No)) Interest_Rate
FROM OLTB_CONTRACT_MASTER A
WHERE A.Contract_status in ('A','L','V')
AND A.MODULE IN ('OL','LB')
AND version_no = (SELECT MAX(version_no) FROM OLTB_CONTRACT_MASTER WHERE contract_ref_no = A.contract_ref_no)
----Product Access restriction - Start
and exists (Select 1
	 From OLVW_USER_ACCESS_PRODUCTS
	 Where PRODUCT_CODE = a.product --OBCL_14.8_CE_Length_Changes
   AND USER_ID = global.user_id)
--Product Access restriction - End
UNION
SELECT B.contract_ref_no,
        B.Branch_code Branch,
        B.Counterparty,
        C.product_code product,
        B.Facility_start_date Booking_date,
        B.Facility_start_date Value_date,
        B.Facility_end_date Maturity_date,
        C.contract_status,
        B.User_defined_status,
        B.CURRENCY,
        B.Amount,
        C.product_type,
       (SELECT PRODUCT_DESCRIPTION FROM OLTM_PRODUCT WHERE product_code = C.Product_code AND RECORD_STAT = 'O' AND ONCE_AUTH = 'Y') product_desc,
        C.module_code module,
        C.LATEST_EVENT_SEQ_NO event_seq_no,
        B.version_no,
        B.amount amount_financed,
        --(B.Amount - (SELECT Sum(Lm.amount) --Bug#35922417_1 Commented
		(B.Amount - NVL((SELECT Sum(Lm.amount) --Bug#35922417_1   Added NVL
          FROM   oltbs_contract_master Lm, 
                 oltbs_contract Cc 
          WHERE  Lm.syndication_ref_no = B.contract_ref_no 
                 AND Cc.contract_status NOT IN ( 'V', 'L' ) 
                 AND Nvl(Cc.template_status, 'N') <> 'Y' 
                 AND Cc.product_type = 'C' 
                 AND Lm.module = 'LB' 
                 AND Lm.contract_ref_no = Cc.contract_ref_no 
                 AND Lm.version_no = Cc.latest_version_no 
          --GROUP  BY Lm.syndication_ref_no)) Princ_Outstanding, --Bug#35922417_1 Commented
		  GROUP  BY Lm.syndication_ref_no),0)) Princ_Outstanding, --Bug#35922417_1   Added NVL
        0 Interest_Rate
FROM lbtbs_syndication_master B, oltb_contract C
WHERE C.Contract_status in ('A','L','V')
AND B.contract_ref_no = C.contract_ref_no
AND B.version_no = C.latest_version_no
----Product Access restriction - Start
and exists (Select 1
	 From OLVW_USER_ACCESS_PRODUCTS
	 Where PRODUCT_CODE = c.product_code --OBCL_14.8_CE_Length_Changes
   AND USER_ID = global.user_id)
--Product Access restriction - End

--Bug#36742619 Start
UNION 
SELECT A.contract_ref_no,
        A.branch_code Branch,
        A.Counterparty,
        A.product_code Product,
        A.Booking_date,
        A.Value_date,
        A.Maturity_date,
        B.Contract_status,
        B.User_defined_status,
        a.currency,
        A.Amount,
        A.Product_type,
       (SELECT PRODUCT_DESCRIPTION FROM OLTM_PRODUCT WHERE product_code = A.Product_code AND RECORD_STAT = 'O' AND ONCE_AUTH = 'Y') product_desc,
        b.module_code module,
        b.latest_event_seq_no  event_seq_no,
        A.version_no,
        NULL amount_financed,
       CASE
          WHEN A.product_type ='T' THEN
              (SELECT vd.closing_bal
                FROM lbtbs_part_vdbal_master vd 
               WHERE vd.contract_ref_no = A.borrower_tranche_ref_no
                 AND vd.Counterparty = A.Counterparty
                 AND vd.balance_type = 'AVAILABLE' 
                 AND vd.value_date = (SELECT MAX(value_date) 
                                     FROM lbtbs_part_vdbal_master 
                                    WHERE contract_ref_no = A.borrower_tranche_ref_no
                                      AND Counterparty = A.Counterparty
                                      AND balance_type = vd.balance_type 
                                      AND value_date <= (SELECT latest_event_date 
                                                           FROM oltbs_contract 
                                                          WHERE contract_ref_no = A.borrower_tranche_ref_no)))
         WHEN A.product_type ='D'  THEN
              (SELECT dd.closing_bal
                FROM lbtbs_part_vdbal_detail dd
                 WHERE dd.drawdown_ref_no = A.borrower_contract_ref_no
                   AND dd.Counterparty = A.Counterparty
                   AND dd.balance_type = 'OUTSTANDING'
                   AND dd.value_date =
                       (SELECT MAX(value_date)
                          FROM lbtbs_part_vdbal_detail
                         WHERE drawdown_ref_no =  A.borrower_contract_ref_no
                           AND drawdown_ref_no = dd.drawdown_ref_no
                           AND Counterparty = dd.Counterparty
                           AND balance_type = dd.balance_type 
                           AND value_date <= global.application_date))
         ELSE CAST('' AS NUMBER)
         END Princ_Outstanding,
        (SELECT Final_Rate
                  FROM Lftb_Contract_Interest        p,
                       Lftb_Contract_Interest_Detail q
                 WHERE p.Contract_Reference_No = q.Contract_Ref_No AND
                       p.Component = q.Component AND
                       p.Value_Date = q.Value_Date AND
                       p.Contract_Reference_No = A.borrower_contract_ref_no AND
                       p.Shown_In_Contract_Main_Screen = 'Y' AND
                       p.Event_Sequence_No =
                       (SELECT MAX(r.Event_Sequence_No)
                          FROM Lftb_Contract_Interest r
                         WHERE r.Contract_Reference_No = A.borrower_contract_ref_no
                         GROUP BY Contract_Reference_No)) Interest_Rate
FROM lptb_contract_master A, oltb_contract B
WHERE a.contract_ref_no = b.contract_ref_no
AND B.Contract_status in ('A','L','V')
AND B.module_code IN ('LP')
AND A.version_no = b.latest_version_no
AND EXISTS (SELECT 1
	 FROM olvw_user_access_products
	 WHERE product_code = a.product_code
   AND user_id = global.user_id)
 --36742619 End
)
/
create or replace synonym olvws_360_cont_det for olvw_360_cont_det 
/