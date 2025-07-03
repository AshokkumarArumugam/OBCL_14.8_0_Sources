CREATE OR REPLACE PACKAGE olpks_oldtronl_utils_custom AS
  /*-----------------------------------------------------------------------------------------------------
    **
    ** File Name  : olpks_oldtronl_utils_custom.spc
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
  
    **SFR Number         :
    **Changed By         :
    **Change Description :
    **Search String      :
  
	**Changed By         : Chandra Achuta
    **Date               : 28-AUG-2019
    **Change Description : Added hook for passing contract ref no, version no and esn values for custom tables.
	                       Contract creation through gateway.
    **Search String      : Bug#30239325 

  Changed By         : Gomathi G
  Changed On         : 01-APR-2021
  Change Description : Provided Pre and post hooks to derive the notes present for the customer/account number and display while saving.
  Search String      : OBCL_14.3_SUPPORT_BUG#32644113	
    -------------------------------------------------------------------------------------------------------
  */
  FUNCTION Fn_Pre_Reverse_Ramd_For_Batch(p_contract   IN oltb_contract%ROWTYPE,
                                         p_amount     IN oltb_contract_rol_fwd.rollover_amt%TYPE,
                                         p_Err_Code   IN OUT VARCHAR2,
                                         p_Err_Params IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Post_Reverse_Ramd_For_Batch(p_contract   IN oltb_contract%ROWTYPE,
                                          p_amount     IN oltb_contract_rol_fwd.rollover_amt%TYPE,
                                          p_Err_Code   IN OUT VARCHAR2,
                                          p_Err_Params IN OUT VARCHAR2)
    RETURN BOOLEAN;

     FUNCTION Fn_Pre_Ramd_for_Contingent(p_Source           IN VARCHAR2,
                                  p_Source_Operation IN VARCHAR2,
                                  p_Function_Id      IN VARCHAR2,
                                  p_Action_Code      IN VARCHAR2,
                                  p_Oldtronl         IN Olpks_Oldtronl_Main.Ty_Oldtronl,
                                  p_Prev_Oldtronl    IN Olpks_Oldtronl_Main.Ty_Oldtronl,
                                  p_Wrk_Oldtronl     IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl,
				  p_amount     IN oltb_contract_rol_fwd.rollover_amt%TYPE,
                                  p_Err_Code         IN OUT VARCHAR2,
                                  p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;


 FUNCTION Fn_Post_Ramd_for_Contingent(p_Source           IN VARCHAR2,
                                  p_Source_Operation IN VARCHAR2,
                                  p_Function_Id      IN VARCHAR2,
                                  p_Action_Code      IN VARCHAR2,
                                  p_Oldtronl         IN Olpks_Oldtronl_Main.Ty_Oldtronl,
                                  p_Prev_Oldtronl    IN Olpks_Oldtronl_Main.Ty_Oldtronl,
                                  p_Wrk_Oldtronl     IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl,
				  p_amount     IN oltb_contract_rol_fwd.rollover_amt%TYPE,
                                  p_Err_Code         IN OUT VARCHAR2,
                                  p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  --Bug#30239325  changes starts
  FUNCTION Fn_pre_Product_Default(p_Source           IN VARCHAR2,
								  p_Source_Operation IN VARCHAR2,
								  p_Function_Id      IN VARCHAR2,
								  p_Action_Code      IN VARCHAR2,
								  p_Oldtronl         IN Olpks_Oldtronl_Main.Ty_Oldtronl,
								  p_Wrk_Oldtronl     IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl,
								  p_Err_Code         IN OUT VARCHAR2,
								  p_Err_Params       IN OUT VARCHAR2)
  RETURN BOOLEAN;
  FUNCTION Fn_post_Product_Default(p_Source           IN VARCHAR2,
								  p_Source_Operation IN VARCHAR2,
								  p_Function_Id      IN VARCHAR2,
								  p_Action_Code      IN VARCHAR2,
								  p_Oldtronl         IN Olpks_Oldtronl_Main.Ty_Oldtronl,
								  p_Wrk_Oldtronl     IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl,
								  p_Err_Code         IN OUT VARCHAR2,
								  p_Err_Params       IN OUT VARCHAR2)
  RETURN BOOLEAN;
  --Bug#30239325  changes ends
  	--OBCL_14.3_SUPPORT_BUG#32644113 changes starts
	  FUNCTION Fn_pre_Default_And_Validate(p_Source           IN VARCHAR2,
                                   p_Source_Operation IN VARCHAR2,
                                   p_Function_Id      IN VARCHAR2,
                                   p_Action_Code      IN VARCHAR2,
                                   p_Oldtronl         IN Olpks_Oldtronl_Main.Ty_Oldtronl,
                                   p_Prev_Oldtronl    IN Olpks_Oldtronl_Main.Ty_Oldtronl,
                                   p_Wrk_Oldtronl     IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl,
                                   p_Err_Code         IN OUT VARCHAR2,
                                   p_Err_Params       IN OUT VARCHAR2)
	RETURN BOOLEAN;
	FUNCTION Fn_post_Default_And_Validate(p_Source           IN VARCHAR2,
                                   p_Source_Operation IN VARCHAR2,
                                   p_Function_Id      IN VARCHAR2,
                                   p_Action_Code      IN VARCHAR2,
                                   p_Oldtronl         IN Olpks_Oldtronl_Main.Ty_Oldtronl,
                                   p_Prev_Oldtronl    IN Olpks_Oldtronl_Main.Ty_Oldtronl,
                                   p_Wrk_Oldtronl     IN OUT Olpks_Oldtronl_Main.Ty_Oldtronl,
                                   p_Err_Code         IN OUT VARCHAR2,
                                   p_Err_Params       IN OUT VARCHAR2)
	RETURN BOOLEAN;
	--OBCL_14.3_SUPPORT_BUG#32644113 changes ends
END olpks_oldtronl_utils_custom;
/
CREATE OR REPLACE SYNONYM  olpkss_oldtronl_utils_custom FOR olpks_oldtronl_utils_custom
/