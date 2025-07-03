CREATE OR REPLACE PACKAGE olpks_fxvr_calc
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name  : olpks_fxvr_calc.SPC
**
** Module   : LD
**
  This source is part of the Oracle Banking Corporate Lending  Software Product.
  Copyright Â© 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.
  No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.

  Oracle Financial Services Software Limited.
  Oracle Park, Off Western Express Highway,
  Goregaon (East),
  Mumbai - 400 063, India.
------------------------------CHANGE HISTORY--------------------------------------------------------

 	**Changed By         : Revathi Dharmalingam
    **Date               : 11-AUG-2021
    **Change Description : Added code to pick the records(Online/EOD) for calculate the FX Variation Changes 
    **Search String      : OBCL_14.5_FX_Variation Changes
	
	**Changed By         : Aishwarya Sekar
    **Date               : 07-Feb-2022
    **Change Description : New function Fn_Calculate_Till_Date_Accrual added to get the till date accural and added function_id param in Fn_Pass_Ac_Entry
    **Search String      : OBCL_14.5_33588223_FX_Variation Changes
	
	**Changed By         : Revathi Dharmalingam
    **Date               : 13-Mar-2023
    **Change Description : Code added to calculate the Lcy Equivalent calculation during EOD
    **Search String      : OBCL_14.6_SUPPORT_BUG#35167680_Changes
	
  **Changed By         : Revathi Dharmalingam
  **Date               : 19-Aug-2023
  **Change Description : Added code to pass the XADJ accounting entries when user does the prepayment.
  **Search String      : OBCL_14.7_Support_Bug#35616101_Changes 

  **Changed By         : Revathi Dharmalingam
  **Date               : 19-Aug-2023
  **Change Description : Added code to pass the XADJ accounting entries for paid amount when user does the prepayment.
  **Search String      : OBCL_14.7_Support_Bug#35851109_Changes 

  **Changed By         : Revathi Dharmalingam
  **Date               : 11-Dec-2023
  **Change Description : Added code to calculate the lcy amount using the each schedule date -1  exchange rate when user does the multiple overdue payment.
  **Search String      : OBCL_14.7_Support_Bug#36068660_Changes  

  **Changed By         : Revathi Dharmalingam
  **Date               : 21-Dec-2023
  **Change Description : Added code to calculate penal the lcy amount using the each schedule date -1  exchange rate when user does the multiple overdue payment.
  **Search String      : OBCL_14.7_Support_Bug#35991107_Changes   
  
  **Changed By         : Revathi Dharmalingam
  **Date               : 23-Jan-2024
  **Change Description : Added code to calculate the lcy amount using the each schedule date -1  exchange rate when user does the multiple overdue payment.
  **Search String      : OBCL_14.7_Support_Bug#36217310_Changes   
  
  **Changed By         : Revathi Dharmalingam
  **Date               : 07-Mar-2024
  **Change Description : Added code to supports the back dated payment when user does the lcy payment.
  **Search String      : OBCL_14.7_Support_Bug#36280998_Changes  
  
  **Changed By         : Revathi Dharmalingam
  **Date               : 22-May-2024
  **Change Description : Added code to populate the Accrual to date in the collection variable as preventive fix during penalty lcy calculation.
  **Search String      : OBCL_14.7_Support_Bug#36606087_Changes

