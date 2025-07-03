CREATE OR REPLACE PACKAGE olpks_lt_xml_proc
IS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_lt_xml_proc.SPC
**
** Module	: LT - SECONDARY LOAN TRADING
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
/* CHANGE-HISTORY
15-06-2008 - New object created for LQT-Interface with FLEXCUBE for LT Module.
06-Jan-2012 Flexcube V.CL Release 7.10, LQT Trade level Settlement Change- Added a new function to generate the Trade level LQT Acknowledgement.
*/

PROCEDURE pr_xmlin
(
	p_Trans_id	IN	VARCHAR2,
	p_Trans_type	IN	VARCHAR2,
	p_Trans_Action	IN	VARCHAR2,
	p_Source_code	IN	VARCHAR2,
	p_Trans_rectype	IN	VARCHAR2,
	p_Trans_key	IN	VARCHAR2,
	p_Trans_data	IN	VARCHAR2,
	p_Trans_xml	IN	Long
);

FUNCTION fn_Send_Reply
(
	p_Source_Code	IN 	oltbs_lt_trade.Source_Code%type,
	p_Trans_Id	IN 	oltbs_lt_trade.Trans_ID%type,
	p_Trans_Type	IN 	VARCHAR2,
	p_Status	IN 	oltbs_lt_trade.Upload_Status%type,
	p_Proc_TimeStamp	IN 	DATE,
	p_Dest_Ref_No	IN 	tltbs_contract_master.Contract_Ref_no%Type,
	p_Error_Code	IN OUT	VARCHAR2,
	p_Error_Param	IN OUT	VARCHAR2
)
RETURN BOOLEAN;

FUNCTION fn_cmtred_hoff_reply
(
	p_ref_no	IN	lbtb_cmtred_hoff_borr.borrower_ref_no%TYPE,
	p_esn		IN	lbtb_cmtred_hoff_borr.event_seq_no%TYPE,
	p_seq_no	IN	lbtb_cmtred_hoff_borr.sequence_no%TYPE,
	p_error_code	IN OUT	VARCHAR2,
	p_error_params	IN OUT	VARCHAR2
)
RETURN BOOLEAN ;

FUNCTION fn_tckt_sttl_hoff_reply
	 (
	  p_ref_no			  IN TLTB_TICKET_MASTER.ticket_id%type,
	  p_error_code            IN OUT VARCHAR2,
	  p_error_params          IN OUT VARCHAR2
	  )

RETURN BOOLEAN ;
--06-Jan-2012 Flexcube V.CL Release 7.10, LQT Trade level Settlement Change Start
FUNCTION fn_tckt_trade_sttl_hoff_reply
	 (
	  p_contract_ref_no	  IN oltbs_contract.contract_ref_no%TYPE
	  ,p_ref_no		  IN TLTB_TICKET_MASTER.ticket_id%type
	  ,p_error_code            IN OUT VARCHAR2
	  ,p_error_params          IN OUT VARCHAR2
	  )
RETURN BOOLEAN;
--06-Jan-2012 Flexcube V.CL Release 7.10, LQT Trade level Settlement Change End
END olpks_lt_xml_proc;
/
CREATE OR REPLACE SYNONYM olpkss_lt_xml_proc FOR olpks_lt_xml_proc
/