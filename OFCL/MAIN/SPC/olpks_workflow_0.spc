CREATE OR REPLACE PACKAGE olpks_workflow_0 AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_workflow_0.SPC
**
** Module	: LOANS and DEPOSITS
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
---------------------------------------------------------------------------------------------------------------------------------
CHANGE HISTORY

15-MAY-2003	FCC 4.2 OPS focus testing changes
----------------------------------------------------------------------------------------------------
*/

FUNCTION	fn_log_into_contract_ovd
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_event_seq_no		IN		oltbs_contract.latest_event_seq_no%TYPE,
	p_module			IN		oltbs_contract.module_code%TYPE,
	p_ovd_type			IN		oltbs_contract_ovd.ovd_type%TYPE,
	p_err_code_list		IN		VARCHAR2,
	p_parameters_list		IN		VARCHAR2,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION	fn_contract_level_updates
	(
	p_cstbs_contract_rec	IN		oltbs_contract%ROWTYPE,
	p_event_code		IN		oltbs_contract.curr_event_code%TYPE,
	p_auth_stat			IN		smtbs_user.user_id%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_authorize
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_curr_event_code		IN		oltbs_contract.curr_event_code%TYPE,
	p_module_code		IN		oltbs_contract.module_code%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_reject
	(
	p_default			IN		VARCHAR2,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION	fn_release
	(
	p_default			IN		VARCHAR2,
	p_rec_select		IN		VARCHAR2,	--FCC 4.2 OPS focus testing changes
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION	fn_release_rvnb
	(
	p_contract_master_rec	IN		oltbs_contract_master%ROWTYPE,
	p_rate_assign_reqd	OUT		VARCHAR2,
	p_cstbs_contract_rec	IN OUT	oltbs_contract%ROWTYPE,
	p_treasury_source_rec	IN		oltms_treasury_source%ROWTYPE,	--FCC 4.2 OPS focus testing changes
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION	fn_reject_on_auth
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_event_sequence_no	IN		oltbs_contract.latest_event_seq_no%TYPE,
	p_function_id		IN		smtbs_function_description.function_id%TYPE,
	p_module_code		IN		oltbs_contract.module_code%TYPE,
	p_error_code		IN OUT	ertb_msgs.err_code%TYPE,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION	fn_release_camd
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_rate_assign_reqd		OUT		VARCHAR2,
	p_amount_due_rec		OUT		oltbs_amount_due%ROWTYPE,
	-- Fcc 4.3 OPS Changes starts
	p_curr_funding_amount	OUT		oltbs_contract_funding.curr_funding_amount%TYPE,
	-- Fcc 4.3 OPS Changes ends.
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION	fn_reject_a_contract_on_trq
	(
	p_cstbs_contract_rec	IN		oltbs_contract%ROWTYPE,
	p_event			IN		oltbs_contract_event_log.event_code%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION	fn_reject_on_trq
	(
	p_default_where		IN		VARCHAR2,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--
--FCC 4.2 OPS focus testing changes start
--
FUNCTION	fn_check_dual_auth
	(
	p_contract_rec		IN		olvws_release_queue%ROWTYPE,
	p_dual_auth			IN OUT 	VARCHAR2,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION	fn_delete
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--
--FCC 4.2 OPS focus testing changes end
--
--------------------------------------------------------------------------------------------------------------------------
END olpks_workflow_0;
/
CREATE or replace  SYNONYM olpkss_workflow_0 FOR olpks_workflow_0
/