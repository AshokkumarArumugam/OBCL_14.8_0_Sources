CREATE OR REPLACE PACKAGE lppks_contract

IS
/*--------------------------------------------------------------------------------------------------
**
** File Name		: lppks_contract.SPC
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
**
----------------------------------------------------------------------------------------------------
*/


/*----------------------------------CHANGE HISTORY-----------------------------------------------------------

15-AUG-2006 FCC V.CL RELEASE 7.1 Package created by SVS .
	    This package has been created as lppks_upload package had grown over 15 k lines and it was 
	    getting difficult to manage the entire code under a single package so all the internally called 
	    units from this package have been taken out and this separate packge lppks_contract has been 
	    created . 
	    Most importantly all the references like types and global variables have been kept in package 
	    lppks_upload only as all of them were being referenced from lppks_upload only by other packages 
	    and front end as well . None of them have been shifted to this new package. 
04-SEP-2006 FCC V.CL RELEASE 7.1 changes for populating mapping table.
	    Added function fn_ins_event_mapping to insert into table lbtbs_borr_part_event_mapping.
	    The table is lbtbs_borr_part_event_mapping. This table will hold borrower esn and corresponding 
	    participant esn for an event.
06-SEP-2006 FCC V.CL RELEASE 7.1 to support multiple amount tags changed the declaration of fn_process_round_thru

28-SEP-2006 FCC V.CL RELEASE 7.1 SFR#295 changes added two new parameters p_borrow_event_date and p_borrow_value_date in FUNCTION FN_PROCESS_RND_THRU_DUE ,
10-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR1 SFR#124, Retro Changes CITIUS-LS-277, 10-Dec-2007, 
	    Added a new function Fn_check_propagation to see if the participant side amount due is equal to the borrower side amount due
23-Feb-2007 Madhu CITIUS-LS Till#320, Added fn_populate_part_mis function to the spc, its already available in sql.
10-DEC-2007 Added fn_populate_part_mis function to the spc, its already available in sql.
	    
06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#1346,STP Consolidation,By Swapnasish,Rollover Tuning Changes.
29-APR-2009 FLEXCUBE V.CL Release 7.6 Sighting Fund Changes Manas added function fn_process_sighting_funds_part
07-JUN-2009 CITIUS-LS#5912 fn_process_sighting_funds_part - Borr esn is passed for this function.
26-AUG-2009 CITIUS-LS#6235, Clearpar and SLT incremental changes retro,changed the copyright clause.
07-JUN-2011 FLEXCUBE V.CL Release 7.9 VOL2 FS Tag 8 collateral aprticipation changes.
15-JUN-2011 FLEXCUBE V.CL Release 7.9 VOL2 FS Tag 8 changes, Data type of p_esn in fn_process_coll_event has been changed to NUMBER.
14-JUL-2011 Flexcube V.CL Release 7.9 FS Vol2 Tag 08 ITR1#169 System is firing COIC, for a participant which does not have any asset ratio.
10-APR-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO EURCITIPLC#18855 changes function added for propagation check for user input components.

  Changed By         : Sowmya Bitra
  Changed On         : 31-Jan-2024
  Change Description : Performance Tuning Changes for Syndication Online Transactions with large number(300+) of participants 
  Search String      : Bug#36008580
------------------------------------END CHANGE HISTORY------------------------------------------------------
*/

pkg_contract_part_curr_esn    number := ''; --CITIUS-LS#474.Further tuning changes for renewal/payment process --CITIUS-LS#SRT1451
g_borr_ref_no oltb_contract.contract_ref_no%TYPE;--OBCL_14.5_Risk_Comp

--Bug#36008580 Changes Start
TYPE ty_tbl_acc_ccy IS TABLE OF Oltbs_Account.Ac_Gl_Ccy%TYPE INDEX BY VARCHAR2(50); 
rec_acc_ccy ty_tbl_acc_ccy; 
TYPE ty_tbl_prod_disc_sch IS TABLE OF VARCHAR2(1) INDEX BY oltms_product_master_ld.participant_product%TYPE; 
rec_prod_disc_sch ty_tbl_prod_disc_sch;
--Bug#36008580 Changes End

