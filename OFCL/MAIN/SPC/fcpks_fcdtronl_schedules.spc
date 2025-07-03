CREATE OR REPLACE PACKAGE fcpks_fcdtronl_schedules AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : fcpks_fcdtronl_schedules.spc
  **
  ** Module     : FC
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright (R) 2008,2020 , Oracle and/or its affiliates.  All rights reserved
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
  l_Fas91_Fee        Lftms_Product_Fee.Fas91_Fee%TYPE;
  l_Bullet_Sch       BOOLEAN;
  l_Once_Split       VARCHAR2(1) := 'N';
  l_Pre_Stdt         Oltbs_Contract_Schedules.Start_Date%TYPE;
  l_Sch_Exploded     VARCHAR2(1);
  g_Fc_Fee_Sch_Amend VARCHAR2(1) := 'N'; --OBCL_14.4_LS_FEE Changes
  FUNCTION Fn_Explode_Schedules(p_Source           IN VARCHAR2,
                                p_Source_Operation IN VARCHAR2,
                                p_Function_Id      IN VARCHAR2,
                                p_Action_Code      IN VARCHAR2,
                                p_Fcdtronl         IN Fcpks_Fcdtronl_Main.Ty_Fcdtronl,
                                p_Prev_Fcdtronl    IN Fcpks_Fcdtronl_Main.Ty_Fcdtronl,
                                p_Wrk_Fcdtronl     IN OUT Fcpks_Fcdtronl_Main.Ty_Fcdtronl,
                                p_Err_Code         IN OUT VARCHAR2,
                                p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Redefine_Sch(p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_Id      IN VARCHAR2,
                           p_Action_Code      IN VARCHAR2,
                           p_Fcdtronl         IN Fcpks_Fcdtronl_Main.Ty_Fcdtronl,
                           p_Prev_Fcdtronl    IN Fcpks_Fcdtronl_Main.Ty_Fcdtronl,
                           p_Wrk_Fcdtronl     IN OUT Fcpks_Fcdtronl_Main.Ty_Fcdtronl,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Default_And_Validate(p_Source           IN VARCHAR2,
                                   p_Source_Operation IN VARCHAR2,
                                   p_Function_Id      IN VARCHAR2,
                                   p_Action_Code      IN VARCHAR2,
                                   p_Fcdtronl         IN Fcpks_Fcdtronl_Main.Ty_Fcdtronl,
                                   p_Prev_Fcdtronl    IN Fcpks_Fcdtronl_Main.Ty_Fcdtronl,
                                   p_Wrk_Fcdtronl     IN OUT Fcpks_Fcdtronl_Main.Ty_Fcdtronl,
                                   p_Err_Code         IN OUT VARCHAR2,
                                   p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Upload_Db(p_Source           IN VARCHAR2,
                        p_Source_Operation IN VARCHAR2,
                        p_Function_Id      IN VARCHAR2,
                        p_Action_Code      IN VARCHAR2,
                        p_Fcdtronl         IN Fcpks_Fcdtronl_Main.Ty_Fcdtronl,
                        p_Prev_Fcdtronl    IN Fcpks_Fcdtronl_Main.Ty_Fcdtronl,
                        p_Wrk_Fcdtronl     IN OUT Fcpks_Fcdtronl_Main.Ty_Fcdtronl,
                        p_Err_Code         IN OUT VARCHAR2,
                        p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
END Fcpks_Fcdtronl_Schedules;
/
CREATE OR REPLACE SYNONYM fcpkss_fcdtronl_schedules FOR fcpks_fcdtronl_schedules
/