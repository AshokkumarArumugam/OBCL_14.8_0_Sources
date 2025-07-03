CREATE OR REPLACE PACKAGE lppks_upload 
IS
/*-----------------------------------------------------------------------------------
**
** File Name  : lppks_upload.SPC
** Module : LOAN SYNDICATION
**
  This source is part of the Oracle Banking Corporate Lending  Software Product.   
  Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
  No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

  Oracle Financial Services Software Limited.
  Oracle Park, Off Western Express Highway,
  Goregaon (East), 
  Mumbai - 400 063, India.
-------------------------------------------------------------------------------------
*/

/*----------------------------------CHANGE HISTORY----------------------------------

15/02/2003 - FCC 4.2 April 2003 LS changes

   This package is created to process the participant side activities based on the borrower contract.

11-MAR-03 FCC4.2 CITIPLC DEVELOPMENT REQUIREMENTS START
  REQUIREMENT : ADVICE GENERATION FOR ALL THE EVENTS
        MADE CHANGES TO FUNCTIONS FN_PARTICIPANT_ADV_PROCESSING SPEC

24-Mar-2003 FCC 4.2 LS changes

        1. Added p_Called_From in fn_Participant_Adv_Processing for Advice processing

25-Mar-2003 FCC 4.2 LS changes

        1. Participant checking MRGP, RNDL, RNDP checking

08-APR-2003 FCC4.2 APR 2003 LS changes
    -- Added new function FN_LIQUIDATE_PARTICIPANTS

12-APR-2003 FCC4.2 APR 2003 LS changes
  --  Function FN_PARTICIPANT_ROLL_PROCESSING added for processing the roll event on the participant side
22-Apr-2003 FCC 4.2 Apr 2003 ITR1 fixes for SFR #602. commented out use of binary integer.

28-Apr-2003 FCC 4.2 Apr 2003 ITR2 SFR # 3
               --Added fn_generate_custom_ref_no to the spec as it is referred by lspram.sql

21-JUN-2004 FCC 4.6.2 CITI LS CHANGES Added function fn_populate_lltb_amount_due
08-SEP-2005 FLEXCUBE_V.CL_RELEASE_7.0 ITR1 SFR#110 by Satya
12-SEP-2005 FLEXCUBE V.CL Release 7.0 ITR2 SFR#21 Changes
21-JAN-2006 FLEXCUBE V.CL Release 7.0 Changes Daya 
21-JAN-2006 FLEXCUBE V.CL Release 7.0 Changes piyush          
21-JAN-2006 FLEXCUBE V.CL Release 7.0 Changes Sachin Panwar          
27-Jan-2006 Flexcube V.CLRelease 7.0 Propogation Related Changes by Vicks
    Removed Function fn_propagation_changes as it is moved in lppks_propogation
07-FEB-2006 Flexcube V.CLRelease 7.0 Propogation Related Changes by Darshana
    Commented changes on table lbtbs_drawdown_sch_events as this table has been dropped
13-JUL-2006 FCC V.CL RELEASE 7.1 Restructuring changes by svs for processing tranche + all dependent drawdowns . 
20-JUL-2006 FCC V.CL RELEASE Changes by SVS Commented functions in spec moved to body on 20-JUL-2006 . 
14-AUG-2006 FCC V.CL RELEASE 7.1 Prime loan changes - Added 4 new variables p_prime_iccfcalc 
and p_inc_prime_iccfcalc, p_prime_iccfcalc_history and p_inc_prime_iccfcalc_history
16-AUG-2006 FCC V.CL RELEASE 7.1 CHANGES added a new function fn_participant_vamb_entry
18-Aug-2006 FCC V.CL RELEASE 7.1 Removed the new function fn_participant_vamb_entry as it is kept in lppks_contract . 
04-SEP-2006 FCC V.CL RELEASE 7.1 changes for populating mapping table.
      Declared table type variable to handle bulk insert for the table lbtbs_borr_part_event_mapping.
07-SEP-2006 FCC V.CL RELEASE 7.1 changes p_amount changed to VARCHAR2,--lbtb_party_event_detail_upload.Amount%TYPE
28-SEP-2006 FCC V.CL RELEASE 7.1 SFR#295 changes added two new parameters p_borrow_event_date and p_borrow_value_date in FUNCTION FN_PROCESS_RND_EVENT ,
19-OCT-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO Unit has Added as per of UK CONSOLIDATION
29-APR-2009 FLEXCUBE V.CL Release 7.6 Sighting Fund Changes Arthy
26-AUG-2009 CITIUS-LS#6235, Clearpar and SLT incremental changes retro,changed the copyright clause.
12-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag05 Different Margin for Participants changes, Introduced logic for bulk propagation of participant margin.


    Changed By         : Surya Prabha
    Change Description : Code fix to trigger INOT in drawdown contracts
    Search string      : OBCL_14.5_LS_INOT_DRAWDOWN changes
    Date               : 22-Apr-2021

  Changed By         : Abhinav Bhasker
  Changed On         : 27-Mar-2022
  Search String      : OBCL_14.5_STAND_BY_FEE
  Change Reason      : Changes w.r.t. StandByFees (SFR# 34004511)
  
  Changed By         : Sowmya Bitra
  Changed On         : 25-Jan-2024
  Change Description : Performance Tuning Changes for Syndication Online Transactions with large number(300+) of participants 
  Search String      : Bug#36008580
----------------------------------------END CHANGE HISTORY--------------------------------------------------
*/

   --
   -- FCC V.CL RELEASE 7.1 Global variable addition starts here by svs on 13-JUL-2006 . 
   --

   g_tranche_processed            varchar2(1)   := 'N';
   g_drawdown_processing          varchar2(1)   := 'N';   
   g_process_online               varchar2(1)   := 'N';   
   g_cascade_participation        VARCHAR2(1);  --Bug#36008580 Changes
   --
   -- FCC V.CL RELEASE 7.1 Global variable addition starts here by svs on 13-JUL-2006 . 
   --

