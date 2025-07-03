CREATE OR REPLACE PACKAGE lfpks_adhoc_fee_event
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lfpks_adhoc_fee_event.SPC
**
** Module		: LN
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

/* Change history
21-JAN-2003 FCC4.2 APR 2003 CITIPLC DEVELOPMENT REQUIREMENTS
	THIS PACKAGE IS USED FOR LS MODULE AND CATERS TO ADHOC FEE RELATED PROCESSING FOR CONTRACTS, 
	NOTICES AS WELL AS  ADVICES, AND ACCOUNTING ROLE AND AMOUNT TAG RELATED SETUP
12-APR-2003 FCC 4.2 APR 2003 LS changes -- changed the spec for notice adv function
08-MAY-2003 FCC 4.3 Aug 2003 changes for internal SFR #253
10-Dec-2009 FLEXCUBE V.CL Release 7.6 PBG SITERETRO,24-aug-2009 CITIPBG TILL#202 added by sudhakar for conversion and month end indicator
     **Changed By         : Kavitha N
     **Date               : 03-Jan-2020
     **Change Description : Changes done for Finnacial Centre Holiday Treatment
     **Search String      : OBCL 14.4 Financial Centre based holiday treatment Changes
 Changed By         : Janki
  Changed On         : 19-dec-2021  
  Change Reason      : Changes done to appky holiday preferences to paybydate
  Search String      : 33687482_paybydate_hol_pref
*/



TYPE ty_schedule_date is TABLE of date
	INDEX BY BINARY_INTEGER;

