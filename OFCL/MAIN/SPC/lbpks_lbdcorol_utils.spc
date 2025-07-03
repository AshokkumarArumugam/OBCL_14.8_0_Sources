create or replace package lbpks_lbdcorol_utils is
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdcorol_utils.spc
  **
  ** Module     : Syndication Loans and Commitments
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved
  **
  **
  ** No part of this work may be reproduced, stored in a retrieval system, adopted
  ** or transmitted in any form or by any means, electronic, mechanical,
  ** photographic, graphic, optic recording or otherwise, translated in any
  ** language or computer language, without the prior written permission of
  ** Oracle and/or
  its affiliates.
  **
  ** Oracle Financial Services Software Limited.
  ** Oracle Park, Off Western Express Highway,
  ** Goregaon (East),
  ** Mumbai - 400 063, India
  ** India
  -------------------------------------------------------------------------------------------------------
  CHANGE HISTORY

  SFR Number         :
  Changed By         :
  Change Description :

  18-APR-2018 LS14.1 ECA changes --Logged records into ECA table for DDA processing

    **Changed By         : Prakash Ravi
    **Change Description : Code to handle post due date changes.
    **Search String      : OBCL_14.4.0_PAST_DUE_TRACKING
    **Changed On         : 04-Nov-2019
	
	*Changed By         : Sowmya Bitra
    *Changed On         : 21-May-2021
    *Search String      : OBCL_14.5_LS_Gateway_Changes#2
    *Change Reason      : Changes for gateway and auto auth
	
	*Changed By         : Rashmi B V
    *Changed On         : 15-Jun-2023
    *Search String      : Bug#35471585
    *Change Reason      : LBDCOROL save was failing with unhandled exception due to character string buffer too small 

  
  -------------------------------------------------------------------------------------------------------
  */

  g_prm_batch_status VARCHAR2(1);
  g_prm_value_date   DATE;
  g_prm_rollover     VARCHAR2(1);
  g_prm_facility     VARCHAR2(30);
  g_prm_component    VARCHAR2(10);
  g_prm_new          VARCHAR2(10);
  g_prm_tranche_ccy  VARCHAR2(10);
  g_prm_iccf         VARCHAR2(30);
  g_prm_roll_type    VARCHAR2(30);
  g_prm_int_pickup   VARCHAR2(10);
  g_prm_auto_sch     VARCHAR2(10);
  g_prm_sch_basis    VARCHAR2(10);
  g_prm_int_basis    VARCHAR2(10);
  g_prm_intpkup      VARCHAR2(10);
  g_prm_tranchedate  DATE;
  g_prm_mat_date     DATE;
  g_prm_comp         VARCHAR2(10);
  g_roll_intfixed    VARCHAR2(30);
  g_roll_extfixed    VARCHAR2(30);
  g_prm_rate_code    VARCHAR2(30);
  g_prm_pik_flag_checked      VARCHAR2(30);
  g_prm_pik_margin   VARCHAR2(10);
  --g_prm_borr_amt     VARCHAR2(30);
  g_prm_borr_amt     NUMBER;			--Bug#35471585
  g_prm_synd_ref     VARCHAR2(30);
  g_prm_rec          VARCHAR2(30);
  g_prm_rate_chg     VARCHAR2(30);
  g_prm_split_no       VARCHAR2(30);
  g_prm_rounding     VARCHAR2(30);
  g_prm_flrcl_base   VARCHAR2(1);
  g_prm_pik_recal    VARCHAR2(1);
  g_prm_tot_amt      NUMBER;
  g_prm_int_val      VARCHAR2(30);
  g_prm_int_diff     VARCHAR2(30);
  g_prm_pik_val      VARCHAR2(30);
  g_prm_pik_amt      NUMBER;
  g_prm_prev_rec     VARCHAR2(30);
  g_prm_split_prod   VARCHAR2(30);
  g_prm_param        VARCHAR2(30);
  g_prm_calender     DATE;
  g_prm_princ        NUMBER;
  g_prm_margin       VARCHAR2(30);
  g_prm_irfx         VARCHAR2(10);
 g_prm_previous_prod VARCHAR2(30);
  g_prm_rowid VARCHar2(30);
	g_prm_int_param  VARCHAR2(10);
	g_prm_main_comp VARCHar2(30);
  g_prm_rate_fixing_reqd VARCHAR2(10);
	g_prm_rate_fixing_allowed VARCHAR2(10);
	g_prm_exrate_fixing VARCHAR2(10);
	g_prm_advices VARCHAR2(10);
	g_roll_exrate_fixed VARCHAR2(10);
	g_prm_msg_esn VARCHAR2(10);
	g_view_message VARCHAR2(10);
	g_PRM_PART_SHARE_AUTH VARCHAR2(10);
	g_prm_flrcl_to_base_rate VARCHAR2(10);
	g_floor_ceiling_default VARCHAR2(10);
  g_prm_pik_component VARCHAR2(10);
  g_prm_old_mat_date Date;
	g_media_priority_visited VARCHAR2(10);
	g_media_visit_count NUMBER;
   g_prm_val_rec VARCHAR2(10);
  g_p_split_no number;
	g_prm_calender_date Date;
	g_prm_part_share_visited VARCHAR2(10);
	g_rounding_rule_change VARCHAR2(1);
	
		FUNCTION Fn_insert_int_comp
  -- (p_split_no IN NUMBER, P_PRODUCT IN VARCHAR2)--09-SEP-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 QC#71 CITIBLR#35442 changes
  (p_split_no IN NUMBER,
   p_product IN VARCHAR2,
   p_wrk_lbdcorol     IN OUT lbpks_lbdcorol_main.ty_lbdcorol,
   p_Err_Code         IN OUT VARCHAR2,
   p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
		
		  FUNCTION FN_INSERT_MARGIN_COMP(p_split_no    number,
                                 P_PRODUCT     varchar2,
                                 p_wrk_lbdcorol     IN OUT lbpks_lbdcorol_main.ty_lbdcorol,
                                 p_Err_Code         IN OUT VARCHAR2,
                                 p_Err_Params       IN OUT VARCHAR2)
  --(P_SPLIT_NO IN NUMBER, P_PRODUCT IN VARCHAR2)
   RETURN BOOLEAN;
	 	FUNCTION fn_populate_details(p_Source           IN VARCHAR2,
                                 p_Source_Operation IN VARCHAR2,
                                 p_Function_Id      IN VARCHAR2,
                                 p_Action_Code      IN VARCHAR2,
																  p_lbdcorol     IN  lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Prev_lbdcorol     IN  lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_wrk_lbdcorol     IN OUT lbpks_lbdcorol_main.ty_lbdcorol,
                                 p_Err_Code         IN OUT VARCHAR2,
                                 p_Err_Params       IN OUT VARCHAR2)
     RETURN Boolean;
     
     FUNCTION fn_log_override(p_Source       IN VARCHAR2,
                           p_Function_Id  IN VARCHAR2,
                           p_Action_Code  IN VARCHAR2,
                           p_Wrk_lbdcorol     IN OUT lbpks_lbdcorol_Main.ty_lbdcorol,
                           p_Err_Code     IN OUT VARCHAR2,
                           p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;
		 
		 function fn_create_new_version(p_contract_ref_no oltbs_contract.contract_ref_no%type) RETURN BOOLEAN;
		 
		 fUNCTION fn_check_user_prod_restriction(p_product_code IN oltms_product.product_code%TYPE,
                                          p_branch_code  IN oltms_branch.branch_code%TYPE,
                                          p_user_id      IN smtbs_user.user_id%TYPE,
                                          P_err_code     IN OUT VARCHAR2,
                                          p_err_param    IN OUT VARCHAR2)
    RETURN BOOLEAN;
		
		FUNCTION fn_check_batch_status( p_Function_Id      IN VARCHAR)
RETURN BOOLEAN;

	function fn_unlock(p_Source    IN  VARCHAR2,
                                 p_Source_Operation  IN     VARCHAR2,
                                 p_Function_Id       IN     VARCHAR2,
                                 p_Action_Code       IN     VARCHAR2,
                                 p_Child_Function    IN  VARCHAR2,
                                 p_lbdcorol IN   lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Prev_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Wrk_lbdcorol IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Err_Code       IN  OUT VARCHAR2,
                                 p_Err_Params     IN  OUT VARCHAR2)
                                  RETURN BOOLEAN;
																	
	function  fn_CREDIT_LINE (p_Source           IN VARCHAR2,
                             p_Action_Code      IN VARCHAR2,
                              p_Function_Id      IN VARCHAR2,
                              p_Wrk_lbdcorol     IN OUT lbpks_lbdcorol_Main.ty_lbdcorol,
                              p_Err_Code         IN OUT VARCHAR2,
                              p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
		
			function  fn_CLEARING_LINE (p_Source           IN VARCHAR2,
                             p_Action_Code      IN VARCHAR2,
                              p_Function_Id      IN VARCHAR2,
                              p_Wrk_lbdcorol     IN OUT lbpks_lbdcorol_Main.ty_lbdcorol,
                              p_Err_Code         IN OUT VARCHAR2,
                              p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
		
			
	FUNCTION fn_od_liqd_sch_chk(p_Source           IN VARCHAR2,
                             p_Action_Code      IN VARCHAR2,
                              p_Function_Id      IN VARCHAR2,
															p_participant_ref_no IN OUT oltbs_contract_consol_detail.participant_ref_no%type,
                              p_Wrk_lbdcorol     IN OUT lbpks_lbdcorol_Main.ty_lbdcorol,
                              p_Err_Code         IN OUT VARCHAR2,
                              p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
		
		FUNCTION fn_msg_gen(p_Source           IN VARCHAR2,
                                 p_Source_Operation IN VARCHAR2,
                                 p_Function_Id      IN VARCHAR2,
                                 p_Action_Code      IN VARCHAR2,
										             p_wrk_lbdcorol     IN OUT lbpks_lbdcorol_main.ty_lbdcorol,
                                 p_Err_Code         IN OUT VARCHAR2,
                                 p_Err_Params       IN OUT VARCHAR2) 
RETURN BOOLEAN;
		
			function  fn_CHECK_MANDATORY(p_Source       IN VARCHAR2,
		                            p_Action_Code  IN VARCHAR2,
                                p_Function_Id  IN VARCHAR2,
                                p_Wrk_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                p_Err_Code     IN OUT VARCHAR2,
                                p_Err_Params   IN OUT VARCHAR2
                               ) RETURN BOOLEAN;
															 
				function fn_CHECK_DRAWDOWN_INPUT(p_Source       IN VARCHAR2,
		                            p_Action_Code  IN VARCHAR2,
                                p_Function_Id  IN VARCHAR2,
                                p_Wrk_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                p_Err_Code     IN OUT VARCHAR2,
                                p_Err_Params   IN OUT VARCHAR2
                               ) RETURN BOOLEAN;
															 
		PROCEDURE pr_dt_validations_split(p_Source       IN VARCHAR2,
		                            p_Action_Code  IN VARCHAR2,
                                p_Function_Id  IN VARCHAR2,
                                p_Wrk_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                p_Err_Code     IN OUT VARCHAR2,
                                p_Err_Params   IN OUT VARCHAR2
                               );
															 
			PROCEDURE PR_MAT_DT_CHECK_SPLIT(p_Source       IN VARCHAR2,
                                  p_Action_Code  IN VARCHAR2,
                                  p_Function_Id  IN VARCHAR2,
                                  p_Wrk_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                  p_Err_Code     IN OUT VARCHAR2,
                                  p_Err_Params   IN OUT VARCHAR2);
																	
	FUNCTION FN_VALIDATE_SPLIT_RECORD(p_Source           IN VARCHAR2,
                                 p_Source_Operation IN VARCHAR2,
                                 p_Function_Id      IN VARCHAR2,
                                 p_Action_Code      IN VARCHAR2,
														     p_wrk_lbdcorol     IN OUT lbpks_lbdcorol_main.ty_lbdcorol,
                                 p_Err_Code         IN OUT VARCHAR2,
                                 p_Err_Params       IN OUT VARCHAR2) 
		 RETURN BOOLEAN	;
		 
		 
		 	FUNCTION FN_ROLL_VALUE_DT_VALIDATION(p_Source           IN VARCHAR2,
                                 p_Source_Operation IN VARCHAR2,
                                 p_Function_Id      IN VARCHAR2,
                                 p_Action_Code      IN VARCHAR2,
														     p_wrk_lbdcorol     IN OUT lbpks_lbdcorol_main.ty_lbdcorol,
                                 p_Err_Code         IN OUT VARCHAR2,
                                 p_Err_Params       IN OUT VARCHAR2) 
RETURN BOOLEAN;

FUNCTION FN_ROLL_EVENTS_IN_PROD(p_Source           IN VARCHAR2,
                                 p_Source_Operation IN VARCHAR2,
                                 p_Function_Id      IN VARCHAR2,
                                 p_Action_Code      IN VARCHAR2,
														     p_wrk_lbdcorol     IN OUT lbpks_lbdcorol_main.ty_lbdcorol,
                                 p_Err_Code         IN OUT VARCHAR2,
                                 p_Err_Params       IN OUT VARCHAR2)
																  RETURN BOOLEAN;
																	
			FUNCTION Fn_rate_fixing_check(p_Source           IN VARCHAR2,
                                 p_Source_Operation IN VARCHAR2,
                                 p_Function_Id      IN VARCHAR2,
                                 p_Action_Code      IN VARCHAR2,
                                 p_wrk_lbdcorol     IN OUT lbpks_lbdcorol_main.ty_lbdcorol,
                                 p_Err_Code         IN OUT VARCHAR2,
                                 p_Err_Params       IN OUT VARCHAR2) 
RETURN BOOLEAN;

  
  FUNCTION fn_future_sch_chk(p_Source           IN VARCHAR2,
                                 p_Source_Operation IN VARCHAR2,
                                 p_Function_Id      IN VARCHAR2,
                                 p_Action_Code      IN VARCHAR2,
                                 p_participant_ref_no lbtbs_contract_consol_detail.child_ref_no%type,
                                 p_wrk_lbdcorol     IN OUT lbpks_lbdcorol_main.ty_lbdcorol,
                                 p_Err_Code         IN OUT VARCHAR2,
                                 p_Err_Params       IN OUT VARCHAR2)
RETURN BOOLEAN;

  function get_l_pik_margin_exists(contract_ref_no IN LBTBS_CONTRACT_CONSOL_DETAIL.contract_ref_no%type )
    RETURN OLTBS_CONTRACT_MASTER.PIK_MARGIN_PROCESSING_REQD%TYPE;
    
  FUNCTION FN_GET_PRINC_OS_AMT 
(p_contract_ref_no  IN  VARCHAR2,
  p_wrk_lbdcorol     IN OUT lbpks_lbdcorol_main.ty_lbdcorol,
  p_Err_Code         IN OUT VARCHAR2,
 p_Err_Params       IN OUT VARCHAR2)
RETURN NUMBER;

 FUNCTION fn_amount_validations(p_Source           IN VARCHAR2,
                                 p_Source_Operation IN VARCHAR2,
                                 p_Function_Id      IN VARCHAR2,
                                 p_Action_Code      IN VARCHAR2,
                                 p_wrk_lbdcorol     IN OUT lbpks_lbdcorol_main.ty_lbdcorol,
                                 p_Err_Code         IN OUT VARCHAR2,
                                 p_Err_Params       IN OUT VARCHAR2)
 
   RETURN BOOLEAN ;

 PROCEDURE PR_CKH_PART_BORR_SHARE(p_Source       IN VARCHAR2,
                                   p_Function_Id  IN VARCHAR2,
                                   p_Wrk_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                   p_Err_Code     IN OUT VARCHAR2,
                                   p_Err_Params   IN OUT VARCHAR2);
                   
 PROCEDURE PR_CON_MATURITY_DATE_HOLIDAY(p_Source       IN VARCHAR2,
                                         p_Function_Id  IN VARCHAR2,
                                         p_Wrk_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                         p_Err_Code     IN OUT VARCHAR2,
                                         p_Err_Params   IN OUT VARCHAR2,
                                         p_Action_Code  IN VARCHAR2);


 PROCEDURE pr_get_cosmos_ref_no(p_Source       IN VARCHAR2,
                                 p_Function_Id  IN VARCHAR2,
                                 p_Wrk_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Err_Code     IN OUT VARCHAR2,
                                 p_Err_Params   IN OUT VARCHAR2);

 PROCEDURE pr_validate_floor_ceiling(p_Source       IN VARCHAR2,
                                      p_Function_Id  IN VARCHAR2,
                                      p_Wrk_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                      p_Err_Code     IN OUT VARCHAR2,
                                      p_Err_Params   IN OUT VARCHAR2);

 PROCEDURE pr_create_new_version(p_Source       IN VARCHAR2,
                                  p_Function_Id  IN VARCHAR2,
                                  p_Wrk_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                  p_Err_Code     IN OUT VARCHAR2,
                                  p_Err_Params   IN OUT VARCHAR2,
                                  p_Action_Code  IN VARCHAR2);

 PROCEDURE pr_default_from_contract(p_Source       IN VARCHAR2,
                                     p_Function_Id  IN VARCHAR2,
                                     p_Wrk_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                     p_Err_Code     IN OUT VARCHAR2,
                                     p_Err_Params   IN OUT VARCHAR2,
                                     p_Action_Code  IN VARCHAR2);

PROCEDURE PR_VALIDATE_ROLL_NETTING(p_Source       IN VARCHAR2,
                                     p_Function_Id  IN VARCHAR2,
                                     p_Wrk_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                     p_Err_Code     IN OUT VARCHAR2,
                                     p_Err_Params   IN OUT VARCHAR2) ;

PROCEDURE pr_ins_contract_roll_int(p_Source       IN VARCHAR2,
                                     p_Function_Id  IN VARCHAR2,
                                     p_Wrk_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                     p_Err_Code     IN OUT VARCHAR2,
                                     p_Err_Params   IN OUT VARCHAR2);

PROCEDURE PR_SET_IRFX_EXFX_DATE(p_Source       IN VARCHAR2,
                                  p_Function_Id  IN VARCHAR2,
                                  p_Wrk_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                  p_Err_Code     IN OUT VARCHAR2,
                                  p_Err_Params   IN OUT VARCHAR2,
                                  p_Action_Code  IN VARCHAR2);

PROCEDURE Pr_roll_PI_check(p_Source       IN VARCHAR2,
                             p_Function_Id  IN VARCHAR2,
                             p_Wrk_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                             p_Err_Code     IN OUT VARCHAR2,
                             p_Err_Params   IN OUT VARCHAR2);

 PROCEDURE pr_default_int_from_contract(p_Source       IN VARCHAR2,
                                         p_Function_Id  IN VARCHAR2,
                                         p_Wrk_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                         p_Err_Code     IN OUT VARCHAR2,
                                         p_Err_Params   IN OUT VARCHAR2) ;

PROCEDURE pr_maturity_DATE_check(p_Source       IN VARCHAR2,
                                   p_Function_Id  IN VARCHAR2,
                                   p_Wrk_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                   p_Err_Code     IN OUT VARCHAR2,
                                   p_Err_Params   IN OUT VARCHAR2,
                                   p_Action_Code  IN VARCHAR2);

PROCEDURE PR_VALIDATE_CASH_INT_AMT(p_Source       IN VARCHAR2,
                                     p_Function_Id  IN VARCHAR2,
                                     p_Wrk_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                     p_Err_Code     IN OUT VARCHAR2,
                                     p_Err_Params   IN OUT VARCHAR2,
                                     p_Action_Code  IN VARCHAR2);

 PROCEDURE PR_SPT_MATURITY_DATE_HOLIDAY(p_Source       IN VARCHAR2,
                                         p_Action_Code  IN VARCHAR2,
                                         p_Function_Id  IN VARCHAR2,
                                         p_Wrk_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                         p_Err_Code     IN OUT VARCHAR2,
                                         p_Err_Params   IN OUT VARCHAR2);
                     
  PROCEDURE pr_date_validations(p_Source IN VARCHAR2,
                                --p_Action_Code  IN VARCHAR2,
                                p_Function_Id  IN VARCHAR2,
                                p_Wrk_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                p_Err_Code     IN OUT VARCHAR2,
                                p_Err_Params   IN OUT VARCHAR2);
                
 FUNCTION FN_GET_INT_OS_AMT(p_Source IN VARCHAR2,

                             p_Function_Id IN VARCHAR2,
                             p_Action_Code IN VARCHAR2,
                             child_REF_NO  in varchar,

                             p_wrk_lbdcorol IN OUT lbpks_lbdcorol_main.ty_lbdcorol,
                             p_Err_Code     IN OUT VARCHAR2,
                             p_Err_Params   IN OUT VARCHAR2)

    --(p_contract_ref_no  IN  VARCHAR2)
   RETURN NUMBER;

FUNCTION FN_GET_PIK_OS_AMT(p_Source IN VARCHAR2,

                             p_Function_Id IN VARCHAR2,
                             p_Action_Code IN VARCHAR2,
                             child_REF_NO  in varchar2,

                             p_wrk_lbdcorol IN OUT lbpks_lbdcorol_main.ty_lbdcorol,
                             p_Err_Code     IN OUT VARCHAR2,
                             p_Err_Params   IN OUT VARCHAR2)
  /*(p_contract_ref_no  IN  VARCHAR2)*/
   RETURN NUMBER;

 FUNCTION FN_GET_PRINC_OS_AMT(p_contract_ref_no           IN VARCHAR2,

                               p_Function_Id      IN VARCHAR2,
                               p_Action_Code      IN VARCHAR2,


                               p_wrk_lbdcorol     IN OUT lbpks_lbdcorol_main.ty_lbdcorol,
                               p_Err_Code         IN OUT VARCHAR2,
                               p_Err_Params       IN OUT VARCHAR2)

   RETURN NUMBER;

 FUNCTION FN_INTEREST_ROLL_AMT(p_Source           IN VARCHAR2,
                                p_Source_Operation IN VARCHAR2,
                                p_Function_Id      IN VARCHAR2,
                                p_Action_Code      IN VARCHAR2,
                                p_Child_Function   IN VARCHAR2,
                                --p_Multi_Trip_Id    IN VARCHAR2,
                                p_lbdcorol         IN lbpks_lbdcorol_main.ty_lbdcorol,
                                p_prev_lbdcorol    IN lbpks_lbdcorol_main.ty_lbdcorol,
                                p_wrk_lbdcorol     IN OUT lbpks_lbdcorol_main.ty_lbdcorol,
                                p_Err_Code         IN OUT VARCHAR2,
                                p_Err_Params       IN OUT VARCHAR2)
    RETURN NUMBER;

 FUNCTION FN_IRFX_REQ(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_Child_Function   IN VARCHAR2,
                       p_Multi_Trip_Id    IN VARCHAR2,
                       p_lbdcorol         IN lbpks_lbdcorol_main.ty_lbdcorol,
                       p_prev_lbdcorol    IN lbpks_lbdcorol_main.ty_lbdcorol,
                       p_wrk_lbdcorol     IN OUT lbpks_lbdcorol_main.ty_lbdcorol,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2)
  --(P_SPLIT_NO IN Number)
   RETURN boolean ;

 FUNCTION FN_POPULATE_EXRATE_DETAILS(p_Source           IN VARCHAR2,
                                      p_Source_Operation IN VARCHAR2,
                                      p_Function_Id      IN VARCHAR2,
                                      p_Action_Code      IN VARCHAR2,
                                    --  p_Child_Function   IN VARCHAR2,
                                  --    p_Multi_Trip_Id    IN VARCHAR2,
                                      p_lbdcorol         IN lbpks_lbdcorol_main.ty_lbdcorol,
                                      p_prev_lbdcorol    IN lbpks_lbdcorol_main.ty_lbdcorol,
                                      p_wrk_lbdcorol     IN OUT lbpks_lbdcorol_main.ty_lbdcorol,
                                      p_Err_Code         IN OUT VARCHAR2,
                                      p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

FUNCTION FN_TRANCHE_OUTSTANDING
  --( p_tranche_ref cstbs_contract.contract_ref_no%type
    -- , p_value_date date)
  (p_Source           IN VARCHAR2,
   p_Source_Operation IN VARCHAR2,
   p_Function_Id      IN VARCHAR2,
   p_Action_Code      IN VARCHAR2,
   p_Child_Function   IN VARCHAR2,
   p_Multi_Trip_Id    IN VARCHAR2,
   p_lbdcorol         IN lbpks_lbdcorol_main.ty_lbdcorol,
   p_prev_lbdcorol    IN lbpks_lbdcorol_main.ty_lbdcorol,
   p_wrk_lbdcorol     IN OUT lbpks_lbdcorol_main.ty_lbdcorol,
   p_Err_Code         IN OUT VARCHAR2,
   p_Err_Params       IN OUT VARCHAR2) RETURN NUMBER;
   
FUNCTION FN_TRANCHE_CURRLMT_CHK(p_Source           IN VARCHAR2,
                                  p_Source_Operation IN VARCHAR2,
                                  p_Function_Id      IN VARCHAR2,
                                  p_Action_Code      IN VARCHAR2,
                                  p_Child_Function   IN VARCHAR2,
                                  p_Multi_Trip_Id    IN VARCHAR2,
                                  p_lbdcorol         IN lbpks_lbdcorol_main.ty_lbdcorol,
                                  p_prev_lbdcorol    IN lbpks_lbdcorol_main.ty_lbdcorol,
                                  p_wrk_lbdcorol     IN OUT lbpks_lbdcorol_main.ty_lbdcorol,
                                  p_Err_Code         IN OUT VARCHAR2,
                                  p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  
FUNCTION FN_PIK_ROLL_AMT(p_Source           IN VARCHAR2,
                         p_Source_Operation IN VARCHAR2,
                         p_Action_Code IN VARCHAR2,
                         p_wrk_lbdcorol IN OUT lbpks_lbdcorol_main.ty_lbdcorol,
                         p_Err_Code     IN OUT VARCHAR2,
                         p_Err_Params   IN OUT VARCHAR2)

 RETURN NUMBER;


FUNCTION FN_PIK_MARGIN_VALIDATE(p_Source           IN VARCHAR2,
                                  p_Source_Operation IN VARCHAR2,
                                  p_Function_Id      IN VARCHAR2,
                                  p_Action_Code      IN VARCHAR2,
                                  p_Child_Function   IN VARCHAR2,
                                  --p_Multi_Trip_Id    IN VARCHAR2,
                                  p_lbdcorol      IN lbpks_lbdcorol_main.ty_lbdcorol,
                                  p_prev_lbdcorol IN lbpks_lbdcorol_main.ty_lbdcorol,
                                  p_wrk_lbdcorol  IN OUT lbpks_lbdcorol_main.ty_lbdcorol,
                                  p_Err_Code      IN OUT VARCHAR2,
                                  p_Err_Params    IN OUT VARCHAR2)
    RETURN BOOLEAN;

FUNCTION fn_val_consol_rollover_flags( --p_contract_Ref_no varchar2,
                                        -- p_amount          number,
                                        --p_lbdcorol        IN lbpks_lbdcorol_main.ty_lbdcorol,
                                        --p_prev_lbdcorol   IN lbpks_lbdcorol_main.ty_lbdcorol,
                                        p_Source    IN  VARCHAR2,--OBCL_14.4.0_PAST_DUE_TRACKING CHANGE
                                        p_Function_Id       IN     VARCHAR2, --OBCL_14.4.0_PAST_DUE_TRACKING CHANGE
                                        p_wrk_lbdcorol IN OUT lbpks_lbdcorol_main.ty_lbdcorol,
                                        p_Err_Code     IN OUT VARCHAR2,
                                        p_Err_Params   IN OUT VARCHAR2)
  --(p_contract_Ref_no  varchar2,p_amount number)
   RETURN boolean;

FUNCTION Fn_check_future_dated_VAMI(p_Source           IN VARCHAR2,
                                      p_Source_Operation IN VARCHAR2,
                                      p_Function_Id      IN VARCHAR2,
                                      p_Action_Code      IN VARCHAR2,
                                      p_Child_Function   IN VARCHAR2,
                                      p_Multi_Trip_Id    IN VARCHAR2,
                                      p_lbdcorol         IN lbpks_lbdcorol_main.ty_lbdcorol,
                                      p_prev_lbdcorol    IN lbpks_lbdcorol_main.ty_lbdcorol,
                                      p_wrk_lbdcorol     IN OUT lbpks_lbdcorol_main.ty_lbdcorol,
                                      p_Err_Code         IN OUT VARCHAR2,
                                      p_Err_Params       IN OUT VARCHAR2)
  --   (p_param OUT varchar2)
   RETURN BOOLEAN;


FUNCTION fn_future_dated_check(P_con_ref_no   IN Varchar2,
                                 p_cnt_liqd     OUT Varchar2,
                                 p_cnt_liqd1    OUT Varchar2, --FCC V.CL Release 7.3 Oct Rel Changes, Maneeha
                                 p_cnt_vami     OUT Varchar2,
                                 P_error_code   OUT Varchar2,
                                 p_wrk_lbdcorol IN OUT lbpks_lbdcorol_main.ty_lbdcorol

                                 ) RETURN Boolean;

 FUNCTION fn_fwd_proc_and_sgen(p_Source           IN VARCHAR2,
                                p_Source_Operation IN VARCHAR2,
                                p_Function_Id      IN VARCHAR2,
                                p_Action_Code      IN VARCHAR2,
                                p_Child_Function   IN VARCHAR2,
                                p_Multi_Trip_Id    IN VARCHAR2,
                                p_lbdcorol         IN lbpks_lbdcorol_main.ty_lbdcorol,
                                p_prev_lbdcorol    IN lbpks_lbdcorol_main.ty_lbdcorol,
                                p_wrk_lbdcorol     IN OUT lbpks_lbdcorol_main.ty_lbdcorol,
                                p_Err_Code         IN OUT VARCHAR2,
                                p_Err_Params       IN OUT VARCHAR2)

   RETURN BOOLEAN;

FUNCTION FN_GET_OS_AMT(p_contract_ref_no  IN VARCHAR2,
                       
                         p_Function_Id      IN VARCHAR2,
                         p_Action_Code      IN VARCHAR2,
                     
                         p_wrk_lbdcorol     IN OUT lbpks_lbdcorol_main.ty_lbdcorol,
                         p_Err_Code         IN OUT VARCHAR2,
                         p_Err_Params       IN OUT VARCHAR2)

   RETURN NUMBER ;

 FUNCTION FN_PIK_INCR_CALC(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_Child_Function   IN VARCHAR2,
                            --p_Multi_Trip_Id    IN VARCHAR2,
                            p_lbdcorol      IN lbpks_lbdcorol_main.ty_lbdcorol,
                            p_prev_lbdcorol IN lbpks_lbdcorol_main.ty_lbdcorol,
                            p_wrk_lbdcorol  IN OUT lbpks_lbdcorol_main.ty_lbdcorol,
                            p_Err_Code      IN OUT VARCHAR2,
                            p_Err_Params    IN OUT VARCHAR2) RETURN BOOLEAN;

FUNCTION Fn_PIK_validations(p_contract_ref_no  IN VARCHAR2,
                              p_Source_Operation IN VARCHAR2,
                              p_Function_Id      IN VARCHAR2,
                              p_Action_Code      IN VARCHAR2,
                              p_Child_Function   IN VARCHAR2,
                               p_lbdcorol         IN lbpks_lbdcorol_main.ty_lbdcorol,
                              p_prev_lbdcorol    IN lbpks_lbdcorol_main.ty_lbdcorol,
                              p_wrk_lbdcorol     IN OUT lbpks_lbdcorol_main.ty_lbdcorol,
                              p_Err_Code         OUT VARCHAR2,
                              p_Err_Params       OUT VARCHAR2

                              ) RETURN BOOLEAN;

 FUNCTION FN_ROLLOVER_MRG_RATE_PICKUP(p_Source           IN VARCHAR2,
                                       p_Source_Operation IN VARCHAR2,
                                       p_Function_Id      IN VARCHAR2,
                                       p_Action_Code      IN VARCHAR2,
                                       p_Child_Function   IN VARCHAR2,
                                       p_lbdcorol         IN lbpks_lbdcorol_Main.Ty_lbdcorol,
                                       p_Prev_lbdcorol    IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                       p_Wrk_lbdcorol     IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                       p_Err_Code         IN OUT VARCHAR2,
                                       p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

FUNCTION fn_rate_fix_validation(p_contract_ref_no  IN VARCHAR2,
                                  p_Source           IN VARCHAR2,
                                  p_Source_Operation IN VARCHAR2,
                                  p_Function_Id      IN VARCHAR2,
                                  p_Action_Code      IN VARCHAR2,
                                  p_Child_Function   IN VARCHAR2,
                                  --p_Multi_Trip_Id    IN VARCHAR2,
                                  p_lbdcorol      IN lbpks_lbdcorol_main.ty_lbdcorol,
                                  p_prev_lbdcorol IN lbpks_lbdcorol_main.ty_lbdcorol,
                                  p_wrk_lbdcorol  IN OUT lbpks_lbdcorol_main.ty_lbdcorol,
                                  p_Err_Code      IN OUT VARCHAR2,
                                  p_Err_Params    IN OUT VARCHAR2)

   RETURN BOOLEAN ;

 FUNCTION FN_POP_ROLL_INTRATE_DETAILS(p_Source           IN VARCHAR2,
                                       p_Source_Operation IN VARCHAR2,
                                       p_Function_Id      IN VARCHAR2,
                                       p_Action_Code      IN VARCHAR2,
                                     --  p_Child_Function   IN VARCHAR2,
                                       p_lbdcorol         IN lbpks_lbdcorol_main.ty_lbdcorol,
                                       p_wrk_lbdcorol     IN OUT lbpks_lbdcorol_main.ty_lbdcorol,
                                       p_Err_Code         IN OUT VARCHAR2,
                                       p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;


 FUNCTION FN_POP_ROLL_IRFX_DETAILS(p_Source       IN VARCHAR2,
                                    p_Function_Id  IN VARCHAR2,
                                    p_rollOver_product IN OUT oltbs_contract_split_rollover.rollover_product%type,
                                    p_contract_ref_no IN OUT oltbs_contract_split_rollover.contract_ref_no%type,
                                    p_split_no IN OUT oltbs_contract_split_rollover.split_no%type,
                                    p_Wrk_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                    p_Err_Code     IN OUT VARCHAR2,
                                    p_Err_Params   IN OUT VARCHAR2,
                                    p_Action_Code  IN VARCHAR2)
    RETURN BOOLEAN;


 FUNCTION Fn_rollover_rate_pickup(p_Wrk_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                   p_rate_code    OUT VARCHAR2,
                                   p_error_code   IN OUT VARCHAR2,
                                   p_error_param  IN OUT VARCHAR2)
    RETURN BOOLEAN ;

 FUNCTION Fn_rollover_rate_pickup_split(p_crn          IN VARCHAR2,
                                         p_split_no     IN NUMBER,
                                         p_comp         IN VARCHAR2,
                                         p_rate_code    OUT VARCHAR2,
                                         p_Wrk_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                         p_error_code   IN OUT VARCHAR2,
                                         p_error_param  IN OUT VARCHAR2

                                         ) RETURN BOOLEAN;


FUNCTION fn_validate_coll_amount(l_date         date,
                                   p_Source       IN VARCHAR2,
                                   p_Function_Id  IN VARCHAR2,
                                   p_Action_Code  IN VARCHAR2,
                                   p_wrk_lbdcorol IN OUT lbpks_lbdcorol_main.ty_lbdcorol,
                                   p_Err_Code     IN OUT VARCHAR2,
                                   p_Err_Params   IN OUT VARCHAR2)
    RETURN BOOLEAN ;


 FUNCTION FN_RATE_SETTING(p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_Id      IN VARCHAR2,
                           p_Action_Code      IN VARCHAR2,
                           p_Child_Function   IN VARCHAR2,
                           p_lbdcorol         IN lbpks_lbdcorol_Main.Ty_lbdcorol,
                           p_Prev_lbdcorol    IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                           p_Wrk_lbdcorol     IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

FUNCTION fn_rollover(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_Child_Function   IN VARCHAR2,
                       p_lbdcorol         IN lbpks_lbdcorol_Main.Ty_lbdcorol,
                       p_Prev_lbdcorol    IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                       p_Wrk_lbdcorol     IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2)

   RETURN BOOLEAN;

FUNCTION fn_reverse(p_Source           IN VARCHAR2,
                      p_Source_Operation IN VARCHAR2,
                      p_Function_Id      IN VARCHAR2,
                      p_Action_Code      IN VARCHAR2,
                      p_Child_Function   IN VARCHAR2,
                      p_lbdcorol         IN lbpks_lbdcorol_Main.Ty_lbdcorol,
                      p_Prev_lbdcorol    IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                      p_Wrk_lbdcorol     IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                      p_Err_Code         IN OUT VARCHAR2,
                      p_Err_Params       IN OUT VARCHAR2)

   RETURN BOOLEAN ;

 FUNCTION fn_delete(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_Child_Function   IN VARCHAR2,
                     -- p_lbdcorol         IN lbpks_lbdcorol_Main.Ty_lbdcorol,
                     p_Prev_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                     p_Wrk_lbdcorol  IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                     p_Err_Code      IN OUT VARCHAR2,
                     p_Err_Params    IN OUT VARCHAR2)

   RETURN BOOLEAN;

/*  function fn_authorize(p_Source    IN  VARCHAR2,
                                 p_Source_Operation  IN     VARCHAR2,
                                 p_Function_Id       IN     VARCHAR2,
                                 p_Action_Code       IN     VARCHAR2,
                                 p_Child_Function    IN  VARCHAR2,
                                 p_lbdcorol IN   lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Prev_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Wrk_lbdcorol IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Err_Code       IN  OUT VARCHAR2,
                                 p_Err_Params     IN  OUT VARCHAR2)
                                  RETURN BOOLEAN;*/

  function fn_save(p_Source    IN  VARCHAR2,
                                 p_Source_Operation  IN     VARCHAR2,
                                 p_Function_Id       IN     VARCHAR2,
                                 p_Action_Code       IN     VARCHAR2,
                                 p_Child_Function    IN  VARCHAR2,
                                 p_lbdcorol IN   lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Prev_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Wrk_lbdcorol IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Err_Code       IN  OUT VARCHAR2,
                                 p_Err_Params     IN  OUT VARCHAR2)
                                  RETURN BOOLEAN;

function pre_contractCCY(p_Source    IN  VARCHAR2,
                                 p_Source_Operation  IN     VARCHAR2,
                                 p_Function_Id       IN     VARCHAR2,
                                 p_Action_Code       IN     VARCHAR2,
                                 p_Child_Function    IN  VARCHAR2,
                                 p_lbdcorol IN   lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Prev_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Wrk_lbdcorol IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Err_Code       IN  OUT VARCHAR2,
                                 p_Err_Params     IN  OUT VARCHAR2)
                                  RETURN BOOLEAN;


function fn_validation_on_counterParty(p_Source    IN  VARCHAR2,
                                 p_Source_Operation  IN     VARCHAR2,
                                 p_Function_Id       IN     VARCHAR2,
                                 p_Action_Code       IN     VARCHAR2,
                                 p_Child_Function    IN  VARCHAR2,
                                 p_lbdcorol IN   lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Prev_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Wrk_lbdcorol IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Err_Code       IN  OUT VARCHAR2,
                                 p_Err_Params     IN  OUT VARCHAR2)
                                  RETURN BOOLEAN;

function fn_on_product_change(p_Source    IN  VARCHAR2,
                                 p_Source_Operation  IN     VARCHAR2,
                                 p_Function_Id       IN     VARCHAR2,
                                 p_Action_Code       IN     VARCHAR2,
                                 p_Child_Function    IN  VARCHAR2,
                                 p_lbdcorol IN   lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Prev_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Wrk_lbdcorol IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Err_Code       IN  OUT VARCHAR2,
                                 p_Err_Params     IN  OUT VARCHAR2)
                                  RETURN BOOLEAN;

function fn_value_date_validation(p_Source    IN  VARCHAR2,
                                 p_Source_Operation  IN     VARCHAR2,
                                 p_Function_Id       IN     VARCHAR2,
                                 p_Action_Code       IN     VARCHAR2,
                                 p_Child_Function    IN  VARCHAR2,
                                 p_lbdcorol IN   lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Prev_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Wrk_lbdcorol IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Err_Code       IN  OUT VARCHAR2,
                                 p_Err_Params     IN  OUT VARCHAR2)
                                  RETURN BOOLEAN;

function fn_intRate_fixing_validation(p_Source    IN  VARCHAR2,
                                 p_Source_Operation  IN     VARCHAR2,
                                 p_Function_Id       IN     VARCHAR2,
                                 p_Action_Code       IN     VARCHAR2,
                                 p_Child_Function    IN  VARCHAR2,
                                 p_lbdcorol IN   lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Prev_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Wrk_lbdcorol IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Err_Code       IN  OUT VARCHAR2,
                                 p_Err_Params     IN  OUT VARCHAR2)
                                  RETURN BOOLEAN;

function fn_extRate_fixing_validation(p_Source    IN  VARCHAR2,
                                 p_Source_Operation  IN     VARCHAR2,
                                 p_Function_Id       IN     VARCHAR2,
                                 p_Action_Code       IN     VARCHAR2,
                                 p_Child_Function    IN  VARCHAR2,
                                 p_lbdcorol IN   lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Prev_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Wrk_lbdcorol IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Err_Code       IN  OUT VARCHAR2,
                                 p_Err_Params     IN  OUT VARCHAR2)
                                  RETURN BOOLEAN;

  function fn_validate_maturity_date(p_Source    IN  VARCHAR2,
                                 p_Source_Operation  IN     VARCHAR2,
                                 p_Function_Id       IN     VARCHAR2,
                                 p_Action_Code       IN     VARCHAR2,
                                 p_Child_Function    IN  VARCHAR2,
                                 p_lbdcorol IN   lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Prev_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Wrk_lbdcorol IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Err_Code       IN  OUT VARCHAR2,
                                 p_Err_Params     IN  OUT VARCHAR2)
                                  RETURN BOOLEAN;

  function fn_validate_tranche(p_Source    IN  VARCHAR2,
                                 p_Source_Operation  IN     VARCHAR2,
                                 p_Function_Id       IN     VARCHAR2,
                                 p_Action_Code       IN     VARCHAR2,
                                 p_Child_Function    IN  VARCHAR2,
                                 p_lbdcorol IN   lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Prev_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Wrk_lbdcorol IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Err_Code       IN  OUT VARCHAR2,
                                 p_Err_Params     IN  OUT VARCHAR2)
                                  RETURN BOOLEAN;

	function fn_validate_participant_ref(p_Source    IN  VARCHAR2,
                                 p_Source_Operation  IN     VARCHAR2,
                                 p_Function_Id       IN     VARCHAR2,
                                 p_Action_Code       IN     VARCHAR2,
                                 p_Child_Function    IN  VARCHAR2,
                                 p_lbdcorol IN   lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Prev_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Wrk_lbdcorol IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Err_Code       IN  OUT VARCHAR2,
                                 p_Err_Params     IN  OUT VARCHAR2)
                                  RETURN BOOLEAN;

function fn_validate_principal_rollamt(p_Source    IN  VARCHAR2,
                                 p_Source_Operation  IN     VARCHAR2,
                                 p_Function_Id       IN     VARCHAR2,
                                 p_Action_Code       IN     VARCHAR2,
                                 p_Child_Function    IN  VARCHAR2,
                                 p_lbdcorol IN   lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Prev_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Wrk_lbdcorol IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Err_Code       IN  OUT VARCHAR2,
                                 p_Err_Params     IN  OUT VARCHAR2)
                                  RETURN BOOLEAN;

function fn_validate_rollOverAmt(p_Source    IN  VARCHAR2,
                                 p_Source_Operation  IN     VARCHAR2,
                                 p_Function_Id       IN     VARCHAR2,
                                 p_Action_Code       IN     VARCHAR2,
                                 p_Child_Function    IN  VARCHAR2,
                                 p_lbdcorol IN   lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Prev_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Wrk_lbdcorol IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Err_Code       IN  OUT VARCHAR2,
                                 p_Err_Params     IN  OUT VARCHAR2)
                                  RETURN BOOLEAN;

function fn_validate_CashIntAmount(p_Source    IN  VARCHAR2,
                                 p_Source_Operation  IN     VARCHAR2,
                                 p_Function_Id       IN     VARCHAR2,
                                 p_Action_Code       IN     VARCHAR2,
                                 p_Child_Function    IN  VARCHAR2,
                                 p_lbdcorol IN   lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Prev_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Wrk_lbdcorol IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Err_Code       IN  OUT VARCHAR2,
                                 p_Err_Params     IN  OUT VARCHAR2)
                                  RETURN BOOLEAN;

function fn_validate_Rate(p_Source    IN  VARCHAR2,
                                 p_Source_Operation  IN     VARCHAR2,
                                 p_Function_Id       IN     VARCHAR2,
                                 p_Action_Code       IN     VARCHAR2,
                                 p_Child_Function    IN  VARCHAR2,
                                 p_lbdcorol IN   lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Prev_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Wrk_lbdcorol IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Err_Code       IN  OUT VARCHAR2,
                                 p_Err_Params     IN  OUT VARCHAR2)
                                  RETURN BOOLEAN;

function fn_validate_MarginRate(p_Source    IN  VARCHAR2,
                                 p_Source_Operation  IN     VARCHAR2,
                                 p_Function_Id       IN     VARCHAR2,
                                 p_Action_Code       IN     VARCHAR2,
                                 p_Child_Function    IN  VARCHAR2,
                                 p_lbdcorol IN   lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Prev_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Wrk_lbdcorol IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Err_Code       IN  OUT VARCHAR2,
                                 p_Err_Params     IN  OUT VARCHAR2)
                                  RETURN BOOLEAN;

function fn_validate_rollOverProduct(p_Source    IN  VARCHAR2,
                                 p_Source_Operation  IN     VARCHAR2,
                                 p_Function_Id       IN     VARCHAR2,
                                 p_Action_Code       IN     VARCHAR2,
                                 p_Child_Function    IN  VARCHAR2,
                                 p_lbdcorol IN   lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Prev_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Wrk_lbdcorol IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Err_Code       IN  OUT VARCHAR2,
                                 p_Err_Params     IN  OUT VARCHAR2)
                                  RETURN BOOLEAN;

function fn_validate_split_p_rollamt(p_Source    IN  VARCHAR2,
                                 p_Source_Operation  IN     VARCHAR2,
                                 p_Function_Id       IN     VARCHAR2,
                                 p_Action_Code       IN     VARCHAR2,
                                 p_Child_Function    IN  VARCHAR2,
                                 p_lbdcorol IN   lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Prev_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Wrk_lbdcorol IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Err_Code       IN  OUT VARCHAR2,
                                 p_Err_Params     IN  OUT VARCHAR2)
                                  RETURN BOOLEAN;

	function fn_validate_split_maxrollamt(p_Source    IN  VARCHAR2,
                                 p_Source_Operation  IN     VARCHAR2,
                                 p_Function_Id       IN     VARCHAR2,
                                 p_Action_Code       IN     VARCHAR2,
                                 p_Child_Function    IN  VARCHAR2,
                                 p_lbdcorol IN   lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Prev_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Wrk_lbdcorol IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Err_Code       IN  OUT VARCHAR2,
                                 p_Err_Params     IN  OUT VARCHAR2)
                                  RETURN BOOLEAN;


function fn_validate_split_matDate(p_Source    IN  VARCHAR2,
                                 p_Source_Operation  IN     VARCHAR2,
                                 p_Function_Id       IN     VARCHAR2,
                                 p_Action_Code       IN     VARCHAR2,
                                 p_Child_Function    IN  VARCHAR2,
                                 p_lbdcorol IN   lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Prev_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Wrk_lbdcorol IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Err_Code       IN  OUT VARCHAR2,
                                 p_Err_Params     IN  OUT VARCHAR2)
                                  RETURN BOOLEAN;

	function fn_validate_splitRate(p_Source    IN  VARCHAR2,
                                 p_Source_Operation  IN     VARCHAR2,
                                 p_Function_Id       IN     VARCHAR2,
                                 p_Action_Code       IN     VARCHAR2,
                                 p_Child_Function    IN  VARCHAR2,
                                 p_lbdcorol IN   lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Prev_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Wrk_lbdcorol IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Err_Code       IN  OUT VARCHAR2,
                                 p_Err_Params     IN  OUT VARCHAR2)
                                  RETURN BOOLEAN;

	function fn_validate_SplitMarRate(p_Source    IN  VARCHAR2,
                                 p_Source_Operation  IN     VARCHAR2,
                                 p_Function_Id       IN     VARCHAR2,
                                 p_Action_Code       IN     VARCHAR2,
                                 p_Child_Function    IN  VARCHAR2,
                                 p_lbdcorol IN   lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Prev_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Wrk_lbdcorol IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Err_Code       IN  OUT VARCHAR2,
                                 p_Err_Params     IN  OUT VARCHAR2)
                                  RETURN BOOLEAN;

function fn_onConsolidationTypeChange(p_Source    IN  VARCHAR2,
                                 p_Source_Operation  IN     VARCHAR2,
                                 p_Function_Id       IN     VARCHAR2,
                                 p_Action_Code       IN     VARCHAR2,
                                 p_Child_Function    IN  VARCHAR2,
                                 p_lbdcorol IN   lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Prev_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Wrk_lbdcorol IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Err_Code       IN  OUT VARCHAR2,
                                 p_Err_Params     IN  OUT VARCHAR2)
                                  RETURN BOOLEAN;																										 													 												 
		
																			
			function fn_onRollOverAmountTypeChange(p_Source    IN  VARCHAR2,
                                 p_Source_Operation  IN     VARCHAR2,
                                 p_Function_Id       IN     VARCHAR2,
                                 p_Action_Code       IN     VARCHAR2,
                                 p_Child_Function    IN  VARCHAR2,
                                 p_lbdcorol IN   lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Prev_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Wrk_lbdcorol IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Err_Code       IN  OUT VARCHAR2,
                                 p_Err_Params     IN  OUT VARCHAR2)
                                  RETURN BOOLEAN;																	
		
function fn_onScheduleBasisChange(p_Source    IN  VARCHAR2,
                                 p_Source_Operation  IN     VARCHAR2,
                                 p_Function_Id       IN     VARCHAR2,
                                 p_Action_Code       IN     VARCHAR2,
                                 p_Child_Function    IN  VARCHAR2,
                                 p_lbdcorol IN   lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Prev_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Wrk_lbdcorol IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
                                 p_Err_Code       IN  OUT VARCHAR2,
                                 p_Err_Params     IN  OUT VARCHAR2)
                                  RETURN BOOLEAN;				
																	
function fn_onInterestBasisChange(p_Source    IN  VARCHAR2,
                                                           p_Source_Operation  IN     VARCHAR2,
                                                           p_Function_Id       IN     VARCHAR2,
                                                           p_Action_Code       IN     VARCHAR2,
                                                            p_Child_Function    IN  VARCHAR2,
                                                            p_lbdcorol IN   lbpks_lbdcorol_Main.Ty_lbdcorol,
                                                            p_Prev_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                                            p_Wrk_lbdcorol IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
                                                            p_Err_Code       IN  OUT VARCHAR2,
                                                            p_Err_Params     IN  OUT VARCHAR2)
                                                            RETURN BOOLEAN;			
																														
	function fn_onRollOverMethodChange(p_Source    IN  VARCHAR2,
                                                           p_Source_Operation  IN     VARCHAR2,
                                                           p_Function_Id       IN     VARCHAR2,
                                                           p_Action_Code       IN     VARCHAR2,
                                                            p_Child_Function    IN  VARCHAR2,
                                                            p_lbdcorol IN   lbpks_lbdcorol_Main.Ty_lbdcorol,
                                                            p_Prev_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                                            p_Wrk_lbdcorol IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
                                                            p_Err_Code       IN  OUT VARCHAR2,
                                                            p_Err_Params     IN  OUT VARCHAR2)
                                                            RETURN BOOLEAN;			
																														
	function fn_onDefContractChange(p_Source    IN  VARCHAR2,
                                                           p_Source_Operation  IN     VARCHAR2,
                                                           p_Function_Id       IN     VARCHAR2,
                                                           p_Action_Code       IN     VARCHAR2,
                                                            p_Child_Function    IN  VARCHAR2,
                                                            p_lbdcorol IN   lbpks_lbdcorol_Main.Ty_lbdcorol,
                                                            p_Prev_lbdcorol IN OUT lbpks_lbdcorol_Main.Ty_lbdcorol,
                                                            p_Wrk_lbdcorol IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
                                                            p_Err_Code       IN  OUT VARCHAR2,
                                                            p_Err_Params     IN  OUT VARCHAR2)
                                                            RETURN BOOLEAN;								
																														
 FUNCTION Fn_Upload         (p_Source            IN VARCHAR2,
                              p_Source_Operation  IN     VARCHAR2,
                              p_Function_Id       IN     VARCHAR2,
                              p_Action_Code       IN     VARCHAR2,
      p_lbdcorol     IN  lbpks_lbdcorol_Main.Ty_lbdcorol,
      p_Prev_lbdcorol     IN  lbpks_lbdcorol_Main.Ty_lbdcorol,
      p_Wrk_lbdcorol      IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
      p_Err_Code          IN OUT VARCHAR2,
      p_Err_Params        IN OUT VARCHAR2)
   RETURN BOOLEAN ;		
	 
	FUNCTION Fn_post_new         (p_Source            IN VARCHAR2,
                              p_Source_Operation  IN     VARCHAR2,
                              p_Function_Id       IN     VARCHAR2,
                              p_Action_Code       IN     VARCHAR2,
      p_lbdcorol     IN  lbpks_lbdcorol_Main.Ty_lbdcorol,
      p_Prev_lbdcorol     IN  lbpks_lbdcorol_Main.Ty_lbdcorol,
      p_Wrk_lbdcorol      IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
      p_Err_Code          IN OUT VARCHAR2,
      p_Err_Params        IN OUT VARCHAR2)
   RETURN BOOLEAN; 
   
   
   	FUNCTION Fn_post_rollOver_prodChange        (p_Source            IN VARCHAR2,
                              p_Source_Operation  IN     VARCHAR2,
                              p_Function_Id       IN     VARCHAR2,
                              p_Action_Code       IN     VARCHAR2,
      p_lbdcorol     IN  lbpks_lbdcorol_Main.Ty_lbdcorol,
      p_Prev_lbdcorol     IN  lbpks_lbdcorol_Main.Ty_lbdcorol,
      p_Wrk_lbdcorol      IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
      p_Err_Code          IN OUT VARCHAR2,
      p_Err_Params        IN OUT VARCHAR2)
   RETURN BOOLEAN; 
	 

	 
	 	  FUNCTION Fn_authorize (p_Source            IN VARCHAR2,
                              p_Source_Operation  IN     VARCHAR2,
                              p_Function_Id       IN     VARCHAR2,
                              p_Action_Code       IN     VARCHAR2,
      p_lbdcorol     IN  lbpks_lbdcorol_Main.Ty_lbdcorol,
      p_Prev_lbdcorol     IN  lbpks_lbdcorol_Main.Ty_lbdcorol,
      p_Wrk_lbdcorol      IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
			p_Wrk_lbdcorau  IN OUT lbpks_lbdcorau_Main.ty_lbdcorau,
      p_Err_Code          IN OUT VARCHAR2,
      p_Err_Params        IN OUT VARCHAR2)
   RETURN BOOLEAN ;
	 
	 
	 
	 	  FUNCTION Fn_part_share_callform (p_Source            IN VARCHAR2,
                              p_Source_Operation  IN     VARCHAR2,
                              p_Function_Id       IN     VARCHAR2,
                              p_Action_Code       IN     VARCHAR2,
      p_lbdcorol     IN  lbpks_lbdcorol_Main.Ty_lbdcorol,
      p_Prev_lbdcorol     IN  lbpks_lbdcorol_Main.Ty_lbdcorol,
      p_Wrk_lbdcorol      IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
			
      p_Err_Code          IN OUT VARCHAR2,
      p_Err_Params        IN OUT VARCHAR2)
   RETURN BOOLEAN ;
	 
	   FUNCTION Fn_exrateFixing_callform (p_Source            IN VARCHAR2,
                              p_Source_Operation  IN     VARCHAR2,
                              p_Function_Id       IN     VARCHAR2,
                              p_Action_Code       IN     VARCHAR2,
      p_lbdcorol     IN  lbpks_lbdcorol_Main.Ty_lbdcorol,
      p_Prev_lbdcorol     IN  lbpks_lbdcorol_Main.Ty_lbdcorol,
      p_Wrk_lbdcorol      IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
		
      p_Err_Code          IN OUT VARCHAR2,
      p_Err_Params        IN OUT VARCHAR2)
   RETURN BOOLEAN ;
	 
	   FUNCTION Fn_media_callform (p_Source            IN VARCHAR2,
                              p_Source_Operation  IN     VARCHAR2,
                              p_Function_Id       IN     VARCHAR2,
                              p_Action_Code       IN     VARCHAR2,
      p_lbdcorol     IN  lbpks_lbdcorol_Main.Ty_lbdcorol,
      p_Prev_lbdcorol     IN  lbpks_lbdcorol_Main.Ty_lbdcorol,
      p_Wrk_lbdcorol      IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
			
      p_Err_Code          IN OUT VARCHAR2,
      p_Err_Params        IN OUT VARCHAR2)
   RETURN BOOLEAN ;
	 
	   FUNCTION Fn_nRateFixing_callform (p_Source            IN VARCHAR2,
                              p_Source_Operation  IN     VARCHAR2,
                              p_Function_Id       IN     VARCHAR2,
                              p_Action_Code       IN     VARCHAR2,
      p_lbdcorol     IN  lbpks_lbdcorol_Main.Ty_lbdcorol,
      p_Prev_lbdcorol     IN  lbpks_lbdcorol_Main.Ty_lbdcorol,
      p_Wrk_lbdcorol      IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
		
      p_Err_Code          IN OUT VARCHAR2,
      p_Err_Params        IN OUT VARCHAR2)
   RETURN BOOLEAN ;
	 
	 
	 	   FUNCTION Fn_nRateSetting_callform (p_Source            IN VARCHAR2,
                              p_Source_Operation  IN     VARCHAR2,
                              p_Function_Id       IN     VARCHAR2,
                              p_Action_Code       IN     VARCHAR2,
      p_lbdcorol     IN  lbpks_lbdcorol_Main.Ty_lbdcorol,
      p_Prev_lbdcorol     IN  lbpks_lbdcorol_Main.Ty_lbdcorol,
      p_Wrk_lbdcorol      IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
			
      p_Err_Code          IN OUT VARCHAR2,
      p_Err_Params        IN OUT VARCHAR2)
   RETURN BOOLEAN ;
	 
	    FUNCTION Fn_nMargin_populate (p_Source            IN VARCHAR2,
                              p_Source_Operation  IN     VARCHAR2,
                              p_Function_Id       IN     VARCHAR2,
                              p_Action_Code       IN     VARCHAR2,
      p_lbdcorol     IN  lbpks_lbdcorol_Main.Ty_lbdcorol,
      p_Prev_lbdcorol     IN  lbpks_lbdcorol_Main.Ty_lbdcorol,
      p_Wrk_lbdcorol      IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
			
      p_Err_Code          IN OUT VARCHAR2,
      p_Err_Params        IN OUT VARCHAR2)
   RETURN BOOLEAN ;
	 
	     FUNCTION Fn_srate_fixing (p_Source            IN VARCHAR2,
                              p_Source_Operation  IN     VARCHAR2,
                              p_Function_Id       IN     VARCHAR2,
                              p_Action_Code       IN     VARCHAR2,
      p_lbdcorol     IN  lbpks_lbdcorol_Main.Ty_lbdcorol,
      p_Prev_lbdcorol     IN  lbpks_lbdcorol_Main.Ty_lbdcorol,
      p_Wrk_lbdcorol      IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
		
      p_Err_Code          IN OUT VARCHAR2,
      p_Err_Params        IN OUT VARCHAR2)
   RETURN BOOLEAN ;
	 
	  FUNCTION Fn_sIntrate_fixing (p_Source            IN VARCHAR2,
                              p_Source_Operation  IN     VARCHAR2,
                              p_Function_Id       IN     VARCHAR2,
                              p_Action_Code       IN     VARCHAR2,
      p_lbdcorol     IN  lbpks_lbdcorol_Main.Ty_lbdcorol,
      p_Prev_lbdcorol     IN  lbpks_lbdcorol_Main.Ty_lbdcorol,
      p_Wrk_lbdcorol      IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
		
      p_Err_Code          IN OUT VARCHAR2,
      p_Err_Params        IN OUT VARCHAR2)
   RETURN BOOLEAN ;
	 
	 	  FUNCTION Fn_sIntrate_setting (p_Source            IN VARCHAR2,
                              p_Source_Operation  IN     VARCHAR2,
                              p_Function_Id       IN     VARCHAR2,
                              p_Action_Code       IN     VARCHAR2,
      p_lbdcorol     IN  lbpks_lbdcorol_Main.Ty_lbdcorol,
      p_Prev_lbdcorol     IN  lbpks_lbdcorol_Main.Ty_lbdcorol,
      p_Wrk_lbdcorol      IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
			
      p_Err_Code          IN OUT VARCHAR2,
      p_Err_Params        IN OUT VARCHAR2)
   RETURN BOOLEAN ;
   
    FUNCTION Fn_Post_Query_lbcintsh  ( p_Source    IN  VARCHAR2,
                                 p_Source_Operation  IN     VARCHAR2,
                                 p_Function_Id       IN     VARCHAR2,
                                 p_Action_Code       IN     VARCHAR2,
         p_Child_Function    IN  VARCHAR2,
         p_Full_Data     IN  VARCHAR2 DEFAULT 'Y',
         p_With_Lock     IN  VARCHAR2 DEFAULT 'N',
         p_QryData_Reqd IN  VARCHAR2 ,
         p_lbdcorol IN   lbpks_lbdcorol_Main.Ty_lbdcorol,
         p_Wrk_lbdcorol IN OUT   lbpks_lbdcorol_Main.Ty_lbdcorol,
         p_Err_Code          IN OUT VARCHAR2,
         p_Err_Params        IN OUT VARCHAR2)
      RETURN BOOLEAN;
      
       FUNCTION Fn_det_assign_values_lbcintsh (p_Source            IN VARCHAR2,
                              p_Source_Operation  IN     VARCHAR2,
                              p_Function_Id       IN     VARCHAR2,
                              p_Action_Code       IN     VARCHAR2,
      p_lbdcorol     IN  lbpks_lbdcorol_Main.Ty_lbdcorol,
    
      p_Wrk_lbdcorol      IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
			
      p_Err_Code          IN OUT VARCHAR2,
      p_Err_Params        IN OUT VARCHAR2)
   RETURN BOOLEAN ;
   
    FUNCTION Fn_pop_part_share_amt_lbcintsh (p_Source            IN VARCHAR2,
                              p_Source_Operation  IN     VARCHAR2,
                              p_Function_Id       IN     VARCHAR2,
                              p_Action_Code       IN     VARCHAR2,
      p_lbdcorol     IN  lbpks_lbdcorol_Main.Ty_lbdcorol,
     
      p_Wrk_lbdcorol      IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
			
      p_Err_Code          IN OUT VARCHAR2,
      p_Err_Params        IN OUT VARCHAR2)
   RETURN BOOLEAN ;
   
   FUNCTION Fn_Upload_lbcintsh         (p_Source            IN VARCHAR2,
                              p_Source_Operation  IN     VARCHAR2,
                              p_Function_Id       IN     VARCHAR2,
                              p_Action_Code       IN     VARCHAR2,
      p_lbdcorol     IN  lbpks_lbdcorol_Main.Ty_lbdcorol,
     
      p_Wrk_lbdcorol      IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
      p_Err_Code          IN OUT VARCHAR2,
      p_Err_Params        IN OUT VARCHAR2)
   RETURN BOOLEAN ;
   
   
      FUNCTION Fn_Validate_lbcintsh         (p_Source            IN VARCHAR2,
                              p_Source_Operation  IN     VARCHAR2,
                              p_Function_Id       IN     VARCHAR2,
                              p_Action_Code       IN     VARCHAR2,
      p_lbdcorol     IN  lbpks_lbdcorol_Main.Ty_lbdcorol,
     
      p_Wrk_lbdcorol      IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
      p_Err_Code          IN OUT VARCHAR2,
      p_Err_Params        IN OUT VARCHAR2)
   RETURN BOOLEAN ;
   
   
    FUNCTION Fn_Validate_lbcrtset         (p_Source            IN VARCHAR2,
                              p_Source_Operation  IN     VARCHAR2,
                              p_Function_Id       IN     VARCHAR2,
                              p_Action_Code       IN     VARCHAR2,
      p_lbdcorol     IN  lbpks_lbdcorol_Main.Ty_lbdcorol,
     
      p_Wrk_lbdcorol      IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
      p_Err_Code          IN OUT VARCHAR2,
      p_Err_Params        IN OUT VARCHAR2)
   RETURN BOOLEAN ;
   
   
      FUNCTION Fn_Post_Query_lbcrtset  ( p_Source    IN  VARCHAR2,
                                 p_Source_Operation  IN     VARCHAR2,
                                 p_Function_Id       IN     VARCHAR2,
                                 p_Action_Code       IN     VARCHAR2,
         p_Child_Function    IN  VARCHAR2,
         p_Full_Data     IN  VARCHAR2 DEFAULT 'Y',
         p_With_Lock     IN  VARCHAR2 DEFAULT 'N',
         p_QryData_Reqd IN  VARCHAR2 ,
         p_lbdcorol IN   lbpks_lbdcorol_Main.Ty_lbdcorol,
         p_Wrk_lbdcorol IN OUT   lbpks_lbdcorol_Main.Ty_lbdcorol,
         p_Err_Code          IN OUT VARCHAR2,
         p_Err_Params        IN OUT VARCHAR2)
      RETURN BOOLEAN;
      
        FUNCTION Fn_Post_Query_lbcroifx  ( p_Source    IN  VARCHAR2,
                                 p_Source_Operation  IN     VARCHAR2,
                                 p_Function_Id       IN     VARCHAR2,
                                 p_Action_Code       IN     VARCHAR2,
         p_Child_Function    IN  VARCHAR2,
         p_Full_Data     IN  VARCHAR2 DEFAULT 'Y',
         p_With_Lock     IN  VARCHAR2 DEFAULT 'N',
         p_QryData_Reqd IN  VARCHAR2 ,
         p_lbdcorol IN   lbpks_lbdcorol_Main.Ty_lbdcorol,
         p_Wrk_lbdcorol IN OUT   lbpks_lbdcorol_Main.Ty_lbdcorol,
         p_Err_Code          IN OUT VARCHAR2,
         p_Err_Params        IN OUT VARCHAR2)
      RETURN BOOLEAN;
   
    FUNCTION Fn_Validate_lbcroifx        (p_Source            IN VARCHAR2,
                              p_Source_Operation  IN     VARCHAR2,
                              p_Function_Id       IN     VARCHAR2,
                              p_Action_Code       IN     VARCHAR2,
      p_lbdcorol     IN  lbpks_lbdcorol_Main.Ty_lbdcorol,
      p_Fcc_Ref          IN VARCHAR2,
      p_Wrk_lbdcorol      IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
      p_Err_Code          IN OUT VARCHAR2,
      p_Err_Params        IN OUT VARCHAR2)
   RETURN BOOLEAN ;
   
      FUNCTION Fn_upload_lbcroifx        (p_Source            IN VARCHAR2,
                              p_Source_Operation  IN     VARCHAR2,
                              p_Function_Id       IN     VARCHAR2,
                              p_Action_Code       IN     VARCHAR2,
      p_lbdcorol     IN  lbpks_lbdcorol_Main.Ty_lbdcorol,
      
      p_Wrk_lbdcorol      IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
      p_Err_Code          IN OUT VARCHAR2,
      p_Err_Params        IN OUT VARCHAR2)
   RETURN BOOLEAN ;
   
      FUNCTION fn_date_validation_lbcroifx(p_Source         IN Cotms_Source.Source_Code%TYPE,
                              p_Function_Id    IN VARCHAR2,
                              p_Fcc_Ref        IN VARCHAR2,
                              p_effective_date IN DATE,
                              p_tenor_value    IN OUT NUMBER,
                              p_tenor_unit     IN OUT VARCHAR2,
                              p_eff_end_date   IN OUT DATE,
                              p_Wrk_lbdcorol IN OUT   lbpks_lbdcorol_Main.Ty_lbdcorol,
                              p_err_code       IN OUT VARCHAR2,
                              p_err_prms       IN OUT VARCHAR2) 
   RETURN BOOLEAN ;
   
    FUNCTION Fn_upload_lbcexrfx        (p_Source            IN VARCHAR2,
                              p_Source_Operation  IN     VARCHAR2,
                              p_Function_Id       IN     VARCHAR2,
                              p_Action_Code       IN     VARCHAR2,
      p_lbdcorol     IN  lbpks_lbdcorol_Main.Ty_lbdcorol,
      
      p_Wrk_lbdcorol      IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
      p_Err_Code          IN OUT VARCHAR2,
      p_Err_Params        IN OUT VARCHAR2)
   RETURN BOOLEAN ;
   
    FUNCTION Fn_upload_lbcrtset        (p_Source            IN VARCHAR2,
                              p_Source_Operation  IN     VARCHAR2,
                              p_Function_Id       IN     VARCHAR2,
                              p_Action_Code       IN     VARCHAR2,
      p_lbdcorol     IN  lbpks_lbdcorol_Main.Ty_lbdcorol,
      
      p_Wrk_lbdcorol      IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
      p_Err_Code          IN OUT VARCHAR2,
      p_Err_Params        IN OUT VARCHAR2)
   RETURN BOOLEAN ;
   
--LS14.1 ECA Changes starts

  Function fn_roll_a_contract_over_wrap(p_Wrk_lbdcorol      IN OUT  lbpks_lbdcorol_Main.Ty_lbdcorol,
                                        p_error_code   IN OUT VARCHAR2,
                                        p_error_param  IN OUT VARCHAR2)
    RETURN BOOLEAN;
--LS14.1 ECA Changes ends 
  
  --OBCL_14.5_LS_Gateway_Changes#2 Start
  FUNCTION fn_auto_auth(p_Source            IN VARCHAR2,
                        p_Source_Operation  IN VARCHAR2,
                        p_Function_Id       IN VARCHAR2,
                        p_Action_Code       IN VARCHAR2,
                        p_lbdcorol          IN lbpks_lbdcorol_main.ty_lbdcorol,
                        p_Prev_lbdcorol     IN lbpks_lbdcorol_main.ty_lbdcorol,
                        p_Wrk_lbdcorol      IN OUT lbpks_lbdcorol_main.ty_lbdcorol,
                        p_Err_Code          IN OUT VARCHAR2,
                        p_Err_Params        IN OUT VARCHAR2) 
  RETURN BOOLEAN; 
  --OBCL_14.5_LS_Gateway_Changes#2 End
   
																																																																																															
		

end lbpks_lbdcorol_utils;
/
CREATE OR REPLACE SYNONYM lbpkss_lbdcorol_utils FOR lbpks_lbdcorol_utils
/