FUNCTION fn_insert_upload(
    p_br_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
    p_esn       IN  oltbs_contract.latest_event_seq_no%TYPE,
    p_event_code      IN    oltbs_contract_event_log.Event_code%Type,
    p_br_event_date   IN    Date,
    p_br_value_date   IN    Date,
    p_contract_Type   IN    VARCHAR2,                                 --'C' for Tranche and 'L' for Drawdown
    p_list_of_amount_tags IN  VARCHAR2,
    p_list_of_amounts     IN  VARCHAR2,
    p_list_of_ccys        IN  VARCHAR2,
    pErrorCode    IN OUT  VARCHAR2,
    pErrorParams  IN OUT VARCHAR2
    )RETURN BOOLEAN;

  --
  -- FCC V.CL RELEASE Changes by SVS Commented functions in spec moved to body on 20-JUL-2006 . 
  --  
/*
FUNCTION fn_register_a_event
( p_party_contract_ref_no   IN  oltbs_contract.contract_ref_no%TYPE,
  p_esn         IN  lbtb_party_event_master_upload.event_seq_no%TYPE,
  p_liqd_mode     IN  VARCHAR2,
  p_EVENT_CODE      IN  lbtb_party_event_master_upload.EVENT_CODE%TYPE,
  p_borrow_contract_ref_no  IN  oltbs_contract.contract_ref_no%TYPE,
  p_borrow_esn      IN  lbtb_party_event_master_upload.event_seq_no%TYPE,
  p_err_code      IN OUT  VARCHAR2,
  p_err_params      IN OUT  VARCHAR2
)
  RETURN BOOLEAN;

FUNCTION fn_Participant_BK_Processing(
        p_br_facility_ref_no IN oltbs_contract.contract_ref_no%TYPE,
        p_br_tranche_ref_no  IN oltbs_contract.contract_ref_no%TYPE,
  p_br_drawdown_ref_no    IN  oltbs_contract.contract_ref_no%TYPE,
  p_br_drawdown_no     IN    NUMBER,
  p_contract_Type      IN    VARCHAR2,            --'C' for Tranche and 'L' for Drawdown
  p_err_code    IN OUT VARCHAR2,
  p_err_params      IN OUT VARCHAR2
  )
  RETURN BOOLEAN;

FUNCTION fn_Participant_CAMD_Processing(
        p_borrow_contract_ref_no    IN  oltbs_contract.contract_ref_no%TYPE,
        p_esn       IN  lbtb_party_event_master_upload.event_seq_no%TYPE,
  p_event_code      IN  lbtb_party_event_master_upload.event_code%TYPE,
  p_err_code    IN OUT VARCHAR2,
  p_err_params      IN OUT VARCHAR2
  )
  RETURN BOOLEAN;
*/
  --
  -- FCC V.CL RELEASE Changes by SVS Commented functions in spec moved to body on 20-JUL-2006 . 
  --  

--'O' for Online and 'B' for Batch --24/03/2003

-- OBCL_14.5_LS_INOT_DRAWDOWN changes start

FUNCTION fn_Participant_Inot_Processing
(
        p_borrow_contract_ref_no    IN  oltbs_contract.contract_ref_no%TYPE,
  p_esn               IN  lbtb_party_event_master_upload.event_seq_no%TYPE,
  p_event_code            IN  lbtb_party_event_master_upload.event_code%TYPE,
  p_AUTH_STATUS       IN      VARCHAR2,
  p_err_code            IN OUT  VARCHAR2,
  p_err_params            IN OUT  VARCHAR2,
  p_drawdown_no       IN  lptbs_contract_master.PARTY_DRAWDOWN_NO%TYPE := 0,
  p_value_date        IN      oltbs_dly_msg_out.VALUE_DATE%TYPE := NULL,
  p_Called_From               IN  varchar2 default 'O'
)
  RETURN BOOLEAN;
  
-- OBCL_14.5_LS_INOT_DRAWDOWN changes end

FUNCTION fn_Participant_Adv_Processing
(
        p_borrow_contract_ref_no    IN  oltbs_contract.contract_ref_no%TYPE,
  p_esn               IN  lbtb_party_event_master_upload.event_seq_no%TYPE,
  p_event_code            IN  lbtb_party_event_master_upload.event_code%TYPE,
  p_AUTH_STATUS       IN      VARCHAR2,
  p_err_code            IN OUT  VARCHAR2,
  p_err_params            IN OUT  VARCHAR2,
  p_drawdown_no       IN  lptbs_contract_master.PARTY_DRAWDOWN_NO%TYPE := 0,
  p_value_date        IN      oltbs_dly_msg_out.VALUE_DATE%TYPE := NULL,
  p_Called_From               IN  varchar2 default 'O'
)
  RETURN BOOLEAN;

  --
  -- FCC V.CL RELEASE Changes by SVS Commented functions in spec moved to body on 20-JUL-2006 . 
  --  
