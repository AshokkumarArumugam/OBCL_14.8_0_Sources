CREATE OR REPLACE PACKAGE  ispks_isdbicup_kernel AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : ispks_isdbicup_kernel.spc
  **
  ** Module     : Settlement Instructions
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
  
  SFR Number         :  
  Changed By         :  
  Change Description :  
  
  -------------------------------------------------------------------------------------------------------
  */
  
  
PROCEDURE Pr_Skip_Handler  (P_Stage  IN  VARCHAR2);

FUNCTION Fn_Main       (p_source            IN     VARCHAR2,
                        p_source_operation  IN     VARCHAR2,
                        p_Function_id       IN     VARCHAR2,
                        p_action_code       IN     VARCHAR2,
                        p_Child_Function    IN     VARCHAR2,
                        p_multi_trip_id     IN     VARCHAR2,
                        p_Request_No        IN     VARCHAR2,
                        p_isdbicup          IN OUT  ispks_isdbicup_Main.ty_isdbicup,
                        p_status            IN OUT VARCHAR2 ,
                        p_err_code          IN OUT VARCHAR2,
                        p_err_params        IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Build_Type_Structure (p_source            IN     VARCHAR2,
                                       p_source_operation  IN     VARCHAR2,
                                       p_Function_id       IN     VARCHAR2,
                                       p_action_code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_addl_info       IN Cspks_Req_Global.Ty_Addl_Info,
p_isdbicup     IN  OUT ispks_isdbicup_Main.ty_isdbicup,
p_err_code          IN OUT VARCHAR2,
p_err_params        IN OUT VARCHAR2)
RETURN BOOLEAN;


END ispks_isdbicup_kernel;
/
CREATE OR REPLACE SYNONYM ispkss_isdbicup_kernel FOR ispks_isdbicup_kernel
/