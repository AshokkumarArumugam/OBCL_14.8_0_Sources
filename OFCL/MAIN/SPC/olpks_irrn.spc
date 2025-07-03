CREATE OR REPLACE PACKAGE olpks_irrn AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_irrn.SPC
**
** Module	: LOANS and DEPOSITS
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

/* Change History 
17/01/2002  FCC 3.9 LATAM  TENOR WISE FLOATING RATE CHANGES. Floating rate is picked up for the combination of
				   Tenor + Borrow Lend Indicator + Rate Calc Type.
28-AUG-2002 FCC4.1 Oct 2002 ASPAC TIL #2016 Apply back valued interest rate revision and penal rate revision during init.
				   Added function fn_process_irrn_during_init and parameter pm_action_code added in fn_irrn_for_a_contract.
18/Apr/2003 FCC 4.2 Apr 2003 ITR1 fixes. Added new function fn_margin_revisions in the spec.

27-APR-2003 FCC4.2 APR 2003 LS changes - Added package variable pkg_raterevn

27-jun-2003    FCC4.3 AUG 2003 WORK TABLES CHANGES
19-JAN-2006 Flexcube V.CL Release 7.0 Interest Changes 19012006
10-APR-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag 16 <Floating Periodic Manual>, added new function Fn_fpm_rate_revision.
14-MAY-2009 CITIPBGDEVLOT2,Manual Rate Revision,KUNAL
24-AUG-2009 FLEXCUBE V.CL Release 7.5 LOT2 RT #251 CITIPBGIT Changes - Reset Value date will be defaulted as either Contract Value Date or VAMI Value Date based on the fucntion ID 
13-APR-2012 Flexcube V.CL Release 7.11 FS Tag 12 changes, Ability to handle Adjustable Rate Mortgage Changes
     Changed On		:09-JUL-2016
     Changed By         :  Deva Anand
     Change Description :  Correcting the units after dropping floating rate related work tables and commenting the version number
     Search String	:Floating_Rate_changes 
	 
	 
	 	 **SFR Number         : 29583925   
**Changed By         : Arvind Baskar
**Change Description : Hooks provided for fn_floating_rate_revision 
**Search String      : Bug#29583925  

**Changed By         : Sowmya Bitra
**Date               : 22-April-2023
**Change Description : ECA Support for BADJ during REVN
**Search String      : OBCL_14.8_ECA_Changes

**Changed By         : Baljinder
**Date               : 19-Jan-2024
**Change Description : Multi Threading changes for rate revn
**Search String      : Multi Threading changes

**Changed By         : Navoneel Nandan
**Date               : 11-Jun-2024
**Change Description : Skipping Rate Codes where rate has not changed
**Search String      : Bug#36626521_3
*/



--17/01/2002 FCC 3.9 LATAM Tenor floating rate changes Starts
/*

--Bug#29583925   changes start
  PROCEDURE Pr_Skip_Handler(P_Stage IN VARCHAR2);
  PROCEDURE Pr_Set_Skip_Kernel;
  PROCEDURE Pr_Set_Activate_Kernel;
  PROCEDURE Pr_Set_Skip_Cluster;
  PROCEDURE Pr_Set_Activate_Cluster;
  FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
--Bug#29583925   changes end

FUNCTION fn_fire_job(
			pm_branch		IN		cftms_floating_rate.branch_code%TYPE,
			pm_rate_code	IN		cftms_floating_rate.rate_code%TYPE,
			pm_err_code		IN OUT	ertbs_msgs.err_code%TYPE,
			pm_params		IN OUT	VARCHAR2
			)RETURN BOOLEAN;


PROCEDURE pr_upd_frrn_due(
	    	 pm_branch			IN	oltbs_contract.branch%TYPE
		,pm_ccy				IN	cftms_floating_rate.ccy_code%TYPE
		,pm_rate_code		IN	cftms_floating_rate.rate_code%TYPE
		,pm_prev_slab		IN	cftms_floating_rate.amount_slab%TYPE
		,pm_amount_slab		IN	cftms_floating_rate.amount_slab%TYPE
		,pm_eff_date		IN	DATE
		,pm_today			IN	DATE);
*/
--Multi Threading Changes start comment unnecessary functions
/*FUNCTION fn_fire_job(
			pm_branch	IN	cftms_float_rate_master.branch_code%TYPE,
			pm_rate_code	IN	cftms_float_rate_master.rate_code%TYPE,
			pm_err_code	IN OUT	ertbs_msgs.err_code%TYPE,
			pm_params	IN OUT	VARCHAR2
			--,pm_version_no	IN	cftws_float_rate_master.version_no%TYPE --FCC4.3 AUG 2003 WORK TABLES CHANGES --Floating_Rate_changes commented
      )RETURN BOOLEAN;*/
			
