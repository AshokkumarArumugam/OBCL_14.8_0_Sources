create or replace package olpks_oldbrmnt_utils is
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_oldbrmnt_utils.spc
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
                              p_oldbrmnt IN   olpks_oldbrmnt_main.ty_oldbrmnt,
                              p_prev_oldbrmnt IN OUT olpks_oldbrmnt_main.ty_oldbrmnt,
                              p_wrk_oldbrmnt IN OUT  olpks_oldbrmnt_main.ty_oldbrmnt,
                              p_Err_Code       IN  OUT VARCHAR2,
                              p_Err_Params     IN  OUT VARCHAR2) Return Boolean;

Function Fn_Populate_Ui_fields(p_Source            IN     VARCHAR2,
                               p_Source_Operation  IN     VARCHAR2,
                               p_Function_Id       IN     VARCHAR2,
                               p_Action_Code       IN     VARCHAR2,
                               p_Child_Function    IN     VARCHAR2,
                               p_oldbrmnt          IN     olpks_oldbrmnt_main.ty_oldbrmnt,
                               p_wrk_oldbrmnt      IN OUT olpks_oldbrmnt_main.ty_oldbrmnt,
                               p_Err_Code          IN OUT VARCHAR2,
                               p_Err_Params        IN OUT VARCHAR2) Return Boolean;




end olpks_oldbrmnt_utils;
/
Create Or Replace Synonym olpkss_oldbrmnt_utils for olpks_oldbrmnt_utils
/