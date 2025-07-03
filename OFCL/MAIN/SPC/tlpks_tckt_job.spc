CREATE OR REPLACE PACKAGE tlpks_tckt_job
IS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : tlpks_tckt_job.SPC
**
** Module       : LT - SECONDARY LOAN TRADING
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
---------------------------------------------------------------------------------------------------

08-JUL-2008 FLEXCUBE V.CL Release 7.4 new unit created to handle the ticket settlement processing
10-OCT-2009 CITIUS-LS#6751 Changes for New utility screen to process all SLT operations in one screen to take the debug
22-Feb-2010 FLEXCUBE V.CL Release 7.6 CITIUS RETRO CITIUS-LS#7114 ,"Settlement resulting in negative position for participant on tranche" should be blocked
13-OCT-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag06 Netting and Combined Settlement Trading changes
---------------------------------------------------------------------------------------------------
*/
PROCEDURE pr_process_job_setl
(	p_branch		IN	CHAR
	,p_ticket_id	IN	tltbs_ticket_master.ticket_id%TYPE  DEFAULT 'ALL'--CITIUS-LS#6751
)
;	

FUNCTION fn_process_for_settl
	(
	p_ticket_id			IN	tltbs_ticket_master.ticket_id%type,
	p_actl_settl_date	IN	tltbs_ticket_master.actual_settl_date%type,
	p_error_code		IN	OUT	VARCHAR2,
	p_error_param		IN	OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_settl_for_a_trade
	(
	p_ticket_id		IN	tltbs_ticket_detail.ticket_id%type,
	p_trade_ref_no		IN	tltbs_ticket_detail.trade_ref_no%type,
	p_fmem_source		IN	tltbs_ticket_detail.funding_memo_source%type,
	P_expt_settl_date	IN	tltbs_ticket_detail.expt_settl_date%type,
	P_actl_settl_date	IN	tltbs_ticket_master.actual_settl_date%type,
	p_agency_id		IN	tltbs_ticket_detail.agency_id%type,
	p_error_code		IN OUT	VARCHAR2,
	p_error_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_get_agency_confirmation
	(p_ticket_id	IN	TLTB_TICKET_MASTER.ticket_id%type)
	RETURN CHAR;

/*PROCEDURE pr_process_job_auth
(p_branch	IN	CHAR)
;	*/
FUNCTION fn_ticket_auth
	(p_ticket_id	 IN	TLTB_TICKET_MASTER.ticket_id%type,
	 p_ticket_ref_no IN	TLTB_TICKET_MASTER.ticket_ref_no%type,
	 p_err_code	 IN OUT	VARCHAR2,
	 p_err_params	 IN OUT VARCHAR2
	)
RETURN BOOLEAN;
FUNCTION fn_process_for_auth
	(
	p_ticket_id	IN		tltbs_ticket_master.ticket_id%type,
	p_error_code	IN	OUT	VARCHAR2,
	p_error_param	IN	OUT	VARCHAR2
	)
RETURN BOOLEAN;

/*FUNCTION fn_auth_for_a_trade
	(
	p_ticket_id	IN		tltbs_ticket_master.ticket_id%type,
	p_trade_ref_no	IN		tltbs_ticket_detail.trade_ref_no%type,
	p_error_code	IN	OUT	VARCHAR2,
	p_error_param	IN	OUT	VARCHAR2
	)
RETURN BOOLEAN;*/

PROCEDURE pr_exception_log
	(
	p_ref_no	IN	tltbs_ticket_detail.trade_ref_no%type,
	p_event_seq_no	IN	NUMBER,
	p_event_code	IN	VARCHAR2,		
	p_error_code	IN	VARCHAR2,
	p_error_param	IN	VARCHAR2,
	p_tbl_name	IN	VARCHAR2
	);
 
PROCEDURE pr_update_status
	(
	p_ticket_id	IN	TLTB_TICKET_MASTER.ticket_id%type,
	p_trade_ref_no	IN	TLTB_TICKET_DETAIL.trade_ref_no%type,
	p_action_code	IN	VARCHAR2,
	p_table_type	IN	VARCHAR2,
	p_status	IN	tltbs_ticket_master.ticket_status%type
	);
--CITIUS-LS#6751 additional changes
FUNCTION fn_obtain_ticket_lock
	(
	p_ticket_refno	IN	tltbs_ticket_master.ticket_ref_no%TYPE,
	p_err_code		IN 	OUT	ERTBS_MSGS.Err_Code%Type,
	p_err_param		IN 	OUT	VARCHAR2
	)
RETURN BOOLEAN;
--CITIUS-LS#6751 additional changes ends

--22-Feb-2010 FLEXCUBE V.CL Release 7.6 CITIUS RETRO CITIUS-LS#7114 ,"Settlement resulting in negative position for participant on tranche" should be blocked start
FUNCTION fn_validate_settlement_handoff
	(
	p_ticket_id		IN	tltbs_ticket_master.ticket_id%TYPE,
	p_trade_ref_no		IN	tltbs_contract_master.contract_ref_no%TYPE,
	p_actual_settl_date	IN	DATE,
	p_err_code		IN 	OUT	ERTBS_MSGS.Err_Code%Type,
	p_err_param		IN 	OUT	VARCHAR2
	)
RETURN BOOLEAN;
--22-Feb-2010 FLEXCUBE V.CL Release 7.6 CITIUS RETRO CITIUS-LS#7114 ,"Settlement resulting in negative position for participant on tranche" should be blocked end
--13-OCT-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag06 Netting and Combined Settlement Trading changes start
FUNCTION fn_obtain_consol_ticket_lock
	(
	p_consol_ticket_refno	IN			tltbs_consol_ticket_master.consol_ticket_ref_no%TYPE,
	p_err_code					IN OUT	VARCHAR2,
	p_err_param					IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_get_consol_ticket_ref_no
(
	p_trade_ref_no				IN			tltbs_consol_trade_detail.trade_ref_no%TYPE,
	p_consol_ticket_ref_no	OUT		tltbs_consol_ticket_master.consol_ticket_ref_no%TYPE,
	p_error_code					IN OUT	VARCHAR2,
	p_error_param				IN OUT	VARCHAR2
)
RETURN BOOLEAN;

PROCEDURE pr_proc_consol_ticket_setl
(
	p_branch	IN		VARCHAR2
);

PROCEDURE pr_proc_for_consol_settl
(
	p_consol_ticket_ref_no	IN		tltbs_consol_ticket_master.consol_ticket_ref_no%TYPE
);

FUNCTION fn_populate_consol_payment
(
	p_consol_ticket_ref_no		IN			tltbs_consol_ticket_master.consol_ticket_ref_no%TYPE,
	p_error_code						IN OUT	VARCHAR2,
	p_error_param					IN OUT	VARCHAR2
)
RETURN BOOLEAN;

FUNCTION fn_consol_ticket_auth
(
	p_consol_ticket_ref_no	IN			TLTB_CONSOL_TICKET_MASTER.consol_ticket_ref_no%TYPE,
	p_err_code					IN OUT	VARCHAR2,
	p_err_param					IN OUT	VARCHAR2
)
RETURN BOOLEAN;
--13-OCT-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag06 Netting and Combined Settlement Trading changes end

END tlpks_tckt_job;
/
CREATE or replace SYNONYM tlpkss_tckt_job FOR tlpks_tckt_job
/