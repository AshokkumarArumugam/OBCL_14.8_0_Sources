CREATE OR REPLACE PACKAGE olpks_adv_new_1
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_adv_new_1.SPC
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
15-MAY-2003	FCC 4.5 APR 2004 ITR2 SFR 6
*/

FUNCTION Fn_mt202
		(
		p_modproc_rec    		IN OUT	oltbs_dly_msg_out%ROWTYPE, --15-DEC-2003 FCC 4.4 dec2003 changes for ITR1 SFR 552 Dly_msg_out ref Cur is made IN OUT variable 
		p_is_msgho_rec  		IN OUT	oltbs_msgho_cs %ROWTYPE,
	     	p_is_contractis_rec     IN OUT 	oltbs_contractis_cs %ROWTYPE,
	     	p_msg_tbl_adv  		IN OUT   	olpkss_messaging.tbl_msg_adv_type,
		p_error_code		IN OUT	VARCHAR2,
		p_error_parameter		IN OUT	VARCHAR2	     	
		)
RETURN BOOLEAN;

FUNCTION Fn_cover
		(
		p_modproc_rec 		IN OUT	oltbs_dly_msg_out%ROWTYPE, --15-DEC-2003 FCC 4.4 dec2003 changes for ITR1 SFR 552 Dly_msg_out ref Cur is made IN OUT variable 
		p_is_msgho_rec 		IN OUT	oltbs_msgho_cs%ROWTYPE,
		p_is_contractis_rec	IN OUT	oltbs_contractis_cs%ROWTYPE,
	     	p_msg_tbl_adv  		IN OUT   	olpkss_messaging.tbl_msg_adv_type,
		p_error_code		IN OUT	VARCHAR2,
		p_error_parameter		IN OUT	VARCHAR2	     		     	
		)
RETURN BOOLEAN;

FUNCTION Fn_mt103
		(
		p_modproc_rec 	 IN OUT	oltbs_dly_msg_out%ROWTYPE, --15-DEC-2003 FCC 4.4 dec2003 changes for ITR1 SFR 552 Dly_msg_out ref Cur is made IN OUT variable 
		p_msgho_rec		 IN OUT	oltbs_msgho_cs%ROWTYPE,
		p_contractis_rec	 IN OUT	oltbs_contractis_cs%ROWTYPE,
		p_msg_tbl_adv  	 IN OUT     olpkss_messaging.tbl_msg_adv_type,
		p_error_code	 IN OUT 	VARCHAR2,
		p_error_parameter	 IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

-- FCC 4.5 LOT2 ITR2 SFR 6
FUNCTION	fn_ret_reference_no
	(
	p_contract_rec		IN	oltbs_contract%ROWTYPE,
	p_reference_number	OUT	oltbs_contract.swift_ref_no%TYPE
	)
RETURN BOOLEAN;
-- FCC 4.5 LOT2 ITR2 SFR 6

END olpks_adv_new_1;
/
CREATE OR REPLACE SYNONYM olpkss_adv_new_1 FOR olpks_adv_new_1
/