/*PROCEDURE pr_upd_frrn_due(
	    	 pm_branch			IN	oltbs_contract.branch%TYPE
		,pm_ccy			IN	cftms_float_rate_master.ccy_code%TYPE
		,pm_rate_code		IN	cftms_float_rate_master.rate_code%TYPE
		,pm_prev_slab		IN	cftms_float_rate_master.amount_slab%TYPE
		,pm_amount_slab		IN	cftms_float_rate_master.amount_slab%TYPE
		,pm_eff_date		IN	DATE
		,pm_today			IN	DATE
		--,pm_version_no		IN	cftws_float_rate_master.version_no%TYPE--Floating_Rate_changes commented
		,pm_next_eff_date 	IN 	DATE 		--FCC 4.5 Apr 2004 ITR SFR 274
    ) ;*/

/*PROCEDURE pr_upd_frrn_due(
	    	 pm_branch			IN	oltbs_contract.branch%TYPE
		,pm_ccy			IN	cftms_float_rate_master.ccy_code%TYPE
		,pm_rate_code		IN	cftms_float_rate_master.rate_code%TYPE
		,pm_prev_slab		IN	cftms_float_rate_master.amount_slab%TYPE
		,pm_amount_slab		IN	cftms_float_rate_master.amount_slab%TYPE
		,pm_eff_date		IN	DATE
    ,pm_today     IN  DATE);*/
--17/01/2002 FCC 3.9 LATAM Tenor floating rate changes Ends

/*FUNCTION  fn_cya
			( pm_branch		IN		oltbs_contract.branch%TYPE
			, pm_proc_date		IN		DATE --Flexcube V.CL Release 7.0 Interest Changes 19012006
			, pm_err_code	IN OUT	ertbs_msgs.err_code%TYPE
			, pm_params		IN OUT	VARCHAR2
      )RETURN BOOLEAN;*/


/*FUNCTION fn_rate_revisions(
		pm_branch		IN	oltms_branch.branch_code%TYPE,
		pm_module		IN	oltbs_contract.module_code%TYPE,
		pm_proc_date	IN	DATE,
		pm_product		IN	oltms_product_master_ld.product%TYPE,
		pm_comt_freq	IN	oltbs_automatic_process_master.bod_commit_count%TYPE,
		pm_err_code		IN OUT	ertbs_msgs.err_code%TYPE,
		pm_params		IN OUT	VARCHAR2
    )RETURN BOOLEAN;*/
--Multi Threading Changes end

FUNCTION fn_irrn_for_a_contract (
		pm_branch		IN		oltbs_contract.branch%TYPE,
		pm_reference	IN		oltbs_contract.contract_ref_no%TYPE,
		pm_component	IN		lftbs_contract_interest.component%TYPE,
		pm_esn		IN		oltbs_contract.latest_event_seq_no%TYPE,
		pm_version		IN		oltbs_contract.latest_version_no%TYPE,
		pm_action_code	IN		VARCHAR2, --FCC4.1 Oct 2002 ASPAC TIL #2016
		pm_eff_date		IN		DATE,
		pm_proc_date	IN		DATE,
		pm_con_eff_dt	IN OUT	DATE,
		pm_err_code		IN OUT	ertbs_msgs.err_code%TYPE,
		pm_params		IN OUT	VARCHAR2
		)RETURN BOOLEAN;

