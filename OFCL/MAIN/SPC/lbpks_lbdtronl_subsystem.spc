CREATE OR REPLACE PACKAGE lbpks_lbdtronl_subsystem AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdtronl_subsystem.spc
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

  FUNCTION fn_subsys_pickup_default(p_Source           IN VARCHAR2,
                                    p_Source_Operation IN VARCHAR2,
                                    p_Function_Id      IN VARCHAR2,
                                    p_Action_Code      IN VARCHAR2,
                                    p_lbdtronl         IN lbpks_lbdtronl_main.ty_lbdtronl,
                                    p_prev_lbdtronl    IN lbpks_lbdtronl_main.ty_lbdtronl,
                                    p_wrk_lbdtronl     IN OUT lbpks_lbdtronl_main.ty_lbdtronl,
                                    p_Err_Code         IN OUT VARCHAR2,
                                    p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_subsys_upload(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_lbdtronl         IN lbpks_lbdtronl_main.ty_lbdtronl,
                            p_prev_lbdtronl    IN lbpks_lbdtronl_main.ty_lbdtronl,
                            p_wrk_lbdtronl     IN OUT lbpks_lbdtronl_main.ty_lbdtronl,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION fn_explode_tr_schedule(p_Source           IN VARCHAR2,
                                  p_Source_Operation IN VARCHAR2,
                                  p_Function_Id      IN VARCHAR2,
                                  p_Action_Code      IN VARCHAR2,
                                  p_prev_lbdtronl    IN lbpks_lbdtronl_main.ty_lbdtronl,
                                  p_wrk_lbdtronl     IN OUT lbpks_lbdtronl_main.ty_lbdtronl,
                                  p_Err_Code         IN OUT VARCHAR2,
                                  p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN; 	
END lbpks_lbdtronl_subsystem;
/
CREATE OR REPLACE SYNONYM lbpkss_lbdtronl_subsystem FOR lbpks_lbdtronl_subsystem
/