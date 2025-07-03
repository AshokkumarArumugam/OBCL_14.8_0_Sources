CREATE OR REPLACE PACKAGE lbpks_lbdvmaut_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdvmaut_utils.spc
  **
  ** Module     : LD
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
  FUNCTION Fn_Validate(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_Child_Function   IN VARCHAR2,
                            p_wrk_lbdvmaut     IN OUT lbpks_lbdvmaut_main.ty_lbdvmaut,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Auth(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_Child_Function   IN VARCHAR2,
                            p_lbdvmaut         IN  lbpks_lbdvmaut_main.ty_lbdvmaut,
                              p_prev_lbdvmaut IN lbpks_lbdvmaut_main.ty_lbdvmaut,
                            p_wrk_lbdvmaut     IN OUT lbpks_lbdvmaut_main.ty_lbdvmaut,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
                       
  FUNCTION Fn_Query(p_Source           IN VARCHAR2,
                         p_Source_Operation IN VARCHAR2,
                         p_Function_Id      IN VARCHAR2,
                         p_Action_Code      IN VARCHAR2,
                         p_Child_Function   IN VARCHAR2,
                         p_Full_Data        IN VARCHAR2 DEFAULT 'Y',
                         p_With_Lock        IN VARCHAR2 DEFAULT 'N',
                         p_QryData_Reqd     IN VARCHAR2,
                         p_lbdvmaut         IN lbpks_lbdvmaut_main.ty_lbdvmaut,
                         p_wrk_lbdvmaut     IN OUT lbpks_lbdvmaut_main.ty_lbdvmaut,
                         p_Err_Code         IN OUT VARCHAR2,
                         p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

END lbpks_lbdvmaut_utils;
/
CREATE OR REPLACE SYNONYM lbpkss_lbdvmaut_utils FOR lbpks_lbdvmaut_utils
/