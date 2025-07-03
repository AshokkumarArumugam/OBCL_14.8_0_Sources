CREATE OR REPLACE PACKAGE olpks_accrual
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name  : olpks_accrual.SPC
**
** Module   : LD
**
  This source is part of the Oracle Banking Corporate Lending  Software Product.
  Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.
  No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.

  Oracle Financial Services Software Limited.
  Oracle Park, Off Western Express Highway,
  Goregaon (East),
  Mumbai - 400 063, India.
------------------------------CHANGE HISTORY--------------------------------------------------------

02-FEB-2002 FCC3.9 LATAM  The Status movement is done schedule wise,affecting only the components relating to that
          schedule.The status movement moves only the outstanding relating to that component to a
          new accounting head /GL.This status Change happens only if the parameter Schedule Level
          Status change, which is in the preferences of the Loan Product Definition, is set
          to 'Y' i.e., Checked.
          Whenever  a change of Status happens (Schedule Level /Contract Level) ,the accruals for the
          current month,current year and previous year is recalculated and passed against the GL's
          maintained for current year and previous year in Chart Of ACCOUNTS of General Ledger.
          This tracking of accruals happens only if the parameter Track PNL Hist. , maintained at
          the bank parameters,is set  to 'Y' i.e., Checked.

18-FEB-2002 FCC3.9 ITR1 SFR NO 259  New function fn_remove_cont_tag added to remove the contingent interest
          tags if the maturity type is not of 'FIXED'.

18-SEP-2002 FCC 4.1  OCT 2002  Changes for Loans Status Accounting
           memo_accruals column added in contract_struct
           current_memo_accrual column added in iccf_struct

20-OCT-2002 FCC 4.1  OCT 2002  STAT1 SFR 87, 91 Problem in memo accrual transfers

03-JUN-2003 Fcc4.2 OPS related changes (Focus testing)..Code change for the movement of CYCM Liquidation amount stored
      in the oltbs_contract_iccf_details..
20-JUL-2003 FCC 4.3 AUG 2003 altered the contract_struct to include limit_track_reqd field.

19-FEB-2004 FCC 4.5 LOT1 FAST CHANGES

29-MAR-2004 FCC4.5 LOT2 ONLINE QUEUE CHANGES

10-JAN-2005 FCC 4.6.1 JAN 2005 EIM Enhancements changes - Function Fn_pass_pycycm_entry has been made public
31-OCT-2007 FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-370.Added new process in the LD batch to calculate the monthly accrual for the contracts.
12-MAR-2009 FCC V.CL Release 7.5 CITIUS-LS#5387: Made fn_accrue_for_a_contract function global,Moved this function from SQL
21-SEP-2010 CITIUS-LS#7369 Changes : Reversal of interest payment for non performing contracts is was not catching up the accruals in memo.

  **Changed By         : Krithika G
  **Change Description : OBCL 14.0 EOD Batch Changes
  **Search String      : OBCL_14.0_EOD_Batch_Changes

  **Changed By         : Meha
  **Date               : 4-Mar-2019
  **Change Description : Moratorium Interest Changes
  **Search String      : OBCL_14.3_Moratorium

  **Changed By         : Abhinav Bhasker
  **Date               : 07-May-2020
  **Change Description : Changes w.r.t. Force Calc for SOFR Comp
  **Search String      : OBCL_SOFR_Force_Calc
  
  **  Changed By         : Abhik Das
  **  Changed On         : 15-Jun-2022
  **  Change Description : Added code to adjust penalty accruals for backdated consolidated rollover
  **  Search String      : OBCL_14.5_Support_Bug#34208251_Changes
  
  **  Changed By         : Revathi Dharmalingam
  **  Changed On         : 06-Jul-2023
  **  Change Description : Added code to modify the existing update statment for Oltbs_Contract_Status_Bal & Oltbs_Contract_Iccf_Datails 
                          which taken infinity time during EOD.so changed the update statment using bulk collect with commit frequency as limit value.
  **  Search String      : OBCL_14.7_Support_Bug#35553728_Changes

  **  Changed By         : Kavitha Asokan
  **  Changed On         : 02-Aug-2023
  **  Change Description : Added code to validate the auto-auth user during catchup accruals
  **  Search String      : OBCL_14.5_Support_Bug#35621266 
  
  **Changed By         : Guru
  **Date               : 10-Jul-2024
  **Change Description : Performance tuning changes for Exponential calculation by changing to collections instead of direct references to EXP tables.                          
  **Search String      : Bug#36825935
