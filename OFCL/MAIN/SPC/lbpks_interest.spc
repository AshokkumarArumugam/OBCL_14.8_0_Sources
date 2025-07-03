CREATE OR REPLACE PACKAGE lbpks_interest IS

/*--------------------------------------------------------------------------------------------------
**
** File Name : lbpks_interest.SQL
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
/*
 CHANGE HISTORY
-- 17-May-2006 	FLEXCUBE V.CL Release 7.0 LOT2 ITR1 SFR#277, Upload related changes for interest rate,aji
			1) copied the FUNCTION FN_FETCH_DEPOSIT_RATES from LSPKINT.SQL to LSPKINT.SPC

--14-AUG-2006 	FCC V.CL RELEASE 7.1 Prime loan changes
19-AUG-2006	FLEXCUBE V.CL Release 7.1 FS 17.0 Competitive Participant Bidding 19082006
			Added new function fn_calculate_prime_int
06-SEP-2006 	FLEXCUBE V.CL Release 7.1 FS 17.0 Competitive Participant Bidding by Bincy
	    		Removed Rate_Code from lbpks_interest.v_primary_data_bid
18-SEP-2006	FLEXCUBE V.CL Release 7.1 ITR1 Bidding Changes
27-NOV-2006 FLEXCUBE V.CL RELEASE 7.2 changes for Prime loans
--FLEXCUBE V.CL Release 7.2 Changes for Income Distribution
Added function fn_pop_prime_iccf_calc
23-Feb-2007 FLEXCUBE V.CL RELEASE 7.2 changes for Prime loans - Added function fn_build_prime_amt_settled
7-mar-2007 FLEXCUBE V.CL Release 7.2 interest changes
29-NOV-2007 FLEXCUBE V.CL Release 7.3 ITR1 SFR#40, included functions Fn_calc_prime_norm_interest,Fn_rebuild_prime_amt_settled
		for calulating interest for message generation
28-APR-2009 FLEXCUBE V.CL Release 7.6 Sighting Fund Changes, Gowri
22-MAY-2009 FLEXCUBE V.CL Release 7.6 ITR2 SFR#10, for ROLL event, fn_populate_unfund_master should be called explicitly
24-AUG-2009 CITIUS-LS#6242,For fronted investors if the payment date and the actual receipt date is different while SFNT capture. Then system is calculating the unfund detail incorrectly.
07-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION changes,
		a) 04-JUN-2009 FLEXCUBE V.CL RELEASE 7.5 LOT2 ITR1 SFR37,added spread as a paramtere as spread was not getting repopulated in lftbs_contract_interest
25-FEB-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 VOL1 FS Tag 08 iut#215 changes, added parameter to the function fn_process_int_for_contract.		
12-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag05 Different Margin for Participants changes, Introduced new function fn_write_part_interest_details for participant interest calculation.

  **Changed By         : Sowmya Bitra
  **Date               : 13-Jan-2023
  **Change Description : Fix for updating Adjustment_Rate during Min Max validations
  **Search String      : Bug#34968827
----------------------------------------------------------------------------------------------------*/
--------------------------------------------------------------------------------------------------------------
--*************************************************************************************************************
--------------------------------------------------------------------------------------------------------------
--FLEXCUBE V.CL Release 7.1 FS 17.0 Competitive Participant Bidding 19082006 changes start
gprev_value_date    DATE;
gprev_maturity_date DATE;
gprev_currency			lftbs_contract_interest.currency%type;
gprev_amount				oltbs_contract_master.amount%type;
gprev_rate_code			lftbs_contract_interest.rate_code%type;
g_processing_date DATE := global.application_date;--FLEXCUBE V.CL Release 7.2 Changes for Income Distribution
--g_action oltbs_contract_event_log.EVENT_CODE%TYPE := 'REVN';--FLEXCUBE V.CL Release 7.2 Changes for Income Distribution
g_action VARCHAR2(7) := 'REVN'; --FLEXCUBE V.CL Release 7.2 interest changes as in case of VAMI action can be RTCHG or PRINC
--FLEXCUBE V.CL Release 7.1 FS 17.0 Competitive Participant Bidding 19082006 changes end
--OBCL_14.4_SOFR changes starts
g_processing_event VARCHAR2(100);
g_process_compounding VARCHAR2(1);
g_vami_date date;
g_forcecalc_date Date;
g_frcEffcalc_date Date;
g_process_forcecalc VARCHAR2(1);
g_simulate_calc VARCHAR2(1);
g_comm_mode VARCHAR2(1);
g_rfr_comp_princ_exp varchar2(1) := 'N'; --Bug#31623516
--29692692 Changes starts
  PROCEDURE Pr_Skip_Handler(P_Stage IN VARCHAR2);
  PROCEDURE Pr_Set_Skip_Kernel;
  PROCEDURE Pr_Set_Activate_Kernel;
  PROCEDURE Pr_Set_Skip_Cluster;
  PROCEDURE Pr_Set_Activate_Cluster;
  FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
  FUNCTION Fn_Skip_Custom RETURN BOOLEAN;
 --29692692 Changes ends
	TYPE Margin_Hoff_Rectype IS
			  RECORD (p_effective_Date  lftbs_contract_margin_detail.Value_Date%Type,
		 		  p_margin_value    lftbs_contract_margin_detail.Margin_Rate%Type);

	TYPE Ty_Margin_Handoff IS TABLE OF Margin_Hoff_Rectype
	INDEX BY BINARY_INTEGER;

	TYPE Rate_Hoff_Rectype IS
		    	RECORD (p_effective_Date  Cftms_Floating_Rate.Effective_Date%Type,
					p_base_rate 	  Cftms_Floating_Rate.Int_Rate%Type,
					p_spread          lftbs_contract_interest.Spread%Type,
					p_margin  	  lftbs_contract_interest.Margin%Type,
					p_cust_margin     lftbs_contract_interest.Cust_Margin%Type);


	TYPE Ty_Rate_Handoff is TABLE of Rate_Hoff_Rectype
		INDEX BY BINARY_INTEGER;

