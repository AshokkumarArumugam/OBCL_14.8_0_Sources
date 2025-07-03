CREATE OR REPLACE PACKAGE olpks_projectionx AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_projectionx.SPC
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
*/



/*
CHANGE HISTORY
02-JUN-2010 FLEXCUBE V.CL Release 7.7 CITIPBG Loan Vol1 Tag5 Changes, TD projection changes to project the principal,
		interest, tax for the given projection date.
21-APR-2011 Flexcube V.CL Release 7.9, CITIPBG , Changes for Vol1 Lot2 Tag07 - fn_project_after_mat moved to spec from package body
*/

FUNCTION fn_ld_projection
	(
	p_branch			IN		OLTB_CONTRACT.branch%TYPE
	,p_contract_ref_no	IN		oltbs_contract.contract_ref_no%TYPE
	,p_projection_date	IN		DATE
	,p_operation		IN		VARCHAR2
	,p_comp			OUT		VARCHAR2
	,p_comp_ccy			OUT		VARCHAR2
	,p_amt_due			OUT		VARCHAR2
	,p_tax_amt			OUT		VARCHAR2
	,p_error_code		IN OUT	VARCHAR2
	,p_error_parameter	IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_ldprojection_wrap
	(
	p_source_code		IN		VARCHAR2
	,p_user_ref_no		IN		oltbs_contract.contract_ref_no%TYPE
	,p_projection_date	IN		DATE
	,p_comp			OUT		VARCHAR2
	,p_comp_ccy			OUT		VARCHAR2
	,p_amt_due			OUT		VARCHAR2
	,p_tax_amt			OUT		VARCHAR2
	,p_error_code		IN OUT	VARCHAR2
	,p_error_parameter	IN OUT	VARCHAR2
  )
RETURN BOOLEAN;

FUNCTION fn_max_projection_dt
	(
	p_branch_code		IN		oltm_branch.branch_code%TYPE,
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_contract_ccy		IN		oltbs_contract.contract_ccy%TYPE,
	p_max_date			OUT		DATE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_projection_validation
	(
	p_branch_code		IN		oltbs_contract.branch%TYPE
	,p_contract_ref_no	IN		oltbs_contract.contract_ref_no%TYPE
	,p_projection_date	IN		DATE	
	,p_error_code		IN OUT	VARCHAR2
	,p_error_parameter	IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_projection_history
	(
	p_module_code		IN		VARCHAR2
	,p_branch			IN		VARCHAR2
	,p_unit_ref_no		IN		VARCHAR2
	,p_unit_type		IN		VARCHAR2
	,p_operation		IN		VARCHAR2
	,p_projection_date	IN		DATE
	,p_comp			IN		VARCHAR2
	,p_comp_ccy			IN		VARCHAR2
	,p_amt_due			IN		VARCHAR2
	,p_tax_amt			IN		VARCHAR2
	,p_error_code		IN OUT	VARCHAR2
	,p_error_parameter	IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--21-APR-2011 Flexcube V.CL Release 7.9, CITIPBG , Changes for Vol1 Lot2 Tag07 changes start
FUNCTION fn_get_roll_mat_dt
	(
	p_branch			IN		OLTB_CONTRACT.branch%TYPE
	,p_contract_ref_no	IN		oltbs_contract.contract_ref_no%TYPE
	,p_projection_date	IN		DATE
	,cs				IN		olpks_rollover.contract_struct
	,p_new_maturity_date	OUT		DATE
	,p_new_tenor		OUT		NUMBER
	,p_error_code		IN OUT	VARCHAR2
	,p_error_parameter	IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--21-APR-2011 Flexcube V.CL Release 7.9, CITIPBG , Changes for Vol1 Lot2 Tag07 changes end

End olpks_projectionx;
/
Create or replace Synonym olpkss_projection for olpks_projectionx
/