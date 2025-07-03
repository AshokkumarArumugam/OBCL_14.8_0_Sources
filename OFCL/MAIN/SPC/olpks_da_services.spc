CREATE OR REPLACE PACKAGE olpks_da_services
AS
/*------------------------------------------------------------------------------------------------------------------------
**
** File Name	: olpks_da_services.SPC
**
** Module		: DISCOUNT ACCRUAL
**
This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
--------------------------------------------------------------------------------------------------------------
*/
/*------------------------------------------------------------------------------------------------------------------------
CHANGE HISTORY

Date			Version		FCC Version		Site		Description
30-SEP-2003		1.0			4.4			BANGALORE	Initial Version for CEEMEA IAS39 CHanges
20-OCT-2003		FCC 4.3.1 ITR1 SFR #72 changed the datatype of xirr rate

02-NOV-2004      FCC 4.6.1 JAN 2005 EIM Enhancements changes 
		     Added new function fn_populate_amount_due

15-NOV-2004		FCC 4.6.1 JAN 2005 EIM Enhancements changes 
			Added new function fn_catchup_accrual to pass YACR entries when done any VAMI to the contract
15-DEC-2004 	FCC 4.6.1 JAN 2005 EIM Enhancements changes .
			Added function fn_get_outstanding_fee_accr .
02-Jan-2005 	FCC 4.6.1 JAN 2005 EIM Enhancements changes - Changes related to pycycm processing for yacr
- FCC 4.6.1 JAN 2005 ITR-1 SFR-196 For changing copyright clause / release name
01-APR-2009 FCC V.CL Release 7.5 Lot1 ITR2 SFR#5 <Discount Accrual Changes>
	Added one more parameter in fn_till_date_accrual ,p_processing_date as Total disc to be accrued was wrong when there is backvalue dated mutliple fee components
**  Modified By     : Narendra Dhaker
**  Modified On     : 17-FEB-2022
**  Modified Reason : Increasing the amount field decimals to maximum
**  Search String   : Bug#33809404_DecimalChange

-------------------------------------------------------------------------------------------------------------------------*/
TYPE rec_cash_flow_attr IS RECORD
	(
	component       		VARCHAR2(15),
	due_date        		DATE,
	--amount_due      		NUMBER(22,3), --Bug#33809404_DecimalChange 
	amount_due      		NUMBER, --Bug#33809404_DecimalChange
	ccy_amount_due  		VARCHAR2(3),
	inflow_outflow  		VARCHAR2(1)
	);

TYPE	tbl_cash_flow_attr	IS TABLE OF rec_cash_flow_attr	INDEX BY BINARY_INTEGER;

--------------------------------------------------------------------------------------------------------------------------
FUNCTION fn_calc_yield_for_contract
	(
	p_branch_code	            IN   		oltbs_contract.branch%TYPE,
	p_contract_ref_no			IN   		oltbs_contract.contract_ref_no%TYPE,
	p_numerator_dcount_method	IN   		oltms_class_ccy_pref.numer_dcount_method%TYPE,
	p_denominator_dcount_method	IN   		oltms_class_ccy_pref.denom_dcount_method%TYPE,
	p_int_rate				IN   		lftbs_contract_interest.rate%TYPE,
	p_cash_flow_tbl			IN   		tbl_cash_flow_attr,
	p_contract_ccy			IN   		oltbs_contract.contract_ccy%TYPE,
	p_contract_yield			OUT  		NUMBER,
	p_error_code			IN OUT 	VARCHAR2,
	p_error_parameter			IN OUT 	VARCHAR2
	)
