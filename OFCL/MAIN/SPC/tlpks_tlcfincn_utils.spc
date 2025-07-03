create or replace PACKAGE tlpks_tlcfincn_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : tlpks_tlcfincn_utils.spc
  **
  ** Module     : Secondary Loan Trading
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Oracle Banking Corporate Lending  Software Product.   Copyright © 2018.  All rights reserved
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

  Changed By         : Jayaram N
  Date               : 17-Apr-2020
  Change Description : SLT:City calendar - Multiple holiday tracking
  Search String      : OBCL_14.4_SLT_Financial_Centre_Holiday_Treatment

  -------------------------------------------------------------------------------------------------------
  */

  FUNCTION fn_validate(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_wrk_tlcfincn     IN OUT tlpks_tlcfincn_main.ty_tlcfincn,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION fn_upload(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_Prev_Tlcfincn    IN Tlpks_Tlcfincn_Main.Ty_Tlcfincn,
                     p_Tlcfincn         IN Tlpks_Tlcfincn_Main.Ty_Tlcfincn,
                     p_wrk_tlcfincn     IN OUT tlpks_tlcfincn_main.ty_tlcfincn,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2)
                     RETURN BOOLEAN;
FUNCTION fn_pickup_fincn(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                      p_Tlcfincn         IN tlpks_tlcfincn_main.ty_tlcfincn,
                     p_wrk_tlcfincn     IN OUT tlpks_tlcfincn_main.ty_tlcfincn,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2)
                     RETURN BOOLEAN;
End tlpks_tlcfincn_utils;
/
CREATE OR REPLACE SYNONYM tlpkss_tlcfincn_utils FOR tlpks_tlcfincn_utils
/