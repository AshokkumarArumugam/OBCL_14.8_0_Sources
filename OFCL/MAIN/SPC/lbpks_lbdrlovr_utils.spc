CREATE OR REPLACE PACKAGE lbpks_lbdrlovr_utils is
/*-----------------------------------------------------------------------------------------------------
    **
    ** File Name  : lbpks_lbdrlovr_utils.spc
    **
    ** Module     : Syndication Loans and Commitments
    **
    ** This source is part of the Oracle Banking Software Product.
    ** Oracle Banking Corporate Lending  Software Product.   Copyright ? 2018.  All rights reserved
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
	
  **Changed By         : RAMYA M
  **Date               : 09-OCT-2024
  **Change Description : LS_Version_rollover_amend_changes
  **Search String      : BUG#37143176_OBCL_14.8_LS_Version_rollover_amend_changes
  
  **Changed By         : RAMYA M
  **Date               : 28-OCT-2024
  **Change Description : BUG#37166393 CHANGES
  **Search String      : BUG#37166393 CHANGES

  **Changed By         : Sowmya Bitra
  **Date               : 07-NOV-2024
  **Change Description : Version Rollover Reversal Changes for LS
  **Search String      : OBCL_14.8_LS_Version_Rollover_Revv changes
  
  **Changed By         : Jayaram N
  **Date               : 04-Dec-2024
  **Change Description : LBDRLOVR - CROSS CCY - EX RATE NOT FIXED 
  **Search String      : Bug#37297149
  
  **Changed By         : Jayaram N
  **Date               : 16-Jan-2025
  **Change Description : LBDRLOVR - ROLL IS NOT ALLOWED - POST PAMB REVERSAL 
  **Search String      : Bug#37396117
    -------------------------------------------------------------------------------------------------------*/
    p_Revv_Bkp_Version Oltbs_Contract_Version_Roll.Bk_Version_No%TYPE := NULL; --OBCL_14.8_LS_Version_Rollover_Revv changes
	
	p_cross_ccy_vers_roll varchar2(1);	--Bug#37297149:Added
	p_Ls_version_roll varchar2(1);	--Bug#37396117:Added
	
    FUNCTION fn_populate_os_amnt(p_Source         IN VARCHAR2,
                                 p_Function_id    IN VARCHAR2,
                                 p_wrk_lbdrlovr   IN OUT lbpks_lbdrlovr_main.ty_lbdrlovr,
                                 p_Err_Code       IN OUT VARCHAR2,
                                 p_Err_Params     IN OUT VARCHAR2) RETURN BOOLEAN;
   
    FUNCTION fn_default_main(p_Source         IN VARCHAR2,
                             p_Function_id    IN VARCHAR2,
                             p_wrk_lbdrlovr   IN OUT lbpks_lbdrlovr_main.ty_lbdrlovr,
                             p_Err_Code       IN OUT VARCHAR2,
                             p_Err_Params     IN OUT VARCHAR2) RETURN BOOLEAN;                                 
                             
    FUNCTION fn_save_roll_instr(p_Source      IN VARCHAR2,
                             p_Function_id    IN VARCHAR2,
                             p_wrk_lbdrlovr   IN OUT lbpks_lbdrlovr_main.ty_lbdrlovr,
                             p_Err_Code       IN OUT VARCHAR2,
                             p_Err_Params     IN OUT VARCHAR2) RETURN BOOLEAN;
    FUNCTION fn_populate_Desc(p_Source    IN VARCHAR2,
                         p_Function_id    IN VARCHAR2,
                         p_lbdrlovr       IN lbpks_lbdrlovr_main.ty_lbdrlovr,
                         p_query_reqd     IN VARCHAR2,
                         p_wrk_lbdrlovr   IN OUT lbpks_lbdrlovr_main.ty_lbdrlovr,
                         p_Err_Code       IN OUT VARCHAR2,
                         p_Err_Params     IN OUT VARCHAR2) RETURN BOOLEAN;   
