CREATE OR REPLACE PACKAGE lbpks_lbclcisr_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbclcisr_utils.spc
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
  
  **Changed By         : Sowmya Bitra
  **Changed On         : 08-DEC-2020
  **Search String      : Bug#32192146 Changes
  **Change Reason      : Fix for LC Issuance Fees to be settled to the respective Issuer 

  -------------------------------------------------------------------------------------------------------
  */  
   g_lcfee_flag CHAR(1) := 'N';  --Bug#32192146 Changes (moved from pkg body)
   FUNCTION fn_validate(p_Source       IN Cotms_Source.Source_Code%TYPE,
                       p_Action_Code  IN VARCHAR2,
                       p_Function_Id  IN VARCHAR2,
                       p_Wrk_lbclcisr IN OUT lbpks_lbclcisr_Main.Ty_lbclcisr,
                       p_Err_Code     IN OUT VARCHAR2,
                       p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_upload(p_Source       IN Cotms_Source.Source_Code%TYPE,
                     p_Action_Code  IN VARCHAR2,
                     p_Function_Id  IN VARCHAR2,
                     p_Wrk_lbclcisr IN OUT lbpks_lbclcisr_Main.Ty_lbclcisr,
                     p_Err_Code     IN OUT VARCHAR2,
                     p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;

End lbpks_lbclcisr_utils;
/
create or replace synonym lbpkss_lbclcisr_utils for lbpks_lbclcisr_utils
/