------------------------------------------------------------------------------------------------------
*/
g_backdated_consol_roll_check  VARCHAR2(1) := 'N';--OBCL_14.5_Support_Bug#34208251_Changes
g_Retain_user_id  varchar2(1) :='N';----Bug#35621266 

g_contract_preference_rec oltbs_contract_preference%ROWTYPE; --Bug#36825935 Changes

--OBCL_14.7_Support_Bug#35553728_Changes Starts
TYPE  contract_stat_bal_rec IS  RECORD
  (
  contract_ref_no      oltbs_contract_status_bal.contract_ref_no%TYPE,
  component            oltbs_contract_status_bal.component%TYPE,
  status                oltbs_contract_status_bal.status%TYPE
  );
  
  TYPE  contract_iccf_details_rec IS  RECORD
  (
  contract_ref_no      Oltbs_Contract_Iccf_Details.contract_ref_no%TYPE,
  component            Oltbs_Contract_Iccf_Details.component%TYPE
  );

  TYPE g_typ_contract_status_bal IS
        TABLE OF contract_stat_bal_rec INDEX BY BINARY_INTEGER;
    TYPE g_typ_contract_iccf_details IS
        TABLE OF contract_iccf_details_rec INDEX BY BINARY_INTEGER;
--OBCL_14.7_Support_Bug#35553728_Changes Ends
TYPE contract_struct IS  RECORD
  (
  module        oltbs_contract.module_code%TYPE,
  product       oltbs_contract.product_code%TYPE,
  product_type      oltbs_contract.product_type%TYPE,
  latest_event_seq_no   oltbs_contract.latest_event_seq_no%TYPE,
  latest_version_no   oltbs_contract.latest_version_no%TYPE,
  contract_status     oltbs_contract.contract_status%TYPE,
  user_defined_status   oltbs_contract.user_defined_status%TYPE,
  customer      oltbs_contract.counterparty%TYPE,
  contract_ccy      oltbs_contract.contract_ccy%TYPE,
  book_date     date,
  value_date      date,
  maturity_type     oltbs_contract_master.maturity_type%TYPE, --02-FEB-2002 FCC3.9 LATAM
  memo_accruals     oltms_product_status_master.memo_accruals%TYPE,  --FCC 4.1 Oct-2002 Status A/c for Loans changes
  limit_track_reqd    oltbs_contract_master.limit_track_reqd%TYPE    --fcc 4.3 aug 2003 mm module changes
  );

TYPE iccf_struct IS  RECORD
  (
  component     oltbs_contract_iccf_details.component%TYPE,
  component_ccy     oltbs_contract_iccf_details.component_currency%TYPE,
  payment_method      oltbs_contract_iccf_details.payment_method%TYPE,
  previous_accrual_to_date  date,
  previous_till_date_accrual  oltbs_contract_iccf_details.till_date_accrual%TYPE,
  total_amount_liquidated   oltbs_contract_iccf_details.total_amount_liquidated%TYPE,
  current_till_date_accrual oltbs_contract_iccf_details.till_date_accrual%TYPE,
  current_net_accrual   oltbs_contract_iccf_details.current_net_accrual%TYPE,
  accrual_ref_no      oltbs_contract_iccf_details.previous_accrual_ref_no%TYPE
  );
-------------------------------------------------------------------------------

-- FCC 4.5 LOT1 FAST CHANGES STARTS

TYPE  queue_rec IS  RECORD
  (
  branch      oltms_branch.branch_code%TYPE,
  module      oltbs_contract.module_code%TYPE,
  processing_date   DATE,
  commit_frequency    oltbs_automatic_process_master.eod_commit_count%TYPE,
  product     oltbs_contract.product_code%TYPE
  );

TYPE  queue_tbl IS  TABLE OF  queue_rec INDEX BY  BINARY_INTEGER;

