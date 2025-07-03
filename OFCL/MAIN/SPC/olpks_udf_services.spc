CREATE OR REPLACE PACKAGE olpks_udf_services AS
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle Banking Software Product
** Copyright ©  2002 - 2013  Oracle and/or its affiliates.  All rights reserved.
** 												
** No part of this work may be reproduced, stored in a retrieval system,
** adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise,
** translated in any language or computer language,
** without the prior written permission of Oracle and/or its affiliates.
**
**
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India.
------------------------------------------------------------------------------------------
** Modified By           : Chandra Achuta
** Modified On           : 28-DEC-2018
** Modified Reason       : Changes done to validate if not amendable UDF's are modified at contract level.
** Search string         : Bug#29020989

** Modified By           : Chandra Achuta
** Modified On           : 04-NOV-2019
** Modified Reason       : EHD Ref: RABOCBT_12.2_28_JUN_2019_01_0000.
** Search string         : Bug#30489109

**Changed By         : Vineeth T M
**Date               : 09-Oct-2024
**Change Description : LS Version rollover changes LOT 2
**Search String      : OBCL_14.8_LS_VER_ROL_LOT2 changes	
*/
---------------------------------------------------------------------------------------------
--Bug#30489109  changes starts
PROCEDURE Pr_Skip_Handler(P_Stage IN VARCHAR2);
PROCEDURE Pr_Set_Skip_Kernel;
PROCEDURE Pr_Set_Activate_Kernel;
PROCEDURE Pr_Set_Skip_Cluster;
PROCEDURE Pr_Set_Activate_Cluster;
FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
--Bug#30489109  changes ends
FUNCTION fn_check_product_fields
	(
	p_product_code		IN		oltms_product_userdef_fields.product_code%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;

FUNCTION fn_delete_product
	(
	p_product_code		IN		oltms_product_userdef_fields.product_code%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;

FUNCTION fn_copy_product
	(
	p_old_product_code	IN		oltms_product_userdef_fields.product_code%TYPE,
	p_new_product_code	IN 		oltms_product_userdef_fields.product_code%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;

FUNCTION fn_check_contract_fields
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_version_no		IN 		oltbs_contract.latest_version_no%TYPE,
	p_error_code		IN OUT 	VARCHAR2,
	p_error_parameter		IN OUT 	VARCHAR2
	)
	RETURN BOOLEAN;

FUNCTION fn_check_contract_fields
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_version_no		IN 		oltbs_contract.latest_version_no%TYPE,
	p_field_name 		IN		udtms_fields.field_name%TYPE,
	p_error_code		IN OUT 	VARCHAR2,
	p_error_parameter		IN OUT 	VARCHAR2
	)
	RETURN BOOLEAN;

FUNCTION fn_default_from_product
	(
	p_contract_ref_no		IN 		oltbs_contract.contract_ref_no%TYPE,
	p_version_no		IN 		oltbs_contract.latest_version_no%TYPE,
	p_product_code		IN 		VARCHAR2,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;


FUNCTION fn_create_new_version
	(
	p_contract_ref_no 	IN		oltbs_contract.contract_ref_no%TYPE,
	p_old_version_no		IN		oltbs_contract.latest_version_no%TYPE,
	p_new_version_no		IN		oltbs_contract.latest_version_no%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;

FUNCTION fn_delete_contract
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_version_no		IN		oltbs_contract.latest_version_no%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;

FUNCTION fn_copy_contract
	(
	p_new_contract_ref_no	IN		oltbs_contract.contract_ref_no%TYPE,
	p_old_contract_ref_no	IN		oltbs_contract.contract_ref_no%TYPE,
	p_latest_version_no	IN		oltbs_contract.latest_version_no%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;

FUNCTION fn_copy_function
	(
	p_new_rec_key		IN		oltms_function_userdef_fields.rec_key%TYPE,
	p_old_rec_key		IN		oltms_function_userdef_fields.rec_key%TYPE,
	p_function_id		IN		oltms_function_userdef_fields.function_id%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;	

FUNCTION fn_check_function_fields
	(
	p_function_id		IN		oltms_function_userdef_fields.function_id%TYPE,
	p_rec_key			IN 		oltms_function_userdef_fields.rec_key%TYPE,
	p_error_code		IN OUT 	VARCHAR2,
	p_error_parameter		IN OUT 	VARCHAR2
	)
	RETURN BOOLEAN;

FUNCTION fn_check_function_fields
	(
	p_function_id		IN		oltms_function_userdef_fields.function_id%TYPE,
	p_rec_key			IN 		oltms_function_userdef_fields.rec_key%TYPE,
	p_field_name		IN		oltms_function_udf_fields_map.field_name%TYPE,
	p_error_code		IN OUT 	VARCHAR2,
	p_error_parameter		IN OUT 	VARCHAR2
	)
	RETURN BOOLEAN;

FUNCTION fn_unique_check
	(
	p_field_name		IN 		oltms_product_udf_fields_map.field_name%TYPE,
	p_field_value  		IN 		oltms_product_userdef_fields.field_val_1%TYPE,
	p_product_code 		IN		VARCHAR2,
	p_error_code		IN OUT 	VARCHAR2,
	p_error_parameter		IN OUT 	VARCHAR2
	)
	RETURN BOOLEAN; 

FUNCTION fn_unique_check_contract
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_product_code 		IN		VARCHAR2,
	p_error_code		IN OUT 	VARCHAR2,
	p_error_parameter		IN OUT 	VARCHAR2
	)
	RETURN BOOLEAN; 

FUNCTION fn_unique_checkf
	(
	p_field_name		IN 		oltms_function_udf_fields_map.field_name%TYPE,
	p_field_value  		IN 		oltms_function_userdef_fields.field_val_1%TYPE,
	p_function_id		IN 		oltms_function_userdef_fields.function_id%TYPE,
	p_error_code		IN OUT 	VARCHAR2,
	p_error_parameter		IN OUT 	VARCHAR2
	)
	RETURN BOOLEAN; 

FUNCTION fn_unique_checkf_func
	(
	p_function_id		IN		oltms_function_userdef_fields.function_id%TYPE,
	p_rec_key	 		IN		oltms_function_userdef_fields.rec_key%TYPE,
	p_error_code		IN OUT 	VARCHAR2,
	p_error_parameter		IN OUT 	VARCHAR2
	)
	RETURN BOOLEAN; 


FUNCTION fn_check_upload_fields
	(
	p_field_name		IN		udtms_fields.field_name%TYPE,
	p_field_value		IN		oltms_function_userdef_fields.field_val_1%TYPE,
	p_error_code		IN OUT 	VARCHAR2,
	p_error_parameter		IN OUT 	VARCHAR2
	)
	RETURN BOOLEAN;

--change for FCC5.2 - base table UDFs starts

FUNCTION fn_field_number_validations
	(
	p_field_name	 	IN 		udtms_fields.field_name%TYPE,
	p_field_value 		IN 		oltms_product_userdef_fields.field_val_1%TYPE,
	p_val_type 			IN 		udtms_fields.val_type%TYPE,
	p_fixed_length		IN		udtms_fields.fixed_length%TYPE,
	p_length  			IN 		udtms_fields.field_length%TYPE,
	p_min_length		IN		udtms_fields.min_length%TYPE,
	p_max_length		IN		udtms_fields.max_length%TYPE,
	p_min_val  			IN 		udtms_fields.min_val%TYPE,
	p_max_val  			IN 		udtms_fields.max_val%TYPE,
	p_mask	 		IN 		udtms_fields.mask%TYPE,
	p_error_code		IN OUT 	VARCHAR2,
	p_error_parameter		IN OUT 	VARCHAR2
	)
	RETURN BOOLEAN;

FUNCTION fn_field_text_validations
	(
	p_field_name 		IN 		udtms_fields.field_name%TYPE,
	p_field_value 		IN 		oltms_product_userdef_fields.field_val_1%TYPE,
	p_val_type 			IN 		udtms_fields.val_type%TYPE,
	p_fixed_length		IN		udtms_fields.fixed_length%TYPE,
	p_length  			IN 		udtms_fields.field_length%TYPE,
	p_min_length		IN		udtms_fields.min_length%TYPE,
	p_max_length		IN		udtms_fields.max_length%TYPE,
	p_mask	 		IN 		udtms_fields.mask%TYPE,
	p_error_code		IN OUT 	VARCHAR2,
	p_error_parameter		IN OUT 	VARCHAR2
	)
	RETURN BOOLEAN;

FUNCTION fn_field_date_validations
	(
	p_date_format		IN		nls_session_parameters.value%TYPE,
	p_field_name 		IN 		udtms_fields.field_name%TYPE,
	p_field_value 		IN 		oltms_product_userdef_fields.field_val_1%TYPE,
	p_val_type 			IN 		udtms_fields.val_type%TYPE,
	p_bd_allowed		IN 		udtms_fields.back_date_allowed%TYPE,
	p_bd_period			IN 		udtms_fields.back_date_period%TYPE,
	p_fd_allowed		IN 		udtms_fields.future_date_allowed%TYPE,
	p_fd_period			IN 		udtms_fields.future_date_period%TYPE,
	p_error_code		IN OUT 	VARCHAR2,
	p_error_parameter		IN OUT 	VARCHAR2
	)
	RETURN BOOLEAN;

--change for FCC5.2 - base table UDFs ends
  FUNCTION fn_check_amend_fields
    (
    p_function_id       IN      oltms_function_userdef_fields.function_id%TYPE,
    p_rec_key           IN      oltms_function_userdef_fields.rec_key%TYPE,
    p_field_val         IN      VARCHAR2,
    p_field_num         IN      NUMBER,
    p_error_code        IN OUT  VARCHAR2,
    p_error_parameter       IN OUT  VARCHAR2
    )
    RETURN BOOLEAN;
FUNCTION Fn_check_mandatory  (p_contract_ref_no	IN 	  VARCHAR2,
	    				p_version_no	IN 	  VARCHAR2,
					p_error_code	IN OUT  VARCHAR2,
					p_error_parameter	IN OUT  VARCHAR2)
RETURN BOOLEAN;
	
--Bug#29020989  changes starts
FUNCTION Fn_check_Cont_amend_Field(p_Product         IN  VARCHAR2
								  ,p_Udf_Rec         IN  Oltms_Contract_Userdef_Fields%ROWTYPE
								  ,p_Field_Name      IN  VARCHAR2
								  ,p_field_val       IN  VARCHAR2
								  ,p_field_num       IN  NUMBER
								  ,p_error_code      IN OUT  VARCHAR2
								  ,p_error_parameter IN OUT  VARCHAR2)
RETURN BOOLEAN;
--Bug#29020989  changes ends	
---------------------------------------------------------------------------------------------
--OBCL_14.8_LS_VER_ROL_LOT2 changes start
FUNCTION fn_ver_roll_new_version
    (
    p_contract_ref_no   IN      oltbs_contract.contract_ref_no%TYPE,
    p_version_no        IN      oltbs_contract.latest_version_no%TYPE,
    p_roll_ref_no        IN      oltbs_contract_version_roll.roll_src_ref_no%TYPE,
    p_roll_version_no        IN      oltbs_contract.latest_version_no%TYPE,
    p_error_code        IN OUT  VARCHAR2,
    p_error_parameter       IN OUT  VARCHAR2
    )
    RETURN BOOLEAN;
--OBCL_14.8_LS_VER_ROL_LOT2 changes end
TYPE t_cstm_contract_usrdef_field  IS TABLE OF  oltms_contract_userdef_fields%ROWTYPE INDEX BY BINARY_INTEGER;
P_inc_userdef olpks_udf_services.t_cstm_contract_usrdef_field  ;
END olpks_udf_services;
/
CREATE OR REPLACE SYNONYM olpkss_udf_services FOR olpks_udf_services
/