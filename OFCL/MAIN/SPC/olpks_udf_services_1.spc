CREATE OR REPLACE PACKAGE olpks_udf_services_1 AS

/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_udf_services_1.SPC
**
** Module		: SETTLEMENTS
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
CHANGE_HISTORY

21-JAN-2006 Flexcube V.CLRelease 7.0 CHANGES PIYUSH
*/

FUNCTION fn_default_from_product
	(
	p_contract_ref_no	IN 	oltbs_contract.contract_ref_no%TYPE,
	p_version_no		IN 	oltbs_contract.latest_version_no%TYPE,
	p_product_code		IN 	VARCHAR2,
	p_module		IN 	VARCHAR2,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter	IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;
	
---------------------------------------------------------------------------------------------
FUNCTION fn_check_contract_fields
	(
	p_contract_ref_no	IN		oltbs_contract.contract_ref_no%TYPE,
	p_version_no		IN 		oltbs_contract.latest_version_no%TYPE,
	p_error_code		IN OUT 	VARCHAR2,
	p_error_parameter	IN OUT 	VARCHAR2
	)
	RETURN BOOLEAN;
---------------------------------------------------------------------------------------------
Type field_value_typ is record 
	(
		field_val		OLTB_CONTRACT_UDF.field_val_1%type,
		product_code		oltms_product_userdef_fields.product_code%type		
	);

type field_value_rec is table of field_value_typ index by BINARY_INTEGER ;
---------------------------------------------------------------------------------------------

FUNCTION Fn_check_mandatory (
			     p_contract_ref_no	IN   	VARCHAR2,
			     p_version_no	IN   	VARCHAR2,
			     p_error_code	IN OUT  VARCHAR2,
			     p_error_parameter	IN OUT	VARCHAR2
			    )
RETURN BOOLEAN;

---------------------------------------------------------------------------------------------

FUNCTION fn_create_new_version
	(
	p_contract_ref_no 	IN		oltbs_contract.contract_ref_no%TYPE,
	p_old_version_no		IN		oltbs_contract.latest_version_no%TYPE,
	p_new_version_no		IN		oltbs_contract.latest_version_no%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;
---------------------------------------------------------------------------------------------
	
FUNCTION fn_delete_contract
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_version_no		IN		oltbs_contract.latest_version_no%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;
---------------------------------------------------------------------------------------------
	
FUNCTION fn_copy_contract
	(
	p_new_contract_ref_no	IN		oltbs_contract.contract_ref_no%TYPE,
	p_old_contract_ref_no	IN		oltbs_contract.contract_ref_no%TYPE,
	p_latest_version_no	IN		oltbs_contract.latest_version_no%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;
-- FCC 4.5 Changes Starts
FUNCTION fn_fetch_contract_udfs
					(
					p_contract_ref_no	IN	VARCHAR2,
					p_version_no		IN	NUMBER,
					p_udf_tbl		OUT	olpks_udf_services_1.field_value_rec,
					p_error_code		IN OUT	VARCHAR2
					)
RETURN BOOLEAN;
-- FCC 4.5 Changes Ends
-----------------------------------------------------------------------------------------------------------

--21-JAN-2006 Flexcube V.CLRelease 7.0 CHANGES PIYUSH

TYPE t_cstb_contract_udf  IS TABLE OF  OLTB_CONTRACT_UDF  %ROWTYPE INDEX BY BINARY_INTEGER;
P_inc_conudf  olpks_udf_services_1.t_cstb_contract_udf  ;

--21-JAN-2006 Flexcube V.CLRelease 7.0 CHANGES PIYUSH


END olpks_udf_services_1;
/
CREATE or replace SYNONYM olpkss_udf_services_1 FOR olpks_udf_services_1
/