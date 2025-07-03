create or replace view oltm_bic as
SELECT bic_code         ,
       bank_name        ,
       'Y' internal_address,
       mod_no           ,
       record_stat      ,
       auth_stat        ,
       once_auth        ,
       maker_id         ,
       maker_dt_stamp   ,
       checker_id       ,
       checker_dt_stamp FROM istm_bic_directory
/
create or replace synonym oltms_bic for oltm_bic
/