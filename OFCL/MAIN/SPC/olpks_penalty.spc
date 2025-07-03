CREATE OR REPLACE PACKAGE olpks_penalty AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_penalty.SPC
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

FCC4.3.1	Rolled back the changes done in the same release as the spec does not need to be changed
11-APR-2012 Flexcube V.CL Release 7.11 FS Tag 07,
						1)Handled penalty components logic if applicable to the contract
21-JUN-2012 Flexcube V.CL Release 7.11 IUT SFR#107 Changes - Late payment charge was not recalculated for the commitment on LINK


    **Changed By         : Navoneel Nandan
    **Change Description : Derived Penalty Component Changes
    **Search String      : OBCL_14.4_CDI
    **Changed On         : 09-Jan-2019
	
	**Changed By         : Arunprasath
    **Change Description : SOFR Penalty changes
    **Search String      : OBCL_14.4_PENALTY_Change_Dec
    **Changed On         : 28-Dec-2020
	**Changed By         : Mohan Pal
	**Date               : 06-Aug-2021
	**Change Description : Restricting RFR staging table Population if LQBVSH is Y
	**Search String      : SOFR_Bug#33040217_#6
  
  **Changed By         : Sudharshini Balaji
  **Date               : 24-Nov-2021
  **Change Description : Added code for Saturday Due Date RFR Penalty(Holiday Case)
  **Search String      : Bug#33563411

  **Changed By         : Navoneel Nandan
  **Date               : 18-Feb-2022
  **Change Description : Tuning for Derived Components
  **Search String      : Bug#34007015
  
  **Changed By         : Arunprasath
  **Date               : 22-Aug-2022
  **Change Description : Added record type Ty_Tb_contract_interest 
  **Search String      : Bug#34486053

  **Changed By         : Navoneel Nandan
  **Date               : 19-Apr-2023
  **Change Description : for Derived Components, added g_derived_penal_calc flag.
  **Search String      : Bug#35303680

  **  Changed By         : Abhik Das
  **  Changed On         : 12-Jul-2023
  **  Change Description : RABO Brazil need penalty calculation to happen
                           in BOD. But there is one variable l_proceed for which
                           special penalty processing was not happening during BOD
                           with their customisation also. So, they want hook
						   to update this variable as part of custom code.
                           Hooks provided to modify the l_proceed flag as part of
                           their customisation.
                           Added function Fn_Allow_Spl_Penalty_During_BOD for 
						   providing pre and post hook.
                           Ref No- RABOBR_14.5_04_JUL_2023_01_0000
  **  Search String      : OBCL_14.7_RABOBRW_Hook_Bug#35585955_Changes

  **  Changed By         : Balaji Gopal
  **  Changed On         : 08-Apr-2024
  **  Change Description : SID - Added hook request to consider different basis amount for calculating interest.  Also to enable the customer not to collect interest if certain threshold is not met
  **  Search String      : Bug#36429314

  **  Changed By         : Balaji Gopal
  **  Changed On         : 18-Apr-2024
  **  Change Description : SID - Hook Request - Parameter list_of_new_comps is required to send the list of penal components processed and same is using next for accrual.
  **  Search String      : Bug#36429314_1

    **Changed By         : Navoneel Nandan
    **Date               : 11-Jun-2024
    **Change Description : Calculating Penalty only from the last split date in ICCF Calc
    **Search String      : Bug#36626521_2

	**Changed By         : Pallavi R
	**Date               : 08-Aug-2024
	**Change Description : Penal calculations on DSBR reversal
	**Search String      : OBCL_14.7_ABFD_#36864537 Changes 
	
  **Changed By          : Navoneel Nandan
  **Changed On          : 05-Nov-2024
  **Change Description  : Recalculating from the payment date during Reversal of Payment of an already partially paid schedule if the INCR_PENAL_CALC is set to Y.
  **Search String       : Bug#37184355	
