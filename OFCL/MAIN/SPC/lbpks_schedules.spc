CREATE OR REPLACE PACKAGE lbpks_schedules
IS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lbpks_schedules.SPC
**
** Module		: LS
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
---06-JAN-2006---Flexcube V.CL Release 7.0 Schedules Related Changes by Yogesh----START----------
Modified the function fn_explode_reduction_sch ---> This function will explode the reduction schedule based on the given definition. Vdbal master will be updated.

Add following functions

fn_rebuild_reduction_sch --> This function will rebuild the reduction schedule when an expiry or cancellation happens. Vdbal master will be updated.
The event('EXPY','CANC') will be fired for the participants.
In case of batch processing, if the tranche is normal and non-revolving, and if the schedule_definition flag is set to automatic, 
fn_build_repayment_sch will be called to redefine the repayment schedules of all drawdowns under the tranche. if the function return 
false or if the schedule definition flag is set to manual or if future schedules have been settled or marked for netting, then
message will be given asking user to define the schedules manually. Else fn_auth_sch will be called to authorize the related drawdowns
and participants.

fn_event_processing --> This function will fire the events 'EXPY', 'CANC' and 'RSCH'.
fn_auth_sch --> This function will authorize the related drawdowns, participants and update the schedule_definition flag to 'A' for the drawdowns.
fn_build_repayment_sch --> This function will call fn_populate_repayment_sch to build the repayment schedule and fn_process_borrower
to do the borrower related processing. In case of new drawdown, fn_create_manual_schedules will be called to default the interest and
revision schedules. If the reference number being passed to the function is that of a tranche, then participant related processing is also taken care of.
fn_populate_repayment_sch --> This function will populate the repayment schedule when there is a change in the reduction schedule
or when a new drawdown is input. Vdbal master and detail will be updated accordingly.
fn_process_borrower--> This function will fire 'RSCH', calculate the interest and update the propagation master for the specified borrower.
fn_validate_reduction_sch --> This function will validate the reduction schedule by camparing the outstanding amount and available amount.
fn_delete_sch --> This function will rollback the tranche and affected drawdowns and their participants and self participants to their previous state.
fn_rollback_event --> This function will rollback the events 'EXPY', 'CANC', 'CAMD' and 'RSCH'. 

---06-JAN-2006---Flexcube V.CL Release 7.0 Schedules Related Changes by Yogesh----END----------
11-JAN-2006 Flexcube V.CL Release 7.0 Holiday Treatment Related Changes By Aji 
		1) Added the overloaded function fn_get_final_schedule_date.
		2) Added function fn_explode_Redn_sch - To create Commitment Reduction Schedule.
   		   Holiday processing for Reduction Schedule will be done only when 
		   Ldtb_Contract_Preferences.move_comm_redn_sch = 'Y'.
		3) Added function fn_explode_disburse_sch - To create Loan Disburse schedule.
  		   Holiday processing for Reduction Schedule will be done only when 
			Ldtb_Contract_Preferences.move_disburse_sch = 'Y'.
		4) Modified fn_populate_revisions function to include p_move_revision_sch parameter.
			p_move_revision_sch will be defaulted from oltbs_contract_preference.MOVE_REVISION_SCH.
			Holiday Processing for Revision Schedule will be done only when p_move_revision_sch = 'Y'.
		5) Modified fn_populate_amount_due to include p_move_payment_sch parameter.
			p_move_payment_sch will be defaulted from oltbs_contract_preference.MOVE_payment_SCH.
			Holiday Processing for Revision Schedule will be done only when p_move_payment_sch = 'Y'.
19-JAN-2006	Flexcube V.CL Release 7.0 Interest Changes 19012006
19-JAN-2006	Flexcube V.CL Release 7.0 Interest Changes 23012006
24-JAN-2006	Flexcube V.CL Release 7.0 Interest Changes 24012006
30-JAN-2006	Flexcube V.CL Release 7.0 Schedules Related Changes
		Added fn_redn_sch_on_rev, fn_rebuild_schedule_on_VAMI
28-FEB-2006	Flexcube V.CL Release 7.0 Schedules Related Changes Added New Function FN_AUTO_REDUCTION by Vicks
18-APR-2006 Flexcube V.CL Release 7.0 Prepayment Related Changes by Vicks
20-APR-2006	Flexcube V.CL Release 7.0 Prepayment Related Changes by Vicks 
		Added 2 new functions for redefination of schedules
		1)	FN_REDF_TRANCHE_SCH
		2)	FN_REDF_REPAY_SCH
20-Apr-2006	FLEXCUBE V.CL Release 7.0 Margin Changes by Nirupama
		Commented a function Fn_get_final_rates 		
26-MAY-2006	FLEXCUBE V.CL RELEASE 7.0 LOT2 SFR#48 FIX, Added a new function fn_component_type.							
1-AUG-2006	FLEXCUBE V.CL RELEASE 7.1 FLEXCUBE V.CL RELEASE 7.1  Changes by sachin for Rounding Basis Added a Default parameter p_cust_no in 
		function fn_fetch_floating_rates_new.
12-JAN-2007	Flexcube V.CL Release 7.2 reduction schedules changes by sachin added the function specifications for Fn_pop_redn_paid,
		Fn_redn_acc_entry, fn_call_pop_redn_sch.
03-Sep-2007 FCC V.CL Release 7.3 Term Revolver Changes, included functions fn_redef_schedule, fn_redef_vami, fn_process_tranch_repayment		
		commented function Fn_tranche_sch
