CREATE OR REPLACE FORCE VIEW olvw_race_feed
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : olvw_race_feed.VW
**
** Module       : IF - SECONDARY LOAN TRADING
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
**
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
---------------------------------------------------------------------------------------------------
*/
/*---------------------------------CHANGE HISTORY-----------------------------------------------
12-MAR-2012 Flexcube V.CL Release 7.10, CITIUS Retro, TILL#12710 : New unit created for Flexcube to Race feed
21-DEC-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#15412 Jira -150080-6878 Fit code changes
*/
SELECT			
	m.firm_account_mnemonic,
	(	
		SELECT 	ims_account 
		FROM 	tltms_firmac_mcc_detail x 
		WHERE 	x.firm_acct_mnemonic =	m.firm_account_mnemonic
	)firm_account_number,
	m.legal_entity,	   
	(
		SELECT 	sub_strategy_code 
		FROM 	tltms_firmac_mcc_detail x
		WHERE 	x.firm_acct_mnemonic =	m.firm_account_mnemonic
	)sub_strategy,
	m.cusip,
	m.fit_code,
	m.product_currency,
	m.net_quantity,
	m.run_date
FROM
	(
		SELECT 	a.expense_code firm_account_mnemonic,
				'006' legal_entity,
				a.cusip_no cusip,
				--21-DEC-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#15412 Change start
				--'999' fit_code,
				'456' fit_code,
				--21-DEC-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#15412 Change end
				global.application_date run_date,
				trade_ccy product_currency,
				sum(nvl(closed_settled_position,0)) + sum(nvl(closed_unsettled_position,0)) net_quantity
		FROM   	TLTB_CURRENT_DATED_BALANCE a,
				TLTM_PORTFOLIO b
		WHERE  	a.position_identifier = b.portfolio
		AND	   	a.expense_code		  = b.firm_acct_mnemonic
		AND	   	EXISTS
				 (
				  SELECT 1 
				  FROM	 tltms_firmac_mcc_detail c,
						 tltms_strategy_mapping d
				  WHERE  b.firm_acct_mnemonic	 = 	c.firm_acct_mnemonic
				  AND	 c.mcc		 			 = 	d.mcc
				  AND	 NVL(cfpi,'N')	 		 = 	'Y'
				 )
		GROUP BY cusip_no,a.expense_code, trade_ccy	
	) m
/
CREATE OR REPLACE SYNONYM olvws_race_feed FOR olvw_race_feed
/