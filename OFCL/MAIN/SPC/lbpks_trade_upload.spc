CREATE OR REPLACE package lbpks_trade_upload
IS

/*-------------------------------------------------------------------------------------------------
**
** File Name	: lbpks_trade_upload.SPC
**
** Module	: LS
**
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
  ----------------------------------------------------------------------------------------
  */
  /* CHANGE HISTORY
  25-JUN-2009 FLEXCUBE V.CL Release 7.5 LOT1.1 Clear Par Changes NEW PACKAGE CREATED
  01-JUL-2009 FLEXCUBE V.CL Release 7.5 LOT1.1 Clear Par Changes IUT Fixes 
  07-JUL-2009 FLEXCUBE V.CL Release 7.5 LOT1.1 ITR1,SFR#1 fixes 
  09-JUL-2009 FLEXCUBE V.CL Release 7.5 lot1.1 ITR1 SFR#1, citi trade detail changes
  16-JUL-2009 FLEXCUBE V.CL Release 7.5 lot1.1 ITR1 SFR#90,Included a new function for validations
  17-JUL-2009 FLEXCUBE V.CL Release 7.5 Lot1.1 ITR1 SFR#61, sending ACK/NACK upon population of agency confirmation browser.
  20-JUL-2009 FLEXCUBE V.CL Release 7.5 Lot1.1 ITR1 SFR#61, populating the IN table oltbs_ls_trade from XML.
  21-JUL-2009 FLEXCUBE V.CL Release 7.5 Lot1.1 ITR1 SFR#130,New function for gtemp validation
  09-JUN-2010 Flexcube V.CL 7.7 FS Tag 05 Third Party Assignment Changes,New function  created for uploading the new field participant type
  25-FEB-2011 Flexcube V.CL Release 7.9, CITIUS Retro, #7621 System is not allowing to request the trade from clearpar through trade requesting browser in flexcube.
  28-FEB-2011 Flexcube V.CL Release 7.9, CITIUS Retro,#7496 pr_xmlin modified.
  03-MAR-2011 Flexcube V.CL Release 7.9, CITIUS Retro,7664 Added fn_validate_sfund 
  07-NOV-2011 Flexcube V.CL Release 7.10, FS Vol 1 Tag 8, Markit Trade Settlement Changes, 
  15-NOV-2011 Flexcube V.CL Release 7.10, FS Vol 1 Tag 8, Markit Trade Settlement Changes, 
  22-NOV-2011 Flexcube V.CL Release 7.10, FS Vol 1 Tag 8, Markit Trade Settlement Changes, Clearpar Trade Validations Changes
  21-JAN-2012 Flexcube V.CL Release 7.10 FS Vol1 Tag 08 IUT1#161 Changes, Adding new in paramter source_code to function fn_populate_citi_trade
  09-FEB-2012 Flexcube V.CL Release 7.10 FS Vol1 Tag 08 ITR1#36 Changes, upload_status population in ops table
  09-FEB-2012 Flexcube V.CL Release 7.10 FS Vol1 Tag 08 ITR1#54, Tax rule validation handled
  21-Feb-2012 Flexcube V.CL Release 7.10 FS Vol1 Tag 08 ITR1#139, Markit Trade Settlement,Added changes in order to pick the trade ref no for clearpar trades.
  06-JUN-2012 Flexcube V.CL Release 7.11, Retro,CITIUS#13787, Flexcube was not consume unsettled trades properly.
								  Currently EXT_TRADE_ID  and TRANSACTION_ID in oltbs_ls_trade has been populated with same value. 
								  Also currently flexcube will be consuming only the closed trades, where as from 7.10, flexcube should be able to consume both un-settled(pending closure) 
								  and settled(closed) trades from Clearpart. 
								  In order to achieve this, the EXT_TRADE_ID has to be populated with origination EXT_TRADE_ID if exists. 
								  This helps while deleting the original record and to keep the latest consumed record.
  22-JUN-2012 Flexcube V.CL Release 7.11 Retro,CITIUS#13943 Flexcube was not consume unsettled trades properly.Procedure introduced instead of function.
  						   Currently EXT_TRADE_ID  and TRANSACTION_ID in oltbs_ls_trade has been populated with same value. Also currently flexcube will be consuming only the closed trades, where as from 7.10, flexcube should be able to consume both un-settled(pending closure) and settled(closed) trades from Clearpart. In order to achieve this, the EXT_TRADE_ID has to be populated with origination EXT_TRADE_ID if exists. This helps while deleting the original record and to keep the latest consumed record.
22-AUG-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 JIRA#150080-7778 changes,Added function to validate SSI Mnemonic and entity details maintenance during Clear par trade processing .						   

  Changed By         : Jayaram N
  Date               : 21-Jan-2020
  Change Description : Primary Delayed Compensation
  Search String      : OBCL14.4:SFR#29959798:Primary_Delayed_Compensation 
--------------------------------
  */

