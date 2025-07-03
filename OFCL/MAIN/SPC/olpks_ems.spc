create or replace package olpks_ems
as
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_ems.SPC
**
** Module		: MESSAGES
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




type ty_arr_message is table of oltbs_dly_msg_in.message%type
	INDEX BY BINARY_INTEGER;


FUNCTION readMessage(pDirectory IN VARCHAR2,
					pFileName IN VARCHAR2,
					pMsgArr	OUT ty_arr_message) RETURN INTEGER ;

FUNCTION getOmiRecord(pDirectory IN VARCHAR2,
						pIndex IN VARCHAR2,
						pOmiRecord OUT VARCHAR2,
						pErrMsg IN OUT VARCHAR2) RETURN BOOLEAN ;

FUNCTION getImiRecord(pDirectory IN VARCHAR2,
						pIndex IN VARCHAR2,
						pImiRecord OUT VARCHAR2,
						pErrMsg IN OUT VARCHAR2) RETURN BOOLEAN ;

FUNCTION getMessage(pDirectory IN VARCHAR2,
					pErrMsg IN OUT VARCHAR2) RETURN BOOLEAN ;

/* USDFBME - Easwaran N */
FUNCTION RouteIncomingMessage(mstbDlyMsgInRec	IN OUT	oltbs_dly_msg_in%rowtype,
								msgArr IN	ty_arr_message,
								numRec IN	INTEGER) RETURN BOOLEAN ;
/* End of Addition */

PROCEDURE fetchInComingMessages(pNode	IN	MSTMS_MCS.node%TYPE) ;

FUNCTION updateErrorStatus(pDirectory IN VARCHAR2, 
							pOdeqBuf IN VARCHAR2, 
							pErrMsg IN OUT VARCHAR2) RETURN BOOLEAN ;


FUNCTION queueAdd(pDirectory IN VARCHAR2,
					pQueue IN VARCHAR2,
					pIndex IN VARCHAR2,
					pErrMsg IN OUT VARCHAR2) RETURN BOOLEAN ;

FUNCTION queueAdd(pDirectory IN VARCHAR2,
					pQueue IN VARCHAR2,
					pIndex IN VARCHAR2, 
					pPriority IN VARCHAR2, 
					pMedia IN VARCHAR2,
					pErrMsg IN OUT VARCHAR2) RETURN BOOLEAN ;

FUNCTION queueDel(pDirectory IN VARCHAR2,
					pQueue IN VARCHAR2,
					pIndex IN VARCHAR2,
					pErrMsg IN OUT VARCHAR2) RETURN BOOLEAN ;

PROCEDURE eodCheckAndInitialize(pNode IN MSTMS_MCS.node%TYPE,
								pErrMsg IN OUT VARCHAR2) ;

function fn_get_ems_dir(in_out_dir mstms_mcs.OUT_DIR%TYPE,
						 in_media   mstbs_current_msg_ind_out.MEDIA%TYPE,
                         in_date    date)
						 return varchar2 ;


function fn_recover_ems	return integer ;


function fn_init_ems return integer ;


function fn_get_free_index 	(in_dcn 	    oltbs_dly_msg_out.DCN%TYPE,
						    in_media	 oltbs_dly_msg_out.MEDIA%TYPE,
						    in_node		 oltbs_dly_msg_out.NODE%TYPE,
						    in_priority oltbs_dly_msg_out.PRIORITY%TYPE,
							 in_file_dcn varchar2)
						return number ;


function fn_pick_outgoing
							(in_dcn	oltbs_dly_msg_out.DCN%TYPE,
							 tw_auth_call  boolean) return integer;


function fn_get_out_dir  (in_node    oltbs_dly_msg_out.NODE%TYPE,
						  in_media   oltbs_dly_msg_out.MEDIA%TYPE) return varchar2 ;


function fn_create_message(in_dly_msg_out oltbs_dly_msg_out%ROWTYPE,
						 in_free_index mstbs_foq.free_index%TYPE,
						 in_file_dcn varchar2,
                         in_date date) return integer ;

function fn_get_media_code(in_media	oltbs_dly_msg_out.MEDIA%TYPE) return varchar2 ;

function fn_get_file_name(in_date date) return varchar2 ;


function fn_check_queue	(in_index  mstbs_current_msg_ind_out.CURRENT_INDEX%TYPE,
						 in_media  mstbs_current_msg_ind_out.MEDIA%TYPE,
						 in_out_dir mstms_mcs.OUT_DIR%TYPE) return varchar2 ;


procedure pr_exit_operations ;

-- START USDFBME UPGRADE 10-SEP-1999 SUNNY
/* --------------------------  BEGIN  --------------------------------- */
/*												*/
/*					EMS RECOVERY CHANGES				*/
/*												*/

function fn_odeq_msg_handle ( pNode 	in mstms_mcs.node%type	,
				   pMedia	in mstms_mcs.media%type ,
				   pErrCode   out varchar2		) return boolean ;

/*												*/
/*												*/
/*  --------------------------  END  ---------------------------------- */

-- END USDFBME UPGRADE 10-SEP-1999 SUNNY



end olpks_ems;

/
CREATE or replace  SYNONYM  olpkss_ems FOR olpks_ems
/