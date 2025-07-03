CREATE OR REPLACE PACKAGE lbpks_lbcbadtl_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbcbadtl_kernel.spc
  **
  ** Module     : Syndication Loans and Commitments
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
  
  SFR Number         :
  Changed By         :
  Change Description :
  
  -------------------------------------------------------------------------------------------------------
  */

  FUNCTION Fn_default_and_validate(p_Source           IN VARCHAR2,
                                   p_Source_Operation IN VARCHAR2,
                                   p_Function_Id      IN VARCHAR2,
                                   p_Action_Code      IN VARCHAR2,
                                   p_Main_Function    IN VARCHAR2,
                                   p_lbcbadtl         IN lbpks_lbcbadtl_Main.Ty_lbcbadtl,
                                   p_Prev_lbcbadtl    IN lbpks_lbcbadtl_Main.Ty_lbcbadtl,
                                   p_Wrk_lbcbadtl     IN OUT lbpks_lbcbadtl_Main.Ty_lbcbadtl,
                                   p_Err_Code         IN OUT VARCHAR2,
                                   p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Upload(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_Main_Function    IN VARCHAR2,
                     p_lbcbadtl         IN lbpks_lbcbadtl_Main.Ty_lbcbadtl,
                     p_Prev_lbcbadtl    IN lbpks_lbcbadtl_Main.Ty_lbcbadtl,
                     p_Wrk_lbcbadtl     IN OUT lbpks_lbcbadtl_Main.Ty_lbcbadtl,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
 
PROCEDURE PR_DET_ASSIGN_VALUES(p_Main_Function IN VARCHAR2,
                                 p_Wrk_lbcbadtl  IN OUT lbpks_lbcbadtl_Main.Ty_lbcbadtl);
  PROCEDURE pr_update_stamping_RateAmount(p_wrk_lbcbadtl IN lbpks_lbcbadtl_main.ty_lbcbadtl.v_oltb_contract_ba_details%ROWTYPE,p_split_value_date IN LFTBS_Contract_Interest_Detail.Value_Date%TYPE);                                  

END lbpks_lbcbadtl_utils;
/