CREATE OR REPLACE PACKAGE lbpks_excel_upload AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_excel_upload.spc
  **
  ** Module     : Loan Syndication
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright (R) 2008,2019 , Oracle and/or its affiliates.  All rights reserved
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
  
  SFR Number         : 29959798
  Changed By         : Revathi Aula
  Change Description : Added new functions for Principal Schedule Upload
  Search String      : OBCL_14.4_PRNSPLSCHUPLD CHANGES 
  
  SFR Number         : 29959798
  Changed By         : Palanisamy Muthukumar
  Change Description : Added new functions for Principal Schedule Upload
  Search String      : OBCL_14.4_PAYRECVUPLD CHANGES 
  
  -------------------------------------------------------------------------------------------------------
  */
  TYPE Ty_Oltbs_Contract_Schedules IS TABLE OF Oltbs_Contract_Schedules%ROWTYPE INDEX BY BINARY_INTEGER;
  TYPE Ty_Lbtbs_Tranche_Schedule_Input IS TABLE OF Lbtbs_Tranche_Schedule_Input%ROWTYPE INDEX BY BINARY_INTEGER;
  TYPE Ty_Lbtbs_Participant_Ratio IS TABLE OF Lbtbs_Participant_Ratio%ROWTYPE INDEX BY BINARY_INTEGER;
  TYPE Ty_Component_Amount IS RECORD(
    Component_Amount Oltbs_Contract_Schedules.Amount%TYPE);
  TYPE Ty_Participant_Comp_Amount IS TABLE OF Ty_Component_Amount INDEX BY BINARY_INTEGER;
--OBCL_14.4_PAYRECVUPLD CHANGES Start
  TYPE Rec_Error_Code IS RECORD(
    ERROR_CODE       Ertbs_Msgs.Err_Code%TYPE,
    ERROR_PARAMETERS OLTB_UPLOAD_EXCEPTION_CS.ERROR_PARAMETERS%TYPE);
