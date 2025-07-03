CREATE OR REPLACE force VIEW  
 olvw_all_contract ( auth_status, 
auto_manual_flag, book_date, branch, common_ref_no, 
conf_pmt_link_stat, contract_ccy, contract_ref_no, contract_status, 
counterparty, curr_event_code, custom_ref_no, delinquency_status, 
department_code, eca_status, external_ref_no, fund_ref_no, 
latest_event_date, latest_event_seq_no, latest_reprogram_counter_no, latest_version_no, 
liability_cif, module_code, overall_conf_stat, product_code, 
product_type, rate_revision_status, response_stat, serial_no, 
supress_bv_payment_msg, supress_bv_payment_msg1, template_status, treasury_source, 
unconfirmed_since, user_defined_status, user_ref_no, workflow_status
 ) AS 
 SELECT auth_status
             ,auto_manual_flag
             ,book_date
             ,branch
             ,common_ref_no
             ,conf_pmt_link_stat
             ,contract_ccy
             ,contract_ref_no
             ,contract_status
             ,counterparty
             ,curr_event_code
             ,custom_ref_no
             ,delinquency_status
             ,department_code
             ,eca_status
             ,external_ref_no
             ,fund_ref_no
             ,latest_event_date
             ,latest_event_seq_no
             ,latest_reprogram_counter_no
             ,latest_version_no
             ,liability_cif
             ,module_code
             ,overall_conf_stat
             ,product_code
             ,product_type
             ,rate_revision_status
             ,response_stat
             ,serial_no
             ,supress_bv_payment_msg
             ,supress_bv_payment_msg1
             ,template_status
             ,treasury_source
             ,unconfirmed_since
             ,user_defined_status
             ,user_ref_no
             ,workflow_status
       FROM   oltbs_contract
      UNION
      SELECT auth_status
             ,auto_manual_flag
             ,book_date
             ,branch
             ,common_ref_no
             ,conf_pmt_link_stat
             ,contract_ccy
             ,contract_ref_no
             ,contract_status
             ,counterparty
             ,curr_event_code
             ,custom_ref_no
             ,delinquency_status
             ,department_code
             ,eca_status
             ,external_ref_no
             ,fund_ref_no
             ,latest_event_date
             ,latest_event_seq_no
             ,latest_reprogram_counter_no
             ,latest_version_no
             ,liability_cif
             ,module_code
             ,overall_conf_stat
             ,product_code
             ,product_type
             ,rate_revision_status
             ,response_stat
             ,serial_no
             ,supress_bv_payment_msg
             ,supress_bv_payment_msg1
             ,template_status
             ,treasury_source
             ,unconfirmed_since
             ,user_defined_status
             ,user_ref_no
             ,workflow_status
       FROM   olars_contract
	   -- OFCL12.2 Not required
      /*UNION
      (SELECT auth_status
             ,auto_manual_flag
             ,book_date
             ,branch
             ,common_ref_no
             ,conf_pmt_link_stat
             ,contract_ccy
             ,contract_ref_no
             ,contract_status
             ,counterparty
             ,curr_event_code
             ,custom_ref_no
             ,delinquency_status
             ,department_code
             ,eca_status
             ,external_ref_no
             ,fund_ref_no
             ,latest_event_date
             ,latest_event_seq_no
             ,latest_reprogram_counter_no
             ,latest_version_no
             ,liability_cif
             ,module_code
             ,overall_conf_stat
             ,product_code
             ,product_type
             ,rate_revision_status
             ,response_stat
             ,serial_no
             ,supress_bv_payment_msg
             ,supress_bv_payment_msg1
             ,template_status
             ,treasury_source
             ,unconfirmed_since
             ,user_defined_status
             ,user_ref_no
             ,workflow_status
       FROM   cspts_contract)
      UNION
      (SELECT auth_status
             ,auto_manual_flag
             ,book_date
             ,branch
             ,common_ref_no
             ,conf_pmt_link_stat
             ,contract_ccy
             ,contract_ref_no
             ,contract_status
             ,counterparty
             ,curr_event_code
             ,custom_ref_no
             ,delinquency_status
             ,department_code
             ,eca_status
             ,external_ref_no
             ,fund_ref_no
             ,latest_event_date
             ,latest_event_seq_no
             ,latest_reprogram_counter_no
             ,latest_version_no
             ,liability_cif
             ,module_code
             ,overall_conf_stat
             ,product_code
             ,product_type
             ,rate_revision_status
             ,response_stat
             ,serial_no
             ,supress_bv_payment_msg
             ,supress_bv_payment_msg1
             ,template_status
             ,treasury_source
             ,unconfirmed_since
             ,user_defined_status
             ,user_ref_no
             ,workflow_status
      FROM   cspps_contract)*/
/
create or replace synonym olvws_all_contract for olvw_all_contract
/