CREATE OR REPLACE PACKAGE Lfpks_Fee_Services AS
  /*------------------------------------------------------------------------------------------------
  -- File Name  : lfpks_fee_services.SPC
  --
  -- Module   : CF
  --
  This source is part of the Oracle Banking Corporate Lending  Software Product.   
  Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
  No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
  
  Oracle Financial Services Software Limited.
  Oracle Park, Off Western Express Highway,
  Goregaon (East), 
  Mumbai - 400 063, India.
  ----------------------------------------------------------------------------------------------------
  */
  /* Change History - Start
  
  18-July-2005  FCC 4.6.2  Citi Fee Changes July Added a Package Variable pkgFmodule-vijeth
  11-JAN-2006 FLEXCUBE V.CL RELEASE 7.0 FEE CHANGES by Sangeetha.
      Added a new function fn_create_fee_schedules.
  20-JAN-2006 FLEXCUBE V.CL RELEASE 7.0 FEE CHANGES by Sangeetha.
  10-may-2006 FLEXCUBE V.CL Release 7.0 LOT2 ITR1 SFR#140 added a function specification fn_redefine_schedule_in_vami DAYA
  10-oct-2006 fcc v.cl release 7.1 sfr#61 changes daya
  20-DEC-2006 FLEXCUBE V.CL Release 7.2 FAS91 Fee Related Changes, included fn_insert_mis_details.
  22-DEC-2006 FLEXCUBE V.CL Release 7.2 FAS91 Fee Related Changes 22122006
  20-Mar-2007 FLEXCUBE V.CL Release 7.2 , SFR#143, SFR#153 Breakage Fee Related Changes
      included 2  new functions fn_partfee_ratio,fn_recalc_partfee_ratio to recalculate the ratios for breakage fee component
  28-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#12, Retro Changes CITIUS-LS-990
  21-Nov-2007 CITIUS-LS#990 Gayathri, Transfer FEE allowed for Multiple PRAMs.
  19-Apr-2008 FLEXCUBE V.CL Release 7.4 BAU SFR#23,Changed Maturity date is need to change into FEE component end date also.
  30-APR-2008 FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-1003 ends, Sulav, Changes done for validating the overlapping schedule.
  31-MAY-2008  FLEXCUBE V.CL Release 7.4 BAU Transfer Fee Changes - ADDED NEW FUNCTION FN_PART_TRANSFERFEE_ADV - MAGI
  06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS Till#1333,STP Consolidation,By Swapnasish,Changes for populating the participant ratio table when new few component is added at the tranche.
  06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#1341,STP Consolidation,By Swapnasish,Backup and Restore is not happening for fee and margin rate maintenance tables. This is required as part of changing value date of tranche contract thru CAMD event. In tranche online screen, the call for the new functions are tagged with till#1323
  13-APR-2009 FLEXCUBE V.CL Release 7.5 lot2 RETRO#5572,System was not calculating the LC issuance fee for the existing contracts.
  17-AUG-2009 CITIUS-LS#6210 Retroe :
      03-AUG-2009 CITIUS-TILL-6082 Agency Facility(deal) level FEE changes
      04-AUG-2009 CITIUS-LS#6095 Fee validations has been added for facility level fees.
  26-AUG-2009 CITIUS-LS#6235, Clearpar and SLT incremental changes retro,changed the copyright clause.    
  12-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag05 Different Margin for Participants changes ,Added new function to populate participant margin.
  04-MAY-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag05 IUT#206 Changes done to display new participant asset ratios after PRAM is performed
  Change History - End
  
       **Changed By         : Pallavi R
       **Date               :  05-Apr-2020
       **Change Description : Expense fees Changes
       **Search String      : OBCL_14.4_LS_Expense_Fee Changes
	   
		Changed By         : Janki Kholiya
		Changed On         : 05-Nov-2020
		Search String      : OBCL_14.5_LS_PAYBYDATE_FEE changes
		Change Reason      : OBCL_14.5_LS_PAYBYDATE_FEE Changes
  **Changed By          : Mohan Pal
	**Change Description  : Introducing Acquired fee field in OLDTRONL--> Fee tab.
	**Search String       : Bug#32529321-#8
	**Changed On          : 20-Mar-2021
  
  ---------------------------------------------------------------------------------------------------------------------------------*/

  --FLEXCUBE V.CL Release 7.2 FAS91 Fee Related Changes 22122006  changes start
  g_Fire_Event BOOLEAN;
  --FLEXCUBE V.CL Release 7.2 FAS91 Fee Related Changes 22122006  changes end
  g_Tfrfee_Comp Oltbs_Amount_Due_Cs.Component%TYPE; -- 28-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#12, Retro Changes CITIUS-LS-990, Transfer FEE allowed for Multiple PRAMs
  type upldFeeTbl is table of lftbs_contract_fee%rowtype index by binary_integer;--Bug#32529321-#8

  FUNCTION Fn_Liquidate_Fee(p_Contract_Ref_No IN VARCHAR2,
                            p_Event_Seq_No    IN NUMBER,
                            p_Event_Code      IN VARCHAR2,
                            p_Auth_Stat       IN VARCHAR2,
                            p_Action_Code     IN VARCHAR2,
                            Err_Code          IN OUT VARCHAR2,
                            Err_Params        IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Create_Schedules(p_Module          IN Oltbs_Contract.Module_Code%TYPE,
                               p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                               p_Event_Seq_No    IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                               p_Component       IN Lftbs_Contract_Fee.Component%TYPE,
                               p_Version_No      IN Oltbs_Contract_Schedules.Version_No%TYPE, --FLEXCUBE V.CL Release 7.0 FEE changes,SNG
                               p_Fee_Ccy         IN Lftbs_Contract_Fee.Component_Ccy%TYPE,
                               p_Counterparty    IN Oltbs_Contract.Counterparty%TYPE,
                               p_Branch          IN Oltbs_Contract.Branch%TYPE,
                               p_Error_Code      IN OUT VARCHAR2,
                               p_Error_Parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Process_For_Borrower(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                   p_Action          IN VARCHAR2,
                                   p_Error_Code      IN OUT VARCHAR2,
                                   p_Error_Parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Process_For_Participants(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                       p_Action          IN VARCHAR2,
                                       p_Error_Code      IN OUT VARCHAR2,
                                       p_Error_Parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Process_For_a_Participant(p_Participant_Crn IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                        p_Action          IN VARCHAR2,
                                        p_Error_Code      IN OUT VARCHAR2,
                                        p_Error_Parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;
  /* CITI FEE CHANGES BY KISHORE
  Function fn_populate_propagation_master
    (
    p_lstbs_propagate_mast_rec  IN    lbtbs_propagation_master%Rowtype,
    p_error_code        IN OUT  Varchar2,
    p_error_parameter     IN OUT  Varchar2
    ) Return Boolean;
  CITI FEE CHANGES BY KISHORE */
  FUNCTION Fn_Pickup_Participant_Crn(p_Contract_Ref_No   IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                     p_Participant       IN Lptbs_Contract_Master.Counterparty%TYPE,
                                     p_Cftb_Contract_Rec OUT Oltbs_Contract%ROWTYPE,
                                     p_Error_Code        IN OUT VARCHAR2,
                                     p_Error_Parameter   IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Pickup_Borrower_Crn(p_Participant_Crn    IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                  p_Participant        IN Lptbs_Contract_Master.Counterparty%TYPE,
                                  p_Cftbs_Contract_Rec OUT Oltbs_Contract%ROWTYPE,
                                  p_Error_Code         IN OUT VARCHAR2,
                                  p_Error_Parameter    IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Register_An_Event(p_Contract_Ref_No      IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                p_Processing_Date      IN DATE,
                                p_Event_Code           IN Oltbs_Contract.Curr_Event_Code%TYPE,
                                p_Contract_Status      IN Oltbs_Contract_Event_Log.Contract_Status%TYPE,
                                p_Authorization_Status IN Oltbs_Contract.Auth_Status%TYPE,
                                p_Error_Code           IN OUT VARCHAR2,
                                p_Error_Parameter      IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Fee_Pickup(p_Contract_Ref_No  IN Oltbs_Contract.Contract_Ref_No%TYPE,
                         p_Event_Seq_No     IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                         p_Contract_Ccy     IN Cytms_Ccy_Defn.Ccy_Code%TYPE,
                         p_Value_Date       IN Oltbs_Contract_Master.Value_Date%TYPE,
                         p_Transaction_Date IN Oltbs_Contract_Master.Booking_Date%TYPE,
                         p_Calc_End_Date    IN Oltbs_Contract_Master.Maturity_Date%TYPE,
                         p_Error_Code       OUT Ertbs_Msgs.Err_Code%TYPE)
    RETURN BOOLEAN;

  FUNCTION Fn_Fee_Adv_Comp(p_Cont_Rec    IN Oltbs_Contract%ROWTYPE,
                           p_Error_Code  IN OUT VARCHAR,
                           p_Error_Param IN OUT VARCHAR) RETURN BOOLEAN;

  FUNCTION Fn_Delete_Schedule(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                              p_Component       IN Oltbs_Amount_Due_Cs.Component%TYPE,
                              p_Error_Code      IN OUT VARCHAR2,
                              p_Error_Parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Is_Rounding_Participant(p_Participant_Crn         IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                      p_Is_Rounding_Participant OUT VARCHAR2,
                                      p_Error_Code              IN OUT VARCHAR2,
                                      p_Error_Parameter         IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Backup_Fee_Tabs(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                              p_Error_Code      IN OUT VARCHAR2,
                              p_Error_Parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Delete_Fee_Tabs(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                              p_Error_Code      IN OUT VARCHAR2,
                              p_Error_Parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Restore_Fee_Tabs(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                               p_Error_Code      IN OUT VARCHAR2,
                               p_Error_Parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Copy_Fee(p_New_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                       p_Old_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                       p_Error_Code          IN OUT VARCHAR2,
                       p_Error_Parameter     IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Redefine_Schedules(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                 p_Component       IN Oltbs_Contract_Schedules.Component%TYPE, --FLEXCUBE V.CL Release 7.0 fee changes,SNG
                                 p_Fee_End_Date    IN Oltbs_Contract_Schedules.Start_Date%TYPE, --FLEXCUBE V.CL Release 7.0 fee changes,SNG
                                 p_Error_Code      IN OUT VARCHAR2,
                                 p_Error_Parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Restore_Cftbs_Fee_Accr(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                     p_Component       IN Lftbs_Contract_Fee.Component%TYPE,
                                     p_Error_Code      IN OUT VARCHAR2,
                                     p_Error_Parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;

  Pkgfmodule          VARCHAR2(2); --FCC 4.6.2 Citi Fee Changes July -vijeth
  Proc_Borr_Part_Comp VARCHAR2(1); --09-OCT-2006 FLEXCUBE V.CL Release 7.1 ITR2 SFR#55, Fee payment and component Reversal changes
  --29.09.05 FT vijeth Addition starts
  FUNCTION Fn_Gen_Fee_Liqd(Cur IN OUT Oltbs_Dly_Msg_Out%ROWTYPE)
    RETURN BOOLEAN;

  FUNCTION Fn_Gen_Part_Fee_Liqd(Cur IN OUT Oltbs_Dly_Msg_Out%ROWTYPE)
    RETURN BOOLEAN;
  --29.09.05 FT vijeth Addition Ends
  --FLEXCUBE V.CL Release 7.0 FEE changes added new function fn_create_fee_schedules,SNG
  FUNCTION Fn_Create_Fee_Schedules(p_Module          IN Oltbs_Contract.Module_Code%TYPE,
                                   p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                   p_Event_Seq_No    IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                                   p_Version_No      IN Oltbs_Contract_Schedules.Version_No%TYPE,
                                   p_Counterparty    IN Oltbs_Contract.Counterparty%TYPE,
                                   p_Branch          IN Oltbs_Contract.Branch%TYPE,
                                   p_Error_Code      IN OUT VARCHAR2,
                                   p_Error_Parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --10-may-2006 FLEXCUBE V.CL Release 7.0 LOT2 ITR1 SFR#140 DAYA
  FUNCTION Fn_Redefine_Schedule_In_Vami(p_Contract_Ref_No  IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                        p_Component        IN Oltbs_Contract_Schedules.Component%TYPE,
                                        p_Fee_End_Date     IN Oltbs_Contract_Schedules.Start_Date%TYPE,
                                        p_Fee_Old_End_Date IN DATE,
                                        p_Vami_Value_Date  IN DATE, --10-oct-2006 fcc v.cl release 7.1 sfr#61 changes daya
                                        p_Error_Code       IN OUT VARCHAR2,
                                        p_Error_Parameter  IN OUT VARCHAR2)
    RETURN BOOLEAN;

  --20-DEC-2006 FLEXCUBE V.CL Release 7.2 FAS91 Fee Related Changes starts
  FUNCTION Fn_Insert_Mis_Details(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                 p_New_Ref_No      IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                 p_Mis_Code        IN Oltbs_Class_Mapping.Txn_Mis_1%TYPE,
                                 p_Event_Tag       IN Oltms_Product_Event_Acct_Entry.Amt_Tag%TYPE,
                                 p_Component       IN Lftbs_Fas91_Fee_Master.Component%TYPE,
                                 p_Error_Code      IN OUT VARCHAR2,
                                 p_Error_Parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;
  TYPE Tbl_Fas91_Fee IS TABLE OF Lftms_Product_Fee.Fas91_Fee%TYPE INDEX BY VARCHAR2(64);
  TYPE Tbl_Mitb_Class_Mapping IS TABLE OF Oltbs_Class_Mapping%ROWTYPE INDEX BY VARCHAR2(64);
  --20-DEC-2006 FLEXCUBE V.CL Release 7.2 FAS91 Fee Related Changes ends
  --FLEXCUBE V.CL Release 7.2 FAS91 Fee Related Changes 22122006 changes start
  FUNCTION Fn_Reverse_Fas91_Entries(p_Contract_Rec IN Oltbs_Contract%ROWTYPE,
                                    p_Component    IN Lftbs_Contract_Fee.Component%TYPE,
                                    p_Error_Code   IN OUT VARCHAR2,
                                    p_Error_Param  IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Reschedule_Fas91(p_Contract_Ref_No IN Lftbs_Contract_Fee.Contract_Ref_No%TYPE,
                               p_Component       IN Lftbs_Contract_Fee.Component%TYPE,
                               p_Acc_Entry       IN Lftb_Fas91_Fee_Master.Pass_Acct_Entry%TYPE,
                               p_Active_Liqd     IN NUMBER,
                               p_Start_Date      IN Lftbs_Contract_Fee.Start_Date%TYPE,
                               p_Resch_Stdate    IN Lftbs_Contract_Fee.Start_Date%TYPE)
    RETURN BOOLEAN;
  --FLEXCUBE V.CL Release 7.2 FAS91 Fee Related Changes 22122006 changes end
  --06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS Till#1333 Start By Swapnasish
  --CITIUS-LS Till#1333 starts
  FUNCTION Fn_Pop_Part_Ratio(p_Contract_Ref_No IN VARCHAR2,
                             p_Component       IN VARCHAR2,
                             p_Err_Code        IN OUT VARCHAR2,
                             p_Err_Param       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --CITIUS-LS Till#1333 ends
  --06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS Till#1333 End By Swapnasish
  --FLEXCUBE V.CL Release 7.2 , SFR#143, SFR#153 Breakage Fee Related Changes Starts
  FUNCTION Fn_Partfee_Ratio(p_Contract_Ref_No IN VARCHAR2,
                            p_Error_Code      OUT VARCHAR2,
                            p_Error_Param     OUT VARCHAR2)
  
   RETURN BOOLEAN;
  FUNCTION Fn_Recalc_Partfee_Ratio(p_Contract_Ref_No IN VARCHAR2,
                                   p_Component       IN VARCHAR2,
                                   p_Sch_Date        IN VARCHAR2,
                                   p_Error_Code      OUT VARCHAR2,
                                   p_Error_Param     OUT VARCHAR2)
    RETURN BOOLEAN;
  --FLEXCUBE V.CL Release 7.2, SFR#143, SFR#153  Breakage Fee Related Changes ends;
  --06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#1341 Start By Swapnasish
  --CITIUS-LS#1341 Starts
  FUNCTION Fn_Maint_Fee_Margin_Rate(p_Contract_Ref_No VARCHAR2,
                                    p_Action          VARCHAR2,
                                    p_Err_Code        OUT VARCHAR2,
                                    p_Err_Param       OUT VARCHAR2)
    RETURN BOOLEAN;
  --CITIUS-LS#1341 Ends
  --06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#1341 End By Swapnasish
  --19-Apr-2008 FLEXCUBE V.CL Release 7.4 BAU SFR#23,Changes Starts
  FUNCTION Fn_Update_Enddate(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                             p_Maturity_Date   IN Oltbs_Contract_Master.Maturity_Date%TYPE,
                             p_Action_Code     IN NUMBER,
                             p_Error_Code      OUT Ertbs_Msgs.Err_Code%TYPE)
    RETURN BOOLEAN;
  --19-Apr-2008 FLEXCUBE V.CL Release 7.4 BAU SFR#23,Changes Ends
  --30-APR-2008 FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-1003 start
  FUNCTION Fn_Chk_Overlapping_Sch(p_Contract_Ref_No IN VARCHAR2,
                                  p_Component       IN VARCHAR2,
                                  p_Err_Code        IN OUT VARCHAR2,
                                  p_Err_Param       IN OUT VARCHAR2)
  
   RETURN BOOLEAN;

  --30-APR-2008 FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-1003 ends
  --31-MAY-2008  FLEXCUBE V.CL Release 7.4 BAU Transfer Fee Changes - ADDED NEW FUNCTION FN_PART_TRANSFERFEE_ADV - MAGI - START
  FUNCTION Fn_Part_Transferfee_Adv(Cur IN OUT Oltbs_Dly_Msg_Out%ROWTYPE)
    RETURN BOOLEAN;
  --31-MAY-2008  FLEXCUBE V.CL Release 7.4 BAU Transfer Fee Changes - ADDED NEW FUNCTION FN_PART_TRANSFERFEE_ADV - MAGI- END
  --13-APR-2009 FLEXCUBE V.CL Release 7.5 lot2 RETRO#5572 Starts
  PROCEDURE Pr_Default_Tax(p_Contract_Ref_No VARCHAR2,
                           p_Component       VARCHAR2);
  --13-APR-2009 FLEXCUBE V.CL Release 7.5 lot2 RETRO#5572 Ends             

  -- 17-AUG-2009 CITIUS-LS#6210 Retroe STARTS
  FUNCTION Fn_Validate_Fee(p_Ref_No    IN Oltbs_Contract.Contract_Ref_No%TYPE,
                           p_Err_Code  OUT VARCHAR2,
                           p_Err_Param OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Delete_Event(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                           p_Event_Code      IN Oltbs_Contract_Event_Log.Event_Code%TYPE,
                           p_Error_Code      IN OUT VARCHAR2,
                           p_Error_Parameter IN OUT VARCHAR2) RETURN BOOLEAN;
  -- 17-AUG-2009 CITIUS-LS#6210 Retroe ENDS

  --12-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag05 Different Margin for Participants changes start
  FUNCTION Fn_Populate_Participant_Margin(p_Branch_Code     IN Lftms_Margin_Rate.Branch_Code%TYPE,
                                          p_Contract_Ref_No IN Lftms_Margin_Rate.Contract_Ref_No%TYPE,
                                          p_Component       IN Lftms_Margin_Rate.Component%TYPE,
                                          p_Customer_No     IN Lftms_Margin_Rate.Customer_No%TYPE,
                                          p_Effective_Date  IN Lftms_Margin_Rate.Effective_Date%TYPE,
                                          p_From_Basis_Amt  IN Lftms_Margin_Rate.From_Basis_Amt%TYPE,
                                          p_Ccy             IN Lftms_Margin_Rate.Ccy%TYPE,
                                          p_Err_Code        IN OUT VARCHAR2,
                                          p_Err_Param       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --12-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag05 Different Margin for Participants changes end

  --04-MAY-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag05 IUT#206 Changes start
  FUNCTION Fn_Copy_Transferor_Margin(p_Branch_Code     IN Lftms_Margin_Rate.Branch_Code%TYPE,
                                     p_Contract_Ref_No IN Lftms_Margin_Rate.Contract_Ref_No%TYPE,
                                     p_Transferor      IN Lbtbs_Participant_Transfer.Transfer_From%TYPE,
                                     p_Transferee      IN Lbtbs_Participant_Transfer.Transfer_To%TYPE,
                                     p_Pram_Date       IN Lbtbs_Transfer_Master.Value_Date%TYPE,
                                     p_Err_Code        IN OUT VARCHAR2,
                                     p_Err_Param       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --04-MAY-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag05 IUT#206 Changes end
  --OBCL_14.4_LS_Expense_Fee Changes Starts
  FUNCTION Fn_Populate_Fees(p_Contract_Ref_No      IN Lftbs_Contract_Fee.Contract_Ref_No%TYPE,
                            p_Component            IN Lftbs_Contract_Fee.Component%TYPE,
                            p_Event_Seq_No         IN Lftbs_Contract_Fee.Event_Seq_No%TYPE,
                            p_Association_Date     IN Lftbs_Contract_Fee.Association_Date%TYPE,
                            p_Fee_Rule             IN Lftbs_Contract_Fee.Fee_Rule%TYPE,
                            p_Component_Ccy        IN Lftbs_Contract_Fee.Component_Ccy%TYPE,
                            p_Start_Date           IN Lftbs_Contract_Fee.Start_Date%TYPE,
                            p_End_Date             IN Lftbs_Contract_Fee.End_Date%TYPE,
                            p_Fee_Col_Mode         IN Lftbs_Contract_Fee.Fee_Collection_Mode%TYPE,
                            p_Disc_Accr_Applicable IN VARCHAR2, --15-JAN-2009 FCC V.CL Release 7.5 FS TAG 8 < Discount Accrual Changes>
                            p_Error_Code           OUT Ertbs_Msgs.Err_Code%TYPE)
    RETURN BOOLEAN;
  --OBCL_14.4_LS_Expense_Fee Changes Ends
  
  --OBCL_14.5_LS_PAYBYDATE_FEE Changes start
   FUNCTION Fn_Calc_Delay_Days(p_Reference_No IN VARCHAR2, p_component IN VARCHAR2)
     RETURN NUMBER ;
  --OBCL_14.5_LS_PAYBYDATE_FEE Changes end
  
END Lfpks_Fee_Services;
/
CREATE OR REPLACE Synonym Lfpkss_Fee_Services FOR Lfpks_Fee_Services
/