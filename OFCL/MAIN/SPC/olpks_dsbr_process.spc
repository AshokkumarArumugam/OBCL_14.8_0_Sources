CREATE OR REPLACE PACKAGE olpks_dsbr_process AS
  /*
  ----------------------------------------------------------------------------------------------------
  **
  ** File Name    : olpks_dsbr_process.SPC
  **
  ** Module   : LD
  **
    This source is part of the Oracle Banking Corporate Lending  Software Product.
    Copyright @ 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.
    No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.

    Oracle Financial Services Software Limited.
    Oracle Park, Off Western Express Highway,
    Goregaon (East),
    Mumbai - 400 063, India.

      **Changed By         : Pallavi R
      **Date               : 11-Apr-2019
      **Change Description : Changes done for Disbursement on rollover
      **Search String      : OBCL_14.3_#29523475 Changes   	

    **Changed By         : Pallavi R
    **Changed On         : 19-Apr-2019
    **Change Description : Dsbr Changes MNDSB subsystems
    **Search String      : OBCL_14.3_#29632685 Changes  	

	**Changed By         : Vigneshram
	**Date               : 21-Oct-2019
	**Change Description : Payment details not poulated properly during disbursement after partial interest payment
	**Search String      : Bug#30411315		
  ----------------------------------------------------------------------------------------------------
  */

  g_dis_princ VARCHAR2(1) := 'N';
  g_redefine  VARCHAR2(1) := 'N';
  g_Dsbr_Process VARCHAR2(1) := 'N';
  g_Back_Dated     VARCHAR2(1) := 'N';
  g_Dsbr_Principal VARCHAR2(1) := 'N';
  g_Dsbb_Esn       NUMBER;--OBCL_14.3_#29632685 Changes
  g_Ins_Dsbr_Sch   VARCHAR2(1) := 'Y';--OBCL_14.3_#29523475 Changes
  tab_rate     olpkss_schedules.ty_rate;
  tab_amt_paid olvdss_services.ty_amt_paid;
  h_tab        olpkss_recompute_schedules.tab_ty_comput;
  sch_type     oltbs_contract_preference.contract_schedule_type%TYPE;
  amort_meth   oltbs_contract_preference.amortisation_type%TYPE;
  --amd_rec       oltbs_contract_amend_due%ROWTYPE;
  g_dsbr_esn    oltbs_contract_event_log.event_seq_no%TYPE;
  cont_sch_type VARCHAR2(15);

  i          BINARY_INTEGER;
  debug_mode CHAR(1) := 'Y';

  back_valued BOOLEAN;
  --date_chgd     BOOLEAN := FALSE;
  --rate_chgd     BOOLEAN := FALSE;
  prin_chgd BOOLEAN := FALSE;
  --amort_dt_chgd BOOLEAN := FALSE;

  action_code    VARCHAR2(2000);
  ret_err_code   VARCHAR2(500);
  ret_err_param  VARCHAR2(500);
  list_err_code  VARCHAR2(5000);
  list_err_param VARCHAR2(5000);

  g_call_to_fix_vami    VARCHAR2(1) := 'N';
  g_action_code_for_upl VARCHAR2(1);
  g_hfs_transfer        varchar2(1) := 'N';
  g_dsbr_sch      varchar2(1) := 'N'; -- Bug#30411315

  FUNCTION fn_process_disbursement(ref_no              IN oltbs_contract.contract_ref_no%TYPE,
                                   p_dsbr_esn          IN oltbs_contract_event_log.event_seq_no%TYPE,
                                   p_dsbr_ver          IN oltbs_contract_master.version_no%TYPE,
                                   latest_esn          IN OUT oltbs_contract_event_log.event_seq_no%TYPE,
                                   proc_date           IN DATE,
                                   p_mode              IN CHAR,
                                   err_code            IN OUT VARCHAR2,
                                   p_Rec_Cont_Dsbr_Sch IN OUT Oltbs_Contract_Dsbr_Sch%ROWTYPE,
                                   p_Cont_Mas_Rec      IN OUT Oltbs_Contract_Master%ROWTYPE,
                                   p_Cont_Pref         IN Oltbs_Contract_Preference%ROWTYPE,
                                   p_Contract_rec      IN Oltbs_Contract%ROWTYPE,
                                   p_Event_Code        IN oltbs_contract_event_log.Event_Code%TYPE DEFAULT 'DSBR')
    RETURN BOOLEAN;

  FUNCTION fn_regen_sch(ref_no              IN oltbs_contract.contract_ref_no%TYPE,
                        p_dsbrb_esn         IN oltbs_contract_event_log.event_seq_no%TYPE,
                        p_dsbr_ver          IN oltbs_contract_master.version_no%TYPE,
                        proc_date           IN DATE,
                        p_Rec_Cont_Dsbr_Sch IN OUT Oltbs_Contract_Dsbr_Sch%ROWTYPE,
                        p_Cont_Mas_Rec      IN OUT Oltbs_Contract_Master%ROWTYPE,
                        p_mode              IN CHAR) RETURN BOOLEAN;

  FUNCTION fn_sch_calc(ref_no              IN oltbs_contract.contract_ref_no%TYPE,
                       p_dsbr_ver          IN oltbs_contract_master.version_no%TYPE,
                       p_dsbrb_esn         IN oltbs_contract_event_log.event_seq_no%TYPE,
                       proc_date           IN DATE,
                       p_Rec_Cont_Dsbr_Sch IN OUT Oltbs_Contract_Dsbr_Sch%ROWTYPE,
                       p_Cont_Mas_Rec      IN OUT Oltbs_Contract_Master%ROWTYPE,
                       p_mode              IN CHAR) RETURN BOOLEAN;

  FUNCTION fn_dsbr(ref_no              IN oltbs_contract.contract_ref_no%TYPE,
                   p_dsbr_esn          IN oltbs_contract_event_log.event_seq_no%TYPE,
                   p_dsbr_ver          IN oltbs_contract_master.version_no%TYPE,
                   proc_date           IN DATE,
                   p_mode              IN CHAR,
                   p_Rec_Cont_Dsbr_Sch IN OUT Oltbs_Contract_Dsbr_Sch%ROWTYPE,
                   p_Cont_Mas_Rec      IN OUT Oltbs_Contract_Master%ROWTYPE,
                   p_Cont_Pref         IN Oltbs_Contract_Preference%ROWTYPE,
                   p_Contract_rec      IN Oltbs_Contract%ROWTYPE,
                   p_Event_Code        IN oltbs_contract_event_log.Event_Code%TYPE DEFAULT 'DSBR')
    RETURN BOOLEAN;

  FUNCTION fn_pass_entries(ref_no              IN oltbs_contract.contract_ref_no%TYPE,
                           p_dsbr_ver          IN oltbs_contract_master.version_no%TYPE,
                           p_dsbr_esn          IN oltbs_contract_master.event_seq_no%TYPE,
                           p_mode              IN CHAR,
                           p_Cont_Mas_Rec      IN Oltbs_Contract_Master%ROWTYPE,
                           p_Rec_Cont_Dsbr_Sch IN OUT Oltbs_Contract_Dsbr_Sch%ROWTYPE,
						    p_Cont_Pref         IN Oltbs_Contract_Preference%ROWTYPE, -- balli changes
                           p_Event_Code        IN Oltbs_Contract_Event_Log.Event_Code%TYPE DEFAULT 'DSBR',
                           p_Err_Code          IN OUT VARCHAR2,
                           p_Err_Params        IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_update_audit(ref_no       IN oltbs_contract.contract_ref_no%TYPE,
                           p_dsbr_esn   IN oltbs_contract_master.event_seq_no%TYPE,
                           p_dsbrb_esn  IN oltbs_contract_master.event_seq_no%TYPE,
                           p_mode       IN CHAR,
                           p_cont_stat  IN OUT CHAR,
                           p_Event_Code IN oltbs_contract_event_log.Event_Code%TYPE DEFAULT 'DSBR',
                           p_proc_date  IN DATE DEFAULT NULL) RETURN BOOLEAN;

  FUNCTION fn_call_isreferral(ref_no     IN oltbs_contract.contract_ref_no%TYPE,
                              p_dsbr_esn IN oltbs_contract_master.event_seq_no%TYPE)
    RETURN BOOLEAN;

  FUNCTION fn_floating_queue(ref_no     IN oltbs_contract.contract_ref_no%TYPE,
                             event_no   IN oltbs_contract_event_log.event_seq_no%TYPE,
                             p_dsbr_ver IN oltbs_contract_master.version_no%TYPE,
                             from_date  IN DATE) RETURN BOOLEAN;

  /*FUNCTION fn_amendment_reversal(p_contract_ref_no   IN OUT oltbs_contract.contract_ref_no%TYPE,
                               p_event_seq_no      IN oltbs_contract_event_log.event_seq_no%TYPE,
                               p_backup_required   IN VARCHAR2,
                               p_Rec_Cont_Dsbr_Sch IN OUT Oltbs_Contract_Dsbr_Sch%ROWTYPE,
                               p_Cont_Mas_Rec      IN OUT Oltbs_Contract_Master%ROWTYPE,
                               p_error_code        IN OUT VARCHAR2,
                               p_error_params      IN OUT VARCHAR2)
  RETURN BOOLEAN;*/

  /*FUNCTION fn_delete_amendment_reversal(p_contract_ref_no  IN oltbs_contract.contract_ref_no%TYPE,
                                      p_event_seq_no     IN oltbs_contract_event_log.event_seq_no%TYPE,
                                      p_restore_required IN VARCHAR2,
                                      p_error_code       IN OUT VARCHAR2,
                                      p_error_params     IN OUT VARCHAR2)
  RETURN BOOLEAN;*/

  PROCEDURE pr_dbg(msg IN VARCHAR2);

  FUNCTION fn_comt_cont_stat_updation(p_contract_ref_no   IN oltbs_contract.contract_ref_no%TYPE,
                                      p_event_seq_no      IN oltbs_contract.latest_event_seq_no%TYPE,
                                      p_Rec_Cont_Dsbr_Sch IN OUT Oltbs_Contract_Dsbr_Sch%ROWTYPE,
                                      p_err_code          IN OUT VARCHAR2,
                                      p_err_params        IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_get_agency_contract(p_contract_ref_no IN OLTB_CONTRACT_MASTER.contract_ref_no%type)
    RETURN VARCHAR2;

  FUNCTION fn_coc_bal_reduction(p_contract_ref_no IN oltbs_contract.contract_ref_no%type,
                                p_princ_change    IN oltbs_contract_amend_due.differential_amount%type,
                                p_value_date      IN oltbs_contract_reserve.value_date%type,
                                pErrorCode        IN OUT VARCHAR2,
                                pparam            IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_coc_bal_reversal(p_contract_ref_no IN oltbs_contract.contract_ref_no%type,
                               p_dsbr_esn        NUMBER,
                               p_dsbrR_esn       NUMBER,
                               p_value_date      IN oltbs_contract_reserve.value_date%type,
                               pErrorCode        IN OUT VARCHAR2,
                               pparam            IN OUT VARCHAR2)
    RETURN BOOLEAN;

END olpks_dsbr_process;
/
CREATE OR REPLACE Synonym olpkss_dsbr_process for olpks_dsbr_process
/