CREATE OR REPLACE FORCE VIEW olvw_qmemo
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_qmemo.VW
**
** Module	: IF
**
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
**
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
  ----------------------------------------------------------------------------------------*/
  /*
  **Changed By         : Gomathi G
  **Date               : 21-MAY-2020
  **Change Description : Subquery used in the IN Clause might return NULL if there are no disallowed products. 
						 Replaced with NOT EXISTS clause as it would handle NULL condition and also to adhere to better coding standards practice.
  **Search String      : OBCL_14.3_SUPPORT_Bug#31381563 CHANGES
  */
/*------------------------------------------CHANGE HISTORY----------------------------------
28-MAY-2008 CITIUS-LS Till#1282, Interface changes for LC Sublimit for Loan, View Created.
01-OCT-2009 CITIUS-LS#6649, Retro Changes related to Q-Memo HFS Changes
	24-SEP-2009 FCC V.CL RELEASE 7.5 LOT1.2, Q-Memo HFS Changes
28-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION,01-DEC-2009 CITIUS-LS#6649, MTM Changes	
16-Aug-2010 FLEXCUBE V.CL Release 7.7 Retro CITIUS Till#7360, Liquidated contract were also send on Qmemo report. Change done to send the liquidated contract only when  contract has a transaction in last three months
14-OCT-2010 Flexcube V.CL Release 7.8 FS VOL2 Tag 08 Adjustments Enhancement changes
	a) branche code 000 changed to fetch from oltms_bank
07-JUN-2011 Flexcube V.CL Release 7.9 Retro, CITIUS-LS#8317, View changed to incorporate the changes related to date comparision and amount check
15-JUN-2011 FLEXCUBE V.CL Release 7.9 CITIUS COC Retro, Till#9555 COC Report Changes
			Added fas114_amt and asset_transfer_marks_amt
29-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10331 COC Report Changes
29-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10453, Based on the user request, new column added for GFRN in QMEMO.
29-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10553, Based on the user request, new UDF column added.
	STATUS-CHG-DT 
	ASSET-TRANSFER-PRICE 
	PAYING-INT-FLAG 
	ASSET-TRANSFER-FLAG 
29-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10672, GFRN are not coming for commitemnt in Qmemo
29-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10690, System is not showing the commitments, if theere is no balance on commitment, but have associated loan.
27-SEP-2011 CITIUS-LS#11366 Retro changes
	1)22-jun-2010 CITIUS-LS#7363  Changes to exclude canada branch
	2)24-SEP-2010 CITIUS-LS#7507, In case, if asset gl is not maintained, system should pick the conassetgl and display the same for o/s GL
3-AUG-2012 Flexcube V.CL Release 7.11, Retro, CITIUS#14332, New changes to incorporate the LC Sublimit HFS amount in QMEMO Feed
------------------------------------------END OF CHANGE HISTORY---------------------------------- */
SELECT 
  OLTB_CONTRACT.contract_ccy , 
  OLTB_CONTRACT_MASTER.contra_gl_bal , 
  OLTB_CONTRACT.branch , 
  oltm_customer.customer_name1 , 
  OLTB_CONTRACT_MASTER.value_date , 
  OLTB_CLASS_MAPPING.txn_mis_1 , 
  --OLTB_CONTRACT_LINKAGES.linked_to_ref , 
  oltm_customer.gfcid , 
  OLTB_CONTRACT_LINKAGES.linked_to_ref , 
  OLTB_CONTRACT.contract_ref_no , 
  OLTB_CONTRACT_MASTER.maturity_date , 
  -- CITIUS-LS#6649 BEGIN
  --24-SEP-2009 FCC V.CL RELEASE 7.5 LOT1.2, Q-Memo HFS Changes Start
  --NVL(OLTB_CONTRACT_BALANCE.principal_outstanding_bal,0) - NVL(OLTB_CONTRACT_BALANCE.LC_BALANCE_AMT,0) principal_outstanding_bal, 
  NVL(OLTB_CONTRACT_BALANCE.principal_outstanding_bal,0)- NVL(OLTB_CONTRACT_BALANCE.lc_balance_amt,0) - NVL(OLTB_CONTRACT_BALANCE.hfs_balance_amt,0) principal_outstanding_bal, 
  --24-SEP-2009 FCC V.CL RELEASE 7.5 LOT1.2, Q-Memo HFS Changes End
  -- CITIUS-LS#6649 END
  OLTB_CONTRACT.user_defined_status , 
  OLTB_CONTRACT.product_code , 
  OLTB_CONTRACT.product_type , 
  OLTB_CLASS_MAPPING.txn_mis_2 , 
  OLTB_CONTRACT_BALANCE.reserve_amt , 
  OLTM_CUSTOMER_DEFAULT.cust_mis_2 , 
  --OLTB_CONTRACT.user_defined_status ,
  'NONLC' lc_flag,
  'NONHFS' hfs_flag --24-SEP-2009 FCC V.CL RELEASE 7.5 LOT1.2, Q-Memo HFS Changes -- CITIUS-LS#6649
  ,cusip_no --28-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION,CITIUS-LS#6649, MTM Changes
  --15-JUN-2011 FLEXCUBE V.CL Release 7.9 CITIUS COC Retro, Till#9555,Starts
    ,OLTB_CONTRACT_BALANCE.fas114_reserve_amt	fas114_amt,
      --29-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10331 Starts
      ( SELECT nvl(olpkss_coc.fn_get_amort_fee_amount(OLTB_CONTRACT.contract_ref_no,'Y'),0) FROM dual) atrnsfr_marksamt
      /*
      nvl(
    		(
    			SELECT	nvl(sum(nvl(x.total_amount_liquidated,0) - nvl(x.till_date_accrual,0)),0)
    			FROM	LFTB_ACCR_FEE_MASTER x
    			WHERE	x.contract_ref_no 	=  	OLTB_CONTRACT.contract_ref_no
    			AND		x.component 		in	
    											(
    												SELECT 	component
    												FROM	lftbs_contract_accr_fee
    												WHERE  	contract_ref_no		=	x.contract_ref_no
    												AND		nvl(marks,'N')		=	'Y'
    											)
    		)
      ,0)atrnsfr_marksamt
      */
      --29-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10331 Ends
  --15-JUN-2011 FLEXCUBE V.CL Release 7.9 CITIUS COC Retro, Till#9555,Ends 
  --29-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10453 BEGIN
  ,(
  	SELECT	gfrn
  	FROM	OLTB_FACILITY_DETAILED
  	--29-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10672 BEGIN
  	--WHERE	facility = OLTB_CONTRACT_LINKAGES.linked_to_ref
  	WHERE	facility = NVL(OLTB_CONTRACT_LINKAGES.linked_to_ref,OLTB_CONTRACT.contract_ref_no)
  	--29-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10672 END
  ) GFRN,
  --29-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10453 END  
  --29-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10553 BEGIN
  (
	SELECT	field_value
	FROM	OLTM_CONTRACT_USERDEF_FIELDS
	WHERE	contract_ref_no = OLTB_CONTRACT.contract_ref_no
	AND	version_no = OLTB_CONTRACT.latest_version_no
	AND	field_name = 'STATUS-CHG-DT'
  ) status_chg_dt,
  (
	SELECT	field_value
	FROM	OLTM_CONTRACT_USERDEF_FIELDS
	WHERE	contract_ref_no = OLTB_CONTRACT.contract_ref_no
	AND	version_no = OLTB_CONTRACT.latest_version_no
	AND	field_name = 'ASSET-TRANSFER-PRICE'
  ) ast_tfr_price,
  (
	SELECT	field_value
	FROM	OLTM_CONTRACT_USERDEF_FIELDS
	WHERE	contract_ref_no = OLTB_CONTRACT.contract_ref_no
	AND	version_no = OLTB_CONTRACT.latest_version_no
	AND	field_name = 'PAYING-INT-FLAG'
  ) pay_int_flg,
  (
	SELECT	field_value
	FROM	OLTM_CONTRACT_USERDEF_FIELDS
	WHERE	contract_ref_no = OLTB_CONTRACT.contract_ref_no
	AND	version_no = OLTB_CONTRACT.latest_version_no
	AND	field_name = 'ASSET-TRANSFER-FLAG'
  ) ast_tfr_flg
  --29-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10553 END
