CREATE OR REPLACE PACKAGE  ispks_fcj_isdctmnt AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : ISPKS_FCJ_ISDCTMNT.SPC
  **
  ** Module     : Settlement Instructions
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
  ** Copyright © 2008 - 2017 Oracle Financial Services Software Limited. All rights reserved.
  -------------------------------------------------------------------------------------------------------
  CHANGE HISTORY
  
  Changed By         :  SYSTEM
  Change Description :  30-AUG-2017 15:34:37
  
  -------------------------------------------------------------------------------------------------------
  */
  
  

TYPE ty_isdctmnt IS RECORD (
                 ctmnt_istms_clearing_code          istm_clearing_code%ROWTYPE,
                 ctmnt_istms_network_code          istm_network_code%ROWTYPE,
                 ctmnt_sttms_country          sttm_country%ROWTYPE,
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
                        p_parents_list     IN OUT NOCOPY CLOB,
                        p_parents_format   IN OUT NOCOPY CLOB,
                        p_tag_names         IN OUT NOCOPY CLOB,
                        p_tag_Values        IN OUT NOCOPY CLOB,
                        p_addl_info			IN OUT Stpks_Fcmaint_Service.Ty_Addl_Info,
                        p_status            IN OUT VARCHAR2 ,
                        p_err_code          IN OUT VARCHAR2,
                        p_err_params        IN OUT VARCHAR2)
RETURN BOOLEAN;


FUNCTION Fn_Main       (p_source            IN     cotms_source.source_code%TYPE,
                        p_source_operation  IN     VARCHAR2,
                        p_action_code       IN     VARCHAR2,
                        p_multi_trip_id     IN OUT VARCHAR2,
                        p_isdctmnt          IN OUT ty_isdctmnt,
                        p_status            IN OUT VARCHAR2 ,
                        p_err_code          IN OUT VARCHAR2,
                        p_err_params        IN OUT VARCHAR2)
RETURN BOOLEAN;

END ispks_fcj_isdctmnt;
/
CREATE OR REPLACE SYNONYM ispkss_fcj_isdctmnt FOR ispks_fcj_isdctmnt
/
