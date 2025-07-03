CREATE OR REPLACE PACKAGE olpks_bo_cypks AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : olpks_bo_cypks.SPC
**
** Module       : IF
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
Change History
Change History:
09-11-2001 Citilatam Retro SFR 5 Added a overloaded function fn_amt1_to_amt2(with 11 args)
*/


FUNCTION olfn_format_amt (
		pCcy 	IN  CYTMS_CCY_DEFN.ccy_code%TYPE,
		pAmt 	IN NUMBER)
RETURN VARCHAR2;

PRAGMA RESTRICT_REFERENCES
	(
	olfn_format_amt,
	WNPS,
	WNDS
	)
	;

FUNCTION fn_getRateAndSpread(
		pBranch		IN	oltms_branch.BRANCH_CODE%TYPE,
		pCcy1		IN 	CYTMS_CCY_DEFN.CCY_CODE%TYPE,
		pCcy2		IN 	CYTMS_CCY_DEFN.CCY_CODE%TYPE,
		pRateType	IN 	CYTMS_RATE_TYPE.CCY_RATE_TYPE%TYPE,
		pIndicator	IN     	CHAR,
		pRate		IN OUT  CYTMS_RATES.MID_RATE%TYPE,
		pRateFlag	IN OUT	NUMBER,
		pSpread		IN OUT	CYTMS_RATES.BUY_SPREAD%TYPE,
		pQuote		OUT		CYTBS_CCY_PAIR.QUOTATION%TYPE,
		pErrorCode	IN OUT 	ERTBS_MSGS.ERR_CODE%TYPE )
return BOOLEAN;

PRAGMA RESTRICT_REFERENCES
	(
	fn_getRateAndSpread,
	WNPS,
	WNDS
	)
	;

FUNCTION fn_getRate(
		pBranch		IN	oltms_branch.BRANCH_CODE%TYPE,
		pCcy1		IN 	CYTMS_CCY_DEFN.CCY_CODE%TYPE,
		pCcy2		IN 	CYTMS_CCY_DEFN.CCY_CODE%TYPE,
		pRateType	IN 	CYTMS_RATE_TYPE.CCY_RATE_TYPE%TYPE,
		pIndicator	IN     	CHAR,
		pRate		IN OUT  CYTMS_RATES.MID_RATE%TYPE,
		pRateFlag	IN OUT	NUMBER,
		pErrorCode	IN OUT 	ERTBS_MSGS.ERR_CODE%TYPE )
return BOOLEAN;

PRAGMA RESTRICT_REFERENCES
	(
	fn_getRate,
	WNPS,
	WNDS
	)
	;

FUNCTION fn_getRate(
		pBranch		IN	oltms_branch.BRANCH_CODE%TYPE,
		pCcy1		IN 	CYTMS_CCY_DEFN.CCY_CODE%TYPE,
		pCcy2		IN 	CYTMS_CCY_DEFN.CCY_CODE%TYPE,
		pRateType		IN 	CYTMS_RATE_TYPE.CCY_RATE_TYPE%TYPE,
		pIndicator	IN   CHAR,
		pDate		IN	DATE,
		pBranchDate	IN	DATE ,
		pRate		IN OUT   	CYTMS_RATES.MID_RATE%TYPE,
		pRateFlag		IN OUT	NUMBER,
		pErrorCode	IN OUT 	ERTBS_MSGS.ERR_CODE%TYPE )
return BOOLEAN;

PRAGMA RESTRICT_REFERENCES
	(
	fn_getRate,
	WNPS,
	WNDS
	)
	;

FUNCTION fn_getRate(
		pBranch		IN	oltms_branch.BRANCH_CODE%TYPE,
		pCcy1		IN 	CYTMS_CCY_DEFN.CCY_CODE%TYPE,
		pCcy2		IN 	CYTMS_CCY_DEFN.CCY_CODE%TYPE,
		pRate		IN OUT  CYTMS_RATES.MID_RATE%TYPE,
		pRateFlag		IN OUT	NUMBER,
		pErrorCode	IN OUT 	ERTBS_MSGS.ERR_CODE%TYPE )
return BOOLEAN;

