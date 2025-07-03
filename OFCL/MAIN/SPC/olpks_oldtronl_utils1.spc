CREATE OR REPLACE PACKAGE Olpks_Oldtronl_Utils1 AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_oldtronl_utils1.spc
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

  **SFR Number         : 25102565
  **Changed By         : Neeraj.Krishna
  **Change Description : Added pr_calc_uncovered_amt for populating description fields
  **Search String      : OFCL_12.3.0.0.0_25102565

  **SFR Number         : 26745674
  **Changed By         : Shishirkumar Aithal
  **Change Description : Rate revision screen has been removed since it was not applicable for OL module.
  **Search String      : 26745674
  **Date               : 28-Dec-2017

  **SFR Number         : 27182321
  **Changed By         : Srinivasulu Ch
  **Change Description : Pass the maturity holiday check flag to get the next working date maturity date validation added at product level
  **Search String      : bug#27182321

    Changed By         : Dhananjaya T/Chandra Achuta
    Changed On         : 26-Feb-2018
    Search String      : Bug#28312814
    Change Reason      : Added code for supporting CAMD action thorugh OLDUPLOD screen.

  **Changed By         : Priyadarshini K
  **Change Description : Added the existing function fn_how_many_schedules and fn_comp_type to spc from sql
  **Search String      : OBCL_14.2_VAMI_Sch changes

   **Changed By         : Vigneshram
   **Changed On         : 18-Jan-2019
   **Change Description : 14.3 IOF changes
   **Search String      : OBCL_14.3_IOF


      **Changed By         : Pallavi R
      **Date               : 06-Feb-2019
      **Change Description : Changes done for Disbursement
      **Search String      : OBCL_14.3_DSBR Changes

      **Changed By         : Prakash Ravi
      **Date               : 21-May-2019
      **Change Description : Changes done CAMD Gateway to check if the user has sent values and reassign.
      **Search String      : OBCL_14.3_CAMD_Gateway

	  **Changed By         : Aruna R
      **Date               : 25-May-2019
      **Change Description : New function to recalculate moratorium amount on Distribute button (DISPR action)
      **Search String      : Bug#29828479
	  
    ** Changed By         : Divya J
    ** Changed On         : 16-Apr-2020
    **  Search String     : OBCL_14.3_Support_Bug#30920052
    **  Reason            : Linkages tab display of commitment available amount.
    
	**Changed By         : Abhinav Bhasker
    **Date               : 11-May-2020
    **Change Description : Changes w.r.t. Force Calc for SOFR Comp Accr Event
    **Search String      : OBCL_SOFR_Reprice_Accr_Event

  **Changed By         : Selvam Manickam
  **Date               : 24-JUN-2020
  **Change Description : Introduced new global variable for special rate type component.
  **Search String      : Bug#31539101 forward port for base bug Bug#31390698

  **Changed By         : Chandra Achuta
  **Date               : 09-FEB-2021
  **Change Description : Introduced new global variable for CAMD redefinition.
  **Search String      : Bug#32430031 
  
   **Changed By         : Mohan Pal
  **Date               : 10-jun-2021
  **Change Description : Distribute DSBR Split
  **Search String      : Bug#32897832
  
  ** Changed By         : Mohan Pal
  ** Date               : 24-June-2021
  ** Change Description : OL-RFR ISSUE CONSOLIDATED
  ** Search String      : SOFR_Bug#33040217_#1

  **Changed By         : Navoneel Nandan
  **Date               : 08-Oct-2021
  **Change Description : Making Pr_Copy_Main_Sch as public
  **Search String      : Bug#33583333_24 
  
  **Changed By         : Chandra Achuta
  **Date               : 02-JUN-2022
  **Change Description : Hook request for error code skip case.
  **Search String      : Bug#34224604  
  
  **Changed By         : Satheesh Seshan
  **Date               : 30-Jan-2024
  **Change Description : OLDREPRS Split Reprice - Parent Child field value mismatch correction
  **Search String      : Bug#36240813  
  -------------------------------------------------------------------------------------------------------
  */

  g_Schedules_Exploded     VARCHAR2(5) := 'FALSE'; --intially false post explode set it to true
  g_Once_Split             VARCHAR2(1) := 'N';
  g_Is_Rollover            VARCHAR2(1) := 'N';
  g_Prm_Advices            VARCHAR2(5) := 'FALSE';
  g_Cftb_Contract_Interest Lftb_Contract_Interest%ROWTYPE;
  g_Split_Rollover         VARCHAR2(1) := 'N';
  g_Oldtronl               Olpks_Oldtronl_Main.Ty_Oldtronl; --OBCL_14.3_IOF
  g_dispr                  VARCHAR2(1) := 'N';--Bug#29828479 Changes
  g_rfr_save_process       VARCHAR2(1) := 'N';-- --OBCL_14.4_SOFR changes starts
  g_special_comp_amt_change BOOLEAN := FALSE;   --Bug#31539101  Code Added
  g_camd_redef             BOOLEAN := FALSE;   --Bug#32430031  Code Added
  g_cont_online            VARCHAR2(1) := 'N';---SOFR_Bug#33040217_#1
  
      --Bug#34224604  Changes Starts
      PROCEDURE Pr_Set_Skip_Kernel;
      PROCEDURE Pr_Set_Activate_Kernel;
      PROCEDURE Pr_Set_Skip_Cluster;
      PROCEDURE Pr_Set_Activate_Cluster;
      FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
      --Bug#34224604  Changes Ends  
  FUNCTION Fn_Process_a_Loan(p_Source           IN VARCHAR2,
                             p_Source_Operation IN VARCHAR2,
                             p_Function_Id      IN VARCHAR2,
                             p_Action_Code      IN VARCHAR2,
                             p_Child_Function   IN VARCHAR2,
                             p_Multi_Trip_Id    IN VARCHAR2,
                             p_Oldtronl         IN Olpks_Oldtronl_Main.Ty_Oldtronl,
                             p_Prev_Oldtronl    IN Olpks_Oldtronl_Main.Ty_Oldtronl,
                             p_Wrk_Oldtronl     IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl,
                             p_Err_Code         IN OUT VARCHAR2,
                             p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  PROCEDURE Pr_Dflt_Schedules(p_Source       IN VARCHAR2,
                              p_Mode         IN VARCHAR2, --OBCL_14.3_DSBR Changes
                              p_Function_Id  IN VARCHAR2,
                              p_Action_Code  IN VARCHAR2,
                              p_Wrk_Oldtronl IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl);
  --Commenting for 26745674 Starts
  /*
   FUNCTION fn_rate_revison_details(p_Source       IN VARCHAR2,
                                    p_Action_Code  IN VARCHAR2,
                                    p_Function_Id  IN VARCHAR2,
                                    p_wrk_oldtronl IN OUT olpks_oldtronl_main.ty_oldtronl,
                                    p_Err_Code     IN OUT VARCHAR2,
                                    p_Err_Params   IN OUT VARCHAR2)
     RETURN BOOLEAN;
  */
  --Commenting for 26745674 Ends
  FUNCTION Fn_Cmtredn_Schedule_Due(p_Source       IN VARCHAR2,
                                   p_Action_Code  IN VARCHAR2,
                                   p_Function_Id  IN VARCHAR2,
                                   p_Wrk_Oldtronl IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl,
                                   p_Err_Code     IN OUT VARCHAR2,
                                   p_Err_Params   IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Unearnedint_Detail(p_Source       IN VARCHAR2,
                                 p_Action_Code  IN VARCHAR2,
                                 p_Function_Id  IN VARCHAR2,
                                 p_Wrk_Oldtronl IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl,
                                 p_Err_Code     IN OUT VARCHAR2,
                                 p_Err_Params   IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Revision_Schedules(p_Source         IN VARCHAR2,
                                 p_Action_Code    IN VARCHAR2,
                                 p_Function_Id    IN VARCHAR2,
                                 p_Wrk_Oldtronl   IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl,
                                 p_Product_Master IN Oltms_Product_Master_Ld%ROWTYPE,
                                 p_Err_Code       IN OUT VARCHAR2,
                                 p_Err_Params     IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Payment_Schedules(p_Source         IN VARCHAR2,
                                p_Action_Code    IN VARCHAR2,
                                p_Function_Id    IN VARCHAR2,
                                p_Wrk_Oldtronl   IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl,
                                p_Product_Master IN Oltms_Product_Master_Ld%ROWTYPE,
                                p_Err_Code       IN OUT VARCHAR2,
                                p_Err_Params     IN OUT VARCHAR2)
    RETURN BOOLEAN;

  PROCEDURE Pr_Split_Rollover(p_Wrk_Oldtronl IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl,
                              Paction        VARCHAR2);
  --Bug#33583333_24 starts                            
  PROCEDURE Pr_Copy_Main_Sch(p_Component    VARCHAR2,
                             p_Wrk_Oldtronl IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl);
  --Bug#33583333_24 ends                           
  FUNCTION Fn_Save(p_Source         IN VARCHAR2,
                   p_Action_Code    IN VARCHAR2,
                   p_Function_Id    IN VARCHAR2,
                   p_Prev_Oldtronl  IN Olpks_Oldtronl_Main.Ty_Oldtronl,
                   p_Wrk_Oldtronl   IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl,
                   p_Product_Master IN Oltms_Product_Master_Ld%ROWTYPE,
                   p_Err_Code       IN OUT VARCHAR2,
                   p_Err_Params     IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Redefine_Schedules(p_Source         IN VARCHAR2,
                                 p_Action_Code    IN VARCHAR2,
                                 p_Function_Id    IN VARCHAR2,
                                 p_Wrk_Oldtronl   IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl,
                                 p_Product_Master IN Oltms_Product_Master_Ld%ROWTYPE,
                                 p_Err_Code       IN OUT VARCHAR2,
                                 p_Err_Params     IN OUT VARCHAR2)
    RETURN BOOLEAN;
    ---Bug#32897832 starts
     FUNCTION fn_distribute_dsbr(p_Source         IN VARCHAR2,
                                 p_Action_Code    IN VARCHAR2,
                                 p_Function_Id    IN VARCHAR2,
                                 p_Wrk_Oldtronl   IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl,
                                 p_Product_Master IN Oltms_Product_Master_Ld%ROWTYPE,
                                 p_Err_Code       IN OUT VARCHAR2,
                                 p_Err_Params     IN OUT VARCHAR2)
         RETURN BOOLEAN;
    ---Bug#32897832 ends

  --OFCL_12.3.0.0.0_25102565 changes
  PROCEDURE Pr_Calc_Uncovered_Amt(p_Wrk_Oldtronl           IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl,
                                  p_Ldtb_Contract_Linkages IN OUT Oltb_Contract_Linkages%ROWTYPE,
                                  p_Dis_Account_Amount     IN OUT NUMBER,
                                  p_Dis_Commitment_Amount  IN OUT NUMBER,
                                  p_Dis_Deposit_Amount     IN OUT NUMBER,
                                  p_Dis_Uncovered_Amount   IN OUT NUMBER);
  FUNCTION Fn_Maturity_Hol_Chk(p_Source         IN VARCHAR2,
                               p_Action_Code    IN VARCHAR2,
                               p_Function_Id    IN VARCHAR2,
                               p_Wrk_Oldtronl   IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl,
                               p_Product_Master IN Oltms_Product_Master_Ld%ROWTYPE,
                               p_Call_From      IN VARCHAR2, --bug#27182321
                               p_Err_Code       IN OUT VARCHAR2,
                               p_Err_Params     IN OUT VARCHAR2)
    RETURN BOOLEAN;
  PROCEDURE Pr_Set_Auto_Auth(p_Process_Code VARCHAR2,
                             p_Source       IN VARCHAR2,
                             p_Action_Code  IN VARCHAR2,
                             p_Function_Id  IN VARCHAR2,
                             p_Wrk_Oldtronl IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl,
                             p_Err_Code     IN OUT VARCHAR2,
                             p_Err_Params   IN OUT VARCHAR2);
  --Split_Rollover Changes Starts
  FUNCTION Fn_Rvr_Comps_Pickup(p_Source       IN VARCHAR2,
                               p_Action_Code  IN VARCHAR2,
                               p_Function_Id  IN VARCHAR2,
                               p_Wrk_Oldtronl IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl)
    RETURN BOOLEAN;
  --Split_Rollover Changes Ends
  --Bug#28312814  Changes starts
  FUNCTION Fn_Redefine_Schedules_Upload(p_Source         IN VARCHAR2,
                                        p_Action_Code    IN VARCHAR2,
                                        p_Function_Id    IN VARCHAR2,
                                        p_Wrk_Oldtronl   IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl,
                                        p_Product_Master IN Oltms_Product_Master_Ld%ROWTYPE,
                                        p_Err_Code       IN OUT VARCHAR2,
                                        p_Err_Params     IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --Bug#28312814  changes ends

  --OBCL_14.2_VAMI_Sch changes starts
  FUNCTION Fn_How_Many_Schedules(p_Start_Date     IN DATE,
                                 p_Frequency      IN VARCHAR2,
                                 p_Frequency_Unit IN NUMBER,
                                 p_Maturity_Date  IN DATE) RETURN NUMBER;

  FUNCTION Fn_Comp_Type(p_Source      IN VARCHAR2,
                        p_Function_Id IN VARCHAR2,
                        p_Component   IN VARCHAR2,
                        p_Product     IN VARCHAR2) RETURN VARCHAR2;
  --OBCL_14.2_VAMI_Sch changes ends
  --OBCL_14.3_IOF starts
  FUNCTION Fn_Compute_Iof_Tax(p_Source       IN VARCHAR2,
                              p_Function_Id  IN VARCHAR2,
                              p_Action_Code  IN VARCHAR2,
                              p_Wrk_Oldtronl IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl,
                              p_Err_Code     IN OUT VARCHAR2,
                              p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;
  --OBCL_14.3_IOF ends
  FUNCTION Fn_Check_Modify_Fields(p_Source         IN VARCHAR2,
                   p_Action_Code    IN VARCHAR2,
                   p_Function_Id    IN VARCHAR2,
                   p_oldtronl       IN Olpks_Oldtronl_Main.Ty_Oldtronl,
                   p_Prev_Oldtronl  IN Olpks_Oldtronl_Main.Ty_Oldtronl,
                   p_Wrk_Oldtronl   IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl,
                   p_Err_Code       IN OUT VARCHAR2,
                   p_Err_Params     IN OUT VARCHAR2) RETURN BOOLEAN;
  --OBCL_14.3_CAMD_Gateway Changes end
  --Bug#29828479 Starts
	Function Fn_Recalc_Unit(p_Source          In Varchar2,
							 p_Action_Code    In Varchar2,
							 p_Function_Id    In Varchar2,
							 p_Wrk_Oldtronl   In Out Olpks_Oldtronl_Main.Ty_Oldtronl,
							 p_Product_Master In Oltms_Product_Master_Ld%Rowtype,
							 p_Err_Code       In Out Varchar2,
							 p_Err_Params     In Out Varchar2)
		Return Boolean ;
	--Bug#29828479 Ends
  --OBCL_14.3_Support_Bug#30920052 Starts
  PROCEDURE pr_get_linkage_details(p_Source                 IN VARCHAR2,
                                   p_action_code            IN VARCHAR2,
                                   p_Function_Id            IN VARCHAR2,
                                   p_ldtb_contract_linkages IN OUT OLTB_CONTRACT_LINKAGES%ROWTYPE,
                                   p_wrk_oldtronl           IN OUT olpks_oldtronl_main.ty_oldtronl,
                                   P_product_master         IN oltms_product_master_ld%ROWTYPE,
                                   p_available_amount       IN OUT NUMBER,
                                   p_projected_avl_amount   IN OUT NUMBER,
                                   p_dis_account_amount     IN OUT NUMBER,
                                   p_dis_commitment_amount  IN OUT NUMBER,
                                   p_dis_deposit_amount     IN OUT NUMBER,
                                   p_dis_uncovered_amount   IN OUT NUMBER,
                                   p_Err_Code               IN OUT VARCHAR2,
                                   p_Err_Params             IN OUT VARCHAR2);
  --OBCL_14.3_Support_Bug#30920052 Ends
  
  --OBCL_SOFR_Reprice_Accr_Event Start
  FUNCTION Fn_Get_Rfr_Comp_Details(p_Contract_Ref_No IN Varchar2,
						 p_Component	        In Out Varchar2,
                         p_rfr_Component_List   Out Varchar2,
						 p_Rfr_Flag		        Out Varchar2,
                         p_Rfr_Main_Comp_Flag   Out Varchar2,
						 p_Err_Code       		In Out Varchar2,
						 p_Err_Params     		In Out Varchar2)
    Return Boolean ;
  --OBCL_SOFR_Reprice_Accr_Event End
  --Bug#36240813 Start
  PROCEDURE Pr_Calc_Enddt(p_Source                  IN VARCHAR2,
                          p_Function_Id             IN VARCHAR2,
                          p_Wrk_Oldtronl            IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl,
                          p_Ldtb_Contract_Schedules IN OUT Oltb_Contract_Schedules%ROWTYPE,
                          p_Err_Code                IN OUT VARCHAR2,
                          p_Err_Params              IN OUT VARCHAR2);
  --Bug#36240813 End
END Olpks_Oldtronl_Utils1;
/
CREATE OR REPLACE Synonym Olpkss_Oldtronl_Utils1 FOR Olpks_Oldtronl_Utils1
/