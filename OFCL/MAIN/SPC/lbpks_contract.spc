create or replace package lbpks_contract is
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lbpks_contract.SPC
**
** Module	: LOANS AND SYNDICATION
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
/*----------------------------------------------------------------------------------------------------
CHANGE HISTORY
26-DEC-2005	FLEXCUBE V.CL Release 7.0 Created the package for LS module.
04-FEB-2008 FLEXCUBE V.CL Release 7.4 BAU-Lot1, Sublimits changes
	    Added new functions Fn_get_sublimit_and_validate and Fn_rollamt_sublimit_chk.
	    Added new function Fn_sublimit_amt_validation.
27-FEB-2008 FLEXCUBE V.CL Release 7.4, Margin Recalc for Liquidated Contracts, added a new procedure pr_margin_repickup.
31-Mar-2008 FLEXCUBE V.CL Release 7.4 Swing line limit changes,
		Included 3 new functions fn_check_swingline,FN_check_swingline_limit and fn_validate_limit_amount
25-Apr-2008 FLEXCUBE V.CL Release 7.4 Swing line limit changes,included p_value_date in FN_check_swingline_limit
27-NOV-2008 FLEXCUBE V.CL Release 7.4, BAU-LOT4 Fronting Risk Changes , Added two new functions
			1) Fn_Get_Fronting_risk
			2) Fn_Process_Fronting
29-APR-2009 FLEXCUBE V.CL Release 7.6 Sighting Fund Changes Arthy
29-APR-2009 FLEXCUBE V.CL Release 7.6 Sighting Fund Changes, Yogi, Added function fn_check_investors_fundstatus
--29-APR-2009 FLEXCUBE V.CL Release 7.6 Sighting Fund Changes Manas Added function fn_process_sighting_fund_batch
05-JUN-2009 CITIUS-LS#SRT5764 Missing Retro from CITIUS to BLORE
	    1]	23-MAY-2009 FLEXCUBE V.CL Release 7.6 ITR2 SFR#29,conversion script related changes
12-JUN-2009 CITIUS-LS#5834 Sighting fund payment processing screecn authorisation and processing has been moved to backend.
15-AUG-2009 CITIUS-LS#6192 FLEXCUBE V.CL Release 7.5 lot1.1 Sighting Funds RT Fix#448, added function fn_populate_rounding_amount
16-AUG-2009 CITIUS-LS#6206,Changes done for validating the wire amount with accounting entry and cashflow table while BPMT and PPMT.
01-Sep-2009 CITIUS-LS#6295 FLEXCUBE V.CL Release 7.5 lot1.1 Sighting Funds RT Fix#927(JIRA) Unfund_detail population needs to be done in the during sfnt save itself
30-SEP-2009 CITIUS-LS Till#6410, CUSIP amendment changes, added fn_update_cusip, changed the copyright clause as well
17-NOV-2009 FLEXCUBE V.CL Release 7.5 LOT1.2 FS Tag 9.0 changes included a new function for populating lbtbs_part_funding_history for VAMB event for Create_new_contract cases.
01-OCT-2010 FLEXCUBE V.CL Release 7.7 RT1 SFR#5, CITIUS Retro, Till#7300,Performane issues were occuring due to forms, so moved a function fn_pram_validations and a proceudre pr_update_fronting_flag from forms to this package
11-Nov-2010 FLEXCUBE V.CL Release 7.8 VOL2 FS Tag 03, 3 SLT Trade Amendment Changes: New function fn_update_facilityname is included which updates facility name done at tranche level, same to be propagated to all the underlying trades.
28-FEB-2011 Flexcube V.CL Release 7.9, CITIUS Retro #7672 sighting funds checks to clearpar upload added
28-Apr-2011 FLEXCUBE V.CL Release 7.9 VOL2 FS Tag 11 changes : Added new function fn_lc_validation.
08-FEB-2012 Flexcube V.CL Release 7.10, ITR1#19
	31-JAN-2012 Flexcube V.CL Release 7.9, PLNCITI#35047, System was updating  oltbs_contract_balance even for feed , so validation added to avoid updation during feede generation.
28-MAR-2012 Flexcube V.CL Release 7.10, CITIUS Retro, TILL#13359 changes, fn_lcfronting_validation function added.	
15-FEB-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag06 Clearing line changes

**Changed By         : Vineeth T M
   **Date               : 12-Aug-2024
   **Change Description : LS Version rollover changes
   **Search String      : OBCL_14.8_LS_VER_ROL changes
-----------------------------------------------------------------------------------------------------
*/


