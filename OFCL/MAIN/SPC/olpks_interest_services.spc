CREATE OR REPLACE PACKAGE olpks_interest_services IS
-- OBJECT : olpks_interest_services               DATE /TIME : 15-MAR-96 15:25:03
/*----------------------------------------------------------------------------------------------------
**
** File Name    : olpks_interest_services.spc
**
** Module       : CORE SERVICES
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

/*------------------------------------------CHANGE HISTORY----------------------------------
DATE			VERSION NO		CODE			DESCRIPTION

24-NOV-2003	FCC 4.4 Dec 2003 Development Requirements...
			Requirement	:	To Compute Dates/Interest FOR The Schedules depending on the Interest Period Basis maintained
			Solutions	:	Added 2 new overloaded functions, fn_calc_int AND fn_date_diff.
						ALL changes can be identified as "24-NOV-2003 FCC 4.4 Dec 2003 Interest Period Basis Development Requirements"
20-JUn-2005	FCC 4.6.2 CITI LS/FEE Changes added function 	fn_calc_simple_int
13-JAN -2006    FLEXCUBE V.CL 7.1 Column name change from margin to margin_rate for table LFTM_MARGIN_RATE by nirupama

	**Changed By         : Vigneshram S
	**Change Description : Exponential Changes
	**Search String      : OBCL_14.4_Exponential
	**Changed On         : 14-Aug-2019	
    **Changed By         : Navoneel Nandan
    **Change Description : Reporting Component Changes
    **Search String      : OBCL_14.4_CDI
    **Changed On         : 23-Dec-2019

  **Changed By         : Navoneel Nandan
  **Date               : 04-Feb-2022
  **Change Description : Allowing Negative Interest for Secondary and Penalty Interest Components
  **Search String      : Bug#33766795_2

  **  Modified By     : Navoneel Nandan
  **  Modified On     : 17-Aug-2022
  **  Modified Reason : Added flag to decouple reporting comps from main comp
  **  Search String   : Bug#34500369
*/
  --Bug#34500369 starts
  PROCEDURE Pr_Skip_Handler(P_Stage IN VARCHAR2);
  PROCEDURE Pr_Set_Skip_Kernel;
  PROCEDURE Pr_Set_Activate_Kernel;
  PROCEDURE Pr_Set_Skip_Cluster;
  PROCEDURE Pr_Set_Activate_Cluster;
  FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
  FUNCTION Fn_Skip_Custom RETURN BOOLEAN;

  g_rap_rate_mod      VARCHAR2(1):='N';
  --Bug#34500369 ends
	FUNCTION fn_calc_int (
		baseAmount IN NUMBER,
		startDate IN DATE,
		endDate IN DATE,
		intCalcMet IN CHAR,
		ratePeriod IN NUMBER,
		periodCode IN CHAR,
		periodDays IN NUMBER,
		intAmt OUT NUMBER)
		RETURN BOOLEAN;
-- Computes the interest by invoking the functions IN the PACKAGE
	FUNCTION fn_date_diff (
		startDate IN DATE,
		endDate IN DATE ,
		intCalMet IN CHAR,
		tenorDiff IN OUT NUMBER)
		RETURN BOOLEAN;
-- Computes the difference IN numerator dates FOR a int calc method
	FUNCTION fn_tnr_deno (
		startDate IN DATE,
		endDate IN DATE ,
		intCalMet IN CHAR,
		tenorDenom IN OUT NUMBER)
		RETURN BOOLEAN;
-- Computes the denominator FOR the tenor portion
	FUNCTION fn_annual_rate (
		startDate IN DATE,
		endDate IN DATE ,
		intCalMet IN CHAR,
		ratePeriod IN NUMBER,
		periodCode IN CHAR,
		periodDays IN NUMBER,
		annualRate OUT NUMBER)
		RETURN BOOLEAN;
-- Converts interest rate per period INTO an annualized rate
	FUNCTION fn_IsLeap (
		year IN NUMBER)
		RETURN NUMBER;
-- Checks IF a given year IS a leap year OR NOT
	FUNCTION fn_Year (
		aDate IN DATE )
		RETURN INTEGER;
-- Extracts the year portion OF a DATE
	FUNCTION fn_Month (
		aDate IN DATE )
		RETURN INTEGER;
-- Extracts the month portion OF a DATE
	FUNCTION fn_Date (
		aDate IN DATE )
		RETURN INTEGER;
-- Extracts the DATE portion OF a DATE
	FUNCTION fn_pr_for_true_discount(
		amount IN NUMBER,
		ccy IN VARCHAR2,
		startDate IN DATE,
		endDate IN DATE,
		intRate IN NUMBER,
		intCalMet IN CHAR,
		pr_true_Amt OUT NUMBER)
		RETURN BOOLEAN;
-- Computes principal FOR TRUE discounted contracts
	FUNCTION fn_months_between
		( p_startDate IN DATE,
		p_endDate IN DATE)
		RETURN NUMBER;

FUNCTION fn_dates_denom_diff(
		p_start_date		IN		DATE,
		p_end_date			IN		DATE,
		p_calc_method		IN		VARCHAR2,
		P_dates_denom_diff	IN OUT	NUMBER,
		p_error_code		IN OUT	ERTBS_MSGS.err_code%TYPE,
		p_error_parameter		IN OUT	VARCHAR2)

