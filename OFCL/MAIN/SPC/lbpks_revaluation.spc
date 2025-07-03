create or replace package lbpks_revaluation as
/*------------------------------------------------------------------------------
** File Name			: lbpks_revaluation.SPC
**
** Module			:LOAN SYNDICATION
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
------------------------------------------------------------------------------
*/

/*
------------------------------CHANGE HISTORY-----------------------------------------------
01-DEC-2006 FLEXCUBE V.CL Release 7.2, Package Specification Created by Gowri
	    This package has been created to handle the process of revaluation.
------------------------------------END CHANGE HISTORY-------------------------------------
*/

g_REVAL_PROC   VARCHAR2(1) := 'N'; --OBCL_144_REVAL_CHANGES

FUNCTION fn_populate_reval_sch(p_CONTRACT_REF_NO IN lbtbs_reval_schedules.CONTRACT_REF_NO%type,
					p_errcode IN OUT VARCHAR2,
			         	p_errprm IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_calc_reval_sch(p_contract_ref_no IN lbtbs_contract_reval_pref.contract_ref_no%type,
				   p_revaluation_frequency IN lbtbs_contract_reval_pref.revaluation_frequency%type, 
				   p_reval_start_month IN lbtbs_contract_reval_pref.reval_start_month%type, 
				   p_reval_start_date IN lbtbs_contract_reval_pref.reval_start_date%type,
				   p_errcode IN OUT VARCHAR2,
			         p_errprm  IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_insert_reval_sch(p_contract_ref_no IN lbtbs_contract_reval_pref.contract_ref_no%type,
				p_tranche_ref_no IN lbtbs_contract_reval_pref.contract_ref_no%type,
				p_reval_st_dt IN lbtbs_drawdown_schedule.drawdown_date%type,
				p_drawdown_ccy IN oltbs_contract.contract_ccy%type,
				p_tranche_ccy IN oltbs_contract.contract_ccy%type,
				p_revaluation_rate_code IN lbtbs_contract_reval_pref.revaluation_rate_code%type, 
				p_revaluation_rate_type IN lbtbs_contract_reval_pref.revaluation_rate_type%type, 
				p_errcode IN OUT VARCHAR2,
			      p_errprm IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_validate_reval_sch_dates(p_contract_ref_no IN lbtbs_contract_reval_pref.contract_ref_no%type,
						p_value_date lbtbs_drawdown_schedule.drawdown_date%type,
						p_maturity_date lbtbs_drawdown_schedule.drawdown_date%type,
						p_errcode IN OUT VARCHAR2,
						p_errprm IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_update_reval_end_dates(p_contract_ref_no IN lbtbs_contract_reval_pref.contract_ref_no%type,
						p_frequency IN lbtbs_contract_reval_pref.revaluation_frequency%type, 
						p_errcode IN OUT VARCHAR2,
						p_errprm IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_populate_reval_rate(p_module IN oltbs_contract.module_code%TYPE,
					p_process_date IN lbtbs_reval_schedules.start_date%TYPE,
					p_product IN	oltbs_contract.product_code%TYPE,
					p_errcode IN OUT VARCHAR2,
					p_errprm IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_validate_temp_vdbal(p_contract_ref_no IN lbtbs_contract_reval_pref.contract_ref_no%type,
				p_errcode IN OUT VARCHAR2,
				p_errprm IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_fix_exfx(p_contract_ref_no IN lbtbs_contract_reval_pref.contract_ref_no%type,
				p_tranche_ref_no IN lbtbs_contract_reval_pref.contract_ref_no%type,
				p_process_date IN lbtbs_reval_schedules.start_date%type,
				p_end_date IN lbtbs_reval_schedules.start_date%type,
				p_dd_ccy IN lbtbs_reval_schedules.drawdown_ccy%type,
				p_tr_ccy IN lbtbs_reval_schedules.drawdown_ccy%type,
				p_rate IN lbtbs_exrate_fixing_details.exchange_rate%type,
				p_errcode IN OUT VARCHAR2,
				p_errprm IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_populate_exrate_details(p_contract_ref_no IN lbtbs_contract_reval_pref.contract_ref_no%type,
				p_tranche_ref_no IN lbtbs_contract_reval_pref.contract_ref_no%type,
				p_process_dt IN lbtbs_reval_schedules.start_date%type,
				p_end_date IN lbtbs_reval_schedules.start_date%type,
				p_dd_ccy IN lbtbs_reval_schedules.drawdown_ccy%type,
				p_tr_ccy IN lbtbs_reval_schedules.drawdown_ccy%type,
				p_rate IN lbtbs_exrate_fixing_details.exchange_rate%type,
				p_errcode IN OUT VARCHAR2,
				p_errprm IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_insert_exrate_details(p_contract_ref_no IN lbtbs_contract_reval_pref.contract_ref_no%type,
					p_eff_dt IN lbtbs_reval_schedules.start_date%type,
					p_end_date IN lbtbs_reval_schedules.start_date%type,
					p_dd_ccy IN lbtbs_reval_schedules.drawdown_ccy%type,
					p_tr_ccy IN lbtbs_reval_schedules.drawdown_ccy%type,					
					p_rate IN lbtbs_exrate_fixing_details.exchange_rate%type,
					p_errcode IN OUT VARCHAR2,
					p_errprm IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_process_exrate(p_contract_ref_no IN lbtbs_contract_reval_pref.contract_ref_no%type,
				p_errcode IN OUT VARCHAR2,
				p_errprm IN OUT VARCHAR2)
RETURN BOOLEAN;

END lbpks_revaluation;
/
create or replace synonym lbpkss_revaluation for lbpks_revaluation
/