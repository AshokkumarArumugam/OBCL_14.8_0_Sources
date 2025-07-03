CREATE OR REPLACE PACKAGE lbpks_lbdexrfx_utils IS

  /*------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdexrfx_utils.spc
  **
  ** Module     : Syndication Loans and Commitments
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.
  **
  ** No part of this work may be reproduced, stored in a retrieval system,
  ** adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise,
  ** translated in any language or computer language,
  ** without the prior written permission of Oracle and/or its affiliates.
  **
  **
  ** Oracle Financial Services Software Limited.
  ** Oracle Park, Off Western Express Highway,
  ** Goregaon (East),
  ** Mumbai - 400 063, India.
  ------------------------------------------------------------------------------------------
  */
  /*
  -------------------------------------------------------------------------------------------------------
  CHANGE HISTORY

  SFR Number         :
  Changed By         :
  Change Description :

  -------------------------------------------------------------------------------------------------------
  */
  FUNCTION fn_control(p_Source           IN VARCHAR2,
                      p_Source_Operation IN VARCHAR2,
                      p_Function_Id      IN VARCHAR2,
                      p_Action_Code      IN VARCHAR2,
                      p_lbdexrfx         IN lbpks_lbdexrfx_main.ty_lbdexrfx,
                      p_wrk_lbdexrfx     IN OUT lbpks_lbdexrfx_main.ty_lbdexrfx,
                      p_message          IN  VARCHAR2,
                      p_Err_Code         IN OUT VARCHAR2,
                      p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
 PROCEDURE PR_EXFX_SAVE(p_Source       IN VARCHAR2,
                              p_Function_Id  IN VARCHAR2,
                              p_Action_Code  IN VARCHAR2,
                              p_wrk_lbdexrfx IN OUT lbpks_lbdexrfx_main.ty_lbdexrfx );  
PROCEDURE PR_SET_FOR_NEW (   p_Source       IN VARCHAR2,
                              p_Function_Id  IN VARCHAR2,
                              p_Action_Code  IN VARCHAR2,
                              p_wrk_lbdexrfx IN OUT lbpks_lbdexrfx_main.ty_lbdexrfx );
PROCEDURE pr_default_values ( p_Source       IN VARCHAR2,
                              p_Function_Id  IN VARCHAR2,
                              p_Action_Code  IN VARCHAR2,
                              p_wrk_lbdexrfx IN OUT lbpks_lbdexrfx_main.ty_lbdexrfx )  ;   
PROCEDURE PR_CREATE_REPLICATE  ( p_Source       IN VARCHAR2,
                              p_Function_Id  IN VARCHAR2,
                              p_Action_Code  IN VARCHAR2,
                              p_wrk_lbdexrfx IN OUT lbpks_lbdexrfx_main.ty_lbdexrfx );  


function fn_unlock(p_Source           IN VARCHAR2,
            p_Source_Operation IN VARCHAR2,
            p_Function_Id      IN VARCHAR2,
            p_Action_Code      IN VARCHAR2,
            p_lbdexrfx         IN lbpks_lbdexrfx_main.ty_lbdexrfx,
            p_wrk_lbdexrfx     IN OUT lbpks_lbdexrfx_main.ty_lbdexrfx,
            p_Err_Code         IN OUT VARCHAR2,
            p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN; 
  FUNCTION fn_get_next_date (p_Source    IN  VARCHAR2,
                              p_Source_Operation  IN     VARCHAR2,
                              p_Function_Id       IN     VARCHAR2,
                              p_Action_Code       IN     VARCHAR2,
      p_Child_Function    IN  VARCHAR2,
      p_lbdexrfx IN   lbpks_lbdexrfx_Main.Ty_lbdexrfx,
      p_Prev_lbdexrfx IN OUT lbpks_lbdexrfx_Main.Ty_lbdexrfx,
      p_Wrk_lbdexrfx IN OUT  lbpks_lbdexrfx_Main.Ty_lbdexrfx,
      p_Err_Code       IN  OUT VARCHAR2,
      p_Err_Params     IN  OUT VARCHAR2)
   RETURN BOOLEAN ;

PROCEDURE pr_gtemp_validate_part (p_Source           IN VARCHAR2,
                      p_Source_Operation IN VARCHAR2,
                      p_Function_Id      IN VARCHAR2,
                      p_Action_Code      IN VARCHAR2,
                      p_lbdexrfx         IN lbpks_lbdexrfx_main.ty_lbdexrfx,
                      p_wrk_lbdexrfx     IN OUT lbpks_lbdexrfx_main.ty_lbdexrfx,
                      p_Err_Code         IN OUT VARCHAR2,
                      p_Err_Params       IN OUT VARCHAR2) ; 
FUNCTION fn_validation (p_Source           IN VARCHAR2,
                      p_Source_Operation IN VARCHAR2,
                      p_Function_Id      IN VARCHAR2,
                      p_Action_Code      IN VARCHAR2,
                      p_lbdexrfx         IN lbpks_lbdexrfx_main.ty_lbdexrfx,
                      p_wrk_lbdexrfx     IN OUT lbpks_lbdexrfx_main.ty_lbdexrfx,
                      p_Err_Code         IN OUT VARCHAR2,
                      p_Err_Params       IN OUT VARCHAR2) 
RETURN BOOLEAN ; 
FUNCTION FN_CHECK_UNLOCK (p_Source           IN VARCHAR2,
                      p_Source_Operation IN VARCHAR2,
                      p_Function_Id      IN VARCHAR2,
                      p_Action_Code      IN VARCHAR2,
                      p_lbdexrfx         IN lbpks_lbdexrfx_main.ty_lbdexrfx,
                      p_wrk_lbdexrfx     IN OUT lbpks_lbdexrfx_main.ty_lbdexrfx,
                      p_Err_Code         IN OUT VARCHAR2,
                      p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;   
FUNCTION Fn_Delete(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_code      IN VARCHAR2,
                     p_lbdexrfx         IN lbpks_lbdexrfx_main.ty_lbdexrfx,
                     p_wrk_lbdexrfx     IN OUT lbpks_lbdexrfx_main.ty_lbdexrfx,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;    
                     
                     
FUNCTION 	fn_log_changes (p_Source           IN VARCHAR2,
                      p_Source_Operation IN VARCHAR2,
                      p_Function_Id      IN VARCHAR2,
                      p_Action_Code      IN VARCHAR2,
                      p_lbdexrfx         IN lbpks_lbdexrfx_main.ty_lbdexrfx,
                      p_wrk_lbdexrfx     IN OUT lbpks_lbdexrfx_main.ty_lbdexrfx,
                      p_Err_Code         IN OUT VARCHAR2,
                      p_Err_Params       IN OUT VARCHAR2) 
					RETURN BOOLEAN;                                                                                                                                                                                                                  
--------------------------------------------------

 /* FUNCTION fn_upd_subsys_stat(p_subsystem  IN VARCHAR2,
                              p_stat       IN VARCHAR2,
                              p_subsysstat IN VARCHAR2) RETURN VARCHAR2;
  FUNCTION Fn_Subsys_Pickup(p_Source           IN VARCHAR2,
                                   p_Source_Operation IN VARCHAR2,
                                   p_Function_Id      IN VARCHAR2,
                                   p_Action_Code      IN VARCHAR2,
                                   p_lbdexrfx         IN lbpks_lbdexrfx_main.ty_lbdexrfx,
                                   p_prev_lbdexrfx    IN lbpks_lbdexrfx_main.ty_lbdexrfx,
                                   p_wrk_lbdexrfx     IN OUT lbpks_lbdexrfx_main.ty_lbdexrfx,
                                   p_Err_Code         IN OUT VARCHAR2,
                                   p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION fn_get_pmt_esn(p_wrk_lbdexrfx    IN lbpks_lbdexrfx_main.ty_lbdexrfx,
                          p_pmt_no     IN Number,
                          p_pmt_esn    OUT oltbs_contract_refund_summary.REFUND_ESN%type,
                          P_error_code OUT Varchar2) RETURN BOOLEAN;

    FUNCTION fn_register_event_log(p_Source           IN VARCHAR2,
                                 p_Source_Operation IN VARCHAR2,
                                 p_Function_Id      IN VARCHAR2,
                                 p_Action_Code      IN VARCHAR2,
                                 p_lbdexrfx         IN lbpks_lbdexrfx_main.ty_lbdexrfx,
                                 p_wrk_lbdexrfx     IN OUT lbpks_lbdexrfx_main.ty_lbdexrfx,
                                 p_Err_Code         IN OUT VARCHAR2,
                                 p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
    FUNCTION Fn_Upload_Data(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_Child_Function   IN VARCHAR2,
                          p_Multi_Trip_Id    IN VARCHAR2,
                          p_lbdexrfx         IN lbpks_lbdexrfx_main.ty_lbdexrfx,
                          p_prev_lbdexrfx    IN lbpks_lbdexrfx_main.ty_lbdexrfx,
                          p_wrk_lbdexrfx     IN OUT lbpks_lbdexrfx_main.ty_lbdexrfx,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;*/
   
END lbpks_lbdexrfx_utils;
/