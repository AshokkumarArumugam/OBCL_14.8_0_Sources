CREATE OR REPLACE PACKAGE cypks AS
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Software Product.
** Copyright (R) 2016 - 2020 , Oracle and/or its affiliates.  All rights reserved
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
/* CHANGE HISTORY
1. FCC3.3 Rel - FUNCTION fn_indtype added for Indexed Securities/Loans changes for ICEBANK

2.fcc4.1 str1 PRAGMA RESTRICT_REFERENCES (fn_EURTYPE, WNDS, WNPS); has been commented

3. FCC5.0 Lot2 Changes Currency Cache to be available to all packages.

4. 06-Aug-2002 FCC 5.0 LOT2 ITR2 SCF 32 Changed the CopyRight Clause

5. 26-NOV-2002 FCC 5.1 ISKICE SFR # 66 Made the Function fn_indtype as Pragma Restricted..Just like fn_eurtype

6. 06/05/2004 FCC5.6 performance change done to change binary index variable to varchar2 in pl/sql tables
              and removing the call to fn_hash40. Look for tag -- FCC5.6 performance change
7. 17/02/2004 FCC6.1 German Tax change added a overloaded function FN_AMT_ROUND with seven parameters.

8. 23-feb-2004 fcc6.1 Changes made for rate serial and rate date based exchange rate pick up
        -- added new overload functions
            fn_getrateandspread
            fn_getrate
            fn_amt1_to_amt2
            only the definitions

**  Modified By         : Pradeep
**  Modified On         : 12-Mar-2010
**  Modified Reason     : Changes done as part of FCUBS11.1 MB0235 to handle the customer specific exchange rate
**  Search String       : 12-Mar-10 FCUBS11.1 MB0235

**  Modified By         : krishnarjuna
**  Modified On         : 11-Dec-2010
**  Modified Reason     : Fcubs 11.2 itr2 sfr#255
**  Search String       : SFR#255

**  Modified By         : Suresh Sangapu
**  Modified On         : 27-Mar-2014
**  Modified Reason     : After maintainning the currency pair in CYDCCYPR the currency pair is not inserting into CYTM_RATES_MASTER table due to   this isuse not able to maintain the exchange rates for new currency pair
**  Search String       : Bug#18386831

   SFR Number         : 18885121
   Changed By         : shashanka koormachalam
   Problem desc       : In excel upload, when there are multiple pairs to be uploaded then the
                        below mentioned error occurs as the time stamp is being passed only at once .i.e when the excel
                        upload is triggered then oracle fetches time stamp once.This same time stamp will be used for all the pther refcords.
                        This time stamp is used in the job name created dynamically.So for all the records same job name will be given.
                        Which cause the below error.
   Change description : To fix the ORA-27477 - job already exists issue.
                        Pass ccy1 and ccy2 as the parameters to cypks.pr_fire_job. Hence the dynamically created scheduler
                        job name will be unique for the sub sequent records of the excel sheet.
   Search String      : 12.0.3supp_18885121
   Changed Date       : 02-jun-2014

        Changed By       : Anjali
   Changed On       : 30-June-2014
   Changed Description   : Extensibilty hooks were provided .Issue was logged when exchange rate doesnot change even when a different value date is entered
   Search String     :  1203_19124988

   **  Modified By       : Pankaj
**  Modified On       : 14-Apr-2014
**  Modified Reason  : 9NT1532 : Performance Tuning : Pragma restrictions does not allow the call to FRC wrapper functions., so Commented the restriction.
**  Search String     : 9NT1532 : Performance Tuning With FRC

    **  Modified By         : SAurabh Mandloi
    **  Modified On         : 07-May-2015
    **  Modified Reason     : Fcubs 12.1 new changes for scheme linkage at account level.
    **  Search String       : 12.1 changes for cust account scheme linkage Saurabh

      Modified By         : Himabindu patil
      Modified on         : 15-07-2015
      Modified Reason     : Changes for bug 21447110, pr_pop_master added one more parameter
      Search string       : Bug 21447110
	**
	** Changed by 	 : Vinutha Kini
	** Changed on 	 : 26-July-2016
	** Description	 : Core clean up for 12.3Payments
	** Search String : Standalone12.3 CleanUp

	** Modified By         : Ravali Vemula
	** Modified On         : 23-Sep-2016
	** Modified Reason     : Function added for OFCL, Corporate Lending 12.3
	** Search String       : OFCL_12.3
	
	Modified by           : Nisha B C
    Modified On          : 24-Apr-2019
    Modified Reason      : FCUBS_JC_Minicore Integration_Currency_V1.1
    Search String        : JC_Minicore Integration_Currency
    
** Modified By      : Vishakha Agrawal
** Modified on      : 12-APR-2022
** Modified Reason  : Issue: AMOUNTS ARE NOT APPEARING IN ACCOUNT STATEMENT FOR TRANSACTIONS WITH 16 DECIMALS
   FIX DETAILS:  Introduced new function in csfn_format_amt_new.
** Search String    : Bug_34168405    
------------------------------------------------------------------------------------------
*/
/* Package to Provide CCY Services - Revamped by BlaC for CitiCube 2.0 */
PKG_RP_FLAG   BOOLEAN:=  FALSE; --12-Mar-10 FCUBS11.1 MB0235

 --1203_19124988 Extensibility Hook changes starts
   PROCEDURE Pr_Set_Skip_Kernel;
   PROCEDURE Pr_Set_Activate_Kernel;
   PROCEDURE Pr_Set_Skip_Cluster;
   PROCEDURE Pr_Set_Activate_Cluster;

   FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
  --1203_19124988 Extensibility Hook changes ends

