CREATE OR REPLACE PACKAGE olpks_trpks IS

/*----------------------------------------------------------------------------------------------------
**
** File Name    : olpks_trpks.SPC
**
** Module       : CORE
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
CHANGE HISTORY
08/06/2001	PLNCITI TIL NO 2199. Custom ref to be populated in daily log. Added an overloaded
		fucntion to generate next val of the sequence.

27-AUG-2002	FCC 4.1 OCT 2002 Changes from mainstream.Fn_get_batch_ref_no in parameter has been changed since 				     oltbs_upload_master_de.batch_no type is changed.
20-FEB-2004 FCC 4.5 LOT1 FAST CHANGES STARTS
15-Jun-2011 Flexcube V.CL Release 7.9, CITIUK Retro,EURCITIPLC-LD#8240, LND DB consolidation changes - Created new function to generate custom ref no for EURCITIPLC.
22-NOV-2011 Flexcube V.CL Release 7.10, FS Vol 1 Tag 8, Markit Trade Settlement Changes, For increasing the size of sequence number to 6 digits for message_seq_no of markit
*/


function FN_CREATE_SEQ_BR
	(pBranchCode 	IN	oltms_branch.branch_code%TYPE,
	 pErrorCode 	OUT	ERTBS_MSGS.err_code%TYPE)
return BOOLEAN;

PROCEDURE PR_CREATE_SEQ_BR_JOB
	( pJob		IN	INTEGER
	, pBranchCode 	IN	oltms_branch.branch_code%TYPE
	);

function FN_CREATE_SEQ_PRD
	(pBranchCode 	IN	oltms_branch.branch_code%TYPE,
	 pProductCode 	IN	oltms_product.product_code%TYPE,
	 pErrorCode 	OUT	ERTBS_MSGS.err_code%TYPE)
return BOOLEAN;

function FN_CREATE_SEQ_PRC
	(pBranchCode 	IN	oltms_branch.branch_code%TYPE,
	 pProcessCode 	IN	oltbs_process.process_code%TYPE,
	 pErrorCode 	OUT	ERTBS_MSGS.err_code%TYPE)
return BOOLEAN;


function FN_GET_PRODUCT_REFNO
	(pBranchCode	IN 	oltms_branch.branch_code%TYPE ,
	 pProductCode	IN 	oltms_product.product_code%TYPE ,
	 pDate  	IN 	date ,
	 pSerial  	OUT 	varchar2 ,
	 pReferenceNo 	OUT 	varchar2 ,
	 pErrorCode 	OUT 	ERTBS_MSGS.err_code%TYPE)
return boolean;

function FN_GET_PROCESS_REFNO
	(pBranchCode 	IN 	oltms_branch.branch_code%TYPE ,
	 pProcessCode 	IN 	VARCHAR2 ,
	 pDate  	IN 	DATE ,
	 pSerial  	OUT	VARCHAR2 ,
	 pReferenceNo 	OUT 	VARCHAR2 ,
	 pErrorCode	OUT 	ERTBS_MSGS.err_code%TYPE)
return boolean;

function FN_GET_BATCH_REFNO
	(pBranchCode 		IN 	oltms_branch.branch_code%TYPE ,
	 pBatch		 	IN 	oltbs_upload_master_de.BATCH_NO%TYPE, --FCC 4.1 OCT 2002 mainstream changes --deepti
	 pCurrNo 		IN 	NUMBER ,
	 pBranchDate	IN 	DATE ,
	 pReferenceNo 		OUT 	VARCHAR2 ,
	 pErrorCode  		OUT 	ERTBS_MSGS.err_code%TYPE)
return boolean;

function FN_DROP_SEQUENCE
	(pBranchCode IN		 oltms_branch.branch_code%TYPE ,
	 pErrorCode  OUT  	 ERTBS_MSGS.err_code%TYPE)
return boolean;

function FN_SPLIT_REFNO
	(pReferenceNo	 IN		varchar2 ,
	 pBranchCode	 OUT 		oltms_branch.branch_code%TYPE ,
	 pProductCode    OUT 		varchar2 ,
	 pDate     	OUT 		DATE ,
	 pSerial 	 OUT 		varchar2 ,
	 pErrorCode 	 OUT 	    	ERTBS_MSGS.err_code%TYPE)
return boolean;

function FN_COMBINE_REFNO
	(pBranchCode	 IN		oltms_branch.branch_code%TYPE ,
	 pProductCode    IN		varchar2 ,
	 pDate  	 IN		DATE ,
	 pSerial 	 IN		varchar2 ,
	 pReferenceNo	 OUT	 	varchar2 ,
	 pErrorCode 	 OUT	 	ERTBS_MSGS.err_code%TYPE)
