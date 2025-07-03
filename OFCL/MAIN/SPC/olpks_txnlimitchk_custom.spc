create or replace package Olpks_TxnlimitChk_custom is
/*----------------------------------------------------------------------------------------------------
**
** File Name  : olpks_status2_custom.SPC
**
** Module    : Oracle Lending
**
  This source is part of the Oracle Flexcube Corporate Lending  Software Product.
  Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.
  No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.

  Oracle Financial Services Software Limited.
  Oracle Park, Off Western Express Highway,
  Goregaon (East),
  Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/

/*----------------------------------CHANGE HISTORY----------------------------------
    **SFR Number         :
    **Changed By         :
    **Change Description :
    **Search String      :
------------------------------------END CHANGE HISTORY-------------------------------------
*/
Function Fn_pre_Product_Txnlim_Val( P_FunctionID    In Varchar2,
                p_Source      In Oltb_Contract.Source%Type,
                p_Contract_Ref_no   In Oltb_Contract.Contract_Ref_No%Type,
                p_Branch          In Oltb_Contract.Branch%Type,
                p_Module      In Oltm_Prod_Txn_Auth_Limits.Module_Id%Type,
                p_product     In Oltm_Prod_Txn_Auth_Limits.Product_Code%Type,               
                p_Customer_no       In Oltb_Contract.Counterparty%Type,
                p_Txn_Amt           In Oltm_Prod_Txn_Auth_Limits.Txn_Limit%Type,
                p_Txn_Ccy           In Oltb_Contract.Contract_Ccy%Type,               
                p_Err_Code        Out Varchar2,
                p_Err_Params        Out Varchar2)Return Boolean;
                
Function Fn_post_Product_Txnlim_Val( P_FunctionID    In Varchar2,
                p_Source      In Oltb_Contract.Source%Type,
                p_Contract_Ref_no   In Oltb_Contract.Contract_Ref_No%Type,
                p_Branch          In Oltb_Contract.Branch%Type,
                p_Module      In Oltm_Prod_Txn_Auth_Limits.Module_Id%Type,
                p_product     In Oltm_Prod_Txn_Auth_Limits.Product_Code%Type,               
                p_Customer_no       In Oltb_Contract.Counterparty%Type,
                p_Txn_Amt           In Oltm_Prod_Txn_Auth_Limits.Txn_Limit%Type,
                p_Txn_Ccy           In Oltb_Contract.Contract_Ccy%Type,               
                p_Err_Code        Out Varchar2,
                p_Err_Params        Out Varchar2)Return Boolean;                
                
Function Fn_pre_Multiauth_Ovd_Log (p_Contract_Ref_no In Oltb_Contract.Contract_Ref_No%Type,
                               p_Event_Seq_No    In Oltb_Contract.Latest_Event_Seq_No%Type,
                 p_Err_Code         Out Varchar2,
                 p_Err_Params      Out Varchar2)Return Boolean;

Function Fn_post_Multiauth_Ovd_Log (p_Contract_Ref_no In Oltb_Contract.Contract_Ref_No%Type,
                               p_Event_Seq_No    In Oltb_Contract.Latest_Event_Seq_No%Type,
                 p_Err_Code         Out Varchar2,
                 p_Err_Params      Out Varchar2)Return Boolean;
                 
Function Fn_pre_Userlimits_Validate(P_FunctionID    In Varchar2,
                p_Source      In Oltb_Contract.Source%Type,
                p_flag          In Char,
                p_Txn_Ccy       In Oltb_Contract.Contract_Ccy%Type,
                p_Txn_Amt       In Oltb_User_Limit.Max_Txn_Amt%Type,
                p_UserId        In Oltb_User_Limit.User_Id%Type,
                p_Branch    In Oltb_User_Limit_Role.Branch%Type,
                p_Err_Code      Out Varchar2,
                p_Err_Params    Out Varchar2)Return Boolean;
                
Function Fn_post_Userlimits_Validate(P_FunctionID    In Varchar2,
                p_Source      In Oltb_Contract.Source%Type,
                p_flag          In Char,
                p_Txn_Ccy       In Oltb_Contract.Contract_Ccy%Type,
                p_Txn_Amt       In Oltb_User_Limit.Max_Txn_Amt%Type,
                p_UserId        In Oltb_User_Limit.User_Id%Type,
                p_Branch    In Oltb_User_Limit_Role.Branch%Type,
                p_Err_Code      Out Varchar2,
                p_Err_Params    Out Varchar2)Return Boolean;
                                
Function Fn_pre_Validate_Dual_Auth( P_FunctionID    In Varchar2,
                p_Source      In Oltb_Contract.Source%Type,
                p_Contract_Ref_no   In Oltb_Contract.Contract_Ref_No%Type,
                p_Branch          In Oltb_Contract.Branch%Type,
                p_Module      In Oltm_Prod_Txn_Auth_Limits.Module_Id%Type,
                p_Txn_Amt           In Oltm_Prod_Txn_Auth_Limits.Txn_Limit%Type,
                p_Txn_Ccy           In Oltb_Contract.Contract_Ccy%Type, 
                p_UserId          In Oltb_User_Limit.User_Id%Type,                
                p_Err_Code        Out Varchar2,
                p_Err_Params        Out Varchar2)Return Boolean;
                
Function Fn_post_Validate_Dual_Auth( P_FunctionID    In Varchar2,
                p_Source      In Oltb_Contract.Source%Type,
                p_Contract_Ref_no   In Oltb_Contract.Contract_Ref_No%Type,
                p_Branch          In Oltb_Contract.Branch%Type,
                p_Module      In Oltm_Prod_Txn_Auth_Limits.Module_Id%Type,
                p_Txn_Amt           In Oltm_Prod_Txn_Auth_Limits.Txn_Limit%Type,
                p_Txn_Ccy           In Oltb_Contract.Contract_Ccy%Type, 
                p_UserId          In Oltb_User_Limit.User_Id%Type,                
                p_Err_Code        Out Varchar2,
                p_Err_Params        Out Varchar2)Return Boolean;                

end Olpks_TxnlimitChk_custom;
/