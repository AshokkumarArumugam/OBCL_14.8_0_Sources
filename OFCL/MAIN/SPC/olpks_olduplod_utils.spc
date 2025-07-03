CREATE OR REPLACE PACKAGE olpks_olduplod_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_olduplod_utils.spc
  **
  ** Module     : Oracle Lending
  **
  ** This source is part of the Oracle FLEXCUBE Software Product.
  ** Copyright (R) 2019 , Oracle and/or its affiliates.  All rights reserved
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
  Changed  By         : Anub Mathew
	Changed On         : 05-09-2018
	Modified Reason     :Commented the code for loging the error in OLTBS_PROCESS_EXCEPTION_CS .
	Search String :28610016
	
	 Changed  By         : Arvind Baskar
	Changed On          : 05-Nov-2019
	Modified Reason     : Hook Request for fn_upload_contract
	Search String       : Bug#30639244 
	
    **Changed By         : Pallavi R
    **Date               : 09-Aug-2023
    **Change Description : Added code to handle Split Settlements from upload
    **Search String      : OBCL_14.7_DESJARD_#35660610 Changes   	
  -------------------------------------------------------------------------------------------------------
  */
--28610016 starts 
  /*
  PROCEDURE pr_update_exceptions(p_extrefno      IN VARCHAR2,
                                 p_module        IN VARCHAR2,
                                 p_cparty        IN VARCHAR2,
                                 pexceplist      IN VARCHAR2,
                                 pexcepparamlist IN VARCHAR2);

    */   
--28610016 ends  
  g_Upload_Route VARCHAR2(16) := 'N'; --OBCL_14.7_DESJARD_#35660610 Changes
--Bug#30639244   changes start
  PROCEDURE Pr_Skip_Handler(P_Stage IN VARCHAR2);
  PROCEDURE Pr_Set_Skip_Kernel;
  PROCEDURE Pr_Set_Activate_Kernel;
  PROCEDURE Pr_Set_Skip_Cluster;
  PROCEDURE Pr_Set_Activate_Cluster;
  FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
  --Bug#30639244   changes end                     
  FUNCTION fn_upload_contract(p_Source IN oltbs_upload_master.source_code%TYPE,                              
                              p_Source_Operation IN VARCHAR2,
                              p_Function_Id      IN VARCHAR2,
                              p_Action_Code      IN VARCHAR2,
                              pextrefno          IN oltbs_upload_master.ext_contract_ref_no%TYPE,
                              pimpmode           IN VARCHAR2,
                              p_Multi_Trip_Id    IN VARCHAR2,
                               p_Status        IN OUT VARCHAR2,
                              pcuberefno         OUT oltbs_contract.contract_ref_no%TYPE,
                              p_Err_Code         IN OUT VARCHAR2,
                              p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

END olpks_olduplod_utils;
/
CREATE OR REPLACE SYNONYM olpkss_olduplod_utils FOR olpks_olduplod_utils
/