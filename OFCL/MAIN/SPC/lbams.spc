CREATE OR REPLACE PACKAGE lbams AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lbams.SPC
**
** Module		: LS
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

	Name	:	lbams
	Purpose :	Utilities related to LS Value Dated Amendments
	Date	:	20-APR-2006
-----------------------------------------------------------------

	1.	fn_choo_mantra_gali

	2.	fn_regen_sch

	3.	fn_sch_calc

	4.	fn_vami

	5.	fn_pass_entries

	6.	fn_update_audit

	7.	fn_call_isreferral

	8.	fn_floating_queue

	9.	pr_dbg

-----------------------------------------------------------------
	Revision History
-------------------
	Date	Person		Remarks
-----------------------------------------------------------------


20-APR-2006	FLEXCUBE V.CL  Release 7.0 Created new SPC for LS vami related activities.
23-may-2006 FLEXCUBE V.CL  Release 7.0 itr2 lot2 sfr#44 new specification fn_vamb is added
13-jun-2006	FLEXCUBE V.CL  Release 7.1 release function added fn_set_auto_repay_sch
20-JUN-2006 FCC V.CL RELEASE 7.1 CHANGES
09-SEP-2006 FLEXCUBE V.CL RELEASE 7.1 BVPRAM CHANGES BY PIYUSH
19-OCT-2006 FLEXCUBE V.CL Release 7.2 changes daya
--added a function spec fn_rollover_vami_update as
--When a VAMI is tried on child contract of consol rollover, rollover was not happening on the maturity date.
21-Jun-2007 FLEXCUBE V.CL Release 7.3 NP VAMI Changes By Aji
	Added 3 New functions for NP vami - fn_npvami_processing,fn_npvami_authorise and fn_npvami_delete
21-Jun-2007 FLEXCUBE V.CL Release 7.3 NP VAMI Changes By Maneeha
	Added a new function fn_recalc_ratio_on_npvami to recalculate the ratio.
03-Jul-2007 FLEXCUBE V.CL Release 7.3 NP Vami changes
14-SEP-2007	FCC V.CL Release 7.3 VAMB Reversal Changes September '07
02-NOV-2007 FCC V.CL 7.3 FDPRAM CHANGES,
	Added a new function fn_propagate_vami_ratio_dr to propagate the asset ratio to drawdown, if there is any future events after the vami.
11-DEC-2008 FLEXCUBE V.CL Release 7.4 SLT  - Commitment Reduction changes
21-JAN-2009 FLEXCUBE V.CL Release 7.4 ITR1 SFR#42 - To process Drawdown contracts first for NPVAMI with negative amount.
11-Feb-2009 FLEXCUBE V.CL Release 7.4 ITR2 SFR#73 Fix changes for Negative NP Vami Processing changes added the new function Fn_Negative_Npvami_Online
21-Aug-2009 CITIUS-LS#6233 FLEXCUBE V.CL Release 7.5 lot1.1 Sighting Funds RT Fix#592 new function fn_checkfront_status came as part of CITIUS-LS#6199 retro which has being declared in the spec of the package to call during vami,rollover and reprice
18-MAR-2010 FLEXCUBE V.CL Release 7.6 DTCC changes, 1) When the amount due of the contract is 0 then the contract must be liquidated.
						    2)when the amount due of the contract is 0 and the new maturity date in VAMI is reduced to today(by doing the negative vami of the contract amount ) then the contract must be liquidated.
25-Jun-2010 FLEXCUBE V.CL Release 7.7 FS Tag 3.3.5 Nonprorata Trades Changes
27-OCT-2010 Flexcube V.CL Release 7.8 FS VOL2 Tag 07 Global Amount for Non-Lead changes,Added a new function fn_amendment_global_amt,to calculate the global amount during VAMI.
20-JAN-2011 FLEXCUBE V.CL Release 7.8 FS VOL2 Tag 07 ITR2#27,Global Amount for Non_Lead added changes.
06-JUN-2011 FLEXCUBE V.CL Release 7.9 Retro,CITIUS-LS#7581 Multi Self participant - NPVAMI for Orig Self participant with Reason code as "STP not required" - Still STP'ed the NPVAMI into Originations
10-JAN-2012 FLEXCUBE V.CL Release 7.10 VOL1 FS Tag 04 Tranche Repayment Schedules and Non-prorata VAMI, New program units fn_npvami_new_participant,fn_get_exclude_events, pr_set_exclude_events added to process
										new participant addition during Non Prorata VAMI.
