CREATE OR REPLACE Package lbpks_swift_addon
As
/*-----------------------------------------------------------------------------------
**
** File Name	: lbpks_swift_addon.SPC
** Module	: LOAN SYNDICATION
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
-------------------------------------------------------------------------------------
*/

/*----------------------------------CHANGE HISTORY----------------------------------
06-Apr-2003 FCC 4.2 Apr 2003 LS changes. commented out code for populating swift fields


------------------------------------END CHANGE HISTORY-------------------------------------
*/


TYPE contract_struct IS RECORD
	(
	module			oltbs_contract.module_code%TYPE,
	product_type		oltbs_contract.product_type%TYPE,
	contract_ccy		oltbs_contract.contract_ccy%TYPE,
	customer			oltbs_contract.counterparty%TYPE,
	booking_date		date,
	payment_method		oltbs_contract_master.payment_method%TYPE,
	current_version_no	oltbs_contract.latest_version_no%TYPE,
	current_event_no		oltbs_contract.latest_event_seq_no%TYPE,
	contract_amount		oltbs_contract_master.amount%TYPE,
	value_date			date,
	maturity_type		oltbs_contract_master.maturity_type%TYPE,
	maturity_date		date,
	notice_days			oltbs_contract_master.notice_days%TYPE,
	primary_interest		oltbs_contract_master.main_comp%TYPE
	);


FUNCTION fn_format_amount_for_swift
	(
	p_amount			IN	number,
	p_formatted_amount	OUT	varchar2
	)
	RETURN boolean;
