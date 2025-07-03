create or replace package lbpks_lbdreprc_utils is
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdreprc_utils.spc
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
  
11-May-2018 LS14.1 ECA changes --Logged records into ECA table for DDA processing
  
  Changed By          : ANUSHA K
  Change Description  : OBCL_14.3_LS_Sublimit_Validation_Changes
  Search String       : OBCL_14.3_LS_Sublimit_Validation_Changes
  Changed On          : 05-MAR-2019
  -------------------------------------------------------------------------------------------------------
  */
  FUNCTION Fn_Reverse_Contract(p_Source           IN VARCHAR2,
                               p_Source_Operation IN VARCHAR2,
                               p_Function_Id      IN VARCHAR2,
                               p_Action_Code      IN VARCHAR2,
                               p_Child_Function   IN VARCHAR2,
                               p_Multi_Trip_Id    IN VARCHAR2,
                               p_lbdreprc         IN lbpks_lbdreprc_Main.Ty_lbdreprc,
                               p_Prev_lbdreprc    IN lbpks_lbdreprc_Main.Ty_lbdreprc,
                               p_Wrk_lbdreprc     IN OUT lbpks_lbdreprc_Main.Ty_lbdreprc,
                               p_Err_Code         IN OUT VARCHAR2,
                               p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Validate_Data(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_Child_Function   IN VARCHAR2,
                            p_lbdreprc         IN lbpks_lbdreprc_Main.Ty_lbdreprc,
                            p_Prev_lbdreprc    IN OUT lbpks_lbdreprc_Main.Ty_lbdreprc,
                            p_Wrk_lbdreprc     IN OUT lbpks_lbdreprc_Main.Ty_lbdreprc,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Close_Record(p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_Id      IN VARCHAR2,
                           p_Action_Code      IN VARCHAR2,
                           p_Child_Function   IN VARCHAR2,
                           p_Multi_Trip_Id    IN VARCHAR2,
                           p_lbdreprc         IN lbpks_lbdreprc_Main.ty_lbdreprc,
                           p_Prev_lbdreprc    IN lbpks_lbdreprc_Main.ty_lbdreprc,
                           p_Wrk_lbdreprc     IN OUT lbpks_lbdreprc_Main.ty_lbdreprc,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Delete_Record(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_Child_Function   IN VARCHAR2,
                            p_Multi_Trip_Id    IN VARCHAR2,
                            p_lbdreprc         IN lbpks_lbdreprc_Main.Ty_lbdreprc,
                            p_Prev_lbdreprc    IN lbpks_lbdreprc_Main.Ty_lbdreprc,
                            p_Wrk_lbdreprc     IN OUT lbpks_lbdreprc_Main.Ty_lbdreprc,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Reopen_Record(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_Child_Function   IN VARCHAR2,
                            p_Multi_Trip_Id    IN VARCHAR2,
                            p_lbdreprc         IN lbpks_lbdreprc_Main.ty_lbdreprc,
                            p_Prev_lbdreprc    IN lbpks_lbdreprc_Main.ty_lbdreprc,
                            p_Wrk_lbdreprc     IN OUT lbpks_lbdreprc_Main.ty_lbdreprc,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Save_Record(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_Child_Function   IN VARCHAR2,
                          p_Multi_Trip_Id    IN VARCHAR2,
                          p_lbdreprc         IN lbpks_lbdreprc_Main.Ty_lbdreprc,
                          p_Prev_lbdreprc    IN lbpks_lbdreprc_Main.Ty_lbdreprc,
                          p_Wrk_lbdreprc     IN OUT lbpks_lbdreprc_Main.Ty_lbdreprc,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Display_Data(p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_Id      IN VARCHAR2,
                           p_Action_Code      IN VARCHAR2,
                           p_Child_Function   IN VARCHAR2,
                           p_Full_Data        IN VARCHAR2 DEFAULT 'Y',
                           p_With_Lock        IN VARCHAR2 DEFAULT 'N',
                           p_QryData_Reqd     IN VARCHAR2,
                           p_lbdreprc         IN lbpks_lbdreprc_Main.Ty_lbdreprc,
                           p_Wrk_lbdreprc     IN OUT lbpks_lbdreprc_Main.Ty_lbdreprc,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Populate_Fields(p_Source           IN VARCHAR2,
                              p_Source_Operation IN VARCHAR2,
                              p_Function_Id      IN VARCHAR2,
                              p_Action_Code      IN VARCHAR2,
                              p_Child_Function   IN VARCHAR2,
                              p_pk_or_full       IN VARCHAR2 DEFAULT 'FULL',
                              p_lbdreprc         IN OUT lbpks_lbdreprc_Main.Ty_lbdreprc,
                              p_Err_Code         IN OUT VARCHAR2,
                              p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Subsystem_Pickup(p_Source           IN VARCHAR2,
                               p_Source_Operation IN VARCHAR2,
                               p_Function_Id      IN VARCHAR2,
                               p_Action_code      IN VARCHAR2,
                               p_lbdreprc         IN lbpks_lbdreprc_Main.Ty_lbdreprc,
                               p_Prev_lbdreprc    IN OUT lbpks_lbdreprc_Main.Ty_lbdreprc,
                               p_Wrk_lbdreprc     IN OUT lbpks_lbdreprc_Main.Ty_lbdreprc,
                               p_Err_Code         IN OUT VARCHAR2,
                               p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --LS14.1 ECA changes Starts
  Function fn_process_eca_for_contract(p_Wrk_lbdreprc     IN OUT lbpks_lbdreprc_Main.ty_lbdreprc,
                                        p_error_code   IN OUT VARCHAR2,
                                        p_error_param  IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --LS14.1 ECA changes Ends

 --OBCL_14.3_LS_Sublimit_Validation_Changes STARTS
  FUNCTION Fn_SUBLIMITS_CHECK(p_Source           IN VARCHAR2,
                              p_Source_Operation IN VARCHAR2,
                              p_Function_Id      IN VARCHAR2,
                              p_Action_Code      IN VARCHAR2,
                              p_lbdreprc         IN lbpks_lbdreprc_Main.Ty_lbdreprc,
                              p_Wrk_lbdreprc     IN OUT lbpks_lbdreprc_Main.Ty_lbdreprc,
                              p_Err_Code         IN OUT VARCHAR2,
                              p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --OBCL_14.3_LS_Sublimit_Validation_Changes ENDS

end lbpks_lbdreprc_utils;
/
CREATE OR REPLACE SYNONYM lbpkss_lbdreprc_utils for lbpks_lbdreprc_utils
/