06-FEB-2012 Flexcube V.CL Release 7.10 - Retro,	EURCITIPLC-LS#12428 Unable to perform NP VAMI decrease.
31-JUL-2012 Flexcube V.CL Release 7.11, Retro CITIBLR#35076 changes Added new function for NPVAMI Job processing.
05-FEB-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 VOL1 FS Tag 08 CHANGES ADDED

 **Changed By         : Ranjan Kumar
  **Change Description :  block_ref_gen_has stoped for contract created from contract
  **Search String      :  14.1_SUP_EL_BLOCK_REF_CHANGES
  
  **Changed By         : Arunprasath
  **Change Description :  LS SOFR Changes
  **Search String      :  LS_SOFR_CHNAGE
  
  **Changed By         : Sowmya Bitra
  **Date               : 22-April-2023
  **Change Description : ECA Support for BADJ during VAMI
  **Search String      : OBCL_14.8_ECA_Changes
  
  **Changed By         : Sowmya Bitra
  **Date               : 06-June-2023
  **Change Description : EAC Check during LS FWDVAMI
  **Search String      : Bug#35420647 Changes
  
  **Changed By         : Sowmya Bitra
  **Date               : 25-July-2024
  **Change Description : OBCL_14.8_Payment_Capitalize Changes 
  **Search String      : Bug#36866128

  **Changed By         : Sowmya Bitra
  **Date               : 23-August-2024
  **Change Description : OBCL_14.8_Payment_Capitalize Changes 
                         Reverting VAMI approach changes
  **Search String      : Bug#36866128_1 
  
