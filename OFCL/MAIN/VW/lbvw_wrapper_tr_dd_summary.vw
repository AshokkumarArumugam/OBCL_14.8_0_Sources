CREATE OR REPLACE FORCE VIEW lbvw_wrapper_tr_dd_summary
(agency_ref_no, agency_esn, participant, event_value_date, contract_ref_no, borrower_tranche_ref_no, process_status, wrapper_ref_no, wrapper_event_seq_no, wrapper_eventcode, agency_event_code, activity_sequence_no, auth_status
,branch --29-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10272 changes
)
AS
/*-------------------------------------------------------------------------------------- 
**  
**  File Name :lbvw_wrapper_tr_dd_summary.VW 
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
--29-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10272 clp participation changes
SELECT a.agency_ref_no,
a.agency_esn,		   
a.participant,		   
a.event_value_date,		   
b.contract_ref_no,
b.tranche_ref_no,
processing_status,
a.wrapper_ref_no,		   
a.wrapper_esn,
a.wrapper_event_code,
a.agency_event_code,
a.activity_seq_no,
a.auth_stat
,c.branch --29-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10272 changes
FROM lbtb_agency_wrapper_job a,
     oltbs_contract_master b,
     oltbs_contract c
WHERE  b.contract_ref_no = c.contract_ref_no
AND b.version_no = c.latest_version_no
AND a.agency_ref_no = c.contract_ref_no
/
create OR REPLACE synonym lbvws_wrapper_tr_dd_summary for lbvw_wrapper_tr_dd_summary
/