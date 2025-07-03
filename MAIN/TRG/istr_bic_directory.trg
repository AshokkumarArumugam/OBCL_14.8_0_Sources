CREATE OR REPLACE TRIGGER ISTR_BIC_DIRECTORY
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2019 - 2021  Oracle and/or its affiliates.  All rights reserved.
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
  **   Modified By         : Poornachandran R
  **   Modified On         : 01-APR-2019
  **   Modified Reason     : modify operation is failing in isdbicde
  **   Search string       : Bug#29581597
---------------------------------------------------------------------------------*/
INSTEAD OF INSERT OR UPDATE OR DELETE ON ISTM_BIC_DIRECTORY
FOR EACH ROW
BEGIN
  IF INSERTING THEN
    INSERT INTO istm_bic_directory_gbl
      (bic_code
       ,bank_name
       ,mod_no
       ,record_stat
       ,maker_id
       ,maker_dt_stamp
       ,checker_id
       ,checker_dt_stamp
       ,once_auth
       ,auth_stat
       ,bank_address1
       ,bank_address2
       ,bank_address3
       ,upload_flag
       ,upload_update
       ,gen_mt103
       ,blacklisted
       ,cug_member
       ,gen_mt103p
       ,multi_cust_transfer
       ,max_size
       ,remit_member
       ,sub_type_code
       ,gen_mt102p
       ,gen_mt101
       ,transaction_per_msg
       ,adb_member
       ,be_indicator
       ,branch_info
       ,pob_number
       ,street_addr_1
       ,street_addr_2
       ,street_addr_3
       ,street_addr_4
       ,city
       ,cps
       ,zip_code
       ,iso_country_code
      ) 
    VALUES
      (:new.bic_code
       ,:new.bank_name
       ,:new.mod_no
       ,:new.record_stat
       ,:new.maker_id
       ,:new.maker_dt_stamp
       ,:new.checker_id
       ,:new.checker_dt_stamp
       ,:new.once_auth
       ,:new.auth_stat
       ,:new.bank_address1
       ,:new.bank_address2
       ,:new.bank_address3
       ,:new.upload_flag
       ,:new.upload_update
       ,:new.gen_mt103
       ,:new.blacklisted
       ,:new.cug_member
       ,:new.gen_mt103p
       ,:new.multi_cust_transfer
       ,:new.max_size
       ,:new.remit_member
       ,:new.sub_type_code
       ,:new.gen_mt102p
       ,:new.gen_mt101
       ,:new.transaction_per_msg
       ,:new.adb_member
       ,:new.be_indicator
       ,:new.branch_info
       ,:new.pob_number
       ,:new.street_addr_1
       ,:new.street_addr_2
       ,:new.street_addr_3
       ,:new.street_addr_4
       ,:new.city
       ,:new.cps
       ,:new.zip_code
       ,:new.iso_country_code
      );
  ELSIF UPDATING 
  THEN
    --Bug#29581597 Commented and Added Starts
    /*
    UPDATE istm_bic_directory_gbl
    SET  bank_name            = Nvl(:new.bank_name            ,:old.bank_name            )            
         ,mod_no              = Nvl(:new.mod_no               ,:old.mod_no               )
         ,record_stat         = Nvl(:new.record_stat          ,:old.record_stat          )
         ,maker_id            = Nvl(:new.maker_id             ,:old.maker_id             )
         ,maker_dt_stamp      = Nvl(:new.maker_dt_stamp       ,:old.maker_dt_stamp       )
         ,checker_id          = Nvl(:new.checker_id           ,:old.checker_id           )
         ,checker_dt_stamp    = Nvl(:new.checker_dt_stamp     ,:old.checker_dt_stamp     )
         ,once_auth           = Nvl(:new.once_auth            ,:old.once_auth            )
         ,auth_stat           = Nvl(:new.auth_stat            ,:old.auth_stat            )
         ,bank_address1       = Nvl(:new.bank_address1        ,:old.bank_address1        )
         ,bank_address2       = Nvl(:new.bank_address2        ,:old.bank_address2        )
         ,bank_address3       = Nvl(:new.bank_address3        ,:old.bank_address3        )
         ,upload_flag         = Nvl(:new.upload_flag          ,:old.upload_flag          )
         ,upload_update       = Nvl(:new.upload_update        ,:old.upload_update        )
         ,gen_mt103           = Nvl(:new.gen_mt103            ,:old.gen_mt103            )
         ,blacklisted         = Nvl(:new.blacklisted          ,:old.blacklisted          )
         ,cug_member          = Nvl(:new.cug_member           ,:old.cug_member           )
         ,gen_mt103p          = Nvl(:new.gen_mt103p           ,:old.gen_mt103p           )
         ,multi_cust_transfer = Nvl(:new.multi_cust_transfer  ,:old.multi_cust_transfer  )
         ,max_size            = Nvl(:new.max_size             ,:old.max_size             )
         ,remit_member        = Nvl(:new.remit_member         ,:old.remit_member         )
         ,sub_type_code       = Nvl(:new.sub_type_code        ,:old.sub_type_code        )
         ,gen_mt102p          = Nvl(:new.gen_mt102p           ,:old.gen_mt102p           )
         ,gen_mt101           = Nvl(:new.gen_mt101            ,:old.gen_mt101            )
         ,transaction_per_msg = Nvl(:new.transaction_per_msg  ,:old.transaction_per_msg  )
         ,adb_member          = Nvl(:new.adb_member           ,:old.adb_member           )
         ,be_indicator        = Nvl(:new.be_indicator         ,:old.be_indicator         )
         ,branch_info         = Nvl(:new.branch_info          ,:old.branch_info          )
         ,pob_number          = Nvl(:new.pob_number           ,:old.pob_number           )
         ,street_addr_1       = Nvl(:new.street_addr_1        ,:old.street_addr_1        )
         ,street_addr_2       = Nvl(:new.street_addr_2        ,:old.street_addr_2        )
         ,street_addr_3       = Nvl(:new.street_addr_3        ,:old.street_addr_3        )
         ,street_addr_4       = Nvl(:new.street_addr_4        ,:old.street_addr_4        )
         ,city                = Nvl(:new.city                 ,:old.city                 )
         ,cps                 = Nvl(:new.cps                  ,:old.cps                  )
         ,zip_code            = Nvl(:new.zip_code             ,:old.zip_code             )
         ,iso_country_code    = Nvl(:new.iso_country_code     ,:old.iso_country_code     )
      WHERE bic_code          = Nvl(:new.bic_code,:old.bic_code);
	  */
    UPDATE istm_bic_directory_gbl
    SET  bank_name            = :new.bank_name                     
         ,mod_no              = :new.mod_no              
         ,record_stat         = :new.record_stat         
         ,maker_id            = :new.maker_id            
         ,maker_dt_stamp      = :new.maker_dt_stamp      
         ,checker_id          = :new.checker_id          
         ,checker_dt_stamp    = :new.checker_dt_stamp    
         ,once_auth           = :new.once_auth           
         ,auth_stat           = :new.auth_stat           
         ,bank_address1       = :new.bank_address1       
         ,bank_address2       = :new.bank_address2       
         ,bank_address3       = :new.bank_address3       
         ,upload_flag         = :new.upload_flag         
         ,upload_update       = :new.upload_update       
         ,gen_mt103           = :new.gen_mt103           
         ,blacklisted         = :new.blacklisted         
         ,cug_member          = :new.cug_member          
         ,gen_mt103p          = :new.gen_mt103p          
         ,multi_cust_transfer = :new.multi_cust_transfer 
         ,max_size            = :new.max_size            
         ,remit_member        = :new.remit_member        
         ,sub_type_code       = :new.sub_type_code       
         ,gen_mt102p          = :new.gen_mt102p          
         ,gen_mt101           = :new.gen_mt101           
         ,transaction_per_msg = :new.transaction_per_msg 
         ,adb_member          = :new.adb_member          
         ,be_indicator        = :new.be_indicator        
         ,branch_info         = :new.branch_info         
         ,pob_number          = :new.pob_number          
         ,street_addr_1       = :new.street_addr_1       
         ,street_addr_2       = :new.street_addr_2       
         ,street_addr_3       = :new.street_addr_3       
         ,street_addr_4       = :new.street_addr_4       
         ,city                = :new.city                
         ,cps                 = :new.cps                 
         ,zip_code            = :new.zip_code            
         ,iso_country_code    = :new.iso_country_code    
      WHERE bic_code          = :new.bic_code;	  
      --Bug#29581597 Commented and Added Ends
  ELSIF DELETING   
  THEN	  
    DELETE FROM istm_bic_directory_gbl 
	WHERE  bic_code = Nvl(:new.bic_code,:old.bic_code);
  END IF;
END ISTR_BIC_DIRECTORY;
/