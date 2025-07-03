CREATE OR REPLACE FORCE VIEW lbvw_part_position_summary
(contract_ref_no,participant,start_date,end_date,participant_name,amount,asset_ratio,event_code,event_seq_no,
event_value_date,branch, 
contract_ccy, borrower, tranche_ref_no  --Bug#36219426:Added
)

AS
/*-------------------------------------------------------------------------------------- 
**  
**  File Name :lbvw_part_position_summary.VW 
**  
**  Module    :LS-Loan Syndication and commitments
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
---------------------------------------------------------------------------------------
*/
/*
17-OCT-2011 CITIUS-LS#11529, added synonym
21-DEC-2011 CITIUS-LS#12196 chages, to select the proper amount for the corresponding event.
06-JAN-2012 CITIUS-LS#12271 Changes,Done to pick values for PRAM as well.
12-MAR-2012 Flexcube V.CL Release 7.10, CITIUS Retro, TILL#12871 Changes - PRCH event should be removed from view.
	**Changed By         : Jayaram
    **Date               : 09-Feb-2024
    **Change Description : Added new columns in the view (contract_ccy, borrower, tranche_ref_no) to display in summary screen
    **Search String      : Bug#36219426
*/
(SELECT a.contract_ref_no,d.counterparty,b.value_date,b.maturity_date,(
SELECT customer_name1
FROM oltms_customer
WHERE customer_no=d.counterparty)participant_name,
--21-DEC-2011 CITIUS-LS#12196 chages Start
--06-JAN-2012 CITIUS-LS#12271 Changes,Start
--(select amount from oltbs_contract_master WHERE contract_ref_no= a.contract_ref_no and event_seq_no=c.event_seq_no)
DECODE(c.event_code,'PRAM',(SELECT amount
                            FROM oltbs_contract_master
                            WHERE contract_ref_no= a.contract_ref_no
                            AND event_seq_no =(SELECT MAX (event_seq_no)
                                               FROM oltbs_contract_master
                                               WHERE contract_ref_no=a.contract_ref_no
                                               AND  event_seq_no < c.event_seq_no
                                              )
                           ),
				(	
					SELECT 	amount 
					FROM 	oltbs_contract_master 
					WHERE 	contract_ref_no= a.contract_ref_no 
					AND 	event_seq_no=c.event_seq_no
				)
	)
--06-JAN-2012 CITIUS-LS#12271 Changes,End
 Amount,
--b.amount,
--21-DEC-2011 CITIUS-LS#12196 chages End
lppkss_services.fn_get_event_asset_ratio(a.contract_ref_no,d.counterparty,c.event_seq_no),
c.event_code,
c.event_seq_no,
--06-JAN-2012 CITIUS-LS#12271 Changes,Start
--lppkss_services.fn_get_event_value_date(a.contract_ref_no,d.counterparty,c.event_seq_no),
lppkss_services.fn_get_event_value_date(a.contract_ref_no,c.event_code,c.event_seq_no),
--06-JAN-2012 CITIUS-LS#12271 Changes,End
a.branch,
a.contract_ccy, a.counterparty borrower, b.Tranche_Ref_No --Bug#36219426:Added
FROM oltbs_contract a,
oltbs_contract_master b,
oltbs_contract_event_log c,
lbtbs_part_proc_stat d
WHERE a.contract_ref_no=b.contract_ref_no 
AND a.latest_version_no=b.version_no 
AND a.contract_ref_no=c.contract_ref_no 
AND d.borrower_ref_no=a.contract_ref_no 
--21-DEC-2011 CITIUS-LS#12196 chages Start
--AND c.event_code in ('BOOK','INIT','PRAM','VAMI','VAMB','PAMI','PAMB','PRCH')
--12-MAR-2012 Flexcube V.CL Release 7.10, CITIUS Retro, TILL#12871 Changes starts
--AND c.event_code in ('BOOK','PRAM','VAMI','PAMI','PRCH')
AND c.event_code in ('BOOK','PRAM','VAMI','PAMI')
--12-MAR-2012 Flexcube V.CL Release 7.10, CITIUS Retro, TILL#12871 Changes ends
--21-DEC-2011 CITIUS-LS#12196 chages End
AND a.module_code='LB'
GROUP BY a.contract_ref_no,
d.counterparty,
b.amount,
b.value_date,
b.maturity_date,
c.event_code,
a.branch,
c.event_seq_no, 
a.contract_ccy, a.counterparty, b.tranche_ref_no  --Bug#36219426:Added
)
ORDER BY contract_Ref_no
/
--CITIUS-LS#11529 Starts
PROMPT Creating synonym to lbvw_part_position_summary
--CITIUS-LS#11529 Ends
CREATE OR REPLACE SYNONYM lbvws_part_position_summary FOR lbvw_part_position_summary
/