TYPE P_rec_agency_browser IS TABLE OF lbtbs_agency_confirm_browser%ROWTYPE INDEX BY BINARY_INTEGER;
l_rec_agency_browser P_rec_agency_browser;

TYPE p_Rec_Upl_Error_log IS TABLE OF tltbs_contract_exception%ROWTYPE INDEX BY BINARY_INTEGER;
lTbl_Upl_error_log p_Rec_Upl_Error_log;

--07-NOV-2011 Flexcube V.CL Release 7.10, FS Vol 1 Tag 8, Markit Trade Settlement Changes start here

TYPE P_trade_processing_queue IS TABLE OF lbtbs_trade_processing_queue%ROWTYPE INDEX BY PLS_INTEGER;
l_trade_processing_queue 	P_trade_processing_queue;
--07-NOV-2011 Flexcube V.CL Release 7.10, FS Vol 1 Tag 8, Markit Trade Settlement Changes end here

--09-FEB-2012 Flexcube V.CL Release 7.10 FS Vol1 Tag 08 ITR1#36 Changes start here
TYPE p_markit_ops_table IS TABLE OF oltbs_markit_trade_ops%ROWTYPE INDEX BY PLS_INTEGER;
l_markit_ops_table 	p_markit_ops_table;
--09-FEB-2012 Flexcube V.CL Release 7.10 FS Vol1 Tag 08 ITR1#36 Changes end here

--FUNCTION fn_interface_upload --28-FEB-2011 Flexcube V.CL Release 7.9, CITIUS Retro,#7496 changes
PROCEDURE pr_interface_upload --28-FEB-2011 Flexcube V.CL Release 7.9, CITIUS Retro,#7496 changes
(
P_SOURCE_CODE  IN                varchar2 
,p_ext_trade_id	IN	VARCHAR2 DEFAULT 'ALL' --22-NOV-2011 Flexcube V.CL Release 7.10, FS Vol 1 Tag 8, Markit Trade Settlement Changes here 
--P_ERROR_CODE    IN OUT            varchar2,
--P_ERROR_PARAM   IN OUT            varchar2
);
--RETURN BOOLEAN; --28-FEB-2011 Flexcube V.CL Release 7.9, CITIUS Retro,#7496 changes

--FLEXCUBE V.CL Release 7.5 Lot1.1 ITR1 SFR#61, populating the IN table oltbs_ls_trade from XML, Starts
PROCEDURE pr_tsUpl
(
prectype	IN	VARCHAR2,
pts		IN	VARCHAR2,
pdtf		IN	VARCHAR2,
pProc		IN	VARCHAR2,
pidentifier	OUT	VARCHAR2,
pFlag		OUT 	Number,
perr		IN OUT 	VARCHAR2,
pprms		IN OUT 	VARCHAR2
);

PROCEDURE pr_xmlin
(
p_Trans_id	IN	VARCHAR2,
p_Trans_type	IN	VARCHAR2,
p_Trans_Action	IN	VARCHAR2,
p_Source_code	IN	VARCHAR2,
p_Trans_rectype	IN	VARCHAR2,
p_Trans_key	IN	VARCHAR2,
p_Trans_data	IN	VARCHAR2,
p_Trans_xml	IN	Long,
p_flag		OUT 	NUMBER --28-FEB-2011 Flexcube V.CL Release 7.9, CITIUS Retro,#7496 changes
);
--FLEXCUBE V.CL Release 7.5 Lot1.1 ITR1 SFR#61, populating the IN table oltbs_ls_trade from XML, Ends

