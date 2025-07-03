CREATE OR REPLACE FORCE VIEW tlvw_position_mtd_ytd_bal
	(
		cusip_no
	,	position_identifier
	,	month
	,	year
	,	unit_head
	,	component_ccy
	,	mtd_bal_lcy
	,	ytd_bal_lcy
	,	mtd_bal_fcy
	,	ytd_bal_fcy
	,	mtd_inc_lcy
	,	mtd_exp_lcy
	,	mtd_inc_fcy
	,	mtd_exp_fcy
	)
AS
/*---------------------------------------------------------------------------------------------------
**
** File Name	: tlvw_position_mtd_ytd_bal.VW
**
** Module	: LT - SECONDARY LOAN TRADING
**
This source is part of the Oracle Banking Corporate Lending  Software Product. 
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
or otherwise, translated in any language or computer language, without the prior written permission 
of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
/*----------------------------------CHANGE HISTORY---------------------------------------------------
31-Aug-2009 SLT BO Report related changes
----------------------------------END CHANGE HISTORY------------------------------------------------
*/
	SELECT	a.cusip_no
	,	a.position_identifier
	,	b.month
	,	b.year
	,	b.unit_head
	,	b.component_ccy
	,	SUM(NVL(b.mtd_bal_lcy,0))
	,	SUM(NVL(b.ytd_bal_lcy,0))
	,	SUM(NVL(b.mtd_bal_fcy,0))
	,	SUM(NVL(b.ytd_bal_fcy,0))
	,	SUM(DECODE(SIGN(NVL(b.mtd_bal_lcy,0)),1,NVL(b.mtd_bal_lcy,0),0))
	,	SUM(DECODE(SIGN(NVL(b.mtd_bal_lcy,0)),1,0,NVL(b.mtd_bal_lcy,0)))
	,	SUM(DECODE(SIGN(NVL(b.mtd_bal_fcy,0)),1,NVL(b.mtd_bal_fcy,0),0))
	,	SUM(DECODE(SIGN(NVL(b.mtd_bal_fcy,0)),1,0,NVL(b.mtd_bal_fcy,0)))
	FROM	tltbs_contract_master a
	,	tltbs_contract_mtd_ytd_bal b
	WHERE	a.contract_ref_no	=	b.contract_ref_no
	AND	a.version_no		=	
						(
						SELECT	MAX(c.version_no)
						FROM	tltbs_contract_master c
						WHERE	c.contract_ref_no	=	a.contract_ref_no
						)
	GROUP BY (a.cusip_no,a.position_identifier,b.month,b.year,b.unit_head,b.component_ccy)
/
CREATE OR REPLACE SYNONYM tlvws_position_mtd_ytd_bal FOR tlvw_position_mtd_ytd_bal
/