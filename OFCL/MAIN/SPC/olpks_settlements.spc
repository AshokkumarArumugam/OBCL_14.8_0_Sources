CREATE OR REPLACE PACKAGE Olpks_Settlements AS
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_settlements.SPC
  **
  ** Module    : SETTLEMENT INSTRUCTIONS
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

  /*-------------------------------------CHANGE HISTORY Starts Here-------------------------------------
  
  CHANGE HISTORY Starts Here
  
  24-JAN-2003  FCC 4.2 APR 2003 - LS CHANGES FOR SETTLEMENT INSTRUCTION
  11-02-2003 FCC4.2 April 2003 Message Netting. The netting of messages will happen based on the Message Netting
                               Indicator flag set at the product level.
               Previously it was done based on the netting indicaor flag for the corresponding entries.
  31-Mar-2003 FCC 4.2 CITIPLC DEVELOPMENT REQUIREMENTS
      Requirement : Default Settlement instructions need to be got for a particular customer
      Solutions   : This package already has a function called fn_get_dflt_stl_ins to get the details..
            All FUNCTION fn_get_dflt_stl_ins to this spec to be called from other places.
  
  19-May-2003    FCC 42 OPS Changes Added new parameter to fn_get_receivers to pass the acc_cif this will be
        used as CIF for GLs
  
  29-MAY-2003 FCC4.3 AUG 2003 TRLCITI TIL #342 Fx confirmation is getting rejected by SWIFT.
         If the Customer Address is maintained more than one record in cust address,
         the FX confirmation advices are getting generated with the wrong address in
         53A field. An Overloaded function fn_Gecounterpartydetails added to include msg_type also.
  
  15-AUG-2003 FCC4.3 AUG 2003 FX changes
      Added paramter p_recv_intermediary_list to fn_referral
  
  15-AUG-2003 FCC4.3 AUG 2003 ITR1 fixes for SFR 278
    Function fn_cif_from_address moved from sql to spc
  
  14-OCT-2003 FCC 4.3.1 RTGS Changes
  
  18-OCT-2003 RETRO FCC4.4 DEC-2003 FCC3.9 PLNCITI  Til No 8899 Though charge is waived it's showing charge amount
                                                                in advices added new function.
  
  09-DEC-2003 FCC4.4 DEC 2003 RTGS changes
          Added new parameter p_account and p_acc_cif to   fn_is_rtgs_payment
  
  25-mar-2004 FCC 4.5 APR 2004 RNTC changes..added 2 new lists in fn_is_get_accounts
  24-APR-2004  FCC 4.5 LOT2 Changes -- Overloaded fn_update For SGEN. -- ITR1 SFR 11.
  
  19-Jul-2005 FCC 4.6.2 Jul 2005 changes for the alternate cif new parameter is added in the fn_settlements function.
  
  04-AUG-2005 FCC 4.6.2 CITILS Netting changes
  1-SEP-2005  FCC 4.6.2 COPY RIGHT changes
  08-DEC-2005 Flexcube V.CL Release 7.0, Changes done for Settlemnt Pickup using MNEMONIC by Mithilesh
  21-JAN-2006 Flexcube V.CL Release 7.0, Changes done FOR Participants processing And Added two plsql tables By Piyush
  06-MAR-2006  PLC46050015 Retro of PLC40504036,Retro as part of Flexcube V.CLRelease 7.0Changes  CHANGES
      1. Declared a new function fn_maint_referral with 7 params.
  01-JUL-2006 FLEXCUBE V.CL Release 7.0 LOT2 FT SFR#204 changes
        The gen_recv_notice flag in istb_contract is was not being set. Added new parameter to the function fn_get_receive_noticegenfla
  17-OCT-2007 FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-307 Added fn_resolve_maintenance to spec, so that it can be used for other purposes too
  06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#1332,STP Consolidation,By Swapnasish,SSI Mnemonic Validations related to field 56, 57, 58 and 59.
  2-MAY-2013 Oracle FCUBS 3.3.0.0.0$CITIBK_R713 FS Vol1 Tag05, Chinese Characters in Payments Changes, Increased the length of the fields 57 and 72 from 35 to 105.
  -------------------------------------CHANGE HISTORY Ends Here-------------------------------------
  Changed By         : Pallavi R
  Changes On         : 02-Apr-2018
  Change Description : Multiple(Splilt) Settlements are introduced
  Search  String     : OBCL_14.1_Split_stl Changes

**SFR Number         : 29583893      
**Changed By         : Arvind Baskar
**Change Description : Hooks provided for fn_referral
**Search String      : Bug#29583893  

**Changed By         : ArunaDevi Rajendran
**Change Description : Added error code and error parameter for the function
**Search String      : OBCL_14.4_DSBR_SplitSettlementAmount  

**Changed By         : Kavitha Asokan
**Change Description : Created a overloaded function for passing the rate_code_preferred in pickup details.
**Search String      : Bug#34114650 changes

**Changed By         : Kavitha Asokan
**Change Description : To get the user input exchange rate from LFDACFIN screen.
**Search String      : Bug#34363994_1 changes

  Changed By         : Sowmya Bitra
  Changed On         : 31-Jan-2024
  Change Description : Performance Tuning Changes for Syndication Online Transactions with large number(300+) of participants 
  Search String      : Bug#36008580

  ************************************************************************************************************/
	--Bug#29583893 changes start
  PROCEDURE Pr_Skip_Handler(P_Stage IN VARCHAR2);
  PROCEDURE Pr_Set_Skip_Kernel;
  PROCEDURE Pr_Set_Activate_Kernel;
  PROCEDURE Pr_Set_Skip_Cluster;
  PROCEDURE Pr_Set_Activate_Cluster;
  FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
