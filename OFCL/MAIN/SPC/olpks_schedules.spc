CREATE OR REPLACE PACKAGE olpks_schedules
IS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_schedules.SPC
**
** Module	: LD
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
/* Change History
17/01/2002  FCC 3.9 LATAM  TENOR WISE FLOATING RATE CHANGES. Floating rate is picked up for the combination of
				   Tenor + Borrow Lend Indicator + Rate Calc Type.
				   Added new function fn_fetch_floating_rates_new and
				   the old function fn_fetch_floating_rates is commented

25/01/2002   FCC 39 Added a new function fn_validate_inst_schedules.

14-may-2002  FCC 4.0 june 02 Holiday handling to include branch holiday checking
			Added the parameter holiday_check in fn_poplualte_revisions,fn_populate_amount_due,
			fn_compute_schedule_dates and fn_get_final_schedule_date.

22-MAY-2002	FCC4.0 ASPAC change. Added a new function fn_create_inst_schedules
		for installment loan processing

19-FEB-2003 FCC 4.2 APR 2003. LS changes. Added an overloaded function fn_split_schedules with 6 parameters
							to split fixed revision and margin schedules.
							Functions fn_create_schedules and fn_populate_revisions have been modified
							by adding two IN date parameters with default values for LS fixed rate revision.
10-MAR-2003 FCC 4.2 Apr 2003 LS changes Functions fn_get_final_schedule_date and fn_compute_schedule_dates have been 							    by adding three IN parameters with default value for LS holiday treatment.

23-Apr-2003 FCC 4.2 Apr 2003 for SFr #3. changes for default assignment of date.

28-APR-2003 FCC4.2 APR 2003 LS changes - Added p_margin in record type rate_rectype

30-APR-2003 FCC4.2 APR 2003 ITR2 SFR #89 - Default date format changed in fn_create_schedules

07-MAY-2003	FCC 4.2 OPS Focus testing changes-- Changes done for holiday treatment
								Overloaded the function fn_create_schedules

20-JAN-2004 FCC4.5 APR 2004 LATAM OPUAT#119.The default value for fn_populate_revision was not formatted properly..

02-AUG-2004 FCC 4.6 Sep04 Retro (India) Added new function fn_calculate_aer

15-JUN-2005 FCC 4.6.2  CITI LS CHANGES Added New function FN_DFLT_SCHEDULES_LS -vijeth

16-JUN-2005 FCC 4.6.2  CITI LS CHANGES Added New function fn_explode_reduction_sch-aarthi

19-JUL-2005 FCC 4.6.2 JUL 2005 CITILS LS77 CHANGES added new parameter in function fn_compute_schedule_dates.

22-SEP-2005	FLEXCUBE V.CL Release 7.0 Tranche Repayment Schedule Changes By Aarthi
		Added a new function Fn_tranche_sch to redefine the tranche repayment schedules whenever there is a prepayment
		at the drawdown.
25-Nov-2005	FLEXCUBE V.CL Release 7.0 Margin Changes by Aarthi
		Added a new function Fn_get_final_rates to get datewise margin.
06-Apr-2006 FLEXCUBE V.CL Release 7.0 Changes by Aarthi
		Changed copyright year.
20-Apr-2006	FLEXCUBE V.CL Release 7.0 Margin Changes by Nirupama
		Commented a function Fn_get_final_rates
03-Sep-2007 FCC V.CL Release 7.3 Term Revolver Changes, Gowri
05-AUG-2008 FLEXCUBE V.CL Release 7.4 Retro Changes CITIUK-LS-CITIUPG73100243 by Geetly,Schedules are exploding as 0 even though rate is present , FN_NEW_ICCF_CALC is added (a) Schedule Changes are done on commitments with linkages.(b) Commitment/Loan which has undergone VAMI and schedule change happens.
11-AUG-2008	FLEXCUBE V.CL Release 7.4 - STP LD VAMI CHANGES ; Search String "STP LD VAMI CHANGES"
09-SEP-2008	FLEXCUBE V.CL Release 7.4 - Rate pickup changes ; Search String "FLEXCUBE V.CL Release 7.4- RATE PICKUP -09-SEP-2008"
09-MAR-2009 FLEXCUBE V.CL Release 7.5 LOT1 FS Tag#04, Interim Interest Schedule changes
09-Aug-2009 FLEXCUBE V.CL Release 7.5 lot3 FS TAG#5, Value dated payment changes, relaxed the validation that checking if any
		schedules are present on the value date of the contract, if there was a value dated payment for the contract.
10-Dec-2009 FLEXCUBE V.CL Release 7.6 PBG SITERETRO,04-AUG-2009 CITIPBG TILL#434 Change for Composite rate code population
10-Dec-2009 FLEXCUBE V.CL Release 7.6 PBG SITERETRO,13-AUG-2009 CITIPBG TILL#184 CHANGES: Release 7.5 Added by for Month end Indicator changes
20-APR-2010 FLEXCUBE V.CL Release 7.6 ITR1 SFR#1 CITIPBG RETRO TILL#2055  Changes have been done to populate the correct amount for lcy equivalent.
13-APR-2012 Flexcube V.CL Release 7.11 FS Tag 12 Changes, Ability to handle Adjustable Rate Mortgage Changes, Adjustment_rate column has been added
05-FEB-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 VOL1 FS Tag 08 changes added
31-AUG-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 RETRO CITIPBG TILL#5664 CHANGES : Block rebuild of VD Bal for commitments from contract online screen, except for new cmts.
					Some commitments have LCs linked to them which have very frequent paydowns / increases resulting in many rows in vd bal.
					Rebuilding vdbal is causing the system to freeze up.
01-SEP-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 RETRO 	TILL#5634 CHANGES : Auto-extension deletes future principal schedules from oltb_amount_due and doesn’t put back.
05-OCT-2016 OFCL 12.2 -- Negative Interest Rate changes
05-Mar-2018  BUG#27498955  Reversal of Prepayment does not work
**Changed By         : Priyadarshini K
**Changed On         : 07-Sep-2018
**Change Description : Changed the default value of DATE to fn_create_schedules from 31/12/2033 to 31/12/4033 as it causes issue while booking longer tenor contracts.
**Search String      : OBCL_28613646

  **Changed By         : Pallavi R
  **Changed On         : 30-Oct-2018
  **Change Description : Schedules are not building properly for CASCADE schedule .
  **Search String      : OBCL_14.2_#28692633 Changes

  **Changed By         : Meha
  **Changed On         : 4-Mar-2019
  **Change Description : Moratorium changes.
  **Search String      : OBCL_14.3_Moratorium

  **Changed By         : Kavitha N
  **Date               : 17-Dec-2019
  **Change Description : Changes done for Finnacial Centre Holiday Treatment
  **Search String      : OBCL 14.4 Financial Centre based holiday treatment Changes 

  **Changed By         : Abhinav Bhasker
  **Date               : 14-Feb-2020
  **Change Description : Changes w.r.t. enable Revision Schedule for Penal Components
  **Search String      : OBCL_14.3_Enable_Revision_Schedule_Penal_Component
  **Changed By         : Abhinav Bhasker
  **Date               : 20-Mar-2020
  **Change Description : Changes w.r.t. Pay By Date
  **Search String      : OBCL_14.4_Payment_Delay

	**Changed By         : Baljinder
    **Date               : 25-Mar-2020
    **Change Description : Added code for SOFR changes
    **Search String      : OBCL_14.4_SOFR changes  
	
	**Changed By         : Abhinav Bhasker
	**Date               : 16-Jun-2020
	**Change Description : Applied Changes to populate Rate Pickup Date for NON SOFR Comp
	**Search String      : OBEL_14.4_NON_SOFR_RATE_PICKUP_DATE
	
	**Changed By         : Arunprasath
	**Date               : 01-Jul-2020
	**Change Description : Added global variable g_new_maturity_date
	**Search String      : Bug#Bug#31523574
	
	**Changed By         : Arunprasath
	**Date               : 27-Aug-2020
	**Change Description : Added variable g_update_amount_due_stp
	**Search String      : OBCL_14.3_LS_SOFR_Bug#31756189
	
	**Changed By         : Satheesh Seshan
	**Date               : 28-May-2021
	**Change Description : 12.3 FwdPort Bug#32190771 added fn_daily_schedules_update function 
	**Search String      : Bug#32190771	
	
	**Changed By         : Abhik Das
    **Changed On         : 27-May-2022
    **Change Description : Changed code to fix prepayment reversal case
    **Search String      : OBCL_14.5_Support_Bug#34193519_Changes
    
  **Changed By         : Abhinav Bhasker
  **Changed On         : 06-Aug-2022
  **Change Description : Changes to enable Display of Payment Schedule if for Current Dated Contract has Currency Holiday on Value Date, i.e. Contract is current Dated, 
						 but DSBR moved to Future Date because of Holiday
  **Search String      : Bug#34428174
  
  **Changed By         : Akhila Samson
  **Changed On         : 15-Nov-2023
  **Change Description : Added a global collection variable for floating period auto contracts.
  **Search String      : Bug#35966702
  
   **Changed By         : Guru
   **Date               : 10-Jul-2024
   **Change Description : Performance tuning changes for Exponential calculation by changing to collections instead of direct references to EXP tables.                          
   **Search String      : Bug#36825935
   
******************************************************************************************************************************************/
g_rate_pickup_date       oltb_contract_iccf_calc.rate_pickup_date%Type;--OBEL_14.4_NON_SOFR_RATE_PICKUP_DATE
--05-FEB-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 VOL1 FS Tag 08  changes starts
TYPE p_schedule IS TABLE OF oltbs_contract_schedules%ROWTYPE INDEX BY BINARY_INTEGER;
l_tab_schedules p_schedule;
--05-FEB-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 VOL1 FS Tag 08  ends
g_Sch_Final_Date DATE; --OBCL_14.2_#28692633 Changes
g_reverse_Done VARCHAR2(1) := 'F';--OBCL_14.5_Support_Bug#34193519_Changes
TYPE comp_hoff_rectype IS
	RECORD (p_component oltbs_computation_handoff.component%TYPE,
		p_effective_Date oltbs_computation_handoff.effective_date%TYPE,
		p_rate oltbs_computation_handoff.rate%TYPE,
		p_amount oltbs_computation_handoff.amount%TYPE,
		p_rate_sign oltbs_computation_handoff.rate_sign%TYPE --Fcc 4.4 Dec 2003 Negative Interest Rate Changes
		);

