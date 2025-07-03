CREATE OR REPLACE FORCE VIEW olvw_draft_comm_hist_details AS 
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_draft_comm_hist_details.vw
**
** Module       : LOANS and DEPOSITS									
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
-----------------------------------------------------------------------------------------------
*/
/*
CHANGE HISTORY
17-MAY-2011 CITIUS RETRO Flexcube V.CL Release 7.9, Cost of Credit Changes created this view
		09-DEC-2010 CITIUS-LS#7554,rapid to flexcube related fixes,history screen was not showing proper rapid contract if multiple recored are there.
					,Changes to incorporate the pending queue changes in summary and draft history screen based on new view
		13-MAY-2011 CITIUS-LS#9300, RAPID CoC Changes
25-MAY-2011 Flexcube V.CL Release 7.9,FS Volume02 Tag03,Non-Performing Loans changes
24-OCT-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag10 IUT2#104 changes
30-OCT-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag10 IUT2#83 changes,added performance_status_id in OLTB_DRAFT_COMMITMENT_PENDING table
*/
SELECT 
	DRAFT_REF_NO, CUSTOMER_NO, PRODUCT_CODE, APPROVAL_STATUS, 
	PROCESS_STATUS, OPERATION, MAKER_ID, MAKER_DT_STAMP, 
	CHECKER_ID, CHECKER_DT_STAMP, MOD_NO, AUTH_STAT, 
	FACILITY_STATUS, EXPENSE_CODE, GFCID, NEW_LIMIT_AMOUNT, 
	NEW_MATURITY_DATE, CONTRACT_REF_NO, FACILITY_TYPE, 
	GLOBAL_AMOUNT, AMENDMENT_DATE, COMMITTED, SWING_LINE, SHARED_LINE,
	-- CITIUS-LS#9300 BEGIN
	carrying_case_percent,
	writeoff_case_percent, 
	risk_loss_case_percent, 
	effective_date
	-- CITIUS-LS#9300 END
	,performance_status_id --25-MAY-2011 Flexcube V.CL Release 7.9,FS Volume02 Tag03,Non-Performing Loans changes
	--21-OCT-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag10 IUT2#69 changes starts
  ,credit_line
  ,txn_effective_date
  ,facility_name
  ,lc_sublimit_amt
  ,loan_admin_name
  ,value_date
  ,agent_cif
  ,department_code
  ,revolving_commitment
  ,ssi_mnemonic
  ,settlement_seq_no
  --21-OCT-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag10 IUT2#69 changes ends
	FROM oltbs_draft_commitment_hist 
UNION 
SELECT 
	DRAFT_REF_NO, CUSTOMER_NO, PRODUCT_CODE, APPROVAL_STATUS, 
	PROCESS_STATUS, OPERATION, MAKER_ID, MAKER_DT_STAMP, 
	CHECKER_ID, CHECKER_DT_STAMP, MOD_NO, AUTH_STAT, 
	FACILITY_STATUS, EXPENSE_CODE, GFCID, NEW_LIMIT_AMOUNT, 
	NEW_MATURITY_DATE, CONTRACT_REF_NO, FACILITY_TYPE, 
	GLOBAL_AMOUNT, AMENDMENT_DATE, COMMITTED, SWING_LINE, SHARED_LINE,
	-- CITIUS-LS#9300 BEGIN
	carrying_case_percent,
	writeoff_case_percent, 
	risk_loss_case_percent, 
	effective_date
	-- CITIUS-LS#9300 END	
	--, ''--25-MAY-2011 Flexcube V.CL Release 7.9,FS Volume02 Tag03,Non-Performing Loans changes
	,performance_status_id--30-OCT-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag10 IUT2#83
	--21-OCT-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag10 IUT2#69 changes starts
 ,''credit_line
 --24-OCT-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag10 IUT2#104 changes start
  --,TO_DATE('01-JAN-1900')txn_effective_date
  ,txn_effective_date
  --,'' facility_name 
  ,customer_desc||' '||facility_type facility_name
  --24-OCT-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag10 IUT2#104 changes end
  , lc_sublimit_amt
  --24-OCT-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag10 IUT2#104 changes start
  --,'' loan_admin_name
  ,loan_admin_name
  --,TO_DATE('01-JAN-1900')value_date
  ,value_date
  ,'' agent_cif
  ,'' department_code
  --,'' revolving_commitment
  ,revolving_commitment
  --24-OCT-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag10 IUT2#104 changes end
  ,'' ssi_mnemonic
  ,0 settlement_seq_no
 --21-OCT-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag10 IUT2#69 changes ends
	FROM OLTB_DRAFT_COMMITMENT_PENDING 
	where upload_status <>'P'
/
CREATE OR REPLACE SYNONYM olvws_draft_comm_hist_details FOR olvw_draft_comm_hist_details
/