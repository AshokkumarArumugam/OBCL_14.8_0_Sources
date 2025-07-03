CREATE OR REPLACE PACKAGE olpks_oldafmap_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_oldafmap_utils.spc
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
  FUNCTION fn_get_subsys_stat(p_subsystem  IN VARCHAR2,
                              p_subsysstat IN VARCHAR2) RETURN VARCHAR2;
  FUNCTION fn_default_prin_liqn(p_Source             IN VARCHAR2,
                                p_Source_Operation   IN VARCHAR2,
                                p_Function_Id        IN VARCHAR2,
                                p_Action_Code        IN VARCHAR2,
                                p_oldafmap           IN olpks_oldafmap_main.ty_oldafmap,
                                p_wrk_oldafmap       IN OUT olpks_oldafmap_main.ty_oldafmap,
                                p_Err_Code           IN OUT VARCHAR2,
                                p_Err_Params         IN OUT VARCHAR2,
                                l_is_product_changed IN VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_gen_reference_no(p_Source           IN VARCHAR2,
                               p_Source_Operation IN VARCHAR2,
                               p_Function_Id      IN VARCHAR2,
                               p_Action_Code      IN VARCHAR2,
                               p_Child_Function   IN VARCHAR2,
                               p_Full_Data        IN VARCHAR2 DEFAULT 'Y',
                               p_With_Lock        IN VARCHAR2 DEFAULT 'N',
                               p_QryData_Reqd     IN VARCHAR2,
                               p_oldafmap         IN olpks_oldafmap_main.ty_oldafmap,
                               p_wrk_oldafmap     IN OUT olpks_oldafmap_main.ty_oldafmap,
                               p_Err_Code         IN OUT VARCHAR2,
                               p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_chk_mand_txn_mis(p_branch       in oltms_branch.branch_code%type,
                               p_type         in oltbs_class_mapping.unit_type%type,
                               p_wrk_oldafmap IN olpks_oldafmap_main.ty_oldafmap,
                               p_ref_no       in oltbs_class_mapping.unit_ref_no%type,
                               p_Err_Code     IN OUT VARCHAR2,
                               p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_sys_default_and_validate(p_Source           IN VARCHAR2,
                                       p_Source_Operation IN VARCHAR2,
                                       p_Function_id      IN VARCHAR2,
                                       p_Action_Code      IN VARCHAR2,
                                       p_oldafmap         IN olpks_oldafmap_main.ty_oldafmap,
                                       p_prev_oldafmap    IN OUT olpks_oldafmap_main.ty_oldafmap,
                                       p_wrk_oldafmap     IN OUT olpks_oldafmap_main.ty_oldafmap,
                                       p_Err_Code         IN OUT VARCHAR2,
                                       p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_subsys_Pickup(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_code      IN VARCHAR2,
                            p_oldafmap         IN olpks_oldafmap_main.ty_oldafmap,
                            p_prev_oldafmap    IN olpks_oldafmap_main.ty_oldafmap,
                            p_wrk_oldafmap     IN OUT olpks_oldafmap_main.ty_oldafmap,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION fn_subsys_upload(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_oldtronl         IN olpks_oldafmap_main.ty_oldafmap,
                            p_prev_oldafmap    IN olpks_oldafmap_main.ty_oldafmap,
                            p_wrk_oldafmap     IN OUT olpks_oldafmap_main.ty_oldafmap,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Sys_Upload_Db(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_oldafmap         IN olpks_oldafmap_main.ty_oldafmap,
                            p_prev_oldafmap    IN olpks_oldafmap_main.ty_oldafmap,
                            p_wrk_oldafmap     IN OUT olpks_oldafmap_main.ty_oldafmap,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Sys_Query(p_Source           IN VARCHAR2,
                        p_Source_Operation IN VARCHAR2,
                        p_Function_Id      IN VARCHAR2,
                        p_Action_Code      IN VARCHAR2,
                        p_Full_Data        IN VARCHAR2 DEFAULT 'Y',
                        p_With_Lock        IN VARCHAR2 DEFAULT 'N',
                        p_QryData_Reqd     IN VARCHAR2,
                        p_oldafmap         IN olpks_oldafmap_main.ty_oldafmap,
                        p_wrk_oldafmap     IN OUT olpks_oldafmap_main.ty_oldafmap,
                        p_Err_Code         IN OUT VARCHAR2,
                        p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

END olpks_oldafmap_utils;
/
CREATE OR REPLACE SYNONYM olpkss_oldafmap_utils FOR olpks_oldafmap_utils
/