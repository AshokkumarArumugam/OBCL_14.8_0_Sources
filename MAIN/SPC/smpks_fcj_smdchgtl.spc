CREATE OR REPLACE PACKAGE smpks_fcj_smdchgtl AS
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product
** Copyright © 2007 - 2009  Oracle and/or its affiliates.  All rights reserved.
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
-----------------------------------------------------------------------------------------------------
    CHANGE HISTORY
    
    Changed By         :  SYSTEM
    Change Description :  27-JUN-2007 20:32:01
    
    -------------------------------------------------------------------------------------------------------
    */

    TYPE ty_tb_gtl_smvw_users_timelevel IS TABLE OF smvw_users_timelevel%ROWTYPE INDEX BY BINARY_INTEGER;

    TYPE ty_smdchgtl IS RECORD(
        chgtl_smvw_users_timelevel  ty_tb_gtl_smvw_users_timelevel,
        chgtl_smvws_users_timelevel smvw_users_timelevel%ROWTYPE,
        udf_details                 copkss_udf_upload.ty_upl_func_udf,
        addl_info                   stpks_fcmaint_service.ty_addl_info);

    FUNCTION fn_process_msg(p_source           IN cotms_source.source_code%TYPE
                           ,p_source_operation IN VARCHAR2
                           ,p_action_code      IN VARCHAR2
                           ,p_multi_trip_id    IN OUT VARCHAR2
                           ,p_tb_xml_data      IN OUT stpks_fcmaint_service.ty_tb_xml_data
                           ,p_addl_info        IN OUT stpks_fcmaint_service.ty_addl_info
                           ,p_status           IN OUT VARCHAR2
                           ,p_err_code         IN OUT VARCHAR2
                           ,p_err_params       IN OUT VARCHAR2) RETURN BOOLEAN;

    FUNCTION fn_main(p_source           IN cotms_source.source_code%TYPE
                    ,p_source_operation IN VARCHAR2
                    ,p_action_code      IN VARCHAR2
                    ,p_multi_trip_id    IN OUT VARCHAR2
                    ,p_smdchgtl         IN OUT ty_smdchgtl
                    ,p_status           IN OUT VARCHAR2
                    ,p_err_code         IN OUT VARCHAR2
                    ,p_err_params       IN OUT VARCHAR2) RETURN BOOLEAN;

END smpks_fcj_smdchgtl;
/
create or replace synonym smpkss_fcj_smdchgtl for smpks_fcj_smdchgtl
/
