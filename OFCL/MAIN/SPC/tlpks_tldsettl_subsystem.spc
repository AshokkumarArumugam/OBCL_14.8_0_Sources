CREATE OR REPLACE PACKAGE Tlpks_Tldsettl_Subsystem AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : tlpks_tldsettl_subsystem.spc
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

  FUNCTION Fn_Get_Subsys_Stat(p_Subsystem  IN VARCHAR2,
                              p_Subsysstat IN VARCHAR2) RETURN VARCHAR2;
  FUNCTION Fn_Upd_Subsys_Stat(p_Subsystem  IN VARCHAR2,
                              p_Stat       IN VARCHAR2,
                              p_Subsysstat IN VARCHAR2) RETURN VARCHAR2;
  FUNCTION Fn_Subsys_Pickup(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_Tldsettl         IN Tlpks_Tldsettl_Main.Ty_Tldsettl,
                            p_Prev_Tldsettl    IN OUT Tlpks_Tldsettl_Main.Ty_Tldsettl,
                            p_Wrk_Tldsettl     IN OUT Tlpks_Tldsettl_Main.Ty_Tldsettl,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Subsys_Upload(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_Tldsettl         IN Tlpks_Tldsettl_Main.Ty_Tldsettl,
                            p_Prev_Tldsettl    IN Tlpks_Tldsettl_Main.Ty_Tldsettl,
                            p_Wrk_Tldsettl     IN OUT Tlpks_Tldsettl_Main.Ty_Tldsettl,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Pickup_Fmem(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_Wrk_Tldsettl     IN OUT Tlpks_Tldsettl_Main.Ty_Tldsettl,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
END Tlpks_Tldsettl_Subsystem;
/
CREATE OR REPLACE SYNONYM Tlpkss_Tldsettl_Subsystem FOR tlpks_tldsettl_subsystem
/