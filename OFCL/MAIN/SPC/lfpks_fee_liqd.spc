CREATE OR REPLACE PACKAGE lfpks_fee_liqd
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : lfpks_fee_liqd.SPC
**
** Module       : CF
This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
/* Change History - Start
FCC 6.2.2 04-Jan-2005 Rajiv Kumar Phase2 -- Package created to do Auto-Liquidation of fee
FCC 6.2.2 03-Mar-2005 Rajiv Kumar Phase2 ITR1 SFR# 62 -- Package reorganized.
FCC 4.6.2 18-JUL-2005 CITI LS FEE CHANGES For Participant Included in the Body -Vijeth										
06-jun-2007 perftuningchanges05JUNE07 Performance tuning changes
8-oct-2007  FCC V.CL Release 7.3 CITIUS-LS Till#625,messaging related changes,
12-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#4,Retro Changes CITIUS-LS-801,performance tuning changes
06-NOV-2008 CITIUS-LS#SRT1451 CITIUS#499,STP Consolidation,By Swapnasish,The requirement is that users should be able to input future valued Drawdown payments and on 
		                         payment value date during the batch this payment will be processed.
12-AUG-2009 FLEXCUBE V.CL Release 7.5 LOT3 FS Tag 6 New function fn_get_fee_due_for_liq is added to get amount due for fee		                         
01-DEC-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol#1 Tag#10 Changes - Fee Processing Changes
24-JAN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol#1 Tag#10 IUT#93 Changes - System firing FLIQ online for all the schedules of forward processing browser

  **Changed By         : Divya J
  **Date               : 17-Oct-2022
  **Change Description : LBDPYMNT: FUTURE DATED LIQUIDATION IS NOT INITIATED
  **Search String      : Bug#34623132
  
  Changed By         : Sowmya Bitra
  Date               : 23-May-2023
  Change Description : Adding EAC check for participant accounts in LS
  Search String      : Bug#35392087
  
Change History - End*/


-- FCC 6.2.2 ITR1 SFR# 62 - Start
Type RNDP_RNDL_rec Is Record (
					module		oltbs_contract.module_code%Type,
					contract_ref_no	oltbs_contract.contract_ref_no%Type,
					component		lftbs_contract_fee.component%Type,
					event_seq_no	oltbs_contract.latest_event_seq_no%Type,
					component_ccy	lftbs_contract_fee.component_ccy%Type,
					amount		oltbs_amount_due_cs.amount_due%Type
					);
Type RNDP_RNDL_tbl Is Table Of RNDP_RNDL_rec Index By Binary_Integer;

pkg_rndp_rndl_tbl	 RNDP_RNDL_tbl;
-- FCC 6.2.2 ITR1 SFR# 62 - End
--01-DEC-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol#1 Tag#10 Changes starts
FUNCTION Fn_Process_Fliq_On_Unhold ( p_contract_ref_no   IN oltbs_contract.contract_ref_no%TYPE  
				     ,p_sch_date	 IN DATE --24-JAN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol#1 Tag#10 IUT#93 Changes
				     ,p_Error_Code       IN OUT VARCHAR2
				     ,p_Error_Parameter  IN OUT VARCHAR2)
RETURN BOOLEAN;
--01-DEC-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol#1 Tag#10 Changes ends

Function fn_fee_liquidate
	(
	p_module			IN		oltbs_contract.module_code%Type,
	p_branch			IN		oltms_branch.branch_code%Type,
	p_product			IN		oltbs_contract.product_code%Type,
	p_processing_date	IN		Date,
	p_commit_frequency	IN		oltbs_automatic_process_master.bod_commit_count%Type,
	p_error_code		IN OUT	Varchar2,
	p_error_parameter	IN OUT	Varchar2
	)
	Return Boolean;