08-JAN-2008 FLEXCUBE V.CL Release 7.4 RT # 17 Changes-added a  routine fn_outflow_add_sgen_detail
					to update PAY_MSG_DATE,RECV_MSG_DATE,RNTC_MSG_DATE IN lbtbs_outflow_amount_due.		
04-JUN-2009 CITIUS-LS#SRT5764 Missing Retro from CITIUS to BLORE					
			1]	08-APR-2009 CITIUS-LS#5611 Agency:  Rounding basis enhancement (Interest rate in DD) should be available for LIBOR's also(Libor product - User input
26-AUG-2009 CITIUS-LS#6235, Clearpar and SLT incremental changes retro - changed the copyright clause.
10-JAN-2012 FLEXCUBE V.CL Release 7.10 VOL1 FS Tag 04 Tranche Repayment Schedules and Non-prorata VAMI changes
30-JUL-2012 Flexcube V.CL Release 7.11 Retro CITIBLR#35095 Changes, Population of unscheduled repayment screen to be moved in the batch
05-FEB-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 VOL1 FS Tag 08 CHANGES ADDED
  Changed By    		: Palanisamy Muthukumar
  Change Description  	: MONTH_END_IND FOR LS DEC-2019 CHANGES
  Search String 		: MONTH_END_IND FOR LS DEC-2019 CHANGES
  
  Changed By         : Palanisamy M
  Date               : 19-FEB-2020
  Change Description : OBCL 14.4 Financial Centre based holiday treatment Changes for LS
  Search String      : OBCL 14.4 Financial Centre based holiday treatment Changes for LS	 

  Changed By         : Sowmya B
  Date               : 20-JUNE-2020
  Change Description : OBCL_14.4_Payment_Delay Changes for LS
  Search String      : OBCL_14.4_Payment_Delay
  
  Changed By         : Kaushik A S/Ramya M
  Changed On         : 30-Jul-2020
  Search String      : OBCL_14.5_Discounted_Schedule_Changes
  Change Reason      : OBCL_14.5_Discounted_Schedule_Changes  
  
  Changed By         : Janki Kholiya
  Changed On         : 29-Dec-2020
  Search String      : Bug#33711520 
  Change Reason      : EOD is taking longer time to run, stuck at the cursor query.

Changed By         : Anusha K
  Changed On         : 14-apr-2023
  Search String      : OBCL_14.6_RABO#35278193 CHANGES
  Change Reason      : Added globalvariable
  
  **Changed By         : Sowmya Bitra
  **Date               : 22-April-2023
  **Change Description : ECA Support for BADJ during VAMI
  **Search String      : OBCL_14.8_ECA_Changes
  
  **Changed By         : Arunprasath
  **Date               : 05-Feb-2024
  **Change Description : Added new Function Fn_Redf_Repay_Sch_pmt
  **Search String      : Bug#36249899
  
  **Changed By         : Sudharshini Balaji
  **Changed On         : 27-MAR-2024
  **Change Description : 1.Added new function to derive the effective date for the CAMD action.
  **Search String      : Bug#36415149 CHANGES

----------------------------------------------------------------------------------------------------------------------
*/

TYPE ty_counts is TABLE OF NUMBER
	INDEX BY BINARY_INTEGER;

G_EVN_CODE OLTB_CONTRACT_EVENT_LOG.EVENT_CODE%TYPE;--OBCL_14.6_RABO#35278193 CHANGES

TYPE tbl_redn_sch IS table of lbtbs_tranche_redn_sch%ROWTYPE
	index by BINARY_INTEGER;
-- 11-JAN-2006 Flexcube V.CL Release 7.0 Holiday Treatment Related Changes By Aji Starts Here
TYPE type_sch_date_rec IS RECORD (original_schedule_date DATE, schedule_date DATE, rate_fixing_date Date);

TYPE type_schedule_date_table IS TABLE OF type_sch_date_rec INDEX BY BINARY_INTEGER;
--11-JAN-2006 Flexcube V.CL Release 7.0 Holiday Treatment Related Changes By Aji Ends Here
--05-FEB-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 VOL1 FS Tag 08 changes starts
TYPE p_schedule IS TABLE OF oltbs_contract_schedules%ROWTYPE INDEX BY BINARY_INTEGER;
l_tab_schedules p_schedule;
--05-FEB-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 VOL1 FS Tag 08 changes ends

--start: Bug#33711520
TYPE type_c_amt_due IS RECORD(schedule_date DATE, amt_due oltb_contract_iccf_calc.CALCULATED_AMOUNT%TYPE);
TYPE type_coll_amt_due is table of type_c_amt_due;
l_coll_amt_due type_coll_amt_due;
--end: Bug#33711520