FUNCTION fn_get_trade_ref_no
(
P_TRANCHE_REF	IN	lbtbs_agency_confirm_browser.tranche_ref_no%type,
P_TRANSFEROR	IN	lbtbs_agency_confirm_browser.transferor%type,	 
P_TRANSFEREE    IN	lbtbs_agency_confirm_browser.transferee%type,
P_TRANSFER_AMT	IN	lbtbs_agency_confirm_browser.transfer_amount%type,	
p_lqt_ticketid			IN			tltbs_contract_master.ticket_id%type,--28-FEB-2011 Flexcube V.CL Release 7.9, CITIUS Retro,#7496 changes
--07-NOV-2011 Flexcube V.CL Release 7.10, FS Vol 1 Tag 8, Markit Trade Settlement Changes start here
P_EXT_TRADE_ID		IN		oltbs_ls_trade.EXT_TRADE_ID%TYPE DEFAULT NULL,
P_CUSIP_ID		IN		oltbs_ls_trade.CUSIP_ID%TYPE DEFAULT NULL,
--07-NOV-2011 Flexcube V.CL Release 7.10, FS Vol 1 Tag 8, Markit Trade Settlement Changes end here
P_TRADE_REF_NO  OUT	lbtbs_agency_confirm_browser.trade_ref_no%type,	
p_posid_transferor		OUT			tltms_position_identifier.position_identifier%type,--28-FEB-2011 Flexcube V.CL Release 7.9, CITIUS Retro,#7496 changes
p_posid_transferee		OUT			tltms_position_identifier.position_identifier%type,--28-FEB-2011 Flexcube V.CL Release 7.9, CITIUS Retro,#7496 changes
p_transaction_id	IN	lbtbs_agency_confirm_browser.transaction_id%TYPE,--21-Feb-2012 Flexcube V.CL Release 7.10 FS Vol1 Tag 08 ITR1#139, Markit Trade Settlement change	
P_ERROR_CODE	IN OUT	VARCHAR2,
P_ERROR_PARAM	IN OUT	VARCHAR2
)
RETURN BOOLEAN;

--FUNCTION fn_populate_processing_queue --07-NOV-2011 Flexcube V.CL Release 7.10, FS Vol 1 Tag 8, Markit Trade Settlement Changes here
FUNCTION fn_pop_part_details --07-NOV-2011 Flexcube V.CL Release 7.10, FS Vol 1 Tag 8, Markit Trade Settlement Changes here
(
--p_source_code           in              oltbs_ls_trade.SOURCE_CODE%TYPE, --22-NOV-2011 Flexcube V.CL Release 7.10, FS Vol 1 Tag 8, Markit Trade Settlement Changes here --07-NOV-2011 Flexcube V.CL Release 7.10, FS Vol 1 Tag 8, Markit Trade Settlement Changes here
p_browser_table	IN            lbtbs_agency_confirm_browser%rowtype,
p_error_code		IN OUT        VARCHAR2,
p_error_param		IN OUT        VARCHAR2
)
RETURN BOOLEAN;

FUNCTION fn_insert_history
(p_branch		IN            oltbs_contract.branch%type,
p_error_code		IN OUT        VARCHAR2,
p_error_param		IN OUT        VARCHAR2
)
RETURN BOOLEAN;

FUNCTION Fn_Populate_gtemp_consol 
(P_TRANCHE_REF	    IN		      lbtbs_agency_confirm_browser.tranche_ref_no%type,
P_PARTICIPANT	    IN		      lbtbs_agency_confirm_browser.transferor%type,	 
P_VALUE_DATE	    IN		      lbtbs_agency_confirm_browser.value_date%type,
P_TRANSFER_AMT	    IN		      lbtbs_agency_confirm_browser.transfer_amount%type,	
P_ERROR_CODE        IN OUT            VARCHAR2,
P_ERROR_PARAM       IN OUT            VARCHAR2
)
RETURN BOOLEAN;

FUNCTION fn_pram_upload 
(P_TRANCHE_REF	    IN		      lbtbs_trade_processing_queue.tranche_ref_no%type,	
P_PROCESS_STATUS    IN		      lbtbs_trade_processing_queue.process_status%type,		
P_ERROR_CODE        IN OUT            VARCHAR2,
P_ERROR_PARAM       IN OUT            VARCHAR2
)
RETURN BOOLEAN;

PROCEDURE Pr_pram_upload_job
(p_branch	IN	oltbs_contract.branch%type,
p_process_seq	IN	NUMBER
);