/*
FUNCTION fn_Participant_Liquidation(
  p_party_contract_ref_no    IN oltbs_contract.contract_ref_no%TYPE,
  p_esn       IN  lbtb_party_event_master_upload.event_seq_no%TYPE,
  p_EVENT_CODE      IN    lbtb_party_event_master_upload.EVENT_CODE%TYPE,
  p_list_of_amount_tags  IN VARCHAR2,
  p_list_of_amounts  IN VARCHAR2,
  p_list_of_amount_ccys  IN VARCHAR2,
  p_borrow_contract_ref_no    IN  oltbs_contract.contract_ref_no%TYPE,
  p_value_date  DATE  DEFAULT  GLOBAL.application_date, --FLEXCUBE V.CL Release 7.0 ITR2 SFR#21 Changes
  p_err_code    IN OUT VARCHAR2,
  p_err_params      IN OUT VARCHAR2
  
  )
  RETURN BOOLEAN;


FUNCTION fn_Queue_Upload_Processing(
        p_borrow_contract_ref_no    IN  oltbs_contract.contract_ref_no%TYPE,
      p_err_code    IN OUT VARCHAR2,
  p_err_params      IN OUT VARCHAR2
  )
  RETURN BOOLEAN;

FUNCTION fn_Participant_Evt_Processing(
  p_borrow_contract_ref_no    IN  oltbs_contract.contract_ref_no%TYPE,
  p_borrow_event_date         IN Date,
  p_borrow_value_date         IN Date,
  p_contract_Type      IN    lbtb_party_event_master_upload.contract_type%TYPE,
  p_esn       IN  lbtb_party_event_master_upload.event_seq_no%TYPE,
  p_event_code      IN  lbtb_party_event_master_upload.event_code%TYPE,
        p_err_code    IN OUT VARCHAR2,
  p_err_params      IN OUT VARCHAR2
)
  RETURN BOOLEAN;
*/
  --
  -- FCC V.CL RELEASE Changes by SVS Commented functions in spec moved to body on 20-JUL-2006 . 
  --  

FUNCTION FN_PARTICIPANT_PROCESS(
        p_contract_ref_no    IN oltbs_contract.contract_ref_no%TYPE,
    p_action       IN VARCHAR2,
    p_counterparty       IN VARCHAR2,
    p_latest_event_seq_no    IN NUMBER,
    p_err_code         IN OUT VARCHAR2,
    p_err_params      IN OUT VARCHAR2
 )
 RETURN BOOLEAN;

  --
  -- FCC V.CL RELEASE Changes by SVS Commented functions in spec moved to body on 20-JUL-2006 . 
  --  
/*
 FUNCTION fn_Br_Update_Status(
        p_Br_Contract_ref_no  IN VARCHAR2,
        p_Br_Event_seq_no  IN NUMBER,
        p_err_code    IN OUT VARCHAR2,
  p_err_params      IN OUT VARCHAR2
  )
  RETURN BOOLEAN;
*/
  --
  -- FCC V.CL RELEASE Changes by SVS Commented functions in spec moved to body on 20-JUL-2006 . 
  --  

FUNCTION FN_PROCESS_RND_EVENT(
  p_Br_contract_ref_no    IN  oltbs_contract.contract_ref_no%TYPE,
  p_Br_esn          IN    oltbs_contract.Latest_Event_seq_no%Type,
    p_borrow_event_date     IN DATE Default GLOBAL.Application_Date,--FCC V.CL RELEASE 7.1 SFR#295 changes on 28-SEP-2006
    p_borrow_value_date     IN DATE Default GLOBAL.Application_Date,--FCC V.CL RELEASE 7.1 SFR#295 changes on 28-SEP-2006
  p_Br_event_code       IN   lbtb_party_event_master_upload.event_code%TYPE,
  p_event_code      IN   lbtb_party_event_master_upload.event_code%TYPE,
  p_amount          IN     VARCHAR2,--lbtb_party_event_detail_upload.Amount%TYPE, --07-SEP-2006
  p_ccy             IN     VARCHAR2,
  p_amount_tag      IN     VARCHAR2,
        p_err_code    IN OUT VARCHAR2,
  p_err_params      IN OUT VARCHAR2
  )
  RETURN BOOLEAN;

--08-APR-2003 FCC4.2 APR 2003 LS changes start
FUNCTION FN_LIQUIDATE_PARTICIPANTS
    ( p_contract_ref_no  IN  oltbs_contract.contract_ref_no%TYPE,
      p_branch_code    IN  oltms_branch.branch_code%TYPE
    )
RETURN BOOLEAN;
--08-APR-2003 FCC4.2 APR 2003 LS changes end

