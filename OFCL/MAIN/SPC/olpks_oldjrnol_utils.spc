CREATE OR REPLACE PACKAGE olpks_oldjrnol_utils AS
  /*------------------------------------------------------------------------------------------
** This source is part of the Oracle Banking Software Product.
** Copyright ? 2008 - 2012  Oracle and/or its affiliates.  All rights reserved.
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

  FUNCTION Fn_Generate_Refno(p_Source      IN VARCHAR2,
                             p_Function_Id IN VARCHAR2,
                             p_Action_Code IN VARCHAR2,
                             p_oldjrnol    IN OUT olpks_oldjrnol_main.ty_oldjrnol,
                             p_Err_Code    IN OUT VARCHAR2,
                             p_Err_Params  IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Check_Mandatory(p_Source      IN VARCHAR2,
                              p_Function_Id IN VARCHAR2,
                              p_Action_Code IN VARCHAR2,
                              p_oldjrnol    IN olpks_oldjrnol_main.ty_oldjrnol,
                              p_Err_Code    IN OUT VARCHAR2,
                              p_Err_Params  IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Default_Validate_Master(p_Source      IN VARCHAR2,
                                      p_Function_Id IN VARCHAR2,
                                      p_Action_Code IN VARCHAR2,
                                      p_oldjrnol    IN OUT olpks_oldjrnol_main.ty_oldjrnol,
                                      p_Err_Code    IN OUT VARCHAR2,
                                      p_Err_Params  IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Upload_Master(p_Source        IN VARCHAR2,
                            p_Function_Id   IN VARCHAR2,
                            p_Action_Code   IN VARCHAR2,
                            p_Multi_Trip_Id IN VARCHAR2,
                            p_oldjrnol      IN OUT olpks_oldjrnol_main.ty_oldjrnol,
                            p_Err_Code      IN OUT VARCHAR2,
                            p_Err_Params    IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Delete_Master(p_Source        IN VARCHAR2,
                            p_Function_Id   IN VARCHAR2,
                            p_Action_Code   IN VARCHAR2,
                            p_Multi_Trip_Id IN VARCHAR2,
                            p_oldjrnol      IN OUT olpks_oldjrnol_main.ty_oldjrnol,
                            p_Err_Code      IN OUT VARCHAR2,
                            p_Err_Params    IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Batch_Close(p_Source        IN VARCHAR2,
                          p_Function_Id   IN VARCHAR2,
                          p_Action_Code   IN VARCHAR2,
                          p_Multi_Trip_Id IN VARCHAR2,
                          p_oldjrnol      IN OUT olpks_oldjrnol_main.ty_oldjrnol,
                          p_Err_Code      IN OUT VARCHAR2,
                          p_Err_Params    IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Subsys_Pickup(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_oldjrnol         IN olpks_oldjrnol_main.ty_oldjrnol,
                            p_prev_oldjrnol    IN OUT olpks_oldjrnol_main.ty_oldjrnol,
                            p_wrk_oldjrnol     IN OUT olpks_oldjrnol_main.ty_oldjrnol,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Query_Cont_Udfdetails(p_Function_Id  IN VARCHAR2,
                                    p_Key          IN VARCHAR2,
                                    p_Not_In_List  IN VARCHAR2,
                                    p_Udf_Rec      IN OUT oltms_contract_userdef_fields%ROWTYPE,
                                    p_wrk_oldjrnol IN OUT olpks_oldjrnol_main.ty_oldjrnol,
                                    p_Error_Code   IN OUT VARCHAR2,
                                    p_Error_Params IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Calculate(p_Source        IN VARCHAR2,
                        p_Function_Id   IN VARCHAR2,
                        p_Action_Code   IN VARCHAR2,
                        p_Multi_Trip_Id IN VARCHAR2,
                        p_oldjrnol      IN OUT olpks_oldjrnol_main.ty_oldjrnol,
                        p_Err_Code      IN OUT VARCHAR2,
                        p_Err_Params    IN OUT VARCHAR2) RETURN BOOLEAN;
END olpks_oldjrnol_utils;
/