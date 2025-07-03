CREATE OR REPLACE PACKAGE tlpks_sgen IS
/*----------------------------------------------------------------------------------------------------
**
** File Name	:tlpks_sgen.SPC
**
** Module	:SECONDARY LOANS TRADING
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
---------------------------------------------------------------------------------------------------
CHANGE HISTORY
Date of creation: 22-JUL-2008 FLEXCUBE V.CL Release 7.4 new created  To handle the Payment message for slt module
26-DEC-2008 FLEXCUBE V.CL Release 7.4 MTR1 SFR#90 Payment message related changes
06-Jun-2016 OFCL standalone changes, commented not required code. Search string--- OFCL12.2 Not required
---------------------------------------------------------------------------------------------------
*/
TYPE due_rec_type IS RECORD
	(
	contract_ref_no		oltbs_amount_due_cs.contract_ref_no%type,
	component		oltbs_amount_due_cs.component%type,
	component_type		oltbs_amount_due_cs.component_type%type,	
	amount_tag		oltms_product_event_acct_entry.amt_tag%type,
	due_date		oltbs_amount_due_cs.due_date%type,
	amount_due		oltbs_amount_due_cs.amount_due%type,
	currency_amount_due	oltbs_amount_due_cs.currency_amt_due%type,
	account_due		oltbs_amount_due_cs.account_due%type,
	branch_account_due	oltbs_amount_due_cs.branch_account_due%type,
	--account_currency	sttms_cust_account.ccy%type,-- OFCL12.2 Not required
	account_currency	oltb_account.AC_GL_CCY%type,
	counterparty		oltbs_amount_due_cs.counterparty%type,
	amount_settled		oltbs_amount_due_cs.amount_settled%type,
	inflow_outflow		oltbs_amount_due_cs.inflow_outflow%type,
	adjusted_amount		oltbs_amount_due_cs.adjusted_amount%type,
	exchange_rate		cytms_rates.mid_rate%type,
	settlement_required	VARCHAR2(1) ,
	msg_event_seq_no	oltbs_contract_event_log.event_seq_no%type,
	ac_or_gl		oltbs_account.ac_or_gl%type,
	pay_receive		oltbs_settlements.pay_receive%type,
	receiver		oltbs_settlements.receiver%type,
	msg_netting		oltms_product_event_acct_entry.netting_indicator%TYPE,
	msg_nettable		oltbs_settlements.msg_nettable%TYPE,
	settlement_msg_date	DATE,
	pay_msg_date		OLTB_AMOUNT_DUE_CS.pay_msg_date%TYPE, 
	recv_msg_date		OLTB_AMOUNT_DUE_CS.recv_msg_date%TYPE,	
	gen_recv_notice		oltbs_settlements.gen_recv_notice%type,	
	generate_dd_msg		oltbs_settlements.generate_dd_msg%type,	
	rntc_msg_date		OLTB_AMOUNT_DUE_CS.rntc_msg_date%TYPE,	
	rntc_event_seq_no	OLTB_AMOUNT_DUE_CS.rntc_event_seq_no%TYPE,	
	value_date		oltbs_amount_due_cs.due_date%type,
	pay_or_receive		varchar2(1)	
	);

TYPE due_tab_type IS TABLE OF due_rec_type INDEX BY BINARY_INTEGER;

Pkg_msgnet_required		VARCHAR2(1);--26-DEC-2008 FLEXCUBE V.CL Release 7.4 MTR1 SFR#90

FUNCTION fn_process_contract_manual
		(
		p_contract_ref_no	IN	oltbs_amount_due_cs.contract_ref_no%TYPE,
		P_process_mode		IN	VARCHAR2,   --pmsgonlinechange	(B/O)
		p_module		IN	oltbs_contract.module_code%TYPE,
		p_ccy			IN	oltbs_contract.contract_ccy%TYPE,
		p_from_date		IN	DATE,
		p_to_date		IN	DATE,
		p_processing_date	IN	DATE,
		p_error_code		IN OUT	VARCHAR2,
		p_error_parameter	IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION Fn_process_payment_msg
	(
	P_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	P_process_mode		IN	VARCHAR2,   --pmsgonlinechange	(B/O)
	P_error_code		IN OUT	VARCHAR2,
	P_error_prams		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION Fn_batch_payment_msg
	(
	p_branch	IN oltms_branch.branch_code%TYPE,
	p_mod		IN oltms_product.module%TYPE,
	p_proc_date	IN DATE,
	p_prod		IN oltms_product.product_code%TYPE,
	P_Err_code	IN OUT VARCHAR2,
	p_err_param	IN OUT VARCHAR2
	)
RETURN BOOLEAN;
END tlpks_sgen;
/
CREATE or replace SYNONYM tlpkss_sgen FOR tlpks_sgen
/