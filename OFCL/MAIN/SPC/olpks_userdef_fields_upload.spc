create or replace PACKAGE olpks_userdef_fields_upload AS

  /*-----------------------------------------------------------------------------------------------------
    **
    ** File Name  : olpks_userdef_fields_upload.spc
    **
    ** Module     : OL
    **
    ** This source is part of the Oracle Banking Software Product.
    ** Oracle Banking Corporate Lending  Software Product.   Copyright © 2018.  All rights reserved
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
    -------------------------------------------------------------------------------------------------------
    CHANGE HISTORY

    SFR Number         :
    Changed By         :
    Change Description :

    -------------------------------------------------------------------------------------------------------
  */

   g_cont_ref_no OLTB_CONTRACT.CONTRACT_REF_NO%TYPE; 

    FUNCTION fn_process_udf_details(	p_Function_Id      IN VARCHAR2,
                                        p_Source           IN VARCHAR2,
                                        p_reference_no   	IN oltbs_udf_upload.reference_no%TYPE,
                                        p_error_code      	IN OUT VARCHAR2,
                                        p_error_param     	IN OUT VARCHAR2) RETURN BOOLEAN;


	FUNCTION fn_contract_udf_validations(p_Function_Id      IN VARCHAR2,
                                         p_Source           IN VARCHAR2,
                                         p_reference_no		IN oltbs_udf_upload.reference_no%TYPE,
										 p_contract_ref_no	IN oltbs_contract.contract_ref_no%TYPE,
										 p_error_code		IN OUT VARCHAR2,
										 p_error_param		IN OUT VARCHAR2) RETURN BOOLEAN;


	FUNCTION fn_field_name_validation(	p_Function_Id      IN VARCHAR2,
                                        p_Source           IN VARCHAR2,
                                        p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
										p_version_no      IN oltbs_contract.latest_version_no%TYPE,
										p_field_name      IN udtms_fields.field_name%TYPE,
										p_field_value     IN oltbs_udf_upload.field_value%TYPE,
										p_error_code      IN OUT VARCHAR2,
										p_error_param	  IN OUT VARCHAR2) RETURN BOOLEAN;

	FUNCTION fn_process_ld_contract(	p_Function_Id      IN VARCHAR2,
                                        p_Source           IN VARCHAR2,
                                        p_reference_no		IN oltbs_udf_upload.reference_no%TYPE,
										p_contract_ref_no	IN oltbs_contract.contract_ref_no%TYPE,
										p_maker_id 			IN oltbs_contract_event_log.maker_id%TYPE,			--06-JUN-2017		Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R721 FS Vol1 Tag07 IUT1#76 changes
										p_maker_dt_stamp	IN oltbs_contract_event_log.maker_dt_stamp%TYPE,	--06-JUN-2017		Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R721 FS Vol1 Tag07 IUT1#76 changes
										p_error_code      	IN OUT VARCHAR2,
										p_error_param     	IN OUT VARCHAR2) RETURN BOOLEAN;

	FUNCTION fn_upd_contract_udf_fields(	p_Function_Id      IN VARCHAR2,
                                            p_Source           IN VARCHAR2,
                                            p_reference_no		IN oltbs_udf_upload.reference_no%TYPE,
											p_contract_ref_no	IN oltbs_contract.contract_ref_no%TYPE,
											p_version_no	  	IN oltbs_contract_master.version_no%TYPE,
											p_error_code    	IN OUT VARCHAR2,
											p_error_param		IN OUT VARCHAR2) RETURN BOOLEAN;

   FUNCTION Fn_Pickup_Cont_Udf(p_Cont_Ref        IN VARCHAR2
                              ,p_Module          IN VARCHAR2
                              ,p_Prod            IN VARCHAR2
                              ,l_Error_Code      IN OUT VARCHAR2
                              ,l_Error_Parameter IN OUT VARCHAR2) RETURN BOOLEAN;

	FUNCTION fn_process_function_id(	p_Function_Id      IN VARCHAR2,
																		p_Source           IN VARCHAR2,
																		p_reference_no		IN oltbs_udf_upload.reference_no%TYPE,
																		p_called_function_id		IN VARCHAR2,
																		p_error_code     	IN OUT VARCHAR2,
																		p_error_param     	IN OUT VARCHAR2) RETURN BOOLEAN;

	FUNCTION fn_create_cust_version(	p_Function_Id      IN VARCHAR2,
																		p_Source           IN VARCHAR2,
																		p_customer_no		IN	oltws_customer_master.customer_no%TYPE,
																		p_version_no		IN	oltws_customer_master.latest_version_no%TYPE,
																		p_maker_id 	  		IN 	oltbs_contract_event_log.maker_id%TYPE,			
																		p_maker_dt_stamp	IN 	oltbs_contract_event_log.maker_dt_stamp%TYPE,	
																		p_error_code    	IN 	OUT VARCHAR2,
																		p_error_param   	IN 	OUT VARCHAR2) RETURN BOOLEAN;                             
END olpks_userdef_fields_upload;
/
CREATE OR REPLACE Synonym olpkss_userdef_fields_upload FOR olpks_userdef_fields_upload
/