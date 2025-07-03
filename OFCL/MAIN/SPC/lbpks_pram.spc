CREATE OR REPLACE PACKAGE lbpks_pram
AS


/*----------------------------------------------------------------------------------------------------
**
** File Name	: lbpks_pram.spc
**
** Module	: LOAN SYNDICATION
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


/*----------------------------------CHANGE HISTORY----------------------------------

17/03/2003 - FCC 4.2 April 2003 LS changes

   This package is created to process the participant side transfer activities based on the contract screen for the same

08-AUG-2005 FCC 4.6.2 CITI LS CHANGES - PRAM. 
	Modified to incorporate the Value Date column addition in LSTB_CONTRACT_PARTICPANT and lbtb_participant_ratio
	Added a new function FN_PRAM_UNLOCK, FN_PASS_ENTRIES_PRAM
13-MAR-2006 FCC V.CL RELEASE 7.0 ADDED 2 FUNCTIONS FN_CREATE_NEW_VERSION TO INCORPORATE VERSION NO RELATED CHANGES DAYA
18-AUG-2006 FLEXCUBE V.CL RELEASE 7.1 BVPRAM CHANGES BY PIYUSH
            New Functions fn_populate_amount_due, FN_INSERT_PARTICIPANT_VDBAL, FN_POPULATE_TRANCHE_PART_VDBAL, 
            FN_REBUILD_PART_VDBAL, FN_BUILD_PART_TRANSFER_VDBAL introduced.
18-AUG-2006 FLEXCUBE V.CL Release 7.1 BVPRAM CHANGES VIJETH 
            New functions FN_INSERT_PART_DETAILS and FN_UNLOCK_CONTRACT_NEW introduced.
21-AUG-2006 FLEXCUBE V.CL RELEASE 7.1 BVPRAM CHANGES BY SAMBHAJI
            fn_backup_vdbal and fn_restore_vdbal functions introduced.
23-AUG-2006 FLEXCUBE V.CL RELEASE 7.1 BVPRAM CHANGES BY SAMBHAJI
            fn_propagate_ratio introduced.
24-AUG-2006 FLEXCUBE V.CL RELEASE 7.1 BVPRAM CHANGES BY SAMBHAJI
            fn_propagate_ratio with 6 params introduced.
15-SEP-2006 FLEXCUBE V.CL Release 7.1 ITR1 SFR#51 SAMBHAJI function fn_propagate_ratio_tr introduced.
21-SEP-2006 FLEXCUBE V.CL Release 7.1 ITR1 SFR#139
            vdbal backup functions removed. olpks_ln_synd_services will be used.
--17-NOV-2006 FLEXCUBE V.CL Release 7.2 Date Many to Many PRAM changes
10-JAN-2007 FLEXCUBE V.CL Release 7.2 DD Reversal Changes. Commented Function declaration FN_PROPAGATION_PRAM in body and brought that delcaration to specification
27-FEB-2007 FLEXCUBE V.CL RELEASE 7.2 unauth pram changes
            Following functions commented as they will not be used any more.
            fn_unlock_contract_new, fn_unlock_contract, fn_delete_contract, fn_create_new_version,
            fn_populate_amount_due, fn_populate_tranche_part_vdbal
            Following functions introduced fn_delete_unauth_pram, fn_pre_save_processing
21-Mar-2007 FLEXCUBE V.CL Release 7.2 ITR1 SFR#157
            fn_get_dd_balances added
18-Jun-2007 CITILS,BV INT-LIQD-VAMI beyond PRAM Date.
05-oct-2007 FCC V.CL Release 7.3 Ratio Rebuild Changes
02-NOV-2007 FCC V.CL 7.3 FDPRAM CHANGES 
		Added New functions
		1) fn_pami - This function is used to fire the PAMI event at the Tranche contract and underlying drawdown 
			     contracts on the value date of the future dated participant transfer.
		2) fn_part_pami - This function is called from FN_PAMI to fire PAMI event at the participant contracts at Tranche and Drawdown.
		3) fn_pop_worktable -	This is used to copy the data from main tables to the worktables
		4) fn_part_delete_pamc - This function is used to delete the new participant with zero ratios on firing of PAMC
		5) fn_update_contract_participant - This function is used to update the event seq no in the lbtb_contract_participant table.
		6) pr_set_pamb_esn - This function is used to set the global variable to the previous event sequence number whiling doing the PAMB/PAMA Event. 
02-NOV-2007 FCC V.CL Release 7.3 Tranche Upsize Changes 
		Added a new Function fn_npvami_pram_dr - This Function is used to 		 	                 Fire PRAM event for the underlying drawdowns in case of Tranche upsize of cascade 'Y'		
07-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR1 SFR#299, added a new function	
 FLEXCUBE V.CL Release 7.3 ITR2 SFR#13,Retro Changes CITIUS-LS-326, 13-DEC-2007	
25-JAN-2008 FLEXCUBE V.CL Release 7.4,Job processing for PRCH, Added new functions.
08-FEB-2008 FLEXCUBE V.CL Release 7.4,ratio change, Added new function for rebuilding of amount 
18-FEB-2008 FCC V.CL Release 7.4 BAU Thirdparty Fax Changes. Added fn_regen_msg function.
25-APR-2008 FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-<1053> Changes for PRCH Job
11-JUN-2008 FLEXCUBE V.CL RELEASE 7.4 BAU changes for posting accounting entry SFR#31 - Added parameter in FN_PAMI function -banu
21-Aug-2008 FCC V.CL Release 7.4 STP NonprorataVAMI Changes, Added a new function fn_fire_pram_at_drawdown to fire the PRAM event at the drawdown level for the NPVAMI and tranche upsize
10-Sep-2008 FCC V.CL Release 7.4 STP NonprorataVAMI Changes moved the function FN_TRANSFER_AMOUNT_CALC from SQL to SPC 
06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS Till#1336,STP Consolidation,By Swapnasish,Changes for Detailed PRAM Screen testing
11-NOV-2008 FCC V.CL Release 7.4 Pram Job changes magi
12-Dec-2008	FCC V.CL Release 7.4 Pram Job changes magi
24-DEC-2008 FLEXCUBE V.CL Release 7.4 MTR1 SFR#72, 24-dec-2008,CITIUS-LS#5142,CITIUS-LS#5155
28-MAY-2009 CITIUS-LS#SRT5764 Missing Retro from CITIUS to BLORE
                1]  06-MAY-2009 CITIUS-LS#5704 For LC drawdown products there wont be any interest/fee/charge components. So interest rebuild routine is skipped for LC Products.
26-AUG-2009 CITIUS-LS#6235, Clearpar and SLT incremental changes retro - changed the copyright clause.
09-JUN-2010 Flexcube V.CL 7.7 FS Tag 05 Third Party Assignment Changes,Added a new function with validations to be fired during PRAM
03-JAN-2011 Flexcube V.CL Release 7.8, SFR#14, CITIUS Retro Till#7427 changes - fn_book_zero_investor function introduced.
24-FEB-2011 Flexcube V.CL Release 7.9, FS Volume02 Tag05, Third Party Fax For New Investor Changes to generate fax for new investor added during PRAM.
06-JAN-2012 Flexcube V.CL Release 7.10 Vol1 FS Tag 09, Assignment and Refax changes for Sighting Funds
25-Jan-2012 Flexcube V.CL Release 7.10 – Retro   22-DEC-2011 CITIUS-LS#12212, DCF First time buy conversion related fix.
                                                 09-JAN-2012 CITIUS-LS#12284, In this case STP is failing while creating the commitment, as at the time of position validation system is validating the commitment balance with current agency balance and as initial commitment amount will be 0, hence the STP is failing. 
							                      Added new column in lbtbs_transfer_master to identify the first time buy case, reading the same in lsstp.sql to skip the assignment to borr_esn.
31-JUL-2012 Flexcube V.CL Release 7.11, Retro CITIBLR#35076 changes Added new function fn_process_pram_dd
01-AUG-2012 Flexcube V.CL Release 7.11, Retro, CITIUS#14261 Changes New job for freeformat msg regen
21-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol1 Tag03 changes,below new functions are added,
            fn_check_hfs_transfer,fn_validate_hfs_transfer,fn_hfs_transfer_pop_coc_bal,fn_compute_cost_basis
			
  Changed By         : Jayaram N
  Date               : 17-Feb-2019
  Change Description : SLT:Primary Delayed Compensation
  Search String      : OBCL14.4:SFR#29959798:Primary_Delayed_Compensation(calc participant details)	

  Changed By         : Jayaram N
  Date               : 07-Apr-2020
  Change Description : SLT:Primary Delayed Compensation
  Search String      : OBCL14.4:SFR#29959798:LOR_Adjustments  
  
**  Modified By     : Narendra Dhaker
**  Modified On     : 01-MAR-2022
**  Modified Reason : Increasing the amount field decimals to maximum
**  Search String   : Bug#33809404_DecimalChange

**  Modified By     : Narendra Dhaker
**  Modified On     : 11-MAR-2022
**  Modified Reason : Increasing the Counter Party field length from 12 to 20
**  Search String   : Bug#33904699

  Changed By         : Abhinav Bhasker
  Changed On         : 13-Apr-2022
  Search String      : OBCL_14.5_STAND_BY_FEE
  Change Reason      : Changes w.r.t. StandByFees (SFR# 34004511)

**Changed By         : Pallavi R
**Date               : 11-Apr-2024
**Change Description : On PAMB reversal ,FBOK reversal event is not triggering
**Search String      : OBCL_14.7_Internal_#36371779 Changes   
------------------------------------END CHANGE HISTORY-------------------------------------
*/
--FLEXCUBE V.CL Release 7.2 ITR1 SFR#157 start
g_error ertb_msgs.err_code%type; --SILENT_PART CHANGES
g_sbf_process_facility_pram VARCHAR2(1 CHAR) DEFAULT 'N'; --OBCL_14.5_STAND_BY_FEE
g_pt_tranche_ref_no    oltb_contract_master.tranche_ref_no%Type;--OBCL_14.5_STAND_BY_FEE
g_pram_event        VARCHAR2(1) := 'N';--OBCL_14.5_STAND_BY_FEE
G_PRAM_DATE DATE;  --14.5_noncasc_changes
g_Borr_Pamb_Esn             Oltb_Contract_Event_Log.Event_Seq_No%TYPE; --OBCL_14.7_Internal_#36371779 Changes

	TYPE t_bal_rec IS RECORD
		(
		os_bal         NUMBER,
		utilized_bal   NUMBER
		);
	FUNCTION fn_get_dd_balances
		(p_tranche_ref_no  IN oltbs_contract.contract_ref_no%TYPE
		,p_dd_ref_no       IN oltbs_contract.contract_ref_no%TYPE
		,p_value_date      IN DATE
		,p_serial_no       IN NUMBER
		,p_bal_rec         OUT t_bal_rec
		,p_err_code        OUT VARCHAR2
		,p_err_param       OUT VARCHAR2
		)
	RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.2 ITR1 SFR#157 end
