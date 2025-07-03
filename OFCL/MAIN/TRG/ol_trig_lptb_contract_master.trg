CREATE OR REPLACE TRIGGER "OL_TRIG_LPTB_CONTRACT_MASTER"         
/*----------------------------------------------------------------------------------------------------
**
** File Name   : ol_trig_lptb_contract_master.trg
** Module      : 
**
** This source is part of the Oracle Banking Corporate Lending  Software Product. 
** Copyright © 2007 - 2018  Oracle and/or its affiliates.  All rights reserved.   
** No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
** in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
** or otherwise, translated in any language or computer language, without the prior written permission 
** of Oracle and/or its affiliates. 
** 
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East), 
** Mumbai - 400 063, India.
------------------------------------------------------------------------------------------------------

    CHANGE HISTORY
    
    Created By           : 
    Created On           : 
    Purpose              : 

    Modified By          : 
    Modified On          : 
    Fix Description      : 
    Search String        : 
------------------------------------------------------------------------------------------------------
*/
AFTER insert OR update OR delete
ON lptb_contract_master FOR EACH ROW

BEGIN

  IF inserting THEN

        debug.pr_debug('LB', 'Kunal lptb_contract_master insertion');
        debug.pr_debug('LB', 'Val of OLD overall conf stat-> '||:old.contract_ref_no);
        debug.pr_debug('LB', 'Val of NEW overall conf stat-> '||:new.contract_ref_no);
        --insert into temp values(5,'CCC');
  END IF;

  IF updating THEN
        debug.pr_debug('LB', 'Kunal lptb_contract_master updation');
	  debug.pr_debug('LB', 'Val of OLD overall conf stat-> '||:old.contract_ref_no);
	  debug.pr_debug('LB', 'Val of NEW overall conf stat-> '||:new.contract_ref_no);
  END IF;

IF deleting THEN
  debug.pr_debug('LB', 'Kunal lptb_contract_master deletion');
  debug.pr_debug('LB', 'Val of OLD overall conf stat-> '||:old.contract_ref_no);
  debug.pr_debug('LB', 'Val of NEW overall conf stat-> '||:new.contract_ref_no);
END IF;

EXCEPTION
                 WHEN OTHERS THEN
                      debug.pr_debug('LB','Bombed in trigger trig_ccy_defn_upd '||sqlerrm);

END ol_trig_lptb_contract_master;
/