CREATE OR REPLACE PACKAGE lbpks_lbdvamnd_validate AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdvamnd_validate.spc
  **
  ** Module     : Syndication Loans and Commitments
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved
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

    **Changed By         : Pallavi R
    **Date               : 13-Feb-2024
    **Change Description : Canges done to for Part Vdbal update NP Vami /Vami After PAMB  
    **Search String      : OBCL_14.7_RABO_#36224871 Changes   


  **Changed By         : Sudharshini Balaji
  **Date               : 08-May-2024
  **Change Description :1. Moved the Fn_Validate_Differential_Amt(vdabl balances check happens in this ) function call from lbdvamnd_validate pkg to lbdvamnd_utils  so that post the amend_due table insert, this FN_GET_BORR_BAL fn in LPPKS_VDBAL PKG, 
			can use the vami amendment details from the oltb_contract_amend_due table.For that declared this function in SPC.
						
  **Search String      : Bug#36448519  Changes 	
  -------------------------------------------------------------------------------------------------------
  */


PROCEDURE Pr_Skip_Handler  (P_Stage  IN  VARCHAR2);
FUNCTION Fn_pr_gtemp_validate_part(p_Source           IN VARCHAR2,                              
                                    p_Function_Id      IN VARCHAR2,
                                     p_Action_Code      IN VARCHAR2, 
                                     p_product_type IN OLTBS_CONTRACT.product_type%TYPE,                         
                                    p_oltbs_contract_amend_due     IN OUT oltbs_contract_amend_due%ROWtype,
                                    p_Err_Code         IN OUT VARCHAR2,
                                    p_Err_Params       IN OUT VARCHAR2) 
        RETURN BOOLEAN;
FUNCTION fn_date_validations(p_Source           IN VARCHAR2,                              
                                    p_Function_Id      IN VARCHAR2,
                                    p_Wrk_lbdvamnd     IN OUT lbpks_lbdvamnd_Main.Ty_lbdvamnd,
                                    p_Err_Code         IN OUT VARCHAR2,
                                    p_Err_Params       IN OUT VARCHAR2) RETURN Boolean ;
                                    
      FUNCTION Fn_Default_And_Validate(p_Source           IN VARCHAR2,
                              p_Source_Operation IN VARCHAR2,
                              p_Function_Id      IN VARCHAR2,
                              p_Action_Code      IN VARCHAR2,
                              p_Child_Function    IN  VARCHAR2,
                              p_lbdvamnd         IN lbpks_lbdvamnd_Main.Ty_lbdvamnd,
                              p_Prev_lbdvamnd    IN OUT lbpks_lbdvamnd_Main.Ty_lbdvamnd,
                              p_Wrk_lbdvamnd     IN OUT lbpks_lbdvamnd_Main.Ty_lbdvamnd,
                              p_Err_Code         IN OUT VARCHAR2,
                              p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
--OBCL_14.7_RABO_#36224871 Changes Starts
   FUNCTION Fn_Specific_Validate(p_Source           IN VARCHAR2,
                                p_Source_Operation IN VARCHAR2,
                                p_Function_Id      IN VARCHAR2,
                                p_Action_Code      IN VARCHAR2,
                                p_Lbdvamnd         IN Lbpks_Lbdvamnd_Main.Ty_Lbdvamnd,
                                p_Prev_Lbdvamnd    IN Lbpks_Lbdvamnd_Main.Ty_Lbdvamnd,
                                p_Wrk_Lbdvamnd     IN OUT Lbpks_Lbdvamnd_Main.Ty_Lbdvamnd,
                                p_Err_Code         IN OUT VARCHAR2,
                                p_Err_Params       IN OUT VARCHAR2)

   RETURN BOOLEAN;
--OBCL_14.7_RABO_#36224871 Changes Ends		

--$$ Bug#36448519 CHANGES STARTS --
 FUNCTION Fn_Validate_Differential_Amt(p_Source           IN VARCHAR2,
                                        p_Source_Operation IN VARCHAR2,
                                        p_Function_Id      IN VARCHAR2,
                                        p_Action_Code      IN VARCHAR2,

                                        p_Lbdvamnd      IN Lbpks_Lbdvamnd_Main.Ty_Lbdvamnd,
                                        p_Prev_Lbdvamnd IN  Lbpks_Lbdvamnd_Main.Ty_Lbdvamnd,
                                        p_Wrk_Lbdvamnd  IN OUT Lbpks_Lbdvamnd_Main.Ty_Lbdvamnd,
                                        p_Err_Code      IN OUT VARCHAR2,
                                        p_Err_Params    IN OUT VARCHAR2)
    RETURN BOOLEAN ;
--$$ Bug#36448519 CHANGES ENDS --				  
END lbpks_lbdvamnd_validate;
/
CREATE OR REPLACE SYNONYM lbpkss_lbdvamnd_validate FOR lbpks_lbdvamnd_validate
/