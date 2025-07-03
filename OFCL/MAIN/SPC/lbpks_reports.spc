CREATE OR REPLACE package lbpks_reports
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : lbpks_reports.SPC
**
** Module       : LS
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
/*change history
  25-MAR-2003 FCC4.2 APR2003 RELEASE : Create the package for LS Reports.
*/

FUNCTION fn_party_drawdown_Contrib
		(
		p_Is_All			IN	varchar2,
		pBrFacilityContractRefNo	IN	oltbs_contract.contract_ref_no%TYPE,
		pBrTrancheContractRefNo		IN	oltbs_contract.contract_ref_no%TYPE,
		pBrDrawdownContractRefNo	IN	oltbs_contract.contract_ref_no%TYPE,
		pBrDrawdownNo	IN	NUMBER,
		p_Keystring	IN OUT	lbtw_rpt_party_ddown_master.Keystring%TYPE,
		pErrorCode	IN OUT	VARCHAR2,
		pErrorParams	IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION fn_populate_transfer_amt
(
	p_branch	IN	VARCHAR2,
	p_from_date	IN	DATE,
	p_to_date	IN	DATE,
	p_Keystring	IN OUT	lbtws_rpt_transfer_amt.Keystring%type	,
	p_err_code	IN OUT	VARCHAR2,
	p_err_param	IN OUT	VARCHAR2
)RETURN BOOLEAN;

FUNCTION fn_populate_user_operation
(
	p_Is_All	IN	varchar2,
	p_branch	in	varchar2,
	p_user_type	in	varchar2,
	p_user_id	in	varchar2,
	p_from_date	IN	DATE,
	p_to_date	IN	DATE,
	p_Keystring	IN OUT	lbtw_rpt_usr_operation.Keystring%type	,
	p_err_code	IN OUT	VARCHAR2,
	p_err_param	IN OUT	VARCHAR2
)RETURN BOOLEAN;

FUNCTION fn_populate_user_operation
(
	p_branch	in	varchar2,
	p_user_type	in	varchar2,
	p_user_id	in	varchar2,
	p_from_date	IN	DATE,
	p_to_date	IN	DATE,
	p_Keystring	IN OUT	lbtw_rpt_usr_operation.Keystring%type	,
	p_err_code	IN OUT	VARCHAR2,
	p_err_param	IN OUT	VARCHAR2
)RETURN BOOLEAN;

FUNCTION fn_party_tran_contrib
(
	p_tran_ref_no	IN	oltbs_contract.contract_ref_no%type,
	p_branch_code	IN	varchar2,
	p_Keystring	IN OUT	lbtw_rpt_usr_operation.Keystring%type	,
	p_err_code	IN OUT	VARCHAR2,
	p_err_param	IN OUT	VARCHAR2
)RETURN BOOLEAN;

FUNCTION fn_party_tran_contrib
(
	p_Is_All	IN	varchar2,
	p_tran_ref_no	IN	oltbs_contract.contract_ref_no%type,
	p_branch_code	IN	varchar2,
	p_Keystring	IN OUT	lbtw_rpt_usr_operation.Keystring%type	,
	p_err_code	IN OUT	VARCHAR2,
	p_err_param	IN OUT	VARCHAR2
)RETURN BOOLEAN;

FUNCTION fn_commitment_fee_due
(
	p_tran_ref_no	IN	oltbs_contract.contract_ref_no%type,
	p_branch_code	IN	varchar2,
	p_from_date	IN	Date,
	p_to_date	IN	Date,
	p_Keystring	IN OUT	lbtw_commit_fee_due_master.Keystring%type	,
	p_err_code	IN OUT	VARCHAR2,
	p_err_param	IN OUT	VARCHAR2
)RETURN BOOLEAN;

FUNCTION fn_commitment_fee_due
(
	p_Is_All	IN	varchar2,
	p_tran_ref_no	IN	oltbs_contract.contract_ref_no%type,
	p_branch_code	IN	varchar2,
	p_from_date	IN	Date,
	p_to_date	IN	Date,
	p_Keystring	IN OUT	lbtw_commit_fee_due_master.Keystring%type	,
	p_err_code	IN OUT	VARCHAR2,
	p_err_param	IN OUT	VARCHAR2
)RETURN BOOLEAN;

FUNCTION fn_commitment_fee_paid
(
	p_tran_ref_no	IN	oltbs_contract.contract_ref_no%type,
	p_branch_code	IN	varchar2,
	p_from_date	IN	Date,
	p_to_date	IN	Date,
	p_Keystring	IN OUT	lbtw_rpt_usr_operation.Keystring%type	,
	p_err_code	IN OUT	VARCHAR2,
	p_err_param	IN OUT	VARCHAR2
)RETURN BOOLEAN;

FUNCTION fn_commitment_fee_paid
(
	p_Is_All	IN	varchar2,
	p_tran_ref_no	IN	oltbs_contract.contract_ref_no%type,
	p_branch_code	IN	varchar2,
	p_from_date	IN	Date,
	p_to_date	IN	Date,
	p_Keystring	IN OUT	lbtw_rpt_usr_operation.Keystring%type	,
	p_err_code	IN OUT	VARCHAR2,
	p_err_param	IN OUT	VARCHAR2
)RETURN BOOLEAN;

FUNCTION fn_facility_volume
(
	p_branch_code	IN	varchar2,
	p_admin_id	in	OLTM_ADMINISTRATOR.admin_id%type,
	p_from_date	IN	Date,
	p_to_date	IN	Date,
	p_Keystring	IN OUT	lbtw_fac_vol_details.Keystring%type	,
	p_err_code	IN OUT	VARCHAR2,
	p_err_param	IN OUT	VARCHAR2
)RETURN BOOLEAN;

FUNCTION fn_participant_facility
(
	p_branch_code	IN	varchar2,
	p_party_no	IN	lbtw_party_fac_detail.party_no%TYPE,
	p_Keystring	IN OUT	lbtw_party_fac_detail.Keystring%type	,
	p_err_code	IN OUT	VARCHAR2,
	p_err_param	IN OUT	VARCHAR2
)RETURN BOOLEAN;

FUNCTION fn_participant_facility
(
	p_is_all	in	varchar2,
	p_branch_code	IN	varchar2,
	p_party_no	IN	lbtw_party_fac_detail.party_no%TYPE,
	p_Keystring	IN OUT	lbtw_party_fac_detail.Keystring%type,
	p_err_code	IN OUT	VARCHAR2,
	p_err_param	IN OUT	VARCHAR2
)RETURN BOOLEAN;

FUNCTION fn_facility_utilization
(
	p_is_all		IN	varchar2,
	p_facility_ref_no	IN	oltbs_contract.contract_ref_no%type,
	p_branch_code	IN	varchar2,
	p_Keystring		IN OUT	lbtw_rpt_usr_operation.Keystring%type	,
	p_err_code		IN OUT	VARCHAR2,
	p_err_param		IN OUT	VARCHAR2
)RETURN BOOLEAN;

FUNCTION fn_facility_utilization
(
	p_facility_ref_no	IN	oltbs_contract.contract_ref_no%type,
	p_branch_code	IN	varchar2,
	p_Keystring		IN OUT	lbtw_rpt_usr_operation.Keystring%type,
	p_err_code		IN OUT	VARCHAR2,
	p_err_param		IN OUT	VARCHAR2
)RETURN BOOLEAN;

FUNCTION fn_borrower_facility
(
	p_is_all		IN	varchar2,
	p_facility_ref_no	IN	oltbs_contract.contract_ref_no%type,
	p_branch_code	IN	varchar2,
	p_Keystring		IN OUT	lbtw_rpt_usr_operation.Keystring%type	,
	p_err_code		IN OUT	VARCHAR2,
	p_err_param		IN OUT	VARCHAR2
)RETURN BOOLEAN;

FUNCTION fn_drawdown_interest_due
(
	p_is_all		IN	varchar2,
	p_due_settle    IN  varchar2,
	p_drawdown_ref_no	IN	oltbs_contract.contract_ref_no%type,
	p_branch_code	IN	varchar2,
	p_Keystring		IN OUT	lbtw_rpt_usr_operation.Keystring%type	,
	p_err_code		IN OUT	VARCHAR2,
	p_err_param		IN OUT	VARCHAR2
)RETURN BOOLEAN;

FUNCTION fn_drawdown_interest_due
(
	p_due_settle    IN  varchar2,
	p_drawdown_ref_no	IN	oltbs_contract.contract_ref_no%type,
	p_branch_code	IN	varchar2,
	p_Keystring		IN OUT	lbtw_rpt_usr_operation.Keystring%type,
	p_err_code		IN OUT	VARCHAR2,
	p_err_param		IN OUT	VARCHAR2
)RETURN BOOLEAN;

End lbpks_reports;
/
CREATE or replace SYNONYM lbpkss_reports FOR lbpks_reports
/