--21-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol1 Tag03 changes Start
TYPE p_ld_record IS RECORD
(
COMMITMENT_REF_NO			VARCHAR2(16)
,EVENT_SEQ_NO				NUMBER	
,LOAN_REF_NO				VARCHAR2(16)
,COMPONENT					VARCHAR2(10)
,VALUE_DATE					DATE
,PORTFOLIO					VARCHAR2(20) --Bug#33904699 --VARCHAR2(12)
,CONTRA						NUMBER --Bug#33809404_DecimalChange --NUMBER(22,3)
,UNAMORTIZED_FEE_AMOUNT		NUMBER --Bug#33809404_DecimalChange --NUMBER(22,3)
,WRITEOFF					NUMBER --Bug#33809404_DecimalChange --NUMBER(22,3)
,MARKS_FEE					VARCHAR2(1)
,RESERVE_AMOUNT				NUMBER --Bug#33809404_DecimalChange --NUMBER(22,3)
,FAS114_RESERVE_AMOUNT		NUMBER --Bug#33809404_DecimalChange --NUMBER(22,3)
,CONTRACT_TYPE				VARCHAR2(1)	
);
TYPE tbl_ld_record IS TABLE OF p_ld_record INDEX BY BINARY_INTEGER;
--21-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol1 Tag03 changes End

/* --FLEXCUBE V.CL RELEASE 7.2 unauth pram changes
	FUNCTION fn_unlock_contract
		(
		p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE
		,p_latest_esn			IN		oltbs_contract.latest_event_seq_no%TYPE
		,p_module_code			IN		oltbs_contract.module_code%TYPE
		,p_contract_status		IN	 	oltbs_contract.contract_status%TYPE
		,p_contract_type		IN		lbtbs_contract_participant.contract_type%TYPE
		,p_drawdown_no			IN		lbtbs_contract_participant.drawdown_no%TYPE
		,P_VALUE_DATE			IN		DATE -- 29-JUL-2006 FLEXCUBE V.CL RELEASE 7.1 BVPRAM CHANGES  BY PIYUSH		
		,p_err_code				OUT		VARCHAR2
		,p_err_param			OUT		VARCHAR2
		)
	RETURN BOOLEAN;
*/ --FLEXCUBE V.CL RELEASE 7.2 unauth pram changes

	FUNCTION fn_save_contract
		(
		p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE
		,p_latest_esn			IN		oltbs_contract.latest_event_seq_no%TYPE
		,p_module_code			IN		oltbs_contract.module_code%TYPE
		,p_contract_status		IN	 	oltbs_contract.contract_status%TYPE
		,p_contract_type		IN		lbtbs_contract_participant.contract_type%TYPE
		,p_drawdown_no			IN		lbtbs_contract_participant.drawdown_no%TYPE
		,p_br_facility_ref_no	IN		oltbs_contract.contract_ref_no%TYPE
		,p_br_tranche_ref_no	IN		oltbs_contract.contract_ref_no%TYPE
		,p_base_latest_esn		IN		oltbs_contract.latest_event_seq_no%TYPE
		,P_VALUE_DATE		IN		DATE
		,p_err_code				OUT		VARCHAR2
		,p_err_param			OUT		VARCHAR2
		)
	RETURN BOOLEAN;

	FUNCTION fn_book_participant_contract
		(
		p_contract_ref_no		IN 		lbtbs_contract_participant.contract_ref_no%TYPE
		,p_module_code		IN		oltbs_contract.module_code%TYPE
		,p_contract_type		IN		lbtbs_contract_participant.contract_type%TYPE
		,p_drawdown_no		IN		lbtbs_contract_participant.drawdown_no%TYPE
		,p_br_facility_ref_no	IN		oltbs_contract.contract_ref_no%TYPE
		,p_br_tranche_ref_no	IN		oltbs_contract.contract_ref_no%TYPE
		,p_value_date		IN		DATE
		,p_err_code				OUT	VARCHAR2
		,p_err_param			OUT	VARCHAR2
		)
	RETURN BOOLEAN;

	FUNCTION fn_amend_participant_contract
		(
		p_br_contract_ref_no	IN 		oltbs_contract.contract_ref_no%TYPE
		,p_contract_type		IN		lbtbs_contract_participant.contract_type%TYPE
		,p_participant		IN	lbtbs_contract_participant.participant%TYPE
		,p_asset_ratio		IN	lbtbs_contract_participant.asset_ratio%TYPE
		,p_value_date		IN		DATE
		,p_err_code				OUT	VARCHAR2
		,p_err_param			OUT	VARCHAR2
		)
	RETURN BOOLEAN;
   --12-Dec-2008 FCC V.CL Release 7.4 Pram Job changes magi Uncommented
 --FLEXCUBE V.CL RELEASE 7.2 unauth pram changes
	FUNCTION fn_delete_contract
		(
		p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE
		,p_event_seq_no			IN		lbtbs_contract_participant.event_seq_no%TYPE
		,p_contract_type		IN		lbtbs_contract_participant.contract_type%TYPE
		,p_latest_esn			IN		oltbs_contract.latest_event_seq_no%TYPE
		,p_value_date			IN		date --FLEXCUBE V.CL RELEASE 7.1 BVPRAM CHANGES BY SAMBHAJI
		,p_err_code				OUT		VARCHAR2
		,p_err_param			OUT		VARCHAR2
		)
	RETURN BOOLEAN;
 --FLEXCUBE V.CL RELEASE 7.2 unauth pram changes
