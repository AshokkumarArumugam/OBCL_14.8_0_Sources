create or replace package cspks_function_cache_core IS
  /*------------------------------------------------------------------------------------------------------------
   ** File Name    : Cspks_Function_Cache_Core.SPC
   **
   ** Module       : AC
   **
   ** This source is part of the Oracle FLEXCUBE Software Product.
   ** Copyright (R) 2016 , Oracle and/or its affiliates.  All rights reserved
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
   ** Change History
	 
	 ** Modified By          : 
     ** Modified On          : 
     ** Modified Reason      : 
     ** Search String        : 
	 **
	 ** Changed by 	  : Vinutha Kini
	 ** Changed on 	  : 26-July-2016
	 ** Description	  : Core clean up for 12.3Payments
	 ** Search String : Standalone12.3 CleanUp

-------------------------------------------------------------------------------------------------------------
*/

  g_Tbl_smtb_user_role_rec       smtbs_user_role%ROWTYPE;
  g_Tbl_ertb_msgs_defn_rec       Ertb_Msgs%ROWTYPE;
  g_Tbl_ertb_suppr_err_codes_rec Ertb_Suppressed_Err_Codes%ROWTYPE;
  g_Tbl_user_synonyms            User_synonyms%ROWTYPE;
  g_Tbl_Cstb_Field_Labels_rec    Cstb_Field_Labels%ROWTYPE;
  g_Tbl_Cstb_Fld_Lbl_Map_rec     Cstb_Fld_Lbl_Map%ROWTYPE;
  g_Tbl_cstb_param_rec           Cstb_param%ROWTYPE;
  g_Tbl_cstb_item_desc_rec       cstb_item_desc%ROWTYPE;
  g_Tbl_Cstb_Labels_rec          Cstb_Labels%ROWTYPE;
  --g_Tbl_cstm_prod_rec            cstm_product%ROWTYPE;--Standalone12.3 CleanUp
  g_Tbl_cstm_amtword_text_rec    Cstm_Amtword_Text%ROWTYPE;
  g_Tbl_udtm_fields_rec          udtm_fields%ROWTYPE;
  --g_Tbl_Sttm_Account_Class_rec   Sttm_Account_Class%ROWTYPE;--Standalone12.3 CleanUp
  g_Tbl_istm_bic_directory_rec   istm_bic_directory%ROWTYPE;
  g_Tbl_cotms_source_pref_rec    Cotm_Source_Pref%ROWTYPE;

  TYPE ty_ertbs_ovd_conv IS TABLE OF ertbs_ovd_conv%ROWTYPE INDEX BY BINARY_INTEGER;
  g_ertbs_ovd_conv ty_ertbs_ovd_conv;

  FUNCTION Fn_Get_Cstb_Field_Labels_Frc(p_functionid  IN VARCHAR2,
                                        p_data_source IN VARCHAR2,
                                        p_column_name IN VARCHAR2)
    RETURN Cstb_Field_Labels%ROWTYPE RESULT_CACHE;

  FUNCTION Fn_Get_smtb_user_role_Frc(p_user_id  IN VARCHAR2,
                                     p_brn_code IN VARCHAR2,
                                     p_role_id  IN VARCHAR2)
    RETURN smtbs_user_role%ROWTYPE RESULT_CACHE;

  FUNCTION fn_get_ertb_msgs_rec_frc(p_errcode IN VARCHAR2,
                                    p_lang    IN VARCHAR2)
    RETURN Ertb_Msgs%ROWTYPE RESULT_CACHE;

  FUNCTION Fn_Get_User_synonmys_Frc(p_synonym IN VARCHAR2)
    RETURN User_Synonyms%ROWTYPE RESULT_CACHE;

  FUNCTION Fn_Get_Cstb_Labels_Frc(p_lang     IN VARCHAR2,
                                  p_Lbl_Code IN VARCHAR2)
    RETURN Cstb_Labels%ROWTYPE RESULT_CACHE;

  FUNCTION Fn_Get_ertb_msgs_Rec_Wrp(p_errcode   IN VARCHAR2,
                                    p_lang      IN VARCHAR2,
                                    p_err_code  IN OUT VARCHAR2,
                                    p_err_param IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Get_Suppr_err_codes_Rec_Frc(p_sourcecd   IN VARCHAR2,
                                          p_functionid IN VARCHAR2)
    RETURN Ertb_Suppressed_Err_Codes%ROWTYPE RESULT_CACHE;

  FUNCTION Fn_Get_ertbs_ovd_conv_Frc(p_brn_code IN VARCHAR2,
                                     p_func_id  IN VARCHAR2
                                     --12.1 changes start
                                    ,
                                     p_source_code IN VARCHAR2
                                     --12.1 changes end
                                     ) RETURN ty_ertbs_ovd_conv RESULT_CACHE;

  FUNCTION Fn_Get_Cstb_Fld_Lbl_Map_Frc(p_func_id  IN VARCHAR2,
                                       p_fld_name IN VARCHAR2)
    RETURN Cstb_Fld_Lbl_Map%ROWTYPE RESULT_CACHE;

  FUNCTION Fn_Get_Item_Desc_Rec_Wrp(p_sourcecode IN VARCHAR2,
                                    p_functionid IN VARCHAR2,
                                    p_itemname   IN VARCHAR2,
                                    p_langcode   IN VARCHAR2,
                                    p_Err_code   IN OUT VARCHAR2,
                                    p_Err_params IN OUT VARCHAR2)
    RETURN BOOLEAN;
--Standalone12.3 CleanUp Start 
  /*FUNCTION Fn_Get_Product_Rec_Wrp(p_ProductCode IN VARCHAR2,
                                  p_Err_code    IN OUT VARCHAR2,
                                  p_Err_params  IN OUT VARCHAR2)
    RETURN BOOLEAN;*/
--Standalone12.3 CleanUp End
  FUNCTION Fn_Get_Amtword_Text_Rec_Wrp(p_lang       IN VARCHAR2,
                                       p_amt        IN NUMBER,
                                       p_Err_code   IN OUT VARCHAR2,
                                       p_Err_params IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Get_Udtm_Fields_Rec_Wrp(p_field_name IN VARCHAR2,
                                      p_Err_code   IN OUT VARCHAR2,
                                      p_Err_params IN OUT VARCHAR2)
    RETURN BOOLEAN;

--Standalone12.3 CleanUp Start
  /*
  FUNCTION Fn_Get_Acc_Class_Rec_Wrp(p_AccountClass IN VARCHAR2,
                                    p_Err_code     IN OUT VARCHAR2,
                                    p_Err_params   IN OUT VARCHAR2)
    RETURN BOOLEAN;
  */
--Standalone12.3 CleanUp End

  FUNCTION Fn_Get_Bic_Directory_Rec_Wrp(p_bic_code   IN VARCHAR2,
                                        p_Err_code   IN OUT VARCHAR2,
                                        p_Err_params IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Get_Source_Pref_Rec_Wrp(p_sourcecode IN VARCHAR2,
                                      p_modulecode IN VARCHAR2,
                                      p_Err_code   IN OUT VARCHAR2,
                                      p_Err_params IN OUT VARCHAR2)
    RETURN BOOLEAN;
end Cspks_Function_Cache_Core;
/
create or replace synonym Cspkss_Function_Cache_Core for Cspks_Function_Cache_Core
/