FUNCTION csfn_format_amt (
        pCcy    IN  CYTMS_CCY_DEFN.ccy_code%TYPE,
        pAmt    IN NUMBER)
RETURN VARCHAR2;

--Bug_34168405 starts
FUNCTION csfn_format_amt_new (
        pCcy    IN  CYTMS_CCY_DEFN.ccy_code%TYPE,
        pAmt    IN NUMBER)  
RETURN VARCHAR2;
----Bug_34168405 ends

FUNCTION fn_getRateAndSpread(
        pBranch     IN  sttms_core_branch.BRANCH_CODE%TYPE,
        pCcy1       IN  CYTMS_CCY_DEFN.CCY_CODE%TYPE,
        pCcy2       IN  CYTMS_CCY_DEFN.CCY_CODE%TYPE,
        pRateType   IN  CYTMS_RATE_TYPE.CCY_RATE_TYPE%TYPE,
        pIndicator  IN      CHAR,
        pRate       IN OUT  CYTMS_RATES.MID_RATE%TYPE,
        pRateFlag   IN OUT  NUMBER,
        pSpread     IN OUT  CYTMS_RATES.BUY_SPREAD%TYPE,
        pQuote      OUT     CYTBS_CCY_PAIR.QUOTATION%TYPE,
        pErrorCode  IN OUT  ERTBS_MSGS.ERR_CODE%TYPE )
return BOOLEAN;

--FC61 overloaded for rate serial related changes
FUNCTION fn_getRateAndSpread
        (
        pBranch IN      sttms_core_branch.BRANCH_CODE%TYPE,
        pCcy1       IN      CYTMS_CCY_DEFN.CCY_CODE%TYPE,
        pCcy2       IN      CYTMS_CCY_DEFN.CCY_CODE%TYPE,
        pRateType   IN      CYTMS_RATE_TYPE.CCY_RATE_TYPE%TYPE,
        pIndicator  IN      CHAR,
        pratedate   IN      DATE,
        pratesrno   IN      cytms_rates.rate_serial%TYPE,
        pRate       IN OUT      CYTMS_RATES.MID_RATE%TYPE,
        pRateFlag   IN OUT  NUMBER,
        pSpread IN OUT  CYTMS_RATES.BUY_SPREAD%TYPE,
        pQuote  OUT     CYTBS_CCY_PAIR.QUOTATION%TYPE,
        pErrorCode  IN OUT  ERTBS_MSGS.ERR_CODE%TYPE )