----------------------------------------------------------------------------------------------------
*/
  g_Rever_Penal_Recalc_Date DATE := NULL; --OBCL_14.7_ABFD_#36864537 Changes 
--Bug#37184355 starts
g_incr_penal_calc varchar2(1);
g_trn_val_date DATE;
--Bug#37184355 ends
FUNCTION fn_automatic_penalty_detection
(
p_processing_branch	IN		oltbs_contract.branch%TYPE,
p_module					IN		oltbs_contract.module_code%TYPE,
p_processing_date		IN		date,
p_product				IN		oltbs_contract.product_code%TYPE,
p_commit_frequency	IN		oltbs_automatic_process_master.bod_commit_count%TYPE,
p_error_code			IN OUT	varchar2,
p_error_parameter		IN OUT	varchar2
)
RETURN boolean;

FUNCTION fn_process_for_a_product
(
p_processing_branch	IN	oltbs_contract.branch%TYPE,
p_module					IN	oltbs_contract.module_code%TYPE,
p_processing_date		IN	date,
p_product				IN	oltbs_contract.product_code%TYPE,
p_commit_frequency	IN	oltbs_automatic_process_master.bod_commit_count%TYPE,
p_transaction_count	IN OUT	integer,
p_error_code			IN OUT	ertbs_msgs.err_code%TYPE
)
RETURN boolean;

FUNCTION FN_PROCESS_FOR_A_CONTRACT
(
p_contract_ref_no		IN	oltbs_contract.contract_ref_no%TYPE,
p_processing_date		IN	DATE,
p_authorization_status		IN	oltbs_contract.auth_status%TYPE,
p_handoff_action_code		IN	CHAR,
p_error_code			IN OUT	ertbs_msgs.err_code%TYPE,
p_esn				IN	oltbs_contract_event_log.event_seq_no%type default null--11-APR-2012 Flexcube V.CL Release 7.11 FS Tag 07 Changes
)
Return Boolean;

-- Added as part of this Bug#36429314 Starts Here
FUNCTION fn_process_for_a_contract_wrapper
(
p_processing_branch     IN oltbs_contract.branch%TYPE,
p_processing_date       IN date,
p_authorization_status  IN oltbs_contract.auth_status%TYPE,
p_handoff_action_code   IN char,
p_product               IN oltbs_contract.product_code%TYPE,
p_module                IN oltbs_contract.module_code%TYPE,
p_contract_ref_no       IN oltbs_contract.contract_ref_no%TYPE,
p_latest_event_seq_no   IN oltbs_contract.latest_event_seq_no%TYPE,
p_latest_version_no     IN oltbs_contract.latest_version_no%TYPE,
p_customer              IN oltbs_contract.counterparty%TYPE,
p_contract_currency     IN oltbs_contract.contract_ccy%TYPE,
p_product_type          IN oltbs_contract.product_type%TYPE,
p_contract_value_date   IN date,
p_grace_days            IN oltms_product_master_ld.grace_days%TYPE,
p_transaction_count     IN OUT integer,
p_list_of_new_comps     IN OUT varchar2, -- Added this parameter as part of this Bug#36429314_1
p_error_code            IN OUT ertbs_msgs.err_code%TYPE,
p_esn                   IN oltbs_contract_event_log.event_seq_no%type default null,
p_proceed               IN varchar2
)
 RETURN BOOLEAN;
-- Added as part of this Bug#36429314 Ends Here

