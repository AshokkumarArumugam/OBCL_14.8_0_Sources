CREATE OR REPLACE PACKAGE Olpks_Batch AS
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_batch.SPC
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
  
  26-june-2008 FCC V.CL Release 7.4 FSLOT4-02 BAU Commitment Expiry Processing changes
  25-NOV-2010 FLEXCUBE V.CL Release 7.8 VOL3 FS Tag3 Loan Pricing changes. Create or replace moved to above history
  06-APR-2011 Flexcube V.CL Release 7.9, Cost of Credit Changes, fn_trade_reclassification moved to specification, as for COC enabled commitments it will happen during trade booking and amendments.
  25-MAY-2011 Flexcube V.CL Release 7.9, Adjustments Changes , Added fn_adjustment_reversal for reverse adjustment amount
  30-NOV-2011 Flexcube V.CL Release 7.10 FS Tag13,LC Sublimit Reclassification change:added declaration of Fn_get_trade_ratio and Fn_get_ld_ref_no
                as those functions will be acessed from outside.
  05-OCT-2016 -- Search String :OFCL12.3 CHANGES , end_of_input column is fetched from sttms_core_branch_status instead of oltms_branch
	
  **Changed By         : Chandra Prasath.N
  **Date               : 23-Jul-2020
  **Change Description : Added global variable to differentiate the AUTCAPWR process during BOD.
  **Search String      : OBCL_14.4_Capitalization_On_Insf_Funds
  
  **Changed By         : Kavitha Asokan
  **Date               : 28-Aug-2020
  **Change Description : Added global variable to differentiate the AUTRCLIQ process during EOD.
  **Search String      : OBCL14.4_Ristourne_component
  
  **Changed By          : Vineeth T M
  **Change Description  : Added elcm call for expy of commitment(only agency contracts).
  **Search String       : OBCL_14.4_SUPP#32475808 changes
  **Changed On          : 18-May-2021
  
  **Changed By         : Chandra Prasath.N
  **Date               : 04-May-2022
  **Change Description : Added global variable to differentiate the AUTOCOMP process during EOD.
  **Search String      : Bug#34093808

  ----------------------------------------------------------------------------------------------------
  */
  --CREATE OR REPLACE PACKAGE olpks_batch
  --AS
	g_auto_cap_on_insf_process			VARCHAR2(1):= 'N'; --OBCL_14.4_Capitalization_On_Insf_Funds Changes
	g_credit_comp_avl                   VARCHAR2(1):= 'N'; --OBCL14.4_Ristourne_component changes 
	g_auto_compounding_process			VARCHAR2(1):= 'N'; --Bug#34093808
  --Bug#29271464 changes start
  PROCEDURE Pr_Skip_Handler(P_Stage IN VARCHAR2);
  PROCEDURE Pr_Set_Skip_Kernel;
  PROCEDURE Pr_Set_Activate_Kernel;
  PROCEDURE Pr_Set_Skip_Cluster;
  PROCEDURE Pr_Set_Activate_Cluster;
  FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
