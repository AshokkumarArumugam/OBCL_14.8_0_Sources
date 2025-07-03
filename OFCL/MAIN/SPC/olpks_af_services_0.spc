CREATE OR REPLACE PACKAGE olpks_af_services_0
AS
/*------------------------------------------------------------------------------------------------------------------------
**
** File Name	: olpks_af_services_0.SPC
**
** Module		: Loans and Deposits(LD)
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
---------------------------------------------------------------------------------------------------------------
*/

--------------------------------------------------------------------------------------------------------------------------
/*CHANGE HISTORY START

DATE			FILE		FCC 		SITE			DESCRIPTION
			VERSION	VERSION

26-MAR-2003		1.0		4.2		BANGALORE 		Initial Version Written for Funding Automation Changes for
										CITILATAM. OPS Changes.

CHANGE HISTORY END 
*/
--------------------------------------------------------------------------------------------------------------------------
FUNCTION	fn_settlement_pickup
	(
	p_branch_code		IN		oltms_branch.branch_code%TYPE,
	p_product_code		IN		oltms_product.product_code%TYPE,
	p_customer_no		IN		oltms_customer.customer_no%TYPE,
	p_ccy_code			IN		cytms_ccy_defn.ccy_code%TYPE,
	p_reference_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION	fn_delete_subsystems
	(
	p_branch_code		IN		oltms_branch.branch_code%TYPE,
	p_reference_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_settlements		IN		VARCHAR2,
	p_mis				IN		VARCHAR2,
	p_udf				IN		VARCHAR2,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION	fn_copy
	(
	p_from_rowid		IN		rowid,
	p_new_dept_code		IN		oltms_department.department_code%TYPE,
	p_new_brn_code		IN		oltms_branch.branch_code%TYPE,
	p_new_trs_type		IN		oltms_treasury_source.treasury_type%TYPE,
	p_new_trs_source	IN		oltms_treasury_source.treasury_source%TYPE,
	p_new_prd_code		IN		oltms_product.product_code%TYPE,
	p_new_ccy_code		IN		cytms_ccy_defn.ccy_code%TYPE,
	p_new_rowid			OUT		rowid,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

END olpks_af_services_0;
/
CREATE or replace SYNONYM olpkss_af_services_0 FOR olpks_af_services_0
/