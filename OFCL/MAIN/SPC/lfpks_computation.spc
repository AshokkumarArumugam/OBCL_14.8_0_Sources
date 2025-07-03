CREATE OR REPLACE PACKAGE lfpks_computation IS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : lfpks_computation.SPC
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
----------------------------------------------------------------------------------------------------
*/
/*
CHANGE HISTORY
23-OCT-2003 FCC 4.4 DEC 2003 CURRENCY ROUNDING LOGIC DEVELOPMENT
			REQUIREMENT:	FOR 'OL'/'MM' MODULE CURRENCY XXLIMITS MAINTENANCE SHOULD HAVE CYY ROUNDING LOGIC AS IN CCY DEFINITION.
			SOLUTIONS:		ADDED CODE TO FACILITATE THE REQUIREMENT.
						ALL changes can be identified as "23-OCT-2003 FCC 4.4 DEC 2003 CURRENCY ROUNDING LOGIC DEVELOPMENT"								

24-NOV-2003	FCC 4.4 Dec 2003 Development Requirements...
			Requirement:	To Compute Dates/Interest FOR The Schedules depending on the Interest Period Basis maintained
			Solutions	:	Added a new overloaded FUNCTION FOR fn_int_computation 
						ALL changes can be identified as "24-NOV-2003 FCC 4.4 Dec 2003 Interest Period Basis Development Requirements"
02-APR-2004	FCC 4.4.1 COmpounding Changes , added new columns to pl/sql table ty_rec_int	
30-Jul-2004 FCC4.6 Sep04 Retro(India): Identify the changes marked as 4.4.1 within comments.

	**Changed By         : Chandra Achuta
	**Date               : 05-SEP-2020
	**Change Description : zero base calculation remove 0.01 difference for interest calculations
	**Search String      : Bug#31701656

  **Changed By         : Navoneel Nandan
  **Date               : 24-mar-2021
  **Change Description : Modified the Paid Amount Fetching Logic.
  **Search String      : OBCL_14.5_penalty_compounding_paid_amt
  
  **Changed By         : Navoneel Nandan
  **Date               : 12-Sep-2022
  **Change Description : Making fn_get_recalc_start_date as public.
  **Search String      : Bug#34563987

**  Modified By     : Navoneel Nandan
**  Modified On     : 14-Nov-2022
**  Modified Reason : Sch Cutoff Logic changes for Cosif Equivalent Rate start date
**  Search String   : Bug#34834678
*/

TYPE ty_rec_int  IS RECORD (
	p_contract_reference_no 
		lftbs_contract_interest.contract_reference_no%TYPE,
	p_component lftbs_contract_interest.component%TYPE,
	p_basis_amount_currency CYTMS_CCY_DEFN.ccy_code%TYPE,
	p_basis_amount lftbs_contract_interest.amount%TYPE,
	p_start_date lftbs_contract_interest.transaction_date%TYPE,
	p_end_date  lftbs_contract_interest.transaction_date%TYPE,
	p_rate  lftbs_contract_interest.rate%TYPE,
	p_int_amount NUMBER,
	p_number_of_days INTEGER,
	p_interest_basis  lftbs_contract_interest.interest_basis%TYPE,
	p_daily_int_amount NUMBER,
	p_rate_sign		   lftbs_contract_interest.rate_sign%TYPE, -- Fcc 4.4 Dec 2003 Negative Interest Changes
	-- FCC 4.4.1 Compounding Changes Starts
	p_int_computation	   lftbs_contract_interest.int_computation%TYPE, -- FCC 4.4.1 SFR #16 ITR2
	p_compound_interest	   oltbs_contract_iccf_calc.compound_interest%TYPE,
	p_int_application	   VARCHAR2(1),
	p_prod_sch_type		   VARCHAR2(1),
	p_action_code		   VARCHAR2(3),
	p_schedule_date		   DATE	
	-- FCC 4.4.1 Compounding Changes Ends
	,p_computation_days oltb_contract_iccf_calc.computation_days%TYPE --OBCL_14.4_30/360 CHANGES
	) ;
TYPE ty_int IS TABLE OF ty_rec_int
	INDEX by BINARY_INTEGER;
--Bug#34563987 starts
FUNCTION fn_get_recalc_start_date(p_contract_ref_no IN oltb_contract.contract_ref_no%TYPE,
                                                    --Bug#34834678 starts
                                                    p_component     IN lftb_contract_interest.component%TYPE,
                                                    p_schedule_date IN DATE,
                                                    --Bug#34834678 ends
                                                    p_start_date      IN OUT DATE,
                                                    p_end_date        IN OUT DATE) RETURN BOOLEAN;
--Bug#34563987 ends
FUNCTION fn_int_computation (p_ty_int IN OUT ty_int) RETURN BOOLEAN;

TYPE ty_rec_commission IS RECORD (
	p_contract_reference_no 
		lftbs_contract_commission.contract_reference_no%TYPE,
	p_event_seq_no lftbs_contract_commission.event_seq_no%TYPE,
	p_calculation_method lftbs_contract_commission.calculation_method%TYPE,
	p_component lftbs_contract_commission.component%TYPE,
	p_basis_amount_currency CYTMS_CCY_DEFN.ccy_code%TYPE,
	p_basis_amount lftbs_contract_commission.amount%TYPE,
	p_basis_amount_lcy_equiv lftbs_contract_commission.amount%TYPE,
	p_start_date lftbs_contract_commission.transaction_date%TYPE,
	p_customer lftms_rule.customer%TYPE,
	p_end_date lftbs_contract_commission.transaction_date%TYPE,
	p_commission_amount NUMBER,
	p_commission_currency CYTMS_CCY_DEFN.ccy_code%TYPE
	);