FUNCTION fn_process_for_a_contract
(
p_processing_branch		IN	oltbs_contract.branch%TYPE,
p_processing_date			IN	date,
p_authorization_status	IN	oltbs_contract.auth_status%TYPE,
p_handoff_action_code	IN	char,
p_product					IN	oltbs_contract.product_code%TYPE,
p_module						IN	oltbs_contract.module_code%TYPE,
p_contract_ref_no			IN	oltbs_contract.contract_ref_no%TYPE,
p_latest_event_seq_no	IN	oltbs_contract.latest_event_seq_no%TYPE,
p_latest_version_no		IN	oltbs_contract.latest_version_no%TYPE,
p_customer					IN	oltbs_contract.counterparty%TYPE,
p_contract_currency		IN	oltbs_contract.contract_ccy%TYPE,
p_product_type		IN		oltbs_contract.product_type%TYPE,
p_contract_value_date		IN		date,
p_grace_days				IN	oltms_product_master_ld.grace_days%TYPE,
p_transaction_count		IN OUT	integer,
p_error_code				IN OUT	ertbs_msgs.err_code%TYPE,
p_esn				IN	oltbs_contract_event_log.event_seq_no%type default null--11-APR-2012 Flexcube V.CL Release 7.11 FS Tag 07 Changes
--Bug#34007015 starts
--,p_BASED_ON_PENALTY    IN OLTB_DERIVED_TAG.BASED_ON_PENALTY%type default 'N'--OBCL_14.4_CDI changes
--,p_single_comp         IN oltbs_amount_due.component%type default null--OBCL_14.4_CDI changes
--,p_prev_sch_date       IN oltbs_amount_due.due_date%type default null--OBCL_14.4_CDI_Bug2#31239435
--Bug#34007015 ends
)
RETURN boolean;
---OBCL_14.7_RABOBRW_Hook_Bug#35585955_Changes Starts---
FUNCTION Fn_Allow_Spl_Penalty_During_BOD(p_contract_ref_no   IN  oltbs_contract.contract_ref_no%TYPE,
                                           p_esn   IN  oltbs_contract.latest_event_seq_no%TYPE,
                                           p_ev_code       IN  oltbs_contract_event_log.event_code%TYPE,
                                         p_proceed   IN OUT VARCHAR2,
                                         p_error_code      IN OUT  ertbs_msgs.err_code%TYPE
                                           )
RETURN BOOLEAN;
----OBCL_14.7_RABOBRW_Hook_Bug#35585955_Changes Ends----


--Bug#36626521_2 starts
FUNCTION fn_get_penal_calc_start_date(p_contract_ref_no IN oltbs_amount_due.contract_ref_no%TYPE,
                                      p_component       IN oltbs_amount_due.component%TYPE,
                                      p_sch_date        IN oltbs_amount_due.schedule_date%TYPE,
                                      p_start_date      IN OUT DATE)
  RETURN BOOLEAN;
FUNCTION fn_upd_last_calc_date(p_contract_ref_no IN oltbs_amount_due.contract_ref_no%TYPE,
                               p_last_calc_date  IN oltbs_amount_due.last_calc_date%TYPE,
                               p_component       IN oltbs_amount_due.component%TYPE DEFAULT NULL)
  RETURN BOOLEAN;
--Bug#36626521_2 ends
FUNCTION fn_insert_pensch
(
p_contract_ref_no	IN		oltbs_contract.contract_ref_no%type,
p_processing_date	IN		date,
p_event_seq_no		IN		oltbs_contract.latest_event_seq_no%type,
p_customer			IN		oltbs_contract.counterparty%TYPE,
p_product_type		IN		oltbs_contract.product_type%TYPE,
p_value_date		IN		date,
p_overdue_comp		IN		oltbs_amount_due_cs.component%type,
p_overdue_amt		IN		Number,
p_schedule_date	IN		oltbs_amount_due_cs.due_date%type,
p_list_of_new_comps	IN OUT	varchar2,
p_error_code		OUT	Varchar2
) Return Boolean;

FUNCTION fn_form_penal_slabs
(
p_processing_date		IN		date,
p_tab_rates		IN OUT			olpkss_schedules.ty_rate,
p_int_basis		IN			oltbs_contract_iccf_calc.iccf_calc_method%Type,
p_error_code		OUT			Varchar2
) Return Boolean;
--udaya starts
FUNCTION fn_write_penalrate_history (	p_contract_ref_no IN lftbs_contract_interest_detail.contract_ref_no%type,
		 				 													p_component	 			IN lftbs_contract_interest_detail.component%type,
		 			       											p_tab_rates 	 		IN olpkss_schedules.ty_rate,
							 												p_err_code				OUT Varchar2)
