CREATE OR REPLACE PACKAGE olpks_oldtronl_utils1_cluster AS
  /*-----------------------------------------------------------------------------------------------------
    **
    ** File Name  : olpks_oldtronl_utils1_cluster.spc
    **
    ** Module     : Loans and Deposits
    **
    ** This source is part of the Oracle FLEXCUBE Software Product.
    ** Copyright (R) 2008,2022 , Oracle and/or its affiliates.  All rights reserved
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
  **Date               : 31-MAY-2022
  **Change Description : Hook request for error code skip case.
  **Search String      : Bug#34224604
  
  **Changed By         : Chandra Achuta
  **Date               : 04-SEP-2023
  **Change Description : Hook request for fee change log.
  **Search String      : Bug#35762774  
    -------------------------------------------------------------------------------------------------------
  */
  PROCEDURE Pre_Pr_Log_Error(p_Function_Id in VARCHAR2,
                             p_Source      VARCHAR2,
                             p_Err_Code    VARCHAR2,
                             p_Err_Params  VARCHAR2);

  PROCEDURE Post_Pr_Log_Error(p_Function_Id in VARCHAR2,
                              p_Source      VARCHAR2,
                              p_Err_Code    VARCHAR2,
                              p_Err_Params  VARCHAR2);
  --Bug#35762774  Changes Starts
  FUNCTION fn_pre_log_changes(p_Source       IN VARCHAR2,
							  p_Function_Id  IN VARCHAR2,
							  p_wrk_oldtronl IN OUT olpks_oldtronl_main.ty_oldtronl,
							  p_Err_Code     IN OUT VARCHAR2,
							  p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_post_log_changes(p_Source       IN VARCHAR2,
							   p_Function_Id  IN VARCHAR2,
							   p_wrk_oldtronl IN OUT olpks_oldtronl_main.ty_oldtronl,
							   p_Err_Code     IN OUT VARCHAR2,
							   p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;
  --Bug#35762774  Changes Ends							  
END olpks_oldtronl_utils1_cluster;
/
create or replace synonym olpkss_oldtronl_utils1_cluster for olpks_oldtronl_utils1_cluster
/