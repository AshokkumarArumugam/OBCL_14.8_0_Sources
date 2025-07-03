create or replace package olpks_data_collection as
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_data_collection
**
** Module		: MIS
**
** This source is part of the FLEXCUBE Corporate - Corporate Banking     
** Software System and is copyrighted by i-flex solutions limited.

** All rights reserved.  No part of this work may be reproduced,
** stored in a retrieval system, adopted or transmitted in any form
** or by any means, electronic, mechanical, photographic, graphic,
** optic recording or otherwise, translated in any language or 
** computer language, without the prior written permission  from iflex 
** solutions limited.
	
**  i-flex solutions limited.,
** 10-11, SDF I, SEEPZ, Andheri (East),
** MUMBAI - 400 096.
** INDIA.

Copyright © 1997-2004 by i-flex solutions limited.
----------------------------------------------------------------------------------------------------*/

/*
change history
new function fn_gl_pool_data_coll is added

26-MAR-2004 FCC 4.5 APR 2004 PLNCITI TIL#9883 MIS data collection on branch PL1 failed with error MI-MTH06
			--Tuning changes. Added commit frequency for data coillection

19-sep-2016 OFCL12.2 changes MIS Refinancing few changes not required and few changes have been updated			
*/

-- FCCv3.8 CITI-Poland Changes 29-Oct-2001, Start


function fn_main(in_branch oltbs_class_mapping.branch_code%type)
		   return integer;

function fn_new_main(in_branch oltbs_class_mapping.branch_code%type)
		   return integer;


function fn_main(in_branch oltbs_class_mapping.branch_code%type,pm_current_date date)
		   return integer;

 -- FCCv3.8 CITI-Poland Changes 29-Oct-2001, End

--new function for gl pool linkage changes....
FUNCTION fn_gl_pool_data_coll(
		    --OFCL12.3 CHANGES START HERE
		   /* p_branch   IN oltbs_vd_bal.brn%TYPE,
		    p_gl_code  IN oltbs_vd_bal.acc%TYPE,
		    p_ccy_code IN oltbs_vd_bal.ccy%TYPE,
		    p_gl_link_ccy IN oltbs_vd_bal.ccy%TYPE,
		    p_gl_link_brn IN oltbs_vd_bal.brn%TYPE*/
			p_branch   IN OLTB_CONTRACT_BALANCE_CS.brn%TYPE,
		    p_gl_code  IN oltb_account.ac_gl_no%TYPE,
		    p_ccy_code IN OLTB_CONTRACT_BALANCE_CS.ccy%TYPE,
		    p_gl_link_ccy IN OLTB_CONTRACT_BALANCE_CS.ccy%TYPE,
		    p_gl_link_brn IN OLTB_CONTRACT_BALANCE_CS.brn%TYPE --OFCL12.3 CHANGES END HERE
		    )
	return boolean;
function fn_head_update_account(in_tran_details IN OUT olvws_all_ac_entries%rowtype,pm_current_date Date)
					return integer;
function fn_update_de(in_de_rec  IN olvws_all_ac_entries%rowtype,
		      in_new_rec IN boolean
		      --FCC 4.5 APR 2004 PLNCITI TIL#9883 - Start
		      ,p_function		OUT		oltbs_err_log_mi.function%TYPE,
		      p_branch_code		OUT		oltbs_err_log_mi.branch_code%TYPE,
		      p_unit_ref_no		OUT		oltbs_err_log_mi.unit_ref_no%TYPE,
		      p_error_desc		OUT		oltbs_err_log_mi.error_msg%TYPE
		      --FCC 4.5 APR 2004 PLNCITI TIL#9883 - End
		      )
return integer;
							

function fn_check_alpha(in_test_string varchar2)
						return integer; 

function fn_calc_avg_bal(in_calc_method   char,
								in_trn_amt  number,
							   in_trn_date	date,
								in_ccy cytms_ccy_defn.ccy_code%type)
								return number;

function fn_confirm_uniq_instance
                   (in_branch oltbs_process_flag.branch_code%type)
return boolean;

function fn_clear_branch
                   (in_branch oltbs_process_flag.branch_code%type)
return boolean;

function fn_get_pool_det
                   (in_head_det in out oltbs_unit_head_det%rowtype
                   --FCC 4.5 APR 2004 PLNCITI TIL#9883 - Start
		    ,p_function			OUT		oltbs_err_log_mi.function%TYPE,
		    p_branch_code		OUT		oltbs_err_log_mi.branch_code%TYPE,
		    p_unit_ref_no		OUT		oltbs_err_log_mi.unit_ref_no%TYPE,
		    p_error_desc		OUT		oltbs_err_log_mi.error_msg%TYPE
		   --FCC 4.5 APR 2004 PLNCITI TIL#9883 - End
                   )
