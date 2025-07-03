CREATE OR REPLACE TRIGGER OLTR_INSTR
AFTER UPDATE OR INSERT
ON OLZM_INSTR
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


  IF :NEW.Auth_Stat = 'A' THEN

    debug.pr_debug('OL','TRACE '||DBMS_UTILITY.format_call_stack);
    IF olpkss_mo_replication_service.fn_populate_ssi_mnemonic(:NEW.ssi_mnemonic,
                                              :NEW.settlement_seq_no,
                                              :NEW.branch,
                                              :NEW.currency ,
                                              :NEW.counterparty ,
                                              :NEW.module,
                                              :NEW.pay_ac_branch,
                                              :NEW.pay_account,
                                              :NEW.pay_account_ccy,
                                              :NEW.product_code,
                                              :NEW.recv_ac_branch,
                                              :NEW.recv_account,
                                              :NEW.recv_account_ccy,
                                               p_err_code,
                                               p_err_param) THEN
      debug.pr_debug('OL','TRACE '||DBMS_UTILITY.format_call_stack);                                       
      debug.pr_debug('OL','OL ssi mnemonic trigger done...');
    ELSE
      debug.pr_debug('OL','TRACE '||DBMS_UTILITY.format_call_stack);
      debug.pr_debug('OL','OL ssi mnemonic trigger failed...');
    END IF;

  END IF;
EXCEPTION
  WHEN OTHERS THEN
    debug.pr_debug('OL','OL in when other of ssi mnemonic trigger ---->' || SQLERRM);
END;
/