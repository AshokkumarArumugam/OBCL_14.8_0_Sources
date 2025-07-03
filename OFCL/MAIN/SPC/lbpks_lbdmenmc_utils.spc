CREATE OR REPLACE PACKAGE lbpks_lbdmenmc_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdmenmc_utils.spc
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
  
  -------------------------------------------------------------------------------------------------------
  */
  FUNCTION fn_check_entity_settle_details(p_source       IN VARCHAR2,
                                          p_function_id  IN VARCHAR2,
                                          p_action_code  IN VARCHAR2,
                                          p_wrk_lbdmenmc IN OUT lbpks_lbdmenmc_main.ty_lbdmenmc,
                                          p_err_code     IN OUT VARCHAR2,
                                          P_err_params   IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION fn_validate(p_source       IN VARCHAR2,
                       p_function_id  IN VARCHAR2,
                       p_action_code  IN VARCHAR2,
                       p_wrk_lbdmenmc IN OUT lbpks_lbdmenmc_main.ty_lbdmenmc,
                       p_err_code     IN OUT VARCHAR2,
                       p_err_params   IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION fn_upload_db(p_source        IN VARCHAR2,
                        p_function_id   IN VARCHAR2,
                        p_action_code   IN VARCHAR2,
                        p_Prev_lbdmenmc IN lbpks_lbdmenmc_Main.Ty_lbdmenmc,
                        p_wrk_lbdmenmc  IN OUT lbpks_lbdmenmc_main.ty_lbdmenmc,
                        p_err_code      IN OUT VARCHAR2,
                        p_err_params    IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION fn_query(p_source       IN VARCHAR2,
                    p_function_id  IN VARCHAR2,
                    p_action_code  IN VARCHAR2,
                    p_wrk_lbdmenmc IN OUT lbpks_lbdmenmc_main.ty_lbdmenmc,
                    p_err_code     IN OUT VARCHAR2,
                    p_err_params   IN OUT VARCHAR2) RETURN BOOLEAN;
                    
 ---Bug#30066797         
  FUNCTION Fn_Change_Log(p_Source           IN VARCHAR2,                         
                         p_Function_Id      IN VARCHAR2,
                         p_Action_code      IN VARCHAR2,                        
                         p_lbdmenmc         IN lbpks_lbdmenmc_main.ty_lbdmenmc,
                         p_prev_lbdmenmc    IN lbpks_lbdmenmc_main.ty_lbdmenmc,
                         p_wrk_lbdmenmc     IN OUT lbpks_lbdmenmc_main.ty_lbdmenmc,
                         p_Err_Code         IN OUT VARCHAR2,
                         p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;     
                         

  FUNCTION Fn_Log_Override(p_Source           IN VARCHAR2,                         
                         p_Function_Id      IN VARCHAR2,
                         p_Action_code      IN VARCHAR2,                        
                         p_lbdmenmc         IN lbpks_lbdmenmc_main.ty_lbdmenmc,
                         p_prev_lbdmenmc    IN lbpks_lbdmenmc_main.ty_lbdmenmc,
                         p_wrk_lbdmenmc     IN OUT lbpks_lbdmenmc_main.ty_lbdmenmc,
                         p_Err_Code         IN OUT VARCHAR2,
                         p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;      
                                            
   ---Bug#30066797   ends                 
                    
END lbpks_lbdmenmc_utils;
/
CREATE OR REPLACE SYNONYM lbpkss_lbdmenmc_utils FOR lbpks_lbdmenmc_utils
/