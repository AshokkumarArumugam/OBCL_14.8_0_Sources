create or replace package lbpks_lbdptfr_utils as

 /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdptfr_utils.spc
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

  SFR Number         : 27953929
  Changed By         : Krithika G
  Change Description : LS-ELCM Block changes in PRAM
  Search String		 : OBCL_27953929
  
  
  SFR Number         : Issue No : 47
  Changed By         : Krithika G
  Change Description : DD Block Changes when DD Limit Track is Y and Tranche Limit Track is N
  Search String		 : OBCL_14.1_DD_Block_Changes
  
  Changed By         : Sowmya Bitra
  Changed On         : 25-Mar-2021
  Change Description : Auto Authorization changes
  Search String      : OBCL_LS_Auto_Auth
  -------------------------------------------------------------------------------------------------------
  */
  
Function fn_new_Vals ( p_contract_ref_no   in       oltbs_contract.contract_ref_no%TYPE,
					   p_Wrk_lbdptfr       IN	OUT	lbpks_lbdptfr_Main.Ty_lbdptfr,
					   p_err_code 		   IN OUT   VARCHAR2,
					   p_err_param   	   IN OUT 	VARCHAR2) RETURN BOOLEAN;

Function fn_lbdptfr_delete (   p_contract_ref_no   in       oltbs_contract.contract_ref_no%TYPE,
				       p_Wrk_lbdptfr       IN		lbpks_lbdptfr_Main.Ty_lbdptfr,
					   p_err_code 		   IN OUT   VARCHAR2,
					   p_err_param   	   IN OUT 	VARCHAR2) RETURN BOOLEAN;

Function fn_lbdptfr_vals_for_auth(p_Source       IN VARCHAR2,
                           p_Function_Id  IN VARCHAR2,
                           p_Action_Code  IN VARCHAR2,
                           p_contract_ref_no  IN  oltbs_contract.contract_ref_no%type,
                           p_value_date       IN  lbtw_transfer_master.value_date%type,
                           p_entry_seq_no    IN  lbtw_transfer_master.entry_seq_no%type,
                           p_Err_Code     IN OUT VARCHAR2,
                           p_Err_Param   IN OUT VARCHAR2) RETURN BOOLEAN;

