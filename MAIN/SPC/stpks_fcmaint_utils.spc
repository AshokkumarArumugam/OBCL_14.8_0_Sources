CREATE OR REPLACE PACKAGE Stpks_Fcmaint_Utils AS
/*------------------------------------------------------------------------------------------
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
------------------------------------------------------------------------------------------------
   ----------------------------------------------------------------------------------------------------
   CHANGE HISTORY
   
   DD-MON-RRRR             SFR NO          RELEASE NAME             DESCRIPTION
   
	**
	** Changed by 	 : Vinutha Kini
	** Changed on 	 : 26-July-2016
	** Description	 : Core clean up for 12.3Payments
	** Search String : Standalone12.3 CleanUp   
   -----------------------------------------------------------------------------------------------------
   */

   TYPE Ty_Amend_Fileds IS TABLE OF Gwtm_Amend_Fields%ROWTYPE INDEX BY Gwtm_Amend_Fields.Field_Name%TYPE;
   TYPE Typ_Amend_Rec IS RECORD(
      Node_Params Gwtm_Amend_Nodes%ROWTYPE,
      Field_List  Ty_Amend_Fileds);

   TYPE Typ_Amend_Details IS TABLE OF Typ_Amend_Rec INDEX BY Gwtm_Amend_Nodes.Node_Name%TYPE;

   TYPE Typ_Field_Log IS TABLE OF Sttb_Field_Log%ROWTYPE INDEX BY BINARY_INTEGER;

   TYPE Ty_Tb_Ovd_Data IS TABLE OF VARCHAR2(32767) INDEX BY PLS_INTEGER;
   TYPE Ty_Tb_Fld_Log IS TABLE OF Sttbs_Field_Log%ROWTYPE INDEX BY PLS_INTEGER;

   FUNCTION Fn_Getparam(p_Text_Clob IN CLOB
                       ,p_Pos       IN NUMBER
                       ,p_Sep       IN VARCHAR2 DEFAULT '~') RETURN VARCHAR2;
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
   PROCEDURE Pr_Get_Table_Name(p_Table IN OUT VARCHAR2);
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

   FUNCTION Fn_Get_Amendable_Details(p_Source_Code        IN Cotms_Source.Source_Code%TYPE --Standalone12.3 Cleanup
                                    ,p_Source_Operation   IN Gwtm_Amend_Detail.Source_Operation%TYPE
                                    ,p_Tbl_Amendable_Data IN OUT Typ_Amend_Details
                                    ,p_Err_Code           IN OUT VARCHAR2
                                    ,p_Err_Params         IN OUT VARCHAR2
                                     
                                     ) RETURN BOOLEAN;
   FUNCTION Fn_Amendable(p_Item           IN VARCHAR2
                        ,p_Amendable_Data IN Stpks_Fcmaint_Utils.Typ_Amend_Details) RETURN BOOLEAN;

   FUNCTION Fn_Populate_Audit_Trail(p_Action_Code   IN VARCHAR2
                                   ,p_Function_Id   IN VARCHAR2
                                   ,p_Master_Node   IN VARCHAR2
                                   ,p_Remarks       IN VARCHAR2
                                   ,p_Multi_Trip_Id IN VARCHAR2
                                   ,p_Tb_Prv_Data   IN Stpks_Fcmaint_Service.Ty_Tb_Xml_Data
                                   ,p_Tb_Xml_Data   IN Stpks_Fcmaint_Service.Ty_Tb_Xml_Data
                                   ,p_Err_Code      IN OUT VARCHAR2
                                   ,p_Err_Params    IN OUT VARCHAR2) RETURN BOOLEAN;
   --To Be Removed Starts
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
   --To Be Removed Ends
   FUNCTION Fn_Process_Ovds(p_Multi_Trip_Ref_No IN VARCHAR2
                           ,p_Err_Code          IN OUT VARCHAR2
                           ,p_Err_Params        IN OUT VARCHAR2) RETURN BOOLEAN;

   FUNCTION Fn_Store_Ovds(p_Multi_Trip_Ref_No IN VARCHAR2
                         ,p_Err_Code          IN OUT VARCHAR2
                         ,p_Err_Params        IN OUT VARCHAR2) RETURN BOOLEAN;

   FUNCTION Fn_Product_Name(--p_Product_Code IN Cstms_Product.Product_Code%TYPE --Standalone12.3 CleanUp
							p_Product_Code IN VARCHAR2 --Standalone12.3 CleanUp
                           ,p_Err_Code     IN OUT VARCHAR2
                           ,p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Validate_Restr_Text(p_Value      IN VARCHAR2
                                  ,p_Field_Name IN VARCHAR2
                                  ,p_Err_Code   IN OUT VARCHAR2
                                  ,p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Validate_Restr_Text(p_Value IN VARCHAR2) RETURN VARCHAR2;

END Stpks_Fcmaint_Utils;
/
CREATE OR REPLACE SYNONYM STPKSS_FCMAINT_UTILS FOR STPKS_FCMAINT_UTILS
/
