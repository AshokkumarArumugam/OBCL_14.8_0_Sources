CREATE OR REPLACE PACKAGE lbpks_lbdtronl_utils_custom AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdtronl_utils_custom.spc
  **
  ** Module     : Syndication Loans and Commitments
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
  Created By         :  Prakash Ravi
  Change Description :  
  
  **  Changed By         :
  **  Changed On         :
  **  Change Description :
  **  Search String      :
  
  Changed By         : Vineeth T M
	Changed On         : 14-Aug-2020
	Search String      : bug#31671272 changes
	Change Reason      : BCIE :: Multi Holiday CCY support in LB :: Hooks
  -------------------------------------------------------------------------------------------------------
  */

  FUNCTION fn_pre_unlock_preauth(p_Source           IN VARCHAR2,
								 p_Source_Operation IN VARCHAR2,
								 p_Function_Id      IN VARCHAR2,
								 p_Action_Code      IN VARCHAR2,
								 p_lbdtronl         IN lbpks_lbdtronl_Main.Ty_lbdtronl,
								 p_Prev_lbdtronl    IN lbpks_lbdtronl_Main.Ty_lbdtronl,
								 p_Wrk_lbdtronl     IN OUT lbpks_lbdtronl_Main.Ty_lbdtronl,
								 p_Err_Code         IN OUT VARCHAR2,
								 p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_post_unlock_preauth(p_Source           IN VARCHAR2,
								 p_Source_Operation IN VARCHAR2,
								 p_Function_Id      IN VARCHAR2,
								 p_Action_Code      IN VARCHAR2,
								 p_lbdtronl         IN lbpks_lbdtronl_Main.Ty_lbdtronl,
								 p_Prev_lbdtronl    IN lbpks_lbdtronl_Main.Ty_lbdtronl,
								 p_Wrk_lbdtronl     IN OUT lbpks_lbdtronl_Main.Ty_lbdtronl,
								 p_Err_Code         IN OUT VARCHAR2,
								 p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
	
	--bug#31671272 changes starts
    Function Fn_Pre_Get_Ccy_Holiday_List(p_Wrk_Lbdtronl    IN OUT lbpks_lbdtronl_Main.Ty_lbdtronl
                                       ,p_Validation_Type In Char
                                       ,p_Ccy_List in Out Varchar2
                                       ,p_Fn_Call_Id in out Number
                                       ,p_Tb_Custom_Data in out Global.Ty_Tb_Custom_Data
                                       ,p_Error_Code in Out Varchar2)
      RETURN BOOLEAN;
     
     Function Fn_Post_Get_Ccy_Holiday_List(p_Wrk_Lbdtronl    IN OUT lbpks_lbdtronl_Main.Ty_lbdtronl
                                       ,p_Validation_Type In Char
                                       ,p_Ccy_List in Out Varchar2
                                       ,p_Fn_Call_Id in out Number
                                       ,p_Tb_Custom_Data in out Global.Ty_Tb_Custom_Data
                                       ,p_Error_Code in Out Varchar2)
      RETURN BOOLEAN;
      --bug#31671272 changes ends

END lbpks_lbdtronl_utils_custom;
/
CREATE OR REPLACE Synonym lbpkss_lbdtronl_utils_custom FOR lbpks_lbdtronl_utils_custom
/