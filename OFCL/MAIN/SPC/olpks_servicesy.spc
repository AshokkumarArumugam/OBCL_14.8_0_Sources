CREATE OR REPLACE PACKAGE Olpks_Servicesy IS
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_servicesy.SPC
  **
  ** Module : LOANS and DEPOSITS
  **
    This source is part of the Oracle Banking Corporate Lending  Software Product.
    Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.
    No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.
  
    Oracle Financial Services Software Limited.
    Oracle Park, Off Western Express Highway,
    Goregaon (East),
    Mumbai - 400 063, India.
  ----------------------------------------------------------------------------------------------------
  */

  /*
  CHANGE_HISTORY
  
  14-MAY-2002 FCC4.0 JUNE 2002 PLNCITI TIL #3476  Added a new function fn_delete_beforeauth to take care of
             deletion of a/c entries during save so that the sessions will notget locked..Bsk
  
  11-Oct-2002 FCC 4.1 Oct-2002 STAT1 SFR 53   Loans Status Accounting Changes.
                  Copy of product does not copy status
  27-APR-2003 FCC 4.2 OPS Changes ITR2 SFR 8 Added a function to fn_validate_sch_gap_days validate schedule gap days
  
  14-May-2003 Fcc4.2 OPS related changes..The settlement message generation of forward dated payments is done through SGEN.
                  So when Fn_authorise is called from the forward dated payment batch then                    Settlement messages has to be suppressed..
  
  23-MAY-2003 FCC 4.2 OPS focus testing SFR 72 changes
  31-Mar-2008 FLEXCUBE V.CL Release 7.4 Customer changes  ADDED function FN_CUSTCHANGE_REVERSAL
        which reverses the accounting entries for the old customer and repost the entries for new customer
  08-MAY-2008 FLEXCUBE V.CL Release 7.4 BAU changes for Watch List functionality - A new function Fn_Watch_List_Customer is added -banu.
  
  -------------------------------------------------------------------------------------
  --14-OCT-2008 FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-CITIUPG73100263
  06-Jun-2008 FLEXCUBE V.CL Release 7.4 BAU MM Intellect Interface changes by Aji
      Added a new procedure pr_populate_imm_handoff
  06-NOV-2008 CITIUS-LS#SRT1451 PLC46020129,STP Consolidation,By Swapnasish,Overloaded the function fn_check_liqd_tenor to include the primary key as the parameters
              rather than passing the record type varible
  
  -------------------------------------------------------------------------------------
  19-MAR-2009 FLEXCUBE V.CL Release 7.5 EURCITIPLC lot1 ITR1 SFR#11 RETRO#CITIUPG73100416 Intellect interface - Archiving.
  21-MAY-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag 15 Retain Main Comp, added the procedure pr_propagate_main_comp
  in olpks_servicesy to maintain the same interest XXLIMITS of main interest component to retain main component.
  
  01-Jun-2009 FLEXCUBE V.CL Release 7.5 lot2 ITR1 SFR#12 , accrual changes during overpayment
  09-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION, 12-MAY-2009 CITIUS-LS#5721 Change :  To show override and dual authorization if settlement information gets changed than default
            value maintained at SSI mnemonic level
  09-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION,15-AUG-2009 CITIUS-LS#6198 Adding fn_pop_contract_event_detail.
  22-FEB-2010 FLEXCUBE V.CL 7.6, PBG Site-Retro,CITIPBG TILL#490 Changes done to validate user ref no for particular branch.
  08-Mar-2011 Flexcube V.CL Release 7.9, Cost of Credit Changes,, Batch Changes, Added new functions
  06-APR-2011 Flexcube V.CL Release 7.9, Cost of Credit Changes, Added new function to get COC valuation reqd flag.
  19-MAY-2011 Flexcube V.CL Release 7.9, Cost of Credit Changes, Handled today liquidated contracts for CoC valuation
  25-MAY-2011 Flexcube V.CL Release 7.9, Adjustments Changes, Added fn_get_next_adjustment_date to get next adjustment date and fn_get_contract_amount to get adjustment amount
  01-JUL-2011 Flexcube V.CL Release 7.9 FS Vol2 Tag 04 ITR1#53, Cost of Credit Changes Done to:
        Change Write off case amount and Carrying Case Amount on changing percentages
  11-Apr-2012 Flexcube V.CL Release 7.11,FS Tag 17 changes : Mark Contract as Liquidated Changes
  18-APR-2012 Flexcube V.CL Release 7.11 FS Tag 19,WE migration changes,Added new function fn_appnd_trunc_cust.
  13-APR-2012 Flexcube V.CL Release 7.11 FS Tag 12 Changes, Ability to handle Adjustable Rate Mortgage Changes, new functions for floor and ceiling added.
  25-JUL-2012 Flexcube V.CL Release 7.11 IUT SFR#266 Changes, The rate fixed during VAMI is getting propagated only till the value date of the floor andceiling propagation and not getting propagated from value date of the floor and ceiling propagation till the maturity date of the loan.
  27-JUL-2012 Flexcube V.CL Release 7.11 IUT SFR#311 Changes, Reversal of RTAM is not happening properly while doing back dated spread change part of vami, value date is earlier than the last REVN date (floating contracts).
  12-JUN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 CITIUS#16828 changes,Code added for System to enforce the user to input the mandatory Function id level udfs.
  27-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag08, Intellect Interface-UDF and Cancel Feed changes
  05-OCT-2016 OFCL 12.2 -- Negative Interest Rate changes
  14-JUN-2018 Bug#28046074 --Movement of amount due to history and deleting the data in amount due.
  
  Change History
  
  Changed By : Krithika G
  Bug No     : 27653137
  Search String : OBCL_27653137
  Base Bug      : 27336220
  
  Changed By         : Srinivasulu Ch
  Bug No             : 28444510
  Search String      : Bug#28444510
  Change Desription  : Added for handling VAMI delete cases.  
  
  **Changed By         : Ravi
  **Change Description : Canada BA Changes --Support for Discounted loan in LS
  **Search String      : Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R721 FS Vol1 Tag06 Changes
  **Changed On         : 01-SEP-2019

  ** Modified By       : Prakash Ravi
  ** Modified On       : 16-JAN-2018
  ** Modified Reason   : The code for intrest limits for all branches insert is commented and moved to pdb via the dynamic creation option.
  ** Search String     : BUG#29150906
  
  ** Modified By       : Meha
  ** Modified On       : 17-JAN-2019
  ** Modified Reason   : Auto Capitalization Changes
  ** Search String     : OBCL_14.4_AutoCap
  
  ** Modified By       : Meha
  ** Modified On       : 23-Sep-2019
  ** Modified Reason   : Floor And Ceiling Changes
  ** Search String     : OBCL_14.4_FLRCLG
  
  **Changed By         : Chandra Prasath.N
  **Date               : 23-Jul-2020
  **Change Description : Auto Capitalization on Insufficient Funds Changes
  **Search String      : OBCL_14.4_Capitalization_On_Insf_Funds
  
  **Changed By         : Kavitha Asokan
  **Date               : 19-Aug-2020
  **Change Description : Ristourne component changes
  **Search String      : OBCL14.4_Ristourne_component changes
  
   **Changed By        : Revathi D
  **Date               : 24-Jan-2020
  **Change Description : Added code to populate the amount due details for Principal Outflow entries. 
  **Search String      : OBCL_14.4_SGEN_PAYMENT_ACC_ENTRY_CHANGES  

	**Changed By         : Chandra Prasath.N
	**Date               : 03-Nov-2021
	**Change Description : Added Validation Code based on Loan Parameter
	**Search String      : OBCL_14.4_Progessive_DSBR
   
   **Changed By         : Navoneel Nandan
   **Date               : 21-Dec-2021
   **Change Description : Added Logic for Validating Retro Posting Date is within the limits
   **Search String      : OBCL_14.5_Retro_dated_Extension
   
  **Changed By         : Ramya M
  **Date               : 15-feb-2022
  **Change Description : Code changes done for Participant BA Rates Reprice Changes
  **Search String      : OBCL_14.5_LS_PARTICIPANT_BA_RATE_CHANGES
  
  **Changed By         : Abhik Das
  **Date               : 15-Jun-2022
  **Change Description : Code changes done for adjusting penalty accrual
  **Search String      : OBCL_14.5_Support_Bug#34208251_Changes
  
  **Changed By         : Navoneel Nandan
  **Date               : 07-Jul-2022
  **Change Description : Bulk Inserting/Updating ICCF Calc
  **Search String      : Bug#34324576_3

  **Changed By         : Navoneel Nandan
  **Date               : 07-Jul-2022
  **Change Description : Bulk Inserting/Updating ICCF Exp
  **Search String      : Bug#34601944
  
  ** Changed By        : Revathi Dharmalingam
  **Date               : 24-Mar-2023
  **Change Description : Bulk Inserting/Updating ECA Split Details Tables
  **Search String      : OBCL_14.8_ECA_Split_Partial_Liquidation
  
  **Changed By         : Abhinav Kumar
  **Date               : 19-Jun-2023
  **Change Description : Added new function to get correct effective date in case of Amortize contract for Redef Action to pass it to
                         olpks_amortise.fn_amort
  **Search String      : Bug#35440113
  
  **Changed By         : Abhik Das
  **Date               : 24-Jul-2023
  **Change Description : If user did manual payment and interest change VAMI after
                         that, then system will not allow payment reversal with error as
                         current event is VAMI which should be reversed first.
                         Also, user is unable to reverse VAMI as interest change VAMI reversal
                         is not supported.
                         Hence, modified code to support reversal of payment beyond interest rate
                         change VAMI only.
  **Search String      : OBCL_14.5_GBK_Bug#35588365_Changes

  **Changed By         : Navoneel Nandan
  **Date               : 06-Jun-2023
  **Change Description : Added function fn_COSA_reqd to find if COSIF Adjustment is required
  **Search String      : Bug#35599082
  
      
  ** Changed By           : Sudharshini Balaji
  ** Date                 : 28-Sep-2023
  ** Change Description   : Procedure added to perform Product UDF related validations, which is called from common core.
  ** Search string        : Bug#35837224
 
   **Changed By         : Akhila Samson
   **Date               : 03-Nov-2023
   **Change Description : Contract reference no is required to be accessed in the function FN_FETCH_FLOATING_RATES_NEW as part of hook requirements for computing formulae/expression based interest.
                          Added global variable for contract reference no.  
   **Search String      : Bug#35958182  
   
   **Changed By         : Guru
   **Date               : 10-Jul-2024
   **Change Description : Performance tuning changes for Exponential calculation by changing to collections instead of direct references to EXP tables.                          
   **Search String      : Bug#36825935
  -------------------------------------------------------------------------------------------------------------------------
   
  */
  
  g_auth_from_ext VARCHAR2(1) := 'N'; --OBCL_27653137
  g_iccf_change   VARCHAR2(1) := 'N'; --Bug#28444510
  g_flrclg_reqd   VARCHAR2(1) := 'N'; --OBCL_14.4_FLRCLG Changes
  g_process_cosa  VARCHAR2(1) := 'N'; --Bug#35599082
  g_contract_ref_no oltbs_contract_master.contract_ref_no%TYPE; --Bug#35958182
  TYPE g_typ_iccf_calc IS TABLE OF oltbs_contract_iccf_calc%ROWTYPE INDEX BY BINARY_INTEGER;--Bug#34324576_3
  TYPE g_typ_iccf_exp IS TABLE OF oltbs_contract_iccf_exp%ROWTYPE INDEX BY BINARY_INTEGER;--Bug#34601944
  
  TYPE g_typ_eca_split_details IS TABLE OF oltbs_eca_split_details%ROWTYPE INDEX BY BINARY_INTEGER;--OBCL_14.8_ECA_Split_Partial_Liquidation
 
  -- FCC 4.3 AUG 2003 MM Module changes..starts
  --TYPE Ty_Tbl_Brn_Params IS TABLE OF Oltms_Branch_Parameters%ROWTYPE INDEX BY VARCHAR2(5); --FCC 4.3 MM Module changes..
  TYPE Ty_Tbl_Brn_Params IS TABLE OF Oltms_Branch_Parameters%ROWTYPE INDEX BY VARCHAR2(8); --OBCL_14.8_CE_Length_Changes
  
  --Bug#36825935_1 Changes Starts
  TYPE ty_tb_contract_interest_detail IS TABLE OF lftbs_contract_interest_detail%ROWTYPE INDEX BY BINARY_INTEGER;
  --Bug#36825935_1 Changes Ends

  --09-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION, CITIUS-LS#6198 BEGIN
  FUNCTION Fn_Pop_Contract_Event_Detail(Pcontractrefno IN Oltb_Contract.Contract_Ref_No%TYPE,
                                        p_Trn_Type     IN Oltbs_Contract_Event_Detail.Trn_Type%TYPE,
                                        p_Error_Code   IN OUT VARCHAR2,
                                        p_Error_Param  IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --09-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION, CITIUS-LS#6198 END

  FUNCTION Fn_Get_Branch_Params(p_Branch_Code  IN VARCHAR2,
                                p_Module_Code  IN VARCHAR2,
                                p_Branch_Param OUT Oltms_Branch_Parameters%ROWTYPE,
                                p_Error_Code   IN OUT VARCHAR2,
                                p_Error_Param  IN OUT VARCHAR2)
    RETURN BOOLEAN;
  -- FCC 4.3 AUG 2003 MM Module changes..ends

  FUNCTION Fn_Copycluster(Old_Cluster IN VARCHAR2, New_Cluster IN VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Copyproduct(Old_Product_Code IN VARCHAR2,
                          New_Product_Code IN VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Delete(Pcontractrefno IN OUT Oltbs_Contract.Contract_Ref_No%TYPE,
                     Perrorcode     IN OUT VARCHAR2,
                     Perrorparams   IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Amendbeforefirstauth(Pcontractrefno IN OUT Oltbs_Contract.Contract_Ref_No%TYPE,
                                   Perrorcode     IN OUT VARCHAR2,
                                   Perrorparams   IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Authorise(Pcontractrefno IN Oltbs_Contract.Contract_Ref_No%TYPE,
                        Perrorcode     IN OUT VARCHAR2,
                        Perrorparams   IN OUT VARCHAR2,
                        p_Gen_Settlmsg IN VARCHAR2 DEFAULT 'Y' --Fcc4.2 OPS related changes..
                        ) RETURN BOOLEAN;

  FUNCTION Fn_Backup(Pcontractrefno IN OUT Oltbs_Contract.Contract_Ref_No%TYPE)
    RETURN BOOLEAN;

  FUNCTION Fn_Restore(Pcontractrefno IN OUT Oltbs_Contract.Contract_Ref_No%TYPE)
    RETURN BOOLEAN;

  FUNCTION Fn_Delete_Backup(Pcontractrefno IN Oltbs_Contract.Contract_Ref_No%TYPE)
    RETURN BOOLEAN;

  FUNCTION Fn_Create_New_Version(p_Reference_No IN VARCHAR2) RETURN NUMBER;

  --FCC4.0 JUNE 2002 PLNCITI TIL #3476  Added a new function fn_delete_beforeauth..Bsk
  FUNCTION Fn_Delete_Beforeauth(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                p_Action_Code     IN VARCHAR2,
                                p_Error_Code      IN OUT Ertbs_Msgs.Err_Code%TYPE,
                                p_Error_Parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;

  --FCC 4.1 Oct-2002 STAT1 SFR 53 Loans Status Accounting Changes start
  FUNCTION Fn_Reversal_Restore(Pcontractrefno IN VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Reversal_Backup(Pcontractrefno IN VARCHAR2) RETURN BOOLEAN;
  --FCC 4.1 Oct-2002 STAT1 SFR 53 Loans Status Accounting Changes end --STAT1 SFR 53
  ---------------------------------------------------------------------------------------------------------------------------------
  --
  --FCC 4.2 OPS Changes ITR2 SFR 8 start
  --
  FUNCTION Fn_Validate_Sch_Gap_Days(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                    p_Main_Comp       IN Oltbs_Contract_Master.Main_Comp%TYPE,
                                    p_Maturity_Date   IN Oltbs_Contract_Master.Maturity_Date%TYPE,
                                    p_Currency        IN Oltbs_Contract_Master.Currency%TYPE,
                                    p_Amount          IN Oltbs_Contract_Master.Amount%TYPE,
                                    p_Value_Date      IN Oltbs_Contract_Master.Value_Date%TYPE,
                                    p_Treasury_Source IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                    p_Error_Codes     IN OUT VARCHAR2,
                                    p_Error_Parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --
  --FCC 4.2 OPS Changes ITR2 SFR 8 end
  --

  --
  --FCC 4.2 OPS focus testing SFR 72 changes start
  --
  FUNCTION Fn_Check_Liqd_Tenor(p_Treasury_Source     IN Oltbs_Contract.Treasury_Source%TYPE,
                               p_Contract_Master_Rec IN Oltbs_Contract_Master%ROWTYPE,
                               p_From_Save           IN VARCHAR2,
                               p_Error_Code          IN OUT VARCHAR2,
                               p_Error_Parameter     IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --
  --FCC 4.2 OPS focus testing SFR 72 changes end
  --
  FUNCTION Fn_Maintain_Currency_Limits(p_Product Oltms_Product.Product_Code%TYPE)
    RETURN BOOLEAN;
  --06-NOV-2008 CITIUS-LS#SRT1451 PLC46020129 Start By Swapnasish
  -- PLC46020129 Changes Starts
  FUNCTION Fn_Check_Liqd_Tenor(p_Treasury_Source IN Oltbs_Contract.Treasury_Source%TYPE,
                               p_Contract_Ref_No IN Oltbs_Contract_Master.Contract_Ref_No%TYPE,
                               p_Version_No      IN Oltbs_Contract_Master.Version_No%TYPE,
                               p_From_Save       IN VARCHAR2,
                               p_Error_Code      IN OUT VARCHAR2,
                               p_Error_Parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;
  -- PLC46020129 Changes Ends
  --06-NOV-2008 CITIUS-LS#SRT1451 PLC46020129 End By Swapnasish
  --31-Mar-2008 FLEXCUBE V.CL Release 7.4 Customer changes Starts

  --g_mitb_class oltbs_class_mapping%rowtype;

  FUNCTION Fn_Custchange_Reversal(p_Crn          IN VARCHAR2,
                                  p_Event_No     IN NUMBER,
                                  p_New_Customer IN VARCHAR2,
                                  --p_mis_ref_no   IN      VARCHAR2,
                                  p_Oldmis_Rec IN Oltbs_Class_Mapping%ROWTYPE,
                                  p_Err_Code   IN OUT VARCHAR2,
                                  p_Err_Param  IN OUT VARCHAR2)
    RETURN BOOLEAN;

  ----31-Mar-2008 FLEXCUBE V.CL Release 7.4 Customer changes  ends
  -- 08-MAY-2008 FLEXCUBE V.CL Release 7.4 BAU changes for Watch List functionality - Starts -banu
  FUNCTION Fn_Watch_List_Customer(Pcontractrefno IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                  Perrorcode     IN OUT VARCHAR2,
                                  Perrorparam    IN OUT VARCHAR2)
    RETURN BOOLEAN;
  -- 08-MAY-2008 FLEXCUBE V.CL Release 7.4 BAU changes for Watch List functionality - Ends -banu

  --14-OCT-2008 Changes starts(FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-CITIUPG73100263)
  --19-MAR-2009 FLEXCUBE V.CL Release 7.5 EURCITIPLC lot1 ITR1 SFR#11 RETRO#CITIUPG73100416 Changes Start
  FUNCTION Fn_Pop_Handoff_History(p_Branch       IN Oltbs_Contract.Branch%TYPE,
                                  p_Error_Code   IN OUT VARCHAR2,
                                  p_Error_Params IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --19-MAR-2009 FLEXCUBE V.CL Release 7.5 EURCITIPLC lot1 ITR1 SFR#11 RETRO#CITIUPG73100416 Changes End

  -- 06-Jun-2008 FLEXCUBE V.CL Release 7.4 BAU MM Intellect Interface changes starts
  PROCEDURE Pr_Populate_Imm_Handoff(p_Contract_Ref_No IN VARCHAR2,
                                    p_Module          IN VARCHAR2,
                                    p_Value_Date      IN DATE,
                                    p_User_Id         IN VARCHAR2,
                                    p_Esn             IN NUMBER,
                                    p_Event_Code      IN VARCHAR2);
  -- 06-Jun-2008 FLEXCUBE V.CL Release 7.4 BAU MM Intellect Interface changes ends

  --14-OCT-2008 Changes Ends(FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-CITIUPG73100263)

  --09-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION, 12-MAY-2009 CITIUS-LS#5721 Change STARTS
  FUNCTION Fn_Validate_Settlement_Details(p_Contract_Ref_No IN Oltb_Settlements.Contract_Ref_No%TYPE,
                                          p_Event_Seq_No    IN Oltbs_Contract_Master.Event_Seq_No %TYPE,
                                          p_Module          IN Oltbs_Contract_Master.Module%TYPE,
                                          p_Amount_Tag      IN Oltb_Settlements.Amount_Tag%TYPE,
                                          p_Error_Code      IN OUT VARCHAR2,
                                          p_Error_Param     IN OUT VARCHAR2)
    RETURN BOOLEAN;

  --09-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION, 12-MAY-2009 CITIUS-LS#5721 Change ENDS

  --OBCL_12.5_Multiple Linkage Changes
  FUNCTION Fn_Multi_Linkages(Pcontractrefno IN Oltbs_Contract.Contract_Ref_No%TYPE,
                             Platestesn     IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                             Platestvsn     IN Oltbs_Contract.Latest_Version_No%TYPE,
                             p_Mode         IN VARCHAR2,
                             p_Retovr       IN VARCHAR2,
                             p_Event        IN VARCHAR2,
                             p_Princ_Amt    IN NUMBER,
                             Perrorcode     IN OUT Ertbs_Msgs.Err_Code%TYPE)
    RETURN BOOLEAN;
  --OBCL_12.5_Multiple Linkage Changes Ends

  --21-MAY-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag 15 Retain Main Comp changes start,
  PROCEDURE Pr_Propogate_Main_Comp(p_Product_Code IN VARCHAR2,
                                   p_Branch_Code  IN VARCHAR2);
  --21-MAY-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag 15 Retain Main Comp changes end,

  --01-Jun-2009 FLEXCUBE V.CL Release 7.5 lot2 ITR1 SFR#12 , accrual changes during overpayment start
  FUNCTION Fn_Overpaid_Amount(p_Contract_Ref_No IN VARCHAR2,
                              p_Component       IN VARCHAR2,
                              p_Overpaid_Amt    OUT NUMBER) RETURN BOOLEAN;
  --01-Jun-2009 FLEXCUBE V.CL Release 7.5 lot2 ITR1 SFR#12 , accrual changes during overpayment end
  --22-FEB-2010 FLEXCUBE V.CL 7.6, PBG Site-Retro,CITIPBG TILL#490 start
  FUNCTION Fn_Validate_Userref(p_Contract_Ref_No     IN Oltbs_Contract.Contract_Ref_No%TYPE,
                               p_Userref_Format_Stat OUT VARCHAR2,
                               p_User_Ref_No         IN Oltbs_Contract.User_Ref_No%TYPE,
                               p_Error               IN OUT VARCHAR2,
                               p_Error_Params        IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --22-FEB-2010 FLEXCUBE V.CL 7.6, PBG Site-Retro,CITIPBG TILL#490 end
  --08-Mar-2011 Flexcube V.CL Release 7.9, Cost of Credit Changes,, Batch Changes starts
  FUNCTION Fn_Is_Coc_Product(p_Product Oltms_Product_Master_Ld.Product%TYPE)
    RETURN VARCHAR2;

  FUNCTION Fn_Get_Commitment_Ref_No(p_Loan_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE)
    RETURN VARCHAR2;

  FUNCTION Fn_Populate_Coc(p_Rapid_Id        IN Oltbs_Draft_Commitment.Draft_Ref_No%TYPE,
                           p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                           p_Error_Code      IN OUT VARCHAR2,
                           p_Error_Param     IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Set_Coc_Valuation_Reqd(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                     p_Error_Code      IN OUT VARCHAR2,
                                     p_Error_Param     IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --08-Mar-2011 Flexcube V.CL Release 7.9, Cost of Credit Changes,, Batch Changes ends
  --06-APR-2011 Flexcube V.CL Release 7.9, Cost of Credit Changes start
  FUNCTION Fn_Is_Coc_Valuation_Reqd(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE)
    RETURN VARCHAR2;
  --06-APR-2011 Flexcube V.CL Release 7.9, Cost of Credit Changes end
  --19-MAY-2011 Flexcube V.CL Release 7.9, Cost of Credit Changes starts
  FUNCTION Fn_Is_Today_Liqd_Contract(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                     p_Processing_Date IN DATE)
    RETURN VARCHAR2;
  --19-MAY-2011 Flexcube V.CL Release 7.9, Cost of Credit Changes ends
  --25-MAY-2011 Flexcube V.CL Release 7.9, Adjustments Changes STARTS
  FUNCTION Fn_Get_Next_Adjustment_Date(p_Branch          IN Oltbs_Contract.Branch%TYPE,
                                       p_Processing_Date IN DATE) RETURN DATE;
  FUNCTION Fn_Get_Contract_Amount(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                  p_Adjustment_Date IN DATE) RETURN NUMBER;
  --25-MAY-2011 Flexcube V.CL Release 7.9, Adjustments Changes ENDS
  --7.9sfr53 starts
  FUNCTION Fn_Get_Gross_Amount(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE)
    RETURN NUMBER;
  --7.9sfr53 ends
  --11-Apr-2012 Flexcube V.CL Release 7.11,FS Tag 17 changes : Mark Contract as Liquidated changes start
  FUNCTION Fn_Validate_Mark_Liqd(p_Contract_Ref_No IN VARCHAR2,
                                 p_Prod_Type       IN VARCHAR2,
                                 p_Module          IN VARCHAR2,
                                 p_Processing_Date IN DATE,
                                 p_Error_Code      IN OUT VARCHAR2,
                                 p_Error_Param     IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --11-Apr-2012 Flexcube V.CL Release 7.11,FS Tag 17 changes : Mark Contract as Liquidated changes end
  --18-APR-2012 Flexcube V.CL Release 7.11 FS Tag 19 changes start
  FUNCTION Fn_Appnd_Trunc_Cust(p_Cust_No IN Oltms_Customer.Customer_No%TYPE,
                               p_Prefix  IN VARCHAR2,
                               p_Branch  IN Oltms_Branch.Branch_Code%TYPE)
    RETURN VARCHAR2;
  --18-APR-2012 Flexcube V.CL Release 7.11 FS Tag 19 changes end
  --13-APR-2012 Flexcube V.CL Release 7.11 FS Tag 12 Changes start here
  FUNCTION Fn_Get_Floor_Ceiling_Rate(p_Commitment_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                     p_Loan_Ref_No       IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                     p_Product_Code      IN Oltms_Contract_Flrclg_Rate.Product_Code%TYPE,
                                     p_Component         IN Oltms_Contract_Flrclg_Rate.Component%TYPE,
                                     p_Ccy               IN Oltms_Contract_Flrclg_Rate.Ccy_Code%TYPE,
                                     p_Eff_Date          IN Oltms_Contract_Flrclg_Rate.Eff_Date%TYPE,
                                     p_Rate              IN OUT Oltms_Contract_Flrclg_Rate.Allin_Rate_Floor%TYPE,
									 p_RateType   		 In Varchar2,--OBCL_14.4_FLRCLG Changes
                                     p_Error_Code        IN OUT VARCHAR2,
                                     p_Error_Param       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Prop_Floor_Ceiling_Rate(p_Commitment_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                      p_Loan_Ref_No       IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                      p_Processing_Date   IN DATE,
                                      p_Error_Code        IN OUT VARCHAR2,
                                      p_Error_Param       IN OUT VARCHAR2,
                                      p_Rtam_Auth_Stat    IN VARCHAR2 DEFAULT 'U',
                                      p_Prop_Mode         IN VARCHAR2 DEFAULT 'O',
                                      p_Component         IN VARCHAR2 DEFAULT NULL)
    RETURN BOOLEAN;

  FUNCTION Fn_Prop_Floor_Ceiling_Batch(p_Processing_Branch IN Oltbs_Contract.Branch%TYPE,
                                       p_Process_Date      IN DATE,
                                       p_Error_Code        IN OUT VARCHAR2,
                                       p_Error_Param       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --13-APR-2012 Flexcube V.CL Release 7.11 FS Tag 12 Changes end here
  --25-JUL-2012 Flexcube V.CL Release 7.11 IUT SFR#266 Changes start here
  FUNCTION Fn_Check_Flrclg_Prop_Reqd(p_Contract_Ref_No IN Lftbs_Contract_Interest.Contract_Reference_No%TYPE,
                                     p_Component       IN Lftbs_Contract_Interest.Component%TYPE,
                                     p_Value_Date      IN Lftbs_Contract_Interest.Value_Date%TYPE,
                                     p_New_Rate        IN Lftbs_Contract_Interest.Rate%TYPE,
                                     p_New_Spread      IN Lftbs_Contract_Interest.Spread%TYPE --27-JUL-2012 Flexcube V.CL Release 7.11 IUT SFR#311 Changes here
                                    ,
                                     p_New_Amount      IN Lftbs_Contract_Interest.Amount%TYPE,
                                     p_Prop_Reqd       IN OUT VARCHAR2,
                                     p_Err_Code        IN OUT VARCHAR2,
                                     p_Err_Param       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Get_Next_Rate_Fixed_Date(p_Contract_Ref_No     IN Lftbs_Contract_Interest.Contract_Reference_No%TYPE,
                                       p_Component           IN Lftbs_Contract_Interest.Component%TYPE,
                                       p_Value_Date          IN Lftbs_Contract_Interest.Value_Date%TYPE,
                                       p_New_Rate            IN Lftbs_Contract_Interest.Rate%TYPE,
                                       p_New_Spread          IN Lftbs_Contract_Interest.Spread%TYPE --27-JUL-2012 Flexcube V.CL Release 7.11 IUT SFR#311 Changes here
                                      ,
                                       p_New_Amount          IN Lftbs_Contract_Interest.Amount%TYPE,
                                       p_Nxt_Rate_Fixed_Date OUT Lftbs_Contract_Interest.Value_Date%TYPE,
                                       p_Err_Code            IN OUT VARCHAR2,
                                       p_Err_Param           IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Amend_Rtam_For_Bvd_Ratefix(p_Contract_Ref_No IN Lftbs_Contract_Interest.Contract_Reference_No%TYPE,
                                         p_Component       IN Lftbs_Contract_Interest.Component%TYPE,
                                         p_Start_Date      IN Lftbs_Contract_Interest.Value_Date%TYPE,
                                         p_New_Rate        IN Lftbs_Contract_Interest.Rate%TYPE,
                                         p_New_Amount      IN Lftbs_Contract_Interest.Amount%TYPE,
                                         p_Adj_Rate        IN Lftbs_Contract_Interest.Adjustment_Rate%TYPE,
                                         p_Auth_Stat       IN VARCHAR2,
                                         p_Recalc_Reqd     IN OUT VARCHAR2,
                                         p_Err_Code        IN OUT VARCHAR2,
                                         p_Err_Param       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Undo_Rtam_For_Bvd_Ratefix(p_Contract_Ref_No IN Lftbs_Contract_Interest.Contract_Reference_No%TYPE,
                                        p_Component       IN Lftbs_Contract_Interest.Component%TYPE,
                                        p_Start_Date      IN Lftbs_Contract_Interest.Value_Date%TYPE,
                                        p_End_Date        IN Lftbs_Contract_Interest.Value_Date%TYPE,
                                        p_New_Rate        IN Lftbs_Contract_Interest.Rate%TYPE,
                                        p_New_Amount      IN Lftbs_Contract_Interest.Amount%TYPE,
                                        p_Auth_Stat       IN VARCHAR2,
                                        p_Recalc_Reqd     IN OUT VARCHAR2,
                                        p_Err_Code        IN OUT VARCHAR2,
                                        p_Err_Param       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Populate_Rtam_Event(p_Contract_Ref_No IN Lftbs_Contract_Interest.Contract_Reference_No%TYPE,
                                  p_Cont_Int_Rec    IN Lftbs_Contract_Interest%ROWTYPE,
                                  p_New_Rate        IN Lftbs_Contract_Interest.Rate%TYPE,
                                  p_Adj_Rate        IN Lftbs_Contract_Interest.Adjustment_Rate%TYPE,
                                  p_Auth_Stat       IN VARCHAR2,
                                  p_Err_Code        IN OUT VARCHAR2,
                                  p_Err_Param       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --25-JUL-2012 Flexcube V.CL Release 7.11 IUT SFR#266 Changes end here
  --12-JUN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 CITIUS#16828 changes start
  FUNCTION Fn_Validate_Mandatory_Udf(p_Contract_Refno IN Oltms_Pool_Funding_Master.Funding_Ref_No%TYPE,
                                     p_Function_Id    IN Cstm_Udf_Vals.Function_Id%TYPE,
                                     p_Param_Type     IN Oltbs_Interface_Param_If.Param_Type%TYPE)
    RETURN BOOLEAN;
  --12-JUN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 CITIUS#16828 changes end
  --19-SEP-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag10,RAPID to Flexcube Auto Book NAM changes start
  FUNCTION Fn_Check_Conversion_Date(p_Value_Date      IN DATE,
                                    p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                    p_Esn             IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                                    p_Err_Code        IN OUT VARCHAR2,
                                    p_Err_Param       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --19-SEP-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag10,RAPID to Flexcube Auto Book NAM changes end
  --OFCL 12.2 changes start
  FUNCTION Fn_Populate_Contract_Interest(p_Contract_Ref_No IN VARCHAR2,
                                         p_Version_No      IN NUMBER,
                                         p_Action_Code     IN VARCHAR2,
                                         p_Error_Code      IN OUT VARCHAR2,
                                         p_Error_Param     IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Get_Main_Contract_Interest(p_Contract_Ref_No   IN VARCHAR2,
                                         p_Cftb_Contract_Int IN OUT Lftb_Contract_Interest%ROWTYPE,
                                         p_Error_Code        IN OUT VARCHAR2,
                                         p_Error_Param       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  /*
  FUNCTION Fn_CAMD_Delete_Util(l_Ld_Rec IN OUT oltbs_contract_master%ROWTYPE,
                               p_Lm_Det     IN OUT Olpks_Oldtronl_Main.Ty_Tb_Oltbs_Acc_Coll_Link_Dtls,
                               event_code   IN OUT oltbs_contract_event_log.EVENT_CODE%TYPE,
                               event_seq_no  IN OUT oltbs_contract_event_log.EVENT_SEQ_NO%TYPE) RETURN BOOLEAN;*/

  --OFCL 12.2 changes end
  --27-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag08 changes start
  PROCEDURE Pr_Set_Send_Another_Msg(p_Value IN VARCHAR2);
  g_Send_Another_Msg VARCHAR2(1) := 'N';
  g_Full_Mat_Dt_Liqd VARCHAR2(1) := 'N';
  --27-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag08 changes end
  
  --Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R721 FS Vol1 Tag06 Changes starts
  FUNCTION fn_propogate_ba_details
                (
                  p_contract_ref_no    IN    oltbs_contract.contract_ref_no%TYPE
                  ,p_split_serial_no    IN    oltb_contract_ba_details.split_serial_no%TYPE
                  ,p_split_no        IN    oltb_contract_ba_details.split_number%TYPE
                  ,p_child_ref_no      IN    oltbs_contract.contract_ref_no%TYPE
                  ,p_error_code      IN  OUT  VARCHAR2
                  ,p_error_parameter    IN  OUT  VARCHAR2
                )
RETURN BOOLEAN;
FUNCTION fn_check_ba_product
              (
                p_product    IN     oltbs_contract.product_code%TYPE
              )
RETURN VARCHAR2;
FUNCTION FN_GET_COF_AMOUNT (  
                p_loan_amount    IN oltbs_contract_ba_details.stamping_fee_amt%TYPE,
                p_treasury_rate    IN oltbs_contract_ba_details.treasury_rate%TYPE,
                p_value_date    IN DATE,
                p_maturity_date    IN DATE,
                p_interest_basis  IN oltbs_contract_ba_details.interest_day_basis%TYPE,
                p_currency      IN oltbs_contract.contract_ccy%TYPE,
                p_cof_amount    IN OUT oltbs_contract_ba_details.cof_amt%TYPE,
                p_error_code       IN OUT VARCHAR2,
                p_error_param       IN OUT VARCHAR2
              )
RETURN BOOLEAN;
  --Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R721 FS Vol1 Tag06 Changes ends
  
--BUG#28046074 starts
  function fn_move_amt_due_to_hist(pContractRefNo    IN oltbs_contract.contract_ref_no%type,
                                   p_esn             IN oltbs_contract.latest_event_seq_no%type,
                                   p_error_code      IN OUT ertbs_msgs.err_code%TYPE,
                                   p_error_parameter IN OUT varchar2)
    return Boolean;
  --BUG#28046074 ends 
  
  --BUG#29150906 change starts
  function fn_create_interet_limits_prod( p_Function_Id      IN VARCHAR2,
                                   p_prd_code             IN VARCHAR2,
                                   p_error_code      IN OUT ertbs_msgs.err_code%TYPE,
                                   p_error_parameter IN OUT varchar2)
    return Boolean;
  --BUG#29150906 change ends
--OBCL_14.4_Autocap Changes Starts
	Function Fn_Get_Auto_Cap_Details
						(p_contract_ref_no In Oltb_Contract.Contract_Ref_No%Type,
						 p_Start_Date      In Oltb_Contract_Schedules.Start_Date%Type,
						 P_Component In Oltb_Contract_Schedules.Component%Type
						)
	Return Varchar2;
--OBCL_14.4_Autocap Changes Ends

--OBCL_14.4_Capitalization_On_Insf_Funds Changes Starts
	Function Fn_Get_Csif_Details
						(p_contract_ref_no In Oltb_Contract.Contract_Ref_No%Type,
						 p_Start_Date      In Oltb_Contract_Schedules.Start_Date%Type,
						 P_Component In Oltb_Contract_Schedules.Component%Type
						)
	Return Varchar2;
--OBCL_14.4_Capitalization_On_Insf_Funds Changes Ends

--OBCL14.4_Ristourne_component changes starts
	Function Fn_Is_Ristourne_Component(P_Component In Oltb_Contract_Schedules.Component%Type,
                                       p_contract_ref_no In Oltb_Contract.Contract_Ref_No%Type)
	Return Varchar2;
     
   Function Fn_Rist_Comp_Validation(p_Component       IN Oltb_Contract_Schedules.Component%Type,
                                    p_Product       IN Oltbs_Contract.Product_Code%TYPE) 
    Return Varchar2;
--OBCL14.4_Ristourne_component changes ends

--OBCL_14.4_MARK_LIQD CHANGES

FUNCTION fn_validate_deal_mark_liqd(p_contract_ref_no  IN OLtbs_contract.contract_ref_no%TYPE,
                  p_module       IN OLtbs_contract.module_code%TYPE,
                  p_processing_date  IN DATE,
                  p_error_code     IN OUT VARCHAR2,
                  p_error_param    IN OUT VARCHAR2
                  )
RETURN BOOLEAN;

--OBCL_14.4_MARK_LIQD CHANGES

--OBCL_14.4_SGEN_PAYMENT_ACC_ENTRY_CHANGES 	Starts

FUNCTION Fn_Get_Amount_Tag(
								p_Ref_No               IN Oltb_Contract_master.Contract_Ref_no%TYPE,
                                p_Event_Code           IN Oltbs_Contract_event_log.Event_code%TYPE,
                                p_Event_seq_no         IN Oltbs_Contract_event_log.Event_Seq_no%TYPE,
                                p_Due_Date             IN Oltbs_Amount_Due.Due_date%TYPE,								
                                p_Amount_tag           OUT Oltbs_settlements.Amount_tag%TYPE
									)
RETURN BOOLEAN;

FUNCTION Fn_SGEN_Populate_Amount_Due( p_Refno           IN Oltb_Contract_master.contract_ref_no%TYPE,
                                      p_Event           IN Oltbs_Contract_event_log.Event_Code%TYPE,
                                      p_Event_seq_no    IN Oltbs_Contract_event_log.Event_Seq_no%TYPE,
                                      p_Dsbr_amt        IN Oltbs_Contract_dsbr_Sch.amount%TYPE,
                                      p_Due_date        IN Oltbs_Contract_dsbr_Sch.due_date%TYPE
                                      ) 
 RETURN BOOLEAN;
 
 FUNCTION  Fn_Amt_To_Rate_Rounded (
                                   p_Ccy1        IN CYTMS_CCY_DEFN.CCY_CODE%TYPE,
                                   p_Ccy2        IN CYTMS_CCY_DEFN.CCY_CODE%TYPE,
                                   p_Amount1     IN NUMBER,
                                   p_Amount2     IN NUMBER,
                                   p_rounded_amt OUT NUMBER
                                   )
                                   
  RETURN VARCHAR2;
 --OBCL_14.4_SGEN_PAYMENT_ACC_ENTRY_CHANGES 	Ends
 --OBCL_14.4_Progessive_DSBR Changes Starts
 FUNCTION Fn_Chck_LnParam(p_Value IN VARCHAR2)
  RETURN BOOLEAN;
 --OBCL_14.4_Progessive_DSBR Changes Ends
  --OBCL_14.5_Retro_dated_Extension Starts
  FUNCTION fn_validate_retrodated_ext(p_contract_ref_no IN oltb_contract.contract_ref_no%TYPE,
                                      p_posting_date    DATE,
                                      p_error_code IN OUT VARCHAR2,
                                      p_error_parameter IN OUT VARCHAR2) RETURN BOOLEAN;
  --OBCL_14.5_Retro_dated_Extension Ends
  
---OBCL_14.5_Support_Bug#34208251_Changes Starts---
 FUNCTION fn_Adjust_Penalty_accrual(p_contract_ref_no IN oltb_contract.contract_ref_no%TYPE,
                                    P_Contract_Value_Date    DATE,
                                    p_processing_date        DATE,
                                    p_error_code IN OUT VARCHAR2,
                                    p_error_parameter IN OUT VARCHAR2) RETURN BOOLEAN;
----OBCL_14.5_Support_Bug#34208251_Changes Ends----

---OBCL_14.5_GBK_Bug#35588365_Changes Starts---
FUNCTION fn_allow_pmt_rev_beyond_rate_VAMI(p_contract_ref_no     IN oltb_contract.contract_ref_no%TYPE,
                                           p_rev_pmt_beyond_rate_VAMI OUT VARCHAR2)
RETURN BOOLEAN;
----OBCL_14.5_GBK_Bug#35588365_Changes Ends----

 
--OBCL_14.5_LS_PARTICIPANT_BA_RATE_CHANGES STARTS
FUNCTION fn_propogate_PARTICIPANT_ba_details
                (
                  p_contract_ref_no    IN    oltbs_contract.contract_ref_no%TYPE
                  ,p_split_serial_no    IN    oltb_contract_ba_details.split_serial_no%TYPE
                  ,p_split_no        IN    oltb_contract_ba_details.split_number%TYPE
                  ,p_child_ref_no      IN    oltbs_contract.contract_ref_no%TYPE
                  ,p_error_code      IN  OUT  VARCHAR2
                  ,p_error_parameter    IN  OUT  VARCHAR2
                )
RETURN BOOLEAN;
--OBCL_14.5_LS_PARTICIPANT_BA_RATE_CHANGES ENDS
FUNCTION fn_insert_iccf_calc(p_iccf_calc g_typ_iccf_calc) RETURN BOOLEAN;--Bug#34324576_3
FUNCTION fn_insert_iccf_exp(p_iccf_exp g_typ_iccf_exp) RETURN BOOLEAN;--Bug#34601944

--OBCL_14.8_ECA_Split_Partial_Liquidation Changes Starts
FUNCTION Fn_Insert_Eca_Split_Details(p_Eca_Split_Details g_typ_eca_split_details) RETURN BOOLEAN;
--OBCL_14.8_ECA_Split_Partial_Liquidation Changes Ends
--Bug#35440113 Starts
 FUNCTION fn_Amort_Eff_Date(p_contract_ref_no IN oltb_contract.contract_ref_no%TYPE,
                            p_eff_date        IN OUT DATE) RETURN BOOLEAN;
--Bug#35440113 Ends
--Bug#35599082 starts
FUNCTION fn_COSA_reqd(p_contract_ref_no IN oltb_contract.contract_ref_no%TYPE,
                      p_component       IN lftms_product_iccf.component%TYPE,
                      p_esn             IN oltbs_contract.LATEST_EVENT_SEQ_NO%TYPE,
                      p_prepmt          IN NUMBER DEFAULT 0) RETURN BOOLEAN;
--Bug#35599082 ends


  --$$ Bug#35837224 Changes Start
PROCEDURE Pr_Validate_Udf_Prod_Link ( p_Function_Id       IN VARCHAR2,
                                      p_udf_field_name     IN  OLTM_PRODUCT_UDF_FIELDS_MAP.FIELD_NAME%TYPE,
                                      p_link_prod_count    OUT NUMBER,
                                      p_Err_Code           IN OUT VARCHAR2,
                                      p_Err_Params         IN OUT VARCHAR2 );  
  --$$  Bug#35837224 changes ends  
  
--Bug#36825935 Changes Starts
FUNCTION fn_insert_iccf_calc_rec(p_iccf_calc olpkss_interest.Ty_Tb_contract_iccf_calc_rec) 
RETURN BOOLEAN;

FUNCTION fn_insert_comp_handoff(p_iccf_handoff olpkss_schedules.ty_tb_rate_handoff) 
RETURN BOOLEAN;

--Bug#36825935 Changes Ends
--Bug#36825935_1 Changes Starts
FUNCTION fn_insert_comp_handoff
(
	p_iccf_handoff olpkss_schedules.ty_tb_rate_handoff,
	p_flip BOOLEAN
) 
RETURN BOOLEAN;

FUNCTION fn_insert_interest_detail
(
	p_lftb_contract_interest_detail IN ty_tb_contract_interest_detail,
	p_flip IN BOOLEAN
) 
RETURN BOOLEAN;
--Bug#36825935_1 Changes Ends

--Bug#37232926 Start 
FUNCTION fn_upd_enddate_for_penal
(
	p_contract_ref_no    IN oltb_contract.contract_ref_no%TYPE,
	p_Err_Code           IN OUT VARCHAR2,
    p_Err_Params         IN OUT VARCHAR2 )
RETURN BOOLEAN;
 --Bug#37232926 End
 
END Olpks_Servicesy;
/
CREATE  or replace SYNONYM olpkss_servicesy FOR olpks_servicesy
/
