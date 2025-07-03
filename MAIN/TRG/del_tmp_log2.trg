CREATE OR REPLACE TRIGGER del_tmp_log2
after delete on smtb_current_users
for each row
/*------------------------------------------------------------------------------------------
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
------------------------------------------------------------------------------------------*/
/*
**Modified By                      : Pankaj
**Modified On                      : 11-May-2015
**Modified Reason                  : triggers are merged for better performance.
**Search String                    : FCUBS12.1 Performance tuning
------------------------------------------------------------------------------------------*/
begin
--FCUBS12.1 Performance tuning starts
    DELETE FROM CSTB_ADV_LOCK WHERE USER_ID=:OLD.USER_ID;
--FCUBS12.1 Performance tuning ends
    update smtbs_sms_log l
    set l.exit_flag = 1
    where l.user_id=:old.user_id and l.terminal_id=:old.terminal and
          l.exit_flag is null and l.function_id != 'SMSIGNON';
end;
/