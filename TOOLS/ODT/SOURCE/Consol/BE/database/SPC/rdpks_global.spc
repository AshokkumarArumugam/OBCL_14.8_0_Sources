CREATE OR REPLACE PACKAGE RDPKS_GLOBAL AS
   /*-----------------------------------------------------------------------------------------------------
   **
   ** File Name    : Rdpks_Global.SPC
   **
   ** Description  : TOOLS
   
   ** This source is part of the Oracle FLEXCUBE Software System and is copyrighted by Oracle Financial Services Software Limited.
  ** 
  ** 
  ** All rights reserved. No part of this work may be reproduced, stored in a retrieval system,
  ** adopted or transmitted in any form or by any means, electronic, mechanical, photographic,
  ** graphic, optic recording or otherwise, translated in any language or computer language,
  ** without the prior written permission of Oracle Financial Services Software Limited.
  ** 
  ** Oracle Financial Services Software Limited.
  ** 10-11, SDF I, SEEPZ, Andheri (East),
  ** Mumbai - 400 096.
  ** India
  ** Copyright © 2012 - 2013 Oracle Financial Services Software Limited. All rights reserved.

   -------------------------------------------------------------------------------------------------------
   CHANGE HISTORY
   
   Changed By         :
   Change Description :
   
   -------------------------------------------------------------------------------------------------------
   */

   TYPE Rec_Error IS RECORD(
      Err_Code   VARCHAR2(255),
      Err_Params VARCHAR2(4000));

   TYPE Tbl_Error IS TABLE OF Rec_Error INDEX BY BINARY_INTEGER;

   TYPE Ty_Tb_Chr_Chr_Array IS TABLE OF VARCHAR2(32767) INDEX BY VARCHAR2(255);
   TYPE Ty_Tb_Int_Chr_Array IS TABLE OF VARCHAR2(32767) INDEX BY PLS_INTEGER;
   TYPE Ty_Tb_Chr_Int_Array IS TABLE OF NUMBER INDEX BY VARCHAR2(255);
   TYPE Ty_Tb_Int_Int_Array IS TABLE OF NUMBER INDEX BY PLS_INTEGER;

   TYPE Ty_Header IS TABLE OF VARCHAR2(32767) INDEX BY VARCHAR2(255);
   TYPE Ty_Tb_Record_Data IS TABLE OF VARCHAR2(32767) INDEX BY VARCHAR2(255);
   TYPE Ty_Tb_Table_Data IS TABLE OF Ty_Tb_Record_Data INDEX BY PLS_INTEGER;
   TYPE Ty_Tb_Xml_Data IS TABLE OF Ty_Tb_Table_Data INDEX BY VARCHAR2(255);
   TYPE Ty_Addl_Info IS TABLE OF VARCHAR2(32767) INDEX BY VARCHAR2(32767);
   TYPE Ty_Num_Array IS TABLE OF NUMBER INDEX BY PLS_INTEGER;
   TYPE Ty_Vc_Array IS TABLE OF VARCHAR2(32767) INDEX BY PLS_INTEGER;

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

   --Error Code Table
   Gl_Tblerror Tbl_Error;

   --Global Variables
   g_Msg_Id           VARCHAR2(100);
   g_Multi_Trip_Id    VARCHAR2(100);
   g_User_Id          VARCHAR2(50);
   g_Terminal         VARCHAR2(50);
   g_user_seq         NUMBER;
   g_Saveformat       VARCHAR2(50);
   g_Xlformat        VARCHAR2(10);
   g_Xmlformat        VARCHAR2(10);
   g_Release_Code     VARCHAR2(50);
   g_Application_Name VARCHAR2(50);
   g_Stream_Name      VARCHAR2(50);
   g_Release_Type     VARCHAR2(50);
   g_Env_Code         VARCHAR2(50);
   g_Env_Stage        VARCHAR2(50);
   g_Lang_Code        VARCHAR2(50);
   g_wrk_directory    VARCHAR2(500);
   g_Function_Id      VARCHAR2(50);
   g_Action_Code      VARCHAR2(50);
   g_Status           VARCHAR2(10) := 'S';
   g_Rad_Xml          CLOB;
   g_Res_Clob         CLOB;
   --Annoattion 
   g_Annotation_Lbl_Xml CLOB;
   g_Res_Str          VARCHAR2(32767);
   g_Res_Str_Len      NUMBER := 0;
   g_Req_Type         VARCHAR2(500);
   g_Req_Code         VARCHAR2(500);
   g_Fld_Tag          CLOB;
   g_Req              CLOB;
   g_Res              CLOB;
   g_Gen_Res_Body     CLOB;
   g_Tb_Chr_Node_Data Ty_Tb_Chr_Node_Data;
   g_Tb_Int_Node_Data Ty_Tb_Int_Node_Data;
   g_Header           Ty_Header;
   g_Body_Tags        Ty_Header;
   g_Addl_Header      Ty_Header;
   g_Err_Code         VARCHAR2(32767);
   g_Err_Params       VARCHAR2(32767);
   g_Msg_Log          Rdtb_Msg_Log%ROWTYPE;
   g_bulk_gen         VARCHAR2(10);
   g_Backed_Up BOOLEAN := FALSE;

   --Backup Variables
   g_Msg_Id_Bak           VARCHAR2(100);
   g_Multi_Trip_Id_Bak    VARCHAR2(100);
   g_User_Id_Bak          VARCHAR2(50);
   g_Terminal_Bak         VARCHAR2(50);
   g_Saveformat_Bak       VARCHAR2(50);
   g_Xlformat_Bak       VARCHAR2(50);
   g_Xmlformat_Bak       VARCHAR2(50); 
   g_Release_Code_Bak     VARCHAR2(50);
   g_Stream_Name_Bak      VARCHAR2(50);
   g_Release_Type_Bak     VARCHAR2(50);
   g_Env_Code_Bak         VARCHAR2(50);
   g_Lang_Code_Bak        VARCHAR2(10);
   g_Function_Id_Bak      VARCHAR2(10);
   g_Action_Code_Bak      VARCHAR2(10);
   g_Status_Bak           VARCHAR2(10) := 'S';
   g_Rad_Xml_Bak          CLOB;
   g_Res_Clob_Bak         CLOB;
   g_Res_Str_Bak          VARCHAR2(32767);
   g_Res_Str_Len_Bak      NUMBER := 0;
   g_Req_Type_Bak         VARCHAR2(500);
   g_Req_Code_Bak         VARCHAR2(500);
   g_Fld_Tag_Bak          CLOB;
   g_Req_Bak              CLOB;
   g_Res_Bak              CLOB;
   g_Gen_Res_Body_Bak     CLOB;
   g_Tb_Chr_Node_Data_Bak Ty_Tb_Chr_Node_Data;
   g_Tb_Int_Node_Data_Bak Ty_Tb_Int_Node_Data;
   g_Header_Bak           Ty_Header;
   g_Body_Tags_Bak        Ty_Header;
   g_Addl_Header_Bak      Ty_Header;
   g_Err_Code_Bak         VARCHAR2(32767);
   g_Err_Params_Bak       VARCHAR2(32767);
   g_Msg_Log_Bak          Rdtb_Msg_Log%ROWTYPE;

   --Constants
   c_Action_Code_New           CONSTANT VARCHAR2(100) := 'NEW';
   c_Action_Code_Modify        CONSTANT VARCHAR2(100) := 'MODIFY';
   c_Action_Code_Query         CONSTANT VARCHAR2(100) := 'EXECUTEQUERY';
   c_Action_Code_Close         CONSTANT VARCHAR2(100) := 'CLOSERECORD';
   c_Req_Type_Gen              CONSTANT VARCHAR2(100) := 'GEN';
   c_Req_Type_Fid              CONSTANT VARCHAR2(100) := 'FID';
   c_Req_Code_Login            CONSTANT VARCHAR2(100) := 'LOGIN';
   c_Req_Code_Set_Release      CONSTANT VARCHAR2(100) := 'SETRELEASE';
   c_Req_Code_Change_Pwd       CONSTANT VARCHAR2(100) := 'CHANGEPWD';
   c_Req_Code_Generate         CONSTANT VARCHAR2(100) := 'GENERATE';
   c_Req_Code_Deploy           CONSTANT VARCHAR2(100) := 'DEPLOY';
   c_Req_Code_Release          CONSTANT VARCHAR2(100) := 'RELEASE';
   c_Req_Code_Extract_Data     CONSTANT VARCHAR2(100) := 'EXTRACTDATA';
   c_Req_Code_Blockdata_Uplaod CONSTANT VARCHAR2(100) := 'TCMBLKUPLOAD';
   c_Action_Code_Summary_Query CONSTANT VARCHAR2(100) := 'SUMMARYQUERY'; 
   --c_Req_Code_Gen_Data_Xml     CONSTANT VARCHAR2(100) := 'GENDATAXML';
   --c_Req_Code_Get_Data_Xml     CONSTANT VARCHAR2(100) := 'GENDATAXML';
   c_Req_Code_Update_Response  CONSTANT VARCHAR2(100) := 'RESUPD';
   c_Req_Code_Query_Xml        CONSTANT VARCHAR2(100) := 'QUERYXML';
   c_Req_Code_Build_Request    CONSTANT VARCHAR2(100) := 'BUILDREQUEST';
   c_Req_Code_Gen_Ntf_Trg      CONSTANT VARCHAR2(100) := 'GENERATENTFTRG';
   c_Max_Vc                    CONSTANT NUMBER := 32000;
   c_Rel_Type_Kernel           CONSTANT VARCHAR2(100) := 'KERNEL';
   c_Rel_Type_Cluster          CONSTANT VARCHAR2(100) := 'CLUSTER';
   c_Rel_Type_Custom           CONSTANT VARCHAR2(100) := 'CUSTOM';
   c_Rel_Type_Customer         CONSTANT VARCHAR2(100) := 'CUSTOMER';
   c_Date_Time_Format          CONSTANT VARCHAR2(100) := 'RRRR-MM-DD HH24:MI:SS';
   c_Date_Format               CONSTANT VARCHAR2(100) := 'RRRR-MM-DD';
   c_Dummy_Close_Node          CONSTANT VARCHAR2(100) := 'CLOSECURRNODE';

   --Functions and Procedures
   PROCEDURE Pr_Print(p_Type  IN VARCHAR2
                     ,p_Array IN Ty_Vc_Array);

   PROCEDURE Pr_Init;
   PROCEDURE Pr_Restore;
   PROCEDURE Pr_Reset;
   PROCEDURE Pr_Close;
   PROCEDURE Pr_Write(p_Type  IN VARCHAR2
                     ,p_Text1 IN VARCHAR2
                     ,p_Text2 IN VARCHAR2);
   PROCEDURE Pr_Write(p_Type IN VARCHAR2
                     ,p_Text IN VARCHAR2);
   PROCEDURE Pr_Cwrite(p_Type  IN VARCHAR2
                      ,p_Text1 IN CLOB
                      ,p_Text2 IN CLOB);
   PROCEDURE Pr_Append_To_Res(p_Text IN VARCHAR2);
   PROCEDURE Pr_Append_To_Res(p_Text IN CLOB);
   PROCEDURE Pr_Close_Ts;
   FUNCTION Fn_Getnode RETURN VARCHAR2;
   FUNCTION Fn_Getformat RETURN VARCHAR2;
   FUNCTION Fn_Getlvl RETURN NUMBER;
   FUNCTION Fn_Gettag RETURN VARCHAR2;
   FUNCTION Fn_Gettags RETURN Ty_Vc_Array;
   FUNCTION Fn_Getval RETURN VARCHAR2;
   FUNCTION Fn_Getvals RETURN Ty_Vc_Array;
   PROCEDURE Pr_Rewind_By_One;

END rdpks_global;
/
CREATE OR REPLACE SYNONYM rdpkss_global FOR rdpks_global
/