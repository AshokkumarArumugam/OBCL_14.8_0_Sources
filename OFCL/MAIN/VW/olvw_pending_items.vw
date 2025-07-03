CREATE OR REPLACE force VIEW olvw_pending_items ( BR, MD, RN, MT, EV, ID,DP )
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_pending_items.VW
**
** Module	: CORE SERVICES
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
/*
  **Changed By         : Shishirkumar Aithal
  **Date               : 28-Nov-2017
  **Change Description : BUG 26932862 - OL-OLSVWPNT EOD IS NOT STOPPED EVEN WHEN MAINTENANCES ARE IN UNAUTHORIZED STATUS
  **Search String      : Bug#26932862
*/
/*
  **Changed By         : Vigneshram S
  **Date               : 16-Apr-2018
  **Change Description : 14.1 Loan Simulation and Inactive contract 
  **Search String      : 14.1_LOAN_SIM
 /* 
  **Changed By         : Gomathi G
  **Date               : 21-MAY-2020
  **Change Description : Subquery used in the IN Clause might return NULL if there are no disallowed products. 
						 Replaced with NOT EXISTS clause as it would handle NULL condition and also to adhere to better coding standards practice.
  **Search String      : OBCL_14.3_SUPPORT_BUG#31381563  CHANGES
*/
/* 
	**  Changed By         : Chandra Prasath N
	**  Date               : 12-May-2021
	**  Change Description : Added code for 24/7 operation.                                                                   
	**  Search String      : OBCL_14.5_24_7 Changes
*/
/* 
	**  Changed By         : Chandra Prasath N
	**  Date               : 13-APR-2022
	**  Change Description : Added code for 24/7 Rollover/Reprice operation.                                                                   
	**  Search String      : OBCL_14.5_24_7_P3 Changes
	
  ** Changed  By        : Abhinav Bhasker
  ** Changed  Dt        : 25-JAN-2023
  **Change Description  : Module Code Correction
  **Serach String       : BUG#34981621
*/
 SELECT    DISTINCT   (SELECT sypks_utils.get_branch(A.CONTRACT_REF_NO) FROM DUAL) br,
       			 a.module md,
       		         a.contract_ref_no rn,			 '' mt, 
			 A.EVENT_CODE ev,      			 maker_id id,
     			 '' dp	FROM	 oltbs_contract_event_log a 	WHERE   
			a.auth_status 	= 	'U' and 			a.maker_dt_stamp >	(select prev_working_day
						 from sttm_dates
						 where branch_code = ( select ho_branch from oltm_bank )
						) and 
  			NVL(a.contract_status,'X') <> 'H' 
       --OBCL_14.3_SUPPORT_BUG#31381563 CHANGES STARTS
  AND /*a.contract_ref_no not in (select contract_ref_no from oltbs_contract  where contract_status='I')*/
  NOT EXISTS(
           select 1 from oltbs_contract where contract_status='I' AND 
            a.contract_ref_no = oltbs_contract.contract_ref_no
             )
  --OBCL_14.3_SUPPORT_BUG#31381563 CHANGES ENDS
	--OBCL_14.5_24_7 Changes starts
	and not exists (select 1 from oltbs_24x7_process_contracts 
											where CONTRACT_REF_NO = a.contract_ref_no
											 and PROCESS_STATUS in ('U'))
	--OBCL_14.5_24_7 Changes ends
 	AND 	a.module <> 'SI' 
UNION ALL	
	SELECT   branch_code br, 
		       NVL(Branch_Module,'MA') md, --BUG#34981621
       			--object_desc rn,--Commenting for Bug#26932862
				function_id rn , --Bug#26932862
       			mt, 
       			EVENT EV, 
       			USER_ID ID, 
       			NULL
	FROM      olvws_unauth_forms
UNION ALL
	SELECT  "BR","MD","RN","MT","EV","ID","DP" from olvws_pending_items_de
UNION ALL
	SELECT  "BR","MD","RN","MT","EV","ID",NULL from olvws_pending_items_cy
UNION ALL
	SELECT "BR","MD","RN","MT","EV","ID",NULL from olvws_pending_items_ac
