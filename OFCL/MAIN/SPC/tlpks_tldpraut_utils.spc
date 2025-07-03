CREATE OR REPLACE PACKAGE  tlpks_tldpraut_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : tlpks_tldpraut_utils.spc
  **
  ** Module     : Secondary Loan Trading
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
  
  -------------------------------------------------------------------------------------------------------
  */
  
  



FUNCTION Fn_Default_And_Validate (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_tldpraut IN   tlpks_tldpraut_Main.Ty_tldpraut,
p_Prev_tldpraut IN OUT tlpks_tldpraut_Main.Ty_tldpraut,
p_wrk_tldpraut IN OUT  tlpks_tldpraut_Main.Ty_tldpraut,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;


FUNCTION Fn_Upload_Db (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_tldpraut IN tlpks_tldpraut_Main.Ty_tldpraut,
p_Prev_tldpraut IN tlpks_tldpraut_Main.Ty_tldpraut,
p_Wrk_tldpraut IN OUT  tlpks_tldpraut_Main.Ty_tldpraut,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;



FUNCTION Fn_Process (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_tldpraut IN tlpks_tldpraut_Main.Ty_tldpraut,
p_Prev_tldpraut IN tlpks_tldpraut_Main.Ty_tldpraut,
p_Wrk_tldpraut IN OUT  tlpks_tldpraut_Main.Ty_tldpraut,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;



FUNCTION Fn_Query  ( p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Full_Data     IN  VARCHAR2 DEFAULT 'Y',
p_With_Lock     IN  VARCHAR2 DEFAULT 'N',
p_QryData_Reqd IN  VARCHAR2 ,
p_tldpraut IN   tlpks_tldpraut_Main.Ty_tldpraut,
p_wrk_tldpraut IN OUT   tlpks_tldpraut_Main.Ty_tldpraut,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

END tlpks_tldpraut_utils;
/
CREATE OR REPLACE SYNONYM tlpkss_tldpraut_kernel FOR tlpks_tldpraut_kernel
/