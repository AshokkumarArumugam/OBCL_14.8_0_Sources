create or replace PACKAGE olpks_acct_sde IS
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
    **  PACKAGE Name      : olpks_acct_sde
    **  File Name         : olpks_acct_sde.SQL
    **  Module            : OL
    **  Description       : OBCL 14.5 Rule Based Accounting changes
    ** 						Contains the functions for caching and retrieving the sde values for the current account
    **                      in and from the 'Loan Record' structure.
    **                      Also contains the functions to return the values of static SDEs which are
    **                      retrieved from database tables.
    **  					RTH - Added new function to derive the UDF values
    *************************************************************************************************/

    TYPE TY_REC_SDE_VAL IS RECORD(
        sde_num_val  NUMBER,
        sde_char_val VARCHAR2(2000),
        sde_date_val DATE);

    TYPE TY_REC_SDE IS RECORD(
        sde_id    OLZM_SDE.SDE_ID%TYPE,
        sde_dtype CHAR,
        tbl_vals  TY_REC_SDE_VAL);

    --UDF changes>> Starts    
    TYPE TY_REC_UDF_VAL IS RECORD(
        udf_num_val  NUMBER,
        udf_char_val VARCHAR2(2000),
        udf_date_val DATE);

    TYPE TY_REC_UDF IS RECORD(
        udf_field_name    oltms_product_udf_fields_map.FIELD_NAME%TYPE,
        udf_dtype CHAR,
        tbl_vals  TY_REC_UDF_VAL);
    TYPE TY_TB_UDFS IS TABLE OF TY_REC_UDF INDEX BY oltms_product_udf_fields_map.FIELD_NAME%TYPE;
    --UDF changes << Ends

    TYPE TY_TB_SDES IS TABLE OF TY_REC_SDE INDEX BY OLZM_SDE.SDE_ID%TYPE;
	

    FUNCTION Fn_Get_SDE(Pcontractrefno IN oltb_contract.CONTRACT_REF_NO%type,
                               Psderec IN OUT TY_TB_SDES,
                              p_Err_Cd IN OUT Ertbs_Msgs.Err_Code%TYPE) RETURN BOOLEAN;  
    --UDF Changes >> Starts                    
    FUNCTION Fn_Get_UDF(Pcontractrefno IN oltb_contract.CONTRACT_REF_NO%type,
                        Pudfrec IN OUT TY_TB_UDFS,
                        p_Err_Cd IN OUT Ertbs_Msgs.Err_Code%TYPE) RETURN BOOLEAN;
    --UDF Changes << Ends
 
END olpks_acct_sde;
/