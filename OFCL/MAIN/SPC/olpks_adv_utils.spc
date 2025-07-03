CREATE OR REPLACE PACKAGE olpks_adv_utils
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_adv_utils.SPC
**
** Module		: LD
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


FUNCTION fn_pop_adv_input
	(
	p_dcn			IN	oltbs_adv_input.dcn%TYPE,
	p_field_tag		IN	oltbs_adv_input.field_tag%TYPE,
	p_loop_no		IN	oltbs_adv_input.loop_no%TYPE,
	p_field_value	IN	oltbs_adv_input.value%TYPE,
	p_justify		IN	oltbs_adv_input.justify%TYPE,
	p_err_code		IN OUT	ertbs_msgs.err_code%TYPE
	)
	RETURN boolean;

FUNCTION fn_out_msg_info
	(
	p_out_msg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_err_code			IN OUT	ertbs_msgs.err_code%TYPE
	)
	RETURN boolean;

FUNCTION fn_process_contract_info
	(
	p_out_msg_record	IN	oltbs_dly_msg_out%ROWTYPE,
	p_err_code			IN OUT	ertbs_msgs.err_code%TYPE
	)
	RETURN boolean;

FUNCTION fn_branch_details
	(
	p_out_msg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_err_code			IN OUT	ertbs_msgs.err_code%TYPE
	)
	RETURN boolean;

END olpks_adv_utils;
/
create or replace synonym olpkss_adv_utils for olpks_adv_utils
/