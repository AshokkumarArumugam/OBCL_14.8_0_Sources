CREATE OR REPLACE PACKAGE olpks_accrual_0
AS
/*------------------------------------------------------------------------------------------------------------------------
**
** File Name	: olpks_accrual_0.SPC
**
** Module		: DISCOUNT ACCRUAL
This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
---------------------------------------------------------------------------------------------------------------
*/
/*-----------------------------------------------------------------------------------------------------------------------
CHANGE HISTORY

Date			Version		FCC Version		Site		Description
08-OCT-2003		1.0			4.4			BANGALORE	Initial Version for CEEMEA IAS39 CHanges

19-Dec-2003		--FCC 4.4 DEC 2003 ITR1 SFR 575..
			--Function And Parameters added to calc refund amount without passing entries.
08-NOV-2004  FCC 4.6.1 JAN 2005 EIM Enhancements changes - New function to update discount accrual table during contract reversal		 
									   Modified	 fn_get_refund_amount.
									   
16-NOV-2004  FCC 4.6.1 JAN 2005 EIM Enhancements changes
		 Made fn_contract_level_updates from private to public

02-Jan-2005 FCC 4.6.1 JAN 2005 EIM Enhancements changes - Changes related to pycycm processing for yacr		 
- FCC 4.6.1 JAN 2005 ITR-1 SFR-196 For changing copyright clause / release name
01-APR-2009 FCC V.CL Release 7.5 Lot1 ITR2 SFR#5 <Discount Accrual Changes>
	Added one more parameter in fn_get_net_disc_accr ,p_processing_date as Total disc to be accrued was wrong when there is backvalue dated mutliple fee components
	
 Changed by         : Krithika G
 Change Description : OBCL 14.0 Batch Changes
 Search String      : OBCL_14.0_EOD_Changes

---------------------------------------------------------------------------------------------------------------
*/
FUNCTION fn_periodic_accrual
	(
	p_branch_code		IN		oltbs_contract.branch%TYPE,
	p_application_date	IN		DATE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
------------------------------------------------------------------------------------------------------------------------
FUNCTION fn_process_product_accrual
	(
	p_module_code			IN		oltbs_contract.module_code%TYPE,
	p_product_code			IN		oltbs_contract.product_code%TYPE,
	p_branch_code			IN		oltbs_contract.branch%TYPE,
	p_processing_date			IN		DATE,
	p_accrual_to_date			IN		DATE,
	p_accrual_level			IN		oltms_branch_parameters.accrual_level%TYPE,
	p_commit_frequency		IN		OLTBS_COMMITFREQ.eod_commit_count%TYPE,
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
------------------------------------------------------------------------------------------------------------------------
FUNCTION fn_process_contract_accrual
	(
	p_branch_code			IN		oltbs_contract.branch%TYPE,
	p_module_code			IN		oltbs_contract.module_code%TYPE,
	p_product_code			IN		oltbs_contract.product_code%TYPE,
	p_contract_ref_no			IN 		oltbs_contract.contract_ref_no%TYPE,
	p_contract_ccy			IN		oltbs_contract.contract_ccy%TYPE,
	p_current_event_seq_no		IN		oltbs_contract.latest_event_seq_no%TYPE,
	p_contract_value_date		IN		DATE,
	p_payment_method			IN		oltbs_contract_master.payment_method%TYPE,
	p_accr_to_date			IN		DATE,
	p_processing_date			IN		DATE,
	p_denominator_dcount_method	IN		oltms_class_ccy_pref.denom_dcount_method%TYPE,
	p_numerator_dcount_method	IN		oltms_class_ccy_pref.numer_dcount_method%TYPE,
	p_datbs_contract_disc_rec	IN		oltbs_contract_disc%ROWTYPE,
	p_accrual_level			IN		oltms_branch_parameters.accrual_level%TYPE,
	p_stop_accruals			IN		oltms_product_status_master.stop_accruals%TYPE,
	p_user_defined_status		IN		oltbs_contract_master.user_defined_status%TYPE,
	p_mode				IN		VARCHAR2,	--FCC 4.4 DEC 2003 ITR1 SFR 575
	p_new_old				IN		VARCHAR2,	--FCC 4.4 DEC 2003 ITR1 SFR 575
	p_acc_lookup			IN OUT	olpkss_accounting.tbl_lookup,
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter			IN OUT	VARCHAR2,
	-- 02-JAN-2005 FCC 4.6.1 JAN 2005 EIM Enhancements changes starts
	p_pnlhist_ind			IN		VARCHAR2 DEFAULT 'N'
	-- 02-JAN-2005 FCC 4.6.1 JAN 2005 EIM Enhancements changes ends		
	)
RETURN BOOLEAN;
------------------------------------------------------------------------------------------------------------------------
FUNCTION fn_get_net_disc_accr
	(
	p_branch_code			IN		oltbs_contract.branch%TYPE,
	p_module_code			IN		oltbs_contract.module_code%TYPE,
	p_contract_ref_no			IN 		oltbs_contract.contract_ref_no%TYPE,
	p_contract_ccy			IN		oltbs_contract.contract_ccy%TYPE,
	p_contract_value_date		IN		DATE,
	p_payment_method			IN		oltbs_contract_master.payment_method%TYPE,
	p_accr_to_date			IN		DATE,
	p_processing_date		IN	DATE,--01-APR-2009 FCC V.CL Release 7.5 Lot1 ITR2 SFR#5 <Discount Accrual Changes>
	p_denominator_dcount_method	IN		oltms_class_ccy_pref.denom_dcount_method%TYPE,
	p_numerator_dcount_method	IN		oltms_class_ccy_pref.numer_dcount_method%TYPE,
	p_xirr_rate				IN 		lftbs_contract_interest.rate%TYPE,
	p_datbs_contract_disc_rec	IN		oltbs_contract_disc%ROWTYPE,
	p_new_old				IN		VARCHAR2, -- FCC 4.4 DEC 2003 ITR1 SFR 575
	p_net_accr_int_to_date		OUT		NUMBER,
	p_present_value			OUT		NUMBER,
	p_os_principal			OUT		NUMBER,
	p_accrd_int_in_contract_ccy	OUT		NUMBER,
	p_total_discount_tba		OUT		NUMBER,
	p_till_date_disc_accrd		OUT		NUMBER,
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
------------------------------------------------------------------------------------------------------------------------
FUNCTION fn_handle_foreclosure
	(
	p_module_code		IN		oltbs_contract.module_code%TYPE,
	p_product_code		IN		oltbs_contract.product_code%TYPE,
	p_branch_code		IN		oltbs_contract.branch%TYPE,	
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_effective_date		IN		DATE,
	p_contract_ccy		IN		oltbs_contract.contract_ccy%TYPE,
	p_contract_value_date	IN		DATE,
	p_payment_method		IN		oltbs_contract_master.payment_method%TYPE,
	p_user_defined_status	IN		oltbs_contract_master.user_defined_status%TYPE,
	p_refund_amount		OUT		NUMBER,
	p_latest_event_seq_no	IN OUT	oltbs_contract.latest_event_seq_no%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
------------------------------------------------------------------------------------------------------------------------
FUNCTION fn_reverse_contract_accrual
	(
	p_branch_code			IN		oltbs_contract.branch%TYPE,
	p_module_code			IN		oltbs_contract.module_code%TYPE,
	p_product_code			IN		oltbs_contract.product_code%TYPE,
	p_contract_ref_no			IN 		oltbs_contract.contract_ref_no%TYPE,
	p_contract_ccy			IN		oltbs_contract.contract_ccy%TYPE,
	p_current_event_seq_no		IN		oltbs_contract.latest_event_seq_no%TYPE,
	p_contract_value_date		IN		DATE,
	p_payment_method			IN		oltbs_contract_master.payment_method%TYPE,
	p_handoff_event_code		IN		oltbs_event.event_code%TYPE,
	p_accr_to_date			IN		DATE,
	p_processing_date			IN		DATE,
	p_denominator_dcount_method	IN		oltms_class_ccy_pref.denom_dcount_method%TYPE,
	p_numerator_dcount_method	IN		oltms_class_ccy_pref.numer_dcount_method%TYPE,
	p_datbs_contract_disc_rec	IN		oltbs_contract_disc%ROWTYPE,
	p_user_defined_status		IN		oltbs_contract_master.user_defined_status%TYPE,
	p_acc_lookup			IN OUT	olpkss_accounting.tbl_lookup,
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
------------------------------------------------------------------------------------------------------------------------
--FCC 4.4 DEC 2003 ITR1 SFR 575

FUNCTION	fn_get_refund_amount
	(
	p_module_code			IN		oltbs_contract.module_code%TYPE,
	p_product_code			IN		oltbs_contract.product_code%TYPE,
	p_branch_code			IN		oltbs_contract.branch%TYPE,	
	p_contract_ref_no			IN		oltbs_contract.contract_ref_no%TYPE,
	p_effective_date			IN		DATE,
	p_contract_ccy			IN		oltbs_contract.contract_ccy%TYPE,
	p_contract_value_date		IN		DATE,
	p_payment_method			IN		oltbs_contract_master.payment_method%TYPE,
	p_user_defined_status		IN		oltbs_contract_master.user_defined_status%TYPE,
	p_refund_amount			OUT		NUMBER,
	p_latest_event_seq_no		IN OUT	oltbs_contract.latest_event_seq_no%TYPE,
	p_acq_type				OUT		oltms_prod_disc_accr.acq_type%TYPE, --FCC 4.6.1 JAN 2005 EIM Enhancements changes
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
------------------------------------------------------------------------------------------------------------------------

--FCC 4.6.1 JAN 2005 EIM Enhancements changes start

FUNCTION fn_reverse_contract_disc_accr
	(
	p_contract_ref_no			IN 		oltbs_contract.contract_ref_no%TYPE,
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_contract_level_updates
	(
	p_contract_ref_no			IN		oltbs_contract.contract_ref_no%TYPE,
	p_current_event_seq_no		IN		oltbs_contract.latest_event_seq_no%TYPE,
	p_mode				IN		VARCHAR2,	
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

--FCC 4.6.1 JAN 2005 EIM Enhancements changes end
-- 02-JAN-2005 FCC 4.6.1 JAN 2005 EIM Enhancements changes starts
FUNCTION fn_reverse_previous_yacr
	(
	p_branch_code				IN		oltbs_contract.branch%TYPE,
	p_module_code				IN		oltbs_contract.module_code%TYPE,
	p_contract_ref_no				IN 		oltbs_contract.contract_ref_no%TYPE,
	p_contract_ccy				IN		oltbs_contract.contract_ccy%TYPE,
	p_contract_value_date			IN		DATE,
	p_payment_method				IN		oltbs_contract_master.payment_method%TYPE,
	p_accr_to_date				IN		DATE,
	p_denominator_dcount_method		IN		oltms_class_ccy_pref.denom_dcount_method%TYPE,
	p_numerator_dcount_method		IN		oltms_class_ccy_pref.numer_dcount_method%TYPE,
	p_xirr_rate					IN 		lftbs_contract_interest.rate%TYPE,
	p_datbs_contract_disc_rec		IN		oltbs_contract_disc%ROWTYPE,
	p_new_old					IN		VARCHAR2,
	p_mode					IN		VARCHAR2,
	p_current_event_seq_no			IN		oltbs_contract.latest_event_seq_no%TYPE,
	p_product_code				IN		oltbs_contract.product_code%TYPE,
	p_processing_date				IN		DATE,
	p_user_defined_status			IN		oltbs_contract_master.user_defined_status%TYPE,
	p_acc_lookup				IN OUT	olpkss_accounting.tbl_lookup,
	p_error_code				OUT		VARCHAR2,
	p_error_parameter				OUT		VARCHAR2
	)	
RETURN BOOLEAN;
-- 02-JAN-2005 FCC 4.6.1 JAN 2005 EIM Enhancements changes ends

--OBCL_14.0_EOD_Changes
FUNCTION fn_process_cont_accrual
  (
  p_branch_code      IN    oltbs_contract.branch%TYPE,
  p_module_code      IN    oltbs_contract.module_code%TYPE,
  p_product_code      IN    oltbs_contract.product_code%TYPE,
  p_contract_ref_no      IN     oltbs_contract.contract_ref_no%TYPE,
  p_contract_ccy      IN    oltbs_contract.contract_ccy%TYPE,
  p_current_event_seq_no    IN    oltbs_contract.latest_event_seq_no%TYPE,
  p_contract_value_date    IN    DATE,
  p_payment_method      IN    oltbs_contract_master.payment_method%TYPE,
  p_accr_to_date      IN    DATE,
  p_processing_date      IN    DATE,
  p_denominator_dcount_method  IN    oltms_class_ccy_pref.denom_dcount_method%TYPE,
  p_numerator_dcount_method  IN    oltms_class_ccy_pref.numer_dcount_method%TYPE,
  p_datbs_contract_disc_rec  IN    oltbs_contract_disc%ROWTYPE,
  p_accrual_level      IN    oltms_branch_parameters.accrual_level%TYPE,
  p_stop_accruals      IN    oltms_product_status_master.stop_accruals%TYPE,
  p_user_defined_status    IN    oltbs_contract_master.user_defined_status%TYPE,
  p_mode        IN    VARCHAR2,  --  FCC 4.4 DEC 2003 ITR1 SFR 575
  p_new_old        IN    VARCHAR2,  --   FCC 4.4 DEC 2003 ITR1 SFR 575
  p_acc_lookup      IN OUT  olpkss_accounting.tbl_lookup,
  p_error_code      IN OUT  VARCHAR2,
  p_error_parameter      IN OUT  VARCHAR2,
  -- 02-JAN-2005 FCC 4.7 DEC 2004 EIM Enhancements changes starts
  p_pnlhist_ind      IN    VARCHAR2 DEFAULT 'N'
  -- 02-JAN-2005 FCC 4.7 DEC 2004 EIM Enhancements changes ends
  )
RETURN BOOLEAN;

FUNCTION fn_close_contract_accrual
  (
  p_branch_code      IN    oltbs_contract.branch%TYPE,
  p_module_code      IN    oltbs_contract.module_code%TYPE,
  p_product_code      IN    oltbs_contract.product_code%TYPE,
  p_contract_ref_no      IN     oltbs_contract.contract_ref_no%TYPE,
  p_contract_ccy      IN    oltbs_contract.contract_ccy%TYPE,
  p_current_event_seq_no    IN    oltbs_contract.latest_event_seq_no%TYPE,
  p_contract_value_date    IN    DATE,
  p_payment_method      IN    oltbs_contract_master.payment_method%TYPE,
  p_accr_to_date      IN    DATE,
  p_processing_date      IN    DATE,
  p_denominator_dcount_method  IN    oltms_class_ccy_pref.denom_dcount_method%TYPE,
  p_numerator_dcount_method  IN    oltms_class_ccy_pref.numer_dcount_method%TYPE,
  p_datbs_contract_disc_rec  IN    oltbs_contract_disc%ROWTYPE,
  p_user_defined_status    IN    oltbs_contract_master.user_defined_status%TYPE,
  p_mode        IN    VARCHAR2,  -- FCC 4.4 DEC 2003 ITR1 SFR 575
  p_acc_lookup      IN OUT  olpkss_accounting.tbl_lookup,
  p_error_code      IN OUT  VARCHAR2,
  p_error_parameter      IN OUT  VARCHAR2
  )
RETURN BOOLEAN;

FUNCTION  fn_cont_level_updates
  (
  p_contract_ref_no    IN    oltbs_contract.contract_ref_no%TYPE,
  p_current_event_seq_no  IN    oltbs_contract.latest_event_seq_no%TYPE,
  p_mode      IN    VARCHAR2,  -- FCC 4.4 DEC 2003 ITR1 SFR 575 ..Parameter Addition
  p_error_code    IN OUT  VARCHAR2,
  p_error_parameter    IN OUT  VARCHAR2
  )
RETURN BOOLEAN;

FUNCTION fn_handle_foreclosure_batch
  (
  p_module_code    IN    oltbs_contract.module_code%TYPE,
  p_product_code    IN    oltbs_contract.product_code%TYPE,
  p_branch_code    IN    oltbs_contract.branch%TYPE,
  p_contract_ref_no    IN    oltbs_contract.contract_ref_no%TYPE,
  p_effective_date    IN    DATE,
  p_contract_ccy    IN    oltbs_contract.contract_ccy%TYPE,
  p_contract_value_date  IN    DATE,
  p_payment_method    IN    oltbs_contract_master.payment_method%TYPE,
  p_user_defined_status  IN    oltbs_contract_master.user_defined_status%TYPE,
  p_refund_amount    OUT    NUMBER,
  p_latest_event_seq_no  IN OUT  oltbs_contract.latest_event_seq_no%TYPE,
  p_auth_stat           IN VARCHAR2,
  p_error_code    IN OUT  VARCHAR2,
  p_error_parameter    IN OUT  VARCHAR2
  )
RETURN BOOLEAN;
--OBCL_14.0_EOD_Changes Ends

END olpks_accrual_0;
/
CREATE or replace SYNONYM olpkss_accrual_0 FOR olpks_accrual_0
/