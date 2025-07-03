CREATE OR REPLACE PACKAGE olpks_olduplod_fun_custom AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_olduplod_fun_custom.spc
  **
  ** Module     : Oracle Lending
  **
  ** This source is part of the Oracle FLEXCUBE Software Product.
  ** Copyright (R) 2008,2022 , Oracle and/or its affiliates.  All rights reserved
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
  
  **Changed By         : Chandra Achuta
  **Date               : 14-JUL-2022
  **Change Description : HOOK Request for supporting the upload route of LFDACFIN screen
  **Search String      : Bug#34349837  
  -------------------------------------------------------------------------------------------------------
  */

  FUNCTION Fn_pre_upload(p_Source           IN VARCHAR2,
                         p_Source_Operation IN VARCHAR2,
                         p_Function_Id      IN VARCHAR2,
                         p_Action_Code      IN VARCHAR2,
                         p_Child_Function   IN VARCHAR2,
                         p_Multi_Trip_Id    IN VARCHAR2,
                         p_olduplod         IN olpks_olduplod_Main.Ty_olduplod,
                         p_Prev_olduplod    IN olpks_olduplod_Main.Ty_olduplod,
                         p_Wrk_olduplod     IN OUT olpks_olduplod_Main.Ty_olduplod,
                         p_Err_Code         IN OUT VARCHAR2,
                         p_Err_Params       IN OUT VARCHAR2
                        )
    RETURN BOOLEAN;
  FUNCTION Fn_post_upload(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_Child_Function   IN VARCHAR2,
                          p_Multi_Trip_Id    IN VARCHAR2,
                          p_olduplod         IN olpks_olduplod_Main.Ty_olduplod,
                          p_Prev_olduplod    IN olpks_olduplod_Main.Ty_olduplod,
                          p_Wrk_olduplod     IN OUT olpks_olduplod_Main.Ty_olduplod,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2
                         )
    RETURN BOOLEAN;

END olpks_olduplod_fun_custom;
/
create or replace synonym olpkss_olduplod_fun_custom for olpks_olduplod_fun_custom
/