create or replace package olpks_oldffmcu_utils is

  /*-----------------------------------------------------------------------------------------------------
    **
    ** File Name  : olpks_oldffmcu_utils.spc
    **
    ** Module     : Loans Syndication
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

    Changed By         : AliAkbar Shafi
    Change Description : Changes done in oldffmcu utils
    Date               : 20-Dec-2016

  **  Modified By     : Pallavi R
  **  Modified On     : 28-Oct-2024
  **  Modified Reason : User was not able to capture Free Format messages for customers/Hold contracts.
  **  Search String   : No Search string ,The code was completely rewritten to correspond with the transaction screens
  -------------------------------------------------------------------------------------------------------*/

  g_Cont_Stat    Oltb_Contract.Contract_Status%TYPE;
  g_Wrk_Oldffmcu Olpks_Oldffmcu_Main.Ty_Oldffmcu;
  FUNCTION Fn_Get_Subsys_Stat(p_Subsystem  IN VARCHAR2,
                              p_Subsysstat IN VARCHAR2) RETURN VARCHAR2;
  FUNCTION Fn_Upd_Subsys_Stat(p_Subsystem  IN VARCHAR2,
                              p_Stat       IN VARCHAR2,
                              p_Subsysstat IN VARCHAR2) RETURN VARCHAR2;
  FUNCTION Fn_Populate_Party_Details(p_Source           IN VARCHAR2,
                                     p_Source_Operation IN VARCHAR2,
                                     p_Function_Id      IN VARCHAR2,
                                     p_Action_Code      IN VARCHAR2,
                                     p_Oldffmcu         IN Olpks_Oldffmcu_Main.Ty_Oldffmcu,
                                     p_Prev_Oldffmcu    IN OUT Olpks_Oldffmcu_Main.Ty_Oldffmcu,
                                     p_Wrk_Oldffmcu     IN OUT Olpks_Oldffmcu_Main.Ty_Oldffmcu,
                                     p_Err_Code         IN OUT VARCHAR2,
                                     p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Populate_Contract(p_Source           IN VARCHAR2,
                                p_Source_Operation IN VARCHAR2,
                                p_Function_Id      IN VARCHAR2,
                                p_Action_Code      IN VARCHAR2,
                                p_Ref              IN VARCHAR2,
                                p_Oldffmcu         IN Olpks_Oldffmcu_Main.Ty_Oldffmcu,
                                p_Prev_Oldffmcu    IN Olpks_Oldffmcu_Main.Ty_Oldffmcu,
                                p_Wrk_Oldffmcu     IN OUT Olpks_Oldffmcu_Main.Ty_Oldffmcu,
                                p_Err_Code         IN OUT VARCHAR2,
                                p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;	

  FUNCTION Fn_Validate(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_Oldffmcu         IN Olpks_Oldffmcu_Main.Ty_Oldffmcu,
                       p_Prev_Oldffmcu    IN Olpks_Oldffmcu_Main.Ty_Oldffmcu,
                       p_Wrk_Oldffmcu     IN OUT Olpks_Oldffmcu_Main.Ty_Oldffmcu,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Preview(p_Source           IN VARCHAR2,
                      p_Source_Operation IN VARCHAR2,
                      p_Function_Id      IN VARCHAR2,
                      p_Action_Code      IN VARCHAR2,
                      p_Oldffmcu         IN Olpks_Oldffmcu_Main.Ty_Oldffmcu,
                      p_Prev_Oldffmcu    IN Olpks_Oldffmcu_Main.Ty_Oldffmcu,
                      p_Wrk_Oldffmcu     IN OUT Olpks_Oldffmcu_Main.Ty_Oldffmcu,
                      p_Err_Code         IN OUT VARCHAR2,
                      p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Generate(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_Oldffmcu         IN Olpks_Oldffmcu_Main.Ty_Oldffmcu,
                       p_Prev_Oldffmcu    IN Olpks_Oldffmcu_Main.Ty_Oldffmcu,
                       p_Wrk_Oldffmcu     IN OUT Olpks_Oldffmcu_Main.Ty_Oldffmcu,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Delete(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_Oldffmcu         IN Olpks_Oldffmcu_Main.Ty_Oldffmcu,
                     p_Prev_Oldffmcu    IN Olpks_Oldffmcu_Main.Ty_Oldffmcu,
                     p_Wrk_Oldffmcu     IN OUT Olpks_Oldffmcu_Main.Ty_Oldffmcu,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Save(p_Source           IN VARCHAR2,
                   p_Source_Operation IN VARCHAR2,
                   p_Function_Id      IN VARCHAR2,
                   p_Action_Code      IN VARCHAR2,
                   p_Oldffmcu         IN Olpks_Oldffmcu_Main.Ty_Oldffmcu,
                   p_Prev_Oldffmcu    IN Olpks_Oldffmcu_Main.Ty_Oldffmcu,
                   p_Wrk_Oldffmcu     IN OUT Olpks_Oldffmcu_Main.Ty_Oldffmcu,
                   p_Err_Code         IN OUT VARCHAR2,
                   p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Auth(p_Source           IN VARCHAR2,
                   p_Source_Operation IN VARCHAR2,
                   p_Function_Id      IN VARCHAR2,
                   p_Action_Code      IN VARCHAR2,
                   p_Oldffmcu         IN Olpks_Oldffmcu_Main.Ty_Oldffmcu,
                   p_Prev_Oldffmcu    IN Olpks_Oldffmcu_Main.Ty_Oldffmcu,
                   p_Wrk_Oldffmcu     IN OUT Olpks_Oldffmcu_Main.Ty_Oldffmcu,
                   p_Err_Code         IN OUT VARCHAR2,
                   p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Copy(p_Source           IN VARCHAR2,
                   p_Source_Operation IN VARCHAR2,
                   p_Function_Id      IN VARCHAR2,
                   p_Action_Code      IN VARCHAR2,
                   p_Oldffmcu         IN Olpks_Oldffmcu_Main.Ty_Oldffmcu,
                   p_Prev_Oldffmcu    IN Olpks_Oldffmcu_Main.Ty_Oldffmcu,
                   p_Wrk_Oldffmcu     IN OUT Olpks_Oldffmcu_Main.Ty_Oldffmcu,
                   p_Err_Code         IN OUT VARCHAR2,
                   p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
END Olpks_Oldffmcu_Utils;
/
CREATE OR REPLACE SYNONYM Olpkss_Oldffmcu_Utils FOR Olpks_Oldffmcu_Utils
/
