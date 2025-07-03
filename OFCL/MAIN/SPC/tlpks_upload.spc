CREATE OR REPLACE PACKAGE tlpks_upload AS
/*----------------------------------------------------------------------------------------------------
**
** File Name		: tlpks_upload.SPC
**
** Module		: LT - SECONDARY LOAN TRADING
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
**
----------------------------------------------------------------------------------------------------
*/

/*---------------------------------CHANGE HISTORY-----------------------------------------------
06-JUN-2008 FLEXCUBE V.CL 7.4 RELEASE ,NEW UNIT CREATED FOR DRAFT UPLOAD
30-DEC-2008 FLEXCUBE V.CL Release 7.4 MTR1 SFR#121 Changes
	    1)Skipped the validation for trade amount against tranche amount (LT-C0033) if the associated agency is of Non Lead type(Participation).
	    2)Skipped the validation for Global trade amount of CUSIP against global tranche amount (LT-C0102) if the associated agency is of Non Lead type(Participation).
10-FEB-2009 FLEXCUBE V.CL Release 7.4 ITR2 SFR#72 Changes, Maneeha
		 wrote a function to get the trade ref no based on existing cusip and deal type of trade, and update fmem status
29-JUL-2009 CITIUS-LS#6071 system should post unamort Fee refund during Trade Booking and unamort Fee upload during Trade Reversal
10-OCT-2009 CITIUS-LS#6751 Changes for New utility screen to process all SLT operations in one screen to take the debug
29-Dec-2009 FLEXCUBE V.CL Release 7.6 UT#371 Post CLP/STP items change,Recomputation of amortization fee
12-MAR-2010 FLEXCUBE V.CL Release 7.6 UK SLT Changes
25-JUL-2010 FLEXCUBE V.CL Release 7.7 VOL4 FS Tag 06 CHANGES,New function Fn_process_buy_unamort_fee is added to process buy unamort fee
26-NOV-2010 FLEXCUBE V.CL Release 7.8 VOL2 FS Tag 04, SLT Commitment Increase/Decrease Changes
08-DEC-2010 FLEXCUBE V.CL Release 7.8 Retro,
21-JAN-2010 CITIUS-LS#7078 Unamort fee is to be recomputed while confirming the origination queue--CITIUS-LS#7518 catch up retro
18-MAR-2011 Flexcube V.CL Release 7.9, Cost of Credit Changes, Writeoff amount,FAS114_reserve_amount and Marks fee amount has been added to origination queue.Based on COC flag unamortised fees amount will be calculated excluding marks fee amount.Marks fee will be driven by a flag at lftbs_contract_accr_fee.
04-MAY-2011 Flexcube V.CL Release 7.9, Cost of Credit Changes, IUT#42, Introduced a new flag to identify if origination queue is populated during trade capture or during trade processing.
05-JAN-2012 Flexcube V.CL Release 7.10 FS Tag 10 Changes - Trade Amendment and Broker Fees
03-DEC-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol#1 Tag#9, Secondary Loans Trading - Drawdown Straight Through Processing - changes
21-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol1 Tag03 changes,below new functions are added,
	    fn_hfs_orig_trade_upload,fn_check_hfs_portfolio,fn_pop_origination_queue_hfs 
16-OCT-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 RETRO EURCITIPLC#20226 changes: After changing the quotation from SWOA to FLAT, system is not reversing the till date accruals on trade
**  Modified By     : Narendra Dhaker
**  Modified On     : 17-FEB-2022
**  Modified Reason : Increasing the amount field decimals to maximum
**  Search String   : Bug#33809404_DecimalChange

------------------------------END CHANGE HISTORY----------------------------------------------
*/

g_pop_orig_que_processing	VARCHAR2(1); --04-MAY-2011 Flexcube V.CL Release 7.9, Cost of Credit Changes, IUT#42,changes
g_event_direct_from_lt		VARCHAR2(1); --04-MAY-2011 Flexcube V.CL Release 7.9, Cost of Credit Changes, IUT#42,changes
TYPE p_Record_Upload_Exception IS TABLE OF tltbs_contract_exception%ROWTYPE INDEX BY BINARY_INTEGER;
lTbl_Upload_Exception p_Record_Upload_Exception;

