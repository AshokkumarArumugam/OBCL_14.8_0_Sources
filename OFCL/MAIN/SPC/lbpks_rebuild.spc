CREATE OR REPLACE PACKAGE lbpks_rebuild
AS
/*-----------------------------------------------------------------------------------
**
** File Name	: lbpks_rebuild.SPC
** Module	: LOAN SYNDICATION
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
-------------------------------------------------------------------------------------
*/
/*
please maintain change history here
This package is being written to do the following
1. Rebuild borrower vdbal and log the inconsistancy in lstbs_vdbal_incorrect_master and lstbs_vdbal_incorrect_detail
2. Rebuild participant amount_due through propagation from borrower amount_due, amount_paid and participant_ratio tables
3. Rebuild participant vdbal and log the inconsistancy
4. what this package will not do:
	recalculate fee, 
	payables and recievables, 
	pass accounting entries, 
	rebuild schedules
5. following tables should be inshape for borrower vdbal rebuild to work
	1. ldtbs_contract master for tranche and drawdown
	2. lbtbs_tranche_redn_sch for tranche 
	3. oltbs_contract_amend_due for tranche and drawdown
	4. oltbs_amount_due for drawdown
	5. oltbs_amount_paid_ld for drawdown
	6. oltbs_contract_preference for tranche and drawdown
	7. oltbs_contract for tranche and drawdown
	8. lbtbs_vd_exchange_rate for drawdown
	9. lftbs_contract_interest_master for drawdown
	10. oltbs_contract_split_rollover for drawdown
	11. lbtbs_contract_consol_detail for drawdown
	12. lbtbs_contract_consol_master for drawdown
	13. oltbs_roll_contract_details for drawdown
	14. lbtbs_drawdown_schedule for drawdown
	15. oltbs_contract_rollover for drawdown

brief scope of the functions
FUNCTION fn_rebuild
	1.will accept the in parameters  for 
	  branche code,the things to be rebuilt i,e borrower vdbal,propogation required, participant vdbal
	2.it will accept the date from which user wants to rebuilt these things
	3.default value for the rebuild will be 'Y' and branche and date will be null
	4.if branche code is passed null then function starts rebuilding the contracts for all the branches
	  by calling the function fn_rebuild_a_contract
RETURN boolean;

FUNCTION fn_rebuild_a_contract
	1.will accept the contract_ref_nos under the branche 
	2.it will accept the date from which it has to rebuild otherwise
	   it will select the value date for the respective tranche or dd
        3.it will call the function fn_rebuild_borrower_vdbal to rebuild the borrower vdbal 
 	  based on the borrower rebuild flag
	4.propogation master is updated for the components of the contract ref no 
	  based on the propogation reqd flag and part vdbal flag
        5.will call the fn_participant to build the participant vdbal master and detail for propogation
	  and participant related processing	
RETURN boolean;

FUNCTION fn_rebuild_borrower_vdbal
	1.this will call lbpks_vdbal.fn_recalc_vdbal for the rebuilding the borrower vdbal master and detail tables
RETURN boolean;

FUNCTION fn_rebuild_backup
	1.this will be called from fn_rebuild to take the backup of required tables based on the flags sent 
	  for rebuilding the borr/partvdbal and propogation related tables for participant contracts 
RETURN boolean;

FUNCTION fn_rebuild_part_vdbal
	1. it will do the deletion of back tables based on the flags passed.
RETURN boolean;

06-NOV-2006 FCC V.CL Release 7.2 changes daya
--FLEXCUBE V.CL Release 7.2 ITR2 SFR#63
*/
 
FUNCTION fn_rebuild
		(
		p_branch			IN oltbs_contract.branch%TYPE DEFAULT NULL,
		p_rebuild_borr_vdbal	IN VARCHAR2 DEFAULT 'Y',
		p_propogation_required	IN VARCHAR2 DEFAULT 'Y',
		p_rebuild_part_vdbal	IN VARCHAR2 DEFAULT 'Y',
		p_date_for_rebuild	IN DATE DEFAULT NULL, --The date from which user wants to rebuild the data
		p_err_code			IN OUT VARCHAR2,
		p_err_params		IN OUT VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION fn_rebuild_a_contract 
		(
		p_contract_ref_no		IN oltbs_contract.contract_ref_no%TYPE,
		p_rebuild_borr_vdbal	IN VARCHAR2,
		p_propogation_required	IN VARCHAR2,
		p_rebuild_part_vdbal	IN VARCHAR2,
		p_date_for_rebuild	IN DATE	DEFAULT NULL,
		p_err_code			IN OUT VARCHAR2,
		P_err_params		IN OUT VARCHAR2
		)		
RETURN BOOLEAN;

FUNCTION fn_rebuild_borrower_vdbal 
		(
		p_tranche_ref_no	IN oltbs_contract.contract_ref_no%TYPE,
		p_value_date	IN oltbs_contract_master.value_date%TYPE,
		p_error_code	IN OUT	VARCHAR2,
		p_error_params	IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION fn_rebuild_backup
		(
		p_contract_ref_no		IN oltbs_contract.contract_ref_no%TYPE,
		p_rebuild_borr_vdbal	IN VARCHAR2,
		p_propogation_required	IN VARCHAR2,
		p_rebuild_part_vdbal	IN VARCHAR2,
		p_err_code			IN OUT VARCHAR2,
		P_err_params		IN OUT VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION fn_delete_rebuild_backup 
		(
		p_contract_ref_no		IN oltbs_contract.contract_ref_no%TYPE,
		p_rebuild_borr_vdbal	IN VARCHAR2,	
		p_propogation_required	IN VARCHAR2,
		p_rebuild_part_vdbal	IN VARCHAR2,
		p_contract_type		IN VARCHAR2,
		p_err_code			IN OUT VARCHAR2,	
		p_err_params		IN OUT VARCHAR2
		)
RETURN BOOLEAN; 

FUNCTION fn_rebuild_part_vdbal(p_contract_ref_no VARCHAR2,p_value_date DATE )
RETURN BOOLEAN ;

FUNCTION fn_rebuild_part_vdbal_detail(p_contract_ref_no VARCHAR2,p_value_date DATE )
RETURN BOOLEAN ;
--FLEXCUBE V.CL Release 7.2 ITR2 SFR#63 start
FUNCTION FN_REBUILD_RATIO
(
	P_contract_ref_no 	IN varchar2	, 
	P_value_date 		IN date		,
	P_Err_code		OUT varchar2	,
	P_Err_param		OUT varchar2
) 
RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.2 ITR2 SFR#63 end
END lbpks_rebuild;
/
CREATE or replace SYNONYM lbpkss_rebuild FOR lbpks_rebuild
/