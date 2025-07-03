CREATE OR REPLACE Package Olpks_TxnlimitChk As
 /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : Olpks_TxnlimitChk.Spc
  **
  ** Module   : LOANS AND DEPOSITS
  **
    This source is part of the Oracle Banking Corporate Lending  Software Product.
    Copyright ? 2019 , Oracle and/or its affiliates.  All rights reserved.
    No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.

    Oracle Financial Services Software Limited.
    Oracle Park, Off Western Express Highway,
    Goregaon (East),
    Mumbai - 400 063, India.
	
	Changed By         : Surya Prabha S
    Changed On         : 14-Feb-2020
    Search String      : OBCL_14.4_LS_Multi_Auth
    Change Reason      : Multi Authorization changes.
    
   **Changed By         : Sudharshini Balaji
    **Date               : 08-Jan-2021
    **Change Description : Added code for base bug Bug#32222167
    **Search String      : Bug#32476678
  ----------------------------------------------------------------------------------------------------*/ 
g_Followseq Oltm_Prod_Txn_Limits.Follow_Seq%Type;
g_Authrole  Oltm_Prod_Txn_Limits.Role_Based_Auth%Type;
g_Multiauth_Ovd Oltb_Multiauth_Ovd_Master%RowType;
g_pri_auth_role Oltms_Auth_Role_Map%RowType;
g_alt_auth_role Oltms_Auth_Role_Map%RowType;
g_auto_auth VARCHAR2(1) := 'N'; -- OBCL_14.4_LS_Multi_Auth changes

--Bug#32222167   changes start
  PROCEDURE Pr_Skip_Handler(P_Stage IN VARCHAR2);
  PROCEDURE Pr_Set_Skip_Kernel;
  PROCEDURE Pr_Set_Activate_Kernel;
  PROCEDURE Pr_Set_Skip_Cluster;
  PROCEDURE Pr_Set_Activate_Cluster;
  FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
  --Bug#32222167   changes end


Procedure dbg(pMsg In Varchar2);

Procedure Pr_Log_Error	(p_Function_Id In Varchar2,
                         p_Source      Varchar2,
                         p_Err_Code    Varchar2,
                         p_Err_Params  Varchar2);

Function Fn_Product_Txnlim_Val(	P_FunctionID		In Varchar2,
								p_Source			In Oltb_Contract.Source%Type,
								p_Contract_Ref_no   In Oltb_Contract.Contract_Ref_No%Type,
								p_Branch       		In Oltb_Contract.Branch%Type,
								p_Module			In Oltm_Prod_Txn_Auth_Limits.Module_Id%Type,
								p_product			In Oltm_Prod_Txn_Auth_Limits.Product_Code%Type,								
								p_Customer_no     	In Oltb_Contract.Counterparty%Type,
								p_Txn_Amt         	In Oltm_Prod_Txn_Auth_Limits.Txn_Limit%Type,
								p_Txn_Ccy         	In Oltb_Contract.Contract_Ccy%Type,								
								p_Err_Code       	Out Varchar2,
								p_Err_Params       	Out Varchar2)Return Boolean;

Function Fn_Multiauth_Ovd_Log (p_Contract_Ref_no In Oltb_Contract.Contract_Ref_No%Type,
                               p_Event_Seq_No    In Oltb_Contract.Latest_Event_Seq_No%Type,
							   p_Err_Code       	Out Varchar2,
							   p_Err_Params      Out Varchar2)Return Boolean;
							   
Function Fn_Userlimits_Validate(P_FunctionID		In Varchar2,
								p_Source			In Oltb_Contract.Source%Type,
								p_flag          In Char,
								p_Txn_Ccy       In Oltb_Contract.Contract_Ccy%Type,
								p_Txn_Amt       In Oltb_User_Limit.Max_Txn_Amt%Type,
								p_UserId       	In Oltb_User_Limit.User_Id%Type,
								p_Branch 		In Oltb_User_Limit_Role.Branch%Type,
								p_Err_Code      Out Varchar2,
								p_Err_Params    Out Varchar2)Return Boolean;
								
Function Fn_Validate_Dual_Auth( P_FunctionID		In Varchar2,
								p_Source			In Oltb_Contract.Source%Type,
								p_Contract_Ref_no   In Oltb_Contract.Contract_Ref_No%Type,
								p_Branch       		In Oltb_Contract.Branch%Type,
								p_Module			In Oltm_Prod_Txn_Auth_Limits.Module_Id%Type,
								p_Txn_Amt         	In Oltm_Prod_Txn_Auth_Limits.Txn_Limit%Type,
								p_Txn_Ccy         	In Oltb_Contract.Contract_Ccy%Type,	
								p_UserId       		In Oltb_User_Limit.User_Id%Type,								
								p_Err_Code       	Out Varchar2,
								p_Err_Params       	Out Varchar2)Return Boolean;
								
End Olpks_TxnlimitChk;
/