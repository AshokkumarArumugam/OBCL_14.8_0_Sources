CREATE OR REPLACE PACKAGE lppks_vdbal  IS
/*-------------------------------------------------------------------------------------------------
**
** File Name	: lppks_vdbal.SPC
**
** Module	: LOANS SYNDICATION
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
**
--15-Sep-2006 FLEXCUBE V.CL Release 7.1 ITR1 SFR 23 - added function for consol roll
--19-Sep-2006 FLEXCUBE V.CL Release 7.1 ITR1 SFR 83 - added new fun for rollover FN_PARENT_PART_VDBAL_UPDATE
06-Oct-2006	FLEXCUBE V.CL Release 7.1 ITR2 SFR#6 Changes
		Declared the function FN_ROLL_TEMP_POPULATE in the spec so that it can be called from outside the package also.
--FLEXCUBE V.CL Release 7.2 Changes for Cascade Particpation from Y -> N
28-FEB-2007	FLEXCUBE V.CL RELEASE 7.2 unauth pram changes
		Function fn_populate_temp_partvdbal modified new argument added.
--FLEXCUBE V.CL RELEASE 7.2 unauth pram changes by nirupama 01-mar-07 ,change in function fn_populate_temp_partvdbal , fn_validate_participant
--FLEXCUBE V.CL Release 7.2 ITR1 SFR #14 Nirupama, 09-mar-2007
-- FLEXCUBE V.CL Release 7.2 ITR2 SFR#54 28-MAR-2007
03-Jul-2007 FLEXCUBE V.CL Release 7.3 NP Vami changes 
31-Mar-2008 FLEXCUBE V.CL Release 7.4 Swing line limit changes
	1) Modified the function fn_populate_temp_partvdbal and fn_validate_participant to include one more argument p_swing_line  
	2) Modified the function FN_BUILD_TEMP_AVAIL_BAL to include drawdown_ref_no
	3) Modified the function FN_PART_VALIDATE to include p_dd_contract_ref_no and p_swing_line
	
    Changed By         : Pallavi R
    Changed On         : 21-May-2022
    Change Reason      : CASC event is firing with unauthorized on VAMI of DD with NonProrata value as Y.
    Search String      : OBCL_14.5_SMTB_#34094340 Changes

        **Changed By         : Anusha k
    **Date               : 29-AUG-2023
    **Change Description : changes to update particpant balances for future dated rollover. Introduced a new procedure
							Pr_Insert_Rolldrdown, to insert data in participant VDBAL Detail for future dated rollovers
							(similar to borrower vdbal update)
    **Search String      : OBCL_14.6_#35713467 changes
	
	**Changed By         : Anusha k
    **Date               : 09-MAY-2024
    **Change Description : Changes to skip updating lbtb_gtemp_validate_part  
    **Search String      : OBCL_14.7_#36594390 changes
	
----------------------------------------------------------------------------------------------------
*/


g_Action VARCHAR2(50); --OBCL_14.5_SMTB_#34094340 Changes

TYPE t_vdbal_detail_table IS TABLE OF lbtbs_part_vdbal_detail%ROWTYPE INDEX BY BINARY_INTEGER;
tbl_all_vdbal_detail       	lppks_vdbal.t_vdbal_detail_table;
TYPE t_vdbal_master_table IS TABLE OF lbtbs_part_vdbal_master%ROWTYPE INDEX BY BINARY_INTEGER;
tbl_all_vdbal_master       	lppks_vdbal.t_vdbal_master_table;
TYPE 	t_temp_roll_details IS TABLE OF lbtb_gtemp_part_roll_details%ROWTYPE INDEX BY BINARY_INTEGER;
tbl_all_roll_details       	lppks_vdbal.t_temp_roll_details;

g_dr_vami_avail  varchar2(1);--OBCL_14.7_#36594390 changes

TYPE count_record IS RECORD
	(
  value_date Date ,
  Dr_amount  Number ,
  Cr_amount  Number
	);

FUNCTION FN_PART_VDBAL_UPDATE
( 	P_Borr_ref_No 	lbtbs_part_vdbal_master.contract_ref_no%type,
	P_Err_code	in out Varchar2,
	P_Err_param	in out Varchar2
)
RETURN BOOLEAN;

FUNCTION FN_PART_UPDATE_TO_UNPROCESSED
( 	P_tranche_ref_No lbtbs_part_vdbal_master.contract_ref_no%type,
	P_dd_ref_No lbtbs_part_vdbal_master.contract_ref_no%type,
	P_Err_code	in out Varchar2,
	P_Err_param	in out Varchar2
)
RETURN BOOLEAN;

