CREATE OR REPLACE PACKAGE lfpks_lfdfeaut_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lfpks_lfdfeaut_utils.spc
  **
  ** Module     : The ICCF
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
  FUNCTION Fn_Validate(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_Child_Function   IN VARCHAR2,
                       p_lfdfeaut         IN lfpks_lfdfeaut_Main.Ty_lfdfeaut,
                       p_Prev_lfdfeaut    IN OUT lfpks_lfdfeaut_Main.Ty_lfdfeaut,
                       p_Wrk_lfdfeaut     IN OUT lfpks_lfdfeaut_Main.Ty_lfdfeaut,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Auth_Fee_Payment(p_Source           IN VARCHAR2,
                               p_Source_Operation IN VARCHAR2,
                               p_Function_Id      IN VARCHAR2,
                               p_Action_Code      IN VARCHAR2,
                               p_Child_Function   IN VARCHAR2,
                               p_lfdfeaut         IN lfpks_lfdfeaut_Main.Ty_lfdfeaut,
                               p_Prev_lfdfeaut    IN lfpks_lfdfeaut_Main.Ty_lfdfeaut,
                               p_Wrk_lfdfeaut     IN OUT lfpks_lfdfeaut_Main.Ty_lfdfeaut,
                               p_Err_Code         IN OUT VARCHAR2,
                               p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
END lfpks_lfdfeaut_utils;
/
CREATE OR REPLACE SYNONYM lfpkss_lfdfeaut_utils FOR lfpks_lfdfeaut_utils
/