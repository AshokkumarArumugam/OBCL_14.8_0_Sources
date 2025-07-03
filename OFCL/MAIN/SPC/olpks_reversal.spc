CREATE OR REPLACE PACKAGE olpks_reversal AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_reversal.SPC
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



/*
CHANGE HISTORY

01-JULY-2003 FCC 4.3 AUG 2003 Development Requirements.
	Requirement:
			While doing LD Reversal, a new field Transaction Type has to be specified at the Contract/Payment/Fee
			screen. This will be passed to the respective subsystems.
	Changes Done:
			fn_reverse_contract overloaded spec has been added
*/

-- 01-JULY-2003 FCC 4.3 AUG 2003 Development Requirements Start.
g_elcm_rollover VARCHAR2(1) := 'N';
FUNCTION fn_reverse_contract
(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_current_event_seq_no	IN		oltbs_contract.latest_event_seq_no%TYPE,
	p_event_code		IN		oltbs_contract.curr_event_code%TYPE,
	p_handoff_action_code	IN		char,
	p_TranType			IN		oltms_trn_type.trn_type%TYPE,				
	p_error_code		IN OUT	ertbs_msgs.err_code%TYPE,
	p_error_parameter		IN OUT	varchar2
) RETURN boolean;
-- 01-JULY-2003 FCC 4.3 AUG 2003 Development Requirements End.

FUNCTION fn_reverse_contract
(
	p_contract_ref_no			IN			oltbs_contract.contract_ref_no%TYPE,
	p_current_event_seq_no	IN			oltbs_contract.latest_event_seq_no%TYPE,
	p_event_code				IN			oltbs_contract.curr_event_code%TYPE,
	p_handoff_action_code	IN			char,
	p_error_code				IN OUT	ertbs_msgs.err_code%TYPE,
	p_error_parameter			IN OUT	varchar2
)
	RETURN boolean;



END olpks_reversal;
/
Create or replace  Synonym olpkss_reversal for olpks_reversal
/