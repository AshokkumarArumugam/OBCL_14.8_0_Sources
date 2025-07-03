CREATE OR REPLACE PACKAGE olpks_vals
AS
/*----------------------------------------------------------------------------------------------------
  **
  ** File Name	: olpks_vals.SPC
  **
  ** Module	: Loans and deposits
  **
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
/*
CHANGE HISTORY
04-SEP-2001 FCC3.8  new ICCF CHANGES FOR LD/MM Module
			  new in param p_charge_pickup is added in the fns fn_save and fn_pickup

16/NOV/2001 FCCV3.8 type of serial no has been changed to Varchar2 from Number
in fn_get_template and fn_get_ref_no.

11/APR/2002  FCC 4.0 june 02 Rollover Changes.
		Added the function fn_pop_rvr_comps

04-MAR-2003 FCC4.2 APR 2003 CITIPLC changes for Rollover
		Added default parameter p_split_no to fn_pop_rvr_comps

23-APR-2003 FCC 4.2 OPS Changes Added fn_check_principal_amount to check min and max
		amount for the contract.
16-JUL-2003 FCC 4.3 AUG 2003 CEEMEA changes for TIDE -- Added function fn_cluster_validations
1-SEP-2005	FCC 4.6.2 COPY RIGHT changes
25-JUN-2008 FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-913 changes by sweta Propagation of facility name from commitment to linked loans.
10-mar-2009 FCC V.CL Release 7.5 Lot1 FS TAG 12 New function FN_CHECK_BLOCKAGE is added to check the VD of loan operation with attached commitment blockage period
			New FN_VERIFY_LINKED_CONTRACT is added to check the FWD event's on linked loan contract's if blockage parameter is changed
			New function FN_CHECK_MATURITY_DT is added to check the blockage of maturity date of linked loan contract for which rollover is allowed
			if commitment blockage parameters are modified
14-may-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag 12 Overpayment changes. New function fn_validate_overpayment is added
22-jul-2009 FLEXCUBE V.CL Release 7.5 lot2 RT SFR#43, New function fn_overpayment_exists is added to check if refund has to be done b4 next payment on the component
19-Apr-2010 FLEXCUBE V.CL Release 7.6 ITR1 SFR#1 TILL#2041 CHANGES  Function fn_validate_linked_commitment is added
30-DEC-2011 Flexcube V.CL Release 7.10,FS Volume02 Tag15 Changes
			Re-Amortization Changes : New function added to validate the Reamort inputs.
25-APR-2012 Flexcube V.CL Release 7.11,FS Volume-01 Tag14 Pool Funds Functionality Changes - Added 2 new functions fn_get_pool_ba and fn_validate_pool_bal.
19-JUN-2012 Flexcube V.CL Release 7.11 IUT SFR#49,While attaching a pool or master funding ref no, the current contract amount is also calculated while validating pool balance.
*/	


--CREATE OR REPLACE PACKAGE olpks_vals
--AS

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

--FCC 4.0 june 02 Rollover Changes STARTS
FUNCTION fn_pop_rvr_comps(
			p_contract_ref_no		IN 	oltbs_contract.CONTRACT_REF_NO%TYPE
		,	p_esn				IN 	oltbs_contract.latest_event_seq_no%TYPE
		,	p_version			IN	oltbs_contract_master.version_no%TYPE
		,	p_split_no			IN 	oltbs_contract_roll_int_rates.split_no%TYPE := 1 --04-MAR-2003 CITIPLC LS change
	)
RETURN BOOLEAN;

--FCC 4.0 june 02 Rollover Changes

-- FCC4.2 OPS # 304 Changes Start

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

-- FCC4.2 OPS # 304 Changes End

--16-JUL-2003 FCC 4.3 AUG 2003 CEEMEA changes for TIDE start

FUNCTION fn_cluster_validations( p_amount  		IN 	number,
	     				   p_cluster_id	      IN	OLTM_CLUSTER_DETAILS.cluster_id%TYPE,
	     				   p_ccy			IN 	OLTM_CLUSTER_DETAILS.currency%TYPE,
	     				   p_type		      IN	CHAR,
					   p_corr_amt		OUT	OLTM_CLUSTER_DETAILS.min_booking_amt%TYPE,
					   perrorcode		IN OUT varchar2,
					   perrorparam		IN OUT varchar2)
RETURN BOOLEAN;
--16-JUL-2003 FCC 4.3 AUG 2003 CEEMEA changes for TIDE end

-- FCC 4.6.2 CITI FEE CHANGES START BY KISHORE FOR FEE ACCRUAL - 03.07.05
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
-- FCC 4.6.2 CITI FEE CHANGES END BY KISHORE FOR FEE ACCRUAL - 03.07.05

-- FCC 4.6.2 CITI FEE CHANGES START BY KISHORE FOR FEE ACCRUAL - 05.07.05
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
-- FCC 4.6.2 CITI FEE CHANGES END BY KISHORE FOR FEE ACCRUAL - 05.07.05
--FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-913 changes start
FUNCTION FN_PROP_FACILITY_NAME(p_contract_ref 	IN 	oltbs_contract.contract_ref_no%type,
							   p_facility_name 	IN 	oltbs_contract_master.facility_name%type,
							   p_error_code 	OUT	varchar2)
RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-913 changes end.

