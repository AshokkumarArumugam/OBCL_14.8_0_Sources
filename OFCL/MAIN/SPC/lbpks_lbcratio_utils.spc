CREATE OR REPLACE PACKAGE lbpks_lbcratio_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbcratio_utils.spc
  **
  ** Module     : Loans Syndication
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

  TYPE ty_parat IS TABLE OF lbtbs_contract_participant%ROWTYPE INDEX BY BINARY_INTEGER;

  FUNCTION Fn_Default_And_Validate(p_Source       IN VARCHAR2,
                                   p_Function_Id  IN VARCHAR2,
                                   p_Action_Code  IN VARCHAR2,
                                   p_Wrk_lbcratio IN OUT lbpks_lbcratio_Main.Ty_lbcratio,
                                   p_Err_Code     IN OUT VARCHAR2,
                                   p_Err_Params   IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Upload_Db(p_Source       IN VARCHAR2,
                        p_Function_Id  IN VARCHAR2,
                        p_Action_Code  IN VARCHAR2,
                        p_wrk_lbcratio IN OUT lbpks_lbcratio_Main.Ty_lbcratio,
                        p_Err_Code     IN OUT VARCHAR2,
                        p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Calculate(p_Source       IN VARCHAR2,
                        p_Function_Id  IN VARCHAR2,
                        p_Action_Code  IN VARCHAR2,
                        p_Wrk_lbcratio IN OUT lbpks_lbcratio_Main.Ty_lbcratio,
                        p_Err_Code     IN OUT VARCHAR2,
                        p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Query(p_Source       IN VARCHAR2,
                    p_Function_Id  IN VARCHAR2,
                    p_Action_Code  IN VARCHAR2,
                    p_wrk_lbcratio IN OUT lbpks_lbcratio_Main.ty_lbcratio,
                    p_Err_Code     IN OUT VARCHAR2,
                    p_err_params   IN OUT VARCHAR2) RETURN BOOLEAN;

END lbpks_lbcratio_utils;
/
CREATE OR REPLACE SYNONYM lbpkss_lbcratio_utils FOR lbpks_lbcratio_utils
/