create or replace package olpks_interest is
/*----------------------------------------------------------------------------------------
**
** File Name    : olpks_interest.SPC
**
** Module       : LOANS AND DEPOSITS
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East),
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------
*/

/*------------------------------------------CHANGE HISTORY----------------------------------
11-AUG-2008  FLEXCUBE V.CL Release 7.4 - STP LD VAMI CHANGES ; New SPC added for LD taken lbpks_interest as base
and unwanted portion is either commented or removed.
19-Feb-2009  FLEXCUBE V.CL Release 7.5 LOT1 FS TAG 5 added new functions fn_pickup_spread,Fn_spread_repickup,fn_spread_batch and created a new Plsql table Spread_Hoff_Rectype
24-APR-2009  FLEXCUBE V.CL Release 7.5 LOT2 FS Tag 26, Loan Interest Accrual on principal Outstanding ,PBG Changes by Saurabh
10-APR-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag 16 <Composite Rate Code>, added new functions Fn_fetch_composite_rates,Fn_pop_comp_fltrt_maint,Fn_propogate_composite_rate,
							Fn_compare_composite_rate,fn_process_composite_rate,fn_update_comp_rate and created a new plsql table rate_rectype
14-MAY-2009 FLEXCUBE V.CL Release 7.5 LOT2 FS Tag 15, Loan Interest Accrual on principal Outstanding ,PBG Changes by Saurabh
25-MAY-2009 FLEXCUBE V.CL Release 7.5 LOT2 FS Tag 16, Added Function fn_fetch_rates_for_period to SPC.
25-MAY-2009 FLEXCUBE V.CL Release 7.5 LOT2 Interface SFR #1,Added Function Fn_pickup_spread_for_contract to SPC.
09-JUN-2009 FLEXCUBE V.CL Release 7.5 lot2 ITR1 SFR#107 declared FN_BUILD_INTEREST_DETAIL and fn_fetch_spread_for_period and fn_populate_spread_detail in the spc.
16-JUN-2009 FLEXCUBE V.CL Release 7.5 lot2 ITR1 SFR170, CALLED olpks_interest FN POPULATE HANDOFF AS THE NEW INTEREST WAS NOT GETTING PICKED UP FROM lftbs_contract_interest
07-AUG-2009 FLEXCUBE V.CL Release 7.5 LOT3 FS Tag 6 New function FN_REBUILD_AMT_DUE is added
20-FEB-2010 FLEXCUBE V.CL Release 7.6 CITIPBG TD FS tag4 Changes, tenor based spread related changes
29-APR-2010 FLEXCUBE V.CL Release 7.6 ITR1 SFR#2 RT#60, payment on value date after the new version rollover is failed.
06-JUN-2012 Flexcube V.CL Release 7.11, Retro, CITIUS#13855,Payment beyond the VAMI date would result in no error message.
							    Changes done to display the error message.
13-APR-2012 Flexcube V.CL Release 7.11 FS Tag 12 Changes, Ability to handle Adjustable Rate Mortgage Changes, Adjustment_rate column has been added

     Changed On			:09-JUL-2016
     Changed By         :  Deva Anand
     Change Description :  Correcting the units after dropping floating rate related work tables and commenting the version number
     Search String		:Floating_Rate_changes

	 Changed On		: 09-AUG-2017
    Changed By         : Priyadarshini K
    Change Description : Negative Interest Handling in fn_fetch_rates_for_period
    Search String 		:  OBCL_12.5_RTFIX_NEG_INT
	**Changed By         : Meha
    **Date               : 11-Jun-2018
    **Change Description : Prepayment_Sch changes -FN_CLEAR_ICCF_CALC
    **Search String      : OBCL_14.2_Prepayment_Sch Changes

	Changed On   : 16-MAY-2018
	Changed By         : Priyadarshini K
	Change Description : Added p_action as last argument in fn_populate_handoff
	Search String     :  OBCL_27990116

	**Changed By         : Meha
    **Date               : 23-Mar-2019
    **Change Description : Moratorium changes
    **Search String      : OBCL_14.3_Moratorium

	**Changed By         : Vigneshram S
	**Change Description : Exponential Changes
	**Search String      : OBCL_14.4_Exponential
	**Changed On         : 02-JUL-2019

	**Changed By         : Vigneshram S
	**Change Description : Added code for SOFR changes
	**Search String      : OBCL_14.4_SOFR
	**Changed On         : 01-APR-2020

	**Changed By         : Abhinav Bhasker
	**Date               : 08-Jun-2020
	**Change Description : Applied Changes with regards to Bug#31429569
	**Search String      : Bug#31429569
	
	**Changed By         : Abhinav Bhasker
	**Date               : 16-Jun-2020
	**Change Description : Applied Changes to populate Rate Pickup Date for NON SOFR Comp
	**Search String      : OBEL_14.4_NON_SOFR_RATE_PICKUP_DATE
	
	**Changed By         : Arunprasath
	**Date               : 02-feb-2021
	**Change Description : Changes done for simplified STP
	**Search String      : OBCL_14.3_Simplified_STP
	
	**Changed By         : Arunprasath
	**Date               : 22-Mar-2021
	**Change Description : Changes done for participant engine call
	**Search String      : OBCL_14.3_SOFR_Participant_engine_call
	
  **Changed By         : Abhinav Bhasker
  **Date               : 28-Oct-2021
  **Change Description : Projection for Future Dated Contracts
  **Search String      : Bug#33300194 
	
  **Changed By         : Mohan Pal
  **Date               : 04-Jul-2022
  **Change Description : RFR Request Value and Maturity date population
  **Search String      : Bug#33040217_17

  Changed By          Navoneel Nandan
  Date                29-Aug-2022
  Change Description  Making Fn_iccf_calc_upd_rep_comps function public
  Search String       Bug#34322084_2

  Changed By          Navoneel Nandan
  Date                29-Aug-2022
  Change Description  Creating sch cutoff global variable
  Search String       Bug#34834678
  
  Changed By         : Rahul Garg
  Changed On         : 28-Feb-2023
  Search String      : Bug#34990312
  Change Reason      : Changes Made to correct the margin for Backdated RFR contract when more than one margin is maintained

  **Changed By         : Mohan Pal
  **Date               : 12-JUL-2023
  **Change Description : global variable declaration g_rfr_comp_princ_exp
  **Search String      : Bug#35516293  

  **Changed By         : Satheesh Seshan
  **Date               : 22-Aug-2023
  **Change Description : OLDPMNT Populate retrieves old CAMD simulation data from OLTB_TMP_RFR_ICCF_CALC FWDPORT using 35630441
  						   so clearing the data from OLTB_TMP_RFR_ICCF_CALC on click of populate.
  **Search String      : Bug#35530369 

  **Changed By         : Navoneel Nandan
  **Date               : 05-Sep-2023
  **Change Description : Previous Prepayment amount not getting adjusted in the basis amount, fetching the latest payment till date
  **Search String      : Bug#35776274

  **Changed By         : Navoneel Nandan
  **Date               : 12-Sep-2023
  **Change Description : Payments to previous Schedules aslo was applying the split to inflation calculation logic.
                         Added code to fetch the payment date from amount paid table for the respective due dates
  **Search String      : Bug#35784988
  
  **Changed By         : Palanisamy M
  **Date               : 30-Oct-2023
  **Change Description : Fix for iccf start date updating to moratorium date for all schedules
  **Search String      : Bug#35781448

  **Changed By         : Balaji Gopal
  **Date               : 28-Dec-2023
  **Change Description : CDI Derived Components - Segregate the positive and negative components to calculate the till date accural and paid amount
  **Search String      : Bug#36084356_Lot1.1

  **Changed By         : Navoneel Nandan
  **Date               : 18-Jan-2024
  **Change Description : Olvws_Derived_Tag and lftm_product_iccf Sub queries are moved out from for loop.
                         Currency unit,rule and decimal are assigned into global variable.
  **Search String      : Bug#36162753
      
    **Changed By         : Navoneel Nandan
    **Date               : 11-Jun-2024
    **Change Description : Updating ICCF Calc only for the schedule date
    **Search String      : Bug#36626521_2
	
	**Changed By         : Guru
	**Date               : 10-Jul-2024
	**Change Description : Performance tuning changes for Exponential calculation by changing to collections instead of direct references to EXP tables.                          
	**Search String      : Bug#36825935
	
	**Changed By         : Revathi Dharmalingam
	**Date               : 27-Aug-2024
	**Change Description : System is not applying the payment cut off logic during prepayment on schedule start date.
	**Search String      : OBCL_14.7_SUPPORT_BUG#36968243_Changes

	**Changed By         : Pallavi R
	**Date               : 11-Nov-2024
	**Change Description : Reverting the fix provided for #35781448 ,As DSBR and VAMI are failing if secondary interest components are there.
	**Search String      : OBCL_14.7_NBE_BUG#37166923_Changes	
	
	**Changed By         : Revathi Dharmalingam
	**Date               : 15-Jan-2025
	**Change Description : System was posted accrual without residual amounts so added code to populate the lcy interest with residual interest.  
	**Search String      : OBCL_14.7_Support_Bug#37283137_Changes	
	
	 ----------------------------------------------------------------------------------------*/
 --29640499 Changes starts
  g_maturity_flag  VARCHAR2(1 CHAR) := 'N'; --Abhinav1
  g_rate_pickup_date_flag  VARCHAR2(1 CHAR) := 'N'; --OBEL_14.4_NON_SOFR_RATE_PICKUP_DATE
  g_ADD_AMOUNT oltb_rfr_interest_comp.ADD_AMOUNT%Type; --OBCL_14.4_SOFR Amort Changes
  g_negative_Comp_Count NUMBER; -- Bug#36084356_Lot1.1
  g_value_date	Date;---Bug#33040217_17 ADDED
  g_maturity_date Date;---Bug#33040217_17 ADDED
  g_rfr_comp_princ_exp varchar2(1) := 'N';---Bug#35516293 ADDED	
  --Bug#34834678 starts
  TYPE rec_sch_cutoff_dtls IS RECORD (
  contract_ref_no		LFTB_CONTRACT_INTEREST.contract_reference_no%Type,
  component		LFTB_CONTRACT_INTEREST.Component%Type,
  yn_applied VARCHAR2(1),
  old_sch_date DATE,
  new_sch_date DATE,
  new_start_date DATE,
  sch_paid_on_due_date VARCHAR2(1)--OBCL_14.7_SUPPORT_BUG#36968243_Changes
	);
  TYPE typ_sch_cutoff_dtls  IS TABLE OF rec_sch_cutoff_dtls INDEX BY BINARY_INTEGER;
  g_sch_cutoff_dtls typ_sch_cutoff_dtls;
  --Bug#34834678 ends
  --g_iccf_startdate_update_flag  VARCHAR2(1 CHAR) := 'N';   --Bug#35781448    --OBCL_14.7_NBE_BUG#37166923_Changes

  g_schwise_calc_upd VARCHAR2(1):='N';--Bug#36626521_2
  
  PROCEDURE Pr_Skip_Handler(P_Stage IN VARCHAR2);
  PROCEDURE Pr_Set_Skip_Kernel;
  PROCEDURE Pr_Set_Activate_Kernel;
  PROCEDURE Pr_Set_Skip_Cluster;
  PROCEDURE Pr_Set_Activate_Cluster;
  FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
  FUNCTION Fn_Skip_Custom RETURN BOOLEAN;
  --Bug#35776274 starts
  TYPE typ_amt_paid IS TABLE OF oltbs_amount_paid%ROWTYPE INDEX BY BINARY_INTEGER;
  TYPE typ_liq_summary IS TABLE OF oltbs_contract_liq_summary%ROWTYPE INDEX BY BINARY_INTEGER; 
  TYPE typ_amend_due IS TABLE OF oltbs_contract_amend_due%ROWTYPE INDEX BY BINARY_INTEGER;  
  --Bug#35776274 ends
  
   --Bug#36825935 Changes Starts
  g_amt_paid typ_amt_paid;  
  g_amend_due typ_amend_due; 
  
  gv_Tbl_olvws_derived_tag_rec     sypkss_utils.typ_derived_tag_row := sypkss_utils.typ_derived_tag_row();
  gv_tb_amt_due sypkss_utils.ty_tb_amount_dues := sypkss_utils.ty_tb_amount_dues();
  gv_tb_dsbr_sch sypkss_utils.ty_tb_dsbr_sch := sypkss_utils.ty_tb_dsbr_sch();
  gv_tbl_contract_master sypkss_utils.ty_tb_contract_master := sypkss_utils.ty_tb_contract_master();
  gv_Tbl_lftms_product_iccf_neg_rec sypkss_utils.typ_lftms_product_iccf_neg := sypkss_utils.typ_lftms_product_iccf_neg();
  g_derived_flag NUMBER := 0;  
  g_exp_coll_load VARCHAR2(1) := 'N';
  
  TYPE Ty_Tb_contract_iccf_calc_rec IS TABLE OF oltb_contract_iccf_calc%ROWTYPE INDEX BY BINARY_INTEGER;
  TYPE typ_iccf_exp IS TABLE OF oltb_contract_iccf_exp%ROWTYPE INDEX BY VARCHAR2(1000);  
  TYPE typ_calc_start_date IS TABLE OF DATE INDEX BY VARCHAR2(1000);  
  TYPE typ_calc_rec IS TABLE OF oltbs_contract_iccf_calc%ROWTYPE INDEX BY VARCHAR2(1000);  
  TYPE typ_amt_due_rec IS TABLE OF oltbs_amount_due%ROWTYPE INDEX BY VARCHAR2(1000);
  
  
  g_iccf_exp typ_iccf_exp;
  g_calc_rec typ_calc_rec;
  g_calc_start_date typ_calc_start_date;
  g_amount_due_rec typ_amt_due_rec;  
  
  --Bug#36825935 Changes Ends
  TYPE typ_drv_comps_list IS TABLE OF oltbs_amount_paid.component%TYPE INDEX BY BINARY_INTEGER;--Bug#35784988

  -- Bug#36162753 Starts Here 
  g_parent_comps_list     typ_drv_comps_list;
  g_cont_int              lftbs_contract_interest%ROWTYPE; 
  -- Bug#36162753 Ends Here
  
 --29640499 Changes ends
	TYPE Int_Rate_Detail_Hoff IS RECORD
		(	p_effective_Date	LFTB_CONTRACT_INTEREST_DETAIL.Value_Date%Type,
			p_rate_code		LFTB_CONTRACT_INTEREST_DETAIL.Rate_Code%Type,
			p_rate_type		LFTB_CONTRACT_INTEREST_DETAIL.Rate_Type%Type,
			p_rate_code_usage	LFTB_CONTRACT_INTEREST_DETAIL.Rate_Code_Usage%Type,
			p_borrow_lend_ind	LFTB_CONTRACT_INTEREST_DETAIL.Borrow_Lend_Ind%Type,
			p_rate		LFTB_CONTRACT_INTEREST_DETAIL.Final_Rate%Type,
			p_base_rate		LFTB_CONTRACT_INTEREST_DETAIL.Base_Rate%Type,
			p_margin		LFTB_CONTRACT_INTEREST_DETAIL.Margin%Type,
			p_spread		LFTB_CONTRACT_INTEREST_DETAIL.Spread%Type,
			p_cust_margin	LFTB_CONTRACT_INTEREST.Cust_Margin%Type,
			p_amount		oltbs_computation_handoff.Amount%Type,
			p_fixed_rate_type	LFTB_CONTRACT_INTEREST_DETAIL.fixed_rate_type%Type
			, p_adjustment_rate	lftbs_contract_interest_detail.adjustment_rate%TYPE  --13-APR-201-2 Flexcube V.CL Release 7.11 FS Tag 12 Changes here			
		);

	TYPE Ty_Interest_Hoff is TABLE of Int_Rate_Detail_Hoff
		INDEX BY BINARY_INTEGER;

	TYPE Ty_Schedule_Date is TABLE of DATE
		INDEX BY BINARY_INTEGER;


	TYPE Comp_Hoff_Rectype IS RECORD
		(	p_component		oltbs_computation_handoff.Component%Type,
			p_effective_Date	oltbs_computation_handoff.Effective_Date%Type,
			p_final_rate	oltbs_computation_handoff.Rate%Type,
			p_amount		oltbs_computation_handoff.Amount%Type
		);

	TYPE Ty_Comp_Hoff is TABLE of Comp_Hoff_Rectype
		INDEX BY BINARY_INTEGER;

	TYPE Margin_Hoff_Rectype IS RECORD
		(	p_effective_Date	lftbs_contract_margin_detail.Value_Date%Type,
		 	p_margin_value	lftbs_contract_margin_detail.Margin_Rate%Type
		 );

	TYPE Ty_Margin_Handoff IS TABLE OF Margin_Hoff_Rectype
	INDEX BY BINARY_INTEGER;
 	--FLEXCUBE V.CL Release 7.5 LOT1 FS TAG 5 Starts
	TYPE Spread_Hoff_Rectype IS RECORD
		(	p_effective_Date	lftbs_contract_spread_detail.Value_Date%Type,
			p_spread_value		lftbs_contract_spread_detail.spread_Rate%Type
		 );

	TYPE Ty_Spread_Handoff IS TABLE OF Spread_Hoff_Rectype
	INDEX BY BINARY_INTEGER;
 	--FLEXCUBE V.CL Release 7.5 LOT1 FS TAG 5 Ends
 	TYPE Rate_Hoff_Rectype IS RECORD
 		(	p_effective_Date	Cftms_Floating_Rate.Effective_Date%Type,
			p_base_rate		Cftms_Floating_Rate.Int_Rate%Type,
			p_spread		lftbs_contract_interest.Spread%Type,
			p_margin		lftbs_contract_interest.Margin%Type,
			p_cust_margin	lftbs_contract_interest.Cust_Margin%Type
			, p_adjustment_rate	lftbs_contract_interest.Adjustment_rate%TYPE  --13-APR-2012 Flexcube V.CL Release 7.11 FS Tag 12 Changes here
			,p_rate_sign       lftbs_contract_interest.rate_sign%type -- PRIYA OBCL_12.5_RTFIX_NEG_INT
			,p_rate      lftbs_contract_interest.rate%type --OBCL_12.5_RTFIX_NEG_INT

		);


	TYPE Ty_Rate_Handoff is TABLE of Rate_Hoff_Rectype
		INDEX BY BINARY_INTEGER;



	FUNCTION FN_MARK_BEGIN_INT_CALC
		(	p_contract_reference_no	IN oltbs_computation_handoff.Contract_Ref_No%Type,
			p_component			IN oltbs_computation_handoff.Component%Type,
			p_effective_date		IN oltbs_computation_handoff.Effective_Date%Type
		)
	RETURN BOOLEAN;

	FUNCTION FN_MARK_END_INT_CALC
		(
			p_ref_no	IN lftbs_contract_interest_master.CONTRACT_REF_NO%TYPE,
			p_component	IN lftbs_contract_interest_master.COMPONENT%TYPE
		)
	RETURN BOOLEAN;

	FUNCTION FN_INTCOMPS_PROCESSING
  		(
			p_ref_no		IN lftbs_contract_interest.contract_reference_no%TYPE,
			p_module		IN oltbs_contract.module_code%type,
			p_action		IN Varchar2,
			p_version_no	IN oltbs_contract_master.version_no%type,
			p_vamb_esn		IN lftbs_contract_interest.event_sequence_no%TYPE,
			p_exclude_comp	IN lftbs_contract_interest.component%type,
			p_err_code		OUT Varchar2,
			p_err_param		OUT Varchar2
		)
	RETURN BOOLEAN;

	FUNCTION FN_PROCESS_INT_FOR_CONTRACT
	    (
		     p_ref_no	IN lftbs_contract_interest.Contract_Reference_No%Type,
		     p_action	IN Varchar2,
		     p_vamb_esn	IN lftbs_contract_interest.Event_Sequence_No%Type
	    )
	RETURN BOOLEAN;