--29-Dec-2009 FLEXCUBE V.CL Release 7.6 UT#371 Post CLP/STP items change,Recomputation of amortization fee start
TYPE p_ld_record IS RECORD
(
ext_contract_ref_no	VARCHAR2(16),
loan_contract_ref_no	VARCHAR2(16),
component	        VARCHAR2(10),
version_no		NUMBER(4),
trade_ref_no		VARCHAR2(16),
contract_type	  	CHAR(1),
--contra_amount       	NUMBER(22,3), --Bug#33809404_DecimalChange 
contra_amount       	NUMBER, --Bug#33809404_DecimalChange
--reserve_amount      	NUMBER(22,3), --Bug#33809404_DecimalChange 
reserve_amount      	NUMBER, --Bug#33809404_DecimalChange
--unamortized_fee_amount 	NUMBER(22,3), --Bug#33809404_DecimalChange 
unamortized_fee_amount 	NUMBER, --Bug#33809404_DecimalChange
--trade_ccy_contra_bal	NUMBER(22,3), --Bug#33809404_DecimalChange 
trade_ccy_contra_bal	NUMBER, --Bug#33809404_DecimalChange
--trade_ccy_reserve_bal	NUMBER(22,3), --Bug#33809404_DecimalChange 
trade_ccy_reserve_bal	NUMBER, --Bug#33809404_DecimalChange
--18-MAR-2011 Flexcube V.CL Release 7.9, Cost of Credit Changes start
--writeoff_amount		NUMBER(22,3), --Bug#33809404_DecimalChange 
writeoff_amount		NUMBER, --Bug#33809404_DecimalChange
--fas114_reserve_amount	NUMBER(22,3), --Bug#33809404_DecimalChange 
fas114_reserve_amount	NUMBER, --Bug#33809404_DecimalChange
--trade_ccy_writeoff_bal	NUMBER(22,3), --Bug#33809404_DecimalChange 
trade_ccy_writeoff_bal	NUMBER, --Bug#33809404_DecimalChange
--trade_ccy_fas114_reserve_bal	NUMBER(22,3), --Bug#33809404_DecimalChange 
trade_ccy_fas114_reserve_bal	NUMBER, --Bug#33809404_DecimalChange
marks_fee		VARCHAR2(1)
--18-MAR-2011 Flexcube V.CL Release 7.9, Cost of Credit Changes end
);

TYPE tbl_ld_record IS TABLE OF p_ld_record INDEX BY BINARY_INTEGER;
--29-Dec-2009 FLEXCUBE V.CL Release 7.6 UT#371 Post CLP/STP items change,Recomputation of amortization fee end

