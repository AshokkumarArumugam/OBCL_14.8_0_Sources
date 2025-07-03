CREATE OR REPLACE FORCE VIEW lbvw_stp_tr_dd_summary
(
borrower_ref_no,
borrower_esn,
participant_ref_no,
participant_no,
participant_esn,
event_value_date,
interface_type,
contract_ref_no,
borrower_tranche_ref_no,
process_status,
ld_contract_ref_no,
ld_branch_code,
ld_event_seq_no,
ld_eventcode,
ls_eventcode,
activity_sequence_no,
auth_status
)
AS
/*-----------------------------------------------------------------------------------
**
** File Name      : lbvw_stp_tr_dd_summary.VW
** Module         :  CORE ENTITIES
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
--------------------------------------------------------------------------------------------------
*/
	select a.borr_ref_no,
		   a.borr_esn,	
		   a.part_ref_no,
		   participant,
		   a.part_esn,
		   a.event_value_date,
		   a.interface_type,	   
		   b.contract_ref_no,
		   b.tranche_ref_no,
		   processing_status,
		   a.ld_ref_no,
		   a.ld_branch,
		   a.ld_esn,
		   a.ld_event_code,
		   ls_event_code,
		   activity_seq_no,
		   a.auth_stat
	from   oltbs_stp_job_browser a,
		   oltbs_contract_master b,
		   oltbs_contract c
	where  b.contract_ref_no = c.contract_ref_no
	and    b.version_no 	 = c.latest_version_no
	and	   a.borr_ref_no 	 = c.contract_ref_no  
--CITIUS-LS#6738
UNION
	select a.borr_ref_no,
	   a.borr_esn,
	   a.part_ref_no,
	   participant,
	   a.part_esn,
	   a.event_value_date,
	   a.interface_type,
	   b.contract_ref_no,
	   b.tranche_ref_no,
	   processing_status,
	   a.ld_ref_no,
	   a.ld_branch,
	   a.ld_esn,
	   a.ld_event_code,
	   ls_event_code,
	   activity_seq_no,
	   a.auth_stat
from   oltbs_stp_job_browser a,
	   lbtbs_contract_consol_master b,
	   oltbs_contract c
where  b.contract_ref_no = c.contract_ref_no
and	   a.borr_ref_no 	 = c.contract_ref_no
--CITIUS-LS#6738
/
CREATE OR REPLACE SYNONYM lbvws_stp_tr_dd_summary FOR lbvw_stp_tr_dd_summary
/