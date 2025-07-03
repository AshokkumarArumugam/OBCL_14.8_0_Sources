create or replace package lppks_tax_process as
/*------------------------------------------------------------------------------
** File Name			: lppks_tax_process.SPC
**
** Module			:LOAN SYNDICATION
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
------------------------------------------------------------------------------
*/

/*
------------------------------CHANGE HISTORY-----------------------------------------------
23-JAN-2007 FLEXCUBE V.CL Release , Package Specification Created by Gowri
	    This package has been created to handle Tax processes - Remmittance and Refund.
06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#1287,STP Consolidation,By Swapnasish,Tax Refund Changes
------------------------------------END CHANGE HISTORY-------------------------------------
*/
PROCEDURE set_partmsggen_flg (p_gen_flg VARCHAR2 DEFAULT 'Y');
FUNCTION fn_save_refund_details
	(
	p_contract_ref_no	IN	txtbs_tax_refund_master.participant_ref_no%type,
	p_event_seq_no		IN	txtbs_tax_refund_master.event_seq_no%type,
	p_errcode		IN OUT 	VARCHAR2,
	p_errprm		IN OUT 	VARCHAR2,
	p_borr_invstr  		IN 	VARCHAR2 DEFAULT 'B', --18-Feb-2008 FLEXCUBE V.CL Release 7.4 BAU changes, Tax Requirements-Investorwise Tax Refund changes Starts
	p_customer_no		IN 	VARCHAR2 DEFAULT NULL,
	p_currency 		IN 	VARCHAR2 DEFAULT NULL,
  	p_refund_no 		IN 	NUMBER 	 DEFAULT 1 --18-Feb-2008 FLEXCUBE V.CL Release 7.4 BAU changes, Tax Requirements-Investorwise Tax Refund changes till here 
	)
RETURN BOOLEAN;

FUNCTION fn_tax_refund_acc_entry
	(
	p_contract_ref_no	IN	txtbs_tax_refund_master.participant_ref_no%type,
	p_event_seq_no		IN	txtbs_tax_refund_master.event_seq_no%type,
	p_errcode		IN OUT	VARCHAR2,
	p_errprm		IN OUT	VARCHAR2,
	p_borr_invstr  		IN 	VARCHAR2 DEFAULT 'B', --18-Feb-2008 FLEXCUBE V.CL Release 7.4 BAU changes, Tax Requirements-Investorwise Tax Refund changes Starts
	p_customer_no		IN 	VARCHAR2 DEFAULT NULL,
	p_currency 		IN 	VARCHAR2 DEFAULT NULL,
  	p_refund_no 		IN 	NUMBER 	 DEFAULT 1 --18-Feb-2008 FLEXCUBE V.CL Release 7.4 BAU changes, Tax Requirements-Investorwise Tax Refund changes till here
	)
RETURN BOOLEAN;

FUNCTION fn_process_part_liqd
	(
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	p_part_ref_no		IN	oltbs_contract.contract_ref_no%TYPE,
	p_esn			IN	oltbs_contract.latest_event_seq_no%TYPE,			
	p_error_code		IN OUT	VARCHAR2,
	p_error_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_party_authorise
(
	pContractRefNo	IN		oltbs_contract.contract_ref_no%TYPE,
	p_ESN                 IN		NUMBER,
	pErrorCode			IN	OUT	VARCHAR2,
	pErrorParams		IN	OUT	VARCHAR2
)
RETURN BOOLEAN;
-- Manjula starts
FUNCTION fn_save_remittance
	(
	p_remittance_rec	IN	txtbs_tax_remittance_master%ROWTYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
FUNCTION fn_auth_remittance
	(
	p_remittance_ref_no	IN	txtbs_tax_remittance_master.remittance_ref_no%TYPE,
	p_event_seq_no          IN	txtbs_tax_remittance_master.event_seq_no%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
-- Manjula ends

-- Bincy Starts
FUNCTION fn_tax_refund_reversal
	(
	p_contract_ref_no		IN	oltbs_contract.contract_ref_no%TYPE,
	p_event_seq_no			IN 	oltbs_contract.latest_event_seq_no%TYPE,
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	) 
	RETURN BOOLEAN;
FUNCTION fn_delete_refund
	(
	p_contract_ref_no		IN	oltbs_contract.contract_ref_no%TYPE,
	p_event_code			IN	oltbs_contract_event_log.event_code%TYPE, 
	p_event_seq_no			IN 	oltbs_contract.latest_event_seq_no%TYPE,
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_backup_txnrule_detail
	(
	p_contract_ref_no		IN	oltbs_contract.contract_ref_no%TYPE,
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
FUNCTION fn_delete_refund_backup
	(
	p_contract_ref_no		IN	oltbs_contract.contract_ref_no%TYPE,
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_delete_remittance
	(
	p_remittance_ref_no		IN	TXTB_TAX_REMITTANCE_MASTER.remittance_ref_no%TYPE,
	p_event_seq_no			IN 	TXTB_TAX_REMITTANCE_MASTER.event_seq_no%TYPE,
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--Bincy till here

--18-Feb-2008 FLEXCUBE V.CL Release 7.4 BAU changes, Tax Requirements-Investorwise Tax Refund changes Starts

FUNCTION Fn_do_tax_refund 
( 	p_borr_ref_no         	IN      oltbs_contract.contract_ref_no%TYPE,
  	p_part_contract_rec	IN      oltbs_contract%ROWTYPE,
  	p_customer_no         	IN      TXTB_INVESTOR_REFUND_MASTER.customer_no%TYPE,
  	p_currency            	IN      TXTB_INVESTOR_REFUND_DETAIL.currency%TYPE,
  	p_refund_no           	IN      TXTB_INVESTOR_REFUND_MASTER.refund_no%TYPE,
  	p_error_code          	IN OUT  VARCHAR2,
  	p_error_parameter     	IN OUT  VARCHAR2
)
RETURN BOOLEAN;

FUNCTION Fn_do_refund_reversal
( 	p_borr_ref_no           IN      oltbs_contract.contract_ref_no%TYPE, 
	p_part_contract_rec	IN      oltbs_contract%ROWTYPE,
	p_customer_no           IN      TXTB_INVESTOR_REFUND_MASTER.customer_no%TYPE,
	p_currency              IN      TXTB_INVESTOR_REFUND_DETAIL.currency%TYPE,
	p_refund_no             IN      TXTB_INVESTOR_REFUND_MASTER.refund_no%TYPE,
	p_error_code	        IN OUT	VARCHAR2,
	p_error_parameter	IN OUT	VARCHAR2
)
RETURN BOOLEAN;  

PROCEDURE PR_TAX_PROCESSING;

FUNCTION Fn_investor_tax_processing
--06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#1287 Start By Swapnasish
(
	p_customer_no	varchar2, --CITIUS-LS#1287
	p_refund_no		number	  --CITIUS-LS#1287	
)
--06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#1287 End By Swapnasish
RETURN BOOLEAN;

--18-Feb-2008 FLEXCUBE V.CL Release 7.4 BAU changes, Tax Requirements-Investorwise Tax Refund changes Till here
END lppks_tax_process;
/
create or replace synonym lppkss_tax_process for lppks_tax_process
/