TYPE ty_comp_hoff is TABLE of comp_hoff_rectype
	INDEX BY BINARY_INTEGER;

TYPE ty_schedule_date is TABLE of date
	INDEX BY BINARY_INTEGER;

TYPE amt_due_rectype IS
	RECORD (p_due_date oltbs_amount_due_cs.due_date%TYPE,
		p_amount_due oltbs_amount_due_cs.amount_due%TYPE);

TYPE ty_amt_due is TABLE of amt_due_rectype
	INDEX BY BINARY_INTEGER;

TYPE amt_paid_rectype IS
	RECORD (p_reference_no oltbs_amount_paid.contract_ref_no%TYPE,
		p_seq_no oltbs_amount_paid.event_seq_no%TYPE,
		p_component oltbs_amount_paid.component%TYPE,
		p_paid_date oltbs_amount_paid.paid_date%TYPE,
		p_due_date oltbs_amount_paid.due_date%TYPE,
		p_amount_settled oltbs_amount_paid.amount_settled%TYPE);

TYPE ty_amt_paid is TABLE of amt_paid_rectype
	INDEX BY BINARY_INTEGER;

TYPE rate_rectype IS
	RECORD (p_effective_Date CFTMS_FLOATING_RATE.effective_date%TYPE,
		p_rate CFTMS_FLOATING_RATE.int_rate%TYPE,
		p_margin  lftbs_contract_interest.margin%TYPE,          -- 28-APR-2003 LS changes
		p_rate_sign lftbs_contract_interest.rate_sign%TYPE -- FCC 4.4 Dec 2003 Negative Interest Rate Changes
		,p_base_rate CFTMS_FLOATING_RATE.int_rate%TYPE -- FLEXCUBE V.CL Release 7.4- RATE PICKUP -09-SEP-2008 added
		,p_spread	lftbs_contract_interest.Spread%TYPE -- FLEXCUBE V.CL Release 7.4- RATE PICKUP -09-SEP-2008 added
		,p_adjustment_rate	lftbs_contract_interest.adjustment_rate%TYPE --13-APR-2012 Flexcube V.CL Release 7.11 FS Tag 12 Changes here
		);

TYPE ty_rate is TABLE of rate_rectype
	INDEX BY BINARY_INTEGER;

