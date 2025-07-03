CREATE OR REPLACE PACKAGE COPKS_SERVICES AS
/*------------------------------------------------------------------------------------------
**
** This source is part of the Oracle FLEXCUBE Software Product.
** Copyright (R) 2016 , Oracle and/or its affiliates.  All rights reserved
**
**
** No part of this work may be reproduced, stored in a retrieval system, adopted
** or transmitted in any form or by any means, electronic, mechanical,
** photographic, graphic, optic recording or otherwise, translated in any
** language or computer language, without the prior written permission of
** Oracle and/or its affiliates.
**
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India
** India
------------------------------------------------------------------------------------------
**
**   Modified By           : Niranjan Prajapati
**   Modified On           : 15-Feb-2018
**   Modified Reason       : Function fn_mask_check made as global so that validation can call from CL module.
**   Search String         : [FCUBS14.0->RETRO->27532127; Base#27468654]
**
**    Modified By          : Debasis Pattanaik
**    Modified On          : 25-NOV-2020
**    Modified reason      : Issue   : UDFs maintained for STDCIF was not available in STDCIFAD screen. There was no sync between the UDF callform for these parent-child screen.
                             Fix     : Added code to display and capture the UDF values that are maintained for both parent-child screen will be in sync.
**    Search string        : FCUBS14.3->HATTHA KAKSEKAR LIMITED->CNSL->32121076
*/
---------------------------------------------------------------------------------------------
  
FUNCTION fn_copy_function
	(
	p_new_rec_key		IN		cstms_function_userdef_fields.rec_key%TYPE,
	p_old_rec_key		IN		cstms_function_userdef_fields.rec_key%TYPE,
	p_function_id		IN		cstms_function_userdef_fields.function_id%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;	

FUNCTION fn_check_function_fields
	(
	p_function_id		IN		CSTMS_FUNCTION_USERDEF_FIELDS.function_id%TYPE,
	p_rec_key			IN 		CSTMS_FUNCTION_USERDEF_FIELDS.rec_key%TYPE,
	p_error_code		IN OUT 	VARCHAR2,
	p_error_parameter		IN OUT 	VARCHAR2
	)
	RETURN BOOLEAN;

FUNCTION fn_check_function_fields
	(
	p_function_id		IN		CSTMS_FUNCTION_USERDEF_FIELDS.function_id%TYPE,
	p_rec_key			IN 		CSTMS_FUNCTION_USERDEF_FIELDS.rec_key%TYPE,
	p_field_name		IN		cstms_function_udf_fields_map.field_name%TYPE,
	p_error_code		IN OUT 	VARCHAR2,
	p_error_parameter		IN OUT 	VARCHAR2
	)
	RETURN BOOLEAN;
--[FCUBS14.0->RETRO->27532127; Base#27468654] start
FUNCTION fn_mask_check
    (
    p_field_name        IN      cstms_function_udf_fields_map.field_name%TYPE,
    p_field_value       IN      cstms_function_userdef_fields.field_val_1%TYPE,
    p_mask          IN      udtms_fields.mask%TYPE,
    p_error_code        IN OUT  VARCHAR2,
    p_error_parameter       IN OUT  VARCHAR2
    )
    RETURN BOOLEAN;
--[FCUBS14.0->RETRO->27532127; Base#27468654] end
 

FUNCTION fn_unique_checkf
	(
	p_field_name		IN 		cstms_function_udf_fields_map.field_name%TYPE,
	p_field_value  		IN 		cstms_function_userdef_fields.field_val_1%TYPE,
	p_function_id		IN 		cstms_function_userdef_fields.function_id%TYPE,
	p_error_code		IN OUT 	VARCHAR2,
	p_error_parameter		IN OUT 	VARCHAR2
	)
	RETURN BOOLEAN; 

FUNCTION fn_unique_checkf_func
	(
	p_function_id		IN		cstms_function_userdef_fields.function_id%TYPE,
	p_rec_key	 		IN		cstms_function_userdef_fields.rec_key%TYPE,
	p_error_code		IN OUT 	VARCHAR2,
	p_error_parameter		IN OUT 	VARCHAR2
	)
	RETURN BOOLEAN; 


FUNCTION fn_check_upload_fields
	(
	p_field_name		IN		udtms_fields.field_name%TYPE,
	p_field_value		IN		cstms_function_userdef_fields.field_val_1%TYPE,
	p_error_code		IN OUT 	VARCHAR2,
	p_error_parameter		IN OUT 	VARCHAR2
	)
	RETURN BOOLEAN;

--change for FCC5.2 - base table UDFs starts

FUNCTION fn_field_number_validations
	(
	p_field_name	 	IN 		udtms_fields.field_name%TYPE,
  p_field_value 		IN 		cstms_function_userdef_fields.field_val_1%TYPE,
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
	p_field_value 		IN 		cstms_function_userdef_fields.field_val_1%TYPE,  --px clean up 
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
	p_field_value 		IN 		cstms_function_userdef_fields.field_val_1%TYPE,  --Px clean up  
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
    p_function_id       IN      CSTMS_FUNCTION_USERDEF_FIELDS.function_id%TYPE,
    p_rec_key           IN      CSTMS_FUNCTION_USERDEF_FIELDS.rec_key%TYPE,
    p_field_val         IN      VARCHAR2,
    p_field_num         IN      NUMBER,
    p_error_code        IN OUT  VARCHAR2,
    p_error_parameter       IN OUT  VARCHAR2
    )
    RETURN BOOLEAN;
--FCUBS14.3->HATTHA KAKSEKAR LIMITED->CNSL->32121076 starts
    FUNCTION fn_get_parent_udf_mapping(p_function_id IN VARCHAR2)
    RETURN VARCHAR2;
--FCUBS14.3->HATTHA KAKSEKAR LIMITED->CNSL->32121076 ends	
---------------------------------------------------------------------------------------------

END copks_services;
/
create or replace synonym copkss_Services for copks_Services
/