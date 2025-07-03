CREATE OR REPLACE PACKAGE Cspks_Req_Global_Wrapper AS

  /*-----------------------------------------------------------------------------------------------------
      **
      ** File Name  : cspks_req_global_wrapper.sql
      **
      ** Module     : Core
      **
      ** This source is part of the Oracle FLEXCUBE Universal Banking Software Product
      ** Copyright © 2008 - 2020  Oracle and/or its affiliates.  All rights reserved.
      **                                              
      ** No part of this work may be reproduced, stored in a retrieval system,
      ** adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise,
      ** translated in any language or computer language,
      ** without the prior written permission of Oracle and/or its affiliates.
      **
      **
      ** Oracle Financial Services Software Limited.
      ** Oracle Park, Off Western Express Highway,
      ** Goregaon (East),
      ** Mumbai - 400 063, India.
    **
    ** Change History
    **
    ** Changed by    : Vinutha Kini
    ** Changed on    : 26-July-2016
    ** Description   : Core clean up for 12.3Payments
    ** Search String : Standalone12.3 CleanUp
    
    ** Changed by    : Shishira Shetty
    ** Changed on    : 14-Sep-2017
    ** Description   : Additional OUT parameter p_extintegration_key added to send MsgID to INFRA layer.
    ** Search String : ELCM_Integration Changes
      
  **    Modified By            : Hemalatha N
  **    Modified On            : 05-April-2019
  **    Modified Reason        : procedure pr_delete_duplicate_errors exposed to SPC to be called from other objects
  **    Search String      : JCROFC_Minicore_Integration_Remediation_Fix
  
        **Changed By         : Pallavi R
        **Date               : 17-Nov-2021
        **Change Description : System is throwing response empty while using ertb_suppressed_err_codes function. 
        **Search String      : OBCL_14.5_Supp_#33560767 Changes    
      -------------------------------------------------------------------------------------------------------
    */
  /*PROCEDURE Pr_Process_Request(p_user           IN SMTB_USER.User_Id%TYPE,
  p_branch         IN STTM_BRANCH.Branch_Code%TYPE,
  p_request        IN CLOB,
  p_header_names   IN OUT VARCHAR2,
  p_header_vals    IN OUT VARCHAR2,
  p_addl_names     IN OUT VARCHAR2,
  p_addl_vals      IN OUT VARCHAR2,
  p_parents_list   IN OUT VARCHAR2,
  p_parents_format IN OUT VARCHAR2,
  p_tag_name       IN OUT CLOB,
  p_tag_values     IN OUT CLOB,
  p_response       IN OUT CLOB); */
  /* BPEL Changes STart Here*/
  /*PROCEDURE Pr_Process_RequestJ(p_user              IN SMTB_USER.User_Id%TYPE,
  p_branch            IN STTM_BRANCH.Branch_Code%TYPE,
  p_header_names      IN OUT VARCHAR2,
  p_header_vals       IN OUT VARCHAR2,
  p_addl_names        IN OUT VARCHAR2,
  p_addl_vals         IN OUT VARCHAR2,
  p_parents_name_list IN OUT CHARARRAYTYP_TY,
  p_parents_fmt_list  IN OUT CHARARRAYTYP_TY,
  p_tag_name_list     IN OUT CHARARRAYTYP_TY,
  p_tag_values_list   IN OUT CHARARRAYTYP_TY,
  p_error_nodes       IN OUT VARCHAR2,
  p_status            IN OUT VARCHAR2,
  p_extsys_msg        IN OUT NOCOPY CLOB,
  p_timelog           IN OUT VARCHAR2,
  p_db_log            OUT    CLOB);*/

  PROCEDURE Pr_Process_Request_Bpel(p_User               IN Smtb_User.User_Id%TYPE,
                                    p_Branch             IN Sttm_Core_Branch.Branch_Code%TYPE, --Standalone12.3 Changes
                                    p_Header_Names       IN OUT VARCHAR2,
                                    p_Header_Vals        IN OUT VARCHAR2,
                                    p_Addl_Names         IN OUT VARCHAR2,
                                    p_Addl_Vals          IN OUT VARCHAR2,
                                    p_Parents_Name_List  IN OUT Chararraytyp_Ty,
                                    p_Parents_Fmt_List   IN OUT Chararraytyp_Ty,
                                    p_Tag_Name_List      IN OUT Chararraytyp_Ty,
                                    p_Tag_Values_List    IN OUT Chararraytyp_Ty,
                                    p_Masterfunc_Id      IN OUT Chararraytyp_Ty,
                                    p_Action_Code        IN OUT Chararraytyp_Ty,
                                    p_Error_Nodes        IN OUT VARCHAR2,
                                    p_Status             IN OUT VARCHAR2,
                                    p_Extsys_Msg         IN OUT NOCOPY CLOB,
                                    p_Timelog            IN OUT VARCHAR2,
                                    p_Db_Log             OUT VARCHAR2, --21430826
                                    p_Attachment         OUT VARCHAR2,
                                    p_Extintegration_Key IN OUT VARCHAR2);
  /*BPEL CHanges Ends Here */

  PROCEDURE Pr_Process_Requestj(p_User               IN Smtb_User.User_Id%TYPE,
                                p_Branch             IN Sttm_Core_Branch.Branch_Code%TYPE, --Standalone12.3 Changes
                                p_Header_Names       IN OUT VARCHAR2,
                                p_Header_Vals        IN OUT VARCHAR2,
                                p_Addl_Names         IN OUT VARCHAR2,
                                p_Addl_Vals          IN OUT VARCHAR2,
                                p_Parents_Name_List  IN OUT Chararraytyp_Ty,
                                p_Parents_Fmt_List   IN OUT Chararraytyp_Ty,
                                p_Tag_Name_List      IN OUT Chararraytyp_Ty,
                                p_Tag_Values_List    IN OUT Chararraytyp_Ty,
                                p_Error_Nodes        IN OUT VARCHAR2,
                                p_Status             IN OUT VARCHAR2,
                                p_Extsys_Msg         IN OUT NOCOPY CLOB,
                                p_Timelog            IN OUT VARCHAR2,
                                p_Db_Log             OUT VARCHAR2, ----21430826 
                                p_Attachment         OUT VARCHAR2,
                                p_Req_Xml            IN CLOB, -- 25062166 :: ADDED P_REQ_XML
                                p_Extintegration_Key IN OUT VARCHAR2);

  --FCUBS14.0_PricingIntegration_28020090
  PROCEDURE Pr_Process_Requestj(p_User               IN Smtb_User.User_Id%TYPE,
                                p_Branch             IN Sttm_Core_Branch.Branch_Code%TYPE, --Standalone12.3 Changes
                                p_Header_Names       IN OUT VARCHAR2,
                                p_Header_Vals        IN OUT VARCHAR2,
                                p_Addl_Names         IN OUT VARCHAR2,
                                p_Addl_Vals          IN OUT VARCHAR2,
                                p_Parents_Name_List  IN OUT Chararraytyp_Ty,
                                p_Parents_Fmt_List   IN OUT Chararraytyp_Ty,
                                p_Tag_Name_List      IN OUT Chararraytyp_Ty,
                                p_Tag_Values_List    IN OUT Chararraytyp_Ty,
                                p_Error_Nodes        IN OUT VARCHAR2,
                                p_Status             IN OUT VARCHAR2,
                                p_Extsys_Msg         IN OUT NOCOPY CLOB,
                                p_Timelog            IN OUT VARCHAR2,
                                p_Db_Log             OUT VARCHAR2, ----21430826 
                                p_Attachment         OUT VARCHAR2,
                                p_Req_Xml            IN CLOB, -- 25062166 :: ADDED P_REQ_XML
                                p_Extintegration_Key IN OUT VARCHAR2,
                                p_Pricing_Req_Xml    IN OUT NOCOPY CLOB);
  --FCUBS14.0_PricingIntegration_28020090

  PROCEDURE Pr_Udf_Pickup(p_User                  IN Smtb_User.User_Id%TYPE,
                          p_Branch                IN Sttm_Core_Branch.Branch_Code%TYPE, --Standalone12.3 Changes
                          p_Function_Id           IN VARCHAR2,
                          p_Rec_Key               IN VARCHAR2,
                          p_Udf_Field_Name        OUT VARCHAR2,
                          p_Udf_Field_Value       OUT VARCHAR2,
                          p_Udf_Data_Type         OUT VARCHAR2,
                          p_Udf_Val_Type          OUT VARCHAR2,
                          p_Udf_Field_Description OUT VARCHAR2,
                          p_Udf_Mandatory         OUT VARCHAR2,
                          p_Udf_Field_Val_Desc    OUT VARCHAR2);
  PROCEDURE Pr_Process_Maint_Call(p_User               IN Smtb_User.User_Id%TYPE,
                                  p_Branch             IN Sttm_Core_Branch.Branch_Code%TYPE, --Standalone12.3 Changes
                                  p_Header_Names       IN OUT VARCHAR2,
                                  p_Header_Vals        IN OUT VARCHAR2,
                                  p_Addl_Names         IN OUT VARCHAR2,
                                  p_Addl_Vals          IN OUT VARCHAR2,
                                  p_Parents_Name_List  IN OUT Chararraytyp_Ty,
                                  p_Parents_Fmt_List   IN OUT Chararraytyp_Ty,
                                  p_Tag_Name_List      IN OUT Chararraytyp_Ty,
                                  p_Tag_Values_List    IN OUT Chararraytyp_Ty,
                                  p_Error_Nodes        IN OUT VARCHAR2,
                                  p_Status             IN OUT VARCHAR2,
                                  p_Extsys_Msg         IN OUT NOCOPY CLOB,
                                  p_Timelog            IN OUT VARCHAR2,
                                  p_Db_Log             OUT VARCHAR2, --21430826 
                                  p_Attachment         OUT VARCHAR2,
                                  p_Req_Xml            IN CLOB, -- vrishti added.
                                  p_Extintegration_Key IN OUT VARCHAR2);

  --FCUBS14.0_PricingIntegration_28020090 start                 
  PROCEDURE Pr_Process_Maint_Call(p_User               IN Smtb_User.User_Id%TYPE,
                                  p_Branch             IN Sttm_Core_Branch.Branch_Code%TYPE, --Standalone12.3 Changes
                                  p_Header_Names       IN OUT VARCHAR2,
                                  p_Header_Vals        IN OUT VARCHAR2,
                                  p_Addl_Names         IN OUT VARCHAR2,
                                  p_Addl_Vals          IN OUT VARCHAR2,
                                  p_Parents_Name_List  IN OUT Chararraytyp_Ty,
                                  p_Parents_Fmt_List   IN OUT Chararraytyp_Ty,
                                  p_Tag_Name_List      IN OUT Chararraytyp_Ty,
                                  p_Tag_Values_List    IN OUT Chararraytyp_Ty,
                                  p_Error_Nodes        IN OUT VARCHAR2,
                                  p_Status             IN OUT VARCHAR2,
                                  p_Extsys_Msg         IN OUT NOCOPY CLOB,
                                  p_Timelog            IN OUT VARCHAR2,
                                  p_Db_Log             OUT VARCHAR2, --21430826 
                                  p_Attachment         OUT VARCHAR2,
                                  p_Req_Xml            IN CLOB, -- vrishti added.
                                  p_Extintegration_Key IN OUT VARCHAR2,
                                  p_Pricing_Req_Xml    IN OUT NOCOPY CLOB);
  --FCUBS14.0_PricingIntegration_28020090 end

  PROCEDURE Pr_Compare_Msgs(p_Function_Id IN VARCHAR2,
                            p_Prev_Msg    IN CLOB,
                            p_Curr_Msg    IN CLOB,
                            p_Final_Msg   OUT CLOB,
                            p_Err_Code    IN OUT VARCHAR2,
                            p_Err_Params  IN OUT VARCHAR2,
                            p_Db_Log      OUT CLOB,
                            p_Action_Code IN VARCHAR2,
                            p_Source      IN VARCHAR2); -- sangeeta chANGES

  PROCEDURE Pr_Get_Dblog(p_Db_Log OUT CLOB); ----shruti changes
  PROCEDURE Pr_Strt_Processtime(p_Starttime IN OUT NUMBER); --Non extensible gateway changes
  PROCEDURE Pr_Cal_Processtime(p_Starttime   IN NUMBER,
                               p_End_Time    OUT NUMBER,
                               p_Dbsessionid OUT NUMBER); --Non extensible gateway changes
  /*FUNCTION fn_set_session_debug_trace(p_user         IN VARCHAR2,
  p_source       IN VARCHAR2,
  p_function_id  IN VARCHAR2,
  p_action       IN VARCHAR2,
  p_msg_id       IN VARCHAR2,
  p_service      IN VARCHAR2,
  p_debug_mode   IN VARCHAR2,
  p_log_enabled  IN OUT SMTB_SMSACTION_USERLEVELDEBUGS.DEBUGLOG_ENABLED%TYPE,
  p_trc_enabled  IN OUT SMTB_SMSACTION_USERLEVELDEBUGS.Dbtrace_Enabled%TYPE) RETURN BOOLEAN; */

  --Standalone12.3 CleanUp Start                    
  FUNCTION Fn_Pickup_Udf(p_User                  IN Smtb_User.User_Id%TYPE,
                         p_Branch                IN Sttm_Core_Branch.Branch_Code%TYPE, --Standalone12.3 Changes
                         p_Function_Id           IN VARCHAR2,
                         p_Rec_Key               IN VARCHAR2,
                         p_Udf_Field_Name        OUT VARCHAR2,
                         p_Udf_Field_Value       OUT VARCHAR2,
                         p_Udf_Data_Type         OUT VARCHAR2,
                         p_Udf_Val_Type          OUT VARCHAR2,
                         p_Udf_Field_Description OUT VARCHAR2,
                         p_Udf_Mandatory         OUT VARCHAR2,
                         p_Udf_Field_Val_Desc    OUT VARCHAR2) RETURN BOOLEAN;
  --Standalone12.3 CleanUp End             
  PROCEDURE Pr_Delete_Duplicate_Errors; --JCROFC_Minicore_Integration_Remediation_Fix
  FUNCTION Fn_Suppress_Err_Code RETURN BOOLEAN; --OBCL_14.5_Supp_#33560767 Changes    
END Cspks_Req_Global_Wrapper;
/