CREATE OR REPLACE PACKAGE Olpks_Oldtronl_Utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : Olpks_Oldtronl_Utils.spc
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
  
  SFR Number         : OFCL_12.3.0.0.0_25034600
  Changed By         : K.PRIYADARSHINI
  Change Description : Version Number changes
  **
  **SFR Number         : 25102565
  **Changed By         : Neeraj.Krishna
  **Change Description : Added two functions for populating description fields
  **Search String      : OFCL_12.3.0.0.0_25102565
  
  **SFR Number         : 
  **Changed By         : Krithika Gopalakrishnan
  **Change Description : Changes for Multiple Collateral/Pool Linkages - Added a new function
  **Search String      : OBCL_12.5.0.0.0_Changes for Multiple Collateral/Pool Linkages
  
  **SFR Number         : 26588585
  **Changed By         : Krithika Gopalakrishnan
  **Change Description : Added a new function for Handling the Link/Delink of linkages On CAMD Event
  **Search String      : OBCL_12.5.0.0.0_26588585
  
  **SFR Number         : 26640628
  **Changed By         : Krithika Gopalakrishnan
  **Change Description : Changes to add restriction to Amend Linkages on Contract Rollover
  **Search String      : OBCL_12.5.0.0.0_26640628_Changes
  
  **Changed By         : Pallavi R
  **Date               : 25-Oct-2017
  **Change Description : ELCM External LOV Changes
  **Search String      : OBCL_12.5.0.0.0_Support_#26924371_LOV Changes  
  
  **Changed By         : Sirajudheen S
  **Date               : 24-Oct-2019
  **Change Description : Hooks provided for FN_PRODUCT_DEFAULT Forward port 29271511
  **Search String      : Bug#29583895  
  
    **Changed By         : Akhila Samson
    **Date               : 07-FEB-2020
    **Change Description : Changes done for Credit acceleration
    **Search String      : OBCL_14.4_Credit_Acceleration
    
  **Changed By         : ArunaDevi Rajendran
  **Date			   : 26-Jul-2020
  **Change Description : New function added for repickup disbursement settlement details
  **Search String      : OBCL_14.4_DSBR_SplitSettlementAmount
  
  **Changed By         : Reghuraj
  **Date               : 9-july-2021
  **Change Description : issue with post redefinition click and schedule change payment details not updating properly fwd BUG#32998230
  **Search String      : BUG#33068478 

  **Changed By         : Abhinav Bhasker
  **Date               : 28-Oct-2021
  **Change Description : Projection for Future Dated Contracts
  **Search String      : Bug#33300194
 
      **Changed By         : Pallavi R
      **Date               : 14-Mar-2022
      **Change Description : Linkage Amount Changes
      **Search String      : OBCL_14.5_SMTB_#33864064 Changes
	  
	  **Changed By         : Jayaram
	  **Date               : 03-Apr-2024
	  **Change Description : Component Wise Payment Details
	  **Search String      : Bug#36459259
 
    **Changed By         : Sowmya bitra
	**Date               : 30-Jul-2024
	**Change Description : OBCL_14.8_VERSION_ROLL Changes
	**Search String      : OBCL_14.8_VERSION_ROLL Changes
	
  **Changed By         : Palainsamy M
  **Date               : 13-NOV-2024
  **Change Description : Version Rollover Reversal Changes for OL
  **Search String      : OBCL_14.8_OL_Version_Rollover_Revv changes	  	
  -------------------------------------------------------------------------------------------------------
  */
  g_Ldtms_Product_Master Oltms_Product_Master_Ld%ROWTYPE;
  g_Cytms_Ccy_Defn       Cytms_Ccy_Defn%ROWTYPE;
  g_Unlk_Before_Auth     VARCHAR2(1);
  g_Query_Prev           NUMBER := 1;
  g_Linkages_Action      VARCHAR2(10); --OBCL_14.5_SMTB_#33864064 Changes
   --Bug#29583895 changes start
  PROCEDURE Pr_Skip_Handler(P_Stage IN VARCHAR2);
  PROCEDURE Pr_Set_Skip_Kernel;
  PROCEDURE Pr_Set_Activate_Kernel;
  PROCEDURE Pr_Set_Skip_Cluster;
  PROCEDURE Pr_Set_Activate_Cluster;
  FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
  --Bug#29583895 changes end
  
  FUNCTION Fn_Product_Default(p_Source           IN VARCHAR2,
                              p_Source_Operation IN VARCHAR2,
                              p_Function_Id      IN VARCHAR2,
                              p_Action_Code      IN VARCHAR2,
                              p_Oldtronl         IN Olpks_Oldtronl_Main.Ty_Oldtronl,
                              p_Wrk_Oldtronl     IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl,
                              p_Err_Code         IN OUT VARCHAR2,
                              p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Default_And_Validate(p_Source           IN VARCHAR2,
                                   p_Source_Operation IN VARCHAR2,
                                   p_Function_Id      IN VARCHAR2,
                                   p_Action_Code      IN VARCHAR2,
                                   p_Oldtronl         IN Olpks_Oldtronl_Main.Ty_Oldtronl,
                                   p_Prev_Oldtronl    IN Olpks_Oldtronl_Main.Ty_Oldtronl,
                                   p_Wrk_Oldtronl     IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl,
                                   p_Err_Code         IN OUT VARCHAR2,
                                   p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Delete_Loan(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_Oldtronl         IN Olpks_Oldtronl_Main.Ty_Oldtronl,
                          p_Prev_Oldtronl    IN Olpks_Oldtronl_Main.Ty_Oldtronl,
                          p_Wrk_Oldtronl     IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Reverse_Loan(p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_Id      IN VARCHAR2,
                           p_Action_Code      IN VARCHAR2,
                           p_Oldtronl         IN Olpks_Oldtronl_Main.Ty_Oldtronl,
                           p_Prev_Oldtronl    IN Olpks_Oldtronl_Main.Ty_Oldtronl,
                           p_Wrk_Oldtronl     IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Sgen_Ovd(p_Source       IN VARCHAR2,
                       p_Function_Id  IN VARCHAR2,
                       Pcontractrefno IN Oltbs_Contract.Contract_Ref_No%TYPE,
                       Pesn           IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                       Psgendate      IN DATE) RETURN BOOLEAN;

  FUNCTION Fn_Loan_On_Hold(p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_Id      IN VARCHAR2,
                           p_Action_Code      IN VARCHAR2,
                           p_Oldtronl         IN Olpks_Oldtronl_Main.Ty_Oldtronl,
                           p_Prev_Oldtronl    IN Olpks_Oldtronl_Main.Ty_Oldtronl,
                           p_Wrk_Oldtronl     IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Copy_Loan(p_Source           IN VARCHAR2,
                        p_Source_Operation IN VARCHAR2,
                        p_Function_Id      IN VARCHAR2,
                        p_Action_Code      IN VARCHAR2,
                        p_Oldtronl         IN Olpks_Oldtronl_Main.Ty_Oldtronl,
                        p_Prev_Oldtronl    IN Olpks_Oldtronl_Main.Ty_Oldtronl,
                        p_Wrk_Oldtronl     IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl,
                        p_Err_Code         IN OUT VARCHAR2,
                        p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Amend_Loan(p_Source           IN VARCHAR2,
                         p_Source_Operation IN VARCHAR2,
                         p_Function_Id      IN VARCHAR2,
                         p_Action_Code      IN VARCHAR2,
                         p_Oldtronl         IN Olpks_Oldtronl_Main.Ty_Oldtronl,
                         p_Prev_Oldtronl    IN Olpks_Oldtronl_Main.Ty_Oldtronl,
                         p_Wrk_Oldtronl     IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl,
                         p_Err_Code         IN OUT VARCHAR2,
                         p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Amend_Before_Onceauth(p_Source           IN VARCHAR2,
                                    p_Source_Operation IN VARCHAR2,
                                    p_Function_Id      IN VARCHAR2,
                                    p_Action_Code      IN VARCHAR2,
                                    p_Oldtronl         IN Olpks_Oldtronl_Main.Ty_Oldtronl,
                                    p_Prev_Oldtronl    IN Olpks_Oldtronl_Main.Ty_Oldtronl,
                                    p_Wrk_Oldtronl     IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl,
                                    p_Err_Code         IN OUT VARCHAR2,
                                    p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Rollover(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_Oldtronl         IN Olpks_Oldtronl_Main.Ty_Oldtronl,
                       p_Prev_Oldtronl    IN Olpks_Oldtronl_Main.Ty_Oldtronl,
                       p_Wrk_Oldtronl     IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  --OBCL_12.5.0.0.0_Support_#26924371_LOV Changes Starts
  /*FUNCTION fn_populate_lines(p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_Id      IN VARCHAR2,
                           p_wrk_oldtronl     IN OUT olpks_oldtronl_main.ty_oldtronl,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2)
  RETURN BOOLEAN;*/
  --OBCL_12.5.0.0.0_Support_#26924371_LOV Changes Ends

  --OFCL_12.3.0.0.0_25034600 changes starts
  FUNCTION Fn_Version_Query(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_Full_Data        IN VARCHAR2 DEFAULT 'Y',
                            p_With_Lock        IN VARCHAR2 DEFAULT 'N',
                            p_Qrydata_Reqd     IN VARCHAR2,
                            p_Oldtronl         IN Olpks_Oldtronl_Main.Ty_Oldtronl,
                            p_Wrk_Oldtronl     IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --OFCL_12.3.0.0.0_25034600 changes ends

  FUNCTION Fn_Version_Increment(p_Wrk_Oldtronl IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl)
    RETURN BOOLEAN;
  --OFCL_12.3.0.0.0_25102565 changes starts
  FUNCTION Fn_Sum_Loan_Outstnd(p_Comm_Ref IN Oltbs_Contract.Contract_Ref_No%TYPE)
    RETURN NUMBER;

  FUNCTION Fn_Get_Desc_Fields(p_Source           IN VARCHAR2,
                              p_Source_Operation IN VARCHAR2,
                              p_Function_Id      IN VARCHAR2,
                              p_Action_Code      IN VARCHAR2,
                              p_Oldtronl         IN Olpks_Oldtronl_Main.Ty_Oldtronl,
                              p_Wrk_Oldtronl     IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl,
                              p_Err_Code         IN OUT VARCHAR2,
                              p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --OFCL_12.3.0.0.0_25102565 changes ends

  FUNCTION Fn_Log_Override(p_Source       IN VARCHAR2,
                           p_Function_Id  IN VARCHAR2,
                           p_Action_Code  IN VARCHAR2,
                           p_Wrk_Oldtronl IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl,
                           p_Err_Code     IN OUT VARCHAR2,
                           p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;

  --OBCL_12.5.0.0.0_Changes for Multiple Collateral/Pool Linkages
  FUNCTION Fn_Collateral_Linkages(p_Source       IN VARCHAR2,
                                  p_Function_Id  IN VARCHAR2,
                                  p_Action_Code  IN VARCHAR2,
                                  p_Wrk_Oldtronl IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl,
                                  p_Err_Code     IN OUT VARCHAR2,
                                  p_Err_Params   IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --OBCL_12.5.0.0.0_Changes for Multiple Collateral/Pool Linkages Ends

  --OBCL_12.5.0.0.0_26588585 Changes 
  FUNCTION Fn_Upload_Multiple_Linkages(p_Source       IN VARCHAR2,
                                       p_Function_Id  IN VARCHAR2,
                                       p_Action_Code  IN VARCHAR2,
                                       p_Wrk_Oldtronl IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl,
                                       p_Err_Code     IN OUT VARCHAR2,
                                       p_Err_Params   IN OUT VARCHAR2,
                                       p_Coll_Details IN Olpks_Oldtronl_Main.Ty_Tb_Oltbs_Acc_Coll_Link_Dtls)
    RETURN BOOLEAN;
  --OBCL_12.5.0.0.0_26588585 Changes Ends
  --OBCL_12.5.0.0.0_26640628_Changes
  FUNCTION Fn_Rollover_Amendable_Check(p_Source       IN VARCHAR2,
                                       p_Function_Id  IN VARCHAR2,
                                       p_Action_Code  IN VARCHAR2,
                                       p_Wrk_Oldtronl IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl,
                                       p_Err_Code     IN OUT VARCHAR2,
                                       p_Err_Params   IN OUT VARCHAR2)
    RETURN BOOLEAN;
  ----OBCL_12.5.0.0.0_26640628_Changes
  --26833246 changes start               
  FUNCTION Fn_Ramd_For_Contingent(p_Source           IN VARCHAR2,
                                  p_Source_Operation IN VARCHAR2,
                                  p_Function_Id      IN VARCHAR2,
                                  p_Action_Code      IN VARCHAR2,
                                  p_Oldtronl         IN Olpks_Oldtronl_Main.Ty_Oldtronl,
                                  p_Prev_Oldtronl    IN Olpks_Oldtronl_Main.Ty_Oldtronl,
                                  p_Wrk_Oldtronl     IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl,
                                  p_Err_Code         IN OUT VARCHAR2,
                                  p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Reverse_Ramd_For_Batch(p_Contract_Ref_No IN VARCHAR2,
                                     p_Err_Code        IN OUT VARCHAR2,
                                     p_Err_Params      IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --26833246 changes end
  
    --14.4_Credit_Acceleration start
  
  FUNCTION fn_contract_Credit_Acceleration(p_Source          IN VARCHAR2,
                                           p_Function_Id     IN VARCHAR2,
                                           p_Contract_Ref_No IN VARCHAR2,
										   p_MS_Tblerror     IN OUT olpks_status.Tbl_MS_Error, --Akhila_newChanges
                                           p_Err_Code        IN OUT VARCHAR2,
                                           p_Err_Params      IN OUT VARCHAR2)
    RETURN BOOLEAN;
--14.4_Credit_Acceleration End
--OBCL_14.4_DSBR_SplitSettlementAmount starts
FUNCTION Fn_ReAssign_DSBR_Settlement(p_Source           IN VARCHAR2,
                                      p_Source_Operation IN VARCHAR2,
                                      p_Function_Id      IN VARCHAR2,
                                      p_Action_Code      IN VARCHAR2,
                                      p_Oldtronl         IN Olpks_Oldtronl_Main.Ty_Oldtronl,
                                      p_Prev_Oldtronl    IN Olpks_Oldtronl_Main.Ty_Oldtronl,
                                      p_Wrk_Oldtronl     IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl,
                                      p_Err_Code         IN OUT VARCHAR2,
                                      p_Err_Params       IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Repickup_DSBR_Settlement(p_Source           IN VARCHAR2,
                                      p_Source_Operation IN VARCHAR2,
                                      p_Function_Id      IN VARCHAR2,
                                      p_Action_Code      IN VARCHAR2,
                                      p_Oldtronl         IN Olpks_Oldtronl_Main.Ty_Oldtronl,
                                      p_Prev_Oldtronl    IN Olpks_Oldtronl_Main.Ty_Oldtronl,
                                      p_Wrk_Oldtronl     IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl,
                                      p_Err_Code         IN OUT VARCHAR2,
                                      p_Err_Params       IN OUT VARCHAR2)
RETURN BOOLEAN;
--OBCL_14.4_DSBR_SplitSettlementAmount ends

--Bug#32724405 - Front to back trace - Start
FUNCTION Fn_Update_RefNum(p_contract_ref_num IN VARCHAR2,
						  p_channel_ref_num  IN VARCHAR2,
						  p_process_ref_num  IN VARCHAR2,						  
						  p_Err_Code         IN OUT VARCHAR2,
						  p_Err_Params       IN OUT VARCHAR2)
RETURN BOOLEAN;
--Bug#32724405 - Front to back trace - End

--BUG#33068478  start
FUNCTION Fn_Exp_schedule(p_contract_ref_num IN VARCHAR2,
                         p_Wrk_Oldtronl     IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl,
                         p_Err_Code         IN OUT VARCHAR2,
                         p_Err_Params       IN OUT VARCHAR2)
RETURN BOOLEAN;
--BUG#33068478  end

--Bug#33300194 Start
FUNCTION fn_future_dt_dsbr (p_contract_ref IN VARCHAR2,
							p_value_dt	   IN VARCHAR2,
							p_dsbr_dt	   IN VARCHAR2,
							p_cont_status	OUT VARCHAR2,
							p_Err_Code     IN OUT VARCHAR2,
                            p_Err_Params   IN OUT VARCHAR2)
		RETURN BOOLEAN ;
--Bug#33300194 End

--Bug#36459259:Changes Starts here  
FUNCTION Fn_get_CompWisedetails(p_Source           IN VARCHAR2,
                                p_Source_Operation IN VARCHAR2,
                                p_Function_Id      IN VARCHAR2,
                                p_Action_Code      IN VARCHAR2,
                                p_Child_Function   IN VARCHAR2,                               
                                p_Oldtronl         IN Olpks_Oldtronl_Main.Ty_Oldtronl,
                                p_Wrk_Oldtronl     IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl,
                                p_Err_Code         IN OUT VARCHAR2,
                                p_Err_Params       IN OUT VARCHAR2)
RETURN BOOLEAN;
--Bug#36459259:Changes Ends here   
 --OBCL_14.8_OL_Version_Rollover_Revv changes start
 /*

--OBCL_14.8_VERSION_ROLL Changes Start
FUNCTION Fn_Reverse_Ver_Roll(p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_Id      IN VARCHAR2,
                           p_Action_Code      IN VARCHAR2,
                           p_Oldtronl         IN Olpks_Oldtronl_Main.Ty_Oldtronl,
                           p_Prev_Oldtronl    IN Olpks_Oldtronl_Main.Ty_Oldtronl,
                           p_Wrk_Oldtronl     IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
--OBCL_14.8_VERSION_ROLL Changes End 

*/                      
--OBCL_14.8_OL_Version_Rollover_Revv changes end
END Olpks_Oldtronl_Utils;
/
CREATE OR REPLACE Synonym Olpkss_Oldtronl_Utils FOR Olpks_Oldtronl_Utils
/