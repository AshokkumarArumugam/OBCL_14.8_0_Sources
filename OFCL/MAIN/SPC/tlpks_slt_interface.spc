CREATE OR REPLACE PACKAGE tlpks_slt_interface
IS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : tlpks_slt_interface.SQL
**
** Module       : SECONDARY LOAN TRADING
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
*/
/*
---------------------------------CHANGE HISTORY-----------------------------------------------

21-NOV-2008 FLEXCUBE V.CL 7.4 Release, this package is created newly for and is used for slt-ls handoff, Maneeha.
28-DEC-2008 FLEXCUBE V.CL RELEASE 7.4 MTR1 SFR#135, added out parameters as the population of upload tables is moved out
26-AUG-2009 CITIUS-LS#6235, Clearpar and SLT incremental changes retro - by Arthy and Maneeha
								also changed the copyright clause.
18-MAY-2010 FLEXCUBE V.CL Release 7.7  Trade processing enhancement changes
25-Jun-2010 FLEXCUBE V.CL Release 7.7 FS Tag 3.3.5 Nonprorata Trades Changes

03-SEP-2010 FLEXCUBE V.CL Release 7.7 ITR1 SFR#47 changes,System is not creating a new commitment for the silent participant as part of the CLP Participation.
28-FEB-2011 Flexcube V.CL Release 7.9, CITIUS Retro,7686 Added seq no to pr_upload_pram_npvami
03-DEC-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol#1 Tag#9, Secondary Loans Trading - Drawdown Straight Through Processing - changes
06-JUN-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag04,SLT–Buy Back for Participation Tranche,changes added a new function fn_mark_drawdown_as_liqd
05-OCT-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag06 changes, added a new functions fn_consol_upload_tbl and a procedure pr_upload_consol_pram_npvami											

	Changed By         : Jayaram N
	Date               : 23-Jul-2021
	Change Description : HOOK REQUIRED FOR AMORTIZATION OF PREMIUM/DISCOUNT AMOUNT DURING PURCHASE OF LOAN 
	Search String      : Bug#33118218
	
	Changed By         : Jayaram N
	Date               : 17-Sep-2021
	Change Description : DIFFERENCE AMOUNT PICK UP ERROR IN TLDSETTL SCREEN(FUNDING MEMO)-LOR ADJUSTMENT SECTION
	Search String      : Bug#33143838
	
	Changed By         : Arunprasath
	Date               : 03-Dec-2021
	Change Description : Added code for Auto DD creation for RFR contract
	Search String      : OBCL_14.5_SLT_Auto_DD_SOFR
	
  Changed By         : Sowmya  Bitra
  Changed On         : 24-JUN-2022
  Change Description : Adding global variable for first buy
  Search String      : Bug#34307857
  
  Changed By         : Sowmya  Bitra
  Changed On         : 04-JULY-2022
  Change Description : Adding global variable for slt portfolio
  Search String      : Bug#34307857_1 changes
  
  Changed By         : Jayaram N
  Changed On         : 23-Jan-2023
  Change Description : Adding global variable for cascade participation Yes or No
  Search String      : Bug#34935804
------------------------------END CHANGE HISTORY----------------------------------------------
*/

gslt_Pram_npvami Varchar2(1):='N'; --25-Jun-2010 FLEXCUBE V.CL Release 7.7 FS Tag 3.3.5 Nonprorata Trades Changes
g_lt_event	VARCHAR2(1) := 'N'; --03-SEP-2010 FLEXCUBE V.CL Release 7.7 ITR1 SFR#47 changes
g_slt_adj_rate   TLTBS_UPLOAD_MASTER.Adjustment_Rate%type; --ankk
g_lor_part_sell_amt_adj VARCHAR2(1) := 'N';	--Bug#33143838:Added
g_lor_part_sell_amt_adj_dd oltbs_contract.contract_ref_no%type;	--Bug#33143838:Added
g_source_code cotms_source_pref.source_code%type;--OBCL_14.5_SLT_Auto_DD_SOFR
g_first_buy_case VARCHAR2(1) := 'N';  --Bug#34307857:Added
g_slt_portfolio TLTBS_LS_INTERFACE_BROWSER.POSITION_IDENTIFIER%TYPE;  --Bug#34307857_1:Added

g_cascade_participation OLTBS_CONTRACT_MASTER.CASCADE_PARTICIPATION%TYPE ; --Bug#34935804:Added

