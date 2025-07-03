CREATE OR REPLACE PACKAGE  olpks_oldvamnd_validate AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_oldvamnd_validate.spc
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
  
	**Changed By         : Priyadarshini K
    **Changed On         : 21-Jun-2018
    **Change Description : Decalred 3 global variables for interest, product_pref, CCY_Defn
    **Search String      : OBCL_14.2_VAMI_Sch changes 
	
	**Changed By         : Meha
    **Changed On         : 24-Oct-2018
    **Change Description : Added Declaration For Validate contract schedules 
    **Search String      : Bug#28812676 
	
  **Changed By         : Chandra Achuta
  **Date               : 02-JUn-2022
  **Change Description : Hook request for error code skip case.
  **Search String      : Bug#34163923
  
  -------------------------------------------------------------------------------------------------------
  */
  --OBCL_14.2_VAMI_Sch changes Starts
g_cftb_contract_interest LFTB_CONTRACT_INTEREST%rowtype;
g_Ldtms_Product_Master Oltms_Product_Master_Ld%ROWTYPE;
g_Cytms_Ccy_Defn       Cytms_Ccy_Defn%ROWTYPE;
--OBCL_14.2_VAMI_Sch changes Ends

--Bug#34163923  Changes Starts
PROCEDURE Pr_Set_Skip_Kernel;
PROCEDURE Pr_Set_Activate_Kernel;
PROCEDURE Pr_Set_Skip_Cluster;
PROCEDURE Pr_Set_Activate_Cluster;
FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
--Bug#34163923  Changes Ends
  
PROCEDURE Pr_Skip_Handler  (P_Stage  IN  VARCHAR2);
FUNCTION Fn_Validate(p_Source           IN Cotms_Source.Source_Code%TYPE,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_oldvamnd         IN olpks_oldvamnd_main.ty_oldvamnd,
                       p_wrk_oldvamnd     IN OUT NOCOPY olpks_oldvamnd_main.ty_oldvamnd,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

--Bug#28812676 Changes Starts
FUNCTION Fn_Val_Contract_Sched(P_Source       IN Cotms_Source.Source_Code%TYPE,
                               p_Function_Id  IN VARCHAR2,
                               p_Action_Code  IN VARCHAR2,
                               p_wrk_oldvamnd IN OUT NOCOPY olpks_oldvamnd_main.ty_oldvamnd,
                               p_Err_Code     IN OUT VARCHAR2,
                               p_Err_Params   IN OUT VARCHAR2)RETURN BOOLEAN;
--Bug#28812676 Changes Ends 
   
END olpks_oldvamnd_validate;
/
CREATE OR REPLACE SYNONYM olpkss_oldvamnd_validate FOR olpks_oldvamnd_validate
/