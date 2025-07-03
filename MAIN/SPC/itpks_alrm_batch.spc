CREATE OR REPLACE PACKAGE itpks_alrm_batch IS

  /*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2008 - 2012  Oracle and/or its affiliates.  All rights reserved.
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
  -------------------------------------------------------------------------------------------------------
  CHANGE HISTORY


  Changed By         : shashanka k
  Change Description : addaed alert code parameter to fn_reminder_process
  date				 : 21 mar 2012
  search string      : FCUBS_12.0::9NT1501::21 mar 2012@ALERT CODE
  -------------------------------------------------------------------------------------------------------
  */

  TYPE ty_alrmbatch IS RECORD(
    v_ittb_communications ittb_communications%ROWTYPE);

  PROCEDURE pr_process(p_param_names VARCHAR2,p_param_vals  VARCHAR2);
  --begins FCUBS_12.0::9NT1501::21 mar 2012@ALERT CODE
  FUNCTION fn_alert_process(p_alert_code IN VARCHAR2,
							p_err_code    IN OUT VARCHAR2,
							p_err_message IN OUT VARCHAR2)
  RETURN BOOLEAN;
  --ends FCUBS_12.0::9NT1501::21 mar 2012@ALERT CODE

  FUNCTION fn_reminder_process(p_batch       IN VARCHAR2,
                               p_err_code    IN OUT VARCHAR2,
                               p_err_message IN OUT VARCHAR2) return boolean;
  FUNCTION fn_pop_commt(p_commt IN OUT ittb_communications%ROWTYPE)
    return boolean;

  FUNCTION fn_log_batch(p_log_batch_master ITTB_BATCH_LOG_MASTER%ROWTYPE,
                        p_log_batch_detail ITTB_BATCH_LOG_DETAILS%ROWTYPE)
    return boolean;
    
    FUNCTION Fn_due_date (p_frequency IN VARCHAR2,p_date IN OUT DATE) RETURN BOOLEAN;
    Function fn_itsysdate
Return Date;
    
    FUNCTION Fn_Get_Sequence_Nextval(p_Seq_Name   IN VARCHAR2
                                   ,p_Nextval    OUT INTEGER
                                   ,p_Error_Code IN OUT VARCHAR2) RETURN BOOLEAN;

END itpks_alrm_batch;
/
CREATE OR REPLACE SYNONYM itpkss_alrm_batch FOR itpks_alrm_batch
/
