CREATE OR REPLACE PACKAGE lfpks_feecalc
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : lfpks_feecalc.SPC
**
** Module       : CF
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
/* Change History - Start
11-JAN-2006	FLEXCUBE V.CL RELEASE 7.0 FEE CHANGES,copyright clause changed by Sangeetha.
08-FEB-2006	FLEXCUBE V.CL Release 7.0 FS# 3.0 fee changes,Sangeetha added FN_FEE_TEMP_POPULATE. 	
18-DEC-2006 FLEXCUBE V.CL Release 7.2 FAS91 Fee Related Changes -
Moved the function fn_populate_fee_calc_simply to spec. 
24-FEB-2009 FCC V.CL Release 7.5 CITIUS RETRO TILL#5265, Added the function Fn_populate_fee_calc_stp for STP

Changed By         : Arvind Baskar
    Changed On         : 23-APR-2019
    Search String      : Bug#30019030   
    Change Reason      : Hook provided for fn_check_component
	
	Changed By         : Palanisamy M
    Changed On         : 4-Jan-2022  
    Change Reason      : Fix provided for rounding mismatch in tier based fee calculation
    Search String      : Bug#33457776 		
Change History - End*/

Type value_date_rec Is Record (value_date	Date);
Type value_date_tbl Is Table Of value_date_rec Index By Binary_Integer;	

--Bug#30019030     changes start
  --PROCEDURE Pr_Skip_Handler(P_Stage IN VARCHAR2);
  PROCEDURE Pr_Set_Skip_Kernel;
  PROCEDURE Pr_Set_Activate_Kernel;
  PROCEDURE Pr_Set_Skip_Cluster;
  PROCEDURE Pr_Set_Activate_Cluster;
  FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
--Bug#30019030     changes end

FUNCTION fn_pickup_fee
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%Type,
	p_value_date		IN		oltbs_contract_master.value_date%Type,
	p_error_code		IN OUT	Varchar2,
	p_error_parameter		IN OUT	Varchar2
	)
	Return Boolean;

FUNCTION fn_pickup_fee
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%Type,
	p_value_date		IN		oltbs_contract_master.value_date%Type,
	p_component			IN		lftbs_contract_fee.component%Type Default Null, 
	p_fee_rule			IN		lftbs_contract_fee.fee_rule%Type Default Null,
	p_amount_tag		IN		lftms_product_fee.basis_amount_tag%Type Default Null,
	p_basis_amount		IN		lftbs_contract_fee_vd_changes.basis_amount%Type Default Null,
	p_fee_collection_mode	IN		lftms_product_fee.fee_collection_mode%Type Default Null,
	p_process_till_date	IN		Date Default Global.application_date,
	p_error_code		IN OUT	Varchar2,
	p_error_parameter		IN OUT	Varchar2
	)
	Return Boolean;

FUNCTION fn_pickup_count
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%Type,
	p_component			IN		lftbs_contract_fee.component%Type,
	p_count_basis		IN		lftbs_contract_periodic_count.count_basis%Type,
	p_value_date		IN		oltbs_contract_master.value_date%Type,
	p_start_date		IN		lftbs_contract_fee.start_date%Type,
	p_end_date			IN		lftbs_contract_fee.end_date%Type,
	p_count			OUT		lftbs_contract_periodic_count.count%Type,
	p_error_code		IN OUT	Varchar2,
	p_error_parameter		IN OUT	Varchar2
	)
	Return Boolean;

FUNCTION fn_pickup_basis_amt
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%Type,
	p_value_date		IN		oltbs_contract_master.value_date%Type,
	p_component			IN		lftbs_contract_fee.component%Type Default Null,
	p_start_date		IN		lftbs_contract_fee.start_date%Type Default Null,
	p_end_date			IN		lftbs_contract_fee.end_date%Type Default Null,
	p_basis_amount		OUT		lftbs_contract_fee_vd_changes.basis_amount%Type,
	p_error_code		IN OUT	Varchar2,
	p_error_parameter		IN OUT	Varchar2
	)
	Return Boolean;

FUNCTION fn_pickup_rate_or_amount
	(
	p_contract_ref_no		IN		lftms_fee_component.contract_ref_no%Type,
	p_component			IN		lftbs_contract_fee.component%Type,
	p_margin_comp		IN		lftms_fee_component.component%Type,
	p_effective_date		IN		lftms_fee_ccy_effdate.effective_date%Type,
	p_start_date		IN		lftbs_contract_fee.start_date%Type Default Null,
	p_end_date			IN		lftbs_contract_fee.end_date%Type Default Null,
	p_basis_amount		IN		lftbs_contract_fee_vd_changes.basis_amount%Type,
	--lo_rate			OUT		lftms_fee_rate.fee_rate%Type, --Bug#33457776 Changes
	lo_rate			OUT		Lftbs_Contract_Fee_Vd_Changes.Rate%Type, --Bug#33457776 Changes
	lo_flat_amount		OUT		lftms_fee_rate.fee_amt%Type,
	p_error_code		IN OUT	Varchar2,
	p_error_parameter		IN OUT	Varchar2
	)
	Return Boolean;

