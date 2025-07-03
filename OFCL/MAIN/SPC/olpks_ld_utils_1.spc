CREATE OR REPLACE PACKAGE olpks_ld_utils_1
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_ld_utils_1.SPC
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

FUNCTION fn_set_params
		(
		p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
		p_module			IN		oltbs_contract.module_code%TYPE,
		p_event_code		IN		oltbs_contract.curr_event_code%TYPE,
		p_error_code		IN OUT 	VARCHAR2,
		p_error_parameter		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;


FUNCTION fn_get_params
		(
		p_fcy				IN  		oltbs_handoff.ac_ccy%TYPE,
		p_lcy_exch_rate		IN OUT	oltbs_handoff.exch_rate%TYPE,
		p_error_code		IN OUT 	VARCHAR2,
		p_error_parameter		IN OUT 	VARCHAR2
		)
RETURN BOOLEAN;

END olpks_ld_utils_1;
/
CREATE or replace SYNONYM olpkss_utils_1 FOR olpks_ld_utils_1
/