FUNCTION fn_recomp_norm(
		pm_branch			IN	oltbs_contract.branch%TYPE,
		pm_reference 		IN 	oltbs_contract.contract_ref_no%TYPE,
		pm_component 		IN	oltbs_amount_due_cs.component%TYPE,
		pm_eff_date			IN	DATE,
		pm_proc_date		IN	DATE,
		pm_esn				IN	oltbs_contract.latest_event_seq_no%TYPE,
		pm_err_code		IN OUT	ertbs_msgs.err_code%TYPE,
		pm_params		IN OUT	VARCHAR2
	)RETURN BOOLEAN;

FUNCTION fn_contract_level_updates
			(
			pm_cs_rec	IN	oltbs_contract%ROWTYPE,
			pm_err_code	IN OUT	ertbs_msgs.err_code%TYPE,
			pm_params	IN OUT	VARCHAR2
			)RETURN BOOLEAN;

--FCC3.9 ITR1 SFR #58 STARTS
FUNCTION fn_propagate_Rates(
			pHO		IN	oltms_branch.branch_code%TYPE,
			prCode	IN 	CFTMS_RATE_CODE.rate_code%TYPE,
			pCCY_CODE 	IN 	CFTMS_RATE_CCY.CCY_CODE%TYPE
--			,pversion_no	in	CFTWS_RATE_CCY.VERSION_NO%TYPE --FCC4.3 AUG 2003 WORK TABLES CHANGES--Floating_Rate_changes commented
			)
RETURN BOOLEAN;
--FCC3.9 ITR1 SFR #58 ENDS

--FCC4.1 Oct 2002 ASPAC TIL #2016 Added function fn_process_irrn_during_init
FUNCTION fn_process_irrn_during_init
		(
		pm_contract_ref_no	IN		oltbs_contract.contract_ref_no%TYPE,
		pm_action_code		IN		VARCHAR2,
		pm_auth_status		IN		VARCHAR2,
		pm_err_code			IN OUT	ertbs_msgs.err_code%TYPE,
		pm_params			IN OUT	VARCHAR2
		)
RETURN BOOLEAN;
--FCC 4.2 Apr 2003 ITR1 fixes start.
FUNCTION fn_margin_revisions(
		pm_branch		IN	oltms_branch.branch_code%TYPE,
		pm_module		IN	oltbs_contract.module_code%TYPE,
		pm_proc_date	IN	DATE,
		pm_product		IN	oltms_product_master_ld.product%TYPE,
		pm_comt_freq	IN	oltbs_automatic_process_master.bod_commit_count%TYPE,
		pm_err_code		IN OUT	ertbs_msgs.err_code%TYPE,
		pm_params		IN OUT	VARCHAR2
		)RETURN BOOLEAN;
--FCC 4.2 Apr 2003 ITR1 fixes

--Function added for FCC 4.5 LOT2 
--Multi Threading Changes start
/*FUNCTION fn_floating_rate_revision
			(
			pm_branch		IN		oltms_branch.branch_code%TYPE,
			pm_module		IN		oltbs_contract.module_code%TYPE,
			pm_proc_date	IN		DATE,
			pm_product		IN		oltms_product_master_ld.product%TYPE,
			pm_comt_freq	IN		oltbs_automatic_process_master.bod_commit_count%TYPE,
			pm_err_code		IN OUT	ertbs_msgs.err_code%TYPE,
			pm_params		IN OUT	VARCHAR2
			)
RETURN BOOLEAN;*/
--Multi Threading Changes end
FUNCTION fn_revise_float_rate
			(
			pm_branch		IN		oltms_branch.branch_code%TYPE,
			pm_module		IN		oltbs_contract.module_code%TYPE,
			pm_proc_date	IN		DATE,
			pm_product		IN		oltms_product_master_ld.product%TYPE,
			pm_comt_freq	IN		oltbs_automatic_process_master.bod_commit_count%TYPE,
			pm_err_code		IN OUT	ertbs_msgs.err_code%TYPE,
			pm_err_param	IN OUT	VARCHAR2
			)
RETURN BOOLEAN;


pkg_raterevn	VARCHAR2(1) := 'N';		-- 27-APR-2003 LS changes
--Flexcube V.CL Release 7.0 Interest Changes 19012006 START
FUNCTION fn_insert_amount_due(	pm_reference	     IN	oltbs_contract.contract_ref_no%TYPE,
				pm_component	     IN	lftbs_contract_interest.component%TYPE,
			        pm_maturity_date     IN	oltbs_contract_master.maturity_date%TYPE,
				pm_flag		     IN	varchar2
			      )
