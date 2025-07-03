CREATE OR REPLACE force VIEW olvw_all_ac_entries ( TRN_REF_NO, 
AC_ENTRY_SR_NO, EVENT_SR_NO, EVENT, AC_BRANCH, 
AC_NO, AC_CCY, CATEGORY, DRCR_IND, 
TRN_CODE, FCY_AMOUNT, EXCH_RATE, LCY_AMOUNT, 
TRN_DT, VALUE_DT, TXN_INIT_DATE, AMOUNT_TAG, 
RELATED_ACCOUNT, RELATED_CUSTOMER, RELATED_REFERENCE, MIS_HEAD, 
MIS_FLAG, INSTRUMENT_CODE, BANK_CODE, BALANCE_UPD, 
AUTH_STAT, MODULE, CUST_GL, DLY_HIST, 
FINANCIAL_CYCLE, PERIOD_CODE, BATCH_NO, USER_ID, 
CURR_NO, PRINT_STAT, TRANSACTION_COUNT, CUSTOM_REF_NO, 
INTERFACE_REF_NO,CUSTOMER_REF_NO,HIDE_TXN_IN_STMT,
PNL_HIST_IND, -- FCC 4.5 APR 2004 ITR1 SFR 6 CHANGES
INTERNAL_GL_TYPE,
SYSTEM_AC_NO,
MIS_UNIT_TYPE,MIS_UNIT_REF_NO --Fcc39 related changes
, ECA_ALLOWED , ECA_STATUS,EOD_WASH_STATUS  -- FCC40 June 2002 Related changes  
,AUTH_ID
,RECV_ORIG_AC_NO   --23-APR-2003 FCC 4.2 APR 2003 CHANGES for ITR1 SFR NO 611 deleteion of the contract was not deleting  the receivable
--
--FCC 4.3 AUG 2003 GAAP core Changes start
--
,gaap_indicator
--
--FCC 4.3 AUG 2003 GAAP core Changes end
--
,NETTED_ENTRY --FCC 4.5 APril changes.
,COMBINED_BAL_UPD_ALLOWED /* Added for FCC 4.5 APR 2004 FAST changes */
,accounting_role      ---FCC 4.6 Sep04 Release Changes
-- FLEXCUBE V.CL Release 7.0, Changes, Arun, 09-DEC-2005, START
 ,PRODUCT_ACCRUAL
 ,GLMIS_UPDATE_FLAG
 ,IB
 ,AML_EXCEPTION
 ,ACCOUNTING_SYSTEM --OBCL_14.4_Payment_Handoff Changes
 ,PRODUCT --Bug#36799781
-- FLEXCUBE V.CL Release 7.0, Changes, Arun, 09-DEC-2005, END
--Bug#36820658 Start
	,HANDOFF_STATUS,
	EXT_SYS_UNIQUE_REF_NO,
	RETRY_COUNT
--Bug#36820658 End	
 ,EXT_AC_NO --Bug#37184103
) -- FCC4.1 oct 2002 Retro from mainstream added auth_id..
AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_all_ac_entries.VW
**
** Module       : CORE ENTITIES
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
-----------------------------------------------------------------------------------------------
*/
/* CHANGE HISTORY : 31-7-01 : INT SFR 4958. RELEASED AS A SEPARATE UNIT REPLACING
					olvw_all_ac_entries.VW 
   08/10/01 FCC 38 Retro (SFR 502) Added customer_ref_no in the view
   25-01-2002 Fcc39 related changes added one more column HIDE_TXN_IN_STMT to the view
   05-04-2002 Fcc4.0  June2002 related changes Added columns INTERNAL_GL_TYPE,SYSTEM_AC_NO,MIS_UNIT_TYPE,MIS_UNIT_REF_NO
   29-04-2002 Fcc4.0  June2002 related changes Added new column ECA_ALLOWED and ECA_STATUS
   31-MAY-2002 FCC4.0 JUNE 2002 PLNCITI TIL #4112 Auth_stat check added..Bsk
   18-JUNE-2002  FCC4.0 June 2002 related changes added new column EOD_WASH_STATUS
   08-AUG-2002 FCC4.1 Oct 2002 Retro from mainstream Included the Maker and Checker_id for each transaction report..Bsk
  23-APR-2003 FCC 4.2 APR 2003 CHANGES for ITR1 SFR NO 611 deleteion of the contract was not deleting  the receivable
  29-JUL-2003	FCC 4.3 AUG 2003 GAAP core Changes
  23-FEB-2004	FCC 4.5 April 2004 Netted entry field added, used while reversing netted entry contracts for FX, FT , LD ,MM
  08-MAR-2004 FCC 4.5 LOT1 APR 2004 ITR1 SFR 6 - Added pnl_hist_ind for netting changes
  24-Aug-2004 FCC4.6 Sep04 Release changes-Added accounting_role in the view
  09-DEC-2005 FLEXCUBE V.CL Release 7.0, CHANGES ARUN, ADDED FOUR COLUMNS IN VIEW olvw_all_ac_entries (PRODUCT_ACCRUAL,GLMIS_UPDATE_FLAG,IB,AML_EXCEPTION)
  
  **Changed By             : Revathi Dharmalingam
  **Date                   : 21-SEP-2020
  **Change Description     : Display accounting entries in the accounting entries screen in OLDTRONL that are handed-off from OBPM.
  **Bug                    : 31924313 
  **Search String          : OBCL_14.4_Payment_Handoff Changes

  **Changed By             : Akhila Samson
  **Change Description     : Changes done to populate the product code in the view 
  **Bug                    : 36799781 
  **Search String          : Bug#36799781

  **Changed By             : Satheesh Seshan
  **Date                   : 27-Sep-2024
  **Change Description     : Add Handoff Status, Ext Sys Unique ref no and Retry Count columns to display.
  **Search String          : Bug#36820658
  
  **Changed By             : Abhinav Kumar
  **Date                   : 07-Nov-2024
  **Change Description     : Modified Column SOURCE_SYSTEM_ACC_NO -> CUST_ACCOUNT_NO from STTM_CORE_ACCOUNT
                              as LBDINSTR screen was showing Source system account number instead of Account number maintained in STDCRACC. 
  **Bug                    : 37184103 
  **Search String          : Bug#37184103
----------------------------------------------------------------------------------------------------
*/
SELECT  -- CITIPLC Added Txn Count
       TRN_REF_NO
     , AC_ENTRY_SR_NO
     , EVENT_SR_NO
     , EVENT
     , AC_BRANCH
     , AC_NO
     , AC_CCY
