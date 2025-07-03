CREATE OR REPLACE FORCE VIEW olvw_part_dly_msg_out
(
 branch
,dcn
,reference_no
,esn
,event_code
,module
,msg_type
,receiver
,serial_no
,ccy
,product
,amount
,media
,swift_msg_type
,mcs
,node
,format
,language
,no_of_copies
,priority
,name
,address1
,address2
,address3
,address4
,location
,copy
,suppress_flag
,insert_time
,generate_status
,msg_status
,handoff_time
,print_status
,auth_stat
,maker_id
,maker_dt_stamp
,checker_id
,checker_dt_stamp
,once_auth
,message
,repair_reason
,running_no
,hold_status
,processed_flag
,delivery_by
,country
,name2
,zip_code
,value_date
,file_name
,handoff_status
,custom_ref_no
,entity
,borrower_contract_ref_no
,seq_no
,primary_address
,sender_reference
,department_code
,counterparty
,borrower_event_seq_no
,borrower_msg_type
,primary_entity
,entity_name
,GENERATE_ON_INPUT -- Bug#34972353 changes
)
AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_part_dly_msg_out.VW
**
** Module       : LOANS and SYNDICATION											
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
-----------------------------------------------------------------------------------------------
*/
/*
CHANGE HISTORY
--------------
13-MAR-2007.CITIUS-LS#364.Changes related to the consol rollover.
19-MAY-2007.CITIUS-LS#470.Tuning changes for the message queue.
09-oct-2007 Till#625 added for messaging related changes
28-OCT-2008 CITIUS-LS#SRT1451 STP and Code Consolidation Retro	    
06-JAN-2009 FLEXCUBE V.CL Release 7.4 ITR1 SFR#<2>,UKRETRO<CITIUPG73100396>,Prepayment payment summary view error.It shows the receiver as 001001 in case of LIQD event

  Changed By         : Surya Prabha
  Change Description : Code fix for deletion issue in split reprice
  Search string      : Bug#34972353 changes
  Date               : 23-Jan-2023
  
*/
(
select  a.branch
		,dcn
		,reference_no
		,esn
		,c.event_code
		,a.module
		,msg_type
		--,receiver --06-JAN-2009 FLEXCUBE V.CL Release 7.4 ITR1 SFR#<2>,UKRETRO<CITIUPG73100396> COMMENTED
		,d.counterparty	--06-JAN-2009 FLEXCUBE V.CL Release 7.4 ITR1 SFR#<2>,UKRETRO<CITIUPG73100396> ADDED
		,a.serial_no
		,ccy
		,product
		,a.amount
		,media
		,swift_msg_type
		,mcs
		,node
		,format
		,language
		,no_of_copies
		,priority
		,name
		,address1
		,address2
		,address3
		,address4
		,location
		,copy
		,suppress_flag
		,insert_time
		,generate_status
		,msg_status
		,handoff_time
		,print_status
		,auth_stat
		,a.maker_id
		,a.maker_dt_stamp
		,a.checker_id
		,a.checker_dt_stamp
		,once_auth
		,a.message
		,repair_reason
		,running_no
		,hold_status
		,processed_flag
		,delivery_by
		,country
		,name2
		,zip_code
		,a.value_date
		,file_name
		,handoff_status
		,a.custom_ref_no
		,a.entity
		,d.borrower_contract_ref_no
		,seq_no
		,primary_address
		,sender_reference
		,a.department_code
		,a.counterparty
		,NVL(a.borr_esn,1) borr_esn
		,NVL(e.external_value,REPLACE(msg_type,'PART','BORR'))
		,fn_ol_get_primary_entity(d.borrower_contract_ref_no,a.counterparty,a.entity) primary_entity
--		,primary_entity
		--CITIUS-LS#SRT1451 Starts
		-- CITIUS-LS#1406 BEGIN
		--,f.entity_name
		,
		(
			SELECT	f.entity_name
			FROM	OLTM_CUSTOMER_ENTITY_DETAILS f
			WHERE	f.customer_no	=	a.receiver
			AND	f.entity	=	a.entity
		) entity_name
		-- CITIUS-LS#1406 End
		--CITIUS-LS#SRT1451 Ends
		,a.GENERATE_ON_INPUT -- Bug#34972353 changes
from   oltbs_dly_msg_out a,
	   oltbs_contract b,
	   oltbs_contract_event_log c,
	   lptbs_contract_master d,
	   oltms_translation e
--	   OLTM_CUSTOMER_ENTITY_DETAILS f--,-- CITIUS-LS#1406--CITIUS-LS#SRT1451
--	   oltbs_contract_entity g
where  b.module_code  	 = 'LP'
and    a.reference_no 	 = b.contract_ref_no
and    b.contract_ref_no = c.contract_ref_no
and    a.esn		  	 = c.event_seq_no
and	   b.contract_ref_no = d.contract_ref_no
and    b.latest_version_no = d.version_no
and    e.source_code(+)	     = 'CITI'
and    e.translation_type(+) = 'FLEX_MSGTYPE'
and    e.internal_value(+)	 = a.msg_type
--CITIUS-LS#SRT1451 Starts
--and    a.receiver = f.customer_no -- CITIUS-LS#1406
--and    a.entity	  = f.entity-- CITIUS-LS#1406
--CITIUS-LS#SRT1451 Ends
--and  g.contract_reF_no  = d.borrower_contract_ref_no
--and  g.event_seq_no = 1
--and  g.event_seq_no = (select max(event_seq_no)
--	   				  	 from 	oltbs_contract_entity ent
--						 where  ent.contract_ref_no = d.borrower_contract_ref_no
--						 and    ent.customer_no     = a.counterparty
--						 )
--and  g.entity_id 	  = a.entity
--and  a.counterparty = g.customer_no
and    NVL(media,'MAIL') <> 'SWIFT' --CITIUS-LS#496
UNION ALL
select  a.branch
		,dcn
		,reference_no
		,esn
		,c.event_code
		,a.module
		,msg_type
		--,receiver  --06-JAN-2009 FLEXCUBE V.CL Release 7.4 ITR1 SFR#<2>,UKRETRO<CITIUPG73100396> COMMENTED
		,d.counterparty	--06-JAN-2009 FLEXCUBE V.CL Release 7.4 ITR1 SFR#<2>,UKRETRO<CITIUPG73100396> ADDED
		,a.serial_no
		,ccy
		,product
		,a.amount
		,media
		,swift_msg_type
		,mcs
		,node
		,format
		,language
		,no_of_copies
		,priority
		,name
		,address1
		,address2
		,address3
		,address4
		,location
		,copy
		,suppress_flag
		,insert_time
		,generate_status
		,msg_status
		,handoff_time
		,print_status
		,auth_stat
		,a.maker_id
		,a.maker_dt_stamp
		,a.checker_id
		,a.checker_dt_stamp
		,once_auth
		,a.message
		,repair_reason
		,running_no
		,hold_status
		,processed_flag
		,delivery_by
		,country
		,name2
		,zip_code
		,a.value_date
		,file_name
		,handoff_status
		,a.custom_ref_no
		,a.entity
		,d.borrower_contract_ref_no
		,seq_no
		,primary_address
		,sender_reference
		,a.department_code
		,a.counterparty
		,e.borr_event_seq_no
		,a.msg_type
		,'Y'
		,''
		,a.GENERATE_ON_INPUT -- Bug#34972353 changes
from   oltbs_dly_msg_out a,
	   oltbs_contract b,
	   oltbs_contract_event_log c,
	   lptbs_contract_master d,
	   lbtb_borr_part_event_mapping e
where  b.module_code  	 = 'LP'
and    a.reference_no 	 = b.contract_ref_no
and    b.contract_ref_no = c.contract_ref_no
and    a.esn		  	 = c.event_seq_no
and	   b.contract_ref_no = d.contract_ref_no
and    b.latest_version_no = d.version_no
and    (a.media = 'SWIFT' or (a.media is null and a.msg_type like '%TRANSFER'))
and    e.part_contract_ref_no = d.contract_ref_no
and    e.part_event_seq_no = c.event_seq_no
UNION ALL
--CITIUS-LS#364 Addition starts
select  a.branch
		,dcn
		,reference_no
		,esn
		,c.event_code
		,a.module
		,msg_type
		--,receiver --06-JAN-2009 FLEXCUBE V.CL Release 7.4 ITR1 SFR#<2>,UKRETRO<CITIUPG73100396> COMMENTED
		,i.counterparty	--06-JAN-2009 FLEXCUBE V.CL Release 7.4 ITR1 SFR#<2>,UKRETRO<CITIUPG73100396> ADDED
		,a.serial_no
		,ccy
		,product
		,a.amount
		,media
		,swift_msg_type
		,mcs
		,node
		,format
		,language
		,no_of_copies
		,priority
		,name
		,address1
		,address2
		,address3
		,address4
		,location
		,copy
		,suppress_flag
		,insert_time
		,generate_status
		,msg_status
		,handoff_time
		,print_status
		,auth_stat
		,a.maker_id
		,a.maker_dt_stamp
		,a.checker_id
		,a.checker_dt_stamp
		,once_auth
		,a.message
		,repair_reason
		,running_no
		,hold_status
		,processed_flag
		,delivery_by
		,country
		,name2
		,zip_code
		,a.value_date
		,file_name
		,handoff_status
		,a.custom_ref_no
		,a.entity
		,d.borrower_contract_ref_no
		,seq_no
		,primary_address
		,sender_reference
		,a.department_code
		,a.counterparty
		,NVL(a.borr_esn,1) borr_esn
		,NVL(e.external_value,REPLACE(msg_type,'PART','BORR'))
--		,primary_entity
		,fn_ol_get_primary_entity(i.borrower_contract_ref_no,a.counterparty,a.entity) primary_entity
		-- CITIUS-LS#SRT1451 Starts
		-- CITIUS-LS#1406 BEGIN
		--,f.entity_name
		,
		(
			SELECT	f.entity_name
			FROM	OLTM_CUSTOMER_ENTITY_DETAILS f
			WHERE	f.customer_no	=	a.receiver
			AND	f.entity	=	a.entity
		) entity_name
		-- CITIUS-LS#1406 End
		--CITIUS-LS#SRT1451 Ends
		,a.GENERATE_ON_INPUT -- Bug#34972353 changes
from   oltbs_dly_msg_out a,
	   oltbs_contract b,
	   oltbs_contract_event_log c,
	   lbtb_roll_part_borr_linkage d,
	   oltms_translation e,
--	   OLTM_CUSTOMER_ENTITY_DETAILS f,-- CITIUS-LS#1406--CITIUS-LS#SRT1451
	   lptbs_contract_master i,
	   --oltbs_contract_entity g,
	   lbtb_contract_consol_detail h
where  b.module_code  	 = 'LP'
and    a.reference_no 	 = c.contract_ref_no
and    a.reference_no    = d.contract_ref_no
--and  b.contract_ref_no = c.contract_ref_no
and    a.esn		  	 = c.event_seq_no
and	   b.contract_ref_no = i.contract_ref_no
and    b.latest_version_no = i.version_no
and    e.source_code(+)	     = 'CITI'
and    e.translation_type(+) = 'FLEX_MSGTYPE'
and    e.internal_value(+)	 = a.msg_type
--CITIUS-LS#SRT1451 Starts
--and    a.receiver = f.customer_no -- CITIUS-LS#1406
--and    a.entity	  = f.entity -- CITIUS-LS#1406
--CITIUS-LS#SRT1451 Ends
and    d.borrower_contract_ref_no = h.contract_ref_no
and    h.driver_contract = 'Y'
and    i.borrower_contract_ref_no = h.child_ref_no
and    i.counterparty 	 = d.counterparty
--and  g.contract_reF_no = i.borrower_contract_ref_no
and    NVL(media,'MAIL') <> 'SWIFT'	--CITIUS-LS#496
--and  g.event_seq_no = 1
--and  g.entity_id 	  = a.entity
--and  a.counterparty = g.customer_no
--and  g.event_seq_no = (select max(event_seq_no)
--	   				  	   from 	oltbs_contract_entity ent
--						   where  ent.contract_ref_no = i.borrower_contract_ref_no
--						   and    ent.customer_no     = a.counterparty
--						   )
)
--CITIUS-LS#364 Addition ends
/

CREATE OR REPLACE SYNONYM olvws_part_dly_msg_out FOR olvw_part_dly_msg_out
/