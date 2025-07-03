CREATE OR REPLACE PACKAGE tlpks_tlcswonl_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : tlpks_tlcswonl_utils.spc
  **
  ** Module     : Secondary Loan Trading
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

  FUNCTION Fn_Validate(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_Main_Function    IN VARCHAR2,
                       p_Child_Function   IN VARCHAR2,
                       p_tlcswonl         IN tlpks_tlcswonl_Main.Ty_tlcswonl,
                       p_Prev_tlcswonl    IN OUT tlpks_tlcswonl_Main.Ty_tlcswonl,
                       p_wrk_tlcswonl     IN OUT tlpks_tlcswonl_Main.Ty_tlcswonl,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Pickup(p_Source       IN VARCHAR2,
                     p_Function_Id  IN VARCHAR2,
                     p_Action_Code  IN VARCHAR2,
                     p_Upld         IN VARCHAR2,
                     p_Ext_Ref      IN VARCHAR2,
                     p_Ver          IN VARCHAR2,
                     p_Brn          IN VARCHAR2,
                     p_Src_Code     IN VARCHAR2,
                     p_Wrk_Tlcswonl IN OUT Tlpks_Tlcswonl_Main.Ty_Tlcswonl,
                     p_Err_Code     IN OUT VARCHAR2,
                     p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Upload(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_Main_Function    IN VARCHAR2,
                     p_Child_Function   IN VARCHAR2,
                     p_Tlcswonl         IN Tlpks_Tlcswonl_Main.Ty_Tlcswonl,
                     p_Prev_Tlcswonl    IN OUT Tlpks_Tlcswonl_Main.Ty_Tlcswonl,
                     p_Wrk_Tlcswonl     IN OUT Tlpks_Tlcswonl_Main.Ty_Tlcswonl,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
FUNCTION Fn_Query(p_Source           IN VARCHAR2,
                    p_Source_Operation IN VARCHAR2,
                    p_Function_Id      IN VARCHAR2,
                    p_Action_Code      IN VARCHAR2,
                    p_Main_Function    IN VARCHAR2,
                    p_Key_Tags_Vals    IN VARCHAR2,
                    p_Qrydata_Reqd     IN VARCHAR2,
                    p_Tlcswonl         IN Tlpks_Tlcswonl_Main.Ty_Tlcswonl,
                    p_Wrk_Tlcswonl     IN OUT Tlpks_Tlcswonl_Main.Ty_Tlcswonl,
                    p_Err_Code         IN OUT VARCHAR2,
                    p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;					 
END tlpks_tlcswonl_utils;
/
CREATE OR REPLACE SYNONYM tlpkss_tlcswonl_utils FOR tlpks_tlcswonl_utils
/