------------------------------------------------------------------------------------------------------------
*/

 TYPE Ty_Tb_contract_iccf_calc IS TABLE OF oltb_contract_iccf_calc%ROWTYPE;
 TYPE Ty_Tb_contract_amount_due IS TABLE OF oltb_amount_due%ROWTYPE;
 TYPE Ty_Tb_contract_charge IS TABLE OF lftb_charge_appln%ROWTYPE;
 TYPE Ty_Tb_contract_tax IS TABLE OF Txtb_Txnrule_detail%ROWTYPE;
 TYPE Ty_Tb_contract_iccf_Exp IS TABLE OF OLTB_CONTRACT_ICCF_EXP%ROWTYPE;--OBCL_14.6_SUPPORT_BUG#35167680_Changes
 TYPE Ty_Tb_contract_liq_Summary IS TABLE OF oltbs_contract_liq%ROWTYPE; --OBCL_14.7_Support_Bug#35851109_Changes 
 
  --OBCL_14.7_Support_Bug#36606087_Changes Starts
 TYPE Ty_Tb_Contract_Accrual_Date IS TABLE OF DATE INDEX BY VARCHAR2(255);
 Contract_Accrual_Date Ty_Tb_Contract_Accrual_Date;
  --OBCL_14.7_Support_Bug#36606087_Changes Ends
  
   FUNCTION Fn_Process(p_Branch           IN VARCHAR2,
                       p_Module           IN VARCHAR2,
					   p_Calling_Function IN VARCHAR2,
					   p_Ext_System       IN VARCHAR2,
					   p_Contract_Ref_No  IN VARCHAR2,
                        p_Contract_Ccy     IN VARCHAR2,
                        p_Msg_Id          IN OUT VARCHAR2,
					   p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) 
  RETURN VARCHAR2;

   FUNCTION Fn_Load_Dsbr_Process
                      (p_Branch           IN VARCHAR2,
                       p_Module           IN VARCHAR2,
					   p_Loan_Ccy         IN VARCHAR2,					   
					   p_Calling_Function IN VARCHAR2,
					   p_Ext_System       IN VARCHAR2,
					   p_Contract_Ref_No  IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Source           IN VARCHAR2,
					   p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2,
                       p_Spot_Rate        IN NUMBER DEFAULT 0) 
  RETURN BOOLEAN;
  
  FUNCTION Fn_Load_Staging_Details
                      (p_Branch           IN VARCHAR2,
                       p_Module           IN VARCHAR2,
					   p_Loan_Ccy         IN VARCHAR2,
                       p_Ext_System       IN VARCHAR2,
					   p_Contract_Ref_No  IN VARCHAR2,
                       p_Value_Date       IN DATE,
                       p_Amount           IN Oltbs_Contract_Master.Amount%TYPE,
                       p_Msgid            IN Oltb_Util_Master.Msgid%TYPE,
                       p_Process_No       IN NUMBER,
                       p_Process_Ref_No   IN VARCHAR2,
                       p_Batch            IN VARCHAR2,
                       p_Amount_Due       IN Ty_Tb_contract_amount_due,
                       p_Iccf_Calc        IN Ty_Tb_contract_iccf_calc,
					   p_Iccf_Exp         IN Ty_Tb_contract_iccf_exp,
                       p_Contract_Charge  IN Ty_Tb_contract_charge,
                       p_Contract_Tax     IN Ty_Tb_contract_tax,
					   p_Contract_Liq_Summary     IN Ty_Tb_contract_liq_Summary,--OBCL_14.7_Support_Bug#35851109_Changes
                       p_Spot_Rate        IN NUMBER,
                       p_Calling_Function IN VARCHAR2,
					   p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2,
					   p_Limit_Date       IN DATE DEFAULT NULL --OBCL_14.7_Support_Bug#35851109_Changes
					   ) 
  RETURN BOOLEAN;
  
  FUNCTION Fn_Update_Process_Details
                      (p_Branch           IN VARCHAR2,
                       p_Module           IN VARCHAR2,
					   p_Loan_Ccy         IN VARCHAR2,
                       p_Calling_Function IN VARCHAR2,
                       p_Ext_System       IN VARCHAR2,                       
					   p_Contract_Ref_No  IN VARCHAR2,
                     --  p_Value_Date      IN DATE,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) 
  RETURN BOOLEAN;
  
  
FUNCTION Fn_Amt1_To_Amt2 (P_Branch		IN		oltms_branch.BRANCH_CODE%TYPE,
						P_Ccy1			IN		CYTMS_CCY_DEFN.CCY_CODE%TYPE,
						P_Ccy2			IN		CYTMS_CCY_DEFN.CCY_CODE%TYPE,
						P_Amount1		IN		NUMBER,
						P_Rounding		IN		CHAR, 
						P_Amount2		OUT		NUMBER,
						P_Rate			IN	OUT	CYTMS_RATES.MID_RATE%TYPE,
						P_Error_Code		IN	OUT	ERTBS_MSGS.ERR_CODE%TYPE
						) Return VARCHAR2;
                        
FUNCTION Fn_Pass_Ac_Entry (
                       p_Contract_Ref_No  IN VARCHAR2,
					   p_Function_Id      IN VARCHAR2, --OBCL_14.5_33588223_FX_Variation Changes
                       P_Error_Code		IN	OUT	ERTBS_MSGS.ERR_CODE%TYPE,
					   p_Event_Code       IN VARCHAR2 DEFAULT 'XACR' --OBCL_14.7_Support_Bug#35616101_Changes
                       ) RETURN VARCHAR2;

