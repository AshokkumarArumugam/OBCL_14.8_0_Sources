CREATE OR REPLACE PACKAGE RDPKS_REQ_GLOBAL AS
   /*-----------------------------------------------------------------------------------------------------
   **
   ** File Name      : Rdpks_Req_Global.spc
   **
   ** Description     : Package Generator
   **
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
   ** Copyright  © 2012 - 2013 Oracle Financial Services Software Limited. All rights reserved.
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

   --Header Variables
   g_User_Id      VARCHAR2(50);
   g_Release_Code VARCHAR2(50);
   g_Stream_Name  VARCHAR2(50);
   g_Release_Type VARCHAR2(50);
   g_Env_Code     VARCHAR2(50);
   g_Lang_Code    VARCHAR2(10);
   g_Function_Id  VARCHAR2(10);
   g_Action_Code  VARCHAR2(10);

   g_Rad_Xml          CLOB;
   g_Res_Clob         CLOB;
   g_Res_Str          VARCHAR2(32767);
   g_Req_Type         VARCHAR2(500);
   g_Req_Code         VARCHAR2(500);
   g_Fld_Tag          CLOB;
   g_Req              CLOB;
   g_Res              CLOB;
   g_Gen_Res_Body     CLOB;
   g_Tb_Chr_Node_Data Ty_Tb_Chr_Node_Data;
   g_Tb_Int_Node_Data Ty_Tb_Int_Node_Data;
   g_Header           Ty_Header;
   g_Addl_Header      Ty_Header;

   g_Backed_Up BOOLEAN := FALSE;

   g_Rad_Xml_Bak          CLOB;
   g_Res_Clob_Bak         CLOB;
   g_Res_Str_Bak          VARCHAR2(32767);
   g_Req_Type_Bak         VARCHAR2(500);
   g_Req_Code_Bak         VARCHAR2(500);
   g_Fld_Tag_Bak          CLOB;
   g_Req_Bak              CLOB;
   g_Res_Bak              CLOB;
   g_Gen_Res_Body_Bak     CLOB;
   g_Tb_Chr_Node_Data_Bak Ty_Tb_Chr_Node_Data;
   g_Tb_Int_Node_Data_Bak Ty_Tb_Int_Node_Data;
   g_Header_Bak           Ty_Header;
   g_Addl_Header_Bak      Ty_Header;

   --Constants
   c_Max_Vc            CONSTANT NUMBER := 9000;
   c_Rel_Type_Kernel   CONSTANT VARCHAR2(10) := 'KERNEL';
   c_Rel_Type_Cluster  CONSTANT VARCHAR2(10) := 'CLUSTER';
   c_Rel_Type_Custom   CONSTANT VARCHAR2(10) := 'CUSTOM';
   c_Rel_Type_Customer CONSTANT VARCHAR2(10) := 'CUSTOM';
   c_Date_Time_Format  CONSTANT VARCHAR2(25) := 'RRRR-MM-DD HH24:MI:SS';
   c_Date_Format       CONSTANT VARCHAR2(25) := 'RRRR-MM-DD';

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

END rdpks_req_global;
/
CREATE OR REPLACE SYNONYM rdpkss_req_global  FOR rdpks_req_global;
/
 