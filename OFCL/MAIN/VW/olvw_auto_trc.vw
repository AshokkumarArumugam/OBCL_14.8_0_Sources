CREATE OR REPLACE FORCE VIEW olvw_auto_trc AS		--CITIUS-LS#SRT1452 STP and Code Consolidation Site - Compilation Errors
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_auto_trc.VW  
**
** Module	: RECONCILIATION
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
----------------------------------------------------------------------------------------------------
*/
--CREATE VIEW olvw_auto_trc AS				--CITIUS-LS#SRT1452 STP and Code Consolidation Site - Compilation Errors
SELECT A.generate_status,
       A.auto_or_manual,
       A.trc_date,
       B.entry_seq_no,
       A.tracer_no,
	   A.swift_msg_type,
	   A.format,
	   A.int_or_ext,
	   B.external_entity,
	   B.external_account,
	   B.currency,
	   B.value_date,
	   B.amount,
	   B.booking_date,
	   B.internal_ref_no,
	   B.external_ref_no,
	   B.transaction_code,
	   B.funds_code,
	   B.supplementary_details,
	   B.recon_class,
	   B.dr_cr_indicator,
	   A.repair_reason
FROM   oltbs_external_entry B,
	   oltbs_trcmsg_out A
WHERE  A.recon_class = B.recon_class
  AND  A.external_entity= B.external_entity
  AND  A.external_account= B.external_account
  AND  A.entry_seq_no = B.entry_seq_no
  AND  B.match_indicator = 'N'
UNION
SELECT A.generate_status,
	   A.auto_or_manual,
	   A.trc_date,
	   B.entry_seq_no,
	   A.tracer_no,
	   A.swift_msg_type,
	   A.format,
	   A.int_or_ext,
	   B.external_entity,
	   B.external_account,
	   B.currency,
	   B.value_date,
	   B.amount,
	   B.booking_date,
	   B.internal_ref_no,
	   B.external_ref_no,
	   B.transaction_code,
	   '',
	   B.supplementary_details,
	   B.recon_class,
	   B.dr_cr_indicator,
	   A.repair_reason
FROM   oltbs_internal_entry B,
	   oltbs_trcmsg_out A
WHERE  A.recon_class = B.recon_class
  AND  A.external_entity = B.external_entity
  AND  A.external_account= B.external_account
  AND  A.entry_seq_no = B.entry_seq_no
  AND  B.match_indicator = 'N'
/
CREATE OR REPLACE SYNONYM olvws_auto_trc FOR olvw_auto_trc
/