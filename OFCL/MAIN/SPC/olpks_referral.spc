CREATE OR REPLACE PACKAGE olpks_referral AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_referral.SPC
**
** Module		: MIS
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
/* CHANGE HISTORY:
9-MAY-2002 FCC 4.0 JUNE 2002 CITIPLC CHANGES overloaded functions fn_chk_mand_cust_mis and fn_chk_mand_txn_mis
		   	   	   			 		 		 to check the mandatory mis class entry in W tables
06-Mar-2003 Fcc4.2 April 2003 related changes for OPS starts.Added new function Fn_default_mis_class which will
		default the Mis codes for the Mis classes having a derivation rule.
29-Apr-2003	FCC 4.2 April 2003 OPS Changes
		Overloaded the function fn_get_con_default for defaulting Addl Mis details for a contract.
		Function fn_get_product_default_values added.
16-APR-2004 FCC 4.4 MAY 2004 Changes to delete the entry from OLTW_POOL_RATE_QUEUE.
21-JAN-2006 FLEXCUBE V.CL Release 7.0 CHANGES PIYUSH, ADDED ONE NEW OVERLOADED FUNCTION fn_get_con_default  AND PLSQL TABLE AND
            ADDED ONE NEW OVERLOADED FUNCTION fn_get_product_default_values  AND PLSQL TABLE  FOR PARTICIPANT PROCESSING
21-APR-2006 	TILL#203. Retro as part of Flexcube V.CL Release 7.0
		function call to fn_mis_rate_pickup added 

26-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#26, Retro Changes CITIUS-LS-705, MIS Details should default from Tranche to Drawdown
06-Jun-2016 OFCL standalone changes, commented not required code. Search string--- OFCL12.2 Not required
21-SEP-2016 OFCL standalone changes, moved procedure Pr_mis_tb here from global package. Search string--- OFCL12.2 Not required
*/
TYPE   rec_mis_dtls IS RECORD (
					  Mis_class		gltms_mis_class.Mis_class%TYPE,
					  Mis_type		gltms_mis_class.Mis_type%TYPE,
					  Class_num		gltms_mis_class.Class_num%TYPE,
					  Mis_code		gltms_mis_class.Mis_class%TYPE
					  );
TYPE ty_mis_dtls	IS TABLE OF  rec_mis_dtls INDEX BY BINARY_INTEGER;
TYPE tab_cost_code IS TABLE OF oltms_accls_default.cost_code1%type index by BINARY_INTEGER ;
--OFCL12.2 Not required start
TYPE rec_mis_class IS RECORD (   Mis_class		gltms_mis_class.Mis_class%TYPE,
				 Mis_type		gltms_mis_class.Mis_type%TYPE,
				 Class_num		gltms_mis_class.Class_num%TYPE,
				 Brn_res		CHAR(1),
				 Drv_reqd		Varchar2(1),
				 Mandatory		gltms_mis_class.Mandatory%TYPE,
				 Dep_res		CHAR(1)
			     );

TYPE ty_mis_class IS TABLE OF rec_mis_class INDEX BY BINARY_INTEGER;
-- OFCL12.2 Not required end
function fn_get_acc_default(
	pm_branch       in              oltms_branch.branch_code%type,
	/*pm_acc          in              sttms_cust_account.cust_ac_no%type,	
	pm_ccy          in              sttms_cust_account.ccy%type,
	pm_aclass       in              sttms_cust_account.account_class%type,
	pm_cust         in              sttms_cust_account.cust_no%type) return boolean;*/-- OFCL12.2 Not required
	pm_acc          in              oltb_account.ac_gl_no%type,
	pm_ccy          in              oltb_account.ac_gl_ccy%type,
	pm_aclass       in              oltb_account.ac_class%type,
	pm_cust         in              oltb_account.cust_no%type) return boolean;
function fn_get_con_default(
	pm_branch       in              oltms_branch.branch_code%type,
	pm_ref          in              oltbs_class_mapping.unit_ref_no%type,
	--pm_cust         in              sttms_cust_account.cust_no%type,-- OFCL12.2 Not required
	--pm_ccy          in              sttms_cust_account.ccy%type) return boolean;-- OFCL12.2 Not required
	pm_cust         in              oltb_account.cust_no%type,
	pm_ccy          in              oltb_account.ac_gl_ccy%type) return boolean;
