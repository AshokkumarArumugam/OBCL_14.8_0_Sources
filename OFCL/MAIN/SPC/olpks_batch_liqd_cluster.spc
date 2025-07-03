CREATE OR REPLACE PACKAGE Olpks_Batch_Liqd_Cluster AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : Olpks_Batch_Liqd_Cluster.spc
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
  
  **  Changed By         :Gomathi G
  **  Changed On         : 23-Aug-2019
  **  Change Description : Added hooks for custom changes of min or max Default and Validate
  **  Search String      : OBCL_14.3_SUPPORT_BUG#30003636
  
  **  Changed By         : Gomathi G
  **  Changed On         : 29-SEP-2020
  **  Change Description : Provided Hooks for Auto_liquidation in fn_compute_eca_amount.
  **  Search String      : OBCL_14.3_SUPPORT_BUG#31941409
  Changed By         : Gomathi G
  Changed On         : 17-OCT-2020
  Change Description : Provided Pre and post hooks to generate messages for the Credit Leg of Auto liquidation during EOD
  Search String      : OBCL_14.3_SUPPORT_BUG#32035437
  
  Changed By         : Sowmya Bitra
  Changed On         : 20-Nov-2020
  Change Description : Added Hooks for Fn_Liquidate_Commitment and Fn_Liquidate_Tranche.
  Search String      : Bug#32077981 Changes
  
  **  Changed By         : Kavitha Asokan
  **  Date               : 16-NOV-2022
  **  Change Description : During the OL Liquidation batch process, there is a check to identify 
	                       if the contract has successfully been ECA Approved, In case there is a reject,
                           system will skip the process and proceed with the next contract 
						   so hook is provided to capture the OL Contract details in fn_liquidate_sch
  **  Search String      : Bug#34796265 	
  -------------------------------------------------------------------------------------------------------
  */
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
                                   Perrorparam          IN OUT VARCHAR2,
								  p_fn_call_id         IN OUT NUMBER,--OBCL_14.3_SUPPORT_BUG#32035437 CHANGES
                                  p_Tb_Cluster_data    IN OUT GLOBAL.Ty_Tb_Cluster_Data )--OBCL_14.3_SUPPORT_BUG#32035437 CHANGES
    RETURN BOOLEAN;
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
                               Perrorcode           IN OUT VARCHAR2,
                               Perrorparam          IN OUT VARCHAR2)
    RETURN BOOLEAN;
    --OBCL_14.3_SUPPORT_BUG#30003636 Starts
  FUNCTION Fn_Liquidate(Pfuncid              IN Smtbs_Menu.Function_Id%TYPE,
                        Pbranch              IN Oltbs_Contract.Branch%TYPE,
                        p_Eca_Check_Required IN VARCHAR2,
                        Pcontractrefno       IN Oltbs_Contract.Contract_Ref_No%TYPE,
                        Pmodule              IN Oltbs_Contract.Module_Code%TYPE,
                        Platestesn           IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                        Platestvsn           IN Oltbs_Contract.Latest_Version_No%TYPE,
                        Pcounterparty        IN Oltbs_Contract.Counterparty%TYPE,
                        Pcurrency            IN Oltbs_Contract.Contract_Ccy%TYPE,
                        Pmatdate             IN DATE,
                        Pprodtype            IN Oltbs_Contract.Product_Type%TYPE,
                        Pcontractvaluedate   IN Oltbs_Contract_Master.Value_Date%TYPE,
                        Pmaturitytype        IN Oltbs_Contract_Master.Maturity_Type%TYPE,
                        Pverifyfunds         IN Oltbs_Contract_Preference.Verify_Funds%TYPE,
                        Pminliqamt           IN Oltms_Product_Master_Ld.Min_Amt_Partial_Liq%TYPE,
                        Pminamtccy           IN Oltms_Product_Master_Ld.Min_Amt_Ccy%TYPE,
                        Pproduct             IN Oltbs_Contract.Product_Code%TYPE,
                        Pdeducttaxind        IN CHAR,
                        Puserdefstatus       IN Oltbs_Contract.User_Defined_Status%TYPE,
                        Pmaincomp            IN Oltbs_Contract_Master.Main_Comp%TYPE,
                        Ppmtmeth             IN Oltbs_Contract_Master.Payment_Method%TYPE,
                        Pschtype             IN CHAR,
                        Ptrackaccruedint     IN Oltms_Product_Master_Ld.Track_Accrued_Interest%TYPE,
                        Pprocessingdate      IN DATE,
                        p_Skip_Comp          IN Oltbs_Contract_Master.Main_Comp%TYPE,
                        Perrorcode           IN OUT VARCHAR2,
                        Perrorparam          IN OUT VARCHAR2,
                        p_fn_call_id         IN OUT NUMBER,
                        p_Tb_Cluster_data    IN OUT GLOBAL.Ty_Tb_Cluster_Data)
    RETURN BOOLEAN;
  --OBCL_14.3_SUPPORT_BUG#30003636 Ends
  --BUG#34796265 Starts 
   FUNCTION Fn_Liquidate_Sch(Pfuncid            IN Smtbs_Menu.Function_Id%TYPE,
                            Pbranch            IN Oltbs_Contract.Branch%TYPE,
                            Pcontractrefno     IN Oltbs_Contract.Contract_Ref_No%TYPE,
                            Pmodule            IN Oltbs_Contract.Module_Code%TYPE,
                            Platestesn         IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                            Platestvsn         IN Oltbs_Contract.Latest_Version_No%TYPE,
                            Pcounterparty      IN Oltbs_Contract.Counterparty%TYPE,
                            Pcurrency          IN Oltbs_Contract.Contract_Ccy%TYPE,
                            Pmatdate           IN DATE,
                            Pprodtype          IN Oltbs_Contract.Product_Type%TYPE,
                            Pcontractvaluedate IN Oltbs_Contract_Master.Value_Date%TYPE,
                            Pmaturitytype      IN Oltbs_Contract_Master.Maturity_Type%TYPE,
                            Pverifyfunds       IN Oltbs_Contract_Preference.Verify_Funds%TYPE,
                            Pminliqamt         IN Oltms_Product_Master_Ld.Min_Amt_Partial_Liq%TYPE,
                            Pminamtccy         IN Oltms_Product_Master_Ld.Min_Amt_Ccy%TYPE,
                            Pproduct           IN Oltbs_Contract.Product_Code%TYPE,
                            Pdeducttaxind      IN CHAR,
                            Pmaincomp          IN Oltbs_Contract_Master.Main_Comp%TYPE,
                            Ppmtmeth           IN Oltbs_Contract_Master.Payment_Method%TYPE,
                            Pschtype           IN CHAR,
                            Ptrackaccruedint   IN Oltms_Product_Master_Ld.Track_Accrued_Interest%TYPE,
                            Pprocessingdate    IN DATE,
                            p_Skip_Comp        IN Oltbs_Contract_Master.Main_Comp%TYPE,
                            Perrorcode         IN OUT VARCHAR2,
                            Perrorparam        IN OUT VARCHAR2,
							p_fn_call_id       IN OUT NUMBER,
                            p_Tb_Cluster_data  IN OUT GLOBAL.Ty_Tb_Cluster_Data) 
  RETURN BOOLEAN ;
  --BUG#34796265 ends
  --OBCL_14.3_SUPPORT_BUG#31941409 CHANGES STARTS
  FUNCTION fn_compute_eca_amount(pfuncid           in smtbs_menu.function_id%type,
                                 pbranch           in oltbs_contract.branch%type,
                                 pcontractrefno    in oltbs_contract.contract_ref_no%type,
                                 pmodule           in oltbs_contract.module_code%type,
                                 platestesn        in oltbs_contract.latest_event_seq_no%type,
                                 pcounterparty     in oltbs_contract.counterparty%type,
                                 pmatdate          in date,
                                 pprodtype         in oltbs_contract.product_type%type,
                                 pmaturitytype     in oltbs_contract_master.maturity_type%type,
                                 pverifyfunds      in oltbs_contract_preference.verify_funds%type,
                                 pminliqamt        in oltms_product_master_ld.min_amt_partial_liq%type, --sitaram
                                 pminamtccy        in oltms_product_master_ld.min_amt_ccy%type, --sitaram
                                 pmaincomp         in oltbs_contract_master.main_comp%type,
                                 pschtype          in char,
                                 pprocessingdate   in date,
                                 p_skip_comp       in oltbs_contract_master.main_comp%type,
                                 p_eca_ref_no      out oltb_eca_req_master.process_ref_no%type,
                                 perrorcode        in out varchar2,
                                 perrorparam       in out varchar2,
                                 p_fn_call_id      in out number,
                                 p_tb_cluster_data in out global.ty_tb_cluster_data)
    return boolean;
  --OBCL_14.3_SUPPORT_BUG#31941409 changes ends
  --OBCL_14.3_SUPPORT_BUG#32035437 changes starts