--FLEXCUBE V.CL Release 7.4 Retro Changes CITIUK-LS-CITIUPG73100243 by Geetly Changes Starts
TYPE rec_temp_iccf IS RECORD
	(
	contract_reference_no	lftbs_contract_interest.contract_reference_no%TYPE,
	component 		lftbs_contract_interest.component%TYPE,
	start_date		OLTB_CONTRACT_ICCF_CALC.start_date%TYPE,
	end_date		OLTB_CONTRACT_ICCF_CALC.end_date%TYPE,
	basis_amount_currency	cytms_ccy_defn.ccy_code%TYPE,
	basis_amount		OLTB_CONTRACT_ICCF_CALC.basis_amount%TYPE,
	rate			lftbs_contract_interest.rate%TYPE,
	interest_basis		lftbs_contract_interest.interest_basis%TYPE,
	rate_sign		lftbs_contract_interest.rate_sign%TYPE,
	l_found			varchar2(1)
	);

TYPE tbl_temp_iccf IS TABLE OF rec_temp_iccf INDEX BY BINARY_INTEGER;

TYPE rec_int_calc  IS RECORD (
	contract_reference_no 	lftbs_contract_interest.contract_reference_no%TYPE,
	component 		lftbs_contract_interest.component%TYPE,
	schedule_date		OLTB_CONTRACT_ICCF_CALC.schedule_date%TYPE,
	basis_amount_currency 	cytms_ccy_defn.ccy_code%TYPE,
	basis_amount 		lftbs_contract_interest.amount%TYPE,
	start_date 		lftbs_contract_interest.transaction_date%TYPE,
	end_date		lftbs_contract_interest.transaction_date%TYPE,
	rate			lftbs_contract_interest.rate%TYPE,
	int_amount		NUMBER,
	number_of_days		INTEGER,
	interest_basis		lftbs_contract_interest.interest_basis%TYPE,
	daily_int_amount	NUMBER,
	rate_sign		lftbs_contract_interest.rate_sign%TYPE
	) ;

TYPE tbl_int_calc IS TABLE OF rec_int_calc INDEX BY BINARY_INTEGER;
--FLEXCUBE V.CL Release 7.4 Retro Changes CITIUK-LS-CITIUPG73100243 by Geetly Changes Ends

--Bug#35966702 changes starts
TYPE comp_eff_date_actual IS
	RECORD (p_effective_Date CFTMS_FLOATING_RATE.effective_date%TYPE,
			p_actual_Eff_Date CFTMS_FLOATING_RATE.effective_date%TYPE);
TYPE ty_eff_date_actual is TABLE of comp_eff_date_actual
	INDEX BY BINARY_INTEGER;
G_eff_date_actual ty_eff_date_actual;
--Bug#35966702 changes ends

--Bug#36825935 Changes Starts

TYPE ty_tb_rate_handoff IS TABLE OF oltbs_computation_handoff%ROWTYPE INDEX BY BINARY_INTEGER;

--Bug#36825935 Changes Ends

function fn_create_schedules
		(
		p_action 			IN 	varchar2,
		p_reference_no 		IN 	varchar2,
		p_latest_version_no 	IN 	number,
		p_contract_type 		IN		varchar2,
		p_effective_date 		IN 	date,
		p_vamb_esn			IN		oltbs_contract_event_log.event_seq_no%TYPE,
		p_holiday_chk_failed	OUT	boolean,
		p_error_code		OUT 	varchar2,
		--OBCL_28613646 starts
		--p_fdate  IN Date default to_date('31/12/2033','DD/MM/RRRR'),--30-APR-2003 FCC4.2 APR 2003 ITR2 SFR #89
		--p_mdate  IN Date default to_date('31/12/2033','DD/MM/RRRR'),--30-APR-2003 FCC4.2 APR 2003 ITR2 SFR #89
		p_fdate  IN Date default to_date('31/12/4033','DD/MM/RRRR'),
		p_mdate  IN Date default to_date('31/12/4033','DD/MM/RRRR'),
		--OBCL_28613646 ends
		p_chg_future_amt_sch	IN 	varchar2,		-- FCC 4.2 OPS Focus testing change
		p_chg_future_rvn_sch	IN 	varchar2		-- FCC 4.2 OPS Focus testing change
		)return boolean;

function fn_create_schedules
		(
		p_action IN Varchar2,
		p_reference_no IN Varchar2,
		p_latest_version_no IN Number,
		p_contract_type IN Varchar2,
		p_effective_date IN Date,
		p_vamb_esn	IN	oltbs_contract_event_log.event_seq_no%TYPE,
		p_holiday_chk_failed OUT boolean,
		p_error_code OUT Varchar2,
		--p_fdate  IN Date default '31/12/2033', --FCC 4.2 LS Apr 2003
		--p_mdate  IN Date default '31/12/2033'  --FCC 4.2 LS Apr 2003
		--OBCL_28613646 starts
		--p_fdate  IN Date default to_date('31/12/2033','DD/MM/RRRR'),--30-APR-2003 FCC4.2 APR 2003 ITR2 SFR #89
		--p_mdate  IN Date default to_date('31/12/2033','DD/MM/RRRR')--30-APR-2003 FCC4.2 APR 2003 ITR2 SFR #89
		p_fdate  IN Date default to_date('31/12/4033','DD/MM/RRRR'),
		p_mdate  IN Date default to_date('31/12/4033','DD/MM/RRRR')
		--OBCL_28613646 ends
		) return boolean;


function fn_create_schedules
		(
		p_action IN Varchar2,
		p_reference_no IN Varchar2,
		p_latest_version_no IN Number,
		p_contract_type IN Varchar2,
		p_effective_date IN Date,
		p_holiday_chk_failed OUT boolean,
		p_error_code OUT Varchar2,
		--p_fdate  IN Date default '31/12/2033', --FCC 4.2 LS Apr 2003
		--p_mdate  IN Date default '31/12/2033'  --FCC 4.2 LS Apr 2003
		--OBCL_28613646 starts
		--p_fdate  IN Date default to_date('31/12/2033','DD/MM/RRRR'),--30-APR-2003 FCC4.2 APR 2003 ITR2 SFR #89
		--p_mdate  IN Date default to_date('31/12/2033','DD/MM/RRRR')--30-APR-2003 FCC4.2 APR 2003 ITR2 SFR #89
		p_fdate  IN Date default to_date('31/12/4033','DD/MM/RRRR'),
		p_mdate  IN Date default to_date('31/12/4033','DD/MM/RRRR')
		--OBCL_28613646 ends
		) return boolean;

