CREATE OR REPLACE VIEW tlvw_settlement_summary 
AS
/*----------------------------------------------------------------------------------------
**
** File Name    : tlvw_settlement_summary.vw
**
** Module       : TL-SECONDARY LOAN TRADING
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
10-APR-2017 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS vol1 Tag06 SLT TRADE SETTLEMENT, created this view
	Changed By         : Jayaram N
	Date               : 25-Jun-2020
	Change Description : SLT:Base_issues - added Cusip no in TLDSETTL summary screen
	Search String      : OBCL14.4:SFR#29959798:Base_issues
	
	Changed By         : Jayaram N
	Date               : 12-Apr-2022
	Change Description : TLSSETTL - DISPLAYING FUTURE DATED UNAUTHORIZED RECORDS AS AUTHORIZED.
	Search String      : Bug#34062211
*/
SELECT	a.CONTRACT_REF_NO,
b.counterparty
,b.contract_status
--,b.auth_status	--Bug#34062211:Commented
,d.AUTH_STATUS	--Bug#34062211:Added
,b.product_type
,b.user_ref_no
,b.branch
,a.settle_status
,c.cusip_no
FROM	TLTB_SETTLEMENT_MASTER a
,	oltbs_contract b
,   tltbs_contract_master c
,   oltb_contract_event_log d	--Bug#34062211:Added
WHERE	a.contract_ref_no = b.contract_ref_no
and a.contract_ref_no = c.contract_ref_no
and c.Version_No =
             (SELECT Latest_Version_No
                FROM Oltbs_Contract
               WHERE Contract_Ref_No = b.contract_ref_no)
--Bug#34062211:Added Starts here			   
and a.event_seq_no = ( Select max(EVENT_SEQ_NO)
                         from TLTB_SETTLEMENT_MASTER
                        where Contract_Ref_No = a.contract_ref_no )
and d.event_seq_no = b.LATEST_EVENT_SEQ_NO
and d.contract_ref_no = b.contract_ref_no	
--Bug#34062211:Added Ends here			   		   
/
CREATE OR REPLACE SYNONYM tlvws_settlement_summary FOR tlvw_settlement_summary
/