FROM
  OLTB_CONTRACT, 
  OLTB_CONTRACT_MASTER, 
  oltm_customer, 
  OLTB_CLASS_MAPPING, 
  OLTB_CONTRACT_LINKAGES, 
  OLTB_CONTRACT_BALANCE, 
  OLTM_CUSTOMER_DEFAULT
WHERE OLTB_CONTRACT.CONTRACT_REF_NO = OLTB_CONTRACT_MASTER.CONTRACT_REF_NO AND 
OLTB_CONTRACT.LATEST_VERSION_NO = OLTB_CONTRACT_MASTER.VERSION_NO AND 
OLTB_CONTRACT.COUNTERPARTY = oltm_customer.CUSTOMER_NO AND 
OLTB_CONTRACT.CONTRACT_REF_NO = OLTB_CLASS_MAPPING.UNIT_REF_NO AND 
OLTB_CONTRACT.BRANCH = OLTB_CLASS_MAPPING.BRANCH_CODE AND 
OLTB_CONTRACT.PRODUCT_TYPE IN('L','C') 
--27-SEP-2011 CITIUS-LS#11366 Retro changes start(CITIUS-LS#7363 start)
AND not exists ( 
			SELECT 1 FROM oltbs_interface_filter_param 
			WHERE branch_code = '000' 
			AND external_system = 'CITIGI' 
			AND interface_code = 'QMEMO' 
			AND exclude_type = 'PRODUCT' 
			AND exclude_value = OLTB_CONTRACT.product_code ) 
AND not exists ( 	SELECT 1 FROM oltbs_interface_filter_param 
			WHERE branch_code = '000' 
			AND external_system = 'CITIGI' 
			AND interface_code = 'QMEMO' 
			AND exclude_type = 'BRANCH' 
			AND exclude_value = OLTB_CONTRACT.branch ) 
AND not exists ( 	SELECT 1 FROM oltbs_interface_filter_param 
			WHERE branch_code = '000' 
			AND external_system = 'CITIGI' 
			AND interface_code = 'QMEMO' 
			AND exclude_type = 'PROOF' 
			AND exclude_value = OLTB_CLASS_MAPPING.txn_mis_2)
--AND OLTB_CONTRACT.BRANCH <> '881' 
--27-SEP-2011 CITIUS-LS#11366 Retro changes end(CITIUS-LS#7363 end)
--27-SEP-2011 CITIUS-LS#11366 Retro changes start(CITIUS-LS#7507 BEGIN)
--AND OLTB_CONTRACT.AUTH_STATUS = 'A' 
AND NVL(OLTB_CONTRACT.AUTH_STATUS,'U') = 'A' 
AND NVL(OLTB_CONTRACT.contract_status,'H') NOT IN ('H','V','Y')
--27-SEP-2011 CITIUS-LS#11366 Retro changes end(CITIUS-LS#7507 END)
AND OLTB_CONTRACT.MODULE_CODE = 'OL' 
AND OLTB_CONTRACT_LINKAGES.CONTRACT_REF_NO(+) = OLTB_CONTRACT_MASTER.CONTRACT_REF_NO 
AND OLTB_CONTRACT_LINKAGES.VERSION_NO(+) = OLTB_CONTRACT_MASTER.VERSION_NO 
AND OLTB_CONTRACT_BALANCE.CONTRACT_REF_NO = OLTB_CONTRACT.CONTRACT_REF_NO 
AND OLTM_CUSTOMER_DEFAULT.CUSTOMER(+) =oltm_customer.CUSTOMER_NO 
--OBCL_14.3_SUPPORT_BUG#31381563 CHANGES STARTS
AND /* OLTB_CONTRACT.product_code not in (
                     SELECT product_code
                     FROM OLTM_PRODUCT_ACCROLE
                    WHERE accounting_role in ('ASSETGL','CONASSETGL')
                      AND account_head ='9999999999'
                     )*/
NOT EXISTS(                 
                     SELECT 1
                     FROM OLTM_PRODUCT_ACCROLE 
                    WHERE accounting_role in ('ASSETGL','CONASSETGL')
                      AND account_head ='9999999999'
                      AND OLTM_PRODUCT_ACCROLE.product_code = OLTB_CONTRACT.product_code
                     ) 
             --OBCL_14.3_SUPPORT_BUG#31381563  CHANGES ENDS                  
