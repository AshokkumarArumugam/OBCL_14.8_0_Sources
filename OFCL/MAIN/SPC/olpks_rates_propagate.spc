CREATE OR REPLACE PACKAGE olpks_rates_propagate IS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_rates_propagate.spc
**
** Module	      : IF
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
/*------------------------------CHANGE HISTORY-----------------------
23-08-2003 fcc 4.3 AUG 2003 New Package for pool rates propagation.
*/
FUNCTION fn_propagateRates(
	pHO		IN	oltms_branch.branch_code%TYPE,
	pPool_code 	IN	mitms_pool_code.pool_code%TYPE,
	pCCY 		IN	cytms_ccy_defn.ccy_code%TYPE)
RETURN BOOLEAN;


FUNCTION fn_propagateRates(
	pHO		IN	oltms_branch.branch_code%TYPE,
	pEff_date	IN    	DATE,
	pPool_code 	IN	mitms_pool_code.pool_code%TYPE,
	pCCY 		IN	cytms_ccy_defn.ccy_code%TYPE)
RETURN BOOLEAN;

PROCEDURE pr_job_rates_propagate(
	pJob		IN	INTEGER,
	pPool_code 	IN	mitms_pool_code.pool_code%TYPE,
	pCCY 		IN	cytms_ccy_defn.ccy_code%TYPE,
	pHO		IN	oltms_branch.branch_code%TYPE,
	pNode		IN	oltms_branch_node.node%TYPE);

PROCEDURE pr_remote_rate_upd(
	pNode 	   	IN	oltms_branch_node.node%TYPE,
	pPool_code 	IN	mitms_pool_code.pool_code%TYPE,
	pCCY 	   	IN	cytms_ccy_defn.ccy_code%TYPE,
	pEff_date  	IN	DATE,
	pDr_rate   	IN	cytms_rates.mid_rate%TYPE,
	pCr_rate 	IN	cytms_rates.buy_spread%TYPE);

END;
/