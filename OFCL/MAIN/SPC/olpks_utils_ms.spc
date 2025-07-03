CREATE OR REPLACE PACKAGE olpks_utils_ms
IS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_utils_ms.SPC
**
** Module	: MESSAGE PROCESSING
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

12-DEC-2003 FCC 4.4 DEC 2003 new package for fx/mm cable sent report

*/

TYPE		msg_settlement_parties_tab
IS			TABLE
OF			oltbs_msg_settlement_parties%ROWTYPE
INDEX BY	BINARY_INTEGER;

FUNCTION fn_populate_rpt_detail
	(
		p_brn				IN		oltms_branch.branch_code%TYPE,
		p_module_code		IN		oltbs_contract.module_code%TYPE,
		p_date				IN		DATE,
		p_error_code		IN OUT	VARCHAR2,
		p_error_parameter	IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_get_msgs_for_reference
	(
		p_cstbs_contract			IN		oltbs_contract%ROWTYPE,
		p_msg_settlement_parties	OUT		msg_settlement_parties_tab,
		p_error_code				IN OUT	VARCHAR2,
		p_error_parameter			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

END olpks_utils_ms;
/
CREATE or replace SYNONYM olpkss_ms_utils FOR olpks_utils_ms
/