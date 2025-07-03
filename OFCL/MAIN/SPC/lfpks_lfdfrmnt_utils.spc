CREATE OR REPLACE PACKAGE Lfpks_Lfdfrmnt_Utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : cfpks_cfdfrmnt_uilts.spc
  **
  ** Module     : The ICCF
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright Â© 2007 - 2019  Oracle and/or its affiliates.  All rights reserved
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
  
  Changed By         : Palanisamy Muthukumar
  Change Description : Fix provided for LFDFRMNT rule addition issue
  Search String      : BUG#31526671
  
    Changed By         : Chandra Achuta
    Changed On         : 29-Mar-2022
    Change Reason      : Added code for not increment the ESN before auth UNLOCK action.
    Search String      : Bug#34010855 

    **Changed By         : Satheesh Seshan
    **Changed On         : 30-Nov-2022
    **Change Description : LFDFRMNT addition changes the basis amount of all the prior UNUTIL, which is prior to the Fee eff dt.
								Base bug 34703836 - Forward port from 12.3
    **Search String      : Bug#34838475  
  -------------------------------------------------------------------------------------------------------
  */
--BUG#31526671 Changes Start
g_LFDFRMNT_MODIFY       VARCHAR2(1) := 'N';
--BUG#31526671 Changes End    
  g_Lfdfrmnt_Modify_Unauth VARCHAR2(1) := 'N';   --Bug#34010855  Code Added

  g_Lfdfrmnt_fee_Calc VARCHAR2(1):='N'; --Bug#34838475 added
  FUNCTION Fn_Check_Contract_Auth(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                  p_Source          IN VARCHAR2,
                                  p_Function_Id     IN VARCHAR2,
                                  p_Err_Code        IN OUT VARCHAR2,
                                  p_Err_Params      IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Query_Contract(p_Source           IN VARCHAR2,
                             p_Source_Operation IN VARCHAR2,
                             p_Function_Id      IN VARCHAR2,
                             p_Action_Code      IN VARCHAR2,
                             p_Child_Function   IN VARCHAR2,
                             p_Full_Data        IN VARCHAR2 DEFAULT 'Y',
                             p_With_Lock        IN VARCHAR2 DEFAULT 'N',
                             p_Qrydata_Reqd     IN VARCHAR2,
                             p_Lfdfrmnt         IN Lfpks_Lfdfrmnt_Main.Ty_Lfdfrmnt,
                             p_Wrk_Lfdfrmnt     IN OUT Lfpks_Lfdfrmnt_Main.Ty_Lfdfrmnt,
                             p_Err_Code         IN OUT VARCHAR2,
                             p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
    FUNCTION Fn_Create_rule(p_Source       IN VARCHAR2,
                               p_Function_Id  IN VARCHAR2,
                               p_Action_Code  IN VARCHAR2,
                               p_wrk_lfdfrmnt IN OUT Lfpks_Lfdfrmnt_Main.Ty_Lfdfrmnt,
                               p_Err_Code     IN OUT VARCHAR2,
                               p_Err_Param    IN OUT VARCHAR2) RETURN BOOLEAN ;
  /*FUNCTION Fn_Last_Liqd_Date(p_Contract_Ref_No IN VARCHAR2,
                             p_Last_Liqd_Date  IN OUT DATE,
                             p_Err_Code        IN OUT VARCHAR2,
                             p_Err_Params      IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_New_Cfupdate_Slabs(p_Branch_Code    IN Lftms_Fee_Ccy_Effdate.Branch_Code%TYPE,
                                 p_Cont_Ref       IN Lftms_Fee_Ccy_Effdate.Contract_Ref_No%TYPE,
                                 p_Ccy_Code       IN Lftms_Fee_Ccy_Effdate.Ccy%TYPE,
                                 p_Effective_Date IN Lftms_Fee_Ccy_Effdate.Effective_Date%TYPE,
                                 p_Fee_Amount     IN Lftms_Fee_Rate.Fee_Amt%TYPE,
                                 p_Action_Code    IN VARCHAR2,
                                 p_Err_Code       IN OUT VARCHAR2,
                                 p_Err_Params     IN OUT VARCHAR2)
    RETURN BOOLEAN;*/
    
    FUNCTION Fn_Fire_Fee_Events(p_Source           IN VARCHAR2,
                              p_Source_Operation IN VARCHAR2,
                              p_Function_Id      IN VARCHAR2,
                              p_Action_Code      IN VARCHAR2,
                              p_wrk_lfdfrmnt    IN lfpks_lfdfrmnt_main.Ty_lFdfrmnt,
                              p_Err_Code         IN OUT VARCHAR2,
                              p_Err_Params       IN OUT VARCHAR2)
                              return boolean;
END Lfpks_Lfdfrmnt_Utils;
/
CREATE OR REPLACE SYNONYM lfpkss_lfdfrmnt_utils FOR lfpks_lfdfrmnt_utils
/