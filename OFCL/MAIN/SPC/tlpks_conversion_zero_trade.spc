CREATE OR REPLACE PACKAGE tlpks_conversion_zero_trade
AS
/*-------------------------------------------------------------------------------------------------
**
** File Name	:tlpks_conversion_zero_trade.SPC
**
** Module	:SECONDARY LOAN TRADING
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
/*CHANGE HISTORY
31-JUL-2009 SLT Conversion (Position Creation) changes,New package Created.
*/
FUNCTION fn_process
	(
	p_branch			IN	oltbs_contract.branch%TYPE,
	p_origination		IN  varchar2 default 'N'
	)
RETURN BOOLEAN;
FUNCTION fn_process_a_contract
	(
	p_branch			IN	oltbs_contract.branch%TYPE
	,p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE
	)
RETURN BOOLEAN;
FUNCTION fn_process_a_participant
	(
	p_branch			IN		oltbs_contract.branch%TYPE
	,p_contract_ref_no	IN		oltbs_contract.contract_ref_no%TYPE
	,p_participant		IN		lbtbs_contract_participant.participant%TYPE
	,p_trade_ref_no		OUT		oltbs_contract.contract_ref_no%TYPE
	,p_err_code		IN OUT	VARCHAR2
	,p_err_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
END tlpks_conversion_zero_trade;
/