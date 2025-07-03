CREATE OR REPLACE PACKAGE olpks_upload_payment_0 AS

/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_upload_payment_0.SQL
**
** Module	: UPLOAD
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




--------------------------------------------------------------------------------

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

FUNCTION fn_upload_a_payment
	(
	p_upload_id				IN		oltbs_upload_log_cs.upload_id%TYPE,
	p_upload_payment_record		IN		oltbs_upload_liq_summary%ROWTYPE,
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
/* FCC4.3.1 upload changes begin*/
FUNCTION fn_upload_for_a_branch
	(
	p_source_code		IN		oltbs_ext_contract_stat.source%TYPE,
	p_uploaded_status		IN		cotms_source_pref.uploaded_status%TYPE,
	p_on_error			IN		cotms_source_pref.on_error%TYPE,
	p_on_override		IN		cotms_source_pref.on_override%TYPE,
	p_upload_id			OUT		oltbs_upload_log_cs.upload_id%TYPE,
    p_ldtbs_upload_liq_summary   IN         oltbs_upload_liq_summary%rowtype,
	p_ldtbs_upload_liq_table	 IN	olpks_uploady.pkg_tbl_upl_liq,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;	 
	
	
FUNCTION fn_upload_a_payment
	(
	p_upload_id					IN		oltbs_upload_log_cs.upload_id%TYPE,
	p_upload_payment_record		IN		oltbs_upload_liq_summary%ROWTYPE,
	p_ldtbs_upload_liq_table	IN		olpks_uploady.pkg_tbl_upl_liq,
	p_status_on_save			IN		oltbs_upload_log_cs.post_upload_status%TYPE,
	p_action_on_override		IN		oltbs_upload_log_cs.on_error_status%TYPE,
	p_action_on_exception		IN		oltbs_upload_log_cs.on_override_status%TYPE,
	p_uploaded_auth				IN OUT	oltbs_upload_log_cs.uploaded_auth%TYPE,
	p_uploaded_unauth			IN OUT	oltbs_upload_log_cs.uploaded_unauth%TYPE,
	p_uploaded_hold				IN OUT	oltbs_upload_log_cs.uploaded_hold%TYPE,
	p_rejected					IN OUT	oltbs_upload_log_cs.rejected%TYPE,
	p_error_code				IN OUT	VARCHAR2,
	p_error_parameter			IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;

	
	

/*FCC4.3.1 upload changes end*/
-------------------------------------------------------------------------------------------------------------

END olpks_upload_payment_0;
/
create or replace synonym olpkss_upload_payment_0 for olpks_upload_payment_0
/