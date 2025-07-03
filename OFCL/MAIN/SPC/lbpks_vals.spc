CREATE OR REPLACE PACKAGE lbpks_vals
AS
/*------------------------------------------------------------------------------
** File Name		: lbpks_vals.SPC
**
** Module		: LOANS SYNDICATION
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
------------------------------------------------------------------------------
*/
/*
CHANGE HISTORY
23-DEC-2004 Flexcube V.CL Release 7.0	Added new package for CITI-LS Phase II dev

11-JAN-2006 Flexcube V.CL Release 7.0 Holiday Treatment Related Changes By Aji 
		FOLLOWING FUNCTIONS ARE ADDED FOR HOLIDAY PROCESSING 
		1) fn_validate_value_maturity_dt - This function will do Holiday processing for Value Date 
			and Maturity Date for Facility, Tranche and Drawdown contracts, based on the Holiday preferences
			maintained for the Contract.
		2) fn_validate_schedule_dates-
			This function will validate the user defined schedule dates and return the final schedule dates 
			by considering all the currency holidays.
		3) fn_get_working_day -
			This function will derive Rate Fixing date / Drawdown Notice date for Drawdown contracts,
			it will fetch the Rate Fixing days and Holiday currency list maintained for the Tranche contract
			and arrive at the Rate Fixing date / Drawdown Notice date, which is `n¿ working days prior to 
			the Value date for all the Holiday XXCURRENCIES involved.

		4) fn_get_tenor_working_day -
			This function will return the working day based on the tenor frequency and tenor unit
			considering holiday currency list maintained for the tranche contract.

		5) fn_get_tenor_working_day - this is overloaded function
			For a given Source date and Tenor, it will derive the Final date and
			do the Holiday validation based on the holiday type as follows:
			If holiday type is CCY - will do holiday validation for the given Currency code
			If holiday type is LCY - will do holiday validatino for the given Branch code.
19-JAN-2006 Flexcube V.CL Release 7.0 chnages for standard tenor

		
-------------------------------------------------------------------------------------------------------------------------
*/

--CREATE OR REPLACE PACKAGE olpks_vals
--AS
TYPE ty_schedule_date is TABLE of date
	INDEX BY BINARY_INTEGER;

  FUNCTION fn_validate_drawdown_amount(
     							p_tranche_ref_no IN VARCHAR2,
     							p_drawdown_product IN VARCHAR2,
     							p_drawdown_customer IN VARCHAR2,
     							p_drawdown_incr_amt IN NUMBER,
     							p_drawdown_ccy IN VARCHAR2,
     							p_error_code IN OUT VARCHAR2,
     							p_error_prm IN OUT VARCHAR2)
  RETURN BOOLEAN;
  FUNCTION fn_check_component_ratio(
     						p_contract_ref_no  IN  lbtbs_contract_participant.contract_ref_no%TYPE,
                 				p_version_no       IN  NUMBER,
						--	 p_event_seq_no     IN  lbtbs_contract_participant.event_seq_no%TYPE,    
						--	 p_contract_type    IN  lbtbs_contract_participant.contract_type%TYPE,   
						--	 p_drawdown_no      IN  lbtbs_contract_participant.drawdown_no%TYPE,     
						--	 p_product_code     IN  lbtbs_participant_components.product_code%TYPE,  
						--	 p_component	      OUT lbtbs_participant_components.component%TYPE    
		 				p_error_code       IN OUT VARCHAR2,
 		 				p_error_param      IN OUT VARCHAR2)
  RETURN BOOLEAN;

 -- 11-JAN-2006 Flexcube V.CL Release 7.0 Holiday Treatment Related Changes By Aji Starts Here
 FUNCTION fn_validate_value_maturity_dt(
							p_contract_ref_no		IN	oltbs_contract.contract_ref_no%type,
		 					p_validation_type		IN	varchar2,
		 					p_source_date		IN	DATE,
		 					p_holiday_status		OUT	varchar2,
		 					p_working_date		OUT	DATE,
		 					p_error_code		OUT	Varchar2)
 return boolean; 


 FUNCTION fn_validate_schedule_dates(
						p_contract_Ref_no		IN	oltbs_contract.contract_ref_no%type,
						p_value_date		IN	DATE,
						p_maturity_date		IN	DATE,
						p_schedule_type		IN    varchar2,
						p_schedule_date		IN	lbpks_vals.ty_schedule_date,
						p_final_schedule_date	OUT	lbpks_vals.ty_schedule_date,
						p_error_code		OUT	varchar2,
						p_error_param		OUT  	varchar2)
 return boolean;

 FUNCTION fn_get_working_day(
					p_tranche_ref_no		IN	oltbs_contract.contract_ref_no%type,
					p_drawdown_currency	IN	VARCHAR2,
					p_source_date		IN	DATE,
         				p_usage 			IN 	VARCHAR2,
					p_working_date		OUT	DATE,
					p_error_code		OUT   VARCHAR2)
 return BOOLEAN;
 -- 11-JAN-2006 Flexcube V.CL Release 7.0 Holiday Treatment Related Changes By Aji Ends Here

