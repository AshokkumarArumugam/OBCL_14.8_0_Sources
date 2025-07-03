CREATE OR REPLACE PACKAGE lbpks_reversal AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lbpks_reversal.SPC
**
** Module		: LOANS SYNDICATION
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
Package Created for LS Module FLEXCUBE V.CL Release 7.0
12-Oct-2006 FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-LS-147 error code during OUT can have length more then ertb_msgs error code.

*/

FUNCTION fn_reverse_contract(
	p_contract_ref_no	IN oltbs_contract.contract_ref_no%TYPE,
	p_current_event_seq_no IN oltbs_contract.latest_event_seq_no%TYPE,
	p_event_code IN oltbs_contract.curr_event_code%TYPE,
	p_handoff_action_code IN char,
	p_TranType IN oltms_trn_type.trn_type%TYPE,	
	p_error_code IN OUT varchar2,	-- FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-LS-147
	--p_error_code IN OUT ertbs_msgs.err_code%TYPE,--FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-LS-147
	p_error_parameter IN OUT varchar2)
RETURN boolean;

FUNCTION fn_reverse_contract(
	p_contract_ref_no	IN oltbs_contract.contract_ref_no%TYPE,
	p_current_event_seq_no IN oltbs_contract.latest_event_seq_no%TYPE,
	p_event_code IN oltbs_contract.curr_event_code%TYPE,
	p_handoff_action_code IN char,
	p_error_code IN OUT varchar2 ,	-- FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-LS-147
	--p_error_code IN OUT ertbs_msgs.err_code%TYPE, -- FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-LS-147
	p_error_parameter IN OUT varchar2)
RETURN boolean;

END lbpks_reversal;
/
Create or replace Synonym lbpkss_reversal for lbpks_reversal
/