return BOOLEAN;


--JC_Minicore Integration_Currency starts
FUNCTION get_rate_thruspread(pBranch    IN STTMS_CORE_BRANCH.BRANCH_CODE%TYPE,
                               pCcy1      IN CYTMS_CCY_DEFN.CCY_CODE%TYPE,
                               pCcy2      IN CYTMS_CCY_DEFN.CCY_CODE%TYPE,
                               pCcy3      IN CYTMS_CCY_DEFN.CCY_CODE%TYPE,
                               pRateType  IN CYTMS_RATE_TYPE.CCY_RATE_TYPE%TYPE,
                               pIndicator IN OUT CHAR,
                               pRate      OUT number,
                               pErrorCode IN OUT ERTBS_MSGS.ERR_CODE%TYPE)
RETURN BOOLEAN;
	
FUNCTION get_rate_thruspread(pBranch    IN STTMS_CORE_BRANCH.BRANCH_CODE%TYPE,
                               pCcy1      IN CYTMS_CCY_DEFN.CCY_CODE%TYPE,
                               pCcy2      IN CYTMS_CCY_DEFN.CCY_CODE%TYPE,
                               pCcy3      IN CYTMS_CCY_DEFN.CCY_CODE%TYPE,
                               pRateType  IN CYTMS_RATE_TYPE.CCY_RATE_TYPE%TYPE,
                               pIndicator IN OUT CHAR,
                               pratedate  IN DATE,
                               pratesrno  IN NUMBER,
                               pRate      OUT number,
                               pErrorCode IN OUT ERTBS_MSGS.ERR_CODE%TYPE)
RETURN BOOLEAN;
--JC_Minicore Integration_Currency ends
FUNCTION fn_getRate(
        pBranch     IN  sttms_core_branch.BRANCH_CODE%TYPE,
        pCcy1       IN  CYTMS_CCY_DEFN.CCY_CODE%TYPE,
        pCcy2       IN  CYTMS_CCY_DEFN.CCY_CODE%TYPE,
        pRateType   IN  CYTMS_RATE_TYPE.CCY_RATE_TYPE%TYPE,
        pIndicator  IN      CHAR,
        pRate       IN OUT  CYTMS_RATES.MID_RATE%TYPE,
        pRateFlag   IN OUT  NUMBER,
        pErrorCode  IN OUT  ERTBS_MSGS.ERR_CODE%TYPE )
return BOOLEAN;

FUNCTION fn_getRate(
        pBranch     IN  sttms_core_branch.BRANCH_CODE%TYPE,
        pCcy1       IN  CYTMS_CCY_DEFN.CCY_CODE%TYPE,
        pCcy2       IN  CYTMS_CCY_DEFN.CCY_CODE%TYPE,
        pRateType       IN  CYTMS_RATE_TYPE.CCY_RATE_TYPE%TYPE,
        pIndicator  IN   CHAR,
        pDate       IN  DATE,
        pBranchDate IN  DATE ,
        pRate       IN OUT      CYTMS_RATES.MID_RATE%TYPE,
        pRateFlag       IN OUT  NUMBER,
        pErrorCode  IN OUT  ERTBS_MSGS.ERR_CODE%TYPE )
return BOOLEAN;

FUNCTION fn_getRate(
        pBranch     IN  sttms_core_branch.BRANCH_CODE%TYPE,
        pCcy1       IN  CYTMS_CCY_DEFN.CCY_CODE%TYPE,
        pCcy2       IN  CYTMS_CCY_DEFN.CCY_CODE%TYPE,
        pRate       IN OUT  CYTMS_RATES.MID_RATE%TYPE,
        pRateFlag       IN OUT  NUMBER,
        pErrorCode  IN OUT  ERTBS_MSGS.ERR_CODE%TYPE )
return BOOLEAN;

