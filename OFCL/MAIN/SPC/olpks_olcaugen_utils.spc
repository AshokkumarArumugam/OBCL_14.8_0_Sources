CREATE OR REPLACE PACKAGE olpks_olcaugen_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_olcaugen_utils.spc
  **
  ** Module     : Messaging
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

  FUNCTION fn_getspoolfileName(pBranch        IN VARCHAR2,
                               pclient_server IN VARCHAR2 DEFAULT 'C')
    return VARCHAR2;

  Function Fn_spool_client_advice(Pl_Dcn   Varchar2,
                                  Pl_Total Number,
                                  Pl_Fname Varchar2) Return boolean;
  Procedure pr_Insert_Into_sms_log(dcn varchar2);

END olpks_olcaugen_utils;
/
CREATE OR REPLACE SYNONYM olpkss_olcaugen_utils FOR olpks_olcaugen_utils
/