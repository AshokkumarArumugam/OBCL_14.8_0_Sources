CREATE OR REPLACE PACKAGE olpks_adv_new_2 AS

/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_adv_new_2.SPC
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

FUNCTION fn_mt104
	(
	p_modproc_rec 		IN OUT	oltbs_dly_msg_out%ROWTYPE,  --15-DEC-2003 FCC 4.4 dec2003 changes for ITR1 SFR 552 Dly_msg_out ref Cur is made IN OUT variable 
	p_cstbs_msgho_rec 	IN OUT	oltbs_msgho_cs%ROWTYPE,
	p_cstbs_contractis_rec	IN OUT	oltbs_contractis_cs%ROWTYPE,
	p_adv_input			IN OUT 	olpkss_messaging.tbl_msg_adv_type,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

-------------------------------------------------------------------------------------------------------------------

FUNCTION Fn_mt210
	(
	p_modproc_rec 		IN OUT	oltbs_dly_msg_out%ROWTYPE,  --15-DEC-2003 FCC 4.4 dec2003 changes for ITR1 SFR 552 Dly_msg_out ref Cur is made IN OUT variable 
	p_cstbs_msgho_rec 	IN OUT	oltbs_msgho_cs%ROWTYPE,
	p_cstbs_contractis_rec 	IN OUT	oltbs_contractis_cs%ROWTYPE,
	p_adv_input			IN OUT 	olpkss_messaging.tbl_msg_adv_type,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

-------------------------------------------------------------------------------------------------------------------

FUNCTION Fn_mt204
	(
	p_modproc_rec 		IN OUT	oltbs_dly_msg_out%ROWTYPE, --15-DEC-2003 FCC 4.4 dec2003 changes for ITR1 SFR 552 Dly_msg_out ref Cur is made IN OUT variable 
	p_cstbs_msgho_rec 	IN OUT	oltbs_msgho_cs%ROWTYPE,
	p_cstbs_contractis_rec 	IN OUT 	oltbs_contractis_cs%ROWTYPE,
	p_adv_input			IN OUT	olpkss_messaging.tbl_msg_adv_type,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

-------------------------------------------------------------------------------------------------------------------

FUNCTION Fn_reverse_mt202
	(
	p_modproc_rec 		IN OUT	oltbs_dly_msg_out%ROWTYPE, --15-DEC-2003 FCC 4.4 dec2003 changes for ITR1 SFR 552 Dly_msg_out ref Cur is made IN OUT variable 
	p_cstbs_msgho_rec 	IN OUT	oltbs_msgho_cs%ROWTYPE,
	p_cstbs_contractis	IN OUT	oltbs_contractis_cs%ROWTYPE,
	p_adv_input			IN OUT 	olpkss_messaging.tbl_msg_adv_type,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

-------------------------------------------------------------------------------------------------------------------

FUNCTION fn_revmt103 
	(
	p_modproc_rec           IN OUT     	oltbs_dly_msg_out%ROWTYPE, --15-DEC-2003 FCC 4.4 dec2003 changes for ITR1 SFR 552 Dly_msg_out ref Cur is made IN OUT variable 
	p_cstbs_msgho_rec       IN OUT   	oltbs_msgho_cs%ROWTYPE,
	p_cstbs_contract_rec	IN OUT	oltbs_contractis_cs%ROWTYPE,
	p_adv_input			IN OUT	olpkss_messaging.tbl_msg_adv_type,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

-------------------------------------------------------------------------------------------------------------------

FUNCTION fn_credit_confirm 
	(
	p_modproc_rec 		IN OUT	oltbs_dly_msg_out%ROWTYPE, --15-DEC-2003 FCC 4.4 dec2003 changes for ITR1 SFR 552 Dly_msg_out ref Cur is made IN OUT variable 
	p_cstbs_msgho_rec 	IN OUT 	oltbs_msgho_cs%ROWTYPE,
	p_cstbs_contractis_rec	IN OUT	oltbs_contractis_cs%ROWTYPE,
	p_adv_input			IN OUT	olpkss_messaging.tbl_msg_adv_type,
	p_error_code		IN OUT	VARCHAR,
	p_error_parameter		IN OUT	VARCHAR
	)
RETURN BOOLEAN;

-------------------------------------------------------------------------------------------------------------------

FUNCTION Fn_debit_confirm 
	(
	 p_modproc_rec 		IN OUT	oltbs_dly_msg_out%ROWTYPE, --15-DEC-2003 FCC 4.4 dec2003 changes for ITR1 SFR 552 Dly_msg_out ref Cur is made IN OUT variable 
	 p_cstbs_msgho_rec	IN OUT	oltbs_msgho_cs%ROWTYPE,
	 p_cstbs_contractis_rec	IN OUT	oltbs_contractis_cs%ROWTYPE,
	 p_adv_input		IN OUT	olpkss_messaging.tbl_msg_adv_type,
	 p_error_code		IN OUT	VARCHAR2,
	 p_error_parameter	IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

-------------------------------------------------------------------------------------------------------------------

FUNCTION Fn_creditadv 
		(p_modproc_rec 			IN OUT	oltbs_dly_msg_out%ROWTYPE, --15-DEC-2003 FCC 4.4 dec2003 changes for ITR1 SFR 552 Dly_msg_out ref Cur is made IN OUT variable 
		 p_cstbs_msgho_rec		IN OUT	oltbs_msgho_cs%ROWTYPE,
		 p_cstbs_contractis_rec		IN OUT	oltbs_contractis_cs%ROWTYPE,
		 p_adv_input			IN OUT	olpkss_messaging.tbl_msg_adv_type,
		 p_error_code			IN OUT	VARCHAR2,
		 p_error_parameter		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

--------------------------------------------------------------------------------------------------------------------

FUNCTION Fn_debitadv 
		(p_modproc_rec 			IN OUT	oltbs_dly_msg_out%ROWTYPE, --15-DEC-2003 FCC 4.4 dec2003 changes for ITR1 SFR 552 Dly_msg_out ref Cur is made IN OUT variable 
		 p_cstbs_msgho_rec		IN OUT	oltbs_msgho_cs%ROWTYPE,
		 p_cstbs_contractis_rec		IN OUT	oltbs_contractis_cs%ROWTYPE,
		 p_adv_input			IN OUT	olpkss_messaging.tbl_msg_adv_type,
		 p_error_code			IN OUT	VARCHAR2,
		 p_error_parameter		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

-------------------------------------------------------------------------------------------------------------------

END olpks_adv_new_2;
/
Create or replace synonym olpkss_adv_new_2 for olpks_adv_new_2
/