FUNCTION fn_getRate(
        pBranch     IN  sttms_core_branch.BRANCH_CODE%TYPE,
        pCcy1       IN  CYTMS_CCY_DEFN.CCY_CODE%TYPE,
        pCcy2       IN  CYTMS_CCY_DEFN.CCY_CODE%TYPE,
        pDate       IN  DATE,
        pBranchDate IN  DATE ,
        pRate       IN OUT  CYTMS_RATES.MID_RATE%TYPE,
        pRateFlag       IN OUT  NUMBER,
        pErrorCode  IN OUT  ERTBS_MSGS.ERR_CODE%TYPE )
return BOOLEAN;

--FC61 rate serial related changes
FUNCTION fn_getRate(
        pBranch IN      sttms_core_branch.BRANCH_CODE%TYPE,
        pCcy1       IN      CYTMS_CCY_DEFN.CCY_CODE%TYPE,
        pCcy2       IN      CYTMS_CCY_DEFN.CCY_CODE%TYPE,
        pRateType   IN      CYTMS_RATE_TYPE.CCY_RATE_TYPE%TYPE,
        pIndicator  IN      CHAR,
        pDate       IN      DATE,
        pBranchDate IN      DATE ,
        pratesrno   IN      cytms_rates.rate_serial%TYPE,
        pRate       IN OUT  CYTMS_RATES.MID_RATE%TYPE,
        pRateFlag   IN OUT  NUMBER,
        pErrorCode  IN OUT  ERTBS_MSGS.ERR_CODE%TYPE )
return BOOLEAN;


FUNCTION fn_amt_to_rate(
        pCcy1       IN  CYTMS_CCY_DEFN.CCY_CODE%TYPE,
        pCcy2       IN  CYTMS_CCY_DEFN.CCY_CODE%TYPE,
        pAmount1    IN  NUMBER,
        pAmount2    IN  NUMBER,
        pRate       OUT     CYTMS_RATES.MID_RATE%TYPE)
return BOOLEAN;

FUNCTION fn_amt_round (
        pCcy in CYTMS_CCY_DEFN.ccy_code%TYPE,
        pAmount in number,
        p_rounded_amt out number )
return BOOLEAN;

--fcc6.1 german tax change starts
FUNCTION fn_amt_round (
        pCcy        IN  CYTMS_CCY_DEFN.CCY_CODE%TYPE,
        pAmount     IN  NUMBER,
		--Standalone12.3 CleanUp starts
		/*
        poption     IN  TATMS_RULE.CALC_AMT_RND_OPTION%TYPE,
        pmethod     IN  TATMS_RULE.CALC_AMT_RND_METHOD%TYPE,
        pdecimal    IN  TATMS_RULE.CALC_AMT_RND_DECIMAL%TYPE,
        punits      IN  TATMS_RULE.CALC_AMT_RND_UNITS%TYPE,
		*/
		poption       IN VARCHAR2,
        pmethod       IN VARCHAR2,
        pdecimal      IN NUMBER,
        punits        IN NUMBER,
		--Standalone12.3 CleanUp Ends
        p_rounded_amt   OUT NUMBER )
return BOOLEAN;
--fcc6.1 german tax change ends

FUNCTION fn_amt1_to_amt2 (
    pBranch     IN  sttms_core_branch.BRANCH_CODE%TYPE,
    pCcy1       IN  CYTMS_CCY_DEFN.CCY_CODE%TYPE,
    pCcy2       IN  CYTMS_CCY_DEFN.CCY_CODE%TYPE,
    pRateType   IN  CYTMS_RATE_TYPE.CCY_RATE_TYPE%TYPE,
    pRateIndicator  IN  varchar2,
    pAmount1    IN  number,
    pRounding   IN  CHAR,
    pAmount2    OUT     number,
    pRate       IN OUT  CYTMS_RATES.MID_RATE%TYPE,
    pErrorCode  IN OUT  ERTBS_MSGS.ERR_CODE%TYPE)
return BOOLEAN;