PRAGMA RESTRICT_REFERENCES
	(
	fn_getRate,
	WNPS,
	WNDS
	)
	;

FUNCTION fn_getRate(
		pBranch		IN	oltms_branch.BRANCH_CODE%TYPE,
		pCcy1		IN 	CYTMS_CCY_DEFN.CCY_CODE%TYPE,
		pCcy2		IN 	CYTMS_CCY_DEFN.CCY_CODE%TYPE,
		pDate		IN	DATE,
		pBranchDate	IN	DATE ,
		pRate		IN OUT  CYTMS_RATES.MID_RATE%TYPE,
		pRateFlag		IN OUT	NUMBER,
		pErrorCode	IN OUT 	ERTBS_MSGS.ERR_CODE%TYPE )
return BOOLEAN;

PRAGMA RESTRICT_REFERENCES
	(
	fn_getRate,
	WNPS,
	WNDS
	)
	;

FUNCTION fn_amt_to_rate(
		pCcy1		IN 	CYTMS_CCY_DEFN.CCY_CODE%TYPE,
		pCcy2		IN 	CYTMS_CCY_DEFN.CCY_CODE%TYPE,
		pAmount1	IN	NUMBER,
		pAmount2	IN	NUMBER,
		pRate		OUT   	CYTMS_RATES.MID_RATE%TYPE)
return BOOLEAN;

PRAGMA RESTRICT_REFERENCES
	(
	fn_amt_to_rate,
	WNPS,
	WNDS
	)
	;

FUNCTION fn_amt_round (
		pCcy in CYTMS_CCY_DEFN.ccy_code%TYPE,
		pAmount in number,
		p_rounded_amt out number )
return BOOLEAN;

PRAGMA RESTRICT_REFERENCES
	(
	fn_amt_round,
	WNPS,
	WNDS
	)
	;

FUNCTION fn_amt1_to_amt2 (
	pBranch 	IN	oltms_branch.BRANCH_CODE%TYPE,
	pCcy1 		IN 	CYTMS_CCY_DEFN.CCY_CODE%TYPE,
	pCcy2 		IN 	CYTMS_CCY_DEFN.CCY_CODE%TYPE,
	pRateType 	IN 	CYTMS_RATE_TYPE.CCY_RATE_TYPE%TYPE,
	pRateIndicator 	IN 	varchar2,
	pAmount1 	IN 	number,
	pRounding 	IN 	CHAR,
	pAmount2 	OUT 	number,
	pRate		IN OUT	CYTMS_RATES.MID_RATE%TYPE,
	pErrorCode	IN OUT	ERTBS_MSGS.ERR_CODE%TYPE)
return BOOLEAN;

PRAGMA RESTRICT_REFERENCES
	(
	fn_amt1_to_amt2,
	WNPS,
	WNDS
	)
	;

FUNCTION fn_amt1_to_amt2 (
	pBranch 	IN	oltms_branch.BRANCH_CODE%TYPE,
	pCcy1 		IN 	CYTMS_CCY_DEFN.CCY_CODE%TYPE,
	pCcy2 		IN 	CYTMS_CCY_DEFN.CCY_CODE%TYPE,
	pAmount1 	IN 	number,
	pRounding	IN	CHAR DEFAULT 'N',
	pAmount2 	OUT 	number,
	pRate		IN OUT	CYTMS_RATES.MID_RATE%TYPE,
	pErrorCode	IN OUT	ERTBS_MSGS.ERR_CODE%TYPE)
return BOOLEAN;

PRAGMA RESTRICT_REFERENCES
	(
	fn_amt1_to_amt2,
	WNPS,
	WNDS
	)
	;

FUNCTION fn_amt1_to_amt2 (
	pCcy1 		IN 	CYTMS_CCY_DEFN.CCY_CODE%TYPE,
	pCcy2 		IN 	CYTMS_CCY_DEFN.CCY_CODE%TYPE,
	pAmount1 	IN 	number,
	pRate		IN 	CYTMS_RATES.MID_RATE%TYPE,
	pRounding	IN	CHAR DEFAULT 'N',
	pAmount2 	OUT 	number,
	pErrorCode	IN OUT	ERTBS_MSGS.ERR_CODE%TYPE)
return BOOLEAN;

