CREATE OR REPLACE PACKAGE Lbpks_Lbdfeamd_Utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdfeamd_utils.spc
  **
  ** Module     : The ICCF
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright Â© 2007 - 2019  Oracle and/or its affiliates.  All rights reserved
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
  
       **Changed By         : Pallavi R
       **Date               : 29-Nov-2019/05-Apr-2020
       **Change Description : Expense fees Changes 
       **Search String      : OBCL_14.4_LS_Expense_Fee Changes   
       
	   **Changed By         : Abhinav Bhasker
       **Date               : 14-Jun-2022
       **Change Description : Fee Amendment when Fee Schedule already maintained at Tranche Level
       **Search String      : Bug#34262190
  -------------------------------------------------------------------------------------------------------
  */
  g_Prm_Maturity_Date         DATE;
  g_Prm_Value_Date            DATE;
  g_Allow_Fee_Enddt_Reduction CHAR(1);
  g_End_Date_List             VARCHAR2(2000);
  g_Component_List            VARCHAR2(2000);
  g_feeamd_dlt                VARCHAR2(1) := 'N';--Bug#34262190
  --OBCL_14.4_LS_Expense_Fee Changes Starts
  FUNCTION Fn_Get_Subsys_Stat(p_Subsystem  IN VARCHAR2,
                              p_Subsysstat IN VARCHAR2) RETURN VARCHAR2;
  --OBCL_14.4_LS_Expense_Fee Changes Ends
  FUNCTION Fn_Subsys_Pickup(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_Lbdfeamd         IN Lbpks_Lbdfeamd_Main.Ty_Lbdfeamd,
                            p_Prev_Lbdfeamd    IN Lbpks_Lbdfeamd_Main.Ty_Lbdfeamd,
                            p_Wrk_Lbdfeamd     IN OUT Lbpks_Lbdfeamd_Main.Ty_Lbdfeamd,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Validate(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_Child_Function   IN VARCHAR2,
                       p_Lbdfeamd         IN Lbpks_Lbdfeamd_Main.Ty_Lbdfeamd,
                       p_Prev_Lbdfeamd    IN OUT Lbpks_Lbdfeamd_Main.Ty_Lbdfeamd,
                       p_Wrk_Lbdfeamd     IN OUT Lbpks_Lbdfeamd_Main.Ty_Lbdfeamd,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  --OBCL_14.4_LS_Expense_Fee Changes Starts                    
  FUNCTION Fn_Dflt_Fee(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_Lbdfeamd         IN Lbpks_Lbdfeamd_Main.Ty_Lbdfeamd,
                       p_Wrk_Lbdfeamd     IN OUT Lbpks_Lbdfeamd_Main.Ty_Lbdfeamd,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Sys_Upload_Db(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_Lbdfeamd         IN Lbpks_Lbdfeamd_Main.Ty_Lbdfeamd,
                            p_Prev_Lbdfeamd    IN Lbpks_Lbdfeamd_Main.Ty_Lbdfeamd,
                            p_Wrk_Lbdfeamd     IN OUT Lbpks_Lbdfeamd_Main.Ty_Lbdfeamd,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --OBCL_14.4_LS_Expense_Fee Changes Ends
  FUNCTION Fn_Ol_Retain_Upd(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_Lbdfeamd         IN Lbpks_Lbdfeamd_Main.Ty_Lbdfeamd,
                            p_Wrk_Lbdfeamd     IN OUT Lbpks_Lbdfeamd_Main.Ty_Lbdfeamd,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Fire_Fee_Events(p_Source           IN VARCHAR2,
                              p_Source_Operation IN VARCHAR2,
                              p_Function_Id      IN VARCHAR2,
                              p_Action_Code      IN VARCHAR2,
                              p_Wrk_Lbdfeamd     IN Lbpks_Lbdfeamd_Main.Ty_Lbdfeamd,
                              p_Err_Code         IN OUT VARCHAR2,
                              p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Auto_Auth_Validations(p_Source           IN VARCHAR2,
                                    p_Source_Operation IN VARCHAR2,
                                    p_Function_Id      IN VARCHAR2,
                                    p_Action_Code      IN VARCHAR2,
                                    p_Wrk_Lbdfeamd     IN Lbpks_Lbdfeamd_Main.Ty_Lbdfeamd,
                                    p_Err_Code         IN OUT VARCHAR2,
                                    p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Delete(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_Child_Function   IN VARCHAR2,
                     p_Lbdfeamd         IN Lbpks_Lbdfeamd_Main.Ty_Lbdfeamd,
                     p_Wrk_Lbdfeamd     IN OUT Lbpks_Lbdfeamd_Main.Ty_Lbdfeamd,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Pfee_Validations(p_Source       IN VARCHAR2,
                               p_Function_Id  IN VARCHAR2,
                               p_Action_Code  IN VARCHAR2,
                               p_Wrk_Lbdfeamd IN OUT Lbpks_Lbdfeamd_Main.Ty_Lbdfeamd,
                               p_Err_Code     IN OUT VARCHAR2,
                               p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Fas91_Validations(p_Source       IN Cotms_Source.Source_Code%TYPE,
                                p_Function_Id  IN VARCHAR2,
                                p_Action_Code  IN VARCHAR2,
                                p_Wrk_Lbdfeamd IN OUT Lbpks_Lbdfeamd_Main.Ty_Lbdfeamd,
                                p_Err_Code     IN OUT VARCHAR2,
                                p_Err_Params   IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Ratio_Validations(p_Source       IN Cotms_Source.Source_Code%TYPE,
                                p_Function_Id  IN VARCHAR2,
                                p_Action_Code  IN VARCHAR2,
                                p_Wrk_Lbdfeamd IN OUT Lbpks_Lbdfeamd_Main.Ty_Lbdfeamd,
                                p_Err_Code     IN OUT VARCHAR2,
                                p_Err_Params   IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Pfee_Upload_Db(p_Source           IN VARCHAR2,
                             p_Source_Operation IN VARCHAR2,
                             p_Function_Id      IN VARCHAR2,
                             p_Action_Code      IN VARCHAR2,
                             p_Child_Function   IN VARCHAR2,
                             p_Multi_Trip_Id    IN VARCHAR2,
                             p_Lbdfeamd         IN Lbpks_Lbdfeamd_Main.Ty_Lbdfeamd,
                             p_Prev_Lbdfeamd    IN Lbpks_Lbdfeamd_Main.Ty_Lbdfeamd,
                             p_Wrk_Lbdfeamd     IN OUT Lbpks_Lbdfeamd_Main.Ty_Lbdfeamd,
                             p_Err_Code         IN OUT VARCHAR2,
                             p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Fas91_Upload_Db(p_Source           IN VARCHAR2,
                              p_Source_Operation IN VARCHAR2,
                              p_Function_Id      IN VARCHAR2,
                              p_Action_Code      IN VARCHAR2,
                              p_Child_Function   IN VARCHAR2,
                              p_Multi_Trip_Id    IN VARCHAR2,
                              p_Lbdfeamd         IN Lbpks_Lbdfeamd_Main.Ty_Lbdfeamd,
                              p_Prev_Lbdfeamd    IN Lbpks_Lbdfeamd_Main.Ty_Lbdfeamd,
                              p_Wrk_Lbdfeamd     IN OUT Lbpks_Lbdfeamd_Main.Ty_Lbdfeamd,
                              p_Err_Code         IN OUT VARCHAR2,
                              p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Ratio_Upload_Db(p_Source           IN VARCHAR2,
                              p_Source_Operation IN VARCHAR2,
                              p_Function_Id      IN VARCHAR2,
                              p_Action_Code      IN VARCHAR2,
                              p_Child_Function   IN VARCHAR2,
                              p_Multi_Trip_Id    IN VARCHAR2,
                              p_Lbdfeamd         IN Lbpks_Lbdfeamd_Main.Ty_Lbdfeamd,
                              p_Prev_Lbdfeamd    IN Lbpks_Lbdfeamd_Main.Ty_Lbdfeamd,
                              p_Wrk_Lbdfeamd     IN OUT Lbpks_Lbdfeamd_Main.Ty_Lbdfeamd,
                              p_Err_Code         IN OUT VARCHAR2,
                              p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Pfee_Post_Query(p_Source           IN VARCHAR2,
                              p_Source_Operation IN VARCHAR2,
                              p_Function_Id      IN VARCHAR2,
                              p_Action_Code      IN VARCHAR2,
                              p_Child_Function   IN VARCHAR2,
                              p_Full_Data        IN VARCHAR2 DEFAULT 'Y',
                              p_With_Lock        IN VARCHAR2 DEFAULT 'N',
                              p_Qrydata_Reqd     IN VARCHAR2,
                              p_Lbdfeamd         IN Lbpks_Lbdfeamd_Main.Ty_Lbdfeamd,
                              p_Wrk_Lbdfeamd     IN OUT Lbpks_Lbdfeamd_Main.Ty_Lbdfeamd,
                              p_Err_Code         IN OUT VARCHAR2,
                              p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Fas91_Post_Query(p_Source           IN VARCHAR2,
                               p_Source_Operation IN VARCHAR2,
                               p_Function_Id      IN VARCHAR2,
                               p_Action_Code      IN VARCHAR2,
                               p_Child_Function   IN VARCHAR2,
                               p_Full_Data        IN VARCHAR2 DEFAULT 'Y',
                               p_With_Lock        IN VARCHAR2 DEFAULT 'N',
                               p_Qrydata_Reqd     IN VARCHAR2,
                               p_Lbdfeamd         IN Lbpks_Lbdfeamd_Main.Ty_Lbdfeamd,
                               p_Wrk_Lbdfeamd     IN OUT Lbpks_Lbdfeamd_Main.Ty_Lbdfeamd,
                               p_Err_Code         IN OUT VARCHAR2,
                               p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Ratio_Post_Query(p_Source           IN VARCHAR2,
                               p_Source_Operation IN VARCHAR2,
                               p_Function_Id      IN VARCHAR2,
                               p_Action_Code      IN VARCHAR2,
                               p_Child_Function   IN VARCHAR2,
                               p_Full_Data        IN VARCHAR2 DEFAULT 'Y',
                               p_With_Lock        IN VARCHAR2 DEFAULT 'N',
                               p_Qrydata_Reqd     IN VARCHAR2,
                               p_Lbdfeamd         IN Lbpks_Lbdfeamd_Main.Ty_Lbdfeamd,
                               p_Wrk_Lbdfeamd     IN OUT Lbpks_Lbdfeamd_Main.Ty_Lbdfeamd,
                               p_Err_Code         IN OUT VARCHAR2,
                               p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --OBCL_14.7_RABO_#36772442 Changes Starts
  FUNCTION Fn_Ratio_Query(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_Lbdfeamd         IN Lbpks_Lbdfeamd_Main.Ty_Lbdfeamd,
                          p_Wrk_Lbdfeamd     IN OUT Lbpks_Lbdfeamd_Main.Ty_Lbdfeamd,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  --OBCL_14.7_RABO_#36772442 Changes Ends
END Lbpks_Lbdfeamd_Utils;
/
CREATE OR REPLACE Synonym Lbpkss_Lbdfeamd_Utils FOR Lbpks_Lbdfeamd_Utils
/