TYPE Ty_Participant_Iccf_Rec IS
         RECORD    (p_contract_ref_no     oltbs_contract_iccf_calc.contract_ref_no%type,
              p_component     oltbs_contract_iccf_calc.component%type,
              p_prepayment_penalty_seq_no oltbs_contract_iccf_calc.prepayment_penalty_seq_no%type,
              p_schedule_date   oltbs_contract_iccf_calc.schedule_date%type,
              p_start_date    oltbs_contract_iccf_calc.start_date%type,
              p_product     oltbs_contract_iccf_calc.product%type,
              p_currency      oltbs_contract_iccf_calc.currency%type,
              p_end_date      oltbs_contract_iccf_calc.end_date%type,
              p_no_of_days    oltbs_contract_iccf_calc.no_of_days%type,
              p_calculated_amount   oltbs_contract_iccf_calc.calculated_amount%type,
              p_iccf_calc_method    oltbs_contract_iccf_calc.iccf_calc_method%type,
              p_daily_average_amount  oltbs_contract_iccf_calc.daily_average_amount%type
              ,p_COMPUTATION_DAYS OLtbs_contract_iccf_calc.COMPUTATION_DAYS%type); -- OBCL_14.4_30/360 CHANGES

TYPE Ty_Participant_Iccf_hoff is Table Of Ty_Participant_Iccf_Rec
	 INDEX BY BINARY_INTEGER;

	TYPE Int_Rate_Detail_Hoff IS
		RECORD (p_effective_Date   LFTB_CONTRACT_INTEREST_DETAIL.Value_Date%Type,
			p_rate_code	   LFTB_CONTRACT_INTEREST_DETAIL.Rate_Code%Type,
			p_rate_type	   LFTB_CONTRACT_INTEREST_DETAIL.Rate_Type%Type,
			p_rate_code_usage  LFTB_CONTRACT_INTEREST_DETAIL.Rate_Code_Usage%Type,
			p_borrow_lend_ind  LFTB_CONTRACT_INTEREST_DETAIL.Borrow_Lend_Ind%Type,
		        p_rate 		   LFTB_CONTRACT_INTEREST_DETAIL.Final_Rate%Type,
			p_base_rate 	   LFTB_CONTRACT_INTEREST_DETAIL.Base_Rate%Type,
			p_margin  	   LFTB_CONTRACT_INTEREST_DETAIL.Margin%Type,
			p_spread  	   LFTB_CONTRACT_INTEREST_DETAIL.Spread%Type,
			p_cust_margin  	   LFTB_CONTRACT_INTEREST.Cust_Margin%Type,
			p_amount 	   oltbs_computation_handoff.Amount%Type,
			p_fixed_rate_type  LFTB_CONTRACT_INTEREST_DETAIL.fixed_rate_type%Type
			, p_adjustment_rate	lftbs_contract_interest_detail.adjustment_rate%TYPE  --Bug#34968827 Changes
			);


	TYPE Ty_Interest_Hoff is TABLE of Int_Rate_Detail_Hoff
		INDEX BY BINARY_INTEGER;

	TYPE Ty_Schedule_Date is TABLE of DATE
		INDEX BY BINARY_INTEGER;


	TYPE Comp_Hoff_Rectype IS
		RECORD (p_component 	  oltbs_computation_handoff.Component%Type,
			p_effective_Date  oltbs_computation_handoff.Effective_Date%Type,
			p_final_rate 	  oltbs_computation_handoff.Rate%Type,
			p_amount 	  oltbs_computation_handoff.Amount%Type);

	TYPE Ty_Comp_Hoff is TABLE of Comp_Hoff_Rectype
		INDEX BY BINARY_INTEGER;