UNION ALL 
	SELECT "BR","MD","RN","MT","EV","ID",NULL from olvws_pending_items_ms
UNION ALL
	SELECT   branch_code,'OL',NULL,COD_SYSTEM,'EOD Signal missing',NULL,NULL 
	FROM	oltbs_eod_status, oltms_branch  where eod_status='N'
UNION ALL
	SELECT   branch_code,'OL',NULL,COD_SYSTEM,'EOD Signal missing',NULL,NULL
	FROM      oltbs_cpc_eod_status, oltms_branch  where eod_status='N'
UNION ALL
	SELECT   branch_code,
	--BUG#34981621 Start
	--'OL'
	MODULE_ID
	--BUG#34981621 End
	,NULL,'CB2', MODULE_ID||' Job is running',NULL,NULL
	FROM      oltbs_olq_ctl, oltms_branch  where running='Y'
UNION ALL
	SELECT   branch_code, 'OL', NULL, 'GONIEC', ' Job is running', NULL, NULL 
	From        oltbs_bg_status_if, oltms_branch  
	Where      Process = 'GONIEC'
	And	       Active = 'Y'
UNION ALL
	SELECT	branch_code, 'OL', 'TRIMS-NEW', NULL, ' Job is running', NULL, NULL 
	FROM	oltbs_bg_status_if, oltms_branch  
	WHERE	process = 'TRIMS-NEW'
	AND	active = 'Y'	
UNION ALL
	SELECT	branch_code, 'OL', 'TRIMS-AMEND', NULL, ' Job is running', NULL, NULL 
	FROM	oltbs_bg_status_if, oltms_branch  
	WHERE	process = 'TRIMS-AMEND'
	AND	active = 'Y'	
UNION ALL 
	SELECT  (SELECT sypks_utils.get_branch(TRN_REF_NO) FROM DUAL) BR,
	--BUG#34981621 Start
	--'OL' 
	MODULE
	--BUG#34981621 End
	MD,trn_ref_no RN, NULL, Event EV, user_id ID, NULL 
	FROM     oltbs_daily_log_ac 
	where 	auth_stat = 'U'
	AND		delete_stat <> 'D'             
	AND  (SELECT sypks_utils.get_product(TRN_REF_NO) FROM DUAL) = 'ZOAC'  
UNION
	SELECT 
	--BUG#34981621 Start
		DISTINCT (SELECT sypks_utils.get_branch(S.CONTRACT_REF_NO) FROM DUAL) BR,
	--sypks_utils.get_branch(CONTRACT_REF_NO) BR,
	--'OL' 
	o.MODULE_CODE
	--BUG#34981621 End
	MD,
	s.contract_ref_no RN,NULL, 'SPLT' EV,'REPRICE_JOB' ID, NULL
	FROM	oltbs_contract_split_master s, sttm_dates d
	, oltbs_contract o  --BUG#34981621
	WHERE	s.auth_stat = 'A'
	AND o.contract_ref_no = s.contract_ref_no  --BUG#34981621
	AND	s.record_stat = 'O'
	AND	s.split_status = 'U'
	AND	s.split_book_date <= d.today
	AND	o.branch = d.branch_code --OBCL_14.8_CE_Length_Changes
	--OBCL_14.5_24_7_P3 Changes starts
	AND NOT EXISTS (select 1 from oltbs_24x7_process_contracts 
											where CONTRACT_REF_NO = contract_ref_no
											 and PROCESS_STATUS in ('U')
                       and FUNCTION_ID = 'OLDREPRS')
	--OBCL_14.5_24_7_P3 Changes ends
UNION
SELECT (SELECT sypks_utils.get_branch(CONTRACT_REF_NO) FROM DUAL) BR,'LP' MD,contract_ref_no RN ,NULL "MT", 'SSI Propagation' "EV",'SSI-PROP-JOB' "ID",NULL "DP"
FROM   lbtbs_propagate_mnemonic
WHERE  process_status = 'E'
AND	   error_code	  = 'OL-VAL200'
UNION
	SELECT	branch_code			br,
			NULL				md,
			NULL				rn,
			NULL				mt,
			'Pending authorization of local holidays'	 ev,
			maker_id			id,
			NULL				dp			
	FROM		oltws_lcl_hol_master
	WHERE		auth_stat	=	'U'
