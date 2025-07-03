CREATE OR REPLACE TRIGGER "TRGCONTINT"
/*----------------------------------------------------------------------------------------------------
**
** File Name : ol_trgcontint.TRG

** Module    : LD
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

BEFORE INSERT OR UPDATE OR DELETE
ON  LFTB_CONTRACT_INTEREST
FOR  EACH ROW
BEGIN
 debug.pr_debug('OL','Inside the trigger on ol_trgcontint');
 IF INSERTING
 THEN
  debug.pr_debug('OL','Inserting ol_trgcontint');
  debug.pr_debug('OL','Contract ref no '||:NEW.contract_reference_no);
  debug.pr_debug('OL','Component '||:NEW.component);
  debug.pr_debug('OL','event seq no '||:NEW.event_sequence_no);
  debug.pr_debug('OL','Value_date '||:NEW.value_date);
  debug.pr_debug('OL','rate '||:NEW.rate);
  debug.pr_debug('OL','spread '||:NEW.spread);
 END IF;
 IF DELETING
 THEN
  debug.pr_debug('OL','Deleting ol_trgcontint');
  debug.pr_debug('OL','Contract ref no '||:OLD.contract_reference_no);
  debug.pr_debug('OL','Component '||:OLD.component);
  debug.pr_debug('OL','event seq no '||:OLD.event_sequence_no);
  debug.pr_debug('OL','Value_date '||:OLD.value_date);
  debug.pr_debug('OL','rate '||:OLD.rate);
  debug.pr_debug('OL','spread '||:OLD.spread);
  debug.pr_debug('OL','Contract ref no '||:NEW.contract_reference_no);
  debug.pr_debug('OL','Component '||:NEW.component);
  debug.pr_debug('OL','event seq no '||:NEW.event_sequence_no);
  debug.pr_debug('OL','Value_date '||:NEW.value_date);
  debug.pr_debug('OL','rate '||:NEW.rate);
  debug.pr_debug('OL','spread '||:NEW.spread);
 END IF;
 IF UPDATING
 THEN
  debug.pr_debug('OL','Updating ol_trgcontint');
  debug.pr_debug('OL','Contract ref no :'||:NEW.contract_reference_no);
  debug.pr_debug('OL','New Component   :'||:NEW.component||' Old Component :'||:OLD.component);
  debug.pr_debug('OL','New Event seq no   :'||:NEW.event_sequence_no||' Old event seq no :'||:OLD.event_sequence_no);
  debug.pr_debug('OL','New eff date :'||:NEW.value_date||' Old eff date  :'||:OLD.value_date);
  debug.pr_debug('OL','New rate  :'||:NEW.rate||' Old rate :'||:OLD.rate);
  debug.pr_debug('OL','New spread :'||:NEW.spread||' Old spread :'||:OLD.spread);
 END IF;
 debug.pr_debug('OL','Exiting the trigger on ol_trgcontint');
END;
/