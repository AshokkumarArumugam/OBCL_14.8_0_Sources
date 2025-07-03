CREATE OR REPLACE PACKAGE tlpks_tlconssi_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : tlpks_tlconssi_utils.spc
  **
  ** Module     : Syndication Loans and Commitments
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
FUNCTION fn_upload(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_Main_function    IN VARCHAR2,
                     p_Tlconssi         IN Tlpks_Tlconssi_Main.Ty_Tlconssi,
                     p_Prev_Tlconssi    IN Tlpks_Tlconssi_Main.Ty_Tlconssi,
                     p_Wrk_tlconssi     IN OUT tlpks_tlconssi_Main.Ty_tlconssi,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

FUNCTION fn_validate(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_wrk_tlconssi     IN OUT tlpks_tlconssi_main.ty_tlconssi,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
 FUNCTION Fn_Pickup(p_Source        IN VARCHAR2,
                     p_Action_Code   IN VARCHAR2,
                     p_Main_Function IN VARCHAR2,
                     p_Wrk_Tlconssi  IN OUT Tlpks_Tlconssi_Main.Ty_Tlconssi,
                     p_Err_Code      IN OUT VARCHAR2,
                     p_Err_Params    IN OUT VARCHAR2) RETURN BOOLEAN ;
 FUNCTION Fn_Query(p_Source           IN VARCHAR2,
                    p_Source_Operation IN VARCHAR2,
                    p_Function_Id      IN VARCHAR2,
                    p_Action_Code      IN VARCHAR2,
                    p_Main_Function    IN VARCHAR2,
                    p_Key_Tags_Vals    IN OUT VARCHAR2,
                    p_Qrydata_Reqd     IN VARCHAR2,
                    p_Wrk_Tlconssi     IN OUT Tlpks_Tlconssi_Main.Ty_Tlconssi,
                    p_Err_Code         IN OUT VARCHAR2,
                    p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
End tlpks_tlconssi_utils;
/