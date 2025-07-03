CREATE OR REPLACE PACKAGE olpks_batch_fwdvami AS
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_batch_fwdvami.SPC
  **
  ** Module    : LOANS AND DEPOSITS
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

  /*----------------------------------CHANGE HISTORY----------------------------------
  30/01/2002  FCC 3.9 Commitment related changes
            Define schedules for automatically reduce commitment amounts in the LD contract online.
            These schedules are exploded and the dates on which reduction is to be done is stored
            in LDTMS_CONTRACT_CMTREDN_DUE table.
            The LD batch processing calls a new function for the process code, CMT_REDN introduced
            in the OLTB_AUTOMATIC_PROCESS_MASTER. This process of automatic reduction is to be called
            before accruals and after liquidation.
  29-OCT-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO CITIUS#18066 Changes - to rebuild the interest during future dated VAMI procssing


  Change History

  Created By		: Krithika G
  Description		: OBCL 14.0 External EOD changes - FWDVAMI Batch

    ** Modified By          : Mohan Pal
    ** Modified On          : 17-DEC-2021
    ** Modified Reason      : FWDVAMI on Weekend/Monthend 
    ** Search String        : Bug#33613292

**  Modified By     : Narendra Dhaker
**  Modified On     : 17-FEB-2022
**  Modified Reason : Increasing the amount field decimals to maximum
**  Search String   : Bug#33809404_DecimalChange

  **Changed By         : Sowmya Bitra
  **Date               : 22-April-2023
  **Change Description : ECA Support for BADJ during VAMI
  **Search String      : OBCL_14.8_ECA_Changes

  ------------------------------------END CHANGE HISTORY-------------------------------------
  */

  g_err_code         VARCHAR2(200) := NULL;
  g_err_param        VARCHAR2(2000) := NULL;
  action_code        VARCHAR2(2000);
  vami_esn           oltbs_contract_event_log.event_seq_no%TYPE;
  amd_rec            oltbs_contract_amend_due%ROWTYPE;
  back_valued        BOOLEAN;
  sch_type           oltbs_contract_preference.contract_schedule_type%TYPE;
  amort_meth         oltbs_contract_preference.amortisation_type%TYPE;
  cont_sch_type      VARCHAR2(15);
  list_err_code      VARCHAR2(5000);
  h_tab              olpkss_recompute_schedules.tab_ty_comput;
  i                  BINARY_INTEGER;
  date_chgd          BOOLEAN := FALSE;
  rate_chgd          BOOLEAN := FALSE;
  prin_chgd          BOOLEAN := FALSE;
  amort_dt_chgd      BOOLEAN := FALSE;
  ret_err_code       VARCHAR2(500);
  ret_err_param      VARCHAR2(500);
  tab_rate           olpkss_schedules.ty_rate;
  tab_amt_paid       olvdss_services.ty_amt_paid;
  g_hfs_transfer     varchar2(1) := 'N';
  list_err_param     VARCHAR2(5000);
  g_split_processing Varchar2(1) := 'N';
  pkg_maker_id       oltbs_contract_event_log.Maker_id%TYPE;
  pkg_auth_id        oltbs_contract_event_log.Checker_id%TYPE;
  g_fwdvami Varchar2(1) := 'N';-----Bug#33613292
  g_fwdvami_processing_date date:=NULL;----Bug#33613292

  TYPE rec_cash_flow_attr IS RECORD(
    component      VARCHAR2(15),
    due_date       DATE,
    --amount_due     NUMBER(22,3), --Bug#33809404_DecimalChange 
    amount_due     NUMBER, --Bug#33809404_DecimalChange
    ccy_amount_due VARCHAR2(3),
    inflow_outflow VARCHAR2(1));

  TYPE tbl_cash_flow_attr IS TABLE OF rec_cash_flow_attr INDEX BY BINARY_INTEGER;

 --Type for FWDVAMI Cursor -- Can be used if Type variable call is accepted in JAVA

/*  TYPE active_contracts IS RECORD(
    contract_ref_no            oltbs_contract_amend_due.contract_ref_no%TYPE,
    event_seq_no               oltbs_contract_amend_due.event_seq_no%TYPE,
    DIFFERENTIAL_AMOUNT        oltbs_contract_amend_due.DIFFERENTIAL_AMOUNT%TYPE,
    main_comp                  oltbs_contract_master.main_comp%TYPE,
    maturity_date              oltbs_contract_master.maturity_date%TYPE,
    latest_version_no          oltbs_contract.latest_version_no%TYPE,
    contractual_effective_date oltbs_contract_amend_due.contractual_effective_date%TYPE,
    new_maturity_date          oltbs_contract_amend_due.new_maturity_date%TYPE);*/

  TYPE active_contracts IS RECORD(
    contract_ref_no            oltbs_contract_amend_due.contract_ref_no%TYPE,
    DIFFERENTIAL_AMOUNT        oltbs_contract_amend_due.DIFFERENTIAL_AMOUNT%TYPE,
    main_comp                  oltbs_contract_master.main_comp%TYPE,
    maturity_date              oltbs_contract_master.maturity_date%TYPE,
    latest_version_no          oltbs_contract.latest_version_no%TYPE,
    contractual_effective_date oltbs_contract_amend_due.contractual_effective_date%TYPE,
    new_maturity_date          oltbs_contract_amend_due.new_maturity_date%TYPE,
	  event_seq_no               oltbs_contract_amend_due.event_seq_no%TYPE);

  TYPE REF_ACTIVE_CONTRACTS IS REF CURSOR RETURN active_contracts;

  FUNCTION Fn_Process_fwd_Vami(p_mod             IN oltbs_contract.module_code%TYPE,
                               p_proc_date       IN DATE,
                               p_Ty_Cont         IN VARCHAR2,
                               p_contract_ref_no IN oltbs_contract.contract_ref_no%type,
                               p_Branch          IN Oltbs_Contract.Branch%TYPE,
                               p_User_Id         IN VARCHAR2,
                               p_ELCM_MSGID      OUT VARCHAR2,
                               p_rfr_Msgid      OUT VARCHAR2,
                               p_err_code        IN OUT VARCHAR2,
                               p_err_param       IN OUT VARCHAR2)
    RETURN VARCHAR2;
	
  --OBCL_14.8_ECA_Changes Start
  FUNCTION Fn_Eca_Fwd_Vami(p_Proc_Date       IN DATE,
                            p_Contract_Ref_No IN Oltbs_Contract_Amend_Due.Contract_Ref_No%TYPE,
                            p_Branch          IN Oltbs_Contract.Branch%TYPE,
                            p_User_Id         IN VARCHAR2,
                            p_Eca_Ref_No      IN OUT VARCHAR2,
                            p_Err_Code        IN OUT VARCHAR2,
                            p_Err_Param       IN OUT VARCHAR2)

  RETURN VARCHAR2;
  --OBCL_14.8_ECA_Changes End

  FUNCTION Fn_Auth_fwd_Vami(p_proc_date       IN DATE,
                            p_contract_ref_no IN oltbs_contract_amend_due.CONTRACT_REF_NO%TYPE,
                            p_Branch          IN Oltbs_Contract.Branch%TYPE,
                            p_User_Id         IN VARCHAR2,
							p_Eca_Ref_No      IN OUT VARCHAR2,  --OBCL_14.8_ECA_Changes
                            p_err_code        IN OUT VARCHAR2,
                            p_err_param       IN OUT VARCHAR2)
    RETURN VARCHAR2;

END olpks_batch_fwdvami;
/
CREATE OR REPLACE Synonym olpkss_batch_fwdvami FOR olpks_batch_fwdvami
/