--FCC 4.2 Apr 2003 LS changes start
/*FUNCTION fn_populate_field_20
	(
	p_out_msg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_adv_loop_count	IN OUT	integer,
	rec_party		IN 		lbtbs_drawdown_participants%rowtype
	)
	RETURN boolean;

FUNCTION fn_populate_field_21
	(
	p_out_msg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_adv_loop_count	IN OUT	integer,
	REC_PARTY		IN 		lbtbs_drawdown_participants%ROWTYPE
	)
	RETURN boolean;

FUNCTION fn_populate_field_23
	(
	p_out_msg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_adv_loop_count	IN 	OUT	integer
	)
	RETURN boolean;

FUNCTION fn_populate_field_29A
	(
	p_out_msg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_adv_loop_count	IN 	OUT	integer
	)
	RETURN boolean;

FUNCTION fn_populate_field_29B
	(
	p_out_msg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_adv_loop_count	IN OUT	integer
	)
	RETURN boolean;

FUNCTION fn_populate_field_32A
	(
	p_out_msg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_adv_loop_count	IN OUT	integer,
	REC_PARTY		IN 		lbtbs_drawdown_participants%ROWTYPE
	)
	RETURN boolean;

FUNCTION fn_populate_field_88D
	(
	p_out_msg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_adv_loop_count	IN OUT	integer,
	rec_party		IN 		lbtbs_drawdown_participants%ROWTYPE
	)
	RETURN boolean;

FUNCTION fn_populate_field_26P
	(
	p_out_msg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_adv_loop_count	IN OUT	integer,
	REC_PARTY		IN 		lbtbs_drawdown_participants%ROWTYPE
	)
	RETURN boolean;

FUNCTION fn_populate_field_32P
	(
	p_out_msg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_adv_loop_count	IN OUT	integer,
	rec_party		IN 		lbtbs_drawdown_participants%ROWTYPE
	)
	RETURN boolean;

FUNCTION fn_populate_field_33A
	(
	p_out_msg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_adv_loop_count	IN 	OUT	integer,
	rec_party		IN 		lbtbs_drawdown_participants%rowtype
	)
	RETURN boolean;

FUNCTION fn_populate_field_57A
	(
	p_out_msg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_adv_loop_count	IN OUT	integer,
	REC_PARTY		IN 		lbtbs_drawdown_participants%ROWTYPE
	)
	RETURN boolean;

FUNCTION fn_populate_field_72
	(
	p_out_msg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_adv_loop_count	IN OUT	integer,
	REC_PARTY		IN 		lbtbs_drawdown_participants%ROWTYPE
	)
	RETURN boolean;

FUNCTION fn_populate_field_26N
	(
	p_out_msg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_adv_loop_count	IN 	OUT	integer,
	REC_PARTY		IN		lbtbs_drawdown_participants%rowtype
	)
	RETURN boolean;

FUNCTION fn_populate_field_32E
	(
	p_out_msg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_adv_loop_count	IN 	OUT	integer,
	rec_party		IN 		lbtbs_drawdown_participants%rowtype
	)
	RETURN boolean;

FUNCTION fn_populate_field_31FC
	(
	p_out_msg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_adv_loop_count	IN OUT	integer,
	REC_PARTY		IN 		lbtbs_drawdown_participants%ROWTYPE
	)
	RETURN boolean;

FUNCTION fn_populate_field_31FB
	(
	p_out_msg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_adv_loop_count	IN OUT	integer,
	REC_PARTY		IN 		lbtb_drawdown_participants%ROWTYPE
	)
	RETURN boolean;


FUNCTION fn_populate_field_31R
	(
	p_out_msg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_adv_loop_count	IN 	OUT	integer,
	rec_party		IN		lbtbs_drawdown_participants%rowtype
	)
	RETURN boolean;

FUNCTION fn_populate_field_32B
	(
	p_out_msg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_adv_loop_count	IN 	OUT	integer,
	rec_party		IN		lbtbs_drawdown_participants%rowtype
	)
	RETURN boolean;

FUNCTION fn_populate_field_33B
	(
	p_out_msg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_adv_loop_count	IN 	OUT	integer,
	rec_party		IN 		lbtbs_drawdown_participants%rowtype
	)
	RETURN boolean;

FUNCTION fn_populate_field_36
	(
	p_out_msg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_adv_loop_count	IN 	OUT	integer,
	rec_party		IN    	lbtbs_drawdown_participants%ROWTYPE
	)
	RETURN boolean;

FUNCTION fn_populate_field_37G
	(
	p_out_msg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_adv_loop_count	IN OUT	integer,
	rec_party		IN    	lbtbs_drawdown_participants%ROWTYPE
	)
	RETURN boolean;

FUNCTION fn_populate_field_37M
	(
	p_out_msg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_adv_loop_count	IN OUT	integer,
	rec_party		IN    	lbtbs_drawdown_participants%ROWTYPE
	)
	RETURN boolean;

FUNCTION fn_populate_field_37A	(
	p_out_msg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_adv_loop_count	IN OUT	integer,
	rec_party		IN    	lbtbs_drawdown_participants%ROWTYPE
	)
	RETURN boolean;

--mt646 starts


FUNCTION fn_populate_swift_field_23
	(
	p_out_msg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_adv_loop_count	IN 	OUT	integer
	)
	RETURN boolean;



FUNCTION fn_populate_646_field_26P
	(
	p_out_msg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_adv_loop_count	IN OUT	integer,
	rec_party		IN		lbtbs_drawdown_participants%ROWTYPE
	)
	RETURN boolean;



FUNCTION fn_populate_swift_field_31F
	(
	p_out_msg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_adv_loop_count	IN OUT	integer
	)
	RETURN boolean;

FUNCTION fn_populate_swift_field_33B
	(
	p_out_msg_record	IN	oltbs_dly_msg_out%ROWTYPE,
	p_adv_loop_count	IN 	OUT	integer
	)
	RETURN boolean;

----------------------for SEQUENCE B OR C----------------------------------------------
FUNCTION fn_populate_swift_field_34N
	(
	p_out_msg_record	IN	oltbs_dly_msg_out%ROWTYPE,
	p_adv_loop_count	IN 	OUT	integer,
	p_sequence        IN    varchar2
	)
	RETURN boolean;

FUNCTION fn_populate_swift_field_37A
	(
	p_out_msg_record	IN	oltbs_dly_msg_out%ROWTYPE,
	p_adv_loop_count	IN 	OUT	integer
	)
	RETURN boolean;

FUNCTION fn_populate_swift_field_32A
	(
	p_out_msg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_adv_loop_count	IN OUT	integer
	)
	RETURN boolean;

FUNCTION fn_populate_swift_field_32N
	(
	p_out_msg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_adv_loop_count	IN OUT	integer
	)
	RETURN boolean;


FUNCTION fn_populate_swift_field_33N
	(
	p_out_msg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_adv_loop_count	IN OUT	integer
	)
	RETURN boolean;

FUNCTION fn_populate_swift_field_34P
	(
	p_out_msg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_adv_loop_count	IN OUT	integer
	)
	RETURN boolean;

FUNCTION fn_populate_swift_field_34R
	(
	p_out_msg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_adv_loop_count	IN OUT	integer
	)
	RETURN boolean;
--mt646 ends

-------------------------------------------------------MT645 STARTS--------------------------------------------
FUNCTION fn_populate_645_field_71B
	(
	p_out_msg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_adv_loop_count	IN OUT	integer
	)
	RETURN boolean;

FUNCTION fn_populate_645_field_31F
	(
	p_out_msg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_adv_loop_count	IN OUT	integer
	)
	RETURN boolean;

FUNCTION fn_populate_645_field_33B
	(
	p_out_msg_record	IN	oltbs_dly_msg_out%ROWTYPE,
	p_adv_loop_count	IN 	OUT	integer
	)
	RETURN boolean;


FUNCTION fn_populate_645_field_34B
	(
	p_out_msg_record	IN	oltbs_dly_msg_out%ROWTYPE,
	p_adv_loop_count	IN 	OUT	integer
	)
	RETURN boolean;

FUNCTION fn_populate_645_field_33A
	(
	p_out_msg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_adv_loop_count	IN OUT	integer
	)
	RETURN boolean;

FUNCTION fn_populate_645_field_34A
	(
	p_out_msg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_adv_loop_count	IN OUT	integer
	)
	RETURN boolean;

FUNCTION fn_populate_645_field_23
	(
	p_out_msg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_adv_loop_count	IN OUT	integer
	)
	RETURN boolean;*/
----FCC 4.2 Apr 2003 LS changes end
-------------------------------------------------------MT645 ENDS--------------------------------------------


FUNCTION fn_populate_swift_header
	(
	p_out_msg_record		IN		oltbs_dly_msg_out%ROWTYPE,
	p_sender_swift_address	IN		sttms_core_swift_address.swift_address%TYPE,
	p_recvr_swift_address	IN		sttms_core_swift_address.swift_address%TYPE,
	p_adv_loop_count		IN OUT	integer
	)
	RETURN boolean;

FUNCTION fn_populate_swift_field
	(
	p_out_msg_record		IN		oltbs_dly_msg_out%ROWTYPE,
	p_swift_tag			IN		varchar2,
	p_option			IN		varchar2,
	p_field_value		IN		varchar2,
	p_adv_loop_count		IN OUT	integer
	)
	RETURN boolean;

FUNCTION fn_populate_swift_footer
	(
	p_out_msg_record	IN		oltbs_dly_msg_out%ROWTYPE,
	p_adv_loop_count	IN OUT	integer
	)
	RETURN boolean;

End;
/