CREATE OR REPLACE PACKAGE lfpks_interest
AS

/*----------------------------------------------------------------------------------------------------
**
** File Name    : lfpks_interest.spc
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



TYPE g_product_struct IS RECORD
	(
	component				lftms_product_interest.component%TYPE,
	primary_interest_indicator
							lftms_product_interest.primary_interest_indicator%TYPE,
	coupon_indicator		lftms_product_interest.coupon_indicator%TYPE,
	rate_type				lftms_product_interest.rate_type%TYPE,
	floating_rate_type		lftms_product_interest.floating_rate_type%TYPE,
	event_for_association	lftms_product_interest.event_for_association%TYPE,
	basis_amount_tag		lftms_product_interest.basis_amount_tag%TYPE,
	basis_amount_category	lftms_product_interest.basis_amount_category%TYPE,
	accrual_required		lftms_product_interest.accrual_required%TYPE,
	default_rate_code		lftms_product_interest.default_rate_code%TYPE,
	default_tenor_code		lftms_product_interest.default_tenor_code%TYPE,
	default_waiver			lftms_product_interest.default_waiver%TYPE,
	allow_rate_code_amendment
							lftms_product_interest.allow_rate_code_amendment%TYPE,
	allow_rate_amendment	lftms_product_interest.allow_rate_amendment%TYPE,
	amend_after_association	lftms_product_interest.amend_after_association%TYPE,
	stop_association		lftms_product_interest.stop_association%TYPE
	);

TYPE g_product_table_struct IS TABLE OF g_product_struct
														INDEX BY BINARY_INTEGER;

TYPE g_association_struct IS RECORD
	(
	event_seq_no			lftbs_interest_assoc.event_seq_no%TYPE,
	component				lftbs_interest_assoc.component%TYPE,
	creation_esn			lftbs_interest_assoc.creation_esn%TYPE,
	event					lftbs_interest_assoc.event%TYPE,
	transaction_date		date,
	value_date				date,
	effective_date			date,
	product					lftbs_interest_assoc.product%TYPE,
	primary_interest_indicator
							lftms_product_interest.primary_interest_indicator%TYPE,
	coupon_indicator		lftms_product_interest.coupon_indicator%TYPE,
	rate_type				lftms_product_interest.rate_type%TYPE,
	floating_rate_type		lftms_product_interest.floating_rate_type%TYPE,
	event_for_association	lftms_product_interest.event_for_association%TYPE,
	basis_amount_tag		lftms_product_interest.basis_amount_tag%TYPE,
	basis_amount_category	lftms_product_interest.basis_amount_category%TYPE,
	accrual_required		lftms_product_interest.accrual_required%TYPE,
	interest_ccy			lftbs_interest_assoc.interest_ccy%TYPE,
	rate_code				lftbs_interest_assoc.rate_code%TYPE,
	tenor_code				lftbs_interest_assoc.tenor_code%TYPE,
	interest_spread			lftbs_interest_assoc.interest_spread%TYPE,
	interest_rate			lftbs_interest_assoc.interest_rate%TYPE,
	flat_amount				lftbs_interest_assoc.flat_amount%TYPE,
	acquired_amount			lftbs_interest_assoc.acquired_amount%TYPE,
	interest_calculation_method
							lftbs_interest_assoc.interest_calculation_method%TYPE,
	quoted_revision_index	lftbs_interest_assoc.quoted_revision_index%TYPE,
	quoted_revision_spread	lftbs_interest_assoc.quoted_revision_spread%TYPE,
	quoted_revision_floor	lftbs_interest_assoc.quoted_revision_floor%TYPE,
	quoted_revision_ceiling	lftbs_interest_assoc.quoted_revision_ceiling%TYPE,
	waiver					lftbs_interest_assoc.waiver%TYPE,
	allow_rate_code_amendment
							lftbs_interest_assoc.allow_rate_code_amendment%TYPE,
	allow_rate_amendment	lftbs_interest_assoc.allow_rate_amendment%TYPE,
	amend_after_association	lftbs_interest_assoc.amend_after_association%TYPE,
	minimum_rate			lftbs_interest_assoc.minimum_rate%TYPE,
	maximum_rate			lftbs_interest_assoc.maximum_rate%TYPE,
	default_rate			lftbs_interest_assoc.default_rate%TYPE,
	minimum_spread			lftbs_interest_assoc.minimum_spread%TYPE,
	maximum_spread			lftbs_interest_assoc.maximum_spread%TYPE
	);

TYPE g_association_table_struct IS TABLE OF g_association_struct
														INDEX BY BINARY_INTEGER;

TYPE g_amendment_struct IS RECORD
	(
	component				lftbs_interest_assoc.component%TYPE,
	rate_code				lftbs_interest_assoc.rate_code%TYPE,
	tenor_code				lftbs_interest_assoc.tenor_code%TYPE,
	interest_spread			lftbs_interest_assoc.interest_spread%TYPE,
	interest_rate			lftbs_interest_assoc.interest_rate%TYPE,
	flat_amount				lftbs_interest_assoc.flat_amount%TYPE
	);

TYPE g_amendment_table_struct IS TABLE OF g_amendment_struct
														INDEX BY BINARY_INTEGER;

/*---------------------------------------------------------------------------
*/