--AND OLTB_CONTRACT_MASTER.VALUE_DATE <= (SELECT today from sttms_dates where branch_code = '000')--14-OCT-2010 Flexcube V.CL Release 7.8 FS VOL2 Tag 08
AND OLTB_CONTRACT_MASTER.VALUE_DATE <= (SELECT today from sttms_dates where branch_code = (SELECT ho_branch FROM oltms_bank)) --14-OCT-2010 Flexcube V.CL Release 7.8 FS VOL2 Tag 08
--16-Aug-2010 FLEXCUBE V.CL Release 7.7 Retro CITIUS Till#7360 Starts
AND 
  	(
  		--Flexcube V.CL Release 7.9 Retro, CITIUS-LS#8317, View changed to incorporate the changes related to date comparision and amount check,Starts
				--NVL(OLTB_CONTRACT_BALANCE.principal_outstanding_bal,0) > 0
				NVL(OLTB_CONTRACT_BALANCE.principal_outstanding_bal,0) <> 0
		--Flexcube V.CL Release 7.9 Retro, CITIUS-LS#8317, View changed to incorporate the changes related to date comparision and amount check,Ends
  		OR
		( 
			SELECT	SUM(NVL(amount_due,0) - NVL(amount_settled,0) - NVL(adjusted_amount,0))
			FROM	oltbs_amount_due_cs
			WHERE	contract_ref_no = OLTB_CONTRACT.contract_ref_no
			AND	component <> 'PRINCIPAL'
		) > 0
  		OR
		( 
			SELECT	SUM(NVL(total_amount_liquidated,0)-NVL(till_date_accrual,0))
			FROM	LFTB_ACCR_FEE_MASTER
			WHERE 	contract_ref_no = OLTB_CONTRACT.contract_ref_no
			--AND   	component IN ('AMORTFEE','AGENCYFEE','AMENDMENT','UPFRONTFEE') --CITIUS-LS#7035 commented
			AND     component IN (SELECT mis_head FROM OLTB_MIS_HEAD_MAPPING WHERE component = 'FEE_COMP') --CITIUS-LS#7035
		) > 0
		OR
		(	SELECT COUNT(1)
			FROM   OLTB_CONTRACT_MTD_YTD_BAL
			WHERE  contract_ref_no = OLTB_CONTRACT.contract_ref_no
			--Flexcube V.CL Release 7.9 Retro, CITIUS-LS#8317, View changed to incorporate the changes related to date comparision and amount check,Starts
			--AND    month >= to_char(ADD_MONTHS(global.application_date,-3),'MON')
			AND    to_date('01-'||month||'-'||year,'DD-MON-YYYY') >= trunc(ADD_MONTHS(global.application_date,-3),'MON')
			--Flexcube V.CL Release 7.9 Retro, CITIUS-LS#8317, View changed to incorporate the changes related to date comparision and amount check,Ends
			AND    year  = to_char(global.application_date,'YYYY')
			--Flexcube V.CL Release 7.9 Retro, CITIUS-LS#8317, View changed to incorporate the changes related to date comparision and amount check,Starts
			--AND    (abs(mtd_bal) > 0 OR abs(mtd_bal_fcy) > 0 )
			AND    (abs(mtd_bal) <> 0 OR abs(mtd_bal_fcy) <> 0 )
			--Flexcube V.CL Release 7.9 Retro, CITIUS-LS#8317, View changed to incorporate the changes related to date comparision and amount check,Ends
		) > 0
		OR
		(
			SELECT	COUNT(1)
			FROM 	TLTB_NET_INCOME_DETAIL
			WHERE	cusip = OLTB_CONTRACT_MASTER.cusip_no
			AND	position_identifier = 
				(
					SELECT	participant
					FROM	oltbs_stp_job_browser 
					WHERE	borr_reF_no = 
						(
							SELECT	lsrefno
							FROM	lbtbs_stp_contract_map
							WHERE	ldrefno =  OLTB_CONTRACT.contract_ref_no
						)
					AND	borr_esn = 1
					AND	ld_ref_no = OLTB_CONTRACT.contract_ref_no
				)
			AND	expense_code = 
					(
						SELECT	txn_mis_1
						FROM	OLTB_CLASS_MAPPING
						WHERE	unit_ref_no = OLTB_CONTRACT.contract_ref_no
					)			
			AND	ccy_code = OLTB_CONTRACT.contract_ccy
			AND	NVL(tover_lcy,0) <> 0
			AND	book_date BETWEEN TRUNC(ADD_MONTHS(global.application_date,-3),'MON') AND global.application_date
		) > 0
		--29-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10690 BEGIN
		OR	NVL(OLTB_CONTRACT_BALANCE.reserve_amt,0) <> 0
		OR	NVL(OLTB_CONTRACT_BALANCE.fas114_reserve_amt,0) <> 0
		OR
		( 
			SELECT	NVL(loans_outstanding,0) + NVL(principal_outstanding,0) + NVL(lc_loans_outstanding,0)
			FROM	OLTB_FACILITY_DETAILED
			WHERE	facility = OLTB_CONTRACT.contract_ref_no
		) > 0
		--29-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10690 END	
	)
UNION ALL
SELECT 
  OLTB_CONTRACT.contract_ccy , 
  OLTB_CONTRACT_MASTER.contra_gl_bal , 
  OLTB_CONTRACT.branch , 
  oltm_customer.customer_name1 , 
  OLTB_CONTRACT_MASTER.value_date , 
  OLTB_CLASS_MAPPING.txn_mis_1 , 
  --OLTB_CONTRACT_LINKAGES.linked_to_ref , 
  oltm_customer.gfcid , 
  OLTB_CONTRACT_LINKAGES.linked_to_ref , 
  OLTB_CONTRACT.contract_ref_no , 
  OLTB_CONTRACT_MASTER.maturity_date , 
    OLTB_CONTRACT_BALANCE.LC_BALANCE_AMT -NVL(OLTB_CONTRACT_BALANCE.hfs_sublimit_amt,0), --3-AUG-2012 Flexcube V.CL Release 7.11, Retro, CITIUS#14332 Changes
  OLTB_CONTRACT.user_defined_status , 
  OLTB_CONTRACT.product_code , 
  OLTB_CONTRACT.product_type , 
  OLTB_CLASS_MAPPING.txn_mis_2 , 
  0 , 
  OLTM_CUSTOMER_DEFAULT.cust_mis_2 , 
  --OLTB_CONTRACT.user_defined_status ,
  'LC' lc_flag,
  'NONHFS' hfs_flag --24-SEP-2009 FCC V.CL RELEASE 7.5 LOT1.2, Q-Memo HFS Changes -- CITIUS-LS#6649
  ,cusip_no --28-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION,CITIUS-LS#6649, MTM Changes
  --15-JUN-2011 FLEXCUBE V.CL Release 7.9 CITIUS COC Retro, Till#9555,Starts
    ,OLTB_CONTRACT_BALANCE.fas114_reserve_amt	fas114_amt,
      --29-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10331 Starts
      ( SELECT nvl(olpkss_coc.fn_get_amort_fee_amount(OLTB_CONTRACT.contract_ref_no,'Y'),0) FROM dual) atrnsfr_marksamt
	      /*
      nvl(
    		(
    			SELECT	nvl(sum(nvl(x.total_amount_liquidated,0) - nvl(x.till_date_accrual,0)),0)
    			FROM	LFTB_ACCR_FEE_MASTER x
    			WHERE	x.contract_ref_no 	=  	OLTB_CONTRACT.contract_ref_no
    			AND		x.component 		in	
    											(
    												SELECT 	component
    												FROM	lftbs_contract_accr_fee
    												WHERE  	contract_ref_no		=	x.contract_ref_no
    												AND		nvl(marks,'N')		=	'Y'
    											)
    		)
      ,0)atrnsfr_marksamt
      */
      --29-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10331 Ends
  --15-JUN-2011 FLEXCUBE V.CL Release 7.9 CITIUS COC Retro, Till#9555,Ends
  --29-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10453 BEGIN
  ,(
  	SELECT	gfrn
  	FROM	OLTB_FACILITY_DETAILED
  	--29-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10672 BEGIN
  	--WHERE	facility = OLTB_CONTRACT_LINKAGES.linked_to_ref
  	WHERE	facility = NVL(OLTB_CONTRACT_LINKAGES.linked_to_ref,OLTB_CONTRACT.contract_ref_no)
  	--29-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10672 END
  ) GFRN,
  --29-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10453 END  
  --29-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10553 BEGIN
  (
	SELECT	field_value
	FROM	OLTM_CONTRACT_USERDEF_FIELDS
	WHERE	contract_ref_no = OLTB_CONTRACT.contract_ref_no
	AND	version_no = OLTB_CONTRACT.latest_version_no
	AND	field_name = 'STATUS-CHG-DT'
  ) status_chg_dt,
  (
	SELECT	field_value
	FROM	OLTM_CONTRACT_USERDEF_FIELDS
	WHERE	contract_ref_no = OLTB_CONTRACT.contract_ref_no
	AND	version_no = OLTB_CONTRACT.latest_version_no
	AND	field_name = 'ASSET-TRANSFER-PRICE'
  ) ast_tfr_price,
  (
	SELECT	field_value
	FROM	OLTM_CONTRACT_USERDEF_FIELDS
	WHERE	contract_ref_no = OLTB_CONTRACT.contract_ref_no
	AND	version_no = OLTB_CONTRACT.latest_version_no
	AND	field_name = 'PAYING-INT-FLAG'
  ) pay_int_flg,
  (
	SELECT	field_value
	FROM	OLTM_CONTRACT_USERDEF_FIELDS
	WHERE	contract_ref_no = OLTB_CONTRACT.contract_ref_no
	AND	version_no = OLTB_CONTRACT.latest_version_no
	AND	field_name = 'ASSET-TRANSFER-FLAG'
  ) ast_tfr_flg
  --29-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10553 END  
