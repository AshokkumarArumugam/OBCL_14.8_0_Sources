CREATE OR REPLACE PACKAGE lfpks_charge_stmt
AS
/*-----------------------------------------------------------------------------------------------

This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
---------------------------------------------------------------------------------------------------
*/
	FUNCTION fn_insert_chg_stmt
		(
		p_dcn			IN	OLTB_DLY_MSG_OUT.dcn%type,
		p_branch_code	IN	oltm_branch.branch_code%type,
		p_cust_ac_no	IN	oltbs_account.ac_gl_no%type,
		p_from_dt		IN	DATE,
		p_to_dt		IN	DATE,
		p_dly_msg_out	OUT	oltbs_dly_msg_out%rowtype
		)
	RETURN BOOLEAN;	

	FUNCTION fn_populate_chg_details
		(
		p_dly_msg_out		IN 	oltbs_dly_msg_out%ROWTYPE,
		p_tb_history		IN	lfpkss_deferred_charge.tbl_liqd_nonconsol,
		p_loop_cnt			IN	NUMBER
		)
	RETURN BOOLEAN;

	FUNCTION fn_generate_chg_stmt
		(
		p_dly_msg_out		IN OUT	oltbs_dly_msg_out%ROWTYPE,
		p_error_code		IN OUT	VARCHAR2,
		p_error_parameter		IN OUT	VARCHAR2
		)
	RETURN BOOLEAN;
	
	PROCEDURE pr_putits
		(
		pdcn	IN	oltbs_adv_input.dcn%TYPE,
		ploop	IN	oltbs_adv_input.loop_no%TYPE,
		ptag	IN	oltbs_adv_input.field_tag%TYPE,
		pstr	IN	oltbs_adv_input.value%TYPE
		);
	
	PROCEDURE pr_PopulateRepHdr
		(
		p_dly_msg_out 	IN	oltbs_dly_msg_out%ROWTYPE,
		p_branch_code	IN	oltms_branch.branch_code%TYPE,
		p_component		IN	oltms_class.class_code%TYPE,
		p_module		IN	smtbs_modules.module_id%TYPE
		);

END lfpks_charge_stmt;
/
CREATE or replace SYNONYM lfpkss_charge_stmt FOR lfpks_charge_stmt
/