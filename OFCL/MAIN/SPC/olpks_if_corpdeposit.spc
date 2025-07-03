CREATE OR REPLACE PACKAGE Olpks_If_CorpDeposit AS
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_deposit.SPC
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

  */
  /*
  ----------------------------------------------------------------------------------------------------
  **Changed By         : Meha
  **Changes On         : 9-Nov-2018
  **Change Description : Added Code For CD Payment 
  **Search  String     : Bug#28903802
  
  **Changed By         : Prakash Ravi
  **Changes On         : 15-Mar-2019
  **Change Description : Added code to handle CD integration only during disbursments.
  **Search  String     : 14.3_OBCL_CD_DSBR
  
     **Changed By         : Prakash Ravi
     **Changed On         : 19-Apr-2019
     **Change Description : Amount calculation for CD is changed.
     **Search String      : BUG#29668862 
  -------------------------------------------------------------------------------------------------------
  */
--Bug#28903802 changes Starts
Type Dep_Rec Is Table Of Oltb_CD_Breakup_Dtls%Rowtype Index By Binary_Integer;
--Bug#28903802 changes Ends
g_OSAMT_CD_Vami NUMBER := 0; --BUG#29668862 Change
--OBCL_14.4_CPTY Changes
g_depaction Varchar2(10);
Type Ty_Dep Is Table Of Oltb_If_Cdcontract_Master%Rowtype Index By Binary_Integer;
Type Ty_Dsbr Is Table Of Oltb_Contract_Dsbr_Sch%Rowtype Index By Binary_Integer;
--OBCL_14.4_CPTY Changes
Procedure Dbg(p_Msg Varchar2);

Function Fn_Create_Deposit
	(
	p_ref 	In Varchar2,
	p_csrec In Oltbs_Contract%Rowtype,
	p_cmrec In Oltbs_Contract_master%Rowtype,
	p_afrec In oltms_Auto_Fund_Mapping%Rowtype,
	p_amt   In Number, --14.3_OBCL_CD_DSBR change
	p_errcode	In Out Varchar2,
	p_errparam	In Out Varchar2
	)Return Boolean;
Function Fn_Reverse_Deposit
	(
	p_ref 	In Varchar2,
	p_mod   In Varchar2,
	p_brn	In Varchar2,
	p_errcode	In Out Varchar2,
	p_errparam	In Out Varchar2
	)Return Boolean;

Function Fn_Create_Depred
	(
	p_wrk_oldpmnt IN olpks_oldpmnt_main.ty_oldpmnt,
	P_Amt In Number, --14.3_OBCL_CD_DSBR change
	p_Action In Varchar2, --14.3_OBCL_CD_DSBR change
	P_parent_seq in out varchar2, --14.3_OBCL_CD_DSBR change
	p_errcode	In Out Varchar2,
	p_errparam	In Out Varchar2
	)Return Boolean;

Function Fn_Reverse_Depred
	(
	p_ref 	In Varchar2,
	p_mod   In Varchar2,
	p_brn	In Varchar2,
	p_errcode	In Out Varchar2,
	p_errparam	In Out Varchar2
	)Return Boolean;
  --FCUBS14.2_Trade_OBCL_Integration_Purge_changes start
 Function Fn_Purge_360_trade_data
	(
	p_action IN varchar2,
	p_errcode	In Out Varchar2,
	p_errparam	In Out Varchar2
	)Return Boolean;
  --FCUBS14.2_Trade_OBCL_Integration_Purge_changes end

  --14.3_OBCL_CD_DSBR changes starts
	Function Fn_Wrap_Create_Deposit(p_Ref 	In Varchar2,
									p_Amt   In Number,
									P_MatDate In Date,
									p_Action In Varchar2,
									p_Errcode	In Out Varchar2,
									p_Errparam	In Out Varchar2) 
    Return Boolean;
  
	Function Fn_Vami_Deposit
	(
	p_Ref   In Varchar2, 
	p_Amt   In Number,
	p_Matdate In Date,
	p_Action In Varchar2,  
	p_Errcode  In Out Varchar2,
	p_Errparam  In Out Varchar2
	)Return Boolean;

  --14.3_OBCL_CD_DSBR changes ends
  
END Olpks_If_CorpDeposit;
/
CREATE OR REPLACE SYNONYM OLPKSS_IF_CORPDEPOSIT FOR OLPKS_IF_CORPDEPOSIT
/