Function fn_copy_contract(p_new_reference_no IN Varchar2,
				  p_old_reference_no IN Varchar2,
			        p_error_code IN OUT Varchar2)
RETURN boolean;

Function fn_create_new_version(p_reference_no IN varchar2,
   					 p_update_cstb IN varchar2 DEFAULT 'Y',
					 p_replicate_sch_defn	IN varchar2 DEFAULT 'Y',
					 p_new_event_seq_no IN number)
RETURN number;

Function fn_save_contract_amendment(p_reference_no IN oltbs_contract.contract_ref_no%type,
						p_current_event_seq_no IN oltbs_contract.latest_event_seq_no%type,
						p_current_version_no IN oltbs_contract_master.version_no%type,
						p_error_code IN OUT Varchar2,
						p_error_param IN OUT Varchar2)
RETURN boolean;

--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
--Overloaded the Function to call from Manual Status (LDDMSC) for Contract Level Processing
--and Schedule Level Processing.
--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Function fn_save_contract_amendment(p_reference_no IN oltbs_contract.contract_ref_no%type,
						p_current_event_seq_no IN oltbs_contract.latest_event_seq_no%type,
						p_current_version_no IN oltbs_contract_master.version_no%type,
						p_ListOfComponents IN varchar2,
						p_ListOfDueDates IN varchar2,
						p_ListOfNewStatuses IN varchar2,
						p_error_code IN OUT Varchar2,
						p_error_param IN OUT Varchar2)
RETURN boolean;

Function fn_create_new_version(p_ldtbs_contract_master_rec	IN oltbs_contract_master%ROWTYPE,
					 p_update_cstb IN varchar2 DEFAULT 'Y',
			      	 p_replicate_sch_defn IN varchar2 DEFAULT 'Y',
					 p_new_event_seq_no IN number)
RETURN number ;

--OBCL_14.8_LS_VER_ROL Changes start
FUNCTION fn_create_new_version(p_ldtbs_contract_master_rec IN oltbs_contract_master%ROWTYPE,
                                 p_update_cstb               IN VARCHAR2 DEFAULT 'Y',
                                 p_replicate_sch_defn        IN VARCHAR2 DEFAULT 'Y',
                                 p_new_event_seq_no          IN NUMBER,
                                 p_contract_ref_no           in oltb_contract.contract_ref_no%type,
                                 p_version_no                in oltb_contract.latest_version_no%type,
                                 p_Replicate_Cust            in varchar2)
    RETURN NUMBER;
FUNCTION Fn_Block_Multi_Linkages(p_Reference_No         IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                   p_Current_Event_Seq_No IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                                   p_Current_Version_No   IN Oltbs_Contract_Master.Version_No%TYPE,
                                   p_Err_Code             IN OUT NOCOPY VARCHAR2,
                                   p_Err_Params           IN OUT NOCOPY VARCHAR2) 
RETURN BOOLEAN;
--OBCL_14.8_LS_VER_ROL Changes end
-- 04-FEB-2008 FLEXCUBE V.CL Release 7.4 BAU-Lot1, Sublimits changes starts
FUNCTION Fn_get_sublimit_and_validate
	(
	p_tranche_ref_no   	IN oltbs_contract.contract_ref_no%TYPE,
	p_dd_ref_no   		IN oltbs_contract.contract_ref_no%TYPE,
	p_borrower		IN lbtbs_drawdown_schedule.borrower%TYPE,
	p_dd_amount		IN oltbs_contract_master.amount%TYPE,
	p_dd_ccy		IN oltbs_contract_master.currency%TYPE,
	p_dd_prod		IN VARCHAR2,
	p_process		IN VARCHAR2,
	p_split_no		IN NUMBER,
	p_err_code 		IN OUT  varchar2,
	p_err_params		IN OUT  varchar2
	)
