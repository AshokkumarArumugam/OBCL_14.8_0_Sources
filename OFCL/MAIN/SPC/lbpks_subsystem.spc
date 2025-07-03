CREATE OR REPLACE package lbpks_subsystem as
/*------------------------------------------------------------------------------
** File Name		: lbpks_subsystem.SPC
**
** Module			: LOAN SYNDICATION
**
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
CHANGE HISTORY
08-DEC-2005 Flexcube V.CL Release 7.0, New package added
21-DEC-2005 Flexcube V.CL Release 7.0, Changes by MIThilesh For settelment Pickup using Mnemonic.
*/



FUNCTION  FN_SETTLEMENT_PICKUP
		(
		pContractRefNo	IN			oltbs_contract.contract_ref_no%Type,
		pEventSeqNo		IN			oltbs_contract.latest_event_seq_no%Type,
		pModule			IN			oltbs_contract.module_code%Type,
		pErrorCode		IN	OUT	Varchar2,
		pErrorParams	IN	OUT	Varchar2
		)
		Return Boolean;

FUNCTION FN_SUMMARY_ICCF_REFERRAL
		(
		pContractRefNo		IN			oltbs_contract.contract_ref_no%Type
		, pEventSeqNo		IN			oltbs_contract.latest_event_seq_no%Type
		, tagList 			IN	OUT 	VARCHAR2
		, amountList 		IN	OUT 	VARCHAR2
		, lcyAmountList	IN	OUT 	VARCHAR2
		, ccyList 			IN	OUT 	VARCHAR2
		, vdateList 		IN	OUT 	VARCHAR2
		, compTypeList 	IN	OUT 	VARCHAR2
		, pErrorCode 		IN	OUT 	VARCHAR2
		, pErrorParams		IN	OUT	VARCHAR2
		) RETURN BOOLEAN;

FUNCTION fn_iccf_pickup
		(
		pContractRefNo		IN			oltbs_contract.contract_ref_no%Type
		, pEventSeqNo		IN			oltbs_contract.latest_event_seq_no%Type
		, pEventCode		IN			oltbs_contract.curr_event_code%Type
		, pErrorCode 		IN	OUT 	VARCHAR2
		, pErrorParams		IN	OUT	VARCHAR2
		) RETURN BOOLEAN;

FUNCTION fn_tax_pickup
		(
		pContractRefNo		IN			oltbs_contract.contract_ref_no%Type
		, pEventSeqNo		IN			oltbs_contract.latest_event_seq_no%Type
		, pEventCode		IN			oltbs_contract.curr_event_code%Type
		, pErrorCode 		IN	OUT 	VARCHAR2
		, pErrorParams		IN	OUT	VARCHAR2
		) RETURN BOOLEAN;

FUNCTION fn_compute_tax
		(
		pContractRefNo		IN			oltbs_contract.contract_ref_no%Type
		, pEventSeqNo		IN			oltbs_contract.latest_event_seq_no%Type
		, pEventCode		IN			oltbs_contract.curr_event_code%Type
		, pErrorCode 		IN	OUT 	VARCHAR2
		, pErrorParams		IN	OUT	VARCHAR2
		) RETURN BOOLEAN;

-- new function for ICCF Changes
FUNCTION fn_charge_pickup
		(
		  pContractRefNo		IN			oltbs_contract.contract_ref_no%Type
		, pEventSeqNo		IN			oltbs_contract.latest_event_seq_no%Type
		, pEventCode		IN			oltbs_contract.curr_event_code%Type
            , pvaluedate            IN                date
		, pTenor			IN			oltbs_contract_master.tenor%TYPE
		, pErrorCode 		IN	OUT 	VARCHAR2
		, pErrorParams		IN	OUT	VARCHAR2
		) RETURN BOOLEAN;

