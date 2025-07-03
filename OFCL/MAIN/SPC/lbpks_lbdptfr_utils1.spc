create or replace package lbpks_lbdptfr_utils1 as
 /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdptfr_utils1.spc
  **
  ** Module     : LB
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved
  **
  **
  ** No part of this work may be reproduced, stored in a retrieval system, adopted
  ** or transmitted in any form or by any means, electronic, mechanical,
  ** photographic, graphic, optic recording or otherwise, translated in any
  ** language or computer language, without the prior written permission of
  ** Oracle and/or its affiliates.
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
  
  Changed By         : Jayaram N
  Date               : 07-Apr-2020
  Change Description : SLT:Primary Delayed Compensation
  Search String      : OBCL14.4:SFR#29959798:LOR_Adjustments
  
  Changed By         : Ramya M
  Date               : 27-MAR-2021
  Change Description : Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R724 FS Vol2 Tag03 Changes
  Search String      : OBCL_14.5_LS_Swingline_Enhancement_Changes
  
    Changed By         : Pallavi R
    Changed On         : 10-Aug-2022
    Change Reason      : Changes done to recalculate the fee calc table for PRAM
    Search String      : OBCL_14.5_RABO_#34343382 Changes  

    Changed By         : Narendra Dhaker
    Changed On         : 12-Dec-2022
    Change Reason      : LBSSTPIB-> ESN NO IS NOT DISPLAYED FOR THE FLIQ
    Search String      : Bug#34848816

    Changed By         : Mohan Pal
    Changed On         : 13-Jun-2023
    Change Reason      : declaring global variable g_ptfr_check
    Search String      : Bug#35384672
	
  -------------------------------------------------------------------------------------------------------
  */
--g_Event VARCHAR2(20); --OBCL_14.5_RABO_#34343382 Changes --Bug#34848816 code commented
g_ptfr_check varchar2(1):= 'N';---Bug#35384672 added
g_Event VARCHAR2(20) :='****'; --Bug#34848816 code added
  G_CASC_VALUE VARCHAR2(1); 
Function fn_check_entity ( 	p_Wrk_lbdptfr      IN OUT	lbpks_lbdptfr_Main.Ty_lbdptfr,
							p_err_code 		   IN OUT   VARCHAR2,
							p_err_param   	   IN OUT 	VARCHAR2) RETURN BOOLEAN;

Function fn_date_validations ( 	p_Wrk_lbdptfr      IN OUT	lbpks_lbdptfr_Main.Ty_lbdptfr,
								p_err_code 		   IN OUT   VARCHAR2,
								p_err_param   	   IN OUT 	VARCHAR2) RETURN BOOLEAN;

Function fn_get_ccy ( p_contract_ref_no  IN VARCHAR2) RETURN VARCHAR2;

Function fn_check_transfer_details ( 	p_Wrk_lbdptfr      IN OUT	lbpks_lbdptfr_Main.Ty_lbdptfr,
										p_err_code 		   IN OUT   VARCHAR2,
										p_err_param   	   IN OUT 	VARCHAR2) RETURN BOOLEAN;

Function fn_check_component_ratio ( 	p_Wrk_lbdptfr      IN OUT	lbpks_lbdptfr_Main.Ty_lbdptfr,
										p_err_code 		   IN OUT   VARCHAR2,
										p_err_param   	   IN OUT 	VARCHAR2) RETURN BOOLEAN;

Function fn_slt_stp_validation ( 	p_Wrk_lbdptfr      IN OUT	lbpks_lbdptfr_Main.Ty_lbdptfr,
									p_err_code 		   IN OUT   VARCHAR2,
									p_err_param   	   IN OUT 	VARCHAR2) RETURN BOOLEAN;

FUNCTION FN_GTEMP_VALIDATION ( 	p_Wrk_lbdptfr      IN OUT	lbpks_lbdptfr_Main.Ty_lbdptfr,
								p_err_code 		   IN OUT   VARCHAR2,
								p_err_param   	   IN OUT 	VARCHAR2) RETURN BOOLEAN;

Function fn_consol_validation ( 	p_Wrk_lbdptfr      IN OUT 	lbpks_lbdptfr_Main.Ty_lbdptfr,
									p_err_code 		   IN OUT   VARCHAR2,
									p_err_param   	   IN OUT 	VARCHAR2) RETURN BOOLEAN;

FUNCTION FN_VAL_PART_MARGIN (	p_Wrk_lbdptfr      IN OUT	lbpks_lbdptfr_Main.Ty_lbdptfr,
								p_err_code 		   IN OUT   VARCHAR2,
								p_err_param   	   IN OUT 	VARCHAR2) RETURN BOOLEAN;

FUNCTION fn_check_prime_contracts (
								p_Wrk_lbdptfr      IN OUT 	lbpks_lbdptfr_Main.Ty_lbdptfr,
								p_err_code 		   IN OUT   VARCHAR2,
								p_err_param   	   IN OUT 	VARCHAR2) RETURN BOOLEAN;

