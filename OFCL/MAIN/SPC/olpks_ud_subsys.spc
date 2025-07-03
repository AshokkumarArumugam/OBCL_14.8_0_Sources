CREATE OR REPLACE PACKAGE olpks_ud_subsys
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_ud_subsys.SPC
**
** Module		: SECURITIES
**
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



/*	These procedures will be used by the package to decide whether or not
	to process the respective subsystems. Contract online will access these
	procedures and set the variables through these procedures
*/

TYPE amttags_record IS RECORD
	(	amt_tag		oltbs_amount_tag.amount_tag%TYPE
	,	amt_tag_ccy		oltbs_amount_due_cs.currency_amt_due%TYPE
	,	amt_value		oltbs_amount_due_cs.amount_due%TYPE
	);

TYPE tbl_amttags IS TABLE of amttags_record INDEX BY BINARY_INTEGER;


/*	Motherhood function to be used by outside world
*/

FUNCTION fn_process_subsystem
	(	p_cont_reference		IN		OLTB_CONTRACT_MASTER_UD.CONTRACT_REF_NO%TYPE
	,	p_subsys_code		IN		varchar2
	,	p_event_code		IN		varchar2
	,	p_current_esn		IN		number
	,	p_latest_version		IN		number
	,	p_err_codes			IN OUT	varchar2
	,	p_err_params		IN OUT	varchar2
	) RETURN BOOLEAN;
--
FUNCTION fn_get_dealtags
		(	p_cont_reference	IN		oltbs_contract_master_ud.CONTRACT_REF_NO%TYPE
		,	p_latest_version	IN		oltbs_contract_master_ud.VERSION_NO%TYPE
		,	p_tbl_amttags	IN OUT	tbl_amttags
		,	p_err_codes		IN OUT	Varchar2
		,	p_err_params	IN OUT	Varchar2
		)	RETURN BOOLEAN;
--
FUNCTION fn_assoc_charges
	(	p_err_codes			in out	varchar2
	,	p_err_params		in out	varchar2
	)RETURN BOOLEAN;
--
FUNCTION fn_apply_charges
	(	p_err_codes			in out	varchar2
	,	p_err_params		in out	varchar2
	)RETURN BOOLEAN;
--
FUNCTION fn_assoc_tax
	(	p_err_codes			in out	varchar2
	,	p_err_params		in out	varchar2
	)RETURN BOOLEAN;
--
FUNCTION fn_apply_tax
	(	p_err_codes			in out	varchar2
	,	p_err_params		in out	varchar2
	)RETURN BOOLEAN;
--
FUNCTION fn_module_tag
	(	p_amount_tag	in		oltbs_amount_tag.amount_tag%TYPE
	,	p_tag_ccy		out		cytms_ccy_defn.ccy_code%TYPE
	,	p_sett_ccy		out		cytms_ccy_defn.ccy_code%TYPE
	,	p_chang_acc		out		varchar2
	,	p_chang_rate	out		varchar2
	,	p_pay_acc_branch	out		oltms_branch.BRANCH_CODE%TYPE
	--,	p_pay_account	out		sttms_cust_account.CUST_AC_NO%TYPE-- OFCL12.2 Not required
	,	p_pay_account	out		oltb_account.ac_gl_no%TYPE
	,	p_err_codes		in out	varchar2
	,	p_err_params	in out	varchar2
	)RETURN BOOLEAN;
--
FUNCTION fn_interest_tag
	(	p_amount_tag	in	oltbs_amount_tag.amount_tag%TYPE
	,	p_tag_ccy		out	cytms_ccy_defn.ccy_code%TYPE
	,	p_sett_ccy		out	cytms_ccy_defn.ccy_code%TYPE
	,	p_chang_acc		out	varchar2
	,	p_chang_rate	out	varchar2
	,	p_pay_acc_branch	out	oltms_branch.BRANCH_CODE%TYPE
	--,	p_pay_account	out	sttms_cust_account.CUST_AC_NO%TYPE-- OFCL12.2 Not required
	,	p_pay_account	out		oltb_account.ac_gl_no%TYPE
	,	p_err_codes		in out	varchar2
	,	p_err_params	in out	varchar2
	)RETURN BOOLEAN;
