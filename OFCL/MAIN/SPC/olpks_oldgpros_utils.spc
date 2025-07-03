CREATE OR REPLACE PACKAGE olpks_oldgpros_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_oldgpros_utils .spc
  **
  ** Module     : The Tax
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
 Function fn_pr_query (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_oldgpros IN   olpks_oldgpros_main.ty_oldgpros,
p_wrk_oldgpros IN OUT  olpks_oldgpros_main.ty_oldgpros,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

Function fn_list_changed (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_oldgpros IN   olpks_oldgpros_main.ty_oldgpros,
p_wrk_oldgpros IN OUT  olpks_oldgpros_main.ty_oldgpros,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;
End olpks_oldgpros_utils;
/
CREATE OR REPLACE SYNONYM olpkss_oldgpros_utils FOR olpks_oldgpros_utils
/