CREATE OR REPLACE PACKAGE lbpks_lbcparfe_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbcparfe_utils.spc
  **
  ** Module     : Loans Syndication
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
  
  -------------------------------------------------------------------------------------------------------
  */
  FUNCTION Fn_Default_And_Validate(p_Source           IN VARCHAR2,
                                   p_Source_Operation IN VARCHAR2,
                                   p_Function_Id      IN VARCHAR2,
                                   p_Action_Code      IN VARCHAR2,
                                   p_Main_Function    IN VARCHAR2,
                                   p_Child_Function   IN VARCHAR2,
                                   p_Check_Amendables IN VARCHAR2,
                                   p_lbcparfe         IN lbpks_lbcparfe_Main.Ty_lbcparfe,
                                   p_Prev_lbcparfe    IN OUT lbpks_lbcparfe_Main.Ty_lbcparfe,
                                   p_Wrk_lbcparfe     IN OUT lbpks_lbcparfe_Main.Ty_lbcparfe,
                                   p_Err_Code         IN OUT VARCHAR2,
                                   p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Upload_Db(p_Source           IN VARCHAR2,
                        p_Source_Operation IN VARCHAR2,
                        p_Function_Id      IN VARCHAR2,
                        p_Action_Code      IN VARCHAR2,
                        p_Main_Function    IN VARCHAR2,
                        p_Child_Function   IN VARCHAR2,
                        p_Post_Upl_Stat    IN VARCHAR2,
                        p_Multi_Trip_Id    IN VARCHAR2,
                        p_lbcparfe         IN lbpks_lbcparfe_Main.Ty_lbcparfe,
                        p_prev_lbcparfe    IN lbpks_lbcparfe_Main.Ty_lbcparfe,
                        p_wrk_lbcparfe     IN OUT lbpks_lbcparfe_Main.Ty_lbcparfe,
                        p_Err_Code         IN OUT VARCHAR2,
                        p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
						
  FUNCTION Fn_Calculate(p_Source           IN VARCHAR2,
                        p_Source_Operation IN VARCHAR2,
                        p_Function_Id      IN VARCHAR2,
                        p_Action_Code      IN VARCHAR2,
                        p_Main_Function    IN VARCHAR2,
                        p_Child_Function   IN VARCHAR2,
                        p_Post_Upl_Stat    IN VARCHAR2,
                        p_Multi_Trip_Id    IN VARCHAR2,
                        p_lbcparfe         IN lbpks_lbcparfe_Main.Ty_lbcparfe,
                        p_prev_lbcparfe    IN lbpks_lbcparfe_Main.Ty_lbcparfe,
                        p_wrk_lbcparfe     IN OUT lbpks_lbcparfe_Main.Ty_lbcparfe,
                        p_Err_Code         IN OUT VARCHAR2,
                        p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Query(p_Source           IN VARCHAR2,
                    p_Source_Operation IN VARCHAR2,
                    p_Function_Id      IN VARCHAR2,
                    p_Action_Code      IN VARCHAR2,
                    p_Main_Function    IN VARCHAR2,
                    p_Child_Function   IN VARCHAR2,
                    p_Key_Tags_Vals    IN OUT VARCHAR2,
                    p_QryData_Reqd     IN VARCHAR2,
                    p_lbcparfe         IN lbpks_lbcparfe_Main.ty_lbcparfe,
                    p_wrk_lbcparfe     IN OUT lbpks_lbcparfe_Main.ty_lbcparfe,
                    p_Err_Code         IN OUT VARCHAR2,
                    p_err_params       IN OUT VARCHAR2) RETURN BOOLEAN;
					
END lbpks_lbcparfe_utils;
/
CREATE OR REPLACE SYNONYM lbpkss_lbcparfe_utils FOR lbpks_lbcparfe_utils
/