-- USDFBME 27/9 added category
     , CATEGORY
     , DRCR_IND
     , TRN_CODE
     , FCY_AMOUNT
     , EXCH_RATE
     , LCY_AMOUNT
     , TRN_DT
     , VALUE_DT
     ,TXN_INIT_DATE
     ,AMOUNT_TAG
     ,RELATED_ACCOUNT
     ,RELATED_CUSTOMER
     ,RELATED_REFERENCE
     ,MIS_HEAD
     ,MIS_FLAG
     ,INSTRUMENT_CODE
     ,BANK_CODE
     ,BALANCE_UPD
     ,AUTH_STAT
     ,MODULE
     ,CUST_GL
     ,'D' DLY_HIST
 -- USDFBME 29/9
     ,FINANCIAL_CYCLE
     ,PERIOD_CODE
     ,BATCH_NO
     ,USER_ID
     ,CURR_NO
     ,PRINT_STAT
-- CITIPLC Added Txn Count
     ,TRANSACTION_COUNT
     ,CUSTOM_REF_NO
     ,INTERFACE_REF_NO
 -- FCC 38 Retro (SFR 502) changes
     ,CUSTOMER_REF_NO
     ,HIDE_TXN_IN_STMT 	--Fcc39 related change		
     ,PNL_HIST_IND -- FCC 4.5 APR 2004 ITR1 SFR 6 CHANGES     
     ,INTERNAL_GL_TYPE	--Fcc4.0 June2002 related change added Internal_gl_type and system_ac_no
     ,SYSTEM_AC_NO
     ,MIS_UNIT_TYPE          
     ,MIS_UNIT_REF_NO        		
     ,ECA_ALLOWED 	-- 29/04/2002 	FCC40 June 2002 	
     ,ECA_STATUS	
     ,EOD_WASH_STATUS   -- 18/06/2002  FCC40 June 2002
     ,AUTH_ID	-- FCC4.1 OCT 2002 Retro from mainstream  added auth_id
     ,RECV_ORIG_AC_NO   --23-APR-2003 FCC 4.2 APR 2003 CHANGES for ITR1 SFR NO 611 deleteion of the contract was not deleting  the receivable
     --
     --FCC 4.3 AUG 2003 GAAP core Changes start
     --
     ,GAAP_INDICATOR--FCC 4.3 AUG 2003 GAAP CORE CHANGES END
     ,NETTED_ENTRY --FCC 4.5 APril changes.
     ,COMBINED_BAL_UPD_ALLOWED /* Added for FCC 4.5 APR 2004 FAST changes */
     ,accounting_role		---FCC 4.6 Sep04 Release Changes
-- FLEXCUBE V.CL Release 7.0, Changes, Arun, 09-DEC-2005
 ,PRODUCT_ACCRUAL
 ,GLMIS_UPDATE_FLAG
 ,IB
 ,AML_EXCEPTION
  ,'Loans' AS ACCOUNTING_SYSTEM --OBCL_14.4_Payment_Handoff Changes
   ,PRODUCT --Bug#36799781 
