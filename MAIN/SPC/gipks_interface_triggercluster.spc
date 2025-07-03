CREATE OR REPLACE PACKAGE Gipks_Interface_TriggerCluster IS

  /*----------------------------------------------------------------------------------------------------
    **
    ** File Name        : Gipks_Interface_Trigger_Cluster
    ** Module            : GI
    **
    ** This source is part of the Oracle FLEXCUBE Software Product.
  ** Copyright © 2009 - 2012, Oracle and/or its affiliates. All rights reserved. 
  **
  ** No part of this work may be reproduced, stored in a retrieval system, adopted
  ** or transmitted in any form or by any means, electronic, mechanical,
  ** photographic, graphic, optic recording or otherwise, translated in any language
  ** or computer language, without the prior written permission of
  ** Oracle and/or its affiliates.
    **
    ** Oracle Financial Services Software Limited.
  ** Oracle Park, Off Western Express Highway,
  ** Goregaon (East),
  ** Mumbai - 400 063, India.
    -----------------------------------------------------------------------------------------------------

  -- Author  : PRABHUKU
  -- Created : 10/29/2013 12:24:14 PM
  -- Purpose : ME COMMON POOL CHANGES

   SFR Number         : 19171698
   Changed By         : Ravi D
   Change Description : GI HOOK changes
   Search String      : #19157634 GI HOOK changes
    SFR Number         : 24526465
   Change Description : GI HOOK changes-Wells retro of 24463518
   Search String      : 24526465_EXTN_12.2

   SFR Number         : 24466061
   Changed By         : Dekyi
   Change Description : GI HOOK changes
   Search String      : Bug#24466061

   Modified By          : Dekyi
   Modified On          : 04-Aug-2017
   Modified Description : Hook Request in package GIPKS_INTERFACE_TRIGGER. EHD Ref: WFGUNVUSA_12.4_27_JUL_2017_01. Retro of Bug#25487104.
   Search String        : 12.4_EXTN_26576133
   
   	Modified By         : Sudheer
        Modified On         : 14-03-2018
        Modified Reason     : GIDIFPRS Non Ext to EXT converions
        Search Strinf       : 14_1#GIDIFPRS_NON_EXT_TO_EXT
  -----------------------------------------------------------------------------------------------------------------
  */
  FUNCTION Fn_Process_Incoming(p_Source          IN Cotms_Source.Source_Code%TYPE,
                 p_Action_Code     IN VARCHAR2,
		 --p_Gidifprs        IN OUT Gipks_Fcj_Gidifprs.Ty_Gidifprs,--14_1#GIDIFPRS_NON_EXT_TO_EXT Commented
                 p_Gidifprs        IN OUT gipks_gidifprs_main.Ty_Gidifprs,--14_1#GIDIFPRS_NON_EXT_TO_EXT Added
                 p_Err_Code        IN OUT VARCHAR2,
                 p_Err_Params      IN OUT VARCHAR2,
                 l_Fn_Call_Id      IN OUT NUMBER,
                 l_Tb_Cluster_Data IN OUT Global.Ty_Tb_Cluster_Data)
  RETURN BOOLEAN;

  --#19157634 GI HOOK changes start
  FUNCTION fn_process_outgoing(p_source        IN cotms_source.source_code%TYPE,
                             p_action_code     IN VARCHAR2,
			     --p_gidifprs        IN OUT gipks_fcj_gidifprs.ty_gidifprs, --14_1#GIDIFPRS_NON_EXT_TO_EXT Commented
                             p_gidifprs        IN OUT gipks_gidifprs_main.ty_gidifprs,--14_1#GIDIFPRS_NON_EXT_TO_EXT Added
                             p_err_code        IN OUT VARCHAR2,
                             p_err_params      IN OUT VARCHAR2,
                             p_Fn_Call_Id      IN OUT NUMBER,
                       p_Tb_Cluster_Data IN OUT Global.Ty_Tb_Cluster_Data)
    RETURN BOOLEAN;
 --#19157634 GI HOOK changes end
