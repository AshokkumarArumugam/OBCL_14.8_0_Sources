CREATE OR REPLACE PACKAGE Olpks_Batch_Autocap AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : Olpks_Batch_Autocap.spc
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
  
  -------------------------------------------------------------------------------------------------------
  */
  g_Eca_Ref_No VARCHAR2(32676);
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
    Agency_Contract              Oltbs_Contract_Master.Agency_Contract%TYPE --28477841 changes
    );

  TYPE Ref_Contracts_To_Be_Liq IS REF CURSOR RETURN Contract_Liq_Record;
  FUNCTION Fn_Process_For_Contract(Pbranch              IN Oltbs_Contract.Branch%TYPE,
                                        p_User_Id            IN VARCHAR2,
                                        Pprocessingdate      IN DATE,
                                        p_Product            IN Oltbs_Contract.Product_Code%TYPE,
                                        p_Module             IN VARCHAR2,
                                        p_Eca_Check_Required IN VARCHAR2,
                                        p_Schlvlproc         IN VARCHAR2,
                                        Pcontractrefno       IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                        p_Jobseqno           IN Lbtbs_Job_Queue.Seq_No%TYPE,
                                        p_Ty_Cont            IN VARCHAR2,
                                        p_Elcm_Msgid         OUT Sypks_Utils.g_Elcm_Msgid%TYPE,
                                        Perrorcode           IN OUT VARCHAR2,
                                        Perrorparam          IN OUT VARCHAR2)
    RETURN VARCHAR2;

END Olpks_Batch_Autocap;
/
CREATE OR REPLACE Synonym Olpkss_Batch_Autocap FOR Olpks_Batch_Autocap
/