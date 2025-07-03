CREATE OR REPLACE PACKAGE olpks_olcescam_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_olcescam_utils.spc
  **
  ** Module     : Participant Tranches and Drawdowns
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

  FUNCTION fn_validate(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_wrk_olcescam     IN OUT olpks_olcescam_main.ty_olcescam,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) 

   Return BOOLEAN;

  FUNCTION fn_upload(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_wrk_olcescam     IN OUT olpks_olcescam_main.ty_olcescam,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN Boolean;
end olpks_olcescam_utils;
/
CREATE OR REPLACE SYNONYM olpksS_olcescam_utils FOR olpks_olcescam_utils 
/