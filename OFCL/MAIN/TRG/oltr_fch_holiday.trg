create or replace trigger oltr_fch_holiday
after UPDATE OF HOLIDAY_LIST ON STTM_FIC_HOLIDAY--OBCL_14.6_#33800485 
--after UPDATE OF HOLIDAY_LIST ON OLTM_FIN_CENTRE_HOLIDAY--OBCL_14.6_#33800485 
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 1997 - 2015  Oracle and/or its affiliates.  All rights reserved.
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
**  Changed By         :Pallavi R
**  Changed on         :20-Sep-2022
**  Change Description :Changes done as part of 33800485 Common core FIN cal changes
**  Search String      :OBCL_14.6_#33800485 
*************************************************************************************************/
for each row
declare
  l_occurance       NUMBER  :=  1;
  l_date_string     VARCHAR2(20);
  l_date          DATE; 
  l_old_val       varchar2(1);
  l_new_val       varchar2(1);
begin
  debug.pr_debug('OL','new record'||:new.HOLIDAY_LIST);
  debug.pr_debug('OL','old record'||:old.HOLIDAY_LIST);
  IF TRUNC(global.application_date, 'MM') <=
     TO_DATE('01-' || LPAD(TO_CHAR(:new.month), 2, '0') || '-' ||
             TO_CHAR(:new.year),
             'dd-mm-yyyy') THEN 
  if :new.HOLIDAY_LIST <> :old.HOLIDAY_LIST then  
  --Initial assignments happen here
    l_new_val := SUBSTR(:new.HOLIDAY_LIST, l_occurance, 1);
    l_old_val := SUBSTR(:old.HOLIDAY_LIST, l_occurance, 1);
    
    WHILE l_new_val IS NOT NULL LOOP
      if l_new_val <>  l_old_val then

        l_date_string :=  TO_CHAR(l_occurance)||'/'||TO_CHAR(:new.month)||'/'||TO_CHAR(:new.year);
        l_date      :=  TO_DATE(l_date_string,'DD/MM/RRRR');

        if l_date > global.application_date then    --so this adhoc holiday date change happens only for future dates
          
          delete from oltbs_upload_holiday_master
          where CHANGE_DATE = l_date
          and holiday_type='FCH'
          and holiday_key =:new.Financial_Center ;
        
          if l_new_val = 'H' and l_old_val = 'W' then
  
            FOR each_branch in (SELECT * FROM sttm_core_branch WHERE record_stat  ='O' AND once_auth ='Y') LOOP
            insert into oltbs_upload_holiday_master
                          (
                          CHANGE_DATE,
                          HOLIDAY_STATUS,
                          HOLIDAY_TYPE,
                          HOLIDAY_KEY,
                          BRANCH_CODE
                          )
            values
                          (
                           l_date,
                           'H',
                           'FCH',
                           :new.Financial_Center,
                           each_branch.Branch_Code
                          );
          END LOOP;
          elsif l_new_val = 'W' and l_old_val = 'H' then
          
            FOR each_branch in (SELECT * FROM sttm_core_branch WHERE record_stat  ='O' AND once_auth ='Y') LOOP
            insert into oltbs_upload_holiday_master
                          (
                          CHANGE_DATE,
                          HOLIDAY_STATUS,
                          HOLIDAY_TYPE,
                          HOLIDAY_KEY,
                          BRANCH_CODE
                          )
            values
                          (
                           l_date,
                           'W',
                           'FCH',
                           :new.Financial_Center,
                           each_branch.Branch_Code
                          );
          END LOOP;         
                                
          end if;
        end if;
      end if;
        l_occurance := l_occurance + 1;
        l_new_val := SUBSTR(:new.HOLIDAY_LIST, l_occurance, 1);
        l_old_val := SUBSTR(:old.HOLIDAY_LIST, l_occurance, 1);

      END LOOP;   
  end if;
  END IF; 
exception
when others then
    RAISE_APPLICATION_ERROR(-20001,
                            'bombed in trigger oltr_fch_holiday-->' || SQLERRM);
end oltr_fch_holiday; 
/