CREATE OR REPLACE PACKAGE Olpks_Acc_Entry AS

  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_acc_entry.SPC
  **
  ** Module    : LOANS AND DEPOSITS
  
  ** This source is part of the ORACLE FLEXCUBE Corporate Software System
  ** and is copyrighted by Oracle Financial Services Software Limited.
  
  ** All rights reserved.  No part of this work may be reproduced,
  ** stored in a retrieval system, adopted or transmitted in any
  ** form or by any means, electronic, mechanical, photographic,
  ** graphic, optic recording or otherwise, translated in any
  ** language or computer language, without the prior written  
  ** permission of Oracle Financial Services Software Limited.
  **
  ** Oracle Financial Services Software Limited.
  ** 10-11, SDF I, SEEPZ, Andheri (East),
  ** Mumbai - 400 096.
  ** 
  ** Copyright © 1997-2013 by Oracle Financial Services Software Limited.          
  ----------------------------------------------------------------------------------------------------
  */
  /*------------------------------------------CHANGE HISTORY----------------------------------
  DATE    VERSION NO  CODE    DESCRIPTION
  27-DEC-1999  1.5        Another overloaded fn_acc_entry has been added to 
              handle prepayment OF principal FOR dtags
  
  25-JAN-2002  FCC3.9 LATAM  The Status movement IS done schedule wise,affecting only the components relating to that
            schedule.The status movement moves only the outstanding relating to that component to a
            new accounting head /GL.This status Change happens only IF the parameter Schedule Level 
            Status change, which IS IN the preferences OF the Loan Product Definition, IS SET 
            to 'Y' i.e., Checked.
            Whenever  a change OF Status happens (Schedule Level /Contract Level) ,the accruals FOR the
            current month,current year AND previous year IS recalculated AND passed against the GL's
            maintained FOR current year AND previous year IN Chart OF ACCOUNTS OF General Ledger.
            This tracking OF accruals happens only IF the parameter Track PNL Hist. , maintained at 
            the bank parameters,IS SET  to 'Y' i.e., Checked.
  
  01-JULY-2003 FCC 4.3 AUG 2003 Development Requirements.
    Requirement:
        WHILE doing LD Reversal, a new field Transaction TYPE has to be specified at the Contract/Payment/Fee
        screen. This will be passed to the respective subsystems.
    Changes Done:
        a. Fn_reverse_acc_entry overloaded spec has been added
        b. fn_reverse_product_level_entry spec has been overloaded
  
  14-JUL-2003 FCC4.3 AUG 2003 A/c netting changes  -- Overloaded the functions fn_settlement_referral 
                     and fn_get_settlement_details 
  
  17-JUL-2003 FCC4.3 AUG 2003 MM Module changes..
  10-OCT-2003 FCC4.3.1 Different INC/EXP reversal GL for status change;  reversal_gl added in rec_accrole_xfer 
  
  27-OCT-2003 FCC4.4 DEC 2003 Fast Settlement change : Added function fn_fast_settlement_referral for fast
                       settlement referral
  
  07-DEC-2004 FCC 4.6.1 JAN 2005 EIM Enhancements - New function fn_compute_lcy_equivalent added    
  - FCC 4.6.1 JAN 2005 ITR-1 SFR-196 For changing copyright clause / release name
  04-AUG-2005  FCC 4.6.2 CITILS 04-AUG-2005 - Netting Changes
    -- Added New Functions fn_bridge_acc_replacement, fn_sync_amount_due
  02-nov-2007 FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-113
    20-JUL-2005 VB for CITIUS,Till#113, Hardcoding of GL Length (9) is removed for GL related variables  
  10-MAR-2008 FLEXCUBE V.CL Release 7.4 BAU-Lot2, LC Limit for Loans
        Included new function Fn_LC_sublimit_acc_entry.
  27-MAY-2008 27-MAY-2008 FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-CITIUSLD46200067 Reversal of Repriced Contracts not passing any/Wrong accounting Entries.
  06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS Till#1386,STP Consolidation,By Swapnasish,Changes for passing the accounting entry for LC sublimit with action code ad B so that the acoounting entry should get autoauthorize as the entries will be passed through batch.
  
    SFR Number         : 27443170 
    Changed By         : Vigneshram S
    Change Description : Added new function for fn_tax_referral removing duplicate accounting entries for product RULE
    Search string      : OBCL_14.0_27443170
    Date               : 29-Jan-2018
  
  Changed By         : Pallavi R
  Changes On         : 02-Apr-2018
  Change Description : Multiple(Splilt) Settlements are introduced
  Search  String     : OBCL_14.1_Split_stl Changes
    
	**SFR                : 29959799
    **Changed By         : Guru
	**DATE				 : 05-Nov-2019
    **Change Description : RVCN (Reversal of contingent entries) event is triggered if preclosure is done (Contract Status is Liquidated). Contingent entry should be passed for residual amount that has not been disbursed
    **Search String      : OBCL_14.4_Contingent_Enhancements  
    
   **Changed By         : Chandra Prasath N
   **DATE               : 17-Feb-2020
   **Change Description : Reporting Component Changes
   **Search String      : OBCL_14.4_CDI_CHANGES
   
    **Changed By         : Kavitha Asokan
    **DATE		         : 28-May-2019
    **Change Description : Latest Event seq and contract status will be handled inside Fn_Pass_Residual_Contingent_For_Liqd_Cont
    **Search String      : OBCL_14.4_Contingent_Enhancements PII
 
    **Changed By         : Usha Rani Kota
    **DATE		           : 06-Sep-2021
    **Change Description : A new variable is declared to capture the account number which is used in OLPKS_UTILS to derive the SDE values
    **Search String      : OBCL_14.5_RuleBasedAccounting
	
  **Changed By         : Reghuraj
  **Date               : 22-OCt-2021
  **Change Description : Code Change for handle the multiple accounting entry issue with charge when IOF tax get added in  DSBR events
  **Search String      : Bug#33423345 
  
   **Changed By       : Revathi Dharmalingam
  **Date               : 01-Nov-2021
  **Change Description : Changes made for FX Variation Changes during Contract booking screen
  **Search String      : OBCL_14.5_FX_Variation Changes
  ------------------------------------END CHANGE HISTORY-------------------------------------
  */

  -------------------------------------------------------------------------------

  g_List_Of_Withhold_Accroles VARCHAR2(1000) := 'LIABGL~ASSETGL';
  g_List_Of_Dr_Cr_Types       VARCHAR2(1000) := 'C~D';
  g_Brokerage_Amount_Tag      Oltbs_Handoff.Amount_Tag%TYPE := 'BROKAMT';
  g_Contract_Ref_No           Oltbs_Contract.Contract_Ref_No%TYPE;
  g_Event_Code                Oltbs_Contract_Event_Log.Event_Code%TYPE;--OBCL_14.5_FX_Variation Changes
  
  g_Charge_Referral_Done     BOOLEAN := FALSE; -- Bug#33423345  added
   --Bug#30019993     changes start
  PROCEDURE Pr_Skip_Handler(P_Stage IN VARCHAR2);
  PROCEDURE Pr_Set_Skip_Kernel;
  PROCEDURE Pr_Set_Activate_Kernel;
  PROCEDURE Pr_Set_Skip_Cluster;
  PROCEDURE Pr_Set_Activate_Cluster;
  FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
