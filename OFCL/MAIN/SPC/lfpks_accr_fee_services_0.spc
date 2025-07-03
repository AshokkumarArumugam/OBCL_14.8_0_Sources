CREATE OR REPLACE PACKAGE lfpks_accr_fee_services_0 AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : lfpks_accr_fee_services_0.spc
**
** Module       : ICCF
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

04-SEP-2002 FCC4.1 OCT'2002 change - module code added

23-APR-2003 ITR2#1 	 Fcc4.2 OPS related changes.Added new function to populate the accrual processing table 
					 lftbs_accr_fee_detail with respect to the schedules definition maintained at the contract level
					 for accrual method --> Flat amount..One more function Fn_split_schedules to do the splitting of the 
					 schedules so that the user will not be able to change the schedule deinition for the schedules prior
					 to today..

31-JAN-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 FS VOL1 Tag10 Amortization Fee upload Changes
    **Changed By         : Chandra Achuta
    **Date               : 31-OCT-2022
    **Change Description : Added code for doing validation for the revelant ad-hoc fee component with fee amount greater than 0.
    **Search String      : BUG#34728031
*/

-------------------------------------------------------------------------------------------------------
g_fee_calc_end_date_change VARCHAR2(1):= 'N';   --BUG#34728031  Code Added
--ITR2#1 Fcc4.2 OPS related changes starts..
--31-JAN-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 FS VOL1 Tag10 Amortization Fee upload Changes start here

TYPE					v_schedule
IS TABLE OF				lftbs_contract_schedules%ROWTYPE
INDEX BY 				BINARY_INTEGER;	
--31-JAN-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 FS VOL1 Tag10 Amortization Fee upload Changes end here
FUNCTION Fn_create_schedules
	(
	 p_contract_ref_no	IN	   lftbs_contract_schedules.Contract_ref_no%TYPE,
	 p_component		IN     lftbs_contract_schedules.Component%TYPE,	
	 p_event_seq_no		IN	   lftbs_contract_schedules.Event_seq_no%TYPE,
	 p_product_type		IN	   oltbs_contract.Product_type%TYPE,
	 p_action_code		IN	   Varchar2,
	 p_schedule_sum		IN	   lftbs_contract_schedules.Amount%TYPE,
	 p_no_of_schedules	IN	   Number,	
	 p_err_code			IN OUT Varchar2,
	p_err_param		IN OUT Varchar2
	)RETURN BOOLEAN;

FUNCTION Fn_split_schedules
	(
	 p_contract_ref_no	IN	   lftbs_contract_schedules.Contract_ref_no%TYPE,
	 p_component		IN     lftbs_contract_schedules.Component%TYPE,	
	 p_event_seq_no		IN	   lftbs_contract_schedules.Event_seq_no%TYPE,
	 p_ammend_date		IN	   Date,	
	 p_err_code			IN OUT Varchar2,
	 p_err_param		IN OUT Varchar2
	)RETURN BOOLEAN;

FUNCTION Fn_backup_master
	(
	 p_contract_ref_no	IN		lftbs_accr_fee_master.Contract_ref_no%TYPE,
	 p_err_code		   	IN OUT	Varchar2,
	 p_err_param		IN OUT	Varchar2
	 )RETURN BOOLEAN ;

FUNCTION Fn_get_master_rec
			(
			 p_contract_ref_no	IN		lftbs_accr_fee_master.Contract_ref_no%TYPE,
			 p_component		IN		lftbs_accr_fee_master.Component%TYPE,
			 p_master_rec		OUT		lftbs_accr_fee_master%ROWTYPE,
			 p_err_code		   	IN OUT	Varchar2,
			 p_err_param		IN OUT	Varchar2
			 )
RETURN BOOLEAN;

--ITR2#1 Fcc4.2 OPS related changes ends..

FUNCTION fn_populate_contract_details
	(
	p_module				IN		oltbs_contract.module_code%TYPE, --FCC4.1 OCT'2002 change 
	p_contract_ref_no		IN		lftbs_contract_accr_fee.contract_ref_no%TYPE,
	p_event_seq_no			IN		lftbs_contract_accr_fee.event_seq_no%TYPE,
	p_version_no			IN		oltbs_contract_master.version_no%TYPE,
	p_action_code			IN		VARCHAR2,
	p_schedule_redef		IN 		VARCHAR2,
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	) RETURN BOOLEAN;

FUNCTION fn_process_for_VAMI
	(
	p_contract_ref_no			IN		lftbs_contract_accr_fee.contract_ref_no%TYPE,
	p_version_no			IN		oltbs_contract_master.version_no%TYPE,
	p_value_date			IN		DATE,
	p_maturity_date			IN		DATE,
	p_VAMI_type				IN		VARCHAR2,
	p_product_type			IN		oltbs_contract_master.product_type%TYPE,
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter			IN OUT	VARCHAR2
	) RETURN BOOLEAN;

--30-JAN-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 FS VOL1 Tag10 start here

FUNCTION fn_amort_fee_upload
	(
		p_contract_ref_no	IN 	lftbs_contract_schedules.contract_ref_no%TYPE
	,	p_component		IN	lftbs_contract_schedules.component%TYPE
	,	p_event_seq_no		IN 	NUMBER
	,	p_schedules		IN OUT	v_schedule
	,	p_action		IN 	VARCHAR2
	,	p_update		IN 	VARCHAR2
	,	p_error_code		IN OUT	VARCHAR2
	,	p_error_parameter	IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--30-JAN-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 FS VOL1 Tag10 end here
END lfpks_accr_fee_services_0;
/
CREATE or replace SYNONYM lfpkss_accr_fee_services_0 FOR lfpks_accr_fee_services_0
/