CREATE OR REPLACE PACKAGE olpks_vd_sch AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_vd_sch.SPC
**
** Module		: LOANS and DEPOSITS
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

27-OCT-2003 FCC 4.4 Dec 2003 Citi Latam BOUAT 185
				fn_mdchg, fn_rtchg. IF Recompute flag='Y' then basis amount = remaining principal.
				both maturity date change and rate change can happen together. If both happen together
				and basis amount should be corrected only in rate change. For this 2 pkg level variables declared
				in pkg. These are set in olams.

27-NOV-2003 FCC 4.4 DEC 2003 Changes Negative Interest Rate Changes
04-Aug-2004	FCC 4.6 Sep04 Retro (India)  ..added overloaded function fn_rtchg.

       Changed By         : ANUSHA K
       Date               : 27-Feb-2019
       Change Description : Penal Batch taking long time(FWD PORT OF 29367843)
       Search String      : OBCL_14.1_SUPP_#29415669  Changes

     **Changed By         : Gomathi G
    **Date                : 13-FEB-2020
    **Change Description  : Hooks for Creation Of Commitments with various tranches with different usage deadlines
    **Search String       : OBCL_14.3_SUPPORT_30881375
	
	**Changed By         : Abhik Das
    **Date               : 19-Sep-2023
    **Change Description : System was not updating the basis amount correctly
                           in case of rate change VAMI for fixed and floating
                           periodic auto cases.
                           Added code to update basis amount correctly 
                           or fixed and floating periodic auto cases.--fwdport of Bug#35763929
    **Search String      : OBCL_14.7_GBK_FWD_Bug#35840297_Changes



    **Changed By         : Mohan Pal
    **Date               : 23-Oct-2024
    **Change Description : Declaring global variables to check 
                           g_is_prepmt if any Principal Pre-Payment is done.
    **Search String      : Bug#37088503 FWDPORT of Bug#37017825
       ===============================================================================
*/
  g_is_prepmt VARCHAR2(1) := 'N'; --Bug#37088503
  g_Vd_Sch_Check VARCHAR2(1); --OBCL_14.1_SUPP_#29415669  Changes to improve Performance in penalty process during EOD
  g_rtchg_fixed_fpa	VARCHAR2(1) := 'N';--OBCL_14.7_GBK_FWD_Bug#35840297_Changes

type ty_rec_handoff is record(
	p_reference_no			oltbs_computation_handoff.contract_ref_no%TYPE,
	p_component			oltbs_computation_handoff.component%TYPE,
	p_effective_date		oltbs_computation_handoff.effective_date%TYPE,
	p_rate				oltbs_computation_handoff.rate%TYPE,
	p_amount			oltbs_computation_handoff.amount%TYPE,
	p_rate_sign			oltbs_computation_handoff.rate_sign%TYPE --Fcc 4.4 Negative Rate
	);

type ty_handoff is table of ty_rec_handoff
		index by binary_INTEGER;

FUNCTION 	fn_princ_env(p_ref_no	IN VARCHAR2,
				--l_comput_handoff	IN oltbs_computation_handoff%ROWTYPE,
        p_comput_handoff	IN oltbs_computation_handoff%ROWTYPE, -- OBCL_14.3_SUPPOERT_30881375
				p_error_code		IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION 	fn_princ(p_ref_no		IN VARCHAR2,
				p_component			IN oltbs_contract_iccf_calc.component%TYPE, 
				--l_comput_handoff	IN oltbs_computation_handoff%ROWTYPE,
        P_comput_handoff	IN oltbs_computation_handoff%ROWTYPE, -- OBCL_14.3_SUPPOERT_30881375
				p_error_code		IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION	fn_mdchg(p_ref_no 		IN VARCHAR2,
				comput_handoff		IN oltbs_computation_handoff%ROWTYPE,
				p_error_code		IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION 	fn_rtchg(p_ref_no		IN VARCHAR2,
				--l_comput_handoff	IN ty_handoff,
        P_comput_handoff	IN ty_handoff, -- OBCL_14.3_SUPPOERT_30881375
				p_error_code		IN OUT VARCHAR2)
RETURN BOOLEAN;

--	FCC 4.6 Sep04 Retro (India)  Starts

FUNCTION	fn_rtchg
	(
		p_ref_no		IN		VARCHAR2,
		--l_comput_handoff	IN		ty_handoff,
    P_comput_handoff	IN		ty_handoff, ---- OBCL_14.3_SUPPOERT_30881375
		p_schedule_date	IN		VARCHAR2,
		p_error_code	IN OUT 	VARCHAR2)
RETURN BOOLEAN;

--	FCC 4.6 Sep04 Retro (India)  ENDS

FUNCTION fn_process_special_component
	(
	p_tab_comput		IN OUT	lfpkss_computation.ty_int,
	p_component_ccy	IN			oltbs_amount_due_cs.currency_amt_due%TYPE
	)
	RETURN boolean;

-- FCC 4.4 Dec 2003 Citi Latam BOUAT 185 starts here
g_mdchg	varchar2(1) :='N' ;
g_rtchg	varchar2(1) :='N' ;
-- FCC 4.4 Dec 2003 Citi Latam BOUAT 185 ends here

END olpks_vd_sch;
/
create or replace synonym olpkss_vd_sch for olpks_vd_sch
/