CREATE OR REPLACE PACKAGE olpks_split_amount_0
AS

/*----------------------------------------------------------------------------------------------------
**
** File Name    : olpks_split_amount_0.spc
**
** Module       : FX
This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/

TYPE 					acct_values_record_type
IS RECORD				(
						amount_tag	oltbs_split_tag_detail.basis_amount_tag%TYPE,
						amount		NUMBER,
						ccy			VARCHAR2(3),
						account		oltbs_split_tag_detail.split_ac_no%TYPE,
						ac_branch	oltbs_split_tag_detail.split_ac_branch%TYPE,
						lcy_amount	oltbs_split_tag_detail.lcy_amount%TYPE
						);

TYPE 					acct_values_table_type
IS TABLE OF				acct_values_record_type
INDEX BY 				BINARY_INTEGER;

TYPE 					amount_due_table_type
IS TABLE OF				oltbs_amount_due_cs%ROWTYPE
INDEX BY 				BINARY_INTEGER;

TYPE					amount_paid_table_type
IS TABLE OF				oltbs_amount_paid%ROWTYPE
INDEX BY 				BINARY_INTEGER;

TYPE 					ty_entryEvent
IS TABLE OF				oltbs_contract.curr_event_code%TYPE
INDEX BY 				BINARY_INTEGER;

FUNCTION fn_default_from_product
(
p_contract_ref_no	IN		oltbs_split_tag_master.contract_ref_no%TYPE,
p_event_seq_no		IN		oltbs_split_tag_master.event_seq_no%TYPE,
p_product_code		IN		oltms_product.product_code%TYPE,
p_amount_tags		IN OUT	VARCHAR2,
p_ccys				IN OUT	VARCHAR2,
p_amounts			IN OUT	VARCHAR2,
p_lcy_amounts			IN OUT	VARCHAR2,
p_error_code		IN OUT	VARCHAR2,
p_error_parameter	IN OUT	VARCHAR2
)
RETURN BOOLEAN;

FUNCTION fn_split_settlement_details
(
p_contract_ref_no		IN 	oltbs_contract.contract_ref_no%TYPE,
p_event_seq_no			IN 	oltbs_contract.latest_event_seq_no%TYPE,
p_version_flag			IN OUT	VARCHAR2,
p_ccy_restrict_flags	IN OUT	VARCHAR2,
p_all_settle_tags		IN OUT	VARCHAR2,
p_all_tag_ccys			IN OUT	VARCHAR2,
p_pay_rcv_flags			IN OUT	VARCHAR2,
p_xfer_types			IN OUT	VARCHAR2,
p_ac_branches			IN OUT	VARCHAR2,
p_accounts				IN OUT	VARCHAR2,
p_all_settle_ccys		IN OUT	VARCHAR2,
p_pay_details			IN OUT	VARCHAR2,
p_charge_details		IN OUT	VARCHAR2,
p_ultimate_bnfs			IN OUT	VARCHAR2,
p_by_order_ofs			IN OUT	VARCHAR2,
p_pay_by_flags			IN OUT	VARCHAR2,
p_instr_types			IN OUT	VARCHAR2,
p_instr_nos				IN OUT	VARCHAR2,
p_change_ac_flags		IN OUT	VARCHAR2,
p_change_rate_flags		IN OUT	VARCHAR2,
p_party_info_flags		IN OUT	VARCHAR2,
p_cover_req_flags		IN OUT	VARCHAR2,
p_error_code			IN OUT	VARCHAR2,
p_error_parameter		IN OUT	VARCHAR2
)
RETURN BOOLEAN;

FUNCTION fn_get_split_contract_values
(
p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
p_event_seq_no			IN		oltbs_contract.latest_event_seq_no%TYPE,
p_amount_tag			IN		VARCHAR2,
p_new_ac_branches		OUT		VARCHAR2,
p_new_accounts			OUT		VARCHAR2,
p_new_amount_tags		OUT		VARCHAR2,
p_new_amounts			OUT		VARCHAR2,
p_new_ac_ccys			OUT		VARCHAR2,
p_no_of_new_tags		OUT		NUMBER,
p_error_code			IN OUT	VARCHAR2,
p_error_parameter		IN OUT	VARCHAR2
)
RETURN BOOLEAN;

-- OFCL12.2 Not required for corp lending
/*FUNCTION fn_enrich_ac_lookup
(
p_contract_ref_no	IN			oltbs_split_tag_detail.contract_ref_no%TYPE,
p_event_seq_no		IN		oltbs_split_tag_detail.event_seq_no%TYPE,
p_event			IN		oltbs_contract.curr_event_code%TYPE,
p_acc_lookup		IN OUT	olpkss_accounting.tbl_lookup,
p_event_table		IN OUT	fxpkss_services.ty_entryEvent,
p_error_code		IN OUT	VARCHAR2,
p_error_parameter		IN OUT	VARCHAR2
)
RETURN BOOLEAN;*/
-- OFCL12.2 Not required for corp lending

FUNCTION fn_get_amount_due
(
p_contract_ref_no	IN		oltbs_split_tag_detail.contract_ref_no%TYPE,
p_event_seq_no		IN		oltbs_split_tag_detail.event_seq_no%TYPE,
p_end_date			IN		DATE,
p_counterparty		IN		oltbs_contract.counterparty%TYPE,
p_no_of_split_rows	OUT		NUMBER,
p_processed_tag		OUT		VARCHAR2,
p_amount_due_table	OUT		amount_due_table_type,
p_error_code		IN OUT	VARCHAR2,
p_error_parameter	IN OUT	VARCHAR2
)
RETURN BOOLEAN;

