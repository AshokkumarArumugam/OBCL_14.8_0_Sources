CREATE OR REPLACE FORCE VIEW olvw_contract_summary_3t_arch(CONTRACT_REF_NO,LATEST_VERSION_NO,BRANCH,MODULE_CODE,PRODUCT,CONTRACT_STATUS,AUTH_STATUS,COUNTERPARTY,CONT_AMOUNT,CURRENCY,VALUE_DATE,MATURITY_DATE,USER_REF_NO,REL_REFERENCE,USER_DEFINED_STATUS,PAYMENT_METHOD,RATE_CODE,RATE,RATE_SIGN,SPREAD,INT_AMOUNT,CURR_EVENT_CODE,LATEST_EVENT_SEQ_NO,MAKER_ID,LATEST_EVENT_DATE) AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_contract_summary_3t_arch.VW
**
----------------------------------------------------------------------------------------------------
 This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
--------------------------------------------------------------------------------------------------
*/
(
SELECT   a.contract_ref_no,
A.LATEST_VERSION_NO,
a.branch,
a.module_code,
a.product_code  product,
a.contract_status,
a.auth_status,
b.counterparty,
b.amount cont_amount,
b.currency,
b.value_date,
b.maturity_date,
a.user_ref_no,
b.rel_reference,
a.user_defined_status,
b.payment_method,
b.MAIN_COMP_RATE_CODE            ,
b.MAIN_COMP_RATE                 ,
B.MAIN_COMP_RATE_SIGN, 	--FCC 4.4 Dec 2003 negative interest changes
b.MAIN_COMP_SPREAD           ,
b.MAIN_COMP_AMOUNT               int_amount,
A.CURR_EVENT_CODE			   ,
A.LATEST_EVENT_SEQ_NO,
c.maker_id,
a.latest_event_date
FROM   olars_contract a,
olars_contract_master b,
olars_contract_event_log c
WHERE   a.contract_ref_no = b.contract_ref_no  AND
c.contract_ref_no = b.contract_ref_no and
a.contract_status <> 'H'   AND
a.latest_version_no = b.version_no  AND
c.event_seq_no = b.event_seq_no and
a.module_code IN ('MM','OL','SR','OD') ) --06.02.2002 PLNCITI TILL#3798 Added OD.  ...Puranjit
/