FUNCTION Fn_pre_Process_For_Contract(p_Branch             IN Oltbs_Contract.Branch%TYPE,
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
                                   Perrorparam          IN OUT VARCHAR2,
                                   p_tb_cluster_data in out global.ty_tb_cluster_data)
    RETURN BOOLEAN;
 FUNCTION Fn_post_Process_For_Contract(p_Branch             IN Oltbs_Contract.Branch%TYPE,
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
                                   Perrorparam          IN OUT VARCHAR2,
                                   p_tb_cluster_data in out global.ty_tb_cluster_data)
    RETURN BOOLEAN;
--OBCL_14.3_SUPPORT_BUG#32035437 Changes ends

 --Bug#32077981 Changes Start
  FUNCTION Fn_Pre_Liquidate_Commitment(p_Branch           IN Oltbs_Contract.Branch%TYPE,
                                       p_User_Id          IN VARCHAR2,
                                       Pcontractrefno     IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                       Pprocessingdate    IN DATE,
                                       Peventseqno        IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                                       Pversionno         IN Oltbs_Contract.Latest_Version_No%TYPE,
                                       p_fn_call_id       IN OUT NUMBER,
                                       p_Tb_Cluster_Data  IN OUT global.Ty_Tb_Cluster_Data,
                                       p_Error_Code       IN OUT VARCHAR2,
                                       p_Error_Parameter  IN OUT VARCHAR2)
  RETURN BOOLEAN;
  
  FUNCTION Fn_Post_Liquidate_Commitment(p_Branch           IN Oltbs_Contract.Branch%TYPE,
                                        p_User_Id          IN VARCHAR2,
                                        Pcontractrefno     IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                        Pprocessingdate    IN DATE,
                                        Peventseqno        IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                                        Pversionno         IN Oltbs_Contract.Latest_Version_No%TYPE,
                                        p_fn_call_id       IN OUT NUMBER,
                                        p_Tb_Cluster_Data  IN OUT global.Ty_Tb_Cluster_Data,
                                        p_Error_Code       IN OUT VARCHAR2,
                                        p_Error_Parameter  IN OUT VARCHAR2)
  RETURN BOOLEAN;
  
  FUNCTION Fn_Pre_Liquidate_Tranche(Pcontractrefno    IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                    Pprocessingdate   IN DATE,
                                    Pversionno        IN Oltbs_Contract.Latest_Version_No%TYPE,
                                    Peventseqno       IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                                    p_fn_call_id      IN OUT NUMBER,
                                    p_Tb_Cluster_Data IN OUT global.Ty_Tb_Cluster_Data,
                                    p_Error_Code      IN OUT VARCHAR2,
                                    p_Error_Parameter IN OUT VARCHAR2)
  RETURN BOOLEAN;  
  
  FUNCTION Fn_Post_Liquidate_Tranche(Pcontractrefno    IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                    Pprocessingdate   IN DATE,
                                    Pversionno        IN Oltbs_Contract.Latest_Version_No%TYPE,
                                    Peventseqno       IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                                    p_fn_call_id      IN OUT NUMBER,
                                    p_Tb_Cluster_Data IN OUT global.Ty_Tb_Cluster_Data,
                                    p_Error_Code      IN OUT VARCHAR2,
                                    p_Error_Parameter IN OUT VARCHAR2)
  RETURN BOOLEAN;   
  --Bug#32077981 Changes End

END Olpks_Batch_Liqd_Cluster;
/
CREATE OR REPLACE Synonym Olpkss_Batch_Liqd_Cluster FOR Olpks_Batch_Liqd_Cluster
/