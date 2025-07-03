CREATE OR REPLACE FORCE VIEW tlvw_position_accr_det
	(
		cusip_no
	,	position_identifier
	,	component_ccy
	,	unit_head
	,	tot_accr_lcy
	,	tot_accr_fcy
	,	receivable_lcy
	,	payable_lcy
	,	receivable_fcy
	,	payable_fcy
	)
AS
/*---------------------------------------------------------------------------------------------------
**
** File Name	: tlvw_position_accr_det.VW
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
	SELECT	b.cusip_no
	,	b.position_identifier
	,	c.component_ccy
	,	c.unit_head
	,	SUM(NVL(c.closing_bal_lcy,0))
	,	SUM(NVL(c.closing_bal_fcy,0))
	,	SUM(DECODE(SIGN(NVL(c.closing_bal_lcy,0)),1,NVL(c.closing_bal_lcy,0),0))
	,	SUM(DECODE(SIGN(NVL(c.closing_bal_lcy,0)),1,0,NVL(c.closing_bal_lcy,0)))
	,	SUM(DECODE(SIGN(NVL(c.closing_bal_fcy,0)),1,NVL(c.closing_bal_fcy,0),0))
	,	SUM(DECODE(SIGN(NVL(c.closing_bal_fcy,0)),1,0,NVL(c.closing_bal_fcy,0)))	
	FROM	oltbs_contract a
	,	tltbs_contract_master b	
	,	tltbs_contract_bkbal c
	WHERE	a.contract_ref_no	=	b.contract_ref_no
	AND	a.contract_ref_no	=	c.contract_ref_no
	AND	b.version_no		=	
						(
						SELECT	MAX(c.version_no)
						FROM	tltbs_contract_master c
						WHERE	c.contract_ref_no	=	a.contract_ref_no
						)
	AND	a.contract_status	=	'A'
	AND	c.book_date		=	
						(
						SELECT	MAX(d.book_date)
						FROM	tltbs_contract_bkbal d
						WHERE	d.contract_ref_no	=	c.contract_ref_no
						AND	d.component		=	c.component
						AND	d.component_ccy		=	c.component_ccy
						)
	GROUP BY (b.cusip_no,b.position_identifier,c.unit_head,c.component_ccy)
/
CREATE OR REPLACE SYNONYM tlvws_position_accr_det FOR tlvw_position_accr_det
/