--FLEXCUBE V.CL Release 7.5 LOT1 FS TAG 5 starts
Function fn_pickup_spread
   (
   p_contract_ref_no    IN oltbs_contract.contract_ref_no%type,
   p_value_date         IN date,
   p_product            IN lftms_spread_master.product_code%TYPE,
   p_customer		IN lftms_spread_master.customer_no%type,
   p_branch		IN lftms_spread_master.branch_code%type,
   p_contract_ccy	IN lftms_spread_ccy.currency%type,
   p_error_code     	IN OUT varchar2,
   p_error_param	IN OUT varchar2
   )
 RETURN BOOLEAN;
FUNCTION Fn_spread_repickup
	(
	p_contract_ref_no 	IN    	oltbs_contract.contract_ref_no%Type,
	p_processing_date	IN 	date,
	p_error_code      	IN OUT  Varchar2,
	p_error_param    	IN OUT  Varchar2
	)
RETURN BOOLEAN;
FUNCTION fn_spread_batch
	(
	p_processing_branch	IN    	oltbs_contract.branch%TYPE,
	p_module       		IN    	oltbs_contract.module_code%TYPE,
	p_processing_date    	IN    	date,
	p_product         	IN    	oltbs_contract.product_code%TYPE,
	p_commit_frequency   	IN    	oltbs_automatic_process_master.bod_commit_count%TYPE,
	p_error_code      	IN OUT   varchar2,
	p_error_param     	IN OUT   varchar2
         )
RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.5 LOT1 FS TAG 5 ends

--10-APR-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag 16 <Composite Rate Code> Changes Starts
TYPE rate_rectype IS	RECORD
	(
	p_effective_Date	cftms_floating_rate.effective_date%TYPE,
	p_rate			cftms_floating_rate.int_rate%TYPE,
	p_margin		lftbs_contract_interest.margin%TYPE,
	p_rate_sign		lftbs_contract_interest.rate_sign%TYPE,
	p_base_rate		cftms_floating_rate.int_rate%TYPE,
	p_spread		lftbs_contract_interest.Spread%TYPE,
	p_picked_rate_code	VARCHAR2(10),
	P_borr_lend_ind		VARCHAR2(1),
	P_reset_tenor		NUMBER,
	p_amount_slab		NUMBER,
	p_repickup_required	VARCHAR2(1)
	);

TYPE ty_rate is TABLE of rate_rectype	INDEX BY BINARY_INTEGER;


FUNCTION Fn_fetch_composite_rates
		(
		P_branch		IN	oltbs_contract.branch%TYPE,
		p_ccy			IN	oltbs_contract.contract_ccy%TYPE,
		P_comp_rate_code	IN	LFTM_COMP_RATE_CODE_MASTER.comp_rate_code%TYPE,
		P_basis_amount		IN	NUMBER,
		P_borrow_lend_ind	IN	VARCHAR2,
		P_tenor			IN	NUMBER,
		P_rate_calc_type	IN	VARCHAR2,
		P_ty_rate		IN	OUT ty_rate,
		p_rebuild_type		IN	VARCHAR2,
		P_min_recalc_date	IN	DATE DEFAULT NULL
		)
