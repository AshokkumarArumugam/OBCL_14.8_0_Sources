CREATE OR REPLACE package olpks_subsystem as
/*------------------------------------------------------------------------------
** File Name		: olpks_subsystem.SPC
**
** Module			: Loans and deposits
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
 03/09/2001 FCC 3.8  FN_CHARGE_PICKUP added. Change for new ICCF model for LD module
			   AND  IFLEX COPY RIGHT CLAUSE IS ADDED

10/10/2002 Fcc 4.1 oct 2002 value date added to fn_charge_pickup.

27-OCT-2003 FCC 4.4 Fast Settlement Change : Added function fn_get_new_settle_referral and

01-DEC-2003 FCC 4.4 Fast Settlment Chage : Added new parameter p_tag_ccy_list in function fn_get_new_settle_referral

04-dec-2003 FCC 4.4 Dec 2003 BOUAT TIL#98 Added Fn_TaxOnChgDuring_LIQD for Tax computaion on Charges during Liquidation.

10-JUN-2005 FCC 4.6.2 CITI LS CHANGES Added functions fn_pickup_fees,fn_check_for_fees as FEE Enchancements

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
End olpks_subsystem;
/
CREATE or replace SYNONYM olpkss_subsystem FOR olpks_subsystem
/