FROM
  OLTB_CONTRACT, 
  OLTB_CONTRACT_MASTER, 
  oltm_customer, 
  OLTB_CLASS_MAPPING, 
  OLTB_CONTRACT_LINKAGES, 
  OLTB_CONTRACT_BALANCE, 
  OLTM_CUSTOMER_DEFAULT
WHERE 
OLTB_CONTRACT.CONTRACT_REF_NO = OLTB_CONTRACT_MASTER.CONTRACT_REF_NO AND 
OLTB_CONTRACT.LATEST_VERSION_NO = OLTB_CONTRACT_MASTER.VERSION_NO AND 
OLTB_CONTRACT.COUNTERPARTY = oltm_customer.CUSTOMER_NO AND 
OLTB_CONTRACT.CONTRACT_REF_NO = OLTB_CLASS_MAPPING.UNIT_REF_NO AND 
OLTB_CONTRACT.BRANCH = OLTB_CLASS_MAPPING.BRANCH_CODE AND 
OLTB_CONTRACT.PRODUCT_TYPE IN('L','C') 
--27-SEP-2011 CITIUS-LS#11366 Retro changes start(CITIUS-LS#7363 start)
--AND OLTB_CONTRACT.BRANCH <> '881' 
AND not exists ( 
			SELECT 1 FROM oltbs_interface_filter_param 
			WHERE branch_code = '000' 
			AND external_system = 'CITIGI' 
			AND interface_code = 'QMEMO' 
			AND exclude_type = 'PRODUCT' 
			AND exclude_value = OLTB_CONTRACT.product_code ) 
AND not exists ( 	SELECT 1 FROM oltbs_interface_filter_param 
			WHERE branch_code = '000' 
			AND external_system = 'CITIGI' 
			AND interface_code = 'QMEMO' 
			AND exclude_type = 'BRANCH' 
			AND exclude_value = OLTB_CONTRACT.branch ) 
AND not exists ( 	SELECT 1 FROM oltbs_interface_filter_param 
			WHERE branch_code = '000' 
			AND external_system = 'CITIGI' 
			AND interface_code = 'QMEMO' 
			AND exclude_type = 'PROOF' 
			AND exclude_value = OLTB_CLASS_MAPPING.txn_mis_2)
--27-SEP-2011 CITIUS-LS#11366 Retro changes end(CITIUS-LS#7363 end)
--27-SEP-2011 CITIUS-LS#11366 Retro changes start(CITIUS-LS#7507 BEGIN)
--AND OLTB_CONTRACT.AUTH_STATUS = 'A' 
AND NVL(OLTB_CONTRACT.AUTH_STATUS,'U') = 'A' 
AND NVL(OLTB_CONTRACT.contract_status,'H') NOT IN ('H','V','Y')
--27-SEP-2011 CITIUS-LS#11366 Retro changes end(CITIUS-LS#7507 END) 
AND OLTB_CONTRACT.MODULE_CODE = 'OL' 
AND OLTB_CONTRACT_LINKAGES.CONTRACT_REF_NO(+) = OLTB_CONTRACT_MASTER.CONTRACT_REF_NO 
AND OLTB_CONTRACT_LINKAGES.VERSION_NO(+) = OLTB_CONTRACT_MASTER.VERSION_NO 
AND OLTB_CONTRACT_BALANCE.CONTRACT_REF_NO = OLTB_CONTRACT.CONTRACT_REF_NO 
AND OLTM_CUSTOMER_DEFAULT.CUSTOMER(+) =oltm_customer.CUSTOMER_NO 
AND OLTB_CONTRACT.product_code not in (
									   SELECT product_code 
										 FROM OLTM_PRODUCT_ACCROLE 
										WHERE accounting_role in ('ASSETGL','CONASSETGL') 
										  AND account_head ='9999999999'
									   ) 
