CREATE OR REPLACE FORCE VIEW ol_lnvw_contract_summary ( CONTRACT_REF_NO,
 BRANCH, MODULE_CODE, PRODUCT, CONTRACT_STATUS,AUTH_STATUS,
 COUNTERPARTY,CUST_NAME --Bug#34014963
 ,SYND_AMOUNT, CURRENCY,
 FACILITY_START_DATE, FACILITY_END_DATE, /* Made facility_start_date insted of start_date and facility_end_date insted of end_date
                                            by Mithilesh for FLEXCUBE V.CL Release 7.0 ITR1 SFR#56 for displaying Value_date and Maturity_date */
 USER_REF_NO,NO_OF_TRANCHE,NO_OF_DRAWDOWN,SHORT_NAME,DEPARTMENT_CODE, TREASURY_SOURCE,
 --19-JUN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16856 changes start
 --customer_no, admin_id) AS (
 customer_no, admin_id,dt_deal) AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: ol_lnvw_contract_summary.VW
**
** Module      : Syndication Loans and Commitments
**
**This source is part of the Oracle Banking Corporate Lending  Software Product. 
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
or otherwise, translated in any language or computer language, without the prior written permission 
of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
/*-----------------------------------------------------------------------------------------------
Change History 
20-APR-2006 Flexcube V.CL Release 7.0 Backoffice Related Changes,Darshana
03-Aug-2007 FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-LS-76:
customer_no and admin_id have been added
19-JUN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16856 changes,New field dt_deal Id has been added.
	
	Changed By         : Narendra Dhaker
	Date               : 20-May-2021
	Change Description : Product Access restriction
	Search String      : Product Access restriction
	
	Changed By         : Narendra Dhaker
	Date               : 11-April-2022
	Change Description : SUMMARY SCREENS LOV MISSING CUSTOMER NAMES
	Search String      : Bug#34014963
-----------------------------------------------------------------------------------------------
*/
(
 --19-JUN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16856 changes end
 SELECT   a.contract_ref_no,
          a.branch,
          a.module_code,
          a.product_code  product,
	    a.contract_status,
          a.auth_status,
          b.counterparty,
		  c.customer_name1 cust_name,  --Bug#34014963
          b.amount synd_amount,
          b.currency,
          b.facility_start_date,		--Made facility_start_date insted of start_date by Mithilesh for FLEXCUBE V.CL Release 7.0 ITR1 SFR#56 for displaying Value_date
          b.facility_end_date,		--Made facility_end_date insted of end_date by Mithilesh for FLEXCUBE V.CL Release 7.0 ITR1 SFR#56 for displaying Maturity_date
          a.user_ref_no,
          b.no_of_tranches_allowed    no_of_tranche,
          b.no_of_drawdowns_allowed no_of_drawdown,
          c.short_name,				-- FLEXCUBE V.CL Release 7.0 ITR1 SFR 10 short_name added
	  a.DEPARTMENT_CODE,	--CITIUS OPS,Retro as part of Flexcube V CL Release 7.1 Changes 
	  a.TREASURY_SOURCE,	--Flexcube V.CL Release 7.0,Backoffice Related Changes,Darshana
	  c.customer_no,
	  d.admin_id
	  --19-JUN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16856 changes start
	  ,(select field_val 
	  from cstms_udf_vals
	  where  function_id = 'LNDCOMNT'
	  and    rec_key     =  a.contract_ref_no||'~'
	  and    field_name  = 'DT_Deal') as dt_deal
	  --19-JUN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16856 changes end
 FROM     oltbs_contract a,
          lbtbs_syndication_master b,
          oltms_customer c,		-- FLEXCUBE V.CL Release 7.0 ITR1 SFR 10 short_name added
          lbtbs_syndication_preference d --FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-LS-76
 WHERE    a.contract_ref_no = b.contract_ref_no  AND
          a.latest_version_no = b.version_no  AND
          a.module_code IN ('FC')   AND 
	  b.counterparty = c.customer_no		-- FLEXCUBE V.CL Release 7.0 ITR1 SFR 10 short_name added
AND	  d.contract_ref_no = b.contract_ref_no
AND	  d.version_no = b.version_no
          --AND a.latest_event_seq_no = b.event_seq_no  FCC 4.4 Dec 2003 ITR2 SFR 156 change
----Product Access restriction - Start
and exists (Select 1
	 From OLVW_USER_ACCESS_PRODUCTS
	 Where PRODUCT_CODE = a.product_code --OBCL_14.8_CE_Length_Changes
   AND USER_ID = global.user_id)
--Product Access restriction - End
          )
/
CREATE OR REPLACE SYNONYM ol_lnvws_contract_summary  FOR ol_lnvw_contract_summary 
/