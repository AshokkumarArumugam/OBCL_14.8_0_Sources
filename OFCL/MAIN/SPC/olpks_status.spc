CREATE OR REPLACE PACKAGE olpks_status
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_status.SPC
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
----------------------------------------------------------------------------------------------------
*/
/*------------------------CHANGE HISTORY-------------------------------------------------------------
02-FEB-2002	FCC3.9  LATAM	The Status movement is done schedule wise,affecting only the components relating to that
					schedule.The status movement moves only the outstanding relating to that component to a
					new accounting head /GL.This status Change happens only if the parameter Schedule Level 
					Status change, which is in the preferences of the Loan Product Definition, is set 
					to 'Y' i.e., Checked.
					Whenever  a change of Status happens (Schedule Level /Contract Level) ,the accruals for the
					current month,current year and previous year is recalculated and passed against the GL's
					maintained for current year and previous year in Chart Of ACCOUNTS of General Ledger.
					This tracking of accruals happens only if the parameter Track PNL Hist. , maintained at 
					the bank parameters,is set  to 'Y' i.e., Checked.

23-MAY-2003 Fcc4.2 OPS related changes.The function Fn_buildup_transfer_entry is made public to be used in reverse accrual
						   during status change


19-Jul-2005		FCC 4.6.2 CITI Contra Changes by Aarthi
			Added a new function Fn_transfer_contra_bal to transfer the contra balance when there is a status change.

06-Aug-2005		FCC 4.6.2 CITI Contra Fix by Aarthi
			Added a parameter p_handoff_action_code in Fn_transfer_contra_bal.

05-May-2010 FLEXCUBE V.CL Release 7.6 ITR2 SFR#9 RT#113 ,Blocking status change if overpayment exist
20-APR-2011 Flexcube V.CL Release 7.9,FS Volume02 Tag03,Non-Performing Loans,Added changes to allow propagation of the status  changes (performing to non-performing and vice-versa) 
									     done at the commitment level to all the underlying outstanding loan contracts
27-JUN-2011 Flexcube V.CL Release 7.9,FS Volume02 Tag03,Non-Performing Loans,changes 	
29-OCT-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol1 Tag04,Cost of Credit-Re-Performing Loans Functionality changes, FAS114 Release on status change to performing 						     
12-DEC-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol1 Tag03,Cost of Credit Reversal Functionality

	**Changed By         : Akhila Samson
    **Date               : 07-FEB-2020
    **Change Description : Changes done for Credit acceleration
    **Search String      : OBCL_14.4_Credit_Acceleration
	**Changed By         : Arunprastah
    **Date               : 07-MAR-2020
    **Change Description : Changes done for De acceleration
    **Search String      : OBCL_14.4_de_Acceleration
    
    **Changed By         : Kavitha Asokan
    **Date               : 25-Mar-2021
    **Change Description : Added code to update worst status of the customer to all the underlying loans by enabling group status change at branch and customer level.
    **Search String      : OBCL_14.5_GROUP_STATUS_CHANGE
		
	**Changed By         : Akhila Samson
    **Date               : 24-Mar-2023
    **Change Description : Added hook for Fn_Change_Contract_Status
    **Search String      : Bug#35216081
---------------------------------------------------------------------------------------------------
*/


g_statprop_loan_in_batch	VARCHAR2(1) := 'N';--20-APR-2011 Flexcube V.CL Release 7.9,FS Volume02 Tag03,Non-Performing Loans changes --This flag will be Y only when the propagate status change from commitment to loan is done during batch.Else it will be N
g_felr_trigd_by_stch	 	VARCHAR2(1):='N';--12-DEC-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol1 Tag03
g_felr_on_comm_in_batch  VARCHAR2(1) := 'N';--26-OCT-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol1 Tag04 changes
g_group_status_change_processing Varchar2(1) :='N'; --OBCL_14.5_GROUP_STATUS_CHANGE

--OBCL_14.4_Credit_Acceleration start
TYPE Rec_MS_Error IS RECORD(
      Err_Code Ertbs_Msgs.Err_Code%TYPE,
      Params   VARCHAR2(256));

