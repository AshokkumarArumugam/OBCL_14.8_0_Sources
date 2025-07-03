CREATE OR REPLACE PACKAGE lbpks_lbccolpt_utils AS
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbccolpt_utils.SPC
  **
  ** Module   : LB
  **
    This source is part of the Oracle Banking Corporate Lending  Software Product.
    Copyright Ã‚Â© 2019 , Oracle and/or its affiliates.  All rights reserved.
    No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.
  
    Oracle Financial Services Software Limited.
    Oracle Park, Off Western Express Highway,
    Goregaon (East),
    Mumbai - 400 063, India.
  ----------------------------------------------------------------------------------------------------
  */

  FUNCTION Fn_Validate(p_Source       IN VARCHAR2,
                       p_Action_Code  IN VARCHAR2,
                       p_wrk_lbccolpt IN OUT lbpks_lbccolpt_Main.Ty_lbccolpt,
                       p_Err_Code     IN OUT VARCHAR2,
                       p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Subsys_Pickup(p_Source       IN VARCHAR2,
                            p_action_code  IN VARCHAR2,
                            p_Wrk_lbccolpt IN OUT lbpks_lbccolpt_Main.Ty_lbccolpt,
                            p_Err_Code     IN OUT VARCHAR2,
                            p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Upload_Db(p_Source IN VARCHAR2,
                        
                        p_Action_Code IN VARCHAR2,
                        
                        p_Wrk_lbccolpt IN OUT lbpks_lbccolpt_Main.Ty_lbccolpt,
                        p_Err_Code     IN OUT VARCHAR2,
                        p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;

END lbpks_lbccolpt_utils;
/
CREATE or replace SYNONYM lbpkss_lbccolpt_utils FOR lbpks_lbccolpt_utils
/