--Bug#30019993     changes end
  
  -------------------------------------------------------------------------------

  FUNCTION Fn_Acc_Entry(p_Contract_Ref_No      IN Oltbs_Contract.Contract_Ref_No%TYPE,
                        p_Current_Event_Seq_No IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                        p_Event_Code           IN Oltbs_Contract.Curr_Event_Code%TYPE,
                        p_Contract_Maturity    IN BOOLEAN,
                        p_Handoff_Action_Code  IN CHAR,
                        p_Value_Date           IN DATE,
                        p_List_Of_Amount_Tags  IN VARCHAR2,
                        p_List_Of_Amounts      IN VARCHAR2,
                        p_List_Of_Amount_Ccys  IN VARCHAR2,
                        p_Transaction_Code     IN Oltbs_Handoff.Trn_Code%TYPE,
                        p_Error_Code           IN OUT VARCHAR2,
                        p_Error_Parameter      IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Acc_Entry(p_Contract_Ref_No      IN Oltbs_Contract.Contract_Ref_No%TYPE,
                        p_Current_Event_Seq_No IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                        p_Event_Code           IN Oltbs_Contract.Curr_Event_Code%TYPE,
                        p_Contract_Maturity    IN BOOLEAN,
                        p_Handoff_Action_Code  IN CHAR,
                        p_Value_Date           IN DATE,
                        p_List_Of_Amount_Tags  IN VARCHAR2,
                        p_List_Of_Amounts      IN VARCHAR2,
                        p_List_Of_Amount_Ccys  IN VARCHAR2,
                        p_Transaction_Code     IN Oltbs_Handoff.Trn_Code%TYPE,
                        p_Dtag_Prepay_Ind      IN BOOLEAN, --dtags changes
                        p_Error_Code           IN OUT VARCHAR2,
                        p_Error_Parameter      IN OUT VARCHAR2)
    RETURN BOOLEAN;

  --25-JAN-2002  FCC3.9 LATAM
  FUNCTION Fn_Acc_Entry(p_Contract_Ref_No      IN Oltbs_Contract.Contract_Ref_No%TYPE,
                        p_Current_Event_Seq_No IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                        p_Event_Code           IN Oltbs_Contract.Curr_Event_Code%TYPE,
                        p_Contract_Maturity    IN BOOLEAN,
                        p_Handoff_Action_Code  IN CHAR,
                        p_Value_Date           IN DATE,
                        p_List_Of_Amount_Tags  IN VARCHAR2,
                        p_List_Of_Amounts      IN VARCHAR2,
                        p_List_Of_Amount_Ccys  IN VARCHAR2,
                        p_Transaction_Code     IN Oltbs_Handoff.Trn_Code%TYPE,
                        p_Acc_Lookup           IN Olpkss_Accounting.Tbl_Lookup,
                        p_Handoff              IN OUT Olpkss_Accounting.Tbl_Achoff,
                        p_Passentry            IN BOOLEAN,
                        p_Error_Code           IN OUT VARCHAR2,
                        p_Error_Parameter      IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Acc_Entry(p_Contract_Ref_No      IN Oltbs_Contract.Contract_Ref_No%TYPE,
                        p_Current_Event_Seq_No IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                        p_Event_Code           IN Oltbs_Contract.Curr_Event_Code%TYPE,
                        p_Contract_Maturity    IN BOOLEAN,
                        p_Handoff_Action_Code  IN CHAR,
                        p_Value_Date           IN DATE,
                        p_List_Of_Amount_Tags  IN VARCHAR2,
                        p_List_Of_Amounts      IN VARCHAR2,
                        p_List_Of_Amount_Ccys  IN VARCHAR2,
                        p_Transaction_Code     IN Oltbs_Handoff.Trn_Code%TYPE,
                        p_Dtag_Prepay_Ind      IN BOOLEAN, --dtags changes
                        p_Acc_Lookup           IN Olpkss_Accounting.Tbl_Lookup,
                        p_Handoff              IN OUT Olpkss_Accounting.Tbl_Achoff,
                        p_Passentry            IN BOOLEAN,
                        p_Error_Code           IN OUT VARCHAR2,
                        p_Error_Parameter      IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --

  FUNCTION Fn_Acc_Entry(p_Contract_Ref_No      IN Oltbs_Contract.Contract_Ref_No%TYPE,
                        p_Current_Event_Seq_No IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                        p_Event_Code           IN Oltbs_Contract.Curr_Event_Code%TYPE,
                        p_Contract_Maturity    IN BOOLEAN,
                        p_Handoff_Action_Code  IN CHAR,
                        p_Value_Date           IN DATE,
                        p_List_Of_Amount_Tags  IN VARCHAR2,
                        p_List_Of_Amounts      IN VARCHAR2,
                        p_List_Of_Amount_Ccys  IN VARCHAR2,
                        p_Acc_Lookup           IN Olpkss_Accounting.Tbl_Lookup,
                        p_Transaction_Code     IN Oltbs_Handoff.Trn_Code%TYPE,
                        p_Error_Code           IN OUT VARCHAR2,
                        p_Error_Parameter      IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Acc_Entry(p_Contract_Ref_No      IN Oltbs_Contract.Contract_Ref_No%TYPE,
                        p_Current_Event_Seq_No IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                        p_Event_Code           IN Oltbs_Contract.Curr_Event_Code%TYPE,
                        p_Contract_Maturity    IN BOOLEAN,
                        p_Handoff_Action_Code  IN CHAR,
                        p_Value_Date           IN DATE,
                        p_List_Of_Amount_Tags  IN VARCHAR2,
                        p_List_Of_Amounts      IN VARCHAR2,
                        p_List_Of_Amount_Ccys  IN VARCHAR2,
                        p_Acc_Lookup           IN Olpkss_Accounting.Tbl_Lookup,
                        p_Transaction_Code     IN Oltbs_Handoff.Trn_Code%TYPE,
                        p_Listofind            IN VARCHAR2, --25-JAN-2002 FCC3.9
                        p_Handoff              IN OUT Olpkss_Accounting.Tbl_Achoff, --25-JAN-2002 FCC3.9
                        p_Passentry            IN BOOLEAN, --29-JAN-2002 FCC3.9
                        p_Error_Code           IN OUT VARCHAR2,
                        p_Error_Parameter      IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Acc_Entry(p_Contract_Ref_No       IN Oltbs_Contract.Contract_Ref_No%TYPE,
                        p_Current_Event_Seq_No  IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                        p_Event_Code            IN Oltbs_Contract.Curr_Event_Code%TYPE,
                        p_Contract_Maturity     IN BOOLEAN,
                        p_Handoff_Action_Code   IN CHAR,
                        p_Value_Date            IN DATE,
                        p_List_Of_Amount_Tags   IN VARCHAR2,
                        p_List_Of_Amounts       IN VARCHAR2,
                        p_List_Of_Amount_Ccys   IN VARCHAR2,
                        p_Acc_Lookup            IN Olpkss_Accounting.Tbl_Lookup,
                        p_Transaction_Code      IN Oltbs_Handoff.Trn_Code%TYPE,
                        p_List_Of_Withhold_Tags IN VARCHAR2,
                        p_List_Of_Suppress_Tags IN VARCHAR2,
                        p_Error_Code            IN OUT VARCHAR2,
                        p_Error_Parameter       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  --25-jan-2002 fcc3.9
  FUNCTION Fn_Acc_Entry(p_Contract_Ref_No       IN Oltbs_Contract.Contract_Ref_No%TYPE,
                        p_Current_Event_Seq_No  IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                        p_Event_Code            IN Oltbs_Contract.Curr_Event_Code%TYPE,
                        p_Contract_Maturity     IN BOOLEAN,
                        p_Handoff_Action_Code   IN CHAR,
                        p_Value_Date            IN DATE,
                        p_List_Of_Amount_Tags   IN VARCHAR2,
                        p_List_Of_Amounts       IN VARCHAR2,
                        p_List_Of_Amount_Ccys   IN VARCHAR2,
                        p_Acc_Lookup            IN Olpkss_Accounting.Tbl_Lookup,
                        p_Transaction_Code      IN Oltbs_Handoff.Trn_Code%TYPE,
                        p_List_Of_Withhold_Tags IN VARCHAR2,
                        p_List_Of_Suppress_Tags IN VARCHAR2,
                        p_Listofind             IN VARCHAR2,
                        p_Handoff               IN OUT Olpkss_Accounting.Tbl_Achoff,
                        p_Passentry             IN BOOLEAN, --29-JAN-2002 FCC3.9
                        p_Error_Code            IN OUT VARCHAR2,
                        p_Error_Parameter       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --OBCL_14.5_RuleBasedAccounting >> Declared below variable
  PCONTRACT_REF_NO    oltb_contract.CONTRACT_REF_NO%type;

  FUNCTION Fn_Lookup_Entry(p_Product             IN Oltbs_Contract.Product_Code%TYPE,
                           p_Event_Code          IN Oltbs_Contract.Curr_Event_Code%TYPE,
                           p_User_Defined_Status IN Oltbs_Contract.User_Defined_Status%TYPE,
                           p_Acc_Lookup          OUT Olpkss_Accounting.Tbl_Lookup,
                           p_Error_Code          IN OUT VARCHAR2,
                           p_Error_Parameter     IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Product_Level_Entry(p_Transaction_Ref_No  IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                  p_Event_Code          IN Oltbs_Contract.Curr_Event_Code%TYPE,
                                  p_Handoff_Action_Code IN CHAR,
                                  p_Value_Date          IN DATE,
                                  p_List_Of_Amount_Tags IN VARCHAR2,
                                  p_List_Of_Amounts     IN VARCHAR2,
                                  p_List_Of_Amount_Ccys IN VARCHAR2,
                                  p_Branch              IN Oltbs_Contract.Branch%TYPE,
                                  p_Module              IN Oltbs_Contract.Module_Code%TYPE,
                                  p_Acc_Lookup          IN Olpkss_Accounting.Tbl_Lookup,
                                  p_Error_Code          IN OUT VARCHAR2,
                                  p_Error_Parameter     IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Reverse_Acc_Entry(p_Contract_Ref_No      IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                p_Current_Event_Seq_No IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                                p_Event_Code           IN Oltbs_Contract.Curr_Event_Code%TYPE,
                                p_Handoff_Action_Code  IN CHAR,
                                p_List_Of_Amount_Tags  IN VARCHAR2,
                                p_Error_Code           IN OUT VARCHAR2,
                                p_Error_Parameter      IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Reverse_Acc_Entry(p_Contract_Ref_No       IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                p_Current_Event_Seq_No  IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                                p_Reversed_Event_Seq_No IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                                p_Event_Code            IN Oltbs_Contract.Curr_Event_Code%TYPE,
                                p_Handoff_Action_Code   IN CHAR,
                                p_List_Of_Amount_Tags   IN VARCHAR2,
                                p_Error_Code            IN OUT VARCHAR2,
                                p_Error_Parameter       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  TYPE Rec_Accrole_Xfer IS RECORD(
    Status             Oltbs_Contract.User_Defined_Status%TYPE,
    Event              Oltms_Product_Event_Acct_Entry.Event_Code%TYPE,
    Accrole            Oltms_Product_Event_Acct_Entry.Account_Role_Code%TYPE,
    Amount_Tag         Oltms_Product_Event_Acct_Entry.Amt_Tag%TYPE,
    Flip_Dr_Cr_Ind     CHAR(1),
    Hoff_Amount_Tag    Oltbs_Handoff.Amount_Tag%TYPE,
    Amount             Oltbs_Handoff.Fcy_Amount%TYPE,
    Amount_Currency    Oltbs_Handoff.Ac_Ccy%TYPE,
    Pnl_Hist_Ind       CHAR(1), --25-JAN-2002  FCC3.9 LATAM
    From_To_Status     VARCHAR2(1), --Fcc4.3 Aug 2003 related changes..dhinker
    Unit_Level_Balance VARCHAR2(1),
    --FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-113 START
 -- reversal_gl sttm_core_glmaster.gl_code%TYPE -- FCC4.3.1 10-OCT-2003 --VB commented on 20-JUL-2005 for CITIUS for GL length changes,Till#113
    --  reversal_gl    gltms_glmaster.gl_code%TYPE  --VB added on 20-JUL-2005 for CITIUS for GL length changes,Till#113.
    Reversal_Gl Oltb_Account.Ac_Gl_No%TYPE
    --FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-113 end
    );

  TYPE Tbl_Accrole_Xfer IS TABLE OF Rec_Accrole_Xfer INDEX BY BINARY_INTEGER;

  TYPE Rec_Reval_Tfr IS RECORD(
    From_Status      Oltms_Product_Status_Master.Status%TYPE,
    To_Status        Oltms_Product_Status_Master.Status%TYPE,
    From_Stat_Gl     Oltms_Product_Accrole.Account_Head%TYPE,
    To_Stat_Gl       Oltms_Product_Accrole.Account_Head%TYPE,
    From_Stat_Glsl   Oltms_Reval_Setup.Glsl%TYPE,
    To_Stat_Glsl     Oltms_Reval_Setup.Glsl%TYPE,
    Transaction_Code Oltms_Product_Event_Acct_Entry.Transaction_Code%TYPE,
    Mis_Head         Oltms_Product_Event_Acct_Entry.Mis_Head%TYPE,
    Gaap_Indicator   Oltms_Product_Event_Acct_Entry.Gaap_Indicator%TYPE,
    Component_Ccy    Oltbs_Handoff.Ac_Ccy%TYPE);

  TYPE Ty_Reval_Tfr IS TABLE OF Rec_Reval_Tfr INDEX BY VARCHAR2(500);

  FUNCTION Fn_Pass_Transfer_Entry(p_Branch               IN Oltbs_Contract.Branch%TYPE,
                                  p_Module               IN Oltbs_Contract.Module_Code%TYPE,
                                  p_Product              IN Oltbs_Contract.Product_Code%TYPE,
                                  p_Contract_Ref_No      IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                  p_Current_Event_Seq_No IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                                  p_Event_Code           IN Oltbs_Contract.Curr_Event_Code%TYPE,
                                  p_Customer             IN Oltbs_Contract.Counterparty%TYPE,
                                  p_Handoff_Action_Code  IN CHAR,
                                  p_Value_Date           IN DATE,
                                  p_Accrole_Xfer         IN Tbl_Accrole_Xfer,
                                  p_Transaction_Code     IN Oltbs_Handoff.Trn_Code%TYPE,
                                  p_Error_Code           IN OUT VARCHAR2,
                                  p_Error_Parameter      IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Charge_Referral(p_Contract_Ref_No        IN Oltbs_Contract.Contract_Ref_No%TYPE,
                              p_Current_Event_Seq_No   IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                              p_List_Of_Cf_Amount_Tags IN OUT VARCHAR2,
                              p_List_Of_Cf_Amounts     IN OUT VARCHAR2,
                              p_List_Of_Cf_Amount_Ccys IN OUT VARCHAR2,
                              p_Error_Code             IN OUT VARCHAR2,
                              p_Error_Parameter        IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Tax_Referral(p_Contract_Ref_No        IN Oltbs_Contract.Contract_Ref_No%TYPE,
                           p_Current_Event_Seq_No   IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                           p_List_Of_Tx_Amount_Tags IN OUT VARCHAR2,
                           p_List_Of_Tx_Amounts     IN OUT VARCHAR2,
                           p_List_Of_Tx_Amount_Ccys IN OUT VARCHAR2,
                           p_Error_Code             IN OUT VARCHAR2,
                           p_Error_Parameter        IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Settlement_Referral(p_Contract_Ref_No         IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                  p_Current_Event_Seq_No    IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                                  p_List_Of_Is_Amount_Tags  IN OUT VARCHAR2,
                                  p_List_Of_Is_Branches     OUT VARCHAR2,
                                  p_List_Of_Is_Accounts     OUT VARCHAR2,
                                  p_List_Of_Is_Account_Ccys OUT VARCHAR2,
                                  p_List_Of_Is_Exch_Rates   OUT VARCHAR2,
                                  p_List_Of_Is_Instruments  OUT VARCHAR2,
                                  p_Error_Code              IN OUT VARCHAR2,
                                  p_Error_Parameter         IN OUT VARCHAR2)
    RETURN BOOLEAN;

  --
  -- FPAM Changes Start, Overloaded the FUNCTION with p_list_of_is_amounts
  --
  FUNCTION Fn_Settlement_Referral(p_Contract_Ref_No         IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                  p_Current_Event_Seq_No    IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                                  p_List_Of_Is_Amount_Tags  IN OUT VARCHAR2,
                                  p_List_Of_Is_Branches     OUT VARCHAR2,
                                  p_List_Of_Is_Accounts     OUT VARCHAR2,
                                  p_List_Of_Is_Account_Ccys OUT VARCHAR2,
                                  p_List_Of_Is_Exch_Rates   OUT VARCHAR2,
                                  p_List_Of_Is_Amounts      OUT VARCHAR2,
                                  p_List_Of_Is_Instruments  OUT VARCHAR2,
                                  p_Error_Code              IN OUT VARCHAR2,
                                  p_Error_Parameter         IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --
  -- FPAM Changes END
  --

  --
  --FCC4.3 AUG 2003 A/c netting changes start
  --Overloaded the function with p_list_of_is_msg_nettable
  --
  FUNCTION Fn_Settlement_Referral(p_Contract_Ref_No      IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                  p_Current_Event_Seq_No IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                                  --FCC 4.3 MM Module changes..
                                  p_Product           IN Oltbs_Contract.Product_Code%TYPE,
                                  p_Module            IN Oltbs_Contract.Module_Code%TYPE,
                                  p_Event_Code        IN Oltm_Product_Event_Acct_Entry.Event_Code%TYPE,
                                  p_Contract_Maturity IN BOOLEAN,
                                  --p_deal_type      IN    VARCHAR2,--OLTB_CONTRACT_MASTER.deal_type%TYPE,
                                  --FCC 4.3 MM Module changes..
                                  p_List_Of_Is_Amount_Tags  IN OUT VARCHAR2,
                                  p_List_Of_Is_Branches     OUT VARCHAR2,
                                  p_List_Of_Is_Accounts     OUT VARCHAR2,
                                  p_List_Of_Is_Account_Ccys OUT VARCHAR2,
                                  p_List_Of_Is_Exch_Rates   OUT VARCHAR2,
                                  p_List_Of_Is_Amounts      OUT VARCHAR2,
                                  p_List_Of_Is_Instruments  OUT VARCHAR2,
                                  p_List_Of_Is_Msg_Nettable OUT VARCHAR2,
                                  p_Error_Code              IN OUT VARCHAR2,
                                  p_Error_Parameter         IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --OBCL_14.1_Split_stl Changes Starts
  FUNCTION Fn_Split_Settlement_Referral(p_Contract_Ref_No         IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                        p_Current_Event_Seq_No    IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                                        p_Product                 IN Oltbs_Contract.Product_Code%TYPE,
                                        p_Module                  IN Oltbs_Contract.Module_Code%TYPE,
                                        p_Event_Code              IN Oltm_Product_Event_Acct_Entry.Event_Code%TYPE,
                                        p_Contract_Maturity       IN BOOLEAN,
                                        p_List_Of_Is_Amount_Tags  IN OUT VARCHAR2,
                                        p_List_Of_Is_Branches     OUT VARCHAR2,
                                        p_List_Of_Is_Accounts     OUT VARCHAR2,
                                        p_List_Of_Is_Account_Ccys OUT VARCHAR2,
                                        p_List_Of_Is_Exch_Rates   OUT VARCHAR2,
                                        p_List_Of_Is_Amounts      OUT VARCHAR2,
                                        p_List_Of_Is_Instruments  OUT VARCHAR2,
                                        p_List_Of_Is_Msg_Nettable OUT VARCHAR2,
                                        p_Split_Ratio_List        OUT VARCHAR2,
                                        p_Basis_Tag_List          OUT VARCHAR2,
										p_Net_Ind_List            OUT VARCHAR2,
                                        p_Split_Stl               OUT VARCHAR2,
                                        p_Error_Code              IN OUT VARCHAR2,
                                        p_Error_Parameter         IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --OBCL_14.1_Split_stl Changes Ends
  FUNCTION Fn_Compute_Lcy_Equivalent(p_Amount_Tag             IN Oltbs_Handoff.Amount_Tag%TYPE,
                                     p_Rounded_Tag_Amount     IN Oltbs_Handoff.Fcy_Amount%TYPE,
                                     p_Tag_Amount_Ccy         IN Oltbs_Handoff.Ac_Ccy%TYPE,
                                     p_Settlement_Ccy         IN Oltbs_Handoff.Ac_Ccy%TYPE,
                                     p_Settlement_Exch_Rate   IN OUT Oltbs_Handoff.Exch_Rate%TYPE,
                                     p_List_Of_Inc_Exp_Tags   IN VARCHAR2,
                                     p_List_Of_Is_Amount_Tags IN VARCHAR2,
                                     p_Settlement_Amount      IN OUT Oltbs_Handoff.Fcy_Amount%TYPE,
                                     p_Lcy_Equivalent         IN OUT Oltbs_Handoff.Lcy_Amount%TYPE,
                                     p_Lcy_Exch_Rate          IN OUT Oltbs_Handoff.Exch_Rate%TYPE,
                                     p_Related_Fcy            IN OUT Oltbs_Handoff.Ac_Ccy%TYPE,
                                     p_Error_Code             IN OUT VARCHAR2,
                                     p_Error_Parameter        IN OUT VARCHAR2)
    RETURN BOOLEAN;

  --
  -- FPAM Changes Start, Overloaded the FUNCTION with p_module AND 
  -- p_am_settlement_amount FOR AM module
  --
  FUNCTION Fn_Compute_Lcy_Equivalent(p_Module                 IN Oltbs_Contract.Module_Code%TYPE,
                                     p_Amount_Tag             IN Oltbs_Handoff.Amount_Tag%TYPE,
                                     p_Rounded_Tag_Amount     IN Oltbs_Handoff.Fcy_Amount%TYPE,
                                     p_Am_Settlement_Amount   IN Oltbs_Handoff.Fcy_Amount%TYPE,
                                     p_Tag_Amount_Ccy         IN Oltbs_Handoff.Ac_Ccy%TYPE,
                                     p_Settlement_Ccy         IN Oltbs_Handoff.Ac_Ccy%TYPE,
                                     p_Settlement_Exch_Rate   IN OUT Oltbs_Handoff.Exch_Rate%TYPE,
                                     p_List_Of_Inc_Exp_Tags   IN VARCHAR2,
                                     p_List_Of_Is_Amount_Tags IN VARCHAR2,
                                     p_Settlement_Amount      IN OUT Oltbs_Handoff.Fcy_Amount%TYPE,
                                     p_Lcy_Equivalent         IN OUT Oltbs_Handoff.Lcy_Amount%TYPE,
                                     p_Lcy_Exch_Rate          IN OUT Oltbs_Handoff.Exch_Rate%TYPE,
                                     p_Related_Fcy            IN OUT Oltbs_Handoff.Ac_Ccy%TYPE,
                                     p_Error_Code             IN OUT VARCHAR2,
                                     p_Error_Parameter        IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --
  -- FPAM Changes END
  --

  FUNCTION Fn_Get_Settlement_Details(p_Amount_Tag              IN Oltms_Product_Event_Acct_Entry.Amt_Tag%TYPE,
                                     p_List_Of_Is_Amount_Tags  IN VARCHAR2,
                                     p_List_Of_Is_Branches     IN VARCHAR2,
                                     p_List_Of_Is_Accounts     IN VARCHAR2,
                                     p_List_Of_Is_Account_Ccys IN VARCHAR2,
                                     p_List_Of_Is_Exch_Rates   IN VARCHAR2,
                                     p_List_Of_Is_Instruments  IN VARCHAR2,
                                     p_Account_Branch          OUT Oltbs_Handoff.Ac_Branch%TYPE,
                                     p_Account                 OUT Oltbs_Handoff.Ac_No%TYPE,
                                     p_Account_Ccy             OUT Oltbs_Handoff.Ac_Ccy%TYPE,
                                     p_Settlement_Exch_Rate    OUT Oltbs_Handoff.Exch_Rate%TYPE,
                                     p_Instrument_Code         OUT Oltbs_Handoff.Instrument_Code%TYPE,
                                     p_Error_Code              IN OUT VARCHAR2,
                                     p_Error_Parameter         IN OUT VARCHAR2)
    RETURN BOOLEAN;

  --
  -- FPAM Changes Start, Overloaded the FUNCTION with p_list_of_is_amounts 
  -- AND p_settlement_amount FOR AM module
  --
  FUNCTION Fn_Get_Settlement_Details(p_Amount_Tag              IN Oltms_Product_Event_Acct_Entry.Amt_Tag%TYPE,
                                     p_List_Of_Is_Amount_Tags  IN VARCHAR2,
                                     p_List_Of_Is_Branches     IN VARCHAR2,
                                     p_List_Of_Is_Accounts     IN VARCHAR2,
                                     p_List_Of_Is_Account_Ccys IN VARCHAR2,
                                     p_List_Of_Is_Exch_Rates   IN VARCHAR2,
                                     p_List_Of_Is_Amounts      IN VARCHAR2,
                                     p_List_Of_Is_Instruments  IN VARCHAR2,
                                     p_Account_Branch          OUT Oltbs_Handoff.Ac_Branch%TYPE,
                                     p_Account                 OUT Oltbs_Handoff.Ac_No%TYPE,
                                     p_Account_Ccy             OUT Oltbs_Handoff.Ac_Ccy%TYPE,
                                     p_Settlement_Exch_Rate    OUT Oltbs_Handoff.Exch_Rate%TYPE,
                                     p_Settlement_Amount       OUT Oltbs_Handoff.Fcy_Amount%TYPE,
                                     p_Instrument_Code         OUT Oltbs_Handoff.Instrument_Code%TYPE,
                                     p_Error_Code              IN OUT VARCHAR2,
                                     p_Error_Parameter         IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --
  -- FPAM Changes END
  --

  -- FCC4.3 AUG 2003 A/c netting Changes start 
  -- Overloaded the function with p_list_of_is_msg_nettable and p_msg_nettable
  --
  FUNCTION Fn_Get_Settlement_Details(p_Amount_Tag              IN Oltms_Product_Event_Acct_Entry.Amt_Tag%TYPE,
                                     p_List_Of_Is_Amount_Tags  IN VARCHAR2,
                                     p_List_Of_Is_Branches     IN VARCHAR2,
                                     p_List_Of_Is_Accounts     IN VARCHAR2,
                                     p_List_Of_Is_Account_Ccys IN VARCHAR2,
                                     p_List_Of_Is_Exch_Rates   IN VARCHAR2,
                                     p_List_Of_Is_Amounts      IN VARCHAR2,
                                     p_List_Of_Is_Instruments  IN VARCHAR2,
                                     p_List_Of_Is_Msg_Nettable IN VARCHAR2,
                                     p_Account_Branch          OUT Oltbs_Handoff.Ac_Branch%TYPE,
                                     p_Account                 OUT Oltbs_Handoff.Ac_No%TYPE,
                                     p_Account_Ccy             OUT Oltbs_Handoff.Ac_Ccy%TYPE,
                                     p_Settlement_Exch_Rate    OUT Oltbs_Handoff.Exch_Rate%TYPE,
                                     p_Settlement_Amount       OUT Oltbs_Handoff.Fcy_Amount%TYPE,
                                     p_Instrument_Code         OUT Oltbs_Handoff.Instrument_Code%TYPE,
                                     p_Msg_Nettable            OUT Oltbs_Settlements.Msg_Nettable%TYPE,
                                     p_Error_Code              IN OUT VARCHAR2,
                                     p_Error_Parameter         IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --
  -- FCC4.3 AUG 2003 A/c netting Changes end
  --

  FUNCTION Fn_Handoff_Entry(p_Module               IN Oltbs_Contract.Module_Code%TYPE,
                            p_Contract_Ref_No      IN Oltbs_Contract.Contract_Ref_No%TYPE,
                            p_Current_Event_Seq_No IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                            p_Handoff_Action_Code  IN CHAR,
                            p_Acc_Hoff             IN OUT Olpkss_Accounting.Tbl_Achoff,
                            p_Error_Code           IN OUT VARCHAR2,
                            p_Error_Parameter      IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Process_Entry(p_Contract_Ref_No       IN Oltbs_Contract.Contract_Ref_No%TYPE,
                            p_Current_Event_Seq_No  IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                            p_Event_Code            IN Oltbs_Contract.Curr_Event_Code%TYPE,
                            p_Contract_Maturity     IN BOOLEAN,
                            p_Handoff_Action_Code   IN CHAR,
                            p_Value_Date            IN DATE,
                            p_List_Of_Amount_Tags   IN VARCHAR2,
                            p_List_Of_Amounts       IN VARCHAR2,
                            p_List_Of_Amount_Ccys   IN VARCHAR2,
                            p_Branch                IN Oltbs_Contract.Branch%TYPE,
                            p_Module                IN Oltbs_Contract.Module_Code%TYPE,
                            p_Customer              IN Oltbs_Contract.Counterparty%TYPE,
                            p_Contract_Ccy          IN Oltbs_Contract.Contract_Ccy%TYPE,
                            p_Broker                IN Bktms_Brmaster.Broker%TYPE,
                            p_Acc_Lookup            IN Olpkss_Accounting.Tbl_Lookup,
                            p_Transaction_Code      IN Oltbs_Handoff.Trn_Code%TYPE,
                            p_List_Of_Withhold_Tags IN VARCHAR2,
                            p_List_Of_Suppress_Tags IN VARCHAR2,
                            p_Error_Code            IN OUT VARCHAR2,
                            p_Error_Parameter       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  --FCC3.9 overloaded
  FUNCTION Fn_Process_Entry(p_Contract_Ref_No       IN Oltbs_Contract.Contract_Ref_No%TYPE,
                            p_Current_Event_Seq_No  IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                            p_Event_Code            IN Oltbs_Contract.Curr_Event_Code%TYPE,
                            p_Contract_Maturity     IN BOOLEAN,
                            p_Handoff_Action_Code   IN CHAR,
                            p_Value_Date            IN DATE,
                            p_List_Of_Amount_Tags   IN VARCHAR2,
                            p_List_Of_Amounts       IN VARCHAR2,
                            p_List_Of_Amount_Ccys   IN VARCHAR2,
                            p_Branch                IN Oltbs_Contract.Branch%TYPE,
                            p_Module                IN Oltbs_Contract.Module_Code%TYPE,
                            p_Customer              IN Oltbs_Contract.Counterparty%TYPE,
                            p_Contract_Ccy          IN Oltbs_Contract.Contract_Ccy%TYPE,
                            p_Broker                IN Bktms_Brmaster.Broker%TYPE,
                            p_Acc_Lookup            IN Olpkss_Accounting.Tbl_Lookup,
                            p_Transaction_Code      IN Oltbs_Handoff.Trn_Code%TYPE,
                            p_List_Of_Withhold_Tags IN VARCHAR2,
                            p_List_Of_Suppress_Tags IN VARCHAR2,
                            p_Listofind             IN VARCHAR2, --25-JAN-2002 FCC3.9 LATAM
                            p_Handoff               IN OUT Olpkss_Accounting.Tbl_Achoff, --25-JAN-2002 FCC3.9 LATAM
                            p_Passentry             IN BOOLEAN, --25-JAN-2002  FCC3.9 LATAM
                            p_Error_Code            IN OUT VARCHAR2,
                            p_Error_Parameter       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Reverse_Acc_Entry(p_Contract_Ref_No       IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                p_Current_Event_Seq_No  IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                                p_Reversed_Event_Seq_No IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                                p_Event_Code            IN Oltbs_Contract.Curr_Event_Code%TYPE,
                                p_Handoff_Action_Code   IN CHAR,
                                p_List_Of_Amount_Tags   IN VARCHAR2,
                                p_Module                IN Oltbs_Contract.Module_Code%TYPE,
                                p_Customer              IN Oltbs_Contract.Counterparty%TYPE,
                                p_Error_Code            IN OUT VARCHAR2,
                                p_Error_Parameter       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  -- 01-JULY-2003 FCC 4.3 AUG 2003 Development Requirements Start.

  FUNCTION Fn_Reverse_Acc_Entry(p_Contract_Ref_No      IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                p_Current_Event_Seq_No IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                                p_Event_Code           IN Oltbs_Contract.Curr_Event_Code%TYPE,
                                p_Handoff_Action_Code  IN CHAR,
                                p_List_Of_Amount_Tags  IN VARCHAR2,
                                p_Trantype             IN Oltms_Trn_Type.Trn_Type%TYPE,
                                p_Error_Code           IN OUT VARCHAR2,
                                p_Error_Parameter      IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Reverse_Acc_Entry(p_Contract_Ref_No       IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                p_Current_Event_Seq_No  IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                                p_Reversed_Event_Seq_No IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                                p_Event_Code            IN Oltbs_Contract.Curr_Event_Code%TYPE,
                                p_Handoff_Action_Code   IN CHAR,
                                p_List_Of_Amount_Tags   IN VARCHAR2,
                                p_Trantype              IN Oltms_Trn_Type.Trn_Type%TYPE,
                                p_Error_Code            IN OUT VARCHAR2,
                                p_Error_Parameter       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Reverse_Acc_Entry(p_Contract_Ref_No       IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                p_Current_Event_Seq_No  IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                                p_Reversed_Event_Seq_No IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                                p_Event_Code            IN Oltbs_Contract.Curr_Event_Code%TYPE,
                                p_Handoff_Action_Code   IN CHAR,
                                p_List_Of_Amount_Tags   IN VARCHAR2,
                                p_Module                IN Oltbs_Contract.Module_Code%TYPE,
                                p_Customer              IN Oltbs_Contract.Counterparty%TYPE,
                                p_Trantype              IN Oltms_Trn_Type.Trn_Type%TYPE,
                                p_Error_Code            IN OUT VARCHAR2,
                                p_Error_Parameter       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  -- 01-JULY-2003 FCC 4.3 AUG 2003 Development Requirements END.

  --
  -- 27-Oct-2003 fcc 4.4 dec 2003 fast settlement changes start
  --
  FUNCTION Fn_Fast_Settlement_Referral(p_Contract_Ref_No         IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                       p_Product                 IN Oltbs_Contract.Product_Code%TYPE,
                                       p_Module                  IN Oltbs_Contract.Module_Code%TYPE,
                                       p_Event_Code              IN Oltm_Product_Event_Acct_Entry.Event_Code%TYPE,
                                       p_Contract_Maturity       IN BOOLEAN,
                                       p_List_Of_Is_Amount_Tags  IN OUT VARCHAR2,
                                       p_List_Of_Is_Branches     IN OUT VARCHAR2,
                                       p_List_Of_Is_Accounts     IN OUT VARCHAR2,
                                       p_List_Of_Is_Account_Ccys IN OUT VARCHAR2,
                                       p_List_Of_Is_Exch_Rates   IN OUT VARCHAR2,
                                       p_List_Of_Is_Amount       IN OUT VARCHAR2,
                                       p_List_Of_Is_Msg_Nettable IN OUT VARCHAR2,
                                       p_List_Of_Is_Instr_Code   IN OUT VARCHAR2,
                                       p_List_Of_Value_Date      IN OUT VARCHAR2,
                                       p_List_Of_Instr_Sts       IN OUT VARCHAR2,
                                       p_List_Of_Receiver        IN OUT VARCHAR2,
                                       p_List_Of_Acc_Cif         IN OUT VARCHAR2,
                                       p_List_Of_Amount_Ccys     IN OUT VARCHAR2,
                                       p_Error_Code              IN OUT VARCHAR2,
                                       p_Error_Parameter         IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --
  -- 27-Oct-2003 fcc 4.4 dec 2003 fast settlement changes End
  --

  -- FCC 4.6.1 JAN 2005 EIM Enhancements changes start
  FUNCTION Fn_Compute_Lcy_Equivalent(p_Module                 IN Oltbs_Contract.Module_Code%TYPE,
                                     p_Amount_Tag             IN OUT Oltbs_Handoff.Amount_Tag%TYPE,
                                     p_Rounded_Tag_Amount     IN OUT Oltbs_Handoff.Fcy_Amount%TYPE,
                                     p_Am_Settlement_Amount   IN Oltbs_Handoff.Fcy_Amount%TYPE,
                                     p_Tag_Amount_Ccy         IN OUT Oltbs_Handoff.Ac_Ccy%TYPE,
                                     p_Settlement_Ccy         IN OUT Oltbs_Handoff.Ac_Ccy%TYPE,
                                     p_Settlement_Exch_Rate   IN OUT Oltbs_Handoff.Exch_Rate%TYPE,
                                     p_List_Of_Inc_Exp_Tags   IN VARCHAR2,
                                     p_List_Of_Is_Amount_Tags IN VARCHAR2,
                                     p_Settlement_Amount      IN OUT Oltbs_Handoff.Fcy_Amount%TYPE,
                                     p_Lcy_Equivalent         IN OUT Oltbs_Handoff.Lcy_Amount%TYPE,
                                     p_Lcy_Exch_Rate          IN OUT Oltbs_Handoff.Exch_Rate%TYPE,
                                     p_Related_Fcy            IN OUT Oltbs_Handoff.Ac_Ccy%TYPE,
                                     p_Cnt_Ccy                IN VARCHAR2, -- This parameter provides the contract currency
                                     p_Chg_Amt_In_Cnt_Ccy     IN VARCHAR2, -- This parameter provides the charge amount in contract currency
                                     p_Current_Event_Seq_No   IN VARCHAR2,
                                     p_Contract_Ref_No        IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                     p_Error_Code             IN OUT VARCHAR2,
                                     p_Error_Parameter        IN OUT VARCHAR2)
    RETURN BOOLEAN;
  -- FCC 4.6.1 JAN 2005 EIM Enhancements changes end

  -- FCC 4.6.2 CITILS 04-AUG-2005 - Netting Changes Start
  FUNCTION Fn_Bridge_Acc_Replacement(p_Contract_Ref_No        IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                     p_Current_Event_Seq_No   IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                                     p_List_Of_Is_Amount_Tags IN VARCHAR2,
                                     p_List_Of_Is_Acc         IN OUT VARCHAR2,
                                     p_List_Of_Is_Branch      IN OUT VARCHAR2,
                                     p_Event_Code             IN Oltbs_Contract.Curr_Event_Code%TYPE,
                                     p_Value_Date             IN DATE,
                                     p_Errcode                IN OUT VARCHAR2,
                                     p_Errparam               IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Sync_Amount_Due(p_Contract_Ref_No      IN Oltbs_Contract.Contract_Ref_No%TYPE,
                              p_Current_Event_Seq_No IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                              p_List_Of_Amount_Tags  IN VARCHAR2,
                              p_Errcode              IN OUT VARCHAR2,
                              p_Errparam             IN OUT VARCHAR2)
    RETURN BOOLEAN;
  -- FCC 4.6.2 CITILS 04-AUG-2005 - Netting Changes End

  -- 27-MAY-2008 FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-CITIUSLD46200067 BEGIN
  FUNCTION Fn_Reverse_Acc_Entry_Renew(p_Contract_Ref_No       IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                      p_Current_Event_Seq_No  IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                                      p_Reversed_Event_Seq_No IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                                      p_Event_Code            IN Oltbs_Contract.Curr_Event_Code%TYPE,
                                      p_Handoff_Action_Code   IN CHAR,
                                      p_List_Of_Amount_Tags   IN VARCHAR2,
                                      p_Contract_Ccy          IN VARCHAR2,
                                      p_Loan_Ccy              IN VARCHAR2,
                                      p_Module                IN Oltbs_Contract.Module_Code%TYPE,
                                      p_Customer              IN Oltbs_Contract.Counterparty%TYPE,
                                      p_Trantype              IN Oltms_Trn_Type.Trn_Type%TYPE,
                                      p_Tag_Amount            IN Oltb_Contract_Master.Amount%TYPE, -- 01-JULY-2003 FCC 4.3 AUG 2003, Added p_TranType FOR the below FUNCTION
                                      p_Error_Code            IN OUT VARCHAR2,
                                      p_Error_Parameter       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --27-MAY-2008 FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS- CITIUSLD46200067 END
  -- 10-MAR-2008 FLEXCUBE V.CL Release 7.4 BAU-Lot2, LC Limit for Loans, starts
  FUNCTION Fn_Lc_Sublimit_Acc_Entry(p_Linked_To_Ref IN Oltbs_Contract_Linkages.Linked_To_Ref%TYPE,
                                    p_Date          DATE,
                                    p_Branch        IN Oltbs_Contract_Linkages.Linked_To_Branch%TYPE,
                                    p_Esn           IN Oltbs_Contract_Event_Log.Event_Seq_No%TYPE,
                                    p_Event         IN Oltbs_Contract_Event_Log.Event_Code%TYPE,
                                    p_Err_Code      IN OUT VARCHAR2,
                                    p_Err_Param     IN OUT VARCHAR2)
    RETURN BOOLEAN;
  -- 10-MAR-2008 FLEXCUBE V.CL Release 7.4 BAU-Lot2, LC Limit for Loans, ends

  --06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS Till#1386 Start By Swapnasish
  --CITIUS-LS Till#1386 Starts
  FUNCTION Fn_Lc_Sublimit_Acc_Entry(p_Linked_To_Ref IN Oltbs_Contract_Linkages.Linked_To_Ref%TYPE,
                                    p_Date          DATE,
                                    p_Branch        IN Oltbs_Contract_Linkages.Linked_To_Branch%TYPE,
                                    p_Esn           IN Oltbs_Contract_Event_Log.Event_Seq_No%TYPE,
                                    p_Event         IN Oltbs_Contract_Event_Log.Event_Code%TYPE,
                                    p_Action_Code   IN VARCHAR2, --Will be B for autho auth
                                    p_Err_Code      IN OUT VARCHAR2,
                                    p_Err_Param     IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --CITIUS-LS Till#1386 Ends
  --06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS Till#1386 End By Swapnasish
  -- OBCL_14.0_27443170 changes start
  FUNCTION Fn_Tax_Referral(p_Contract_Ref_No        IN Oltbs_Contract.Contract_Ref_No%TYPE,
                           p_Current_Event_Seq_No   IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                           p_Rule                   IN Txtbs_Txnrule.Rule%TYPE,
                           p_List_Of_Tx_Amount_Tags IN OUT VARCHAR2,
                           p_List_Of_Tx_Amounts     IN OUT VARCHAR2,
                           p_List_Of_Tx_Amount_Ccys IN OUT VARCHAR2,
                           p_Error_Code             IN OUT VARCHAR2,
                           p_Error_Parameter        IN OUT VARCHAR2)
    RETURN BOOLEAN;
  -- OBCL_14.0_27443170 changes end  

--OBCL_14.4_Contingent_Enhancements Changes
FUNCTION Fn_Pass_Residual_Contingent_For_Liqd_Cont(
															Pcontractrefno IN Oltbs_Contract.Contract_Ref_No%TYPE,
															--Peventseqno    IN Oltbs_Contract_Event_Log.Event_Seq_No%TYPE, --OBCL_14.4_Contingent_Enhancements PII
															PeventCode     IN Oltbs_Contract.Curr_Event_Code%TYPE,
															pHandoffActionCode  IN Oltbs_Contract.Auth_Status%TYPE,
															PauthStatus	   IN Oltbs_Contract.Auth_Status%TYPE,
															Pvaluedate     IN DATE,
															PContingentBal IN oltbs_contract_master.amount_financed%TYPE,
															Pcurrency      IN oltbs_contract_master.currency%TYPE,
															Perrorcode     IN OUT VARCHAR2,
															Pparam         IN OUT VARCHAR2
													)
RETURN BOOLEAN;   
  
--OBCL_14.4_CDI_CHANGES changes STARTS
FUNCTION Fn_Pass_RAPR_For_Liqd_Cont(
															Pcontractrefno IN Oltbs_Contract.Contract_Ref_No%TYPE,
															Peventseqno    IN Oltbs_Contract_Event_Log.Event_Seq_No%TYPE,
															PeventCode     IN Oltbs_Contract.Curr_Event_Code%TYPE,
															pHandoffActionCode  IN Oltbs_Contract.Auth_Status%TYPE,
															PauthStatus	   IN Oltbs_Contract.Auth_Status%TYPE,
															Pvaluedate     IN DATE,
                              p_List_Of_Amount_Tags  IN VARCHAR2,
															PContingentBal IN oltbs_contract_master.amount_financed%TYPE,
															Pcurrency      IN oltbs_contract_master.currency%TYPE,
															Perrorcode     IN OUT VARCHAR2,
															Pparam         IN OUT VARCHAR2
													)
RETURN BOOLEAN;  

END Olpks_Acc_Entry;
/
CREATE OR REPLACE Synonym Olpkss_Acc_Entry FOR Olpks_Acc_Entry
/