FUNCTION fn_default_asset_amount(p_Source           IN VARCHAR2,
                   p_Source_Operation IN VARCHAR2,
                   p_Function_Id      IN VARCHAR2,
                   p_Action_Code      IN VARCHAR2,
                   p_Child_Function   IN VARCHAR2,
                   p_lbdptfr         IN lbpks_lbdptfr_main.ty_lbdptfr,
                   p_prev_lbdptfr    IN OUT lbpks_lbdptfr_main.ty_lbdptfr,
                   p_wrk_lbdptfr     IN OUT lbpks_lbdptfr_main.ty_lbdptfr,
                   p_Err_Code         IN OUT VARCHAR2,
                   p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

FUNCTION fn_save_tw(p_Source           IN VARCHAR2,
                   p_Source_Operation IN VARCHAR2,
                   p_Function_Id      IN VARCHAR2,
                   p_Action_Code      IN VARCHAR2,
                   p_Child_Function   IN VARCHAR2,
                   p_lbdptfr         IN lbpks_lbdptfr_main.ty_lbdptfr,
                   p_prev_lbdptfr    IN  lbpks_lbdptfr_main.ty_lbdptfr,
                   p_wrk_lbdptfr     IN OUT lbpks_lbdptfr_main.ty_lbdptfr,
                   p_Err_Code         IN OUT VARCHAR2,
                   p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;                   

Function fn_lbdptfr_vals	(  	p_Wrk_lbdptfr       IN	OUT	lbpks_lbdptfr_Main.Ty_lbdptfr,
								p_err_code 		   IN OUT   VARCHAR2,
								p_err_param   	   IN OUT 	VARCHAR2) RETURN BOOLEAN;

 FUNCTION Fn_Sys_Query_tw( p_Source  IN VARCHAR2,
                              p_Source_Operation IN VARCHAR2,
                              p_Function_Id IN VARCHAR2,
                              p_Action_Code IN VARCHAR2,
                              p_lbdptfr IN lbpks_lbdptfr_main.ty_lbdptfr,
                              p_Wrk_lbdptfr  IN OUT lbpks_lbdptfr_main.ty_lbdptfr,
                              p_Err_Code IN OUT VARCHAR2,
                              p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;
FUNCTION Fn_Sys_Query_tb( p_Source  IN VARCHAR2,
                              p_Source_Operation IN VARCHAR2,
                              p_Function_Id IN VARCHAR2,
                              p_Action_Code IN VARCHAR2,
                              p_lbdptfr IN lbpks_lbdptfr_main.ty_lbdptfr,
                              p_Wrk_lbdptfr  IN OUT lbpks_lbdptfr_main.ty_lbdptfr,
                              p_Err_Code IN OUT VARCHAR2,
                              p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;
                                                            
Function fn_get_participant_name (p_customerno  IN VARCHAR2) RETURN VARCHAR2;
Function fn_get_entity_name (p_entity  IN VARCHAR2) RETURN VARCHAR2;    
Function fn_asset_amt_calc (p_wrk_lbdptfr     IN OUT lbpks_lbdptfr_main.ty_lbdptfr,
                   p_Err_Code         IN OUT VARCHAR2,
                   p_Err_Params       IN OUT VARCHAR2,
                   p_borr_amt       IN OUT  NUMBER) RETURN BOOLEAN;
                   
PROCEDURE pr_copy_components  (	p_product_code  in  varchar2,
								p_Wrk_lbdptfr       IN		lbpks_lbdptfr_Main.Ty_lbdptfr
							   );
FUNCTION fn_populate_consol_block( p_Source  IN VARCHAR2,
                              p_Source_Operation IN VARCHAR2,
                              p_Function_Id IN VARCHAR2,
                              p_Action_Code IN VARCHAR2,
                              p_lbdptfr IN lbpks_lbdptfr_main.ty_lbdptfr,
                              p_Wrk_lbdptfr  IN OUT lbpks_lbdptfr_main.ty_lbdptfr,
                              p_Err_Code IN OUT VARCHAR2,
                              p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;   
FUNCTION fn_populate_maintab( p_Source  IN VARCHAR2,
                              p_Source_Operation IN VARCHAR2,
                              p_Function_Id IN VARCHAR2,
                              p_Action_Code IN VARCHAR2,
                              p_lbdptfr IN lbpks_lbdptfr_main.ty_lbdptfr,
                              p_Wrk_lbdptfr  IN OUT lbpks_lbdptfr_main.ty_lbdptfr,
                              p_Err_Code IN OUT VARCHAR2,
                              p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;
Function fn_lbdptfr_reverse	(  	p_contract_ref_no   IN       oltbs_contract.contract_ref_no%TYPE,
								p_Wrk_lbdptfr       IN	OUT	lbpks_lbdptfr_Main.Ty_lbdptfr,
								p_err_code 		   IN OUT   VARCHAR2,
								p_err_param   	   IN OUT 	VARCHAR2) RETURN BOOLEAN;   

FUNCTION fn_assign_transfer_status( p_Source  IN VARCHAR2,
                              p_Source_Operation IN VARCHAR2,
                              p_Function_Id IN VARCHAR2,
                              p_Action_Code IN VARCHAR2,
                              p_lbdptfr IN lbpks_lbdptfr_main.ty_lbdptfr,
                              p_Wrk_lbdptfr  IN OUT lbpks_lbdptfr_main.ty_lbdptfr,
                              p_Err_Code IN OUT VARCHAR2,
                              p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;                                                                                                                                                     
  
FUNCTION fn_log_override(p_Source       IN VARCHAR2,
                           p_Function_Id  IN VARCHAR2,
                           p_Action_Code  IN VARCHAR2,
                           p_wrk_lbdptfr      IN OUT lbpks_lbdptfr_main.ty_lbdptfr,
                           p_Err_Code     IN OUT VARCHAR2,
                           p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;
FUNCTION Fn_Query_HFS_Transfer (p_Wrk_lbdptfr IN OUT lbpks_lbdptfr_Main.Ty_lbdptfr,
                                    p_err_code    IN OUT VARCHAR2,
                                    p_err_param   IN OUT VARCHAR2)
    RETURN BOOLEAN;    

--OBCL_27953929 
FUNCTION Fn_Block_Multi_Linkages(p_Action_Code      IN VARCHAR2,
                      p_lbdptfr          IN lbpks_lbdptfr_main.ty_lbdptfr,
                      p_prev_lbdptfr     IN lbpks_lbdptfr_main.ty_lbdptfr,
                      p_wrk_lbdptfr      IN OUT lbpks_lbdptfr_main.ty_lbdptfr,
                      p_Err_Code         IN OUT VARCHAR2,
                      p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
--OBCL_27953929	

--OBCL_14.1_DD_Block_Changes
FUNCTION Fn_DD_Block_Multi_Linkages(p_contract_ref_no  IN oltbs_contract.CONTRACT_REF_NO%TYPE,
                                   p_version_no      IN oltbs_contract.LATEST_VERSION_NO%TYPE,
                                   p_event_seq_no     IN oltbs_contract.LATEST_EVENT_SEQ_NO%TYPE,
                                   p_Err_Code     IN OUT VARCHAR2,
                                   p_Err_Params   IN OUT VARCHAR2)
    RETURN BOOLEAN;
--OBCL_14.1_DD_Block_Changes

--OBCL_LS_Auto_Auth Changes Start
FUNCTION fn_set_auto_auth(p_Source       IN VARCHAR2,
                          p_Action_Code  IN VARCHAR2,
                          p_Function_Id  IN VARCHAR2,
                          p_wrk_lbdptfr  IN OUT lbpks_lbdptfr_main.ty_lbdptfr,
                          p_Err_Code     IN OUT VARCHAR2,
                          p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;
--OBCL_LS_Auto_Auth Changes End
--14.5_PARTICIPANT_LIMIT_CHANGES  STARTS

FUNCTION fn_populate_linkage_details(p_Source           IN VARCHAR2,
                                    p_Source_Operation IN VARCHAR2,
                                    p_Function_Id      IN VARCHAR2,
                                    p_Action_Code      IN VARCHAR2,
                                    p_lbdptfr          IN lbpks_lbdptfr_main.ty_lbdptfr,
                                    p_Wrk_lbdptfr      IN OUT lbpks_lbdptfr_main.ty_lbdptfr,
                                    p_Err_Code         IN OUT VARCHAR2,
                                    p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
--14.5_PARTICIPANT_LIMIT_CHANGES ends


--14.5_PARTICIPANT_LIMIT_CHANGES  STARTS

FUNCTION fn_populate_noncasc_details(p_Source           IN VARCHAR2,
                                    p_Source_Operation IN VARCHAR2,
                                    p_Function_Id      IN VARCHAR2,
                                    p_Action_Code      IN VARCHAR2,
                                    p_lbdptfr          IN lbpks_lbdptfr_main.ty_lbdptfr,
                                    p_Wrk_lbdptfr      IN OUT lbpks_lbdptfr_main.ty_lbdptfr,
                                    p_Err_Code         IN OUT VARCHAR2,
                                    p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
--14.5_PARTICIPANT_LIMIT_CHANGES ends
End lbpks_lbdptfr_utils;
 
/
create or replace synonym lbpkss_lbdptfr_utils for lbpks_lbdptfr_utils
/