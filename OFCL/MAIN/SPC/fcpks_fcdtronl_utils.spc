CREATE OR REPLACE PACKAGE Fcpks_Fcdtronl_Utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : fcpks_fcdtronl_utils.spc
  **
  ** Module     : FC
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
	
    Changed By         : Pallavi R
    Changed On         : 30-Oct-2019
    Search String      : OBCL_14.4_LS_Adhoc_FEE Changes
    Change Reason      : To handle Adhoc Arrear for fee schedules. 	

  Changed By         : Pallavi R
  Changed On         : 24-May-2021
  Search String      : OBCL_14.1_SMTB_#31478827 Changes
  Change Reason      : Explode Schedule Changes(Created This Package)	
  
  Changed By         : Abhinav Bhasker
  Changed On         : 27-Mar-2022
  Search String      : OBCL_14.5_STAND_BY_FEE
  Change Reason      : Changes w.r.t. StandByFees (SFR# 34004511)
  -------------------------------------------------------------------------------------------------------
  */
    g_Camd_Adhoh_Fee VARCHAR2(1) := 'N'; --OBCL_14.4_LS_Adhoc_FEE Changes
  FUNCTION Fn_Default_And_Validate(p_Source        IN VARCHAR2,
                                   p_Function_Id   IN VARCHAR2,
                                   p_Action_Code   IN VARCHAR2,
                                   p_Fcdtronl      IN Fcpks_Fcdtronl_Main.Ty_Fcdtronl,
                                   p_Prev_Fcdtronl IN Fcpks_Fcdtronl_Main.Ty_Fcdtronl,
                                   p_Wrk_Fcdtronl  IN OUT Fcpks_Fcdtronl_Main.Ty_Fcdtronl,
                                   p_Err_Code      IN OUT VARCHAR2,
                                   p_Err_Params    IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --OBCL_14.1_SMTB_#31478827 Changes Starts
  FUNCTION Fn_Get_Subsys_Stat(p_Subsystem  IN VARCHAR2,
                              p_Subsysstat IN VARCHAR2) RETURN VARCHAR2;
  --OBCL_14.1_SMTB_#31478827 Changes Ends
  FUNCTION Fn_Process_Contract(p_Source        IN VARCHAR2,
                               p_Function_Id   IN VARCHAR2,
                               p_Action_Code   IN VARCHAR2,
                               p_Prev_Fcdtronl IN Fcpks_Fcdtronl_Main.Ty_Fcdtronl,
                               p_Wrk_Fcdtronl  IN OUT Fcpks_Fcdtronl_Main.Ty_Fcdtronl,
                               p_Err_Code      IN OUT VARCHAR2,
                               p_Err_Params    IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Subsys_Pickup(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_Fcdtronl         IN Fcpks_Fcdtronl_Main.Ty_Fcdtronl,
                            p_Prev_Fcdtronl    IN Fcpks_Fcdtronl_Main.Ty_Fcdtronl,
                            p_Wrk_Fcdtronl     IN OUT Fcpks_Fcdtronl_Main.Ty_Fcdtronl,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Subsys_Upload(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_Fcdtronl         IN Fcpks_Fcdtronl_Main.Ty_Fcdtronl,
                            p_Prev_Fcdtronl    IN Fcpks_Fcdtronl_Main.Ty_Fcdtronl,
                            p_Wrk_Fcdtronl     IN OUT Fcpks_Fcdtronl_Main.Ty_Fcdtronl,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Product_Default(p_Source           IN VARCHAR2,
                              p_Source_Operation IN VARCHAR2,
                              p_Function_Id      IN VARCHAR2,
                              p_Action_Code      IN VARCHAR2,
                              p_Fcdtronl         IN Fcpks_Fcdtronl_Main.Ty_Fcdtronl,
                              p_Wrk_Fcdtronl     IN OUT Fcpks_Fcdtronl_Main.Ty_Fcdtronl,
                              p_Err_Code         IN OUT VARCHAR2,
                              p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Unlock_Postauth(p_Source        IN VARCHAR2,
                              p_Function_Id   IN VARCHAR2,
                              p_Action_Code   IN VARCHAR2,
                              p_Fcdtronl      IN Fcpks_Fcdtronl_Main.Ty_Fcdtronl,
                              p_Prev_Fcdtronl IN Fcpks_Fcdtronl_Main.Ty_Fcdtronl,
                              p_Wrk_Fcdtronl  IN OUT Fcpks_Fcdtronl_Main.Ty_Fcdtronl,
                              p_Err_Code      IN OUT VARCHAR2,
                              p_Err_Params    IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Unlock_Preauth(p_Source        IN VARCHAR2,
                             p_Function_Id   IN VARCHAR2,
                             p_Action_Code   IN VARCHAR2,
                             p_Fcdtronl      IN Fcpks_Fcdtronl_Main.Ty_Fcdtronl,
                             p_Prev_Fcdtronl IN Fcpks_Fcdtronl_Main.Ty_Fcdtronl,
                             p_Wrk_Fcdtronl  IN OUT Fcpks_Fcdtronl_Main.Ty_Fcdtronl,
                             p_Err_Code      IN OUT VARCHAR2,
                             p_Err_Params    IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Log_Override(p_Source       IN VARCHAR2,
                           p_Function_Id  IN VARCHAR2,
                           p_Action_Code  IN VARCHAR2,
                           p_Wrk_Fcdtronl IN OUT Fcpks_Fcdtronl_Main.Ty_Fcdtronl,
                           p_Err_Code     IN OUT VARCHAR2,
                           p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Copy(p_Source        IN VARCHAR2,
                   p_Function_Id   IN VARCHAR2,
                   p_Action_Code   IN VARCHAR2,
                   p_Fcdtronl      IN Fcpks_Fcdtronl_Main.Ty_Fcdtronl,
                   p_Prev_Fcdtronl IN Fcpks_Fcdtronl_Main.Ty_Fcdtronl,
                   p_Wrk_Fcdtronl  IN OUT Fcpks_Fcdtronl_Main.Ty_Fcdtronl,
                   p_Err_Code      IN OUT VARCHAR2,
                   p_Err_Params    IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Revrese(p_Source        IN VARCHAR2,
                      p_Function_Id   IN VARCHAR2,
                      p_Action_Code   IN VARCHAR2,
                      p_Fcdtronl      IN Fcpks_Fcdtronl_Main.Ty_Fcdtronl,
                      p_Prev_Fcdtronl IN Fcpks_Fcdtronl_Main.Ty_Fcdtronl,
                      p_Wrk_Fcdtronl  IN OUT Fcpks_Fcdtronl_Main.Ty_Fcdtronl,
                      p_Err_Code      IN OUT VARCHAR2,
                      p_Err_Params    IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Delete(p_Source        IN VARCHAR2,
                     p_Function_Id   IN VARCHAR2,
                     p_Action_Code   IN VARCHAR2,
                     p_Fcdtronl      IN Fcpks_Fcdtronl_Main.Ty_Fcdtronl,
                     p_Prev_Fcdtronl IN Fcpks_Fcdtronl_Main.Ty_Fcdtronl,
                     p_Wrk_Fcdtronl  IN OUT Fcpks_Fcdtronl_Main.Ty_Fcdtronl,
                     p_Err_Code      IN OUT VARCHAR2,
                     p_Err_Params    IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Version_Query(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_Full_Data        IN VARCHAR2 DEFAULT 'Y',
                            p_With_Lock        IN VARCHAR2 DEFAULT 'N',
                            p_Qrydata_Reqd     IN VARCHAR2,
                            p_Fcdtronl         IN Fcpks_Fcdtronl_Main.Ty_Fcdtronl,
                            p_Wrk_Fcdtronl     IN OUT Fcpks_Fcdtronl_Main.Ty_Fcdtronl,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --OBCL_14.4_LS_FEE Changes Starts
  FUNCTION Fn_Upd_Subsys_Stat(p_Subsystem  IN VARCHAR2,
                              p_Stat       IN VARCHAR2,
                              p_Subsysstat IN VARCHAR2) RETURN VARCHAR2;
  --OBCL_14.4_LS_FEE Changes Ends

  FUNCTION Fn_Validate_Cif(p_Source       IN VARCHAR2,
                           p_Function_Id  IN VARCHAR2,
                           p_Wrk_Fcdtronl IN OUT Fcpks_Fcdtronl_Main.Ty_Fcdtronl,
                           p_Err_Code     IN OUT VARCHAR2,
                           p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;

    -- facility Borrower limit changes starts
  FUNCTION fn_validate_tranche_borr_lmt(p_Source        IN VARCHAR2,
                                p_Function_Id   IN VARCHAR2,
                                p_Action_Code   IN VARCHAR2,
                                p_fcdtronl      IN fcpks_fcdtronl_Main.Ty_fcdtronl,
                                p_prev_fcdtronl IN fcpks_fcdtronl_Main.ty_fcdtronl,
                                p_wrk_fcdtronl  IN OUT fcpks_fcdtronl_Main.ty_fcdtronl,
                                p_Err_Code      IN OUT VARCHAR2,
                                p_Err_Params    IN OUT VARCHAR2) RETURN BOOLEAN;
   -- facility Borrower limit changes ends                          
   
  --Bug#32724405 - Front to back trace - Start
FUNCTION Fn_Update_RefNum(p_contract_ref_num IN VARCHAR2,
						  p_channel_ref_num  IN VARCHAR2,
						  p_process_ref_num  IN VARCHAR2,						  
						  p_Err_Code         IN OUT VARCHAR2,
						  p_Err_Params       IN OUT VARCHAR2)
RETURN BOOLEAN;
--Bug#32724405 - Front to back trace - End

--OBCL_14.5_STAND_BY_FEE Start
  FUNCTION Fn_Get_StandByFee_Dtl(p_product  IN VARCHAR2,
                              p_component      IN VARCHAR2) 
   RETURN VARCHAR2;
 FUNCTION fn_is_standbyfee_facility(p_facility_ref_no VARCHAR2)
 RETURN BOOLEAN;
--OBCL_14.5_STAND_BY_FEE End
END Fcpks_Fcdtronl_Utils;
/
CREATE OR REPLACE SYNONYM Fcpkss_Fcdtronl_Utils FOR Fcpks_Fcdtronl_Utils
/