--Bug#29583893 changes end

  --Bug#36008580 Changes Start
  TYPE ty_tbl_brn_msg_type IS TABLE OF Oltms_Brn_Msg_Type.Lcy_Msg_Type%TYPE INDEX BY VARCHAR2(20); 
  rec_brn_msg_type ty_tbl_brn_msg_type; 
  TYPE ty_tbl_cust_acc IS TABLE OF Oltbs_Account.Cust_No%TYPE INDEX BY VARCHAR2(50); 
  rec_cust_acc ty_tbl_cust_acc; 
  TYPE ty_tbl_acc_type IS TABLE OF Oltbs_Account.Ac_Or_Gl%TYPE INDEX BY VARCHAR2(50); 
  rec_acc_type ty_tbl_acc_type;
  TYPE ty_tbl_ssi_det_type IS TABLE OF VARCHAR2(50) INDEX BY VARCHAR2(20); 
  rec_ssi_det ty_tbl_ssi_det_type;  
  --Bug#36008580 Changes End
  
  TYPE Isdetails IS RECORD(
    Counterparty    Oltms_Instr.Counterparty%TYPE,
    Instr_Branch    Oltms_Branch.Branch_Code%TYPE,
    Pay_Account     Oltbs_Handoff.Ac_No%TYPE,
    Pay_Acc_Branch  Oltms_Branch.Branch_Code%TYPE,
    Pay_Acc_Ccy     Cytms_Ccy_Defn.Ccy_Code%TYPE,
    Recv_Account    Oltbs_Handoff.Ac_No%TYPE,
    Recv_Acc_Branch Oltms_Branch.Branch_Code%TYPE,
    Recv_Acc_Ccy    Cytms_Ccy_Defn.Ccy_Code%TYPE,
    Cover_Reqd      VARCHAR2(1),
    Charges_Details VARCHAR2(1),
    Intermediary1   VARCHAR2(35),
    Intermediary2   VARCHAR2(35),
    Intermediary3   VARCHAR2(35),
    Intermediary4   VARCHAR2(35),
    Intermediary5   VARCHAR2(35),
    Int_Reim_Inst1  VARCHAR2(35),
    Int_Reim_Inst2  VARCHAR2(35),
    Int_Reim_Inst3  VARCHAR2(35),
    Int_Reim_Inst4  VARCHAR2(35),
    Int_Reim_Inst5  VARCHAR2(35),
    --2-MAY-2013 Oracle FCUBS 3.3.0.0.0$CITIBK_R713 FS Vol1 Tag05, Chinese Characters in Payments Changes start.
    /*acc_with_instn1    VARCHAR2(35),
                  acc_with_instn2    VARCHAR2(35),
                  acc_with_instn3    VARCHAR2(35),
                  acc_with_instn4    VARCHAR2(35),
                  acc_with_instn5    VARCHAR2(35),*/
    Acc_With_Instn1 Oltms_Instr.Acc_With_Instn1%TYPE,
    Acc_With_Instn2 Oltms_Instr.Acc_With_Instn2%TYPE,
    Acc_With_Instn3 Oltms_Instr.Acc_With_Instn3%TYPE,
    Acc_With_Instn4 Oltms_Instr.Acc_With_Instn4%TYPE,
    Acc_With_Instn5 Oltms_Instr.Acc_With_Instn5%TYPE,
    --2-MAY-2013 Oracle FCUBS 3.3.0.0.0$CITIBK_R713 FS Vol1 Tag05, Chinese Characters in Payments Changes end.
    Rcvr_Corresp1      VARCHAR2(35),
    Rcvr_Corresp2      VARCHAR2(35),
    Rcvr_Corresp3      VARCHAR2(35),
    Rcvr_Corresp4      VARCHAR2(35),
    Rcvr_Corresp5      VARCHAR2(35),
    Recv_Intermediary1 VARCHAR2(35),
    Recv_Intermediary2 VARCHAR2(35),
    Recv_Intermediary3 VARCHAR2(35),
    Recv_Intermediary4 VARCHAR2(35),
    Recv_Intermediary5 VARCHAR2(35),
    Sndr_To_Rcvr_Info1 VARCHAR2(35),
    Sndr_To_Rcvr_Info2 VARCHAR2(35),
    Sndr_To_Rcvr_Info3 VARCHAR2(35),
    Sndr_To_Rcvr_Info4 VARCHAR2(35),
    Sndr_To_Rcvr_Info5 VARCHAR2(35),
    Sndr_To_Rcvr_Info6 VARCHAR2(35),
    Receiver           Oltbs_Settlements.Receiver%TYPE --FCC 4.6.2 CITILS 04-AUG-2005 Netting changes
    );

  --
  --   Fcc 4.3 Enhancement Starts
  --
  FUNCTION Fn_Settlements(p_Branch               IN VARCHAR2,
                          p_Branch_Date          IN DATE,
                          p_Lcy                  IN VARCHAR2,
                          p_Cont_Ref_No          IN VARCHAR2,
                          p_Event_Seq_No         IN NUMBER,
                          p_Cparty               IN VARCHAR2,
                          p_Module               IN VARCHAR2,
                          p_Pickup_Ssi           IN VARCHAR2,
                          p_Version_Flags        IN VARCHAR2,
                          p_Ccy_Restrict_Flags   IN VARCHAR2,
                          p_Tags                 IN VARCHAR2,
                          p_Tag_Ccys             IN VARCHAR2,
                          p_Pay_Recv_Flags       IN VARCHAR2,
                          p_Xfer_Type_Flags      IN VARCHAR2,
                          p_Ac_Branches          IN VARCHAR2,
                          p_Accounts             IN VARCHAR2,
                          p_Settle_Ccys          IN VARCHAR2,
                          p_Pay_Details_List     IN VARCHAR2,
                          p_Charge_Details_List  IN VARCHAR2,
                          p_Ult_Ben_List         IN VARCHAR2,
                          p_By_Order_Of_List     IN VARCHAR2,
                          p_Pay_By_Flags         IN VARCHAR2,
                          p_Instr_Type_List      IN VARCHAR2,
                          p_Instr_No_List        IN VARCHAR2,
                          p_Change_Ac_Flags      IN VARCHAR2,
                          p_Change_Rate_Flags    IN VARCHAR2,
                          p_Party_Info_Flags     IN VARCHAR2,
                          p_Cover_Required       IN VARCHAR2,
                          p_Enrich_Settl_On_Save IN VARCHAR2,
                          p_Error_Code           IN OUT VARCHAR2,
                          p_Error_Parameter      IN OUT VARCHAR2
                          --19-JUL-2005 FCC 4.6.2 JUL 2005 LS-67 for settlement pickup starts
                         ,
                          p_Seq_No IN VARCHAR2 DEFAULT 0 --Flexcube V.CL Release 7.0, Changed the datatype from NUMBER to VARCHAR2 by MIT on 081205
                          --19-JUL-2005 FCC 4.6.2 JUL 2005 LS-67 for settlement pickup ends
                          
                          ) RETURN BOOLEAN;
  --
  --   Fcc 4.3 Enhancement ends.
  --

  FUNCTION Fn_Pickupdetails(p_Branch              IN VARCHAR2,
                            p_Branch_Date         IN DATE,
                            p_Lcy                 IN VARCHAR2,
                            p_Cont_Ref_No         IN VARCHAR2,
                            p_Event_Seq_No        IN NUMBER,
                            p_Cparty              IN VARCHAR2,
                            p_Module              IN VARCHAR2,
                            p_Version_Flags       IN VARCHAR2,
                            p_Ccy_Restrict_Flags  IN VARCHAR2,
                            p_Tags                IN VARCHAR2,
                            p_Tag_Ccys            IN VARCHAR2,
                            p_Pay_Recv_Flags      IN VARCHAR2,
                            p_Xfer_Type_Flags     IN VARCHAR2,
                            p_Ac_Branches         IN VARCHAR2,
                            p_Accounts            IN VARCHAR2,
                            p_Settle_Ccys         IN VARCHAR2,
                            p_Pay_Details_List    IN VARCHAR2,
                            p_Charge_Details_List IN VARCHAR2,
                            p_Ult_Ben_List        IN VARCHAR2,
                            p_By_Order_Of_List    IN VARCHAR2,
                            p_Pay_By_Flags        IN VARCHAR2,
                            p_Instr_Type_List     IN VARCHAR2,
                            p_Instr_No_List       IN VARCHAR2,
                            p_Change_Ac_Flags     IN VARCHAR2,
                            p_Change_Rate_Flags   IN VARCHAR2,
                            p_Party_Info_Flags    IN VARCHAR2,
                            p_Cover_Required      IN VARCHAR2,
                            p_Error_Code          OUT VARCHAR2,
                            p_Seq_No              IN NUMBER := 0 --FCC4.2 FEB2003 LS CHANGES FOR SETTLEMENT
                            ) RETURN BOOLEAN;

  -- look down
  -- overloaded fn_pickupdetails...Securities related changes

  FUNCTION Fn_Pickupdetails(p_Branch               IN VARCHAR2,
                            p_Branch_Date          IN DATE,
                            p_Lcy                  IN VARCHAR2,
                            p_Cont_Ref_No          IN VARCHAR2,
                            p_Event_Seq_No         IN NUMBER,
                            p_Module               IN VARCHAR2,
                            p_Replicate_Other_Tags IN VARCHAR2,
                            p_Cparty_List          IN VARCHAR2,
                            p_Version_Flags        IN VARCHAR2,
                            p_Ccy_Restrict_Flags   IN VARCHAR2,
                            p_Tags                 IN VARCHAR2,
                            p_Tag_Ccys             IN VARCHAR2,
                            p_Pay_Recv_Flags       IN VARCHAR2,
                            p_Xfer_Type_Flags      IN VARCHAR2,
                            p_Ac_Branches          IN VARCHAR2,
                            p_Accounts             IN VARCHAR2,
                            p_Settle_Ccys          IN VARCHAR2,
                            p_Pay_Details_List     IN VARCHAR2,
                            p_Charge_Details_List  IN VARCHAR2,
                            p_Ult_Ben_List         IN VARCHAR2,
                            p_By_Order_Of_List     IN VARCHAR2,
                            p_Pay_By_Flags         IN VARCHAR2,
                            p_Instr_Type_List      IN VARCHAR2,
                            p_Instr_No_List        IN VARCHAR2,
                            p_Change_Ac_Flags      IN VARCHAR2,
                            p_Change_Rate_Flags    IN VARCHAR2,
                            p_Party_Info_Flags     IN VARCHAR2,
                            p_Cover_Required       IN VARCHAR2,
                            p_Error_Code           OUT VARCHAR2,
                            p_Rate_code_preferred  IN VARCHAR2, --Bug#34114650 changes
                            p_Exch_Rates_List      IN VARCHAR2, --Bug#34363994_1 changes
                            p_Seq_No               IN NUMBER := 0 --FCC4.2 FEB2003 LS CHANGES FOR SETTLEMENT
                            ) RETURN BOOLEAN;

  -- Fx Enhancements Starts
  FUNCTION Fn_Pickupdetails(p_Branch               IN VARCHAR2,
                            p_Branch_Date          IN DATE,
                            p_Lcy                  IN VARCHAR2,
                            p_Cont_Ref_No          IN VARCHAR2,
                            p_Event_Seq_No         IN NUMBER,
                            p_Module               IN VARCHAR2,
                            p_Replicate_Other_Tags IN VARCHAR2,
                            p_Cparty_List          IN VARCHAR2,
                            p_Version_Flags        IN VARCHAR2,
                            p_Ccy_Restrict_Flags   IN VARCHAR2,
                            p_Tags                 IN VARCHAR2,
                            p_Tag_Ccys             IN VARCHAR2,
                            p_Pay_Recv_Flags       IN VARCHAR2,
                            p_Xfer_Type_Flags      IN VARCHAR2,
                            p_Ac_Branches          IN VARCHAR2,
                            p_Accounts             IN VARCHAR2,
                            p_Settle_Ccys          IN VARCHAR2,
                            p_Pay_Details_List     IN VARCHAR2,
                            p_Charge_Details_List  IN VARCHAR2,
                            p_Ult_Ben_List         IN VARCHAR2,
                            p_By_Order_Of_List     IN VARCHAR2,
                            p_Pay_By_Flags         IN VARCHAR2,
                            p_Instr_Type_List      IN VARCHAR2,
                            p_Instr_No_List        IN VARCHAR2,
                            p_Change_Ac_Flags      IN VARCHAR2,
                            p_Change_Rate_Flags    IN VARCHAR2,
                            p_Party_Info_Flags     IN VARCHAR2,
                            p_Cover_Required       IN VARCHAR2,
                            p_Error_Code           OUT VARCHAR2,
                            p_Rate_code_preferred  IN VARCHAR2, --Bug#34114650 changes
                            p_Exch_Rates_List      IN VARCHAR2, --Bug#34363994_1 changes
                            p_Seq_No               IN VARCHAR2 := 0, --Flexcube V.CL Release 7.0, Changed the datatype from NUMBER to VARCHAR2 by MIT on 081205
                            -- Fx Enhancements Starts
                            p_Enrich_Settl_On_Save      IN VARCHAR2,
                            p_Settl_Records_Picked_List OUT VARCHAR2
                            -- Fx Enhancements Ends
                            ) RETURN BOOLEAN;
