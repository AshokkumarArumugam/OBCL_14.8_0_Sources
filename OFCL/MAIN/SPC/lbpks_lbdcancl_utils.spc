CREATE OR REPLACE PACKAGE lbpks_lbdcancl_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdcancl_utils.spc
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
  
  -------------------------------------------------------------------------------------------------------
  */

  FUNCTION Fn_Check_Mandatory(p_Source      IN VARCHAR2,
                              p_Function_Id IN VARCHAR2,
                              p_Action_Code IN VARCHAR2,
                              p_lbdcancl    IN lbpks_lbdcancl_Main.ty_lbdcancl,
                              p_Err_Code    IN OUT VARCHAR2,
                              p_Err_Params  IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Validate(p_Source        IN VARCHAR2,
                       p_Function_Id   IN VARCHAR2,
                       p_Action_Code   IN VARCHAR2,
                       p_lbdcancl      IN lbpks_lbdcancl_Main.Ty_lbdcancl,
                       p_Prev_lbdcancl IN OUT lbpks_lbdcancl_Main.Ty_lbdcancl,
                       p_wrk_lbdcancl  IN OUT lbpks_lbdcancl_Main.Ty_lbdcancl,
                       p_Err_Code      IN OUT VARCHAR2,
                       p_Err_Params    IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Validate2(p_Source        IN VARCHAR2,
                        p_Function_Id   IN VARCHAR2,
                        p_Action_Code   IN VARCHAR2,
                        p_lbdcancl      IN lbpks_lbdcancl_Main.Ty_lbdcancl,
                        p_Prev_lbdcancl IN OUT lbpks_lbdcancl_Main.Ty_lbdcancl,
                        p_wrk_lbdcancl  IN OUT lbpks_lbdcancl_Main.Ty_lbdcancl,
                        p_Err_Code      IN OUT VARCHAR2,
                        p_Err_Params    IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Save(p_Source        IN VARCHAR2,
                   p_Function_Id   IN VARCHAR2,
                   p_Action_Code   IN VARCHAR2,
                   p_lbdcancl      IN lbpks_lbdcancl_Main.Ty_lbdcancl,
                   p_Prev_lbdcancl IN lbpks_lbdcancl_Main.Ty_lbdcancl,
                   p_Wrk_lbdcancl  IN OUT lbpks_lbdcancl_Main.Ty_lbdcancl,
                   p_Err_Code      IN OUT VARCHAR2,
                   p_Err_Params    IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Delete_canc(p_Source       IN VARCHAR2,
                          p_Function_Id  IN VARCHAR2,
                          p_Action_Code  IN VARCHAR2,
                          p_lbdcancl     IN lbpks_lbdcancl_Main.Ty_lbdcancl,
                          p_wrk_lbdcancl IN OUT lbpks_lbdcancl_Main.Ty_lbdcancl,
                          p_Err_Code     IN OUT VARCHAR2,
                          p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Upload_Db(p_Source        IN VARCHAR2,
                        p_Function_Id   IN VARCHAR2,
                        p_Action_Code   IN VARCHAR2,
                        p_lbdcancl      IN lbpks_lbdcancl_Main.Ty_lbdcancl,
                        p_Prev_lbdcancl IN lbpks_lbdcancl_Main.Ty_lbdcancl,
                        p_Wrk_lbdcancl  IN OUT lbpks_lbdcancl_Main.Ty_lbdcancl,
                        p_Err_Code      IN OUT VARCHAR2,
                        p_Err_Params    IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Query(p_Source IN VARCHAR2,
                    
                    p_Function_Id IN VARCHAR2,
                    p_Action_Code IN VARCHAR2,
                    
                    p_lbdcancl     IN lbpks_lbdcancl_Main.Ty_lbdcancl,
                    p_wrk_lbdcancl IN OUT lbpks_lbdcancl_Main.Ty_lbdcancl,
                    p_Err_Code     IN OUT VARCHAR2,
                    p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;

END lbpks_lbdcancl_utils;
/
create or replace synonym lbpkss_lbdcancl_utils for lbpks_lbdcancl_utils
/