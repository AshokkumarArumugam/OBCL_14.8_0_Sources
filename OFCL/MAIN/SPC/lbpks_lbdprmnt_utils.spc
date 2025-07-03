create or replace package lbpks_lbdprmnt_utils is
  /*-----------------------------------------------------------------------------------------------------
     **
     ** File Name  : lbpks_lbdprmnt_utils.spc
     **
     ** Module     : Syndication Loans and Commitments
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

     SFR Number         :
     Changed By         :
     Change Description :

     -------------------------------------------------------------------------------------------------------
     */
      prm_allow_instalment   VARCHAR(1) := 'N';
      prm_pay_method_changed VARCHAR(1) := 'N';
      prm_sch_val_required   VARCHAR(1) := 'N';
      FUNCTION fn_cross_validations(p_Source           IN VARCHAR2,
                                p_Source_Operation IN VARCHAR2,
                                p_Function_Id      IN VARCHAR2,
                                p_Action_Code      IN VARCHAR2,
                                p_Child_Function   IN VARCHAR2,
                                p_lbdprmnt         IN lbpks_lbdprmnt_main.ty_lbdprmnt,
                                p_prev_lbdprmnt    IN OUT lbpks_lbdprmnt_main.ty_lbdprmnt,
                                p_wrk_lbdprmnt     IN OUT lbpks_lbdprmnt_main.ty_lbdprmnt,
                                p_Err_Code         IN OUT VARCHAR2,
                                p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
    
    FUNCTION fn_save(p_Source           IN VARCHAR2,
                   p_Source_Operation IN VARCHAR2,
                   p_Function_Id      IN VARCHAR2,
                   p_Action_Code      IN VARCHAR2,
                   p_Child_Function   IN VARCHAR2,
                   p_lbdprmnt         IN lbpks_lbdprmnt_main.ty_lbdprmnt,
                   p_prev_lbdprmnt    IN OUT lbpks_lbdprmnt_main.ty_lbdprmnt,
                   p_wrk_lbdprmnt     IN OUT lbpks_lbdprmnt_main.ty_lbdprmnt,
                   p_Err_Code         IN OUT VARCHAR2,
                   p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
     
    FUNCTION fn_close(p_Source           IN VARCHAR2,
                   p_Source_Operation IN VARCHAR2,
                   p_Function_Id      IN VARCHAR2,
                   p_Action_Code      IN VARCHAR2,
                   p_Child_Function   IN VARCHAR2,
                   p_lbdprmnt         IN lbpks_lbdprmnt_main.ty_lbdprmnt,
                   p_prev_lbdprmnt    IN OUT lbpks_lbdprmnt_main.ty_lbdprmnt,
                   p_wrk_lbdprmnt     IN OUT lbpks_lbdprmnt_main.ty_lbdprmnt,
                   p_Err_Code         IN OUT VARCHAR2,
                   p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN; 
     
   FUNCTION fn_Query_Details(p_Source           IN VARCHAR2,
                   p_Source_Operation IN VARCHAR2,
                   p_Function_Id      IN VARCHAR2,
                   p_Action_Code      IN VARCHAR2,
                   p_Child_Function   IN VARCHAR2,
                   p_lbdprmnt         IN lbpks_lbdprmnt_main.ty_lbdprmnt,
                   p_wrk_lbdprmnt     IN OUT lbpks_lbdprmnt_main.ty_lbdprmnt,
                   p_Err_Code         IN OUT VARCHAR2,
                   p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;                       
                   
   Function fn_holiday_flag_sch(p_wrk_lbdprmnt IN OUT lbpks_lbdprmnt_main.ty_lbdprmnt) RETURN Boolean;
   FUNCTION fn_holiday_flag_mat(p_wrk_lbdprmnt IN OUT lbpks_lbdprmnt_main.ty_lbdprmnt) return boolean;
   FUNCTION fn_allow_instalment(p_wrk_lbdprmnt IN OUT lbpks_lbdprmnt_main.ty_lbdprmnt) return boolean; 
   FUNCTION fn_chk_primary_comp(p_Source           IN VARCHAR2,
                               p_Source_Operation IN VARCHAR2,
                               p_Function_Id      IN VARCHAR2,
                               p_Action_Code      IN VARCHAR2,
                               p_Child_Function   IN VARCHAR2,
                               p_lbdprmnt         IN lbpks_lbdprmnt_main.ty_lbdprmnt,
                               p_prev_lbdprmnt    IN lbpks_lbdprmnt_main.ty_lbdprmnt,
                               p_wrk_lbdprmnt     IN OUT lbpks_lbdprmnt_main.ty_lbdprmnt,
                               p_Err_Code         IN OUT VARCHAR2,
                               p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
    FUNCTION fn_ld_set_dflt_schedules(p_Source           IN VARCHAR2,
                                    p_Source_Operation IN VARCHAR2,
                                    p_Function_Id      IN VARCHAR2,
                                    p_Action_Code      IN VARCHAR2,
                                    p_Child_Function   IN VARCHAR2,
                                    p_lbdprmnt         IN lbpks_lbdprmnt_main.ty_lbdprmnt,
                                    p_prev_lbdprmnt    IN lbpks_lbdprmnt_main.ty_lbdprmnt,
                                    p_wrk_lbdprmnt     IN OUT lbpks_lbdprmnt_main.ty_lbdprmnt,
                                    p_Err_Code         IN OUT VARCHAR2,
                                    p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
FUNCTION fn_del_dangling_schs(p_wrk_lbdprmnt IN OUT lbpks_lbdprmnt_main.ty_lbdprmnt) RETURN boolean;
    FUNCTION fn_iccf_details_validations(p_Source           IN VARCHAR2,
                                       p_Source_Operation IN VARCHAR2,
                                       p_Function_Id      IN VARCHAR2,
                                       p_Action_Code      IN VARCHAR2,
                                       p_Child_Function   IN VARCHAR2,
                                       p_lbdprmnt         IN lbpks_lbdprmnt_main.ty_lbdprmnt,
                                       p_prev_lbdprmnt    IN OUT lbpks_lbdprmnt_main.ty_lbdprmnt,
                                       p_wrk_lbdprmnt     IN OUT lbpks_lbdprmnt_main.ty_lbdprmnt,
                                       p_Err_Code         IN OUT VARCHAR2,
                                       p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
    FUNCTION fn_ld_pref_validations(p_Source           IN VARCHAR2,
                                     p_Source_Operation IN VARCHAR2,
                                     p_Function_Id      IN VARCHAR2,
                                     p_Action_Code      IN VARCHAR2,
                                     p_Child_Function   IN VARCHAR2,
                                     p_lbdprmnt         IN lbpks_lbdprmnt_main.ty_lbdprmnt,
                                     p_prev_lbdprmnt    IN lbpks_lbdprmnt_main.ty_lbdprmnt,
                                     p_wrk_lbdprmnt     IN OUT lbpks_lbdprmnt_main.ty_lbdprmnt,
                                     p_Err_Code         IN OUT VARCHAR2,
                                     p_Err_Params       IN OUT VARCHAR2)
   RETURN BOOLEAN;
   FUNCTION fn_ld_set_schedule_list(p_wrk_lbdprmnt IN OUT lbpks_lbdprmnt_main.ty_lbdprmnt,
                                    i              IN NUMBER) return boolean;
   FUNCTION fn_chk_primary_sch(p_wrk_lbdprmnt IN OUT lbpks_lbdprmnt_main.ty_lbdprmnt) return boolean;                                                    
   FUNCTION fn_ld_schedule_validations(p_Source           IN VARCHAR2,
                                      p_Source_Operation IN VARCHAR2,
                                      p_Function_Id      IN VARCHAR2,
                                      p_Action_Code      IN VARCHAR2,
                                      p_Child_Function   IN VARCHAR2,
                                      p_lbdprmnt         IN lbpks_lbdprmnt_main.ty_lbdprmnt,
                                      p_prev_lbdprmnt    IN OUT lbpks_lbdprmnt_main.ty_lbdprmnt,
                                      p_wrk_lbdprmnt     IN OUT lbpks_lbdprmnt_main.ty_lbdprmnt,
                                      p_Err_Code         IN OUT VARCHAR2,
                                      p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
    FUNCTION fn_copy_dependent_tags(p_wrk_lbdprmnt IN OUT lbpks_lbdprmnt_main.ty_lbdprmnt) RETURN BOOLEAN;  
    FUNCTION fn_delete_liq_order(p_Source           IN VARCHAR2,
                               p_Source_Operation IN VARCHAR2,
                               p_Function_Id      IN VARCHAR2,
                               p_Action_Code      IN VARCHAR2,
                               p_Child_Function   IN VARCHAR2,
                               p_Post_Upl_Stat    IN VARCHAR2,
                               p_Multi_Trip_Id    IN VARCHAR2,
                               p_lbdprmnt         IN lbpks_lbdprmnt_main.ty_lbdprmnt,
                               p_prev_lbdprmnt    IN lbpks_lbdprmnt_main.ty_lbdprmnt,
                               p_wrk_lbdprmnt     IN OUT lbpks_lbdprmnt_main.ty_lbdprmnt,
                               p_Err_Code         IN OUT VARCHAR2,
                               p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
    FUNCTION fn_upload_validations(p_Source           IN VARCHAR2,
                                 p_Source_Operation IN VARCHAR2,
                                 p_Function_Id      IN VARCHAR2,
                                 p_Action_Code      IN VARCHAR2,
                                 p_Child_Function   IN VARCHAR2,
                                 p_Post_Upl_Stat    IN VARCHAR2,
                                 p_Multi_Trip_Id    IN VARCHAR2,
                                 p_lbdprmnt         IN lbpks_lbdprmnt_main.ty_lbdprmnt,
                                 p_prev_lbdprmnt    IN lbpks_lbdprmnt_main.ty_lbdprmnt,
                                 p_wrk_lbdprmnt     IN OUT lbpks_lbdprmnt_main.ty_lbdprmnt,
                                 p_Err_Code         IN OUT VARCHAR2,
                                 p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
    FUNCTION fn_ld_save_validations(p_Source           IN VARCHAR2,
                                  p_Source_Operation IN VARCHAR2,
                                  p_Function_Id      IN VARCHAR2,
                                  p_Action_Code      IN VARCHAR2,
                                  p_Child_Function   IN VARCHAR2,
                                  p_lbdprmnt         IN lbpks_lbdprmnt_main.ty_lbdprmnt,
                                  p_prev_lbdprmnt    IN lbpks_lbdprmnt_main.ty_lbdprmnt,
                                  p_wrk_lbdprmnt     IN OUT lbpks_lbdprmnt_main.ty_lbdprmnt,
                                  p_Err_Code         IN OUT VARCHAR2,
                                  p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
    FUNCTION fn_insert_liq_order(p_Source           IN VARCHAR2,
                               p_Source_Operation IN VARCHAR2,
                               p_Function_Id      IN VARCHAR2,
                               p_Action_Code      IN VARCHAR2,
                               p_Child_Function   IN VARCHAR2,
                               p_Post_Upl_Stat    IN VARCHAR2,
                               p_Multi_Trip_Id    IN VARCHAR2,
                               p_lbdprmnt         IN lbpks_lbdprmnt_main.ty_lbdprmnt,
                               p_prev_lbdprmnt    IN lbpks_lbdprmnt_main.ty_lbdprmnt,
                               p_wrk_lbdprmnt     IN OUT lbpks_lbdprmnt_main.ty_lbdprmnt,
                               p_Err_Code         IN OUT VARCHAR2,
                               p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
    FUNCTION fn_authorize(p_Source           IN VARCHAR2,
                    p_Source_Operation IN VARCHAR2,
                    p_Function_Id      IN VARCHAR2,
                    p_Action_Code      IN VARCHAR2,
                    p_Child_Function   IN VARCHAR2,
                    p_lbdprmnt         IN lbpks_lbdprmnt_main.ty_lbdprmnt,
                    p_prev_lbdprmnt    IN lbpks_lbdprmnt_main.ty_lbdprmnt,
                    p_wrk_lbdprmnt     IN OUT lbpks_lbdprmnt_main.ty_lbdprmnt,
                    p_Err_Code         IN OUT VARCHAR2,
                    p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

   FUNCTION fn_common_chkbox_validations(p_Source           IN VARCHAR2,
                                p_Source_Operation IN VARCHAR2,
                                p_Function_Id      IN VARCHAR2,
                                p_Action_Code      IN VARCHAR2,
                                p_Child_Function   IN VARCHAR2,
                                p_lbdprmnt         IN lbpks_lbdprmnt_main.ty_lbdprmnt,
                                p_prev_lbdprmnt    IN OUT lbpks_lbdprmnt_main.ty_lbdprmnt,
                                p_wrk_lbdprmnt     IN OUT lbpks_lbdprmnt_main.ty_lbdprmnt,
                                p_Err_Code         IN OUT VARCHAR2,
                                p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
   --#28780048 changes
  FUNCTION Fn_Comp_Type(p_Wrk_Lbdprmnt     IN Lbpks_Lbdprmnt_Main.Ty_Lbdprmnt,
                        p_Component    IN VARCHAR2) RETURN VARCHAR2;

end lbpks_lbdprmnt_utils;

/