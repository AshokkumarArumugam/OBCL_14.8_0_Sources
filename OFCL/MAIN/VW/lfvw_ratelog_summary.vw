CREATE OR REPLACE VIEW LFVW_RATELOG_SUMMARY AS
(
  SELECT  b.contract_ref_no,
    b.component,
    b.branch,
    b.rate_fix_date_used,
    b.rate_fix_date_actual,
    b.app_date,
    b.rate_fixing_days,
    b.esn,
    b.rate_code,
    b.ccy,
    b.rate,
    b.status,
    b.borrow_lend_ind, 
    a.contract_status   
   
  FROM  Oltbs_contract a,
        Lftb_rate_fixing_days_log b
        WHERE   a.contract_ref_no = b.contract_ref_no     
     
)
/
create or replace synonym LFVWS_RATELOG_SUMMARY for LFVW_RATELOG_SUMMARY
/