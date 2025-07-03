Create or replace package olpks_mth_end as
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_mth_end.SPC
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
CHANGE HISTORY

09-Oct-2003 FCC4.4 DEC 2003 CEEMEA SFR #9458 MIS Back Dated Refinance Changes.
		Added overloaded function  fn_check_existence and FUNCTION fn_back_valued_day_ends.

19-sep-2016 OFCL12.2 changes MIS Refinancing.Unit has been taken
*/

-- FCCv3.8 CITI-Poland Changes 28-Oct-2001, Start
 
function fn_day_end (in_branch_code oltbs_class_mapping.branch_code%type,pm_current_date date)
				return integer;

 -- FCCv3.8 CITI-Poland Changes 28-Oct-2001, End				


function fn_main_month_end (in_branch_code oltbs_class_mapping.branch_code%type)
				return integer;

function fn_month_end (in_branch_code oltbs_class_mapping.branch_code%type)
				return integer;

function fn_de_month_end (in_branch_code oltbs_class_mapping.branch_code%type)
				return integer;

function fn_calc_cost(in_cost_code   mitms_cost_code.cost_code%type,
                      in_ref_no	    oltbs_unit_head_det.unit_ref_no%type,
                      in_branch_code oltbs_unit_head_det.branch_code%type,
							 in_ccy_code    oltbs_unit_head_det.ccy_code%type,
                      in_unit_type   oltbs_unit_head_det.unit_type%type,
                      out_tot_cost_lcy out number,
                      out_tot_cost_fcy out number)
return boolean;

function fn_calc_cost_de(in_de_head_det oltbs_de_head_det%rowtype,
                      in_cost_code   mitms_cost_code.cost_code%type,
                      out_tot_cost_lcy out number,
                      out_tot_cost_fcy out number)
return boolean;


function fn_applicable_month(in_present_date date,
									  in_app_month varchar2,
									  in_periodicity varchar2,
									  out_from_date in out date, 
									  out_to_date in out date)
return boolean;

function fn_check_existence(in_branch    oltbs_unit_head_det.branch_code%type,
                          in_urn       oltbs_unit_head_det.unit_ref_no%type,
                          in_ut        oltbs_unit_head_det.unit_type%type) 
return boolean;

function fn_set_rates(in_branch oltms_branch.branch_code%type)
return integer;


procedure pr_update_log(in_function oltbs_err_log_mi.function%type,
								in_branch   oltbs_err_log_mi.branch_code%type,
								in_unit_ref_no oltbs_err_log_mi.unit_ref_no%type,
								in_err_msg     oltbs_err_log_mi.error_msg%type);
-- FCC4.4 DEC 2003 CEEMEA SFR #9458 MIS Back Dated Refinance Changes..Starts
FUNCTION fn_back_valued_day_ends
(				in_branch_code In oltbs_class_mapping.branch_code%type
)
RETURN BOOLEAN;

FUNCTION fn_check_existence(in_branch    oltbs_unit_head_det.branch_code%type,
                          in_urn       oltbs_unit_head_det.unit_ref_no%type,
                          in_ut        oltbs_unit_head_det.unit_type%type,
			in_process_date	oltbs_unit_head_det.value_date%type) 
return boolean;
-- FCC4.4 DEC 2003 CEEMEA SFR #9458 MIS Back Dated Refinance Changes..Ends
end olpks_mth_end;
/
create or replace synonym olpkss_mth_end for olpks_mth_end
/