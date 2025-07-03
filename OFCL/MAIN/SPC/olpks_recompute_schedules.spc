CREATE OR REPLACE PACKAGE olpks_recompute_schedules IS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_recompute_schedules.SPC
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
/* CHANGE HISTORY
   --------------
20-Jul-2003 FCC4.3 AUG2003 TIDE CHANGES - New function fn_comput_prepaid_iccf_det added
*/


TYPE ty_comput IS RECORD ( 
	p_contract_reference_no oltbs_computation_handoff.contract_ref_no%TYPE,
	p_component 		oltbs_computation_handoff.component%TYPE,
	p_effective_date	oltbs_computation_handoff.effective_date%TYPE,
	p_rate 			oltbs_computation_handoff.rate%TYPE,
	p_amount		oltbs_computation_handoff.amount%TYPE,
	p_rate_sign		oltbs_computation_handoff.rate_sign%TYPE --Negative Interest Rate 
	);

TYPE tab_ty_comput IS 
	TABLE OF ty_comput 
	INDEX BY BINARY_INTEGER;

FUNCTION	fn_comput_iccf_det(p_ref_no			IN VARCHAR2,
							p_processing_date			IN	date,
							p_action_code		IN VARCHAR2,
							p_handoff			IN tab_ty_comput,
							p_schedule_date		IN DATE,
							p_adjusted_amount	IN OUT NUMBER,
							p_event_seq_no		IN NUMBER,
							p_error_code		IN OUT ertbs_msgs.err_code%TYPE)
RETURN BOOLEAN;

--20-Jul-2003 FCC4.3 AUG2003 TIDE CHANGES Starts
FUNCTION fn_comput_prepaid_iccf_det
         (	 p_ref_no				IN     VARCHAR2,
		 p_event_seq_no			IN     NUMBER,
		 p_processing_date		IN     DATE,
		 p_action_code			IN     VARCHAR2,
		 p_handoff				IN     tab_ty_comput,
		 p_rate_for_prepaid_amt		IN	 NUMBER,
		 p_rate_for_outstanding_amt 	IN     NUMBER,
		 p_adjusted_amount		OUT 	 NUMBER,
		 p_prepaid_amt_interest 	OUT    NUMBER,		 
		 p_errcode 				IN OUT VARCHAR2,
		 p_param 				IN OUT VARCHAR2
         )
RETURN BOOLEAN ;
--20-Jul-2003 FCC4.3 AUG2003 TIDE CHANGES Ends
END;
/
CREATE or replace SYNONYM olpkss_recompute_schedules FOR olpks_recompute_schedules
/