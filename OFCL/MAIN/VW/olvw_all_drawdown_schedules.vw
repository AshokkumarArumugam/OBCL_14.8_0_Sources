CREATE OR REPLACE FORCE VIEW olvw_all_drawdown_schedules(AMOUNT,COMPONENT,CONTRACT_CCY,CONTRACT_REF_NO,DRAWDOWN_APPLID,DRAWDOWN_DUE_DATE,END_DATE,PAID_DATE) AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_all_drawdown_schedules.VW
**
**This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
(SELECT amount
             ,component
             ,contract_ccy
             ,contract_ref_no
             ,drawdown_applied
             ,drawdown_due_date
             ,end_date
             ,paid_date
       FROM   oltbs_drawdown_schedules)
      UNION
      (SELECT amount
             ,component
             ,contract_ccy
             ,contract_ref_no
             ,drawdown_applied
             ,drawdown_due_date
             ,end_date
             ,paid_date
       FROM   olars_drawdown_schedules)
      UNION
      (SELECT amount
             ,component
             ,contract_ccy
             ,contract_ref_no
             ,drawdown_applied
             ,drawdown_due_date
             ,end_date
             ,paid_date
       FROM   olpts_drawdown_schedules)
      UNION
      (SELECT amount
             ,component
             ,contract_ccy
             ,contract_ref_no
             ,drawdown_applied
             ,drawdown_due_date
             ,end_date
             ,paid_date
       FROM   olpps_drawdown_schedules)
/