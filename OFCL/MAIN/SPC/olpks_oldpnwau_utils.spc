CREATE OR REPLACE PACKAGE olpks_oldpnwau_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_oldpnwau_utils.spc
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
  FUNCTION Fn_Validate(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_oldpnwau         IN olpks_oldpnwau_main.ty_oldpnwau,
                       p_wrk_oldpnwau     IN OUT olpks_oldpnwau_main.ty_oldpnwau,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_Auth(p_Source           IN VARCHAR2,
                   p_Source_Operation IN VARCHAR2,
                   p_Function_Id      IN VARCHAR2,
                   p_Action_Code      IN VARCHAR2,
                   p_oldpnwau         IN olpks_oldpnwau_main.ty_oldpnwau,
                   p_wrk_oldpnwau     IN OUT olpks_oldpnwau_main.ty_oldpnwau,
                   p_err_code         IN OUT VARCHAR2,
                   p_err_params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Query(p_Source           IN VARCHAR2,
                    p_Source_Operation IN VARCHAR2,
                    p_Function_Id      IN VARCHAR2,
                    p_Action_Code      IN VARCHAR2,
                    p_oldpnwau         IN olpks_oldpnwau_main.ty_oldpnwau,
                    p_wrk_oldpnwau     IN OUT olpks_oldpnwau_main.ty_oldpnwau,
                    p_err_code         IN OUT VARCHAR2,
                    p_err_params       IN OUT VARCHAR2) RETURN BOOLEAN;
END olpks_oldpnwau_utils;
/
CREATE OR REPLACE SYNONYM olpkss_oldpnwau_utils FOR olpks_oldpnwau_utils
/