FUNCTION fn_pickup_iccf_amount
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%Type,
	p_value_date		IN		oltbs_contract_master.value_date%Type,
	p_component			IN		lftbs_contract_fee.component%Type,
	p_start_date		IN		lftbs_contract_fee.start_date%Type,
	p_end_date			IN		lftbs_contract_fee.end_date%Type,
	p_rule			IN		lftms_product_fee.fee_rule%Type,
	p_component_ccy		IN		lftbs_contract_fee.component_ccy%Type,
	p_basis_amount		IN		lftbs_contract_fee_vd_changes.basis_amount%Type,
	p_rate			OUT		lftbs_contract_fee_vd_changes.rate%Type,
	p_flat_amount		OUT		lftbs_contract_fee_vd_changes.flat_amount%Type,
	p_amount_ccy		OUT		lftms_rule.currency%Type,
	p_error_code		IN OUT	Varchar2,
	p_error_parameter		IN OUT	Varchar2
	)
	Return Boolean;
--FLEXCUBE V.CL Release 7.0 FEE Changes by Sangeetha on 08-FEB-2006,added FN_FEE_TEMP_POPULATE
FUNCTION FN_FEE_TEMP_POPULATE
(
p_contract_ref_no	IN	lftms_fee_component.contract_ref_no%Type,
p_component		IN	lftms_fee_component.component%Type,
p_effective_date	IN lftms_fee_rate.effective_date%Type,
p_error_code		IN OUT varchar2,
p_error_parameter	IN OUT varchar2
)
RETURN BOOLEAN;

--18-DEC-2006 FLEXCUBE V.CL Release 7.2 FAS91 Fee Related Changes starts
FUNCTION fn_populate_fee_calc_simply
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%Type,
	p_value_date		IN		oltbs_contract_master.value_date%Type,
	p_component			IN		lftbs_contract_fee.component%Type,
	p_component_ccy		IN		lftbs_contract_fee.component_ccy%Type,
	p_error_code		IN OUT	Varchar2,
	p_error_parameter		IN OUT	Varchar2
	)
	Return Boolean ;
--18-DEC-2006 FLEXCUBE V.CL Release 7.2 FAS91 Fee Related Changes ends 

--24-FEB-2009 FCC V.CL Release 7.5 CITIUS RETRO TILL#5265 Starts
FUNCTION Fn_populate_fee_calc_stp
	(
	p_contract_ref_no	IN		oltbs_contract.contract_ref_no%Type,
	p_value_date		IN		oltbs_contract_master.value_date%Type,
	p_component			IN		lftbs_contract_fee.component%Type,
	p_component_ccy		IN		lftbs_contract_fee.component_ccy%Type,
	p_error_code		IN OUT	Varchar2,
	p_error_parameter	IN OUT	Varchar2
	)
RETURN BOOLEAN;
--24-FEB-2009 FCC V.CL Release 7.5 CITIUS RETRO TILL#5265 Ends
--OBCL_14.4_LS_Fee_Recalc Changes Start             
FUNCTION Fn_Populate_Fee_Recalc(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
							  p_Value_Date      IN Oltbs_Contract_Master.Value_Date%TYPE,
							  p_Processing_Date IN DATE,
							  p_Component       IN Lftbs_Contract_Fee.Component%TYPE,
							  p_Pickup_Esn      IN Lftbs_Contract_Fee.Event_Seq_No%TYPE,
							  p_Component_Ccy   IN Lftbs_Contract_Fee.Component_Ccy%TYPE,
							  p_Basis_Tag       IN Lftms_Product_Fee.Basis_Amount_Tag%TYPE,
							  p_Pop_Pay_Recv    IN VARCHAR2,
							  p_Pay_Recv_Amount OUT Oltbs_Amount_Due_Cs.Pay_Recv_Amount%TYPE,
							  p_Error_Code      IN OUT VARCHAR2,
							  p_Error_Parameter IN OUT VARCHAR2)
RETURN BOOLEAN;
--OBCL_14.4_LS_Fee_Recalc Changes End 	
END lfpks_feecalc;
/
Create or replace Synonym lfpkss_feecalc for lfpks_feecalc
/