CREATE OR REPLACE VIEW olvw_all_msg_out 
(in_out, reference_no, esn, media, msg_type, branch, dcn, running_no, message, contract_ref_no, receiver, entity, ccy, amount, status, name, location, address1, address2, address3, address4, repair_reason)
AS
SELECT 'OUT' in_out,
	reference_no,
	esn,
	media,--17-FEB-2010 Flexcube V.CL 7.6, FpML changes
	msg_type,
	branch,
	dcn,
	running_no,
	message,
	contract_ref_no, --FLEXCUBE V.CL Release 7.0 CITI UK Change by Aarthi
	receiver,
	entity,
	ccy,
	amount,
	msg_status,
	name,
	location,
	address1,
	address2,
	address3,
	address4,
	repair_reason
FROM   OLTB_DLY_MSG_OUT
UNION ALL
SELECT 'AOUT',
	reference_no,
	esn,
	media,--17-FEB-2010 Flexcube V.CL 7.6, FpML changes
	msg_type,
	branch,
	dcn,
	running_no,
	message,
	contract_ref_no, --FLEXCUBE V.CL Release 7.0 CITI UK Change by Aarthi
	receiver,
	null,
	ccy,
	amount,
	msg_status,
	name,
	null,
	address1,
	address2,
	address3,
	address4,
	null
FROM   oltbs_archive_out
/
create or replace synonym olvws_all_msg_out for olvw_all_msg_out
/