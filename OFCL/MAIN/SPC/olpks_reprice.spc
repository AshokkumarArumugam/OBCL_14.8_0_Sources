CREATE OR REPLACE PACKAGE olpks_reprice AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_reprice.SPC
**
** Module		: LOANS AND DEPOSIT
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
/*------------------------------------------CHANGE HISTORY----------------------------------
DATE		VERSION NO	CODE		DESCRIPTION
15-SEP-2005 FCC V.CL 7.0 ITR2 SFR # 67, Advice Processing
05-OCT-2007 FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-219 Pass serial_no as argument in Fn_Generate_Ref_No
09-OCT-2007 FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-268
10-OCT-2007 FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-382
23-Oct-2008 FCC V.CL Release 7.4 RT SFR#566 changes,  22-Oct-2008 FCC V.CL Release 7.4 RT SFR#566 changes,  the felr call itself is not required after vami or mrgi event
06-NOV-2008 CITIUS-LS#SRT1451 CITIUS Till#289,STP Consolidation,By Swapnasish,Addition of merge job 
10-Jan-2009 FCC V.CL Release 7.5 FS TAG 7 - Changes for transfer of unamortized fee and transfer of over payment during
							reprice new function added Fn_Get_Unamort_Fee_For_Trasfer for doing the trasfer
							fee changes for reprice.
15-JAN-2009 FCC V.CL Release 7.5 FS TAG <8 Discount Accrual Changes> 
			Added parameter p_disc_unamort_fee in Fn_Process_Unamort_Fee_Trasfer to get unamortised amount for Discount Accural.
23-MAY-2011 Flexcube V.CL Release 7.9,FS Volume02 Tag03,Non-Performing Loans,Added changes in order to check whether the reprice is merge or split.		

    **Changed By         : Baljinder Singh
    **Changed On         : 18-Jun-2019
    **Change Description : When you reprice a loan or make a different loan in place of an existing one, we should not update utilizations again as it is not a fresh credit.
    **Search String      : OBCL_14.4_Reprice_ELCM_Util changes  
	
    **Changed By         : Vigneshram S
    **Changed On         : 09-Apr-2019
    **Change Description : Added code for SOFR changes
    **Search String      : OBCL_14.4_SOFR changes  	
      ** Modified By       : Mohan Pal
  ** Modified On       : 26-Oct-2021
  ** Modified Reason   : Code added to Insert Default DSBR schedule if Split Repriced product DSBR mode is Manual
  ** Search String     : Bug#33506479 
  
  **Changed By          : Sudharshini Balaji
  **Date                : 07-Mar-2022
  **Change Description  : Added code to call FWDREPC(Fwd Split and Fwd Merge Reprice) from Java
  **Search String       : Bug#33868975
  
  **  Changed By         : Vineeth T M
  **  Changed On         : 31-Jul-2023
  **  Change Description : enabling eca for all components - charge related changes for rollover/reprice
  **  Search String      : OBCL_14.8_ECA_1_Changes
  
  **  Changed By         : Vineeth T M
  **  Changed On         : 10-Oct-2023
  **  Change Description : Moving reprice job to quartz scheduler(Application/Java layer)
  **  Search String      : Bug#35794764 changes
------------------------------------END CHANGE HISTORY-----------------------------------------------------------
*/



  pkg_maker_id	oltbs_contract_event_log.Maker_id%TYPE;	   --FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-382
  pkg_auth_id	oltbs_contract_event_log.Checker_id%TYPE; --FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-382
  p_consider_revolving VARCHAR(1) := 'N'; -- OBCL_14.4_Reprice_ELCM_Util changes
  p_reprice_vami VARCHAR(1) := 'N'; -- OBCL_14.4_Reprice_ELCM_Util changes
  p_merge_contract	VARCHAR(1) := 'N';--23-MAY-2011 Flexcube V.CL Release 7.9,FS Volume02 Tag03,Non-Performing Loans,changes
  g_reprice VARCHAR(1)  := 'N';--OBCL_14.4_SOFR changes
  g_split_reprice VARCHAR(1)  := 'N';----Bug#33506479
  g_reprice_job VARCHAR(1)  := 'N';--OBCL_14.8_ECA_1_Changes
  g_qrtz_job VARCHAR(1)  := 'N';--Bug#35794764 changes

  ------------------------------------------------------------------------------------------------------------------
  -- This function is to check if the contract can be allowed for other Events processing
  FUNCTION Fn_Contract_Status(p_Contract IN VARCHAR2) RETURN VARCHAR2;

  ------------------------------------------------------------------------------------------------------------------
  -- This function is for Picking up Interest Components for the Contract and
  -- is been called only from Front End Split Form.
  FUNCTION Fn_Populate_Components(Pcontract       IN oltbs_contract.Contract_Ref_No%TYPE
                                 ,Pccy            IN oltbs_contract.Contract_Ccy%TYPE
                                 ,Pbranch         IN oltbs_contract.Branch%TYPE
                                 ,Psplit_Serialno IN oltbs_contract_split_master.Split_Serial_No%TYPE
                                 ,Pproduct        IN oltbs_contract.Product_Code%TYPE
                                 ,p_Serial_No     IN oltbs_contract_split_detail.Serial_No%TYPE
                                 ,Pamount         IN oltbs_contract_split_detail.Amount%TYPE
                                 ,Pcont_Tenor     IN oltbs_split_product_intcomps.Reset_Tenor%TYPE
                                 ,Pvalue_Date     IN DATE) RETURN BOOLEAN;
  ------------------------------------------------------------------------------------------------------------------
  -- This function is for Picking up the rates for the Contracts and
  -- is been called only from Front End Split Form.
  FUNCTION Fn_Rates_Pickup(Pcontract       IN oltbs_contract.Contract_Ref_No%TYPE
                          ,Pccy            IN oltbs_contract.Contract_Ccy%TYPE
                          ,Pbranch         IN oltbs_contract.Branch%TYPE
                          ,Psplit_Serialno IN oltbs_contract_split_master.Split_Serial_No%TYPE
                          ,Pproduct        IN oltbs_contract.Product_Code%TYPE
                          ,p_Serial_No     IN oltbs_contract_split_detail.Serial_No%TYPE
                          ,Pamount         IN oltbs_contract_split_detail.Amount%TYPE
                          ,Pcont_Tenor     IN oltbs_split_product_intcomps.Reset_Tenor%TYPE
                          ,Pvalue_Date     IN DATE) RETURN BOOLEAN;
  ------------------------------------------------------------------------------------------------------------------
  -- This function validates the effective date with last liquidation date and last liquidated sch date.
  -- This is used in the Front End Repricing Forms for validating the Value Date of the Re price Instrucion.
  FUNCTION Fn_Get_Eff_Date(p_Ref_No    IN oltbs_contract.Contract_Ref_No%TYPE
                          ,p_Eff_Date  IN DATE
                          ,p_Recalc_Dt OUT DATE) RETURN BOOLEAN;
  ------------------------------------------------------------------------------------------------------------------
  -- This function is for Cascading the Value Date Changes in the Split Instruction Screen and
  -- is been called only from Front End Split Form.
  FUNCTION Fn_Update_Maturity_Date(Pcontract       IN VARCHAR2
                                  ,Pccy            IN VARCHAR2
                                  ,Pbranch         IN VARCHAR2
                                  ,Psplit_Serialno IN NUMBER
                                  ,Pvalue_Date     IN DATE) RETURN BOOLEAN;
  ------------------------------------------------------------------------------------------------------------------
  FUNCTION Fn_Generate_Ref_No(p_Parent_Ref_No   IN oltbs_contract_split_master.Contract_Ref_No%TYPE
                             ,p_Split_Serial_No IN oltbs_contract_split_master.Split_Serial_No%TYPE
                             ,p_serial_no	IN oltbs_contract_split_detail.Serial_No%TYPE --FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-219 
                             ,p_Err_Code        OUT VARCHAR2) RETURN BOOLEAN;
  ------------------------------------------------------------------------------------------------------------------
  FUNCTION Fn_Register_An_Event(p_Contract_Ref_No      IN oltbs_contract.Contract_Ref_No%TYPE
                               ,p_Event_Date           IN DATE
                               ,p_Event_Value_Date     IN DATE
                               ,p_Event_Code           IN oltbs_contract.Curr_Event_Code%TYPE
                               ,p_Contract_Status      IN oltbs_contract_event_log.Contract_Status%TYPE
                               ,p_Authorization_Status IN oltbs_contract.Auth_Status%TYPE
                               ,p_Err_Code             IN OUT VARCHAR2
                               ,p_Err_Param            IN OUT VARCHAR2)
    RETURN BOOLEAN;
  ------------------------------------------------------------------------------------------------------------------
  -- This function is to process the Parent Contract during Split
  FUNCTION Fn_Process_Parent_For_Split(p_Prnt_Ref_No     IN oltbs_contract.Contract_Ref_No%TYPE
                                      ,p_Split_Serial_No IN oltbs_contract_split_master.Split_Serial_No%TYPE
                                      ,p_Process_Date    IN DATE
                                      ,p_Err_Code        OUT VARCHAR2
                                      ,p_Err_Param       OUT VARCHAR2)
    RETURN BOOLEAN;
  ------------------------------------------------------------------------------------------------------------------
  -- This function is the Starting point for a contract getting Repriced By Splitting
  FUNCTION Fn_Split_Contracts(p_Parent_Ref_No   IN oltbs_contract.Contract_Ref_No%TYPE
                             ,p_Split_Serial_No IN oltbs_contract_split_master.Split_Serial_No%TYPE
                             ,p_Err_Code        OUT VARCHAR2
                             ,p_Err_Param       OUT VARCHAR2) RETURN BOOLEAN;
  ------------------------------------------------------------------------------------------------------------------
  -- This function is the Processing the Parent contract getting Repriced By Merging
  FUNCTION Fn_Process_Parent_For_Merge(p_Parent_Ref_No   IN oltbs_contract.Contract_Ref_No%TYPE
                                      ,p_Merge_Serial_No IN NUMBER
                                      ,p_Process_Date    IN DATE
                                      ,p_Err_Code        OUT VARCHAR2
                                      ,p_Err_Param       OUT VARCHAR2)
    RETURN BOOLEAN;
  ------------------------------------------------------------------------------------------------------------------
  -- This function is the Processing the Child contract getting Repriced By Merging
  FUNCTION Fn_Merge_Contracts(p_Parent_Ref_No   IN oltbs_contract.Contract_Ref_No%TYPE
                             ,p_Merge_Serial_No IN NUMBER
                             ,p_Process_Date    IN DATE
                             ,p_Err_Code        OUT VARCHAR2
                             ,p_Err_Param       OUT VARCHAR2) RETURN BOOLEAN;
  ------------------------------------------------------------------------------------------------------------------
  -- This function is for handling Batch Forward Processing of the Parent Repricied Transactions
  FUNCTION Fn_Process_Batch_Reprice(p_Branch           IN oltbs_contract.Branch%TYPE
                                   ,p_Processing_Date  IN DATE
                                   ,p_Product          IN oltbs_contract.Product_Code%TYPE
                                   ,p_Commit_Frequency IN oltbs_automatic_process_master.Bod_Commit_Count%TYPE
                                   ,p_Err_Code         OUT VARCHAR2
                                   ,p_Err_Param        OUT VARCHAR2)
    RETURN Boolean;
  ------------------------------------------------------------------------------------------------------------------
 --These below 2  functions are added for FWDREPC MERGE/SPLIT from JAVA
 -- Bug#33868975 changes starts --
 FUNCTION Fn_Process_Batch_Merge_Reprice(p_Branch           IN Oltbs_Contract.Branch%TYPE,
                                         p_Merge_parent_contract_ref  IN oltbs_contract.contract_ref_no%TYPE,
                                         p_Merge_serial_no         IN Oltbs_Contract_Merge_Master.Merge_Serial_No%TYPE,
                                         p_Processing_Date         IN DATE,
                                          --OBCL_14.8_ECA_1_Changes start
                                         p_Eca_Ref_No         IN VARCHAR2,
                                         p_Eca_Check_Required IN VARCHAR2,
                                         --OBCL_14.8_ECA_1_Changes end
                                         p_Elcm_Msgid       OUT Sypks_Utils.g_Elcm_Msgid%TYPE,
                                         p_rfr_Msgid        OUT Sypks_Utils.g_rfr_Msgid%TYPE,
                                         p_Err_Code         IN OUT VARCHAR2,
                                         p_Err_Param        IN OUT VARCHAR2)
  RETURN VARCHAR2;   
  
   FUNCTION Fn_Process_Batch_Split_Reprice(p_Branch           IN Oltbs_Contract.Branch%TYPE,
                                         p_Split_contract_ref  IN oltbs_contract.contract_ref_no%TYPE,
                                         p_split_serial_no         IN Oltbs_Contract_Merge_Master.Merge_Serial_No%TYPE,
                                         p_Processing_Date         IN DATE,
                                         --OBCL_14.8_ECA_1_Changes start
                                         p_Eca_Ref_No         IN VARCHAR2,
                                         p_Eca_Check_Required IN VARCHAR2,
                                         --OBCL_14.8_ECA_1_Changes end
                                         p_Elcm_Msgid       OUT Sypks_Utils.g_Elcm_Msgid%TYPE,
                                         p_rfr_Msgid        OUT Sypks_Utils.g_rfr_Msgid%TYPE,
                                         p_Err_Code         IN OUT VARCHAR2,
                                         p_Err_Param        IN OUT VARCHAR2)
   RETURN VARCHAR2 ;                                   
