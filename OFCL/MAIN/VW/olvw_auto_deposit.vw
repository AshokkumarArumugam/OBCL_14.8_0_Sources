CREATE OR REPLACE FORCE VIEW olvw_auto_deposit ( BRANCH, 
CONTRACT_REF_NO, USER_REF_NO, LATEST_EVENT_SEQ_NO, CUSTOM_REF_NO, 
COUNTERPARTY, CURRENCY, VALUE_DATE, MATURITY_DATE, 
PRODUCT, CLUSTER_ID, PRINCIPAL_OUTSTANDING_BAL, CUST_AC_BR, 
CUST_ACCOUNT, RATE_SPREAD ) AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_auto_deposit.VW
**
** Module      : Loans and Deposits
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
*/
/*----------------------------------------------------------------------------------------------------
28-OCT-2008 CITIUS-LS#SRT1451 STP and Code Consolidation Retro
----------------------------------------------------------------------------------------------------
*/
SELECT
a.branch,a.contract_ref_no,a.user_ref_no,a.latest_event_seq_no,a.custom_ref_no,
b.counterparty,b.currency,b.value_date,b.maturity_date,b.PRODUCT,b.cluster_id,
c.principal_outstanding_bal,d.cust_ac_br,d.cust_account,
lfpkss_services.Fn_Interest_Details(a.contract_ref_no,a.latest_event_seq_no)
FROM oltbs_contract a,oltbs_contract_master b,oltbs_contract_balance c,oltbs_auto_deposit d
WHERE d.account_linked_deposit = 'Y'
AND a.contract_ref_no = d.contract_ref_no
AND b.contract_ref_no = a.contract_ref_no
AND b.version_no = a.latest_version_no
AND c.contract_ref_no = b.contract_ref_no
AND a.contract_status = 'A'
AND c.principal_outstanding_bal >0
/

--CITIUS-LS#SRT1451 Starts
CREATE OR REPLACE SYNONYM	olvws_auto_deposit
FOR	olvw_auto_deposit
--CITIUS-LS#SRT1451 Ends
/