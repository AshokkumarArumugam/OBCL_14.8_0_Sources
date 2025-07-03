CREATE OR REPLACE PACKAGE tlpks_tldtdlnk_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : tlpks_tldtdlnk_utils.spc
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
  FUNCTION fn_update_external_refno(p_Source           IN VARCHAR2,
                                    p_Source_Operation IN VARCHAR2,
                                    p_Function_Id      IN VARCHAR2,
                                    p_Action_Code      IN VARCHAR2,
                                    p_Child_Function   IN VARCHAR2,
                                    p_tldtdlnk         IN tlpks_tldtdlnk_Main.Ty_tldtdlnk,
                                    p_Prev_tldtdlnk    IN OUT tlpks_tldtdlnk_Main.Ty_tldtdlnk,
                                    p_Wrk_tldtdlnk     IN OUT tlpks_tldtdlnk_Main.Ty_tldtdlnk,
                                    p_Err_Code         IN OUT VARCHAR2,
                                    p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION fn_validate_pk(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_Child_Function   IN VARCHAR2,
                          p_tldtdlnk         IN tlpks_tldtdlnk_Main.Ty_tldtdlnk,
                          p_Prev_tldtdlnk    IN OUT tlpks_tldtdlnk_Main.Ty_tldtdlnk,
                          p_Wrk_tldtdlnk     IN OUT tlpks_tldtdlnk_Main.Ty_tldtdlnk,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION fn_update_ticket_mapping(p_Source           IN VARCHAR2,
                                    p_Source_Operation IN VARCHAR2,
                                    p_Function_Id      IN VARCHAR2,
                                    p_Action_Code      IN VARCHAR2,
                                    p_Child_Function   IN VARCHAR2,
                                    p_tldtdlnk         IN tlpks_tldtdlnk_Main.Ty_tldtdlnk,
                                    p_Prev_tldtdlnk    IN OUT tlpks_tldtdlnk_Main.Ty_tldtdlnk,
                                    p_Wrk_tldtdlnk     IN OUT tlpks_tldtdlnk_Main.Ty_tldtdlnk,
                                    p_Err_Code         IN OUT VARCHAR2,
                                    p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
END tlpks_tldtdlnk_utils;
/