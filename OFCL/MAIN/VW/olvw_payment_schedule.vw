CREATE OR REPLACE FORCE VIEW olvw_payment_schedule
(contract_ref_no, user_ref_no, product_code, counterparty, due_date, currency_amt_due, tot_amt_due, tot_amt_settled, tot_adjusted_amt, tot_pay_recv_amt, principal_outstanding_bal)
AS
/*----------------------------------------------------------------------------------------------------
 This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
**
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
--------------------------------------------------------------------------------------------------
*/
(
	SELECT  A.CONTRACT_REF_NO,
		A.USER_REF_NO,
		A.PRODUCT_CODE,
		A.COUNTERPARTY,
		B.DUE_DATE,
		B.CURRENCY_AMT_DUE,
             	nvl(SUM(B.AMOUNT_DUE),0) ,
             	nvl(SUM(B.AMOUNT_SETTLED),0) ,
             	nvl(SUM(B.ADJUSTED_AMOUNT),0) ,
             	nvl(SUM(B.PAY_RECV_AMOUNT),0) ,
		nvl(SUM(C.PRINCIPAL_OUTSTANDING_BAL) ,0)
	FROM	OLTB_CONTRACT A,
		OLTB_AMOUNT_DUE_CS B,
		OLTB_CONTRACT_BALANCE C
	WHERE	A.CONTRACT_REF_NO = B.CONTRACT_REF_NO
	AND	A.CONTRACT_REF_NO = C.CONTRACT_REF_NO
  GROUP BY (A.CONTRACT_REF_NO,A.USER_REF_NO,A.PRODUCT_CODE,A.COUNTERPARTY,B.DUE_DATE,B.CURRENCY_AMT_DUE)
)
/
CREATE OR REPLACE SYNONYM olvws_payment_schedule FOR olvw_payment_schedule
/