TYPE Tbl_MS_Error IS TABLE OF Rec_MS_Error INDEX BY BINARY_INTEGER;
--OBCL_14.4_Credit_Acceleration End

--Bug#35216081 Start
TYPE Contract_Struct IS RECORD(
    Module                   Oltbs_Contract.Module_Code%TYPE,
    Product                  Oltbs_Contract.Product_Code%TYPE,
    Product_Type             Oltbs_Contract.Product_Type%TYPE,
    Latest_Event_Seq_No      Oltbs_Contract.Latest_Event_Seq_No%TYPE,
    Latest_Version_No        Oltbs_Contract.Latest_Version_No%TYPE,
    Contract_Status          Oltbs_Contract.Contract_Status%TYPE,
    Current_Status           Oltbs_Contract.User_Defined_Status%TYPE,
    Customer                 Oltbs_Contract.Counterparty%TYPE,
    Contract_Ccy             Oltbs_Contract.Contract_Ccy%TYPE,
    Book_Date                oltbs_contract_master.Booking_date%TYPE, --Bug#35216081
    Value_Date               oltbs_contract_master.Value_date%TYPE, --Bug#35216081
    Maturity_Date            oltbs_contract_master.Maturity_date%TYPE, --Bug#35216081
    Contract_Status_Control  Oltbs_Contract_Preference.Status_Control%TYPE,
    Current_Status_Seq_No    Oltms_Product_Status_Master.Status_Sequence%TYPE,
    Current_Tran_Code        Oltms_Product_Status_Master.Transaction_Code%TYPE,
    Current_Reverse_Accruals Oltms_Product_Status_Master.Reverse_Accruals%TYPE,
    Current_Stop_Accruals    Oltms_Product_Status_Master.Stop_Accruals%TYPE,
    Current_Auto_Reverse     Oltms_Product_Status_Master.Auto_Reverse%TYPE,
    New_Reverse_Accruals     Oltms_Product_Status_Master.Reverse_Accruals%TYPE, --23-FEB-2002  FCC3.9 LATAM SFR 361
    Current_Memo_Accruals    Oltms_Product_Status_Master.Memo_Accruals%TYPE, --FCC 4.1 Oct-2002 Status A/c for Loans changes
    Past_Schedules           Oltms_Product_Status_Master.Past_Schedules%TYPE, --FCC 4.1 Oct-2002 Status A/c for Loans changes
    Future_Schedules         Oltms_Product_Status_Master.Past_Schedules%TYPE, --FCC 4.1 Oct-2002 Status A/c for Loans changes
    Limit_Track_Reqd         Oltbs_Contract_Master.Limit_Track_Reqd%TYPE,
    Current_Stop_Accrual_Fee Oltms_Product_Status_Master.Stop_Accrual_Fee%TYPE --01-FEB-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol1 Tag04,IUT#119 Changes
    );
--Bug#35216081 end

