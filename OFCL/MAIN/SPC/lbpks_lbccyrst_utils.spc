CREATE OR REPLACE PACKAGE lbpks_lbccyrst_utils IS

  /*------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbccyrst_utils.spc
  **
  ** Module     : Syndication Loans and Commitments
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.
  **
  ** No part of this work may be reproduced, stored in a retrieval system,
  ** adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise,
  ** translated in any language or computer language,
  ** without the prior written permission of Oracle and/or its affiliates.
  **
  **
  ** Oracle Financial Services Software Limited.
  ** Oracle Park, Off Western Express Highway,
  ** Goregaon (East),
  ** Mumbai - 400 063, India.
  ------------------------------------------------------------------------------------------
  */
  /*
  -------------------------------------------------------------------------------------------------------
  CHANGE HISTORY

  SFR Number         :
  Changed By         :
  Change Description :

  -------------------------------------------------------------------------------------------------------
  */

Function fn_validation (p_Source           IN VARCHAR2,
                      p_Source_Operation IN VARCHAR2,
                      p_Function_Id      IN VARCHAR2,
                      p_Action_Code      IN VARCHAR2,
                      p_lbccyrst         IN lbpks_lbccyrst_main.ty_lbccyrst,
                      p_wrk_lbccyrst     IN OUT lbpks_lbccyrst_main.ty_lbccyrst,
                      p_Err_Code         IN OUT VARCHAR2,
                      p_Err_Params       IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Upload_Data(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_lbccyrst         IN lbpks_lbccyrst_main.ty_lbccyrst,
                          p_prev_lbccyrst    IN lbpks_lbccyrst_main.ty_lbccyrst,
                          p_wrk_lbccyrst     IN OUT lbpks_lbccyrst_main.ty_lbccyrst,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

END lbpks_lbccyrst_utils;
/
CREATE OR REPLACE synonym lbpkss_lbccyrst_utils FOR lbpks_lbccyrst_utils 
/