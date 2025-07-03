CREATE OR REPLACE TRIGGER "TRIG_CSTB_CONTRACT"
/*----------------------------------------------------------------------------------------------------
**
** File Name : ol_trig_oltb_contract.TRG

** Module    : FX
**
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
------------------------------------------------------------------------------------------------------

    CHANGE HISTORY
    
    Created By           : 
    Created On           : 
    Purpose              :  
    Modified By          : 
    Modified On          : 
    Fix Description      : 
    Search String        : 
----------------------------------------------------------------------------------------------------
*/

AFTER insert OR update
ON OLTB_CONTRACT FOR EACH ROW

BEGIN

  IF inserting THEN

        debug.pr_debug('FX', 'In trigger Insertion');
        debug.pr_debug('FX', 'Val of OLD overall conf stat-> '||:old.OVERALL_CONF_STAT);
        debug.pr_debug('FX', 'Val of NEW overall conf stat-> '||:new.OVERALL_CONF_STAT);
        --insert into temp values(5,'CCC');
  END IF;

  IF updating THEN
        debug.pr_debug('FX', 'In trigger Updation');
	  debug.pr_debug('FX', 'Val of OLD overall conf stat-> '||:old.OVERALL_CONF_STAT);
	  debug.pr_debug('FX', 'Val of NEW overall conf stat-> '||:new.OVERALL_CONF_STAT);
  END IF;

EXCEPTION
                 WHEN OTHERS THEN
                      debug.pr_debug('OL','Bombed in trigger trig_ccy_defn_upd '||sqlerrm);

END;
/