CREATE OR REPLACE PACKAGE olpks_messaging
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_messaging.SPC
**
** Module	: MESSAGING SUBSYSTEM
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
/*  change History

	Fcc 3.8 Aspac Retro                  Added function fn_gen_msg_out declaration in to spc to make this as public function(global).
	PLNCITI TIL 2340				Added new Overload Function fn_gen_msg_out

05.AUG.2002 FCC 4.1 Oct 2002 Retro Addded two new procedures.

13-DEC-2002 FCC 4.2 FEB 2003 SGDASPAC SFR #2100 Added procedure Pr_spool_all procedure and fn_stmt_handoff function.

19-Mar-2003 FCC 4.2 Retro April 2003 CEEMEA 9386 Split Account Statement in Business Copy and production.

02-JULY-2003 FCC4.3 AUG 2003 Retro ASPAC SFR NO:5019  PARALLEL PROCESSING CHANGES FOR ASPAC

17-OCT-2003  FCC 4.4 DEC2003 CHANGES FOR FX/MM FAST SETTLEMENTS 

14-APR-2004	 FCC 4.5 LOT2 changes for Ms parallelization

21-JUL-2004	FCC4.6	DEV	ANY MSG TYPE is split into 1. ANY ADV TYPE 2. ANY STMT TYPE to differentiate bewteen statement and advices
				New parameter added in CSTB_PARAM called DFLT_STMT_ADV_TYPE.
				New function added in olpks_messaging called fn_dflt_stmt_adv_type to derive the value of the Format.
				Search for FCC 4.6 Sep 2004 Changes for message type
27-AUG-2005	FCC 4.6.2, CITI LS Changes.
		commented olpks_messaging. and olpkss_messaging. as self reference not allowed in 10g.
29-AUG-2005	FCC 4.6.2, CITI LS Changes,
		Introduced 2 new package variables g_diary_event_seq_no and g_diary_event_sub_seq_no
		for handling contract diary advices as part of contract diary event status.
		New procedure pr_set_diary_seq introduced to assign the above declared global variables.
09-SEP-2005	FLEXCUBE V.CL Release 7.0 ITR1 SFR 111, changed by suraj.
		Added new parameter(p_ffmt_ref_no) in the function pr_set_diary_seq for message preview.
		Added new package variable(g_ffmt_ref_no).
19-OCT-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO START
		  30-AUG-2007 FCC-7.3-RETRO-CITIUK-4.4-RETRO#282 FCC4.4.2 SFR PLCLON4405038  Added new procedure to generate message based on message queue/priority
19-OCT-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO END
03-dec-2007 FCC V.CL Release 7.3 ITR1 sfr#276,Message Generation Offline Changes, MANAS
26-apr-2008 FLEXCUBE V.CL Release 7.4 Retro Changes CITIUSLD46200156 
06-OCT-2008 FLEXCUBE V.CL RELEASE 7.4 RTFIX#412 email not generating for borrower side if generation time is i
26-FEB-2009 FLEXCUBE V.CL Release 7.5 USRETRO TILL#5187,Deviation and fixes as part of PDE Changes retroe


  Changed By         : Sudharshini Balaji
  Date               : 10-Aug-2023
  Change Description : Performance Tuning Changes for 1500+Lenders
  Search String      : Bug#36821348


*/




type msg_handoff_curtype is ref cursor
	return oltbs_msg_handoff%rowtype;
type msg_format_curtype is ref cursor
	return oltms_msg_format%rowtype;
type module_proc_curtype is ref cursor
	return oltbs_dly_msg_out%rowtype;
type dly_msg_out_curtype is ref cursor
	return oltbs_dly_msg_out%rowtype;
type msg_address_curtype is ref Cursor 
	return oltms_msg_address_ms%rowtype;

