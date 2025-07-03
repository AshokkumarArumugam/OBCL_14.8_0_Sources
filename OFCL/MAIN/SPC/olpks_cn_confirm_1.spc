CREATE OR REPLACE PACKAGE olpks_cn_confirm_1
AS
/*----------------------------------------------------------------------------------------------------

This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
FUNCTION	fn_set_lo_data_table
	(
	p_message			IN			oltbs_dly_msg_in.message%TYPE,
	p_error_code		IN OUT		ertbs_msgs.err_code%TYPE,
	p_error_parameter		IN OUT		VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION	fn_get_sender_bic
	(
	p_message				IN			oltbs_dly_msg_in.message%TYPE,
	p_error_code			IN OUT		ertbs_msgs.err_code%TYPE,
	p_error_parameter			IN OUT		VARCHAR2
	)
RETURN BOOLEAN;
FUNCTION 	fn_get_field
	(
	p_textblock			IN		oltbs_dly_msg_in.message%TYPE,
	p_fieldcount		IN		NUMBER,
	p_fieldtext			IN OUT	VARCHAR2,
	p_error_code		IN OUT	ertbs_msgs.err_code%TYPE,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
FUNCTION	fn_upd_lo_data_table
	(
	p_fieldtag			IN		VARCHAR2,
	p_fieldvalue		IN		VARCHAR2,
	p_error_code		IN OUT	ertbs_msgs.err_code%TYPE,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION	fn_get_row_for_tag
	(
	p_tag				IN		VARCHAR2,
	p_qualifier 		IN 		VARCHAR2
	)
RETURN NUMBER;

FUNCTION fn_get_bic_counterparty
	(
	p_bic		IN	VARCHAR2,
	p_cif		OUT   VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_enrich_mt300
		(
		p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
		p_dcn			IN	cntbs_upload_fx.dcn%TYPE,
		p_event_seq_no		IN	oltbs_contract.latest_event_seq_no%TYPE,
		p_counterparty		IN	oltbs_contract.counterparty%TYPE,
		p_in_out		IN	VARCHAR2,
		p_error_code		IN OUT	VARCHAR2,		
		p_error_parameter	IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION fn_enrich_mt320
	(
	p_contract_ref_no	IN	OLTB_CONTRACT.contract_ref_no%TYPE,
	p_dcn			IN	CNTB_UPLOAD_MM.dcn%TYPE,
	p_event_seq_no		IN	CNTB_CONTRACT_MM.event_seq_no%TYPE,
	p_counterparty		IN	oltm_customer.customer_no%TYPE,
	p_in_out		IN	VARCHAR2,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter	IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_enrich_mt518
		(
		p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
		p_dcn			IN	cntbs_upload_se.dcn%TYPE,
		p_event_seq_no		IN	oltbs_contract.latest_event_seq_no%TYPE,
		p_counterparty		IN	oltbs_contract.counterparty%TYPE,
		p_in_out		IN	VARCHAR2,
		p_error_code		IN OUT	VARCHAR2,		
		p_error_parameter	IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION fn_get_row_for_tag	
				(
				p_tag		IN	varchar2
				)
RETURN NUMBER;

FUNCTION fn_enrich_confirmation_msg
		(
		p_dly_msg_rec	IN		oltbs_dly_msg_out%ROWTYPE,
		p_error_code	IN OUT	VARCHAR2,
		p_error_parameter	IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION fn_external_capture
		(
		p_module		IN		VARCHAR2,
		p_error_code	IN OUT	VARCHAR2,
		p_error_parameter	IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION fn_waive_incoming
	(
	p_dcn		IN		cntbs_upload_fx.dcn%TYPE,
	p_module	IN		smtbs_modules.module_id%TYPE,
	p_errcode	IN OUT	varchar2
	)
RETURN BOOLEAN;

END olpks_cn_confirm_1;
/