-- FCC V.CL Release 7.5 Lot1 FS TAG 12 start
FUNCTION FN_CHECK_BLOCKAGE(p_contract_ref 	IN 	oltbs_contract.contract_ref_no%type,
			   p_value_date 	IN 	oltbs_contract_master.value_date%type,
			   p_linkage_blokced    OUT	varchar2,
			   p_from    		OUT	varchar2,
			   p_to    		OUT	varchar2,
			   p_error_code 	OUT	varchar2)
RETURN BOOLEAN;

FUNCTION FN_VERIFY_LINKED_CONTRACT (p_commitment_ref  oltbs_contract.contract_ref_no%type,
                                   p_error OUT VARCHAR2,
                                   p_param OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION FN_CHECK_MATURITY_DT (p_contract_ref 	oltbs_contract.contract_ref_no%type, --loan no
							   p_product_type	IN oltbs_contract.product_type%type,
				         	   p_prin_outstanding IN   oltbs_contract_balance.principal_outstanding_bal%type,
							   p_maturity_date 	IN 	oltbs_contract_master.value_date%type,
							   p_err_param    OUT	varchar2,
							   p_error_code 	OUT	varchar2)
RETURN BOOLEAN;

-- FCC V.CL Release 7.5 Lot1 FS TAG 12 end

-- FLEXCUBE V.CL Release 7.5 lot2 FS Tag 12 Overpayment  start
FUNCTION fn_validate_overpayment
                (p_contract_ref  IN	oltbs_contract.contract_ref_no%type,
                 p_ccy         IN   oltbs_contract.contract_ccy%type,
			     p_component IN   oltbs_amount_due.component%type,
			     p_component_type	IN 	oltbs_amount_due.component_type%type,
                 p_pmt_due   IN   oltbs_amount_due.amount_settled%type,
				 p_pmt_value_dt	IN DATE,
				 p_pmt_limit_date IN DATE,
                 p_amount_paid     IN   oltbs_amount_due.amount_settled%type,
                 p_error_code 	OUT	varchar2,
				 p_err_param    OUT	varchar2
				)
RETURN BOOLEAN;
-- FLEXCUBE V.CL Release 7.5 lot2 FS Tag 12 Overpayment end
--FLEXCUBE V.CL Release 7.5 lot2 RT SFR#43 changes start
FUNCTION fn_overpayment_exists
       (p_contract_ref  IN	oltbs_contract.contract_ref_no%type,
        p_component IN   oltbs_amount_due.component%type,
        p_error_code 	OUT	varchar2
        )
RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.5 lot2 RT SFR#43 changes End
--19-Apr-2010 FLEXCUBE V.CL Release 7.6 ITR1 SFR#1 TILL#2041 CHANGES starts
FUNCTION fn_validate_linked_commitment
		(
			p_contract_ref	IN	oltbs_contract.contract_ref_no%type,
			p_value_date	IN	OLTB_CONTRACT_MASTER.value_date%type,
			p_event_date	OUT	DATE
		)
RETURN BOOLEAN;
--19-Apr-2010 FLEXCUBE V.CL Release 7.6 ITR1 SFR#1 TILL#2041 CHANGES ends

--30-DEC-2011 Flexcube V.CL Release 7.10,FS Volume02 Tag15 ChangesStarts
FUNCTION fn_validate_reamort(	p_rec_ldmaster_prev	IN	oltbs_contract_master%ROWTYPE
			    ,	p_rec_amend_due		IN	oltbs_contract_amend_due%ROWTYPE
			    ,	p_iccf_changed 		IN 	VARCHAR2
			    ,	p_error_code		IN OUT	Varchar2
			    ,	p_error_param		IN OUT	Varchar2
			    )
RETURN BOOLEAN;
--30-DEC-2011 Flexcube V.CL Release 7.10,FS Volume02 Tag15 Changes Ends
--25-APR-2012 Flexcube V.CL Release 7.11,FS Volume-01 Tag14 Pool Funds Functionality Changes Starts
FUNCTION fn_get_pool_bal
	(	p_funding_ref_no	IN 	oltms_pool_funding_master.funding_ref_no%TYPE
	,	p_pool_available_amount OUT 	oltms_pool_funding_master.funding_amount%TYPE
	,	p_error_code		OUT 	VARCHAR2
	,	p_error_param		OUT 	VARCHAR2
	)	
RETURN BOOLEAN;

FUNCTION fn_validate_pool_bal
		(					
			p_contract_ref_no		IN  oltbs_contract_master.contract_ref_no%TYPE --19-JUN-2012 Flexcube V.CL Release 7.11 IUT SFR#49 Changes
		,	p_pool_funding_refno		IN  oltms_pool_funding_master.funding_ref_no%TYPE
		,	p_master_funding_refno		IN  oltms_pool_funding_master.funding_ref_no%TYPE
		,	p_contract_amount		IN  oltbs_contract_master.amount%TYPE		
		,	p_error_code		 	OUT VARCHAR2
		,	p_error_param		 	OUT VARCHAR2
		)
RETURN BOOLEAN;
--25-APR-2012 Flexcube V.CL Release 7.11,FS Volume-01 Tag14 Pool Funds Functionality Changes Ends
END olpks_vals;
/
CREATE OR REPLACE SYNONYM olpkss_vals for olpks_vals
/