g_custom_ref_no		Varchar2(20); --citiplc changes 24/6/2000
g_user_ref_no		Varchar2(20); --citiplc changes 24/6/2000
g_ref_param			cstbs_param.param_val%type; --citiplc changes 24/6/2000
g_parallel_jobs		NUMBER	;	--FCC 4.5 LOT2 MS parallelization
g_diary_event_seq_no		oltms_diary_msg_entities.diary_event_seq_no%TYPE; -- FCC 4.6.2, CITILS Changes, declared new package variable
g_diary_event_sub_seq_no	oltms_diary_msg_entities.diary_event_sub_seq_no%TYPE; -- FCC 4.6.2, CITILS Changes, declared new package variable
g_ffmt_ref_no			oltbs_ffmt_msg.ffmt_ref_no%TYPE; -- FLEXCUBE V.CL Release 7.0 ITR1 SFR 111, changed by suraj, added new package variable.
g_ignore_fax_ms			VARCHAR2(20);--26-apr-2008 FLEXCUBE V.CL Release 7.4 Retro Changes CITIUSLD46200156
g_call_from_job			VARCHAR2(1):='N';--26-FEB-2009 FLEXCUBE V.CL Release 7.5 USRETRO TILL#5187,Deviation and fixes as part of PDE Changes retroe
type dly_msg_tbltype is table of oltbs_dly_msg_out%rowtype
	index by binary_integer;
--
--17-OCT-2003  FCC 4.4 DEC2003 CHANGES FOR FX/MM FAST SETTLEMENTS 
--
TYPE 	rec_msg_adv IS RECORD
	(
	field_tag		VARCHAR2(50),
	field_value 	VARCHAR2(2000),
	option_value	VARCHAR2(2),
	mandatory_tag	VARCHAR2(1)
      );

TYPE	tbl_msg_adv_type IS TABLE OF rec_msg_adv
INDEX BY BINARY_INTEGER;

tbl_msg_adv   tbl_msg_adv_type;



--$$ Bug#36821348 changes

TYPE rec_ADV_LANG_TYPE IS TABLE OF VARCHAR(2 CHAR)INDEX BY OLTB_DLY_MSG_OUT.FORMAT%type; 
tbl_ADV_LANG_TYPE  rec_ADV_LANG_TYPE;

TYPE rec_dft_type IS TABLE OF VARCHAR2(30) INDEX BY OLTM_MSG_TYPE.MSG_TYPE%type; 
tbl_dft_type  rec_dft_type;

--$$ Bug#36821348 changes




--
--17-OCT-2003  FCC 4.4 DEC2003 CHANGES FOR FX/MM FAST SETTLEMENTS 
--
procedure pr_bg_gen_msg_out ;


PROCEDURE pr_gen_stmt (pm_job INTEGER, pSeqNo IN NUMBER,p_ASN IN VARCHAR2); -- 12-Mar-2003 FCC 4.2 Retro April 2003 CEEMEA 9386 changes

PROCEDURE pr_submit_gen_stmt (pJobList IN OUT VARCHAR2,P_ASN  IN VARCHAR2 := 'A'); -- 12-Mar-2003 FCC 4.2 Retro April 2003 CEEMEA 9386

function fn_on_gen_msg_out(
	p_msg_handoff		msg_handoff_curtype,
	pm_bad_dcn			IN OUT varchar2) return boolean;

function fn_on_gen_msg_out(
	p_dcns				varchar2,
	pm_bad_dcn			IN OUT varchar2) return boolean;

function fn_generate_telex_queue(
	p_dcn IN			oltbs_dly_msg_out.dcn%type) return boolean;


function fn_gen_msg_out ( 
	p_status			oltbs_msg_handoff.directive_status%type)
return boolean;
-- Aspac Retro Fcc 3.8 Made this function as global.(public).
function fn_gen_msg_out ( 
	p_msg_handoff		oltbs_msg_handoff%rowtype,
	pm_bad_dcns			IN OUT varchar2)
return boolean;
-- CITIASPAC

--CITIPLC
FUNCTION fngetOutMsgforRep (p_dcn IN VARCHAR2, p_running_no IN NUMBER) RETURN CLOB; 
--function fn_hold_message(p_dcn IN oltbs_dly_msg_out.dcn%type,
--						 p_media IN oltbs_dly_msg_out.media%type) return boolean ;
function fn_hold_message(p_dly_msg_out IN oltbs_dly_msg_out%rowtype) return boolean ;
--CITIPLC
function Release_messages(release_type	integer) return boolean ;


function fn_release_message(p_dcn IN oltbs_dly_msg_out.dcn%type,
						 p_media IN oltbs_dly_msg_out.media%type) return boolean ;

function fn_call_mcs_func(
	pm_dcn		oltbs_dly_msg_out.dcn%type,
	pm_node		oltbs_dly_msg_out.node%type,
	pm_media	oltbs_dly_msg_out.media%type,
	pm_mcs		oltbs_dly_msg_out.mcs%type,
	pm_twauth   boolean) return boolean;

