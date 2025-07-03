CREATE OR REPLACE PACKAGE olpks_ovd_3t AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_ovd_3t.SPC
**
** Module		: CORE
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


FUNCTION FN_DISPMSG
			(
				p_ContractRefNo 	IN VARCHAR2,
		   		p_EventSeqNo 	IN NUMBER,
		   		p_Module 		IN VARCHAR2,
		   		p_Update 		IN VARCHAR2,
				p_ErrCode 		IN VARCHAR2,
				p_Parameters  	IN VARCHAR2,
				p_Amounts 		IN VARCHAR2,
				p_langCode		IN VARCHAR2
		    	)
return varchar2 ;

FUNCTION FN_DISPMSG
			(
				p_ErrCode 		IN VARCHAR2,
				p_Parameters  	IN VARCHAR2,
				p_Amounts 		IN VARCHAR2,
				p_langCode		IN VARCHAR2
		    	)
return varchar2 ;

procedure pr_Get_Err_Msgs
		(
		    pUser		    in 			varchar2,
			pBranch			in			varchar2,
			pErrCodes 		in 			varchar2,
			pErrParams		in out 		varchar2
		);

procedure pr_Get_Err_Msgs_onl
		(
			contract_ref_no	in			varchar2,
			esn			in			number,
			module		in			varchar2,
			p_update		in			varchar2,
		    	pUser		    	in 			varchar2,
			pBranch		in			varchar2,
			pErrCodes 		in 			varchar2,
			pErrParams		in out 			varchar2
		);

procedure pr_Get_Err_Msgs_onl
		(
			p_ref_no	in			varchar2,
			p_esn			in			number,
			p_module		in			varchar2,
			p_update		in			varchar2,
		    	p_User		    	in 			varchar2,
			p_Branch		in			varchar2,
			p_ErrCodes 		in 			varchar2,
			p_ErrParams		in out 		varchar2,
			p_amt			in			varchar2
		);


procedure pr_getmsg (
				prefno	in	varchar2,
				pesn		in	varchar2,
				plang		in	varchar2,
				p_retval	out	varchar2
			);

procedure pr_getovdforauth 	(
					prefno	in	varchar2,
					pesn		in	varchar2,
					pbranch	in	varchar2,
					puserid	in	varchar2,
					p_retval	out	varchar2
					);

FUNCTION FN_DISPMSG_WO_ERRCODE
			(
				p_ErrCode 		IN VARCHAR2,
				p_Parameters  	IN VARCHAR2,
				p_Amounts 		IN VARCHAR2,
				p_langCode		IN VARCHAR2
		    	)
return VARCHAR2 ;

END olpks_ovd_3t;
/
CREATE or replace SYNONYM olpkss_ovd_3ts FOR olpks_ovd_3t
/
CREATE or replace SYNONYM olpks_ovd_3ts FOR olpks_ovd_3t
/