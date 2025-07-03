CREATE OR REPLACE PACKAGE olpks_oldrefnd_utils IS

  /*------------------------------------------------------------------------------------------
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
  
  SFR Number         : 27162413
  Changed By         : Siddharth
  Change Description : Refund Reversal
  
  -------------------------------------------------------------------------------------------------------
  */

  FUNCTION fn_date_validations (p_Source           IN VARCHAR2,
                    p_Source_Operation IN VARCHAR2,
                    p_Function_Id      IN VARCHAR2,
                    p_Action_Code      IN VARCHAR2,                   
                    p_oldrefnd         IN olpks_oldrefnd_main.ty_oldrefnd,
                    p_wrk_oldrefnd     IN OUT olpks_oldrefnd_main.ty_oldrefnd,
                    p_Err_Code         IN OUT VARCHAR2,
                    p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION fn_upd_subsys_stat(p_subsystem  IN VARCHAR2,
                              p_stat       IN VARCHAR2,
                              p_subsysstat IN VARCHAR2) RETURN VARCHAR2;					
  FUNCTION Fn_Subsys_Pickup(p_Source           IN VARCHAR2,
                                   p_Source_Operation IN VARCHAR2,
                                   p_Function_Id      IN VARCHAR2,
                                   p_Action_Code      IN VARCHAR2,
                                   p_oldrefnd         IN olpks_oldrefnd_main.ty_oldrefnd,
                                   p_prev_oldrefnd    IN olpks_oldrefnd_main.ty_oldrefnd,
                                   p_wrk_oldrefnd     IN OUT olpks_oldrefnd_main.ty_oldrefnd,
                                   p_Err_Code         IN OUT VARCHAR2,
                                   p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION fn_get_pmt_esn(p_wrk_oldrefnd    IN olpks_oldrefnd_main.ty_oldrefnd,
                          p_pmt_no     IN Number,
                          p_pmt_esn    OUT oltbs_contract_refund_summary.REFUND_ESN%type,
                          P_error_code OUT Varchar2) RETURN BOOLEAN;

  FUNCTION fn_populate_refund_summary(p_wrk_oldrefnd     IN OUT olpks_oldrefnd_main.ty_oldrefnd,
                                      p_Function_Id      IN VARCHAR2,
                                      p_Source           IN VARCHAR2,
                                      p_Source_Operation IN VARCHAR2,
                                      p_Action_Code      IN VARCHAR2,
                                      p_Err_Code         IN OUT VARCHAR2,
                                      p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
    
FUNCTION Fn_save (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_oldrefnd IN   olpks_oldrefnd_main.ty_oldrefnd,
p_prev_oldrefnd IN OUT olpks_oldrefnd_main.ty_oldrefnd,
p_wrk_oldrefnd IN OUT  olpks_oldrefnd_main.ty_oldrefnd,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Delete(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_code      IN VARCHAR2,
                     p_oldrefnd         IN olpks_oldrefnd_main.ty_oldrefnd,
                     p_wrk_oldrefnd     IN OUT olpks_oldrefnd_main.ty_oldrefnd,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
    FUNCTION fn_register_event_log(p_Source           IN VARCHAR2,
                                 p_Source_Operation IN VARCHAR2,
                                 p_Function_Id      IN VARCHAR2,
                                 p_Action_Code      IN VARCHAR2,
                                 p_oldrefnd         IN olpks_oldrefnd_main.ty_oldrefnd,
                                 p_wrk_oldrefnd     IN OUT olpks_oldrefnd_main.ty_oldrefnd,
                                 p_Err_Code         IN OUT VARCHAR2,
                                 p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
    --Bug#27162413  starts 

  FUNCTION Fn_Reverse(p_Source           IN VARCHAR2,
                      p_Source_Operation IN VARCHAR2,
                      p_Function_Id      IN VARCHAR2,
                      p_Action_code      IN VARCHAR2,
                      p_oldrefnd         IN olpks_oldrefnd_main.ty_oldrefnd,
                      p_wrk_oldrefnd     IN OUT olpks_oldrefnd_main.ty_oldrefnd,
                      p_Err_Code         IN OUT VARCHAR2,
                      p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  --Bug#27162413  ends

    FUNCTION Fn_Upload_Data(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_Child_Function   IN VARCHAR2,
                          p_Multi_Trip_Id    IN VARCHAR2,
                          p_oldrefnd         IN olpks_oldrefnd_main.ty_oldrefnd,
                          p_prev_oldrefnd    IN olpks_oldrefnd_main.ty_oldrefnd,
                          p_wrk_oldrefnd     IN OUT olpks_oldrefnd_main.ty_oldrefnd,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
    FUNCTION Fn_Query(p_Source           IN VARCHAR2,
                    p_Source_Operation IN VARCHAR2,
                    p_Function_Id      IN VARCHAR2,
                    p_Action_Code      IN VARCHAR2,                   
                    p_Full_Data        IN VARCHAR2 DEFAULT 'Y',
                    p_With_Lock        IN VARCHAR2 DEFAULT 'N',
                    p_QryData_Reqd     IN VARCHAR2,
                    p_oldrefnd         IN olpks_oldrefnd_main.ty_oldrefnd,
                    p_wrk_oldrefnd     IN OUT olpks_oldrefnd_main.ty_oldrefnd,
                    p_Err_Code         IN OUT VARCHAR2,
                    p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN ;                          
END olpks_oldrefnd_utils;
/
CREATE OR REPLACE SYNONYM olpkss_oldrefnd_utils FOR olpks_oldrefnd_utils
/