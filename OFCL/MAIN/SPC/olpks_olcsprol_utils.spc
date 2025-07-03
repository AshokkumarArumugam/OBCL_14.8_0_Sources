create or replace package olpks_olcsprol_utils is
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_olcsprol_utils.spc
  **
  ** Module     : Loans and Deposits
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
  
    **Changed By         : Pallavi R
    **Date               : 17-Feb-2023
    **Change Description : On Rollover spread adj field is not copied to child ontract/Interest detail tab from parent
    **Search String      : OBCL_14.6_REG_SMTB_#35091410 Changes   
  -------------------------------------------------------------------------------------------------------
  */
  FUNCTION Fn_Save_Record(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
						  p_roll_inst_status IN VARCHAR2, 
                          p_Wrk_olcsprol     IN OUT olpks_olcsprol_Main.Ty_olcsprol,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

FUNCTION Fn_Validate_Data(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Wrk_olcsprol     IN OUT olpks_olcsprol_Main.Ty_olcsprol,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Populate_Data(p_Source           IN VARCHAR2,
                         p_Source_Operation IN VARCHAR2,
                         p_Function_Id      IN VARCHAR2,
                         p_Action_Code      IN VARCHAR2,
                         p_Main_Function    IN VARCHAR2,
                         p_Child_Function   IN VARCHAR2,
                         p_Key_Tags_Vals    IN OUT VARCHAR2,
                         p_QryData_Reqd     IN VARCHAR2,
                         p_olcsprol         IN olpks_olcsprol_Main.Ty_olcsprol,
                         p_Wrk_olcsprol     IN OUT olpks_olcsprol_Main.Ty_olcsprol,
                         p_Err_Code         IN OUT VARCHAR2,
                         p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;    
  --OBCL_14.6_REG_SMTB_#35091410 Changes Starts
  FUNCTION Fn_Default_Split(p_Source       IN VARCHAR2,
                            p_Function_Id  IN VARCHAR2,
                            p_Wrk_Olcsprol IN OUT Olpks_Olcsprol_Main.Ty_Olcsprol,
                            p_Err_Code     IN OUT VARCHAR2,
                            p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;
  --OBCL_14.6_REG_SMTB_#35091410 Changes Ends
end olpks_olcsprol_utils;
/
CREATE OR REPLACE SYNONYM olpkss_olcsprol_utils FOR olpks_olcsprol_utils
/