CREATE OR REPLACE FORCE VIEW sytv_acc_master AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : sytv_acc_master.VW

Change History
  
Changed By         : Abhinav Kumar
Date               : 07-Nov-2024
Change Description : Modified Column SOURCE_SYSTEM_ACC_NO -> CUST_ACCOUNT_NO from STTM_CORE_ACCOUNT
                     as LBDINSTR screen was showing Source system account number instead of Account number maintained in STDCRACC. 
Search String      : Bug#37184103
--------------------------------------------------------------------------------------------------------------------------------------
*/
SELECT A."SOURCE_SYSTEM",
A."CUSTOMER_NO",
A."SOURCE_SYSTEM_ACC_BRN",
--A."SOURCE_SYSTEM_ACC_NO", --Bug#37184103
A."CUST_ACCOUNT_NO", --Bug#37184103
A."CUST_AC_CCY",
A."CUST_AC_IBAN",
A."MAKER_ID",
A."MAKER_DT_STAMP",
A."CHECKER_ID",
A."CHECKER_DT_STAMP",
A."MOD_NO",
A."ONCE_AUTH",
A."RECORD_STAT",
A."AUTH_STAT",
A."CUST_AC_NAME",
A."AC_OPEN_DATE",
A."AC_STAT_NO_CR",
A."AC_STAT_NO_DR",
A."GL_STAT_BLOCKED",
A."AC_STAT_FROZEN",
A."AC_STAT_DORMANT",
A."ACCOUNT_CLASS",
NULL ALT_AC_NO,
B.OFFLINE_LIMIT,
b.ac_native,
B.MSG_NETTING,
b.CUST_NAME1,
b.charge_details,
b.ac_netting
FROM  STTM_CORE_ACCOUNT A, SYTM_ACC_MASTER B WHERE A.CUST_ACCOUNT_NO=B.CUST_AC_NO(+)
/
create or replace synonym SYTVS_ACC_MASTER for sytv_acc_master
/