FUNCTION fn_register_a_event(	
	p_party_contract_ref_no		IN	oltbs_contract.contract_ref_no%TYPE,
	p_esn	   			IN	lbtb_party_event_master_upload.event_seq_no%TYPE,
	p_liqd_mode			IN	VARCHAR2,
	p_EVENT_CODE			IN	lbtb_party_event_master_upload.EVENT_CODE%TYPE,
	p_borrow_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	p_borrow_esn			IN 	lbtb_party_event_master_upload.event_seq_no%TYPE,
	p_err_code			IN OUT	VARCHAR2,
	p_err_params			IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;

FUNCTION fn_Participant_BK_Processing(
        p_br_facility_ref_no 		IN	oltbs_contract.contract_ref_no%TYPE,
        p_br_tranche_ref_no  		IN	oltbs_contract.contract_ref_no%TYPE,
	p_br_drawdown_ref_no    	IN	oltbs_contract.contract_ref_no%TYPE,
	p_br_drawdown_no     		IN    	NUMBER,
	p_contract_Type      		IN    	VARCHAR2,            --'C' for Tranche and 'L' for Drawdown
	p_err_code 	  		IN OUT 	VARCHAR2,
	p_err_params      		IN OUT 	VARCHAR2
	)
	RETURN BOOLEAN;

FUNCTION fn_Participant_CAMD_Processing(
        p_borrow_contract_ref_no    	IN	oltbs_contract.contract_ref_no%TYPE,
        p_esn	   	  		IN 	lbtb_party_event_master_upload.event_seq_no%TYPE,
	p_event_code   	  		IN 	lbtb_party_event_master_upload.event_code%TYPE,
	p_err_code 	  		IN OUT 	VARCHAR2,
	p_err_params      		IN OUT 	VARCHAR2
	)
	RETURN BOOLEAN;

FUNCTION fn_Participant_Liquidation(
	p_party_contract_ref_no    	IN	oltbs_contract.contract_ref_no%TYPE,
	p_esn	   	  		IN 	lbtb_party_event_master_upload.event_seq_no%TYPE,
	p_EVENT_CODE      		IN    	lbtb_party_event_master_upload.EVENT_CODE%TYPE,
	p_list_of_amount_tags  		IN 	VARCHAR2,
	p_list_of_amounts  		IN 	VARCHAR2,
	p_list_of_amount_ccys  		IN 	VARCHAR2,
	p_borrow_contract_ref_no    	IN	oltbs_contract.contract_ref_no%TYPE,
	p_value_date 			IN	DATE  DEFAULT  GLOBAL.application_date, 
	p_err_code 	  		IN OUT  VARCHAR2,
	p_err_params      		IN OUT  VARCHAR2
	)
	RETURN BOOLEAN;


FUNCTION fn_Queue_Upload_Processing(
        p_borrow_contract_ref_no    	IN	oltbs_contract.contract_ref_no%TYPE,
    	p_err_code 	  		IN OUT 	VARCHAR2,
	p_err_params      		IN OUT 	VARCHAR2
	)
	RETURN BOOLEAN;

FUNCTION fn_Participant_Evt_Processing(
	p_borrow_contract_ref_no    	IN	oltbs_contract.contract_ref_no%TYPE,
	p_borrow_event_date         	IN 	Date,
	p_borrow_value_date         	IN 	Date,
	p_contract_Type      		IN    	lbtb_party_event_master_upload.contract_type%TYPE,
	p_esn	   	  		IN 	lbtb_party_event_master_upload.event_seq_no%TYPE,
	p_event_code   	  		IN 	lbtb_party_event_master_upload.event_code%TYPE,
        p_err_code 	  		IN OUT 	VARCHAR2,
	p_err_params      		IN OUT  VARCHAR2
	)
	RETURN BOOLEAN;

FUNCTION fn_Br_Update_Status(
        p_Br_Contract_ref_no  		IN 	VARCHAR2,
        p_Br_Event_seq_no  		IN 	NUMBER,
        p_err_code 	  		IN OUT 	VARCHAR2,
	p_err_params      		IN OUT 	VARCHAR2
	)
	RETURN BOOLEAN;

Function fn_udf_upload
	(
	p_borr_part_cont_ref_no		IN	oltbs_contract.contract_ref_no%type,
	p_err_code			IN OUT	varchar2,
	p_err_params			IN OUT	varchar2
	) 
	RETURN BOOLEAN;

FUNCTION FN_INS_CSTBS_EVENT_LOG (
	p_cs_event_log 			IN 	oltbs_contract_event_log%ROWTYPE,
        pActionCode    			IN 	CHAR,
	pErrorCode     			IN OUT 	Varchar2
     	) 
	Return Boolean ;

FUNCTION fn_common_function_calls RETURN BOOLEAN;

FUNCTION fn_subsystems_blk_insert RETURN BOOLEAN;

FUNCTION fn_participant_book_entry (
	p_borrow_contract_ref_no 	IN 	oltbs_contract.contract_ref_no%TYPE,
	p_err_code               	IN OUT 	VARCHAR2,
	p_err_params             	IN OUT 	VARCHAR2
	)
	RETURN BOOLEAN;

FUNCTION fn_part_amount_update(
	p_borrow_contract_ref_no 	IN 	oltbs_contract.contract_ref_no%TYPE,
	p_effective_date		IN 	DATE,
	p_blk_flag			IN 	VARCHAR2,
        pErrorCode			IN OUT  ertbs_msgs.err_code%TYPE
	)
	RETURN BOOLEAN;


FUNCTION Fn_Chk_Product_Entries(
	p_product_code 			IN	oltms_product.PRODUCT_CODE%TYPE,
	p_event_code 			IN 	oltbs_contract_event_log.Event_Code%TYPE,
	p_list_of_amount_tags 		IN OUT 	VARCHAR2,
	p_list_of_amounts 		IN OUT 	VARCHAR2,
	p_list_of_ccys 			IN OUT 	VARCHAR2,
	pErrorCode			IN OUT	VARCHAR2,
	pErrorParams			IN OUT  VARCHAR2
	)
	RETURN BOOLEAN;

PROCEDURE pr_append_errlist(
	pErrorCode			IN 	VARCHAR2,
	pErrorParams			IN	VARCHAR2
	);
  
FUNCTION FN_PROCESS_RND_THRU_DUE(
	p_contract_ref_no 	IN	oltbs_contract.contract_ref_no%TYPE,
	p_Br_contract_ref_no IN	oltbs_contract.contract_ref_no%TYPE,
  	p_borrow_event_date     IN DATE Default GLOBAL.Application_Date,--FCC V.CL RELEASE 7.1 SFR#295 changes on 28-SEP-2006
	p_borrow_value_date			IN DATE Default GLOBAL.Application_Date,--FCC V.CL RELEASE 7.1 SFR#295 changes on 28-SEP-2006
  	p_Br_esn 			IN 	oltbs_contract.Latest_Event_seq_no%TYPE,
	p_module 			IN 	oltbs_contract.Module_code%TYPE,
	p_Br_event_code 	IN 	lbtb_party_event_master_upload.event_code%TYPE,
	p_event_code 	 	IN 	lbtb_party_event_master_upload.event_code%TYPE,
	p_amount 			IN 	VARCHAR2, --lbtb_party_event_detail_upload.Amount%TYPE, 06-SEP-2006 to support multiple amount tags
	p_ccy 				IN 	VARCHAR2,
	p_amount_tag 		IN 	VARCHAR2,
	p_err_code 	 		IN OUT 	VARCHAR2,
	p_err_params 		IN OUT  VARCHAR2
	)
	RETURN BOOLEAN;

FUNCTION fn_insert_event(
	p_party_contract_ref_no 	IN	oltbs_contract.contract_ref_no%TYPE,
	p_borrower_contract_ref_no 	IN	oltbs_contract.contract_ref_no%TYPE,
	p_Event_Code 			IN 	OLTB_CONTRACT_EVENT_LOG.Event_Code%TYPE,
	p_esn	 	 		IN 	oltbs_contract.latest_event_seq_no%TYPE,
	p_err_code 	 		IN OUT  VARCHAR2,
	p_err_params 	 		IN OUT  VARCHAR2,
	p_drawdown_no 			IN 	lptbs_contract_master.PARTY_DRAWDOWN_NO%TYPE := 0,
	p_product_type		 	IN 	lptbs_contract_master.PRODUCT_TYPE%TYPE := NULL,
	P_COUNTERPARTY		 	IN 	lptbs_contract_master.COUNTERPARTY%TYPE := NULL,
	p_auth_status		 	IN 	VARCHAR2 := 'U',
	p_value_date		 	IN 	oltbs_dly_msg_out.VALUE_DATE%TYPE := NULL,
	p_Called_From 			IN 	VARCHAR2 DEFAULT 'O' 
	)
	RETURN BOOLEAN;  

FUNCTION fn_Upd_Party_Balance(
	p_party_contract_ref_no 	IN	oltbs_contract.contract_ref_no%TYPE,
	p_event_code 			IN 	lbtb_party_event_master_upload.EVENT_CODE%TYPE,
	p_amount 			IN 	NUMBER,
	p_ccy 				IN 	VARCHAR2,
	p_err_code 	 		IN OUT 	VARCHAR2,
	p_err_params 			IN OUT  VARCHAR2
	)
	RETURN BOOLEAN;

FUNCTION fn_backup_propagation_master(
	p_ref_no			IN	lbtbs_propagation_master.borrower_ref_no%TYPE,
	p_err_code			OUT	VARCHAR2,
	p_err_param			OUT	VARCHAR2
	)
	RETURN BOOLEAN;
--04-SEP-2006 FCC V.CL RELEASE 7.1 changes for populating mapping table start	
FUNCTION fn_ins_event_mapping (
	p_ls_event_mapping	IN	lbtbs_borr_part_event_mapping%ROWTYPE,
	pErrorCode 		IN OUT 	VARCHAR2
	) 
	RETURN BOOLEAN;	
--04-SEP-2006 FCC V.CL RELEASE 7.1 changes for populating mapping table end

--FLEXCUBE V.CL Release 7.1 ITR2 SFR#6, Mithilesh, 061003 Start

--10-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR1 Retro Till no#320,SFR No#135,its already available in sql.
FUNCTION fn_populate_part_mis
	(	p_referenceNo			IN	VARCHAR2
	,	p_participant			IN	VARCHAR2
	,	p_borrower_contract_ref_no	IN	VARCHAR2
	,	p_currency			IN	VARCHAR2
	)
RETURN BOOLEAN;
--10-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR1 Retro Till no#320,SFR No#135, its already available in sql.

--06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#1346 Start By Swapnasish
--CITIUS-LS#1346 Starts
FUNCTION fn_populate_part_mis
	(	p_referenceNo				IN	VARCHAR2
	,	p_participant				IN	VARCHAR2
	,	p_borrower_contract_ref_no	IN	VARCHAR2
	,	p_currency					IN	VARCHAR2
	,	p_contract_mis_record		IN	oltbs_class_mapping%ROWTYPE
	)
RETURN BOOLEAN;
--CITIUS-LS#1346 Ends
--06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#1346 End By Swapnasish
FUNCTION fn_liquidate_participants
         (
         p_borrow_contract_ref_no        IN       oltbs_contract.contract_ref_no%TYPE,
         p_error_code                    IN OUT   VARCHAR2,
         p_error_param                   IN OUT   VARCHAR2
         )
RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.1 ITR2 SFR#6, Mithilesh, 061003 End
--10-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR1 SFR#124, Retro Changes CITIUS-LS-277, 10-Dec-2007,  Added a new function Fn_check_propagation ,Starts
FUNCTION Fn_check_propagation
	(	p_borrower_ref	IN	VARCHAR2,
		p_contract_type IN  VARCHAR2,
		p_err_code		IN  OUT VARCHAR2,
		p_err_param		IN  OUT VARCHAR2
		)
RETURN BOOLEAN;
--10-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR1 SFR#124, Retro Changes CITIUS-LS-277, 10-Dec-2007,  Added a new function Fn_check_propagation ,Ends
--29-APR-2009 FLEXCUBE V.CL Release 7.6 Sighting Fund Changes Manas starts
FUNCTION fn_process_sighting_funds_part
		(
		p_part_contract_ref_no	IN lptbs_contract_master.contract_ref_no%type,
		p_borr_contract_ref_no	IN oltbs_contract.contract_ref_no%type,
		p_event_code 			IN oltbs_contract_event_log.event_code%type,
		p_ccy 					IN oltbs_contract.contract_ccy%type,
		p_borr_value_date 		IN DATE,
		p_borr_esn				IN oltbs_contract_event_log.event_seq_no%TYPE, --CITIUS-LS#5912
		p_err_code 				IN OUT VARCHAR2,
		P_err_params			IN OUT VARCHAR2
		)
RETURN BOOLEAN;
--29-APR-2009 FLEXCUBE V.CL Release 7.6 Sighting Fund Changes Manas ends

--07-JUN-2011 FLEXCUBE V.CL Release 7.9 VOL2 FS Tag 8 changes starts
FUNCTION fn_coll_participant
		(
		p_contract_ref_no	IN		oltbs_contract.contract_ref_no%TYPE,
		p_err_code		IN	OUT	VARCHAR2,
		p_err_param		IN	OUT	VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION fn_process_coll_event 
		(
		p_contract_ref_no      IN 	oltbs_contract.contract_ref_no%TYPE,
		--15-JUN-2011 FLEXCUBE V.CL Release 7.9 VOL2 FS Tag 8 changes start
		--p_esn			IN 	VARCHAR2, 
		p_esn			IN 	NUMBER, 
		--15-JUN-2011 FLEXCUBE V.CL Release 7.9 VOL2 FS Tag 8 changes end
		p_event_processed	OUT	VARCHAR2, --14-JUL-2011 Flexcube V.CL Release 7.9 FS Vol2 Tag 08 ITR1#169 changes
		p_err_code  		IN OUT  VARCHAR2,
		p_err_param 		IN OUT  VARCHAR2
		)
RETURN BOOLEAN;

--14-JUL-2011 Flexcube V.CL Release 7.9 FS Vol2 Tag 08 ITR1#169 changes start
FUNCTION fn_coll_adjustment
	(
	p_contract_ref_no      IN		oltbs_contract.contract_ref_no%TYPE,
	p_esn			IN		NUMBER,
	p_err_code  		IN OUT	VARCHAR2,
	p_err_param 		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--14-JUL-2011 Flexcube V.CL Release 7.9 FS Vol2 Tag 08 ITR1#169 changes end

FUNCTION fn_process_coll_batch 
		(
		p_branch		IN		oltms_branch.branch_code%TYPE,
		p_proc_date	IN		DATE,
		p_product		IN		oltms_product.product_code%TYPE,
		p_com_freq	IN		NUMBER,
		p_err_code  	IN OUT	VARCHAR2,
		p_err_param 	IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION fn_coll_batch_a_contract
		(
		p_contract_ref_no	IN		oltbs_contract.contract_ref_no%TYPE,
		p_currency		IN		oltbs_contract.contract_ccy%TYPE,
		p_proc_date		IN		DATE,
		p_err_code  		IN OUT	VARCHAR2,
		p_err_param 		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;
--07-JUN-2011 FLEXCUBE V.CL Release 7.9 VOL2 FS Tag 8 changes ends

--10-APR-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO EURCITIPLC#18855 changes starts
FUNCTION fn_check_propagation_userinput
	(	p_borrower_ref	IN	VARCHAR2,
		p_component     IN      VARCHAR2,		
		p_err_code	IN OUT  VARCHAR2,
		p_err_param	IN OUT  VARCHAR2
	)
RETURN BOOLEAN;
--10-APR-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO EURCITIPLC#18855 changes ends
--OBCL_14.6_#34084316  CHANGES 
 FUNCTION Fn_Part_Amount_Calc(p_Borrow_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                               p_Borrow_Event_Date      IN DATE,
                               p_Borrow_Value_Date      IN DATE,
                               p_Contract_Type          IN Lbtb_Party_Event_Master_Upload.Contract_Type%TYPE,
                               p_Esn                    IN Lbtb_Party_Event_Master_Upload.Event_Seq_No%TYPE,
                               p_Event_Code             IN Lbtb_Party_Event_Master_Upload.Event_Code%TYPE,
                               p_Err_Code               IN OUT VARCHAR2,
                               p_Err_Params             IN OUT VARCHAR2)
    RETURN BOOLEAN; 
	--OBCL_14.6_#34084316  CHANGES 
END lppks_contract;
/
CREATE or replace  SYNONYM lppkss_contract FOR lppks_contract
/