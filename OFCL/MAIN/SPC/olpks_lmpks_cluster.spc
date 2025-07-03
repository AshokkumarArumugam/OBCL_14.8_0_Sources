CREATE OR REPLACE PACKAGE olpks_lmpks_cluster AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_lmpks_cluster.spc
  **
  ** Module     : Oracle Lending
  **
  ** This source is part of the Oracle FLEXCUBE Software Product.
  ** Copyright (R) 2008,2016 , Oracle and/or its affiliates.  All rights reserved
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
  Search string		 : OFCL_12.3.0.0.0 Changes
  Changed By         : Mohan S
  Change Description : Changed elpks type reference to sypkss_utils

    **SFR Number         : 26336486 
  **Changed By         : dhananjaya T
  **Change Description : Hooks to do ELCM call as part of VAMB
  **Search String      : Bug#26336486 
  
   **Changed By         : Abhinav Kumar
   **Date               : 21-Nov-2024
   **Change Description : Provided Hooks for Fn_Log_Sync_Links/Fn_Log_Async_Links functions cluster and custom elements
   **Search String      : Bug#37241581
  
  -------------------------------------------------------------------------------------------------------
  */

  --Bug#26336486 added pre and post calls insted of direct function call
  
  FUNCTION fn_call_Pre_elcm_utilization(p_function_id    IN OUT VARCHAR2,
                                    p_action         IN OUT VARCHAR2,
                                    p_event          IN OUT VARCHAR2,
                                    p_esn            IN OUT NUMBER,
                                    P_limit_tracking IN OUT VARCHAR2,
                                    p_util_type      IN OUT sypkss_utils.ty_utils,--OFCL_12.3.0.0.0 Changes
                                    p_err_code       IN OUT VARCHAR2,
                                    p_error_params   IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_call_Post_elcm_utilization(p_function_id    IN OUT VARCHAR2,
                                    p_action         IN OUT VARCHAR2,
                                    p_event          IN OUT VARCHAR2,
                                    p_esn            IN OUT NUMBER,
                                    P_limit_tracking IN OUT VARCHAR2,
                                    p_util_type      IN OUT sypkss_utils.ty_utils,--OFCL_12.3.0.0.0 Changes
                                    p_err_code       IN OUT VARCHAR2,
                                    p_error_params   IN OUT VARCHAR2)
    RETURN BOOLEAN;	
    
  --Bug#37241581 Changes Starts
  FUNCTION Fn_Pre_Log_Async_Links(p_Ref            IN VARCHAR2,
                              p_Brn            IN VARCHAR2,
                              p_Ext_Sys        IN VARCHAR2,
                              p_Utils_Log      IN OUT Oltb_Limit_Utils_Log%ROWTYPE,
                              p_Err_Code       IN OUT VARCHAR2,
                              p_Err_Params     IN OUT VARCHAR2,
                              p_Elcm_Call_Type IN VARCHAR2,
                              p_Function_Id    IN VARCHAR2)
   RETURN BOOLEAN;

  FUNCTION Fn_Post_Log_Async_Links(p_Ref            IN VARCHAR2,
                              p_Brn            IN VARCHAR2,
                              p_Ext_Sys        IN VARCHAR2,
                              p_Utils_Log      IN OUT Oltb_Limit_Utils_Log%ROWTYPE,
                              p_Err_Code       IN OUT VARCHAR2,
                              p_Err_Params     IN OUT VARCHAR2,
                              p_Elcm_Call_Type IN VARCHAR2,
                              p_Function_Id    IN VARCHAR2)
   RETURN BOOLEAN;

  FUNCTION Fn_Pre_Log_Sync_Links(p_Ref            IN VARCHAR2,
                             p_Brn            IN VARCHAR2,
                             p_Batch          IN VARCHAR2,
                             p_Ext_Sys        IN VARCHAR2,
                             p_Utils_Log      IN OUT Oltb_Limit_Utils_Log%ROWTYPE,
                             p_Err_Code       IN OUT VARCHAR2,
                             p_Err_Params     IN OUT VARCHAR2,
                             p_Elcm_Call_Type IN VARCHAR2)
   RETURN BOOLEAN;

  FUNCTION Fn_Post_Log_Sync_Links(p_Ref            IN VARCHAR2,
                             p_Brn            IN VARCHAR2,
                             p_Batch          IN VARCHAR2,
                             p_Ext_Sys        IN VARCHAR2,
                             p_Utils_Log      IN OUT Oltb_Limit_Utils_Log%ROWTYPE,
                             p_Err_Code       IN OUT VARCHAR2,
                             p_Err_Params     IN OUT VARCHAR2,
                             p_Elcm_Call_Type IN VARCHAR2)
   RETURN BOOLEAN;
  --Bug#37241581 Changes Ends
END olpks_lmpks_cluster;
/
