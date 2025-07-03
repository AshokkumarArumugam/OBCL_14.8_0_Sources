CREATE OR REPLACE FORCE VIEW olvw_repmt_con_dtls (
	commitment_ref_no,
	contract_ref_no,
	pay_by_date,
	contract_ccy,
	component,
	amount_due,
	amount_settled,
	branch,
	module_code,
	product,
	product_type,
	auth_status,
	contract_status,
	user_ref_no,
	user_defined_status
) AS
SELECT f.linked_to_ref commitment_ref_no,
/*----------------------------------------------------------------------------------------------------
**
** File Name	: OLVW_REPMT_CON_DTLS.VW
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
	       a.contract_ref_no contract_ref_no,
	       nvl(g.pay_by_date,g.due_date) pay_by_date,
	       a.contract_ccy,
	       g.component,
	       g.amount_due,
	       g.amount_settled,
	       a.branch,
	       a.module_code,
	       a.product_code product,
	       a.product_type,
	       a.auth_status,
	       a.contract_status,
	       a.user_ref_no,
	       a.user_defined_status
	FROM oltbs_contract a,
	     oltbs_contract_linkages f,
	     oltb_amount_due_cs g
	WHERE f.contract_ref_no (+) = a.contract_ref_no
	      AND   f.version_no (+) = a.latest_version_no
	      AND   g.contract_ref_no (+) = a.contract_ref_no
	      AND   g.amount_due <> 0
	ORDER BY nvl(g.pay_by_date,g.due_date),
	         a.contract_ref_no,
	         g.component
/

CREATE OR REPLACE SYNONYM olvws_repmt_con_dtls FOR olvw_repmt_con_dtls
/