--fcc61 rate serial related change overloading fn 1
FUNCTION fn_amt1_to_amt2 (
    pBranch         IN      sttms_core_branch.BRANCH_CODE%TYPE,
    pCcy1           IN      CYTMS_CCY_DEFN.CCY_CODE%TYPE,
    pCcy2           IN      CYTMS_CCY_DEFN.CCY_CODE%TYPE,
    pRateType       IN      CYTMS_RATE_TYPE.CCY_RATE_TYPE%TYPE,
    pRateIndicator      IN      varchar2,
    pAmount1        IN      number,
    pRounding       IN      CHAR,
    pratedate       IN      DATE,
    pratesrno       IN      CYTMS_RATES.RATE_SERIAL%TYPE,
    pAmount2        OUT         number,
    pRate           IN OUT      CYTMS_RATES.MID_RATE%TYPE,
    pErrorCode      IN OUT      ERTBS_MSGS.ERR_CODE%TYPE)
return BOOLEAN;


FUNCTION fn_amt1_to_amt2 (
    pBranch     IN  sttms_core_branch.BRANCH_CODE%TYPE,
    pCcy1       IN  CYTMS_CCY_DEFN.CCY_CODE%TYPE,
    pCcy2       IN  CYTMS_CCY_DEFN.CCY_CODE%TYPE,
    pAmount1    IN  number,
    pRounding   IN  CHAR DEFAULT 'N',
    pAmount2    OUT     number,
    pRate       IN OUT  CYTMS_RATES.MID_RATE%TYPE,
    pErrorCode  IN OUT  ERTBS_MSGS.ERR_CODE%TYPE)
return BOOLEAN;

FUNCTION fn_amt1_to_amt2 (
    pCcy1       IN  CYTMS_CCY_DEFN.CCY_CODE%TYPE,
    pCcy2       IN  CYTMS_CCY_DEFN.CCY_CODE%TYPE,
    pAmount1    IN  number,
    pRate       IN  CYTMS_RATES.MID_RATE%TYPE,
    pRounding   IN  CHAR DEFAULT 'N',
    pAmount2    OUT     number,
    pErrorCode  IN OUT  ERTBS_MSGS.ERR_CODE%TYPE)
return BOOLEAN;

FUNCTION fn_LastRateDate(
        pBranch     IN  sttms_core_branch.BRANCH_CODE%TYPE,
        pCcy1       IN  CYTMS_CCY_DEFN.CCY_CODE%TYPE,
        pCcy2       IN  CYTMS_CCY_DEFN.CCY_CODE%TYPE)
return DATE;

FUNCTION fn_PurgeRateHistory(
        pBranch     IN  sttms_core_branch.BRANCH_CODE%TYPE,
        pDate       IN  DATE)
return BOOLEAN;

procedure pr_pop_master(
    --pm_job        integer,   --commented Bug#18386831 changes
   pm_job     VARCHAR2,  --added Bug#18386831 Changes
   pm_node     sttms_branch_node.node%type,
   pm_ccy1     cytms_ccy_pair_defn.ccy1%type,
   pm_ccy2     cytms_ccy_pair_defn.ccy2%type,
   pm_maker    cytms_ccy_pair_defn.maker_id%type,
   pm_cheker   cytms_ccy_pair_defn.checker_id%type,
   pm_makdt    cytms_ccy_pair_defn.maker_dt_stamp%type,
   pm_chekdt   cytms_ccy_pair_defn.checker_dt_stamp%type,
   pm_mcntry   cytms_ccy_pair_defn.maintenance_country%type  --Bug 21447110
   );

procedure pr_fire_job(
    pm_what     varchar2
    ,pm_ccy_pair VARCHAR2   --added 12.0.3supp_18885121
    );

FUNCTION fn_eurtype(
            pEurCcy IN  CYTMS_CCY_DEFN.CCY_CODE%TYPE )
RETURN CHAR;

--PRAGMA RESTRICT_REFERENCES (fn_EURTYPE, WNDS, WNPS);


/*function being added for the index ccy in advice*/
FUNCTION fn_indtype(
            pIndCcy IN      CYTMS_CCY_DEFN.CCY_CODE%TYPE)
RETURN CHAR;