--12-APR-2003 FCC4.2 APR 2003 LS changes start
FUNCTION fn_participant_roll_processing
    (p_br_contract_ref_no IN    oltbs_contract.contract_ref_no%TYPE,
     p_event_seq_no     IN    oltbs_contract.contract_ref_no%TYPE,
     p_value_date     IN    oltbs_contract_master.value_date%TYPE,
     p_auth_status      IN    oltbs_contract.auth_status%TYPE,
     p_list_of_amount_tags  IN    VARCHAR2,
     p_list_of_amounts    IN      VARCHAR2,
     p_list_of_amount_ccys  IN    VARCHAR2,
     p_error_code     IN OUT  VARCHAR2,
     p_error_parameter    IN OUT  VARCHAR2
    )
RETURN BOOLEAN;
--12-APR-2003 FCC4.2 APR 2003 LS changes end

--28/04/2003
FUNCTION fn_generate_custom_ref_no(
    p_product_code    IN  oltms_product.PRODUCT_CODE%TYPE,
    p_contract_ref_no IN    oltbs_contract.Contract_ref_no%Type,
    p_custom_ref_no   OUT   oltbs_contract.Custom_ref_no%Type,
    pErrorCode    IN OUT  VARCHAR2,
    pErrorParams  IN OUT VARCHAR2
    )RETURN BOOLEAN;
--FCC 4.6.2 CITI LS CHANGES -vijeth
FUNCTION fn_populate_lltb_amount_due
  (p_borrower_ref_no IN oltbs_contract.contract_ref_no%TYPE
  ,p_contract_type IN VARCHAR2
  ,p_participant_ref_no IN oltbs_contract.contract_ref_no%TYPE
  ,p_participant IN oltbs_contract.counterparty%TYPE
  ,p_self_participant IN VARCHAR2
  ,p_event_code IN oltbs_contract_event_log.event_code%TYPE
  ,p_borrower_esn IN oltbs_contract_event_log.event_seq_no%TYPE
  ,p_participant_esn IN oltbs_contract_event_log.event_seq_no%TYPE
  ,p_amount_tag_list OUT VARCHAR2
  ,p_amount_list OUT VARCHAR2
  ,p_ccy_list OUT VARCHAR2
  ,p_err_code IN OUT VARCHAR2
  ,p_err_params IN OUT VARCHAR2
  )
RETURN BOOLEAN;
--FCC 4.6.2 CITI LS CHANGES -vijeth end

--FLEXCUBE_V.CL_RELEASE_7.0 ITR1 SFR#110 by Satya
  --
  -- FCC V.CL RELEASE Changes by SVS Commented functions in spec moved to body on 20-JUL-2006 . 
  --  
/*
Function fn_udf_upload
(
  p_borr_part_cont_ref_no   IN        oltbs_contract.contract_ref_no%type,
  p_err_code            IN OUT  varchar2,
  p_err_params      IN OUT  varchar2
) return boolean;

*/
  --
  -- FCC V.CL RELEASE Changes by SVS Commented functions in spec moved to body on 20-JUL-2006 . 
  --  
--21-JAN-2006 FLEXCUBE V.CL Release 7.0 changes piyush start

TYPE t_contract_table IS TABLE OF oltbs_contract%ROWTYPE INDEX BY BINARY_INTEGER;
p_cstcon       lppks_upload.t_contract_table;
p_inc_cstcon   lppks_upload.t_contract_table;


TYPE t_lltb_contract_master IS TABLE OF lptb_contract_master%ROWTYPE INDEX BY BINARY_INTEGER;
P_ldtb_master      lppks_upload.t_lltb_contract_master;
P_inc_ldtb_master  lppks_upload.t_lltb_contract_master;              

TYPE t_cstb_contract_event_log IS TABLE OF OLTB_CONTRACT_EVENT_LOG%ROWTYPE INDEX BY BINARY_INTEGER;
P_cstb_event      lppks_upload. t_cstb_contract_event_log;
P_inc_cstb_event  lppks_upload. t_cstb_contract_event_log;  

TYPE t_istb_contractis IS TABLE OF OLTB_SETTLEMENTS%ROWTYPE INDEX BY BINARY_INTEGER;
P_contractis lppks_upload.t_istb_contractis;

TYPE t_mitb_class_mapping IS TABLE OF OLTB_CLASS_MAPPING%ROWTYPE INDEX BY BINARY_INTEGER;
P_mitcls_mapping  lppks_upload.t_mitb_class_mapping;        

TYPE t_ldtb_contract_iccf_calc IS TABLE OF OLTB_CONTRACT_ICCF_CALC%ROWTYPE INDEX BY BINARY_INTEGER;
p_iccfcalc       lppks_upload.t_ldtb_contract_iccf_calc;
p_inc_iccfcalc   lppks_upload.t_ldtb_contract_iccf_calc;

--12-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag05 Different Margin for Participants changes start
TYPE t_lltb_contract_margin_detail IS TABLE OF lptb_contract_margin_detail%ROWTYPE INDEX BY BINARY_INTEGER;
p_cont_margin_detail      lppks_upload.t_lltb_contract_margin_detail;
p_inc_cont_margin_detail    lppks_upload.t_lltb_contract_margin_detail;

TYPE t_lltb_cont_interest_detail IS TABLE OF lptb_contract_interest_detail%ROWTYPE INDEX BY BINARY_INTEGER;
p_cont_interest_detail      lppks_upload.t_lltb_cont_interest_detail;
p_inc_cont_interest_detail    lppks_upload.t_lltb_cont_interest_detail;
--12-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag05 Different Margin for Participants changes end