FUNCTION fn_process_for_product
	(
	p_module			IN		oltbs_contract.module_code%Type,
	p_branch			IN		oltms_branch.branch_code%Type,
	p_product			IN		oltbs_contract.product_code%Type,
	p_Contract_Ref_No   IN Oltbs_Contract.Contract_Ref_no%TYPE, --Bug#35392087 Changes
	p_processing_date	IN		Date,
	p_commit_frequency	IN		oltbs_automatic_process_master.eod_commit_count%Type,
	p_error_code		IN OUT	Varchar2,
	p_error_parameter	IN OUT	Varchar2
	)
	Return Boolean;

FUNCTION fn_process_for_contract
	(
	p_cstb_contract_rec		IN		oltbs_contract%Rowtype,
	p_processing_date		IN		Date,
	p_handoff_action_code		IN		Varchar2,
	p_acc_lookup			IN		olpkss_accounting.tbl_lookup,
	p_pass_entry			IN		Boolean,
	p_ins_log				OUT     Boolean,
	p_error_code			IN OUT	Varchar2,
	p_error_parameter		IN OUT	Varchar2,
	p_sch_date			IN	DATE DEFAULT NULL --24-JAN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol#1 Tag#10 IUT#93 Changes
	)
	Return Boolean;

FUNCTION fn_fee_manual_liquidation
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%Type,
	p_borrower_esn		IN		oltbs_contract.latest_event_seq_no%Type,
	p_error_code		IN OUT	Varchar2,
	p_error_parameter		IN OUT	Varchar2
	)
	Return Boolean;

FUNCTION fn_participant_fee_manual_liqd
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%Type,
	p_borrower_esn		IN		oltbs_contract.latest_event_seq_no%Type,
	p_error_code		IN OUT	Varchar2,
	p_error_parameter		IN OUT	Varchar2
	)
	Return Boolean;

FUNCTION fn_fee_liqd_for_a_participant
	(
	p_participant_crn		IN		oltbs_contract.contract_ref_no%Type,
	p_borrower_esn		IN		oltbs_contract.latest_event_seq_no%Type,
	p_error_code		IN OUT	Varchar2,
	p_error_parameter		IN OUT	Varchar2
	)
	Return Boolean;

FUNCTION fn_fire_fliq
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%Type,
	p_coll_mode			IN 		lftms_product_fee.fee_collection_mode%type, --27/02/06 FCC V CL Release 7.1 Added parameter to identify the collection_mode
	p_ins_log			OUT		Boolean,
	p_error_code			IN OUT	Varchar2,
	p_error_parameter		IN OUT	Varchar2
	)
	Return Boolean;

Function fn_fliq_for_participants
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%Type,
	p_error_code		IN OUT	Varchar2,
	p_error_parameter		IN OUT	Varchar2
	)
	Return Boolean;

Function fn_fliq_for_a_participant
	(
	p_participant_crn		IN		oltbs_contract.contract_ref_no%Type,
	p_error_code		IN OUT	Varchar2,
	p_error_parameter		IN OUT	Varchar2
	)
	Return Boolean;

FUNCTION fn_process_for_backdated_sch
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%Type,
	p_error_code		IN OUT	Varchar2,
	p_error_parameter		IN OUT	Varchar2
	)
	Return Boolean;
--FCC 4.6.2 CITI LS FEE Changes for PArticipant vijeth addition starts
FUNCTION Fn_Fire_Part_Fliq(p_Contract_Ref_No IN oltbs_contract.Contract_Ref_No%TYPE
                       ,p_Ins_Log         OUT BOOLEAN
                       ,p_Error_Code      IN OUT VARCHAR2
                       ,p_Error_Parameter IN OUT VARCHAR2) 
RETURN BOOLEAN;
FUNCTION Fn_part_Fee_Manual_Liquidation(p_Contract_Ref_No IN oltbs_contract.Contract_Ref_No%TYPE
  			      ,p_part_Esn    IN oltbs_contract.Latest_Event_Seq_No%TYPE
  			      ,p_Error_Code      IN OUT VARCHAR2
  			      ,p_Error_Parameter IN OUT VARCHAR2)
