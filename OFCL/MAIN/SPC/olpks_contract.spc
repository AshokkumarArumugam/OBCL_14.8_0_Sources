create or replace package olpks_contract is
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_contract.SPC
**
** Module		: LOANS and DEPOSITS
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

24-FEB-2003 FCC3.9 LATAM SFR 365		Overloaded fn_save_contract_amendment.
24-JAN-2004 FCC 4.4 CHANGES Added new function fn_create_new_version
23-JUL-2008 FCC V.CL Release 7.4 FSLOT5-02, Journal Entry at Contract Level
24-JUL-2008 FCC V.CL Release 7.4 FSLOT5-02  posting accounting entry event 'CADJ' - Banu
06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#1411,STP Consolidation,By Swapnasish,Adjustment Entery Posting Enhancement, Fixing.
06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#1415,STP Consolidation, By Swapnasish,Interface changes related to Adjustment entries.
09-MAR-2009 FLEXCUBE V.CL Release 7.5 LOT1 FS TAG 11 SUB-XXLIMITS CHANGES MAGI
25-MAY-2011 Flexcube V.CL Release 7.9, Adjustments Changes , Added action as parameter in fn_contract_adjustment
18-JUL-2011 Flexcube V.CL Release 7.9, FS Vol2 Tag 10 ITR1 SFR#115 Changes, Added a paremeter to fn_authorise_adj so that actual 
									maker id and checker id is used during auto reversal
30-NOV-2011 Flexcube V.CL Release 7.10 FS Tag13,LC Sublimit Reclassification change:to pass the HFS sublimit amount									
18-MAY-2012 Flexcube V.CL Release 7.11 FS Tag 18 changes,Notice Templates and free format messaging.
28-NOV-2012 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#14784 Changes , sending reversals in the adjustment feed.

    **Changed By         : Krithika G
    **Change Description : Fix for CAMD Deletion Issue
    **Search String      : OBCL_12.5_26940745
	
	**Changed By         : Meha
    **Change Description : Back Dated Status Changes
    **Search String      : OBCL_14.4_BCKDTD_STC

  **Changed By         : Reghuraj
  **Date               : 10-Jun-2021
  **Change Description : Rollover rate fix sub screnn fixes 
  **Search String      : #32476706
  
   **Changed By         : Vineeth T M
   **Date               : 30-Jul-2024
   **Change Description : OBCL_14.8_VER_ROL Changes
   **Search String      : OBCL_14.8_VER_ROL Changes  
-----------------------------------------------------------------------------------------------------
*/

pkg_adj_serial	NUMBER; --25-MAY-2011 Flexcube V.CL Release 7.9, Adjustments Changes moved here from below
pkg_cadj_esn	NUMBER; --25-MAY-2011 Flexcube V.CL Release 7.9, Adjustments Changes
g_Bckdtdstc  Varchar2(1) :='N';--OBCL_14.4_BCKDTD_STC Changes

Function fn_copy_contract(p_new_reference_no IN Varchar2, 
		p_old_reference_no IN Varchar2, 
		p_error_code IN OUT Varchar2) return boolean;

Function fn_create_new_version(p_reference_no		IN varchar2,
							   p_update_cstb		IN varchar2 DEFAULT 'Y',
							   p_replicate_sch_defn	IN varchar2 DEFAULT 'Y',
							   p_new_event_seq_no	IN number ,
							   p_Wrk_Oldtronl     IN Olpks_Oldtronl_Main.Ty_Oldtronl DEFAULT  NULL  ) --#32476706 p_Wrk_Oldtronl added
return number;

Function fn_save_contract_amendment
		(
		p_reference_no IN oltbs_contract.contract_ref_no%type,
		p_current_event_seq_no IN oltbs_contract.latest_event_seq_no%type,
		p_current_version_no IN oltbs_contract_master.version_no%type,
		p_error_code IN OUT Varchar2,
		p_error_param	IN	OUT Varchar2
		) return boolean;

--24-FEB-2003 FCC3.9 LATAM SFR 365
--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
--Overloaded the Function to call from Manual Status (LDDMSC) for Contract Level Processing
--and Schedule Level Processing.
--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Function fn_save_contract_amendment
		(
		p_reference_no 		IN 		oltbs_contract.contract_ref_no%type,
		p_current_event_seq_no 	IN 		oltbs_contract.latest_event_seq_no%type,
		p_current_version_no 	IN 		oltbs_contract_master.version_no%type,
		p_ListOfComponents	IN 		varchar2,
		p_ListOfDueDates		IN		varchar2,
		p_ListOfNewStatuses	IN		varchar2,
		p_error_code 		IN OUT 	Varchar2,
		p_error_param		IN OUT 	Varchar2
		) 
return boolean;

