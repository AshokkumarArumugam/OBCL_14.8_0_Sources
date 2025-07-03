CREATE OR REPLACE PACKAGE lfpks_referral
IS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : lfpks_referral
**
** Module       : INTEREST, COMMISSION, CHARGES, FEES (ICCF)
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
CHANGE_HISTORY

30-JUN-2003	FCC 4.3 DEV AUG 2003 STG Changes
			Data type for ty_component is changed to be of lftbs_contract_charges.component%TYPE. This is
			because, with the application of charge classes, a length of 15 would be required to store
			component i.e.(component||'_LIQD') for charges.
29-NOV-2003	FCC 4.4 Dec 2003 Negative Interest Rate Changes		
20-NOV-2004 FCC 4.6.1 DEC 2004 EIM Enhancements changes - Special processing for DISC or PREM amount tag
- FCC 4.6.1 JAN 2005 ITR-1 SFR-196 For changing copyright clause / release name
CHANGE_HISTORY

 **Changed By         : Vineeth T M
**Date               : 30-Jul-2024
**Change Description : OBCL_14.8_VER_ROL Changes
**Search String      : OBCL_14.8_VER_ROL Changes  
*/


FUNCTION fn_product_component_details
	(
	p_product 				IN 	lftms_product_iccf.product%TYPE,
	p_component 			IN 	lftms_product_iccf.component%TYPE,
	p_event  				OUT lftms_product_iccf.event%TYPE,
	p_basis_amount_type  	OUT lftms_product_iccf.basis_amount_type%TYPE,
	p_basis_amount_category OUT	lftms_product_iccf.basis_amount_category%TYPE,
	p_accrual_required  	OUT lftms_product_iccf.accrual_required%TYPE,
	p_accrual_currency  	OUT lftms_product_iccf.accrual_currency%TYPE,
	p_rate_type 			OUT lftms_product_iccf.rate_type%TYPE,
	p_rate_code_usage  		OUT lftms_product_iccf.rate_code_usage%TYPE,
	p_rate_code  			OUT lftms_product_iccf.rate_code%TYPE,
	p_stop_application  	OUT lftms_product_iccf.stop_application%TYPE,
	p_settlement_currency  	OUT lftms_product_iccf.settlement_currency%TYPE,
	p_prev_product 			in lftms_product_iccf.product%type default null --OBCL_14.8_VER_ROL Changes
	)
RETURN BOOLEAN;

FUNCTION fn_product_complete
	(
	p_product 					IN lftms_product_iccf.product%TYPE,
	p_ts_component  			OUT VARCHAR2,
	p_ts_event  				OUT VARCHAR2,
	p_ts_basis_amount_type  	OUT VARCHAR2,
	p_ts_basis_amount_category  OUT VARCHAR2,
	p_ts_accrual_required  		OUT VARCHAR2,
	p_ts_accrual_currency  		OUT VARCHAR2,
	p_ts_rate_code  			OUT VARCHAR2,
	p_ts_rate_code_usage  		OUT VARCHAR2,
	p_ts_stop_application  		OUT VARCHAR2,
	p_ts_settlement_currency  	OUT VARCHAR2
	)
RETURN BOOLEAN;