--14-AUG-2006 FCC V.CL RELEASE 7.1 Prime loan changes starts
TYPE t_ldtb_contract_iccf_calc_hist IS TABLE OF OLTB_PRIME_ICCF_CALC_HISTORY%ROWTYPE INDEX BY BINARY_INTEGER;
p_prime_iccfcalc          lppks_upload.t_ldtb_contract_iccf_calc;
p_prime_iccfcalc_history      lppks_upload.t_ldtb_contract_iccf_calc_hist;
p_inc_prime_iccfcalc      lppks_upload.t_ldtb_contract_iccf_calc;
p_inc_prime_iccfcalc_history    lppks_upload.t_ldtb_contract_iccf_calc_hist;
--14-AUG-2006 FCC V.CL RELEASE 7.1 Prime loan changes ends

TYPE t_cftb_contract_fee_calc IS TABLE OF LFTB_CONTRACT_FEE_CALC%ROWTYPE INDEX BY BINARY_INTEGER;
p_feecalc       lppks_upload.t_cftb_contract_fee_calc;
p_inc_feecalc   lppks_upload.t_cftb_contract_fee_calc;

TYPE t_cstb_amount_due IS TABLE OF OLTB_AMOUNT_DUE_CS%ROWTYPE INDEX BY BINARY_INTEGER;
p_amtdue       lppks_upload.t_cstb_amount_due;
p_inc_amtdue   lppks_upload.t_cstb_amount_due;    

TYPE t_cstb_contract_event_advice IS TABLE OF OLTB_CONTRACT_EVENT_ADVICE%ROWTYPE  INDEX BY BINARY_INTEGER;
p_evtadvice      lppks_upload.t_cstb_contract_event_advice;
p_inc_evtadvice  lppks_upload.t_cstb_contract_event_advice;

TYPE t_mstb_dly_msg_out IS TABLE OF OLTB_DLY_MSG_OUT%ROWTYPE INDEX BY BINARY_INTEGER;
p_dlymsgout t_mstb_dly_msg_out; 

TYPE t_cstm_contract_usrdef_field  IS TABLE OF  oltms_contract_userdef_fields%ROWTYPE INDEX BY BINARY_INTEGER;
P_userdef lppks_upload.t_cstm_contract_usrdef_field;

TYPE t_cstb_contract_udf  IS TABLE OF  OLTB_CONTRACT_UDF%ROWTYPE INDEX BY BINARY_INTEGER;
P_conudf  lppks_upload.t_cstb_contract_udf;

TYPE t_istbs_contract_details  IS TABLE OF oltbs_sett_details%ROWTYPE INDEX BY BINARY_INTEGER;
P_contdetail lppks_upload.t_istbs_contract_details;

TYPE t_lltm_participant_entities IS TABLE OF lptm_participant_entities%ROWTYPE INDEX BY BINARY_INTEGER;
p_partenttity       lppks_upload.t_lltm_participant_entities;
p_inc_partenttity   lppks_upload.t_lltm_participant_entities;

--07-FEB-2006 Flexcube V.CLRelease 7.0 Propogation Related Changes by Darshana Starts
/*TYPE t_lstbs_drawdown_sch_events IS TABLE OF lbtbs_drawdown_sch_events%ROWTYPE INDEX BY BINARY_INTEGER;
p_drwdnevnt     lppks_upload.t_lstbs_drawdown_sch_events;
p_inc_drwdnevnt lppks_upload.t_lstbs_drawdown_sch_events;*/
--07-FEB-2006 Flexcube V.CLRelease 7.0 Propogation Related Changes by Darshana Ends

TYPE t_mstbs_msg_handoff IS TABLE OF oltbs_msg_handoff%ROWTYPE INDEX BY BINARY_INTEGER;
p_msghoff      lppks_upload.t_mstbs_msg_handoff;
p_inc_msghoff  lppks_upload.t_mstbs_msg_handoff;

TYPE t_lstbs_tranche_ddno_linkage  IS TABLE OF  lbtbs_tranche_ddno_linkage%ROWTYPE INDEX BY BINARY_INTEGER;
p_linkage      lppks_upload.t_lstbs_tranche_ddno_linkage;
p_inc_linkage  lppks_upload.t_lstbs_tranche_ddno_linkage;

TYPE t_lstb_party_evt_master_upd IS TABLE OF lbtb_party_event_master_upload%ROWTYPE INDEX BY BINARY_INTEGER;
P_eventupload       lppks_upload.t_lstb_party_evt_master_upd;
P_inc_eventupload   lppks_upload.t_lstb_party_evt_master_upd;

TYPE t_lstb_party_evt_detail_upd IS TABLE OF lbtb_party_event_detail_upload%ROWTYPE INDEX BY BINARY_INTEGER;
P_eventdetailupload       lppks_upload.t_lstb_party_evt_detail_upd;
P_inc_eventdetailupload   lppks_upload.t_lstb_party_evt_detail_upd;

TYPE t_mitcont_rates IS TABLE OF oltbs_contract_mis_rates%ROWTYPE INDEX BY BINARY_INTEGER;
p_mitcont_rates t_mitcont_rates;


