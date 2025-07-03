create or replace package lbpks_lbdrsaut_utils is
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdrpaut_utils.spc
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
 
 
 
      Changed By         : Mohan Pal
    Date               : 23-Aug-2022
    Change Description : BUG#34461108_DFLT_FRM  
    Search String      : BUG#34461108_DFLT_FRM
  
  -------------------------------------------------------------------------------------------------------
  */
  g_dd_split_reprice varchar(1) := 'N';---BUG#34461108_DFLT_FRM
  FUNCTION Fn_Validate(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_Child_Function   IN VARCHAR2,
                       p_lbdrsaut         IN lbpks_lbdrsaut_Main.Ty_lbdrsaut,
                       p_Prev_lbdrsaut    IN OUT lbpks_lbdrsaut_Main.Ty_lbdrsaut,
                       p_Wrk_lbdrsaut     IN OUT lbpks_lbdrsaut_Main.Ty_lbdrsaut,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Display_Fields(p_Source           IN VARCHAR2,
                             p_Source_Operation IN VARCHAR2,
                             p_Function_Id      IN VARCHAR2,
                             p_Action_Code      IN VARCHAR2,
                             p_Child_Function   IN VARCHAR2,
                             p_Full_Data        IN VARCHAR2 DEFAULT 'Y',
                             p_With_Lock        IN VARCHAR2 DEFAULT 'N',
                             p_QryData_Reqd     IN VARCHAR2,
                             p_lbdrsaut         IN lbpks_lbdrsaut_Main.Ty_lbdrsaut,
                             p_Wrk_lbdrsaut     IN OUT lbpks_lbdrsaut_Main.Ty_lbdrsaut,
                             p_Err_Code         IN OUT VARCHAR2,
                             p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Authorize(p_Source           IN VARCHAR2,
                        p_Source_Operation IN VARCHAR2,
                        p_Function_Id      IN VARCHAR2,
                        p_Action_Code      IN VARCHAR2,
                        p_Child_Function   IN VARCHAR2,
                        p_Multi_Trip_Id    IN VARCHAR2,
                        p_lbdrsaut         IN lbpks_lbdrsaut_Main.Ty_lbdrsaut,
                        p_Prev_lbdrsaut    IN lbpks_lbdrsaut_Main.Ty_lbdrsaut,
                        p_Wrk_lbdrsaut     IN OUT lbpks_lbdrsaut_Main.Ty_lbdrsaut,
                        p_Err_Code         IN OUT VARCHAR2,
                        p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
end lbpks_lbdrsaut_utils;
/
CREATE OR REPLACE SYNONYM lbpkss_lbdrsaut_utils for lbpks_lbdrsaut_utils
/