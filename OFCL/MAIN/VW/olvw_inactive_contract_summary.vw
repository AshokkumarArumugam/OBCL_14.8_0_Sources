CREATE OR REPLACE VIEW olvw_inactive_contract_summary ("CONTRACT_REF_NO", "BRANCH", "MODULE_CODE", "PRODUCT", "PRODUCT_TYPE", "AUTH_STATUS", "CONTRACT_STATUS", "COUNTERPARTY", "CONT_AMOUNT", "PRINCIPAL_OUTSTANDING_BAL", "CURRENCY", "VALUE_DATE", "MATURITY_DATE", "USER_REF_NO", "REL_REFERENCE", "USER_DEFINED_STATUS", "PAYMENT_METHOD", "RATE_CODE", "RATE", "RATE_SIGN", "SPREAD", "INT_AMOUNT", "DEPARTMENT_CODE", "CUSTOM_REF_NO", "TREASURY_SOURCE", "WORKFLOW_STATUS", "RATE_REVISION_STATUS", "EXTERNAL_REF_NO", "AGENT_CIF", "GFCID", "FACILITY_NAME", "CREDIT_LINE", "EG_NUMBER", "ALTERNATE_REF_NO", "COMMITMENT_REF_NO", "PART_SYS_BORR_ID", "PART_SYS_COMP", "PART_SYS_REF_NO", "SHORT_NAME", "DT_FACILITY_ID", "CUSIP_NO") AS 
  (  
(
SELECT       a.contract_ref_no,
       a.branch,
       a.module_code,
       a.product_code  product,
       a.product_type,
       a.auth_status,
       a.contract_status,
       b.counterparty,
       b.amount cont_amount,
       d.principal_outstanding_bal,     
       b.currency,
       b.value_date,
       b.maturity_date,
       a.user_ref_no,
       b.rel_reference,
       a.user_defined_status,
       b.payment_method,
       c.rate_code,
       c.rate,
       c.rate_sign,     
       c.spread,
       c.amount  int_amount,
       a.department_code,
       a.CUSTOM_REF_NO,    
       a.Treasury_source,    
       a.workflow_status,    
       a.rate_revision_status, 
       a.external_ref_no, 
       b.AGENT_CIF, 
       e.gfcid,     
       b.facility_name
       ,b.credit_line
       ,e.eg_number 
       ,a.alternate_ref_no 
      ,null 
        ,(SELECT field_value FROM oltms_contract_userdef_fields
    WHERE contract_ref_no = a.contract_ref_no
    AND version_no = a.latest_version_no
    AND module = a.module_code
    AND product_code = a.product_code
    AND field_name = 'PART-SYS-BORR-ID') PART_SYS_BORR_ID
    ,(SELECT field_value FROM oltms_contract_userdef_fields
    WHERE contract_ref_no = a.contract_ref_no
    AND version_no = a.latest_version_no
    AND module = a.module_code
    AND product_code = a.product_code
    AND field_name = 'PART-SYS-COMP') PART_SYS_COMP
    ,(SELECT field_value FROM oltms_contract_userdef_fields
    WHERE contract_ref_no = a.contract_ref_no
    AND version_no = a.latest_version_no
    AND module = a.module_code
    AND product_code = a.product_code
    AND field_name = 'PART-SYS-REF-NO') PART_SYS_REF_NO 
    ,substr(e.short_name,1,55)
      ,(SELECT field_value FROM oltms_contract_userdef_fields
    WHERE contract_ref_no = a.contract_ref_no
    AND   version_no     = a.latest_version_no
    AND    field_name     = 'DT_Facility_ID') DT_FACILITY_ID  
    ,b.CUSIP_NO 
FROM     oltbs_contract a,
       oltbs_contract_master b,
       lftbs_contract_interest c,
       oltbs_contract_balance d,       
    oltms_customer  e 
WHERE     a.contract_ref_no    = b.contract_ref_no
AND    a.contract_status    = 'I'
AND          a.latest_version_no   = b.version_no
AND    a.module_code     = 'OL'
AND    a.product_type ='L'
AND    a.contract_ref_no    = d.contract_ref_no(+)   
AND      b.contract_ref_no   = c.contract_reference_no (+)
AND    b.main_comp     = c.component (+)
and      b.counterparty=e.customer_no(+)
)
)
/
CREATE OR REPLACE SYNONYM olvws_inactive_contract_summary FOR olvw_inactive_contract_summary
/