function fn_call_mcs_func(
	pm_dcn		varchar2,
	pm_bad_dcn	IN OUT varchar2) return boolean;
--06-OCT-2008 FLEXCUBE V.CL RELEASE 7.4 RTFIX#412 email not generating for borrower side if generation time is i related fixes starts
FUNCTION fn_trigger_email(
			p_min_msg_esn IN VARCHAR2,
			p_max_msg_esn IN VARCHAR2,
			p_reference_no IN VARCHAR2,
			p_err_code   IN OUT VARCHAR2
			) RETURN BOOLEAN; 
--06-OCT-2008 FLEXCUBE V.CL RELEASE 7.4 RTFIX#412 email not generating for borrower side if generation time is i related fixes ends
function fn_ascii_handoff (
	pm_dcn IN oltbs_dly_msg_out.dcn%type,
	pm_dir		varchar2,
	pm_file		varchar2) return boolean;

function fn_multiple_msg(
	pm_branch			oltms_branch.branch_code%type,
	pm_old_dcn		IN		oltbs_dly_msg_out.dcn%type,
	pm_swift_msg			oltbs_dly_msg_out.swift_msg_type%type,
	pm_new_dcn		IN OUT	oltbs_dly_msg_out.dcn%type) return boolean;

PROCEDURE pr_put_msadv_input(
				      pm_dcn		IN	oltbs_adv_input.dcn%TYPE,
					pm_loop	IN	oltbs_adv_input.loop_no%TYPE,
					pm_tag		IN	oltbs_adv_input.field_tag%TYPE,
					pm_value	IN	oltbs_adv_input.value%TYPE,
					pm_justify	IN	char
				      );

function fn_get_format (
	p_dly_msg_out		IN OUT oltbs_dly_msg_out%rowtype)
return boolean;
-- FCC3.7 MT103 Changes Srihari
function fn_get_address (
	p_msg_handoff		oltbs_msg_handoff%rowtype,
	p_dly_msg_tbl 		IN OUT dly_msg_tbltype)
return boolean;
-- FCC3.7 MT103 Changes Srihari

--PLNCITI  TILL#3333 OVERLOADED fn_gen_msg_out with ref no as IN parameter
function fn_gen_msg_out (
	p_refno			oltbs_msg_handoff.reference_no%type,
	p_esn				oltbs_msg_handoff.esn%type)
return boolean;
--PLNCITI END OF OVERLOADED FUNCTION

-- 02.AUG.2002 FCC 4.1 Oct2002 Retro PLNCITI Til# 4388
-- PROCEDURE pr_gen_stmt (pm_job INTEGER, pSeqNo IN NUMBER);

-- PROCEDURE pr_submit_gen_stmt (pJobList IN OUT VARCHAR2);
-- 02.AUG.2002 FCC 4.1 Oct2002 Retro PLNCITI Til# 4388

-- FCC 4.2 FEB 2003 SGDASPAC SFR #2100 change new procedure added
PROCEDURE PR_SPOOL_ALL(P_TYPE   	IN		oltbs_msg_handoff.MSG_TYPE%TYPE,
			     P_ERR_CODE	IN 	OUT 	ERTBS_MSGS.ERR_CODE%TYPE);

-- FCC4.3 AUG 2003 Retro ASPAC SFR NO:5019 Changes Starts... PARALLEL PROCESSING CHANGES FOR ASPAC
										 -- Added three new procedures

PROCEDURE PR_SPOOL_ALL(	P_TYPE   	IN		oltbs_msg_handoff.MSG_TYPE%TYPE,
				p_seq_no 	IN 		NUMBER,		--parallel process changes start new parameter added
				P_ERR_CODE	IN 	OUT 	ERTBS_MSGS.ERR_CODE%TYPE);

PROCEDURE pr_spool_all_call(P_TYPE  	 IN		oltbs_msg_handoff.MSG_TYPE%TYPE,
		      	    P_SEQ_NO 	 IN		NUMBER);

PROCEDURE pr_gen_stmt(	P_TYPE   		IN		oltbs_msg_handoff.MSG_TYPE%TYPE,
		      	P_ERR_CODE	IN 	OUT 	ERTBS_MSGS.ERR_CODE%TYPE);

