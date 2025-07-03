CREATE OR REPLACE PACKAGE Olpks_Rollover AS
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_rollover.SPC
  **
  ** Module    : LOANS And DEPOSITS
  **
    This source is part of the Oracle Banking Corporate Lending  Software Product.   
    Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
    No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
  
    Oracle Financial Services Software Limited.
    Oracle Park, Off Western Express Highway,
    Goregaon (East), 
    Mumbai - 400 063, India.
  ----------------------------------------------------------------------------------------------------
  */
  /*------------------------------CHANGE HISTORY--------------------------------
  
  11-APR-2002 .   FCC 4.0 june 02 Rollover Changes.
         Added Three fields in Type Constuct_struct is Record.
  
  12-NOV-2002   FCC4.2 Feb 2003 ASPAC TIL #2015 New field ROLL BY added for contract roll over in oltbs_contract_rollover.
  
  13-DEC-2002    FCC4.2 APR 2003 CITIPLC changes for Rollover
        - Added maturity_days, roll_mechanism and roll_method to Contract_struct
  26-MAY-2003  FCC 4.2 OPS focus testing SFR 157 changes  
  
  28-JUL-2003     FCC 4.3 MM MODULE CHANGES..
  
  29-JUL-2003  FCC 4.3 added new column,cluster_id' in the record 'contract_struct' (MM rollover related changes).
  
  27-OCT-2003   FCC 4.4 DEC 2003 RETRO CITIPLC SFR#PLC43050031 Added for missiong SFR#PLC4007055. To capture the principal_outstanding_bal in contract_struct.
              This is reqd for finding out the LINK/DLNK amount during the
              rollover of a loan.
              Moved the change history to come after the "create or replace package..."
  09-Apr-2004   FCC 4.5 Lot2 Retro changes
            1. Copyright and Change History moved below CREATE OR REPLACE command.  
            2. SHO ERR added at the end of the package.
            3. Ampersand symbol in Copyright clause removed.
  30-JUL-2004  FCC 4.6 Sep04 Retro (India) Tide statement related changes to populate tax_roll_amt and tax_liqd_amt in ldpks_roll_contract_details
  30-JUL-2004   FCC 4.6 Sep04 Retro (India) Tax Deduction on Over Night Deposits : Changed the product_struct to add tax related flags
  18-JAN-2010 FLEXCUBE V.CL Release 7.6 CITIPBG TD Changes, amount due is wrongly populated after New version rollover.
  29-Mar-2010 FLEXCUBE V.CL Release 7.6 FS Tag04 Participant Netting Changes
  14-JUN-2010 FLEXCUBE V.CL Release 7.7 CITIPBG Loan Vol1 Tag5 Changes, moved fn_calculate_rollover_amounts to spc for TD projection
  14-JUN-2010 FLEXCUBE V.CL Release 7.7 CITIPBG Loan Vol1 Tag7 Changes, g_old_mat_date created to fix vdbal issue during prepayment after maturity date 
  04-OCT-2016 OFCL 12.2 -- Negative Interest Rate changes
  07-APR-2017 OFCL 12.4 changes -Added function fn_compute_eca_for_rollover to compute amount to be requested as part of ECA.Search string :OFCL12.4 changes
  
  Changed By         : Pallavi R
  Date               : 16-Mar-2018
  Change Description : OBCL_14.0.0.0.0_External_Call Changes
  Search String      : OBCL_14.0.0.0.0_External_Call Changes  
  
  **SFR Number         : 29583925   
**Changed By         : Arvind Baskar
**Change Description : Hooks provided for fn_roll_a_contract_over 
**Search String      : Bug#29583925  
   **Changed By         : Vigneshram S
   **Date               : 27-Dec-2019
   **Change Description : OL Payment residual amount waiver for rollover liquidation
   **Search String      : OBCL_14.4_RESD Changes

  **Changed By         : Satheesh Seshan
  **Date               : 18-Oct-2021
  **Change Description : Special amt in OLDCOROL Consol roll-Non revolv commitment balance update for additional DSBR
  **Search String      : BUG#33470187   
  
   **Changed By         : Vineeth T M
**Date               : 30-Jul-2024
**Change Description : OBCL_14.8_VER_ROL Changes
**Search String      : OBCL_14.8_VER_ROL Changes 
  ---------------------------------------------------------------------------------------------------
  */
  
  

  g_Call_To_Fix_Rollover VARCHAR2(1) := 'N'; --18-JAN-2010 FLEXCUBE V.CL Release 7.6 CITIPBG TD Changes
  g_Old_Mat_Date         DATE := NULL; --14-JUN-2010 FLEXCUBE V.CL Release 7.7 CITIPBG Loan Vol1 Tag7 Changes
  g_Call_To_Roll_Resd VARCHAR2(1) := 'N';--OBCL_14.4_RESD changes
  g_consol_rol_prin_liqd_amt oltbs_amount_due.amount_due%type; --BUG#33470187 added
   --OBCL_14.8_VER_ROL Changes start
  g_ver_roll_instr_capt varchar2(1) := 'N';
  G_ROLL_SRC_REF_NO     Oltb_Contract_Version_Roll.roll_src_ref_no%type;
  --OBCL_14.8_VER_ROL Changes end
  --Bug#29583925   changes start
  PROCEDURE Pr_Skip_Handler(P_Stage IN VARCHAR2);
  PROCEDURE Pr_Set_Skip_Kernel;
  PROCEDURE Pr_Set_Activate_Kernel;
  PROCEDURE Pr_Set_Skip_Cluster;
  PROCEDURE Pr_Set_Activate_Cluster;
  FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
