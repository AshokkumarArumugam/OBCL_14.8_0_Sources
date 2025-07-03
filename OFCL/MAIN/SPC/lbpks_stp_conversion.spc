create or replace package lbpks_stp_conversion as
/*-------------------------------------------------------------------------------------------------
**
** File Name	:	lbpks_stp_conversion.spc
**
** Module		:	SECONDARY LOAN TRADING
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
---------------------------------------------------------------------------------------------------
*/
/*
CHANGE HISTORY
20-DEC-2011 CITIUS-LS#12038 CFPI - Conversion related changes.
*/


FUNCTION Fn_commitment_link
	(p_commitment_ref_no 	IN VARCHAR2,
	p_err_code      		OUT  VARCHAR2,
	p_err_param     		OUT  VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION Fn_commitment_fee_conv
	(p_commitment_ref_no 	IN VARCHAR2,
	p_err_code      		OUT  VARCHAR2,
	p_err_param     		OUT  VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION Fn_lc_fee_conv
	(p_commitment_ref_no 	IN VARCHAR2,
	p_err_code      		OUT  VARCHAR2,
	p_err_param     		OUT  VARCHAR2
	)
RETURN BOOLEAN;
FUNCTION Fn_loan_link
	(p_commitment_ref_no 	IN VARCHAR2,
	p_err_code      		OUT  VARCHAR2,
	p_err_param     		OUT  VARCHAR2
	)
RETURN BOOLEAN;
FUNCTION Fn_loan_interest_conv
	(p_commitment_ref_no 	IN VARCHAR2,
	p_err_code      		OUT  VARCHAR2,
	p_err_param     		OUT  VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION Fn_loan_prime_interest_conv
	(p_commitment_ref_no 	IN VARCHAR2,
	p_err_code      		OUT  VARCHAR2,
	p_err_param     		OUT  VARCHAR2
	)
RETURN BOOLEAN ;

FUNCTION Fn_mnemonic_propagation_ld
	(	p_contract_ref_no 	oltbs_contract.contract_ref_no%type,
	p_branch			oltbs_contract.branch%type,	
	p_customer			oltbs_contract.counterparty%type,
	p_currency			oltbs_contract.contract_ccy%type,
	p_ssi_mnemonic		OLTM_INSTR.ssi_mnemonic%type,
	p_settlement_seq_no	OLTM_INSTR.settlement_seq_no%type

	)
RETURN BOOLEAN;

FUNCTION Fn_loan_link_agywrp
	(p_commitment_ref_no 	IN VARCHAR2,
	p_err_code      		OUT  VARCHAR2,
	p_err_param     		OUT  VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION Fn_commitment_fee_conv_agywrp
	(p_commitment_ref_no 	IN   VARCHAR2,
	 p_err_code      		OUT  VARCHAR2,
	 p_err_param     		OUT  VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION Fn_commitment_link_agywrp
	(p_commitment_ref_no 	IN 	 VARCHAR2,
	 p_err_code      		OUT  VARCHAR2,
	 p_err_param     		OUT  VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION Fn_loan_interest_conv_agywrp
	(p_commitment_ref_no 	IN VARCHAR2,
	p_err_code      		OUT  VARCHAR2,
	p_err_param     		OUT  VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION Fn_loan_interest_conv_class
	(p_commitment_ref_no 	IN VARCHAR2,
	p_err_code      		OUT  VARCHAR2,
	p_err_param     		OUT  VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION Fn_loan_link_class
	(p_commitment_ref_no 	IN VARCHAR2,
	p_err_code      		OUT  VARCHAR2,
	p_err_param     		OUT  VARCHAR2
	)
RETURN BOOLEAN;

End lbpks_stp_conversion;
/