TYPE t_lltb_contract_balance IS TABLE OF  lptb_contract_balance%ROWTYPE INDEX BY BINARY_INTEGER;
P_contbal       lppks_upload.t_lltb_contract_balance;
P_inc_contbal   lppks_upload.t_lltb_contract_balance;

TYPE t_lltb_amount_due_detail IS TABLE OF lptb_amount_due_detail%ROWTYPE INDEX BY BINARY_INTEGER;
p_amtduedetail      lppks_upload.t_lltb_amount_due_detail;
p_inc_amtduedetail  lppks_upload.t_lltb_amount_due_detail; 

TYPE t_lltb_amount_due_master IS TABLE OF lptb_amount_due_master%ROWTYPE INDEX BY BINARY_INTEGER;
p_amtduemaster       lppks_upload.t_lltb_amount_due_master;
p_inc_amtduemaster   lppks_upload. t_lltb_amount_due_master;    

--FCC V.CL RELEASE 7.1 changes for populating mapping table starts
TYPE t_lstb_event_mapping IS TABLE OF lbtb_borr_part_event_mapping%ROWTYPE INDEX BY BINARY_INTEGER;
p_lstb_event      lppks_upload.t_lstb_event_mapping;
p_inc_lstb_event  lppks_upload.t_lstb_event_mapping;
--FCC V.CL RELEASE 7.1 changes for populating mapping table ends

--FCC V.CL RELEASE 7.1 changes for populating pay/recv paid table
TYPE t_lstb_payrecv_paid IS TABLE OF lbtb_pay_recv_amount_paid%rowtype INDEX BY BINARY_INTEGER;
p_lstb_payrecv_paid      lppks_upload.t_lstb_payrecv_paid;
p_inc_lstb_payrecv_paid  lppks_upload.t_lstb_payrecv_paid;
--FCC V.CL RELEASE 7.1 changes for populating pay/recv paid table table ends

FUNCTION fn_populate_participant_plsql(p_string      IN  VARCHAR2,
                                       P_flg         IN  VARCHAR2,
                                       p_Err_Code    IN  OUT VARCHAR2,
                                       p_Err_Params  IN  OUT VARCHAR2                
                                       ) RETURN BOOLEAN;


FUNCTION fn_populate_bulk_plsql(p_flg           IN      VARCHAR2,
                                pErr_Code   IN OUT  VARCHAR2,
                        pErr_Params IN OUT  VARCHAR2
                                ) RETURN BOOLEAN ;


FUNCTION fn_participant_processing(P_br_ref_no IN lptbs_contract_master.Contract_Ref_No%TYPE,
                                   p_err_code IN OUT VARCHAR2,
                                   p_err_params IN OUT VARCHAR2
                                               )
RETURN BOOLEAN;

FUNCTION fn_participant(P_br_ref_no IN lptbs_contract_master.Contract_Ref_No%TYPE,
                        p_err_code IN OUT VARCHAR2,
                        p_err_params IN OUT VARCHAR2
                                               )
RETURN BOOLEAN;

--21-JAN-2006 FLEXCUBE V.CL Release 7.0 changes piyush end

--21-JAN-2006 FLEXCUBE V.CL Release 7.0 changes daya start

FUNCTION fn_participant_bulk_insert(p_table_forinsert IN VARCHAR2) RETURN BOOLEAN;

  --
  -- FCC V.CL RELEASE Changes by SVS Commented functions in spec moved to body on 20-JUL-2006 . 
  --  
/*
FUNCTION FN_INS_CSTBS_EVENT_LOG (p_cs_event_log IN oltbs_contract_event_log%ROWTYPE,
                   pActionCode    IN CHAR,
                 pErrorCode     IN OUT Varchar2
                            ) Return Boolean ;

FUNCTION fn_common_function_calls RETURN BOOLEAN;

FUNCTION fn_subsystems_blk_insert RETURN BOOLEAN;

FUNCTION fn_participant_book_entry (p_borrow_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
            p_err_code               IN OUT VARCHAR2,
            p_err_params             IN OUT VARCHAR2
            )
            RETURN BOOLEAN;
*/
  --
  -- FCC V.CL RELEASE Changes by SVS Commented functions in spec moved to body on 20-JUL-2006 . 
  --  

TYPE t_event_date IS TABLE OF oltbs_contract_event_log.event_date%TYPE INDEX BY BINARY_INTEGER;
l_event_date t_event_date;

TYPE t_event_code IS TABLE OF oltbs_contract_event_log.event_code%TYPE INDEX BY BINARY_INTEGER;
l_event_code t_event_code;

TYPE t_contract_status IS TABLE OF oltbs_contract_event_log.contract_status%TYPE INDEX BY BINARY_INTEGER;
l_cont_status t_contract_status;

TYPE t_module IS TABLE OF oltbs_contract_event_log.module%TYPE INDEX BY BINARY_INTEGER;
l_module t_module;

TYPE t_nvsn_ind IS TABLE OF oltbs_contract_event_log.new_version_indicator%TYPE INDEX BY BINARY_INTEGER;
l_nvsn_ind t_nvsn_ind;

TYPE t_auth_stat IS TABLE OF oltbs_contract_event_log.auth_status%TYPE INDEX BY BINARY_INTEGER;
l_auth_stat t_auth_stat;

