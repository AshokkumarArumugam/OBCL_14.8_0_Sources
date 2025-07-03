CREATE OR REPLACE PACKAGE lbpks_lbdvamnd_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdvamnd_utils.spc
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
  
  Changed By         : Sowmya Bitra
  Changed On         : 18-Nov-2020
  Change Description : Auto Authorization changes
  Search String      : OBCL_LS_Auto_Auth
  
  Changed By         : Sudharshini Balaji
  Changed On         : 08-July-2022
  Change Description : Added code for Bug#34359559
  Search String      : Bug#34359559
  
  Changed By         : Palanisamy M
  Changed On         : 08-Aug-2022
  Change Description : Fix for Collateral Block amount not getting released
  Search String      : Bug#34445827  
  -------------------------------------------------------------------------------------------------------
  */
l_PRM_REAMOT_DATE VARCHAR2(1);
l_prm_vamb_esn  oltbs_contract.latest_event_seq_no%type;
l_prm_nonprorata_defn VARCHAR2(1);
l_PRM_HOL_CHECK varchar2(1);
l_prm_valid_date VARCHAR2(1);
l_prm_installment_deposit varchar2(1);
l_prm_today DATE;
l_prm_holiday_check VARCHAR2(1);
l_prm_advices VARCHAR2(10);--boolean
l_PRM_MAT_VISIT   varchar2(1);
--l_PRM_LATEST_VERSION_OPS  oltbs_contract.latest_version_no%TYPE;   p_Wrk_lbdvamnd.v_oltbs_contract.latest_version_no
l_PRM_DD_COUNT NUMBER:=0;
global_media_priority_visited VARCHAR2(1);
global_cs_workflow  VARCHAR2(1);
global_NPVAMI_NEW_PART varchar2(1);
L_PRM_INT_REFUND_REQUIRED_YN VARCHAR2(1);--OBCL_14.5_LS_DISCOUNTED_SCHEDULES CHANGES starts
-- commented for Bug#34359559 g_stop_liqd_restore  VARCHAR2(1) := 'Y'; --OBCL_14.5_Risk_Comp
g_stop_liqd_restore  VARCHAR2(1) := 'N'; --OBCL_14.5_Risk_Comp Bug#34359559 changes
--g_limittrack_blockref_call_on_auth	VARCHAR2(1) :='N'; --BUG#34445827 Changes
PROCEDURE Pr_Skip_Handler  (P_Stage  IN  VARCHAR2);
/*
PROCEDURE pr_ccy_conv (p_FROM_ccy  IN VARCHAR2,
		       p_to_ccy    IN VARCHAR2,
		       p_FROM_amts IN VARCHAR2,
		       p_to_amts IN OUT VARCHAR2);*/
    FUNCTION Fn_Upload_Db(p_Source           IN VARCHAR2,
                              p_Source_Operation IN VARCHAR2,
                              p_Function_Id      IN VARCHAR2,
                              p_Action_Code      IN VARCHAR2,
                              p_Child_Function   IN VARCHAR2,
                              p_lbdvamnd         IN lbpks_lbdvamnd_Main.Ty_lbdvamnd,
                              p_Prev_lbdvamnd    IN  lbpks_lbdvamnd_Main.Ty_lbdvamnd,
                              p_Wrk_lbdvamnd     IN OUT lbpks_lbdvamnd_Main.Ty_lbdvamnd,
                              p_Err_Code         IN OUT VARCHAR2,
                              p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;       
     FUNCTION Fn_Process (p_Source    IN  VARCHAR2,
        p_Source_Operation  IN     VARCHAR2,
        p_Function_id       IN     VARCHAR2,
        p_Action_Code       IN     VARCHAR2,        
        p_lbdvamnd IN lbpks_lbdvamnd_Main.Ty_lbdvamnd,
        p_Prev_lbdvamnd IN  lbpks_lbdvamnd_Main.Ty_lbdvamnd,
        p_Wrk_lbdvamnd IN OUT  lbpks_lbdvamnd_Main.Ty_lbdvamnd,
        p_Err_Code       IN  OUT VARCHAR2,
        p_Err_Params     IN  OUT VARCHAR2)
        RETURN BOOLEAN; 
		
  --OBCL_LS_Auto_Auth changes Start
  FUNCTION fn_set_auto_auth(p_Source       IN VARCHAR2,
                            p_Action_Code  IN VARCHAR2,
                            p_Function_Id  IN VARCHAR2,
                            p_wrk_lbdvamnd IN OUT lbpks_lbdvamnd_main.ty_lbdvamnd,
                            p_Err_Code     IN OUT VARCHAR2,
                            p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;	
  --OBCL_LS_Auto_Auth changes End
  
FUNCTION Fn_Query  ( p_Source    IN  VARCHAR2,
      p_Source_Operation  IN     VARCHAR2,
      p_Function_Id       IN     VARCHAR2,
      p_Action_Code       IN     VARCHAR2,
      p_Child_Function    IN  VARCHAR2,
      p_Full_Data     IN  VARCHAR2 DEFAULT 'Y',
      p_With_Lock     IN  VARCHAR2 DEFAULT 'N',
      p_QryData_Reqd IN  VARCHAR2 ,
      p_lbdvamnd IN   lbpks_lbdvamnd_Main.Ty_lbdvamnd,
      p_Wrk_lbdvamnd IN OUT   lbpks_lbdvamnd_Main.Ty_lbdvamnd,
      p_Err_Code          IN OUT VARCHAR2,
      p_Err_Params        IN OUT VARCHAR2)
      RETURN BOOLEAN;           
END lbpks_lbdvamnd_utils;
/
CREATE OR REPLACE SYNONYM lbpkss_lbdvamnd_utils FOR lbpks_lbdvamnd_utils
/