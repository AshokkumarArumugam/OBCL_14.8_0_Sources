CREATE OR REPLACE PACKAGE lfpks_lfcfesch_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lfpks_lfcfesch_utils.spc
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
  
  SFR Number         :
  Changed By         :
  Change Description :

    Changed By         : Pallavi R
    Changed On         : 28-Oct-2019
    Search String      : OBCL_14.4_LS_FEE Changes
    Change Reason      : To allow amend for fee schedules.     
  -------------------------------------------------------------------------------------------------------
  */
  l_fas91_fee    lftms_product_fee.fas91_fee%TYPE;
  l_bullet_sch   BOOLEAN;
  l_once_split   VARCHAR2(1):= 'N';
  l_pre_stdt     oltbs_contract_schedules.start_date%TYPE;
  l_sch_exploded VARCHAR2(1);
  g_Fc_Fee_Sch_Amend VARCHAR2(1) := 'N';--OBCL_14.4_LS_FEE Changes
  FUNCTION Fn_Default_And_Validate(p_Source           IN VARCHAR2,
                                   p_Source_Operation IN VARCHAR2,
                                   p_Function_Id      IN VARCHAR2,
                                   p_Action_Code      IN VARCHAR2,
                                   p_Main_Function    IN VARCHAR2,
                                   p_Child_Function   IN VARCHAR2,
                                   p_lfcfesch         IN lfpks_lfcfesch_Main.Ty_lfcfesch,
                                   p_Prev_lfcfesch    IN lfpks_lfcfesch_Main.Ty_lfcfesch,
                                   p_Wrk_lfcfesch     IN OUT lfpks_lfcfesch_Main.Ty_lfcfesch,
                                   p_Err_Code         IN OUT VARCHAR2,
                                   p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_explode_schedules(p_Source       IN VARCHAR2,
                                p_Function_Id  IN VARCHAR2,
                                p_Action_Code  IN VARCHAR2,
                                p_Wrk_lfcfesch IN OUT lfpks_lfcfesch_Main.Ty_lfcfesch,
                                p_Err_Code     IN OUT VARCHAR2,
                                p_Err_Params   IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Upload_Db(p_Source           IN VARCHAR2,
                        p_Source_Operation IN VARCHAR2,
                        p_Function_Id      IN VARCHAR2,
                        p_Action_Code      IN VARCHAR2,
                        p_Main_Function    IN VARCHAR2,
                        p_Child_Function   IN VARCHAR2,
                        p_Multi_Trip_Id    IN VARCHAR2,
                        p_lfcfesch         IN lfpks_lfcfesch_Main.Ty_lfcfesch,
                        p_Prev_lfcfesch    IN lfpks_lfcfesch_Main.Ty_lfcfesch,
                        p_Wrk_lfcfesch     IN OUT lfpks_lfcfesch_Main.Ty_lfcfesch,
                        p_Err_Code         IN OUT VARCHAR2,
                        p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Query(p_Source           IN VARCHAR2,
                    p_Source_Operation IN VARCHAR2,
                    p_Function_Id      IN VARCHAR2,
                    p_Action_Code      IN VARCHAR2,
                    p_Main_Function    IN VARCHAR2,
                    p_Child_Function   IN VARCHAR2,
                    p_Key_Tags_Vals    IN OUT VARCHAR2,
                    p_QryData_Reqd     IN VARCHAR2,
                    p_lfcfesch         IN lfpks_lfcfesch_Main.Ty_lfcfesch,
                    p_Wrk_lfcfesch     IN OUT lfpks_lfcfesch_Main.Ty_lfcfesch,
                    p_Err_Code         IN OUT VARCHAR2,
                    p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  --OBCL_14.4_LS_FEE Changes Starts
  FUNCTION Fn_Pick_Up(p_Source           IN VARCHAR2,
                      p_Source_Operation IN VARCHAR2,
                      p_Function_Id      IN VARCHAR2,
                      p_Action_Code      IN VARCHAR2,
                      p_Main_Function    IN VARCHAR2,
                      p_Lfcfesch         IN Lfpks_Lfcfesch_Main.Ty_Lfcfesch,
                      p_Prev_Lfcfesch    IN Lfpks_Lfcfesch_Main.Ty_Lfcfesch,
                      p_Wrk_Lfcfesch     IN OUT Lfpks_Lfcfesch_Main.Ty_Lfcfesch,
                      p_Err_Code         IN OUT VARCHAR2,
                      p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;	
					  
  --OBCL_14.4_LS_FEE Changes Ends
END lfpks_lfcfesch_utils;
/
CREATE OR REPLACE SYNONYM lfpkss_lfcfesch_utils FOR lfpks_lfcfesch_utils
/