FUNCTION fn_interface_upload
(P_SOURCE_CODE  	IN	VARCHAR2,
P_TRANSACTION_ID	IN	oltbs_ls_trade.transaction_id%type,
P_EXT_AGENCY_REF	IN	oltbs_ls_trade.ext_agency_ref%type,	
P_EXT_TICKET_ID		IN	oltbs_ls_trade.ext_ticket_id%type,
P_EXT_TRADE_ID		IN	oltbs_ls_trade.ext_trade_id%type,
P_ERROR_CODE    	IN OUT	VARCHAR2,
P_ERROR_PARAM   	IN OUT	VARCHAR2
)
RETURN BOOLEAN;
--01-JUL-2009 FLEXCUBE V.CL Release 7.5 LOT1.1 Clear Par Changes IUT Fixes
FUNCTION fn_send_reply
(P_TRANSACTION_ID	IN	VARCHAR2, 
P_TRANSACTION_TYPE	IN	VARCHAR2,
P_STATUS		IN	VARCHAR2,
--p_value_date		IN	DATE,  --FLEXCUBE V.CL Release 7.5 Lot1.1 ITR1 SFR#61, sending ACK/NACK, commented
P_ERROR_CODE		IN OUT	VARCHAR2,
P_ERROR_PARAM		IN OUT	VARCHAR2
)
RETURN BOOLEAN;
--01-JUL-2009 FLEXCUBE V.CL Release 7.5 LOT1.1 Clear Par Changes IUT Fixes
--07-JUL-2009 FLEXCUBE V.CL Release 7.5 LOT1.1 Clear Par Changes,sfr#1 fixes 
FUNCTION fn_populate_citi_trade
(
p_source_code		IN 	lbtbs_agency_confirm_browser.trade_source%type, --21-JAN-2012 Flexcube V.CL Release 7.10 FS Vol1 Tag 08 IUT1#161 Changes here
p_ext_trade_id		IN	lbtbs_agency_confirm_browser.ext_trade_id%type, --FLEXCUBE V.CL Release 7.5 lot1.1 ITR1 SFR#1, citi trade detail changes, added
 p_tranche_ref_no	IN	lbtbs_agency_confirm_browser.tranche_ref_no%type,
 p_trade_ref_no		IN	lbtbs_agency_confirm_browser.trade_ref_no%type,
 p_value_date		IN	lbtbs_agency_confirm_browser.value_date%type,
 p_transferor		IN	lbtbs_agency_confirm_browser.transferor%type,
 p_transferee		IN	lbtbs_agency_confirm_browser.transferee%type,
 p_transfer_amt		IN	lbtbs_agency_confirm_browser.transfer_amount%type, --FLEXCUBE V.CL Release 7.5 lot1.1 ITR1 SFR#1, citi trade detail changes, added
 p_error_code		IN OUT	varchar2,
 p_error_param		IN OUT	varchar2
)
RETURN BOOLEAN;
--07-JUL-2009 FLEXCUBE V.CL Release 7.5 LOT1.1 Clear Par Changes,sfr#1 fixes 
--16-JUL-2009 FLEXCUBE V.CL Release 7.5 lot1.1 ITR1 SFR#90,Included a new function for validations
FUNCTION fn_validations
(p_transaction_id	IN	oltbs_ls_trade.transaction_id%type,
p_tranche_ref		IN	lbtbs_agency_confirm_browser.tranche_ref_no%type,
p_transferor		IN	lbtbs_agency_confirm_browser.transferor%type,
p_transferee		IN	lbtbs_agency_confirm_browser.transferee%type,
p_value_date		IN	lbtbs_agency_confirm_browser.value_date%type,
--07-NOV-2011 Flexcube V.CL Release 7.10, FS Vol 1 Tag 8, Markit Trade Settlement Changes start here
p_source_code		IN	oltbs_ls_trade.source_code%TYPE,
--p_confirm_stat 		OUT	lbtbs_agency_confirm_browser.confirmation_status%type,
p_confirm_stat 		IN OUT	lbtbs_agency_confirm_browser.confirmation_status%TYPE,
--07-NOV-2011 Flexcube V.CL Release 7.10, FS Vol 1 Tag 8, Markit Trade Settlement Changes end here
p_error_code		IN OUT	VARCHAR2,
p_error_param		IN OUT	VARCHAR2
)
RETURN BOOLEAN;
--16-JUL-2009 FLEXCUBE V.CL Release 7.5 lot1.1 ITR1 SFR#90,Included a new function for validations
--21-JUL-2009 FLEXCUBE V.CL Release 7.5 Lot1.1 ITR1 SFR#130,New function for gtemp validation
FUNCTION fn_gtemp_validation
(P_TRANCHE_REF		IN	lbtbs_agency_confirm_browser.tranche_ref_no%type,
p_error_code		IN OUT	VARCHAR2,
p_error_param		IN OUT	VARCHAR2
)
RETURN BOOLEAN;
--21-JUL-2009 FLEXCUBE V.CL Release 7.5 Lot1.1 ITR1 SFR#130,New function for gtemp validation
--28-FEB-2011 Flexcube V.CL Release 7.9, CITIUS Retro,#7496 changes start
PROCEDURE pr_Log_Error
(
	p_Source_Code		IN	VARCHAR2,
	P_contract_ref		IN	oltbs_ls_trade.ext_agency_ref%type,
	p_Err_Seq		IN OUT	NUMBER,
	p_Error_Code		IN	VARCHAR2,
	p_Error_Param		IN	VARCHAR2
	,p_mkt_trd_id		IN	OLTB_LT_MARKIT_EXCEPTION.markit_trade_id%TYPE,--07-NOV-2011 Flexcube V.CL Release 7.10, FS Vol 1 Tag 8, Markit Trade Settlement Changes here
	p_transaction_id	IN	lbtbs_agency_confirm_browser.transaction_id%type--07-NOV-2011 Flexcube V.CL Release 7.10, FS Vol 1 Tag 8
);

