CREATE OR REPLACE PACKAGE Lbpks_Lbcsprol_Utils_Custom AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_Lbcsprol_utils_custom.spc
  **
  ** Module     : Syndication Loans and Commitments
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
  Changed By         : 
  Change Description : 
  Search String      : 
  
  **Changed By         : Vineeth T M
  **Date               : 27-Jan-2021
  **Change Description : hook request to include validation for Drawdown Tenor during rollover
  **Search String      : OBCL_14.4_SUPP#32375900 changes
  
  **Changed By         : Mohan Pal
  **Date               : 06-Nov-2023
  **Change Description : hook on lbpks_lbcprol_utils.Fn_process_Margin_Comp
  **Search String      : Bug#35972477

  -------------------------------------------------------------------------------------------------------
  */

  
  
  --OBCL_14.4_SUPP#32375900 changes start
  FUNCTION fn_pre_upload(p_Source             IN VARCHAR2,
                         p_Function_Id        IN VARCHAR2,  
                         p_Action_Code        IN VARCHAR2,
                         p_Wrk_Lbcsprol       IN OUT Lbpks_Lbcsprol_Main.Ty_Lbcsprol,
                         p_Err_Code           IN OUT VARCHAR2,
                         p_Err_Params         IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION fn_post_upload(p_Source             IN VARCHAR2,
                         p_Function_Id        IN VARCHAR2,  
                         p_Action_Code        IN VARCHAR2,
                         p_Wrk_Lbcsprol       IN OUT Lbpks_Lbcsprol_Main.Ty_Lbcsprol,
                         p_Err_Code           IN OUT VARCHAR2,
                         p_Err_Params         IN OUT VARCHAR2)
    RETURN BOOLEAN; 
  
    --OBCL_14.4_SUPP#32375900 changes end
    
    
  --Bug#35972477 ADDED STARTS
  FUNCTION Fn_pre_process_Margin_Comp(p_Split_No     IN NUMBER,
                                 p_Split_Prod   IN VARCHAR2,
                                 P_version IN NUMBER,
                                 p_Wrk_Lbcsprol IN OUT Lbpks_Lbcsprol_Main.Ty_Lbcsprol,
                                 p_Err_Code     IN OUT VARCHAR2,
                                 p_Err_Params   IN OUT VARCHAR2)
  RETURN BOOLEAN;
  
  FUNCTION Fn_post_process_Margin_Comp(p_Split_No     IN NUMBER,
                                 p_Split_Prod   IN VARCHAR2,
                                 P_version IN NUMBER,
                                 p_Wrk_Lbcsprol IN OUT Lbpks_Lbcsprol_Main.Ty_Lbcsprol,
                                 p_Err_Code     IN OUT VARCHAR2,
                                 p_Err_Params   IN OUT VARCHAR2)
  RETURN BOOLEAN;
  --Bug#35972477 ADDED ENDS

END Lbpks_Lbcsprol_Utils_Custom;
/
CREATE OR REPLACE Synonym Lbpkss_Lbcsprol_Utils_Custom FOR Lbpks_Lbcsprol_Utils_Custom
/