g_int_refund_req_yn varchar2(1);--obcl_14.5_ls_discounted_schedules changes
g_risk_part_cancel varchar2(1); --OBCL_14.5_Risk_Comp 
g_badj_eca_simulate varchar2(1) := 'N'; --OBCL_14.8_ECA_Changes
function fn_create_schedules
		(
		p_action 			IN 	varchar2,
		p_reference_no 		IN 	varchar2,
		p_latest_version_no 	IN 	number,
		p_contract_type 		IN		varchar2,
		p_effective_date 		IN 	date,
		p_vamb_esn			IN		oltbs_contract_event_log.event_seq_no%TYPE,
		-- 11-JAN-2006 Flexcube V.CL Release 7.0 Holiday Treatment Related Changes By Aji Starts here
		p_move_payment_sch      IN      VARCHAR2,    	-- FCC55-IMF-LD
		p_move_revision_sch     IN      VARCHAR2,    	-- FCC55-IMF-LD
		p_move_comm_redn_sch    IN      VARCHAR2,    	-- FCC55-IMF-LD
		--11-JAN-2006 Flexcube V.CL Release 7.0 Holiday Treatment Related Changes By Aji Ends here
		p_holiday_chk_failed	OUT	boolean,
		p_error_code		OUT 	varchar2,
		p_fdate  IN Date default to_date('31/12/2033','DD/MM/RRRR'),
		p_mdate  IN Date default to_date('31/12/2033','DD/MM/RRRR'),
		p_chg_future_amt_sch	IN 	varchar2,		
		p_chg_future_rvn_sch	IN 	varchar2		
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
		--p_fdate  IN Date default '31/12/2033', 
		--p_mdate  IN Date default '31/12/2033'  
		p_fdate  IN Date default to_date('31/12/2033','DD/MM/RRRR'),
		p_mdate  IN Date default to_date('31/12/2033','DD/MM/RRRR')
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
		--p_fdate  IN Date default '31/12/2033', 
		--p_mdate  IN Date default '31/12/2033'  
		p_fdate  IN Date default to_date('31/12/2033','DD/MM/RRRR'),
		p_mdate  IN Date default to_date('31/12/2033','DD/MM/RRRR')
		) return boolean;

function fn_new_redef
		(
		p_action IN Varchar2,
		p_reference_no IN Varchar2,
		p_maturity_type IN Varchar2,
		p_payment_method IN oltbs_contract_master.payment_method%Type,
		p_component IN Varchar2,
		p_effective_date IN Date,
		p_ty_comp_hoff IN olpkss_schedules.TY_COMP_HOFF,
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
			p_error_code OUT VARCHAR2
--OBCL 14.4 Financial Centre based holiday treatment Changes for LS Start
                                      ,P_SCH_FC_LIST        IN VARCHAR2 DEFAULT NULL
--OBCL 14.4 Financial Centre based holiday treatment Changes for LS End

			) return boolean;

function fn_split_schedules
			(
			p_reference_no IN Varchar2,
			p_version_no IN Number,
			p_effective_date IN Date,
			p_error_code OUT Varchar2
			) return boolean;

function fn_split_schedules
			(
			p_reference_no IN Varchar2,
			p_version_no IN Number,
			p_effective_date IN Date,
			p_fdate IN Date,
			p_mdate IN Date,
			p_error_code OUT Varchar2
			) return boolean;

/*function fn_populate_handoff
			(
			p_reference_no IN Varchar2,
			p_component IN Varchar2,
			p_from_date IN Date,
			p_branch_date IN Date,
			p_error_code OUT Varchar2
			) return boolean;
*/ --dutb

/* function fn_fetch_floating_rates
			(
			p_branch IN Varchar2,
			p_from_date IN Date,
			p_to_date IN Date,
			p_currency IN Varchar2,
			p_rate_code IN Varchar2,
			p_basis_amount IN Number,
			p_ty_rate IN OUT olpkss_schedules.TY_RATE
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
			p_ty_rate IN OUT olpkss_schedules.TY_RATE,
			p_cust_no IN oltms_customer.customer_no%TYPE Default NULL)--FLEXCUBE V.CL RELEASE 7.1 Changes by sachin for Rounding
return boolean;

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
			p_error_code OUT VARCHAR2
--OBCL 14.4 Financial Centre based holiday treatment Changes for LS Start
       ,P_SCH_FC_LIST        IN VARCHAR2 DEFAULT NULL
--OBCL 14.4 Financial Centre based holiday treatment Changes for LS End      
			) return boolean;

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

/*function	fn_get_rates_for_period
			(
			p_branch IN Varchar2,
			p_contract_ref_no IN oltbs_contract.contract_ref_no%type,
			p_component IN oltbs_contract_iccf_calc.component%type,
			p_from_date IN Date,
			p_to_date IN Date,

			-- PHPCBC 5/3/99 Changed to IN OUT to handle Int on Int
			p_rates IN OUT olpkss_schedules.ty_rate,
			-- PHPCBC 12/3/99 : Get Rates for Subcomponents with Penalty Interest
			p_penalty_rate IN NUMBER := 0,
		-- PHPCBC 14/3/99 : Flag to Indicate Effective (Derived) or Actual (As per ICCF)
			p_eff_rate IN Boolean := TRUE
			) Return Boolean;*/ --dutb

function	fn_derive_rates	--- PHPCBC 5/3/99 New function to handle Int on Int
			(
			p_base_rate IN olpkss_schedules.ty_rate,
			p_dependant_rate IN olpkss_schedules.ty_rate,
			p_derived_rate IN OUT olpkss_schedules.ty_rate
			) Return Boolean;


function	fn_get_leap_dates
			(
			p_from_date IN DATE,
			p_to_date IN DATE,
			p_date_tab IN OUT olpkss_schedules.TY_SCHEDULE_DATE
			) Return Boolean;

