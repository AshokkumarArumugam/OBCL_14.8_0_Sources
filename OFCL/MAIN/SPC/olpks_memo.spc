CREATE OR REPLACE PACKAGE olpks_memo 
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_memo.SPC
**
** Module		: MESSAGING SUBSYSTEM
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
/*
CHANGE HISTORY

Date			Version			Site Code	SFR		Changes
------------------------------------------------------------------------------------------------------------
19-Jun-2002		FCC4.0 June 2002		INTERNAL	5903		This unit is taken from FCC4.1(MainStream)
											for preview of LC/BC advices for UNAUTH
											contracts.This package is accessed from 
											MSMEMGEN.FMB
22-Aug-2005             FCC 4.6.2 changes						Added two parameters p_diary_event_seq_no,
											p_diary_event_sub_seq_no in the functions
											fn_mesg_memo_view and fn_gen_advice

*/



function fn_replace_swift(
	pm_dcn IN oltbs_dly_msg_out.dcn%type)
return boolean;	
function fn_mesg_memo_view(
					pModule       		 IN     oltbs_contract.module_code%TYPE,
					pContractNos  		 IN     varchar2,
          				p_diary_event_seq_no     IN oltbs_contract_diary_status.diary_event_seq_no%TYPE ,
          				p_diary_event_sub_seq_no IN oltbs_contract_diary_status.Diary_Event_Sub_Seq_No%TYPE,
					pDcn          		 OUT    varchar2,
					pCountDCN     		 OUT    number
					)
return boolean;

function fn_gen_advice(
					pModule       		 IN     oltbs_contract.module_code%TYPE,
					pAccount      		 IN     oltbs_contract.contract_ref_no%TYPE,
          				p_diary_event_seq_no     IN 	oltbs_contract_diary_status.diary_event_seq_no%TYPE ,
          				p_diary_event_sub_seq_no IN 	oltbs_contract_diary_status.Diary_Event_Sub_Seq_No%TYPE,
					pDcn          		 OUT    varchar2,
					pCountDCN     		 OUT    number,
					pNextSerialNo 		 IN OUT number
					)
return boolean;

FUNCTION fn_mesg_memo_del(
 					pDcn        	IN     varchar2,
					pCountDCN   	IN     number
				  )
return BOOLEAN;


END;
/
create or replace synonym olpkss_memo for olpks_memo
/