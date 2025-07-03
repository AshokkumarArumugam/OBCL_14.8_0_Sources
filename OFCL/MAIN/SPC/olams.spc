CREATE OR REPLACE PACKAGE olams AS
/*
----------------------------------------------------------------------------------------------------
**
** File Name		: olams.SPC
**
** Module		: LD
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
	Name	:	olams
	Purpose :	Utilities related to LD Value Dated Amendments
	Author	:	Vijay Jairaj
	Date	:	Feb 11, 1997
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


07.02.2002 FCC 3.9 PLNCITI  Action code changed to 2000.

10-APR-2002 FCC 4.0 June 2002  CITIPLC PRODUCTION ISSUE 20011113 Added p_cont_stat parameter in the function fn_update_audit..Bsk

28-Jun-2004 FCC 4.6 Retro CITILATAM TILL#OPUAT#167.The VAMI firing should have the maker id and checker id as same as that 
						for VAMB in the event log..
23-AUG-2005 FCC 4.6.2 CITILD Repricing Changes by Kishore
		Functions fn_choo_mantra_gali, fn_vami, fn_pass_entries, fn_update_audit has been changed in order to handle MRGI Event.
		An additional function p_Event_Code has been added in all the above functions
1-SEP-2005	FCC 4.6.2 COPY RIGHT changes
14-May-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag09 Differentiation of Reversals and Interest Waiver Changes by Aji
		Added a new function fn_amendment_reversal to reverse the VAMB and VAMI events
		Added a new function fn_delete_amendment_reversal to delete the VAMB/VAMI reversal.

26-may-2009  FLEXCUBE V.CL Release 7.5 lot2 Tag#17 Changes- Changes done for Maturity Type change of a contract.
27-JUN-2009 FLEXCUBE V.CL Release 7.5 lot2 ITR2 SFR#<8> CITIPBGIT<SFR#128> Fix Changes
10-JUL-2009 FLEXCUBE V.CL Release 7.5 lot2 RT SFR#245 - Changes done to allow Maturity type change from Call to Fix when the new maturity date is same as application date
30-SEP-2009 FLEXCUBE V.CL Release 7.5 lot3 ITR1 SFR#216 ,Action code was not getting passed properly at the time of vami upload because of which YACR was getting unauthorised
18-MAR-2010 FLEXCUBE V.CL Release 7.6 DTCC changes, 1) When the amount due of the contract is 0 then the contract must be liquidated.
						    2)when the amount due of the contract is 0 and the new maturity date in VAMI is reduced to today(by doing the negative vami of the contract amount ) then the contract must be liquidated
30-DEC-2011 Flexcube V.CL Release 7.10,FS Volume02 Tag15 Changes, Re-Amortization Changes	
03-APR-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO EURCITIPLC#18727 Changes: changes done for the termination of loans when there is a residual difference of few cents between agency and origination.	
21-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol1 Tag03 changes, new function fn_coc_bal_reduction created to calulate coc balances reduction as part of VAMI.
13-MAY-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol1 Tag03 IUT#293 changes, new function added for COC balances reversal when VAMI is reversed.

	**Changed By         : Priyadarshini K
    **Changed On         : 04-JUL-2018
    **Change Description : Added global variables to identify redefine and distribute principal
    **Search String      : OBCL_14.2_VAMI_Sch changes
	
	**Changed By         : Meha
    **Changed On         : 18-JUL-2019
    **Change Description : Auto Capitalization Changes
    **Search String      : OBCL_14.4_Autocap
	
	**Changed By         : Arunprastah
    **Changed On         : 22-apr-2020
    **Change Description : New function added Accrual during Vami
    **Search String      : OBCL_14.4_SOFR_Changes

    **Changed By         : Arunadevi Rajendran
    **Date               : 29-MAY-2020
    **Change Description : New component addition
    **Search String      : OBCL_14.4_NewComp_Addition Changes

	**Changed By         : Vigneshram S
    **Date               : 09-Jun-2020
    **Change Description : Added the code for SOFR in case VAMI reversal
    **Search String      : BUG#31450891	

  **Changed By         : Chandra Achuta
  **Date               : 18-MAR-2022
  **Change Description : Hook request for FWDVAMI case.
  **Search String      : Bug#33613314 	
  
  **Changed By         : Sowmya Bitra
  **Date               : 15-July-2024
  **Change Description : OBCL_14.8_Payment_Capitalize Changes 
  **Search String      : Bug#36830170

  **Changed By         : Sowmya Bitra
  **Date               : 23-August-2024
  **Change Description : OBCL_14.8_Payment_Capitalize Changes 
                         Reverting VAMI approach changes and processing cap with LIQD itself
  **Search String      : Bug#36866128_1 

----------------------------------------------------------------------------------------------------------
*/
--CREATE  OR REPLACE PACKAGE olams AS
    g_dis_princ VARCHAR2(1) := 'N';   --OBCL_14.2_VAMI_sch changes
  g_redefine VARCHAR2(1) := 'N';   --OBCL_14.2_VAMI_sch changes
  
    --Bug#33613314  Changes Starts
    PROCEDURE Pr_Set_Skip_Kernel;
    PROCEDURE Pr_Set_Activate_Kernel;
    PROCEDURE Pr_Set_Skip_Cluster;
    PROCEDURE Pr_Set_Activate_Cluster;
    FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
    --Bug#33613314  Changes Ends
	
	tab_rate		olpkss_schedules.ty_rate;
	tab_amt_paid	olvdss_services.ty_amt_paid;
	h_tab			olpkss_recompute_schedules.tab_ty_comput;
	sch_type		oltbs_contract_preference.contract_schedule_type%TYPE;
	amort_meth		oltbs_contract_preference.amortisation_type%TYPE;
	amd_rec			oltbs_contract_amend_due%ROWTYPE;
	vami_esn		oltbs_contract_event_log.event_seq_no%TYPE;
	cont_sch_type	VARCHAR2(15);

	i				BINARY_INTEGER;
	debug_mode		CHAR(1) := 'Y';

	back_valued		BOOLEAN;
	date_chgd		BOOLEAN := FALSE;
	rate_chgd		BOOLEAN := FALSE;
	prin_chgd		BOOLEAN := FALSE;
	amort_dt_chgd 		BOOLEAN := FALSE; --30-DEC-2011 Flexcube V.CL Release 7.10,FS Volume02 Tag15 Changes

	--action_code		VARCHAR2(20);
	action_code		VARCHAR2(2000);--PLNCITI changed to 2000 fcc3.9
	ret_err_code	VARCHAR2(500);
	ret_err_param	VARCHAR2(500);
	list_err_code	VARCHAR2(5000);
	list_err_param	VARCHAR2(5000);
	
	g_call_to_fix_vami VARCHAR2(1):='N'; --10-JUL-2009 FLEXCUBE V.CL Release 7.5 lot2 RT SFR#245
	g_action_code_for_upl	VARCHAR2(1); --30-SEP-2009 FLEXCUBE V.CL Release 7.5 lot3 ITR1 SFR#216 ,Action code was not getting passed properly at the time of vami upload because of which YACR was getting unauthorised
	g_hfs_transfer    varchar2(1) := 'N';  --21-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol1 Tag03 changes
	process_next_contract		EXCEPTION; --OBCL_14.4_NewComp_Addition Changes
    g_addtnl_comp			VARCHAR2(1):= 'N';--OBCL_14.4_NewComp_Addition Changes
	g_vami_reverse varchar2(1) :='N'; --Bug#31450891 changes
	FUNCTION fn_choo_mantra_gali (	ref_no 		IN 	oltbs_contract.contract_ref_no%TYPE,
					vamb_esn	IN	oltbs_contract_event_log.event_seq_no%TYPE,
					vami_ver 	IN  	oltbs_contract_master.version_no%TYPE,
					latest_esn	IN OUT  oltbs_contract_event_log.event_seq_no%TYPE,
					proc_date	IN	DATE,
					p_mode		IN	CHAR,
					err_code 	IN OUT  VARCHAR2,
					p_Event_Code 	IN 	oltbs_contract_event_log.Event_Code%TYPE DEFAULT 'VAMI') -- FCC 4.6.2 CITI LD REPRICE Changes by Kishore
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
			  p_Event_Code IN oltbs_contract_event_log.Event_Code%TYPE DEFAULT 'VAMI') -- FCC 4.6.2 CITI LD REPRICE Changes by Kishore
	RETURN BOOLEAN;

	FUNCTION fn_pass_entries (ref_no IN oltbs_contract.contract_ref_no%TYPE,
				vami_ver IN oltbs_contract_master.version_no%TYPE,
				vami_esn IN oltbs_contract_master.event_seq_no%TYPE,
				p_mode	 IN CHAR,
				p_Event_Code IN oltbs_contract_event_log.Event_Code%TYPE DEFAULT 'VAMI') -- FCC 4.6.2 CITI LD REPRICE Changes by Kishore
	RETURN BOOLEAN;

	FUNCTION fn_update_audit (ref_no 	IN 	oltbs_contract.contract_ref_no%TYPE,
				vami_esn 	IN 	oltbs_contract_master.event_seq_no%TYPE,
				vamb_esn 	IN 	oltbs_contract_master.event_seq_no%TYPE,	--Fcc4.2 OPS related changes OPUAT#167	
			        p_mode	 	IN	CHAR,
				p_cont_stat	IN OUT	CHAR, -- FCC 4.0 June 2002  CITIPLC PRODUCTION ISSUE 20011113..Bsk 
				p_Event_Code IN oltbs_contract_event_log.Event_Code%TYPE DEFAULT 'VAMI' -- FCC 4.6.2 CITI LD REPRICE Changes by Kishore
				,p_proc_date IN DATE DEFAULT NULL
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
	
	-- 14-May-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag09 Differentiation of Reversals and Interest Waiver Changes by Aji starts
	FUNCTION fn_amendment_reversal
				(
				p_contract_ref_no IN OUT oltbs_contract.contract_ref_no%TYPE,
				p_event_seq_no    IN oltbs_contract_event_log.event_seq_no%TYPE,
				p_backup_required IN VARCHAR2,
				p_error_code      IN OUT VARCHAR2,
				p_error_params    IN OUT VARCHAR2
				)
	RETURN BOOLEAN;

	FUNCTION fn_delete_amendment_reversal(
				p_contract_ref_no  IN oltbs_contract.contract_ref_no%TYPE,
				p_event_seq_no     IN oltbs_contract_event_log.event_seq_no%TYPE,
				p_restore_required IN VARCHAR2,
				p_error_code       IN OUT VARCHAR2,
				p_error_params     IN OUT VARCHAR2
				)
	RETURN BOOLEAN;
	-- 14-May-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag09 Differentiation of Reversals and Interest Waiver Changes by Aji ends
	
	

	PROCEDURE	pr_dbg (msg IN VARCHAR2);
	--26-may-2009  FLEXCUBE V.CL Release 7.5 lot2 Tag#17 Changes Start
	FUNCTION fn_process_vami_mattype_change
	(	p_contract_ref_no       IN oltbs_contract.contract_ref_no%TYPE
	,	p_value_date		IN oltbs_contract_amend_due.value_date%TYPE
	,	p_new_maturity_date	IN oltbs_contract_amend_due.new_maturity_date%TYPE
	,	p_new_maturity_type	IN oltbs_contract_amend_due.new_maturity_type%TYPE
	,	vamb_esn     		IN oltbs_contract_event_log.event_seq_no%TYPE
	,	vami_ver     		IN oltbs_contract_master.version_no%TYPE
	,	P_ERROR_CODE		IN OUT VARCHAR2
	,	p_error_param		IN OUT VARCHAR2
	)
	RETURN BOOLEAN;
	--26-may-2009  FLEXCUBE V.CL Release 7.5 lot2 Tag#17 Changes End
	
--18-MAR-2010 FLEXCUBE V.CL Release 7.6 DTCC changes starts
FUNCTION fn_comt_cont_stat_updation
				(
				p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
				p_event_seq_no		IN	oltbs_contract.latest_event_seq_no%TYPE,
				p_err_code		IN OUT	VARCHAR2,
				p_err_params		IN OUT	VARCHAR2
				)
RETURN BOOLEAN;
--18-MAR-2010 FLEXCUBE V.CL Release 7.6 DTCC changes ends
--03-APR-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO EURCITIPLC#18727 Changes Start
FUNCTION fn_get_agency_contract
	(
	p_contract_ref_no	IN	OLTB_CONTRACT_MASTER.contract_ref_no%type
	)
RETURN VARCHAR2;
--03-APR-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO EURCITIPLC#18727 Changes Changes End

--21-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol1 Tag03 changes Start
FUNCTION fn_coc_bal_reduction(
				 p_contract_ref_no	IN oltbs_contract.contract_ref_no%type ,
				 p_princ_change         IN oltbs_contract_amend_due.differential_amount%type,
				 p_value_date           IN oltbs_contract_reserve.value_date%type,
				 pErrorCode	        IN OUT VARCHAR2,
				 pparam                 IN OUT VARCHAR2
			     )
RETURN BOOLEAN;
--21-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol1 Tag03 changes End
--13-MAY-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol1 Tag03 IUT#293 changes starts
FUNCTION fn_coc_bal_reversal(
							  p_contract_ref_no       IN oltbs_contract.contract_ref_no%type ,
							  p_vami_esn              NUMBER,
							  p_vamr_esn			  NUMBER,
							  p_value_date            IN oltbs_contract_reserve.value_date%type,
							  pErrorCode	          IN OUT VARCHAR2,
							  pparam                  IN OUT VARCHAR2
							)
RETURN BOOLEAN;
--13-MAY-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol1 Tag03 IUT#293 changes ends
--OBCL_14.4_Autocap Changes Starts
Function Fn_Auto_Cap_Process (	P_Contract_Ref_No 	 In Oltb_Contract.Contract_Ref_No%Type,
								P_Total_Interest_Amt In Oltb_Amount_Due.Amount_Due%Type,
								P_Total_Reverse_Avl	 In Oltb_Contract_Preference.Interest_Reserve_Availability%Type,	
								P_Processing_Date	 In Date,
								pfuncid				 In Varchar2,
								P_Err_Code           In Out Varchar2,
								P_Err_Param          In Out Varchar2
							)	
Return Boolean;
--OBCL_14.4_Autocap Changes Ends
--OBCL_14.4_SOFR_Changes starts
FUNCTION Fn_Vami_accrual_for_rfr( Ref_No       IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                  Pm_Err_Code  IN OUT VARCHAR2,
                                  Pm_Params    IN OUT VARCHAR2
                ) RETURN VARCHAR2;
--OBCL_14.4_SOFR_Changes ends
--OBCL_14.4_NewComp_Addition Changes starts
Function Fn_Process_New_Comps_For_Contract(P_Contract_Ref_No    In Oltb_Contract.Contract_Ref_No%Type,
                                     	   P_Product            In Oltb_Contract.Product_Code%TYPE,
                                     	   P_Processing_Date    In Date,
                                     	   pfuncid              In Varchar2,
                                     	   P_Err_Code           In Out Varchar2,
                                     	   P_Err_Param          In Out Varchar2)
RETURN BOOLEAN;
Function Fn_Process_Addnl_Comps(p_Branch           IN Oltb_Contract.Branch%TYPE,
                                p_Processing_Date  IN DATE,
                                p_Product          IN Oltb_Contract.Product_Code%TYPE,
                                p_Commit_Frequency IN Oltb_Automatic_Process_Master.Bod_Commit_Count%TYPE,
                                p_Err_Code         IN OUT VARCHAR2,
                                p_Err_Param        IN OUT VARCHAR2)
RETURN BOOLEAN;                                     
--OBCL_14.4_NewComp_Addition Changes Ends

--Bug#36866128_1  Changes Start
FUNCTION Fn_Check_Link_Amt(p_Function_Id   IN VARCHAR2,
                             p_Contractrefno IN VARCHAR2,
                             p_Versionno     IN VARCHAR2,
                             p_Diffamount    IN NUMBER,
                             p_Contccy       IN VARCHAR2,
                             p_Err_Code      IN OUT VARCHAR2,
                             p_Err_Params    IN OUT VARCHAR2) 
RETURN BOOLEAN;
--Bug#36866128_1  Changes End

--Bug#36866128_1  Commented Start                            
--Bug#36830170 Changes Start
/*FUNCTION Fn_Pymnt_Cap_Process(p_Contract_Ref_No    IN Oltb_Contract.Contract_Ref_No%TYPE,
                              p_Total_Interest_Amt IN Oltb_Amount_Due.Amount_Due%TYPE,
                              p_Processing_Date    IN DATE,
                              p_Err_Code           IN OUT VARCHAR2,
                              p_Err_Param          IN OUT VARCHAR2)
RETURN BOOLEAN;*/
--Bug#36830170 Changes End
--Bug#36866128_1  Commented End

END olams;
/
CREATE or replace SYNONYM olamss FOR olams
/