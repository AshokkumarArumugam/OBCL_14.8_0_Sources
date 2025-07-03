CREATE OR REPLACE PACKAGE  stpks_fcj_stdcchol AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : STPKS_FCJ_STDCCHOL.SPC
  **
  ** Module     : Static Maintenance
  ** 
  ** This source is part of the Oracle FLEXCUBE Software System and is copyrighted by Oracle Financial Services Software Limited.
  ** 
  ** 
  ** All rights reserved. No part of this work may be reproduced, stored in a retrieval system,
  ** adopted or transmitted in any form or by any means, electronic, mechanical, photographic,
  ** graphic, optic recording or otherwise, translated in any language or computer language,
  ** without the prior written permission of Oracle Financial Services Software Limited.
  ** 
  ** Oracle Financial Services Software Limited.
  ** 10-11, SDF I, SEEPZ, Andheri (East),
  ** Mumbai - 400 096.
  ** India
  ** Copyright © 2008 - 2016 Oracle Financial Services Software Limited. All rights reserved.
  -------------------------------------------------------------------------------------------------------
  CHANGE HISTORY
  
  Changed By         :  SYSTEM
  Change Description :  15-SEP-2016 15:39:06
  
  -------------------------------------------------------------------------------------------------------
  */
  
  
TYPE ty_tb_cchol_sttms_ccy_holiday IS TABLE OF sttm_ccy_holiday%ROWTYPE INDEX BY BINARY_INTEGER;

TYPE ty_stdcchol IS RECORD (
                 cchol_sttms_ccy_hol_master          sttm_ccy_hol_master%ROWTYPE,
                 cchol_sttms_ccy_holiday          ty_tb_cchol_sttms_ccy_holiday,
                 addl_info    Stpks_Fcmaint_Service.Ty_Addl_info );


FUNCTION fn_process_msg(p_source            IN     cotms_source.source_code%TYPE,
                        p_source_operation  IN     VARCHAR2,
                        p_action_code       IN     VARCHAR2,
                        p_multi_trip_id     IN OUT    VARCHAR2,
                        p_tb_xml_data		   IN OUT Stpks_Fcmaint_Service.ty_tb_xml_data,
                        p_addl_info			IN OUT Stpks_Fcmaint_Service.Ty_Addl_Info,
                        p_status            IN OUT VARCHAR2 ,
                        p_err_code          IN OUT VARCHAR2,
                        p_err_params        IN OUT VARCHAR2)
RETURN BOOLEAN;


FUNCTION fn_process_msg(p_source            IN     cotms_source.source_code%TYPE,
                        p_source_operation  IN     VARCHAR2,
                        p_action_code       IN     VARCHAR2,
                        p_exchange_pattern	IN     VARCHAR2,
                        p_multi_trip_id     IN OUT VARCHAR2,
                        p_parents_List      IN OUT NOCOPY CLOB,
                        P_Parents_Format    IN OUT NOCOPY CLOB,
                        P_Tag_Names         IN OUT NOCOPY CLOB,
                        P_Tag_Values        IN OUT NOCOPY CLOB,
                        p_addl_info			IN OUT Stpks_Fcmaint_Service.Ty_Addl_Info,
                        p_status            IN OUT VARCHAR2 ,
                        p_err_code          IN OUT VARCHAR2,
                        p_err_params        IN OUT VARCHAR2)
RETURN BOOLEAN;


FUNCTION Fn_Main       (p_source            IN     cotms_source.source_code%TYPE,
                        p_source_operation  IN     VARCHAR2,
                        p_action_code       IN     VARCHAR2,
                        p_multi_trip_id     IN OUT VARCHAR2,
                        p_stdcchol          IN OUT ty_stdcchol,
                        p_status            IN OUT VARCHAR2 ,
                        p_err_code          IN OUT VARCHAR2,
                        p_err_params        IN OUT VARCHAR2)
RETURN BOOLEAN;

END stpks_fcj_stdcchol;
/
CREATE OR REPLACE SYNONYM stpkss_fcj_stdcchol FOR stpks_fcj_stdcchol
/