CREATE OR REPLACE PACKAGE GIPKS_GI_SERVICE IS
  /*------------------------------------------------------------------------------------------
  ** This source is part of the Oracle FLEXCUBE Universal Banking Software Product
  ** Copyright © 2016 - 2020  Oracle and/or its affiliates.  All rights reserved.
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
  Changed By         : Vinutha Kini
  Changed On		 : 27-Sep-2016
  Change Description : Retro from 12.2Supp to 12.3Core
  Search String		 : FCUBS_Retro_12.2Supp__12.3Core  
  
  	Modified By       : Susanta
    Modified On       : 30-Aug-2019
    Modified Reason   : JC Integration with Common Core - GI Changes
    Search String     : JCROFC_Minicore_Integration

 ** Modified By      : Pallavi R
 ** Modified On      : 5-May-2023
 ** Modified Reason  : Re-introducing archival function in common core for Standalone GI API calls which is commendted against #33971655 and moved to UBS
 ** Search String    : OBCL_14.6_RABO_#35350195_4 Changes    
  -------------------------------------------------------------------------------------------------------
  */
g_multibyte_audf   BOOLEAN := FALSE;--JCROFC_Minicore_Integration
  TYPE t_array IS TABLE OF VARCHAR2(32767) INDEX BY BINARY_INTEGER;

  TYPE ty_rec_fld_val IS RECORD(
    fld_name  varchar2(32767),
    fld_value varchar2(32767));

  TYPE ty_rec_array is TABLE OF ty_rec_fld_val INDEX BY BINARY_INTEGER;
  g_ty_rec_array ty_rec_array; /*Changes for FCUBS_Retro_12.2Supp__12.3Core*/

  TYPE ty_tb_f_gitm_format_definition is TABLE OF GITM_INTERFACE_DEFINITION%ROWTYPE INDEX BY BINARY_INTEGER;
  TYPE ty_tb_f_gitm_interface_trigger IS TABLE OF gitm_interface_trigger%ROWTYPE INDEX BY BINARY_INTEGER;
  TYPE ty_tb_f_gitm_component_linkage IS TABLE OF gitm_component_linkage%ROWTYPE INDEX BY BINARY_INTEGER;
  TYPE ty_tb_f_omponent_field_linkage IS TABLE OF GITM_COMP_FLD_LINKAGE%ROWTYPE INDEX BY BINARY_INTEGER;
  TYPE ty_tb_f_file_names IS TABLE OF gitm_file_names%ROWTYPE INDEX BY BINARY_INTEGER;
  TYPE ty_upload_master IS TABLE OF gitm_upload_master%ROWTYPE INDEX BY BINARY_INTEGER;
  TYPE ty_upload_detail IS TABLE OF gitm_upload_detail%ROWTYPE INDEX BY BINARY_INTEGER;

  TYPE ty_gidfrtdf IS RECORD(
    frtdf_gitm_format_definition GITM_INTERFACE_DEFINITION%ROWTYPE,
    frtdf_gitm_interface_trigger ty_tb_f_gitm_interface_trigger,
    frtdf_gitm_component_linkage ty_tb_f_gitm_component_linkage,
    frtdf_omponent_field_linkage ty_tb_f_omponent_field_linkage,
    addl_info                    Stpks_Fcmaint_Service.Ty_Addl_info);
  l_max_file_size NUMBER(38) := 9999999999999;
  FUNCTION Fn_Get_Next_Run_Date(P_gitm_format_definition IN GITM_INTERFACE_DEFINITION%ROWTYPE,
                                P_next_run_date          IN OUT Date)
    return boolean;

  FUNCTION Fn_Archive_Upload(p_branch_code IN VARCHAR2) return boolean; 
  FUNCTION Fn_Archive_File_Log(p_branch_code IN VARCHAR2) return boolean; 

  FUNCTION FN_GET_PARAMETERS(RELATION IN VARCHAR2) RETURN t_array;

  FUNCTION FN_GET_RIGHT_PARAM(RELATION IN VARCHAR2) RETURN t_array;

  FUNCTION SPLIT(p_in_string VARCHAR2, p_delim VARCHAR2) RETURN t_array;

  FUNCTION FN_GET_FILENAME(P_FILE_NAME       IN OUT VARCHAR2,
                           P_DIRECTORY       IN OUT GITM_INTERFACE_DEFINITION.FILE_PATH%TYPE,
                           p_interface_code  in GITM_INTERFACE_DEFINITION.interface_code%type,
                           p_external_system in GITM_INTERFACE_DEFINITION.external_system%type,
                           p_branch_code     in GITM_INTERFACE_DEFINITION.branch_code%type,
                           P_ERROR           IN OUT VARCHAR2,
                           P_ERR_PARAM       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_write_file(P_DIRECTORY      IN OUT VARCHAR2,
                         p_filename       IN OUT VARCHAR2,
                         P_MSG            IN CLOB,
                         p_mode           IN VARCHAR2,
                         p_INTERFACE_TYPE IN VARCHAR2,
                         p_group          IN VARCHAR2,
                         P_ERROR          IN OUT VARCHAR2,
                         P_ERR_PARAM      IN OUT VARCHAR2) RETURN BOOLEAN;

  function get_token(the_list  varchar2,
                     the_index number,
                     delim     varchar2 := ',') return varchar2;

  /*
  function fn_get_interface_dtls(p_interface_code  in GITM_INTERFACE_DEFINITION.interface_code%type,
                                 p_external_system in GITM_INTERFACE_DEFINITION.external_system%type,
                                 p_branch_code     in GITM_INTERFACE_DEFINITION.branch_code%type,
                                 p_format_rec      IN OUT GIPKS_FCJ_GIDFRTDF.ty_gidfrtdf,
                                 P_ERROR           IN OUT VARCHAR2,
                                 P_ERR_PARAM       IN OUT VARCHAR2)
    RETURN BOOLEAN;
    */

  TYPE ty_Interfaces IS TABLE OF GITM_INTERFACE_DEFINITION%ROWTYPE INDEX BY BINARY_INTEGER;

  FUNCTION Fn_Get_UnPro_Mand_Intf(p_branch_code IN VARCHAR2,
                                  P_Stage       IN GITM_INTERFACE_DEFINITION.WHEN_TO_RUN%Type)
    return ty_Interfaces;

  FUNCTION FN_REPLACE_GLOBALS(P_PARAM IN OUT VARCHAR2) RETURN VARCHAR2;
  FUNCTION FN_GET_OBJECT_COLUMN(P_INTERFACE_CODE GITM_INTERFACE_DEFINITION.INTERFACE_CODE%TYPE,
                                P_PARA           IN VARCHAR2) RETURN VARCHAR2;
  FUNCTION FN_GET_OBJECT_CLAUSE(P_INTERFACE_CODE GITM_INTERFACE_DEFINITION.INTERFACE_CODE%TYPE,
                                P_WHERE_CLAUSE   IN VARCHAR2) RETURN VARCHAR2;

  FUNCTION FN_PREOCESS_AUDF(P_AUDF_NAME      IN VARCHAR2,
                            P_INTERFACE_CODE GITM_INTERFACE_DEFINITION.INTERFACE_CODE%TYPE,
                            P_TYPE           IN VARCHAR2) RETURN VARCHAR2;
  FUNCTION FN_TRANSLATE(P_TNAME        IN VARCHAR2,
                        INTF_TYPE      IN VARCHAR2,
                        FIELD_NAME     IN VARCHAR2,
                        P_UN_TRANS_VAL IN VARCHAR2) RETURN VARCHAR2;

  FUNCTION FN_PROCESS_PRE_MSG_AUDF(P_INTERFACE_CODE GITM_INTERFACE_DEFINITION.INTERFACE_CODE%TYPE,
                                   P_FILE_NAME      VARCHAR2,
                                   P_ERROR          IN OUT VARCHAR2,
                                   P_ERR_PARAM      IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION FN_PROCESS_POST_MSG_AUDF(P_INTERFACE_CODE GITM_INTERFACE_DEFINITION.INTERFACE_CODE%TYPE,
                                    P_FILE_NAME      VARCHAR2,
                                    P_ERROR          IN OUT VARCHAR2,
                                    P_ERR_PARAM      IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION FN_PROCESS_PRE_CMP_AUDF(P_INTERFACE_CODE GITM_COMPONENT_LINKAGE.INTERFACE_CODE%TYPE,
                                   P_FILE_NAME      VARCHAR2,
                                   P_COMPONENT_NAME GITM_COMPONENT_LINKAGE.COMPONENT_NAME%TYPE,
                                   P_ERROR          IN OUT VARCHAR2,
                                   P_ERR_PARAM      IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION FN_PROCESS_POST_CMP_AUDF(P_INTERFACE_CODE GITM_COMPONENT_LINKAGE.INTERFACE_CODE%TYPE,
                                    P_FILE_NAME      VARCHAR2,
                                    P_COMPONENT_NAME GITM_COMPONENT_LINKAGE.COMPONENT_NAME%TYPE,
                                    P_ERROR          IN OUT VARCHAR2,
                                    P_ERR_PARAM      IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION FN_PROCESS_PRE_REC_AUDF(P_INTERFACE_CODE GITM_COMPONENT_LINKAGE.INTERFACE_CODE%TYPE,
                                   P_FILE_NAME      VARCHAR2,
                                   P_COMPONENT_NAME GITM_COMPONENT_LINKAGE.COMPONENT_NAME%TYPE,
                                   P_REC_ARRAY      IN OUT ty_rec_array,
                                   P_ERROR          IN OUT VARCHAR2,
                                   P_ERR_PARAM      IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION FN_PROCESS_POST_REC_AUDF(P_INTERFACE_CODE GITM_COMPONENT_LINKAGE.INTERFACE_CODE%TYPE,
                                    P_FILE_NAME      VARCHAR2,
                                    P_COMPONENT_NAME GITM_COMPONENT_LINKAGE.COMPONENT_NAME%TYPE,
                                    P_REC_ARRAY      IN OUT ty_rec_array,
                                    P_ERROR          IN OUT VARCHAR2,
                                    P_ERR_PARAM      IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION FN_PROCESS_PRE_FLD_AUDF(P_INTERFACE_CODE GITM_COMPONENT_LINKAGE.INTERFACE_CODE%TYPE,
                                   P_FILE_NAME      VARCHAR2,
                                   P_COMPONENT_NAME GITM_COMPONENT_LINKAGE.COMPONENT_NAME%TYPE,
                                   P_FLD_NAME       IN OUT VARCHAR2,
                                   P_FLD_VALUE      IN OUT VARCHAR2,
                                   P_ERROR          IN OUT VARCHAR2,
                                   P_ERR_PARAM      IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION FN_PROCESS_POST_FLD_AUDF(P_INTERFACE_CODE GITM_COMPONENT_LINKAGE.INTERFACE_CODE%TYPE,
                                    P_FILE_NAME      VARCHAR2,
                                    P_COMPONENT_NAME GITM_COMPONENT_LINKAGE.COMPONENT_NAME%TYPE,
                                    P_FLD_NAME       IN OUT VARCHAR2,
                                    P_FLD_VALUE      IN OUT VARCHAR2,
                                    P_ERROR          IN OUT VARCHAR2,
                                    P_ERR_PARAM      IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_gidbatch(p_branch_code IN VARCHAR2) RETURN BOOLEAN;
  FUNCTION FN_GENERATE_PKG(p_source         cotms_source.source_code%TYPE,
                           P_INTERFACE_CODE GITM_INTERFACE_DEFINITION.INTERFACE_CODE%TYPE,
                           p_err_code       IN OUT VARCHAR2,
                           p_err_params     IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_gidprsif(p_branch_code IN VARCHAR2, stage IN VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Get_UnPro_UnMand_Intf(p_branch_code IN VARCHAR2,
                                    P_Stage       IN GITM_INTERFACE_DEFINITION.WHEN_TO_RUN%Type)
    return ty_Interfaces;
  Procedure Pr_Default_Start_Position(p_Interface_Code Gitm_Interface_Definition.Interface_Code%Type);
 --JCROFC_Minicore_Integration GI INTEGRATION CHANGES STARTS
  FUNCTION fn_mutibyte_outgoing(p_Interface_Code VARCHAR2,
                              p_File_Name      VARCHAR2,
                              p_Component_Name VARCHAR2,
                              p_fld_name       VARCHAR2,
                              p_fld_value      IN OUT VARCHAR2)

  RETURN VARCHAR2;
  
  FUNCTION fn_multibyte_transalation( p_name IN VARCHAR2,TRAN_TYPE IN VARCHAR2 DEFAULT 'TRAN_TYPE')
  RETURN VARCHAR2 DETERMINISTIC;  
  --JCROFC_Minicore_Integration GI INTEGRATION CHANGES ENDS

--OBCL_14.6_RABO_#35350195_4 Changes Starts
FUNCTION Fn_Archive_Gi(p_Branch_Code IN VARCHAR2) RETURN BOOLEAN;
--OBCL_14.6_RABO_#35350195_4 Changes Ends					 
END GIPKS_GI_SERVICE;
/
CREATE OR REPLACE SYNONYM GIPKSS_GI_SERVICE FOR GIPKS_GI_SERVICE
/