CREATE OR REPLACE PACKAGE olpks_oldovdef_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_oldovdef_utils.spc
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
  
  -------------------------------------------------------------------------------------------------------
  **Changed By         : Sudharshini Balaji
    **Date               : 08-Jan-2021
    **Change Description : Added code for base bug Bug#32240400
    **Search String      : Bug#32476681

  */
/*
Procedure Pr_Log_Error(	p_Function_Id In Varchar2,
						p_Source      Varchar2,
						p_Err_Code    Varchar2,
						p_Err_Params  Varchar2);
*/						 
--Bug#32476681   changes start
  PROCEDURE Pr_Skip_Handler(P_Stage IN VARCHAR2);
  PROCEDURE Pr_Set_Skip_Kernel;
  PROCEDURE Pr_Set_Activate_Kernel;
  PROCEDURE Pr_Set_Skip_Cluster;
  PROCEDURE Pr_Set_Activate_Cluster;
  FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;



 --Bug#32476681   changes end
Function Fn_Query(	p_Source In  Varchar2,                             
					p_Function_Id In  Varchar2,
					p_Action_Code In  Varchar2,    
					p_Oldovdef In olpks_oldovdef_Main.Ty_oldovdef,
					p_Wrk_Oldovdef In Out  olpks_oldovdef_Main.Ty_oldovdef,
					p_Err_Code In Out Varchar2,
					p_Err_Params In Out Varchar2)Return Boolean ;
				  
Function Fn_MultiAuth_Ovd(	p_Source In  Varchar2,                             
							p_Function_Id In  Varchar2,
							p_Action_Code In  Varchar2,    
							p_Oldovdef In olpks_oldovdef_Main.Ty_oldovdef,
							p_Wrk_Oldovdef In Out  olpks_oldovdef_Main.Ty_oldovdef,
							p_Err_Code In Out Varchar2,
							p_Err_Params In Out Varchar2)Return Boolean ;	
Function Fn_Process_Ovd(p_Contract_Ref_No In Oltb_Contract.Contract_Ref_No%Type,
						p_Module 		  In Oltb_Contract.Module_Code%Type,
						p_Event_Seq_No 	  In Oltb_Contract.Latest_Event_Seq_No%Type,
						p_ErrCode 		  In Oltb_Multiauth_Ovd_Master.Err_Code%Type,
						p_User_Id 		  In Olvw_Contract_Ovd.Maker_id%Type,
						p_Txn_Ccy         In Oltb_Multiauth_Ovd_Master.Txn_Ccy%Type,
						p_Txn_Amount      In Oltb_Multiauth_Ovd_Master.Txn_Amount%Type,
						p_Branch 		  In Olvw_Contract_Ovd.Branch%Type,
						p_Cumulative      Out Oltb_Multiauth_Ovd_Master.Cumulative%Type,
						p_Pendauth 		  In Out Oltb_Multiauth_Ovd_Master.Pending_Auth%Type,
						p_Err_Code 		  Out Varchar2,
						p_Err_Params 	  Out Varchar2,
						p_Wrk_Oldovdef 	  In Out  olpks_oldovdef_Main.Ty_oldovdef)Return Boolean;							

END olpks_oldovdef_utils;
/