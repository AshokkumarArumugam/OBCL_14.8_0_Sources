CREATE OR REPLACE PACKAGE Cspks_Req_Global AS
  /*------------------------------------------------------------------------------------------
 **
** This source is part of the Oracle FLEXCUBE Software Product.
** Copyright (R) 2016 , Oracle and/or its affiliates.  All rights reserved
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

  ------------------------------------------------------------------------------------------
  */
  /*
  -------------------------------------------------------------------------------------------------------
   CHANGE HISTORY
  
   SFR No                   :Revamped Version
   Changed By               :Radha
   Change Description       :Code Cleaned Up
  
   Modified By            : Abhinav Bhardwaj
   Modified On            : 25-feb-2011
   Modified Reason        : Added g_Final_auth_stat to handle the case of failed authorization (error during auth), in the case of autoauth user.
   Retro Reference        : Retrolist.xls/11.0/FC11.0/IMPSUPP/CITIC/SFR_NO#143
   Search String          : Kernel_11.2_RET_SFR#89
   
   
  
   Modified By            : Shanmugam
   Modified On            : 04-aug-2011
   Modified Reason        : Added attachment data changes for handling attachment data for extensible.    
   Search String          : KERNEL11.3.1_ATTACHMENTS CHANGES
  
   Date                 : 29-Mar-2013
   Updated By           : Sumeet Yajnik
   Release              : FCUBS_12.0.2
   Bug Number           : INTERNAL
   Change Description   : Performance Changes - New Infra routine changes, xml will not be passed , blk name, tag name and value
             will be passed as string
   Search Tag           : FCUBS PERF PROCESS REQ MSG Changes
  
   Date                 : 15-May-2013
   Updated By           : Swathi
   Release              : FCUBS_12.0.2
   Bug Number           : INTERNAL
   Change Description   : Purge Tool Changes
   Search Tag           : Purge Tool Changes
  
   Date                 : 19-Jul-2013
   Updated By           : Vijay Masti
   Release              : FCUBS_12.0.2
   Bug Number           : INTERNAL
   Change Description   : Purge Tool Changes
   Search Tag           : Purge Tool Changes
  
   Date                 : 20-Jul-2013
   Updated By           : Vijay Masti
   Release              : FCUBS_12.0.2
   Bug Number           : INTERNAL
   Change Description   : Removed ; from create synonym command 
   
     Date                 : 4-Feb-2014
     Updated By           : Shen
     Release              : INTERNAL
     Bug Number           : INTERNAL
     Change Description   : Integration Layer Changes..g_extsys_msg is added
     Search String         : FCUBS Integration Layer Changes
	 
     Updated By           : Priyanka vijai
     Date                 : 23-Jan-2017
     Change Description   : code changes are done to avoid errors when namespace is encountered
     Search String        : 25402939
	 
   Date                 : 14-Sep-2017
   Updated By           : Shishira Shetty
   Release              : FCUBS_12.5.0.0.0
   Change Description   : Additional global variable to set Msg ID. Required only in case ELCM is Standalone or Codeployed.
   Search String		: ELCM_Integration Changes
  -------------------------------------------------------------------------------------------------------
  */

  --Declaration of Types
  TYPE Ty_Tb_Record_Data IS TABLE OF VARCHAR2(32767) INDEX BY VARCHAR2(255);
  TYPE Ty_Tb_Table_Data IS TABLE OF Ty_Tb_Record_Data INDEX BY PLS_INTEGER;
  TYPE Ty_Tb_Xml_Data IS TABLE OF Ty_Tb_Table_Data INDEX BY VARCHAR2(255);
  TYPE Ty_Amend_Nodes IS TABLE OF Gwtm_Amend_Nodes%ROWTYPE INDEX BY VARCHAR2(100);
  TYPE Ty_Int_Amend_Nodes IS TABLE OF Gwtm_Amend_Nodes%ROWTYPE INDEX BY BINARY_INTEGER;
  TYPE Ty_Amend_Fields IS TABLE OF Gwtm_Amend_Fields%ROWTYPE INDEX BY VARCHAR2(100);
  TYPE Ty_Int_Amend_Fields IS TABLE OF Gwtm_Amend_Fields%ROWTYPE INDEX BY BINARY_INTEGER;
  TYPE Ty_Addl_Info IS TABLE OF VARCHAR2(32767) INDEX BY VARCHAR2(32767);
  TYPE Ty_Tb_Fld_Log IS TABLE OF Sttb_Field_Log%ROWTYPE INDEX BY PLS_INTEGER;
  TYPE Ty_Tb_Int_Func_Params IS TABLE OF Aetbs_Func_Detail%ROWTYPE INDEX BY PLS_INTEGER;
  TYPE Ty_Tb_Chr_Func_Params IS TABLE OF Aetbs_Func_Detail%ROWTYPE INDEX BY VARCHAR2(100);
  TYPE Ty_Num_Array IS TABLE OF NUMBER INDEX BY PLS_INTEGER;
  TYPE Ty_Vc_Array IS TABLE OF VARCHAR2(32767) INDEX BY PLS_INTEGER;

  --Purge Tool Changes - Definition - Start
  --Type ty_purge_audit_details IS TABLE OF PLS_INTEGER INDEX BY VARCHAR2(100);
  Type ty_purge_exec_filters IS TABLE OF VARCHAR2(32767) INDEX BY VARCHAR2(100);

  TYPE Ty_purge_Audit_Details IS RECORD(
    Rows_Purged  NUMBER,
    Delete_Stmnt CLOB,
    Insert_Stmnt CLOB);

  TYPE ty_tb_purge_audit_details IS TABLE OF Ty_purge_Audit_Details INDEX BY VARCHAR2(100);

  TYPE Ty_purge_Audit_tmp IS RECORD(
    Delete_Stmnt     VARCHAR2(32767),
    Delete_Stmnt_Len NUMBER,
    Insert_Stmnt     VARCHAR2(32767),
    Insert_Stmnt_Len NUMBER);
  TYPE Ty_Tb_Purge_Audit_Tmp IS TABLE OF Ty_Purge_Audit_Tmp INDEX BY VARCHAR2(100);
  --Purge Tool Changes - Definition - End

  TYPE Ty_Node_Rec IS RECORD(
    Node_Level         NUMBER(4),
    Node_Name          VARCHAR2(100),
    Node_Type          VARCHAR2(100),
    Xsd_Node           VARCHAR2(100),
    Node_Parent        VARCHAR2(100),
    Node_Relation      VARCHAR2(32767),
    Node_Relation_Type VARCHAR2(32767),
    Node_Fields        VARCHAR2(32767),
    Node_Tags          VARCHAR2(32767),
    Query_Node         VARCHAR2(1),
    Node_Idx           NUMBER,
    Has_Childs         VARCHAR2(1),
    Child_List         VARCHAR2(4000));

  TYPE Ty_Tb_Chr_Node_Data IS TABLE OF Ty_Node_Rec INDEX BY VARCHAR2(500);
  TYPE Ty_Tb_Int_Node_Data IS TABLE OF Ty_Node_Rec INDEX BY PLS_INTEGER;

  g_New BOOLEAN := TRUE;

  g_Release_Type VARCHAR2(20) := 'CUSTOM';

  --Message CLOBS
  g_Fld_Tag     CLOB;
  g_Req         CLOB;
  g_Res         CLOB;
  g_Fc_Res      CLOB;
  g_Fld_Tag_Bak CLOB;
  g_Req_Bak     CLOB;
  g_Res_Bak     CLOB;
  g_Fc_Res_Bak  CLOB;
  g_Backed_Up   BOOLEAN := FALSE;

  g_Tb_Chr_Node_Data     Ty_Tb_Chr_Node_Data;
  g_Tb_Int_Node_Data     Ty_Tb_Int_Node_Data;
  g_Header               Gwpks_Service_Router.Ty_Header;
  g_Addl_Header          Gwpks_Service_Router.Ty_Header;
  g_Tb_Chr_Node_Data_Bak Ty_Tb_Chr_Node_Data;
  g_Tb_Int_Node_Data_Bak Ty_Tb_Int_Node_Data;
  g_Header_Bak           Gwpks_Service_Router.Ty_Header;
  g_Addl_Header_Bak      Gwpks_Service_Router.Ty_Header;

  g_Fc_Msg_Id     VARCHAR2(100);
  g_Req_No        NUMBER := 1;
  g_Req_Id        VARCHAR2(100) := 1;
  g_Composite_Req BOOLEAN := FALSE;

  g_Fc_Msg_Id_Bak     VARCHAR2(100);
  g_Req_No_Bak        NUMBER := 1;
  g_Req_Id_Bak        VARCHAR2(100) := 1;
  g_Composite_Req_Bak BOOLEAN := FALSE;
  --Kernel_11.2_RET_SFR#89 start
  g_Auto_Authorized BOOLEAN := FALSE; -- moved from body to spec
  g_Final_auth_stat VARCHAR2(1) := 'Y';
  -- Kernel_11.2_RET_SFR#89 ends
  --FCUBS PERF PROCESS REQ MSG Changes starts
  g_blk_ds_name    CLOB;
  g_fld_tag_name   CLOB;
  g_fld_tag_value  CLOB;
  g_error_resp_bdy VARCHAR2(32767);
  g_denom_Tag      VARCHAR2(32767);
  g_fcdata_req     VARCHAR2(1) := 'N';
  g_fcdata_resp    VARCHAR2(1) := 'N';
  --FCUBS PERF PROCESS REQ MSG Changes ends
  --Constants
  g_Max_Vc              CONSTANT NUMBER := 32000;
  p_Kernel              CONSTANT VARCHAR2(10) := 'KERNEL';
  p_Cluster             CONSTANT VARCHAR2(10) := 'CLUSTER';
  p_Custom              CONSTANT VARCHAR2(10) := 'CUSTOM';
  p_Extract_Key_Info    CONSTANT VARCHAR2(20) := 'EXTRACTKEYINFO';
  p_Get_Key_Info        CONSTANT VARCHAR2(20) := 'GETKEYINFO';
  p_View                CONSTANT VARCHAR2(10) := 'VIEW';
  p_New                 CONSTANT VARCHAR2(10) := 'NEW';
  p_Hold                CONSTANT VARCHAR2(10) := 'HOLD';
  p_Modify              CONSTANT VARCHAR2(10) := 'MODIFY';
  p_Amend               CONSTANT VARCHAR2(10) := 'AMEND';
  p_Close               CONSTANT VARCHAR2(10) := 'CLOSE';
  p_Reopen              CONSTANT VARCHAR2(10) := 'REOPEN';
  p_Delete              CONSTANT VARCHAR2(10) := 'DELETE';
  p_Version_Delete      CONSTANT VARCHAR2(20) := 'VERSIONDELETE';
  p_Auth                CONSTANT VARCHAR2(10) := 'AUTH';
  p_Reverse             CONSTANT VARCHAR2(10) := 'REVERSE';
  p_Rollover            CONSTANT VARCHAR2(10) := 'ROLLOVER';
  p_Liquidate           CONSTANT VARCHAR2(10) := 'LIQUIDATE';
  p_Confirm             CONSTANT VARCHAR2(10) := 'CONFIRM';
  p_Copy                CONSTANT VARCHAR2(10) := 'COPY';
  p_Default             CONSTANT VARCHAR2(10) := 'DEFAULT';
  p_Pickup              CONSTANT VARCHAR2(10) := 'PICKUP';
  p_Query               CONSTANT VARCHAR2(20) := 'EXECUTEQUERY';
  p_Authquery           CONSTANT VARCHAR2(20) := 'AUTHQUERY';
  p_Deletequery         CONSTANT VARCHAR2(20) := 'DELETEQUERY';
  p_Changelog           CONSTANT VARCHAR2(20) := 'CHANGELOG';
  p_Viewchglog          CONSTANT VARCHAR2(20) := 'VIEWCHGLOG';
  p_Viewmntlog          CONSTANT VARCHAR2(20) := 'VIEWMNTLOG';
  p_Reject              CONSTANT VARCHAR2(20) := 'REJECT';
  p_Udfpickup           CONSTANT VARCHAR2(20) := 'UDFPICKUP';
  p_Udfrepickup         CONSTANT VARCHAR2(20) := 'UDFREPICKUP';
  p_Udfnode             CONSTANT VARCHAR2(20) := 'UDFDETAILS';
  p_Txnudfnode          CONSTANT VARCHAR2(20) := 'TXNUDFDETAILS';
  p_Mispickup           CONSTANT VARCHAR2(20) := 'MISPICKUP';
  p_Rebldts             CONSTANT VARCHAR2(10) := 'REBUILDTS';
  p_Prddflt             CONSTANT VARCHAR2(10) := 'PRDDFLT';
  p_Subsyspickup        CONSTANT VARCHAR2(50) := 'SUBSYSPKP';
  p_Enrich              CONSTANT VARCHAR2(10) := 'ENRICH';
  p_Generate            CONSTANT VARCHAR2(10) := 'GENERATE';
  p_Summaryquery        CONSTANT VARCHAR2(20) := 'SUMMARYQUERY'; -- Summary Webservices Changes
  p_Udfforamt           CONSTANT VARCHAR2(20) := '1';
  g_Date_Time_Format    CONSTANT VARCHAR2(25) := 'RRRR-MM-DD HH24:MI:SS';
  g_Date_Format         CONSTANT VARCHAR2(25) := 'RRRR-MM-DD';
  g_Ws_Date_Time_Format CONSTANT VARCHAR2(25) := 'RRRR-MM-DD HH24:MI:SS';
  g_Ws_Date_Format      CONSTANT VARCHAR2(25) := 'RRRR-MM-DD';
  g_Maker_Remarks       CONSTANT VARCHAR2(25) := 'MAKERREMARKS';
  g_Checker_Remarks     CONSTANT VARCHAR2(25) := 'CHECKERREMARKS';
  g_Maker_Ovd_Remarks   CONSTANT VARCHAR2(25) := 'MAKEROVDREMARKS';
  g_Checker_Ovd_Remarks CONSTANT VARCHAR2(25) := 'CHECKEROVDREMARKS';

  g_Bip_Rep_Date_Format      CONSTANT VARCHAR2(25) := 'DD-MON-RRRR';
  g_Bip_Rep_Date_Time_Format CONSTANT VARCHAR2(25) := 'RRRR-MM-DD HH24:MI:SS';

  p_Func_Udf_Blk  CONSTANT VARCHAR2(50) := 'BLK_UDF_DETAILS';
  p_Func_Udf_Node CONSTANT VARCHAR2(50) := 'UDFDETAILS';
  p_Txn_Udf_Blk   CONSTANT VARCHAR2(50) := 'BLK_TXN_UDF_DETAILS';
  p_Txn_Udf_Node  CONSTANT VARCHAR2(50) := 'TXNUDFDETAILS';

  --Functions and Procedures
  PROCEDURE Pr_Init;
  PROCEDURE Pr_Backup;
  PROCEDURE Pr_Restore;

  PROCEDURE Pr_Msg_Init;
  PROCEDURE Pr_Close;
  PROCEDURE Pr_Reset;
  PROCEDURE Pr_Write(p_Type  IN VARCHAR2,
                     p_Text1 IN VARCHAR2,
                     p_Text2 IN VARCHAR2);
  PROCEDURE Pr_Write(p_Type IN VARCHAR2, p_Text IN VARCHAR2);
  PROCEDURE Pr_Cwrite(p_Type IN VARCHAR2, p_Text1 IN CLOB, p_Text2 IN CLOB);
  PROCEDURE Pr_Append_To_Res(p_Text IN VARCHAR2);
  PROCEDURE Pr_Append_To_Res(p_Text IN CLOB);
  PROCEDURE Pr_Close_Ts;

  PROCEDURE Pr_Split_Ts_Lists;
  FUNCTION Fn_Gettag RETURN VARCHAR2;
  FUNCTION Fn_Gettags RETURN Ty_Vc_Array;
  FUNCTION Fn_Getval RETURN VARCHAR2;
  FUNCTION Fn_Getvals RETURN Ty_Vc_Array;
  FUNCTION Fn_Getnode RETURN VARCHAR2;
  FUNCTION Fn_Getformat RETURN VARCHAR2;
  FUNCTION Fn_Getlvl RETURN NUMBER;
  PROCEDURE Pr_Rewind_By_One;
  FUNCTION Fn_Get_Req_Key RETURN VARCHAR2;
  PROCEDURE Pr_Set_Req_Key(p_Req_Key VARCHAR2);
  FUNCTION Fn_Get_Key_Id RETURN VARCHAR2;
  PROCEDURE Pr_Set_Key_Id(p_Key_Id VARCHAR2);
  FUNCTION Fn_Get_Fid RETURN VARCHAR2;
  PROCEDURE Pr_Set_Fid(p_Fid VARCHAR2);
  FUNCTION Fn_Get_Auto_Auth RETURN BOOLEAN;
  PROCEDURE Pr_Set_Auto_Auth(p_Auto_Auth BOOLEAN);
  FUNCTION Fn_Get_Func_Type RETURN VARCHAR2;
  PROCEDURE Pr_Set_Func_Type(p_Func_Type VARCHAR2);
  FUNCTION Fn_Get_Tanking_Reqd RETURN BOOLEAN;
  PROCEDURE Pr_Set_Tanking_Reqd(p_Tanking_Reqd BOOLEAN);
  FUNCTION Fn_Untanking RETURN BOOLEAN;
  PROCEDURE Pr_Set_Untanking(p_Untanking BOOLEAN);
  FUNCTION Fn_Tanked_Data_Found RETURN BOOLEAN;
  PROCEDURE Pr_Set_Tanked_Data_Found(p_Tanked_Data_Found BOOLEAN);
  FUNCTION Fn_Build_Resp RETURN BOOLEAN;
  PROCEDURE Pr_Set_Build_Resp(p_Build_Resp BOOLEAN);
  FUNCTION Fn_Fc_Res_Built RETURN BOOLEAN;
  PROCEDURE Pr_Set_Fc_Res_Built(p_Fc_Res_Built BOOLEAN);
  FUNCTION Fn_Get_Tanked RETURN BOOLEAN;
  PROCEDURE Pr_Set_Tanked(p_Tanked BOOLEAN);
  FUNCTION Fn_Get_Bulk_Upload RETURN BOOLEAN;
  PROCEDURE Pr_Set_Bulk_Upload(p_Bulk_Upload BOOLEAN);
  FUNCTION Fn_Get_Post_Upl_Stat RETURN VARCHAR2;
  PROCEDURE Pr_Set_Post_Upl_Stat(p_Post_Upl_Stat VARCHAR2);
  FUNCTION Fn_Get_On_Override_Action RETURN VARCHAR2;
  PROCEDURE Pr_Set_On_Override_Action(p_On_Ovd_Action VARCHAR2);
  PROCEDURE Pr_Set_Fc_Msg_Id(p_Fc_Msg_Id VARCHAR2);
  FUNCTION Fn_Get_Fc_Msg_Id RETURN VARCHAR2;
  PROCEDURE Pr_Set_Req_No(p_Req_No NUMBER);
  FUNCTION Fn_Get_Req_No RETURN NUMBER;
  PROCEDURE Pr_Set_Req_Id(p_Req_Id VARCHAR2);
  FUNCTION Fn_Get_Req_Id RETURN VARCHAR2;
  FUNCTION Fn_Is_Composite_Req RETURN BOOLEAN;
  PROCEDURE Pr_Set_Composite_Req(p_Composite_Req BOOLEAN);
  FUNCTION Fn_Is_Multitrip RETURN BOOLEAN;
  PROCEDURE Pr_Set_Multitrip(p_Multitrip BOOLEAN);
  FUNCTION Fn_Get_Multi_Trip_Id RETURN VARCHAR2;
  PROCEDURE Pr_Set_Multi_Trip_Id(p_Multi_Trip_Id VARCHAR2);
  FUNCTION Fn_Get_Reply_Type RETURN VARCHAR2;
  PROCEDURE Pr_Set_Reply_Type(p_Reply_Type VARCHAR2);
  FUNCTION Fn_Get_Log_Result_Error_Code RETURN BOOLEAN;
  PROCEDURE Pr_Set_Log_Result_Error_Code(p_Log_Result_Error_Code BOOLEAN);
  --KERNEL11.3.1_ATTACHMENTS CHANGES 08AUG2011 starts
  FUNCTION fn_get_attachments RETURN VARCHAR2;
  PROCEDURE pr_set_attachments(p_attachments VARCHAR2);
  FUNCTION fn_get_attachment_reqd RETURN BOOLEAN;
  PROCEDURE pr_set_attachment_reqd(p_attachments_reqd BOOLEAN);
  --KERNEL11.3.1_ATTACHMENTS CHANGES ends
   --Sanction Check Enhancement Changes starts
  FUNCTION Fn_Is_tank_query_hook_reqd RETURN BOOLEAN;
  PROCEDURE Pr_Set_tank_query_hook(post_tanked_query_hook BOOLEAN);  
  FUNCTION fn_get_snck_enabled RETURN BOOLEAN;
  PROCEDURE pr_set_snck_enabled(p_snck_enabled BOOLEAN);  
  --Sanction Check Enhancement Change ends

   --ATP CHANGES STARTS...
   PROCEDURE pr_set_tag_names  (p_vr_tag_names VARCHAR2);
   PROCEDURE pr_set_tag_values (p_vr_tag_values VARCHAR2);
   PROCEDURE pr_set_parent_list (p_v_parents_list VARCHAR2);
   PROCEDURE pr_set_parent_format (p_v_parents_format VARCHAR2);
   PROCEDURE pr_set_tag_names (p_tag_names VARCHAR2,p_arr_tag_names ty_vc_array,p_Arr_length NUMBER);
   PROCEDURE pr_set_tag_values (p_tag_values VARCHAR2,p_arr_tag_values ty_vc_array,p_Arr_length NUMBER);
   PROCEDURE pr_set_parent_list (p_parents_list VARCHAR2,p_arr_parent_list ty_vc_array,p_Arr_length NUMBER);
   PROCEDURE pr_set_parent_format (p_parents_format VARCHAR2,p_arr_parents_format ty_vc_array,p_Arr_length NUMBER);
   PROCEDURE pr_get_tag_names (p_tag_names OUT VARCHAR2,p_arr_tag_names OUT ty_vc_array,p_Arr_length OUT NUMBER);
   PROCEDURE pr_get_tag_values (p_tag_values OUT VARCHAR2,p_arr_tag_values OUT ty_vc_array,p_Arr_length OUT NUMBER);
   PROCEDURE pr_get_parent_list (p_parents_list OUT VARCHAR2,p_arr_parent_list OUT ty_vc_array,p_Arr_length OUT NUMBER);
   PROCEDURE pr_get_parent_format (p_parents_format OUT VARCHAR2,p_arr_parents_format OUT ty_vc_array,p_Arr_length OUT NUMBER);


   --ATP CHANGES ENDS...
   
  g_extsys_msg CLOB; --FCUBS Integration Layer Changes
  g_extintegration_key VARCHAR2(100); -- ELCM_Integration Changes
  g_pricing_reqxml CLOB; --FCUBS14.0_PricingIntegration_28020090
  
  /*Bug ID#25402939 :Begin*/
  FUNCTION fn_get_namespace return varchar2 ;
  /*Bug ID#25402939 :End*/
  
END Cspks_Req_Global;
/
Create or Replace Synonym Cspkss_Req_Global for Cspks_Req_Global
/