--24526465_EXTN_12.2  start
 FUNCTION fn_validate_incoming(p_source      IN VARCHAR2,
                                p_action_code IN VARCHAR2,
				--p_gidifprs    IN OUT gipks_fcj_gidifprs.ty_gidifprs,--14_1#GIDIFPRS_NON_EXT_TO_EXT Commented
                                p_gidifprs    IN OUT gipks_gidifprs_main.ty_gidifprs,--14_1#GIDIFPRS_NON_EXT_TO_EXT Added
                                p_format_dtls IN gitm_format_definition%rowtype,
                                p_Fn_Call_Id      IN OUT NUMBER,
                                p_Tb_Cluster_Data IN OUT Global.Ty_Tb_Cluster_Data,
                                p_err_code    IN OUT VARCHAR2,
                                p_err_params  IN OUT VARCHAR2)
     RETURN BOOLEAN;
    FUNCTION fn_process_in_file(p_source      IN cotms_source.source_code%TYPE,
                              p_action_code IN VARCHAR2,
			      --p_gidifprs    IN OUT gipks_fcj_gidifprs.ty_gidifprs,--14_1#GIDIFPRS_NON_EXT_TO_EXT Commented
                              p_gidifprs    IN OUT gipks_gidifprs_main.ty_gidifprs,--14_1#GIDIFPRS_NON_EXT_TO_EXT Added
                              p_format_dtls IN gitm_format_definition%rowtype,
                              p_status      IN OUT VARCHAR2,
                              p_Fn_Call_Id      IN OUT NUMBER,
                        p_Tb_Cluster_Data IN OUT Global.Ty_Tb_Cluster_Data,
                              p_err_code    IN OUT VARCHAR2,
                              p_err_params  IN OUT VARCHAR2,
                              P_PhyFname       in varchar2,
                              P_FP_failed_once in out number) RETURN BOOLEAN;

  FUNCTION fn_process_in_upload(p_source      IN cotms_source.source_code%TYPE,
                                p_action_code IN VARCHAR2,
				--p_gidifprs    IN OUT gipks_fcj_gidifprs.ty_gidifprs,--14_1#GIDIFPRS_NON_EXT_TO_EXT Commented
                                p_gidifprs    IN OUT gipks_gidifprs_main.ty_gidifprs,--14_1#GIDIFPRS_NON_EXT_TO_EXT Added
                                p_format_dtls IN gitm_format_definition%rowtype,
                                p_Fn_Call_Id      IN OUT NUMBER,
                          p_Tb_Cluster_Data IN OUT Global.Ty_Tb_Cluster_Data,
                                p_err_code    IN OUT VARCHAR2,
                                p_err_params  IN OUT VARCHAR2,
                                P_FP_failed_once in out number) RETURN BOOLEAN;       ----24526465_EXTN_12.2  start
--Bug#24466061  starts
  FUNCTION Fn_Update_Log(p_interface_code IN GITM_INTERFACE_DEFINITION.INTERFACE_CODE%TYPE,
                         p_ext_sys        IN GITM_INTERFACE_DEFINITION.EXTERNAL_SYSTEM%TYPE,
                         p_branch_code    IN GITM_INTERFACE_DEFINITION.BRANCH_CODE%TYPE,
                         p_process_code   IN GITB_INTERFACE_TRIGGER.PROCESS_CODE%TYPE,
                         p_file_status    IN GITB_INTERFACE_TRIGGER.STATUS%TYPE,
                         p_serial         IN GITU_UPLOAD_MASTER.PROCESS_REF_NO%TYPE,
                         p_Err_Code       IN VARCHAR2,
                         p_Err_Params     IN VARCHAR2) RETURN BOOLEAN;
--Bug#24466061 Ends

--12.4_EXTN_26576133 starts
  FUNCTION Fn_Get_Directory_Name(p_source      IN cotms_source.source_code%TYPE,
                                p_src_loc        IN OUT VARCHAR2,
                p_dest_loc       IN OUT VARCHAR2,
                                p_Fn_Call_Id      IN OUT NUMBER,
                          p_Tb_Cluster_Data IN OUT Global.Ty_Tb_Cluster_Data,
                                p_err_code    IN OUT VARCHAR2,
                                p_err_params  IN OUT VARCHAR2) RETURN BOOLEAN;
--12.4_EXTN_26576133 ends

END Gipks_Interface_TriggerCluster;
/