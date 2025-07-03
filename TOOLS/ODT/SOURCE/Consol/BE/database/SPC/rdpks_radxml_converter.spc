CREATE OR REPLACE PACKAGE RDPKS_RADXML_CONVERTER AS
   /*-----------------------------------------------------------------------------------------------------
   **
   ** File Name    : RDPKS_RADXML_CONVERTER.SPC
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
   --Types For Data Sources
   TYPE Ty_Chr_Tbl IS TABLE OF VARCHAR2(32767) INDEX BY PLS_INTEGER;

   TYPE Ty_Node_Rec IS RECORD(
      Datasrc_Name         VARCHAR2(32767),
      Datasrc_Level        NUMBER,
      Datasrc_Alias        VARCHAR2(32767),
      Parent_Datasrc       VARCHAR2(32767),
      Relation_With_Parent VARCHAR2(32767),
      Relation_Type        VARCHAR2(32767),
      Multi_Record         VARCHAR2(1),
      Dflt_Where           VARCHAR2(32767),
      Is_Querysrc          VARCHAR2(32767),
      For_Summary          VARCHAR2(32767),
      Is_Mandatory         VARCHAR2(32767),
      Xsd_Node             VARCHAR2(32767),
      Required             VARCHAR2(32767));

   TYPE Ty_Tb_Chr_Node_Data IS TABLE OF Ty_Node_Rec INDEX BY VARCHAR2(500);
   TYPE Ty_Tb_Int_Node_Data IS TABLE OF Ty_Node_Rec INDEX BY PLS_INTEGER;

   --DSN Fields
   TYPE Ty_Dbt_Rec IS RECORD(
      Field_Name          VARCHAR2(32767),
      Parent_Field        VARCHAR2(32767),
      Field_Drvd          VARCHAR2(32767),
      Field_Type          VARCHAR2(32767),
      Accesskey_Code      VARCHAR2(32767),
      Label_Code          VARCHAR2(32767),
      Image_Src           VARCHAR2(32767),
      Required            VARCHAR2(32767),
      Select_Multiple     VARCHAR2(32767),
      Datasource          VARCHAR2(32767),
      Datafield           VARCHAR2(32767),
      Max_Length          VARCHAR2(32767),
      Auth_Screen         VARCHAR2(32767),
      VALUE               VARCHAR2(32767),
      Mask                VARCHAR2(32767),
      Default_Value       VARCHAR2(32767),
      Related_Field       VARCHAR2(32767),
      Summary_Query       VARCHAR2(32767),
      Col_Heading         VARCHAR2(32767),
      Lov_Name            VARCHAR2(32767),
      Popedit_Required    VARCHAR2(32767),
      Alt_Image           VARCHAR2(32767),
      Datatype            VARCHAR2(32767),
      Function_Id         VARCHAR2(32767),
      Datasrc_Name        VARCHAR2(32767),
      Field_Id            VARCHAR2(32767),
      Summary_Result      VARCHAR2(32767),
      Summary_Advanced    VARCHAR2(32767),
      Label_Link          VARCHAR2(32767),
      Option_Link         VARCHAR2(32767),
      Calendar_Text       VARCHAR2(32767),
      Block_Name          VARCHAR2(32767),
      Input_Only_By_Lov   VARCHAR2(32767),
      Xsd_Tag             VARCHAR2(32767),
      Horizontal_Fieldset VARCHAR2(32767),
      Desc_Field          VARCHAR2(32767));

   TYPE Ty_Chr_Dbt_Data IS TABLE OF Ty_Dbt_Rec INDEX BY VARCHAR2(500);
   TYPE Ty_Chr_Dbt_Tbl IS TABLE OF Ty_Chr_Dbt_Data INDEX BY VARCHAR2(500);
   --Options
   TYPE Ty_Option_Rec IS RECORD(
      Function_Id     VARCHAR2(100),
      Node_Name       VARCHAR2(100),
      Field_Name      VARCHAR2(100),
      Field_Value     VARCHAR2(100),
      Data_Type       VARCHAR2(100),
      Option_Lbl_Code VARCHAR2(100),
      Option_Value    VARCHAR2(100),
      Selected        VARCHAR2(10));
   TYPE Ty_Option_Opt IS TABLE OF Ty_Option_Rec INDEX BY PLS_INTEGER;
   TYPE Ty_Option_Tbl IS TABLE OF Ty_Option_Opt INDEX BY VARCHAR2(500);

   --Rad Field Events
   TYPE Ty_Fevent_Rec IS RECORD(
      Event_Name       VARCHAR2(32767),
      Function_Name    VARCHAR2(32767),
      Launch_Subscreen VARCHAR2(32767),
      Subscreen_Name   VARCHAR2(32767),
      Launch_Callform  VARCHAR2(32767),
      Callform_Name    VARCHAR2(32767),
      Callform_Screen  VARCHAR2(32767));
   TYPE Ty_Fevent_Fld IS TABLE OF Ty_Fevent_Rec INDEX BY PLS_INTEGER;
   TYPE Ty_Fevent_Tbl IS TABLE OF Ty_Fevent_Fld INDEX BY VARCHAR2(500);

   --Screens
   TYPE Ty_Scr_Rec IS RECORD(
      Screen_Name       VARCHAR2(32767),
      Screen_Type       VARCHAR2(32767),
      Screen_Title      VARCHAR2(32767),
      Screen_Height     VARCHAR2(32767),
      Screen_Width      VARCHAR2(32767),
      Screen_Position   VARCHAR2(32767),
      Tmp_Screen_Type   VARCHAR2(32767),
      Version_Btn_Reqd  VARCHAR2(32767),
      Close_Button_Type VARCHAR2(32767));
   TYPE Ty_Scr_Int_Tbl IS TABLE OF Ty_Scr_Rec INDEX BY PLS_INTEGER;
   TYPE Ty_Scr_Chr_Tbl IS TABLE OF Ty_Scr_Rec INDEX BY VARCHAR2(500);

   --Blocks
   TYPE Ty_Blk_Rec IS RECORD(
      Block_Id              VARCHAR2(32767),
      New_Block_Id          VARCHAR2(32767),
      Block_Type            VARCHAR2(32767),
      Xsd_Node              VARCHAR2(32767),
      Block_Tag             VARCHAR2(32767),
      Block_Level           NUMBER,
      Primary_Dsn           VARCHAR2(32767),
      Relation_Type         VARCHAR2(32767),
      Block_Parent          VARCHAR2(32767),
      Multi_Record          VARCHAR2(32767),
      Block_Title           VARCHAR2(32767),
      View_Type             VARCHAR2(32767),
      Screen_Name           VARCHAR2(32767),
      Datasrc_Name          VARCHAR2(32767),
      Tab_Name              VARCHAR2(32767),
      Has_Default_Ok_Cancel VARCHAR2(32767),
      Has_Default_Cancel    VARCHAR2(32767),
      Read_Only_Blk         VARCHAR2(32767),
      Blk_Width             VARCHAR2(32767),
      Blk_Height            VARCHAR2(32767),
      Blk_Abspos            VARCHAR2(32767),
      Blk_Rows              VARCHAR2(32767),
      Blk_Cols              VARCHAR2(32767),
      Blk_Fields            VARCHAR2(32767),
      Section               VARCHAR2(32767),
      PARTITION             VARCHAR2(32767),
      SUBPARTITION          VARCHAR2(32767),
      Nav_Added             VARCHAR2(32767));
   TYPE Ty_Blk_Int_Tbl IS TABLE OF Ty_Blk_Rec INDEX BY PLS_INTEGER;
   TYPE Ty_Blk_Chr_Tbl IS TABLE OF Ty_Blk_Rec INDEX BY VARCHAR2(500);

   TYPE Ty_Blk_Dsn_Rec IS RECORD(
      Dbc_List     VARCHAR2(32767),
      Type_List    VARCHAR2(32767),
      Datasrc_Name VARCHAR2(32767));

   TYPE Ty_Blk_Dsn_Tb IS TABLE OF Ty_Blk_Dsn_Rec INDEX BY VARCHAR2(500);
   TYPE Ty_Blk_Dsn_Tbl IS TABLE OF Ty_Blk_Dsn_Tb INDEX BY VARCHAR2(500);

   TYPE Ty_Int_Blk_Dsn_Tb IS TABLE OF Ty_Blk_Dsn_Rec INDEX BY PLS_INTEGER;
   TYPE Ty_Int_Blk_Dsn_Tbl IS TABLE OF Ty_Int_Blk_Dsn_Tb INDEX BY VARCHAR2(500);

   --Block Fields
   TYPE Ty_Bfl_Rec IS RECORD(
      Field_Name          VARCHAR2(32767),
      Parent_Field        VARCHAR2(32767),
      Field_Id            VARCHAR2(32767),
      Field_Drvd          VARCHAR2(32767),
      Act_New_Field_Name  VARCHAR2(32767),
      New_Field_Name      VARCHAR2(32767),
      Xsd_Tag             VARCHAR2(32767),
      Field_Type          VARCHAR2(32767),
      Screen_Name         VARCHAR2(32767),
      Tab_Name            VARCHAR2(32767),
      Label_Code          VARCHAR2(32767),
      Label_Link          VARCHAR2(32767),
      Abs_Pos             VARCHAR2(32767),
      Field_Size          VARCHAR2(32767),
      Max_Length          VARCHAR2(32767),
      Width               VARCHAR2(32767),
      Height              VARCHAR2(32767),
      Text_Align          VARCHAR2(32767),
      Hide                VARCHAR2(32767),
      Read_Only           VARCHAR2(32767),
      Disabled            VARCHAR2(32767),
      Checked             VARCHAR2(32767),
      Query_Col           VARCHAR2(32767),
      Result_Col          VARCHAR2(32767),
      Txtarea_Rows        VARCHAR2(32767),
      Txtarea_Cols        VARCHAR2(32767),
      Show_In             VARCHAR2(32767),
      Img_Src             VARCHAR2(32767),
      Alt_Image           VARCHAR2(32767),
      Field_Row           VARCHAR2(32767),
      Field_Column        VARCHAR2(32767),
      Dbt                 VARCHAR2(32767),
      Dbc                 VARCHAR2(32767),
      Tabindex            VARCHAR2(32767),
      Accesskey_Code      VARCHAR2(32767),
      Related_Field       VARCHAR2(32767),
      Chk_Uppercase       VARCHAR2(32767),
      Amendable           VARCHAR2(32767),
      Subsystem_Dependant VARCHAR2(32767),
      Min_Val             VARCHAR2(32767),
      Max_Val             VARCHAR2(32767),
      Max_Decimal         VARCHAR2(32767),
      Section_Name        VARCHAR2(32767),
      Partition_Name      VARCHAR2(32767),
      Subpartition_Name   VARCHAR2(32767),
      Fieldset_Name       VARCHAR2(32767),
      Field_Reqd          VARCHAR2(32767),
      Desc_Field          VARCHAR2(32767));
   TYPE Ty_Bfl_Int_Tbl IS TABLE OF Ty_Bfl_Rec INDEX BY PLS_INTEGER;
   TYPE Ty_Int_Bfl_Tbl IS TABLE OF Ty_Bfl_Int_Tbl INDEX BY VARCHAR2(500);

   TYPE Ty_Bfl_Chr_Tbl IS TABLE OF Ty_Bfl_Rec INDEX BY VARCHAR2(500);
   TYPE Ty_Bfl_Tbl IS TABLE OF Ty_Bfl_Chr_Tbl INDEX BY VARCHAR2(500);

   TYPE Ty_Vc_Array IS TABLE OF VARCHAR2(32767) INDEX BY VARCHAR2(500);

   --Tabs
   TYPE Ty_Tab_Rec IS RECORD(
      Tab_Name       VARCHAR2(32767),
      Screen_Name    VARCHAR2(32767),
      Screen_Portion VARCHAR2(32767),
      Tab_Id         VARCHAR2(32767),
      Tab_Index      VARCHAR2(32767),
      Tab_Label      VARCHAR2(32767),
      Tab_Access_Key VARCHAR2(32767),
      Tab_Height     VARCHAR2(32767),
      Tab_Type       VARCHAR2(32767),
      Tab_Src        VARCHAR2(32767));

   TYPE Ty_Tab_Int_Tbl IS TABLE OF Ty_Tab_Rec INDEX BY PLS_INTEGER;
   TYPE Ty_Tab_Chr_Tbl IS TABLE OF Ty_Tab_Rec INDEX BY VARCHAR2(500);

   --Sections
   TYPE Ty_Sec_Rec IS RECORD(
      Section_Sl_No  VARCHAR2(32767),
      Tab_Name       VARCHAR2(32767),
      Tab_Id         VARCHAR2(32767),
      Section_Id     VARCHAR2(32767),
      Section_Height VARCHAR2(32767),
      Screen_Name    VARCHAR2(32767));

   TYPE Ty_Sec_Int_Tbl IS TABLE OF Ty_Sec_Rec INDEX BY PLS_INTEGER;
   --Partitions
   TYPE Ty_Prt_Rec IS RECORD(
      Partition_Sl_No VARCHAR2(32767),
      Section_Id      VARCHAR2(32767),
      Partition_Id    VARCHAR2(32767),
      Partition_Name  VARCHAR2(32767),
      Partition_Width VARCHAR2(32767),
      Screen_Name     VARCHAR2(32767),
      Tab_Name        VARCHAR2(32767),
      Tab_Id          VARCHAR2(32767));

   TYPE Ty_Prt_Int_Tbl IS TABLE OF Ty_Prt_Rec INDEX BY PLS_INTEGER;

   --SubPartitions
   TYPE Ty_Spt_Rec IS RECORD(
      --Section_Id        VARCHAR2(32767),
      Subpartition_Id   VARCHAR2(32767),
      Subpartition_Name VARCHAR2(32767),
      Screen_Name       VARCHAR2(32767),
      Tab_Name          VARCHAR2(32767),
      Tab_Id            VARCHAR2(32767),
      Section_Id        VARCHAR2(32767),
      Partition_Name    VARCHAR2(32767),
      Partition_Id      VARCHAR2(32767));

   TYPE Ty_Spt_Int_Tbl IS TABLE OF Ty_Spt_Rec INDEX BY PLS_INTEGER;

   --Field Sets

   TYPE Ty_Fst_Rec IS RECORD(
      Fst_Name       VARCHAR2(32767),
      Fst_Drvd       VARCHAR2(32767),
      Fst_Type       VARCHAR2(32767),
      Fst_Id         VARCHAR2(32767),
      Fst_Label      VARCHAR2(32767),
      Fst_New_Name   VARCHAR2(32767),
      Fieldset_Index VARCHAR2(32767),
      Fst_Dsn        VARCHAR2(32767),
      Fst_Screen     VARCHAR2(32767),
      Fst_Portion    VARCHAR2(32767),
      Fst_Tab        VARCHAR2(32767),
      Fst_Section    VARCHAR2(32767),
      Fst_Partition  VARCHAR2(32767),
      Fst_Block      VARCHAR2(32767),
      Fst_Fields     VARCHAR2(32767),
      Subprt_List    VARCHAR2(32767),
      Index_List     VARCHAR2(32767));

   TYPE Ty_Fst_Int_Tbl IS TABLE OF Ty_Fst_Rec INDEX BY PLS_INTEGER;
   TYPE Ty_Fst_Chr_Tbl IS TABLE OF Ty_Fst_Rec INDEX BY VARCHAR2(500);

   --For LOVS
   TYPE Ty_Lov_Rec IS RECORD(
      Lov_Name             VARCHAR2(32767),
      Lov_Blk              VARCHAR2(32767),
      Form_Name            VARCHAR2(32767),
      Form_Title           VARCHAR2(32767),
      Fetch_Rows           VARCHAR2(32767),
      Data_Pg_Size         VARCHAR2(32767),
      Lov_Query            VARCHAR2(32767),
      Query_Cols_List      VARCHAR2(32767),
      Datatype_List        VARCHAR2(32767),
      Return_Fld_Name_List VARCHAR2(32767),
      Redn_Fld_Name_List   VARCHAR2(32767),
      Redn_Fld_Label_List  VARCHAR2(32767),
      Redn_Fld_Type_List   VARCHAR2(32767),
      Col_Heading_List     VARCHAR2(32767),
      Redn_Fld_Flag_List   VARCHAR2(32767),
      Bind_Var_Name_List   VARCHAR2(32767),
      Bind_Var_Type_List   VARCHAR2(32767));

   TYPE Ty_Lov_Int_Tbl IS TABLE OF Ty_Lov_Rec INDEX BY PLS_INTEGER;
   TYPE Ty_Lov_Chr_Tbl IS TABLE OF Ty_Lov_Rec INDEX BY VARCHAR2(500);

   --For Web Services
   TYPE Ty_Wsr_Rec IS RECORD(
      Serial_No      VARCHAR2(32767),
      Action_Code    VARCHAR2(32767),
      Service_Name   VARCHAR2(32767),
      Operation_Code VARCHAR2(32767),
      Include        VARCHAR2(32767));
   TYPE Ty_Wsr_Int_Tbl IS TABLE OF Ty_Wsr_Rec INDEX BY PLS_INTEGER;
   TYPE Ty_Wsr_Chr_Tbl IS TABLE OF Ty_Wsr_Rec INDEX BY VARCHAR2(500);

   TYPE Ty_Actions_Rec IS RECORD(
      Applicable            VARCHAR2(32767),
      Action_Code           VARCHAR2(32767),
      Service_Name          VARCHAR2(32767),
      Operation_Code        VARCHAR2(32767),
      Webservice_Applicable VARCHAR2(32767));
   TYPE Ty_Act_Chr_Tbl IS TABLE OF Ty_Actions_Rec INDEX BY VARCHAR2(500);
   TYPE Ty_Act_Int_Tbl IS TABLE OF Ty_Actions_Rec INDEX BY PLS_INTEGER;

   --For Summary Custom Buttons
   TYPE Ty_Cbt_Rec IS RECORD(
      Custom_Field_Name VARCHAR2(32767),
      Custom_Labels     VARCHAR2(32767),
      Custom_Event_Name VARCHAR2(32767));
   TYPE Ty_Cbt_Int_Tbl IS TABLE OF Ty_Cbt_Rec INDEX BY PLS_INTEGER;
   TYPE Ty_Cbt_Chr_Tbl IS TABLE OF Ty_Cbt_Rec INDEX BY VARCHAR2(500);
   --Query
   TYPE Ty_Rqr_Rec IS RECORD(
      Query_Field_Name VARCHAR2(32767),
      Required         VARCHAR2(32767),
      Uppercase        VARCHAR2(32767),
      Read_Only        VARCHAR2(32767)
      
      );
   TYPE Ty_Rqr_Int_Tbl IS TABLE OF Ty_Rqr_Rec INDEX BY PLS_INTEGER;
   TYPE Ty_Rqr_Chr_Tbl IS TABLE OF Ty_Rqr_Rec INDEX BY VARCHAR2(500);

   --Query
   TYPE Ty_Rsl_Rec IS RECORD(
      Result_Field_Name VARCHAR2(32767),
      Forder            VARCHAR2(32767));
   TYPE Ty_Rsl_Int_Tbl IS TABLE OF Ty_Rsl_Rec INDEX BY PLS_INTEGER;
   TYPE Ty_Rsl_Chr_Tbl IS TABLE OF Ty_Rsl_Rec INDEX BY VARCHAR2(500);

   --Audit Fields
   TYPE Ty_Afl_Rec IS RECORD(
      Field_Name  VARCHAR2(32767),
      Chk_Include VARCHAR2(32767));
   TYPE Ty_Afl_Int_Tbl IS TABLE OF Ty_Afl_Rec INDEX BY PLS_INTEGER;
   TYPE Ty_Afl_Chr_Tbl IS TABLE OF Ty_Afl_Rec INDEX BY VARCHAR2(500);

   TYPE Ty_Spt_Map_Rec IS RECORD(
      Old_Spt_Name VARCHAR2(32767),
      New_Spt_Name VARCHAR2(32767));

   TYPE Ty_Spt_Mapper IS TABLE OF Ty_Spt_Map_Rec INDEX BY VARCHAR2(2000);

   --Call Forms
   TYPE Ty_Cal_Rec IS RECORD(
      Call_Form       VARCHAR2(32767),
      Call_Parent     VARCHAR2(32767),
      Call_Parent_Blk VARCHAR2(32767),
      Form_Type       VARCHAR2(32767),
      Rel_Type        VARCHAR2(32767),
      Relation        VARCHAR2(32767));

   TYPE Ty_Cal_Tbl IS TABLE OF Ty_Cal_Rec INDEX BY PLS_INTEGER;

   PROCEDURE Pr_Convert(p_Fid_Xml IN CLOB
                       ,p_New_Xml OUT CLOB
                       ,p_Status  IN OUT NUMBER
                       ,p_Error   IN OUT VARCHAR2);

   FUNCTION Fn_Convert(p_Fid_Xml IN CLOB
                      ,p_Status  IN OUT NUMBER
                      ,p_Error   IN OUT VARCHAR2) RETURN BOOLEAN;

   PROCEDURE pr_converter(p_fid_xml    IN CLOB,
                               p_rel_number IN VARCHAR2,
                               p_new_xml    OUT CLOB,
                               p_status     IN OUT NUMBER,
                               p_error      IN OUT VARCHAR2);

END rdpks_radxml_converter;
/
CREATE OR REPLACE SYNONYM  rdpkss_radxml_converter FOR rdpks_radxml_converter;
/
 