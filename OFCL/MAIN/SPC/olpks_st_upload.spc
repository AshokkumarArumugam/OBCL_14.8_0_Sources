CREATE OR REPLACE PACKAGE olpks_st_upload
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : olpks_st_upload.SPC
**
** Module       : ST
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


	g_halt_on_exception			EXCEPTION;
	g_halt_error_code				varchar2(1000) := NULL;
	g_halt_error_parameter			varchar2(1000) := NULL;

FUNCTION fn_date_time
	(
	p_date			IN		date
	)
	RETURN date;

FUNCTION fn_update_exception
	(
	p_source_code		IN		oltbs_upload_master_st.source_code%TYPE,
	p_upload_seq_no		IN		oltbs_upload_exception_st.upload_seq_no%TYPE,
	p_maintenance_seq_no	IN		oltbs_upload_exception_st.maintenance_seq_no%TYPE,
	p_error_code		IN OUT	varchar2,
	p_error_parameter		IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_update_override
	(
	p_maintenance_seq_no	IN		oltbs_upload_override.maintenance_seq_no%TYPE,
	p_error_code		IN OUT	varchar2,
	p_error_parameter		IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_update_log
	(
	p_upload_seq_no		IN		oltbs_upload_log_st.upload_seq_no%TYPE,
	p_source_code		IN		oltbs_upload_log_st.source_code%TYPE,
	p_maintenance_type	IN		oltbs_upload_log_st.maintenance_type%TYPE,
	p_start_time		IN		oltbs_upload_log_st.initiation_dt_stamp%TYPE,
	p_end_time			IN		oltbs_upload_log_st.termination_dt_stamp%TYPE,
	p_auth_status_on_save	IN		oltbs_upload_log_st.auth_status_on_save%TYPE,
	p_action_on_override	IN		oltbs_upload_log_st.action_on_override%TYPE,
	p_error_code		IN OUT	varchar2,
	p_error_parameter		IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_update_activity
	(
	p_upload_seq_no		IN		oltbs_upload_activity_st.upload_seq_no%TYPE,
	p_maintenance_seq_no	IN		oltbs_upload_activity_st.maintenance_seq_no%TYPE,
	p_status			IN		oltbs_upload_activity_st.upload_status%TYPE,
	p_error_code		IN OUT	varchar2,
	p_error_parameter		IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_what_to_do
	(
	p_action_on_override	IN		oltbs_upload_log_st.action_on_override%TYPE,
	p_auth_status_on_save	IN		oltbs_upload_log_st.auth_status_on_save%TYPE,
	p_what_to_do		OUT		char,
	p_auth_status		OUT		char,
	p_error_code            IN OUT    	varchar2,
      p_error_parameter       IN OUT     	varchar2
	)
	RETURN boolean;

END olpks_st_upload;			
/
CREATE or replace SYNONYM olpkss_upload_st FOR olpks_st_upload
/