CREATE OR REPLACE PACKAGE real_debug AS
  /*------------------------------------------------------------------------------------------
   **
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
-------------------------------------------------------------------------------------------------
  CHANGE HISTORY
  
  Changed By         :  RADHA
  Change Description :  Pr_Set_Async_Ref is added
  
  FC UBS 10.2.0.0.0.0.2 BM Changes
  Modified By         : Kunal
  Modified On         : 5-Jan-2008
  Modified Reason     : Debug Optimization
        As the part of BM Retro Changes, this files is replace with the
        Existing Debug.SPC file from FC_UBS_V.UM_10.2.0.0.0.0.0 Area
  Retro Reference     : 10.2Emrel-SourceChangeTracker.xls/Change List/PF-007
  
  Changed By         :  Manasa G
    Change Description :  Forward Porting for SFR#18107395
    Search Tag      :Fix for 18327950
	
	Changed By         :  Shen
  Change Description :  FCUBS deployment for cloud OCI Changes to log the Messages in Table
  Search Tag         : FCUBS DB Logging Debug Changes
  -------------------------------------------------------------------------------------------------------
  */
  pkg_debug_on   SMALLINT := 0;
  --pkg_file_name         VARCHAR2(255);
  pkg_file_name         VARCHAR2(500); --Common_Entity_Length_Changes
  pkg_debug_mods VARCHAR2(2000);
  PROCEDURE pr_set_async_ref(p_ref IN VARCHAR2);
  PROCEDURE pr_debug(module VARCHAR2,
                     line   VARCHAR2);
  PROCEDURE pr_cdebug(module IN VARCHAR2,
                      line   IN CLOB);
  PROCEDURE pr_close;
  PROCEDURE pr_close_db;--FCUBS DB Logging Debug Changes_3 added
  FUNCTION fn_get_debug_str RETURN VARCHAR2; --Fix for 18327950
  PROCEDURE pr_reset_handle;
  PROCEDURE pr_reopen_handle;
  FUNCTION fn_is_file_open RETURN BOOLEAN;
  
  --FCUBS DB Logging Debug Changes starts
   PROCEDURE pr_db_debug(module VARCHAR2, line VARCHAR2);
   PROCEDURE pr_db_cdebug(module VARCHAR2, line CLOB);
   PROCEDURE pr_log_db_debug;
   --FCUBS DB Logging Debug Changes ends
   
END real_debug;
/
create or replace synonym reals_debug for real_debug
/
