CREATE OR REPLACE PACKAGE Olpks_Dsbr IS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : Olpks_Dsbr.spc
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
  **
   **Changed By         : Arunadevi Rajendran
   **Date               : 23-May-2022
   **change description : Provided fix for auto disbursement should be happen for discounted loans on EOD with ECA.
   **Search String      : BUG#34038379
  -------------------------------------------------------------------------------------------------------*/
  FUNCTION Fn_Disbursment(p_Source          IN VARCHAR2,
                          p_Action_Code     IN VARCHAR2,
                          p_Function_Id     IN VARCHAR2,
                          p_Processing_Date IN DATE,
                          p_Mode            IN CHAR,
                          p_Prod_Rec        IN Oltms_Product_Master_Ld%ROWTYPE,
                          p_Cont_Rec        IN Oltbs_Contract%ROWTYPE,
                          p_Cont_Mas_Rec    IN Oltbs_Contract_Master%ROWTYPE,
                          p_Cont_Pref       IN Oltbs_Contract_Preference%ROWTYPE,
                          p_Esn             IN Oltbs_Contract_Master.Event_Seq_No%TYPE,
                          p_Err_Code        IN OUT VARCHAR2,
                          p_Err_Params      IN OUT VARCHAR2) RETURN BOOLEAN;
						  
  FUNCTION Fn_Process_Liqd_rfr(Pm_Reference IN Oltbs_Contract.Contract_Ref_No%TYPE,
                               Pm_Err_Code  IN OUT VARCHAR2,
                               Pm_Params    IN OUT VARCHAR2) RETURN VARCHAR2;

  FUNCTION Fn_Process_manl_dsbr_rfr(Pm_Reference IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                    Pm_Err_Code  IN OUT VARCHAR2,
                                    Pm_Params    IN OUT VARCHAR2)
    RETURN VARCHAR2;
	
	 --BUG#34038379 changes starts
	FUNCTION Fn_Compute_Eca(p_Contract_Ref_No      	IN Oltbs_Contract.Contract_Ref_No%TYPE,
                         p_Processing_Date      	IN DATE,
                         p_Authorization_Status 	IN Oltbs_Contract.Auth_Status%TYPE,
                         p_Eca_Ref_No           	OUT VARCHAR2,
                         p_Error_Code           	IN OUT VARCHAR2,
                         p_Error_Parameter      	IN OUT VARCHAR2)
   RETURN VARCHAR2;
	 --BUG#34038379 changes ends 
	 
END Olpks_Dsbr;
/
CREATE OR REPLACE Synonym Olpkss_Dsbr FOR Olpks_Dsbr
/