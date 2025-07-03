CREATE OR REPLACE package olpks_stmt AS
/*-----------------------------------------------------------------------------------
**
** File Name	: olpks_stmt.SPC
**
** Module		: LOANS and DEPOSITS
**

	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.

	Modified By         : Ravi
	Modified On         : 02-Feb-2018
	Modified Reason     : Narrative changes
	Search String : 	: #Narrative	
	
  **Changed By         : Chandra Achuta
  **Date               : 18-MAR-2022
  **Change Description : Hook request for FWDVAMI case.
  **Search String      : Bug#33613314

  **Changed By         : Vineeth T M
  **Date               : 07-MAR-2023
  **Change Description : Enabling NARRATIVES for LS
  **Search String      : OBCL_14.6_BUG#35087721 CHANGES 

**  Modified By        : Monika Yadav
**  Modified On        : 13-JUL-2023
**  Modified Reason    : Barclays COE-PS3 - FCUBS107- Narration Changes
**  Search String      : Barclays COE-PS3 - FCUBS107- Narration Changes 

  **Changed By         : Vineeth T M
  **Date               : 03-AUG-2023
  **Change Description : Enabling NARRATIVES for SLT
  **Search String      : OBCL_14.7_BUG#35671776 CHANGES 
------------------------------------------------------------------------------------
*/

    --Bug#33613314  Changes Starts
    PROCEDURE Pr_Set_Skip_Kernel;
    PROCEDURE Pr_Set_Activate_Kernel;
    PROCEDURE Pr_Set_Skip_Cluster;
    PROCEDURE Pr_Set_Activate_Cluster;
    FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
    --Bug#33613314  Changes Ends
	
Type module_proc_curtype IS Ref Cursor
	Return oltbs_dly_msg_out%ROWTYPE;

Function fn_handoff_adhocldSt(
					pBranch		In	oltms_branch.branch_code%TYPE,
					pDcn			In	Varchar2,
					pContractRefNo    In    Varchar2,
					pFromDate		In	Date,
					pToDate     	In    Date,
					pStmtType		In	Varchar2
				     )
Return boolean;

Function fn_GenDetailedStmt( 
					pDlyMsgOutRec In oltbs_dly_msg_out%rowtype,
					pContractStatus  IN oltbs_contract.contract_status%type
				   )
Return Boolean;

-- Function called during EOD to generate ld statements
Function fn_autoldSt(
		     	  	pBranch    In  oltms_branch.branch_code%TYPE	
		     	  )
Return boolean;
--#Narrative changes
  FUNCTION fn_advgenpopulate(p_contract_ref_no IN OLTB_CONTRACT_MASTER.CONTRACT_REF_NO%TYPE,
                             p_version_no      IN OLTB_CONTRACT_MASTER.VERSION_NO%TYPE)
    RETURN BOOLEAN;
    /*27939014_Changes_Starts*/
  FUNCTION fn_get_txn_details(prefno           IN Oltbs_Daily_Log_Ac.trn_ref_no%TYPE,
                            pacno            IN Oltbs_Daily_Log_Ac.ac_no%TYPE,
                            pbrn             IN Oltbs_Daily_Log_Ac.ac_branch%TYPE,
                            pesn             IN NUMBER,
                            pmodule          IN VARCHAR2,
                            patag            IN olvws_all_ac_entries.amount_tag%TYPE,
                            pevent           IN VARCHAR2,
                            pContInsertFlag  IN Boolean, --flag to check to insert into contract table or not
                            p_ac_entry_sr_no IN olvws_all_ac_entries.ac_entry_sr_no%TYPE DEFAULT NULL
							--Barclays COE-PS3 - FCUBS107- Narration Changes STARTS
							,pvaldt			 IN olvws_all_ac_entries.VALUE_DT%TYPE DEFAULT NULL,
							plcyamt			 IN olvws_all_ac_entries.lcy_amount%TYPE DEFAULT NULL
						    --Barclays COE-PS3 - FCUBS107- Narration Changes ENDS	
							)
  RETURN varchar2;
  /*27939014_Changes_Ends*/   
    TYPE ty_coll IS TABLE OF VARCHAR2(200) INDEX BY PLS_INTEGER; --OBCL_14.6_BUG#35087721 CHANGES

 --OBCL_14.7_BUG#35671776 CHANGES start
  TYPE ty_tl_info IS RECORD (
       user_ref_no          tltbs_upload_master.user_ref_no%type,
       actual_settl_date    tltbs_settlement_master.actual_settl_date%type,
       trade_amount         tltbs_upload_master.trade_amount%type,
       currency             tltbs_upload_master.currency%type,
       counterparty         tltbs_upload_master.counterparty%type,
       cusip_no             tltbs_upload_master.cusip_no%type
       );
  --OBCL_14.7_BUG#35671776 CHANGES end

END olpks_stmt;
/
create or replace synonym olpkss_stmt for olpks_stmt
/