--12-Dec-2008	FCC V.CL Release 7.4 Pram Job changes magi Uncommented 
	FUNCTION fn_authorise_contract
		(
		p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE
		,p_event_seq_no			IN		oltbs_contract.latest_event_seq_no%TYPE
		,p_contract_type		IN		lbtbs_contract_participant.contract_type%TYPE
		,P_VALUE_DATE			IN		DATE -- 29-JUL-2006 FLEXCUBE V.CL RELEASE 7.1 BVPRAM CHANGES  BY PIYUSH		
		,p_err_code				OUT		VARCHAR2
		,p_err_param			OUT		VARCHAR2
		)
	RETURN BOOLEAN;

	FUNCTION Fn_Pass_Entries_PRAM
	(	p_borrower_contract_ref_no	IN		VARCHAR2,
		p_value_date			     IN		DATE,
		p_esn					IN		oltbs_contract_master.event_seq_no%TYPE,
		p_contract_type			IN		VARCHAR2,
		p_err_code				IN OUT	VARCHAR2,		
		p_err_param				IN OUT	VARCHAR2,
		p_event                       IN VARCHAR2 DEFAULT 'PRAM' --FLEXCUBE V.CL RELEASE 7.4 BAU changes for posting accounting entry SFR#31- banu

	) RETURN BOOLEAN;
/*--FLEXCUBE V.CL RELEASE 7.2 unauth pram changes start commented
     --03-MAR-2006 FCC V.CL 7.0 RELEASE CHANGES DAYA START
      FUNCTION fn_create_new_version(p_reference_no		IN varchar2,
						 p_update_cstb		IN varchar2 DEFAULT 'Y',
						 p_replicate_sch_defn	IN varchar2 DEFAULT 'Y',
						 p_new_event_seq_no	IN number ,
						 p_value_date		IN DATE -- 29-JUL-2006 FLEXCUBE V.CL RELEASE 7.1 BVPRAM CHANGES  BY PIYUSH						 
						 )
   	RETURN NUMBER;
        
      FUNCTION fn_create_new_version
		(
		   p_ldtbs_contract_master_rec	IN oltbs_contract_master%ROWTYPE,
		   p_update_cstb				IN varchar2 DEFAULT 'Y',
		   p_replicate_sch_defn			IN varchar2 DEFAULT 'Y',
		   p_new_event_seq_no			IN number,
		   p_value_date			IN DATE -- 29-JUL-2006 FLEXCUBE V.CL RELEASE 7.1 BVPRAM CHANGES  BY PIYUSH		   
		)
     RETURN NUMBER;
    --03-MAR-2006 FCC V.CL 7.0 RELEASE CHANGES DAYA ENDS
*/--FLEXCUBE V.CL RELEASE 7.2 unauth pram changes end commented
	--25-JUL-2006 FLEXCUBE V.CL Release 7.1 BVPRAM CHANGES,PIYUSH 
	FUNCTION fn_populate_amount_due(p_contract_ref_no	IN		oltbs_contract.contract_ref_no%Type,
				p_error_code		IN OUT		VARCHAR2,
				p_error_param	IN OUT		VARCHAR2)
	RETURN BOOLEAN;
	--25-JUL-2006 FLEXCUBE V.CL Release 7.1 BVPRAM CHANGES,PIYUSH 

--31-JUL-2006 FLEXCUBE V.CL Release 7.1 BVPRAM CHANGES,PIYUSH 
	FUNCTION FN_INSERT_PARTICIPANT_VDBAL(p_contract_ref_no IN oltbs_contract.contract_ref_no%type,
                                         p_participant     IN varchar2,
                                         p_value_date      IN date,
                                         p_contract_ccy    IN varchar2,
                                         p_action          IN varchar2,
                                         p_amount          IN number
                                         )
	RETURN BOOLEAN;
/* --FLEXCUBE V.CL RELEASE 7.2 unauth pram changes
	 FUNCTION FN_POPULATE_TRANCHE_PART_VDBAL(p_borr_tranche_ref_no IN oltbs_contract.contract_ref_no%type,
                                            p_counterparty IN varchar2,
                                            p_value_date   IN date,
                                            p_currency     IN varchar2,
                                            p_amount       IN number
                                           )
	RETURN BOOLEAN;
*/ --FLEXCUBE V.CL RELEASE 7.2 unauth pram changes
	FUNCTION FN_REBUILD_PART_VDBAL(p_contract_ref_no IN  oltbs_contract.contract_ref_no%type,
                                 p_value_date      IN  date,
				 p_err_code        out varchar2,
                                 p_err_param       out varchar2)
	RETURN BOOLEAN;

	 FUNCTION FN_BUILD_PART_TRANSFER_VDBAL(p_contract_ref_no IN oltbs_contract.contract_ref_no%type,
                                          p_value_date      IN date,
                                          p_currency        IN varchar2,
                                          p_esn             IN number,
                                          p_contract_type   IN lbtbs_contract_participant.contract_type%type,
                                          p_err_code        out varchar2,
                                          p_err_param       out varchar2
                                         )
	RETURN BOOLEAN;
--31-JUL-2006 FLEXCUBE V.CL Release 7.1 BVPRAM CHANGES,PIYUSH 
        gPram_event Varchar2(1):='N';
	  gpamb_esn  NUMBER(4):=0;  -- 02-NOV-2007 FCC V.CL 7.3 FDPRAM CHANGES
