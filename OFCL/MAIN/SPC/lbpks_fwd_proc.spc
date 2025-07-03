CREATE OR REPLACE  PACKAGE lbpks_fwd_proc IS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : lbpks_fwd_proc.SPC
**
** Module       : LS
** This source is part of the FLEXCUBE Corporate - Corporate Banking
** Software System and is copyrighted by i-flex solutions limited.
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
Change History - Start
	20-AUG-2005: FCC 4.6.2 CITILS Forward PRocessing Changes New Package is created
19-OCT-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO Start Here
	07-Sep-2007 FCC 7.3 RETRO of CITILS46110391 SGEN Changes -- Linking PMSG to fwd processing events.  Added fn_get_related_event
19-OCT-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO End Here
17-DEC-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO
	    CITILS46210345 Ability to Suppress Single Payments from the Forward Processing Browser.
16-Nov-2009 FCC V.CL Release 7.5 lot 1.2 LS Release UK Retro# CITILS10G00310,Message duplication issue 
										2) VAMI event is inserting in case of consol rollovers

	This Function will check that whether semi-automatic is selected for a particular event,
	and for a particular contract or not.
25-APR-2011 FLEXCUBE V.CL Release 7.9 VOL3 FS Tag 04,SLT Payment Browser changes
22-AUG-2011 Flexcube V.CL Release 7.10,CITIUK Retro,EURCITIPLC-LS#10150, changes, There are many incorrect entries generated from the Day5 batch. Please see the ITR file where I have hi-lighted one such entry. Please ensure ALL are checked.
03-AUG-2012 Flexcube V.CL Release 7.10, EURCITIPLC#14555 Changes. System genearting interest amount payment message to the borrower which is incorrect.
16-APR-2013 Oracle FCUBS 3.3.0.0.0$CITIBK_R713 FS Vol1 Tag06, Sanction Screening Changes
17-JUL-2013 Oracle FCUBS 3.3.0.0.0$CITIBK_R713 FS Vol1 Tag06 IUT#72 Changes, parameter p_contract_master_rec of fn_process_adhoc_fee changed to p_ref_no.
11-DEC-2013 Oracle FCUBS 3.3.0.0.0$CITIBK_R714 Retro EURCITIPLC#18151 Changes: On "UnHold" and "Confirmed To Auto", system was not populating forward processing queue. Function fn_insert_fwd_queue moved from sql to spc.
17-FEB-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 FS Vol2 Tag04 changes:Tax refund changes
25-SEP-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag05 changes, Sanction check changes , added new functions fn_sacnchk_applicable and fn_archive_unhandoff_msg
*/
	

	FUNCTION fn_chk_semiauto(p_ref_no   VARCHAR2,
					 p_event	VARCHAR2,
      	     	                         p_event_seq	NUMBER,
      	     	                         p_msg_handoff	oltbs_dly_msg_out%ROWTYPE,	--07-Sep-2007 FCC 7.3 RETRO of CITILS46110391 Changes --19-OCT-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO
					 p_semi_auto OUT BOOLEAN,
					 p_error_code  IN OUT VARCHAR2,
					 p_error_param IN OUT VARCHAR2) RETURN BOOLEAN;

	/*
		If a event is semi auto then this function will read the confirmation status from the
		forward event table and return the value accordingly
	*/
	FUNCTION  fn_event_confirmed(p_ref_no 	VARCHAR2,
					     p_event	VARCHAR2,
					     p_event_seq	NUMBER,
					     p_dcn		VARCHAR2,
					     p_running    NUMBER,
					     p_amount	NUMBER,
					     p_valuedt	OLTB_DLY_MSG_OUT.value_date%TYPE,	--07-Sep-2007 FCC 7.3 RETRO of CITILS46110391 Start Here--19-OCT-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO Start Here
					     p_ccy	OLTB_DLY_MSG_OUT.ccy%TYPE,
					     p_prd		OLTB_DLY_MSG_OUT.product%TYPE,
					     p_module		OLTB_DLY_MSG_OUT.module%TYPE,	--07-Sep-2007 FCC 7.3 RETRO of CITILS46110391 End Here--19-OCT-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO End Here
					     p_confirmed 	OUT BOOLEAN,
					     p_error_code	IN OUT VARCHAR2,
					     p_error_param IN OUT VARCHAR2) RETURN BOOLEAN ;
	/*
		This function will build the forward processing table, and rows are fetched based on the action
		The valid Value for Action_code are
	‘N’ : New Contract delete all, repopulate from value_date of the contract to today’s date+forward_limit_days.
	‘M’ : Unlock mode, contract amendment, delete all the modules from today onwards and repopulate based on the
		change date till the today’s date + forward_limit_days
		‘B’ : Batch, This call is made from the batch,
			BOD program and BOD will fetch the last populated schedule for the event and
			start rebuilding from that date to today’s date + forward_limit_days
	*/

	FUNCTION  fn_process_event(p_ref_no  	VARCHAR2
			     ,p_start_date 	 DATE
			     ,p_action		 VARCHAR2
			     ,p_error_code  IN OUT	 VARCHAR2
			     ,p_error_param IN OUT	 VARCHAR2 ) RETURN BOOLEAN;
	/*
		Will be called from the form to Generate the messages attached with the event,
		on authorization from the for LSDFWDPR we are generating all the messages
		which are held up due to non confirmation of the event.

	*/
	FUNCTION fn_gen_msg_on_auth(p_contract_ref_no  VARCHAR2,
					 p_event 		  VARCHAR2,
					 p_value_date	  VARCHAR2,
					 p_currency		  VARCHAR2,
					 p_error_code  IN OUT	  VARCHAR2,
					 p_error_param IN OUT 	  VARCHAR2) RETURN BOOLEAN;

	/*
		This function will be called from the message generation routine and
		will hold the participant advise and put it into the temporary table,
		these messages will be then released based on the borrower advises.
	*/
	FUNCTION fn_populate_part_adv(p_ref_no	   VARCHAR2
						,p_running_no  NUMBER
						,p_dcn		 VARCHAR2
						,p_esn		 NUMBER
						,p_event_code	 VARCHAR2
						,p_amount	 NUMBER
						,p_Currency    VARCHAR2
						,p_error_code IN OUT VARCHAR2
						,p_error_param IN OUT VARCHAR2) RETURN BOOLEAN ;
	/*
		This function will process all the participant advises based on the treatment given to the borrower.
		If the borrower message is released then all the participant messages related to the borrower
		will be released and deleted from the temp table.
		Otherwise if borrower is held up we’ll just delete the participant from the temporary table.
	*/

	FUNCTION fn_process_part_adv(p_ref_no			VARCHAR2
					     ,p_dcn				VARCHAR2
					     ,p_running_no  		NUMBER
					     ,p_borr_event_code		VARCHAR2
					     ,p_borr_esn			NUMBER
					     ,p_semi_auto			BOOLEAN
					     ,p_confirmed			BOOLEAN
					     ,p_error_code  IN OUT 	VARCHAR2
					     ,p_error_param IN OUT 	VARCHAR2) RETURN BOOLEAN;
	/*
		This function will be called from BOD program and
		will archive the old data from the forward processing table to the related archive tables.
		Also it will populate the new schedules by calling the necessary functions.
	*/

 FUNCTION fn_archive_gen_records(p_branch VARCHAR2
						,p_module	VARCHAR2
					    	,p_start_date		DATE
					   	,p_error_code  IN OUT VARCHAR2
					    	,p_error_param IN OUT VARCHAR2
					    	,p_confirm_staus IN 	VARCHAR2 --25-SEP-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag05 changes
					    	) RETURN BOOLEAN;

	FUNCTION fn_get_rollover_amt_for_comp
	(
		p_parent_ref_no		IN	varchar2,
		p_component		IN	varchar2,
		p_due_date		IN	date,
		p_due_amount		IN	number,
		p_rollover_amt		IN OUT	number,
		p_err_code		OUT	varchar2,
		p_err_params		OUT	varchar2
	)
	return boolean;

	--FCC V.CL 7.3 UK CONSOLIDATION RETRO starts
	--CITILS46210345 Changes Starts
	FUNCTION fn_calc_amount
					(
					p_ref_no  		IN	 	VARCHAR2
					,p_fwdvaldt	IN	 	DATE
					,p_event		IN	 	VARCHAR2
					,p_amount		OUT	 	NUMBER
					,p_error_code   	IN OUT	VARCHAR2
					,p_error_param  	IN OUT	VARCHAR2
					)
	RETURN BOOLEAN;
	--CITILS46210345 Changes Ends
	--FCC V.CL 7.3 UK CONSOLIDATION RETRO ends
	--16-Nov-2009 FCC V.CL Release 7.5 lot 1.2 LS Release UK Retro# CITILS10G00310 changes starts here
	FUNCTION fn_lsdcorol_log_keys
					(	p_contract_ref_no		IN		VARCHAR2
					,	p_error_code		IN OUT	VARCHAR2
					,	p_error_param		IN OUT	VARCHAR2
					)
	RETURN BOOLEAN;
		
	FUNCTION fn_lsdcorol_track_changes
					(	p_contract_ref_no	IN      VARCHAR2
					,	p_data_changed		OUT	BOOLEAN
					,	p_error_code		IN OUT	VARCHAR2
					,	p_error_param		IN OUT	VARCHAR2
					)
	RETURN BOOLEAN;
	
	FUNCTION fn_fwd_proc_and_sgen
		(
			p_consolextref		IN	oltbs_contract.contract_ref_no%TYPE
			,p_consolprdcode		IN	lbtbs_contract_consol_master.product_code%TYPE
			,p_consolconccy		IN	lbtbs_contract_consol_master.contract_ccy%TYPE
			,p_consolvaluedt		IN	lbtbs_contract_consol_master.Value_date%TYPE
			,p_module_code		IN	oltbs_contract.module_code%TYPE
		)
	RETURN BOOLEAN;
	--16-Nov-2009 FCC V.CL Release 7.5 lot 1.2 LS Release UK Retro# CITILS10G00310 changes ends here

	--25-APR-2011 FLEXCUBE V.CL Release 7.9 VOL3 FS Tag 04 changes start	
	FUNCTION  fn_process_event_trade(p_ref_no		VARCHAR2
				     	,p_start_date		DATE
				     	,p_action		VARCHAR2
				     	,p_error_code   IN OUT	VARCHAR2
				     	,p_error_param  IN OUT	VARCHAR2
				     	) 
	RETURN BOOLEAN;
	
	FUNCTION fn_event_confirmed_trade
				(p_ref_no	VARCHAR2,
				 p_event	VARCHAR2,
		     		 p_event_seq	NUMBER,
		     		 p_dcn		VARCHAR2,
		     		 p_running	NUMBER,
		     		 p_amount	NUMBER,
				 p_counterparty	lbtbs_contract_fwdevent.counterparty%type,
		     		 p_valuedt	OLTB_DLY_MSG_OUT.value_date%TYPE,	
			    	 p_ccy		OLTB_DLY_MSG_OUT.ccy%TYPE,
		     		 p_prd		OLTB_DLY_MSG_OUT.product%TYPE,
	 		    	 p_module	OLTB_DLY_MSG_OUT.module%TYPE,		
		     		 p_confirmed 	OUT BOOLEAN,
		     		 p_error_code	IN OUT VARCHAR2,
		     		 p_error_param	IN OUT VARCHAR2) 
	RETURN BOOLEAN;

	FUNCTION fn_gen_msg_on_auth_lt(	 p_contract_ref_no	VARCHAR2,
					 p_event	  	VARCHAR2,
					 p_value_date	  	VARCHAR2,
           				 p_counterparty  	lbtbs_contract_fwdevent.counterparty%type,
					 p_currency		VARCHAR2,
					 p_error_code  IN OUT	VARCHAR2,
					 p_error_param IN OUT	VARCHAR2) RETURN BOOLEAN;

	FUNCTION fn_archive_gen_records_trade   (
 p_branch VARCHAR2
						,p_module	VARCHAR2
						,p_start_date	DATE
						,p_error_code  	IN OUT VARCHAR2
						,p_error_param 	IN OUT VARCHAR2
						,p_confirm_status	IN VARCHAR2 --25-SEP-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag05 changes
						) RETURN BOOLEAN;

	--25-APR-2011 FLEXCUBE V.CL Release 7.9 VOL3 FS Tag 04 changes end	

	--22-AUG-2011 Flexcube V.CL Release 7.10,CITIUK Retro,EURCITIPLC-LS#10150 changes, Start
	FUNCTION fn_insert_Pram( p_contract_rec oltbs_contract_master%rowtype
								,P_part_ref_no VARCHAR2
								,p_event	VARCHAR2
								,p_value_date	DATE 
								,p_amount	NUMBER
								,p_error_code	VARCHAR2
								,p_error_param	VARCHAR2)
	RETURN BOOLEAN;
	--22-AUG-2011 Flexcube V.CL Release 7.10,CITIUK Retro,EURCITIPLC-LS#10150 changes, End
	--03-AUG-2012 Flexcube V.CL Release 7.10, EURCITIPLC#14555 Changes. Start
	FUNCTION fn_fwd_proc_msg_cancel(
						 p_borr_ref_no		IN	oltbs_contract.contract_ref_no%TYPE
						,p_borr_ccy		IN	lbtbs_contract_consol_master.contract_ccy%TYPE
						,p_borr_mat_dt		IN	lbtbs_contract_consol_master.Value_date%TYPE
						,p_module_code		IN	oltbs_contract.module_code%TYPE
						)
	RETURN BOOLEAN;
	--03-AUG-2012 Flexcube V.CL Release 7.10, EURCITIPLC#14555 Changes. End
	--16-APR-2013 Oracle FCUBS 3.3.0.0.0$CITIBK_R713 FS Vol1 Tag06, Sanction Screening Changes start
	FUNCTION  fn_process_event_loan
					(
					 p_ref_no	IN	oltbs_contract.contract_ref_no%type
					,p_event_code	IN	oltbs_contract.curr_event_code%TYPE
					,p_start_date	IN	DATE
					,p_action	IN	VARCHAR2
					,p_error_code   IN OUT	VARCHAR2
					,p_error_param  IN OUT	VARCHAR2 
					) 
	RETURN BOOLEAN;
	FUNCTION  fn_process_adhoc_fee
					(
					--17-JUL-2013 Oracle FCUBS 3.3.0.0.0$CITIBK_R713 FS Vol1 Tag06 IUT#72 Changes start
					--p_contract_master_rec	IN	oltbs_contract_master%rowtype
					p_ref_no			IN	oltbs_contract.contract_ref_no%type
					--17-JUL-2013 Oracle FCUBS 3.3.0.0.0$CITIBK_R713 FS Vol1 Tag06 IUT#72 Changes end
					,p_event_seq_no	IN	oltbs_contract.latest_event_seq_no%TYPE
					,p_error_code   	IN OUT	VARCHAR2
					,p_error_param  	IN OUT	VARCHAR2 
					) 
	RETURN BOOLEAN;
	--16-APR-2013 Oracle FCUBS 3.3.0.0.0$CITIBK_R713 FS Vol1 Tag06, Sanction Screening Changes end
	
	--11-DEC-2013 Oracle FCUBS 3.3.0.0.0$CITIBK_R714 Retro EURCITIPLC#18151 Changes, starts
	FUNCTION fn_insert_fwd_queue( p_contract_ref_no  	VARCHAR2
						,p_value_date	DATE
						,p_event	VARCHAR2
						,p_event_seq	NUMBER
						,p_currency	VARCHAR2
						,p_dcn		VARCHAR2
						,p_running_no	VARCHAR2
						,p_adv_amount	NUMBER
						,p_event_amount NUMBER
						,p_confirm	VARCHAR2) RETURN BOOLEAN;
	--11-DEC-2013 Oracle FCUBS 3.3.0.0.0$CITIBK_R714 Retro EURCITIPLC#18151 Changes, ends
	--17-FEB-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 FS Vol2 Tag04 changes start
	FUNCTION  fn_fwd_tax_refnd
		(
		p_contract_ref_no	oltbs_contract.contract_ref_no%type
		,p_esn			oltbs_contract.latest_event_seq_no%type
		,p_error_code   	IN OUT	VARCHAR2
		,p_error_param  	IN OUT	VARCHAR2 
		) 
	RETURN BOOLEAN;
	FUNCTION  fn_fwd_inv_refnd
		(
		p_contract_ref_no	oltbs_contract.contract_ref_no%type
		,p_customer		oltbs_contract.counterparty%type
		,p_esn			oltbs_contract.latest_event_seq_no%type
		,p_error_code   	IN OUT	VARCHAR2
		,p_error_param  	IN OUT	VARCHAR2 
		) 
	RETURN BOOLEAN;
	--17-FEB-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 FS Vol2 Tag04 changes end
	
	--25-SEP-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag05 changes start
	FUNCTION fn_sacnchk_applicable
		(p_msg_hoff_rec		oltbs_msg_handoff%rowtype
		,p_err_code	IN OUT 	VARCHAR2
		,p_err_param	IN OUT	VARCHAR2
		)
	RETURN BOOLEAN;
	--25-SEP-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag05 changes end
	
END;
/
CREATE or replace SYNONYM lbpkss_fwd_proc FOR lbpks_fwd_proc
/