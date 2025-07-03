CREATE OR REPLACE PACKAGE olpks_da_services_1
AS
/*------------------------------------------------------------------------------------------------------------------------
**
** File Name	: olpks_da_services_1.SPC
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
---------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------
CHANGE HISTORY

Date			Version		FCC Version		Site		Description
05-OCT-2003		1.0			4.4			BANGALORE	Initial Version for CEEMEA IAS39 CHanges
20-OCT-2003		FCC 4.3.1 ITR1 SFR #72 changed the datatype of xirr rate
15-NOV-2004		FCC 4.6.1 JAN 2005 EIM Enhancements changes
15-DEC-2004 	FCC 4.6.1 JAN 2005 EIM Enhancements changes .
			Added function fn_get_os_fee_accr_old .
- FCC 4.6.1 JAN 2005 ITR-1 SFR-196 For changing copyright clause / release name
**  Modified By     : Narendra Dhaker
**  Modified On     : 17-FEB-2022
**  Modified Reason : Increasing the amount field decimals to maximum
**  Search String   : Bug#33809404_DecimalChange

-------------------------------------------------------------------------------------------------------------------------
*/
TYPE rec_cash_flow_attr IS RECORD
	(
	component       					VARCHAR2(15),
	due_date        					DATE,
	--amount_due      					NUMBER(22,3), --Bug#33809404_DecimalChange 
	amount_due      					NUMBER, --Bug#33809404_DecimalChange
	ccy_amount_due  					VARCHAR2(3),
	inflow_outflow  					VARCHAR2(1)
	);

--------------------------------------------------------------------------------------------------------------------------
FUNCTION fn_calc_old_npv_for_contract
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
	p_cash_flow_tbl			IN OUT	olpkss_da_services.tbl_cash_flow_attr,
	p_error_code			IN OUT 	VARCHAR2,
	p_error_parameter			IN OUT 	VARCHAR2
	)
RETURN BOOLEAN;
--------------------------------------------------------------------------------------------------------------------------
FUNCTION fn_get_old_os_principal
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
FUNCTION fn_get_old_total_disc_tba
	(
	p_branch_code		IN		oltbs_contract.branch%TYPE,
	p_contract_ref_no		IN   		oltbs_contract.contract_ref_no%TYPE,
	p_module_code		IN		oltbs_contract.module_code%TYPE,
	p_contract_ccy		IN		oltbs_contract.contract_ccy%TYPE,
	p_contract_value_date	IN		DATE,
	p_payment_method		IN		oltbs_contract_master.payment_method%TYPE,
	p_effective_date		IN		DATE,
	p_total_discount_tba	OUT		NUMBER,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--------------------------------------------------------------------------------------------------------------------------
FUNCTION fn_get_old_accr_int
	(
	p_branch_code			IN		oltbs_contract.branch%TYPE,
	p_contract_ref_no			IN   		oltbs_contract.contract_ref_no%TYPE,
	p_module_code			IN		oltbs_contract.module_code%TYPE,
	p_contract_ccy			IN		oltbs_contract.contract_ccy%TYPE,
	p_payment_method			IN		oltbs_contract_master.payment_method%TYPE, --FCC 4.6.1 JAN 2005 EIM Enhancements changes
	p_contract_value_date		IN		DATE,
	p_effective_date			IN		DATE,
	p_accrd_int_in_contract_ccy	OUT		oltbs_amount_due.amount_due%TYPE,
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--------------------------------------------------------------------------------------------------------------------------
FUNCTION fn_bld_old_cash_flow_tbl
	(
	p_module_code			IN		oltbs_contract.module_code%TYPE,
	p_contract_ref_no			IN   		oltbs_contract.contract_ref_no%TYPE,
	p_contract_value_date		IN		DATE,
	p_payment_method			IN		oltbs_contract_master.payment_method%TYPE,
	p_effective_date			IN		DATE,
	p_cash_flow_tbl			OUT		olpkss_da_services.tbl_cash_flow_attr,
	p_error_code			IN OUT 	VARCHAR2,
	p_error_parameter			IN OUT 	VARCHAR2
	)
RETURN BOOLEAN;
--------------------------------------------------------------------------------------------------------------------------
FUNCTION fn_till_date_accrual_old
	(
	p_branch_code			IN		oltbs_contract.branch%TYPE,
	p_module_code			IN		oltbs_contract.module_code%TYPE,
	p_contract_ref_no			IN		oltbs_contract.contract_ref_no%TYPE,
	p_contract_ccy			IN		oltbs_contract.contract_ccy%TYPE,
	p_contract_value_date		IN		DATE,
	p_payment_method			IN		oltbs_contract_master.payment_method%TYPE,
	p_effective_date			IN		DATE,
	p_denominator_dcount_method	IN		oltms_class_ccy_pref.denom_dcount_method%TYPE,
	p_numerator_dcount_method	IN		oltms_class_ccy_pref.numer_dcount_method%TYPE,
	p_xirr_rate			IN 		NUMBER,
	p_cash_flow_ind			IN		VARCHAR2,
	p_datbs_contract_disc_rec	IN		oltbs_contract_disc%ROWTYPE, --FCC 4.6.1 JAN 2005 EIM Enhancements changes
	p_till_date_disc_accr		OUT		NUMBER,
	p_cash_flow_tbl			IN OUT	olpkss_da_services.tbl_cash_flow_attr,
	p_present_value			IN OUT	NUMBER,
	p_os_principal			IN OUT	NUMBER,
	p_accrd_int_in_contract_ccy	IN OUT	NUMBER,
	p_total_discount_tba		IN OUT	NUMBER,
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--FCC 4.6.1 JAN 2005 EIM Enhancements changes  starts

FUNCTION	fn_get_os_fee_accr_old
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
--FCC 4.6.1 JAN 2005 EIM Enhancements changes  ends
--------------------------------------------------------------------------------------------------------------------------
END olpks_da_services_1;
/
CREATE or replace SYNONYM olpkss_services_1 FOR olpks_da_services_1
/