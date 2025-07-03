CREATE OR REPLACE PACKAGE Lfpks_Fee_Services_Cluster AS
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lfpks_fee_services_cluster.spc
  **
  ** Module   : LF
  **
    This source is part of the Oracle Flexcube Corporate Lending  Software Product.
    Copyright © 2016 , Oracle and/or its affiliates.  All rights reserved.
    No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, 
	mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written 
	permission of Oracle and/or its affiliates.
  
    Oracle Financial Services Software Limited.
    Oracle Park, Off Western Express Highway,
    Goregaon (East),
    Mumbai - 400 063, India.
  ----------------------------------------------------------------------------------------------------
    Created By         : Sowmya Bitra
    Created On         : 22-Feb-2023
    Search String      : Bug#35105360   
    Change Reason      : Hook provided for Fn_Register_An_Event
	
		
    Changed By         : Akhila Samson
    Changed On         : 13-Mar-2023
    Change Description : Added hook for fn_calc_delay_days
    Search String      : OBCL_14.7_SUPP#35088099
	
    **Changed By         : Abhik Das
    **Date               : 07-Jul-2023
    **Change Description : Due to the hook change for fn_calc_delay_days, system was
                           always defaulting payment delay days as zero and system was
                           unable to compute pay_by_days correctly considering payment
                           delay days given by user.
                           Modified code for the hook change with IN OUT parameter to compute 
						   pay_by_days correctly considering payment delay days given by user.
    **Search String      : OBCL_14.7_Fujitsu_Bug#35552584_Changes

  */
  --Bug#35105360 Changes Start
  FUNCTION Fn_Pre_Register_An_Event(p_Contract_Ref_No      IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                    p_Processing_Date      IN DATE,
                                    p_Event_Code           IN Oltbs_Contract.Curr_Event_Code%TYPE,
                                    p_Contract_Status      IN Oltbs_Contract_Event_Log.Contract_Status%TYPE,
                                    p_Authorization_Status IN Oltbs_Contract.Auth_Status%TYPE,
                                    p_Error_Code           IN OUT VARCHAR2,
                                    p_Error_Parameter      IN OUT VARCHAR2)
    RETURN BOOLEAN;

 FUNCTION Fn_Post_Register_An_Event(p_Contract_Ref_No      IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                    p_Processing_Date      IN DATE,
                                    p_Event_Code           IN Oltbs_Contract.Curr_Event_Code%TYPE,
                                    p_Contract_Status      IN Oltbs_Contract_Event_Log.Contract_Status%TYPE,
                                    p_Authorization_Status IN Oltbs_Contract.Auth_Status%TYPE,
                                    p_Error_Code           IN OUT VARCHAR2,
                                    p_Error_Parameter      IN OUT VARCHAR2)
    RETURN BOOLEAN;
 --Bug#35105360 Changes End
 --OBCL_14.7_SUPP#35088099 Start
 ---OBCL_14.7_Fujitsu_Bug#35552584_Changes Starts---
 /*
 FUNCTION Fn_Pre_Calc_Delay_Days(p_Reference_No IN VARCHAR2,
                              p_Component    IN VARCHAR2) 
RETURN NUMBER;

FUNCTION Fn_Post_Calc_Delay_Days(p_Reference_No IN VARCHAR2,
                              p_Component    IN VARCHAR2) 
RETURN NUMBER;
 */
 FUNCTION Fn_Pre_Calc_Delay_Days(p_Reference_No IN VARCHAR2,
                                   p_component IN VARCHAR2,
                                   p_Payment_Delay_Days IN OUT NUMBER)
  RETURN BOOLEAN;
  FUNCTION Fn_Post_Calc_Delay_Days(p_Reference_No IN VARCHAR2,
                                   p_component IN VARCHAR2,
                                   p_Payment_Delay_Days IN OUT NUMBER)
  RETURN BOOLEAN;
  ----OBCL_14.7_Fujitsu_Bug#35552584_Changes Ends----
--OBCL_14.7_SUPP#35088099 End
END Lfpks_Fee_Services_Cluster;
/