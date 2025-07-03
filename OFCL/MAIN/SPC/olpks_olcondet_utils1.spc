CREATE OR REPLACE PACKAGE olpks_olcondet_utils1 AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_olcondet_utils1.SPC
  **
  ** Module     : IS
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
  FUNCTION Fn_Get_Msg(p_item_name  VARCHAR2,
                      i            binary_integer,
                      p_Err_Code   IN OUT VARCHAR2,
                      p_Err_Params IN OUT VARCHAR2) RETURN VARCHAR2;

  FUNCTION Fn_Check_Dot(pVal         VARCHAR2,
                        p_Err_Code   IN OUT VARCHAR2,
                        p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Inv_Swift_Char(p_item_name  VARCHAR2,
                             p_Err_Code   IN OUT VARCHAR2,
                             p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;

END olpks_olcondet_utils1;
/
CREATE OR REPLACE SYNONYM olpkss_olcondet_utils1 for olpks_olcondet_utils1
/