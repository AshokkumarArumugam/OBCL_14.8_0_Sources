  CREATE OR REPLACE PACKAGE lbpks_lbdnetcf_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdnetcf_utils.spc
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

  Changed By         : Surya Prabha
  Date               : 04-Apr-2020
  Change Description : LS Netting changes
  Search String      : OBCL_14.4_LS Netting

  -------------------------------------------------------------------------------------------------------
  */
FUNCTION fn_validate(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_wrk_lbdnetcf     IN OUT lbpks_lbdnetcf_main.ty_lbdnetcf,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

-- OBCL_14.4_LS Netting changes start
FUNCTION fn_resolve_netting(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_wrk_lbdnetcf     IN OUT lbpks_lbdnetcf_main.ty_lbdnetcf,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
-- OBCL_14.4_LS Netting changes end                         

FUNCTION fn_upload(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_wrk_lbdnetcf     IN OUT lbpks_lbdnetcf_main.ty_lbdnetcf,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  End lbpks_lbdnetcf_utils;
/