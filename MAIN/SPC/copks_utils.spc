CREATE OR REPLACE PACKAGE Copks_Utils AS
  /*-----------------------------------------------------------------------------------------------------
   **
   ** File Name  : Copks_Utils.spc
   **
   ** Module     : Flexcube Payments
   **
   ** This source is part of the Oracle FLEXCUBE Software Product.
   ** Copyright (R) 2016 , Oracle and/or its affiliates.  All rights reserved
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
      
      SFR Number         : 22938293 
      Changed By         : Prashanth Chennegowda
      Change Description : Code added to save Checker ID and Checker Date Stamp in COTM_SOURCE data source for Auto Auth User.
      Search String      : 22938293_FCUBS_12.2_Payments Changes  
      
**	Last Modified By   : Girish M
**  Last modified on   : 19/Apr/2016	
**  Reason             : Added function for bic code maintenance.
**  Search String      : FCUBS_BIC_Maint	  
      -------------------------------------------------------------------------------------------------------
      */

      TYPE Rec_Cotm_Source IS RECORD(
            Source_Code       Cotm_Source.Source_Code%TYPE,
            Source_Desc       Cotm_Source.Source_Desc%TYPE,
            Record_Stat       Cotm_Source.Record_Stat%TYPE,
            Auth_Stat         Cotm_Source.Auth_Stat%TYPE,
            Once_Auth         Cotm_Source.Once_Auth%TYPE,
            Mod_No            Cotm_Source.Mod_No%TYPE,
            Maker_Id          Cotm_Source.Maker_Id%TYPE,
            Maker_Dt_Stamp    Cotm_Source.Maker_Dt_Stamp%TYPE,
            Checker_Id        Cotm_Source.Checker_Id%TYPE,
            Checker_Dt_Stamp  Cotm_Source.Checker_Dt_Stamp%TYPE,
            Base_Data_From_Fc Cotm_Source.Base_Data_From_Fc%TYPE,
            Sys_Auth_Req      Cotm_Source.Sys_Auth_Req%TYPE);

      FUNCTION Fn_Insert_Into_Cotms_Source(p_Function_Id  VARCHAR2 --22938293_FCUBS_12.2_Payments Changes added
                                          ,p_Action_Code  VARCHAR2 --22938293_FCUBS_12.2_Payments Changes added
                                          ,p_Cotms_Source Copks_Utils.Rec_Cotm_Source) RETURN BOOLEAN;
      FUNCTION Fn_Update_Cotms_Source(p_Function_Id  VARCHAR2 --22938293_FCUBS_12.2_Payments Changes added
                                     ,p_Action_Code  VARCHAR2 --22938293_FCUBS_12.2_Payments Changes added
                                     ,p_Cotms_Source Copks_Utils.Rec_Cotm_Source) RETURN BOOLEAN;
	
    --FCUBS_BIC_Maint Starts	
      FUNCTION Fn_BIC_CODE (p_Function_Id  VARCHAR2
                           ,p_Action_Code  VARCHAR2
                           ,p_bic_code  VARCHAR2
						   ,p_bank_name  VARCHAR2 
						   ,p_maker_id         VARCHAR2
                           ,p_maker_dt_stamp   DATE
                           ,p_checker_id       VARCHAR2
                           ,p_checker_dt_stamp DATE
							) RETURN BOOLEAN;											 
    --FCUBS_BIC_Maint Ends							
END Copks_Utils;
/
CREATE OR REPLACE Synonym Copkss_Utils FOR Copks_Utils
/