CREATE OR REPLACE PACKAGE olpks_tsupl_cont AS
/*------------------------------------------------------------------------------------------------------------------------------------
**                                                                                                  	
** File Name	: olpks_tsupl_cont.SPC	                                                                
**                                                                                              			
** Module	: IF                                                                                  		
This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.                                           	
---------------------------------------------------------------------------------------------------------------
*/
/*
CHANGE_HISTORY

25-JAN-2002, I-Face and FLEXML2.0  	Retro changes.
20-MAY-2002 RETRO FCC4.0 JUNE 2002 PLNCITI TIL#4079 Deal Upload procedure for Security Module added.
11-feb-2003 FCC 4.2 RETRO PLNCITI Til NO 9094 Changes made for Securites market price upload.
02-Aug-2003 FCC4.3 AUG 2003 PLNCITI SFR 2147  Added a new function to process TRESTEL uploads.
- FCC 4.6.1 JAN 2005 ITR-1 SFR-196 For changing copyright clause / release name
24-JAN-2005 FCC 4.6.1 JAN 2005 SR Upload changes. Search for '24-JAN-2005 FCC 4.6.1'
09-MAY-2016 Removed unwanted calls to lc,bc,se modules
*/

--Added for iface
procedure set_online_flag(p_online_flag BOOLEAN);

function get_online_flag RETURN BOOLEAN;
--end iface

Procedure pr_Tsupl_ldcont
   	(
	pSource  IN Varchar2,
	pRectype IN Varchar2,
	pts	IN	varchar2,
	pdtf	IN	varchar2,
	pProc	IN	varchar2,
 	pFlag	OUT	Number,
	pErr	OUT 	Varchar2,
	pprms	OUT 	Varchar2
   	);

--FLEXML2.0 changes
FUNCTION fn_get_reply_rectype	(	p_upload_rectype	IN		VARCHAR2
					,	p_reply_rectype	OUT		VARCHAR2
					,	p_err			IN OUT	VARCHAR2
					,	p_prms		IN OUT	VARCHAR2
					)
RETURN BOOLEAN;

PROCEDURE pr_upd_ext_constat	(	p_source_code	IN		VARCHAR2
					,	p_branch_code	IN		VARCHAR2
					,	p_external_ref_no	IN		VARCHAR2
					);

FUNCTION fn_get_reference_no	(	p_source_code	IN		VARCHAR2
					,	p_branch_code	IN		VARCHAR2
					,	p_external_ref_no	IN		VARCHAR2
					,	p_contract_ref_no	OUT		VARCHAR2
					,	p_err			IN OUT	VARCHAR2
					,	p_prms		IN OUT	VARCHAR2
					)
RETURN BOOLEAN;
FUNCTION fn_get_rec_length
	(	p_full_rectype_list	IN		VARCHAR2
	,	p_cod_rectype_list	IN 		VARCHAR2
	,	p_cod_int_col_list	OUT		VARCHAR2
	,	perr				IN OUT	VARCHAR2
	,	pprms				IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_execute_stmt
	(	p_xref	IN		VARCHAR2
	,	p_col		IN		VARCHAR2
	,	p_val_list	IN		VARCHAR2
	,	p_tab_name	IN		VARCHAR2
	,	perr		IN OUT	VARCHAR2
	,	pprms		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--End FLEXML2.0 changes
--FCC 4.3 AUG 2003 Till No. 2147 START
FUNCTION fn_execute_stmt_update(	p_xref	IN		VARCHAR2
					,	p_val_list	IN		VARCHAR2
					,	p_tab_name	IN		VARCHAR2
					,	p_where_clause IN		VARCHAR2
					,	perr		IN OUT	VARCHAR2
					,	pprms		IN OUT	VARCHAR2
					)
RETURN BOOLEAN;

--FCC 4.3 AUG 2003 Till No. 2147 End

End olpks_tsupl_cont;
/
create or replace synonym olpkss_tsupl_cont for olpks_tsupl_cont
/