PRAGMA RESTRICT_REFERENCES
	(
	fn_amt1_to_amt2,
	WNPS,
	WNDS
	)
	;

FUNCTION fn_amt1_to_amt2
	(
	pBranch 		IN		oltms_branch.BRANCH_CODE%TYPE,
	pCcy1 		IN 		CYTMS_CCY_DEFN.CCY_CODE%TYPE,
	pCcy2 		IN 		CYTMS_CCY_DEFN.CCY_CODE%TYPE,
	pRateType 		IN 		CYTMS_RATE_TYPE.CCY_RATE_TYPE%TYPE,
	pRateIndicator 	IN 		VARCHAR2,
	pDate			IN		DATE,
	pBranchDate		IN		DATE ,
	pAmount1 		IN 		NUMBER,
	pRounding 		IN 		CHAR,
	pAmount2 		OUT 		NUMBER,
	pRate			IN OUT	CYTMS_RATES.MID_RATE%TYPE,
	pErrorCode		IN OUT	ERTBS_MSGS.ERR_CODE%TYPE
	)
	RETURN BOOLEAN;

PRAGMA RESTRICT_REFERENCES
	(
	fn_amt1_to_amt2,
	WNPS,
	WNDS
	)
	;
--The following function added as part of Citilatam Retro 09-Nov-2001 SFR 5
--PLNCITI  10/08/01 
FUNCTION fn_amt1_to_amt2
	(
	pBranch 		IN		oltms_branch.BRANCH_CODE%TYPE,
	pCcy1 		IN 		CYTMS_CCY_DEFN.CCY_CODE%TYPE,
	pCcy2 		IN 		CYTMS_CCY_DEFN.CCY_CODE%TYPE,
	pRateType 		IN 		CYTMS_RATE_TYPE.CCY_RATE_TYPE%TYPE,
	pRateIndicator 	IN 		VARCHAR2,
	pDate			IN		DATE,
	pAmount1 		IN 		NUMBER,
	pRounding 		IN 		CHAR,
	pAmount2 		OUT 		NUMBER,
	pRate			IN OUT	CYTMS_RATES.MID_RATE%TYPE,
	pErrorCode		IN OUT	ERTBS_MSGS.ERR_CODE%TYPE
	)
	RETURN BOOLEAN;

PRAGMA RESTRICT_REFERENCES
	(
	fn_amt1_to_amt2,
	WNPS,
	WNDS
	)
	;
--PLNCITI 10/08/01 
--CITILATAM Retro ends

FUNCTION fn_LastRateDate(
		pBranch		IN	oltms_branch.BRANCH_CODE%TYPE,
		pCcy1		IN 	CYTMS_CCY_DEFN.CCY_CODE%TYPE,
		pCcy2		IN 	CYTMS_CCY_DEFN.CCY_CODE%TYPE)
return DATE;

PRAGMA RESTRICT_REFERENCES
	(
	fn_LastRateDate,
	WNPS,
	WNDS
	)
	;

FUNCTION fn_PurgeRateHistory(
		pBranch		IN	oltms_branch.BRANCH_CODE%TYPE,
		pDate		IN 	DATE)
return BOOLEAN;

procedure pr_pop_master(
	pm_job		integer,
   pm_node     oltms_branch_node.node%type,
   pm_ccy1     cytms_ccy_pair_defn.ccy1%type,
   pm_ccy2     cytms_ccy_pair_defn.ccy2%type,
   pm_maker    cytms_ccy_pair_defn.maker_id%type,
   pm_cheker   cytms_ccy_pair_defn.checker_id%type,
   pm_makdt    cytms_ccy_pair_defn.maker_dt_stamp%type,
   pm_chekdt   cytms_ccy_pair_defn.checker_dt_stamp%type);

procedure pr_fire_job(
	pm_what		varchar2);

FUNCTION fn_eurtype(
			pEurCcy	IN  CYTMS_CCY_DEFN.CCY_CODE%TYPE )
RETURN CHAR;

PRAGMA RESTRICT_REFERENCES (fn_EURTYPE, WNDS, WNPS);

END;
/
CREATE OR REPLACE SYNONYM olpks_bo_cypkss FOR olpks_bo_cypks
/