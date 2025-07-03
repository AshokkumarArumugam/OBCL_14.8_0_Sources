CREATE OR REPLACE PACKAGE olpks_oldpmnt_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_oldpmnt_utils.spc
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

  SFR Number         : 25040700
  Search String      : OFCL_12.3.0.0.0_25040700
  Changed By         : K.PRIYADARSHINI
  Change Description : Added Function for validating overpayment scenario

  SFR Number         : 25109230
  Search String      : OFCL_12.3.0.0.0_25109230
  Changed By         : K.PRIYADARSHINI
  Change Description : Added function to log overrides and added validation for partial payment
  
  **SFR Number         : 29583884     
**Changed By         : Arvind Baskar
**Change Description : Hooks provided for FN_GET_PROD_DETAILS 
**Search String      : Bug#29583884 
 
**Changed By         : Meha
**Change Description : OBDX_QueryService Changes
**Search String      : OBCL_14.4_OBDX_QRYPMNT Changes

**Changed By         : Meha
**Change Description : Linking Multiple Loan Under One Commitment before authorization
**Search String      : OBCL_14.4_MultipleLoan_Link

  **Changed By         : Chandra Achuta
  **Date               : 23-DEC-2020
  **Change Description : Added code for display proper settlement account in OLDPMNT for page version.
  **Search String      : Bug#31911864
  
  **Changed By         : Revathi Dharmalingam
  **Date               : 01-Nov-2021
  **Change Description : Changes made for FX Variation Changes during Manual Payment
  **Search String      : OBCL_14.5_FX_Variation Changes
  
   **Changed By          : Sudharshini Balaji     
   **Date                : 24-Jan-2022
   **Change Description  : Added code Back Dated Payment( Penalty Reversal)
   **Search String       : Bug#33769290
   
   **Changed By         : Aishwarya Sekar
   **Date               : 31-Jan-2022
   **Change Description : OL Payment Gateway Changes
   **Search String      : OBDX_14.5_OBCL_Payment_Gateway_Changes
  
  **Changed By         : Navoneel Nandan
  **Date               : 15-Jun-2022
  **Change Description : Applying Schedule Cutoff Logic only for Full Payment
  **Search String      : Bug#34278728
  
  **Changed By         : Navoneel Nandan
  **Date               : 02-Sep-2022
  **Change Description : Storing the paid date in fully_paid_sch_list
  **Search String      : Bug#34599102
  
  **Changed By         : Sudharshini Balaji
  **Date               : 06-Oct-2023
  **Change Description : Backdated Partial Payment - Penal Basis amount split case. Adding new global variable for this case.
  **Search String      : Bug#35950238  (Forward port of 35883026 )
    
  **Changed By         : Akhila Samson
  **Date               : 07-Dec-2023
  **Change Description : Added a global collect to store lcy and fcy amounts for fcy loans.
  **Search String      : Bug#36044271

  **Changed By         : Balaji Gopal
  **Date               : 22-Feb-2024
  **Change Description : Oltbs_Daily_Log_Ac - Block_No is updated in Fn_Auth_Eca when payment gateway initiated.
                         Contract will be saved only,not authorized when status is maintained as "Authorized" in the upload status maintenance(CODUPLDM).
                         Payment with ECA contracts will be authorize in the scheduler(EXTDDACALL).
  **Search String      : Bug#36254896
  
  **Changed By         : Revathi Dharmalingam
  **Date               : 25-Feb-2024
  **Change Description : Added code to calculate the lcy amount using the each schedule date -1  exchange rate from Olvws_Rates_Hist view instead of the Oltbs_Contract_Fx_Variation table.
  **Search String      : OBCL_14.7_Support_Bug#36337701_Changes 
  -------------------------------------------------------------------------------------------------------
  */
  
  --Bug#29583884   changes start
  PROCEDURE Pr_Skip_Handler(P_Stage IN VARCHAR2);
  PROCEDURE Pr_Set_Skip_Kernel;
  PROCEDURE Pr_Set_Activate_Kernel;
  PROCEDURE Pr_Set_Skip_Cluster;
  PROCEDURE Pr_Set_Activate_Cluster;
  FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
