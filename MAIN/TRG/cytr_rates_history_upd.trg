CREATE OR REPLACE TRIGGER  cytr_rates_history_upd
AFTER UPDATE ON CYTM_RATES
FOR EACH ROW
WHEN ( NEW.INT_AUTH_STAT = 'A' )
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
------------------------------------------------------------------------------------------
*/
/*
**Modified By                       : Pankaj
**Modified On                      : 08-May-2015
**Modified Reason             : Performance Tuning : Introduced the function with 'Result Cache'  in order to reduce **the number of executions
**Search String                      : FCUBS12.1 Performance tuning using Result Cache

**Modified By                       : Hima bindu patil
**Modified On                      : 22Jul-2015
**Modified Reason             : Bug 21483683: Corrected history table population
**Search String                      : Bug 21483683

**Modified By                    : Anil
**Modified On                    : 17092017
**Modified Reason             	 :Standalone12.3 Changes  GLOBAL_FRC changed to GLOBAL_FRC_CORE
**Search String                  :Standalone12.3 Changes
    Changed By         : Adapa Saikrishna
    Change Date        : 2-Feb-2018
    Change Description : Performance issue, commented the select count(1) from cytb_rates_history and handled the logic using dup_val_on_index
    retro String        :9NT1606_12.0.2_CNSL_NBE_27204798
    Search String      : 9NT1606_14_0_RETRO_12_0_2_27297046

------------------------------------------------------------------------------------------*/
/*
CHANGE HISTORY
BEFADB  06-03-2001  Til No.69   Rates upload bombing because of the unique constraint violation on the history
    table. Rates can be updateded twice or more in a day. In such case update the history table with the latest date.
FC54BRIT1 SFR No 43 Update was without a where clause.
FCC61  Rate date and rate_serial fields are added in cytb_rates_history
*/
DECLARE
    time_now date;
    l_auth_stat char(1);
  l_count number; --Bug 21483683
BEGIN
    debug.pr_debug('CY','In trigger cytr_rates_history_upd');
--FCUBS12.1 Performance tuning using Result Cache starts
    /*select auth_stat into l_auth_stat from cytm_rates_master where ccy1= :old.ccy1 and ccy2=:old.ccy2 and
        branch_code = :old.branch_code;*/
        global_frc_core.g_Tbl_cytm_rates_master_Rec:= global_frc_core.Fn_Get_cytm_rates_master_frc(:old.branch_code,:old.ccy1,:old.ccy2); --Standalone12.3 Changes
        l_auth_stat := global_frc_core.g_Tbl_cytm_rates_master_Rec.auth_stat;--Standalone12.3 Changes
    time_now := global_frc_core.g_Tbl_cytm_rates_master_Rec.checker_dt_stamp; --Bug 21483683 --Standalone12.3 Changes
        debug.pr_debug('CY','l_auth_stat '||l_auth_stat);
--FCUBS12.1 Performance tuning using Result Cache ends
    if l_auth_stat = 'A' 
    and  :old.buy_rate is not null --Bug 21483683
    then
--FCUBS12.1 Performance tuning using Result Cache starts
   --Bug 21483683 start
   /*
        select checker_dt_stamp into time_now from cytm_rates_master where branch_code = :old.branch_code and
            ccy1 = :old.ccy1 and ccy2 = :old.ccy2;
            global_frc.g_Tbl_cytm_rates_master_Rec:= global_frc.Fn_Get_cytm_rates_master_frc(:old.branch_code,:old.ccy1,:old.ccy2);
        time_now := global_frc.g_Tbl_cytm_rates_master_Rec.checker_dt_stamp;
    */
    debug.pr_debug('CY','Rate date '||:old.rate_date);
    debug.pr_debug('CY','Buy Rate '||:old.buy_rate);
    debug.pr_debug('CY','Mid Rate '||:old.mid_rate);
    --Bug 21483683 end
        debug.pr_debug('CY','Got date as '||time_now);
--FCUBS12.1 Performance tuning using Result Cache ends
        BEGIN
--9NT1606_14_0_RETRO_12_0_2_27297046 changes start
/*
      
     --Bug 21483683 start
      SELECT COUNT(1)
      INTO l_count
      from CYTB_RATES_HISTORY
      WHERE BRANCH_CODE = :old.branch_code 
      AND CCY1 = :old.ccy1 
      AND CCY2 = :old.ccy2 
            AND RATE_TYPE = :old.rate_type 
      AND RATE_date =  :old.rate_date
      and rate_serial =  :old.rate_serial;
      
      IF l_count > 0   THEN
        insert into CYTB_RATES_HISTORY(branch_code,buy_rate,ccy1,ccy2,mid_rate,rate_dt_stamp, rate_type,sale_rate,rate_date,rate_serial)
              VALUES (:old.branch_code,:old.buy_rate,:old.ccy1,:old.ccy2 ,:old.mid_rate,time_now,:old.rate_type,
                :old.sale_rate , :old.rate_date , :old.rate_serial+1);     
      ELSE
        --Bug 21483683 end
*/
Begin
--9NT1606_14_0_RETRO_12_0_2_27297046 changes end
              insert into CYTB_RATES_HISTORY(branch_code,buy_rate,ccy1,ccy2,mid_rate,rate_dt_stamp, rate_type,sale_rate,rate_date,rate_serial)
              VALUES (:old.branch_code,:old.buy_rate,:old.ccy1,:old.ccy2 ,:old.mid_rate,time_now,:old.rate_type,
                :old.sale_rate , :old.rate_date , :old.rate_serial);
      --END IF;  --Bug 21483683 --9NT1606_14_0_RETRO_12_0_2_27297046 commented
        EXCEPTION
--      WHEN DUP_VAL_ON_INDEX SFR No 43
		--9NT1606_14_0_RETRO_12_0_2_27297046 begin
		WHEN DUP_VAL_ON_INDEX 
		THEN
			insert into CYTB_RATES_HISTORY(branch_code,buy_rate,ccy1,ccy2,mid_rate,rate_dt_stamp, rate_type,sale_rate,rate_date,rate_serial)
			VALUES (:old.branch_code,:old.buy_rate,:old.ccy1,:old.ccy2 ,:old.mid_rate,time_now,:old.rate_type,
                :old.sale_rate , :old.rate_date , :old.rate_serial+1);  		
		END;
		
		EXCEPTION
		--9NT1606_14_0_RETRO_12_0_2_27297046 end
        WHEN OTHERS
        THEN
            debug.pr_debug('CY','Ins flopped '||SQLERRM);
    
            UPDATE cytb_rates_history set   mid_rate = :old.mid_rate, buy_rate = :old.buy_rate, sale_rate = :old.sale_rate,
            rate_dt_stamp = time_now , rate_date = :old.rate_Date, rate_serial = :old.rate_serial 
-- SFR No 43
            WHERE BRANCH_CODE = :old.branch_code AND CCY1 = :old.ccy1 AND CCY2 = :old.ccy2 
            AND RATE_TYPE = :old.rate_type AND RATE_DT_STAMP = time_now;
            debug.pr_debug('CY','Updated');
        END;
    end if;
EXCEPTION
WHEN OTHERS
THEN
    debug.pr_debug('CY','In others '||SQLERRM);
END;
/