CREATE OR REPLACE PACKAGE olpks_sgen_new
AS

/*-------------------------------------------------------------------------------------------------------------------
**
** File Name	: olpks_sgen_new.SPC
**
** Module		: IS
**
This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
*/

/*CHANGE HISTORY
13-DEC-2003 FCC 4.4 DEC 2003 ITR1 SFR 310 * Added fields payment_message_date and receive_message_date
							  in settlement info table type variable
							* Added parameter processing_date to function fn_process_contract  
16-DEC-2003 FCC 4.4 DEC 2003 ITR1 made p_due_table IN OUT
30-MAR-2004 --FCC 4.5 APR 2004 CHANGES FOR RNTC	-- ITR1 SFR 11
09-MAY-2016 OFCL12.2 Removed unwanted calls to LC,BC , SE,DV


------------------------------------------------------------------------------------------------------------------
*/

TYPE rec_settlement_info IS RECORD
	(
	amount_tag			oltms_product_amounttag_type.amount_tag%TYPE			,
	component			oltbs_amount_due_cs.component%TYPE					,
	tag_type			oltms_product_amounttag_type.amt_tag_type%TYPE			,
	pay_receive_ind		VARCHAR2(1)									,
	value_date			DATE										,
	msg_amount			NUMBER									,
	ex_rate			oltbs_daily_log_ac.exch_rate%TYPE					,
	msg_ind			VARCHAR2(1)									,
	msg_net_ind			oltms_product_event_acct_entry.msg_netting_indicator%TYPE	,
	net_ind			oltms_product_event_acct_entry.netting_indicator%TYPE		,
	ac_or_gl			oltbs_account.ac_or_gl%TYPE						,
	settlement_required	VARCHAR2(1)									,
	--FCC 4.4 DEC 2003 ITR1 SFR 310	
	pay_message_date		DATE,
	recv_message_date		DATE,
	rntc_message_date		DATE,		--fcc 4.5 apr 2004 changes for RNTC
	--FCC 4.4 DEC 2003 ITR1 SFR 310
	gen_pmsg			VARCHAR2(1),	--fcc 4.5 apr 2004 changes for RNTC
	gen_rmsg			VARCHAR2(1),	--fcc 4.5 apr 2004 changes for RNTC
	gen_rntc			VARCHAR2(1),	--fcc 4.5 apr 2004 changes for RNTC
	rntc_event_seq_no		NUMBER(4),		--fcc 4.5 apr 2004 changes for RNTC
	pmsg_event_seq_no		NUMBER(4),		--fcc 4.5 apr 2004 changes for RNTC
	rmsg_event_seq_no		NUMBER(4),		--fcc 4.5 apr 2004 changes for RNTC
	due_date			DATE
	);

---------------------------------------------------------------------------------------------------------------

TYPE tb_settlement_info IS TABLE OF rec_settlement_info
INDEX BY VARCHAR2(20);

---------------------------------------------------------------------------------------------------------------

FUNCTION fn_process_contract
	(
	p_processing_date		IN		DATE				,
	p_contract_ref_no		IN		VARCHAR2			,
	p_currency			IN		VARCHAR2			,
	p_due_table			IN OUT		olpkss_sgen.due_tab_type,		-- fcc 4.4 dec 2003 ITR1 changes
	p_error_code			IN OUT	VARCHAR2			,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

---------------------------------------------------------------------------------------------------------------

END olpks_sgen_new;
/
CREATE or replace SYNONYM olpkss_sgen_new FOR olpks_sgen_new
/