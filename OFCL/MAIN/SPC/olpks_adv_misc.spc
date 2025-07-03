create or replace package olpks_adv_misc  AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_adv_misc.SPC
**
** Module		: LOANS AND DEPOSIT
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
/*------------------------------------------CHANGE HISTORY----------------------------------
15-OCT-2007 FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-LS#84. created new functions-
		Fn_genmsg_oninput,Fn_adv_gen_input,Fn_release_msg
03-dec-2007 FCC V.CL Release 7.3 ITR1 sfr#276,Message Generation Offline Changes,manas
14-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#2,Retro Changes CITIUS-LS-821,Message generation as part of batch during job.
14-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#38,function added fn_release_msg_browser starts
14-MAY-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag04 Ability to send bills to multiple client addresses Changes
23-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION , changed the copyright clause
23-OCT-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 FS Vol1 Tag09, Automated Advice Suppressing Changes, Declaration of two new function pr_insert_gtemp_event_advices is added.
11-MAR-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO CITIUS#18329 fn_release_pending_faxes function introduced.
21-MAR-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO CITIUS#18562 Retro Changes
24-MAR-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 FS Vol1 Tag09 ITR1 SFR#29 changes:New function decalration
20-OCT-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 RETRO CITIUS#19240 For Tranche Number: 001BTPR141780002,  SLT LS INTERFACE-   fail in the SLT LS Interface causing pram not to update
		Error: Supress record missing for participants or Supress value not same for all participants.
		System is failing in validation during PRAM when new investor is getting re-introduced prior to first introduction.
		Also As part of suppress participant advices processing system is performing multiple iterations which is taking time and resulting performance issues.

  Changed By         : Baljinder Singh
  Changed On         : 05-Mar-2020
  Search String      : 30586764
  Change Reason      : ADVICES STATUS IS SHOWING AS GENERATED BUT UNAUTHORIZED AND DUE TO WHICH EOD FAILS TO START DUE TO UNAUTHORIZED RECORDS
------------------------------------END CHANGE HISTORY ------------------------------------------------
*/

--03-dec-2007 FCC V.CL Release 7.3 ITR1 sfr#276,Message Generation Offline Changes,manas  starts
pkg_gmsg_seqno 	NUMBER;
g_auth_stat VARCHAR2(1) ; -- 30586764
--03-dec-2007 FCC V.CL Release 7.3 ITR1 sfr#276,Message Generation Offline Changes,manas  ends
Function fn_insert_msg_hoff
			(
			pContractRefNo		IN			oltbs_contract.contract_ref_no%Type,
			pEventSeqNo			IN			oltbs_contract_event_advice.event_seq_no%type,
			pEventCode			IN			oltms_product_event_advice.event_code%type,
			pAction				IN			Char, -- (I)nput, (A)uthorize
			pProcessingDate	IN			Date,
			pErrorCode			OUT		Ertbs_msgs.Err_code%Type
			)
			Return Boolean;

Function fn_pop_contract_event_advice
			(
			pContractRefNo	IN			oltbs_contract.contract_ref_no%Type,
			pProductCode	IN			oltbs_contract.product_code%Type,
			pModuleCode		IN			oltbs_contract.module_code%Type,
			pEventSeqNo		IN			oltbs_contract_event_advice.event_seq_no%type,
			pEventCode		IN			oltms_product_event_advice.event_code%type,
			pAuthStatus		IN			oltbs_contract.auth_status%type,
			pErrorCode		OUT		Ertbs_msgs.Err_code%Type
			)
			Return Boolean;
--15-OCT-2007 FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-LS#84 starts
--14-MAY-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag04 Ability to send bills to multiple client addresses Changes starts
FUNCTION fn_insert_msg_hoff_ld(
				pcontractrefno IN oltbs_contract.contract_ref_no%type,
				p_product_code IN oltms_product_event_advice.product_code%type,
				p_eventseqno IN oltbs_contract_event_log.event_seq_no%type,
				P_messagetype IN oltms_msg_format.msg_type%type,
				p_counterparty IN oltbs_dly_msg_out.receiver%type,
				P_custname IN oltbs_dly_msg_out.receiver%type,
				P_suppress IN VARCHAR2,
				P_contract_ccy IN oltbs_contract.contract_ccy%type,
				P_priority IN oltms_product_event_advice.priority%type,
				P_module_code IN oltbs_contract.module_code%type,
				P_branch IN VARCHAR2,
				p_swift_messages IN VARCHAR2,
				p_amt IN oltbs_dly_msg_out.amount%TYPE,
				P_gen_on_input IN oltbs_dly_msg_out.generate_on_input%TYPE ,
				perrorcode     OUT      ertbs_msgs.err_code%TYPE
				)
