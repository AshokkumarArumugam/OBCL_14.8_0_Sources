CREATE OR REPLACE PACKAGE olpks_yield_calc
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : olpks_yield_calc.SPC
**
** Module       : SECURITIES
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
CHANGE_HISTORY

29-Oct-2001		Flexcube v3.8	DPRP Accrual on Constant Yield Basis

08-OCT-2003 FCC4.3.1 OCT 2003 EIM Changes
	-- Added new parameters to fn_tbill_calc

CHANGE_HISTORY
*/
--------------------------------------------------------------------------------
/*
a) Table of records for cash flows should not have price (.i.e. initial outflow)
b) Factor is the power to which (1+y) is to be raised, where y is the yield-
	the day count fraction (+ve)
	e.g 100/(1+y)^2.45 -->> the factor is 2.45
c) The cash flow TYPE indicates whether the cash flow is a coupon cash flow, etc
	C --> Coupon
	R --> Redemption
d)	There should not be any holes in the PL/SQL table of records
15-Dec-2004 FCC 4.6.1 Lot1 YACR Changes-- Added functions fn_compute_bnd_priceto_yld,fn_compute_bnd_yldtoprice.
*/

TYPE rec_cash_flows IS RECORD
	(
	cash_flow							oltbs_amount_due_cs.amount_due%TYPE, --FCC 4.6.1 Lot1 YACR Changes
	cash_flow_type						CHAR(1),
	factor								NUMBER
	);

TYPE tor_cash_flows IS TABLE OF rec_cash_flows
	INDEX BY BINARY_INTEGER;
--------------------------------------------------------------------------------
-- OFCL12.2 commented
/*FUNCTION fn_tbill_calc
	(
	p_value_date		IN		DATE,
	p_maturity_date		IN		DATE,
	p_redemption_value	IN		NUMBER,
	p_basis			IN		CHAR,
	--
	--FCC4.3.1 OCT 2003 EIM changes start
	p_use_bond_formula	IN		setms_security_master.use_bond_formula%TYPE,
	p_period_for_reinv	IN		setms_security_master.tbill_reinv_period%TYPE,
	p_annualizing_method	IN		setms_security_master.tbill_annualizing_method%TYPE,
	--
	--FCC4.3.1 OCT 2003 EIM changes start
	--
	p_yield			IN OUT	NUMBER,
	p_price			IN OUT	NUMBER,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2,
	p_mode			IN		VARCHAR2			DEFAULT 'R'
	)
	RETURN BOOLEAN;*/
-- OFCL12.2 commented	
--------------------------------------------------------------------------------
FUNCTION fn_get_pv
	(
	p_value					IN			NUMBER,
	p_tor_cash_flows		IN			tor_cash_flows,
	p_pvdiff					OUT		NUMBER
	)
	RETURN NUMBER;
--------------------------------------------------------------------------------
-- 29-Oct-2001, Flexcube v3.8, Changes for DPRP Accrual on Constant Yield Basis
-- Changed order and name of parameters
FUNCTION fn_bond_pricetoyield
	(
	p_abs_price				IN		NUMBER,
	p_accrued_interest		IN		NUMBER,
	p_coupon_rate			IN		NUMBER,
	p_tor_cash_flows			IN		tor_cash_flows,
	p_yield				OUT		NUMBER,
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter			IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;
--------------------------------------------------------------------------------
-- 29-Oct-2001, Flexcube v3.8, Changes for DPRP Accrual on Constant Yield Basis
-- Changed order and name of parameters
FUNCTION fn_bond_yieldtoprice
	(
	p_yield				IN		NUMBER,
	p_tor_cash_flows			IN		tor_cash_flows,
	p_accr_interest			IN		NUMBER,
	p_absolute_price			OUT		NUMBER,
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter			IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;
--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
--FCC 4.6.1 Lot1 YACR ChangesStart
--

FUNCTION fn_compute_bnd_priceto_yld
	(
		p_abs_price			IN		NUMBER		,
		p_accrued_interest		IN		NUMBER		,
		p_os_redemption_prem_accr	IN		NUMBER		,
		p_os_interest_adj_accr		IN		NUMBER		,
		p_coupon_rate			IN		NUMBER		,
		p_tor_cash_flows		IN		tor_cash_flows	,
		p_yield				OUT		NUMBER		,
		p_error_code			IN OUT		VARCHAR2	,
		p_error_parameter		IN OUT		VARCHAR2
	)
	RETURN BOOLEAN;
	

FUNCTION fn_compute_bnd_yldtoprice
	(
		p_yield				IN		NUMBER		,
		p_accrued_interest		IN		NUMBER		,
		p_os_redemption_prem_accr	IN		NUMBER		,
		p_os_interest_adj_accr		IN		NUMBER		,
		p_tor_cash_flows		IN		tor_cash_flows	,
		p_disc_tba			OUT		NUMBER		,
		p_error_code			IN OUT		VARCHAR2	,
		p_error_parameter		IN OUT		VARCHAR2
	)
	RETURN BOOLEAN;	

--
--FCC 4.6.1 Lot1 YACR Changes End	
--------------------------------------------------------------------------------
END olpks_yield_calc;
/
CREATE or replace SYNONYM olpkss_yield_calc FOR olpks_yield_calc
/