function fn_new_redef
		(
		p_action IN Varchar2,
		p_reference_no IN Varchar2,
		p_maturity_type IN Varchar2,
		p_payment_method IN oltbs_contract_master.payment_method%Type,
		p_component IN Varchar2,
		p_effective_date IN Date,
		p_ty_comp_hoff IN ty_comp_hoff,
		p_currency IN Varchar2,
		p_cur_principal IN Number,
		p_old_schedule_date IN Date,
		p_error_code OUT Varchar2
		) return boolean;

function fn_default_schedules
			(
			p_reference_no IN Varchar2,
			p_action	IN varchar2,
			p_product IN Varchar2,
			p_pmt_meth	IN	oltms_product_master_ld.payment_method%Type,
			p_amount IN Number,
			p_currency IN cytms_ccy_defn.ccy_code%type,
			p_start_date IN Date,
			p_end_date IN Date
			) return boolean;

function fn_default_schedules
			(
			p_reference_no IN Varchar2,
			p_action	IN varchar2,
			p_product IN Varchar2,
			p_pmt_meth	IN	oltms_product_master_ld.payment_method%Type,
			p_amount IN Number,
			p_currency IN cytms_ccy_defn.ccy_code%type,
			p_start_date IN Date,
			p_end_date IN Date,
			p_current_version_no	IN	oltbs_contract.latest_version_no%TYPE,
			p_current_event_seq_no	IN	oltbs_contract.latest_event_seq_no%TYPE,
			p_list_of_int_comps	IN	varchar2
			) return boolean;

function fn_validate_schedules
			(
			p_reference_no IN Varchar2,
			p_version_no IN Number,
			p_event_seq_no IN Number,
			p_contract_amount IN Number,
			p_value_date IN Date,
			p_maturity_date IN Date,
			p_holiday_ccy IN Varchar2,
			p_ignore_holiday IN Varchar2,
			p_forward_backward IN Varchar2,
			p_move_across_month IN Varchar2,
			p_cascade_movement IN Varchar2,
			p_holiday_chk_failed OUT Boolean,
			p_error_component OUT Varchar2,
			p_error_code OUT Varchar2, --OBCL 14.4 Financial Centre based holiday treatment Changes - Starts
			p_Fc_List    IN VARCHAR2 DEFAULT NULL
			--OBCL 14.4 Financial Centre based holiday treatment Changes - Ends
			) return boolean;

function fn_split_schedules
			(
			p_reference_no IN Varchar2,
			p_version_no IN Number,
			p_effective_date IN Date,
			p_error_code OUT Varchar2
			) return boolean;
--FCC 4.2 LS Apr 2003 start
function fn_split_schedules
			(
			p_reference_no IN Varchar2,
			p_version_no IN Number,
			p_effective_date IN Date,
			p_fdate IN Date,
			p_mdate IN Date,
			p_error_code OUT Varchar2
			) return boolean;
--FCC 4.2 LS Apr 2003 end


--Bug#27498955 Starts
function fn_split_schedules
			(
			p_reference_no IN Varchar2,
			p_version_no IN NUMBER,
			p_esn		IN NUMBER,
			p_effective_date IN Date,
			p_component IN VARCHAR2,
			p_error_code OUT Varchar2
			) return boolean;
--Bug#27498955 Ends

--Bug#32190771 starts added below function
FUNCTION Fn_Daily_Schedules_Update
			(p_Wrk_Oldtronl IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl,
		     p_SOFR_Flg     IN VARCHAR2,
		     p_Err_Code     IN OUT VARCHAR2,
		     p_Err_Params   IN OUT VARCHAR2
		     ) RETURN BOOLEAN;
--Bug#32190771 Ends  added below function	
						  
function fn_populate_handoff
			(
			p_reference_no IN Varchar2,
			p_component IN Varchar2,
			p_from_date IN Date,
			p_branch_date IN Date,
			p_error_code OUT Varchar2
			) return boolean;

--17/01/2002 FCC 3.9 LATAM Tenor floating rate changes Starts

/* function fn_fetch_floating_rates
			(
			p_branch IN Varchar2,
			p_from_date IN Date,
			p_to_date IN Date,
			p_currency IN Varchar2,
			p_rate_code IN Varchar2,
			p_basis_amount IN Number,
			p_ty_rate IN OUT ty_rate
			) return boolean;
*/

function fn_fetch_floating_rates_new(
			p_branch IN Varchar2,
			p_from_date IN Date,
			p_to_date IN Date,
			p_currency IN Varchar2,
			p_rate_code IN Varchar2,
			p_basis_amount IN Number,
			p_borrow_lend_ind IN varchar2,
			p_tenor	IN	number,
			p_rate_calc_type	IN varchar2,
			p_ty_rate IN OUT ty_rate,
			p_rate_fixing_days IN NUMBER DEFAULT 0--26953542 changes
			)
return boolean;

--17/01/2002 FCC 3.9 LATAM Tenor floating rate changes Ends

-- FCC3.9DR AND PARAGUAY CHANGES STARTS
function fn_validate_inst_schedules
			(
			p_reference_no IN Varchar2,
			p_version_no IN Number,
			p_event_seq_no IN Number,
			p_contract_amount IN Number,
			p_value_date IN Date,
			p_maturity_date IN Date,
			p_holiday_ccy IN Varchar2,
			p_ignore_holiday IN Varchar2,
			p_forward_backward IN Varchar2,
			p_move_across_month IN Varchar2,
			p_cascade_movement IN Varchar2,
			p_holiday_chk_failed OUT Boolean,
			p_error_component OUT Varchar2,
			p_error_code OUT Varchar2, --OBCL 14.4 Financial Centre based holiday treatment Changes - Starts
                        p_Fc_List    IN VARCHAR2 DEFAULT NULL
			--OBCL 14.4 Financial Centre based holiday treatment Changes - Ends
			) return boolean;
-- FCC3.9DR AND PARAGUAY CHANGES ENDS

function	fn_get_current_rate
			(
			p_contract_ref_no IN oltbs_contract.contract_ref_no%type,
			p_component IN oltbs_contract_iccf_calc.component%type,
			p_effective_date IN Date,
			p_calc_rec OUT oltbs_contract_iccf_calc%rowtype
			) Return Boolean;

function	fn_clear_iccf_calc
			(
			p_contract_ref_no IN oltbs_contract.contract_ref_no%type,
			p_component IN oltbs_contract_iccf_calc.component%type,
			p_effective_date IN Date
			) Return Boolean;