--FLEXCUBE V.CL Release 7.1 BVPRAM CHANGES VIJETH INTRODUCED starts
FUNCTION FN_INSERT_PART_DETAILS(
			      P_CONTRACT_REF_NO IN oltbs_contract.CONTRACT_REF_NO%TYPE,
                              P_LATEST_ESN      IN oltbs_contract.LATEST_EVENT_SEQ_NO%TYPE,
                              P_NEW_ESN		IN oltbs_contract.LATEST_EVENT_SEQ_NO%TYPE,
                              P_MODULE_CODE     IN oltbs_contract.MODULE_CODE%TYPE,
                              P_CONTRACT_STATUS IN oltbs_contract.CONTRACT_STATUS%TYPE,
                              P_CONTRACT_TYPE   IN lbtbs_contract_participant.CONTRACT_TYPE%TYPE,
                              P_DRAWDOWN_NO     IN lbtbs_contract_participant.DRAWDOWN_NO%TYPE,
			      P_VALUE_DATE	IN DATE,
                              P_ERR_CODE        OUT VARCHAR2,
                              P_ERR_PARAM       OUT VARCHAR2) 
RETURN BOOLEAN;
/* --FLEXCUBE V.CL RELEASE 7.2 unauth pram changes
FUNCTION FN_UNLOCK_CONTRACT_NEW(P_CONTRACT_REF_NO IN oltbs_contract.CONTRACT_REF_NO%TYPE,
                              P_LATEST_ESN      IN oltbs_contract.LATEST_EVENT_SEQ_NO%TYPE,
                              P_MODULE_CODE     IN oltbs_contract.MODULE_CODE%TYPE,
                              P_CONTRACT_STATUS IN oltbs_contract.CONTRACT_STATUS%TYPE,
                              P_CONTRACT_TYPE   IN lbtbs_contract_participant.CONTRACT_TYPE%TYPE,
                              P_DRAWDOWN_NO     IN lbtbs_contract_participant.DRAWDOWN_NO%TYPE,
			      P_VALUE_DATE	IN DATE, -- 29-JUL-2006 FLEXCUBE V.CL RELEASE 7.1 BVPRAM CHANGES  BY PIYUSH
                              P_ERR_CODE        OUT VARCHAR2,
                              P_ERR_PARAM       OUT VARCHAR2
                            ) 
RETURN BOOLEAN ;
*/ --FLEXCUBE V.CL RELEASE 7.2 unauth pram changes

PROCEDURE pr_set_pram(p_status IN VARCHAR2);
--FLEXCUBE V.CL Release 7.1 BVPRAM CHANGES VIJETH INTRODUCED ends;
/* --FLEXCUBE V.CL Release 7.1 ITR1 SFR#139 start
--FLEXCUBE V.CL RELEASE 7.1 BVPRAM CHANGES BY SAMBHAJI START 21AUG06
FUNCTION fn_backup_vdbal(P_CONTRACT_REF_NO VARCHAR2,P_VALUE_DATE DATE)
RETURN BOOLEAN;
FUNCTION fn_restore_vdbal(P_CONTRACT_REF_NO VARCHAR2,P_VALUE_DATE DATE)
RETURN BOOLEAN;
--FLEXCUBE V.CL RELEASE 7.1 BVPRAM CHANGES BY SAMBHAJI END 21AUG06
*/ --FLEXCUBE V.CL Release 7.1 ITR1 SFR#139 end
--FLEXCUBE V.CL RELEASE 7.1 BVPRAM CHANGES BY SAMBHAJI START 23AUG06
FUNCTION FN_PROPAGATE_RATIO(  P_CONTRACT_REF_NO IN  oltbs_contract.CONTRACT_REF_NO%TYPE,
                              P_VALUE_DATE      IN  DATE,
                              P_CURRENCY        IN  oltbs_contract.CONTRACT_CCY%TYPE,
                              P_ESN             IN  oltbs_contract.LATEST_EVENT_SEQ_NO%TYPE,
                              P_ERR_CODE        OUT VARCHAR2,
                              P_ERR_PARAM       OUT VARCHAR2
                           )
RETURN BOOLEAN;
--FLEXCUBE V.CL RELEASE 7.1 BVPRAM CHANGES BY SAMBHAJI END 23AUG06
--FLEXCUBE V.CL Release 7.1 ITR1 SFR#51 SAMBHAJI start
/*
--FLEXCUBE V.CL RELEASE 7.1 BVPRAM CHANGES BY SAMBHAJI 24AUG06 START
FUNCTION FN_PROPAGATE_RATIO(P_CONTRACT_REF_NO IN  oltbs_contract.CONTRACT_REF_NO%TYPE,
                            P_VALUE_DATE      IN  DATE,
                            P_ESN             IN  oltbs_contract.LATEST_EVENT_SEQ_NO%TYPE,
                            P_ERR_CODE        OUT VARCHAR2,
                            P_ERR_PARAM       OUT VARCHAR2
                           )
RETURN BOOLEAN;
--FLEXCUBE V.CL RELEASE 7.1 BVPRAM CHANGES BY SAMBHAJI 24AUG06 END
*/
--17-NOV-2006 FLEXCUBE V.CL Release 7.2 Date Many to Many PRAM changes start
  /*FUNCTION FN_PROPAGATE_RATIO_TR(  P_CONTRACT_REF_NO IN  oltbs_contract.CONTRACT_REF_NO%TYPE,
                                   P_VALUE_DATE      IN  DATE,
                                   P_ESN             IN  oltbs_contract.LATEST_EVENT_SEQ_NO%TYPE,
                                   P_PREPONED_PARTICIPANTS OUT VARCHAR2,
                                   P_ERR_CODE        OUT VARCHAR2,
                                   P_ERR_PARAM       OUT VARCHAR2
                                )
  RETURN BOOLEAN;*/
--17-NOV-2006 FLEXCUBE V.CL Release 7.2 Date Many to Many PRAM changes end
  gp_preponed_participants varchar2(4000) := null;

--FLEXCUBE V.CL Release 7.1 ITR1 SFR#51 SAMBHAJI end
--17-NOV-2006 FLEXCUBE V.CL Release 7.2 Date Many to Many PRAM changes start
FUNCTION FN_CONVERT_DETAIL_CONSOL
	(p_contract_ref_no varchar2 	, 
	 p_value_date date 		, 
	 p_event_seq_no number 		, 
	 p_Err_code	in out Varchar2,
	 p_Err_param	in out Varchar2)
RETURN BOOLEAN;
FUNCTION fn_recalc_ratio	
	(p_contract_ref_no       	IN oltbs_contract.CONTRACT_REF_NO%TYPE,
         p_value_date            	IN DATE,
         p_esn                   	IN oltbs_contract.LATEST_EVENT_SEQ_NO%TYPE,
         --p_preponed_participants 	OUT VARCHAR2,--24-DEC-2008 FLEXCUBE V.CL Release 7.4 MTR1 SFR#72, 24-dec-2008, CITIUS-LS#5155
         p_err_code              	OUT VARCHAR2,
         p_err_param             	OUT VARCHAR2,
         p_fire_event             	IN VARCHAR2 DEFAULT 'Y' )--24-DEC-2008 FLEXCUBE V.CL Release 7.4 MTR1 SFR#72, 24-dec-2008, CITIUS-LS#5155)
RETURN BOOLEAN;

FUNCTION FN_UPDATE_PART_CONTRACT_MASTER(  P_CONTRACT_REF_NO IN  oltbs_contract.CONTRACT_REF_NO%TYPE,
                                 P_VALUE_DATE      IN  DATE,
                                 P_ESN             IN  oltbs_contract.LATEST_EVENT_SEQ_NO%TYPE,
                                 P_ERR_CODE        OUT VARCHAR2,
                                 P_ERR_PARAM       OUT VARCHAR2
                              )
