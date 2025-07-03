CREATE OR REPLACE FORCE VIEW olvw_comm_uninit_loanamt
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : olvw_comm_uninit_loanamt.VW
**
** Module       : LD
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
/*
CHANGE HISTORY
31-DEC-2008 FLEXCUBE V.CL Release 7.4 MTR1 SFR#12, CITIUPG73100365 To add rollover amount in uninit loan amount in case of additional rollovers
*/
SELECT contract_ref_no, SUM(uninit_amount) AS uninit_amount
FROM (
	SELECT	c.contract_ref_no
	, (	SELECT	SUM(l1.converted_linked_amount)
		FROM	oltbs_contract_linkages l1
			, oltbs_contract c1
		WHERE	l1.linked_to_ref = c.contract_ref_no
		AND	l1.linkage_valid = 'Y'
		AND	c1.contract_status = 'Y'
		AND	c1.contract_ref_no = l1.contract_ref_no
		AND	l1.version_no = c1.latest_version_no
	) AS Uninit_amount
	FROM	oltbs_contract c
	WHERE	c.contract_status = 'A'
	AND	c.product_type = 'C'
	UNION
	SELECT
		c.contract_ref_no
		, fn_ol_get_fwdavami_amt (c.contract_ref_no, c.branch) AS Uninit_amount
	FROM	oltbs_contract c
	WHERE	c.contract_status = 'A'
	AND	c.product_type = 'C'
	--31-DEC-2008 FLEXCUBE V.CL Release 7.4 MTR1 SFR#12, CITIUPG73100365 Changes Starts
	UNION
	SELECT
		c.contract_ref_no
		, fn_ol_get_fwdroll_amt (c.contract_ref_no, c.branch) AS Uninit_amount
	FROM	oltbs_contract c
	WHERE	c.contract_status = 'A'
	AND	c.product_type = 'C'
	--31-DEC-2008 FLEXCUBE V.CL Release 7.4 MTR1 SFR#12, CITIUPG73100365 Changes Ends
)
GROUP BY contract_ref_no
/
CREATE OR REPLACE SYNONYM olvws_comm_uninit_loanamt FOR olvw_comm_uninit_loanamt
/