--------------------------------------------------------------------------------------------------------------
--*************************************************************************************************************
--------------------------------------------------------------------------------------------------------------
FUNCTION FN_FETCH_MARGIN_FOR_PERIOD(
			     	    pm_contract_ref_no   IN lftbs_contract_interest_detail.Contract_Ref_No%Type,
				    pm_module  		 IN oltbs_contract.Module_Code%Type,
				    pm_component	 IN lftbs_contract_interest_detail.Component%Type,
				    pm_from_date	 IN lftbs_contract_margin_detail.Value_Date%Type,
				    p_margin_hoff    IN OUT Ty_Margin_Handoff)
RETURN BOOLEAN;


FUNCTION FN_DERIVE_RATES
			(
			p_base_rate 	     IN Ty_Rate_Handoff,
			p_dependant_rate     IN Ty_Rate_Handoff,
			p_derived_rate   IN OUT Ty_Rate_Handoff
			)
RETURN BOOLEAN;


FUNCTION FN_GET_RATES_FOR_PERIOD(
				 p_branch 	    	IN	Varchar2,
				 p_contract_ref_no 	IN	oltbs_contract.Contract_Ref_No%Type,
				 p_component 		IN	oltbs_contract_iccf_calc.Component%Type,
				 p_from_date 		IN	Date,
				 p_to_date 		IN	Date,
				 p_rates_hoff 	    IN OUT	Ty_Rate_Handoff,
				 p_penalty_rate 	IN	Number := 0,
				 p_eff_rate 		IN	Boolean := FALSE
				)
RETURN BOOLEAN;

FUNCTION FN_FETCH_RATES_FOR_PERIOD (
				   p_branch 		IN Varchar2,
				   p_contract_ref_no	IN oltbs_contract.Contract_Ref_No%Type,
				   p_module  		IN oltbs_contract.Module_Code%Type,
				   p_component 		IN oltbs_contract_iccf_calc.Component%Type,
				   p_from_date 		IN Date,
				   p_to_date 		IN Date,
				   p_rates_hoff     IN OUT Ty_Rate_Handoff,
				   p_penalty_rate 	IN Number := 0,
				   p_eff_rate 		IN Boolean := false,
				   p_err_code	       OUT Varchar2
				   )
RETURN BOOLEAN;

FUNCTION FN_BUILD_INTEREST_DETAIL(
				  p_contract_ref_no	IN Varchar2,
				  p_module  		IN oltbs_contract.Module_Code%Type,
				  p_component		IN Varchar2,
				  p_rate_handoff  	IN Ty_Rate_Handoff,
				  p_margin_handoff	IN Ty_Margin_Handoff,
				  p_interest_hoff   IN OUT Ty_Interest_Hoff
				  )
RETURN BOOLEAN;

FUNCTION FN_CLEAR_ICCF_CALC
			  (
			   p_contract_ref_no   IN oltbs_contract.Contract_Ref_No%Type,
			   p_component 	       IN oltbs_contract_iccf_calc.Component%Type,
			   p_effective_date    IN Date
			  )
RETURN BOOLEAN;

FUNCTION FN_CLEAR_INTEREST_DETAIL
				(
				p_contract_ref_no   IN oltbs_contract.Contract_Ref_No%Type,
				p_component 	    IN oltbs_contract_iccf_calc.Component%Type,
				p_effective_date    IN Date
				)
RETURN BOOLEAN;

