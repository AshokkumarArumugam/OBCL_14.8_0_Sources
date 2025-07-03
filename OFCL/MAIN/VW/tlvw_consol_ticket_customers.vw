CREATE OR REPLACE FORCE VIEW tlvw_consol_ticket_customers 
AS
/*----------------------------------------------------------------------------------------
**
** File Name    : tlvw_consol_ticket_customers.vw
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
13-OCT-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS vol1 Tag06 SLT Combined Ticket settlement changes, created this view
*/	(
		SELECT DISTINCT p.consol_ticket_ref_no,p.agency_id customer,'A' customer_type
		FROM tltbs_consol_trade_detail p
		WHERE p.settlement_reqd = 'Y'
		AND p.agency_id IS NOT NULL
		UNION
		SELECT DISTINCT a.consol_ticket_ref_no,b.counterparty customer,'T' customer_type
		FROM tltbs_consol_trade_detail a,oltbs_contract b
		WHERE a.trade_ref_no = b.contract_ref_no
		AND a.settlement_reqd = 'Y'
	)
/
CREATE OR REPLACE SYNONYM tlvws_consol_ticket_customers FOR tlvw_consol_ticket_customers
/
ALTER VIEW tlvw_consol_ticket_customers
ADD CONSTRAINT PK_LTVW_CONSOL_TICKET_CUST PRIMARY KEY(CONSOL_TICKET_REF_NO,CUSTOMER)
DISABLE NOVALIDATE
/