RETURN BOOLEAN;

FUNCTION Fn_pop_comp_fltrt_maint
		(
		P_comp_rate_code	IN	LFTM_COMP_RATE_CODE_MASTER.comp_rate_code%TYPE,
		P_branch_code		IN	LFTM_COMP_RATE_CODE_MASTER.branch_code%TYPE,
		p_ccy			IN	LFTM_COMP_RATE_CODE_MASTER.ccy%TYPE,
		p_borrow_lend_ind	IN	LFTM_COMP_RATE_CODE_MASTER.borrow_lend_ind%TYPE,
		P_ty_rate		IN	ty_rate,
		p_repop_date		IN	DATE,--Will be NULL for complete rebuild
		p_error_code		IN	OUT	VARCHAR2,
		p_error_params		IN	OUT	VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION Fn_propogate_composite_rate
		(
		p_ho			IN	cftms_float_rate_detail.branch_code%TYPE,
		P_ccy			IN	cftms_float_rate_detail.ccy_code%TYPE,
		p_comp_rate_code	IN	cftms_float_rate_detail.rate_code%TYPE,
		p_borr_lend_ind		IN	cftms_float_rate_detail.borrow_lend_ind%TYPE,
		p_err_code		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION Fn_compare_composite_rate
		(
		p_comp_rate_code	IN	lftms_comp_rate_code_master.comp_rate_code%TYPE,
		P_ccy			IN	lftms_comp_rate_code_master.ccy%TYPE,
		p_borr_lend_ind		IN	lftms_comp_rate_code_master.borrow_lend_ind%TYPE,
		p_branch_code		IN	lftms_comp_rate_code_master.branch_code%TYPE,
		p_min_recal_date	IN	DATE,
		P_ty_rate		IN OUT 	ty_rate,
		p_min_rtchg_dt		OUT	DATE,
		p_error_code		IN OUT 	VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION fn_process_composite_rate
		(
		p_branch			IN	oltbs_contract.branch%TYPE,
		p_ccy				IN	oltbs_contract.contract_ccy%TYPE,
		p_comp_rate_code	IN	LFTM_COMP_RATE_CODE_MASTER.comp_rate_code%TYPE,
		p_borrow_lend_ind	IN	LFTM_COMP_RATE_CODE_MASTER.borrow_lend_ind%TYPE,
		p_min_recalc_date	IN	DATE,
		p_action_code		IN	VARCHAR2,
		p_error_code		IN OUT	VARCHAR2,
		p_error_param		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;
FUNCTION Fn_update_composite_rates
		(
	--	p_rate_code		IN	cftws_float_rate_master.rate_code%TYPE, --Floating_Rate_changes commented
p_rate_code		IN	cftms_float_rate_master.rate_code%TYPE, --Floating_Rate_changes Added
	--	p_branch		IN	cftws_float_rate_master.branch_code%TYPE,--Floating_Rate_changes commented
  	p_branch		IN	cftms_float_rate_master.branch_code%TYPE,--Floating_Rate_changes Added
		--p_version_no		IN	cftws_float_rate_master.version_no%TYPE, --Floating_Rate_changes commented
		p_error_code		IN OUT	VARCHAR2,
		p_error_param		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;
--10-APR-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag 16 <Composite Rate Code> Changes Ends

--14-MAY-2009 FLEXCUBE V.CL Release 7.5 LOT2 FS Tag 15, Loan Interest Accrual on principal Outstanding ,PBG Changes by Saurabh START
FUNCTION fn_get_principal_os
(
p_contract_ref_no		IN oltbs_contract.contract_ref_no%type,
p_component			IN oltbs_contract_iccf_calc.Component%Type,
p_balance_type		IN oltbs_contract_vdbal_detail.balance_type%TYPE,
p_effective_date 		IN DATE
)
RETURN BOOLEAN;
--14-MAY-2009 FLEXCUBE V.CL Release 7.5 LOT2 FS Tag 15, Loan Interest Accrual on principal Outstanding ,PBG Changes by Saurabh END
--10-APR-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag 16 CHANGES STARTS
TYPE t_comp_rec IS RECORD
		(
		effective_date		DATE,
		rate_code		lftms_comp_rate_code_detail.rate_code%TYPE,
		ccy			lftms_comp_rate_code_detail.ccy%TYPE,
		final_rate		NUMBER
		);

TYPE l_ty_comp_rec	IS TABLE OF t_comp_rec INDEX BY BINARY_INTEGER;

TYPE t_comp_rate_code_rec	IS TABLE OF LFTM_COMP_RATE_CODE_DETAIL%ROWTYPE INDEX BY BINARY_INTEGER;

FUNCTION Fn_get_comp_rate_codes
		(
		p_comp_rate_code	IN	LFTM_COMP_RATE_CODE_MASTER.comp_rate_code%TYPE,
		p_branch_code		IN	LFTM_COMP_RATE_CODE_MASTER.branch_code%TYPE,
		P_ccy			IN	LFTM_COMP_RATE_CODE_MASTER.ccy%TYPE,
		P_borr_lend_ind		IN	LFTM_COMP_RATE_CODE_MASTER.borrow_lend_ind%TYPE,
		p_comp_rate_recs	OUT	t_comp_rate_code_rec,
		p_complete_rebuild	IN	VARCHAR2,
		P_err_code		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;
--10-APR-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag 16 CHANGES ENDS

--25-MAY-2009 FLEXCUBE V.CL Release 7.5 LOT2 FS Tag 16,Added Start
FUNCTION fn_fetch_rates_for_period
		(
		p_branch		IN	VARCHAR2,
		p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
		p_module		IN	oltbs_contract.module_code%type,
		p_component		IN	oltbs_contract_iccf_calc.component%TYPE,
		p_from_date		IN	DATE,
		p_to_date		IN	DATE,
		p_rates_hoff		IN OUT	ty_rate_handoff,
		p_penalty_rate		IN	NUMBER := 0,
		p_eff_rate		IN	BOOLEAN := FALSE,
		p_err_code		OUT	VARCHAR2
		)
RETURN BOOLEAN;
--25-MAY-2009 FLEXCUBE V.CL Release 7.5 LOT2 FS Tag 16,Added End

--25-MAY-2009 FLEXCUBE V.CL Release 7.5 LOT2 Interface SFR #1,Added Start
FUNCTION Fn_pickup_spread_for_contract
		(
		p_contract_ref_no 	IN    	oltbs_contract.contract_ref_no%TYPE,
		p_effective_date	IN 	DATE,
		p_balance_type		IN	VARCHAR2,
		p_spread_rate        	OUT     LFTM_SPREAD_RATE.spread_rate%TYPE,
		p_amount   		OUT     NUMBER,
		p_error_code      	IN OUT  VARCHAR2,
		p_error_param    	IN OUT  VARCHAR2
		)
RETURN BOOLEAN;
--25-MAY-2009 FLEXCUBE V.CL Release 7.5 LOT2 Interface SFR #1,Added End
FUNCTION fn_fetch_spread_for_period--FLEXCUBE V.CL Release 7.5 lot2 ITR1 SFR#107 starts
	(
	p_contract_ref_no in lftbs_contract_interest_detail.contract_ref_no%type,
	p_module  		 in oltbs_contract.module_code%type,
	p_from_date	 in 	lftbs_contract_spread_detail.value_date%type,
	p_to_date	in	lftbs_contract_spread_detail.value_date%type,
	p_spread_hoff  in out ty_spread_handoff,
	p_error_code	in out varchar2,
	p_error_param	in out	varchar2
	)
RETURN BOOLEAN;

FUNCTION FN_BUILD_INTEREST_DETAIL
	(
	P_CONTRACT_REF_NO	IN	   VARCHAR2,
	P_MODULE  		IN 	   oltbs_contract.MODULE_CODE%TYPE,
	P_COMPONENT		IN	   VARCHAR2,
	P_RATE_HANDOFF  	IN     TY_RATE_HANDOFF,
	P_SPREAD_HANDOFF	IN	Ty_Spread_Handoff,
	P_INTEREST_HOFF	IN OUT ty_interest_hoff
	)
RETURN BOOLEAN;
FUNCTION fn_populate_spread_detail
	(
	p_contract_ref_no	IN oltbs_contract.contract_ref_no%type
	,p_esn			IN number
	,p_from_date		IN date
	,p_to_date		IN date
	,p_contract_ccy		IN lftms_spread_ccy.currency%type
	,p_error_code		IN OUT varchar2
	,p_error_param		IN OUT varchar2
	,p_actual_temp		IN VARCHAR2 DEFAULT 'A'
	)
RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.5 lot2 ITR1 SFR#107 ends
--FLEXCUBE V.CL Release 7.5 lot2 ITR1 SFR170 STARTS
FUNCTION FN_POPULATE_HANDOFF
			(
			p_reference_no 	IN VARCHAR2,
			p_module  		IN oltbs_contract.module_code%type,
			p_component 	IN VARCHAR2,
			p_from_date 	IN DATE,
			p_to_date 		IN DATE,
			p_error_code     OUT VARCHAR2,
			p_action       IN VARCHAR2 --OBCL_27990116
			)
RETURN BOOLEAN;
----FLEXCUBE V.CL Release 7.5 lot2 ITR1 SFR170 ENDS
--FLEXCUBE V.CL Release 7.5 LOT3 FS Tag 6 start
FUNCTION FN_REBUILD_AMT_DUE
      (
       p_contract_ref_no 	IN oltbs_contract.contract_ref_no%type,
       p_component 	IN VARCHAR2,
       p_error_code     IN OUT VARCHAR2,
       p_error_param	IN OUT varchar2
       )
RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.5 LOT3 FS Tag 6 end
--20-FEB-2010 FLEXCUBE V.CL Release 7.6 CITIPBG TD FS tag4 Changes - Start
FUNCTION FN_PICKUP_TENOR_BASED_SPREAD
	(
	p_contract_ref_no	IN		oltbs_contract.contract_ref_no %Type,
	p_effective_date	IN		oltbs_contract_master.value_date%Type,
	p_currency		IN		oltbs_contract_master.currency%Type,
	p_amount		IN		oltbs_contract_master.amount%Type,
	p_tenor		IN		Number,
	p_spread_rate	OUT		lftms_spread_tenor_rate.spread_rate%Type,
	p_error_code	IN OUT	VARCHAR2,
	p_error_param	IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--20-FEB-2010 FLEXCUBE V.CL Release 7.6 CITIPBG TD FS tag4 Changes - End
--29-APR-2010 FLEXCUBE V.CL Release 7.6 ITR1 SFR#2 RT#60 - Start
FUNCTION fn_get_paid_on_value_dt
	(
	p_contract_ref_no	IN	oltbs_contract.contract_Ref_no%TYPE,
	p_component		IN	oltbs_amount_due_cs.component%TYPE,
	p_value_date	IN	DATE
	)
RETURN NUMBER;
--29-APR-2010 FLEXCUBE V.CL Release 7.6 ITR1 SFR#2 RT#60 - End

--13-APR-2012 Flexcube V.CL Release 7.11 FS Tag 12 changes start here
FUNCTION fn_write_penalty_rate_details
	(
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE
	, p_component		IN	lftbs_contract_interest_detail.component%TYPE
	, p_value_date		IN	oltbs_contract_master.value_date%TYPE
	, p_err_code		IN OUT	VARCHAR2
	, p_err_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--13-APR-2012 Flexcube V.CL Release 7.11 FS Tag 12 changes end here
g_err_code_neg	VARCHAR2(800);--06-JUN-2012 Flexcube V.CL Release 7.11, Retro, CITIUS#13855 added
--OBCL_14.2_Prepayment_Sch Changes starts
FUNCTION FN_CLEAR_ICCF_CALC
			(
			p_contract_ref_no 		IN 		oltbs_contract.contract_ref_no%TYPE,
			p_component 			IN 		oltbs_contract_iccf_calc.component%TYPE,
			p_effective_date 		IN 		DATE
			)RETURN BOOLEAN ;
--OBCL_14.2_Prepayment_Sch Changes ends
--OBCL_14.3_Moratorium Changes Starts
FUNCTION Fn_Calculate_Interest(	 p_Reference_No   IN Lftbs_Contract_Interest.Contract_Reference_No%TYPE,
                                 p_Module         IN Oltbs_Contract.Module_Code%TYPE,
                                 p_Component      IN Lftbs_Contract_Interest.Component%TYPE,
                                 p_Action         IN VARCHAR2,
                                 p_Vamb_Esn       IN Lftbs_Contract_Interest.Event_Sequence_No%TYPE,
                                 p_Flat_Component IN BOOLEAN,
                                 p_From_Date      IN DATE,
                                 p_To_Date        IN DATE,
                                 p_Error_Code     OUT VARCHAR2)
    RETURN BOOLEAN;
g_Moraint Oltb_Amount_Due.Amount_Due%Type;
--OBCL_14.3_Moratorium Changes Ends
--OBCL_14.4_Exponential changes starts
FUNCTION Fn_Get_Derived_Rate
	(
	p_Reference_No   IN Lftbs_Contract_Interest.Contract_Reference_No%TYPE,
	p_Module         IN Oltbs_Contract.Module_Code%TYPE,
	p_Component      IN Lftbs_Contract_Interest.Component%TYPE,
	p_Action         IN VARCHAR2,
	p_From_Date      IN DATE,
    p_To_Date        IN DATE,
	P_INTEREST_HOFF	IN OUT ty_interest_hoff,
	p_Error_Code     OUT VARCHAR2,
	P_ERROR_PARAM		OUT Varchar2
	)
RETURN BOOLEAN;

FUNCTION Fn_Get_Float_Rate_conv(		P_CONTRACT_REF_NO	IN	   VARCHAR2,
										P_MODULE  		IN 	   oltbs_contract.MODULE_CODE%TYPE,
										P_EXP_FLAG    IN   Lftb_Contract_Interest.exponential_flag%type,
										p_interest_basis IN Lftb_Contract_Interest.interest_basis%type,
										p_effective_Date	IN  LFTB_CONTRACT_INTEREST_DETAIL.Value_Date%Type,
										p_rate_code     IN   cftms_rate_code.rate_code%type,
										P_RESOLVED_RATE IN OUT NOCOPY LFTB_CONTRACT_INTEREST_DETAIL.Final_Rate%Type,
										P_ERRORCODE     IN OUT NOCOPY Ertbs_Msgs.Err_Code%TYPE,
										P_ERRORPARAM    IN OUT NOCOPY Ertbs_Msgs.Message%TYPE)
RETURN BOOLEAN;

FUNCTION fn_get_fixed_rate_conv(		P_EXP_FLAG    IN   Lftb_Contract_Interest.exponential_flag%type,
										P_RESOLVED_RATE IN OUT NOCOPY LFTB_CONTRACT_INTEREST_DETAIL.Final_Rate%Type,
										P_ERROR_CODE     IN OUT NOCOPY Ertbs_Msgs.Err_Code%TYPE,
										P_ERROR_PARAM    IN OUT NOCOPY Ertbs_Msgs.Message%TYPE)
RETURN BOOLEAN;

FUNCTION fn_int_computation_disc
(
	p_contract_value_date		IN		oltbs_contract_master.value_date%TYPE,
	p_contract_maturity_date	IN		oltbs_contract_master.maturity_date%TYPE,
	p_int_period_basis		IN		lftbs_contract_interest.int_period_basis%TYPE,
	p_ty_int				IN OUT	lfpks_computation.ty_int
)
RETURN BOOLEAN;

FUNCTION fn_int_computation_exp
(
	p_Action            IN VARCHAR2,
	p_Reference_No      IN VARCHAR2,
	p_Module            IN Oltbs_Contract.Module_Code%TYPE,
	 p_Component        IN VARCHAR2,
	P_EXP_FLAG   		IN   Lftb_Contract_Interest.exponential_flag%type,
	p_Currency			IN		oltbs_contract_master.currency%Type,
	p_contract_value_date		IN		oltbs_contract_master.value_date%TYPE,
	p_contract_maturity_date	IN		oltbs_contract_master.maturity_date%TYPE,
	p_int_period_basis		IN		lftbs_contract_interest.int_period_basis%TYPE,
	p_ty_int				IN 	lfpks_computation.ty_int,
	P_ERROR_CODE     IN OUT NOCOPY Ertbs_Msgs.Err_Code%TYPE
)
RETURN BOOLEAN;
--OBCL_14.4_Exponential ends
--OBCL_14.4_SOFR changes starts
g_processing_event VARCHAR2(100);
g_process_compounding VARCHAR2(1);
g_vami_date date;
g_forcecalc_date Date;
g_frcEffcalc_date Date;
g_process_forcecalc VARCHAR2(1);
g_simulate_calc VARCHAR2(1);
g_comm_mode VARCHAR2(1);
 TYPE Ty_Tb_contract_liq IS TABLE OF oltbs_contract_liq%ROWTYPE;
 TYPE Ty_Tb_contract_liq_summ IS TABLE OF oltbs_contract_liq_summary%ROWTYPE;
 TYPE Ty_Tb_amount_paid IS TABLE OF oltb_amount_paid%ROWTYPE;
 TYPE Ty_Tb_contract_iccf_calc IS TABLE OF oltb_contract_iccf_calc%ROWTYPE;
 TYPE Ty_Tb_contract_interest IS TABLE OF lftb_contract_interest%ROWTYPE;--Bug#31456560 -- changed to table type
 TYPE Ty_lftbs_contract_interest_detail IS TABLE OF Lftbs_Contract_Interest_Detail%ROWTYPE; -- Added for Bug#34990312
TYPE ty_interest_details is table  of OLTB_RFR_INTEREST_DETAILS%rowtype
INDEX BY BINARY_INTEGER;


FUNCTION Fn_Log_temp_interest_calc(p_Ref           IN VARCHAR2,
							 p_Component     IN OLTBS_CONTRACT_ICCF_CALC.COMPONENT%TYPE,
							 p_Schedule_Date IN OLTBS_CONTRACT_ICCF_CALC.Schedule_Date%TYPE,
							 ty_calc_Rec     IN OLTBS_CONT_RFR_ICCF_CALC%ROWTYPE,
							 p_msgid         IN OUT VARCHAR2)
RETURN BOOLEAN ;

FUNCTION Fn_update_rfr_interest_calc(p_Ref           IN VARCHAR2,
							   p_msgid         IN OUT VARCHAR2,
							   p_component     IN LFTB_CONTRACT_INTEREST.Component%TYPE,
							   p_old_sch       IN DATE,
							   p_schedule_date IN DATE,
							   p_interest_details IN ty_interest_details,
							   p_action        IN VARCHAR2,
							   p_Err_Code      IN OUT VARCHAR2,
							   p_Err_Params    IN OUT VARCHAR2)
RETURN BOOLEAN ;
   -- Changes start for Bug#34990312
    g_module_code   oltb_contract.MODULE_CODE%TYPE; 
FUNCTION Fn_Log_interest_calc(p_Ref                        IN VARCHAR2,
                                p_version                    IN OLTBS_CONTRACT_MASTER.Version_No%TYPE,
                                p_esn                        IN OLTBS_CONTRACT_MASTER.Event_Seq_No%TYPE,
                                p_ccy                        IN OLTBS_CONTRACT_MASTER.Currency%TYPE,
                                p_component                  IN LFTBS_CONTRACT_INTEREST.Component%TYPE,
                                p_Brn                        IN VARCHAR2,
                                p_Ext_Sys                    IN VARCHAR2,
                                p_msgid                      IN OUT VARCHAR2,
                                p_effective_Date             IN DATE,
                                p_Ty_Int                     IN Lfpkss_Computation.Ty_Int,
                                p_lftb_contract_interest_rec IN LFTB_CONTRACT_INTEREST%rowtype,
                                p_process_prev_rate          IN OLTB_RFR_INTEREST_MASTER.PROCESS_PREV_RATE%TYPE,
                                p_contract_liq               IN Ty_Tb_contract_liq,
                                p_contract_liq_summ          IN Ty_Tb_contract_liq_summ,
								p_amount_paid                IN Ty_Tb_amount_paid,
								p_contract_iccf_calc    	 IN Ty_Tb_contract_iccf_calc,
								p_contract_interest    	     IN Ty_Tb_contract_interest,--Bug#31456560 -- changed to table type
								p_contract_interest_detail   IN Ty_lftbs_contract_interest_detail,
                                p_Err_Code                   IN OUT VARCHAR2,
                                p_Err_Params                 IN OUT VARCHAR2)
    RETURN BOOLEAN;
FUNCTION Fn_log_interest_comp(p_ref                        IN VARCHAR2,
                              p_version                    IN oltbs_contract_master.version_no%TYPE,
                              p_esn                        IN oltbs_contract_master.event_seq_no%TYPE,
                              p_ccy                        IN oltbs_contract_master.currency%TYPE,
                              p_component                  IN lftbs_contract_interest.component%TYPE,
                              p_brn                        IN VARCHAR2,
                              p_ext_sys                    IN VARCHAR2,
                              p_msgid                      IN OUT VARCHAR2,
                              p_effective_date             IN DATE,
                              p_ty_int                     IN lfpkss_computation.ty_int,
                              p_lftb_contract_interest_rec IN lftbs_contract_interest%ROWTYPE,
                              p_process_prev_rate          IN oltb_rfr_interest_master.process_prev_rate%TYPE,
                              p_contract_liq               IN TY_TB_CONTRACT_LIQ,
                              p_contract_liq_summ          IN TY_TB_CONTRACT_LIQ_SUMM,
							  p_amount_paid                IN Ty_Tb_amount_paid,
							  p_contract_iccf_calc         IN Ty_Tb_contract_iccf_calc,
							  p_contract_interest          IN Ty_Tb_contract_interest,--Bug#31456560 -- changed to table type
							  p_contract_interest_detail   IN Ty_lftbs_contract_interest_detail, 
				              p_err_code                   IN OUT VARCHAR2,
                              p_err_params                 IN OUT VARCHAR2)
  RETURN BOOLEAN;
-- CHanges End for Bug#34990312
--Bug#34322084_2 starts
FUNCTION Fn_iccf_calc_upd_rep_comps(p_ref_no       IN oltbs_contract_iccf_calc.contract_ref_no%TYPE,
                                     p_component    IN oltbs_contract_iccf_calc.component%TYPE) RETURN BOOLEAN;
--Bug#34322084_2 ends
FUNCTION Fn_Log_interest_calc(p_Ref                        IN VARCHAR2,
                                p_version                    IN OLTBS_CONTRACT_MASTER.Version_No%TYPE,
                                p_esn                        IN OLTBS_CONTRACT_MASTER.Event_Seq_No%TYPE,
                                p_ccy                        IN OLTBS_CONTRACT_MASTER.Currency%TYPE,
                                p_component                  IN LFTBS_CONTRACT_INTEREST.Component%TYPE,
                                p_Brn                        IN VARCHAR2,
                                p_Ext_Sys                    IN VARCHAR2,
                                p_msgid                      IN OUT VARCHAR2,
                                p_effective_Date             IN DATE,
                                p_Ty_Int                     IN Lfpkss_Computation.Ty_Int,
                                p_lftb_contract_interest_rec IN LFTB_CONTRACT_INTEREST%rowtype,
                                p_process_prev_rate          IN OLTB_RFR_INTEREST_MASTER.PROCESS_PREV_RATE%TYPE,
                                p_Err_Code                   IN OUT VARCHAR2,
                                p_Err_Params                 IN OUT VARCHAR2)
    RETURN BOOLEAN;

FUNCTION Fn_Log_interest_calc(p_Ref                        IN VARCHAR2,
                                p_version                    IN OLTBS_CONTRACT_MASTER.Version_No%TYPE,
                                p_esn                        IN OLTBS_CONTRACT_MASTER.Event_Seq_No%TYPE,
                                p_ccy                        IN OLTBS_CONTRACT_MASTER.Currency%TYPE,
                                p_component                  IN LFTBS_CONTRACT_INTEREST.Component%TYPE,
                                p_Brn                        IN VARCHAR2,
                                p_Ext_Sys                    IN VARCHAR2,
                                p_msgid                      IN OUT VARCHAR2,
                                p_effective_Date             IN DATE,
                                p_Ty_Int                     IN Lfpkss_Computation.Ty_Int,
                                p_lftb_contract_interest_rec IN LFTB_CONTRACT_INTEREST%rowtype,
                                p_process_prev_rate          IN OLTB_RFR_INTEREST_MASTER.PROCESS_PREV_RATE%TYPE,
                                p_contract_liq               IN Ty_Tb_contract_liq,
                                p_contract_liq_summ          IN Ty_Tb_contract_liq_summ,
								p_amount_paid                IN Ty_Tb_amount_paid,
								p_contract_iccf_calc    	 IN Ty_Tb_contract_iccf_calc,
								p_contract_interest    	     IN Ty_Tb_contract_interest,--Bug#31456560 -- changed to table type
                                p_Err_Code                   IN OUT VARCHAR2,
                                p_Err_Params                 IN OUT VARCHAR2)
    RETURN BOOLEAN;
--OBCL_14.4_SOFR changes ends
--Bug#31429569 Start
 FUNCTION Fn_Force_Req_Rfr_Comp(  p_reference_no		IN VARCHAR2
                            ,p_component		IN VARCHAR2
                            ,p_msgid			IN VARCHAR2
                            ,p_action_code      IN VARCHAR2
                            ,p_Value_date		IN DATE
			    ,p_limit_date		IN DATE
                            ,p_error_code		OUT VARCHAR2
                            ,p_error_msg	    OUT VARCHAR2)
    RETURN BOOLEAN;
--Bug#31429569 End
--OBEL_14.4_NON_SOFR_RATE_PICKUP_DATE Start
FUNCTION Fn_get_rate_pickup_date(p_contract_ref_no	IN lftb_contract_interest.Contract_Reference_No%Type
							,p_component		IN lftb_contract_interest.Component%Type
							,p_From_Date		IN lftb_contract_interest.Value_date%Type
							,p_Basis_Amount		IN oltb_contract_iccf_calc.basis_amount%Type
							,p_rate_pickup_date	OUT oltb_contract_iccf_calc.rate_pickup_date%Type
						--	,p_error_msg		OUT VARCHAR2
							)
	RETURN BOOLEAN;
--OBEL_14.4_NON_SOFR_RATE_PICKUP_DATE End
  --ls_sofr_changes starts
  
  FUNCTION Fn_update_rfr_interest_comp(p_ref              IN VARCHAR2,
                                     p_msgid            IN OUT VARCHAR2,
                                     p_component        IN lftb_contract_interest.component%TYPE,
                                     p_old_sch          IN DATE,
                                     p_schedule_date    IN DATE,
                                     p_interest_details IN TY_INTEREST_DETAILS,
                                     p_action           IN VARCHAR2,
                                     p_err_code         IN OUT VARCHAR2,
                                     p_err_params       IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_log_interest_comp(p_ref                        IN VARCHAR2,
                              p_version                    IN oltbs_contract_master.version_no%TYPE,
                              p_esn                        IN oltbs_contract_master.event_seq_no%TYPE,
                              p_ccy                        IN oltbs_contract_master.currency%TYPE,
                              p_component                  IN lftbs_contract_interest.component%TYPE,
                              p_brn                        IN VARCHAR2,
                              p_ext_sys                    IN VARCHAR2,
                              p_msgid                      IN OUT VARCHAR2,
                              p_effective_date             IN DATE,
                              p_ty_int                     IN lfpkss_computation.ty_int,
                              p_lftb_contract_interest_rec IN lftbs_contract_interest%ROWTYPE,
                              p_process_prev_rate          IN oltb_rfr_interest_master.process_prev_rate%TYPE,
                              p_contract_liq               IN TY_TB_CONTRACT_LIQ,
                              p_contract_liq_summ          IN TY_TB_CONTRACT_LIQ_SUMM,
                p_amount_paid                IN Ty_Tb_amount_paid,
                p_contract_iccf_calc         IN Ty_Tb_contract_iccf_calc,
                p_contract_interest        IN Ty_Tb_contract_interest,--Bug#31456560 -- changed to table type
                              p_err_code                   IN OUT VARCHAR2,
                              p_err_params                 IN OUT VARCHAR2)
  RETURN BOOLEAN;
  
  
  
  
  --ls_sofr_changes_ends
  --OBCL_14.3_Simplified_STP Change start
 FUNCTION Fn_new_redef_stp(p_action            IN VARCHAR2,
                        p_reference_no      IN VARCHAR2,
                        p_module            IN oltbs_contract.module_code%TYPE,
                        p_maturity_type     IN VARCHAR2,
                        p_payment_method    IN oltbs_contract_master.payment_method%TYPE,
                        p_component         IN VARCHAR2,
                        p_effective_date    IN DATE,
                        p_ty_comp_hoff      IN TY_COMP_HOFF,
                        p_currency          IN VARCHAR2,
                        p_cur_principal     IN NUMBER,
                        p_old_schedule_date IN DATE,
                        p_error_code        OUT VARCHAR2) RETURN BOOLEAN;
	--OBCL_14.3_Simplified_STP Change end
--OBCL_14.3_SOFR_Participant_engine_call start
 g_get_msgid oltb_req_master.msgid%type; 
 TYPE ty_Contract_Margin_Detail IS TABLE OF Lptbs_Contract_Margin_Detail%ROWTYPE; 
 FUNCTION Fn_participant_log_interest_comp(
                              p_borr_ref_no                IN oltbs_contract_master.contract_ref_no%TYPE,
                              p_part_ref_no                IN lptb_contract_master.contract_ref_no%TYPE,
                              p_ratio                     IN Lbtb_Contract_Participant.Asset_Ratio%TYPE,
                              p_ccy                        IN oltbs_contract_master.currency%TYPE,
                              p_msgid                      IN OUT VARCHAR2,
                              p_part_margin                IN ty_Contract_Margin_Detail,
                              p_err_code                   IN OUT VARCHAR2,
                              p_err_params                 IN OUT VARCHAR2)
  RETURN BOOLEAN;
   TYPE ty_tb_req_master IS TABLE OF OLTB_REQ_MASTER%ROWTYPE INDEX BY BINARY_INTEGER;
   TYPE ty_rfr_interest_master IS TABLE OF oltb_rfr_interest_master%ROWTYPE INDEX BY BINARY_INTEGER;
   TYPE ty_rfr_interest_comp IS TABLE OF oltb_rfr_interest_comp%ROWTYPE INDEX BY BINARY_INTEGER;
   TYPE ty_rfr_interest_calc_dtls IS TABLE OF oltb_rfr_interest_calc_dtls%ROWTYPE INDEX BY BINARY_INTEGER;
   TYPE ty_cont_rfr_iccf_calc IS TABLE OF oltbs_cont_rfr_iccf_calc%ROWTYPE INDEX BY BINARY_INTEGER;
  --OBCL_14.3_SOFR_Participant_engine_call end
--Bug#33300194 Start
  FUNCTION Fn_get_expected_princ_ftr_dt(p_cont_ref_no    IN oltbs_contract.contract_ref_no%TYPE,
                                 p_module         IN oltbs_contract.module_code%TYPE,
                                 p_component      IN oltbs_contract_iccf_calc.component%TYPE,
                                 p_effective_date IN DATE) RETURN BOOLEAN ;
--Bug#33300194 End
	--Bug#35530369 Starts
	FUNCTION fn_clear_tmp_rfr_iccf_calc (
		p_ref                IN      VARCHAR2,
		p_component          IN      lftb_contract_interest.component%TYPE,
		p_err_code           IN OUT  VARCHAR2,
		p_err_params         IN OUT  VARCHAR2
	) RETURN BOOLEAN;
	--Bug#35530369 End
	
	
	--Bug#36825935 Changes starts
	 FUNCTION fn_Load_exp       (p_ref_no oltbs_contract.contract_ref_no%TYPE) RETURN BOOLEAN;
	 FUNCTION fn_Unload_exp     (p_ref_no oltbs_contract.contract_ref_no%TYPE) RETURN BOOLEAN;
	 FUNCTION Fn_get_exp_int_amt(p_ref_no         IN oltbs_contract_iccf_exp.contract_ref_no%TYPE,
								 p_component      IN oltbs_contract_iccf_exp.component%TYPE,
								 p_schedule_date  IN oltbs_contract_iccf_exp.schedule_date%TYPE,
								 p_start_date     IN oltbs_contract_iccf_exp.start_date%TYPE,
								 p_end_date       IN oltbs_contract_iccf_exp.start_date%TYPE,
								 p_incl           IN VARCHAR2) RETURN NUMBER;
	 FUNCTION Fn_get_exp_int_amt(p_ref_no         IN oltbs_contract_iccf_exp.contract_ref_no%TYPE,
								 p_component      IN oltbs_contract_iccf_exp.component%TYPE,
								 p_schedule_date  IN oltbs_contract_iccf_exp.schedule_date%TYPE,
								 p_end_date       IN oltbs_contract_iccf_exp.start_date%TYPE,
								 p_incl           IN VARCHAR2) RETURN NUMBER;
	FUNCTION Fn_get_exp_int_calc_amt	(
										p_ref_no    		IN oltbs_contract_iccf_exp.contract_ref_no%TYPE,
										p_component      	IN oltbs_contract_iccf_exp.component%TYPE,
										p_schedule_date  	IN oltbs_contract_iccf_exp.schedule_date%TYPE,
										p_end_date      	IN oltbs_contract_iccf_exp.start_date%TYPE,
										p_incl           	IN VARCHAR2
									) 
	RETURN NUMBER;
							 
	--Bug#36825935 Changes Ends	
  --OBCL_14.7_Support_Bug#37283137_Changes Starts
    FUNCTION Fn_get_exp_int_lcy_calc_amt  (
                    p_ref_no        IN oltbs_contract_iccf_exp.contract_ref_no%TYPE,
                    p_component       IN oltbs_contract_iccf_exp.component%TYPE,
                    p_schedule_date   IN oltbs_contract_iccf_exp.schedule_date%TYPE,
                    p_end_date        IN oltbs_contract_iccf_exp.start_date%TYPE,
                    p_incl            IN VARCHAR2,
					p_column         IN VARCHAR2
                  ) 
    RETURN NUMBER;    
  
  --OBCL_14.7_Support_Bug#37283137_Changes Ends
	
end olpks_interest;
/
create or replace synonym olpkss_interest for olpks_interest
/