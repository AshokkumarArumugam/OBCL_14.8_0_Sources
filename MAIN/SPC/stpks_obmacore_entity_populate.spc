CREATE OR REPLACE PACKAGE stpks_obmacore_entity_populate AS
  /*
  ------------------------------------------------------------------------------------------
  ** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
  ** Copyright © 2021  Oracle and/or its affiliates.  All rights reserved.
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
  ------------------------------------------------------------------------------------------
  CHANGE HISTORY
  
  **  Created By         : Nisha B C
  **  Created On         : 23-July-2021
  **  Change description : Changes for the ODT entity replication into OBMA core.
  **  Search string      : FCUBS_14.5.0.0.0_INTERNAL_SFR#_33183870
  
  **  Modified By         : Nisha B C
  **  Modified On         : 19-Aug-2021
  **  Change description  : Changes for the ODT entity replication into OBMA core.
  **  Search string       : FCUBS_14.5.0.0.0_INTERNAL_SFR#_33239189
  
  **  Modified By         : Nisha B C
  **  Modified On         : 29-Sept-2021
  **  Change description  : Changes for the ODT entity replication into OBMA core for Branch.
  **  Search string       : FCUBS_14.5.0.0.0_INTERNAL_SFR#_33448785
  ---------------------------------------------------------------------------------------------
  */
  TYPE tbl_core_req_master IS TABLE OF sttb_core_req_master%ROWTYPE;
  FUNCTION fn_get_seq_no(p_process_code IN VARCHAR2 DEFAULT NULL,
                         p_pad          IN VARCHAR2 DEFAULT NULL)
    RETURN VARCHAR2;
  FUNCTION fn_obmacore_stage_table_populate(p_req_master  IN OUT sttb_core_req_master%ROWTYPE,
                                            p_service_req IN OUT sttb_core_ts_service_req%ROWTYPE, --FCUBS_14.5.0.0.0_INTERNAL_SFR#_33239189 Added OUT 
                                            p_err_code    IN OUT VARCHAR2,
                                            p_err_param   IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION fn_obmacore_ccydef_entity(p_ccydef_rec IN cytms_ccy_defn_master%ROWTYPE,
                                     p_err_code   IN OUT VARCHAR2,
                                     p_err_param  IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION fn_obmacore_ratetype_entity(p_ratetype_rec IN cytms_rate_type%ROWTYPE,
                                       p_err_code     IN OUT VARCHAR2,
                                       p_err_param    IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION fn_obmacore_ccypair_entity(p_ccypair_rec     IN cytms_ccy_pair_defn_master%ROWTYPE,
                                      p_ccypair_rec_det IN cyvws_cpair_chk_thruccy%ROWTYPE,
                                      p_err_code        IN OUT VARCHAR2,
                                      p_err_param       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION fn_obmacore_ccyhol_entity(p_ccyhol_rec IN sttms_ccy_hol_master%ROWTYPE,
                                     p_err_code   IN OUT VARCHAR2,
                                     p_err_param  IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION fn_obmacore_exchrates_entity(p_exchrates_rec IN cytms_rates_master%ROWTYPE,
                                        p_err_code      IN OUT VARCHAR2,
                                        p_err_param     IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION fn_obmacore_lcy_entity(p_lcyhol_rec IN sttms_lcl_hol_master%ROWTYPE,
                                  p_err_code   IN OUT VARCHAR2,
                                  p_err_param  IN OUT VARCHAR2)
    RETURN BOOLEAN;
	--FCUBS_14.5.0.0.0_INTERNAL_SFR#_33448785 starts
    FUNCTION fn_obmacore_crbrn_entity(p_corebrn_rec   IN sttm_core_branch%ROWTYPE,
                                    p_corebrn_rec_det IN sttm_core_branch_pref%ROWTYPE,
                                    p_err_code        IN OUT VARCHAR2,
                                    p_err_param       IN OUT VARCHAR2)
    RETURN BOOLEAN;
	--FCUBS_14.5.0.0.0_INTERNAL_SFR#_33448785 ends
END stpks_obmacore_entity_populate;
/
create or replace synonym stpkss_obmacore_entity_populate for stpks_obmacore_entity_populate
/