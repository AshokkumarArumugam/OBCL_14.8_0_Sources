CREATE OR REPLACE PACKAGE lfpks_deferred_charge
AS
/*----------------------------------------------------------------------------------------------------

This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
06-Jun-2016 OFCL standalone changes, commented not required code. Search string--- OFCL12.2 Not required
*/
	TYPE rec_liqd_nonconsol IS RECORD
						(
						contract_ref_no			lftbs_deferred_chg_history.contract_ref_no%TYPE,
						event_seq_no			lftbs_deferred_chg_history.event_seq_no%TYPE,
						component				lftbs_deferred_chg_history.component%TYPE,
						module				lftbs_deferred_chg_history.module%TYPE,
						charge_acc_brn			lftbs_deferred_chg_history.charge_acc_brn%TYPE,
						charge_acc_no			lftbs_deferred_chg_history.charge_acc_no%TYPE,
						charge_ccy				lftbs_deferred_chg_history.charge_ccy%TYPE,
						charge_amount			lftbs_deferred_chg_history.charge_amount%TYPE,
						consolidation_reqd		lftbs_deferred_chg_history.consolidation_reqd%TYPE,
						liquidation_indicator		lftbs_deferred_chg_history.liquidation_indicator%TYPE,
						trn_date				lftbs_deferred_chg_history.trn_date%TYPE,
						reversal_status			lftbs_deferred_chg_history.reversal_status%TYPE,
						liquidation_esn			lftbs_deferred_chg_history.liquidation_esn%TYPE,
						liqd_basis_date			lftbs_deferred_chg_history.liqd_basis_date%TYPE,
						liqd_trn_date			lftbs_deferred_chg_history.liqd_trn_date%TYPE,
						liqd_value_date			lftbs_deferred_chg_history.liqd_value_date%TYPE,
						rev_trn_date			lftbs_deferred_chg_history.rev_trn_date%TYPE,
						consol_ref_no			lftbs_deferred_chg_history.consol_ref_no%TYPE,
						reversal_consol_ref_no		lftbs_deferred_chg_history.consol_ref_no%TYPE,
						mis_ref_no				lftbs_chg_acc_liqd.mis_reference%TYPE
						);

	TYPE tbl_liqd_nonconsol IS TABLE OF rec_liqd_nonconsol INDEX BY VARCHAR2(64); 					
	
	FUNCTION fn_process_for_a_branch
		(
		p_error_code		IN OUT	VARCHAR2,
		p_error_parameter		IN OUT	VARCHAR2
		)
	RETURN BOOLEAN;

	FUNCTION fn_liqd_deferred_chg_online
				(
				p_branch_code		IN		oltms_branch.branch_code%TYPE,
				--p_cust_ac_no		IN		sttms_cust_account.cust_ac_no%TYPE, -- OFCL12.2 Not required
				 p_cust_ac_no		IN		oltb_account.ac_gl_no%TYPE,
				p_module			IN		smtb_modules.module_id%TYPE,
				p_component			IN		lftms_charge_class.class_code%TYPE,	
				p_error_code		IN OUT	VARCHAR2,
				p_error_parameter		IN OUT	VARCHAR2
				)
	RETURN BOOLEAN;

	FUNCTION fn_get_process_till_date
		(
		--p_branch_code			IN		sttms_cust_account.branch_code%TYPE,		 -- OFCL12.2 Not required
		p_branch_code			IN		oltb_account.branch_code%TYPE,
		p_curr_process_till_date	OUT		DATE,
		p_error_code			IN OUT	VARCHAR2,
		p_error_parameter			IN OUT	VARCHAR2		
		)
	RETURN BOOLEAN;

	FUNCTION fn_get_process_date_for_class
		(
		p_charge_class			IN		lftms_charge_class.class_code%TYPE,
		p_charge_frequency		IN		lftms_charge_class.charge_frequency%TYPE,
		p_basis_month			IN		lftms_charge_class.basis_month%TYPE,
		p_prev_processing_date		IN		DATE,
		p_next_processing_date		OUT		DATE,
		p_error_code			IN OUT	VARCHAR2,
		p_error_parameter			IN OUT	VARCHAR2
		)
	RETURN BOOLEAN;

	FUNCTION fn_liquidate_deferred_charge
		(
		p_charge_class_record	IN		lftms_charge_class%ROWTYPE,
		--p_cust_ac_no		IN		sttms_cust_account.cust_ac_no%TYPE,		 -- OFCL12.2 Not required
		p_cust_ac_no		IN		oltb_account.ac_gl_no%TYPE,
		p_error_code		IN OUT	VARCHAR2,
		p_error_parameter		IN OUT	VARCHAR2
		)
	RETURN BOOLEAN;

	FUNCTION fn_populate_deferred_charges
		(
		p_charge_class_record	IN		lftms_charge_class%ROWTYPE,
		p_error_code		IN OUT 	VARCHAR2,
		p_error_parameter		IN OUT 	VARCHAR2
		)
	RETURN BOOLEAN;
	
	FUNCTION fn_liqd_entrylevel_consol
		(
		p_charge_class_record			IN		lftms_charge_class%ROWTYPE,
		--p_cust_ac_no				IN		sttms_cust_account.cust_ac_no%TYPE, -- OFCL12.2 Not required
		p_cust_ac_no		IN		oltb_account.ac_gl_no%TYPE,
		p_error_code				IN OUT	VARCHAR2,
		p_error_parameter				IN OUT	VARCHAR2
		)
	RETURN BOOLEAN;

	FUNCTION fn_liqd_chargelevel_consol
		(
		p_charge_class_record			IN		lftms_charge_class%ROWTYPE,
		--p_cust_ac_no				IN		sttms_cust_account.cust_ac_no%TYPE, -- OFCL12.2 Not required
		p_cust_ac_no				IN		oltb_account.ac_gl_no%TYPE,
		p_error_code				IN OUT	VARCHAR2,
		p_error_parameter				IN OUT	VARCHAR2
		)
	RETURN BOOLEAN;

	FUNCTION fn_liqd_nonconsol_chg
		(
		p_charge_class_record			IN		lftms_charge_class%ROWTYPE,
		--p_cust_ac_no				IN		sttms_cust_account.cust_ac_no%TYPE, -- OFCL12.2 Not required
		p_cust_ac_no				IN		oltb_account.ac_gl_no%TYPE,
		p_error_code				IN OUT	VARCHAR2,
		p_error_parameter				IN OUT	VARCHAR2
		)
	RETURN BOOLEAN;

	FUNCTION fn_get_charge_account
		(
		p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
		p_event_seq_no		IN		oltbs_contract.contract_ref_no%TYPE,
		p_component			IN		lftms_product_charge.component%TYPE,
		p_cust_no			IN		lftbs_charge_liqd_master.counterparty%TYPE, -- FCC 4.3.1 STG CHanges 20-OCT-2003
		p_txn_branch		IN		oltms_branch.branch_code%TYPE,
		--p_txn_account		IN		sttms_cust_account.cust_ac_no%TYPE, -- OFCL12.2 Not required
		p_txn_account		IN		oltb_account.ac_gl_no%TYPE,
		p_charge_branch		OUT		oltms_branch.branch_code%TYPE,
		--p_charge_account		OUT		sttms_cust_account.cust_ac_no%TYPE, -- OFCL12.2 Not required
		p_charge_account		OUT		oltb_account.ac_gl_no%TYPE,
		p_error_code		IN OUT	VARCHAR2,
		p_error_parameter		IN OUT	VARCHAR2
		)
	RETURN BOOLEAN;

	FUNCTION fn_populate_nonconsol_chg
		(
		p_charge_branch		IN		oltms_branch.branch_code%TYPE,
		--p_charge_account		IN		sttms_cust_account.cust_ac_no%TYPE, -- OFCL12.2 Not required
		p_charge_account		IN		oltb_account.ac_gl_no%TYPE,
		p_module			IN		smtbs_modules.module_id%TYPE,
		p_component			IN		lftms_product_charge.component%TYPE,
		p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
		p_event_seq_no		IN		oltbs_contract.latest_event_seq_no%TYPE,
		p_charge_ccy		IN		cytms_ccy_defn.ccy_code%TYPE,
		p_charge_amount		IN		lftbs_deferred_charge.charge_amount%TYPE,
		p_charge_class_record	IN		lftms_charge_class%ROWTYPE,
		p_error_code		IN OUT	VARCHAR2,
		p_error_parameter		IN OUT	VARCHAR2
		)
	RETURN BOOLEAN;

	FUNCTION fn_populate_consol_chg
		(
		p_charge_branch		IN		oltms_branch.branch_code%TYPE,
		--p_charge_account		IN		sttms_cust_account.cust_ac_no%TYPE, -- OFCL12.2 Not required
		 p_charge_account		IN		oltb_account.ac_gl_no%TYPE,
		p_module			IN		smtbs_modules.module_id%TYPE,
		p_component			IN		lftms_product_charge.component%TYPE,
		p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
		p_event_seq_no		IN		oltbs_contract.latest_event_seq_no%TYPE,
		p_charge_ccy		IN		cytms_ccy_defn.ccy_code%TYPE,
		p_charge_amount		IN		lftbs_deferred_charge.charge_amount%TYPE,
		p_charge_class_record	IN		lftms_charge_class%ROWTYPE,
		p_insert_detail_row	IN		VARCHAR2,
		p_consol_ref_no		OUT		LFTB_DEFERRED_CHARGE.contract_ref_no%TYPE,
		p_error_code		IN OUT	VARCHAR2,
		p_error_parameter		IN OUT	VARCHAR2
		)
	RETURN BOOLEAN;

	FUNCTION fn_generate_mis_reference
		(
		p_mis_group		IN		VARCHAR2,
		p_branch_code	IN		VARCHAR2,
		p_cust_ac_no	IN		VARCHAR2,
		p_mis_ref_no	IN OUT	VARCHAR2,
		p_error_code	IN OUT	VARCHAR2,
		p_error_parameter	IN OUT	VARCHAR2
		)
	RETURN BOOLEAN;

	FUNCTION fn_del_deferred_charges
			(
			p_contract_ref_no	IN		lftbs_deferred_charge.contract_ref_no%type,
			p_current_esn	IN		lftbs_deferred_charge.event_seq_no%type,
			p_error_code	IN OUT	VARCHAR2,
			p_error_parameter	IN OUT	VARCHAR2
			)
	RETURN BOOLEAN;

	FUNCTION fn_rev_deferred_charges
			  (
			  p_contract_ref_no	IN		lftbs_deferred_charge.contract_ref_no%TYPE,
			  p_current_esn		IN		lftbs_deferred_charge.event_seq_no%TYPE,
			  p_reversed_esn		IN		lftbs_deferred_charge.event_seq_no%TYPE,
			  p_event			IN		lftbs_charge_liqd_master.event%TYPE,
			  p_error_code		IN OUT	VARCHAR2,
			  p_error_parameter	IN OUT	VARCHAR2
			  )
	RETURN BOOLEAN;

	FUNCTION fn_delete_reversal
			(
			p_contract_ref_no		IN		lftbs_deferred_charge.contract_ref_no%TYPE,
			p_event_seq_no		IN		lftbs_deferred_charge.event_seq_no%TYPE,
			p_error_code		IN OUT	VARCHAR2,
			p_error_parameter		IN OUT	VARCHAR2
			)
	RETURN BOOLEAN;
	

END lfpks_deferred_charge;
/
CREATE or replace SYNONYM lfpkss_deferred_charge FOR lfpks_deferred_charge
/