function fn_populate_revisions
			(
			p_reference_no IN Varchar2,
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
			p_holiday_check   IN Char,
			p_error_code OUT Varchar2,
			p_fdate    IN DATE DEFAULT TO_DATE('31/12/2100','DD/MM/YYYY'), 
			p_mdate    IN DATE DEFAULT TO_DATE('31/12/2100','DD/MM/YYYY'),
			p_move_revision_sch IN Varchar2 -- 11-JAN-2006 Flexcube V.CL Release 7.0 Holiday Treatment Related Changes By Aji 	
--OBCL 14.4 Financial Centre based holiday treatment Changes for LS Start
                                      ,P_SCH_FC_LIST        IN VARCHAR2 DEFAULT NULL
--OBCL 14.4 Financial Centre based holiday treatment Changes for LS End
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
			p_holiday_check	IN Char,
			p_holiday_chk_failed OUT boolean,
			p_error_code OUT Varchar2,
			p_move_payment_sch IN Varchar2 -- 11-JAN-2006 Flexcube V.CL Release 7.0 Holiday Treatment Related Changes By Aji 
--OBCL 14.4 Financial Centre based holiday treatment Changes for LS Start
                                      ,P_SCH_FC_LIST        IN VARCHAR2 DEFAULT NULL
--OBCL 14.4 Financial Centre based holiday treatment Changes for LS End
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
			p_ty_amt_paid IN OUT olpkss_schedules.TY_AMT_PAID
			) return boolean;

function fn_merge_dates
			(
			p_reference_no IN Varchar2,
			p_component IN Varchar2,
			p_flat_component IN Boolean,
			p_effective_date IN Date,
			p_ty_comp_hoff OUT olpkss_schedules.TY_COMP_HOFF
			) return boolean;

--FLEXCUBE V.CL Release 7.0 Margin Changes by Aarthi start
--FLEXCUBE V.CL Release 7.0 Margin Changes by Nirupama start
/*FUNCTION Fn_get_final_rates
			(p_contract_ref_no	IN	VARCHAR2,
			 p_component		IN	VARCHAR2,
			 p_from_date		IN	DATE,
			 p_to_date			IN	DATE,
			 p_rates			IN OUT olpkss_schedules.ty_rate)
RETURN BOOLEAN;*/
--FLEXCUBE V.CL Release 7.0 Margin Changes by Nirupama end
--FLEXCUBE V.CL Release 7.0 Margin Changes by Aarthi end

--MONTH_END_IND FOR LS DEC-2019 CHANGES START
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
			p_ty_schedule_date in out olpkss_schedules.TY_SCHEDULE_DATE,
			p_holiday_check   in  char,
			p_holiday_chk_failed OUT boolean,
			p_error_code OUT Varchar2,
			p_facility_ccy   in Varchar2  := '', --FCC 4.2 Apr 2003 LS changes
			p_contract_ccy   in Varchar2  := '', --FCC 4.2 Apr 2003 LS changes
			p_local_ccy   in Varchar2  := '' --FCC 4.2 Apr 2003 LS changes
			,p_intraday	in varchar2  :='N'  --FCC 4.6.2 JUL 2005 CITILS LS77 changes
			, p_consider_branch_holiday IN VARCHAR2 -- :='N'	-- 11-JAN-2006 Flexcube V.CL Release 7.0 Holiday Treatment Related Changes By Aji 
			, p_payment_method	oltbs_contract_master.payment_method%TYPE := 'N'---04-MAR-2006---Flexcube V.CL Release 7.0 Schedules Related Changes by Yogesh
--OBCL 14.4 Financial Centre based holiday treatment Changes for LS Start
                                      ,P_SCH_FC_LIST        IN VARCHAR2 DEFAULT NULL
--OBCL 14.4 Financial Centre based holiday treatment Changes for LS End
            ,p_pay_by_days     IN NUMBER DEFAULT 0 --OBCL_14.4_Payment_Delay
			) return boolean;
--MONTH_END_IND FOR LS DEC-2019 CHANGES END

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
			, p_consider_branch_holiday IN VARCHAR2 	-- 11-JAN-2006 Flexcube V.CL Release 7.0 Holiday Treatment Related Changes By Aji 
--OBCL 14.4 Financial Centre based holiday treatment Changes for LS Start
                                      ,P_SCH_FC_LIST        IN VARCHAR DEFAULT NULL
--OBCL 14.4 Financial Centre based holiday treatment Changes for LS End   
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
			p_ty_schedule_date in out olpkss_schedules.TY_SCHEDULE_DATE,
			p_holiday_check   in  char,
			p_holiday_chk_failed OUT boolean,
			p_error_code OUT Varchar2,
			p_facility_ccy   in Varchar2  := '', 
			p_contract_ccy   in Varchar2  := '', 
			p_local_ccy   in Varchar2  := '' 
			,p_intraday	in varchar2  :='N' 
			, p_consider_branch_holiday IN VARCHAR2 	-- 11-JAN-2006 Flexcube V.CL Release 7.0 Holiday Treatment Related Changes By Aji 
			) return boolean;
--FCC 4.6.2 CITIDEV LS CHANGES --NIRUPAMA ENDS
--03-Sep-2007, FCC V.CL Release 7.3 Term Revolver Changes, starts
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
--03-Sep-2007, FCC V.CL Release 7.3 Term Revolver Changes, ends

---15-DEC-2005---Flexcube V.CL Release 7.0 Schedules Related Changes by Yogesh--start----------------------------
FUNCTION fn_validate_reduction_sch
			(
			 p_tranche_ref_no	IN	VARCHAR2,
			 p_date			IN	DATE,
			 p_error_code		OUT	VARCHAR2
			)
RETURN BOOLEAN;

FUNCTION fn_event_processing(
				    p_contract_ref_no	IN	VARCHAR2,
				    p_new_version		IN	VARCHAR2,
				    p_action 		IN	VARCHAR2,
				    p_event_code		IN	VARCHAR2,
				    p_date			IN	DATE,
				    p_auth_status		IN	VARCHAR2,
				    p_latest_version	OUT 	NUMBER,
				    p_latest_esn		OUT	NUMBER,
				    p_error_code		OUT	VARCHAR2
				    )
RETURN BOOLEAN;


