CREATE OR REPLACE VIEW olvw_coc_exception
(commitment_ref_no, loan_ref_no, coc_valuation_status, error_code,effective_date, error_message)
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : olvw_coc_exception.VW
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
/* CHANGE-HISTORY
08-Mar-2011 Flexcube V.CL Release 7.9, Cost of Credit Changes, Batch Changes, View newly added
25-May-2011 Flexcube V.CL Release 7.9, Cost of Credit Changes, created synonym
01-Aug-2016 OFCL 12.2, Cost of Credit Changes, Effective date column is also added
*/
SELECT	c.contract_ref_no, c.contract_ref_no, c.coc_valuation_status, c.error_code,c.effective_date, x.message
from	oltbs_commitment_balances_coc c, ertb_msgs x
where	c.coc_valuation_status	= 'E'
AND X.ERR_CODE = C.ERROR_CODE
and	c.error_code		NOT IN (SELECT l.error_code
					FROM	oltbs_loan_balances_coc l
					WHERE	l.coc_valuation_status	= 'E'
					AND	c.contract_ref_no		= l.commitment_ref_no
					AND	c.effective_date		= l.effective_date
					AND	c.error_code		= l.error_code)
UNION ALL
SELECT	l.commitment_ref_no, l.loan_ref_no, l.coc_valuation_status, l.error_code,l.effective_date, x.message
FROM	oltbs_loan_balances_coc l, ertb_msgs x
WHERE	l.coc_valuation_status = 'E'
AND X.ERR_CODE = L.ERROR_CODE
/
CREATE OR REPLACE SYNONYM olvws_coc_exception FOR olvw_coc_exception --25-May-2011 Flexcube V.CL Release 7.9, Cost of Credit Changes
/