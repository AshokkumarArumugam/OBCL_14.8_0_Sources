CREATE OR REPLACE PACKAGE lfpks_fee_accr
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : lfpks_fee_accr.SPC
**
** Module       : CF
This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/

/* Change History - Start
FCC 4.6.2 -- Package created to do fee accrual

22-DEC-2006 FLEXCUBE V.CL Release 7.2 FAS91 Fee Related Changes
			Added the function fn_adjust_during_vami and fn_restore_fas91_fee_accr
10-MAR-2011 CITILS10G00538 changes - Enabling agency fee accrual - changes were taken from 7.7 baseline which includes following SFR's -
15-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG SITERETRO, 12-AUG-2009 CITIPBG TILL#441 CHANGES : Changes made to display the amount due till the limit date and not the previous schedule date
15-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG SITERETRO, 16-OCT-2009 CITIPBG TILL#255 Added overloaded function fn_calculate_till_date_accrual as the one used in LDACCR for interest. 
										For showing the correct dues in feeliq screen.

Change History - End
---------------------------------------------------------------------------------------------------
*/


sbf_feeacr_reversal VARCHAR2(1);--OBCL_14.5_STAND_BY_FEE
Type fee_accr_hist_tbl Is Table Of LFTB_FEE_ACCR_HIST%Rowtype Index By Binary_Integer;
Type fee_accr_mast_tbl Is Table Of LFTB_FEE_ACCR_MASTER%Rowtype Index By Binary_Integer;	

Function fn_fee_accrual
	(
	p_module			IN		oltbs_contract.module_code%Type,
	p_branch			IN		oltms_branch.branch_code%Type,
	p_product			IN		oltbs_contract.product_code%Type,
	p_processing_date		IN		Date,
	p_commit_frequency	IN		oltbs_automatic_process_master.bod_commit_count%Type,
	p_error_code		IN OUT	Varchar2,
	p_error_parameter		IN OUT	Varchar2
	)
	Return Boolean;

FUNCTION fn_process_for_product
	(
	p_module			IN		oltbs_contract.module_code%Type,
	p_branch			IN		oltms_branch.branch_code%Type,
	p_product			IN		oltbs_contract.product_code%Type,
	p_processing_date		IN		Date,
	p_commit_frequency	IN		oltbs_automatic_process_master.eod_commit_count%Type,
	p_error_code		IN OUT	Varchar2,
	p_error_parameter		IN OUT	Varchar2
	)
	Return Boolean;

FUNCTION fn_process_for_contract
	(
	p_cstb_contract_rec	IN		oltbs_contract%Rowtype,
	p_processing_date		IN		Date,
	p_fee_collection_mode	IN		lftbs_contract_fee.fee_collection_mode%Type,
	p_handoff_action_code	IN		Varchar2,
	p_accrual_to_date		IN		DATE, --FLEXCUBE V.CL Release 7.1 ITR2 SFR#50 Fix 
	p_acc_lookup		IN		olpkss_accounting.tbl_lookup,
	p_pass_entry		IN		Boolean,
	p_ins_log               OUT         Boolean,
	p_error_code		IN OUT	Varchar2,
	p_error_parameter		IN OUT	Varchar2
	)
	Return Boolean;

FUNCTION fn_accrue_backdated_schedules
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%Type,
	p_fee_collection_mode	IN		lftbs_contract_fee.fee_collection_mode%Type,
	p_error_code		IN OUT	Varchar2,
	p_error_parameter		IN OUT	Varchar2
	)
	Return Boolean;
--FLEXCUBE V.CL Release 7.1 ITR2 SFR#50 Fix Starts
FUNCTION fn_accrue_during_fliq
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_fee_collection_mode		IN		lftbs_contract_fee.fee_collection_mode%TYPE,
	p_processing_date		IN		Date,
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.1 ITR2 SFR#50 Fix Ends
--22-DEC-2006 FLEXCUBE V.CL Release 7.2 FAS91 Fee Related Changes starts
FUNCTION fn_adjust_during_vami
	(
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	p_processing_date	IN	DATE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter	IN OUT 	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_restore_fas91_fee_accr
	(
	p_contract_Ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter	IN OUT 	VARCHAR2
	)
RETURN BOOLEAN;
--15-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG SITERETRO, 12-AUG-2009 CITIPBG TILL#441 CHANGES starts here
FUNCTION fn_calculate_till_date_accrual
		(	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE
		,	p_calc_start_date	IN	DATE
		,	p_calc_end_date		IN	DATE
		,	p_component		IN	lftbs_contract_fee.component%TYPE
		,	p_component_currency		IN	lftbs_contract_fee.component_ccy%TYPE
		,	p_accrual_to_date	IN	DATE
		,	p_till_date_accrual	OUT	lftbs_fee_accr_master.till_date_accrual%TYPE
		,	p_error_code		IN OUT	VARCHAR2
		,	p_error_parameter	IN OUT VARCHAR2
		)
RETURN BOOLEAN;
--15-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG SITERETRO, 12-AUG-2009 CITIPBG TILL#441 CHANGES ends here
--15-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG SITERETRO, 16-OCT-2009 CITIPBG TILL#255 changes starts here
FUNCTION fn_calculate_till_date_accrual
		(	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE
		,	p_contract_value_date	IN	DATE
		,	p_component		IN	lftbs_contract_fee.component%TYPE
		,	p_component_currency		IN	lftbs_contract_fee.component_ccy%TYPE
		,	p_accrual_to_date	IN	DATE
		,	p_till_date_accrual	OUT	lftbs_fee_accr_master.till_date_accrual%TYPE
		,	p_error_code		IN OUT	VARCHAR2
		,	p_error_parameter	IN OUT VARCHAR2
		)
RETURN BOOLEAN;
--15-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG SITERETRO, 16-OCT-2009 CITIPBG TILL#255 changes ends here
--22-DEC-2006 FLEXCUBE V.CL Release 7.2 FAS91 Fee Related Changes ends
END lfpks_fee_accr;
/
Create OR REPLACE Synonym lfpkss_fee_accr for lfpks_fee_accr
/