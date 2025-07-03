CREATE OR REPLACE PACKAGE lfpks_floatingrate IS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : lfpks_floatingrate.SPC
**
** Module       : INTEREST, COMMISSION, CHARGES, FEES (ICCF)
**
This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------*/
/*
changes history 

05-dec-2003 FCC 4.4 itr1 SFR 110  conversion problems

4-AUG-2004 FCC 4.6 Derivatives Retro 
*/


FUNCTION fn_propagateRates(
	pHO			IN	oltms_branch.branch_code%type,
	pRATE_CODE 		IN	lftms_rate_code_defn.rate_code%type,
	pTENOR_CODE 	IN	lftms_tenor_code_defn.tenor_code%type,
	pCCY_CODE 		IN	CYTMS_CCY_DEFN.ccy_code%type,
	pEFFECTIVE_DATE 	IN	lftms_rate_master.effective_date%type,
	pMOD_NO		IN	lftms_rate_master.mod_no%type,
	pRECORD_STAT 	IN	lftms_rate_master.record_stat%type
	)
return BOOLEAN;

FUNCTION fn_propagate_rates_for_node
	(
	pHO			IN	oltms_branch.branch_code%TYPE,
	pRATE_CODE 		IN	lftms_rate_code_defn.rate_code%TYPE,
	pTENOR_CODE 	IN	lftms_tenor_code_defn.tenor_code%TYPE,
	pRATE_SOURCE  	IN	lftms_rate_source_defn.rate_source%TYPE,
	pCCY_CODE	 	IN	CYTMS_CCY_DEFN.ccy_code%TYPE,
	pEFFECTIVE_DATE	IN 	lftms_rate_master.effective_date%TYPE,
	pMOD_NO		IN	lftms_rate_master.mod_no%TYPE,
	pRECORD_STAT 	IN	lftms_rate_master.record_stat%TYPE
	)
RETURN BOOLEAN;

FUNCTION fn_propagate_for_other_nodes
	(
	pHO			IN		oltms_branch.branch_code%TYPE,
	pRATE_CODE 		IN		lftms_rate_code_defn.rate_code%TYPE,
	pTENOR_CODE 	IN		lftms_tenor_code_defn.tenor_code%TYPE,
	pRATE_SOURCE  	IN		lftms_rate_source_defn.rate_source%TYPE,
	pCCY_CODE		IN		CYTMS_CCY_DEFN.ccy_code%TYPE,
	pEFFECTIVE_DATE	IN 		lftms_rate_master.effective_date%TYPE,
	pMOD_NO		IN		lftms_rate_master.mod_no%TYPE,
	pRECORD_STAT 	IN		lftms_rate_master.record_stat%TYPE
	)
	RETURN BOOLEAN;
END;
/
CREATE or replace SYNONYM lfpkss_floatingrate FOR lfpks_floatingrate
/