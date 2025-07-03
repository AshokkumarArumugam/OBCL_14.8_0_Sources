create or replace package olpks_olddryst_utils is

/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lspks_ldddryst_utils.spc
  **
  ** Module     : Loans Syndication
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

  Changed By         : Krithika Gopalakrishnan
  Change Description : Changes done in OLDDRYST utils
  Date               : 12-Aug-2016

  Changed By         : Prakash Ravi
  Changed On         : 08-AUG-2019
  Search String      : OBCL_14.4_DIARY_EVENT_UPDATE
  Change Reason      : Added code to insert and update the status table with the all values.

-------------------------------------------------------------------------------------------------------*/

FUNCTION fn_get_tags_details(p_olddryst     IN olpks_olddryst_main.ty_olddryst,
                             p_Action_Code  IN VARCHAR2,
                             p_tags_det     IN OUT olpks_olddryst_main.ty_tb_v_oltws_fields_temp,
                             p_error_code   IN OUT VARCHAR2,
                             p_error_params IN OUT VARCHAR2) RETURN BOOLEAN;

FUNCTION fn_get_udf_details(p_olddryst     IN olpks_olddryst_main.ty_olddryst,
                            p_action_code  IN VARCHAR2,
                            p_udf_det      IN OUT olpks_olddryst_main.ty_tb_v_oltws_udf_temp,
                            p_error_code   IN OUT VARCHAR2,
                            p_error_params IN OUT VARCHAR2) RETURN BOOLEAN;

 FUNCTION fn_format_tags(dateformat           VARCHAR2, 
                          datevalue            VARCHAR2,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
   --OBCL_14.4_DIARY_EVENT_UPDATE Change starts
  FUNCTION fn_check_user_prod_restriction(p_product_code IN oltms_product.product_code%TYPE,
                                          p_branch_code  IN oltms_branch.branch_code%TYPE,
                                          p_user_id      IN smtbs_user.user_id%TYPE,
                                          P_err_code     IN OUT VARCHAR2,
                                          p_err_param    IN OUT VARCHAR2) RETURN BOOLEAN;  
                                          
    FUNCTION fn_auth_ffmt_msg ( p_Source    IN  VARCHAR2,
                                p_wrk_olddryst  IN OUT olpks_olddryst_main.ty_olddryst,
                                          P_err_code     IN OUT VARCHAR2,
                                          p_err_param    IN OUT VARCHAR2) RETURN BOOLEAN;
  --OBCL_14.4_DIARY_EVENT_UPDATE Change ends                                           
END olpks_olddryst_utils;
/