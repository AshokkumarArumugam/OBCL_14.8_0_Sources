CREATE OR REPLACE PACKAGE Lfpks_Rate_Fix_New AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : Lfpks_Rate_Fix_New.spc
  **
  ** Module     : Loans and Deposits
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
  
  **Changed By         : Chandra Achuta
  **Change Description : Interest rate is not updating the contract
  **Search String      : OBCL_12.5_Rate_Fixing_26616880
  
    **Changed By         : Chandra Achuta
    **Date               : 03-APR-2018
    **Change Description : Added parameter for getting min esn for that contract
    **Search String      : Bug#27771011_1
	
	**Changed By         : Priyadarshini K
    **Date               : 28-Jun-2018
    **Change Description : When base rate is maintained as 0 handling done for negative interest.
    **Search String      : OBCL_27914204_5
  
  -------------------------------------------------------------------------------------------------------
  */
  
   g_rate_unavailable BOOLEAN := FALSE; --OBCL_27914204_5  code added
  FUNCTION Fn_Get_Int_Rates(p_Contract_Ref_No IN Lftb_Rate_Fixing_Days_Log.Contract_Ref_No%TYPE,
                            p_Esn             IN Lftb_Rate_Fixing_Days_Log.Esn%TYPE,
                            p_component       IN lftb_rate_fixing_days_log.component%TYPE,  --OBCL_12.5_Rate_Fixing_26616880  code added
                            p_min_esn         IN NUMBER, --Bug#27771011_1  code added
                            p_Err_Code        IN OUT VARCHAR2,
                            p_Err_Params      IN OUT VARCHAR2) RETURN BOOLEAN;
  PROCEDURE Pr_Get_Int_Rates_All(p_branch IN oltbs_contract.branch%TYPE);--OBCL_12.5_Rate_Fixing_26616880  parameter added
END Lfpks_Rate_Fix_New;
/
create or replace synonym Lfpkss_Rate_Fix_New for Lfpks_Rate_Fix_New
/