-- FLEXCUBE V.CL Release 7.0, Changes, Arun, 09-DEC-2005, END
	--Bug#36820658 Start
	,HANDOFF_STATUS,
	EXT_SYS_UNIQUE_REF_NO,
	RETRY_COUNT
	--Bug#36820658 End	
  ,EXT_AC_NO --Bug#37184103
 FROM oltbs_daily_log_ac
 WHERE DELETE_STAT <> 'D'
 AND AUTH_STAT <> '*'	--FCC4.0 JUNE 2002 PLNCITI TIL #4112 Auth_stat check added..Bsk
 UNION ALL 
 SELECT TRN_REF_NO, AC_ENTRY_SR_NO,EVENT_SR_NO,EVENT, AC_BRANCH, AC_NO, AC_CCY,
-- USDFBME 27/9 added category
 CATEGORY,DRCR_IND, TRN_CODE, FCY_AMOUNT,EXCH_RATE, LCY_AMOUNT, TRN_DT, VALUE_DT,
 TXN_INIT_DATE,amount_tag,related_account,related_customer, related_reference
 ,MIS_HEAD ,MIS_FLAG,instrument_code, bank_code, 'U', 'A', module,CUST_GL,'H'
-- USDFBME 29/9 ADDED FC AND PER CODE
 ,FINANCIAL_CYCLE, PERIOD_CODE,BATCH_NO,USER_ID,CURR_NO,PRINT_STAT,TRANSACTION_COUNT,
 CUSTOM_REF_NO,INTERFACE_REF_NO, -- CITIPLC 3.7
 -- FCC 38 Retro (SFR 502) changes
 CUSTOMER_REF_NO,
 HIDE_TXN_IN_STMT			--Fcc39 related change 
 ,PNL_HIST_IND -- FCC 4.5 APR 2004 ITR1 SFR 6 CHANGES     
 ,INTERNAL_GL_TYPE		        --Fcc4.0 June2002 related change added Internal_gl_type and system_ac_no
 ,SYSTEM_AC_NO
 ,MIS_UNIT_TYPE          
 ,MIS_UNIT_REF_NO    
 ,ECA_ALLOWED 	-- 29/04/2002 	FCC40 June 2002
 ,ECA_STATUS
 ,EOD_WASH_STATUS -- 18/06/2002  FCC40 June 2002
 ,AUTH_ID	-- FCC4.1 OCT 2002 Retro from mainstream added auth_id..
,RECV_ORIG_AC_NO   --23-APR-2003 FCC 4.2 APR 2003 CHANGES for ITR1 SFR NO 611 deleteion of the contract was not deleting  the receivable
--
--FCC 4.3 AUG 2003 GAAP core Changes start
--
,GAAP_INDICATOR --FCC 4.3 AUG 2003 GAAP CORE CHANGES END
,NETTED_ENTRY --FCC 4.5 April changes.
,COMBINED_BAL_UPD_ALLOWED /* Added for FCC 4.5 APR 2004 FAST changes */
,accounting_role    ---FCC 4.6 Sep04 Release Changes
-- FLEXCUBE V.CL Release 7.0, Changes, Arun, 09-DEC-2005
 ,PRODUCT_ACCRUAL
 ,GLMIS_UPDATE_FLAG
 ,IB
 ,AML_EXCEPTION
 ,'Loans' AS ACCOUNTING_SYSTEM --OBCL_14.4_Payment_Handoff Changes 
  ,PRODUCT --Bug#36799781
