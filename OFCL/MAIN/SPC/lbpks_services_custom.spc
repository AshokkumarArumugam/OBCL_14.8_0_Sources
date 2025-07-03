CREATE OR REPLACE PACKAGE Lbpks_Services_Custom AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_services_Custom.spc
  **
  ** Module     : LOANS SYNDICATION
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
  Created By         :  Vineeth T M
  Change Description :
  
  SFR Number         : 
  Changed By         : 
  Change Description : 
  Search String      : 
  
   Changed By         : Vineeth T M
  Changed On         : 19-Jun-2020
  Search String      : bug#31671272 changes
  Change Reason      : BCIE :: Multi Holiday CCY support in LB :: Hooks
  
  Changed By         : Sowmya Bitra
  Changed On         : 20-Nov-2020
  Change Description : Added Hooks for Fn_Change_Contract_Status.
  Search String      : Bug#32077981 Changes
  
  -------------------------------------------------------------------------------------------------------
  */
  
  --bug#31671272 changes begins
  Function Fn_Pre_Get_Ccy_Holiday_List(p_Contract_Ref_No in VARCHAR2
                                     ,p_Module in VARCHAR2
                                     ,p_Version_No in Number
                                     ,p_Validation_Type In Char
                                     ,p_Ccy_List in Out Varchar2
                                     ,p_Fn_Call_Id in out Number
                                     ,p_Tb_Custom_Data in out Global.Ty_Tb_Custom_Data
                                     ,p_Error_Code in Out Varchar2)
     RETURN BOOLEAN;
   Function Fn_Post_Get_Ccy_Holiday_List(p_Contract_Ref_No in VARCHAR2
                                     ,p_Module in VARCHAR2
                                     ,p_Version_No in Number
                                     ,p_Validation_Type In Char
                                     ,p_Ccy_List in Out Varchar2
                                     ,p_Fn_Call_Id in out Number
                                     ,p_Tb_Custom_Data in out Global.Ty_Tb_Custom_Data
                                     ,p_Error_Code in Out Varchar2)
    RETURN BOOLEAN;
  --bug#31671272 changes ends
  
    --Bug#32077981 Changes Start
    FUNCTION Fn_Pre_Change_Contract_Status(p_Branch_Code      IN Oltms_Branch.Branch_Code%TYPE,
                                           p_Branch_Date      IN Sttms_Dates.Today%TYPE,
                                           p_Commit_Frequency IN NUMBER,
                                           p_fn_call_id       IN OUT NUMBER,
                                           p_Tb_Custom_Data   IN OUT Global.Ty_Tb_Custom_Data,
                                           p_Error_Code       IN OUT Ertbs_Msgs.Err_Code%TYPE,
                                           p_Error_Parameter  IN OUT Ertbs_Msgs.Message%TYPE)
    RETURN BOOLEAN; 
    
    FUNCTION Fn_Post_Change_Contract_Status(p_Branch_Code      IN Oltms_Branch.Branch_Code%TYPE,
                                            p_Branch_Date      IN Sttms_Dates.Today%TYPE,
                                            p_Commit_Frequency IN NUMBER,
                                            p_fn_call_id       IN OUT NUMBER,
                                            p_Tb_Custom_Data   IN OUT Global.Ty_Tb_Custom_Data,
                                            p_Error_Code       IN OUT Ertbs_Msgs.Err_Code%TYPE,
                                            p_Error_Parameter  IN OUT Ertbs_Msgs.Message%TYPE)
    RETURN BOOLEAN;  
	--Bug#32077981 Changes End
END Lbpks_Services_Custom;
/
CREATE OR REPLACE Synonym Lbpkss_Services_Custom FOR Lbpks_Services_Custom
/