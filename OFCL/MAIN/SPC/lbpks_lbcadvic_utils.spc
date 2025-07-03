CREATE OR REPLACE PACKAGE lbpks_lbcadvic_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbcadvic_utils.spc
  **
  ** Module     : Oracle Lending
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

  FUNCTION Fn_upload_db(p_Source           IN VARCHAR2,
                        p_Source_Operation IN VARCHAR2,
                        p_Function_Id      IN VARCHAR2,
                        p_Action_Code      IN VARCHAR2,
                        p_wrk_lbcadvic     IN OUT lbpks_lbcadvic_main.ty_lbcadvic,
                        p_Err_Code         IN OUT VARCHAR2,
                        p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_sys_query(p_Source           IN VARCHAR2,
                        p_Source_Operation IN VARCHAR2,
                        p_Function_Id      IN VARCHAR2,
                        p_Action_Code      IN VARCHAR2,
                        p_Main_Function    IN VARCHAR2,
                        p_Child_Function   IN VARCHAR2,
                        p_lbcadvic         IN lbpks_lbcadvic_Main.Ty_lbcadvic,
                        p_wrk_lbcadvic     IN OUT lbpks_lbcadvic_main.ty_lbcadvic,
                        p_Err_Code         IN OUT VARCHAR2,
                        p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

END lbpks_lbcadvic_utils;
/
CREATE OR REPLACE SYNONYM lbpkss_lbcadvic_utils FOR lbpks_lbcadvic_utils
/