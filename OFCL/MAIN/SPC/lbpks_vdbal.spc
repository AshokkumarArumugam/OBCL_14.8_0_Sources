CREATE OR REPLACE PACKAGE lbpks_vdbal  IS
/*-----------------------------------------------------------------------------------------
**
** File Name	: lbpks_vdbal.SPC
**
** Module	: LOAN SYNDICATION
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.

------------------------------------------CHANGE HISTORY----------------------------------
10-JUN-2005	FCC 4.6.1
	ADDED NEW PACKAGE TO MAINTAIN VALUE DATAED BALANCE FOR LOAN SYNDICATION MODULE

	THERE WILL BE THREE types OF BALANCES AVAILABLE FOR A TRANCHE AND DEPENDENT DRAWDOWNS
		CURRLIMIT	: THIS IS AVAILABLE AMOUNT FOR A TRANCHE ON A GIVEN DATE
		UNUTILIZED	: THIS IS UNUTILIZED AMOUNT OF A TRANCHE ON A GIVEN DATE
		UTILIZED	: THIS IS THE AMOUNT OF DRAWDOWN ON ANY GIVEN DATE
		OUTSTANDING	: THIS IS THE AMOUNT TO BE PAID BY CUSTOMER ON A GIVEN DATE

23-Dec-2005 FLEXCUBE V.CL Release 7.0 VAMI Changes by Aarthi
		Added a new function fn_vami_update to update vdbal during tranche VAMI.
28-Dec-2005 FLEXCUBE V.CL Release 7.0 VAMI Changes by Aarthi
		Added parameter p_error_code for fn_vami_update.
29-Dec-2005 FLEXCUBE V.CL Release 7.0 VAMI Changes by Aarthi
		Overloaded the function fn_vdbal_update to pass p_error_code.
19-Jan-2006 FLEXCUBE V.CL Release 7.0 BY Nirupama Chadha added function fn_get_dd_balance		
20-Feb-2006 FLEXCUBE V.CL Release 7.1 BY Guru 	added function fn_vdbal_update_during_liq
20-JUN-2006	FUNCTION fn_vdbal_update and Fn_recalc_vdbal have been changed as per the new design.
27-JUL-2006 removed obsolete function fn_vdbal_update_during_liq
29-JAN-2007 FLEXCUBE V.CL RELEASE 7.2 LD Regression Testing Fixes by Sangeetha.
	    Added functions fn_recalc_ldvdbal and fn_conv and removed a parameter from fn_ld_vdbal_update.
13-MAR-2007 FLEXCUBE V.CL Release 7.2 ITR1 SFR #100 Nirupama , ADDED FUN fn_get_exchg_rate
20-Mar-2007 FLEXCUBE V.CL Release 7.2 ITR1 SFR#100 Fix by Aarthi
		Added a parameter p_esn in pr_insert_drawdown.
03-AUG-2007 FCC V.CL Release 7.3 SPLIT Re Price changes introduced a new function.
26-DEC-2007 FLEXCUBE V.CL RELEASE 7.3 ITR2 SFR#32, added from pck to spc fn_update_amount_due
26-FEB-2009 FLEXCUBE V.CL Release 7.5 LOT1 FS Tag 2, Slab/Tier based Fee for Commitment and waiver ,PBG Changes by Saurabh
26-AUG-2009 CITIUS-LS#6235, Clearpar and SLT incremental changes retro - changed the copyright clause.
26-AUG-2009 CITIUS-LS#6235, Clearpar and SLT incremental changes retro - ITR1 SFR#135, added a fn to get the exchange rate only but not the amount, fn_get_exchange_rate



    **Changed By         : Anusha k
    **Date               : 29-AUG-2023
    **Change Description : changes to update particpant balances for future dated rollover
    **Search String      : OBCL_14.6_#35713467 changes
	
  **Changed By         : Anusha K
  **Date               : 16-Jan-2025
  **Change Description : GLOBAL VARIABLE ADDED TO UPDATE EXFX DIFF AMOUNT ONLY ONCE
  **Search String      : OBCL_14.7_Bug#37227811
-----------------------------END CHANGE HISTORY ------------------------------------------------
*/

    G_EXFX_UPDATED VARCHAR2(1) := 'N';--OBCL_14.7_Bug#37227811
	
	FUNCTION fn_get_tranche_balance
		(p_contract_ref_no  VARCHAR2
		,p_value_date  DATE
		,p_balance_type VARCHAR2
		,p_closing_bal OUT NUMBER
		,p_dd_ref_no  VARCHAR2 default 'XXX'
		,p_dd_ccy     VARCHAR2 default	'XXX'
		,p_dd_amt     NUMBER   default 0

		) 
	RETURN BOOLEAN;
	--FLEXCUBE V.CL Release 7.0 by nirupama chadha start
	FUNCTION fn_get_dd_balance
		(p_tranche_ref_no  VARCHAR2, 
		 p_dd_ref_no  VARCHAR2,
		 p_balance_type  VARCHAR2,
		 p_value_date DATE,
		 p_dd_amount  varchar2,
		 p_dd_ccy     CYTMS_CCY_DEFN.ccy_code%TYPE,
	         p_bal_amount OUT NUMBER
	         )  
        RETURN BOOLEAN;
        --FLEXCUBE V.CL Release 7.0 by nirupama chadha end

	FUNCTION fn_get_ld_comm_balance
		(p_contract_ref_no  VARCHAR2
		,p_value_date  DATE
		,p_component VARCHAR2
		,p_closing_bal OUT NUMBER
		)
	RETURN  BOOLEAN;

	FUNCTION fn_ld_tranche_vdbal
		(p_contract_ref_no VARCHAR2
		,p_event VARCHAR2
		,p_amount NUMBER
		,p_value_date  DATE
		,p_ccy VARCHAR2
		)
	RETURN BOOLEAN;

	PROCEDURE pr_insert_component
		(p_contract_ref_no VARCHAR2
		,p_amount NUMBER
		,p_ccy VARCHAR2
		,p_value_date DATE
		,p_component VARCHAR2
		);

	FUNCTION fn_update_currlimit
		(p_contract_ref_no	IN	VARCHAR2
		,p_value_date  		IN	DATE
		,p_contract_ccy		IN	VARCHAR2
		,p_error_code		OUT	VARCHAR2
		,p_error_param		OUT	VARCHAR2
		)
	RETURN BOOLEAN;

