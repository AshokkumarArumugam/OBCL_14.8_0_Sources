CREATE OR REPLACE FORCE VIEW olvw_amount_settled ( CONTRACT_REF_NO, 
COMPONENT, DUE_DATE, PAID_DATE, EVENT_SEQ_NO, 
CURRENCY_SETTLED, ACCOUNT_SETTLED, BRANCH_ACCOUNT_SETTLED, LCY_EQUIVALENT_SETTLED, 
AMOUNT_SETTLED, BASIS_AMOUNT, MAKER_ID, MAKER_DT_STAMP, 
CHECKER_ID, CHECKER_DT_STAMP, EVENT_CODE, AUTH_STATUS , PAYMENT_STATUS
 ) AS /*-------------------------------------------------------------------------------------------------
**
** File Name	: olvw_amount_settled.VW
**
** Module	: LOANS SYNDICATION
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
**
----------------------------------------------------------------------------------------------------
*/
/*------------------------------------------CHANGE HISTORY----------------------------------
DATE		VERSION NO	CODE		SFR	DESCRIPTION
09-JAN-2006	Flexcube V.CL Release 7.0		View Created for the payment schedule to be displayed in tranche online
--------------------------------------------------------------------------------------------
*/
(
					SELECT	a.CONTRACT_REF_NO
						,	a.COMPONENT
						,	a.DUE_DATE
						,	a.PAID_DATE
						,	a.EVENT_SEQ_NO
						,	a.CURRENCY_SETTLED
						,	a.ACCOUNT_SETTLED
						,	a.BRANCH_ACCOUNT_SETTLED
						,	a.LCY_EQUIVALENT_SETTLED
						,	a.AMOUNT_SETTLED
						,	a.BASIS_AMOUNT
						,	b.MAKER_ID
						,	b.MAKER_DT_STAMP
						,	b.CHECKER_ID
						,	b.CHECKER_DT_STAMP
						,	b.EVENT_CODE
						,	b.AUTH_STATUS
						,	a.PAYMENT_STATUS --BUG#28378345 added ,also added in first line 
					FROM 		oltbs_amount_paid a
						,	oltbs_contract_event_log b
					WHERE		a.CONTRACT_REF_NO = b.CONTRACT_REF_NO
					AND		a.EVENT_SEQ_NO	= b.EVENT_SEQ_NO
					AND 		NVL(a.PAYMENT_STATUS,'A')<>'V' --FCC55ITR2 SFR#56 Changes
				)
/
CREATE OR REPLACE SYNONYM olvws_amount_settled FOR olvw_amount_settled
/