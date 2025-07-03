CREATE OR REPLACE PACKAGE Gipks_In_Pkg_Generator IS
   /*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2009 - 2022  Oracle and/or its affiliates.  All rights reserved.
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
------------------------------------------------------------------------------------------
*/
/*
   -------------------------------------------------------------------------------------------------------
   CHANGE HISTORY
   -------------------------------------------------------------------------------------------------------
** Modified By      : Karthik V
** Modified On      : 24-Jan-2021
** Modified Reason  : Autonomous DB changes
** Search String    : Bug_33960935_FCUBS_14.6 Autonomous Database impact GI changes
   */

   -- Purpose : Code Generator for Incoming Files to Upload the File to Upload Tables by creating External Tables
   --           and From Upload Tables updating to master tables based on the action.
   --           This Package will be called from Interface Definition if the Interface Type is I (Incoming).

   -- Public type declarations

   TYPE Ty_Upload_Master IS TABLE OF Gitu_Upload_Master%ROWTYPE INDEX BY BINARY_INTEGER;
   TYPE Ty_Upload_Detail IS TABLE OF Gitu_Upload_Detail%ROWTYPE INDEX BY BINARY_INTEGER;
   TYPE Ty_Gitm_Format_Definition IS TABLE OF Gitm_Interface_Definition%ROWTYPE;
   TYPE Ty_Tb_f_Gitm_Component_Linkage IS TABLE OF Gitm_Component_Linkage%ROWTYPE INDEX BY BINARY_INTEGER;
   TYPE Ty_Tb_f_Omponent_Field_Linkage IS TABLE OF Gitm_Comp_Fld_Linkage%ROWTYPE INDEX BY BINARY_INTEGER;
   TYPE Ty_Tb_Frtdf_Gitm_File_Names IS TABLE OF Gitm_File_Names%ROWTYPE INDEX BY BINARY_INTEGER;
   TYPE t_Array IS TABLE OF VARCHAR2(100) INDEX BY BINARY_INTEGER;

   -- Public function and procedure declarations
   /*
    ** fn_generate_package-- Generates Dynamic Package for
    **  Interface Defnition Maintenance for Each File Name Specified in Gitm_file_names.
    ** IN
    ** p_source -- From which Source the function is getting called
    ** p_source_operation-- Operation
    ** p_action_code -- Actions like New, Update.
    ** p_interface_code -- Interface Code for the File Format Maintenance
    ** p_file_name -- File Name which should be uploaded.
    ** OUT
    ** p_multi_trip_id -- On Overrides Generating Ref Number.
    ** p_status        -- status of the process
    **  EXCEPTIONS
   
   */
   FUNCTION Fn_Generate_Package(p_Source           IN Cotms_Source.Source_Code%TYPE
                               ,p_Source_Operation IN VARCHAR2
                               ,p_Action_Code      IN VARCHAR2
                               ,p_Multi_Trip_Id    IN OUT VARCHAR2
                               ,p_Status           IN OUT VARCHAR2
                               ,p_Interface_Code   IN VARCHAR
                               ,p_File_Name        IN VARCHAR2
                               ,p_Err_Code         IN OUT VARCHAR
                               ,p_Err_Params       IN OUT VARCHAR) RETURN BOOLEAN;

   FUNCTION Fn_Create_External_Tables(p_Interface_Code IN VARCHAR2
                                     ,p_File_Name      IN VARCHAR2
                                     ,Act_File_Name    IN VARCHAR2
                                     ,p_Err_Code       IN OUT VARCHAR
                                     ,p_Err_Params     IN OUT VARCHAR) RETURN BOOLEAN;
	--Bug_33960935_FCUBS_14.6 Autonomous Database impact GI changes Starts 
   FUNCTION Fn_Create_External_Tables_Uri(p_Interface_Code IN VARCHAR2
                                     ,p_File_Name      IN VARCHAR2
                                     ,Act_File_Name    IN VARCHAR2
                                     ,p_Err_Code       IN OUT VARCHAR
                                     ,p_Err_Params     IN OUT VARCHAR) RETURN BOOLEAN;
    --Bug_33960935_FCUBS_14.6 Autonomous Database impact GI changes Ends 
   /**
   --fn_generate_package will call this function.
   1. It will call fn_generate_spec to generate the specification for the dyanamic package.
   2. To create the Body for Dynamic package it will undergo in 2 step process.
      2.1. It will call fn_file_process to do process from Reading the Data From File/
           External Table to Upload master and Upload Details tables based on Component
           Types.
      2.2. Calls Function fn_data_process to fetch data from upload tables and create
           function Id specific type using the uploaded data and it will call the
           function id specific package. Ideally it will call fn_main package.
    RETURNS boolean
   */
   FUNCTION Fn_Create_Package(p_Source         IN Cotms_Source.Source_Code%TYPE
                             ,p_Interface_Code IN VARCHAR2
                             ,p_File_Name      IN VARCHAR2
                             ,
                              ---P_SPC            OUT VARCHAR2,   ---SFR#1309
                              p_Spc        OUT CLOB
                             , ---SFR#1309
                              p_Sql        OUT CLOB
                             ,p_Err_Code   IN OUT VARCHAR
                             ,p_Err_Params IN OUT VARCHAR) RETURN BOOLEAN;

   FUNCTION Fn_File_Process(p_Interface_Code IN VARCHAR2
                           ,p_File_Name      IN VARCHAR2
                           ,Pkg_Body_b       IN OUT CLOB
                           ,p_Err_Code       IN OUT VARCHAR
                           ,p_Err_Params     IN OUT VARCHAR) RETURN BOOLEAN;
   /*
    ** fn_data_process ----fn_create_package will call this function for data processing.
    ** IN
    **     P_INTERFACE_CODE -- Interface Code Input Parameter
    **     p_file_name -- File Name For Upload
    **     PKG_BODY -- Generated Package Body
    ** EXCEPTIONS
    **   p_err_code-- Errors in generating DP Process Functions.
   */
   FUNCTION Fn_Data_Process(p_Interface_Code IN VARCHAR2
                           ,p_File_Name      IN VARCHAR2
                           ,Pkg_Body         IN OUT CLOB
                           ,p_Err_Code       IN OUT VARCHAR
                           ,p_Err_Params     IN OUT VARCHAR) RETURN BOOLEAN;

   FUNCTION Fn_Get_Value(p_Interface_Code VARCHAR2
                        ,p_File_Name      VARCHAR2
                        ,p_Parent         VARCHAR2
                        ,p_Field_Name     VARCHAR2) RETURN VARCHAR2;
   FUNCTION Fn_Get_Master_Object(p_Interface_Code VARCHAR2) RETURN VARCHAR2;

   FUNCTION Fn_Drop_Pkgs(p_Source     Cotms_Source.Source_Code%TYPE
                        ,p_Intf_Code  IN VARCHAR2
                        ,p_Err_Code   IN OUT VARCHAR2
                        ,p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;
END Gipks_In_Pkg_Generator;
/