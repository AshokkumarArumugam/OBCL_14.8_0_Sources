create or replace package lfpks_lfcintch_utils is
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lfpks_lfcintch_utils.spc
  **
  ** Module     : The ICCF
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
  
  Created By         : Avinav Seal
  Created On         : 19-05-2016
  Created Reason     : ofcl_12.1.0.0.0_conversion
  
   **Changed By         : Arvind Baskar
    **Date               : 30-Apr-2019
    **Change Description : Hook for fn_validate
    **Search String      : Bug#30003676 
	
 **Changed By          : Aruna R
 **Change Description  : Code changes to handle Rate_rounding for fixed rate type.
 **Search String       : OBCL_14.4_RATEROUNDING_30587254
 **Changed On          : 25-Dec-2019
 
 **Changed By         : Arunprasath
 **Date               : 27-Sep-2019
 **Change Description : Min and Max rate default assignment based on param value
 **Search String      : OBCL_14.3_SUPPORT_Bug#30828958
 
 **Changed By         : Arunprasath
 **Date               : 25-May-2020
 **Change Description : Added Fn_Log_pickup_rate
 **Search String      : Bug#31395348
 
 **Changed By         : Aishwarya
 **Date               : 18-May-2020
 **Change Description : Validation for Min and Max rate 
 **Search String      : OBCL_14.4_Min_max_rate_Bug#31474538
 
    Changed By         : Mohan Pal
    Changed On         : 04-Sep-2023
    Change Description : Float rate Rate-Repickup before save
    Search String      : Bug#35592744 CHANGES
	
  **Changed By          : Vineeth T M
  **Date                : 29-Feb-2024
  **Change Description  : For VAMI merge existing interest details with details sent in the gateway request. This is required because 
						  in the request from OBCLPM only few fields related to interest will be present
  **Search String       : Bug#36338441 changes
  **Changed By         : Vineeth T M
  **Date               : 30-May-2024
  **Change Description : Move Backup of lftbs_contract_interest to before updations
  **Search String      : Bug#36671986 changes 
  -------------------------------------------------------------------------------------------------------
  p_wrk_lfcintch.v_oltbs_contract_master.CONTRACT_REF_NO
  */
  --Bug#30003676   changes start
  PROCEDURE Pr_Skip_Handler(P_Stage IN VARCHAR2);
  PROCEDURE Pr_Set_Skip_Kernel;
  PROCEDURE Pr_Set_Activate_Kernel;
  PROCEDURE Pr_Set_Skip_Cluster;
  PROCEDURE Pr_Set_Activate_Cluster;
  FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
--Bug#30003676   changes end
  g_default_Action    varchar2(1):= 'N';--OBCL_14.4_RATEROUNDING_30587254 CHANGES
  FUNCTION Fn_Upload(p_Source           IN Cotms_Source.Source_Code%TYPE,
                     p_Function_Id      IN VARCHAR2,
                     p_Module           IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_Calling_Function IN VARCHAR2,
                     p_Product_Code     IN VARCHAR2,
                     p_Fcc_Ref          IN VARCHAR2,
                     p_Event_Seq_No     IN VARCHAR2,
                     p_wrk_lfcintch     IN OUT lfpks_lfcintch_main.ty_lfcintch,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Validate(p_Source           IN Cotms_Source.Source_Code%TYPE,
                       p_Function_Id      IN VARCHAR2,
                       p_Module           IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_Calling_Function IN VARCHAR2,
                       p_Product_Code     IN VARCHAR2,
                       p_Fcc_Ref          IN VARCHAR2,
                       p_Event_Seq_No     IN VARCHAR2,
                       p_wrk_lfcintch     IN OUT lfpks_lfcintch_main.ty_lfcintch,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  /*SFR_26165805 changes starts*/
  FUNCTION FN_PICKUP_RATES(p_fccref IN oltbs_contract.CONTRACT_REF_NO%TYPE,
                           p_esn    IN oltbs_contract.LATEST_EVENT_SEQ_NO%TYPE)
    RETURN BOOLEAN;
  /*SFR_26165805 changes ends*/		
  --OBCL_14.4_Min_max_rate_Bug#31474538 start
  /*g_min_max_rate_default BOOLEAN DEFAULT FALSE; --OBCL_14.3_SUPPORT_Bug#30828958*/  
  --OBCL_14.4_Min_max_rate_Bug#31474538 end
  --Bug#31395348 Start
   FUNCTION Fn_Log_pickup_rate(p_Ref               IN VARCHAR2,
                              p_Brn               IN VARCHAR2,
                              p_Ext_Sys           IN VARCHAR2,
                              to_date             IN Date,
                              from_date           IN Date,
                              p_amount            IN oltbs_contract_master.amount_financed%type,
                              p_contract_interest IN lftb_contract_interest%ROWTYPE,
                              p_Err_Code          IN OUT VARCHAR2,
                              p_Err_Params        IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --Bug#31395348 end
  
    
   ---Bug#35592744 STARTS
   FUNCTION Fn_re_Pickup_Rates(p_Source           IN VARCHAR2,
                   p_Source_Operation IN VARCHAR2,
                   p_Function_Id      IN VARCHAR2,
                   p_Action_Code      IN VARCHAR2,
                   p_Child_Function   IN VARCHAR2,
                   p_Multi_Trip_Id    IN VARCHAR2,
                   p_Request_No       IN VARCHAR2,
                   p_lfcintch         IN OUT lfpks_lfcintch_main.ty_lfcintch,
                   p_Status           IN OUT VARCHAR2,
                   p_Err_Code         IN OUT VARCHAR2,
                   p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  ---Bug#35592744 ENDS
  --Bug#36338441 changes start
  FUNCTION Fn_Default_For_Vami_GW(p_Source           IN VARCHAR2,
                                p_Source_Operation IN VARCHAR2,
                                p_Function_Id      IN VARCHAR2,
                                p_Key_Vals         IN VARCHAR2,
                                p_lfcintch         IN lfpks_lfcintch_Main.Ty_lfcintch,
                                p_Wrk_lfcintch     IN OUT lfpks_lfcintch_Main.Ty_lfcintch,
                                p_Err_Code         IN OUT VARCHAR2,
                                p_Err_Params       IN OUT VARCHAR2)
  RETURN BOOLEAN;
  --Bug#36338441 changes end
  --Bug#36671986 changes start
  FUNCTION Fn_Bkp_contract_interest(p_Contract_Ref_No  IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                    p_Value_Date       IN DATE,
                                    p_Err_Code         IN OUT VARCHAR2,
                                    p_Err_Params       IN OUT VARCHAR2)
  RETURN BOOLEAN;
  --Bug#36671986 changes end
end lfpks_lfcintch_utils;
/