FUNCTION fn_get_mapping
(
p_source_code		IN	oltbs_ls_trade.SOURCE_CODE%TYPE, --07-NOV-2011 Flexcube V.CL Release 7.10, FS Vol 1 Tag 8, Markit Trade Settlement Changes here
p_ext_agency_ref    IN		lbtbs_agency_confirm_browser.ext_agency_ref%TYPE,
 p_ext_trade_id		 IN     lbtbs_agency_confirm_browser.ext_trade_id%TYPE,
 p_cusip_id          IN		lbtbs_agency_confirm_browser.cusip_no%TYPE,
 p_ext_transferor 	 IN		lbtbs_agency_confirm_browser.ext_transferor_id%TYPE,
 p_seller_clearparid IN		lbtbs_agency_confirm_browser.seller_clearparid%TYPE,
 p_ext_transferee	 IN		lbtbs_agency_confirm_browser.ext_transferee_id%TYPE,
 p_buyer_clearparid	 IN		lbtbs_agency_confirm_browser.buyer_clearparid%TYPE,
 p_tranche_ref	     OUT	lbtbs_agency_confirm_browser.tranche_ref_no%TYPE,
 p_transferor		 OUT	lbtbs_agency_confirm_browser.transferor%TYPE,
 p_transferee		 OUT	lbtbs_agency_confirm_browser.transferee%TYPE,
 p_trade_ref 		 OUT    lbtbs_agency_confirm_browser.trade_ref_no%TYPE, --CITIUS-LS#7733
 p_transaction_id	IN	oltbs_ls_trade.transaction_id%TYPE, --15-NOV-2011 Flexcube V.CL Release 7.10, FS Vol 1 Tag 8, Markit Trade Settlement Changes here 
 --07-NOV-2011 Flexcube V.CL Release 7.10, FS Vol 1 Tag 8, Markit Trade Settlement Changes start here
 p_error_code	IN OUT	VARCHAR2,
 p_error_param	IN OUT	VARCHAR2
 --07-NOV-2011 Flexcube V.CL Release 7.10, FS Vol 1 Tag 8, Markit Trade Settlement Changes end here
)
RETURN BOOLEAN;
PROCEDURE pr_check_dup_ticket
(
	p_ticket_id   IN oltbs_ls_trade.ext_ticket_id%TYPE,
	p_agency_ref  IN oltbs_ls_trade.ext_agency_ref%TYPE,
	p_execute_date IN oltbs_ls_trade.execute_date%TYPE,
	p_response   OUT NUMBER
);