--27-DEC-2004 CITI 4.4 CHANGE STARTS (New function added)
Function fn_create_new_version		  
		(  
		   p_ldtbs_contract_master_rec	IN oltbs_contract_master%ROWTYPE,
		   p_update_cstb				IN varchar2 DEFAULT 'Y',
		   p_replicate_sch_defn			IN varchar2 DEFAULT 'Y',
		   p_new_event_seq_no			IN number,
		   p_Wrk_Oldtronl     IN Olpks_Oldtronl_Main.Ty_Oldtronl DEFAULT  NULL  ) --#32476706 p_Wrk_Oldtronl added
return number ;
--27-DEC-2004 CITI 4.4 CHANGE ENDS (New function added)
--OBCL_14.8_VER_ROL Changes start
FUNCTION Fn_Create_New_Version(p_Ldtbs_Contract_Master_Rec IN Oltbs_Contract_Master%ROWTYPE,
                                 p_Update_Cstb               IN VARCHAR2 DEFAULT 'Y',
                                 p_Replicate_Sch_Defn        IN VARCHAR2 DEFAULT 'Y',
                                 p_New_Event_Seq_No          IN NUMBER,
                                 p_contract_ref_no           in oltb_contract.contract_ref_no%type,
                                 p_version_no                in oltb_contract.latest_version_no%type,
                                 p_Replicate_Cust            in varchar2,
                 p_Wrk_Oldtronl              IN Olpks_Oldtronl_Main.Ty_Oldtronl default  null) --#32476706 p_Wrk_Oldtronl added 
    RETURN NUMBER;
--OBCL_14.8_VER_ROL Changes END

-- 24-JUL-2008 FCC V.CL Release 7.4 FSLOT5-02  posting accounting entry event 'CADJ' - Starts - Banu
FUNCTION fn_contract_adjustment
	(p_contract_ref_no 	IN	oltbs_contract.contract_ref_no%type,
	 p_value_date		IN	DATE,  
	 p_esn			IN	NUMBER,
	 p_action_code		IN	VARCHAR2, --25-MAY-2011 Flexcube V.CL Release 7.9, Adjustments Changes
	 p_err_code		OUT	ertbs_msgs.err_code%TYPE,
	 p_err_msg		OUT	VARCHAR2)
  RETURN BOOLEAN ;

FUNCTION FN_DELETE_ADJ(
	 p_contract_ref_no  IN oltbs_contract.contract_ref_no%type,
	 p_esn			IN oltbs_contract.latest_event_seq_no%type,
	 p_err_code				OUT ertbs_msgs.err_code%TYPE,
	 p_err_msg				OUT VARCHAR2)
RETURN BOOLEAN;
-- 24-JUL-2008 FCC V.CL Release 7.4 FSLOT5-02  posting accounting entry event 'CADJ' - Ends - Banu

--23-JUL-2008 FCC V.CL Release 7.4 FSLOT5-02, Journal Entry at Contract Level, Starts
FUNCTION  Fn_upd_cont_adj_bal
				(	p_branch	IN oltbs_daily_log_ac.ac_branch%type,
					p_event		IN oltbs_daily_log_ac.event%type,
					p_err_code	IN OUT VARCHAR2,
					p_err_param	IN OUT VARCHAR2
				)
RETURN BOOLEAN;
--23-JUL-2008 FCC V.CL Release 7.4 FSLOT5-02, Journal Entry at Contract Level, Ends
--06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#1411 Start By Swapnasish
--CITIUS-LS#1411 Starts
FUNCTION fn_authorise_adj
						(
							p_contract_ref_no			varchar2,
							p_actual_esn				number, --18-JUL-2011 Flexcube V.CL Release 7.9, FS Vol2 Tag 10 ITR1 SFR#115 Changes
							p_esn						number,
							p_error_code		IN OUT 	varchar2,
							p_error_param		IN OUT 	varchar2
						)
RETURN BOOLEAN;
--pkg_adj_serial	number;--25-MAY-2011 Flexcube V.CL Release 7.9, Adjustments Changes
--CITIUS-LS#1411 Ends
--06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#1411 End By Swapnasish
--06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#1415 Start By Swapnasish
--CITIUS-LS#1415 Starts
FUNCTION Fn_cont_adj_bal_pop
			(
				p_branch	IN oltbs_daily_log_ac.ac_branch%type,
				p_err_code	IN OUT VARCHAR2,
				p_err_param	IN OUT VARCHAR2
			)