--AND OLTB_CONTRACT_MASTER.VALUE_DATE <= (SELECT today from sttms_dates where branch_code = '000')--14-OCT-2010 Flexcube V.CL Release 7.8 FS VOL2 Tag 08
AND OLTB_CONTRACT_MASTER.VALUE_DATE <= (SELECT today from sttms_dates where branch_code = (SELECT ho_branch FROM oltms_bank)) --14-OCT-2010 Flexcube V.CL Release 7.8 FS VOL2 Tag 08
AND NVL(OLTB_CONTRACT_BALANCE.lc_balance_amt,0) > 0
--16-Aug-2010 FLEXCUBE V.CL Release 7.7 Retro CITIUS Till#7360 Starts
AND 
  	(
  		--Flexcube V.CL Release 7.9 Retro, CITIUS-LS#8317, View changed to incorporate the changes related to date comparision and amount check,Starts
		--NVL(OLTB_CONTRACT_BALANCE.principal_outstanding_bal,0) > 0
		NVL(OLTB_CONTRACT_BALANCE.principal_outstanding_bal,0) <> 0
		--Flexcube V.CL Release 7.9 Retro, CITIUS-LS#8317, View changed to incorporate the changes related to date comparision and amount check,Ends
  		OR
		( 
			SELECT	SUM(NVL(amount_due,0) - NVL(amount_settled,0) - NVL(adjusted_amount,0))
			FROM	oltbs_amount_due_cs
			WHERE	contract_ref_no = OLTB_CONTRACT.contract_ref_no
			AND	component <> 'PRINCIPAL'
		) > 0
  		OR
		( 
			SELECT	SUM(NVL(total_amount_liquidated,0)-NVL(till_date_accrual,0))
			FROM	LFTB_ACCR_FEE_MASTER
			WHERE 	contract_ref_no = OLTB_CONTRACT.contract_ref_no
			--AND   	component IN ('AMORTFEE','AGENCYFEE','AMENDMENT','UPFRONTFEE') --CITIUS-LS#7035 commented
			AND     component IN (SELECT mis_head FROM OLTB_MIS_HEAD_MAPPING WHERE component = 'FEE_COMP') --CITIUS-LS#7035
		) > 0
		OR
		(	SELECT COUNT(1)
			FROM   OLTB_CONTRACT_MTD_YTD_BAL
			WHERE  contract_ref_no = OLTB_CONTRACT.contract_ref_no
			--Flexcube V.CL Release 7.9 Retro, CITIUS-LS#8317, View changed to incorporate the changes related to date comparision and amount check,Starts
			--AND    month >= to_char(ADD_MONTHS(global.application_date,-3),'MON')
			AND    to_date('01-'||month||'-'||year,'DD-MON-YYYY') >= trunc(ADD_MONTHS(global.application_date,-3),'MON')
			--Flexcube V.CL Release 7.9 Retro, CITIUS-LS#8317, View changed to incorporate the changes related to date comparision and amount check,Ends
			AND    year  = to_char(global.application_date,'YYYY')
			--Flexcube V.CL Release 7.9 Retro, CITIUS-LS#8317, View changed to incorporate the changes related to date comparision and amount check,Starts
			--AND    (abs(mtd_bal) > 0 OR abs(mtd_bal_fcy) > 0 )
			AND    (abs(mtd_bal) <> 0 OR abs(mtd_bal_fcy) <> 0 )
			--Flexcube V.CL Release 7.9 Retro, CITIUS-LS#8317, View changed to incorporate the changes related to date comparision and amount check,Ends
		) > 0
		OR
		(
			SELECT	COUNT(1)
			FROM 	TLTB_NET_INCOME_DETAIL
			WHERE	cusip = OLTB_CONTRACT_MASTER.cusip_no
			AND	position_identifier = 
				(
					SELECT	participant
					FROM	oltbs_stp_job_browser 
					WHERE	borr_reF_no = 
						(
							SELECT	lsrefno
							FROM	lbtbs_stp_contract_map
							WHERE	ldrefno =  OLTB_CONTRACT.contract_ref_no
						)
					AND	borr_esn = 1
					AND	ld_ref_no = OLTB_CONTRACT.contract_ref_no
				)
			AND	expense_code = 
					(
						SELECT	txn_mis_1
						FROM	OLTB_CLASS_MAPPING
						WHERE	unit_ref_no = OLTB_CONTRACT.contract_ref_no
					)			
			AND	ccy_code = OLTB_CONTRACT.contract_ccy
			AND	NVL(tover_lcy,0) <> 0
			AND	book_date BETWEEN TRUNC(ADD_MONTHS(global.application_date,-3),'MON') AND global.application_date
		) > 0
		--29-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10690 BEGIN
		OR	NVL(OLTB_CONTRACT_BALANCE.reserve_amt,0) <> 0
		OR	NVL(OLTB_CONTRACT_BALANCE.fas114_reserve_amt,0) <> 0		
		OR
		( 
			SELECT	NVL(loans_outstanding,0) + NVL(principal_outstanding,0) + NVL(lc_loans_outstanding,0)
			FROM	OLTB_FACILITY_DETAILED
			WHERE	facility = OLTB_CONTRACT.contract_ref_no
		) > 0
		--29-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10690 END
	)
UNION ALL 
SELECT
  OLTB_CONTRACT.contract_ccy ,
  OLTB_CONTRACT_MASTER.contra_gl_bal ,
  OLTB_CONTRACT.branch ,
  oltm_customer.customer_name1 ,
  OLTB_CONTRACT_MASTER.value_date ,
  OLTB_CLASS_MAPPING.txn_mis_1 ,
  oltm_customer.gfcid ,
  OLTB_CONTRACT_LINKAGES.linked_to_ref ,
  OLTB_CONTRACT.contract_ref_no,
  OLTB_CONTRACT_MASTER.maturity_date ,
  NVL(OLTB_CONTRACT_BALANCE.hfs_balance_amt,0),
  OLTB_CONTRACT.user_defined_status ,
  OLTB_CONTRACT.product_code ,
  OLTB_CONTRACT.product_type ,
  OLTB_CLASS_MAPPING.txn_mis_2 ,
  OLTB_CONTRACT_BALANCE.reserve_amt ,
  OLTM_CUSTOMER_DEFAULT.cust_mis_2 ,
  'NONLC' lc_flag,
  'HFS' hfs_flag
  ,cusip_no --28-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION,CITIUS-LS#6649, MTM Changes
  --15-JUN-2011 FLEXCUBE V.CL Release 7.9 CITIUS COC Retro, Till#9555,Starts
    ,OLTB_CONTRACT_BALANCE.fas114_reserve_amt	fas114_amt,
    nvl(
  		(
  			SELECT	nvl(sum(nvl(x.total_amount_liquidated,0) - nvl(x.till_date_accrual,0)),0)
  			FROM	LFTB_ACCR_FEE_MASTER x
  			WHERE	x.contract_ref_no 	=  	OLTB_CONTRACT.contract_ref_no
  			AND		x.component 		in	
  											(
  												SELECT 	component
  												FROM	lftbs_contract_accr_fee
  												WHERE  	contract_ref_no		=	x.contract_ref_no
  												AND		nvl(marks,'N')		=	'Y'
  											)
  		)
    ,0)atrnsfr_marksamt
  --15-JUN-2011 FLEXCUBE V.CL Release 7.9 CITIUS COC Retro, Till#9555,Ends
  --29-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10453 BEGIN
  ,(
  	SELECT	gfrn
  	FROM	OLTB_FACILITY_DETAILED
  	--29-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10672 BEGIN
  	--WHERE	facility = OLTB_CONTRACT_LINKAGES.linked_to_ref
  	WHERE	facility = NVL(OLTB_CONTRACT_LINKAGES.linked_to_ref,OLTB_CONTRACT.contract_ref_no)
  	--29-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10672 END
  ) GFRN,
  --29-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10453 END  
  --29-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10553 BEGIN
  (
	SELECT	field_value
	FROM	OLTM_CONTRACT_USERDEF_FIELDS
	WHERE	contract_ref_no = OLTB_CONTRACT.contract_ref_no
	AND	version_no = OLTB_CONTRACT.latest_version_no
	AND	field_name = 'STATUS-CHG-DT'
  ) status_chg_dt,
  (
	SELECT	field_value
	FROM	OLTM_CONTRACT_USERDEF_FIELDS
	WHERE	contract_ref_no = OLTB_CONTRACT.contract_ref_no
	AND	version_no = OLTB_CONTRACT.latest_version_no
	AND	field_name = 'ASSET-TRANSFER-PRICE'
  ) ast_tfr_price,
  (
	SELECT	field_value
	FROM	OLTM_CONTRACT_USERDEF_FIELDS
	WHERE	contract_ref_no = OLTB_CONTRACT.contract_ref_no
	AND	version_no = OLTB_CONTRACT.latest_version_no
	AND	field_name = 'PAYING-INT-FLAG'
  ) pay_int_flg,
  (
	SELECT	field_value
	FROM	OLTM_CONTRACT_USERDEF_FIELDS
	WHERE	contract_ref_no = OLTB_CONTRACT.contract_ref_no
	AND	version_no = OLTB_CONTRACT.latest_version_no
	AND	field_name = 'ASSET-TRANSFER-FLAG'
  ) ast_tfr_flg
  --29-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10553 END  