TYPE ty_pycycm IS TABLE OF oltbs_contract_iccf_details%ROWTYPE INDEX BY VARCHAR2(1000);-- 07-OCT-2010 CITIUS-LS#7369

-- FCC 4.5 LOT1 FAST CHANGES STARTS
--Fcc4.2 OPS related changes (Focus testing) starts

FUNCTION Fn_update_cycm
        (
         p_branch       oltms_branch.Branch_code%TYPE,
         p_cycm_ind       Varchar2,
         p_err_code   IN OUT  Varchar2,
         p_err_param  IN OUT  Varchar2
         )
RETURN BOOLEAN;

--Fcc4.2 OPS related changes (Focus testing) ends..

FUNCTION fn_periodic_accrual
  (
  p_module    IN  oltbs_contract.module_code%TYPE,
  p_accrual_ref_no  IN  oltbs_auto_function_details.current_accrual_ref_no%TYPE,
  p_processing_date IN  date,
  p_product   IN  oltbs_contract.product_code%TYPE,
  p_commit_frequency  IN  oltbs_automatic_process_master.eod_commit_count%TYPE,
  p_error_code    IN OUT  varchar2,
  p_error_parameter IN OUT  varchar2
  )
  RETURN boolean;

FUNCTION fn_memo_accrual
  (
  p_module    IN  oltbs_contract.module_code%TYPE,
  p_accrual_ref_no  IN  oltbs_auto_function_details.current_accrual_ref_no%TYPE,
  p_processing_date IN  date,
  p_product   IN  oltbs_contract.product_code%TYPE,
  p_commit_frequency  IN  oltbs_automatic_process_master.eod_commit_count%TYPE,
  p_error_code    IN OUT  varchar2,
  p_error_parameter IN OUT  varchar2
  )
  RETURN boolean;

FUNCTION fn_accrue_during_amendment
  (
  p_contract_ref_no IN  oltbs_contract.contract_ref_no%TYPE,
  p_amendment_value_date  IN  date,
  p_authorization_status  IN  oltbs_contract.auth_status%TYPE,
  p_handoff_action_code IN  char,
  p_error_code    IN OUT  varchar2,
  p_error_parameter IN OUT  varchar2
  )
  RETURN boolean;

FUNCTION fn_accrue_during_liquidation
  (
  p_contract_ref_no IN  oltbs_contract.contract_ref_no%TYPE,
  p_liquidation_value_date
        IN  date,
  p_version_maturity  IN  boolean,
  p_list_of_components  IN  varchar2,
  p_authorization_status  IN  oltbs_contract.auth_status%TYPE,
  p_handoff_action_code IN  char,
  p_error_code    IN OUT  varchar2,
  p_error_parameter IN OUT  varchar2
  )
  RETURN boolean;

FUNCTION Fn_reverse_for_a_contract
  (
  p_contract_ref_no   IN    oltbs_contract.contract_ref_no%TYPE,
  p_processing_date   IN    date,
  p_authorization_status  IN    oltbs_contract.auth_status%TYPE,
  p_handoff_action_code IN    char,
  p_current_event_seq_no  IN    oltbs_contract.latest_event_seq_no%TYPE,
  cs        IN    contract_struct,
  p_acc_lookup_status IN    oltbs_contract.user_defined_status%TYPE,
  p_handoff_event_code  IN    oltbs_contract.curr_event_code%TYPE,
  p_transaction_code  IN    oltbs_handoff.trn_code%TYPE,
  p_reverse_status    IN    oltbs_contract.user_defined_status%TYPE,  --Fcc4.2 OPS related changes..
  p_error_code    IN OUT  varchar2,
  p_error_parameter   IN OUT  varchar2
  )
  RETURN boolean;
 -- SOFR Changes starts
  FUNCTION fn_accrue_during_initiation_rfr
  (
  p_contract_ref_no IN  oltbs_contract.contract_ref_no%TYPE,
  p_processing_date IN  date,
  p_authorization_status  IN  varchar2,
  p_handoff_action_code IN  varchar2,
  p_error_code    IN OUT  varchar2,
  p_error_parameter IN OUT  varchar2
  )
  RETURN VARCHAR2;
  -- SOFR Changes ends