RETURN BOOLEAN ;
--FCC 4.6.2 CITI LS FEE Changes for PArticipant vijeth addition Ends
--FCC V.CL Release 7.3 CITIUS-LS Till#625,messaging related changes,
FUNCTION fn_fee_fft_check 
	(
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%Type,
	p_sch_date		IN	oltbs_contract_master.value_date%Type,
	p_esn			IN	oltbs_contract.LATEST_EVENT_SEQ_NO%Type,
	p_error_code		IN OUT	Varchar2,
	p_error_param		IN OUT	Varchar2
	)
RETURN  BOOLEAN;
--FCC V.CL Release 7.3 CITIUS-LS Till#625,messaging related changes,
--perftuningchanges05JUNE07
FUNCTION FN_FUTURE_DATED_FLIQ
	(
	p_seq_no		IN	NUMBER,	--12-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#4,Retro Changes CITIUS-LS-801
	p_process_date		IN DATE DEFAULT GLOBAL.APPLICATION_DATE, --application date
	P_ERR_CODE		IN OUT VARCHAR2,
	P_ERR_PARAMS		IN OUT VARCHAR2
	)
RETURN BOOLEAN;

--Bug#34623132 starts
    
FUNCTION Fn_Future_Dated_Fliq(p_Seq_No          IN NUMBER,
                              p_Process_Date    IN DATE DEFAULT Global.Application_Date,
                              p_contract_ref_no IN varchar2,
                              p_Elcm_Msgid      OUT Sypks_Utils.g_Elcm_Msgid%TYPE,
                              p_Eca_Ref_No      OUT VARCHAR2,
                              p_rfr_Msgid       OUT Sypks_Utils.g_rfr_Msgid%TYPE,
                              p_err_code        IN OUT Varchar2,
                              p_err_param       IN OUT Varchar2)
  RETURN VARCHAR2;

FUNCTION Fn_Future_Dated_Fliq_Auth(p_Contract_Ref_No IN Oltbs_Contract_Payment_Due.Contract_Ref_No%TYPE,
                                   p_Event_Seq_No    IN Oltbs_Contract_Payment_Due.Event_Seq_No%TYPE,
                                   p_Branch          IN Oltbs_Contract.Branch%TYPE,
                                   p_User_Id         IN VARCHAR2,
                                   p_Eca_Ref         IN VARCHAR2,
                                   Perrorcode        IN OUT VARCHAR2,
                                   Perrorparam       IN OUT VARCHAR2)
  RETURN VARCHAR2;
--Bug#34623132 Ends

FUNCTION FN_REPOP_FLIQ
  (
  p_contract_ref_no IN oltbs_contract.contract_ref_no%type,
  p_event_seq_no    IN oltbs_contract.latest_event_seq_no%type,
  p_value_date    IN date,
  p_limitdate     IN date, --limitdate
  p_payment_due_esn IN lbtbs_contract_payment_due.event_seq_no%type,
  p_err_code      IN OUT varchar2,
  p_err_params    IN OUT varchar2
  )
RETURN BOOLEAN;

FUNCTION fn_part_fd_feeliq
	(
	p_contract_ref_no	IN oltbs_contract.contract_ref_no%type,
	p_event_seq_no		IN oltbs_contract.latest_event_seq_no%type,
	p_value_date		IN date,
	p_module			IN varchar2,
	p_event				IN oltbs_contract_event_log.event_code%type,
	p_cont_stat			IN CHAR,	
	p_err_code			IN OUT varchar2,
	p_err_params		IN OUT varchar2
	)
