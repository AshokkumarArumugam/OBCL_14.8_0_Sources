CREATE OR REPLACE PACKAGE  olpks_oldcrpvw_kernel AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_oldcrpvw_kernel.spc
  **
  ** Module     : OL
  ** 
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright (R) 2008,2021 , Oracle and/or its affiliates.  All rights reserved
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
                        p_oldcrpvw          IN OUT  olpks_oldcrpvw_Main.ty_oldcrpvw,
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
p_oldcrpvw     IN  OUT olpks_oldcrpvw_Main.ty_oldcrpvw,
p_err_code          IN OUT VARCHAR2,
p_err_params        IN OUT VARCHAR2)
RETURN BOOLEAN;


END olpks_oldcrpvw_kernel;
/
CREATE OR REPLACE SYNONYM olpkss_oldcrpvw_kernel FOR olpks_oldcrpvw_kernel
/