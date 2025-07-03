CREATE OR REPLACE PACKAGE lfpks_charge_liqd
AS
/*-----------------------------------------------------------------------------------------------

This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
---------------------------------------------------------------------------------------------------
06-Jun-2016 OFCL standalone changes, commented not required code. Search string--- OFCL12.2 Not required
*/
	TYPE rec_deferred_charges IS RECORD
						(
						contract_ref_no	lftbs_deferred_charge.contract_ref_no%type,
						event_seq_no	lftbs_deferred_charge.event_seq_no%type,
						component		lftbs_deferred_charge.component%type,
						charge_amount	lftbs_deferred_charge.charge_amount%type,
						charge_acc_brn	lftbs_deferred_charge.charge_acc_brn%type,
						charge_acc_no	lftbs_deferred_charge.charge_acc_no%type,
						charge_ccy		lftbs_deferred_charge.charge_ccy%type,
						module		lftbs_deferred_charge.module%type,
						event_acc_cls	lftms_charge_class.event_class%type,
						role_head_cls	lftms_charge_class.role_to_head_class%type,
						chg_liqd_day    	lftms_charge_class.charge_liquidation_day%type,
						chg_liqd_vday   	lftms_charge_class.charge_liquidation_value_day%type,
						branch_code		oltms_branch.branch_code%type,
						--ac_ccy		sttms_cust_account.ccy%type, - OFCL12.2 Not required
						ac_ccy		oltb_account.ac_gl_ccy%type,
						--cust_no		sttms_cust_account.cust_no%type, - OFCL12.2 Not required
						cust_no		oltb_account.cust_no%type,
						mis_ref_no		lftbs_chg_acc_liqd.mis_reference%TYPE
						);

	TYPE tbl_deferred_charges IS TABLE of rec_deferred_charges INDEX BY VARCHAR2(64);

	TYPE rec_class_aclookup IS RECORD
						(
						account_role_code		oltms_event_acct_entry_class.account_role_code%TYPE,
						--account			sttms_cust_account.cust_ac_no%TYPE, - OFCL12.2 Not required
						account			oltb_account.ac_gl_no%TYPE,
						amtag				oltms_event_acct_entry_class.amt_tag%TYPE,
						trncode			oltms_event_acct_entry_class.transaction_code%TYPE,
						drcrind			oltms_event_acct_entry_class.dr_cr_indicator%TYPE,
						netind			oltms_event_acct_entry_class.netting_indicator%TYPE,
						msg_netind			oltms_event_acct_entry_class.msg_netting_indicator%TYPE,
						tagtype			oltms_event_acct_entry_class.amount_tag_type%TYPE,
						--glcat				gltm_glmaster.category%TYPE,
						glcat				oltb_account.gl_category%TYPE,
						mis_head			oltms_event_acct_entry_class.mis_head%TYPE,
						internal_gl_type		oltms_event_acct_entry_class.internal_gl_type%TYPE,
						track_receivable		oltms_event_acct_entry_class.track_receivable%TYPE,
						receivable_accrole	oltms_event_acct_entry_class.receivable_accrole%TYPE,
						receivable_txn_code	oltms_event_acct_entry_class.receivable_txn_code%TYPE,
						max_retry			oltms_event_acct_entry_class.max_retry%TYPE,
						rate_code			oltms_event_acct_entry_class.rate_code%TYPE,
						rate_type			oltms_event_acct_entry_class.rate_type%TYPE,
						delinquency_product	oltms_product_event_acct_entry.delinquency_product%TYPE,
						bal_chk_online		oltms_product_event_acct_entry.bal_chk_online%TYPE,
						bal_chk_batch		oltms_product_event_acct_entry.bal_chk_batch%TYPE
						);

	TYPE tbl_classentry_lookup IS TABLE OF rec_class_aclookup INDEX BY VARCHAR2(64);

	tb_class_aclookup	tbl_classentry_lookup;	

	FUNCTION fn_post_consol_chg
		(
		p_charge_class_record		IN		lftms_charge_class%ROWTYPE,
		p_tb_liqd_consol			IN		lfpkss_deferred_charge.tbl_liqd_nonconsol,
		p_ac_ccy				IN		cytms_ccy_defn.ccy_code%TYPE,
		p_cust_no				IN		oltms_customer.customer_no%TYPE,
		--p_charge_statement_reqd 	IN		sttms_cust_account.charge_statement_reqd%TYPE,- OFCL12.2 Not required
		p_charge_statement_reqd 	IN		VARCHAR2,
		p_error_code			IN OUT	VARCHAR2,
		p_error_parameter			IN OUT	VARCHAR2
		)
	RETURN BOOLEAN;

	FUNCTION fn_post_nonconsol_chg
		(
		p_charge_class_record	IN		lftms_charge_class%ROWTYPE,
		p_tb_liqd_nonconsol	IN		lfpkss_deferred_charge.tbl_liqd_nonconsol,
		p_ac_ccy			IN		cytms_ccy_defn.ccy_code%TYPE,
		p_cust_no			IN		oltms_customer.customer_no%TYPE,	
		p_error_code		IN OUT	VARCHAR2,
		p_error_parameter		IN OUT	VARCHAR2
		)
	RETURN BOOLEAN;

	FUNCTION fn_create_achoff
		(
		p_deferred_charges	IN		tbl_deferred_charges,
		p_value_date		IN		DATE,
		tbl_achoff			IN OUT	olpkss_accounting.tbl_achoff
		)
	RETURN BOOLEAN;

	FUNCTION fn_class_aclookup
		(
		p_rolehead_cls	IN		lftms_charge_class.role_to_head_class%TYPE,
		p_eventacc_cls	IN		lftms_charge_class.event_class%TYPE,
		p_event		IN		oltbs_daily_log_ac.Event%TYPE,
		p_module		IN		oltbs_daily_log_ac.MODULE%TYPE,
		tb_class_aclookup	IN OUT	tbl_classentry_lookup
		)
	RETURN BOOLEAN;

	FUNCTION fn_pop_deferred_history
		(
		p_tb_history	IN		lfpkss_deferred_charge.tbl_liqd_nonconsol,
		p_error_code	IN OUT	VARCHAR2,
		p_error_parameter	IN OUT	VARCHAR2
		)
	RETURN BOOLEAN;
	
	FUNCTION fn_pop_consol_history
		(
		p_tb_history	IN		lfpkss_deferred_charge.tbl_liqd_nonconsol,
		p_error_code	IN OUT	VARCHAR2,
		p_error_parameter	IN OUT	VARCHAR2
		)
	RETURN BOOLEAN;

	PROCEDURE pr_log_exception
		(
		p_branch_code	IN	VARCHAR2,
		p_cust_ac_no	IN	VARCHAR2,
		p_exception_from	IN	VARCHAR2,
		p_trn_ref_no	IN	VARCHAR2,
		p_event_sr_no	IN	VARCHAR2,
		p_error_code	IN	VARCHAR2,
		p_error_parameter	IN	VARCHAR2
		);

END lfpks_charge_liqd;
/
CREATE or replace SYNONYM lfpkss_charge_liqd FOR lfpks_charge_liqd
/