RETURN BOOLEAN;
--udaya ends
--11-APR-2012 Flexcube V.CL Release 7.11 FS Tag 07 Changes starts
FUNCTION Fn_penalty_wav_wavrev
		(
		p_contract_ref_no	IN	VARCHAR2,
		p_event_seq_no		IN	NUMBER,
		p_error_code		IN OUT	VARCHAR2,
		p_err_param		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION Fn_delete_backup
	(
	p_contract_ref_no	IN	VARCHAR2,
	p_penal_comp_only	IN	VARCHAR2,--21-JUN-2012 Flexcube V.CL Release 7.11 IUT SFR#107 CHANGES
	p_error_code		IN OUT	VARCHAR2,
	p_err_param		IN OUT	VARCHAR2	
	)
RETURN BOOLEAN;

FUNCTION Fn_backup
	(
	p_contract_ref_no	IN	VARCHAR2,
	p_penal_comp_only	IN	VARCHAR2,--21-JUN-2012 Flexcube V.CL Release 7.11 IUT SFR#107 CHANGES
	p_error_code		IN OUT	VARCHAR2,
	p_err_param		IN OUT	VARCHAR2	
	)
RETURN BOOLEAN;

FUNCTION Fn_restore
	(
	p_contract_ref_no	IN	VARCHAR2,
	p_penal_comp_only	IN	VARCHAR2,--21-JUN-2012 Flexcube V.CL Release 7.11 IUT SFR#107 CHANGES
	p_error_code		IN OUT	VARCHAR2,
	p_err_param		IN OUT	VARCHAR2	
	)
RETURN BOOLEAN;

--11-APR-2012 Flexcube V.CL Release 7.11 FS Tag 07 Changes ends

  FUNCTION fn_process_penalty_for_contract
(  
p_User_Id IN  smtbs_user.user_id%TYPE,
p_processing_branch IN  oltbs_contract.branch%TYPE,
p_module          IN  oltbs_contract.module_code%TYPE,
p_contract        IN  oltbs_contract.contract_ref_no%TYPE,
p_product       IN  oltbs_contract.product_code%TYPE,
p_processing_date   IN  DATE,
pm_msg_id          IN OUT VARCHAR2,
p_error_code      IN OUT  ertbs_msgs.err_code%TYPE
)
RETURN VARCHAR2;
g_cont_processing VARCHAR2(1);--PEN_25_Sep_2020 SOFR
--OBCL_14.4_PENALTY_Change_Dec start
g_rfr_simulate VARCHAR2(1);
g_rfr_PROCESSING_EVENT oltb_rfr_interest_master.processing_event%type;
--OBCL_14.4_PENALTY_Change_Dec end
G_VALUE_DATE_PEN DATE;---RFR_Penalty_Comp_Manual_Payment
G_MAT_DATE_PEN DATE;---RFR_Penalty_Comp_Manual_Payment
g_INIT_Liq_Bak_Sch Varchar2(1) := 'N';---SOFR_Bug#33040217_#6
G_PENL_PROCESSING_DATE         DATE; --$$ Bug#33563411 
TYPE Ty_Tb_contract_interest IS TABLE OF lftb_contract_interest%ROWTYPE; --Bug#34486053
g_derived_penal_calc VARCHAR2(1):='Y';--Bug#35303680
g_rfr_penal_schedule_date DATE;----Bug#35794531 ADDED
g_penal_comp lftb_contract_interest.component%type;----Bug#35794531 ADDED
END olpks_penalty;
/
Create or replace Synonym olpkss_penalty for olpks_penalty
/