--Bug#33868975 changes ends
-----------------------------------------------------------------------------------------------------------------------
 --Added for FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-268
  PROCEDURE pr_reprice_job;
     
  ---------------------------------------------------------------------------------------------------------------------
--06-NOV-2008 CITIUS-LS#SRT1451 CITIUS Till#289 Start By Swapnasish
--09-Jan-2006 Madhu CITIUS Till#289, Addition of merge job >>
PROCEDURE pr_reprice_merge_job;
--09-Jan-2006 Madhu CITIUS Till#289, Addition of merge job <<

--06-NOV-2008 CITIUS-LS#SRT1451 CITIUS Till#289 End By Swapnasish
--FCC V.CL 7.0 ITR2 SFR # 67, Advice Processing changes start
Function fn_split_adv_input
(
	p_parent_ref_no		IN	oltbs_contract_split_master.contract_ref_no%type,
	p_ESN			IN	oltbs_contract_split_master.sptb_esn%type,
	p_err_code		IN OUT	varchar2,
	p_err_params		IN OUT	varchar2
)
return boolean;
------------------------------------------------------------------------------------------------------------------
Function fn_merge_adv_input
(
	p_parent_ref_no		IN	oltbs_contract_split_master.contract_ref_no%type,
	p_ESN			IN	oltbs_contract_split_master.sptb_esn%type,
	p_err_code		IN OUT	varchar2,
	p_err_params		IN OUT	varchar2
)
return boolean;
--FCC V.CL 7.0 ITR2 SFR # 67, Advice Processing changes end
------------------------------------------------------------------------------------------------------------------
--10-Jan-2009 FCC V.CL Release 7.5 FS TAG 7 Neeraj - Start
FUNCTION Fn_Process_Unamort_Fee_Trasfer
            (
              p_contract_ref_no        IN     oltbs_contract.contract_ref_no%Type
              ,p_child_ref_no          IN     oltbs_contract.contract_ref_no%Type
              ,p_unamort_fee           OUT    oltbs_amount_due_cs.amount_due%Type   
              ,p_disc_unamort_fee      OUT    oltbs_amount_due_cs.amount_due%Type--15-JAN-2009 FCC V.CL Release 7.5 FS TAG <8 Discount Accrual Changes> 
              ,p_event_code            IN     oltbs_contract_event_log.EVENT_CODE%Type
              ,p_list_of_amount_tags   IN OUT Varchar2
              ,p_list_of_amounts       IN OUT Varchar2
              ,p_list_of_amount_ccys   IN OUT Varchar2
              ,pErrorCode              IN OUT Varchar2
              ,pParam                  IN OUT Varchar2
            ) 