FROM
  OLTB_CONTRACT,
  OLTB_CONTRACT_MASTER,
  oltm_customer,
  OLTB_CLASS_MAPPING,
  OLTB_CONTRACT_LINKAGES,
  OLTB_CONTRACT_BALANCE,
  OLTM_CUSTOMER_DEFAULT
WHERE 	OLTB_CONTRACT.CONTRACT_REF_NO = OLTB_CONTRACT_MASTER.CONTRACT_REF_NO AND
	OLTB_CONTRACT.LATEST_VERSION_NO = OLTB_CONTRACT_MASTER.VERSION_NO AND
	OLTB_CONTRACT.COUNTERPARTY = oltm_customer.CUSTOMER_NO AND
	OLTB_CONTRACT.CONTRACT_REF_NO = OLTB_CLASS_MAPPING.UNIT_REF_NO AND
	OLTB_CONTRACT.BRANCH = OLTB_CLASS_MAPPING.BRANCH_CODE AND
	--OLTB_CONTRACT.PRODUCT_TYPE IN('C') --28-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION,CITIUS-LS#6649
	OLTB_CONTRACT.PRODUCT_TYPE IN('L','C') --28-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION,CITIUS-LS#6649
--27-SEP-2011 CITIUS-LS#11366 Retro changes start(CITIUS-LS#7363 start)
--AND OLTB_CONTRACT.BRANCH <> '881' 
AND not exists ( 
			SELECT 1 FROM oltbs_interface_filter_param 
			WHERE branch_code = '000' 
			AND external_system = 'CITIGI' 
			AND interface_code = 'QMEMO' 
			AND exclude_type = 'PRODUCT' 
			AND exclude_value = OLTB_CONTRACT.product_code ) 
AND not exists ( 	SELECT 1 FROM oltbs_interface_filter_param 
			WHERE branch_code = '000' 
			AND external_system = 'CITIGI' 
			AND interface_code = 'QMEMO' 
			AND exclude_type = 'BRANCH' 
			AND exclude_value = OLTB_CONTRACT.branch ) 
AND not exists ( 	SELECT 1 FROM oltbs_interface_filter_param 
			WHERE branch_code = '000' 
			AND external_system = 'CITIGI' 
			AND interface_code = 'QMEMO' 
			AND exclude_type = 'PROOF' 
			AND exclude_value = OLTB_CLASS_MAPPING.txn_mis_2)
--27-SEP-2011 CITIUS-LS#11366 Retro changes end(CITIUS-LS#7363 end)
--27-SEP-2011 CITIUS-LS#11366 Retro changes start(CITIUS-LS#7507 BEGIN)
--AND OLTB_CONTRACT.AUTH_STATUS = 'A' 
AND NVL(OLTB_CONTRACT.AUTH_STATUS,'U') = 'A' 
AND NVL(OLTB_CONTRACT.contract_status,'H') NOT IN ('H','V','Y')
--27-SEP-2011 CITIUS-LS#11366 Retro changes end(CITIUS-LS#7507 END) 
AND OLTB_CONTRACT.MODULE_CODE = 'OL'
AND OLTB_CONTRACT_LINKAGES.CONTRACT_REF_NO(+) = OLTB_CONTRACT_MASTER.CONTRACT_REF_NO
AND OLTB_CONTRACT_LINKAGES.VERSION_NO(+) = OLTB_CONTRACT_MASTER.VERSION_NO
AND OLTB_CONTRACT_BALANCE.CONTRACT_REF_NO = OLTB_CONTRACT.CONTRACT_REF_NO
AND OLTM_CUSTOMER_DEFAULT.CUSTOMER(+) =oltm_customer.CUSTOMER_NO
AND OLTB_CONTRACT.product_code not in (
					SELECT product_code
					FROM OLTM_PRODUCT_ACCROLE
					WHERE accounting_role in ('ASSETGL','CONASSETGL')
					AND account_head ='9999999999'
				      )
