CREATE OR REPLACE PACKAGE olpks_refinance_0
AS
/*------------------------------------------------------------------------------------------------------------------------
**
** File Name	: olpks_refinance_0.spc
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

TYPE	rec_prin_details	is	record (	brn			oltbs_vd_bal.brn%TYPE,
						acc			oltbs_vd_bal.acc%TYPE,
						acc_type		VARCHAR2(1),
						ccy			oltbs_vd_bal.ccy%TYPE,
						start_dt		oltbs_vd_bal.val_dt%TYPE,
						end_dt		oltbs_vd_bal.val_dt%TYPE,
						bal			oltbs_vd_bal.bal%TYPE,
						cr_tur		oltbs_vd_bal.cr_tur%TYPE,
						dr_tur		oltbs_vd_bal.dr_tur%TYPE,
						dr_cr_ind		VARCHAR2(1),
						period_code		oltms_period_codes.period_code%TYPE,
						fin_cycle		oltms_period_codes.fin_cycle%TYPE
					);

--OFCL12.2 changes MIS Refinancing start
/*TYPE	acc_rec_details	is	record	(	branch			sttms_cust_account.branch_code%TYPE,
								acc				sttms_cust_account.cust_ac_no%TYPE,
								ccy				sttms_cust_account.ccy%TYPE,
								ac_type			VARCHAR2(1),
								rac_rates_applicable	VARCHAR2(1),
								avg_bal_reqd		VARCHAR2(1)
							);
							
*/
--OFCL12.2 changes MIS Refinancing end
/* TYPE	rec_prin_details
IS	RECORD
	(	o_branch_code		oltbs_vd_bal.brn%TYPE,
		o_acc_code			oltbs_vd_bal.acc%TYPE,
		o_ccy				oltbs_vd_bal.ccy%TYPE,
		o_acc_type			VARCHAR2(1),
		o_bal				oltbs_vd_bal.bal%TYPE,
		o_dr_cr_indicator		VARCHAR2(1),
		o_period_st_dt		oltms_period_codes.pc_start_date%TYPE,
		o_period_end_dt		oltms_period_codes.pc_end_date%TYPE,
		o_value_dt			oltbs_vd_bal.val_dt%TYPE,
		o_period_code		oltms_period_codes.period_code%TYPE,
		o_fin_cycle			oltms_period_codes.fin_cycle%TYPE,
		rac_rates_applicable	gltm_glmaster.rac_rates_applicable%TYPE,
		avg_bal_reqd		oltms_account_class.avg_bal_reqd%TYPE ,
		bv_pool_period		oltms_branch.ac_bv_pool_period%TYPE
	); */

TYPE							Tbl_prin_details
IS TABLE OF 					rec_prin_details
INDEX BY 						BINARY_INTEGER;

g_prin_details					Tbl_prin_details;

/*TYPE	rec_rate_dtls	IS
RECORD
	(	o_branch_code	oltms_pool_dly_ref_rates_dtls.branch_code%TYPE,
		o_acc_no		gltbs_contract_gl_map.system_ac_no%TYPE,
		o_pool_code		oltms_pool_dly_ref_rates_dtls.pool_code%TYPE,
		o_ccy			oltms_pool_dly_ref_rates_dtls.ccy%TYPE,
		o_eff_date		oltms_pool_dly_ref_rates_dtls.eff_date%TYPE,
		o_dr_rate		oltms_pool_dly_ref_rates_dtls.dr_rate%TYPE,
		o_cr_rate		oltms_pool_dly_ref_rates_dtls.cr_rate%TYPE,
		o_dr_rate_sign	oltms_pool_dly_ref_rates_dtls.dr_rate_sign%TYPE,
		o_cr_rate_sign	oltms_pool_dly_ref_rates_dtls.cr_rate_sign%TYPE,
		o_unit_ref_no	oltbs_class_mapping.unit_ref_no%TYPE,
		o_rate_flag		VARCHAR2(1) , 
		o_calc_method	oltbs_class_mapping.calc_method%TYPE 
	);

TYPE 		tbl_rate_dtls	IS
TABLE	OF	rec_rate_dtls	INDEX BY BINARY_INTEGER;

g_tb_rate_dtls	tbl_rate_dtls;*/


TYPE tbl_refin_tab is table of OLTB_REFIN_POOL_BAL%ROWTYPE index by binary_integer;

g_refin_tab		tbl_refin_tab;

TYPE tbl_rac_rates is table of OLTB_RAC_RATE%ROWTYPE index by binary_integer;

g_rac_tab		tbl_rac_rates;

type t_rate_calc_q is table of oltbs_acc_rate_calc%ROWTYPE index by binary_integer;

g_rate_calc_q	t_rate_calc_q;

FUNCTION  fn_main
	(	
	p_branch			IN		VARCHAR2,
	p_proc_date			IN		DATE,	
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

--OFCL12.2 changes MIS Refinancing start
/*
FUNCTION	fn_process_refin_queue	(	p_branch		IN	oltms_branch.branch_code%TYPE,
							p_ac_no		IN	sttms_cust_account.cust_ac_no%TYPE,
							p_acc_type		IN	VARCHAR2,
							p_function_id	IN	VARCHAR2,
							p_proc_date		IN	oltms_period_codes.pc_start_date%TYPE,
							p_no_of_jobs	IN	NUMBER,
							p_error_code	OUT	VARCHAR2,
							p_error_parameter	OUT	VARCHAR2
						)
RETURN BOOLEAN;


FUNCTION fn_mis_refin_wrp	(	p_branch		IN	oltms_branch.branch_code%TYPE,
						p_ac_tbl		IN	olpks_parallel.contracts_table,
						p_proc_date		IN	DATE,
						p_mode		IN	VARCHAR2,
						p_error_code	OUT	VARCHAR2,
						p_error_parameter	OUT	VARCHAR2 
					)
RETURN BOOLEAN;
*/
--OFCL12.2 changes MIS Refinancing end


--OFCL12.2 changes MIS Refinancing start
/*
FUNCTION fn_populate_refin_queue	(	
							p_branch_rec	IN	oltms_branch%ROWTYPE,
							p_proc_date		IN	OLTM_PERIOD_CODES.pc_start_date%TYPE,
							l_no_of_jobs	IN	NUMBER,
							p_error_code	OUT	VARCHAR2,
							p_error_parameter	OUT	VARCHAR2
						)
RETURN BOOLEAN;
*/
--OFCL12.2 changes MIS Refinancing end

END olpks_refinance_0;
/