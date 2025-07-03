CREATE OR REPLACE PACKAGE lbpks_upload_addon_custom IS

  /*------------------------------------------------------------------------------
  ** File Name      : lbpks_upload_addon_custom.SPC
  **
  ** Module     :LOAN SYNDICATION
  **
    This source is part of the Oracle Banking Corporate Lending  Software Product.
    Copyright ?? 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.
    No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.

    Oracle Financial Services Software Limited.
    Oracle Park, Off Western Express Highway,
    Goregaon (East),
    Mumbai - 400 063, India.

  ------------------------------CHANGE HISTORY-----------------------------------------------
    Changed By         : Rajni Kumari
  Changed On         : 13-June-2022
  Search String      : bug#34273835 changes
  Change Reason      : HOOK REQUIRED FOR DRAWDOWN IS REVOLVING OR NON REVOLVING IN MANUAL FUNDING MEMO SCREEN.
  ************************************************************/
--bug#34273835 Starts
FUNCTION fn_pre_upload_contract(PSOURCECODE            IN OLTBS_UPLOAD_MASTER.SOURCE_CODE%TYPE,
                              PEXTREFNO            IN OLTBS_UPLOAD_MASTER.EXT_CONTRACT_REF_NO%TYPE,
                              PIMPMODE             IN VARCHAR2,
                              PCUBEREFNO           IN OLTBS_CONTRACT.CONTRACT_REF_NO%TYPE,
                              P_MASTEREC           IN OLTBS_UPLOAD_MASTER%ROWTYPE,
                              TBL_UPLOAD_SCHEDULES IN OUT lbpks_upload_addon.TBL_UPL_SCH,
                              TBL_UPLOAD_LINKAGES  IN OUT lbpks_upload_addon.TBL_UPL_LINKAGES,
                              P_MIS_REC            IN OLTBS_UPLOAD_CLASS_MAPPING%ROWTYPE,
                              TB_UDF               IN OLPKSS_UPLOAD_UD.TBL_UDF_TYPE,
                              TB_SETTLE            IN OLPKSS_UPLOAD.TBL_SETTLE_TYPE,
                              p_Fn_Call_Id         in out Number,
                              p_Tb_Custom_Data in out Global.Ty_Tb_Custom_Data, --custom data
                              TB_INTEREST1         IN LFPKSS_UPLOAD.TBL_INTEREST_TYPE,
                              PPOSTIMPSTATUS IN VARCHAR2,
                              PERRORCODE     IN OUT VARCHAR2,
                              PERRORPARAMS   IN OUT VARCHAR2)
    RETURN BOOLEAN;

FUNCTION fn_post_upload_contract(PSOURCECODE            IN OLTBS_UPLOAD_MASTER.SOURCE_CODE%TYPE,
                              PEXTREFNO            IN OLTBS_UPLOAD_MASTER.EXT_CONTRACT_REF_NO%TYPE,
                              PIMPMODE             IN VARCHAR2,
                              PCUBEREFNO           IN OLTBS_CONTRACT.CONTRACT_REF_NO%TYPE,
                              P_MASTEREC           IN OLTBS_UPLOAD_MASTER%ROWTYPE,
                              TBL_UPLOAD_SCHEDULES IN OUT lbpks_upload_addon.TBL_UPL_SCH,
                              TBL_UPLOAD_LINKAGES  IN OUT lbpks_upload_addon.TBL_UPL_LINKAGES,
                              P_MIS_REC            IN OLTBS_UPLOAD_CLASS_MAPPING%ROWTYPE,
                              TB_UDF               IN OLPKSS_UPLOAD_UD.TBL_UDF_TYPE,
                              TB_SETTLE            IN OLPKSS_UPLOAD.TBL_SETTLE_TYPE,
                              p_Fn_Call_Id         in out Number,
                              p_Tb_Custom_Data in out Global.Ty_Tb_Custom_Data, --custom data
                              TB_INTEREST1         IN LFPKSS_UPLOAD.TBL_INTEREST_TYPE,
                              PPOSTIMPSTATUS IN VARCHAR2,
                              PERRORCODE     IN OUT VARCHAR2,
                              PERRORPARAMS   IN OUT VARCHAR2)
    RETURN BOOLEAN;
    
 --bug#34273835 Ends
END lbpks_upload_addon_custom;
/