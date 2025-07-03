CREATE OR REPLACE PACKAGE olpks_notif_filter_wrapper AS

  /*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 1999- 2009  Oracle and/or its affiliates.  All rights reserved.
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
-------------------------------------------------------------------------------------------------*/


  g_Return           boolean := true;
  g_err_code varchar2(32767);
  g_err_params varchar2(32767);
  g_pkey_fld_out varchar2(32767);
  g_pkey_val_out  varchar2(32767);
  g_process_notif varchar2(1);
  FUNCTION Fn_Process_Msg(p_notif_code    IN VARCHAR2,
                           p_notif_id    IN VARCHAR2,
                           p_rec_rowid in varchar2,
                           p_operation in varchar2,
                           p_gw_service in varchar2,
                           p_gw_operation in varchar2,
                           p_Req_Node_List in varchar2,
                           p_module  in VARCHAR2, 
                           p_pkey_fields   IN OUT VARCHAR2,
                           p_pkey_values   IN OUT VARCHAR2,
                           p_pkey_fld_out  OUT VARCHAR2,
                           p_pkey_val_out  OUT VARCHAR2,
                           p_process_notif OUT VARCHAR2,
                           p_err_code      OUT VARCHAR2,
                           p_err_params     OUT VARCHAR2) RETURN BOOLEAN;

END olpks_notif_filter_wrapper;
/