FUNCTION fn_accrue_during_initiation
  (
  p_contract_ref_no IN  oltbs_contract.contract_ref_no%TYPE,
  p_processing_date IN  date,
  p_authorization_status  IN  oltbs_contract.auth_status%TYPE,
  p_handoff_action_code IN  char,
  p_error_code    IN OUT  varchar2,
  p_error_parameter IN OUT  varchar2
  )
  RETURN boolean;

FUNCTION fn_accrue_during_penalty
  (
  p_contract_ref_no IN  oltbs_contract.contract_ref_no%TYPE,
  p_processing_date IN  date,
  p_authorization_status  IN  oltbs_contract.auth_status%TYPE,
  p_handoff_action_code IN  char,
  p_list_of_components  IN  varchar2,
  p_error_code    IN OUT  varchar2,
  p_error_parameter IN OUT  varchar2
  )
  RETURN boolean;

FUNCTION fn_reinstate_for_a_contract
  (
  p_contract_ref_no IN  oltbs_contract.contract_ref_no%TYPE,
  p_processing_date IN  date,
  p_authorization_status  IN  oltbs_contract.auth_status%TYPE,
  p_handoff_action_code IN  char,
  p_list_of_components  IN  varchar2,
  p_current_event_seq_no  IN  oltbs_contract.latest_event_seq_no%TYPE,
  cs      IN  contract_struct,
  p_handoff_event_code  IN  oltbs_contract.curr_event_code%TYPE,
  p_transaction_code  IN  oltbs_handoff.trn_code%TYPE,
  p_error_code    IN OUT  varchar2,
  p_error_parameter IN OUT  varchar2
  )
  RETURN boolean;

FUNCTION fn_calculate_till_date_accrual
  (
  p_contract_ref_no IN  oltbs_contract.contract_ref_no%TYPE,
  p_contract_value_date IN  date,
  p_component   IN  oltbs_contract_iccf_details.component%TYPE,
  p_component_currency  IN  oltbs_contract_iccf_details.component_currency%TYPE,
  p_accrual_to_date IN  date,
  p_till_date_accrual OUT oltbs_contract_iccf_details.till_date_accrual%TYPE,
  p_error_code    IN OUT  varchar2,
  p_error_parameter IN OUT  varchar2
  )
  RETURN boolean;

FUNCTION fn_calculate_till_date_accrual
  (
  p_contract_ref_no IN  oltbs_contract.contract_ref_no%TYPE,
  p_contract_value_date IN  date,
  p_component   IN  oltbs_contract_iccf_details.component%TYPE,
  p_component_currency  IN  oltbs_contract_iccf_details.component_currency%TYPE,
  p_schedule_date   IN  date,
  p_accrual_to_date IN  date,
  p_till_date_accrual OUT oltbs_contract_iccf_details.till_date_accrual%TYPE,
  p_error_code    IN OUT  varchar2,
  p_error_parameter IN OUT  varchar2
  )
  RETURN boolean;

-- 02-FEB-2002 FCC3.9 LATAM Starts
FUNCTION fn_reverse_for_a_contract_sch
  (
  p_contract_ref_no   IN  oltbs_contract.contract_ref_no%TYPE,
  p_processing_date   IN  date,
  p_authorization_status  IN  oltbs_contract.auth_status%TYPE,
  p_handoff_action_code IN  char,
  p_current_event_seq_no  IN  oltbs_contract.latest_event_seq_no%TYPE,
  cs        IN  contract_struct,
  p_acc_lookup_status IN  oltbs_contract.user_defined_status%TYPE,
  p_handoff_event_code  IN  oltbs_contract.curr_event_code%TYPE,
  p_transaction_code  IN  oltbs_handoff.trn_code%TYPE,
  p_schedule_date   IN  Date,             --FCC 4.1 OCT-2002 STAT1 SFR 87, 91
  p_component     IN  oltbs_amount_due.component%TYPE,    --FCC 4.1 OCT-2002 STAT1 SFR 87, 91
  p_error_code    IN OUT  varchar2,
  p_error_parameter   IN OUT  varchar2
  )
  RETURN boolean;

