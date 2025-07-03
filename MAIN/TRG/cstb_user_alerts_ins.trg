create or replace trigger CSTB_USER_ALERTS_INS before INSERT ON CSTB_USER_ALERTS
/*
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
*/
FOR EACH ROW
DECLARE
BEGIN
  debug.pr_debug('**', 'Inside trigger CSTB_USER_ALERTS_INS');

  :new.SEQUENCE_NO	:= :new.USER_ID || TRSQ_USER_ALERTS.NEXTVAL;
  debug.pr_debug('**', 'Done with trigger CSTB_USER_ALERTS_INS');

EXCEPTION
  WHEN DUP_VAL_ON_INDEX THEN
    debug.pr_debug('**', 'Insert into CSTB_USER_ALERTS_INS failed');
  WHEN OTHERS THEN
    debug.pr_debug('**','Insert into CSTB_USER_ALERTS_INS failed - ' || sqlerrm || ' - ' || dbms_utility.format_error_backtrace);

END CSTB_USER_ALERTS_INS;
/