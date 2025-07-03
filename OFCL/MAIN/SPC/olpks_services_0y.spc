CREATE OR REPLACE PACKAGE olpks_services_0y
AS
/*------------------------------------------------------------------------------------------------------------------------
**
** File Name	: olpks_services_0y.SPC
**
** Module	: MIS REFINANCE
**
** This source is part of the FLEXCUBE Corporate - Corporate Banking Software System
** and is copyrighted by i-flex solutions limited.
**
** No part of it may be reproduced, stored, transmitted or modified
** without prior written consent from the copyright owner. The
** copyright owner further retains the privilege to modify all or some
** of this program.
**
** i-flex solutions limited
** 10-11, SDF I, SEEPZ, Andheri (East),
** MUMBAI - 400 096.
** INDIA
**
**  2004 by i-flex solutions limited
-------------------------------------------------------------------------------------------------------------------------
09-sep-2016 OFCL12.2 changes MIS Refinancing
*/

---
--- Pl/sql Table created for the rate details
---

TYPE 	rec_rate_details
IS 	RECORD
	(
	branch_code					oltms_pool_dly_ref_rates_dtls.branch_code%TYPE,
	pool_code					oltms_pool_dly_ref_rates_dtls.pool_code%TYPE,	
	ccy						oltms_pool_dly_ref_rates_dtls.ccy%TYPE,		
	eff_date					oltms_pool_dly_ref_rates_dtls.eff_date%TYPE,	
	dr_rate					oltms_pool_dly_ref_rates_dtls.dr_rate%TYPE,	
	cr_rate					oltms_pool_dly_ref_rates_dtls.cr_rate%TYPE,	
	cr_rate_sign				oltms_pool_dly_ref_rates_dtls.cr_rate_sign%TYPE,
	dr_rate_sign				oltms_pool_dly_ref_rates_dtls.dr_rate_sign%TYPE,
	row_id					VARCHAR2(100)
	);

TYPE							Tbl_rate_details
IS TABLE OF 					rec_rate_details
INDEX BY 						BINARY_INTEGER;

g_rate_details					Tbl_rate_details;



TYPE	rec_acc_details
IS	RECORD
	(	
	branch_code					oltbs_acc_rate_calc.branch_code%TYPE,
	unit_ref_no					oltbs_acc_rate_calc.unit_ref_no%TYPE,
	ccy						oltbs_acc_rate_calc.ccy_code%TYPE,
	unit_type					VARCHAR2(1)
	);

	
TYPE							Tbl_acc_details
IS TABLE OF 					rec_acc_details
INDEX BY 						BINARY_INTEGER;

g_acc_details					Tbl_acc_details;


TYPE							Tbl_pool_details
IS TABLE OF 					oltws_pool_rate_queue%ROWTYPE
INDEX BY 						BINARY_INTEGER;

g_rate_queue_details				Tbl_pool_details;

---
--- Record Type created to store the picked up details for Period
---

TYPE	rec_period_details IS RECORD
	(
	period_code		oltms_period_codes.period_code%TYPE,
	start_date		oltms_period_codes.pc_start_date%TYPE,
	end_date		oltms_period_codes.pc_end_date%TYPE,
	fin_cycle		oltms_period_codes.fin_cycle%TYPE
	);
	
---
--- Pl/sql Table created for the Record created for Period
---	
TYPE tb_mi_period_details IS 
TABLE OF rec_period_details INDEX BY VARCHAR2(64);

--OFCL12.2 changes MIS Refinancing start

TYPE	rec_ictm_rate
IS	RECORD
	(	
	rate_code		lftbs_contract_interest.rate_code%TYPE,
	ccy_code		lftbs_contract_interest.currency%TYPE,
	start_date		lftbs_contract_interest.value_date%TYPE, -- start date
	end_date		DATE,
	rate			lftbs_contract_interest.rate%TYPE,
	rowid			VARCHAR2(100)
	);

	
TYPE							Tbl_ictm_rate
IS TABLE OF 					rec_ictm_rate
INDEX BY 						BINARY_INTEGER;

g_ictm_rate						Tbl_ictm_rate;

-- the above record is same for ICFL and LDFL
--OFCL12.2 changes MIS Refinancing end

TYPE	rec_icfl_acc
IS 	RECORD
	(
	branch_code		oltbs_class_mapping.branch_code%TYPE,
	unit_ref_no		oltbs_class_mapping.unit_ref_no%TYPE, -- system account no
	orig_unit_ref_no	oltbs_class_mapping.unit_ref_no%TYPE, -- contract reference no
	unit_type		oltbs_class_mapping.unit_type%TYPE,
	cr_ref_rate_code	oltbs_class_mapping.cr_ref_rate_code%TYPE,
	dr_ref_rate_code	oltbs_class_mapping.dr_ref_rate_code%TYPE,
	--ccy			sttms_cust_account.ccy%TYPE
	ccy				lftbs_contract_interest.currency%TYPE
	);
	
TYPE							Tbl_icfl_acc
IS TABLE OF						rec_icfl_acc
INDEX BY						BINARY_INTEGER;