---BUG#37143176_OBCL_14.8_LS_Version_rollover_amend_changes starts
    FUNCTION fn_Amend_ver_instr(p_Source         IN VARCHAR2,
                              p_Function_id    IN VARCHAR2,
                              p_action_code    IN VARCHAR2,
                              p_lbdrlovr  IN  lbpks_lbdrlovr_main.ty_lbdrlovr,
                              p_wrk_lbdrlovr   IN OUT lbpks_lbdrlovr_main.ty_lbdrlovr,
                              p_Err_Code       IN OUT VARCHAR2,
                              p_Err_Params     IN OUT VARCHAR2) 
           RETURN BOOLEAN ;				
---BUG#37143176_OBCL_14.8_LS_Version_rollover_amend_changes ENDS	

--BUG#37166393 changes starts						 
    FUNCTION fn_default_cont_int_basis
    (
                              p_action            IN VARCHAR2,
                              p_wrk_lbdrlovr   IN OUT lbpks_lbdrlovr_main.ty_lbdrlovr,
                              p_Err_Code        IN OUT VARCHAR2,
                              p_Err_Params      IN OUT VARCHAR2)
        RETURN BOOLEAN;                                                

   FUNCTION fn_default_cont_settl_basis
    (
                              p_action            IN VARCHAR2,
                              p_wrk_lbdrlovr   IN OUT lbpks_lbdrlovr_main.ty_lbdrlovr,
                              p_Err_Code        IN OUT VARCHAR2,
                              p_Err_Params      IN OUT VARCHAR2)
        RETURN BOOLEAN ;      
  
  --BUG#37166393 changes ends	

    --OBCL_14.8_LS_Version_Rollover_Revv changes start 
    function fn_process_ver_roll(p_contract_ref_no   IN Oltbs_Contract.Contract_Ref_No%TYPE,
                            p_roll_src_ref_no   IN Oltbs_contract_version_roll.roll_src_ref_no%TYPE,
                            p_value_date        IN DATE,
                            p_batch             IN VARCHAR2,
                            p_action            IN VARCHAR2,
                            p_Err_Code          IN OUT VARCHAR2,
                            p_Err_Params        IN OUT VARCHAR2) return boolean;
                            

    FUNCTION Fn_Reverse_Ver_Roll(p_Source           IN VARCHAR2,
                               p_Source_Operation IN VARCHAR2,
                               p_Function_Id      IN VARCHAR2,
                               p_Action_Code      IN VARCHAR2,
                               p_Child_Function   IN VARCHAR2,
                               p_Multi_Trip_Id    IN VARCHAR2,
                               p_lbdrlovr         IN Lbpks_lbdrlovr_Main.Ty_lbdrlovr,
                               p_Prev_lbdrlovr    IN Lbpks_lbdrlovr_Main.Ty_lbdrlovr,
                               p_Wrk_lbdrlovr     IN OUT Lbpks_lbdrlovr_Main.Ty_lbdrlovr,
                               p_Err_Code         IN OUT VARCHAR2,
                               p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
    --OBCL_14.8_LS_Version_Rollover_Revv changes end  
	
	--Bug#37297149:Changes Starts here
	 FUNCTION Fn_Cross_Ccy_Ver_Roll(p_contract_ref_no   IN Oltbs_Contract.Contract_Ref_No%TYPE,
                            p_roll_src_ref_no   IN Oltbs_contract_version_roll.roll_src_ref_no%TYPE,                           
                            p_action            IN VARCHAR2,
                            p_Err_Code          IN OUT VARCHAR2,
                            p_Err_Params        IN OUT VARCHAR2) return boolean;
	--Bug#37297149:Changes Ends here						
							
END lbpks_lbdrlovr_utils;
/
CREATE OR REPLACE SYNONYM lbpkss_lbdrlovr_utils FOR lbpks_lbdrlovr_utils
/