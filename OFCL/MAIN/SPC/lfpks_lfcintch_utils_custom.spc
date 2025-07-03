create or replace package lfpks_lfcintch_utils_custom is
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lfpks_lfcintch_utils_custom.spc
  **
  ** Module   : OL
  **
    This source is part of the Oracle Flexcube Corporate Lending  Software Product.
    Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.
    No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.
  
    Oracle Financial Services Software Limited.
    Oracle Park, Off Western Express Highway,
    Goregaon (East),
    Mumbai - 400 063, India.
    CHANGE HISTORY
    
    **Changed By         : Gomathi G
    **Date               : 03-OCT-2019
    **Change Description : Provide Hooks For Fn_Upload
    **Search String      : OBCL_14.3_SUPPORT_BUG#30003646
	
    **Changed By         : Gomathi G
    **Date               : 03-OCT-2019
    **Change Description : Multiple Rate Codes
    **Search String      : OBCL_14.3_SUPPORT_BUG#30310902
	
    **Changed By         : Gomathi G
    **Date               : 03-OCT-2019
    **Change Description : Added hooks for custom changes of min or max Default and Validate
    **Search String      : OBCL_14.3_SUPPORT_BUG#30310888
  ----------------------------------------------------------------------------------------------------
  */
 --OBCL_14.3_SUPPORT_BUG#30310902 starts
  FUNCTION Fn_Validate(p_Source           IN Cotms_Source.Source_Code%TYPE,
						   p_Function_Id      IN VARCHAR2,
						   p_Module           IN VARCHAR2,
						   p_Action_Code      IN VARCHAR2,
						   p_Calling_Function IN VARCHAR2,
						   p_Product_Code     IN VARCHAR2,
						   p_Fcc_Ref          IN VARCHAR2,
						   p_Event_Seq_No     IN VARCHAR2,
						   p_wrk_lfcintch     IN OUT lfpks_lfcintch_main.ty_lfcintch,
						   p_Err_Code         IN OUT VARCHAR2,
						   p_Err_Params       IN OUT VARCHAR2,
						   p_fn_call_id       IN OUT NUMBER,
						   p_Tb_Custom_data  IN OUT GLOBAL.Ty_Tb_Custom_Data)
    RETURN BOOLEAN;

 FUNCTION FN_PRE_PICKUP_RATES(p_fccref IN oltbs_contract.CONTRACT_REF_NO%TYPE,
                           p_esn    IN oltbs_contract.LATEST_EVENT_SEQ_NO%TYPE)
    RETURN BOOLEAN;	

 FUNCTION FN_POST_PICKUP_RATES(p_fccref IN oltbs_contract.CONTRACT_REF_NO%TYPE,
                           p_esn    IN oltbs_contract.LATEST_EVENT_SEQ_NO%TYPE)
    RETURN BOOLEAN;
	--OBCL_14.3_SUPPORT_BUG#30310902 ends
	--OBCL_14.3_SUPPORT_BUG#30003646 starts
  FUNCTION Fn_pre_Upload(p_Source           IN Cotms_Source.Source_Code%TYPE,
                     p_Function_Id      IN VARCHAR2,
                     p_Module           IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_Calling_Function IN VARCHAR2,
                     p_Product_Code     IN VARCHAR2,
                     p_Fcc_Ref          IN VARCHAR2,
                     p_Event_Seq_No     IN VARCHAR2,
                     p_wrk_lfcintch     IN OUT lfpks_lfcintch_main.ty_lfcintch,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;  
 FUNCTION Fn_post_Upload(p_Source           IN Cotms_Source.Source_Code%TYPE,
                     p_Function_Id      IN VARCHAR2,
                     p_Module           IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_Calling_Function IN VARCHAR2,
                     p_Product_Code     IN VARCHAR2,
                     p_Fcc_Ref          IN VARCHAR2,
                     p_Event_Seq_No     IN VARCHAR2,
                     p_wrk_lfcintch     IN OUT lfpks_lfcintch_main.ty_lfcintch,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
--OBCL_14.3_SUPPORT_BUG#30003646 ends				 
--OBCL_14.3_SUPPORT_BUG#30310888 Starts
FUNCTION fn_check_rate(p_prm_contract_ccy IN VARCHAR2,
                       p_wrk_lfcintch     IN OUT lfpks_lfcintch_main.ty_lfcintch,
                       loop_count         IN NUMBER,
                       p_prm_product_type IN VARCHAR2,
                       p_function_id      IN VARCHAR2,
                       P_SOURCE           IN VARCHAR2,
                       p_Calling_Function IN VARCHAR2,
                       p_special_rate_amt IN VARCHAR2,
                       p_value_date       IN VARCHAR2,
                       p_special_rate     IN VARCHAR2)
  RETURN BOOLEAN;
--OBCL_14.3_SUPPORT_BUG#30310888 Ends  

end lfpks_lfcintch_utils_custom;
/