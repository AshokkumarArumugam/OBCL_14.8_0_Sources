CREATE OR REPLACE PACKAGE Olpks_Olcffmbr_Utils IS

  /*-----------------------------------------------------------------------------------------------------
    **
    ** File Name  : olpks_Olcffmbr_utils.spc
    **
    ** Module     : Loans Syndication
    **
    ** This source is part of the Oracle Banking Software Product.
    ** Oracle Banking Corporate Lending  Software Product.   Copyright Â© 2018.  All rights reserved
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

    Changed By         : 
    Change Description : 
    Date               : 

  -------------------------------------------------------------------------------------------------------*/
  g_Cont_Stat    Oltb_Contract.Contract_Status%TYPE;
  g_Wrk_Olcffmbr Olpks_Olcffmbr_Main.Ty_Olcffmbr;
  FUNCTION Fn_Get_Subsys_Stat(p_Subsystem  IN VARCHAR2,
                              p_Subsysstat IN VARCHAR2) RETURN VARCHAR2;
  FUNCTION Fn_Upd_Subsys_Stat(p_Subsystem  IN VARCHAR2,
                              p_Stat       IN VARCHAR2,
                              p_Subsysstat IN VARCHAR2) RETURN VARCHAR2;
  FUNCTION Fn_Populate_Party_Details(p_Source           IN VARCHAR2,
                                     p_Source_Operation IN VARCHAR2,
                                     p_Function_Id      IN VARCHAR2,
                                     p_Action_Code      IN VARCHAR2,
                                     p_Olcffmbr         IN Olpks_Olcffmbr_Main.Ty_Olcffmbr,
                                     p_Prev_Olcffmbr    IN Olpks_Olcffmbr_Main.Ty_Olcffmbr,
                                     p_Wrk_Olcffmbr     IN OUT Olpks_Olcffmbr_Main.Ty_Olcffmbr,
                                     p_Err_Code         IN OUT VARCHAR2,
                                     p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Populate_Ffmt_Tag(p_Source           IN VARCHAR2,
                                p_Source_Operation IN VARCHAR2,
                                p_Function_Id      IN VARCHAR2,
                                p_Action_Code      IN VARCHAR2,
                                p_Tag_Count        IN NUMBER,
                                p_Wrk_Olcffmbr     IN OUT Olpks_Olcffmbr_Main.Ty_Olcffmbr,
                                p_Err_Code         IN OUT VARCHAR2,
                                p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Validate(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_Olcffmbr         IN Olpks_Olcffmbr_Main.Ty_Olcffmbr,
                       p_Prev_Olcffmbr    IN Olpks_Olcffmbr_Main.Ty_Olcffmbr,
                       p_Wrk_Olcffmbr     IN OUT Olpks_Olcffmbr_Main.Ty_Olcffmbr,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Preview(p_Source           IN VARCHAR2,
                      p_Source_Operation IN VARCHAR2,
                      p_Function_Id      IN VARCHAR2,
                      p_Action_Code      IN VARCHAR2,
                      p_Main_function    IN VARCHAR2,
                      p_Olcffmbr         IN Olpks_Olcffmbr_Main.Ty_Olcffmbr,
                      p_Prev_Olcffmbr    IN Olpks_Olcffmbr_Main.Ty_Olcffmbr,
                      p_Wrk_Olcffmbr     IN OUT Olpks_Olcffmbr_Main.Ty_Olcffmbr,
                      p_Err_Code         IN OUT VARCHAR2,
                      p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Generate(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_Main_function    IN VARCHAR2,
                       p_Olcffmbr         IN Olpks_Olcffmbr_Main.Ty_Olcffmbr,
                       p_Prev_Olcffmbr    IN Olpks_Olcffmbr_Main.Ty_Olcffmbr,
                       p_Wrk_Olcffmbr     IN OUT Olpks_Olcffmbr_Main.Ty_Olcffmbr,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Tag_Default(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_Olcffmbr         IN Olpks_Olcffmbr_Main.Ty_Olcffmbr,
                          p_Prev_Olcffmbr    IN Olpks_Olcffmbr_Main.Ty_Olcffmbr,
                          p_Wrk_Olcffmbr     IN OUT Olpks_Olcffmbr_Main.Ty_Olcffmbr,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Delete(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_Olcffmbr         IN Olpks_Olcffmbr_Main.Ty_Olcffmbr,
                     p_Prev_Olcffmbr    IN Olpks_Olcffmbr_Main.Ty_Olcffmbr,
                     p_Wrk_Olcffmbr     IN OUT Olpks_Olcffmbr_Main.Ty_Olcffmbr,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Save(p_Source           IN VARCHAR2,
                   p_Source_Operation IN VARCHAR2,
                   p_Function_Id      IN VARCHAR2,
                   p_Action_Code      IN VARCHAR2,
                   p_Main_function    IN VARCHAR2,
                   p_Olcffmbr         IN Olpks_Olcffmbr_Main.Ty_Olcffmbr,
                   p_Prev_Olcffmbr    IN Olpks_Olcffmbr_Main.Ty_Olcffmbr,
                   p_Wrk_Olcffmbr     IN OUT Olpks_Olcffmbr_Main.Ty_Olcffmbr,
                   p_Err_Code         IN OUT VARCHAR2,
                   p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Auth(p_Source           IN VARCHAR2,
                   p_Source_Operation IN VARCHAR2,
                   p_Function_Id      IN VARCHAR2,
                   p_Action_Code      IN VARCHAR2,
                   p_Olcffmbr         IN Olpks_Olcffmbr_Main.Ty_Olcffmbr,
                   p_Prev_Olcffmbr    IN Olpks_Olcffmbr_Main.Ty_Olcffmbr,
                   p_Wrk_Olcffmbr     IN OUT Olpks_Olcffmbr_Main.Ty_Olcffmbr,
                   p_Err_Code         IN OUT VARCHAR2,
                   p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Copy(p_Source           IN VARCHAR2,
                   p_Source_Operation IN VARCHAR2,
                   p_Function_Id      IN VARCHAR2,
                   p_Action_Code      IN VARCHAR2,
                   p_Olcffmbr         IN Olpks_Olcffmbr_Main.Ty_Olcffmbr,
                   p_Prev_Olcffmbr    IN Olpks_Olcffmbr_Main.Ty_Olcffmbr,
                   p_Wrk_Olcffmbr     IN OUT Olpks_Olcffmbr_Main.Ty_Olcffmbr,
                   p_Err_Code         IN OUT VARCHAR2,
                   p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
            
  FUNCTION Fn_Post_Enrich(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Main_Function    IN  VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_Olcffmbr         IN Olpks_Olcffmbr_Main.Ty_Olcffmbr,
                          p_Prev_Olcffmbr    IN Olpks_Olcffmbr_Main.Ty_Olcffmbr,
                          p_Wrk_Olcffmbr     IN OUT Olpks_Olcffmbr_Main.Ty_Olcffmbr,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
END Olpks_Olcffmbr_Utils;
/