FUNCTION fn_identify_citi_trade
( p_trasferor       IN    lbtbs_agency_confirm_browser.transferor%TYPE,
  p_trasferee       IN    lbtbs_agency_confirm_browser.transferee%TYPE,
  p_primary_trade   IN    lbtbs_agency_confirm_browser.primary_trade%TYPE,
  p_citi_trade      OUT   lbtbs_agency_confirm_browser.citi_trade%TYPE,
  p_err_code        OUT   VARCHAR2,
  p_err_param       OUT   VARCHAR2
)
RETURN BOOLEAN;
--28-FEB-2011 Flexcube V.CL Release 7.9, CITIUS Retro,#7496 changes end
--25-FEB-2011 Flexcube V.CL Release 7.9, CITIUS Retro, #7621 Changes start
PROCEDURE pr_get_trade_by_ticket
(
p_ticket_id	IN	VARCHAR2
);
--25-FEB-2011 Flexcube V.CL Release 7.9, CITIUS Retro, #7621 changes end
--09-JUN-2010 Flexcube V.CL 7.7 FS Tag 05 Third Party Assignment Changes starts
FUNCTION fn_CLEARPAR_PRAM_validation
				(
				p_tranche_ref_no	IN		oltbs_contract.contract_ref_no%TYPE
				, p_ext_agency_ref	IN		lbtbs_agency_confirm_browser.ext_agency_ref%TYPE
				, p_ext_ticket_id	IN		lbtbs_agency_confirm_browser.ext_ticket_id%TYPE
				, p_ext_trade_id	IN		lbtbs_agency_confirm_browser.ext_trade_id%TYPE
				, p_pop_override	IN		VARCHAR2 DEFAULT 'N'
				, p_err_code		IN OUT	VARCHAR2
				, p_err_param		IN OUT	VARCHAR2
				)
RETURN BOOLEAN;
--09-JUN-2010 Flexcube V.CL 7.7 FS Tag 05 Third Party Assignment Changes ends

--03-MAR-2011 Flexcube V.CL Release 7.9, CITIUS Retro,7664 start
FUNCTION fn_check_before_consol
(p_tranche_ref_no IN oltbs_contract.contract_ref_no%TYPE
,p_ext_trade_id   IN lbtbs_agency_confirm_browser.ext_trade_id%TYPE
,p_err_code       OUT VARCHAR2
,p_err_param      OUT VARCHAR2
)
RETURN BOOLEAN;
--03-MAR-2011 Flexcube V.CL Release 7.9, CITIUS Retro,7664 end

--CITIUS-LS#7672 start
FUNCTION fn_validate_sfund
	( p_tranche_ref_no  IN VARCHAR2,
	  p_transferor      IN VARCHAR2,
	  p_transferee      IN VARCHAR2,
	  p_value_date      IN DATE,
	  p_err_code		OUT VARCHAR2,
	  p_err_param		OUT VARCHAR2 
	)
RETURN BOOLEAN;
--CITIUS-LS#7672 end
--07-NOV-2011 Flexcube V.CL Release 7.10, FS Vol 1 Tag 8, Markit Trade Settlement Changes start here
FUNCTION fn_tax_rule_validation
			(
			p_transferor	IN	VARCHAR2,
			p_transferee	IN	VARCHAR2,
			p_value_date	IN	DATE,
			P_CCY		IN	VARCHAR2,--09-FEB-2012 Flexcube V.CL Release 7.10 FS Vol1 Tag 08 ITR1#54
			p_error_code	IN OUT	VARCHAR2,
			p_error_param	IN OUT	VARCHAR2
			)
RETURN BOOLEAN;



FUNCTION fn_check_posupd_msg_gen
(
p_borrower_ref_no	IN	oltbs_contract_master.contract_ref_no%TYPE
,p_process_date		IN	DATE
,p_err_code		IN OUT	VARCHAR2
,p_err_param		IN OUT	VARCHAR2
)
RETURN BOOLEAN;
FUNCTION fn_gen_markit_posupd
(
	p_branch		IN	oltbs_contract.branch%TYPE DEFAULT NULL,
	p_source_code		IN	lbtbs_upload_pram_consol.source_code%TYPE,
	p_trade_id		IN	lbtbs_agency_confirm_browser.ext_trade_id%type DEFAULT NULL,
	p_processing_date	IN	lbtbs_upload_pram_consol.value_date%TYPE,
	p_err_code		IN OUT	VARCHAR2,
	p_err_param		IN OUT	VARCHAR2
)
RETURN BOOLEAN;
--07-NOV-2011 Flexcube V.CL Release 7.10, FS Vol 1 Tag 8, Markit Trade Settlement Changes end here

