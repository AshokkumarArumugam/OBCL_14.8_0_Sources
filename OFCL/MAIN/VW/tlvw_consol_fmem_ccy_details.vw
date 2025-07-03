CREATE OR REPLACE FORCE VIEW tlvw_consol_fmem_ccy_details 
AS 
/*----------------------------------------------------------------------------------------
**
** File Name    : tlvw_consol_fmem_ccy_details.vw
**
** Module       : LT-SECONDARY LOAN TRADING
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
----------------------------------------------------------------------------------------
*/
/* CHANGE_HISTORY
13-OCT-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS vol1 Tag07 SLT Combined Ticket settlement changes, created this view
20-OCT-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag07 IUT#99 changes. total Sum based on buy/sell.
*/
	SELECT	c.consol_ticket_ref_no,
				b.counterparty,
				d.currency,
				--20-OCT-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag07 IUT#99 changes start
				/*
				SUM(d.SETTL_AMOUNT)				AS SETTL_AMOUNT,
				SUM(d.WAIVER_AMOUNT)				AS WAIVER_AMOUNT,
				SUM(d.DCF_AMOUNT)					AS DCF_AMOUNT,
				SUM(d.BFF_AMOUNT)					AS BFF_AMOUNT,
				SUM(d.ASSIGN_FEE_AMOUNT)		AS ASSIGN_FEE_AMOUNT,
				SUM(d.AMEND_FEE_AMOUNT)		AS AMEND_FEE_AMOUNT,
				SUM(d.ADHOC_SELLER_AMOUNT)	AS ADHOC_SELLER_AMOUNT,
				SUM(d.ADHOC_BUYER_AMOUNT)	AS ADHOC_BUYER_AMOUNT
				*/
				SUM(DECODE(b.buy_sell,'B',d.SETTL_AMOUNT,-d.SETTL_AMOUNT))								AS SETTL_AMOUNT,
				SUM(DECODE(b.buy_sell,'B',d.WAIVER_AMOUNT,-d.WAIVER_AMOUNT))							AS WAIVER_AMOUNT,
				SUM(DECODE(b.buy_sell,'B',d.DCF_AMOUNT,-d.DCF_AMOUNT))									AS DCF_AMOUNT,
				SUM(DECODE(b.buy_sell,'B',d.BFF_AMOUNT,-d.BFF_AMOUNT))										AS BFF_AMOUNT,
				SUM(DECODE(b.buy_sell,'B',d.ASSIGN_FEE_AMOUNT,-d.ASSIGN_FEE_AMOUNT))			AS ASSIGN_FEE_AMOUNT,
				SUM(DECODE(b.buy_sell,'B',d.AMEND_FEE_AMOUNT,-d.AMEND_FEE_AMOUNT))				AS AMEND_FEE_AMOUNT,
				SUM(DECODE(b.buy_sell,'B',d.ADHOC_SELLER_AMOUNT,-d.ADHOC_SELLER_AMOUNT))	AS ADHOC_SELLER_AMOUNT,
				SUM(DECODE(b.buy_sell,'B',d.ADHOC_BUYER_AMOUNT,-d.ADHOC_BUYER_AMOUNT))		AS ADHOC_BUYER_AMOUNT
				--20-OCT-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag07 IUT#99 changes end
	FROM	oltbs_contract a,
				tltbs_contract_master b,
				tltbs_consol_trade_detail c,
				tltbs_fmem_ccy_details d
	WHERE	a.contract_ref_no		= b.contract_reF_no
	AND		a.latest_version_no	= b.version_no
	AND		c.trade_reF_no			= b.contract_ref_no
	AND		c.settlement_reqd		= 'Y'
	AND		d.contract_ref_no		= c.trade_reF_no
	AND		d.event_seq_no			= (
														SELECT	MAX(event_seq_no)
														FROM	tltbs_fmem_ccy_details
														WHERE	contract_reF_no	= d.contract_ref_no
														AND		currency				= d.currency
													)
	GROUP BY c.consol_ticket_ref_no,b.counterparty,d.currency
/
CREATE OR REPLACE SYNONYM tlvws_consol_fmem_ccy_details FOR tlvw_consol_fmem_ccy_details
/