----------------------------------------------------------------------------------------------------------
*/


	tab_rate		olpkss_schedules.ty_rate;
	tab_amt_paid	olvdss_services.ty_amt_paid;
	h_tab			olpkss_recompute_schedules.tab_ty_comput;
	sch_type		oltbs_contract_preference.contract_schedule_type%TYPE;
	amort_meth		oltbs_contract_preference.amortisation_type%TYPE;
	amd_rec			oltbs_contract_amend_due%ROWTYPE;
	vami_esn		oltbs_contract_event_log.event_seq_no%TYPE;
	cont_sch_type	VARCHAR2(15);
  g_limittrack_blockref_call_on_auth	VARCHAR2(1) :='N'; --14.1_SUP_EL_BLOCK_REF_CHANGES

	i				BINARY_INTEGER;
	debug_mode		CHAR(1) := 'Y';

	back_valued		BOOLEAN;
	date_chgd		BOOLEAN := FALSE;
	rate_chgd		BOOLEAN := FALSE;
	prin_chgd		BOOLEAN := FALSE;
	pkg_amort_dt_chgd 		BOOLEAN := FALSE;--05-FEB-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 VOL1 FS Tag 08 ADDED
	action_code		VARCHAR2(2000);
	ret_err_code	VARCHAR2(500);
	ret_err_param	VARCHAR2(500);
	list_err_code	VARCHAR2(5000);
	list_err_param	VARCHAR2(5000);
	auto_repay_sch  	VARCHAR2(1); --20-JUN-2006 FCC V.CL RELEASE 7.1 CHANGES
	L_MODE          	VARCHAR2(1); --20-JUN-2006 FCC V.CL RELEASE 7.1 CHANGES
	gvami_event	Varchar2(1):='N';--09-SEP-2006 FCC V.CL RELEASE 7.1,BVPRAM CHANGES
	gnpvami_event	Varchar2(1):='N';			-- 03-Jul-2007 FLEXCUBE V.CL Release 7.3 NP Vami changes
	--10-JAN-2012 FLEXCUBE V.CL Release 7.10 VOL1 FS Tag 04 start
	--g_np_newpart		VARCHAR2(1):='N';
	TYPE rec_exclude_events IS RECORD(contract_ref_no oltbs_contract.contract_ref_no%TYPE,event_seq_no oltbs_contract_event_log.event_seq_no%TYPE);
	TYPE tbl_exclude_events IS TABLE OF rec_exclude_events;
	g_tbl_exclude_events	tbl_exclude_events := tbl_exclude_events();
	--10-JAN-2012 FLEXCUBE V.CL Release 7.10 VOL1 FS Tag 04 end
	g_npvami_pram		VARCHAR2(1);	--31-JUL-2012 Flexcube V.CL Release 7.11, Retro CITIBLR#35076 changes
	g_vami_reverse varchar2(1) :='N'; --LS_SOFR_CHNAGE
	g_future_date_vami varchar2(1) :='N';--Bug#34959741
	FUNCTION fn_future_dated_amds (p_branch	IN	oltms_branch.branch_code%TYPE,
			p_mod		IN			oltms_product.module%TYPE,
			p_proc_date	IN			DATE,
			p_prod		IN			oltms_product.product_code%TYPE,
			p_com_freq	IN			NUMBER,
			p_err_code	IN	OUT		VARCHAR2,
			p_err_param	IN	OUT		VARCHAR2)
	RETURN BOOLEAN;

	FUNCTION fn_choo_mantra_gali (	ref_no 		IN 	oltbs_contract.contract_ref_no%TYPE,
					vamb_esn	IN	oltbs_contract_event_log.event_seq_no%TYPE,
					vami_ver 	IN  	oltbs_contract_master.version_no%TYPE,
					latest_esn	IN OUT  oltbs_contract_event_log.event_seq_no%TYPE,
					proc_date	IN	DATE,
					p_mode		IN	CHAR,
					err_code 	IN OUT  VARCHAR2,
					p_Event_Code 	IN 	oltbs_contract_event_log.Event_Code%TYPE DEFAULT 'VAMI')
	RETURN BOOLEAN;

	FUNCTION fn_regen_sch ( ref_no 		IN oltbs_contract.contract_ref_no%TYPE,
				vamb_esn 	IN oltbs_contract_event_log.event_seq_no%TYPE,
				vami_ver 	IN oltbs_contract_master.version_no%TYPE,
				proc_date	IN DATE,
				p_mode		IN CHAR)
	RETURN BOOLEAN;

	FUNCTION fn_sch_calc (	ref_no 		IN 	oltbs_contract.contract_ref_no%TYPE,
				vami_ver	IN	oltbs_contract_master.version_no%TYPE,
				vamb_esn	IN	oltbs_contract_event_log.event_seq_no%TYPE,
			   	proc_date	IN	DATE,
			   	p_mode		IN	CHAR)
	RETURN BOOLEAN;

	FUNCTION fn_vami (ref_no	IN oltbs_contract.contract_ref_no%TYPE,
	 		  vamb_esn	IN oltbs_contract_event_log.event_seq_no%TYPE,
			  vami_ver	IN oltbs_contract_master.version_no%TYPE,
			  proc_date	IN DATE,
			  p_mode	IN CHAR,
			  p_Event_Code IN oltbs_contract_event_log.Event_Code%TYPE DEFAULT 'VAMI')
	RETURN BOOLEAN;

	FUNCTION fn_pass_entries (ref_no IN oltbs_contract.contract_ref_no%TYPE,
				vami_ver IN oltbs_contract_master.version_no%TYPE,
				vami_esn IN oltbs_contract_master.event_seq_no%TYPE,
				p_mode	 IN CHAR,
				p_Event_Code IN oltbs_contract_event_log.Event_Code%TYPE DEFAULT 'VAMI')
	RETURN BOOLEAN;

	FUNCTION fn_update_audit (ref_no 	IN 	oltbs_contract.contract_ref_no%TYPE,
				vami_esn 	IN 	oltbs_contract_master.event_seq_no%TYPE,
				vamb_esn 	IN 	oltbs_contract_master.event_seq_no%TYPE,
			     p_mode	 	IN	CHAR,
				p_cont_stat	IN OUT	CHAR,
				p_Event_Code IN oltbs_contract_event_log.Event_Code%TYPE DEFAULT 'VAMI'
				)
	RETURN BOOLEAN;

	FUNCTION fn_call_isreferral (ref_no IN oltbs_contract.contract_ref_no%TYPE,
				vami_esn IN oltbs_contract_master.event_seq_no%TYPE)
	RETURN BOOLEAN;

	FUNCTION fn_floating_queue (ref_no IN oltbs_contract.contract_ref_no%TYPE,
				event_no	IN oltbs_contract_event_log.event_seq_no%TYPE,
				vami_ver	IN oltbs_contract_master.version_no%TYPE,
				from_date	IN DATE)
	RETURN BOOLEAN;

	PROCEDURE	pr_dbg (msg IN VARCHAR2);

