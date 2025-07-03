create or replace package lppks_services IS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lppks_services.SPC
**
** Module	: LOANS SYNDICATION
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

/*
CHANGE_HISTORY 
FCC 4.2 FEB 2003 CITIPLC DEV
	THIS PACKAGE SPECIFICATION WAS DEVELOPED FOR THE MODULE LL WHICH WILL BE ON THE LINES OF SERVICES SUB-SYSTEM
	OF LD MODULE...

FCC 4.2 19-02-2003	Function FN_DELETE_PARTCIPANT_LIQD and FN_AUTH_PARTCIPANT_LIQD has been added. -- sanjib

FCC 4.2 14-APR-2003  This function is used for population of amount due tables on the participant side based on the 
                     borrower side (Cash flow rebuild for participant)
perfomance tuning 30-may-2007 changes for propgation of mnemonic and entity
30-Jul-2006 Flexcube V.CL 7.3 Settlement Changes
added fun Fn_propagate_details for propagating details in tranches and underlying drawdowns

18-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#24, Retro Changes CITIUS-LS-906,18-dec-2007
                             05-SEP-2007.CITIUS-LS#906.Changes related to the job for the propagation of ssi mnemonic.
                          
10-JULY-2008 FLEXCUBE V.CL Release 7.4 Retro Changes CITIUK-LS-CITILS73100137,codes added in close trigger to check wheather the ssi mnemonic is in use in any contract
06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#906,STP Consolidation,By Swapnasish,Changes related to the job for the propagation of ssi mnemonic.
06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#885,STP Consolidation,By Swapnasish,Retroe of September release
27-OCT-2010 Flexcube V.CL Release 7.8 FS VOL2 Tag 07 Global Amount for Non-Lead changes,Added two function fn_get_event_asset_ratio and fn_get_event_value_date 
											to get the asset ratio and value date for participant position summary
21-DEC-2011 CITIUS-LS#12196 chages,done to return the proper the correct event valude date
01-DEC-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol#1 Tag#10 Changes - Fee Processing Changes

 **  Modified By   : Arunprasath
 **  Modified On   : 10-Oct-2023
 **  Reason        : New function fn_prop_Auth_settle_DD specified to propogate and Auth participant SSI amendment to drawdown contracts
 **  Search String : Bug#37152900

*/




function fn_copyproduct 
( 
	old_product_code in varchar2, 
	new_product_code in varchar2 
) return Boolean ;

function FN_DELETE_PARTCIPANT_LIQD
(
	p_party_ref_no	in	lptbs_amount_due_master.PARTICIPANT_REF_NO%Type,
	p_event_seq_no	in	lptbs_amount_due_master.LIQD_EVENT_SEQ_NO%Type,
	p_borrow_ref_no	in	lptbs_amount_due_master.BORROWER_REF_NO%Type,
	p_borrow_esn	in	lptbs_amount_due_master.BORROWER_EVENT_SEQ_NO%Type,
	pErrCode	in out	varchar2,
	pParam		in out	varchar2
) return Boolean;

FUNCTION FN_AUTH_PARTCIPANT_LIQD
(
	p_party_ref_no	IN	lptbs_amount_due_master.PARTICIPANT_REF_NO%TYPE,
	p_event_seq_no	IN	lptbs_amount_due_master.LIQD_EVENT_SEQ_NO%TYPE,
	pErrCode	IN OUT	VARCHAR2,
	pParam		IN OUT	VARCHAR2

) RETURN BOOLEAN;

-----------------------------------------------------------------------------------------------
--This function is used for population of amount due tables on the participant side based on the 
--borrower side
-----------------------------------------------------------------------------------------------

FUNCTION fn_party_cash_rebuild
		(
		p_branch 			IN 		oltbs_contract.branch%type,   
		p_processing_date  	IN 		DATE, 
		p_product   		IN 		oltbs_contract.product_code%type, 
		p_commit_frequency 	IN 		oltbs_automatic_process_master.bod_commit_count%TYPE, 
		pErrorCode			IN OUT	VARCHAR2,
		pErrorParams		IN OUT	VARCHAR2
		)
RETURN BOOLEAN ;
--perfomance tuning 30-may-2007 changes for propgation of mnemonic and entity start 
FUNCTION fn_settl_pick_non_tr_ccy 
					(p_contract_ref_no	IN oltbs_contract.contract_ref_no%TYPE,
					 p_action_code		IN VARCHAR2,
					 p_err_code		OUT VARCHAR2,
					 p_err_params		OUT VARCHAR2
					)
RETURN BOOLEAN;
  --OBCL_14.4_FP_Browser_Changes :: Starts
  FUNCTION fn_backup_ssi_on_hold_new(p_each_mnemonic   IN lbtbs_temp_contractis%ROWTYPE,
                                     p_contract_ref_no IN lptbs_contract_master.borrower_contract_ref_no%TYPE,
                                     p_component_list  IN VARCHAR2,
                                     p_event_seq_no    IN oltbs_sett_hold.event_seq_no%TYPE,
                                     p_error_code      OUT VARCHAR2,
                                     p_error_param     OUT VARCHAR2)
    RETURN BOOLEAN;
  --OBCL_14.4_FP_Browser_Changes :: Ends    
