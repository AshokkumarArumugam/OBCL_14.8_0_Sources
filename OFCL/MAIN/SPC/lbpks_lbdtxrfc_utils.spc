CREATE OR REPLACE PACKAGE lbpks_lbdtxrfc_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdtxrfc_utils.spc
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

  PROCEDURE Pr_Skip_Handler(P_Stage IN VARCHAR2);

  FUNCTION FN_POP_TAX_DETAILS(p_Source           IN VARCHAR2,
                              p_Source_Operation IN VARCHAR2,
                              p_Function_Id      IN VARCHAR2,
                              p_Action_Code      IN VARCHAR2,
                              p_lbdtxrfc         IN lbpks_lbdtxrfc_Main.Ty_lbdtxrfc,
                              p_Prev_lbdtxrfc    IN OUT lbpks_lbdtxrfc_Main.Ty_lbdtxrfc,
                              p_Wrk_lbdtxrfc     IN OUT lbpks_lbdtxrfc_Main.Ty_lbdtxrfc,
                              p_Err_Code         IN OUT VARCHAR2,
                              p_Err_Params       IN OUT VARCHAR2,
                              l_tax_populated    IN OUT VARCHAR2)
    RETURN BOOLEAN;
FUNCTION Fn_Sys_Upload_Db         (p_Source            IN VARCHAR2,
                              p_Source_Operation  IN     VARCHAR2,
                              p_Function_Id       IN     VARCHAR2,
                              p_Action_Code       IN     VARCHAR2,
      p_lbdtxrfc     IN  lbpks_lbdtxrfc_Main.Ty_lbdtxrfc,
      p_Prev_lbdtxrfc     IN  lbpks_lbdtxrfc_Main.Ty_lbdtxrfc,
      p_Wrk_lbdtxrfc      IN OUT  lbpks_lbdtxrfc_Main.Ty_lbdtxrfc,
      p_Err_Code          IN OUT VARCHAR2,
      p_Err_Params        IN OUT VARCHAR2)
   RETURN BOOLEAN;
END lbpks_lbdtxrfc_utils;
/