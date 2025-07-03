CREATE OR REPLACE PACKAGE olpks_ms_services_0
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_ms_services_0.SQL
**
** Module		: Messaging
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.

---------------------------------------------------------------------------------------------------------------------
*/
/*CHANGE HISTORY ::

10-Dec-2003 -- 4.4 Dec 2003 ITR1 SFR - 344
		Code added to make message delivery call from olpks_browse.

18-DEC-2003 FCC4.4 DEC 2003 Global Interdict changes --Added new procedure pr_global_interdict
--24/11/2004  Fcc 4.6.1 Jan 2005 Retro Changes for CITIPLC PLC44080082	GI Processing for the outgoing messages needs to be split into two, 
				one for reading if any response is received from GI and the other for 
				delivering the messages after GI validation and dependent on the fir
19-JAN-2005 FCC 4.6.1 JAN 2005 ITR-1 SFR-196 For changing copyright clause / release name

*/

FUNCTION fn_activate_deactivate
		(
		p_default		IN		VARCHAR2,
		p_process_type	IN		VARCHAR2,
		p_error_code	IN OUT	VARCHAR2,
		p_error_parameter	IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION fn_resolve_msg_group
		(
		p_branch_code	IN		oltms_branch.branch_code%TYPE,
		p_module		IN	 	oltbs_contract.module_code%TYPE,
		p_msg_type		IN	 	oltms_msg_type.msg_type%TYPE,
		p_msg_group		OUT		oltms_msg_type_grp_map.msg_group%TYPE,
		p_gen_priority	OUT		VARCHAR2,
		p_error_code	IN OUT 	VARCHAR2,
		p_error_parameter IN OUT 	VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION fn_populate_msg_fields
		(
		p_branch_code		IN		oltms_branch.branch_code%TYPE,
		p_module			IN		oltms_msg_type.module%TYPE,
		p_msg_type			IN		oltms_msg_type.msg_type%TYPE,
		p_cust_ac_no		IN		oltbs_dly_msg_out.cust_ac_no%TYPE,	--FCC4.4 DEC 2003 Global Interdict changes
		p_delivery_channel	OUT		oltbs_dly_msg_out.delivery_channel%TYPE,
		p_hold_status		OUT		oltbs_dly_msg_out.hold_status%TYPE,
		p_interdict_status	OUT		oltbs_dly_msg_out.interdict_status%TYPE,
		p_error_code		IN OUT	VARCHAR2,
		p_error_parameter		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION fn_release_messages
		(
		p_dly_msg_out		IN		oltbs_dly_msg_out%ROWTYPE,
		p_error_code		IN OUT 	VARCHAR2,
		p_error_parameter 	IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

-- 4.4 Dec 2003 ITR1 SFR - 344

FUNCTION fn_message_delivery
		(
		p_dly_msg_out		IN 		oltbs_dly_msg_out%ROWTYPE,
		p_error_code		IN OUT	VARCHAR2,
		p_error_parameter 	IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

-- 4.4 Dec 2003 ITR1 SFR - 344

PROCEDURE pr_release_msg;

--
--FCC4.4 DEC 2003 Global Interdict changes start
--
PROCEDURE pr_global_interdict;

PROCEDURE pr_update_message_tbl
		(
			p_file_name		IN	VARCHAR2,
			p_update_string	IN	VARCHAR2,
			p_err_status	OUT   VARCHAR2
		);

--CITIPLC PLC44080082 Changes Starts
PROCEDURE pr_release_gi_msgs;
--CITIPLC PLC44080082 Changes Ends

FUNCTION fn_check_gi
		(
		p_dly_msg_out	IN		oltbs_dly_msg_out%ROWTYPE,
		p_error_code	IN OUT 	VARCHAR2,
		p_error_parameter IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

--
--FCC4.4 DEC 2003 Global Interdict changes end
--

END olpks_ms_services_0;
/
CREATE or replace SYNONYM olpkss_services_0_ms FOR olpks_ms_services_0
/