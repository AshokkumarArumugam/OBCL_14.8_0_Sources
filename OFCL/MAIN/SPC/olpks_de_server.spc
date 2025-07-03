create or replace package olpks_de_server AS
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name    : olpks_de_server.SPC
  **
  ** Module       : DATA ENTRY
  **
  This source is part of the Oracle Banking Corporate Lending  Software Product.
  Copyright ? 2019 , Oracle and/or its affiliates.  All rights reserved.
  No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.
  
  Oracle Financial Services Software Limited.
  Oracle Park, Off Western Express Highway,
  Goregaon (East),
  Mumbai - 400 063, India.
  ----------------------------------------------------------------------------------------------------
  */

  -- OBJECT : olpks_de_server               DATE /TIME : 07-NOV-96 20:00 hrs
  -- AUTHOR K.SAIRAM

  /*--CHANGE HISTORY------------------------------------------------------------------------------------
  
  -- 23.05.202 FCC 4.0 JUNE 2002 PLNCITI Til# 558.. New function for faster processing..
  
  03.03.2003 FCC4.2 APR 2003 Ceemea SFR# 9243: In fn_jrnl_book and fn_jrnl_auth the variable pm_automan is changed to varchar2.
  -----------------------------------------------------------------------------------------------------
  */

  fname UTL_FILE.FILE_TYPE;

  -- The following variables are used by multi offset input function to
  -- display the overrides one by one

  TYPE t_acc_entry IS TABLE OF oltbs_handoff%ROWTYPE INDEX BY BINARY_INTEGER;

  pk_error_codes varchar2(2000);
  pk_params      varchar2(10000);

  -- Function to get the nth Error code / parameters

  /*PROCEDURE pr_get_nth_err_code(
  pm_n    IN  INTEGER,
  pm_err_code IN OUT  varchar2,
  pm_params IN OUT  varchar2
  );*/

  -- Function to update the batch totals after deletion

  FUNCTION fn_update_batch_totals(pm_Branch      IN oltbs_batch_master.branch_code%TYPE,
                                  pm_Batch       IN oltbs_batch_master.batch_no%TYPE,
                                  pm_reference   IN oltbs_teller_master.reference_no%TYPE,
                                  pm_evnt_seq_no IN oltbs_teller_master.evnt_seq_no%TYPE)
    RETURN BOOLEAN;

  -- Function to delete addl text and overrides

  /*FUNCTION fn_delete_ovd_text(
  pm_reference  IN  oltbs_teller_master.reference_no%TYPE,
  pm_evnt_seq_no  IN  oltbs_teller_master.evnt_seq_no%TYPE,
  pm_from_purge IN  char DEFAULT 'N'
  )RETURN BOOLEAN;*/

  -- Function to get the commit frequeny

  /*FUNCTION fn_get_commit_freq(
  pm_funcid IN  varchar2
  )RETURN NUMBER;*/

  -- Function to book the entries for journal transactions

  FUNCTION fn_jrnl_book(pm_Reference IN oltbs_jrnl_log_de.reference_no%TYPE,
                        pm_Appldate  IN oltbs_jrnl_log_de.value_date%TYPE,
                        pm_Lcy       IN oltbs_jrnl_log_de.ccy_cd%TYPE,
                        pm_Authflag  IN char,
                        -- Start: SFR# 9243
                        --pm_AutoMan IN  char,
                        pm_AutoMan IN varchar2,
                        -- End: SFR# 9243
                        pm_errcode IN OUT varchar2,
                        pm_params  IN OUT varchar2) RETURN BOOLEAN;

  -- fn_jrnl_book overloaded function - all online programs uses the first function
  -- upload programs uses the
  --  above function decalaration changed by pravin on 25/07/98
  --  one more parameter pm_jrnllogrec optional parameter has been added
  --  since for the batch upload program, we can avoid one more read on oltbs_jrnl_log_de

  /*FUNCTION fn_jrnl_book(
  pm_Reference  IN  oltbs_jrnl_log_de.reference_no%TYPE,
  pm_Appldate IN  oltbs_jrnl_log_de.value_date%TYPE,
  pm_Lcy    IN  oltbs_jrnl_log_de.ccy_cd%TYPE,
  pm_Authflag IN  char,
  pm_AutoMan  IN  char,
  pm_errcode  IN OUT  varchar2,
  pm_params IN OUT  varchar2,
  --pm_jrnllogrec  in   oltbs_jrnl_log_de%rowtype := null
  pm_jrnllogrec  in   oltbs_jrnl_log_de%rowtype --Removed the default option
  
  ) RETURN BOOLEAN;*/

  -- Function to delete the entries for journal transactions

  FUNCTION fn_jrnl_delete(pm_branch     IN oltbs_jrnl_log_de.branch_code%TYPE,
                          pm_Appldate   IN date,
                          pm_Lcy        IN oltbs_jrnl_log_de.ccy_cd%TYPE,
                          pm_Reference  IN oltbs_jrnl_log_de.reference_no%TYPE,
                          pm_AutoMan    IN char,
                          pm_errcode    IN OUT varchar2,
                          pm_params     IN OUT varchar2,
                          pm_from_purge IN char DEFAULT 'N') RETURN BOOLEAN;

  -- Function to delete the entries from a journal batch

  /*FUNCTION fn_jrnl_batch_delete(
  pm_Branch IN  oltbs_jrnl_log_de.branch_code%TYPE,
  pm_Appldate IN  date,
  pm_Lcy    IN  oltbs_jrnl_log_de.ccy_cd%TYPE,
  pm_Batch  IN  oltbs_jrnl_log_de.batch_no%TYPE,
  pm_AutoMan  IN  char,
  pm_tot_entries  IN OUT  oltbs_batch_master.curr_no%TYPE,
  pm_del_entries  IN OUT  oltbs_batch_master.curr_no%TYPE,
  pm_errcode  IN OUT  varchar2,
  pm_params IN OUT  varchar2,
  pm_from_purge IN  char DEFAULT 'N'
  ) RETURN BOOLEAN;*/

  -- Function to authorize the entries for journal transactions

  FUNCTION fn_jrnl_auth(pm_Branch    IN oltbs_jrnl_log_de.branch_code%TYPE,
                        pm_Batch     IN oltbs_jrnl_log_de.batch_no%TYPE,
                        pm_Reference IN oltbs_jrnl_log_de.reference_no%TYPE,
                        pm_Appldate  IN varchar2,
                        pm_Lcy       IN oltbs_jrnl_log_de.ccy_cd%TYPE,
                        pm_User      IN oltbs_jrnl_log_de.checker_id%TYPE,
                        -- Start: SFR# 9243
                        --pm_AutoMan IN  char,
                        pm_AutoMan IN varchar2,
                        -- End: SFR# 9243
                        pm_errcode IN OUT varchar2,
                        pm_params  IN OUT varchar2) RETURN BOOLEAN;

  -- Function to authorize the entries for journal transactions
  --OFCL12.3 changes starts
  /*FUNCTION fn_jrnl_batch_auth(
    pm_Branch IN  oltbs_jrnl_log_de.branch_code%TYPE,
    pm_Batch  IN  oltbs_jrnl_log_de.batch_no%TYPE,
    pm_Appldate IN  varchar2,
    pm_Lcy    IN  oltbs_jrnl_log_de.ccy_cd%TYPE,
    pm_User   IN  oltbs_jrnl_log_de.checker_id%TYPE,
    pm_AutoMan  IN  char,
    pm_Authlimit  IN  oltbs_jrnl_log_de.lcy_amount%TYPE,
    pm_tot_entries  IN OUT  oltbs_batch_master.curr_no%TYPE,
    pm_auth_entries IN OUT  oltbs_batch_master.curr_no%TYPE,
    pm_errcode  IN OUT  varchar2,
    pm_params IN OUT  varchar2
    ) RETURN BOOLEAN;
  --OFCL12.3 changes ends */
  -- Function to book the entries for multi-offset transactions

  /*FUNCTION fn_moff_book(
  pm_Branch IN  oltbs_mlt_offset_master.branch_code%TYPE,
  pm_Reference  IN  oltbs_mlt_offset_master.reference_no%TYPE,
  pm_Appldate IN  oltbs_mlt_offset_master.value_date%TYPE,
  pm_Lcy    IN  oltbs_mlt_offset_master.ccy_cd%TYPE,
  pm_Authflag IN  char,
  pm_AutoMan  IN  char,
  pm_errcode  IN OUT  varchar2,
  pm_params IN OUT  varchar2
  ) RETURN BOOLEAN;*/

  -- Function to delete the entries for multi-offset transactions
  --OFCL12.3 changes starts
  FUNCTION fn_moff_delete(pm_branch     IN oltbs_jrnl_log_de.branch_code%TYPE,
                          pm_Appldate   IN date,
                          pm_Lcy        IN oltbs_jrnl_log_de.ccy_cd%TYPE,
                          pm_Reference  IN oltbs_jrnl_log_de.reference_no%TYPE,
                          pm_AutoMan    IN char,
                          pm_errcode    IN OUT varchar2,
                          pm_params     IN OUT varchar2,
                          pm_from_purge IN char DEFAULT 'N') RETURN BOOLEAN;
  --OFCL12.3 changes ends