--23-may-2006 fcc v.cl release 7.0 itr2 lot2 sfr#44 changes
	FUNCTION fn_vamb
         (
          p_borrower_ref_no IN oltbs_contract.contract_ref_no%TYPE,
          p_esn             IN oltbs_contract_event_log.event_seq_no%TYPE ,
          p_event_code      IN VARCHAR2,
		  p_amend_date      IN DATE,
          p_br_event_date   IN DATE,
          p_br_value_date   IN DATE,
          p_contract_type   IN VARCHAR2,
          p_error_code      IN OUT VARCHAR2,
          p_error_params    IN OUT VARCHAR2
          )
	RETURN BOOLEAN;
--23-may-2006 fcc v.cl release 7.0 itr2 lot2 sfr#44 changes
FUNCTION fn_set_auto_repay_sch
         (
         p_auto_repay_sch IN VARCHAR2,
         p_error_code      IN OUT VARCHAR2,
         p_error_params IN OUT VARCHAR2
          )
RETURN BOOLEAN;
--FLEXCUBE V.CL RELEASE 7.1 BVPRAM CHANGES BY PIYUSH 09-SEP-2006
PROCEDURE pr_set_pram(p_status IN VARCHAR2);
--FLEXCUBE V.CL RELEASE 7.1 BVPRAM CHANGES BY PIYUSH 09-SEP-2006
--19-OCT-2006 FLEXCUBE V.CL Release 7.2 changes daya
FUNCTION fn_rollover_vami_update
		(p_contract_ref_no	IN	oltbs_contract.contract_ref_no%type,
		p_rollover_method	IN	oltbs_contract_master.rollover_method%TYPE,
		p_rollover_date	    IN 	date,
		p_err_code		    IN OUT varchar2,
		p_err_params	    IN OUT varchar2
		)
RETURN BOOLEAN;
--19-OCT-2006 FLEXCUBE V.CL Release 7.2 changes daya
--21-Jun-2007 FLEXCUBE V.CL Release 7.3 NP VAMI Changes by Aji Starts
FUNCTION fn_npvami_processing
	(
	p_contract_ref_no		IN	VARCHAR2,
	p_trade_ref_no			IN	VARCHAR2, --25-Jun-2010 FLEXCUBE V.CL Release 7.7 FS Tag 3.3.5 Nonprorata Trades Changes
	p_tr_vami_amount		IN	NUMBER,
	P_value_date		IN	DATE,
	p_reason_code			IN  oltbs_contract_amend_due.reason_code%TYPE DEFAULT NULL,--FLEXCUBE V.CL Release 7.9 Retro CITIUS Till#7581 Multi Self participant - NPVAMI for Orig Self participant with Reason code as "STP not required" - Still STP'ed the NPVAMI into Originations,Changes
  	p_error_code		OUT	VARCHAR2,
	p_error_params		OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_npvami_authorise(p_contract_ref_no IN oltbs_contract.contract_ref_no%type,
                             	p_error_code      OUT VARCHAR2,
                             	p_error_params    OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_npvami_delete(p_contract_ref_no IN oltbs_contract.contract_ref_no%type,
                           p_error_code      OUT VARCHAR2,
                           p_error_params    OUT VARCHAR2)
RETURN BOOLEAN;
--21-Jun-2007 FLEXCUBE V.CL Release 7.3 NP VAMI Changes Ends
--21-Jun-2007 FLEXCUBE V.CL Release 7.3 NP VAMI Changes by Maneeha Starts
FUNCTION  fn_recalc_ratio_on_npvami
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_amnd_rec			IN	  	oltbs_contract_amend_due%ROWTYPE,
 	p_vamb_esn			IN         	oltbs_contract_event_log.event_seq_no%TYPE,
     	p_vami_verno		IN         	oltbs_contract_master.version_no%TYPE,
	p_vami_esn			IN         	oltbs_contract_event_log.event_seq_no%TYPE,
	p_vami_date			IN 	  	oltbs_contract_master.value_date%TYPE,
	p_contract_type 		IN	  	oltbs_contract.product_type%TYPE,
   	p_err_code			IN OUT     	varchar2,
   	p_err_params		IN OUT     	VARCHAR2
	)
RETURN BOOLEAN;
--21-Jun-2007 FLEXCUBE V.CL Release 7.3 NP VAMI Changes by Maneeha Ends;
-- 03-Jul-2007 FLEXCUBE V.CL Release 7.3 NP Vami changes  starts
FUNCTION  fn_populate_gtemp_on_npvami
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_vamb_esn			IN 		oltbs_contract_amend_due.event_seq_no%type,
	p_vami_date			IN 		oltbs_contract_master.value_date%TYPE,
	p_diff_amount		IN 		oltbs_contract_amend_due.differential_amount%type,
   	p_err_code			IN OUT    	varchar2,
   	p_err_params		IN OUT    	VARCHAR2
	)
