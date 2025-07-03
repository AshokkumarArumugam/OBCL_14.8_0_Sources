CREATE OR REPLACE FORCE VIEW tlvw_trade_summary
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name : tlvw_trade_summary.VW
** Module	 : LT
**
This source is part of the Oracle Banking Corporate Lending  Software Product. 
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
Change History
04-JUN-2008 FLEXCUBE V.CL Release 7.4 ,New Unit Developed for Trade Summary

	Changed By         : Narendra Dhaker
	Date               : 26-May-2021
	Change Description : Product Access restriction
	Search String      : Product Access restriction
	
*/
SELECT	b.contract_status
,	b.auth_status
,	b.branch
,	a.contract_ref_no
,	a.cusip_no
/* ----Atish added start*/
-----added ticket id,position_identifier,portfolio as part of allowing to query on the basis of these fields in the summary screen------
,	a.ticket_id
,	a.position_identifier
,	a.portfolio
/*----------Atish added end-------------*/
,	a.counterparty
--,	b.department_code
,	a.desk_code
,	a.buy_sell
,	a.deal_type
,	a.currency
,	a.trade_date
,	a.actual_settl_date
,       a.expt_settl_date
,       a.trade_type
,       a.swap_id
,       a.swap_counterparty
FROM	tltbs_contract_master a
,	oltbs_contract        b
WHERE	a.contract_ref_no = b.contract_ref_no
AND	a.version_no      = b.latest_version_no
AND	b.module_code     = 'TL'
			   ----Product Access restriction - Start
and exists (Select 1
	 From OLVW_USER_ACCESS_PRODUCTS
	 Where PRODUCT_CODE = b.product_code --OBCL_14.8_CE_Length_Changes
   AND USER_ID = global.user_id)
--Product Access restriction - End
/
CREATE OR REPLACE SYNONYM tlvws_trade_summary FOR tlvw_trade_summary
/