create or replace package olpks_adv_misc_1 as
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_adv_misc_1.SPC
**
** Module		: LETTERS OF CREDIT
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

/* CHANGE HISTORY
PLNCITI 2295 Overloaded function fn_sep_string added to be used by lcs760.sql
11-May-2016 OFCL12.2 kept only adv_input and commented others
*/
--- PLNCITI 2295 Overloaded funciton added
/*FUNCTION fn_sep_string(p_org_string     IN      varchar2,
		       p_portion1       OUT     varchar2,
		       p_portion2       OUT     varchar2,
		       p_num_char       IN      number,
			 p_strip_LF		IN 	  varchar2
		       )
RETURN boolean;
--- PLNCITI 2295 End of Addition
FUNCTION fn_sep_string(p_org_string     IN      varchar2,
		       p_portion1       OUT     varchar2,
		       p_portion2       OUT     varchar2,
		       p_num_char       IN      number
		       )
RETURN boolean;
FUNCTION fn_check_string_validity(p_org_string     IN      varchar2,
				  p_num_char       IN      number, 
				  p_num_lines      IN      number
				  )
RETURN boolean;*/
-- OFCL12.2 
FUNCTION fn_ins_adv_input(p_dcn_no        IN        oltbs_adv_input.dcn%TYPE,
			  	  p_media         IN        oltbs_dly_msg_out.media%TYPE,
			        p_tag           IN  OUT   oltbs_adv_input.field_tag%TYPE,
			        p_loop_num      IN        oltbs_adv_input.loop_no%TYPE,
			        p_value         IN        oltbs_adv_input.value%TYPE
                          )
RETURN boolean;
/*FUNCTION fn_get_contract_row(p_ref_no     IN       lctbs_contract_master.contract_ref_no%TYPE,
			           p_esn_no     IN       lctbs_contract_master.event_seq_no%TYPE
			           )
RETURN boolean;
FUNCTION fn_get_shipment_row(p_ref_no     IN       lctbs_contract_master.contract_ref_no%TYPE,
			           p_esn_no     IN       lctbs_contract_master.event_seq_no%TYPE
			           )
RETURN boolean;*/
-- OFCL12.2
END;
/
create or replace synonym olpkss_adv_misc_1 for olpks_adv_misc_1
/