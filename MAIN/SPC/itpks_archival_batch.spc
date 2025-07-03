CREATE OR REPLACE PACKAGE itpks_archival_batch IS

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

  SFR Number         :
  Changed By         :
  Change Description :

  -------------------------------------------------------------------------------------------------------
  */


PROCEDURE pr_process(p_param_names VARCHAR2,p_param_vals  VARCHAR2);
--FUNCTION fn_alert_process();
--FUNCTION fn_reminder_process();
FUNCTION fn_arch
return boolean;


FUNCTION fn_log_batch(p_log_batch_master ITTB_BATCH_LOG_MASTER%ROWTYPE,
                      p_log_batch_detail ITTB_BATCH_LOG_DETAILS%ROWTYPE)
return boolean;

Function fn_itsysdate
Return Date;


END itpks_archival_batch;
/
CREATE OR REPLACE SYNONYM itpkss_archival_batch FOR itpks_archival_batch
/