FUNCTION fn_reinstate_for_a_cont_sch
  (
  p_contract_ref_no   IN  oltbs_contract.contract_ref_no%TYPE,
  p_processing_date   IN  date,
  p_authorization_status  IN  oltbs_contract.auth_status%TYPE,
  p_handoff_action_code IN  char,
  p_list_of_components  IN  varchar2,
  p_current_event_seq_no  IN  oltbs_contract.latest_event_seq_no%TYPE,
  cs        IN  contract_struct,
  p_handoff_event_code  IN  oltbs_contract.curr_event_code%TYPE,
  p_transaction_code  IN  oltbs_handoff.trn_code%TYPE,
  p_schedule_date   IN  Date,             --FCC 4.1 OCT-2002 STAT1 SFR 87, 91
  p_component     IN  oltbs_amount_due.component%TYPE,    --FCC 4.1 OCT-2002 STAT1 SFR 87, 91
  p_error_code    IN OUT  varchar2,
  p_error_parameter   IN OUT  varchar2
  )
  RETURN boolean;

FUNCTION fn_accrue_during_init_sch
  (
  p_contract_ref_no IN  oltbs_contract.contract_ref_no%TYPE,
  p_processing_date IN  date,
  p_authorization_status  IN  oltbs_contract.auth_status%TYPE,
  p_handoff_action_code IN  char,
  p_error_code    IN OUT  varchar2,
  p_error_parameter IN OUT  varchar2
  )
  RETURN boolean;

FUNCTION fn_accrue_during_penalty_sch
  (
  p_contract_ref_no IN  oltbs_contract.contract_ref_no%TYPE,
  p_processing_date IN  date,
  p_authorization_status  IN  oltbs_contract.auth_status%TYPE,
  p_handoff_action_code IN  char,
  p_list_of_components  IN  varchar2,
  p_error_code    IN OUT  varchar2,
  p_error_parameter IN OUT  varchar2
  )
  RETURN boolean;

FUNCTION fn_accrue_during_liqd_sch
  (
  p_ContractRefNo    IN     oltbs_contract.contract_ref_no%TYPE,
  p_EventSeqNo     IN   oltbs_contract_liq.event_seq_no%TYPE,
  p_LiquidationValueDate   IN   date,
  p_VersionMaturity    IN   boolean,
  p_ListOfComponents   IN   varchar2,
  p_AuthorizationStatus    IN   oltbs_contract.auth_status%TYPE,
  p_HandoffActionCode  IN   char,
  p_ErrorCode      IN OUT varchar2,
  p_ErrorParameter     IN OUT varchar2
  )
  RETURN boolean;

FUNCTION fn_accrue_during_amend_sch
  (
  p_ContractRefNo   IN  oltbs_contract.contract_ref_no%TYPE,
  p_AmendmentValueDate  IN  date,
  p_AuthorizationStatus IN  oltbs_contract.auth_status%TYPE,
  p_HandoffActionCode IN  char,
  p_ErrorCode     IN OUT  varchar2,
  p_ErrorParameter    IN OUT  varchar2
  )
  RETURN boolean;

Function Fn_BuildPnLHistoryDetails(
                p_ContractRefNo In   Varchar2,
                p_ValueDate   In   Date,
                p_Component   In   Varchar2,
                p_ComponentCcy  In   Varchar2,
                p_PrevAccrualToDate In   Date,
                p_TotLiqdAmount In   Number,
                p_ReverseAccruals In   Boolean,
                p_ScheduleDate  In   Date,
                p_ListOfAmountTags  In Out Varchar2,
                p_ListOfAmounts In Out Varchar2,
                p_ListOfAmountCcys  In Out Varchar2,
                p_PnLHistoryInd In Out Varchar2,
                p_ErrCode   In Out Varchar2,
                p_ErrParams   In Out Varchar2
              )
Return Boolean ;

-- 02-FEB-2002 FCC3.9 LATAM Ends

