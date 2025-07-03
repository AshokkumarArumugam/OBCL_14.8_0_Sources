CREATE OR REPLACE PACKAGE olpks_oldldent_utils IS

  /*------------------------------------------------------------------------------------------
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright Ãƒâ€šÃ‚Â© 2008 - 2011  Oracle and/or its affiliates.  All rights reserved.
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
  
  SFR Number         : 27556403
  Changed By         : Krithika G
  Change Description : Acc Entries coming twice
  Search String    : OFCL_12.3_27556403_Forward_Port
  
  -------------------------------------------------------------------------------------------------------
  */

  /*FUNCTION fn_delete(p_Source    IN  VARCHAR2,
                            p_Source_Operation  IN     VARCHAR2,
                            p_Function_Id       IN     VARCHAR2,
                            p_Action_Code       IN     VARCHAR2,
    p_Child_Function    IN  VARCHAR2,
    p_oldldent IN   olpks_oldldent_main.ty_oldldent,
    p_prev_oldldent IN OUT olpks_oldldent_main.ty_oldldent,
    p_wrk_oldldent IN OUT  olpks_oldldent_main.ty_oldldent,
    p_Err_Code       IN  OUT VARCHAR2,
    p_Err_Params     IN  OUT VARCHAR2)
  RETURN BOOLEAN;*/

  FUNCTION Fn_save(p_Source           IN VARCHAR2,
                   p_Source_Operation IN VARCHAR2,
                   p_Function_Id      IN VARCHAR2,
                   p_Action_Code      IN VARCHAR2,
                   p_Child_Function   IN VARCHAR2,
                   p_oldldent         IN olpks_oldldent_main.ty_oldldent,
                   p_prev_oldldent    IN olpks_oldldent_main.ty_oldldent,
                   p_wrk_oldldent     IN OUT olpks_oldldent_main.ty_oldldent,
                   p_Err_Code         IN OUT VARCHAR2,
                   p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_Update(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_Child_Function   IN VARCHAR2,
                     p_Multi_Trip_Id    IN VARCHAR2,
                     p_oldldent         IN olpks_oldldent_main.ty_oldldent,
                     p_prev_oldldent    IN olpks_oldldent_main.ty_oldldent,
                     p_wrk_oldldent     IN OUT olpks_oldldent_main.ty_oldldent,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

 --OFCL_12.3_27556403_Forward_Port     
  FUNCTION Fn_Sys_Upload_Db         (p_Source            IN VARCHAR2,
                              p_Source_Operation  IN     VARCHAR2,
                              p_Function_Id       IN     VARCHAR2,
                              p_Action_Code       IN     VARCHAR2,
      p_oldldent     IN  olpks_oldldent_Main.Ty_oldldent,
      p_Prev_oldldent     IN  olpks_oldldent_Main.Ty_oldldent,
      p_Wrk_oldldent      IN OUT  olpks_oldldent_Main.Ty_oldldent,
      p_Err_Code          IN OUT VARCHAR2,
      p_Err_Params        IN OUT VARCHAR2)
   RETURN BOOLEAN;
   
   FUNCTION Fn_Sys_Query  ( p_Source    IN  VARCHAR2,
                              p_Source_Operation  IN     VARCHAR2,
                              p_Function_Id       IN     VARCHAR2,
                              p_Action_Code       IN     VARCHAR2,
      p_Full_Data     IN  VARCHAR2 DEFAULT 'Y',
      p_With_Lock     IN  VARCHAR2 DEFAULT 'N',
      p_QryData_Reqd       IN  VARCHAR2,
      p_oldldent         IN  olpks_oldldent_Main.Ty_oldldent,
      p_Wrk_oldldent  IN   OUT olpks_oldldent_Main.Ty_oldldent,
      p_Err_Code          IN OUT VARCHAR2,
      p_Err_Params        IN OUT VARCHAR2)
   RETURN BOOLEAN;

  FUNCTION fn_Auth(p_Source           IN VARCHAR2,
                   p_Source_Operation IN VARCHAR2,
                   p_Function_Id      IN VARCHAR2,
                   p_Action_Code      IN VARCHAR2,
                   p_Child_Function   IN VARCHAR2,
                   p_Multi_Trip_Id    IN VARCHAR2,
                   p_oldldent         IN olpks_oldldent_main.ty_oldldent,
                   p_prev_oldldent    IN olpks_oldldent_main.ty_oldldent,
                   p_wrk_oldldent     IN OUT olpks_oldldent_main.ty_oldldent,
                   p_Err_Code         IN OUT VARCHAR2,
                   p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
                   
  FUNCTION fn_Validate(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_Child_Function   IN VARCHAR2,
                     p_oldldent         IN olpks_oldldent_main.ty_oldldent,
                     p_prev_oldldent    IN olpks_oldldent_main.ty_oldldent,
                     p_wrk_oldldent     IN OUT olpks_oldldent_main.ty_oldldent,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  --OFCL_12.3_27556403_Forward_Port Changes Ends
END olpks_oldldent_utils;
/
CREATE OR REPLACE SYNONYM olpkss_oldldent_utils FOR olpks_oldldent_utils
/