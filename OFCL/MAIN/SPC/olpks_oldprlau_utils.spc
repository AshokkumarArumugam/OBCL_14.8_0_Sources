CREATE OR REPLACE PACKAGE olpks_oldprlau_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_oldprlau_utils.spc
  **
  ** Module     : Loans and Deposits
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

  FUNCTION Fn_Query(p_Source           IN VARCHAR2,
                    p_Source_Operation IN VARCHAR2,
                    p_Function_Id      IN VARCHAR2,
                    p_Action_Code      IN VARCHAR2,
                    p_Child_Function   IN VARCHAR2,
                    p_Full_Data        IN VARCHAR2 DEFAULT 'Y',
                    p_With_Lock        IN VARCHAR2 DEFAULT 'N',
                    p_QryData_Reqd     IN VARCHAR2,
                    p_oldprlau         IN olpks_oldprlau_main.ty_oldprlau,
                    p_wrk_oldprlau     IN OUT olpks_oldprlau_main.ty_oldprlau,
                    p_Err_Code         IN OUT VARCHAR2,
                    p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Auth(p_Source           IN VARCHAR2,
                   p_Source_Operation IN VARCHAR2,
                   p_Function_Id      IN VARCHAR2,
                   p_Action_Code      IN VARCHAR2,
                   p_Child_Function   IN VARCHAR2,
                   p_oldprlau         IN olpks_oldprlau_main.ty_oldprlau,
                   p_prev_oldprlau    IN OUT olpks_oldprlau_main.ty_oldprlau,
                   p_wrk_oldprlau     IN OUT olpks_oldprlau_main.ty_oldprlau,
                   p_Err_Code         IN OUT VARCHAR2,
                   p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

END olpks_oldprlau_utils;
/
CREATE OR REPLACE SYNONYM olpkss_oldprlau_utils FOR olpks_oldprlau_utils
/