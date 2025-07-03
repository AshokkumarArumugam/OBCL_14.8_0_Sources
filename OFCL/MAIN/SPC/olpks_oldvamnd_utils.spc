CREATE OR REPLACE PACKAGE olpks_oldvamnd_utils AS
    /*-----------------------------------------------------------------------------------------------------
    **
    ** File Name  : olpks_oldvamnd_utils.spc
    **
    ** Module     : Loans and Deposits
    **
    ** This source is part of the Oracle Banking Software Product.
    ** Oracle Banking Corporate Lending  Software Product.   Copyright © 2018.  All rights reserved
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
    Changed By         : Krithika G
    Change Description : Changes done for Multiple Collateral/Pool Linkages
	Search String	   : OBCL 12.5.0.0.0_Changes for Multiple Collateral/Pool Linkages 
	    **SFR Number         : 27182298 
  **Changed By         : dhananjaya T
  **Change Description : Hooks to do ELCM call as part of VAMB
  **Search String      : OBCL 27182298 OFCL12.3 26336486 
  
  **Changed By         : Priyadarshini K
    **Changed On         : 21-Jun-2018
    **Change Description : Declared global var :g_once_split
                           VAMI schedule changes for redefine, distribute principal.  
    **Search String      : OBCL_14.2_VAMI_Sch changes
	
  **Changed By         : Chandra Achuta
  **Date               : 17-DEC-2018
  **Change Description : Introduced new global variable for REVN forward VAMI.
  **Search String      : Bug#29020942	

   **Changed By         : Vigneshram
   **Changed On         : 23-Jan-2019
   **Change Description : 14.3 IOF changes
   **Search String      : OBCL_14.3_IOF    
   
  **Changed By         : Abhinav Bhasker
  **Date                : 15-Apr-2021
  **Change Description  : OLDVAMND - Maturity Date Increase/Decrease for Payment Delay contract, PayByDate becomes equal to Maturity date
  **Search String       : Bug#32787098

  **Changed By         : Abhinav Kumar
  **Date               : 13-Mar-2023
  **Change Description : declared global flag when user click on payment details after Redefinition while VAMI- amendment.
  **Search String      : Bug#35140996
  
  **Changed By         : Jayaram
  **Date               : 03-Apr-2024
  **Change Description : Component Wise Payment Details
  **Search String      : Bug#36459259
  
  **Changed By         : Abhik Das
  **Date               : 05-Apr-2024
  **Change Description : Introduced a new function to check whether user changed any value in Iccf call form 
                         and then only validate to restrict VAMI reversal.
  **Search String      : OBCL_14.7_INTERNAL_fwdport_Bug#36513572_Changes
  
  **Changed By         : Abhinav Kumar
  **Date               : 24-Oct-2024
  **Change Description : Backdated Rate pickup for FPA aspart of VAMI
  **Search String      : Bug#36669212
  
    -------------------------------------------------------------------------------------------------------
    */
    L_prm_ecd              DATE; --:PARAMETER.prm_ecd
    L_PRM_PROJECT_VAMI     VARCHAR2(1);
    l_prm_iccf_changed     VARCHAR2(1); -- :PARAMETER.prm_iccf_changed
    L_PRM_SCHEDULE_BUILT   VARCHAR2(1);
    L_PRM_RATE_TYPE_CHANGE VARCHAR2(1); --PRM_RATE_TYPE_CHANGE
    L_prm_iccf_picked_up        VARCHAR2(1):='N'; --prm_iccf_picked_up
    L_prm_tax_computed           VARCHAR2(1):='N';--prm_tax_computed
    l_prm_spread_changed        VARCHAR2(1):='N';--prm_spread_changed
    l_prm_vamb_esn oltbs_contract.latest_event_seq_no%TYPE;--:PARAMETER.prm_vamb_esn
       L_prm_charge_picked_up       VARCHAR2(1):='N';--prm_charge_picked_up
       L_prm_settlements_picked_up  VARCHAR2(1):='N';--prm_settlements_picked_up
	   
	   --OBCL_14.2_VAMI_Sch changes starts
g_once_split             VARCHAR2(1) := 'N'; 
g_Apply_Back_vami_Rev    VARCHAR2(1) := 'N'; --Bug#36669212

--OBCL_14.2_VAMI_Sch changes ends
g_pay_by_date oltb_amount_due.pay_by_date%Type;--Bug#32787098
--OBCL 27182298 OFCL12.3 26336486  changes start	   
    PROCEDURE Pr_Skip_Handler(P_Stage IN VARCHAR2);
   PROCEDURE Pr_Set_Skip_Kernel;
   PROCEDURE Pr_Set_Activate_Kernel;
   PROCEDURE Pr_Set_Skip_Cluster;
   PROCEDURE Pr_Set_Activate_Cluster;
   FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;	
