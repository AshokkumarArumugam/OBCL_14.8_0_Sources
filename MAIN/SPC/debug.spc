CREATE OR REPLACE PACKAGE debug AS
  /*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Software Product.
** Copyright (R) 2016 , Oracle and/or its affiliates.  All rights reserved
**
**
** No part of this work may be reproduced, stored in a retrieval system, adopted
** or transmitted in any form or by any means, electronic, mechanical,
** photographic, graphic, optic recording or otherwise, translated in any
** language or computer language, without the prior written permission of
** Oracle and/or its affiliates.
**
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India
** India
------------------------------------------------------------------------------------------
*/
/*
FC10 Performance Change PF-007 New Unit
  
  ** FC UBS 10.2.0.0.0.0.2 BM Changes
  ** Modified By         : Kunal
  ** Modified On         : 5-Jan-2008
  ** Modified Reason     : Debug Optimization
             As the part of BM Retro Changes, this file is Replace with
           Exissting Debug.SPC file which is Modified by Retro Bench Mark.
  ** Retro Reference     : 10.2Emrel-SourceChangeTracker.xls/Change List/PF-007
  **   
  ** Changed By         :  Shen
  ** Change Description :  FCUBS deployment for cloud OCI Changes to log the Messages in Table
  ** Search Tag         : FCUBS DB Logging Debug Changes	   
  */

  pkg_debug_on SMALLINT := 2; --FC10 Performance Change PF-007 due pkg invalid
--FCUBS DB Logging Debug Changes Starts
  pkg_user_debug_mode VARCHAR2(20) := 'FILE';
  g_db_log              CLOB := NULL;
  g_db_trace_log        CLOB := NULL;
  pkg_max_log_lines   	NUMBER := 5000;
  g_db_dbg_clob_max_line	NUMBER := 500000;
  --FCUBS DB Logging Debug Changes ends
  PROCEDURE pr_set_async_ref(p_ref IN VARCHAR2);

  PROCEDURE pr_debug(module VARCHAR2,
                     line   VARCHAR2);

  PROCEDURE pr_cdebug(module IN VARCHAR2,
                      line   IN CLOB);

  PROCEDURE pr_close;
  PROCEDURE pr_close_db;--FCUBS DB Logging Debug Changes_3 added
  PROCEDURE pr_log_db_debug; --FCUBS DB Logging Debug Changes
										
END debug;
/
