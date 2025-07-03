CREATE OR REPLACE PACKAGE lbpks_lbcnprat_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbcnprat_utils.spc
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
  
  Changed By         : Vineeth T M
  Changed On         : 14-Feb-2024
  Search String      : Bug#36263565 changes
  Change Reason      : Added code to delete non prorata related tables on delete of VAMI 

  -------------------------------------------------------------------------------------------------------
  */
  
  FUNCTION fn_validate(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_wrk_lbcnprat    IN OUT lbpks_lbcnprat_main.ty_lbcnprat,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION fn_upload(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_wrk_lbcnprat     IN OUT lbpks_lbcnprat_main.ty_lbcnprat,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2)
                     RETURN BOOLEAN;
  --Bug#36263565 changes start
  Function Fn_Delete_Nonprorata(p_Contract_Ref_No  In oltbs_contract.CONTRACT_REF_NO%type,
                                p_Err_Code         In Out Varchar2,
                                p_Err_Params       In Out Varchar2)
                                Return Boolean;
  --Bug#36263565 changes end
End lbpks_lbcnprat_utils;
/
CREATE OR REPLACE SYNONYM lbpkss_lbcnprat_utils FOR lbpks_lbcnprat_utils
/