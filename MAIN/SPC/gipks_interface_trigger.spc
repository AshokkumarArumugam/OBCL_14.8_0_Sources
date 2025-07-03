create or replace package GIPKS_INTERFACE_TRIGGER is
  -- Purpose : Interface Trigger used to trigger the incoming and outgoing process for ASCII Files
               --From callling from Function Id GIDIFPRS Packages,  For Gateway , and EOD Batch Executions.

   /*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2016-2022  Oracle and/or its affiliates.  All rights reserved.
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
    **
	** Changed by 	 : Vinutha Kini
	** Changed on 	 : 07-Sep-2016
	** Description	 : Core clean up for 12.3Payments
	** Search String : Standalone12.3 CleanUp_1
  **
  Changed By         : Vinutha Kini
  Changed On		 : 27-Sep-2016
  Change Description : Retro from 12.2Supp to 12.3Core
  Search String		 : FCUBS_Retro_12.2Supp__12.3Core

  Changed By         : Siji George
  Changed On		 : 07-Dec-2016
  Change Description : scv file generation failed with maximum length
  Search String		 : FCUBS_SCV_ITR_25209411
  
        Modified By         : Sudheer
        Modified On         : 14-03-2018
        Modified Reason     : GIDIFPRS Non Ext to EXT converions
        Search Strinf       : 14_1#GIDIFPRS_NON_EXT_TO_EXT
		
	    Modified By         : Karthik V
        Modified On         : 26-02-2022
        Modified Reason     : FCUBS_14.6 Autonomous Database impact GI changes
        Search Strinf       : Bug_33960935_FCUBS_14.6 Autonomous Database impact GI changes
  -------------------------------------------------------------------------------------------------------
  */
 -- Global variables--
  g_err_code        varchar2(255);
  g_err_params      varchar2(255);
  g_branch_code     sttm_core_branch.branch_code%type; --Standalone12.3 CleanUp_1
  g_interface_code  gitm_format_definition.interface_code%type;
  g_external_system gitm_format_definition.external_system%type;
--g_file_name       varchar2(100);   --FCUBS_SCV_ITR_25209411
  g_file_name       varchar2(200);   --FCUBS_SCV_ITR_25209411
  --9NT1428: FC_UBS_V.UM_11.2.0.0.0.0.0 - Starts
  g_phy_file_name     VARCHAR2(255);
  g_ProcessRefNo    VARCHAR2(50);
  --9NT1428: FC_UBS_V.UM_11.2.0.0.0.0.0 - Ends
  g_source          varchar2(100);
  g_process_no      number := 1;
  g_status          varchar2(1);
  g_Return          BOOLEAN := TRUE;
  g_serial          gitm_file_log.Process_Ref_No%type;
  g_rec_count       NUMBER;
--  g_gidifprs        gipks_fcj_gidifprs.ty_gidifprs;  --14_1#GIDIFPRS_NON_EXT_TO_EXT commented
  g_gidifprs        gipks_gidifprs_main.ty_gidifprs;
  g_crc_value       varchar2(30);
  g_custom_logging  char(1); --Bug#24466061 CHANGES
  g_all_dir_file_path gitm_format_definition.file_path%type; --9NT1606_12_2_RETRO_12_0_3_23657773 changes



  -- Public function and procedure declarations
   FUNCTION fn_trigger_process(p_source           IN VARCHAR2,
                                        p_action_code      IN VARCHAR2,
					--p_wrk_gidifprs     IN OUT gipks_fcj_gidifprs.ty_gidifprs,--14_1#GIDIFPRS_NON_EXT_TO_EXT commented
                                        p_wrk_gidifprs     IN OUT gipks_gidifprs_main.ty_gidifprs,--14_1#GIDIFPRS_NON_EXT_TO_EXT added
                                        p_err_code         IN OUT VARCHAR2,
                                        p_err_params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

   FUNCTION fn_trigger_interface(p_branch_code IN VARCHAR2,
                                 p_interface_code    IN GITM_FORMAT_DEFINITION.Interface_Code%TYPE,
                                 p_file_name   IN GITM_FILE_NAMES.FILE_NAME%TYPE,
                                 p_err_code    IN OUT VARCHAR2,
                                 p_err_params  IN OUT VARCHAR2)
     RETURN BOOLEAN;

    FUNCTION fn_process_outgoing(p_source       IN cotms_source.source_code%TYPE,
                             p_action_code   IN VARCHAR2,
			     --p_gidifprs      IN OUT gipks_fcj_gidifprs.ty_gidifprs,--14_1#GIDIFPRS_NON_EXT_TO_EXT commented
                             p_gidifprs      IN OUT gipks_gidifprs_main.ty_gidifprs,--14_1#GIDIFPRS_NON_EXT_TO_EXT added
                             p_err_code      IN OUT VARCHAR2,
                             p_err_params    IN OUT VARCHAR2) RETURN BOOLEAN;

    FUNCTION fn_process_incoming(p_source         IN cotms_source.source_code%TYPE,
                             p_action_code   IN VARCHAR2,
			     --p_gidifprs      IN OUT gipks_fcj_gidifprs.ty_gidifprs,--14_1#GIDIFPRS_NON_EXT_TO_EXT commented
                             p_gidifprs      IN OUT gipks_gidifprs_main.ty_gidifprs,--14_1#GIDIFPRS_NON_EXT_TO_EXT added
                             p_err_code      IN OUT VARCHAR2,
                             p_err_params    IN OUT VARCHAR2) RETURN BOOLEAN;
--Bug_33960935_FCUBS_14.6 Autonomous Database impact GI changes Starts
FUNCTION Fn_movefile_uri_to_dir(p_Interface_Code  IN VARCHAR2,
                                        p_Act_File_Name   IN VARCHAR2,
									    p_directory       IN VARCHAR2,
                                        p_uri             IN VARCHAR2,
                                        p_credential_name IN VARCHAR2,
                                        p_Err_Code        IN OUT VARCHAR,
                                        p_Err_Params      IN OUT VARCHAR)
/*This Function is used to send the file from Bucket Storage URI to Database Directory using DBMS_CLOUD.GET_OBJECT
If all_files_to_pick is checked in GIDIFPRS screen then it will push or send all the files from ready URI ro ready db diretory*/
    RETURN BOOLEAN;
	
Function Fn_Get_Object_Preference_Details(P_Interface_Code   In     Varchar2,
									      p_storage_name     In     Varchar2)
 Return VARCHAR2;
--Bug_33960935_FCUBS_14.6 Autonomous Database impact GI changes Ends
end GIPKS_INTERFACE_TRIGGER;
/