-- Function to delete the batch for multi - offset entries

/*FUNCTION fn_moff_batch_delete(
  pm_Branch IN  oltbs_jrnl_log_de.branch_code%TYPE,
  pm_Appldate IN  date,
  pm_Lcy    IN  oltbs_jrnl_log_de.ccy_cd%TYPE,
  pm_Batch  IN  oltbs_jrnl_log_de.batch_no%TYPE,
  pm_AutoMan  IN  char,
  pm_tot_entries  IN OUT  oltbs_batch_master.curr_no%TYPE,
  pm_del_entries  IN OUT  oltbs_batch_master.curr_no%TYPE,
  pm_errcode  IN OUT  varchar2,
  pm_params IN OUT  varchar2,
  pm_from_purge IN  char DEFAULT 'N'
  ) RETURN BOOLEAN;*/

-- Function to authorize the entries for multi-offset transactions

/*FUNCTION fn_moff_auth(
  pm_Branch IN  oltbs_jrnl_log_de.branch_code%TYPE,
  pm_Batch  IN  oltbs_jrnl_log_de.batch_no%TYPE,
  pm_Reference  IN  oltbs_jrnl_log_de.reference_no%TYPE,
  pm_Appldate IN  varchar2,
  pm_Lcy    IN  oltbs_jrnl_log_de.ccy_cd%TYPE,
  pm_User   IN  oltbs_jrnl_log_de.checker_id%TYPE,
  pm_AutoMan  IN  char,
  pm_errcode  IN OUT  varchar2,
  pm_params IN OUT  varchar2
  ) RETURN BOOLEAN;*/

