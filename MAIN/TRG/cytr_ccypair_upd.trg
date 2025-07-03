CREATE OR REPLACE TRIGGER cytr_ccypair_upd
AFTER INSERT OR UPDATE OR DELETE
ON CYTM_CCY_PAIR_DEFN_MASTER
FOR EACH ROW
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
------------------------------------------------------------------------------------------*/
/*
CHANGE HISTORY
**Modified By                      : Pankaj
**Modified On                      : 11-May-2015
**Modified Reason                  : Triggers are merged for better performance.
**Search String                    : FCUBS12.1 Performance tuning
**Modified By                      : Hima bindu 
**Modified On                      : 13-May-2015
**Modified Reason                  : table name change from cytm_ccy_pair_defn to cytm_ccy_pair_defn_master
**                                  cytb_ccy_pair table changed to cytb_ccy_pair_master
**Search String                    : 12.1 change
**Modified By                      : Hima bindu 
**Modified On                      : 10-Aug-2015
**Modified Reason                  : Changed :new to :old in delete for maint coutnry
**Search String                    : 21572769

**Modified By                      : Ramki 
**Modified On                      : 11-Sep-2019
**Modified Reason                  : handled direct_spread new column
**Search String                    : JC_Minicore Integration_Currency Spread Maintenance
-------------------------------------------------------------------------------------------*/
DECLARE
BEGIN
  BEGIN
--FCUBS12.1 Performance tuning starts
  IF INSERTING
    THEN
    
  insert into cytb_ccy_pair_master values(          --12.1 change tablename change
     :new.ccy1,:new.ccy2,
     :new.through_ccy, :new.quotation,
     :new.no_of_units, :new.spread_defn,
     :new.points_multiplier, :new.auth_stat,'N'
     --12.1 change start
     ,:new.maintenance_country
     --12.1 change end
	 ,:new.direct_spread --JC_Minicore Integration_Currency Spread Maintenance
     );
    insert into cytb_ccy_pair_master values(            --12.1 change tablename change
     :new.ccy2,:new.ccy1,
     :new.through_ccy, :new.quotation,
     :new.no_of_units, :new.spread_defn,
     :new.points_multiplier, :new.auth_stat,'Y'
     --12.1 change start
     ,:new.maintenance_country
     --12.1 change end   
	 ,:new.direct_spread --JC_Minicore Integration_Currency Spread Maintenance	 
     );
--FCUBS12.1 Performance tuning ends
  ELSIF UPDATING
  THEN
   if :new.record_stat = 'C' then
    delete from cytb_ccy_pair_master        --12.1 change tablename change
     where  ccy1 = :new.ccy1 and
     ccy2 = :new.ccy2
     --12.1 change start
     and maintenance_country = :new.maintenance_country;
     --12.1 change end   
    delete from cytb_ccy_pair_master     --12.1 change tablename change
     where  ccy1 = :new.ccy2 and
     ccy2 = :new.ccy1
     --12.1 change start
     and maintenance_country = :new.maintenance_country;
     --12.1 change end   
   elsif ( :old.record_stat = 'C' and :new.record_stat = 'O') then
    insert into cytb_ccy_pair_master values(     --12.1 change tablename change
     :new.ccy1,:new.ccy2,
     :new.through_ccy, :new.quotation,
     :new.no_of_units, :new.spread_defn,
     :new.points_multiplier, :new.auth_stat,'N'
       --12.1 change start
     ,:new.maintenance_country
     --12.1 change end   
	 ,:new.direct_spread --JC_Minicore Integration_Currency Spread Maintenance
     );
    insert into cytb_ccy_pair_master values(    --12.1 change tablename change
     :new.ccy2,:new.ccy1,
     :new.through_ccy, :new.quotation,
     :new.no_of_units, :new.spread_defn,
     :new.points_multiplier, :new.auth_stat,'Y'
     --12.1 change start
     ,:new.maintenance_country
     --12.1 change end   
	 ,:new.direct_spread --JC_Minicore Integration_Currency Spread Maintenance
     );
   elsif ( :old.record_stat = 'O' and :new.record_stat = 'O') then
    update cytb_ccy_pair_master set through_ccy=:new.through_ccy,  --12.1 change tablename change
     quotation=:new.quotation,
     no_of_units=:new.no_of_units,
     spread_defn=:new.spread_defn,
     points_multiplier=:new.points_multiplier,
     auth_stat=:new.auth_stat
	 ,direct_spread = :new.direct_spread --JC_Minicore Integration_Currency Spread Maintenance
    where ccy1=:new.ccy1 and ccy2=:new.ccy2
      --12.1 change start
     and maintenance_country = :new.maintenance_country;
     --12.1 change end  
    update cytb_ccy_pair_master set through_ccy=:new.through_ccy,   --12.1 change tablename change
     quotation=:new.quotation,
     no_of_units=:new.no_of_units,
     spread_defn=:new.spread_defn,
     points_multiplier=:new.points_multiplier,
     auth_stat=:new.auth_stat
	 ,direct_spread = :new.direct_spread --JC_Minicore Integration_Currency Spread Maintenance
    where ccy1=:new.ccy2 and ccy2=:new.ccy1
    --12.1 change start
     and maintenance_country = :new.maintenance_country;
     --12.1 change end  
   end if;
--FCUBS12.1 Performance tuning starts
   ElSIF DElETING
   THEN
   delete from cytb_ccy_pair_master   --12.1 change tablename change
     where  ccy1 = :old.ccy1 and
     ccy2 = :old.ccy2
     --12.1 change start
     and maintenance_country = :old.maintenance_country; --21572769 changed to :old
     --12.1 change end  
    delete from cytb_ccy_pair_master   --12.1 change tablename change
     where  ccy1 = :old.ccy2 and
     ccy2 = :old.ccy1
     --12.1 change start
     and maintenance_country = :old.maintenance_country; --21572769 changed to :old
     --12.1 change end  
   end if;
--FCUBS12.1 Performance tuning ends
  END;
END;
/