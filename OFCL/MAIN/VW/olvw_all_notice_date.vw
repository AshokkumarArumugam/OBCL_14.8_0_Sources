CREATE OR REPLACE FORCE VIEW olvw_all_notice_date(BRANCH,CONTRACT_CCY,PREVIOUS_NOTICE_TILL_DATE,PRODUCT) AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_all_notice_date.VW
**
**This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
(SELECT branch
             ,contract_ccy
             ,previous_notice_till_date
             ,product
       FROM   oltbs_notice_date)
      UNION
      (SELECT branch
             ,contract_ccy
             ,previous_notice_till_date
             ,product
       FROM   olars_notice_date)
      UNION
      (SELECT branch
             ,contract_ccy
             ,previous_notice_till_date
             ,product
       FROM   olpts_notice_date)
      UNION
      (SELECT branch
             ,contract_ccy
             ,previous_notice_till_date
             ,product
       FROM   olpps_notice_date)
/