CREATE OR REPLACE PACKAGE lbpks_lbdflrcl_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdflrcl_utils.spc
  **
  ** Module     : LB
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright (R) 2008,2015 , Oracle and/or its affiliates.  All rights reserved
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

FUNCTION Fn_Validate(p_Source           IN Cotms_Source.Source_Code%TYPE,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_Wrk_lbdflrcl     IN OUT lbpks_lbdflrcl_Main.Ty_lbdflrcl,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  

END lbpks_lbdflrcl_utils;
/