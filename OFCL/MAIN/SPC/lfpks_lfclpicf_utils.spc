create or replace package lfpks_lfclpicf_utils is
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lfpks_lfclpicf_utils.sql
  **
  ** Module     : The ICCF
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved
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
  
  Created By         : Neeraj.Krishna
  Created On         : 02-01-2017
  Created Reason     : ofcl_12.4.0.0.0_development
  -------------------------------------------------------------------------------------------------------
  */
  FUNCTION Fn_Validate(p_Source       IN Cotms_Source.Source_Code%TYPE,
                       p_Function_Id  IN VARCHAR2,
                       p_Module       IN VARCHAR2,
                       p_Action_Code  IN VARCHAR2,
                       p_wrk_lfclpicf IN OUT lfpks_lfclpicf_main.ty_lfclpicf,
                       p_Err_Code     IN OUT VARCHAR2,
                       p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_default(p_Source           IN VARCHAR2,
                      p_Source_Operation IN VARCHAR2,
                      p_Function_id      IN VARCHAR2,
                      p_Action_Code      IN VARCHAR2,
                      p_lfclpicf         IN OUT lfpks_lfclpicf_main.ty_lfclpicf,
                      p_loop_count       IN NUMBER,
                      p_Status           IN OUT VARCHAR2,
                      p_Err_Code         IN OUT VARCHAR2,
                      p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Query_Descriptions(p_Source           IN VARCHAR2,
                                 p_Source_Operation IN VARCHAR2,
                                 p_Function_Id      IN VARCHAR2,
                                 p_Action_Code      IN VARCHAR2,
                                 p_lfclpicf         IN lfpks_lfclpicf_main.ty_lfclpicf,
                                 p_wrk_lfclpicf     IN OUT lfpks_lfclpicf_main.ty_lfclpicf,
                                 p_Err_Code         IN OUT VARCHAR2,
                                 p_err_params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_Check_rate_code(type_rate_code out number,
                              p_wrk_lfclpicf IN lfpks_lfclpicf_main.ty_lfclpicf,
                              loop_count     IN NUMBER) RETURN boolean;

  FUNCTION fn_iccf_details_validations(p_Source       IN Cotms_Source.Source_Code%TYPE,
                                       p_Function_Id  IN VARCHAR2,
                                       p_Module       IN VARCHAR2,
                                       p_Action_Code  IN VARCHAR2,
                                       p_wrk_lfclpicf IN OUT lfpks_lfclpicf_main.ty_lfclpicf,
                                       p_Err_Code     IN OUT VARCHAR2,
                                       p_Err_Params   IN OUT VARCHAR2,
                                       loop_count     IN NUMBER)
    RETURN BOOLEAN;

end lfpks_lfclpicf_utils;
/