/*FUNCTION fn_get_tenor_working_day
				(p_tranche_ref_no	IN	oltbs_contract.contract_ref_no%type,
				 p_drawdown_currency		IN	oltbs_contract.contract_ccy%type,
				 p_source_date		IN	DATE,
				 p_tenor_frequency	IN	VARCHAR2,
				 p_tenor_unit		IN	NUMBER,
         			 p_usage 		IN 	VARCHAR2,
				 p_working_date		OUT	DATE,
				 p_error_code		OUT   VARCHAR2)

RETURN BOOLEAN;*/ -- Sulav Already there

FUNCTION fn_get_tenor_working_day
				(p_source_date		IN	DATE,
				 p_holiday_type		IN    VARCHAR2,  --- LCL/CCY
				 p_holiday_key		IN    VARCHAR2,  --- Branch code/Currency Code
				 p_next_prev		IN	VARCHAR2,  --- N: Next Working day, P: Previous Working day
				 p_tenor_frequency	IN	VARCHAR2,
				 p_tenor_unit		IN	NUMBER,
				 p_working_date		OUT	DATE,
				 p_error_code		OUT   VARCHAR2)

RETURN BOOLEAN;



FUNCTION fn_month_end_dates
		(
			p_date		IN	DATE
		,	p_nom		  IN	NUMBER
		,	p_from_dt	OUT	DATE
		,	p_to_dt		OUT	DATE
		)
RETURN BOOLEAN;