FUNCTION FN_WRITE_INTEREST_DETAILS (
				   pm_contract_ref_no  	IN lftbs_contract_interest_detail.Contract_Ref_No%Type,
				   pm_component		IN lftbs_contract_interest_detail.Component%Type,
				   pm_rate_detail_hoff  IN Ty_Interest_Hoff)
RETURN BOOLEAN;

FUNCTION FN_POPULATE_HANDOFF
			(
			p_reference_no 	IN Varchar2,
			p_module  	IN oltbs_contract.Module_Code%Type,
			p_component 	IN Varchar2,
			p_from_date 	IN Date,
			p_to_date 	IN Date,
			p_error_code   OUT Varchar2
			)
RETURN BOOLEAN;

FUNCTION FN_GET_EXPECTED_PRINC
			     (
			     p_cont_ref_no    IN oltbs_contract.Contract_Ref_No%Type,
			     p_module  	      IN oltbs_contract.Module_Code%Type,
			     p_component      IN oltbs_contract_iccf_calc.Component%Type,
			     p_effective_date IN Date
			     )
RETURN BOOLEAN;

FUNCTION FN_MERGE_DATES
			(
			p_reference_no 	    IN Varchar2,
			p_module  	    IN oltbs_contract.Module_Code%Type,
			p_component 	    IN Varchar2,
			p_flat_component    IN Boolean,
			p_effective_date    IN Date,
			p_ty_comp_hoff 	   OUT Ty_Comp_Hoff
			)
RETURN BOOLEAN;

FUNCTION FN_GET_LEAP_DATES
			(
			p_from_date      IN Date,
			p_to_date        IN Date,
			p_date_tab   IN OUT Ty_Schedule_Date
			)
RETURN BOOLEAN;

FUNCTION FN_ICCF_CALC_UPDATE
			 (
			  p_ref_no       IN oltbs_contract_iccf_calc.Contract_Ref_No%Type,
			  p_component    IN oltbs_contract_iccf_calc.Component%Type,
			  p_eff_date     IN Date,
			  p_ty_comp_hoff IN ty_comp_hoff,
			  p_error_code OUT Varchar2
			  )
RETURN BOOLEAN;

FUNCTION FN_NEW_REDEF
		(
		 p_action 	 	 IN Varchar2,
		 p_reference_no 	 IN Varchar2,
		 p_module  		 IN oltbs_contract.Module_Code%Type,
		 p_maturity_type 	 IN Varchar2,
		 p_payment_method 	 IN oltbs_contract_master.Payment_Method%Type,
		 p_component 		 IN Varchar2,
		 p_effective_date 	 IN Date,
		 p_ty_comp_hoff 	 IN Ty_Comp_Hoff,
		 p_currency 		 IN Varchar2,
		 p_cur_principal 	 IN Number,
		 p_old_schedule_date 	 IN Date,
		 p_error_code 		OUT Varchar2
		)
RETURN BOOLEAN;

FUNCTION FN_NEW_REDEF_FLAT (
			    p_action 		   IN Varchar2,
			    p_reference_no 	   IN Varchar2,
			    p_module  		   IN oltbs_contract.Module_Code%Type,
			    p_maturity_type 	   IN Varchar2,
			    p_component 	   IN Varchar2,
			    p_effective_date 	   IN Date,
			    p_ty_comp_hoff 	   IN Ty_Comp_Hoff,
			    p_currency 		   IN Varchar2,
			    p_cur_amount 	   IN Number,
			    p_old_schedule_date    IN Date,
			    p_error_code 	  OUT Varchar2
			    )
RETURN BOOLEAN;

FUNCTION FN_UPDATE_AMOUNT_DUE
			(
		   	p_reference_no     IN lftbs_contract_interest.Contract_Reference_No%Type,
			p_component	   IN lftbs_contract_interest.Component%Type,
			p_effective_date   IN Date,
			p_error_code 	  OUT Varchar2
			)
RETURN BOOLEAN;

FUNCTION FN_GET_CURRENT_RATE
			   (
			    p_contract_ref_no 	 IN oltbs_contract.Contract_Ref_No%Type,
			    p_component 	 IN oltbs_contract_iccf_calc.Component%Type,
			    p_effective_date 	 IN Date,
			    p_calc_rec 		OUT oltbs_contract_iccf_calc%Rowtype
			   )
RETURN BOOLEAN;

FUNCTION FN_MARK_BEGIN_INT_CALC(
				p_contract_reference_no IN oltbs_computation_handoff.Contract_Ref_No%Type,
				p_component 		IN oltbs_computation_handoff.Component%Type,
				p_effective_date	IN oltbs_computation_handoff.Effective_Date%Type
			       )
