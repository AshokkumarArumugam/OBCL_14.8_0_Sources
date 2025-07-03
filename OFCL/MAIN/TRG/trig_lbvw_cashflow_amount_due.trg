create or replace trigger trig_lbvw_cashflow_amount_due
/*----------------------------------------------------------------------------------------------------
**
** File Name    : trig_lsvw_cashflow_amount_due.trg
**
** Module       : LS
This source is part of the Oracle Banking Corporate Lending  Software Product. 
Copyright © 2007 - 2018  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
or otherwise, translated in any language or computer language, without the prior written permission 
of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
instead of update on lbvw_cashflow_amount_due
for each row
begin
  debug.pr_debug('LB','chief... am going to update the underlying table explicitly');
  if  (:new.netting_status is not null
    or :new.PAY_CONF_STATUS is not null
    or :new.settled_status is not null
    )
  then
    debug.pr_debug('LB','view is not updatable because of union on 2 tables');
    update OLTBS_AMOUNT_DUE_CS
    set NETTING_STATUS = nvl(:new.netting_status,:old.netting_status),
    PAY_CONF_STATUS = nvl(:new.PAY_CONF_STATUS,:old.PAY_CONF_STATUS),
    settled_status = nvl(:new.settled_status,:old.settled_status)
    where CONTRACT_REF_NO = :old.CONTRACT_REF_NO
    and COMPONENT = :old.COMPONENT
    and DUE_DATE = :old.DUE_DATE;
    debug.pr_debug('LB','sql%rowcount from amount_due'||sql%rowcount);
    update lbtbs_outflow_amount_due
    set NETTING_STATUS = nvl(:new.netting_status,:old.netting_status),
    PAY_CONF_STATUS = nvl(:new.PAY_CONF_STATUS,:old.PAY_CONF_STATUS),
    settled_status = nvl(:new.settled_status,:old.settled_status)
    where CONTRACT_REF_NO = :old.CONTRACT_REF_NO
    and COMPONENT = :old.COMPONENT
    and DUE_DATE = :old.DUE_DATE;
    debug.pr_debug('LB','sql%rowcount from outflow_amount_due'||sql%rowcount);
    debug.pr_debug('LB','chief... am going to update the underlying table explicitly done');
  end if;
end ;
/