--Bug#34114650 changes starts
  FUNCTION Fn_Pickupdetails(p_Branch               IN VARCHAR2,
                            p_Branch_Date          IN DATE,
                            p_Lcy                  IN VARCHAR2,
                            p_Cont_Ref_No          IN VARCHAR2,
                            p_Event_Seq_No         IN NUMBER,
                            p_Module               IN VARCHAR2,
                            p_Replicate_Other_Tags IN VARCHAR2,
                            p_Cparty_List          IN VARCHAR2,
                            p_Version_Flags        IN VARCHAR2,
                            p_Ccy_Restrict_Flags   IN VARCHAR2,
                            p_Tags                 IN VARCHAR2,
                            p_Tag_Ccys             IN VARCHAR2,
                            p_Pay_Recv_Flags       IN VARCHAR2,
                            p_Xfer_Type_Flags      IN VARCHAR2,
                            p_Ac_Branches          IN VARCHAR2,
                            p_Accounts             IN VARCHAR2,
                            p_Settle_Ccys          IN VARCHAR2,
                            p_Pay_Details_List     IN VARCHAR2,
                            p_Charge_Details_List  IN VARCHAR2,
                            p_Ult_Ben_List         IN VARCHAR2,
                            p_By_Order_Of_List     IN VARCHAR2,
                            p_Pay_By_Flags         IN VARCHAR2,
                            p_Instr_Type_List      IN VARCHAR2,
                            p_Instr_No_List        IN VARCHAR2,
                            p_Change_Ac_Flags      IN VARCHAR2,
                            p_Change_Rate_Flags    IN VARCHAR2,
                            p_Party_Info_Flags     IN VARCHAR2,
                            p_Cover_Required       IN VARCHAR2,
                            p_Error_Code           OUT VARCHAR2,
                            p_Seq_No               IN NUMBER := 0
                            ) RETURN BOOLEAN;
  FUNCTION Fn_Pickupdetails(p_Branch               IN VARCHAR2,
                            p_Branch_Date          IN DATE,
                            p_Lcy                  IN VARCHAR2,
                            p_Cont_Ref_No          IN VARCHAR2,
                            p_Event_Seq_No         IN NUMBER,
                            p_Module               IN VARCHAR2,
                            p_Replicate_Other_Tags IN VARCHAR2,
                            p_Cparty_List          IN VARCHAR2,
                            p_Version_Flags        IN VARCHAR2,
                            p_Ccy_Restrict_Flags   IN VARCHAR2,
                            p_Tags                 IN VARCHAR2,
                            p_Tag_Ccys             IN VARCHAR2,
                            p_Pay_Recv_Flags       IN VARCHAR2,
                            p_Xfer_Type_Flags      IN VARCHAR2,
                            p_Ac_Branches          IN VARCHAR2,
                            p_Accounts             IN VARCHAR2,
                            p_Settle_Ccys          IN VARCHAR2,
                            p_Pay_Details_List     IN VARCHAR2,
                            p_Charge_Details_List  IN VARCHAR2,
                            p_Ult_Ben_List         IN VARCHAR2,
                            p_By_Order_Of_List     IN VARCHAR2,
                            p_Pay_By_Flags         IN VARCHAR2,
                            p_Instr_Type_List      IN VARCHAR2,
                            p_Instr_No_List        IN VARCHAR2,
                            p_Change_Ac_Flags      IN VARCHAR2,
                            p_Change_Rate_Flags    IN VARCHAR2,
                            p_Party_Info_Flags     IN VARCHAR2,
                            p_Cover_Required       IN VARCHAR2,
                            p_Error_Code           OUT VARCHAR2,
                            p_Seq_No               IN VARCHAR2 := 0, 
                            p_Enrich_Settl_On_Save      IN VARCHAR2,
                            p_Settl_Records_Picked_List OUT VARCHAR2
                            ) RETURN BOOLEAN;
  --Bug#34114650 changes Ends
  -- Fx Enhancements Starts

  /* Function to get default charge account from settlement instructions */
  --CITIPLC-3.7-MT210GEN :- Generation of RECEIVE NOTICE based on SETTLEMENTS maintenance.
  --New function definition starts
  FUNCTION Fn_Get_Charge_Account(p_Account        IN Oltbs_Fttb_Contract_Master.Cr_Account%TYPE,
                                 p_Branch         IN Oltbs_Fttb_Contract_Master.Cr_Account_Branch%TYPE,
                                 p_Ccy            IN Oltbs_Fttb_Contract_Master.Cr_Ccy%TYPE,
                                 p_Module         IN Oltb_Contract.Module_Code%TYPE,
                                 p_Charge_Account OUT Oltbs_Fttb_Contract_Master.Dr_Account%TYPE,
                                 p_Error_Code     OUT VARCHAR2)
    RETURN BOOLEAN;

  --CITIPLC-3.7-MT210GEN :- Generation of RECEIVE NOTICE based on SETTLEMENTS maintenance. New function definition ends.
  FUNCTION Fn_Get_Receive_Noticegenflag(p_Branch        IN Oltb_Settlements.Acc_Branch%TYPE,
                                        p_Account       IN Oltb_Settlements.Account%TYPE,
                                        p_Tag_Ccy       IN Oltb_Settlements.Tag_Ccy%TYPE,
                                        p_Cont_Ref_No   IN Oltb_Settlements.Contract_Ref_No%TYPE,
                                        p_Xfer_Type     IN Oltb_Settlements.Transfer_Type%TYPE,
                                        p_Gen_Msg       OUT VARCHAR2,
                                        p_Gen_Recv_Notc OUT VARCHAR2 --FLEXCUBE V.CL Release 7.0 LOT2 FT SFR#204 changes
                                        ) RETURN BOOLEAN;

  FUNCTION Fn_Delete(p_Cont_Ref_No IN VARCHAR2,
                     p_Esn         IN NUMBER,
                     p_Error_Code  OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Referral(p_Cont_Ref_No          IN VARCHAR2,
                       p_Event_Seq_No         IN NUMBER,
                       p_Tag_List             IN OUT VARCHAR2,
                       p_Replicate            IN VARCHAR2,
                       p_Tag_Ccy_List         OUT VARCHAR2,
                       p_Pay_Receive_List     OUT VARCHAR2,
                       p_Ac_Branch_List       OUT VARCHAR2,
                       p_Account_List         OUT VARCHAR2,
                       p_Acc_Ccy_List         OUT VARCHAR2,
                       p_Ex_Rate_List         OUT VARCHAR2,
                       p_Settlement_Amt_List  OUT VARCHAR2,
                       p_Value_Date_List      OUT VARCHAR2,
                       p_Payment_By_List      OUT VARCHAR2,
                       p_Transfer_Type_List   OUT VARCHAR2,
                       p_Instr_Type_List      OUT VARCHAR2,
                       p_Instr_No_List        OUT VARCHAR2,
                       p_Cover_Reqd_List      OUT VARCHAR2,
                       p_Charges_Details_List OUT VARCHAR2,
                       p_Our_Corresp_List     OUT VARCHAR2,
                       p_Receiver_List        OUT VARCHAR2,
                       p_Int_Reim_Inst_List   OUT VARCHAR2,
                       p_Rcvr_Corresp_List    OUT VARCHAR2,
                       p_Intermediary_List    OUT VARCHAR2,
                       p_Acc_With_Instn_List  OUT VARCHAR2,
                       p_Pay_Details_List     OUT VARCHAR2,
                       p_Sndr_To_Rcvr_List    OUT VARCHAR2,
                       p_Ordering_Inst_List   OUT VARCHAR2,
                       p_Ordering_Cust_List   OUT VARCHAR2,
                       p_Benef_Inst_List      OUT VARCHAR2,
                       p_Ult_Benef_List       OUT VARCHAR2,
                       p_Error_Code           OUT VARCHAR2) RETURN BOOLEAN;

  -- look Down
  -- Overloading...for securities

  FUNCTION Fn_Referral(p_Cont_Ref_No          IN VARCHAR2,
                       p_Event_Seq_No         IN NUMBER,
                       p_Tag_List             IN OUT VARCHAR2,
                       p_Replicate            IN VARCHAR2,
                       p_Replicate_Other_Tags IN VARCHAR2,
                       p_Tag_Ccy_List         OUT VARCHAR2,
                       p_Pay_Receive_List     OUT VARCHAR2,
                       p_Ac_Branch_List       OUT VARCHAR2,
                       p_Account_List         OUT VARCHAR2,
                       p_Acc_Ccy_List         OUT VARCHAR2,
                       p_Ex_Rate_List         OUT VARCHAR2,
                       p_Settlement_Amt_List  OUT VARCHAR2,
                       p_Value_Date_List      OUT VARCHAR2,
                       p_Payment_By_List      OUT VARCHAR2,
                       p_Transfer_Type_List   OUT VARCHAR2,
                       p_Instr_Type_List      OUT VARCHAR2,
                       p_Instr_No_List        OUT VARCHAR2,
                       p_Cover_Reqd_List      OUT VARCHAR2,
                       p_Charges_Details_List OUT VARCHAR2,
                       p_Our_Corresp_List     OUT VARCHAR2,
                       p_Receiver_List        OUT VARCHAR2,
                       p_Int_Reim_Inst_List   OUT VARCHAR2,
                       p_Rcvr_Corresp_List    OUT VARCHAR2,
                       p_Intermediary_List    OUT VARCHAR2,
                       p_Acc_With_Instn_List  OUT VARCHAR2,
                       p_Pay_Details_List     OUT VARCHAR2,
                       p_Sndr_To_Rcvr_List    OUT VARCHAR2,
                       p_Ordering_Inst_List   OUT VARCHAR2,
                       p_Ordering_Cust_List   OUT VARCHAR2,
                       p_Benef_Inst_List      OUT VARCHAR2,
                       p_Ult_Benef_List       OUT VARCHAR2,
                       p_Error_Code           OUT VARCHAR2) RETURN BOOLEAN;

  --
  -- Fcc 4.3 Fx Enhancement Starts..
  --
  FUNCTION Fn_Referral(p_Cont_Ref_No          IN VARCHAR2,
                       p_Event_Seq_No         IN NUMBER,
                       p_Tag_List             IN OUT VARCHAR2,
                       p_Replicate            IN VARCHAR2,
                       p_Replicate_Other_Tags IN VARCHAR2, -- Overloading Securities
                       p_Tag_Ccy_List         OUT VARCHAR2,
                       p_Pay_Receive_List     OUT VARCHAR2,
                       p_Ac_Branch_List       OUT VARCHAR2,
                       p_Account_List         OUT VARCHAR2,
                       p_Acc_Ccy_List         OUT VARCHAR2,
                       p_Ex_Rate_List         OUT VARCHAR2,
                       p_Settlement_Amt_List  OUT VARCHAR2,
                       p_Value_Date_List      OUT VARCHAR2,
                       p_Payment_By_List      OUT VARCHAR2,
                       p_Transfer_Type_List   OUT VARCHAR2,
                       p_Instr_Type_List      OUT VARCHAR2,
                       p_Instr_No_List        OUT VARCHAR2,
                       p_Cover_Reqd_List      OUT VARCHAR2,
                       p_Charges_Details_List OUT VARCHAR2,
                       p_Our_Corresp_List     OUT VARCHAR2,
                       p_Receiver_List        OUT VARCHAR2,
                       p_Int_Reim_Inst_List   OUT VARCHAR2,
                       p_Rcvr_Corresp_List    OUT VARCHAR2,
                       p_Intermediary_List    OUT VARCHAR2,
                       p_Acc_With_Instn_List  OUT VARCHAR2,
                       p_Pay_Details_List     OUT VARCHAR2,
                       p_Sndr_To_Rcvr_List    OUT VARCHAR2,
                       p_Ordering_Inst_List   OUT VARCHAR2,
                       p_Ordering_Cust_List   OUT VARCHAR2,
                       p_Benef_Inst_List      OUT VARCHAR2,
                       p_Ult_Benef_List       OUT VARCHAR2,
                       -- Fcc 4.3 Fx Enhancement Starts
                       p_Instruction_Type_List   OUT VARCHAR2,
                       p_Instruction_Status_List OUT VARCHAR2,
                       p_Msg_Nettable_List       OUT VARCHAR2,
                       p_Recv_Ordering_Inst_List OUT VARCHAR2,
                       p_Recv_Ordering_Cust_List OUT VARCHAR2,
                       p_Acc_Cif_List            OUT VARCHAR2,
                       -- Fcc 4.3 Fx Enhancement Ends
                       -- Vichu Start
                       p_Recv_Intermediary_List OUT VARCHAR2,
                       p_Field72_Conf_List      OUT VARCHAR2,
                       -- Vichu Ends
                       p_Error_Code OUT VARCHAR2) RETURN BOOLEAN;

  --
  -- Fcc 4.3 Fx Enhancement ends.
  --PLC40504036,Retro as part of Flexcube V.CLRelease 7.0Changes
  /* Function fn_maint_referral overloaded for the Addition of Product_code to OLTM_INSTR */
  FUNCTION Fn_Maint_Referral(p_Cparty            IN VARCHAR2,
                             p_Settle_Ccy        IN VARCHAR2,
                             p_Module            IN VARCHAR2,
                             p_Branch            IN VARCHAR2,
                             p_Product_Code      IN VARCHAR2,
                             p_Out_Maint_Details OUT Isdetails,
                             p_Error_Code        OUT VARCHAR2) RETURN BOOLEAN;
  --PLC40504036,Retro as part of Flexcube V.CLRelease 7.0Changes

  FUNCTION Fn_Maint_Referral(p_Cparty            IN VARCHAR2,
                             p_Settle_Ccy        IN VARCHAR2,
                             p_Module            IN VARCHAR2,
                             p_Branch            IN VARCHAR2,
                             p_Out_Maint_Details OUT Isdetails,
                             p_Error_Code        OUT VARCHAR2) RETURN BOOLEAN;

  --FCC 4.6.2 CITILS 04-AUG-2005 Netting changes
  FUNCTION Fn_Maint_Referral(p_Cparty            IN VARCHAR2,
                             p_Settle_Ccy        IN VARCHAR2,
                             p_Module            IN VARCHAR2,
                             p_Branch            IN VARCHAR2,
                             p_Product_Code      IN VARCHAR2,
                             p_Seq_No            IN NUMBER,
                             p_Out_Maint_Details OUT Isdetails,
                             p_Error_Code        OUT VARCHAR2) RETURN BOOLEAN;
  --FCC 4.6.2 CITILS 04-AUG-2005 Netting changes

  FUNCTION Fn_Account_Validations(p_Branch     IN VARCHAR2,
                                  p_Lcy        IN VARCHAR2,
                                  p_Ho_Branch  IN VARCHAR2,
                                  p_Account    IN VARCHAR2,
                                  p_Currency   IN OUT VARCHAR2,
                                  p_Error_Code OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Update(p_Cont_Ref_No  IN VARCHAR2,
                     p_Event_Seq_No IN NUMBER,
                     p_Amount_Tags  IN VARCHAR2,
                     p_Settle_Amts  IN VARCHAR2,
                     p_Exch_Rates   IN VARCHAR2,
                     p_Value_Dates  IN VARCHAR2,
                     p_Net_Ind_List IN VARCHAR2,
                     p_Error_Code   OUT VARCHAR2) RETURN BOOLEAN;
  /*
  OVERLOADED UPDATE FUNCTION FOR PROVIDING
  TAG LEVEL INDICATOR TO SPECIFY IF TAG TO
  BE CONSIDERED FOR MESSAGE GENERATION OR NOT
  24/NOV/1998
  */
  -- FCC4.2 April 2003 Message Netting. Begin

  FUNCTION Fn_Update(p_Cont_Ref_No      IN VARCHAR2,
                     p_Event_Seq_No     IN NUMBER,
                     p_Amount_Tags      IN VARCHAR2,
                     p_Settle_Amts      IN VARCHAR2,
                     p_Exch_Rates       IN VARCHAR2,
                     p_Value_Dates      IN VARCHAR2,
                     p_Net_Ind_List     IN VARCHAR2,
                     p_Msg_Net_Ind_List IN VARCHAR2, -- FCC4.2 April 2003 Message Netting.
                     p_Error_Code       OUT VARCHAR2) RETURN BOOLEAN;

  -- FCC4.2 April 2003 Message Netting. End

  FUNCTION Fn_Update(p_Cont_Ref_No      IN VARCHAR2,
                     p_Event_Seq_No     IN NUMBER,
                     p_Amount_Tags      IN VARCHAR2,
                     p_Settle_Amts      IN VARCHAR2,
                     p_Exch_Rates       IN VARCHAR2,
                     p_Value_Dates      IN VARCHAR2,
                     p_Net_Ind_List     IN VARCHAR2,
                     p_Gen_Msg_List     IN VARCHAR2,
                     p_Msg_Net_Ind_List IN VARCHAR2, -- FCC4.2 April 2003 Message Netting.
                     p_Error_Code       OUT VARCHAR2) RETURN BOOLEAN;

  -- look down
  -- overloading for securities

  FUNCTION Fn_Update(p_Cont_Ref_No      IN VARCHAR2,
                     p_Event_Seq_No     IN NUMBER,
                     p_Amount_Tags      IN VARCHAR2,
                     p_Settle_Amts      IN VARCHAR2,
                     p_Exch_Rates       IN VARCHAR2,
                     p_Value_Dates      IN VARCHAR2,
                     p_Net_Ind_List     IN VARCHAR2,
                     p_Exch_Rate_Flags  IN VARCHAR2,
                     p_Gen_Msg_List     IN VARCHAR2, --SGEN CHANGES
                     p_Msg_Net_Ind_List IN VARCHAR2, -- FCC4.2 April 2003 Message Netting.
                     p_Error_Code       OUT VARCHAR2) RETURN BOOLEAN;

  -- Spot fix  fc3.3 sec itp 12-jan-00
  -- Account update
  -- Overloading for securities (Cumulative interest bond )

  FUNCTION Fn_Update(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                     p_Esn             IN NUMBER,
                     p_Amt_Tags        IN VARCHAR2,
                     p_Accounts        IN VARCHAR2,
                     p_Acc_Brs         IN VARCHAR2,
                     p_Acc_Ccys        IN VARCHAR2,
                     p_Err_Code        IN OUT Ertbs_Msgs.Err_Code%TYPE)
    RETURN BOOLEAN;

  -- End of spot fix

  -- FCC 4.5 LOT2 Changes
  FUNCTION Fn_Update(p_Cont_Ref_No      IN VARCHAR2,
                     p_Event_Seq_No     IN NUMBER,
                     p_Amount_Tags      IN VARCHAR2,
                     p_Settle_Amts      IN VARCHAR2,
                     p_Exch_Rates       IN VARCHAR2,
                     p_Value_Dates      IN VARCHAR2,
                     p_Net_Ind_List     IN VARCHAR2,
                     p_Exch_Rate_Flags  IN VARCHAR2,
                     p_Gen_Msg_List     IN VARCHAR2,
                     p_Msg_Net_Ind_List IN VARCHAR2,
                     p_Dd_List          IN VARCHAR2,
                     p_Rntc_List        IN VARCHAR2,
                     p_Error_Code       OUT VARCHAR2) RETURN BOOLEAN;
  -- FCC 4.5 LOT2 Changes

  FUNCTION Fn_Get_Receivers(p_Settle_Acc        IN VARCHAR2,
                            p_Settle_Ac_Br      IN VARCHAR2,
                            p_Acc_With_Instn    IN VARCHAR2,
                            p_Cover_Reqd        IN VARCHAR2,
                            p_Acc_Cif           IN VARCHAR2, --FCC 42 OPS Changes
                            p_Out_Receiver      IN OUT VARCHAR2,
                            p_Out_Rcvr_Of_Cover OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Is_Cif_Abank(Aparty IN VARCHAR2) RETURN BOOLEAN;

  --
  -- Fcc 4.3 Fx Enhancement Starts
  --

  FUNCTION Fn_Get_Is_Accounts(p_Cont_Ref_No          IN VARCHAR2,
                              p_Event_Seq_No         IN NUMBER,
                              p_Module               IN VARCHAR2,
                              p_Product_Code         IN VARCHAR2,
                              p_Settle_Event         IN VARCHAR2,
                              p_Pass_To_Dflt_Acct    IN VARCHAR2,
                              p_Inherit_Acct         IN VARCHAR2,
                              p_Tag_List             IN OUT VARCHAR2,
                              p_Replicate_Flag       IN VARCHAR2,
                              p_Replicate_Other_Tags IN VARCHAR2,
                              p_Update_Istable       IN BOOLEAN,
                              p_Tag_Ccy_List         OUT VARCHAR2,
                              p_Pay_Receive_List     OUT VARCHAR2,
                              p_Ac_Branch_List       OUT VARCHAR2,
                              p_Account_List         OUT VARCHAR2,
                              p_Acc_Ccy_List         OUT VARCHAR2,
                              p_Ex_Rate_List         OUT VARCHAR2,
                              p_Settlement_Amt_List  OUT VARCHAR2,
                              p_Value_Date_List      OUT VARCHAR2,
                              p_Instrument_No_List   OUT VARCHAR2,
                              p_Instruction_Sts_List OUT VARCHAR2,
                              p_Msg_Nettable_List    OUT VARCHAR2,
                              p_Acc_Cif_List         OUT VARCHAR2,
                              p_Receiver_List        OUT VARCHAR2,
                              p_Dd_List              IN OUT VARCHAR2, --fcc 4.5 apr 2004
                              p_Rntc_List            IN OUT VARCHAR2, --fcc 4.5 apr 2004
                              p_Error_Code           OUT VARCHAR2,
                              p_Error_Parameter      OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Get_Istb_Contract_Rec(p_Cont_Ref_No          IN Oltbs_Settlements.Contract_Ref_No%TYPE,
                                    p_Event_Seq_No         IN Oltbs_Settlements.Event_Seq_No%TYPE,
                                    p_Parent_Amount_Tag    IN Oltms_Prd_Dependent_Amt_Tags.Parent_Amount_Tag%TYPE,
                                    p_Istbs_Contractis_Rec OUT Oltbs_Settlements%ROWTYPE,
                                    p_Error_Code           OUT VARCHAR2,
                                    p_Error_Parameter      OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Update_Contractis(p_Contractis_Rec  IN Oltbs_Settlements%ROWTYPE,
                                p_Contract_Ref_No IN Oltbs_Settlements.Contract_Ref_No%TYPE,
                                p_Event_Seq_No    IN Oltbs_Settlements.Event_Seq_No%TYPE,
                                p_Amount_Tag      IN Oltbs_Settlements.Amount_Tag%TYPE,
                                p_Error_Code      OUT VARCHAR2,
                                p_Error_Parameter OUT VARCHAR2)
    RETURN BOOLEAN;

  --
  -- Fcc 4.3 Fx Enhancement Ends
  --
  --OBCL_14.1_Split_stl Changes Starts
  FUNCTION Fn_Split_Fin_Referral(p_Cont_Ref_No             IN VARCHAR2,
                                 p_Event_Seq_No            IN NUMBER,
                                 p_Tag_List                IN OUT VARCHAR2,
                                 p_Replicate_Flag          IN VARCHAR2,
                                 p_Replicate_Other_Tags    IN VARCHAR2,
                                 p_Tag_Ccy_List            OUT VARCHAR2,
                                 p_Pay_Receive_List        OUT VARCHAR2,
                                 p_Ac_Branch_List          OUT VARCHAR2,
                                 p_Account_List            OUT VARCHAR2,
                                 p_Acc_Ccy_List            OUT VARCHAR2,
                                 p_Ex_Rate_List            OUT VARCHAR2,
                                 p_Settlement_Amt_List     OUT VARCHAR2,
                                 p_Value_Date_List         OUT VARCHAR2,
                                 p_Instrument_No_List      OUT VARCHAR2,
                                 p_Instruction_Type_List   OUT VARCHAR2,
                                 p_Instruction_Status_List OUT VARCHAR2,
                                 p_Msg_Nettable_List       OUT VARCHAR2,
                                 p_Acc_Cif_List            OUT VARCHAR2,
                                 p_Reciever_List           OUT VARCHAR2,
                                 p_Transfer_Type_List      OUT VARCHAR2,
                                 p_Split_Ratio_List        OUT VARCHAR2,
                                 p_Basis_Tag_List          OUT VARCHAR2,
                                 p_Net_Ind_List            OUT VARCHAR2,
                                 p_Split_Stl               OUT VARCHAR2,
                                 p_Error_Code              OUT VARCHAR2)
    RETURN BOOLEAN;
  --OBCL_14.1_Split_stl Changes Ends
  FUNCTION Fn_Split_Referral(p_Cont_Ref_No             IN VARCHAR2,
                             p_Event_Seq_No            IN NUMBER,
                             p_Tag_List                IN OUT VARCHAR2,
                             p_Replicate               IN VARCHAR2,
                             p_Replicate_Other_Tags    IN VARCHAR2,
                             p_Tag_Ccy_List            OUT VARCHAR2,
                             p_Pay_Receive_List        OUT VARCHAR2,
                             p_Ac_Branch_List          OUT VARCHAR2,
                             p_Account_List            OUT VARCHAR2,
                             p_Acc_Ccy_List            OUT VARCHAR2,
                             p_Ex_Rate_List            OUT VARCHAR2,
                             p_Settlement_Amt_List     OUT VARCHAR2,
                             p_Value_Date_List         OUT VARCHAR2,
                             p_Payment_By_List         OUT VARCHAR2,
                             p_Transfer_Type_List      OUT VARCHAR2,
                             p_Instr_Type_List         OUT VARCHAR2,
                             p_Instr_No_List           OUT VARCHAR2,
                             p_Cover_Reqd_List         OUT VARCHAR2,
                             p_Charges_Details_List    OUT VARCHAR2,
                             p_Our_Corresp_List        OUT VARCHAR2,
                             p_Receiver_List           OUT VARCHAR2,
                             p_Int_Reim_Inst_List      OUT VARCHAR2,
                             p_Rcvr_Corresp_List       OUT VARCHAR2,
                             p_Intermediary_List       OUT VARCHAR2,
                             p_Acc_With_Instn_List     OUT VARCHAR2,
                             p_Pay_Details_List        OUT VARCHAR2,
                             p_Sndr_To_Rcvr_List       OUT VARCHAR2,
                             p_Ordering_Inst_List      OUT VARCHAR2,
                             p_Ordering_Cust_List      OUT VARCHAR2,
                             p_Benef_Inst_List         OUT VARCHAR2,
                             p_Ult_Benef_List          OUT VARCHAR2,
                             p_Instruction_Type_List   OUT VARCHAR2,
                             p_Instruction_Status_List OUT VARCHAR2,
                             p_Msg_Nettable_List       OUT VARCHAR2,
                             p_Recv_Ordering_Inst_List OUT VARCHAR2,
                             p_Recv_Ordering_Cust_List OUT VARCHAR2,
                             p_Acc_Cif_List            OUT VARCHAR2,
                             p_Recv_Intermediary_List  OUT VARCHAR2,
                             p_Field72_Conf_List       OUT VARCHAR2,
                             p_Ratio_List              OUT VARCHAR2,
                             p_Basis_Tag_List          OUT VARCHAR2,
                             p_Net_Ind_List            OUT VARCHAR2,
                             p_Split_Stl               OUT VARCHAR2,
                             p_Error_Code              OUT VARCHAR2)
    RETURN BOOLEAN;  
  FUNCTION Fn_Fin_Referral(p_Cont_Ref_No         IN VARCHAR2,
                           p_Event_Seq_No        IN NUMBER,
                           p_Tag_List            IN OUT VARCHAR2,
                           p_Replicate_Flag      IN VARCHAR2,
                           p_Tag_Ccy_List        OUT VARCHAR2,
                           p_Pay_Receive_List    OUT VARCHAR2,
                           p_Ac_Branch_List      OUT VARCHAR2,
                           p_Account_List        OUT VARCHAR2,
                           p_Acc_Ccy_List        OUT VARCHAR2,
                           p_Ex_Rate_List        OUT VARCHAR2,
                           p_Settlement_Amt_List OUT VARCHAR2,
                           p_Value_Date_List     OUT VARCHAR2,
                           p_Instrument_No_List  OUT VARCHAR2,
                           p_Error_Code          OUT VARCHAR2) RETURN BOOLEAN;

  -- look down
  -- overloading for securities

  FUNCTION Fn_Fin_Referral(p_Cont_Ref_No          IN VARCHAR2,
                           p_Event_Seq_No         IN NUMBER,
                           p_Tag_List             IN OUT VARCHAR2,
                           p_Replicate_Flag       IN VARCHAR2,
                           p_Replicate_Other_Tags IN VARCHAR2,
                           p_Tag_Ccy_List         OUT VARCHAR2,
                           p_Pay_Receive_List     OUT VARCHAR2,
                           p_Ac_Branch_List       OUT VARCHAR2,
                           p_Account_List         OUT VARCHAR2,
                           p_Acc_Ccy_List         OUT VARCHAR2,
                           p_Ex_Rate_List         OUT VARCHAR2,
                           p_Settlement_Amt_List  OUT VARCHAR2,
                           p_Value_Date_List      OUT VARCHAR2,
                           p_Instrument_No_List   OUT VARCHAR2,
                           p_Error_Code           OUT VARCHAR2)
    RETURN BOOLEAN;

  --
  -- Fcc 4.3 Fx Enhancement starts
  --
  FUNCTION Fn_Fin_Referral(p_Cont_Ref_No             IN VARCHAR2,
                           p_Event_Seq_No            IN NUMBER,
                           p_Tag_List                IN OUT VARCHAR2,
                           p_Replicate_Flag          IN VARCHAR2,
                           p_Replicate_Other_Tags    IN VARCHAR2,
                           p_Tag_Ccy_List            OUT VARCHAR2,
                           p_Pay_Receive_List        OUT VARCHAR2,
                           p_Ac_Branch_List          OUT VARCHAR2,
                           p_Account_List            OUT VARCHAR2,
                           p_Acc_Ccy_List            OUT VARCHAR2,
                           p_Ex_Rate_List            OUT VARCHAR2,
                           p_Settlement_Amt_List     OUT VARCHAR2,
                           p_Value_Date_List         OUT VARCHAR2,
                           p_Instrument_No_List      OUT VARCHAR2,
                           p_Instruction_Type_List   OUT VARCHAR2,
                           p_Instruction_Status_List OUT VARCHAR2,
                           p_Msg_Nettable_List       OUT VARCHAR2,
                           p_Acc_Cif_List            OUT VARCHAR2,
                           p_Reciever_List           OUT VARCHAR2,
                           p_Transfer_Type_List      OUT VARCHAR2,
                           p_Error_Code              OUT VARCHAR2)
    RETURN BOOLEAN;
  --
  -- Fcc 4.3 Fx Enhancement ends
  --

  FUNCTION Fn_Get_Counterpartydetails(p_Counterparty IN VARCHAR2,
                                      p_Name         OUT VARCHAR2,
                                      p_Address1     OUT VARCHAR2,
                                      p_Address2     OUT VARCHAR2,
                                      p_Address3     OUT VARCHAR2,
                                      p_Address4     OUT VARCHAR2,
                                      p_Errcode      IN OUT VARCHAR2)
    RETURN BOOLEAN;

  -- FCC4.3 AUG 2003 TRLCITI TIL #342 Fx confirmation is getting rejected by SWIFT. Overloaded function included..Starts
  FUNCTION Fn_Get_Counterpartydetails(p_Counterparty IN VARCHAR2,
                                      p_Name         OUT VARCHAR2,
                                      p_Msg_Type     IN VARCHAR2,
                                      p_Address1     OUT VARCHAR2,
                                      p_Address2     OUT VARCHAR2,
                                      p_Address3     OUT VARCHAR2,
                                      p_Address4     OUT VARCHAR2,
                                      p_Errcode      IN OUT VARCHAR2)
    RETURN BOOLEAN;

  -- FCC4.3 AUG 2003 TRLCITI TIL #342 Fx confirmation is getting rejected by SWIFT. Overloaded function included..Ends

  -- 31-Mar-2003 FCC 4.2 CITIPLC DEVELOPMENT REQUIREMENTS START
  -- Adding the following function to the spec
  FUNCTION Fn_Get_Dflt_Stl_Ins(p_Cparty     IN VARCHAR2,
                               p_Settle_Ccy IN VARCHAR2,
                               p_Module     IN VARCHAR2,
                               p_Branch     IN VARCHAR2,
                               p_Product    IN VARCHAR2,
                               p_Seq_No     IN NUMBER,
                               Amaintrow    OUT Oltms_Instr%ROWTYPE)
    RETURN BOOLEAN;
  -- 31-Mar-2003 FCC 4.2 CITIPLC DEVELOPMENT REQUIREMENTS END

  --FCC4.3 AUG 2003 ITR1 fixes for SFR 278 start
  FUNCTION Fn_Cif_From_Address(p_Address IN VARCHAR2, p_Cif OUT VARCHAR2)
    RETURN BOOLEAN;
  --FCC4.3 AUG 2003 ITR1 fixes for SFR 278 end

  --FCC 4.3.1 RTGS Changes

  FUNCTION Fn_Is_Rtgs_Payment(p_Branch_Code     IN Oltms_Branch.Branch_Code%TYPE,
                              p_Module          IN Smtbs_Modules.Module_Id%TYPE,
                              p_Product         IN Oltbs_Contract.Product_Code%TYPE,
                              p_Receiver        IN Oltbs_Settlements.Receiver%TYPE,
                              p_Ccy             IN Oltbs_Settlements.Acc_Ccy%TYPE,
                              p_Pay_Recv        IN Oltbs_Settlements.Pay_Receive%TYPE,
                              p_Intermediary1   IN Oltbs_Settlements.Intermediary1%TYPE,
                              p_Intermediary2   IN Oltbs_Settlements.Intermediary1%TYPE,
                              p_Acc_With_Instn1 IN Oltbs_Settlements.Acc_With_Instn1%TYPE,
                              p_Acc_With_Instn2 IN Oltbs_Settlements.Acc_With_Instn2%TYPE,
                              p_Cover_Reqd      IN Oltbs_Settlements.Cover_Required%TYPE,
                              p_Recvr_Of_Cover  IN Oltbs_Settlements.Receiver%TYPE,
                              p_Rcvr_Corresp1   IN Oltbs_Settlements.Rcvr_Corresp1%TYPE,
                              p_Rcvr_Corresp2   IN Oltbs_Settlements.Rcvr_Corresp2%TYPE,
                              --
                              --FCC4.4 DEC 2003 RTGS changes start
                              --
                              p_Account IN Oltbs_Settlements.Account%TYPE,
                              p_Acc_Cif IN Oltbs_Settlements.Acc_Cif%TYPE
                              --
                              --FCC4.4 DEC 2003 RTGS changes end
                              --
                              ) RETURN BOOLEAN;

  FUNCTION Fn_Is_Rtgs_Receiver(p_Branch_Code IN VARCHAR2,
                               p_Receiver    IN VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Is_Rtgs_Dir_Member(p_Branch_Code IN VARCHAR2,
                                 p_Member      IN VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Get_Bic(p_Counterparty IN VARCHAR2,
                      p_Branch_Code  IN VARCHAR2,
                      p_Bic          OUT VARCHAR2,
                      p_Errcode      IN OUT VARCHAR2) RETURN BOOLEAN;

  --FCC 4.3.1 RTGS Changes

  --manju
  --18-OCT-2003 RETRO FCC4.4 DEC-2003 FCC3.9 PLNCITI  Til No 8899 Though charge is waived it's showing charge amount in advices added new function.
  FUNCTION Fn_Undo_Update(p_Cont_Ref_No  IN VARCHAR2,
                          p_Event_Seq_No IN NUMBER,
                          p_Amount_Tags  IN VARCHAR2,
                          p_Error_Code   OUT VARCHAR2) RETURN BOOLEAN;
  --18-OCT-2003 RETRO FCC4.4 DEC-2003 FCC3.9 PLNCITI  Til No 8899 Though charge is waived it's showing charge amount in advices added new function.
  --manju

  --
  -- FCC 4.4 External Netting Changes Starts
  --
  FUNCTION Fn_Update_Instr_Status(p_Contract_Rec    IN Xxtbs_Contract_Master%ROWTYPE,
                                  p_Error_Code      IN OUT VARCHAR2,
                                  p_Error_Parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --
  -- FCC 4.4 External Netting Changes Ends
  --
  --fcc 4.5 apr 2004 changes start
  FUNCTION Fn_Referral(p_Cont_Ref_No          IN VARCHAR2,
                       p_Event_Seq_No         IN NUMBER,
                       p_Tag_List             IN OUT VARCHAR2,
                       p_Replicate            IN VARCHAR2,
                       p_Replicate_Other_Tags IN VARCHAR2, -- Overloading Securities
                       p_Tag_Ccy_List         OUT VARCHAR2,
                       p_Pay_Receive_List     OUT VARCHAR2,
                       p_Ac_Branch_List       OUT VARCHAR2,
                       p_Account_List         OUT VARCHAR2,
                       p_Acc_Ccy_List         OUT VARCHAR2,
                       p_Ex_Rate_List         OUT VARCHAR2,
                       p_Settlement_Amt_List  OUT VARCHAR2,
                       p_Value_Date_List      OUT VARCHAR2,
                       p_Payment_By_List      OUT VARCHAR2,
                       p_Transfer_Type_List   OUT VARCHAR2,
                       p_Instr_Type_List      OUT VARCHAR2,
                       p_Instr_No_List        OUT VARCHAR2,
                       p_Cover_Reqd_List      OUT VARCHAR2,
                       p_Charges_Details_List OUT VARCHAR2,
                       p_Our_Corresp_List     OUT VARCHAR2,
                       p_Receiver_List        OUT VARCHAR2,
                       p_Int_Reim_Inst_List   OUT VARCHAR2,
                       p_Rcvr_Corresp_List    OUT VARCHAR2,
                       p_Intermediary_List    OUT VARCHAR2,
                       p_Acc_With_Instn_List  OUT VARCHAR2,
                       p_Pay_Details_List     OUT VARCHAR2,
                       p_Sndr_To_Rcvr_List    OUT VARCHAR2,
                       p_Ordering_Inst_List   OUT VARCHAR2,
                       p_Ordering_Cust_List   OUT VARCHAR2,
                       p_Benef_Inst_List      OUT VARCHAR2,
                       p_Ult_Benef_List       OUT VARCHAR2,
                       -- Fcc 4.3 Fx Enhancement Starts
                       p_Instruction_Type_List   OUT VARCHAR2,
                       p_Instruction_Status_List OUT VARCHAR2,
                       p_Msg_Nettable_List       OUT VARCHAR2,
                       p_Recv_Ordering_Inst_List OUT VARCHAR2,
                       p_Recv_Ordering_Cust_List OUT VARCHAR2,
                       p_Acc_Cif_List            OUT VARCHAR2,
                       p_Recv_Intermediary_List  OUT VARCHAR2,
                       p_Field72_Conf_List       OUT VARCHAR2,
                       p_Dd_List                 IN OUT VARCHAR2,
                       p_Rntc_List               IN OUT VARCHAR2,
                       p_Error_Code              OUT VARCHAR2) RETURN BOOLEAN;
  --fcc 4.5 apr 2004 changes end

  --Flexcube V.CLRelease 7.0Changes starts BY PIYUSH
  TYPE t_Istb_Contractis IS TABLE OF Oltb_Settlements%ROWTYPE INDEX BY BINARY_INTEGER;
  p_Inc_Contractis Olpks_Settlements.t_Istb_Contractis;

  TYPE t_Istbs_Contract_Details IS TABLE OF Oltbs_Sett_Details%ROWTYPE INDEX BY BINARY_INTEGER;
  p_Inc_Contdetail Olpks_Settlements.t_Istbs_Contract_Details;
  --Flexcube V.CLRelease 7.0Changes ends BY PIYUSH

  --FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-307 start
  FUNCTION Fn_Resolve_Maintenance(p_Cparty       IN VARCHAR2,
                                  p_Currency     IN VARCHAR2,
                                  p_Module       IN VARCHAR2,
                                  p_Branch       IN VARCHAR2,
                                  p_Out_Cparty   OUT VARCHAR2,
                                  p_Out_Currency OUT VARCHAR2,
                                  p_Out_Module   OUT VARCHAR2,
                                  p_Out_Branch   OUT VARCHAR2,
                                  p_Error_Code   OUT VARCHAR2) RETURN BOOLEAN;
  --FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-307 end
  --06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#1332 Start By Swapnasish
  --CITIUS-LS#1332 Starts
  TYPE t_Ssi_Parties IS RECORD(
    ERROR_CODE  Ertbs_Msgs.Err_Code%TYPE,
    Error_Param VARCHAR2(4000));

  TYPE Tb_Ssi_Parties IS TABLE OF t_Ssi_Parties INDEX BY BINARY_INTEGER;

  FUNCTION Fn_Validate_Ssi_Parties(p_Code        IN VARCHAR2,
                                   p_Val_Type    IN CHAR,
                                   p_Option      IN VARCHAR2,
                                   p_Value_1     IN VARCHAR2,
                                   p_Value_2     IN VARCHAR2,
                                   p_Value_3     IN VARCHAR2,
                                   p_Value_4     IN VARCHAR2,
                                   p_Value_5     IN VARCHAR2,
                                   p_Value_6     IN VARCHAR2,
                                   p_Error_Code  OUT VARCHAR2,
                                   p_Error_Param OUT VARCHAR2,
                                   p_Ssi_Parties OUT Tb_Ssi_Parties)
    RETURN BOOLEAN;

  --CITIUS-LS#1332 Ends
  --06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#1332 End By Swapnasish
  --OBCL_14.1_Split_stl Changes Starts
  FUNCTION Fn_App_Split_Stl_Tags(p_List_Of_Is_Amount_Tags     IN VARCHAR2,
                                 p_Basis_Tag_List             IN VARCHAR2,
                                 p_List_Of_Is_Account_Ccys    IN VARCHAR2,
                                 p_List_Of_Is_Amounts         IN VARCHAR2,
                                 p_List_Of_Is_Ratio           IN VARCHAR2,
                                 Sep                          IN VARCHAR2,
                                 p_Tag                        IN VARCHAR2,
                                 p_List_Of_Amount_Tags        IN OUT VARCHAR2,
                                 p_List_Of_Amounts            IN OUT VARCHAR2,
                                 p_List_Of_Amount_Ccys        IN OUT VARCHAR2,
                                 p_List_Of_Cnt_Ccy            IN OUT VARCHAR2,
                                 p_List_Of_Chg_Amt_In_Cnt_Ccy IN OUT VARCHAR2
								 ,p_Error_Code                 OUT VARCHAR2--OBCL_14.4_DSBR_SplitSettlementAmount
                                 ,p_Error_Param                OUT VARCHAR2)--OBCL_14.4_DSBR_SplitSettlementAmount
    RETURN BOOLEAN;
  FUNCTION Fn_App_Split_Lookup(p_List_Of_Amount_Tags   IN VARCHAR2,
                               p_List_Of_Suppress_Tags IN OUT VARCHAR2,
                               p_List_Of_Zero_Amt_Tags IN OUT VARCHAR2,
                               p_Acc_Lookup            IN OUT Olpkss_Accounting.Tbl_Lookup)
    RETURN BOOLEAN;
  --OBCL_14.1_Split_stl Changes Ends
END Olpks_Settlements;
/
CREATE OR REPLACE Synonym Olpkssy FOR Olpks_Settlements
/