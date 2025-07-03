CREATE OR REPLACE FORCE VIEW lbvw_borr_prod_vdutil
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lbvw_borr_prod_vdutil.VW
**
** Module	: Syndication Loans and Commitments
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
----------------------------------------------------------------------------------------------------------------------
*/
/*----------------------------------------------------------------------------------------------
Change History 
04-FEB-2008 FLEXCUBE V.CL Release 7.4 BAU-Lot1, Sublimits changes
	    Created new view lbvw_borr_prod_vdutil
04-MAR-2008 FLEXCUBE V.CL Release 7.4 BAU-Lot1, Sublimits changes	
            For the Drawdowns with rollover instruction captured,
            the rollover product and rollover amount will be considered
            while arriving at the utilized amount.
15-Jun-2011 FLEXCUBE V.CL Release 7.9 VOL2 FS Tag 11 changes,added for LC sublimit functionality of agency,Included LC_Issuer           
----------------------------------------------------------------------------------------------------
*/
SELECT 	b.TRANCHE_REF_NO,
	b.DRAWDOWN_REF_NO,
	a.COUNTERPARTY BORROWER,
	decode(nvl(a.lc_drawdown,'N'),'Y','LC',decode(nvl(a.swing_line,'N'),'Y','SL','AL')) LIMIT_TYPE,
	a.PRODUCT,
	b.CLOSING_BALANCE UTILIZED_AMT,
	b.DRAWDOWN_CCY CCY_CODE,
	b.VALUE_DATE UTIL_DATE,
	b.tranche_ccy_closing_bal,
	a.lc_issuer --15-Jun-2011 FLEXCUBE V.CL Release 7.9 VOL2 FS Tag 11 changes
  FROM	oltbs_contract_master a,
	lbtbs_tranche_vdbal_detail b
 WHERE	a.contract_ref_no = b.drawdown_ref_no
   AND	a.version_no = (SELECT latest_version_no
			  FROM oltbs_contract
			 WHERE contract_ref_no = a.contract_ref_no)
   AND	a.product_type = 'L'
   AND	b.balance_type = (SELECT decode(revolving_commitment,'Y','OUTSTANDING','N','UTILIZED')
                            FROM oltbs_contract_preference
                           WHERE contract_ref_no = a.tranche_ref_no
                             AND version_no = (SELECT latest_version_no
                             			 FROM oltbs_contract
                             			WHERE contract_ref_no = a.tranche_ref_no))
   AND	b.value_date = (SELECT max(value_date)
                          FROM lbtbs_tranche_vdbal_detail
                         WHERE tranche_ref_no = b.tranche_ref_no
                           AND drawdown_ref_no  = b.drawdown_ref_no
                           AND balance_type = b.balance_type)
-- 04-MAR-2008 FLEXCUBE V.CL Release 7.4 BAU-Lot1, Sublimits changes starts
   AND b.DRAWDOWN_REF_NO NOT IN (SELECT contract_ref_no
                                   FROM oltbs_contract_rollover
                                  WHERE nvl(roll_inst_status,'*') IN ('I','F'))
UNION
SELECT A.TRANCHE_REF_NO,
       B.CONTRACT_REF_NO,
       A.Counterparty BORROWER,
       decode(nvl(a.lc_drawdown,'N'),'Y','LC',decode(nvl(a.swing_line,'N'),'Y','SL','AL')) LIMIT_TYPE,
       C.Rollover_Product,
       DECODE(C.rollover_amount_type,'P',C.ROLLOVER_AMT,C.ROLLOVER_AMT + C.INTEREST_ROLL_AMOUNT) UTILIZED_AMT,
       A.CURRENCY CCY_CODE,
       A.MATURITY_DATE UTIL_DATE,
       null,
       a.lc_issuer --15-Jun-2011 FLEXCUBE V.CL Release 7.9 VOL2 FS Tag 11 changes
  FROM oltbs_contract_master A,
       oltbs_contract B,
       oltbs_contract_rollover C
 WHERE A.CONTRACT_REF_NO = B.CONTRACT_REF_NO
   AND A.VERSION_NO = (SELECT MAX(VERSION_NO)
		         FROM oltbs_contract_master
		        WHERE CONTRACT_REF_NO= A.CONTRACT_REF_NO)
   AND C.CONTRACT_REF_NO = B.CONTRACT_REF_NO
   AND C.VERSION_NO = (SELECT MAX(VERSION_NO)
		         FROM oltbs_contract_rollover
		        WHERE CONTRACT_REF_NO= C.CONTRACT_REF_NO)
   AND B.MODULE_CODE = 'LB'
   AND B.CONTRACT_STATUS IN ('A','Y')
   AND A.PRODUCT_TYPE = 'L'
   AND C.ROLL_INST_STATUS IN ('I','F')
   AND NVL(A.ROLLOVER_METHOD,'N') = 'N'
   AND C.Rollover_Product IS NOT NULL