FUNCTION FN_PART_UPDATE_TO_PROCESSED
( 	P_tranche_ref_No lbtbs_part_vdbal_master.contract_ref_no%type,
	P_dd_ref_No lbtbs_part_vdbal_master.contract_ref_no%type,
	P_Err_code	in out Varchar2,
	P_Err_param	in out Varchar2
)
RETURN BOOLEAN;

FUNCTION FN_DELETE
( 	P_Borr_ref_No 	lbtbs_part_vdbal_master.contract_ref_no%type,
	P_Err_code	in out Varchar2,
	P_Err_param	in out Varchar2
)
RETURN BOOLEAN;
--FLEXCUBE V.CL RELEASE 7.2 unauth pram changes by nirupama 01-mar-07 start 
/*FUNCTION fn_validate_participant(
					p_contract_ref_no IN lbtbs_part_vdbal_master.contract_ref_no%type,
					p_tranche_ref_no	IN lbtbs_part_vdbal_master.contract_ref_no%type,
					p_counterparty		IN lbtbs_part_vdbal_master.counterparty%type,
					p_asset_ratio			IN lbtbs_contract_participant.asset_ratio%type,
					p_value_date			IN DATE,
					p_maturity_date		IN DATE,
					p_amount					IN oltbs_contract_master.amount%type,
					p_err_code				OUT ertbs_msgs.err_code%TYPE,
					p_err_msg					OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION fn_populate_temp_partvdbal(
					p_contract_ref_no	IN lbtbs_part_vdbal_master.contract_ref_no%type,
					p_tranche_ref_no	IN lbtbs_part_vdbal_master.contract_ref_no%type,
					p_tranche_ccy			IN oltbs_contract_master.currency%type,
					p_dd_ccy					IN oltbs_contract_master.currency%type,
					p_value_date			IN lbtbs_part_vdbal_master.value_date%type,
					p_maturity_date		IN DATE,
					p_amount					IN oltbs_contract_master.amount%type,
					p_err_code				OUT ertbs_msgs.err_code%TYPE,
					p_err_msg					OUT VARCHAR2,
					p_exch_rate				IN lbtbs_vd_exchange_rate.exchange_rate%TYPE DEFAULT NULL,
					p_pram_esn				IN lbtbs_participant_transfer.event_seq_no%TYPE DEFAULT NULL,
					p_roll_esn				IN OLTB_CONTRACT_ROLLOVER.event_seq_no%TYPE DEFAULT NULL,
					p_CurrPram_SrNo			IN lbtws_transfer_master.entry_seq_no%TYPE DEFAULT NULL --FLEXCUBE V.CL RELEASE 7.2 unauth pram changes
					)
RETURN BOOLEAN ;*/
FUNCTION fn_populate_temp_partvdbal
(
p_contract_ref_no IN lbtbs_part_vdbal_master.contract_ref_no%type		,
p_value_date 	IN lbtbs_part_vdbal_master.value_date%type			,
p_err_code	OUT ertbs_msgs.err_code%TYPE					,
p_err_param	OUT VARCHAR2							,
p_amount	IN oltbs_contract_master.amount%type		  DEFAULT NULL	,
p_exfx_rate  	IN lbtbs_exrate_fixing_details.exchange_rate%type DEFAULT NULL,
P_dd_ccy        IN oltbs_contract_master.currency%type		  DEFAULT NULL,
P_balance IN VARCHAR2                                 DEFAULT 'BOTH'	,
p_entry_seq_no IN lbtws_transfer_master.entry_seq_no%TYPE DEFAULT NULL, --FLEXCUBE V.CL RELEASE 7.2 unauth pram changes
p_nonprorata_vami	IN VARCHAR2                                 DEFAULT 'N',  -- 03-Jul-2007 FLEXCUBE V.CL Release 7.3 NP Vami changes 
p_swing_line  IN oltbs_contract_master.swing_line%type DEFAULT 'N'			-- 31-Mar-2008 FLEXCUBE V.CL Release 7.4 Swing line limit changes
) RETURN BOOLEAN;
FUNCTION fn_validate_participant(
					p_contract_ref_no 	IN lbtbs_part_vdbal_master.contract_ref_no%type,
					p_tranche_ref_no	IN lbtbs_part_vdbal_master.contract_ref_no%type,
					p_counterparty		IN lbtbs_part_vdbal_master.counterparty%type,
					p_asset_ratio		IN lbtbs_contract_participant.asset_ratio%type,
					p_value_date		IN DATE,
					p_amount		IN oltbs_contract_master.amount%type,
          P_dd_ccy          	IN oltbs_contract_master.currency%type ,
					p_err_code		OUT ertbs_msgs.err_code%TYPE,
					p_err_msg		OUT VARCHAR2,
					p_exfx_rate  	IN lbtbs_exrate_fixing_details.exchange_rate%type DEFAULT NULL,
					p_swing_line  	IN oltbs_contract_master.swing_line%type DEFAULT 'N'	-- 31-Mar-2008 FLEXCUBE V.CL Release 7.4 Swing line limit changes
					)
RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.2 ITR1 SFR #14 Nirupama, 09-mar-2007 START
FUNCTION FN_COPY_PARTBAL
(
	P_contract_ref_no  in lbtbs_part_vdbal_master.contract_ref_no%type,
	p_value_date	  in date ,
	p_counterparty    in varchar2,
	p_balance	  in varchar2 ,
	P_Err_code	  in out Varchar2,
	P_Err_param	  in out Varchar2
)RETURN BOOLEAN;
FUNCTION FN_CALC_RATIO
(
	P_contract_ref_no in lbtbs_part_vdbal_master.contract_ref_no%type,
	P_value_date	  in date,
	P_counterparty    in varchar2,
	P_ESN		  in oltbs_contract_event_log.event_seq_no%type,
	P_Err_code	  in out Varchar2,
	P_Err_param	  in out Varchar2
)
RETURN BOOLEAN;
FUNCTION FN_COPY_RATIO
(
P_contract_ref_no in lbtbs_part_vdbal_master.contract_ref_no%type,
P_value_date	  in date,
P_counterparty    in varchar2,
P_ESN		  in oltbs_contract_event_log.event_seq_no%type,
P_asset_ratio 	  in out lbtbs_contract_participant.asset_ratio%type,
P_Err_code	  in out Varchar2,
P_Err_param	  in out Varchar2
   )
RETURN BOOLEAN;
FUNCTION FN_BUILD_TEMP_OS_BAL
(
	P_tranche_ref_no in lbtbs_part_vdbal_master.contract_ref_no%type,
	p_to_date	in date ,
	p_counterparty  in varchar2,
	p_serial_from     in number  ,
	p_serial_to     in number  ,
	P_Err_code	in out Varchar2,
	P_Err_param	in out Varchar2 ,
	p_amount  	IN oltbs_contract_master.amount%type DEFAULT NULL ,
	p_exfx_rate  	IN lbtbs_exrate_fixing_details.exchange_rate%type DEFAULT NULL
)
RETURN BOOLEAN;
FUNCTION FN_BUILD_TEMP_UTIL_BAL
(
	P_tranche_ref_no in lbtbs_part_vdbal_master.contract_ref_no%type,
	p_to_date	in date ,
	p_counterparty  in varchar2,
	p_serial_from     in number  ,
	p_serial_to     in number  ,
	P_Err_code	in out Varchar2,
	P_Err_param	in out Varchar2,
	p_amount  	IN oltbs_contract_master.amount%type DEFAULT NULL ,
	p_exfx_rate  	IN lbtbs_exrate_fixing_details.exchange_rate%type DEFAULT NULL
)
RETURN BOOLEAN;
FUNCTION FN_BUILD_TEMP_AVAIL_BAL
(
	P_tranche_ref_no in lbtbs_part_vdbal_master.contract_ref_no%type,
	p_to_date	in date ,
	p_counterparty  in varchar2,
	p_serial_from     in number  ,
	p_serial_to     in number  ,
	P_Err_code	in out Varchar2,
	P_Err_param	in out Varchar2,
	p_contract_ref_no IN lbtbs_part_vdbal_master.contract_ref_no%type DEFAULT NULL -- 31-Mar-2008 FLEXCUBE V.CL Release 7.4 Swing line limit changes
)
RETURN BOOLEAN;
FUNCTION FN_BUILD_TEMP_CURRLIMIT_BAL
(
	P_tranche_ref_no in lbtbs_part_vdbal_master.contract_ref_no%type,
	p_to_date	in date ,
	p_counterparty  in varchar2,
	p_serial_from     in number  ,
	p_serial_to     in number  ,
	P_Err_code	in out Varchar2,
	P_Err_param	in out Varchar2
)
RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.2 ITR1 SFR #14 Nirupama, 09-mar-2007 END
--FLEXCUBE V.CL RELEASE 7.2 unauth pram changes by nirupama 01-mar-07 end
--FLEXCUBE V.CL Release 7.1 ITR1 SFR 23 START
FUNCTION FN_ROLL_PART_VDBAL_UPDATE
(
P_borr_ref_no 		lbtbs_part_vdbal_master.contract_ref_no%type,
P_tranche_ref_no 	lbtbs_part_vdbal_master.contract_ref_no%type,
P_Err_code		in out Varchar2,
P_Err_param		in out Varchar2)
RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.1 ITR1 SFR 23 END
--FLEXCUBE V.CL Release 7.1 ITR1 SFR 84 START
FUNCTION FN_PARENT_PART_VDBAL_UPDATE
(
P_borr_ref_no 		lbtbs_part_vdbal_master.contract_ref_no%type,
P_tranche_ref_no 	lbtbs_part_vdbal_master.contract_ref_no%type,
P_Err_code		in out Varchar2,
P_Err_param		in out Varchar2)
RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.1 ITR1 SFR 84 START

