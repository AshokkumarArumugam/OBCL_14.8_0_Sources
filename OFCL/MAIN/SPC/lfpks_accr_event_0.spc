CREATE OR REPLACE PACKAGE Lfpks_Accr_Event_0 AS
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lfpks_accr_event_0.SPC
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
  ----------------------------------------------------------------------------------------------------
  */

  /* Change history
  
  04-SEP-2002 FCC4.1 OCT'2002 change - module code added
  
  23-APR-2003 ITR2#1   Fcc4.2 OPS related changes.Code change for enabling the workflow in accrual feeinput as well...
             code change to enable the user to unlock the record with workflow status 'IN','JE','JS','JA'
             without firing the new events.Now the liquidation happens not based on the Fee amount,rather
             it is based on the liquidation amount...New Operation type 'FELIQ' and 'LIQ' are added.
  
  29-NOV-2004 FCC 4.6.1 DEC 2004 EIM Enhancements changes - Discount accrual processing for fees
  30-DEC-2004 FCC 4.6.1 DEC 2004 EIM Enhancements changes
      Added new functions fn_delete_upload_fee and  fn_reverse_upload_fee for uploaded fee components.
      Modified Fn_save by adding new parameter p_upload_fee
  - FCC 4.6.1 JAN 2005 ITR-1 SFR-196 For changing copyright clause / release name
  
  20-JUN-2005 FCC 4.6.2 CITI LS/FEE Changes Changed the function fn_register_a_event from 13 param to 11 paramsa
  29-JUL-2009 CITIUS-LS#6071 system should post unamort Fee refund during SLT Trade Booking and unamort Fee upload during SLT Trade Reversal
  25-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10161 UK to US Retroe Changes:
            1)30-May-2011 FLEXCUBE V.CL Release 7.7 UAT EURCITIPLC-LD#9679 changes -- Amort Fee reversals are not getting fired for all the events.
  26-SEP-2011 CITIUS-LS#11366 Added missing retros.         
  14-Oct-2011 FLEXCUBE V.CL Release 7.7.2 UAT EURCITIPLC-LD#11489 changes -- For the Amort Fee which is already Fully Paid Back or Reversed, Unable to change the Accrual Frequency when the Accrual Type is changed from 'F' to 'S' and Previous Version Schedules are being shown
  26-OCT-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol#1 Tag#4, Cost of Credit - Re-performing loans changes,Amortization Fees (FAS91 and Marks) Accrual Restart
  29-OCT-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol1 Tag05,Cost of Credit-Negative Carrying Values changes,Refund of all the amortise fee when commitment ncv goes negative.
  */

  -- FCC 4.6.2 CITI FEE CHANGES START BY KISHORE
  /*
  FUNCTION fn_register_a_event
    (
    p_module        IN        oltbs_contract.MODULE_CODE%TYPE,   --FCC4.1 OCT'2002 change
    p_contract_ref_no   IN    oltbs_contract.contract_ref_no%TYPE,
    p_event_code      IN    oltbs_contract.curr_event_code%TYPE,
    p_new_version_indicator IN    oltbs_contract_event_log.new_version_indicator%TYPE,
    p_value_date      IN    DATE,
    p_contract_status   IN    oltbs_contract.contract_status%TYPE,
    p_auth_status     IN    VARCHAR2,
    p_reversed_event_seq_no IN    oltbs_contract.latest_event_seq_no%TYPE,
    p_workflow_status   IN    oltbs_contract.workflow_status%TYPE,    --ITR2#1 Fcc4.2 OPS related changes..
    p_latest_esn      OUT   oltbs_contract.latest_event_seq_no%TYPE,
    p_latest_version_no   OUT   oltbs_contract.latest_version_no%TYPE,
    p_error_code      IN OUT  VARCHAR2,
    p_error_parameter   IN OUT  VARCHAR2
    )
    RETURN BOOLEAN;
    
    
    **Changed By         : Pallavi R/Janki/Abhinav
    **Date               : 17-Jan-2020
    **Change Description : code changes for amortization fees to support for LB and FC modules.
    **Search String      : OBCL_14.4_LS_Adhoc_Fee Changes
  ------------------------------------------------------------------------------------------------
  */

  FUNCTION Fn_Register_a_Event(p_Contract_Ref_No       IN Oltbs_Contract.Contract_Ref_No%TYPE,
                               p_Event_Code            IN Oltbs_Contract.Curr_Event_Code%TYPE,
                               p_New_Version_Indicator IN Oltbs_Contract_Event_Log.New_Version_Indicator%TYPE,
                               p_Value_Date            IN DATE,
                               p_Contract_Status       IN Oltbs_Contract.Contract_Status%TYPE,
                               p_Auth_Status           IN VARCHAR2,
                               p_Reversed_Event_Seq_No IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                               p_Latest_Esn            OUT Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                               p_Latest_Version_No     OUT Oltbs_Contract.Latest_Version_No%TYPE,
                               p_Error_Code            IN OUT VARCHAR2,
                               p_Error_Parameter       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  -- FCC 4.6.2 CITI FEE CHANGES END BY KISHORE
  FUNCTION Fn_Obtain_Contract_Lock(p_Contract_Ref_No      IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                   p_Record_Lock_Obtained OUT BOOLEAN,
                                   p_Error_Code           IN OUT VARCHAR2,
                                   p_Error_Parameter      IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Process_Backup(p_Contract_Ref_No IN Lftbs_Accr_Fee_Master.Contract_Ref_No%TYPE,
                             p_Action_Code     IN VARCHAR2,
                             p_Proceed_Ahead   OUT BOOLEAN,
                             p_Error_Code      IN OUT VARCHAR2,
                             p_Error_Parameter IN OUT VARCHAR2,
                             p_Delete_Backup   IN VARCHAR2 DEFAULT 'Y' --Fcc4.2 OPS related changes..
                             ) RETURN BOOLEAN;

  FUNCTION Fn_New(p_Module          IN Oltbs_Contract.Module_Code%TYPE, --FCC4.1 OCT'2002 change
                  p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                  p_Error_Code      IN OUT VARCHAR2,
                  p_Error_Parameter IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Amend(p_Module          IN Oltbs_Contract.Module_Code%TYPE, --FCC4.1 OCT'2002 change
                    p_Contract_Ref_No IN Lftbs_Contract_Accr_Fee.Contract_Ref_No%TYPE,
                    p_Event_Code      IN VARCHAR2, --OBCL_14.4_LS_Adhoc_Fee Changes
                    p_Event_Seq_No    IN Lftbs_Contract_Accr_Fee.Event_Seq_No%TYPE, --ITR2#1 Fcc4.2 OPS related changes..
                    p_Error_Code      IN OUT VARCHAR2,
                    p_Error_Parameter IN OUT VARCHAR2,
                    p_Sch_Reqd        IN VARCHAR2 DEFAULT 'Y' -- EURCITIPLC-LD#11489 changes
                    ) RETURN BOOLEAN;

  FUNCTION Fn_Save(p_Contract_Record        IN Oltbs_Contract%ROWTYPE,
                   p_Handoff_Action_Code    IN Oltbs_Contract_Event_Log.Auth_Status%TYPE,
                   p_Module                 IN Oltbs_Contract.Module_Code%TYPE,
                   p_Value_Date             IN DATE,
                   p_Action_Code            IN VARCHAR2,
                   p_Settlement_Processed   IN VARCHAR2,
                   p_Schedule_Redef         IN VARCHAR2, --ITR2#1 Fcc4.2 OPS related changes....Whether to do schedule redefinition
                   p_Advices_Processed      IN VARCHAR2,
                   p_Fee_Upload             IN VARCHAR2, --FCC 4.6.1 EIM ENHANCEMENT CHANGES
                   p_Error_Code             IN OUT VARCHAR2,
                   p_Error_Parameter        IN OUT VARCHAR2,
                   p_Amort_Accr_Restart     IN VARCHAR2 DEFAULT 'N' --26-OCT-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol1 Tag04 changes here
                  ,
                   p_Negative_Carrying_Flag IN VARCHAR2 DEFAULT 'N' --29-OCT-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol1 Tag05,Cost of Credit-Negative Carrying Values changes
                   ) RETURN BOOLEAN;

  FUNCTION Fn_Delete_Contract(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                              p_Version_No      IN Oltbs_Contract.Latest_Version_No%TYPE,
                              p_Error_Code      IN OUT VARCHAR2,
                              p_Error_Parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Authorise(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                        p_Error_Code      IN OUT VARCHAR2,
                        p_Error_Parameter IN OUT VARCHAR2) RETURN BOOLEAN;

  --ITR2#1 Fcc4.2 OPS related changes starts..

  FUNCTION Fn_Reject_On_Auth(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                             p_Error_Code      IN OUT VARCHAR2,
                             p_Error_Parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;

  --ITR2#1 Fcc4.2 OPS related changes ends..

  FUNCTION Fn_Reverse(p_Module          IN Oltbs_Contract.Module_Code%TYPE, --FCC4.1 OCT'2002 change
                      p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                      p_Event_Seq_No    IN Lftbs_Contract_Accr_Fee.Event_Seq_No%TYPE,
                      p_Error_Code      IN OUT VARCHAR2,
                      p_Error_Parameter IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Build_Tags_For_Save(p_Contract_Ref_No            IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                  p_Event_Seq_No               IN Lftbs_Contract_Accr_Fee.Event_Seq_No%TYPE,
                                  p_List_Of_Amount_Tags        OUT VARCHAR2,
                                  p_List_Of_Amount_Ccys        OUT VARCHAR2,
                                  p_List_Of_Amounts            OUT VARCHAR2,
                                  p_List_Of_Cnt_Ccy            IN OUT VARCHAR2, --  Contract currency -- FCC 4.6.1 DEC 2004 EIM Enhancements changes
                                  p_List_Of_Fee_Amt_In_Cnt_Ccy IN OUT VARCHAR2, --  Fee amount in contract ccy -- FCC 4.6.1 DEC 2004 EIM Enhancements changes
                                  p_Error_Code                 IN OUT VARCHAR2,
                                  p_Error_Parameter            IN OUT VARCHAR2,
                                  p_Amort_Accr_Restart         IN VARCHAR2 DEFAULT 'N' --26-OCT-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol1 Tag04 changes here
                                 ,
                                  p_Negative_Carrying_Flag     IN VARCHAR2 DEFAULT 'N' --29-OCT-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol1 Tag05,Cost of Credit-Negative Carrying Values changes
                                  ) RETURN BOOLEAN;

  FUNCTION Fn_Process_Settlement(p_Module                 IN Oltbs_Contract.Module_Code%TYPE, --FCC4.1 OCT'2002 change
                                 p_Contract_Ref_No        IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                 p_Event_Seq_No           IN Lftbs_Contract_Accr_Fee.Event_Seq_No%TYPE,
                                 p_Product_Code           IN Oltbs_Contract.Product_Code%TYPE,
                                 p_Counterparty           IN Oltbs_Contract.Counterparty%TYPE,
                                 p_Error_Code             IN OUT VARCHAR2,
                                 p_Error_Parameter        IN OUT VARCHAR2,
                                 p_Amort_Accr_Restart     IN VARCHAR2 DEFAULT 'N' --26-OCT-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol1 Tag04 changes here
                                ,
                                 p_Negative_Carrying_Flag IN VARCHAR2 DEFAULT 'N' --29-OCT-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol1 Tag05,Cost of Credit-Negative Carrying Values changes
                                 ) RETURN BOOLEAN;

  FUNCTION Fn_Process_Tax(p_Module          IN Oltbs_Contract.Module_Code%TYPE,
                          p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                          p_Event_Seq_No    IN Lftbs_Contract_Accr_Fee.Event_Seq_No%TYPE,
                          p_Product_Code    IN Oltbs_Contract.Product_Code%TYPE,
                          p_Counterparty    IN Oltbs_Contract.Counterparty%TYPE,
                          p_Err_Code        IN OUT VARCHAR2,
                          p_Err_Params      IN OUT VARCHAR2) RETURN BOOLEAN;
						  
  FUNCTION Fn_Call_Accr_Fee(p_Contract_Ref_No     IN Lftbs_Contract_Accr_Fee.Contract_Ref_No%TYPE,
                            p_Version_No          IN Oltbs_Contract_Master.Version_No%TYPE,
                            p_Event_Seq_No        IN Oltbs_Contract_Master.Event_Seq_No%TYPE,
                            p_Auth_Stat           IN VARCHAR2,
                            p_Value_Date          IN DATE,
                            p_Maturity_Date       IN DATE,
                            p_Differential_Amount IN NUMBER,
                            p_Action_Code         IN VARCHAR2,
                            p_Complete_Accruals   IN BOOLEAN,
                            p_Error_Code          IN OUT VARCHAR2,
                            p_Error_Parameter     IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Upd_Accr_Fee_Roll(p_Contract_Ref_No IN Lftbs_Contract_Accr_Fee.Contract_Ref_No%TYPE,
                                p_Error_Code      IN OUT VARCHAR2,
                                p_Error_Parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Populate_Amount_Tag(p_Module          IN Oltms_Class.Module%TYPE,
                                  p_Class_Code      IN Oltms_Class.Class_Code%TYPE,
                                  p_Error_Code      IN OUT VARCHAR2,
                                  p_Error_Parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Populate_Accrole(p_Module          IN Oltms_Class.Module%TYPE,
                               p_Class_Code      IN Oltms_Class.Class_Code%TYPE,
                               p_Error_Code      IN OUT VARCHAR2,
                               p_Error_Parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;
  -- FCC 4.6.1 DEC 2004 EIM Enhancements changes starts
  FUNCTION Fn_Delete_Upload_Fee(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                p_Latest_Esn      IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                                p_Fee_Comp        IN VARCHAR2,
                                p_Error_Code      IN OUT VARCHAR2,
                                p_Error_Parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Reverse_Upload_Fee(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                 p_Latest_Esn      IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                                 p_Fee_Comp        IN VARCHAR2,
                                 p_Error_Code      IN OUT VARCHAR2,
                                 p_Error_Parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;
  -- FCC 4.6.16.16.16.1 DEC 2004 EIM Enhancements changes ends
  --CITIUS-LS#6071 changes start
  FUNCTION Fn_Amend_Upload_Fee(p_Module          IN Oltbs_Contract.Module_Code%TYPE,
                               p_Contract_Ref_No IN Lftbs_Contract_Accr_Fee.Contract_Ref_No%TYPE,
                               p_Event_Seq_No    IN Lftbs_Contract_Accr_Fee.Event_Seq_No%TYPE,
                               p_Error_Code      IN OUT VARCHAR2,
                               p_Error_Parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --CITIUS-LS#6071 changes end

  --25-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10161 Changes Starts here
  -- FLEXCUBE V.CL Release 7.7 UAT EURCITIPLC-LD#9679 changes Starts
  FUNCTION Fn_Reverse(p_Module          IN Oltbs_Contract.Module_Code%TYPE, --FCC4.1 OCT'2002 change
                      p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                      p_Event_Seq_No    IN Lftbs_Contract_Accr_Fee.Event_Seq_No%TYPE,
                      p_Component       IN VARCHAR2,
                      p_Error_Code      IN OUT VARCHAR2,
                      p_Error_Parameter IN OUT VARCHAR2) RETURN BOOLEAN;
  -- FLEXCUBE V.CL Release 7.7 UAT EURCITIPLC-LD#9679 changes Ends
  --25-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10161 Changes Ends here
  -------------------------------------------------------------------------------------------

  --26-SEP-2011 CITIUS-LS#11366 Changes starts
  -- FLEXCUBE V.CL Release 7.7 UAT EURCITIPLC-LD#10592 Changes starts
  FUNCTION Fn_Authorise(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                        p_Component       IN VARCHAR2,
                        p_Event           IN VARCHAR2,
                        p_Error_Code      IN OUT VARCHAR2,
                        p_Error_Parameter IN OUT VARCHAR2) RETURN BOOLEAN;
  -- FLEXCUBE V.CL Release 7.7 UAT EURCITIPLC-LD#10592 Changes Ends
--26-SEP-2011 CITIUS-LS#11366 Changes Ends

END Lfpks_Accr_Event_0;
/
CREATE OR REPLACE Synonym Lfpkss_Accr_Event_0 FOR Lfpks_Accr_Event_0
/