CREATE OR REPLACE PACKAGE lbpks_lbdpyaut_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdpyaut_utils.spc
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

  Changed By         : Surya Prabha
  Date               : 08-July-2020
  Change Description : BUG#31544734 - Override message changes
  Search String      : BUG#31544734 changes

  -------------------------------------------------------------------------------------------------------
  */

g_prm_event_seq_no NUMBER;
g_prm_payment_status VARCHAR2(1);
g_prm_value_date DATE;
g_prm_total_paid NUMBER;
g_prm_curr_event_seq_no NUMBER;
g_prm_PART_SHARE_AUTH VARCHAR2(1);

FUNCTION Fn_Post_Default_And_Validate (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_lbdpyaut IN   lbpks_lbdpyaut_Main.Ty_lbdpyaut,
p_Prev_lbdpyaut IN OUT lbpks_lbdpyaut_Main.Ty_lbdpyaut,
p_wrk_lbdpyaut IN OUT  lbpks_lbdpyaut_Main.Ty_lbdpyaut,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

PROCEDURE PR_MESG_GEN_ON_AUTH
(pAuth_window varchar2, pRef_no varchar2, pEsn number);

-- BUG#31544734 changes start
  FUNCTION Fn_Populate_Data(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_Child_Function   IN VARCHAR2,
                            p_Full_Data        IN VARCHAR2 DEFAULT 'Y',
                            p_With_Lock        IN VARCHAR2 DEFAULT 'N',
                            p_QryData_Reqd     IN VARCHAR2,
                            p_lbdpyaut         IN lbpks_lbdpyaut_main.ty_lbdpyaut,
                            p_wrk_lbdpyaut     IN OUT lbpks_lbdpyaut_main.ty_lbdpyaut,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
-- BUG#31544734 changes end

END lbpks_lbdpyaut_utils;
/