function fn_check_cost_code(
	pm_ccode_in     in              tab_cost_code,
	pm_ccode_out    out             tab_cost_code,
	pm_ccy          in              mitms_cost_code.cost_ccy%type,
	--pm_global_ccy   in              sttms_cust_account.ccy%type) return boolean;-- OFCL12.2 Not required
	pm_global_ccy   in              oltb_account.ac_gl_ccy%type) return boolean;
function fn_delete(
	pm_branch       in              oltms_branch.branch_code%type,
	pm_unit_ref     in              oltbs_class_mapping.unit_ref_no%type,
	pm_unit_type    in              oltbs_class_mapping.unit_type%type,
	pm_flag         in              char) return  boolean;
function fn_delete_field_log(
	pm_rowid        in              sttbs_field_log.key_id%type,
	pm_branch       in              oltms_branch.branch_code%type,
	pm_unit_ref     in              oltbs_class_mapping.unit_ref_no%type,
	pm_unit_type    in              oltbs_class_mapping.unit_type%type,
	pm_type         in              char) return  boolean ;
function fn_copy (
	pm_old_branch       in      oltms_branch.branch_code%type,
	pm_old_key          in      varchar2,
	pm_unit_type        in      oltbs_class_mapping.unit_type%type,
	pm_new_branch       in      oltms_branch.branch_code%type,
	pm_new_key          in      varchar2,
	pm_type             in      char) return boolean;
function fn_update_field_log(
	pm_mode         in              char,
	pm_rowid        in              sttbs_field_log.key_id%type,
	pm_mod_no       in              sttbs_field_log.mod_no%type,
	pm_branch       in              varchar2,
	pm_key          in              sttbs_field_log.detail_key%type,
	pm_func_id      in              sttbs_field_log.function_id%type,
	pm_type         in              char) return boolean;
Procedure Insert_Into_Field_Log(
	pm_field_name   in              sttbs_field_log.field_name%type,
	pm_new_value    in              sttbs_field_log.new_value%type,
	pm_rowid        in              sttbs_field_log.key_id%type,
	pm_mod_no       in              sttbs_field_log.mod_no%type,
	pm_key          in              sttbs_field_log.detail_key%type,
	pm_item_no      in              sttbs_field_log.item_no%type,
	pm_func_id      in              sttbs_field_log.function_id%type,
	pm_block_name   in              sttbs_field_log.block_name%type,
	pm_table_name   in              sttbs_field_log.table_name%type);
function fn_delete_contract_log(
	pm_branch       in              oltms_branch.branch_code%type,
	pm_refno        in              oltbs_contract_change_log.contract_ref_no%type,
	pm_event        in              oltbs_contract_change_log.event_seq_no%type,
	pm_type         in              char) return  boolean ;
function fn_copy_contract(
	pm_old_refno    in              oltbs_contract_change_log.contract_ref_no%type,
	pm_new_refno    in              oltbs_contract_change_log.contract_ref_no%type,
	pm_type         in              char) return  boolean ;
procedure insert_into_contract_log(
	pm_refno        in              oltbs_contract_change_log.contract_ref_no%type,
	pm_event        in              oltbs_contract_change_log.event_seq_no%type,
	pm_seqno        in              oltbs_contract_change_log.change_seq_no%type,
	pm_date         in              oltbs_contract_change_log.date_changed%type,
	pm_field        in              oltbs_contract_change_log.field_changed%type,
	pm_newval       in              oltbs_contract_change_log.new_value%type);
function fn_update_contract_log(
	pm_mode         in              char,
	pm_branch	in		oltms_branch.branch_code%type,
	pm_refno        in              oltbs_contract_change_log.contract_ref_no%type,
	pm_event        in              oltbs_contract_change_log.event_seq_no%type,
	pm_type         in              char) return boolean;
--
-- FPAM Changes Start, Added the function for copying mis details in DEMLTONL
--
FUNCTION fn_get_de_con_default
	(
	pm_branch			IN		oltms_branch.branch_code%TYPE,
	pm_contract_ref_no	IN		oltbs_class_mapping.unit_ref_no%TYPE,
	pm_account_no		IN		oltbs_class_mapping.unit_ref_no%TYPE,
	pm_ccy			IN		cytms_ccy_defn.ccy_code%TYPE
	)
	RETURN BOOLEAN;
