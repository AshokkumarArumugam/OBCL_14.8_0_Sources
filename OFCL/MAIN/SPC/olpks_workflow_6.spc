CREATE OR REPLACE PACKAGE olpks_workflow_6 
AS

/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_workflow_6.SPC
**
** Module		: LOANS AND DEPOSITS
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
change History
06-Jun-2016 OFCL standalone changes, commented not required code. Search string--- OFCL12.2 Not required
*/

/*FUNCTION	fn_update_addl_mis
	(
	p_branch			IN		oltms_branch.branch_code%TYPE,
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_product_type		IN		oltbs_contract.product_type%TYPE,
	p_component			IN		oltbs_amount_due.component%TYPE,
	p_component_type		IN		oltbs_amount_due.component_type%TYPE,
	p_currency			IN		oltbs_amount_due.currency_amt_due%TYPE,
	p_liqd_value_date		IN		DATE,
	p_fund_value_date		IN		DATE,
	p_amount_paid		IN		oltbs_amount_due.amount_settled%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;*/---- OFCL12.2 Not required

FUNCTION fn_process_ovd_camd 
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%Type, 
	p_current_branch		IN		oltms_branch.branch_code%Type,	
	--p_currency			IN	      gltbs_contract_vd_bal.ccy_code%Type, -- OFCL12.2 Not required
	p_dbcr_ind	      	IN		oltbs_daily_log_ac.drcr_ind%Type,      
	p_event_code		IN		oltbs_contract.curr_event_code%TYPE,
	p_err_code        	IN OUT 	VARCHAR2,
	p_err_param       	IN OUT 	VARCHAR2
	)
RETURN  BOOLEAN;

FUNCTION  fn_process_funding_amt 
	( 
	p_contract_ref_no 			 oltbs_contract.contract_ref_no%Type,
	p_dc_ind	     			 oltbs_daily_log_ac.drcr_ind%TYPE,       
	p_amount	     			 oltbs_daily_log_ac.fcy_amount%TYPE,	
	--p_currency	     	      	 gltbs_contract_vd_bal.ccy_code%Type,	 -- OFCL12.2 Not required
	--p_ProcessingDate  			 gltbs_contract_vd_bal.value_date%Type,	-- OFCL12.2 Not required
	p_errcode	     IN OUT 	 ertbs_msgs.err_code%Type,	 
	p_errparam	     IN OUT		 VARCHAR2
	)
RETURN BOOLEAN;

End olpks_workflow_6;
/
CREATE or replace  SYNONYM	olpkss_workflow_6
FOR			olpks_workflow_6
/