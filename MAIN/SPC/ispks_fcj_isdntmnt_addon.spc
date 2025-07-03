CREATE OR REPLACE PACKAGE  ispks_fcj_isdntmnt_addon AS
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
  
  SFR Number         :  
  Changed By         :  
  Change Description :  
  
  -------------------------------------------------------------------------------------------------------
  */
  
  
FUNCTION fn_pre_check_mandatory(p_source		IN  cotms_source.source_code%TYPE,
p_action_code		IN  VARCHAR2,
p_isdntmnt IN  OUT  ispks_fcj_isdntmnt.ty_isdntmnt,
p_err_code       IN  OUT VARCHAR2,
p_err_params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_post_check_mandatory(p_source		IN  cotms_source.source_code%TYPE,
p_action_code		IN  VARCHAR2,
p_pk_or_full     IN  VARCHAR2 DEFAULT 'FULL',
p_isdntmnt IN   ispks_fcj_isdntmnt.ty_isdntmnt,
p_err_code       IN  OUT VARCHAR2,
p_err_params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_pre_default_and_validate (p_source		IN  cotms_source.source_code%TYPE,
p_source_operation     IN  VARCHAR2,
p_action_code		IN  VARCHAR2,
p_isdntmnt IN   ispks_fcj_isdntmnt.ty_isdntmnt,
p_err_code       IN  OUT VARCHAR2,
p_err_params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_post_default_and_validate (p_source		IN  cotms_source.source_code%TYPE,
p_source_operation     IN  VARCHAR2,
p_action_code		IN  VARCHAR2,
p_isdntmnt IN   ispks_fcj_isdntmnt.ty_isdntmnt,
p_prev_isdntmnt IN OUT ispks_fcj_isdntmnt.ty_isdntmnt,
p_wrk_isdntmnt IN OUT  ispks_fcj_isdntmnt.ty_isdntmnt,
p_err_code       IN  OUT VARCHAR2,
p_err_params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_pre_upload_db (p_source		IN  cotms_source.source_code%TYPE,
p_action_code		IN  VARCHAR2,
p_post_upl_stat		IN  VARCHAR2,
p_multi_trip_id    IN  VARCHAR2,
p_prev_isdntmnt IN ispks_fcj_isdntmnt.ty_isdntmnt,
p_wrk_isdntmnt IN OUT  ispks_fcj_isdntmnt.ty_isdntmnt,
p_err_code       IN  OUT VARCHAR2,
p_err_params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_post_upload_db (p_source		IN  cotms_source.source_code%TYPE,
p_action_code		IN  VARCHAR2,
p_post_upl_stat		IN  VARCHAR2,
p_multi_trip_id    IN  VARCHAR2,
p_prev_isdntmnt IN ispks_fcj_isdntmnt.ty_isdntmnt,
p_wrk_isdntmnt IN OUT  ispks_fcj_isdntmnt.ty_isdntmnt,
p_err_code       IN  OUT VARCHAR2,
p_err_params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_pre_query  ( p_source		IN  cotms_source.source_code%TYPE,
p_isdntmnt IN   ispks_fcj_isdntmnt.ty_isdntmnt,
p_wrk_isdntmnt IN OUT   ispks_fcj_isdntmnt.ty_isdntmnt,
p_err_code          IN OUT VARCHAR2,
p_err_params        IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_post_query  ( p_source		IN  cotms_source.source_code%TYPE,
p_isdntmnt IN   ispks_fcj_isdntmnt.ty_isdntmnt,
p_wrk_isdntmnt IN OUT   ispks_fcj_isdntmnt.ty_isdntmnt,
p_err_code          IN OUT VARCHAR2,
p_err_params        IN OUT VARCHAR2)
RETURN BOOLEAN;

END ispks_fcj_isdntmnt_addon;
/
CREATE OR REPLACE SYNONYM ispkss_fcj_isdntmnt_addon FOR ispks_fcj_isdntmnt_addon
/
