create or replace package  bkpks_subsystem AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : bkpks_subsystem.SPC
**
** Module       : BROKERAGE
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


FUNCTION  FN_SETTLEMENT_PICKUP 
	(
	pbranch		IN	bktbs_txnbook.booking_acbranch%type,
	pcparty		IN	bktms_brmaster.broker%type,
	pccy			IN bktbs_txnbook.booking_ccy%type,
	pscheme		IN	txtms_scheme.scheme_code%type,
	pContractRefNo	IN	oltbs_contract.contract_ref_no%Type,
	pEventSeqNo	IN	oltbs_contract.latest_event_seq_no%Type,
	pModule		IN	oltbs_contract.module_code%Type,
	pErrorCode	IN	OUT	Varchar2,
	pErrorParams	IN	OUT	Varchar2
	)
	Return Boolean ;

FUNCTION FN_TAX_PICKUP
	(
	p_liq_ref_no 			IN 	txtbs_maintxn.contract_ref_no%type,--char
	p_event_seq_no 			IN 	txtbs_txnrule_detail.event_seq_no%type,--num
	p_event 			IN	txtbs_txnrule.computation_event%type,--char
	p_scheme 			IN 	txtms_scheme.scheme_code%type,
	p_broker			IN	bktbs_brliq.broker%Type,
	p_error_code 			IN OUT 	ERTBS_MSGS.err_code%type
	) 
	return boolean ;

FUNCTION FN_TAX_COMPUTE (
	p_liq_ref_no 			IN 	txtbs_maintxn.contract_ref_no%type, 		
	p_event_seq_no 			IN 	txtbs_txnrule_detail.event_seq_no%type,
	p_event 				IN	txtbs_txnrule.computation_event%type,
	p_transaction_date 		IN 	txtbs_txnrule_detail.computation_date%type,
	p_value_date 			IN varchar2,
	p_basis_amount_tag 		IN varchar2,
	p_basis_amount 			IN varchar2,
	p_basis_amount_ccy 		IN varchar2,
	p_liquidation_amount 	IN varchar2,
	p_scheme 				IN txtms_scheme.scheme_code%type,
	p_error_code 			IN OUT ERTBS_MSGS.err_code%type
	) 
	return boolean ;

end bkpks_subsystem;
/
Create or replace Synonym bkpkss_subsystem for bkpks_subsystem
/