CREATE OR REPLACE PACKAGE olpks_oldmscdt_utils IS

  /*------------------------------------------------------------------------------------------
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.
  **
  ** No part of this work may be reproduced, stored in a retrieval system,
  ** adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise,
  ** translated in any language or computer language,
  ** without the prior written permission of Oracle and/or its affiliates.
  **
  **
  ** Oracle Financial Services Software Limited.
  ** Oracle Park, Off Western Express Highway,
  ** Goregaon (East),
  ** Mumbai - 400 063, India.
  ------------------------------------------------------------------------------------------
  */
  /*
  -------------------------------------------------------------------------------------------------------
  SFR Number        : 27272109
  Changed By         : Srinivasulu Ch
  Change Description : Added Override log function
  Search stirng      : Bug#27272109
  
  -------------------------------------------------------------------------------------------------------
  */
  FUNCTION Fn_Def_Cstb_Cont_Evnt_Log(p_Source           IN VARCHAR2,
                                     p_Source_Operation IN VARCHAR2,
                                     p_Function_Id      IN VARCHAR2,
                                     p_Action_Code      IN VARCHAR2,
                                     p_oldmscdt         IN olpks_oldmscdt_main.ty_oldmscdt,
                                     p_wrk_oldmscdt     IN OUT olpks_oldmscdt_main.ty_oldmscdt,
                                     p_Err_Code         IN OUT VARCHAR2,
                                     p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION FN_CHECK_BATCH_STATUS  --added default value because in fmb infrom instance it is prm_module='OL'
  RETURN BOOLEAN ;
/*FUNCTION fn_change_log(blockList IN VARCHAR2 , aMode IN VARCHAR2)  RETURN BOOLEAN;*/
FUNCTION Fn_Change_Log(p_Source           IN VARCHAR2,
                         p_Source_Operation IN VARCHAR2,
                         p_Function_Id      IN VARCHAR2,
                         p_Action_code      IN VARCHAR2,
               p_Multi_Trip_Id    IN VARCHAR2,
                         p_oldmscdt         IN olpks_oldmscdt_main.ty_oldmscdt,
               p_prev_oldmscdt    IN olpks_oldmscdt_main.ty_oldmscdt,
                         p_wrk_oldmscdt     IN OUT olpks_oldmscdt_main.ty_oldmscdt,
                         p_Err_Code         IN OUT VARCHAR2,
                         p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN ;
                         FUNCTION Fn_Get_Product_Details(p_Function_Id              IN VARCHAR2
                                  ,p_Source                   IN Cotms_Source.Source_Code%TYPE
                                  ,p_Product_Code             OLTM_PRODUCT.Product_Code%TYPE
                                  ,p_LDTMS_PRODUCT_MASTER IN OUT oltms_product_master_ld%ROWTYPE
                                  ,p_Err_Code                 IN OUT VARCHAR2
                                  ,p_Err_Params               IN OUT VARCHAR2) RETURN BOOLEAN;
                                  
   FUNCTION Fn_Get_Xfer_Ccy_Amt_Vdate(p_LDTMS_PRODUCT_MASTER IN oltms_product_master_ld%ROWTYPE
                                     ,p_Master_Rec               IN OUT NOCOPY oltbs_contract_master%ROWTYPE
                                     ,p_Xfer_Ccy                 OUT oltbs_contract_master.CURRENCY%TYPE
                                     ,p_Xfer_Amt                 OUT oltbs_contract_master.Amount%TYPE
                                     ,p_Xfer_Vdate               OUT oltbs_contract_master.Value_Date%TYPE
                                     ,p_Xfer_Mdate               OUT oltbs_contract_master.MATURITY_Date%TYPE
                                    -- ,p_Xfer_Rate               OUT lftbs_contract_interest.RATE%TYPE
                                     ,p_Err_Code                 IN OUT VARCHAR2
                                     ,p_Err_Params               IN OUT VARCHAR2) RETURN BOOLEAN;
    FUNCTION Fn_Process(p_Source           IN VARCHAR2
                      ,p_Source_Operation IN VARCHAR2
                      ,p_Function_Id      IN VARCHAR2
                      ,p_Action_Code      IN VARCHAR2
                      ,p_Multi_Trip_Id    IN VARCHAR2
                      ,p_oldmscdt         IN olpks_oldmscdt_main.ty_oldmscdt
                      ,p_prev_oldmscdt    IN olpks_oldmscdt_main.ty_oldmscdt
                      ,p_wrk_oldmscdt     IN OUT olpks_oldmscdt_main.ty_oldmscdt
                      ,p_Err_Code         IN OUT VARCHAR2
                      ,p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
 FUNCTION Fn_Upload_Db(p_Source           IN VARCHAR2,
                        p_Source_Operation IN VARCHAR2,
                        p_Function_Id      IN VARCHAR2,
                        p_Action_Code      IN VARCHAR2,
                        p_Multi_Trip_Id    IN VARCHAR2,
                        p_oldmscdt         IN olpks_oldmscdt_main.ty_oldmscdt,
                        p_prev_oldmscdt    IN olpks_oldmscdt_main.ty_oldmscdt,
                        p_wrk_oldmscdt     IN OUT olpks_oldmscdt_main.ty_oldmscdt,
                        p_Err_Code         IN OUT VARCHAR2,
                        p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN ;
						
 ---Bug#27272109  added 

  FUNCTION Fn_Log_Override(p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_Id      IN VARCHAR2,
                           p_Action_code      IN VARCHAR2,
                           p_Multi_Trip_Id    IN VARCHAR2,
                           p_oldmscdt         IN olpks_oldmscdt_main.ty_oldmscdt,
                           p_prev_oldmscdt    IN olpks_oldmscdt_main.ty_oldmscdt,
                           p_wrk_oldmscdt     IN OUT olpks_oldmscdt_main.ty_oldmscdt,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  ---Bug#27272109 added  								
						
						

END olpks_oldmscdt_utils;
/
CREATE OR REPLACE SYNONYM olpkss_oldmscdt_utils FOR olpks_oldmscdt_utils
/