RETURN BOOLEAN;
--14-MAY-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag04 Ability to send bills to multiple client addresses Changes ends
FUNCTION Fn_genmsg_oninput
				(p_contract_ref_no 	IN 	   oltbs_contract.contract_ref_no%TYPE,
				 p_module			IN     varchar2,
				 p_err_code   		IN OUT varchar2,
				 p_err_param  		IN OUT varchar2
				 )
RETURN BOOLEAN;

FUNCTION Fn_adv_gen_input(  p_contract_ref_no IN 		varchar2,
			    p_esn             IN 		number,
			    p_module		  IN        varchar2,	--09-NOV-2007 FCC V.CL Release 7.3 ITR1 sfr#276,Message Generation Offline Changes
			    P_borr_ref_no 	  IN        varchar2,	--09-NOV-2007 FCC V.CL Release 7.3 ITR1 sfr#276,Message Generation Offline Changes
			    p_err_code        IN OUT 	varchar2,
			    p_err_params      IN OUT 	varchar2
			  )
RETURN BOOLEAN;
--14-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#2,Retro Changes CITIUS-LS-821 START
FUNCTION  fn_release_batch_msgs
		(	p_brn		IN	VARCHAR2,
			p_err_code	IN OUT	VARCHAR2,
			p_err_param	IN OUT	VARCHAR2
		)
RETURN BOOLEAN;
--14-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#2,Retro Changes CITIUS-LS-821 end
--11-MAR-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO CITIUS#18329 start
FUNCTION  fn_release_pending_faxes
		(	p_brn		IN	VARCHAR2,
			p_err_code	IN OUT	VARCHAR2,
			p_err_param	IN OUT	VARCHAR2
		)
RETURN BOOLEAN;
--11-MAR-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO CITIUS#18329 end
--14-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#38,function added fn_release_msg_browser starts
FUNCTION Fn_release_msg_browser
					   (p_contract_ref_no  		   oltbs_dly_msg_out.reference_no%TYPE,
					    p_esn					   oltbs_contract.latest_event_seq_no%TYPE,
					    P_dcn					   oltbs_dly_msg_out.dcn%TYPE,
						p_release_allpart		   Varchar2,
						p_msg_status 			   Varchar2,
						p_action				   Varchar2,
						p_err_code		 	IN OUT Varchar2,
						p_err_param	   		IN OUT Varchar2
						)
RETURN BOOLEAN;
--14-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#38,function added fn_release_msg_b4rowser ends
FUNCTION Fn_release_msg(p_contract_ref_no  		   oltbs_dly_msg_out.reference_no%TYPE,
						p_esn					   oltbs_contract.latest_event_seq_no%TYPE,
						p_release_part		 	   Varchar2,
						p_err_code		 	IN OUT Varchar2,
						p_err_param	   		IN OUT Varchar2
						)
RETURN BOOLEAN;
--15-OCT-2007 FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-LS#84 ends
--03-dec-2007 FCC V.CL Release 7.3 ITR1 sfr#276,Message Generation Offline Changes,manas  starts
PROCEDURE pr_generate_gmsg_seqno;  -- 08-JUN-2007  Message Generation Performance tuning changes
--03-dec-2007 FCC V.CL Release 7.3 ITR1 sfr#276,Message Generation Offline Changes,manas  ends
--21-MAR-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO CITIUS#18562 Retro change starts
--23-OCT-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 FS Vol1 Tag09, Automated Advice Suppressing Changes Starts
PROCEDURE pr_insert_gtemp_event_advices
			(
				p_contract_ref_no	IN	VARCHAR2,
				p_event_seq_no		IN	NUMBER,
				p_event_code		IN	VARCHAR2,
				p_product_code		IN	VARCHAR2,
				p_function_id		IN	VARCHAR2
			);
--23-OCT-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 FS Vol1 Tag09, Automated Advice Suppressing Changes Ends
--21-MAR-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO CITIUS#18562 Retro change ends.
--24-MAR-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 FS Vol1 Tag09 ITR1 SFR#29 changes start
PROCEDURE pr_update_gtemp_event_adv
(
	p_borr_ref_no 	IN 	VARCHAR2
	,p_part_ref_no 	IN 	VARCHAR2 DEFAULT NULL--CITIUS#19240 Changes
);
FUNCTION Fn_chk_suppress
(
	p_contract_ref_no	IN		oltbs_contract.contract_ref_no%TYPE,
	p_err_code		IN OUT 	VARCHAR2,
	p_err_param		IN OUT	VARCHAR2
)
RETURN BOOLEAN;
--24-MAR-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 FS Vol1 Tag09 ITR1 SFR#29 changes end
End olpks_adv_misc;
/
Create or replace Synonym olpkss_adv_misc for olpks_adv_misc
/