--OBCL_14.4_PAYRECVUPLD CHANGES End
  TYPE Ty_Error_Code IS TABLE OF Rec_Error_Code INDEX BY BINARY_INTEGER;
  TYPE Tb_Text_Line IS TABLE OF VARCHAR2(1000) INDEX BY BINARY_INTEGER;
  TYPE Tb_Tr_Shd_In IS TABLE OF Lbtb_Tranche_Schedule_Input%ROWTYPE INDEX BY BINARY_INTEGER;
  TYPE Tb_Fac_Fee_Shd IS TABLE OF Oltbs_Contract_Schedules%ROWTYPE INDEX BY BINARY_INTEGER;
  TYPE Tb_Part_Ratio IS TABLE OF Lbtbs_Participant_Ratio%ROWTYPE INDEX BY BINARY_INTEGER;

  FUNCTION Fn_Tranche_Fee_Schedules(p_Function_Id          IN VARCHAR2,
                                    p_Source               IN VARCHAR2,
                                    p_Contract_Ref_No      IN Oltbs_Contract_Schedules.Contract_Ref_No%TYPE,
                                    p_Version_No           IN Oltbs_Contract_Schedules.Version_No%TYPE,
                                    p_Event_Seq_No         IN Oltbs_Contract_Schedules.Event_Seq_No%TYPE,
                                    p_Tranche_Fee_Schedule IN Lbpks_Excel_Upload.Ty_Oltbs_Contract_Schedules,
                                    p_Ty_Err_Log           OUT Lbpks_Excel_Upload.Ty_Error_Code,
                                    p_Err_Code             IN OUT VARCHAR2,
                                    p_Err_Params           IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Tranche_Schedules(p_Function_Id         IN VARCHAR2,
                                p_Source              IN VARCHAR2,
                                p_Contract_Ref_No     IN Lbtbs_Tranche_Schedule_Input.Contract_Ref_No%TYPE,
                                p_Version_No          IN Oltbs_Contract_Schedules.Version_No%TYPE,
                                p_Event_Seq_No        IN Lbtbs_Tranche_Schedule_Input.Event_Seq_No%TYPE,
                                p_Tranche_Schedule_In IN Lbpks_Excel_Upload.Ty_Lbtbs_Tranche_Schedule_Input,
                                p_Ty_Err_Log          OUT Lbpks_Excel_Upload.Ty_Error_Code,
                                p_Err_Code            IN OUT VARCHAR2,
                                p_Err_Params          IN OUT VARCHAR2)
    RETURN BOOLEAN;
  /*FUNCTION fn_fac_fee_schedules(p_contract_ref_no IN oltbs_contract_schedules.contract_ref_no%TYPE,
                  p_version_no      IN oltbs_contract_schedules.version_no%TYPE,
                  p_event_seq_no    IN oltbs_contract_schedules.event_seq_no%TYPE,
                  p_tb_text_line    IN lbpks_excel_upload.tb_text_line,
  p_tb_err_log      OUT lbpks_excel_upload.ty_error_code,
                  p_error_code      IN OUT VARCHAR2,
                  p_error_param     IN OUT VARCHAR2) RETURN BOOLEAN;*/

  /*FUNCTION fn_fee_ratio_par_chk(p_contract_ref_no IN oltbs_contract_schedules.contract_ref_no%TYPE,
  p_value_date      IN lbtbs_participant_ratio.value_date%TYPE,
  p_participant     IN lbtbs_participant_ratio.customer_no%TYPE,
  p_count           OUT NUMBER,
  p_error_code      IN OUT VARCHAR2,
  p_error_param     IN OUT VARCHAR2) RETURN BOOLEAN;*/

  FUNCTION Fn_Fee_Ratio_Schedules(p_Function_Id       IN VARCHAR2,
                                  p_Source            IN VARCHAR2,
                                  p_Contract_Ref_No   IN Oltbs_Contract_Schedules.Contract_Ref_No%TYPE,
                                  p_Component         IN Lftbs_Contract_Fee.Component%TYPE,
                                  p_Value_Date        IN DATE,
                                  p_Amount_Paid       IN NUMBER,
                                  p_Participant_Ratio IN Lbpks_Excel_Upload.Ty_Lbtbs_Participant_Ratio,
                                  p_Component_Amount  IN Lbpks_Excel_Upload.Ty_Participant_Comp_Amount,
                                  p_Ty_Err_Log        OUT Lbpks_Excel_Upload.Ty_Error_Code,
                                  p_Err_Code          IN OUT VARCHAR2,
                                  p_Err_Params        IN OUT VARCHAR2)
    RETURN BOOLEAN;
  /*FUNCTION fn_component_validation(p_contract_ref_no IN oltbs_contract_schedules.contract_ref_no%TYPE,
                                   p_cur_rec         IN NUMBER,
                                   p_error_code      IN OUT VARCHAR2,
                                   p_error_param     IN OUT VARCHAR2,
                   p_err_prefix      OUT VARCHAR2) RETURN BOOLEAN;
                   
  FUNCTION fn_start_date_validation(p_contract_ref_no IN oltbs_contract_schedules.contract_ref_no%TYPE,
                                    p_version_no      IN oltbs_contract_schedules.version_no%TYPE,
                                    p_cur_rec         IN NUMBER,
                                    p_error_code      IN OUT VARCHAR2,
                                    p_error_param     IN OUT VARCHAR2,
                  p_err_prefix      OUT VARCHAR2) RETURN BOOLEAN;
                  
  FUNCTION fn_bullet_validation(p_cur_rec    IN NUMBER,
                                p_error_code IN OUT VARCHAR2,
                                p_error_param IN OUT VARCHAR2) RETURN BOOLEAN;
  
  FUNCTION fn_cal_end_date(p_contract_ref_no IN oltbs_contract_schedules.contract_ref_no%TYPE,
                           p_cur_rec         IN NUMBER,
                           p_end_dt          OUT DATE,
                           p_error_code      IN OUT VARCHAR2,
                           p_error_param     IN OUT VARCHAR2) RETURN BOOLEAN; 
  
  FUNCTION fn_validate_schedule_dates(p_con_shd_table IN lbpks_excel_upload.tb_fac_fee_shd,
                                      p_error_code    IN OUT VARCHAR2,
                                      p_error_param   IN OUT VARCHAR2) RETURN BOOLEAN; */

  FUNCTION Fn_Facility_Fee_Schedules(p_Function_Id           IN VARCHAR2,
                                     p_Source                IN VARCHAR2,
                                     p_Contract_Ref_No       IN Oltbs_Contract_Schedules.Contract_Ref_No%TYPE,
                                     p_Version_No            IN Oltbs_Contract_Schedules.Version_No%TYPE,
                                     p_Event_Seq_No          IN Oltbs_Contract_Schedules.Event_Seq_No%TYPE,
                                     p_Facility_Fee_Schedule IN Lbpks_Excel_Upload.Ty_Oltbs_Contract_Schedules,
                                     p_Ty_Err_Log            OUT Lbpks_Excel_Upload.Ty_Error_Code,
                                     p_Err_Code              IN OUT VARCHAR2,
                                     p_Err_Params            IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Word_Reverse(p_Rev_Wrd IN VARCHAR2) RETURN VARCHAR2;
  --OBCL_14.4_PRNSPLSCHUPLD CHANGES
  FUNCTION Fn_Upload_Principal_Schedule(p_Function_Id     IN VARCHAR2,
                                        p_Source          IN VARCHAR2,
                                        p_Reference_No    IN Lbtbs_Schedule_Upload.Reference_No%TYPE,
                                        p_Processing_Date IN DATE,
                                        p_Branch_Code     IN VARCHAR2,
                                        p_Err_Table       IN OUT Lbpks_Excel_Upload.Ty_Error_Code,
                                        p_Error_Code      IN OUT VARCHAR2,
                                        p_Error_Param     IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Validate_Schedules(p_Function_Id     IN VARCHAR2,
                                 p_Source          IN VARCHAR2,
                                 p_Reference_No    IN Lbtbs_Schedule_Upload.Reference_No%TYPE,
                                 p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                 p_Error_Code      IN OUT VARCHAR2,
                                 p_Error_Param     IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Principal_Process(p_Function_Id     IN VARCHAR2,
                                p_Source          IN VARCHAR2,
                                p_Reference_No    IN Lbtbs_Schedule_Upload.Reference_No%TYPE,
                                p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                p_Processing_Date IN DATE,
                                p_Error_Code      IN OUT VARCHAR2,
                                p_Error_Param     IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Validate_Ls_Schedules(p_Function_Id     IN VARCHAR2,
                                    p_Source          IN VARCHAR2,
                                    p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                    p_Schedule_Date   IN DATE,
                                    p_Frequency       IN Oltbs_Contract_Schedules.Frequency%TYPE,
                                    p_Frequency_Unit  IN Oltbs_Contract_Schedules.Frequency_Unit%TYPE,
                                    p_Error_Code      IN OUT VARCHAR2,
                                    p_Error_Param     IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Validate_Ld_Schedules(p_Function_Id     IN VARCHAR2,
                                    p_Source          IN VARCHAR2,
                                    p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                    p_Schedule_Date   IN DATE,
                                    p_Frequency       IN Oltbs_Contract_Schedules.Frequency%TYPE,
                                    p_Frequency_Unit  IN Oltbs_Contract_Schedules.Frequency_Unit%TYPE,
                                    p_Error_Code      IN OUT VARCHAR2,
                                    p_Error_Param     IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Process_Unlock(p_Function_Id     IN VARCHAR2,
                             p_Source          IN VARCHAR2,
                             p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                             p_Error_Code      IN OUT VARCHAR2,
                             p_Error_Param     IN OUT VARCHAR2)
    RETURN BOOLEAN;
    
  FUNCTION Fn_Exploding_Schedules(p_Function_Id     IN VARCHAR2,
                                  p_Source          IN VARCHAR2,
                                  p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                  p_Error_Code      IN OUT VARCHAR2,
                                  p_Error_Param     IN OUT VARCHAR2)
    RETURN BOOLEAN;
    --OBCL_14.4_PRNSPLSCHUPLD CHANGES
--    OBCL_14.4_PAYRECVUPLD CHANGES Start
  FUNCTION Fn_Upload_Pay_Receivable(p_Function_Id     IN VARCHAR2,
                                    p_Source          IN VARCHAR2,
                                    p_Reference_No    IN Lbtbs_Pay_Recv_Upload.Reference_No%TYPE,
                                    p_Processing_Date IN DATE,
                                    p_Err_Table       IN OUT Lbpks_Excel_Upload.Ty_Error_Code,
                                    p_Error_Code      IN OUT VARCHAR2,
                                    p_Error_Param     IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Validate_Pay_Receivable(p_Function_Id     IN VARCHAR2,
                                      p_Source          IN VARCHAR2,
                                      p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                      p_Component       IN Oltbs_Amount_Due_Cs.Component%TYPE,
                                      p_Pay_Recv_Amount IN Oltbs_Amount_Due_Cs.Pay_Recv_Amount%TYPE,
                                      p_Due_Date        IN DATE,
                                      p_Processing_Date IN DATE,
                                      p_Maker_Id        IN Oltbs_Contract_Event_Log.Maker_Id%TYPE, --06-JUN-2017: Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R721 FS Vol2 Tag03 IUT1#76 changes
                                      p_Maker_Dt_Stamp  IN Oltbs_Contract_Event_Log.Maker_Dt_Stamp%TYPE, --06-JUN-2017: Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R721 FS Vol2 Tag03 IUT1#76 changes
                                      p_Error_Code      IN OUT VARCHAR2,
                                      p_Error_Param     IN OUT VARCHAR2)
    RETURN BOOLEAN;
--    OBCL_14.4_PAYRECVUPLD CHANGES End
  /*FUNCTION fn_upload_customer(  p_reference_no    IN sttms_cust_closure_upload.reference_no%TYPE,
                  p_processing_date IN DATE,
                  p_branch_code     IN VARCHAR2,
                  p_err_table     IN OUT lbpks_excel_upload.tb_error,
                  p_error_code      IN OUT VARCHAR2,
                  p_error_param     IN OUT VARCHAR2) RETURN BOOLEAN;
                    
  FUNCTION fn_validate_cust_details(  p_customer_no IN sttms_cust_closure_upload.customer_no%TYPE,
                    p_branch_code IN VARCHAR2,
                    p_maker_id      IN oltbs_contract_event_log.maker_id%TYPE,      --06-JUN-2017: Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R721 FS Vol2 Tag03 IUT1#89 changes
                    p_maker_dt_stamp IN oltbs_contract_event_log.maker_dt_stamp%TYPE, --06-JUN-2017: Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R721 FS Vol2 Tag03 IUT1#89 changes
                    p_error_code  IN OUT VARCHAR2,
                    p_error_param IN OUT VARCHAR2,
                    p_err_prefix  IN OUT VARCHAR2) RETURN BOOLEAN;
              
  FUNCTION fn_customer_closure_process( p_customer_no IN sttms_cust_closure_upload.customer_no%TYPE,
                      p_branch_code IN VARCHAR2,
                      p_error_code  IN OUT VARCHAR2,
                      p_error_param IN OUT VARCHAR2,
                      p_err_prefix  IN OUT VARCHAR2) RETURN BOOLEAN;*/

  FUNCTION Fn_Tranche_Participant_Prop(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE)
    RETURN BOOLEAN;
    --OBCL_14.4_PRNSPLSCHUPLD CHANGES
  FUNCTION Fn_Chk_Roll_Reprice(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                               p_Version_No      IN Oltbs_Contract.Latest_Version_No%TYPE)
    RETURN BOOLEAN;

  FUNCTION Fn_Split_Process(p_Function_Id     IN VARCHAR2,
                            p_Source          IN VARCHAR2,
                            p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                            p_Version_No      IN Oltbs_Contract.Latest_Version_No%TYPE,
                            p_Error_Code      IN OUT VARCHAR2,
                            p_Error_Param     IN OUT VARCHAR2) RETURN BOOLEAN;
   --OBCL_14.4_PRNSPLSCHUPLD CHANGES

END lbpks_excel_upload;
/
CREATE OR REPLACE SYNONYM lbpkss_excel_upload FOR lbpks_excel_upload
/