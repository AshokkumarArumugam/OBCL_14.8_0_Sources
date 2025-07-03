CREATE OR REPLACE PACKAGE global_approot_utils AS

  /*-----------------------------------------------------------------------------------------------------
   **
   ** File Name  : global_approot_utils
   **
   ** Module     : Core Service
   **
   ** This source is part of the Oracle FLEXCUBE Software Product.
   ** Copyright ©  2007,2019 , Oracle and/or its affiliates.  All rights reserved
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

   Changed By         : Poornachandran R
   Changed On         : 17-OCT-2019
   Change Description : Multitenant 19C Changes, Currency is not getting populated if not maintained at approot
   Search String      : FCUBS14.3_30378814_18C changes

   -------------------------------------------------------------------------------------------------------
  */
  g_current_container_id VARCHAR(20) := NULL;

  PROCEDURE pr_set_user_container_id(p_user_id VARCHAR2);

  FUNCTION fn_get_brn_rec_pdb(p_brn IN VARCHAR2)
    RETURN Sttms_core_Branch%ROWTYPE RESULT_CACHE;
	
--FCUBS14.3_30378814_18C changes starts
  FUNCTION fn_get_ccy_rec_pdb(p_ccy IN VARCHAR2)
    RETURN cytm_ccy_defn%ROWTYPE;
  FUNCTION Fn_Approot_Upgrade_chk(p_function_id IN VARCHAR2)
    RETURN VARCHAR2;
--FCUBS14.3_30378814_18C changes ends

  FUNCTION fn_get_brn_date_pdb(p_Brn IN VARCHAR2) RETURN Sttm_Dates%ROWTYPE RESULT_CACHE;

  FUNCTION fn_get_brn_status_rec_pdb(p_brn IN VARCHAR2)
    RETURN Sttms_core_Branch_Status%ROWTYPE RESULT_CACHE;

  FUNCTION fn_get_brn_swift_addr_rec_pdb(p_brn IN VARCHAR2)
    RETURN Sttms_Core_Swift_Address%ROWTYPE RESULT_CACHE;

  FUNCTION fn_get_brn_pref_rec_pdb(p_brn IN VARCHAR2) 
    RETURN Sttms_Core_Branch_Pref%ROWTYPE RESULT_CACHE;

  PROCEDURE pr_set_pkg_debug_pdb(pm_user VARCHAR2);

  FUNCTION fn_get_usr_lang_pdb(pm_user VARCHAR2)
    RETURN smtb_user.user_language%TYPE;

  FUNCTION fn_get_smtb_user_pdb(p_userid IN VARCHAR2)
    RETURN Smtb_User%ROWTYPE RESULT_CACHE;
  FUNCTION fn_chk_userrights(p_user_id     IN smtbs_user.user_id%TYPE,
                             p_function_id IN smtbs_menu.function_id%TYPE,
                             p_branch      IN sttms_core_branch.branch_code%TYPE,
                             p_action      IN smtbs_action_controls.action_name%TYPE)
    RETURN BOOLEAN;
  FUNCTION fn_check_auto_auth_pdb(Puser_Id     IN Smtbs_User.User_Id%TYPE,
                                  Pfunction_Id IN Smtbs_Menu.Function_Id%TYPE,
                                  Pbranch_Code IN Sttms_Core_Branch.Branch_Code%TYPE)
    RETURN BOOLEAN;
END global_approot_utils;
/