RETURN BOOLEAN;

FUNCTION FN_MARK_END_INT_CALC
		(p_ref_no    IN lftbs_contract_interest_master.CONTRACT_REF_NO%TYPE,
		 p_component IN lftbs_contract_interest_master.COMPONENT%TYPE)
RETURN BOOLEAN;

FUNCTION FN_CALCULATE_INTEREST
			      (
				p_reference_no     IN lftbs_contract_interest.Contract_Reference_No%Type,
				p_module  	   IN oltbs_contract.Module_Code%Type,
				p_component	   IN lftbs_contract_interest.Component%Type,
				p_action    	   IN Varchar2,
				p_vamb_esn	   IN lftbs_contract_interest.Event_Sequence_No%Type,
				p_flat_component   IN Boolean,
				p_from_date   	   IN Date,
				p_to_date	   IN Date,
				p_error_code      OUT Varchar2
			       )
RETURN BOOLEAN;

FUNCTION FN_PROCESS_INT_FOR_CONTRACT
				    (
				     p_ref_no			    IN lftbs_contract_interest.Contract_Reference_No%Type,
				     p_action    	    	    IN Varchar2,
				     p_vamb_esn			    IN lftbs_contract_interest.Event_Sequence_No%Type,
					 p_error_code  in out VARCHAR2,--25-FEB-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 VOL1 FS Tag 08 iut#215 changes
					 p_error_params in out VARCHAR2 --25-FEB-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 VOL1 FS Tag 08 iut#215 changes
				    )
RETURN BOOLEAN;

FUNCTION FN_INTCOMPS_PROCESSING (p_ref_no         IN lftbs_contract_interest.contract_reference_no%TYPE,
			         p_module    	  IN oltbs_contract.module_code%type,
				 p_action    	  IN Varchar2,
				 p_version_no	  IN oltbs_contract_master.version_no%type,
				 p_vamb_esn  	  IN lftbs_contract_interest.event_sequence_no%TYPE,
				 p_exclude_comp	  IN lftbs_contract_interest.component%type,
				 p_err_code	 OUT Varchar2,
				 p_err_param	 OUT Varchar2)
RETURN BOOLEAN;

FUNCTION FN_PROCESS_INTEREST (p_ref_no     IN lftbs_contract_interest.contract_reference_no%TYPE,
			      p_module     IN oltbs_contract.module_code%type,
			      p_action     IN VARCHAR2,
			      p_vamb_esn   IN lftbs_contract_interest.event_sequence_no%TYPE,
			      p_err_code  OUT Varchar2,
			      p_err_param OUT Varchar2)
RETURN BOOLEAN;

FUNCTION FN_CALCULATE_SKIM
			  (
			   p_reference_no     IN lftbs_contract_interest.Contract_Reference_No%Type,
			   p_module  	      IN oltbs_contract.Module_Code%Type,
			   p_component	      IN lftbs_contract_interest.Component%Type,
			   p_action           IN Varchar2,
			   p_vamb_esn	      IN lftbs_contract_interest.Event_Sequence_No%Type,
			   p_flat_component   IN Boolean,
			   p_from_date        IN Date,
			   p_to_date	      IN Date,
			   p_error_code      OUT Varchar2
			  )
RETURN BOOLEAN;

FUNCTION FN_PROCESS_SKIM
			(
			 p_ref_no    IN lftbs_contract_interest.Contract_Reference_No%Type,
			 p_module    IN oltbs_contract.Module_Code%Type,
			 p_action    IN Varchar2,
			 p_vamb_esn  IN lftbs_contract_interest.Event_Sequence_No%Type
			)
RETURN BOOLEAN;

FUNCTION FN_PROCESS_INT_FOR_A_CONTRACT
				      (p_ref_no   IN lftbs_contract_interest.Contract_Reference_No%Type)
RETURN BOOLEAN;


FUNCTION FN_GET_EFFECTIVE_PROC_DT(p_ref_no 	      IN 	oltbs_contract.contract_ref_no%TYPE,
				  p_component	      IN	lftbs_contract_interest.component%TYPE,
				  p_eff_date	      IN	DATE,
				  p_recalc_dt	     OUT	DATE)
RETURN BOOLEAN;

