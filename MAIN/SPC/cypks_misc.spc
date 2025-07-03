CREATE OR REPLACE PACKAGE cypks_misc IS
/*------------------------------------------------------------------------------------------
**
** This source is part of the Oracle FLEXCUBE Software Product.
** Copyright (R) 2017 , Oracle and/or its affiliates.  All rights reserved
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

--17.07.2002 FCC50IT2R1 lot2 changes overloaded fn_propagateRates for doing only for the given rate code. no logicchange
-- but takes up only those branches which are once_auth = 'Y'(event for closed branches as they can be opened).
      Changed By             :  Himabindu patil
    Changed On             : 27-apr-2015
    Change Description/Solution : 12.1 changes added branch prm in pr_remote_rate_upd
    Search String         : 12.1 changes
	**
	** Changed by 	 : Vinutha Kini
	** Changed on 	 : 26-July-2016
	** Description	 : Core clean up for 12.3Payments
	** Search String : Standalone12.3 CleanUp
  **
  Changed By         : Vinutha Kini
  Changed On		 : 27-Sep-2016
  Change Description : Retro from 12.2Supp to 12.3Core
  Search String		 : FCUBS_Retro_12.2Supp__12.3Core	
**
** Changed By         : Perumal
** Changed On         : 02-Aug-2017
** Change Description : dbms_job to dbms_scheduler conversion changes
** Search String      : FCUBS_12.5_12cR2_Conversion_Changes  
----------------------------------------------------------------------------------------------------*/

/*FUNCTION fn_updCcyPosn(
  pbranch_code IN STTMS_BRANCH.branch_code%TYPE)
RETURN BOOLEAN;*/

FUNCTION fn_propagateRates(
  pHO  IN  STTMS_CORE_BRANCH.branch_code%TYPE,
  pCCY1   IN  CYTMS_CCY_DEFN.ccy_code%TYPE,
  pCCY2   IN  CYTMS_CCY_DEFN.ccy_code%TYPE)
return BOOLEAN;

PROCEDURE pr_job_ccy(
  -- pJob  IN  INTEGER, --FCUBS_12.5_12cR2_Conversion_Changes Commented
  pJob    IN VARCHAR2, --FCUBS_12.5_12cR2_Conversion_Changes Added
  pCCY1   IN  CYTMS_CCY_DEFN.ccy_code%TYPE,
  pCCY2   IN  CYTMS_CCY_DEFN.ccy_code%TYPE,
  pHO    IN  STTMS_CORE_BRANCH.branch_code%TYPE,
  pNode    IN  STTMS_BRANCH_NODE.node%TYPE,
  p_rate_type IN   cytms_rates.rate_type%type);



PROCEDURE pr_remote_rate_upd(
  pNode        IN  STTMS_BRANCH_NODE.node%TYPE,
  pCCY1        IN  CYTMS_CCY_DEFN.ccy_code%TYPE,
  pCCY2        IN  CYTMS_CCY_DEFN.ccy_code%TYPE,
  pRateType    IN  CYTMS_RATES.rate_type%TYPE,
  pMidRate     IN  CYTMS_RATES.mid_rate%TYPE,
  pBuySpread   IN  CYTMS_RATES.buy_spread%TYPE,
  pSaleSpread   IN  CYTMS_RATES.sale_spread%TYPE,
  pBuyRate   IN  CYTMS_RATES.buy_rate%TYPE,
  pSaleRate   IN  CYTMS_RATES.sale_rate%TYPE,
  pRate_Date    IN    CYTMS_RATES.rate_date%TYPE,
  pRate_Serial   IN    CYTMS_RATES.rate_serial%TYPE
  --12.1 changes start
  ,pBranch IN STTMS_CORE_BRANCH.BRANCH_CODE%TYPE  );
  --12.1 changes start

  --FCUBS_Retro_12.2Supp__12.3Core starts
  PROCEDURE Pr_Set_Skip_Kernel;
  PROCEDURE Pr_Set_Activate_Kernel;
  PROCEDURE Pr_Set_Skip_Cluster;
  PROCEDURE Pr_Set_Activate_Cluster;
  FUNCTION Fn_Skip_Custom  RETURN BOOLEAN;
  FUNCTION Fn_Skip_Kernel  RETURN BOOLEAN;
  FUNCTION Fn_Skip_Cluster RETURN BOOLEAN;
  --FCUBS_Retro_12.2Supp__12.3Core ends

FUNCTION fn_propagateRates(
  pHO  IN  STTMS_CORE_BRANCH.branch_code%TYPE,
  pCCY1   IN  CYTMS_CCY_DEFN.ccy_code%TYPE,
  pCCY2   IN  CYTMS_CCY_DEFN.ccy_code%TYPE,
  p_rate_type IN   CYTM_RATES.RATE_TYPE%TYPE)
return BOOLEAN;

--FCC 5.1 LOT 1 GULF BANK RELEASE chANges starts..

--Standalone12.3 CleanUp Start
/*FUNCTION fn_populate_gtemp (
pccy1    IN CYTMS_CCY_DEFN.ccy_code%TYPE,
pCCY2   IN  CYTMS_CCY_DEFN.ccy_code%TYPE
)
RETURN BOOLEAN;*/
--Standalone12.3 CleanUp End

--FCC 5.1 LOT 1 GULF BANK RELEASE changes ends

END;
/
create or replace synonym cypkss_misc for cypks_misc
/