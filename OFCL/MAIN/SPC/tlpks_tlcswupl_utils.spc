CREATE OR REPLACE PACKAGE tlpks_tlcswupl_utils IS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : tlpks_tlcswupl_utils.spc
  **
  ** Module     : Secondary Loan Trading
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
  FUNCTION Fn_Validate(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_Tlcswupl         IN Tlpks_Tlcswupl_Main.Ty_Tlcswupl,
                       p_Prev_Tlcswupl    IN Tlpks_Tlcswupl_Main.Ty_Tlcswupl,
                       p_Wrk_Tlcswupl     IN OUT Tlpks_Tlcswupl_Main.Ty_Tlcswupl,
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
                     p_Wrk_Tlcswupl IN OUT Tlpks_Tlcswupl_Main.Ty_Tlcswupl,
                     p_Err_Code     IN OUT VARCHAR2,
                     p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Upload(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_Main_Function    IN VARCHAR2,
                     p_Tlcswupl         IN Tlpks_Tlcswupl_Main.Ty_Tlcswupl,
                     p_Prev_Tlcswupl    IN Tlpks_Tlcswupl_Main.Ty_Tlcswupl,
                     p_Wrk_Tlcswupl     IN OUT Tlpks_Tlcswupl_Main.Ty_Tlcswupl,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Query(p_Source           IN VARCHAR2,
                    p_Source_Operation IN VARCHAR2,
                    p_Function_Id      IN VARCHAR2,
                    p_Action_Code      IN VARCHAR2,
                    p_Main_Function    IN VARCHAR2,
                    p_Key_Tags_Vals    IN VARCHAR2,
                    p_Qrydata_Reqd     IN VARCHAR2,
                    p_Tlcswupl         IN Tlpks_Tlcswupl_Main.Ty_Tlcswupl,
                    p_Wrk_Tlcswupl     IN OUT Tlpks_Tlcswupl_Main.Ty_Tlcswupl,
                    p_Err_Code         IN OUT VARCHAR2,
                    p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;					 
END tlpks_tlcswupl_utils;
/
CREATE OR REPLACE SYNONYM tlpkss_tlcswupl_utils FOR tlpks_tlcswupl_utils
/