CREATE OR REPLACE VIEW ITVW_ALRT_COMMS
(communication_id, email_subject, message, effective_date, process_status, un_id, fn_id, review, dismiss, target)
AS
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2011 - 2015  Oracle and/or its affiliates.  All rights reserved.
**                                              
** No part of this work may be reproduced, stored in a retrieval system,
** adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise,
** translated in any language or computer language,
** without the prior written permission of Oracle and/or its affiliates.
** 
** 
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India.
------------------------------------------------------------------------------------------
*/
/*
  **   Modified By            : Monica R
  **   Modified On            : 27-Apr-2017
  **   Modified Reason        : Alerts in Interaction dash board are not considering alert definition record status. Code Changes incorporated for the same.
  **   Search String          : 9NT1606_12_3_RETRO_12_0_3_25944277
  **
  **  Modified By			: Harish Kandriga
  **  Modified on   		: 19-Sep-2019
  **  Fix Description    	: "DISMISS" link is not working for alerts. Code handling is missing to Dismiss the alert when Dismiss link is clicked.
  **						  Fix provided to add Process Status in the condition to Dismiss the alert when Dismiss link is clicked
							  and commented the unwanted code as records are fetching twice.
  **  Search String      	: 9NT1606_14_3_30324966
-----------------------------------------------------------------------------------------
*/
SELECT communication_id, email_subject, message, effective_date, process_status, UN_ID, FN_ID,
REVIEW, DISMISS, TARGET FROM
--9NT1606_12_3_RETRO_12_0_3_25944277 starts
--(SELECT communication_id,email_subject,message,effective_date,'Process_status' Process_status,
(
--9NT1606_14_3_30324966 commenting starts
/*SELECT a.communication_id communication_id,a.email_subject email_subject,a.message message,a.effective_date effective_date,'Process_status' Process_status,
--9NT1606_12_3_RETRO_12_0_3_25944277 ends
 'UN_ID' UN_ID, 'FN_ID' FN_ID,
'' REVIEW,'' DISMISS, 'TARGET' TARGET
FROM ittb_communications a --9NT1606_12_3_RETRO_12_0_3_25944277 added synonym
WHERE communication_type= 'A'
--9NT1606_12_3_RETRO_12_0_3_25944277 starts
AND EXISTS (SELECT 1
				FROM ITTM_ALERT_DEFINITION b
				WHERE b.alert_code = a.communication_reference
				AND b.target_type  = a.target_type
				AND b.record_stat  = 'O'
				AND b.auth_stat    = 'A')
--9NT1606_12_3_RETRO_12_0_3_25944277 ends				
UNION*/
--9NT1606_14_3_30324966 commenting ends
SELECT ic.communication_id communication_id,ic.email_subject email_subject,ic.message message,ic.effective_date effective_date,
ic.Process_status Process_status,
SUBSTR(ic.message,0,INSTR(ic.message, ' ')-1) UN_ID,
(CASE
  WHEN UPPER(SUBSTR(iac.from_clause,0,INSTR(iac.from_clause, ' ')-1)) = 'GETM_FACILITY' and (select param_val from cstb_param where param_name='PROCESS_ENGINE') ='BPM' THEN 'ORDLMRIN'
  WHEN UPPER(SUBSTR(iac.from_clause,0,INSTR(iac.from_clause, ' ')-1)) = 'GETM_FACILITY' and (select param_val from cstb_param where param_name='PROCESS_ENGINE') ='BPEL' THEN /*'ORDLRWIN'*/'ORDLMRIN' --21839024 change
end) FN_ID,
(CASE
  WHEN UPPER(SUBSTR(iac.from_clause,0,INSTR(iac.from_clause, ' ')-1)) = 'GETM_FACILITY' and (select param_val from cstb_param where param_name='PROCESS_ENGINE') ='BPM' THEN 'REVIEW'
  WHEN UPPER(SUBSTR(iac.from_clause,0,INSTR(iac.from_clause, ' ')-1)) = 'GETM_FACILITY' and (select param_val from cstb_param where param_name='PROCESS_ENGINE') ='BPEL' THEN 'REVIEW'
end) "REVIEW", 'DISMISS' "DISMISS", ic.TARGET TARGET
FROM ittb_communications ic,ittm_alert_definition iad,ittm_alert_criteria iac
WHERE ic.communication_reference=iad.alert_code
and iad.criteria_code=iac.criteria_code
and ic.communication_type= 'A'
and ic.reviewed='N'
and ic.channel='D'
AND ic.process_status = 'N'--9NT1606_14_3_30324966
--9NT1606_12_3_RETRO_12_0_3_25944277 starts
AND EXISTS (SELECT 1
				FROM ITTM_ALERT_DEFINITION b
				WHERE b.alert_code = ic.communication_reference
				AND b.target_type  = ic.target_type
				AND b.record_stat  = 'O'
				AND b.auth_stat    = 'A')
--9NT1606_12_3_RETRO_12_0_3_25944277				
) vals
order by effective_date
/
CREATE OR REPLACE SYNONYM itvws_alrt_comms FOR itvw_alrt_comms
/