function	fn_get_rates_for_period
			(
			p_branch IN Varchar2,
			p_contract_ref_no IN oltbs_contract.contract_ref_no%type,
			p_component IN oltbs_contract_iccf_calc.component%type,
			p_from_date IN Date,
			p_to_date IN Date,

			-- PHPCBC 5/3/99 Changed to IN OUT to handle Int on Int
			p_rates IN OUT ty_rate,
			-- PHPCBC 12/3/99 : Get Rates for Subcomponents with Penalty Interest
			p_penalty_rate IN NUMBER := 0,
		-- PHPCBC 14/3/99 : Flag to Indicate Effective (Derived) or Actual (As per ICCF)
			p_eff_rate IN Boolean := TRUE
			) Return Boolean;

function	fn_derive_rates	--- PHPCBC 5/3/99 New function to handle Int on Int
			(
			p_base_rate IN ty_rate,
			p_dependant_rate IN ty_rate,
			p_derived_rate IN OUT ty_rate
			) Return Boolean;


function	fn_get_leap_dates
			(
			p_from_date IN DATE,
			p_to_date IN DATE,
			p_date_tab IN OUT ty_schedule_date
			) Return Boolean;

function fn_populate_revisions
			(
			p_reference_no IN Varchar2,
			p_action IN Varchar2, --BUG#28391436
			p_contract_type IN Varchar2,
			p_version_no IN Number,
			p_component IN Varchar2,
			p_effective_date IN Date,
			p_value_date IN date,
			p_maturity_date IN date,
			p_holiday_ccy IN Varchar2,
			p_ignore_holiday IN Varchar2,
			p_forward_backward IN Varchar2,
			p_move_across_month IN Varchar2,
			p_cascade_movement IN Varchar2,
			p_holiday_check   IN Char,--FCC 4.0 june 02 Holiday check
			p_error_code OUT Varchar2,
			--
			--FCC4.5 APR 2004 LATAM OPUAT#119 changes start
			--
			--p_fdate  IN Date default '31/12/2033', --FCC 4.2 LS Apr 2003
			--p_mdate  IN Date default '31/12/2033' --FCC 4.2 LS Apr 2003
			p_fdate    IN DATE DEFAULT TO_DATE('31/12/2100','DD/MM/YYYY'),
			p_mdate    IN DATE DEFAULT TO_DATE('31/12/2100','DD/MM/YYYY') 
			--OBCL 14.4 Financial Centre based holiday treatment Changes - Starts
                        ,p_Fc_List   IN  VARCHAR2  DEFAULT NULL 
	  		--OBCL 14.4 Financial Centre based holiday treatment Changes - Ends
			--
			--FCC4.5 APR 2004 LATAM OPUAT#119 changes end
			--
			) return boolean;

function fn_populate_amount_due
			(
			p_reference_no IN Varchar2,
			p_version_no IN Number,
			p_contract_type IN Varchar2,
			p_maturity_type IN Varchar2,
			p_component IN Varchar2,
			p_component_type IN Varchar2,
			p_effective_date IN Date,
			p_value_date IN date,
			p_maturity_date IN date,
			p_currency_amt_due IN Varchar2,
			p_counterparty IN Varchar2,
			p_basis_amount_tag IN Varchar2,
			p_holiday_ccy IN Varchar2,
			p_ignore_holiday IN Varchar2,
			p_forward_backward IN Varchar2,
			p_move_across_month IN Varchar2,
			p_cascade_movement IN Varchar2,
			p_amount_paid IN OUT Number,
			p_holiday_check	IN Char,--FCC 4.0 june 02 holiday check
			p_holiday_chk_failed OUT boolean,
			p_error_code OUT Varchar2
			--OBCL 14.4 Financial Centre based holiday treatment Changes - Starts
                       ,p_Fc_List            IN VARCHAR2 DEFAULT NULL
	 		--OBCL 14.4 Financial Centre based holiday treatment Changes - Ends
			) return boolean;

function fn_update_amount_due
			(
			p_reference_no IN Varchar2,
			p_component IN Varchar2,
			p_effective_date IN Date,
			p_error_code OUT Varchar2
			) return boolean;

function fn_apply_amt_paid
			(
			p_action IN Varchar2,
			p_reference_no IN Varchar2,
			p_component IN Varchar2,
			p_effective_date IN Date,
			p_old_maturity_date IN Date,
			p_amount_paid IN Number,
			p_error_code OUT Varchar2
			) return boolean;

function fn_store_amt_paid
			(
			p_rowid IN Rowid,
			p_reference_no IN Varchar2,
			p_seq_no IN Number,
			p_component IN Varchar2,
			p_paid_date IN Date,
			p_due_date IN Date,
			p_amount_settled IN Number,
			p_ty_amt_paid IN OUT ty_amt_paid
			) return boolean;

function fn_merge_dates
			(
			p_reference_no IN Varchar2,
			p_component IN Varchar2,
			p_flat_component IN Boolean,
			p_effective_date IN Date,
			p_ty_comp_hoff OUT ty_comp_hoff
			) return boolean;

--FLEXCUBE V.CL Release 7.0 Margin Changes by Aarthi start
--FLEXCUBE V.CL Release 7.0 Margin Changes by Nirupama start
/*FUNCTION Fn_get_final_rates
			(p_contract_ref_no	IN	VARCHAR2,
			 p_component		IN	VARCHAR2,
			 p_from_date		IN	DATE,
			 p_to_date			IN	DATE,
			 p_rates			IN OUT	ty_rate)
RETURN BOOLEAN;*/
--FLEXCUBE V.CL Release 7.0 Margin Changes by Nirupama end
--FLEXCUBE V.CL Release 7.0 Margin Changes by Aarthi end