/*  21-JAN-2006 FLEXCUBE V.CL Release 7.0 CHANGES PIYUSH STARTS*/
FUNCTION fn_get_con_default (
	pm_branch   IN    oltms_branch.branch_code%type,
	pm_ref      IN   oltbs_class_mapping.unit_ref_no%type,
	--pm_cust     IN    sttms_cust_account.cust_no%type,-- OFCL12.2 Not required
	--pm_ccy      IN    sttms_cust_account.ccy%type,-- OFCL12.2 Not required
	pm_cust     IN    oltb_account.cust_no%type,
	pm_ccy      IN    oltb_account.ac_gl_ccy%type,
	pm_val_dt	IN      oltbs_contract_master.value_date%type,
      pm_module   IN     VARCHAR2  )
RETURN BOOLEAN;
 /*  21-JAN-2006 FLEXCUBE V.CL Release 7.0 CHANGES PIYUSH ENDS*/
--
-- FPAM Changes End
--
--PHPCBC Changes Til No.9 functions to check for mandatory mis class
function fn_chk_mand_cust_mis(p_customer in oltms_customer.customer_no%type)
return boolean;
 --fcc 4.0 JUNE 2002 CITIPLC changes starts here
function fn_chk_mand_cust_mis(p_customer in oltms_customer.customer_no%type,
							p_call_func_id  in varchar2 )
return boolean;
--fcc 4.0 JUNE 2002 CITIPLC changes ends here
Function fn_chk_mand_txn_mis(p_branch in oltms_branch.branch_code%type,
				     p_type   in oltbs_class_mapping.unit_type%type,
				     p_ref_no in oltbs_class_mapping.unit_ref_no%type)
return boolean;
-- End of PHPCBC changes
--fcc 4.0 JUNE 2002 CITIPLC changes starts here
Function fn_chk_mand_txn_mis(p_branch in oltms_branch.branch_code%type,
				     p_type   in oltbs_class_mapping.unit_type%type,
				     p_ref_no in oltbs_class_mapping.unit_ref_no%type,
				     p_call_func_id  in varchar2 )
