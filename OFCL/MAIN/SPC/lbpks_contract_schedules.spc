CREATE OR REPLACE PACKAGE lbpks_contract_schedules
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lbpks_contract_schedules.SPC
**
** Module		: LS
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
31-MAR-2003 FCC 4.2 APR 2003 CITIPLC DEVELOPMENT REQUIREMENTS
	NEW PACKAGE FOR NON-REVOLVING TRANCHE SCHEDULE MAINTENANCE....
*/
------------------------------------------------------------------------------------------------------



---------------------------------------------------------------------------------------------

TYPE ty_schedule_date is TABLE of date
	INDEX BY BINARY_INTEGER;

FUNCTION fn_create_schedules
(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_seq_no			IN		lbtms_tranche_schedule_master.SEQUENCE_NO%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
) RETURN BOOLEAN;

function fn_compute_schedule_dates
(
	p_start_date 		in date,
	p_value_date 		in date,
	p_maturity_date 		in date,
	p_holiday_ccy 		in Varchar2,
	p_frequency 		in Varchar2,
	p_frequency_units 	in number,
	p_no_of_schedules 	in number,
	p_ignore_holiday 		in Varchar2,
	p_forward_backward 	in Varchar2,
	p_move_across_month 	in Varchar2,
	p_cascade_movement 	in Varchar2,
	p_ty_schedule_date 	in out ty_schedule_date,
	p_holiday_check   	in  char,
	p_holiday_chk_failed 	OUT boolean,
	p_error_code 		OUT Varchar2,
	p_facility_ccy   		in Varchar2  := '',
	p_contract_ccy   		in Varchar2  := '',
	p_local_ccy   		in Varchar2  := ''
) return boolean;

function fn_get_next_schedule_date
(
	p_source_date 	in date,
	p_frequency 	in Varchar2,
	p_frequency_units in number
) return date ;

function fn_get_final_schedule_date
(
	p_source_date 		in 	 date,
	p_holiday_ccy 		in 	 Varchar2,
	p_ignore_holiday 		in 	 Varchar2,
	p_forward_backward 	in 	 Varchar2,
	p_move_across_month 	in 	 Varchar2,
	p_value_date 		in 	 date,
	p_maturity_date 		in 	 date,
	p_schedule_date 		in out Date,
	p_holiday_check  		in 	 char,
	p_holiday_chk_failed 	OUT 	 boolean,
	p_error_code 		out 	 Varchar2,
	p_facility_ccy 		in 	 varchar2 := null,
	p_contract_ccy 		in 	 varchar2 := null,
	p_local_ccy 		in 	 varchar2 := null
) return boolean;

FUNCTION fn_process_prepayment
(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_seq_no			IN		lbtms_tranche_schedule_master.SEQUENCE_NO%TYPE,
	p_from_date			IN		lbtms_tranche_schedule_master.value_date%type,
	p_prepayment_method	IN		lbtms_tranche_schedule_master.prepayment_method%type,
	p_prepayment_amt		IN		lbtms_tranche_schedule_master.PREPAYMENT_AMOUNT%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
) RETURN BOOLEAN;

END lbpks_contract_schedules;
/
CREATE or replace SYNONYM lbpkss_contract_schedules FOR lbpks_contract_schedules
/