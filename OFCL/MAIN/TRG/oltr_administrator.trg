CREATE OR REPLACE TRIGGER OLTR_ADMINISTRATOR
AFTER UPDATE OR INSERT or DELETE
ON OLZM_ADMINISTRATOR
FOR EACH ROW
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle Banking Software Product.
** Copyright ? 2011,2015  Oracle and/or its affiliates.  All rights reserved.
**
** No part of this work may be reproduced, stored in a retrieval system,
** adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise,
** translated in any language or computer language,
** without the prior written permission of Oracle and/or its affiliates.
**
**
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India.

------------------------------------------------------------------------------------------
*/
/*

  Created By         : Sowmya Bitra
  Created On         : 24-July-2023
  Description        : Changes to replicate data to OBCLPM tables (Bug#35610618)

*/

DECLARE
  p_err_code  varchar2(100);
  p_err_param varchar2(100);
BEGIN

    debug.pr_debug('OL','TRACE '||DBMS_UTILITY.format_call_stack);
    IF olpkss_mo_replication_service.fn_populate_administrator(:NEW.admin_id,
                                              :NEW.admin_name,
                                               p_err_code,
                                               p_err_param) THEN
      debug.pr_debug('OL','TRACE '||DBMS_UTILITY.format_call_stack);                                       
      debug.pr_debug('OL','OL administrator trigger done...');
    ELSE
      debug.pr_debug('OL','TRACE '||DBMS_UTILITY.format_call_stack);
      debug.pr_debug('OL','OL administrator failed...');
    END IF;

EXCEPTION
  WHEN OTHERS THEN
    debug.pr_debug('OL','OL in when other of administrator trigger ---->' || SQLERRM);
END;
/