FUNCTION fn_prop_settle_DD
					(p_contract_ref_no	IN oltbs_contract.contract_ref_no%TYPE,
					 p_err_code		OUT VARCHAR2,
					 p_err_params		OUT VARCHAR2
					)
RETURN BOOLEAN;
--perfomance tuning 30-may-2007 changes for propgation of mnemonic and entity ends

--perfomance tuning 01-JUN-2007 changes for propgation of mnemonic and entity start
Function fn_ssi_pickup_for_curr (p_contract_ref_no oltbs_contract.contract_ref_no%TYPE,
                                 p_event_seq_no    lbtbs_contract_participant.event_seq_no%TYPE,
				 p_action_code     VARCHAR2
                                )
RETURN BOOLEAN;
--perfomance tuning 01-JUN-2007 changes for propgation of mnemonic and entity end
--FLEXCUBE V.CL Release 7.3 ITR1 SFR#857, Retro Changes CITIUS-LS-857, 07-dec-2007 start
--CITIUS-LS#857 ARUN 20-JUL-2007, Performance Changes in LSMNEMONIC Screen Starts
Function Fn_pop_mnemonic_entity_temp
					(p_contract_ref_no 	IN  oltbs_contract.contract_ref_no%TYPE,
					 p_err_code			IN 	OUT varchar2
                    )
RETURN BOOLEAN;
--CITIUS-LS#857 ARUN 20-JUL-2007, Performance Changes in LSMNEMONIC Screen Ends
--FLEXCUBE V.CL Release 7.3 ITR1 SFR#857, Retro Changes CITIUS-LS-857, 07-dec-2007 end

--FLEXCUBE V.CL Release 7.3 ITR2 SFR#24, Retro Changes CITIUS-LS-906,18-dec-2007  start
--FLEXCUBE V.CL Release 7.3 ITR2 SFR#24, Retro Changes CITIUS-LS-906,18-dec-2007 end
PROCEDURE pr_ssi_job
		(
			P_processstat varchar2
			,p_branch in varchar2 --310308 SSI Mnemonic Propogation - UK Changes
		);--SSI Mnemonic Propogation - UK Changes
--06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#906 Start By Swapnasish
--CITIUS-LS#906 Starts
PROCEDURE pr_ssi_prop (p_branch  IN oltbs_contract.branch%type,
					   P_seq_no	 IN lbtbs_job_queue.seq_no%type
					   ); 
--CITIUS-LS#906 Ends
--06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#906 End By Swapnasish
--06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#885 Start By Swapnasish
/*
--CITIUS-LS#885 ARUN 05-SEP-2007, Retroe of September release Starts
--Flexcube V.CL 7.3 Settlement Changes Start
Function Fn_propagate_details
( p_branch		IN		VARCHAR2,
  p_module 		IN		VARCHAR2, 
  p_counterparty 	IN		VARCHAR2, 
  p_currency 		IN		VARCHAR2, 
  p_product_code 	IN		VARCHAR2, 
  p_settlement_seq_no	IN		VARCHAR2,
  p_mnemonic		IN		VARCHAR2,
  p_error_code		IN OUT		VARCHAR2,
  p_error_param		IN OUT		VARCHAR2)
RETURN BOOLEAN ;
--Flexcube V.CL 7.3 Settlement Changes End
--CITIUS-LS#885 ARUN 05-SEP-2007, Retroe of September release Ends
*/
--06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#885 End By Swapnasish
--FLEXCUBE V.CL Release 7.3 ITR2 SFR#24, Retro Changes CITIUS-LS-906,18-dec-2007 Control SSI Mnemonic Instructions Starts
FUNCTION fn_populate_mnemonic_prop(p_customer_no		varchar2,
				   p_ssi_mnemonic		varchar2,
 p_branch varchar2,
				   p_settlement_seq_no	number,
				   p_mod_no				number,
				   p_currency           varchar2,
				   p_module             varchar2,
				   p_process_id		VARCHAR2,--SSI Mnemonic Propogation - UK Changes 210208
				   p_counterparty 	VARCHAR2,--SSI Mnemonic Propogation - UK Changes
				   p_product_code	VARCHAR2,--SSI Mnemonic Propogation - UK Changes
				   p_error_code	 in out varchar2,
				   p_error_param in out varchar2)
RETURN BOOLEAN;
--CITIUS-LS#SRT1452 STP and Code Consolidation Site - Compilation Errors Starts
FUNCTION fn_populate_mnemonic_prop(p_customer_no		varchar2,
								   p_ssi_mnemonic		varchar2,
 p_branch varchar2,
								   p_settlement_seq_no	number,
								   p_mod_no				number,
								   p_currency           varchar2,
								   p_module             varchar2,
								   p_error_code	 in out varchar2,
								   p_error_param in out varchar2)
