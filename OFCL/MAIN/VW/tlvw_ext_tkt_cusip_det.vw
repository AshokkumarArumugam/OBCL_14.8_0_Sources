CREATE OR REPLACE VIEW tlvw_ext_tkt_cusip_det AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: tlvw_ext_tkt_cusip_det.VW
**
** Module	: TL
**
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
     -------------------------------------------------------------------------------------------------------
     CHANGE HISTORY

    **Changed By         : Navoneel Nandan
    **Changed On         : 18-Sep-2020
    **Change Description : Added Product Code in the select list
    **Search String      : OBCL_14.4_Account_Restriction 
     
     -------------------------------------------------------------------------------------------------------
*/
(
SELECT	distinct m.ticket_id, m.cusip_no, m.Counterparty,c.contract_ref_no
,M.PRODUCT_CODE--OBCL_14.4_Account_Restriction
FROM	tltbs_contract_master m, oltbs_contract c
WHERE	m.contract_ref_no = c.contract_ref_no
AND	m.version_no = c.latest_version_no
AND	m.deal_type = 'P'
AND	m.buy_sell = 'S'
AND NOT EXISTS (SELECT	1
		FROM	tltms_position_identifier
		WHERE	position_identifier = m.counterparty
		AND	record_stat = 'O'
		AND	auth_stat = 'A'
		)
AND	m.internal_trade = 'N'
--17-APR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol1 Tag07 changes starts commenting
/*
AND NOT EXISTS (SELECT	1
		FROM	tltbs_ls_interface_browser
		WHERE	trade_ref_no = m.contract_ref_no
		AND	cusip_no = m.cusip_no
		AND	event_seq_no = c.latest_event_seq_no
		AND	processing_status='P'
		)
*/
--17-APR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol1 Tag07 changes ends commenting
)
/