FUNCTION fn_populate_amount_tag
	(
	p_module					IN		oltms_class.MODULE%TYPE,
	p_class_code				IN 		oltms_class.class_code%TYPE,
	p_error_code				IN OUT	VARCHAR2,
	p_error_parameter				IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;

FUNCTION fn_populate_accrole
	(
	p_module					IN		oltms_class.MODULE%TYPE,
	p_class_code				IN 		oltms_class.class_code%TYPE,
	p_error_code				IN OUT	VARCHAR2,
	p_error_parameter				IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;

-------------------------------ADHOC FEE RELATED PROCEDURES AND FUNCTIONS START------------------------------------

FUNCTION fn_new
(
	p_module   			IN		oltbs_contract.module_Code%TYPE,  
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2,
	p_process_type	IN	  VARCHAR2 := ''
) RETURN BOOLEAN;

FUNCTION fn_save
(
	p_contract_record	     IN oltbs_contract%ROWTYPE,
	p_settlement_processed IN VARCHAR2,
	p_error_code	     IN OUT	VARCHAR2,
	p_error_parameter	     IN OUT	VARCHAR2,
	p_process_type	IN	  VARCHAR2 := ''
) RETURN BOOLEAN;

FUNCTION fn_save_for_hliq
(
	p_contract_ref_no	IN	 oltbs_contract.contract_ref_no%TYPE,
	p_event_seq_no	IN	 oltbs_contract.latest_event_seq_no%TYPE,
	p_value_date	IN	 lftbs_contract_adhoc_fee.value_date%TYPE,
	p_settlement_processed IN VARCHAR2,
	p_error_code	IN OUT VARCHAR2,
	p_error_parameter	IN OUT VARCHAR2
) RETURN BOOLEAN;

FUNCTION fn_amend
(
	p_module   		IN	 oltbs_contract.module_Code%TYPE, 
	p_contract_ref_no	IN	 lftbs_contract_adhoc_fee.contract_ref_no%TYPE,
	p_error_code	IN OUT VARCHAR2,
	p_error_parameter	IN OUT VARCHAR2,
	p_process_type	IN	  VARCHAR2 := ''
) RETURN BOOLEAN;

FUNCTION fn_authorise
(
	p_contract_ref_no	IN	 oltbs_contract.contract_ref_no%TYPE,
	p_event_seq_no	IN	 oltbs_contract.latest_event_seq_no%TYPE,
	p_value_date	IN	 lftbs_contract_adhoc_fee.value_date%TYPE,
	p_error_code	IN OUT VARCHAR2,
	p_error_parameter	IN OUT VARCHAR2
) RETURN BOOLEAN;

FUNCTION fn_delete_contract
(
	p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
	p_version_no      IN oltbs_contract.latest_version_no%TYPE,
	p_error_code	IN OUT VARCHAR2,
	p_error_parameter	IN OUT VARCHAR2,
	p_process_type	IN	  VARCHAR2 := ''
) RETURN BOOLEAN;

FUNCTION fn_reverse
(
	p_module 		IN	 oltbs_contract.module_Code%TYPE, 
	p_contract_ref_no	IN	 oltbs_contract.contract_ref_no%TYPE,
	p_event_seq_no	IN	 lftbs_contract_adhoc_fee.event_seq_no%TYPE,
	p_error_code	IN OUT VARCHAR2,
	p_error_parameter	IN OUT VARCHAR2
) RETURN BOOLEAN;

PROCEDURE pr_append
(
	p_reference_string IN		VARCHAR2,
	p_value		 IN	  	VARCHAR2,
	p_string		 IN OUT 	VARCHAR2
);

FUNCTION fn_register_a_event
(
	p_module					IN	      oltbs_contract.MODULE_CODE%TYPE,
	p_contract_ref_no				IN		oltbs_contract.contract_ref_no%TYPE,
	p_event_code				IN		oltbs_contract.curr_event_code%TYPE,
	p_new_version_indicator			IN		oltbs_contract_event_log.new_version_indicator%TYPE,
	p_value_date				IN		DATE,
	p_contract_status				IN		oltbs_contract.contract_status%TYPE,
	p_auth_status				IN		VARCHAR2,
	p_reversed_event_seq_no			IN		oltbs_contract.latest_event_seq_no%TYPE,
	p_latest_esn				OUT		oltbs_contract.latest_event_seq_no%TYPE,
	p_latest_version_no			OUT		oltbs_contract.latest_version_no%TYPE,
	p_error_code				IN OUT	VARCHAR2,
	p_error_parameter				IN OUT	VARCHAR2
) RETURN BOOLEAN;

FUNCTION fn_build_tags_for_save
(
	p_contract_ref_no		IN	 oltbs_contract.contract_ref_no%TYPE,
	p_event_seq_no   		IN	 lftbs_contract_adhoc_fee.event_seq_no%TYPE,
	p_list_of_amount_tags	OUT	 VARCHAR2,
	p_list_of_amount_ccys	OUT	 VARCHAR2,
	p_list_of_amounts		OUT	 VARCHAR2,
	p_error_code		IN OUT VARCHAR2,
	p_error_parameter		IN OUT VARCHAR2
) RETURN BOOLEAN;

FUNCTION fn_obtain_contract_lock
(
	p_contract_ref_no		IN			oltbs_contract.contract_ref_no%TYPE,
	p_record_lock_obtained	OUT			BOOLEAN,
	p_error_code		IN OUT		VARCHAR2,
	p_error_parameter		IN OUT		VARCHAR2
)RETURN BOOLEAN;

FUNCTION fn_process_settlement
(
	p_module		IN     oltbs_contract.module_code%TYPE,  
      p_contract_ref_no IN     oltbs_contract.contract_ref_no%TYPE,
	p_event_seq_no   	IN     lftbs_contract_adhoc_fee.event_seq_no%TYPE,
	p_product_code    IN     oltbs_contract.product_code%TYPE,
	p_counterparty	IN	 oltbs_contract.counterparty%TYPE,
	p_settlement_from	IN	 VARCHAR2,
	p_error_code	IN OUT VARCHAR2,
	p_error_parameter	IN OUT VARCHAR2
) RETURN BOOLEAN;

FUNCTION fn_process_batch
(
	p_branch		IN	 oltms_branch.BRANCH_CODE%TYPE,
	p_value_date	IN	 lftbs_contract_adhoc_fee.value_date%TYPE,
	p_commit_freq	IN	 NUMBER,
	p_error_code	IN OUT VARCHAR2,
	p_error_parameter	IN OUT VARCHAR2
) RETURN BOOLEAN;

FUNCTION fn_create_schedules
(
	p_module   			IN		oltbs_contract.module_Code%TYPE,  
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_event_seq_no		IN		oltbs_contract.latest_Event_seq_no%type,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
) RETURN BOOLEAN;
--10-Dec-2009 FLEXCUBE V.CL Release 7.6 PBG SITERETRO,24-aug-2009 CITIPBG TILL#202 added by sudhakar for conversion and month end indicator starts
function fn_compute_schedule_dates
(
	p_start_date 		in 		date,
	p_value_date 		in 		date,
	p_maturity_date 		in 		date,
	p_holiday_ccy 		in 		varchar2,
	p_frequency 		in 		varchar2,
	p_frequency_units 	in 		number,
	p_no_of_schedules 	in 		number,
	p_ignore_holiday 		in 		varchar2,
	p_forward_backward 	in 		varchar2,
	p_move_across_month 	in 		varchar2,
	p_cascade_movement 	in 		varchar2,
	p_ty_schedule_date 	in out 	ty_schedule_date,
	p_holiday_check        	in          char,
	p_holiday_chk_failed 	out 		boolean,
	p_error_code 		out 		Varchar2
       ,p_Fc_List          IN VARCHAR2 DEFAULT NULL --OBCL 14.4 Financial Centre based holiday treatment Changes
) return boolean ;
--10-Dec-2009 FLEXCUBE V.CL Release 7.6 PBG SITERETRO,24-aug-2009 CITIPBG TILL#202 added by sudhakar for conversion and month end indicator ends
function fn_compute_schedule_dates
(
	p_start_date 		in 		date,
	p_value_date 		in 		date,
	p_maturity_date 		in 		date,
	p_holiday_ccy 		in 		varchar2,
	p_frequency 		in 		varchar2,
  	p_month_end_ind IN VARCHAR2,--10-Dec-2009 FLEXCUBE V.CL Release 7.6 PBG SITERETRO,24-aug-2009 CITIPBG TILL#202 added by sudhakar for conversion and month end indicator
	p_frequency_units 	in 		number,
	p_no_of_schedules 	in 		number,
	p_ignore_holiday 		in 		varchar2,
	p_forward_backward 	in 		varchar2,
	p_move_across_month 	in 		varchar2,
	p_cascade_movement 	in 		varchar2,
	p_ty_schedule_date 	in out 	ty_schedule_date,
	p_holiday_check        	in          char,
	p_holiday_chk_failed 	out 		boolean,
	p_error_code 		out 		Varchar2
       ,p_Fc_List          IN VARCHAR2 DEFAULT NULL --OBCL 14.4 Financial Centre based holiday treatment Changes
	    ,p_pay_by_days     IN NUMBER DEFAULT 0 --33687482_paybydate_hol_pref
) return boolean ;

function fn_get_next_schedule_date
(
	p_source_date 	in date,
	p_frequency 	in Varchar2,
	p_frequency_units in number
) return date ;

function fn_get_final_schedule_date
(
	p_source_date 		in		date,
	p_holiday_ccy 		in		varchar2,
	p_ignore_holiday		in		varchar2,
	p_forward_backward	in		varchar2,
	p_move_across_month	in		varchar2,
	p_value_date		in		date,
	p_maturity_date		in		date,
	p_schedule_date 		in out 	date,
	p_holiday_check		in    	char,
	p_holiday_chk_failed	out		boolean,
	p_error_code 		out 		varchar2
       --OBCL 14.4 Financial Centre based holiday treatment Changes- Starts
        ,p_Fc_List           IN VARCHAR2 DEFAULT NULL
       --OBCL 14.4 Financial Centre based holiday treatment Changes- Ends
) return boolean ;

FUNCTION fn_populate_due
(
	p_branch		IN	 oltms_branch.BRANCH_CODE%TYPE,
	p_value_date	IN	 lftbs_contract_adhoc_fee.value_date%TYPE,
	p_commit_freq	IN	 NUMBER,
	p_error_code	IN OUT VARCHAR2,
	p_error_parameter	IN OUT VARCHAR2
) RETURN BOOLEAN;

FUNCTION fn_ADHOC_FEE_NOTC
(
	/*module_proc_cur IN OUT olpkss_messaging.MODULE_PROC_CURTYPE*/ -- FCC 4.2 LS changes
	module_proc_cur IN OUT oltbs_dly_msg_out%ROWTYPE -- FCC 4.2 LS changes 

) RETURN BOOLEAN;
----FCC 4.3 Aug 2003 changes for internal SFR #253
FUNCTION FN_GEN_PART_ADHOC_LIQD
(
	cur IN OUT oltbs_dly_msg_out%ROWTYPE
)RETURN BOOLEAN;

FUNCTION FN_GEN_ADHOC_LIQD
(
	cur IN OUT oltbs_dly_msg_out%ROWTYPE
)RETURN BOOLEAN;
-----FCC 4.3 Aug 2003 changes for internal SFR #253

-------------------------------ADHOC FEE RELATED PROCEDURES AND FUNCTIONS END-----------------------------------------


-------------------------------------------------------------------------------------------

END lfpks_adhoc_fee_event;
/
CREATE or replace SYNONYM lfpkss_adhoc_fee_event FOR lfpks_adhoc_fee_event
/