RETURN BOOLEAN;
--CITIUS-LS#1415  Ends
--06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#1415 End By Swapnasish
--09-MAR-2009 FLEXCUBE V.CL Release 7.5 LOT1 FS TAG 11 SUB-XXLIMITS CHANGES MAGI
FUNCTION fn_get_loan_amount
(p_contract_ref_no IN      oltbs_contract_borrowers.contract_ref_no%type,
p_loan_ref_no      IN	   oltbs_contract.contract_ref_no%type default 'ALL',
 p_borrower        IN	   oltbs_contract_borrowers.customer_no%type, 
 p_product         IN      oltbs_contract_borr_prod.loan_product%type,
 p_currency        IN      oltbs_borr_prod_limit.ccy_code%type,
 p_value_date	   IN	   oltbs_contract_master.value_date%type,
 p_loan_amount     OUT     oltbs_contract_master.amount%type,
 p_error_code      IN OUT  varchar2,
 p_error_param     IN OUT  varchar2
 )
 RETURN BOOLEAN;
 
 FUNCTION FN_SUBLIMIT_VALIDATE
 (p_contract_ref_no   IN      oltbs_contract.contract_ref_no%type,
 p_loan_ref_no        IN      oltbs_contract.contract_ref_no%type default 'ALL',
 p_product            IN      oltbs_contract_borr_prod.loan_product%type,
 p_borrower           IN      oltbs_contract.counterparty%type,
 p_currency           IN      oltbs_contract.contract_ccy%type,
 p_loan_amount        IN      oltbs_contract_master.amount%type,
 p_exch_rate          IN      oltbs_contract_linkages.exchange_rate%type,
 p_value_date	      IN      oltbs_contract_master.value_date%type,
 p_error_code         IN OUT  VARCHAR2,
 p_error_param        IN OUT  VARCHAR2
 )
RETURN BOOLEAN;

--09-MAR-2009 FLEXCUBE V.CL Release 7.5 LOT1 FS TAG 11 SUB-XXLIMITS CHANGES MAGI

--30-NOV-2011 Flexcube V.CL Release 7.10 FS Tag13,LC Sublimit Reclassification change,starts
FUNCTION Fn_sublimit_reclassification
	(
	 p_trade_ref_no		IN	oltbs_contract.contract_ref_no%TYPE
	,p_trade_event_code	IN	oltbs_contract.curr_event_code%TYPE
	,p_branch_code		IN	oltms_branch.branch_code%TYPE
	,p_process_date		IN	sttms_dates.today%TYPE
	,p_err_code		IN OUT	VARCHAR2
	,p_err_param		IN OUT	VARCHAR2	
	)
RETURN BOOLEAN;

FUNCTION fn_prcs_nw_hfs_sublmt_movmnt
	(
	  p_commit_ref_no	IN	oltbs_contract.contract_ref_no%TYPE
	, p_trade_ref_no	IN	oltbs_contract.contract_ref_no%TYPE
	, p_trade_event_code	IN	oltbs_contract.curr_event_code%TYPE
	, p_process_date	IN	sttms_dates.today%TYPE
	, p_diff_in_lc_hfs	IN	oltbs_contract_balance.hfs_sublimit_amt%TYPE
	, p_amt_tags		IN	OLTB_DAILY_LOG_AC.amount_tag%TYPE
	, p_commit_ccy		IN	oltbs_contract.contract_ccy%TYPE
	, p_err_code		IN OUT	VARCHAR2
	, p_err_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;


--OBCL_12.5_26940745
FUNCTION Fn_Delete_Multi_Linkages(p_Reference_No         IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                   p_Current_Event_Seq_No IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                                   p_Current_Version_No   IN Oltbs_Contract_Master.Version_No%TYPE,
                                   p_Err_Code             IN OUT NOCOPY VARCHAR2,
                                   p_Err_Params           IN OUT NOCOPY VARCHAR2)
    RETURN BOOLEAN;
--OBCL_12.5_26940745 Ends

FUNCTION Fn_rev_sublmt_reclass_entries					
	(
	 p_trade_ref_no		IN oltbs_contract.contract_ref_no%TYPE,
	 p_curr_event_code	IN oltbs_contract.curr_event_code%TYPE,
	 p_err_code		IN OUT	VARCHAR2, 
	 p_err_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--30-NOV-2011 Flexcube V.CL Release 7.10 FS Tag13,LC Sublimit Reclassification change,ends
--18-MAY-2012 Flexcube V.CL Release 7.11 FS Tag 18 changes start

--28-NOV-2012 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#14784 Changes start
FUNCTION fn_contadj_rev_pop
(
	p_branch	IN  VARCHAR2,
	p_err_code	OUT VARCHAR2,
	p_err_param	OUT VARCHAR2
)
RETURN BOOLEAN;
--28-NOV-2012 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#14784 Changes end

FUNCTION fn_INNC_batch
(
	p_branch				IN		oltms_branch.branch_code%Type,
	p_module			IN		smtbs_modules.module_id%Type,
	p_processing_date		IN		DATE,
	p_product			IN		oltbs_contract.product_code%TYPE,
	p_commit_frequency	IN		oltbs_automatic_process_master.bod_commit_count%TYPE,
	p_err_code		IN	OUT	VARCHAR2,
	p_err_param		IN	OUT	VARCHAR2
)
RETURN BOOLEAN;

FUNCTION fn_INNC_batch_contract
(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_processing_date		IN		DATE,
	p_err_code			IN	OUT	VARCHAR2,
	p_err_param			IN	OUT	VARCHAR2
)
RETURN BOOLEAN;
--18-MAY-2012 Flexcube V.CL Release 7.11 FS Tag 18 changes end
end olpks_contract;
/
create or replace synonym olpkss_contract for olpks_contract
/