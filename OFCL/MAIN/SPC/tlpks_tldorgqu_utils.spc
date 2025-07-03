CREATE OR REPLACE PACKAGE tlpks_tldorgqu_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : tlpks_tldorgqu_utils.spc
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

  -------------------------------------------------------------------------------------------------------
  */
  
  
  FUNCTION Fn_Repopulate_Unamortized_Fee  ( p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_tldorgqu IN   tlpks_tldorgqu_Main.Ty_tldorgqu,
p_wrk_tldorgqu IN OUT   tlpks_tldorgqu_Main.Ty_tldorgqu,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;


  FUNCTION Fn_Query(p_Source              IN VARCHAR2,
                    p_Source_Operation    IN VARCHAR2,
                    p_Function_Id         IN VARCHAR2,
                    p_Action_Code         IN VARCHAR2,
                    p_wrk_tldorgqu IN OUT   tlpks_tldorgqu_Main.Ty_tldorgqu,
                    p_version_no IN TLTBS_UPLOAD_MASTER.VERSION_NO%TYPE,
                    p_Err_Code            IN OUT VARCHAR2,
                    p_Err_Params          IN OUT VARCHAR2) RETURN BOOLEAN;
    

END tlpks_tldorgqu_utils;
/