create or replace package olpks_oldovdef_utils_cluster is

  /*----------------------------------------------------------------------------------------------------
**
** File Name  : olpks_oldovdef_utils_cluster.SPC
**
** Module    : LOANS AND DEPOSITS
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

Function Fn_Pre_Query(  p_Source In  Varchar2,
          p_Function_Id In  Varchar2,
          p_Action_Code In  Varchar2,
          p_Oldovdef In olpks_oldovdef_Main.Ty_oldovdef,
          p_Wrk_Oldovdef In Out  olpks_oldovdef_Main.Ty_oldovdef,
          p_Err_Code In Out Varchar2,
          p_Err_Params In Out Varchar2)Return Boolean ;
          
Function Fn_Post_Query(  p_Source In  Varchar2,
          p_Function_Id In  Varchar2,
          p_Action_Code In  Varchar2,
          p_Oldovdef In olpks_oldovdef_Main.Ty_oldovdef,
          p_Wrk_Oldovdef In Out  olpks_oldovdef_Main.Ty_oldovdef,
          p_Err_Code In Out Varchar2,
          p_Err_Params In Out Varchar2)Return Boolean ;          

Function Fn_Pre_MultiAuth_Ovd(  p_Source In  Varchar2,
              p_Function_Id In  Varchar2,
              p_Action_Code In  Varchar2,
              p_Oldovdef In olpks_oldovdef_Main.Ty_oldovdef,
              p_Wrk_Oldovdef In Out  olpks_oldovdef_Main.Ty_oldovdef,
              p_Err_Code In Out Varchar2,
              p_Err_Params In Out Varchar2)Return Boolean ;

Function Fn_Post_MultiAuth_Ovd(  p_Source In  Varchar2,
              p_Function_Id In  Varchar2,
              p_Action_Code In  Varchar2,
              p_Oldovdef In olpks_oldovdef_Main.Ty_oldovdef,
              p_Wrk_Oldovdef In Out  olpks_oldovdef_Main.Ty_oldovdef,
              p_Err_Code In Out Varchar2,
              p_Err_Params In Out Varchar2)Return Boolean ;              
              
Function Fn_Pre_Process_Ovd(p_Contract_Ref_No In Oltb_Contract.Contract_Ref_No%Type,
            p_Module      In Oltb_Contract.Module_Code%Type,
            p_Event_Seq_No    In Oltb_Contract.Latest_Event_Seq_No%Type,
            p_ErrCode       In Oltb_Multiauth_Ovd_Master.Err_Code%Type,
            p_User_Id       In Olvw_Contract_Ovd.Maker_id%Type,
            p_Txn_Ccy         In Oltb_Multiauth_Ovd_Master.Txn_Ccy%Type,
            p_Txn_Amount      In Oltb_Multiauth_Ovd_Master.Txn_Amount%Type,
            p_Branch      In Olvw_Contract_Ovd.Branch%Type,
            p_Cumulative      Out Oltb_Multiauth_Ovd_Master.Cumulative%Type,
            p_Pendauth      In Out Oltb_Multiauth_Ovd_Master.Pending_Auth%Type,
            p_Err_Code      Out Varchar2,
            p_Err_Params    Out Varchar2,
            p_Wrk_Oldovdef    In Out  olpks_oldovdef_Main.Ty_oldovdef)Return Boolean;
            
Function Fn_Post_Process_Ovd(p_Contract_Ref_No In Oltb_Contract.Contract_Ref_No%Type,
            p_Module      In Oltb_Contract.Module_Code%Type,
            p_Event_Seq_No    In Oltb_Contract.Latest_Event_Seq_No%Type,
            p_ErrCode       In Oltb_Multiauth_Ovd_Master.Err_Code%Type,
            p_User_Id       In Olvw_Contract_Ovd.Maker_id%Type,
            p_Txn_Ccy         In Oltb_Multiauth_Ovd_Master.Txn_Ccy%Type,
            p_Txn_Amount      In Oltb_Multiauth_Ovd_Master.Txn_Amount%Type,
            p_Branch      In Olvw_Contract_Ovd.Branch%Type,
            p_Cumulative      Out Oltb_Multiauth_Ovd_Master.Cumulative%Type,
            p_Pendauth      In Out Oltb_Multiauth_Ovd_Master.Pending_Auth%Type,
            p_Err_Code      Out Varchar2,
            p_Err_Params    Out Varchar2,
            p_Wrk_Oldovdef    In Out  olpks_oldovdef_Main.Ty_oldovdef)Return Boolean;            
            
Function Fn_Pre_Log_MultiAuth (P_MultiAuth_Det  In Out Oltb_Multiauth_Ovd_Detail%Rowtype,
               p_Err_Code     Out Varchar2,
               p_Err_Params     Out Varchar2)Return Boolean;
               
Function Fn_Post_Log_MultiAuth (P_MultiAuth_Det  In Out Oltb_Multiauth_Ovd_Detail%Rowtype,
               p_Err_Code     Out Varchar2,
               p_Err_Params     Out Varchar2)Return Boolean;
                              
Function Fn_Pre_Log_Role( P_MultiAuth_Det In Out Oltb_Multiauth_Ovd_Detail%Rowtype,
            p_CurLevel      In Varchar2,
            p_Err_Code      Out Varchar2,
            p_Err_Params    Out Varchar2)Return Boolean;
            
Function Fn_Post_Log_Role( P_MultiAuth_Det In Out Oltb_Multiauth_Ovd_Detail%Rowtype,
            p_CurLevel      In Varchar2,
            p_Err_Code      Out Varchar2,
            p_Err_Params    Out Varchar2)Return Boolean;                                       

end olpks_oldovdef_utils_cluster;
/