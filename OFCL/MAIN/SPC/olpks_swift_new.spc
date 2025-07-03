CREATE OR REPLACE PACKAGE olpks_swift_new
IS

/*-------------------------------------------------------------------------------------------------------------------
**
** File Name	: olpks_swift_new
**
** Module		: 
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
------------------------------------------------------------------------------------------------------------------
*/

FUNCTION fn_generate_swift_message 
		(
		p_out_msg_record		IN      	oltbs_dly_msg_out%ROWTYPE	,
		p_msg_tbl_adv		IN OUT  	olpkss_messaging.tbl_msg_adv_type	,
		p_error_code		IN OUT	VARCHAR2				,
		p_error_parameter 	IN OUT  	VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION fn_generate_message
		(
		p_cur_out_msg_record    IN      	olpkss_messaging.module_proc_curtype	,
		p_msg_tbl_adv		IN OUT  	olpkss_messaging.tbl_msg_adv_type		,
		p_error_code		IN OUT	VARCHAR2				,
		p_error_parameter 	IN OUT  	VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION fn_populate_settlement_fields 
  	(
	p_out_msg_record			IN      	oltbs_dly_msg_out%ROWTYPE			,
	p_contract_rec               	IN       	oltbs_contract%ROWTYPE			,
	p_sender_swift_address   	IN       	sttms_core_swift_address.swift_address%TYPE		,
	p_recvr_swift_address    	IN       	sttms_core_swift_address.swift_address%TYPE		,
	p_current_event          	IN       	oltbs_contract.curr_event_code%TYPE	,
	p_contractis_record      	IN 		olpkss_new.g_contractis_record_type	,
	p_option				IN		VARCHAR2					,
	p_field_tbl				IN OUT	olpkss_parties.g_party_tbl_type	,
	p_pay_recv_ind			IN		VARCHAR2					,
	p_error_code	       	IN OUT 	VARCHAR2					,
	p_error_parameter	      	IN OUT 	VARCHAR2
  	)
  
RETURN BOOLEAN;

FUNCTION fn_break_on_newline
			(p_value			IN 		VARCHAR2,
			 p_line1			IN OUT	VARCHAR2,
			 p_line2			IN OUT	VARCHAR2,
			 p_line3			IN OUT	VARCHAR2,
			 p_line4			IN OUT	VARCHAR2,
			 p_line5			IN OUT	VARCHAR2,
			 p_line6			IN OUT	VARCHAR2,
			 p_error_code		IN OUT 	ertbs_msgs.err_code%TYPE,
			 p_error_parameter	IN OUT	VARCHAR2
			)
RETURN BOOLEAN;

FUNCTION fn_generate_mail_message
		(
		p_out_msg_record		IN      	oltbs_dly_msg_out%ROWTYPE	,
		p_error_code		IN OUT	VARCHAR2				,
		p_error_parameter 	IN OUT  	VARCHAR2
		)
RETURN BOOLEAN;

END olpks_swift_new;
/
CREATE or replace synonym olpkss_swift_new for olpks_swift_new
/