--AND OLTB_CONTRACT_MASTER.VALUE_DATE <= (SELECT today from sttms_dates where branch_code = '000')--14-OCT-2010 Flexcube V.CL Release 7.8 FS VOL2 Tag 08
AND OLTB_CONTRACT_MASTER.VALUE_DATE <= (SELECT today from sttms_dates where branch_code = (SELECT ho_branch FROM oltms_bank)) --14-OCT-2010 Flexcube V.CL Release 7.8 FS VOL2 Tag 08
AND NVL(OLTB_CONTRACT_BALANCE.HFS_BALANCE_AMT,0)> 0 
--24-SEP-2009 FCC V.CL RELEASE 7.5 LOT1.2, Q-Memo HFS Changes ends
-- CITIUS-LS#6649 END
--16-Aug-2010 FLEXCUBE V.CL Release 7.7 Retro CITIUS Till#7360 Starts
AND 
  	(
  		--Flexcube V.CL Release 7.9 Retro, CITIUS-LS#8317, View changed to incorporate the changes related to date comparision and amount check,Starts
		--NVL(OLTB_CONTRACT_BALANCE.principal_outstanding_bal,0) > 0
		NVL(OLTB_CONTRACT_BALANCE.principal_outstanding_bal,0) <> 0
  		--Flexcube V.CL Release 7.9 Retro, CITIUS-LS#8317, View changed to incorporate the changes related to date comparision and amount check,Ends
  		OR
		( 
			SELECT	SUM(NVL(amount_due,0) - NVL(amount_settled,0) - NVL(adjusted_amount,0))
			FROM	oltbs_amount_due_cs
			WHERE	contract_ref_no = OLTB_CONTRACT.contract_ref_no
			AND	component <> 'PRINCIPAL'
		) > 0
  		OR
		( 
			SELECT	SUM(NVL(total_amount_liquidated,0)-NVL(till_date_accrual,0))
			FROM	LFTB_ACCR_FEE_MASTER
			WHERE 	contract_ref_no = OLTB_CONTRACT.contract_ref_no
			--AND   	component IN ('AMORTFEE','AGENCYFEE','AMENDMENT','UPFRONTFEE') --CITIUS-LS#7035 commented
			AND     component IN (SELECT mis_head FROM OLTB_MIS_HEAD_MAPPING WHERE component = 'FEE_COMP') --CITIUS-LS#7035
		) > 0
		OR
		(	SELECT COUNT(1)
			FROM   OLTB_CONTRACT_MTD_YTD_BAL
			WHERE  contract_ref_no = OLTB_CONTRACT.contract_ref_no
			--Flexcube V.CL Release 7.9 Retro, CITIUS-LS#8317, View changed to incorporate the changes related to date comparision and amount check,Starts
			--AND    month >= to_char(ADD_MONTHS(global.application_date,-3),'MON')
			AND    to_date('01-'||month||'-'||year,'DD-MON-YYYY') >= trunc(ADD_MONTHS(global.application_date,-3),'MON')
			--Flexcube V.CL Release 7.9 Retro, CITIUS-LS#8317, View changed to incorporate the changes related to date comparision and amount check,Ends
			AND    year  = to_char(global.application_date,'YYYY')
			---Flexcube V.CL Release 7.9 Retro, CITIUS-LS#8317, View changed to incorporate the changes related to date comparision and amount check,Starts
			--AND    (abs(mtd_bal) > 0 OR abs(mtd_bal_fcy) > 0 )
			AND    (abs(mtd_bal) <> 0 OR abs(mtd_bal_fcy) <> 0 )
			--Flexcube V.CL Release 7.9 Retro, CITIUS-LS#8317, View changed to incorporate the changes related to date comparision and amount check,Ends
		) > 0
		OR
		(
			SELECT	COUNT(1)
			FROM 	TLTB_NET_INCOME_DETAIL
			WHERE	cusip = OLTB_CONTRACT_MASTER.cusip_no
			AND	position_identifier = 
				(
					SELECT	participant
					FROM	oltbs_stp_job_browser 
					WHERE	borr_reF_no = 
						(
							SELECT	lsrefno
							FROM	lbtbs_stp_contract_map
							WHERE	ldrefno =  OLTB_CONTRACT.contract_ref_no
						)
					AND	borr_esn = 1
					AND	ld_ref_no = OLTB_CONTRACT.contract_ref_no
				)
			AND	expense_code = 
					(
						SELECT	txn_mis_1
						FROM	OLTB_CLASS_MAPPING
						WHERE	unit_ref_no = OLTB_CONTRACT.contract_ref_no
					)			
			AND	ccy_code = OLTB_CONTRACT.contract_ccy
			AND	NVL(tover_lcy,0) <> 0
			AND	book_date BETWEEN TRUNC(ADD_MONTHS(global.application_date,-3),'MON') AND global.application_date
		) > 0
		--29-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10690 BEGIN
		OR	NVL(OLTB_CONTRACT_BALANCE.reserve_amt,0) <> 0
		OR	NVL(OLTB_CONTRACT_BALANCE.fas114_reserve_amt,0) <> 0		
		OR
		( 
			SELECT	NVL(loans_outstanding,0) + NVL(principal_outstanding,0) + NVL(lc_loans_outstanding,0)
			FROM	OLTB_FACILITY_DETAILED
			WHERE	facility = OLTB_CONTRACT.contract_ref_no
		) > 0
		--29-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10690 END	
	)
UNION ALL
SELECT
  OLTB_CONTRACT.contract_ccy ,
  OLTB_CONTRACT_MASTER.contra_gl_bal ,
  OLTB_CONTRACT.branch ,
  oltm_customer.customer_name1 ,
  OLTB_CONTRACT_MASTER.value_date ,
  OLTB_CLASS_MAPPING.txn_mis_1 ,
  oltm_customer.gfcid ,
  OLTB_CONTRACT_LINKAGES.linked_to_ref ,
  OLTB_CONTRACT.contract_ref_no,
  OLTB_CONTRACT_MASTER.maturity_date ,
  NVL(OLTB_CONTRACT_BALANCE.hfs_sublimit_amt,0),
  OLTB_CONTRACT.user_defined_status ,
  OLTB_CONTRACT.product_code ,
  OLTB_CONTRACT.product_type ,
  OLTB_CLASS_MAPPING.txn_mis_2 ,
  OLTB_CONTRACT_BALANCE.reserve_amt ,
  OLTM_CUSTOMER_DEFAULT.cust_mis_2 ,
  'LC' lc_flag,
  'HFS' hfs_flag
  ,cusip_no --28-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION,CITIUS-LS#6649, MTM Changes
  ,OLTB_CONTRACT_BALANCE.fas114_reserve_amt	fas114_amt,
    nvl(
  		(
  			SELECT	nvl(sum(nvl(x.total_amount_liquidated,0) - nvl(x.till_date_accrual,0)),0)
  			FROM	LFTB_ACCR_FEE_MASTER x
  			WHERE	x.contract_ref_no 	=  	OLTB_CONTRACT.contract_ref_no
  			AND	x.component 	in
							(
								SELECT 	component
								FROM	lftbs_contract_accr_fee
								WHERE  	contract_ref_no		=	x.contract_ref_no
								AND	nvl(marks,'N')		=	'Y'
							)
  		)
    ,0)atrnsfr_marksamt
  ,(
  	SELECT	gfrn
  	FROM	OLTB_FACILITY_DETAILED
  	WHERE	facility = NVL(OLTB_CONTRACT_LINKAGES.linked_to_ref,OLTB_CONTRACT.contract_ref_no)
  ) GFRN,
  (
	SELECT	field_value
	FROM	OLTM_CONTRACT_USERDEF_FIELDS
	WHERE	contract_ref_no = OLTB_CONTRACT.contract_ref_no
	AND	version_no = OLTB_CONTRACT.latest_version_no
	AND	field_name = 'STATUS-CHG-DT'
  ) status_chg_dt,
  (
	SELECT	field_value
	FROM	OLTM_CONTRACT_USERDEF_FIELDS
	WHERE	contract_ref_no = OLTB_CONTRACT.contract_ref_no
	AND	version_no = OLTB_CONTRACT.latest_version_no
	AND	field_name = 'ASSET-TRANSFER-PRICE'
  ) ast_tfr_price,
  (
	SELECT	field_value
	FROM	OLTM_CONTRACT_USERDEF_FIELDS
	WHERE	contract_ref_no = OLTB_CONTRACT.contract_ref_no
	AND	version_no = OLTB_CONTRACT.latest_version_no
	AND	field_name = 'PAYING-INT-FLAG'
  ) pay_int_flg,
  (
	SELECT	field_value
	FROM	OLTM_CONTRACT_USERDEF_FIELDS
	WHERE	contract_ref_no = OLTB_CONTRACT.contract_ref_no
	AND	version_no = OLTB_CONTRACT.latest_version_no
	AND	field_name = 'ASSET-TRANSFER-FLAG'
  ) ast_tfr_flg
