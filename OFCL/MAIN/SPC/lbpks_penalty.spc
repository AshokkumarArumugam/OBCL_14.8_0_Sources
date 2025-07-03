CREATE OR REPLACE PACKAGE lbpks_penalty AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lbpks_penalty.SPC
**
** Module		: LOANS SYNDICATION
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

11-APR-2006	FLEXCUBE V.CL  Release 7.0,added by piyush for penalty component processing.
11-APR-2012 Flexcube V.CL Release 7.11 FS Tag 07 Changes - Grace Periods for loan activity and account for late charges	

	**Changed By         : Arunprasath
	**Date               : 22-Aug-2022
	**Change Description : Added record type Ty_Tb_contract_interest 
	**Search String      : Bug#34486053
	
	
	 **Changed By         : Anusha K
    **Changed On         : 13-Feb-2023
    **Change Reason      : added new identifier
    **Search String      : OBCL_14.6_#35042197 CHANGES
    
    **Changed By         : Mohan Pal
    **Changed On         : 04-Apr-2023
    **Change Reason      : adding a global variable to track processing date
    **Search String      : Bug#35242743
	
  **Changed By         : Sudharshini Balaji
  **Date               : 10-Nov-2023
  **Change Description : Added new function to call from Java for LS Penalty
  **Search String      : Bug#35917178_5
  

*/


 process_next_contract   EXCEPTION;  --OBCL_14.6_#35042197 CHANGES

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

FUNCTION fn_process_for_a_contract
(
p_contract_ref_no			IN	oltbs_contract.contract_ref_no%TYPE,
p_processing_date			IN	date,
p_authorization_status	IN	oltbs_contract.auth_status%TYPE,
p_handoff_action_code	IN	char,
p_error_code				IN OUT	ertbs_msgs.err_code%TYPE,
p_esn				IN	oltbs_contract.latest_event_seq_no%TYPE DEFAULT NULL --11-APR-2012 Flexcube V.CL Release 7.11 FS Tag 06 Changes
)
RETURN boolean;

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
p_esn				IN	oltbs_contract.latest_event_seq_no%TYPE DEFAULT NULL --11-APR-2012 Flexcube V.CL Release 7.11 FS Tag 06 Changes
)
RETURN boolean;


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
p_processing_date		IN			date,
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


--11-APR-2006	FLEXCUBE V.CL  Release 7.0,added by piyush for penalty component processing.

	FUNCTION FN_PART_PENALTY_PROPAGATION(
					p_ref_no 		 IN lftbs_contract_interest_master.contract_ref_no%Type,
					p_particpant_ref_no  IN lftbs_contract_interest_master.contract_ref_no%Type,
					p_component 	       IN lftbs_contract_interest_master.component%Type,
					p_effective_date	 IN Date,
					p_err_code		OUT varchar2,
					p_err_param		OUT varchar2
						    )
	RETURN BOOLEAN;
--11-APR-2006	FLEXCUBE V.CL  Release 7.0,added by piyush for penalty component processing.

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
	p_error_code		IN OUT	VARCHAR2,
	p_err_param		IN OUT	VARCHAR2	
	)
RETURN BOOLEAN;

FUNCTION Fn_backup
	(
	p_contract_ref_no	IN	VARCHAR2,
	p_error_code		IN OUT	VARCHAR2,
	p_err_param		IN OUT	VARCHAR2	
	)
RETURN BOOLEAN;

FUNCTION Fn_restore
	(
	p_contract_ref_no	IN	VARCHAR2,
	p_error_code		IN OUT	VARCHAR2,
	p_err_param		IN OUT	VARCHAR2	
	)
RETURN BOOLEAN;

--Bug#35917178_5 changes starts 
--This FUNCTION would be invoked FROM JAVA layer
  FUNCTION fn_process_penalty_for_contract(p_User_Id           IN smtbs_user.user_id%TYPE,
                                         p_Processing_Branch IN Oltbs_Contract.Branch%TYPE,
                                         p_Module            IN Oltbs_Contract.Module_Code%TYPE,
                                         p_contract          IN oltbs_contract.contract_ref_no%TYPE,
                                         p_Product           IN Oltbs_Contract.Product_Code%TYPE,
                                         p_Processing_Date   IN DATE,
                                         pm_msg_id           IN OUT VARCHAR2,
                                         p_Error_Code        IN OUT Ertbs_Msgs.Err_Code%TYPE)
    RETURN VARCHAR2 ;
--Bug#35917178_5 changes ends 	
--11-APR-2012 Flexcube V.CL Release 7.11 FS Tag 07 Changes ends
g_processing_date DATE;---Bug#35242743 ADDDED
g_cont_processing VARCHAR2(1);--PEN_25_Sep_2020 SOFR
--OBCL_14.4_PENALTY_Change_Dec start
g_rfr_simulate VARCHAR2(1);
g_rfr_processing_event oltb_rfr_interest_master.processing_event%type;
g_action_code_pen_cal varchar2(10);
--OBCL_14.4_PENALTY_Change_Dec end
G_VALUE_DATE_PEN DATE;--OBCL_Support_14.5_LS_Penalty
G_MAT_DATE_PEN DATE;--OBCL_Support_14.5_LS_Penalty
TYPE Ty_Tb_contract_interest IS TABLE OF lftb_contract_interest%ROWTYPE; --Bug#34486053
END lbpks_penalty;
/
Create or replace Synonym lbpkss_penalty for lbpks_penalty
/