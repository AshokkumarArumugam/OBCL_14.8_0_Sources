CREATE OR REPLACE PACKAGE rppks_fcj_rpdrnmnt AS
  /*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
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
-------------------------------------------------------------------------------------------------
  CHANGE HISTORY
  
  Changed By         :  SYSTEM
  Change Description :  30-JAN-2008 17:17:46
  
  -------------------------------------------------------------------------------------------------------
  */

  TYPE ty_tb_rnmnt_rptms_printer_role IS TABLE OF rptm_printer_role%ROWTYPE INDEX BY BINARY_INTEGER;

  TYPE ty_tb_rnmnt_rptms_printer_user IS TABLE OF rptm_printer_user%ROWTYPE INDEX BY BINARY_INTEGER;

  TYPE ty_rpdrnmnt IS RECORD(
    rnmnt_rptms_printer      rptm_printer%ROWTYPE,
    rnmnt_rptms_printer_role ty_tb_rnmnt_rptms_printer_role,
    rnmnt_rptms_printer_user ty_tb_rnmnt_rptms_printer_user,
    --udf_details              uvpkss_udf_upload.ty_upl_func_udf,
    addl_info                Stpks_Fcmaint_Service.Ty_Addl_info);

  FUNCTION fn_process_msg(p_source           IN cotms_source.source_code%TYPE,
                          p_source_operation IN VARCHAR2,
                          p_action_code      IN VARCHAR2,
                          p_multi_trip_id    IN OUT VARCHAR2,
                          p_tb_xml_data      IN OUT Stpks_Fcmaint_Service.ty_tb_xml_data,
                          p_addl_info        IN OUT Stpks_Fcmaint_Service.Ty_Addl_Info,
                          p_status           IN OUT VARCHAR2,
                          p_err_code         IN OUT VARCHAR2,
                          p_err_params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_process_msg(p_source           IN cotms_source.source_code%TYPE,
                          p_source_operation IN VARCHAR2,
                          p_action_code      IN VARCHAR2,
                          p_exchange_pattern IN VARCHAR2,
                          p_multi_trip_id    IN OUT VARCHAR2,
                          p_parents_list     IN OUT NOCOPY CLOB,
                          p_parents_format   IN OUT NOCOPY CLOB,
                          p_tag_names        IN OUT NOCOPY CLOB,
                          p_tag_Values       IN OUT NOCOPY CLOB,
                          p_addl_info        IN OUT Stpks_Fcmaint_Service.Ty_Addl_Info,
                          p_status           IN OUT VARCHAR2,
                          p_err_code         IN OUT VARCHAR2,
                          p_err_params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Main(p_source           IN cotms_source.source_code%TYPE,
                   p_source_operation IN VARCHAR2,
                   p_action_code      IN VARCHAR2,
                   p_multi_trip_id    IN OUT VARCHAR2,
                   p_rpdrnmnt         IN OUT ty_rpdrnmnt,
                   p_status           IN OUT VARCHAR2,
                   p_err_code         IN OUT VARCHAR2,
                   p_err_params       IN OUT VARCHAR2) RETURN BOOLEAN;

END rppks_fcj_rpdrnmnt;
/
CREATE OR REPLACE SYNONYM rppkss_fcj_rpdrnmnt FOR rppks_fcj_rpdrnmnt
/
