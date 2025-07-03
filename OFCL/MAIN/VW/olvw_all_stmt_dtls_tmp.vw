CREATE OR REPLACE FORCE VIEW olvw_all_stmt_dtls_tmp(AMT_CREDIT,AMT_DEBIT,BOOKING_DATE,COMPONENT,CONTRACT_REF_NO,CREDIT,CURRENCY,DCN,DEBIT,DETAILS,INT_DETAILS,TYPE,VALUE_DATE) AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_all_stmt_dtls_tmp.VW
**
**This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
(SELECT amt_credit
             ,amt_debit
             ,booking_date
             ,component
             ,contract_ref_no
             ,credit
             ,currency
             ,dcn
             ,debit
             ,details
             ,int_details
             ,TYPE
             ,value_date
       FROM   oltbs_stmt_dtls_tmp)
      UNION
      (SELECT amt_credit
             ,amt_debit
             ,booking_date
             ,component
             ,contract_ref_no
             ,credit
             ,currency
             ,dcn
             ,debit
             ,details
             ,int_details
             ,TYPE
             ,value_date
       FROM   olars_stmt_dtls_tmp)
      UNION
      (SELECT amt_credit
             ,amt_debit
             ,booking_date
             ,component
             ,contract_ref_no
             ,credit
             ,currency
             ,dcn
             ,debit
             ,details
             ,int_details
             ,TYPE
             ,value_date
       FROM   olpts_stmt_dtls_tmp)
      UNION
      (SELECT amt_credit
             ,amt_debit
             ,booking_date
             ,component
             ,contract_ref_no
             ,credit
             ,currency
             ,dcn
             ,debit
             ,details
             ,int_details
             ,TYPE
             ,value_date
       FROM   olpps_stmt_dtls_tmp)
/