l_valid BOOLEAN;
l_errno NUMBER;
FUNCTION fn_process_trade
(
p_branch		IN TLTB_UPLOAD_MASTER.branch%TYPE,
p_err_code		IN OUT VARCHAR2,
p_err_params		IN OUT VARCHAR2
,p_ext_contract_ref_no 	IN	tltbs_upload_master.ext_contract_ref_no%TYPE DEFAULT 'ALL'--CITIUS-LS#6751
)
RETURN BOOLEAN;
FUNCTION fn_trade_validations
(
p_ext_contract_ref_no	IN TLTB_UPLOAD_MASTER.ext_contract_ref_no%TYPE,
p_source_code		IN TLTB_UPLOAD_MASTER.source_code%TYPE,
p_branch		IN TLTB_UPLOAD_MASTER.branch%TYPE,
p_version_no		IN TLTB_UPLOAD_MASTER.version_no%TYPE,
p_valid			OUT BOOLEAN,
p_err_code		IN OUT VARCHAR2,
p_err_params		IN OUT VARCHAR2
)
RETURN BOOLEAN;
FUNCTION fn_insert_errors
(
p_ext_contract_ref_no	IN TLTB_UPLOAD_MASTER.ext_contract_ref_no%TYPE,
p_err_code		IN OUT VARCHAR2,
p_err_params		IN OUT VARCHAR2
)
RETURN BOOLEAN;
FUNCTION fn_agency_validations
(
p_ext_contract_ref_no	IN TLTB_UPLOAD_MASTER.ext_contract_ref_no%TYPE,
p_source_code		IN TLTB_UPLOAD_MASTER.source_code%TYPE,
p_branch		IN TLTB_UPLOAD_MASTER.branch%TYPE,
p_version_no		IN TLTB_UPLOAD_MASTER.version_no%TYPE,
p_valid			OUT BOOLEAN,
p_err_code		IN OUT VARCHAR2,
p_err_params		IN OUT VARCHAR2
)
RETURN BOOLEAN;
PROCEDURE pr_log_err
(
p_ext_contract_ref_no	IN TLTB_CONTRACT_EXCEPTION.ext_contract_ref_no%TYPE,
p_version		IN NUMBER,
p_source_code		IN TLTB_CONTRACT_EXCEPTION.source_code%TYPE,
p_seq_no		IN OUT NUMBER,
p_err_code		IN VARCHAR2,
p_error_params		IN TLTB_CONTRACT_EXCEPTION.error_param%TYPE,
p_valid			OUT NOCOPY BOOLEAN
);
PROCEDURE pr_trade_job
(
	p_branch				IN 	VARCHAR2
);
FUNCTION fn_propogate_trade
(
p_ext_contract_ref_no   IN TLTB_UPLOAD_MASTER.ext_contract_ref_no%TYPE,
p_source_code		IN TLTB_UPLOAD_MASTER.source_code%TYPE,
p_branch		IN TLTB_UPLOAD_MASTER.branch%TYPE,
p_version_no		IN TLTB_UPLOAD_MASTER.version_no%TYPE,
p_err_code	        IN OUT VARCHAR2,
p_err_params	        IN OUT VARCHAR2
)
RETURN BOOLEAN;
FUNCTION fn_resolve_events
(
p_ext_contract_ref_no   IN oltbs_contract.contract_ref_no%TYPE,
p_trade_ref_no		IN oltbs_contract.contract_ref_no%TYPE,
p_source_code		IN tltbs_upload_master.source_code%TYPE,
p_version_no		IN oltbs_contract.latest_version_no%TYPE,
p_branch		IN tltbs_upload_master.branch%TYPE,
p_product		IN tltms_product_master.product%TYPE,
p_ticket_id		IN tltbs_upload_master.ticket_id%TYPE,
p_elevated_version	IN tltbs_upload_master.elevated_version%TYPE,
p_ext_action_code	IN tltbs_upload_master.ext_action_code%TYPE,
p_err_code		IN OUT VARCHAR2,
p_err_params		IN OUT VARCHAR2
)
RETURN BOOLEAN;
FUNCTION fn_populate_events
(
p_ext_contract_ref_no   IN oltbs_contract.contract_ref_no%TYPE,
p_trade_ref_no		IN oltbs_contract.contract_ref_no%TYPE,
p_event_code		IN oltbs_contract.curr_event_code%TYPE,
p_tcnc_check		IN VARCHAR2,
p_version_no		IN oltbs_contract.latest_version_no%TYPE,
p_seq_no		IN OUT NUMBER,
p_err_code		IN OUT VARCHAR2,
p_err_params		IN OUT VARCHAR2
)
RETURN BOOLEAN;
FUNCTION fn_trade_contract_validations
(
p_ext_contract_ref_no	IN TLTB_UPLOAD_MASTER.ext_contract_ref_no%TYPE,
p_source_code		IN TLTB_UPLOAD_MASTER.source_code%TYPE,
p_branch		IN TLTB_UPLOAD_MASTER.branch%TYPE,
p_version_no		IN TLTB_UPLOAD_MASTER.version_no%TYPE,
p_valid			OUT BOOLEAN,
p_err_code		IN OUT VARCHAR2,
p_err_params		IN OUT VARCHAR2
)
RETURN BOOLEAN;
FUNCTION fn_check_new
(
p_ext_contract_ref_no	IN oltbs_contract.contract_ref_no%TYPE,
p_version_no		IN oltbs_contract.latest_version_no%TYPE,
p_source_code		IN tltbs_upload_master.source_code%TYPE,
p_branch		IN tltbs_upload_master.branch%TYPE,
p_product		IN tltms_product_master.product%TYPE,
p_seq_no		IN OUT NUMBER,
p_err_code		IN OUT VARCHAR2,
p_err_params		IN OUT VARCHAR2
)
RETURN BOOLEAN;
FUNCTION fn_check_reverse
(
p_ext_contract_ref_no	IN oltbs_contract.contract_ref_no%TYPE,
p_trade_ref_no		IN oltbs_contract.contract_ref_no%TYPE,
p_source_code		IN TLTB_UPLOAD_MASTER.source_code%TYPE,
p_version_no		IN oltbs_contract.latest_version_no%TYPE,
p_branch		IN TLTB_UPLOAD_MASTER.branch%TYPE,
p_seq_no		IN OUT NUMBER,
p_event_check		IN OUT VARCHAR2,
p_err_code		IN OUT VARCHAR2,
p_err_params		IN OUT VARCHAR2
)
RETURN BOOLEAN;
FUNCTION fn_check_canc_amend
(
p_ext_contract_ref_no	IN oltbs_contract.contract_ref_no%TYPE,
p_trade_ref_no		IN oltbs_contract.contract_ref_no%TYPE,
p_source_code		IN TLTB_UPLOAD_MASTER.source_code%TYPE,
p_version_no		IN oltbs_contract.latest_version_no%TYPE,
p_branch		IN TLTB_UPLOAD_MASTER.branch%TYPE,
p_seq_no		IN OUT NUMBER,
p_event_check		IN OUT VARCHAR2,
p_err_code		IN OUT VARCHAR2,
p_err_params		IN OUT VARCHAR2
)
RETURN BOOLEAN;
FUNCTION fn_check_amend
(
p_ext_contract_ref_no	IN oltbs_contract.contract_ref_no%TYPE,
p_trade_ref_no		IN oltbs_contract.contract_ref_no%TYPE,
p_source_code		IN TLTB_UPLOAD_MASTER.source_code%TYPE,
p_version_no		IN oltbs_contract.latest_version_no%TYPE,
p_branch		IN TLTB_UPLOAD_MASTER.branch%TYPE,
p_seq_no		IN OUT NUMBER,
p_event_check		IN OUT VARCHAR2,
p_err_code		IN OUT VARCHAR2,
p_err_params		IN OUT VARCHAR2
)
RETURN BOOLEAN;
FUNCTION fn_default_ssi
(
p_lttb_upld		IN TLTB_UPLOAD_MASTER%ROWTYPE,
p_ref_no		IN VARCHAR2,
p_err_code		IN OUT ertbs_msgs.err_code%Type,
p_err_param		IN OUT VARCHAR2
)
RETURN BOOLEAN;
FUNCTION fn_default_udf
(
  p_contract_ref_no	IN oltbs_contract.contract_ref_no%TYPE,
  p_source_code		IN tltbs_upload_userdef_fields.source_code%TYPE,
  p_version_no		IN oltbs_contract.latest_version_no%TYPE,
  p_product_code	IN VARCHAR2,
  p_error_code		IN OUT	VARCHAR2,
  p_error_parameter	IN OUT	VARCHAR2
)
RETURN BOOLEAN;
FUNCTION Fn_amend_processed_swap
(
p_ref_no               IN oltbs_contract.contract_ref_no%TYPE,
p_err_code             IN OUT  VARCHAR2,
p_err_param            IN OUT  VARCHAR2
)
RETURN BOOLEAN;
FUNCTION fn_amend_subsystem
(
 p_ext_contract_ref_no   IN      TLTB_UPLOAD_MASTER.ext_contract_ref_no%TYPE,
 p_trade_ref_no          IN      TLTB_UPLOAD_MASTER.trade_ref_no%TYPE,
 p_version_no            IN      TLTB_UPLOAD_MASTER.version_no%TYPE,
 p_source                IN      TLTB_UPLOAD_MASTER.source_code%TYPE,
 p_branch                IN      TLTB_UPLOAD_MASTER.branch%TYPE,
 p_err_code              IN OUT  VARCHAR2,
 p_err_param             IN OUT  VARCHAR2
)
RETURN BOOLEAN;
FUNCTION Fn_copy_trade
(
 P_ref_no       IN      oltbs_contract.contract_ref_no%TYPE
,P_product      IN      tltbs_upload_master.product_code%TYPE
,P_source_code  IN      tltbs_upload_master.source_code%TYPE
,P_branch       IN      tltbs_upload_master.branch%TYPE
,P_rowid        OUT     ROWID
,P_err_code     IN OUT  VARCHAR2
,P_err_param    IN OUT  VARCHAR2
)
RETURN BOOLEAN;
FUNCTION Fn_amend_processed_trade
(
 p_ref_no               IN      tltbs_upload_master.ext_contract_ref_no%TYPE
,p_source               IN      tltbs_upload_master.source_code%TYPE
,p_branch               IN      tltbs_upload_master.branch%TYPE
,p_rowid                OUT     ROWID
,p_err_code             IN OUT  VARCHAR2
,p_err_param            IN OUT  VARCHAR2
)
RETURN BOOLEAN;
FUNCTION Fn_delete_draft_trade
(
 p_ref_no               IN      tltbs_upload_master.ext_contract_ref_no%TYPE
,p_source_code          IN      tltbs_upload_master.source_code%TYPE
,p_branch               IN      tltbs_upload_master.branch%TYPE
,p_version_no           IN      tltbs_upload_master.version_no%TYPE
,p_err_code             IN OUT  VARCHAR2
,p_err_param            IN OUT  VARCHAR2
)
RETURN BOOLEAN;
FUNCTION fn_validate_maturity_dt
(p_contract_ref_no  IN  oltbs_contract.contract_ref_no%TYPE,
 p_version_no       IN  tltbs_contract_master.version_no%TYPE,
 p_source_date      IN  date,
 p_holiday_status   OUT varchar2,
 p_working_date     OUT DATE,
 p_err_code         OUT ertbs_msgs.err_code%TYPE,
 p_err_param        OUT varchar2
)
RETURN BOOLEAN;
FUNCTION fn_ticket_validation
(
p_ticket_id		IN TLTB_UPLOAD_MASTER.ticket_id%TYPE,
p_version_no		IN TLTB_UPLOAD_MASTER.version_no%TYPE,
p_err_code		IN OUT VARCHAR2,
p_err_params		IN OUT VARCHAR2
)
RETURN BOOLEAN;
FUNCTION fn_preliminary_check
(
p_ext_contract_ref_no	IN	tltbs_upload_master.ext_contract_ref_no%TYPE,
p_version_no		IN	tltbs_upload_master.version_no%TYPE,
p_source_code		IN	tltbs_upload_master.source_code%TYPE,
p_module_code		IN	smtbs_modules.module_id%TYPE,
p_product_code		IN	oltms_product.product_code%TYPE,
p_ccy_code		IN	cytms_ccy_defn.ccy_code%TYPE,
p_portfolio		IN	tltbs_upload_master.portfolio%TYPE,
p_position_identifier	IN	tltbs_upload_master.position_identifier%TYPE,
p_valid			OUT BOOLEAN,
p_err_code		IN OUT VARCHAR2,
p_err_params		IN OUT VARCHAR2
)
RETURN BOOLEAN;
FUNCTION fn_update_ticket_details
(
p_contract_ref_no	 IN    tltbs_contract_master.contract_ref_no%TYPE,
p_ticket_id		 IN    tltbs_ticket_master.ticket_id%TYPE,
p_err_code	     	 IN OUT      VARCHAR2,
p_err_params	         IN OUT      VARCHAR2
)
RETURN BOOLEAN;
FUNCTION fn_settle_status_check
(
p_contract_ref_no	IN oltbs_contract.contract_ref_no%TYPE,
p_err_code		IN OUT VARCHAR2,
p_err_params	IN OUT VARCHAR2
)
RETURN BOOLEAN;
FUNCTION fn_settle_check
(
p_ext_contract_ref_no	IN oltbs_contract.contract_ref_no%TYPE,
p_trade_ref_no		IN oltbs_contract.contract_ref_no%TYPE,
p_version_no		IN oltbs_contract.latest_version_no%TYPE,
p_seq_no		IN OUT NUMBER,
p_err_code		IN OUT VARCHAR2,
p_err_params		IN OUT VARCHAR2
)
RETURN BOOLEAN;
FUNCTION fn_currency_validation
(
p_contract_rec		IN TLTB_UPLOAD_MASTER%ROWTYPE,
p_err_code		IN OUT VARCHAR2,
p_err_params		IN OUT VARCHAR2
)
RETURN BOOLEAN;
FUNCTION fn_cusip_amt_validation
(
p_ext_contract_ref_no	IN TLTB_UPLOAD_MASTER.ext_contract_ref_no%TYPE,
p_cusip_no		IN TLTB_UPLOAD_MASTER.cusip_no%TYPE,
p_version_no		IN TLTB_UPLOAD_MASTER.version_no%TYPE,
p_agency_type		IN oltbs_contract_master.agency_type%TYPE,--FLEXCUBE V.CL Release 7.4 MTR1 SFR#121 Changes
p_err_code		IN OUT VARCHAR2,
p_err_params		IN OUT VARCHAR2
)
RETURN BOOLEAN;
-- FLEXCUBE V.CL Release 7.4 SLT changes - LS-LT Interface, by Manjula, starts
FUNCTION Fn_LSorig_trade_upload
(p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
 p_version_no		IN	oltbs_contract_master.version_no%TYPE,
 p_event_seq_no		IN	oltbs_contract_event_log.event_seq_no%TYPE,
 p_error_code		IN OUT	VARCHAR2,
 p_error_param		IN OUT	VARCHAR2
)
RETURN BOOLEAN;
-- FLEXCUBE V.CL Release 7.4 SLT changes - LS-LT Interface, by Manjula, ends