Function fn_lbdptfr_save (p_Action_Code      IN VARCHAR2,
  p_contract_ref_no   IN       oltbs_contract.contract_ref_no%TYPE,
							p_Wrk_lbdptfr       IN OUT	 lbpks_lbdptfr_Main.Ty_lbdptfr,
							p_err_code 		    IN OUT   VARCHAR2,
							p_err_param   	    IN OUT 	VARCHAR2) RETURN BOOLEAN;

TYPE param_struct is RECORD (
		PRAM_JOB							cstbs_param.param_val%TYPE,
		IGNORE_PRAM_ON_ACQD_DD				cstbs_param.param_val%TYPE,
		TRANSFER_FEE_COMP					cstbs_param.param_val%TYPE,
		cascade_flag						oltbs_contract_master.cascade_participation%TYPE,
		pram_fee							VARCHAR2(1),
		pickup								VARCHAR2(1),
		prm_pram_allwd_sf					oltbs_loan_param_detail.param_value%TYPE);

ty_param 	param_struct;

Function fn_calc_avl_amt ( 	p_action_code		IN		VARCHAR2,
							p_Wrk_lbdptfr       IN OUT	lbpks_lbdptfr_Main.Ty_lbdptfr,
							p_err_code 		    IN OUT  VARCHAR2,
							p_err_param   	    IN OUT 	VARCHAR2) RETURN BOOLEAN;

Function fn_initialize ( p_wrk_lbdptfr     IN lbpks_lbdptfr_Main.Ty_lbdptfr) RETURN BOOLEAN;
Function fn_get_cascade_flag ( p_contract_ref_no  IN VARCHAR2) RETURN VARCHAR2;
FUNCTION fn_calc_asr_new(	p_wrk_lbdptfr	IN OUT   lbpks_lbdptfr_Main.Ty_lbdptfr,
						p_err_code		IN OUT	 VARCHAR2,
						p_err_param		IN OUT	 VARCHAR2)
RETURN BOOLEAN;
Function fn_validate_value_dt_wvi ( 	p_action_code		IN		VARCHAR2,
									p_Wrk_lbdptfr       IN OUT	lbpks_lbdptfr_Main.Ty_lbdptfr,
									p_err_code 		    IN OUT  VARCHAR2,
									p_err_param   	    IN OUT 	VARCHAR2) RETURN BOOLEAN;
FUNCTION FN_get_ticket_id ( p_Wrk_lbdptfr      IN OUT	lbpks_lbdptfr_Main.Ty_lbdptfr,
							p_ticket_id		   	  OUT   VARCHAR2,
							p_err_code 		   IN OUT   VARCHAR2,
							p_err_param   	   IN OUT 	VARCHAR2) RETURN BOOLEAN; 	
--OBCL14.4:SFR#29959798:LOR_Adjustments - Start                            
Function fn_LOR_Adj_calc ( 	p_Wrk_lbdptfr      IN OUT 	lbpks_lbdptfr_Main.Ty_lbdptfr,
							p_err_code 		   IN OUT   VARCHAR2,
							p_err_param   	   IN OUT 	VARCHAR2) RETURN BOOLEAN; 
                                    
Function fn_LOR_Adj_validation ( p_Wrk_lbdptfr      IN OUT 	lbpks_lbdptfr_Main.Ty_lbdptfr,
								p_err_code 		   IN OUT   VARCHAR2,
								p_err_param   	   IN OUT 	VARCHAR2) RETURN BOOLEAN;
                                
Function fn_LOR_Adj_insert_tbl ( 	p_Wrk_lbdptfr      IN OUT 	lbpks_lbdptfr_Main.Ty_lbdptfr,
                                    p_err_code 		   IN OUT   VARCHAR2,
                                    p_err_param   	   IN OUT 	VARCHAR2) RETURN BOOLEAN;
                                                                     
--OBCL14.4:SFR#29959798:LOR_Adjustments - End

--OBCL_14.5_LS_Swingline_Enhancement_changes
FUNCTION FN_VALIDATE_PRAM_AMOUNT (/*p_Source  IN VARCHAR2,
                              p_Source_Operation IN VARCHAR2,
                              p_Function_Id IN VARCHAR2,
                              p_Action_Code IN VARCHAR2,
                              p_lbdptfr IN lbpks_lbdptfr_main.ty_lbdptfr,*/
                              p_Wrk_lbdptfr  IN OUT lbpks_lbdptfr_main.ty_lbdptfr,
                              p_Err_Code IN OUT VARCHAR2,
                              p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;
							  --OBCL_14.5_LS_Swingline_Enhancement_changes ends
END lbpks_lbdptfr_utils1;
/
create or replace synonym lbpkss_lbdptfr_utils1 for lbpks_lbdptfr_utils1
/