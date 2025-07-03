CREATE OR REPLACE PACKAGE Olpks_Oldmdaut_Utils IS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : Olpks_Oldmdaut_Utils.spc
  **
  ** Module     : Loans and Commitments
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Oracle Banking Corporate Lending  Software Product.   Copyright Â© 2018.  All rights reserved
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

  FUNCTION Fn_Populate_Data(p_Source       IN VARCHAR2,
                            p_Function_Id  IN VARCHAR2,
                            p_Wrk_Oldmdaut IN OUT Olpks_Oldmdaut_Main.Ty_Oldmdaut,
                            p_Err_Code     IN OUT VARCHAR2,
                            p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Authorize_Loan(p_Source       IN VARCHAR2,
                             p_Function_Id  IN VARCHAR2,
                             p_Wrk_Oldmdaut IN OUT Olpks_Oldmdaut_Main.Ty_Oldmdaut,
                             p_Err_Code     IN OUT VARCHAR2,
                             p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;

END Olpks_Oldmdaut_Utils;
/
CREATE OR REPLACE SYNONYM Olpkss_Oldmdaut_Utils FOR Olpks_Oldmdaut_Utils
/