--Bug#29271464 changes end
  FUNCTION Fn_Process_For_a_Day(p_Module                    IN Oltbs_Contract.Module_Code%TYPE,
                                p_Current_Accrual_Ref_No    IN OUT Oltbs_Auto_Function_Details.Current_Accrual_Ref_No%TYPE,
                                p_Parallelize_Auto_Function IN Oltbs_Auto_Function_Setup.Parallelize_Auto_Function%TYPE,
                                p_Processing_Date           IN DATE,
                                p_Error_Code                IN OUT VARCHAR2,
                                p_Error_Parameter           IN OUT VARCHAR2)
    RETURN BOOLEAN;

  --FCC 4.5Lot1 London FX/MM FAST Changes start
  FUNCTION Fn_Parallel_Fwd_Init(Pm_Function_Id IN VARCHAR2,
                                Pm_Module      IN Oltbs_Contract.Module_Code%TYPE,
                                Pm_Err_Code    IN OUT VARCHAR2,
                                Pm_Params      IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Calculate_Process_Till_Date(p_Application_Date IN DATE,
                                          -- p_eoc_group            IN        oltms_branch.end_of_input%TYPE,      --OFCL12.3 CHANGES START HERE
                                          p_Eoc_Group         IN Sttms_Core_Branch_Status.End_Of_Input%TYPE, --OFCL12.3 CHANGES END HERE
                                          p_Process_Till_Date OUT DATE,
                                          p_Func_Id           IN VARCHAR2,
                                          p_Error_Code        IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Previous_Process_Date(p_Module          IN Oltbs_Contract.Module_Code%TYPE,
                                    p_Prev_Date       OUT DATE,
                                    p_Error_Code      IN OUT VARCHAR2,
                                    p_Error_Parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Parallel_Liqd(Pm_Function_Id IN VARCHAR2,
                            Pm_Module      IN Oltbs_Contract.Module_Code%TYPE,
                            Pm_Err_Code    IN OUT VARCHAR2,
                            Pm_Params      IN OUT VARCHAR2) RETURN BOOLEAN;

  --FCC 4.5Lot1 London FX/MM FAST Changes end
  --FCC V.CL Release 7.4 FSLOT4-02 BAU Commitment Expiry Processing changes START
  FUNCTION Fn_Auto_Expy_Ld(p_Branch          IN Oltbs_Contract.Branch%TYPE,
                           p_Processing_Date IN DATE,
                           p_Comt_Freq       IN Oltbs_Commitfreq.Bod_Commit_Count%TYPE,
                           p_Err_Code        IN OUT Ertbs_Msgs.Err_Code%TYPE,
                           p_Params          IN OUT VARCHAR2) RETURN BOOLEAN;
  --FCC V.CL Release 7.4 FSLOT4-02 BAU Commitment Expiry Processing changes ENDS
  
   -- Auto Expy ELCM Call starts
  
  FUNCTION Fn_Auto_Expy_OL(p_Branch          IN Oltbs_Contract.Branch%TYPE,
                           p_User_Id            IN VARCHAR2,
                         p_Processing_Date IN DATE,
                         p_contract_ref_no IN Oltbs_Contract.Contract_ref_no%TYPE,
                         p_Elcm_Msgid         OUT Sypks_Utils.g_Elcm_Msgid%TYPE,
                         p_Err_Code        IN OUT Ertbs_Msgs.Err_Code%TYPE,
                         p_Params          IN OUT VARCHAR2 ,
                         p_suppr_event     in varchar2 default 'N') RETURN VARCHAR2 ;--OBCL_14.4_SUPP#32475808 changes
   -- Auto Expy ELCM Call ends                      
  --30-jul-2009 CITIUS-LS#6068 TRCL changes
  FUNCTION Fn_Trade_Reclassification(p_Branch_Code     IN Oltms_Branch.Branch_Code%TYPE,
                                     p_Process_Date    IN Sttms_Dates.Today%TYPE,
                                     p_Err_Code        IN OUT VARCHAR2,
                                     p_Err_Param       IN OUT VARCHAR2,
                                     p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE DEFAULT 'ALL' --06-APR-2011 Flexcube V.CL Release 7.9, Cost of Credit Changes
                                     ) RETURN BOOLEAN;
  ----30-jul-2009 CITIUS-LS#6068 TRCL changes

  --25-NOV-2010 FLEXCUBE V.CL Release 7.8 VOL3 FS Tag3 Loan Pricing changes start
  FUNCTION Fn_Reval_Batch(p_Branch           IN Tltbs_Contract_Master.Branch%TYPE,
                          p_Processing_Date  IN DATE,
                          p_Module           IN Oltbs_Contract.Module_Code%TYPE,
                          p_Commit_Frequency IN NUMBER,
                          p_Error_Code       IN OUT Ertbs_Msgs.Err_Code%TYPE,
                          p_Error_Parameter  IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Reversal_Of_Reval(p_Branch           IN VARCHAR2,
                                p_Processing_Date  IN DATE,
                                p_Module           IN Oltbs_Contract.Module_Code%TYPE,
                                p_Commit_Frequency IN NUMBER,
                                p_Error_Code       IN OUT VARCHAR2,
                                p_Error_Param      IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --25-NOV-2010 FLEXCUBE V.CL Release 7.8 VOL3 FS Tag3 Loan Pricing changes end
  --25-MAY-2011 Flexcube V.CL Release 7.9, Adjustments Changes starts
  FUNCTION Fn_Adjustment_Reversal(p_Branch_Code     IN Oltms_Branch.Branch_Code%TYPE,
                                  p_Process_Date    IN Sttms_Dates.Today%TYPE,
                                  p_Holiday         IN VARCHAR2,
                                  p_Err_Code        IN OUT VARCHAR2,
                                  p_Err_Param       IN OUT VARCHAR2,
                                  p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE DEFAULT 'ALL')
    RETURN BOOLEAN;
  --25-MAY-2011 Flexcube V.CL Release 7.9, Adjustments Changes ends
  --30-NOV-2011 Flexcube V.CL Release 7.10 FS Tag13,LC Sublimit Reclassification change start
  FUNCTION Fn_Get_Trade_Ratio(p_Contract_Ref_No    IN Oltbs_Contract.Contract_Ref_No%TYPE,
                              p_Trade_Amount       IN Tltbs_Contract_Master.Trade_Amount%TYPE,
                              p_Process_Date       IN Sttms_Dates.Today%TYPE,
                              p_Contract_Status    IN Oltbs_Contract.Contract_Status%TYPE,
                              p_Participant        IN Lbtbs_Contract_Participant.Participant%TYPE --13-JAN-2009 FLEXCUBE V.CL Release 7.4 MTR2 SFR#<103>, <13-JAN-2009> changes here
                             ,
                              p_Tranche_Ref_No     OUT Oltbs_Contract.Contract_Ref_No%TYPE,
                              p_Global_Tranche_Amt OUT Oltbs_Contract_Master.Amount%TYPE,
                              p_Trade_Ratio        OUT NUMBER,
                              p_Err_Code           IN OUT VARCHAR2,
                              p_Err_Param          IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Get_Ld_Ref_No(p_Borr_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                            p_Posn_Id     IN Tltms_Position_Identifier.Position_Identifier%TYPE,
                            p_Ld_Ref_No   OUT Oltbs_Contract.Contract_Ref_No%TYPE,
                            p_Err_Code    IN OUT VARCHAR2,
                            p_Err_Param   IN OUT VARCHAR2) RETURN BOOLEAN;
  --OBCL_14.0.0.0.0_Batch_Integration Changes Starts
  PROCEDURE Pr_Auto_Commit_Proc(p_Product          IN Oltbs_Contract.Product_Code%TYPE,
                                p_Process          IN VARCHAR2,
                                p_Processding_Date IN DATE,
                                p_Module           IN VARCHAR2,
                                p_Id               OUT NUMBER);
                                
  FUNCTION Fn_Process_Atomic_Task_batch(p_Branch                     IN VARCHAR2,
                                  p_userId                     IN VARCHAR2,
                                  p_Module                 IN VARCHAR2,
                                  p_Current_Accrual_Ref_No IN OUT VARCHAR2,
                                  p_Processing_Date        IN DATE,
                                  p_Process_Name           IN VARCHAR2,
                                  p_Product                IN VARCHAR2,
                                  pkg_Commit_Frequency       IN VARCHAR2,
                                  p_Task_Rowid             IN VARCHAR2,
                                  p_Error_Code             IN OUT VARCHAR2,
                                  p_Error_Parameter        IN OUT VARCHAR2)
    RETURN VARCHAR2;
  PROCEDURE Pr_Log_Trcl_Failure(p_Branch_Code IN Oltms_Branch.Branch_Code%TYPE,
                                p_Source_Code IN Oltbs_Upload_Exception_Cs.Source_Code%TYPE,
                                p_Source_Ref  IN Oltbs_Upload_Exception_Cs.Source_Ref%TYPE,
                                p_Upload_Id   IN Oltbs_Upload_Exception_Cs.Upload_Id%TYPE,
                                p_Err_Code    IN Oltbs_Upload_Exception_Cs.ERROR_CODE%TYPE,
                                p_Err_Param   IN Oltbs_Upload_Exception_Cs.Error_Parameters%TYPE);
  --30-NOV-2011 Flexcube V.CL Release 7.10 FS Tag13,LC Sublimit Reclassification change end
  g_sbf_fee_acr_batch VARCHAR2(1) := 'N'; --OBCL_14.5_STAND_BY_FEE
END Olpks_Batch;
/
create or replace synonym olpkss_batch for olpks_batch
/