UNION
SELECT A.TRANCHE_REF_NO,
       B.CONTRACT_REF_NO,
       A.Counterparty BORROWER,
       decode(nvl(a.lc_drawdown,'N'),'Y','LC',decode(nvl(a.swing_line,'N'),'Y','SL','AL')) LIMIT_TYPE,
       D.Rollover_Product,
       D.ROLLOVER_AMOUNT UTILIZED_AMT,
       A.CURRENCY CCY_CODE,
       A.MATURITY_DATE UTIL_DATE,
       null,
       a.lc_issuer --15-Jun-2011 FLEXCUBE V.CL Release 7.9 VOL2 FS Tag 11 changes
  FROM oltbs_contract_master A,
       oltbs_contract B,
       (SELECT Y.Contract_Ref_No,
               Y.Version_No,
               Y.rollover_product,
               SUM(decode(X.rollover_amount_type,'P',NVL(Y.PRINCIPAL_ROLL_AMOUNT,0),NVL(Y.MAX_ROLL_AMOUNT,0))) ROLLOVER_AMOUNT
          FROM oltbs_contract_rollover X,
               oltbs_contract_split_rollover Y
         WHERE Y.CONTRACT_REF_NO = X.CONTRACT_REF_NO
           AND Y.VERSION_NO = X.VERSION_NO
           AND X.VERSION_NO = (SELECT MAX(VERSION_NO) FROM oltbs_contract_rollover WHERE contract_ref_no = X.CONTRACT_REF_NO)
           AND X.ROLL_INST_STATUS IN ('I','F')
         GROUP BY Y.Contract_Ref_No, Y.Version_No, Y.rollover_product
         ) D
 WHERE A.CONTRACT_REF_NO = B.CONTRACT_REF_NO
   AND A.VERSION_NO = (SELECT MAX(VERSION_NO)
                         FROM oltbs_contract_master
                        WHERE CONTRACT_REF_NO= A.CONTRACT_REF_NO)
   AND D.CONTRACT_REF_NO = B.CONTRACT_REF_NO
   AND D.VERSION_NO = A.VERSION_NO
   AND B.MODULE_CODE = 'LB'
   AND B.CONTRACT_STATUS IN ('A','Y')
   AND A.PRODUCT_TYPE = 'L'
   AND NVL(A.ROLLOVER_METHOD,'N') = 'S'
   AND D.CONTRACT_REF_NO = B.CONTRACT_REF_NO
   AND D.VERSION_NO = B.LATEST_VERSION_NO
UNION
SELECT  A.TRANCHE_REF_NO,
        B.CONTRACT_REF_NO,
	A.Counterparty BORROWER,
        decode(nvl(a.lc_drawdown,'N'),'Y','LC',decode(nvl(a.swing_line,'N'),'Y','SL','AL')) LIMIT_TYPE,
        D.Rollover_Product,
        D.ROLLOVER_AMOUNT UTILIZED_AMT,
        A.CURRENCY CCY_CODE,
        A.MATURITY_DATE UTIL_DATE,
        null,
        a.lc_issuer --15-Jun-2011 FLEXCUBE V.CL Release 7.9 VOL2 FS Tag 11 changes
  FROM  oltbs_contract_master A,
        oltbs_contract B,
        (SELECT E.CHILD_REF_NO CONTRACT_REF_NO,
                F.Product_Code ROLLOVER_PRODUCT,
                DECODE(F.ROLLOVER_AMOUNT_TYPE,'P',NVL(E.PRINCIPAL_ROLL_AMOUNT,0),(NVL(E.PRINCIPAL_ROLL_AMOUNT,0) + NVL(E.INTEREST_ROLL_AMOUNT,0))) ROLLOVER_AMOUNT
           FROM oltbs_contract_rollover C,
                lbtbs_contract_consol_detail E,
                lbtbs_contract_consol_master F
          WHERE E.CHILD_REF_NO = C.CONTRACT_REF_NO
            AND E.CONTRACT_REF_NO = F.CONTRACT_REF_NO
            AND C.VERSION_NO = (SELECT MAX(VERSION_NO)
                                  FROM oltbs_contract_rollover
                                 WHERE CONTRACT_REF_NO= C.CONTRACT_REF_NO)
            AND F.ROLLOVER_STATUS IN ('I','F')) D
  WHERE A.CONTRACT_REF_NO = B.CONTRACT_REF_NO
    AND A.VERSION_NO = (SELECT MAX(VERSION_NO)
                          FROM oltbs_contract_master
                         WHERE CONTRACT_REF_NO= A.CONTRACT_REF_NO)
    AND D.CONTRACT_REF_NO = B.CONTRACT_REF_NO
    AND B.MODULE_CODE = 'LB'
    AND B.CONTRACT_STATUS IN ('A','Y')
    AND A.PRODUCT_TYPE = 'L'
    AND NVL(A.ROLLOVER_METHOD,'N') = 'C'
-- 04-MAR-2008 FLEXCUBE V.CL Release 7.4 BAU-Lot1, Sublimits changes ends
/
CREATE OR REPLACE SYNONYM lbvws_borr_prod_vdutil for lbvw_borr_prod_vdutil
/