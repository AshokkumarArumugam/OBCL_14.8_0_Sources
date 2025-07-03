CREATE OR REPLACE PACKAGE olpks_coc
IS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_coc.SPC
**
** Module       : LD - LOANS AND DEPOSITS
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
---------------------------------------CHANGE HISTORY-----------------------------------------------
08-Mar-2011 Flexcube V.CL Release 7.9, Cost of Credit Changes, Batch Changes, Package newly added
05-May-2011 Flexcube V.CL Release 7.9, Cost of Credit Changes, IUT#36, reval batch function is called for revalaution during SLT online activities also. Changes made to handle the same
13-JUN-2011 Flexcube V.CL Release 7.9, Cost of Credit Changes, 24-MAY-2011 CITIUS-LS#9576 COC Batch processing changes
12-MAR-2012 Flexcube V.CL Release 7.10, CITIUS Retro, TILL#12269,
			05-JAN-2012 CITIUS-LS#12269 Change :CDCRs posted as part of the EOD batch should post the credit side entry to 0010800101 
			instead of being driven by the accounting setup.The Contra decrease batch during the EOD is posting using the 
			current accounting setup for the CDCR event, which is pointed to CUSTOMER.  This is causing suspense breaks with 
			Citichecking since the batch is run after the Citichecking feed
31-JUL-2012 Flexcube V.CL Release 7.11, Retro, CITIUS#14355 Changes, Reverting the fix for till 12269
29-OCT-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol1 Tag05,Cost of Credit-Negative Carrying Values changes,
								1.Added functions to function for processing the FELR on commitment for refund or liquidation.
								2.Added function for processing negative net carry value for commitments
								3.Added function for processing deferred int component processing if CDCR if fired on the Loan.
30-OCT-2012 Flexcube V.CL Release 7.12 FS Tag 02,Added a backup function
26-OCT-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol1 Tag 04, Cost of Credit Phase 2 re-performing loans functionality Changes,Amortization Fees (FAS91 and Marks) Accrual Restart
28-JAN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol1 Tag04,Cost of Credit Phase 2 re-performing loans functionality Changes,Added new function
23-JUL-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 RETRO CITIUS#19881 :Missing CoC change Retro
	20-MAY-2015 CITIUS#19839 changes,COC reperforming loans functionality.
20-AUG-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 RETRO CITIUS#19931 Changes, Loan level negative carrying value was not calculated properly.
**  Modified By     : Narendra Dhaker
**  Modified On     : 17-FEB-2022
**  Modified Reason : Increasing the amount field decimals to maximum
**  Search String   : Bug#33809404_DecimalChange

*/
----------------------------------------------------------------------------------------------------
g_stub_processing	varchar2(1) := 'N';--CITIUS-LS#9576
g_llfncv_contra_fas91	    	varchar2(1) := 'N'; --20-JUL-2015 CITIUS#19931 Changes here
--g_event_from_coc varchar2(1) := 'N'; --31-JUL-2012 Flexcube V.CL Release 7.11, Retro, CITIUS#14355 Changes here commented--12-MAR-2012 Flexcube V.CL Release 7.10, CITIUS Retro, TILL#12269 Change
----------------------------------------------------------------------------------------------------
TYPE rec_amount IS RECORD(principal_os				NUMBER, --Bug#33809404_DecimalChange --NUMBER(22,3)	
			--hfs_balance				NUMBER(22,3), --Bug#33809404_DecimalChange 
			hfs_balance				NUMBER, --Bug#33809404_DecimalChange
			--contra					NUMBER(22,3), --Bug#33809404_DecimalChange 
			contra					NUMBER, --Bug#33809404_DecimalChange
			--writeoff				NUMBER(22,3), --Bug#33809404_DecimalChange 
			writeoff				NUMBER, --Bug#33809404_DecimalChange
			--fas114_reserve				NUMBER(22,3), --Bug#33809404_DecimalChange 
			fas114_reserve				NUMBER, --Bug#33809404_DecimalChange
			--recovery_amt				NUMBER(22,3), --Bug#33809404_DecimalChange 
			recovery_amt				NUMBER, --Bug#33809404_DecimalChange
			--ending_contra				NUMBER(22,3), --Bug#33809404_DecimalChange 
			ending_contra				NUMBER, --Bug#33809404_DecimalChange
			--ending_writeoff				NUMBER(22,3), --Bug#33809404_DecimalChange 
			ending_writeoff				NUMBER, --Bug#33809404_DecimalChange
			--ending_reserve				NUMBER(22,3), --Bug#33809404_DecimalChange 
			ending_reserve				NUMBER, --Bug#33809404_DecimalChange
			--net_carry_value				NUMBER(22,3), --Bug#33809404_DecimalChange 
			net_carry_value				NUMBER, --Bug#33809404_DecimalChange
			--fas114_reserve_build			NUMBER(22,3), --Bug#33809404_DecimalChange 
			fas114_reserve_build			NUMBER, --Bug#33809404_DecimalChange
			--fas114_reserve_release			NUMBER(22,3), --Bug#33809404_DecimalChange 
			fas114_reserve_release			NUMBER, --Bug#33809404_DecimalChange
			--curr_action_writeoff			NUMBER(22,3), --Bug#33809404_DecimalChange 
			curr_action_writeoff			NUMBER, --Bug#33809404_DecimalChange
			--curr_action_recovery			NUMBER(22,3), --Bug#33809404_DecimalChange 
			curr_action_recovery			NUMBER, --Bug#33809404_DecimalChange
			--curr_action_contra			NUMBER(22,3)); --Bug#33809404_DecimalChange 
			curr_action_contra			NUMBER); --Bug#33809404_DecimalChange