RETURN BOOLEAN;

--
-- 24-NOV-2003 FCC 4.4 Dec 2003 Interest Period Basis Development Requirements Start
--

FUNCTION fn_calc_int
(
	baseAmount				IN 	NUMBER,
	startDate				IN 	DATE,
	endDate				IN 	DATE,
	p_contract_value_date		IN	oltbs_contract_master.value_date%TYPE,
	p_contract_maturity_date	IN	oltbs_contract_master.maturity_date%TYPE,
	p_int_period_basis		IN	lftbs_contract_interest.int_period_basis%TYPE,
	intCalcMet				IN 	VARCHAR2,
	ratePeriod				IN 	NUMBER,
	periodCode				IN 	VARCHAR2,
	periodDays				IN 	NUMBER,
	intAmt 				OUT	NUMBER
)
RETURN BOOLEAN;


FUNCTION fn_date_diff
(
	startDate 				IN 		DATE,
	endDate 				IN 		DATE,
	p_contract_value_date		IN		oltbs_contract_master.value_date%TYPE,
	p_contract_maturity_date	IN		oltbs_contract_master.maturity_date%TYPE,
	p_int_period_basis		IN		lftbs_contract_interest.int_period_basis%TYPE,
	intCalMet 				IN 		VARCHAR2,
	tenorDiff 				IN OUT	NUMBER
)
RETURN BOOLEAN;

--
-- 24-NOV-2003 FCC 4.4 Dec 2003 Interest Period Basis Development Requirements END
--
-- FCC 4.6.2 CITI FEE CHANGES START BY KIHORE
FUNCTION fn_calc_simple_int
	(
	p_base_amount	IN		lftbs_contract_fee_vd_changes.basis_amount%Type,
	p_start_date	IN		DATE,
	p_end_date		IN		DATE,
	p_rate		IN		LFTM_MARGIN_RATE.margin_rate%Type,--flexcube v.cl 7.1 by nirupama
	p_int_basis		IN		CYTMS_CCY_DEFN.ccy_int_method%Type,
	p_calc_amt		OUT		lftbs_contract_fee_vd_changes.basis_amount%Type,
	p_error_code	IN OUT	Varchar2,
	p_error_parameter	IN OUT	Varchar2
	)
	RETURN BOOLEAN;
-- FCC 4.6.2 CITI FEE CHANGES END BY KISHORE
--OBCL_14.4_Exponential changes starts
	FUNCTION fn_calc_exponential_int (
		baseAmount IN NUMBER,
		startDate IN DATE,
		endDate IN DATE,
		intCalcMet IN CHAR,
		ratePeriod IN NUMBER,
		periodCode IN CHAR,
		periodDays IN NUMBER,
		intAmt OUT NUMBER)
		RETURN BOOLEAN;
		
FUNCTION fn_calc_exponential_int
(
	baseAmount				IN 	NUMBER,
	startDate				IN 	DATE,
	endDate				IN 	DATE,
	p_contract_value_date		IN	oltbs_contract_master.value_date%TYPE,
	p_contract_maturity_date	IN	oltbs_contract_master.maturity_date%TYPE,
	p_int_period_basis		IN	lftbs_contract_interest.int_period_basis%TYPE,
	intCalcMet				IN 	VARCHAR2,
	ratePeriod				IN 	NUMBER,
	periodCode				IN 	VARCHAR2,
	periodDays				IN 	NUMBER,
	intAmt 				OUT	NUMBER
)
RETURN BOOLEAN;
--OBCL_14.4_Exponential changes ends		
  --OBCL_14.4_CDI changes starts
  FUNCTION fn_compute_cosif_rate(
                                 --Bug#34500369 starts
                                 p_contract_ref_no lftbs_contract_interest.contract_reference_no%TYPE,
                                 p_component       lftbs_contract_interest.component%TYPE,
                                 --Bug#34500369 ends
                                 p_start_date      lftbs_contract_interest.value_date%TYPE,
                                 p_end_date        lftbs_contract_interest.value_date%TYPE,
                                 p_calc_from_basis lftbs_contract_interest.interest_basis%TYPE,
                                 p_calc_to_basis   lftbs_contract_interest.interest_basis%TYPE,
                                 p_rate            IN OUT lftbs_contract_interest.rate%TYPE) RETURN BOOLEAN;
--OBCL_14.4_CDI changes ends
  --Bug#33766795_2 starts  
FUNCTION fn_compute_neg_rate(p_contract_ref_no  IN lftbs_contract_interest.contract_reference_no%TYPE,
                             p_component        IN lftbs_contract_interest.component%TYPE,
                             p_rate             IN OUT lftbs_contract_interest.rate%TYPE,
                             p_parent_component IN lftbs_contract_interest.component%TYPE DEFAULT NULL,
                             p_neg_component    IN lftbs_contract_interest.component%TYPE DEFAULT NULL) RETURN BOOLEAN;
  --Bug#33766795_2 ends
END olpks_interest_services;
/
CREATE or replace SYNONYM olpkss_interestx FOR olpks_interest_services
/