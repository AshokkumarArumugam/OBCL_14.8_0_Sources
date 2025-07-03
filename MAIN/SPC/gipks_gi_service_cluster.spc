CREATE OR REPLACE PACKAGE gipks_gi_service_cluster AS

  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : gipks_gi_service_cluster.SPC
  **
  ** Module   : GI
  **
  **This source is part of the FLEXCUBE Corporate Software System
  **and is copyrighted by Oracle Financial Services Software Limited.
  **All rights reserved.  No part of this work may be reproduced,
  **stored in a retrieval system, adopted or transmitted in any
  **form or by any means, electronic, mechanical, photographic,
  **graphic, optic recording or otherwise, translated in any
  **language or computer language, without the prior written
  **permission of Oracle Financial Services Software Limited.
  **
  **Oracle Financial Services Software Limited.
  **10-11, SDF I, SEEPZ, Andheri (East),
  **Mumbai - 400 096.
  **India
  **
  **Copyright © 1997- 2015 by Oracle Financial Services Software Limited.
  ----------------------------------------------------------------------------------------------------*/

  --========================================================================================================================
  /*      CHANGE_HISTORY  

** Created By        : Nalandhan G
** Created On        : 23-Feb-2016
** Description       : Extensibility changes to change the content of the data before writing it into file for outgoing interface Retroed from 12_1.
** Retro Source      : SFRs 21104294,21246559
** Search String     : 9NT1606_12.1_RETRO_21277311
**Modified by 	:Gouri
**Modified on	:9-Sep-2016
**Modified REason:- Retro of 23233035
**Search String:-12.2_EXTN_23664449

*/

  --9NT1606_12.1_RETRO_21277311 starts
  
  FUNCTION fn_get_filename(p_file_name         IN OUT VARCHAR2,
                           p_directory         IN OUT gitm_interface_definition.file_path%TYPE,
                           p_interface_code    IN gitm_interface_definition.interface_code%TYPE,
                           p_external_system   IN gitm_interface_definition.external_system%TYPE,
                           p_branch_code       IN gitm_interface_definition.branch_code%TYPE,
                           p_fn_call_id        IN NUMBER,
                           p_tb_cluster_data   IN OUT GLOBAL.ty_tb_cluster_data,
                           p_error             IN OUT VARCHAR2,
                           p_err_param         IN OUT VARCHAR2) RETURN BOOLEAN;
               
  FUNCTION fn_write_file(p_directory        IN OUT VARCHAR2,
                         p_filename         IN OUT VARCHAR2,
                         p_msg              IN OUT CLOB,
                         p_mode             IN VARCHAR2,
                         p_interface_type   IN VARCHAR2,
                         p_group            IN VARCHAR2,
                         p_fn_call_id       IN NUMBER,             
                         p_tb_cluster_data  IN OUT GLOBAL.ty_tb_cluster_data,
                         p_error            IN OUT VARCHAR2,
                         p_err_param        IN OUT VARCHAR2) RETURN BOOLEAN;

  --9NT1606_12.1_RETRO_21277311 ends  
   --12.2_EXTN_23664449 starts
 FUNCTION fn_trigger_eod_job(p_branch_code     IN VARCHAR2,
                             p_stage           IN VARCHAR2,
                             p_mand_format     IN GIPKS_GI_SERVICE.ty_Interfaces,
                             error_interfaces  OUT GIPKS_GI_SERVICE.ty_Interfaces,
                             P_FN_CALL_ID      IN NUMBER,
                             P_TB_CLUSTER_DATA IN OUT GLOBAL.ty_tb_cluster_data)
   RETURN BOOLEAN;
--12.2_EXTN_23664449 starts
  
END gipks_gi_service_cluster;
/
CREATE OR REPLACE synonym gipkss_gi_service_cluster FOR gipks_gi_service_cluster
/