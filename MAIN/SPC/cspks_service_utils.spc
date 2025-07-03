CREATE OR REPLACE PACKAGE Cspks_Service_Utils AS
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
---------------------------------------------------------------------------------------------------
   CHANGE HISTORY
   SFR No             :Initial Version
   Changed By         :Radha
   Change Description :New Utils Package for Both Maintenance and Online Screens
   -------------------------------------------------------------------------------------------------------
   */
   TYPE Ty_Tb_Record_Data IS TABLE OF VARCHAR2(32767) INDEX BY VARCHAR2(255);
   TYPE Ty_Tb_Table_Data IS TABLE OF Ty_Tb_Record_Data INDEX BY PLS_INTEGER;
   TYPE Ty_Tb_Xml_Data IS TABLE OF Ty_Tb_Table_Data INDEX BY VARCHAR2(255);
   TYPE Rel_Rec IS RECORD(
      Ccol VARCHAR2(100),
      Pcol VARCHAR2(100));

   TYPE Ty_Rel_Tbl IS TABLE OF Rel_Rec INDEX BY PLS_INTEGER;
   TYPE Ty_Node_Rec IS RECORD(
      Node_Level    NUMBER(4),
      Node_Name     VARCHAR2(100),
      Node_Parent   VARCHAR2(100),
      Node_Relation VARCHAR2(32767),
      Node_Fields   VARCHAR2(32767),
      Node_Tags     VARCHAR2(32767),
      Query_Node    VARCHAR2(1),
      Node_Idx      NUMBER,
      Rel_Tbl       Ty_Rel_Tbl,
      Has_Childs    VARCHAR2(1),
      Child_List    VARCHAR2(4000));

   TYPE Ty_Tb_Chr_Node_Data IS TABLE OF Ty_Node_Rec INDEX BY VARCHAR2(500);
   TYPE Ty_Tb_Int_Node_Data IS TABLE OF Ty_Node_Rec INDEX BY PLS_INTEGER;

   TYPE Ty_Amend_Fileds IS TABLE OF Gwtm_Amend_Fields%ROWTYPE INDEX BY Gwtm_Amend_Fields.Field_Name%TYPE;
   TYPE Typ_Amend_Rec IS RECORD(
      Node_Params Gwtm_Amend_Nodes%ROWTYPE,
      Field_List  Ty_Amend_Fileds);

   TYPE Typ_Amend_Details IS TABLE OF Typ_Amend_Rec INDEX BY Gwtm_Amend_Nodes.Node_Name%TYPE;

   TYPE Typ_Field_Log IS TABLE OF Sttb_Field_Log%ROWTYPE INDEX BY BINARY_INTEGER;
   --New Amend types
   TYPE Ty_Int_Amend_Nodes IS TABLE OF Gwtm_Amend_Nodes%ROWTYPE INDEX BY BINARY_INTEGER;
   TYPE Ty_Amend_Nodes IS TABLE OF Gwtm_Amend_Nodes%ROWTYPE INDEX BY VARCHAR2(100);

   TYPE Ty_Int_Amend_Fields IS TABLE OF Gwtm_Amend_Fields%ROWTYPE INDEX BY BINARY_INTEGER;
   TYPE Ty_Amend_Fields IS TABLE OF Gwtm_Amend_Fields%ROWTYPE INDEX BY VARCHAR2(100);
   --ENd of New Types

   TYPE Ty_Tb_Ovd_Data IS TABLE OF VARCHAR2(32767) INDEX BY PLS_INTEGER;

   FUNCTION Fn_Getparam(p_Text_Clob IN CLOB
                       ,p_Pos       IN NUMBER
                       ,p_Sep       IN VARCHAR2 DEFAULT '~') RETURN VARCHAR2;
   FUNCTION Fn_Get_Master_Key_Data(p_Master_Node IN OUT VARCHAR2
                                  ,p_Key_Fields  IN OUT VARCHAR2
                                  ,p_Key_Vals    IN OUT VARCHAR2
                                  ,p_Err_Code    IN OUT VARCHAR2
                                  ,p_Err_Param   IN OUT VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Gen_Error_Message(p_Code   IN VARCHAR2
                                ,p_Params IN VARCHAR2
                                ,p_Msg    OUT VARCHAR2) RETURN VARCHAR2;

   FUNCTION Fn_Exists(p_Tag  IN VARCHAR2
                     ,p_List IN VARCHAR2
                     ,p_Sep  IN VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Get_Item_Desc(p_Source      IN Cotms_Source.Source_Code%TYPE
                            ,p_Function_Id IN Smtbs_Menu.Function_Id%TYPE
                            ,p_Item        IN VARCHAR2) RETURN VARCHAR2;

   PROCEDURE Pr_Log_Error(p_Source      IN Cotms_Source.Source_Code%TYPE
                         ,p_Function_Id IN Smtbs_Menu.Function_Id%TYPE
                         ,p_Err_Code    IN VARCHAR2
                         ,p_Err_Params  IN VARCHAR2);

   PROCEDURE Pr_Filter_Err_Type(p_Type IN Ertb_Msgs.TYPE%TYPE);
   FUNCTION Fn_Get_Table_Name(p_Table IN VARCHAR2) RETURN VARCHAR2;
   FUNCTION Fn_Scan_Error_List RETURN VARCHAR2;
   PROCEDURE Pr_Get_Maint_Err(p_Action_Code   IN VARCHAR2
                             ,p_Post_Upl_Stat IN VARCHAR2
                             ,p_Err_Code      IN OUT VARCHAR2
                             ,p_Err_Params    IN OUT VARCHAR2);

   FUNCTION Fn_Get_Rec_Key(p_Master_Node  IN VARCHAR2
                          ,p_Pk_Cols      IN VARCHAR2
                          ,p_Pk_Vals      IN VARCHAR2
                          ,p_Rec_Key      IN OUT VARCHAR2
                          ,p_Error_Code   IN OUT VARCHAR2
                          ,p_Error_Params IN OUT VARCHAR2)
   
    RETURN BOOLEAN;
   FUNCTION Fn_Maint_What_To_Do(p_Source            IN Cotms_Source.Source_Code%TYPE
                               ,p_Module            IN Cotms_Source_Pref.Module_Code%TYPE
                               ,p_Function_Id       IN Smtbs_Menu.Function_Id%TYPE
                               ,p_Multi_Trip_Ref_No IN OUT VARCHAR2
                               ,p_Post_Upl_Stat     IN OUT VARCHAR2
                               ,p_Error_Code        IN OUT VARCHAR2
                               ,p_Error_Params      IN OUT VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_What_To_Do(p_Source            IN Cotms_Source.Source_Code%TYPE
                         ,p_Module            IN Cotms_Source_Pref.Module_Code%TYPE
                         ,p_Function_Id       IN Smtbs_Menu.Function_Id%TYPE
                         ,p_Multi_Trip_Ref_No IN OUT VARCHAR2
                         ,p_Post_Upl_Stat     IN OUT VARCHAR2
                         ,p_Error_Code        IN OUT VARCHAR2
                         ,p_Error_Params      IN OUT VARCHAR2) RETURN BOOLEAN;

   FUNCTION Fn_Get_Amendable_Details(p_Source_Code      IN VARCHAR2
                                    ,p_Source_Operation IN Gwtm_Amend_Detail.Source_Operation%TYPE
                                    ,p_Amendable_Nodes  IN OUT NOCOPY Ty_Amend_Nodes
                                    ,p_Amendable_Fields IN OUT NOCOPY Ty_Amend_Fields
                                    ,p_Err_Code         IN OUT VARCHAR2
                                    ,p_Err_Params       IN OUT VARCHAR2
                                     
                                     ) RETURN BOOLEAN;
   FUNCTION Fn_Maint_Log(p_Action_Code IN VARCHAR2
                        ,p_Function_Id IN VARCHAR2
                        ,p_Remarks     IN VARCHAR2
                        ,p_Err_Code    IN OUT VARCHAR2
                        ,p_Err_Params  IN OUT VARCHAR2) RETURN BOOLEAN;

   FUNCTION Fn_Close(p_Master_Tbl     IN VARCHAR2
                    ,p_Row_Id         IN ROWID
                    ,p_Mod_No         IN NUMBER
                    ,p_Maker_Id       IN VARCHAR2
                    ,p_Maker_Dt_Stamp IN DATE
                    ,p_Err_Code       IN OUT VARCHAR2
                    ,p_Err_Params     IN OUT VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Reopen(p_Master_Tbl     IN VARCHAR2
                     ,p_Row_Id         IN ROWID
                     ,p_Mod_No         IN NUMBER
                     ,p_Maker_Id       IN VARCHAR2
                     ,p_Maker_Dt_Stamp IN DATE
                     ,p_Err_Code       IN OUT VARCHAR2
                     ,p_Err_Params     IN OUT VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Auth(p_Master_Tbl       IN VARCHAR2
                   ,p_Row_Id           IN ROWID
                   ,p_Auth_Stat        IN VARCHAR2
                   ,p_Once_Auth        IN VARCHAR2
                   ,p_Checker_Id       IN VARCHAR2
                   ,p_Checker_Dt_Stamp IN DATE
                   ,p_Err_Code         IN OUT VARCHAR2
                   ,p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

   FUNCTION Fn_Auth(p_Master_Tbl       IN VARCHAR2
                   ,p_Row_Id           IN ROWID
                   ,p_Auth_Stat        IN VARCHAR2
                   ,p_Once_Auth        IN VARCHAR2
                   ,p_Checker_Id       IN VARCHAR2
                   ,p_Checker_Dt_Stamp IN DATE
                   ,p_Key_Id           IN VARCHAR2
                   ,p_Mod_No           IN NUMBER
                   ,p_Err_Code         IN OUT VARCHAR2
                   ,p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Process_Ovds(p_Multi_Trip_Ref_No IN VARCHAR2
                           ,p_Err_Code          IN OUT VARCHAR2
                           ,p_Err_Params        IN OUT VARCHAR2) RETURN BOOLEAN;

   FUNCTION Fn_Validate_Restr_Text(p_Value      IN VARCHAR2
                                  ,p_Field_Name IN VARCHAR2
                                  ,p_Err_Code   IN OUT VARCHAR2
                                  ,p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Validate_Restr_Text(p_Value IN VARCHAR2) RETURN VARCHAR2;
   FUNCTION Fn_View_Mnt_Log(p_Function_Id IN VARCHAR2
                           ,p_Err_Code    IN OUT VARCHAR2
                           ,p_Err_Param   IN OUT VARCHAR2) RETURN BOOLEAN;
END Cspks_Service_Utils;
/
CREATE OR REPLACE SYNONYM Cspkss_Service_Utils FOR Cspks_Service_Utils
/