FUNCTION fn_associate_for_a_event
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_event_seq_no			IN		oltbs_contract.latest_event_seq_no%TYPE,	
	p_event					IN		oltbs_contract.curr_event_code%TYPE,
	p_amendment_event		IN		boolean,
	p_value_date			IN		date,
	p_effective_date		IN		date,
	p_deal_ccy				IN		oltbs_contract.contract_ccy%TYPE,
	p_product				IN		oltbs_contract.product_code%TYPE,
	p_module				IN		oltbs_contract.module_code%TYPE,
	p_error_code			IN OUT	varchar2,	
	p_error_parameter		IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_association_copy
	(
	p_contract_ref_no_1		IN		oltbs_contract.contract_ref_no%TYPE,
	p_copy_event_seq_no		IN		oltbs_contract.latest_event_seq_no%TYPE,
	p_contract_ref_no_2		IN		oltbs_contract.contract_ref_no%TYPE,
	p_error_code			IN OUT	varchar2,	
	p_error_parameter		IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_upload_amendment
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_event_seq_no			IN		oltbs_contract.latest_event_seq_no%TYPE,	
	p_event					IN		oltbs_contract.curr_event_code%TYPE,
	p_value_date			IN		date,
	p_effective_date		IN		date,
	p_deal_ccy				IN		oltbs_contract.contract_ccy%TYPE,
	p_product				IN		oltbs_contract.product_code%TYPE,
	p_module				IN		oltbs_contract.module_code%TYPE,
	p_amendment_table		IN		g_amendment_table_struct,
	p_error_code			IN OUT	varchar2,	
	p_error_parameter		IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_delete_for_a_event
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_event_seq_no			IN		oltbs_contract.latest_event_seq_no%TYPE,	
	p_error_code			IN OUT	varchar2,	
	p_error_parameter		IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_product_referral
	(
	p_product				IN		oltbs_contract.product_code%TYPE,
	p_include_stopped		IN		boolean,
	p_product_table 		OUT		g_product_table_struct,
	p_error_code			IN OUT	varchar2,	
	p_error_parameter		IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_association_referral
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_basis_event_seq_no 	IN		oltbs_contract.latest_event_seq_no%TYPE,	
	p_by_effective_date		IN		boolean,
	p_basis_date			IN		date,
	p_association_table 	OUT		g_association_table_struct,
	p_error_code			IN OUT	varchar2,	
	p_error_parameter		IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_amendment_referral
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_event_seq_no 			IN		oltbs_contract.latest_event_seq_no%TYPE,	
	p_association_table 	OUT		g_association_table_struct,
	p_error_code			IN OUT	varchar2,	
	p_error_parameter		IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_fetch_floating_rate
	(
	p_rate_code				IN		lftms_rate_code_defn.rate_code%TYPE,
	p_tenor_code			IN		lftms_tenor_code_defn.tenor_code%TYPE,
	p_rate_type				IN		lftms_rate_type_defn.rate_type%TYPE,
	p_interest_ccy			IN		oltbs_contract.contract_ccy%TYPE,
	p_basis_date			IN		date,
	p_effective_date		OUT		date,
	p_floating_rate			OUT		lftms_rate_detail.interest_rate%TYPE,
	p_error_code			IN OUT	varchar2,	
	p_error_parameter		IN OUT	varchar2
	)
	RETURN boolean;

/*---------------------------------------------------------------------------
*/

END lfpks_interest;
/
CREATE or replace SYNONYM lfpkss_interest FOR lfpks_interest
/