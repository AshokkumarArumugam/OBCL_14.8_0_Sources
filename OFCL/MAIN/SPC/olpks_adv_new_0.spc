CREATE OR REPLACE PACKAGE olpks_adv_new_0 AS

/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_adv_new_0.SPC
**
** Module		: SETTLEMENTS
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
/*

CHANGE_HISTORY
15-DEC-2003 FCC 4.4 dec2003 changes for ITR1 SFR 552 Dly_msg_out ref Cur is made IN OUT variable 
*/
FUNCTION Fn_mk_adv_input
		( 
		--p_module_proc_cur IN OUT	olpkss_messaging.module_proc_curtype , --15-DEC-2003 FCC 4.4 dec2003 changes for ITR1 SFR 552 Dly_msg_out ref Cur is made IN OUT variable 
		p_msg_rec 		IN OUT	oltbs_dly_msg_out%ROWTYPE, --15-DEC-2003 FCC 4.4 dec2003 changes for ITR1 SFR 552 Dly_msg_out ref Cur is made IN OUT variable 
		p_tbl_adv_input	IN OUT	olpkss_messaging.tbl_msg_adv_type,
		p_err_code		IN OUT 	ertbs_msgs.err_code%TYPE ,
		p_err_param		IN OUT 	VARCHAR2
		)			
RETURN BOOLEAN ;

FUNCTION fn_insert_n92
		(
		p_ref_no		IN		oltbs_dly_msg_out.reference_no%TYPE	,
		p_branch		IN		oltbs_dly_msg_out.branch%TYPE		,
		p_newseq		IN		oltbs_dly_msg_out.esn%TYPE		,
		p_product_code	IN		oltbs_contract.product_code%TYPE	,
		p_error_code	IN OUT 	VARCHAR2					,
		p_error_parameter IN OUT      VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION fn_gen_mtn92	(
					p_modproc_rec 	IN OUT      oltbs_dly_msg_out%ROWTYPE,	--15-DEC-2003 FCC 4.4 dec2003 changes for ITR1 SFR 552 Dly_msg_out ref Cur is made IN OUT variable 
					p_tbl_adv_input	IN OUT	olpkss_messaging.tbl_msg_adv_type,
					p_error_code	IN OUT 	VARCHAR2,
					p_error_parameter IN OUT      VARCHAR2
				)
RETURN BOOLEAN;

END olpks_adv_new_0; 
/
CREATE or replace SYNONYM olpkss_adv_new_0  FOR olpks_adv_new_0 
/