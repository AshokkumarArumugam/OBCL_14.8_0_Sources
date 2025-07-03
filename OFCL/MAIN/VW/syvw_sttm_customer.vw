CREATE OR REPLACE VIEW syvw_sttm_customer AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : syvw_sttm_customer.VW
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
08-Mar-2018	Masking changes OBCL14_1_MASK.

  **Changed By         : Aishwarya
  **Date               : 13-Apr-2021
  **Change Description : Relationship Pricing - Added RP_CUSTOMER column to indicate the customer is RP enabled or not
  **Search String      : OBCL_14.5_RP_Integration_Changes
  
  **Changed By         : Aishwarya
  **Date               : 16-Apr-2021
  **Change Description : Removing EXT_CUSTCIF_UPD in view
*/
SELECT CUSTOMER_NO,
SIC_CODE,
ADVERSE_STATUS_IND,
CLASSIFICATION,
CUST_TAX_GROUP,
DEPARTMENT_CODE,
CUST_INT_GROUP,
GFCID,
OBLIGOR_RISK_RATING,
WATCH_LIST_CUSTOMER,
WATCH_LIST_REMARKS,
DUAL_AUTH_FOR_ASSIGNMENT,
EG_NUMBER,
OR_RATING,
MAKER_ID,
MAKER_DT_STAMP,
CHECKER_ID,
CHECKER_DT_STAMP,
MOD_NO,
ONCE_AUTH,
RECORD_STAT,
AUTH_STAT,
CUST_GROUP,
CUSTOMER_NAME2,
PRIMARY_BIC,
SSN,
DEFAULT_MEDIA,
ATTENTION,
PAST_DUE_FLAG,
LOCAL_BRANCH,
ZIP_CODE,
CLUSTERID,
MEI_CODE,
CUSTOMER_CATEGORY,
IS_FORGOTTEN,
HASACTIVECONTRACT,
LASTACTIVITYDATE,
CIF_STATUS,
CIF_STATUS_SINCE,
LOCAL_GROUP_STATUS_PROCESSING,
EXT_GROUP_STATUS_PROCESSING,
RP_CUSTOMER --OBCL_14.5_RP_Integration_Changes
FROM SYTM_STTM_CUSTOMER
/
CREATE OR REPLACE SYNONYM syvws_sttm_customer FOR syvw_sttm_customer 
/