TYPE t_resn IS TABLE OF oltbs_contract_event_log.reversed_event_seq_no%TYPE INDEX BY BINARY_INTEGER;
l_rev_esn t_resn;

TYPE t_evaldt IS TABLE OF oltbs_contract_event_log.event_value_date%TYPE INDEX BY BINARY_INTEGER;
l_evaldt t_evaldt;

TYPE t_wflow IS TABLE OF oltbs_contract_event_log.workflow_status%TYPE INDEX BY BINARY_INTEGER;
l_wflow t_wflow;

TYPE t_crefno IS TABLE OF oltbs_contract_event_log.contract_ref_no%TYPE INDEX BY BINARY_INTEGER;
l_crefno t_crefno;

TYPE t_esn IS TABLE OF oltbs_contract_event_log.event_seq_no%TYPE INDEX BY BINARY_INTEGER;
l_esn t_esn;
l_cnt_event_log number:= 0;

--21-JAN-2006 FLEXCUBE V.CL Release 7.0 changes daya end

--21-JAN-2006 FLEXCUBE V.CL Release 7.0 changes SACHIN PANWAR START 

FUNCTION fn_Participant_SKMD_Processing(                                       
        p_borrow_contract_ref_no    IN  oltbs_contract.contract_ref_no%TYPE,
        p_esn       IN  lbtb_party_event_master_upload.event_seq_no%TYPE,
  p_event_code      IN  lbtb_party_event_master_upload.event_code%TYPE,
  p_action_code     IN VARCHAR2,
  p_err_code    IN OUT VARCHAR2,
  p_err_params      IN OUT VARCHAR2
  ) RETURN BOOLEAN;                                                          

--21-JAN-2006 FLEXCUBE V.CL Release 7.0 changes SACHIN PANWAR END
--***********starts here
  --
  -- FCC V.CL RELEASE Changes by SVS Commented functions in spec moved to body on 20-JUL-2006 . 
  --  
/*
FUNCTION fn_part_amount_update(p_borrow_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
             p_effective_date   IN DATE,
             p_blk_flag   IN VARCHAR2,
                               pErrorCode   IN OUT  ertbs_msgs.err_code%TYPE)
RETURN BOOLEAN;
--******end here 
*/
  --
  -- FCC V.CL RELEASE Changes by SVS Commented functions in spec moved to body on 20-JUL-2006 . 
  --  
g_sighting_fund_esn NUMBER;--29-APR-2009 FLEXCUBE V.CL Release 7.6 Sighting Fund Changes Arthy
--OBCL_14.5_STAND_BY_FEE Start
FUNCTION fn_facility_vdbal_update( P_br_ref_no IN lptbs_contract_master.Contract_Ref_No%TYPE,
						p_err_code IN OUT VARCHAR2 ,
						p_err_params IN OUT VARCHAR2,
						p_value_date DATE DEFAULT TO_DATE('31/12/1901','DD/MM/YYYY'),
						p_action_code  VARCHAR2 default 'XXXX',
						p_fecility_ref_no VARCHAR2 default 'XXXX'
						) 
                RETURN BOOLEAN ;
				

TYPE ty_fac_vdbal_master IS RECORD (
   contract_ref_no lbtb_tranche_vdbal_master.contract_ref_no%TYPE,
   balance_type    lbtb_tranche_vdbal_master.balance_type%TYPE,
   value_date      lbtb_tranche_vdbal_master.value_date%TYPE,
   tr_contract_ccy lbtb_tranche_vdbal_master.contract_ccy%TYPE,
   opening_balance lbtb_tranche_vdbal_master.opening_balance%TYPE,
   tr_closing_balance lbtb_tranche_vdbal_master.closing_balance%TYPE,
   dr_turnover     lbtb_tranche_vdbal_master.dr_turnover%TYPE,
   cr_turnover     lbtb_tranche_vdbal_master.cr_turnover%TYPE,
   contract_ccy	   lbtb_tranche_vdbal_master.contract_ccy%TYPE,
   closing_bal	   lbtb_tranche_vdbal_master.closing_balance%TYPE
 );
   TYPE l_typ_fac_vdbal_master IS TABLE OF ty_fac_vdbal_master INDEX BY BINARY_INTEGER;


