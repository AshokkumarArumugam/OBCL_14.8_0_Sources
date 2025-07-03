CREATE OR REPLACE PACKAGE olpks_msg_misc
AS
--FCC V.CL 7.3 UK CONSOLIDATION RETRO START
--CREATE OR REPLACE PACKAGE olpks_msg_misc
--AS
--FCC V.CL 7.3 UK CONSOLIDATION RETRO END
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_msg_misc.SPC
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
-----------------------------------------------------Change History---------------------------------
12-Aug-2004 FCC 4.6 Sep04 Release. Site specification changes for 'ZAR' local currency.
			 send out body3 message in function fn_format_swift_header 
			 so overloaded one function(fn_format_swift_header) with one more parameter(pm_recvr_body3).
19-OCT-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO START
			30-AUG-2007 FCC-7.3-RETRO-CITIUK-4.4-RETRO#282	FCC CITI 4.9 March 2006 TLM change -- Function fn_insert_tlm_msg_master, fn_insert_tlm_msg_detail and
									fn_tlm_build_addl_details, fn_gen_tlm_msg,fn_tlm_mq_handoff,pr_tlm_job_process,
									pr_process_tlm_msgs are added.
19-OCT-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO END
06-Sep-2016 -- OFCL12.2 Not Required and other changes
-------------------------------------------------------------------------------------------------------
*/
--FCC V.CL 7.3 UK CONSOLIDATION RETRO START

--FCC V.CL 7.3 UK CONSOLIDATION RETRO START


FUNCTION fn_dir_test(
	dir_path IN VARCHAR2,
	dir_type IN VARCHAR2)RETURN BOOLEAN;

FUNCTION fn_import_unix_file(
	p_infile   IN  	VARCHAR2 ,
	p_noline   IN OUT oltms_adv_format.no_of_lines%type ,
	p_nocols   IN OUT oltms_adv_format.no_of_cols%type ,
	p_return   IN OUT VARCHAR2) RETURN BOOLEAN;

FUNCTION fn_import_unix_freeform(
	p_infile   IN  VARCHAR2,
	p_return   IN OUT VARCHAR2) RETURN BOOLEAN;

FUNCTION fn_import_format (
	p_infile 		IN VARCHAR2 , 
	p_format 		IN oltms_adv_format.format%type , 
	p_language 		IN oltms_adv_format.language%type ) RETURN BOOLEAN;

FUNCTION fn_spool_advice (
	p_dcn			IN VARCHAR2,
	p_spool		IN VARCHAR2)    	RETURN BOOLEAN;

FUNCTION fn_get_dcn (
	p_reference_no			IN VARCHAR2,
	p_esn					IN number,
	p_msg_type				IN VARCHAR2,
	p_receiver				IN VARCHAR2,
	p_dcn					OUT VARCHAR2,
	p_form_id				OUT VARCHAR2)RETURN BOOLEAN;
--25-dec-2007,FLEXCUBE V.CL Release 7.3 ITR2 SFR#01,CITIUS-LS#470,TUNING CHANGES FOR FREE FORMAT MESSAGES, Starts
FUNCTION Fn_populate_party_details(
				   	p_contract_ref_no 	varchar2,
					p_entity_type 		varchar2,
					p_ffmt_ref_no 		varchar2,
					p_module			varchar2,
					p_receiver_type 	varchar2)RETURN BOOLEAN;
FUNCTION Fn_populate_participants(p_contract_ref_no varchar2,
				  p_ffmt_ref_no 	varchar2,
				  p_module			varchar2
				  )RETURN BOOLEAN;

--25-dec-2007,FLEXCUBE V.CL Release 7.3 ITR2 SFR#01,CITIUS-LS#470,TUNING CHANGES FOR FREE FORMAT MESSAGES, Starts				
				

FUNCTION fn_get_dcn (
	p_reference_no			IN	VARCHAR2,
	p_esn					IN	NUMBER,
	p_msg_type				IN	VARCHAR2,
	p_receiver				IN	VARCHAR2,
	p_dcn					OUT	VARCHAR2,
	p_form_id				OUT	VARCHAR2,
	p_print_status			OUT	VARCHAR2)RETURN BOOLEAN;

FUNCTION fn_update_print_status (
	p_dcn						IN VARCHAR2)RETURN BOOLEAN;

FUNCTION fn_insert_handoff (
	p_branch				IN VARCHAR2,
	p_reference_no			IN VARCHAR2,
	p_esn					IN NUMBER,
	p_module				IN VARCHAR2,
	p_product				IN VARCHAR2,
	p_msg_type				IN VARCHAR2,
	p_receiver				IN VARCHAR2,
	p_serial_no				IN NUMBER,
	p_suppress_flag			IN VARCHAR2,
	p_directive_status		IN VARCHAR2,
	p_priority				IN NUMBER,
	p_ccy					IN VARCHAR2,
	p_amount				IN NUMBER,
	p_media				IN VARCHAR2,
	p_format				IN VARCHAR2,
	p_name				IN VARCHAR2,
	p_address1				IN VARCHAR2,
	p_address2				IN VARCHAR2,
	p_address3				IN VARCHAR2,
	p_address4				IN VARCHAR2)RETURN BOOLEAN;