RETURN BOOLEAN;
--------------------------------------------------------------------------------------------------------------------------
FUNCTION fn_calc_npv_for_contract
	(
	p_branch_code	            IN   		oltbs_contract.branch%TYPE,
	p_contract_ref_no			IN   		oltbs_contract.contract_ref_no%TYPE,
	p_module_code			IN		oltbs_contract.module_code%TYPE,
	p_contract_value_date		IN		DATE,
	p_payment_method			IN		oltbs_contract_master.payment_method%TYPE,
	p_numerator_dcount_method	IN   		oltms_class_ccy_pref.numer_dcount_method%TYPE,
	p_denominator_dcount_method	IN   		oltms_class_ccy_pref.denom_dcount_method%TYPE,
	p_xirr_rate			IN   		NUMBER,
	p_contract_ccy			IN   		oltbs_contract.contract_ccy%TYPE,
	p_effective_date			IN		DATE,
	p_cash_flow_ind			IN		VARCHAR2,
	p_present_value			OUT  		NUMBER,
	p_cash_flow_tbl			IN OUT	tbl_cash_flow_attr,
	p_error_code			IN OUT 	VARCHAR2,
	p_error_parameter			IN OUT 	VARCHAR2
	)
RETURN BOOLEAN;
--------------------------------------------------------------------------------------------------------------------------
FUNCTION fn_get_os_principal
	(
	p_branch_code			IN		oltbs_contract.branch%TYPE,
	p_contract_ref_no			IN   		oltbs_contract.contract_ref_no%TYPE,
	p_module_code			IN		oltbs_contract.module_code%TYPE,
	p_effective_date			IN		DATE,
	p_os_principal			OUT		oltbs_contract_balance.principal_outstanding_bal%TYPE,
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--------------------------------------------------------------------------------------------------------------------------
FUNCTION fn_get_total_disc_tba
	(
	p_branch_code			IN		oltbs_contract.branch%TYPE,
	p_contract_ref_no			IN   		oltbs_contract.contract_ref_no%TYPE,
	p_module_code			IN		oltbs_contract.module_code%TYPE,
	p_contract_ccy			IN		oltbs_contract.contract_ccy%TYPE,
	p_contract_value_date		IN		DATE,
	p_payment_method			IN		oltbs_contract_master.payment_method%TYPE,
	p_effective_date			IN		DATE,
	p_total_discount_tba		OUT		NUMBER,
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--------------------------------------------------------------------------------------------------------------------------
FUNCTION fn_get_accr_int
	(
	p_branch_code			IN		oltbs_contract.branch%TYPE,
	p_contract_ref_no			IN   		oltbs_contract.contract_ref_no%TYPE,
	p_module_code			IN		oltbs_contract.module_code%TYPE,
	p_contract_ccy			IN		oltbs_contract.contract_ccy%TYPE,
	p_payment_method			IN	oltbs_contract_master.payment_method%TYPE, -- FCC 4.6.1 JAN 2005 EIM Enhancements changes
	p_contract_value_date		IN		DATE,
	p_effective_date			IN		DATE,
	p_accrd_int_in_contract_ccy	OUT		oltbs_amount_due.amount_due%TYPE,
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--------------------------------------------------------------------------------------------------------------------------
FUNCTION fn_bld_cash_flow_tbl
	  (
	  p_module_code			IN		oltbs_contract.module_code%TYPE,
	  p_contract_ref_no		IN   		oltbs_contract.contract_ref_no%TYPE,
	  p_contract_value_date		IN		DATE,
	  p_payment_method		IN		oltbs_contract_master.payment_method%TYPE,
	  p_effective_date		IN		DATE,
	  p_cash_flow_tbl			OUT		tbl_cash_flow_attr,
	  p_error_code			IN OUT 	VARCHAR2,
	  p_error_parameter		IN OUT 	VARCHAR2
	  )
RETURN BOOLEAN;
--------------------------------------------------------------------------------------------------------------------------
FUNCTION fn_till_date_accrual
	(
	p_branch_code			IN		oltbs_contract.branch%TYPE,
	p_module_code			IN		oltbs_contract.module_code%TYPE,
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_contract_ccy			IN		oltbs_contract.contract_ccy%TYPE,
	p_contract_value_date		IN		DATE,
	p_payment_method		IN		oltbs_contract_master.payment_method%TYPE,
	p_effective_date		IN		DATE,
	p_processing_date		IN		DATE,--01-APR-2009 FCC V.CL Release 7.5 Lot1 ITR2 SFR#5 <Discount Accrual Changes>
	p_denominator_dcount_method	IN		oltms_class_ccy_pref.denom_dcount_method%TYPE,
	p_numerator_dcount_method	IN		oltms_class_ccy_pref.numer_dcount_method%TYPE,
	p_xirr_rate			IN 		NUMBER,
	p_cash_flow_ind			IN		VARCHAR2,
	p_datbs_contract_disc_rec	IN		oltbs_contract_disc%ROWTYPE,  --FCC 4.6.1 JAN 2005 EIM Enhancements changes
	p_till_date_disc_accr		OUT		NUMBER,
	p_cash_flow_tbl			IN OUT	tbl_cash_flow_attr,
	p_present_value			IN OUT	NUMBER,
	p_os_principal			IN OUT	NUMBER,
	p_accrd_int_in_contract_ccy	IN OUT	NUMBER,
	p_total_discount_tba		IN OUT	NUMBER,
	--FCC 4.6.1 JAN 2005 EIM Enhancements changes starts
	p_os_fee_disc_accr		OUT		oltbs_amount_due.amount_due%TYPE, --SJ
	p_os_fee_prem_accr		OUT		oltbs_amount_due.amount_due%TYPE, --SJ
	--FCC 4.6.1 JAN 2005 EIM Enhancements changes ends
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--------------------------------------------------------------------------------------------------------------------------
FUNCTION fn_populate_irr_details
	(
	p_branch_code			IN		oltbs_contract.branch%TYPE,
	p_module_code			IN		oltbs_contract.module_code%TYPE,
	p_contract_ref_no			IN		oltbs_contract.contract_ref_no%TYPE,
	p_contract_ccy			IN		oltbs_contract.contract_ccy%TYPE,
	p_contract_value_date		IN		DATE,
	p_effective_date			IN		DATE,
	p_payment_method			IN		oltbs_contract_master.payment_method%TYPE,
	p_int_rate				IN   		lftbs_contract_interest.rate%TYPE,
	p_xirr_rate				IN   		NUMBER,
	p_denominator_dcount_method	IN		oltms_class_ccy_pref.denom_dcount_method%TYPE,
	p_numerator_dcount_method	IN		oltms_class_ccy_pref.numer_dcount_method%TYPE,
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--------------------------------------------------------------------------------------------------------------------------
FUNCTION fn_recompute_irr
	(
	p_contract_ref_no			IN		oltbs_contract.contract_ref_no%TYPE,
	p_effective_date			IN		DATE,
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--------------------------------------------------------------------------------------------------------------------------
---- FCC 4.6.1 JAN 2005 EIM Enhancements changes starts
FUNCTION fn_populate_amount_due
	(
	p_contract_ref_no			IN		oltbs_contract.contract_ref_no%TYPE,
	p_module_code			IN		VARCHAR2,
	p_effective_date			IN		DATE,
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--------------------------------------------------------------------------------------------------------------------------
FUNCTION fn_get_acquisition_type
	(
	p_contract_ref_no		IN 	oltbs_contract.contract_ref_no%TYPE,
	p_module_code			IN 	oltbs_contract.module_code%TYPE,
	p_total_discount_tba		IN	NUMBER,
	p_acq_type			IN 	OUT VARCHAR2,
	p_error_code			IN 	OUT VARCHAR2,
	p_error_parameter		IN 	OUT VARCHAR2)
RETURN BOOLEAN ;
--------------------------------------------------------------------------------------------------------------------------
FUNCTION fn_get_outstanding_disc_int
	(
	p_branch_code			IN		oltbs_contract.branch%TYPE,
	p_contract_ref_no			IN   		oltbs_contract.contract_ref_no%TYPE,
	p_module_code			IN		oltbs_contract.module_code%TYPE,
	p_contract_ccy			IN		oltbs_contract.contract_ccy%TYPE,
	p_payment_method			IN		oltbs_contract_master.payment_method%TYPE,
	p_contract_value_date		IN		DATE,
	p_effective_date			IN		DATE,
	p_accrd_int_disc_ctr_ccy	IN		oltbs_amount_due.amount_due%TYPE,
	p_disc_int				OUT		oltbs_amount_due.amount_due%TYPE,
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--03-JAN-2005
FUNCTION	fn_get_outstanding_fee_accr
	(
	p_branch_code			IN		oltbs_contract.branch%TYPE,
	p_contract_ref_no			IN   		oltbs_contract.contract_ref_no%TYPE,
	p_module_code			IN		oltbs_contract.module_code%TYPE,
	p_contract_ccy			IN		oltbs_contract.contract_ccy%TYPE,
	p_contract_value_date		IN		DATE,
	p_effective_date			IN		DATE,
	p_os_fee_disc_accr		OUT		oltbs_amount_due.amount_due%TYPE,
	p_os_fee_prem_accr		OUT		oltbs_amount_due.amount_due%TYPE,
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--03-JAN-2005
--------------------------------------------------------------------------------------------------------------------------
FUNCTION fn_build_initial_flow
	(
	p_branch_code			IN			oltbs_contract.branch%TYPE,
	p_module_code			IN			oltbs_contract.module_code%TYPE,
	p_contract_ref_no			IN			oltbs_contract.contract_ref_no%TYPE,
	p_contract_ccy			IN			oltbs_contract.contract_ccy%TYPE,
	p_contract_value_date		IN			DATE,
	p_payment_method			IN			oltbs_contract_master.payment_method%TYPE,
	p_effective_date			IN			DATE,
	p_cash_flow_tbl			IN OUT		tbl_cash_flow_attr,
	p_os_principal			IN OUT		NUMBER,
	p_accrd_int_in_contract_ccy	IN OUT		NUMBER,
	p_total_discount_tba		IN OUT		NUMBER,
	p_denominator_dcount_method	IN			oltms_class_ccy_pref.denom_dcount_method%TYPE,
	p_numerator_dcount_method	IN			oltms_class_ccy_pref.numer_dcount_method%TYPE,
	p_xirr_rate				IN 			NUMBER,
	p_cash_flow_ind			IN			VARCHAR2,
	p_till_date_disc_accr		OUT			NUMBER,
	p_present_value			IN OUT		NUMBER,
	p_mode				IN			VARCHAR2,
	p_outstanding_disc_int		IN OUT		NUMBER,	
	p_os_fee_disc_accr		OUT		oltbs_amount_due.amount_due%TYPE, --SJ
	p_os_fee_prem_accr		OUT		oltbs_amount_due.amount_due%TYPE, --SJ
	p_error_code			IN OUT		VARCHAR2,
	p_error_parameter			IN OUT		VARCHAR2
	)
RETURN BOOLEAN;
--------------------------------------------------------------------------------------------------------------------------
FUNCTION fn_catchup_accrual
	(
		p_contract_ref_no			IN		oltbs_contract.contract_ref_no%TYPE,
		p_accrual_till_date		IN		DATE,
		p_processing_date			IN		DATE,
		p_mode				IN		VARCHAR2,
		-- 02-JAN-2005 FCC 4.6.1 JAN 2005 EIM Enhancements changes starts
		p_event_seq_no			IN		NUMBER,
		p_pnlhist_ind			IN		VARCHAR2,
		-- 02-JAN-2005 FCC 4.6.1 JAN 2005 EIM Enhancements changes ends			
		p_error_code			IN OUT	VARCHAR2,
		p_error_parameter			IN OUT	VARCHAR2		
	)
RETURN BOOLEAN;


---- FCC 4.6.1 JAN 2005 EIM Enhancements changes ends
--------------------------------------------------------------------------------------------------------------------------

END olpks_da_services;
/
CREATE or replace SYNONYM olpkss_da_services FOR olpks_da_services
/