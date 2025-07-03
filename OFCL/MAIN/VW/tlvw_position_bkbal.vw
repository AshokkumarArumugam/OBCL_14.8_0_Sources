CREATE OR REPLACE FORCE VIEW tlvw_position_bkbal
	(
		cusip_no
	,	position_identifier
	,	book_date
	,	component
	,	component_ccy
	,	unit_head
	,	opening_bal_lcy
	,	movement_lcy
	,	closing_bal_lcy
	,	opening_bal_fcy
	,	movement_fcy
	,	closing_bal_fcy
	)
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: tlvw_position_bkbal.VW
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
	,	b.book_date
	,	b.component
	,	b.component_ccy
	,	b.unit_head
	,	NVL(SUM(b.opening_bal_lcy),0)
	,	NVL(SUM(b.movement_lcy),0)
	,	NVL(SUM(b.closing_bal_lcy),0)
	,	NVL(SUM(b.opening_bal_fcy),0)
	,	NVL(SUM(b.movement_fcy),0)
	,	NVL(SUM(b.closing_bal_fcy),0)
	FROM	tltbs_contract_master a
	,	tltbs_contract_bkbal b
	WHERE	a.contract_ref_no	=	b.contract_ref_no
	AND	a.version_no		=	
						(
						SELECT	max(c.version_no)
						FROM	tltbs_contract_master c
						WHERE	c.contract_ref_no	=	a.contract_ref_no
						)
	GROUP BY (a.cusip_no,a.position_identifier,b.component,b.component_ccy,b.unit_head,b.book_date)
/
CREATE OR REPLACE SYNONYM tlvws_position_bkbal FOR tlvw_position_bkbal
/