CREATE OR REPLACE PACKAGE olpks_oldreprc_utils IS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_oldreprc_utils.spc
  **
  ** Module     : Loans and Deposits
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Oracle Banking Corporate Lending  Software Product.   Copyright © 2018.  All rights reserved
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

  FUNCTION Fn_Validate_Items(p_Source           IN VARCHAR2,
                             p_Source_Operation IN VARCHAR2,
                             p_Function_Id      IN VARCHAR2,
                             p_Action_Code      IN VARCHAR2,
                             p_Child_Function   IN VARCHAR2,
                             p_oldreprc         IN olpks_oldreprc_main.ty_oldreprc,
                             p_prev_oldreprc    IN OUT olpks_oldreprc_main.ty_oldreprc,
                             p_wrk_oldreprc     IN OUT olpks_oldreprc_main.ty_oldreprc,
                             p_Err_Code         IN OUT VARCHAR2,
                             p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Populate_Items(p_Source           IN VARCHAR2,
                             p_Source_Operation IN VARCHAR2,
                             p_Function_id      IN VARCHAR2,
                             p_Action_Code      IN VARCHAR2,
                             p_Child_Function   IN VARCHAR2,
                             p_oldreprc         IN OUT olpks_oldreprc_main.ty_oldreprc,
                             p_Err_Code         IN OUT VARCHAR2,
                             p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Upload_Data(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_Child_Function   IN VARCHAR2,
                          p_Multi_Trip_Id    IN VARCHAR2,
                          p_oldreprc         IN olpks_oldreprc_main.ty_oldreprc,
                          p_prev_oldreprc    IN olpks_oldreprc_main.ty_oldreprc,
                          p_wrk_oldreprc     IN OUT olpks_oldreprc_main.ty_oldreprc,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Delete_Data(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_Child_Function   IN VARCHAR2,
                          p_oldreprc         IN olpks_oldreprc_main.ty_oldreprc,
                          p_prev_oldreprc    IN olpks_oldreprc_main.ty_oldreprc,
                          p_wrk_oldreprc     IN OUT olpks_oldreprc_main.ty_oldreprc,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Calculate_OS_Interest(p_Source           IN VARCHAR2,
                                    p_Source_Operation IN VARCHAR2,
                                    p_Function_Id      IN VARCHAR2,
                                    p_Action_Code      IN VARCHAR2,
                                    p_Child_Function   IN VARCHAR2,
                                    p_oldreprc         IN olpks_oldreprc_main.ty_oldreprc,
                                    p_wrk_oldreprc     IN OUT olpks_oldreprc_main.ty_oldreprc,
                                    p_Err_Code         IN OUT VARCHAR2,
                                    p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Display_Fields(p_Source           IN VARCHAR2,
                             p_Source_Operation IN VARCHAR2,
                             p_Function_Id      IN VARCHAR2,
                             p_Action_Code      IN VARCHAR2,
                             p_Child_Function   IN VARCHAR2,
                             p_Full_Data        IN VARCHAR2 DEFAULT 'Y',
                             p_With_Lock        IN VARCHAR2 DEFAULT 'N',
                             p_QryData_Reqd     IN VARCHAR2,
                             p_oldreprc         IN olpks_oldreprc_main.ty_oldreprc,
                             p_wrk_oldreprc     IN OUT olpks_oldreprc_main.ty_oldreprc,
                             p_Err_Code         IN OUT VARCHAR2,
                             p_err_params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_On_Modify(p_Source           IN VARCHAR2,
                        p_Source_Operation IN VARCHAR2,
                        p_Function_Id      IN VARCHAR2,
                        p_Action_Code      IN VARCHAR2,
                        p_Child_Function   IN VARCHAR2,
                        p_Multi_Trip_Id    IN VARCHAR2,
                        p_oldreprc         IN olpks_oldreprc_main.ty_oldreprc,
                        p_prev_oldreprc    IN olpks_oldreprc_main.ty_oldreprc,
                        p_wrk_oldreprc     IN OUT olpks_oldreprc_main.ty_oldreprc,
                        p_Err_Code         IN OUT VARCHAR2,
                        p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Subsystem_Pickup(p_Source           IN VARCHAR2,
                               p_Source_Operation IN VARCHAR2,
                               p_Function_Id      IN VARCHAR2,
                               p_Action_code      IN VARCHAR2,
                               p_oldreprc         IN olpks_oldreprc_main.ty_oldreprc,
                               p_prev_oldreprc    IN OUT olpks_oldreprc_main.ty_oldreprc,
                               p_wrk_oldreprc     IN OUT olpks_oldreprc_main.ty_oldreprc,
                               p_Err_Code         IN OUT VARCHAR2,
                               p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  Function Fn_Upload_Change_Log(p_Source           IN VARCHAR2,
                                p_Source_Operation IN VARCHAR2,
                                p_Function_Id      IN VARCHAR2,
                                p_Action_Code      IN VARCHAR2,
                                p_oldreprc         IN olpks_oldreprc_main.ty_oldreprc,
                                p_prev_oldreprc    IN olpks_oldreprc_main.ty_oldreprc,
                                p_wrk_oldreprc     IN OUT olpks_oldreprc_main.ty_oldreprc,
                                p_Err_Code         IN OUT VARCHAR2,
                                p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

END olpks_oldreprc_utils;
/
CREATE OR REPLACE SYNONYM olpkss_oldreprc_utils FOR olpks_oldreprc_utils
/