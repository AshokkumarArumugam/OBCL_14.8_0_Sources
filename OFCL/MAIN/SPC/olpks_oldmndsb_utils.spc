CREATE OR REPLACE PACKAGE Olpks_Oldmndsb_Utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : Olpks_Oldmndsb_Utils.spc
  **
  ** Module     : Oracle Lending
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright (R) 2008,2019 , Oracle and/or its affiliates.  All rights reserved
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
  
  ** Changed By         : Meha
  ** Date               : 25-APR-2019
  ** Change Description : Multi Authorization Changes.
  ** Search String      : BUG#29304432
  
  -------------------------------------------------------------------------------------------------------
  */
  FUNCTION Fn_Delete(p_Source       IN Cotms_Source.Source_Code%TYPE,
                     p_Function_Id  IN VARCHAR2,
                     p_Wrk_Oldmndsb IN OUT Olpks_Oldmndsb_Main.Ty_Oldmndsb,
                     p_Err_Code     IN OUT VARCHAR2,
                     p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Reverse(p_Source       IN VARCHAR2,
                      p_Function_Id  IN VARCHAR2,
                      p_Wrk_Oldmndsb IN OUT Olpks_Oldmndsb_Main.Ty_Oldmndsb,
                      p_Err_Code     IN OUT VARCHAR2,
                      p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Disbursement(p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_Id      IN VARCHAR2,
                           p_Action_Code      IN VARCHAR2,
                           p_Oldmndsb         IN Olpks_Oldmndsb_Main.Ty_Oldmndsb,
                           p_Prev_Oldmndsb    IN Olpks_Oldmndsb_Main.Ty_Oldmndsb,
                           p_Wrk_Oldmndsb     IN OUT Olpks_Oldmndsb_Main.Ty_Oldmndsb,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Default_And_Validate(p_Source           IN VARCHAR2,
                                   p_Source_Operation IN VARCHAR2,
                                   p_Function_Id      IN VARCHAR2,
                                   p_Action_Code      IN VARCHAR2,
                                   p_Child_Function   IN VARCHAR2,
                                   p_Oldmndsb         IN Olpks_Oldmndsb_Main.Ty_Oldmndsb,
                                   p_Prev_Oldmndsb    IN Olpks_Oldmndsb_Main.Ty_Oldmndsb,
                                   p_Wrk_Oldmndsb     IN OUT Olpks_Oldmndsb_Main.Ty_Oldmndsb,
                                   p_Err_Code         IN OUT VARCHAR2,
                                   p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Query(p_Source       IN VARCHAR2,
                    p_Oldmndsb     IN Olpks_Oldmndsb_Main.Ty_Oldmndsb,
                    p_Wrk_Oldmndsb IN OUT Olpks_Oldmndsb_Main.Ty_Oldmndsb,
                    p_Err_Code     IN OUT VARCHAR2,
                    p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;
  --Bug#29304432 Changes Starts
  FUNCTION Fn_Log_Override(p_Source       IN VARCHAR2,
                           p_Function_Id  IN VARCHAR2,
                           p_Action_Code  IN VARCHAR2,
                           p_Wrk_Oldmndsb IN OUT Olpks_Oldmndsb_Main.Ty_Oldmndsb,
                           p_Err_Code     IN OUT VARCHAR2,
                           p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;
  --Bug#29304432 Changes Ends
  FUNCTION Fn_Initiation(p_Source           IN VARCHAR2,
                         p_Source_Operation IN VARCHAR2,
                         p_Function_Id      IN VARCHAR2,
                         p_Action_Code      IN VARCHAR2,
                         p_Oldmndsb         IN Olpks_Oldmndsb_Main.Ty_Oldmndsb,
                         p_Prev_Oldmndsb    IN Olpks_Oldmndsb_Main.Ty_Oldmndsb,
                         p_Wrk_Oldmndsb     IN OUT Olpks_Oldmndsb_Main.Ty_Oldmndsb,
                         p_Err_Code         IN OUT VARCHAR2,
                         p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
END Olpks_Oldmndsb_Utils;
/
CREATE OR REPLACE Synonym Olpkss_Oldmndsb_Utils FOR Olpks_Oldmndsb_Utils
/