------------------------------------------------------------------------
FUNCTION fn_reval_batch
	(p_branch		IN 	oltbs_contract_master.branch%TYPE
	,p_processing_date	IN	DATE
	,p_error_code		IN OUT  VARCHAR2
	,p_error_param		IN OUT  VARCHAR2
	,p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE DEFAULT 'ALL')
RETURN BOOLEAN;
------------------------------------------------------------------------
FUNCTION fn_populate_coc_balances
	(p_branch		IN 	oltbs_contract_master.branch%TYPE
	,p_processing_date	IN	DATE	
	,p_error_code		IN OUT  VARCHAR2
	,p_error_param		IN OUT  VARCHAR2
	,p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE DEFAULT 'ALL')
RETURN BOOLEAN;
------------------------------------------------------------------------
FUNCTION fn_populate_commitment_coc
	(p_branch		IN 	oltbs_contract_master.branch%TYPE
	,p_processing_date	IN	DATE	
	,p_error_code		IN OUT  VARCHAR2
	,p_error_param		IN OUT  VARCHAR2
	,p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE DEFAULT 'ALL')	
RETURN BOOLEAN;
--------------------------------------------------------------------------------------------
FUNCTION fn_populate_commitment_bal
	(p_contract_ref_no		IN oltbs_contract.contract_ref_no%TYPE
	,p_processing_date		IN DATE		
	,p_error_code		IN OUT  VARCHAR2
	,p_error_param		IN OUT  VARCHAR2)
RETURN BOOLEAN;
------------------------------------------------------------------------
FUNCTION fn_populate_loan_coc
	(p_branch		IN 	oltbs_contract_master.branch%TYPE
	,p_processing_date	IN	DATE	
	,p_error_code		IN OUT  VARCHAR2
	,p_error_param		IN OUT  VARCHAR2
	,p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE DEFAULT 'ALL')
RETURN BOOLEAN;
------------------------------------------------------------------------
FUNCTION fn_populate_loan_bal
	(p_commitment_ref_no	IN	oltbs_contract.contract_ref_no%TYPE	
	,p_processing_date	DATE
	,p_error_code		IN OUT  VARCHAR2
	,p_error_param		IN OUT  VARCHAR2)	
RETURN BOOLEAN;
------------------------------------------------------------------------
FUNCTION fn_populate_loan_bal
	(p_commitment_ref_no	IN	oltbs_contract.contract_ref_no%TYPE
	,p_loan_ref_no		IN	oltbs_contract.contract_ref_no%TYPE
	,p_processing_date	DATE
	,p_error_code		IN OUT  VARCHAR2
	,p_error_param		IN OUT  VARCHAR2)
RETURN BOOLEAN;
------------------------------------------------------------------------
FUNCTION fn_get_cmtmnt_ccy_amount
	(p_commitment_ref_no	IN	VARCHAR2
	,p_loan_ref_no		IN	VARCHAR2
	,p_commitment_ccy	IN	VARCHAR2
	,p_loan_ccy		IN	VARCHAR2
	,p_amount		IN	REC_AMOUNT)
	--,p_exchange_rate	IN OUT oltbs_contract_linkages.exchange_rate%TYPE)--04may11	
