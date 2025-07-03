CREATE OR REPLACE PACKAGE lbpks_lbdddonl_upload AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdddonl_upload.spc
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


 Changed By         : Ramya M
  Date               : 21-FEB-2020
  Change Description : OBCL 14.4 Changes done to Introduce Distribute Principal in drawdown for LS
  Search String      : OBCL 14.4_LS_DISTRIBUTE_PRINCIPAL

	**Changed By         : Pallavi R
	**Date               : 21-Feb-2022
	**Change Description : Changes done for Linkage Amount Changes
	**Search String      : OBCL_14.5_SMTB_#33864064 Changes  
		
    **Changed By         : Arunprasath
	**Date               : 27-Jul-2022
	**Change Description : Drawdown SSI Mnemonic Change -- new golobal variable for getting page version and ESN
	**Search String      : Bug#35647444 
	
	**Changed By         : Jayaram
    **Date               : 03-Apr-2024
    **Change Description : Component Wise Payment Details
    **Search String      : Bug#36459259
    
    **Changed By         : Vineeth T M
   **Date               : 12-Aug-2024
   **Change Description : LS Version rollover changes
   **Search String      : OBCL_14.8_LS_VER_ROL changes
  -------------------------------------------------------------------------------------------------------
  */
  g_interface_id varchar2(20);
  g_once_split         VARCHAR2(1) := 'N'; --OBCL_14.1_SUPP_SMTB_#29412429 Changes
  g_schedules_exploded VARCHAR2(5) := 'FALSE'; --OBCL_14.1_SUPP_SMTB_#29412429 Changes
  g_Linkages_Action      VARCHAR2(10); --OBCL_14.5_SMTB_#33864064 Changes
  g_page_version  VARCHAR2(10); --Bug#35647444
  FUNCTION fn_drawdown_save(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_Child_Function   IN VARCHAR2,
                            p_Multi_Trip_Id    IN VARCHAR2,
                            p_lbdddonl         IN lbpks_lbdddonl_Main.Ty_lbdddonl,
                            p_Prev_lbdddonl    IN lbpks_lbdddonl_Main.Ty_lbdddonl,
                            p_Wrk_lbdddonl     IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_lbdddonl_delete(p_Source           IN VARCHAR2,
                              p_Source_Operation IN VARCHAR2,
                              p_Function_Id      IN VARCHAR2,
                              p_Action_Code      IN VARCHAR2,
                              p_Child_Function   IN VARCHAR2,
                              p_Multi_Trip_Id    IN VARCHAR2,
                              p_lbdddonl         IN lbpks_lbdddonl_Main.Ty_lbdddonl,
                              p_Prev_lbdddonl    IN lbpks_lbdddonl_Main.Ty_lbdddonl,
                              p_Wrk_lbdddonl     IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
                              p_Err_Code         IN OUT VARCHAR2,
                              p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_unlock_preauth(p_Source           IN VARCHAR2,
                             p_Source_Operation IN VARCHAR2,
                             p_Function_Id      IN VARCHAR2,
                             p_Action_Code      IN VARCHAR2,
                             p_lbdddonl         IN lbpks_lbdddonl_Main.Ty_lbdddonl,
                             p_Prev_lbdddonl    IN lbpks_lbdddonl_Main.Ty_lbdddonl,
                             p_Wrk_lbdddonl     IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
                             p_Err_Code         IN OUT VARCHAR2,
                             p_Err_Params       IN OUT VARCHAR2)

   RETURN BOOLEAN;

  FUNCTION Fn_Default_and_validate(p_Source           IN VARCHAR2,
                                   p_Source_Operation IN VARCHAR2,
                                   p_Function_Id      IN VARCHAR2,
                                   p_Action_Code      IN VARCHAR2,
                                   p_lbdddonl         IN lbpks_lbdddonl_Main.Ty_lbdddonl,
                                   p_Prev_lbdddonl    IN lbpks_lbdddonl_Main.Ty_lbdddonl,
                                   p_Wrk_lbdddonl     IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
                                   p_Err_Code         IN OUT VARCHAR2,
                                   p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_validate_md_for_holiday(p_Source       IN VARCHAR2,
                                      p_Function_Id  IN VARCHAR2,
                                      p_Wrk_lbdddonl IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
                                      p_working_date OUT DATE,
                                      p_Err_Code     IN OUT VARCHAR2,
                                      p_Err_Params   IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_redefine_sch(p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_Id      IN VARCHAR2,
                           p_Action_Code      IN VARCHAR2,
                           p_Child_Function   IN VARCHAR2,
                           p_Multi_Trip_Id    IN VARCHAR2,
                           p_lbdddonl         IN lbpks_lbdddonl_Main.Ty_lbdddonl,
                           p_Prev_lbdddonl    IN lbpks_lbdddonl_Main.Ty_lbdddonl,
                           p_Wrk_lbdddonl     IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_show_payment_det(p_Source           IN VARCHAR2,
                               p_Source_Operation IN VARCHAR2,
                               p_Function_Id      IN VARCHAR2,
                               p_Action_Code      IN VARCHAR2,
                               p_Child_Function   IN VARCHAR2,
                               p_Multi_Trip_Id    IN VARCHAR2,
                               p_lbdddonl         IN lbpks_lbdddonl_Main.Ty_lbdddonl,
                               p_Prev_lbdddonl    IN lbpks_lbdddonl_Main.Ty_lbdddonl,
                               p_Wrk_lbdddonl     IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
                               p_Err_Code         IN OUT VARCHAR2,
                               p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_lbdddonl_reverse(p_Source           IN VARCHAR2,
                               p_Source_Operation IN VARCHAR2,
                               p_Function_Id      IN VARCHAR2,
                               p_Action_Code      IN VARCHAR2,
                               p_Child_Function   IN VARCHAR2,
                               p_Multi_Trip_Id    IN VARCHAR2,
                               p_lbdddonl         IN lbpks_lbdddonl_Main.Ty_lbdddonl,
                               p_Prev_lbdddonl    IN lbpks_lbdddonl_Main.Ty_lbdddonl,
                               p_Wrk_lbdddonl     IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
                               p_Err_Code         IN OUT VARCHAR2,
                               p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_lbdddonl_copy(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_Child_Function   IN VARCHAR2,
                            p_Multi_Trip_Id    IN VARCHAR2,
                            p_lbdddonl         IN lbpks_lbdddonl_Main.Ty_lbdddonl,
                            p_Prev_lbdddonl    IN lbpks_lbdddonl_Main.Ty_lbdddonl,
                            p_Wrk_lbdddonl     IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Version_Query(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_Child_Function   IN VARCHAR2,
                            p_Full_Data        IN VARCHAR2 DEFAULT 'Y',
                            p_With_Lock        IN VARCHAR2 DEFAULT 'N',
                            p_QryData_Reqd     IN VARCHAR2,
                            p_lbdddonl         IN lbpks_lbdddonl_Main.Ty_lbdddonl,
                            p_Wrk_lbdddonl     IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_log_override(p_Source       IN VARCHAR2,
                           p_Function_Id  IN VARCHAR2,
                           p_Action_Code  IN VARCHAR2,
                           p_wrk_lbdddonl IN OUT lbpks_lbdddonl_main.ty_lbdddonl,
                           p_Err_Code     IN OUT VARCHAR2,

                           p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_validate_fee_schedules(p_Source           IN VARCHAR2,
                                     p_Source_Operation IN VARCHAR2,
                                     p_Function_Id      IN VARCHAR2,
                                     p_Action_Code      IN VARCHAR2,
                                     p_Wrk_lbdddonl     IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
                                     p_Err_Code         IN OUT VARCHAR2,
                                     p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Query_expschedules(p_Source           IN VARCHAR2,
                                 p_Source_Operation IN VARCHAR2,
                                 p_Function_Id      IN VARCHAR2,
                                 p_Action_Code      IN VARCHAR2,
                                 p_Child_Function   IN VARCHAR2,
                                 p_lbdddonl         IN lbpks_lbdddonl_Main.Ty_lbdddonl,
                                 p_Wrk_lbdddonl     IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
                                 p_Err_Code         IN OUT VARCHAR2,
                                 p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_lbdddonl_hold(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_Child_Function   IN VARCHAR2,
                            p_Multi_Trip_Id    IN VARCHAR2,
                            p_lbdddonl         IN lbpks_lbdddonl_Main.Ty_lbdddonl,
                            p_Prev_lbdddonl    IN lbpks_lbdddonl_Main.Ty_lbdddonl,
                            p_Wrk_lbdddonl     IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
    --Bug 27471041 start
     FUNCTION Fn_Upload_Multiple_Linkages(p_Source       IN VARCHAR2,
                                    p_Function_Id  IN VARCHAR2,
                                    p_Action_Code  IN VARCHAR2,
                                    p_lbdddonl         IN lbpks_lbdddonl_Main.Ty_lbdddonl,
                                    p_Prev_Lbdddonl    IN Lbpks_Lbdddonl_Main.Ty_Lbdddonl,
                                    p_Wrk_lbdddonl IN OUT Lbpks_lbdddonl_Main.Ty_lbdddonl,
                                    p_Err_Code     IN OUT VARCHAR2,
                                    p_Err_Params   IN OUT VARCHAR2)
      RETURN BOOLEAN ;
     --Bug 27471041 end
	 
 /*STARTS OBCL 14.4_LS_DISTRIBUTE_PRINCIPAL*/
FUNCTION Fn_Distribute_Principal (
    p_Source             IN     VARCHAR2,
    p_Source_Operation   IN     VARCHAR2,
    p_Function_Id        IN     VARCHAR2,
    p_Action_Code        IN     VARCHAR2,
    p_Child_Function     IN     VARCHAR2,
    p_Multi_Trip_Id      IN     VARCHAR2,
    p_Lbdddonl           IN     Lbpks_Lbdddonl_Main.Ty_Lbdddonl,
    p_Prev_Lbdddonl      IN     Lbpks_Lbdddonl_Main.Ty_Lbdddonl,
    p_Wrk_Lbdddonl       IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl,
    p_Err_Code           IN OUT VARCHAR2,
    p_Err_Params         IN OUT VARCHAR2)
    RETURN BOOLEAN ; /*ENDS OBCL 14.4_LS_DISTRIBUTE_PRINCIPAL*/
	
	
--Bug#36459259:Changes Starts here     
FUNCTION Fn_get_CompWisedetails(p_Source           IN VARCHAR2,
                                p_Source_Operation IN VARCHAR2,
                                p_Function_Id      IN VARCHAR2,
                                p_Action_Code      IN VARCHAR2,
                                p_Child_Function   IN VARCHAR2,                               
                                p_lbdddonl         IN lbpks_lbdddonl_Main.Ty_lbdddonl,
                                p_Wrk_lbdddonl     IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
                                p_Err_Code         IN OUT VARCHAR2,
                                p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
--Bug#36459259:Changes Ends here   
  --OBCL_14.8_LS_VER_ROL Changes start                    
  FUNCTION Fn_Update_Tranche_Limit_Utilization(p_Dd_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                               p_Amt                IN Oltbs_Contract_Master.Amount%TYPE,
                                               p_Event_Code         IN Oltb_Contract_Event_Log.Event_Code%TYPE,
                                               p_Error_Code         IN OUT VARCHAR2,
                                               p_Error_Parameter    IN OUT VARCHAR2)
  RETURN BOOLEAN;   
  --OBCL_14.8_LS_VER_ROL Changes end
END lbpks_lbdddonl_upload;
/
CREATE OR REPLACE Synonym lbpkss_lbdddonl_upload FOR lbpks_lbdddonl_upload
/