--
FUNCTION fn_charge_tag
	(	p_amount_tag	in		oltbs_amount_tag.amount_tag%TYPE
	,	p_tag_ccy		out		cytms_ccy_defn.ccy_code%TYPE
	,	p_sett_ccy		out		cytms_ccy_defn.ccy_code%TYPE
	,	p_chang_acc		out		varchar2
	,	p_chang_rate	out		varchar2
	,	p_pay_acc_branch	out		oltms_branch.BRANCH_CODE%TYPE
	--,	p_pay_account	out		sttms_cust_account.cust_ac_no%TYPE-- OFCL12.2 Not required
	,	p_pay_account	out		oltb_account.ac_gl_no%TYPE
	,	p_err_codes		in out	varchar2
	,	p_err_params	in out	varchar2
	)RETURN BOOLEAN;
--
FUNCTION fn_tax_tag
	(	p_amount_tag	in		oltbs_amount_tag.amount_tag%TYPE
	,	p_tag_ccy		out		cytms_ccy_defn.ccy_code%TYPE
	,	p_sett_ccy		out		cytms_ccy_defn.ccy_code%TYPE
	,	p_chang_acc		out		varchar2
	,	p_chang_rate	out		varchar2
	,	p_pay_acc_branch	out		oltms_branch.BRANCH_CODE%TYPE
	--,	p_pay_account	out		sttms_cust_account.cust_ac_no%TYPE-- OFCL12.2 Not required
	,	p_pay_account	out		oltb_account.ac_gl_no%TYPE
	,	p_err_codes		in out	varchar2
	,	p_err_params	in out	varchar2
	)RETURN BOOLEAN;
--
FUNCTION fn_is_referral
	(	p_err_codes		in out	varchar2
	,	p_err_params	in out	varchar2
	)RETURN BOOLEAN;
--
FUNCTION fn_pickup_settlements
	(	p_err_codes		IN OUT	varchar2
	,	p_err_params	IN OUT	varchar2
	)RETURN BOOLEAN;
--
FUNCTION fn_lst_for_amttag_tbl(
	p_amttag_tbl      IN OUT   tbl_amttags,
	p_tag_lst         IN OUT   varchar2,
	p_amt_lst         In OUT   varchar2,
	p_ccy_lst         IN OUT   varchar2,
	p_err_code        In OUT   VARCHAR2,
	p_err_params      In OUT   varchar2)
	RETURN BOOLEAN;
--
FUNCTION fn_pop_contract_event_advice
	(	p_err_codes			IN OUT	ertbs_msgs.err_code%TYPE
	,	p_err_params		IN OUT	varchar2
	)	RETURN BOOLEAN;
--
FUNCTION fn_process_mis
		(	p_err_codes		IN OUT	varchar2
		,	p_err_params	IN OUT	varchar2
		)	RETURN BOOLEAN;
FUNCTION fn_charge_app_ref
		(	p_err_codes		IN OUT	varchar2
		,	p_err_params	IN OUT	varchar2
		)	RETURN BOOLEAN;
--
FUNCTION fn_get_rate
		(	p_ccy1		IN		cytms_rates.CCY1%TYPE
		,	p_ccy2		IN		cytms_rates.CCY1%TYPE
		,	p_rate_type		IN		varchar2
		,	p_rate		OUT		cytms_rates.MID_RATE%TYPE
		,	p_err_codes		IN OUT	varchar2
		,	p_err_params	IN OUT	varchar2
		)	RETURN BOOLEAN;
--
END olpks_ud_subsys;
/
CREATE or replace SYNONYM olpkss_ud_subsys FOR olpks_ud_subsys
/