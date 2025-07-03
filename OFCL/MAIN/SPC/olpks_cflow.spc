CREATE OR REPLACE PACKAGE olpks_cflow
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : olpks_cflow
**
** Module       : CORE SERVICES
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


TYPE	amount_due_struct		IS RECORD
	(
	component			oltbs_amount_due_cs.component%TYPE,
	amount_due			oltbs_amount_due_cs.amount_due%TYPE,
	currency			oltbs_amount_due_cs.currency_amt_due%TYPE,
	counterparty		oltbs_amount_due_cs.counterparty%TYPE,
	due_date			DATE,
	account_due			oltbs_account.ac_gl_no%TYPE,
	br_account_due		oltms_branch.branch_code%TYPE,
	inflow_outflow		oltbs_amount_due_cs.inflow_outflow%TYPE,
	l_rowid			ROWID
	);

TYPE	amount_due_table_struct	IS TABLE OF 
	amount_due_struct
	INDEX BY BINARY_INTEGER;

TYPE	amount_paid_struct	IS RECORD
	(
	component			oltbs_amount_paid.component%TYPE,
	amount_paid			oltbs_amount_due_cs.amount_settled%TYPE,
	due_date			DATE,
	paid_date			DATE
	);

TYPE	amount_paid_table_struct	IS TABLE OF 
	amount_paid_struct
	INDEX BY BINARY_INTEGER;


FUNCTION fn_create_cash_flow
	(
	p_reference_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_isreferral_ref		IN		oltbs_contract.contract_ref_no%TYPE,
	p_charge_referral_ref	IN		oltbs_contract.contract_ref_no%TYPE,
	p_tax_referral_ref	IN		oltbs_contract.contract_ref_no%TYPE,
	p_event_code		IN		oltbs_event.event_code%TYPE,
	p_esn				IN		oltbs_contract.latest_event_seq_no%TYPE,
	p_event_list		IN		VARCHAR2,
	p_event_date_list		IN		VARCHAR2,
	p_amount_due_table	IN		amount_due_table_struct,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_create_cash_flow
	(
	p_reference_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_isreferral_ref		IN		oltbs_contract.contract_ref_no%TYPE,
	p_charge_referral_ref	IN		oltbs_contract.contract_ref_no%TYPE,
	p_tax_referral_ref	IN		oltbs_contract.contract_ref_no%TYPE,
	p_event_code		IN		oltbs_event.event_code%TYPE,
	p_esn				IN		oltbs_contract.latest_event_seq_no%TYPE,
	p_amount_due_table	IN		amount_due_table_struct,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_settle_cash_flow
	(
	p_reference_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_esn				IN		oltbs_contract.latest_event_seq_no%TYPE,
	p_amount_paid_table	IN		amount_paid_table_struct,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_process_charges
	(
	p_reference_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_esn				IN		oltbs_contract.latest_event_seq_no%TYPE,
	p_event_list		IN		VARCHAR2,
	p_event_date_list		IN		VARCHAR2,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_process_taxes
	(
	p_reference_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_esn				IN		oltbs_contract.latest_event_seq_no%TYPE,
	p_event_list		IN		VARCHAR2,
	p_event_date_list		IN		VARCHAR2,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_authorize_cash_flow
		(
		p_reference_no		IN		oltbs_contract.contract_ref_no%TYPE,
		p_error_code		IN OUT	VARCHAR2,
		p_error_parameter		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION fn_restore_cash_flow
		(
		p_reference_no		IN		oltbs_contract.contract_ref_no%TYPE,
		p_error_code		IN OUT	VARCHAR2,
		p_error_parameter		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

-- mtlcbm til# 1110 start ..
-- existing function in body now defined in package declaration 
-- 
FUNCTION fn_delete_contract_cash_flow
	(	p_reference		IN		oltbs_contract.CONTRACT_REF_NO%TYPE
	,	p_err_codes		IN OUT	varchar2
	,	p_err_params	IN OUT	varchar2
	)	RETURN BOOLEAN;

-- mtlcbm til# 1110 .. end

END olpks_cflow;
/
CREATE or replace SYNONYM olpkss_cflow FOR olpks_cflow
/