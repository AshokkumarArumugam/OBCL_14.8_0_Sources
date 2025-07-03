CREATE OR REPLACE PACKAGE Fcpks_Fccrcmnt_Utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : fcpks_fccrcmnt_utils.spc
  **
  ** Module     : Loan Syndication
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
  
    Changed By         : Pallavi R
    Changed On         : 19-Apr-2022
    Search String      : OBCL_14.5_SMTB_#34051477 Changes
    Change Reason      : Code fixes for margin callform subsys pickup (Reverted the few changes for #32530503)
  
  -------------------------------------------------------------------------------------------------------
  */

  FUNCTION Fn_Validation(p_Source       IN Cotms_Source.Source_Code%TYPE,
                         p_Function_Id  IN VARCHAR2,
                         p_Action_Code  IN VARCHAR2,
                         p_Wrk_Fccrcmnt IN OUT Fcpks_Fccrcmnt_Main.Ty_Fccrcmnt,
                         p_Err_Code     IN OUT VARCHAR2,
                         p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Upload(p_Source       IN Cotms_Source.Source_Code%TYPE,
                     p_Function_Id  IN VARCHAR2,
                     p_Action_Code  IN VARCHAR2,
                     p_Wrk_Fccrcmnt IN OUT Fcpks_Fccrcmnt_Main.Ty_Fccrcmnt,
                     p_Err_Code     IN OUT VARCHAR2,
                     p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;
  --OBCL_14.5_SMTB_#34051477 Changes Starts
  FUNCTION Fn_Pickup(p_Source       IN Cotms_Source.Source_Code%TYPE,
                     p_Function_Id  IN VARCHAR2,
                     p_Action_Code  IN VARCHAR2,
                     p_Wrk_Fccrcmnt IN OUT Fcpks_Fccrcmnt_Main.Ty_Fccrcmnt,
                     p_Err_Code     IN OUT VARCHAR2,
                     p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;
  --OBCL_14.5_SMTB_#34051477 Changes Ends

END Fcpks_Fccrcmnt_Utils;
/
CREATE OR REPLACE Synonym Fcpkss_Fccrcmnt_Utils FOR Fcpks_Fccrcmnt_Utils
/