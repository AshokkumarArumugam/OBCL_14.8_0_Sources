CREATE OR REPLACE FORCE VIEW olvw_repmt_summ (
	COMMITMENT_REF_NO,
	PAY_BY_DATE,
	CONTRACT_CCY,
	AMOUNT_DUE,
	AMOUNT_SETTLED
) AS
SELECT f.linked_to_ref commitment_ref_no, 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: OLVW_REPMT_SUMM.VW
**
** This source is part of the Oracle Banking Software Product.
** Oracle Banking Corporate Lending  Software Product.   Copyright Â© 2018.  All rights reserved
**
** No part of this work may be reproduced, stored in a retrieval system, adopted
** or transmitted in any form or by any means, electronic, mechanical,
** photographic, graphic, optic recording or otherwise, translated in any
** language or computer language, without the prior written permission of
** Oracle and/or its affiliates.
**
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India
** India
-------------------------------------------------------------------------------------------------------
CHANGE HISTORY

	Author		        : Chandra Prasath N
	Description 		: Created to display the Loan Repayment Schedule details
	Date Created        : 25/11/2020

----------------------------------------------------------------------------------------------------
*/
	       nvl(g.pay_by_date,g.due_date) pay_by_date,
	       a.contract_ccy,
	       SUM(g.amount_due) amount_due,
	       SUM(g.amount_settled) amount_settled
	FROM oltbs_contract a,
	     oltbs_contract_linkages f,
	     oltb_amount_due_cs g
	WHERE f.contract_ref_no (+) = a.contract_ref_no
	      AND   f.version_no (+) = a.latest_version_no
	      AND   g.contract_ref_no (+) = a.contract_ref_no
	GROUP BY f.linked_to_ref,
	         nvl(g.pay_by_date,g.due_date),
	         a.contract_ccy
	ORDER BY nvl(g.pay_by_date,g.due_date)
/

CREATE OR REPLACE SYNONYM olvws_repmt_summ FOR olvw_repmt_summ
/