FUNCTION fn_resolve_PAR_Orig_ext_ref_no
(
p_ext_contract_ref_no	IN	tltbs_upload_master.ext_contract_ref_no%TYPE
)
RETURN  tltbs_upload_master.ext_contract_ref_no%TYPE;
FUNCTION fn_dealtype_validation
(
p_upload_rec		IN tltbs_upload_master%ROWTYPE,
p_err_code		IN OUT VARCHAR2,
p_err_params		IN OUT VARCHAR2
)
RETURN BOOLEAN;
FUNCTION fn_check_elevation
(
p_ext_contract_ref_no	IN oltbs_contract.contract_ref_no%TYPE,
p_trade_ref_no		IN oltbs_contract.contract_ref_no%TYPE,
p_source_code		IN TLTB_UPLOAD_MASTER.source_code%TYPE,
p_version_no		IN oltbs_contract.latest_version_no%TYPE,
p_branch		IN TLTB_UPLOAD_MASTER.branch%TYPE,
p_seq_no		IN OUT NUMBER,
p_event_check		IN OUT VARCHAR2,
p_err_code		IN OUT VARCHAR2,
p_err_params		IN OUT VARCHAR2
)
RETURN BOOLEAN;
FUNCTION fn_authorize_draft_trade
(
p_ext_contract_ref_no	IN tltbs_upload_master.ext_contract_ref_no%TYPE,
p_err_code		IN OUT	VARCHAR2,
p_err_param		IN OUT	VARCHAR2
)
RETURN BOOLEAN;
FUNCTION fn_populate_origination_queue
(
p_ext_contract_ref_no	IN	tltbs_upload_master.ext_contract_ref_no%TYPE,
p_err_code		IN OUT	VARCHAR2,
p_err_param		IN OUT	VARCHAR2
)
RETURN  BOOLEAN;