RETURN REC_AMOUNT;
------------------------------------------------------------------------
FUNCTION fn_update_commitment_bal
	(p_branch		IN 	oltbs_contract_master.branch%TYPE
	,p_processing_date	IN	DATE	
	,p_error_code		IN OUT  VARCHAR2
	,p_error_param		IN OUT  VARCHAR2
	,p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE DEFAULT 'ALL')
RETURN BOOLEAN;
------------------------------------------------------------------------
FUNCTION fn_get_amort_fee_amount
	(p_contract_ref_no	IN oltbs_contract.contract_ref_no%TYPE
	,p_marks		IN VARCHAR2)
RETURN NUMBER;
------------------------------------------------------------------------
FUNCTION fn_update_loan_bal
	(p_branch		IN 	oltbs_contract_master.branch%TYPE
	,p_processing_date	IN	DATE	
	,p_error_code		IN OUT  VARCHAR2
	,p_error_param		IN OUT  VARCHAR2
	,p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE DEFAULT 'ALL')
RETURN BOOLEAN;
------------------------------------------------------------------------
FUNCTION fn_update_loan_bal
	(p_commitment_ref_no	IN 	oltbs_contract.contract_ref_no%TYPE
	,p_loan_ref_no		IN 	oltbs_contract.contract_ref_no%TYPE
	,p_processing_date	IN	DATE
	,p_error_code		IN OUT  VARCHAR2
	,p_error_param		IN OUT  VARCHAR2)
RETURN BOOLEAN;
------------------------------------------------------------------------
FUNCTION fn_validate_coc
	(p_contract_ref_no	oltbs_contract.contract_ref_no%TYPE
	,p_processing_date	DATE
	,p_error_code		IN OUT  VARCHAR2
	,p_error_param		IN OUT  VARCHAR2)
RETURN BOOLEAN;
------------------------------------------------------------------------
FUNCTION fn_compute_fas114resrel 
	(p_contract_ref_no	oltbs_contract.contract_ref_no%TYPE
	,p_processing_date	DATE
	,p_error_code		IN OUT  VARCHAR2
	,p_error_param		IN OUT  VARCHAR2)
RETURN BOOLEAN;
------------------------------------------------------------------------
PROCEDURE pr_update_coc_status
	(p_contract_ref_no	IN oltbs_contract.contract_ref_no%TYPE
	,p_effective_date	IN oltbs_contract_coc.effective_date%TYPE
	,p_coc_valuation_status	IN oltbs_contract_coc.coc_valuation_status%TYPE
	,p_error_code		IN OUT VARCHAR2);
------------------------------------------------------------------------
FUNCTION fn_archive_coc_balance --05-May-2011 Flexcube V.CL Release 7.9, Cost of Credit Changes, IUT#36 starts
	(p_branch		IN 	oltbs_contract_master.branch%TYPE
	,p_processing_date	IN	DATE
	,p_error_code		IN OUT  VARCHAR2
	,p_error_param		IN OUT  VARCHAR2
	,p_contract_ref_no	IN 	oltbs_contract.contract_ref_no%TYPE DEFAULT 'ALL')
RETURN BOOLEAN;--05-May-2011 Flexcube V.CL Release 7.9, Cost of Credit Changes, IUT#36 ends
------------------------------------------------------------------------
--29-OCT-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol1 Tag05,Cost of Credit-Negative Carrying Values changes start
FUNCTION fn_fas91_amort_fee_process
										(
										p_contract_ref_no		IN 		VARCHAR2
										,p_processing_date		IN 		DATE
										,p_felr_amount			IN 		NUMBER
										,p_liq_or_refund		IN		VARCHAR2	--This parameter is to identify whether the amount is to be liquidated or refunded-- L-> liquidatiion or R-> Refund
										,p_component			IN		VARCHAR2	--roomana changes
										,p_event_seq_no			IN		NUMBER--kunsal added
										,p_loan_ref_no			IN 		oltbs_contract.contract_ref_no%TYPE
										,p_error_code			IN OUT 	VARCHAR2
										,p_error_param			IN OUT 	VARCHAR2
										,p_amort_accr_restart 		IN 	VARCHAR2 DEFAULT 'N'--26-OCT-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol#1 Tag#4, Cost of Credit Changes
										,p_negative_carrying_flag	IN VARCHAR2 DEFAULT 'N'--roomana changes										 
										)
