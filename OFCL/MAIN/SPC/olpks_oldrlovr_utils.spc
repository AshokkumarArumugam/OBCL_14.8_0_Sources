create or replace package olpks_oldrlovr_utils is
/*-----------------------------------------------------------------------------------------------------
    **
    ** File Name  : olpks_oldrlovr_utils.sql
    **
    ** Module     : Loans and Deposits
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
	
	  CHANGE HISTORY:
	  **Changed By         : Satheesh seshan
	  **Date               : 30-July-2024
	  **Change Description : Version Rollover delete amend changes
	  **Search String      : OBCL_14.8_VER_ROLL_REVERSE CHANGES
 
      CHANGE HISTORY:
	  **Changed By         : RAMYA M
	  **Date               : 30-July-2024
	  **Change Description : Version Rollover delete amend changes
	  **Search String      : OBCL_14.8_VERSION_ROLL_DEL_AMEND CHANGES
 
  **Changed By         : Palainsamy M
  **Date               : 13-NOV-2024
  **Change Description : Version Rollover Reversal Changes for OL
  **Search String      : OBCL_14.8_OL_Version_Rollover_Revv changes	  

  **Changed By         : Ramya M
  **Date               : 27-NOV-2024
  **Change Description : Fix provided to enable defaulting Iccf and settlement basis based on product or contract
  **Search String      : Bug#37278089   
    -------------------------------------------------------------------------------------------------------*/
    function fn_populate_os_amnt(p_Source         IN VARCHAR2,
                              p_Function_id    IN VARCHAR2,
                              p_wrk_oldrlovr   IN OUT olpks_oldrlovr_main.ty_oldrlovr,
                              p_Err_Code       IN OUT VARCHAR2,
                              p_Err_Params     IN OUT VARCHAR2) return boolean;
                              
    function fn_default_main(p_Source         IN VARCHAR2,
                             p_Function_id    IN VARCHAR2,
                             p_wrk_oldrlovr   IN OUT olpks_oldrlovr_main.ty_oldrlovr,
                             p_Err_Code       IN OUT VARCHAR2,
                             p_Err_Params     IN OUT VARCHAR2) return boolean;
    function fn_save_roll_instr(p_Source         IN VARCHAR2,
                             p_Function_id    IN VARCHAR2,
                             p_wrk_oldrlovr   IN OUT olpks_oldrlovr_main.ty_oldrlovr,
                             p_Err_Code       IN OUT VARCHAR2,
                             p_Err_Params     IN OUT VARCHAR2) return boolean;
    function fn_populate_Desc(p_Source         IN VARCHAR2,
                         p_Function_id    IN VARCHAR2,
                         p_oldrlovr       IN olpks_oldrlovr_main.ty_oldrlovr,
                         p_query_reqd     in varchar2,
                         p_wrk_oldrlovr   IN OUT olpks_oldrlovr_main.ty_oldrlovr,
                         p_Err_Code       IN OUT VARCHAR2,
                         p_Err_Params     IN OUT VARCHAR2) return boolean;
    function fn_process_ver_roll(p_contract_ref_no   IN Oltbs_Contract.Contract_Ref_No%TYPE,
                            p_roll_src_ref_no   IN Oltbs_contract_version_roll.roll_src_ref_no%TYPE,
                            p_value_date        IN DATE,
                            p_batch             IN VARCHAR2,
                            p_action            IN VARCHAR2,
                            p_Err_Code          IN OUT VARCHAR2,
                            p_Err_Params        IN OUT VARCHAR2) return boolean;
    function fn_populate_for_rfr(p_Source         IN VARCHAR2,
                              p_Function_id    IN VARCHAR2,
                              p_wrk_oldrlovr   IN OUT olpks_oldrlovr_main.ty_oldrlovr,
                              p_Err_Code       IN OUT VARCHAR2,
                              p_Err_Params     IN OUT VARCHAR2) return boolean;
  
--OBCL_14.8_VERSION_ROLL_DEL_AMEND STARTS
    Function fn_Amend_ver_instr(p_Source         IN VARCHAR2,
                              p_Function_id    IN VARCHAR2,
                              p_action_code    IN VARCHAR2,
                               p_oldrlovr  IN  olpks_oldrlovr_main.ty_oldrlovr,
                              p_wrk_oldrlovr   IN OUT olpks_oldrlovr_main.ty_oldrlovr,
                              p_Err_Code       IN OUT VARCHAR2,
                              p_Err_Params     IN OUT VARCHAR2) RETURN BOOLEAN;
							  
 FUNCTION fn_reverse_del_ver_roll(p_contract_ref_no IN Oltbs_Contract.Contract_Ref_No%TYPE,
                              p_roll_src_ref_no IN Oltbs_contract_version_roll.roll_src_ref_no%TYPE,
                              p_Err_Code        IN OUT VARCHAR2,
                              p_Err_Params      IN OUT VARCHAR2) 
           RETURN BOOLEAN ;
 --OBCL_14.8_VERSION_ROLL_DEL_AMEND  ENDS
 --OBCL_14.8_VER_ROLL_REVERSE CHANGES STARTS
    function fn_reverse_ver_roll(p_contract_ref_no   IN Oltbs_Contract.Contract_Ref_No%TYPE,
                            p_roll_src_ref_no   IN Oltbs_contract_version_roll.roll_src_ref_no%TYPE,
                            p_Err_Code          IN OUT VARCHAR2,
                            p_Err_Params        IN OUT VARCHAR2) return boolean;
 --OBCL_14.8_VER_ROLL_REVERSE CHANGES ENDS
 --OBCL_14.8_OL_Version_Rollover_Revv changes start
 FUNCTION Fn_Reverse_Ver_Roll(p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_Id      IN VARCHAR2,
                           p_Action_Code      IN VARCHAR2,
                           p_Oldrlovr         IN Olpks_Oldrlovr_Main.Ty_Oldrlovr,
                           p_Prev_Oldrlovr    IN Olpks_Oldrlovr_Main.Ty_Oldrlovr,
                           p_Wrk_Oldrlovr     IN OUT Olpks_Oldrlovr_Main.Ty_Oldrlovr,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  --OBCL_14.8_OL_Version_Rollover_Revv changes end
  
  --Bug#37278089 STARTS
     FUNCTION fn_default_cont_int_basis
    (
                              p_action            IN VARCHAR2,
                              p_wrk_oldrlovr   IN OUT olpks_oldrlovr_main.ty_oldrlovr,
                              p_Err_Code        IN OUT VARCHAR2,
                              p_Err_Params      IN OUT VARCHAR2)
        RETURN BOOLEAN;                                                

   FUNCTION fn_default_cont_settl_basis
    (
                              p_action            IN VARCHAR2,
                              p_wrk_oldrlovr   IN OUT olpks_oldrlovr_main.ty_oldrlovr,
                              p_Err_Code        IN OUT VARCHAR2,
                              p_Err_Params      IN OUT VARCHAR2)
        RETURN BOOLEAN ;      
	 --Bug#37278089 ENDS	
end olpks_oldrlovr_utils;
/
CREATE OR REPLACE SYNONYM olpkss_oldrlovr_utils FOR olpks_oldrlovr_utils
/