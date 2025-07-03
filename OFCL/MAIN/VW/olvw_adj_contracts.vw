CREATE OR REPLACE FORCE VIEW olvw_adj_contracts
(
contract_ref_no, 
participant_id, 
participant_name,  --07-JUL-2011 Flexcube V.CL Release 7.9, FS Vol2 Tag 10 ITR1 SFR#131 Changes
borrower_ref_no, 
cusip_no, 
firm_acct_mnemonic,--Flexcube V.CL Release 7.10 FS Tag14 changes
facility_name, 
module_code, 
branch
)
AS
/*-------------------------------------------------------------------------------------- 
**  
**  File Name :olvw_adj_contracts.VW 
**  
**  Module    :LD-Loans and Deposits
**  
**  This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
---------------------------------------------------------------------------------------
*/
SELECT	contract_ref_no, 
participant_id, 
participant_name,  --07-JUL-2011 Flexcube V.CL Release 7.9, FS Vol2 Tag 10 ITR1 SFR#131 Changes
borrower_ref_no, 
cusip_no, 
firm_acct_mnemonic,--Flexcube V.CL Release 7.10 FS Tag14 changes
facility_name, 
module_code, 
branch
FROM 
	(
		(
			SELECT	
			c.contract_ref_no, 
			'' participant_id, 
			'' participant_name, --07-JUL-2011 Flexcube V.CL Release 7.9, FS Vol2 Tag 10 ITR1 SFR#131 Changes
			'' borrower_ref_no, 
			ld.cusip_no cusip_no,
			'' firm_acct_mnemonic,--Flexcube V.CL Release 7.10 FS Tag14 changes
			ld.facility_name facility_name, 
			c.module_code, 
			c.branch
			FROM	
			oltbs_contract_master ld, 
			oltbs_contract c
			WHERE	ld.contract_ref_no	= c.contract_ref_no
			AND	ld.version_no		= c.latest_version_no
			AND	c.contract_status	IN ('A', 'L')
			AND	c.auth_status		= 'A'
			AND	c.product_type		<> 'D'
			--18-MAY-2012 Flexcube V.CL Release 7.11,FS Volume-01 Tag06 Changes Starts
			--AND	c.module_code		= 'OL'
			AND	c.module_code		IN ('OL','LB')
			--18-MAY-2012 Flexcube V.CL Release 7.11,FS Volume-01 Tag06 Changes Ends
		)		
		UNION ALL		
		(
			SELECT	cl.contract_ref_no, 
			s.counterparty participant_id, 
			(select customer_name1 from oltms_customer where customer_no = s.counterparty) participant_name,  --07-JUL-2011 Flexcube V.CL Release 7.9, FS Vol2 Tag 10 ITR1 SFR#131 Changes
			s.borrower_ref_no borrower_ref_no, 
			f.cusip_no cusip_no, 
			'' firm_acct_mnemonic,--Flexcube V.CL Release 7.10 FS Tag14 changes
			f.facility_name facility_name, 
			cl.module_code, 
			cl.branch
			FROM	oltbs_contract cl, lbtbs_part_proc_stat s, (
										SELECT	cm.contract_ref_no, cm.cusip_no, cm.facility_name
										FROM	oltbs_contract_master cm, oltbs_contract cc
										WHERE	cm.contract_ref_no	= cc.contract_ref_no
										AND	cm.version_no		= cc.latest_version_no
										AND	cc.contract_status	IN ('A', 'L')
										AND	cc.auth_status		='A'
										AND	cc.product_type		IN ('C', 'L')
										AND	cc.module_code		= 'LB'
									    ) f
			WHERE	cl.contract_ref_no	= s.participant_ref_no
			AND	s.borrower_ref_no	= f.contract_ref_no
			AND	cl.contract_status	IN ('A', 'L')
			AND	cl.auth_status		= 'A'
			AND	cl.module_code		= 'LP'
		)			
		UNION ALL
		(
			SELECT	
			ct.contract_ref_no, 
			'' participant_id, 
			'' participant_name,  --07-JUL-2011 Flexcube V.CL Release 7.9, FS Vol2 Tag 10 ITR1 SFR#131 Changes
			'' borrower_ref_no, 
			lt.cusip_no cusip_no,
			--Flexcube V.CL Release 7.10 FS Tag14 change:start
			(select firm_acct_mnemonic from tltms_portfolio where portfolio = (select portfolio from tltms_position_identifier where position_identifier = lt.position_identifier))firm_acct_mnemonic,
			--Flexcube V.CL Release 7.10 FS Tag14 change:end
			'' facility_name, ct.module_code, ct.branch
			FROM	tltbs_position_contract lt, oltbs_contract ct
			WHERE	lt.contract_ref_no	= ct.contract_ref_no
			--AND	lt.event_seq_no		= ct.latest_event_seq_no -- 07-JUL-2011 Flexcube V.CL Release 7.9, FS Vol2 Tag 10 ITR1 SFR#131 Changes
			AND	ct.contract_status	IN ('A', 'L')
			AND	ct.auth_status		= 'A'
			AND	ct.module_code		= 'TL'
		)
	)
adj_cont
ORDER BY module_code, contract_ref_no
/
CREATE OR REPLACE SYNONYM olvws_adj_contracts FOR olvw_adj_contracts
/