--FCC 4.1 OCT-2002 STAT1 SFR 87, 91 starts
--function has been overloaded
Function Fn_BuildPnLHistoryDetails(
                p_ContractRefNo In   Varchar2,
                p_ValueDate   In   Date,
                p_Component   In   Varchar2,
                p_ComponentCcy  In   Varchar2,
                p_PrevAccrualToDate In   Date,
                p_TotLiqdAmount In   Number,
                p_ReverseAccruals In   Boolean,
                p_ScheduleDate  In   Date,
                p_amt_to_reverse  In   Number,
                p_ListOfAmountTags  In Out Varchar2,
                p_ListOfAmounts In Out Varchar2,
                p_ListOfAmountCcys  In Out Varchar2,
                p_PnLHistoryInd In Out Varchar2,
                p_ErrCode   In Out Varchar2,
                p_ErrParams   In Out Varchar2
              )
Return Boolean ;
--FCC 4.1 OCT-2002 STAT1 SFR 87, 91 ends

--18-FEB-2002 FCC3.9 ITR1 SFR NO 259 starts
FUNCTION fn_remove_cont_tag
    (
  p_contract_ref_no  IN    oltbs_contract.contract_ref_no%TYPE,
  l_acc_lookup     IN OUT  olpkss_accounting.tbl_lookup,
  p_event_code      IN      lftms_product_iccf.component%TYPE
    )
RETURN boolean;
--18-FEB-2002 FCC3.9 ITR1 SFR NO 259 ends

-- 19-FEB-2004 FCC 4.5 LOT1 FAST CHANGES Starts

FUNCTION  fn_parallel_batch
  (
  p_function_id   IN    VARCHAR2,
  p_error_code    IN OUT  VARCHAR2,
  p_error_parameter   IN OUT  VARCHAR2
  )
RETURN BOOLEAN;

FUNCTION  fn_process_accrual
  (
  p_module      IN    oltbs_contract.module_code%TYPE,
  p_contract_ref_no   IN    oltbs_contract.contract_ref_no%TYPE,
  p_contract_level_entry  IN    BOOLEAN,
  p_accrual_ref_no    IN    oltbs_auto_function_details.current_accrual_ref_no%TYPE,
  p_commit_frequency  IN    oltbs_automatic_process_master.eod_commit_count%TYPE,
  p_include_stop_status IN    BOOLEAN,
  p_processing_date   IN    DATE,
  p_accrual_to_date   IN    DATE,
  p_error_code    IN OUT  VARCHAR2,
  p_error_parameter   IN OUT  VARCHAR2
  )
RETURN BOOLEAN;

--fcc45 lot2 added new param
FUNCTION fn_populate_process_queue
  (
  p_module      IN    oltbs_contract.module_code%TYPE,
  p_contract_ref_no   IN    oltbs_contract.contract_ref_no%TYPE,
  p_error_code    IN OUT  VARCHAR2,
  p_error_parameter   IN OUT  VARCHAR2
  )
RETURN BOOLEAN;
--fcc45 lot2 added new param
FUNCTION fn_insert_process_queue
  (
  p_contract_ref_no   IN    oltbs_contract.contract_ref_no%TYPE,
  p_function_id   IN    eitms_modules_installed.function_id%TYPE,
  p_processing_date   IN    DATE,
  p_error_code    IN OUT  VARCHAR2,
  p_error_parameter   IN OUT  VARCHAR2
  )
RETURN BOOLEAN;

-- 19-FEB-2004 FCC 4.5 LOT1 FAST CHANGES Ends
--Fn added for FCC 4.5 LOT2 by Sairam
FUNCTION fn_process_ldaccrual
      (
      p_module      IN    oltbs_contract.module_code%TYPE,
      p_contract_ref_no   IN    oltbs_contract.contract_ref_no%TYPE,
      p_error_code    IN OUT  VARCHAR2,
      p_error_parameter   IN OUT  VARCHAR2
      )
RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-370 START
FUNCTION Fn_populate_month_accr
  (
  p_module    IN  oltbs_contract.module_code%TYPE,
  p_processing_date IN  date,
  p_product   IN  oltbs_contract.product_code%TYPE,
  p_commit_frequency  IN  oltbs_automatic_process_master.eod_commit_count%TYPE,
  p_error_code    IN OUT  varchar2,
  p_error_parameter IN OUT  varchar2
  )
RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-370 END

-- 10-JAN-2005 FCC 4.6.1 JAN 2005 EIM Enhancements changes starts
FUNCTION Fn_pass_pycycm_entry
      (
       p_contract_ref_no       oltbs_contract.Contract_ref_no%TYPE,
       p_product           oltbs_contract.Product_code%TYPE,
       p_current_event_Seq_no     oltbs_contract.Latest_event_seq_no%TYPE,
       p_handoff_event_code     oltbs_contract.Curr_event_code%TYPE,
       p_handoff_action_code      Varchar2,
       p_contract_status       Varchar2,
       p_processing_date       Date,
       p_transaction_code      oltms_product_status_master.Transaction_code%TYPE,
       p_list_of_amt_tags      Varchar2,
       p_list_of_amts        Varchar2,
       p_list_amt_ccys        Varchar2,
       p_list_of_pycycm_ind     Varchar2,
       p_tbl_lookup        olpkss_accounting.tbl_lookup,
       p_err_code           IN OUT Varchar2,
       p_err_param          IN OUT Varchar2
       )
RETURN BOOLEAN ;
-- 10-JAN-2005 FCC 4.6.1 JAN 2005 EIM Enhancements changes ends
--12-MAR-2009 FCC V.CL Release 7.5 CITIUS-LS#5387,Starts
--Made this function global,Moved this function from SQL
FUNCTION fn_accrue_for_a_contract
  (
  p_contract_ref_no IN  oltbs_contract.contract_ref_no%TYPE,
  p_processing_date IN  date,
  p_action_is_liquidation IN  boolean,
  p_adjust_anyway   IN  boolean,
  p_version_maturity  IN  boolean,
  p_list_of_components  IN  varchar2,
  p_authorization_status  IN  oltbs_contract.auth_status%TYPE,
  p_handoff_action_code IN  char,
  p_error_code    IN OUT  varchar2,
  p_error_parameter IN OUT  varchar2
  )
  RETURN boolean;
--12-MAR-2009 FCC V.CL Release 7.5 CITIUS-LS#5387,Starts
--Made this function global,Moved this function from SQL
--21-SEP-2010 CITIUS-LS#7518 CITIUS-LS#7369 Changes starts
FUNCTION fn_adjust_memo_entries
    (
      p_contract_ref_no IN    oltbs_contract.contract_ref_no%TYPE,
      p_version_maturity  IN    Boolean,
      p_authorization_status  IN    oltbs_contract.auth_status%TYPE,
      p_handoff_action_code IN    Char,
      p_processing_date IN    Date,
      p_err_code    IN OUT  Varchar2,
      p_err_param   IN OUT  Varchar2
    )
RETURN boolean;
--21-SEP-2010 CITIUS-LS#7518 CITIUS-LS#7369 Changes ends

--OBCL_14.0_EOD_Batch_Changes
FUNCTION fn_accrue_amend_sch_batch(p_ContractRefNo       IN oltbs_contract.contract_ref_no%TYPE,
                                      p_AmendmentValueDate  IN date,
                                      p_AuthorizationStatus IN oltbs_contract.auth_status%TYPE,
                                      p_HandoffActionCode   IN char,
                                      p_ErrorCode           IN OUT varchar2,
                                      p_ErrorParameter      IN OUT varchar2)
    RETURN boolean;

FUNCTION fn_cont_level_updates(p_contract_ref_no      IN oltbs_contract.contract_ref_no%TYPE,
                                     p_authorization_status IN oltbs_contract.auth_status%TYPE,
                                     p_current_event_seq_no IN oltbs_contract.latest_event_seq_no%TYPE,
                                     cs                     IN contract_struct,
                                     p_error_code           IN OUT varchar2,
                                     p_error_parameter      IN OUT varchar2)
    RETURN boolean;

FUNCTION fn_accrue_amendment_batch(p_contract_ref_no      IN oltbs_contract.contract_ref_no%TYPE,
                                      p_amendment_value_date IN date,
                                      p_authorization_status IN oltbs_contract.auth_status%TYPE,
                                      p_handoff_action_code  IN char,
                                      p_error_code           IN OUT varchar2,
                                      p_error_parameter      IN OUT varchar2)
    RETURN boolean;