RETURN BOOLEAN;
--17-NOV-2006 FLEXCUBE V.CL Release 7.2 Date Many to Many PRAM changes end
--10-JAN-2007--FLEXCUBE V.CL Release 7.2 DD Reversal Changes--START
  FUNCTION FN_PROPAGATION_PRAM(P_REF_NO IN VARCHAR2,P_VALUE_DATE DATE
-- FLEXCUBE V.CL Release 7.3 ITR2 SFR#13,Retro Changes CITIUS-LS-326, 13-DEC-2007 STARTS
                              ,P_ERR_CODE IN OUT  VARCHAR2, P_ERR_PARAM  IN OUT VARCHAR2 --FLEXCUBE V.CL RELEASE 7.1 BVPRAM CHANGES BY SAMBHAJI 06SEP06
-- FLEXCUBE V.CL Release 7.3 ITR2 SFR#13,Retro Changes CITIUS-LS-326, 13-DEC-2007 ENDS                             
)RETURN BOOLEAN;
--10-JAN-2007--FLEXCUBE V.CL Release 7.2 DD Reversal Changes--END
--FLEXCUBE V.CL RELEASE 7.2 unauth pram changes start
FUNCTION fn_delete_unauth_pram
	(p_contract_ref_no IN  oltbs_contract.contract_ref_no%TYPE,
	 p_value_date      IN  DATE,
	 p_entry_seq_no    IN  NUMBER,
	 p_err_code        OUT ertbs_msgs.err_code%TYPE,
	 p_err_param       OUT VARCHAR2
	)
RETURN BOOLEAN;
FUNCTION fn_pre_save_processing
	(p_contract_ref_no  IN  oltbs_contract.contract_ref_no%TYPE,
	 p_value_date       IN  DATE,
	 p_entry_seq_no     IN  NUMBER,
	 p_new_esn          OUT oltbs_contract.latest_event_seq_no%TYPE,
	 p_err_code         OUT ertbs_msgs.err_code%TYPE,
	 p_err_param        OUT VARCHAR2
	)
RETURN BOOLEAN;
FUNCTION fn_populate_gtemp
	(p_contract_ref_no    IN oltbs_contract.contract_ref_no%TYPE,
	 p_tranche_ref_no     IN oltbs_contract.contract_ref_no%TYPE,
	 p_start_date         IN DATE,
	 p_end_date           IN DATE,
	 p_balance_type       IN VARCHAR2,
	 p_entry_seq_no       IN lbtws_consol_transfer.entry_seq_no%TYPE,
	 p_err_code           OUT VARCHAR2,
	 p_err_param          OUT VARCHAR2
	)
RETURN BOOLEAN;
FUNCTION fn_convert_amt
	(p_tranche_ref_no   IN oltbs_contract.contract_ref_no%TYPE,
	 p_dd_ref_no        IN oltbs_contract.contract_ref_no%TYPE,
	 p_tranche_ccy      IN oltbs_contract.contract_ccy%TYPE,
	 p_dd_ccy           IN oltbs_contract.contract_ccy%TYPE,
	 p_sch_date         IN DATE,
	 p_event_seq_no     IN oltbs_contract.latest_event_seq_no%TYPE,--FLEXCUBE V.CL Release 7.2 ITR1 SFR#157
	 p_amt              IN OUT NUMBER,
	 p_err_code         OUT VARCHAR2,
	 p_err_param        OUT VARCHAR2
	)
RETURN BOOLEAN;
--FLEXCUBE V.CL RELEASE 7.2 unauth pram changes end

--18-Jun-2007 CITILS,BV INT-LIQD-VAMI beyond PRAM Date.STARTS
--*********************************
FUNCTION FN_PROPAGATE_PRAM_RATIO
(
 P_tr_ref_no		IN  oltbs_contract.CONTRACT_REF_NO%TYPE,
 P_dd_ref_no		IN  oltbs_contract.CONTRACT_REF_NO%TYPE,
 P_value_date		IN  DATE,
 P_dd_number		IN  oltbs_contract_master.DRAWDOWN_NO%TYPE,
 P_facility_ref_no	IN  oltbs_contract.CONTRACT_REF_NO%TYPE,
 P_ccy			IN  oltbs_contract_master.CURRENCY%TYPE,
 P_err_code 	 	OUT VARCHAR2,
 P_err_param	 	OUT VARCHAR2)
RETURN BOOLEAN;
--********************************
--18-Jun-2007 CITILS,BV INT-LIQD-VAMI beyond PRAM Date.ENDS
--FCC V.CL Release 7.3 Ratio Rebuild Changes start
/*--24-DEC-2008 FLEXCUBE V.CL Release 7.4 MTR1 SFR#72, 24-dec-2008, CITIUS-LS#5155
FUNCTION fn_recalc_ratio
(
				 	   p_contract_ref_no       	IN oltbs_contract.CONTRACT_REF_NO%TYPE,
                                 p_value_date            	IN DATE,
                                 p_err_code              	OUT VARCHAR2,
                                 p_err_param             	OUT VARCHAR2,
					   p_fire_event             	IN VARCHAR2 DEFAULT 'Y' -- FLEXCUBE V.CL Release 7.4,04-Feb-2008,ratio changes)
					   )	
RETURN BOOLEAN;
--FCC V.CL Release 7.3 Ratio Rebuild Changes end
*/--24-DEC-2008 FLEXCUBE V.CL Release 7.4 MTR1 SFR#72, 24-dec-2008, CITIUS-LS#5155
--02-NOV-2007 FCC V.CL 7.3 FDPRAM CHANGES STARTS
FUNCTION fn_part_pami
		(
		p_contract_ref_no	IN	lbtbs_contract_participant.contract_ref_no%type,
		p_mod			IN	oltms_product.module%type,
		p_proc_date		IN	DATE,
		p_err_code		IN OUT 	VARCHAR2,
		p_err_param		IN OUT 	VARCHAR2
		)
RETURN BOOLEAN;