FUNCTION fn_auth_sch
			(p_contract_ref_no	IN	VARCHAR2,
			 p_event		IN 	VARCHAR2,
			 p_error_code		OUT	VARCHAR2)
RETURN BOOLEAN;
---15-DEC-2005----Flexcube V.CL Release 7.0 Schedules Related Changes by Yogesh--end----------------------------

---19-DEC-2005-----Flexcube V.CL Release 7.0 Schedules Related Changes by Yogesh --start----------------------------
FUNCTION fn_build_repayment_sch(
				p_transaction_ref_no	IN	oltbs_contract.contract_ref_no%type,
				p_contract_type		IN	VARCHAR2,
				p_value_date		IN	DATE,
				p_process		IN	VARCHAR2,
				p_error_code		OUT 	VARCHAR2,
				p_error_param		OUT	VARCHAR2,
			  	p_dd_ref_no		IN	oltbs_contract.contract_ref_no%type default 'xyz',-- 18-Apr-2006 Flexcube V.CL Release 7.0 Prepayment Related Changes by Vicks
			  	p_prepay_flag		IN	VARCHAR2 default 'N'-- 18-Apr-2006 Flexcube V.CL Release 7.0 Prepayment Related Changes by Vicks
				)
RETURN BOOLEAN;
---19-DEC-2005----Flexcube V.CL Release 7.0 Schedules Related Changes by Yogesh---end----------------------------

----------Flexcube V.CL Release 7.0 Schedules Related Changes by Yogesh --start----------------------------
FUNCTION fn_create_manual_schedules(
				p_action                IN  	VARCHAR2,
				p_reference_no 	        IN  	VARCHAR2,
				p_latest_version_no     IN  	NUMBER,
				p_contract_type         IN  	VARCHAR2,
				p_effective_date        IN  	DATE,
				p_holiday_chk_failed	OUT	BOOLEAN,
				p_error_code		OUT 	VARCHAR2
				)
RETURN BOOLEAN;

FUNCTION fn_delete_sch
				(p_contract_ref_no	IN	oltbs_contract.contract_ref_no%type,
				 p_event		IN 	VARCHAR2,
				 p_error_code		OUT	VARCHAR2
				)
RETURN BOOLEAN;

FUNCTION fn_rollback_event
				(p_contract_ref_no	IN	oltbs_contract.contract_ref_no%type,
				 p_event		IN 	VARCHAR2,
				 p_product_type		IN	VARCHAR2,
				 p_error_code		OUT	VARCHAR2
				)
RETURN BOOLEAN;

FUNCTION fn_rebuild_reduction_sch
			(
			 p_tranche_ref_no	IN	VARCHAR2,
			 p_date	    		IN 	DATE,
			 p_amount   		IN	lbtbs_tranche_redn_sch.AVAILABLE_AMOUNT%TYPE,
			 p_event  		IN	VARCHAR2,
			 p_action		IN	VARCHAR2,
			 p_process		IN	VARCHAR2,
			 p_error_code  		OUT	VARCHAR2,
			 p_error_param		OUT	VARCHAR2
			)
RETURN BOOLEAN;

/*
FUNCTION fn_insert_int_fix(p_drawdown_ref_no	IN	oltbs_contract.contract_ref_no%type,
	                   p_component		IN 	lbtbs_borrower_drawdown_comp.component%type,
			   p_end_period		IN	DATE,
			   p_error_code		OUT	VARCHAR2
			 )
RETURN BOOLEAN;

FUNCTION fn_populate_due_freq
				(p_drawdown_ref_no	IN 	oltbs_contract.contract_ref_no%type,
			 	 p_component		IN	lbtbs_borrower_drawdown_comp.component%type,
			 	 l_freq			IN	lbtbs_borrower_drawdown_comp.DEFAULT_INT_REPAY_FREQ%type,
			 	 l_units			IN	lbtbs_borrower_drawdown_comp.DEFAULT_INT_REPAY_UNIT%type,
			 	 p_error_code		OUT	VARCHAR2,
		       	 p_error_param		OUT	VARCHAR2)
RETURN BOOLEAN;*/

/*FUNCTION Fn_process_drawdown_part
			(p_tranche_ref_no	IN	oltbs_contract.contract_ref_no%type,
			 p_drawdown_ref_no	IN	oltbs_contract.contract_ref_no%type,
			 p_value_date		IN	DATE,
			 p_error_code		OUT 	VARCHAR2,
			 p_error_param		OUT	VARCHAR2
			)
RETURN BOOLEAN;
*/
----------Flexcube V.CL Release 7.0 Schedules Related Changes by Yogesh---end----------------------------

---20-DEC-2005--Flexcube V.CL Release 7.0 Schedules Related Changes by Yogesh---start---------------------------------
FUNCTION fn_populate_repayment_schedule
				(
				p_drawdown_ref_no 	IN 	oltbs_contract.contract_ref_no%type,
				p_redn_schedule		IN	tbl_redn_sch,
				p_tranche_ref_no	IN	oltbs_contract.contract_ref_no%type,
				p_value_date		IN	DATE,
				p_error_code		OUT	VARCHAR2,
				p_error_param		OUT	VARCHAR2
				)
RETURN BOOLEAN;

FUNCTION Fn_process_borrower(
		 p_contract_ref_no	IN	VARCHAR2,
		 p_date			IN 	DATE,
		 p_new_dd_indicator	IN	VARCHAR2, -- 'Y' for new drawdown else 'N'
		 p_auth_stat		IN	VARCHAR2,
		 p_event			IN	VARCHAR2, -- 'N' for new and 'U' for undo
		 p_error_code		OUT	VARCHAR2
		)
