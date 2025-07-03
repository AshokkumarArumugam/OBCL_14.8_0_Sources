CREATE OR REPLACE FORCE VIEW olvw_repmt_con_summ (
	commitment_ref_no,
	contract_ref_no,
	pay_by_date,
	contract_ccy,
	amount_due,
	amount_settled,
	product,
	auth_status,
	contract_status,
	user_defined_status
) AS
SELECT t1.commitment_ref_no,
/*----------------------------------------------------------------------------------------------------
**
** File Name	: OLVW_REPMT_CON_SUMM.VW
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
	       t1.contract_ref_no,
	       t1.pay_by_date,
	       t1.contract_ccy,
	       t1.amount_due,
	       t1.amount_settled,
	       t2.product,
	       t2.auth_status,
	       t2.contract_status,
	       t2.user_defined_status
	FROM (
		SELECT d.linked_to_ref commitment_ref_no,
		       c.contract_ref_no contract_ref_no,
		       nvl(e.pay_by_date,e.due_date) pay_by_date,
		       c.contract_ccy,
		       SUM(e.amount_due) amount_due,
		       SUM(e.amount_settled) amount_settled
		FROM oltbs_contract c,
		     oltbs_contract_linkages d,
		     oltb_amount_due_cs e
		WHERE d.contract_ref_no (+) = c.contract_ref_no
		      AND   d.version_no (+) = c.latest_version_no
		      AND   e.contract_ref_no (+) = c.contract_ref_no
		GROUP BY d.linked_to_ref,
		         c.contract_ref_no,
		         nvl(e.pay_by_date,e.due_date),
		         c.contract_ccy
	) t1,
	     (
		SELECT a.contract_ref_no,
		       a.product_code product,
		       a.product_type,
		       a.auth_status,
		       a.contract_status,
		       a.user_ref_no,
		       a.user_defined_status
		FROM oltbs_contract a,
		     oltbs_contract_linkages b
		WHERE b.contract_ref_no (+) = a.contract_ref_no
		      AND   b.version_no (+) = a.latest_version_no
	) t2
	WHERE t1.contract_ref_no = t2.contract_ref_no
	ORDER BY t1.pay_by_date,
	         t1.contract_ref_no
/

CREATE OR REPLACE SYNONYM olvws_repmt_con_summ FOR olvw_repmt_con_summ
/