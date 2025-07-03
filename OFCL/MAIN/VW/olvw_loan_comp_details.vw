create or replace view olvw_loan_comp_details
(CONTRACT_REF_NO,BRANCH_CODE,COMPONENT,COMPONENT_CCY,COMPONENT_TYPE,LATEST_INT_RATE,DUE_DATE,AMOUNT_DUE,AMOUNT_SETTLED,EMI_AMOUNT,ACCRUED_AMOUNT,ADJUSTED_AMOUNT,SCODE,XREF)
AS 
(select a.contract_ref_no,
               Branch_account_due branch_code,
               component,
               Currency_amt_due component_ccy,
               component_type,
               main_comp_rate latest_int_rate,
               due_date,
               amount_due,
               amount_settled,
               b.amort_amount emi_amount,
               cast('' as number) accrued_amount,
               adjusted_amount,
              cast('' as VARCHAR2(15)) SCODE,
              cast('' as VARCHAR2(16)) XREF            
          from oltbs_amount_due a, oltbs_contract_preference b,oltbs_contract_master c
         where a.contract_ref_no = b.contract_ref_no(+)
           and   a.contract_ref_no =c.contract_ref_no (+)
           and b.version_no =
               (select max(version_no)
                  from oltbs_contract_preference d
                 where a.contract_ref_no = d.contract_ref_no)
           and b.version_no=c.version_no  )
		   
		   
/
create or replace synonym olvws_loan_comp_details for olvw_loan_comp_details

/