FROM
  OLTB_CONTRACT,
  OLTB_CONTRACT_MASTER,
  oltm_customer,
  OLTB_CLASS_MAPPING,
  OLTB_CONTRACT_LINKAGES,
  OLTB_CONTRACT_BALANCE,
  OLTM_CUSTOMER_DEFAULT
WHERE 	OLTB_CONTRACT.CONTRACT_REF_NO = OLTB_CONTRACT_MASTER.CONTRACT_REF_NO AND
	OLTB_CONTRACT.LATEST_VERSION_NO = OLTB_CONTRACT_MASTER.VERSION_NO AND
	OLTB_CONTRACT.COUNTERPARTY = oltm_customer.CUSTOMER_NO AND
	OLTB_CONTRACT.CONTRACT_REF_NO = OLTB_CLASS_MAPPING.UNIT_REF_NO AND
	OLTB_CONTRACT.BRANCH = OLTB_CLASS_MAPPING.BRANCH_CODE AND
	OLTB_CONTRACT.PRODUCT_TYPE IN('L','C') --28-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION,CITIUS-LS#6649
AND not exists (
			SELECT 1 FROM oltbs_interface_filter_param
			WHERE branch_code = 'CIP'
			AND external_system = 'CITIGI'
			AND interface_code = 'QMEMO'
			AND exclude_type = 'PRODUCT'
			AND exclude_value = OLTB_CONTRACT.product_code )
AND not exists ( 	SELECT 1 FROM oltbs_interface_filter_param
			WHERE branch_code = 'CIP'
			AND external_system = 'CITIGI'
			AND interface_code = 'QMEMO'
			AND exclude_type = 'BRANCH'
			AND exclude_value = OLTB_CONTRACT.branch )
AND not exists ( 	SELECT 1 FROM oltbs_interface_filter_param
			WHERE branch_code = 'CIP'
			AND external_system = 'CITIGI'
			AND interface_code = 'QMEMO'
			AND exclude_type = 'PROOF'
			AND exclude_value = OLTB_CLASS_MAPPING.txn_mis_2)
AND NVL(OLTB_CONTRACT.AUTH_STATUS,'U') = 'A'
AND NVL(OLTB_CONTRACT.contract_status,'H') NOT IN ('H','V','Y')
AND OLTB_CONTRACT.MODULE_CODE = 'OL'
AND OLTB_CONTRACT_LINKAGES.CONTRACT_REF_NO(+) = OLTB_CONTRACT_MASTER.CONTRACT_REF_NO
AND OLTB_CONTRACT_LINKAGES.VERSION_NO(+) = OLTB_CONTRACT_MASTER.VERSION_NO
AND OLTB_CONTRACT_BALANCE.CONTRACT_REF_NO = OLTB_CONTRACT.CONTRACT_REF_NO
AND OLTM_CUSTOMER_DEFAULT.CUSTOMER(+) =oltm_customer.CUSTOMER_NO
AND OLTB_CONTRACT.product_code not in (
					SELECT product_code
					FROM OLTM_PRODUCT_ACCROLE
					WHERE accounting_role in ('ASSETGL','CONASSETGL')
					AND account_head ='9999999999'
				      )
AND OLTB_CONTRACT_MASTER.VALUE_DATE <= (SELECT today from sttms_dates where branch_code = (SELECT ho_branch FROM oltms_bank)) --14-OCT-2010 Flexcube V.CL Release 7.8 FS VOL2 Tag 08
AND NVL(OLTB_CONTRACT_BALANCE.hfs_sublimit_amt,0)> 0
AND
  	(
		NVL(OLTB_CONTRACT_BALANCE.principal_outstanding_bal,0) <> 0
  		OR
		(
			SELECT	SUM(NVL(amount_due,0) - NVL(amount_settled,0) - NVL(adjusted_amount,0))
			FROM	oltbs_amount_due_cs
			WHERE	contract_ref_no = OLTB_CONTRACT.contract_ref_no
			AND	component <> 'PRINCIPAL'
		) > 0
  		OR
		(
			SELECT	SUM(NVL(total_amount_liquidated,0)-NVL(till_date_accrual,0))
			FROM	LFTB_ACCR_FEE_MASTER
			WHERE 	contract_ref_no = OLTB_CONTRACT.contract_ref_no
			AND     component IN (SELECT mis_head FROM OLTB_MIS_HEAD_MAPPING WHERE component = 'FEE_COMP') --CITIUS-LS#7035
		) > 0
		OR
		(	SELECT COUNT(1)
			FROM   OLTB_CONTRACT_MTD_YTD_BAL
			WHERE  contract_ref_no = OLTB_CONTRACT.contract_ref_no
			AND    to_date('01-'||month||'-'||year,'DD-MON-YYYY') >= trunc(ADD_MONTHS(global.application_date,-3),'MON')
			AND    year  = to_char(global.application_date,'YYYY')
			AND    (abs(mtd_bal) <> 0 OR abs(mtd_bal_fcy) <> 0 )
		) > 0
		OR
		(
			SELECT	COUNT(1)
			FROM 	TLTB_NET_INCOME_DETAIL
			WHERE	cusip = OLTB_CONTRACT_MASTER.cusip_no
			AND	position_identifier =
				(
					SELECT	participant
					FROM	oltbs_stp_job_browser
					WHERE	borr_reF_no =
						(
							SELECT	lsrefno
							FROM	lbtbs_stp_contract_map
							WHERE	ldrefno =  OLTB_CONTRACT.contract_ref_no
						)
					AND	borr_esn = 1
					AND	ld_ref_no = OLTB_CONTRACT.contract_ref_no
				)
			AND	expense_code =
					(
						SELECT	txn_mis_1
						FROM	OLTB_CLASS_MAPPING
						WHERE	unit_ref_no = OLTB_CONTRACT.contract_ref_no
					)
			AND	ccy_code = OLTB_CONTRACT.contract_ccy
			AND	NVL(tover_lcy,0) <> 0
			AND	book_date BETWEEN TRUNC(ADD_MONTHS(global.application_date,-3),'MON') AND global.application_date
		) > 0
		OR	NVL(OLTB_CONTRACT_BALANCE.reserve_amt,0) <> 0
		OR	NVL(OLTB_CONTRACT_BALANCE.fas114_reserve_amt,0) <> 0
		OR
		(
			SELECT	NVL(loans_outstanding,0) + NVL(principal_outstanding,0) + NVL(lc_loans_outstanding,0)
			FROM	OLTB_FACILITY_DETAILED
			WHERE	facility = OLTB_CONTRACT.contract_ref_no
		) > 0
	)
--3-AUG-2012 Flexcube V.CL Release 7.11, Retro, CITIUS#14332 changes Ends
/
CREATE or replace SYNONYM olvws_qmemo FOR olvw_qmemo
/