FUNCTION fn_insert_handoff (
	p_branch				IN VARCHAR2,
	p_reference_no			IN VARCHAR2,
	p_esn					IN NUMBER,
	p_module				IN VARCHAR2,
	p_product				IN VARCHAR2,
	p_msg_type				IN VARCHAR2,
	p_receiver				IN VARCHAR2,
	p_serial_no				IN NUMBER,
	p_suppress_flag			IN VARCHAR2,
	p_directive_status		IN VARCHAR2,
	p_priority				IN NUMBER,
	p_ccy					IN VARCHAR2,
	p_amount				IN NUMBER,
	p_media				IN VARCHAR2,
	p_format				IN VARCHAR2,
	p_name				IN VARCHAR2,
	p_address1				IN VARCHAR2,
	p_address2				IN VARCHAR2,
	p_address3				IN VARCHAR2,
	p_address4				IN VARCHAR2,
	p_lang				IN VARCHAR2)RETURN BOOLEAN;

FUNCTION fn_delete_handoff (
	p_reference_no			IN VARCHAR2,
	p_esn					IN VARCHAR2,
	p_status				OUT BOOLEAN )RETURN BOOLEAN;

FUNCTION fn_upd_sms_log(
	pm_operation		oltbs_msg_sms_log.operation%type,
	pm_dcn			oltbs_msg_sms_log.dcn%type,
	pm_tid			oltbs_msg_sms_log.tid%type) RETURN BOOLEAN;

FUNCTION fn_retreive_msg(
	pm_dcn			VARCHAR2,
	pm_bad_dcns	IN OUT 	VARCHAR2) RETURN BOOLEAN;

-- USDFBME 15/9 overloaded FUNCTION to take care of priority
FUNCTION fn_format_swift_header(
	pm_sender_add		VARCHAR2,
	pm_recvr_add		VARCHAR2,
	pm_msg_type			VARCHAR2,
	pm_sender_head		IN OUT VARCHAR2,
	pm_recvr_head		IN OUT VARCHAR2,
	pm_priority			oltbs_dly_msg_out.priority%type) RETURN BOOLEAN;


FUNCTION fn_format_swift_header(
	pm_sender_add		VARCHAR2,
	pm_recvr_add		VARCHAR2,
	pm_msg_type			VARCHAR2,
	pm_sender_head		IN OUT VARCHAR2,
	pm_recvr_head		IN OUT VARCHAR2) RETURN BOOLEAN;
--Start FCC 4.6 Sep04 Release			
FUNCTION fn_format_swift_header(
	pm_sender_add		VARCHAR2,
	pm_recvr_add		VARCHAR2,
	pm_msg_type			VARCHAR2,
	pm_ref_no			VARCHAR2,
	pm_sender_head		IN OUT VARCHAR2,
	pm_recvr_head		IN OUT VARCHAR2,
	pm_recvr_body3		IN OUT VARCHAR2)RETURN BOOLEAN;
--End FCC 4.6 Sep04 Release

--TRLRABO SFR no 276 for auto-generation of messages for all messages associated
--with the contract

FUNCTION fn_con_gen_msg (	
	pm_ref_no 	IN	oltbs_dly_msg_out.dcn%type,
	pm_esn     	IN	oltbs_dly_msg_out.esn%type)RETURN BOOLEAN;
/*-- OFCL12.2 Not Required
PROCEDURE PR_AUTO_SWIFT_UPLOAD(
	pbranch IN oltms_branch.branch_code%type,
	pswift_msg_type IN oltbs_dly_msg_in.swift_msg_type%TYPE);
*/-- OFCL12.2 Not Required
	--FCC V.CL 7.3 UK CONSOLIDATION RETRO START
	--30-AUG-2007 FCC-7.3-RETRO-CITIUK-4.4-RETRO#282 Start Here
	
	FUNCTION fn_insert_tlm_msg_master(	p_dly_msg_tbl	IN		oltbs_dly_msg_out%ROWTYPE,
										p_err_code		IN OUT	ertbs_msgs.err_code%TYPE,
										p_err_parm		IN OUT	ertbs_msgs.message%TYPE     )
	RETURN BOOLEAN;
	
	FUNCTION fn_insert_tlm_msg_detail(	p_dly_msg_tbl	IN		oltbs_dly_msg_out%ROWTYPE,
										p_msg_priority  IN      NUMBER,
										p_locn_priority IN		NUMBER,
										p_err_code		IN OUT	ertbs_msgs.err_code%TYPE,
										p_err_parm		IN OUT	ertbs_msgs.message%TYPE     )
	RETURN BOOLEAN;
	
	PROCEDURE pr_start_tlm_job_process;
	
	PROCEDURE pr_stop_tlm_job_process;
	
	PROCEDURE pr_process_tlm_msgs;
	
	FUNCTION fn_gen_tlm_msg(	p_tlm_msg_rec   IN 		oltbs_tlm_msg_detail%ROWTYPE,
								p_error_code    IN OUT 	ertbs_msgs.err_code%TYPE,
								p_error_param   IN OUT 	ertbs_msgs.message%TYPE        )
	RETURN BOOLEAN;
	
	FUNCTION fn_build_tlm_details(	p_tlm_msg_rec	IN OUT	oltbs_tlm_msg_detail%ROWTYPE,
									p_err_code		IN OUT	ertbs_msgs.err_code%TYPE,
									p_err_parm		IN OUT	ertbs_msgs.message%TYPE        )
	RETURN BOOLEAN;
	
	FUNCTION fn_tlm_mq_handoff( p_tlm_msg_rec	IN		oltbs_tlm_msg_detail%ROWTYPE,
	             				p_error_code 	IN OUT 	ertbs_msgs.err_code%TYPE,
					        	p_error_param 	IN OUT 	ertbs_msgs.message%TYPE        )
	RETURN BOOLEAN;
	
	--30-AUG-2007 FCC-7.3-RETRO-CITIUK-4.4-RETRO#282 End Here
	--FCC V.CL 7.3 UK CONSOLIDATION RETRO END
END olpks_msg_misc;
/
CREATE or replace SYNONYM olpkss_msg_misc FOR olpks_msg_misc
/