RETURN BOOLEAN;
FUNCTION fn_participant_backup_vami
			(
			p_contract_ref_no	IN		oltbs_contract.contract_ref_no%TYPE,
			p_flag		IN		VARCHAR2, -- B - backup, R - restore
			p_error_code	IN OUT	VARCHAR2,
			p_error_param	IN OUT	VARCHAR2
			)
RETURN BOOLEAN;
FUNCTION fn_npvami_dd_validations
			(
				p_contract_ref_no IN 		oltbs_contract.contract_ref_no%TYPE,
				p_tr_vami_amount	IN		NUMBER,
				p_value_date	IN		oltbs_contract_amend_due.value_date%type,
                        p_error_code      IN OUT 	VARCHAR2,
                        p_error_params    IN OUT 	VARCHAR2
			)
RETURN BOOLEAN;
-- 03-Jul-2007 FLEXCUBE V.CL Release 7.3 NP Vami changes ends

--FCC V.CL Release 7.3 VAMB Reversal Changes September '07 starts
FUNCTION Fn_Amendment_reversal
(
	p_Contract_Ref_No			IN	OUT		oltbs_contract.contract_ref_no%TYPE,
	p_Event_Seq_No				IN			oltbs_contract_event_log.event_seq_no%TYPE,
	p_fire_event					IN			varchar2,
	P_backup_required					IN			varchar2,
	P_ERROR_CODE			IN	OUT	Varchar2,
	P_ERROR_PARAMS		IN	OUT	Varchar2
)
RETURN BOOLEAN;

FUNCTION Fn_delete_Amendment_reversal
(
	p_Contract_Ref_No			IN	oltbs_contract.contract_ref_no%TYPE,
	p_Event_Seq_No			IN	oltbs_contract_event_log.event_seq_no%TYPE,
	p_restore_required			IN	Varchar2,
	P_ERROR_CODE			IN	OUT	Varchar2,
	P_ERROR_PARAMS		IN	OUT	Varchar2
)
RETURN BOOLEAN;

FUNCTION Fn_delete_Amendment_tables
(
	p_Contract_Ref_No			IN	oltbs_contract.contract_ref_no%TYPE,
	p_Event_Seq_No			IN	oltbs_contract_event_log.event_seq_no%TYPE,
	P_ERROR_CODE			IN	OUT	Varchar2,
	P_ERROR_PARAMS		IN	OUT	Varchar2
)
RETURN BOOLEAN;

--FCC V.CL Release 7.3 VAMB Reversal Changes September '07 ends

