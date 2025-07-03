CREATE OR REPLACE FORCE VIEW olvw_contract_summary_arch
(
   CONTRACT_REF_NO,
   BRANCH,
   MODULE_CODE,
   PRODUCT,
   PRODUCT_TYPE,
   AUTH_STATUS,
   CONTRACT_STATUS,
   COUNTERPARTY,
   CONT_AMOUNT,
   PRINCIPAL_OUTSTANDING_BAL,
   CURRENCY,
   VALUE_DATE,
   MATURITY_DATE,
   USER_REF_NO,
   REL_REFERENCE,
   USER_DEFINED_STATUS,
   PAYMENT_METHOD,
   RATE_CODE,
   RATE,
   RATE_SIGN,
   SPREAD,
   INT_AMOUNT,
   DEPARTMENT_CODE,
   CUSTOM_REF_NO,
   TREASURY_SOURCE,
   WORKFLOW_STATUS,
   RATE_REVISION_STATUS,
   EXTERNAL_REF_NO,
   AGENT_CIF,
   GFCID,
   FACILITY_NAME,
   CREDIT_LINE,
   --CLUSTERID,
   EG_NUMBER,
   ALTERNATE_REF_NO,
   COMMITMENT_REF_NO,
   PART_SYS_BORR_ID,
   PART_SYS_COMP,
   PART_SYS_REF_NO,
   SHORT_NAME
)
AS
   (
   SELECT   a.contract_ref_no,
             a.branch,
             a.module_code,
             a.product_code product,
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
             c.amount int_amount,
             a.department_code,
             a.CUSTOM_REF_NO,
             a.Treasury_source,
             a.workflow_status,
             a.rate_revision_status,
             a.external_ref_no,
             b.AGENT_CIF,
             e.gfcid,
             b.facility_name,
             b.credit_line,
             --clusterid,
             e.eg_number,
             a.alternate_ref_no,
             f.linked_to_ref commitment_ref_no,
             (SELECT   field_value
                FROM   olars_contract_userdef_fields
               WHERE       contract_ref_no = a.contract_ref_no
                       AND version_no = a.latest_version_no
                       AND module = a.module_code
                       AND product_code = a.product_code
                       AND field_name = 'PART-SYS-BORR-ID')
                PART_SYS_BORR_ID,
             (SELECT   field_value
                FROM   olars_contract_userdef_fields
               WHERE       contract_ref_no = a.contract_ref_no
                       AND version_no = a.latest_version_no
                       AND module = a.module_code
                       AND product_code = a.product_code
                       AND field_name = 'PART-SYS-COMP')
                PART_SYS_COMP,
             (SELECT   field_value
                FROM   olars_contract_userdef_fields
               WHERE       contract_ref_no = a.contract_ref_no
                       AND version_no = a.latest_version_no
                       AND module = a.module_code
                       AND product_code = a.product_code
                       AND field_name = 'PART-SYS-REF-NO')
                PART_SYS_REF_NO,
             SUBSTR (e.short_name, 1, 55)
      FROM   olars_contract a,
             olars_contract_master b,
             lfars_contract_interest c,
             olars_contract_balance d,
             oltms_customer e,
             olars_contract_linkages f
     WHERE       a.contract_ref_no = b.contract_ref_no
             AND a.contract_status <> 'H'
             AND a.latest_version_no = b.version_no
             AND a.module_code IN ('MM', 'OL', 'SR', 'LB', 'OD')
             AND b.contract_ref_no = c.contract_reference_no(+)
             AND b.main_comp = c.component(+)
             AND NVL (c.event_sequence_no, 0) =
                   (SELECT   NVL (MAX (event_sequence_no), 0)
                      FROM   lfars_contract_interest
                     WHERE   contract_reference_no = c.contract_reference_no)
             AND a.contract_ref_no = d.contract_ref_no
             AND b.counterparty = e.customer_no(+)
             AND f.contract_ref_no(+) = a.contract_ref_no
             AND f.version_no(+) = a.latest_version_no
   )
   UNION
   (SELECT   a.contract_ref_no,
             a.branch,
             a.module_code,
             a.product_code product,
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
             c.amount int_amount,
             a.department_code,
             a.CUSTOM_REF_NO,
             a.Treasury_source,
             a.workflow_status,
             a.rate_revision_status,
             a.external_ref_no,
             b.AGENT_CIF,
             e.gfcid,
             b.facility_name,
             b.credit_line,
             --clusterid,
             e.eg_number,
             a.alternate_ref_no,
             NULL,
             (SELECT   field_value
                FROM   olars_contract_userdef_fields
               WHERE       contract_ref_no = a.contract_ref_no
                       AND version_no = a.latest_version_no
                       AND module = a.module_code
                       AND product_code = a.product_code
                       AND field_name = 'PART-SYS-BORR-ID')
                PART_SYS_BORR_ID,
             (SELECT   field_value
                FROM   olars_contract_userdef_fields
               WHERE       contract_ref_no = a.contract_ref_no
                       AND version_no = a.latest_version_no
                       AND module = a.module_code
                       AND product_code = a.product_code
                       AND field_name = 'PART-SYS-COMP')
                PART_SYS_COMP,
             (SELECT   field_value
                FROM   olars_contract_userdef_fields
               WHERE       contract_ref_no = a.contract_ref_no
                       AND version_no = a.latest_version_no
                       AND module = a.module_code
                       AND product_code = a.product_code
                       AND field_name = 'PART-SYS-REF-NO')
                PART_SYS_REF_NO,
             SUBSTR (e.short_name, 1, 55)
      FROM   olars_contract a,
             olars_contract_master b,
             lfars_contract_interest c,
             olars_contract_balance d,
             oltms_customer e
     WHERE       a.contract_ref_no = b.contract_ref_no
             AND a.contract_status = 'H'
             AND a.latest_version_no = b.version_no
             AND a.module_code IN ('MM', 'OL', 'SR', 'LB')
             AND a.contract_ref_no = d.contract_ref_no
             AND b.contract_ref_no = c.contract_reference_no(+)
             AND b.main_comp = c.component(+)
             AND b.counterparty = e.customer_no(+)
   )
   UNION
   (SELECT   a.contract_ref_no,
             a.branch,
             a.module_code,
             a.product_code product,
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
             NULL,
             NULL,
             NULL,
             NULL,
             NULL int_amount,
             a.department_code,
             a.CUSTOM_REF_NO,
             a.Treasury_source,
             a.workflow_status,
             a.rate_revision_status,
             a.external_ref_no,
             b.AGENT_CIF,
             e.gfcid,
             b.facility_name,
             b.credit_line,
             --clusterid,
             e.eg_number,
             a.alternate_ref_no,
             NULL,
             (SELECT   field_value
                FROM   olars_contract_userdef_fields
               WHERE       contract_ref_no = a.contract_ref_no
                       AND version_no = a.latest_version_no
                       AND module = a.module_code
                       AND product_code = a.product_code
                       AND field_name = 'PART-SYS-BORR-ID')
                PART_SYS_BORR_ID,
             (SELECT   field_value
                FROM   olars_contract_userdef_fields
               WHERE       contract_ref_no = a.contract_ref_no
                       AND version_no = a.latest_version_no
                       AND module = a.module_code
                       AND product_code = a.product_code
                       AND field_name = 'PART-SYS-COMP')
                PART_SYS_COMP,
             (SELECT   field_value
                FROM   olars_contract_userdef_fields
               WHERE       contract_ref_no = a.contract_ref_no
                       AND version_no = a.latest_version_no
                       AND module = a.module_code
                       AND product_code = a.product_code
                       AND field_name = 'PART-SYS-REF-NO')
                PART_SYS_REF_NO,
             SUBSTR (e.short_name, 1, 55)
      FROM   olars_contract a,
             olars_contract_master b,
             olars_contract_balance d,
             oltms_customer e
     WHERE       a.contract_ref_no = b.contract_ref_no
             AND a.contract_status <> 'H'
             AND a.latest_version_no = b.version_no
             AND a.module_code IN ('MM', 'OL', 'SR', 'LB')
             AND a.contract_ref_no = d.contract_ref_no(+)
             AND NOT EXISTS
                   (SELECT   1
                      FROM   LFAR_CONTRACT_INTEREST c
                     WHERE   c.contract_reference_no = b.contract_ref_no
                             AND b.main_comp = c.component)
             AND b.counterparty = e.customer_no(+)
             AND a.product_type = 'C'
   )
 --03-AUG-2012 Flexcube V.CL Release 7.11, Retro,EURCITIPLC#14327 Changes Ends
/