FUNCTION fn_pami
		(
		p_branch	IN	oltms_branch.branch_code%TYPE,
		p_mod		IN	oltms_product.MODULE%TYPE,
		p_proc_date	IN	DATE,
		p_product	IN	oltms_product.product_code%TYPE,
		p_err_code	IN OUT	VARCHAR2,
		p_err_param	IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION fn_pop_worktable
		(
   		p_contract_ref_no 	IN 	oltbs_contract.contract_ref_no%type,
	 	p_value_date	   	IN 	DATE,
	 	p_entry_seq	   	IN 	lbtbs_transfer_master.entry_seq_no%type,
   		p_event_seq     	IN 	lbtbs_transfer_master.event_seq_no%type,
   		p_transfer_status 	IN 	lbtbs_transfer_master.transfer_status%type,
	 	p_err_code	   	OUT 	VARCHAR2,
	 	p_err_parm	   	OUT 	VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION fn_part_delete_pamc
		(
 		p_contract_ref_no  	IN 	oltbs_contract.contract_ref_no%TYPE,
 		p_value_date	    	IN 	lbtbs_transfer_master.value_date%TYPE,
 		p_err_code 	   	IN OUT 	VARCHAR2,
 		p_err_param	    	IN OUT 	VARCHAR2
		)
RETURN BOOLEAN;


Function fn_update_contract_participant
		(
		p_contract_ref_no	IN 	lbtbs_contract_participant.contract_ref_no%type,
	 	p_value_date	   	IN 	lbtbs_contract_participant.value_date%type,
	 	p_err_code    		IN OUT 	VARCHAR2,
	 	p_err_parm    		IN OUT 	VARCHAR2
	 	)
RETURN BOOLEAN;

PROCEDURE pr_set_pamb_esn(p_pamb_esn IN lbtbs_transfer_master.event_seq_no%type);
-- moved the function from sql to spc
FUNCTION FN_PROPAGATE_RATIO_DR(  	 P_TR_REF_NO        IN  oltbs_contract.CONTRACT_REF_NO%TYPE,
                                   P_DR_REF_NO        IN  oltbs_contract.CONTRACT_REF_NO%TYPE,
                                   P_VALUE_DATE       IN  DATE,
                                   P_ESN              IN  oltbs_contract.LATEST_EVENT_SEQ_NO%TYPE,
                                   P_PREPONED_PARTICIPANTS IN VARCHAR2,
                                   P_ERR_CODE         OUT VARCHAR2,
                                   P_ERR_PARAM        OUT VARCHAR2
                                )
RETURN BOOLEAN;
--02-NOV-2007 FCC V.CL 7.3 FDPRAM CHANGES ENDS
--02-NOV-2007 FCC V.CL Release 7.3 Tranche Upsize Changes Starts
FUNCTION fn_npvami_pram_dr(
			p_contract_ref_no   	IN 	oltbs_contract.contract_ref_no%TYPE,
			p_vami_esn     		IN 	oltbs_contract_event_log.event_seq_no%TYPE,
			p_product_type		IN 	oltbs_contract.product_type%type,
			p_module_code        	IN	oltbs_contract.module_code%type,
			p_value_date         	IN 	DATE,
			p_err_code		IN OUT  VARCHAR2,
			p_err_param		IN OUT  VARCHAR2
			)
RETURN BOOLEAN;
--02-NOV-2007 FCC V.CL Release 7.3 Tranche Upsize Changes Ends

-- 07-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR1 SFR#299 Starts
FUNCTION fn_rollover_os
		(p_contract_ref_no  varchar2,
		p_tranche_ref_no varchar2,
		p_tr_currency   varchar2,
		p_dd_currency  varchar2,
       		p_rollover_amount varchar2,
		P_roll_amount_type VARCHAR2,
		p_processing_date  DATE  default GLOBAL.Application_Date
		)
RETURN NUMBER;
-- 07-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR1 SFR#299 ends
--FCC V.CL Release 7.4 BAU Thirdparty Fax changes start
FUNCTION fn_regen_msg
(p_pram_source_refno   IN  oltbs_contract.contract_ref_no%TYPE,
 p_err_code           OUT VARCHAR2,
 p_err_param          OUT VARCHAR2
)
RETURN BOOLEAN;
--FCC V.CL Release 7.4 BAU Thirdparty Fax changes end
--01-AUG-2012 Flexcube V.CL Release 7.11, Retro, CITIUS#14261 Changes Starts
FUNCTION fn_regen_msg_freeformat
(p_pram_source_refno   IN  oltbs_contract.contract_ref_no%TYPE,
 p_err_code           OUT VARCHAR2,
 p_err_param          OUT VARCHAR2
)
RETURN BOOLEAN;
PROCEDURE PR_MSREGEN_JOB;
--01-AUG-2012 Flexcube V.CL Release 7.11, Retro, CITIUS#14261 Changes Ends
-- FLEXCUBE V.CL Release 7.4,25-jan-2008,Job processing for PRCH Starts by magi
--magi7.4 new function for tempratio history table population start
/*
--FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-<1053> Changes for PRCH Job start
FUNCTION fn_populate_tempratio_history(
 					p_contract_ref_no   IN     oltbs_contract.contract_ref_no%type,
				        p_source_refno	    IN     oltbs_contract.contract_ref_no%type,
					p_source_esn	    IN     NUMBER,
					p_err_code	    IN OUT VARCHAR2,
					p_err_param	    IN OUT VARCHAR2
				       )
RETURN BOOLEAN;
--magi7.4 new function for tempratio history table population end
*/
--FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-<1053> Changes for PRCH Job	end 
--magi7.4 job processing of the ratio recalculation start
FUNCTION fn_populate_ratio_job_queue(
				p_no_of_jobs 	   IN	oltbs_branch_param.param_val%TYPE,
				P_tranche_ref_no   IN	oltbs_contract.contract_ref_no%type,
				p_source_ref_no	   IN	oltbs_contract.contract_ref_no%type,
				p_source_esn	   IN	NUMBER,
				p_event_code	   IN	VARCHAR2,
				p_value_date	   IN	DATE
				)
RETURN BOOLEAN;
PROCEDURE pr_process_job(
			p_branch 	IN oltbs_contract.branch%type,
			p_seq_no	IN lbtbs_job_queue.seq_no%type
			) ; 
FUNCTION fn_insert_error_log
		(modulecode   IN VARCHAR2
	        ,eventcode    IN VARCHAR2
                ,p_brrefno    IN VARCHAR2
                ,statuscode   IN VARCHAR2
                ,errormessage IN VARCHAR2
                ) 
RETURN BOOLEAN;

FUNCTION Fn_process_failed_contracts(p_tranche_ref_no   IN oltbs_contract_master.contract_ref_no%type,
                              p_flag   IN VARCHAR2,
                               p_value_date IN DATE,
                               p_source_ref_no IN lbtbs_ratio_chg_job.source_ref_no%type,
                               p_source_esn IN lbtbs_ratio_chg_job.source_esn%type,
                              p_error_code OUT VARCHAR2,
		                          p_error_param OUT VARCHAR2)
RETURN BOOLEAN;    
-- FLEXCUBE V.CL Release 7.4,25-jan-2008,Job processing for PRCH ends by magi
--06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS Till#1336 Start By Swapnasish
--CITIUS-LS Till#1336 starts
FUNCTION fn_calc_transfer_amnt 
(
	p_contract_ref_no		IN	VARCHAR2,
	p_value_date			IN 	DATE,
	p_event_seq_no			IN NUMBER
)
RETURN BOOLEAN;

--CITIUS-LS Till#1336 ends
--06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS Till#1336 End By Swapnasish
-- FLEXCUBE V.CL Release 7.4,08-FEB-2008, ratio change, Added new function for rebuilding of amount start
FUNCTION fn_build_amount_pram
	(p_tranche_ref_no     IN oltbs_contract.contract_ref_no%TYPE,
       p_participant	    IN lbtbs_contract_participant.participant%type,
	 p_start_date         IN DATE,
	 p_value_date         IN DATE,
	 p_tranche_ccy        IN oltbs_contract_master.currency%type,
	 p_asset_ratio        IN NUMBER,
	 p_revolving          IN VARCHAR2,
	 p_out_amt	     	    OUT NUMBER,
	 p_err_code           OUT VARCHAR2,
	 p_err_param          OUT VARCHAR2
	)
RETURN BOOLEAN;
-- FLEXCUBE V.CL Release 7.4,08-FEB-2008, ratio change, Added new function for rebuilding of amount end	
-- 21-Aug-2008 FCC V.CL Release 7.4 STP NonprorataVAMI Changes Starts
FUNCTION fn_fire_pram_at_drawdown(
				p_contract_ref_no   	IN	oltbs_contract.contract_ref_no%TYPE,
	      			p_drawdown_ref_no     	IN  	oltbs_contract.contract_ref_no%TYPE,
	      			p_version_no          	IN 	oltbs_contract.latest_version_no%type,
				p_vami_esn     		IN 	oltbs_contract_event_log.event_seq_no%TYPE,
				p_module_code        	IN	oltbs_contract.module_code%type,
				p_value_date         	IN 	DATE,
	      			p_drawdown_value_date 	IN 	DATE,
	      			p_drawdown_no         	IN 	oltbs_contract_master.drawdown_no%type,
				p_err_code		IN OUT  VARCHAR2,
				p_err_param		IN OUT  VARCHAR2
					)
RETURN BOOLEAN;
-- 21-Aug-2008 FCC V.CL Release 7.4 STP NonprorataVAMI Changes Ends
-- 10-Sep-2008 FCC V.CL Release 7.4 STP NonprorataVAMI Changes starts
FUNCTION FN_TRANSFER_AMOUNT_CALC(
	  			P_BORROWER_CONTRACT_REF_NO 	IN 	VARCHAR2,
				P_TRANCHE_REF_NO		IN 	VARCHAR2,
                                P_VALUE_DATE			IN 	DATE,
                                P_ESN				IN 	oltbs_contract_master.EVENT_SEQ_NO%TYPE,
                  		P_COUNTERPARTY			IN 	VARCHAR2,
				P_transfer_amt			OUT 	NUMBER,
				p_TR_CCY			IN	VARCHAR2,
				p_DD_CCY			IN	VARCHAR2,
				P_NEW_PART			OUT	VARCHAR2,
                                P_ERR_CODE			IN OUT 	VARCHAR2,
                                P_ERR_PARAM			IN OUT 	VARCHAR2,
                                p_check_participant 		IN 	VARCHAR2	-- 13-Aug-2008 FCC V.CL Release 7.4 STP Trancheupsize changes
                                )
  RETURN BOOLEAN ;
 -- 10-Sep-2008 FCC V.CL Release 7.4 STP NonprorataVAMI Changes ends 

--12-Dec-2008	FCC V.CL Release 7.4 Pram Job changes magi
FUNCTION fn_amount_due_backup(
			pContractRefNo		IN	oltbs_contract.contract_ref_no%TYPE,
			p_error_code		IN OUT	Varchar2,
			p_error_parameter	IN OUT	Varchar2)
RETURN BOOLEAN;
--12-Dec-2008	FCC V.CL Release 7.4 Pram Job changes magi  
	
-- 11-NOV-2008 FCC V.CL Release 7.4 Pram Job changes magi start  
FUNCTION FN_POPULATE_PRAM_JOB(
	P_CONTRACT_REF_NO	IN	oltbs_contract.CONTRACT_REF_NO%TYPE,
	P_VALUE_DATE		IN	lbtbs_transfer_master.VALUE_DATE%TYPE,
	P_ENTRY_SEQ_NO		IN	lbtws_transfer_master.ENTRY_SEQ_NO%TYPE,
	P_ERR_CODE		IN OUT	VARCHAR2,
	P_ERR_PARAM		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
FUNCTION FN_JOB(
		P_BRANCH		IN	oltbs_contract.BRANCH%TYPE,
		P_CONTRACT_REF_NO	IN	oltbs_contract.CONTRACT_REF_NO%TYPE,
		P_ENTRY_SEQ_NO		IN 	lbtws_transfer_master.ENTRY_SEQ_NO%TYPE,
		P_VALUE_DATE		IN	lbtbs_transfer_master.VALUE_DATE%TYPE
		)
RETURN BOOLEAN;

PROCEDURE PR_PRAM_JOB(
		P_BRANCH		IN	oltbs_contract.BRANCH%TYPE,
		P_CONTRACT_REF_NO	IN	oltbs_contract.CONTRACT_REF_NO%TYPE,
		P_ENTRY_SEQ_NO		IN 	lbtws_transfer_master.ENTRY_SEQ_NO%TYPE,
		P_VALUE_DATE		IN	lbtbs_transfer_master.VALUE_DATE%TYPE
		);
		
FUNCTION FN_PROCESS_PRAM(
			P_CONTRACT_REF_NO 	IN	oltbs_contract.CONTRACT_REF_NO%TYPE,
			P_VALUE_DATE		IN	DATE,
			P_ENTRY_SEQ_NO		IN 	NUMBER,
			P_ERR_CODE		IN OUT	VARCHAR2,
			P_ERR_PARAM		IN OUT	VARCHAR2
			)
RETURN BOOLEAN;
--11-NOV-2008 FCC V.CL Release 7.4 Pram Job changes magi end

--CITIUS-LS#SRT1451  Starts
--CITIUS-LS#867 Starts
FUNCTION Fn_copy_ratio_vamb
				(
				p_contract_ref_no	IN oltbs_contract.contract_ref_no%type,
				p_from_date			IN Date,
				p_to_date			IN Date,
				P_err_code		IN OUT Varchar2,
				P_err_param		IN OUT Varchar2
				)
RETURN BOOLEAN;
--CITIUS-LS#867 Ends 
--CITIUS-LS#SRT1451 Ends

--24-DEC-2008 FLEXCUBE V.CL Release 7.4 MTR1 SFR#72, 24-dec-2008, CITIUS-LS#5142 start
PROCEDURE pr_pram_job_bg(p_branch       IN oltbs_contract.branch%TYPE,
					     p_process_seq  IN number
					    );
--24-DEC-2008 FLEXCUBE V.CL Release 7.4 MTR1 SFR#72, 24-dec-2008, CITIUS-LS#5142 end

g_calling_event varchar2(4):= null;--CITIUS-LS#1184 CHANGES--06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS Till#1336 
g_dcf_buypart_conv	VARCHAR2(2):= null;--CITIUS-LS#12212
g_first_time_buy	VARCHAR(1):= 'N';--CITIUS-LS#12284

--CITIUS-LS#SRT5764-CITIUS-LS#5704 Starts
FUNCTION fn_copy_settle(
							p_contract_ref_no	varchar2,
							p_contract_type		varchar2,
							p_drawdown_no		number,
							p_entry_seq_no		number,
							p_value_date		date
					   )
RETURN BOOLEAN;
--CITIUS-LS#SRT5764-CITIUS-LS#5704 Ends
--09-JUN-2010 Flexcube V.CL 7.7 FS Tag 05 Third Party Assignment Changes starts
FUNCTION fn_validate_pram
			(
				p_contract_ref_no	IN  		oltbs_contract.contract_ref_no%TYPE
				, p_event_seq_no	IN  		oltbs_contract.latest_event_seq_no%TYPE
				, p_value_date		IN		oltbs_contract_master.value_date%TYPE
				, p_error_code		IN OUT 	VARCHAR2
				, p_error_param	IN OUT	VARCHAR2
			)
RETURN BOOLEAN;
FUNCTION fn_assignment_validation
			(
				p_contract_ref_no	IN 		oltbs_contract.contract_ref_no%TYPE
				,p_event_seq_no	IN		oltbs_contract_master.event_seq_no%TYPE
				,p_value_date		IN		oltbs_contract_master.value_date%TYPE
				,p_transfer_from	IN		lbtbs_participant_transfer.transfer_from%TYPE
				,p_transfer_to		IN		lbtbs_participant_transfer.transfer_to%TYPE
				,p_transfer_amt	IN		lbtbs_participant_transfer.transfer_amt%TYPE
				,p_transferor_bal	IN		lbtbs_participant_transfer.transferor_new_amt%TYPE	
				,p_error_code		IN OUT	VARCHAR2
				,p_error_param		IN OUT	VARCHAR2
			)
RETURN BOOLEAN;
--09-JUN-2010 Flexcube V.CL 7.7 FS Tag 05 Third Party Assignment Changes ends

--03-JAN-2011 Flexcube V.CL Release 7.8, SFR#14, CITIUS Retro Till#7427 changes start
FUNCTION fn_book_zero_investor
(	p_tranche_ref_no IN VARCHAR2,
	p_value_date     IN DATE,
	p_err_code       OUT VARCHAR2,
	p_err_param      OUT VARCHAR2
)
RETURN BOOLEAN;
--03-JAN-2011 Flexcube V.CL Release 7.8, SFR#14, CITIUS Retro Till#7427 changes end

-- 24-FEB-2011 Flexcube V.CL Release 7.9, FS Volume02 Tag05, Third Party Fax For New Investor Changes Start<
FUNCTION  fn_fax_new_participant (
		P_Borrower_Ref_No    IN  oltbs_contract.contract_ref_no%TYPE,
		p_contract_ref_no    IN	 lbtbs_contract_participant.contract_ref_no%TYPE,	
		P_Value_Date         IN  lbtbs_contract_participant.value_date%TYPE,
		P_Err_Code           IN OUT  VARCHAR2,
		P_Err_Param          IN OUT  VARCHAR2)

RETURN BOOLEAN;
-- 24-FEB-2011 Flexcube V.CL Release 7.9, FS Volume02 Tag05, Third Party Fax For New Investor Changes End>

--06-JAN-2012 Flexcube V.CL Release 7.10 Vol1 FS Tag 09,Changes starts
FUNCTION fn_pop_sf_payment_browser
		(	
		p_contract_ref_no	IN     oltbs_contract.contract_ref_no%TYPE
		, p_value_date		IN     DATE
		, p_err_code  		IN OUT VARCHAR2
		, p_err_param 		IN OUT VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION fn_get_part_status
		(
		p_contract_ref_no	IN 	oltbs_contract.contract_ref_no%TYPE
		, p_value_date		IN	lbtbs_contract_participant.value_date%TYPE	
		, p_participant		IN	lbtbs_contract_participant.participant%TYPE
		, p_err_code		IN OUT	VARCHAR2
		, p_err_param		IN OUT	VARCHAR2	
		)
RETURN BOOLEAN;

FUNCTION fn_check_funding_status_pr
		(
		p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE
		, p_investor		IN 	VARCHAR2
		)
RETURN BOOLEAN ;
--06-JAN-2012 Flexcube V.CL Release 7.10 Vol1 FS Tag 09,Changes ends
--31-JUL-2012 Flexcube V.CL Release 7.11, Retro CITIBLR#35076 changes start
FUNCTION fn_process_pram_dd
	(
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	p_latest_esn		IN	oltbs_contract.latest_event_seq_no%TYPE,
	p_module_code	IN	oltbs_contract.module_code%TYPE,
	p_value_date		IN	DATE,
	p_err_code		OUT	VARCHAR2,
	p_err_param		OUT	VARCHAR2
	)
RETURN BOOLEAN;
--31-JUL-2012 Flexcube V.CL Release 7.11, Retro CITIBLR#35076 changes end
--21-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol1 Tag03 changes Start
FUNCTION fn_check_hfs_transfer
								(
									p_contract_ref_no	IN 		oltbs_contract.contract_ref_no%TYPE
									,p_event_seq_no		IN		oltbs_contract.latest_event_seq_no%TYPE
									,p_value_date		IN 		DATE
								)
RETURN VARCHAR2;

FUNCTION fn_validate_hfs_transfer
									(
									p_contract_ref_no	IN		oltbs_contract.contract_ref_no%TYPE
									,p_value_date		IN		DATE
									,p_transfer_from	IN		lbtbs_participant_transfer.transfer_from%TYPE
									,p_transfer_amt		IN		lbtbs_participant_transfer.transfer_amt%TYPE
									,p_error_code		IN OUT	VARCHAR2
									,p_error_param		IN OUT	VARCHAR2
									)
RETURN 	BOOLEAN;

FUNCTION fn_hfs_transfer_pop_coc_bal
									(
										p_contract_ref_no	IN		oltbs_contract.contract_ref_no%TYPE
										,p_value_date		IN		DATE
										,p_event_seq_no		IN		oltbs_contract.latest_event_seq_no%TYPE
										,p_participant		IN		oltbs_contract.counterparty%TYPE
										,p_transfer_amount	IN		NUMBER
										,p_error_code		IN	OUT VARCHAR2
										,p_error_param		IN	OUT	VARCHAR2
									)
RETURN BOOLEAN;

FUNCTION fn_compute_cost_basis
							(
								p_contract_ref_no		IN	oltbs_contract.contract_ref_no%TYPE
								,p_event_seq_no			IN	oltbs_contract.latest_event_seq_no%TYPE
								,p_transfer_price		IN	tltbs_upload_master.trade_price%TYPE
								,p_cost_basis			OUT	tltbs_upload_master.trade_price%TYPE
								,p_error_code			IN OUT 	VARCHAR2
								,p_error_param			IN OUT 	VARCHAR2
							)
RETURN BOOLEAN;
--21-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol1 Tag03 changes End

-- OBCL14.4:SFR#29959798:Primary_Delayed_Compensation(calc participant details) - Starts
FUNCTION fn_insert_participant_dtls
                            (   p_contract_ref_no		IN	oltbs_contract.contract_ref_no%TYPE ,
								p_event_seq_no			IN	oltbs_contract.latest_event_seq_no%TYPE ,
                                p_value_date            IN  lbtbs_consol_transfer.value_date%TYPE ,
                                p_error_code			IN OUT 	VARCHAR2 ,
								p_error_param			IN OUT 	VARCHAR2
                             )  RETURN BOOLEAN;                          
-- OBCL14.4:SFR#29959798:Primary_Delayed_Compensation(calc participant details) - Ends


--OBCL14.4:SFR#29959798:LOR_Adjustments - Start
FUNCTION fn_LOR_Adj_interest_calc ( p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
                                    p_event_seq_no	  IN	oltbs_contract.latest_event_seq_no%TYPE ,
                                    p_value_date      IN  DATE ,
                                    p_err_code 		  IN OUT   VARCHAR2,
									p_err_param   	  IN OUT 	VARCHAR2)  RETURN BOOLEAN;       

FUNCTION fn_LOR_Adj_acc_entry 
                            ( p_contract_ref_no oltbs_contract.contract_ref_no%type ,
                              p_value_date date ,
                              p_esn oltbs_contract_event_log.event_seq_no%type,
                              p_error_code    IN OUT  VARCHAR2  ,
                              p_error_param   IN OUT  VARCHAR2 ) RETURN BOOLEAN;  
							  
FUNCTION Fn_LOR_Adj_wrapper_acc_entry (  p_contract_ref_no oltbs_contract.contract_ref_no%type ,
                                         p_esn oltbs_contract_event_log.event_seq_no%type ) RETURN BOOLEAN;
							  
--OBCL14.4:SFR#29959798:LOR_Adjustments - end

--OBCL_14.5_STAND_BY_FEE Start
FUNCTION fn_capture_facility_pram(
			p_tranche_ref_no IN VARCHAR2,
			p_facility_ref_no IN VARCHAR2,
			p_value_date IN DATE,
			p_cnt_new_participants IN NUMBER,
			p_err_code OUT VARCHAR2,
			p_err_param OUT VARCHAR2)
RETURN BOOLEAN ;
--OBCL_14.5_STAND_BY_FEE End
END lbpks_pram;
/
CREATE or replace SYNONYM lbpkss_pram FOR lbpks_pram
/