CREATE OR REPLACE PACKAGE lbpks_lbcstdet_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbcstdet_utils.spc
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

  FUNCTION fn_upload_db(p_Source      IN VARCHAR2,
                        p_Function_Id IN VARCHAR2,
                        p_Action_Code IN VARCHAR2,
                        -- p_lbcstdet     IN lbpks_lbcstdet_Main.Ty_lbcstdet,
                        p_Wrk_lbcstdet IN OUT lbpks_lbcstdet_Main.Ty_lbcstdet,
                        p_Err_Code     IN OUT VARCHAR2,
                        p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION fn_sys_query(p_Source       IN VARCHAR2,
                        p_Function_Id  IN VARCHAR2,
                        p_Action_Code  IN VARCHAR2,
                        p_lbcstdet     IN lbpks_lbcstdet_Main.Ty_lbcstdet,
                        p_Wrk_lbcstdet IN OUT lbpks_lbcstdet_Main.Ty_lbcstdet,
                        p_Err_Code     IN OUT VARCHAR2,
                        p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;

END lbpks_lbcstdet_utils;

/
CREATE OR REPLACE SYNONYM lbpkss_lbcstdet_utils FOR lbpks_lbcstdet_utils
/