RETURN BOOLEAN;
FUNCTION Fn_mnemonic_propagation(	p_mnemonic_row	lbtbs_propagate_mnemonic%rowtype)
RETURN BOOLEAN;
--CITIUS-LS#SRT1452 STP and Code Consolidation Site - Compilation Errors Ends

--FLEXCUBE V.CL Release 7.3 ITR2 SFR#24, Retro Changes CITIUS-LS-906,18-dec-2007Control SSI Mnemonic Instructions Ends
FUNCTION Fn_propagate_ssi_batch(p_userid VARCHAR2,
				p_ssi_mnemonic			VARCHAR2,--SSI Mnemonic Propogation - UK Changes 210208	
 p_process_branch VARCHAR2,
				p_where              		VARCHAR2,											
				p_selection			VARCHAR2,
				p_error_code  IN OUT 		VARCHAR2,
				p_error_param IN OUT 		VARCHAR2
								)								
RETURN BOOLEAN;
--10-JULY-2008 FLEXCUBE V.CL Release 7.4 Retro Changes CITIUK-LS-CITILS73100137 START
--UK SSI FIX,CITILS73100137 Changes starts
FUNCTION fn_check_mnemonic_use
	(p_counterparty		VARCHAR2
 ,p_branch VARCHAR2
	,p_module		VARCHAR2
	,p_product_code		VARCHAR2
	,p_currency		VARCHAR2
	,p_settlement_seq_no	NUMBER
	,p_ssi_mnemonic		VARCHAR2
	,p_error_code		IN OUT VARCHAR2
	,p_error_param		IN OUT VARCHAR2
	)
RETURN BOOLEAN; 
--UK SSI FIX,CITILS73100137 Changes ends
--10-JULY-2008 FLEXCUBE V.CL Release 7.4 Retro Changes CITIUK-LS-CITILS73100137 END
--21-DEC-2011 CITIUS-LS#12196 chages Start
/*
--27-OCT-2010 Flexcube V.CL Release 7.8 FS VOL2 Tag 07 Global Amount for Non-Lead changes starts
FUNCTION fn_get_event_value_date
			(
			p_contract_ref_no	lbtbs_contract_participant.contract_ref_no%TYPE,
			p_participant 		lbtbs_contract_participant.participant%TYPE,
			p_esn 			lbtbs_contract_participant.event_seq_no%TYPE
             		)
RETURN DATE;
*/
FUNCTION fn_get_event_value_date
			(
			p_borr_ref_no    	IN  oltbs_contract.contract_ref_no%type,
      			p_event_code    	IN  oltbs_contract.curr_event_code%type,
			p_event_seq_no    	IN  oltbs_contract.latest_event_seq_no%type
             		)
RETURN DATE;
--21-DEC-2011 CITIUS-LS#12196 chages End
FUNCTION fn_get_event_asset_ratio
			(
			p_contract_ref_no	lbtbs_contract_participant.contract_ref_no%TYPE,
			p_participant 		lbtbs_contract_participant.participant%TYPE,
			p_esn 			lbtbs_contract_participant.event_seq_no%TYPE
			)
RETURN NUMBER;
--27-OCT-2010 Flexcube V.CL Release 7.8 FS VOL2 Tag 07 Global Amount for Non-Lead changes ends
--01-DEC-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol#1 Tag#10 Changes starts
FUNCTION Fn_get_hold_comp(p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
			  p_component_list	OUT	VARCHAR2,
			  p_error_code		OUT	VARCHAR2,
			  p_error_param		OUT	VARCHAR2
			  )
RETURN BOOLEAN;
--OBCL_14.4_FP_Browser_Changes :: Starts
FUNCTION Fn_get_hold_comp_liqd(p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
                               p_component_list  OUT VARCHAR2,
                               p_error_code      OUT VARCHAR2,
                               p_error_param     OUT VARCHAR2)
  RETURN BOOLEAN;
--OBCL_14.4_FP_Browser_Changes :: Ends
FUNCTION fn_propagate_ssi_on_unhold(p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
				    p_sch_date		IN	oltbs_sett_hold.process_date%TYPE,
				    p_error_code	OUT	VARCHAR2,
				    p_error_param	OUT	VARCHAR2
				   )
RETURN BOOLEAN;
--01-DEC-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol#1 Tag#10 Changes ends

--Bug#37152900 Start
FUNCTION fn_prop_Auth_settle_DD
					(p_contract_ref_no	IN oltbs_contract.contract_ref_no%TYPE,
					 p_err_code		OUT VARCHAR2,
					 p_err_params		OUT VARCHAR2
					)
RETURN BOOLEAN;
--Bug#37152900 End

end lppks_services;
/
CREATE or replace SYNONYM lppkss_services FOR lppks_services
/