FUNCTION fn_automatic_status_control
	( 
	p_module		IN	oltbs_contract.module_code%TYPE,
	p_processing_date	IN	date,
	p_product		IN	oltbs_contract.product_code%TYPE,
	p_commit_frequency	IN	oltbs_automatic_process_master.eod_commit_count%TYPE, 
	p_error_code		IN OUT	varchar2,
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_process_for_a_contract
	( 
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	p_processing_date	IN	date,
	p_authorization_status	IN	oltbs_contract.auth_status%TYPE,
	p_handoff_action_code	IN	char,
	p_error_code		IN OUT	varchar2,
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_change_contract_status
	(
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	p_processing_date	IN	date,
	p_destination_status	IN	oltbs_contract.user_defined_status%TYPE,
	p_authorization_status	IN	oltbs_contract.auth_status%TYPE,
	p_handoff_action_code	IN	char,
	p_error_code		IN OUT	varchar2,
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_advice_consolidation
	(
	p_module		IN	oltbs_contract.module_code%TYPE,
	p_product		IN	oltbs_contract.product_code%TYPE,
	p_commit_frequency	IN	oltbs_automatic_process_master.bod_commit_count%TYPE, 
	p_error_code		IN OUT	varchar2,
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;


--02-FEB-2002	FCC3.9  LATAM starts
FUNCTION fn_process_for_a_contract_sch
	( 
	p_contract_ref_no		IN	oltbs_contract.contract_ref_no%TYPE,
	p_processing_date		IN	date,
	p_authorization_status	IN	oltbs_contract.auth_status%TYPE,
	p_handoff_action_code	IN	char,
	p_error_code		IN OUT	varchar2,
	p_error_parameter		IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_OverridesForTheContract
	(
	p_ContractRefNo		IN		oltbs_contract.contract_ref_no%TYPE,
	p_ProcessingDate		IN		date,
	p_ComponentList		IN		varchar2,
	p_DueDateList		IN		varchar2,
	p_ScheduleStatusList	IN		varchar2,
	p_AuthorizationStatus	IN		oltbs_contract.auth_status%TYPE,
	p_HandoffActionCode	IN		char,
	p_ErrorCode			IN OUT	varchar2,
	p_ErrorParameter		IN OUT	varchar2
	)
	RETURN boolean;


FUNCTION fn_change_contract_status_sch
	(
	p_ContractRefNo		IN		oltbs_contract.contract_ref_no%TYPE,
	p_ProcessingDate		IN		date,
	p_ComponentList		IN		varchar2,
	p_DueDateList		IN		varchar2,
	p_ScheduleStatusList	IN		varchar2,
	p_AuthorizationStatus	IN		oltbs_contract.auth_status%TYPE,
	p_HandoffActionCode	IN		char,
	p_ErrorCode			IN OUT	varchar2,
	p_ErrorParameter		IN OUT	varchar2
	)
	RETURN boolean;
--02-FEB-2002	FCC3.9  LATAM ends

--Fcc4.2 OPS related changes starts..

FUNCTION Fn_buildup_transfer_entry
	(
	p_from_status		IN		oltbs_contract.user_defined_status%TYPE,
	p_to_status			IN		oltbs_contract.user_defined_status%TYPE,
	p_transfer_event		IN		oltms_product_event_acct_entry.event_code%TYPE,
	p_transfer_accrole	IN		oltms_product_event_acct_entry.account_role_code%TYPE,
	p_transfer_amount_tag	IN		oltms_product_event_acct_entry.amt_tag%TYPE,
	p_transfer_amount		IN		oltbs_contract_balance.principal_outstanding_bal%TYPE,
	p_transfer_amount_ccy	IN		oltbs_contract.contract_ccy%TYPE,
	p_accrole_xfer		IN OUT	olpkss_acc_entry.tbl_accrole_xfer,
	p_xfer_count		IN OUT	integer,
	p_PNLHistInd		IN		Varchar2,	
	p_error_code		IN OUT	varchar2,
	p_error_parameter		IN OUT	varchar2
	)
RETURN BOOLEAN;

--Fcc4.2 OPS related changes ends..

--FCC 4.6.2 CITI Contra Changes by Aarthi start
FUNCTION fn_transfer_contra_bal
			(p_contract_ref_no   	IN  VARCHAR2,
			 p_authorization_status IN  VARCHAR2,
			 p_handoff_action_code  IN  VARCHAR2,	--FCC 4.6.2 CITI Contra fix
			 p_current_event_seq_no IN  VARCHAR2,
			 p_current_status 	IN  VARCHAR2,
			 p_contra_gl_old 		IN  VARCHAR2,
			 p_destination_status 	IN  VARCHAR2,
			 p_contra_gl_new 		IN  VARCHAR2,
			 p_contra_gl_bal 		IN  NUMBER,
			 p_error_code 		OUT  VARCHAR2,
			 p_error_param 		OUT  VARCHAR2
			 )
RETURN BOOLEAN;
--FCC 4.6.2 CITI Contra Changes by Aarthi end

--05-May-2010 FLEXCUBE V.CL Release 7.6 ITR2 SFR#9 RT#113 ,Blocking status change if overpayment exist start
Function fn_get_amt_for_refund
	(
	p_contract_ref_no	IN  oltbs_contract.contract_ref_no%type,
	p_overpayment		OUT   varchar2	,
	p_error_code		IN OUT varchar2,
	p_error_param		IN OUT varchar2
	) 
RETURN BOOLEAN;
--05-May-2010 FLEXCUBE V.CL Release 7.6 ITR1 SFR#9 RT#113 ,Blocking status change if overpayment exist end

--20-APR-2011 Flexcube V.CL Release 7.9,FS Volume02 Tag03,Non-Performing Loans,changes start
FUNCTION fn_prop_user_defined_crn
					( p_contract_ref_no		IN	oltbs_contract.contract_ref_no%TYPE
					, p_processing_date		IN	DATE
					, p_comm_status			IN	oltbs_contract.user_defined_status%TYPE
					, p_comm_stat_seq		IN	oltms_product_status_master.status_sequence%TYPE
					, p_loan_in_exception		OUT	VARCHAR2--27-JUN-2011 Flexcube V.CL Release 7.9,FS Volume02 Tag03,Non-Performing Loans,changes added
					, p_error_code			IN OUT 	VARCHAR2
					, p_error_param			IN OUT 	VARCHAR2
					)
RETURN BOOLEAN;

FUNCTION fn_prop_user_defined_status
					( p_branch			IN	VARCHAR2
					, p_module			IN	VARCHAR2
					, p_processing_date		IN	DATE
					, p_product			IN	VARCHAR2
					, p_commit_frequency		IN	NUMBER
					, p_error_code			IN OUT 	VARCHAR2
					, p_error_param			IN OUT 	VARCHAR2
					)
RETURN BOOLEAN;
--20-APR-2011 Flexcube V.CL Release 7.9,FS Volume02 Tag03,Non-Performing Loans,changes end
--29-OCT-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol1 Tag04 changes start
 FUNCTION fn_release_fas114_on_statchng(
											p_contract_ref_no	IN		VARCHAR2
											,p_processing_date	IN		DATE
											,p_error_code		IN OUT 	VARCHAR2
											,p_error_param		IN OUT	VARCHAR2
											)
RETURN BOOLEAN;
--29-OCT-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol1 Tag04 changes end

	
--OBCL_14.4_Credit_Acceleration start
FUNCTION fn_credit_acceleration(p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
								p_MS_Tblerror IN OUT Tbl_MS_Error,
                                p_error_code IN OUT VARCHAR2,
                                p_error_parameter IN OUT VARCHAR2) 
RETURN BOOLEAN;

FUNCTION fn_validate_Credit_Acceleration(p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
										 p_MS_Tblerror IN OUT Tbl_MS_Error,
										 p_error_code IN OUT VARCHAR2,
										 p_error_parameter IN OUT VARCHAR2)
RETURN BOOLEAN;


PROCEDURE pr_bulk_status_change_job;
--OBCL_14.4_Credit_Acceleration end
--OBCL_14.4_de_Acceleration Starts
FUNCTION fn_de_acceleration(p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
                            P_Err_Code IN OUT VARCHAR2,
                            P_Err_Param IN OUT VARCHAR2) 
RETURN BOOLEAN;

g_contract_version oltb_contract_master.version_no%type;
g_de_acceleration oltb_contract_master.credit_accelerated%type;
FUNCTION fn_Credit_Acceleration_Restrict(p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
                                         p_error_code IN OUT VARCHAR2,
                                         p_error_parameter IN OUT VARCHAR2)
RETURN BOOLEAN;
--OBCL_14.4_de_Acceleration Ends
--OBCL_14.5_GROUP_STATUS_CHANGE starts
FUNCTION fn_process_cust_group_status( p_Branch           IN Oltb_Contract.Branch%TYPE,
                                       p_Processing_Date  IN DATE,
                                       p_Commit_Frequency IN Oltbs_Commitfreq.Bod_Commit_Count%TYPE,
                                       p_Error_Code       IN OUT VARCHAR2,
                                       p_Error_Param      IN OUT VARCHAR2 )
RETURN BOOLEAN;

FUNCTION Fn_Is_Group_Status(P_branch          In Oltms_core_branch.branch_code%Type,
                            P_customer        In Sytms_sttm_customer.customer_no%Type )
RETURN VARCHAR2;
--OBCL_14.5_GROUP_STATUS_CHANGE ends
END olpks_status;
/
CREATE or replace SYNONYM olpkss_status FOR olpks_status
/