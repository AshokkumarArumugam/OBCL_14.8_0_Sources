		   create or replace package olpks_olddryet_utils is

  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_olddryet_utils.spc
  **
  ** Module     : Loans and Deposits
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

  Changed By         : Prakash Ravi
  Changed On         : 08-AUG-2019
  Search String      : OBCL_14.4_DIARY_EVENT_UPDATE
  Change Reason      : Added code to insert and update the status table with the all values.
  
  -------------------------------------------------------------------------------------------------------
  */

  FUNCTION fn_get_udf_details(p_olddryet    IN olpks_olddryet_main.ty_olddryet,
                              p_action_code IN VARCHAR2,
                              p_udf_det     IN OUT olpks_olddryet_main.ty_tb_v_oltws_udf_temp,
                              p_Err_Code    IN OUT VARCHAR2,
                              p_Err_Params  IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_get_field_tags(p_olddryet    IN olpks_olddryet_main.ty_olddryet,
                             p_Action_Code IN VARCHAR2,
                             p_tags_det    IN OUT olpks_olddryet_main.ty_tb_v_oltws_fields_temp,
                             p_Err_Code    IN OUT VARCHAR2,
                             p_Err_Params  IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_populate_details(p_Source           IN VARCHAR2,
                               p_Source_Operation IN VARCHAR2,
                               p_Function_Id      IN VARCHAR2,
                               p_Action_Code      IN VARCHAR2,
                               p_Child_Function   IN VARCHAR2,
                               p_olddryet         IN OUT olpks_olddryet_main.ty_olddryet,
                               p_Err_Code         IN OUT VARCHAR2,
                               p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
   

  FUNCTION fn_freq_check(p_wrk_olddryet IN OUT olpks_olddryet_main.ty_olddryet,
                         p_err_code     IN OUT VARCHAR2,
                         p_err_params   IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_format_tags(dateformat   VARCHAR2,
                          datevalue    VARCHAR2,
                          p_Err_Code   IN OUT VARCHAR2,
                          p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;
                          
  FUNCTION fn_insert_status(p_wrk_olddryet IN olpks_olddryet_main.ty_olddryet,
                            p_err_code     IN OUT VARCHAR2,
                            p_err_params   IN OUT VARCHAR2)  RETURN BOOLEAN;	

  --OBCL_14.4_DIARY_EVENT_UPDATE Change starts
  FUNCTION fn_update_status(p_wrk_olddryet IN out olpks_olddryet_main.ty_olddryet,
                            p_err_code     IN OUT VARCHAR2,
                            p_err_params   IN OUT VARCHAR2)  RETURN BOOLEAN;

   --OBCL_14.4_DIARY_EVENT_UPDATE CHange ends
  --OBCL_Field_Tag_Populate_Changes :: Starts                            
  FUNCTION fn_populate_field_tags(p_Source           IN VARCHAR2,
                                  p_Source_Operation IN VARCHAR2,
                                  p_Function_Id      IN VARCHAR2,
                                  p_Action_Code      IN VARCHAR2,
                                  p_olddryet         IN OUT olpks_olddryet_main.ty_olddryet,
                                  p_Err_Code         IN OUT VARCHAR2,
                                  p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;                        
  --OBCL_Field_Tag_Populate_Changes :: Ends
  
end olpks_olddryet_utils;
/
CREATE OR REPLACE SYNONYM olpkss_olddryet_utils FOR olpks_olddryet_utils
/