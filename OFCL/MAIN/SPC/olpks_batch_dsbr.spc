CREATE OR REPLACE PACKAGE Olpks_Batch_Dsbr AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : Olpks_Batch_Dsbr.spc
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
  FUNCTION Fn_Dsbr_Contract(p_Reference       IN Oltbs_Contract.Contract_Ref_No%TYPE,
                            p_Mode            IN VARCHAR2,
                            p_Processing_Date IN DATE,
                            p_Err_Code        IN OUT VARCHAR2,
                            p_Err_Params      IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Process_Dsbr_Contract(p_Reference       IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                    p_Module          IN Oltbs_Contract.Module_Code%TYPE,
                                    p_Branch          IN Oltbs_Contract.Branch%TYPE,
                                    p_User_Id         IN VARCHAR2,
                                    p_Processing_Date IN DATE,
                                    p_Elcm_Msgid      OUT VARCHAR2,
                                    p_Rfr_Msgid      OUT VARCHAR2,
                                    p_Err_Code        IN OUT VARCHAR2,
                                    p_Err_Params      IN OUT VARCHAR2)
    RETURN VARCHAR2;
  FUNCTION Fn_Auth_Cont_Dsbr(p_Reference  IN Oltbs_Contract.Contract_Ref_No%TYPE,
                             p_User_Id    IN VARCHAR2,
                             p_Mode       IN VARCHAR2,
                             p_Err_Code   IN OUT VARCHAR2,
                             p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Auth_Dsbr_Contract(p_Reference  IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                 p_Branch     IN Oltbs_Contract.Branch%TYPE,
                                 p_User_Id    IN VARCHAR2,
                                 p_Mode       IN VARCHAR2,
                                 p_Err_Code   IN OUT VARCHAR2,
                                 p_Err_Params IN OUT VARCHAR2)
    RETURN VARCHAR2;
END Olpks_Batch_Dsbr;
/
CREATE OR REPLACE Synonym Olpkss_Batch_Dsbr FOR Olpks_Batch_Dsbr
/