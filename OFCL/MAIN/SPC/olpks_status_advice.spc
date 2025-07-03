CREATE OR REPLACE PACKAGE olpks_status_advice
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_status_advice.SPC
**
** Module		: LOANS and DEPOSITS
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
----------------------------------------------------------------------
/*    STARTING  PACKAGE SPECIFICATION */
----------------------------------------------------------------------



FUNCTION fn_common_status_advice
	(
	p_out_msg_record	IN	oltbs_dly_msg_out%ROWTYPE
	)
	RETURN boolean;

FUNCTION fn_populate_adv_input
	(
	p_dcn			IN	oltbs_adv_input.dcn%TYPE,
	p_field_tag		IN	oltbs_adv_input.field_tag%TYPE,
	p_loop_no		IN	oltbs_adv_input.loop_no%TYPE,
	p_field_value		IN	oltbs_adv_input.value%TYPE,
	p_justify		IN	oltbs_adv_input.justify%TYPE
	)
	RETURN boolean;

END olpks_status_advice;
/
CREATE or replace SYNONYM olpkss_status_advice FOR olpks_status_advice
/