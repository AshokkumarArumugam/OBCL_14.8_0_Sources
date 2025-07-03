CREATE OR REPLACE TRIGGER ol_trig_oltbs_lt_markit_exp
/*----------------------------------------------------------------------------------------------------
**
** File Name : ol_trig_oltbs_lt_markit_exp.trg

** Module      : IF
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
----------------------------------------------------------------------------------------------------
*/         
BEFORE INSERT OR UPDATE OR DELETE
ON  OLTB_LT_MARKIT_EXCEPTION
FOR  EACH ROW
BEGIN
 debug.pr_debug('OL','Inside the trigger on oltbs_lt_markit_exception');
 IF INSERTING
 THEN
  debug.pr_debug('OL','Inserting oltbs_lt_markit_exception');
  debug.pr_debug('OL','MESSAGE_ID  :'||:NEW.MESSAGE_ID);
  debug.pr_debug('OL','MARKIT_TRADE_ID :'||:NEW.MARKIT_TRADE_ID);
  debug.pr_debug('OL','MARKIT_ALLOCATION_ID :'||:NEW.MARKIT_ALLOCATION_ID);
  debug.pr_debug('OL','EXTERNAL_CUSIP_NO :'||:NEW.EXTERNAL_CUSIP_NO);
  debug.pr_debug('OL','ERR_SEQ_NO  :'||:NEW.ERR_SEQ_NO);
  debug.pr_debug('OL','ERROR_PARAM  :'||:NEW.ERROR_PARAM);
  debug.pr_debug('OL','ERROR_CODE :'||:NEW.ERROR_CODE);

 END IF;
 IF DELETING
 THEN
   debug.pr_debug('OL','deleteing oltbs_lt_markit_exception');
    debug.pr_debug('OL','MESSAGE_ID  :'||:NEW.MESSAGE_ID);
    debug.pr_debug('OL','MARKIT_TRADE_ID :'||:NEW.MARKIT_TRADE_ID);
    debug.pr_debug('OL','MARKIT_ALLOCATION_ID :'||:NEW.MARKIT_ALLOCATION_ID);
    debug.pr_debug('OL','EXTERNAL_CUSIP_NO :'||:NEW.EXTERNAL_CUSIP_NO);
    debug.pr_debug('OL','ERR_SEQ_NO  :'||:NEW.ERR_SEQ_NO);
    debug.pr_debug('OL','ERROR_PARAM  :'||:NEW.ERROR_PARAM);
  debug.pr_debug('OL','ERROR_CODE :'||:NEW.ERROR_CODE);
 END IF;
 IF UPDATING
 THEN
  debug.pr_debug('OL','updating oltbs_lt_markit_exception');
   debug.pr_debug('OL','MESSAGE_ID  :'||:NEW.MESSAGE_ID);
   debug.pr_debug('OL','MARKIT_TRADE_ID :'||:NEW.MARKIT_TRADE_ID);
   debug.pr_debug('OL','MARKIT_ALLOCATION_ID :'||:NEW.MARKIT_ALLOCATION_ID);
   debug.pr_debug('OL','EXTERNAL_CUSIP_NO :'||:NEW.EXTERNAL_CUSIP_NO);
   debug.pr_debug('OL','ERR_SEQ_NO  :'||:NEW.ERR_SEQ_NO);
   debug.pr_debug('OL','ERROR_PARAM  :'||:NEW.ERROR_PARAM);
  debug.pr_debug('OL','ERROR_CODE :'||:NEW.ERROR_CODE);
 END IF;
 debug.pr_debug('OL','Exiting the trigger on ol_trgiccfcalc');
END;
/