CREATE OR REPLACE PACKAGE Olpks_olcffmsg_Utils IS

  /*-----------------------------------------------------------------------------------------------------
    **
    ** File Name  : olpks_olcffmsg_utils.spc
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
  g_Wrk_OLCFFMSG Olpks_OLCFFMSG_Main.Ty_OLCFFMSG;
  TYPE Ty_Msg_Media IS TABLE OF Oltbs_Ffmt_Msg_Media%ROWTYPE INDEX BY BINARY_INTEGER;
  g_Msg_Media Ty_Msg_Media;
  FUNCTION Fn_Get_Subsys_Stat(p_Subsystem  IN VARCHAR2,
                              p_Subsysstat IN VARCHAR2) RETURN VARCHAR2;
  FUNCTION Fn_Upd_Subsys_Stat(p_Subsystem  IN VARCHAR2,
                              p_Stat       IN VARCHAR2,
                              p_Subsysstat IN VARCHAR2) RETURN VARCHAR2;
  FUNCTION Fn_Populate_Entity_Details(p_Source           IN VARCHAR2,
                                      p_Source_Operation IN VARCHAR2,
                                      p_Function_Id      IN VARCHAR2,
                                      p_Action_Code      IN VARCHAR2,
                                      p_OLCFFMSG         IN Olpks_OLCFFMSG_Main.Ty_OLCFFMSG,
                                      p_Prev_OLCFFMSG    IN Olpks_OLCFFMSG_Main.Ty_OLCFFMSG,
                                      p_Wrk_OLCFFMSG     IN OUT Olpks_OLCFFMSG_Main.Ty_OLCFFMSG,
                                      p_Err_Code         IN OUT VARCHAR2,
                                      p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Populate_Party_Details(p_Source           IN VARCHAR2,
                                     p_Source_Operation IN VARCHAR2,
                                     p_Function_Id      IN VARCHAR2,
                                     p_Action_Code      IN VARCHAR2,
                                     p_OLCFFMSG         IN Olpks_OLCFFMSG_Main.Ty_OLCFFMSG,
                                     p_Prev_OLCFFMSG    IN Olpks_OLCFFMSG_Main.Ty_OLCFFMSG,
                                     p_Wrk_OLCFFMSG     IN OUT Olpks_OLCFFMSG_Main.Ty_OLCFFMSG,
                                     p_Err_Code         IN OUT VARCHAR2,
                                     p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Populate_Ffmt_Tag(p_Source           IN VARCHAR2,
                                p_Source_Operation IN VARCHAR2,
                                p_Function_Id      IN VARCHAR2,
                                p_Action_Code      IN VARCHAR2,
                                p_Tag_Count        IN NUMBER,
                                p_Wrk_OLCFFMSG     IN OUT Olpks_OLCFFMSG_Main.Ty_OLCFFMSG,
                                p_Err_Code         IN OUT VARCHAR2,
                                p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Validate(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_OLCFFMSG         IN Olpks_OLCFFMSG_Main.Ty_OLCFFMSG,
                       p_Prev_OLCFFMSG    IN Olpks_OLCFFMSG_Main.Ty_OLCFFMSG,
                       p_Wrk_OLCFFMSG     IN OUT Olpks_OLCFFMSG_Main.Ty_OLCFFMSG,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Preview(p_Source           IN VARCHAR2,
                      p_Source_Operation IN VARCHAR2,
                      p_Function_Id      IN VARCHAR2,
                      p_Action_Code      IN VARCHAR2,
                      p_Main_Function    IN  VARCHAR2,
                      p_OLCFFMSG         IN Olpks_OLCFFMSG_Main.Ty_OLCFFMSG,
                      p_Prev_OLCFFMSG    IN Olpks_OLCFFMSG_Main.Ty_OLCFFMSG,
                      p_Wrk_OLCFFMSG     IN OUT Olpks_OLCFFMSG_Main.Ty_OLCFFMSG,
                      p_Err_Code         IN OUT VARCHAR2,
                      p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Generate(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_Main_Function    IN  VARCHAR2,
                       p_OLCFFMSG         IN Olpks_OLCFFMSG_Main.Ty_OLCFFMSG,
                       p_Prev_OLCFFMSG    IN Olpks_OLCFFMSG_Main.Ty_OLCFFMSG,
                       p_Wrk_OLCFFMSG     IN OUT Olpks_OLCFFMSG_Main.Ty_OLCFFMSG,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Tag_Default(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_OLCFFMSG         IN Olpks_OLCFFMSG_Main.Ty_OLCFFMSG,
                          p_Prev_OLCFFMSG    IN Olpks_OLCFFMSG_Main.Ty_OLCFFMSG,
                          p_Wrk_OLCFFMSG     IN OUT Olpks_OLCFFMSG_Main.Ty_OLCFFMSG,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Prorata_Tag_Default(p_Source           IN VARCHAR2,
                                  p_Source_Operation IN VARCHAR2,
                                  p_Function_Id      IN VARCHAR2,
                                  p_Action_Code      IN VARCHAR2,
                                  p_OLCFFMSG         IN Olpks_OLCFFMSG_Main.Ty_OLCFFMSG,
                                  p_Prev_OLCFFMSG    IN Olpks_OLCFFMSG_Main.Ty_OLCFFMSG,
                                  p_Wrk_OLCFFMSG     IN OUT Olpks_OLCFFMSG_Main.Ty_OLCFFMSG,
                                  p_Err_Code         IN OUT VARCHAR2,
                                  p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Delete(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_OLCFFMSG         IN Olpks_OLCFFMSG_Main.Ty_OLCFFMSG,
                     p_Prev_OLCFFMSG    IN Olpks_OLCFFMSG_Main.Ty_OLCFFMSG,
                     p_Wrk_OLCFFMSG     IN OUT Olpks_OLCFFMSG_Main.Ty_OLCFFMSG,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Save(p_Source           IN VARCHAR2,
                   p_Source_Operation IN VARCHAR2,
                   p_Function_Id      IN VARCHAR2,
                   p_Action_Code      IN VARCHAR2,
                   p_Main_Function    IN  VARCHAR2,
                   p_OLCFFMSG         IN Olpks_OLCFFMSG_Main.Ty_OLCFFMSG,
                   p_Prev_OLCFFMSG    IN Olpks_OLCFFMSG_Main.Ty_OLCFFMSG,
                   p_Wrk_OLCFFMSG     IN OUT Olpks_OLCFFMSG_Main.Ty_OLCFFMSG,
                   p_Err_Code         IN OUT VARCHAR2,
                   p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Auth(p_Source           IN VARCHAR2,
                   p_Source_Operation IN VARCHAR2,
                   p_Function_Id      IN VARCHAR2,
                   p_Action_Code      IN VARCHAR2,
                   p_OLCFFMSG         IN Olpks_OLCFFMSG_Main.Ty_OLCFFMSG,
                   p_Prev_OLCFFMSG    IN Olpks_OLCFFMSG_Main.Ty_OLCFFMSG,
                   p_Wrk_OLCFFMSG     IN OUT Olpks_OLCFFMSG_Main.Ty_OLCFFMSG,
                   p_Err_Code         IN OUT VARCHAR2,
                   p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Post_Enrich(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Main_Function    IN  VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_Olcffmsg         IN Olpks_Olcffmsg_Main.Ty_Olcffmsg,
                          p_Prev_Olcffmsg    IN Olpks_Olcffmsg_Main.Ty_Olcffmsg,
                          p_Wrk_Olcffmsg     IN OUT Olpks_Olcffmsg_Main.Ty_Olcffmsg,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

END Olpks_OLCFFMSG_Utils;
/