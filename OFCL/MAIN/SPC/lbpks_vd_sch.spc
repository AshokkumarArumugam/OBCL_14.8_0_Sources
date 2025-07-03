CREATE or REPLACE PACKAGE lbpks_vd_sch AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lbpks_vd_sch.SPC
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
Change History
20-MAY-2008 FLEXCUBE V.CL Release 7.4 RT changes by Geetly to replicate the functioning of olpks_vd_sch for LS Module

*/

TYPE ty_rec_handoff IS RECORD(
	p_reference_no			oltbs_computation_handoff.contract_ref_no%TYPE,
	p_component			oltbs_computation_handoff.component%TYPE,
	p_effective_date		oltbs_computation_handoff.effective_date%TYPE,
	p_rate				oltbs_computation_handoff.rate%TYPE,
	p_amount			oltbs_computation_handoff.amount%TYPE,
	p_rate_sign			oltbs_computation_handoff.rate_sign%TYPE 
	);

TYPE ty_handoff IS TABLE OF ty_rec_handoff INDEX BY binary_INTEGER;

FUNCTION fn_princ_env(p_ref_no	IN VARCHAR2,
		      l_comput_handoff	IN oltbs_computation_handoff%ROWTYPE,
		      p_error_code	IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_princ(p_ref_no IN VARCHAR2,
		  p_component		IN oltbs_contract_iccf_calc.component%TYPE,
		  l_comput_handoff	IN oltbs_computation_handoff%ROWTYPE,
		  p_error_code		IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION	fn_mdchg(p_ref_no 	IN VARCHAR2,
			comput_handoff	IN oltbs_computation_handoff%ROWTYPE,
			p_error_code	IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION 	fn_rtchg(p_ref_no	 IN VARCHAR2,
			l_comput_handoff IN olpks_vd_sch.ty_handoff,
			p_error_code	 IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION	fn_rtchg
	(
		p_ref_no		IN		VARCHAR2,
		l_comput_handoff	IN		olpks_vd_sch.ty_handoff,
		p_schedule_date		IN		VARCHAR2,
		p_error_code		IN OUT 	VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_process_special_component
	(
	p_tab_comput	IN OUT	lfpkss_computation.ty_int,
	p_component_ccy	IN	oltbs_amount_due_cs.currency_amt_due%TYPE
	)
	RETURN boolean;

g_mdchg	varchar2(1) :='N' ;
g_rtchg	varchar2(1) :='N' ;

END lbpks_vd_sch;
/