-- 02-NOV-2007 FCC V.CL 7.3 FDPRAM CHANGES STARTS
FUNCTION fn_propagate_vami_ratio_dr
				(
				p_contract_ref_no   	IN 	oltbs_contract.contract_ref_no%TYPE,
			      	p_vami_esn     		IN 	oltbs_contract_event_log.event_seq_no%TYPE,
			      	p_product_type		IN 	oltbs_contract.product_type%type,
			      	p_process_date   	IN 	DATE,
			      	p_err_code		IN OUT  VARCHAR2,
			      	p_err_param		IN OUT  VARCHAR2
				)
RETURN BOOLEAN;
-- 02-NOV-2007 FCC V.CL 7.3 FDPRAM CHANGES ENDS

-- 11-DEC-2008 FLEXCUBE V.CL Release 7.4 SLT  - Commitment Reduction changes  Starts
FUNCTION fn_Cmtred_Hoff_Insert
         (p_contract_ref_no IN lbtbs_contract_participant.contract_ref_no%TYPE,
          p_esn                  IN oltbs_contract_amend_due.vami_esn%TYPE,
          p_error_code           IN OUT VARCHAR2,
          p_error_params         IN OUT VARCHAR2)
RETURN BOOLEAN ;
-- 11-DEC-2008 FLEXCUBE V.CL Release 7.4 SLT  - Commitment Reduction changes  Ends
-- 21-JAN-2009 FLEXCUBE V.CL Release 7.4 ITR1 SFR#42 starts
 FUNCTION fn_recalc_ratio_npvami_Decr(
	 			     p_contract_ref_no 		IN oltbs_contract.contract_ref_no%TYPE,
                                     p_differential_amount      IN oltbs_contract_amend_due.differential_amount%TYPE,
                                     p_vamb_esn        		IN oltbs_contract_event_log.event_seq_no%TYPE,
                                     p_vami_date       		IN oltbs_contract_master.value_date%TYPE,
                                    -- pv_part_ratio     		OUT Ty_part_ratio,
                                     p_err_code        		IN OUT VARCHAR2,
                                     p_err_params      		IN OUT VARCHAR2)
 RETURN BOOLEAN ;

 FUNCTION fn_populate_part_npvami_Decr(
 				     p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
 	                             p_amnd_rec        IN oltbs_contract_amend_due%ROWTYPE,
                                     p_vamb_esn        IN oltbs_contract_event_log.event_seq_no%TYPE,
                                     p_vami_verno      IN oltbs_contract_master.version_no%TYPE,
 				     p_vami_esn        IN oltbs_contract_event_log.event_seq_no%TYPE,
                                     p_vami_date       IN oltbs_contract_master.value_date%TYPE,
                                     p_contract_type   IN oltbs_contract.product_type%TYPE,
                                   --  pv_part_ratio     IN Ty_part_ratio,
                                     p_err_code        IN OUT VARCHAR2,
                                     p_err_params      IN OUT VARCHAR2)
 RETURN BOOLEAN ;
-- 21-JAN-2009 FLEXCUBE V.CL Release 7.4 ITR1 SFR#42 ends
-- 21-JAN-2009 FLEXCUBE V.CL Release 7.4 ITR1 SFR#42 starts --23-jan-2009
FUNCTION fn_fire_pram_at_dd_npvamidecr(
					p_contract_ref_no IN VARCHAR2,
    		                        p_value_date      IN DATE,
                                	p_error_code      OUT VARCHAR2,
                                	p_error_params    OUT VARCHAR2
                                	)
RETURN BOOLEAN;

FUNCTION fn_npvami_dd_backup(
				p_contract_ref_no 	IN VARCHAR2,
				p_error_code      	OUT VARCHAR2,
				p_error_params    	OUT VARCHAR2
				)
RETURN BOOLEAN;
-- 21-JAN-2009 FLEXCUBE V.CL Release 7.4 ITR1 SFR#42 ends
--11-Feb-2009 FLEXCUBE V.CL Release 7.4 ITR2 SFR#73 Fix changes for Negative NP Vami Processing st
TYPE TY_part_np_rato IS TABLE OF lbtbs_part_nonprorata_ratio%ROWTYPE;
TYPE T_NPRATIOS IS RECORD (
                                   contract_ref_no         oltbs_contract.contract_ref_no%TYPE,
                                   participant             lbtbs_part_nonprorata_ratio.participant%TYPE,
                                   event_seq_no            lbtbs_part_nonprorata_ratio.event_seq_no%TYPE,
                                   value_date              lbtbs_part_nonprorata_ratio.value_date%TYPE,
                                   principal_nonprorata_ratio   lbtbs_part_nonprorata_ratio.principal_nonprorata_ratio%TYPE
                                );