return boolean;

FUNCTION fn_get_process_refno_batch
		(
		pBranchCode 		IN 		VARCHAR2 ,
		pProcessCode 		IN 		VARCHAR2 ,
		pDate  			IN 		DATE ,
		pSerial  			OUT		VARCHAR2 ,
		pReferenceNo 		OUT 		VARCHAR2 ,
		pErrorCode			OUT 		VARCHAR2,
    pUserId 		IN 		VARCHAR2 
		)
		RETURN VARCHAR2;

PROCEDURE pr_job_prd_seq
	( p_job			INTEGER
	, p_node		oltms_branch_node.node%TYPE
	, p_product		oltms_product.product_code%TYPE
	);

PROCEDURE pr_call_seq_gen
	(p_node 	IN	oltms_branch.host_name%TYPE,
	 p_product 	IN	varchar2
	);

--citi plc changes start

Function FN_CREATE_SEQ_USERDEF
		(
		p_branch_code	IN	oltbs_contract.branch%type,
		p_format_name	IN	oltms_userref_format_master.format_name%type,
		p_error_code	OUT	ertbs_msgs.err_code%type
		)
return boolean;

Function fn_gen_userdef_seq
	(
	p_format_name		IN	oltms_userref_format_master.format_name%type,
	p_branch_code		IN	oltbs_contract.branch%type,
	p_product			IN	oltbs_contract.product_code%type,
	p_date			IN	Date,
	p_sequence_no		OUT	Varchar2,
	p_error_code		OUT	ertbs_msgs.err_code%type
	)
Return Boolean;
-- PLNCITI Til No 2199 Start
Function fn_gen_userdef_seq
	(
	p_format_name		IN	oltms_userref_format_master.format_name%type,
	p_branch_code		IN	oltbs_contract.branch%type,
	p_product			IN	oltbs_contract.product_code%type,
	p_date			IN	Date,
	p_nextval		IN	varchar2,
	p_sequence_no		OUT	Varchar2,
	p_error_code		OUT	ertbs_msgs.err_code%type
	)
Return Boolean;
-- PLNCITI Til No 2199 Start

--citi plc changes end

-- FCC 4.5 LOT1 FAST CHANGES STARTS

FUNCTION	fn_get_next_seq
	(
	p_object_code		IN		VARCHAR2,
	p_seqval			OUT		NUMBER,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

--15-Jun-2011 Flexcube V.CL Release 7.9, CITIUK Retro,EURCITIPLC-LD#8240, LND DB consolidation changes  starts--
Function fn_gen_cust_refno_seq
	(
	p_format_name		IN	oltms_userref_format_master.format_name%type,
	p_branch_code		IN	oltbs_contract.branch%type,
	p_product			IN	oltbs_contract.product_code%type,
	p_date			IN	Date,
	p_sequence_no		OUT	Varchar2,
	p_error_code		OUT	ertbs_msgs.err_code%type
	)
Return Boolean;
--15-Jun-2011 Flexcube V.CL Release 7.9, CITIUK Retro,EURCITIPLC-LD#8240, LND DB consolidation changes ends--

-- FCC 4.5 LOT1 FAST CHANGES ENDS
--22-NOV-2011 Flexcube V.CL Release 7.10, FS Vol 1 Tag 8, Markit Trade Settlement Changes starts here
FUNCTION fn_alpha_refno
	(
	pSequenceNo 	IN OUT	VARCHAR2 ,
	ptype 		IN 	CHAR ,
	pErrorCode  	OUT   	ertbs_msgs.err_code%TYPE
	)
RETURN BOOLEAN;
--22-NOV-2011 Flexcube V.CL Release 7.10, FS Vol 1 Tag 8, Markit Trade Settlement Changes ends here

--OBCL_14.8_CE_Length_Changes Start
PROCEDURE pr_drop_jdat_seq(pErrorCode OUT ertbs_msgs.err_code%TYPE);  

FUNCTION fn_get_pcod_jdat_seq(pProductCode  IN    VARCHAR2, 
                              pDate         IN    DATE ,
                              pSeqNo        OUT   VARCHAR2 ,
                              pErrorCode    OUT   VARCHAR2
                              )
RETURN BOOLEAN;
--OBCL_14.8_CE_Length_Changes End

END;      /****  END OF PACKAGE SPECIFICATION	****/
/
CREATE or replace SYNONYM	olpkss_trpks	FOR	olpks_trpks
/