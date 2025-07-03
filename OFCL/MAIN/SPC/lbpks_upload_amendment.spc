CREATE OR REPLACE PACKAGE lbpks_upload_amendment AS

/*----------------------------------------------------------------------------------------------------
**
** File Name	: lbpks_upload_amendment.SPC
**
** Module		: UPLOAD
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

/*------------------------------------------CHANGE HISTORY----------------------------------
03-AUG-2007 FCC V.CL Release 7.3 Reprice changes
11-AUG-2007 FCC V.CL Release 7.3 Reprice changes
09-dec-2008 FLEXCUBE V.CL RELEASE 7.4, SLT CHANGES
09-JAN-2009, FLEXCUBE V.CL RELEASE 7.4 MTR2 SFR#71, select was writtening more than one row
03-Jun-2010 Flexcube V.CL 7.7 Vol3 FS Tag 5 Prepayment/Early Maturity changes
		New function added for firing the vami event as part of full prepayment
27-JUL-2010 FLEXCUBE V.CL Release 7.7 Vol2 FS Tag07 floor and ceiling changes
		added a package level variable
27-JUL-2010 FLEXCUBE V.CL Release 7.7 Vol2 FS Tag07 floor and ceiling changes, added a package level variable
24-JUL-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 RETRO CITIUS#19045 changes,First Time Buy back cases should be marking active drawdown as liquidated if there is zero balance on the drawdown.
05-JUN-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 RETRO CITIUS#19746 150080-9355, Defensive fix to compare asset ratio and component ratio

08-JAN-2020 OBCL_14.4#SLT Sub Participation Changes
------------------------------------------CHANGE HISTORY ENDS----------------------------------
*/

g_call_from_upload		VARCHAR2(1)	:= 'N';--27-JUL-2010 FLEXCUBE V.CL Release 7.7 Vol2 FS Tag07 floor and ceiling changes
g_source_code			oltbs_upload_amend_due.source_code%TYPE := '';--OBCL_14.4#SLT Sub Participation Changes

PROCEDURE pr_vamiupld_error
	(
	p_ext_contract_row		IN   oltbs_upload_amend_due%ROWTYPE,
	p_err_code			IN   VARCHAR2,
	p_err_type			IN   VARCHAR2,
	p_err_params			IN   VARCHAR2
	);

FUNCTION fn_upload_an_amendment
(	p_error_code		IN OUT	VARCHAR2
,	p_error_parameter	IN OUT	VARCHAR2
,	p_reprice_txn			IN	VARCHAR2 DEFAULT 'N'-- FCC V.CL Release 7.3 Reprice changes
)
RETURN BOOLEAN;

--Maneeha added, starts, FLEXCUBE V.CL RELEASE 7.4, SLT CHANGES
FUNCTION fn_upload_an_amendment
		(
		p_contract_ref_no	IN	VARCHAR2,
		p_value_date		IN	DATE,
		p_amendment_seq_no	IN	VARCHAR2,
		p_branch_code		IN 	VARCHAR2,
		p_source_code		IN 	VARCHAR2,
		p_error_code		IN OUT	VARCHAR2,
		p_error_parameter	IN OUT	VARCHAR2
		)
RETURN BOOLEAN;
--Maneeha added, ends, FLEXCUBE V.CL RELEASE 7.4, SLT CHANGES

FUNCTION fn_validate_contract
	(
	p_user_ref_no			IN	oltbs_contract.user_ref_no%TYPE
	,p_uploaded_status		IN	oltbs_contract.auth_status%TYPE
	,p_contract_record		OUT	oltbs_contract%ROWTYPE
	,p_contract_master_record	OUT	oltbs_contract_master%ROWTYPE
	,p_error_code			IN OUT	VARCHAR2
	,p_error_parameter		IN OUT	VARCHAR2
	,p_source_code			IN VARCHAR2-- FCC V.CL Release 7.3 Reprice changes
	)
RETURN BOOLEAN;

