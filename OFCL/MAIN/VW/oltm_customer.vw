create or replace view oltm_customer as
/*-----------------------------------------------------------------------------------------------
**
** File Name    : oltm_customer.VW
**
** Module       : OL
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
**
	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
-----------------------------------------------------------------------------------------------
*/
/*
CHANGE HISTORY
08-Mar-2018	Access Group restriction Changes FCUBS_14_1_ACC_GRP 

	**  Changed By         : Narendra Dhaker
	**  Date               : 25-APR-2022
	**  Change Description : CLOSED CIF'S ARE SHOWING IN LOV IN FCDTRONL PARTICIPANT SUBSCREEN                                                                    
	**  Search String      : Bug#34095627
		
	**  Changed By         : Akhila Samson
	**  Date               : 12-JUL-2023
	**  Change Description : Commented the record status condition in “oltm_customer�? view to get the active as well as closed customer details.
	**  Search String      : Bug#35585921
	
*/
Select
co.CUSTOMER_NO,
co.CUSTOMER_TYPE,
co.CUSTOMER_NAME1,
co.ADDRESS_LINE1,
co.ADDRESS_LINE3,
co.ADDRESS_LINE2,
co.ADDRESS_LINE4,
co.COUNTRY,
co.SHORT_NAME,
co.NATIONALITY,
co.LANGUAGE,
co.FROZEN,
co.DECEASED,
co.WHEREABOUTS_UNKNOWN,
NVL(sy.CUSTOMER_CATEGORY,'UNDEFINED') CUSTOMER_CATEGORY,
co.RECORD_STAT,
co.AUTH_STAT,
co.MOD_NO,
co.MAKER_ID,
co.MAKER_DT_STAMP,
co.CHECKER_ID,
co.CHECKER_DT_STAMP,
co.ONCE_AUTH,
sy.PAST_DUE_FLAG,
sy.DEFAULT_MEDIA,
sy.CUSTOMER_NAME2,
co.pincode zip_code,
sy.ATTENTION,
sy.CUST_GROUP,
sy.SSN,
sy.PRIMARY_BIC,
sy.OR_RATING,
sy.WATCH_LIST_REMARKS,
sy.WATCH_LIST_CUSTOMER,
sy.OBLIGOR_RISK_RATING,
sy.GFCID,
sy.CUST_INT_GROUP,
sy.DEPARTMENT_CODE,
sy.CUST_TAX_GROUP,
sy.CLASSIFICATION,
sy.ADVERSE_STATUS_IND,
sy.SIC_CODE,
sy.local_branch,
sy.MEI_CODE,
sy.CLUSTERID,
sy.dual_auth_for_assignment,
sy.eg_number,
co.access_group --DIJ
From STTMS_CORE_CUSTOMER co,
SYTM_STTM_CUSTOMER sy
where co.customer_no = sy.customer_no(+)
--Bug#34095627 Changes Starts
--and co.RECORD_STAT='O' --Bug#35585921
and co.AUTH_STAT='A'
--Bug#34095627 Changes Ends
/
create or replace synonym oltms_customer for oltm_customer
/