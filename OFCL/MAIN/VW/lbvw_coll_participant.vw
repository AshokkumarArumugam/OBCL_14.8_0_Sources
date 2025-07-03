CREATE OR REPLACE FORCE VIEW lbvw_coll_participant as
/*-------------------------------------------------------------------------------------- 
**  
**  File Name :lbvw_coll_participant.VW 
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
20-JUN-2011 FLEXCUBE V.CL Release 7.9 VOL2 FS Tag 8 changes  Collateral Participations ,added contract type.
							     Changed the selection of counterparty
26-Jul-2011 Flexcube V.CL Release 7.9 FS Vol2 Tag 08 ITR2#10  backoffice related changes done.
07-DEC-2011 Flexcube V.CL Release 7.9 PLNCITI#35015 New column contract_status added to the view.
28-Dec-2011 Flexcube V.CL Release 7.9 PLNCITI#35030 Changes Modified the select Query.
*/
(Select
d.auth_status
,d.contract_status --07-DEC-2011 Flexcube V.CL Release 7.9 PLNCITI#35015 changes
,a.ls_ref_no
,a.contract_type
,b.cusip_no
--26-Jul-2011 Flexcube V.CL Release 7.9 FS Vol2 Tag 08 ITR2#10 starts
,d.department_code
,d.product_code
,d.branch
--26-Jul-2011 Flexcube V.CL Release 7.9 FS Vol2 Tag 08 ITR2#10 ends
,b.facility_name
,a.contract_ref_no
,(Select avl_collateral_amt
From lbtb_tranche_coll_bal
Where contract_ref_no = a.contract_ref_no
--28-Dec-2011 Flexcube V.CL Release 7.9 PLNCITI#35030 Changes start
--And event_seq_no = d.latest_event_seq_no
And event_seq_no = (Select Max(event_seq_no)
		    From lbtb_tranche_coll_bal
                    Where contract_ref_no = a.contract_ref_no)
--28-Dec-2011 Flexcube V.CL Release 7.9 PLNCITI#35030 Changes end
)avl_collateral_amt
--,b.counterparty
,d.counterparty
From lbtb_tranche_coll_bal a,OLTB_CONTRACT_MASTER b,OLTB_CONTRACT c,OLTB_CONTRACT d
WHERE d.contract_ref_no = a.contract_ref_no
AND a.ls_ref_no = b.contract_ref_no
AND a.event_seq_no = 1
AND c.contract_ref_no = b.contract_ref_no
And c.latest_version_no = b.version_no
AND b.module ='LB'
AND b.product_type='C')
/