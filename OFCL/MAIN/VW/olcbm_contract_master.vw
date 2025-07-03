CREATE OR REPLACE force VIEW olcbm_contract_master
(CONTRACT_REF_NO              ,
USER_REF_NO                  ,
BRANCH                       ,
PRODUCT_CODE                 ,
COUNTERPARTY                 ,
CONTRACT_STATUS              ,
AUTH_STATUS                  ,
PRODUCT_TYPE                 ,
MODULE_CODE                  ,
USER_DEFINED_STATUS          ,
CONTRACT_CCY                 ,
EXTERNAL_REF_NO              ,
CUSTOM_REF_NO                ,
DEPARTMENT_CODE              ,
PAYMENT_METHOD               ,
AMOUNT                       ,
ORIGINAL_START_DATE          ,
BOOKING_DATE                 ,
VALUE_DATE                   ,
MATURITY_TYPE                ,
MATURITY_DATE                ,
REMARKS                      ,
CREDIT_LINE                  ,
SYNDICATION_REF_NO           ,
TRANCHE_REF_NO               ,
BORROWER_REF_NO		     ,
ADMIN_ID                     ,
FACILITY_NAME                ,
CONTRACTUAL_EFFECTIVE_DATE   ,
CONTRACTUAL_MATURITY_DATE    ,
CUSIP_NO                     ,
LC_DRAWDOWN                  ,
LC_TYPE                      ,
PRINCIPAL_LIQUIDATION        ,
REVOLVING_COMMITMENT         ,
TXN_MIS_1  		     ,
TXN_MIS_2            ,       
DEAL_ID				 ,
CUSTOMER_NAME		 
)
AS
/*----------------------------------------------------------------------------------------------------
File Name : olcbm_contract_master.vw
This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
SELECT
	a.CONTRACT_REF_NO              ,  
	d.USER_REF_NO                  ,  
	d.BRANCH                       , 	
	d.PRODUCT_CODE                 ,
	d.COUNTERPARTY                 ,
	d.CONTRACT_STATUS              ,
	d.AUTH_STATUS                  ,
	d.PRODUCT_TYPE                 ,
	d.MODULE_CODE                  ,
	d.USER_DEFINED_STATUS          ,
	d.CONTRACT_CCY                 ,
	d.EXTERNAL_REF_NO              ,
	d.CUSTOM_REF_NO                ,
	d.DEPARTMENT_CODE              ,
	a.PAYMENT_METHOD               ,  
	a.AMOUNT                       ,  
	a.ORIGINAL_START_DATE          ,  
	a.BOOKING_DATE                 ,  
	a.VALUE_DATE                   ,  
	a.MATURITY_TYPE                ,  
	a.MATURITY_DATE                ,  
	a.REMARKS                      ,  
	a.CREDIT_LINE                  ,  
	a.SYNDICATION_REF_NO           ,  
	a.TRANCHE_REF_NO               ,  
	NULL 			       ,--borrower_ref_no
	a.ADMIN_ID                     ,  
	a.FACILITY_NAME                ,  
	a.CONTRACTUAL_EFFECTIVE_DATE   ,  
	a.CONTRACTUAL_MATURITY_DATE    ,  
	a.CUSIP_NO                     ,  
	a.LC_DRAWDOWN                  ,  
	a.LC_TYPE                      ,  
	b.PRINCIPAL_LIQUIDATION        ,          
	b.REVOLVING_COMMITMENT         ,          
	C.TXN_MIS_1  		       	   ,
	C.TXN_MIS_2                    ,
	(
	 SELECT	field_value 
	 FROM 	OLTM_CONTRACT_USERDEF_FIELDS 
	 WHERE	contract_ref_no = d.contract_ref_no
	 AND	version_no		= d.latest_version_no
	 AND	field_name 		= 'DEALID'
	 ) 							   ,
	 (
	  SELECT	customer_name1
	  FROM		oltms_customer
	  WHERE		customer_no = d.counterparty
	 )		
FROM	oltbs_contract_master a		,
	oltbs_contract_preference b	,
	oltbs_class_mapping c		,
	oltbs_contract	d
WHERE	a.CONTRACT_REF_NO = d.CONTRACT_REF_NO
AND	a.VERSION_NO	  = d.LATEST_VERSION_NO
AND	a.CONTRACT_REF_NO = b.CONTRACT_REF_NO
AND	a.VERSION_NO	  = b.VERSION_NO
AND	a.CONTRACT_REF_NO = c.UNIT_REF_NO
UNION
SELECT
	a.CONTRACT_REF_NO              ,  
	d.USER_REF_NO                  ,  
	d.BRANCH                       , 	
	d.PRODUCT_CODE                 ,
	d.COUNTERPARTY                 ,
	d.CONTRACT_STATUS              ,
	d.AUTH_STATUS                  ,
	d.PRODUCT_TYPE                 ,
	d.MODULE_CODE                  ,
	d.USER_DEFINED_STATUS          ,
	d.CONTRACT_CCY                 ,
	d.EXTERNAL_REF_NO              ,
	d.CUSTOM_REF_NO                ,
	d.DEPARTMENT_CODE              ,
	a.PAYMENT_METHOD               ,  
	a.AMOUNT                       ,  
	NULL, --a.ORIGINAL_START_DATE          ,  
	a.BOOKING_DATE                 ,  
	a.VALUE_DATE                   ,  
	NULL, --a.MATURITY_TYPE                ,  
	a.MATURITY_DATE                ,  
	a.REMARKS                      ,  
	NULL		               ,  
	(SELECT SYNDICATION_REF_NO           
	 FROM	oltbs_contract_master
	 WHERE	CONTRACT_REF_NO = a.BORROWER_CONTRACT_REF_NO
	 AND	VERSION_NO	= (
	 			   SELECT	LATEST_VERSION_NO 
	 			   FROM		oltbs_contract
	 			   WHERE	CONTRACT_REF_NO = a.BORROWER_CONTRACT_REF_NO
	 			   )
	),  
	(SELECT TRANCHE_REF_NO           
	 FROM	oltbs_contract_master
	 WHERE	CONTRACT_REF_NO = a.BORROWER_CONTRACT_REF_NO
	 AND	VERSION_NO	= (
	 			   SELECT	LATEST_VERSION_NO 
	 			   FROM		oltbs_contract
	 			   WHERE	CONTRACT_REF_NO = a.BORROWER_CONTRACT_REF_NO
	 			   )	 
	 ),
	a.BORROWER_CONTRACT_REF_NO     , 
	(SELECT ADMIN_ID           
	 FROM	oltbs_contract_master
	 WHERE	CONTRACT_REF_NO = a.BORROWER_CONTRACT_REF_NO
	 AND	VERSION_NO	= (
	 			   SELECT	LATEST_VERSION_NO 
	 			   FROM		oltbs_contract
	 			   WHERE	CONTRACT_REF_NO = a.BORROWER_CONTRACT_REF_NO
	 			   )	 
	 ),
	(SELECT FACILITY_NAME
	 FROM	oltbs_contract_master
	 WHERE	CONTRACT_REF_NO = a.BORROWER_CONTRACT_REF_NO
	 AND	VERSION_NO	= (
	 			   SELECT	LATEST_VERSION_NO 
	 			   FROM		oltbs_contract
	 			   WHERE	CONTRACT_REF_NO = a.BORROWER_CONTRACT_REF_NO
	 			   )	 
	 ),
	NULL, --a.CONTRACTUAL_EFFECTIVE_DATE   ,  
	NULL, --a.CONTRACTUAL_MATURITY_DATE    ,  
	(SELECT CUSIP_NO
	 FROM	oltbs_contract_master
	 WHERE	CONTRACT_REF_NO = a.BORROWER_CONTRACT_REF_NO
	 AND	VERSION_NO	= (
	 			   SELECT	LATEST_VERSION_NO 
	 			   FROM		oltbs_contract
	 			   WHERE	CONTRACT_REF_NO = a.BORROWER_CONTRACT_REF_NO
	 			   )	 
	 ),
	NULL, --a.LC_DRAWDOWN                  ,  
	NULL, --a.LC_TYPE                      ,  
	NULL, --b.PRINCIPAL_LIQUIDATION        ,          
	NULL, --b.REVOLVING_COMMITMENT         ,          
	C.TXN_MIS_1  		       ,
	C.TXN_MIS_2                ,
	NULL 					   , -- DEAL_ID
	(
	  SELECT	customer_name1
	  FROM		oltms_customer
	  WHERE		customer_no = d.counterparty
	)			
FROM	lptbs_contract_master a		,
	--oltbs_contract_preference b	,
	oltbs_class_mapping c		,
	oltbs_contract	d
WHERE	a.CONTRACT_REF_NO = d.CONTRACT_REF_NO
AND	a.VERSION_NO	  = d.LATEST_VERSION_NO
--AND	a.CONTRACT_REF_NO = b.CONTRACT_REF_NO
--AND	a.VERSION_NO	  = b.VERSION_NO
AND	a.CONTRACT_REF_NO = c.UNIT_REF_NO
/
CREATE OR REPLACE force VIEW CBM_CSTB_AMOUNT_DUE
AS
SELECT
	CONTRACT_REF_NO                ,
	COMPONENT                      ,
	DUE_DATE                       ,
	AMOUNT_DUE                     ,
	AMOUNT_SETTLED                 ,
	INFLOW_OUTFLOW                 ,
	ADJUSTED_AMOUNT                ,
	PAY_RECV_AMOUNT                
FROM	oltbs_amount_due_cs
/
CREATE OR REPLACE force VIEW CBM_CSTB_CONTRACT_EVENT_LOG
AS
SELECT
	CONTRACT_REF_NO                ,
	MAKER_ID                       ,
	MAKER_DT_STAMP                 ,
	CHECKER_ID                     ,
	CHECKER_DT_STAMP               ,
	EVENT_SEQ_NO                   ,
	EVENT_DATE                     ,
	EVENT_CODE                     ,
	CONTRACT_STATUS                ,
	AUTH_STATUS                    
FROM	oltbs_contract_event_log
/
CREATE OR REPLACE force VIEW CBM_LDTB_CONTRACT_ICCF_CALC
AS
SELECT
	CONTRACT_REF_NO                ,
	COMPONENT                      ,
	SCHEDULE_DATE                  ,
	START_DATE                     ,
	END_DATE                       ,
	BASIS_AMOUNT                   ,
	RATE                           ,
	NO_OF_DAYS                     ,
	CALCULATED_AMOUNT              ,
	ICCF_CALC_METHOD               ,
	DAILY_AVERAGE_AMOUNT           
FROM	oltbs_contract_iccf_calc	
/
CREATE OR REPLACE force VIEW CBM_ACVW_ALL_AC_ENTRIES
AS
SELECT
	TRN_REF_NO                      ,       
	EVENT                           ,       
	AC_BRANCH                       ,       
	AC_NO                           ,       
	AC_CCY                          ,       
	DRCR_IND                        ,       
	TRN_CODE                        ,       
	FCY_AMOUNT                      ,       
	EXCH_RATE                       ,       
	LCY_AMOUNT                      ,       
	TRN_DT                          ,       
	VALUE_DT                        ,       
	AMOUNT_TAG                      ,       
	RELATED_ACCOUNT                 ,       
	RELATED_CUSTOMER                ,       
	RELATED_REFERENCE               ,       
	BATCH_NO                        ,       
	USER_ID                                
FROM	olvw_all_ac_entries
/
CREATE OR REPLACE force VIEW CBM_CSTB_AMOUNT_DUE_LD 
( CONTRACT_REF_NO, COMPONENT, DUE_DATE, AMOUNT_DUE, AMOUNT_SETTLED, INFLOW_OUTFLOW, ADJUSTED_AMOUNT, PAY_RECV_AMOUNT ) 
AS 
SELECT
		A.CONTRACT_REF_NO                ,
		A.COMPONENT                      ,
		A.DUE_DATE                       ,
		A.AMOUNT_DUE                     ,
		A.AMOUNT_SETTLED                 ,
		A.INFLOW_OUTFLOW                 ,
		A.ADJUSTED_AMOUNT                ,
		A.PAY_RECV_AMOUNT
FROM	OLTB_AMOUNT_DUE_CS A,
		OLTB_CONTRACT B,
		OLTB_CLASS_MAPPING C
WHERE	A.CONTRACT_REF_NO 		= B.CONTRACT_REF_NO	
AND		A.CONTRACT_REF_NO		= C.UNIT_REF_NO
AND		B.MODULE_CODE 			= 'OL'  -- Originations
AND		B.USER_DEFINED_STATUS 	= 'NORM'  -- Performing 
AND		C.TXN_MIS_2 			= '702'    -- Proof 702
AND		A.DUE_DATE  			< (SELECT TODAY FROM STTMS_DATES WHERE BRANCH_CODE = '000') -- Past Due
AND		(NVL(A.AMOUNT_DUE,0) - NVL(A.AMOUNT_SETTLED,0) - NVL(A.ADJUSTED_AMOUNT,0) - NVL(A.PAY_RECV_AMOUNT,0) ) > 0  --Not fully settled  
/

CREATE OR REPLACE force VIEW CBM_CUSTOMER_NAMES 
( CUSTOMER_NO,CUSTOMER_NAME ) 
AS 
SELECT CUSTOMER_NO,CUSTOMER_NAME1||' '||CUSTOMER_NAME2
FROM   oltm_customer
/

CREATE OR REPLACE force VIEW CBM_SMTB_USER
(USER_ID, USER_NAME)
AS
SELECT USER_ID, USER_NAME FROM SMTB_USER
WHERE RECORD_STAT = 'O' AND AUTH_STAT = 'A'
/