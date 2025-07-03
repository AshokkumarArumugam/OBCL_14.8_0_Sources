CREATE OR REPLACE PACKAGE lbpks_irrn AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lbpks_irrn.SPC
**
** Module	: LOANS  SYNDICATION
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
-------------------------------------------------------------------------------------------------------
     CHANGE HISTORY
     
    Changed On			:09-JUL-2016
     Changed By         :  Deva Anand
     Change Description :  Correcting the units after dropping floating rate related work tables and commenting the version number
     Search String		:Floating_Rate_changes 
     
	 Changed On			:02-NOV-2017
     Changed By         :  Priyadarshini K
     Change Description :  Added a new function for rate fixing job for LS rate fixing
     Search String		:OBCL_12.5_LS_RATEFIX

	Changed By         : Vineeth T M
    Changed On         : 07-NOV-2022
    Change Reason      : Pass contract to fn_rate_revn_ratefixing_job
    Search String      : OBCL_14.6_SUPP#34742298 Changes
	
	**Changed By         : Sowmya Bitra
    **Date               : 22-April-2023
    **Change Description : ECA Support for BADJ during REVN
    **Search String      : OBCL_14.8_ECA_Changes
	
	**Changed By         : Baljinder
	**Date               : 19-Jan-2024
	**Change Description : Multi Threading changes for rate revn
	**Search String      : Multi Threading changes

----------------------------------------------------------------------------------------------------
*/
			
PROCEDURE pr_upd_frrn_due(
	    	 pm_branch			IN	oltbs_contract.branch%TYPE
		,pm_ccy			IN	cftms_float_rate_master.ccy_code%TYPE
		,pm_rate_code		IN	cftms_float_rate_master.rate_code%TYPE
		,pm_prev_slab		IN	cftms_float_rate_master.amount_slab%TYPE
		,pm_amount_slab		IN	cftms_float_rate_master.amount_slab%TYPE
		,pm_eff_date		IN	DATE
		,pm_today			IN	DATE
	--	,pm_version_no		IN	cftws_float_rate_master.version_no%TYPE --Floating_Rate_changes commented
		,pm_next_eff_date 	IN 	DATE 	
		) ;

PROCEDURE pr_upd_frrn_due(
	    	 pm_branch			IN	oltbs_contract.branch%TYPE
		,pm_ccy			IN	cftms_float_rate_master.ccy_code%TYPE
		,pm_rate_code		IN	cftms_float_rate_master.rate_code%TYPE
		,pm_prev_slab		IN	cftms_float_rate_master.amount_slab%TYPE
		,pm_amount_slab		IN	cftms_float_rate_master.amount_slab%TYPE
		,pm_eff_date		IN	DATE
		,pm_today			IN	DATE);

FUNCTION fn_cya
			( pm_branch		IN		oltbs_contract.branch%TYPE
			, pm_proc_date		IN		DATE 
			, pm_err_code	IN OUT	ertbs_msgs.err_code%TYPE
			, pm_params		IN OUT	VARCHAR2
			)RETURN BOOLEAN;


FUNCTION fn_rate_revisions(
		pm_branch		IN	oltms_branch.branch_code%TYPE,
		pm_module		IN	oltbs_contract.module_code%TYPE,
		pm_proc_date	IN	DATE,
		pm_product		IN	oltms_product_master_ld.product%TYPE,
		pm_comt_freq	IN	oltbs_automatic_process_master.bod_commit_count%TYPE,
		pm_err_code		IN OUT	ertbs_msgs.err_code%TYPE,
		pm_params		IN OUT	VARCHAR2
		)RETURN BOOLEAN;

FUNCTION fn_contract_level_updates
			(
			pm_cs_rec	IN	oltbs_contract%ROWTYPE,
			pm_err_code	IN OUT	ertbs_msgs.err_code%TYPE,
			pm_params	IN OUT	VARCHAR2
			)RETURN BOOLEAN;

FUNCTION fn_floating_rate_revision
			(
			pm_branch		IN		oltms_branch.branch_code%TYPE,
			pm_module		IN		oltbs_contract.module_code%TYPE,
			pm_proc_date	IN		DATE,
			pm_product		IN		oltms_product_master_ld.product%TYPE,
			pm_comt_freq	IN		oltbs_automatic_process_master.bod_commit_count%TYPE,
			pm_err_code		IN OUT	ertbs_msgs.err_code%TYPE,
			pm_params		IN OUT	VARCHAR2
			)
RETURN BOOLEAN;

--OBCL_12.5_LS_RATEFIX starts
FUNCTION fn_rate_revn_ratefixing_job(
    pm_branch    IN  oltms_branch.branch_code%TYPE,
    pm_module    IN  oltbs_contract.module_code%TYPE,
    pm_proc_date    IN  DATE,
    pm_product    IN  oltms_product_master_ld.product%TYPE,
    pm_comt_freq    IN  oltbs_automatic_process_master.bod_commit_count%TYPE,
    p_Contract_Ref_No IN Lftb_Rate_Fixing_Days_Log.Contract_Ref_No%TYPE,--OBCL_14.6_SUPP#34742298 Changes
    pm_err_code    IN OUT  ertbs_msgs.err_code%TYPE,
    pm_params    IN OUT  VARCHAR2
    )RETURN BOOLEAN;
--OBCL_12.5_LS_RATEFIX ends 

--OBCL_14.8_ECA_Changes Start
FUNCTION fn_batch_rate_revision(pm_branch    IN oltms_branch.branch_code%TYPE,
                                  pm_module    IN oltbs_contract.module_code%TYPE,
                                  pm_user      IN smtbs_user.user_id%TYPE,
                                  pm_proc_date IN DATE,
                                  pm_product   IN oltms_product_master_ld.product%TYPE,
                                  pm_comt_freq IN oltbs_automatic_process_master.bod_commit_count%TYPE,
                                  pm_err_code  IN OUT ertbs_msgs.err_code%TYPE,
                                  pm_params    IN OUT VARCHAR2) 
RETURN VARCHAR2;

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
FUNCTION fn_cya_batch(pm_user    IN smtb_user.user_id%TYPE,
                  pm_branch    IN oltbs_contract.branch%TYPE,
                  pm_proc_date IN DATE,
                  pm_err_code  IN OUT ertbs_msgs.err_code%TYPE,
                  pm_params    IN OUT VARCHAR2) RETURN VARCHAR2;
--Multi Threading Changes end
pkg_raterevn	VARCHAR2(1) := 'N';		

END lbpks_irrn;
/
CREATE or replace SYNONYM lbpkss_irrn FOR lbpks_irrn
/