/*	FUNCTION fn_vdbal_update
		(p_contract_ref_no VARCHAR2
		,p_event VARCHAR2
		)
	RETURN BOOLEAN;
*/
	--FLEXCUBE V.CL Release 7.0 VAMI Changes by Aarthi start
	--we are going to comment this function and make everyone use fn_vdbal_update with 5 parameters
/*	FUNCTION fn_vdbal_update
		(p_contract_ref_no	VARCHAR2
		,p_event 			VARCHAR2
		,p_error_code	OUT	VARCHAR2
		)
	RETURN BOOLEAN;
	--FLEXCUBE V.CL Release 7.0 VAMI Changes by Aarthi end
*/

	--new function for my own private idaho
	FUNCTION fn_vdbal_update
		(p_contract_ref_no	VARCHAR2
		,p_event 			VARCHAR2
		,value_date			DATE 
		,p_error_code	OUT	VARCHAR2
		)
	RETURN BOOLEAN;

	FUNCTION fn_pickup_tranche_redn_sch
		(p_contract_ref_no VARCHAR2
		,p_esn NUMBER
		,p_value_date DATE
		,p_ccy VARCHAR2
		,p_type VARCHAR2
		)
	RETURN BOOLEAN;

	FUNCTION fn_recalc_vdbal
		(p_tranche_ref_no VARCHAR2
		,p_value_date DATE
		,p_balance_type VARCHAR2 DEFAULT 'ALL'
		,p_dd_ref_no VARCHAR2 DEFAULT null
		,p_recalc_detail VARCHAR2 DEFAULT 'Y'
		,p_recalc_master VARCHAR2 DEFAULT 'Y'
		)
 	RETURN BOOLEAN;


	PROCEDURE pr_insert_tranche_master
		(p_contract_ref_no VARCHAR2
		,p_balance_type VARCHAR2
		,p_value_date DATE
		,p_contract_ccy VARCHAR2
		,p_opening_balance NUMBER
		,p_dr_turnover NUMBER
		,p_cr_turnover NUMBER
		,p_type VARCHAR2
		);

	PROCEDURE pr_insert_drawdown
		(p_ref_no  VARCHAR2
		,p_tranche_ref_no  VARCHAR2
		,p_balance_type  VARCHAR2
		,p_value_date DATE
		,p_ccy  VARCHAR2
		,p_dr_turnover  NUMBER
		,p_cr_turnover  NUMBER
		,p_event	VARCHAR2	--22-MAR-2006--FLEXCUBE V CL RELEASE 7.1 Schedules Related Changes by Yogesh 
		,p_esn	NUMBER --FLEXCUBE V.CL Release 7.2 ITR1 SFR#100 Fix
		);
