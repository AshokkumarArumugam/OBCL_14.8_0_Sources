CREATE OR REPLACE PACKAGE lfpks_fee_prop_bulk
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : lfpks_fee_prop_bulk.SPC
**
** Module       : CF
This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
/* Change History - Start 
20-AUG-2006 	FLEXCUBE V.CL Release 7.1 BVPRAM CHANGES BY PIYUSH
		p_indicator is added as an IN parameter to FUNCTION fn_participant_propagation
  Changed By         : Abhinav Bhasker
  Changed On         : 31-Mar-2022
  Search String      : OBCL_14.5_STAND_BY_FEE
  Change Reason      : Changes w.r.t. StandByFees (SFR# 34004511)
*/



TYPE t_cftb_contract_fee_calc IS TABLE OF LFTB_CONTRACT_FEE_CALC%ROWTYPE INDEX BY BINARY_INTEGER;
p_FEECALC  lfpks_fee_prop_bulk.t_cftb_contract_fee_calc;
p_INC_FEECALC  lfpks_fee_prop_bulk.t_cftb_contract_fee_calc;


TYPE t_cstb_amount_due IS TABLE OF OLTB_AMOUNT_DUE_CS%ROWTYPE INDEX BY BINARY_INTEGER;
p_AMTDUE  lfpks_fee_prop_bulk.t_cstb_amount_due;
p_INC_AMTDUE  lfpks_fee_prop_bulk.t_cstb_amount_due;    

/*Commented and introduced the new fn_particpant_propagation as per the discussion
FUNCTION fn_participant_propagation
(
p_contract_ref_no	IN	oltbs_contract.contract_ref_no%Type,
p_inc_amtdue		IN OUT	lfpks_fee_prop_bulk.t_cstb_amount_due,
p_inc_feecalc		IN OUT	lfpks_fee_prop_bulk.t_cftb_contract_fee_calc,
p_error_code		IN OUT	Varchar2,
p_error_parameter	IN OUT	Varchar2
)
Return Boolean;*/

FUNCTION fn_participant_propagation
	(
	p_borrower_crn			IN	oltbs_contract.contract_ref_no%Type,
	p_component			IN	oltbs_amount_due_cs.COMPONENT%type,
	p_propagate_value_start_date	IN	Date,
	p_indicator			IN	varchar2, --25-JUL-2006 FLEXCUBE V.CL Release 7.1 BVPRAM CHANGES,PIYUSH
	p_inc_amtdue			IN OUT	lppkss_upload.t_cstb_amount_due,
	p_inc_feecalc			IN OUT	lppkss_upload.t_cftb_contract_fee_calc,
	p_error_code			IN OUT	Varchar2,
	p_error_parameter		IN OUT	Varchar2
	)
Return Boolean;
	
FUNCTION fn_propagate_for_a_participant
	(
	p_participant_crn		IN		oltbs_contract.contract_ref_no%Type,
	p_borrower_crn			IN		oltbs_contract.contract_ref_no%Type,
	p_participant			IN		oltbs_contract_master.counterparty%type,
	p_inc_amtdue			IN OUT	lppkss_upload.t_cstb_amount_due,
	p_inc_feecalc			IN OUT	lppkss_upload.t_cftb_contract_fee_calc,
	p_error_code			IN OUT	Varchar2,
	p_error_parameter		IN OUT	Varchar2
	)
Return Boolean;
/*	
FUNCTION fn_pickup_component
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%Type,
	p_participant_crn		IN		lptbs_contract_master.contract_ref_no%Type,
	p_start_date			IN		lbtbs_propagation_master.propagate_value_start_date%Type,
	p_participant_row		IN		lbtbs_contract_participant%Rowtype,
	p_participant_type		IN		Varchar2,
	p_inc_amtdue			IN OUT	lppkss_upload.t_cstb_amount_due,
	p_inc_feecalc			IN OUT	lppkss_upload.t_cftb_contract_fee_calc,
	p_error_code			IN OUT	Varchar2,
	p_error_parameter		IN OUT	Varchar2
	)
Return Boolean;*/
	
FUNCTION Fn_Get_Component_Ratio
(
p_contract_ref_no 	IN		VARCHAR2
,	p_customer_no		IN		VARCHAR2
,	p_component			IN		VARCHAR2
,	p_value_date		IN		DATE
,	p_component_ratio		IN OUT	NUMBER
,	p_error_code		IN OUT	VARCHAR2
,	p_error_parameter		IN OUT	VARCHAR2
) 
RETURN BOOLEAN;

FUNCTION FN_PROPAGATE_FEE
(
p_contract_ref_no	IN 	oltbs_contract.contract_Ref_no%type
) RETURN BOOLEAN;

FUNCTION fn_propagate_for_fee_component
	(
	p_borrower_crn			IN	oltbs_contract.contract_ref_no%Type,
	p_inc_amtdue			IN OUT	lppkss_upload.t_cstb_amount_due,
	p_inc_feecalc			IN OUT	lppkss_upload.t_cftb_contract_fee_calc,
	p_error_code			IN OUT	Varchar2,
	p_error_parameter		IN OUT	Varchar2
	)
RETURN BOOLEAN;

--FLEXCUBE V.CL Release 7.2. 12-Dec-2006. Participant Driven Fee (Breakage Fee) changes.START
FUNCTION fn_get_partfee_amount
	(
	p_contract_ref_no 	IN	oltbs_contract.contract_ref_no%Type,	
	p_component 		IN	lftbs_contract_partdriven_fee.component%TYPE,
	p_participant		IN	lftbs_contract_partdriven_fee.participant%TYPE,	
	p_sch_date		IN	lftbs_contract_partdriven_fee.schedule_date%TYPE,
	p_part_fee_flag		OUT	lftms_product_fee.participant_driven_fee%TYPE,	
	p_fee_amount		OUT	lftbs_contract_partdriven_fee.fee_amount%TYPE
	)
RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.2. 12-Dec-2006. Participant Driven Fee (Breakage Fee) changes.END
--OBCL_14.5_STAND_BY_FEE Start
FUNCTION fn_get_sbf_rate (      p_borrower_ref_no    VARCHAR2,
                                p_parti_ref_no VARCHAR2,
								  p_counterparty VARCHAR2,
								  p_component	 VARCHAR2,
								  p_Value_Date	 Date,
                                  p_End_Date    Date,
								  p_basis_amount	NUMBER,
								  p_rate		OUT NUMBER,
								  p_error_code	 VARCHAR2,
								  p_error_parameter	 VARCHAR2
									)
RETURN BOOLEAN;
--OBCL_14.5_STAND_BY_FEE End
END lfpks_fee_prop_bulk;
/
CREATE or replace SYNONYM lfpkss_fee_prop_bulk FOR lfpks_fee_prop_bulk
/