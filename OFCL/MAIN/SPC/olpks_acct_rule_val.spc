create or replace PACKAGE olpks_acct_rule_val IS

   /*************************************************************************************************
    **  This source is part of the FLEXCUBE-Corporate Banking Software System
    **  and is copyrighted by Oracle Financial Services Software Limited.
    **  All rights reserved.  No part of this work may be reproduced,
    **  stored in a retrieval system, adopted or transmitted in any form or
    **  by any means, electronic, mechanical, photographic, graphic,
    **  optic recording or otherwise, translated in any language or
    **  computer language, without the prior written permission of
    **  Oracle Financial Services Software Limited.
    **
    **  Oracle Financial Services Software Limited.
    **  10-11, SDF I, SEEPZ, Andheri (East),
    **  MUMBAI - 400 096.
    **  INDIA
    **
    **  Copyright  2021-  by Oracle Financial Services Software Limited.
    **  Oracle Financial Services Software Limited.
    **
    **************************************************************************************************
    **  PACKAGE Name      : olpks_acct_rule_val
    **  File Name         : olpks_acct_rule_val.SQL
    **  Module            : OL
    **  Description       : Contains the functions for validating a set of rule based expressions.
    **                      Also it returns a table of elements (SDE, Components)
    **                      that have been used in the expressions.
    **  Written by          : Venkat N
    **  Date of creation    : 16th Aug 2021
    **  Change Description  : OBCL 14.5 Rule Based Accounting
    **
    **************************************************************************************************/

    TYPE ty_rec_ELEM IS RECORD(
    ELEM_ID VARCHAR2(50) := NULL,
    ELEM_DATA_TYPE VARCHAR2(15) := NULL,
    ELEM_TYPE CHAR(1) := NULL
                           );
    TYPE ty_tb_ELEM IS TABLE OF ty_rec_ELEM INDEX BY varchar2(50);

    TYPE REC_EXPR IS RECORD(
        expr         VARCHAR2(32000) := NULL,
        expr_type    CHAR(1) := NULL);

    TYPE t_expr IS TABLE OF REC_EXPR INDEX BY PLS_INTEGER;
  
    TYPE ty_rec_install_status IS RECORD(
                 component 	lftm_product_iccf.component%TYPE
						 );
        
    TYPE ty_tb_prod_component IS TABLE OF ty_rec_install_status INDEX BY lftm_product_iccf.component%TYPE;
	
    TYPE ty_rec_sde IS RECORD(
    SDE_ID          oltm_sde.SDE_ID%TYPE,
    SDE_datatype    oltm_sde.SDE_DATATYPE%TYPE);
    
    TYPE ty_tb_sde IS TABLE OF ty_rec_sde INDEX BY  oltm_sde.SDE_ID%TYPE;
    --UDF Changes >> Starts
    TYPE ty_rec_UDF IS RECORD(
    UDF_NAME          oltms_product_udf_fields_map.FIELD_NAME%TYPE,
    UDF_DATATYPE      udtm_fields.FIELD_TYPE%TYPE,
    UDF_FIELDNUM      oltms_product_udf_fields_map.FIELD_NUM%TYPE);

    TYPE ty_tb_udf IS TABLE OF ty_rec_UDF INDEX BY  oltms_product_udf_fields_map.FIELD_NAME%TYPE;
    
    TYPE ty_tb_udf_fields   IS table of oltm_product_udf_fields_map.FIELD_NAME%TYPE INDEX BY oltm_product_udf_fields_map.FIELD_NAME%TYPE;
  
    --UDF Changes << Ends
    FUNCTION FN_VALIDATE_RULE_EXPR(p_tab_exprs     IN OUT t_expr,
                                   p_tb_comp       IN ty_tb_prod_component,
                                   p_ty_tb_UDF_FIELD IN ty_tb_udf_fields, -- UDF Changes
                                   p_errorcode     IN OUT ERTBS_MSGS.ERR_CODE%TYPE,
                                   p_error_param   IN out varchar2) RETURN BOOLEAN;

     FUNCTION fn_get_exp_sdes(P_t_expr     IN t_expr,
                           p_tb_sde       OUT ty_tb_sde,
                           p_errorcode    IN OUT ertbs_msgs.err_code%TYPE,
                           p_error_param  IN OUT VARCHAR2) RETURN BOOLEAN;
							   
END olpks_acct_rule_val;
/