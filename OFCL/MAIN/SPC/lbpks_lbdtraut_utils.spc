CREATE OR REPLACE PACKAGE lbpks_lbdtraut_utils IS

  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdtraut_utils.spc
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

    Changed By         : T P Nihal Jain
    Date               : 18-Feb-2025
    Change Description : Declared g_camd_auth and is assigned to N by default
    Search String      : BUG#37552410 
  -------------------------------------------------------------------------------------------------------
  */
  g_camd_auth varchar2(1):='N'; --BUG#37552410

  FUNCTION Fn_Populate_Data(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_Child_Function   IN VARCHAR2,
                            p_Full_Data        IN VARCHAR2 DEFAULT 'Y',
                            p_With_Lock        IN VARCHAR2 DEFAULT 'N',
                            p_QryData_Reqd     IN VARCHAR2,
                            p_lbdtraut         IN lbpks_lbdtraut_main.ty_lbdtraut,
                            p_wrk_lbdtraut     IN OUT lbpks_lbdtraut_main.ty_lbdtraut,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_authorize(p_Source           IN VARCHAR2,
                        p_Source_Operation IN VARCHAR2,
                        p_Function_Id      IN VARCHAR2,
                        p_Action_Code      IN VARCHAR2,
                        P_process_code     IN VARCHAR2,
                        p_wrk_lbdtraut     IN OUT lbpks_lbdtraut_main.ty_lbdtraut,
                        p_Err_Code         IN OUT VARCHAR2,
                        p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  PROCEDURE pr_del_ld_comp(ld_ref_no varchar2);
END lbpks_lbdtraut_utils;
/