-- FCC4.3 AUG 2003 Retro ASPAC SFR NO:5019 Changes Ends...
--
--17-OCT-2003  FCC 4.4 DEC2003 CHANGES FOR FX/MM FAST SETTLEMENTS 
--
FUNCTION fn_insert_tbl_msg_adv
	(
	p_fldtag		IN		VARCHAR2		,
	p_fldval		IN		VARCHAR2		,
	p_option		IN		VARCHAR2		,
	p_mandatory		IN 		VARCHAR2		,
	p_loopno		IN OUT	NUMBER		,
	p_msg_tbl_adv	IN OUT   	tbl_msg_adv_type	,
	p_error_code	IN OUT	VARCHAR2		,
	p_error_parameter	IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
FUNCTION fn_concatenate_tbl_msg_adv
					(
					  p_msg_tbl_adv     IN OUT    tbl_msg_adv_type, -- olpkss_messaging.tbl_msg_adv_type, -- FCC 4.6.2, commented, self reference not allowed in 10g.
					  p_reg_tbl_msg_adv IN OUT VARCHAR2
					)

RETURN BOOLEAN;

FUNCTION fn_insert_mstb_dly (
				     p_mstb_dly_msg_out_rec   oltbs_dly_msg_out%ROWTYPE
				    )
RETURN BOOLEAN;
--
--17-OCT-2003  FCC 4.4 DEC2003 changes for fx/mm fast SETTLEMENTS 
--
--
--FCC 4.4 DEC2003 changes for cancellation of unhandedoff payment messages
--
FUNCTION fn_cancel_pmsg(	
				 		p_contract_ref_no		IN		oltbs_dly_msg_out.reference_no%TYPE,
				 		p_esn				IN		oltbs_dly_msg_out.esn%TYPE,
				 		p_err_code			IN OUT 	ertbs_msgs.err_code%TYPE ,
				 		p_err_param			IN OUT	VARCHAR2		
				  		)	
RETURN BOOLEAN;
--
--FCC 4.4 DEC2003 changes for cancellation of unhandedoff payment messages
--


procedure pr_bg_gen_msg_out(p_seq_no	IN 	NUMBER) ; --FCC 4.5 LOT2 messages parallelization


--
-- 21-JUL-2004	FCC 4.6 Sep 2004 Changes for message type Starts
--

FUNCTION	fn_dflt_stmt_adv_type
(
	P_MSG_TYPE	IN	VARCHAR2
,	P_DFLT_TYPE	OUT	VARCHAR2
)
RETURN	BOOLEAN;

--
-- 21-JUL-2004	FCC 4.6 Sep 2004 Changes for message type Ends
--
-- FCC 4.6.2, CITILS Changes, Suraj

PROCEDURE pr_set_diary_seq(P_DESN		IN	oltms_diary_msg_entities.diary_event_seq_no%TYPE,
				   P_DESSN		IN	oltms_diary_msg_entities.diary_event_sub_seq_no%TYPE,
				   P_ffmt_ref_no	IN	oltbs_ffmt_msg.ffmt_ref_no%TYPE, -- FLEXCUBE V.CL Release 7.0 ITR1 SFR 111, changed by suraj, added new parameter.
				   P_set_diary	IN	varchar2 default 'N');

-- FCC 4.6.2, CITILS Changes, Suraj
--FCC V.CL 7.3 UK CONSOLIDATION RETRO START
--30-AUG-2007 FCC-7.3-RETRO-CITIUK-4.4-RETRO#282 Start Here
PROCEDURE pr_gen_bgmsg_by_priority(p_gen_priority IN OLTB_DLY_MSG_OUT.generation_priority%type);
--30-AUG-2007 FCC-7.3-RETRO-CITIUK-4.4-RETRO#282 End Here
--FCC V.CL 7.3 UK CONSOLIDATION RETRO END

--03-dec-2007 FCC V.CL Release 7.3 ITR1 sfr#276,Message Generation Offline Changes,manas starts
PROCEDURE pr_bg_ls_msg(p_seq_no	NUMBER);

PROCEDURE pr_ls_msg_out(p_seq_no IN NUMBER);
--03-dec-2007 FCC V.CL Release 7.3 ITR1 sfr#276,Message Generation Offline Changes,manas ends
FUNCTION HOSTCMD
(
  cmd    IN    CHAR,
  c_path  IN    CHAR
)
RETURN VARCHAR2;
end olpks_messaging;
/
create or replace synonym olpkss_messaging for olpks_messaging
/