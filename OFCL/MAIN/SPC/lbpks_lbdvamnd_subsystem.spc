CREATE OR REPLACE PACKAGE lbpks_lbdvamnd_subsystem AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdvamnd_subsystem.spc
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
  
  -------------------------------------------------------------------------------------------------------
  */

  FUNCTION fn_get_subsys_stat(p_subsystem  IN VARCHAR2,
                              p_subsysstat IN VARCHAR2) RETURN VARCHAR2;
  FUNCTION fn_upd_subsys_stat(p_subsystem  IN VARCHAR2,
                              p_stat       IN VARCHAR2,
                              p_subsysstat IN VARCHAR2) RETURN VARCHAR2;
  FUNCTION fn_subsys_pickup(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_lbdvamnd         IN lbpks_lbdvamnd_main.ty_lbdvamnd,
                            p_prev_lbdvamnd    IN lbpks_lbdvamnd_main.ty_lbdvamnd,
                            p_wrk_lbdvamnd     IN OUT lbpks_lbdvamnd_main.ty_lbdvamnd,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION fn_explode_schedules(p_Source           IN VARCHAR2,
                                p_Source_Operation IN VARCHAR2,
                                p_Function_Id      IN VARCHAR2,
                                p_Action_Code      IN VARCHAR2,
                                p_lbdvamnd         IN lbpks_lbdvamnd_main.ty_lbdvamnd,
                                p_prev_lbdvamnd    IN lbpks_lbdvamnd_main.ty_lbdvamnd,
                                p_wrk_lbdvamnd     IN OUT lbpks_lbdvamnd_main.ty_lbdvamnd,
                                P_product_master   IN oltms_product_master_ld%ROWTYPE,
                                p_Err_Code         IN OUT VARCHAR2,
                                p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION fn_subsys_upload(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_lbdvamnd         IN lbpks_lbdvamnd_main.ty_lbdvamnd,
                            p_prev_lbdvamnd    IN lbpks_lbdvamnd_main.ty_lbdvamnd,
                            p_wrk_lbdvamnd     IN OUT lbpks_lbdvamnd_main.ty_lbdvamnd,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION fn_populate_advices(p_Source           IN VARCHAR2,
                               p_Source_Operation IN VARCHAR2,
                               p_Function_Id      IN VARCHAR2,
                               p_Action_Code      IN VARCHAR2,
                               p_wrk_lbdvamnd     IN OUT lbpks_lbdvamnd_main.ty_lbdvamnd,
                               p_Err_Code         IN OUT VARCHAR2,
                               p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_upload_advices(p_Source           IN VARCHAR2,
                             p_Source_Operation IN VARCHAR2,
                             p_Function_Id      IN VARCHAR2,
                             p_Action_Code      IN VARCHAR2,
                             p_wrk_lbdvamnd     IN OUT lbpks_lbdvamnd_main.ty_lbdvamnd,
                             p_Err_Code         IN OUT VARCHAR2,
                             p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
END lbpks_lbdvamnd_subsystem;
/
CREATE OR REPLACE SYNONYM lbpkss_lbdvamnd_subsystem FOR lbpks_lbdvamnd_subsystem
/