--FLEXCUBE V.CL Release 7.4 ITR2 SFR#72 Changes starts
FUNCTION fn_get_trade_upd_fmem
	(
	p_contract_mast_rec	IN	oltbs_contract_master%rowtype
	)
RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.4 ITR2 SFR#72 Changes ends
--CITIUS-LS#6071 changes start
FUNCTION Fn_process_unamort_fee
(	P_contract_ref_no	IN		tltbs_contract_master.contract_ref_no%TYPE,
	P_action_code		IN		VARCHAR2,--R-Refund, U-Upload
	p_error_code		IN OUT	VARCHAR2,
	p_error_param		IN OUT	VARCHAR2
)
RETURN BOOLEAN;
--CITIUS-LS#6071 changes end
--FLEXCUBE V.CL Release 7.7 VOL4 FS Tag 06 start
FUNCTION Fn_process_buy_unamort_fee
(	p_contract_ref_no	IN		tltbs_contract_master.contract_ref_no%TYPE,
	p_action_code		IN		VARCHAR2,--R-Refund, U-Upload
	p_fee_comp		OUT		TLTB_ORIG_BUY_FEE_LOG.fee_comp%TYPE,
	p_fee_ccy		OUT		TLTB_ORIG_BUY_FEE_LOG.fee_ccy%TYPE,
	p_fee_amount		OUT		TLTB_ORIG_BUY_FEE_LOG.fee_amount%TYPE,
	p_comm_ref_no		OUT		oltbs_contract.contract_ref_no%TYPE,
	p_comm_fee_esn		OUT		oltbs_contract_event_log.event_seq_no%TYPE,
	p_error_code		IN OUT		VARCHAR2,
	p_error_param		IN OUT		VARCHAR2
)
RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.7 VOL4 FS Tag 06 end
--12-MAR-2010 FLEXCUBE V.CL Release 7.6 UK SLT Changes starts
FUNCTION Fn_delete_draft_ticket
(
 p_ref_no               IN      tltbs_upload_master.ext_contract_ref_no%TYPE
,p_ticket_id		IN	tltbs_upload_master.ticket_id%TYPE
,p_source_code          IN      tltbs_upload_master.source_code%TYPE
,p_branch               IN      tltbs_upload_master.branch%TYPE
,p_err_code             IN OUT  VARCHAR2
,p_err_param            IN OUT  VARCHAR2
)
RETURN BOOLEAN;

