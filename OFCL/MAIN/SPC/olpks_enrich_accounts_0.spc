CREATE OR REPLACE PACKAGE olpks_enrich_accounts_0
AS
/*---------------------------------------------------------------------------------------------------------
**
** File Name	: olpks_enrich_accounts_0
**
** Module		: Settlement Instruction
**
This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
-------------------------------------------------------------------------------------------------------------
*/


FUNCTION fn_get_dflt_settl_account
	(
	p_branch_code		IN		oltms_dflt_settlement_account.branch_code%TYPE,
	p_module			IN		oltms_dflt_settlement_account.module%TYPE,
	p_product			IN		oltms_dflt_settlement_account.product%TYPE,
	p_transfer_type		IN		oltms_dflt_settlement_account.transfer_type%TYPE,
	p_settle_event		IN		oltms_dflt_settlement_account.settle_event%TYPE,
	p_currency			IN		oltms_dflt_settlement_account.currency%TYPE,
	p_pay_receive		IN		oltms_dflt_settlement_account.pay_receive%TYPE,
	p_instruction_type	IN		oltms_dflt_settlement_account.instruction_type%TYPE,
	p_dflt_ac_branch	OUT		oltms_dflt_settlement_account.default_ac_branch%TYPE,
	p_dflt_account		OUT		oltms_dflt_settlement_account.default_account%TYPE,
	p_dflt_ac_ccy		OUT		oltms_dflt_settlement_account.default_ac_ccy%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter	IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_insert_dflt_account_tbl
	(
	p_cont_ref_no		IN		oltbs_settlements.contract_ref_no%TYPE,
	p_event_seq_no		IN		oltbs_settlements.event_seq_no%TYPE,
	p_tag				IN		oltbs_settlements.amount_tag%TYPE,
	p_settle_event		IN		oltms_dflt_settlement_account.settle_event%TYPE,
	p_dflt_ac_branch	IN		oltms_dflt_settlement_account.default_ac_branch%TYPE,
	p_dflt_account		IN		oltms_dflt_settlement_account.default_account%TYPE,
	p_dflt_ac_ccy		IN		oltms_dflt_settlement_account.default_ac_ccy%TYPE,
	p_ex_rate			IN		oltbs_settlements.ex_rate%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter	IN OUT	VARCHAR2
	)
RETURN BOOLEAN;


FUNCTION fn_inherit
	(
	p_cont_ref_no		IN		oltbs_settlements.contract_ref_no%TYPE,
	p_event_seq_no		IN		oltbs_settlements.event_seq_no%TYPE,
	p_tag				IN		oltbs_settlements.amount_tag%TYPE,
	p_update_is			IN		BOOLEAN,
	p_instruction_sts	IN OUT	oltbs_settlements.instruction_status%TYPE,
	p_tag_ccy 			IN OUT	oltbs_settlements.tag_ccy%TYPE,
	p_pay_receive		IN OUT	oltbs_settlements.pay_receive%TYPE,
	p_ac_branch 		IN OUT	oltbs_settlements.acc_branch%TYPE,
	p_account 			IN OUT	oltbs_settlements.account%TYPE,
	p_acc_ccy 			IN OUT	oltbs_settlements.acc_ccy%TYPE,
	p_ex_rate 			IN OUT	oltbs_settlements.ex_rate%TYPE,
	p_settlement_amt 	IN OUT	oltbs_settlements.settlement_amt%TYPE,
	p_value_date 		IN OUT	oltbs_settlements.value_date%TYPE,
	p_instrument_no 	IN OUT	oltbs_settlements.instrument_no%TYPE,
	p_msg_nettable		IN OUT	oltbs_settlements.msg_nettable%TYPE,
	p_receiver			IN OUT	oltbs_settlements.receiver%TYPE,
	p_acc_cif			IN OUT	oltbs_settlements.acc_cif%TYPE,
	p_error_code		OUT		VARCHAR2,
	p_error_parameter	OUT		VARCHAR2
	)
RETURN BOOLEAN;

END olpks_enrich_accounts_0;
/
CREATE OR REPLACE SYNONYM olpkss_enrich_accounts_0
	FOR olpks_enrich_accounts_0
/