--OBCL 27182298 OFCL12.3 26336486  changes end  
g_rate_change BOOLEAN := FALSE; --Bug#29020942  code added 
g_pmtdetfld   VARCHAR2(1) := 'N';  --Bug#35140996 change
    FUNCTION Fn_MESG_GEN_ON_AUTH(p_Source      IN VARCHAR2,
                                 p_Function_Id IN VARCHAR2,
                                 pRef_no       varchar2,
                                 pEsn          number,
                                 p_Err_Code    IN OUT VARCHAR2,
                                 p_Err_Params  IN OUT VARCHAR2) RETURN BOOLEAN;

    FUNCTION Fn_Default(p_Source           IN Cotms_Source.Source_Code%TYPE,
                        p_Source_Operation IN VARCHAR2,
                        p_Function_Id      IN VARCHAR2,
                        p_Action_Code      IN VARCHAR2,
                        p_oldvamnd         IN olpks_oldvamnd_main.ty_oldvamnd,
                        p_wrk_oldvamnd     IN OUT NOCOPY olpks_oldvamnd_main.ty_oldvamnd,
                        p_Err_Code         IN OUT VARCHAR2,
                        p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
    FUNCTION Fn_Validate(p_Source           IN Cotms_Source.Source_Code%TYPE,
                         p_Source_Operation IN VARCHAR2,
                         p_Function_Id      IN VARCHAR2,
                         p_Action_Code      IN VARCHAR2,
                         p_oldvamnd         IN olpks_oldvamnd_main.ty_oldvamnd,
                         p_wrk_oldvamnd     IN OUT NOCOPY olpks_oldvamnd_main.ty_oldvamnd,
                         p_Err_Code         IN OUT VARCHAR2,
                         p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
    FUNCTION Fn_Upload_Db(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_oldvamnd         IN olpks_oldvamnd_main.ty_oldvamnd,
                          p_prev_oldvamnd    IN olpks_oldvamnd_main.ty_oldvamnd,
                          p_wrk_oldvamnd     IN OUT olpks_oldvamnd_main.ty_oldvamnd,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
    FUNCTION Fn_Action_Events(p_Source           IN VARCHAR2,
                              p_Source_Operation IN VARCHAR2,
                              p_Function_Id      IN VARCHAR2,
                              p_Action_code      IN VARCHAR2,
                              p_oldvamnd         IN olpks_oldvamnd_main.ty_oldvamnd,
                              p_prev_oldvamnd    IN olpks_oldvamnd_main.ty_oldvamnd,
                              p_wrk_oldvamnd     IN OUT olpks_oldvamnd_main.ty_oldvamnd,
                              p_Err_Code         IN OUT VARCHAR2,
                              p_Err_Params       IN OUT VARCHAR2)
      RETURN BOOLEAN;
    FUNCTION Fn_Process(p_Source           IN VARCHAR2,
                        p_Source_Operation IN VARCHAR2,
                        p_Function_Id      IN VARCHAR2,
                        p_Action_Code      IN VARCHAR2,
                        p_oldvamnd         IN olpks_oldvamnd_main.ty_oldvamnd,
                        p_prev_oldvamnd    IN olpks_oldvamnd_main.ty_oldvamnd,
                        p_wrk_oldvamnd     IN OUT olpks_oldvamnd_main.ty_oldvamnd,
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
                      p_oldvamnd         IN olpks_oldvamnd_main.ty_oldvamnd,
                      p_wrk_oldvamnd     IN OUT olpks_oldvamnd_main.ty_oldvamnd,
                      p_Err_Code         IN OUT VARCHAR2,
                      p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
					  
--OBCL 12.5.0.0.0_Changes for Multiple Collateral/Pool Linkages 
  FUNCTION fn_multiple_utilization(p_Source       IN VARCHAR2,
                             p_Function_Id  IN VARCHAR2,
                             p_Action_Code  IN VARCHAR2,
                             p_wrk_oldvamnd IN OUT olpks_oldvamnd_main.ty_oldvamnd,
                             p_Err_Code     IN OUT VARCHAR2,
                             p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;
--OBCL 12.5.0.0.0_Changes for Multiple Collateral/Pool Linkages  Ends

--OBCL_14.2_VAMI_Sch changes starts
FUNCTION fn_redefine_schedules(p_Source       IN VARCHAR2,
                                 p_Function_Id  IN VARCHAR2,
                                 p_Action_Code  IN VARCHAR2,
                                 p_wrk_oldvamnd IN OUT olpks_oldvamnd_main.ty_oldvamnd,
                                 P_product_master IN oltms_product_master_ld%ROWTYPE,
                                 p_Err_Code     IN OUT VARCHAR2,
                                 p_Err_Params   IN OUT VARCHAR2)
  RETURN BOOLEAN;
  FUNCTION fn_default_schedules(p_Source       IN VARCHAR2,
                                 p_Function_Id  IN VARCHAR2,
                                 p_Action_Code  IN VARCHAR2,
                                 p_wrk_oldvamnd IN OUT olpks_oldvamnd_main.ty_oldvamnd,
                                 p_Err_Code     IN OUT VARCHAR2,
                                 p_Err_Params   IN OUT VARCHAR2)
  RETURN BOOLEAN;

  PROCEDURE Pr_Calc_Enddt(p_Source                  IN VARCHAR2,
                          p_Function_Id             IN VARCHAR2,
                          p_wrk_oldvamnd            IN OUT olpks_oldvamnd_main.ty_oldvamnd,
                          p_ldtb_contract_schedules IN OUT OLTB_CONTRACT_SCHEDULES%ROWTYPE,
                          p_Err_Code                IN OUT VARCHAR2,
                          p_Err_Params              IN OUT VARCHAR2); 
   FUNCTION fn_schedules_validations(p_Source       IN VARCHAR2,
                                    p_Action_Code  IN VARCHAR2,
                                    p_Function_Id  IN VARCHAR2,
                                    p_Wrk_oldvamnd IN OUT olpks_oldvamnd_main.ty_oldvamnd,
                                    p_Err_Code     IN OUT VARCHAR2,
                                    p_Err_Params   IN OUT VARCHAR2)
    RETURN BOOLEAN;
     FUNCTION fn_check_schedules(p_Source       IN VARCHAR2,
                              p_Action_Code  IN VARCHAR2,
                              p_Function_Id  IN VARCHAR2,
                              p_Wrk_oldvamnd IN OUT olpks_oldvamnd_main.ty_oldvamnd,
                              p_Err_Code     IN OUT VARCHAR2,
                              p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;    
     FUNCTION fn_validate_FWDVAMI(p_Source       IN VARCHAR2,
                                    p_Action_Code  IN VARCHAR2,
                                    p_Function_Id  IN VARCHAR2,
                                    p_Wrk_oldvamnd IN OUT olpks_oldvamnd_main.ty_oldvamnd,
                                    p_Err_Code     IN OUT VARCHAR2,
                                    p_Err_Params   IN OUT VARCHAR2)
    RETURN BOOLEAN;                                               
  --OBCL_14.2_VAMI_Sch changes ends
  ---OBCL_14.7_INTERNAL_fwdport_Bug#36513572_Changes Starts---
  FUNCTION Fn_Iccf_Changed(p_Wrk_Oldvamnd     IN OUT NOCOPY Olpks_Oldvamnd_Main.Ty_Oldvamnd)
    RETURN VARCHAR2;
  ----OBCL_14.7_INTERNAL_fwdport_Bug#36513572_Changes Ends----
  --OBCL_14.3_IOF starts
	FUNCTION Fn_Compute_Iof_Tax  (	 p_Source           IN VARCHAR2,
                                     p_Function_Id      IN VARCHAR2,
                                     p_Action_Code      IN VARCHAR2,
									 p_Wrk_oldvamnd IN OUT olpks_oldvamnd_main.ty_oldvamnd,
									 p_Err_Code 		IN	OUT 	VARCHAR2,
									 p_Err_Params		IN	OUT		VARCHAR2 )
    RETURN BOOLEAN;  
  --OBCL_14.3_IOF ends
  --OBCL_14.4_CDI_CHANGES starts
  FUNCTION fn_retain_main_comp_sch (p_Wrk_Oldvamnd IN OUT Olpks_Oldvamnd_Main.Ty_Oldvamnd) RETURN BOOLEAN;  
  --OBCL_14.4_CDI_CHANGES ends
  
    FUNCTION Fn_Check_Ccy_Restrictions(p_Source           IN VARCHAR2,
                                     p_Source_Operation IN VARCHAR2,
                                     p_Function_Id      IN VARCHAR2,
                                     p_Action_Code      IN VARCHAR2,
                                     p_Wrk_Oldvamnd     IN OUT Olpks_Oldvamnd_Main.Ty_Oldvamnd,
                                     p_Err_Code         IN OUT VARCHAR2,
                                     p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;


	FUNCTION Fn_Auto_Auth_Validations(p_Source           IN VARCHAR2,
                                    p_Source_Operation IN VARCHAR2,
                                    p_Function_Id      IN VARCHAR2,
                                    p_Action_Code      IN VARCHAR2,
                                    p_Wrk_Oldvamnd     IN OUT Olpks_Oldvamnd_Main.Ty_Oldvamnd,
                                    p_Err_Code         IN OUT VARCHAR2,
                                    p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
	
	 --Bug#36459259:Changes Starts here
    FUNCTION Fn_get_CompWisedetails(p_Source           IN VARCHAR2,
                                    p_Source_Operation IN VARCHAR2,
                                    p_Function_Id      IN VARCHAR2,
                                    p_Action_Code      IN VARCHAR2,
                                    p_Child_Function   IN VARCHAR2,                               
                                    p_oldvamnd         IN Olpks_Oldvamnd_Main.Ty_Oldvamnd,
                                    p_Wrk_Oldvamnd     IN OUT Olpks_Oldvamnd_Main.Ty_Oldvamnd,
                                    p_Err_Code         IN OUT VARCHAR2,
                                    p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
    --Bug#36459259:Changes Ends here
	
END olpks_oldvamnd_utils;
/
CREATE OR REPLACE SYNONYM olpkss_oldvamnd_utils FOR olpks_oldvamnd_utils
/
