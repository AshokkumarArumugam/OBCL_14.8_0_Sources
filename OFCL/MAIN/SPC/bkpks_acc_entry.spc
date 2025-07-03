CREATE OR REPLACE PACKAGE bkpks_acc_entry
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : bkpks_acc_entry.SPC
**
** Module       : BROKERAGE
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



FUNCTION fn_acc_entry
	(
	p_transaction_ref_no	IN	oltbs_handoff.trn_ref_no%TYPE,
	p_value_date		IN	date,
	p_current_event_seq_no	IN	oltbs_handoff.event_sr_no%TYPE,
	p_event			IN	oltbs_handoff.event%TYPE,
	p_handoff_action_code	IN	char,
	p_error_code		IN OUT	varchar2,	
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_reverse_acc_entry
	(
	p_transaction_ref_no	IN	oltbs_handoff.trn_ref_no%TYPE,
	p_reversed_event_seq_no	IN	oltbs_handoff.event_sr_no%TYPE,
	p_current_event_seq_no	IN	oltbs_handoff.event_sr_no%TYPE,
	p_event			IN	oltbs_handoff.event%TYPE,
	p_handoff_action_code	IN	char,
	p_error_code		IN OUT	varchar2,	
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

END bkpks_acc_entry;
/
CREATE or replace SYNONYM bkpkss_acc_entry FOR bkpks_acc_entry
/