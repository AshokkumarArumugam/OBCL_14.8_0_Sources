CREATE OR REPLACE PACKAGE fcpks_fcdprmnt_utils AS
  /*-----------------------------------------------------------------------------------------------------
    **
    ** File Name  : fcpks_fcdprmnt_utils.spc
    **
    ** Module     : Loans Syndication
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
    
  **  Written by         : Neeraj.Krishna
  **  Date of creation   : 25-JAN-2017
  **  Purpose            : Development of OFCL_12.4.0.0.0
    
    -------------------------------------------------------------------------------------------------------
    */

  /*FUNCTION fn_save(p_Source           IN VARCHAR2,
                   p_Source_Operation IN VARCHAR2,
                   p_Function_Id      IN VARCHAR2,
                   p_Action_Code      IN VARCHAR2,
                   p_Child_Function   IN VARCHAR2,
                   p_fcdprmnt         IN fcpks_fcdprmnt_main.ty_fcdprmnt,
                   p_prev_fcdprmnt    IN OUT fcpks_fcdprmnt_main.ty_fcdprmnt,
                   p_wrk_fcdprmnt     IN OUT fcpks_fcdprmnt_main.ty_fcdprmnt,
                   p_Err_Code         IN OUT VARCHAR2,
                   p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  
  PROCEDURE pr_mis_update_log(l_mode         varchar2,
                              l_rowid        varchar2,
                              p_wrk_fcdprmnt fcpks_fcdprmnt_main.ty_fcdprmnt);*/

  FUNCTION fn_save_validations(p_Source           IN VARCHAR2,
                               p_Source_Operation IN VARCHAR2,
                               p_Function_Id      IN VARCHAR2,
                               p_Action_Code      IN VARCHAR2,
                               p_Child_Function   IN VARCHAR2,
                               p_fcdprmnt         IN fcpks_fcdprmnt_main.ty_fcdprmnt,
                               p_prev_fcdprmnt    IN OUT fcpks_fcdprmnt_main.ty_fcdprmnt,
                               p_wrk_fcdprmnt     IN OUT fcpks_fcdprmnt_main.ty_fcdprmnt,
                               p_Err_Code         IN OUT VARCHAR2,
                               p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_authorize(p_Source           IN VARCHAR2,
                        p_Source_Operation IN VARCHAR2,
                        p_Function_Id      IN VARCHAR2,
                        p_Action_Code      IN VARCHAR2,
                        p_Child_Function   IN VARCHAR2,
                        p_fcdprmnt         IN fcpks_fcdprmnt_main.ty_fcdprmnt,
                        p_prev_fcdprmnt    IN fcpks_fcdprmnt_main.ty_fcdprmnt,
                        p_wrk_fcdprmnt     IN OUT fcpks_fcdprmnt_main.ty_fcdprmnt,
                        p_Err_Code         IN OUT VARCHAR2,
                        p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_upload_validations(p_Source           IN VARCHAR2,
                                 p_Source_Operation IN VARCHAR2,
                                 p_Function_Id      IN VARCHAR2,
                                 p_Action_Code      IN VARCHAR2,
                                 p_Child_Function   IN VARCHAR2,
                                 p_fcdprmnt         IN fcpks_fcdprmnt_main.ty_fcdprmnt,
                                 p_prev_fcdprmnt    IN fcpks_fcdprmnt_main.ty_fcdprmnt,
                                 p_wrk_fcdprmnt     IN OUT fcpks_fcdprmnt_main.ty_fcdprmnt,
                                 p_Err_Code         IN OUT VARCHAR2,
                                 p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  PROCEDURE pr_ld_delete_details(p_product_code IN oltms_product.PRODUCT_CODE%TYPE);

  FUNCTION fn_delete(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_wrk_fcdprmnt     IN OUT fcpks_fcdprmnt_main.ty_fcdprmnt,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_close(p_Source           IN VARCHAR2,
                    p_Source_Operation IN VARCHAR2,
                    p_Function_Id      IN VARCHAR2,
                    p_Action_Code      IN VARCHAR2,
                    p_Child_Function   IN VARCHAR2,
                    p_fcdprmnt         IN fcpks_fcdprmnt_main.ty_fcdprmnt,
                    p_prev_fcdprmnt    IN OUT fcpks_fcdprmnt_main.ty_fcdprmnt,
                    p_wrk_fcdprmnt     IN OUT fcpks_fcdprmnt_main.ty_fcdprmnt,
                    p_Err_Code         IN OUT VARCHAR2,
                    p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_reopen(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_wrk_fcdprmnt     IN OUT fcpks_fcdprmnt_main.ty_fcdprmnt,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

end fcpks_fcdprmnt_utils;
/