--Bug#29583884   changes end

  g_valuedate_after_appdate CHAR(1);
  g_prepmt_after_maturity   CHAR(1);
  g_due_amount              oltbs_contract_liq_summary.total_paid%type;
  g_valdt_hol_treatment     OLTM_PRODUCT_MASTER_LD.apply_pmt_hol_treatment%type;
  g_pmt_breakup             CHAR(1);
  g_breakup_allocate        CHAR(1);
  g_PRM_ALLOWOVERPMT        CHAR(1);
  g_PRM_DUE_AMOUNT          CHAR(1);
  g_PRM_PROJECTION_DONE     CHAR(1);
  g_prm_overdueschexist     CHAR(1);
  g_page_version_esn        NUMBER;    --Bug#31911864   Code Added
  g_pmt_ccy                 CHAR(1) := 'F'; --OBCL_14.5_FX_Variation Changes
  
  g_paymnt_lmt_date         olvw_payment_summary.LIMITDT%type ; -- $$ Bug#33769290 changes
   G_TAX_WAIVED    CHAR(1); --OBCL_14.5_Support_Bug#33805866_Changes
  g_lcl_Action_Code         VARCHAR2(100); --OBDX_14.5_OBCL_Payment_Gateway_Changes
  g_spot_rate            Oltbs_contract_liq_summary.spot_rate%TYPE; --OBCL_14.7_Support_Bug#36337701_Changes
  --Bug#34278728 starts
  TYPE typ_fully_paid_sch IS RECORD
  (
  schedule_date DATE,
  --Bug#34599102 starts
  paid_date     DATE,
  due_amt    NUMBER,
  paid_amt   NUMBER,
  --Bug#34599102 ends
  yn_fully_paid VARCHAR2(1)
  );
  TYPE typ_fully_paid_sch_list IS TABLE OF typ_fully_paid_sch;
  g_fully_paid_sch_list typ_fully_paid_sch_list:=typ_fully_paid_sch_list();
  
  TYPE typ_fully_paid_sch_comp IS RECORD
  (
  component     oltbs_amount_due.component%TYPE,
  schedule_date DATE,
  --Bug#34599102 starts
  paid_date     DATE,
  due_amt    NUMBER,
  paid_amt   NUMBER,
  --Bug#34599102 ends
  yn_fully_paid VARCHAR2(1)
  );
  TYPE typ_fully_paid_sch_comp_list IS TABLE OF typ_fully_paid_sch_comp;
  --Bug#34278728 ends
  g_fully_paid_sch_comp_list typ_fully_paid_sch_comp_list:=typ_fully_paid_sch_comp_list();--Bug#34599102
    g_bckdt_part_pay            CHAR(1):= 'N';--$$ Bug#35950238  Changes
	
  ----Bug#36044271 start
  TYPE typ_fcy_amt_comp IS RECORD
    (
    component     oltbs_amount_due.component%TYPE,
    fcy_due_amt    NUMBER,
    fcy_paid_amt   NUMBER,
    fcy_tax_amt   NUMBER,
    lcy_due_amt    NUMBER,
    lcy_paid_amt   NUMBER,
    lcy_tax_amt   NUMBER
    );
  TYPE typ_fcy_amt_comp_list IS TABLE OF typ_fcy_amt_comp INDEX BY BINARY_INTEGER;
  G_typ_fcy_amt_comp_list typ_fcy_amt_comp_list;
  ----Bug#36044271 ends
  
  FUNCTION fn_revvalidations(p_contract_ref_no IN VARCHAR2,
                             p_esn             IN OUT NUMBER,
                             p_action          IN VARCHAR2,
                             p_error_code      IN OUT VARCHAR2,
                             p_error_param     IN OUT VARCHAR2)
    RETURN BOOLEAN;
	
	--Bug#29583884   changes start
FUNCTION FN_GET_PROD_DETAILS(c_ref_no OLTB_CONTRACT.contract_ref_no%type,
							 l_ldtb_product_row IN OUT oltms_product_master_ld%rowtype,
							 p_Err_Code  IN OUT VARCHAR2,
							 p_Err_Params  IN OUT VARCHAR2)
	RETURN BOOLEAN;
