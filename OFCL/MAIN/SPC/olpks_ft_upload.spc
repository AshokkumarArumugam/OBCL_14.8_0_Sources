CREATE OR REPLACE PACKAGE olpks_ft_upload 
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_ft_upload.SPC
**
** Module		: FUNDS TRANSFER
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

/*	CHANGE_HISTORY

29-JUN-2003	FCC4.3 AUG.2003 CITIPLC SFR #PLC40120033 FT Upload Packages revamped at PLC dated 30-DEC-2002 

29-JUN-2003	FCC 4.3 AUG. 2003 Retro Changes of FCC4.1 Main Stream changes for 200 Upload to be done.

28-DEC-2004 	FCC 4.6.1 JAN 2004 PLNCITI SFR NO Pl-20040517-55554P Message was moved to cover reqd queue despite cover is not reqd.This was because of duplicate messages.
- FCC 4.6.1 JAN 2005 ITR-1 SFR-196 For changing copyright clause / release name
--CITIUS-LS#SRT1452 STP and Code Consolidation Site - Compilation Errors Starts
14-JAN-2005 PLC46040085	Retro of PLC40110203
(05-May-2004	CITI PLC4.0.4 SFR PLC40110203	New job for Sweden to modify tag 72 for /UTL/ to ensure 100% STP
			fn_upd_prod made public to use in tag72 process)
--CITIUS-LS#SRT1452 STP and Code Consolidation Site - Compilation Errors Ends
06-Sep-2016 -- OFCL12.2 Not Required and other changes
*/
/*-- OFCL12.2 Not Required START
--FCC 4.6.1 JAN 2004 PLNCITI SFR NO Pl-20040517-55554P Changes Start Here.
g_dcn				oltbs_dly_msg_in.dcn%type;--FCC 4.6.1 JAN 2004 PLNCITI SFR NO Pl-20040517-55554P Added
--FCC 4.6.1 JAN 2004 PLNCITI SFR NO Pl-20040517-55554P Changes End Here.


TYPE format_rec IS RECORD
		(
			tags	VARCHAR2(5),
			value	VARCHAR2(216)
		);

TYPE lo_data_table is TABLE of format_rec INDEX BY BINARY_INTEGER;



FUNCTION fn_job_broken
RETURN VARCHAR2;

FUNCTION fn_process_msg_for_upload
			(
			p_User_id				IN		VARCHAR2,
			p_msg_type				IN		VARCHAR2,
			p_post_upload_status    	IN 		xxfttbs_upload_log.POST_UPLOAD_STATUS%TYPE,
			p_on_error_flag        		IN		xxfttbs_upload_log.ON_ERROR_STATUS%TYPE,
			p_on_override_flag      	IN		xxfttbs_upload_log.ON_OVERRIDE_STATUS%TYPE,
			p_Susp				IN		VARCHAR2,
			pErrcodes				IN OUT 	VARCHAR2,
			pErrparams				IN OUT	VARCHAR2,
			p_dcn					IN		VARCHAR2,
			p_ft_ref				OUT 		VARCHAR2
			)
			RETURN BOOLEAN;

FUNCTION fn_process_msg_for_upload
			(
			p_User_id			IN		VARCHAR2,
			p_msg_type			IN		VARCHAR2,
			p_post_upload_status    IN 		xxfttbs_upload_log.POST_UPLOAD_STATUS%TYPE,
			p_on_error_flag         IN		xxfttbs_upload_log.ON_ERROR_STATUS%TYPE,
			p_on_override_flag      IN		xxfttbs_upload_log.ON_OVERRIDE_STATUS%TYPE,
			p_Susp			IN		VARCHAR2,
			pErrcodes			IN OUT 	ertbs_msgs.ERR_CODE%TYPE,
			pErrparams			IN OUT	VARCHAR2
			)
			RETURN BOOLEAN;

*/-- OFCL12.2 Not Required START

FUNCTION fn_get_field 	(
				pTextblock	IN		oltbs_dly_msg_in.MESSAGE%TYPE,
				pFieldcount	IN		NUMBER,
				pFieldtext	IN OUT	VARCHAR2,
				pErrCodes	IN OUT	ertbs_msgs.ERR_CODE%TYPE,
				pErrParams	IN OUT	VARCHAR2
				)
				RETURN BOOLEAN;

/*-- OFCL12.2 Not Required START
FUNCTION acfn_bic_msg
		(
		p_brn 	IN 		sttms_cust_bic.branch_code%TYPE,
		p_acc 	IN 		sttms_cust_bic.cust_ac_no%TYPE,
		p_bic 	IN 		VARCHAR2,
		p_msg 	IN 		sttms_cust_bic.message_type%TYPE
		) RETURN BOOLEAN;

FUNCTION fn_tag_value
			(
			pInterpretation		IN		mstms_swift_format.interpretation%TYPE,
			p_msg_ccy			IN		cytms_ccy_defn.ccy_code%TYPE,
			p_swmsg_type		IN		mstms_swift_format.mesg_type%type,
			p_data_table		IN OUT	lo_data_table,
			pTag_PRESENT		OUT		NUMBER,
			pTag_Value			OUT		VARCHAR2,
			pErrCodes			IN OUT	VARCHAR2,
			pErrParams			IN OUT	VARCHAR2
			) RETURN BOOLEAN;
--FCC 4.3 AUG. 2003 Retro Changes of PLNCITI 05/09/2002 Starts
PROCEDURE pr_cover_match ;
PROCEDURE pr_start_cover_match;
PROCEDURE pr_stop_cover_match;
PROCEDURE pr_start_stp;
PROCEDURE pr_stop_stp;
--FCC 4.3 AUG. 2003 Retro Changes of PLNCITI 05/09/2002 Ends

FUNCTION Fn_get_redirect_ch_cust
			(
			PcontractRefNo  IN OLTB_CONTRACT.contract_ref_no%type
			)
Return Varchar2;
/*FUNCTION Fn_get_ft_upl_rec
			(
			PcontractRefNo  		IN 		OLTB_CONTRACT.contract_ref_no%type,
			p_fttb_upload_master  	IN OUT	OLTBS_FTTB_UPLOAD_MASTER%rowtype
			)
Return boolean;
*/
/*-- OFCL12.2 Not Required START
FUNCTION Fn_get_app_repair_chg
			(
			PcontractRefNo  		IN 		OLTB_CONTRACT.contract_ref_no%type
			)
Return Varchar2 ;
--CITIUS-LS#SRT1452 STP and Code Consolidation Site - Compilation Errors Starts
--SFR PLC40110203 Change Starts
FUNCTION fn_upd_prod
			(
			pMsg			IN		VARCHAR2,
			p_queue		IN		VARCHAR2,
			p_ft_product_defn	OUT		xxfttms_product_definition%ROWTYPE,
			pErrcodes		IN OUT 		ertbs_msgs.ERR_CODE%TYPE,
			pErrparams		IN OUT		VARCHAR2
			) RETURN BOOLEAN;

--SFR PLC40110203 Change Ends
--CITIUS-LS#SRT1452 STP and Code Consolidation Site - Compilation Errors ends
*/-- OFCL12.2 Not Required START
END olpks_ft_upload;
/
CREATE or replace SYNONYM olpkss_ft_upload FOR olpks_ft_upload
/