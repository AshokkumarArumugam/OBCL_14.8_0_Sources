CREATE OR REPLACE PACKAGE tlpks_revaluation IS

/*----------------------------------------------------------------------------------------------------
**
** File Name	:tlpks_revaluation.spc
**
** Module	:LT - SECONDARY LOAN TRADING
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
*/
/*---------------------------------CHANGE HISTORY-----------------------------------------------
23-JUL-2008 FLEXCUBE V.CL 7.4 RELEASE ,NEW UNIT CREATED 
25-NOV-2010 FLEXCUBE V.CL Release 7.8 VOL3 FS Tag3 Loan Pricing changes	
------------------------------END CHANGE HISTORY----------------------------------------------
*/
FUNCTION Fn_Reval_Batch
	(
	 p_branch		IN 	tltbs_contract_master.branch%TYPE
	,p_processing_date	IN	DATE
	,p_commit_frequency	IN	NUMBER
	,p_error_code		IN OUT	ertbs_msgs.err_code%TYPE
	,p_error_parameter	IN OUT	VARCHAR2
	)
RETURN BOOLEAN;		
FUNCTION Fn_get_next_reval_date
	(
	 p_portfolio			IN	tltms_portfolio.portfolio%TYPE
	,p_reval_date			IN	DATE
	,p_next_reval_date		OUT	DATE
	,p_error_code			IN OUT	ertbs_msgs.err_code%TYPE
	,p_error_param			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;	
FUNCTION fn_reversal_of_reval
	(
	 p_branch			IN	varchar2
	,p_processing_date		IN	Date
	,p_commit_frequency		IN	Number
	,p_error_code			IN OUT	varchar2
	,p_error_param			IN OUT	varchar2
	)
RETURN BOOLEAN;	

--25-NOV-2010 FLEXCUBE V.CL Release 7.8 VOL3 FS Tag3 Loan Pricing changes start
FUNCTION fn_get_next_reval_date
	(
  	 p_next_reval_date		OUT	DATE
	,p_error_code			IN OUT	ertbs_msgs.err_code%TYPE
	,p_error_param			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION Fn_reval_processing
	(
	 p_contract_ref_no	IN	tltbs_position_contract.contract_ref_no%TYPE
	,p_position_identifier	IN	tltbs_contract_master.position_identifier%TYPE
	,p_cusip_no		IN	tltbs_contract_master.cusip_no%TYPE
	,p_expense_code		IN	tltbs_contract_master.expense_code%TYPE
	,p_market_price		IN	TLTB_REVAL_DETAIL.market_price%TYPE
	,p_reval_date		IN	TLTB_REVAL_DETAIL.reval_date%TYPE
	,p_error_code		IN OUT	ertbs_msgs.err_code%TYPE
	,p_error_parameter	IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--25-NOV-2010 FLEXCUBE V.CL Release 7.8 VOL3 FS Tag3 Loan Pricing changes end

END tlpks_revaluation;
/
CREATE or replace SYNONYM tlpkss_revaluation FOR tlpks_revaluation
/