UNION
	SELECT b.branch br,b.module_code md,a.contract_ref_no rn,NULL mt,'Pending Participant Transfer' ev,a.maker_id id,	NULL dp
	FROM lbtw_transfer_master a,oltbs_contract b
	WHERE a.contract_ref_no = b.contract_ref_no
	AND a.entry_seq_no = (
			SELECT MAX(c.entry_seq_no) FROM lbtw_transfer_master c
			WHERE c.contract_ref_no = a.contract_ref_no)
UNION ALL
SELECT 	branch, 
--BUG#34981621 Start
	--'OL' 
	MODULE
	--BUG#34981621 End
, reference_no, dcn, 'Unauthorized', maker_id,null
  FROM 	oltbs_dly_msg_out
WHERE  branch_date = GLOBAL.application_date 
     AND PDE_status = 'Y'
UNION ALL
SELECT 	(SELECT sypks_utils.get_branch(TRANCHE_REF_NO) FROM DUAL) br,'LB' md, tranche_ref_no rn, null mt,'MEI code change' ev,maker_id id ,null dp
  FROM 	lbtbs_tranche_mei_change
WHERE  process_status IN  ('F','U')
AND		process_date = GLOBAL.application_date
UNION ALL
SELECT branch_code br, 
--BUG#34981621 Start
	--'OL' 
	MODULE_CODE
	--BUG#34981621 End
md, reference_no, dcn , 'FPML UnGenerated' ev, NULL id, null dp
FROM	oltbs_fpml_msg_out f
,oltbs_contract o --BUG#34981621
WHERE	msg_status IN ('N','G')
AND 	f.reference_no = o.contract_ref_no --BUG#34981621
AND		branch_date = GLOBAL.application_date
 UNION
SELECT branch, 'OL', reference_no, dcn, 'Unauthorized', maker_id,null
  FROM oltbs_dly_msg_in
WHERE branch_date = GLOBAL.application_date 
    AND PDE_status = 'Y'
UNION ALL
SELECT 	DISTINCT (SELECT sypks_utils.get_branch(T.CONTRACT_REF_NO) FROM DUAL), 
--BUG#34981621 Start
--'TL'
o.MODULE_CODE
--BUG#34981621 End
, t.contract_ref_no, '' mt, 'Unauthorized', t.maker_id,null
  FROM 	tltbs_fmem_lor_int_params t
,oltbs_contract o --BUG#34981621
WHERE   nvl(t.auth_status,'X') = 'U'
AND t.contract_ref_no = o.contract_ref_no --BUG#34981621
UNION ALL
SELECT	(SELECT sypks_utils.get_branch(TRADE_REF_NO) FROM DUAL),'TL',NVL(trade_ref_no,markit_trade_id),'' mt,'Trade is Unauthorised in settlement queue',NULL id,NULL dp
FROM	tltbs_markit_trade_settl_queue
WHERE	auth_stat='U'
UNION ALL
	SELECT	b.branch r,module md,a.reference_no rn,null mt,'Pending Expense code Reclass' ev, a.maker_id id,null dp --25-JUN-2014 EURCITIPLC#19113 changes added
	FROM	oltbs_expense_code_reclass_mas a,oltbs_exp_code_reclass_master b
	WHERE 	a.reference_no 		= b.reference_no
	AND		b.process_status 	IN ('U','F')
	AND		a.auth_stat			= 'A'
	AND   	NVL(b.rejected,'N') = 'N'
UNION ALL	
	SELECT	branch r,module md,contract_ref_no rn,null mt,'Pending Cusip No Reclass' ev, maker_id id,null dp
	FROM	OLTB_CUSIP_RECLASS_MASTER a
	WHERE 	process_status 	IN ('U','F')
	AND	auth_stat	= 'A'
	AND   	NVL(rejected,'N') = 'N'
/
create or replace synonym olvws_pending_items for olvw_pending_items
/