return boolean;
--fcc 4.0 JUNE 2002 CITIPLC changes ends here
-- FCC 4.0 ITR2 SCF 77 Start
FUNCTION fn_process_contract_backup
	(
	p_branch_code		IN 		OLTB_CLASS_MAPPING.branch_code%TYPE,
	p_unit_ref_no		IN 		OLTB_CLASS_MAPPING.unit_ref_no%TYPE,
	p_unit_type			IN 		OLTB_CLASS_MAPPING.unit_type%TYPE,
	p_action_code		IN		VARCHAR2,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter	IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;
-- FCC 4.0 ITR2 SCF 77 Start
--Fcc4.2 April 2003 related changes for OPS starts
FUNCTION Fn_default_mis_class(
					P_module_code		    Smtbs_modules.Module_id%TYPE,
					P_tb_mis_dtls	OUT 	    ty_mis_dtls,
					P_err_code		IN OUT    Varchar2,
					P_err_param		IN OUT    Varchar2
					)
RETURN BOOLEAN;
--Fcc4.2 April 2003 related changes for OPS ends
-- FCC 4.2 April 2003 OPS Changes starts
function fn_get_con_default(
	pm_branch       in              oltms_branch.branch_code%type,
	pm_ref          in              oltbs_class_mapping.unit_ref_no%type,
	--pm_cust         in              sttms_cust_account.cust_no%type,-- OFCL12.2 Not required
	--pm_ccy          in              sttms_cust_account.ccy%type,-- OFCL12.2 Not required
	pm_cust     IN    oltb_account.cust_no%type,
	pm_ccy      IN    oltb_account.ac_gl_ccy%type,
	pm_val_dt	    in 		  oltbs_contract_master.value_date%type) return boolean;
FUNCTION fn_get_product_default_values
							(
							p_product oltbs_contract_master.PRODUCT%TYPE,
							p_contract_ref_no oltbs_contract.CONTRACT_REF_NO%TYPE,
							p_LATEST_EVENT_SEQ_NO oltbs_contract.LATEST_EVENT_SEQ_NO%TYPE,
							p_value_date date,
							p_err	IN OUT ERTBS_MSGS.ERR_CODE%TYPE,
							p_erp	IN OUT varchar2
							)
RETURN boolean;
/* 21-JAN-2006 FLEXCUBE V.CL Release 7.0 CHANGES PIYUSH STARTS */
FUNCTION fn_get_product_default_values
							(
							p_product oltbs_contract_master.PRODUCT%TYPE,
							p_contract_ref_no oltbs_contract.CONTRACT_REF_NO%TYPE,
							p_LATEST_EVENT_SEQ_NO oltbs_contract.LATEST_EVENT_SEQ_NO%TYPE,
							p_value_date date,
                                          P_MODULE VARCHAR2,
							p_err	IN OUT ERTBS_MSGS.ERR_CODE%TYPE,
							p_erp	IN OUT varchar2
							)
RETURN boolean;
/* 21-JAN-2006 FLEXCUBE V.CL Release 7.0 CHANGES PIYUSH ENDS */
-- FCC 4.2 April 2003 OPS Changes ends
-- Fcc 4.3 OPS Changes starts
FUNCTION fn_update_spread
			(
			p_contract_ref_no	IN	oltbs_contract_mis_rates.contract_ref_no%TYPE,
			p_component			IN	oltbs_contract_mis_rates.component%TYPE,
			p_event_seq_no		IN	oltbs_contract_mis_rates.event_seq_no%TYPE,
			p_spread			IN	oltbs_contract_mis_rates.spread%TYPE
			)
RETURN BOOLEAN;
-- Fcc 4.3 OPS Changes ends
-- FCC 4.5 MAY 2004
FUNCTION fn_populate_rate_queue
	(
	p_branch			IN		VARCHAR2,
	p_contract_ref_no		IN		VARCHAR2,
	p_effective_date		IN		DATE,
	p_currency			IN		VARCHAR2,
	p_who_calls			IN		VARCHAR2,
	p_unit_type			IN		VARCHAR2,
	pErrorCode			IN	OUT	VARCHAR2,
	pErrorParams		IN	OUT	VARCHAR2
	)
RETURN BOOLEAN;
-- FCC 4.5 MAY 2004

--TILL#203. Retro as part of Flexcube V.CL Release 7.0 start
FUNCTION Fn_mis_rate_pickup
				(
				p_contract_ref_no		IN	VARCHAR2,
				p_rate_picked_up		OUT	VARCHAR2,
				p_error_code			IN OUT	VARCHAR2,
				p_error_parameter		IN OUT	VARCHAR2
				)
RETURN BOOLEAN;
--TILL#203. Retro as part of Flexcube V.CL Release 7.0 end

/* 21-JAN-2006 FLEXCUBE V.CL Release 7.0 CHANGES PIYUSH*/

TYPE t_mitb_class_mapping         IS TABLE OF OLTB_CLASS_MAPPING%ROWTYPE          INDEX BY BINARY_INTEGER;
 P_inc_mitcls_mapping  t_mitb_class_mapping ;
 
TYPE t_mitbs_cont_mis_rates IS TABLE OF oltbs_contract_mis_rates%ROWTYPE          INDEX BY BINARY_INTEGER;
 P_inc_mitcont_rates  t_mitbs_cont_mis_rates ; 

/* 21-JAN-2006 FLEXCUBE V.CL Release 7.0 CHANGES PIYUSH*/
-- FLEXCUBE V.CL Release 7.3 ITR2 SFR#26, Retro Changes CITIUS-LS-705,26-DEC-2007 , MIS Details should default from Tranche to Drawdown START
FUNCTION Fn_default_mis(
					P_module_code	IN	  Smtbs_modules.Module_id%TYPE,
					P_tb_mis_dtls	OUT 	  ty_mis_dtls,
					P_err_code	IN OUT    Varchar2,
					P_err_param	IN OUT    Varchar2
		       )
RETURN BOOLEAN;
-- FLEXCUBE V.CL Release 7.3 ITR2 SFR#26, Retro Changes CITIUS-LS-705,26-DEC-2007 , MIS Details should default from Tranche to Drawdown END
PROCEDURE Pr_mis_tb(P_tb_mis_class	OUT ty_mis_class);---- OFCL12.2 Not required
end olpks_referral;

/
create or replace synonym olpkss_referral for olpks_referral
/