-- 26-NOV-2002 FCC 5.1 ISKICE SFR # 66..Starts
--9NT1532 : Performance Tuning With FRC
--PRAGMA RESTRICT_REFERENCES (fn_indtype, WNDS, WNPS);

-- 26-NOV-2002 FCC 5.1 ISKICE SFR # 66..Ends

-- FCC5.0 Lot2 Changes

-- FCC5.6 performance change
--type ccytab_typ is table of cytms_ccy_defn%rowtype index by binary_integer;
type ccytab_typ is table of cytms_ccy_defn%rowtype index by VARCHAR2(3);
ccytab ccytab_typ;


--procedure pr_cache_ccy(pCcy varchar2, h binary_integer);
procedure pr_cache_ccy(pCcy varchar2, h VARCHAR2); -- FCC5.6 performance change

-- FCC5.0 Lot2 Changes Ends

--12-Mar-10 FCUBS11.1 MB0235 Starts

 --This function is used to get the customer specific exchange rate through RP

 --Standalone12.3 CleanUp Start
 /*
 FUNCTION fn_get_rp_rate(p_branch     IN VARCHAR2,
                          p_cust_no    IN VARCHAR2,
                          p_prod       IN VARCHAR2,
                          p_trn_ref_no IN VARCHAR2,
                          p_ccy1       IN VARCHAR2,
                          p_ccy2       IN VARCHAR2,
                          p_orig_rate  IN OUT CYTMS_RATES.MID_RATE%TYPE,
                          p_exch_rate  IN OUT CYTMS_RATES.MID_RATE%TYPE,
                          p_err_code   IN OUT VARCHAR2,
                          p_err_params IN OUT VARCHAR2,
                          p_rate_type  IN VARCHAR2 DEFAULT NULL,
                          --12.1 changes for cust account scheme linkage Saurabh start
                          p_acc        IN VARCHAR2 DEFAULT 'ALL',
                          p_brn        in VARCHAR2 DEFAULT 'ALL'
                          --12.1 changes for cust account scheme linkage Saurabh end
                          ) RETURN BOOLEAN; --SFR#255
 */
 --Standalone12.3 CleanUp End

--12-Mar-10 FCUBS11.1 MB0235 Ends

  --Standalone12.3 CleanUp starts
  /*
  TYPE ccy_dnm_var_rec IS RECORD(
    denom_id              cstm_denm_var_details.denom_id%TYPE,   --18481078 changes
    variance_amount       cstm_denm_var_details.buy_variance%TYPE,
    quantity              NUMBER,
    total_variance_amount cstm_denm_var_details.buy_variance%TYPE);

  TYPE ccy_dnm_var_typ IS TABLE OF ccy_dnm_var_rec INDEX BY BINARY_INTEGER;

  FUNCTION fn_get_dnm_rate_amount(pBranch           IN sttms_core_branch.BRANCH_CODE%TYPE,
                                  pCcy1             IN CYTMS_CCY_DEFN.CCY_CODE%TYPE,
                                  pCcy2             IN CYTMS_CCY_DEFN.CCY_CODE%TYPE,
                                  pRateType         IN CYTMS_RATE_TYPE.CCY_RATE_TYPE%TYPE,
                                  pRateIndicator    IN varchar2,
                                  pAmount1          IN NUMBER,
                                  pRounding         IN CHAR DEFAULT 'N',
                                  pAmount2          OUT NUMBER,
                                  pRate             IN OUT CYTMS_RATES.MID_RATE%TYPE,
                                  p_ccy_dnm_var_typ IN OUT cypks.ccy_dnm_var_typ,
                                  pErrorCode        IN OUT ERTBS_MSGS.ERR_CODE%TYPE)
    RETURN BOOLEAN;
   */
   --Standalone12.3 CleanUp ends
  --OFCL_12.3 starts
  FUNCTION FN_AMT_ROUND(PCCY    IN CYTMS_CCY_DEFN.CCY_CODE%TYPE,
                        PAMOUNT IN NUMBER) RETURN NUMBER;
  --OFCL_12.3 ends
END;
/
CREATE OR REPLACE SYNONYM CYPKSS FOR CYPKS
/