RETURN BOOLEAN;



---20-DEC-2005---Flexcube V.CL Release 7.0 Schedules Related Changes by Yogesh---end---------------------------------

--11-JAN-2006 Flexcube V.CL Release 7.0 Holiday Treatment Related Changes By Aji Starts Here
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
			p_holiday_chk_failed OUT boolean,
			p_error_code out Varchar2,
			p_branch_holiday in VARCHAR2	
--OBCL 14.4 Financial Centre based holiday treatment Changes for LS Start
                                      ,P_SCH_FC_LIST        IN VARCHAR2 DEFAULT NULL
--OBCL 14.4 Financial Centre based holiday treatment Changes for LS End
			) return boolean;

function fn_explode_redn_sch
					(p_con_ref_no		IN	oltbs_contract.CONTRACT_REF_NO%TYPE,
					p_latest_version_no	IN	oltbs_contract.LATEST_VERSION_NO%TYPE,
					p_effective_date	IN	DATE,
	        			p_move_comm_redn_sch	IN	oltbs_contract_preference.MOVE_COMM_REDN_SCH%type,
					p_error_code		OUT	ertbs_msgs.ERR_CODE%TYPE
		)
RETURN BOOLEAN;
/*
function fn_explode_disburse_sch
				(p_con_ref_no		IN	oltbs_contract.CONTRACT_REF_NO%TYPE,
				 p_latest_version_no	IN	oltbs_contract.LATEST_VERSION_NO%TYPE,
				 p_effective_date	IN	DATE,
			       p_move_disburse_sch	IN	oltbs_contract_preference.MOVE_DISBURSE_SCH%type,
				 p_error_code		OUT	ertbs_msgs.ERR_CODE%TYPE
				 )
RETURN BOOLEAN;
*/
--11-JAN-2006 Flexcube V.CL Release 7.0 Holiday Treatment Related Changes By Aji Ends Here

--Flexcube V.CL Release 7.0 Interest Changes 19012006 ST
FUNCTION fn_pick_float_rate
         	(
					p_branch 			     IN 	   VARCHAR2,
         				p_contract_refno   IN      VARCHAR2,
					p_from_dt 		     IN 	   DATE,
					p_to_dt 			     IN OUT  DATE,
					p_currency 			   IN 	   VARCHAR2,
					p_rate_code 		   IN 	   VARCHAR2,
					p_basis_amt 		   IN 	   NUMBER,
					p_borrow_lend_ind  IN 	   VARCHAR2,
					p_tenor_and_unit   IN	OUT  VARCHAR2,
					p_rate_calc_type	 IN 	   VARCHAR2,
					p_int_rate	       IN OUT  NUMBER,
					p_err              IN OUT  VARCHAR2
					)
   RETURN BOOLEAN;
   FUNCTION fn_get_float_rates
          (
					p_branch 			       IN 	VARCHAR2,
          				p_contract_refno     IN   VARCHAR2,
					p_from_dt 		       IN 	DATE,
					p_to_dt 			       IN 	DATE,      
					p_currency 			     IN 	VARCHAR2,
					p_rate_code 		     IN 	VARCHAR2,
					p_basis_amt 	       IN 	NUMBER,
					p_borrow_lend_ind 	 IN 	VARCHAR2,
					p_tenor_and_unit		 IN   OUT	VARCHAR2,
          p_tenor              IN   OUT NUMBER,
          p_rate_calc_type	   IN 	VARCHAR2,
				  p_int_rate 			     IN   OUT NUMBER,
          p_err                IN   OUT VARCHAR2
					)
  RETURN BOOLEAN;
  
FUNCTION fn_insert_int_fix
				(p_drawdown_ref_no	IN oltbs_contract.contract_ref_no%TYPE,
				 p_component		IN lbtbs_borrower_drawdown_comp.component%type,
			   	 p_end_period		IN DATE,
			   	 p_error_code		OUT VARCHAR2
				)
RETURN BOOLEAN;
  --Flexcube V.CL Release 7.0 Interest Changes 19012006 ed
  --Flexcube V.CL Release 7.0 Interest Changes 23012006 start
FUNCTION FN_REBUILD_PARTICIPANT_INT_SCH(p_borrower_ref_no    IN lptbs_contract_master.borrower_contract_ref_no%type,
 					p_participant_ref_no 		IN lptbs_contract_master.contract_ref_no%type,
					p_counterparty	     		IN	lptbs_contract_master.counterparty%type,
					p_component	     			IN lbtbs_propagation_master.component%type,
					p_start_date	     IN lbtbs_propagation_master.propagate_schd_start_date%type,
					p_err_code	    OUT Varchar2,
					p_err_param	    OUT Varchar2)
RETURN BOOLEAN;
/*FUNCTION FN_PROPAGATE_INTEREST_PART(p_br_tranche_ref_no  IN lptbs_contract_master.borrower_tranche_ref_no%type,
				    p_borrower_ref_no    IN lptbs_contract_master.borrower_contract_ref_no%type,
           			    p_participant_ref_no IN lptbs_contract_master.contract_ref_no%type,
				    p_counterparty	 IN	lptbs_contract_master.counterparty%type,
	                      p_err_code		OUT Varchar2,
				    p_err_param		OUT Varchar2)
RETURN BOOLEAN ;*/ --Flexcube V.CL Release 7.0 Interest Changes 24012006 CHANGES END
--Flexcube V.CL Release 7.0 Interest Changes 23012006 ed 