--10-Dec-2009 FLEXCUBE V.CL Release 7.6 PBG SITERETRO,13-AUG-2009 CITIPBG TILL#184 CHANGES: Release 7.5 Added by for Month end Indicator changes Starts
function fn_compute_schedule_dates
			(
			p_start_date in date,
			p_value_date in date,
			p_maturity_date in date,
			p_holiday_ccy in Varchar2,
			p_frequency in Varchar2,
			p_month_end_ind IN VARCHAR2,
			p_frequency_units in number,
			p_no_of_schedules in number,
			p_ignore_holiday in Varchar2,
			p_forward_backward in Varchar2,
			p_move_across_month in Varchar2,
			p_cascade_movement in Varchar2,
			p_ty_schedule_date in out ty_schedule_date,
			p_holiday_check   in  char,
			p_holiday_chk_failed OUT boolean,
			p_error_code OUT Varchar2,
			p_facility_ccy   in Varchar2  := '',
			p_contract_ccy   in Varchar2  := '',
			p_local_ccy   in Varchar2  := '' ,
			p_intraday	in varchar2  :='N',
			p_val_dtd_pmnt  in     VARCHAR2  := 'N',
			--OBCL 14.4 Financial Centre based holiday treatment Changes - Starts
                        p_Fc_List       IN VARCHAR2 DEFAULT NULL
			--OBCL 14.4 Financial Centre based holiday treatment Changes - Ends		
			--OBCL_14.3_Enable_Revision_Schedule_Penal_Component - Start
			,p_Rvrsl_Penal_Comp  IN VARCHAR2 DEFAULT 'N'
			--OBCL_14.3_Enable_Revision_Schedule_Penal_Component - End
            ,p_pay_by_days     IN NUMBER DEFAULT 0 --OBCL_14.4_Payment_Delay
			) return boolean;
--10-Dec-2009 FLEXCUBE V.CL Release 7.6 PBG SITERETRO,13-AUG-2009 CITIPBG TILL#184 CHANGES: Release 7.5 Added by for Month end Indicator changes Ends


function fn_compute_schedule_dates
			(
			p_start_date in date,
			p_value_date in date,
			p_maturity_date in date,
			p_holiday_ccy in Varchar2,
			p_frequency in Varchar2,
			p_frequency_units in number,
			p_no_of_schedules in number,
			p_ignore_holiday in Varchar2,
			p_forward_backward in Varchar2,
			p_move_across_month in Varchar2,
			p_cascade_movement in Varchar2,
			p_ty_schedule_date in out ty_schedule_date,
			p_holiday_check   in  char,--FCC 4.0 june 02 holiday check
			p_holiday_chk_failed OUT boolean,
			p_error_code OUT Varchar2,
			p_facility_ccy   in Varchar2  := '', --FCC 4.2 Apr 2003 LS changes
			p_contract_ccy   in Varchar2  := '', --FCC 4.2 Apr 2003 LS changes
			p_local_ccy   in Varchar2  := '' --FCC 4.2 Apr 2003 LS changes
			,p_intraday	in varchar2  :='N'  --FCC 4.6.2 JUL 2005 CITILS LS77 changes
			,p_val_dtd_pmnt  in     VARCHAR2  := 'N'--09-Aug-2009 FLEXCUBE V.CL Release 7.5 lot3 FS TAG#5
			--OBCL 14.4 Financial Centre based holiday treatment Changes - Starts
			,p_Fc_List       IN VARCHAR2 DEFAULT NULL
			--OBCL 14.4 Financial Centre based holiday treatment Changes - Ends
			--OBCL_14.3_Enable_Revision_Schedule_Penal_Component - Start
			,p_Rvrsl_Penal_Comp  IN VARCHAR2 DEFAULT 'N'
			--OBCL_14.3_Enable_Revision_Schedule_Penal_Component - End
            ,p_pay_by_days     IN NUMBER DEFAULT 0 --OBCL_14.4_Payment_Delay
			) return boolean;

function fn_get_next_schedule_date
			(
			p_source_date in date,
			p_frequency in Varchar2,
			p_frequency_units in number
			) return date;

function fn_get_final_schedule_date
			(
			p_source_date in date,
			p_holiday_ccy in Varchar2,
			p_ignore_holiday in Varchar2,
			p_forward_backward in Varchar2,
			p_move_across_month in Varchar2,
			p_value_date in date,
			p_maturity_date in date,
			p_schedule_date in out Date,
			p_holiday_check  in char,--FCC 4.0 june 02 holiday check
			p_holiday_chk_failed OUT boolean,
			p_error_code out Varchar2,
			p_facility_ccy in varchar2 := null, --FCC 4.2 Apr 2003 LS changes
			p_contract_ccy in varchar2 := null, --FCC 4.2 Apr 2003 LS changes
			p_local_ccy in varchar2 := null --FCC 4.2 Apr 2003 LS changes
			--OBCL 14.4 Financial Centre based holiday treatment Changes - Starts
                        ,p_Fc_List   IN VARCHAR2 DEFAULT NULL
			--OBCL 14.4 Financial Centre based holiday treatment Changes - Ends
			) return boolean;

FUNCTION fn_add_amount_due_details
			(
			pContractRefNo	IN			oltbs_contract.contract_ref_no%type,
			pEventSeqNo		IN			oltbs_contract.latest_event_seq_no%type,
			pEffectiveDate	IN			Date,
			pErrorCode		IN	OUT	ertbs_msgs.err_code%type
			)
			RETURN Boolean;

FUNCTION fn_pr_for_true_discount
			(
			p_principal		IN			Number,
			p_ty_int			IN	OUT	lfpkss_computation.ty_int,
			p_error_code	OUT		Varchar2
			) Return Boolean;


-- FCC 4.0 JUNE 2002 changes starts


