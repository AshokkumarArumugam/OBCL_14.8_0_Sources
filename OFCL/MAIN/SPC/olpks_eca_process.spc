CREATE OR REPLACE PACKAGE Olpks_Eca_Process AS
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_eca_process.SPC
  **
  ** Module    : OL
  **
    This source is part of the Oracle Banking Corporate Lending  Software Product.
    Copyright Â© 2019 , Oracle and/or its affiliates.  All rights reserved.
    No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or     otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.
  
    Oracle Financial Services Software Limited.
    Oracle Park, Off Western Express Highway,
    Goregaon (East),
    Mumbai - 400 063, India.
  ------------------------------CHANGE HISTORY--------------------------------------------------------
  
  Changed By          :
  Change Description  :
  Search Tag          :
  Change Date         :
  
  Changed By          : Abhik Das
  Changes On         :  02-Aug-2022
  Change Description  : Added code for calling pragma delete eca from java
  Search Tag          : OBCL_14.5_Support_Bug#34361213_Changes
  
  **Changed By         : Sowmya Bitra
  **Date               : 28-April-2023
  **Change Description : Added UI field to display ECA status
  **Search String      : OBCL_14.8_ECA_Changes
  
  **Changed By         : Sowmya Bitra
  **Date               : 28-July-2023
  **Change Description : Changes made to process ECA request for disbursement and vami reversal
  **Search String      : Bug#35615828
  
  **  Changed By         : Vineeth T M
  **  Changed On         : 31-Jul-2023
  **  Change Description : enabling eca for all components - charge related changes for rollover/reprice
  **  Search String      : OBCL_14.8_ECA_1_Changes
  
  **  Changed By         : Vineeth T M
  **  Changed On         : 28-Nov-2023
  **  Change Description : Moved auth validations related to ECA to common package and call it from each screen
  **  Search String      : Bug#36024690 changes
  
  **  Changed By         : Vineeth T M
  **  Changed On         : 05-Jan-2023
  **  Change Description : Added new function to mark eca as processed
  **  Search String      : Bug#36066803 changes
  
  **  Modified By     : Jayaram N
  **  Modified On     : 01-Jul-2024
  **  Modified Reason : VERIFY FUNDS OPTION TO BE ENABLED AT COMPONENT LEVEL FOR BILATERAL AND SYNDICATION CONTRACTS 
  **  Search String   : Bug#36787741
  
  **  Modified By     : Jayaram N
  **  Modified On     : 13-Sep-2024
  **  Modified Reason : ECA CHECK TO BE ENABLED AT COMPONENT LEVEL DURING PRODUCT CREATION
  **  Search String   : Bug#37055028
  
  Changed By         : Sowmya Bitra
  Date               : 17-Dec-2024
  Change Description : Sync ECA changes for auto auth
  Search String      : Bug#37386734 
  ------------------------------------------------------------------------------------------------------
  */
  g_Eca_Process VARCHAR2(32767) := 'C'; --C-Create;D-Delete;
  --Bug#37386734 Changes Start
  g_eca_auto_auth VARCHAR2(1) := 'N'; 
  g_eca_auth_contract Oltbs_Contract.Contract_Ref_No%TYPE;
  g_eca_auth_Source        VARCHAR2(50);
  g_eca_auth_Source_Operation VARCHAR2(50);
  g_eca_auth_Function_Id   VARCHAR2(50);
  --Bug#37386734 Changes End
  TYPE Ty_Tb_Oltb_Eca_Req_Master IS TABLE OF Oltbs_Eca_Req_Master%ROWTYPE INDEX BY BINARY_INTEGER;
  TYPE Ty_Tb_Oltb_Eca_Req_Detail IS TABLE OF Oltbs_Eca_Req_Detail%ROWTYPE INDEX BY BINARY_INTEGER;

  TYPE Ty_Eca_Queue IS RECORD(
    Eca_Queue         Ty_Tb_Oltb_Eca_Req_Master,
    Eca_Queue_Details Ty_Tb_Oltb_Eca_Req_Detail);
  FUNCTION Fn_Pragma_Insert_Tables(p_Eca_Queue_Rec IN OUT Ty_Eca_Queue)
    RETURN BOOLEAN;
  FUNCTION Fn_Insert_Tables(p_Eca_Queue_Rec IN OUT Ty_Eca_Queue)
    RETURN BOOLEAN;
  FUNCTION Fn_Delete_Eca(p_Fccref     IN VARCHAR2,
                         p_Esn        IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                         p_Err_Code   IN OUT VARCHAR2,
                         p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Pragma_Delete_Eca(p_Ref        IN VARCHAR2,
                                p_Err_Code   IN OUT VARCHAR2,
                                p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;
  ---OBCL_14.5_Support_Bug#34361213_Changes Starts---
  FUNCTION Fn_Pragma_Delete_Eca_Wrapper(p_Contract_Ref_No   IN VARCHAR2,
                                        p_Processing_Date   Date,										
										p_Err_Code          IN OUT VARCHAR2,
										p_Err_Params        IN OUT VARCHAR2) RETURN VARCHAR2;
  FUNCTION Fn_Pragma_Delete_Eca_Wrapper(p_Ref        IN VARCHAR2,
                                        p_Err_Code   IN OUT VARCHAR2,
                                        p_Err_Params IN OUT VARCHAR2) RETURN VARCHAR2;
  ----OBCL_14.5_Support_Bug#34361213_Changes Ends----
  --OBCL_14.8_ECA_Changes Start
  FUNCTION Fn_Get_Eca_Status(p_Source          IN VARCHAR2,
                             p_Function_Id     IN VARCHAR2,
                             p_Contract_Ref_No IN  Oltbs_Contract.Contract_Ref_No%TYPE,
                             p_Eca_Status      OUT VARCHAR2,
                             p_Err_Code        IN OUT VARCHAR2,
                             p_Err_Params      IN OUT VARCHAR2) 
  RETURN BOOLEAN;
  FUNCTION Fn_Net_Eca(p_Contract_Ref_No IN  Oltbs_Contract.Contract_Ref_No%TYPE,
                      p_Event           IN  Oltbs_Contract_Event_Log.Event_Code%TYPE,
                      p_Err_Code        IN OUT VARCHAR2,
                      p_Err_Params      IN OUT VARCHAR2)
  RETURN BOOLEAN;
  --OBCL_14.8_ECA_Changes End
  --Bug#36024690 changes start
   FUNCTION Fn_Auth_Eca(p_Source          IN VARCHAR2,
                       p_Function_Id     IN VARCHAR2,
                       p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                       p_event_fired     in varchar2,
                       p_Err_Code        IN OUT VARCHAR2,
                       p_Err_Params      IN OUT VARCHAR2) 
   RETURN BOOLEAN;
  --Bug#36024690 changes end
  --Bug#36066803 changes start
  FUNCTION Fn_Mark_Eca_Processed(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                 p_Err_Code        IN OUT VARCHAR2,
                                 p_Err_Params      IN OUT VARCHAR2) 
  RETURN BOOLEAN;
  --Bug#36066803 changes end
  
  --Bug#35615828 Changes Start
  FUNCTION Fn_Eca_For_Reverse(p_Source           IN VARCHAR2,
                              p_Function_Id      IN VARCHAR2,
                              p_Contract_Ref_No  IN Oltbs_Contract.Contract_Ref_No%TYPE,
                              p_Event            IN Oltbs_Contract_Event_Log.Event_Code%TYPE,
                              p_Module_Code      IN Oltbs_Contract.Module_Code%TYPE,
                              p_Value_Date       IN Date,
                              p_Err_Code         IN OUT VARCHAR2,
                              p_Err_Params       IN OUT VARCHAR2)
  RETURN BOOLEAN;
  --Bug#35615828 Changes End
    --OBCL_14.8_ECA_1_Changes start
  g_Child_Eca_Queue_Rec Ty_Eca_Queue;
  FUNCTION Fn_Merge_Eca_Req(p_Eca_Queue_Rec IN out Ty_Eca_Queue)
  RETURN BOOLEAN;
  --OBCL_14.8_ECA_1_Changes end
  
 --Bug#36787741:Changes Starts here
 FUNCTION FN_CHECK_COMP_LEVEL_ECA_REQD( p_Contract_Ref_No IN  Oltbs_Contract.Contract_Ref_No%TYPE,
                                        p_Esn             IN  Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                                        p_amount_tag      IN  Oltb_settlements.Amount_Tag%TYPE,
                                        p_acc_branch      IN  Oltb_settlements.Acc_Branch%TYPE,
                                        P_account_no      IN  Oltb_settlements.Account%TYPE,
                                        p_eca_allowed     OUT Oltb_settlements.Eca_Allowed%TYPE,
                                        p_Err_Code        IN  OUT VARCHAR2,
                                        p_Err_Params      IN  OUT VARCHAR2)
 RETURN BOOLEAN;
 --Bug#36787741:Changes Ends here
 
  --Bug#37055028:Changes Starts here
 FUNCTION FN_CHECK_COMPONENT_ECA ( p_Contract_Ref_No IN  Oltbs_Contract.Contract_Ref_No%TYPE,
                                   p_amount_tag      IN  Oltb_settlements.Amount_Tag%TYPE,
                                   p_product         IN  Oltbs_Contract.Product_Code%TYPE default NULL)
 RETURN VARCHAR2;
  --Bug#37055028:Changes Ends here
  --Bug#37386734 Changes Start
 FUNCTION Fn_Sync_Eca_Auto_Auth(p_msg_id          IN VARCHAR2,
                                p_seq_no          IN VARCHAR2,
                                p_Err_Code        IN OUT VARCHAR2,
                                p_Err_Params      IN OUT VARCHAR2)
 RETURN VARCHAR2;
 --Bug#37386734 Changes End
 
END Olpks_Eca_Process;
/
CREATE OR REPLACE Synonym Olpkss_Eca_Process FOR Olpks_Eca_Process
/