--Flexcube V.CL Release 7.0, Changes by MIT on 211205, Commented the fuction Start
--
-- FCC 4.4 DEC 2003 27-Oct-2003 fast settlement changes Start
--
FUNCTION  fn_settlement_pickup
	(
	p_contract_ref_no			IN		oltbs_contract.contract_ref_no%TYPE		,
	p_version_no			IN		oltbs_contract.latest_event_seq_no%TYPE	,
	p_module				IN		oltbs_contract.module_code%TYPE		,
	p_product				IN		oltbs_contract.product_code%TYPE		,
	p_currency				IN		oltbs_contract_master.currency%TYPE		,
	p_counterparty			IN		oltbs_contract.counterparty%TYPE		,
	p_cstbs_contractis_record	IN OUT	oltbs_contractis_cs%ROWTYPE			,
	p_error_code			IN OUT	VARCHAR2						,
	p_error_parameter			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--Flexcube V.CL Release 7.0, Changes by MIT on 211205, Commented the fuction End

FUNCTION fn_get_new_settle_referral
	(
	p_contract_rec			IN		oltbs_contract%ROWTYPE	,
	p_pass_to_dflt_acct		IN		VARCHAR2			,
	p_inherit				IN		VARCHAR2			,
	p_settle_event			IN		VARCHAR2			,
	p_list_of_is_amount_tags	IN OUT	VARCHAR2			,
	p_list_pay_receive		IN OUT	VARCHAR2			,
	p_list_of_is_branches		IN OUT	VARCHAR2			,
	p_list_of_is_accounts		IN OUT	VARCHAR2			,
	p_list_of_is_account_ccys	IN OUT	VARCHAR2			,
	p_list_of_is_exch_rates		IN OUT	VARCHAR2			,
	p_list_of_is_amount		IN OUT 	VARCHAR2			,
	p_list_of_is_msg_nettable	IN OUT	VARCHAR2			,
	p_list_of_is_instr_code		IN OUT	VARCHAR2			,
	p_list_of_value_date		IN OUT	VARCHAR2			,
	p_list_of_instr_sts		IN OUT	VARCHAR2			,
	p_list_of_receiver		IN OUT	VARCHAR2			,
	p_list_of_acc_cif			IN OUT	VARCHAR2			,
	p_list_of_tag_ccy			IN OUT	VARCHAR2			,
	p_error_code			IN OUT	VARCHAR2			,
	p_error_parameter			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_get_settlement_list
		(
		p_contractis_table		IN 		olpkss_new.g_contractis_table_type	,
		p_list_of_is_amount_tags	IN OUT	VARCHAR2					,
		p_list_pay_receive		IN OUT	VARCHAR2					,
		p_list_of_is_branches		IN OUT	VARCHAR2					,
		p_list_of_is_accounts		IN OUT	VARCHAR2					,
		p_list_of_is_account_ccys	IN OUT	VARCHAR2					,
		p_list_of_is_exch_rates		IN OUT	VARCHAR2					,
		p_list_of_is_amount		IN OUT 	VARCHAR2					,
		p_list_of_is_msg_nettable	IN OUT	VARCHAR2					,
		p_list_of_is_instr_code		IN OUT	VARCHAR2					,
		p_list_of_value_date		IN OUT	VARCHAR2					,
		p_list_of_instr_sts		IN OUT	VARCHAR2					,
		p_list_of_receiver		IN OUT	VARCHAR2					,
		p_list_of_acc_cif			IN OUT	VARCHAR2					,
		p_error_code			IN OUT	VARCHAR2					,
		p_error_parameter			IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

--
-- 27-Oct-2003 FCC 4.4 fast settlement changes End
--

-- Bouat Til 98
FUNCTION Fn_TaxOnChgDuring_LIQD(pContractRefNo	IN 	VARCHAR2,
			    pEvent_seq_no	IN	NUMBER,
			    pErrorCode		IN OUT	VARCHAR2,
			    pErrorParams	IN OUT	VARCHAR2
			   )
RETURN BOOLEAN;
-- Bouat Til 98
-- FCC 4.6.2 CITL FEE CHANGES START BY KISHORE 
FUNCTION fn_fees_pickup
		(
		  pContractRefNo		IN	      oltbs_contract.contract_ref_no%Type,
      	  pEventSeqNo		IN		oltbs_contract.latest_event_seq_no%Type,
		  pEventCode		IN		oltbs_contract.curr_event_code%Type,
          p_action_code         IN          varchar2,
		  pErrorCode 		IN	OUT 	VARCHAR2,
		  pErrorParams		IN	OUT	VARCHAR2
		) RETURN BOOLEAN;

FUNCTION fn_check_for_fees(p_contract_ref_no IN oltbs_contract.contract_ref_no%type,
                           p_event_seq_no    IN oltbs_contract.latest_event_seq_no%type,
                           p_event_code      IN oltbs_contract.curr_event_code%type,
                           p_error_code      IN out varchar2,
                           p_error_params    IN out varchar2 ) RETURN BOOLEAN;

-- FCC 4.6.2 CITL FEE CHANGES END BY KISHORE
--OBCL_14.4_TAX_Changes :: Starts
FUNCTION fn_facility_tax_pickup(pContractRefNo IN oltbs_contract.contract_ref_no%Type,
                                pEventSeqNo    IN oltbs_contract.latest_event_seq_no%Type,
                                pEventCode     IN oltbs_contract.curr_event_code%Type,
                                pErrorCode     IN OUT VARCHAR2,
                                pErrorParams   IN OUT VARCHAR2)
  RETURN BOOLEAN;
FUNCTION fn_facility_compute_tax(pcontractrefno IN oltbs_contract.contract_ref_no%TYPE,
                                 peventseqno    IN oltbs_contract.latest_event_seq_no%TYPE,
                                 peventcode     IN oltbs_contract.curr_event_code%TYPE,
                                 perrorcode     IN OUT VARCHAR2,
                                 perrorparams   IN OUT VARCHAR2)
  RETURN BOOLEAN;  
--OBCL_14.4_TAX_Changes :: Ends
End lbpks_subsystem;
/
CREATE or replace SYNONYM lbpkss_subsystem FOR lbpks_subsystem
/