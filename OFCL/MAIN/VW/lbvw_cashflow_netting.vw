CREATE OR REPLACE FORCE VIEW lbvw_cashflow_netting AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lbvw_cashflow_netting.VW
**
** Module      : Syndication Loans and Commitments
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
Change History 
	28-mar-2006 Flexcube V.CL Release 7.0 Backoffice Related Changes,Darshana
	
	Changed By         : Narendra Dhaker
	Date               : 20-May-2021
	Change Description : Product Access restriction
	Search String      : Product Access restriction
---------------------------------------------------------------------------------------------------
*/
SELECT    A.TRANCHE_REF_NO,A.AUTH_STAT,A.NETTING_STATUS,
A.NETTED_CASHFLOW_DIRECTION,A.CUSTOMER_NO,
A.CCY_CODE,A.VALUE_DATE,A.NETTING_REF_NO,
A.BRANCH_CODE,A.CUSTOMER_TYPE,
A.TOTAL_CASHFLOW_AMOUNT,B.DEPARTMENT_CODE,
B.TREASURY_SOURCE
     FROM lbtb_cashflow_netting_master A ,
      oltbs_contract B
WHERE A.TRANCHE_REF_NO=B.CONTRACT_REF_NO
----Product Access restriction - Start
and exists (Select 1
	 From OLVW_USER_ACCESS_PRODUCTS
	 Where PRODUCT_CODE = b.product_code --OBCL_14.8_CE_Length_Changes
   AND USER_ID = global.user_id)
--Product Access restriction - End
/
CREATE OR REPLACE SYNONYM lbvws_cashflow_netting FOR lbvw_cashflow_netting
/