FUNCTION fn_create_inst_schedules
	(
	p_contract_ref_no		IN		oltbs_contract_master.contract_ref_no%TYPE,
	p_version_no			IN		oltbs_contract_master.version_no%TYPE,
	p_effective_date		IN		DATE,
	p_maturity_date			IN		DATE,
	p_action 				IN		VARCHAR2,
	p_error_code			IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;

-- FCC 4.0 JUNE 2002 changes ends

-- FCC 4.6 Sep04 Retro (India) AER changes starts
--
FUNCTION fn_calculate_aer
			(
			p_reference_no		IN		VARCHAR2,
			p_component		IN		VARCHAR2,
			p_start_date		IN		DATE,
			p_error_code		IN OUT		VARCHAR2
			)
RETURN BOOLEAN;
--
-- FCC 4.6 Sep04 Retro (India) AER changes Ends

--FCC 4.6.2 CITIDEV LS CHANGES

FUNCTION fn_explode_reduction_sch
			(
			 p_tranche_ref_no	IN	VARCHAR2,
			 p_latest_version_no	IN	NUMBER,
			 p_error_code  		OUT	VARCHAR2,
			 p_error_param		OUT	VARCHAR2
			)
RETURN BOOLEAN;
--FCC 4.6.2 CITIDEV LS CHANGES Ends
--FCC 4.6.2 CITIDEV LS CHANGES --VIJETH STARTS
--FUNCTION ADDED FOR DEFAULTING OF SCHEDULE FROM TRANCHE

FUNCTION FN_DFLT_SCHEDULES_LS(
				p_reference_no		IN	oltbs_contract.CONTRACT_REF_NO%TYPE,
				p_tr_contract_ref_no	IN	oltbs_contract.CONTRACT_REF_NO%TYPE,
				p_current_version_no	IN	oltbs_contract.LATEST_VERSION_NO%TYPE,
				p_current_event_seq_no	IN	oltbs_contract.LATEST_EVENT_SEQ_NO%TYPE,
				p_action		IN	VARCHAR2,
				p_prod_code		IN	oltbs_contract.PRODUCT_CODE%TYPE,
				p_payment_method	IN	oltms_product_master_ld.PAYMENT_METHOD%TYPE,
				p_amount		IN	oltbs_contract_master.AMOUNT%TYPE,
				p_currency		IN	CYTMS_CCY_DEFN.CCY_CODE%TYPE,
				p_start_date		IN	DATE,
				p_end_date		IN	DATE
			   )
RETURN BOOLEAN;

--FCC 4.6.2 CITIDEV LS CHANGES --VIJETH ENDS

--FCC 4.6.2 CITIDEV LS CHANGES --NIRUPAMA STARTS
function fn_compute_schedule_dates_ls
			(
			p_start_date in date,
			p_value_date in date,
			p_maturity_date in date,
			p_holiday_ccy in Varchar2,
			p_frequency in Varchar2,
			p_frequency_units in number,
			p_no_of_schedules in number,
			p_ignore_holiday in Varchar2,
			p_forward_backward in Varchar2,
			p_move_across_month in Varchar2,
			p_cascade_movement in Varchar2,
			p_ty_schedule_date in out ty_schedule_date,
			p_holiday_check   in  char,
			p_holiday_chk_failed OUT boolean,
			p_error_code OUT Varchar2,
			p_facility_ccy   in Varchar2  := '',
			p_contract_ccy   in Varchar2  := '',
			p_local_ccy   in Varchar2  := ''
			,p_intraday	in varchar2  :='N'
			) return boolean;
--FCC 4.6.2 CITIDEV LS CHANGES --NIRUPAMA ENDS
--03-Sep-2007 FCC V.CL Release 7.3 Term Revolver Changes, starts
--FLEXCUBE V.CL Release 7.0 Tranche Repayment Schedule Changes By Aarthi start
/*FUNCTION FN_TRANCHE_SCH
			(
			 pcontract_ref_no	IN	VARCHAR2,
			 pamount		IN	NUMBER,
			 perrcode		OUT	VARCHAR2,
			 perrparam		OUT	VARCHAR2
			)
RETURN BOOLEAN;*/
--FLEXCUBE V.CL Release 7.0 Tranche Repayment Schedule Changes By Aarthi end
--03-Sep-2007 FCC V.CL Release 7.3 Term Revolver Changes, ends

-- STP LD VAMI CHANGES ends
FUNCTION FN_REDF_REPAY_SCH(
					p_contract_ref_no		IN		VARCHAR2,
					p_latest_version_no	IN		VARCHAR2,
					p_prepay_date		IN		DATE,
					p_fdate			IN		DATE,
					p_mdate			IN		DATE,
					p_err_code			IN OUT	VARCHAR2,
					p_err_param			IN OUT	VARCHAR2)
RETURN BOOLEAN;
-- STP LD VAMI CHANGES ends

--FLEXCUBE V.CL Release 7.4 Retro Changes CITIUK-LS-CITIUPG73100243 by Geetly Changes Starts
FUNCTION fn_new_iccf_calc
			(
			p_contract_ref_no	IN	OLTB_CONTRACT_ICCF_CALC.contract_ref_no%TYPE,
			p_component		IN	OLTB_CONTRACT_ICCF_CALC.component%TYPE,
			p_ty_int		IN	lfpkss_computation.ty_int,
			p_ty_sch_date		IN	ty_schedule_date,
			p_effective_date	IN	DATE,
			p_comp_hoff		IN OUT	tbl_int_calc,
			p_error_code		IN OUT	VARCHAR2,
			p_error_param		IN OUT	VARCHAR2
			)
RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.4 Retro Changes CITIUK-LS-CITIUPG73100243 by Geetly Changes Ends

--09-MAR-2009 FLEXCUBE V.CL Release 7.5 LOT1 FS Tag#04 changes start here
FUNCTION fn_schedules_auto_extension
				(
				p_branch_code 		IN 	oltms_branch.branch_code%TYPE
				, p_process_date	IN 	sttms_dates.today%TYPE
				, p_commit_frequency	IN	NUMBER
				, p_err_code		IN OUT 	VARCHAR2
				, p_err_param		IN OUT	VARCHAR2
				)
RETURN BOOLEAN;
--09-MAR-2009 FLEXCUBE V.CL Release 7.5 LOT1 FS Tag#04 changes end here
--10-Dec-2009 FLEXCUBE V.CL Release 7.6 PBG SITERETRO,04-AUG-2009 CITIPBG TILL#434 Change for Composite rate code population start
FUNCTION fn_recalc_composite_rate
	(
	p_rate_code		IN	lftbs_contract_interest.rate_code%TYPE,
	p_branch		IN	VARCHAR2,
	p_ccy			IN	oltbs_contract_master.currency%TYPE,
	p_borrow_lend_ind	IN	lftbs_contract_interest.borrow_lend_ind%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--10-Dec-2009 FLEXCUBE V.CL Release 7.6 PBG SITERETRO,04-AUG-2009 CITIPBG TILL#434 Change for Composite rate code population end

--20-APR-2010 FLEXCUBE V.CL Release 7.6 ITR1 SFR#1 CITIPBG RETRO TILL#2055 Change start
FUNCTION FN_REBUILD_AMT_PAID
      (
       p_contract_ref_no 	IN oltbs_contract.contract_ref_no%type,
       p_component 		IN VARCHAR2,
       p_action_code 		IN VARCHAR2,
       p_error_code     	IN OUT VARCHAR2,
       p_error_param		IN OUT varchar2
       )
RETURN BOOLEAN;
--20-APR-2010 FLEXCUBE V.CL Release 7.6 ITR1 SFR#1 CITIPBG RETRO TILL#2055 Change end
--05-FEB-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 VOL1 FS Tag 08  changes STARTS
Function Fn_pop_escrow_amrt_schedule
(
	p_reference_no	IN	VARCHAR2,
	p_comp		IN	VARCHAR2,
	p_start_date	IN	DATE,
	p_end_date	IN	DATE,
	p_amend_date 	IN	DATE,
	p_current_version_no	IN oltbs_contract.latest_version_no%TYPE,
	p_current_event_seq_no	IN oltbs_contract.latest_event_seq_no%TYPE,
	p_err_code		IN OUT	VARCHAR2,
	p_err_param		IN OUT	VARCHAR2
)
RETURN BOOLEAN;
--05-FEB-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 VOL1 FS Tag 08  ends
g_auto_extension	VARCHAR2(1); -- 04-MAR-2014 CITIPBG TILL#5634 CHANGES

-- 08-OCT-2014 CITIPBG TILL#5664 CHANGES START

FUNCTION fn_explode_drawdowns (
                p_con_ref_no            IN              OLTB_DRAWDOWN_SCHEDULES.contract_Ref_no%TYPE,
                p_latest_version_no     IN              oltbs_contract.latest_version_no%TYPE,
                p_effective_date        IN              DATE ,
                p_product_TYPE		IN              oltms_product_master_ld.product_TYPE%TYPE , --FCC 3.9 Commitment related changes
                p_error_code            OUT             ertbs_msgs.err_code%TYPE
                )
RETURN BOOLEAN ;
-- DSBR Changes starts
FUNCTION Fn_Populate_Disbr_Schedules(p_Action             IN VARCHAR2,
                                       p_Reference_No       IN VARCHAR2,
                                       p_Version_No         IN NUMBER,
                                       p_Contract_Type      IN VARCHAR2,
                                       p_Maturity_Type      IN VARCHAR2,
                                       p_Component          IN VARCHAR2,
                                       p_Component_Type     IN VARCHAR2,
                                       p_Effective_Date     IN DATE,
                                       p_Value_Date         IN DATE,
                                       p_Maturity_Date      IN DATE,
                                       p_Currency_Amt_Due   IN VARCHAR2,
                                       p_Counterparty       IN VARCHAR2,
                                       p_Basis_Amount_Tag   IN VARCHAR2,
                                       p_Holiday_Ccy        IN VARCHAR2,
                                       p_Ignore_Holiday     IN VARCHAR2,
                                       p_Forward_Backward   IN VARCHAR2,
                                       p_Move_Across_Month  IN VARCHAR2,
                                       p_Cascade_Movement   IN VARCHAR2,
                                       p_Amount_Paid        IN OUT NUMBER,
                                       p_Holiday_Check      IN CHAR, --FCC 4.0 june 02 holiday cahcek
                                       p_Holiday_Chk_Failed OUT BOOLEAN,
                                       p_Error_Code         OUT VARCHAR2
				       --OBCL 14.4 Financial Centre based holiday treatment Changes - Starts
                                       ,p_Fc_List           IN VARCHAR2 DEFAULT NULL
				       --OBCL 14.4 Financial Centre based holiday treatment Changes - Ends
									   )
    RETURN BOOLEAN;
-- DSBR Changes ends
-- 08-OCT-2014 CITIPBG TILL#5664 CHANGES END
--OFCL 12.2 CHANGES START
g_neg_rate      OLTB_CONTRACT_ICCF_CALC.RATE%TYPE;
g_Err_Code_Rate_Code   ERTB_MSGS.ERR_CODE%TYPE;
--OFCL 12.2 CHANGES END
--OBCL_14.3_Moratorium Changes Starts
g_moradue_date Oltb_Amount_Due.Due_Date%Type;
g_Moraamt Oltb_Amount_Due.Amount_Due%Type;
g_action Varchar2(20);
g_Vamb_Esn Oltb_Contract_Event_log.Event_Seq_No%Type;
--OBCL_14.3_Moratorium Changes Ends

--OBCL_14.4_Payment_Delay Start
FUNCTION Fn_Payment_Delay_Days(p_Reference_No IN VARCHAR2,p_component IN VARCHAR2)
 RETURN NUMBER;
--OBCL_14.4_Payment_Delay END

  --OBCL_14.4_SOFR changes starts
  g_rfr_msg_id varchar2(100);
  FUNCTION Fn_Log_temp_amt_due(p_Ref           IN VARCHAR2,
                               p_Component     IN OLTBS_CONTRACT_ICCF_CALC.COMPONENT%TYPE,
                               p_Schedule_Date IN OLTBS_CONTRACT_ICCF_CALC.Schedule_Date%TYPE,
                               --ty_calc_Rec     IN Ty_Iccf_Calc,
                               p_Amt_rfr_due IN OLTBS_TEMP_RFR_AMNT_DUE%ROWTYPE,
                               p_msgid       IN OUT VARCHAR2) RETURN BOOLEAN ;

  FUNCTION Fn_update_temp_amt_due(p_Ref            IN VARCHAR2,
                               p_Component      IN OLTBS_CONTRACT_ICCF_CALC.COMPONENT%TYPE,
                               l_Effective_Date IN OLTBS_AMOUNT_DUE.DUE_Date%TYPE,
                               p_Effective_Date IN OLTBS_AMOUNT_DUE.DUE_Date%TYPE,
                               l_Intraday       IN VARCHAR2,
                               p_msgid          IN OUT VARCHAR2,
                               p_process_seq_no IN NUMBER,
                               p_action IN VARCHAR2,
                               p_Amt_rfr_due IN OLTBS_TEMP_RFR_AMNT_DUE%ROWTYPE,
                               p_type number) RETURN BOOLEAN;
  --OBCL_14.4_SOFR changes ends
  g_new_maturity_date date; --Bug#31523574
  g_update_amount_due_stp VARCHAR2(2);--OBCL_14.3_LS_SOFR_Bug#31756189
  
  -- Bug#34428174  Start
  FUNCTION Fn_Get_Total_Sch (p_Reference_No oltbs_contract_preference.contract_ref_no%TYPE,
							   p_mat_date	  oltbs_contract_master.maturity_date%Type,
							   p_number_of_drvd_sch IN OUT	NUMBER,
                               p_error_code out varchar2)
    RETURN BOOLEAN;
    
  FUNCTION Fn_update_default_sch_start_date(p_Reference_No OLTBS_CONTRACT.CONTRACT_REF_NO%Type,
											   p_Error_Code OUT VARCHAR2)
                                            RETURN BOOLEAN;
  -- Bug#34428174  End
  
end olpks_schedules;
/
create or replace synonym olpkss_schedules for olpks_schedules
/