--Bug#29583884   changes end

  FUNCTION Fn_Default_And_Validate(p_Source           IN VARCHAR2,
                                   p_Source_Operation IN VARCHAR2,
                                   p_Function_Id      IN VARCHAR2,
                                   p_Action_Code      IN VARCHAR2,
                                   p_oldpmnt          IN olpks_oldpmnt_main.ty_oldpmnt,
                                   p_prev_oldpmnt     IN olpks_oldpmnt_main.ty_oldpmnt,
                                   p_wrk_oldpmnt      IN OUT olpks_oldpmnt_main.ty_oldpmnt,
                                   p_Err_Code         IN OUT VARCHAR2,
                                   p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_get_subsys_stat(p_subsystem  IN VARCHAR2,
                              p_subsysstat IN VARCHAR2) RETURN VARCHAR2;
  FUNCTION fn_upd_subsys_stat(p_subsystem  IN VARCHAR2,
                              p_stat       IN VARCHAR2,
                              p_subsysstat IN VARCHAR2) RETURN VARCHAR2;
  FUNCTION Fn_Get_Versionno(p_Contract_Ref_No IN VARCHAR2,
                            p_Version_No      IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Get_Liqdorder(p_Contract_Ref_No IN VARCHAR2,
                            p_Order           OUT NUMBER,
                            p_Liqd_Order      IN OUT NUMBER) RETURN BOOLEAN;
  FUNCTION Fn_Build_LDpaydetails(p_oldpmnt     IN olpks_oldpmnt_main.ty_oldpmnt,
                                 p_wrk_oldpmnt IN OUT olpks_oldpmnt_main.ty_oldpmnt,
                                 p_Order       IN OUT NUMBER,
                                 p_Err_Code    IN OUT VARCHAR2,
                                 p_Err_Params  IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_subsys_pickup(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_oldpmnt          IN olpks_oldpmnt_main.ty_oldpmnt,
                            p_prev_oldpmnt     IN olpks_oldpmnt_main.ty_oldpmnt,
                            p_wrk_oldpmnt      IN OUT olpks_oldpmnt_main.ty_oldpmnt,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_subsys_upload(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_oldpmnt          IN olpks_oldpmnt_main.ty_oldpmnt,
                            p_prev_oldpmnt     IN olpks_oldpmnt_main.ty_oldpmnt,
                            p_wrk_oldpmnt      IN OUT olpks_oldpmnt_main.ty_oldpmnt,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Process(p_Source           IN VARCHAR2,
                      p_Source_Operation IN VARCHAR2,
                      p_Function_Id      IN VARCHAR2,
                      p_Action_Code      IN VARCHAR2,
                      p_Child_Function   IN VARCHAR2,
                      p_Multi_Trip_Id    IN VARCHAR2,
                      p_oldpmnt          IN olpks_oldpmnt_main.ty_oldpmnt,
                      p_prev_oldpmnt     IN olpks_oldpmnt_main.ty_oldpmnt,
                      p_wrk_oldpmnt      IN OUT olpks_oldpmnt_main.ty_oldpmnt,
                      p_Err_Code         IN OUT VARCHAR2,
                      p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  --Priya
  --OFCL_12.3.0.0.0_25040700 changes starts
  FUNCTION Fn_Valid_Amt_Paid_Overpayment(p_Source           IN VARCHAR2,
                                         p_Source_Operation IN VARCHAR2,
                                         p_Function_Id      IN VARCHAR2,
                                         p_Action_Code      IN VARCHAR2,
                                         p_oldpmnt          IN olpks_oldpmnt_main.ty_oldpmnt,
                                         p_prev_oldpmnt     IN olpks_oldpmnt_main.ty_oldpmnt,
                                         p_wrk_oldpmnt      IN OUT olpks_oldpmnt_main.ty_oldpmnt,
                                         p_Err_Code         IN OUT VARCHAR2,
                                         p_Err_Params       IN OUT VARCHAR2)
    RETURN boolean;
  --OFCL_12.3.0.0.0_25040700 changes ends

  --OFCL_12.3.0.0.0_25109230 changes starts
  FUNCTION fn_log_override(p_Source       IN VARCHAR2,
                           p_Function_Id  IN VARCHAR2,
                           p_Action_Code  IN VARCHAR2,
                           p_wrk_oldpmnt      IN OUT olpks_oldpmnt_main.ty_oldpmnt,
                           p_Err_Code     IN OUT VARCHAR2,
                           p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;
  --OFCL_12.3.0.0.0_25109230 changes ends
  
  PROCEDURE pr_populate_blk_pmt(p_Source         IN VARCHAR2,
                                p_Function_id    IN VARCHAR2,
                                p_contract_refno OLTB_CONTRACT.contract_ref_no%type,
                                p_wrk_oldpmnt    IN OUT olpks_oldpmnt_main.ty_oldpmnt);

--OBCL_14.4_OBDX_QRYPMNT Changes Starts
	Procedure Pr_Pmt_Btn_Pressed(p_Source         In Varchar2,
								 p_Function_Id    In Varchar2,
								 p_Contract_Refno Oltb_Contract.Contract_Ref_No%Type,
								 p_Action_Code    In Varchar2,                              
								 p_Wrk_Oldpmnt    In Out Olpks_Oldpmnt_Main.Ty_Oldpmnt);
    Procedure Pr_Auto_Allocate	(p_Source      In Varchar2,
								 p_Function_id In Varchar2,
								 p_Wrk_Oldpmnt In Out olpks_oldpmnt_main.ty_oldpmnt);
--OBCL_14.4_OBDX_QRYPMNT Changes Ends
--Bug#34278728 starts
FUNCTION fn_is_Full_payment(p_Wrk_Oldpmnt        IN Olpks_Oldpmnt_Main.Ty_Oldpmnt,
                            p_contract_value_date IN DATE,
                            p_error_code          IN OUT VARCHAR2,
                            p_error_parameter     IN OUT VARCHAR2) RETURN BOOLEAN;
--Bug#34278728 ends
--OBCL_14.4_MultipleLoan_Link Changes Starts
Function Fn_Chk_Unauth_On_Linkages(p_Source       In Varchar2,
                                   p_Function_Id  In Varchar2,
                                   p_contrefno    Oltb_Contract.Contract_Ref_No%Type,
                                   p_product_type Oltb_Contract.Product_Type%Type,
                                   p_Err_Code     In Out Varchar2,
                                   p_Err_Params   In Out Varchar2)
    RETURN BOOLEAN;
--OBCL_14.4_MultipleLoan_Link Changes Ends
  -- Bug#36254896 Starts Here
  FUNCTION Fn_Auth_Payment_Scheduler(p_contract_ref_no     IN VARCHAR2,
                                     p_Err_Code        IN OUT VARCHAR2,
                                     p_Err_Params      IN OUT VARCHAR2) RETURN VARCHAR2;
  -- Bug#36254896 Ends Here
END olpks_oldpmnt_utils;
/