RETURN BOOLEAN; 
--10-Jan-2009 FCC V.CL Release 7.5 FS TAG 7 Neeraj - End

--23-Oct-2008 FCC V.CL Release 7.4 RT SFR#566 changes,  22-Oct-2008 FCC V.CL Release 7.4 RT SFR#566 changes,  the felr call itself is not required after vami or mrgi event start
/*--22-Oct-2008 FCC V.CL Release 7.4 RT SFR#566 changes,  The felr even's settlement instruction is failing START
  FUNCTION Fn_replicate
                (p_contract_ref_no           IN          oltbs_settlements.Contract_ref_no%TYPE,
                 p_version_flag              IN           oltbs_settlements.version_flag%TYPE,
                 p_latest_event_seq_no       IN   oltbs_settlements.Event_seq_no%TYPE,
                 p_err_code                  IN OUT Varchar2,
                 p_err_param             IN OUT Varchar2
                 )
  RETURN BOOLEAN;
  --22-Oct-2008 FCC V.CL Release 7.4 RT SFR#566 changes,  The felr even's settlement instruction is failing ENDS*/
  --23-Oct-2008 FCC V.CL Release 7.4 RT SFR#566 changes,  22-Oct-2008 FCC V.CL Release 7.4 RT SFR#566 changes,  the felr call itself is not required after vami or mrgi event ends
  --OBCL_14.8_ECA_1_Changes start
  FUNCTION Fn_Compute_Eca_For_Reprice(p_Contract_Ref_No          IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                      p_split_amount_new          IN oltbs_contract_split_detail.amount%TYPE,
                                      p_Split_Master_Row          in Oltbs_Contract_Split_Master%ROWTYPE,
                                      p_Process_Flag              in varchar2,
                                      p_Eca_Ref_No                out VARCHAR2,
                                      p_Err_Code                  IN OUT VARCHAR2,
                                      p_Err_Params                IN OUT VARCHAR2)
  RETURN BOOLEAN;
  
  FUNCTION Fn_Compute_Eca_For_Reprice_Wrapper(p_Branch               IN Oltms_Branch.Branch_Code%TYPE,
                                              p_User                 IN Smtbs_User.User_Id%TYPE,
                                              p_Contract_Ref_No      IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                              p_Split_Serial_No      in Oltbs_Contract_Split_Master.Split_Serial_No%TYPE,
                                              p_Proc_Date            IN DATE,
                                              p_Eca_Ref_No           OUT VARCHAR2,
                                              p_Error_Code           IN OUT VARCHAR2,
                                              p_Error_Parameter      IN OUT VARCHAR2)
  RETURN VARCHAR2;
  
  FUNCTION Fn_Compute_Eca_For_Merge(p_Parent_Ref_No    IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                    p_Merge_Serial_No  IN NUMBER,
                                    p_Merge_Value_Date in Oltbs_Contract_Merge_Master.Merge_Value_Date%TYPE,
                                    p_Eca_Ref_No       out VARCHAR2,
                                    p_Err_Code         IN OUT VARCHAR2,
                                    p_Err_Params       IN OUT VARCHAR2)
  RETURN BOOLEAN;
  
  FUNCTION Fn_Compute_Eca_For_Merge_Wrapper(p_Branch               IN Oltms_Branch.Branch_Code%TYPE,
                                            p_User                 IN Smtbs_User.User_Id%TYPE,
                                            p_Contract_Ref_No      IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                            p_Merge_Serial_No      in Oltbs_Contract_Merge_Master.Merge_Serial_No%TYPE,
                                            p_Proc_Date            IN DATE,
                                            p_Eca_Ref_No           OUT VARCHAR2,
                                            p_Error_Code           IN OUT VARCHAR2,
                                            p_Error_Parameter      IN OUT VARCHAR2)
  RETURN VARCHAR2;
  --OBCL_14.8_ECA_1_Changes end
  
  --Bug#35794764 changes starts
  FUNCTION Fn_Reprice_Job_qrtz(pj_Contract_Ref_No  IN Oltbs_Contract_Split_Master.Contract_Ref_No%TYPE,
                             pj_Split_Serial_No  IN  Oltbs_Contract_Split_Master.Split_Serial_No%TYPE,
                             pj_split_value_Date IN  Oltbs_Contract_Split_Master.Split_Value_Date%TYPE,
                             pj_Split_Book_Date  IN  Oltbs_Contract_Split_Master.Split_Book_Date%TYPE,
                             pj_Split_Status     IN  Oltbs_Contract_Split_Master.Split_Status%TYPE,
                             pj_Maker_Id         IN  Oltbs_Contract_Split_Master.Maker_Id%TYPE,
                             pj_Checker_Id       IN  Oltbs_Contract_Split_Master.Checker_Id%TYPE,
                             p_Msg_id           OUT VARCHAR2,
                           --  p_Elcm_Eac_Flg     OUT varchar2,
                            -- p_rfr_flg          OUT varchar2,
                             p_out_split_status       OUT VARCHAR2,
                             p_parent_contract_status       OUT VARCHAR2,
                             Perrorcode         IN OUT VARCHAR2,
                             Perrorparam        IN OUT VARCHAR2) RETURN VARCHAR2;
  --Bug#35794764 changes ends
END olpks_reprice;
/
CREATE or replace SYNONYM olpkss_reprice FOR olpks_reprice
/