RETURN BOOLEAN;
--Flexcube V.CL Release 7.0 Interest Changes 19012006 END
--10-APR-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag 16 <Floating Periodic Manual> Changes Starts
FUNCTION Fn_fpm_rate_revision
		(
		pm_branch		IN	oltms_branch.branch_code%TYPE,
		pm_module		IN	oltbs_contract.module_code%TYPE,
		pm_product		IN	oltms_product_master_ld.product%TYPE,
		pm_proc_date		IN	DATE, --reset Value date
		pm_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,--NULL For batch
		pm_process_mode		IN	VARCHAR2, --B-Batch / O -Online
		pm_err_code		IN OUT	ertbs_msgs.err_code%TYPE,
		pm_params		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;
--10-APR-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag 16 <Floating Periodic Manual> Changes Ends
------CITIPBGDEVLOT2,MANUAL RATE REVISION,KUNAL
FUNCTION Fn_insert_rate_fixing_detail
		(
		p_contract_ref_no	IN	oltbs_contract.CONTRACT_REF_NO%TYPE,
		p_component		IN	VARCHAR2,
		p_esn			IN	NUMBER,
		p_cur_reset_dt		IN	DATE ,
		p_rate_code		IN	VARCHAR2,
		p_action_mode		IN	CHAR,
		--24-AUG-2009 FLEXCUBE V.CL Release 7.5 LOT2 RT #251 CITIPBGIT Changes Start
		p_function_id		IN	VARCHAR2,
		p_value_date		IN	DATE,
		--24-AUG-2009 FLEXCUBE V.CL Release 7.5 LOT2 RT #251 CITIPBGIT Changes End
		p_err_code		IN OUT	ertbs_msgs.err_code%TYPE,
		p_err_params		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;
-------CITIPBGDEVLOT2,MANUAL RATE REVISION,KUNAL

--13-APR-2012 Flexcube V.CL Release 7.11 FS Tag 12 changes start here
FUNCTION fn_pop_floating_automatic_rate
		(
		p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE
		, p_auth_status		IN	VARCHAR2
		, p_err_code		IN OUT	VARCHAR2
		, p_err_param		IN OUT	VARCHAR2
		) 
RETURN BOOLEAN;
--13-APR-2012 Flexcube V.CL Release 7.11 FS Tag 12 changes end here

--OBCL_14.8_ECA_Changes Start
--Multi Threading Changes start
/*FUNCTION fn_batch_rate_revision(pm_branch    IN oltms_branch.branch_code%TYPE,
                                  pm_module    IN oltbs_contract.module_code%TYPE,
                                  pm_user      IN smtbs_user.user_id%TYPE,
                                  pm_proc_date IN DATE,
                                  pm_product   IN oltms_product_master_ld.product%TYPE,
                                  pm_comt_freq IN oltbs_automatic_process_master.bod_commit_count%TYPE,
                                  pm_err_code  IN OUT ertbs_msgs.err_code%TYPE,
                                  pm_params    IN OUT VARCHAR2) 
RETURN VARCHAR2;*/
--Multi Threading Changes end

FUNCTION fn_process_eca_revn_badj(p_branch    IN oltms_branch.branch_code%TYPE,
                                    p_module    IN oltbs_contract.module_code%TYPE,
                                    p_User      IN Smtbs_User.User_Id%TYPE,
                                    p_proc_date IN DATE,
                                    p_product   IN oltms_product_master_ld.product%TYPE,
                                    p_comt_freq IN oltbs_automatic_process_master.bod_commit_count%TYPE,
                                    p_err_code  IN OUT ertbs_msgs.err_code%TYPE,
                                    p_params    IN OUT VARCHAR2)
RETURN VARCHAR2;
--OBCL_14.8_ECA_Changes End
--Multi Threading Changes start
Function fn_upd_frrn_due_batch(pm_user_id      IN smtbs_user.user_id%TYPE,
                            pm_contract_ref_no      IN oltbs_contract.contract_ref_no%TYPE,
                            pm_branch      IN oltbs_contract.branch%TYPE,
                            pm_ccy         IN cftms_float_rate_master.ccy_code%TYPE,
                            pm_rate_code   IN cftms_float_rate_master.rate_code%TYPE,
                            pm_prev_slab   IN cftms_float_rate_master.amount_slab%TYPE,
                            pm_amount_slab IN cftms_float_rate_master.amount_slab%TYPE,
                            pm_eff_date    IN DATE,
                            pm_today       IN DATE,
                            pm_next_eff_date IN DATE,
                            pm_irrn_for_liqd_contract IN oltms_branch_parameters.irrn_for_liqd_contract%TYPE, 
                            p_err_code  IN OUT ertbs_msgs.err_code%TYPE,
                            p_params    IN OUT VARCHAR2)
                            RETURN VARCHAR2;
                            
FUNCTION fn_floating_rate_revision_batch(pm_user_id      IN smtbs_user.user_id%TYPE,
                                     pm_branch    IN oltms_branch.branch_code%TYPE,
                                     pm_module_code   IN oltbs_contract.module_code%TYPE,
                                     pm_contract_ref_no    IN oltbs_contract.contract_ref_no%TYPE,
                                     pm_proc_date IN DATE,
                                     pm_product_code   IN oltms_product_master_ld.product%TYPE,
                                     pm_comt_freq IN oltbs_automatic_process_master.bod_commit_count%TYPE,
                                     pm_err_code  IN OUT ertbs_msgs.err_code%TYPE,
                                     pm_params    IN OUT VARCHAR2)
    RETURN VARCHAR2;
    
    FUNCTION fn_rate_revisions_batch(pm_user_id      IN smtbs_user.user_id%TYPE,
                          pm_contract_ref_no      IN oltbs_contract.contract_ref_no%TYPE,
                          pm_branch    IN oltms_branch.branch_code%TYPE,
                           pm_module    IN oltbs_contract.module_code%TYPE,
                           pm_proc_date IN DATE,
                           pm_product   IN oltms_product_master_ld.product%TYPE,
                           pm_comt_freq IN oltbs_automatic_process_master.bod_commit_count%TYPE,
                           pm_err_code  IN OUT ertbs_msgs.err_code%TYPE,
                           pm_params    IN OUT VARCHAR2) RETURN VARCHAR2;
    
  FUNCTION Fn_fpm_rate_revision_batch(pm_user_id      IN smtbs_user.user_id%TYPE,
                                     pm_branch          IN oltms_branch.branch_code%TYPE,
                                pm_module          IN oltbs_contract.module_code%TYPE,
                                pm_product         IN oltms_product_master_ld.product%TYPE,
                                pm_proc_date       IN DATE, --reset Value date
                                pm_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE, --NULL For batch
                                pm_process_mode    IN VARCHAR2, --B-Batch / O -Online
                                pm_err_code        IN OUT ertbs_msgs.err_code%TYPE,
                                pm_params          IN OUT VARCHAR2)
    RETURN VARCHAR2;
  
 FUNCTION fn_process_comp_rates_batch(pm_user_id      IN smtbs_user.user_id%TYPE,
                                       pm_branch    IN oltms_branch.branch_code%TYPE,
                                       pm_module    IN oltbs_contract.module_code%TYPE,
                                       pm_proc_date IN DATE,
                                       pm_product   IN oltms_product_master_ld.product%TYPE,
                                       pm_comt_freq IN oltbs_automatic_process_master.bod_commit_count%TYPE,
                                       pm_err_code  IN OUT ertbs_msgs.err_code%TYPE,
                                       pm_params    IN OUT VARCHAR2) 
  RETURN VARCHAR2;
  --Multi Threading Changes end
--Bug#36626521_3 starts
FUNCTION fn_skip_rate_code(pm_branch    cftms_float_rate_master.branch_code%TYPE
                          ,pm_proc_date cftms_float_rate_master.effective_date%TYPE)
  RETURN VARCHAR2;
--Bug#36626521_3 ends
END olpks_irrn;
/
CREATE or replace SYNONYM olpkss_irrn FOR olpks_irrn
/