--OBCL_14.6_#35713467 changes starts
  FUNCTION Fn_Get_Roll_Exchg_Rate(p_Tranche_Ref_No VARCHAR2,
                                  p_Ddref_No       VARCHAR2,
                                  p_Tranche_Ccy    VARCHAR2,
                                  p_Dd_Ccy         VARCHAR2,
                                  p_Amount         NUMBER,
                                  p_Value_Date     DATE DEFAULT Global.Application_Date,
                                  p_Event_Seq_No   NUMBER) RETURN NUMBER;
--OBCL_14.6_#35713467 changes ends

	FUNCTION fn_get_exchg_rate
		(p_tranche_ref_no VARCHAR2
		,p_ddref_no       VARCHAR2
		,p_tranche_ccy    VARCHAR2
		,p_dd_ccy         VARCHAR2
		,p_amount         NUMBER
		,p_value_date     DATE DEFAULT global.application_date
		)
	RETURN NUMBER;

	--FLEXCUBE V.CL Release 7.5 LOT1 FS Tag 2, Slab/Tier based Fee for Commitment and waiver ,PBG Changes by Saurabh START
	/*
	FUNCTION fn_ld_vdbal_update
		(p_contract_ref_no    VARCHAR2
		,p_event_code         VARCHAR2
		--,p_amount             NUMBER	--FLEXCUBE V.CL RELEASE 7.2 LD Regression Testing Fixes start,Removed this parameter
		,p_value_date         DATE
		)
	RETURN BOOLEAN;
	*/
	--FLEXCUBE V.CL Release 7.5 LOT1 FS Tag 2, Slab/Tier based Fee for Commitment and waiver ,PBG Changes by Saurabh END

	--FLEXCUBE V.CL Release 7.0 VAMI Changes by Aarthi start
	FUNCTION fn_vami_update
		(p_contract_ref_no 	IN	VARCHAR2
		,p_value_date		IN	DATE
		,p_vami_amount		IN	NUMBER DEFAULT 0
		,p_ccy			IN	VARCHAR2
		,p_action_code		IN	VARCHAR2
		,p_error_code		OUT	VARCHAR2 
		)
	RETURN BOOLEAN;
	--FLEXCUBE V.CL Release 7.0 VAMI Changes by Aarthi end
----13-FEB-2006-----FLEXCUBE V CL RELEASE 7.1 Schedules Related Changes by Yogesh ----START-------
	FUNCTION Fn_check_curr_limit
						(
						p_contract_ref_no IN VARCHAR2,
						p_error_code OUT VARCHAR2
						)
	RETURN BOOLEAN;
