CREATE OR REPLACE PACKAGE Rdpks_Gen AS

   /*-----------------------------------------------------------------------------------------------------
     **
     ** File Name    : rdpks_gen.spc
     **
     ** Description  : TOOLS
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
    ** Copyright © 2012 - 2013 Oracle Financial Services Software Limited. All rights reserved.
     -------------------------------------------------------------------------------------------------------
     CHANGE HISTORY

     Changed By         :
     Change Description :

     -------------------------------------------------------------------------------------------------------
     */
   --For Purge Entity Definition starts

   --Purge Tables
   TYPE Ty_Chr_Pg_Tables IS TABLE OF Rdtm_Purge_Tables%ROWTYPE INDEX BY VARCHAR2(100);

   TYPE Ty_Int_Pg_Tables IS TABLE OF Rdtm_Purge_Tables%ROWTYPE INDEX BY PLS_INTEGER;

   --Purge Filters
   TYPE Ty_Chr_Pg_Filters_Tbl IS TABLE OF Rdtm_Purge_Filters%ROWTYPE INDEX BY VARCHAR2(500);

   TYPE Ty_Int_Pg_Filters_Tbl IS TABLE OF Rdtm_Purge_Filters%ROWTYPE INDEX BY PLS_INTEGER;

   TYPE Ty_Chr_Pg_Subsystem_Tbl IS TABLE OF rdtm_purge_subsystems%ROWTYPE INDEX BY VARCHAR2(500);

   TYPE Ty_Int_Pg_Subsystem_Tbl IS TABLE OF rdtm_purge_subsystems%ROWTYPE INDEX BY PLS_INTEGER;

   --Purge Table Columns
   TYPE Ty_Tab_Cols IS RECORD(
     Column_Name   VARCHAR2(100),
     Data_Type     VARCHAR2(20),
     Max_Length    NUMBER,
     Max_Decimals   NUMBER
   );
   TYPE Ty_Int_Pg_Tab_Cols IS TABLE OF Ty_Tab_Cols INDEX BY PLS_INTEGER;
   TYPE Ty_Chr_Pg_Tab_Cols IS TABLE OF Ty_Tab_Cols INDEX BY VARCHAR2(100);

   TYPE Ty_Int_Pg_Tab_Col_Tbl IS TABLE OF Ty_Int_Pg_Tab_Cols INDEX BY VARCHAR2(50);
   TYPE Ty_Chr_Pg_Tab_Col_Tbl IS TABLE OF Ty_Chr_Pg_Tab_Cols INDEX BY VARCHAR2(50);

   --Delete Clause Column Mapping
   TYPE Ty_Delete_Clause_Map_Rec IS RECORD(
      Column_Name   VARCHAR2(100),
      Variable_Name VARCHAR2(100),
      Data_Type     VARCHAR2(20),
      Stage_Column  VARCHAR2(20),
      New_Stage_Column_Reqd  CHAR(1));
   TYPE Ty_Delete_Clause_Map IS TABLE OF Ty_Delete_Clause_Map_Rec INDEX BY PLS_INTEGER;
   TYPE Ty_Int_Del_Clause_Map_Tbl IS TABLE OF Ty_Delete_Clause_Map INDEX BY PLS_INTEGER;
   TYPE Ty_Chr_Del_Clause_Map_Tbl IS TABLE OF Ty_Delete_Clause_Map INDEX BY VARCHAR2(100);

   g_Fid_Pg_Master  Rdtm_Purge_Master%ROWTYPE;
   g_Chr_Pg_Tables  Ty_Chr_Pg_Tables;
   g_Int_Pg_Tables  Ty_Int_Pg_Tables;
   g_Chr_Pg_Filters Ty_Chr_Pg_Filters_Tbl;
   g_Int_Pg_Filters Ty_Int_Pg_Filters_Tbl;
   g_Int_Pg_Tab_Cols    Ty_Int_Pg_Tab_Col_Tbl;
   g_Chr_Pg_Tab_Cols    Ty_Chr_Pg_Tab_Col_Tbl;
   g_Int_Del_Clause_Map_Tbl Ty_Int_Del_Clause_Map_Tbl;
   g_free_format_filter VARCHAR2(32767);
   g_final_filter  VARCHAR2(32767);
   g_is_filter_expr_custom VARCHAR2(10);
   g_Chr_Del_Clause_Map_Tbl Ty_Chr_Del_Clause_Map_Tbl;
   g_Chr_Pg_Subsystems  Ty_Chr_Pg_Subsystem_Tbl;
      g_Int_Pg_Subsystems  Ty_Int_Pg_Subsystem_Tbl;

   g_Master_Dsn_alias   VARCHAR2(2);
   -- Purge Entity Definition ends

   g_Customer_Landing_Page BOOLEAN:= FALSE;
   c_customer_Landing_Master VARCHAR2(100):= 'MASTER';

   --For Generic Interface Templates
   g_Fid_Gi_Master Rdtb_Fid_File_Master%ROWTYPE;

   TYPE Ty_Chr_Gi_Fields IS TABLE OF Rdtb_Fid_File_Fields%ROWTYPE INDEX BY VARCHAR2(100);

   TYPE Ty_Int_Gi_Fields IS TABLE OF Rdtb_Fid_File_Fields%ROWTYPE INDEX BY PLS_INTEGER;

   TYPE Ty_Chr_Gi_Records IS TABLE OF Rdtb_Fid_File_Records%ROWTYPE INDEX BY VARCHAR2(100);

   TYPE Ty_Int_Gi_Records IS TABLE OF Rdtb_Fid_File_Records%ROWTYPE INDEX BY PLS_INTEGER;

   TYPE Ty_Chr_Gi_Sections IS TABLE OF Rdtb_Fid_File_Sections%ROWTYPE INDEX BY VARCHAR2(100);

   TYPE Ty_Int_Gi_Sections IS TABLE OF Rdtb_Fid_File_Sections%ROWTYPE INDEX BY PLS_INTEGER;

   g_Chr_Gi_Fields Ty_Chr_Gi_Fields;

   g_Int_Gi_Fields Ty_Int_Gi_Fields;

   g_Chr_Gi_Records Ty_Chr_Gi_Records;

   g_Int_Gi_Records Ty_Int_Gi_Records;

   g_Chr_Gi_Sections Ty_Chr_Gi_Sections;

   g_Int_Gi_Sections Ty_Int_Gi_Sections;

   --For Preferences
   TYPE Ty_Function_Preferences IS RECORD(
      Module             VARCHAR2(4000),
      Module_Desc        VARCHAR2(4000),
      Branch_Program_Id  VARCHAR2(4000),
      Process_Code       VARCHAR2(4000),
      Ho_Function        VARCHAR2(4000),
	  GW_Function		 VARCHAR2(4000),
      Aeod_Aware         VARCHAR2(4000),
      Logging_Reqd       VARCHAR2(4000),
      Auto_Auth          VARCHAR2(4000),
      Tank_Modifications VARCHAR2(4000),
      Field_Log_Reqd     VARCHAR2(4000));

   --For Summary Field Mapping
   TYPE Ty_Sum_Fldmap_Rec IS RECORD(
      Field_No      NUMBER,
      Field_Name    VARCHAR2(4000),
      Column_Name   VARCHAR2(4000),
      Data_Type     VARCHAR2(4000),
      Mapped_Column VARCHAR2(4000),
      Field_Type    VARCHAR2(4000),
      Result_Field  VARCHAR2(10));

   TYPE Ty_Int_Sum_Map_Tbl IS TABLE OF Ty_Sum_Fldmap_Rec INDEX BY PLS_INTEGER;

   TYPE Ty_Chr_Sum_Map_Tbl IS TABLE OF Ty_Sum_Fldmap_Rec INDEX BY VARCHAR2(100);

   --Relation Table
   TYPE Rel_Rec IS RECORD(
      Ccol VARCHAR2(100),
      Pcol VARCHAR2(100));

   TYPE Ty_Rel_Tbl IS TABLE OF Rel_Rec INDEX BY PLS_INTEGER;

   --For Labels
   TYPE Ty_Int_Lbl_Tbl IS TABLE OF Rdtb_Fid_Labels%ROWTYPE INDEX BY PLS_INTEGER;

   TYPE Ty_Chr_Lbl_Tbl IS TABLE OF Rdtb_Fid_Labels%ROWTYPE INDEX BY VARCHAR2(200);

   --For File Lists
   TYPE Ty_Int_Files IS TABLE OF Rdtb_Fid_Generated_Files%ROWTYPE INDEX BY PLS_INTEGER;

   TYPE Ty_Chr_Files IS TABLE OF Rdtb_Fid_Generated_Files%ROWTYPE INDEX BY VARCHAR2(500);

   --For Menu Details
   TYPE Ty_Chr_Menu_Dtls_Tbl IS TABLE OF Rdtb_Fid_Menu_Details%ROWTYPE INDEX BY VARCHAR2(500);

   TYPE Ty_Int_Menu_Dtls_Tbl IS TABLE OF Rdtb_Fid_Menu_Details%ROWTYPE INDEX BY PLS_INTEGER;

   --For Function Description
   TYPE Ty_Chr_Function_Desc_Tbl IS TABLE OF Rdtb_Fid_Function_Description%ROWTYPE INDEX BY VARCHAR2(500);

   TYPE Ty_Int_Function_Desc_Tbl IS TABLE OF Rdtb_Fid_Function_Description%ROWTYPE INDEX BY PLS_INTEGER;

   --For Sreens
   TYPE Ty_Chr_Scr_Tbl IS TABLE OF Rdtb_Fid_Screens%ROWTYPE INDEX BY VARCHAR2(500);

   TYPE Ty_Int_Scr_Tbl IS TABLE OF Rdtb_Fid_Screens%ROWTYPE INDEX BY PLS_INTEGER;

   --For Tabs
   TYPE Ty_Chr_Tab_Tbl IS TABLE OF Rdtb_Fid_Tabs%ROWTYPE INDEX BY VARCHAR2(500);

   TYPE Ty_Int_Tab_Tbl IS TABLE OF Rdtb_Fid_Tabs%ROWTYPE INDEX BY PLS_INTEGER;

   --For Fieldsets
   TYPE Ty_Chr_Fst_Tbl IS TABLE OF Rdtb_Fid_Fieldsets%ROWTYPE INDEX BY VARCHAR2(500);

   TYPE Ty_Int_Fst_Tbl IS TABLE OF Rdtb_Fid_Fieldsets%ROWTYPE INDEX BY PLS_INTEGER;

   --For Data Sources
   TYPE Ty_Chr_Node_Tbls IS TABLE OF Rdtb_Fid_Data_Sources%ROWTYPE INDEX BY VARCHAR2(500);

   TYPE Ty_Int_Node_Tbls IS TABLE OF Rdtb_Fid_Data_Sources%ROWTYPE INDEX BY PLS_INTEGER;

   --For Data Source Fields
   TYPE Ty_Chr_Dsn_Fld_Dsn_Tbl IS TABLE OF Rdtb_Fid_Datasrc_Fields%ROWTYPE INDEX BY VARCHAR2(500);

   TYPE Ty_Int_Dsn_Fld_Dsn_Tbl IS TABLE OF Rdtb_Fid_Datasrc_Fields%ROWTYPE INDEX BY PLS_INTEGER;

   TYPE Ty_Chr_Dsn_Fld_Tbl IS TABLE OF Ty_Chr_Dsn_Fld_Dsn_Tbl INDEX BY VARCHAR2(500);

   TYPE Ty_Int_Dsn_Fld_Tbl IS TABLE OF Ty_Int_Dsn_Fld_Dsn_Tbl INDEX BY VARCHAR2(500);

   --For Data Blocks
   TYPE Ty_Chr_Blk_Tbls IS TABLE OF Rdtb_Fid_Data_Blocks%ROWTYPE INDEX BY VARCHAR2(500);

   TYPE Ty_Int_Blk_Tbls IS TABLE OF Rdtb_Fid_Data_Blocks%ROWTYPE INDEX BY PLS_INTEGER;

   --For Block Fields
   TYPE Ty_Chr_Blk_Fld_Blk_Tbl IS TABLE OF Rdtb_Fid_Block_Fields%ROWTYPE INDEX BY VARCHAR2(500);

   TYPE Ty_Int_Blk_Fld_Blk_Tbl IS TABLE OF Rdtb_Fid_Block_Fields%ROWTYPE INDEX BY PLS_INTEGER;

   TYPE Ty_Chr_Blk_Fld_Tbl IS TABLE OF Ty_Chr_Blk_Fld_Blk_Tbl INDEX BY VARCHAR2(500);

   TYPE Ty_Int_Blk_Fld_Tbl IS TABLE OF Ty_Int_Blk_Fld_Blk_Tbl INDEX BY VARCHAR2(500);
   --Upload packages
   TYPE Ty_Chr_Upload_Tables IS TABLE OF Ty_Tab_Cols INDEX BY VARCHAR2(100);

   TYPE Ty_Int_Upload_Tables IS TABLE OF Ty_Tab_Cols INDEX BY PLS_INTEGER;

   TYPE Ty_Chr_Upload_Cols IS TABLE OF Ty_Chr_Upload_Tables INDEX BY VARCHAR2(100);

   TYPE Ty_Int_Upload_Cols IS TABLE OF Ty_Int_Upload_Tables INDEX BY VARCHAR2(100);

   --LOV Definitions
   TYPE Ty_Chr_Lov_Tbl IS TABLE OF Rdtb_Fid_Lovs%ROWTYPE INDEX BY VARCHAR2(500);

   TYPE Ty_Int_Lov_Tbl IS TABLE OF Rdtb_Fid_Lovs%ROWTYPE INDEX BY PLS_INTEGER;

   --For Call Forms
   TYPE Ty_Chr_Cfm_Tbl IS TABLE OF Rdtb_Fid_Call_Forms%ROWTYPE INDEX BY VARCHAR2(500);

   TYPE Ty_Int_Cfm_Tbl IS TABLE OF Rdtb_Fid_Call_Forms%ROWTYPE INDEX BY PLS_INTEGER;

   --For Launch Forms
   TYPE Ty_Chr_Lfm_Tbl IS TABLE OF Rdtb_Fid_Launch_Forms%ROWTYPE INDEX BY VARCHAR2(500);

   TYPE Ty_Int_Lfm_Tbl IS TABLE OF Rdtb_Fid_Launch_Forms%ROWTYPE INDEX BY PLS_INTEGER;

   --For Action Code Information
   TYPE Ty_Chr_Action_Tbl IS TABLE OF Rdtb_Fid_Actions%ROWTYPE INDEX BY VARCHAR2(500);

   TYPE Ty_Int_Action_Tbl IS TABLE OF Rdtb_Fid_Actions%ROWTYPE INDEX BY PLS_INTEGER;

   --For Variable Mapping
   TYPE Ty_Chr_Var_Map_Tbl IS TABLE OF Rdtb_Fid_Variable_Mapping%ROWTYPE INDEX BY VARCHAR2(500);

   TYPE Ty_Int_Var_Map_Tbl IS TABLE OF Rdtb_Fid_Variable_Mapping%ROWTYPE INDEX BY PLS_INTEGER;

   --For IO Tags
   TYPE Ty_Chr_Io_Tags_Tbl IS TABLE OF Rdtb_Fid_Io_Tags%ROWTYPE INDEX BY VARCHAR2(500);

   TYPE Ty_Int_Io_Tags_Tbl IS TABLE OF Rdtb_Fid_Io_Tags%ROWTYPE INDEX BY PLS_INTEGER;

   TYPE Ty_Chr_Io_Tags_Tb_Tbl IS TABLE OF Ty_Chr_Io_Tags_Tbl INDEX BY VARCHAR2(500);

   TYPE Ty_Int_Io_Tags_Tb_Tbl IS TABLE OF Ty_Int_Io_Tags_Tbl INDEX BY VARCHAR2(500);

   --For Parent Fields
   TYPE Ty_Prnt_Fld_Rec IS RECORD(
      Block_Name  VARCHAR2(32767),
      Lov_Name    VARCHAR2(32767),
      Desc_Fields VARCHAR2(32767),
      Query_Cols  VARCHAR2(32767));

   TYPE Ty_Prnt_Fld_Int_Tbl IS TABLE OF Ty_Prnt_Fld_Rec INDEX BY VARCHAR2(100);

   TYPE Ty_Prnt_Fld_Tbl IS TABLE OF Ty_Prnt_Fld_Int_Tbl INDEX BY VARCHAR2(100);

   --For Summary Mapping
   g_Int_Sum_Map_Tbl Ty_Int_Sum_Map_Tbl;

   g_Chr_Sum_Map_Tbl Ty_Chr_Sum_Map_Tbl;

   --For Notications
   TYPE Ty_Int_Notif_Fld_Map IS TABLE OF Rdtb_Fid_Notif_Tag_Mapping%ROWTYPE INDEX BY PLS_INTEGER;

   TYPE Ty_Chr_Notif_Fld_Map IS TABLE OF Rdtb_Fid_Notif_Tag_Mapping%ROWTYPE INDEX BY VARCHAR2(100);

   --Generic Types
   TYPE Ty_Chr_Int_Tbl IS TABLE OF VARCHAR2(32767) INDEX BY PLS_INTEGER;

   TYPE Ty_Chr_Chr_Tbl IS TABLE OF VARCHAR2(32767) INDEX BY VARCHAR2(32767);

   --For Writing Scripts
   TYPE Ty_Table_Data IS RECORD(
      Table_Name      VARCHAR2(100),
      File_Name       VARCHAR2(100),
      Record_Set_Cond VARCHAR2(32767),
      Delete_Cond     VARCHAR2(32767),
      Ddl_Upload_Reqd VARCHAR2(32767),
      Actions_Allowed VARCHAR2(32767));

   TYPE Ty_Tables IS TABLE OF Ty_Table_Data INDEX BY PLS_INTEGER;

   TYPE Ty_Col_Data IS RECORD(
      Col_Data VARCHAR2(32767),
      Col      VARCHAR2(32767),
      Val      VARCHAR2(32767),
      Dtyp     VARCHAR2(32767));

   TYPE Ty_Col_Table IS TABLE OF Ty_Col_Data INDEX BY PLS_INTEGER;

   TYPE Ty_Record_Rec IS RECORD(
      Cols VARCHAR2(32767),
      Vals VARCHAR2(32767),
      Scr  VARCHAR2(32767));

   TYPE Ty_Tb_Record_Int_Tbl IS TABLE OF Ty_Record_Rec INDEX BY PLS_INTEGER;

   TYPE Ty_Tb_Static_Data IS TABLE OF Ty_Tb_Record_Int_Tbl INDEX BY VARCHAR2(255);

   TYPE Ty_Tb_Chr_Int_Tbl IS TABLE OF VARCHAR2(32767) INDEX BY PLS_INTEGER;
    --shihab trax
   TYPE Ty_Chr_Gw_Operations IS TABLE OF RDTM_GATEWAY_OPERATIONS%ROWTYPE INDEX BY VARCHAR2(100);
   TYPE Ty_Int_Gw_Operations IS TABLE OF RDTM_GATEWAY_OPERATIONS%ROWTYPE INDEX BY PLS_INTEGER;
   TYPE Ty_Gateway_master IS RECORD(
      Service_name             VARCHAR2(2000),
      Service_Description      VARCHAR2(2000),
      Type_System         VARCHAR2(1),
      Soap_Fault   VARCHAR2(1),
	  Service_Product VARCHAR2(2000));
   g_gateway_master  Ty_Gateway_master;
   g_Chr_Gw_Operations Ty_Chr_Gw_Operations;
   g_Int_Gw_Operations Ty_Int_Gw_Operations;
    --shihab trax
   --*******************VARIABLES**********************--
   --For Indentation
   g_Indent             NUMBER := 0;

   g_Indent_Lvl         NUMBER := 0;

   g_Indent_Size        NUMBER := 3;

   g_Els_Printed        BOOLEAN := FALSE;

   g_Prev_Key_Word      VARCHAR2(32767) := '*';

   g_Prev_New_Line      VARCHAR2(32767) := 'Y';

   g_Tbl_Indent_Tracker Ty_Chr_Int_Tbl;
   --For line splitting
   g_line_text        VARCHAR2(32767) := NULL;
   g_Max_Line_Length  NUMBER := 2250;
   g_Max_Col_Val_Length  NUMBER := 2000;
   --Checkin Details
   g_Checkin_Mode  VARCHAR2(50);

   g_Site_Code     VARCHAR2(50);

   g_Sfr_No        VARCHAR2(50);

   g_sub_project   VARCHAR2(100);
   g_ddl_remarks   VARCHAR2(4000);
   --SVN iNTERFACE
   g_Svn_user  VARCHAR2(100);
   g_Svn_Pass  VARCHAR2(100);
   g_Module_Folder VARCHAR2(32767);

   --Package and Synonym Names
   g_Main_Pck     VARCHAR2(50);

   g_Kernel_Pck   VARCHAR2(50);

   g_Cluster_Pck  VARCHAR2(50);

   g_Custom_Pck   VARCHAR2(50);

   g_Customer_Pck VARCHAR2(50);

   g_Main_Syn     VARCHAR2(50);

   g_Kernel_Syn   VARCHAR2(50);

   g_Cluster_Syn  VARCHAR2(50);

   g_Custom_Syn   VARCHAR2(50);

   g_Customer_Syn VARCHAR2(50);

   g_Upload_Pck  VARCHAR2(50);  --upload packages
   g_Upload_Syn  VARCHAR2(50);  --upload packages
   --Parent Packages
   g_Parent_Main_Pck     VARCHAR2(50);

   g_Parent_Kernel_Pck   VARCHAR2(50);

   g_Parent_Cluster_Pck  VARCHAR2(50);

   g_Parent_Custom_Pck   VARCHAR2(50);

   g_Parent_Customer_Pck VARCHAR2(50);

   g_Parent_Main_Syn     VARCHAR2(50);

   g_Parent_Kernel_Syn   VARCHAR2(50);

   g_Parent_Cluster_Syn  VARCHAR2(50);

   g_Parent_Custom_Syn   VARCHAR2(50);

   g_Parent_Customer_Syn VARCHAR2(50);

   --Function Id data
   g_Xml_Doc              Dbms_Xmldom.Domdocument;

   g_Rad_Function_Id      VARCHAR2(50);

   g_Function_Category    VARCHAR2(50);

   g_Function_Type        VARCHAR2(50);

   g_Module_Code          VARCHAR2(50);

   g_Module_Desc          VARCHAR2(200);

   g_Parent_Module_Code   VARCHAR2(200);

   g_Parent_Module_Desc   VARCHAR2(200);

   g_Parent_Function_Id   VARCHAR2(200);

   g_Footer_Template      VARCHAR2(200);

   g_Header_Template      VARCHAR2(200);

   g_Genfunc              VARCHAR2(50);

   g_Parent_Genfunc       VARCHAR2(50);

   g_Child_Function       BOOLEAN := FALSE;

   g_Call_Form            BOOLEAN := FALSE;

   g_Call_Form_Type       VARCHAR2(30);

   g_App_Function_Type    VARCHAR2(100);

   g_Func_Udf             BOOLEAN := FALSE;

   g_Func_Udf_In_Main     BOOLEAN := FALSE;

   g_Txn_Udf              BOOLEAN := FALSE;

   g_Txn_Udf_In_Main      BOOLEAN := FALSE;

   g_Func_Udfs_In_Main    VARCHAR2(32767);

   g_Txn_Udfs_In_Main     VARCHAR2(32767);

   g_No_Of_Blocks         NUMBER := 0;

   g_No_Of_Data_Sources   NUMBER := 0;

   g_No_Of_Call_Forms     NUMBER := 0;

   g_Eff_No_Of_Call_Forms NUMBER := 0;

   --Clob dATA Handling While Rollback of Transaction
   g_Clob_Conversion_Reqd BOOLEAN :=FALSE;
   --g_Parents_List VARCHAR2(100);
   --Program Variable
   g_Elcm_Function  BOOLEAN :=FALSE;
   
   -- Module Auto Auth Changes
   g_Module_Auth  BOOLEAN :=FALSE;
   
   g_Max_Node_Level NUMBER := 0;

   g_Max_Blk_Level  NUMBER := 0;

   --Release Levels
   g_Curr_Level          NUMBER;

   g_Origin_Level        NUMBER;

   g_Origin_Date         DATE;

   g_Parent_Origin_Level NUMBER;

   --Hook Calling  Controllers
   g_Kernel_Hook_Reqd   BOOLEAN := FALSE;

   g_Cluster_Hook_Reqd  BOOLEAN := FALSE;

   g_Custom_Hook_Reqd   BOOLEAN := FALSE;

   g_Customer_Hook_Reqd BOOLEAN := FALSE;

   g_Parent_Kernel_Hook_Reqd   BOOLEAN := FALSE;

   g_Parent_Cluster_Hook_Reqd  BOOLEAN := FALSE;

   g_Parent_Custom_Hook_Reqd   BOOLEAN := FALSE;

   g_Parent_Customer_Hook_Reqd BOOLEAN := FALSE;

   --Master Variables
   g_Master_Dsn        VARCHAR2(100);

   g_Master_Block      VARCHAR2(100);

   g_Master_Xsd_Node   VARCHAR2(100);

   g_Master_Variable   VARCHAR2(100);

   g_Master_Dflt_Where VARCHAR2(1000);

   g_master_upld_table  VARCHAR2(100);
   g_Master_Upld_Mapped_Tbl  VARCHAR2(100);
   --For FID Master
   g_Fid_Master Rdtb_Fid_Master%ROWTYPE;

   --For Labels
   g_Int_Lbl_Tbl Ty_Int_Lbl_Tbl;

   g_Chr_Lbl_Tbl Ty_Chr_Lbl_Tbl;

   --For File Lists
   g_Int_Files Ty_Int_Files;

   g_Chr_Files Ty_Chr_Files;

   --For Menu Details
   g_Menu_Rec          Rdtb_Fid_Menu_Details%ROWTYPE;

   g_Chr_Menu_Dtls_Tbl Ty_Chr_Menu_Dtls_Tbl;

   g_Int_Menu_Dtls_Tbl Ty_Int_Menu_Dtls_Tbl;

   --For Function Desc
   g_Chr_Func_Desc_Tbl Ty_Chr_Function_Desc_Tbl;

   g_Int_Func_Desc_Tbl Ty_Int_Function_Desc_Tbl;

   --For Screens
   g_Chr_Scr_Tbl Ty_Chr_Scr_Tbl;

   g_Int_Scr_Tbl Ty_Int_Scr_Tbl;

   --For Tabs
   g_Chr_Tab_Tbl Ty_Chr_Tab_Tbl;

   g_Int_Tab_Tbl Ty_Int_Tab_Tbl;

   --For Fieldsets
   g_Chr_Fst_Tbl Ty_Chr_Fst_Tbl;

   g_Int_Fst_Tbl Ty_Int_Fst_Tbl;

   --Data Sources
   g_Chr_Node_Tbl Ty_Chr_Node_Tbls;

   g_Int_Node_Tbl Ty_Int_Node_Tbls;

   --Data Source Fields
   g_Chr_Dfl_Tbl Ty_Chr_Dsn_Fld_Tbl;

   g_Int_Dfl_Tbl Ty_Int_Dsn_Fld_Tbl;

   --Data Blocks
   g_Chr_Blk_Tbl Ty_Chr_Blk_Tbls;

   g_Int_Blk_Tbl Ty_Int_Blk_Tbls;

   --Data Block Fields
   g_Chr_Bfl_Tbl Ty_Chr_Blk_Fld_Tbl;

   g_Int_Bfl_Tbl Ty_Int_Blk_Fld_Tbl;
   -- Upload Packages
   g_Int_Upload_Cols_Tbl Ty_Int_Upload_Cols;

   g_Chr_Upload_Cols_Tbl Ty_Chr_Upload_Cols;
   g_Upload_Tables Ty_Chr_Int_Tbl;
   --LOV Definitions
   g_Chr_Lov_Tbl Ty_Chr_Lov_Tbl;

   g_Int_Lov_Tbl Ty_Int_Lov_Tbl;

   --For Call Forms
   g_Chr_Cfm_Tbl Ty_Chr_Cfm_Tbl;

   g_Int_Cfm_Tbl Ty_Int_Cfm_Tbl;

   --For Call Forms
   g_Chr_Lfm_Tbl Ty_Chr_Lfm_Tbl;

   g_Int_Lfm_Tbl Ty_Int_Lfm_Tbl;

   --For Actions
   g_Chr_Action_Tbl Ty_Chr_Action_Tbl;

   g_Int_Action_Tbl Ty_Int_Action_Tbl;

   --For Variable Mappings
   g_Chr_Var_Map_Tbl Ty_Chr_Var_Map_Tbl;

   g_Int_Var_Map_Tbl Ty_Int_Var_Map_Tbl;

   --For IO Tags
   g_Chr_Io_Tags_Tbl Ty_Chr_Io_Tags_Tb_Tbl;

   --For Desc Fields
   g_Chr_Prnt_Tbl Ty_Prnt_Fld_Tbl;

   --For Summary
   g_Summary_Rec Rdtb_Fid_Summary%ROWTYPE;

   --For Trigger
   g_Trigger_Rec Rdtb_Notification_Triggers%ROWTYPE;

   --For Notifications
   g_Notification_Rec     Rdtb_Fid_Notifications%ROWTYPE;

   g_Int_Notif_Map_Tbl    Ty_Int_Notif_Fld_Map;

   g_Chr_Notif_Map_Tbl    Ty_Chr_Notif_Fld_Map;

   g_Notification_Trigger Rdtb_Fid_Notif_Triggers%ROWTYPE;

   --Preferences
   g_Function_Preferencs Ty_Function_Preferences;

   --Generate Options
   g_Main_Spc               VARCHAR2(10);

   g_Main_Sql               VARCHAR2(10);

   g_Kernel_Spc             VARCHAR2(10);

   g_Kernel_Sql             VARCHAR2(10);

   g_Cluster_Spc            VARCHAR2(10);

   g_Cluster_Sql            VARCHAR2(10);

   g_Custom_Spc             VARCHAR2(10);

   g_Custom_Sql             VARCHAR2(10);

   g_Customer_Spc           VARCHAR2(10);

   g_Customer_Sql           VARCHAR2(10);

   g_Notif_Trg              VARCHAR2(10);

   g_Xsd_Files              VARCHAR2(10);
   --upload package
   g_Upload_Spc  VARCHAR2(10);
   g_Upload_Sql  VARCHAR2(10);
   g_Upload_ddl VARCHAR2(10);
   g_Upload_trg VARCHAR2(10);
   g_Upload_Table_Found  BOOLEAN:= FALSE;
   --XSD ANNOTATION
   g_Xsd_Annotated_files    VARCHAR2(10);

   g_Uixml                  VARCHAR2(10);

   g_Label_Xml              VARCHAR2(10);

   g_Sys_Js                 VARCHAR2(10);

   g_Excel_Template         VARCHAR2(10);

   g_Screen_Htmls           VARCHAR2(10);

   g_Screen_Htmls_With_Data VARCHAR2(10);

   g_Data_Xmls              VARCHAR2(10);
   g_config_files           VARCHAR2(10);
   g_wsdl_file              VARCHAR2(10);
   g_impl_file              VARCHAR2(10);
   g_Ant_Scripts             VARCHAR2(10);

   --INC Options
   g_Variable_Mapping     VARCHAR2(10);

   g_Menu_Details         VARCHAR2(10);

   g_Label_Details        VARCHAR2(10);

   g_Amend_Details        VARCHAR2(10);

   g_Summary_Details      VARCHAR2(10);

   g_Screen_Details       VARCHAR2(10);

   g_Lov_Details          VARCHAR2(10);

   g_Block_Pk_Cols        VARCHAR2(10);

   g_Call_Form_Details    VARCHAR2(10);

   g_Block_Details        VARCHAR2(10);

   g_Datascr_Details      VARCHAR2(10);

   g_Function_Call_Forms  VARCHAR2(10);

   g_Gateway_Details      VARCHAR2(10);

   g_Notification_Details VARCHAR2(10);

   g_Function_Parameters  VARCHAR2(10);

   g_xsd_details   VARCHAR2(10);

   g_Incs VARCHAR2(10) := 'N';
   --purge definition
   g_Purge_Details VARCHAR2(10);
   g_Archive_Tbl_ddl  VARCHAR2(10);
   --DDl Related
   g_Batch_Ref VARCHAR2(32767);

   --Constants
   c_Maker   CONSTANT VARCHAR2(100) := 'RADTOOL';

   c_Checker CONSTANT VARCHAR2(100) := 'RADTOOL';

   c_Pck_Type_Main     CONSTANT VARCHAR2(100) := 'MAIN';

   c_Pck_Type_Kernel   CONSTANT VARCHAR2(100) := 'KERNEL';

   c_Pck_Type_Cluster  CONSTANT VARCHAR2(100) := 'CLUSTER';

   c_Pck_Type_Custom   CONSTANT VARCHAR2(100) := 'CUSTOM';

   c_Pck_Type_Customer CONSTANT VARCHAR2(100) := 'CUSTOMER';

   c_Hdr_Tmp_None    CONSTANT VARCHAR2(100) := 'NONE';

   c_Hdr_Tmp_Process CONSTANT VARCHAR2(100) := 'PROCESS';

   c_Ftr_Tmp_None          CONSTANT VARCHAR2(100) := 'NONE';

   c_Ftr_Tmp_Maint_Audit   CONSTANT VARCHAR2(100) := 'MAINTAUDIT';

   c_Ftr_Tmp_Maint_Process CONSTANT VARCHAR2(100) := 'MAINTPROCESS';

   c_Func_Categ_Maintenance       CONSTANT VARCHAR2(100) := 'MAINTENANCE';

   c_Func_Categ_Transaction       CONSTANT VARCHAR2(100) := 'TRANSACTION';

   c_Func_Categ_Report            CONSTANT VARCHAR2(100) := 'REPORT';

   c_Func_Categ_Others            CONSTANT VARCHAR2(100) := 'OTHERS';

   c_Func_Categ_Notification      CONSTANT VARCHAR2(100) := 'NOTIFICATION';

   c_Func_Categ_Notif_Trg         CONSTANT VARCHAR2(100) := 'NOTIFICATIONTRIGGER';

   c_Func_Categ_Generic_Interface CONSTANT VARCHAR2(100) := 'GENERICINTERFACE';
   --Wsdl Generator
   c_Func_Categ_Webservice        CONSTANT VARCHAR2(100) := 'WEBSERVICE';
   --Purge Entity Definition
   c_Func_Categ_Purge_Entity      CONSTANT VARCHAR2(100) := 'PURGE_ENTITY';
   c_App_Func_Type_Fccmaintenance CONSTANT VARCHAR2(100) := 'FCCMAINTENANCE';

   c_App_Func_Type_Othmaintenance CONSTANT VARCHAR2(100) := 'MAINTENANCE';

   c_App_Func_Type_Transaction    CONSTANT VARCHAR2(100) := 'TRANSACTION';

   c_App_Func_Type_Dashboard      CONSTANT VARCHAR2(100) := 'DASHBOARD';

   c_App_Func_Type_Notification   CONSTANT VARCHAR2(100) := 'NOTIFICATION';

   c_App_Func_Type_Report         CONSTANT VARCHAR2(100) := 'REPORT';

   c_App_Func_Type_Others         CONSTANT VARCHAR2(100) := 'OTHERS';

   c_Func_Type_Child  CONSTANT VARCHAR2(100) := 'C';

   c_Func_Type_Parent CONSTANT VARCHAR2(100) := 'P';

   c_Datasrc_Func_Udf CONSTANT VARCHAR2(100) := 'CSTM_FUNCTION_USERDEF_FIELDS';

   c_Datasrc_Txn_Udf  CONSTANT VARCHAR2(100) := 'CSTM_CONTRACT_USERDEF_FIELDS';

   c_Pck_Handler   CONSTANT VARCHAR2(100) := 'Cspks_Req_Handler';

   c_Pck_Utils     CONSTANT VARCHAR2(100) := 'Cspks_Req_Utils';

   c_Pck_Global    CONSTANT VARCHAR2(100) := 'Cspks_Req_Global';

   c_Pck_Rep_Utils CONSTANT VARCHAR2(100) := 'Cspks_Req_Utils';

   c_Syn_Handler   CONSTANT VARCHAR2(100) := 'Cspkss_Req_Handler';

   c_Syn_Utils     CONSTANT VARCHAR2(100) := 'Cspkss_Req_Utils';

   c_Syn_Global    CONSTANT VARCHAR2(100) := 'Cspkss_Req_Global';

   c_Syn_Rep_Utils CONSTANT VARCHAR2(100) := 'Cspkss_Req_Utils';
   --Purge
   c_Pck_Purge_Utils CONSTANT VARCHAR2(100) := 'Cspks_Purge_Utils';
   c_Syn_Purge_Utils CONSTANT VARCHAR2(100) := 'Cspkss_Purge_Utils';
   c_Datasrc_Purge_Master CONSTANT VARCHAR2(100) := 'STTM_PURGE_MASTER';
   c_Datasrc_Purge_Tables CONSTANT VARCHAR2(100) := 'STTM_PURGE_TBL_DETAILS';
   c_Datasrc_Purge_Filters CONSTANT VARCHAR2(100) := 'STTM_PURGE_FILTERS';
   c_Datasrc_Purge_Log_Master CONSTANT VARCHAR2(100) := 'STTM_PURGE_LOG';
   c_Datasrc_Purge_Log_Dtl CONSTANT VARCHAR2(100) := 'STTM_PURGE_LOG_DETAILS';
   c_Datasrc_Purge_Staging CONSTANT VARCHAR2(100) := 'STTB_PURGE_STAGING';
   --Purge
   --shihab trax
   c_Service_Endpoint_interface CONSTANT VARCHAR2(20) := 'SEI';
   --shihab trax
   c_summary_datasrc          CONSTANT VARCHAR2(100) := 'SUMMARYDSN';
   c_File_Type_Sql            CONSTANT VARCHAR2(100) := 'SQL';

   c_File_Type_Spc            CONSTANT VARCHAR2(100) := 'SPC';

   c_File_Type_Inc            CONSTANT VARCHAR2(100) := 'INC';

   c_File_Type_Scr            CONSTANT VARCHAR2(100) := 'SCR';

   c_File_Type_Xsd            CONSTANT VARCHAR2(100) := 'XSD';

   c_File_Type_Uixml          CONSTANT VARCHAR2(100) := 'UIXML';

   c_File_Type_Js             CONSTANT VARCHAR2(100) := 'JS';

   c_File_Type_Sys_Js         CONSTANT VARCHAR2(100) := 'SYSJS';

   c_File_Type_Kernel_Js      CONSTANT VARCHAR2(100) := 'KERNELJS';

   c_File_Type_Cluster_Js     CONSTANT VARCHAR2(100) := 'CLUSTERJS';

   c_File_Type_Custom_Js      CONSTANT VARCHAR2(100) := 'CUSTOMJS';

   c_File_Type_Customer_Js    CONSTANT VARCHAR2(100) := 'CUSTOMERJS';

   c_File_Type_Trg            CONSTANT VARCHAR2(100) := 'TRG';

   c_File_Type_Html           CONSTANT VARCHAR2(100) := 'HTML';

   c_File_Type_Html_With_Data CONSTANT VARCHAR2(100) := 'HTMLWITHDATA';

   c_File_Type_Excel          CONSTANT VARCHAR2(100) := 'EXCEL';

   c_File_Type_Data_Xml       CONSTANT VARCHAR2(100) := 'DATAXML';
   --shihab trax
   c_File_Type_Config_xml       CONSTANT VARCHAR2(100) := 'CONFIG';
   c_File_Type_Impl_java        CONSTANT VARCHAR2(100) := 'IMPL';
   c_File_Type_wsdl             CONSTANT VARCHAR2(100) := 'WSDL';

   --shihab trax
   --purge defintion
   c_File_Type_ddl       CONSTANT VARCHAR2(100) := 'DDL';

   FUNCTION Fn_Process_Request RETURN BOOLEAN;

END Rdpks_Gen;
/
CREATE OR REPLACE Synonym Rdpkss_Gen FOR Rdpks_Gen
/