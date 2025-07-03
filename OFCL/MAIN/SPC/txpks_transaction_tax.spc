CREATE OR REPLACE PACKAGE txpks_transaction_tax
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : txpks_transaction_tax.SPC
**
** Module       : CORE
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
/*                        CHANGE HISTORY
				------------------
31-Jul-2003 FCC4.3 AUG2003 TAX CHANGE - Moved fn_pickup_tax_rule declaration from package body to 
						    package specification.
*/





TYPE g_product_struct IS RECORD
	(
	component				txtms_product_tran_tax.component%TYPE,
	tax_type				txtms_product_tran_tax.tax_type%TYPE,
	borne_by				txtms_product_tran_tax.borne_by%TYPE,
	cash_outflow_indicator	txtms_product_tran_tax.cash_outflow_indicator%TYPE,
	net_cons_indicator		txtms_product_tran_tax.net_cons_indicator%TYPE,
	net_cons_plus_or_minus	txtms_product_tran_tax.net_cons_plus_or_minus%TYPE,
	swift_qualifier			txtms_product_tran_tax.swift_qualifier%TYPE,
	event_for_association	txtms_product_tran_tax.event_for_association%TYPE,
	event_for_application	txtms_product_tran_tax.event_for_application%TYPE,
	event_for_liquidation	txtms_product_tran_tax.event_for_liquidation%TYPE,
	basis_amount_tag		txtms_product_tran_tax.basis_amount_tag%TYPE,
	default_rule			txtms_product_tran_tax.default_rule%TYPE,
	tax_ccy_basis			char(1),
	default_waiver			txtms_product_tran_tax.default_waiver%TYPE,
	allow_rule_amendment	txtms_product_tran_tax.allow_rule_amendment%TYPE,
	amend_after_association	txtms_product_tran_tax.amend_after_association%TYPE,
	allow_amount_amendment	txtms_product_tran_tax.allow_amount_amendment%TYPE,
	amend_after_application	txtms_product_tran_tax.amend_after_application%TYPE,
	stop_association		txtms_product_tran_tax.stop_association%TYPE
	);

TYPE g_product_table_struct IS TABLE OF g_product_struct
														INDEX BY BINARY_INTEGER;

TYPE g_association_struct IS RECORD
	(
	event_seq_no			txtbs_tran_tax_assoc.event_seq_no%TYPE,
	component				txtbs_tran_tax_assoc.component%TYPE,
	creation_esn			txtbs_tran_tax_assoc.creation_esn%TYPE,
	event					txtbs_tran_tax_assoc.event%TYPE,
	transaction_date		date,
	value_date				date,
	product					txtbs_tran_tax_assoc.product%TYPE,
	tax_type				txtms_product_tran_tax.tax_type%TYPE,
	borne_by				txtms_product_tran_tax.borne_by%TYPE,
	cash_outflow_indicator	txtms_product_tran_tax.cash_outflow_indicator%TYPE,
	net_cons_indicator		txtms_product_tran_tax.net_cons_indicator%TYPE,
	net_cons_plus_or_minus	txtms_product_tran_tax.net_cons_plus_or_minus%TYPE,
	swift_qualifier			txtms_product_tran_tax.swift_qualifier%TYPE,
	event_for_association	txtms_product_tran_tax.event_for_association%TYPE,
	event_for_application	txtms_product_tran_tax.event_for_application%TYPE,
	event_for_liquidation	txtms_product_tran_tax.event_for_liquidation%TYPE,
	basis_amount_tag		txtms_product_tran_tax.basis_amount_tag%TYPE,
	rule					txtbs_tran_tax_assoc.rule%TYPE,
	tax_ccy					txtbs_tran_tax_appln.tax_ccy%TYPE,
	waiver					txtbs_tran_tax_assoc.waiver%TYPE,
	allow_rule_amendment	txtbs_tran_tax_assoc.allow_rule_amendment%TYPE,
	amend_after_association	txtbs_tran_tax_assoc.amend_after_association%TYPE
	);

TYPE g_association_table_struct IS TABLE OF g_association_struct
														INDEX BY BINARY_INTEGER;

TYPE g_application_struct IS RECORD
	(
	event_seq_no			txtbs_tran_tax_appln.event_seq_no%TYPE,
	component				txtbs_tran_tax_appln.component%TYPE,
	creation_esn			txtbs_tran_tax_appln.creation_esn%TYPE,
	event					txtbs_tran_tax_appln.event%TYPE,
	transaction_date		date,
	value_date				date,
	association_contract_ref_no
							txtbs_tran_tax_appln.association_contract_ref_no%TYPE,
	association_event_seq_no
							txtbs_tran_tax_appln.association_event_seq_no%TYPE,
	association_product		txtbs_tran_tax_appln.association_product%TYPE,
	tax_type				txtms_product_tran_tax.tax_type%TYPE,
	borne_by				txtms_product_tran_tax.borne_by%TYPE,
	cash_outflow_indicator	txtms_product_tran_tax.cash_outflow_indicator%TYPE,
	net_cons_indicator		txtms_product_tran_tax.net_cons_indicator%TYPE,
	net_cons_plus_or_minus	txtms_product_tran_tax.net_cons_plus_or_minus%TYPE,
	swift_qualifier			txtms_product_tran_tax.swift_qualifier%TYPE,
	event_for_association	txtms_product_tran_tax.event_for_association%TYPE,
	event_for_application	txtms_product_tran_tax.event_for_application%TYPE,
	event_for_liquidation	txtms_product_tran_tax.event_for_liquidation%TYPE,
	basis_amount_tag		txtms_product_tran_tax.basis_amount_tag%TYPE,
	counterparty			txtbs_tran_tax_appln.counterparty%TYPE,
	rule					txtbs_tran_tax_appln.rule%TYPE,
	rule_effective_date		date,
	deal_ccy				txtbs_tran_tax_appln.deal_ccy%TYPE,
	tag_ccy					txtbs_tran_tax_appln.tag_ccy%TYPE,
	tag_amount				txtbs_tran_tax_appln.tag_amount%TYPE,
	liq_amount				txtbs_tran_tax_appln.liq_amount%TYPE,
	rate_of_flat			txtbs_tran_tax_appln.rate_or_flat%TYPE,
	tax_rate				txtbs_tran_tax_appln.tax_rate%TYPE,
	tax_ccy					txtbs_tran_tax_appln.tax_ccy%TYPE,
	computed_tax_amount		txtbs_tran_tax_appln.computed_tax_amount%TYPE,
	tax_amount				txtbs_tran_tax_appln.tax_amount%TYPE,
	waiver					txtbs_tran_tax_appln.waiver%TYPE,
	liquidation_indicator	txtbs_tran_tax_appln.liquidation_indicator%TYPE,
	allow_amount_amendment	txtbs_tran_tax_appln.allow_amount_amendment%TYPE
	);

