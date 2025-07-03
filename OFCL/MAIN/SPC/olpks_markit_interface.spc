CREATE OR REPLACE PACKAGE olpks_markit_interface
IS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_markit_interface.SPC
**
** Module	: LOANS SYNDICATION
**
**
This source is part of the Oracle Banking Corporate Lending  Software Product.
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East),
Mumbai - 400 063, India.
  ----------------------------------------------------------------------------------------
*/
/*
---------------------------------------- CHANGE HISTORY STARTS --------------------------------------
11-DEC-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 VOL1 FS Tag 08 changes, New Unit created
29-JAN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 IUT#SFR-71 change commented use of non existing table
30-JAN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 IUT#SFR-60 Changes, fn_check_for_investor parameters are changed and the declaration is moved to the Specification.
01-FEB-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 IUT#SFR-107 Changes structure of function fn_get_participant changed
08-JUL-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO,CITIBLR#35149 changes:Previously processed messages will be Archived  as part of EOD.
17-JUL-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#17361 changes, Sequence number change
25-JUL-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#17567 changes, renaming the column name markit_contract_id to dd_markit_contract_id
14-OCT-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO CITIUS#17644 Changes, specification is changed accordingly for reprocessing of failed messages in markit interface screen.
------------------------------------------ CHANGE HISTORY ENDS ----------------------------------------
*/
	g_tag_tbl		ol_lsty_char_tbl := ol_lsty_char_tbl();
	g_val_tbl		ol_lsty_char_tbl := ol_lsty_char_tbl();
	TYPE ty_ops_rec IS RECORD
	(
	message_ref_no		oltb_ls_markit_master.message_ref_no%TYPE
	,message_id				oltb_ls_markit_master.message_id%TYPE
	,message_seq_no		oltb_ls_markit_master.message_seq_no%TYPE
	,message_name		oltb_ls_markit_master.message_name%TYPE
	--,tag_list					oltbs_markit_trade_ops.tag_list%TYPE --29-JAN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 IUT#SFR-71 change
	,tag_list					oltbs_markit_fpml_upload.tag_list%TYPE --29-JAN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 IUT#SFR-71 change
	,tag_values				oltbs_markit_fpml_upload.tag_values%TYPE
	,processing_status	oltbs_markit_fpml_upload.upload_status%TYPE
	--17-JUL-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#17361 changes,starts
	--25-JUL-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#17567 changes starts

	--,markit_contract_id	oltb_ls_markit_master.markit_contract_id%TYPE
	,dd_markit_contract_id	oltb_ls_markit_master.dd_markit_contract_id%TYPE
	--25-JUL-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#17567 changes ends
	,activity_seq_no	oltbs_markit_fpml_upload.activity_seq_no%TYPE
	,dd_seq_no		oltbs_markit_fpml_upload.dd_seq_no%TYPE
	--17-JUL-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#17361 changes,ends
	);
	g_ops_rec					ty_ops_rec;
	--30-JAN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 IUT#SFR-60 Changes Starts
	TYPE ty_clip_msg_rec IS RECORD
	(
		message_id	oltbs_ls_markit_master.message_id%TYPE,
		message_seq_no	oltbs_ls_markit_master.message_seq_no%TYPE
	);
	TYPE ty_clip_msg_tbl IS TABLE OF ty_clip_msg_rec INDEX BY oltbs_ls_markit_master.participant_mei%TYPE;
	--30-JAN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 IUT#SFR-60 Changes Ends

	PROCEDURE pr_process_markit_msg
	(
		p_branch	IN	oltms_branch.branch_code%TYPE
		--14-OCT-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO  CITIUS#17644 CHANGES START
		,p_message_id      IN oltbs_ls_markit_master.message_id%TYPE DEFAULT '%'
		,p_message_seq_no  IN VARCHAR2 DEFAULT '%'
		,p_user            IN smtb_user.user_id%TYPE DEFAULT 'SYSFPML'
		--14-OCT-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO  CITIUS#17644 CHANGES END
	);

	FUNCTION fn_process_markit_msg
	(
		p_message_rec	IN			oltbs_ls_markit_master%ROWTYPE,
		p_err_code		IN OUT	VARCHAR2,
		p_err_param		IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;

	PROCEDURE pr_pop_markit_ops
	(
		p_branch	IN	oltms_branch.branch_code%TYPE
		--14-OCT-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO  CITIUS#17644 CHANGES START
		,p_message_id      IN oltbs_ls_markit_master.message_id%TYPE DEFAULT '%'
		,p_user            IN smtb_user.user_id%TYPE DEFAULT 'SYSFPML'
		--14-OCT-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO  CITIUS#17644 CHANGES END
	);

	FUNCTION fn_pop_notc_type
	(
		p_message_rec	IN			oltbs_markit_fpml_upload%ROWTYPE,
		p_err_code		IN OUT	VARCHAR2,
		p_err_param		IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;

	FUNCTION fn_pop_notc_master
	(
		p_markit_master		IN OUT	oltbs_ls_markit_master%ROWTYPE,
		p_err_code				IN OUT	VARCHAR2,
		p_err_param			IN OUT	VARCHAR2
	)
	RETURN VARCHAR2;

	FUNCTION fn_tag_view
	RETURN ol_lsty_char_tbl;

	PROCEDURE pr_set_globals
	(
	p_message_rec	IN	ty_ops_rec
	);

	FUNCTION fn_translate_fee_type
	(
		p_fee_type	IN 	oltbs_fpml_fee_mapping.fpml_fee_type%TYPE
	)
	RETURN oltbs_fpml_fee_mapping.fee_component%TYPE;

	--01-FEB-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 IUT#SFR-107 Changes start
	/*
	FUNCTION fn_get_participant
	(
		p_trn_ref_no	IN 	lbtbs_contract_participant.contract_ref_no%TYPE,
		p_part_mei_code	IN	cstms_udf_vals.field_val%TYPE
	)
	RETURN lbtbs_contract_participant.participant%TYPE;
	*/
	FUNCTION fn_get_participant
	(
		p_trn_ref_no			IN 			lbtbs_contract_participant.contract_ref_no%TYPE,
		p_date						IN			DATE,
		p_participant_mei	OUT		cstms_udf_vals.field_val%TYPE,
		p_err_code				IN OUT	VARCHAR2,
		p_err_param			IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;
	--01-FEB-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 IUT#SFR-107 Changes end

	FUNCTION fn_archive_master_records
	(
		p_message_id		IN	oltbs_ls_markit_master.message_id%TYPE,
		p_message_seq_no	IN	oltbs_ls_markit_master.message_seq_no%TYPE,
		p_mod_no		IN	oltbs_ls_markit_master.mod_no%TYPE,
		p_mode			IN	VARCHAR2,
		p_err_code		IN OUT	VARCHAR2,
		p_err_param		IN OUT 	VARCHAR2
	)
	RETURN BOOLEAN;
	--30-JAN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 IUT#SFR-60 Changes
	FUNCTION fn_check_for_investor
	(
		p_message_id		IN	oltbs_ls_markit_master.message_id%TYPE,
		p_message_seq_no	IN	oltbs_ls_markit_master.message_seq_no%TYPE,
		p_message_name		IN	oltbs_ls_markit_master.message_name%TYPE,
		p_clip_msg_tbl		OUT	ty_clip_msg_tbl,
		p_all_mei_present	OUT	BOOLEAN,
		p_err_code		IN OUT 	VARCHAR2,
		p_err_param		IN OUT 	VARCHAR2
	)
	RETURN BOOLEAN;
	--30-JAN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 IUT#SFR-60 Changes

	--08-JUL-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO,CITIBLR#35149 starts
	FUNCTION fn_pop_history

	(
		p_branch		IN	oltbs_contract.branch%TYPE,
		p_processing_date	IN	DATE,
		p_commit_frequency	IN	oltbs_automatic_process_master.bod_commit_count%TYPE,
		p_err_code		IN OUT 	VARCHAR2,
		p_err_param		IN OUT 	VARCHAR2
	)
	RETURN BOOLEAN;
	--08-JUL-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO,CITIBLR#35149 ends
  
  FUNCTION Fn_check_dual_auth
			(
				p_contract_ref_no	IN	VARCHAR2,
				p_err_code			OUT	VARCHAR2,
				p_err_param			OUT	VARCHAR2
			)
RETURN BOOLEAN;

END olpks_markit_interface;
/
CREATE OR REPLACE SYNONYM olpkss_markit_interface FOR olpks_markit_interface
/