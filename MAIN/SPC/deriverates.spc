CREATE OR REPLACE PACKAGE deriverates AS
/*------------------------------------------------------------------------------------------
**
** This source is part of the Oracle FLEXCUBE Software Product.
** Copyright (R) 2016 , Oracle and/or its affiliates.  All rights reserved
**
**
** No part of this work may be reproduced, stored in a retrieval system, adopted
** or transmitted in any form or by any means, electronic, mechanical,
** photographic, graphic, optic recording or otherwise, translated in any
** language or computer language, without the prior written permission of
** Oracle and/or its affiliates.
**
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India
** India
------------------------------------------------------------------------------------------
*/
/*
e History
--	FCC50IT2R1 lot2 SFR 76 currencis auth is taking Infinite time now it will do only for the rate type
--    getting authorised.
--    FCC5.0LOT2ITR2 SFR NO 32 Copy right Clause changed

**
** Changed by 	 : Vinutha Kini
** Changed on 	 : 07-Sep-2016
** Description	 : Core clean up for 12.3Payments
** Search String : Standalone12.3 CleanUp_1
  **
  Changed By         : Vinutha Kini
  Changed On		 : 27-Sep-2016
  Change Description : Retro from 12.2Supp to 12.3Core
  Search String		 : FCUBS_Retro_12.2Supp__12.3Core

----------------------------------------------------------------------------------------------------
*/
--17-MAY-2012 changes starts ...
TYPE ty_ccy_cache Is Table of cytm_rates%Rowtype Index By varchar2(100);
t_ccy_cache ty_ccy_cache;
TYPE Ty_cytb_derived_rates_history Is Table of cytb_derived_rates_history%Rowtype Index By Pls_Integer;
T_cytb_derived_rates_history Ty_cytb_derived_rates_history;
TYPE ty_cytms_derived_rates Is Table of cytms_derived_rates%Rowtype Index By Pls_Integer;
t_cytms_derived_rates ty_cytms_derived_rates;
--SFR#15826916 changes start
TYPE ty_cytb_rates_reval Is Table of cytb_rates_reval%Rowtype Index By Pls_Integer;
t_cytb_rates_reval ty_cytb_rates_reval;
--SFR#15826916 changes end

--FCUBS_Retro_12.2Supp__12.3Core starts
TYPE ty_cytm_drv_index Is Table of Pls_Integer Index By varchar2(100);
t_cytm_drv_index ty_cytm_drv_index;
t_cytm_drv_hist_index ty_cytm_drv_index;
--FCUBS_Retro_12.2Supp__12.3Core ends

cytms_ccy_rec CYTMS_CCY_PAIR_DEFN%ROWTYPE;
l_offset_rec   CYTBS_CCY_PAIR.OFFSET_RECORD%TYPE;
l_offset_rec2   CYTBS_CCY_PAIR.OFFSET_RECORD%TYPE;
l_today DATE;
g_unit varchar2(1):='Y';
g_no_of_units1 number(1);
g_no_of_units2 number(1);
--17-MAY-2012 changes ends ....

PROCEDURE drvrates(
		pm_brcd	cytm_derived_rates.branch_code%type,
		pm_ccy1     cytms_ccy_pair_defn.ccy1%type,
		pm_ccy2     cytms_ccy_pair_defn.ccy2%type ) ;

FUNCTION fn_getdrvRate(
		pBranch		IN		STTMS_CORE_BRANCH.BRANCH_CODE%TYPE, --Standalone12.3 CleanUp_1
		pCcy1			IN 		CYTMS_CCY_DEFN.CCY_CODE%TYPE,
		pCcy2			IN 		CYTMS_CCY_DEFN.CCY_CODE%TYPE,
		pRateType		IN 		CYTMS_RATE_TYPE.CCY_RATE_TYPE%TYPE,
		pMRate		IN OUT  	CYTMS_RATES.MID_RATE%TYPE,
		pBRate		IN OUT  	CYTMS_RATES.BUY_rate%TYPE,
		pSRate		IN OUT  	CYTMS_RATES.SALE_rate%TYPE,
		pRateFlag		IN OUT	NUMBER,
		pErrorCode		IN OUT 	ERTBS_MSGS.ERR_CODE%TYPE )
return BOOLEAN;

-- FCC50IT2R1 lot2 SFR 76
PROCEDURE drvrates(
		pm_brcd	cytm_derived_rates.branch_code%type,
		pm_ccy1     cytms_ccy_pair_defn.ccy1%type,
		pm_ccy2     cytms_ccy_pair_defn.ccy2%type,
		p_rate_type	cytms_rates.rate_type%type
			) ;

END;
/

DROP SYNONYM DERIVERATESS
/
CREATE SYNONYM DERIVERATESS FOR DERIVERATES
/