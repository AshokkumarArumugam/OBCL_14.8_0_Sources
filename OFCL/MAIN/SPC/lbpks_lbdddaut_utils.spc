CREATE OR REPLACE PACKAGE lbpks_lbdddaut_utils IS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdddaut_utils.spc
  **
  ** Module     :  Syndication Loans and Commitments
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
  
    Changed By         : Palanisamy M
    Changed On         : 13-Dec-2021
    Change Reason      : Fix for Interim LIQD STP Fail issue
    Search String      : Bug#33613894 changes	  
  -------------------------------------------------------------------------------------------------------
  */

  g_Backdated_Liqd    CHAR(1) := 'N'; --Bug#33613894 Changes
  
  FUNCTION Fn_Populate_Data(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_Child_Function   IN VARCHAR2,
                            p_Full_Data        IN VARCHAR2 DEFAULT 'Y',
                            p_With_Lock        IN VARCHAR2 DEFAULT 'N',
                            p_QryData_Reqd     IN VARCHAR2,
                            p_lbdddaut         IN lbpks_lbdddaut_main.ty_lbdddaut,
                            p_wrk_lbdddaut     IN OUT lbpks_lbdddaut_main.ty_lbdddaut,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_authorize(p_Source           IN VARCHAR2,
                        p_Source_Operation IN VARCHAR2,
                        p_Function_Id      IN VARCHAR2,
                        p_Action_Code      IN VARCHAR2,
                        p_lbdddaut     IN lbpks_lbdddaut_main.ty_lbdddaut,
                        p_wrk_lbdddaut     IN OUT lbpks_lbdddaut_main.ty_lbdddaut,
                        p_Err_Code         IN OUT VARCHAR2,
                        p_Err_Params       IN OUT VARCHAR2)  RETURN BOOLEAN;

END lbpks_lbdddaut_utils;
/
CREATE OR REPLACE SYNONYM lbpkss_lbdddaut_utils FOR lbpks_lbdddaut_utils
/