TYPE g_application_table_struct IS TABLE OF g_application_struct
														INDEX BY BINARY_INTEGER;

/*---------------------------------------------------------------------------*/

FUNCTION fn_associate_for_a_event
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_event_seq_no			IN		oltbs_contract.latest_event_seq_no%TYPE,	
	p_event					IN		oltbs_contract.curr_event_code%TYPE,
	p_amendment_event		IN		boolean,
	p_value_date			IN		date,
	p_product				IN		oltbs_contract.product_code%TYPE,
	p_error_code			IN OUT	varchar2,	
	p_error_parameter		IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_apply_for_a_event
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_event_seq_no			IN		oltbs_contract.latest_event_seq_no%TYPE,	
	p_event					IN		oltbs_contract.curr_event_code%TYPE,
	p_amendment_event		IN		boolean,
	p_value_date			IN		date,
	p_deal_ccy				IN		oltbs_contract.contract_ccy%TYPE,
	p_counterparty			IN		oltbs_contract.counterparty%TYPE,
	p_association_ref_no	IN		oltbs_contract.contract_ref_no%TYPE,
	p_association_product	IN		oltbs_contract.product_code%TYPE,
	p_list_of_amount_tags	IN		varchar2,
	p_list_of_amount_ccys	IN		varchar2,
	p_list_of_amounts		IN		varchar2,
	p_list_of_liq_amounts	IN		varchar2,
	p_error_code			IN OUT	varchar2,	
	p_error_parameter		IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_liquidate_for_a_event
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_event_seq_no			IN		oltbs_contract.latest_event_seq_no%TYPE,	
	p_event					IN		oltbs_contract.curr_event_code%TYPE,
	p_value_date			IN		date,
	p_list_of_amount_tags	OUT		varchar2,
	p_list_of_amount_ccys	OUT		varchar2,
	p_list_of_amounts		OUT		varchar2,
	p_error_code			IN OUT	varchar2,	
	p_error_parameter		IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_reverse_for_a_event
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_current_event_seq_no	IN		oltbs_contract.latest_event_seq_no%TYPE,	
	p_reversed_event_seq_no	IN		oltbs_contract.latest_event_seq_no%TYPE,	
	p_event					IN		oltbs_contract.curr_event_code%TYPE,
	p_value_date			IN		date,
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
	p_deal_ccy				IN		oltbs_contract.contract_ccy%TYPE,
	p_association_table 	OUT		g_association_table_struct,
	p_error_code			IN OUT	varchar2,	
	p_error_parameter		IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_application_referral
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_basis_event_seq_no	IN		oltbs_contract.latest_event_seq_no%TYPE,	
	p_include_liquidated	IN		boolean,
	p_application_table 	OUT		g_application_table_struct,
	p_error_code			IN OUT	varchar2,	
	p_error_parameter		IN OUT	varchar2
	)
	RETURN boolean;
--31-Jul-2003 FCC4.3 AUG2003 TAX CHANGE Starts (moved this declaration from body to spec)
FUNCTION fn_pickup_tax_rule
	(
	p_pickup_rule			IN		txtms_rule.rule_code%TYPE,
	p_value_date			IN		date,
	p_counterparty			IN		oltms_customer.customer_no%TYPE, 	--FCC 4.2 CEEMEA CHANGE
	p_country				IN		oltms_customer.country%TYPE,	 	--FCC 4.2 CEEMEA CHANGE
	p_cust_tax_group 			IN		oltms_customer.cust_tax_group%TYPE,	--FCC 4.2 CEEMEA CHANGE
	p_currency				IN		txtms_rule.currency%TYPE, --31-Jul-2003 FCC4.3 AUG2003 TAX CHANGE
	p_nationality			IN		oltms_customer.nationality%TYPE,	--FCC4.5 TAX CHANGES	
	p_rule_record			OUT		txtms_rule%ROWTYPE,
	p_error_code			IN OUT	varchar2,
	p_error_parameter			IN OUT	varchar2
	)
	RETURN boolean;
--31-Jul-2003 FCC4.3 AUG2003 TAX CHANGE Ends



END txpks_transaction_tax;
/
CREATE or replace SYNONYM txpkss_transaction_tax FOR txpks_transaction_tax
/