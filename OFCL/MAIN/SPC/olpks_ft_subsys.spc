CREATE OR REPLACE PACKAGE olpks_ft_subsys
IS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_ft_subsys.SPC
**
** Module		: FUNDS TRANSFER
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
change history

24/11/2001	MT191 ,CHARGE CLAIM change

30-JUN-2003 FCC 4.3 DEV AUG 2003 STG Changes
			Included a new function fn_charge_pickup. This function will be called on click of the ICCF
			button in the FT Contract Online Screen.
04-AUG-2005	FCC 4.6.2 CITILS 04-AUG-2005 - Netting Changes
		-- Added a new Procedure FN_SETTLEMENT_PICKUP_ALL
*/



g_iccf_pickup BOOLEAN;
g_chgclaim_pickup BOOLEAN;		--MT191
g_tax_pickup BOOLEAN;
g_settle_pickup BOOLEAN;

FUNCTION ICCF RETURN BOOLEAN;

FUNCTION CHGCLAIM RETURN BOOLEAN; -- MT191

FUNCTION TAX RETURN BOOLEAN;

FUNCTION SETTLE RETURN BOOLEAN;

PROCEDURE PR_NO_ICCF;

PROCEDURE PR_NO_CHGCLAIM;		  --MT191

PROCEDURE PR_NO_TAX;

PROCEDURE PR_NO_SETTLE;

PROCEDURE PR_YES_ICCF;

PROCEDURE PR_YES_CHGCLAIM;		  --MT191

PROCEDURE PR_YES_TAX;

PROCEDURE PR_YES_SETTLE;

FUNCTION FN_TAX_PICKUP(
		p_contract_ref_no	IN	OLTBS_FTTB_CONTRACT_MASTER.CONTRACT_REF_NO%TYPE
		,p_esn			IN	OLTBS_FTTB_CONTRACT_MASTER.EVENT_SEQ_NO%TYPE
		,p_sobr			IN	oltbs_contract.BRANCH%TYPE
		,p_br_date			IN	DATE
		,p_lcy			IN	OLTBS_FTTB_CONTRACT_MASTER.DR_CCY%TYPE
		,prm_iccf_tags		OUT	VARCHAR2
		,prm_iccf_ccys		OUT	VARCHAR2
		,prm_tax_tags		OUT	VARCHAR2
		,prm_tax_ccys		OUT	VARCHAR2
		, p_errcode		OUT 	VARCHAR2) RETURN BOOLEAN;

--MT191
FUNCTION FN_CHGCLAIM_PICKUP (
		 p_contract_ref_no	IN			  OLTBS_FTTB_CONTRACT_MASTER.CONTRACT_REF_NO%TYPE,
		 p_esn				IN			  OLTBS_FTTB_CONTRACT_MASTER.EVENT_SEQ_NO%TYPE,
		 p_sobr				IN			  oltbs_contract.BRANCH%TYPE,
		 p_br_date			IN			  DATE,
		 p_lcy				IN			  OLTBS_FTTB_CONTRACT_MASTER.DR_CCY%TYPE,
		 p_errcode			OUT     	  VARCHAR2) RETURN BOOLEAN;
--

FUNCTION FN_SETTLEMENT_PICKUP(
		p_contract_ref_no	IN	OLTBS_FTTB_CONTRACT_MASTER.CONTRACT_REF_NO%TYPE
		,p_esn			IN	OLTBS_FTTB_CONTRACT_MASTER.EVENT_SEQ_NO%TYPE
		,p_sobr			IN	oltbs_contract.BRANCH%TYPE
		,p_br_date			IN	DATE
		,p_lcy			IN	OLTBS_FTTB_CONTRACT_MASTER.DR_CCY%TYPE
		,prm_iccf_tags		IN OUT	VARCHAR2
		,prm_iccf_ccys		IN OUT	VARCHAR2
		,prm_tax_tags		IN OUT	VARCHAR2
		,prm_tax_ccys		IN OUT	VARCHAR2
		,prm_sett_tags		IN OUT	VARCHAR2
		,prm_sett_ccys		IN OUT	VARCHAR2
		,p_errcode		OUT 		VARCHAR2
		,p_upld_flg		IN 		CHAR DEFAULT 'N'
) RETURN BOOLEAN;

FUNCTION FN_SUMMARY_ICCF_REFERRAL (
		p_contract_ref_no	IN  OLTBS_FTTB_CONTRACT_MASTER.CONTRACT_REF_NO%TYPE
		, p_esn			IN  OLTBS_FTTB_CONTRACT_MASTER.CONTRACT_REF_NO%TYPE
		, p_sobr			IN	oltbs_contract.BRANCH%TYPE
		, p_br_date			IN	DATE
		, p_lcy			IN	OLTBS_FTTB_CONTRACT_MASTER.DR_CCY%TYPE
		, tagList 			OUT VARCHAR2
		, amountList 		OUT VARCHAR2
		, lcyAmountList	IN OUT VARCHAR2
		, ccyList 		OUT VARCHAR2
		, vdateList 		OUT VARCHAR2
		, p_all_reqd		IN	VARCHAR2
		, p_errcode 		IN OUT VARCHAR2)
RETURN BOOLEAN;

--30-JUN-2003 FCC 4.3 DEV AUG 2003 STG CHANGES BEGIN
FUNCTION fn_charge_pickup
	(p_contract_ref_no	IN		oltbs_contract.contract_ref_no%TYPE
	,p_event_seq_no		IN		oltbs_contract.latest_event_seq_no%TYPE
	,p_event_code		IN		oltbs_contract.curr_event_code%TYPE
	,p_party			IN		oltbs_contract.counterparty%TYPE
	,p_ccy				IN		cytms_ccy_defn.ccy_code%TYPE
    ,p_value_date		IN		DATE
	,p_basis_amount_tag	IN		VARCHAR2
	,p_list_of_amount	IN		VARCHAR2
	,p_list_of_ccy		IN		VARCHAR2
	,p_error_code 		IN	OUT VARCHAR2
	,p_error_param		IN	OUT	VARCHAR2
	)
RETURN BOOLEAN;
--30-JUN-2003 FCC 4.3 DEV AUG 2003 STG CHANGES END

-- FCC 4.6.2 CITILS 04-AUG-2005 - Netting Changes
FUNCTION FN_SETTLEMENT_PICKUP_ALL(
		p_contract_ref_no	IN	OLTBS_FTTB_CONTRACT_MASTER.CONTRACT_REF_NO%TYPE
		,p_esn			IN	OLTBS_FTTB_CONTRACT_MASTER.EVENT_SEQ_NO%TYPE
		,p_sobr			IN	oltbs_contract.BRANCH%TYPE
		,p_br_date			IN	DATE
		,p_lcy			IN	OLTBS_FTTB_CONTRACT_MASTER.DR_CCY%TYPE
		,prm_iccf_tags		IN OUT	VARCHAR2
		,prm_iccf_ccys		IN OUT	VARCHAR2
		,prm_tax_tags		IN OUT	VARCHAR2
		,prm_tax_ccys		IN OUT	VARCHAR2
		,prm_sett_tags		IN OUT	VARCHAR2
		,prm_sett_ccys		IN OUT	VARCHAR2
		, p_errcode		OUT	VARCHAR2
		,p_upld_flg		IN		CHAR DEFAULT 'N'
		) RETURN BOOLEAN ;
-- FCC 4.6.2 CITILS 04-AUG-2005 - Netting Changes
END olpks_ft_subsys;
/
create or replace synonym olpkss_ft_subsystem for olpks_ft_subsys
/