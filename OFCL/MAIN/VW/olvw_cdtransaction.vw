CREATE OR REPLACE VIEW OLVW_CDTRANSACTION AS
SELECT CONTRACT_REF_NO,
       DEPOSIT_ACTION,
       DEPOSIT_BRANCH,
       SEQ_NO,
       STATUS,
       cast('' as VARCHAR2(4000)) REQ_LIST
  FROM OLTB_CDTRANSACTION A
 WHERE STATUS IN ('E', 'T', 'W')
   and exists (SELECT BRANCH_CODE
          FROM SMVWS_CONSOLIDATED_USERROLE
         WHERE USER_ID = GLOBAL.user_id
           AND BRANCH_CODE = (SELECT sypks_utils.get_branch(CONTRACT_REF_NO) FROM DUAL))
   and exists
 (select 1
          from smtbs_user a
         where a.user_id = global.user_id
           and ((a.products_allowed = 'A' and exists
                (select 1
                    from smtbs_user_products b
                   where b.user_id = a.user_id
                     and b.product_code = Substr(CONTRACT_REF_NO, 3, 7))) or
               (a.products_allowed = 'D' and not exists
                (select 1
                    from smtbs_user_products c
                   where c.user_id = a.user_id
                     and c.product_code = Substr(CONTRACT_REF_NO, 3, 7)))))
 ORDER BY SEQ_NO
/