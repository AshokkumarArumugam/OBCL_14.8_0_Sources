create or replace package olpks_oldbrprm_utils is
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_oldbrprm_utils.spc
  **
  ** Module     : Syndication Loans and Commitments
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

Function Fn_Validations(p_Source    IN  VARCHAR2,
                              p_Source_Operation  IN     VARCHAR2,
                              p_Function_Id       IN     VARCHAR2,
                              p_Action_Code       IN     VARCHAR2,
                              p_Child_Function    IN  VARCHAR2,
                              p_oldbrprm IN   olpks_oldbrprm_main.ty_oldbrprm,
                              p_prev_oldbrprm IN OUT olpks_oldbrprm_main.ty_oldbrprm,
                              p_wrk_oldbrprm IN OUT  olpks_oldbrprm_main.ty_oldbrprm,
                              p_Err_Code       IN  OUT VARCHAR2,
                              p_Err_Params     IN  OUT VARCHAR2) Return Boolean;

Function Fn_Populate_Ui_fields(p_Source            IN     VARCHAR2,
                               p_Source_Operation  IN     VARCHAR2,
                               p_Function_Id       IN     VARCHAR2,
                               p_Action_Code       IN     VARCHAR2,
                               p_Child_Function    IN     VARCHAR2,
                               p_oldbrprm          IN     olpks_oldbrprm_main.ty_oldbrprm,
                               p_wrk_oldbrprm      IN OUT olpks_oldbrprm_main.ty_oldbrprm,
                               p_Err_Code          IN OUT VARCHAR2,
                               p_Err_Params        IN OUT VARCHAR2) Return Boolean;




end olpks_oldbrprm_utils;
/
create or replace synonym olpkss_oldbrprm_utils for olpks_oldbrprm_utils
/