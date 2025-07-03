CREATE OR REPLACE PACKAGE tlpks_tldfeelq_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : tlpks_tldfeelq_utils.spc
  **
  ** Module     : Secondary Loan Trading
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
  
  SFR Number         :29959798 
  Changed By         :Srinivasulu Ch
  Change Description :Added code changes for version query along with settlement changes
  SearchString       :Bug#29959798 
  -------------------------------------------------------------------------------------------------------
  */

  g_settlement_pickup CHAR(1) := 'N';

  FUNCTION Fn_Validate(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_Child_Function   IN VARCHAR2,
                       p_tldfeelq         IN tlpks_tldfeelq_Main.Ty_tldfeelq,
                       p_Prev_tldfeelq    IN OUT tlpks_tldfeelq_Main.Ty_tldfeelq,
                       p_wrk_tldfeelq     IN OUT tlpks_tldfeelq_Main.Ty_tldfeelq,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Upload_Db(p_Source           IN VARCHAR2,
                        p_Source_Operation IN VARCHAR2,
                        p_Function_Id      IN VARCHAR2,
                        p_Action_Code      IN VARCHAR2,
                        p_Child_Function   IN VARCHAR2,
                        p_Multi_Trip_Id    IN VARCHAR2,
                        p_tldfeelq         IN tlpks_tldfeelq_Main.Ty_tldfeelq,
                        p_Prev_tldfeelq    IN tlpks_tldfeelq_Main.Ty_tldfeelq,
                        p_Wrk_tldfeelq     IN OUT tlpks_tldfeelq_Main.Ty_tldfeelq,
                        p_Err_Code         IN OUT VARCHAR2,
                        p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Query(p_Source           IN VARCHAR2,
                    p_Source_Operation IN VARCHAR2,
                    p_Function_Id      IN VARCHAR2,
                    p_Action_Code      IN VARCHAR2,
                    p_Child_Function   IN VARCHAR2,
                    p_Full_Data        IN VARCHAR2 DEFAULT 'Y',
                    p_With_Lock        IN VARCHAR2 DEFAULT 'N',
                    p_QryData_Reqd     IN VARCHAR2,
                    p_tldfeelq         IN tlpks_tldfeelq_Main.Ty_tldfeelq,
                    p_wrk_tldfeelq     IN OUT tlpks_tldfeelq_Main.Ty_tldfeelq,
                    p_Err_Code         IN OUT VARCHAR2,
                    p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_New(p_Source       IN VARCHAR2,
                  p_Function_Id  IN VARCHAR2,
                  p_Action_Code  IN VARCHAR2,
                  p_Wrk_tldfeelq IN OUT tlpks_tldfeelq_Main.Ty_tldfeelq,
                  p_Err_Code     IN OUT VARCHAR2,
                  p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Delete(p_Source       IN VARCHAR2,
                     p_Function_Id  IN VARCHAR2,
                     p_Action_Code  IN VARCHAR2,
                     p_Wrk_tldfeelq IN OUT tlpks_tldfeelq_Main.Ty_tldfeelq,
                     p_Err_Code     IN OUT VARCHAR2,
                     p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Authorize(p_Source       IN VARCHAR2,
                        p_Function_Id  IN VARCHAR2,
                        p_Action_Code  IN VARCHAR2,
                        p_Wrk_tldfeelq IN OUT tlpks_tldfeelq_Main.Ty_tldfeelq,
                        p_Err_Code     IN OUT VARCHAR2,
                        p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Reverse(p_Source       IN VARCHAR2,
                      p_Function_Id  IN VARCHAR2,
                      p_Action_Code  IN VARCHAR2,
                      p_Wrk_tldfeelq IN OUT tlpks_tldfeelq_Main.Ty_tldfeelq,
                      p_Err_Code     IN OUT VARCHAR2,
                      p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;
					  
					---Bug#29959798 Starts
  FUNCTION Fn_Get_Versionno(p_Contract_Ref_No IN VARCHAR2,
                            p_Version_No      IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Get_Liqdorder(p_Contract_Ref_No IN VARCHAR2,
                            p_Order           OUT NUMBER,
                            p_Liqd_Order      IN OUT NUMBER) RETURN BOOLEAN;
				  
					  ---Bug#29959798 ends 

END tlpks_tldfeelq_utils;
/
CREATE OR REPLACE SYNONYM tlpkss_tldfeelq_utils FOR tlpks_tldfeelq_utils
/