----13-FEB-2006-----FLEXCUBE V CL RELEASE 7.1 Schedules Related Changes by Yogesh ----END-------

	FUNCTION fn_get_tranche_unutil_amt
			  (p_tranche_ref_no			IN varchar2,
			   p_exclude_drawdown_ref_no IN varchar2,
			   p_value_date				IN date,
			   p_unutil_amount			OUT number,  
			   p_error_code				IN OUT varchar2,  
			   p_error_params			IN OUT varchar2
			   )
    RETURN boolean;
	--FLEXCUBE V.CL RELEASE 7.2 LD Regression Testing Fixes start
	--FLEXCUBE V.CL Release 7.5 LOT1 FS Tag 2, Slab/Tier based Fee for Commitment and waiver ,PBG Changes by Saurabh START
	/*
	FUNCTION fn_recalc_ldvdbal
			(p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
			p_value_date	IN DATE,
			p_balance_type  IN VARCHAR2,
			p_err_code	IN OUT VARCHAR2,
			p_err_param	IN OUT VARCHAR2
			)
	RETURN BOOLEAN;
	*/
	--FLEXCUBE V.CL Release 7.5 LOT1 FS Tag 2, Slab/Tier based Fee for Commitment and waiver ,PBG Changes by Saurabh END
	
	FUNCTION fn_conv
			(
			p_contract_ref_no	VARCHAR2,
			p_loan_ccy		VARCHAR2,
			p_link_ccy		VARCHAR2,
			p_amount		NUMBER
			)
	RETURN NUMBER;
	--FLEXCUBE V.CL RELEASE 7.2 LD Regression Testing Fixes end 
--FLEXCUBE V.CL Release 7.2 ITR1 SFR #100 Nirupama ST
FUNCTION fn_get_exchg_rate
		(p_tranche_ref_no  varchar2
		,p_ddref_no varchar2
		,p_tranche_ccy  varchar2
		,p_dd_ccy varchar2
		,p_amount number
		,p_value_date  DATE  default GLOBAL.Application_Date
    		,p_event_seq_no number
		)
	RETURN NUMBER;
--FLEXCUBE V.CL Release 7.2 ITR1 SFR #100 Nirupama ED


--FCC V.CL Release 7.3 SPLIT Re Price changes Starts
	FUNCTION Fn_get_osbal
					 (p_contract_ref_no   		 oltbs_contract.contract_ref_no%TYPE,
					  p_contract_type			 Varchar2,		-- TR -> Tranche , DR -> Drawdown
					  p_value_date				 oltbs_contract_vdbal.value_date%TYPE
					  )
	RETURN NUMBER;
--FCC V.CL Release 7.3 SPLIT Re Price changes ends
--flexcube v.cl release 7.3 itr2 sfr#32, maneeha starts and added in spc. this fn is being from llvdbal.sql as well
FUNCTION fn_update_amount_due
		(p_contract_ref_no	IN VARCHAR2,
		 p_date			IN DATE,
		 p_amount		IN NUMBER,
		 p_child_maturity_date	IN DATE DEFAULT '01-JAN-1900') 
RETURN BOOLEAN;
--flexcube v.cl release 7.3 itr2 sfr#32, maneeha ends and added in spc. this fn is being from llvdbal.sql as well

--26-AUG-2009 CITIUS-LS#6235, Clearpar and SLT incremental changes retro - ITR1 SFR#135 changes starts here
FUNCTION fn_get_exchange_rate
	(p_tranche_ref_no	VARCHAR2
	,p_ddref_no		VARCHAR2
	,p_tranche_ccy		VARCHAR2
	,p_dd_ccy		VARCHAR2
	,p_value_date		DATE DEFAULT global.application_date
	)
RETURN NUMBER;
--26-AUG-2009 CITIUS-LS#6235, Clearpar and SLT incremental changes retro - ITR1 SFR#135 changes ends here
--OBCL_14.5_STAND_BY_FEE start
FUNCTION Fn_Get_Fecility_Unutil_Amt(p_Fecility_Ref_No        IN VARCHAR2,
                                     p_Value_Date              IN DATE,
                                     p_Unutil_Amount           OUT NUMBER,
                                     p_Error_Code              IN OUT VARCHAR2,
                                     p_Error_Params            IN OUT VARCHAR2)
    RETURN BOOLEAN;

FUNCTION Fn_Get_Part_Unutil_Amt(p_Fecility_Ref_No          IN VARCHAR2,
                                  p_counter_party            IN VARCHAR2,
                                     p_Value_Date              IN DATE,
                                     p_Unutil_Amount           OUT NUMBER,
                                     p_Error_Code              IN OUT VARCHAR2,
                                     p_Error_Params            IN OUT VARCHAR2)
    RETURN BOOLEAN;
--OBCL_14.5_STAND_BY_FEE end
END lbpks_vdbal;
/
CREATE or replace SYNONYM lbpkss_vdbal FOR lbpks_vdbal
/