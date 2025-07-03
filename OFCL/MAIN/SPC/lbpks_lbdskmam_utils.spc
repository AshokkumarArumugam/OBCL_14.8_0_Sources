CREATE OR REPLACE PACKAGE lbpks_lbdskmam_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdskmam_utils.spc
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

  FUNCTION fn_validate(P_SOURCE IN VARCHAR2,
                       
                       P_FUNCTION_ID   IN VARCHAR2,
                       P_ACTION_CODE   IN VARCHAR2,
                       P_LBDSKMAM      IN LBPKS_LBDSKMAM_MAIN.TY_LBDSKMAM,
                       P_PREV_LBDSKMAM IN OUT LBPKS_LBDSKMAM_MAIN.TY_LBDSKMAM,
                       P_WRK_LBDSKMAM  IN OUT LBPKS_LBDSKMAM_MAIN.TY_LBDSKMAM,
                       P_ERR_CODE      IN OUT VARCHAR2,
                       P_ERR_PARAMS    IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_Upload_db(p_Source           IN VARCHAR2,
                        p_Source_Operation IN VARCHAR2,
                        p_Function_Id      IN VARCHAR2,
                        p_Action_Code      IN VARCHAR2,
                        p_Child_Function   IN VARCHAR2,
                        p_Multi_Trip_Id    IN VARCHAR2,
                        p_lbdskmam         IN lbpks_lbdskmam_Main.Ty_lbdskmam,
                        p_Prev_lbdskmam    IN lbpks_lbdskmam_Main.Ty_lbdskmam,
                        p_Wrk_lbdskmam     IN OUT lbpks_lbdskmam_Main.Ty_lbdskmam,
                        p_Err_Code         IN OUT VARCHAR2,
                        p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  /*FUNCTION fn_validdel(P_SOURCE        IN VARCHAR2,
  P_FUNCTION_ID   IN VARCHAR2,
  P_ACTION_CODE   IN VARCHAR2,
  P_LBDSKMAM      IN LBPKS_LBDSKMAM_MAIN.TY_LBDSKMAM,
  P_PREV_LBDSKMAM IN OUT LBPKS_LBDSKMAM_MAIN.TY_LBDSKMAM,
  P_WRK_LBDSKMAM  IN OUT LBPKS_LBDSKMAM_MAIN.TY_LBDSKMAM,
  P_ERR_CODE      IN OUT VARCHAR2,
  P_ERR_PARAMS    IN OUT VARCHAR2) RETURN BOOLEAN;*/

  /*FUNCTION fn_val1(p_Source           IN VARCHAR2,
  p_Source_Operation IN VARCHAR2,
  p_Function_Id      IN VARCHAR2,
  p_Action_Code      IN VARCHAR2,
  p_Child_Function   IN VARCHAR2,
  p_Full_Data        IN VARCHAR2 DEFAULT 'Y',
  p_With_Lock        IN VARCHAR2 DEFAULT 'N',
  p_QryData_Reqd     IN VARCHAR2,
  p_lbdskmam         IN lbpks_lbdskmam_Main.Ty_lbdskmam,
  p_Wrk_lbdskmam     IN OUT lbpks_lbdskmam_Main.Ty_lbdskmam,
  p_Err_Code         IN OUT VARCHAR2,
  p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;*/
  FUNCTION Fn_Sys_Query(p_Source           IN VARCHAR2,
                        p_Source_Operation IN VARCHAR2,
                        p_Function_Id      IN VARCHAR2,
                        p_Action_Code      IN VARCHAR2,
                        p_Full_Data        IN VARCHAR2 DEFAULT 'Y',
                        p_With_Lock        IN VARCHAR2 DEFAULT 'N',
                        p_QryData_Reqd     IN VARCHAR2,
                        p_lbdskmam         IN lbpks_lbdskmam_Main.Ty_lbdskmam,
                        p_Wrk_lbdskmam     IN OUT lbpks_lbdskmam_Main.Ty_lbdskmam,
                        p_Err_Code         IN OUT VARCHAR2,
                        p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

END lbpks_lbdskmam_utils;
/