--FLEXCUBE V.CL Release 7.1 ITR2 SFR#6 Changes start
FUNCTION FN_ROLL_TEMP_POPULATE
( 	P_Contract_ref_No 	In Varchar2,
	P_all_roll_details 	out t_temp_roll_details,
	P_Err_code		In out Varchar2,
	P_Err_param		In out Varchar2
)
RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.1 ITR2 SFR#6 Changes end
--FLEXCUBE V.CL Release 7.2 Changes for Cascade Particpation from Y -> N  Start 11122006
FUNCTION fn_build_part_vdbal
				 (p_contract_ref_no IN lbtbs_part_vdbal_master.contract_ref_no%TYPE,
				  p_contract_type		IN VARCHAR2,
				  p_esn							IN NUMBER,
				  p_process_date    IN DATE,
				  p_errcode					IN OUT VARCHAR2,
					p_errparam				IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION fn_revert_cascade
				 (p_contract_ref_no IN lbtbs_part_vdbal_master.contract_ref_no%type,
					p_tranche_ref_no	IN lbtbs_part_vdbal_master.contract_ref_no%type,
				  p_errcode					IN OUT VARCHAR2,
					p_errparam				IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION fn_build_for_pram_date
(
	p_contract_ref_no IN lbtbs_part_vdbal_master.contract_ref_no%type,
	p_contract_type	  IN VARCHAR2,
 	p_process_date    IN DATE,
	p_errcode	  IN OUT VARCHAR2,
	p_errparam	  IN OUT VARCHAR2
)
RETURN BOOLEAN ;
FUNCTION fn_part_vdbal_pram
				 (p_contract_ref_no IN lbtbs_part_vdbal_master.contract_ref_no%type,
				  p_process_date    		IN DATE,
				  p_errcode			IN OUT VARCHAR2,
				  p_errparam			IN OUT VARCHAR2)
RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.2 Changes for Cascade Particpation from Y -> N  end 11122006
--FLEXCUBE V.CL Release 7.2 ITR2 SFR#54 start
  FUNCTION FN_PART_VALIDATE
  (
  	P_contract_ref_no 	IN varchar2	, 
  	P_value_date 		IN date		,
  	P_Err_code		IN OUT varchar2	,
  	P_Err_param		IN OUT varchar2,
  	p_dd_contract_ref_no	IN oltbs_contract_master.contract_ref_no%type DEFAULT NULL , 	-- 31-Mar-2008 FLEXCUBE V.CL Release 7.4 Swing line limit changes
	p_swing_line  		IN  oltbs_contract_master.swing_line%type DEFAULT 'N'		-- 31-Mar-2008 FLEXCUBE V.CL Release 7.4 Swing line limit changes
  ) 
RETURN BOOLEAN;
--OBCL_14.6_#35713467 changes starts
 PROCEDURE Pr_Insert_Rolldrdown(p_Ref_No         VARCHAR2,
                                 p_Tranche_Ref_No VARCHAR2,
                                 P_PART_ID VARCHAR2,
                                 P_RATIO NUMBER,
                                 p_Balance_Type   VARCHAR2,
                                 p_Value_Date     DATE,
                                 p_Ccy            VARCHAR2);

PROCEDURE pr_insert_drawdown
    (p_ref_no  VARCHAR2
    ,p_tranche_ref_no  VARCHAR2
    ,P_PART_ID VARCHAR2
    ,p_balance_type  VARCHAR2
    ,p_value_date DATE
    ,p_ccy  VARCHAR2
    ,p_dr_turnover  NUMBER
    ,p_cr_turnover  NUMBER
    ,p_event  VARCHAR2
    ,p_esn  NUMBER
    );

END lppks_vdbal;
/
CREATE or replace SYNONYM lppkss_vdbal FOR lppks_vdbal
/