CREATE OR REPLACE PACKAGE olpks_ude_acc_entry
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_ude_acc_entry.SPC
**
** Module		: User Defined Module
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




/*---------------------------------------------------------------------------
*/

FUNCTION fn_lookup_product_entry
	(
	p_product			IN		oltbs_contract.product_code%TYPE,
	p_event_code		IN		oltbs_contract.curr_event_code%TYPE,
	p_acc_lookup		OUT		olpkss_accounting.tbl_lookup,
	p_error_code		IN OUT	varchar2,	
	p_error_parameter		IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_pass_entry
	(
	p_contract_ref_no			IN		oltbs_contract.contract_ref_no%TYPE,
	p_current_event_seq_no		IN		oltbs_contract.latest_event_seq_no%TYPE,
	p_event_code			IN		oltbs_contract.curr_event_code%TYPE,
	p_handoff_action_code		IN		char,
	p_value_date			IN		date,
	p_list_of_amount_tags		IN		varchar2,
	p_list_of_amounts			IN		varchar2,
	p_list_of_amount_ccys		IN		varchar2,
	p_module				IN		oltbs_contract.module_code%TYPE,
	p_product				IN		oltbs_contract.product_code%TYPE,
	p_customer				IN		oltbs_contract.counterparty%TYPE,
	p_broker				IN		bktms_brmaster.broker%TYPE,
	p_error_code			IN OUT	varchar2,	
	p_error_parameter			IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_delete_for_a_event
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_event_seq_no		IN		oltbs_contract.latest_event_seq_no%TYPE,
	p_error_code		IN OUT	varchar2,	
	p_error_parameter		IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_authorize_for_a_event
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_event_seq_no		IN		oltbs_contract.latest_event_seq_no%TYPE,
	p_error_code		IN OUT	varchar2,	
	p_error_parameter		IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_reverse_all_entry
	(
	p_ref_no			IN		oltbs_contract.contract_ref_no%TYPE,
	p_current_event_seq_no	IN		oltbs_contract.latest_event_seq_no%TYPE,
	p_event_code		IN		oltbs_contract.curr_event_code%TYPE,
	p_handoff_action_code	IN		char,
	p_error_code		IN OUT	varchar2,	
	p_error_parameter		IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_reverse_entry_for_a_event
	(
	p_transaction_ref_no	IN		oltbs_contract.contract_ref_no%TYPE,
	p_current_event_seq_no	IN		oltbs_contract.latest_event_seq_no%TYPE,
	p_event_code		IN		oltbs_contract.curr_event_code%TYPE,
	p_reversed_event_seq_no IN		oltbs_contract.latest_event_seq_no%TYPE,
	p_handoff_action_code	IN		char,
	p_error_code			IN OUT	varchar2,	
	p_error_parameter		IN OUT	varchar2
	)
	RETURN boolean;

/*---------------------------------------------------------------------------
*/

END olpks_ude_acc_entry;
/
CREATE or replace SYNONYM olpkss_ude_acc_entry FOR olpks_ude_acc_entry
/