FUNCTION fn_obtain_amendment_lock
	(
	p_source_code			IN	oltbs_upload_amend_due.source_code%TYPE
	,p_branch_code			IN	oltbs_upload_amend_due.branch_code%TYPE
	,p_user_ref_no			IN	oltbs_upload_amend_due.contract_ref_no%TYPE
	,p_upload_ref_no		IN	oltbs_upload_amend_due.user_ref_no%TYPE --09-JAN-2009, FLEXCUBE V.CL RELEASE 7.4 MTR2 SFR#71, select was writtening more than one row added
	,p_amendment_seq_no		IN	oltbs_upload_amend_due.amendment_seq_no%TYPE
	,p_record_lock_obtained		IN OUT	BOOLEAN
	,p_error_code			IN OUT	VARCHAR2
	,p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_vamiupload_subsystem_pickup
	(
	p_contract_ref_no	IN	oltbs_contract.CONTRACT_REF_NO%TYPE,
	p_value_date		IN	DATE,
	p_amount		IN	oltbs_contract_master.amount%type,
	p_vami_amount		IN	lbtbs_tranche_vdbal_detail.closing_balance%type,
	p_currency		IN	oltbs_contract_master.currency%type,
	p_vamb_esn		IN	oltbs_contract_amend_due.event_seq_no%type,
	p_module_code		IN	oltbs_contract_master.module%type,
	p_counterparty		IN	oltbs_contract_master.counterparty%type,
	p_error_code		IN OUT	VARCHAR2,
	p_error_params		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_validate_amend_due
	(
	p_contract_record		IN	oltbs_contract%ROWTYPE
	,p_contract_master_record	IN	oltbs_contract_master%ROWTYPE
	,p_value_date			IN	DATE
	,p_differential_amount		IN	lbtbs_contract_amend_due.differential_amount%TYPE
	,p_lcy_differential_amount	IN	lbtbs_contract_amend_due.lcy_differential_amount%TYPE
	,p_new_credit_line		IN	lbtbs_contract_amend_due.new_credit_line%TYPE
	,p_new_maturity_date		IN	DATE
	,p_new_revolving_flag		IN	lbtbs_contract_amend_due.new_revolving_flag%TYPE
	,p_principal_changed		OUT	BOOLEAN
	,p_maturity_changed		OUT	BOOLEAN
	,p_amend_due_record		OUT	oltbs_contract_amend_due%ROWTYPE
	,p_error_code			IN OUT	VARCHAR2
	,p_error_parameter		IN OUT	VARCHAR2
	,p_source_code			IN	VARCHAR2 -- FCC V.CL Release 7.3 Reprice changes
	)
RETURN BOOLEAN;

FUNCTION fn_process_for_a_contract
	(
		p_upload_id			IN	oltbs_upload_log_cs.upload_id%TYPE
	,	p_source_code			IN	oltbs_upload_amend_due.source_code%TYPE
	,	p_branch_code			IN	oltbs_upload_amend_due.branch_code%TYPE
	,	p_user_ref_no           	IN	oltbs_upload_amend_due.contract_ref_no%TYPE
	,	p_upload_ref_no			IN	oltbs_upload_amend_due.user_ref_no%TYPE --09-JAN-2009, FLEXCUBE V.CL RELEASE 7.4 MTR2 SFR#71, select was writtening more than one row added
	,	p_amendment_seq_no		IN	oltbs_upload_amend_due.amendment_seq_no%TYPE
	,	p_value_date             	IN	DATE
	,	p_differential_amount    	IN 	oltbs_upload_amend_due.differential_amount%TYPE
	,	p_lcy_differential_amount	IN	oltbs_upload_amend_due.lcy_differential_amount%TYPE
	,	p_new_credit_line        	IN	oltbs_upload_amend_due.new_credit_line%TYPE
	,	p_new_maturity_date      	IN	DATE
	,	p_new_revolving_flag     	IN	oltbs_upload_amend_due.new_revolving_flag%TYPE
	,	p_amendment_rowid		IN	ROWID
	,	p_uploaded_status		IN	cotms_source_pref.uploaded_status%TYPE
	,	p_on_error			IN	cotms_source_pref.on_error%TYPE
	,	p_on_override			IN	cotms_source_pref.on_override%TYPE
	,	p_uploaded_auth			IN OUT	oltbs_upload_log_cs.uploaded_auth%TYPE
	,	p_uploaded_unauth		IN OUT	oltbs_upload_log_cs.uploaded_unauth%TYPE
	,	p_uploaded_hold			IN OUT	oltbs_upload_log_cs.uploaded_hold%TYPE
	,	p_rejected			IN OUT	oltbs_upload_log_cs.rejected%TYPE
	,	p_error_code			IN OUT	VARCHAR2
	,	p_error_parameter		IN OUT	VARCHAR2
	,	p_reprice_txn			IN	VARCHAR2 DEFAULT 'N'-- FCC V.CL Release 7.3 Reprice changes
	)
RETURN BOOLEAN;
--03-Jun-2010 Flexcube V.CL 7.7 Vol3 FS Tag 5 Prepayment/Early Maturity changes starts
FUNCTION fn_fire_prepaymentvami
	(
		p_contract_ref_no		IN	oltbs_contract_master.contract_ref_no%TYPE
	,	p_value_date			IN	oltbs_contract_master.value_date%TYPE
	,       p_maturity_date			IN	oltbs_contract_master.value_date%TYPE
	,	p_error_code			IN OUT	VARCHAR2
	,	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--03-Jun-2010 Flexcube V.CL 7.7 Vol3 FS Tag 5 Prepayment/Early Maturity changes ends

--03-JUN-2014 CITIUS#19045 changes start
FUNCTION fn_check_dd_os_bal
	(
	p_agency_ref_no			IN 	oltbs_contract.contract_ref_no%type,
	p_value_date			IN	DATE,
	p_err_code				IN OUT	VARCHAR2,
	p_err_params			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--03-JUN-2014 CITIUS#19045 changes end
--************CITIUS#19746,150080-9355 Starts
FUNCTION fn_validate_tranche_comp_ratio
		(
	p_contract_ref_no 		IN oltbs_contract_master.contract_ref_no%type,
	p_value_date			IN	DATE,
	p_err_code			IN OUT	VARCHAR2,
	p_err_param			IN OUT	VARCHAR2
		)
RETURN BOOLEAN;		
--************CITIUS#19746,150080-9355 Ends
END lbpks_upload_amendment;
/
CREATE or replace SYNONYM lbpkss_upload_amendment for lbpks_upload_amendment
/