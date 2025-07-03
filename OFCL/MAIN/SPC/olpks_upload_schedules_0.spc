CREATE OR REPLACE PACKAGE olpks_upload_schedules_0
AS
/*-----------------------------------------------------------------------------------------
**
** File Name	: olpks_upload_schedules_0.SQL
**
** Module		: LOANS and DEPOSITS
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
-------------------------------------------------------------------------------------
*/



FUNCTION fn_upload_for_a_branch
	(
	p_source_code		IN		oltbs_ext_contract_stat.source%TYPE,
	p_uploaded_status		IN		cotms_source_pref.uploaded_status%TYPE,
	p_on_error			IN		cotms_source_pref.on_error%TYPE,
	p_on_override		IN		cotms_source_pref.on_override%TYPE,
	p_upload_id			OUT		oltbs_upload_log_cs.upload_id%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;

FUNCTION fn_upload_a_contract
	(
	p_upload_id				IN		oltbs_upload_log_cs.upload_id%TYPE,
	p_upload_master_record		IN		oltbs_upload_schedule_master%ROWTYPE,
	p_status_on_save			IN		oltbs_upload_log_cs.post_upload_status%TYPE,
	p_action_on_override		IN		oltbs_upload_log_cs.on_error_status%TYPE,
	p_action_on_exception		IN		oltbs_upload_log_cs.on_override_status%TYPE,
	p_uploaded_auth			IN OUT	oltbs_upload_log_cs.uploaded_auth%TYPE,
	p_uploaded_unauth			IN OUT	oltbs_upload_log_cs.uploaded_unauth%TYPE,
	p_uploaded_hold			IN OUT	oltbs_upload_log_cs.uploaded_hold%TYPE,
	p_rejected				IN OUT	oltbs_upload_log_cs.rejected%TYPE,
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter			IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;


END;
/
CREATE or replace SYNONYM olpkss_upload_schedules_0 FOR olpks_upload_schedules_0
/