RETURN BOOLEAN;
--perftuningchanges05JUNE07
--06-NOV-2008 CITIUS-LS#SRT1451 CITIUS#499 Start By Swapnasish
--perftuningchanges07JUNE07
--CITIUS-LS#SRT1451 Starts
--this function is not reqd, in site version v r looping thru all future fliq contracts and calling this function, where as in blore version, there is no function instead they have what the function has.
/*
FUNCTION fn_fd_feeliq_process
	(
	p_contract_ref_no  IN oltbs_contract.contract_ref_no%type,
	P_payment_due_esn  IN varchar2,	
	p_err_code in OUT varchar2,
	p_err_params in OUT varchar2

	)
RETURN BOOLEAN;
*/
--CITIUS-LS#SRT1451 Ends
--perftuningchanges07JUNE07
--06-NOV-2008 CITIUS-LS#SRT1451 CITIUS#499 End By Swapnasish
--FLEXCUBE V.CL Release 7.5 LOT3 FS Tag 6 Start
FUNCTION fn_get_fee_due_for_liq
(
 p_contract_ref_no 	IN	  	oltbs_contract.contract_ref_no%TYPE,
 p_component        IN      oltb_amount_due.component%TYPE,
 p_comp_ccy         IN      lftbs_contract_fee.component_ccy%TYPE,
 p_basis_amt_tag    IN      lftms_product_fee.basis_amount_tag%type,
 p_value_date      	IN  		DATE,
 p_limit_date      	IN  		DATE,
 p_amt_due         	OUT	 	VARCHAR2,
 p_error_code      	IN OUT 	VARCHAR2,
 p_error_parameter  IN OUT 	VARCHAR2
 )
RETURN BOOLEAN; 
--FLEXCUBE V.CL Release 7.5 LOT3 FS Tag 6 End

--Bug#33689116 changes start
  TYPE ty_components_list IS TABLE OF Lftbs_Contract_Fee%ROWTYPE;
FUNCTION Fn_Process_Eca_For_Contract(p_Cstb_Contract_Rec IN Oltbs_Contract%ROWTYPE,
                                     p_Processing_Date   IN DATE,
                                     p_Error_Code        IN OUT VARCHAR2,
                                     p_Error_Parameter   IN OUT VARCHAR2,
                                     p_Sch_Date          IN DATE DEFAULT NULL)
  RETURN BOOLEAN;
  
   FUNCTION Fn_Fee_Batch_Liquidate(p_Module           IN Oltbs_Contract.Module_Code%TYPE,
                            p_User           IN Smtbs_user.user_id%TYPE,
							              p_Branch           IN Oltms_Branch.Branch_Code%TYPE,
                            p_Product          IN Oltbs_Contract.Product_Code%TYPE,
							--Bug#35392087 Changes Start
                            p_Contract_Ref_No  IN Oltbs_Contract.Contract_Ref_no%TYPE, 
                            p_Elcm_Msgid       OUT Sypks_Utils.g_Elcm_Msgid%TYPE,
                            --Bug#35392087 Changes End
                            p_Processing_Date  IN DATE,
                            p_Commit_Frequency IN Oltbs_Automatic_Process_Master.Bod_Commit_Count%TYPE,
                            p_Error_Code       IN OUT VARCHAR2,
                            p_Error_Parameter  IN OUT VARCHAR2)
    RETURN VARCHAR2;
  
  FUNCTION Fn_Create_Eca_Request(p_Module           IN Oltbs_Contract.Module_Code%TYPE,
                                 p_User           IN SMTBS_USER.User_id%TYPE,
                                 p_Branch           IN Oltms_Branch.Branch_Code%TYPE,
                                 p_Product          IN Oltbs_Contract.Product_Code%TYPE,
                                 p_Processing_Date  IN DATE,
                                 p_Commit_Frequency IN Oltbs_Automatic_Process_Master.Bod_Commit_Count%TYPE,
                                 p_Error_Code       IN OUT VARCHAR2,
                                 p_Error_Parameter  IN OUT VARCHAR2)
  RETURN VARCHAR2;                               
--Bug#33689116 changes End

END lfpks_fee_liqd;
/
Create or replace Synonym lfpkss_fee_liqd for lfpks_fee_liqd
/