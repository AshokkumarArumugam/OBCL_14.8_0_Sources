CREATE OR REPLACE PACKAGE Olpks_Olcondet_Utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_olcondet_utils.spc
  **
  ** Module     : IS
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
  
  Changed By         : Pallavi R
  Changes On         : 02-Apr-2018
  Change Description : Multiple(Splilt) Settlements are introduced
  Search  String     : OBCL_14.1_Split_stl Changes   
  
  Changed By         : Ashokkumar Arumugam
  Changes On         : 28-SEP-2018
  Change Description : Added code to restrict the multiple split settlement amendment for OLDVAMND and OLDPMNT
  Search  String     : OBCL_14.2_28532051_Changes
   
   **Changed By         : MOHAN PAL
   **Date               : 13-AUG-2021
   **Change Description : 14.5_SUPPORT_Bug#33208534
   **Search String      : 14.5_SUPPORT_Bug#33208534
   
**  Changed By         : Pallavi R
**  Changed On         : 10-Dec-2024
**  Search String      : OBCL_14.7_INTERNAL_#37372661 Changes  
**  Change Reason      : Enabled Split amount for all screen where accouting is happening based on settlements   
  -------------------------------------------------------------------------------------------------------
  */

  TYPE Ty_Char_Tab IS TABLE OF VARCHAR2(255) INDEX BY BINARY_INTEGER;
  g_Msg_Tab Ty_Char_Tab;
  g_action_code   VARCHAR2(20);---14.5_SUPPORT_Bug#33208534

  TYPE Ty_Setl_Rec IS RECORD(
    Amount_Tag VARCHAR2(20),
 Account VARCHAR2(40));
  TYPE Ty_Setl_Table IS TABLE OF Ty_Setl_Rec INDEX BY BINARY_INTEGER;
  g_Setl_Table Ty_Setl_Table;
  g_Module     Oltbs_Contract.Module_Code%TYPE;
  --OBCL_14.1_Split_stl Changes Starts
  g_Simulation_Action_Code     VARCHAR2(20); --OBCL_14.7_INTERNAL_#37372661 Changes  
  FUNCTION Fn_Post_Pickup(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_Main_Function    IN VARCHAR2,
                          p_Child_Function   IN VARCHAR2,
                          p_Key_Tags_Vals    IN OUT VARCHAR2,
                          p_Qrydata_Reqd     IN VARCHAR2,
                          p_Olcondet         IN Olpks_Olcondet_Main.Ty_Olcondet,
                          p_Wrk_Olcondet     IN OUT Olpks_Olcondet_Main.Ty_Olcondet,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Dflt_Oth_Tabs(p_Source       IN VARCHAR2,
                            p_Action_Code  IN VARCHAR2,
                            p_Function_Id  IN VARCHAR2,
                            p_Product      IN VARCHAR2,
                            p_Module       IN VARCHAR2,
                            p_Comp         IN VARCHAR2,
                            p_Wrk_Olcondet IN OUT Olpks_Olcondet_Main.Ty_Olcondet,
                            p_Err_Code     IN OUT VARCHAR2,
                            p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;						  
  --OBCL_14.1_Split_stl Changes Ends
  FUNCTION Fn_Validate(p_Source       IN Cotms_Source.Source_Code%TYPE,
                       p_Module       IN VARCHAR2,
                       p_Action_Code  IN VARCHAR2,
                       p_Function_Id  IN VARCHAR2,
                       p_Product_Code IN VARCHAR2,
                       p_Fcc_Ref      IN VARCHAR2,
                       p_Event_Seq_No IN VARCHAR2,
                       p_Wrk_Olcondet IN OUT Olpks_Olcondet_Main.Ty_Olcondet,
                       p_Err_Code     IN OUT VARCHAR2,
                       p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Upload_Db(p_Source       IN Cotms_Source.Source_Code%TYPE,
                        p_Module       IN VARCHAR2,
                        p_Action_Code  IN VARCHAR2,
                        p_Function_Id  IN VARCHAR2,
                        p_Product_Code IN VARCHAR2,
                        p_Fcc_Ref      IN VARCHAR2,
                        p_Event_Seq_No IN VARCHAR2,
                        p_Wrk_Olcondet IN OUT Olpks_Olcondet_Main.Ty_Olcondet,
                        p_Err_Code     IN OUT VARCHAR2,
                        p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;
    /* OBCL_14.2_28532051_Changes :: Starts */
    FUNCTION Fn_Validate_Split_Ratio(p_Source           IN VARCHAR2,
                                     p_Source_Operation IN VARCHAR2,
                                     p_Function_Id      IN VARCHAR2,
                                     p_Action_Code      IN VARCHAR2,
                                     p_Main_Function    IN VARCHAR2,
                                     p_Child_Function   IN VARCHAR2,
                                     p_Olcondet         IN Olpks_Olcondet_Main.Ty_Olcondet,
                                     p_Prev_Olcondet    IN OUT Olpks_Olcondet_Main.Ty_Olcondet,
                                     p_Wrk_Olcondet     IN OUT Olpks_Olcondet_Main.Ty_Olcondet,
                                     p_Err_Code         IN OUT VARCHAR2,
                                     p_Err_Params       IN OUT VARCHAR2)
      RETURN BOOLEAN;
    /* OBCL_14.2_28532051_Changes :: Ends */
END Olpks_Olcondet_Utils;
/
CREATE OR REPLACE Synonym Olpkss_Olcondet_Utils FOR Olpks_Olcondet_Utils
/