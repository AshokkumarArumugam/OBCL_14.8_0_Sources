CREATE OR REPLACE VIEW olvw_cust_view AS
/*-----------------------------------------------------------------------------------------------------
     **
     ** File Name  : olvw_cust_view.vw
     **
     ** Module     : Oracle Lending
     **
     ** This source is part of the Oracle Banking Software Product.
     ** Oracle Banking Corporate Lending  Software Product.   Copyright © 2021.  All rights reserved
     **
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
     SFR Number         :
     Changed By         :
     Change Description :
	 
	 **Changed By         : Aishwarya Sekar
	 **Date               : 10-AUG-2021
	 **Change Description : Created new view to achieve more filter criterias in QuerycustInfo service                       
	 **Search String      : OBCL_14.5_OBTF310_Changes
	 
	 **Changed By         : Aishwarya Sekar
	 **Date               : 27-OCT-2021
	 **Change Description : Modified view to achieve more filter criterias in QuerycustInfo service                       
	 **Search String      : OBCL_14.5_OBDX_Changes
	 
	 **Changed By         : Aishwarya Sekar
     **Date               : 24-Mar-2022
     **Change Description : Modified view to add filter criteria for application date
     **Search String      : OBDX_14.5_Q4_Changes
	 --------------------------------------------------------------------------------------------------------
*/
SELECT oc.customer_no,
oc.customer_name1,
ocm.contract_ref_no,
ocm.branch,
ocm.user_ref_no,
ocm.product,
ocm.currency,
ocm.amount        loan_amt_from,
ocm.amount        loan_amt_to,
ocm.value_date    dsbr_from_date,
ocm.value_date    dsbr_to_date,
ocm.maturity_date maturity_from_date,
ocm.maturity_date maturity_to_date,
--OBCL_14.5_OBDX_Changes start
ocm.bill_ref_no   bill_ref_no,
CASE WHEN ocm.packing_credit = 'Y' THEN 'P'
WHEN ocm.Bill_Ref_No IS NOT NULL AND 1= (SELECT 1 FROM oltms_product_master_ld WHERE product = OCM.Product  --OBCL_14.8_CE_Length_Changes
AND advance_byloan = 'Y') THEN 'A'
WHEN ocm.Bill_Ref_No IS NOT NULL AND 1= (SELECT 1 FROM oltms_product_master_ld WHERE product = OCM.Product --OBCL_14.8_CE_Length_Changes
AND ol_against_bill = 'Y') THEN 'L'
ELSE 'ALL'
END trade_loan_type
,ocm.booking_date   curr_application_date --OBDX_14.5_Q4_Changes
--OBCL_14.5_OBDX_Changes end
FROM oltms_customer oc, oltbs_contract_master ocm
WHERE oc.customer_no = ocm.counterparty(+)
AND ocm.Version_No = (SELECT MAX(Version_No)
                      FROM Oltbs_Contract_Master
                      WHERE Contract_Ref_No = ocm.contract_ref_no
					 )
/
CREATE OR REPLACE SYNONYM olvws_cust_view FOR olvw_cust_view
/