TYPE    TY_NPRATIOS IS TABLE OF T_NPRATIOS INDEX BY BINARY_INTEGER;
P_TY_NPRATIOS   TY_NPRATIOS;
FUNCTION Fn_Negative_Npvami_Online
                                (       p_contract_ref_no IN oltbs_contract.CONTRACT_REF_NO%TYPE,
                                        p_amnd_rec        IN oltbs_contract_amend_due%ROWTYPE,
                                        --p_part_np_rato    IN TY_NPRATIOS,--lbtbs_part_nonprorata_ratio%ROWTYPE,
                                        p_vamb_esn        IN oltbs_contract_event_log.EVENT_SEQ_NO%TYPE,
                                        p_vami_esn        IN oltbs_contract_event_log.EVENT_SEQ_NO%TYPE,
                                        p_vami_date       IN oltbs_contract_master.VALUE_DATE%TYPE,
                                        p_err_code        IN OUT VARCHAR2,
                                        p_err_params      IN OUT VARCHAR2
                                )
RETURN BOOLEAN;
--11-Feb-2009 FLEXCUBE V.CL Release 7.4 ITR2 SFR#73 Fix changes for Negative NP Vami Processing till here
--CITIUS-LS#6233--21-Aug-2009 FLEXCUBE V.CL Release 7.5 lot1.1 Sighting Funds RT Fix#592 Starts
  FUNCTION fn_checkfront_status
  (
  	p_contract_ref_no		IN	VARCHAR2,
  	p_err_code			IN OUT 	VARCHAR2,
  	p_err_param			IN OUT	VARCHAR2
  )
  RETURN BOOLEAN;
--CITIUS-LS#6233--21-Aug-2009 FLEXCUBE V.CL Release 7.5 lot1.1 Sighting Funds RT Fix#592 Starts
--18-MAR-2010 FLEXCUBE V.CL Release 7.6 DTCC changes starts
FUNCTION fn_tranche_cont_stat_updation
				(
				p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
				p_event_seq_no		IN	oltbs_contract.latest_event_seq_no%TYPE,
				p_err_code		IN OUT	VARCHAR2,
				p_err_params		IN OUT	VARCHAR2
				)
RETURN BOOLEAN;
--18-MAR-2010 FLEXCUBE V.CL Release 7.6 DTCC changes ends
--27-OCT-2010 Flexcube V.CL Release 7.8 FS VOL2 Tag 07 Global Amount for Non-Lead changes starts
FUNCTION fn_amendment_global_amt
				(
				p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE
				, p_event_seq_no	IN	oltbs_contract.latest_event_seq_no%TYPE
				--, p_effectvie_date	IN	oltbs_contract_amend_due.value_date%TYPE --20-JAN-2011 FLEXCUBE V.CL Release 7.8 FS VOL2 Tag 07 ITR2#27 here
				, p_effective_date	IN	oltbs_contract_amend_due.value_date%TYPE --20-JAN-2011 FLEXCUBE V.CL Release 7.8 FS VOL2 Tag 07 ITR2#27 here
				, p_vami_amount		IN	oltbs_contract_amend_due.differential_amount%TYPE
				, p_err_code		IN OUT	VARCHAR2
				, p_err_param		IN OUT	VARCHAR2
				)
