CREATE OR REPLACE TRIGGER ol_trgiccfcalc
/*----------------------------------------------------------------------------------------------------
**
** File Name : ol_trgiccfcalc.trg

** Module      :
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
ON  OLTB_CONTRACT_ICCF_CALC
FOR  EACH ROW
BEGIN
 debug.pr_debug('OL','Inside the trigger on ol_trgiccfcalc');
 IF INSERTING
 THEN
  debug.pr_debug('OL','Inserting iccf_calc');
  debug.pr_debug('OL','Contract ref no :'||:NEW.contract_ref_no);
  debug.pr_debug('OL','Component :'||:NEW.component);
  debug.pr_debug('OL','Schd date :'||:NEW.schedule_date);
  debug.pr_debug('OL','Strt date :'||:NEW.start_date);
  debug.pr_debug('OL','End date :'||:NEW.end_date);
  debug.pr_debug('OL','Basis Amount :'||:NEW.basis_amount);
  debug.pr_debug('OL','Rate :'||:NEW.rate);
  debug.pr_debug('OL','No of Days :'||:NEW.no_of_days);
 END IF;
 IF DELETING
 THEN
  debug.pr_debug('OL','Deleting iccf_calc');
  debug.pr_debug('OL','Contract ref no :'||:NEW.contract_ref_no);
  debug.pr_debug('OL','Component :'||:NEW.component);
  debug.pr_debug('OL','Schd date :'||:NEW.schedule_date);
  debug.pr_debug('OL','Strt date :'||:NEW.start_date);
  debug.pr_debug('OL','End date :'||:NEW.end_date);
  debug.pr_debug('OL','Basis Amount :'||:NEW.basis_amount);
  debug.pr_debug('OL','Rate :'||:NEW.rate);
  debug.pr_debug('OL','No of Days :'||:NEW.no_of_days);
 END IF;
 IF UPDATING
 THEN
  debug.pr_debug('OL','Updating iccf_calc');
  debug.pr_debug('OL','new Contract ref no :'||:NEW.contract_ref_no);
  debug.pr_debug('OL','new Component :'||:NEW.component);
  debug.pr_debug('OL','new Schd date :'||:NEW.schedule_date);
  debug.pr_debug('OL','new Strt date :'||:NEW.start_date);
  debug.pr_debug('OL','new End date :'||:NEW.end_date);
  debug.pr_debug('OL','new Basis Amount :'||:NEW.basis_amount);
  debug.pr_debug('OL','new Rate :'||:NEW.rate);
  debug.pr_debug('OL','new No of Days :'||:NEW.no_of_days);

  debug.pr_debug('OL','Old Contract ref no :'||:Old.contract_ref_no);
  debug.pr_debug('OL','Old Component :'||:Old.component);
  debug.pr_debug('OL','Old Schd date :'||:Old.schedule_date);
  debug.pr_debug('OL','Old Strt date :'||:Old.start_date);
  debug.pr_debug('OL','Old End date :'||:Old.end_date);
  debug.pr_debug('OL','Old Basis Amount :'||:Old.basis_amount);
  debug.pr_debug('OL','Old Rate :'||:Old.rate);
  debug.pr_debug('OL','Old No of Days :'||:Old.no_of_days);
 END IF;
 debug.pr_debug('OL','Exiting the trigger on ol_trgiccfcalc');
END;
/