RETURN BOOLEAN;
------------------------------------------------------------------------
FUNCTION fn_commitment_ncv_process
									(
									p_contract_ref_no	IN		VARCHAR2 DEFAULT 'ALL'
									,p_branch			IN		VARCHAR2
									,p_processing_date	IN		DATE
									,p_error_code		IN OUT  VARCHAR2
									,p_error_param		IN OUT  VARCHAR2
									)
RETURN BOOLEAN;
------------------------------------------------------------------------
FUNCTION fn_get_amort_fee_amt_comp
								(p_contract_ref_no		IN 	VARCHAR2
								,p_component			IN 	VARCHAR2
								,p_marks				IN 	VARCHAR2
								,p_deffered_int_comp	IN 	VARCHAR2
								)
RETURN NUMBER;
------------------------------------------------------------------------
FUNCTION fn_comm_def_intcomp_process
									(
									p_contract_ref_no	IN		VARCHAR2
									,p_processing_date	IN		DATE
									,p_liqd_amount		IN 		NUMBER
									,p_loan_ref_no		IN		oltbs_contract.contract_ref_no%TYPE
									,p_error_code		IN OUT  	VARCHAR2
									,p_error_param		IN OUT  	VARCHAR2									
									)
RETURN BOOLEAN;
--29-OCT-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol1 Tag05,Cost of Credit-Negative Carrying Values changes end
------------------------------------------------------------------------
--30-OCT-2012 Flexcube V.CL Release 7.12 FS Tag 02 STARTS
FUNCTION fn_backup
	(
	p_contract_ref_no	IN 		VARCHAR2
	,p_commitment_ref_no	IN 		VARCHAR2	
	,p_error_code		IN OUT 		VARCHAR2
	,p_error_param		IN OUT 		VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_restore
	(
	p_contract_ref_no	IN 		VARCHAR2
	,p_commitment_ref_no	IN 		VARCHAR2	
	,p_error_code		IN OUT 		VARCHAR2
	,p_error_param		IN OUT 		VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_pop_events_for_reversal
	(
	p_contract_ref_no	IN	VARCHAR2
	,p_com_ref_no		IN	VARCHAR2
	,p_error_code		IN OUT	VARCHAR2
	,p_error_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_process_reversal
	(
	p_contract_ref_no		IN	VARCHAR2
	 ,p_reversed_event_seq_no	IN	NUMBER
	,p_event_code			IN	VARCHAR2
	,p_error_code			IN OUT	VARCHAR2
	,p_error_param			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
FUNCTION fn_process_deletion
	(
	p_contract_ref_no		IN	VARCHAR2
	,p_reversed_event_seq_no	IN	NUMBER
	,p_error_code			IN OUT	VARCHAR2
	,p_error_params			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--30-OCT-2012 Flexcube V.CL Release 7.12 FS Tag 02 ENDS
--28-JAN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol1 Tag04 changes start
FUNCTION fn_pop_loan_to_comm_fas91_bal
								(
									p_commitment_ref_no		IN		VARCHAR2
									,p_loan_ref_no			IN		VARCHAR2
									,p_fliq_esn				IN		NUMBER
									,p_memo_contra_flag		IN		VARCHAR
									,p_amount_loan_ccy		IN		NUMBER
									,p_amount_comm_ccy		IN		NUMBER
									,p_error_code			IN OUT	VARCHAR2
									,p_error_param			IN OUT	VARCHAR2
								)
RETURN BOOLEAN;
--28-JAN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol1 Tag04 changes end

--20-MAY-2015 CITIUS#19839 changes start
FUNCTION fn_coc_new
	(
	p_module   		IN	oltbs_contract.module_Code%TYPE,  
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter	IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION Fn_coc_amend
	(
	p_module   		IN	oltbs_contract.module_Code%TYPE,
	p_contract_ref_no	IN	lftbs_contract_accr_fee.contract_ref_no%TYPE,
	p_event_seq_no		IN	lftbs_contract_accr_fee.event_seq_no%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter	IN OUT	VARCHAR2,
	p_sch_reqd		IN VARCHAR2 DEFAULT 'Y'
	)
RETURN BOOLEAN;
--20-MAY-2015 CITIUS#19839 changes end

END olpks_coc;
/
CREATE OR REPLACE SYNONYM olpkss_coc FOR olpks_coc
/