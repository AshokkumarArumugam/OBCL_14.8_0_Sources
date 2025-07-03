CREATE OR REPLACE FORCE VIEW olvw_all_auto_deposit(ACCOUNT_LINKED_DEPOSIT,CONTRACT_REF_NO,CURRENCY,CUST_ACCOUNT,CUST_AC_BR) AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_all_auto_deposit.VW
**
**This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
(SELECT account_linked_deposit
             ,contract_ref_no
             ,currency
             ,cust_account
             ,cust_ac_br
       FROM   oltbs_auto_deposit)
      UNION
      (SELECT account_linked_deposit
             ,contract_ref_no
             ,currency
             ,cust_account
             ,cust_ac_br
       FROM   olars_auto_deposit)
      UNION
      (SELECT account_linked_deposit
             ,contract_ref_no
             ,currency
             ,cust_account
             ,cust_ac_br
       FROM   olpts_auto_deposit)
      UNION
      (SELECT account_linked_deposit
             ,contract_ref_no
             ,currency
             ,cust_account
             ,cust_ac_br
       FROM   olpps_auto_deposit)
/