PROCEDURE pr_upload_pram_npvami
	(
		p_branch		IN	CHAR
		,p_trade_ref_no	IN	tltbs_contract_master.contract_ref_no%TYPE DEFAULT 'ALL'--CITIUS-LS#6751
		,p_seq_no		IN	NUMBER DEFAULT 0 --28-FEB-2011 Flexcube V.CL Release 7.9, CITIUS Retro,7686
	);

  --Bug#33118218:Changes Starts
  PROCEDURE Pr_Skip_Handler(P_Stage IN VARCHAR2);
  PROCEDURE Pr_Set_Skip_Kernel;
  PROCEDURE Pr_Set_Activate_Kernel;
  PROCEDURE Pr_Set_Skip_Cluster;
  PROCEDURE Pr_Set_Activate_Cluster;
  FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
  --Bug#33118218:Changes Ends                    
  
FUNCTION fn_insert_browser
	(
	--p_rec_contract_master		IN	tltbs_contract_master%rowtype,--26-AUG-2009 CITIUS-LS#6235, Clearpar and SLT incremental changes retro commented
	--26-AUG-2009 CITIUS-LS#6235, Clearpar and SLT incremental changes retro - changes starts here
		p_crn					IN		oltbs_contract.contract_ref_no%type,
		p_value_date			IN		tltbs_contract_master.actual_settl_date%type,
		p_source_code			IN		cotms_source_pref.source_code%type,
		p_cusip					IN		tltbs_contract_master.cusip_no%type,
		p_expense_code			IN		tltbs_contract_master.expense_code%type,
		p_posid					IN		tltbs_contract_master.position_identifier%type,
		--26-AUG-2009 CITIUS-LS#6235, Clearpar and SLT incremental changes retro - changes ends here
		p_lt_esn				IN		oltbs_contract_event_log.Event_Seq_No%TYPE,
		p_lt_event_code			IN		oltbs_contract_event_log.Event_Code%TYPE,
		p_Error_Code 			IN OUT	VARCHAR2,
		p_Error_Params 			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_upload_validations
	(
	p_rec_contract_master		IN		tltbs_contract_master%rowtype,
	p_lt_esn					IN		oltbs_contract_event_log.Event_Seq_No%TYPE,
	p_lt_event_code				IN		oltbs_contract_event_log.Event_Code%TYPE,
	p_Error_Code 				IN OUT	VARCHAR2,
	p_Error_Params 				IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_resolve_ls_event
	(
	p_rec_contract_master	IN		tltbs_contract_master%rowtype,
	p_lt_esn				IN		oltbs_contract_event_log.Event_Seq_No%TYPE,
	p_lt_event_code			IN		oltbs_contract_event_log.Event_Code%TYPE,
	p_agency_ref_no			IN		oltbs_contract.Contract_Ref_No%TYPE,
	p_action_code			OUT		VARCHAR2,--FLEXCUBE V.CL RELEASE 7.4 MTR1 SFR#135, added out parameters as the population of upload tables is moved out starts
	p_transferor			OUT		lbtbs_part_proc_stat.counterparty%type,
	p_transferee			OUT		lbtbs_part_proc_stat.counterparty%type,--FLEXCUBE V.CL RELEASE 7.4 MTR1 SFR#135, added out parameters as the population of upload tables is moved out ends
	p_ls_esn				OUT		oltbs_contract_event_log.Event_Seq_No%TYPE,
	p_ls_event_code			OUT		oltbs_contract_event_log.Event_Code%TYPE,
	p_error_code			IN OUT	VARCHAR2,
	p_error_params			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_populate_upload_tables
	(
	p_rec_contract_master	IN		tltbs_contract_master%rowtype,
	p_lt_event_seq_no		IN		oltbs_contract_event_log.event_seq_no%type,
	p_lt_event_code			IN		oltbs_contract_event_log.event_code%type,
	p_action_code			IN		VARCHAR2,
	p_agency_ref_no			IN		oltbs_contract.Contract_Ref_No%TYPE,
	p_transferor			IN		lbtbs_part_proc_stat.counterparty%type,
	p_transferee			IN		lbtbs_part_proc_stat.counterparty%type,
	p_error_code			IN OUT	VARCHAR2,
	p_error_params			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION Fn_update_browser
	(
	p_contract_ref_no	IN		oltbs_contract.Contract_Ref_No%TYPE,
	p_lt_esn			IN		oltbs_contract_event_log.Event_Seq_No%TYPE,
	p_lt_event_code		IN		oltbs_contract_event_log.Event_Code%TYPE,
	p_agency_ref_no		IN		oltbs_contract.Contract_Ref_No%TYPE,
	p_ls_esn			IN		oltbs_contract_event_log.Event_Seq_No%TYPE,
	p_ls_event_code		IN		oltbs_contract_event_log.Event_code%TYPE,
	p_proc_stat			IN		tltbs_ls_interface_browser.Processing_Status%TYPE,
	p_action_code		IN	tltbs_ls_interface_browser.action_code%TYPE, --25-Jun-2010 FLEXCUBE V.CL Release 7.7 FS Tag 3.3.5 Nonprorata Trades Changes
	p_error_code		IN 	OUT	VARCHAR2,
	p_error_params		IN 	OUT	VARCHAR2
	)
RETURN BOOLEAN;

PROCEDURE pr_exception_log
	(
	p_ref_no		IN	tltbs_contract_master.contract_ref_no%type,
	p_event_seq_no	IN	NUMBER,
	p_error_code	IN	VARCHAR2,
	p_error_params	IN	VARCHAR2
	);
--FLEXCUBE V.CL Release 7.7 Trade processing enhancement changes starts
FUNCTION fn_insert_intermediate_browser
	(
	p_rec_contract_master		IN	tltbs_contract_master%rowtype,
	p_lt_esn			IN	NUMBER,
	p_lt_event_code		IN	VARCHAR2,
	p_event_date		IN	DATE,
	-----p_agency_ref_no			IN	tltbs_ls_interface_browser.agency_ref_no%type,
	p_source_code			IN	VARCHAR2,
	p_error_code			IN OUT	VARCHAR2,
	p_error_params			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
FUNCTION FN_POP_CONSOL_INT_BROWSER
	(P_TICKET_ID	IN	VARCHAR2,
	 P_ERR_CODE	IN OUT	VARCHAR2,
	 P_ERR_PARAM	IN OUT	VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_pop_pram_details
	(p_cusip	IN	VARCHAR2,
	 p_ticket_id	IN	VARCHAR2,
	 p_ls_esn	IN	NUMBER,
	 p_err_code	IN OUT	VARCHAR2,
	 p_err_params	IN OUT	VARCHAR2
	 )
RETURN BOOLEAN ;
--FLEXCUBE V.CL Release 7.7 Trade processing enhancement changes ends
--03-DEC-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol#1 Tag#9,Changes Starts
FUNCTION fn_populate_process_dd
(
	p_trade_ref_no		IN	tltbs_contract_master.contract_ref_no%TYPE,
	p_agency_ref_no		IN	oltbs_contract.contract_ref_no%TYPE,
	p_err_code		IN OUT	VARCHAR2,
	p_err_param		IN OUT	VARCHAR2
)
RETURN BOOLEAN;
--03-DEC-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol#1 Tag#9, Changes Ends
--06-JUN-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag04,SLT–Buy Back for Participation Tranche start
FUNCTION fn_mark_drawdown_as_liqd
								(
									p_agency_ref_no		IN 	oltbs_contract.Contract_Ref_No%TYPE
									,p_trade_ref_no		IN	oltbs_contract.Contract_Ref_No%TYPE
									,p_processing_date	IN	DATE
									,p_error_code		IN	OUT	VARCHAR2
									,p_error_param		IN	OUT	VARCHAR2
								)
	
RETURN BOOLEAN;
--06-JUN-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag04,SLT–Buy Back for Participation Tranche end
--05-OCT-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag06 changes start
FUNCTION fn_consol_upload_tbl
							(
							 p_consol_contract_ref_no IN TLTB_CONSOL_LS_BROWSER.CONSOL_TICKET_REF_NO%TYPE
							,p_error_code IN OUT	VARCHAR2
							,p_error_params	IN OUT	VARCHAR2
							)
RETURN BOOLEAN;
PROCEDURE pr_upload_consol_pram_npvami
	(
		p_branch		IN	CHAR
		,p_consol_tkt_ref_no	IN	tltbs_contract_master.contract_ref_no%TYPE DEFAULT 'ALL'
		,p_seq_no		IN	NUMBER DEFAULT 0 
	);
FUNCTION fn_pop_consol_ls_browser
	(
	p_consol_ticket_ref_no		IN			oltbs_contract.contract_ref_no%TYPE,
	p_Error_Code 					IN OUT	VARCHAR2,
	p_Error_Params 				IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--05-OCT-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag06 changes end

--Bug#33143838:Starts here
FUNCTION Fn_Lor_Liquidate_Dd( p_agency_ref_no		IN 	oltbs_contract.Contract_Ref_No%TYPE
                             ,p_trade_ref_no		IN	oltbs_contract.Contract_Ref_No%TYPE
                             ,p_dd_ref_no           IN	oltbs_contract.Contract_Ref_No%TYPE
                             ,p_processing_date	IN	DATE
                             ,p_error_code		IN	OUT	VARCHAR2
                             ,p_error_param		IN	OUT	VARCHAR2 )
RETURN BOOLEAN;                         
--Bug#33143838:Ends here
								
END tlpks_slt_interface;
/
CREATE or replace SYNONYM tlpkss_slt_interface for tlpks_slt_interface
/