--OBCL_14.5_33588223_FX_Variation Changes start					   
FUNCTION Fn_Calculate_Till_Date_Accrual (
                       p_Contract_Ref_No   IN VARCHAR2,
                       P_Component		   IN VARCHAR2,
                       p_Ccy               IN VARCHAR2,
                       p_Due_Date          IN DATE,
                       p_Processing_Date   IN DATE,
					   p_End_Date          IN DATE,
					   p_Value_Date        IN DATE, --OBCL_14.6_SUPPORT_BUG#35167680_Changes
                       p_Till_Date_Accrual OUT Oltbs_Contract_Iccf_Details.Till_Date_Accrual%TYPE
                       ) RETURN VARCHAR2;
--OBCL_14.5_33588223_FX_Variation Changes end

--OBCL_14.7_Support_Bug#36068660_Changes Starts
FUNCTION Fn_Get_Amt_Due_For_Liq(p_Contract_Ref_No IN VARCHAR2,
                                P_Component       IN VARCHAR2,
                                p_Value_Date      IN DATE,
                                p_Limit_Date      IN DATE,
                                p_lcy_amount_due  OUT Oltbs_Amount_Due.Amount_Due%TYPE,
                                p_Error_Code      OUT VARCHAR2)
  RETURN BOOLEAN;
--OBCL_14.7_Support_Bug#36068660_Changes Ends 

--OBCL_14.7_Support_Bug#35991107_Changes Starts
FUNCTION fn_fetch_sch_lcy_equivalent(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                               P_Amount_Tag      IN VARCHAR2,
                               P_Branch          IN Oltbs_Contract.Branch%TYPE,							   
                               p_Value_Date      IN Oltbs_Contract_Master.Value_Date%TYPE,
							   p_Due_Date        IN Oltbs_Amount_Due.Due_date%TYPE DEFAULT NULL,
                               P_Rate            IN OUT CYTMS_RATES.MID_RATE%TYPE,
                               P_Accr_Amount     IN OUT Oltbs_Contract_Iccf_Details.till_date_accrual%TYPE,
                               p_Error_Code      IN OUT VARCHAR2,
                               p_Error_Parameter IN OUT VARCHAR2)
  Return BOOLEAN; 
  
FUNCTION Fn_Calculate_Till_Date_Accrual(p_Contract_Ref_No     IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                          p_Contract_Value_Date IN DATE,
                                          p_Component           IN Oltbs_Contract_Iccf_Details.Component%TYPE,
                                          p_Component_Currency  IN Oltbs_Contract_Iccf_Details.Component_Currency%TYPE,
                                          p_Schedule_Date       IN DATE,
                                          p_Accrual_To_Date     IN DATE,
                                          p_Till_Date_Accrual   OUT Oltbs_Contract_Iccf_Details.Till_Date_Accrual%TYPE,
                                          p_Error_Code          IN OUT VARCHAR2,
                                          p_Error_Parameter     IN OUT VARCHAR2)
    RETURN BOOLEAN;
--OBCL_14.7_Support_Bug#35991107_Changes Ends  

--OBCL_14.7_Support_Bug#36217310_Changes Starts
FUNCTION fn_fetch_sch_fcy_equivalent(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                               P_Component       IN VARCHAR2,
                               P_Branch          IN Oltbs_Contract.Branch%TYPE,
                               p_Value_Date      IN Oltbs_Contract_Master.Value_Date%TYPE,
							   p_Due_Date        IN Oltbs_Amount_Due.Due_date%TYPE DEFAULT NULL,
							   P_Lcy_Paid_Amt    IN Oltbs_Amount_Due.Amount_Settled%TYPE,
                               P_Fcy_Paid_Amount  OUT Oltbs_Amount_Due.Amount_Settled%TYPE,
                               p_Error_Code      IN OUT VARCHAR2,
                               p_Error_Parameter IN OUT VARCHAR2)
  Return BOOLEAN;

--OBCL_14.7_Support_Bug#36217310_Changes Ends

--OBCL_14.7_Support_Bug#36280998_Changes Starts
FUNCTION Fn_Populate_Till_Date_Accrual(p_Contract_Ref_No     IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                       p_Value_Date      IN Oltbs_Contract_Master.Value_Date%TYPE,
							           p_Due_Date        IN Oltbs_Amount_Due.Due_date%TYPE DEFAULT NULL,                                       
                                       p_Error_Code          IN OUT VARCHAR2,
                                        p_Error_Parameter     IN OUT VARCHAR2
                                       )
RETURN BOOLEAN;
--OBCL_14.7_Support_Bug#36280998_Changes Ends
END olpks_fxvr_calc;
/
CREATE OR REPLACE Synonym olpkss_fxvr_calc FOR olpks_fxvr_calc
/