FUNCTION FN_WRITE_CONT_INTEREST(p_contract_reference_no IN oltbs_computation_handoff.Contract_Ref_No%Type,
				p_component 		IN oltbs_computation_handoff.Component%Type,
				p_effective_date	IN oltbs_computation_handoff.Effective_Date%Type,
				p_rate 			IN oltbs_computation_handoff.Rate%Type
				, p_spread		IN NUMBER DEFAULT NULL
				) --07-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION changes here (Release 7.5 lot2 ITR1 SFR37)
RETURN BOOLEAN;

FUNCTION FN_WRITE_PARTICIPANT_ICCF(p_ty_iccf_hoff IN Ty_Participant_Iccf_hoff)
RETURN BOOLEAN;

FUNCTION FN_PARTICIPANT_INT_PROPAGATION(p_ref_no 	    IN lftbs_contract_interest_master.contract_ref_no%Type,
					p_particpant_ref_no IN lftbs_contract_interest_master.contract_ref_no%Type,
					p_component 	    IN lftbs_contract_interest_master.component%Type,
					p_effective_date    IN Date,
					p_err_code		OUT varchar2,
					p_err_param		OUT varchar2
					)
RETURN BOOLEAN;

FUNCTION FN_MARK_BEGIN_DEPENDENT_COMPS
	   	  		  		   (p_contract_reference_no	IN	lftbs_contract_interest_master.contract_ref_no%type,
						   	p_component				IN	lftbs_contract_interest_master.component%type,
							p_effective_date		IN	lftbs_contract_interest_master.recalc_start_date%type,
							p_maturity_date			IN	oltbs_contract_master.maturity_date%type,
							p_err_param			   OUT	Varchar2)

RETURN BOOLEAN;
FUNCTION FN_UPDATE_PARTICIPANT_DUE(P_contract_ref_no	oltbs_contract_iccf_calc.CONTRACT_REF_NO%TYPE,
				   P_component		oltbs_contract_iccf_calc.COMPONENT%TYPE,
				   P_schedule_date	oltbs_contract_iccf_calc.SCHEDULE_DATE%TYPE )
RETURN BOOLEAN;
-- 17-May-2006 FLEXCUBE V.CL Release 7.0 LOT2 ITR1 SFR#277, done by aji
FUNCTION FN_FETCH_DEPOSIT_RATES
				(
				p_branch    	IN	VARCHAR2,
				p_from_date 	IN	DATE,
				p_to_date   	IN	DATE,
				p_rate_code 	IN	VARCHAR2,
				p_component 	IN	VARCHAR2,
				p_ty_rate      OUT	olpkss_schedules.ty_rate
				)
RETURN BOOLEAN;
-- 17-May-2006 FLEXCUBE V.CL Release 7.0 LOT2 ITR1 SFR#277

