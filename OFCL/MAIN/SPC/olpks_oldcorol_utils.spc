create or replace package olpks_oldcorol_utils is
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_oldcorol_utils.spc
  **
  ** Module     : Oracle Lending
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
  FUNCTION Fn_Validate_Data(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_Child_Function   IN VARCHAR2,
                            p_oldcorol         IN olpks_oldcorol_Main.Ty_oldcorol,
                            p_Prev_oldcorol    IN OUT olpks_oldcorol_Main.Ty_oldcorol,
                            p_Wrk_oldcorol     IN OUT olpks_oldcorol_Main.Ty_oldcorol,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Rollover(p_Source           IN VARCHAR2,
                             p_Source_Operation IN VARCHAR2,
                             p_Function_Id      IN VARCHAR2,
                             p_Action_Code      IN VARCHAR2,
                             p_Child_Function   IN VARCHAR2,
                             p_Multi_Trip_Id    IN VARCHAR2,
                             p_oldcorol         IN olpks_oldcorol_Main.Ty_oldcorol,
                             p_Prev_oldcorol    IN olpks_oldcorol_Main.Ty_oldcorol,
                             p_Wrk_oldcorol     IN OUT olpks_oldcorol_Main.Ty_oldcorol,
                             p_Err_Code         IN OUT VARCHAR2,
                             p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Product_Default(p_Source           IN VARCHAR2,
                              p_Source_Operation IN VARCHAR2,
                              p_Function_Id      IN VARCHAR2,
                              p_Action_Code      IN VARCHAR2,
                              p_oldcorol         IN olpks_oldcorol_Main.Ty_oldcorol,
                              p_Wrk_oldcorol     IN OUT olpks_oldcorol_Main.Ty_oldcorol,
                              p_Err_Code         IN OUT VARCHAR2,
                              p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Save_Data(p_Source           IN VARCHAR2,
                        p_Source_Operation IN VARCHAR2,
                        p_Function_Id      IN VARCHAR2,
                        p_Action_Code      IN VARCHAR2,
                        p_Child_Function   IN VARCHAR2,
                        p_Multi_Trip_Id    IN VARCHAR2,
                        p_oldcorol         IN olpks_oldcorol_Main.Ty_oldcorol,
                        p_Prev_oldcorol    IN olpks_oldcorol_Main.Ty_oldcorol,
                        p_Wrk_oldcorol     IN OUT olpks_oldcorol_Main.Ty_oldcorol,
                        p_Err_Code         IN OUT VARCHAR2,
                        p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Delete_Data(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_Child_Function   IN VARCHAR2,
                          p_Multi_Trip_Id    IN VARCHAR2,
                          p_oldcorol         IN olpks_oldcorol_Main.Ty_oldcorol,
                          p_Prev_oldcorol    IN olpks_oldcorol_Main.Ty_oldcorol,
                          p_Wrk_oldcorol     IN OUT olpks_oldcorol_Main.Ty_oldcorol,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Subsystem_Pickup(p_Source           IN VARCHAR2,
                               p_Source_Operation IN VARCHAR2,
                               p_Function_Id      IN VARCHAR2,
                               p_Action_code      IN VARCHAR2,
                               p_oldcorol         IN olpks_oldcorol_Main.Ty_oldcorol,
                               p_Prev_oldcorol    IN olpks_oldcorol_Main.Ty_oldcorol,
                               p_Wrk_oldcorol     IN OUT olpks_oldcorol_Main.Ty_oldcorol,
                               p_Err_Code         IN OUT VARCHAR2,
                               p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Authorize_Record(p_Source           IN VARCHAR2,
                               p_Source_Operation IN VARCHAR2,
                               p_Function_Id      IN VARCHAR2,
                               p_Action_Code      IN VARCHAR2,
                               p_Child_Function   IN VARCHAR2,
                               p_Multi_Trip_Id    IN VARCHAR2,
                               p_oldcorol         IN olpks_oldcorol_Main.Ty_oldcorol,
                               p_Prev_oldcorol    IN olpks_oldcorol_Main.Ty_oldcorol,
                               p_Wrk_oldcorol     IN OUT olpks_oldcorol_Main.Ty_oldcorol,
                               p_Err_Code         IN OUT VARCHAR2,
                               p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Display_Data(p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_Id      IN VARCHAR2,
                           p_Action_Code      IN VARCHAR2,
                           p_Child_Function   IN VARCHAR2,
                           p_Full_Data        IN VARCHAR2 DEFAULT 'Y',
                           p_With_Lock        IN VARCHAR2 DEFAULT 'N',
                           p_QryData_Reqd     IN VARCHAR2,
                           p_oldcorol         IN olpks_oldcorol_Main.Ty_oldcorol,
                           p_Wrk_oldcorol     IN OUT olpks_oldcorol_Main.Ty_oldcorol,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;    

end olpks_oldcorol_utils;
/
CREATE OR REPLACE SYNONYM olpkss_oldcorol_utils FOR olpks_oldcorol_utils
/