CREATE OR REPLACE PACKAGE olpks_ops_irrn
IS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_ops_irrn.SPC
**
** Module		: LD
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
	
	Changed By 				: Krithika G
	Change Description		: OBCL 14.0 Batch Changes
	Search String			: OBCL_14.0_Batch_Changes
----------------------------------------------------------------------------------------------------
*/




FUNCTION fn_rate_revision
	(
	p_branch_code		IN		oltms_branch.branch_code%TYPE,
	p_module			IN		oltbs_contract.module_code%TYPE,
	p_processing_date		IN		DATE,
	p_product_code		IN		oltms_product_master_ld.product%TYPE,
	p_commit_frequency	IN		oltbs_automatic_process_master.bod_commit_count%TYPE,
	p_error_code		IN OUT	ertbs_msgs.err_code%TYPE,
	p_error_parameter		IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;

FUNCTION fn_revise_a_contract
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_processing_date		IN		DATE,
	p_curr_event_code		IN		oltbs_contract.curr_event_code%TYPE,
	p_revision_applied	OUT		BOOLEAN,
	p_error_code		IN OUT	ertbs_msgs.err_code%TYPE,
	p_error_parameter		IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;

FUNCTION fn_fire_ops_revision_job
	(
	p_treasury_group		IN		lftms_treasury_rate_master.treasury_group%TYPE,
	p_rate_code			IN		lftms_treasury_rate_master.rate_code%TYPE,
	p_ccy_code			IN		lftms_treasury_rate_master.ccy_code%TYPE,
	p_effective_date		IN		DATE,
	p_rate_code_usage		IN		lftms_treasury_rate_master.rate_code_usage%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
	RETURN boolean;

FUNCTION fn_process_ops_rates
	(
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;

PROCEDURE pr_ops_contracts_to_revise
	(
	p_treasury_group		IN		lftms_treasury_rate_master.treasury_group%TYPE,
	p_rate_code			IN		lftms_treasury_rate_master.rate_code%TYPE,
	p_ccy_code			IN		lftms_treasury_rate_master.ccy_code%TYPE,
	p_effective_date		IN		DATE,
	p_rate_code_usage		IN		lftms_treasury_rate_master.rate_code_usage%TYPE
	);

--OBCL_14.0_Batch_Changes
FUNCTION fn_revise_contract
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_processing_date		IN		DATE,
	p_curr_event_code		IN		oltbs_contract.curr_event_code%TYPE,	--27/04/2002
	p_revision_applied		OUT		BOOLEAN,
	p_error_code			IN OUT	ertbs_msgs.err_code%TYPE,
	p_error_parameter		IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;

FUNCTION fn_contract_event_update
	(
	p_contract_record	IN		oltbs_contract%ROWTYPE,
	p_event_code		IN		oltbs_contract.curr_event_code%TYPE,
	p_event_value_date	IN		DATE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter	IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;
--OBCL_14.0_Batch_Changes
END olpks_ops_irrn	;
/
CREATE or replace SYNONYM	olpkss_ops_irrn
FOR			olpks_ops_irrn
/