--Bug#29583925   changes end

  FUNCTION Fn_Roll_a_Contract_Over(p_Contract_Ref_No      IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                   p_Processing_Date      IN DATE,
                                   p_Authorization_Status IN Oltbs_Contract.Auth_Status%TYPE,
                                   p_Error_Code           IN OUT VARCHAR2,
                                   p_Error_Parameter      IN OUT VARCHAR2)
    RETURN BOOLEAN;

  -------------------------------------------------------------------------------
  TYPE Contract_Struct IS RECORD(
    Module              Oltbs_Contract.Module_Code%TYPE,
    Product             Oltbs_Contract.Product_Code%TYPE,
    Product_Type        Oltbs_Contract.Product_Type%TYPE,
    Latest_Event_Seq_No Oltbs_Contract.Latest_Event_Seq_No%TYPE,
    Latest_Version_No   Oltbs_Contract.Latest_Version_No%TYPE,
    Contract_Status     Oltbs_Contract.Contract_Status%TYPE,
    User_Defined_Status Oltbs_Contract.User_Defined_Status%TYPE,
    Customer            Oltbs_Contract.Counterparty%TYPE,
    Contract_Ccy        Oltbs_Contract.Contract_Ccy%TYPE,
    Contract_Amount     Oltbs_Contract_Master.Amount%TYPE,
    Cluster_Size        Oltbs_Contract_Master.Cluster_Size%TYPE,
    Value_Date          Oltbs_Contract_Master.Value_Date%TYPE,
    Maturity_Type       Oltbs_Contract_Master.Maturity_Type%TYPE,
    Maturity_Date       Oltbs_Contract_Master.Maturity_Date%TYPE,
    Credit_Line         Oltbs_Contract_Master.Credit_Line%TYPE,
    Payment_Method      Oltbs_Contract_Master.Payment_Method%TYPE,
    Rollover_Allowed    Oltbs_Contract_Master.Rollover_Allowed%TYPE,
    Default_Sett_Ac_Br  Oltbs_Contract_Master.Dflt_Settle_Ac_Branch%TYPE,
    Default_Sett_Ac_No  Oltbs_Contract_Master.Dflt_Settle_Ac%TYPE,
    --
    --FCC 4.2 OPS focus testing SFR 157 changes start
    --
    Lcy_Amount   Oltbs_Contract_Master.Lcy_Amount%TYPE,
    Booking_Date Oltbs_Contract_Master.Booking_Date%TYPE,
    --
    --FCC 4.2 OPS focus testing SFR 157 changes end
    --
    Primary_Iccf           Oltbs_Contract_Master.Main_Comp%TYPE,
    Primary_Iccf_Ccy       Oltbs_Contract_Iccf_Details.Component_Currency%TYPE,
    Schedule_Type          Oltbs_Contract_Preference.Contract_Schedule_Type%TYPE,
    Amortization_Type      Oltbs_Contract_Preference.Amortisation_Type%TYPE,
    Withhold_Tax_On_Capit  Oltbs_Contract_Preference.Deduct_Tax_On_Capitalisation%TYPE,
    Verify_Funds           Oltbs_Contract_Preference.Verify_Funds%TYPE,
    Mode_Of_Rollover       Oltbs_Contract_Rollover.Rollover_Type%TYPE,
    Roll_Overdue_Schedules CHAR(1),
    --max_principal_roll_amt  oltbs_contract_rollover.rollover_amt%TYPE,
    Special_Amount            Oltbs_Contract_Rollover.Rollover_Amt%TYPE, --FCC 4.0 june 02 Rollover Changes
    Roll_Amount_Type          Oltbs_Contract_Rollover.Rollover_Amount_Type%TYPE,
    Roll_Maturity_Type        Oltbs_Contract_Rollover.Maturity_Type%TYPE,
    Roll_Maturity_Date        Oltbs_Contract_Rollover.Maturity_Date%TYPE,
    Roll_Notice_Days          Oltbs_Contract_Rollover.Notice_Days%TYPE,
    Charge_On_Roll_Amt        Oltbs_Contract_Rollover.Apply_Charge%TYPE,
    Tax_On_Roll_Amt           Oltbs_Contract_Rollover.Apply_Tax%TYPE,
    Limit_Roll_Basis          CHAR(3),
    Interest_Roll_Basis       Oltbs_Contract_Rollover.Rollover_Iccf_From%TYPE,
    Schedule_Roll_Basis       Oltbs_Contract_Rollover.Schedule_Definition_Basis%TYPE,
    Treat_Spl_Amt_As          Oltbs_Contract_Rollover.Treat_Spl_Amt_As%TYPE, --FCC 4.0 june 02 Rollover Changes
    New_Components_Allowed    Oltbs_Contract_Rollover.New_Components_Allowed%TYPE, --FCC 4.0 june 02 Rollover Changes
    New_Refinancing_Rate      Oltbs_Class_Mapping.Ref_Rate%TYPE, --FCC 4.0 june 02 Rollover Changes
    Installment_Loan          Oltbs_Contract_Preference.Installment_Loan%TYPE, ---FCC 4.0 June 2002 changes
    Roll_By                   Oltbs_Contract_Rollover.Schedule_Definition_Basis%TYPE, -- FCC4.3 Feb 2003 ASPAC TIL #2015 Roll_by added.
    Maturity_Days             Oltbs_Contract_Rollover.Maturity_Days%TYPE, --FCC4.2 APR 2003 CITIPLC change for Rollover
    Roll_Mechanism            Oltbs_Contract_Master.Rollover_Mechanism%TYPE, --FCC4.2 APR 2003 CITIPLC change for Rollover
    Roll_Method               Oltbs_Contract_Master.Rollover_Method%TYPE, --FCC4.2 APR 2003 CITIPLC change for Rollover
    Limit_Track_Reqd          Oltbs_Contract_Master.Limit_Track_Reqd%TYPE, --FCC 4.3 AUG 2003 MM Module changes..
    Cluster_Id                Oltbs_Contract_Master.Cluster_Id%TYPE --FCC 4.3 Added for rollover related changes
    ,
    Principal_Outstanding_Bal Oltbs_Contract_Balance.Principal_Outstanding_Bal%TYPE --FCC 4.4 DEC 2003 RETRO CITIPLC SFR#PLC43050031
    --OFCL 12.2 CHANGES START
    ,
    Negative_Class_Code       Lftm_Product_Iccf.Negative_Class_Code%TYPE,
    Negative_Interest_Allowed Lftm_Product_Iccf.Negative_Interest_Rate_Allowed%TYPE,
    Net_Negative_Interest     Oltms_Product_Master_Ld.Net_Negative_Interest%TYPE
    --OFCL 12.2 CHANGES END
	 --OBCL_14.8_VER_ROL Changes start
    ,roll_src_ref_no           oltb_contract_version_roll.ROLL_SRC_REF_NO%type,
    roll_version_no           oltb_contract_version_roll.version_no%type,
    ver_roll_instr_capt       varchar2(1)
    --OBCL_14.8_VER_ROL Changes end
    );

  TYPE Product_Struct IS RECORD(
    Product_End_Date       Oltms_Product.Product_End_Date%TYPE,
    Track_Accrued_Interest Oltms_Product_Master_Ld.Track_Accrued_Interest%TYPE,
    Tax_Computation_Basis  Oltms_Branch_Parameters.Tax_Computation_Basis%TYPE,
    Tax_Applicable         Oltms_Product_Master_Ld.Tax_Applicable%TYPE -- FCC 4.6 Sep04 Retro (India) Tax Deduction on Over Night Deposits
    ,
    Tax_Type               Oltms_Product_Master_Ld.Tax_Type%TYPE -- FCC 4.6 Sep04 Retro (India) Tax Deduction on Over Night Deposits
    ,
    Allow_Withholding_Tax  Oltms_Branch_Parameters.Allow_Withholding_Tax%TYPE -- FCC 4.6 Sep04 Retro (India) Tax Deduction on Over Night Deposits - ITR1 SFR 154
    );

  TYPE Amount_Struct IS RECORD(
    Principal_Roll_Amt       Oltbs_Amount_Due_Cs.Amount_Due%TYPE,
    Principal_Liqd_Amt       Oltbs_Amount_Due_Cs.Amount_Due%TYPE,
    Interest_Roll_Amt        Oltbs_Amount_Due_Cs.Amount_Due%TYPE,
    Interest_Liqd_Amt        Oltbs_Amount_Due_Cs.Amount_Due%TYPE,
    Withholding_Tax          Oltbs_Amount_Due_Cs.Amount_Due%TYPE,
    Rollover_Amount          Oltbs_Amount_Due_Cs.Amount_Due%TYPE,
    Additional_Principal_Amt Oltbs_Amount_Due_Cs.Amount_Due%TYPE, --FCC 4.0 june 02 Rollover changes
    ----FCC 4.6 Sep04 Retro (India) Tide changes start
    Tax_Roll_Amt Oltbs_Amount_Due_Cs.Amount_Due%TYPE,
    Tax_Liqd_Amt Oltbs_Amount_Due_Cs.Amount_Due%TYPE,
    --FCC 4.6 Sep04 Retro (India) Tide changes end
    Nonmain_Int_Liqd_Amt Oltbs_Amount_Due_Cs.Amount_Due%TYPE --29-Mar-2010 FLEXCUBE V.CL Release 7.6 FS Tag04 Participant Netting Changes
    --OFCL 12.2 CHANGES START
    ,
    Interest_Roll_Amt_Neg Oltbs_Amount_Due_Cs.Amount_Due%TYPE,
    Interest_Liqd_Amt_Neg Oltbs_Amount_Due_Cs.Amount_Due%TYPE
    --OFCL 12.2 CHANGES END
    );

  TYPE Verify_Funds_Struct IS RECORD(
    Acc_Br          Oltbs_Handoff.Ac_Branch%TYPE,
    Acc_No          Oltbs_Handoff.Ac_No%TYPE,
    Acc_Ccy         Oltbs_Handoff.Ac_Ccy%TYPE,
    Total_Net_Debit Oltbs_Handoff.Fcy_Amount%TYPE);

  TYPE Verify_Funds_Table IS TABLE OF Verify_Funds_Struct INDEX BY BINARY_INTEGER;

  -------------------------------------------------------------------------------

  g_Halt_On_Error EXCEPTION;

  g_Halt_Error_Code      VARCHAR2(1000) := NULL;
  g_Halt_Error_Parameter VARCHAR2(1000) := NULL;

  -------------------------------------------------------------------------------

  --14-JUN-2010 FLEXCUBE V.CL Release 7.7 CITIPBG Loan Vol1 Tag5 Changes - Start
  FUNCTION Fn_Calculate_Rollover_Amounts(p_Contract_Ref_No       IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                         p_Processing_Date       IN DATE,
                                         p_Authorization_Status  IN Oltbs_Contract.Auth_Status%TYPE,
                                         Cs                      IN Contract_Struct,
                                         Ps                      IN Product_Struct,
                                         p_Acc_Lookup            IN Olpkss_Accounting.Tbl_Lookup,
                                         p_List_Of_Inc_Exp_Tags  IN VARCHAR2,
                                         p_List_Of_Is_Amt_Tags   IN VARCHAR2,
                                         p_List_Of_Is_Acc_Brs    IN VARCHAR2,
                                         p_List_Of_Is_Acc_Nos    IN VARCHAR2,
                                         p_List_Of_Is_Acc_Ccys   IN VARCHAR2,
                                         p_List_Of_Is_Exch_Rates IN VARCHAR2,
                                         p_Current_Event_Seq_No  IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                                         Amt                     IN OUT Amount_Struct,
                                         p_List_Of_Amount_Tags   IN OUT VARCHAR2,
                                         p_List_Of_Amounts       IN OUT VARCHAR2,
                                         p_List_Of_Amount_Ccys   IN OUT VARCHAR2,
                                         p_List_Of_Lcy_Equivs    IN OUT VARCHAR2,
                                         p_List_Of_Withhold_Tags IN OUT VARCHAR2,
                                         p_List_Of_Suppress_Tags IN OUT VARCHAR2,
                                         p_List_Of_Accrual_Comps IN OUT VARCHAR2,
                                         p_Error_Code            IN OUT VARCHAR2,
                                         p_Error_Parameter       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --14-JUN-2010 FLEXCUBE V.CL Release 7.7 CITIPBG Loan Vol1 Tag5 Changes - End

  --OFCL12.4 changes starts
  FUNCTION Fn_Compute_Eca_For_Rollover(p_Contract_Ref_No      IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                       p_Processing_Date      IN DATE,
                                       p_Authorization_Status IN Oltbs_Contract.Auth_Status%TYPE,
                                       p_Error_Code           IN OUT VARCHAR2,
                                       p_Error_Parameter      IN OUT VARCHAR2)
    RETURN BOOLEAN ;
  FUNCTION Fn_Compute_Eca_For_Rollover(p_Contract_Ref_No      IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                       p_Processing_Date      IN DATE,
                                       p_Authorization_Status IN Oltbs_Contract.Auth_Status%TYPE,
                                       p_Eca_Ref_No           OUT VARCHAR2, --OBCL_14.0.0.0.0_External_Call Changes Eca Changes
                                       p_Error_Code           IN OUT VARCHAR2,
                                       p_Error_Parameter      IN OUT VARCHAR2)
    RETURN VARCHAR2;

--OFCL12.4 changes ends
--OBCL_14.4_RESD changes starts
   FUNCTION fn_populate_due (
	   p_Contract_Ref_No      IN Oltbs_Contract.Contract_Ref_No%TYPE,
	   p_VerNo				  IN Oltbs_Contract.Latest_Version_No%TYPE,
	   p_Processing_Date      IN DATE,
	   p_Authorization_Status IN Oltbs_Contract.Auth_Status%TYPE,
	   p_Error_Code           IN OUT VARCHAR2,
	   p_Error_Parameter      IN OUT VARCHAR2	
    ) RETURN BOOLEAN;
	
   FUNCTION fn_resd_waiv_liq (
        p_Contract_Ref_No       IN Oltbs_Contract.Contract_Ref_No%TYPE,
		Cs                      IN Contract_Struct,
		Amt                     IN OUT Amount_Struct,
		p_List_Of_Amount_Tags IN OUT VARCHAR2,
		p_List_Of_Amounts     IN OUT VARCHAR2,
		p_List_Of_Amount_Ccys IN OUT VARCHAR2,
		p_List_Of_Lcy_Equivs  IN OUT VARCHAR2,
		p_Tag_Amount_In_Lcy   IN OUT Oltbs_Handoff.Lcy_Amount%TYPE,
		p_Error_Code          IN OUT VARCHAR2,
		p_Error_Parameter     IN OUT VARCHAR2	
    ) RETURN BOOLEAN;
--OBCL_14.4_RESD changes ends
--bug#31924018 starts
  FUNCTION Fn_Accured_Till_Date_Amount (
                     p_Contract_Ref_No IN  oltbs_contract_master.contract_ref_no%TYPE,
                     p_component       IN  VARCHAR2,
                     cs                IN Contract_Struct,
                     p_Processing_Date IN DATE,
                     P_Accr_Amt_Calc   OUT number,
                     p_Error_Code      IN OUT VARCHAR2,
                     p_Error_Parameter IN OUT VARCHAR2) RETURN BOOLEAN;  
--bug#31924018 ends

END Olpks_Rollover;
/
-- FCC 4.5 Lot2 Retro changes
CREATE OR REPLACE Synonym Olpkss_Rollover FOR Olpks_Rollover
/