-- Function to authorize the entries in a batch

/*FUNCTION fn_moff_batch_auth(
  pm_Branch IN  oltbs_mlt_offset_master.branch_code%TYPE,
  pm_Batch  IN  oltbs_mlt_offset_master.batch_no%TYPE,
  pm_Appldate IN  varchar2,
  pm_Lcy    IN  oltbs_jrnl_log_de.ccy_cd%TYPE,
  pm_User   IN  oltbs_mlt_offset_master.checker_id%TYPE,
  pm_AutoMan  IN  char,
  pm_Authlimit  IN  oltbs_mlt_offset_master.lcy_amount%TYPE,
  pm_tot_entries  IN OUT  oltbs_batch_master.curr_no%TYPE,
  pm_auth_entries IN OUT  oltbs_batch_master.curr_no%TYPE,
  pm_errcode  IN OUT  varchar2,
  pm_params IN OUT  varchar2
  ) RETURN BOOLEAN;*/

-- 23.05.202 FCC 4.0 JUNE 2002 PLNCITI Til# 558.. New function for faster processing..
/*FUNCTION fn_jrnl_eod_delete(
  pm_branch IN    oltbs_batch_master.branch_code%TYPE,
  pm_errcode  IN OUT  varchar2,
  pm_params IN OUT  varchar2
  )
RETURN BOOLEAN;*/

END olpks_de_server;
/
CREATE OR REPLACE SYNONYM olpkss_serverx FOR olpks_de_server
/