--OBCL_14.0_EOD_Batch_Changes

--OBCL_SOFR_Force_Calc Start
 FUNCTION Fn_Accrue_Force_calc_Rfr (p_Memo_Accrual        IN BOOLEAN,
                                   p_Accrual_Level       IN Oltms_Branch_Parameters.Accrual_Level%TYPE,
                                   p_Module              IN Oltbs_Contract.Module_Code%TYPE,
                                   p_Accrual_Ref_No      IN Oltbs_Auto_Function_Details.Current_Accrual_Ref_No%TYPE,
                                   p_Processing_Date     IN DATE,
                                   p_Accrual_To_Date     IN DATE,
                                   p_Product             IN Oltbs_Contract.Product_Code%TYPE,
                                   p_Include_Stop_Status IN BOOLEAN,
                                   p_Contract_ref_No     IN Oltbs_Contract.Contract_ref_No%TYPE,
                                   p_Error_Code          IN OUT VARCHAR2,
                                   p_Error_Parameter     IN OUT VARCHAR2)
    RETURN BOOLEAN;
--OBCL_SOFR_Force_Calc End

--OBCL_14.4_SOFR Amort Changes Start
 FUNCTION Fn_Accrue_Adjustment    (p_Memo_Accrual        IN BOOLEAN,
                                   p_Accrual_Level       IN Oltms_Branch_Parameters.Accrual_Level%TYPE,
                                   p_Module              IN Oltbs_Contract.Module_Code%TYPE,
                                   p_Accrual_Ref_No      IN Oltbs_Auto_Function_Details.Current_Accrual_Ref_No%TYPE,
                                   p_Processing_Date     IN DATE,
                                   p_Accrual_To_Date     IN DATE,
                                   p_Product             IN Oltbs_Contract.Product_Code%TYPE,
                                   p_Include_Stop_Status IN BOOLEAN,
                                   p_Contract_ref_No     IN Oltbs_Contract.Contract_ref_No%TYPE,
                                   p_Error_Code          IN OUT VARCHAR2,
                                   p_Error_Parameter     IN OUT VARCHAR2)
    RETURN BOOLEAN;

--OBCL_14.4_SOFR Amort Changes End
--Bug#36825935 Changes Starts
FUNCTION Fn_Calculate_Till_Date_Accrual_Exp(p_Contract_Ref_No     IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                          p_Contract_Value_Date IN DATE,
                                          p_Component           IN Oltbs_Contract_Iccf_Details.Component%TYPE,
                                          p_Component_Currency  IN Oltbs_Contract_Iccf_Details.Component_Currency%TYPE,
                                          p_Accrual_To_Date     IN DATE,
                                          p_Till_Date_Accrual   OUT Oltbs_Contract_Iccf_Details.Till_Date_Accrual%TYPE,
                                          p_Error_Code          IN OUT VARCHAR2,
                                          p_Error_Parameter     IN OUT VARCHAR2)
RETURN BOOLEAN;
	
FUNCTION Fn_Calculate_Till_Date_Accrual_Exp(p_Contract_Ref_No     IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                            p_Contract_Value_Date IN DATE,
                                            p_Component           IN Oltbs_Contract_Iccf_Details.Component%TYPE,
                                            p_Component_Currency  IN Oltbs_Contract_Iccf_Details.Component_Currency%TYPE,
                                            p_Schedule_Date       IN DATE,
                                            p_Accrual_To_Date     IN DATE,
                                            p_Till_Date_Accrual   OUT Oltbs_Contract_Iccf_Details.Till_Date_Accrual%TYPE,
                                            p_Error_Code          IN OUT VARCHAR2,
                                            p_Error_Parameter     IN OUT VARCHAR2)
      RETURN BOOLEAN;	
--Bug#36825935 Changes Ends
g_accr_int Oltb_Amount_Due.Amount_Due%Type;--OBCL_14.3_Moratorium Changes

END olpks_accrual;
/
CREATE or replace SYNONYM olpkss_accrual FOR olpks_accrual
/