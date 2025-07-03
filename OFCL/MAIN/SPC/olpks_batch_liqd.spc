CREATE OR REPLACE PACKAGE Olpks_Batch_Liqd AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : Olpks_Batch_Liqd.spc
  **
  ** Module     : Loans and Deposits
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Oracle Banking Corporate Lending  Software Product.   Copyright © 2018.  All rights reserved
  **
  **
  ** No part of this work may be reproduced, stored in a retrieval system, adopted
  ** or transmitted in any form or by any means, electronic, mechanical,
  ** photographic, graphic, optic recording or otherwise, translated in any
  ** language or computer language, without the prior written permission of
  ** Oracle and/or its affiliates.
  **
  ** Oracle Financial Services Software Limited.
  ** Oracle Park, Off Western Express Highway,
  ** Goregaon (East),
  ** Mumbai - 400 063, India
  ** India
  -------------------------------------------------------------------------------------------------------
  CHANGE HISTORY

  SFR Number         :
  Changed By         :
  Change Description :

  Changed By         : Baljinder Singh
  Changed On         : 04-Nov-2020
  Change Description : FN_LIQUIDATE_COMMITMENT FUNCTION NOT PRESENT IN OLPKS_BATCH_LIQD 
  Search String      : 32037771 
  
  **Changed By          : Vineeth T M
  **Change Description  : Added elcm call for liquidation of commitment(only agency contracts).
  **Search String       : OBCL_14.4_SUPP#32475808 changes
  **Changed On          : 18-May-2021

  **Changed By           : Mohan Pal
  **Changed On           : 17-Dec-2021
  **Change Description   : Changes w.r.t. Weekend AUTOLIQD
  **Search String        : Bug#33613290

  **Changed By           : Abhik Das
  **Changed On           : 16-Mar-2023
  **Change Description   : g_Eca_Ref_No is changed to maximum length
  **Search String        : OBCL_14.5_BNTB_Bug#35175386_Changes
  
  ** Changed By        : Revathi Dharmalingam
  **Date               : 24-Mar-2023
  **Change Description :  Allowing liquidation incase of multi settlement accounts, system should have the ability to process the liquidation even if one of the account in the settlement instructions does not have sufficient balance. 
  **Search String      : OBCL_14.8_ECA_Split_Partial_Liquidation

  -------------------------------------------------------------------------------------------------------
  */
  ---OBCL_14.5_BNTB_Bug#35175386_Changes Starts---
  --g_Eca_Ref_No      VARCHAR2(32676);
  g_Eca_Ref_No      VARCHAR2(32767);
  ----OBCL_14.5_BNTB_Bug#35175386_Changes Ends----
  g_batch_liqd_accr VARCHAR2(1) := 'N';----Bug#33613290
  g_eca_split   VARCHAR2(1) := 'N';-- --OBCL_14.8_ECA_Split_Partial_Liquidation Changes 
  TYPE Ty_Tb_Oltb_Eca_Queue IS TABLE OF Cotbs_Eca_Queue%ROWTYPE INDEX BY BINARY_INTEGER;
  TYPE Ty_Tb_Oltb_Eca_Queue_Det IS TABLE OF Cotbs_Eca_Queue_Detail%ROWTYPE INDEX BY BINARY_INTEGER;

  TYPE Ty_Eca_Queue IS RECORD(
    Eca_Queue         Ty_Tb_Oltb_Eca_Queue,
    Eca_Queue_Details Ty_Tb_Oltb_Eca_Queue_Det);
  TYPE Contract_Liq_Record IS RECORD(
    Contract_Ref_No              Oltbs_Contract.Contract_Ref_No%TYPE,
    Latest_Version_No            Oltbs_Contract.Latest_Version_No%TYPE,
    Latest_Event_Seq_No          Oltbs_Contract.Latest_Event_Seq_No%TYPE,
    Status                       Oltbs_Contract.User_Defined_Status%TYPE,
    Currency                     Oltbs_Contract.Contract_Ccy%TYPE,
    Product_Code                 Oltbs_Contract.Product_Code%TYPE,
    Module_Code                  Oltbs_Contract.Module_Code%TYPE,
    Min_Amt_Partial_Liq          Oltms_Product_Master_Ld.Min_Amt_Partial_Liq%TYPE,
    Min_Amt_Ccy                  Oltms_Product_Master_Ld.Min_Amt_Ccy%TYPE,
    Verify_Funds                 Oltbs_Contract_Preference.Verify_Funds%TYPE,
    Deduct_Tax_On_Capitalisation Oltbs_Contract_Preference.Deduct_Tax_On_Capitalisation%TYPE,
    Schedule_Type                Oltbs_Contract_Preference.Contract_Schedule_Type%TYPE,
    Value_Date                   Oltbs_Contract_Master.Value_Date%TYPE,
    Maturity_Type                Oltbs_Contract_Master.Maturity_Type%TYPE,
    Rollover_Allowed             Oltbs_Contract_Master.Rollover_Allowed%TYPE,
    Maturity_Date                Oltbs_Contract_Master.Maturity_Date%TYPE,
    Product_Type                 Oltbs_Contract.Product_Type%TYPE,
    Credit_Line                  Oltbs_Contract_Master.Credit_Line%TYPE,
    Main_Comp                    Oltbs_Contract_Master.Main_Comp%TYPE,
    Counterparty                 Oltbs_Contract.Counterparty%TYPE,
    Payment_Method               Oltbs_Contract_Master.Payment_Method%TYPE,
    Rollover_Type                Oltbs_Contract_Rollover.Rollover_Type%TYPE,
    Track_Accrued_Interest       Oltms_Product_Master_Ld.Track_Accrued_Interest%TYPE,
    Rollover_Method              Oltbs_Contract_Master.Rollover_Method%TYPE,
    Rollover_Mechanism           Oltbs_Contract_Master.Rollover_Mechanism%TYPE,
    Rollover_Indicator           Oltbs_Contract_Master.Rollover_Indicator%TYPE,
    Parent_Contract_Ref_No       Oltbs_Contract_Master.Parent_Contract_Ref_No%TYPE,
    Roll_Inst_Status             Oltbs_Contract_Rollover.Roll_Inst_Status%TYPE,
    Tranche_Ref_No               Oltbs_Contract.Contract_Ref_No%TYPE,
    Prime_Loan                   Oltms_Product_Master_Ld.Prime_Loan%TYPE,
    Change_To_Manual             Oltbs_Contract_Rollover.Change_To_Manual%TYPE,
    Department_Code              Oltbs_Contract.Department_Code%TYPE,
	agency_contract  oltbs_contract_master.agency_contract%TYPE --28477841 changes
	);

  TYPE Ref_Contracts_To_Be_Liq IS REF CURSOR RETURN Contract_Liq_Record;
  FUNCTION Fn_Create_Eca_Request(Pbranch         IN Oltbs_Contract.Branch%TYPE,
                                 p_User_Id       IN VARCHAR2,
                                 Pmodule         IN Oltbs_Contract.Module_Code%TYPE,
                                 Pprocessingdate IN DATE,
                                 Pproduct        IN Oltbs_Contract.Product_Code%TYPE,
                                 Pcommitfreq     IN Oltbs_Commitfreq.Bod_Commit_Count%TYPE,
                                 Pjobseqno       IN Lbtbs_Job_Queue.Seq_No%TYPE,
                                 Perrorcode      IN OUT VARCHAR2,
                                 Perrorparam     IN OUT VARCHAR2)
    RETURN VARCHAR2;
  FUNCTION Fn_Process_For_Contract(p_Branch             IN Oltbs_Contract.Branch%TYPE,
                                   p_User_Id            IN VARCHAR2,
                                   p_Processingdate     IN DATE,
                                   p_Product            IN Oltbs_Contract.Product_Code%TYPE,
                                   p_Module             IN VARCHAR2,
                                   p_Eca_Check_Required IN VARCHAR2,
                                   p_Schlvlproc         IN VARCHAR2,
                                   p_Contractrefno      IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                   p_Jobseqno           IN Lbtbs_Job_Queue.Seq_No%TYPE,
                                   p_Ty_Cont            IN VARCHAR2,
                                   p_Elcm_Msgid         OUT Sypks_Utils.g_Elcm_Msgid%TYPE,
                                   Perrorcode           IN OUT VARCHAR2,
                                   Perrorparam          IN OUT VARCHAR2)
    RETURN VARCHAR2;
  FUNCTION Fn_Process_For_Roll(p_Branch             IN Oltbs_Contract.Branch%TYPE,
                               p_User_Id            IN VARCHAR2,
                               p_Processingdate     IN DATE,
                               p_Module             IN VARCHAR2,
                               p_Eca_Check_Required IN VARCHAR2,
                               p_Eca_Ref_No         IN VARCHAR2,
                               p_Contractrefno      IN Oltbs_Contract.Contract_Ref_No%TYPE,
                               p_Jobseqno           IN Lbtbs_Job_Queue.Seq_No%TYPE,
                               p_Ty_Cont            IN VARCHAR2,
                               p_Elcm_Msgid         OUT Sypks_Utils.g_Elcm_Msgid%TYPE,
                               p_rfr_Msgid         OUT Sypks_Utils.g_rfr_Msgid%TYPE,
                               Perrorcode           IN OUT VARCHAR2,
                               Perrorparam          IN OUT VARCHAR2)
    RETURN VARCHAR2;
  FUNCTION Fn_Process_Fwdiqd(p_Branch           IN Oltbs_Contract.Branch%TYPE,
                             p_User_Id          IN VARCHAR2,
                             p_Contract_Ref_No  IN Oltbs_Contract_Payment_Due.Contract_Ref_No%TYPE,
                             p_Event_Seq_No     IN Oltbs_Contract_Payment_Due.Event_Seq_No%TYPE,
                             p_Transaction_Date IN Oltbs_Contract_Payment_Due.Transaction_Date%TYPE,
                             p_Elcm_Msgid       OUT Sypks_Utils.g_Elcm_Msgid%TYPE,
                             p_Eca_Ref_No       OUT VARCHAR2,
                             p_rfr_Msgid        OUT Sypks_Utils.g_rfr_Msgid%TYPE,
                             Perrorcode         IN OUT VARCHAR2,
                             Perrorparam        IN OUT VARCHAR2)
    RETURN VARCHAR2;
    -- 32037771 starts 

     FUNCTION Fn_Process_For_fc_Contract
      (
      pBranch       IN    oltbs_contract.branch%type,
      pProcessingDate IN    date,
      pProduct      IN    oltbs_contract.product_code%type,
      pCommitFreq     IN      OLTBS_COMMITFREQ.bod_commit_count%type,
      pContractRefNo      IN    oltbs_contract.CONTRACT_REF_NO%TYPE,--Markandain
      pJobSeqNo     IN    lbtbs_job_queue.seq_no%TYPE,  --12-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#4,Retro Changes CITIUS-LS-801
      pErrorcode      IN OUT  VARCHAR2,
      pErrorParam     IN OUT  Varchar2
      )
      Return Boolean;
    
    FUNCTION  fn_auto_liq
      (
      pBranch       IN    oltbs_contract.branch%type,
      pModule       IN      oltbs_contract.module_code%type,
      pProcessingDate   IN    date,
      pProduct      IN    oltbs_contract.product_code%type,
      pCommitFreq      IN     OLTBS_COMMITFREQ.bod_commit_count%type,
      pJobSeqNo     IN lbtbs_job_queue.seq_no%TYPE, --12-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#4,Retro Changes CITIUS-LS-801
      pErrorcode      IN OUT  VARCHAR2,
      pErrorParam     IN OUT  Varchar2
      )
      Return Boolean;

    FUNCTION  fn_auto_liq_prod
      (
      pBranch       IN    oltbs_contract.branch%type,
      pProcessingDate IN    date,
      pProduct      IN    oltbs_contract.product_code%type,
      pCommitFreq     IN      OLTBS_COMMITFREQ.bod_commit_count%type,
      pJobSeqNo     IN    lbtbs_job_queue.seq_no%TYPE, --12-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#4,Retro Changes CITIUS-LS-801
      pErrorcode      IN OUT  VARCHAR2,
      pErrorParam     IN OUT  Varchar2
      )
      Return Boolean;
    
    FUNCTION Fn_Auto_extension_Sch(p_Branch           IN Oltbs_Contract.Branch%TYPE,
                                   p_User_Id          IN VARCHAR2,
                                   p_Module          IN VARCHAR2,
                                   Pprocessingdate IN DATE,
                                   p_Commit_Frequency IN NUMBER,
                                   p_Error_Code      IN OUT VARCHAR2,
                                   p_Error_Parameter IN OUT VARCHAR2)
    RETURN VARCHAR2;
    
    FUNCTION Fn_Liquidate_Commitment(p_Branch           IN Oltbs_Contract.Branch%TYPE,
                                   p_User_Id          IN VARCHAR2,
                                   Pcontractrefno  IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                   Pprocessingdate IN DATE,
                                   Peventseqno IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                                   Pversionno  IN Oltbs_Contract.Latest_Version_No%TYPE ,
                                   p_Elcm_Msgid      OUT Sypks_Utils.g_Elcm_Msgid%TYPE,--OBCL_14.4_SUPP#32475808 changes
                                   p_Error_Code      IN OUT VARCHAR2,
                                   p_Error_Parameter IN OUT VARCHAR2)
    RETURN VARCHAR2;
  -- 32037771 ends 
  FUNCTION Fn_Process_Fwdiqd_Auth(p_Contract_Ref_No IN Oltbs_Contract_Payment_Due.Contract_Ref_No%TYPE,
                                  p_Event_Seq_No    IN Oltbs_Contract_Payment_Due.Event_Seq_No%TYPE,
                                  p_Branch          IN Oltbs_Contract.Branch%TYPE,
                                  p_User_Id         IN VARCHAR2,
                                  p_Eca_Ref         IN VARCHAR2,
                                  Perrorcode        IN OUT VARCHAR2,
                                  Perrorparam       IN OUT VARCHAR2)
    RETURN VARCHAR2;
END Olpks_Batch_Liqd;
/
CREATE OR REPLACE Synonym Olpkss_Batch_Liqd FOR Olpks_Batch_Liqd
/