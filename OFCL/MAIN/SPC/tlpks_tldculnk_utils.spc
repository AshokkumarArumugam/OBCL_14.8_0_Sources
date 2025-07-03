CREATE OR REPLACE PACKAGE tlpks_tldculnk_utils AS

  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : tlpks_tldculnk_utils.spc
  **
  ** Module     :  Syndication Loans and Commitments
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
  
  SFR Number         :
  Changed By         :
  Change Description :
  
  -------------------------------------------------------------------------------------------------------
  */

FUNCTION  FN_CHECK_MANDATORY_ITEMS(p_Source IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_Id IN VARCHAR2,
                           p_Action_Code IN VARCHAR2,
                           p_Child_Function IN VARCHAR2,
                           p_Pk_Or_Full IN VARCHAR2 DEFAULT 'FULL',
                           p_tldculnk IN tlpks_tldculnk_Main.ty_tldculnk,
                           p_Err_Code IN OUT VARCHAR2,
                           p_Wrk_tldculnk IN OUT  tlpks_tldculnk_Main.Ty_tldculnk,
                           p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;

FUNCTION  FN_CHECK_NON_LEAD_TRANCHE(p_Source IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id IN VARCHAR2,
                            p_Action_Code IN VARCHAR2,
                            p_Child_Function IN VARCHAR2,
                            p_Pk_Or_Full IN VARCHAR2 DEFAULT 'FULL',
                            p_tldculnk IN tlpks_tldculnk_Main.ty_tldculnk,
                            p_Wrk_tldculnk IN OUT  tlpks_tldculnk_Main.Ty_tldculnk,
                            p_Err_Code IN OUT VARCHAR2,
                            p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;

FUNCTION  FN_CHECK_SHARE_PC(p_Source IN VARCHAR2,
                    p_Source_Operation IN VARCHAR2,
                    p_Function_Id IN VARCHAR2,
                    p_Action_Code IN VARCHAR2,
                    p_Child_Function IN VARCHAR2,
                    p_Pk_Or_Full IN VARCHAR2 DEFAULT 'FULL',
                    p_tldculnk IN tlpks_tldculnk_Main.ty_tldculnk,
                    p_Wrk_tldculnk IN OUT  tlpks_tldculnk_Main.Ty_tldculnk,
                    p_Err_Code IN OUT VARCHAR2,
                    p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;

FUNCTION  FN_MASTER_LOCK(p_Source IN VARCHAR2,
                 p_Source_Operation IN VARCHAR2,
                 p_Function_Id IN VARCHAR2,
                 p_Action_Code IN VARCHAR2,
                 p_Child_Function IN VARCHAR2,
                 p_Pk_Or_Full IN VARCHAR2 DEFAULT 'FULL',
                 p_tldculnk IN tlpks_tldculnk_Main.ty_tldculnk,
                 p_Wrk_tldculnk IN OUT  tlpks_tldculnk_Main.Ty_tldculnk,
                 p_Err_Code IN OUT VARCHAR2,
                 	p_cusip_no IN LBTBS_CUSIP_SWING_MASTER.CUSIP_NO%TYPE,
													p_auth_stat OUT LBTBS_CUSIP_SWING_MASTER.AUTH_STAT%TYPE,
													p_once_auth OUT LBTBS_CUSIP_SWING_MASTER.ONCE_AUTH%TYPE,
                 p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;
END tlpks_tldculnk_utils;
/

CREATE OR REPLACE SYNONYM tlpkss_tldculnk_utils FOR tlpks_tldculnk_utils
/