RETURN BOOLEAN;

FUNCTION Fn_rollamt_sublimit_chk
	(
	p_tranche_ref_no   	IN 	oltbs_contract.contract_ref_no%TYPE,
	p_dd_ref_no   		IN 	oltbs_contract.contract_ref_no%TYPE,
	p_borrower		IN 	lbtbs_drawdown_schedule.borrower%TYPE,
	p_roll_amount		IN	oltbs_contract_split_rollover.max_roll_amount%TYPE,
	p_dd_ccy		IN 	oltbs_contract_master.currency%TYPE,
	p_roll_prod		IN	oltbs_contract_split_rollover.rollover_product%TYPE,
	p_outstanding_amt	IN 	NUMBER,
	p_err_code 		IN OUT  varchar2,
	p_err_params		IN OUT  varchar2
	)
RETURN BOOLEAN;

-- 25-FEB-2008 starts

FUNCTION Fn_sublimit_amt_validation
	(
	p_tranche_ref_no   	IN 	oltbs_contract.contract_ref_no%TYPE,
	p_tranche_ccy		IN	oltbs_contract.contract_ccy%TYPE,
	p_version_no		IN	oltbs_contract.latest_version_no%TYPE,
	p_borrower		IN 	lbtbs_drawdown_schedule.borrower%TYPE,
	p_limit_type		IN	lbtbs_borr_prod_limit.limit_type%TYPE,
	p_prod_code		IN	oltbs_contract_split_rollover.rollover_product%TYPE,
	p_ccy_code		IN	lbtbs_borr_prod_limit.ccy_code%TYPE,
	p_limit_amt		IN	lbtbs_borr_prod_limit.limit_amt%TYPE,
	p_err_code 		IN OUT  VARCHAR2,
	p_err_params		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

-- 25-FEB-2008 ends

-- 04-FEB-2008 FLEXCUBE V.CL Release 7.4 BAU-Lot1, Sublimits changes ends

-- 31-Mar-2008 FLEXCUBE V.CL Release 7.4 Swing line limit changes starts
FUNCTION fn_check_swingline
			(
			p_tranche_ref_no in lbtbs_part_vdbal_master.contract_ref_no%type,
			p_counterparty  in varchar2
			)
RETURN NUMBER;

FUNCTION FN_check_swingline_limit
			(
			p_tranche_ref_no 	IN lbtbs_part_vdbal_master.contract_ref_no%type,
			p_counterparty  	IN VARCHAR2,
			p_balance_type 		IN VARCHAR2,
			p_value_date		IN DATE,	-- 25-Apr-2008 FLEXCUBE V.CL Release 7.4 Swing line limit changes
			p_contract_ref_no	IN lbtbs_part_vdbal_master.contract_ref_no%type
			)
RETURN NUMBER;

FUNCTION fn_validate_limit_amount
			(
			p_contract_ref_no   IN    VARCHAR2,
			p_version_no        IN    VARCHAR2,
			p_err_code          IN OUT   VARCHAR2,
			p_err_prm           IN OUT   VARCHAR2
	 		)
RETURN BOOLEAN ;

-- 31-Mar-2008 FLEXCUBE V.CL Release 7.4 Swing line limit changes ends

--27-FEB-08, FLEXCUBE V.CL Release 7.4, Margin Recalc for Liquidated Contracts starts---

PROCEDURE pr_margin_repickup( p_product_code    IN VARCHAR2,
                              p_counterparty    IN VARCHAR2,
                              p_contract_ccy    IN VARCHAR2,
                              p_date            IN DATE,
                              p_branch          IN VARCHAR2,
                              p_contract_ref_no IN VARCHAR2,
                              p_merge_serial_no IN NUMBER,
                              p_process_code    IN VARCHAR2,
                              p_error_code      IN OUT VARCHAR2,
                              p_error_param     IN OUT VARCHAR2
                             );
--27-FEB-08, FLEXCUBE V.CL Release 7.4, Margin Recalc for Liquidated Contracts ends--
--27-NOV-2008 FLEXCUBE V.CL Release 7.4, BAU-LOT4 Fronting Risk Changes Starts

FUNCTION Fn_Get_Fronting_risk
                (       p_trn_reference        IN      oltbs_contract.contract_ref_no%TYPE,
                        p_value_date           IN      DATE,
                        p_gaap_front_risk      OUT     NUMBER,
                        p_err_code             IN OUT  ertbs_msgs.err_code%TYPE,
                        p_err_params           IN OUT  VARCHAR2,
                        p_action	       IN      VARCHAR2 DEFAULT 'Y'--31-JAN-2012 Flexcube V.CL Release 7.9, PLNCITI#35047, added
                )
RETURN BOOLEAN;

FUNCTION        Fn_Process_Fronting
                (       p_curr_branch          IN      VARCHAR2,
                        p_processing_date      IN      DATE,
                        p_err_code             IN OUT  ertbs_msgs.err_code%TYPE,
                        p_err_params           IN OUT  VARCHAR2
                )
RETURN BOOLEAN;

--27-NOV-2008 FLEXCUBE V.CL Release 7.4, BAU-LOT4 Fronting Risk Changes Till here
--29-APR-2009 FLEXCUBE V.CL Release 7.6 Sighting Fund Changes Arthy starts
FUNCTION fn_process_sighting_funds
			(
			p_contract_ref_no	IN	lbtbs_borrower_fronting.contract_ref_no%TYPE,
			p_event_seq_no		IN	lbtbs_borrower_fronting.event_seq_no%TYPE,
			p_error_code		IN OUT	VARCHAR2,
			p_error_params		IN OUT	VARCHAR2
			)
RETURN BOOLEAN;

FUNCTION  fn_backup_sighting_funds
	(p_contract_ref_no	lbtbs_borrower_fronting.contract_ref_no%TYPE,
	--p_event_seq_no		lbtb_borrower_fronting.event_seq_no%TYPE,
	--p_payment_esn		lbtb_part_funding_details.payment_esn%TYPE,
	p_error_code		IN OUT		VARCHAR2,
	p_error_params		IN OUT		VARCHAR2)
RETURN BOOLEAN;

FUNCTION  fn_restore_sighting_funds
	(p_contract_ref_no	lbtbs_borrower_fronting.contract_ref_no%TYPE,
	--p_event_seq_no		lbtb_borrower_fronting.event_seq_no%TYPE,
	--p_payment_esn		lbtb_part_funding_details.payment_esn%TYPE,
	p_error_code		IN OUT		VARCHAR2,
	p_error_params		IN OUT		VARCHAR2)
RETURN BOOLEAN;
FUNCTION fn_populate_front_funding
	(p_borrower_contract_ref_no	IN oltbs_contract_master.contract_ref_no%TYPE,
	p_contract_ref_no		IN oltbs_contract_master.contract_ref_no%TYPE,
	p_counterparty			IN lbtbs_part_funding_details.counterparty%TYPE,
	p_esn				IN oltbs_contract_event_log.event_seq_no%TYPE,
	p_amount			IN lbtbs_part_funding_details.funding_amount%TYPE,
	p_date				IN DATE,
	p_populate			IN VARCHAR2)
RETURN BOOLEAN;
--29-APR-2009 FLEXCUBE V.CL Release 7.6 Sighting Fund Changes Arthy ends
--29-APR-2009 FLEXCUBE V.CL Release 7.6 Sighting Fund Changes Manas starts
FUNCTION fn_process_sighting_fund_batch
	  (
	   p_contract_ref_no IN oltbs_contract.contract_ref_no%type,
	   p_event_seq_no IN oltbs_contract_event_log.event_seq_no%type,
	   p_error_code IN OUT VARCHAR2,
	   p_error_params IN OUT VARCHAR2
	  )
RETURN BOOLEAN;
--29-APR-2009 FLEXCUBE V.CL Release 7.6 Sighting Fund Changes Manas ends
--09-Apr-2009 FLEXCUBE V.CL Release 7.6 Sighting Fund Changes--yogiy--starts--
FUNCTION fn_check_investors_fundstatus(p_contract_ref_no IN oltbs_contract_master.contract_ref_no%TYPE)
RETURN BOOLEAN;
--CITIUS-LS#SRT5764 CHANGES STARTS--
FUNCTION fn_reverse_ppmt_borr(
				p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
				p_event_code	IN oltbs_contract_event_log.event_code%TYPE,
				p_reversed_event_seq_no IN VARCHAR2,
				p_err_code IN OUT VARCHAR2,
				p_err_param IN OUT VARCHAR2
				)
RETURN BOOLEAN;
--CITIUS-LS#SRT5764 ends--

--09-Apr-2009 FLEXCUBE V.CL Release 7.6 Sighting Fund Changes--yogiy--ends--
--CITIUS-LS#SRT5764 CHANGES STARTS--
p_sighting_funds varchar2(1);--23-MAY-2009 FLEXCUBE V.CL Release 7.6 ITR2 SFR#29,conversion script related changes--
--23-MAY-2009 FLEXCUBE V.CL Release 7.6 ITR2 SFR#29,Function added to check for the recalled investors
FUNCTION fn_check_recalled_investor
 	(
 	 p_contract_ref_no	IN lbtbs_borrower_fronting.contract_ref_no%TYPE,
  	 p_investor		IN lbtbs_part_proc_stat.counterparty%type  DEFAULT 'ALL',
	 p_error_code		IN OUT VARCHAR2,
	 p_error_params		IN OUT VARCHAR2
	 )
RETURN BOOLEAN;
--23-MAY-2009 FLEXCUBE V.CL Release 7.6 ITR2 SFR#29,Function addded--
--CITIUS-LS#SRT5764 CHANGES ENDS--
--CITIUS-LS#5834 Starts
FUNCTION fn_proc_sightfund_during_auth
 	(
 	 p_contract_ref_no	IN 	lbtbs_borrower_fronting.contract_ref_no%type,
 	 p_user_id			IN	VARCHAR2	DEFAULT 'SYSTEM',
	 p_error_code		IN 	OUT VARCHAR2,
	 p_error_params		IN 	OUT VARCHAR2
	 )
RETURN BOOLEAN;
--CITIUS-LS#5834 Ends
--CITIUS-LS#6192 CHANGES STARTS
--15-AUG-2009 FLEXCUBE V.CL Release 7.5 lot1.1 Sighting Funds RT Fix#448 start
FUNCTION fn_populate_rounding_amount
	(p_borrower_contract_ref_no	lbtbs_borrower_fronting.contract_ref_no%TYPE,
	p_event_seq_no			lbtbs_borrower_fronting.event_seq_no%TYPE,
	p_error_code			IN OUT	VARCHAR2,
	p_error_params			IN OUT	VARCHAR2)
RETURN BOOLEAN;
--15-AUG-2009 FLEXCUBE V.CL Release 7.5 lot1.1 Sighting Funds RT Fix#448 end
--CITIUS-LS#6192 CHANGES ENDS

--CITIUS-LS#6206 Starts
FUNCTION fn_validate_sfund_payment
(
	p_contract_ref_no	IN		VARCHAR2,
	p_event_code		IN		VARCHAR2,
	p_err_code			IN OUT 	VARCHAR2,
	p_err_param			IN OUT	VARCHAR2
)
RETURN BOOLEAN;
--CITIUS-LS#6206 Ends
--01-Sep-2009 CITIUS-LS#6295 FLEXCUBE V.CL Release 7.5 lot1.1 Sighting Funds RT Fix#927(JIRA) Unfund_detail population needs to be done in the during sfnt save itself starts
FUNCTION fn_proc_sightfund_during_save
	(p_contract_ref_no 		lbtbs_borrower_fronting.contract_ref_no%TYPE,
	p_contract_type			lbtbs_borrower_fronting.contract_type%TYPE,
	p_error_code			IN OUT	VARCHAR2,
	p_error_params			IN OUT	VARCHAR2)
RETURN BOOLEAN;
--01-Sep-2009 CITIUS-LS#6295 FLEXCUBE V.CL Release 7.5 lot1.1 Sighting Funds RT Fix#927(JIRA) Unfund_detail population needs to be done in the during sfnt save itself ends
--30-SEP-2009 CITIUS-LS Till#6410, CUSIP amendment changes, Maneeha added starts
FUNCTION fn_update_cusip
	(
	p_crn		IN	VARCHAR2,
	p_old_cusip	IN	VARCHAR2,
	p_new_cusip	IN	VARCHAR2,
	p_ext_value	IN	NUMBER,
	p_old_ext_cusip	IN	VARCHAR2,
	p_new_ext_cusip	IN	VARCHAR2
	)
RETURN BOOLEAN;
--30-SEP-2009 CITIUS-LS Till#6410, CUSIP amendment changes, Maneeha added ends
--17-NOV-2009 FLEXCUBE V.CL Release 7.5 LOT1.2 FS Tag 9.0 changes starts
FUNCTION fn_populate_funding_history
	(
		 p_contract_ref_no	IN oltbs_contract.contract_ref_no%TYPE
		,p_event_seq_no		IN lbtbs_participant_fronting.event_seq_no%TYPE
		,p_err_code		IN OUT VARCHAR2
		,p_err_param		IN OUT VARCHAR2
	)
RETURN BOOLEAN;
--17-NOV-2009 FLEXCUBE V.CL Release 7.5 LOT1.2 FS Tag 9.0 changes ends
--01-OCT-2010 FLEXCUBE V.CL Release 7.7 RT1 SFR#5, CITIUS Retro, Till#7300,Performane issues were occuring due to forms, so moved a function fn_pram_validations and a proceudre pr_update_fronting_flag from forms to this package starts
PROCEDURE pr_update_fronting_flag(
		                    p_transaction_event IN lbtb_borrower_fronting.transaction_event%TYPE,
		                    p_update_fronting_flag IN VARCHAR2,
		                    p_borrower_contract_ref_no  IN   lbtb_participant_fronting.borrower_contract_ref_no%TYPE,
		                    p_contract_ref_no    IN  lbtb_borrower_fronting.contract_ref_no%TYPE,
		                    p_contract_type     IN  lbtb_borrower_fronting.contract_type%TYPE,
		                    p_borr_event_seq_no IN lbtb_participant_fronting.borrower_event_seq_no%TYPE
		                    );

FUNCTION FN_PRAM_VALIDATIONS
				(p_borrower_ref_no IN oltbs_contract.contract_ref_no%TYPE,
				 p_participant_ref_no IN oltbs_contract.contract_ref_no%TYPE,
				 p_event_value_date IN DATE,--for FUNDING this will be passed as null
				 p_payment_ar_date IN DATE,
				 p_err_code OUT VARCHAR2,
				 p_err_param OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION fn_sfund_validation
(	p_borr_ref_no  IN oltbs_contract.contract_ref_no%TYPE,
	p_part_ref_no  IN oltbs_contract.contract_ref_no%TYPE,
	p_payment_date IN date,
	p_receipt_date IN date,
 	p_err_code    OUT VARCHAR2,
 	p_err_param   OUT VARCHAR2
)
RETURN BOOLEAN;
--01-OCT-2010 FLEXCUBE V.CL Release 7.7 RT1 SFR#5, CITIUS Retro, Till#7300,Performane issues were occuring due to forms, so moved a function fn_pram_validations and a proceudre pr_update_fronting_flag from forms to this package ends
--11-Nov-2010 FLEXCUBE V.CL Release 7.8 VOL2 FS Tag 03, 3 SLT Trade Amendment Changes start here
FUNCTION fn_update_facilityname 
	(
	p_cusip		IN	VARCHAR2,
	p_old_fname	IN	VARCHAR2,
	p_new_fname	IN	VARCHAR2
	)
RETURN BOOLEAN;	
--11-Nov-2010 FLEXCUBE V.CL Release 7.8 VOL2 FS Tag 03, 3 SLT Trade Amendment Changes end here	

--28-FEB-2011 Flexcube V.CL Release 7.9, CITIUS Retro #7672 start Clearpar/PRAM validations
FUNCTION fn_check_actual_date
	(	p_contract_reF_no 	IN VARCHAR2,
		p_investor 			IN VARCHAR2,
		p_value_date		IN DATE
	)
RETURN BOOLEAN;
FUNCTION fn_check_funding_status	
	(	p_contract_reF_no 	IN VARCHAR2,
		p_investor 			IN VARCHAR2
	)
RETURN BOOLEAN;
--28-FEB-2011 Flexcube V.CL Release 7.9, CITIUS Retro #7672 ends
--28-Apr-2011 FLEXCUBE V.CL Release 7.9 VOL2 FS Tag 11 changes starts
FUNCTION fn_lc_validation
	(	p_tranche_ref_no 	IN lbtbs_part_ccy_restr_detail.contract_ref_no%type,
		p_dd_prod		IN VARCHAR2,	
		p_dd_amount		IN oltbs_contract_master.amount%type,
		p_lcissuer		IN oltbs_contract_master.lc_issuer%type,
		p_dd_ccy		IN oltbs_contract_master.currency%TYPE,
		p_dd_ref_no		IN oltbs_contract_master.contract_ref_no%type,
		p_borrower		IN lbtbs_borr_prod_limit.borrower%TYPE, 
		p_err_code		IN OUT	VARCHAR2,
		p_err_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--28-Apr-2011 FLEXCUBE V.CL Release 7.9 VOL2 FS Tag 11 changes ends

--28-MAR-2012 Flexcube V.CL Release 7.10, CITIUS Retro, TILL#13359 changes start here
FUNCTION fn_lcfronting_validation
(
	p_ref_no VARCHAR2
)
RETURN BOOLEAN;
--28-MAR-2012 Flexcube V.CL Release 7.10, CITIUS Retro, TILL#13359 changes end here
--15-FEB-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag06 Clearing line changes starts
FUNCTION fn_clearling_limit_validation
	(
	p_value_date    	IN DATE,
	p_customer_no   	IN oltbs_contract_master.COUNTERPARTY%TYPE,	
	p_clearing_line 	IN oltbs_contract_master.CLEARING_LINE%TYPE,
	p_tranche_hfs_amt 	OUT oltbs_contract_master.AMOUNT%TYPE,
	p_limit_amount		OUT oltbs_contract_master.AMOUNT%TYPE,
	p_err_code     		IN OUT VARCHAR2,
 	p_err_param    		IN OUT VARCHAR2
	)
RETURN BOOLEAN;
FUNCTION fn_credit_limit_validation
	(
	p_cont_ref_no   	IN oltbs_contract.CONTRACT_REF_NO%TYPE,
	p_value_date    	IN DATE,
	p_customer_no   	IN oltbs_contract_master.COUNTERPARTY%TYPE,
	p_participant_amt 	OUT oltbs_contract_master.AMOUNT%TYPE,
	p_limit_amount		OUT oltbs_contract_master.AMOUNT%TYPE,
	p_err_code     		IN OUT VARCHAR2,
 	p_err_param    		IN OUT VARCHAR2
	)
RETURN BOOLEAN;
--15-FEB-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag06 Clearing line changes ends
END lbpks_contract;
/
create or replace  synonym lbpkss_contract for lbpks_contract
/