TYPE ty_commission IS TABLE OF ty_rec_commission 
	INDEX by BINARY_INTEGER;
TYPE ty_rec_commission_good IS RECORD (
	p_contract_reference_no 
		lftbs_contract_commission.contract_reference_no%TYPE,
	p_component lftbs_contract_commission.component%TYPE,
	p_start_date lftbs_contract_commission.transaction_date%TYPE,
	p_end_date lftbs_contract_commission.transaction_date%TYPE,
	p_rounding_period lftbs_contract_commission.rounding_period%TYPE,
	p_good_until_date lftbs_contract_commission.transaction_date%TYPE,
	p_customer lftms_rule.customer%TYPE,
	p_currency CYTMS_CCY_DEFN.ccy_code%TYPE);
TYPE ty_commission_good IS TABLE OF ty_rec_commission_good
	INDEX by BINARY_INTEGER;

-- OFCL12.2 	
/*FUNCTION fn_commission_good_until_date(p_ty_commission_good IN OUT
		ty_commission_good) RETURN BOOLEAN;*/
-- OFCL12.2 

TYPE ty_rec_for_commission IS RECORD (
	p_contract_reference_no 	lftbs_contract_commission.contract_reference_no%TYPE,
	p_event_seq_no 			lftbs_contract_commission.event_seq_no%TYPE,
	p_PESN 		lftbs_contract_commission.pickup_event_sequence_no%TYPE,
	p_calculation_method 		lftbs_contract_commission.calculation_method%TYPE,
	p_component 			lftbs_contract_commission.component%TYPE,
	p_basis_amount_currency 	CYTMS_CCY_DEFN.ccy_code%TYPE,
	p_basis_amount 			lftbs_contract_commission.amount%TYPE,
	p_basis_amount_lcy_equiv 	lftbs_contract_commission.amount%TYPE,
	p_start_date 			lftbs_contract_commission.transaction_date%TYPE,
	p_customer 			lftms_rule.customer%TYPE,
	p_end_date 			lftbs_contract_commission.transaction_date%TYPE,
	p_commission_amount 		NUMBER,
	p_commission_currency 		CYTMS_CCY_DEFN.ccy_code%TYPE,
	p_follow_rule			VARCHAR2(1),
	p_rate_period 			lftbs_contract_commission.rate_period%TYPE,
	p_rate 				lftbs_contract_commission.rate%TYPE,
	p_collection_period 		lftbs_contract_commission.collection_period%TYPE,
	p_rounding_period 		lftbs_contract_commission.rounding_period%TYPE,
	p_retrospective_flag		lftbs_contract_commission.retrospective_flag%TYPE
	);
TYPE ty_for_commission IS TABLE OF ty_rec_for_commission 
	INDEX by BINARY_INTEGER;
--Bug#31701656 changes starts
TYPE zbc_map IS TABLE OF NUMBER INDEX BY VARCHAR2(50);
   round_int_map zbc_map;
   unround_int_map zbc_map;
--Bug#31701656 changes ends
	-- OFCL12.2
	/*
FUNCTION fn_commission_computation(
	p_ty_commission 	IN OUT ty_for_commission
				) RETURN BOOLEAN; */
    -- OFCL12.2 
--
--	23-OCT-2003 FCC 4.4 DEC 2003 CURRENCY ROUNDING LOGIC DEVELOPMENT START
--

FUNCTION fn_get_rounded_amount
(
	p_currency			IN		cytms_ccy_defn.ccy_code%TYPE,
	p_ccy_round_rule		IN		cytms_ccy_defn.ccy_round_rule%TYPE,
	p_ccy_decimals		IN		cytms_ccy_defn.ccy_decimals%TYPE,
	p_ccy_round_unit		IN		cytms_ccy_defn.ccy_round_unit%TYPE,
	p_amount			IN		NUMBER,
	p_rounded_amount		OUT		NUMBER
)
RETURN BOOLEAN;

--
--	23-OCT-2003 FCC 4.4 DEC 2003 CURRENCY ROUNDING LOGIC DEVELOPMENT END
--

--
-- 24-NOV-2003 FCC 4.4 Dec 2003 Interest Period Basis Development Requirements Start
--

FUNCTION fn_int_computation 
(
	p_contract_value_date		IN		oltbs_contract_master.value_date%TYPE,
	p_contract_maturity_date	IN		oltbs_contract_master.maturity_date%TYPE,
	p_int_period_basis		IN		lftbs_contract_interest.int_period_basis%TYPE,
    p_ty_int				IN OUT	ty_int
   ,p_amount_paid IN NUMBER DEFAULT 0--OBCL_14.5_penalty_compounding_paid_amt changes
   ) 
RETURN BOOLEAN;

--
-- 24-NOV-2003 FCC 4.4 Dec 2003 Interest Period Basis Development Requirements END
--

END lfpks_computation; 
/
CREATE or replace synonym lfpkss_computation FOR lfpks_computation
/