function fn_contract_component_detail
	(
	p_contract_ref_no 			IN lftbs_contract_interest.contract_reference_no%TYPE,
	p_event_seq_no 				IN lftbs_contract_interest.event_sequence_no%TYPE,
	p_component  				IN lftbs_contract_interest.component%TYPE,
	p_all_pickup 				IN CHAR,
	p_status   					OUT VARCHAR2,
	p_waive   					OUT VARCHAR2,
	p_value_date   				OUT VARCHAR2,
	p_acquired_amount   		OUT VARCHAR2,
	p_accrual_required  		OUT VARCHAR2,
	p_accrual_ccy   			OUT VARCHAR2,
	p_interest_basis  			OUT VARCHAR2,
	p_rate  					OUT VARCHAR2,
	p_rate_code  				OUT VARCHAR2,
	p_rate_type  				OUT VARCHAR2,
	p_spread  					OUT VARCHAR2,
	p_amount  					OUT VARCHAR2,
	p_currency 					OUT VARCHAR2,
	p_penalty_type  			OUT VARCHAR2,
	p_collection_period 		OUT VARCHAR2,
	p_rate_period  				OUT VARCHAR2,
	p_payment_type  			OUT VARCHAR2,
	p_calculation_method		OUT VARCHAR2,
	p_stop_date  				OUT VARCHAR2,
	p_pickup_event_seq_no 		OUT VARCHAR2,
	p_processed_event_seq_no 	OUT VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_contract_complete
	(
	p_contract_ref_no 			IN lftbs_contract_interest.contract_reference_no%TYPE,
	p_event_seq_no 				IN lftbs_contract_interest.event_sequence_no%TYPE,
	p_all_pickup 				IN CHAR,
	p_ts_component  			OUT VARCHAR2,
	p_ts_status   				OUT VARCHAR2,
	p_ts_waive   				OUT VARCHAR2,
	p_ts_value_date   			OUT VARCHAR2,
	p_ts_acquired_amount   			OUT VARCHAR2,
	p_ts_accrual_required   		OUT VARCHAR2,
	p_ts_accrual_ccy   			OUT VARCHAR2,
	p_ts_rate  				OUT VARCHAR2,
	p_ts_rate_code  			OUT VARCHAR2,
	p_ts_spread  				OUT VARCHAR2,
	p_ts_amount  				OUT VARCHAR2,
	p_ts_currency 				OUT VARCHAR2,
	p_ts_interest_basis  			OUT VARCHAR2,
	p_ts_penalty_type  			OUT VARCHAR2,
	p_ts_collection_period  		OUT VARCHAR2,
	p_ts_rate_period  			OUT VARCHAR2,
	p_ts_payment_type  			OUT VARCHAR2,
	p_ts_calculation_method  		OUT VARCHAR2,
	p_ts_stop_date  			OUT VARCHAR2 ,
	p_ts_pickup_event_seq_no 		OUT VARCHAR2,
	p_ts_processed_event_seq_no 		OUT VARCHAR2,
	p_ts_rate_sign				OUT VARCHAR2
	)
RETURN BOOLEAN ;

--30-JUN-2003 FCC 4.3 DEV AUG 2003 STG CHANGES BEGIN
--type ty_component is table of
--	lftbs_contract_interest.component%type  INDEX BY BINARY_INTEGER;
TYPE ty_component IS TABLE OF
	lftbs_contract_charges.component%type INDEX BY BINARY_INTEGER;
--30-JUN-2003 FCC 4.3 DEV AUG 2003 STG CHANGES END

TYPE ty_status IS TABLE OF
	lftbs_contract_interest.status%TYPE  INDEX BY BINARY_INTEGER;
TYPE ty_waive IS TABLE OF
	lftbs_contract_interest.waiver%TYPE  INDEX BY BINARY_INTEGER;
TYPE ty_value_date IS TABLE OF
	lftbs_contract_interest.value_date%TYPE  INDEX BY BINARY_INTEGER;
TYPE ty_acquired_amount IS TABLE OF
	lftbs_contract_interest.acquired_amount%TYPE  INDEX BY BINARY_INTEGER;
TYPE ty_accrual_required IS TABLE OF
	lftbs_contract_interest.accrual_required%TYPE  INDEX BY BINARY_INTEGER;
TYPE ty_accrual_ccy IS TABLE OF
	lftbs_contract_interest.accrual_ccy%TYPE  INDEX BY BINARY_INTEGER;
TYPE ty_interest_basis IS TABLE OF
	lftbs_contract_interest.interest_basis%TYPE  INDEX BY BINARY_INTEGER;
TYPE ty_rate_code IS TABLE OF
	lftbs_contract_interest.rate_code%TYPE  INDEX BY BINARY_INTEGER;
TYPE ty_rate IS TABLE OF
	lftbs_contract_interest.rate%TYPE  INDEX BY BINARY_INTEGER;
TYPE ty_spread IS TABLE OF
	lftbs_contract_interest.spread%TYPE  INDEX BY BINARY_INTEGER;
TYPE ty_amount IS TABLE OF
	lftbs_contract_interest.amount%TYPE  INDEX BY BINARY_INTEGER;
TYPE ty_collection_period IS TABLE OF
	lftbs_contract_commission.collection_period%TYPE  INDEX BY BINARY_INTEGER;
TYPE ty_rate_period IS TABLE OF
	lftbs_contract_commission.rate_period%TYPE  INDEX BY BINARY_INTEGER;
TYPE ty_payment_type IS TABLE OF
	lftbs_contract_commission.payment_type%TYPE  INDEX BY BINARY_INTEGER;
TYPE ty_calculation_method IS TABLE OF
	lftbs_contract_commission.calculation_method%TYPE  INDEX BY BINARY_INTEGER;
TYPE ty_stop_date IS TABLE OF
	lftbs_contract_commission.stop_date%TYPE  INDEX BY BINARY_INTEGER;
TYPE ty_penalty_type IS TABLE OF
	lftbs_contract_interest.penalty_type%TYPE INDEX BY BINARY_INTEGER;
TYPE ty_currency IS TABLE OF
	lftbs_contract_interest.currency%TYPE INDEX BY BINARY_INTEGER;
TYPE ty_processed_event_seq_no IS TABLE OF
	lftbs_contract_interest.event_sequence_no%TYPE
	INDEX BY BINARY_INTEGER;
TYPE ty_pickup_event_seq_no IS TABLE OF
	lftbs_contract_interest.pickup_event_sequence_no%TYPE INDEX BY BINARY_INTEGER;

FUNCTION fn_contract_complete
	(
	p_contract_ref_no 			IN lftbs_contract_interest.contract_reference_no%TYPE,
	p_event_seq_no 				IN lftbs_contract_interest.event_sequence_no%TYPE,
	p_all_pickup 				IN CHAR,
	p_component 				IN OUT ty_component,
	p_status 					IN OUT ty_status,
	p_waive 					IN OUT ty_waive,
	p_value_date 				IN OUT ty_value_date,
	p_acquired_amount  			IN OUT ty_acquired_amount,
	p_accrual_required  		IN OUT ty_accrual_required,
	p_accrual_ccy  				IN OUT ty_accrual_ccy,
	p_interest_basis 			IN OUT ty_interest_basis,
	p_rate 						IN OUT ty_rate,
	p_rate_code 				IN OUT ty_rate_code,
	p_spread 					IN OUT ty_spread,
	p_amount 					IN OUT ty_amount,
	p_currency 					IN OUT ty_currency,
	p_collection_period 		IN OUT ty_collection_period,
	p_rate_period 				IN OUT ty_rate_period,
	p_payment_type 				IN OUT ty_payment_type,
	p_calculation_method 		IN OUT ty_calculation_method,
	p_stop_date 				IN OUT ty_stop_date ,
	p_penalty_type 				IN OUT ty_penalty_type,
	p_pickup_event_seq_no 		IN OUT ty_pickup_event_seq_no,
	p_processed_event_seq_no 	IN OUT ty_processed_event_seq_no,
	p_count 					IN OUT NUMBER
	)
RETURN BOOLEAN;

FUNCTION fn_contract_complete
	(
	p_contract_ref_no 			IN 	lftbs_contract_interest.contract_reference_no%TYPE,
	p_event_seq_no 				IN 	lftbs_contract_interest.event_sequence_no%TYPE,
	p_all_pickup 				IN 	CHAR,
	p_ts_component  			OUT 	VARCHAR2,
	p_ts_status   				OUT 	VARCHAR2,
	p_ts_waive   				OUT 	VARCHAR2,
	p_ts_value_date   			OUT 	VARCHAR2,
	p_ts_acquired_amount   			OUT 	VARCHAR2,
	p_ts_accrual_required   		OUT 	VARCHAR2,
	p_ts_accrual_ccy   			OUT 	VARCHAR2,
	p_ts_rate  				OUT 	VARCHAR2,
	p_ts_rate_code  			OUT 	VARCHAR2,
	p_ts_spread  				OUT 	VARCHAR2,
	p_ts_amount  				OUT 	VARCHAR2,
	p_ts_currency 				OUT 	VARCHAR2,
	p_ts_interest_basis  			OUT 	VARCHAR2,
	p_ts_penalty_type  			OUT 	VARCHAR2,
	p_ts_collection_period  		OUT 	VARCHAR2,
	p_ts_rate_period  			OUT 	VARCHAR2,
	p_ts_payment_type  			OUT 	VARCHAR2,
	p_ts_calculation_method  		OUT 	VARCHAR2,
	p_ts_stop_date  			OUT 	VARCHAR2,
	p_ts_pickup_event_seq_no 		OUT 	VARCHAR2,
	p_ts_processed_event_seq_no 		OUT 	VARCHAR2,
	p_ts_component_type  			OUT 	VARCHAR2,
	p_ts_rate_sign				OUT	VARCHAR2	
	)
RETURN BOOLEAN;

--Overloaded function for giving rate type, basis_amt_type and category
FUNCTION fn_contract_complete
	(
	p_contract_ref_no 			IN 	lftbs_contract_interest.contract_reference_no%TYPE,
	p_event_seq_no 				IN 	lftbs_contract_interest.event_sequence_no%TYPE,
	p_all_pickup 				IN 	CHAR,
	p_ts_component  			OUT 	VARCHAR2,
	p_ts_status   				OUT 	VARCHAR2,
	p_ts_waive   				OUT 	VARCHAR2,
	p_ts_value_date   			OUT 	VARCHAR2,
	p_ts_acquired_amount			OUT 	VARCHAR2,
	p_ts_accrual_required   		OUT 	VARCHAR2,
	p_ts_accrual_ccy   			OUT 	VARCHAR2,
	p_ts_rate  				OUT 	VARCHAR2,
	p_ts_rate_code  			OUT 	VARCHAR2,
	p_ts_spread  				OUT 	VARCHAR2,
	p_ts_amount  				OUT 	VARCHAR2,
	p_ts_currency 				OUT 	VARCHAR2,
	p_ts_interest_basis  			OUT 	VARCHAR2,
	p_ts_penalty_type  			OUT 	VARCHAR2,
	p_ts_collection_period  		OUT 	VARCHAR2,
	p_ts_rate_period  			OUT 	VARCHAR2,
	p_ts_payment_type  			OUT 	VARCHAR2,
	p_ts_calculation_method 		OUT 	VARCHAR2,
	p_ts_stop_date  			OUT 	VARCHAR2,
	p_ts_pickup_event_seq_no 		OUT 	VARCHAR2,
	p_ts_processed_event_seq_no 		OUT 	VARCHAR2,
	p_ts_component_type  			OUT 	VARCHAR2,
	p_ts_rate_type				OUT 	VARCHAR2,
	p_ts_basis_amount_type			OUT	VARCHAR2,
	p_ts_basis_amount_category		OUT	VARCHAR2,
	p_ts_rate_sign				OUT	VARCHAR2
	)
RETURN BOOLEAN;


function fn_product_iccf_details
	(
	p_product						IN	lftms_product_iccf.product%TYPE,
	p_ts_component					OUT	VARCHAR2,
	p_ts_event						OUT	VARCHAR2,
	p_ts_basis_amt_type				OUT	VARCHAR2,
	p_ts_basis_amt_cat				OUT	VARCHAR2,
	p_ts_accr_reqd					OUT	VARCHAR2,
	p_ts_accr_ccy					OUT	VARCHAR2,
	p_ts_rate_code					OUT	VARCHAR2,
	p_ts_rate_code_usage			OUT	VARCHAR2,
	p_ts_main_int_component			OUT	VARCHAR2,
	p_ts_stop_application			OUT	VARCHAR2,
	p_ts_settlement_ccy				OUT	VARCHAR2,
	p_ts_rate_type					OUT	VARCHAR2,
	p_ts_change_during_amendment	OUT	VARCHAR2,
	p_ts_rule						OUT	VARCHAR2,
	p_ts_rule_type					OUT	VARCHAR2,
	p_ts_minimum_amount				OUT	VARCHAR2,
	p_ts_maximum_amount				OUT	VARCHAR2,
	p_ts_flat_amount_currency		OUT	VARCHAR2,
	p_ts_rounding_period			OUT	VARCHAR2,
	p_ts_rate_period				OUT	VARCHAR2,
	p_ts_cumulative					OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_contract_complete
	(
	p_contract_ref_no 				IN lftbs_contract_interest.contract_reference_no%TYPE,
	p_event_seq_no 					IN lftbs_contract_interest.event_sequence_no%TYPE,
	p_all_pickup 					IN CHAR,
	p_ts_component  				OUT VARCHAR2,
	p_ts_event						OUT VARCHAR2,
	p_ts_status   					OUT VARCHAR2,
	p_ts_waive   					OUT VARCHAR2,
	p_ts_transaction_date			OUT VARCHAR2,
	p_ts_value_date   				OUT VARCHAR2,
	p_ts_acquired_amount   			OUT VARCHAR2,
	p_ts_accrual_required   		OUT VARCHAR2,
	p_ts_accrual_ccy   				OUT VARCHAR2,
	p_ts_rate  						OUT VARCHAR2,
	p_ts_rate_code  				OUT VARCHAR2,
	p_ts_spread  					OUT VARCHAR2,
	p_ts_amount  					OUT VARCHAR2,
	p_ts_currency 					OUT VARCHAR2,
	p_ts_interest_basis  			OUT VARCHAR2,
	p_ts_penalty_type  				OUT VARCHAR2,
	p_ts_collection_period  		OUT VARCHAR2,
	p_ts_rate_period  				OUT VARCHAR2,
	p_ts_payment_type  				OUT VARCHAR2,
	p_ts_calculation_method 		OUT VARCHAR2,
	p_ts_stop_date  				OUT VARCHAR2 ,
	p_ts_rate_type					OUT VARCHAR2,
	p_ts_party						OUT VARCHAR2,
	p_ts_start_date					OUT VARCHAR2,
	p_ts_good_until_date			OUT VARCHAR2,
	p_ts_follow_rule				OUT VARCHAR2,
	p_ts_rounding_period 			OUT VARCHAR2,
	p_ts_change_during_amendment 	OUT VARCHAR2,
	p_ts_pickup_event_seq_no 		OUT VARCHAR2,
	p_ts_processed_event_seq_no 	OUT VARCHAR2
	)
RETURN BOOLEAN;

function fn_contract_component_details
	(
	p_contract_ref_no 			IN 	lftbs_contract_interest.contract_reference_no%TYPE,
	p_event_seq_no 				IN 	lftbs_contract_interest.event_sequence_no%TYPE,
	p_pickup_event_seq_no 		IN 	lftbs_contract_interest.pickup_event_sequence_no%TYPE,
	p_component  				IN 	lftbs_contract_commission.component%TYPE,
	p_event 					OUT lftbs_contract_commission.event%TYPE,
	p_status   					OUT lftbs_contract_interest.status%TYPE,
	p_waive  					OUT lftbs_contract_interest.waiver%TYPE,
	p_value_date   				OUT lftbs_contract_interest.value_date%TYPE,
	p_transaction_date   		OUT lftbs_contract_interest.transaction_date%TYPE,
	p_acquired_amount   		OUT lftbs_contract_interest.acquired_amount%TYPE,
	p_accrual_required   		OUT lftbs_contract_interest.accrual_required%TYPE,
	p_accrual_ccy   			OUT lftbs_contract_interest.accrual_ccy%TYPE,
	p_interest_basis  			OUT lftbs_contract_interest.interest_basis%TYPE,
	p_rate  					OUT lftbs_contract_interest.rate%TYPE,
	p_rate_code  				OUT lftbs_contract_interest.rate_code%TYPE,
	p_spread  					OUT lftbs_contract_interest.spread%TYPE,
	p_amount  					OUT lftbs_contract_interest.amount%TYPE,
	p_currency 					OUT lftbs_contract_interest.currency%TYPE,
	p_penalty_type  			OUT lftbs_contract_interest.penalty_type%TYPE,
	p_collection_period  		OUT lftbs_contract_commission.collection_period%TYPE,
	p_rate_period  				OUT lftbs_contract_commission.rate_period%TYPE,
	p_rate_type 				OUT lftbs_contract_commission.rate_type%TYPE,
	p_payment_type  			OUT lftbs_contract_commission.payment_type%TYPE,
	p_calculation_method  		OUT lftbs_contract_commission.calculation_method%TYPE,
	p_stop_date  				OUT lftbs_contract_commission.stop_date%TYPE,
	p_party 					OUT lftbs_contract_commission.party%TYPE,
	p_start_date 				OUT lftbs_contract_commission.start_date%TYPE,
	p_rounding_period 			OUT lftbs_contract_commission.rounding_period%TYPE,
	p_follow_rule 				OUT lftbs_contract_commission.follow_rule%TYPE,
	p_good_until_date 			OUT lftbs_contract_commission.good_until_date%TYPE,
	p_change_during_amendment 	OUT lftbs_contract_commission.change_during_amendment%TYPE
	)
RETURN BOOLEAN;

--TRLRABO SFR no 347 New function in ICCF referral to decide whether there are any
--interest components linked to the product or not

FUNCTION fn_prod_int_comps
	(
	pm_product		IN 		oltms_product.product_code%TYPE,
	pm_main_comp	IN OUT 	VARCHAR2,
	pm_other_comps	IN OUT 	VARCHAR2
	)
RETURN INTEGER;

--TRLRABO SFR NO 389 New function in iccf referral to return the charge currency
--for the settlement components

FUNCTION fn_get_charge_ccy
	(
	pm_product		IN 		oltms_product.product_code%TYPE,
	pm_components	IN OUT 	VARCHAR2,
	pm_charge_ccys	IN OUT 	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_contract_component_details
	(
	p_contract_ref_no			IN	lftbs_contract_interest.contract_reference_no%TYPE,
	p_event_seq_no				IN	lftbs_contract_interest.event_sequence_no%TYPE,
	p_pickup_event_seq_no		IN	lftbs_contract_interest.pickup_event_sequence_no%TYPE,
	p_component					IN	lftbs_contract_commission.component%TYPE,
	p_event						OUT	lftbs_contract_commission.event%TYPE,
	p_status					OUT	lftbs_contract_interest.status%TYPE,
	p_waive						OUT	lftbs_contract_interest.waiver%TYPE,
	p_value_date				OUT	lftbs_contract_interest.value_date%TYPE,
	p_transaction_date			OUT	lftbs_contract_interest.transaction_date%TYPE,
	p_acquired_amount			OUT	lftbs_contract_interest.acquired_amount%TYPE,
	p_accrual_required			OUT	lftbs_contract_interest.accrual_required%TYPE,
	p_accrual_ccy				OUT	lftbs_contract_interest.accrual_ccy%TYPE,
	p_interest_basis			OUT	lftbs_contract_interest.interest_basis%TYPE,
	p_rate						OUT	lftbs_contract_interest.rate%TYPE,
	p_rate_code					OUT	lftbs_contract_interest.rate_code%TYPE,
	p_spread					OUT	lftbs_contract_interest.spread%TYPE,
	p_amount					OUT	lftbs_contract_interest.amount%TYPE,
	p_currency					OUT	lftbs_contract_interest.currency%TYPE,
	p_penalty_type				OUT	lftbs_contract_interest.penalty_type%TYPE,
	p_collection_period			OUT	lftbs_contract_commission.collection_period%TYPE,
	p_rate_period				OUT	lftbs_contract_commission.rate_period%TYPE,
	p_rate_type					OUT	lftbs_contract_commission.rate_type%TYPE,
	p_payment_type				OUT	lftbs_contract_commission.payment_type%TYPE,
	p_calculation_method		OUT	lftbs_contract_commission.calculation_method%TYPE,
	p_stop_date					OUT	lftbs_contract_commission.stop_date%TYPE,
	p_party						OUT	lftbs_contract_commission.party%TYPE,
	p_start_date				OUT	lftbs_contract_commission.start_date%TYPE,
	p_rounding_period			OUT	lftbs_contract_commission.rounding_period%TYPE,
	p_follow_rule				OUT	lftbs_contract_commission.follow_rule%TYPE,
	p_good_until_date			OUT	lftbs_contract_commission.good_until_date%TYPE,
	p_change_during_amendment	OUT	lftbs_contract_commission.change_during_amendment%TYPE,
	p_retrospective_flag		OUT	lftbs_contract_commission.retrospective_flag%TYPE
	)

RETURN BOOLEAN ;


-- FCC 4.6.1 DEC 2004 EIM Enhancements changes start

FUNCTION fn_disc_amt_tag_spl_process
	(
	p_branch                 			IN       	oltbs_contract.branch%TYPE,
	p_contract_ref_no					IN		oltbs_contract.contract_ref_no%TYPE,
	p_module						IN		oltbs_contract.module_code%TYPE,
	p_current_event_seq_no				IN		oltbs_contract.latest_event_seq_no%TYPE,
	p_event_code             			IN       	oltbs_contract.curr_event_code%TYPE,
	p_value_date             			IN       	DATE,
	p_amtTag						IN		VARCHAR2,
	p_accrole						IN		VARCHAR2,
	p_account_ccy					IN OUT	oltbs_handoff.ac_ccy%TYPE,
	p_lcy_amount					IN OUT	oltbs_handoff.fcy_amount%TYPE,
	p_fcy_amount					IN OUT	oltbs_handoff.lcy_amount%TYPE,
	p_exch_rate						IN OUT	oltbs_handoff.exch_rate%TYPE,
	p_error_code					IN OUT	VARCHAR2,
	p_error_param					IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

-- FCC 4.6.1 DEC 2004 EIM Enhancements changes end

END ;
/
CREATE or replace SYNONYM lfpkss_referral FOR lfpks_referral
/