FUNCTION fn_populate_upload_master
(
p_ticket_ext_ref_no	IN      tltbs_upload_master.ext_contract_ref_no%TYPE
,p_ticket_id		IN	tltbs_upload_master.ticket_id%TYPE
,p_err_code             IN OUT  VARCHAR2
,p_err_param            IN OUT  VARCHAR2
)
RETURN BOOLEAN;
--12-MAR-2010 FLEXCUBE V.CL Release 7.6 UK SLT Changes ends
--26-NOV-2010 FLEXCUBE V.CL Release 7.8 VOL2 FS Tag 04, SLT Commitment Increase/Decrease Changes Start Here
FUNCTION fn_populate_cr_log
(
p_trade_ref_no		IN		tltbs_contract_master.CONTRACT_REF_NO%TYPE
,p_error_code		IN OUT	VARCHAR2
,p_error_param		IN OUT	VARCHAR2
)
RETURN BOOLEAN;
--26-NOV-2010 FLEXCUBE V.CL Release 7.8 VOL2 FS Tag 04, SLT Commitment Increase/Decrease Changes End Here
--CITIUS-LS#7518 start
--CITIUS-LS#7078 changes start
FUNCTION fn_recalc_unamort_fee
(
	p_ext_contract_ref_no	IN		tltbs_upload_master.ext_contract_ref_no%TYPE,	
	p_total_unamortized_fee	OUT		lftbs_contract_accr_fee.fee_amount%TYPE,
	p_err_code				IN OUT	VARCHAR2,
	p_err_param				IN OUT	VARCHAR2
)
RETURN  BOOLEAN;
--CITIUS-LS#7078 changes end
--CITIUS-LS#7518 end
--18-MAR-2011 Flexcube V.CL Release 7.9, Cost of Credit Changes start
FUNCTION fn_process_contra_reserve_etc
(
	P_contract_ref_no	IN	tltbs_contract_master.contract_ref_no%TYPE,
	p_value_date	IN	DATE,
	P_process_code	IN	VARCHAR2,--BOK - Booking, AMD - Amendment, REV - Reversal
	p_error_code	IN OUT	VARCHAR2,
	p_error_param	IN OUT	VARCHAR2
)
RETURN BOOLEAN;
--18-MAR-2011 Flexcube V.CL Release 7.9, Cost of Credit Changes end
--05-JAN-2012 Flexcube V.CL Release 7.10 FS Tag 10 Changes start here
FUNCTION fn_get_cmtredn_hoff_amount
	(
	p_agency_ref_no		IN	VARCHAR2
	, p_cusip_no		IN	VARCHAR2
	, p_position_identifier	IN	VARCHAR2
	, p_trade_identifer	IN	VARCHAR2
	, p_net_cmtredn_amount	IN OUT	lbtbs_cmtred_hoff_borr.amount%TYPE
	, p_avg_cmtredn_price	IN OUT	lbtbs_cmtred_hoff_borr.price%TYPE
	, p_net_pik_amount	IN OUT	lbtbs_cmtred_hoff_borr.amount%TYPE
	, p_err_code		IN OUT	VARCHAR2
	, p_err_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--05-JAN-2012 Flexcube V.CL Release 7.10 FS Tag 10 Changes end here
--03-DEC-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol#1 Tag#9 Changes Starts
PROCEDURE pr_mnemonic_process_job
(
	 p_branch 	IN VARCHAR2
);
FUNCTION fn_cparty_mnemonic_process
(
	p_branch			IN 	TLTB_UPLOAD_MASTER.branch%TYPE,
	p_source_code			IN	TLTB_UPLOAD_MASTER.source_code%TYPE,
	p_err_code			IN 	OUT VARCHAR2,
	p_err_param			IN 	OUT VARCHAR2
)
RETURN BOOLEAN;
FUNCTION Fn_update_LQT_mnemonic_browser
(
	p_counterparty_mnemonic 	IN 	oltbs_lt_trade.counterparty_mnemonic%TYPE,
	p_new_counterparty 		IN	tltbs_contract_master.portfolio%TYPE,
	p_mod_no			IN	OLTM_CPTY_MNEMONIC_MAPPING.mod_no%type,
	p_err_code			IN OUT	varchar2,
	p_err_param			IN OUT	varchar2
)
RETURN BOOLEAN;
--03-DEC-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol#1 Tag#9 Changes Ends
--21-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol1 Tag03 changes Start
FUNCTION fn_pop_origination_queue_hfs
														(
														p_ext_contract_ref_no	IN		tltbs_upload_master.ext_contract_ref_no%TYPE,
														p_err_code				IN OUT	VARCHAR2,
														p_err_param				IN OUT	VARCHAR2															
														)
RETURN BOOLEAN;
--21-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol1 Tag03 changes End
-- 07-SEP-2015 EURCITIPLC#20226 changes starts
FUNCTION Fn_dcf_waive_swoa2flat
        (
        P_Upload_Master_Rec	IN      tltbs_upload_master%ROWTYPE
        ,P_source_code          IN      tltbs_upload_master.source_code%TYPE
        ,P_branch               IN      tltbs_upload_master.branch%TYPE
        ,P_version_no           IN      tltbs_upload_master.version_no%TYPE
        ,P_err_code             IN OUT  VARCHAR2
        ,P_err_param            IN OUT  VARCHAR2
        )
RETURN BOOLEAN;
-- 07-SEP-2015 EURCITIPLC#20226 changes ends
END tlpks_upload;
/
CREATE OR REPLACE SYNONYM tlpkss_upload FOR tlpks_upload
/