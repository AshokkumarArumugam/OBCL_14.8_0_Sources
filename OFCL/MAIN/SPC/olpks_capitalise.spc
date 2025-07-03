CREATE OR REPLACE PACKAGE olpks_capitalise as
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_capitalise.SPC
**
** Module		: LOANS and DEPOSITS
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


TYPE ty_rec_rate is RECORD(
		component	oltbs_contract_iccf_calc.component%type,
		rate		lftbs_contract_interest.rate%type,
		eff_date	date);

TYPE ty_tab_rate is TABLE of ty_rec_rate
	INDEX by BINARY_INTEGER;

TYPE ty_rec_capit is record(
	component	oltbs_amount_due_cs.component%type,
	schedule_date   oltbs_amount_due_cs.due_date%type,
	amount		oltbs_amount_due_cs.amount_due%type);

TYPE ty_tab_capit is table of ty_rec_capit
	Index by BINARY_INTEGER;

FUNCTION fn_capit
	(
	p_action_code		IN			varchar2,
	p_ref_no			IN			varchar2,
	p_latest_ver_no 	IN			number,
	p_principal			IN			oltbs_contract_iccf_calc.basis_amount%type,
	p_component 		IN			oltbs_contract_iccf_calc.component%type,
	p_eff_date			IN			date,
	p_proc_date			IN			date,
	h_tab           	IN			olpkss_recompute_schedules.tab_ty_comput,
	p_holiday_chk_failed OUT boolean,
	p_errmsg			IN			OUT	Varchar2
	) Return Boolean;

FUNCTION fn_capit (p_action_code	IN		VARCHAR2,
	p_ref_no		IN		VARCHAR2,
	p_latest_ver_no IN		NUMBER,
	p_principal		IN		oltbs_contract_iccf_calc.basis_amount%TYPE,
	p_component 	IN		oltbs_contract_iccf_calc.component%TYPE,
	p_eff_date		IN		DATE,
	p_proc_date		IN		DATE,
	p_holiday_chk_failed OUT boolean,
	p_errmsg		IN	OUT	VARCHAR2) 
RETURN BOOLEAN;

FUNCTION fn_capit_sch
	(
	p_ref_no			IN	varchar2,
	p_tab_capit		IN	ty_tab_capit,
	p_principal		IN	oltbs_contract_iccf_calc.basis_amount%type,
	p_eff_date		IN	date,
	p_ccy_code		IN	CYTMS_CCY_DEFN.ccy_code%type,
	p_int_rate		IN	lftbs_contract_interest.rate%type,
	p_int_basis		IN	lftbs_contract_interest.interest_basis%type,
	p_action_code	IN	varchar2,
	p_pnlty_seq_no IN number,
	p_errmsg			IN	Varchar2
	) Return Boolean;

FUNCTION fn_insert_comp
	(
	p_ref_no			IN			varchar2,
	p_tab_comput	IN OUT	lfpkss_computation.ty_int,
	p_capit_rec		IN OUT	oltbs_contract_iccf_calc%rowtype,
	p_pnlty_seq_no IN 		number,
	p_sched_Date	IN 		date
	) Return Boolean;

end;
/
create or replace synonym olpkss_capitalise for olpks_capitalise
/