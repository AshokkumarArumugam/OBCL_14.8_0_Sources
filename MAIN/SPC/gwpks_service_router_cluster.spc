CREATE OR REPLACE PACKAGE gwpks_service_router_cluster AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : gwpks_service_router_cluster.SPC
  **
  ** Module     : CORE
  **
  ** This source is part of the FLEXCUBE Software System and is copyrighted by Oracle Financial Services Software Limited.
  **
  **
  ** All rights reserved.  No part of this work may be reproduced, stored in a retrieval system,
  ** adopted or transmitted in any form or by any means, electronic, mechanical, photographic,
  ** graphic, optic recording or otherwise, translated in any language or computer language, without
  ** the prior written permission of Oracle Financial Services Software Limited.
  **
  ** Oracle Financial Services Software Limited.
  ** 10-11, SDF I, SEEPZ, Andheri (East),
  ** Mumbai - 400 096.
  ** India
  ** Copyright @  2014 - 2015 by Oracle Financial Services Software Limited.
    -------------------------------------------------------------------------------------------------------
  CHANGE HISTORY
  
Created By         : Saisudha Rathinavelu
Created On         : 03-Oct-2016
Creation Reason    : Retro for hook change bug id 21176889.
Search String      : 12.2_RETRO_Bug#23663275
  
  -------------------------------------------------------------------------------------------------------
  */
  FUNCTION Fn_pre_process_req(p_req       IN CLOB,
                              p_instr_xml IN OUT NOCOPY VARCHAR2,
                              p_res       IN OUT NOCOPY CLOB,
							  p_extsys_msg          IN OUT NOCOPY CLOB,
                              p_status    IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_pre_process_req(p_source              IN VARCHAR2,
                              p_user_id             IN VARCHAR2,
                              p_branch              IN VARCHAR2,
                              p_function_id         IN VARCHAR2,
                              p_action              IN VARCHAR2,
                              p_module_id           IN VARCHAR2,
                              p_service_name        IN VARCHAR2,
                              p_operation_code      IN VARCHAR2,
                              p_msg_id              IN VARCHAR2,
                              p_pkey_vals           IN VARCHAR2,
                              p_seq_no              IN NUMBER,
                              p_ubscomp             IN VARCHAR2,
                              p_source_operation    IN VARCHAR2,
                              p_source_user_id      IN VARCHAR2,
                              p_dept_code           IN VARCHAR2,
                              p_loc                 IN VARCHAR2,
                              p_maker_Remarks       IN VARCHAR2,
                              p_checker_remarks     IN VARCHAR2,
                              p_maker_ovd_remarks   IN VARCHAR2,
                              p_checker_ovd_remarks IN VARCHAR2,
                              p_debug_mode          IN VARCHAR2,
                              p_multi_trip_id       IN VARCHAR2,
                              p_msg_status          IN OUT VARCHAR2,
                              p_addl_info           IN VARCHAR2,
                              p_blk_ds_name         IN CLOB,
                              p_fld_tag_name        IN CLOB,
                              p_fld_tag_value       IN CLOB,
                              p_resp_msg            IN OUT NOCOPY CLOB,
							  p_extsys_msg          IN OUT NOCOPY CLOB,
                              p_status              OUT VARCHAR2)
    RETURN BOOLEAN;
END gwpks_service_router_cluster;
/