--14-AUG-2006 FCC V.CL RELEASE 7.1 Prime loan changes starts
FUNCTION fn_calculate_prime_int
	(
	p_cont_ref_no		IN	oltbs_contract.contract_ref_no%TYPE,
	p_cont_value_dt		IN	DATE,
	p_pmnt_dt		IN	DATE,
	p_component		IN	oltbs_contract_iccf_calc.component%TYPE,
	p_pmnt_amt		IN	oltbs_contract_iccf_calc.calculated_amount%TYPE,
	p_currency		IN	oltbs_contract_iccf_calc.currency%TYPE,
	p_populate_calc		IN	VARCHAR2,
	p_interest_amt		OUT	oltbs_contract_iccf_calc.calculated_amount%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--14-AUG-2006 FCC V.CL RELEASE 7.1 Prime loan changes ends
--27-NOV-2006 FLEXCUBE V.CL RELEASE 7.2 changes for Prime loans
FUNCTION fn_pop_prime_iccf_calc
	(
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	p_component		IN	lftbs_contract_interest.component%TYPE,
	p_principal_amount	IN	oltbs_contract_master.amount%TYPE,
	p_from_date		IN	oltbs_contract_master.value_date%TYPE,
	p_to_date		IN	oltbs_contract_master.value_date%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--27-NOV-2006 FLEXCUBE V.CL RELEASE 7.2 changes for Prime loans
--FLEXCUBE V.CL Release 7.1 FS 17.0 Competitive Participant Bidding 19082006 changes start
FUNCTION fn_participant_pickup
		(p_contract_ref_no   IN lbtbs_contract_master.contract_ref_no%type,
		p_esn								 IN oltbs_contract_master.event_seq_no%type,
		p_value_date         IN DATE,
		p_maturity_date      IN DATE,
		p_currency					 IN lftbs_contract_interest.currency%type,
		p_amount						 IN oltbs_contract_master.amount%type,
		p_rate_code					 IN lftbs_contract_interest.rate_code%type,
		p_event_code				 IN VARCHAR2, --FLEXCUBE V.CL Release 7.1 ITR1 Bidding Changes
		p_errorcode					 OUT ertbs_msgs.err_code%TYPE,
		p_errmsg						 OUT VARCHAR2,
		p_new_crn            IN lbtbs_contract_master.contract_ref_no%TYPE DEFAULT NULL)
RETURN BOOLEAN;

FUNCTION fn_borrower_eff_rate
										(p_contract_ref_no    IN lbtbs_contract_master.contract_ref_no%type,
										 p_component				  IN lftbs_contract_interest.component%type,
										 p_value_date				  IN DATE,
  									 p_dt_rt_tab					OUT lbpks_interest.ty_rate_handoff,
										 p_errorcode				  OUT ertbs_msgs.err_code%TYPE,
										 p_errmsg						  OUT VARCHAR2 ,
										 p_pram_esn						IN lftbs_contract_interest.event_sequence_no%TYPE DEFAULT NULL )
RETURN BOOLEAN;

FUNCTION fn_participant_isr(p_contract_ref_no   IN lbtbs_contract_master.contract_ref_no%type,
														p_component				  IN lftbs_contract_interest.component%type,
														p_value_date				IN DATE,
														p_errorcode				  OUT ertbs_msgs.err_code%TYPE,
														p_errmsg						OUT VARCHAR2 )
RETURN BOOLEAN;

TYPE v_primary_data_bid IS RECORD
					( contract_ref_no      lbtb_contract_participant.contract_ref_no%TYPE,
            event_seq_no         lbtb_contract_participant.event_seq_no%TYPE,
            value_date           lbtb_contract_participant.value_date%TYPE,
            component            lftbs_contract_interest.component%TYPE,
            --rate_code            lftbs_contract_interest.rate_code%TYPE, -- 06-SEP-2006 FLEXCUBE V.CL Release 7.1 FS 17.0 Competitive Participant Bidding by Bincy
            rate_type            lftbs_contract_interest.rate_type%TYPE);

FUNCTION fn_validate_data_bid(
		p_column_data	IN		lbpks_interest.v_primary_data_bid,
		p_table_name	IN		VARCHAR2,
		p_table_data	IN OUT	lbpks_part_file_handle.tb_table_data,
		p_column_name	IN		VARCHAR2,
		p_err_desc		OUT		lbpks_part_file_handle.tb_bug_table,
		err_code			OUT		ERTBS_MSGS.ERR_CODE%TYPE,
		err_msg				OUT		ERTBS_MSGS.MESSAGE%TYPE		)
RETURN BOOLEAN;

FUNCTION fn_validate_participant_bid(
	p_column			IN			lbpks_part_file_handle.tb_table_column,
	p_table_data	IN OUT NOCOPY	lbpks_part_file_handle.tb_dummy_table,
	p_column_data	IN			lbpks_interest.v_primary_data_bid,
	p_row					IN			NUMBER,
	p_table_name	IN			VARCHAR2
)RETURN BOOLEAN;

--FLEXCUBE V.CL Release 7.1 FS 17.0 Competitive Participant Bidding 19082006 changes end
--29-NOV-2007 FLEXCUBE V.CL Release 7.3 ITR1 SFR#40 starts
FUNCTION Fn_calc_prime_norm_interest --This function should be called only for Borrower
	(
	p_contract_ref_no	IN		oltbs_contract.contract_ref_no%TYPE,
	p_value_date		IN      Date,
	p_module			IN      Varchar2,
	p_event_seq_no      IN      Number,
	p_event_code		IN      Varchar2,
	p_error_code		IN OUT	VARCHAR2,
	p_error_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION Fn_rebuild_prime_amt_settled
	(
	p_contract_ref_no	IN		oltbs_contract.contract_ref_no%TYPE,
	p_value_date		IN      Date,
	p_error_code		IN OUT	VARCHAR2,
	p_error_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--29-NOV-2007 FLEXCUBE V.CL Release 7.3 ITR1 SFR#40 ends
--23-Feb-2007 FLEXCUBE V.CL RELEASE 7.2 changes for Prime loans starts
FUNCTION fn_build_prime_amt_settled
	(
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--23-Feb-2007 FLEXCUBE V.CL RELEASE 7.2 changes for Prime loans end
--FCC V.CL Release 7.3 Interest Basis Changes start
FUNCTION FN_DELETE_CONTRACT_INTEREST
	(p_contract_ref_no varchar2,
         p_event_seq_no varchar2,
         p_err_code	varchar2,
	 p_err_param    varchar2)
RETURN BOOLEAN;

FUNCTION FN_POPULATE_CONTRACT_INTEREST
	(
		p_contract_ref_no varchar2 ,
		p_esn Number ,
		p_err_code varchar2 ,
		p_err_param varchar2)
    RETURN BOOLEAN;
--FCC V.CL Release 7.3 Interest Basis Changes end

--FLEXCUBE V.CL Release 7.6 Sighting Fund Changes, 28-Apr-2009 starts
FUNCTION fn_process_part_unfund_int
	(p_borrower_ref_no	IN  lptbs_contract_master.borrower_contract_ref_no%TYPE,
	p_component		IN  lbtbs_propagation_master.component%TYPE,
	p_err_code		OUT VARCHAR2,
	p_err_param		OUT VARCHAR2)
RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.6 Sighting Fund Changes, 28-Apr-2009 ends

--22-MAY-2009 FLEXCUBE V.CL Release 7.6 ITR2 SFR#10 starts
FUNCTION fn_populate_unfund_master
	(p_contract_ref_no	IN oltbs_contract.contract_ref_no%TYPE,
	p_value_date		IN DATE,
	p_err_code		OUT	VARCHAR2,
	p_err_param		OUT	VARCHAR2)
RETURN BOOLEAN;
--22-MAY-2009 FLEXCUBE V.CL Release 7.6 ITR2 SFR#10 ends

--CITIUS-LS#6242 Starts
FUNCTION fn_populate_unfund_detail
	(p_borrower_contract_ref_no	IN oltbs_contract.contract_ref_no%TYPE,
	p_contract_ref_no		IN oltbs_contract.contract_ref_no%TYPE,
	p_value_date			IN DATE,
	p_err_code			OUT	VARCHAR2,
	p_err_param			OUT	VARCHAR2)
RETURN BOOLEAN;
--CITIUS-LS#6242 Ends

PROCEDURE pr_mesg(p_message IN	Varchar2);

--12-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag05 Different Margin for Participants changes start
FUNCTION fn_write_part_interest_details
	(
		pm_contract_ref_no		IN				oltbs_contract.contract_ref_no%TYPE,
		pm_participant				IN				oltbs_contract.counterparty%TYPE,
		pm_component				IN				lftbs_contract_interest_detail.component%TYPE,
		pm_value_date				IN				lftbs_contract_interest_detail.value_date%TYPE,
		pm_error_code				IN OUT		VARCHAR2,
		pm_error_params			IN OUT		VARCHAR2
	)
RETURN BOOLEAN;
--12-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag05 Different Margin for Participants changes end


--OBCL_141_SUPP_#31612307 Starts
FUNCTION fn_write_penalty_rate_details
  (
  p_contract_ref_no IN  oltbs_contract.contract_ref_no%TYPE
  , p_component   IN  lftbs_contract_interest_detail.component%TYPE
  , p_value_date    IN  oltbs_contract_master.value_date%TYPE
  , p_err_code    IN OUT  VARCHAR2
  , p_err_param   IN OUT  VARCHAR2
  )
RETURN BOOLEAN;

--OBCL_141_SUPP_#31612307 ENDS

--OBCL_14.5_LS_PARTICIPANT_BA_RATES Changes starts
FUNCTION Fn_Write_Part_ba_Interest_Details(Pm_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                          Pm_Participant     IN Oltbs_Contract.Counterparty%TYPE,
                                          Pm_Component       IN Lftbs_Contract_Interest_Detail.Component%TYPE,
                                          Pm_Value_Date      IN Lftbs_Contract_Interest_Detail.Value_Date%TYPE,
                                          Pm_Error_Code      IN OUT VARCHAR2,
                                          Pm_Error_Params    IN OUT VARCHAR2)
										  return boolean ;
--OBCL_14.5_LS_PARTICIPANT_BA_RATES Changes	ends
										  
END lbpks_interest;
/
CREATE or replace SYNONYM lbpkss_interest FOR lbpks_interest
/