--22-NOV-2011 Flexcube V.CL Release 7.10, FS Vol 1 Tag 8, Markit Trade Settlement Changes starts here
FUNCTION fn_populate_processing_queue
(
p_source_code		IN		oltbs_ls_trade.source_code%TYPE,
p_ext_trade_id		IN		oltbs_ls_trade.ext_trade_id%TYPE,
p_cusip_id        	IN    		oltbs_ls_trade.cusip_id%TYPE,--11-JAN-2018 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R723 FS Tag04
p_error_code		IN OUT		VARCHAR2,
p_error_param		IN OUT		VARCHAR2
)
RETURN BOOLEAN;

FUNCTION fn_get_trade_amount
(
	p_tranche_ref		IN	lbtbs_agency_confirm_browser.tranche_ref_no%type,
	p_transferor		IN	lbtbs_agency_confirm_browser.transferor%type,
	p_transfer_amount	IN 	OUT oltbs_ls_trade.transfer_amount%type,
	p_value_date		IN	DATE,
	p_error_code		IN 	OUT	VARCHAR2,
	p_error_param		IN 	OUT	VARCHAR2
 )
RETURN BOOLEAN;
FUNCTION fn_trade_validation
(
P_UPLOAD_TRADE		IN	oltbs_ls_trade%rowtype,
P_TRANCHE_REF		IN	lbtbs_agency_confirm_browser.tranche_ref_no%type,
P_TRANSFEROR		IN	lbtbs_agency_confirm_browser.transferor%type,
P_TRANSFEREE		IN	lbtbs_agency_confirm_browser.transferee%type,
P_CITI_TRADE		IN	VARCHAR2,
P_TRADE_AMT		IN	NUMBER, --OBCL14.4:SFR#29959798:Primary_Delayed_Compensation changes added
P_TRADE_REF		OUT	lbtbs_agency_confirm_browser.trade_ref_no%type,
P_TRANSACTION_ID	IN	lbtbs_agency_confirm_browser.TRANSACTION_ID%type,
P_ERROR_CODE		IN OUT	VARCHAR2,
P_ERROR_PARAM		IN OUT	VARCHAR2
 )
RETURN BOOLEAN;
--22-NOV-2011 Flexcube V.CL Release 7.10, FS Vol 1 Tag 8, Markit Trade Settlement Changes ends here
--22-JUN-2012 Flexcube V.CL Release 7.11 Retro,CITIUS#13943 changes Start
/*
--06-JUN-2012 Flexcube V.CL Release 7.11, Retro,CITIUS#13787 Starts
FUNCTION fn_check_ticket_already_exists
(
	p_ticket_id   IN 	oltbs_ls_trade.ext_ticket_id%TYPE,
	p_agency_ref  IN 	oltbs_ls_trade.ext_agency_ref%TYPE,
	p_trade_id	  OUT 	oltbs_ls_trade.ext_trade_id%TYPE
)
RETURN BOOLEAN;
--06-JUN-2012 Flexcube V.CL Release 7.11, Retro,CITIUS#13787 Ends
*/
PROCEDURE pr_check_ticket_already_exists
(
	p_ticket_id   IN 	oltbs_ls_trade.ext_ticket_id%TYPE,
	p_agency_ref  IN 	oltbs_ls_trade.ext_agency_ref%TYPE,
	p_trade_id	  OUT 	oltbs_ls_trade.ext_trade_id%TYPE
);
--22-JUN-2012 Flexcube V.CL Release 7.11 Retro,CITIUS#13943 changes End
--22-AUG-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 JIRA#150080-7778 changes start
FUNCTION fn_chk_ssimnic_entity_exists 
(
	p_contract_ref_no	IN	lbtb_trade_processing_queue.tranche_ref_no%TYPE,
	p_transferee		IN	lbtb_trade_processing_queue.transferee%TYPE,
	p_value_date		IN lbtb_trade_processing_queue.value_date%TYPE,
	p_error_code		IN OUT		VARCHAR2,
	p_error_param		IN OUT		VARCHAR2
)	
RETURN BOOLEAN;
--22-AUG-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 JIRA#150080-7778 changes ends;
end lbpks_trade_upload;
/
create or replace synonym lbpkss_trade_upload for lbpks_trade_upload
/