TYPE ty_fac_part_vdbal_master IS RECORD (
	contract_ref_no	lbtb_part_vdbal_master.contract_ref_no	%TYPE,
	counterparty	lbtb_part_vdbal_master.counterparty%TYPE,
	balance_type	lbtb_part_vdbal_master.balance_type%TYPE,
	value_date	lbtb_part_vdbal_master.value_date%TYPE,
	tr_contract_ccy	lbtb_part_vdbal_master.contract_ccy%TYPE,
	opening_bal	lbtb_part_vdbal_master.opening_bal%TYPE,
	dr_turnover	lbtb_part_vdbal_master.dr_turnover%TYPE,
	cr_turnover	lbtb_part_vdbal_master.cr_turnover%TYPE,
	tr_closing_bal	lbtb_part_vdbal_master.closing_bal%TYPE,
	nrs_amount	lbtb_facility_part_vdbal_master.nrs_amount%TYPE,
	contract_ccy	lbtb_part_vdbal_master.contract_ccy%TYPE,
	closing_bal	lbtb_part_vdbal_master.closing_bal%TYPE
);
   TYPE l_typ_fac_part_vdbal_master IS TABLE OF ty_fac_part_vdbal_master INDEX BY BINARY_INTEGER;
   
   TYPE ty_fac_part_vdbal_dtl IS RECORD (
	tranche_ref_no LBTB_PART_VDBAL_DETAIL.tranche_ref_no%tYPE,
	drawdown_ref_no LBTB_PART_VDBAL_DETAIL.drawdown_ref_no%tYPE,
	counterparty LBTB_PART_VDBAL_DETAIL.counterparty%tYPE,
	balance_type LBTB_PART_VDBAL_DETAIL.balance_type%tYPE,
	value_date LBTB_PART_VDBAL_DETAIL.value_date%tYPE,
	tranche_ccy LBTB_PART_VDBAL_DETAIL.tranche_ccy%tYPE,
	drawdown_ccy LBTB_PART_VDBAL_DETAIL.drawdown_ccy%tYPE,
	swing_line LBTB_PART_VDBAL_DETAIL.swing_line%tYPE,
	opening_bal LBTB_PART_VDBAL_DETAIL.opening_bal%tYPE,
	dr_turnover LBTB_PART_VDBAL_DETAIL.dr_turnover%tYPE,
	cr_turnover LBTB_PART_VDBAL_DETAIL.cr_turnover%tYPE,
	tr_closing_bal LBTB_PART_VDBAL_DETAIL.closing_bal%tYPE,
	tranche_ccy_opening_bal LBTB_PART_VDBAL_DETAIL.tranche_ccy_opening_bal%tYPE,
	tranche_ccy_dr_turnover LBTB_PART_VDBAL_DETAIL.tranche_ccy_dr_turnover%tYPE,
	tranche_ccy_cr_turnover LBTB_PART_VDBAL_DETAIL.tranche_ccy_cr_turnover%tYPE,
	tranche_ccy_closing_bal LBTB_PART_VDBAL_DETAIL.tranche_ccy_closing_bal%tYPE,
	lc_drawdown LBTB_PART_VDBAL_DETAIL.lc_drawdown%tYPE,
	lc_type LBTB_PART_VDBAL_DETAIL.lc_type%tYPE,
	contract_ccy LBTB_PART_VDBAL_DETAIL.tranche_ccy%tYPE,
	closing_bal LBTB_PART_VDBAL_DETAIL.closing_bal%tYPE
);
  TYPE l_typ_fac_part_vdbal_dtl IS TABLE OF ty_fac_part_vdbal_dtl INDEX BY BINARY_INTEGER;

 TYPE ty_fac_lbtb_cont_part IS RECORD (
	CONTRACT_REF_NO lbtb_contract_participant.CONTRACT_REF_NO%TYPE,
	PARTICIPANT     lbtb_contract_participant.PARTICIPANT%TYPE,
	CONTRACT_TYPE   lbtb_contract_participant.CONTRACT_TYPE%TYPE,
	EVENT_SEQ_NO    lbtb_contract_participant.EVENT_SEQ_NO%TYPE,
	TR_ASSET_AMOUNT lbtb_contract_participant.ASSET_AMOUNT%TYPE,
	ASSET_AMOUNT    lbtb_contract_participant.ASSET_AMOUNT%TYPE
);
 TYPE l_typ_fac_lbtb_cont_part IS TABLE OF ty_fac_lbtb_cont_part INDEX BY BINARY_INTEGER;
 
 
 TYPE ty_fac_oltb_cont_master IS RECORD (
	 contract_ref_no Oltb_Contract_Master.contract_ref_no%type,
	 version_no Oltb_Contract_Master.version_no%type,
	 syndication_ref_no Oltb_Contract_Master.syndication_ref_no%type,
	 tranche_ref_no Oltb_Contract_Master.tranche_ref_no%type,
	 tr_amount Oltb_Contract_Master.amount%type,
     tr_currency Oltb_Contract_Master.currency%type,
	 amount Oltb_Contract_Master.amount%type
);
 TYPE l_typ_fac_oltb_cont_master IS TABLE OF ty_fac_oltb_cont_master INDEX BY BINARY_INTEGER;
 
 
FUNCTION FN_GET_FC_CCY_AMNT ( p_facility_ref_no IN lptbs_contract_master.Contract_Ref_No%TYPE,
                              p_value_date      IN DATE DEFAULT TO_DATE('31/12/1901','DD/MM/YYYY'),
							  p_fc_currency     IN OLTB_CONTRACT_MASTER.currency%type,
							  p_fc_vdbal_rec    OUT l_typ_fac_vdbal_master,
							  p_fc_part_vdbal_rec OUT L_TYP_FAC_PART_VDBAL_MASTER,
							  p_fc_part_vdbal_dtl_rec OUT l_typ_fac_part_vdbal_dtl,
							  p_fc_lbtb_cont_part_rec OUT l_typ_fac_lbtb_cont_part,
							  p_fc_oltb_cont_master_rec OUT l_typ_fac_oltb_cont_master,
							  p_err_code IN OUT VARCHAR2 ,
						      p_err_params IN OUT VARCHAR2) 
                RETURN BOOLEAN ;
--OBCL_14.5_STAND_BY_FEE End
END lppks_upload;
/
CREATE or replace SYNONYM lppkss_upload FOR lppks_upload
/