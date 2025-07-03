CREATE OR REPLACE PACKAGE Lbpks_Stp_Interface IS
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name    : lbpks_stp_interface.SPC
  **
  ** Module       : LOANS SYNDICATION
  **
    This source is part of the Oracle Banking Corporate Lending  Software Product.
    Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.
    No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.
  
    Oracle Financial Services Software Limited.
    Oracle Park, Off Western Express Highway,
    Goregaon (East),
    Mumbai - 400 063, India.
  **
  ----------------------------------------------------------------------------------------------------
  CHANGE HISTORY
  
  Date of creation:18-OCT-2007
    Purpose  :To handle the population of upload tables which are required
  for the population of LP contracts for the corresponding self participants at LL side.
  25-dec-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#91 25-dec-2007 added the spc of fn_pop_history
  18-jan-2008 FLEXCUBE V.CL Release 7.4 RT fixes introduced one new function Fn_update_Reprocess_stat to update the processing status as reprocess
  28-jul-2008 FCC V.CL Release 7.4 STP browser changes
  11-Aug-2008  FCC V.CL Release 7.4  STP   Camd,Famd upload
  13-Aug-2008 FCC V.CL Release 7.4 STP Participant Changes
  16-SEP-2008 FLEXCUBE V.CL Release 7.4 VAMI related changes; Search string "Rel 7.4 16-SEP-2008 STP-VAMI"
  26-Sep-2008 FCC V.CL Release 7.4 STP STP-ITR1-SFR-132 Changes, If LS and LD are in different schemas, ERAM is not getting processed
  26-Jan-2009 CITIUS-LS Till#5265, added new flag g_agency_contract_ref_no
  26-Jan-2009 CITIUS-LS#5307. New function to do stp propagation of following entities from agency to origination.
                For Fee - Contract fee/amount due/calc/schedules
                For Interest - Contract interest/amount due/calc/schedules/agency rate
  25-FEB-2009 CITIUS-LS Till#5395 -- PRAM-STP changes-- New function fn_continue_processing added for checking the sequence of dd and tranche processing
  23-JUN-2009 CITIUS-LS#5846 STP - New approach changes.
  22-jul-2009 CITIUS-LS#6031.New package variable to signify whether the event is due to LT trade.
  26-AUG-2009 CITIUS-LS#6235, Clearpar and SLT incremental changes retro - Multiple Expense Code Changes,CITIUS Retro#5846 STP - New approach changes
                  also changed the copyright clause.
  09-SEP-2009 CITIUS-LS#6315 Jira#958 Pram processing is failing for the dd which is booked later than pram date.
  27-SEP-2009 CITIUS-LS#6686.For validating the XXPOSITIONS and due/calc details for each event since the agency events will continue
        even when the ld events failed/unprocessed required snapshot of balances from LS.
        Data store is being taken as part of handoff for each of the LS events and will be used for the validation.
        Available balance check bw LS and LD will be done only after all the events are processed.
        Fn_validate_position will be called only after the events are marked as processed.
  09-OCT-2009 CITIUS-LS Till#6441(JIRA-1135),comm fee not calculated properly related fixes
  11-OCT-2009 CITIUS-LS#6755 Payment beyond PRAM  is not handled as part of STP process. payrecv is not computing properly, vami(positive and negative) was not firing for the PRAM increase or decrease.
  16-OCT-2009 CITIUS-LS#6763 Pay recv liquidations for LD module.
  28-OCT-2009 CITIUS-LS TILL#6509 (JIRA 150080-1301) While doing handoff rerun for the book event it was updating the store tables with the latest LS side data
  28-OCT-2009 CITIUS-LS#6798, 1.  New function fn_init_for_rollchild_stp has been introduced for Processing of the STP after the all the batch process is finished
                  Processing of the STP only for the tranche ref number in lbtb_job_queue for that days batch.
                2.  New parameter tranche ref number added for stp processing
  28-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION 11-DEC-2009 CITIUS-LS#6972, CITIUS-LS#6926 fn_validate_position_reprop added for marking event as processed from failed.
  24-FEB-2010 FLEXCUBE V.CL Release 7.6 CITIUS RETRO CITIUS-LS#7089 PRAM to bring a new citi investor into the deal. The loans are in extraction in the STP browser.
  18-MAR-2010 FLEXCUBE V.CL Release 7.6  CITIUS-LS#7165.VT-23710138 Changes
  06-AUG-2010 FLEXCUBE V.CL Release 7.7 Vol4 FS Tag03 CLP Participation and Agency processing for participations stp changes
  14-AUG-2010 FLEXCUBE V.CL Release 7.7 Retro, CITIUS Till#7328,New function added FN_Adjust_Maturity_schedule to urgest the amount @maturity date upto tolerance amount
  18-AUG-2010 FLEXCUBE V.CL Release 7.7 VOL4 FS Tag03 CLP Participation Changes
  08-SEP-2010 FLEXCUBE V.CL Release 7.7 ITR1 SFR#67,'LD-C0013-User Reference No. already exists' validation should be bypassed for wrapper contracts
  15-SEP-2010 FLEXCUBE V.CL Release 7.7 ITR2 SFR#01 changes,Wrapper rehandoff related changes
  03-JAN-2011 Flexcube V.CL Release 7.8, SFR#14, CITIUS Retro Till#7427 changes - System was populating the STP browser even for the zero ratio participants which have been rectified
  03-JUN-2011 Flexcube V.CL Release 7.9, CITIUS Retro, TILL#7571, SLT Commitments and NPVAMI for SLT Self participant - Reason code should not be mandatory in VAMI Screen
  25-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10637 Additional fixes for new commitment for clp participation
  29-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10272 CLP Part changes
  29-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10594 change in wrapper validate position
  07-SEP-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#9806  new procedure pr_stp_auto_process added
  08-AUG-2012 CITIUS#14607, Added new global variable for LC sublimit reclassification
  12-DEC-2012 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO EURCITIPLC-GENERIC#13538 Changes - fine tune the back ground job processing to improve the system performance - avoiding the global pr_init call when records are not present for processing
  18-DEC-2012 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#15615 Changes, fn_ccc_department_check function declared in specification
  11-OCT-2013 Oracle FCUBS 3.3.0.0.0$CITIBK_R713 Retro CITIUS#16517 interest basis changes should be stp to origination side.
  23-AUG-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag10 change,Handled validation for contracts for which value dated avaialabilty flag is checked at the stprelink screen
  30-JAN-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 RETRO CITIBLR#35349 changes,added changes to process STP of VAMI by changing the interest basis
  28-Sep-2017  -- For OBCL 12.5.0.0.1 #26879441 propagation/movement of LB side UDF to OL side Search string OBCL_12.5_STP_UDF_CHANGES
  31-jan-2018 --For LS-ELCM propagation added function fn_update_ACC_COLLETRAL_LINK for CAMD search string OBCL_14.0__ACC_COLLETRAL_LINK changes
  04-May-2018 --For LS-ELCM Blockrefno propagation added bug 27960385  search string 27960385
  29-MAY-2018 --For LS-ELCM Blockrefno propagation added Function to Unblock for DD in PRAM Case search string OBCL_14.1_PRAM_DD_Case
  31-Dec-2019  OBCL_14.4#SLT Sub Participation changes.
  
    **Changed By         : Pallavi R/Janki/Abhinav
    **Date               : 17-Jan-2020
    **Change Description : Done code changes for amortization fees to support for LB and FC modules.
    **Search String      : OBCL_14.4_LS_Adhoc_Fee Changes  
	
	Changed By         : Kaushik A S/Ramya M
	Changed On         : 01-Aug-2020
	Search String      : OBCL_14.5_Discounted_Schedule_Changes
	Change Reason      : OBCL_14.5_Discounted_Schedule_Changes 

	Changed By         : Baljinder Singh
	Changed On         : 19-Aug-2020
	Search String      : SOFR_balli_14_Aug_changes
	Change Reason      : LS SOFR STP changes
	
	Changed By         : Ramya
	Changed On         : 27-Aug-2020
	Search String      : OBCL_14.5_LS_DISCOUTNED_SCHEDULES_CHANGES
	Change Reason      : IRFX STP PROPOGATION CHANGES
	
	Changed By         : Palanisamy M	
	Changed On         : 02-Feb-2021
	Change Reason      : Fix for LSSTPJB(STP JOB) - DEADLOCK ISSUE 
	Search String      : OBCL_14.4_SUPP_#32411440 Changes

    Changed By         : Arunprasath K	
	Changed On         : 03-May-2021
	Change Reason      : SOFR rollover/reprice changes
	Search String      : OBCL_14.3_Rollover_SOFR
	
   **Changed By          : Arunprasath
   **Date                : 20-Jul-2021
   **Change Description  : Added code for amount due and upload table store for reprice/split contract
   **Search String       : OBCL_14.5_Consol_Roll
   
    Changed By         : Surya Prabha
    Changed On         : 18-Nov-2021
    Change Reason      : Code fix to process REVC in STP processing
    Search String      : Bug#33537872 changes
	
    Changed By         : Chandra Achuta
    Changed On         : 16-JUN-2022
    Change Reason      : Code fix to process RFND,RRND in STP processing
    Search String      : Bug#34021830

    Changed By         : anusha k
    Changed On         : 24-JUL-2022
    Change Reason      : Changes done for supporting fwd dtd roll and reprice
    Search String      : OBCL_14.5_SMTB_#34230976 	
	
    Changed By         : Palanisamy M
    Changed On         : 17-Aug-2022
    Change Description : Fix for Collateral Block amount not getting released
    Search String      : Bug#34445827_1	
    
    Changed By         : Chandra Achuta
    Changed On         : 19-AUG-2022
    Change Reason      : Code fix to process FELR if accrual method as Flat Amount
    Search String      : Bug#34504067   
    
    Changed By         : Anusha K
    Changed On         : 27-Jan-2023
    Change Reason      : added new procedure for forward child contract processing of roll and split reprice 
    Search String      : obcl_14.6_rabo_#35004685 changes 	
	
    Changed By         : Divya J
    Changed On         : 03-Jan-2023
    Change Reason      : ERAM Event Population in Event Log
    Search String      : Bug#34904531   

    Changed By         : Sowmya Bitra
    Date               : 13-Aug-2024
    Change Description : OBCL_14.8_VER_ROL_LS Changes
    Search String      : OBCL_14.8_VER_ROL_LS Changes 
  --------------------------------------------------------------------------------------------------------------
  */
  
   g_agency_esn oltb_contract_event_log.EVENT_SEQ_NO%type;--ankk
  g_agency_borrower_ref oltb_contract.CONTRACT_REF_NO%type;--ankk
  Gerrlist            VARCHAR2(10000);
  Gerrparamlist       VARCHAR2(10000);
  Govlist             VARCHAR2(10000);
  Govparamlist        VARCHAR2(10000);
  Gextrefno           Oltbs_Upload_Master.Ext_Contract_Ref_No%TYPE;
  Gcuberefno          Oltbs_Contract_Master.Contract_Ref_No%TYPE;
  Gsourcecode         Oltbs_Upload_Master.Source_Code%TYPE;
  Govdseqno           NUMBER := 0;
  Gerrseqno           NUMBER := 0;
  Gcuberefno          VARCHAR2(16);
  Gmodule             Oltbs_Contract.Module_Code%TYPE;
  Gcparty             Oltbs_Contract.Counterparty%TYPE;
  Grecind             VARCHAR2(1);
  Gpayind             VARCHAR2(1);
  Pkg_Dept            Oltms_Department.Department_Code%TYPE;
  Pkg_Branch          Oltbs_Branch_Param.Branch_Code%TYPE;
  Pkg_New_Udf_Modules Oltbs_Branch_Param.Param_Val%TYPE;
  g_Version_No        Oltbs_Contract.Latest_Version_No%TYPE;
  g_Cont_Roll_Chk     VARCHAR2(1);
  g_Cont_Sch_Chk      VARCHAR2(1);
  g_Cont_Lnkg_Chk     VARCHAR2(1);
  g_Cont_Pref_Chk     VARCHAR2(1);
  g_Cont_Int_Chk      VARCHAR2(1);
  g_Agency_Contract   CHAR(1) := 'N';
  g_job_route         VARCHAR2(1) := 'N'; -- 31534340
  g_Borr_Esn          Oltbs_Contract_Event_Log.Event_Seq_No%TYPE; --CITIUS-LS#6686 Changes
  --CITIUS-LS Till#5265 Starts
  g_Agency_BORR_Contract_Ref_No Oltbs_Contract.Contract_Ref_No%TYPE := NULL; --OBCL_144_LS_CASH_FLOW_CAHNGES
  g_Agency_PART_Contract_Ref_No Oltbs_Contract.Contract_Ref_No%TYPE := NULL; --SOFR_balli_14_Aug_changes
  g_Agency_Contract_Ref_No Oltbs_Contract.Contract_Ref_No%TYPE := NULL;
  g_Stp_Event_Code         Oltbs_Contract.Curr_Event_Code%TYPE := NULL;
  g_Agency_Event_Code      Oltbs_Contract.Curr_Event_Code%TYPE; --18-AUG-2010 FLEXCUBE V.CL Release 7.7 VOL4 FS Tag03 CLP Participation Changes
  g_Rollover_Processing    VARCHAR2(1) := 'N';
  --CITIUS-LS Till#5265 Ends
  g_Camd_Basis_Changed VARCHAR2(1) := 'N'; --11-OCT-2013 Oracle FCUBS 3.3.0.0.0$CITIBK_R713 Retro CITIUS#16517
  g_Borr_Esn_0         VARCHAR2(1) := 'N'; --09-OCT-2009 CITIUS-LS Till#6441(JIRA-1135),comm fee not calculated properly related fixes
  g_Stub_Processing    VARCHAR2(1) := 'N'; --09-SEP-2009 CITIUS-LS#6315 Jira#958 Pram processing is failing for the dd which is booked later than pram date.

  g_Event_From_Lt      VARCHAR2(1) := 'N'; --CITIUS-LS#6031
  g_Lt_Trade_Ref_No    Oltbs_Contract.Contract_Ref_No%TYPE; --25-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10637 changes
  g_Sch_Recalc_Dt      DATE; -- Rel 7.4 16-SEP-2008 STP-VAMI added
  g_Auto_Vami          CHAR; --CITIUS-LS#6763
  g_Roll_Init_Contract VARCHAR2(1) := 'N'; --CITIUS-LS#6798
  ----24-FEB-2010 FLEXCUBE V.CL Release 7.6 CITIUS RETRO CITIUS-LS#7089 changes start
  g_Hoff_Activity_Seq_No Oltbs_Stp_Job_Browser.Activity_Seq_No%TYPE;
  g_Hoff_Rerun           VARCHAR2(1) := 'N';
  ----24-FEB-2010 FLEXCUBE V.CL Release 7.6 CITIUS RETRO CITIUS-LS#7089 changes end
  g_Ls_Borr_Esn       Oltbs_Contract_Event_Log.Event_Seq_No%TYPE; --CITIUS#14607
  g_Part_Esn          Oltbs_Contract_Event_Log.Event_Seq_No%TYPE; --CITIUS#14607
  g_Val_Dt_Avilabilty VARCHAR2(1) := 'N'; --23-AUG-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag10 change
  g_irfx_stp_prop varchar2(1);--OBCL_14.5_LS_DISCOUTNED_SCHEDULES_CHANGES
  g_stp_prop_yn varchar2(1);--OBCL_14.5_LS_DISCOUTNED_SCHEDULES_CHANGES
  g_roll_reprice_falg VARCHAR2(10); --OBCL_14.3_Rollover_SOFR
  G_SILENT_PART LBTB_CONTRACT_PARTICIPANT.PARTICIPANT%TYPE;--SILENT_PART CHANGES
  g_wrapper_Contract   CHAR(1) := 'N';
  g_skip_bal_update  CHAR(1) := 'N';--OBCL_14.5_SMTB_#34230976 
  g_stp_eram_processing CHAR(1) := 'N'; --Bug#34904531
  g_is_vroll_src_ref VARCHAR2(1)  := 'N'; --OBCL_14.8_VER_ROL_LS Changes
  g_ver_roll_handoff VARCHAR2(1) := 'N'; --OBCL_14.8_VER_ROL_LS Changes
    g_fwd_job_route         VARCHAR2(1) := 'N'; -- Bug#37521510 ADDED
  TYPE Tbl_Upl_Sch IS TABLE OF Oltbs_Upload_Schedules%ROWTYPE INDEX BY BINARY_INTEGER;

  TYPE Tbl_Upl_Linkages IS TABLE OF Oltbs_Upload_Linkages%ROWTYPE INDEX BY BINARY_INTEGER;

  --TYPE Tbl_Repo_Blocks   IS TABLE OF Setbs_Upload_Repo_Blocks%ROWTYPE INDEX BY BINARY_INTEGER;

  TYPE t_Rec_Inter_Face IS RECORD(
    Borr_Ref_No Oltbs_Contract.Contract_Ref_No%TYPE,
    Borr_Esn    Oltbs_Contract_Event_Log.Event_Seq_No%TYPE,
    Part_Ref_No Oltbs_Contract.Contract_Ref_No%TYPE,
    Part_Esn    Oltbs_Contract_Event_Log.Event_Seq_No%TYPE,
    Borr_Event  Oltbs_Contract_Event_Log.Event_Code%TYPE,
    Part_Event  Oltbs_Contract_Event_Log.Event_Code%TYPE);

  TYPE p_Rec_Interface IS TABLE OF t_Rec_Inter_Face INDEX BY BINARY_INTEGER;
  l_Rec_Interface p_Rec_Interface;

  TYPE p_Rec_Upload_Master IS TABLE OF Oltbs_Upload_Master%ROWTYPE INDEX BY BINARY_INTEGER;
  l_Rec_Upload_Master p_Rec_Upload_Master;

  TYPE p_Rec_Upload_Schedules IS TABLE OF Oltbs_Upload_Schedules%ROWTYPE INDEX BY BINARY_INTEGER;
  l_Rec_Upload_Schedules p_Rec_Upload_Schedules;

  TYPE p_Rec_Upload_Fee IS TABLE OF Lftbs_Upload_Fee%ROWTYPE INDEX BY BINARY_INTEGER;
  l_Rec_Upload_Fee p_Rec_Upload_Fee;
  --OBCL_14.4_Tax_Changes :: Starts
  TYPE p_Rec_Upload_Tax IS TABLE OF Txtbs_Upload_Rule%ROWTYPE INDEX BY BINARY_INTEGER;
  l_Rec_Upload_Tax p_Rec_Upload_Tax;

  TYPE p_Rec_Upload_Tax_Det IS TABLE OF Txtbs_Upload_Rule_Det%ROWTYPE INDEX BY BINARY_INTEGER;
  l_Rec_Upload_Tax_Det p_Rec_Upload_Tax_Det;
  --OBCL_14.4_Tax_Changes :: Ends
  TYPE p_Rec_Upload_Mis IS TABLE OF Oltbs_Upload_Class_Mapping%ROWTYPE INDEX BY BINARY_INTEGER;
  l_Rec_Upload_Mis p_Rec_Upload_Mis;

  TYPE p_Rec_Upload_Charge IS TABLE OF Lftbs_Upload_Charge%ROWTYPE INDEX BY BINARY_INTEGER;
  l_Rec_Upload_Charge p_Rec_Upload_Charge;

  /*TYPE p_Rec_Upload_Exfx_Details IS TABLE OF Cftbs_Upload_Exfx_Details%ROWTYPE INDEX BY BINARY_INTEGER;
  l_Rec_Upload_Exfx_Details p_Rec_Upload_Exfx_Details;
  
  TYPE p_Rec_Upload_Vd_Exchange_Rate IS TABLE OF Cftbs_Upload_Vd_Exchange_Rate %ROWTYPE INDEX BY BINARY_INTEGER;
  l_Rec_Upload_Vd_Exchange_Rate p_Rec_Upload_Vd_Exchange_Rate;*/

  TYPE p_Rec_Ldtbs_Upload_Liq IS TABLE OF Oltbs_Upload_Liq%ROWTYPE INDEX BY BINARY_INTEGER;
  l_Rec_Ldtbs_Upload_Liq p_Rec_Ldtbs_Upload_Liq;

  TYPE p_Rec_Ldtbs_Upload_Liq_Summary IS TABLE OF Oltbs_Upload_Liq_Summary%ROWTYPE INDEX BY BINARY_INTEGER;
  l_Rec_Ldtbs_Upload_Liq_Summary p_Rec_Ldtbs_Upload_Liq_Summary;

  TYPE p_Rec_Upload_Amend_Due IS TABLE OF Oltbs_Upload_Amend_Due%ROWTYPE INDEX BY BINARY_INTEGER;
  l_Rec_Upload_Amend_Due p_Rec_Upload_Amend_Due;

  TYPE p_Rec_Upload_Interest IS TABLE OF Lftbs_Upload_Interest%ROWTYPE INDEX BY BINARY_INTEGER;
  l_Rec_Upload_Interest p_Rec_Upload_Interest;

  /*TYPE p_Rec_Upload_Interest_Master IS TABLE OF Cftbs_Upload_Interest_Master%ROWTYPE INDEX BY BINARY_INTEGER;
  l_Rec_Upload_Interest_Master p_Rec_Upload_Interest_Master;
  
  TYPE p_Rec_Upload_Interest_Detail IS TABLE OF Cftb_Upload_Interest_Detail%ROWTYPE INDEX BY BINARY_INTEGER;
  l_Rec_Upload_Interest_Detail p_Rec_Upload_Interest_Detail;*/

  TYPE p_Rec_Amount_Due IS TABLE OF Oltbs_Amount_Due_Upload%ROWTYPE INDEX BY BINARY_INTEGER;
  l_Rec_Amount_Due p_Rec_Amount_Due;
  --OBCL_14.4_LS_Adhoc_Fee Changes Changes Starts
  TYPE p_Upld_Accrfee_Rec IS TABLE OF Lftbs_Upload_Contract_Accr_Fee%ROWTYPE INDEX BY BINARY_INTEGER;
  l_Upld_Accrfee_Rec p_Upld_Accrfee_Rec;
  TYPE p_Upld_Amend_Accrfee_Rec IS TABLE OF Lftbs_Upload_amend_Accr_Fee%ROWTYPE INDEX BY BINARY_INTEGER;
  l_Upld_Amend_Accrfee_Rec p_Upld_Amend_Accrfee_Rec;  
  --OBCL_14.4_LS_Adhoc_Fee Changes Changes Ends
  
  --Bug#34504067  Changes Starts
  TYPE p_Upld_Accrfee_Sch_Rec IS TABLE OF Lftbs_Upload_Contract_Sch%ROWTYPE INDEX BY BINARY_INTEGER;
  l_Upld_Accrfee_Sch_Rec p_Upld_Accrfee_Sch_Rec;
  --Bug#34504067  Changes Ends
  
  --OBCL_14.5_Discounted_Schedule_Changes -- START
  TYPE p_Rec_payrecv_due_dtl IS TABLE OF LBTB_UPLD_PY_RCV_DUE_DTL%ROWTYPE INDEX BY BINARY_INTEGER;
  l_Rec_payrecv_due_dtl p_Rec_payrecv_due_dtl;
  --OBCL_14.5_Discounted_Schedule_Changes -- END
  
  --Bug#34021830  Changes Starts
  TYPE p_Rec_refund_due_dtl IS TABLE OF OLTB_UPLOAD_CONTRACT_REFUND%ROWTYPE INDEX BY BINARY_INTEGER;
  l_Rec_refund_due_dtl p_Rec_refund_due_dtl;
  --Bug#34021830  Changes Ends 
  
  TYPE p_Rec_Upload_Contract_Liq IS TABLE OF Lftbs_Upload_Contract_Liq%ROWTYPE INDEX BY BINARY_INTEGER;
  l_Rec_Upload_Contract_Liq p_Rec_Upload_Contract_Liq;

  TYPE p_Rec_Upload_Contract_Liq_Sum IS TABLE OF Lftbs_Upload_Cont_Liq_Summary%ROWTYPE INDEX BY BINARY_INTEGER;
  l_Rec_Upload_Contract_Liq_Sum p_Rec_Upload_Contract_Liq_Sum;

  /*
  TYPE p_Rec_Ld_Upload_Contract_Liq IS TABLE OF Ldtbs_Upload_Contract_Liq%ROWTYPE INDEX BY BINARY_INTEGER;
  l_Rec_Ld_Upload_Contract_Liq p_Rec_Ld_Upload_Contract_Liq;
  
  TYPE p_Rec_Ld_Upload_Cont_Liq_Sum IS TABLE OF Ldtbs_Upload_Cont_Liq_Summary%ROWTYPE INDEX BY BINARY_INTEGER;
  l_Rec_Ld_Upload_Cont_Liq_Sum p_Rec_Ld_Upload_Cont_Liq_Sum;
  */

  TYPE p_Rec_Ld_Upload_Agency_Rate IS TABLE OF Lftbs_Upload_Agency_Rate%ROWTYPE INDEX BY BINARY_INTEGER;
  l_Rec_Ld_Upload_Agency_Rate p_Rec_Ld_Upload_Agency_Rate;

  --09-JAN-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag09 CITIBLR#35349 changes changes start
  TYPE p_Rec_Ld_Upload_Amend_Int IS TABLE OF Oltbs_Upload_Amend_Interest%ROWTYPE INDEX BY BINARY_INTEGER;
  l_Rec_Ld_Upload_Amend_Int p_Rec_Ld_Upload_Amend_Int;
  --09-JAN-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag09 CITIBLR#35349 changes changes end

  TYPE l_Self_Participant_Record IS RECORD(
    Contract_Ref_No Oltbs_Contract.Contract_Ref_No%TYPE,
    Counterparty    Lptbs_Contract_Master.Counterparty%TYPE,
    Product         Oltbs_Contract.Product_Code%TYPE,
    Ls_Branch       Oltbs_Contract.Branch%TYPE,
    Ld_Branch       Oltbs_Contract.Branch%TYPE,
    Asset_Ratio     Lbtbs_Contract_Participant.Asset_Ratio%TYPE,
    --  interface_type  lbtms_self_participant.interface_type%TYPE,       -- 13-Aug-2008 FCC V.CL Release 7.4 STP Participant Changes
    Interface_Type     Tltms_Portfolio.Interface_Type%TYPE, -- 13-Aug-2008 FCC V.CL Release 7.4 STP Participant Changes
    Dblink             VARCHAR2(100),
    Part_Esn           Oltbs_Contract_Event_Log.Event_Seq_No%TYPE,
    Portfolio          Tltms_Position_Identifier.Portfolio%TYPE, -- 13-Aug-2008 FCC V.CL Release 7.4 STP Participant Changes
    Operation          Lbtbs_Contract_Participant.Operation%TYPE, -- PT changes added
    Lma_Participation  Lbtbs_Contract_Participant.Lma_Participation%TYPE, --OBCL_14.4#SLT Sub Participation Chages added 
    Silent_Participant Tltms_Position_Identifier.Silent_Participant%TYPE, --06-AUG-2010 FLEXCUBE V.CL Release 7.7 Vol4 FS Tag03 CLP Participation and Agency processing for participations stp changes
    Zero_Investor      VARCHAR2(1) --03-JAN-2011 Flexcube V.CL Release 7.8, SFR#14, CITIUS Retro Till#7427
    );

  TYPE p_Rec_Self_Participant IS TABLE OF l_Self_Participant_Record INDEX BY BINARY_INTEGER;
  --18-AUG-2010 FLEXCUBE V.CL Release 7.7 VOL4 FS Tag03 CLP Participation Changes starts
  TYPE l_Silent_Participant_Record IS RECORD(
    Contract_Ref_No    Oltbs_Contract.Contract_Ref_No%TYPE,
    Counterparty       Lptbs_Contract_Master.Counterparty%TYPE,
    Product            Oltbs_Contract.Product_Code%TYPE,
    Ls_Branch          Oltbs_Contract.Branch%TYPE,
    Asset_Ratio        Lbtbs_Contract_Participant.Asset_Ratio%TYPE,
    Amount             Oltbs_Contract_Master.Amount%TYPE,
    Part_Esn           Oltbs_Contract_Event_Log.Event_Seq_No%TYPE,
    Wrapper_Event_Code Oltbs_Contract_Event_Log.Event_Code%TYPE,
    Operation          Lbtbs_Contract_Participant.Operation%TYPE);
  TYPE p_Rec_Silent_Participant IS TABLE OF l_Silent_Participant_Record INDEX BY BINARY_INTEGER;
  --18-AUG-2010 FLEXCUBE V.CL Release 7.7 VOL4 FS Tag03 CLP Participation Changes ends
  TYPE p_Rec_Linkages IS TABLE OF Oltbs_Upload_Linkages%ROWTYPE INDEX BY BINARY_INTEGER;
  l_Rec_Linkages p_Rec_Linkages;

  -- 25-Sep-2008 External Interface changes start here
  TYPE p_Rec_Exrate IS TABLE OF Oltbs_Upload_Exrate_Details%ROWTYPE INDEX BY BINARY_INTEGER;
  l_Rec_Exrate p_Rec_Exrate;
  -- 25-Sep-2008 External Interface changes end here

  --FCC V.CL Release 7.3 STP changes start
  FUNCTION Fn_Stp(p_Borr_Ref_No      IN Oltbs_Contract.Contract_Ref_No%TYPE,
                  p_Event_Seq_No     IN Oltbs_Contract_Event_Log.Event_Seq_No%TYPE,
                  p_Event_Code       IN Oltbs_Contract_Event_Log.Event_Code%TYPE,
                  p_Event_Value_Date IN DATE,
                  p_Err_Code         IN OUT VARCHAR2,
                  p_Err_Param        IN OUT VARCHAR2) RETURN BOOLEAN;
  --FCC V.CL Release 7.3 STP changes end

  FUNCTION Fn_Stp_Processing(p_Err_Code        IN OUT VARCHAR2,
                             p_Err_Param       IN OUT VARCHAR2,
                             p_Contract_Ref_No IN VARCHAR2 DEFAULT NULL --CITIUS-LS Till#5265
                            ,
                             p_Tranche_Ref_No  IN VARCHAR2 DEFAULT NULL --CITIUS-LS#6798
                            ,
                             p_Branch          IN Oltms_Branch.Branch_Code%TYPE DEFAULT NULL --12-DEC-2012 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO EURCITIPLC-GENERIC#13538 Changes
                             ) RETURN BOOLEAN;

  FUNCTION Fn_Stp_Handoff(p_Borr_Ref_No          IN Oltbs_Contract.Contract_Ref_No%TYPE,
                          p_Event_Seq_No         IN Oltbs_Contract_Event_Log.Event_Seq_No%TYPE,
                          p_Err_Code             IN OUT VARCHAR2,
                          p_Err_Param            IN OUT VARCHAR2,
                          p_Part_Contract_Ref_No IN VARCHAR2 DEFAULT 'ALL' -- 01-OCT-2008 FCC V.CL Release 7.4 STP, SFR#109
                          ) RETURN BOOLEAN;

  /*
  FUNCTION Fn_handoff
    (
    p_Borr_Ref_No IN oltbs_contract.Contract_Ref_No%TYPE,
    p_Borr_Esn IN oltbs_contract_event_log.Event_Seq_No%TYPE,
    p_Event_Code IN oltbs_contract_event_log.Event_Code%TYPE,
    p_Error_Code IN OUT VARCHAR2,
    p_Error_Params IN OUT VARCHAR2
    )
  RETURN BOOLEAN;
  
  FUNCTION Fn_handoff_Master
    (
    p_Borr_Ref_No IN oltbs_contract.Contract_Ref_No%TYPE,
    p_Borr_Esn IN oltbs_contract.Latest_Event_Seq_No%TYPE,
    l_r_rec_self_participant in p_rec_self_participant,--FCC V.CL Release 7.3 STP changes
    p_Error_Code IN OUT VARCHAR2,
    p_Error_Params IN OUT VARCHAR2
    )
  RETURN BOOLEAN;
  
  FUNCTION Fn_handoff_Fee
    (
    p_Borr_Ref_No IN oltbs_contract.Contract_Ref_No%TYPE,
    p_Borr_Esn IN oltbs_contract_event_log.Event_Seq_No%TYPE,
    l_rec_self_participant in p_rec_self_participant,--FCC V.CL Release 7.3 STP changes
    p_Error_Code IN OUT VARCHAR2,
    p_Error_Params IN OUT VARCHAR2
    )
  RETURN BOOLEAN;
  
  FUNCTION Fn_handoff_Mis
    (
    p_Borr_Ref_No IN oltbs_contract.Contract_Ref_No%TYPE,
    p_Borr_Esn IN oltbs_contract.Latest_Event_Seq_No%TYPE,
    l_rec_self_participant in p_rec_self_participant,--FCC V.CL Release 7.3 STP changes
    p_Error_Code IN OUT VARCHAR2,
    p_Error_Params IN OUT VARCHAR2
    )
  RETURN BOOLEAN;
  */

  /*FUNCTION Fn_Hoff_Charge
    (
    p_Borr_Ref_No oltbs_contract.Contract_Ref_No%TYPE,
    p_Borr_Esn oltbs_contract_event_log.Event_Seq_No%TYPE,
    p_Part_Ref_No oltbs_contract.Contract_Ref_No%TYPE,
    p_Error_Code IN OUT VARCHAR2,
    p_Error_Params IN OUT VARCHAR2
    )
  RETURN BOOLEAN;
  */

  /*
  FUNCTION Fn_handoff_Bulk_Insert
    (
    p_Borr_Ref_No   IN oltbs_contract.Contract_Ref_No%TYPE,
    p_Borr_Esn   IN oltbs_contract_event_log.Event_Seq_No%TYPE,
    p_Error_Code   IN OUT VARCHAR2, p_Error_Params IN OUT VARCHAR2
    )
  RETURN BOOLEAN;
  
  FUNCTION Fn_handoff_Amount_Due
    (
    p_borr_ref_no    IN oltbs_contract.contract_ref_no%type,
    p_borr_esn    IN oltbs_contract.latest_event_seq_no%type,
    p_event_code    IN oltbs_contract_event_log.event_code%type,
    l_rec_self_participant  IN p_rec_self_participant,
    p_value_date    date,--FCC V.CL RELEASE 7.3 STP CHANGES SFR#2
    p_Error_Code    IN OUT VARCHAR2,
    p_Error_Params    IN OUT VARCHAR2
    )
  RETURN BOOLEAN;
  
  FUNCTION Fn_handoff_fLiq
    (
    p_borr_ref_no    IN  oltbs_contract.contract_ref_no%type,
    p_borr_esn        IN   oltbs_contract.latest_event_seq_no%type,
    l_rec_self_participant  IN  p_rec_self_participant,
    p_Error_Code    IN OUT  VARCHAR2,
    p_Error_Params    IN OUT  VARCHAR2
    )
  
  RETURN BOOLEAN;
  
  FUNCTION Fn_handoff_fLiq_Summary
    (
    p_borr_ref_no    IN  oltbs_contract.contract_ref_no%type,
    p_borr_esn        IN   oltbs_contract.latest_event_seq_no%type,
    l_rec_self_participant  IN  p_rec_self_participant,
    p_Error_Code    IN OUT  VARCHAR2,
    p_Error_Params    IN OUT  VARCHAR2
    )
  
  RETURN BOOLEAN;
  
  FUNCTION Fn_Get_Self_Participant
    (
    p_borr_Contract_Ref_No    IN  oltbs_contract.Contract_Ref_No%TYPE,
    p_get_self_participant    OUT  p_rec_self_participant,
    p_value_date        IN date, --fcc v.cl release7.2 changes sfr#2
    p_Borr_Esn          IN  oltbs_contract_event_log.event_seq_no%TYPE,--fcc v.cl release7.2 changes sfr#2
    p_Error_Code        IN OUT  VARCHAR2,
    p_Error_Params        IN OUT  VARCHAR2
    )
  RETURN BOOLEAN;
  
  FUNCTION fn_handoff_interest
    (
    p_borr_ref_no     IN  oltbs_contract.contract_ref_no%TYPE,
    p_borr_esn     IN  oltbs_contract_event_log.event_seq_no%TYPE,
    l_r_rec_self_participant IN   p_rec_self_participant,--p_part_ref_no  oltbs_contract.contract_ref_no%TYPE,--FCC V.CL Release 7.3 STP changes
    p_error_code     IN OUT VARCHAR2,
    p_error_params     IN OUT VARCHAR2
    )
  RETURN BOOLEAN;
  
  FUNCTION fn_handoff_linkages
    (
    p_borr_ref_no     IN   oltbs_contract.contract_ref_no%type,
    p_borr_esn     IN   oltbs_contract.latest_event_seq_no%type,
    l_r_rec_self_participant IN  p_rec_self_participant,--FCC V.CL Release 7.3 STP changes
    p_err_code     IN OUT   varchar2,
    p_err_params       IN OUT   varchar2
    )
  RETURN BOOLEAN;
  
  FUNCTION fn_handoff_liqd
    (
    p_borr_ref_no    IN  oltbs_contract.contract_ref_no%type,
    p_borr_esn        IN   oltbs_contract.latest_event_seq_no%type,
    l_rec_self_participant IN   p_rec_self_participant,--p_part_ref_no  oltbs_contract.contract_ref_no%TYPE,--FCC V.CL Release 7.3 STP changes
    p_Error_Code    IN OUT  VARCHAR2,
    p_Error_Params    IN OUT  VARCHAR2
    )
  RETURN BOOLEAN;
  
  
  FUNCTION Fn_handoff_Liqd_Summary
    (
    p_borr_ref_no    IN  oltbs_contract.contract_ref_no%type,
    p_borr_esn        IN   oltbs_contract.latest_event_seq_no%type,
    l_rec_self_participant IN   p_rec_self_participant,--p_part_ref_no  oltbs_contract.contract_ref_no%TYPE,--FCC V.CL Release 7.3 STP changes
    p_Error_Code     IN OUT VARCHAR2,
    p_Error_Params     IN OUT VARCHAR2
    )
  RETURN BOOLEAN;
  
  
  FUNCTION Fn_handoff_Amend_Due
    (
      p_borr_ref_no     IN oltbs_contract.contract_ref_no%type,
      p_borr_esn     IN oltbs_contract.latest_event_seq_no%type,
      l_rec_self_participant  IN p_rec_self_participant,
      p_Error_Code     IN OUT VARCHAR2,
      p_Error_Params     IN OUT VARCHAR2
    )
  RETURN BOOLEAN;
  */
  FUNCTION Fn_Update_Browser(p_Borr_Ref_No       IN Oltbs_Contract.Contract_Ref_No%TYPE,
                             p_Borr_Esn          IN Oltbs_Contract_Event_Log.Event_Seq_No%TYPE,
                             p_Part_Ref_No       IN Oltbs_Contract.Contract_Ref_No%TYPE,
                             p_Ld_Ref_No         IN Oltbs_Contract.Contract_Ref_No%TYPE,
                             p_Ld_Esn            IN Oltbs_Contract_Event_Log.Event_Seq_No%TYPE,
                             p_Ld_Event_Code     IN Oltbs_Contract_Event_Log.Event_Code%TYPE,
                             p_Processing_Status IN Lbtbs_Stp_Interface_Browser.Processing_Status%TYPE,
                             p_Err_Code          IN OUT VARCHAR2,
                             p_Err_Param         IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --15-SEP-2010 FLEXCUBE V.CL Release 7.7 ITR2 SFR#01 changes,Wrapper rehandoff related changes starts
  FUNCTION Fn_Wrapper_Handoff_Rerun(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                    p_Event_Seq_No    IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                                    p_Error_Code      IN OUT VARCHAR2,
                                    p_Error_Params    IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --15-SEP-2010 FLEXCUBE V.CL Release 7.7 ITR2 SFR#01 changes,Wrapper rehandoff related changes ends

  PROCEDURE Pr_Log_Error(p_Borr_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                         p_Part_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                         p_Part_Esn    IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                         p_Err_Code    IN VARCHAR2,
                         p_Ora_Err     IN VARCHAR2 DEFAULT NULL,
                         p_Ora_Param   IN VARCHAR2 DEFAULT NULL);
	--OBCL_14.4_SUPP_#32411440 Changes starts    
  PROCEDURE Pr_Delete_Error(p_Borr_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                         p_Part_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                         p_Part_Esn    IN Oltbs_Contract.Latest_Event_Seq_No%TYPE default NULL,
                         p_Ora_Err     IN VARCHAR2 DEFAULT NULL,
                         p_Ora_Param   IN VARCHAR2 DEFAULT NULL); 
	--OBCL_14.4_SUPP_#32411440 Changes ends						 
  --18-AUG-2010 FLEXCUBE V.CL Release 7.7 VOL4 FS Tag03 CLP Participation Changes starts
  FUNCTION Fn_Delete_Wrapper_Handoff(p_Agency_Ref_No       IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                     p_Agency_Event_Seq_No IN Oltbs_Contract_Event_Log.Event_Seq_No%TYPE,
                                     p_Source_Code         IN Oltbs_Ext_Contract_Stat.Source%TYPE,
                                     p_Error_Code          IN OUT VARCHAR2,
                                     p_Error_Params        IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Populate_Silent_Participant(p_Borr_Contract_Ref_No        IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                          p_Populate_Silent_Participant OUT p_Rec_Silent_Participant,
                                          p_Value_Date                  IN DATE,
                                          p_Borr_Esn                    IN Oltbs_Contract_Event_Log.Event_Seq_No%TYPE,
                                          p_Error_Code                  IN OUT VARCHAR2,
                                          p_Error_Params                IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Wrapper_Processing(p_Err_Code        IN OUT VARCHAR2,
                                 p_Err_Param       IN OUT VARCHAR2,
                                 p_Branch          IN Oltms_Branch.Branch_Code%TYPE, --29-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10272 Changes
                                 p_Contract_Ref_No IN VARCHAR2 DEFAULT NULL,
                                 p_Tranche_Ref_No  IN VARCHAR2 DEFAULT NULL)
    RETURN BOOLEAN;

  FUNCTION Fn_Wrapper(p_Agency_Ref_No    IN Oltbs_Contract.Contract_Ref_No%TYPE,
                      p_Event_Seq_No     IN Oltbs_Contract_Event_Log.Event_Seq_No%TYPE,
                      p_Event_Code       IN Oltbs_Contract_Event_Log.Event_Code%TYPE,
                      p_Event_Value_Date IN DATE,
                      p_Err_Code         IN OUT VARCHAR2,
                      p_Err_Param        IN OUT VARCHAR2) RETURN BOOLEAN;

  PROCEDURE Pr_Wrapper_Job(p_Branch IN Oltms_Branch.Branch_Code%TYPE);

  FUNCTION Fn_Update_Wrapper_Browser(p_Agency_Ref_No      IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                     p_Agency_Esn         IN Oltbs_Contract_Event_Log.Event_Seq_No%TYPE,
                                     p_Wrapper_Ref_No     IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                     p_Wrapper_Esn        IN Oltbs_Contract_Event_Log.Event_Seq_No%TYPE,
                                     p_Wrapper_Event_Code IN Oltbs_Contract_Event_Log.Event_Code%TYPE,
                                     p_Processing_Status  IN Lbtbs_Stp_Interface_Browser.Processing_Status%TYPE,
                                     p_Err_Code           IN OUT VARCHAR2,
                                     p_Err_Param          IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Insert_Wrapper_Browser(p_Borr_Ref_No            IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                     p_Borr_Esn               IN Oltbs_Contract_Event_Log.Event_Seq_No%TYPE,
                                     p_Event_Code             IN Oltbs_Contract_Event_Log.Event_Code%TYPE,
                                     l_Rec_Silent_Participant IN p_Rec_Silent_Participant,
                                     p_Event_Value_Date       IN DATE,
                                     p_Proc_Stat              IN CHAR,
                                     p_Error_Code             IN OUT VARCHAR2,
                                     p_Error_Params           IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Handoff_Wrapper(p_Contract_Ref_No        IN Oltbs_Contract.Contract_Ref_No%TYPE,
                              p_Event_Value_Date       IN DATE,
                              l_Rec_Silent_Participant IN p_Rec_Silent_Participant,
                              p_Event_Seq_No           IN Oltbs_Contract_Event_Log.Event_Seq_No%TYPE,
                              p_Event_Code             IN Oltbs_Contract_Event_Log.Event_Code%TYPE,
                              p_Error_Code             IN OUT VARCHAR2,
                              p_Error_Param            IN OUT VARCHAR2,
                              p_Trade_Ref_No           IN Oltbs_Contract.Contract_Ref_No%TYPE DEFAULT NULL)
    RETURN BOOLEAN;

  FUNCTION Fn_Wrapper_Handoff(p_Borr_Ref_No  IN Oltbs_Contract.Contract_Ref_No%TYPE,
                              p_Event_Seq_No IN Oltbs_Contract_Event_Log.Event_Seq_No%TYPE,
                              p_Err_Code     IN OUT VARCHAR2,
                              p_Err_Param    IN OUT VARCHAR2,
                              p_Trade_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE DEFAULT NULL)
    RETURN BOOLEAN;

  FUNCTION Fn_Validate_Wrapper_Position(p_Agency_Ref_No      IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                        p_Agency_Part_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                        p_Wrapper_Ref_No     IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                        p_Silent_Participant IN Lbtbs_Contract_Participant.Participant%TYPE,
                                        p_Agency_Asset_Ratio IN Lbtbs_Contract_Participant.Asset_Ratio%TYPE,
                                        p_Event_Value_Date   IN DATE, --29-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10594
                                        p_Error_Code         IN OUT VARCHAR2,
                                        p_Error_Parameter    IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --18-AUG-2010 FLEXCUBE V.CL Release 7.7 VOL4 FS Tag03 CLP Participation Changes ends
  /*FUNCTION fn_cashflow_validation
      (
      p_borr_ref_no    in oltbs_contract.contract_ref_no%type,
      p_self_ref_no    in oltbs_contract.contract_ref_no%type,
      p_borr_esn    in oltbs_contract.latest_event_seq_no%type,
      p_ld_ref_no    in oltbs_contract.contract_ref_no%type,
      p_value_date    in lptbs_contract_master.value_date%type,
      p_event_code    in oltbs_contract.curr_event_code%type,
      p_event_amount    in out number,
      p_ls_component    out varchar2,
      p_err_code     IN OUT VARCHAR2,
      p_err_params     IN OUT VARCHAR2
      )
  RETURN BOOLEAN;
  FUNCTION fn_repop_amount_due
      (
      p_contract_ref_no   IN oltbs_amount_due_upload.ext_contract_ref_no%TYPE,
      p_self_part_ref_no  IN oltbs_amount_due_upload.ext_contract_ref_no%TYPE,
      p_value_date     IN oltbs_amount_due_upload.due_date%TYPE,
      p_err_code     IN OUT VARCHAR2,
      p_err_params     IN OUT VARCHAR2
      )
  RETURN BOOLEAN;*/
  PROCEDURE Pr_Append_Errlist(Perrorcode   IN VARCHAR2,
                              Perrorparams IN VARCHAR2);

  FUNCTION Fn_Handoff_Rerun(p_Contract_Ref_No      IN Oltbs_Contract.Contract_Ref_No%TYPE,
                            p_Event_Seq_No         IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                            p_Part_Contract_Ref_No IN VARCHAR2, -- 03-OCT-2008 FCC V.CL Release 7.4 STP, SFR#109
                            p_Error_Code           IN OUT VARCHAR2,
                            p_Error_Params         IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Vami_For_Self_Participant(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                        p_Proc_Date       IN DATE,
                                        --p_prod    IN  oltms_product.product_code%TYPE,
                                        p_Err_Code  IN OUT NOCOPY VARCHAR2,
                                        p_Err_Param IN OUT NOCOPY VARCHAR2)
    RETURN BOOLEAN;

  --FCC V.CL release 7.3 stp changes sfr#2
  FUNCTION Fn_Insert_Browser(p_Borr_Ref_No            IN Oltbs_Contract.Contract_Ref_No%TYPE,
                             p_Borr_Esn               IN Oltbs_Contract_Event_Log.Event_Seq_No%TYPE,
                             p_Event_Code             IN Oltbs_Contract_Event_Log.Event_Code%TYPE,
                             l_r_Rec_Self_Participant IN p_Rec_Self_Participant,
                             p_Event_Value_Date       IN DATE,
                             p_Proc_Stat              IN CHAR,
                             p_Error_Code             IN OUT VARCHAR2,
                             p_Error_Params           IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --FCC V.CL release 7.3 stp changes sfr#2

  FUNCTION Fn_Upload_For_Rtch(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                              p_Ld_Ref_No       IN Oltbs_Contract.Contract_Ref_No%TYPE,
                              p_Event_Code      IN Oltbs_Contract.Curr_Event_Code%TYPE,
                              p_Esn             IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                              p_Err_Code        IN OUT VARCHAR2,
                              p_Err_Params      IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Check_Self_Participant(p_Contract_Ref_No  IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                     p_Self_Part_Exists OUT CHAR,
                                     p_Error_Code       IN OUT VARCHAR2,
                                     p_Error_Params     IN OUT VARCHAR2)
    RETURN BOOLEAN;

  --FLEXCUBE V.CL Release 7.3 ITR2 SFR#91 25-dec-2007 added the spc of fn_pop_history Starts
  FUNCTION Fn_Pop_History(p_Branch       IN Oltbs_Contract.Branch%TYPE,
                          p_Error_Code   IN OUT VARCHAR2,
                          p_Error_Params IN OUT VARCHAR2) RETURN BOOLEAN;
  --FLEXCUBE V.CL Release 7.3 ITR2 SFR#91 25-dec-2007 added the spc of fn_pop_history Ends

  PROCEDURE Pr_Stp_Job(p_Branch IN Oltms_Branch.Branch_Code%TYPE);

  FUNCTION Fn_Get_Upload_Participant(p_Borr_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                     p_Get_Self_Participant OUT p_Rec_Self_Participant,
                                     p_Value_Date           IN DATE,
                                     p_Borr_Esn             IN Oltbs_Contract_Event_Log.Event_Seq_No%TYPE,
                                     p_Error_Code           IN OUT VARCHAR2,
                                     p_Error_Params         IN OUT VARCHAR)
    RETURN BOOLEAN;
  --FLEXCUBE V.CL Release 7.4 RT fixes Starts
  FUNCTION Fn_Update_Reprocess_Stat(p_Part_Ref_No    IN Lbtbs_Stp_Interface_Browser.Part_Ref_No%TYPE,
                                    p_Borr_Ref_No    IN Lbtbs_Stp_Interface_Browser.Borr_Ref_No%TYPE,
                                    p_Borr_Esn       IN Lbtbs_Stp_Interface_Browser.Borr_Esn%TYPE,
                                    p_Interface_Type IN Lbtbs_Stp_Interface_Browser.Interface_Type%TYPE,
                                    p_Err_Code       OUT VARCHAR2,
                                    p_Err_Param      OUT VARCHAR2)
    RETURN BOOLEAN;
  --FLEXCUBE V.CL Release 7.4 RT fixes Ends
  --28-jul-2008 FCC V.CL Release 7.4 STP browser changes start
  FUNCTION Fn_Update_Ldtb_Reprocess_Stat(p_Part_Ref_No    IN Oltbs_Stp_Job_Browser.Part_Ref_No%TYPE,
                                         p_Borr_Ref_No    IN Oltbs_Stp_Job_Browser.Borr_Ref_No%TYPE,
                                         p_Borr_Esn       IN Oltbs_Stp_Job_Browser.Borr_Esn%TYPE,
                                         p_Interface_Type IN Oltbs_Stp_Job_Browser.Interface_Type%TYPE,
                                         p_Err_Code       OUT VARCHAR2,
                                         p_Err_Param      OUT VARCHAR2)
    RETURN BOOLEAN;
  --28-jul-2008 FCC V.CL Release 7.4 STP browser changes ends
  --11-Aug-2008  FCC V.CL Release 7.4  STP   Camd,Famd upload START
  FUNCTION Fn_Stp_Camd_Famd_Upload(p_Borr_Ref_No      IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                   p_Event_Seq_No     IN Oltbs_Contract_Event_Log.Event_Seq_No%TYPE,
                                   p_Event_Code       IN Oltbs_Contract_Event_Log.Event_Code%TYPE,
                                   p_Self_Participant IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                   p_Event_Value_Date IN DATE,
                                   p_Err_Code         IN OUT VARCHAR2,
                                   p_Err_Param        IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --11-Aug-2008  FCC V.CL Release 7.4  STP   Camd,Famd upload ENDS

  --CITIUS-LS#5307 Starts..
  FUNCTION Fn_Propagate_Details(p_Contract_Ref_No  IN Oltbs_Amount_Due_Upload.Ext_Contract_Ref_No%TYPE,
                                p_Self_Part_Ref_No IN Oltbs_Amount_Due_Upload.Ext_Contract_Ref_No%TYPE,
                                p_Borr_Ref_No      IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                p_Value_Date       IN Oltbs_Amount_Due_Upload.Due_Date%TYPE,
                                p_Err_Code         IN OUT VARCHAR2,
                                p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --CITIUS-LS#5307 Ends
  --CITIUS-LS Till#5265 Starts
  FUNCTION Fn_Validate_Position(p_Ld_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                p_Borrower_Ref_No    IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                p_Part_Ref_No        IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                p_Participant        IN Lbtbs_Contract_Participant.Participant%TYPE,
                                p_Error_Code         IN OUT VARCHAR2,
                                p_Error_Parameter    IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --CITIUS-LS Till#5265 Ends
  -- CITIUS-LS Till#5395 Starts
  FUNCTION Fn_Continue_Processing(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                  p_Part_Ref_No     IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                  p_Event_Code      IN Oltbs_Contract_Event_Log.Event_Code%TYPE,
                                  p_Borr_Esn        IN Oltbs_Contract_Event_Log.Event_Seq_No%TYPE,
                                  p_Part_Esn        IN Oltbs_Contract_Event_Log.Event_Seq_No%TYPE --27-JAN-2009 FLEXCUBE V.CL Release 7.4 ITR1 SFR#46, <27-Jan-2009> changes here
                                  ) RETURN BOOLEAN;
  -- CITIUS-LS Till#5395 ends

  --CITIUS-LS#5846 Starts
  FUNCTION Fn_Get_Ld_Prod_Exp(p_Borr_Ref_No         IN Oltbs_Contract.Contract_Ref_No%TYPE,
                              p_Ls_Branch           IN Oltm_Branch.Branch_Code%TYPE,
                              p_Ls_Product          IN Oltms_Product.Product_Code%TYPE,
                              p_Self_Participant    IN Tltms_Position_Identifier.Position_Identifier%TYPE,
                              p_Ld_Branch           IN Oltm_Branch.Branch_Code%TYPE,
                              p_Trade_Standard      IN Lbtb_Contract_Participant.Lma_Participation%TYPE, --OBCL_14.4#SLT Sub Participation Chages added
                              p_Flag                IN CHAR,
                              p_Product_Mapping_Rec OUT Lbtms_Stp_Product_Mapping%ROWTYPE,
                              p_Exp_Code            OUT VARCHAR2,
                              p_Err_Code            OUT VARCHAR2,
                              p_Err_Param           OUT VARCHAR2)
    RETURN BOOLEAN;
  --11-DEC-2008 FCC V.CL Release 7.4 SLT Starts

  FUNCTION Fn_Get_Self_Participant(p_Borr_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                   p_Get_Self_Participant OUT p_Rec_Self_Participant,
                                   p_Value_Date           IN DATE,
                                   p_Borr_Esn             IN Oltbs_Contract_Event_Log.Event_Seq_No%TYPE,
                                   p_Error_Code           IN OUT VARCHAR2,
                                   p_Error_Params         IN OUT VARCHAR2,
                                   p_Part_Contract_Ref_No IN VARCHAR2 DEFAULT 'ALL' -- 01-OCT-2008 FCC V.CL Release 7.4 STP, SFR#109
                                   ) RETURN BOOLEAN;

  -- 11-DEC-2008 FCC V.CL Release 7.4 SLT Ends
  --CITIUS-LS#5846 Ends
  --CITIUS-LS#6686 Changes starts
  FUNCTION Fn_Validate_Position(p_Ld_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                p_Borrower_Ref_No    IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                p_Part_Ref_No        IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                p_Participant        IN Lbtbs_Contract_Participant.Participant%TYPE,
                                p_Event_Code         IN Oltbs_Contract.Curr_Event_Code%TYPE,
                                p_Borr_Esn           IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                                p_Error_Code         IN OUT VARCHAR2,
                                p_Error_Parameter    IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --CITIUS-LS#6686 Changes ends
  --CITIUS-LS#6755 Starts
  FUNCTION Fn_Handoff_Auto_Vami(p_Borr_Ref_No  IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                p_Borr_Esn     IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                                p_Participant  IN Oltbs_Contract.Counterparty%TYPE,
                                p_Event_Code   IN Oltbs_Contract.Curr_Event_Code%TYPE,
                                p_Error_Code   IN OUT VARCHAR2,
                                p_Error_Params IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --CITIUS-LS#6755 ends

  --CITIUS-LS#6798 Starts
  FUNCTION Fn_Init_For_Rollchild_Stp(p_Branch          IN Oltbs_Contract.Branch%TYPE,
                                     p_Seq_No          IN NUMBER,
                                     p_Process_Code    IN VARCHAR2,
                                     p_Processing_Date IN DATE,
                                     p_Error_Code      IN OUT VARCHAR2,
                                     p_Error_Param     IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --CITIUS-LS#6798 Ends
  --CITIUS-LS#6926 starts
  FUNCTION Fn_Retake_Data_Store(p_Ref_No    IN VARCHAR2,
                                p_Esn       IN NUMBER,
                                p_Err_Code  OUT VARCHAR2,
                                p_Err_Param OUT VARCHAR2) RETURN BOOLEAN;
  --CITIUS-LS#6926 ends
  --CITIUS-LS#6972 start
  FUNCTION Fn_Validate_Position_Reprop(p_Ld_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                       p_Borrower_Ref_No    IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                       p_Part_Ref_No        IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                       p_Participant        IN Lbtbs_Contract_Participant.Participant%TYPE,
                                       p_Error_Code         IN OUT VARCHAR2,
                                       p_Error_Parameter    IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Propagate_Details(p_Contract_Ref_No  IN Oltbs_Amount_Due_Upload.Ext_Contract_Ref_No%TYPE,
                                p_Self_Part_Ref_No IN Oltbs_Amount_Due_Upload.Ext_Contract_Ref_No%TYPE,
                                p_Borr_Ref_No      IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                p_Value_Date       IN Oltbs_Amount_Due_Upload.Due_Date%TYPE,
                                p_Validate         IN VARCHAR2,
                                p_Err_Code         IN OUT VARCHAR2,
                                p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --CITIUS-LS#6972 end
  --08-SEP-2010 FLEXCUBE V.CL Release 7.7 ITR1 SFR#67 starts
  FUNCTION Fn_Check_Wrapper_Exist(p_User_Ref_No     IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                  p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE)
    RETURN BOOLEAN;
  --08-SEP-2010 FLEXCUBE V.CL Release 7.7 ITR1 SFR#67 ends
  --FLEXCUBE V.CL Release 7.6  CITIUS-LS#7165 STARTS
  FUNCTION Fn_Get_Ld_Component(p_Borr_Ref_No      IN Oltbs_Contract.Contract_Ref_No%TYPE,
                               p_Self_Participant IN Lbtms_Self_Participant.Self_Participant%TYPE,
                               p_Ls_Component     IN Lbtms_Stp_Component_Mapping.Ls_Component%TYPE,
                               p_Ld_Product       IN Oltms_Product.Product_Code%TYPE,
                               p_Ld_Branch        IN Oltm_Branch.Branch_Code%TYPE,
                               p_Trade_Standard   IN Lbtb_Contract_Participant.Lma_Participation%TYPE, --OBCL_14.4#SLT Sub Participation Chages added
                               p_Ld_Component     OUT Lbtms_Stp_Component_Mapping.Ld_Component%TYPE,
                               p_Err_Code         OUT VARCHAR2,
                               p_Err_Param        OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Get_Ld_Product(p_Borr_Ref_No      IN Oltbs_Contract.Contract_Ref_No%TYPE,
                             p_Ls_Branch        IN Oltm_Branch.Branch_Code%TYPE,
                             p_Ls_Product       IN Oltms_Product.Product_Code%TYPE,
                             p_Self_Participant IN Tltms_Position_Identifier.Position_Identifier%TYPE,
                             p_Ld_Branch        IN Oltm_Branch.Branch_Code%TYPE,
                             p_Trade_Standard   IN Lbtb_Contract_Participant.Lma_Participation%TYPE, --OBCL_14.4#SLT Sub Participation Chages added
                             p_Ld_Product       OUT Oltms_Product.Product_Code%TYPE,
                             p_Err_Code         OUT VARCHAR2,
                             p_Err_Param        OUT VARCHAR2) RETURN BOOLEAN;
  --FLEXCUBE V.CL Release 7.6  CITIUS-LS#7165 ENDS

  g_Populate_Store_Table VARCHAR2(1); --28-OCT-2009 CITIUS-LS TILL#6509 (JIRA 150080-1301)
  PROCEDURE Pr_Set_g_Populate_Store_Table(p_Value VARCHAR2); --28-OCT-2009 CITIUS-LS TILL#6509 (JIRA 150080-1301)

  --14-AUG-2010 FLEXCUBE V.CL Release 7.7 Retro, CITIUS Till#7328 start
  FUNCTION Fn_Adjust_Maturity_Schedule(p_Contract_Ref_No IN Oltbs_Amount_Due_Upload.Ext_Contract_Ref_No%TYPE,
                                       p_Err_Code        IN OUT VARCHAR2,
                                       p_Err_Params      IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --14-AUG-2010 FLEXCUBE V.CL Release 7.7 Retro, CITIUS Till#7328 end

  --03-JUN-2011 Flexcube V.CL Release 7.9, CITIUS Retro, TILL#7571,Starts
  FUNCTION Fn_Check_Orig_Participant(p_Contract_Ref_No  IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                     p_Self_Part_Exists OUT CHAR,
                                     p_Error_Code       IN OUT VARCHAR2,
                                     p_Error_Params     IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --03-JUN-2011 Flexcube V.CL Release 7.9, CITIUS Retro, TILL#7571,Ends

  PROCEDURE Pr_Stp_Auto_Process; --07-SEP-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#9806 changes here
  PROCEDURE Pr_Set_Value_Date_Availabilty(p_Val_Date_Availabilty IN VARCHAR2); --23-AUG-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag10 change
  --18-DEC-2012 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#15615 Changes start here
  FUNCTION Fn_Ccc_Department_Check(p_Department IN Oltms_Department.Department_Code%TYPE)
    RETURN BOOLEAN;
  --OBCL_12.5_STP_UDF_CHANGES start
  FUNCTION Fn_Update_Ld_Udf(p_Borr_Ref_No      IN Oltbs_Contract.Contract_Ref_No%TYPE,
                            p_Self_Participant IN Oltbs_Contract.Contract_Ref_No%TYPE,
                            p_Contract_Ref_No  IN Oltbs_Contract.Contract_Ref_No%TYPE,
                            p_Version_No       IN NUMBER,
                            p_Error_Code       IN OUT VARCHAR2,
                            p_Error_Params     IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --OBCL_12.5_STP_UDF_CHANGES end
  --OBCL_14.0__ACC_COLLETRAL_LINK changes start
  FUNCTION Fn_Upload_Acc_Colletral_Link(p_Borr_Ref_No          IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                        p_Borr_Esn             IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                                        p_Rec_Self_Participant IN p_Rec_Self_Participant,
                                        p_Event_Date           IN DATE,
                                        p_Error_Code           IN OUT VARCHAR2,
                                        p_Error_Params         IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --OBCL_14.0__ACC_COLLETRAL_LINK changes end
  --OBCL_14.0__ACC_COLLETRAL_LINK changes start
  FUNCTION Fn_Update_Acc_Colletral_Link(Psourcecode        IN Oltbs_Upload_Acc_Coll_Link_Dtl.Source_Code%TYPE,
                                        p_Borr_Ref_No      IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                        Pextrefno          IN Oltbs_Upload_Master.Ext_Contract_Ref_No%TYPE,
                                        Pcontractrefno     IN Oltbs_Upload_Master.Ext_Contract_Ref_No%TYPE,
                                        Plbcontractversion IN Oltbs_Contract.Latest_Version_No%TYPE,
                                        Polcontractversion IN Oltbs_Contract.Latest_Version_No%TYPE,
                                        p_Branch_Code      IN Oltb_Acc_Coll_Link_Dtls.Branch_Code%TYPE,
                                        p_Error_Code       IN OUT VARCHAR2,
                                        p_Error_Params     IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --OBCL_14.0__ACC_COLLETRAL_LINK changes end
  --bug 27960385 start
  FUNCTION Fn_Update_Dd_Tranche_Elblockref(Psourcecode    IN Oltbs_Upload_Acc_Coll_Link_Dtl.Source_Code%TYPE,
                                           p_Borr_Ref_No  IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                           p_Error_Code   IN OUT VARCHAR2,
                                           p_Error_Params IN OUT VARCHAR2,
                                           p_Event_Code   IN Oltbs_Contract_Event_Log.Event_Code%TYPE DEFAULT 'XXXX')
    RETURN BOOLEAN;
  --bug 27960385 end
  --OBCL_14.1_LS-ELCM_BLOCKREFNO changes start
  FUNCTION Fn_Upload_Blockref_Colletral_Link(Psourcecode            IN Oltbs_Upload_Acc_Coll_Link_Dtl.Source_Code%TYPE,
                                             p_Borr_Ref_No          IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                             p_Borr_Esn             IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                                             p_Rec_Self_Participant IN p_Rec_Self_Participant,
                                             p_Branch_Code          IN Oltbs_Upload_Acc_Coll_Link_Dtl.Branch_Code%TYPE,
                                             p_Borr_Version         IN Oltbs_Contract.Latest_Version_No%TYPE,
                                             p_Error_Code           IN OUT VARCHAR2,
                                             p_Error_Params         IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Update_Blockref_Colletral_Link(Psourcecode        IN Oltbs_Upload_Acc_Coll_Link_Dtl.Source_Code%TYPE,
                                             p_Borr_Ref_No      IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                             Pextrefno          IN Oltbs_Upload_Master.Ext_Contract_Ref_No%TYPE,
                                             Pcontractrefno     IN Oltbs_Upload_Master.Ext_Contract_Ref_No%TYPE,
                                             Plbcontractversion IN Oltbs_Contract.Latest_Version_No%TYPE,
                                             Polcontractversion IN Oltbs_Contract.Latest_Version_No%TYPE,
                                             p_Branch_Code      IN Oltb_Acc_Coll_Link_Dtls.Branch_Code%TYPE,
                                             p_Error_Code       IN OUT VARCHAR2,
                                             p_Error_Params     IN OUT VARCHAR2,
                                             p_Event_Code       IN Oltbs_Contract_Event_Log.Event_Code%TYPE DEFAULT 'XXXX',
                                             p_Linked_Reference_No        IN Oltb_Acc_Coll_Link_Dtls.Linked_Reference_No%TYPE DEFAULT NULL) --Bug#34445827_1
    RETURN BOOLEAN;
  --OBCL_14.1_LS-ELCM_BLOCKREFNO changes end
  --OBCL_14.1_PRAM_DD_Case
  FUNCTION Fn_Update_Dd_Pram_Elblockref(Psourcecode    IN Oltbs_Upload_Acc_Coll_Link_Dtl.Source_Code%TYPE,
                                        p_Borr_Ref_No  IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                        p_Error_Code   IN OUT VARCHAR2,
                                        p_Error_Params IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --OBCL_14.1_PRAM_DD_Case

--18-DEC-2012 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#15615 Changes end here
--OBCL_14.5_Consol_Roll start
FUNCTION Fn_Take_Data_Store_rfr(
                                p_processing_event OLTB_RFR_INTEREST_MASTER.processing_event%type,
								p_Borr_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                p_Borr_Esn    IN Oltbs_Contract.Latest_Event_Seq_No%TYPE, --Activity Seq
								p_borr_event_seq_no  IN Oltbs_Contract.Latest_Event_Seq_No%TYPE, --Actual Borr Seqno.
								P_borr_event oltbs_stp_job_browser.ls_event_code%Type,
                                p_Part_Contract_Ref_No  IN Lptbs_Contract_Master.Contract_Ref_No%TYPE,
								p_value_date oltb_contract_master.value_date%type,
								p_Err_Code    OUT VARCHAR2,
                                p_Err_Param   OUT VARCHAR2) RETURN BOOLEAN;
								
-- Bug#33537872 changes start
 FUNCTION Fn_Upload_For_Revc(p_Contract_Ref_No  IN Oltbs_Contract.Contract_Ref_No%TYPE,
                              p_Error_Code       IN OUT VARCHAR2,
                              p_Error_Params     IN OUT VARCHAR2)
RETURN BOOLEAN;
-- Bug#33537872 changes end

PROCEDURE Pr_fwd_Job(p_Branch IN Oltms_Branch.Branch_Code%TYPE);  --obcl_14.6_rabo_#35004685 changes                             


END Lbpks_Stp_Interface;
--OBCL_14.5_Consol_Roll end
/
CREATE OR REPLACE Synonym Lbpkss_Stp_Interface FOR Lbpks_Stp_Interface
/