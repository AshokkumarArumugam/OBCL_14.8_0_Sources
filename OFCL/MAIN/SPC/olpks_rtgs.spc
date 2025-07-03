CREATE OR REPLACE PACKAGE olpks_rtgs
AS
/*------------------------------------------------------------------------------------
**
** File Name		: olpks_rtgs.SPC
**
** Module		: MESSAGES
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
---------------------------------------------------------------------------------------
*/
/*
	Change History
*/

	FUNCTION Fn_upload_rtgs_out_msg
		(
		p_dcn		IN		oltbs_dly_msg_out.dcn%TYPE,
		p_running_no	IN		oltbs_dly_msg_out.running_no%TYPE
		)
	RETURN BOOLEAN;

	FUNCTION Fn_process_rtgs_out_msg
				(
				  p_branch oltbs_dly_msg_out.branch%TYPE
				)
	RETURN BOOLEAN;

	FUNCTION Fn_upload_rtgs_out_msg
		(
		p_dly_msg_out_record	IN	oltbs_dly_msg_out%ROWTYPE,
		p_error_code		IN OUT	VARCHAR2,
		p_error_parameter	IN OUT	VARCHAR2
		)
	RETURN BOOLEAN;

	FUNCTION fn_process_mt202_msg
			(
			p_dly_in_msg_record	IN	oltbs_dly_msg_in%ROWTYPE,
			p_error_code		IN OUT	VARCHAR2,
			p_error_parameter	IN OUT	VARCHAR2
			)
	RETURN BOOLEAN;

	FUNCTION Fn_scan_mt900_message
			(
			p_dly_in_msg_record	IN	oltbs_dly_msg_in%ROWTYPE,
			p_error_code		IN OUT	VARCHAR2,
			p_error_parameter	IN OUT	VARCHAR2
			)
	RETURN BOOLEAN;

	FUNCTION Fn_scan_mt910_message
			(
			p_dly_in_msg_record	IN	oltbs_dly_msg_in%ROWTYPE,
			p_error_code		IN OUT	VARCHAR2,
			p_error_parameter	IN OUT	VARCHAR2
			)
	RETURN BOOLEAN;

	FUNCTION Fn_scan_mt940_message
			(
			p_dly_in_msg_record	IN	oltbs_dly_msg_in%ROWTYPE,
			p_error_code		IN OUT	VARCHAR2,
			p_error_parameter	IN OUT	VARCHAR2
			)
	RETURN BOOLEAN;

	FUNCTION Fn_scan_mt942_message
			(
			p_dly_in_msg_record	IN	oltbs_dly_msg_in%ROWTYPE,
			p_error_code		IN OUT	VARCHAR2,
			p_error_parameter	IN OUT	VARCHAR2
			)
	RETURN BOOLEAN;

	FUNCTION Fn_scan_mt950_message
			(
			p_dly_in_msg_record	IN	oltbs_dly_msg_in%ROWTYPE,
			p_error_code		IN OUT	VARCHAR2,
			p_error_parameter	IN OUT	VARCHAR2
			)
	RETURN BOOLEAN;


	PROCEDURE Pr_process_rtg_message;
-------------------------------------------------------------------------------------------------
	FUNCTION fn_upload_msg_012
			(
			p_mstbs_dly_msg_in	IN	oltbs_dly_msg_in%ROWTYPE,
			p_error_code		IN OUT	VARCHAR2,
			p_error_parameter	IN OUT	VARCHAR2
			)
	RETURN BOOLEAN;
-------------------------------------------------------------------------------------------------
	FUNCTION fn_upload_msg_019
			(
			p_mstbs_dly_msg_in	IN	oltbs_dly_msg_in%ROWTYPE,
			p_error_code		IN OUT	VARCHAR2,
			p_error_parameter	IN OUT	VARCHAR2
			)
	RETURN BOOLEAN;
-------------------------------------------------------------------------------------------------
	FUNCTION fn_rtgs_purge
			(
			pbranch			IN	oltbs_dly_rtgs_in.branch_code%TYPE,
			p_error_code		IN OUT	VARCHAR2,
			p_error_parameter 	IN OUT	VARCHAR2
			)
	RETURN BOOLEAN;
-------------------------------------------------------------------------------------------------
	FUNCTION fn_update_rtgs_bal
			(
			pamount			IN	oltbs_dly_msg_in.amount%TYPE,
			pbranch		IN	oltbs_dly_rtgs_out.branch_code%TYPE,
			p_error_code		IN OUT	VARCHAR2,
			p_error_parameter	IN OUT	VARCHAR2
			)
	RETURN BOOLEAN;
-------------------------------------------------------------------------------------------------

END olpks_rtgs;
/
CREATE or replace SYNONYM olpkss_rtgs for olpks_rtgs
/