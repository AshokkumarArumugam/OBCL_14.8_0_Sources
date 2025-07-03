CREATE OR REPLACE PACKAGE lbpks_lbdbrmnc_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdbrmnc_utils.spc
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
  
  **  Modified By     : Vineeth T M
  **  Modified On     : 20-DEC-2023
  **  Modified Reason : Added validation to check length of ultimate benefeciary and account with institution fields
  **  Search String   : Bug#36102656 
  
  -------------------------------------------------------------------------------------------------------
  */
  FUNCTION Fn_Validate(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_Child_Function   IN VARCHAR2,
                       p_lbdbrmnc         IN lbpks_lbdbrmnc_Main.Ty_lbdbrmnc,
                       p_Prev_lbdbrmnc    IN OUT lbpks_lbdbrmnc_Main.Ty_lbdbrmnc,
                       p_Wrk_lbdbrmnc     IN OUT lbpks_lbdbrmnc_Main.Ty_lbdbrmnc,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Contrac_event_log(p_Source       IN VARCHAR2,
                                p_Function_Id  IN VARCHAR2,
                                p_Action_Code  IN VARCHAR2,
                                p_Wrk_lbdbrmnc IN OUT lbpks_lbdbrmnc_Main.Ty_lbdbrmnc,
                                p_Err_Code     IN OUT VARCHAR2,
                                p_Err_Params   IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Upload_Db(p_Source           IN VARCHAR2,
                        p_Source_Operation IN VARCHAR2,
                        p_Function_Id      IN VARCHAR2,
                        p_Action_Code      IN VARCHAR2,
                        p_lbdbrmnc         IN lbpks_lbdbrmnc_Main.Ty_lbdbrmnc,
                        p_Prev_lbdbrmnc    IN lbpks_lbdbrmnc_Main.Ty_lbdbrmnc,
                        p_Wrk_lbdbrmnc     IN OUT lbpks_lbdbrmnc_Main.Ty_lbdbrmnc,
                        p_Err_Code         IN OUT VARCHAR2,
                        p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Query(p_Source           IN VARCHAR2,
                    p_Source_Operation IN VARCHAR2,
                    p_Function_Id      IN VARCHAR2,
                    p_Action_Code      IN VARCHAR2,
                    p_Full_Data        IN VARCHAR2 DEFAULT 'Y',
                    p_With_Lock        IN VARCHAR2 DEFAULT 'N',
                    p_QryData_Reqd     IN VARCHAR2,
                    p_lbdbrmnc         IN lbpks_lbdbrmnc_Main.Ty_lbdbrmnc,
                    p_Wrk_lbdbrmnc     IN OUT lbpks_lbdbrmnc_Main.Ty_lbdbrmnc,
                    p_Err_Code         IN OUT VARCHAR2,
                    p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
   --Bug#36102656 changes start
  FUNCTION Fn_Validate_Len_Samd(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                p_event_seq_no    in oltbs_contract.LATEST_EVENT_SEQ_NO%type,
                                p_Function_Id     in VARCHAR2,
                                p_Source          in VARCHAR2,
                                p_Err_Code        IN OUT VARCHAR2,
                                p_Err_Params      IN OUT VARCHAR2) RETURN BOOLEAN;
  --Bug#36102656 changes end
END lbpks_lbdbrmnc_utils;
/
CREATE OR REPLACE SYNONYM lbpkss_lbdbrmnc_utils FOR lbpks_lbdbrmnc_utils
/