FUNCTION fn_fill_acct_values_table
(
p_contract_ref_no	IN		oltbs_split_tag_detail.contract_ref_no%TYPE,
p_event_seq_no		IN		oltbs_split_tag_detail.event_seq_no%TYPE,
p_acct_values_table	OUT		acct_values_table_type,
p_processed_tag		OUT		VARCHAR2,
p_error_code		IN OUT	VARCHAR2,
p_error_parameter	IN OUT	VARCHAR2
)
RETURN BOOLEAN;

FUNCTION fn_resolve_split_amounts
(
p_contract_ref_no	IN		oltbs_split_tag_detail.contract_ref_no%TYPE,
p_event_seq_no		IN		oltbs_split_tag_detail.event_seq_no%TYPE,
p_error_code		IN OUT	VARCHAR2,
p_error_parameter	IN OUT	VARCHAR2
)
RETURN BOOLEAN;

FUNCTION fn_get_amount_paid
(
p_contract_ref_no	IN		oltbs_split_tag_detail.contract_ref_no%TYPE,
p_event_seq_no		IN		oltbs_split_tag_detail.event_seq_no%TYPE,
p_due_date			IN		DATE,
p_end_date			IN		DATE,
p_counterparty		IN		oltbs_contract.counterparty%TYPE,
p_fcy_amount		IN		NUMBER,
p_fcy				IN		VARCHAR2,
p_lcy_amount		IN		NUMBER,
p_basis_amount_tag	IN		oltbs_split_tag_master.basis_amount_tag%TYPE,
p_inflow_ind		IN		VARCHAR2,
p_no_of_split_rows	OUT		NUMBER,
p_processed_tag		OUT		VARCHAR2,
p_amount_paid_table	OUT		amount_paid_table_type,
p_error_code		IN OUT	VARCHAR2,
p_error_parameter	IN OUT	VARCHAR2
)
RETURN BOOLEAN;

FUNCTION fn_update_system_split
(
p_contract_ref_no	IN		oltbs_split_tag_detail.contract_ref_no%TYPE,
p_event_seq_no		IN		oltbs_split_tag_detail.event_seq_no%TYPE,
p_basis_amount_tag	IN		oltbs_split_tag_detail.basis_amount_tag%TYPE,
p_account			IN		oltbs_split_tag_detail.split_ac_no%TYPE,
p_ccy				IN		oltbs_split_tag_detail.split_ac_ccy%TYPE,
p_ac_branch			IN		oltbs_split_tag_detail.split_ac_branch%TYPE,
p_error_code		IN OUT	VARCHAR2,
p_error_parameter	IN OUT	VARCHAR2
)
RETURN BOOLEAN;

FUNCTION fn_copy_split_tags
(
p_contract_ref_no		IN		oltbs_split_tag_detail.contract_ref_no%TYPE,
p_event_seq_no			IN		oltbs_split_tag_detail.event_seq_no%TYPE,
p_amount_tags			IN		VARCHAR2,
p_new_version_indicator	IN		oltbs_split_tag_master.new_version_indicator%TYPE,
p_error_code			IN OUT	VARCHAR2,
p_error_parameter		IN OUT	VARCHAR2
)
RETURN BOOLEAN;

FUNCTION fn_process_split_settle
(
p_branch_code		IN		oltbs_ext_contract_stat.branch_code%TYPE,
p_source_code		IN		oltbs_ext_contract_stat.source%TYPE,
p_external_ref_no	IN		oltbs_ext_contract_stat.external_ref_no%TYPE,
p_module			IN		oltbs_ext_contract_stat.module%TYPE,
p_product_code		IN		oltbs_ext_contract_stat.product_code%TYPE,
p_error_code		IN OUT	VARCHAR2,
p_error_parameter	IN OUT	VARCHAR2
)
RETURN BOOLEAN;

FUNCTION fn_import_split
(
p_contract_ref_no	IN		oltbs_contract.contract_ref_no%TYPE,
p_event_seq_no		IN		oltbs_contract.latest_event_seq_no%TYPE,
p_branch_code		IN		oltbs_contract.branch%TYPE,
p_source_code		IN		oltbs_ext_cont_intmdt_split.source_code%TYPE,
p_module_code		IN		oltbs_ext_cont_intmdt_split.module%TYPE,
p_external_ref_no	IN		oltbs_ext_cont_intmdt_split.external_ref_no%TYPE,
p_error_code		IN OUT	VARCHAR2,
p_error_parameter	IN OUT	VARCHAR2
)
RETURN BOOLEAN;

FUNCTION fn_delete
(
p_contract_ref_no	IN		oltbs_contract.contract_ref_no%TYPE,
p_event_seq_no		IN		oltbs_contract.latest_event_seq_no%TYPE,
p_error_code		IN OUT	VARCHAR2,
p_error_parameter	IN OUT	VARCHAR2
)
RETURN BOOLEAN;

FUNCTION fn_update_acs_from_is
(
p_contract_ref_no		IN		oltbs_split_tag_detail.contract_ref_no%TYPE,
p_event_seq_no			IN		oltbs_split_tag_detail.event_seq_no%TYPE,
p_error_code			IN OUT	VARCHAR2,
p_error_parameter		IN OUt	VARCHAR2
)
RETURN BOOLEAN;

END olpks_split_amount_0;
/
CREATE or replace SYNONYM  olpkss_split_amount_0 FOR olpks_split_amount_0
/