--------Flexcube V.CL Release 7.0 Schedules Related Changes by Yogesh------START---------
FUNCTION fn_redn_sch_on_rev
			(
			 p_tranche_ref_no	IN	VARCHAR2,
			 p_date	    		IN 	DATE,
			 p_amount   		IN	lbtbs_tranche_redn_sch.AVAILABLE_AMOUNT%TYPE,
			 p_event  		IN	VARCHAR2,
			 p_action		IN	VARCHAR2,
			 p_process		IN	VARCHAR2,
			 p_error_code  		OUT	VARCHAR2,
			 p_error_param		OUT	VARCHAR2
			)
RETURN BOOLEAN;

FUNCTION fn_rebuild_schedule_on_VAMI
						(p_reference_no   IN oltbs_contract.contract_ref_no%TYPE
						,p_vamb_esn       IN oltbs_contract_event_log.event_seq_no%TYPE
						,p_vami_esn       IN oltbs_contract_event_log.event_seq_no%TYPE
						,p_vami_version   IN NUMBER
						,p_contract_type  IN VARCHAR2
						,p_err_codes      IN OUT VARCHAR2
						,P_err_params     IN OUT VARCHAR2)
RETURN BOOLEAN;
--------Flexcube V.CL Release 7.0 Schedules Related Changes by Yogesh------END---------

---21-FEB-2005----Flexcube V.CL Release 7.0 Schedules Related Changes by Yogesh------START---------
	
FUNCTION fn_delete_redn_Sch(p_reference_no   IN oltbs_contract.contract_ref_no%TYPE)
RETURN BOOLEAN;

---21-FEB-2005----Flexcube V.CL Release 7.0 Schedules Related Changes by Yogesh------END---------
--Flexcube V.CL Release 7.0 Schedules Related Changes by Vicks Start
FUNCTION Fn_auto_reduction
		(
			p_branch	IN	VARCHAR2,
			p_date		IN	DATE,
			p_com_freq	IN	NUMBER,
		 	p_error_code	OUT	VARCHAR2,
			p_error_param	OUT	VARCHAR2
		)
RETURN BOOLEAN;
--Flexcube V.CL Release 7.0 Schedules Related Changes by Vicks End

-- 20-APR-2006	Flexcube V.CL Release 7.0 Prepayment Related Changes by Vicks Start
FUNCTION FN_REDF_TRANCHE_SCH(
					p_contract_ref_no		IN		VARCHAR2,
					p_latest_version_no	IN		VARCHAR2,
					p_prepay_date		IN		DATE,
					p_fdate			IN		DATE,
					p_mdate			IN		DATE,
					p_err_code			IN OUT	VARCHAR2,
					p_err_param			IN OUT	VARCHAR2)
RETURN BOOLEAN;
--
FUNCTION FN_REDF_REPAY_SCH(
					p_contract_ref_no		IN		VARCHAR2,
					p_latest_version_no	IN		VARCHAR2,
					p_prepay_date		IN		DATE,
					p_fdate			IN		DATE,
					p_mdate			IN		DATE,
					p_err_code			IN OUT	VARCHAR2,
					p_err_param			IN OUT	VARCHAR2)
RETURN BOOLEAN;
-- 20-APR-2006	Flexcube V.CL Release 7.0 Prepayment Related Changes by Vicks End

--FLEXCUBE V.CL RELEASE 7.0 LOT2 SFR#48 Fix
FUNCTION fn_component_type( p_product IN VARCHAR2,
			    p_component IN VARCHAR2 ) 
RETURN VARCHAR2;

--Flexcube V.CL Release 7.2 reduction schedules changes by sachin  st
FUNCTION Fn_pop_redn_paid
		(
			p_contract_ref_no	IN	VARCHAR2,
			pesn			IN	NUMBER,
			p_date			IN	DATE,
			p_amount        	IN  NUMBER default NULL,
			p_error_code		OUT	VARCHAR2,
			p_error_param		OUT	VARCHAR2
      
		)
RETURN BOOLEAN;

