CREATE OR REPLACE PACKAGE  copks_fcj_codsorce_addon AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : COPKS_FCJ_CODSORCE_ADDON.SPC
  **
  ** Module     : Core Services
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
  
  SFR Number         :  
  Changed By         :  
  Change Description :  
  
  -------------------------------------------------------------------------------------------------------
  */
  
  
FUNCTION fn_pre_check_mandatory(p_source		IN  cotms_source.source_code%TYPE,
p_action_code		IN  VARCHAR2,
p_codsorce IN  OUT  copks_fcj_codsorce.ty_codsorce,
p_err_code       IN  OUT VARCHAR2,
p_err_params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_post_check_mandatory(p_source		IN  cotms_source.source_code%TYPE,
p_action_code		IN  VARCHAR2,
p_pk_or_full     IN  VARCHAR2 DEFAULT 'FULL',
p_codsorce IN   copks_fcj_codsorce.ty_codsorce,
p_err_code       IN  OUT VARCHAR2,
p_err_params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_pre_default_and_validate (p_source		IN  cotms_source.source_code%TYPE,
p_source_operation     IN  VARCHAR2,
p_action_code		IN  VARCHAR2,
p_codsorce IN   copks_fcj_codsorce.ty_codsorce,
p_err_code       IN  OUT VARCHAR2,
p_err_params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_post_default_and_validate (p_source		IN  cotms_source.source_code%TYPE,
p_source_operation     IN  VARCHAR2,
p_action_code		IN  VARCHAR2,
p_codsorce IN   copks_fcj_codsorce.ty_codsorce,
p_prev_codsorce IN OUT copks_fcj_codsorce.ty_codsorce,
p_wrk_codsorce IN OUT  copks_fcj_codsorce.ty_codsorce,
p_err_code       IN  OUT VARCHAR2,
p_err_params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_pre_upload_db (p_source		IN  cotms_source.source_code%TYPE,
p_action_code		IN  VARCHAR2,
p_post_upl_stat		IN  VARCHAR2,
p_multi_trip_id    IN  VARCHAR2,
p_prev_codsorce IN copks_fcj_codsorce.ty_codsorce,
p_wrk_codsorce IN OUT  copks_fcj_codsorce.ty_codsorce,
p_err_code       IN  OUT VARCHAR2,
p_err_params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_post_upload_db (p_source		IN  cotms_source.source_code%TYPE,
p_action_code		IN  VARCHAR2,
p_post_upl_stat		IN  VARCHAR2,
p_multi_trip_id    IN  VARCHAR2,
p_prev_codsorce IN copks_fcj_codsorce.ty_codsorce,
p_wrk_codsorce IN OUT  copks_fcj_codsorce.ty_codsorce,
p_err_code       IN  OUT VARCHAR2,
p_err_params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_pre_query  ( p_source		IN  cotms_source.source_code%TYPE,
p_codsorce IN   copks_fcj_codsorce.ty_codsorce,
p_wrk_codsorce IN OUT   copks_fcj_codsorce.ty_codsorce,
p_err_code          IN OUT VARCHAR2,
p_err_params        IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_post_query  ( p_source		IN  cotms_source.source_code%TYPE,
p_codsorce IN   copks_fcj_codsorce.ty_codsorce,
p_wrk_codsorce IN OUT   copks_fcj_codsorce.ty_codsorce,
p_err_code          IN OUT VARCHAR2,
p_err_params        IN OUT VARCHAR2)
RETURN BOOLEAN;

END copks_fcj_codsorce_addon;
/
CREATE OR REPLACE SYNONYM copkss_fcj_codsorce_addon FOR copks_fcj_codsorce_addon
/