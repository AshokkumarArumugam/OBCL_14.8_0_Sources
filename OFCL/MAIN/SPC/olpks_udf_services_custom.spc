CREATE OR REPLACE PACKAGE olpks_udf_services_custom IS
  /*-----------------------------------------------------------------------------------------------------
    **
    ** File Name  : olpks_udf_services_custom.spc
    **
    ** Module     : Loans and Deposits
    **
    ** This source is part of the Oracle FLEXCUBE Software Product.
    ** Copyright (R) 2008,2019 , Oracle and/or its affiliates.  All rights reserved
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
 
** Modified By           : Chandra Achuta
** Modified On           : 04-NOV-2019
** Modified Reason       : EHD Ref: RABOCBT_12.2_28_JUN_2019_01_0000.
** Search string         : Bug#30489109
  */
  
  FUNCTION fn_pre_check_product_fields(p_product_code    IN oltms_product_userdef_fields.product_code%TYPE,
                                       p_error_code      IN OUT VARCHAR2,
                                       p_error_parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_post_check_product_fields(p_product_code    IN oltms_product_userdef_fields.product_code%TYPE,
                                        p_error_code      IN OUT VARCHAR2,
                                        p_error_parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_pre_check_function_fields(p_function_id     IN oltms_function_userdef_fields.function_id%TYPE,
                                        p_rec_key         IN oltms_function_userdef_fields.rec_key%TYPE,
                                        p_error_code      IN OUT VARCHAR2,
                                        p_error_parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_post_check_function_fields(p_function_id     IN oltms_function_userdef_fields.function_id%TYPE,
                                         p_rec_key         IN oltms_function_userdef_fields.rec_key%TYPE,
                                         p_error_code      IN OUT VARCHAR2,
                                         p_error_parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_pre_check_upload_fields(p_field_name      IN udtms_fields.field_name%TYPE,
                                      p_field_value     IN oltms_function_userdef_fields.field_val_1%TYPE,
                                      p_error_code      IN OUT VARCHAR2,
                                      p_error_parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_post_check_upload_fields(p_field_name      IN udtms_fields.field_name%TYPE,
                                       p_field_value     IN oltms_function_userdef_fields.field_val_1%TYPE,
                                       p_error_code      IN OUT VARCHAR2,
                                       p_error_parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;

END olpks_udf_services_custom;
/
CREATE OR REPLACE SYNONYM olpkss_udf_services_custom FOR olpks_udf_services_custom
/