FUNCTION FN_SAVE (p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE
			,p_action_code		IN		VARCHAR2
			,p_module			IN		VARCHAR2
			,p_cont_sch_type		IN		oltbs_contract_preference.contract_schedule_type%TYPE
			,p_advices_action		IN	OUT	VARCHAR2
			,p_iccf_pickup		IN		VARCHAR2
			,p_charge_pickup		IN		VARCHAR2   -- NEW ICCF CHANGES
			,p_tax_pickup		IN		VARCHAR2
			,p_settle_pickup		IN		VARCHAR2
			,p_brokerage_pickup 	IN		VARCHAR2
			,p_prm_tax			IN		VARCHAR2
			,p_prm_brokerage		IN		VARCHAR2
			,p_err_codes		IN	OUT	VARCHAR2
			,p_params			IN	OUT	VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_chk_mandatory (p_cont_ref_no	IN		oltbs_contract.contract_ref_no%TYPE
				,p_maturity_type	IN		oltbs_contract_master.maturity_type%TYPE
				,p_action_code	IN		VARCHAR2
				,p_err_codes	IN	OUT	VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_check_iccf (p_cont_ref_no	IN		oltbs_contract.contract_ref_no%TYPE
				,p_cont_sch_type	IN		oltbs_contract_preference.contract_schedule_type%TYPE
				,p_branch		IN		oltms_branch.branch_code%TYPE
				,p_ldtb_contract	IN		oltbs_contract_master%ROWTYPE
				,p_err_codes	IN	OUT	VARCHAR2
				,p_params		IN	OUT	VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_pickup (p_cont_ref_no	IN		oltbs_contract.contract_ref_no%TYPE
			,p_esn		IN		oltbs_contract.latest_event_seq_no%TYPE
			,p_event_code	IN		oltbs_contract.curr_event_code%TYPE
			,p_module		IN		VARCHAR2
			,p_action_code	IN		VARCHAR2
			,p_iccf_pickup	IN		VARCHAR2
			,p_charge_pickup	IN		VARCHAR2   -- NEW ICCF CHANGES
			,p_tax_pickup	IN		VARCHAR2
			,p_settle_pickup	IN		VARCHAR2
			,p_brokerage_pickup IN		VARCHAR2
			,p_prm_tax		IN		VARCHAR2
			,p_prm_brokerage	IN		VARCHAR2
			,p_broker		IN		oltbs_contract_master.broker_code%TYPE
			,p_ccy		IN		oltbs_contract_master.currency%TYPE
			,p_amount		IN		oltbs_contract_master.amount%TYPE
			,p_lcy_amount	IN		oltbs_contract_master.lcy_amount%TYPE
			,p_value_date	IN		oltbs_contract_master.value_date%TYPE
			,p_err_code		IN	OUT	VARCHAR2
			,p_err_params	IN	OUT	VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_get_ref_no (p_branch	IN		oltbs_contract.BRANCH%TYPE
			,p_product		IN		oltbs_contract.PRODUCT_CODE%TYPE
			,p_book_date	IN		oltbs_contract.BOOK_DATE%TYPE
			,p_serial		IN	OUT	VARCHAR2    --NUMBER
			,p_ref_no		IN	OUT	oltbs_contract.CONTRACT_REF_NO%TYPE
			,p_err_code		IN	OUT	VARCHAR2) 
RETURN BOOLEAN;

FUNCTION fn_get_template (p_ref_no	IN		oltbs_contract.CONTRACT_REF_NO%TYPE
			,p_serial		IN	OUT	VARCHAR2   --NUMBER
			,p_new_ref_no	IN	OUT	oltbs_contract.CONTRACT_REF_NO%TYPE
			,p_err_code		IN	OUT	VARCHAR2) 
RETURN BOOLEAN;


FUNCTION fn_pop_rvr_comps(
			p_contract_ref_no		IN 	oltbs_contract.CONTRACT_REF_NO%TYPE
		,	p_esn				IN 	oltbs_contract.latest_event_seq_no%TYPE
		,	p_version			IN	oltbs_contract_master.version_no%TYPE
		,	p_split_no			IN 	oltbs_contract_roll_int_rates.split_no%TYPE := 1 --04-MAR-2003 CITIPLC LS change 
	)	
RETURN BOOLEAN;



FUNCTION fn_check_principal_amount
	(
	p_cont_brn_code		IN		oltms_prod_ccy_params.branch_code%TYPE,
	p_prod_type			IN		oltms_prod_ccy_params.product_type%TYPE,
	p_cont_prod			IN		oltms_prod_ccy_params.product_code%TYPE,
	p_cont_ccy			IN		oltms_prod_ccy_params.ccy_code%TYPE,
	p_prn_amt 			IN		oltbs_contract_master.amount%TYPE,
	p_errcode			IN OUT	VARCHAR2,
	p_errparam			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_cluster_validations( p_amount  		IN 	number,
	     				   p_cluster_id	      IN	OLTM_CLUSTER_DETAILS.cluster_id%TYPE,
	     				   p_ccy			IN 	OLTM_CLUSTER_DETAILS.currency%TYPE,
	     				   p_type		      IN	CHAR,
					   p_corr_amt		OUT	OLTM_CLUSTER_DETAILS.min_booking_amt%TYPE,
					   perrorcode		IN OUT varchar2,
					   perrorparam		IN OUT varchar2)
RETURN BOOLEAN;

FUNCTION fn_get_tenor_working_day
				(p_tranche_ref_no		IN	oltbs_contract.contract_ref_no%TYPE,
				 p_drawdown_currency	IN	oltbs_contract.contract_ccy%TYPE,
				 p_source_date		IN	DATE,
				 p_tenor_frequency	IN	VARCHAR2,
				 p_tenor_unit		IN	NUMBER,
         			 p_usage 			IN 	VARCHAR2,
				 p_working_date		OUT	DATE,
				 p_error_code		OUT   VARCHAR2)

RETURN BOOLEAN; 

FUNCTION FN_GET_ACCR_DATE(P_REF_NO      IN oltbs_contract.contract_ref_no%TYPE,
		    	p_component  IN LFTB_CONTRACT_FEE.component%TYPE,
			p_processing_date IN DATE,
			p_fee_start_date  IN lftbs_contract_fee.start_date%TYPE,
   			P_accrual_freq	  	    IN  lftms_product_fee.accrual_frequency%TYPE,
   			P_accr_freq_units 	  IN lftms_product_fee.accr_freq_units%TYPE ,
   			P_last_accr_date	  IN DATE,
   			P_accr_due_date  OUT  DATE ,
   			p_error_code         OUT VARCHAR2,
			p_error_parameter OUT VARCHAR2) 
RETURN BOOLEAN ;

--Flexcube V.CL Release 7.0 chnages for standard tenor START 
FUNCTION fn_is_std_tenor
		(
			p_branch	                  IN	   VARCHAR2
		,	p_currency		              IN	   VARCHAR2
		,	p_contract_refno            IN	   VARCHAR2
		,	p_rate_code	                IN	   VARCHAR2
		,	p_basis_amount	            IN	   NUMBER
		,	p_borrow_lend_ind	          IN	   VARCHAR2
		,	p_from_dt		                IN	   DATE
		,	p_to_dt		                  IN	   DATE
		,	p_is_std_tenor	            OUT	   VARCHAR2
		,	p_tenor_and_unit            IN OUT VARCHAR2
		,	p_err		                    IN OUT VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION fn_ccyhol_newdt
                                      (
                                       p_contract_ref_no  IN    oltbs_contract.contract_ref_no%type,
                                       p_currency         IN    VARCHAR2,
                                       p_value_date       IN    DATE,     
                                       p_new_date         OUT   DATE,
                                       p_err              OUT   VARCHAR2
                                       )
         return BOOLEAN;

--Flexcube V.CL Release 7.0 chnages for standard tenor END

END lbpks_vals;
/
create or replace synonym lbpkss_vals for lbpks_vals
/