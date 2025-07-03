CREATE OR REPLACE PACKAGE olpks_csupload_services
AS

/*-----------------------------------------------------------------------------------------
**
** File Name	: olpks_csupload_services.SPC
**
** Module		: CORE
**
This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
** -------------------------------------------------------------------------------------
*/
/* CHANGE HISTORY
26 Jun 2001 Citiplc Retro.SFR 79 UDF support for Csupload.
*/

-------------------------------------------------------------------------------
	g_halt_on_exception		EXCEPTION;

	g_halt_error_code		varchar2(1000) := NULL;
	g_halt_error_parameter		varchar2(1000) := NULL;
-------------------------------------------------------------------------------

FUNCTION fn_insert_import_wip
	(
	pm_user			IN	smtbs_user.user_id%TYPE,
	pm_source		IN	varchar2,
	pm_dates		IN	varchar2,
	pm_products		IN	varchar2
	) 
	RETURN boolean;

FUNCTION fn_obtain_contract_lock
	(
	p_source_code		IN	oltbs_ext_contract_stat.source%TYPE,
	p_source_ref		IN	oltbs_ext_contract_stat.external_ref_no%TYPE,
	p_record_lock_obtained	IN OUT	boolean,
	p_error_code		IN OUT	varchar2,	
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_preliminary_check
	(
	p_module_code		IN	smtbs_modules.module_id%TYPE,
	p_product_code		IN	oltms_product.product_code%TYPE,
	p_ccy_code		IN	cytms_ccy_defn.ccy_code%TYPE,
	p_customer		IN	oltms_customer.customer_no%TYPE,
	p_user_ref_no		IN	oltbs_contract.user_ref_no%TYPE,
	p_line_code		IN	VARCHAR2,
	p_tenor			IN	integer,
	p_error_code		IN OUT	varchar2,	
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_check_country_code
	(
	p_country_code		IN	sttms_country.country_code%TYPE,
	p_error_code		IN OUT	varchar2,	
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_check_lang_code
	(
	p_lang_code		IN	smtbs_language.lang_code%TYPE,	
	p_error_code		IN OUT	varchar2,	
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_what_to_do
	(	
	p_action_on_override	IN	char, -- R/H/P
	p_action_on_exception	IN	char, -- R/H
	p_status_on_save	IN	char, -- H/U/A
	p_what_to_do		OUT 	char, -- R/H/P
	p_auth_status		OUT	char, -- U/A
	p_error_code		IN OUT	varchar2,
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_get_into_cube
	( 
	p_module_code		IN	oltbs_contract.module_code%TYPE,
	p_product_code		IN	oltbs_contract.product_code%TYPE,
	p_product_type		IN	oltbs_contract.product_type%TYPE,
	p_counterparty		IN	oltbs_contract.counterparty%TYPE,
	p_contract_ccy		IN	oltbs_contract.contract_ccy%TYPE,
	p_contract_status	IN	oltbs_contract.contract_status%TYPE,
	p_auth_status		IN	oltbs_contract.auth_status%TYPE,
	p_crn 			OUT	varchar2,
	p_error_code		IN OUT	varchar2,
	p_error_parameter	IN OUT	varchar2
	)
	RETURN BOOLEAN;

FUNCTION fn_date_time
	(
	p_date			IN	date
	)
	RETURN DATE;

FUNCTION fn_update_exception
	(
	p_source_code		IN	oltbs_upload_exception_cs.source_code%TYPE,
	p_source_ref_no		IN	oltbs_upload_exception_cs.source_ref%TYPE,
	p_upload_id		IN	oltbs_upload_exception_cs.upload_id%TYPE,
	p_error_code		IN OUT	varchar2,
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_update_override
	(
	p_module		IN	oltbs_contract_ovd.module%TYPE,
	p_contract_ref_no	IN	oltbs_contract_ovd.contract_ref_no%TYPE,
	p_event_seq_no		IN	oltbs_contract_ovd.event_seq_no%TYPE,
	p_error_code		IN OUT	varchar2,	
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_update_override
	(
	p_module			IN		oltbs_contract_ovd.module%TYPE,
	p_contract_ref_no		IN		oltbs_contract_ovd.contract_ref_no%TYPE,
	p_event_seq_no		IN		oltbs_contract_ovd.event_seq_no%TYPE,
	p_start_ovd_seq_no	IN		oltbs_contract_ovd.ovd_seq_no%TYPE,
	p_end_ovd_seq_no		OUT		oltbs_contract_ovd.ovd_seq_no%TYPE,
	p_error_code		IN OUT	VARCHAR2,	
	p_error_parameter		IN OUT	VARCHAR2
	)
	RETURN boolean;

FUNCTION fn_update_log
	(
	p_upload_id		IN	oltbs_upload_log_cs.upload_id%TYPE,
	p_source_code		IN	oltbs_upload_log_cs.source_code%TYPE,
	p_module_code		IN	oltbs_upload_log_cs.module_code%TYPE,
	p_start_time		IN	oltbs_upload_log_cs.start_time%TYPE,
	p_end_time		IN	oltbs_upload_log_cs.end_time%TYPE,
	p_post_upload_status	IN	oltbs_upload_log_cs.post_upload_status%TYPE,
	p_on_error_status	IN	oltbs_upload_log_cs.on_error_status%TYPE,
	p_on_override_status	IN	oltbs_upload_log_cs.on_override_status%TYPE,
	p_process_status	IN	oltbs_upload_log_cs.process_status%TYPE,
	p_process_err_code	IN	oltbs_upload_log_cs.process_err_code%TYPE,
	p_uploaded_auth		IN	oltbs_upload_log_cs.uploaded_auth%TYPE,
	p_uploaded_unauth	IN	oltbs_upload_log_cs.uploaded_unauth%TYPE,
	p_uploaded_hold		IN	oltbs_upload_log_cs.uploaded_hold%TYPE,
	p_rejected		IN	oltbs_upload_log_cs.rejected%TYPE,
	p_total_processed	IN	oltbs_upload_log_cs.total_processed%TYPE,
	p_error_code		IN OUT	varchar2,	
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_update_activity
	(
	p_source_code		IN	oltbs_upload_activity.source_code%TYPE,
	p_source_ref		IN	oltbs_upload_activity.source_ref%TYPE,
	p_upload_id		IN	oltbs_upload_activity.upload_id%TYPE,
	p_cube_ref_no		IN	oltbs_contract.contract_ref_no%TYPE,
	p_status		IN	oltbs_upload_activity.status%TYPE,
	p_auth_status		IN	oltbs_contract.auth_status%TYPE,
	p_error_code		IN OUT	varchar2,
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

--CITIPLC Retro SFR 79,26 Jun 2001,User Defined Fields(UDF) Validation
pkg_function_id	smtbs_menu.function_id%type;
pkg_last_func	smtbs_menu.function_id%type;
pkg_elem_tab	olpkss_userdef_flds.ty_elem_tab;
pkg_key_tab		olpkss_userdef_flds.ty_char_tab;
has_udf		boolean;
pkg_key_cnt		number;
pkg_elem_cnt	number;
g_key_val		varchar2(4000);
	
FUNCTION 	fn_set_function_id (p_function_id in varchar2) return boolean;
PROCEDURE 	pr_init (p_function_id varchar2);
FUNCTION fn_set_vals (p_function_id varchar2,p_key_list	varchar2,p_write_key varchar2,p_err out varchar2,p_prm out varchar2) 
return boolean;
FUNCTION fn_set_vals (p_function_id varchar2,p_key_list	varchar2,p_err out varchar2,p_prm out varchar2) 
return boolean;

function fn_save_udf(	p_function_id varchar2,
				p_key_list varchar2,
				p_write_key varchar2,
				p_ovd_tab out olpkss_userdef_flds.ty_char_tab,	
				p_err_tab out olpkss_userdef_flds.ty_char_tab)
return boolean;

function fn_save_udf(	p_function_id varchar2,
				p_key_list varchar2,
				p_ovd_tab out olpkss_userdef_flds.ty_char_tab,	
				p_err_tab out olpkss_userdef_flds.ty_char_tab)
return boolean; 

--CITIPLC Retro SFR 79,26 Jun 2001,User Defined Fields(UDF) Validation ends here

END olpks_csupload_services;
/
CREATE or replace SYNONYM olpkss_csupload_services FOR olpks_csupload_services
/