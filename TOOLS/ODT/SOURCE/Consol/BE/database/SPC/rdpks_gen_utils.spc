CREATE OR REPLACE PACKAGE Rdpks_Gen_Utils AS
   /*-----------------------------------------------------------------------------------------------------
   **
   ** File Name    : Rdpks_Gen_Utils.Spc
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

   PROCEDURE Put(p_File   IN VARCHAR2
                ,p_Line   IN VARCHAR2
                ,New_Line IN VARCHAR2);
   FUNCTION Fn_Get_Fid_Label_Desc(p_Label_Code IN VARCHAR2) RETURN VARCHAR2;
   PROCEDURE Put_File_Name(p_File_Type IN VARCHAR2
                          ,p_File_Name IN VARCHAR2);
   PROCEDURE Pr_Add_To_File_List(p_File_Type   IN VARCHAR2
                                ,p_File_Name   IN VARCHAR2
                                ,p_File_Status IN VARCHAR2);
   PROCEDURE Pr_Indent(p_Text   IN OUT VARCHAR2
                      ,New_Line IN VARCHAR2);
   FUNCTION Pr_SplitColVaule(p_Text IN VARCHAR2) RETURN VARCHAR2 ;
   --upload package
   FUNCTION Fn_Get_Table_Synonym(p_Table IN VARCHAR2) RETURN VARCHAR2 ;
   FUNCTION Fn_Get_Table_Lvl(p_Dsn IN VARCHAR2) RETURN NUMBER;
   FUNCTION Fn_Get_Mapped_Tbl_To_Upld(p_Dsn IN VARCHAR2) RETURN VARCHAR2;
   --upload package
   FUNCTION Fn_Get_Table(p_Tab IN VARCHAR2) RETURN VARCHAR2;

   FUNCTION Fn_Get_Variable(p_Node IN VARCHAR2) RETURN VARCHAR2;

   FUNCTION Fn_Get_Old_Variable(p_Tab IN VARCHAR2) RETURN VARCHAR2;

   FUNCTION Fn_Get_Null_Default(p_Data_Type IN VARCHAR2) RETURN VARCHAR2;
   FUNCTION Fn_Get_Datasrc_Columns(p_Datasrc IN VARCHAR2) RETURN VARCHAR2;

   FUNCTION Fn_Get_Block_Fields(p_Block_Name IN VARCHAR2) RETURN VARCHAR2;

   PROCEDURE Pr_Set_Datasrc_Columns(p_Datasrc     IN VARCHAR2
                                   ,p_Column_List IN VARCHAR2);

   PROCEDURE Pr_Set_Block_Fields(p_Block_Name IN VARCHAR2
                                ,p_Field_List IN VARCHAR2);

   FUNCTION Fn_Get_Block_Fldtag_Fields(p_Block_Name      IN VARCHAR2
                                      ,p_Field_Name_List IN OUT VARCHAR2
                                      ,p_Xsd_Tag_List    IN OUT VARCHAR2
                                      ,p_Dbc_List        IN OUT VARCHAR2
                                      ,p_Dbt_List        IN OUT VARCHAR2
                                      ,p_Dtyp_List       IN OUT VARCHAR2) RETURN BOOLEAN;

   FUNCTION Fn_Get_Block_Io_Fields(p_Block_Name      IN VARCHAR2
                                  ,p_Action_Code     IN VARCHAR2
                                  ,p_Io_Field_List   IN OUT VARCHAR2
                                  ,p_Io_Xsd_Tag_List IN OUT VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Get_Node_Lvl(p_Dsn IN VARCHAR2) RETURN NUMBER;

   FUNCTION Fn_Get_Blk_Lvl(p_Blk IN VARCHAR2) RETURN NUMBER;

   FUNCTION Fn_Get_Rel(p_Relation IN VARCHAR2) RETURN VARCHAR2;

   FUNCTION Fn_Strip_Orderby(p_Order IN VARCHAR2) RETURN VARCHAR2;

   FUNCTION Fn_Strip_Where(p_Where IN VARCHAR2) RETURN VARCHAR2;

   FUNCTION Fn_Get_Where_Columns(p_Where_Clause IN VARCHAR2) RETURN VARCHAR2;

   FUNCTION Fn_Get_Orderby_Columns(p_Orderby_Clause IN VARCHAR2) RETURN VARCHAR2;

   FUNCTION Fn_Get_Rel_Tbl(p_Relation IN VARCHAR2) RETURN Rdpks_Gen.Ty_Rel_Tbl;

   FUNCTION Fn_Get_Corres_Tag(p_List1 IN VARCHAR2
                             ,p_List2 IN VARCHAR2
                             ,p_Tag1  IN VARCHAR2
                             ,p_Tag2  IN OUT VARCHAR2) RETURN BOOLEAN;

   FUNCTION Fn_Change_History(p_Type      VARCHAR2
                             ,p_File_Name VARCHAR2
                             ,p_Sql_Spc   VARCHAR2) RETURN VARCHAR2;

   PROCEDURE Pr_Print_Xsd_Node(p_File       IN VARCHAR2
                              ,p_Block_Name IN VARCHAR2
                              ,p_Xsd_Node   IN VARCHAR2);
   FUNCTION Fn_Get_Pck(p_Fid      IN VARCHAR2
                      ,p_Pck_Type IN VARCHAR2
                      ,p_Rel_Type IN VARCHAR2) RETURN VARCHAR2;
   FUNCTION Fn_Get_Syn(p_Fid      IN VARCHAR2
                      ,p_Pck_Type IN VARCHAR2
                      ,p_Rel_Type IN VARCHAR2) RETURN VARCHAR2;

   FUNCTION Fn_Get_Compare_Cond(p_Parent     IN VARCHAR2
                               ,p_Child      IN VARCHAR2
                               ,p_Parent_Lbl IN VARCHAR2
                               ,p_Child_Lbl  IN VARCHAR2
                               ,p_Relation   IN VARCHAR2) RETURN VARCHAR2;

   FUNCTION Fn_Get_Fld(p_Node IN VARCHAR2
                      ,p_Dbc  IN VARCHAR2) RETURN VARCHAR2;

   FUNCTION Fn_Get_Blk(p_Node IN VARCHAR2
                      ,p_Dbc  IN VARCHAR2) RETURN BOOLEAN;

   FUNCTION Fn_Get_Blk(p_Node IN VARCHAR2) RETURN BOOLEAN;

   FUNCTION Fn_Loc_Key(p_Node      IN VARCHAR2
                      ,p_Var       IN VARCHAR2
                      ,p_Eff_Cols  IN VARCHAR2
                      ,p_Eff_Types IN VARCHAR2) RETURN VARCHAR2;
   FUNCTION Fn_Get_Nonpk_Cols(p_Node        IN VARCHAR2
                             ,p_Nonpk_Cols  IN OUT VARCHAR2
                             ,p_Nonpk_Types IN OUT VARCHAR2) RETURN BOOLEAN;

   FUNCTION Fn_Get_Eff_Keys(p_Node      IN VARCHAR2
                           ,p_Join      IN VARCHAR2
                           ,p_Eff_Cols  IN OUT VARCHAR2
                           ,p_Eff_Types IN OUT VARCHAR2) RETURN BOOLEAN;

   FUNCTION Fn_Get_Eff_Mand(p_Node      IN VARCHAR2
                           ,p_Eff_Cols  IN OUT VARCHAR2
                           ,p_Eff_Types IN OUT VARCHAR2) RETURN BOOLEAN;

   FUNCTION Fn_Get_Upd_Cols(p_Node        IN VARCHAR2
                           ,p_Nonpk_Cols  IN OUT VARCHAR2
                           ,p_Nonpk_Types IN OUT VARCHAR2) RETURN BOOLEAN;

   FUNCTION Fn_Bld_Where(p_Node VARCHAR2
                        ,p_Var  VARCHAR2) RETURN VARCHAR2;

   FUNCTION Fn_Bld_Where_With_Dflt(p_Node VARCHAR2
                                  ,p_Var  VARCHAR2) RETURN VARCHAR2;

   FUNCTION Fn_Get_Desc_Field_Val(p_Req_Type     IN VARCHAR2
                                 ,p_Desc_Field   IN VARCHAR2
                                 ,p_Desc_Blk     IN VARCHAR2
                                 ,p_Fld          IN VARCHAR2
                                 ,p_Blk          IN VARCHAR2
                                 ,p_Curr_Rec_Tag IN VARCHAR2
                                 ,p_Var_Type     IN VARCHAR2
                                 ,p_Ret_Code     IN OUT VARCHAR2) RETURN BOOLEAN;

   FUNCTION Fn_Get_Block_Presence_If(p_Blk              VARCHAR2
                                    ,p_Consider_In_Only IN VARCHAR2
                                    ,p_In_Only          IN OUT VARCHAR2) RETURN VARCHAR2;
   FUNCTION Fn_Get_Hook_Control_Details(p_Hook_No            IN NUMBER
                                       ,p_Hook_Stage_Type    IN VARCHAR2
                                       ,p_Hook_Reqd          IN OUT BOOLEAN
                                       ,p_Parent_Hook_Reqd   IN OUT BOOLEAN
                                       ,p_Hook_Pck           IN OUT VARCHAR2
                                       ,p_Parent_Hook_Pck    IN OUT VARCHAR2
                                       ,p_Hook_Skip_Function   IN OUT VARCHAR2
                                       ,p_Curr_Stage_Skip_Reqd IN VARCHAR2 DEFAULT 'N') RETURN BOOLEAN;
   FUNCTION Fn_Remove_Subqueries(p_Clause IN VARCHAR2) RETURN VARCHAR2;
   FUNCTION Fn_Strip_Sql_Functions(p_Field IN VARCHAR2) RETURN VARCHAR2 ;
END Rdpks_Gen_Utils;
/
CREATE OR REPLACE Synonym Rdpkss_Gen_Utils FOR Rdpks_Gen_Utils
/