FUNCTION Fn_redn_acc_entry
		(
			p_contract_ref_no		IN	VARCHAR2,
			p_date			IN	DATE,
			p_error_code		OUT	VARCHAR2,
			p_error_param		OUT	VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION fn_call_pop_redn_sch(
		p_dd_ref_no 	IN	oltbs_contract.contract_ref_no%type,
		p_dd_esn 		IN oltbs_contract.latest_event_seq_no%type,
		p_date		IN DATE,
		pErrorCode	IN OUT varchar2,
		perrorparam	IN OUT varchar2
    )
RETURN BOOLEAN ;

--Flexcube V.CL Release 7.2 reduction schedules changes by sachin  ed
--03-Sep-2007, FCC V.CL Release 7.3 Term Revolver Changes, starts
FUNCTION fn_redef_schedule
			(p_tranche_ref_no	IN	VARCHAR2,
			 p_date			IN	DATE,
			 p_amount		IN	NUMBER,
			 p_redef_method		IN	VARCHAR2,
			 p_err_code		OUT	VARCHAR2,
			 p_err_param		OUT	VARCHAR2
			)
RETURN BOOLEAN;

FUNCTION fn_redef_vami
		(p_tranche_ref_no	IN	VARCHAR2,
		 p_esn			IN	NUMBER,
		 p_amount		IN	NUMBER,
		 p_vamidt		IN	DATE,
		 p_old_mdate		IN	DATE,
		 p_new_mdate		IN	DATE,
		 p_redef_method		IN	VARCHAR2,
		 p_err_code		OUT	VARCHAR2,
		 p_err_param		OUT	VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_process_tranch_repayment
		(p_branch	IN	VARCHAR2,
		 p_date		IN	DATE,
		 p_err_code	OUT	VARCHAR2,
		 p_err_param	OUT	VARCHAR2)
RETURN BOOLEAN;
--03-Sep-2007, FCC V.CL Release 7.3 Term Revolver Changes, ends
----FLEXCUBE V.CL Release 7.4 RT # 17 Changes Starts
FUNCTION fn_outflow_add_sgen_detail
                        (
                        pContractRefNo          IN              oltbs_contract.contract_ref_no%TYPE,
                        pEventSeqNo                     IN              oltbs_contract.latest_event_seq_no%TYPE,
                        pEffectiveDate          IN              Date,
                        pErrorCode                      IN OUT  ertbs_msgs.err_code%TYPE
                        )
RETURN BOOLEAN;
----FLEXCUBE V.CL Release 7.4 RT # 17 Changes Ends
--CITIUS-LS#SRT5764 Starts
--CITIUS-LS#5611 Starts
FUNCTION fn_rounding_basis 
(
	p_cust_no 	in oltms_customer.customer_no%type,
	pccy 		in cytms_ccy_defn.ccy_code%type,
	prate_code 	in lftms_standard_rate_code.rate_code%type,
	p_rate 		in  number
) 
RETURN NUMBER;
--CITIUS-LS#5611 Ends
--CITIUS-LS#SRT5764 Ends
--10-JAN-2012 FLEXCUBE V.CL Release 7.10 VOL1 FS Tag 04 changes start
FUNCTION fn_update_outstanding_vami
		(p_dd_ref_no		IN	VARCHAR2,
		 p_esn			IN	NUMBER,
		 p_amount		IN	NUMBER,
		 p_vamidt		IN	DATE,
		 p_old_mdate		IN	DATE,
		 p_new_mdate		IN	DATE,
		 p_redef_method		IN	VARCHAR2,
		 p_err_code		OUT	VARCHAR2,
		 p_err_param		OUT	VARCHAR2)
RETURN BOOLEAN;
--10-JAN-2012 FLEXCUBE V.CL Release 7.10 VOL1 FS Tag 04 changes end
--30-JUL-2012 Flexcube V.CL Release 7.11 Retro CITIBLR#35095 Changes start
FUNCTION Fn_populate_unschedule_dd
	(
	p_contract_ref_no	IN		oltbs_contract.contract_ref_no%TYPE,
	p_date				IN		DATE,
	p_err_code			IN OUT	VARCHAR2,
	p_err_param			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--30-JUL-2012 Flexcube V.CL Release 7.11 Retro CITIBLR#35095 Changes end
--05-FEB-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 VOL1 FS Tag 08 changes STARTS
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
--05-FEB-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 VOL1 FS Tag 08 changes ends

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
  
  --OBCL_14.5_Discounted_Schedule_Changes -- START
  FUNCTION FN_PAYRECV_DTLS_INSERT (P_CONTRACT_REF_NO IN VARCHAR2,
								 p_Errorcode       OUT VARCHAR2,
								 p_Errorparam      OUT VARCHAR2)
  RETURN BOOLEAN;
  
  FUNCTION FN_PAYRECV_DTLS_INSERT_PRTP (P_CONTRACT_REF_NO IN VARCHAR2,
										p_Errorcode       OUT VARCHAR2,
										p_Errorparam      OUT VARCHAR2)
  RETURN BOOLEAN;
  --OBCL_14.5_Discounted_Schedule_Changes -- END
  --OBCL_14.3_SOFR_Participant_engine_call start
  FUNCTION Fn_part_Log_temp_amt_due ( p_borr_ref_no                IN oltbs_contract_master.contract_ref_no%TYPE,
                                    p_part_ref_no                IN lptb_contract_master.contract_ref_no%TYPE,
                                    p_Counterparty       IN Lptbs_Contract_Master.Counterparty%TYPE,
                                    p_msgid                      IN OUT VARCHAR2,
                                    p_err_code                   IN OUT VARCHAR2,
                                    p_err_params                 IN OUT VARCHAR2) RETURN BOOLEAN ;
   TYPE ty_temp_rfr_amnt_due IS TABLE OF OLTBS_TEMP_RFR_AMNT_DUE%ROWTYPE INDEX BY BINARY_INTEGER;
   --OBCL_14.3_SOFR_Participant_engine_call end
    --Bug#36249899 Start
   TYPE Typ_Tbl_Ins_Ldtb_Contract_Sch IS TABLE OF Oltbs_Contract_Schedules%ROWTYPE;
   TYPE Typ_Tbl_Ins_oltb_amount_due IS TABLE OF oltbs_amount_due%ROWTYPE;
   FUNCTION Fn_Redf_Repay_Sch_pmt( p_contract_ref_no	IN		VARCHAR2,
								   p_latest_version_no	IN		VARCHAR2,
								   p_prepay_date		IN		DATE,
								   p_err_code			IN OUT	VARCHAR2,
								   p_err_param			IN OUT	VARCHAR2) RETURN BOOLEAN;
   --Bug#36249899 End
   
 --$$ Bug#36415149  CHANGES  starts --
   
   FUNCTION Fn_Get_Effective_Date_For_Comp(p_contract_ref_no	IN		VARCHAR2,
                                           p_comp             IN    VARCHAR2,
                                           p_value_date       IN    DATE
                                            )RETURN DATE ;
   
  --$$ Bug#36415149  CHANGES ENDS-- 

end lbpks_schedules;
/
create or replace synonym lbpkss_schedules for lbpks_schedules
/