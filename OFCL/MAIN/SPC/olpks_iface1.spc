create or replace package olpks_iface1
IS
/*-----------------------------------------------------------------------------------------
**
** File Name	: olpks_iface1.SPC
**
** Module	: LD (E-DEALER INTERFACE)
**
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.

Change history:

-------------------------------------------------------------------------------------
*/

PROCEDURE pr_upload		(	prectype	IN		VARCHAR2
				,	pts		IN		VARCHAR2
				,	pdtf		IN		VARCHAR2
				,	pProc	  	IN		VARCHAR2
				,	pidentifier	    OUT		VARCHAR2
				,	pFlag	   	    OUT		NUMBER
				,	perr	  	IN OUT 		VARCHAR2
				,	pprms	   	IN OUT 		VARCHAR2
				);

--12-Aug-2006 FCC 4.10 AUG 2006 Release - Changes for CITICONNECT LD FT

PROCEDURE pr_citiconn_upload(	prectype	IN		VARCHAR2
			,	pts		IN		VARCHAR2
			,	pdtf		IN		VARCHAR2
			,	pProc	  	IN		VARCHAR2
			,	pidentifier	OUT		VARCHAR2
			,	pFlag	   	OUT 		NUMBER
			,	perr	  	IN OUT 		VARCHAR2
			,	pprms	   	IN OUT 		VARCHAR2
			);

PROCEDURE pr_Tsupl_citiconn_ldcont(	prectype 	IN		VARCHAR2
				,	pts		IN		VARCHAR2
				,	pdtf		IN		VARCHAR2
				,	pProc		IN		VARCHAR2
				,	pidentifier	OUT		VARCHAR2
				,	pflag		OUT		VARCHAR2
				,	perr		IN OUT		VARCHAR2
				,	pprms		IN OUT		VARCHAR2
				);

--12-Aug-2006 FCC 4.10 AUG 2006 Release - Changes for CITICONNECT LD FT end

FUNCTION fn_value (
		  			p_string VARCHAR2
		  		)
RETURN VARCHAR2;

FUNCTION fn_get_product RETURN VARCHAR2;

FUNCTION fn_ldupload_amend
(
	p_contract_ref_no	IN 	OLTB_CONTRACT_MASTER.CONTRACT_REF_NO%TYPE
	,p_error_code		IN OUT	VARCHAR2
	,p_error_parameter	IN OUT	VARCHAR2
)
RETURN	BOOLEAN;

FUNCTION fn_ldupload_delq_stat
(
	p_contract_ref_no	IN 	OLTB_CONTRACT_MASTER.CONTRACT_REF_NO%TYPE
	,p_delinquency_status   IN  	OLTB_CONTRACT_MASTER.USER_DEFINED_STATUS%TYPE
	,p_error_code		IN OUT	VARCHAR2
	,p_error_parameter	IN OUT	VARCHAR2
)
RETURN	BOOLEAN;


FUNCTION	fn_reserve_save
(
	p_contract_ref_no		IN	VARCHAR2,
	p_event_seq_no		IN	NUMBER,
	p_error_code		IN OUT	VARCHAR2,
	p_error_param		IN OUT	VARCHAR2
)
RETURN  BOOLEAN;

FUNCTION fn_ldupload_delete
		(	p_external_ref_no in varchar2
		,	p_contract_ref_no in OUT varchar2
		,	p_errcode		in out varchar2
		,	p_params		in out varchar2
		)
RETURN BOOLEAN;

FUNCTION fn_edealer_handoff
		(p_error_code IN OUT varchar2
		)
RETURN BOOLEAN;
PROCEDURE pr_xyz(	prectype	IN		VARCHAR2
			,	pts		IN		VARCHAR2
			,	pdtf		IN		VARCHAR2
			,	pProc	  	IN		VARCHAR2
			,	pidentifier	OUT		VARCHAR2
			,	pFlag	   	OUT 		NUMBER
			,	perr	  	IN OUT 		VARCHAR2
			,	pprms	   	IN OUT 		VARCHAR2
			);

End olpks_iface1;
/