g_icfl_acc						Tbl_icfl_acc;


TYPE	rec_mitb_rates
IS	RECORD
	(
	branch_code					oltbs_dly_refinance_rates.branch_code%TYPE,
	unit_ref_no					oltbs_dly_refinance_rates.unit_ref_no%TYPE,	
	ccy						oltbs_dly_refinance_rates.ccy%TYPE,
	start_date					oltbs_dly_refinance_rates.eff_date%TYPE,
	end_date					DATE,
	cr_ref_spread				oltbs_dly_refinance_rates.cr_ref_spread%TYPE,
	cr_ref_rate_sign				oltbs_dly_refinance_rates.cr_ref_rate_sign%TYPE,
	dr_ref_spread				oltbs_dly_refinance_rates.dr_ref_spread%TYPE,
	dr_ref_rate_sign				oltbs_dly_refinance_rates.dr_ref_rate_sign%TYPE,
	field_changed				oltbs_dly_refinance_rates.field_changed%TYPE,
	ref_rate					oltbs_dly_refinance_rates.ref_rate%TYPE,
	ref_spread					oltbs_dly_refinance_rates.ref_spread%TYPE,
	ref_rate_sign				oltbs_dly_refinance_rates.ref_rate_sign%TYPE,
	ref_rate_code				oltbs_class_mapping.ref_rate_code%TYPE,
	ref_rate_type				oltbs_class_mapping.ref_rate_type%TYPE,
	rate_flag					oltbs_class_mapping.rate_flag%TYPE,
	rowid						VARCHAR2(100),
	cr_ref_rate_code				oltbs_dly_refinance_rates.cr_ref_rate_code%TYPE,
	dr_ref_rate_code				oltbs_dly_refinance_rates.cr_ref_rate_code%TYPE
	);
	
TYPE							Tbl_mitb_ref_rates
IS TABLE OF						rec_mitb_rates
INDEX BY						BINARY_INTEGER;


g_mitb_ref_rates					Tbl_mitb_ref_rates;


TYPE	rec_rate_calc
IS	RECORD
	(
	branch_code 		oltbs_acc_rate_calc.branch_code%TYPE, 	           		
	unit_ref_no             oltbs_acc_rate_calc.unit_ref_no%TYPE,     
	unit_type               oltbs_acc_rate_calc.unit_type%TYPE,       
	ccy_code                oltbs_acc_rate_calc.ccy_code%TYPE,        
	dr_cr_indicator         oltbs_acc_rate_calc.dr_cr_indicator%TYPE, 
	start_date              oltbs_acc_rate_calc.start_date%TYPE,      
	end_date                oltbs_acc_rate_calc.end_date%TYPE,        
	net_rate                oltbs_acc_rate_calc.net_rate%TYPE,        
	rate                    oltbs_acc_rate_calc.rate%TYPE,            
	spread                  oltbs_acc_rate_calc.spread%TYPE,
	sign				VARCHAR2(1)
	);
	
TYPE							Tbl_mitb_acc_rate_calc
IS TABLE OF						rec_rate_calc
INDEX BY						BINARY_INTEGER;


g_cr_mitb_acc_rate_calc				Tbl_mitb_acc_rate_calc;
g_dr_mitb_acc_rate_calc				Tbl_mitb_acc_rate_calc;

g_mitb_acc_rate_calc				Tbl_mitb_acc_rate_calc;


TYPE	rec_mitb_tbl	
IS	RECORD
	(
	branch_code			oltbs_dly_refinance_rates.branch_code%TYPE,
	unit_ref_no			oltbs_dly_refinance_rates.unit_ref_no%TYPE,
	ccy_code			oltbs_dly_refinance_rates.ccy%TYPE,
	rate_code			oltbs_dly_refinance_rates.ref_rate_code%TYPE,
	start_date			oltbs_dly_refinance_rates.eff_date%TYPE,
	end_date			oltbs_dly_refinance_rates.eff_date%TYPE,
	ref_rate_type		oltbs_dly_refinance_rates.ref_rate_type%TYPE,
	rate_flag			oltbs_class_mapping.rate_flag%TYPE,
	cr_ref_rate_code		oltbs_dly_refinance_rates.cr_ref_rate_code%TYPE,
	dr_ref_rate_code		oltbs_dly_refinance_rates.dr_ref_rate_code%TYPE
	);

TYPE					Tbl_contract_tbl
IS TABLE OF				rec_mitb_tbl
INDEX BY				BINARY_INTEGER;


TYPE	rec_active_date
IS	RECORD
	(
	active_date			DATE
	);

TYPE					Tbl_active_date
IS TABLE OF				rec_active_date
INDEX BY				VARCHAR2(100);

g_active_date_tbl			Tbl_active_date;



FUNCTION fn_rate_resolution
		(
		p_branch		IN		VARCHAR2,
		p_process_date	IN		DATE,
		p_error_code	IN 	OUT	VARCHAR2,
		p_error_param	IN	OUT	VARCHAR2
		)
RETURN BOOLEAN;


END olpks_services_0y;
/