CREATE OR REPLACE PACKAGE tlpks_tlddcflq_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : tlpks_tlddcflq_utils.spc
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
  
  -------------------------------------------------------------------------------------------------------
  */

  l_exist number;

  FUNCTION FN_GET_CURRENT_VERSION(p_populate     VARCHAR2,
                                  p_Wrk_tlddcflq IN OUT tlpks_tlddcflq_Main.Ty_tlddcflq)
    RETURN BOOLEAN;

  FUNCTION FN_GET_RECORD(p_Wrk_tlddcflq       IN OUT tlpks_tlddcflq_Main.Ty_tlddcflq,
                         l_liquidation_ref_no OUT TLTB_DCF_LIQD_AGENCY_MASTER.liquidation_ref_no%TYPE,
                         l_event_seq_no       OUT TLTB_DCF_LIQD_AGENCY_MASTER.event_seq_no%TYPE)
    RETURN BOOLEAN;

  PROCEDURE PR_POP_TRADE_BLK(p_Wrk_tlddcflq IN OUT tlpks_tlddcflq_Main.Ty_tlddcflq);

  FUNCTION Fn_Populate(p_Source       IN VARCHAR2,
                       p_Function_Id  IN VARCHAR2,
                       p_Action_Code  IN VARCHAR2,
                       p_tlddcflq     IN tlpks_tlddcflq_Main.Ty_tlddcflq,
                       p_Wrk_tlddcflq IN OUT tlpks_tlddcflq_Main.Ty_tlddcflq,
                       p_Err_Code     IN OUT VARCHAR2,
                       p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_sum_master(p_Wrk_tlddcflq IN OUT tlpks_tlddcflq_Main.Ty_tlddcflq,
                         p_Source       IN VARCHAR2,
                         p_Function_Id  IN VARCHAR2,
                         p_Err_Code     IN OUT VARCHAR2,
                         p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Query(p_Source           IN VARCHAR2,
                    p_Source_Operation IN VARCHAR2,
                    p_Function_Id      IN VARCHAR2,
                    p_Action_Code      IN VARCHAR2,
                    p_Wrk_tlddcflq     IN OUT tlpks_tlddcflq_Main.Ty_tlddcflq,
                    p_Err_Code         IN OUT VARCHAR2,
                    p_Err_Params       IN OUT VARCHAR2,
                    p_E_S_N            IN TLTB_DCF_LIQD_AGENCY_MASTER.EVENT_SEQ_NO%TYPE)
    RETURN BOOLEAN;

  FUNCTION fn_reverse(p_Wrk_tlddcflq IN OUT tlpks_tlddcflq_Main.Ty_tlddcflq,
                      p_Source       IN VARCHAR2,
                      p_Function_Id  IN VARCHAR2,
                      p_Err_Code     IN OUT VARCHAR2,
                      p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;
                      
                      FUNCTION fn_delete(p_Wrk_tlddcflq IN OUT tlpks_tlddcflq_Main.Ty_tlddcflq,
                     p_Source       IN VARCHAR2,
                     p_Function_Id  IN VARCHAR2,
                     p_Err_Code     IN OUT VARCHAR2,
                     p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;

END tlpks_tlddcflq_utils;
/