RETURN BOOLEAN;
--27-OCT-2010 Flexcube V.CL Release 7.8 FS VOL2 Tag 07 Global Amount for Non-Lead changes ends
--10-JAN-2012 FLEXCUBE V.CL Release 7.10 VOL1 FS Tag 04 Start
FUNCTION fn_npvami_new_participant
	(
		p_contract_ref_no	IN		oltbs_contract_master.contract_ref_no%type
		,p_value_date		IN		DATE
		,p_event_seq_no	IN		lbtws_transfer_master.entry_seq_no%type
		,p_err_code		IN OUT	VARCHAR2
		,p_err_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--PROCEDURE pr_set_np_newpart(p_status IN VARCHAR2);
FUNCTION fn_get_exclude_events
RETURN tbl_exclude_events PIPELINED;
PROCEDURE pr_set_exclude_events
	(
	p_contract_ref_no	IN		oltbs_contract.contract_ref_no%TYPE
	,p_event_seq_no	IN		oltbs_contract_event_log.event_seq_no%TYPE
	);
PROCEDURE pr_reset_exclude_events;
--10-JAN-2012 FLEXCUBE V.CL Release 7.10 VOL1 FS Tag 04 end
--EURCITIPLC-LS#12428 Changes Start
FUNCTION Fn_Negative_Npvami_Online
                                (       p_contract_ref_no IN oltbs_contract.CONTRACT_REF_NO%TYPE,
                                        p_mod_esn         IN oltbs_contract_event_log.EVENT_SEQ_NO%TYPE,
                                        p_vamb_esn        IN oltbs_contract_event_log.EVENT_SEQ_NO%TYPE,
                                        p_vami_esn        IN oltbs_contract_event_log.EVENT_SEQ_NO%TYPE,
                                        p_vami_date       IN oltbs_contract_master.VALUE_DATE%TYPE,
                                        p_dummy           IN VARCHAR2,
                                        p_err_code        IN OUT VARCHAR2,
                                        p_err_params      IN OUT VARCHAR2
                                )
RETURN BOOLEAN;
--EURCITIPLC-LS#12428 Changes End
--31-JUL-2012 Flexcube V.CL Release 7.11, Retro CITIBLR#35076 changes start
PROCEDURE pr_npvami_job
	(
	p_branch			IN	oltbs_contract.branch%TYPE
	,p_process_seq	IN	NUMBER
	,p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE DEFAULT 'ALL'
	);
--31-JUL-2012 Flexcube V.CL Release 7.11, Retro CITIBLR#35076 changes end

--OBCL_14.8_ECA_Changes Start
FUNCTION Fn_Eca_Fwd_Vami(p_Branch          IN Oltms_Branch.Branch_Code%TYPE,
                           p_User            IN Smtbs_User.User_Id%TYPE,
                           p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                           p_Mod             IN Oltms_Product.Module%TYPE,
                           p_Proc_Date       IN DATE,
                           p_Eca_Ref_No      IN OUT VARCHAR2,
                           p_Err_Code        IN OUT VARCHAR2,
                           p_Err_Param       IN OUT VARCHAR2)
RETURN VARCHAR2;
--OBCL_14.8_ECA_Changes End

-- LS_25_Sep_2020 SOFR changes starts
FUNCTION fn_future_dated_amds_java(p_branch    IN oltms_branch.branch_code%TYPE,
                              p_user    IN smtbs_user.user_id%TYPE,
                              p_contract_ref_no    IN oltbs_contract.contract_ref_no%TYPE,
                              p_mod       IN oltms_product.module%TYPE,
                              p_proc_date IN DATE,
							  p_Eca_Ref_No      IN OUT VARCHAR2, --OBCL_14.8_ECA_Changes
                              p_rfr_Msgid          IN OUT VARCHAR2,
							  p_Eac_Msgid       IN OUT VARCHAR2, --Bug#35420647 Changes
                              p_err_code  IN OUT VARCHAR2,
                              p_err_param IN OUT VARCHAR2) RETURN VARCHAR2;
-- LS_25_Sep_2020 SOFR changes ends

--Bug#36866128_1  Commented Start
--Bug#36866128 Changes Start
/*FUNCTION Fn_Pymnt_Cap_Process(p_Contract_Ref_No    IN Oltb_Contract.Contract_Ref_No%TYPE,
                                p_Total_Interest_Amt IN Oltb_Amount_Due.Amount_Due%TYPE,
                                p_Processing_Date    IN DATE,
                                p_Err_Code           IN OUT VARCHAR2,
                                p_Err_Param          IN OUT VARCHAR2)
RETURN BOOLEAN;*/
--Bug#36866128 Changes End
--Bug#36866128_1  Commented End
END lbams;
/
CREATE or replace SYNONYM lbamss FOR lbams
/