-- FLEXCUBE V.CL Release 7.0, Changes, Arun, 09-DEC-2005, END
	--Bug#36820658 Start
	,'P' HANDOFF_STATUS,
	EXT_SYS_UNIQUE_REF_NO,
	RETRY_COUNT
	--Bug#36820658 End	
  ,EXT_AC_NO --Bug#37184103	
 FROM
 oltbs_history
 --OBCL_14.4_Payment_Handoff Changes Starts
 UNION ALL
  SELECT  -- CITIPLC Added Txn Count
      --OBCL_14.4_SGEN_Acc_Entry Changes Starts
      --b.contract_ref_no AS TRN_REF_NO
      TRN_REF_NO
      --OBCL_14.4_SGEN_Acc_Entry Changes Ends
     , AC_ENTRY_SR_NO
    /* ,b.latest_event_seq_no as EVENT_SR_NO --OBCL_14.4_SGEN_Acc_Entry Changes	
     ,NVL( (SELECT lg.event_code
         FROM oltb_contract_event_log lg
         WHERE lg.contract_ref_no = b.contract_ref_no
          AND  lg.event_seq_no  = b.latest_event_seq_no
          AND ROWNUM <=1
          ),'NA') AS event_code*/
      ,EVENT_SR_NO
      ,event AS event_code
      --OBCL_14.4_SGEN_Acc_Entry Changes Ends
     , AC_BRANCH
     , AC_NO
     , AC_CCY
     ,NULL AS CATEGORY
     , DRCR_IND
     , TRN_CODE
     ,FCY_AMOUNT         
     , EXCH_RATE
     , LCY_AMOUNT
     , trunc(TRN_DT) AS TRN_DT --Trn date not sent it from OBPM
     , VALUE_DT
     , VALUE_DT AS TXN_INIT_DATE
     ,AMOUNT_TAG
     ,NULL AS RELATED_ACCOUNT
     ,NULL AS RELATED_CUSTOMER
     ,NULL AS RELATED_REFERENCE
     ,NULL AS MIS_HEAD
     ,NULL AS MIS_FLAG
     ,NULL AS INSTRUMENT_CODE
     ,NULL AS BANK_CODE
     ,NULL AS BALANCE_UPD
     ,NULL AS AUTH_STAT
     ,NULL AS MODULE
     ,NULL AS CUST_GL
     ,'P' AS DLY_HIST
 -- USDFBME 29/9
     ,NULL AS FINANCIAL_CYCLE
     ,NULL AS PERIOD_CODE
     ,NULL AS BATCH_NO
     ,NULL AS USER_ID
     ,NULL AS CURR_NO
     ,NULL AS PRINT_STAT
-- CITIPLC Added Txn Count
     ,NULL AS TRANSACTION_COUNT
     ,NULL AS CUSTOM_REF_NO
     ,NULL AS INTERFACE_REF_NO
 -- FCC 38 Retro (SFR 502) changes
     ,NULL AS CUSTOMER_REF_NO
     ,NULL AS HIDE_TXN_IN_STMT 	--Fcc39 related change
     ,NULL AS PNL_HIST_IND -- FCC 4.5 APR 2004 ITR1 SFR 6 CHANGES
     ,NULL AS INTERNAL_GL_TYPE	--Fcc4.0 June2002 related change added Internal_gl_type and system_ac_no
     ,NULL AS SYSTEM_AC_NO
     ,NULL AS MIS_UNIT_TYPE
     ,NULL AS MIS_UNIT_REF_NO
     ,NULL AS ECA_ALLOWED 	-- 29/04/2002 	FCC40 June 2002
     ,NULL AS ECA_STATUS
     ,NULL AS EOD_WASH_STATUS   -- 18/06/2002  FCC40 June 2002
     ,NULL AS AUTH_ID	-- FCC4.1 OCT 2002 Retro from mainstream  added auth_id
     ,NULL AS RECV_ORIG_AC_NO   --23-APR-2003 FCC 4.2 APR 2003 CHANGES for ITR1 SFR NO 611 deleteion of the contract was not deleting  the receivable
     --
     --FCC 4.3 AUG 2003 GAAP core Changes start
     --
     ,NULL AS GAAP_INDICATOR--FCC 4.3 AUG 2003 GAAP CORE CHANGES END
     ,NULL AS NETTED_ENTRY --FCC 4.5 APril changes.
     ,NULL AS COMBINED_BAL_UPD_ALLOWED /* Added for FCC 4.5 APR 2004 FAST changes */
     ,NULL AS accounting_role		---FCC 4.6 Sep04 Release Changes
-- FLEXCUBE V.CL Release 7.0, Changes, Arun, 09-DEC-2005
 ,NULL AS PRODUCT_ACCRUAL
 ,NULL AS GLMIS_UPDATE_FLAG
 ,NULL AS IB
 ,NULL AS AML_EXCEPTION
 ,'Payments' AS ACCOUNTING_SYSTEM
 ,NULL AS PRODUCT --Bug#36799781
	--Bug#36820658 Start	 
 	,NULL AS HANDOFF_STATUS,
	NULL AS EXT_SYS_UNIQUE_REF_NO,
	NULL AS RETRY_COUNT
	--Bug#36820658 End	
  ,NULL AS EXT_AC_NO --Bug#37184103
  FROM 
  --OBCL_14.4_SGEN_Acc_Entry Changes Starts
  --OLTB_PMT_DAILY_LOG_AC a
   OLTB_EXT_DAILY_LOG_AC a
  /*JOIN 
  (SELECT contract_ref_no ,latest_event_seq_no ,pmnt_txn_ref
    FROM oltb_req_pmntmaster
    GROUP BY contract_ref_no ,latest_event_seq_no ,pmnt_txn_ref
    ) b 
    ON (a.pmt_trn_ref = b.pmnt_txn_ref) */
    --OBCL_14.4_SGEN_Acc_Entry Changes Ends
 --OBCL_14.4_Payment_Handoff Changes Ends	
/
create or replace synonym olvws_all_ac_entries for olvw_all_ac_entries
/
