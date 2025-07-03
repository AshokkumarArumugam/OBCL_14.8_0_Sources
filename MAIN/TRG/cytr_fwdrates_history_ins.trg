create or replace TRIGGER cytr_fwdrates_history_ins 
AFTER INSERT
ON CYTM_fwdRATE_details
FOR EACH ROW
--       WHEN ( NEW.AUTH_STAT = 'A'    )
/*------------------------------------------------------------------------------------------
**
** This source is part of the Oracle FLEXCUBE Software Product.
** Copyright (R) 2016 - 2021 , Oracle and/or its affiliates.  All rights reserved
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

**Changed By : Ratul Hazra.
**Changed On : 27th April 2014
**Reason : FRC for performance tuning.
**Search String : FRC Changes
------------------------------------------------------------------------------------------
*/
/*
-------------------------------------------------------------------------------------------*/
DECLARE
l_spot_rate cytms_rates.mid_rate%type;
l_base_date date;
l_ccy1 cytms_rates.ccy1%type;
l_ccy2 cytms_rates.ccy1%type;
l_branch cytms_rates.branch_code%type;
l_mod_no cytms_fwdrate_history.mod_no%type;
l_maker_id      cytms_fwdrate_history.maker_id%type;
l_maker_dt_stamp  cytms_fwdrate_history.maker_dt_stamp%type;
l_checker_id    cytms_fwdrate_history.checker_id%type;
l_checker_dt_stamp cytms_fwdrate_history.checker_dt_stamp%type;
l_once_auth     cytms_fwdrate_history.once_auth%type;
l_auth_stat     cytms_fwdrate_history.auth_stat%type;
l_record_stat   cytms_fwdrate_history.record_stat%type;
l_max_period    cytms_fwdrate_history.max_period%type;

  BEGIN

l_ccy1 := :new.currency1;
l_ccy2 := :new.currency2;
l_branch := :new.branch;

--select mod_no, --FRC Changes commented
select /*+ RESULT_CACHE */ mod_no, --FRC Changes added
maker_id,
maker_dt_stamp,
checker_id,
checker_dt_stamp,
once_auth,
auth_stat,
record_stat,
max_period 
into  
l_mod_no,
l_maker_id,
l_maker_dt_stamp,
l_checker_id,
l_checker_dt_stamp,
l_once_auth,
l_auth_stat,
l_record_stat,
l_max_period
from cytms_fwdrate_master 
where branch = l_branch and
    currency1 = l_ccy1 and currency2 = l_ccy2;

--select mid_rate into l_spot_rate from cytms_rates --FRC Changes commented 
select /*+ RESULT_CACHE */ mid_rate into l_spot_rate from cytms_rates--FRC Changes added
    where rate_type='STANDARD' and ccy1 = l_ccy1
      and ccy2 = l_ccy2 and
      branch_code = l_branch ;

--select today into l_base_date from sttms_dates where branch_code = l_branch;  --FRC Changes commented 
select /*+ RESULT_CACHE */ today into l_base_date from sttms_dates where branch_code = l_branch; --FRC Changes added 
  insert into CYTm_fwdRATE_HISTORY
   (branch,currency1,currency2,period_code,mod_no,maker_id,maker_dt_stamp,checker_id,checker_dt_stamp,once_auth,
auth_stat,record_stat,max_period,premium_discount_points,spot_rate,base_date)
   VALUES (:new.branch , :new.currency1 , :new.currency2,:new.period_code,l_mod_no,l_maker_id,
l_maker_dt_stamp,
l_checker_id,l_checker_dt_stamp,l_once_auth,
l_auth_stat,l_record_stat,l_max_period ,:new.premium_discount_points,l_spot_rate,l_base_date);

END;
/