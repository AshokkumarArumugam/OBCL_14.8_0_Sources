CREATE OR REPLACE PACKAGE lbpks_diary_advices
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lbpks_diary_advices.SPC
**
** Module		: LS
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

/* Change history
21-JAN-2003 FCC4.2 APR 2003 CITIPLC DEVELOPMENT REQUIREMENTS
	THIS PACKAGE IS USED FOR LS MODULE AND CATERS TO ADHOC FEE RELATED PROCESSING FOR CONTRACTS
	AND ACCOUNTING ROLE AND AMOUNT TAG RELATED SETUP
17-JUN-2005		FCC 4.6.2, Suraj, CITI LS changes
			Existing Function brought to SPEC - fn_trigger_ZDAD_event has been added to trigger ZDAD
			event for the contract after the generation of Internal Diary event.
07-Jan-2010 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION FCC V.CL Release 7.5 lot 1.2 LS Release UK Retro, 29-OCT-2009 CITILSUPG00009 Added fn_delete_ZDAD_event to delete ZDAD event
*/
------------------------------------------------------------------------------------------------------



---------------------------------------------------------------------------------------------
FUNCTION FN_GEN_DIARY_ADVICES
(
	cur IN OUT oltbs_dly_msg_out%ROWTYPE
)RETURN BOOLEAN;

FUNCTION FN_INSERT_MSG_HANDOFF
(
	p_module		IN 	oltbs_contract.MODULE_CODE%TYPE,
	p_contract_ref_no IN 	oltbs_dly_msg_out.reference_no%type,
	p_msg_type		IN	oltbs_dly_msg_out.MSG_TYPE%TYPE,
	p_diary_esn		IN	oltbs_contract.LATEST_EVENT_SEQ_NO%TYPE,
	p_sub_esn		IN    oltbs_contract_diary_status.DIARY_EVENT_SUB_SEQ_NO%TYPE,
	p_esn			OUT	oltbs_contract.LATEST_EVENT_SEQ_NO%TYPE,
	err_code		OUT	ERTBS_MSGS.ERR_CODE%TYPE,
	err_msg		OUT	ERTBS_MSGS.MESSAGE%TYPE
)RETURN BOOLEAN;
-- FCC 4.6.2, Suraj, CITI LS changes, A new function added to trigger ZDAD event for internal Diary event, Changes START
FUNCTION fn_trigger_ZDAD_event
(
	p_module		IN 		oltbs_contract.module_code%TYPE,
	p_contract_ref_no IN 		oltbs_contract.contract_ref_no%TYPE,
	p_error_code	IN 		OUT VARCHAR2,
	p_error_parameter	IN 		OUT VARCHAR2,
	p_latest_esn	IN OUT   	oltbs_contract.latest_event_seq_no%TYPE 
) RETURN BOOLEAN;
-- FCC 4.6.2, Suraj, CITI LS changes, A new function added to trigger ZDAD event for internal Diary event, Changes END

--07-Jan-2010 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION FCC V.CL Release 7.5 lot 1.2 LS Release UK Retro, CITILSUPG00009 Added following to delete ZDAD event START
FUNCTION fn_delete_ZDAD_event
(
	p_contract_ref_no IN oltbs_dly_msg_out.reference_no%TYPE,
	p_esn IN oltbs_contract.latest_event_seq_no%TYPE,
	p_dcn IN 	OLTB_DLY_MSG_OUT.dcn%type,
	p_diary_esn IN oltbs_contract.latest_event_seq_no%TYPE,
	p_sub_esn IN oltbs_contract_diary_status.diary_event_sub_seq_no%TYPE,
	p_error_code			IN OUT 	 VARCHAR2,
	p_error_parameter		IN OUT   VARCHAR2
) RETURN BOOLEAN;
--07-Jan-2010 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION FCC V.CL Release 7.5 lot 1.2 LS Release UK Retro, CITILSUPG00009 Added following to delete ZDAD event END

end lbpks_diary_advices;
/
CREATE or replace SYNONYM lbpkss_diary_advices FOR lbpks_diary_advices
/