return boolean;

function fn_update_unit_head_det
                   (in_head_det in out oltbs_unit_head_det%rowtype,
		    in_ccy      in cytms_ccy_defn.ccy_code%type
		    --FCC 4.5 APR 2004 PLNCITI TIL#9883 - Start
		    ,p_function			OUT		oltbs_err_log_mi.function%TYPE,
		    p_branch_code		OUT		oltbs_err_log_mi.branch_code%TYPE,
		    p_unit_ref_no		OUT		oltbs_err_log_mi.unit_ref_no%TYPE,
		    p_error_desc		OUT		oltbs_err_log_mi.error_msg%TYPE
		    --FCC 4.5 APR 2004 PLNCITI TIL#9883 - End
		    )
return boolean;

function fn_update_de_head_det
              (lo_mitb_de_head_det in out oltbs_de_head_det%rowtype,
              lo_mitb_class_mapping in out oltbs_class_mapping%rowtype
              --FCC 4.5 APR 2004 PLNCITI TIL#9883 - Start
	      ,p_function			OUT		oltbs_err_log_mi.function%TYPE,
	      p_branch_code			OUT		oltbs_err_log_mi.branch_code%TYPE,
	      p_unit_ref_no			OUT		oltbs_err_log_mi.unit_ref_no%TYPE,
	      p_error_desc			OUT		oltbs_err_log_mi.error_msg%TYPE
	      --FCC 4.5 APR 2004 PLNCITI TIL#9883 - End
              )
return boolean;

function fn_set_key_fields
                  (in_tran_details in  olvws_all_ac_entries%rowtype,
		   lo_unit_head_det in out oltbs_unit_head_det%rowtype,
                   lo_new_rec       in out boolean,
                   lo_processed_de  in out boolean
                   --FCC 4.5 APR 2004 PLNCITI TIL#9883 - Start
		   ,p_function			OUT		oltbs_err_log_mi.function%TYPE,
		   p_branch_code		OUT		oltbs_err_log_mi.branch_code%TYPE,
		   p_unit_ref_no		OUT		oltbs_err_log_mi.unit_ref_no%TYPE,
		   p_error_desc			OUT		oltbs_err_log_mi.error_msg%TYPE
		   --FCC 4.5 APR 2004 PLNCITI TIL#9883 - End
                   )
return boolean;

function fn_update_mis_flag(in_flag  olvws_all_ac_entries.dly_hist%type,
                            in_serial  olvws_all_ac_entries.ac_entry_sr_no%type
                            --FCC 4.5 APR 2004 PLNCITI TIL#9883 - Start
			    ,p_function			OUT		oltbs_err_log_mi.function%TYPE,
			    p_branch_code		OUT		oltbs_err_log_mi.branch_code%TYPE,
			    p_unit_ref_no		OUT		oltbs_err_log_mi.unit_ref_no%TYPE,
			    p_error_desc		OUT		oltbs_err_log_mi.error_msg%TYPE
			    --FCC 4.5 APR 2004 PLNCITI TIL#9883 - End
                            ) 
return boolean;

--OFCL12.2 changes MIS Refinancing start
/*
FUNCTION fn_gl_pool_data(
		    p_branch   IN oltbs_vd_bal.brn%type,
		    p_gl_code  IN oltbs_vd_bal.acc%type,
		    p_ccy_code IN oltbs_vd_bal.ccy%type,
		    p_gl_link_ccy IN oltbs_vd_bal.ccy%type,				    
		    p_gl_link_brn IN oltbs_vd_bal.brn%type,
		    p_date	date
		    )
return boolean;
*/
--OFCL12.2 changes MIS Refinancing end

procedure pr_update_log(in_function oltbs_err_log_mi.function%type,
								in_branch   oltbs_err_log_mi.branch_code%type,
								in_unit_ref_no oltbs_err_log_mi.unit_ref_no%type,
								in_err_msg     oltbs_err_log_mi.error_msg%type);
								
-- ITR1 SFR 689 FCC 4.2 april 2003 OPS changes start

--OFCL12.2 changes MIS Refinancing start
/*
function fn_contract_mis_pool_calc(p_branch  	  	  IN 	   	oltms_branch.branch_code%TYPE,
			           p_error_code   	  IN OUT 	varchar2,
				   p_error_parameter	  IN OUT 	varchar2
				  )	
return boolean;
*/
--OFCL12.2 changes MIS Refinancing end

-- ITR1 SFR 689 FCC 4.2 april 2003 OPS changes End
								
end olpks_data_collection;
/
create or replace synonym olpkss_data_collection for olpks_data_collection
/